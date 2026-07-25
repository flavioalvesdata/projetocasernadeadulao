/**
 * Comparador de edições (Ato 5) — abas Aluno / Instrutor.
 */
(function () {
  function initEdicoes() {
    const root = document.querySelector("[data-edicoes]");
    if (!root || !window.Caserna || !window.Caserna.initAbas) return;
    window.Caserna.initAbas(root);
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initEdicoes = initEdicoes;
})();
