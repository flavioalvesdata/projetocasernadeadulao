"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const raiz = path.resolve(__dirname, "../..");

test("verificador detecta fonte alterada sem sobrescrever o gerado versionado", () => {
  const temporario = fs.mkdtempSync(path.join(os.tmpdir(), "caserna-verificador-"));

  try {
    for (const diretorio of ["conteudo", "js/dados", "ferramentas"]) {
      fs.cpSync(path.join(raiz, diretorio), path.join(temporario, diretorio), {
        recursive: true,
      });
    }

    const fonte = path.join(temporario, "conteudo", "modulos.json");
    const dados = JSON.parse(fs.readFileSync(fonte, "utf8"));
    dados.modulos[0].nome = `${dados.modulos[0].nome} (fonte alterada no teste)`;
    fs.writeFileSync(fonte, `${JSON.stringify(dados, null, 2)}\n`, "utf8");

    const gerado = path.join(temporario, "js", "dados", "modulos.js");
    const conteudoAnterior = fs.readFileSync(gerado);
    const resultado = spawnSync(
      process.execPath,
      [path.join(temporario, "ferramentas", "verificar-gerados.js")],
      { cwd: temporario, encoding: "utf8" }
    );

    assert.notEqual(resultado.status, 0, "a divergência deve falhar a verificação");
    assert.match(`${resultado.stdout}\n${resultado.stderr}`, /está desatualizado/);
    assert.ok(
      conteudoAnterior.equals(fs.readFileSync(gerado)),
      "o verificador não deve alterar o artefato versionado"
    );
  } finally {
    fs.rmSync(temporario, { recursive: true, force: true });
  }
});

test("verificador rejeita edição manual do gerado com mensagem acionável", () => {
  const temporario = fs.mkdtempSync(path.join(os.tmpdir(), "caserna-gerado-editado-"));
  try {
    for (const diretorio of ["conteudo", "js/dados", "ferramentas"]) {
      fs.cpSync(path.join(raiz, diretorio), path.join(temporario, diretorio), {
        recursive: true,
      });
    }
    const gerado = path.join(temporario, "js", "dados", "matriz.js");
    fs.appendFileSync(gerado, "// edição manual indevida\n", "utf8");
    const resultado = spawnSync(
      process.execPath,
      [path.join(temporario, "ferramentas", "verificar-gerados.js")],
      { cwd: temporario, encoding: "utf8" }
    );

    assert.notEqual(resultado.status, 0);
    assert.match(
      `${resultado.stdout}\n${resultado.stderr}`,
      /js\/dados\/matriz\.js está desatualizado; execute npm run generate/
    );
  } finally {
    fs.rmSync(temporario, { recursive: true, force: true });
  }
});
