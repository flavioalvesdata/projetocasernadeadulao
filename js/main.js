/**
 * Ponto de entrada do prospecto.
 */
(function () {
  document.documentElement.classList.add("js");

  function aplicarSaudacao() {
    const el = document.querySelector("[data-saudacao]");
    const cfg = window.SITE_CONFIG;
    if (!el || !cfg || !cfg.destinatario) return;
    el.textContent = `Pastor ${cfg.destinatario},`;
  }

  function aplicarEncerramento() {
    const cfg = window.SITE_CONFIG;
    if (!cfg) return;

    const nome = document.querySelector("[data-encerramento-nome]");
    if (nome && cfg.nomeFormal) nome.textContent = cfg.nomeFormal;

    const cargo = document.querySelector("[data-encerramento-cargo]");
    if (cargo && cfg.cargo) cargo.textContent = cfg.cargo;

    const email = document.querySelector("[data-encerramento-email]");
    if (email && cfg.email) {
      email.textContent = cfg.email;
      email.setAttribute("href", `mailto:${cfg.email}`);
    }

    const versao = document.querySelector("[data-versao]");
    if (versao) versao.textContent = "0.4.0";
  }

  function iniciarModulo(nome, fn) {
    if (typeof fn !== "function") return;
    try {
      fn();
    } catch (err) {
      console.error(`[Caserna] Falha em ${nome}:`, err);
    }
  }

  function iniciar() {
    if (document.documentElement.dataset.casernaInit === "1") return;
    document.documentElement.dataset.casernaInit = "1";

    iniciarModulo("aplicarSaudacao", aplicarSaudacao);
    iniciarModulo("aplicarEncerramento", aplicarEncerramento);

    const api = window.Caserna;
    if (!api) {
      console.warn("[Caserna] window.Caserna indisponível");
      return;
    }

    iniciarModulo("initNavegacao", api.initNavegacao);
    iniciarModulo("initRevelar", api.initRevelar);
    iniciarModulo("initMarcha", api.initMarcha);
    iniciarModulo("initMarca", api.initMarca);
    iniciarModulo("initMatriz", api.initMatriz);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
