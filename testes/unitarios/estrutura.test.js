"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const raiz = path.join(__dirname, "..", "..");
const html = fs.readFileSync(path.join(raiz, "index.html"), "utf8");

describe("estrutura HTML v1", () => {
  it("tem exatamente um h1", () => {
    const matches = html.match(/<h1[\s>]/g) || [];
    assert.equal(matches.length, 1);
  });

  it("h1 aparece antes do primeiro h2", () => {
    const iH1 = html.search(/<h1[\s>]/);
    const iH2 = html.search(/<h2[\s>]/);
    assert.ok(iH1 >= 0 && iH2 >= 0);
    assert.ok(iH1 < iH2);
  });

  it("skip link aponta para main#conteudo", () => {
    assert.match(
      html,
      /href="#conteudo"[^>]*>\s*Ir para o conteúdo principal/
    );
    assert.match(html, /<main[^>]*id="conteudo"/);
  });

  it("não possui IDs duplicados", () => {
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    const seen = new Set();
    const dups = [];
    ids.forEach((id) => {
      if (seen.has(id)) dups.push(id);
      seen.add(id);
    });
    assert.deepEqual(dups, []);
  });

  it("possui metadados essenciais", () => {
    assert.match(html, /lang="pt-BR"/);
    assert.match(html, /name="description"/);
    assert.match(html, /rel="canonical"/);
    assert.match(html, /name="theme-color"/);
    assert.match(html, /property="og:title"/);
    assert.match(html, /rel="icon"/);
    assert.match(html, /noindex/);
  });

  it("abertura com protagonismo Discipulando", () => {
    assert.match(html, /Projeto Caserna de Adulão/);
    assert.match(html, /<h1[^>]*>\s*Discipulando a Caserna\s*<\/h1>/);
    assert.match(
      html,
      /Um discipulado cristocêntrico para a caserna e para os que estão em\s+aperto/
    );
  });

  it("selo de versão candidata visível", () => {
    assert.match(html, /Versão candidata — aguardando apreciação pastoral/i);
  });

  it("escudo tem abas e lista operáveis", () => {
    assert.match(html, /data-marca-escudo/);
    assert.match(html, /role="tablist"/);
    assert.match(html, /data-escudo-lista/);
    assert.equal((html.match(/data-escudo-indice=/g) || []).length, 6);
  });

  it("não menciona remição nem aprovação pastoral conclusiva", () => {
    assert.doesNotMatch(html, /remi[cç][aã]o/i);
    assert.doesNotMatch(html, /aprovado pastoralmente/i);
    assert.doesNotMatch(html, /homologado/i);
  });

  it("numeração de seções é contínua 1–15", () => {
    for (let i = 1; i <= 15; i += 1) {
      assert.match(html, new RegExp(`id="secao-${i}"`));
    }
  });

  it("cinco movimentos âncorados", () => {
    for (let i = 1; i <= 5; i += 1) {
      assert.match(html, new RegExp(`id="movimento-${i}"`));
    }
  });

  it("saudação com fallback estático", () => {
    assert.match(html, /data-saudacao/);
    assert.match(html, /Pastor Glaydston,/);
  });
});
