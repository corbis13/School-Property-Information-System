const icsSupabaseUrl = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url) || "https://ouqgkytallctnptshefo.supabase.co";
const icsSupabaseAnonKey = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.anonKey) || "sb_publishable_UDhp6lrRgVppuqH6Uu4Izg_zp7T-_WS";

function setIcsText(id, value, fallback = "â€”") {
    const element = document.getElementById(id);
    if (element) element.textContent = value == null || String(value).trim() === "" ? fallback : String(value);
}

function formatIcsPublicAmount(value) {
    if (value == null || value === "") return "â€”";
    const amount = Number(value);
    return Number.isFinite(amount)
        ? `â‚±${amount.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : String(value);
}

function formatIcsPublicDate(value) {
    if (!value) return "â€”";
    const date = new Date(`${String(value).slice(0, 10)}T00:00:00`);
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });
}

function renderPublicIcsSlip(slip) {
    if (!slip) throw new Error("No Inventory Custodian Slip was found for this ICS No.");
    setIcsText("entityName", slip.entity_name);
    setIcsText("fundCluster", slip.fund_cluster);
    setIcsText("icsNo", slip.ics_no);
    setIcsText("receivedFrom", slip.received_from_name, "Signature over printed name");
    setIcsText("receivedFromDetails", [slip.received_from_position, slip.received_from_date ? `Date: ${formatIcsPublicDate(slip.received_from_date)}` : ""].filter(Boolean).join(" Â· "));
    setIcsText("receivedBy", slip.received_by_name, "Signature over printed name");
    setIcsText("receivedByDetails", [slip.received_by_position, slip.received_by_date ? `Date: ${formatIcsPublicDate(slip.received_by_date)}` : ""].filter(Boolean).join(" Â· "));

    const tbody = document.getElementById("itemRows");
    tbody.replaceChildren();
    (Array.isArray(slip.items) ? slip.items : []).forEach((item) => {
        const row = document.createElement("tr");
        const values = [item.quantity ?? "â€”", item.unit || "â€”", formatIcsPublicAmount(item.unit_cost), formatIcsPublicAmount(item.total_cost)];
        values.forEach((value, index) => {
            const cell = document.createElement("td");
            cell.textContent = String(value);
            if (index >= 2) cell.className = "numeric";
            row.appendChild(cell);
        });

        const description = document.createElement("td");
        description.className = "description";
        description.appendChild(document.createTextNode(item.description || "â€”"));
        const detailLines = [
            item.serial_no ? `Serial No.: ${item.serial_no}` : "",
            item.additional_item ? `Additional Item: ${item.additional_item}` : "",
            item.acquisition_date ? `Date Acquired: ${formatIcsPublicDate(item.acquisition_date)}` : ""
        ].filter(Boolean);
        if (detailLines.length) {
            const details = document.createElement("small");
            details.textContent = detailLines.join("\n");
            description.appendChild(details);
        }
        row.appendChild(description);

        [item.inventory_item_no || "â€”", item.estimated_useful_life || "â€”"].forEach((value) => {
            const cell = document.createElement("td");
            cell.textContent = String(value);
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });

    if (!tbody.children.length) throw new Error("This ICS has no saved line items.");
    document.getElementById("loadingState").hidden = true;
    document.getElementById("icsContent").hidden = false;
    document.title = `ICS ${slip.ics_no || "Slip"} | SPIS`;
}

async function loadPublicIcsSlip() {
    const requestedIcsNo = new URLSearchParams(window.location.search).get("icsNo") || "";
    const loadingState = document.getElementById("loadingState");
    if (!requestedIcsNo.trim()) {
        loadingState.textContent = "The QR link does not contain an ICS No.";
        loadingState.classList.add("error");
        return;
    }

    try {
        const response = await fetch(`${icsSupabaseUrl}/rest/v1/rpc/get_public_ics_slip`, {
            method: "POST",
            headers: {
                apikey: icsSupabaseAnonKey,
                Authorization: `Bearer ${icsSupabaseAnonKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ics_lookup: requestedIcsNo.trim() })
        });
        if (!response.ok) throw new Error("Unable to load this slip. The public ICS lookup may not be enabled yet.");
        const slip = await response.json();
        renderPublicIcsSlip(Array.isArray(slip) ? slip[0] : slip);
    } catch (error) {
        loadingState.textContent = error.message || "Unable to load this Inventory Custodian Slip.";
        loadingState.classList.add("error");
    }
}

loadPublicIcsSlip();

