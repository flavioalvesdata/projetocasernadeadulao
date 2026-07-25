/**
 * Índice lateral, seção ativa e trilho da marcha.
 * O trilho materializa progresso na narrativa — não é barra decorativa.
 */
(function () {
  const ATOS = ["ato-0", "ato-1", "ato-2", "ato-3"];

  function initNavegacao() {
    const secoes = ATOS.map((id) => document.getElementById(id)).filter(Boolean);
    const links = Array.from(document.querySelectorAll(".indice__link"));
    const trilhoProgresso = document.querySelector(".trilho__progresso");
    const marcadores = Array.from(document.querySelectorAll(".trilho__marcador"));
    const body = document.body;

    if (!secoes.length) return;

    function atualizarTrilho() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progresso = max > 0 ? window.scrollY / max : 0;
      if (trilhoProgresso) {
        trilhoProgresso.style.height = `${Math.min(100, Math.max(0, progresso * 100))}%`;
      }
    }

    function ativarSecao(id) {
      links.forEach((link) => {
        const ativo = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("indice__link--ativo", ativo);
        if (ativo) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });

      marcadores.forEach((m) => {
        m.classList.toggle("trilho__marcador--ativo", m.dataset.ato === id);
      });

      const secao = document.getElementById(id);
      if (secao) {
        const escuro = secao.classList.contains("ato--escuro");
        body.classList.toggle("tema-escuro", escuro);
        body.classList.toggle("tema-claro", !escuro);
      }
    }

    // Observa qual ato ocupa o centro do viewport — mais estável que só o topo.
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

    window.addEventListener("scroll", atualizarTrilho, { passive: true });
    window.addEventListener("resize", atualizarTrilho, { passive: true });
    atualizarTrilho();
    ativarSecao(secoes[0].id);
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initNavegacao = initNavegacao;
})();
