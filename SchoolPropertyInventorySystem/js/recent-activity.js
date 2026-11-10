const activityRows = document.getElementById("activityRows");
const activityTotal = document.getElementById("activityTotal");

function readActivityRecords(key, legacyKey) {
  const raw = localStorage.getItem(key) || (legacyKey ? localStorage.getItem(legacyKey) : null) || "[]";
  const records = JSON.parse(raw);
  if (!Array.isArray(records)) {
    throw new TypeError(`Expected ${key} to contain a list of records.`);
  }
  return records;
}

function getActivityDate(record, fields) {
  for (const field of fields) {
    const value = record[field];
    if (!value) continue;
    const timestamp = new Date(value).getTime();
    if (!Number.isNaN(timestamp)) return { value: String(value), timestamp };
  }
  return { value: "", timestamp: 0 };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatActivityDate(value) {
  if (!value) return "Date unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

function createActivityList() {
  const events = [];
  const assets = readActivityRecords("propertyInventoryItems", "spis_inventory_items");
  const qrHistory = readActivityRecords("propertyInventoryQrDownloadHistory");
  const slips = readActivityRecords("propertyInventoryCustodianSlips");
  const rspiReports = readActivityRecords("propertyInventoryRspiReports");

  assets.forEach((asset) => {
    const date = getActivityDate(asset, ["updatedAt", "updated_at", "createdAt", "created_at"]);
    const propertyNo = asset.propertyNo || asset.property_no || asset.assetId || asset.asset_id || "Inventory item";
    const description = asset.itemBrandModel || asset.item_brand_model || asset.description || "";
    events.push({
      ...date,
      type: "Inventory updated",
      record: [propertyNo, description].filter(Boolean).join(" — ")
    });
  });

  qrHistory.forEach((entry) => {
    const date = getActivityDate(entry, ["downloadedAt", "downloaded_at", "updatedAt", "updated_at"]);
    const propertyNo = entry.inventoryItemNo || entry.inventory_item_no || entry.propertyNo || entry.property_no || entry.assetId || entry.asset_id || "Inventory item";
    const description = entry.itemBrandModel || entry.item_brand_model || "";
    const count = Number(entry.count || entry.download_count) || 1;
    events.push({
      ...date,
      type: "QR code downloaded",
      record: `${[propertyNo, description].filter(Boolean).join(" — ")} (${count} download${count === 1 ? "" : "s"})`
    });
  });

  slips.forEach((slip) => {
    const date = getActivityDate(slip, [
      "savedAt", "saved_at", "receivedByDate", "received_by_date",
      "receivedFromDate", "received_from_date", "createdAt", "created_at"
    ]);
    const documentNo = slip.icsNo || slip.ics_no || "Inventory Custodian Slip";
    const description = slip.description || slip.inventoryItemNo || slip.inventory_item_no || "";
    events.push({
      ...date,
      type: "Document saved",
      record: [documentNo, description].filter(Boolean).join(" — ")
    });
  });

  rspiReports.forEach((report) => {
    const date = getActivityDate(report, ["savedAt", "saved_at", "createdAt", "created_at"]);
    const reportNo = report.icsNo || report.ics_no || report.reportNo || report.report_no || "RSPI Report";
    const description = report.description || report.entityName || report.entity_name || "";
    events.push({
      ...date,
      type: "RSPI report saved",
      record: [reportNo, description].filter(Boolean).join(" — ")
    });
  });

  return events.sort((first, second) => second.timestamp - first.timestamp);
}

function renderRecentActivity() {
  try {
    const events = createActivityList();
    activityTotal.textContent = `${events.length} record${events.length === 1 ? "" : "s"}`;
    if (!events.length) {
      activityRows.innerHTML = '<tr><td class="activity-message" colspan="3">No activity records found.</td></tr>';
      return;
    }

    activityRows.innerHTML = events.map((event) => `
      <tr>
        <td class="activity-date">${escapeHtml(formatActivityDate(event.value))}</td>
        <td class="activity-kind">${escapeHtml(event.type)}</td>
        <td class="activity-record">${escapeHtml(event.record || "—")}</td>
      </tr>
    `).join("");
  } catch (error) {
    console.error("Could not load recent activity records:", error);
    activityTotal.textContent = "Unable to load";
    activityRows.innerHTML = '<tr><td class="activity-message" colspan="3">Recent activity could not be loaded. Return to the dashboard and try again.</td></tr>';
  }
}

renderRecentActivity();
