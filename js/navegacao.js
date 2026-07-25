/**
 * Índice hierárquico, sumário móvel e progresso de leitura por rolagem.
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
      secoes: ["secao-7", "secao-8", "secao-9"],
    },
    {
      id: "parte-4",
      secoes: ["secao-10"],
    },
  ];

  /* #secao-11 e #secao-12 permanecem como âncoras ocultas nas seções 8 e 9.
     O antigo #secao-10 (progressão) passou a ser #secao-7; #secao-10 agora é o fechamento. */
  const LEGACY = {
    "secao-11": "secao-8",
    "secao-12": "secao-9",
  };

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
    const botaoSumario = document.querySelector("[data-sumario-toggle]");
    const painelSumario = document.querySelector("[data-sumario-painel]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!alvos.length) return;

    function atualizarProgressoScroll() {
      if (!progresso) return;
      const doc = document.documentElement;
      const rolavel = doc.scrollHeight - window.innerHeight;
      const razao = rolavel > 0 ? window.scrollY / rolavel : 0;
      const pct = Math.min(100, Math.max(0, razao * 100));
      if (reducedMotion) {
        progresso.style.transition = "none";
      }
      progresso.style.height = `${pct}%`;
    }

    function ativar(id) {
      const parte = parteDeSecao(id);

      links.forEach((link) => {
        const href = (link.getAttribute("href") || "").replace(/^#/, "");
        const secaoAtiva = href === id;
        const parteAtiva =
          parte && href === parte.id && link.classList.contains("indice__parte");
        link.classList.toggle("indice__link--ativo", secaoAtiva);
        link.classList.toggle("indice__parte--ativa", !!parteAtiva);
        if (secaoAtiva) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });

      const el = document.getElementById(id);
      if (el) {
        const escuro =
          el.classList.contains("ato--escuro") || el.classList.contains("parte");
        body.classList.toggle("tema-escuro", escuro);
        body.classList.toggle("tema-claro", !escuro);
      }
    }

    function fecharSumario() {
      if (!botaoSumario || !painelSumario) return;
      botaoSumario.setAttribute("aria-expanded", "false");
      body.classList.remove("sumario-aberto");
    }

    function abrirSumario() {
      if (!botaoSumario || !painelSumario) return;
      botaoSumario.setAttribute("aria-expanded", "true");
      body.classList.add("sumario-aberto");
      const ativo = painelSumario.querySelector('[aria-current="location"]');
      const alvo = ativo || painelSumario.querySelector(".indice__link");
      if (alvo) alvo.focus();
    }

    if (botaoSumario && painelSumario) {
      botaoSumario.addEventListener("click", () => {
        const aberto = botaoSumario.getAttribute("aria-expanded") === "true";
        if (aberto) fecharSumario();
        else abrirSumario();
      });

      painelSumario.addEventListener("click", (event) => {
        const link = event.target.closest("a[href^='#']");
        if (link) fecharSumario();
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") fecharSumario();
      });
    }

    function onScroll() {
      atualizarProgressoScroll();
    }

    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
      },
      { passive: true }
    );
    window.addEventListener("resize", atualizarProgressoScroll);

    if (typeof IntersectionObserver === "function") {
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
    } else {
      document.querySelectorAll(".revelar").forEach((el) => {
        el.classList.add("revelar--visivel");
      });
      ativar("secao-1");
    }

    let hash = (location.hash || "").replace(/^#/, "");
    if (LEGACY[hash]) {
      hash = LEGACY[hash];
      if (history.replaceState) {
        history.replaceState(null, "", `#${hash}`);
      }
    }
    const inicial =
      hash && alvos.some((a) => a.id === hash) ? hash : "secao-1";
    ativar(inicial);
    atualizarProgressoScroll();
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initNavegacao = initNavegacao;
})();
