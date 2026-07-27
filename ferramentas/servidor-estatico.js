/** Servidor estático local, restrito à raiz deste repositório. */
"use strict";

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const RAIZ = path.resolve(__dirname, "..");
const MIMES = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

function resolverCaminho(urlSolicitada, raiz = RAIZ) {
  if (typeof urlSolicitada !== "string" || urlSolicitada.includes("\0")) return null;
  if (/%(?:2e|2f|5c)/i.test(urlSolicitada)) return null;
  let pathname;
  try {
    pathname = new URL(urlSolicitada, "http://localhost").pathname;
  } catch {
    return null;
  }
  let decodificado;
  try {
    decodificado = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  if (decodificado.includes("\0") || decodificado.split("/").includes("..")) return null;
  const relativo = decodificado === "/" ? "index.html" : decodificado.replace(/^\/+/, "");
  const destino = path.resolve(raiz, relativo);
  return destino === raiz || destino.startsWith(`${raiz}${path.sep}`) ? destino : null;
}

function criarServidor({ raiz = RAIZ } = {}) {
  return http.createServer((req, res) => {
    if (!req.url || !["GET", "HEAD"].includes(req.method || "")) {
      res.writeHead(405, { Allow: "GET, HEAD" });
      res.end("Método não permitido.\n");
      return;
    }
    const destino = resolverCaminho(req.url, raiz);
    if (!destino) {
      res.writeHead(400);
      res.end("Caminho inválido.\n");
      return;
    }
    fs.stat(destino, (erro, stat) => {
      if (erro || !stat.isFile()) {
        res.writeHead(404);
        res.end("Arquivo não encontrado.\n");
        return;
      }
      res.writeHead(200, {
        "Content-Type":
          MIMES.get(path.extname(destino).toLowerCase()) || "application/octet-stream",
        "Content-Length": stat.size,
        "X-Content-Type-Options": "nosniff",
      });
      if (req.method === "HEAD") {
        res.end();
        return;
      }
      const fluxo = fs.createReadStream(destino);
      fluxo.on("error", () => {
        if (!res.headersSent) res.writeHead(500);
        res.end("Falha ao ler o arquivo.\n");
      });
      fluxo.pipe(res);
    });
  });
}

function obterPorta(argumentos = process.argv.slice(2), ambiente = process.env) {
  const indice = argumentos.indexOf("--porta");
  const valor = indice >= 0 ? argumentos[indice + 1] : ambiente.PORT || "4173";
  const porta = Number(valor);
  if (!Number.isInteger(porta) || porta < 0 || porta > 65535)
    throw new Error(`Porta inválida: ${valor}`);
  return porta;
}

if (require.main === module) {
  try {
    const porta = obterPorta();
    const servidor = criarServidor();
    servidor.listen(porta, "127.0.0.1", () =>
      console.log(
        `Servidor local disponível em http://127.0.0.1:${servidor.address().port}`
      )
    );
    const encerrar = (sinal) => {
      console.log(`Encerrando servidor (${sinal})...`);
      servidor.close(() => process.exit(0));
    };
    process.once("SIGINT", () => encerrar("SIGINT"));
    process.once("SIGTERM", () => encerrar("SIGTERM"));
  } catch (erro) {
    console.error(`ERRO: ${erro.message}`);
    process.exit(1);
  }
}

module.exports = { criarServidor, obterPorta, resolverCaminho };
