"use strict";

const { describe, it, before, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const os = require("node:os");
const { gerarDados } = require("../../ferramentas/gerar-dados.js");

const raiz = path.join(__dirname, "..", "..");
const MOJIBAKE = /Ã.|Â.|â€|ðŸ|�/;
let temporario;

function ler(rel) {
  return fs.readFileSync(path.join(raiz, rel), "utf8");
}

function extrair(fonte, nome) {
  const match = fonte.match(new RegExp(`window\\.${nome}\\s*=\\s*([\\s\\S]*);\\s*$`));
  assert.ok(match, `${nome} inválido`);
  return JSON.parse(match[1]);
}

describe("dados gerados", () => {
  before(() => {
    temporario = fs.mkdtempSync(path.join(os.tmpdir(), "caserna-teste-dados-"));
    gerarDados({ raiz, diretorioSaida: temporario, silencioso: true });
  });

  after(() => fs.rmSync(temporario, { recursive: true, force: true }));

  it("gera sem mojibake", () => {
    ["modulos.js", "matriz.js"].forEach((arquivo) => {
      assert.equal(
        MOJIBAKE.test(fs.readFileSync(path.join(temporario, arquivo), "utf8")),
        false,
        arquivo
      );
    });
    assert.equal(MOJIBAKE.test(ler("index.html")), false, "index.html");
  });

  it("round-trip corresponde aos JSON", () => {
    const modulosJson = JSON.parse(ler("conteudo/modulos.json"));
    const matrizJson = JSON.parse(ler("conteudo/matriz-curricular.json"));
    const modulosJs = extrair(
      fs.readFileSync(path.join(temporario, "modulos.js"), "utf8"),
      "DADOS_MODULOS"
    );
    const matrizJs = extrair(
      fs.readFileSync(path.join(temporario, "matriz.js"), "utf8"),
      "DADOS_MATRIZ"
    );
    assert.deepEqual(modulosJs, modulosJson);
    assert.deepEqual(matrizJs, matrizJson);
  });

  it("matriz tem 48 lições", () => {
    const matriz = extrair(
      fs.readFileSync(path.join(temporario, "matriz.js"), "utf8"),
      "DADOS_MATRIZ"
    );
    assert.equal(matriz.total, 48);
    assert.equal(matriz.licoes.length, 48);
  });

  it("tem 4 módulos e identificadores únicos para módulos e lições", () => {
    const modulos = extrair(
      fs.readFileSync(path.join(temporario, "modulos.js"), "utf8"),
      "DADOS_MODULOS"
    );
    const matriz = extrair(
      fs.readFileSync(path.join(temporario, "matriz.js"), "utf8"),
      "DADOS_MATRIZ"
    );
    assert.equal(modulos.modulos.length, 4);
    assert.equal(new Set(modulos.modulos.map(({ numero }) => numero)).size, 4);
    assert.equal(new Set(matriz.licoes.map(({ numero }) => numero)).size, 48);
  });

  it("preserva os null autorizados sem preenchimento automático", () => {
    const modulos = extrair(
      fs.readFileSync(path.join(temporario, "modulos.js"), "utf8"),
      "DADOS_MODULOS"
    );
    for (const numero of [3, 4]) {
      const modulo = modulos.modulos.find((item) => item.numero === numero);
      for (const campo of ["virtude", "tema", "temaRef"]) {
        assert.equal(modulo[campo], null, `módulo ${numero}, campo ${campo}`);
      }
    }
  });

  it("produz bytes idênticos em gerações sucessivas", () => {
    const segundaSaida = fs.mkdtempSync(
      path.join(os.tmpdir(), "caserna-teste-determinismo-")
    );
    try {
      gerarDados({ raiz, diretorioSaida: segundaSaida, silencioso: true });
      for (const arquivo of ["modulos.js", "matriz.js"]) {
        assert.ok(
          fs
            .readFileSync(path.join(temporario, arquivo))
            .equals(fs.readFileSync(path.join(segundaSaida, arquivo))),
          `${arquivo} deve ser determinístico`
        );
      }
    } finally {
      fs.rmSync(segundaSaida, { recursive: true, force: true });
    }
  });

  it("gera scripts de dados sem exigir fallback no HTML deste PR", () => {
    assert.ok(fs.existsSync(path.join(raiz, "js/dados/modulos.js")));
    assert.ok(fs.existsSync(path.join(raiz, "js/dados/matriz.js")));
    /* Fallback noscript volta com a seção 9 (matriz) no próximo PR. */
  });
});
