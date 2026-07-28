/**
 * Módulo reservado: anatomia de uma lição.
 * Não é inicializado pelo documento atual e não deve pressupor conteúdo pastoral inexistente.
 */
(function () {
  function initAnatomia() {
    if (!window.Caserna || !window.Caserna.initAbasPorSeletor) return null;
    return window.Caserna.initAbasPorSeletor("[data-anatomia]");
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initAnatomia = initAnatomia;
})();
