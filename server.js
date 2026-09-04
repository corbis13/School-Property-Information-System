import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve SchoolPropertyInventorySystem as static directory
app.use('/SchoolPropertyInventorySystem', express.static(path.join(__dirname, 'SchoolPropertyInventorySystem')));

// Redirect root to /SchoolPropertyInventorySystem/
app.get('/', (req, res) => {
  res.redirect(302, '/SchoolPropertyInventorySystem/');
});

// Redirect /asset.html to /SchoolPropertyInventorySystem/asset.html if queried at root
app.get('/asset.html', (req, res) => {
  const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  res.redirect(302, `/SchoolPropertyInventorySystem/asset.html${query}`);
});

// Redirect homepage aliases to main applet
app.get(['/homepage', '/homepage.html', '/dashboard'], (req, res) => {
  const query = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  res.redirect(302, `/SchoolPropertyInventorySystem/index.html${query}`);
});

// Serve any other root static files (such as images, icons, etc.)
app.use(express.static(__dirname));

// Fallback to SchoolPropertyInventorySystem/index.html
app.get('/SchoolPropertyInventorySystem/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'SchoolPropertyInventorySystem', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
