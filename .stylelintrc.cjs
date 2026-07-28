/** @type {import("stylelint").Config} */
module.exports = {
  extends: ["stylelint-config-standard"],
  rules: {
    "custom-property-pattern": "^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
    // A interface usa BEM em português; elementos (__), modificadores (--) e hífens são deliberados.
    "selector-class-pattern":
      "^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:(?:__|--)[a-z0-9]+(?:-[a-z0-9]+)*)*$",
    "selector-id-pattern": "^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
    "keyframes-name-pattern": "^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
    "color-function-notation": "modern",
    "color-function-alias-notation": "without-alpha",
    "alpha-value-notation": "percentage",
    "hue-degree-notation": "angle",
    "import-notation": "string",
    "no-descending-specificity": true,
    "media-feature-range-notation": "context",
    "font-family-name-quotes": "always-where-recommended",
    // Estes valores têm grafia canônica mista; os demais continuam obrigatoriamente em minúsculas.
    "value-keyword-case": [
      "lower",
      { ignoreKeywords: ["optimizeLegibility", "Georgia"] },
    ],
    // A primeira regra aninhada fica junto da media query, como o Prettier serializa.
    "rule-empty-line-before": [
      "always-multi-line",
      { except: ["first-nested"], ignore: ["after-comment"] },
    ],
    "custom-property-empty-line-before": "never",
  },
};
