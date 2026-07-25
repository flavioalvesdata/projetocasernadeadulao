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
    "no-inline-style": "off",
    "void-style": "off",
    "no-implicit-button-type": "off",
    "element-permitted-content": "warn",
    "prefer-native-element": "off",
    "text-content": "off",
    "wcag/h30": "off",
    "long-title": "off",
    "no-trailing-whitespace": "off",
    "aria-label-misuse": "off",
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
