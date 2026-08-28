const storageKey = "propertyInventoryItems";
const classificationStorageKey = "propertyInventoryClassifications";
const themeKey = "propertyInventoryTheme";
const supabaseUrl = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url) || "https://ouqgkytallctnptshefo.supabase.co";
const supabaseAnonKey = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.anonKey) || "YOUR_SUPABASE_ANON_KEY";
const supabaseHeaders = {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`
};

const seedItems = [
    {
        assetId: "AST000001",
        educationLevel: "Elementary",
        fundCluster: "01",
        propertyNo: "PROP-2026-001",
        itemClassification: "Computer Equipment",
        itemBrandModel: "Dell Latitude 5440 Laptop",
        serialNo: "DL-5440-9281",
        acquisitionDate: "2026-02-12",
        accountable: "Maria Santos",
        dateIssue: "2026-02-14",
        status: "Assigned",
        remarks: "Serviceable",
        createdAt: "2026-07-22T00:00:00.000Z",
        updatedAt: "2026-07-22T00:00:00.000Z"
    },
    {
        assetId: "AST000002",
        educationLevel: "Elementary",
        fundCluster: "01",
        propertyNo: "PROP-2026-002",
        itemClassification: "Office Equipment",
        itemBrandModel: "HP LaserJet Pro Printer",
        serialNo: "HP-LJ-3308",
        acquisitionDate: "2026-03-08",
        accountable: "",
        dateIssue: "",
        status: "Available",
        remarks: "Available",
        createdAt: "2026-07-22T00:00:00.000Z",
        updatedAt: "2026-07-22T00:00:00.000Z"
    }
];

const dom = {
    form: document.querySelector("#itemForm"),
    formTitle: document.querySelector("#formTitle"),
    editingId: document.querySelector("#editingId"),
    educationLevel: document.querySelector("#educationLevel"),
    assetId: document.querySelector("#assetId"),
    fundCluster: document.querySelector("#fundCluster"),
    inventoryType: document.querySelector("#inventoryType"),
    propertyNo: document.querySelector("#propertyNo"),
    itemClassification: document.querySelector("#itemClassification"),
    itemBrandModel: document.querySelector("#itemBrandModel"),
    serialNo: document.querySelector("#serialNo"),
    acquisitionDate: document.querySelector("#acquisitionDate"),
    accountable: document.querySelector("#accountable"),
    position: document.querySelector("#position"),
    schoolLevel: document.querySelector("#schoolLevel"),
    semiExpandableNo: document.querySelector("#semiExpandableNo"),
    unitValue: document.querySelector("#unitValue"),
    total: document.querySelector("#total"),
    unitMeasurement: document.querySelector("#unitMeasurement"),
    balance: document.querySelector("#balance"),
    onHand: document.querySelector("#onHand"),
    shortageOverageQty: document.querySelector("#shortageOverageQty"),
    shortageOverageValue: document.querySelector("#shortageOverageValue"),
    location: document.querySelector("#location"),
    mooeMonth: document.querySelector("#mooeMonth"),
    mooeYear: document.querySelector("#mooeYear"),
    dateIssue: document.querySelector("#dateIssue"),
    status: document.querySelector("#status"),
    additionalItem: document.querySelector("#additionalItem"),
    remarks: document.querySelector("#remarks"),
    table: document.querySelector("#inventoryTable"),
    emptyState: document.querySelector("#emptyState"),
    pagination: document.querySelector("#inventoryPagination"),
    searchInput: document.querySelector("#searchInput"),
    statusFilter: document.querySelector("#statusFilter"),
    qrCode: document.querySelector("#qrCode"),
    qrTitle: document.querySelector("#qrTitle"),
    qrStatus: document.querySelector("#qrStatus"),
    qrDetails: document.querySelector("#qrDetails"),
    totalItems: document.querySelector("#totalItems"),
    assignedItems: document.querySelector("#assignedItems"),
    repairItems: document.querySelector("#repairItems"),
    qrItems: document.querySelector("#qrItems"),
    portfolioChart: document.querySelector("#portfolioChart"),
    portfolioLegend: document.querySelector("#portfolioLegend"),
    statusBars: document.querySelector("#statusBars"),
    statusLineChart: document.querySelector("#statusLineChart"),
    statusChartLegend: document.querySelector("#statusChartLegend"),
    qrCoverage: document.querySelector("#qrCoverage"),
    recentAssets: document.querySelector("#recentAssets"),
    accountablePersonChart: document.querySelector("#accountablePersonChart"),
    qrAssetList: document.querySelector("#qrAssetList"),
    physicalReport: document.querySelector("#physicalReport"),
    allAssetsTable: document.querySelector("#allAssetsTable"),
    assetCount: document.querySelector("#assetCount"),
    assetDatabaseSearch: document.querySelector("#assetDatabaseSearch"),
    reportInventoryType: document.querySelector("#reportInventoryType"),
    reportFundCluster: document.querySelector("#reportFundCluster"),
    reportAsOf: document.querySelector("#reportAsOf"),
    generatePdfBtn: document.querySelector("#generatePdfBtn"),
    certifiedCorrectedBy: document.querySelector("#certifiedCorrectedBy"),
    approvedBy: document.querySelector("#approvedBy"),
    verifiedBy: document.querySelector("#verifiedBy"),
    newItemBtnInline: document.querySelector("#newItemBtnInline"),
    resetFormBtn: document.querySelector("#resetFormBtn"),
    downloadQrBtn: document.querySelector("#downloadQrBtn"),
    openQrLinkBtn: document.querySelector("#openQrLinkBtn"),
    copyQrBtn: document.querySelector("#copyQrBtn"),
    themeButtons: document.querySelectorAll("[data-theme-choice]"),
    toast: document.querySelector("#toast"),
    databaseStatus: document.querySelector("#databaseStatus"),
    databaseMessage: document.querySelector("#databaseMessage"),
    schoolLevelChart: document.querySelector("#schoolLevelChart"),
    acquisitionYearChart: document.querySelector("#acquisitionYearChart"),
    dateIssueYearChart: document.querySelector("#dateIssueYearChart"),
    addClassificationBtn: document.querySelector("#addClassificationBtn"),
    addStatusBtn: document.querySelector("#addStatusBtn"),
    deleteClassificationBtn: document.querySelector("#deleteClassificationBtn"),
    deleteStatusBtn: document.querySelector("#deleteStatusBtn")
};

let items = [];
let selectedId = null;
let classificationOptions = [];
let statusOptions = [];
let teacherOptions = [];
let signatoryOptions = [];
let signatoryLoadFailed = false;
let canOpenClassificationModal = false;
let canOpenStatusModal = false;
let inventoryPage = 1;
let qrPage = 1;
const inventoryRowsPerPage = 12;
const qrRowsPerPage = 8;
let isRefreshingStatusOptions = false;
let isStatusSelectionLocked = false;
let isRefreshingClassificationOptions = false;
let isClassificationSelectionLocked = false;

function loadPersistedClassifications() {
    try {
        const raw = localStorage.getItem(classificationStorageKey);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed.map((item) => String(item || "").trim()).filter(Boolean) : [];
    } catch {
        return [];
    }
}

function savePersistedClassifications(options) {
    try {
        localStorage.setItem(classificationStorageKey, JSON.stringify(options || []));
    } catch {
        // ignore storage failures
    }
}

function sortClassificationValues(values) {
    return [...new Set((values || []).map((value) => String(value || "").trim()).filter(Boolean))]
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

function sortStatusValues(values) {
    return [...new Set((values || []).map((value) => String(value || "").trim()).filter(Boolean))]
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

function fallbackItems() {
    try {
        const raw = localStorage.getItem(storageKey);
        const parsed = raw ? JSON.parse(raw) : [];
        if (Array.isArray(parsed) && parsed.length) {
            return parsed;
        }
    } catch {
        // ignore parse errors
    }
    return seedItems.slice();
}

async function loadClassificationOptions() {
    let remoteClassifications = [];

    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/classifications?select=classification_name`, {
            headers: supabaseHeaders
        });

        if (response.ok) {
            const rows = await response.json();
            remoteClassifications = sortClassificationValues((rows || []).map((row) => String(row.classification_name || row.name || row.label || "").trim()).filter(Boolean));
        } else {
            console.error("Unable to load classification options from Supabase: HTTP", response.status);
        }
    } catch (error) {
        console.error("Unable to load classification options from Supabase:", error);
    }

    classificationOptions = sortClassificationValues([...loadPersistedClassifications(), ...remoteClassifications]);
    populateClassificationOptions(classificationOptions);
    return classificationOptions;
}

function populateStatusOptions(options) {
    isRefreshingStatusOptions = true;
    isStatusSelectionLocked = true;
    const currentValue = (dom.status && dom.status.value || "").trim();
    const values = sortStatusValues(options || []);
    const shouldPreserveValue = currentValue && currentValue !== "__add_new__" && values.includes(currentValue);

    if (currentValue && currentValue !== "__add_new__" && !values.includes(currentValue)) {
        values.unshift(currentValue);
        values.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    }

    dom.status.innerHTML = "";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select";
    dom.status.appendChild(placeholder);

    values.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        dom.status.appendChild(option);
    });

    if (shouldPreserveValue) {
        dom.status.value = currentValue;
    } else {
        dom.status.selectedIndex = 0;
        dom.status.value = "";
    }

    window.setTimeout(() => {
        isRefreshingStatusOptions = false;
        isStatusSelectionLocked = false;
    }, 0);
}

async function loadTeacherOptions() {
    teacherOptions = [];

    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/geras_teacher?select=teacher_name,position,school_level`, {
            headers: supabaseHeaders
        });

        if (!response.ok) throw new Error("Unable to load teacher options from Supabase.");

        const rows = await response.json();
        teacherOptions = (rows || [])
            .map((row) => ({
                name: String(row.teacher_name || row.name || row.full_name || "").trim(),
                position: String(row.position || row.teacher_position || "").trim(),
                schoolLevel: String(row.school_level || row.schoolLevel || row.schoollevel || "").trim()
            }))
            .filter((row) => row.name)
            .sort((first, second) => first.name.localeCompare(second.name, undefined, { sensitivity: "base" }));
    } catch (error) {
        console.error(error);
        teacherOptions = [];
    }

    const currentValue = dom.accountable.value.trim();
    const names = teacherOptions.map((teacher) => teacher.name).filter(Boolean).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    const shouldPreserveValue = currentValue && names.includes(currentValue);

    if (currentValue && !names.includes(currentValue)) {
        names.unshift(currentValue);
    }

    dom.accountable.innerHTML = "";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select teacher";
    dom.accountable.appendChild(placeholder);

    names.forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        dom.accountable.appendChild(option);
    });

    if (shouldPreserveValue) {
        dom.accountable.value = currentValue;
    } else if (currentValue) {
        dom.accountable.value = currentValue;
    } else {
        dom.accountable.selectedIndex = 0;
        dom.accountable.value = "";
    }

    applySelectedTeacherDetails();
}

async function loadSignatoryOptions() {
    signatoryOptions = [];
    signatoryLoadFailed = false;

    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/signatories?select=signatory`, {
            headers: supabaseHeaders
        });

        if (!response.ok) throw new Error("Unable to load signatory options from Supabase.");

        const rows = await response.json();
        signatoryOptions = [...new Set((rows || [])
            .map((row) => String(row.signatory || "").trim())
            .filter(Boolean))]
            .sort((first, second) => first.localeCompare(second, undefined, { sensitivity: "base" }));
    } catch (error) {
        console.error(error);
        signatoryLoadFailed = true;
    }

    [dom.certifiedCorrectedBy, dom.approvedBy, dom.verifiedBy].forEach((select) => {
        if (!select) return;
        const currentValue = select.value;
        const unavailableOption = signatoryLoadFailed
            ? `<option value="" disabled>Signatories table unavailable</option>`
            : "";
        select.innerHTML = `${unavailableOption}<option value="">Select signatory</option>${signatoryOptions
            .map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;
        if (signatoryOptions.includes(currentValue)) select.value = currentValue;
    });
}

async function loadInventoryTypeOptions() {
    const currentValue = dom.inventoryType.value.trim();
    let values = [];

    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/inventory_item?select=inventory_item_type`, {
            headers: supabaseHeaders
        });

        if (!response.ok) throw new Error("Unable to load inventory item types from Supabase.");

        const rows = await response.json();
        values = [...new Set((rows || [])
            .map((row) => String(row.inventory_item_type || "").trim())
            .filter(Boolean))]
            .sort((first, second) => first.localeCompare(second, undefined, { sensitivity: "base" }));
    } catch (error) {
        console.error(error);
    }

    if (currentValue && !values.includes(currentValue)) {
        values.unshift(currentValue);
    }

    dom.inventoryType.innerHTML = "";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select item type";
    dom.inventoryType.appendChild(placeholder);

    values.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        dom.inventoryType.appendChild(option);
    });

    dom.inventoryType.value = currentValue;
}

async function loadEducationLevelOptions() {
    const currentValue = dom.educationLevel.value.trim();
    let values = [];

    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/education_level?select=education_level`, {
            headers: supabaseHeaders
        });

        if (!response.ok) throw new Error("Unable to load education level options from Supabase.");

        const rows = await response.json();
        values = [...new Set((rows || [])
            .map((row) => String(row.education_level || "").trim())
            .filter(Boolean))]
            .sort((first, second) => first.localeCompare(second, undefined, { sensitivity: "base" }));
    } catch (error) {
        console.error(error);
    }

    if (currentValue && !values.includes(currentValue)) {
        values.unshift(currentValue);
    }

    dom.educationLevel.innerHTML = "";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select education level";
    dom.educationLevel.appendChild(placeholder);

    values.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        dom.educationLevel.appendChild(option);
    });

    dom.educationLevel.value = currentValue;
}

function populateStatusFilterOptions(options) {
    const values = sortStatusValues(options || []);
    dom.statusFilter.innerHTML = "";

    const allOption = document.createElement("option");
    allOption.value = "All";
    allOption.textContent = "All Status";
    dom.statusFilter.appendChild(allOption);

    values.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        dom.statusFilter.appendChild(option);
    });
}

function getStatusValueFromRow(row) {
    if (!row || typeof row !== "object") return "";
    return String(row.status_name || row.status || row.name || row.label || "").trim();
}

async function loadStatusOptions() {
    let remoteStatuses = [];

    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/statuses?select=status_name`, {
            headers: supabaseHeaders
        });

        if (response.ok) {
            const rows = await response.json();
            remoteStatuses = sortStatusValues((rows || []).map((row) => getStatusValueFromRow(row)).filter(Boolean));
        } else {
            console.error("Unable to load status options from Supabase: HTTP", response.status);
        }
    } catch (error) {
        console.error("Unable to load status options from Supabase:", error);
    }

    statusOptions = remoteStatuses;
    populateStatusOptions(statusOptions);
    populateStatusFilterOptions(statusOptions);

    return statusOptions;
}

async function deleteClassificationFromSheet(name) {
    if (!supabaseUrl || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") {
        throw new Error("Supabase config is incomplete.");
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/classifications?classification_name=eq.${encodeURIComponent(name)}`, {
        method: "DELETE",
        headers: supabaseHeaders
    });

    if (!response.ok) {
        throw new Error("Unable to delete classification from Supabase.");
    }

    return response;
}

async function deleteStatusFromSheet(name) {
    if (!supabaseUrl || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") {
        throw new Error("Supabase config is incomplete.");
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/statuses?status_name=eq.${encodeURIComponent(name)}`, {
        method: "DELETE",
        headers: supabaseHeaders
    });

    if (!response.ok) {
        throw new Error("Unable to delete status from Supabase.");
    }

    return response;
}

async function removeStatusOption(value) {
    const normalized = String(value || "").trim();
    if (!normalized) return;

    statusOptions = statusOptions.filter((item) => item.toLowerCase() !== normalized.toLowerCase());
    dom.status.value = "";
    populateStatusOptions(statusOptions);
    populateStatusFilterOptions(statusOptions);

    try {
        const response = await deleteStatusFromSheet(normalized);
        if (response && response.ok) {
            showToast(`Status "${normalized}" deleted.`);
            await loadStatusOptions();
        } else {
            showToast(`Failed to remove status "${normalized}" from Supabase.`);
        }
    } catch (error) {
        console.error(error);
        showToast(`Failed to remove status "${normalized}" from Supabase.`);
    }
}

async function removeClassificationOption(value) {
    const normalized = String(value || "").trim();
    if (!normalized) return;

    classificationOptions = classificationOptions.filter((item) => item.toLowerCase() !== normalized.toLowerCase());
    savePersistedClassifications(classificationOptions);
    dom.itemClassification.value = "";
    populateClassificationOptions(classificationOptions);

    try {
        const response = await deleteClassificationFromSheet(normalized);
        if (response && response.ok) {
            showToast(`Classification "${normalized}" deleted.`);
            await loadClassificationOptions();
        } else {
            showToast(`Failed to remove classification "${normalized}" from Supabase.`);
        }
    } catch (error) {
        console.error(error);
        showToast(`Failed to remove classification "${normalized}" from Supabase.`);
    }
}

function parseClassificationOptions(csv) {
    return [];
}

function populateClassificationOptions(options) {
    isRefreshingClassificationOptions = true;
    isClassificationSelectionLocked = true;
    const currentValue = dom.itemClassification.value.trim();
    const values = sortClassificationValues(options || []);
    const shouldPreserveValue = currentValue && currentValue !== "__add_new__" && values.includes(currentValue);

    if (currentValue && currentValue !== "__add_new__" && !values.includes(currentValue)) {
        values.unshift(currentValue);
        values.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    }

    dom.itemClassification.innerHTML = "";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select classification";
    dom.itemClassification.appendChild(placeholder);

    values.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        dom.itemClassification.appendChild(option);
    });

    if (shouldPreserveValue) {
        dom.itemClassification.value = currentValue;
    } else {
        dom.itemClassification.selectedIndex = 0;
        dom.itemClassification.value = "";
    }

    window.setTimeout(() => {
        isRefreshingClassificationOptions = false;
        isClassificationSelectionLocked = false;
    }, 0);
}

async function loadItems() {
    setDatabaseStatus("Connecting to Supabase...", "Loading inventory records from the backend.");

    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/assets?select=asset_id,education_level,fund_cluster,inventory_type,property_no,item_classification,item_brand_model,serial_no,acquisition_date,accountable_person,school_level,semi_expandable_no,unit_value,total,unit_measurement,balance,on_hand,shortage_overage_qty,shortage_overage_value,location,mooe_month,mooe_year,date_issue,status,additional_item,remarks,created_at,updated_at`, {
            headers: supabaseHeaders
        });

        if (!response.ok) throw new Error("Unable to load inventory from Supabase.");

        const rows = await response.json();
        items = (rows || []).map((row) => ({
            assetId: row.asset_id || row.assetId || "",
            educationLevel: row.education_level || row.educationLevel || "",
            fundCluster: row.fund_cluster || row.fundCluster || "",
            inventoryType: row.inventory_type || row.inventoryType || "",
            propertyNo: row.property_no || row.propertyNo || "",
            itemClassification: row.item_classification || row.itemClassification || "",
            itemBrandModel: row.item_brand_model || row.itemBrandModel || "",
            serialNo: row.serial_no || row.serialNo || "",
            acquisitionDate: row.acquisition_date || row.acquisitionDate || "",
            accountable: row.accountable_person || row.accountable || "",
            schoolLevel: row.school_level || row.schoolLevel || row.schoollevel || "",
            semiExpandableNo: row.semi_expandable_no || row.semiExpandableNo || "",
            unitValue: row.unit_value ?? row.unitValue ?? "",
            total: row.total ?? "",
            unitMeasurement: row.unit_measurement || row.unitMeasurement || "",
            balance: row.balance ?? "",
            onHand: row.on_hand ?? row.onHand ?? "",
            shortageOverageQty: row.shortage_overage_qty ?? row.shortageOverageQty ?? "",
            shortageOverageValue: row.shortage_overage_value ?? row.shortageOverageValue ?? "",
            location: row.location || "",
            mooeMonth: row.mooe_month ?? row.mooeMonth ?? "",
            mooeYear: row.mooe_year ?? row.mooeYear ?? "",
            dateIssue: row.date_issue || row.dateIssue || "",
            status: row.status || "",
            additionalItem: row.additional_item || row.additionalItem || "",
            remarks: row.remarks || "",
            createdAt: row.created_at || row.createdAt || "",
            updatedAt: row.updated_at || row.updatedAt || ""
        }));

        usingRemoteBackend = true;
        localStorage.setItem(storageKey, JSON.stringify(items));
        setDatabaseStatus("Connected to Supabase.", `${items.length} records loaded from the backend.`);
    } catch (error) {
        console.error(error);
        items = fallbackItems();
        usingRemoteBackend = false;
        setDatabaseStatus("Local fallback is active.", "Supabase is unavailable right now. Your latest local data is still available.");
    }
}

function normalizeDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toISOString().slice(0, 10);
}

function ensureSelectOption(selectElement, value) {
    const normalized = String(value || "").trim();
    if (!normalized) return;
    if (![...selectElement.options].some((option) => option.value === normalized)) {
        const option = document.createElement("option");
        option.value = normalized;
        option.textContent = normalized;
        selectElement.appendChild(option);
    }
}

async function syncToSheet(action, item) {
    saveLocal();

    if (!supabaseUrl || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") {
        setDatabaseStatus("Local fallback is active.", "Add your Supabase anon key in supabase-config.js to persist data remotely.");
        return;
    }

    const payload = {
        asset_id: item.assetId,
        education_level: item.educationLevel || "",
        fund_cluster: item.fundCluster,
        inventory_type: item.inventoryType || "",
        property_no: item.propertyNo,
        item_classification: item.itemClassification,
        item_brand_model: item.itemBrandModel,
        serial_no: item.serialNo,
        acquisition_date: item.acquisitionDate,
        accountable_person: item.accountable,
        school_level: item.schoolLevel || "",
        semi_expandable_no: item.semiExpandableNo || "",
        unit_value: item.unitValue === "" ? null : item.unitValue,
        total: item.total === "" ? null : item.total,
        unit_measurement: item.unitMeasurement || "",
        balance: item.balance === "" ? null : item.balance,
        on_hand: item.onHand === "" ? null : item.onHand,
        shortage_overage_qty: item.shortageOverageQty === "" ? null : item.shortageOverageQty,
        shortage_overage_value: item.shortageOverageValue === "" ? null : item.shortageOverageValue,
        location: item.location || "",
        mooe_month: item.mooeMonth === "" ? null : item.mooeMonth,
        mooe_year: item.mooeYear === "" ? null : item.mooeYear,
        date_issue: item.dateIssue,
        status: item.status,
        additional_item: item.additionalItem || "",
        remarks: item.remarks,
        created_at: item.createdAt,
        updated_at: item.updatedAt
    };

    const options = {
        method: action === "delete" ? "DELETE" : (action === "update" ? "PATCH" : "POST"),
        headers: {
            ...supabaseHeaders,
            "Content-Type": "application/json",
            Prefer: "return=representation"
        },
        body: JSON.stringify(payload)
    };

    if (action === "delete") {
        const response = await fetch(`${supabaseUrl}/rest/v1/assets?asset_id=eq.${encodeURIComponent(item.assetId)}`, options);
        if (!response.ok) throw new Error("Delete failed");
    } else if (action === "update") {
        const response = await fetch(`${supabaseUrl}/rest/v1/assets?asset_id=eq.${encodeURIComponent(item.assetId)}`, options);
        if (!response.ok) throw new Error("Update failed");
    } else {
        const response = await fetch(`${supabaseUrl}/rest/v1/assets`, options);
        if (!response.ok) throw new Error("Create failed");
    }

    setDatabaseStatus("Synced to Supabase.", "Changes were sent to the backend database.");
}

function saveLocal() {
    localStorage.setItem(storageKey, JSON.stringify(items));
}

function setDatabaseStatus(status, message) {
    dom.databaseStatus.textContent = status;
    dom.databaseMessage.textContent = message;
}

function updateTotal() {
    const unitValue = Number(dom.unitValue.value);
    const onHand = Number(dom.onHand.value);

    dom.total.value = dom.unitValue.value !== "" && dom.onHand.value !== "" && Number.isFinite(unitValue) && Number.isFinite(onHand)
        ? (unitValue * onHand).toFixed(2)
        : "";
}

function getFormData() {
    const now = new Date().toISOString();
    const existing = items.find((item) => item.assetId === dom.editingId.value);

    return {
        assetId: normalizeAssetId(dom.editingId.value || dom.assetId.value.trim() || createId()),
        educationLevel: dom.educationLevel.value.trim(),
        fundCluster: dom.fundCluster.value.trim(),
        inventoryType: dom.inventoryType.value.trim(),
        propertyNo: dom.propertyNo.value.trim(),
        itemClassification: dom.itemClassification.value.trim(),
        itemBrandModel: dom.itemBrandModel.value.trim(),
        serialNo: dom.serialNo.value.trim(),
        acquisitionDate: dom.acquisitionDate.value,
        accountable: dom.accountable.value.trim(),
        schoolLevel: dom.schoolLevel.value.trim(),
        semiExpandableNo: dom.semiExpandableNo.value.trim(),
        unitValue: dom.unitValue.value.trim(),
        total: dom.total.value.trim(),
        unitMeasurement: dom.unitMeasurement.value.trim(),
        balance: dom.balance.value.trim(),
        onHand: dom.onHand.value.trim(),
        shortageOverageQty: dom.shortageOverageQty.value.trim(),
        shortageOverageValue: dom.shortageOverageValue.value.trim(),
        location: dom.location.value.trim(),
        mooeMonth: dom.mooeMonth.value.trim(),
        mooeYear: dom.mooeYear.value.trim(),
        dateIssue: dom.dateIssue.value,
        status: dom.status.value || "",
        additionalItem: dom.additionalItem.value.trim(),
        remarks: dom.remarks.value.trim(),
        createdAt: (existing && existing.createdAt) || now,
        updatedAt: now
    };
}

function normalizeAssetId(value, fallbackIndex = 1) {
    const trimmed = String(value || "").trim();
    if (!trimmed) return formatAssetId(fallbackIndex);

    if (/^AST\d+$/.test(trimmed)) {
        return `AST${String(Number(trimmed.replace(/^AST/i, ""))).padStart(6, "0")}`;
    }

    const numericMatch = trimmed.match(/^\d+$/);
    if (numericMatch) {
        return formatAssetId(Number(trimmed));
    }

    const legacyMatch = trimmed.match(/^AST[-_]?(\d{4})[-_]?(\d+)$/i);
    if (legacyMatch) {
        return `AST${String(Number(legacyMatch[2])).padStart(6, "0")}`;
    }

    return trimmed;
}

function formatAssetId(sequence) {
    return `AST${String(Number(sequence)).padStart(6, "0")}`;
}

function createId() {
    return formatAssetId(getNextAssetId(items));
}

function getAssetSequence(id) {
    const trimmed = String(id || "").trim();
    if (!trimmed) return null;

    if (/^AST\d+$/.test(trimmed)) {
        return Number(trimmed.replace(/^AST/i, ""));
    }

    const numericMatch = trimmed.match(/^\d+$/);
    if (numericMatch) {
        return Number(trimmed);
    }

    const legacyMatch = trimmed.match(/^AST[-_]?(\d{4})[-_]?(\d+)$/i);
    if (legacyMatch) {
        return Number(legacyMatch[2]);
    }

    return null;
}

function getNextAssetId(items) {
    const sequences = items
        .map((item) => getAssetSequence(item.assetId))
        .filter((value) => Number.isFinite(value));

    if (!sequences.length) {
        return 1;
    }

    return Math.max(...sequences) + 1;
}

function fillForm(item) {
    dom.editingId.value = item.assetId;
    dom.assetId.value = item.assetId;
    ensureSelectOption(dom.educationLevel, item.educationLevel);
    dom.educationLevel.value = item.educationLevel || "";
    dom.fundCluster.value = item.fundCluster;
    dom.inventoryType.value = item.inventoryType || "";
    dom.propertyNo.value = item.propertyNo;
    ensureSelectOption(dom.itemClassification, item.itemClassification);
    dom.itemClassification.value = item.itemClassification;
    dom.itemBrandModel.value = item.itemBrandModel;
    dom.serialNo.value = item.serialNo;
    dom.acquisitionDate.value = item.acquisitionDate;
    ensureSelectOption(dom.accountable, item.accountable);
    dom.accountable.value = item.accountable;
    applySelectedTeacherDetails();
    dom.semiExpandableNo.value = item.semiExpandableNo || "";
    dom.unitValue.value = item.unitValue ?? "";
    dom.unitMeasurement.value = item.unitMeasurement || "";
    dom.balance.value = item.balance ?? "";
    dom.onHand.value = item.onHand ?? "";
    updateTotal();
    dom.shortageOverageQty.value = item.shortageOverageQty ?? "";
    dom.shortageOverageValue.value = item.shortageOverageValue ?? "";
    dom.location.value = item.location || "";
    dom.mooeMonth.value = item.mooeMonth ?? "";
    dom.mooeYear.value = item.mooeYear ?? "";
    ensureSelectOption(dom.status, item.status || "");
    dom.status.value = item.status || "";
    dom.dateIssue.value = item.dateIssue;
    dom.additionalItem.value = item.additionalItem || "";
    dom.remarks.value = item.remarks;
    dom.formTitle.textContent = "Edit Property Item";
}

function applySelectedTeacherDetails() {
    const selectedTeacher = dom.accountable.value.trim();
    const matchedTeacher = teacherOptions.find((teacher) => teacher.name.toLowerCase() === selectedTeacher.toLowerCase());
    dom.position.value = (matchedTeacher && matchedTeacher.position) || "";
    dom.schoolLevel.value = (matchedTeacher && matchedTeacher.schoolLevel) || "";
}

function resetForm() {
    dom.form.reset();
    dom.editingId.value = "";
    dom.assetId.value = createId();
    dom.position.value = "";
    dom.schoolLevel.value = "";
    dom.formTitle.textContent = "Add Property Item";
    dom.propertyNo.focus();
}

function getAssetDetailUrl(assetId) {
    const configuredUrl = (window.SUPABASE_CONFIG && String(window.SUPABASE_CONFIG.assetUrl || "").trim()) || "";
    const safeId = encodeURIComponent(String(assetId || "UNKNOWN").trim());
    const query = `?assetId=${safeId}`;

    if (configuredUrl) {
        return `${configuredUrl.replace(/\/+$|\?+$/g, "")}${query}`;
    }

    try {
        const url = new URL(window.location.href);
        url.pathname = url.pathname.replace(/[^/]*$/, "asset.html");
        url.search = query;
        url.hash = "";
        return url.toString();
    } catch {
        return `asset.html${query}`;
    }
}

function getQrPayload(item) {
    const assetId = String(item.assetId || "UNKNOWN").trim() || "UNKNOWN";
    return getAssetDetailUrl(assetId);
}

function getComputedStatus(item) {
    return item.status || "";
}

function normalizeStatusValue(status) {
    const value = String(status || "").trim();
    if (!value) return "Unspecified";

    const normalized = value.toLowerCase();
    if (normalized === "unserviciable" || normalized === "unserviceable") return "Unserviceable";
    if (normalized === "for repair" || normalized === "under repair" || normalized === "repair") return "For Repair";
    if (normalized === "under maintenance") return "For Repair";
    return value;
}

function isRepairStatus(status) {
    const normalized = normalizeStatusValue(status).toLowerCase();
    return normalized === "for repair" || normalized.includes("repair") || normalized.includes("maintenance");
}

function getVisibleStatusNames() {
    const statusCounts = {};
    const preferredOrder = ["Available", "Assigned", "For Repair", "In Use", "Unserviceable", "Disposed", "Unspecified"];

    items.forEach((item) => {
        const rawStatus = getComputedStatus(item);
        const status = normalizeStatusValue(rawStatus);
        if (!status || status === "Unspecified" && !String(rawStatus || "").trim()) {
            statusCounts.Unspecified = (statusCounts.Unspecified || 0) + 1;
            return;
        }

        statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    const statuses = Object.keys(statusCounts).filter((status) => statusCounts[status] > 0);
    const orderedStatuses = [...statuses].sort((first, second) => {
        const firstCount = statusCounts[first];
        const secondCount = statusCounts[second];
        if (firstCount !== secondCount) return secondCount - firstCount;

        const firstIndex = preferredOrder.indexOf(first);
        const secondIndex = preferredOrder.indexOf(second);
        if (firstIndex !== -1 || secondIndex !== -1) {
            return (firstIndex === -1 ? preferredOrder.length : firstIndex) - (secondIndex === -1 ? preferredOrder.length : secondIndex);
        }
        return first.localeCompare(second, undefined, { sensitivity: "base" });
    });

    return orderedStatuses.length ? orderedStatuses : ["Unspecified"];
}

function renderStats() {
    const accountablePersons = new Set(items.map((item) => String(item.accountable || "").trim()).filter(Boolean));
    const classifications = new Set(items.map((item) => String(item.itemClassification || "").trim().toLocaleLowerCase()).filter(Boolean));

    dom.totalItems.textContent = items.length;
    dom.assignedItems.textContent = accountablePersons.size;
    dom.repairItems.textContent = classifications.size;
    dom.qrItems.textContent = items.length;
}

function renderDashboard() {
    const statusCounts = getStatusCounts();
    const schoolLevelEntries = getSchoolLevelEntries();
    const acquisitionYearEntries = getYearDistribution("acquisitionDate");
    const dateIssueYearEntries = getYearDistribution("dateIssue");
    const accountableEntries = getAccountablePersonEntries();

    if (dom.portfolioChart && dom.portfolioLegend) {
        renderPortfolioChart(schoolLevelEntries);
    }
    if (dom.qrCoverage) {
        dom.qrCoverage.textContent = items.length ? "100%" : "0%";
    }
    renderStatusPie(statusCounts);
    renderMiniDistributionChart(dom.schoolLevelChart, schoolLevelEntries);
    renderMiniDistributionChart(dom.acquisitionYearChart, acquisitionYearEntries);
    renderMiniDistributionChart(dom.dateIssueYearChart, dateIssueYearEntries);
    renderAccountableBarChart(accountableEntries);
    renderRecentAssets();
}

function getSchoolLevelEntries() {
    const counts = items.reduce((bucket, item) => {
        const schoolLevel = String(item.schoolLevel || "").trim();
        if (!schoolLevel) return bucket;

        const normalized = schoolLevel.toLowerCase();
        let label = schoolLevel;
        if (normalized.includes("elementary")) label = "Elementary";
        else if (normalized.includes("junior") || normalized.includes("high school") || normalized.includes("junior high")) label = "Junior High";
        else if (normalized.includes("senior") || normalized.includes("senior high")) label = "Senior High";

        bucket[label] = (bucket[label] || 0) + 1;
        return bucket;
    }, {});

    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(([label, value], index) => ({
            label,
            value,
            color: ["#27e6a6", "#b79cff", "#f7b955", "#4dd0ff", "#ff7a59"][index % 5]
        }));
}

function getYearDistribution(field) {
    const counts = items.reduce((bucket, item) => {
        const rawValue = String(item[field] || "").trim();
        if (!rawValue) return bucket;

        const year = new Date(rawValue);
        if (Number.isNaN(year.getTime())) return bucket;

        const label = String(year.getFullYear());
        bucket[label] = (bucket[label] || 0) + 1;
        return bucket;
    }, {});

    const colorPalette = ["#669900", "#99cc33", "#ccee66", "#006699", "#3399cc", "#990066", "#cc3399", "#ff6600", "#ff9900", "#ffcc00"];

    return Object.entries(counts)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([label, value], index) => ({
            label,
            value,
            color: colorPalette[index % colorPalette.length]
        }));
}

function getAccountablePersonEntries() {
    const counts = items.reduce((bucket, item) => {
        const person = String(item.accountable || "").trim();
        if (!person) return bucket;

        bucket[person] = (bucket[person] || 0) + 1;
        return bucket;
    }, {});

    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([label, value], index) => ({
            label,
            value,
            color: ["#27e6a6", "#b79cff", "#f7b955", "#4dd0ff", "#ff7a59", "#6ef7ff", "#ff5f7a", "#9be15d"][index % 8]
        }));
}

function renderAccountableBarChart(entries) {
    if (!dom.accountablePersonChart) return;

    if (!entries.length) {
        dom.accountablePersonChart.innerHTML = '<div class="mini-chart-empty">No accountable persons yet.</div>';
        return;
    }

    const maxValue = Math.max(...entries.map((entry) => entry.value), 1);
    const pageSize = 15;
    const totalPages = Math.max(1, Math.ceil(entries.length / pageSize));

    const renderPage = (page) => {
        const safePage = Math.min(Math.max(1, page), totalPages);
        const startIndex = (safePage - 1) * pageSize;
        const pageEntries = entries.slice(startIndex, startIndex + pageSize);

        const pageButtons = [];
        if (totalPages > 1) {
            pageButtons.push(`<button class="accountable-page-btn accountably-nav-btn" type="button" data-page="${Math.max(1, safePage - 1)}" ${safePage === 1 ? "disabled" : ""}>‹</button>`);
            for (let index = 1; index <= totalPages; index += 1) {
                pageButtons.push(`<button class="accountable-page-btn ${index === safePage ? "active" : ""}" type="button" data-page="${index}">${index}</button>`);
            }
            pageButtons.push(`<button class="accountable-page-btn accountably-nav-btn" type="button" data-page="${Math.min(totalPages, safePage + 1)}" ${safePage === totalPages ? "disabled" : ""}>›</button>`);
        }

        dom.accountablePersonChart.innerHTML = `
            <div class="accountable-chart-grid">
                ${pageEntries.map((entry) => `
                    <div class="accountable-bar-row">
                        <div class="accountable-bar-figure">
                            <div class="accountable-bar-track">
                                <span class="accountable-bar-fill" style="height:${Math.max(10, Math.round((entry.value / maxValue) * 100))}%; background:${entry.color};"></span>
                            </div>
                            <strong class="accountable-bar-count">${entry.value}</strong>
                        </div>
                        <div class="accountable-bar-label">
                            <span>${escapeHtml(entry.label)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
            ${totalPages > 1 ? `<div class="accountable-pagination">${pageButtons.join("")}</div>` : ""}
        `;
    };

    dom.accountablePersonChart.onclick = (event) => {
        const button = event.target.closest(".accountable-page-btn");
        if (!button) return;
        const page = Number(button.dataset.page || 1);
        renderPage(page);
    };

    renderPage(1);
}

function renderMiniDistributionChart(container, entries) {
    if (!container) return;

    const rows = entries.length
        ? entries.map((entry) => `
            <div class="mini-chart-row">
                <div class="mini-chart-meta">
                    <span>${escapeHtml(entry.label)}</span>
                    <strong>${entry.value}</strong>
                </div>
                <div class="mini-chart-track">
                    <span class="mini-chart-fill" style="width:${Math.max(12, Math.round((entry.value / Math.max(entries[0].value, 1)) * 100))}%; background:${entry.color};"></span>
                </div>
            </div>
        `).join("")
        : '<div class="mini-chart-empty">No available data</div>';

    container.innerHTML = rows;
}

function renderPortfolioChart(levels) {
    if (!dom.portfolioChart || !dom.portfolioLegend) return;

    const chartLevels = levels.length ? levels : [{ label: "No School Level", value: 0, color: "#27e6a6" }];

    const maxValue = Math.max(...chartLevels.map((level) => level.value), 1);
    const chartPoints = chartLevels.map((level, index) => {
        const x = 8 + (index / Math.max(chartLevels.length - 1, 1)) * 84;
        const y = 92 - (level.value / maxValue) * 76;
        return { ...level, x, y };
    });
    const linePoints = chartPoints.map((point) => `${point.x},${point.y}`).join(" ");

    dom.portfolioChart.innerHTML = `
        <div class="line-chart-shell">
            <svg viewBox="0 0 100 100" class="line-chart" role="img" aria-label="School level trend chart">
                <line x1="8" y1="92" x2="92" y2="92" class="line-chart-grid"></line>
                <line x1="8" y1="70" x2="92" y2="70" class="line-chart-grid"></line>
                <line x1="8" y1="48" x2="92" y2="48" class="line-chart-grid"></line>
                <line x1="8" y1="26" x2="92" y2="26" class="line-chart-grid"></line>
                <polyline points="${linePoints}" class="line-chart-line"></polyline>
                ${chartPoints.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="3.4" fill="${point.color}" stroke="#fff" stroke-width="0.8"></circle>`).join("")}
            </svg>
            <div class="line-chart-labels">
                ${chartLevels.map((level) => `<span style="color:${level.color}">${escapeHtml(level.label)}</span>`).join("")}
            </div>
        </div>
    `;
    dom.portfolioLegend.innerHTML = chartLevels.map((level) => `
        <div class="hero-metric-card">
            <span>${escapeHtml(level.label)}</span>
            <strong>${level.value}</strong>
        </div>
    `).join("");
}

function renderStatusPie(statusCounts) {
    const statuses = getVisibleStatusNames();
    const total = Math.max(items.length, 1);
    const slices = statuses.map((status) => {
        const normalizedStatus = normalizeStatusValue(status);
        const count = statusCounts[normalizedStatus] || 0;
        const percent = count / total;
        return {
            status: normalizedStatus,
            count,
            percent,
            color: getStatusColor(normalizedStatus)
        };
    }).filter((slice) => slice.count > 0);

    if (!slices.length) {
        dom.statusLineChart.innerHTML = '<div class="status-empty">No status data yet.</div>';
        return;
    }

    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    const segments = slices.map((slice) => {
        const dash = circumference * slice.percent;
        const circle = `<circle cx="50" cy="50" r="${radius}" fill="transparent" stroke="${slice.color}" stroke-width="18" stroke-dasharray="${dash} ${circumference - dash}" stroke-dashoffset="${-offset}" transform="rotate(-90 50 50)"></circle>`;
        offset += dash;
        return circle;
    }).join("");

    dom.statusLineChart.innerHTML = `
        <div class="status-pie-shell">
            <svg viewBox="0 0 100 100" class="status-pie-svg" role="img" aria-label="Status distribution pie chart">
                <circle cx="50" cy="50" r="${radius}" fill="transparent" stroke="rgba(255,255,255,0.12)" stroke-width="18"></circle>
                ${segments}
            </svg>
            <div class="status-pie-legend">
                ${slices.map((slice) => `
                    <div class="status-pie-item">
                        <span class="legend-dot" style="background:${slice.color}"></span>
                        <span style="color:${slice.color}">${escapeHtml(slice.status)}</span>
                        <strong>${slice.count}</strong>
                    </div>
                `).join("")}
            </div>
        </div>
    `;
}

function getStatusCounts() {
    const counts = {};

    items.forEach((item) => {
        const status = normalizeStatusValue(getComputedStatus(item));
        if (!status || status === "Unspecified" && !String(getComputedStatus(item) || "").trim()) {
            counts.Unspecified = (counts.Unspecified || 0) + 1;
            return;
        }

        counts[status] = (counts[status] || 0) + 1;
    });

    return counts;
}

function getStatusColor(status) {
    const normalized = normalizeStatusValue(status);
    const palette = {
        Available: "#669900",
        Assigned: "#99cc33",
        "For Repair": "#ccee66",
        "In Use": "#006699",
        Unserviceable: "#3399cc",
        Disposed: "#990066",
        Returned: "#cc3399",
        Stolen: "#ff6600",
        Borrowed: "#ff9900",
        Unspecified: "#ffcc00",
        Maintenance: "#669900",
        Issued: "#99cc33",
        Lost: "#ccee66",
        Damaged: "#006699",
        Transferred: "#3399cc",
        Pending: "#990066",
        Other: "#cc3399"
    };

    if (palette[normalized]) {
        return palette[normalized];
    }

    const colorList = ["#669900", "#99cc33", "#ccee66", "#006699", "#3399cc", "#990066", "#cc3399", "#ff6600", "#ff9900", "#ffcc00"];
    const hash = [...normalized].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colorList[hash % colorList.length];
}

function renderRecentAssets() {
    const recent = [...items]
        .sort((first, second) => getTimestamp(second.updatedAt || second.createdAt) - getTimestamp(first.updatedAt || first.createdAt))
        .slice(0, 8);

    dom.recentAssets.innerHTML = recent.length
        ? recent.map((item) => `
            <div class="recent-item">
                <div>
                    <strong>${escapeHtml(item.itemBrandModel || item.propertyNo || item.assetId)}</strong>
                    <span>${escapeHtml(item.propertyNo || item.assetId)} · ${escapeHtml(item.accountable || "Unassigned")}</span>
                </div>
                <time>${escapeHtml(formatShortDate(item.updatedAt || item.createdAt))}</time>
            </div>
        `).join("")
        : `<div class="recent-item"><div><strong>No records yet</strong><span>Add an asset to populate the dashboard.</span></div><time>-</time></div>`;
}

function renderQrAssetList() {
    if (!dom.qrAssetList) return;

    const totalQrPages = Math.max(1, Math.ceil(items.length / qrRowsPerPage));
    const startIndex = (qrPage - 1) * qrRowsPerPage;
    const visibleItems = items.slice(startIndex, startIndex + qrRowsPerPage);

    dom.qrAssetList.innerHTML = items.length
        ? `
            <div class="qr-selection-table">
                <div class="qr-selection-header">
                    <span>Property No.</span>
                    <span>Item/Brand/Model</span>
                    <span>Serial No.</span>
                    <span>Classification</span>
                    <span>Accountable</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>
                ${visibleItems.map((item) => {
                    const isSelected = item.assetId === selectedId;
                    const status = getComputedStatus(item);
                    return `
                        <div class="qr-selection-row ${isSelected ? "active" : ""}" data-qr-id="${escapeHtml(item.assetId)}">
                            <span class="qr-cell qr-property-no">${escapeHtml(item.propertyNo || item.assetId)}</span>
                            <span class="qr-cell qr-item">${escapeHtml(item.itemBrandModel || "-")}</span>
                            <span class="qr-cell qr-serial">${escapeHtml(item.serialNo || "-")}</span>
                            <span class="qr-cell qr-classification">${escapeHtml(item.itemClassification || "-")}</span>
                            <span class="qr-cell qr-accountable">${escapeHtml(item.accountable || "Unassigned")}</span>
                            <span class="qr-cell qr-status"><span class="badge" style="${getStatusBadgeStyles(status)}">${escapeHtml(status || "Unspecified")}</span></span>
                            <span class="qr-cell qr-actions">
                                <button class="qr-action-btn" type="button" data-qr-id="${escapeHtml(item.assetId)}">${isSelected ? "Selected" : "Select"}</button>
                            </span>
                        </div>
                    `;
                }).join("")}
                ${totalQrPages > 1 ? `
                    <div class="qr-pagination">
                        <button class="inventory-page-btn" type="button" data-qr-page="prev" data-qr-id="" ${qrPage === 1 ? "disabled" : ""}>Previous</button>
                        <span class="inventory-page-status">Page ${qrPage} of ${totalQrPages}</span>
                        <button class="inventory-page-btn" type="button" data-qr-page="next" data-qr-id="" ${qrPage === totalQrPages ? "disabled" : ""}>Next</button>
                    </div>
                ` : ""}
            </div>
        `
        : `<div class="report-item"><strong>No assets available</strong><span>Add assets in the Inventory module first.</span></div>`;
}

function renderReports() {
    renderReportOptions();
    if (!dom.reportAsOf.value) {
        dom.reportAsOf.value = new Date().toISOString().slice(0, 10);
    }
    renderPhysicalCountReport();
    renderAllAssetsView();
}

function renderAllAssetsView() {
    if (!dom.allAssetsTable) return;
    const query = (dom.assetDatabaseSearch?.value || "").trim().toLowerCase();
    const filteredItems = items.filter((item) => !query || Object.values(item).join(" ").toLowerCase().includes(query));
    const fields = [
        "assetId", "educationLevel", "fundCluster", "inventoryType", "propertyNo", "itemClassification",
        "itemBrandModel", "serialNo", "acquisitionDate", "accountable", "schoolLevel", "semiExpandableNo",
        "unitValue", "total", "unitMeasurement", "balance", "onHand", "shortageOverageQty", "shortageOverageValue",
        "location", "mooeMonth", "mooeYear", "dateIssue", "status", "additionalItem", "remarks"
    ];

    dom.assetCount.textContent = `${filteredItems.length} ${filteredItems.length === 1 ? "asset" : "assets"}`;
    dom.allAssetsTable.innerHTML = filteredItems.length
        ? filteredItems.map((item) => `<tr>${fields.map((field) => `<td>${reportCell(item[field], "-")}</td>`).join("")}</tr>`).join("")
        : `<tr><td colspan="26" class="report-empty-row">No matching assets</td></tr>`;
}

function getReportItems() {
    const inventoryType = dom.reportInventoryType.value;
    const fundCluster = dom.reportFundCluster.value;

    return items.filter((item) => {
        const matchesType = !inventoryType || (item.inventoryType || "") === inventoryType;
        const matchesFund = !fundCluster || (item.fundCluster || "") === fundCluster;
        return matchesType && matchesFund;
    });
}

function formatReportDate(value) {
    if (!value) return "________________";
    return new Intl.DateTimeFormat("en-PH", { month: "long", day: "numeric", year: "numeric" })
        .format(new Date(`${value}T00:00:00`));
}

function renderReportOptions() {
    const selectedType = dom.reportInventoryType.value;
    const selectedFund = dom.reportFundCluster.value;
    const types = [...new Set(items.map((item) => item.inventoryType).filter(Boolean))].sort();
    const funds = [...new Set(items.map((item) => item.fundCluster).filter(Boolean))].sort();

    dom.reportInventoryType.innerHTML = `<option value="">All inventory types</option>${types.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;
    dom.reportFundCluster.innerHTML = `<option value="">All fund clusters</option>${funds.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;
    dom.reportInventoryType.value = types.includes(selectedType) ? selectedType : "";
    dom.reportFundCluster.value = funds.includes(selectedFund) ? selectedFund : "";
}

function reportCell(value, fallback = "") {
    return escapeHtml(value === 0 ? "0" : (value || fallback));
}

function renderPhysicalCountReport() {
    if (!dom.physicalReport) return;
    const reportItems = getReportItems();
    const inventoryType = dom.reportInventoryType.value || "SCHOOL FURNITURES";
    const fundCluster = dom.reportFundCluster.value || "____________________________";
    const signatories = [
        ["Certified Correct by:", dom.certifiedCorrectedBy?.value || ""],
        ["Approved by:", dom.approvedBy?.value || ""],
        ["Verified by:", dom.verifiedBy?.value || ""]
    ];

    dom.physicalReport.innerHTML = `
        <div class="physical-report-header">
            <strong>REPORT ON THE PHYSICAL COUNT OF SEMI-EXPENDABLE PROPERTY</strong>
            <strong class="report-title-underline">${escapeHtml(inventoryType.toUpperCase())}</strong>
            <span>(Type of Inventory Item)</span>
            <span>As of <u>${formatReportDate(dom.reportAsOf.value)}</u></span>
        </div>
        <div class="report-fund-cluster"><strong>Fund Cluster :</strong> ${escapeHtml(fundCluster)}</div>
        <div class="physical-report-table-wrap">
            <table class="physical-report-table">
                <colgroup>
                    <col class="report-col-article">
                    <col class="report-col-description">
                    <col class="report-col-property-number">
                    <col class="report-col-unit-measure">
                    <col class="report-col-unit-value">
                    <col class="report-col-total">
                    <col class="report-col-date-acquired">
                    <col class="report-col-balance">
                    <col class="report-col-on-hand">
                    <col class="report-col-shortage-quantity">
                    <col class="report-col-shortage-value">
                    <col class="report-col-accountable">
                    <col class="report-col-location">
                    <col class="report-col-status">
                </colgroup>
                <thead>
                    <tr>
                        <th rowspan="2">Article</th>
                        <th rowspan="2">Description</th>
                        <th rowspan="2">Semi-Expandable<br>Property Number</th>
                        <th rowspan="2">Unit of<br>Measure</th>
                        <th colspan="2">Amount</th>
                        <th rowspan="2">Date<br>Acquired</th>
                        <th rowspan="2">Balance Per<br>Card<br><small>(Quantity)</small></th>
                        <th rowspan="2">On Hand<br>Per Count<br><small>(Quantity)</small></th>
                        <th colspan="2">Shortage/Overage</th>
                        <th colspan="3">Remarks</th>
                    </tr>
                    <tr>
                        <th>Unit Value</th>
                        <th>Total</th>
                        <th>Quantity</th>
                        <th>Value</th>
                        <th>Current Accountable Personnel</th>
                        <th>Location</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${reportItems.length ? reportItems.map((item) => `
                        <tr>
                            <td>${reportCell(item.inventoryType || item.itemClassification)}</td>
                            <td>${reportCell(item.itemBrandModel)}</td>
                            <td>${reportCell(item.semiExpandableNo || item.propertyNo)}</td>
                            <td>${reportCell(item.unitMeasurement)}</td>
                            <td>${reportCell(item.unitValue)}</td>
                            <td>${reportCell(item.total)}</td>
                            <td>${reportCell(item.acquisitionDate)}</td>
                            <td>${reportCell(item.balance)}</td>
                            <td>${reportCell(item.onHand)}</td>
                            <td>${reportCell(item.shortageOverageQty)}</td>
                            <td>${reportCell(item.shortageOverageValue)}</td>
                            <td>${reportCell(item.accountable)}</td>
                            <td>${reportCell(item.location)}</td>
                            <td>${reportCell(item.status)}</td>
                        </tr>
                    `).join("") : `<tr><td colspan="14" class="report-empty-row">No matching inventory records</td></tr>`}
                </tbody>
            </table>
        </div>
        <div class="report-signatures">
            ${signatories.map(([label, value], index) => `<div><span>${label}</span><strong class="report-signatory-name">${reportCell(value, "")}</strong><i></i><small>${index === 0 ? "Signature over Printed Name of Inventory<br>Committee Chair and Members" : index === 1 ? "Signature over Printed Name of Head of<br>Agency/Entity or Authorized" : "Signature over Printed Name of COA Representative"}</small></div>`).join("")}
        </div>
    `;
}

async function generateReportPdf() {
    if (!window.html2canvas || !window.jspdf?.jsPDF) {
        showToast("PDF tools are still loading. Check your internet connection and try again.");
        return;
    }

    const report = dom.physicalReport;
    const previous = { overflow: report.style.overflow, maxHeight: report.style.maxHeight, width: report.style.width };
    report.style.overflow = "visible";
    report.style.maxHeight = "none";
    report.style.width = `${report.scrollWidth}px`;
    report.classList.add("pdf-export");

    try {
        const canvas = await window.html2canvas(report, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
        const { jsPDF } = window.jspdf;
        const pageWidth = 13;
        const pageHeight = 8.5;
        const pageMargin = 0.2;
        const bottomMargin = 0.5;
        const contentWidth = pageWidth - (pageMargin * 2);
        const contentHeight = pageHeight - pageMargin - bottomMargin;
        const pdf = new jsPDF({ orientation: "landscape", unit: "in", format: [pageWidth, pageHeight] });
        const imageWidth = contentWidth;
        const imageHeight = (canvas.height * imageWidth) / canvas.width;
        const sourcePageHeight = Math.floor((contentHeight * canvas.width) / imageWidth);
        let sourceOffset = 0;

        while (sourceOffset < canvas.height) {
            if (sourceOffset > 0) pdf.addPage([pageWidth, pageHeight], "landscape");

            const sliceHeight = Math.min(sourcePageHeight, canvas.height - sourceOffset);
            const pageCanvas = document.createElement("canvas");
            pageCanvas.width = canvas.width;
            pageCanvas.height = sliceHeight;
            pageCanvas.getContext("2d").drawImage(
                canvas,
                0,
                sourceOffset,
                canvas.width,
                sliceHeight,
                0,
                0,
                canvas.width,
                sliceHeight
            );

            const pageImageHeight = (sliceHeight * imageWidth) / canvas.width;
            pdf.addImage(pageCanvas.toDataURL("image/png"), "PNG", pageMargin, pageMargin, imageWidth, pageImageHeight);
            pdf.setFillColor(255, 255, 255);
            pdf.rect(0, pageHeight - bottomMargin, pageWidth, bottomMargin, "F");
            sourceOffset += sliceHeight;
        }

        pdf.save(`physical-count-report-${dom.reportAsOf.value || "undated"}.pdf`);
        showToast("PDF generated successfully.");
    } catch (error) {
        console.error(error);
        showToast("Unable to generate the PDF.");
    } finally {
        report.style.overflow = previous.overflow;
        report.style.maxHeight = previous.maxHeight;
        report.style.width = previous.width;
        report.classList.remove("pdf-export");
    }
}

function parseMoney(value) {
    const number = Number(String(value || "").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(number) ? number : 0;
}

function formatPeso(value) {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        maximumFractionDigits: 2
    }).format(value);
}

function getTimestamp(value) {
    const timestamp = new Date(value || 0).getTime();
    return Number.isNaN(timestamp) ? 0 : timestamp;
}

function formatShortDate(value) {
    const timestamp = getTimestamp(value);
    if (!timestamp) return "No date";

    return new Intl.DateTimeFormat("en-PH", {
        month: "short",
        day: "numeric"
    }).format(new Date(timestamp));
}

function formatSlipDate(value) {
    const timestamp = getTimestamp(value);
    if (!timestamp) return "";

    return new Intl.DateTimeFormat("en-PH", {
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(new Date(timestamp));
}

function getFilteredItems() {
    const query = dom.searchInput.value.trim().toLowerCase();
    const status = dom.statusFilter.value;

    return items.filter((item) => {
        const itemStatus = getComputedStatus(item);
        const searchable = [
            item.assetId,
            item.fundCluster,
            item.inventoryType,
            item.propertyNo,
            item.itemClassification,
            item.itemBrandModel,
            item.serialNo,
            item.acquisitionDate,
            item.accountable,
            item.schoolLevel,
            item.dateIssue,
            item.status,
            item.remarks,
            itemStatus
        ].join(" ").toLowerCase();

        const matchesQuery = !query || searchable.includes(query);
        const matchesStatus = status === "All" || itemStatus === status;
        return matchesQuery && matchesStatus;
    });
}

function getStatusBadgeStyles(status) {
    const normalized = normalizeStatusValue(status);
    const palette = {
        Available: { color: "#669900", background: "rgba(102, 153, 0, 0.16)", border: "rgba(102, 153, 0, 0.28)" },
        Assigned: { color: "#99cc33", background: "rgba(153, 204, 51, 0.16)", border: "rgba(153, 204, 51, 0.28)" },
        "For Repair": { color: "#ccee66", background: "rgba(204, 238, 102, 0.16)", border: "rgba(204, 238, 102, 0.28)" },
        "In Use": { color: "#006699", background: "rgba(0, 102, 153, 0.16)", border: "rgba(0, 102, 153, 0.28)" },
        Unserviceable: { color: "#3399cc", background: "rgba(51, 153, 204, 0.16)", border: "rgba(51, 153, 204, 0.28)" },
        Disposed: { color: "#990066", background: "rgba(153, 0, 102, 0.16)", border: "rgba(153, 0, 102, 0.28)" },
        Returned: { color: "#cc3399", background: "rgba(204, 51, 153, 0.16)", border: "rgba(204, 51, 153, 0.28)" },
        Stolen: { color: "#ff6600", background: "rgba(255, 102, 0, 0.16)", border: "rgba(255, 102, 0, 0.28)" },
        Borrowed: { color: "#ff9900", background: "rgba(255, 153, 0, 0.16)", border: "rgba(255, 153, 0, 0.28)" },
        Unspecified: { color: "#ffcc00", background: "rgba(255, 204, 0, 0.16)", border: "rgba(255, 204, 0, 0.28)" },
        Maintenance: { color: "#669900", background: "rgba(102, 153, 0, 0.16)", border: "rgba(102, 153, 0, 0.28)" },
        Issued: { color: "#99cc33", background: "rgba(153, 204, 51, 0.16)", border: "rgba(153, 204, 51, 0.28)" },
        Lost: { color: "#ccee66", background: "rgba(204, 238, 102, 0.16)", border: "rgba(204, 238, 102, 0.28)" },
        Damaged: { color: "#006699", background: "rgba(0, 102, 153, 0.16)", border: "rgba(0, 102, 153, 0.28)" },
        Transferred: { color: "#3399cc", background: "rgba(51, 153, 204, 0.16)", border: "rgba(51, 153, 204, 0.28)" },
        Pending: { color: "#990066", background: "rgba(153, 0, 102, 0.16)", border: "rgba(153, 0, 102, 0.28)" },
        Other: { color: "#cc3399", background: "rgba(204, 51, 153, 0.16)", border: "rgba(204, 51, 153, 0.28)" }
    };

    const match = palette[normalized] || palette.Other;
    return `--badge-color:${match.color};--badge-background:${match.background};--badge-border:${match.border};`;
}

function renderTable() {
    const filteredItems = getFilteredItems();
    const totalPages = Math.max(1, Math.ceil(filteredItems.length / inventoryRowsPerPage));

    if (inventoryPage > totalPages) {
        inventoryPage = totalPages;
    }

    const startIndex = (inventoryPage - 1) * inventoryRowsPerPage;
    const visibleItems = filteredItems.slice(startIndex, startIndex + inventoryRowsPerPage);

    dom.table.innerHTML = "";
    dom.emptyState.style.display = filteredItems.length ? "none" : "block";

    visibleItems.forEach((item) => {
        const status = getComputedStatus(item);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${escapeHtml(item.propertyNo || item.assetId)}</td>
            <td>
                <span class="item-title">
                    <strong>${escapeHtml(item.itemBrandModel)}</strong>
                </span>
            </td>
            <td>${escapeHtml(item.serialNo || "-")}</td>
            <td>${escapeHtml(item.itemClassification || "-")}</td>
            <td>${escapeHtml(item.accountable || "Unassigned")}</td>
            <td><span class="badge" style="${getStatusBadgeStyles(status)}">${escapeHtml(status || "Unspecified")}</span></td>
            <td>
                <div class="row-actions">
                    <button type="button" data-action="qr" data-id="${escapeHtml(item.assetId)}">QR</button>
                    <button type="button" data-action="edit" data-id="${escapeHtml(item.assetId)}">Edit</button>
                    <button type="button" data-action="delete" data-id="${escapeHtml(item.assetId)}">Delete</button>
                </div>
            </td>
        `;
        dom.table.appendChild(row);
    });

    if (filteredItems.length > inventoryRowsPerPage) {
        dom.pagination.innerHTML = `
            <button class="inventory-page-btn" type="button" data-page="prev" ${inventoryPage === 1 ? "disabled" : ""}>Previous</button>
            <span class="inventory-page-status">Page ${inventoryPage} of ${totalPages}</span>
            <button class="inventory-page-btn" type="button" data-page="next" ${inventoryPage === totalPages ? "disabled" : ""}>Next</button>
        `;
    } else {
        dom.pagination.innerHTML = "";
    }
}

function renderQr() {
    const item = items.find((entry) => entry.assetId === selectedId);
    dom.qrCode.innerHTML = "";
    dom.openQrLinkBtn.hidden = true;
    dom.openQrLinkBtn.removeAttribute("data-asset-url");

    if (!item) {
        dom.qrTitle.textContent = "Select an item";
        dom.qrStatus.textContent = "Waiting";
        dom.qrCode.textContent = "Choose an inventory record to generate its QR code.";
        setQrDetails();
        return;
    }

    dom.qrTitle.textContent = item.itemBrandModel || item.propertyNo || item.assetId;
    dom.qrStatus.textContent = item.status || "Unspecified";
    const assetLink = getQrPayload(item);
    dom.openQrLinkBtn.dataset.assetUrl = assetLink;
    dom.openQrLinkBtn.hidden = false;
    setQrDetails(item);

    if (!window.QRCode) {
        dom.qrCode.textContent = "QR library is loading. Check your internet connection and refresh.";
        return;
    }

    new QRCode(dom.qrCode, {
        text: assetLink,
        width: 300,
        height: 300,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
    });
}

function setQrDetails(item) {
    const details = item
        ? [item.itemClassification || "Unspecified", item.propertyNo || item.assetId, item.accountable || "Unassigned", item.serialNo || "Not specified"]
        : ["-", "-", "-", "-"];

    dom.qrDetails.querySelectorAll("dd").forEach((node, index) => {
        node.textContent = details[index];
    });
}

function renderApp() {
    selectedId = selectedId || (items[0] && items[0].assetId) || null;
    renderStats();
    renderDashboard();
    renderTable();
    renderQr();
    if (dom.qrAssetList) {
        renderQrAssetList();
    }
    renderReports();
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function showToast(message) {
    dom.toast.textContent = message;
    dom.toast.classList.add("show");
    window.setTimeout(() => dom.toast.classList.remove("show"), 2200);
}

function downloadQr() {
    const item = items.find((entry) => entry.assetId === selectedId);
    const canvas = dom.qrCode.querySelector("canvas");
    const image = dom.qrCode.querySelector("img");

    if (!item || (!canvas && !image)) {
        showToast("Select an item with a generated QR code first.");
        return;
    }

    // prepare source canvas (either existing canvas or drawn from image)
    const makeSrcCanvas = () => new Promise((resolve, reject) => {
        if (canvas) return resolve(canvas);
        const img = image.cloneNode();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            try {
                const tmp = document.createElement("canvas");
                tmp.width = img.naturalWidth || img.width;
                tmp.height = img.naturalHeight || img.height;
                const tctx = tmp.getContext("2d");
                tctx.drawImage(img, 0, 0);
                resolve(tmp);
            } catch (err) {
                reject(err);
            }
        };
        img.onerror = () => reject(new Error("Image load failed"));
        img.src = image.src;
    });

    makeSrcCanvas()
        .then((src) => {
            try {
                const sctx = src.getContext("2d");
                const w = src.width;
                const h = src.height;
                let moduleSize = 0;

                // attempt to detect first dark pixel to compute module size
                try {
                    const data = sctx.getImageData(0, 0, w, h).data;
                    const isDark = (x, y) => {
                        const i = (y * w + x) * 4;
                        const r = data[i], g = data[i + 1], b = data[i + 2];
                        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                        return lum < 128;
                    };

                    let firstX = -1, firstY = -1;
                    outer: for (let y = 0; y < h; y++) {
                        for (let x = 0; x < w; x++) {
                            if (isDark(x, y)) {
                                firstX = x;
                                firstY = y;
                                break outer;
                            }
                        }
                    }

                    if (firstX >= 0) {
                        // measure run length of the first black region horizontally
                        let x1 = firstX;
                        while (x1 < w && isDark(x1, firstY)) x1++;
                        const blackWidth = x1 - firstX;
                        // Finder outer square is 7 modules wide
                        moduleSize = Math.max(1, Math.round(blackWidth / 7));
                    }
                } catch (err) {
                    moduleSize = 0;
                }

                let quietAdd = 0;

                if (moduleSize > 0) {
                    // compute existing quiet (distance from left edge to first dark pixel)
                    let existingQuiet = 0;
                    try {
                        const data = sctx.getImageData(0, 0, w, h).data;
                        const isDark = (x, y) => {
                            const i = (y * w + x) * 4;
                            const r = data[i], g = data[i + 1], b = data[i + 2];
                            const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                            return lum < 128;
                        };
                        outer2: for (let y = 0; y < h; y++) {
                            for (let x = 0; x < w; x++) {
                                if (isDark(x, y)) {
                                    existingQuiet = x;
                                    break outer2;
                                }
                            }
                        }
                    } catch (e) {
                        existingQuiet = 0;
                    }

                    const requiredQuiet = moduleSize * 4; // exact 4-module quiet zone
                    if (existingQuiet < requiredQuiet) {
                        quietAdd = requiredQuiet - existingQuiet;
                    }
                }

                // fallback if detection failed
                if (!quietAdd && moduleSize === 0) {
                    const srcSize = Math.max(src.width, src.height);
                    quietAdd = Math.max(20, Math.round(srcSize * 0.1));
                }

                const outW = src.width + quietAdd * 2;
                const outH = src.height + quietAdd * 2;
                const out = document.createElement("canvas");
                out.width = outW;
                out.height = outH;
                const ctx = out.getContext("2d");

                // white background
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, outW, outH);

                // draw centered with added quiet (if any)
                ctx.drawImage(src, quietAdd, quietAdd, src.width, src.height);

                const link = document.createElement("a");
                const fileName = (item.itemBrandModel || "qr-code")
                    .trim()
                    .replace(/[<>:"/\\|?*]+/g, "-")
                    .replace(/[. ]+$/, "") || "qr-code";
                const serialNumber = (item.serialNo || "No Serial No.")
                    .trim()
                    .replace(/[<>:"/\\|?*]+/g, "-")
                    .replace(/[. ]+$/, "") || "No Serial No";
                link.download = `${fileName} - ${serialNumber}.png`;
                link.href = out.toDataURL("image/png");
                link.click();
            } catch (err) {
                showToast("Unable to prepare QR image for download.");
            }
        })
        .catch(() => showToast("Unable to prepare QR image for download."));
}

function copyQrData() {
    const item = items.find((entry) => entry.assetId === selectedId);

    if (!item) {
        showToast("Select an item first.");
        return;
    }

    navigator.clipboard
        .writeText(getQrPayload(item))
        .then(() => showToast("QR data copied."))
        .catch(() => showToast("Unable to copy QR data."));
}

function openSelectedAssetLink() {
    const item = items.find((entry) => entry.assetId === selectedId);
    if (!item) {
        showToast("Select an item first.");
        return;
    }

    const popup = window.open(getQrPayload(item), "_blank", "noopener,noreferrer");
    if (!popup) {
        showToast("Please allow popups for this site.");
    }
}

function getSlipRecords() {
    const filteredItems = getFilteredItems();
    return filteredItems.length ? filteredItems : items;
}

function getSharedField(records, key) {
    const values = [...new Set(records.map((item) => String(item[key] || "").trim()).filter(Boolean))];
    if (!values.length) return "";
    return values.length === 1 ? values[0] : "Multiple";
}

function getSlipDescription(item) {
    return [
        item.description || item.itemBrandModel || item.itemClassification || "Inventory item",
        item.serialNo ? `Serial No. ${item.serialNo}` : "",
        item.itemClassification && item.itemBrandModel ? item.itemClassification : ""
    ].filter(Boolean).join(" / ");
}

function createSlipRows(records) {
    const visibleRows = Math.max(records.length, 8);
    return Array.from({ length: visibleRows }, (_, index) => {
        const item = records[index];
        if (!item) {
            return `
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            `;
        }

        const quantity = item.quantity || item.onHand || item.balance || "1";
        const unitCostValue = item.unitCost ?? item.unitValue ?? "";
        const totalCostValue = item.totalCost ?? item.total ?? "";
        const unitCost = unitCostValue !== "" ? formatPeso(parseMoney(unitCostValue)) : "";
        const totalCost = totalCostValue !== "" ? formatPeso(parseMoney(totalCostValue)) : unitCost;
        const inventoryNumber = item.inventoryItemNo || item.semiExpandableNo || item.propertyNo || item.assetId || "";
        const estimatedUsefulLife = item.estimatedUsefulLife || item.remarks || "";

        return `
            <tr>
                <td>${escapeHtml(quantity)}</td>
                <td>${escapeHtml(item.unit || item.unitMeasurement || "unit")}</td>
                <td>${escapeHtml(unitCost)}</td>
                <td>${escapeHtml(totalCost)}</td>
                <td class="ics-description">${escapeHtml(getSlipDescription(item))}</td>
                <td>${escapeHtml(inventoryNumber)}</td>
                <td>${escapeHtml(estimatedUsefulLife)}</td>
            </tr>
        `;
    }).join("");
}

async function getLogoDataUrl() {
    const logoUrl = new URL("images/caso_logo.png", window.location.href).href;

    try {
        const response = await fetch(logoUrl);
        if (!response.ok) throw new Error("Logo load failed");
        const blob = await response.blob();

        return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error || new Error("Logo read failed"));
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.warn("Unable to embed CASO logo, falling back to image path.", error);
        return logoUrl;
    }
}

function buildInventoryCustodianSlip(records, logoSrc, options = {}) {
    const entityName = options.entityName || "School Property Information System";
    const fundCluster = options.fundCluster || getSharedField(records, "fundCluster");
    const icsNo = options.icsNo || getSharedField(records, "propertyNo") || getSharedField(records, "assetId");
    const receivedFrom = options.receivedFrom || getSharedField(records, "receivedFrom");
    const receivedBy = options.receivedBy || getSharedField(records, "accountable") || getSharedField(records, "receivedBy");
    const receivedFromPosition = options.receivedFromPosition || getSharedField(records, "receivedFromPosition");
    const receivedByPosition = options.receivedByPosition || getSharedField(records, "receivedByPosition");
    const receivedFromDate = formatSlipDate(options.receivedFromDate || getSharedField(records, "receivedFromDate"));
    const receivedByDate = formatSlipDate(options.receivedByDate || getSharedField(records, "receivedByDate") || getSharedField(records, "dateIssue")) || formatSlipDate(new Date().toISOString());

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Inventory Custodian Slip</title>
    <style>
        @page {
            size: 210mm 297mm;
            margin: 10mm 12mm;
        }

        * {
            box-sizing: border-box;
        }

        html {
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            background: #ffffff;
        }

        body {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            color: #000000;
            background: #ffffff;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            line-height: 1.25;
        }

        .ics-sheet {
            width: 186mm;
            min-height: 277mm;
            margin: 0 auto;
            padding: 0;
        }

        .ics-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 6px;
            margin-bottom: 8px;
        }

        .ics-logo {
            width: 50px;
            height: 50px;
            object-fit: contain;
            display: block;
            margin: 0 auto;
        }

        h1 {
            margin: 0;
            text-align: center;
            font-size: 16px;
            font-weight: 700;
            letter-spacing: 0.5px;
        }

        .ics-meta {
            width: 100%;
            margin-bottom: 8px;
            border-collapse: collapse;
            table-layout: fixed;
        }

        .ics-meta td {
            height: 24px;
            padding: 3px 4px;
            border: none;
            vertical-align: bottom;
        }

        .ics-meta .label {
            width: 78px;
            font-weight: 700;
            white-space: nowrap;
        }

        .ics-meta .ics-number-label {
            width: 58px;
            font-weight: 700;
            text-align: right;
        }

        .ics-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }

        .ics-table th,
        .ics-table td {
            border: 1px solid #000000;
            padding: 4px 5px;
            text-align: center;
            vertical-align: middle;
        }

        .ics-table th {
            height: 26px;
            font-weight: 700;
        }

        .ics-table td {
            height: 28px;
        }

        .ics-table .amount-heading {
            border-bottom: 1px solid #000000;
        }

        .ics-table .ics-description {
            text-align: left;
        }

        .ics-signatures {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }

        .ics-signatures td {
            border: 1px solid #000000;
            padding: 5px 8px;
            vertical-align: top;
        }

        .ics-signatures .sign-title {
            height: 28px;
            font-weight: 700;
        }

        .signature-line {
            height: 42px;
            padding-top: 22px;
            text-align: center;
            text-transform: uppercase;
            font-weight: 700;
        }

        .caption {
            display: block;
            margin-top: 2px;
            text-align: center;
            font-size: 10px;
            font-weight: 400;
            text-transform: none;
        }

        .position-line,
        .date-line {
            height: 28px;
            text-align: center;
        }

        .no-print {
            position: fixed;
            top: 14px;
            right: 14px;
            z-index: 9999;
            display: flex;
            gap: 8px;
        }

        .no-print button {
            padding: 8px 16px;
            border: 1px solid #1a2640;
            border-radius: 6px;
            color: #ffffff;
            background: #0f172a;
            font: inherit;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            transition: background 0.15s ease;
        }

        .no-print button:hover {
            background: #1e293b;
        }

        @media print {
            .no-print {
                display: none;
            }

            .ics-sheet {
                width: 186mm;
                min-height: auto;
            }
        }
    </style>
</head>
<body>
    <div class="no-print"><button type="button" onclick="window.print()">Print / Save PDF</button></div>
    <main class="ics-sheet">
        <header class="ics-header">
            <img class="ics-logo" src="${logoSrc}" alt="CASO logo">
            <h1><strong>INVENTORY CUSTODIAN SLIP</strong></h1>
        </header>

        <table class="ics-meta" aria-label="Inventory custodian slip details">
            <tr>
                <td class="label">Entity Name:</td>
                <td>${escapeHtml(entityName)}</td>
                <td class="ics-number-label" rowspan="2">ICS No.:</td>
                <td rowspan="2">${escapeHtml(icsNo)}</td>
            </tr>
            <tr>
                <td class="label">Fund Cluster:</td>
                <td>${escapeHtml(fundCluster)}</td>
            </tr>
        </table>

        <table class="ics-table" aria-label="Inventory items">
            <colgroup>
                <col style="width: 8%;">
                <col style="width: 8%;">
                <col style="width: 11%;">
                <col style="width: 11%;">
                <col style="width: 35%;">
                <col style="width: 15%;">
                <col style="width: 15%;">
            </colgroup>
            <thead>
                <tr>
                    <th rowspan="2">Quantity</th>
                    <th rowspan="2">Unit</th>
                    <th class="amount-heading" colspan="2">Amount</th>
                    <th rowspan="2">Description</th>
                    <th rowspan="2">Inventory Item No.</th>
                    <th rowspan="2">Estimated Useful Life</th>
                </tr>
                <tr>
                    <th>Unit Cost</th>
                    <th>Total Cost</th>
                </tr>
            </thead>
            <tbody>
                ${createSlipRows(records)}
            </tbody>
        </table>

        <table class="ics-signatures" aria-label="Received signatures">
            <tr>
                <td class="sign-title">Received from:</td>
                <td class="sign-title">Received by:</td>
            </tr>
            <tr>
                <td>
                    <div class="signature-line">${escapeHtml(receivedFrom)}<span class="caption">Signature Over Printed Name</span></div>
                </td>
                <td>
                    <div class="signature-line">${escapeHtml(receivedBy)}<span class="caption">Signature Over Printed Name</span></div>
                </td>
            </tr>
            <tr>
                <td class="position-line">${escapeHtml(receivedFromPosition)}<span class="caption">Position/Office</span></td>
                <td class="position-line">${escapeHtml(receivedByPosition)}<span class="caption">Position/Office</span></td>
            </tr>
            <tr>
                <td class="date-line">${escapeHtml(receivedFromDate)}<span class="caption">Date</span></td>
                <td class="date-line">${escapeHtml(receivedByDate)}<span class="caption">Date</span></td>
            </tr>
        </table>
    </main>
</body>
</html>`;
}

async function generateInventoryCustodianSlip() {
    const records = getSlipRecords();

    if (!records.length) {
        showToast("Add inventory records before generating an ICS PDF.");
        return;
    }

    const slipWindow = window.open("", "_blank");
    if (!slipWindow) {
        showToast("Please allow popups to generate the ICS PDF.");
        return;
    }

    slipWindow.document.open();
    slipWindow.document.write(buildInventoryCustodianSlip(records, await getLogoDataUrl()));
    slipWindow.document.close();
}

async function handleSave(event) {
    event.preventDefault();
    const data = getFormData();
    const existingIndex = items.findIndex((item) => item.assetId === dom.editingId.value);
    const duplicate = items.some((item, index) => item.propertyNo === data.propertyNo && index !== existingIndex);

    if (data.propertyNo && duplicate) {
        showToast("Property number already exists.");
        return;
    }

    const action = existingIndex >= 0 ? "update" : "create";

    if (existingIndex >= 0) {
        items[existingIndex] = data;
    } else {
        items.unshift(data);
    }

    selectedId = data.assetId;
    saveLocal();
    renderApp();
    resetForm();

    try {
        await syncToSheet(action, data);
        await loadItems();
        renderApp();
        showToast(action === "update" ? "Asset updated." : "Asset saved and QR generated.");
    } catch (error) {
        console.error(error);
        showToast("Saved locally. Supabase sync failed.");
        setDatabaseStatus("Local fallback is active.", "The backend could not receive the latest change.");
    }
}

async function handleTableClick(event) {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const item = items.find((entry) => entry.assetId === button.dataset.id);
    if (!item) return;

    if (button.dataset.action === "qr") {
        selectedId = item.assetId;
        renderQr();
        if (dom.qrAssetList) {
            renderQrAssetList();
        }
        showModule("qr");
        showToast("QR preview updated.");
        return;
    }

    if (button.dataset.action === "edit") {
        selectedId = item.assetId;
        fillForm(item);
        renderQr();
        showModule("inventory");
        return;
    }

    if (button.dataset.action === "delete") {
        const confirmed = window.confirm(`Delete ${item.propertyNo || item.assetId}?`);
        if (!confirmed) return;

        items = items.filter((entry) => entry.assetId !== item.assetId);
        selectedId = (items[0] && items[0].assetId) || null;
        saveLocal();
        renderApp();

        try {
            await syncToSheet("delete", item);
            await loadItems();
            renderApp();
            showToast("Asset deleted.");
        } catch (error) {
            console.error(error);
            showToast("Deleted locally. Supabase sync failed.");
        }
    }
}

function getPopupPosition(width, height) {
    const screenX = typeof window.screenX === "number" ? window.screenX : window.screenLeft;
    const screenY = typeof window.screenY === "number" ? window.screenY : window.screenTop;
    const outerWidth = typeof window.outerWidth === "number" ? window.outerWidth : document.documentElement.clientWidth;
    const outerHeight = typeof window.outerHeight === "number" ? window.outerHeight : document.documentElement.clientHeight;

    const left = Math.round(screenX + Math.max(0, (outerWidth - width) / 2));
    const top = Math.round(screenY + Math.max(0, (outerHeight - height) / 2));

    return { left, top };
}

function openClassificationModal() {
    if (!canOpenClassificationModal) return;

    const { left, top } = getPopupPosition(440, 250);
    const popup = window.open(
        "popup-editor.html",
        "classificationPopup",
        `width=440,height=250,left=${left},top=${top}`
    );
    if (!popup) {
        showToast("Please allow popups for this site.");
        return;
    }
}

function openStatusModal() {
    if (!canOpenStatusModal) return;

    const { left, top } = getPopupPosition(440, 250);
    const popup = window.open(
        "popup-editor.html",
        "statusPopup",
        `width=440,height=250,left=${left},top=${top}`
    );
    if (!popup) {
        showToast("Please allow popups for this site.");
        return;
    }
}

async function saveStatusOption(name) {
    const trimmedName = String(name || "").trim();

    if (!trimmedName) {
        showToast("Please enter a status name.");
        return;
    }

    const normalizedName = trimmedName.replace(/\s+/g, " ").trim();
    const existing = statusOptions.some((value) => value.toLowerCase() === normalizedName.toLowerCase());

    if (existing) {
        showToast("This status already exists.");
        return;
    }

    try {
        const response = await syncStatusToSheet(normalizedName);
        await loadStatusOptions();
        dom.status.value = normalizedName;

        if (response && response.ok) {
            setDatabaseStatus("Synced to Supabase.", `Status "${normalizedName}" was saved to the backend.`);
            showToast("Status added.");
        } else {
            setDatabaseStatus("Supabase save failed.", "Unable to save the new status to the backend.");
            showToast("Failed to save status to Supabase.");
        }
    } catch (error) {
        console.error(error);
        setDatabaseStatus("Supabase save failed.", "Unable to save the new status to the backend.");
        showToast("Failed to save status to Supabase.");
    }
}

async function saveClassification(name) {
    const trimmedName = String(name || "").trim();

    if (!trimmedName) {
        showToast("Please enter a classification name.");
        return;
    }

    const normalizedName = trimmedName.replace(/\s+/g, " ").trim();
    const existing = classificationOptions.some((value) => value.toLowerCase() === normalizedName.toLowerCase());

    if (existing) {
        showToast("This classification already exists.");
        return;
    }

    classificationOptions = sortClassificationValues([normalizedName, ...classificationOptions.filter((value) => value.toLowerCase() !== normalizedName.toLowerCase())]);
    savePersistedClassifications(classificationOptions);
    populateClassificationOptions(classificationOptions);
    dom.itemClassification.value = normalizedName;

    try {
        const response = await syncClassificationToSheet(normalizedName);
        await loadClassificationOptions();
        dom.itemClassification.value = normalizedName;

        if (response && response.ok) {
            setDatabaseStatus("Synced to Supabase.", `Classification "${normalizedName}" was saved to the backend.`);
            showToast("Classification added.");
        } else {
            setDatabaseStatus("Local classification saved.", "The new classification was stored locally, but the backend did not confirm the save.");
            showToast("Classification saved locally.");
        }
    } catch (error) {
        console.error(error);
        setDatabaseStatus("Local classification saved.", "The new classification was stored locally; backend sync may be unavailable.");
        showToast("Classification saved locally.");
    }
}

async function syncClassificationToSheet(name) {
    if (!supabaseUrl || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") {
        throw new Error("Supabase config is incomplete.");
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/classifications`, {
        method: "POST",
        headers: {
            ...supabaseHeaders,
            "Content-Type": "application/json",
            Prefer: "return=representation"
        },
        body: JSON.stringify({ classification_name: name })
    });

    if (!response.ok) {
        throw new Error("Unable to save classification to Supabase.");
    }

    return response;
}

async function syncStatusToSheet(name) {
    if (!supabaseUrl || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") {
        throw new Error("Supabase config is incomplete.");
    }

    const payloadCandidates = [
        { status_name: name },
        { status: name },
        { name: name },
        { label: name }
    ];

    let lastError;

    for (const payload of payloadCandidates) {
        try {
            const response = await fetch(`${supabaseUrl}/rest/v1/statuses`, {
                method: "POST",
                headers: {
                    ...supabaseHeaders,
                    "Content-Type": "application/json",
                    Prefer: "return=representation"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                return response;
            }

            lastError = new Error(`Supabase status insert failed with status ${response.status}`);
            const text = await response.text();
            console.warn("Status insert failed payload", payload, response.status, text);
        } catch (error) {
            lastError = error;
            console.warn("Status insert attempt failed", payload, error);
        }
    }

    throw lastError || new Error("Unable to save status to Supabase.");
}

function showModule(moduleName) {
    document.querySelectorAll(".module-view").forEach((module) => {
        module.classList.toggle("active", module.dataset.module === moduleName);
    });

    document.querySelectorAll(".nav-item").forEach((button) => {
        button.classList.toggle("active", button.dataset.view === moduleName);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function applyTheme(theme) {
    const selectedTheme = theme === "light" ? "light" : "dark";
    document.body.dataset.theme = selectedTheme;
    localStorage.setItem(themeKey, selectedTheme);

    document.querySelectorAll(".nav-icon").forEach((icon) => {
        const lightSrc = icon.dataset.themeIconLight;
        const darkSrc = icon.dataset.themeIcon;
        icon.src = selectedTheme === "light" ? (lightSrc || darkSrc) : (darkSrc || lightSrc);
    });

    dom.themeButtons.forEach((button) => {
        const isActive = button.dataset.themeChoice === selectedTheme;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

function loadTheme() {
    applyTheme(localStorage.getItem(themeKey) || "dark");
}

function wireEvents() {
    dom.form.addEventListener("submit", handleSave);
    dom.table.addEventListener("click", handleTableClick);
    dom.pagination.addEventListener("click", (event) => {
        const button = event.target.closest("[data-page]");
        if (!button) return;

        if (button.dataset.page === "prev") {
            inventoryPage = Math.max(1, inventoryPage - 1);
        } else if (button.dataset.page === "next") {
            inventoryPage += 1;
        }

        renderTable();
    });
    dom.searchInput.addEventListener("input", () => {
        inventoryPage = 1;
        renderTable();
    });
    dom.statusFilter.addEventListener("change", () => {
        inventoryPage = 1;
        renderTable();
    });
    dom.resetFormBtn.addEventListener("click", resetForm);
    dom.accountable.addEventListener("change", applySelectedTeacherDetails);
    dom.unitValue.addEventListener("input", updateTotal);
    dom.onHand.addEventListener("input", updateTotal);
    dom.addClassificationBtn.addEventListener("click", () => {
        if (!canOpenClassificationModal) return;
        openClassificationModal();
    });
    dom.addStatusBtn.addEventListener("click", () => {
        if (!canOpenStatusModal) return;
        openStatusModal();
    });
    if (dom.deleteClassificationBtn) {
        dom.deleteClassificationBtn.addEventListener("click", () => {
            const selectedValue = dom.itemClassification.value.trim();
            if (!selectedValue) {
                showToast("Select a classification to delete.");
                return;
            }
            removeClassificationOption(selectedValue);
        });
    }
    if (dom.deleteStatusBtn) {
        dom.deleteStatusBtn.addEventListener("click", () => {
            const selectedValue = dom.status.value.trim();
            if (!selectedValue) {
                showToast("Select a status to delete.");
                return;
            }
            removeStatusOption(selectedValue);
        });
    }
    if (dom.newItemBtnInline) {
        dom.newItemBtnInline.addEventListener("click", () => {
            resetForm();
            showModule("inventory");
        });
    }
    if (dom.downloadQrBtn) {
        dom.downloadQrBtn.addEventListener("click", downloadQr);
    }
    if (dom.openQrLinkBtn) {
        dom.openQrLinkBtn.addEventListener("click", openSelectedAssetLink);
    }
    if (dom.copyQrBtn) {
        dom.copyQrBtn.addEventListener("click", copyQrData);
    }
    if (dom.generatePdfBtn) {
        dom.generatePdfBtn.addEventListener("click", generateReportPdf);
    }
    [dom.reportInventoryType, dom.reportFundCluster, dom.reportAsOf].forEach((control) => {
        if (control) control.addEventListener("input", renderPhysicalCountReport);
    });
    [dom.certifiedCorrectedBy, dom.approvedBy, dom.verifiedBy].forEach((control) => {
        if (control) control.addEventListener("change", renderPhysicalCountReport);
    });
    if (dom.assetDatabaseSearch) {
        dom.assetDatabaseSearch.addEventListener("input", renderAllAssetsView);
    }
    if (dom.qrAssetList) {
        dom.qrAssetList.addEventListener("click", (event) => {
            const button = event.target.closest("[data-qr-id], [data-qr-page]");
            if (!button) return;

            if (button.dataset.qrPage) {
                if (button.dataset.qrPage === "prev" && qrPage > 1) {
                    qrPage -= 1;
                } else if (button.dataset.qrPage === "next") {
                    qrPage += 1;
                }
                renderQrAssetList();
                return;
            }

            selectedId = button.dataset.qrId;
            renderQr();
            renderQrAssetList();
        });
    }
    const dashboardQrBtn = document.querySelector("[data-dashboard-action='qr']");
    if (dashboardQrBtn) {
        dashboardQrBtn.addEventListener("click", () => {
            showModule("qr");
        });
    }

    dom.themeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            applyTheme(button.dataset.themeChoice);
            showToast(`${button.textContent.trim()} mode applied.`);
        });
    });

    document.querySelectorAll(".nav-item").forEach((button) => {
        button.addEventListener("click", () => {
            showModule(button.dataset.view);
        });
    });
}

async function init() {
    loadTheme();
    wireEvents();
    await loadItems();
    await loadTeacherOptions();
    await loadSignatoryOptions();
    await loadInventoryTypeOptions();
    await loadEducationLevelOptions();
    await loadClassificationOptions();
    await loadStatusOptions();
    const params = new URLSearchParams(window.location.search);
    const requestedAssetId = params.get("assetId");
    if (requestedAssetId && items.some((item) => item.assetId === requestedAssetId)) {
        selectedId = requestedAssetId;
    }
    canOpenClassificationModal = true;
    canOpenStatusModal = true;
    resetForm();
    renderApp();

    if (params.get("module") === "qr") {
        showModule("qr");
    }

    if (!supabaseUrl || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") {
        setDatabaseStatus("Supabase config pending.", "Set your Supabase anon key in supabase-config.js to enable remote persistence.");
    }
}

init();

const inventoryCustodianSlipStorageKey = "propertyInventoryCustodianSlips";
let inventoryCustodianSlips = [];

function hasInventoryCustodianSlipRemoteDatabase() {
    return Boolean(supabaseUrl && supabaseAnonKey && supabaseAnonKey !== "YOUR_SUPABASE_ANON_KEY");
}

function loadInventoryCustodianSlips() {
    try {
        const stored = JSON.parse(localStorage.getItem(inventoryCustodianSlipStorageKey) || "[]");
        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
}

function saveInventoryCustodianSlips() {
    try {
        localStorage.setItem(inventoryCustodianSlipStorageKey, JSON.stringify(inventoryCustodianSlips));
    } catch (error) {
        console.error("Unable to save Inventory Custodian Slips locally.", error);
    }
}

function getInventoryCustodianSlipHeaderPayload(slip) {
    return {
        ics_no: slip.icsNo,
        entity_name: slip.entityName,
        fund_cluster: slip.fundCluster || null,
        received_from_name: slip.receivedFrom || null,
        received_from_position: slip.receivedFromPosition || null,
        received_from_date: slip.receivedFromDate || null,
        received_by_name: slip.receivedBy || null,
        received_by_position: slip.receivedByPosition || null,
        received_by_date: slip.receivedByDate || null
    };
}

function getInventoryCustodianSlipItemPayload(slip, slipId, lineNo) {
    return {
        ics_slip_id: slipId,
        line_no: lineNo,
        asset_id: null,
        inventory_item_no: slip.inventoryItemNo || null,
        description_snapshot: slip.description,
        quantity: Number(slip.quantity),
        unit: slip.unit || null,
        unit_cost: Number(slip.unitCost),
        total_cost: Number(slip.totalCost),
        estimated_useful_life: slip.estimatedUsefulLife || null
    };
}

function mapInventoryCustodianSlipRows(rows) {
    return (rows || []).flatMap((header) => {
        const lineItems = Array.isArray(header.ics_slip_items) ? header.ics_slip_items : [];
        return lineItems
            .sort((first, second) => Number(first.line_no) - Number(second.line_no))
            .map((item) => ({
                id: `ICS-${header.id}-${item.id}`,
                dbSlipId: header.id,
                dbItemId: item.id,
                lineNo: item.line_no,
                entityName: header.entity_name || "",
                fundCluster: header.fund_cluster || "",
                icsNo: header.ics_no || "",
                inventoryItemNo: item.inventory_item_no || "",
                description: item.description_snapshot || "",
                quantity: item.quantity ?? "",
                unit: item.unit || "",
                unitCost: item.unit_cost ?? "",
                totalCost: item.total_cost ?? "",
                estimatedUsefulLife: item.estimated_useful_life || "",
                receivedFrom: header.received_from_name || "",
                receivedBy: header.received_by_name || "",
                receivedFromPosition: header.received_from_position || "",
                receivedByPosition: header.received_by_position || "",
                receivedFromDate: header.received_from_date || "",
                receivedByDate: header.received_by_date || ""
            }));
    });
}

async function loadInventoryCustodianSlipsFromDatabase() {
    if (!hasInventoryCustodianSlipRemoteDatabase()) return false;

    const select = [
        "id", "ics_no", "entity_name", "fund_cluster",
        "received_from_name", "received_from_position", "received_from_date",
        "received_by_name", "received_by_position", "received_by_date",
        "ics_slip_items(id,line_no,inventory_item_no,description_snapshot,quantity,unit,unit_cost,total_cost,estimated_useful_life)"
    ].join(",");
    const response = await fetch(`${supabaseUrl}/rest/v1/ics_slips?select=${encodeURIComponent(select)}&order=created_at.desc`, {
        headers: supabaseHeaders
    });

    if (!response.ok) {
        throw new Error(`Unable to load Inventory Custodian Slips: HTTP ${response.status}`);
    }

    inventoryCustodianSlips = mapInventoryCustodianSlipRows(await response.json());
    saveInventoryCustodianSlips();
    return true;
}

async function requestInventoryCustodianSlipDatabase(path, options = {}) {
    const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
        ...options,
        headers: {
            ...supabaseHeaders,
            "Content-Type": "application/json",
            Prefer: "return=representation",
            ...(options.headers || {})
        }
    });

    if (!response.ok) {
        throw new Error(`ICS database request failed: HTTP ${response.status}`);
    }

    return response;
}

async function saveInventoryCustodianSlipToDatabase(action, slip) {
    const sameSlipRows = inventoryCustodianSlips.filter((entry) => entry.dbSlipId && entry.icsNo === slip.icsNo);
    let slipId = slip.dbSlipId || sameSlipRows[0]?.dbSlipId;
    const headerPayload = getInventoryCustodianSlipHeaderPayload(slip);

    if (slipId) {
        await requestInventoryCustodianSlipDatabase(`ics_slips?id=eq.${encodeURIComponent(slipId)}`, {
            method: "PATCH",
            body: JSON.stringify(headerPayload)
        });
    } else {
        const response = await requestInventoryCustodianSlipDatabase("ics_slips", {
            method: "POST",
            body: JSON.stringify(headerPayload)
        });
        const rows = await response.json();
        slipId = rows[0]?.id;
        if (!slipId) throw new Error("ICS header was created without an identifier.");
    }

    if (action === "update" && slip.dbItemId) {
        await requestInventoryCustodianSlipDatabase(`ics_slip_items?id=eq.${encodeURIComponent(slip.dbItemId)}`, {
            method: "PATCH",
            body: JSON.stringify(getInventoryCustodianSlipItemPayload(slip, slipId, slip.lineNo || 1))
        });
    } else {
        const lineNo = Math.max(0, ...sameSlipRows.map((entry) => Number(entry.lineNo) || 0)) + 1;
        await requestInventoryCustodianSlipDatabase("ics_slip_items", {
            method: "POST",
            body: JSON.stringify(getInventoryCustodianSlipItemPayload(slip, slipId, lineNo))
        });
    }
}

async function deleteInventoryCustodianSlipFromDatabase(slip) {
    const itemCount = inventoryCustodianSlips.filter((entry) => entry.dbSlipId === slip.dbSlipId).length;
    if (slip.dbSlipId && itemCount <= 1) {
        await requestInventoryCustodianSlipDatabase(`ics_slips?id=eq.${encodeURIComponent(slip.dbSlipId)}`, { method: "DELETE" });
        return;
    }

    if (slip.dbItemId) {
        await requestInventoryCustodianSlipDatabase(`ics_slip_items?id=eq.${encodeURIComponent(slip.dbItemId)}`, { method: "DELETE" });
    }
}

function updateInventoryCustodianSlipTotal() {
    const quantity = Number(document.querySelector("#icsQuantity").value);
    const unitCost = Number(document.querySelector("#icsUnitCost").value);
    const totalCost = document.querySelector("#icsTotalCost");
    totalCost.value = Number.isFinite(quantity) && Number.isFinite(unitCost)
        ? (quantity * unitCost).toFixed(2)
        : "";
}

function resetInventoryCustodianSlipForm() {
    const form = document.querySelector("#icsSlipForm");
    if (!form) return;

    form.reset();
    document.querySelector("#icsEditingId").value = "";
    document.querySelector("#icsTotalCost").value = "";
    document.querySelector("#icsFormTitle").textContent = "Inventory Custodian Slip";
}

function getInventoryCustodianSlipFormData() {
    const value = (selector) => document.querySelector(selector).value.trim();

    return {
        id: document.querySelector("#icsEditingId").value || `ICS-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        entityName: value("#icsEntityName"),
        fundCluster: value("#icsFundCluster"),
        icsNo: value("#icsNo"),
        inventoryItemNo: value("#icsInventoryItemNo"),
        description: value("#icsDescription"),
        quantity: value("#icsQuantity"),
        unit: value("#icsUnit"),
        unitCost: value("#icsUnitCost"),
        totalCost: value("#icsTotalCost"),
        estimatedUsefulLife: value("#icsEstimatedUsefulLife"),
        receivedFrom: value("#icsReceivedFrom"),
        receivedBy: value("#icsReceivedBy"),
        receivedFromPosition: value("#icsReceivedFromPosition"),
        receivedByPosition: value("#icsReceivedByPosition"),
        receivedFromDate: value("#icsReceivedFromDate"),
        receivedByDate: value("#icsReceivedByDate")
    };
}

function renderInventoryCustodianSlipTable() {
    const table = document.querySelector("#icsSlipTable");
    if (!table) return;

    table.innerHTML = inventoryCustodianSlips.length
        ? inventoryCustodianSlips.map((slip) => `
            <tr>
                <td>${escapeHtml(slip.icsNo)}</td>
                <td>${escapeHtml(slip.entityName)}</td>
                <td>${escapeHtml(slip.description)}</td>
                <td>${escapeHtml(slip.receivedBy || "-")}</td>
                <td>${escapeHtml(formatPeso(Number(slip.totalCost) || 0))}</td>
                <td>
                    <div class="row-actions">
                        <button type="button" data-ics-action="open" data-ics-id="${escapeHtml(slip.id)}">Open</button>
                        <button type="button" data-ics-action="edit" data-ics-id="${escapeHtml(slip.id)}">Edit</button>
                        <button type="button" data-ics-action="delete" data-ics-id="${escapeHtml(slip.id)}">Delete</button>
                    </div>
                </td>
            </tr>
        `).join("")
        : '<tr><td colspan="6">No Inventory Custodian Slip records yet.</td></tr>';
}

function editInventoryCustodianSlip(id) {
    const slip = inventoryCustodianSlips.find((entry) => entry.id === id);
    if (!slip) return;

    const fieldMap = {
        icsEditingId: "id",
        icsEntityName: "entityName",
        icsFundCluster: "fundCluster",
        icsNo: "icsNo",
        icsInventoryItemNo: "inventoryItemNo",
        icsDescription: "description",
        icsQuantity: "quantity",
        icsUnit: "unit",
        icsUnitCost: "unitCost",
        icsTotalCost: "totalCost",
        icsEstimatedUsefulLife: "estimatedUsefulLife",
        icsReceivedFrom: "receivedFrom",
        icsReceivedBy: "receivedBy",
        icsReceivedFromPosition: "receivedFromPosition",
        icsReceivedByPosition: "receivedByPosition",
        icsReceivedFromDate: "receivedFromDate",
        icsReceivedByDate: "receivedByDate"
    };

    Object.entries(fieldMap).forEach(([elementId, property]) => {
        document.querySelector(`#${elementId}`).value = slip[property] || "";
    });
    document.querySelector("#icsFormTitle").textContent = "Edit Inventory Custodian Slip";
    showModule("document");
}

async function initInventoryCustodianSlipCrud() {
    const form = document.querySelector("#icsSlipForm");
    const table = document.querySelector("#icsSlipTable");
    if (!form || !table) return;

    inventoryCustodianSlips = loadInventoryCustodianSlips();
    renderInventoryCustodianSlipTable();

    try {
        if (await loadInventoryCustodianSlipsFromDatabase()) {
            renderInventoryCustodianSlipTable();
        }
    } catch (error) {
        console.error(error);
        showToast("ICS database unavailable. Using local saved slips.");
    }

    ["#icsQuantity", "#icsUnitCost"].forEach((selector) => {
        document.querySelector(selector).addEventListener("input", updateInventoryCustodianSlipTotal);
    });

    document.querySelector("#icsClearBtn").addEventListener("click", resetInventoryCustodianSlipForm);
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const slip = getInventoryCustodianSlipFormData();
        const existingIndex = inventoryCustodianSlips.findIndex((entry) => entry.id === slip.id);
        const action = existingIndex >= 0 ? "update" : "create";

        try {
            if (hasInventoryCustodianSlipRemoteDatabase()) {
                const existing = existingIndex >= 0 ? inventoryCustodianSlips[existingIndex] : null;
                await saveInventoryCustodianSlipToDatabase(action, { ...existing, ...slip });
                await loadInventoryCustodianSlipsFromDatabase();
            } else if (existingIndex >= 0) {
                inventoryCustodianSlips[existingIndex] = slip;
            } else {
                inventoryCustodianSlips.unshift(slip);
            }

            saveInventoryCustodianSlips();
            renderInventoryCustodianSlipTable();
            resetInventoryCustodianSlipForm();
            showToast(action === "update" ? "Inventory Custodian Slip updated." : "Inventory Custodian Slip saved.");
        } catch (error) {
            console.error(error);
            showToast("Unable to save the Inventory Custodian Slip to Supabase.");
        }
    });

    table.addEventListener("click", async (event) => {
        const button = event.target.closest("button[data-ics-action]");
        if (!button) return;

        const slip = inventoryCustodianSlips.find((entry) => entry.id === button.dataset.icsId);
        if (!slip) return;

        if (button.dataset.icsAction === "open") {
            openInventoryCustodianSlipPdf(slip);
            return;
        }

        if (button.dataset.icsAction === "edit") {
            editInventoryCustodianSlip(slip.id);
            return;
        }

        if (button.dataset.icsAction === "delete") {
            if (!window.confirm(`Delete ICS item from ${slip.icsNo}?`)) return;

            try {
                if (hasInventoryCustodianSlipRemoteDatabase()) {
                    await deleteInventoryCustodianSlipFromDatabase(slip);
                    await loadInventoryCustodianSlipsFromDatabase();
                } else {
                    inventoryCustodianSlips = inventoryCustodianSlips.filter((entry) => entry.id !== slip.id);
                }

                saveInventoryCustodianSlips();
                renderInventoryCustodianSlipTable();
                resetInventoryCustodianSlipForm();
                showToast("Inventory Custodian Slip deleted.");
            } catch (error) {
                console.error(error);
                showToast("Unable to delete the Inventory Custodian Slip from Supabase.");
            }
        }
    });
}

initInventoryCustodianSlipCrud();
async function openInventoryCustodianSlipPdf(slip) {
    const slipItems = inventoryCustodianSlips
        .filter((entry) => slip.dbSlipId ? entry.dbSlipId === slip.dbSlipId : entry.icsNo === slip.icsNo)
        .sort((first, second) => Number(first.lineNo || 0) - Number(second.lineNo || 0));
    if (!slipItems.length) {
        showToast("No ICS items are available for this document.");
        return;
    }

    const headerSlip = slipItems[0];

    const preview = window.open("", "_blank");
    if (!preview) {
        showToast("Please allow popups to generate the ICS PDF.");
        return;
    }

    preview.document.open();
    preview.document.write(buildInventoryCustodianSlip(slipItems, await getLogoDataUrl(), {
        entityName: headerSlip.entityName,
        fundCluster: headerSlip.fundCluster,
        icsNo: headerSlip.icsNo,
        receivedFrom: headerSlip.receivedFrom,
        receivedBy: headerSlip.receivedBy,
        receivedFromPosition: headerSlip.receivedFromPosition,
        receivedByPosition: headerSlip.receivedByPosition,
        receivedFromDate: headerSlip.receivedFromDate,
        receivedByDate: headerSlip.receivedByDate
    }));
    preview.document.close();
    showToast("Inventory Custodian Slip PDF opened.");
}
