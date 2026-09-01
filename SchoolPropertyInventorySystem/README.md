# Property Inventory System

A browser-based Property Inventory System with QR code generation for each item.

## Supabase Database

The app is configured to use Supabase as its primary backend.

### Required config

`supabase-config.js` is listed in `.gitignore` and is **not committed to the repository**.

To get started:

1. Copy `supabase-config.example.js` → `supabase-config.js`
2. Fill in your Supabase **Project URL** and **anon / public key** (Project Settings → API in the Supabase dashboard).
3. Set `assetUrl` to the GitHub Pages URL of `asset.html` (used as the QR code payload).

Run [supabase-setup.sql](supabase-setup.sql) after creating the project. The script creates the `inventory_item`, `geras_teacher`, and `signatories` lookup tables and configures public read/write policies for this no-login app.

### Expected tables

- assets
- classifications
- statuses (source for status options; column: `status_name`)
- inventory_item (source for inventory item type options; column: `inventory_item_type`)
- education_level (source for education level options; column: `education_level`)
- geras_teacher (source for accountable-person options; columns: `teacher_name`, `position`, `school_level`)
- signatories (source for report signatory options; column: `signatory`)
- ics_slips (Inventory Custodian Slip headers)
- ics_slip_items (line items linked to slips and optional assets)

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
