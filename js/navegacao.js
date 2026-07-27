/**
 * Índice lateral + trilho da marcha (cinco movimentos, quinze seções).
 * Mobile: barra de progresso no topo; desktop: trilho vertical à esquerda.
 */
(function () {
  const MOVIMENTOS = [
    {
      id: "movimento-1",
      rotulo: "Necessidade",
      romano: "I",
      secoes: ["secao-1", "secao-2", "secao-3", "secao-4"],
    },
    {
      id: "movimento-2",
      rotulo: "Resposta",
      romano: "II",
      secoes: ["secao-5", "secao-6", "secao-7"],
    },
    {
      id: "movimento-3",
      rotulo: "Programa",
      romano: "III",
      secoes: ["secao-8", "secao-9", "secao-10", "secao-11"],
    },
    {
      id: "movimento-4",
      rotulo: "Prova",
      romano: "IV",
      secoes: ["secao-12", "secao-13"],
    },
    {
      id: "movimento-5",
      rotulo: "Pedido",
      romano: "V",
      secoes: ["secao-14", "secao-15"],
    },
  ];

  function movimentoDeSecao(secaoId) {
    return MOVIMENTOS.find((m) => m.secoes.indexOf(secaoId) !== -1);
  }

  function initNavegacao() {
    const links = Array.from(document.querySelectorAll(".indice__link"));
    const marcadores = Array.from(
      document.querySelectorAll(".trilho__marcador")
    );
    const barra = document.querySelector(".progresso-topo__barra");
    const progressoIndice = document.querySelector(".indice__progresso");

    const secoes = [];
    MOVIMENTOS.forEach((m) => {
      m.secoes.forEach((sid) => {
        const el = document.getElementById(sid);
        if (el) secoes.push(el);
      });
    });

    let ticking = false;
    let ativoId = null;

    function atualizar() {
      ticking = false;
      const y = window.scrollY || window.pageYOffset;
      const docH =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? Math.min(1, Math.max(0, y / docH)) : 0;

      if (barra) {
        barra.style.transform = "scaleX(" + pct + ")";
      }
      if (progressoIndice) {
        progressoIndice.style.transform = "scaleX(" + pct + ")";
      }

      const probe = y + window.innerHeight * 0.35;
      let atual = secoes[0];
      for (let i = 0; i < secoes.length; i++) {
        if (secoes[i].offsetTop <= probe) {
          atual = secoes[i];
        }
      }
      if (!atual) return;

      const id = atual.id;
      if (id === ativoId) return;
      ativoId = id;

      links.forEach((link) => {
        const href = link.getAttribute("href") || "";
        const alvo = href.replace("#", "");
        const on = alvo === id;
        link.classList.toggle("indice__link--ativo", on);
        if (on) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });

      const mov = movimentoDeSecao(id);
      marcadores.forEach((btn) => {
        const mid = btn.getAttribute("data-movimento");
        const on = mov && mid === mov.id;
        btn.classList.toggle("trilho__marcador--ativo", on);
        btn.setAttribute("aria-current", on ? "true" : "false");
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(atualizar);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    atualizar();

    /* Drawer do índice no mobile */
    const toggle = document.querySelector("[data-indice-toggle]");
    const drawer = document.querySelector("[data-indice]");
    const overlay = document.querySelector("[data-indice-overlay]");
    const fundo = Array.from(document.querySelectorAll("main, footer, .trilho"));
    let focoAnterior = null;

    function elementosFocaveis() {
      if (!drawer) return [];
      return Array.from(
        drawer.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((elemento) => !elemento.hidden);
    }

    function fecharIndice({ restaurarFoco = true } = {}) {
      if (!drawer) return;
      drawer.classList.remove("indice--aberto");
      document.body.classList.remove("indice-aberto");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      fundo.forEach((elemento) => {
        elemento.inert = false;
        elemento.removeAttribute("aria-hidden");
      });
      if (
        restaurarFoco &&
        focoAnterior &&
        typeof focoAnterior.focus === "function"
      ) {
        focoAnterior.focus();
      }
      focoAnterior = null;
    }

    function abrirIndice() {
      if (!drawer) return;
      focoAnterior = document.activeElement;
      drawer.classList.add("indice--aberto");
      document.body.classList.add("indice-aberto");
      if (toggle) toggle.setAttribute("aria-expanded", "true");
      fundo.forEach((elemento) => {
        elemento.inert = true;
        elemento.setAttribute("aria-hidden", "true");
      });
      const primeiro = elementosFocaveis()[0];
      if (primeiro) primeiro.focus();
    }

    if (toggle && drawer) {
      toggle.addEventListener("click", () => {
        if (drawer.classList.contains("indice--aberto")) {
          fecharIndice();
        } else {
          abrirIndice();
        }
      });
    }
    if (overlay) {
      overlay.addEventListener("click", fecharIndice);
    }
    links.forEach((link) => {
      link.addEventListener("click", () =>
        fecharIndice({ restaurarFoco: false })
      );
    });
    document.addEventListener("keydown", (evento) => {
      if (!drawer || !drawer.classList.contains("indice--aberto")) return;
      if (evento.key === "Escape") {
        evento.preventDefault();
        fecharIndice();
        return;
      }
      if (evento.key !== "Tab") return;
      const focaveis = elementosFocaveis();
      if (!focaveis.length) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    });
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initNavegacao = initNavegacao;
  window.Caserna.MOVIMENTOS = MOVIMENTOS;
})();
