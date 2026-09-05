import puppeteer from "puppeteer-core";
import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "fs";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "../dist");
const PORT = 9876;
const ROUTES = ["/", "/about", "/blog"];

const MIME = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

const CHROME_PATHS = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
];

function findChrome() {
  for (const p of CHROME_PATHS) {
    if (existsSync(p)) return p;
  }
  throw new Error(
    "Chrome not found. Install Google Chrome or set CHROME_PATH env variable."
  );
}

function startServer() {
  const server = createServer((req, res) => {
    const urlPath = (req.url || "/").split("?")[0];
    let filePath = join(DIST, urlPath);

    if (existsSync(filePath) && statSync(filePath).isFile()) {
      // exact file match
    } else if (existsSync(join(filePath, "index.html"))) {
      filePath = join(filePath, "index.html");
    } else {
      filePath = join(DIST, "index.html"); // SPA fallback
    }

    try {
      const content = readFileSync(filePath);
      const ext = extname(filePath);
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });

  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function renderStatic() {
  const executablePath = process.env.CHROME_PATH || findChrome();
  const server = await startServer();

  const browser = await puppeteer.launch({
    executablePath,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });
      const html = await page.content();

      const outDir = route === "/" ? DIST : join(DIST, route);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, "index.html"), html);
      console.log(`✓ pre-rendered ${route}`);
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

renderStatic().catch((err) => {
  console.error("⚠️  Static render failed:", err.message);
  process.exit(1);
});
