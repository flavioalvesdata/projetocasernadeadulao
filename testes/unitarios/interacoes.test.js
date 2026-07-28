"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");

const raiz = path.resolve(__dirname, "../..");

function executarScript(nome, contexto) {
  const caminho = path.join(raiz, "js", nome);
  globalThis.window = contexto.window;
  globalThis.document = contexto.document;
  delete require.cache[require.resolve(caminho)];
  require(caminho);
}

function criarElemento(atributos = {}) {
  const listeners = {};
  return {
    atributos: { ...atributos },
    classList: { toggle() {} },
    tabIndex: -1,
    hidden: false,
    addEventListener(tipo, callback) {
      listeners[tipo] = callback;
    },
    disparar(tipo, evento = {}) {
      listeners[tipo](evento);
    },
    focus() {
      this.focado = true;
    },
    getAttribute(nome) {
      return this.atributos[nome] ?? null;
    },
    setAttribute(nome, valor) {
      this.atributos[nome] = valor;
    },
    removeAttribute(nome) {
      delete this.atributos[nome];
    },
  };
}

describe("interações compartilhadas", () => {
  it("alterna abas por clique e teclado, mantendo painéis e foco sincronizados", () => {
    const tablist = criarElemento();
    const tabs = [
      criarElemento({ "aria-selected": "true", "aria-controls": "painel-1" }),
      criarElemento({ "aria-selected": "false", "aria-controls": "painel-2" }),
    ];
    const paineis = new Map([
      ["painel-1", criarElemento()],
      ["painel-2", criarElemento({ hidden: "" })],
    ]);
    const alteracoes = [];
    const root = {
      querySelector: () => tablist,
      querySelectorAll: () => tabs,
    };
    const contexto = {
      window: {},
      document: { getElementById: (id) => paineis.get(id) },
    };

    executarScript("abas.js", contexto);
    const api = contexto.window.Caserna.initAbas(root, {
      onChange: (indice) => alteracoes.push(indice),
    });
    assert.deepEqual(alteracoes, [0]);

    tabs[1].disparar("click");
    assert.equal(tabs[1].atributos["aria-selected"], "true");
    assert.equal(paineis.get("painel-2").atributos.hidden, undefined);

    let prevenido = false;
    tablist.disparar("keydown", {
      key: "Home",
      preventDefault: () => {
        prevenido = true;
      },
    });
    assert.equal(prevenido, true);
    assert.equal(tabs[0].focado, true);
    assert.equal(paineis.get("painel-2").atributos.hidden, "");
    assert.deepEqual(alteracoes, [0, 1, 0]);
    assert.equal(api.tabs.length, 2);
  });

  it("ignora raízes sem estrutura de abas", () => {
    const contexto = { window: {}, document: {} };
    executarScript("abas.js", contexto);
    assert.equal(contexto.window.Caserna.initAbas(null), null);
    assert.equal(
      contexto.window.Caserna.initAbas({
        querySelector: () => null,
        querySelectorAll: () => [],
      }),
      null
    );
  });

  it("inicializa a saudação e os módulos disponíveis", () => {
    const chamadas = [];
    const saudacao = criarElemento();
    const contexto = {
      window: {
        SITE_CONFIG: { destinatario: "Glaydston" },
        Caserna: {
          initNavegacao: () => chamadas.push("navegação"),
          initRevelar: () => chamadas.push("revelação"),
          initMarca: () => chamadas.push("marca"),
        },
      },
      document: {
        readyState: "complete",
        querySelector: () => saudacao,
      },
    };
    executarScript("main.js", contexto);
    assert.equal(saudacao.textContent, "Pastor Glaydston,");
    assert.deepEqual(chamadas, ["navegação", "revelação", "marca"]);
  });
});
