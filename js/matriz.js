/**
 * Matriz curricular (seção 6) — 48 lições a partir de DADOS_MATRIZ.
 */
(function () {
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((key) => {
        const val = attrs[key];
        if (val == null || val === false) return;
        if (key === "text") node.textContent = val;
        else node.setAttribute(key, val === true ? "" : String(val));
      });
    }
    (children || []).forEach((child) => {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function initMatriz() {
    const root = document.querySelector("[data-matriz]");
    if (!root) return;

    const matriz = window.DADOS_MATRIZ;
    const modulos = window.DADOS_MODULOS && window.DADOS_MODULOS.modulos;
    if (!matriz || !matriz.licoes || !modulos) return;

    const filtro = root.querySelector("[data-matriz-filtro]");
    const lista = root.querySelector("[data-matriz-lista]");
    const live = root.querySelector("[data-matriz-live]");
    if (!filtro || !lista) return;

    let filtroAtual = "todos";

    function licoesDoModulo(num) {
      return matriz.licoes.filter((l) => l.modulo === num);
    }

    function montarLicao(l) {
      const estado = l.produzida ? "Material produzido" : "Planejada";
      const classe = l.produzida
        ? "matriz__estado--produzida"
        : "matriz__estado--planejada";

      const artigo = el("article", { class: "matriz__licao" });
      const cabeca = el("header", { class: "matriz__licao-cabeca" });
      cabeca.appendChild(
        el("span", { class: "matriz__licao-num", text: String(l.numero) })
      );
      cabeca.appendChild(el("h5", { class: "matriz__licao-titulo", text: l.titulo }));
      cabeca.appendChild(el("span", { class: `matriz__estado ${classe}`, text: estado }));
      artigo.appendChild(cabeca);

      const base = el("p", { class: "matriz__licao-base" });
      base.appendChild(el("span", { text: "Texto-base" }));
      base.appendChild(document.createTextNode(` ${l.textoBase}`));
      artigo.appendChild(base);
      artigo.appendChild(el("p", { class: "matriz__licao-obj", text: l.objetivo }));
      return artigo;
    }

    function montarModulo(mod, expandido) {
      const licoes = licoesDoModulo(mod.numero);
      const secao = el("section", {
        class: "matriz__modulo",
        "data-modulo": String(mod.numero),
      });

      const btn = el("button", {
        class: "matriz__modulo-toggle",
        type: "button",
        "aria-expanded": expandido ? "true" : "false",
        "aria-controls": `matriz-corpo-${mod.numero}`,
        id: `matriz-toggle-${mod.numero}`,
      });

      const meta = el("span", { class: "matriz__modulo-meta" });
      meta.appendChild(
        el("span", {
          class: "matriz__modulo-nome",
          text: `Módulo ${mod.numero} · ${mod.nome}`,
        })
      );
      meta.appendChild(el("span", { class: "matriz__modulo-sub", text: mod.subtitulo }));
      meta.appendChild(
        el("span", {
          class: "matriz__modulo-peca",
          text: `${mod.peca} · lições ${mod.licoes[0]}–${mod.licoes[1]}`,
        })
      );
      btn.appendChild(meta);
      btn.appendChild(
        el("span", {
          class: "matriz__modulo-contagem",
          text: `${licoes.length} lições`,
        })
      );

      const corpo = el("div", {
        class: "matriz__modulo-corpo",
        id: `matriz-corpo-${mod.numero}`,
        role: "region",
        "aria-labelledby": `matriz-toggle-${mod.numero}`,
        hidden: expandido ? null : true,
      });
      licoes.forEach((l) => corpo.appendChild(montarLicao(l)));

      btn.addEventListener("click", () => {
        const aberto = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", aberto ? "false" : "true");
        if (aberto) corpo.setAttribute("hidden", "");
        else corpo.removeAttribute("hidden");
      });

      secao.appendChild(btn);
      secao.appendChild(corpo);
      return secao;
    }

    function anunciar(mods) {
      if (!live) return;
      const total = mods.reduce((acc, m) => acc + licoesDoModulo(m.numero).length, 0);
      if (filtroAtual === "todos") {
        live.textContent = `Exibindo ${total} encontros de todos os módulos.`;
      } else {
        live.textContent = `Exibindo ${total} encontros do Módulo ${filtroAtual}.`;
      }
    }

    function render() {
      const mods =
        filtroAtual === "todos"
          ? modulos
          : modulos.filter((m) => String(m.numero) === filtroAtual);

      const frag = document.createDocumentFragment();
      mods.forEach((m) => {
        const expandido = filtroAtual !== "todos" || m.numero === 1;
        frag.appendChild(montarModulo(m, expandido));
      });
      lista.replaceChildren(frag);
      anunciar(mods);
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
      btn.focus();
    });

    render();
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initMatriz = initMatriz;
})();
