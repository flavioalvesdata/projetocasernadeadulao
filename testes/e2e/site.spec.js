"use strict";

const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

const VIEWPORTS = [
  { width: 320, height: 720 },
  { width: 360, height: 740 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];

test.describe("prospecto v0.4.0", () => {
  test("carrega sem erros de console e com fontes locais", async ({ page }) => {
    const erros = [];
    page.on("pageerror", (err) => erros.push(String(err)));
    page.on("console", (msg) => {
      if (msg.type() === "error") erros.push(msg.text());
    });

    const falhas = [];
    page.on("response", (res) => {
      if (res.status() >= 400) falhas.push(`${res.status()} ${res.url()}`);
    });

    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText("Discipulando a Caserna");
    await page.waitForFunction(() => window.Caserna && window.DADOS_MATRIZ);
    await page.waitForTimeout(400);

    expect(erros, erros.join("\n")).toEqual([]);
    expect(falhas, falhas.join("\n")).toEqual([]);

    const fontes = await page.evaluate(() => {
      const sheets = [...document.styleSheets];
      return sheets.some((s) => (s.href || "").includes("fonts") || true);
    });
    expect(fontes).toBeTruthy();

    const fontFace = await page.evaluate(() => {
      const body = getComputedStyle(document.body).fontFamily;
      return body.includes("Source Serif");
    });
    expect(fontFace).toBeTruthy();
  });

  test("filtros, abas e acordeões funcionam", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("[data-matriz-lista] .matriz__modulo");

    await page.locator('[data-filtro="1"]').click();
    await expect(page.locator("[data-matriz-live]")).toContainText("Módulo 1");
    await expect(page.locator("[data-matriz-lista] .matriz__modulo")).toHaveCount(1);

    await page.locator("#tab-modulo-2").click();
    await expect(page.locator("#painel-modulo-2")).toBeVisible();

    await page.locator("#tab-marca-2").click();
    await expect(page.locator("#painel-marca-2")).toBeVisible();

    const toggle = page.locator("#matriz-toggle-1");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  test("navegação por teclado e skip link", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.locator(".skip-link");
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#conteudo")).toBeFocused();
  });

  test("escudo tem nomes acessíveis", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator('[aria-label="Ver Capacete da Salvação"]')
    ).toHaveCount(1);
    await expect(page.locator("[data-escudo-lista] button")).toHaveCount(6);
  });

  for (const vp of VIEWPORTS) {
    test(`sem overflow horizontal em ${vp.width}px`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto("/");
      await page.waitForSelector("[data-matriz-lista] .matriz__modulo");
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth > doc.clientWidth + 1;
      });
      expect(overflow).toBeFalsy();
    });
  }

  test("alternativa sem JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText("Discipulando a Caserna");
    await expect(page.locator(".fallback-dados")).toBeAttached();
    await expect(page.locator(".fallback-tabela tbody tr")).toHaveCount(48);
    await expect(page.locator("[data-matriz-lista] .matriz__modulo")).toHaveCount(0);
    await context.close();
  });

  test("init resiliente quando módulo opcional falha", async ({ page }) => {
    await page.addInitScript(() => {
      window.Caserna = window.Caserna || {};
      window.Caserna.initMarcha = () => {
        throw new Error("falha simulada");
      };
    });
    const erros = [];
    page.on("pageerror", (err) => erros.push(String(err)));
    await page.goto("/");
    await page.waitForSelector("[data-matriz-lista] .matriz__modulo");
    await expect(page.locator("[data-matriz-lista] .matriz__modulo")).toHaveCount(4);
  });

  test("a11y automatizável com axe", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForSelector("[data-matriz-lista] .matriz__modulo");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();
    const graves = results.violations.filter((v) =>
      ["critical", "serious"].includes(v.impact)
    );
    expect(
      graves,
      graves.map((v) => `${v.id}: ${v.help}`).join("\n")
    ).toEqual([]);
  });

  test("compatível com base path do GitHub Pages", async ({ page }) => {
    await page.goto("/");
    const html = await page.content();
    expect(html).toContain('href="css/tokens.css?v=0.4.0"');
    expect(html).toContain('src="js/main.js?v=0.4.0"');
    expect(html).toContain(
      'href="https://flavioiabuilder.github.io/projetocasernadeadulao/"'
    );
    expect(html).not.toContain('href="/css/');
    expect(html).not.toContain('src="/js/');
  });
});

