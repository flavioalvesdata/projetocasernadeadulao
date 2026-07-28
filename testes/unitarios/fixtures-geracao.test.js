"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const raiz = path.resolve(__dirname, "../..");

function prepararFixture() {
  const temporario = fs.mkdtempSync(path.join(os.tmpdir(), "caserna-fixture-"));
  for (const diretorio of ["conteudo", "ferramentas"]) {
    fs.cpSync(path.join(raiz, diretorio), path.join(temporario, diretorio), {
      recursive: true,
    });
  }
  return temporario;
}

test("JSON sintaticamente inválido falha com mensagem útil e preserva as fontes", () => {
  const temporario = prepararFixture();
  try {
    const fonte = path.join(temporario, "conteudo", "matriz-curricular.json");
    fs.writeFileSync(fonte, '{ "total": 48, "licoes": [ }\n', "utf8");
    const modulosAntes = fs.readFileSync(
      path.join(temporario, "conteudo", "modulos.json")
    );
    const resultado = spawnSync(
      process.execPath,
      [path.join(temporario, "ferramentas", "gerar-dados.js"), "--dados"],
      { cwd: temporario, encoding: "utf8" }
    );

    assert.notEqual(resultado.status, 0);
    assert.match(
      `${resultado.stdout}\n${resultado.stderr}`,
      /JSON inválido.*matriz-curricular\.json/
    );
    assert.ok(
      modulosAntes.equals(
        fs.readFileSync(path.join(temporario, "conteudo", "modulos.json"))
      )
    );
  } finally {
    fs.rmSync(temporario, { recursive: true, force: true });
  }
});

test("geração não altera citações Markdown literais nem JSON canônico", () => {
  const temporario = prepararFixture();
  try {
    const markdown = path.join(temporario, "conteudo", "fixture-literal.md");
    const citacao = '> Citação  com  espaços — e "pontuação" literal.\n> segunda linha\n';
    fs.writeFileSync(markdown, citacao, "utf8");
    const fontes = [
      markdown,
      path.join(temporario, "conteudo", "modulos.json"),
      path.join(temporario, "conteudo", "matriz-curricular.json"),
    ];
    const antes = fontes.map((arquivo) => fs.readFileSync(arquivo));
    const resultado = spawnSync(
      process.execPath,
      [path.join(temporario, "ferramentas", "gerar-dados.js"), "--dados"],
      { cwd: temporario, encoding: "utf8" }
    );

    assert.equal(resultado.status, 0, resultado.stderr);
    fontes.forEach((arquivo, indice) => {
      assert.ok(antes[indice].equals(fs.readFileSync(arquivo)), arquivo);
    });
    assert.equal(fs.readFileSync(markdown, "utf8"), citacao);
  } finally {
    fs.rmSync(temporario, { recursive: true, force: true });
  }
});
