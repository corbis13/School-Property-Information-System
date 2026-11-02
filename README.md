<div align="center">

# School Property Information System

### SPIS

A web-based platform for organizing, monitoring, and managing school properties, inventory records, and property-related reports.

<p>
  <img alt="Project status" src="https://img.shields.io/badge/status-in%20development-blue" />
  <img alt="Platform" src="https://img.shields.io/badge/platform-web%20application-0A7EA4" />
  <img alt="Database" src="https://img.shields.io/badge/database-Supabase-3ECF8E" />
  <img alt="License" src="https://img.shields.io/badge/license-not%20specified-lightgrey" />
</p>

</div>

---

## Overview

The **School Property Information System (SPIS)** is designed to support the recording, tracking, and reporting of school properties through a centralized web application. It aims to make property information easier to maintain, retrieve, and monitor.

> **Project status:** This project is under active development. Features, workflows, and deployment configuration may change.

## Key Modules

The repository includes application pages and supporting code for:

- **Dashboard and Homepage** – central entry point for the application.
- **Property / Asset Records** – manage school asset information.
- **Reports** – includes acquisition-year, issuance-year, property-category, and maintenance-request report pages.
- **Supabase Integration** – database setup scripts and example client configuration.
- **Server** – Node.js and Express application entry point.

## Technology

| Component | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Server | Node.js, Express |
| Database services | Supabase |
| Additional integration | Google Apps Script |

## Repository Structure

```text
.
├── SchoolPropertyInventorySystem/
│   ├── index.html
│   ├── homepage.html
│   ├── asset.html
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── reports/
│   ├── server.js
│   ├── supabase-setup.sql
│   ├── supabase-config.example.js
│   └── README.md
├── .env.example
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (included with Node.js)
- A [Supabase](https://supabase.com/) project with the required database configured

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

Copy `.env.example` to `.env` and provide the values for your environment.

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Do not commit real credentials, service-role keys, or other secrets. Keep local environment files private.

### 4. Start the application

```bash
npm run dev
```

Open the local address printed by the server in your terminal.

## Database Setup

Database setup resources are located in `SchoolPropertyInventorySystem/`:

- `supabase-setup.sql` – database schema and setup SQL.
- `supabase-config.example.js` – example client configuration.
- `supabase-sample-data.json` – sample data for development or testing.
- `fix-rls-permissions.sql` – supplementary RLS permission adjustments.

Review SQL scripts and Row Level Security (RLS) policies in your own Supabase project before applying them. Use least-privilege policies and never expose a Supabase service-role key in browser code.

## Development Commands

| Command | Description |
|---|---|
| `npm install` | Install project dependencies |
| `npm run dev` | Start the development server |
| `npm start` | Start the application |
| `npm run lint` | Run the configured Node.js syntax check |

## Screenshots

Add current screenshots of the SPIS interface here to help users understand the application.

Suggested screenshots:
- Dashboard
- Property and asset records
- Inventory reports
- Property document workflows

Place image files in a dedicated documentation folder (for example, `docs/screenshots/`) and link them here when available.

## Contributing

Contributions, bug reports, and suggestions are welcome. Please describe the issue, steps to reproduce it, and the expected result when submitting a report.

## License

No license has been specified yet. Unless a license is added to this repository, the default copyright rules apply and reuse is not automatically permitted.

---

<div align="center">

**School Property Information System (SPIS)**

*Improving the organization and management of school property information.*

</div>
