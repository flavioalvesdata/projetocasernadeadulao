/**
 * Verifica ausência de mojibake e integridade dos dados gerados.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const raiz = path.join(__dirname, "..");
const MOJIBAKE = /Ã.|Â.|â€|ðŸ|�/;

const alvos = [
  "js/dados/modulos.js",
  "js/dados/matriz.js",
  "conteudo/modulos.json",
  "conteudo/matriz-curricular.json",
  "index.html",
  "assets/img/brasao.svg",
  "assets/img/marca-escudo.svg",
];

function ler(rel) {
  return fs.readFileSync(path.join(raiz, rel), { encoding: "utf8" });
}

function extrairGlobal(fonte, nome) {
  const match = fonte.match(
    new RegExp(`window\\.${nome}\\s*=\\s*([\\s\\S]*);\\s*$`)
  );
  if (!match) throw new Error(`${nome}: formato inválido`);
  return JSON.parse(match[1]);
}

let falhas = 0;

alvos.forEach((rel) => {
  const texto = ler(rel);
  if (MOJIBAKE.test(texto)) {
    console.error(`FALHA encoding: ${rel}`);
    falhas += 1;
  } else {
    console.log(`OK encoding: ${rel}`);
  }
});

try {
  execFileSync(process.execPath, [path.join(raiz, "ferramentas", "gerar-dados.js")], {
    cwd: raiz,
    stdio: "pipe",
    encoding: "utf8",
  });
} catch (err) {
  console.error("FALHA generate:", err.stderr || err.message);
  process.exit(1);
}

const modulosJson = JSON.parse(ler("conteudo/modulos.json"));
const matrizJson = JSON.parse(ler("conteudo/matriz-curricular.json"));
const modulosJs = extrairGlobal(ler("js/dados/modulos.js"), "DADOS_MODULOS");
const matrizJs = extrairGlobal(ler("js/dados/matriz.js"), "DADOS_MATRIZ");

if (JSON.stringify(modulosJson) !== JSON.stringify(modulosJs)) {
  console.error("FALHA round-trip: modulos");
  falhas += 1;
} else {
  console.log("OK round-trip: modulos");
}

if (JSON.stringify(matrizJson) !== JSON.stringify(matrizJs)) {
  console.error("FALHA round-trip: matriz");
  falhas += 1;
} else {
  console.log("OK round-trip: matriz");
}

if (falhas > 0) {
  process.exit(1);
}

console.log("check:encoding OK");
