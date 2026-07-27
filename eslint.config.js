"use strict";

const globaisNavegador = {
  window: "readonly",
  document: "readonly",
  location: "readonly",
  console: "readonly",
  IntersectionObserver: "readonly",
  requestAnimationFrame: "readonly",
  cancelAnimationFrame: "readonly",
  URL: "readonly",
  HTMLElement: "readonly",
  Node: "readonly",
  DocumentFragment: "readonly",
  history: "readonly",
  getComputedStyle: "readonly",
  fetch: "readonly",
  structuredClone: "readonly",
};

const globaisNode = {
  module: "readonly",
  require: "readonly",
  __dirname: "readonly",
  __filename: "readonly",
  process: "readonly",
  Buffer: "readonly",
  console: "readonly",
  URL: "readonly",
  fetch: "readonly",
  structuredClone: "readonly",
  setTimeout: "readonly",
  clearTimeout: "readonly",
};

module.exports = [
  {
    files: ["js/**/*.js", "ferramentas/**/*.js", "testes/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-var": "error",
      "prefer-const": "warn",
      eqeqeq: ["error", "smart"],
    },
  },
  {
    files: ["js/**/*.js"],
    languageOptions: {
      globals: globaisNavegador,
    },
  },
  {
    files: ["ferramentas/**/*.js"],
    languageOptions: {
      globals: globaisNode,
    },
  },
  {
    files: ["ferramentas/capturar-prototipos.js"],
    languageOptions: {
      // Estes nomes aparecem apenas em callbacks executados por page.evaluate.
      globals: {
        document: "readonly",
        window: "readonly",
      },
    },
  },
  {
    files: ["testes/unitarios/**/*.js"],
    languageOptions: {
      globals: {
        ...globaisNode,
        test: "readonly",
        describe: "readonly",
        it: "readonly",
        before: "readonly",
        after: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
  },
  {
    files: ["testes/e2e/**/*.js"],
    languageOptions: {
      // Os callbacks de page.evaluate são escritos neste arquivo, mas rodam no browser.
      globals: { ...globaisNode, ...globaisNavegador },
    },
  },
];
