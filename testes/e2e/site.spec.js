"use strict";

const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

const VIEWPORTS = [
  { width: 360, height: 740 },
  { width: 768, height: 1024 },
  { width: 1280, height: 800 },
];

test.describe("prospecto v1.0 — seções 1 a 7", () => {
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
    await page.waitForFunction(() => window.Caserna && window.SITE_CONFIG);
    await page.waitForTimeout(300);

    expect(erros, erros.join("\n")).toEqual([]);
    expect(falhas, falhas.join("\n")).toEqual([]);

    const fontFace = await page.evaluate(() => {
      const body = getComputedStyle(document.body).fontFamily;
      return body.includes("Source Serif");
    });
    expect(fontFace).toBeTruthy();
  });

  test("índice navega até âncoras 8–15", async ({ page }) => {
    await page.goto("/");
    const link = page.locator('.indice__link[href="#secao-15"]');
    await link.evaluate((el) => el.scrollIntoView({ block: "nearest" }));
    await link.click();
    await expect(page.locator("#secao-15")).toBeInViewport();
    await expect(page.locator("#titulo-15")).toHaveText("O portão pastoral");
  });

  test("escudo operável por clique e teclado", async ({ page }) => {
    await page.goto("/");
    await page.locator("#secao-7").scrollIntoViewIfNeeded();
    await page.locator("#tab-couraca").click();
    await expect(page.locator("#painel-couraca")).toBeVisible();
    await expect(page.locator("#painel-cinto")).toBeHidden();

    await page.locator("#tab-couraca").focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("#painel-calcados")).toBeVisible();

    await page.locator('[data-escudo-indice="5"]').click();
    await expect(page.locator("#painel-espada")).toBeVisible();
  });

  test("navegação por teclado e skip link", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.locator(".skip-link");
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#conteudo")).toBeFocused();
  });

  test("comparação da seção 3 sem overflow em 360px", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto("/");
    await page.locator("#secao-3").scrollIntoViewIfNeeded();
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > doc.clientWidth + 1;
    });
    expect(overflow).toBeFalsy();
    await expect(page.locator(".comparacao__par")).toHaveCount(5);
  });

  for (const vp of VIEWPORTS) {
    test(`sem overflow horizontal em ${vp.width}px`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto("/");
      await page.waitForTimeout(200);
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth > doc.clientWidth + 1;
      });
      expect(overflow).toBeFalsy();
    });
  }

  test("conteúdo legível sem JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText("Discipulando a Caserna");
    await expect(page.locator("[data-saudacao]")).toHaveText(
      "Pastor Glaydston,"
    );
    await expect(page.locator("#secao-3")).toContainText(
      "Por que o material comum não alcança"
    );
    await expect(page.locator("#painel-cinto")).toBeVisible();
    await context.close();
  });

  test("a11y automatizável com axe", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForTimeout(300);
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

  test("caminhos relativos (sem barra absoluta na raiz)", async ({ page }) => {
    await page.goto("/");
    const html = await page.content();
    expect(html).toContain('href="css/tokens.css"');
    expect(html).toContain('src="js/main.js"');
    expect(html).not.toContain('href="/css/');
    expect(html).not.toContain('src="/js/');
  });
});
