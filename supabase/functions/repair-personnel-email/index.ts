import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function response(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function normalizeEmail(value: unknown) {
  return String(value || "").trim().toLowerCase();
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return response(405, { error: "Method not allowed." });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return response(500, { error: "Email correction service is not configured." });
  }

  const authorization = request.headers.get("Authorization") || "";
  const currentToken = authorization.replace(/^Bearer\s+/i, "");
  if (!currentToken) {
    return response(401, { error: "Sign in before correcting a personnel email." });
  }

  let payload: {
    employeeId?: unknown;
    storedEmail?: unknown;
    targetEmail?: unknown;
  };
  try {
    payload = await request.json();
  } catch {
    return response(400, { error: "Invalid request body." });
  }

  const employeeId = String(payload.employeeId || "").trim();
  const storedEmail = normalizeEmail(payload.storedEmail);
  const targetEmail = normalizeEmail(payload.targetEmail);
  if (!employeeId || employeeId.length > 128 || !targetEmail) {
    return response(400, { error: "Employee ID and the target email address are required." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)) {
    return response(400, { error: "Enter valid email addresses." });
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: currentResult, error: currentError } = await admin.auth.getUser(currentToken);
  if (currentError || !currentResult.user) {
    return response(401, { error: "Your sign-in session is invalid. Sign in again and retry." });
  }

  const currentUser = currentResult.user;
  const currentProviders = currentUser.app_metadata?.providers;
  const isGoogleUser = currentUser.app_metadata?.provider === "google" ||
    (Array.isArray(currentProviders) && currentProviders.includes("google")) ||
    (currentUser.identities || []).some((identity) => identity.provider === "google");
  if (!isGoogleUser || !currentUser.email_confirmed_at) {
    return response(403, { error: "A verified Google sign-in is required." });
  }
  if (normalizeEmail(currentUser.email) !== targetEmail) {
    return response(400, { error: "The corrected sign-in email must match your verified account email." });
  }

  const { data: roleRow, error: roleError } = await admin
    .from("spis_user_roles")
    .select("role")
    .eq("user_id", currentUser.id)
    .maybeSingle();
  if (roleError) {
    return response(500, { error: "SPIS could not verify your account role." });
  }
  if (roleRow?.role !== "user" && roleRow?.role !== "admin") {
    return response(403, { error: "An assigned SPIS role is required to correct a personnel email." });
  }

  const { data: personnel, error: personnelError } = await admin
    .from("school_teacher")
    .select("id, employee_id, email")
    .eq("employee_id", employeeId)
    .maybeSingle();
  if (personnelError) {
    return response(500, { error: "SPIS could not locate a unique personnel record for that Employee ID." });
  }
  if (!personnel) {
    return response(404, { error: "No personnel record was found for that Employee ID." });
  }

  const actualStoredEmail = normalizeEmail(personnel.email);
  if (actualStoredEmail !== storedEmail) {
    return response(409, { error: "The personnel email has changed. Reload the page and try again." });
  }

  const escapedTargetEmail = targetEmail.replace(/[%_\\]/g, "\\$&");
  const { data: duplicatePersonnel, error: duplicateCheckError } = await admin
    .from("school_teacher")
    .select("id")
    .neq("id", personnel.id)
    .ilike("email", escapedTargetEmail)
    .limit(1)
    .maybeSingle();
  if (duplicateCheckError) {
    return response(500, { error: "SPIS could not check for duplicate personnel emails." });
  }
  if (duplicatePersonnel) {
    return response(409, { error: "That sign-in email is already assigned to another personnel record. Ask an administrator to resolve the duplicate." });
  }

  let updateQuery = admin
    .from("school_teacher")
    .update({ email: currentUser.email })
    .eq("id", personnel.id);
  updateQuery = personnel.email == null
    ? updateQuery.is("email", null)
    : updateQuery.eq("email", personnel.email);
  const { data: updatedPersonnel, error: updateError } = await updateQuery
    .select("id, email")
    .single();
  if (updateError || !updatedPersonnel) {
    return response(500, { error: "SPIS could not save the corrected personnel email. Please try again." });
  }

  return response(200, { success: true });
});
