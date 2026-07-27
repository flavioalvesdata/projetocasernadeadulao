"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const raiz = path.resolve(__dirname, "../..");
test("fallbacks equivalentes permanecem sincronizados com SITE_CONFIG", () => {
  const contexto = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(raiz, "js/config.js"), "utf8"), contexto);
  const c = contexto.window.SITE_CONFIG;
  const html = fs.readFileSync(path.join(raiz, "index.html"), "utf8");
  for (const valor of [c.autor, c.instituicao, c.cidade, c.cnpj, c.email])
    assert.ok(html.includes(valor), `fallback ausente para ${valor}`);
  assert.equal(require(path.join(raiz, "package.json")).version, c.versao);
});
