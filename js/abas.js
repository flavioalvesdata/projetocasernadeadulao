/**
 * Comportamento compartilhado de abas (tablist / tab / tabpanel).
 */
(function () {
  function initAbas(root, opcoes) {
    if (!root) return null;

    const opts = opcoes || {};
    const tablist = root.querySelector('[role="tablist"]');
    const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
    if (!tablist || !tabs.length) return null;

    function selecionar(indice, { focus = false } = {}) {
      const i = Math.max(0, Math.min(indice, tabs.length - 1));

      tabs.forEach((tab, idx) => {
        const ativo = idx === i;
        tab.setAttribute("aria-selected", ativo ? "true" : "false");
        tab.tabIndex = ativo ? 0 : -1;

        const panelId = tab.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;
        if (panel) {
          if (ativo) {
            panel.removeAttribute("hidden");
          } else {
            panel.setAttribute("hidden", "");
          }
        }
      });

      if (typeof opts.onChange === "function") {
        opts.onChange(i, tabs[i]);
      }

      if (focus) {
        tabs[i].focus();
      }
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => selecionar(i));
    });

    tablist.addEventListener("keydown", (event) => {
      const atual = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
      let proximo = null;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          proximo = (atual + 1) % tabs.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          proximo = (atual - 1 + tabs.length) % tabs.length;
          break;
        case "Home":
          proximo = 0;
          break;
        case "End":
          proximo = tabs.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      selecionar(proximo, { focus: true });
    });

    const inicial = Math.max(
      0,
      tabs.findIndex((t) => t.getAttribute("aria-selected") === "true")
    );
    selecionar(inicial);

    return { selecionar, tabs };
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initAbas = initAbas;
})();
