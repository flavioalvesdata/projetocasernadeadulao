/**
 * Capturas comparáveis dos protótipos A/B/C.
 * Uso: node ferramentas/capturar-prototipos.js
 * Não altera a versão principal do site.
 */
const path = require("path");
const fs = require("fs");
const http = require("http");
const { pathToFileURL } = require("url");
const { chromium } = require("@playwright/test");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "docs", "capturas-prototipos");

const VIEWPORTS = [
  { name: "360x800", width: 360, height: 800 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "1440x900", width: 1440, height: 900 },
];

const PROTOS = ["direcao-a", "direcao-b", "direcao-c"];

function contentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (filePath.endsWith(".woff2")) return "font/woff2";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      let rel = urlPath === "/" ? "/prototipos/direcao-a/index.html" : urlPath;
      const filePath = path.join(ROOT, rel.replace(/^\//, "").replace(/\//g, path.sep));
      if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": contentType(filePath) });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });
}

async function captureAll() {
  fs.mkdirSync(OUT, { recursive: true });
  const { server, port } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const log = [];

  try {
    for (const proto of PROTOS) {
      for (const vp of VIEWPORTS) {
        const page = await browser.newPage({
          viewport: { width: vp.width, height: vp.height },
          reducedMotion: "reduce",
        });
        const url = `http://127.0.0.1:${port}/prototipos/${proto}/index.html`;
        await page.goto(url, { waitUntil: "networkidle" });
        await page.waitForTimeout(200);

        const shots = [
          { key: "topo", y: 0 },
          { key: "meio", y: null },
          { key: "fim", y: null },
        ];

        const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
        shots[1].y = Math.max(0, Math.floor(scrollHeight * 0.4) - Math.floor(vp.height / 2));
        shots[2].y = Math.max(0, scrollHeight - vp.height);

        for (const shot of shots) {
          await page.evaluate((y) => window.scrollTo(0, y), shot.y);
          await page.waitForTimeout(120);
          const file = path.join(OUT, `${proto}_${vp.name}_${shot.key}.png`);
          await page.screenshot({ path: file, fullPage: false });
          log.push(path.relative(ROOT, file).replace(/\\/g, "/"));
        }
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  const manifesto = path.join(OUT, "README.md");
  fs.writeFileSync(
    manifesto,
    [
      "# Capturas dos protótipos",
      "",
      "Geradas por `node ferramentas/capturar-prototipos.js`.",
      "Viewports: 360×800, 768×1024, 1440×900.",
      "Posições: topo, meio (~40% da página), fim.",
      "`prefers-reduced-motion: reduce` ativo nas capturas.",
      "",
      "## Arquivos",
      "",
      ...log.map((f) => `- \`${f}\``),
      "",
    ].join("\n"),
    "utf8"
  );

  console.log(`Capturas em ${pathToFileURL(OUT).href}`);
  console.log(log.length + " arquivos.");
}

captureAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
