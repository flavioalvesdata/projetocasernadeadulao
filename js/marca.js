/**
 * Escudo anatomizado (seção 4 — A marca).
 */
(function () {
  function initMarca() {
    const root = document.querySelector("[data-marca-escudo]");
    if (!root || !window.Caserna || !window.Caserna.initAbas) return;
    window.Caserna.initAbas(root);
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initMarca = initMarca;
})();
