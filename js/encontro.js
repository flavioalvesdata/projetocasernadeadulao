/**
 * Linha do tempo do encontro (Ato 6).
 */
(function () {
  function initEncontro() {
    const root = document.querySelector("[data-encontro]");
    if (!root || !window.Caserna || !window.Caserna.initAbas) return;
    window.Caserna.initAbas(root);
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initEncontro = initEncontro;
})();
