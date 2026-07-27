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
    await expect(page.locator("[data-saudacao]")).toHaveText("Pastor Glaydston,");
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
      ["critical", "serious", "moderate"].includes(v.impact)
    );
    expect(graves, graves.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
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

test.describe("estrutura e navegação completas", () => {
  test("headings possuem um h1 e progressão sem saltos", async ({ page }) => {
    await page.goto("/");
    const headings = await page.locator("h1,h2,h3,h4,h5,h6").evaluateAll((itens) =>
      itens.map((el) => ({
        nivel: Number(el.tagName[1]),
        texto: (el.textContent || "").trim(),
      }))
    );
    expect(
      headings.filter((h) => h.nivel === 1),
      "deve existir exatamente um h1"
    ).toHaveLength(1);
    for (let indice = 1; indice < headings.length; indice += 1)
      expect(
        headings[indice].nivel,
        `salto antes de "${headings[indice].texto}"`
      ).toBeLessThanOrEqual(headings[indice - 1].nivel + 1);
    await expect(page.locator(".movimento h2, #movimento-1 h2")).toHaveCount(5);
  });

  test("relações, IDs e recursos locais são íntegros", async ({ page }) => {
    await page.goto("/");
    const falhas = await page.evaluate(async () => {
      const erros = [];
      const ids = new Map();
      document.querySelectorAll("[id]").forEach((el) => {
        if (ids.has(el.id)) erros.push(`ID duplicado: ${el.id}`);
        ids.set(el.id, el);
      });
      for (const atributo of ["aria-controls", "aria-labelledby", "for"])
        document.querySelectorAll(`[${atributo}]`).forEach((el) =>
          (el.getAttribute(atributo) || "")
            .split(/\s+/)
            .filter(Boolean)
            .forEach((id) => {
              if (!ids.has(id))
                erros.push(`${atributo} aponta para ID inexistente: ${id}`);
            })
        );
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        const id = decodeURIComponent(a.hash.slice(1));
        if (id && !ids.has(id)) erros.push(`Âncora inexistente: #${id}`);
      });
      const locais = [...document.querySelectorAll("[src], a[href]")]
        .map((el) => el.getAttribute("src") || el.getAttribute("href"))
        .filter((url) => url && !/^(#|https?:|mailto:|tel:|data:|javascript:)/.test(url));
      for (const url of locais) {
        const resposta = await fetch(url);
        if (!resposta.ok)
          erros.push(`Recurso local ausente: ${url} (${resposta.status})`);
      }
      document.querySelectorAll('[role="tab"]').forEach((tab) => {
        const painel = ids.get(tab.getAttribute("aria-controls"));
        if (!painel || painel.getAttribute("role") !== "tabpanel")
          erros.push(`Aba sem painel: ${tab.id}`);
      });
      document.querySelectorAll('[role="tabpanel"]').forEach((painel) => {
        const aba = ids.get(painel.getAttribute("aria-labelledby"));
        if (!aba || aba.getAttribute("role") !== "tab")
          erros.push(`Painel sem aba: ${painel.id}`);
      });
      return erros;
    });
    expect(falhas, falhas.join("\n")).toEqual([]);
  });

  test("menu móvel gerencia foco e todos os fechamentos", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto("/");
    const botao = page.locator("[data-indice-toggle]");
    const links = page.locator(".indice__link");
    await botao.click();
    await expect(botao).toHaveAttribute("aria-expanded", "true");
    await expect(links.first()).toBeFocused();
    await expect(page.locator("main")).toHaveAttribute("inert", "");
    await page.keyboard.press("Shift+Tab");
    await expect(links.last()).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(links.first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(botao).toBeFocused();
    await expect(botao).toHaveAttribute("aria-expanded", "false");
    await botao.click();
    await page.locator("[data-indice-overlay]").click({ position: { x: 2, y: 2 } });
    await expect(botao).toBeFocused();
    await botao.click();
    await links.first().click();
    await expect(botao).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#secao-1")).toBeInViewport();
  });

  test("todas as âncoras do sumário navegam e atualizam o estado", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto("/");
    const hrefs = await page
      .locator(".indice__link")
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")));
    for (const href of hrefs) {
      await page.locator("[data-indice-toggle]").click();
      await page.locator(`.indice__link[href="${href}"]`).click();
      await expect(page.locator(href)).toBeInViewport();
      await expect(page).toHaveURL(new RegExp(`${href.replace("#", "#")}$`));
      await expect(page.locator("[data-indice-toggle]")).toHaveAttribute(
        "aria-expanded",
        "false"
      );
    }
  });
});

test("a11y nos estados interativos mobile e escudo alternativo", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto("/");
  await page.locator("[data-indice-toggle]").click();
  let resultado = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
    .analyze();
  let violacoes = resultado.violations.filter((v) =>
    ["critical", "serious", "moderate"].includes(v.impact)
  );
  expect(violacoes, violacoes.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.locator("#tab-couraca").click();
  resultado = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
    .analyze();
  violacoes = resultado.violations.filter((v) =>
    ["critical", "serious", "moderate"].includes(v.impact)
  );
  expect(violacoes, violacoes.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
});
