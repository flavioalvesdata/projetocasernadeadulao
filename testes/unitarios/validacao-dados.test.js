"use strict";
const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { validarModulos, validarMatriz } = require("../../ferramentas/gerar-dados.js");
const raiz = path.resolve(__dirname, "../..");
const baseModulos = JSON.parse(fs.readFileSync(path.join(raiz, "conteudo/modulos.json")));
const baseMatriz = JSON.parse(
  fs.readFileSync(path.join(raiz, "conteudo/matriz-curricular.json"))
);
const clone = (valor) => structuredClone(valor);
function invalido(nome, alterar, padrao) {
  it(nome, () => {
    const m = clone(baseModulos);
    const l = clone(baseMatriz);
    alterar(m, l);
    assert.throws(() => {
      validarModulos(m);
      validarMatriz(l, m);
    }, padrao);
  });
}
describe("invariantes curriculares", () => {
  it("aceita as fontes canônicas atuais", () => {
    assert.doesNotThrow(() => {
      validarModulos(baseModulos);
      validarMatriz(baseMatriz, baseModulos);
    });
  });
  invalido(
    "rejeita módulo duplicado",
    (m) => {
      m.modulos[1].numero = 1;
    },
    /duplicado/
  );
  invalido(
    "rejeita módulo ausente",
    (m) => {
      m.modulos.pop();
    },
    /4 itens/
  );
  invalido(
    "rejeita módulo inválido",
    (m) => {
      m.modulos[0].numero = 5;
    },
    /entre 1 e 4/
  );
  invalido(
    "rejeita treze ou onze lições no intervalo",
    (m) => {
      m.modulos[0].licoes = [1, 13];
      m.modulos[1].licoes = [14, 24];
    },
    /12 lições/
  );
  invalido(
    "rejeita string vazia",
    (_m, l) => {
      l.licoes[0].objetivo = "  ";
    },
    /string obrigatória/
  );
  invalido(
    "rejeita estado desconhecido",
    (m) => {
      m.modulos[0].estado = "desconhecido";
    },
    /estado desconhecido/
  );
  invalido(
    "rejeita intervalo incompatível",
    (m) => {
      m.modulos[1].licoes = [14, 25];
    },
    /intervalo incompatível|12 lições/
  );
  invalido(
    "rejeita número de lição duplicado",
    (_m, l) => {
      l.licoes[1].numero = 1;
    },
    /duplicado/
  );
  invalido(
    "rejeita sequência quebrada",
    (_m, l) => {
      l.licoes[1].numero = 3;
    },
    /sequência quebrada/
  );
  invalido(
    "rejeita módulo da lição incompatível",
    (_m, l) => {
      l.licoes[0].modulo = 2;
    },
    /módulo incompatível/
  );
  invalido(
    "rejeita título duplicado",
    (_m, l) => {
      l.licoes[1].titulo = l.licoes[0].titulo;
    },
    /título duplicado/
  );
  invalido(
    "rejeita tipo incorreto",
    (_m, l) => {
      l.licoes[0].produzida = "sim";
    },
    /boolean/
  );
  invalido(
    "rejeita preenchimento automático de null autorizado",
    (m) => {
      m.modulos[2].virtude = "valor inferido";
    },
    /deve permanecer null; preenchimento exige decisão humana/
  );
  invalido(
    "rejeita null fora das lacunas autorizadas",
    (m) => {
      m.modulos[0].marcha = null;
    },
    /null não autorizado|sem campo/
  );
  invalido(
    "rejeita item de lição que não seja objeto",
    (_m, l) => {
      l.licoes[0] = [];
    },
    /deve ser objeto/
  );
});
