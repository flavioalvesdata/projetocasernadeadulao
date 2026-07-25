/**
 * Anatomia de uma lição (Ato 4) — marcadores sobre a página.
 */
(function () {
  function initAnatomia() {
    const root = document.querySelector("[data-anatomia]");
    if (!root || !window.Caserna || !window.Caserna.initAbas) return;
    window.Caserna.initAbas(root);
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initAnatomia = initAnatomia;
})();
