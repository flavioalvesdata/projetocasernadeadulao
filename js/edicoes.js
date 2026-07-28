/**
 * Módulo reservado: comparador de edições.
 * Não é inicializado pelo documento atual e não deve pressupor conteúdo pastoral inexistente.
 */
(function () {
  function initEdicoes() {
    if (!window.Caserna || !window.Caserna.initAbasPorSeletor) return null;
    return window.Caserna.initAbasPorSeletor("[data-edicoes]");
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initEdicoes = initEdicoes;
})();
