/**
 * Escudo anatomizado (seção 4 — A marca).
 */
(function () {
  function syncLista(root, indice) {
    const botoes = root.querySelectorAll("[data-escudo-lista] button");
    botoes.forEach((btn, i) => {
      const ativo = i === indice;
      btn.classList.toggle("marca-escudo__lista-btn--ativo", ativo);
      btn.setAttribute("aria-pressed", ativo ? "true" : "false");
    });
  }

  function initMarca() {
    const root = document.querySelector("[data-marca-escudo]");
    if (!root || !window.Caserna || !window.Caserna.initAbas) return;

    const api = window.Caserna.initAbas(root, {
      onChange(indice) {
        syncLista(root, indice);
      },
    });

    const lista = root.querySelector("[data-escudo-lista]");
    if (!lista || !api) return;

    lista.querySelectorAll("button[data-escudo-indice]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = Number(btn.getAttribute("data-escudo-indice"), 10);
        if (!Number.isNaN(i)) api.selecionar(i, { focus: true });
      });
    });

    syncLista(root, 0);
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initMarca = initMarca;
})();
