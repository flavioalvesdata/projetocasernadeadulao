/**
 * Módulo reservado: linha do tempo do encontro.
 * Não é inicializado pelo documento atual e não deve pressupor conteúdo pastoral inexistente.
 */
(function () {
  function initEncontro() {
    if (!window.Caserna || !window.Caserna.initAbasPorSeletor) return null;
    return window.Caserna.initAbasPorSeletor("[data-encontro]");
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initEncontro = initEncontro;
})();
