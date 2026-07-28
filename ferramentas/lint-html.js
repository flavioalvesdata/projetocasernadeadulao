/**
 * Validação HTML mínima com html-validate.
 */
"use strict";

const { HtmlValidate } = require("html-validate");
const fs = require("fs");
const path = require("path");

const raiz = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(raiz, "index.html"), "utf8");

const htmlvalidate = new HtmlValidate({
  extends: ["html-validate:recommended"],
  rules: {
    "no-inline-style": "error",
    // O Prettier normaliza o doctype em minúsculas; validamos explicitamente o mesmo padrão.
    "doctype-style": ["error", { style: "lowercase" }],
    // O HTML editorial segue a serialização autocontida produzida pelo Prettier.
    "void-style": ["error", { style: "selfclosing" }],
    "no-implicit-button-type": "error",
    "element-permitted-content": "error",
    "prefer-native-element": "error",
    "text-content": "error",
    "wcag/h30": "error",
    "long-title": "error",
    "no-trailing-whitespace": "error",
    "aria-label-misuse": "error",
  },
});

htmlvalidate
  .validateString(html, "index.html")
  .then((report) => {
    const errors = report.results.flatMap((r) =>
      (r.messages || []).filter((m) => m.severity === 2)
    );
    const warnings = report.results.flatMap((r) =>
      (r.messages || []).filter((m) => m.severity === 1)
    );

    warnings.slice(0, 20).forEach((m) => {
      console.warn(`WARN ${m.line}:${m.column} ${m.ruleId}: ${m.message}`);
    });

    if (errors.length) {
      errors.forEach((m) => {
        console.error(`ERR ${m.line}:${m.column} ${m.ruleId}: ${m.message}`);
      });
      process.exit(1);
    }

    console.log(`lint:html OK (${warnings.length} avisos)`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
