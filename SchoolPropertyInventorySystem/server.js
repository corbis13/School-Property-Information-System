import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use('/SchoolPropertyInventorySystem', express.static(__dirname));

app.get('/', (req, res) => {
  res.redirect(302, '/SchoolPropertyInventorySystem/');
});

app.get(['/property-category-report', '/property-category-report.html', '/category-report', '/category-report.html'], (req, res) => {
  const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  res.redirect(302, `/SchoolPropertyInventorySystem/property-category-report.html${query}`);
});

app.get(['/maintenance-requests-report', '/maintenance-requests-report.html', '/maintenance-report', '/maintenance-report.html'], (req, res) => {
  const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  res.redirect(302, `/SchoolPropertyInventorySystem/maintenance-requests-report.html${query}`);
});

app.get(['/issuance-year-report', '/issuance-year-report.html'], (req, res) => {
  const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  res.redirect(302, `/SchoolPropertyInventorySystem/issuance-year-report.html${query}`);
});

app.get(['/acquisition-year-report', '/acquisition-year-report.html'], (req, res) => {
  const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  res.redirect(302, `/SchoolPropertyInventorySystem/acquisition-year-report.html${query}`);
});

app.get(['/accountable-person-report', '/accountable-person-report.html'], (req, res) => {
  const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  res.redirect(302, `/SchoolPropertyInventorySystem/accountable-person-report.html${query}`);
});

app.get('/asset.html', (req, res) => {
  const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  res.redirect(302, `/SchoolPropertyInventorySystem/asset.html${query}`);
});

app.get(['/homepage', '/homepage.html', '/dashboard'], (req, res) => {
  const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  res.redirect(302, `/SchoolPropertyInventorySystem/index.html${query}`);
});

app.get(['/SchoolPropertyInventorySystem/supabase-config.js', '/supabase-config.js'], (req, res) => {
  res.type('application/javascript');
  const url = process.env.SUPABASE_URL || 'https://ouqgkytallctnptshefo.supabase.co';
  const anonKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_UDhp6lrRgVppuqH6Uu4Izg_zp7T-_WS';
  res.send(`const __SPIS_CONFIG = {
    url: ${JSON.stringify(url)},
    anonKey: ${JSON.stringify(anonKey)},
    assetUrl: (typeof window !== "undefined" && window.location ? window.location.origin : "") + "/SchoolPropertyInventorySystem/asset.html"
};
window.SUPABASE_CONFIG = __SPIS_CONFIG;`);
});

app.use(express.static(__dirname));

app.get('/SchoolPropertyInventorySystem/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'SchoolPropertyInventorySystem', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
