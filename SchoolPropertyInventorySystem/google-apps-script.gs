const SPREADSHEET_ID = "10RBpqRCp5ZI37BfTSMzBuQ8UZsh9U6T3aliGonEVp6E";
const SHEET_NAME = "Assets";
const CLASSIFICATION_SHEET_NAME = "ItemClassification";
const HEADERS = [
  "AssetID",
  "Fund Cluster",
  "Inventory Item Type",
  "Property No",
  "Item Classification",
  "Item/Brand/Model",
  "Serial No.",
  "Acquisition Date",
  "Person Accountable",
  "Date Issue",
  "Status",
  "Remarks",
  "CreatedAt",
  "UpdatedAt"
];
const CLASSIFICATION_HEADERS = ["Classification", "CreatedAt"];

function doPost(e) {
  const action = String(e.parameter.action || "").trim();
  const item = safeParseJson(e.parameter.item);
  const classification = String(e.parameter.classification || "").trim();

  try {
    if (action === "addClassification") {
      const result = addClassification(classification);
      return createJsonResponse({ ok: true, result });
    }

    const sheet = getInventorySheet();
    ensureHeaders(sheet, HEADERS);

    if (action === "create") {
      appendItem(sheet, item);
    } else if (action === "update") {
      updateItem(sheet, item);
    } else if (action === "delete") {
      deleteItem(sheet, item.assetId);
    }

    return createJsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return createJsonResponse({ ok: false, error: error && error.message ? error.message : String(error) });
  }
}

function getInventorySheet() {
  return getSpreadsheet().getSheetByName(SHEET_NAME) || getSpreadsheet().getSheets()[0];
}

function getSpreadsheet() {
  try {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (error) {
    return SpreadsheetApp.getActiveSpreadsheet();
  }
}

function ensureHeaders(sheet, headers) {
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeaders = firstRow.some(function (value) {
    return String(value).trim();
  });

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
}

function ensureClassificationHeaders(sheet) {
  ensureHeaders(sheet, CLASSIFICATION_HEADERS);
}

function appendItem(sheet, item) {
  sheet.appendRow(toRow(item));
  SpreadsheetApp.flush();
}

function updateItem(sheet, item) {
  const rowNumber = findRowById(sheet, item.assetId);

  if (rowNumber) {
    sheet.getRange(rowNumber, 1, 1, HEADERS.length).setValues([toRow(item)]);
    SpreadsheetApp.flush();
  } else {
    appendItem(sheet, item);
  }
}

function deleteItem(sheet, id) {
  const rowNumber = findRowById(sheet, id);

  if (rowNumber) {
    sheet.deleteRow(rowNumber);
    SpreadsheetApp.flush();
  }
}

function addClassification(name) {
  const spreadsheet = getSpreadsheet();
  const sheet = spreadsheet.getSheetByName(CLASSIFICATION_SHEET_NAME) || spreadsheet.insertSheet(CLASSIFICATION_SHEET_NAME);
  ensureClassificationHeaders(sheet);

  const normalized = String(name || "").trim();
  if (!normalized) return { saved: false, reason: "empty" };

  const lastRow = sheet.getLastRow();
  const existingRows = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, 1).getValues() : [];
  const exists = existingRows.some(function (row) {
    return String(row[0]).trim().toLowerCase() === normalized.toLowerCase();
  });

  if (exists) return { saved: false, reason: "duplicate" };

  sheet.appendRow([normalized, new Date().toISOString()]);
  SpreadsheetApp.flush();
  return { saved: true, sheet: sheet.getName(), value: normalized };
}

function getClassifications() {
  const sheet = getSpreadsheet().getSheetByName(CLASSIFICATION_SHEET_NAME);
  if (!sheet) return [];

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  return sheet.getRange(2, 1, lastRow - 1, 1).getValues()
    .map(function (row) {
      return String(row[0] || "").trim();
    })
    .filter(function (value) {
      return value;
    });
}

function findRowById(sheet, id) {
  if (!id) return null;

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  const index = ids.findIndex(function (row) {
    return String(row[0]) === String(id);
  });

  return index >= 0 ? index + 2 : null;
}

function safeParseJson(value) {
  if (!value) return {};

  try {
    return JSON.parse(value);
  } catch (error) {
    return {};
  }
}

function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function toRow(item) {
  return [
    item.assetId || "",
    item.fundCluster || "",
    item.inventoryType || "",
    item.propertyNo || "",
    item.itemClassification || "",
    item.itemBrandModel || "",
    item.serialNo || "",
    item.acquisitionDate || "",
    item.accountable || "",
    item.dateIssue || "",
    item.status || "",
    item.remarks || "",
    item.createdAt || "",
    item.updatedAt || ""
  ];
}
