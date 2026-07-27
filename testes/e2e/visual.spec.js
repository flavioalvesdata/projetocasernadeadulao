"use strict";
const { test, expect } = require("@playwright/test");
test.use({ reducedMotion: "reduce" });
async function preparar(page, viewport) {
  await page.setViewportSize(viewport);
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content: "*,*::before,*::after{animation:none!important;transition:none!important}",
  });
}
test("página inicial desktop", async ({ page }) => {
  await preparar(page, { width: 1280, height: 800 });
  await expect(page).toHaveScreenshot("pagina-desktop.png", {
    fullPage: true,
    animations: "disabled",
  });
});
test("página inicial mobile", async ({ page }) => {
  await preparar(page, { width: 360, height: 740 });
  await expect(page).toHaveScreenshot("pagina-mobile.png", {
    fullPage: true,
    animations: "disabled",
  });
});
test("menu móvel aberto", async ({ page }) => {
  await preparar(page, { width: 360, height: 740 });
  await page.locator("[data-indice-toggle]").click();
  await expect(page).toHaveScreenshot("menu-mobile.png", { animations: "disabled" });
});
test("escudo em estado alternativo", async ({ page }) => {
  await preparar(page, { width: 1280, height: 800 });
  await page.locator("#tab-couraca").click();
  await page.locator("#secao-7").scrollIntoViewIfNeeded();
  await expect(page).toHaveScreenshot("escudo-couraca.png", { animations: "disabled" });
});
