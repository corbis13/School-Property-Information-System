# Property Inventory System

A browser-based Property Inventory System with QR code generation for each item.

## Supabase Database

The app is configured to use Supabase as its primary backend.

### Required config

Update [supabase-config.js](supabase-config.js) with your Supabase URL and anon key.

Run [supabase-setup.sql](supabase-setup.sql) after creating the project. The script creates the `inventory_item`, `geras_teacher`, and `signatories` lookup tables and configures public read/write policies for this no-login app.

### Expected tables

- assets
- classifications
- inventory_item (source for inventory item type options)
- education_level (source for education level options; column: `education_level`)
- signatories (source for report signatory options; column: `signatory`)
- ics_slips (Inventory Custodian Slip headers)
- ics_slip_items (line items linked to slips and optional assets)

### Expected asset columns

```text
asset_id, education_level, fund_cluster, inventory_type, property_no, item_classification, item_brand_model, serial_no, acquisition_date, accountable_person, school_level, semi_expandable_no, unit_value, total, unit_measurement, balance, on_hand, shortage_overage_qty, shortage_overage_value, location, mooe_month, mooe_year, date_issue, status, remarks, created_at, updated_at
```

### Expected classification columns

```text
classification_name
```

### QR asset detail page

The QR payload encodes the GitHub Pages asset detail URL:

`https://corbis13.github.io/School-Property-Information-System/SchoolPropertyInventorySystem/asset.html?assetId=AST000001`

QR scanning opens the asset detail page automatically. Keep the `assetUrl` value in `supabase-config.js` pointed at the GitHub Pages deployment.
