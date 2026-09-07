# School Property Information System - AI Instructions

These instructions apply to every AI agent, model, subscription, and coding session working in this repository.

## Project Context

- This is a static browser application for managing school property and inventory records.
- The main application is in `SchoolPropertyInventorySystem/`.
- The application uses plain HTML, CSS, and JavaScript. Do not migrate it to a framework unless explicitly requested.
- The main entry point is `SchoolPropertyInventorySystem/index.html`.
- Application behavior is primarily implemented in:
  - `SchoolPropertyInventorySystem/js/app.js`
  - `SchoolPropertyInventorySystem/js/asset.js`
  - `SchoolPropertyInventorySystem/js/homepage.js`
- Styling is primarily implemented in:
  - `SchoolPropertyInventorySystem/css/spis-modules.css`
  - `SchoolPropertyInventorySystem/css/homepage.css`
  - `SchoolPropertyInventorySystem/css/style.css`
- Supabase configuration and database setup are in `supabase-config.js`, `supabase-config.example.js`, and `supabase-setup.sql`.

## Preservation Rules

1. Read the relevant HTML, JavaScript, and CSS before editing. Follow existing IDs, classes, data attributes, function names, and module boundaries.
2. Preserve existing user changes. Never reset, overwrite, or delete unrelated work.
3. Keep changes focused. Do not reformat or rewrite large files when a small local change is sufficient.
4. Preserve the existing public behavior of Dashboard, Inventory, QR Code, Document, Report, Settings, and About modules unless the task explicitly changes that behavior.
5. Keep the application compatible with static hosting and direct browser opening. Do not add a server requirement without explicit approval.
6. Do not expose Supabase keys, credentials, or secrets in committed files. Use the existing configuration pattern.
7. Treat data stored in Supabase and browser local storage as user data. Do not change field names, table names, or data formats without checking every read and write path.
8. Keep HTML element IDs stable because JavaScript data binding depends on them.
9. Use existing libraries and visual patterns already present in the project. Avoid unnecessary dependencies.
10. Keep edits ASCII unless the file already requires another character set.

## Required Workflow

Before editing:

- Identify the smallest file and code path that controls the requested behavior.
- State a concrete hypothesis about the issue or desired behavior.
- Identify one cheap check that could disprove the hypothesis.

After every substantive edit:

- Run the narrowest available validation immediately.
- Check for syntax errors in edited JavaScript and HTML.
- Test the affected interaction in a browser when the change affects UI behavior.
- Confirm that the application still loads when Supabase is unavailable, using its existing fallback behavior.
- Check the browser console for new errors.

Before finishing:

- Verify all changed files are intentional.
- Test the affected module and at least one neighboring navigation path.
- Confirm no IDs, script paths, asset paths, or Supabase configuration references were accidentally broken.
- Report what changed and what validation was performed. Clearly state any validation that could not be run.

## UI and Interaction Rules

- Match the existing SPIS visual language: navy, blue, green, amber, compact operational layouts, and Lucide icons.
- Keep layouts usable on desktop and mobile. Avoid overlapping text, controls, or tables.
- Preserve accessible labels, button types, keyboard focus, `aria-*` attributes, and live regions.
- Use buttons for actions and links for navigation. Prevent placeholder links from unexpectedly changing the page.
- When adding a UI action, connect it to the existing module/navigation and data flow rather than creating a disconnected demo.

## Data and Security Rules

- Validate and normalize user input at the existing application boundary.
- Preserve existing calculations for totals, balances, shortage/overage values, and QR payloads unless explicitly requested.
- Do not silently discard records or replace real data with sample data.
- Do not log credentials, tokens, or full sensitive records to the console.
- If a database operation fails, preserve the app's fallback and user-facing error handling.

## Change Handoff Rules

- Treat changes from another AI agent, subscription, branch, or user as intentional unless they clearly prevent the requested work.
- Inspect and integrate existing changes; do not revert them just to simplify the task.
- If requirements conflict, preserve data and working behavior first, then ask for clarification.
- Leave a concise note in the final response naming files changed, behavior changed, tests run, and any remaining risk.
