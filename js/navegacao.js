/**
 * Índice hierárquico (partes → seções) e trilho das quatro partes.
 */
(function () {
  const PARTES = [
    {
      id: "parte-1",
      secoes: ["secao-1", "secao-2", "secao-3", "secao-4"],
    },
    {
      id: "parte-2",
      secoes: ["secao-5", "secao-6"],
    },
    {
      id: "parte-3",
      secoes: ["secao-10", "secao-11", "secao-12"],
    },
    {
      id: "parte-4",
      secoes: [],
    },
  ];

  function parteDeSecao(secaoId) {
    return PARTES.find(
      (p) => p.id === secaoId || p.secoes.indexOf(secaoId) !== -1
    );
  }

  function initNavegacao() {
    const alvos = [];
    PARTES.forEach((p) => {
      const el = document.getElementById(p.id);
      if (el) alvos.push(el);
      p.secoes.forEach((sid) => {
        const s = document.getElementById(sid);
        if (s) alvos.push(s);
      });
    });

    const links = Array.from(document.querySelectorAll(".indice__link"));
    const progresso = document.querySelector(".indice__progresso");
    const body = document.body;
    let parteAtiva = "parte-1";

    if (!alvos.length) return;

    function atualizarProgresso(parteId) {
      if (!progresso) return;
      const idx = Math.max(
        0,
        PARTES.findIndex((p) => p.id === parteId)
      );
      const razao = PARTES.length > 1 ? idx / (PARTES.length - 1) : 0;
      progresso.style.height = `${Math.min(100, Math.max(0, razao * 100))}%`;
    }

    function ativar(id) {
      const parte = parteDeSecao(id);
      if (parte) {
        parteAtiva = parte.id;
        atualizarProgresso(parte.id);
      }

      links.forEach((link) => {
        const href = (link.getAttribute("href") || "").replace(/^#/, "");
        const ativo =
          href === id ||
          (parte && href === parte.id && link.classList.contains("indice__parte"));
        const secaoAtiva = href === id;
        link.classList.toggle("indice__link--ativo", secaoAtiva);
        link.classList.toggle(
          "indice__parte--ativa",
          parte && href === parte.id
        );
        if (secaoAtiva) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });

      const el = document.getElementById(id);
      if (el) {
        const escuro =
          el.classList.contains("ato--escuro") ||
          el.classList.contains("parte");
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
          ativar(visiveis[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    alvos.forEach((s) => observer.observe(s));

    const hash = (location.hash || "").replace(/^#/, "");
    const inicial =
      hash && alvos.some((a) => a.id === hash) ? hash : "secao-1";
    ativar(inicial);
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initNavegacao = initNavegacao;
})();
