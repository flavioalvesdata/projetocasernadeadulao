/**
 * Matriz curricular (seção 6) — 48 lições a partir de DADOS_MATRIZ.
 */
(function () {
  function initMatriz() {
    const root = document.querySelector("[data-matriz]");
    if (!root) return;

    const matriz = window.DADOS_MATRIZ;
    const modulos = window.DADOS_MODULOS && window.DADOS_MODULOS.modulos;
    if (!matriz || !matriz.licoes || !modulos) return;

    const filtro = root.querySelector("[data-matriz-filtro]");
    const lista = root.querySelector("[data-matriz-lista]");
    if (!filtro || !lista) return;

    let filtroAtual = "todos";

    function licoesDoModulo(num) {
      return matriz.licoes.filter((l) => l.modulo === num);
    }

    function htmlLicao(l) {
      const estado = l.produzida ? "Material produzido" : "Planejada";
      const classe = l.produzida
        ? "matriz__estado--produzida"
        : "matriz__estado--planejada";
      return `
        <article class="matriz__licao">
          <header class="matriz__licao-cabeca">
            <span class="matriz__licao-num">${l.numero}</span>
            <h5 class="matriz__licao-titulo">${l.titulo}</h5>
            <span class="matriz__estado ${classe}">${estado}</span>
          </header>
          <p class="matriz__licao-base"><span>Texto-base</span> ${l.textoBase}</p>
          <p class="matriz__licao-obj">${l.objetivo}</p>
        </article>`;
    }

    function htmlModulo(mod, expandido) {
      const licoes = licoesDoModulo(mod.numero);
      const aberto = expandido ? "true" : "false";
      const oculto = expandido ? "" : " hidden";
      return `
        <section class="matriz__modulo" data-modulo="${mod.numero}">
          <button class="matriz__modulo-toggle" type="button"
            aria-expanded="${aberto}"
            aria-controls="matriz-corpo-${mod.numero}"
            id="matriz-toggle-${mod.numero}">
            <span class="matriz__modulo-meta">
              <span class="matriz__modulo-nome">Módulo ${mod.numero} · ${mod.nome}</span>
              <span class="matriz__modulo-sub">${mod.subtitulo}</span>
              <span class="matriz__modulo-peca">${mod.peca} · lições ${mod.licoes[0]}–${mod.licoes[1]}</span>
            </span>
            <span class="matriz__modulo-contagem">${licoes.length} lições</span>
          </button>
          <div class="matriz__modulo-corpo" id="matriz-corpo-${mod.numero}"
            role="region" aria-labelledby="matriz-toggle-${mod.numero}"${oculto}>
            ${licoes.map(htmlLicao).join("")}
          </div>
        </section>`;
    }

    function render() {
      const mods =
        filtroAtual === "todos"
          ? modulos
          : modulos.filter((m) => String(m.numero) === filtroAtual);

      lista.innerHTML = mods
        .map((m) => {
          const expandido = filtroAtual !== "todos" || m.numero === 1;
          return htmlModulo(m, expandido);
        })
        .join("");

      // Com filtro específico, sempre expandido
      if (filtroAtual !== "todos") {
        lista.querySelectorAll(".matriz__modulo-corpo").forEach((el) => {
          el.removeAttribute("hidden");
        });
        lista.querySelectorAll(".matriz__modulo-toggle").forEach((btn) => {
          btn.setAttribute("aria-expanded", "true");
        });
      }

      lista.querySelectorAll(".matriz__modulo-toggle").forEach((btn) => {
        btn.addEventListener("click", () => {
          const expandido = btn.getAttribute("aria-expanded") === "true";
          const painel = document.getElementById(
            btn.getAttribute("aria-controls")
          );
          btn.setAttribute("aria-expanded", expandido ? "false" : "true");
          if (painel) {
            if (expandido) painel.setAttribute("hidden", "");
            else painel.removeAttribute("hidden");
          }
        });
      });
    }

    filtro.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-filtro]");
      if (!btn) return;
      filtroAtual = btn.getAttribute("data-filtro");
      filtro.querySelectorAll("[data-filtro]").forEach((b) => {
        const ativo = b === btn;
        b.classList.toggle("matriz__filtro-btn--ativo", ativo);
        b.setAttribute("aria-pressed", ativo ? "true" : "false");
      });
      render();
    });

    // Fallback sem JS: se lista já tiver conteúdo estático, não sobrescreve.
    // Aqui a lista começa vazia e o JS monta — sem JS, noscript abaixo no HTML.
    render();
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initMatriz = initMatriz;
})();
