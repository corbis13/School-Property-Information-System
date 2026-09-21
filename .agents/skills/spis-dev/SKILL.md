---
name: spis-dev
description: >-
  Use this skill whenever working on the School Property Information System (SPIS).
  It covers the project's architecture, file conventions, recurring coding patterns,
  and the correct way to make UI, JS, and CSS changes without breaking other modules.
  Activate automatically when the user asks to add features, fix bugs, restyle
  components, generate reports, or run the dev server for this project.
---

# SPIS Developer Skill

## Project Overview

**School Property Information System (SPIS)** — a vanilla HTML/CSS/JS web app
backed by a Node.js (Express) server and Supabase as the database.

- **Live URL (dev):** `http://localhost:3000` → redirects to `/SchoolPropertyInventorySystem/`
- **Start command:** `npm run dev` (runs `node server.js`) from the repo root.
- **No build step.** All JS/CSS changes are reflected immediately on the next browser reload.

---

## Repository Structure

```
School-Property-Information-System/
├── server.js                          # Express server – serves static files + Supabase config injection
├── package.json
├── SchoolPropertyInventorySystem/     # ← ALL app code lives here
│   ├── index.html                     # Main app entry (always kept in sync with homepage.html)
│   ├── homepage.html                  # Mirror of index.html – both MUST be changed together
│   ├── css/
│   │   ├── style.css                  # Global base styles, @media print rules
│   │   └── spis-modules.css           # Module-specific styles (reports, ICS, QR, etc.)
│   ├── js/
│   │   ├── app.js                     # Primary application logic – DOM registry, all event listeners
│   │   ├── homepage.js                # Dashboard / homepage-specific logic
│   │   └── asset.js / *.js            # Per-page scripts
│   ├── reports/                       # Static printable report templates
│   └── *.html                         # Report pages (asset.html, accountable-person-report.html, etc.)
└── .agents/skills/spis-dev/           # ← This skill
```

---

## Critical Rule: index.html ↔ homepage.html Are Mirrors

`index.html` and `homepage.html` inside `SchoolPropertyInventorySystem/` are
**nearly identical**. Every HTML change (adding elements, changing classes, modifying
inline styles) **must be applied to both files**. Failure to do so causes
inconsistencies depending on which page the browser loads.

---

## DOM Registry (app.js `dom` Object)

All DOM element references live in the `dom` object at the top of `app.js`.
When a new element is added to the HTML, **register it here**:

```js
// Pattern
elementKey: document.querySelector("#elementId"),
```

Then reference it throughout the file as `dom.elementKey`.

---

## Recurring Patterns

### Adding a Search Field to a Card

1. In both `index.html` and `homepage.html`, add `inventory-heading` to the card's
   `section-heading` div class list, then add a `.filters` div containing:
   ```html
   <input id="mySearchInput" type="search" placeholder="Search..." aria-label="...">
   ```
2. In `app.js` `dom` object, add:
   ```js
   mySearchInput: document.querySelector("#mySearchInput"),
   ```
3. In the render function, read the query:
   ```js
   const query = (dom.mySearchInput ? dom.mySearchInput.value : "").trim().toLowerCase();
   const filtered = query ? items.filter(i => [...fields].some(f => String(i[f] ?? "").toLowerCase().includes(query))) : items;
   ```
4. Add an event listener in the main init block:
   ```js
   if (dom.mySearchInput) {
       dom.mySearchInput.addEventListener("input", () => { page = 1; renderFn(); });
   }
   ```

### Currency Formatting

Use the existing `formatCurrency(value)` helper (defined in `index.html` / `homepage.html`
inline scripts) or `formatTotalDisplay(val)` / `formatPeso(n)` from `app.js`.

```js
// formatCurrency – strips non-numeric chars, returns "1,000.00" or "" if empty
formatCurrency(value)

// formatTotalDisplay – same but defined in app.js, used in report rendering
formatTotalDisplay(val)

// formatPeso – formats with ₱ prefix, used in ICS table
formatPeso(Number(slip.totalCost) || 0)
```

Always apply currency formatting to Unit Value and Total columns in reports.

### PDF Generation (`generateReportPdf` in app.js)

- Uses `html2canvas` + `jsPDF` (loaded from CDN).
- Page size: **13 × 8.5 in, landscape**.
- `bottomMargin = 0.8` (inches) — the white rectangle painted at the bottom of each PDF page.
- Row-split avoidance: bounding boxes of all `<tr>` elements are measured against
  the canvas; the slice stops before any `<tr>` that would be split across pages.
- Bottom padding of `.pdf-export .physical-report-paper` is `45px` in `spis-modules.css`.

### Adding/Modifying CSS

- **Module-specific styles** → `spis-modules.css`
- **Global / print styles** → `style.css`
- Check CSS brace balance after edits:
  ```powershell
  node -e "const fs=require('fs');const c=fs.readFileSync('SchoolPropertyInventorySystem/css/spis-modules.css','utf8');let b=0;c.split('\n').forEach(l=>{for(let ch of l){if(ch==='{')b++;if(ch==='}')b--;}});console.log('Balance:',b);"
  ```
  Balance must be `0`.

### Report Configuration Card (Reports Module)

The "Type of Inventory Item" dropdown has `id="reportType"`.
- Default selected option: `value="all"` → **"All inventory types"**
- When `rt.value === "all"` or `""`, the report header displays **"ALL INVENTORY ITEMS"**.
- The `loadReportInventoryTypeDropdown()` function dynamically populates types from
  Supabase / local data, always prepending `<option value="all">All inventory types</option>`.

---

## Running the Dev Server

```powershell
# From repo root
npm run dev
```

- Confirm server is up: `curl.exe -I http://localhost:3000/`
- Expected: `HTTP/1.1 302 Found` → redirect to `/SchoolPropertyInventorySystem/`
- Check if port 3000 is already in use before starting:
  ```powershell
  Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
  ```

---

## Key Element IDs Reference

| ID | Location | Purpose |
|---|---|---|
| `reportType` | index/homepage `.html` | Inventory type dropdown in Report Configuration |
| `reportFundCluster` | index/homepage `.html` | Fund Cluster input |
| `reportAsOf` | index/homepage `.html` | As-of Date input |
| `physicalReport` | index/homepage `.html` | Report render container |
| `generatePdfBtn` | index/homepage `.html` | Generate PDF button |
| `icsSlipTable` | index/homepage `.html` | ICS records tbody |
| `icsSlipPagination` | index/homepage `.html` | ICS pagination container |
| `icsSlipSearchInput` | index/homepage `.html` | ICS search field |
| `savedDocumentsPanel` | index/homepage `.html` | Saved Documents card |
| `qrHistorySearchInput` | index/homepage `.html` | QR history search |
| `searchInput` | index/homepage `.html` | Inventory Records search |

---

## Supabase Config

The server injects `window.SUPABASE_CONFIG` dynamically via `/SchoolPropertyInventorySystem/supabase-config.js`.
Environment variables `SUPABASE_URL` and `SUPABASE_ANON_KEY` override the
hardcoded fallback values in `server.js`.

---

## Conventions & Guidelines

1. **Never alter unrelated modules** when making targeted changes. Confirm scope before editing.
2. **Always check both HTML files** (index.html + homepage.html) for every HTML/inline-script change.
3. **Preserve all existing comments** and docstrings unless explicitly told to remove them.
4. **Use `escapeHtml(value)`** for all user-supplied content rendered into innerHTML.
5. **Validate CSS brace balance** after any spis-modules.css edit.
6. **No build tools** — changes are live on browser reload. No npm build step needed.
7. When removing UI elements (buttons, etc.), also remove their associated JS functions only if they are no longer called anywhere else.

