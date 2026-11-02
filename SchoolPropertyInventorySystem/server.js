import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';

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
const supabaseUrl = process.env.SUPABASE_URL || 'https://ouqgkytallctnptshefo.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_UDhp6lrRgVppuqH6Uu4Izg_zp7T-_WS';

async function uploadLogo(req, res) {
  const token = (req.get('authorization') || '').match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return res.status(401).json({ error: 'Sign-in required' });

  try {
    const authResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${token}` }
    });
    if (!authResponse.ok) return res.status(401).json({ error: 'Sign-in required' });
  } catch {
    return res.status(503).json({ error: 'Unable to verify sign-in' });
  }

  const dataUrl = req.body?.dataUrl;
  const match = typeof dataUrl === 'string'
    ? dataUrl.match(/^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/]+={0,2})$/)
    : null;
  if (!match) return res.status(400).json({ error: 'A PNG, JPEG, or WebP image is required' });

  const [, mime, base64] = match;
  const buffer = Buffer.from(base64, 'base64');
  if (!buffer.length || buffer.length > 512 * 1024 || buffer.toString('base64') !== base64) {
    return res.status(400).json({ error: 'Image must be smaller than 512 KB' });
  }
  const validSignature = mime === 'image/png'
    ? buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
    : mime === 'image/jpeg'
      ? buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
      : buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP';
  if (!validSignature) return res.status(400).json({ error: 'Image content does not match its type' });

  const extension = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' }[mime];
  const fileName = `${randomUUID()}.${extension}`;
  const imagesDir = path.join(__dirname, 'images');
  try {
    await fs.mkdir(imagesDir, { recursive: true });
    await fs.writeFile(path.join(imagesDir, fileName), buffer, { flag: 'wx' });
    return res.json({ url: `/SchoolPropertyInventorySystem/images/${fileName}` });
  } catch (error) {
    console.error('Failed to save uploaded logo:', error);
    return res.status(500).json({ error: 'Failed to save file' });
  }
}

app.post(['/upload-logo', '/SchoolPropertyInventorySystem/upload-logo'], express.json({ limit: '700kb' }), uploadLogo);
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
  res.redirect(302, `/SchoolPropertyInventorySystem/index.html?module=personnel`);
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