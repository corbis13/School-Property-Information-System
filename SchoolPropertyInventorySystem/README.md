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
- **Add Personnel** – register a new faculty or staff member via modal card into `school_teacher`, with automatic stat card / directory / dropdown updates and immediate switch to their new profile.
- **Profile card**
  - **Edit Profile** modal (updates `school_teacher`).
  - The linked personnel profile displays the signed-in Google account's profile picture; other profiles remain view-only for Users.
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

Run [supabase-setup.sql](supabase-setup.sql) after creating the project. The script creates the inventory and lookup tables (including the `asset_images` photo metadata table), configures authenticated role-based access and the limited public QR lookups, and creates the `property-images` Storage bucket.

#### Removing legacy personnel photos

The setup script drops `school_teacher.photo_url` and removes all `personnel-photos` Storage policies. To reclaim space used by existing profile photos, first delete the contents of the `personnel-photos` bucket and then delete the bucket from **Supabase Dashboard → Storage**. This permanently deletes those stored files. Supabase Storage files should be removed through the Storage dashboard or API, not by deleting rows from `storage.objects`.

### Google sign-in

The app uses Google-only sign-in with no separate registration page or role selector. The designated Admin account has full access and can manage roles. New Google accounts are automatically assigned the User role, which can open Dashboard and Personnel, edit only the unique personnel profile matching their signed-in email, and cannot add personnel profiles or ICS slips. Other personnel profiles remain view-only. A User with no unique matching personnel email is blocked from the dashboard until the email is corrected. The mismatch flow requires the Employee ID and a one-time code sent to the email currently stored on that personnel record; the corrected address must match the verified sign-in email. Changing the sign-in email uses Supabase's normal email-change confirmation. SPIS RLS continues to prevent Users from updating arbitrary personnel rows.

To enable secure self-service correction of mismatched personnel emails:

1. From the repository root, run `supabase login`, link the Supabase project with `supabase link --project-ref <project-ref>`, then deploy with `supabase functions deploy repair-personnel-email`. JWT verification is enabled in `supabase/config.toml`. The function uses Supabase's `SUPABASE_SERVICE_ROLE_KEY` only on the server to update the verified row; never place that key in browser code or commit it.
2. In Supabase Authentication, enable the Email provider, configure SMTP delivery and an email OTP template that displays `{{ .Token }}`, and configure email-change confirmation. Ensure the SPIS app URL is in the allowed redirect URLs.
3. The correction flow intentionally uses `shouldCreateUser: false`. The email receiving the OTP must already exist as a Supabase Auth user; otherwise an Admin must correct the personnel email. This avoids creating extra Auth accounts or automatically granting extra User roles just to verify an address.

The function verifies the signed-in Google session, the OTP-verified mailbox, the Employee ID, the stored email, and duplicate target emails before updating `school_teacher.email`. No additional SQL migration is required.

To bootstrap the first Admin account:

1. Apply the complete [supabase-setup.sql](supabase-setup.sql) script in Supabase SQL Editor.
2. Sign in once with the Google account that should become Admin. The account will appear in `spis_user_roles` with the User role.
3. In SQL Editor, assign that account the single Admin slot by replacing the example email and running:

   ```sql
   update public.spis_user_roles
   set role = 'admin', updated_at = now()
   where lower(email) = lower('admin@your-school.edu')
   returning user_id, email, role;
   ```

4. Reload SPIS and sign in again. The account role appears in the user menu. New Google accounts are automatically assigned `User`; the Admin can change an account to no access from **System Settings → Manage User Roles**. Existing accounts that signed in before automatic User assignment was enabled must be assigned a role by the Admin. Assigning Admin to another account transfers the single Admin role; the former Admin becomes a User.

To enable OAuth:

1. In Supabase Authentication settings, enable the Google provider and enter the Google OAuth client ID and secret.
2. In Supabase Authentication → URL Configuration, set the Site URL to `https://corbis13.github.io/School-Property-Information-System/` and add these Redirect URLs:
   - `http://localhost:3000/SchoolPropertyInventorySystem/**`
   - `https://corbis13.github.io/School-Property-Information-System/SchoolPropertyInventorySystem/**`
3. In the Google OAuth client, add this Authorized redirect URI (shown in Supabase's Google provider settings): `https://ouqgkytallctnptshefo.supabase.co/auth/v1/callback`.

For GitHub Pages, publish the repository's `main` branch from the repository root in **Settings → Pages**. The root `index.html` forwards visitors to `SchoolPropertyInventorySystem/`. The app uses its public Supabase URL and publishable key as browser fallbacks, so it does not depend on the local Express server's generated, git-ignored `supabase-config.js` file. After pushing changes, wait for the Pages deployment to finish and reload the deployed URL.

The Google client secret belongs in Supabase's dashboard; do not add it to this repository.

### Storage

- `property-images` (public bucket) – up to 5 JPG, PNG, or WebP photos per asset, limited to 3 MB each. Photos and their primary-image metadata are managed from the Inventory Property Details form. Anyone with a photo URL can view its contents.

### Expected tables

- assets
- asset_images (property photo metadata; columns: `asset_id`, `file_path`, `is_primary`)
- classifications
- statuses (source for status options; column: `status_name`)
- inventory_item (source for inventory item type options; column: `inventory_item_type`)
- school_teacher (Personnel Accountability records; columns: `teacher_name`, `first_name`, `middle_name`, `last_name`, `employee_id`, `item_no`, `phone`, `email`, `plantilla_position`, `school_level`, `personnel_type`, `school_name`, `employment_status`, `birthday`, `original_appointment`, `date_of_last_promotion`, `status`)
- signatories (managed in Settings and used for report signatory options; columns: `signatory`, `position`, `assumption_date`)
- ics_slips (Inventory Custodian Slip headers)
- ics_slip_items (line items linked to slips; `asset_id` is filled when the item was picked from inventory)
- rspi_reports (Report of Semi-Expendable Property Issued base records)
- rspi_report_items (saved item snapshots linked to RSPI records and source ICS items)
- qr_download_history (QR download snapshots; includes `asset_id`, `inventory_item_no`, `property_no`, `item_brand_model`, `download_count`, and timestamps)

QR Download History displays the asset's inventory item number from `inventory_item_no`, falling back to `property_no` or `semi_expandable_no` when needed. The history table stores that value in its `inventory_item_no` snapshot column; the Asset ID remains only the record key.

### Expected asset columns

The Inventory form's School Level and Position are populated from the selected accountable person's `school_teacher.school_level` and `school_teacher.plantilla_position`, then saved to `assets.school_level` and `assets.plantilla_position`. The ICS form's Estimated Useful Life is populated from the selected asset's `assets.est_useful_life` and saved to the ICS item.

```text
asset_id, property_classification, property_value, fund_cluster, inventory_type, property_no, item_classification, item_brand_model, serial_no, acquisition_date, est_useful_life, accountable_person, plantilla_position, school_level, semi_expandable_no, unit_value, total, unit_measurement, balance, on_hand, shortage_overage_qty, shortage_overage_value, location, mooe_month, mooe_year, date_issue, status, additional_item, remarks, created_at, updated_at
```

### Expected classification columns

```text
classification_name
```

### QR asset detail page

The QR payload encodes the GitHub Pages asset detail URL:

`https://corbis13.github.io/School-Property-Information-System/SchoolPropertyInventorySystem/asset.html?assetId=AST000001`

QR scanning opens the asset detail page automatically. Keep the `assetUrl` value in `supabase-config.js` pointed at the GitHub Pages deployment.

The QR code on a generated ICS PDF opens the public, read-only `ics-view.html` page for that slip's ICS No. Its Supabase `get_public_ics_slip` function returns only that slip's printed header and line-item fields; it does not grant anonymous table access. Run `supabase-setup.sql` to create or refresh this function.

Asset QR pages are publicly viewable without signing in. The `get_public_asset_qr` function returns the fields shown on the asset detail page, and `get_public_asset_images` returns only photo paths for the requested asset. Both functions are read-only and granted to the Supabase `anon` role; direct anonymous reads and writes to the `assets` and `asset_images` tables remain disabled. Run `supabase-setup.sql` to enable or refresh these QR lookups.

The asset hero card reads Accountable Person, Position/Designation, School Level, and Assigned Location from `get_public_asset_qr`, which selects those values from `assets`. The lookup returns `assets.plantilla_position` for the Position/Designation card. After applying changes to this lookup, run `supabase-setup.sql`; it recreates the function and notifies PostgREST to reload its schema. The setup script also fills blank asset designations from the matched accountable person's `school_teacher.plantilla_position` for existing records.

## Security note

The browser UI requires Google sign-in and an assigned SPIS role. Supabase RLS enforces role permissions on table and Storage requests; hiding a module or button is only a user-interface aid. Public asset and ICS QR pages use limited-field, read-only RPCs for anonymous access. Run [`supabase-setup.sql`](supabase-setup.sql) in Supabase to install or refresh the role table, single-Admin constraint, role policies, and public QR lookups.

## Legacy files

- `homepage.html` / `homepage.js` / `homepage.css` form a standalone dashboard that is not linked from the main app entry (`index.html`). It can be removed or promoted to a landing page.
