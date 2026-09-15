const colors = ["#004c87", "#449e38", "#f29913", "#0284c7", "#6366f1", "#0d9488", "#ec4899", "#8b5cf6", "#10b981", "#64748b"];
let allRawAssets = [];
let allCategoryEntries = [];
let filteredCategoryEntries = [];
const pageSize = 10;
let currentPage = 1;

const cardsContainer = document.getElementById("categoryCardsGrid") || document.getElementById("categoryBreakdownChart");
const categoryFilter = document.getElementById("categoryFilter");
const previousPage = document.getElementById("previousPage");
const nextPage = document.getElementById("nextPage");
const pageStatus = document.getElementById("pageStatus");
const totalCategoriesElem = document.getElementById("totalCategories");

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

function getCategoryName(item) {
  const cat = String(item.item_classification || item.itemClassification || "").trim();
  return cat || "Unclassified";
}

function computeCategoryDistribution(assets) {
  const counts = {};
  for (const item of assets) {
    const cat = getCategoryName(item);
    counts[cat] = (counts[cat] || 0) + 1;
  }

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([label, value], index) => ({
      label,
      value,
      color: colors[index % colors.length]
    }));
}

function updateCategoryDropdown(categories) {
  if (!categoryFilter) return;
  const currentVal = categoryFilter.value;
  const sortedCats = [...categories].sort((a, b) => a.label.localeCompare(b.label));

  categoryFilter.innerHTML = `<option value="all">All Categories (${categories.length})</option>` +
    sortedCats.map(c => `<option value="${escapeHtml(c.label)}">${escapeHtml(c.label)} (${c.value})</option>`).join("");

  if (sortedCats.some(c => c.label === currentVal)) {
    categoryFilter.value = currentVal;
  } else {
    categoryFilter.value = "all";
  }
  categoryFilter.title = categoryFilter.options[categoryFilter.selectedIndex]?.text || "All Categories";
}

function applyCategoryFilter() {
  const selected = categoryFilter?.value || "all";

  if (selected === "all") {
    filteredCategoryEntries = allCategoryEntries;
  } else {
    filteredCategoryEntries = allCategoryEntries.filter(entry => entry.label === selected);
  }

  const totalFilteredItems = filteredCategoryEntries.reduce((sum, e) => sum + Number(e.value || 0), 0);
  const totalFilteredCats = filteredCategoryEntries.length;

  if (totalCategoriesElem) {
    if (selected === "all") {
      totalCategoriesElem.textContent = `Total items: ${totalFilteredItems} (${totalFilteredCats} categor${totalFilteredCats === 1 ? "y" : "ies"})`;
    } else {
      totalCategoriesElem.textContent = `Category items: ${totalFilteredItems} (1 of ${allCategoryEntries.length} categories)`;
    }
  }

  renderPage(1);
}

function renderPage(page) {
  if (!cardsContainer) return;
  const totalPages = Math.max(1, Math.ceil(filteredCategoryEntries.length / pageSize));
  currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageEntries = filteredCategoryEntries.slice(startIndex, startIndex + pageSize);
  const totalSystemItems = allCategoryEntries.reduce((sum, e) => sum + Number(e.value || 0), 0);
  const maxCount = Math.max(...allCategoryEntries.map(e => Number(e.value || 0)), 1);

  if (!filteredCategoryEntries.length) {
    cardsContainer.innerHTML = '<p class="empty-state" style="grid-column: 1 / -1; text-align: center; color: #64748b; padding: 48px 0;">No property categories found for the selected filter.</p>';
  } else {
    cardsContainer.innerHTML = pageEntries.map((entry, index) => {
      // Find true rank in overall distribution
      const trueRank = allCategoryEntries.findIndex(c => c.label === entry.label) + 1;
      const rank = trueRank > 0 ? trueRank : (startIndex + index + 1);
      const pct = totalSystemItems > 0 ? ((entry.value / totalSystemItems) * 100).toFixed(1) : "0.0";
      const widthPct = Math.max(6, Math.round((entry.value / maxCount) * 100));
      const accentColor = entry.color || colors[(startIndex + index) % colors.length];
      const itemLabel = entry.value === 1 ? "item" : "items";

      return `
        <article class="category-card" style="--cat-accent: ${accentColor};">
          <div class="category-card-top">
            <div class="category-card-rank-title">
              <span class="category-rank-pill">#${rank}</span>
              <h3 class="category-card-title" title="${escapeHtml(entry.label)}">${escapeHtml(entry.label)}</h3>
            </div>
            <span class="category-card-share-badge" style="color: ${accentColor}; background: ${accentColor}18;">
              ${pct}%
            </span>
          </div>

          <div class="category-card-middle">
            <div class="category-card-stat">
              <span class="category-card-count">${entry.value}</span>
              <span class="category-card-count-label">${itemLabel}</span>
            </div>
            <span class="category-card-subtext">of ${totalSystemItems} total</span>
          </div>

          <div class="category-card-meter" aria-hidden="true">
            <div class="category-card-meter-fill" style="width: ${widthPct}%; background: ${accentColor};"></div>
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

  const response = await fetch(`${url}/rest/v1/assets?select=asset_id,property_no,item_classification,item_brand_model,location,status,accountable_person,inventory_type,acquisition_date,created_at,updated_at`, {
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
  // 1. First check localStorage for cached entries or raw items for instant first-paint
  try {
    const cachedRaw = JSON.parse(localStorage.getItem("spis_inventory_items") || "[]");
    if (Array.isArray(cachedRaw) && cachedRaw.length > 0) {
      allRawAssets = cachedRaw;
      allCategoryEntries = computeCategoryDistribution(allRawAssets);
      updateCategoryDropdown(allCategoryEntries);
      applyCategoryFilter();
    } else {
      const cachedEntries = JSON.parse(localStorage.getItem("propertyCategoryReportEntries") || "[]");
      if (Array.isArray(cachedEntries) && cachedEntries.length > 0) {
        allCategoryEntries = cachedEntries;
        updateCategoryDropdown(allCategoryEntries);
        applyCategoryFilter();
      }
    }
  } catch (err) {
    console.warn("Error reading cached property categories:", err);
  }

  // 2. Fetch fresh data from Supabase
  try {
    if (!allCategoryEntries.length && cardsContainer) {
      cardsContainer.innerHTML = '<p class="loading-state" style="grid-column: 1 / -1; text-align: center; color: #64748b; padding: 48px 0;">Connecting to database and pulling category records...</p>';
    }
    const assets = await fetchFromSupabase();
    if (Array.isArray(assets) && assets.length > 0) {
      allRawAssets = assets;
      allCategoryEntries = computeCategoryDistribution(assets);
      updateCategoryDropdown(allCategoryEntries);
      localStorage.setItem("propertyCategoryReportEntries", JSON.stringify(allCategoryEntries));
      applyCategoryFilter();
    }
  } catch (error) {
    console.error("Failed to pull property categories from Supabase:", error);
    if (!allCategoryEntries.length && cardsContainer) {
      cardsContainer.innerHTML = `<p class="empty-state" style="grid-column: 1 / -1; text-align: center; color: #dc2626; padding: 48px 0;">Failed to pull data from database: ${escapeHtml(error.message)}</p>`;
      if (totalCategoriesElem) totalCategoriesElem.textContent = "Error loading data";
    }
  }
}

// Category filter event listener
categoryFilter?.addEventListener("change", () => {
  if (categoryFilter) {
    categoryFilter.title = categoryFilter.options[categoryFilter.selectedIndex]?.text || "All Categories";
  }
  applyCategoryFilter();
});

// Navigation event listeners
previousPage?.addEventListener("click", () => renderPage(currentPage - 1));
nextPage?.addEventListener("click", () => renderPage(currentPage + 1));

// Initialize on load
init();
