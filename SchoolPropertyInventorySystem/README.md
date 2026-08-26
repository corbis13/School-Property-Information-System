# Property Inventory System

A browser-based Property Inventory System with QR code generation for each item.

## Supabase Database

The app is configured to use Supabase as its primary backend.

### Required config

Update [supabase-config.js](supabase-config.js) with your Supabase URL and anon key.

Run [supabase-setup.sql](supabase-setup.sql) after creating the project. The script creates the `inventory_item` and `geras_teacher` lookup tables and configures public read/write policies for this no-login app.

### Expected tables

- assets
- classifications
- inventory_item (source for inventory item type options)
- education_level (source for education level options; column: `education_level`)

### Expected asset columns

```text
asset_id, education_level, fund_cluster, inventory_type, property_no, item_classification, item_brand_model, serial_no, acquisition_date, accountable_person, school_level, semi_expandable_no, unit_value, total, unit_measurement, balance, on_hand, shortage_overage_qty, shortage_overage_value, location, mooe_month, mooe_year, date_issue, status, remarks, created_at, updated_at
```

### Expected classification columns

```text
classification_name
```

### QR asset detail page

The QR payload now encodes a public asset detail URL such as:

`https://yourdomain.com/asset.html?assetId=AST000001`

To make QR scanning open the detail page automatically, host the app on a public web server and update `supabase-config.js` `assetUrl` to your hosted `asset.html` location.
