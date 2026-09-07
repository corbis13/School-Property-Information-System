const colors = ["#004c87", "#449e38", "#f29913", "#0284c7", "#94a3b8", "#6366f1", "#0d9488", "#ec4899", "#8b5cf6", "#64748b"];
const entries = JSON.parse(localStorage.getItem("accountablePersonReportEntries") || "[]");
const chart = document.getElementById("accountablePersonChart");
const previousPage = document.getElementById("previousPage");
const nextPage = document.getElementById("nextPage");
const pageStatus = document.getElementById("pageStatus");
const totalAssigned = entries.reduce((sum, entry) => sum + Number(entry.value || 0), 0);
const maxValue = Math.max(...entries.map((entry) => Number(entry.value || 0)), 1);
const pageSize = 20;
const totalPages = Math.max(1, Math.ceil(entries.length / pageSize));
let currentPage = 1;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.getElementById("totalAssigned").textContent = `Total assigned: ${totalAssigned} item${totalAssigned === 1 ? "" : "s"}`;

function renderPage(page) {
  currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageEntries = entries.slice(startIndex, startIndex + pageSize);

  chart.innerHTML = pageEntries.length
  ? pageEntries.map((entry, index) => `
      <div class="bar-row">
        <span class="row-number">${startIndex + index + 1}.</span>
        <span class="person-label">${escapeHtml(entry.label)}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${Math.max(1, Math.round((entry.value / maxValue) * 100))}%; background: ${colors[(startIndex + index) % colors.length]};">
            <strong>${entry.value}</strong>
          </div>
        </div>
      </div>
    `).join("")
  : '<p class="empty-state">No accountable persons found in the asset database.</p>';

  pageStatus.textContent = `Page ${currentPage} of ${totalPages}`;
  previousPage.disabled = currentPage === 1;
  nextPage.disabled = currentPage === totalPages;
}

previousPage.addEventListener("click", () => renderPage(currentPage - 1));
nextPage.addEventListener("click", () => renderPage(currentPage + 1));
renderPage(1);
