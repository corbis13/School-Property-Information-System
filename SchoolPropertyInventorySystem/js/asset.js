// School Property Information System - Asset Detail Inspector
const supabaseUrl = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url) || "https://ouqgkytallctnptshefo.supabase.co";
const supabaseAnonKey = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.anonKey) || "sb_publishable_UDhp6lrRgVppuqH6Uu4Izg_zp7T-_WS";
const propertyImageBucket = "property-images";
let activePhotoAssetId = "";
let photoLoadRequestId = 0;
const supabaseHeaders = {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`
};

function parseQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name) || "";
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function formatPeso(value) {
    if (value === "" || value === null || value === undefined) return "₱0.00";
    const num = Number(String(value).replace(/[^0-9.-]/g, ""));
    if (!Number.isFinite(num)) return String(value);
    return "₱" + num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function showToast(text) {
    const toast = document.getElementById("assetToast");
    if (!toast) return;
    toast.textContent = text;
    toast.style.display = "block";
    setTimeout(() => {
        toast.style.display = "none";
    }, 2400);
}

function getStatusBadgeClass(status) {
    const s = String(status || "").toLowerCase().trim();
    if (s === "available" || s === "serviceable") return "status-available";
    if (s === "assigned" || s === "in use" || s === "issued") return "status-assigned";
    if (s.includes("repair") || s.includes("maintenance")) return "status-repair";
    if (s.includes("unserviceable") || s.includes("damaged")) return "status-unserviceable";
    if (s.includes("disposed") || s.includes("condemned")) return "status-disposed";
    return "status-unspecified";
}

function getAssetDetailUrl(assetId) {
    const configuredUrl = (window.SUPABASE_CONFIG && String(window.SUPABASE_CONFIG.assetUrl || "").trim()) || "";
    const safeId = encodeURIComponent(String(assetId || "UNKNOWN").trim());
    const query = `?assetId=${safeId}`;

    // If a valid absolute URL is configured that is not localhost / loopback
    if (configuredUrl && /^https?:\/\//i.test(configuredUrl) && !/localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(configuredUrl)) {
        return `${configuredUrl.replace(/\/+$|\?+$/g, "")}${query}`;
    }

    // If current origin is a public non-localhost domain (e.g. GitHub Pages or custom domain)
    if (typeof window !== "undefined" && window.location && window.location.origin) {
        const origin = window.location.origin;
        if (!/localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(origin)) {
            return `${origin}/SchoolPropertyInventorySystem/asset.html${query}`;
        }
    }

    // Default to the publicly accessible GitHub Pages URL so mobile cameras anywhere can open it
    return `https://corbis13.github.io/School-Property-Information-System/SchoolPropertyInventorySystem/asset.html${query}`;
}

function renderQrCode(item) {
    const qrContainer = document.getElementById("assetQrCodeCanvas");
    if (!qrContainer) return;
    qrContainer.innerHTML = "";

    const payload = getAssetDetailUrl(item.assetId);

    if (window.QRCode) {
        new QRCode(qrContainer, {
            text: payload,
            width: 130,
            height: 130,
            colorDark: "#00284d",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
        });
    } else {
        qrContainer.innerHTML = `<span style="font-size: 11px; color: #64748b;">${escapeHtml(item.propertyNo || item.assetId)}</span>`;
    }
}

function getPropertyImageUrl(filePath) {
    const encodedPath = String(filePath || "").split("/").map(encodeURIComponent).join("/");
    return `${supabaseUrl}/storage/v1/object/public/${propertyImageBucket}/${encodedPath}`;
}

async function loadAssetPhotos(assetId) {
    const normalizedAssetId = String(assetId || "").trim();
    const status = document.getElementById("assetPhotosStatus");
    const gallery = document.getElementById("assetPhotosGallery");
    if (!status || !gallery) return;

    activePhotoAssetId = normalizedAssetId;
    const requestId = ++photoLoadRequestId;
    gallery.replaceChildren();
    status.classList.remove("is-error");
    status.textContent = "Loading property photos...";

    if (!normalizedAssetId) {
        status.textContent = "No asset ID is available to load photos.";
        return;
    }

    try {
        const query = new URLSearchParams({
            select: "file_path,is_primary",
            asset_id: `eq.${normalizedAssetId}`,
            order: "is_primary.desc,created_at.asc"
        });
        const response = await fetch(`${supabaseUrl}/rest/v1/asset_images?${query}`, {
            headers: { ...supabaseHeaders, Accept: "application/json" }
        });
        if (!response.ok) {
            const details = await response.text();
            if (response.status === 404 && details.includes("PGRST205")) {
                throw new Error("Photo metadata is not set up yet. Run the updated supabase-setup.sql file.");
            }
            throw new Error(`Unable to load photos (HTTP ${response.status}).`);
        }

        const images = await response.json();
        if (activePhotoAssetId !== normalizedAssetId || requestId !== photoLoadRequestId) return;
        if (!images.length) {
            status.textContent = "No photos have been added to this property.";
            return;
        }

        for (const image of images) {
            const url = getPropertyImageUrl(image.file_path);
            const button = document.createElement("button");
            button.className = "asset-photo-thumbnail";
            button.type = "button";
            button.dataset.photoUrl = url;
            button.dataset.photoAlt = image.is_primary ? "Primary property photo" : "Property photo";
            button.setAttribute("aria-label", image.is_primary ? "View primary property photo" : "View property photo");

            const thumbnail = document.createElement("img");
            thumbnail.src = url;
            thumbnail.alt = "";
            thumbnail.loading = "lazy";
            button.appendChild(thumbnail);

            if (image.is_primary) {
                const badge = document.createElement("span");
                badge.className = "asset-photo-primary-badge";
                badge.textContent = "Primary";
                button.appendChild(badge);
            }

            gallery.appendChild(button);
        }
        status.textContent = `${images.length} ${images.length === 1 ? "photo" : "photos"} for this property. Select a thumbnail to view full size.`;
    } catch (error) {
        console.error("Unable to load property photos:", error);
        if (activePhotoAssetId === normalizedAssetId && requestId === photoLoadRequestId) {
            status.textContent = error.message || "Could not load property photos.";
            status.classList.add("is-error");
        }
    }
}

function renderAsset(item) {
    document.title = `${item.itemBrandModel || item.propertyNo || item.assetId} | Asset Detail - SPIS`;

    // Hero Section
    const heroTitle = document.getElementById("heroBrandModel");
    if (heroTitle) heroTitle.textContent = item.itemBrandModel || item.propertyNo || "Unnamed Property Asset";

    const heroInventoryType = document.getElementById("heroInventoryType");
    if (heroInventoryType) heroInventoryType.textContent = item.inventoryType || item.itemClassification || "Property Item";

    const heroFundCluster = document.getElementById("heroFundCluster");
    if (heroFundCluster) heroFundCluster.textContent = item.fundCluster || item.fund_cluster || "Central Office Fund";

    const heroPropertyNo = document.getElementById("heroPropertyNo");
    if (heroPropertyNo) heroPropertyNo.textContent = item.propertyNo || "N/A";

    const heroAssetId = document.getElementById("heroAssetId");
    if (heroAssetId) heroAssetId.textContent = item.assetId || "N/A";

    const heroSerialNo = document.getElementById("heroSerialNo");
    if (heroSerialNo) heroSerialNo.textContent = item.serialNo || "N/A";

    const heroAccountable = document.getElementById("heroAccountable");
    if (heroAccountable) heroAccountable.textContent = item.accountable || item.accountablePerson || "Unassigned";

    const heroSchoolLevel = document.getElementById("heroSchoolLevel");
    if (heroSchoolLevel) heroSchoolLevel.textContent = item.schoolLevel || item.schoollevel || "General";

    const heroLocation = document.getElementById("heroLocation");
    if (heroLocation) heroLocation.textContent = item.location || "Unspecified Location";

    const heroDateIssue = document.getElementById("heroDateIssue");
    if (heroDateIssue) heroDateIssue.textContent = item.dateIssue || item.date_issue || "Not Recorded";

    const heroTotalValue = document.getElementById("heroTotalValue");
    if (heroTotalValue) heroTotalValue.textContent = formatPeso(item.total || (item.unitValue ? item.unitValue : 0));

    // Status Badge
    const heroStatusBadge = document.getElementById("heroStatusBadge");
    const heroStatusText = document.getElementById("heroStatusText");
    const statusVal = item.status || "Available";
    if (heroStatusText) heroStatusText.textContent = statusVal;
    if (heroStatusBadge) {
        heroStatusBadge.className = `status-badge ${getStatusBadgeClass(statusVal)}`;
    }

    // Embedded QR Code
    renderQrCode(item);

    // Section 1: Property Identification
    const setField = (id, val, fallback = "--") => {
        const el = document.getElementById(id);
        if (el) el.textContent = (val !== null && val !== undefined && String(val).trim() !== "") ? String(val) : fallback;
    };

    setField("fieldAssetId", item.assetId);
    setField("fieldPropertyNo", item.propertyNo);
    setField("fieldSemiExpendableNo", item.semiExpandableNo);
    setField("fieldInventoryType", item.inventoryType);
    setField("fieldClassification", item.itemClassification);
    setField("fieldBrandModel", item.itemBrandModel);
    setField("fieldSerialNo", item.serialNo);

    // Section 2: Custody & Location
    setField("fieldAccountable", item.accountable || item.accountablePerson, "Unassigned");
    setField("fieldSchoolLevel", item.schoolLevel || item.schoollevel, "General");
    setField("fieldLocation", item.location, "Unspecified");
    setField("fieldDateIssue", item.dateIssue || item.date_issue, "Not Recorded");

    // Section 3: Acquisition & Valuation
    setField("fieldAcquisitionDate", item.acquisitionDate || item.acquisition_date, "Not Recorded");
    setField("fieldFundCluster", item.fundCluster || item.fund_cluster, "General Fund (01)");
    setField("fieldUnitMeasurement", item.unitMeasurement || item.unit_measurement, "Unit / Piece");
    setField("fieldUnitValue", formatPeso(item.unitValue || item.unit_value));
    setField("fieldTotal", formatPeso(item.total));
    const mooeParts = [item.mooeMonth || item.mooe_month, item.mooeYear || item.mooe_year].filter(Boolean);
    setField("fieldMooePeriod", mooeParts.length ? mooeParts.join(" ") : "N/A");

    // Section 4: Inventory Count & Condition
    const statusTag = document.getElementById("fieldStatus");
    if (statusTag) {
        statusTag.textContent = statusVal;
        statusTag.className = `status-tag ${getStatusBadgeClass(statusVal)}`;
    }
    setField("fieldOnHand", item.onHand ?? item.on_hand);
    setField("fieldBalance", item.balance);
    setField("fieldShortageOverageQty", item.shortageOverageQty ?? item.shortage_overage_qty);
    setField("fieldShortageOverageValue", item.shortageOverageValue ? formatPeso(item.shortageOverageValue) : "--");
    setField("fieldRemarks", item.remarks, "No remarks provided.");
    loadAssetPhotos(item.assetId);

    // Re-render Lucide icons
    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}

function renderError(message) {
    const heroTitle = document.getElementById("heroBrandModel");
    if (heroTitle) heroTitle.textContent = "Asset Record Not Found";

    const alertEl = document.getElementById("statusAlert");
    if (alertEl) {
        alertEl.textContent = message;
        alertEl.style.display = "block";
    }

    const grid = document.querySelector(".asset-details-grid");
    if (grid) grid.style.opacity = "0.4";
}

function findLocalAsset(assetId) {
    const needle = String(assetId || "").trim().toLowerCase();
    if (!needle) return null;

    // Check opener first if available
    try {
        if (window.opener && Array.isArray(window.opener.items)) {
            const found = window.opener.items.find(
                (i) => String(i.assetId || "").trim().toLowerCase() === needle ||
                       String(i.propertyNo || "").trim().toLowerCase() === needle
            );
            if (found) return found;
        }
    } catch {
        // cross-origin opener access blocked
    }

    // Check localStorage items keys
    const storageKeys = ["propertyInventoryItems", "spis_inventory_items"];
    for (const key of storageKeys) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) continue;
            const list = JSON.parse(raw);
            if (Array.isArray(list)) {
                const found = list.find(
                    (i) => String(i.assetId || "").trim().toLowerCase() === needle ||
                           String(i.propertyNo || "").trim().toLowerCase() === needle
                );
                if (found) return found;
            }
        } catch {
            // parse error
        }
    }

    return null;
}

async function loadAsset() {
    const assetId = String(parseQueryParam("assetId") || "").trim();

    if (!assetId) {
        renderError("No Asset ID was specified in the URL. Please provide ?assetId=ASTXXXXXX to inspect an inventory record.");
        return;
    }

    // Step 1: Check instant local fallback
    const localItem = findLocalAsset(assetId);
    if (localItem) {
        renderAsset(localItem);
    }

    // Step 2: Fetch latest from Supabase if configured
    if (!supabaseUrl || !supabaseAnonKey) {
        if (!localItem) {
            renderError("Database credentials not configured and item was not found in local cache.");
        }
        return;
    }

    try {
        const queryUrl = `${supabaseUrl}/rest/v1/assets?select=*&or=(asset_id.eq.${encodeURIComponent(assetId)},property_no.eq.${encodeURIComponent(assetId)})&limit=1`;
        const response = await fetch(queryUrl, {
            headers: {
                ...supabaseHeaders,
                Accept: "application/json"
            }
        });

        if (response.ok) {
            const rows = await response.json();
            const remoteItem = rows && rows[0];
            if (remoteItem) {
                renderAsset({
                    assetId: remoteItem.asset_id || remoteItem.assetId || assetId,
                    fundCluster: remoteItem.fund_cluster || remoteItem.fundCluster || "",
                    inventoryType: remoteItem.inventory_type || remoteItem.inventoryType || "",
                    propertyNo: remoteItem.property_no || remoteItem.propertyNo || "",
                    itemClassification: remoteItem.item_classification || remoteItem.itemClassification || "",
                    itemBrandModel: remoteItem.item_brand_model || remoteItem.itemBrandModel || "",
                    serialNo: remoteItem.serial_no || remoteItem.serialNo || "",
                    acquisitionDate: remoteItem.acquisition_date || remoteItem.acquisitionDate || "",
                    accountable: remoteItem.accountable_person || remoteItem.accountable || "",
                    schoolLevel: remoteItem.school_level || remoteItem.schoolLevel || "",
                    semiExpandableNo: remoteItem.semi_expandable_no || remoteItem.semiExpandableNo || "",
                    unitValue: remoteItem.unit_value ?? remoteItem.unitValue ?? "",
                    total: remoteItem.total ?? "",
                    unitMeasurement: remoteItem.unit_measurement || remoteItem.unitMeasurement || "",
                    balance: remoteItem.balance ?? "",
                    onHand: remoteItem.on_hand ?? remoteItem.onHand ?? "",
                    shortageOverageQty: remoteItem.shortage_overage_qty ?? remoteItem.shortageOverageQty ?? "",
                    shortageOverageValue: remoteItem.shortage_overage_value ?? remoteItem.shortageOverageValue ?? "",
                    location: remoteItem.location || "",
                    mooeMonth: remoteItem.mooe_month ?? remoteItem.mooeMonth ?? "",
                    mooeYear: remoteItem.mooe_year ?? remoteItem.mooeYear ?? "",
                    dateIssue: remoteItem.date_issue || remoteItem.dateIssue || "",
                    status: remoteItem.status || "",
                    remarks: remoteItem.remarks || ""
                });
                return;
            }
        }

        if (!localItem) {
            renderError(`Asset record "${assetId}" was not found in the inventory database.`);
        }
    } catch (err) {
        console.warn("Could not retrieve remote asset:", err);
        if (!localItem) {
            renderError(`Unable to reach the property database for Asset ID: ${assetId}. Check your connection and try again.`);
        }
    }
}

function initEventHandlers() {
    const gallery = document.getElementById("assetPhotosGallery");
    const photoDialog = document.getElementById("assetPhotoDialog");
    const dialogImage = document.getElementById("assetPhotoDialogImage");
    const closePhotoDialog = () => {
        if (photoDialog && photoDialog.open) photoDialog.close();
    };

    if (gallery && photoDialog && dialogImage) {
        gallery.addEventListener("click", (event) => {
            const thumbnailButton = event.target.closest("button[data-photo-url]");
            if (!thumbnailButton) return;

            dialogImage.src = thumbnailButton.dataset.photoUrl || "";
            dialogImage.alt = thumbnailButton.dataset.photoAlt || "Property photo";
            photoDialog.showModal();
        });

        const closeButton = document.getElementById("assetPhotoDialogClose");
        if (closeButton) closeButton.addEventListener("click", closePhotoDialog);
        photoDialog.addEventListener("click", (event) => {
            if (event.target === photoDialog) closePhotoDialog();
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && photoDialog.open) {
                event.preventDefault();
                closePhotoDialog();
            }
        });
        photoDialog.addEventListener("close", () => {
            dialogImage.removeAttribute("src");
            dialogImage.alt = "";
        });
    }

    // Back Button / Close Window
    const backBtn = document.getElementById("backBtn") || document.getElementById("closeWindowBtn");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            if (window.opener) {
                window.close();
            } else if (window.history.length > 1 && document.referrer) {
                window.history.back();
            } else {
                window.location.href = "index.html";
            }
        });
    }

    // Copy Asset ID
    const copyBtn = document.getElementById("copyAssetIdBtn");
    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            const assetId = document.getElementById("fieldAssetId")?.textContent || parseQueryParam("assetId");
            if (assetId && assetId !== "--") {
                navigator.clipboard.writeText(assetId)
                    .then(() => showToast(`Copied ${assetId} to clipboard!`))
                    .catch(() => showToast(`Asset ID: ${assetId}`));
            }
        });
    }

    // Initialize Lucide icons on load
    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    initEventHandlers();
    loadAsset();
});
