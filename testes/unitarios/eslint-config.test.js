"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { ESLint } = require("eslint");

const raiz = path.resolve(__dirname, "../..");

async function mensagens(codigo, caminhoRelativo) {
  const eslint = new ESLint({ cwd: raiz });
  const [resultado] = await eslint.lintText(codigo, {
    filePath: path.join(raiz, caminhoRelativo),
  });
  return resultado.messages;
}

test("configuração ESLint rejeita global de navegador em ferramentas Node", async () => {
  const erros = await mensagens(
    "document.querySelector('main');",
    "ferramentas/fixture.js"
  );

  assert.ok(
    erros.some((erro) => erro.ruleId === "no-undef" && erro.message.includes("document")),
    "document deve ser indefinido no ambiente de ferramentas"
  );
});

test("configuração ESLint rejeita global de Node em scripts do navegador", async () => {
  const erros = await mensagens("process.cwd();", "js/fixture.js");

  assert.ok(
    erros.some((erro) => erro.ruleId === "no-undef" && erro.message.includes("process")),
    "process deve ser indefinido no ambiente do navegador"
  );
});
