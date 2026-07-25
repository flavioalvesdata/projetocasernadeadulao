"use strict";

module.exports = [
  {
    files: ["js/**/*.js", "ferramentas/**/*.js", "testes/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        location: "readonly",
        console: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        process: "readonly",
        Buffer: "readonly",
        IntersectionObserver: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        URL: "readonly",
        HTMLElement: "readonly",
        Node: "readonly",
        DocumentFragment: "readonly",
        history: "readonly",
        getComputedStyle: "readonly",
      },
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
    files: ["testes/e2e/**/*.js"],
    languageOptions: {
      globals: {
        getComputedStyle: "readonly",
      },
    },
  },
];


