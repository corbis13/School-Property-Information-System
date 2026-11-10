<div align="center">

<img src="SchoolPropertyInventorySystem/images/spis_town.png" alt="SPIS Logo" width="170" />

# School Property Information System (SPIS)

**A centralized web application for school property and inventory management**

<p>
  <a href="https://github.com/corbis13/School-Property-Information-System">
    <img src="https://img.shields.io/badge/project-SPIS-2563EB?style=for-the-badge" alt="SPIS project" />
  </a>
  <img src="https://img.shields.io/badge/status-active%20development-blue?style=for-the-badge" alt="Active development" />
  <img src="https://img.shields.io/badge/database-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/runtime-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="MIT License" /></a>
</p>

</div>

---

## Overview

The **School Property Information System (SPIS)** is designed to help schools organize, monitor, and manage property information in one place. It brings property records, inventory-related workflows, personnel accountability, documents, and reporting into a centralized web-based platform.

## Dashboard Preview

<p align="center">
  <img src="docs/screenshots/spis-dashboard.png" alt="SPIS application dashboard" width="100%" />
</p>
<p align="center"><em>SPIS dashboard</em></p>

## Features & Modules

| Module | Purpose |
|---|---|
| **Dashboard** | View property summaries, recent activity, and system alerts |
| **Inventory** | Register, organize, and maintain school property records; alerts flag duplicate SEP/PPE numbers |
| **Documents** | Manage property documents, including Inventory Custodian Slips (ICS); alerts flag duplicate Inventory Item Nos. |
| **QR Code** | Generate and download property QR codes with the item description shown beneath the code |
| **Personnel** | Maintain personnel records related to property accountability |
| **Reports** | Generate property and inventory reports, including acquisition- and issuance-year breakdowns |

### Activity and notifications

- **Recent Activity** shows inventory, QR download, and saved document events. Select **View All** in the dashboard card to open the full, read-only activity list in a new tab; records are sorted newest first.
- The notification bell identifies duplicate SEP/PPE numbers in Inventory and duplicate Inventory Item Nos. in ICS records. Selecting either alert opens and highlights the corresponding record card.
- Notification alerts also cover missing property numbers, unassigned custodians, and asset status concerns. Alerts can be reviewed and ignored from **View all**.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Application server | Node.js, Express |
| Database & backend services | Supabase |

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- A [Supabase](https://supabase.com/) project

### 1. Clone the repository

```bash
git clone https://github.com/corbis13/School-Property-Information-System.git
cd School-Property-Information-System
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local `.env` file based on `.env.example` and supply the values required by your setup.

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start the application

```bash
npm run dev
```

Open the local address displayed in your terminal. If your project uses a different start script, check the scripts section in `package.json`.

## Supabase & Database Notes

Database setup resources are located in the application directory. Review the SQL setup scripts and policies before applying them to your Supabase project.

- Enable Row Level Security (RLS) on tables exposed through the Supabase API.
- Use least-privilege policies and test access for each user role.
- Keep service-role keys and other secrets on trusted server-side code only.
- Never commit real credentials or private environment files to GitHub.

> **Security reminder:** A Supabase anon/publishable key is intended for client use only when database permissions and RLS policies are correctly configured. It is not a replacement for access control.

## Repository Structure

```text
.
├── docs/
│   └── screenshots/
│       └── spis-dashboard.png
├── SchoolPropertyInventorySystem/
│   ├── images/              # Logo and application images
│   ├── css/                 # Stylesheets
│   ├── js/                  # Frontend scripts
│   ├── reports/             # Printable report templates
│   ├── index.html           # Application entry and dashboard
│   ├── homepage.html         # Mirrored dashboard entry
│   ├── recent-activity.html # Read-only activity history
│   ├── *-year-report.html   # Acquisition and issuance year reports
│   └── supabase-setup.sql   # Database setup script
├── server.js
├── package.json
├── README.md
└── LICENSE
```

## Development Roadmap

- [ ] Refine property inventory workflows
- [ ] Improve property documents and reporting
- [ ] Strengthen authentication and Supabase RLS policies
- [x] Add dashboard screenshot to project documentation

## Feedback & Contributions

Found an issue or have an improvement idea? Please open a [GitHub Issue](https://github.com/corbis13/School-Property-Information-System/issues) with details, steps to reproduce, and expected behavior. Contributions and constructive feedback are welcome.

## License

SPIS is licensed under the **[MIT License](LICENSE)**. You may use, modify, and distribute the software under the terms of that license.

---

<div align="center">

**School Property Information System (SPIS)**  
*Organizing school property information—one system at a time.*

</div>
