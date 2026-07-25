/**
 * Ponto de entrada — orquestra os comportamentos sem acoplá-los.
 */
(function () {
  document.documentElement.classList.add("js");

  function aplicarSaudacao() {
    const el = document.querySelector("[data-saudacao]");
    const cfg = window.SITE_CONFIG;
    if (!el || !cfg || !cfg.destinatario) return;
    el.textContent = `Pastor ${cfg.destinatario},`;
  }

  function iniciar() {
    aplicarSaudacao();
    if (window.Caserna) {
      if (window.Caserna.initNavegacao) window.Caserna.initNavegacao();
      if (window.Caserna.initRevelar) window.Caserna.initRevelar();
      if (window.Caserna.initMarcha) window.Caserna.initMarcha();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
