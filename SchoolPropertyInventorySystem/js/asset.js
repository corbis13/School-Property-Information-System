const assetDetailList = document.querySelector("#assetDetailList");
const assetTitle = document.querySelector("#assetTitle");
const message = document.querySelector("#message");

const supabaseUrl = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url) || "";
const supabaseAnonKey = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.anonKey) || "";
const supabaseHeaders = {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`
};

function parseQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name) || "";
}

function renderError(text) {
    assetTitle.textContent = "Asset not available";
    message.textContent = text;
    assetDetailList.style.display = "none";
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function renderAssetDetails(item) {
    const fields = [
        ["Asset ID", item.assetId],
        ["Inventory Item Type", item.inventoryType],
        ["Property Number", item.propertyNo],
        ["Item/Brand/Model", item.itemBrandModel],
        ["Serial Number", item.serialNo],
        ["Classification", item.itemClassification],
        ["Accountable Person", item.accountable],
        ["School Level", item.schoolLevel],
        ["Semi-Expandable No.", item.semiExpandableNo],
        ["Unit Value", item.unitValue],
        ["Total", item.total],
        ["Unit Measurement", item.unitMeasurement],
        ["Balance", item.balance],
        ["On Hand", item.onHand],
        ["Shortage/Overage Quantity", item.shortageOverageQty],
        ["Shortage/Overage Value", item.shortageOverageValue],
        ["Location", item.location],
        ["MOOE Month", item.mooeMonth],
        ["MOOE Year", item.mooeYear],
        ["Status", item.status],
        ["Acquisition Date", item.acquisitionDate],
        ["Date Issued", item.dateIssue],
        ["Remarks", item.remarks]
    ];

    assetTitle.textContent = item.itemBrandModel || item.propertyNo || item.assetId || "Asset Detail";
    message.textContent = "Here is the current asset detail from Supabase.";
    assetDetailList.innerHTML = fields
        .filter(([, value]) => String(value || "").trim())
        .map(([label, value]) => `
            <div class="asset-detail-row">
                <dt>${escapeHtml(label)}</dt>
                <dd>${escapeHtml(value)}</dd>
            </div>
        `)
        .join("");
    assetDetailList.style.display = "grid";
}

async function loadAsset() {
    const assetId = String(parseQueryParam("assetId") || "").trim();

    if (!assetId) {
        renderError("No assetId query parameter was provided. Make sure the QR code points to a valid asset detail URL.");
        return;
    }

    if (!supabaseUrl || !supabaseAnonKey) {
        renderError("Supabase configuration is missing. Update supabase-config.js with your URL and anon key.");
        return;
    }

    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/assets?select=asset_id,fund_cluster,inventory_type,property_no,item_classification,item_brand_model,serial_no,acquisition_date,accountable_person,school_level,semi_expandable_no,unit_value,total,unit_measurement,balance,on_hand,shortage_overage_qty,shortage_overage_value,location,mooe_month,mooe_year,date_issue,status,remarks,created_at,updated_at&asset_id=eq.${encodeURIComponent(assetId)}` , {
            headers: {
                ...supabaseHeaders,
                Accept: "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Supabase request failed with ${response.status}`);
        }

        const rows = await response.json();
        const item = (rows || [])[0];

        if (!item) {
            renderError(`Asset not found for assetId=${assetId}.`);
            return;
        }

        renderAssetDetails({
            assetId: item.asset_id || item.assetId || "",
            fundCluster: item.fund_cluster || item.fundCluster || "",
            inventoryType: item.inventory_type || item.inventoryType || "",
            propertyNo: item.property_no || item.propertyNo || "",
            itemClassification: item.item_classification || item.itemClassification || "",
            itemBrandModel: item.item_brand_model || item.itemBrandModel || "",
            serialNo: item.serial_no || item.serialNo || "",
            acquisitionDate: item.acquisition_date || item.acquisitionDate || "",
            accountable: item.accountable_person || item.accountable || "",
            schoolLevel: item.school_level || item.schoolLevel || item.schoollevel || "",
            semiExpandableNo: item.semi_expandable_no || item.semiExpandableNo || "",
            unitValue: item.unit_value ?? item.unitValue ?? "",
            total: item.total ?? "",
            unitMeasurement: item.unit_measurement || item.unitMeasurement || "",
            balance: item.balance ?? "",
            onHand: item.on_hand ?? item.onHand ?? "",
            shortageOverageQty: item.shortage_overage_qty ?? item.shortageOverageQty ?? "",
            shortageOverageValue: item.shortage_overage_value ?? item.shortageOverageValue ?? "",
            location: item.location || "",
            mooeMonth: item.mooe_month ?? item.mooeMonth ?? "",
            mooeYear: item.mooe_year ?? item.mooeYear ?? "",
            dateIssue: item.date_issue || item.dateIssue || "",
            status: item.status || "",
            remarks: item.remarks || ""
        });
    } catch (error) {
        console.error(error);
        renderError("Unable to load asset details from Supabase. Check your network connection and Supabase settings.");
    }
}

window.addEventListener("DOMContentLoaded", loadAsset);
