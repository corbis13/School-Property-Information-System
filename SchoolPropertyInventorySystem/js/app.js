const supabaseUrl = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url) || "https://ouqgkytallctnptshefo.supabase.co";
const supabaseAnonKey = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.anonKey) || "sb_publishable_UDhp6lrRgVppuqH6Uu4Izg_zp7T-_WS";
const supabaseHeaders = {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`
};

// Replace all direct Supabase interactions with server-side API calls
// Example: Fetch data from server-side endpoint
async function fetchDataFromServer() {
    try {
        const response = await fetch('http://localhost:3000/api/supabase/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data from server:', error);
        return [];
    }
}

// Update other functions to use server-side API instead of direct Supabase calls

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
    icsGenerated: document.querySelector("#icsGenerated"),
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
    accountablePersonFilter: document.querySelector("#accountablePersonFilter"),
    accountablePersonCardBody: document.querySelector("#accountablePersonCardBody"),
    accountablePersonTotal: document.querySelector("#accountablePersonTotal"),
    physicalReport: document.querySelector("#physicalReport"),
    allAssetsTable: document.querySelector("#allAssetsTable"),
    assetCount: document.querySelector("#assetCount"),
    assetDatabaseSearch: document.querySelector("#assetDatabaseSearch"),
    reportInventoryType: document.querySelector("#reportInventoryType, #reportType"),
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
    qrPrevBtn: document.querySelector(".qr-prev-button"),
    qrNextBtn: document.querySelector(".qr-next-button"),
    qrHistoryTable: document.querySelector("#qrHistoryTable"),
    qrHistorySearchInput: document.querySelector("#qrHistorySearchInput"),
    qrHistoryPagination: document.querySelector("#qrHistoryPagination"),
    qrHistoryEmptyState: document.querySelector("#qrHistoryEmptyState"),
    icsSlipPagination: document.querySelector("#icsSlipPagination"),
    icsSlipSearchInput: document.querySelector("#icsSlipSearchInput"),
    themeButtons: document.querySelectorAll("[data-theme-choice]"),
    toast: document.querySelector("#toast"),
    databaseStatus: document.querySelector("#databaseStatus"),
    databaseMessage: document.querySelector("#databaseMessage"),
    schoolLevelChart: document.querySelector("#schoolLevelChart"),
    acquisitionYearChart: document.querySelector("#acquisitionYearChart"),
    acquisitionYearFilter: document.querySelector("#acquisitionYearFilter"),
    acquisitionYearContainer: document.querySelector("#acquisitionYearContainer"),
    acquisitionYearTotal: document.querySelector("#acquisitionYearTotal"),
    acquisitionYearViewAll: document.querySelector("#acquisitionYearViewAll"),
    issuanceYearFilter: document.querySelector("#issuanceYearFilter"),
    issuanceYearContainer: document.querySelector("#issuanceYearContainer"),
    issuanceYearTotal: document.querySelector("#issuanceYearTotal"),
    issuanceYearViewAll: document.querySelector("#issuanceYearViewAll"),
    maintenanceRequestsFilter: document.querySelector("#maintenanceRequestsFilter"),
    maintenanceRequestsContainer: document.querySelector("#maintenanceRequestsContainer"),
    maintenanceRequestsTotal: document.querySelector("#maintenanceRequestsTotal"),
    maintenanceRequestsViewAll: document.querySelector("#maintenanceRequestsViewAll"),
    propertyCategoryFilter: document.querySelector("#propertyCategoryFilter"),
    propertyCategorySvg: document.querySelector("#propertyCategorySvg"),
    propertyCategoryTotal: document.querySelector("#propertyCategoryTotal"),
    propertyCategoryLegend: document.querySelector("#propertyCategoryLegend"),
    propertyCategoryViewAll: document.querySelector("#propertyCategoryViewAll"),
    dateIssueYearChart: document.querySelector("#dateIssueYearChart"),
    acquisitionYearMini: document.querySelector("#acquisitionYearMini"),
    dateIssueYearMini: document.querySelector("#dateIssueYearMini"),
    addClassificationBtn: document.querySelector("#addClassificationBtn"),
    addStatusBtn: document.querySelector("#addStatusBtn"),
    deleteClassificationBtn: document.querySelector("#deleteClassificationBtn"),
    deleteStatusBtn: document.querySelector("#deleteStatusBtn")
};

const themeStorageKey = "spis-theme";
const storageKey = "propertyInventoryItems";
const classificationStorageKey = "propertyInventoryClassifications";

let items = [];
let selectedId = null;
let classificationOptions = [];
let statusOptions = [];
let teacherOptions = [];
let signatoryOptions = [];
let signatoryEntries = [];
let signatoryLoadFailed = false;
let canOpenClassificationModal = false;
let canOpenStatusModal = false;
let inventoryPage = 1;
const inventoryCustodianSlipStorageKey = "propertyInventoryCustodianSlips";
const qrDownloadHistoryStorageKey = "propertyInventoryQrDownloadHistory";
const qrDownloadedFileNamesStorageKey = "propertyInventoryQrDownloadedFileNames";
let inventoryCustodianSlips = [];
let qrDownloadHistory = [];
let icsSlipPage = 1;
const icsSlipPageSize = 10;
let qrHistoryPage = 1;
const qrHistoryPageSize = 10;
const inventoryRowsPerPage = 12;
let isRefreshingStatusOptions = false;
let isStatusSelectionLocked = false;
let isRefreshingClassificationOptions = false;
let isClassificationSelectionLocked = false;
let usingRemoteBackend = false;

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
            return parsed.map((item) => ({
                ...item,
                total: item.total != null && item.total !== "" ? formatTotalDisplay(item.total) : ""
            }));
        }
    } catch {
        // ignore parse errors
    }
    return seedItems.map((item) => ({
        ...item,
        total: item.total != null && item.total !== "" ? formatTotalDisplay(item.total) : ""
    }));
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
    populateIcsReceivedByDropdown();
}

async function loadSignatoryOptions() {
    signatoryOptions = [];
    signatoryEntries = [];
    signatoryLoadFailed = false;

    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/signatories?select=signatory,position`, {
            headers: supabaseHeaders
        });

        if (!response.ok) throw new Error("Unable to load signatory options from Supabase.");

        const rows = await response.json();
        signatoryEntries = (rows || [])
            .map((row) => ({
                name: String(row.signatory || "").trim(),
                position: String(row.position || "").trim()
            }))
            .filter((entry) => entry.name);

        signatoryOptions = [...new Set(signatoryEntries.map((entry) => entry.name))]
            .sort((first, second) => first.localeCompare(second, undefined, { sensitivity: "base" }));
    } catch (error) {
        console.error(error);
        signatoryLoadFailed = true;
    }

    if (signatoryOptions.length === 0) {
        const defaultList = [
            { name: "Dr. Juan Dela Cruz", position: "School Principal IV" },
            { name: "Maria Santos", position: "School Property Custodian" },
            { name: "Engr. Roberto Reyes", position: "Division Property Inspector" },
            { name: "Ana Patricia Cruz", position: "Inventory Committee Chair" },
            { name: "Mark Anthony Mendoza", position: "Supply Officer II" }
        ];
        if (Array.isArray(teacherOptions) && teacherOptions.length) {
            teacherOptions.forEach((teacher) => {
                if (teacher.name && !defaultList.some(e => e.name.toLowerCase() === teacher.name.toLowerCase())) {
                    defaultList.push({ name: teacher.name, position: teacher.position || "Teacher" });
                }
            });
        }
        signatoryEntries = defaultList;
        signatoryOptions = [...new Set(defaultList.map(e => e.name))].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    }

    [dom.certifiedCorrectedBy, dom.approvedBy, dom.verifiedBy].forEach((select) => {
        if (!select) return;
        const currentValue = select.value;
        select.innerHTML = `<option value="">Select signatory</option>${signatoryOptions
            .map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;
        if (signatoryOptions.includes(currentValue)) select.value = currentValue;
    });

    populateIcsReceivedFromDropdown();
    populateIcsReceivedByDropdown();
    if (typeof updateReportLiveMeta === "function") {
        updateReportLiveMeta();
    }
}

function populateIcsReceivedFromDropdown() {
    const select = document.querySelector("#icsReceivedFrom");
    if (!select) return;

    const currentValue = select.value;
    const unavailableOption = signatoryLoadFailed
        ? `<option value="" disabled>Signatories table unavailable</option>`
        : "";
    select.innerHTML = `${unavailableOption}<option value="">Select signatory</option>${signatoryOptions
        .map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;

    if (currentValue && !signatoryOptions.includes(currentValue)) {
        const customOpt = document.createElement("option");
        customOpt.value = currentValue;
        customOpt.textContent = currentValue;
        select.appendChild(customOpt);
    }
    if (currentValue) select.value = currentValue;
}

function populateIcsReceivedByDropdown() {
    const select = document.querySelector("#icsReceivedBy");
    if (!select) return;

    const currentValue = select.value;
    const allNames = [...new Set([
        ...teacherOptions.map((t) => t.name),
        ...signatoryEntries.map((s) => s.name)
    ].filter(Boolean))].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

    select.innerHTML = `<option value="">Select recipient</option>${allNames
        .map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;

    if (currentValue && !allNames.includes(currentValue)) {
        const customOpt = document.createElement("option");
        customOpt.value = currentValue;
        customOpt.textContent = currentValue;
        select.appendChild(customOpt);
    }
    if (currentValue) select.value = currentValue;
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

    if (typeof loadReportInventoryTypeDropdown === "function") {
        try { loadReportInventoryTypeDropdown(); } catch (e) {}
    }
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

async function loadSchoolNameOptions() {
    const entitySelect = document.querySelector("#icsEntityName");
    if (!entitySelect) return [];

    const currentValue = entitySelect.value.trim();
    let schoolNames = [];

    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/school_details?select=school_name&order=school_name.asc`, {
            headers: supabaseHeaders
        });

        if (!response.ok) {
            throw new Error(`Unable to load school names: HTTP ${response.status}`);
        }

        const rows = await response.json();
        schoolNames = [...new Set((rows || [])
            .map((row) => String(row.school_name || "").trim())
            .filter(Boolean))];
    } catch (error) {
        console.warn("Unable to load school names from Supabase, using local school list:", error);
    }

    if (schoolNames.length === 0 && Array.isArray(allSchoolsList) && allSchoolsList.length > 0) {
        schoolNames = [...new Set(allSchoolsList.map((s) => String(s.school_name || "").trim()).filter(Boolean))];
    }

    entitySelect.innerHTML = '<option value="">Select school</option>';
    schoolNames.forEach((schoolName) => {
        const option = document.createElement("option");
        option.value = schoolName;
        option.textContent = schoolName;
        entitySelect.appendChild(option);
    });

    if (currentValue && !schoolNames.includes(currentValue)) {
        const legacyOption = document.createElement("option");
        legacyOption.value = currentValue;
        legacyOption.textContent = currentValue;
        entitySelect.appendChild(legacyOption);
    }

    entitySelect.value = currentValue;
    return schoolNames;
}

const defaultSchoolRecord = {
    id: 1,
    school_name: "Geras Integrated School",
    school_id: "500243",
    school_logo_url: "images/geras_logo.png"
};

let allSchoolsList = [{ ...defaultSchoolRecord }];
let currentSchoolId = 1;
let activeSchoolRecord = { ...defaultSchoolRecord };
// Holds the current logo URL for the school being edited (used when no new file is uploaded)
let currentSchoolLogoUrl = "images/geras_logo.png";
// Utility: compress an image file to stay under a size limit (default 500 KB)
async function compressImage(file, maxSizeKB = 500) {
    if (!file.type.startsWith('image/')) return file;
    const img = document.createElement('img');
    const url = URL.createObjectURL(file);
    img.src = url;
    await new Promise((res) => (img.onload = res));
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Preserve aspect ratio, limit dimensions to 1024px max for either side
    const maxDim = 1024;
    let { width, height } = img;
    if (width > height && width > maxDim) {
        height = Math.round((height * maxDim) / width);
        width = maxDim;
    } else if (height > maxDim) {
        width = Math.round((width * maxDim) / height);
        height = maxDim;
    }
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    let quality = 0.9;
    let blob = await new Promise((res) => canvas.toBlob(res, file.type, quality));
    // Reduce quality iteratively until under limit or quality too low
    while (blob && blob.size / 1024 > maxSizeKB && quality > 0.2) {
        quality -= 0.1;
        blob = await new Promise((res) => canvas.toBlob(res, file.type, quality));
    }
    URL.revokeObjectURL(url);
    // If still too large, return original file (will be rejected later)
    return blob || file;
}

function updateSchoolDisplayBadges(name, id) {
    if (name) {
        document.querySelectorAll("#sidebarSchoolName, #mobileSchoolName, .school-name-display").forEach((el) => {
            el.textContent = name;
            el.title = name;
        });
    }
    if (id !== undefined && id !== null && id !== "") {
        document.querySelectorAll("#sidebarSchoolId, #mobileSchoolId, .school-id-display").forEach((el) => {
            el.textContent = String(id);
        });
    }
}

function updateActiveBadgeState(school) {
    const badge = document.getElementById("activeSchoolBadge");
    if (!badge) return;
    const isActive = Boolean(
        activeSchoolRecord && school &&
        (activeSchoolRecord.id && school.id ? String(activeSchoolRecord.id) === String(school.id) : activeSchoolRecord.school_name === school.school_name)
    );
    badge.textContent = isActive ? "Active in Sidebar" : "";
    badge.style.display = isActive ? "" : "none";

    // Update sidebar logo if the school is active (or when initializing)
    const logoImg = document.getElementById("sidebarSchoolLogo");
    const mobileLogoImg = document.getElementById("mobileSidebarSchoolLogo");
    if (logoImg) {
        const logoUrl = (school && school.school_logo_url) ? school.school_logo_url : logoImg.getAttribute("data-default-src") || "";
        logoImg.src = logoUrl;
    }
    if (mobileLogoImg) {
        const logoUrl = (school && school.school_logo_url) ? school.school_logo_url : mobileLogoImg.getAttribute("data-default-src") || "";
        mobileLogoImg.src = logoUrl;
    }
    if (isActive) {
        badge.style.display = "inline-flex";
        badge.style.background = "#ecfdf5";
        badge.style.color = "#047857";
        badge.style.border = "1px solid #a7f3d0";
        badge.innerHTML = '<span style="width: 6px; height: 6px; border-radius: 50%; background: #10b981; display: inline-block;"></span> Active in Sidebar';
    } else {
        badge.style.display = "inline-flex";
        badge.style.background = "#f1f5f9";
        badge.style.color = "#64748b";
        badge.style.border = "1px solid #cbd5e1";
        badge.innerHTML = '<span style="width: 6px; height: 6px; border-radius: 50%; background: #94a3b8; display: inline-block;"></span> Not Active in Sidebar';
    }
}

function populateSchoolDropdown() {
    const selector = document.getElementById("schoolSelectDropdown");
    if (!selector) return;

    selector.innerHTML = "";

    if (allSchoolsList.length === 0) {
        const defaultOpt = document.createElement("option");
        defaultOpt.value = "";
        defaultOpt.textContent = "-- No saved schools found --";
        selector.appendChild(defaultOpt);
        return;
    }

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "-- Choose a School --";
    selector.appendChild(placeholder);

    allSchoolsList.forEach((school) => {
        const opt = document.createElement("option");
        opt.value = String(school.id);
        const isActive = activeSchoolRecord && (
            (activeSchoolRecord.id && String(activeSchoolRecord.id) === String(school.id)) ||
            (activeSchoolRecord.school_name === school.school_name)
        );
        opt.textContent = `${school.school_name} (ID: ${school.school_id})${isActive ? " ★ [Active in Sidebar]" : ""}`;
        selector.appendChild(opt);
    });

    if (currentSchoolId) {
        selector.value = String(currentSchoolId);
    } else if (activeSchoolRecord && activeSchoolRecord.id) {
        selector.value = String(activeSchoolRecord.id);
    }
}

function handleSchoolDropdownChange(e) {
    const selectedId = e.target.value;
    const nameInput = document.getElementById("aboutSchoolName");
    const idInput = document.getElementById("aboutSchoolId");
    const statusElem = document.getElementById("schoolDetailsStatus");

    if (!selectedId) {
        handleAddNewSchool();
        return;
    }

        const school = allSchoolsList.find((s) => String(s.id) === String(selectedId));
        if (school) {
            currentSchoolId = school.id;
            if (nameInput) nameInput.value = school.school_name || "";
            if (idInput) idInput.value = school.school_id ?? "";
            updateActiveBadgeState(school);

            // Update logo previews for the selected school
            const logoImg = document.getElementById("sidebarSchoolLogo");
            const mobileLogoImg = document.getElementById("mobileSidebarSchoolLogo");
            const previewImg = document.getElementById("schoolLogoPreview");
            
            const logoToDisplay = school.school_logo_url || "images/geras_logo.png";

            if (previewImg) previewImg.src = logoToDisplay;

            // Populate the selected school's name, ID, and logo image in sidebar
            updateSchoolDisplayBadges(school.school_name, school.school_id);
            if (logoImg) logoImg.src = logoToDisplay;
            if (mobileLogoImg) mobileLogoImg.src = logoToDisplay;

            // Keep the URL for later save operations
            currentSchoolLogoUrl = school.school_logo_url || "";

            const isActive = activeSchoolRecord && (
                (activeSchoolRecord.id && String(activeSchoolRecord.id) === String(school.id)) ||
                (activeSchoolRecord.school_name === school.school_name)
            );

            if (statusElem) {
                statusElem.textContent = isActive
                    ? "✓ Currently displayed in sidebar"
                    : `Loaded ${school.school_name}. Click 'Select for Sidebar' to activate.`;
                statusElem.style.color = isActive ? "#16a34a" : "#475569";
            }
        }
}

function handleSchoolLogoFileChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        showToast("Please select a valid image file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (evt) {
        const dataUrl = evt.target.result;
        currentSchoolLogoUrl = dataUrl;

        const previewImg = document.getElementById("schoolLogoPreview");
        const logoImg = document.getElementById("sidebarSchoolLogo");
        const mobileLogoImg = document.getElementById("mobileSidebarSchoolLogo");

        if (previewImg) previewImg.src = dataUrl;
        if (logoImg) logoImg.src = dataUrl;
        if (mobileLogoImg) mobileLogoImg.src = dataUrl;

        showToast("Logo preview updated!");
    };
    reader.readAsDataURL(file);
}

function handleAddNewSchool() {
    const selector = document.getElementById("schoolSelectDropdown");
    const nameInput = document.getElementById("aboutSchoolName");
    const idInput = document.getElementById("aboutSchoolId");
    const logoInput = document.getElementById("schoolLogoInput");
    const previewImg = document.getElementById("schoolLogoPreview");
    const statusElem = document.getElementById("schoolDetailsStatus");
    const badge = document.getElementById("activeSchoolBadge");

    currentSchoolId = null;
    currentSchoolLogoUrl = "";

    if (selector) selector.value = "";
    if (nameInput) {
        nameInput.value = "";
        nameInput.focus();
    }
    if (idInput) idInput.value = "";
    if (logoInput) logoInput.value = "";
    if (previewImg) previewImg.src = "images/geras_logo.png";

    if (badge) {
        badge.style.display = "inline-flex";
        badge.style.background = "#f1f5f9";
        badge.style.color = "#64748b";
        badge.style.border = "1px solid #cbd5e1";
        badge.innerHTML = '<span style="width: 6px; height: 6px; border-radius: 50%; background: #94a3b8; display: inline-block;"></span> New School Entry';
    }

    if (statusElem) {
        statusElem.textContent = "Enter new school name & ID, select a logo (optional), then click Save Profile.";
        statusElem.style.color = "#004c87";
    }
}

function handleSelectActiveSchool() {
    const nameInput = document.getElementById("aboutSchoolName");
    const idInput = document.getElementById("aboutSchoolId");
    const statusElem = document.getElementById("schoolDetailsStatus");
    const sidebarSchoolCard = document.getElementById("sidebarSchoolInfoCard");

    const schoolName = (nameInput?.value || "").trim();
    const rawSchoolId = (idInput?.value || "").trim();

    if (!schoolName) {
        if (statusElem) {
            statusElem.textContent = "⚠ Please enter or select a School Name";
            statusElem.style.color = "#dc2626";
        }
        nameInput?.focus();
        return;
    }

    if (!rawSchoolId) {
        if (statusElem) {
            statusElem.textContent = "⚠ Please enter or select a School ID";
            statusElem.style.color = "#dc2626";
        }
        idInput?.focus();
        return;
    }

    const parsedId = Number.parseInt(rawSchoolId, 10);
    const schoolId = Number.isNaN(parsedId) ? rawSchoolId : parsedId;

    const matchedSchool = allSchoolsList.find((s) =>
        (currentSchoolId && s.id === currentSchoolId) ||
        (s.school_name.toLowerCase() === schoolName.toLowerCase())
    );

    activeSchoolRecord = {
        id: matchedSchool ? matchedSchool.id : (currentSchoolId || 1),
        school_name: schoolName,
        school_id: schoolId,
        school_logo_url: matchedSchool ? matchedSchool.school_logo_url : ""
    };

    try {
        localStorage.setItem("spis_active_school", JSON.stringify(activeSchoolRecord));
    } catch (e) {
        console.warn("Error caching active school:", e);
    }

    // Update sidebar and mobile header info immediately
    updateSchoolDisplayBadges(activeSchoolRecord.school_name, activeSchoolRecord.school_id);
    if (sidebarSchoolCard) {
        sidebarSchoolCard.style.display = "";
    }

    // Update dropdown item labels and active badge
    populateSchoolDropdown();
    updateActiveBadgeState(activeSchoolRecord);

    if (statusElem) {
        statusElem.textContent = "✓ Displaying in sidebar menu";
        statusElem.style.color = "#16a34a";
    }

    showToast(`${schoolName} is now displayed in the sidebar!`);
}

async function loadSchoolDetails(forceRefresh = false) {
    const schoolNameInput = document.getElementById("aboutSchoolName");
    const schoolIdInput = document.getElementById("aboutSchoolId");
    const statusElem = document.getElementById("schoolDetailsStatus");
    const sidebarSchoolCard = document.getElementById("sidebarSchoolInfoCard");

    // 1. Check local cache for all schools and active school first
    try {
        const cachedSchools = JSON.parse(localStorage.getItem("spis_all_schools") || "null");
        if (Array.isArray(cachedSchools) && cachedSchools.length > 0) {
            allSchoolsList = cachedSchools;
        }
    } catch (e) {
        console.warn("Could not read cached schools list:", e);
    }

    try {
        const cachedActive = JSON.parse(localStorage.getItem("spis_active_school") || "null");
        if (cachedActive) {
            activeSchoolRecord = cachedActive;
        }
    } catch (e) {
        console.warn("Could not read cached active school:", e);
    }

    // Ensure we have at least the default school in allSchoolsList
    if (!allSchoolsList || allSchoolsList.length === 0) {
        allSchoolsList = [{ ...defaultSchoolRecord }];
    }
    if (!activeSchoolRecord) {
        activeSchoolRecord = allSchoolsList[0];
        try {
            localStorage.setItem("spis_active_school", JSON.stringify(activeSchoolRecord));
        } catch (e) {}
    }

    // Update sidebar badges and logos immediately from active school
    updateSchoolDisplayBadges(activeSchoolRecord.school_name, activeSchoolRecord.school_id);
    if (sidebarSchoolCard) sidebarSchoolCard.style.display = "";

    const logoImg = document.getElementById("sidebarSchoolLogo");
    const mobileLogoImg = document.getElementById("mobileSidebarSchoolLogo");
    if (logoImg) {
        logoImg.src = activeSchoolRecord.school_logo_url || logoImg.getAttribute("data-default-src") || "images/geras_logo.png";
    }
    if (mobileLogoImg) {
        mobileLogoImg.src = activeSchoolRecord.school_logo_url || mobileLogoImg.getAttribute("data-default-src") || "images/geras_logo.png";
    }

    // Determine target school to display in the form
    let targetSchool = null;
    if (currentSchoolId) {
        targetSchool = allSchoolsList.find((s) => String(s.id) === String(currentSchoolId));
    }
    if (!targetSchool) {
        targetSchool = allSchoolsList.find((s) => activeSchoolRecord && (String(s.id) === String(activeSchoolRecord.id) || s.school_name === activeSchoolRecord.school_name)) || allSchoolsList[0];
    }
    if (targetSchool) {
        currentSchoolId = targetSchool.id;
        if (schoolNameInput && (!schoolNameInput.value || forceRefresh)) schoolNameInput.value = targetSchool.school_name || "";
        if (schoolIdInput && (!schoolIdInput.value || forceRefresh)) schoolIdInput.value = targetSchool.school_id ?? "";
        currentSchoolLogoUrl = targetSchool.school_logo_url || "";
        updateActiveBadgeState(targetSchool);
    }

    // Populate dropdown immediately so it is NEVER empty
    populateSchoolDropdown();

    if (!supabaseUrl || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") {
        if (statusElem) {
            statusElem.textContent = "Ready (Offline mode)";
            statusElem.style.color = "#64748b";
        }
        return activeSchoolRecord;
    }

    // 2. Pull all schools from Supabase
    try {
        if (statusElem) {
            statusElem.textContent = "Loading schools...";
            statusElem.style.color = "#00335e";
        }

        const response = await fetch(`${supabaseUrl}/rest/v1/school_details?select=*&order=school_name.asc`, {
            headers: supabaseHeaders
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const rows = await response.json();
        if (Array.isArray(rows) && rows.length > 0) {
            allSchoolsList = rows;
            try {
                localStorage.setItem("spis_all_schools", JSON.stringify(allSchoolsList));
            } catch (e) {}

            // Keep activeSchoolRecord synced if the record changed in database
            const foundActive = allSchoolsList.find((s) =>
                (activeSchoolRecord.id && String(s.id) === String(activeSchoolRecord.id)) ||
                (s.school_name === activeSchoolRecord.school_name)
            );
            if (foundActive) {
                activeSchoolRecord = foundActive;
            } else {
                activeSchoolRecord = allSchoolsList[0];
            }
            try {
                localStorage.setItem("spis_active_school", JSON.stringify(activeSchoolRecord));
            } catch (e) {}
            updateSchoolDisplayBadges(activeSchoolRecord.school_name, activeSchoolRecord.school_id);

            // Update target school
            let updatedTarget = null;
            if (currentSchoolId) {
                updatedTarget = allSchoolsList.find((s) => String(s.id) === String(currentSchoolId));
            }
            if (!updatedTarget) {
                updatedTarget = allSchoolsList.find((s) => activeSchoolRecord && (String(s.id) === String(activeSchoolRecord.id) || s.school_name === activeSchoolRecord.school_name)) || allSchoolsList[0];
            }
            if (updatedTarget) {
                currentSchoolId = updatedTarget.id;
                if (schoolNameInput) schoolNameInput.value = updatedTarget.school_name || "";
                if (schoolIdInput) schoolIdInput.value = updatedTarget.school_id ?? "";
                currentSchoolLogoUrl = updatedTarget.school_logo_url || "";
                updateActiveBadgeState(updatedTarget);
            }
        }

        populateSchoolDropdown();

        if (statusElem) {
            statusElem.textContent = "✓ Ready";
            statusElem.style.color = "#16a34a";
        }

        if (logoImg) {
            const logoUrl = (activeSchoolRecord && activeSchoolRecord.school_logo_url)
                ? activeSchoolRecord.school_logo_url
                : logoImg.getAttribute("data-default-src");
            if (logoUrl) logoImg.src = logoUrl;
        }
        if (mobileLogoImg) {
            const logoUrl = (activeSchoolRecord && activeSchoolRecord.school_logo_url)
                ? activeSchoolRecord.school_logo_url
                : mobileLogoImg.getAttribute("data-default-src");
            if (logoUrl) mobileLogoImg.src = logoUrl;
        }
    } catch (err) {
        console.warn("Failed to load school details from Supabase (using cached):", err);
        populateSchoolDropdown();
        if (statusElem) {
            statusElem.textContent = "Loaded from local cache";
            statusElem.style.color = "#64748b";
        }
    }

    return activeSchoolRecord;
}

async function saveSchoolDetails(e) {
    if (e && e.preventDefault) e.preventDefault();

    const schoolNameInput = document.getElementById("aboutSchoolName");
    const schoolIdInput = document.getElementById("aboutSchoolId");
    const saveBtn = document.getElementById("saveSchoolDetailsBtn");
    const statusElem = document.getElementById("schoolDetailsStatus");

    const schoolName = (schoolNameInput?.value || "").trim();
    const rawSchoolId = (schoolIdInput?.value || "").trim();

    if (!schoolName) {
        if (statusElem) {
            statusElem.textContent = "⚠ Please enter a School Name";
            statusElem.style.color = "#dc2626";
        }
        schoolNameInput?.focus();
        return;
    }

    if (!rawSchoolId) {
        if (statusElem) {
            statusElem.textContent = "⚠ Please enter a School ID";
            statusElem.style.color = "#dc2626";
        }
        schoolIdInput?.focus();
        return;
    }

    const parsedId = Number.parseInt(rawSchoolId, 10);
    const schoolId = Number.isNaN(parsedId) ? rawSchoolId : parsedId;

    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerHTML = "<span>⏳ Saving...</span>";
    }
    if (statusElem) {
        statusElem.textContent = "Saving school details...";
        statusElem.style.color = "#00335e";
    }

    // Prepare payload; include logo URL if available
    const payload = {
        school_name: schoolName,
        school_id: schoolId,
        school_logo_url: null // will be set after possible upload
    };

    // Handle logo file upload if a new file was selected
    const logoFileInput = document.getElementById("schoolLogoInput");
    if (logoFileInput && logoFileInput.files && logoFileInput.files.length > 0) {
        let file = logoFileInput.files[0];
        const ext = file.name.split('.').pop();
        // Compress the image to stay under 500 KB before upload
        file = await compressImage(file, 500);
        if (file.size > 500 * 1024) {
            if (statusElem) {
                statusElem.textContent = "⚠ Logo exceeds 500 KB after compression";
                statusElem.style.color = "#dc2626";
            }
            // Abort the save operation; re‑enable button & exit
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.innerHTML = "<span>💾 Save</span>";
            }
            return;
        }
        // Rename uploaded file to the school's ID (as stored in `schoolId`).
        // If the ID is numeric, keep it as is; otherwise fallback to a timestamp.
        const baseName = schoolId ? String(schoolId) : `${Date.now()}`;
        const fileName = `${baseName}.${ext}`;
        let dataUrl = "";
        try {
            // Convert the (compressed) image file to a Base64-encoded data URL
            dataUrl = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = (e) => reject(e);
                reader.readAsDataURL(file);
            });

            // Send to server to store the image file locally if custom server is running
            const uploadEndpoint = (window.location.pathname && window.location.pathname.startsWith('/SchoolPropertyInventorySystem'))
                ? '/SchoolPropertyInventorySystem/upload-logo'
                : '/upload-logo';
            const uploadResp = await fetch(uploadEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fileName, dataUrl })
            });
            if (!uploadResp.ok) {
                throw new Error(`Logo upload endpoint returned ${uploadResp.status}`);
            }
            const respJson = await uploadResp.json();
            console.log('🚀 Logo upload response:', respJson);
            const { url } = respJson;
            payload.school_logo_url = url; // relative path to saved image
            currentSchoolLogoUrl = url;
        } catch (err) {
            console.warn("Server logo upload unavailable or failed, using Base64 embedded image:", err);
            // Fallback: Store the Base64 data URL directly so image persists cleanly!
            if (dataUrl) {
                payload.school_logo_url = dataUrl;
                currentSchoolLogoUrl = dataUrl;
            } else if (currentSchoolLogoUrl) {
                payload.school_logo_url = currentSchoolLogoUrl;
            }
        }
    } else {
        // No new file – preserve existing logo URL if we have it
        if (currentSchoolLogoUrl) {
            payload.school_logo_url = currentSchoolLogoUrl;
        }
    }

    if (!supabaseUrl || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") {
        const localRecord = {
            id: currentSchoolId || Date.now(),
            school_name: schoolName,
            school_id: schoolId,
            school_logo_url: payload.school_logo_url || currentSchoolLogoUrl || ""
        };
        currentSchoolId = localRecord.id;
        currentSchoolLogoUrl = localRecord.school_logo_url;
        activeSchoolRecord = localRecord;

        const existingIdx = allSchoolsList.findIndex((s) => String(s.id) === String(localRecord.id) || s.school_name === localRecord.school_name);
        if (existingIdx >= 0) {
            allSchoolsList[existingIdx] = localRecord;
        } else {
            allSchoolsList.push(localRecord);
        }

        try {
            localStorage.setItem("spis_active_school", JSON.stringify(activeSchoolRecord));
            localStorage.setItem("spis_all_schools", JSON.stringify(allSchoolsList));
        } catch (e) {}

        updateSchoolDisplayBadges(localRecord.school_name, localRecord.school_id);
        const logoImg = document.getElementById("sidebarSchoolLogo");
        const mobileLogoImg = document.getElementById("mobileSidebarSchoolLogo");
        if (logoImg && localRecord.school_logo_url) logoImg.src = localRecord.school_logo_url;
        if (mobileLogoImg && localRecord.school_logo_url) mobileLogoImg.src = localRecord.school_logo_url;

        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = "<span>💾 Save</span>";
        }
        if (statusElem) {
            statusElem.textContent = "✓ Saved locally";
            statusElem.style.color = "#16a34a";
        }
        showToast("School details saved locally!");
        return;
    }

    try {
        let response;

        if (currentSchoolId) {
            response = await fetch(`${supabaseUrl}/rest/v1/school_details?id=eq.${currentSchoolId}`, {
                method: "PATCH",
                headers: {
                    ...supabaseHeaders,
                    "Content-Type": "application/json",
                    "Prefer": "return=representation"
                },
                body: JSON.stringify(payload)
            });
        } else {
            response = await fetch(`${supabaseUrl}/rest/v1/school_details`, {
                method: "POST",
                headers: {
                    ...supabaseHeaders,
                    "Content-Type": "application/json",
                    "Prefer": "return=representation"
                },
                body: JSON.stringify(payload)
            });
        }

        if (!response.ok) {
            const errBody = await response.text();
            throw new Error(`HTTP ${response.status}: ${errBody}`);
        }

        const savedRows = await response.json();
        const savedRecord = Array.isArray(savedRows) && savedRows.length > 0 ? savedRows[0] : null;

        if (savedRecord) {
            currentSchoolId = savedRecord.id;
            // Keep the logo URL in the global variable for future edits
            currentSchoolLogoUrl = savedRecord.school_logo_url || "";

            const existingIdx = allSchoolsList.findIndex((s) => String(s.id) === String(savedRecord.id));
            if (existingIdx >= 0) {
                allSchoolsList[existingIdx] = savedRecord;
            } else {
                allSchoolsList.push(savedRecord);
            }

            try {
                localStorage.setItem("spis_all_schools", JSON.stringify(allSchoolsList));
            } catch (e) {}

            // If the updated school was the active school, update active record and sidebar
            if (activeSchoolRecord && String(activeSchoolRecord.id) === String(savedRecord.id)) {
                activeSchoolRecord = savedRecord;
                try {
                    localStorage.setItem("spis_active_school", JSON.stringify(activeSchoolRecord));
                } catch (e) {}
                updateSchoolDisplayBadges(savedRecord.school_name, savedRecord.school_id);
                // Ensure logo reflects any change
                const logoImg = document.getElementById("sidebarSchoolLogo");
                const mobileLogoImg = document.getElementById("mobileSidebarSchoolLogo");
                if (logoImg) {
                    const logoUrl = savedRecord.school_logo_url || logoImg.getAttribute("data-default-src");
                    logoImg.src = logoUrl;
                }
                if (mobileLogoImg) {
                    const logoUrl = savedRecord.school_logo_url || mobileLogoImg.getAttribute("data-default-src");
                    mobileLogoImg.src = logoUrl;
                }
            }
        }

        populateSchoolDropdown();
        if (currentSchoolId) {
            const selector = document.getElementById("schoolSelectDropdown");
            if (selector) selector.value = String(currentSchoolId);
        }
        updateActiveBadgeState(savedRecord || { school_name: schoolName, school_id: schoolId });

        if (statusElem) {
            statusElem.textContent = "✓ School details saved successfully";
            statusElem.style.color = "#16a34a";
        }
        showToast("School details saved!");
        await loadSchoolNameOptions();
    } catch (err) {
        console.error("Error saving school details:", err);
        if (statusElem) {
            statusElem.textContent = "⚠ Failed to save: " + err.message;
            statusElem.style.color = "#dc2626";
        }
    } finally {
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = "<span>💾 Save</span>";
        }
    }
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
            total: row.total != null && row.total !== "" ? formatTotalDisplay(row.total) : "",
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
        window.inventoryData = items;
        localStorage.setItem(storageKey, JSON.stringify(items));
        try {
            localStorage.setItem("accountablePersonReportEntries", JSON.stringify(getAccountablePersonEntries("all")));
            localStorage.setItem("acquisitionYearReportEntries", JSON.stringify(getYearDistribution("acquisitionDate", "all")));
            localStorage.setItem("issuanceYearReportEntries", JSON.stringify(getYearDistribution("dateIssue", "all")));
            localStorage.setItem("maintenanceRequestsReportEntries", JSON.stringify(getMaintenanceItems("all")));
            localStorage.setItem("propertyCategoryReportEntries", JSON.stringify(getPropertyCategoryEntries("all")));
        } catch (e) {
            console.warn("Could not cache report entries:", e);
        }
        setDatabaseStatus("Connected to Supabase.", `${items.length} records loaded from the backend.`);
        if (typeof loadReportInventoryTypeDropdown === "function") {
            try { loadReportInventoryTypeDropdown(); } catch(e) {}
        } else if (typeof renderPhysicalCountReport === "function") {
            try { renderPhysicalCountReport(items); } catch(e) {}
        }
    } catch (error) {
        console.error(error);
        items = fallbackItems();
        usingRemoteBackend = false;
        window.inventoryData = items;
        setDatabaseStatus("Local fallback is active.", "Supabase is unavailable right now. Your latest local data is still available.");
        if (typeof loadReportInventoryTypeDropdown === "function") {
            try { loadReportInventoryTypeDropdown(); } catch(e) {}
        } else if (typeof renderPhysicalCountReport === "function") {
            try { renderPhysicalCountReport(items); } catch(e) {}
        }
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
        total: item.total === "" || item.total === null || item.total === undefined ? null : (Number.isFinite(Number(String(item.total).replace(/[^0-9.-]/g, ""))) ? Number(String(item.total).replace(/[^0-9.-]/g, "")) : null),
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

function formatTotalDisplay(val) {
    if (val === "" || val === null || val === undefined) return "";
    const num = typeof val === "number" ? val : Number(String(val).replace(/[^0-9.-]/g, ""));
    if (!Number.isFinite(num)) return "";
    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function updateTotal() {
    const unitValue = Number(dom.unitValue.value);
    const onHand = Number(dom.onHand.value);

    dom.total.value = dom.unitValue.value !== "" && dom.onHand.value !== "" && Number.isFinite(unitValue) && Number.isFinite(onHand)
        ? formatTotalDisplay(unitValue * onHand)
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
    if (!dom.total.value && item.total !== undefined && item.total !== null && item.total !== "") {
        dom.total.value = formatTotalDisplay(item.total);
    }
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
    dom.total.value = "";
    dom.formTitle.textContent = "Add Property Item";
}

function getAssetDetailUrl(assetId) {
    const configuredUrl = (window.SUPABASE_CONFIG && String(window.SUPABASE_CONFIG.assetUrl || "").trim()) || "";
    const safeId = encodeURIComponent(String(assetId || "UNKNOWN").trim());
    const query = `?assetId=${safeId}`;

    if (configuredUrl) {
        return `${configuredUrl.replace(/\/+$|\?+$/g, "")}${query}`;
    }

    if (typeof window !== "undefined" && window.location && window.location.origin) {
        const origin = window.location.origin;
        const pathname = window.location.pathname;
        if (pathname.includes("SchoolPropertyInventorySystem")) {
            return `${origin}/SchoolPropertyInventorySystem/asset.html${query}`;
        }
    }

    return `https://corbis13.github.io/School-Property-Information-System/SchoolPropertyInventorySystem/asset.html${query}`;
}

function openAssetWindow(assetId, targetUrl) {
    const safeId = encodeURIComponent(String(assetId || "UNKNOWN").trim());
    const finalUrl = targetUrl || `asset.html?assetId=${safeId}`;
    window.open(finalUrl, "_blank");
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
    return normalized === "for repair" || normalized.includes("repair") || normalized.includes("maintenance") || normalized === "unserviceable";
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
    const classifications = new Set(items.map((item) => String(item.itemClassification || "").trim().toLocaleLowerCase()).filter(Boolean));

    dom.totalItems.textContent = items.length;
    renderIcsGeneratedCount();
    dom.repairItems.textContent = getRepairItemsCount();
    dom.qrItems.textContent = getQrDownloadCount();
}

function getRepairItemsCount() {
    return items.filter((item) => isRepairStatus(getComputedStatus(item))).length;
}

function getQrDownloadCount() {
    return qrDownloadHistory.reduce((total, entry) => total + Math.max(0, Number(entry.count) || 0), 0);
}

function renderIcsGeneratedCount() {
    if (!dom.icsGenerated) return;

    const slipKeys = new Set(inventoryCustodianSlips.map((slip) => {
        if (slip.dbSlipId != null) return `database:${slip.dbSlipId}`;
        if (String(slip.icsNo || "").trim()) return `local:${slip.icsNo}`;
        return `local:${slip.id}`;
    }));

    dom.icsGenerated.textContent = slipKeys.size;
}

function renderDashboard() {
    const statusCounts = getStatusCounts();
    const schoolLevelEntries = getSchoolLevelEntries();
    const acqFilterElem = document.getElementById("acquisitionYearFilter") || dom.acquisitionYearFilter;
    const acqActiveFilter = acqFilterElem ? acqFilterElem.value : "all";
    const acquisitionYearEntries = getYearDistribution("acquisitionDate", acqActiveFilter);
    const issFilterElem = document.getElementById("issuanceYearFilter") || dom.issuanceYearFilter;
    const issActiveFilter = issFilterElem ? issFilterElem.value : "all";
    const dateIssueYearEntries = getYearDistribution("dateIssue", issActiveFilter);
    try {
        const allAcqEntries = acqActiveFilter === "all" ? acquisitionYearEntries : getYearDistribution("acquisitionDate", "all");
        localStorage.setItem("acquisitionYearReportEntries", JSON.stringify(allAcqEntries));
        const allIssEntries = issActiveFilter === "all" ? dateIssueYearEntries : getYearDistribution("dateIssue", "all");
        localStorage.setItem("issuanceYearReportEntries", JSON.stringify(allIssEntries));
        localStorage.setItem("maintenanceRequestsReportEntries", JSON.stringify(getMaintenanceItems("all")));
        const catFilterElem = document.getElementById("propertyCategoryFilter") || dom.propertyCategoryFilter;
        const catActiveFilter = catFilterElem ? catFilterElem.value : "all";
        const allCatEntries = catActiveFilter === "all" ? getPropertyCategoryEntries(catActiveFilter) : getPropertyCategoryEntries("all");
        localStorage.setItem("propertyCategoryReportEntries", JSON.stringify(allCatEntries));
    } catch (e) {
        console.warn("Could not sync year report entries:", e);
    }
    // Update total count displays for acquisition and issuance years
    // Update header range labels for acquisition and issuance years
    // Update acquisition year header with per‑year counts (e.g., "2021: 12, 2022: 8")
    const acquisitionRangeElem = document.getElementById("acquisitionYearRange");
    if (acquisitionRangeElem && acquisitionYearEntries.length) {
        const acquisitionCountStr = acquisitionYearEntries
            .map(e => `${e.label}: ${e.value}`)
            .join(', ');
        acquisitionRangeElem.textContent = acquisitionCountStr;
    }
    // Update issuance year header with per‑year counts
    const issuanceRangeElem = document.getElementById("dateIssueYearRange");
    if (issuanceRangeElem && dateIssueYearEntries.length) {
        const issuanceCountStr = dateIssueYearEntries
            .map(e => `${e.label}: ${e.value}`)
            .join(', ');
        issuanceRangeElem.textContent = issuanceCountStr;
    }
    const filterElem = document.getElementById("accountablePersonFilter") || dom.accountablePersonFilter;
    const activeFilter = filterElem ? filterElem.value : "all";
    const accountableEntries = getAccountablePersonEntries(activeFilter);
    try {
        const allAccountableEntries = activeFilter === "all" ? accountableEntries : getAccountablePersonEntries("all");
        localStorage.setItem("accountablePersonReportEntries", JSON.stringify(allAccountableEntries));
    } catch (e) {
        console.warn("Could not sync accountable person report entries:", e);
    }

    if (dom.portfolioChart && dom.portfolioLegend) {
        renderPortfolioChart(schoolLevelEntries);
    }
    if (dom.qrCoverage) {
        dom.qrCoverage.textContent = items.length ? "100%" : "0%";
    }
    renderStatusPie(statusCounts);
    renderMiniDistributionChart(dom.schoolLevelChart, schoolLevelEntries);
    // Update the count cards and total for School Level in PROPERTY BREAKDOWN
    try {
        const elementaryElem = document.getElementById("schoolLevelElementaryCount");
        const juniorElem = document.getElementById("schoolLevelJuniorCount");
        const seniorElem = document.getElementById("schoolLevelSeniorCount");
        const adminElem = document.getElementById("schoolLevelAdminCount");
        const totalSpan = document.getElementById("schoolLevelTotal");
        const container = document.getElementById("schoolLevelContainer");

        const map = {};
        let totalCount = 0;
        schoolLevelEntries.forEach(entry => {
            map[entry.label] = entry.value;
            totalCount += (Number(entry.value) || 0);
        });

        if (elementaryElem) elementaryElem.textContent = map["Elementary"] || 0;
        if (juniorElem) juniorElem.textContent = map["Junior High"] || map["Junior HS"] || 0;
        if (seniorElem) seniorElem.textContent = map["Senior High"] || map["Senior HS"] || 0;
        if (adminElem) adminElem.textContent = map["Admin"] || 0;

        if (totalSpan) {
            totalSpan.textContent = `${totalCount} item${totalCount === 1 ? "" : "s"}`;
        }

        // Handle any additional non-standard school levels dynamically
        if (container) {
            const standardKeys = ["Elementary", "Junior High", "Junior HS", "Senior High", "Senior HS", "Admin"];
            container.querySelectorAll(".school-level-extra").forEach(el => el.remove());
            schoolLevelEntries.forEach(entry => {
                if (!standardKeys.includes(entry.label) && entry.value > 0) {
                    const extraDiv = document.createElement("div");
                    extraDiv.className = "school-level-extra bg-white border border-slate-200 rounded-lg p-2 text-center shadow-2xs";
                    extraDiv.innerHTML = `
                        <p class="text-[10px] font-semibold text-slate-600 truncate">${escapeHtml(entry.label)}</p>
                        <p class="text-xs font-black text-slate-800 mt-0.5">${entry.value}</p>
                    `;
                    container.appendChild(extraDiv);
                }
            });
        }
    } catch (e) {
        console.error("Failed to update school level count cards", e);
    }
    renderAcquisitionYearCard(acquisitionYearEntries);
    renderIssuanceYearCard(dateIssueYearEntries);
    const maintFilterElem = document.getElementById("maintenanceRequestsFilter") || dom.maintenanceRequestsFilter;
    const maintActiveFilter = maintFilterElem ? maintFilterElem.value : "all";
    renderMaintenanceRequestsCard(getMaintenanceItems(maintActiveFilter));
    const catFilterElem = document.getElementById("propertyCategoryFilter") || dom.propertyCategoryFilter;
    const catActiveFilter = catFilterElem ? catFilterElem.value : "all";
    renderPropertyCategoryCard(getPropertyCategoryEntries(catActiveFilter));
    renderMiniDistributionChart(dom.acquisitionYearChart, acquisitionYearEntries);
    renderMiniDistributionChart(dom.dateIssueYearChart, dateIssueYearEntries);
    renderAccountableBarChart(accountableEntries);
    renderAccountablePersonCard(accountableEntries);
    renderRecentAssets();
}

function renderAcquisitionYearCard(entries) {
    try {
        const container = document.getElementById("acquisitionYearContainer") || dom.acquisitionYearContainer;
        const totalSpan = document.getElementById("acquisitionYearTotal") || dom.acquisitionYearTotal;
        const rangeElem = document.getElementById("acquisitionYearRange");

        const totalCount = (entries || []).reduce((sum, e) => sum + (Number(e.value) || 0), 0);
        const years = (entries || [])
            .map(e => Number(e.label))
            .filter(y => !isNaN(y))
            .sort((a, b) => a - b);
        const minYear = years.length ? years[0] : "";
        const maxYear = years.length ? years[years.length - 1] : "";
        const rangeText = years.length > 1 ? `${minYear}–${maxYear}` : (years.length === 1 ? `${minYear}` : "");

        if (totalSpan) {
            totalSpan.textContent = `${totalCount} item${totalCount === 1 ? "" : "s"}`;
            totalSpan.title = `Total Assets: ${totalCount} (${rangeText || "No recorded acquisition year"})`;
        }
        if (rangeElem) {
            rangeElem.textContent = rangeText || `${totalCount} items`;
        }

        if (!container) return;

        if (!entries || !entries.length) {
            container.innerHTML = '<p class="text-xs text-slate-400 py-2 text-center">No acquisition dates recorded.</p>';
            return;
        }

        const maxValue = Math.max(...entries.map(e => Number(e.value) || 0), 1);
        const colors = ["#004c87", "#0284c7", "#38bdf8", "#449e38", "#d97706", "#94a3b8", "#6366f1", "#0d9488", "#ec4899", "#8b5cf6"];

        container.innerHTML = entries.map((entry, index) => {
            const pct = Math.max(8, Math.round(((Number(entry.value) || 0) / maxValue) * 100));
            const color = colors[index % colors.length];
            return `
                <div class="flex items-center gap-2">
                    <span class="text-[11px] text-slate-600 font-semibold w-12 shrink-0">${escapeHtml(entry.label)}</span>
                    <div class="flex-1 bg-slate-200/70 rounded-full h-3 overflow-hidden">
                        <div class="h-full rounded-full transition-all duration-300" style="width:${pct}%; background:${color};"></div>
                    </div>
                    <span class="text-[11px] font-black text-slate-700 w-8 text-right">${entry.value}</span>
                </div>
            `;
        }).join("");
    } catch (e) {
        console.error("Failed to update acquisition year card", e);
    }
}

function renderIssuanceYearCard(entries) {
    try {
        const container = document.getElementById("issuanceYearContainer") || dom.issuanceYearContainer;
        const totalSpan = document.getElementById("issuanceYearTotal") || dom.issuanceYearTotal;
        const rangeElem = document.getElementById("dateIssueYearRange");

        const totalCount = (entries || []).reduce((sum, e) => sum + (Number(e.value) || 0), 0);
        const years = (entries || [])
            .map(e => Number(e.label))
            .filter(y => !isNaN(y))
            .sort((a, b) => a - b);
        const minYear = years.length ? years[0] : "";
        const maxYear = years.length ? years[years.length - 1] : "";
        const rangeText = years.length > 1 ? `${minYear}–${maxYear}` : (years.length === 1 ? `${minYear}` : "");

        if (totalSpan) {
            totalSpan.textContent = `${totalCount} item${totalCount === 1 ? "" : "s"}`;
            totalSpan.title = `Total Assets: ${totalCount} (${rangeText || "No recorded issuance year"})`;
        }
        if (rangeElem) {
            rangeElem.textContent = rangeText || `${totalCount} items`;
        }

        if (!container) return;

        if (!entries || !entries.length) {
            container.innerHTML = '<p class="text-xs text-slate-400 py-2 text-center">No issuance dates recorded.</p>';
            return;
        }

        const maxValue = Math.max(...entries.map(e => Number(e.value) || 0), 1);
        const colors = ["#449e38", "#22c55e", "#10b981", "#0284c7", "#004c87", "#38bdf8", "#d97706", "#6366f1", "#ec4899", "#8b5cf6"];

        container.innerHTML = entries.map((entry, index) => {
            const pct = Math.max(8, Math.round(((Number(entry.value) || 0) / maxValue) * 100));
            const color = colors[index % colors.length];
            return `
                <div class="flex items-center gap-2">
                    <span class="text-[11px] text-slate-600 font-semibold w-12 shrink-0">${escapeHtml(entry.label)}</span>
                    <div class="flex-1 bg-slate-200/70 rounded-full h-3 overflow-hidden">
                        <div class="h-full rounded-full transition-all duration-300" style="width:${pct}%; background:${color};"></div>
                    </div>
                    <span class="text-[11px] font-black text-slate-700 w-8 text-right">${entry.value}</span>
                </div>
            `;
        }).join("");
    } catch (e) {
        console.error("Failed to update issuance year card", e);
    }
}

function isMaintenanceOrRepairItem(item) {
    if (!item) return false;
    const rawStatus = String(item.status || item.Status || "").trim();
    const normalized = normalizeStatusValue(rawStatus).toLowerCase();
    return normalized === "for repair" ||
           normalized === "under repair" ||
           normalized === "repair" ||
           normalized === "maintenance" ||
           normalized === "under maintenance" ||
           normalized === "unserviceable" ||
           normalized.includes("repair") ||
           normalized.includes("maintenance");
}

function getMaintenanceItems(filter = "all") {
    return items.filter(item => {
        if (!isMaintenanceOrRepairItem(item)) return false;

        if (filter === "buildings") {
            const type = String(item.inventoryType || item.inventory_type || "").toLowerCase();
            const cls = String(item.itemClassification || item.item_classification || "").toLowerCase();
            if (!type.includes("building") && !cls.includes("building")) return false;
        } else if (filter === "inventory") {
            const type = String(item.inventoryType || item.inventory_type || "").toLowerCase();
            const cls = String(item.itemClassification || item.item_classification || "").toLowerCase();
            if (type.includes("building") || cls.includes("building")) return false;
        }

        return true;
    });
}

function renderMaintenanceRequestsCard(requests) {
    try {
        const container = document.getElementById("maintenanceRequestsContainer") || dom.maintenanceRequestsContainer;
        const totalSpan = document.getElementById("maintenanceRequestsTotal") || dom.maintenanceRequestsTotal;
        const filterElem = document.getElementById("maintenanceRequestsFilter") || dom.maintenanceRequestsFilter;
        const activeFilter = filterElem ? filterElem.value : "all";
        const reqList = requests || getMaintenanceItems(activeFilter);

        if (totalSpan) {
            totalSpan.textContent = `${reqList.length} request${reqList.length === 1 ? "" : "s"}`;
        }

        if (!container) return;

        if (!reqList || !reqList.length) {
            container.innerHTML = '<p class="text-xs text-slate-400 py-6 text-center">No maintenance requests found.</p>';
            return;
        }

        const badgeClasses = {
            "Under Repair": "bg-[#e0f2fe] text-[#0284c7]",
            "For Repair": "bg-[#ffedd5] text-[#c2410c]",
            "Maintenance": "bg-[#fef3c7] text-[#b45309]",
            "Unserviceable": "bg-[#fee2e2] text-[#b91c1c]"
        };

        const iconBgClasses = {
            "Under Repair": "bg-[#0284c7]",
            "For Repair": "bg-[#f29913]",
            "Maintenance": "bg-[#449e38]",
            "Unserviceable": "bg-[#ef4444]"
        };

        container.innerHTML = reqList.slice(0, 6).map(item => {
            const rawStatus = String(item.status || item.Status || "").trim();
            const normStatus = normalizeStatusValue(rawStatus) || rawStatus || "Pending";
            const title = item.itemBrandModel || item.item_brand_model || item.itemClassification || item.item_classification || "Property Asset";
            const propNo = item.propertyNo || item.property_no || "";
            const location = item.location ? item.location : (item.remarks || "No location");
            const dateVal = item.updatedAt || item.updated_at || item.createdAt || item.created_at;
            let dateText = "";
            if (dateVal) {
                const d = new Date(dateVal);
                if (!Number.isNaN(d.getTime())) {
                    dateText = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                }
            }

            const badgeClass = badgeClasses[normStatus] || "bg-[#f1f5f9] text-[#475569]";
            const iconBgClass = iconBgClasses[normStatus] || "bg-[#64748b]";

            return `
                <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/80 hover:bg-slate-100 transition border border-slate-100">
                    <div class="flex items-center space-x-3 min-w-0">
                        <div class="w-8 h-8 rounded-full ${iconBgClass} text-white flex items-center justify-center shrink-0">
                            <i data-lucide="wrench" class="w-4 h-4"></i>
                        </div>
                        <div class="min-w-0 pr-2">
                            <p class="text-xs font-extrabold text-slate-800 truncate" title="${escapeHtml(title)}">${escapeHtml(title)}</p>
                            <p class="text-[11px] text-slate-500 font-medium truncate">${escapeHtml(propNo ? `${propNo} • ${location}` : location)}</p>
                        </div>
                    </div>
                    <div class="text-right shrink-0">
                        <span class="px-2 py-0.5 text-[9px] font-black rounded-full ${badgeClass} uppercase tracking-wider">
                            ${escapeHtml(normStatus)}
                        </span>
                        ${dateText ? `<p class="text-[10px] text-slate-400 font-semibold mt-0.5">${escapeHtml(dateText)}</p>` : ""}
                    </div>
                </div>
            `;
        }).join("");

        if (typeof lucide !== "undefined" && lucide.createIcons) {
            lucide.createIcons({ root: container });
        }
    } catch (err) {
        console.error("Failed to render maintenance requests card:", err);
    }
}

function getPropertyCategoryEntries(filter = "all") {
    const counts = items.reduce((bucket, item) => {
        if (filter === "buildings") {
            const type = String(item.inventoryType || item.inventory_type || "").toLowerCase();
            const cls = String(item.itemClassification || item.item_classification || "").toLowerCase();
            if (!type.includes("building") && !cls.includes("building")) return bucket;
        } else if (filter === "inventory") {
            const type = String(item.inventoryType || item.inventory_type || "").toLowerCase();
            const cls = String(item.itemClassification || item.item_classification || "").toLowerCase();
            if (type.includes("building") || cls.includes("building")) return bucket;
        }

        const category = String(item.itemClassification || item.item_classification || "").trim() || "Unclassified";
        bucket[category] = (bucket[category] || 0) + 1;
        return bucket;
    }, {});

    const categoryColors = ["#004c87", "#449e38", "#f29913", "#0284c7", "#94a3b8", "#6366f1", "#0d9488", "#ec4899", "#8b5cf6", "#64748b"];
    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([label, value], index) => ({
            label,
            value,
            color: categoryColors[index % categoryColors.length]
        }));
}

function renderPropertyCategoryCard(entries) {
    try {
        const svgElem = document.getElementById("propertyCategorySvg") || dom.propertyCategorySvg;
        const totalElem = document.getElementById("propertyCategoryTotal") || dom.propertyCategoryTotal;
        const legendElem = document.getElementById("propertyCategoryLegend") || dom.propertyCategoryLegend;
        const filterElem = document.getElementById("propertyCategoryFilter") || dom.propertyCategoryFilter;
        const activeFilter = filterElem ? filterElem.value : "all";
        const catList = entries || getPropertyCategoryEntries(activeFilter);

        const totalCount = catList.reduce((sum, e) => sum + Number(e.value || 0), 0);

        if (totalElem) {
            totalElem.textContent = String(totalCount);
        }

        if (!svgElem || !legendElem) return;

        if (!catList.length || totalCount === 0) {
            svgElem.innerHTML = '<circle cx="50" cy="50" r="38" fill="transparent" stroke="#f1f5f9" stroke-width="15" />';
            legendElem.innerHTML = '<p class="text-xs text-slate-400 py-4 text-center">No categories found.</p>';
            return;
        }

        let displayEntries = [];
        if (catList.length <= 5) {
            displayEntries = [...catList];
        } else {
            displayEntries = catList.slice(0, 4);
            const otherCount = catList.slice(4).reduce((sum, e) => sum + Number(e.value || 0), 0);
            if (otherCount > 0) {
                displayEntries.push({
                    label: "Others",
                    value: otherCount,
                    color: "#94a3b8"
                });
            }
        }

        const circumference = 2 * Math.PI * 38;
        let currentOffset = 0;

        let circlesHtml = '<circle cx="50" cy="50" r="38" fill="transparent" stroke="#f1f5f9" stroke-width="15" />';
        displayEntries.forEach(entry => {
            const segLength = (entry.value / totalCount) * circumference;
            circlesHtml += `<circle cx="50" cy="50" r="38" fill="transparent" stroke="${entry.color}" stroke-width="15" stroke-dasharray="${segLength.toFixed(2)} ${circumference.toFixed(2)}" stroke-dashoffset="${(-currentOffset).toFixed(2)}" />`;
            currentOffset += segLength;
        });
        svgElem.innerHTML = circlesHtml;

        legendElem.innerHTML = displayEntries.map(entry => {
            const pct = Math.round((entry.value / totalCount) * 100);
            return `
                <div class="flex items-center justify-between space-x-2">
                    <div class="flex items-center space-x-2 min-w-0">
                        <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: ${entry.color}"></span>
                        <span class="text-slate-600 font-medium truncate" title="${escapeHtml(entry.label)}">${escapeHtml(entry.label)}:</span>
                    </div>
                    <span class="font-extrabold text-slate-800 shrink-0">${entry.value} (${pct}%)</span>
                </div>
            `;
        }).join("");
    } catch (err) {
        console.error("Failed to render property category card:", err);
    }
}

function getSchoolLevelEntries() {
    const counts = items.reduce((bucket, item) => {
        const schoolLevel = String(item.schoolLevel || "").trim();
        if (!schoolLevel) return bucket;

        const normalized = schoolLevel.toLowerCase();
        let label = schoolLevel;
        if (normalized.includes("elementary")) label = "Elementary";
        else if (normalized.includes("senior")) label = "Senior High";
        else if (normalized.includes("junior") || normalized.includes("jhs") || normalized.includes("high school") || normalized.includes("junior high")) label = "Junior High";
        else if (normalized.includes("admin")) label = "Admin";

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

function getYearDistribution(field, filter = "all") {
    const counts = items.reduce((bucket, item) => {
        if (filter === "buildings") {
            const type = String(item.inventoryType || item.inventory_type || "").toLowerCase();
            const cls = String(item.itemClassification || item.item_classification || "").toLowerCase();
            if (!type.includes("building") && !cls.includes("building")) return bucket;
        } else if (filter === "inventory") {
            const type = String(item.inventoryType || item.inventory_type || "").toLowerCase();
            const cls = String(item.itemClassification || item.item_classification || "").toLowerCase();
            if (type.includes("building") || cls.includes("building")) return bucket;
        }

        const rawValue = String(item[field] || (field === "acquisitionDate" ? item.acquisition_date : item.date_issue) || "").trim();
        if (!rawValue) return bucket;

        let yearNum = null;
        const parsed = new Date(rawValue);
        if (!Number.isNaN(parsed.getTime())) {
            yearNum = parsed.getFullYear();
        } else {
            const match = rawValue.match(/\b(19\d{2}|20\d{2})\b/);
            if (match) {
                yearNum = parseInt(match[1], 10);
            }
        }
        if (!yearNum || isNaN(yearNum)) return bucket;

        const label = String(yearNum);
        bucket[label] = (bucket[label] || 0) + 1;
        return bucket;
    }, {});

    const colorPalette = ["#004c87", "#0284c7", "#38bdf8", "#449e38", "#d97706", "#94a3b8", "#6366f1", "#0d9488", "#ec4899", "#8b5cf6"];

    return Object.entries(counts)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([label, value], index) => ({
            label,
            value,
            color: colorPalette[index % colorPalette.length]
        }));
}

function getAccountablePersonEntries(filter = "all") {
    const counts = items.reduce((bucket, item) => {
        if (filter === "buildings") {
            const type = String(item.inventoryType || item.inventory_type || "").toLowerCase();
            const cls = String(item.itemClassification || item.item_classification || "").toLowerCase();
            if (!type.includes("building") && !cls.includes("building")) return bucket;
        } else if (filter === "inventory") {
            const type = String(item.inventoryType || item.inventory_type || "").toLowerCase();
            const cls = String(item.itemClassification || item.item_classification || "").toLowerCase();
            if (type.includes("building") || cls.includes("building")) return bucket;
        }

        const person = String(item.accountable || item.accountable_person || item.accountablePerson || item.person_accountable || "").trim();
        if (!person) return bucket;

        bucket[person] = (bucket[person] || 0) + 1;
        return bucket;
    }, {});

    const colors = ["#004c87", "#449e38", "#f29913", "#0284c7", "#94a3b8", "#6366f1", "#0d9488", "#ec4899", "#8b5cf6", "#64748b"];
    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([label, value], index) => ({
            label,
            value,
            color: colors[index % colors.length]
        }));
}

function renderAccountableBarChart(entries) {
    const chartElem = document.getElementById("accountablePersonChart") || dom.accountablePersonChart;
    if (!chartElem) return;

    if (!entries || !entries.length) {
        chartElem.innerHTML = '<div class="mini-chart-empty">No accountable persons yet.</div>';
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

        chartElem.innerHTML = `
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
                            <span title="${escapeHtml(entry.label)}">${escapeHtml(entry.label)}</span>
                        </div>
                    </div>
                `).join("")}
            </div>
            ${totalPages > 1 ? `<div class="accountable-pagination">${pageButtons.join("")}</div>` : ""}
        `;
    };

    chartElem.onclick = (event) => {
        const button = event.target.closest(".accountable-page-btn");
        if (!button) return;
        const page = Number(button.dataset.page || 1);
        renderPage(page);
    };

    renderPage(1);
}

function renderAccountablePersonCard(entries) {
    const cardBody = document.getElementById("accountablePersonCardBody") || dom.accountablePersonCardBody;
    const totalElem = document.getElementById("accountablePersonTotal") || dom.accountablePersonTotal;
    if (!cardBody) return;

    const visibleEntries = (entries || []).slice(0, 10);
    const maxValue = Math.max(...visibleEntries.map((entry) => entry.value), 1);
    const colors = ["#004c87", "#449e38", "#f29913", "#0284c7", "#94a3b8", "#6366f1", "#0d9488", "#ec4899", "#8b5cf6", "#64748b"];

    cardBody.innerHTML = visibleEntries.length
        ? visibleEntries.map((entry, index) => `
            <div class="flex items-center gap-3">
                <span class="text-[11px] font-semibold text-slate-600 w-32 shrink-0 truncate" title="${escapeHtml(entry.label)}">${escapeHtml(entry.label)}</span>
                <div class="flex-1 bg-slate-100 rounded-full h-4.5 relative overflow-hidden">
                    <div class="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-300" style="width: ${Math.max(8, Math.round((entry.value / maxValue) * 100))}%; background: ${colors[index % colors.length]};">
                        <span class="text-[10px] font-black text-white">${entry.value}</span>
                    </div>
                </div>
            </div>
        `).join("")
        : '<p class="text-xs text-slate-400 py-6 text-center">No accountable persons found in the asset database.</p>';

    if (totalElem) {
        const totalAssigned = (entries || []).reduce((sum, entry) => sum + (Number(entry.value) || 0), 0);
        totalElem.textContent = `${totalAssigned} item${totalAssigned === 1 ? "" : "s"}`;
    }
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
    if (!dom.recentAssets) return;

    const newestItem = [...items].sort((first, second) =>
        getTimestamp(second.updatedAt || second.createdAt) - getTimestamp(first.updatedAt || first.createdAt)
    )[0];
    const newestSlip = [...inventoryCustodianSlips].sort((first, second) =>
        getTimestamp(second.savedAt || second.receivedByDate || second.receivedFromDate || second.id) -
        getTimestamp(first.savedAt || first.receivedByDate || first.receivedFromDate || first.id)
    )[0];
    const recentModules = [
        {
            icon: "box",
            color: "#004c87",
            action: newestItem ? "Inventory updated" : "Inventory",
            detail: newestItem ? (newestItem.itemBrandModel || newestItem.propertyNo || newestItem.assetId) : "No inventory records yet",
            time: newestItem ? (newestItem.updatedAt || newestItem.createdAt) : "-"
        },
        {
            icon: "qr-code",
            color: "#449e38",
            action: newestItem ? "QR Code ready" : "QR Code",
            detail: newestItem ? (newestItem.propertyNo || newestItem.assetId) : "No QR code records yet",
            time: newestItem ? (newestItem.updatedAt || newestItem.createdAt) : "-"
        },
        {
            icon: "file-text",
            color: "#f29913",
            action: newestSlip ? "Document saved" : "Document",
            detail: newestSlip ? (newestSlip.icsNo || newestSlip.description || "Inventory Custodian Slip") : "No documents yet",
            time: newestSlip ? (newestSlip.savedAt || newestSlip.receivedByDate || newestSlip.receivedFromDate || newestSlip.id) : "-"
        }
    ];

    dom.recentAssets.innerHTML = recentModules.map((entry) => `
        <div class="relative recent-activity-item" style="padding-left:30px;">
            <span class="absolute left-0 top-0.5 w-5 h-5 rounded-full text-white flex items-center justify-center ring-4 ring-white shadow-sm" style="background-color:${entry.color};">
                <i data-lucide="${entry.icon}" class="w-2.5 h-2.5"></i>
            </span>
            <div>
                <p class="text-xs font-extrabold text-slate-800">${escapeHtml(entry.action)}</p>
                <p class="text-[11px] text-slate-600 font-semibold">${escapeHtml(entry.detail)}</p>
                <p class="text-[10px] text-slate-400 font-medium">${escapeHtml(entry.time === "-" ? "-" : formatShortDate(entry.time))}</p>
            </div>
        </div>
    `).join("");

    if (window.lucide) window.lucide.createIcons();
}



function renderReports() {
    renderReportOptions();
    if (!dom.reportAsOf.value) {
        dom.reportAsOf.value = new Date().toISOString().slice(0, 10);
    }
    renderPhysicalCountReport();
    renderAllAssetsView();
    if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
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

    if (dom.assetCount) dom.assetCount.textContent = `${filteredItems.length} ${filteredItems.length === 1 ? "asset" : "assets"}`;
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
    const inventoryType = dom.reportInventoryType.value || "ALL INVENTORY ITEMS";
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
                        <th rowspan="2">Date<br>Acquired<br><small>(YYYY-MM-DD)</small></th>
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
                            <td>${reportCell(item.itemClassification || item.item_classification || item.article || "-")}</td>
                            <td>${reportCell(item.itemBrandModel)}</td>
                            <td>${reportCell(item.semiExpandableNo || item.propertyNo)}</td>
                            <td>${reportCell(item.unitMeasurement)}</td>
                            <td>${reportCell(item.unitValue ? Number(item.unitValue).toLocaleString("en-US", {minimumFractionDigits:2,maximumFractionDigits:2}) : "")}</td>
                            <td>${reportCell(item.total != null && item.total !== "" ? formatTotalDisplay(item.total) : "")}</td>
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

    if (typeof updateReportLiveMeta === "function") {
        updateReportLiveMeta();
    }

    const report = dom.physicalReport;
    const previous = { overflow: report.style.overflow, maxHeight: report.style.maxHeight, width: report.style.width };
    report.classList.add("pdf-export");
    report.style.overflow = "visible";
    report.style.maxHeight = "none";
    report.style.width = `${report.scrollWidth}px`;

    try {
        const canvas = await window.html2canvas(report, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
        const { jsPDF } = window.jspdf;
        const pageWidth = 13;
        const pageHeight = 8.5;
        const pageMargin = 0.2;
        const bottomMargin = 0.8;
        const contentWidth = pageWidth - (pageMargin * 2);
        const contentHeight = pageHeight - pageMargin - bottomMargin;
        const pdf = new jsPDF({ orientation: "landscape", unit: "in", format: [pageWidth, pageHeight] });
        const imageWidth = contentWidth;
        const imageHeight = (canvas.height * imageWidth) / canvas.width;
        const sourcePageHeight = Math.floor((contentHeight * canvas.width) / imageWidth);
        let sourceOffset = 0;

        // Collect bounding boxes of all table rows and signature blocks in canvas coordinates to avoid slicing any row in half
        const reportRect = report.getBoundingClientRect();
        const rHeight = reportRect.height || 1;
        const avoidElements = Array.from(report.querySelectorAll("tr, .report-signatures, [style*='SIGNATURES']"));
        const elementBoxes = avoidElements.map((el) => {
            const r = el.getBoundingClientRect();
            return {
                top: Math.round(((r.top - reportRect.top) / rHeight) * canvas.height),
                bottom: Math.round(((r.bottom - reportRect.top) / rHeight) * canvas.height)
            };
        });

        while (sourceOffset < canvas.height) {
            if (sourceOffset > 0) pdf.addPage([pageWidth, pageHeight], "landscape");

            let targetSliceHeight = Math.min(sourcePageHeight, canvas.height - sourceOffset);
            const cutoffPoint = sourceOffset + targetSliceHeight;

            // If cutoffPoint falls within content, ensure it does not split through any row or signatory element
            if (cutoffPoint < canvas.height) {
                const splitItem = elementBoxes.find((b) => b.top < cutoffPoint && b.bottom > cutoffPoint);
                if (splitItem && splitItem.top > sourceOffset) {
                    targetSliceHeight = splitItem.top - sourceOffset;
                }
            }

            const sliceHeight = targetSliceHeight;
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

function openAccountablePersonReport() {
        const entries = getAccountablePersonEntries();
        const maxValue = Math.max(...entries.map((entry) => entry.value), 1);
        const colors = ["#004c87", "#449e38", "#f29913", "#0284c7", "#94a3b8", "#6366f1", "#0d9488", "#ec4899", "#8b5cf6", "#64748b"];
        const rows = entries.length
                ? entries.map((entry, index) => `
                        <div class="bar-row">
                            <span class="person-label">${escapeHtml(entry.label)}</span>
                            <div class="bar-track">
                                <div class="bar-fill" style="width: ${Math.max(1, Math.round((entry.value / maxValue) * 100))}%; background: ${colors[index % colors.length]};">
                                    <strong>${entry.value}</strong>
                                </div>
                            </div>
                        </div>
                    `).join("")
                : '<p class="empty-state">No accountable persons found in the asset database.</p>';
        const totalAssigned = entries.reduce((sum, entry) => sum + entry.value, 0);
                    const reportHtml = `<!doctype html>
                        <html lang="en">
                            <head>
                                <meta charset="utf-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1">
                                <title>All Accountable Persons</title>
                                <style>
                                    :root { font-family: Arial, sans-serif; color: #17324d; background: #f4f8fb; }
                                    body { margin: 0; padding: 32px; }
                                    main { max-width: 1100px; margin: 0 auto; background: #fff; border: 1px solid #d9e4ec; border-radius: 14px; padding: 28px; box-shadow: 0 8px 24px rgba(0, 51, 94, .08); }
                                    header { display: flex; justify-content: space-between; align-items: end; gap: 20px; border-bottom: 1px solid #e5edf3; padding-bottom: 18px; margin-bottom: 24px; }
                                    h1 { margin: 0 0 6px; color: #00335e; font-size: 24px; }
                                    p { margin: 0; color: #64748b; font-size: 13px; }
                                    .total { color: #00335e; font-size: 14px; font-weight: 700; white-space: nowrap; }
                                    .chart { display: grid; gap: 10px; }
                                    .bar-row { display: grid; grid-template-columns: minmax(150px, 220px) minmax(0, 1fr); align-items: center; gap: 14px; }
                                    .person-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #475569; font-size: 13px; font-weight: 600; }
                                    .bar-track { height: 26px; overflow: hidden; border-radius: 999px; background: #edf2f6; }
                                    .bar-fill { display: flex; align-items: center; justify-content: flex-end; min-width: 28px; height: 100%; padding-right: 9px; box-sizing: border-box; border-radius: inherit; color: #fff; font-size: 12px; }
                                    .empty-state { padding: 24px 0; }
                                    @media (max-width: 600px) { body { padding: 14px; } main { padding: 18px; } header { align-items: start; flex-direction: column; } .bar-row { grid-template-columns: 110px minmax(0, 1fr); gap: 9px; } }
                                </style>
                            </head>
                            <body>
                                <main>
                                    <header>
                                        <div><h1>All Accountable Persons</h1><p>Asset assignments from the database</p></div>
                                        <div class="total">Total assigned: ${totalAssigned} item${totalAssigned === 1 ? "" : "s"}</div>
                                    </header>
                                    <section class="chart" aria-label="All accountable persons">${rows}</section>
                                </main>
                            </body>
                        </html>`;
                    const reportUrl = URL.createObjectURL(new Blob([reportHtml], { type: "text/html" }));
                    const reportWindow = window.open(reportUrl, "_blank");

                    if (!reportWindow) {
                            URL.revokeObjectURL(reportUrl);
                            showToast("Please allow popups to view all accountable persons.");
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

function sortItemsByNewest(itemsToSort) {
    return [...itemsToSort].sort((first, second) => {
        const firstTimestamp = getTimestamp(first.createdAt || first.updatedAt || first.acquisitionDate || first.dateIssue);
        const secondTimestamp = getTimestamp(second.createdAt || second.updatedAt || second.acquisitionDate || second.dateIssue);
        return secondTimestamp - firstTimestamp;
    });
}

function getFilteredItems() {
    const query = dom.searchInput.value.trim().toLowerCase();
    const status = dom.statusFilter.value;

    return sortItemsByNewest(items).filter((item) => {
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
                    <button type="button" data-action="open" data-id="${escapeHtml(item.assetId)}">Open</button>
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
    dom.openQrLinkBtn.href = "#";

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
    dom.openQrLinkBtn.href = `asset.html?assetId=${encodeURIComponent(item.assetId || "")}`;
    dom.openQrLinkBtn.hidden = false;
    setQrDetails(item);

    if (!window.QRCode) {
        dom.qrCode.textContent = "QR library is loading. Check your internet connection and refresh.";
        return;
    }

    new QRCode(dom.qrCode, {
        text: assetLink,
        width: 280,
        height: 280,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
    });

    const canvasEl = dom.qrCode.querySelector("canvas");
    const imgEl = dom.qrCode.querySelector("img");

    if (canvasEl && imgEl) {
        try {
            const dataUrl = canvasEl.toDataURL("image/png");
            if (dataUrl && dataUrl.startsWith("data:image/png")) {
                imgEl.src = dataUrl;
                imgEl.alt = "QR Code for " + (item.propertyNo || item.assetId);
                imgEl.style.display = "block";
                canvasEl.style.display = "none";
            } else {
                canvasEl.style.display = "block";
                imgEl.style.display = "none";
            }
        } catch (err) {
            canvasEl.style.display = "block";
            imgEl.style.display = "none";
        }
    } else if (canvasEl) {
        canvasEl.style.display = "block";
    } else if (imgEl) {
        imgEl.style.display = "block";
    }

}

function loadQrDownloadHistory() {
    try {
        const stored = JSON.parse(localStorage.getItem(qrDownloadHistoryStorageKey) || "[]");
        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
}

async function loadRemoteQrDownloadHistory() {
    if (!supabaseUrl || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") return;
    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/qr_download_history?select=*&order=downloaded_at.desc`, {
            headers: supabaseHeaders
        });
        if (response.ok) {
            const rows = await response.json();
            if (Array.isArray(rows)) {
                const remoteHistoryMap = new Map();
                rows.forEach((r) => {
                    remoteHistoryMap.set(r.asset_id, {
                        assetId: r.asset_id,
                        propertyNo: r.property_no || r.asset_id,
                        itemBrandModel: r.item_brand_model || "",
                        downloadedAt: r.downloaded_at || r.created_at,
                        count: Number(r.download_count) || 1
                    });
                });

                // Merge local entries into remote map if local is newer or has higher count
                qrDownloadHistory.forEach((local) => {
                    const remote = remoteHistoryMap.get(local.assetId);
                    if (!remote) {
                        remoteHistoryMap.set(local.assetId, local);
                    } else {
                        const higherCount = Math.max(Number(local.count || 1), Number(remote.count || 1));
                        const newerDate = new Date(local.downloadedAt) > new Date(remote.downloadedAt) ? local.downloadedAt : remote.downloadedAt;
                        remoteHistoryMap.set(local.assetId, {
                            ...remote,
                            count: higherCount,
                            downloadedAt: newerDate,
                            propertyNo: local.propertyNo || remote.propertyNo,
                            itemBrandModel: local.itemBrandModel || remote.itemBrandModel
                        });
                    }
                });

                qrDownloadHistory = Array.from(remoteHistoryMap.values());
                saveQrDownloadHistory();
                renderQrDownloadHistory();
            }
        } else {
            console.warn(`Unable to fetch remote QR download history (HTTP ${response.status}). If table 'qr_download_history' does not exist in Supabase, run 'supabase-setup.sql' in Supabase SQL Editor.`);
        }
    } catch (e) {
        console.warn("Unable to load remote QR download history:", e);
    }
}

function saveQrDownloadHistory() {
    try {
        localStorage.setItem(qrDownloadHistoryStorageKey, JSON.stringify(qrDownloadHistory));
    } catch (error) {
        console.error("Unable to save QR download history locally.", error);
    }
}

async function recordQrDownload(item) {
    if (!item || !item.assetId) return;
    const existing = qrDownloadHistory.find((entry) => entry.assetId === item.assetId);
    const downloadedAt = new Date().toISOString();

    if (existing) {
        existing.propertyNo = item.propertyNo || item.assetId;
        existing.itemBrandModel = item.itemBrandModel || item.propertyNo || item.assetId;
        existing.downloadedAt = downloadedAt;
        existing.count = Number(existing.count || 0) + 1;
    } else {
        qrDownloadHistory.push({
            assetId: item.assetId,
            propertyNo: item.propertyNo || item.assetId,
            itemBrandModel: item.itemBrandModel || item.propertyNo || item.assetId,
            downloadedAt,
            count: 1
        });
    }

    saveQrDownloadHistory();
    renderQrDownloadHistory();

    if (supabaseUrl && supabaseAnonKey !== "YOUR_SUPABASE_ANON_KEY") {
        try {
            const payload = {
                asset_id: item.assetId,
                property_no: item.propertyNo || item.assetId,
                item_brand_model: item.itemBrandModel || item.propertyNo || item.assetId,
                download_count: existing ? existing.count : 1,
                downloaded_at: downloadedAt,
                updated_at: downloadedAt
            };

            const checkResp = await fetch(`${supabaseUrl}/rest/v1/qr_download_history?asset_id=eq.${encodeURIComponent(item.assetId)}`, {
                headers: supabaseHeaders
            });

            if (!checkResp.ok) {
                const errText = await checkResp.text();
                console.warn(`Supabase qr_download_history check failed (HTTP ${checkResp.status}):`, errText);
                console.warn("Please run 'supabase-setup.sql' in your Supabase SQL Editor to create the public.qr_download_history table.");
                return;
            }

            const existingRows = await checkResp.json();
            let saveResp;

            if (Array.isArray(existingRows) && existingRows.length > 0) {
                saveResp = await fetch(`${supabaseUrl}/rest/v1/qr_download_history?asset_id=eq.${encodeURIComponent(item.assetId)}`, {
                    method: "PATCH",
                    headers: {
                        ...supabaseHeaders,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
            } else {
                saveResp = await fetch(`${supabaseUrl}/rest/v1/qr_download_history`, {
                    method: "POST",
                    headers: {
                        ...supabaseHeaders,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
            }

            if (!saveResp.ok) {
                const errText = await saveResp.text();
                console.warn(`Supabase qr_download_history save failed (HTTP ${saveResp.status}):`, errText);
            }
        } catch (e) {
            console.warn("Unable to sync QR download history to database:", e);
        }
    }
}

function renderQrDownloadHistory() {
    if (!dom.qrHistoryTable || !dom.qrHistoryEmptyState) return;

    const query = dom.qrHistorySearchInput ? dom.qrHistorySearchInput.value.trim().toLowerCase() : "";
    let entries = [...qrDownloadHistory].sort((first, second) =>
        new Date(second.downloadedAt).getTime() - new Date(first.downloadedAt).getTime()
    );

    if (query) {
        entries = entries.filter((entry) => {
            const propertyNo = String(entry.propertyNo || entry.assetId || "").toLowerCase();
            const item = String(entry.itemBrandModel || "").toLowerCase();
            return propertyNo.includes(query) || item.includes(query);
        });
    }

    const totalPages = Math.max(1, Math.ceil(entries.length / qrHistoryPageSize));
    qrHistoryPage = Math.min(Math.max(1, qrHistoryPage), totalPages);
    const startIndex = (qrHistoryPage - 1) * qrHistoryPageSize;
    const pageEntries = entries.slice(startIndex, startIndex + qrHistoryPageSize);

    dom.qrHistoryTable.innerHTML = pageEntries.map((entry) => `
        <tr class="qr-history-row clickable-row" data-asset-id="${escapeHtml(entry.assetId)}" data-property-no="${escapeHtml(entry.propertyNo || entry.assetId)}" data-item-brand-model="${escapeHtml(entry.itemBrandModel || "")}" title="Click to open QR preview">
            <td>${escapeHtml(entry.propertyNo || entry.assetId)}</td>
            <td>${escapeHtml(entry.itemBrandModel || "Unspecified")}</td>
            <td>${escapeHtml(formatQrDownloadDate(entry.downloadedAt))}</td>
            <td><strong>${Number(entry.count || 0)}</strong></td>
        </tr>
    `).join("");
    dom.qrHistoryEmptyState.style.display = entries.length ? "none" : "flex";

    if (dom.qrHistoryPagination) {
        dom.qrHistoryPagination.innerHTML = entries.length > qrHistoryPageSize ? `
            <button class="inventory-page-btn" type="button" data-qr-history-page="${Math.max(1, qrHistoryPage - 1)}" ${qrHistoryPage === 1 ? "disabled" : ""}>Previous</button>
            <span class="inventory-page-status">Page ${qrHistoryPage} of ${totalPages}</span>
            <button class="inventory-page-btn" type="button" data-qr-history-page="${Math.min(totalPages, qrHistoryPage + 1)}" ${qrHistoryPage === totalPages ? "disabled" : ""}>Next</button>
        ` : "";
    }
}

function formatQrDownloadDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Unknown";
    return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
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
    items = sortItemsByNewest(items);
    selectedId = selectedId || (items[0] && items[0].assetId) || null;
    populateIcsDescriptionDropdown(document.querySelector("#icsDescription")?.value || "");
    renderInventoryCustodianSlipTable();
    renderStats();
    renderDashboard();
    renderTable();
    renderQr();
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

function showSuccessModal(message, title) {
    const modal = document.getElementById("successModal");
    const titleEl = modal && modal.querySelector(".success-modal-title");
    const msgEl   = modal && modal.querySelector(".success-modal-msg");
    const okBtn   = document.getElementById("successModalOkBtn");
    if (!modal) return;

    // Set title and message
    if (title   && titleEl) titleEl.textContent = title;
    if (message && msgEl)   msgEl.textContent   = message;

    // Re-trigger SVG stroke animations by cloning the SVG
    const svgOld = modal.querySelector(".success-modal-check");
    if (svgOld) {
        const svgNew = svgOld.cloneNode(true);
        svgOld.parentNode.replaceChild(svgNew, svgOld);
    }

    modal.hidden = false;
    if (okBtn) okBtn.focus();

    function closeModal() {
        modal.hidden = true;
        // Reset back to defaults
        if (titleEl) titleEl.textContent = "Success";
        if (msgEl)   msgEl.textContent   = "Record saved successfully!";
        document.removeEventListener("keydown", onEsc);
        modal.removeEventListener("click", onBackdrop);
    }

    function onEsc(e) { if (e.key === "Escape") closeModal(); }
    function onBackdrop(e) { if (e.target === modal) closeModal(); }

    if (okBtn) okBtn.onclick = closeModal;
    document.addEventListener("keydown", onEsc);
    modal.addEventListener("click", onBackdrop);
}

function showConfirmDialog({
    title = "Confirm Delete",
    message = "Are you sure you want to delete this record? This action cannot be undone.",
    confirmText = "Delete",
    cancelText = "Cancel"
} = {}) {
    return new Promise((resolve) => {
        const modal = document.getElementById("confirmModal");
        if (!modal) {
            try {
                const confirmed = window.confirm(`${title}\n\n${message}`);
                resolve(Boolean(confirmed));
            } catch {
                resolve(true);
            }
            return;
        }

        const titleEl = document.getElementById("confirmModalTitle");
        const msgEl = document.getElementById("confirmModalMsg");
        const cancelBtn = document.getElementById("confirmModalCancelBtn");
        const confirmBtn = document.getElementById("confirmModalConfirmBtn");

        if (titleEl) titleEl.textContent = title;
        if (msgEl) msgEl.textContent = message;
        if (cancelBtn) cancelBtn.textContent = cancelText;
        if (confirmBtn) confirmBtn.textContent = confirmText;

        modal.hidden = false;
        if (confirmBtn) confirmBtn.focus();

        function cleanup() {
            modal.hidden = true;
            document.removeEventListener("keydown", onKey);
            modal.removeEventListener("click", onBackdrop);
            if (cancelBtn) cancelBtn.onclick = null;
            if (confirmBtn) confirmBtn.onclick = null;
        }

        function onCancel() {
            cleanup();
            resolve(false);
        }

        function onConfirm() {
            cleanup();
            resolve(true);
        }

        function onKey(e) {
            if (e.key === "Escape") {
                e.preventDefault();
                onCancel();
            }
        }

        function onBackdrop(e) {
            if (e.target === modal) {
                onCancel();
            }
        }

        if (cancelBtn) cancelBtn.onclick = onCancel;
        if (confirmBtn) confirmBtn.onclick = onConfirm;
        document.addEventListener("keydown", onKey);
        modal.addEventListener("click", onBackdrop);
    });
}

function showToast(message) {
    dom.toast.textContent = message;
    dom.toast.classList.add("show");
    window.setTimeout(() => dom.toast.classList.remove("show"), 2200);
}

function generateQrCanvas(text, size = 500) {
    return new Promise((resolve) => {
        if (window.QRCode) {
            const container = document.createElement("div");
            container.style.position = "fixed";
            container.style.left = "-9999px";
            container.style.top = "-9999px";
            container.style.opacity = "0";
            container.style.pointerEvents = "none";
            document.body.appendChild(container);

            try {
                new QRCode(container, {
                    text: text,
                    width: size,
                    height: size,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });

                setTimeout(() => {
                    let resolvedCanvas = null;
                    const c = container.querySelector("canvas");
                    if (c && c.width > 0) {
                        resolvedCanvas = document.createElement("canvas");
                        resolvedCanvas.width = size;
                        resolvedCanvas.height = size;
                        const rctx = resolvedCanvas.getContext("2d");
                        rctx.drawImage(c, 0, 0, size, size);
                    } else {
                        const img = container.querySelector("img");
                        if (img && img.src) {
                            const loadedImg = new Image();
                            loadedImg.onload = () => {
                                const imgCanvas = document.createElement("canvas");
                                imgCanvas.width = size;
                                imgCanvas.height = size;
                                const ictx = imgCanvas.getContext("2d");
                                ictx.drawImage(loadedImg, 0, 0, size, size);
                                if (container.parentNode) document.body.removeChild(container);
                                resolve(imgCanvas);
                            };
                            loadedImg.onerror = () => {
                                if (container.parentNode) document.body.removeChild(container);
                                resolve(null);
                            };
                            loadedImg.src = img.src;
                            return;
                        }
                    }
                    if (container.parentNode) document.body.removeChild(container);
                    resolve(resolvedCanvas);
                }, 70);
                return;
            } catch (err) {
                if (container.parentNode) document.body.removeChild(container);
                resolve(null);
            }
        }

        const existingCanvas = dom.qrCode ? dom.qrCode.querySelector("canvas") : null;
        if (existingCanvas && existingCanvas.width > 0) {
            const fallbackCanvas = document.createElement("canvas");
            fallbackCanvas.width = existingCanvas.width;
            fallbackCanvas.height = existingCanvas.height;
            fallbackCanvas.getContext("2d").drawImage(existingCanvas, 0, 0);
            return resolve(fallbackCanvas);
        }

        const existingImg = dom.qrCode ? dom.qrCode.querySelector("img") : null;
        if (existingImg && existingImg.src) {
            const loadedImg = new Image();
            loadedImg.onload = () => {
                const fallbackCanvas = document.createElement("canvas");
                fallbackCanvas.width = loadedImg.naturalWidth || 280;
                fallbackCanvas.height = loadedImg.naturalHeight || 280;
                fallbackCanvas.getContext("2d").drawImage(loadedImg, 0, 0);
                resolve(fallbackCanvas);
            };
            loadedImg.onerror = () => resolve(null);
            loadedImg.src = existingImg.src;
            return;
        }

        resolve(null);
    });
}

function downloadCanvasAsPng(canvas, fileName) {
    return new Promise((resolve) => {
        const fallbackDataUrl = () => {
            try {
                const dataUrl = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.download = fileName;
                link.href = dataUrl;
                link.rel = "noopener noreferrer";
                link.style.display = "none";
                document.body.appendChild(link);
                link.click();
                setTimeout(() => {
                    try { document.body.removeChild(link); } catch (e) {}
                    resolve(true);
                }, 300);
            } catch (err) {
                console.error("DataURL download failed:", err);
                resolve(false);
            }
        };

        if (canvas.toBlob) {
            canvas.toBlob((blob) => {
                if (!blob) {
                    fallbackDataUrl();
                    return;
                }
                try {
                    const blobUrl = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.download = fileName;
                    link.href = blobUrl;
                    link.rel = "noopener noreferrer";
                    link.style.display = "none";
                    document.body.appendChild(link);
                    link.click();
                    setTimeout(() => {
                        try {
                            document.body.removeChild(link);
                            URL.revokeObjectURL(blobUrl);
                        } catch (e) {}
                        resolve(true);
                    }, 1500);
                } catch (err) {
                    fallbackDataUrl();
                }
            }, "image/png");
        } else {
            fallbackDataUrl();
        }
    });
}

function loadQrDownloadedFileNames() {
    try {
        const stored = JSON.parse(localStorage.getItem(qrDownloadedFileNamesStorageKey) || "[]");
        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
}

function saveQrDownloadedFileNames(fileNames) {
    try {
        localStorage.setItem(qrDownloadedFileNamesStorageKey, JSON.stringify(fileNames));
    } catch (error) {
        console.error("Unable to save QR download filenames locally.", error);
    }
}

function getNextQrDownloadFileName(fileName) {
    const downloadedFileNames = loadQrDownloadedFileNames();
    if (!downloadedFileNames.includes(fileName)) return fileName;

    const extensionIndex = fileName.lastIndexOf(".");
    const baseName = extensionIndex > 0 ? fileName.slice(0, extensionIndex) : fileName;
    const extension = extensionIndex > 0 ? fileName.slice(extensionIndex) : "";
    let suffix = 1;
    let candidate = `${baseName} (${suffix})${extension}`;

    while (downloadedFileNames.includes(candidate)) {
        suffix += 1;
        candidate = `${baseName} (${suffix})${extension}`;
    }

    return candidate;
}

function rememberQrDownloadedFileName(fileName) {
    const downloadedFileNames = loadQrDownloadedFileNames();
    if (!downloadedFileNames.includes(fileName)) {
        downloadedFileNames.push(fileName);
        saveQrDownloadedFileNames(downloadedFileNames);
    }
}

async function downloadQr() {
    let item = items.find((entry) => entry.assetId === selectedId);

    if (!item && items.length > 0) {
        selectedId = items[0].assetId;
        item = items[0];
        renderQr();
    }

    if (!item) {
        showToast("Select an inventory record first to download its QR code.");
        return;
    }

    const btn = dom.downloadQrBtn;
    const origHtml = btn ? btn.innerHTML : "";

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader" class="w-4 h-4 inline-block mr-1 animate-spin"></i>Downloading...`;
        if (window.lucide && lucide.createIcons) lucide.createIcons();
    }

    try {
        const payload = getQrPayload(item);
        const qrCanvas = await generateQrCanvas(payload, 520);

        if (!qrCanvas) {
            showToast("Unable to generate QR code canvas. Please try again.");
            return;
        }

        // Add standard white quiet zone (margin) around the QR code
        const qrSize = qrCanvas.width || 520;
        const padding = Math.max(36, Math.round(qrSize * 0.08));
        const outWidth = qrSize + padding * 2;
        const outHeight = qrSize + padding * 2;

        const out = document.createElement("canvas");
        out.width = outWidth;
        out.height = outHeight;
        const ctx = out.getContext("2d");

        // Solid white quiet zone background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, outWidth, outHeight);

        // Draw centered QR Code
        ctx.drawImage(qrCanvas, padding, padding, qrSize, qrSize);

        // Sanitize filename
        const cleanPropertyNo = (item.propertyNo || item.assetId || "asset")
            .trim()
            .replace(/[<>:"/\\|?*]+/g, "-")
            .replace(/[. ]+$/, "");
        const cleanItemName = (item.itemBrandModel || "qr-code")
            .trim()
            .replace(/[<>:"/\\|?*]+/g, "-")
            .replace(/[. ]+$/, "");
        const cleanSerial = (item.serialNo || "")
            .trim()
            .replace(/[<>:"/\\|?*]+/g, "-")
            .replace(/[. ]+$/, "");

        let fileName = `${cleanPropertyNo} - ${cleanItemName}`;
        if (cleanSerial && cleanSerial.toLowerCase() !== "not specified" && cleanSerial.toLowerCase() !== "no serial no") {
            fileName += ` - ${cleanSerial}`;
        }
        fileName += ".png";
        fileName = getNextQrDownloadFileName(fileName);

        const success = await downloadCanvasAsPng(out, fileName);
        if (success) {
            rememberQrDownloadedFileName(fileName);
            recordQrDownload(item);
            showToast(`QR Code PNG downloaded: ${fileName}`);
        } else {
            showToast("Unable to prepare QR image for download.");
        }
    } catch (err) {
        console.error("QR download error:", err);
        showToast("Unable to prepare QR image for download.");
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = origHtml;
            if (window.lucide && lucide.createIcons) lucide.createIcons();
        }
    }
}

function selectPreviousQrItem() {
    if (!items.length) {
        showToast("No assets available.");
        return;
    }
    const currentIndex = items.findIndex((item) => item.assetId === selectedId);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : (currentIndex === 0 ? items.length - 1 : 0);
    selectedId = items[prevIndex].assetId;
    renderQr();
    showToast("QR preview moved to previous item.");
}

function selectNextQrItem() {
    if (!items.length) {
        showToast("No assets available.");
        return;
    }
    const currentIndex = items.findIndex((item) => item.assetId === selectedId);
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % items.length : 0;
    selectedId = items[nextIndex].assetId;
    renderQr();
    showToast("QR preview advanced to next item.");
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
    const matchedAsset = (typeof items !== "undefined" && Array.isArray(items))
        ? items.find((a) =>
            (a.propertyNo && a.propertyNo === (item.inventoryItemNo || item.propertyNo || item.assetId)) ||
            (a.semiExpandableNo && a.semiExpandableNo === item.inventoryItemNo) ||
            (a.assetId && a.assetId === (item.inventoryItemNo || item.assetId))
        )
        : null;
    const dateAcquired = item.acquisitionDate || (matchedAsset && matchedAsset.acquisitionDate) || item.receivedFromDate || "";
    const mainDesc = [
        item.description || item.itemBrandModel || item.itemClassification || "Inventory item",
        item.serialNo ? `Serial No. ${item.serialNo}` : "",
        item.itemClassification && item.itemBrandModel ? item.itemClassification : ""
    ].filter(Boolean).join(" / ");

    return dateAcquired ? `${mainDesc}<br><small>Date Acquired: ${escapeHtml(dateAcquired)}</small>` : mainDesc;
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
    const logoUrl = new URL("images/deped_logo.png", window.location.href).href;

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
        showSuccessModal(action === "update" ? "The asset record has been updated successfully." : "The asset has been saved and its QR code generated.");
    } catch (error) {
        console.error(error);
        showToast("Saved locally. Supabase sync failed.");
        setDatabaseStatus("Local fallback is active.", "The backend could not receive the latest change.");
    }

    showSuccessModal(action === "update" ? "Asset record updated successfully!" : "Asset saved successfully!");
}

async function handleTableClick(event) {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const item = items.find((entry) => entry.assetId === button.dataset.id);
    if (!item) return;

    if (button.dataset.action === "open") {
        openAssetWindow(item.assetId);
        return;
    }

    if (button.dataset.action === "qr") {
        selectedId = item.assetId;
        renderQr();
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
        const confirmed = await showConfirmDialog({
            title: "Delete Asset",
            message: `Are you sure you want to delete asset "${item.propertyNo || item.assetId}"? This action cannot be undone.`,
            confirmText: "Delete",
            cancelText: "Cancel"
        });
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

function showModule(moduleName, targetId = "") {
    if (!moduleName) return;

    const targetModuleView = (moduleName === "ics" || moduleName === "document-ics") ? "document" : moduleName;

    document.querySelector(".app-sidebar")?.classList.remove("mobile-open");
    document.getElementById("sidebarBackdrop")?.classList.add("hidden");

    document.querySelectorAll(".module-view").forEach((module) => {
        const isActive = module.dataset.module === targetModuleView;
        module.classList.toggle("active", isActive);
        module.style.display = isActive ? "block" : "none";
    });

    // Synchronize Sidebar Nav Items
    document.querySelectorAll(".nav-item").forEach((item) => {
        const isActive = item.dataset.view === moduleName || (targetModuleView === "document" && item.dataset.view === "ics");
        item.classList.toggle("active", isActive);

        const indicator = item.querySelector(".nav-indicator");
        const icon = item.querySelector("[data-lucide], svg");

        if (isActive) {
            item.classList.add("bg-white", "text-[#00335e]", "font-bold", "shadow-md");
            item.classList.remove("text-slate-100", "hover:bg-white/10");
            if (indicator) indicator.classList.remove("hidden");
            if (icon) {
                icon.classList.remove("text-slate-200");
                icon.classList.add("text-[#00335e]");
            }
        } else {
            item.classList.remove("bg-white", "text-[#00335e]", "font-bold", "shadow-md");
            item.classList.add("text-slate-100", "hover:bg-white/10");
            if (indicator) indicator.classList.add("hidden");
            if (icon) {
                icon.classList.remove("text-[#00335e]");
                icon.classList.add("text-slate-200");
            }
        }
    });

    const documentSubmenu = document.getElementById("documentSubmenu");
    const documentToggle = document.querySelector("[data-document-toggle]");
    const isDocumentModule = targetModuleView === "document";
    if (documentSubmenu) documentSubmenu.classList.toggle("hidden", !isDocumentModule);
    if (documentToggle) {
        documentToggle.setAttribute("aria-expanded", String(isDocumentModule));
        documentToggle.querySelector(".document-nav-chevron")?.classList.toggle("rotate-180", isDocumentModule);
    }

    // Synchronize Top Horizontal Navigation Bar Buttons
    document.querySelectorAll(".top-nav-btn").forEach((btn) => {
        const isActive = btn.dataset.view === targetModuleView || btn.dataset.view === moduleName;
        btn.classList.toggle("active", isActive);
        if (isActive) {
            btn.classList.add("bg-[#00335e]", "text-white", "font-bold", "shadow-xs");
            btn.classList.remove("text-slate-600", "font-semibold", "hover:bg-slate-100", "hover:text-[#00335e]");
        } else {
            btn.classList.remove("bg-[#00335e]", "text-white", "font-bold", "shadow-xs");
            btn.classList.add("text-slate-600", "font-semibold", "hover:bg-slate-100", "hover:text-[#00335e]");
        }
    });

    // Show school name and ID card in sidebar (visible in dashboard, about, and settings)
    const sidebarSchoolCard = document.getElementById("sidebarSchoolInfoCard");
    if (sidebarSchoolCard) {
        sidebarSchoolCard.style.display = (moduleName === "dashboard" || moduleName === "about" || moduleName === "settings") ? "" : "none";
    }

    if (moduleName === "qr") {
        renderQr();
        loadRemoteQrDownloadHistory();
    }

    if (moduleName === "reports") {
        renderReports();
    }

    if (moduleName === "about" || moduleName === "settings") {
        loadSchoolDetails();
    }

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    if (targetId) {
        window.requestAnimationFrame(() => {
            document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Expose globally so inline onclick handlers work
window.showModule = showModule;

function applyTheme(theme) {
    const selectedTheme = theme === "light" ? "light" : "dark";
    document.body.dataset.theme = selectedTheme;
    localStorage.setItem(themeStorageKey, selectedTheme);

    document.querySelectorAll(".nav-icon, .action-icon").forEach((icon) => {
        const lightSrc = icon.dataset.themeIconLight;
        const darkSrc = icon.dataset.themeIcon;
        if (!lightSrc && !darkSrc) return;
        icon.src = selectedTheme === "light" ? (lightSrc || darkSrc) : (darkSrc || lightSrc);
    });

    dom.themeButtons.forEach((button) => {
        const isActive = button.dataset.themeChoice === selectedTheme;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

function loadTheme() {
    applyTheme(localStorage.getItem(themeStorageKey) || "dark");
}

function wireEvents() {
    const sidebar = document.querySelector(".app-sidebar");
    const sidebarToggle = document.querySelector("#sidebarToggleBtn, button[aria-label='Toggle Sidebar']");
    const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
    const sidebarBackdrop = document.getElementById("sidebarBackdrop");
    const accountablePersonViewAll = document.getElementById("accountablePersonViewAll");

    function openMobileSidebar() {
        sidebar?.classList.add("mobile-open");
        sidebarBackdrop?.classList.remove("hidden");
    }

    function closeMobileSidebar() {
        sidebar?.classList.remove("mobile-open");
        sidebarBackdrop?.classList.add("hidden");
    }

    if (sidebar && sidebarToggle) {
        sidebarToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            if (window.innerWidth < 768) {
                if (sidebar.classList.contains("mobile-open")) {
                    closeMobileSidebar();
                } else {
                    openMobileSidebar();
                }
            } else {
                sidebar.classList.toggle("sidebar-collapsed");
            }
        });
    }

    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            closeMobileSidebar();
        });
    }

    if (sidebarBackdrop) {
        sidebarBackdrop.addEventListener("click", closeMobileSidebar);
    }

    const accountablePersonFilter = document.getElementById("accountablePersonFilter") || dom.accountablePersonFilter;
    if (accountablePersonFilter) {
        accountablePersonFilter.addEventListener("change", (e) => {
            const filterValue = e.target.value;
            const filteredEntries = getAccountablePersonEntries(filterValue);
            renderAccountablePersonCard(filteredEntries);
            renderAccountableBarChart(filteredEntries);
        });
    }

    if (accountablePersonViewAll) {
        accountablePersonViewAll.addEventListener("click", () => {
            try {
                localStorage.setItem("accountablePersonReportEntries", JSON.stringify(getAccountablePersonEntries("all")));
            } catch (err) {
                console.warn("Could not save to localStorage:", err);
            }
        });
    }

    const acquisitionYearFilter = document.getElementById("acquisitionYearFilter") || dom.acquisitionYearFilter;
    if (acquisitionYearFilter) {
        acquisitionYearFilter.addEventListener("change", (e) => {
            const filterValue = e.target.value;
            const filteredEntries = getYearDistribution("acquisitionDate", filterValue);
            renderAcquisitionYearCard(filteredEntries);
            renderMiniDistributionChart(dom.acquisitionYearChart, filteredEntries);
        });
    }

    const acquisitionYearViewAll = document.getElementById("acquisitionYearViewAll") || dom.acquisitionYearViewAll;
    if (acquisitionYearViewAll) {
        acquisitionYearViewAll.addEventListener("click", () => {
            try {
                localStorage.setItem("acquisitionYearReportEntries", JSON.stringify(getYearDistribution("acquisitionDate", "all")));
            } catch (err) {
                console.warn("Could not save acquisitionYearReportEntries to localStorage:", err);
            }
        });
    }

    const issuanceYearFilter = document.getElementById("issuanceYearFilter") || dom.issuanceYearFilter;
    if (issuanceYearFilter) {
        issuanceYearFilter.addEventListener("change", (e) => {
            const filterValue = e.target.value;
            const filteredEntries = getYearDistribution("dateIssue", filterValue);
            renderIssuanceYearCard(filteredEntries);
            renderMiniDistributionChart(dom.dateIssueYearChart, filteredEntries);
        });
    }

    const issuanceYearViewAll = document.getElementById("issuanceYearViewAll") || dom.issuanceYearViewAll;
    if (issuanceYearViewAll) {
        issuanceYearViewAll.addEventListener("click", () => {
            try {
                localStorage.setItem("issuanceYearReportEntries", JSON.stringify(getYearDistribution("dateIssue", "all")));
            } catch (err) {
                console.warn("Could not save issuanceYearReportEntries to localStorage:", err);
            }
        });
    }

    const maintenanceRequestsFilter = document.getElementById("maintenanceRequestsFilter") || dom.maintenanceRequestsFilter;
    if (maintenanceRequestsFilter) {
        maintenanceRequestsFilter.addEventListener("change", (e) => {
            const filterValue = e.target.value;
            renderMaintenanceRequestsCard(getMaintenanceItems(filterValue));
        });
    }

    const maintenanceRequestsViewAll = document.getElementById("maintenanceRequestsViewAll") || dom.maintenanceRequestsViewAll;
    if (maintenanceRequestsViewAll) {
        maintenanceRequestsViewAll.addEventListener("click", () => {
            try {
                localStorage.setItem("maintenanceRequestsReportEntries", JSON.stringify(getMaintenanceItems("all")));
            } catch (err) {
                console.warn("Could not save maintenanceRequestsReportEntries to localStorage:", err);
            }
        });
    }

    const propertyCategoryFilter = document.getElementById("propertyCategoryFilter") || dom.propertyCategoryFilter;
    if (propertyCategoryFilter) {
        propertyCategoryFilter.addEventListener("change", (e) => {
            const filterValue = e.target.value;
            renderPropertyCategoryCard(getPropertyCategoryEntries(filterValue));
        });
    }

    const propertyCategoryViewAll = document.getElementById("propertyCategoryViewAll") || dom.propertyCategoryViewAll;
    if (propertyCategoryViewAll) {
        propertyCategoryViewAll.addEventListener("click", () => {
            try {
                localStorage.setItem("propertyCategoryReportEntries", JSON.stringify(getPropertyCategoryEntries("all")));
            } catch (err) {
                console.warn("Could not save propertyCategoryReportEntries to localStorage:", err);
            }
        });
    }

    // Top Dropdown Menus (Notification & User Profile)
    const notifBtn = document.getElementById("notifBellBtn");
    const notifDropdown = document.getElementById("notifDropdown");
    const userBtn = document.getElementById("userMenuBtn");
    const userDropdown = document.getElementById("userDropdown");

    function closeDropdowns() {
        notifDropdown?.classList.add("hidden");
        userDropdown?.classList.add("hidden");
        notifBtn?.setAttribute("aria-expanded", "false");
        userBtn?.setAttribute("aria-expanded", "false");
    }

    if (notifBtn && notifDropdown) {
        notifBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            userDropdown?.classList.add("hidden");
            userBtn?.setAttribute("aria-expanded", "false");
            const isHidden = notifDropdown.classList.toggle("hidden");
            notifBtn.setAttribute("aria-expanded", String(!isHidden));
        });
    }

    if (userBtn && userDropdown) {
        userBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            notifDropdown?.classList.add("hidden");
            notifBtn?.setAttribute("aria-expanded", "false");
            const isHidden = userDropdown.classList.toggle("hidden");
            userBtn.setAttribute("aria-expanded", String(!isHidden));
        });
    }

    document.addEventListener("click", () => {
        closeDropdowns();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeDropdowns();
            closeMobileSidebar();
        }
    });

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
    dom.unitValue.addEventListener("change", updateTotal);
    dom.onHand.addEventListener("input", updateTotal);
    dom.onHand.addEventListener("change", updateTotal);
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
            showModule("inventory");
        });
    }
    if (dom.downloadQrBtn) {
        dom.downloadQrBtn.addEventListener("click", downloadQr);
    }
    if (dom.openQrLinkBtn) {
        dom.openQrLinkBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const currentItem = items.find((entry) => entry.assetId === selectedId);
            if (!currentItem) return;
            const targetUrl = dom.openQrLinkBtn.getAttribute("href") || `asset.html?assetId=${encodeURIComponent(currentItem.assetId || "")}`;
            openAssetWindow(currentItem.assetId, targetUrl);
        });
    }
    if (dom.qrPrevBtn) {
        dom.qrPrevBtn.addEventListener("click", selectPreviousQrItem);
    }
    if (dom.qrNextBtn) {
        dom.qrNextBtn.addEventListener("click", selectNextQrItem);
    }
    if (dom.qrHistorySearchInput) {
        dom.qrHistorySearchInput.addEventListener("input", () => {
            qrHistoryPage = 1;
            renderQrDownloadHistory();
        });
    }
    if (dom.qrHistoryPagination) {
        dom.qrHistoryPagination.addEventListener("click", (event) => {
            const button = event.target.closest("[data-qr-history-page]");
            if (!button || button.disabled) return;

            qrHistoryPage = Number(button.dataset.qrHistoryPage) || 1;
            renderQrDownloadHistory();
        });
    }
    if (dom.qrHistoryTable) {
        dom.qrHistoryTable.addEventListener("click", (event) => {
            const row = event.target.closest("tr[data-asset-id]");
            if (!row) return;

            const assetId = row.dataset.assetId;
            const propertyNo = row.dataset.propertyNo || assetId;
            const itemBrandModel = row.dataset.itemBrandModel || "";
            const displayName = itemBrandModel ? `${propertyNo} (${itemBrandModel})` : propertyNo;

            const confirmOpen = window.confirm("Do you want to open?");
            if (confirmOpen) {
                const asset = items.find((a) => a.assetId === assetId || a.propertyNo === propertyNo);
                if (asset) {
                    selectedId = asset.assetId;
                    renderQr();
                    const qrSection = document.querySelector("#qrPreviewCard") || document.querySelector(".qr-preview-panel");
                    if (qrSection) {
                        qrSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    } else {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    showToast(`Opened QR code preview for ${propertyNo}.`);
                } else {
                    showToast("Asset details not found in inventory.");
                }
            }
        });
    }
    if (dom.icsSlipPagination) {
        dom.icsSlipPagination.addEventListener("click", (event) => {
            const button = event.target.closest("[data-ics-slip-page]");
            if (!button || button.disabled) return;

            icsSlipPage = Number(button.dataset.icsSlipPage) || 1;
            renderInventoryCustodianSlipTable();
        });
    }
    if (dom.icsSlipSearchInput) {
        dom.icsSlipSearchInput.addEventListener("input", () => {
            icsSlipPage = 1;
            renderInventoryCustodianSlipTable();
        });
    }
    if (dom.generatePdfBtn) {
        dom.generatePdfBtn.addEventListener("click", generateReportPdf);
    }
    document.querySelectorAll(".generate-pdf-btn").forEach((btn) => {
        btn.addEventListener("click", generateReportPdf);
    });
    [dom.reportInventoryType, dom.reportFundCluster, dom.reportAsOf, dom.certifiedCorrectedBy, dom.approvedBy, dom.verifiedBy].forEach((control) => {
        if (control) {
            control.addEventListener("input", () => {
                if (control === dom.reportInventoryType && typeof filterReportByInventoryType === "function") {
                    filterReportByInventoryType(control.value);
                } else if (typeof updateReportLiveMeta === "function") {
                    updateReportLiveMeta();
                }
            });
            control.addEventListener("change", () => {
                if (control === dom.reportInventoryType && typeof filterReportByInventoryType === "function") {
                    filterReportByInventoryType(control.value);
                } else if (typeof updateReportLiveMeta === "function") {
                    updateReportLiveMeta();
                }
            });
        }
    });
    if (dom.assetDatabaseSearch) {
        dom.assetDatabaseSearch.addEventListener("input", renderAllAssetsView);
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

    document.addEventListener("click", (e) => {
        const navBtn = e.target.closest(".nav-item, .top-nav-btn, [data-module-target]");
        if (!navBtn) return;

        if (navBtn.hasAttribute("data-document-toggle")) {
            e.preventDefault();
            e.stopPropagation();
            const documentSubmenu = document.getElementById("documentSubmenu");
            const isCurrentlyHidden = documentSubmenu ? documentSubmenu.classList.contains("hidden") : true;
            // Clean up any leftover flyout state
            documentSubmenu?.classList.remove("flyout-open");
            documentSubmenu?.style.removeProperty("top");
            if (isCurrentlyHidden) {
                if (documentSubmenu) documentSubmenu.classList.remove("hidden");
                navBtn.setAttribute("aria-expanded", "true");
                navBtn.querySelector(".document-nav-chevron")?.classList.add("rotate-180");
            } else {
                if (documentSubmenu) documentSubmenu.classList.add("hidden");
                navBtn.setAttribute("aria-expanded", "false");
                navBtn.querySelector(".document-nav-chevron")?.classList.remove("rotate-180");
            }
            return;
        }

        const view = navBtn.dataset.view || navBtn.dataset.moduleTarget;
        if (view) {
            e.preventDefault();
            showModule(view);
        }
    });

    // School Details Card in About Module
    const schoolDetailsForm = document.getElementById("schoolDetailsForm");
    const saveSchoolDetailsBtn = document.getElementById("saveSchoolDetailsBtn");
    const refreshSchoolDetailsBtn = document.getElementById("refreshSchoolDetailsBtn");
    const schoolSelectDropdown = document.getElementById("schoolSelectDropdown");
    const addNewSchoolBtn = document.getElementById("addNewSchoolBtn");
    const selectActiveSchoolBtn = document.getElementById("selectActiveSchoolBtn");
    const schoolLogoInput = document.getElementById("schoolLogoInput");

    if (schoolDetailsForm) {
        schoolDetailsForm.addEventListener("submit", saveSchoolDetails);
    }
    if (saveSchoolDetailsBtn) {
        saveSchoolDetailsBtn.addEventListener("click", saveSchoolDetails);
    }
    if (refreshSchoolDetailsBtn) {
        refreshSchoolDetailsBtn.addEventListener("click", (e) => {
            e.preventDefault();
            loadSchoolDetails(true);
        });
    }
    if (schoolSelectDropdown) {
        schoolSelectDropdown.addEventListener("change", handleSchoolDropdownChange);
    }
    if (addNewSchoolBtn) {
        addNewSchoolBtn.addEventListener("click", (e) => {
            e.preventDefault();
            handleAddNewSchool();
        });
    }
    if (selectActiveSchoolBtn) {
        selectActiveSchoolBtn.addEventListener("click", (e) => {
            e.preventDefault();
            handleSelectActiveSchool();
        });
    }
    if (schoolLogoInput) {
        schoolLogoInput.addEventListener("change", handleSchoolLogoFileChange);
    }
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
    await loadSchoolNameOptions();
    await loadSchoolDetails();
    const params = new URLSearchParams(window.location.search);
    const requestedAssetId = params.get("assetId");
    if (requestedAssetId && items.some((item) => item.assetId === requestedAssetId)) {
        selectedId = requestedAssetId;
    }
    canOpenClassificationModal = true;
    canOpenStatusModal = true;
    resetForm();
    qrDownloadHistory = loadQrDownloadHistory();
    renderQrDownloadHistory();
    await loadRemoteQrDownloadHistory();
    renderApp();

    if (params.get("module") === "qr") {
        showModule("qr");
    }

    if (!supabaseUrl || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") {
        setDatabaseStatus("Supabase config pending.", "Set your Supabase anon key in supabase-config.js to enable remote persistence.");
    }
}

init();

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
                additionalItem: items.find((asset) => {
                    return getIcsAssetDescription(asset) === (item.description_snapshot || "");
                })?.additionalItem || "",
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
    if (!slip) return;
    const sameSlipRows = inventoryCustodianSlips.filter((entry) => slip.dbSlipId && entry.dbSlipId === slip.dbSlipId);
    const itemCount = sameSlipRows.length;

    if (slip.dbItemId) {
        try {
            await requestInventoryCustodianSlipDatabase(`ics_slip_items?id=eq.${encodeURIComponent(slip.dbItemId)}`, { method: "DELETE" });
        } catch (error) {
            console.warn("Could not delete from ics_slip_items:", error);
        }
    }

    if (slip.dbSlipId && itemCount <= 1) {
        try {
            await requestInventoryCustodianSlipDatabase(`ics_slips?id=eq.${encodeURIComponent(slip.dbSlipId)}`, { method: "DELETE" });
        } catch (error) {
            console.warn("Could not delete from ics_slips:", error);
        }
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

    const descSearch = document.querySelector("#icsDescriptionSearch");
    if (descSearch) descSearch.value = "";
    const descSelect = document.querySelector("#icsDescription");
    if (descSelect) descSelect.value = "";
    closeIcsDropdownMenu();
    filterIcsDropdownOptions("");
}

function getIcsAssetDescription(item) {
    const itemBrandModel = String(item.itemBrandModel || "").trim();
    const serialNo = String(item.serialNo || "").trim();
    return serialNo ? `${itemBrandModel} - SN: ${serialNo}` : itemBrandModel;
}

function closeIcsDropdownMenu() {
    const menu = document.querySelector("#icsOptionsMenu");
    const container = document.querySelector("#icsSearchableSelect");
    if (menu) menu.style.display = "none";
    if (container) container.classList.remove("open");
}

function openIcsDropdownMenu() {
    const menu = document.querySelector("#icsOptionsMenu");
    const container = document.querySelector("#icsSearchableSelect");
    if (menu) menu.style.display = "block";
    if (container) container.classList.add("open");
}

function toggleIcsDropdownMenu() {
    const menu = document.querySelector("#icsOptionsMenu");
    if (!menu) return;
    if (menu.style.display === "none" || !menu.style.display) {
        const searchInput = document.querySelector("#icsDescriptionSearch");
        filterIcsDropdownOptions(searchInput ? searchInput.value : "");
        openIcsDropdownMenu();
    } else {
        closeIcsDropdownMenu();
    }
}

function filterIcsDropdownOptions(filterText = "") {
    const list = document.querySelector("#icsOptionsList");
    if (!list) return;

    const query = String(filterText || "").trim().toLowerCase();
    const optionItems = list.querySelectorAll(".ics-option-item");
    let matchCount = 0;

    optionItems.forEach((itemEl) => {
        const text = (itemEl.dataset.text || itemEl.textContent || "").toLowerCase();
        if (!query || text.includes(query)) {
            itemEl.style.display = "flex";
            matchCount++;
        } else {
            itemEl.style.display = "none";
        }
    });

    let noResultsEl = list.querySelector(".ics-option-no-results");
    if (matchCount === 0) {
        if (!noResultsEl) {
            noResultsEl = document.createElement("div");
            noResultsEl.className = "ics-option-no-results";
            noResultsEl.textContent = "No matching inventory items found";
            list.appendChild(noResultsEl);
        }
        noResultsEl.style.display = "block";
    } else if (noResultsEl) {
        noResultsEl.style.display = "none";
    }
}

let isSelectingIcsOption = false;

function selectIcsDescriptionItem(description, assetId) {
    isSelectingIcsOption = true;
    const searchInput = document.querySelector("#icsDescriptionSearch");
    const descriptionSelect = document.querySelector("#icsDescription");

    if (searchInput) {
        searchInput.value = description;
        searchInput.blur();
    }

    if (descriptionSelect) {
        if (description && !Array.from(descriptionSelect.options).some(opt => opt.value === description)) {
            const opt = document.createElement("option");
            opt.value = description;
            opt.textContent = description;
            if (assetId) opt.dataset.assetId = assetId;
            descriptionSelect.appendChild(opt);
        }
        descriptionSelect.value = description;
        if (assetId && descriptionSelect.selectedOptions[0]) {
            descriptionSelect.selectedOptions[0].dataset.assetId = assetId;
        }
    }

    closeIcsDropdownMenu();
    setTimeout(() => {
        isSelectingIcsOption = false;
    }, 250);

    let asset = null;
    if (assetId) {
        asset = items.find(i => i.assetId === assetId);
    }
    if (!asset && description) {
        asset = findAssetByIcsDescription(description);
    }
    populateIcsFieldsFromDescription(asset);
}

function populateIcsDescriptionDropdown(selectedValue = "") {
    const descriptionSelect = document.querySelector("#icsDescription");
    const searchInput = document.querySelector("#icsDescriptionSearch");
    const optionsList = document.querySelector("#icsOptionsList");

    const options = items
        .map((item) => {
            const description = getIcsAssetDescription(item);
            return {
                description,
                assetId: item.assetId,
                semiExpandableNo: item.semiExpandableNo || "",
                unitValue: item.unitValue ?? ""
            };
        })
        .filter((entry) => entry.description)
        .filter((entry, index, entries) => entries.findIndex((candidate) => candidate.description === entry.description) === index)
        .sort((first, second) => first.description.localeCompare(second.description, undefined, { sensitivity: "base" }));

    if (descriptionSelect) {
        descriptionSelect.innerHTML = '<option value="">Select an inventory item</option>';
        descriptionSelect.insertAdjacentHTML("beforeend", options.map((entry) => `
            <option value="${escapeHtml(entry.description)}" data-asset-id="${escapeHtml(entry.assetId)}">${escapeHtml(entry.description)}</option>
        `).join(""));

        if (selectedValue && options.some((entry) => entry.description === selectedValue)) {
            descriptionSelect.value = selectedValue;
        }
    }

    if (optionsList) {
        optionsList.innerHTML = options.map((entry) => `
            <div class="ics-option-item" data-value="${escapeHtml(entry.description)}" data-text="${escapeHtml(entry.description)}" data-asset-id="${escapeHtml(entry.assetId)}">
                <div class="ics-option-main">
                    <span class="ics-option-title">${escapeHtml(entry.description)}</span>
                    ${entry.semiExpandableNo ? `<span class="ics-option-subtitle">Item No: ${escapeHtml(entry.semiExpandableNo)}</span>` : ""}
                </div>
                ${entry.unitValue ? `<span class="ics-option-cost">${formatCurrency(entry.unitValue)}</span>` : ""}
            </div>
        `).join("");

        optionsList.querySelectorAll(".ics-option-item").forEach((itemEl) => {
            itemEl.addEventListener("mousedown", (e) => {
                e.preventDefault();
            });
            itemEl.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const desc = itemEl.dataset.value;
                const aid = itemEl.dataset.assetId;
                selectIcsDescriptionItem(desc, aid);
            });
        });
    }

    if (selectedValue && searchInput) {
        searchInput.value = selectedValue;
    }
}

function findAssetByIcsDescription(desc) {
    if (!desc) return null;
    const cleanDesc = String(desc).trim();
    return items.find((item) => getIcsAssetDescription(item).toLowerCase() === cleanDesc.toLowerCase())
        || items.find((item) => String(item.itemBrandModel || "").trim().toLowerCase() === cleanDesc.toLowerCase())
        || items.find((item) => {
            const withSn = `${String(item.itemBrandModel || "").trim()} - ${String(item.serialNo || "").trim()}`.toLowerCase();
            return withSn === cleanDesc.toLowerCase();
        });
}

function populateIcsFieldsFromDescription(selectedAssetOverride = null) {
    let selectedAsset = selectedAssetOverride;

    if (!selectedAsset) {
        const descriptionSelect = document.querySelector("#icsDescription");
        const selectedAssetId = descriptionSelect?.selectedOptions[0]?.dataset.assetId;
        if (selectedAssetId) {
            selectedAsset = items.find((item) => item.assetId === selectedAssetId);
        }
    }

    if (!selectedAsset) {
        const searchInput = document.querySelector("#icsDescriptionSearch");
        const currentVal = (searchInput?.value || document.querySelector("#icsDescription")?.value || "").trim();
        selectedAsset = findAssetByIcsDescription(currentVal);
    }

    const fundClusterEl = document.querySelector("#icsFundCluster");
    const inventoryItemNoEl = document.querySelector("#icsInventoryItemNo");
    const additionalItemEl = document.querySelector("#icsAdditionalItem");
    const unitEl = document.querySelector("#icsUnit");
    const unitCostEl = document.querySelector("#icsUnitCost");

    if (!selectedAsset) {
        // If no matching asset is selected/found, clear auto-filled read-only fields
        if (inventoryItemNoEl) inventoryItemNoEl.value = "";
        if (additionalItemEl) additionalItemEl.value = "";
        if (unitEl) unitEl.value = "";
        if (unitCostEl) unitCostEl.value = "";
        updateInventoryCustodianSlipTotal();
        return;
    }

    if (fundClusterEl && !fundClusterEl.value) fundClusterEl.value = selectedAsset.fundCluster || "";
    if (inventoryItemNoEl) inventoryItemNoEl.value = selectedAsset.semiExpandableNo || "";
    if (additionalItemEl) additionalItemEl.value = selectedAsset.additionalItem || "";
    if (unitEl) unitEl.value = selectedAsset.unitMeasurement || "";
    if (unitCostEl) unitCostEl.value = selectedAsset.unitValue ?? "";
    updateInventoryCustodianSlipTotal();
}

function getInventoryCustodianSlipFormData() {
    const value = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.value.trim() : "";
    };

    const descSearch = document.querySelector("#icsDescriptionSearch");
    const descSelect = document.querySelector("#icsDescription");
    const descriptionVal = (descSearch?.value || descSelect?.value || "").trim();

    return {
        id: document.querySelector("#icsEditingId").value || `ICS-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        entityName: value("#icsEntityName"),
        fundCluster: value("#icsFundCluster"),
        icsNo: value("#icsNo"),
        inventoryItemNo: value("#icsInventoryItemNo"),
        description: descriptionVal,
        additionalItem: value("#icsAdditionalItem"),
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
        receivedByDate: value("#icsReceivedByDate"),
        savedAt: new Date().toISOString()
    };
}

function renderInventoryCustodianSlipTable() {
    const table = document.querySelector("#icsSlipTable");
    if (!table) return;

    const query = (dom.icsSlipSearchInput ? dom.icsSlipSearchInput.value : "").trim().toLowerCase();

    // Filter across all searchable fields when a query is present
    const filteredSlips = query
        ? inventoryCustodianSlips.filter((slip) => {
            return [
                slip.description,
                slip.icsNo,
                slip.inventoryItemNo,
                slip.quantity,
                slip.unit,
                slip.receivedBy,
                slip.receivedFrom,
                slip.receivedByPosition,
                slip.receivedFromPosition,
                slip.entityName,
                slip.fundCluster,
                slip.additionalItem,
                slip.estimatedUsefulLife,
                slip.totalCost
            ].some((field) => String(field ?? "").toLowerCase().includes(query));
        })
        : inventoryCustodianSlips;

    const totalPages = Math.max(1, Math.ceil(filteredSlips.length / icsSlipPageSize));
    icsSlipPage = Math.min(Math.max(1, icsSlipPage), totalPages);
    const startIndex = (icsSlipPage - 1) * icsSlipPageSize;
    const visibleSlips = filteredSlips.slice(startIndex, startIndex + icsSlipPageSize);

    table.innerHTML = visibleSlips.length
        ? visibleSlips.map((slip) => `
            <tr>
                <td>${escapeHtml(slip.description)}</td>
                <td>${escapeHtml(slip.icsNo)}</td>
                <td>${escapeHtml(slip.inventoryItemNo || "-")}</td>
                <td>${escapeHtml(slip.quantity ?? "-")}</td>
                <td>${escapeHtml(slip.unit || "-")}</td>
                <td>${escapeHtml(slip.receivedBy || "-")}</td>
                <td>${escapeHtml(formatPeso(Number(slip.totalCost) || 0))}</td>
                <td>
                    <div class="row-actions">
                        ${findAssetForInventoryCustodianSlip(slip) ? `<button type="button" data-ics-action="qr" data-ics-id="${escapeHtml(slip.id)}">QR</button>` : ""}
                        <button type="button" data-ics-action="open" data-ics-id="${escapeHtml(slip.id)}">Open</button>
                        <button type="button" data-ics-action="edit" data-ics-id="${escapeHtml(slip.id)}">Edit</button>
                        <button type="button" data-ics-action="delete" data-ics-id="${escapeHtml(slip.id)}">Delete</button>
                    </div>
                </td>
            </tr>
        `).join("")
        : `<tr><td colspan="8">${query ? `No records matched "<strong>${escapeHtml(query)}</strong>".` : "No Inventory Custodian Slip records yet."}</td></tr>`;

    if (dom.icsSlipPagination) {
        dom.icsSlipPagination.innerHTML = filteredSlips.length > icsSlipPageSize ? `
            <button class="inventory-page-btn" type="button" data-ics-slip-page="${Math.max(1, icsSlipPage - 1)}" ${icsSlipPage === 1 ? "disabled" : ""}>Previous</button>
            <span class="inventory-page-status">Page ${icsSlipPage} of ${totalPages}${query ? ` (${filteredSlips.length} result${filteredSlips.length !== 1 ? "s" : ""})` : ""}</span>
            <button class="inventory-page-btn" type="button" data-ics-slip-page="${Math.min(totalPages, icsSlipPage + 1)}" ${icsSlipPage === totalPages ? "disabled" : ""}>Next</button>
        ` : "";
    }
}

function findAssetForInventoryCustodianSlip(slip) {
    const legacyDescription = String(slip.description || "").replace(/\s+-\s+SN:\s*/i, " - ").trim();
    return items.find((asset) => getIcsAssetDescription(asset) === slip.description)
        || items.find((asset) => `${String(asset.itemBrandModel || "").trim()} - ${String(asset.serialNo || "").trim()}` === legacyDescription)
        || items.find((asset) => asset.semiExpandableNo && asset.semiExpandableNo === slip.inventoryItemNo);
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
        icsAdditionalItem: "additionalItem",
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
        const el = document.querySelector(`#${elementId}`);
        if (!el) return;
        const val = slip[property] || "";
        if (elementId === "icsDescription" && val && !Array.from(el.options).some((opt) => opt.value === val)) {
            const opt = document.createElement("option");
            opt.value = val;
            opt.textContent = val;
            el.appendChild(opt);
        }
        if ((elementId === "icsReceivedFrom" || elementId === "icsReceivedBy") && val) {
            const hasOption = Array.from(el.options).some((opt) => opt.value === val);
            if (!hasOption) {
                const opt = document.createElement("option");
                opt.value = val;
                opt.textContent = val;
                el.appendChild(opt);
            }
        }
        el.value = val;
    });

    const searchInput = document.querySelector("#icsDescriptionSearch");
    if (searchInput) {
        searchInput.value = slip.description || "";
        filterIcsDropdownOptions(slip.description || "");
    }

    document.querySelector("#icsFormTitle").textContent = "Edit Inventory Custodian Slip";
    showModule("document");
}

async function initInventoryCustodianSlipCrud() {
    const form = document.querySelector("#icsSlipForm");
    const table = document.querySelector("#icsSlipTable");
    if (!form || !table) return;

    populateIcsDescriptionDropdown();

    const descriptionSelect = document.querySelector("#icsDescription");
    const descriptionSearchInput = document.querySelector("#icsDescriptionSearch");
    const dropdownToggleBtn = document.querySelector("#icsDropdownToggleBtn");
    const searchableContainer = document.querySelector("#icsSearchableSelect");

    if (descriptionSearchInput) {
        descriptionSearchInput.addEventListener("input", () => {
            const val = descriptionSearchInput.value;
            filterIcsDropdownOptions(val);
            openIcsDropdownMenu();

            if (descriptionSelect) {
                const trimmed = val.trim();
                if (trimmed && !Array.from(descriptionSelect.options).some(opt => opt.value === trimmed)) {
                    const opt = document.createElement("option");
                    opt.value = trimmed;
                    opt.textContent = trimmed;
                    descriptionSelect.appendChild(opt);
                }
                descriptionSelect.value = trimmed;
            }
            populateIcsFieldsFromDescription();
        });

        descriptionSearchInput.addEventListener("focus", () => {
            if (isSelectingIcsOption) return;
            filterIcsDropdownOptions(descriptionSearchInput.value);
            openIcsDropdownMenu();
        });

        descriptionSearchInput.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeIcsDropdownMenu();
            } else if (e.key === "ArrowDown") {
                openIcsDropdownMenu();
                const firstVisible = document.querySelector(".ics-option-item[style*='display: flex']");
                if (firstVisible) firstVisible.focus();
            }
        });
    }

    if (dropdownToggleBtn) {
        dropdownToggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleIcsDropdownMenu();
            if (descriptionSearchInput) {
                descriptionSearchInput.focus();
            }
        });
    }

    document.addEventListener("click", (e) => {
        if (searchableContainer && !searchableContainer.contains(e.target)) {
            closeIcsDropdownMenu();
        }
    });

    populateIcsReceivedFromDropdown();
    populateIcsReceivedByDropdown();
    inventoryCustodianSlips = loadInventoryCustodianSlips();
    renderIcsGeneratedCount();
    renderInventoryCustodianSlipTable();
    renderRecentAssets();

    try {
        if (await loadInventoryCustodianSlipsFromDatabase()) {
            renderIcsGeneratedCount();
            renderInventoryCustodianSlipTable();
            renderRecentAssets();
        }
    } catch (error) {
        console.error(error);
        showToast("ICS database unavailable. Using local saved slips.");
    }

    const receivedFromSelect = document.querySelector("#icsReceivedFrom");
    if (receivedFromSelect) {
        receivedFromSelect.addEventListener("change", () => {
            const selectedName = receivedFromSelect.value.trim();
            const positionInput = document.querySelector("#icsReceivedFromPosition");
            if (!positionInput) return;
            const matched = signatoryEntries.find((entry) => entry.name.toLowerCase() === selectedName.toLowerCase());
            if (matched && matched.position) {
                positionInput.value = matched.position;
            } else if (!selectedName) {
                positionInput.value = "";
            }
        });
    }

    const receivedBySelect = document.querySelector("#icsReceivedBy");
    if (receivedBySelect) {
        receivedBySelect.addEventListener("change", () => {
            const selectedName = receivedBySelect.value.trim();
            const positionInput = document.querySelector("#icsReceivedByPosition");
            if (!positionInput) return;
            const matchedTeacher = teacherOptions.find((entry) => entry.name.toLowerCase() === selectedName.toLowerCase());
            const matchedSignatory = signatoryEntries.find((entry) => entry.name.toLowerCase() === selectedName.toLowerCase());
            const matchedPosition = (matchedTeacher && matchedTeacher.position) || (matchedSignatory && matchedSignatory.position) || "";
            if (matchedPosition) {
                positionInput.value = matchedPosition;
            } else if (!selectedName) {
                positionInput.value = "";
            }
        });
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
            renderIcsGeneratedCount();
            renderInventoryCustodianSlipTable();
            renderRecentAssets();
            resetInventoryCustodianSlipForm();
        } catch (error) {
            console.error(error);
            setDatabaseStatus("Local fallback is active.", "The backend could not receive the latest change.");
        }

        showSuccessModal(
            action === "update" ? "ICS record updated successfully!" : "ICS record saved successfully!",
            "Success"
        );
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

        if (button.dataset.icsAction === "qr") {
            const asset = findAssetForInventoryCustodianSlip(slip);
            if (!asset) {
                showToast("The asset for this ICS item could not be found.");
                return;
            }

            selectedId = asset.assetId;
            renderQr();
            showModule("qr");
            showToast("QR preview updated.");
            return;
        }

        if (button.dataset.icsAction === "edit") {
            editInventoryCustodianSlip(slip.id);
            return;
        }

        if (button.dataset.icsAction === "delete") {
            const confirmed = await showConfirmDialog({
                title: "Delete Document",
                message: `Are you sure you want to delete the Inventory Custodian Slip for "${slip.description || slip.icsNo || 'this item'}" (${slip.icsNo})? This action cannot be undone.`,
                confirmText: "Delete",
                cancelText: "Cancel"
            });
            if (!confirmed) return;

            const targetId = slip.id;

            // Immediately remove from local state and refresh UI
            inventoryCustodianSlips = inventoryCustodianSlips.filter((entry) => String(entry.id) !== String(targetId));
            saveInventoryCustodianSlips();
            renderIcsGeneratedCount();
            renderInventoryCustodianSlipTable();
            renderRecentAssets();

            // Reset the form if the deleted slip was currently active in edit mode
            const editingIdEl = document.querySelector("#icsEditingId");
            if (editingIdEl && String(editingIdEl.value) === String(targetId)) {
                resetInventoryCustodianSlipForm();
            }

            showToast("Inventory Custodian Slip deleted.");

            // Sync deletion to Supabase asynchronously if remote database is active
            if (hasInventoryCustodianSlipRemoteDatabase() && (slip.dbSlipId || slip.dbItemId)) {
                try {
                    await deleteInventoryCustodianSlipFromDatabase(slip);
                    await loadInventoryCustodianSlipsFromDatabase();
                    renderIcsGeneratedCount();
                    renderInventoryCustodianSlipTable();
                    renderRecentAssets();
                } catch (error) {
                    console.error("Remote database deletion error:", error);
                    // Local deletion is safely preserved
                }
            }
            return;
        }
    });
}

initInventoryCustodianSlipCrud();
async function openInventoryCustodianSlipPdf(slip) {
    const JsPdf = window.jspdf && window.jspdf.jsPDF;
    if (!JsPdf) {
        showToast("PDF generation library is unavailable.");
        return;
    }

    const slipItems = inventoryCustodianSlips
        .filter((entry) => slip.dbSlipId ? entry.dbSlipId === slip.dbSlipId : entry.icsNo === slip.icsNo)
        .sort((first, second) => Number(first.lineNo || 0) - Number(second.lineNo || 0));
    if (!slipItems.length) {
        showToast("No ICS items are available for this document.");
        return;
    }

    const pdf = new JsPdf({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = 210;
    const pageHeight = 297;
    const marginX = 13; // left & right margin in mm  ← change this to adjust left/right margins
    const marginY = 8;  // top margin in mm            ← change this to adjust top margin

    // ── Font sizes (pt) ─────────────────────────────────────────────────────
    const fontTitle         = 16; // "INVENTORY CUSTODIAN SLIP" heading
    const fontMeta          = 11; // Entity Name / Fund Cluster / ICS No. lines
    const fontTableHeader   =  10; // column header labels inside the table
    const fontTableCell     =  10; // data rows inside the table  ← change this to resize cell text
    const fontSignature     = 11; // "Received from / by" labels
    const fontSignatureNote =  11; // name / position / date lines under signatures
    // ────────────────────────────────────────────────────────────────────────

    // Column ratios follow the uploaded ICS.xlsx template (A:H), including its merged Description field.
    const columns = [14, 13, 22, 22, 68, 30, 20];
    const formatAmount = (value) => `${Number(value || 0).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const headerSlip = slipItems[0];
    const tableStartY = 55;
    const tableBottomY = 167;
    let y = marginY;



    const loadSeal = () => new Promise((resolve) => {
        const seal = new Image();
        seal.onload = () => resolve(seal);
        seal.onerror = () => resolve(null);
        seal.src = "images/deped_logo.png";
    });
    const seal = await loadSeal();

    const drawDocumentHeading = () => {
        // Logo — centered horizontally above the title
        if (seal) pdf.addImage(seal, "PNG", pageWidth / 2 - 9.5, y, 19, 19);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(fontTitle);
        // Title sits just below the logo (logo height 19 + 3 mm gap)
        pdf.text("INVENTORY CUSTODIAN SLIP", pageWidth / 2, y + 24, { align: "center" });
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(fontMeta);
        pdf.text("Entity Name:", marginX, y + 36);
        pdf.text(String(headerSlip.entityName || "-"), marginX + 25, y + 36);
        pdf.text("Fund Cluster:", marginX, y + 44);
        pdf.text(String(headerSlip.fundCluster || "-"), marginX + 25, y + 44);
        pdf.text("ICS No.:", pageWidth - marginX - 46, y + 44);
        pdf.text(String(headerSlip.icsNo || "-"), pageWidth - marginX, y + 44, { align: "right" });
        y = tableStartY;
    };

    const drawTableHeader = () => {
        let x = marginX;
        const headerHeight = 14;
        const subHeaderHeight = 8;
        const fullHeight = headerHeight + subHeaderHeight;
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(fontTableHeader);
        [["Quantity", columns[0]], ["Unit", columns[1]]].forEach(([label, width]) => {
            pdf.rect(x, y, width, fullHeight);
            pdf.text(label, x + width / 2, y + fullHeight / 2 + 1.5, { align: "center" });
            x += width;
        });
        pdf.rect(x, y, columns[2] + columns[3], headerHeight);
        pdf.text("Amount", x + (columns[2] + columns[3]) / 2, y + 5.5, { align: "center" });
        pdf.rect(x, y + headerHeight, columns[2], subHeaderHeight);
        pdf.text("Unit Cost", x + columns[2] / 2, y + headerHeight + 5, { align: "center" });
        x += columns[2];
        pdf.rect(x, y + headerHeight, columns[3], subHeaderHeight);
        pdf.text("Total Cost", x + columns[3] / 2, y + headerHeight + 5, { align: "center" });
        x += columns[3];
        [["Description", columns[4]], ["Inventory Item No.", columns[5]], ["Estimated Useful Life", columns[6]]].forEach(([label, width]) => {
            pdf.rect(x, y, width, fullHeight);
            pdf.text(pdf.splitTextToSize(label, width - 3), x + width / 2, y + fullHeight / 2 - 1, { align: "center" });
            x += width;
        });
        pdf.setFont("helvetica", "normal");
        y += fullHeight;
    };

    drawDocumentHeading();
    drawTableHeader();

    const tableRows = [];
    slipItems.forEach((item) => {
        const matchedAsset = (typeof items !== "undefined" && Array.isArray(items))
            ? items.find((a) =>
                (a.propertyNo && a.propertyNo === item.inventoryItemNo) ||
                (a.semiExpandableNo && a.semiExpandableNo === item.inventoryItemNo) ||
                (a.assetId && a.assetId === item.inventoryItemNo)
            )
            : null;
        const dateAcquired = item.acquisitionDate || (matchedAsset && matchedAsset.acquisitionDate) || item.receivedFromDate || "";

        // First row: main item details
        tableRows.push([
            item.quantity ?? "",
            item.unit || "",
            formatAmount(item.unitCost),
            formatAmount(item.totalCost),
            item.description || "-",
            item.inventoryItemNo || "",
            item.estimatedUsefulLife || "-"
        ]);

        // Next row: Date Acquired row under description
        if (dateAcquired) {
            tableRows.push([
                "",
                "",
                "",
                "",
                `Date Acquired: ${dateAcquired}`,
                "",
                ""
            ]);
        }
    });

    // Limit table to exactly 10 rows
    const maxTableRows = 10;
    const finalRows = tableRows.slice(0, maxTableRows);
    while (finalRows.length < maxTableRows) {
        finalRows.push(["", "", "", "", "", "", ""]);
    }

    finalRows.forEach((rowValues) => {
        const wrappedValues = rowValues.map((value, index) => pdf.splitTextToSize(String(value || ""), columns[index] - 3));
        const rowHeight = Math.max(7, ...wrappedValues.map((lines) => lines.length * 3.6 + 3));

        let x = marginX;
        pdf.setFontSize(fontTableCell);
        wrappedValues.forEach((lines, index) => {
            pdf.rect(x, y, columns[index], rowHeight);
            if (lines && lines.length > 0 && lines[0] !== "") {
                if (index === 0 || index === 1) {
                    // Align center for Quantity and Unit
                    pdf.text(lines, x + columns[index] / 2, y + 4.2, { align: "center" });
                } else if (index === 2 || index === 3 || index === 5) {
                    // Align right for Unit Cost, Total Cost, and Inventory Item No.
                    pdf.text(lines, x + columns[index] - 1.5, y + 4.2, { align: "right" });
                } else if (index === 6) {
                    // Align center for Estimated Useful Life
                    pdf.text(lines, x + columns[index] / 2, y + 4.2, { align: "center" });
                } else {
                    // Align left for Description
                    pdf.text(lines, x + 1.5, y + 4.2);
                }
            }
            x += columns[index];
        });
        y += rowHeight;
    });

    // Dynamically position signature section directly below the table
    y += 8;

    const signatureWidth = (pageWidth - marginX * 2) / 2 - 4;
    const rightSignatureX = pageWidth - marginX - signatureWidth;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(fontSignature);
    pdf.text("Received from:", marginX, y);
    pdf.text("Received by:", rightSignatureX, y);
    y += 16;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(fontSignatureNote);
    pdf.text(headerSlip.receivedFrom || "Signature over printed name", marginX + signatureWidth / 2, y + 4, { align: "center" });
    pdf.text(headerSlip.receivedBy || "Signature over printed name", rightSignatureX + signatureWidth / 2, y + 4, { align: "center" });
    y += 9.5;
    pdf.setFont("helvetica", "normal");
    pdf.text(headerSlip.receivedFromPosition || "Position/Office", marginX + signatureWidth / 2, y, { align: "center" });
    pdf.text(headerSlip.receivedByPosition || "Position/Office", rightSignatureX + signatureWidth / 2, y, { align: "center" });
    y += 5;
    pdf.text(`Date: ${headerSlip.receivedFromDate || "-"}`, marginX + signatureWidth / 2, y, { align: "center" });
    pdf.text(`Date: ${headerSlip.receivedByDate || "-"}`, rightSignatureX + signatureWidth / 2, y, { align: "center" });

    const fileName = `ICS-${String(headerSlip.icsNo || "document").replace(/[<>:"/\\|?*]+/g, "-")}.pdf`;
    const pdfUrl = URL.createObjectURL(pdf.output("blob"));
    const preview = window.open(pdfUrl, "_blank");
    if (!preview) {
        showToast("Please allow popups to generate the ICS PDF.");
        return;
    }
}

