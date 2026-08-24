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

function renderAssetDetails(item) {
    const fields = [
        ["Asset ID", item.assetId],
        ["Property Number", item.propertyNo],
        ["Item/Brand/Model", item.itemBrandModel],
        ["Serial Number", item.serialNo],
        ["Classification", item.itemClassification],
        ["Accountable Person", item.accountable],
        ["School Level", item.schoolLevel],
        ["Status", item.status],
        ["Acquisition Cost", item.acquisitionCost],
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
                <dt>${label}</dt>
                <dd>${String(value)}</dd>
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
        const response = await fetch(`${supabaseUrl}/rest/v1/assets?select=asset_id,fund_cluster,property_no,item_classification,item_brand_model,serial_no,acquisition_cost,acquisition_date,accountable_person,school_level,date_issue,status,remarks,created_at,updated_at&asset_id=eq.${encodeURIComponent(assetId)}` , {
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
            propertyNo: item.property_no || item.propertyNo || "",
            itemClassification: item.item_classification || item.itemClassification || "",
            itemBrandModel: item.item_brand_model || item.itemBrandModel || "",
            serialNo: item.serial_no || item.serialNo || "",
            acquisitionCost: item.acquisition_cost || item.acquisitionCost || "",
            acquisitionDate: item.acquisition_date || item.acquisitionDate || "",
            accountable: item.accountable_person || item.accountable || "",
            schoolLevel: item.school_level || item.schoolLevel || item.schoollevel || "",
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
