const colors = ["#0284c7", "#f29913", "#449e38", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899", "#64748b"];
let allRawAssets = [];
let allMaintenanceAssets = [];
let filteredAssets = [];
const pageSize = 10;
let currentPage = 1;

const cardsContainer = document.getElementById("maintenanceCardsGrid") ||
                       document.getElementById("maintenanceBreakdownChart") ||
                       document.getElementById("maintenanceRecordsList");
const statusFilter = document.getElementById("statusFilter");
const previousPage = document.getElementById("previousPage");
const nextPage = document.getElementById("nextPage");
const pageStatus = document.getElementById("pageStatus");
const totalRequestsElem = document.getElementById("totalRequests");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getSupabaseConfig() {
  const cfg = (typeof window !== "undefined" && window.SUPABASE_CONFIG) || {};
  return {
    url: cfg.url || "https://ouqgkytallctnptshefo.supabase.co",
    anonKey: cfg.anonKey || "sb_publishable_UDhp6lrRgVppuqH6Uu4Izg_zp7T-_WS"
  };
}

function normalizeStatus(status) {
  const value = String(status || "").trim();
  if (!value) return "Unspecified";
  const lower = value.toLowerCase();
  if (lower === "under repair") return "Under Repair";
  if (lower === "for repair" || lower === "repair") return "For Repair";
  if (lower === "maintenance" || lower === "under maintenance") return "Maintenance";
  if (lower === "unserviceable" || lower === "unserviciable") return "Unserviceable";
  return value;
}

function isMaintenanceItem(item) {
  if (!item) return false;
  const status = normalizeStatus(item.status || item.Status || "");
  const lower = status.toLowerCase();
  return lower === "under repair" ||
         lower === "for repair" ||
         lower === "maintenance" ||
         lower === "unserviceable" ||
         lower.includes("repair") ||
         lower.includes("maintenance");
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return String(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getStatusConfig(status) {
  const norm = normalizeStatus(status);
  switch (norm) {
    case "Under Repair":
      return { label: "Under Repair", color: "#0284c7", badgeClass: "badge-under-repair" };
    case "For Repair":
      return { label: "For Repair", color: "#f29913", badgeClass: "badge-repair" };
    case "Maintenance":
      return { label: "Maintenance", color: "#449e38", badgeClass: "badge-maintenance" };
    case "Unserviceable":
      return { label: "Unserviceable", color: "#ef4444", badgeClass: "badge-unserviceable" };
    default:
      return { label: norm, color: "#64748b", badgeClass: "badge-other" };
  }
}

function updateStatusDropdown(items) {
  if (!statusFilter) return;
  const currentVal = statusFilter.value;

  const counts = {};
  for (const item of items) {
    const s = normalizeStatus(item.status || item.Status || "");
    counts[s] = (counts[s] || 0) + 1;
  }

  const sortedStatuses = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  statusFilter.innerHTML = `<option value="all">All Statuses (${items.length})</option>` +
    sortedStatuses.map(([s, count]) => `<option value="${escapeHtml(s)}">${escapeHtml(s)} (${count})</option>`).join("");

  if (sortedStatuses.some(([s]) => s === currentVal)) {
    statusFilter.value = currentVal;
  } else {
    statusFilter.value = "all";
  }
  statusFilter.title = statusFilter.options[statusFilter.selectedIndex]?.text || "All Statuses";
}

function applyStatusFilter() {
  const selected = statusFilter?.value || "all";

  if (selected === "all") {
    filteredAssets = allMaintenanceAssets;
  } else {
    filteredAssets = allMaintenanceAssets.filter(item => {
      const s = normalizeStatus(item.status || item.Status || "");
      return s.toLowerCase() === selected.toLowerCase();
    });
  }

  const uniqueStatuses = new Set(allMaintenanceAssets.map(i => normalizeStatus(i.status || i.Status || "")));

  if (totalRequestsElem) {
    if (selected === "all") {
      totalRequestsElem.textContent = `Total requests: ${filteredAssets.length} item${filteredAssets.length === 1 ? "" : "s"} (${uniqueStatuses.size} status${uniqueStatuses.size === 1 ? "" : "es"})`;
    } else {
      totalRequestsElem.textContent = `Filtered requests: ${filteredAssets.length} item${filteredAssets.length === 1 ? "" : "s"} (1 of ${uniqueStatuses.size} statuses)`;
    }
  }

  renderPage(1);
}

function renderPage(page) {
  if (!cardsContainer) return;

  const totalPages = Math.max(1, Math.ceil(filteredAssets.length / pageSize));
  currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = filteredAssets.slice(startIndex, startIndex + pageSize);

  if (!filteredAssets.length) {
    cardsContainer.innerHTML = '<p class="empty-state" style="grid-column: 1 / -1; text-align: center; color: #64748b; padding: 48px 0;">No maintenance requests found matching the selected filter.</p>';
  } else {
    cardsContainer.innerHTML = pageItems.map((item, index) => {
      const rank = startIndex + index + 1;
      const title = item.item_brand_model || item.itemBrandModel || item.item_classification || item.itemClassification || "Maintenance Asset";
      const propNo = item.property_no || item.propertyNo || item.asset_id || item.assetId || "No Property No";
      const cls = item.item_classification || item.itemClassification || "";
      const location = item.location || "";
      const additionalItem = item.additional_item || item.additionalItem || "";
      const dateText = formatDate(item.updated_at || item.updatedAt || item.created_at || item.createdAt);
      const accountable = item.accountable_person || item.accountablePerson || "";
      const status = normalizeStatus(item.status || item.Status || "");
      const statusCfg = getStatusConfig(status);

      return `
        <article class="maintenance-card" style="--status-accent: ${statusCfg.color};">
          <div class="maintenance-card-top">
            <div class="maintenance-card-title-group">
              <span class="category-rank-pill">#${rank}</span>
              <h3 class="maintenance-card-title" title="${escapeHtml(title)}">${escapeHtml(title)}</h3>
            </div>
            <span class="badge ${statusCfg.badgeClass}">
              ${escapeHtml(status)}
            </span>
          </div>

          <div class="maintenance-card-body">
            <div class="maintenance-tags-row">
              <span class="maintenance-tag">🏷️ ${escapeHtml(propNo)}</span>
              ${cls ? `<span class="maintenance-tag">📁 ${escapeHtml(cls)}</span>` : ""}
              ${location ? `<span class="maintenance-tag">📍 ${escapeHtml(location)}</span>` : ""}
            </div>
            ${additionalItem ? `<div class="maintenance-additional-item" title="${escapeHtml(additionalItem)}"><span style="font-weight: 700; color: #1e293b;">📦 Additional Item:</span> ${escapeHtml(additionalItem)}</div>` : ""}
          </div>

          <div class="maintenance-card-footer">
            <span>${dateText ? `📅 ${escapeHtml(dateText)}` : "No date recorded"}</span>
            ${accountable ? `<span style="font-weight: 700; color: #475569;">👤 ${escapeHtml(accountable)}</span>` : ""}
          </div>
        </article>
      `;
    }).join("");
  }

  if (pageStatus) {
    pageStatus.textContent = `Page ${currentPage} of ${totalPages}`;
  }
  if (previousPage) {
    previousPage.disabled = currentPage === 1;
  }
  if (nextPage) {
    nextPage.disabled = currentPage === totalPages;
  }
}

async function fetchFromSupabase() {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || anonKey === "YOUR_SUPABASE_ANON_KEY") {
    return null;
  }

  const response = await fetch(`${url}/rest/v1/assets?select=asset_id,property_no,item_classification,item_brand_model,location,status,additional_item,remarks,accountable_person,created_at,updated_at,inventory_type`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch assets: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

async function init() {
  // 1. First check localStorage for instant render
  try {
    const cachedMaint = JSON.parse(localStorage.getItem("maintenanceRequestsReportEntries") || "[]");
    if (Array.isArray(cachedMaint) && cachedMaint.length > 0) {
      allMaintenanceAssets = cachedMaint;
      updateStatusDropdown(allMaintenanceAssets);
      applyStatusFilter();
    } else {
      const cachedRaw = JSON.parse(localStorage.getItem("spis_inventory_items") || "[]");
      if (Array.isArray(cachedRaw) && cachedRaw.length > 0) {
        allMaintenanceAssets = cachedRaw.filter(isMaintenanceItem);
        if (allMaintenanceAssets.length === 0 && cachedRaw.length > 0) {
          // If no explicitly flagged maintenance items, show any non-Serviceable items
          allMaintenanceAssets = cachedRaw.filter(i => {
            const s = String(i.status || "").toLowerCase();
            return s !== "serviceable" && s !== "active";
          });
        }
        updateStatusDropdown(allMaintenanceAssets);
        applyStatusFilter();
      }
    }
  } catch (err) {
    console.warn("Error reading cached maintenance requests:", err);
  }

  // 2. Fetch fresh live records from Supabase
  try {
    if (!allMaintenanceAssets.length && cardsContainer) {
      cardsContainer.innerHTML = '<p class="loading-state" style="grid-column: 1 / -1; text-align: center; color: #64748b; padding: 48px 0;">Connecting to database and pulling maintenance records...</p>';
    }
    const assets = await fetchFromSupabase();
    if (Array.isArray(assets)) {
      allRawAssets = assets;
      let maint = assets.filter(isMaintenanceItem);
      if (maint.length === 0 && assets.length > 0) {
        maint = assets.filter(i => {
          const s = String(i.status || "").toLowerCase();
          return s !== "serviceable" && s !== "active";
        });
      }
      allMaintenanceAssets = maint;
      updateStatusDropdown(allMaintenanceAssets);
      try {
        localStorage.setItem("maintenanceRequestsReportEntries", JSON.stringify(allMaintenanceAssets));
      } catch (e) {}
      applyStatusFilter();
    }
  } catch (error) {
    console.error("Failed to pull maintenance requests from Supabase:", error);
    if (!allMaintenanceAssets.length && cardsContainer) {
      cardsContainer.innerHTML = `<p class="empty-state" style="grid-column: 1 / -1; text-align: center; color: #dc2626; padding: 48px 0;">Failed to pull data from database: ${escapeHtml(error.message)}</p>`;
      if (totalRequestsElem) totalRequestsElem.textContent = "Error loading data";
    }
  }
}

// Filter dropdown change
statusFilter?.addEventListener("change", () => {
  if (statusFilter) {
    statusFilter.title = statusFilter.options[statusFilter.selectedIndex]?.text || "All Statuses";
  }
  applyStatusFilter();
});

// Pagination controls
previousPage?.addEventListener("click", () => renderPage(currentPage - 1));
nextPage?.addEventListener("click", () => renderPage(currentPage + 1));

// Initialize on page load
init();
