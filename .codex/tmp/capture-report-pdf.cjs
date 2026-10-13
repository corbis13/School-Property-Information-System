const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const outDir = path.resolve(__dirname);
const pdfPath = path.join(outDir, "physical-count-report.pdf");
const appShotPath = path.join(outDir, "physical-report-app.png");
const pdfShotPath = path.join(outDir, "physical-count-report-pdf.png");

for (const target of [pdfPath, appShotPath, pdfShotPath]) {
  try {
    fs.unlinkSync(target);
  } catch (_) {}
}

function waitForFile(filePath, timeoutMs = 90000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
        resolve();
        return;
      }
      if (Date.now() - started > timeoutMs) {
        reject(new Error(`Timed out waiting for ${filePath}`));
        return;
      }
      setTimeout(tick, 500);
    };
    tick();
  });
}

(async () => {
  const browser = await chromium.launch({
    headless: process.env.PW_HEADLESS === "1",
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 950 },
    acceptDownloads: true,
  });

  await context.exposeBinding("saveGeneratedPdf", async (_source, dataUrl) => {
    const base64 = String(dataUrl).split(",")[1] || "";
    fs.writeFileSync(pdfPath, Buffer.from(base64, "base64"));
  });

  await context.addInitScript(() => {
    const originalCreateObjectURL = URL.createObjectURL.bind(URL);
    URL.createObjectURL = (obj) => {
      if (obj && obj.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = () => window.saveGeneratedPdf(reader.result);
        reader.readAsDataURL(obj);
      }
      return originalCreateObjectURL(obj);
    };
  });

  const page = await context.newPage();
  page.setDefaultTimeout(90000);
  page.on("console", (msg) => console.log(`[browser:${msg.type()}] ${msg.text()}`));

  await page.goto("http://localhost:3000/SchoolPropertyInventorySystem/", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForFunction(() => typeof window.showModule === "function");
  await page.evaluate(() => window.showModule("reports"));
  await page.waitForSelector("#physicalReport table", { state: "visible" });
  await page.waitForSelector("#generatePdfBtn", { state: "visible" });
  await page.screenshot({ path: appShotPath, fullPage: true });

  const popupPromise = page.waitForEvent("popup").catch(() => null);
  await page.click("#generatePdfBtn");
  const popup = await popupPromise;

  await waitForFile(pdfPath);

  if (!popup) {
    throw new Error(
      "The PDF was saved, but no PDF preview popup was opened to screenshot."
    );
  }

  await popup.waitForLoadState("domcontentloaded").catch(() => {});
  await popup.waitForTimeout(3500);
  await popup.screenshot({ path: pdfShotPath, fullPage: true });

  await browser.close();
  console.log(JSON.stringify({ pdfPath, appShotPath, pdfShotPath }, null, 2));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
