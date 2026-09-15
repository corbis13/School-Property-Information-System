const colors = ["#449e38", "#22c55e", "#10b981", "#0284c7", "#004c87", "#38bdf8", "#d97706", "#6366f1", "#ec4899", "#8b5cf6"];
let allRawAssets = [];
let allEntries = [];
let filteredEntries = [];
const pageSize = 20;
let currentPage = 1;

const chart = document.getElementById("issuanceYearChart");
const previousPage = document.getElementById("previousPage");
const nextPage = document.getElementById("nextPage");
const pageStatus = document.getElementById("pageStatus");
const totalAssignedElem = document.getElementById("totalAssigned");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");

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

function extractYear(rawValue) {
  if (!rawValue) return null;
  const str = String(rawValue).trim();
  if (!str) return null;
  const parsed = new Date(str);
  if (!Number.isNaN(parsed.getTime())) {
    const year = parsed.getFullYear();
    if (year >= 1900 && year <= 2100) return String(year);
  }
  const match = str.match(/\b(19\d{2}|20\d{2})\b/);
  if (match) {
    return match[1];
  }
  return null;
}

function computeEntriesFromAssets(assets, filterType = "all") {
  const counts = {};
  for (const item of assets) {
    if (filterType === "buildings") {
      const type = String(item.inventory_type || item.inventoryType || "").toLowerCase();
      const cls = String(item.item_classification || item.itemClassification || "").toLowerCase();
      if (!type.includes("building") && !cls.includes("building")) continue;
    } else if (filterType === "inventory") {
      const type = String(item.inventory_type || item.inventoryType || "").toLowerCase();
      const cls = String(item.item_classification || item.itemClassification || "").toLowerCase();
      if (type.includes("building") || cls.includes("building")) continue;
    }

    const rawDate = item.date_issue || item.dateIssue || "";
    const year = extractYear(rawDate);
    if (!year) continue;

    counts[year] = (counts[year] || 0) + 1;
  }

  return Object.entries(counts)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([label, value]) => ({ label, value }));
}

function applyFilters() {
  const term = (searchInput?.value || "").trim().toLowerCase();
  const filterType = typeFilter?.value || "all";

  if (allRawAssets.length > 0) {
    allEntries = computeEntriesFromAssets(allRawAssets, filterType);
  }

  if (!term) {
    filteredEntries = allEntries;
  } else {
    filteredEntries = allEntries.filter(entry => entry.label.toLowerCase().includes(term));
  }

  const totalCount = filteredEntries.reduce((sum, entry) => sum + Number(entry.value || 0), 0);
  if (totalAssignedElem) {
    totalAssignedElem.textContent = `Total items: ${totalCount} (${filteredEntries.length} year${filteredEntries.length === 1 ? "" : "s"})`;
  }

  renderPage(1);
}

function renderPage(page) {
  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / pageSize));
  currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageEntries = filteredEntries.slice(startIndex, startIndex + pageSize);
  const maxValue = Math.max(...filteredEntries.map(e => Number(e.value || 0)), 1);

  if (!filteredEntries.length) {
    chart.innerHTML = '<p class="empty-state" style="text-align: center; color: #64748b; padding: 36px 0;">No issuance years found in the asset database.</p>';
  } else {
    chart.innerHTML = pageEntries.map((entry, index) => `
      <div class="bar-row">
        <span class="row-number">${startIndex + index + 1}.</span>
        <span class="person-label" title="${escapeHtml(entry.label)}">${escapeHtml(entry.label)}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${Math.max(2, Math.round((entry.value / maxValue) * 100))}%; background: ${colors[(startIndex + index) % colors.length]};">
            <strong>${entry.value}</strong>
          </div>
        </div>
      </div>
    `).join("");
  }

  pageStatus.textContent = `Page ${currentPage} of ${totalPages}`;
  previousPage.disabled = currentPage === 1;
  nextPage.disabled = currentPage === totalPages;
}

async function fetchFromSupabase() {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || anonKey === "YOUR_SUPABASE_ANON_KEY") {
    return null;
  }

  const response = await fetch(`${url}/rest/v1/assets?select=asset_id,date_issue,inventory_type,item_classification,property_no`, {
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
  // 1. Check localStorage for cached entries or raw items for instant rendering
  try {
    const cachedRaw = JSON.parse(localStorage.getItem("spis_inventory_items") || "[]");
    if (Array.isArray(cachedRaw) && cachedRaw.length > 0) {
      allRawAssets = cachedRaw;
      allEntries = computeEntriesFromAssets(allRawAssets, "all");
      applyFilters();
    } else {
      const cachedEntries = JSON.parse(localStorage.getItem("issuanceYearReportEntries") || "[]");
      if (Array.isArray(cachedEntries) && cachedEntries.length > 0) {
        allEntries = cachedEntries;
        filteredEntries = allEntries;
        applyFilters();
      }
    }
  } catch (err) {
    console.warn("Error reading cached issuance years:", err);
  }

  // 2. Fetch live data from Supabase
  try {
    if (!allEntries.length) {
      chart.innerHTML = '<p class="loading-state" style="text-align: center; color: #64748b; padding: 36px 0;">Connecting to database and pulling issuance records...</p>';
    }
    const assets = await fetchFromSupabase();
    if (Array.isArray(assets)) {
      allRawAssets = assets;
      allEntries = computeEntriesFromAssets(assets, "all");
      localStorage.setItem("issuanceYearReportEntries", JSON.stringify(allEntries));
      applyFilters();
    }
  } catch (error) {
    console.error("Failed to pull issuance years from Supabase:", error);
    if (!allEntries.length) {
      chart.innerHTML = `<p class="empty-state" style="text-align: center; color: #dc2626; padding: 36px 0;">Failed to pull data from database: ${escapeHtml(error.message)}</p>`;
      if (totalAssignedElem) totalAssignedElem.textContent = "Error loading data";
    }
  }
}

// Event Listeners
searchInput?.addEventListener("input", () => applyFilters());
typeFilter?.addEventListener("change", () => applyFilters());
previousPage?.addEventListener("click", () => renderPage(currentPage - 1));
nextPage?.addEventListener("click", () => renderPage(currentPage + 1));

// Initialize on page load
init();
