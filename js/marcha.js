/**
 * Mapa dos módulos (Ato 3) — delega ao módulo compartilhado de abas.
 */
(function () {
  function initMarcha() {
    const root = document.querySelector("[data-mapa-marcha]");
    if (!root || !window.Caserna || !window.Caserna.initAbas) return;
    window.Caserna.initAbas(root);
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initMarcha = initMarcha;
})();
