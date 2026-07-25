/**
 * Mapa dos módulos (seção 5) — alimentado por DADOS_MODULOS.
 */
(function () {
  function rotuloEstado(estado) {
    if (estado === "produzido") return "Material completo";
    return "Em produção";
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

    const dl = campos
      .map(
        ([dt, dd]) =>
          `<div><dt>${dt}</dt><dd>${dd}</dd></div>`
      )
      .join("");

    return `
      <div class="mapa__painel" role="tabpanel" id="painel-modulo-${mod.numero}" aria-labelledby="tab-modulo-${mod.numero}"${mod.numero === 1 ? "" : " hidden"}>
        <p class="mapa__painel-sobrelinha">Módulo ${mod.numero} · ${mod.peca}</p>
        <h4 class="mapa__painel-titulo">${mod.nome}</h4>
        <p class="mapa__subtitulo-mod">${mod.subtitulo}</p>
        <dl class="mapa__detalhe">${dl}</dl>
      </div>`;
  }

  function montarTab(mod, selecionado) {
    return `
      <button class="mapa__tab" role="tab" id="tab-modulo-${mod.numero}"
        aria-controls="painel-modulo-${mod.numero}"
        aria-selected="${selecionado ? "true" : "false"}"
        tabindex="${selecionado ? "0" : "-1"}">
        <span class="mapa__numero">${mod.numero}</span>
        <span class="mapa__rotulo">
          <span class="mapa__nome">${mod.nome}</span>
          <span class="mapa__status">${rotuloEstado(mod.estado)}</span>
        </span>
      </button>`;
  }

  function initMarcha() {
    const root = document.querySelector("[data-mapa-marcha]");
    if (!root) return;

    const dados = window.DADOS_MODULOS;
    if (!dados || !dados.modulos) return;

    const trilha = root.querySelector("[data-mapa-trilha]");
    const paineis = root.querySelector("[data-mapa-paineis]");
    if (!trilha || !paineis) return;

    trilha.innerHTML = dados.modulos
      .map((m, i) => montarTab(m, i === 0))
      .join("");
    paineis.innerHTML = dados.modulos.map(montarPainel).join("");

    if (window.Caserna && window.Caserna.initAbas) {
      window.Caserna.initAbas(root);
    }
  }

  window.Caserna = window.Caserna || {};
  window.Caserna.initMarcha = initMarcha;
})();
