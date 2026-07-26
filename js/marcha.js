/**
 * Mapa dos módulos (seção 5) — alimentado por DADOS_MODULOS.
 */
(function () {
  function rotuloEstado(estado) {
    if (estado === "produzido") return "Material completo";
    return "Produção condicionada";
  }

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((key) => {
        const val = attrs[key];
        if (val == null || val === false) return;
        if (key === "text") node.textContent = val;
        else if (key === "html") node.innerHTML = val;
        else node.setAttribute(key, val === true ? "" : String(val));
      });
    }
    (children || []).forEach((child) => {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function montarPainel(mod) {
    const campos = [
      ["Ênfase", mod.enfase],
      ["Etapa", mod.etapa],
      ["Resultado esperado", mod.resultado],
      ["Peça da armadura", mod.peca],
    ];
    if (mod.virtude) campos.push(["Virtude", mod.virtude]);
    if (mod.tema) campos.push(["Tema", mod.tema]);
    if (mod.temaRef) campos.push(["Referência do tema", mod.temaRef]);

    const dl = el("dl", { class: "mapa__detalhe" });
    campos.forEach(([dt, dd]) => {
      const wrap = el("div");
      wrap.appendChild(el("dt", { text: dt }));
      wrap.appendChild(el("dd", { text: dd }));
      dl.appendChild(wrap);
    });

    const painel = el("div", {
      class: "mapa__painel",
      role: "tabpanel",
      id: `painel-modulo-${mod.numero}`,
      "aria-labelledby": `tab-modulo-${mod.numero}`,
      hidden: mod.numero !== 1 ? true : null,
    });
    painel.appendChild(
      el("p", {
        class: "mapa__painel-sobrelinha",
        text: `Módulo ${mod.numero} · ${mod.peca}`,
      })
    );
    painel.appendChild(el("h4", { class: "mapa__painel-titulo", text: mod.nome }));
    painel.appendChild(el("p", { class: "mapa__subtitulo-mod", text: mod.subtitulo }));
    painel.appendChild(dl);
    return painel;
  }

  function montarTab(mod, selecionado) {
    const btn = el("button", {
      class: "mapa__tab",
      role: "tab",
      id: `tab-modulo-${mod.numero}`,
      "aria-controls": `painel-modulo-${mod.numero}`,
      "aria-selected": selecionado ? "true" : "false",
      tabindex: selecionado ? "0" : "-1",
      type: "button",
    });
    btn.appendChild(el("span", { class: "mapa__numero", text: String(mod.numero) }));
    const rotulo = el("span", { class: "mapa__rotulo" });
    rotulo.appendChild(el("span", { class: "mapa__nome", text: mod.nome }));
    rotulo.appendChild(
      el("span", { class: "mapa__status", text: rotuloEstado(mod.estado) })
    );
    btn.appendChild(rotulo);
    return btn;
  }

  function initMarcha() {
    const root = document.querySelector("[data-mapa-marcha]");
    if (!root) return;

    const dados = window.DADOS_MODULOS;
    if (!dados || !dados.modulos) return;

    const trilha = root.querySelector("[data-mapa-trilha]");
    const paineis = root.querySelector("[data-mapa-paineis]");
    if (!trilha || !paineis) return;

    const fragTabs = document.createDocumentFragment();
    const fragPaineis = document.createDocumentFragment();
    dados.modulos.forEach((m, i) => {
      fragTabs.appendChild(montarTab(m, i === 0));
      fragPaineis.appendChild(montarPainel(m));
    });
    trilha.replaceChildren(fragTabs);
    paineis.replaceChildren(fragPaineis);

    if (window.Caserna && window.Caserna.initAbas) {
      window.Caserna.initAbas(root);
    }
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initMarcha = initMarcha;
})();
