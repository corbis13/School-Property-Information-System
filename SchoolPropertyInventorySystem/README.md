# Property Inventory System

A browser-based School Property Information System (SPIS) with QR code generation for each item, Inventory Custodian Slip (ICS) / RSPI document generation, and Personnel Accountability tracking.

## Running locally

From the repository root:

```powershell
npm install
npm run dev
```

The Express server (`server.js`) serves the app at `http://localhost:3000` (redirects to `/SchoolPropertyInventorySystem/`) and injects `supabase-config.js` from the `SUPABASE_URL` / `SUPABASE_ANON_KEY` environment variables. There is no build step — reload the browser after editing HTML/CSS/JS.

> `index.html` and `homepage.html` are mirrors. Any HTML or inline-script change must be applied to **both** files.

## Modules

- **Dashboard** – stat cards, school-level / status / acquisition-year / category charts, recent assets.
- **Inventory** – asset CRUD, search/filter, pagination, QR generation and download history.
- **Document (ICS / RSPI)** – create, edit, delete and export Inventory Custodian Slips to PDF; build RSPI reports from ICS items.
- **Reports** – printable physical count and other reports (13 × 8.5 in landscape PDF export).
- **Personnel** – directory and per-person accountability profile (see below).

### Personnel Accountability

- **Personnel Directory** – searchable list sorted by latest update / newly recorded on top (1st row), with School Level and Status filters (white search/filter controls, equal 200px width on desktop, full-width on mobile) and per-person item counts.
- **Add Personnel** – register a new faculty or staff member via modal card into `school_teacher`, with photo URL / upload (WebP conversion to `personnel-photos` bucket), automatic stat card / directory / dropdown updates, and immediate switch to their new profile.
- **Profile card**
  - **Edit Profile** modal (updates `school_teacher`).
  - **Change photo** (camera button) – picks an image, converts it to **WebP** in the browser, uploads it to the `personnel-photos` Supabase Storage bucket and saves the URL to `school_teacher.photo_url` (falls back to a data URL if Storage is unavailable).
  - **Add ICS** – opens a modal duplicate of the ICS template with **Received By** locked to the selected personnel. Selecting an inventory item auto-fills item no., unit, unit cost and total. Saving creates the ICS record and updates the asset's accountable person.
- **Tabs** – Properties, History, Documents, Activity Log. The Properties tab lists the person's ICS records plus assets assigned to them that are still pending an ICS.

### ICS → Inventory accountability sync

When an ICS is saved (from the Document module or the Personnel **Add ICS** modal), the matched asset's **Person Accountable** (`assets.accountable_person`) is updated to the slip's **Received By** value. Its status becomes `Assigned` if it was `Available`, and the issue date is filled in if empty. Because of this, a re-delegated property shows up **only** under the current accountable person in the Personnel Properties tab. Older slips for that item stop appearing under the previous holder.

## Supabase Database

The app is configured to use Supabase as its primary backend.

### Required config

`supabase-config.js` is listed in `.gitignore` and is **not committed to the repository**.

To get started:

1. Copy `supabase-config.example.js` → `supabase-config.js`
2. Fill in your Supabase **Project URL** and **anon / public key** (Project Settings → API in the Supabase dashboard).
3. Set `assetUrl` to the GitHub Pages URL of `asset.html` (used as the QR code payload).

Run [supabase-setup.sql](supabase-setup.sql) after creating the project. The script creates the `inventory_item`, `school_teacher`, and `signatories` lookup tables, configures public read/write policies for this no-login app, and creates the `personnel-photos` Storage bucket.

### Storage

- `personnel-photos` (public bucket) – personnel profile photos uploaded as WebP from the Personnel profile card. The setup script adds public select/insert/update policies for this bucket.

### Expected tables

- assets
- classifications
- statuses (source for status options; column: `status_name`)
- inventory_item (source for inventory item type options; column: `inventory_item_type`)
- education_level (source for education level options; column: `education_level`)
- school_teacher (Personnel Accountability records; columns: `teacher_name`, `employee_id`, `position`, `plantilla_position`, `school_level`, `personnel_type`, `grade_section`, `email`, `phone`, `school_name`, `location`, `date_hired`, `employment_status`, `status`, `photo_url`)
- signatories (source for report signatory options; column: `signatory`)
- ics_slips (Inventory Custodian Slip headers)
- ics_slip_items (line items linked to slips; `asset_id` is filled when the item was picked from inventory)
- rspi_reports (Report of Semi-Expendable Property Issued base records)
- rspi_report_items (saved item snapshots linked to RSPI records and source ICS items)

### Expected asset columns

```text
asset_id, education_level, fund_cluster, inventory_type, property_no, item_classification, item_brand_model, serial_no, acquisition_date, accountable_person, school_level, semi_expandable_no, unit_value, total, unit_measurement, balance, on_hand, shortage_overage_qty, shortage_overage_value, location, mooe_month, mooe_year, date_issue, status, additional_item, remarks, created_at, updated_at
```

### Expected classification columns

```text
classification_name
```

### QR asset detail page

The QR payload encodes the GitHub Pages asset detail URL:

`https://corbis13.github.io/School-Property-Information-System/SchoolPropertyInventorySystem/asset.html?assetId=AST000001`

QR scanning opens the asset detail page automatically. Keep the `assetUrl` value in `supabase-config.js` pointed at the GitHub Pages deployment.

## Security note

This is a no-login client app, so the policies in [`supabase-setup.sql`](supabase-setup.sql) currently grant the public `anon` role full **read/write/delete** access to the inventory tables (required for the app to function without authentication). See the **Production hardening** section at the bottom of `supabase-setup.sql` for the recommended migration to `authenticated`-only mutations before a real deployment.

## Legacy files

- `google-apps-script.gs` is the retired Google Sheets backend. The app now talks to Supabase directly; this file is kept for reference only and is not wired into the app.
- `homepage.html` / `homepage.js` / `homepage.css` form a standalone dashboard that is not linked from the main app entry (`index.html`). It can be removed or promoted to a landing page.
