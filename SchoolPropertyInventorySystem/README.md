# Property Inventory System

A browser-based Property Inventory System with QR code generation for each item.

## Supabase Database

The app is configured to use Supabase as its primary backend.

### Required config

Update [supabase-config.js](supabase-config.js) with your Supabase URL and anon key.

### Expected tables

- assets
- classifications

### Expected asset columns

```text
asset_id, fund_cluster, property_no, item_classification, item_brand_model, serial_no, acquisition_cost, acquisition_date, accountable_person, date_issue, status, remarks, created_at, updated_at
```

### Expected classification columns

```text
classification_name
```

### QR asset detail page

The QR payload now encodes a public asset detail URL such as:

`https://yourdomain.com/asset.html?assetId=AST000001`

To make QR scanning open the detail page automatically, host the app on a public web server and update `supabase-config.js` `assetUrl` to your hosted `asset.html` location.
