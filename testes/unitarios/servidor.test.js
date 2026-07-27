"use strict";
const { describe, it, before, after } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const {
  criarServidor,
  obterPorta,
  resolverCaminho,
} = require("../../ferramentas/servidor-estatico.js");
let servidor;
let origem;
before(async () => {
  servidor = criarServidor({ raiz: path.resolve(__dirname, "../..") });
  await new Promise((resolve) => servidor.listen(0, "127.0.0.1", resolve));
  origem = `http://127.0.0.1:${servidor.address().port}`;
});
after(async () => new Promise((resolve) => servidor.close(resolve)));
describe("servidor estático", () => {
  it("serve GET / e HEAD sem corpo", async () => {
    const get = await fetch(`${origem}/`);
    assert.equal(get.status, 200);
    assert.match(await get.text(), /<!doctype html>/i);
    const head = await fetch(`${origem}/`, { method: "HEAD" });
    assert.equal(head.status, 200);
    assert.equal(await head.text(), "");
  });
  it("responde 404 e não lista diretórios", async () => {
    assert.equal((await fetch(`${origem}/inexistente`)).status, 404);
    assert.equal((await fetch(`${origem}/css/`)).status, 404);
  });
  it("responde 405 para método não suportado", async () => {
    const resposta = await fetch(`${origem}/`, { method: "POST" });
    assert.equal(resposta.status, 405);
    assert.equal(resposta.headers.get("allow"), "GET, HEAD");
  });
  it("rejeita traversal, null byte e porta inválida", () => {
    assert.equal(resolverCaminho("/%2e%2e/package.json"), null);
    assert.equal(resolverCaminho("/%00"), null);
    assert.throws(() => obterPorta(["--porta", "x"], {}), /Porta inválida/);
  });
});
