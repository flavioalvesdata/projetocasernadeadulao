/**
 * Mapa dos módulos (Ato 3): tabs acessíveis por clique, toque e teclado.
 * Nada depende de hover — a sequência é a metáfora.
 */
(function () {
  function initMarcha() {
    const root = document.querySelector("[data-mapa-marcha]");
    if (!root) return;

    const tablist = root.querySelector('[role="tablist"]');
    const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
    const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));
    if (!tablist || !tabs.length) return;

    function selecionar(indice, { focus = false } = {}) {
      tabs.forEach((tab, i) => {
        const ativo = i === indice;
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

      if (focus) {
        tabs[indice].focus();
      }
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => selecionar(i));
    });

    tablist.addEventListener("keydown", (event) => {
      const atual = tabs.findIndex(
        (t) => t.getAttribute("aria-selected") === "true"
      );
      let proximo = null;

      // Horizontal no desktop, vertical no mobile — ambas as setas navegam.
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

    // Módulo 1 vem selecionado por padrão (já no HTML); reforça ARIA.
    const inicial = Math.max(
      0,
      tabs.findIndex((t) => t.getAttribute("aria-selected") === "true")
    );
    selecionar(inicial);
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initMarcha = initMarcha;
})();
