"use strict";

const { describe, it, before } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const raiz = path.join(__dirname, "..", "..");
const MOJIBAKE = /Ã.|Â.|â€|ðŸ|�/;

function ler(rel) {
  return fs.readFileSync(path.join(raiz, rel), "utf8");
}

function extrair(fonte, nome) {
  const match = fonte.match(
    new RegExp(`window\\.${nome}\\s*=\\s*([\\s\\S]*);\\s*$`)
  );
  assert.ok(match, `${nome} inválido`);
  return JSON.parse(match[1]);
}

describe("dados gerados", () => {
  before(() => {
    execFileSync(process.execPath, [path.join(raiz, "ferramentas", "gerar-dados.js")], {
      cwd: raiz,
      stdio: "pipe",
    });
  });

  it("gera sem mojibake", () => {
    ["js/dados/modulos.js", "js/dados/matriz.js", "index.html"].forEach((rel) => {
      assert.equal(MOJIBAKE.test(ler(rel)), false, rel);
    });
  });

  it("round-trip corresponde aos JSON", () => {
    const modulosJson = JSON.parse(ler("conteudo/modulos.json"));
    const matrizJson = JSON.parse(ler("conteudo/matriz-curricular.json"));
    const modulosJs = extrair(ler("js/dados/modulos.js"), "DADOS_MODULOS");
    const matrizJs = extrair(ler("js/dados/matriz.js"), "DADOS_MATRIZ");
    assert.deepEqual(modulosJs, modulosJson);
    assert.deepEqual(matrizJs, matrizJson);
  });

  it("matriz tem 48 lições", () => {
    const matriz = extrair(ler("js/dados/matriz.js"), "DADOS_MATRIZ");
    assert.equal(matriz.total, 48);
    assert.equal(matriz.licoes.length, 48);
  });

  it("gera scripts de dados sem exigir fallback no HTML deste PR", () => {
    assert.ok(fs.existsSync(path.join(raiz, "js/dados/modulos.js")));
    assert.ok(fs.existsSync(path.join(raiz, "js/dados/matriz.js")));
    /* Fallback noscript volta com a seção 9 (matriz) no próximo PR. */
  });
});
