/**
 * Índice-trilho unificado: progresso da marcha + seção ativa.
 * Um só controle à esquerda — sem menu truncado à direita.
 */
(function () {
  const ATOS = ["ato-0", "ato-1", "ato-2", "ato-3"];

  function initNavegacao() {
    const secoes = ATOS.map((id) => document.getElementById(id)).filter(Boolean);
    const links = Array.from(document.querySelectorAll(".indice__link"));
    const progresso = document.querySelector(".indice__progresso");
    const body = document.body;

    if (!secoes.length) return;

    function atualizarProgresso() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const razao = max > 0 ? window.scrollY / max : 0;
      if (progresso) {
        progresso.style.height = `${Math.min(100, Math.max(0, razao * 100))}%`;
      }
    }

    function ativarSecao(id) {
      links.forEach((link) => {
        const ativo = link.dataset.ato === id;
        link.classList.toggle("indice__link--ativo", ativo);
        if (ativo) {
          link.setAttribute("aria-current", "true");
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
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    secoes.forEach((s) => observer.observe(s));

    window.addEventListener("scroll", atualizarProgresso, { passive: true });
    window.addEventListener("resize", atualizarProgresso, { passive: true });
    atualizarProgresso();
    ativarSecao(secoes[0].id);
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initNavegacao = initNavegacao;
})();
