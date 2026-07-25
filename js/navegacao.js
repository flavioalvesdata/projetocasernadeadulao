/**
 * Índice-trilho unificado: progresso por ato ativo + seção corrente.
 */
(function () {
  const ATOS = [
    "ato-0",
    "ato-1",
    "ato-2",
    "ato-3",
    "ato-4",
    "ato-5",
    "ato-6",
  ];

  function initNavegacao() {
    const secoes = ATOS.map((id) => document.getElementById(id)).filter(Boolean);
    const links = Array.from(document.querySelectorAll(".indice__link"));
    const progresso = document.querySelector(".indice__progresso");
    const body = document.body;
    let ativoId = secoes[0] ? secoes[0].id : null;

    if (!secoes.length) return;

    function atualizarProgresso(id) {
      if (!progresso) return;
      const ids = secoes.map((s) => s.id);
      const idx = Math.max(0, ids.indexOf(id || ativoId));
      const razao = ids.length > 1 ? idx / (ids.length - 1) : 0;
      progresso.style.height = `${Math.min(100, Math.max(0, razao * 100))}%`;
    }

    function ativarSecao(id) {
      ativoId = id;
      links.forEach((link) => {
        const ativo = link.dataset.ato === id;
        link.classList.toggle("indice__link--ativo", ativo);
        if (ativo) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });

      const secao = document.getElementById(id);
      if (secao) {
        const escuro = secao.classList.contains("ato--escuro");
        body.classList.toggle("tema-escuro", escuro);
        body.classList.toggle("tema-claro", !escuro);
      }

      atualizarProgresso(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visiveis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visiveis[0]) {
          ativarSecao(visiveis[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    secoes.forEach((s) => observer.observe(s));

    const hash = (location.hash || "").replace(/^#/, "");
    const inicial =
      hash && secoes.some((s) => s.id === hash) ? hash : secoes[0].id;
    ativarSecao(inicial);
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initNavegacao = initNavegacao;
})();
