const schoolLevelCard = document.querySelector("#schoolLevelCard");
const schoolLevelTitle = document.querySelector("#schoolLevelTitle");
const schoolLevelMessage = document.querySelector("#schoolLevelMessage");

async function loadSchoolLevel() {
    const assetId = String(parseQueryParam("assetId") || "").trim();

    if (!assetId) {
        schoolLevelTitle.textContent = "Asset not available";
        schoolLevelMessage.textContent = "No assetId query parameter was provided.";
        return;
    }

    if (!supabaseUrl || !supabaseAnonKey) {
        schoolLevelTitle.textContent = "Asset not available";
        schoolLevelMessage.textContent = "Supabase configuration is missing.";
        return;
    }

    try {
        const response = await fetch(
            `${supabaseUrl}/rest/v1/assets?select=school_level&asset_id=eq.${encodeURIComponent(assetId)}`,
            {
                headers: {
                    ...supabaseHeaders,
                    Accept: "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Supabase request failed with ${response.status}`);
        }

        const rows = await response.json();
        const item = (rows || [])[0];

        if (!item) {
            schoolLevelTitle.textContent = "Asset not available";
            schoolLevelMessage.textContent = `Asset not found for assetId=${assetId}.`;
            return;
        }

        schoolLevelTitle.textContent = item.school_level || "Unknown";
        schoolLevelMessage.textContent = "School level data loaded successfully.";
    } catch (error) {
        console.error(error);
        schoolLevelTitle.textContent = "Asset not available";
        schoolLevelMessage.textContent = "Unable to load school level data.";
    }
}

window.addEventListener("DOMContentLoaded", loadSchoolLevel);