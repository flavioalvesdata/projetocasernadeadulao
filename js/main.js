/**
 * Ponto de entrada: saudação, navegação, revelação e escudo.
 */
(function () {
  function aplicarSaudacao() {
    const cfg = window.SITE_CONFIG;
    if (!cfg || !cfg.destinatario) return;
    const el = document.querySelector("[data-saudacao]");
    if (!el) return;
    el.textContent = "Pastor " + cfg.destinatario + ",";
  }

  function init() {
    aplicarSaudacao();
    if (window.Caserna) {
      if (window.Caserna.initNavegacao) window.Caserna.initNavegacao();
      if (window.Caserna.initRevelar) window.Caserna.initRevelar();
      if (window.Caserna.initMarca) window.Caserna.initMarca();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
