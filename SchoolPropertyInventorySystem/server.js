import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use('/SchoolPropertyInventorySystem', express.static(__dirname));

app.get('/', (req, res) => {
  res.redirect(302, '/SchoolPropertyInventorySystem/');
});

// ------------------------------------------------------------
// Logo upload endpoint – receives a Base64 data URL and saves the
// image into the project's "images" folder, returning a relative
// URL that can be stored in `school_logo_url`.
// ------------------------------------------------------------
// Primary endpoint (root) – used when the app is served from the project root
app.post('/upload-logo', express.json({ limit: '20mb' }), (req, res) => {
    console.log('🔧 /upload-logo called');
    const { fileName, dataUrl } = req.body;
    console.log('Received fileName:', fileName);
    if (!fileName || !dataUrl) {
        console.warn('Missing fileName or dataUrl');
        return res.status(400).json({ error: 'Missing fileName or dataUrl' });
    }
    // Expect format: data:image/png;base64,AAA...
    const matches = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!matches) {
        console.warn('Invalid data URL format');
        return res.status(400).json({ error: 'Invalid data URL format' });
    }
    const [, mime, base64] = matches;
    const buffer = Buffer.from(base64, 'base64');
    // __dirname already points to the "SchoolPropertyInventorySystem" directory,
    // so we only need to append the "images" subfolder.
    const imagesDir = path.join(__dirname, 'images');
    try {
        fs.mkdirSync(imagesDir, { recursive: true });
        const filePath = path.join(imagesDir, fileName);
        console.log('Saving logo to', filePath);
        fs.writeFileSync(filePath, buffer);
        const urlPath = `/SchoolPropertyInventorySystem/images/${fileName}`;
        console.log('✅ Logo saved, URL:', urlPath);
        return res.json({ url: urlPath });
    } catch (e) {
        console.error('Failed to save uploaded logo:', e);
        return res.status(500).json({ error: 'Failed to save file' });
    }
});

// Alias endpoint when the app is accessed via the "/SchoolPropertyInventorySystem" prefix.
app.post('/SchoolPropertyInventorySystem/upload-logo', express.json({ limit: '20mb' }), (req, res) => {
    console.log('🔧 /SchoolPropertyInventorySystem/upload-logo called (alias)');
    // Reuse the same handler logic by delegating to the original route handler
    // Express does not allow calling a route directly, so we copy the implementation.
    const { fileName, dataUrl } = req.body;
    if (!fileName || !dataUrl) {
        return res.status(400).json({ error: 'Missing fileName or dataUrl' });
    }
    const matches = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!matches) {
        return res.status(400).json({ error: 'Invalid data URL format' });
    }
    const [, mime, base64] = matches;
    const buffer = Buffer.from(base64, 'base64');
    const imagesDir = path.join(__dirname, 'images');
    try {
        fs.mkdirSync(imagesDir, { recursive: true });
        const filePath = path.join(imagesDir, fileName);
        console.log('Saving logo to', filePath);
        fs.writeFileSync(filePath, buffer);
        const urlPath = `/SchoolPropertyInventorySystem/images/${fileName}`;
        console.log('✅ Logo saved, URL:', urlPath);
        return res.json({ url: urlPath });
    } catch (e) {
        console.error('Failed to save uploaded logo (alias):', e);
        return res.status(500).json({ error: 'Failed to save file' });
    }
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
