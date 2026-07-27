/** Confere os artefatos gerados sem depender do estado geral do Git. */
"use strict";
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { gerarDados } = require("./gerar-dados.js");

const raiz = path.resolve(__dirname, "..");
const temporario = fs.mkdtempSync(path.join(os.tmpdir(), "caserna-gerados-"));
try {
  gerarDados({ raiz, diretorioSaida: temporario, silencioso: true });
  for (const arquivo of ["modulos.js", "matriz.js"]) {
    const esperado = fs.readFileSync(path.join(temporario, arquivo));
    const atual = fs.readFileSync(path.join(raiz, "js", "dados", arquivo));
    if (!esperado.equals(atual))
      throw new Error(
        `js/dados/${arquivo} está desatualizado; execute npm run generate:data.`
      );
  }
  console.log("check:generated OK");
} catch (erro) {
  console.error(`ERRO: ${erro.message}`);
  process.exitCode = 1;
} finally {
  fs.rmSync(temporario, { recursive: true, force: true });
}
