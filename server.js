import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve SchoolPropertyInventorySystem as static directory
const staticOptions = {
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  }
};

app.use('/SchoolPropertyInventorySystem', express.static(path.join(__dirname, 'SchoolPropertyInventorySystem'), staticOptions));
app.use(express.static(path.join(__dirname, 'SchoolPropertyInventorySystem'), staticOptions));

// Serve root directly with SchoolPropertyInventorySystem/index.html
app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'SchoolPropertyInventorySystem', 'index.html'));
});

// Dynamic supabase-config.js delivery
app.get(['/SchoolPropertyInventorySystem/supabase-config.js', '/supabase-config.js'], (req, res) => {
  res.type('application/javascript');
  const url = process.env.SUPABASE_URL || 'https://ouqgkytallctnptshefo.supabase.co';
  const anonKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_UDhp6lrRgVppuqH6Uu4Izg_zp7T-_WS';
  const assetUrl = process.env.ASSET_URL || 'https://corbis13.github.io/School-Property-Information-System/SchoolPropertyInventorySystem/asset.html';
  res.send(`window.SUPABASE_CONFIG = {
    url: ${JSON.stringify(url)},
    anonKey: ${JSON.stringify(anonKey)},
    assetUrl: ${JSON.stringify(assetUrl)}
};`);
});

// Report routes and direct pages
app.get(['/property-category-report', '/property-category-report.html', '/category-report', '/category-report.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'SchoolPropertyInventorySystem', 'property-category-report.html'));
});

app.get(['/maintenance-requests-report', '/maintenance-requests-report.html', '/maintenance-report', '/maintenance-report.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'SchoolPropertyInventorySystem', 'maintenance-requests-report.html'));
});

app.get(['/issuance-year-report', '/issuance-year-report.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'SchoolPropertyInventorySystem', 'issuance-year-report.html'));
});

app.get(['/acquisition-year-report', '/acquisition-year-report.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'SchoolPropertyInventorySystem', 'acquisition-year-report.html'));
});

app.get(['/accountable-person-report', '/accountable-person-report.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'SchoolPropertyInventorySystem', 'accountable-person-report.html'));
});

app.get('/asset.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'SchoolPropertyInventorySystem', 'asset.html'));
});

app.get(['/homepage', '/homepage.html', '/dashboard'], (req, res) => {
  res.sendFile(path.join(__dirname, 'SchoolPropertyInventorySystem', 'index.html'));
});

// Fallback to SchoolPropertyInventorySystem/index.html
app.get(['/SchoolPropertyInventorySystem/*', '*'], (req, res) => {
  res.sendFile(path.join(__dirname, 'SchoolPropertyInventorySystem', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
