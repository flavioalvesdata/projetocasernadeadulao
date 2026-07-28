/**
 * Converte conteudo/*.json → js/dados/*.js e injeta fallback noscript em index.html.
 * Uso: node ferramentas/gerar-dados.js
 * Não é etapa de build do site no navegador — rode após editar JSON.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const raiz = path.join(__dirname, "..");
const MOJIBAKE = /Ã.|Â.|â€|ðŸ|�/;
const MARK_INICIO = "<!-- FALLBACK-DADOS:START -->";
const MARK_FIM = "<!-- FALLBACK-DADOS:END -->";

function lerUtf8(caminho) {
  return fs.readFileSync(caminho, { encoding: "utf8" });
}

function escreverUtf8(caminho, conteudo) {
  const saida = conteudo.endsWith("\n") ? conteudo : `${conteudo}\n`;
  fs.mkdirSync(path.dirname(caminho), { recursive: true });
  fs.writeFileSync(caminho, saida, { encoding: "utf8" });
}

function assertSemMojibake(texto, rotulo) {
  if (MOJIBAKE.test(texto)) {
    const match = texto.match(MOJIBAKE);
    throw new Error(
      `Caracteres corrompidos detectados em ${rotulo}: "${match && match[0]}"`
    );
  }
}

function stringObrigatoria(valor, local) {
  if (typeof valor !== "string" || !valor.trim())
    throw new Error(`${local}: string obrigatória vazia ou inválida`);
}

const CAMPOS_NULOS_AUTORIZADOS = new Map([
  [3, new Set(["virtude", "tema", "temaRef"])],
  [4, new Set(["virtude", "tema", "temaRef"])],
]);

/**
 * Protege lacunas editoriais registradas sem atribuir significado pastoral a elas.
 * Os valores somente podem mudar após uma decisão humana atualizar este contrato.
 */
function validarCamposNulos(modulo) {
  const autorizados = CAMPOS_NULOS_AUTORIZADOS.get(modulo.numero) || new Set();
  for (const [campo, valor] of Object.entries(modulo)) {
    if (valor === null && !autorizados.has(campo)) {
      throw new Error(
        `modulos.json: módulo ${modulo.numero}, campo "${campo}" — null não autorizado`
      );
    }
  }
  for (const campo of autorizados) {
    if (modulo[campo] !== null) {
      throw new Error(
        `modulos.json: módulo ${modulo.numero}, campo "${campo}" deve permanecer null; preenchimento exige decisão humana`
      );
    }
  }
}

function validarModulos(dados) {
  if (!dados || typeof dados !== "object") {
    throw new Error("modulos.json: raiz inválida");
  }
  if (!Array.isArray(dados.modulos) || dados.modulos.length !== 4) {
    throw new Error("modulos.json: esperado array modulos com 4 itens");
  }
  const numeros = new Set();
  const estados = new Set(["produzido", "planejado"]);
  dados.modulos.forEach((mod, i) => {
    if (!mod || typeof mod !== "object" || Array.isArray(mod)) {
      throw new Error(`modulos.json: módulo ${i + 1} deve ser objeto`);
    }
    ["numero", "nome", "subtitulo", "enfase", "peca", "estado", "licoes"].forEach(
      (campo) => {
        if (mod[campo] == null) {
          throw new Error(`modulos.json: módulo ${i + 1} sem campo "${campo}"`);
        }
      }
    );
    if (!Number.isInteger(mod.numero) || mod.numero < 1 || mod.numero > 4)
      throw new Error(`modulos.json: módulo ${i + 1} — numero deve estar entre 1 e 4`);
    if (numeros.has(mod.numero))
      throw new Error(`modulos.json: número de módulo duplicado ${mod.numero}`);
    numeros.add(mod.numero);
    validarCamposNulos(mod);
    ["nome", "subtitulo", "enfase", "peca"].forEach((campo) =>
      stringObrigatoria(mod[campo], `modulos.json: módulo ${mod.numero}, campo ${campo}`)
    );
    if (!estados.has(mod.estado))
      throw new Error(
        `modulos.json: módulo ${mod.numero} — estado desconhecido "${mod.estado}"`
      );
    if (!Array.isArray(mod.licoes) || mod.licoes.length !== 2) {
      throw new Error(`modulos.json: módulo ${mod.numero} — licoes deve ser [ini, fim]`);
    }
    const [inicio, fim] = mod.licoes;
    if (
      !Number.isInteger(inicio) ||
      !Number.isInteger(fim) ||
      fim < inicio ||
      fim - inicio + 1 !== 12
    )
      throw new Error(
        `modulos.json: módulo ${mod.numero} — intervalo deve conter exatamente 12 lições`
      );
    const esperado = (mod.numero - 1) * 12 + 1;
    if (inicio !== esperado || fim !== esperado + 11)
      throw new Error(
        `modulos.json: módulo ${mod.numero} — intervalo incompatível, esperado ${esperado}–${esperado + 11}`
      );
  });
}

function validarMatriz(dados, modulos) {
  if (!dados || typeof dados !== "object") {
    throw new Error("matriz-curricular.json: raiz inválida");
  }
  if (dados.total !== 48) {
    throw new Error(`matriz-curricular.json: total esperado 48, recebido ${dados.total}`);
  }
  if (!Array.isArray(dados.licoes) || dados.licoes.length !== 48) {
    throw new Error("matriz-curricular.json: esperado 48 lições");
  }
  const numeros = new Set();
  const titulos = new Set();
  dados.licoes.forEach((l, i) => {
    if (!l || typeof l !== "object" || Array.isArray(l)) {
      throw new Error(`matriz-curricular.json: lição índice ${i} deve ser objeto`);
    }
    ["numero", "modulo", "titulo", "textoBase", "objetivo"].forEach((campo) => {
      if (l[campo] == null) {
        throw new Error(`matriz-curricular.json: lição índice ${i} sem "${campo}"`);
      }
    });
    if (!Number.isInteger(l.numero))
      throw new Error(
        `matriz-curricular.json: lição índice ${i} — numero deve ser inteiro`
      );
    if (numeros.has(l.numero))
      throw new Error(`matriz-curricular.json: número de lição duplicado ${l.numero}`);
    numeros.add(l.numero);
    if (l.numero !== i + 1)
      throw new Error(
        `matriz-curricular.json: sequência quebrada na posição ${i + 1}; recebido ${l.numero}`
      );
    if (!Number.isInteger(l.modulo) || l.modulo < 1 || l.modulo > 4)
      throw new Error(`matriz-curricular.json: lição ${l.numero} — módulo inválido`);
    const moduloEsperado = Math.ceil(l.numero / 12);
    if (l.modulo !== moduloEsperado)
      throw new Error(
        `matriz-curricular.json: lição ${l.numero} — módulo incompatível; esperado ${moduloEsperado}`
      );
    ["titulo", "textoBase", "objetivo"].forEach((campo) =>
      stringObrigatoria(
        l[campo],
        `matriz-curricular.json: lição ${l.numero}, campo ${campo}`
      )
    );
    const titulo = l.titulo.trim().toLocaleLowerCase("pt-BR");
    if (titulos.has(titulo))
      throw new Error(
        `matriz-curricular.json: título duplicado na lição ${l.numero}: ${l.titulo}`
      );
    titulos.add(titulo);
    if (typeof l.produzida !== "boolean") {
      throw new Error(
        `matriz-curricular.json: lição ${l.numero} — produzida deve ser boolean`
      );
    }
    for (const [campo, valor] of Object.entries(l)) {
      if (valor === null) {
        throw new Error(
          `matriz-curricular.json: lição ${l.numero}, campo "${campo}" — null não autorizado`
        );
      }
    }
  });
  if (modulos) {
    for (const modulo of modulos.modulos) {
      const produzidas = dados.licoes.filter(
        (l) => l.modulo === modulo.numero && l.produzida
      ).length;
      if (modulo.estado === "produzido" && produzidas !== 12)
        throw new Error(
          `modulos.json: módulo ${modulo.numero} marcado produzido, mas possui ${produzidas} lições produzidas`
        );
      if (modulo.estado !== "produzido" && produzidas === 12)
        throw new Error(
          `modulos.json: módulo ${modulo.numero} planejado, mas todas as lições estão produzidas`
        );
    }
  }
}

function gerarScript(origemRel, destinoRel, nomeGlobal, validar, opcoes = {}) {
  const base = opcoes.raiz || raiz;
  const destino = opcoes.destino || path.join(base, destinoRel);
  let bruto;
  try {
    bruto = lerUtf8(path.join(base, origemRel));
  } catch (err) {
    throw new Error(`Falha ao ler ${origemRel}: ${err.message}`);
  }
  assertSemMojibake(bruto, origemRel);

  let dados;
  try {
    dados = JSON.parse(bruto);
  } catch (err) {
    throw new Error(`JSON inválido em ${origemRel}: ${err.message}`);
  }

  validar(dados);
  const corpo = JSON.stringify(dados, null, 2);
  assertSemMojibake(corpo, `${origemRel} (serializado)`);

  const saida = `/**
 * Gerado a partir de ${origemRel}.
 * Não edite à mão — altere o JSON e rode: node ferramentas/gerar-dados.js
 */
window.${nomeGlobal} = ${corpo};
`;
  assertSemMojibake(saida, destinoRel);
  escreverUtf8(destino, saida);

  const relido = lerUtf8(destino);
  assertSemMojibake(relido, `${destinoRel} (após escrita)`);
  const match = relido.match(
    new RegExp(`window\\.${nomeGlobal}\\s*=\\s*([\\s\\S]*);\\s*$`)
  );
  if (!match) {
    throw new Error(`${destinoRel}: formato inesperado após geração`);
  }
  const relidosDados = JSON.parse(match[1]);
  if (JSON.stringify(relidosDados) !== JSON.stringify(dados)) {
    throw new Error(`${destinoRel}: round-trip divergente da fonte ${origemRel}`);
  }

  if (!opcoes.silencioso) console.log("OK", destinoRel);
  return dados;
}

function escaparHtml(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function montarFallback(modulos, matriz) {
  const mapa = modulos.modulos
    .map((m) => {
      const estado =
        m.estado === "produzido" ? "Material completo" : "Produção condicionada";
      return `<article class="fallback-item">
  <h4>Módulo ${m.numero}: ${escaparHtml(m.nome)}</h4>
  <p>${escaparHtml(m.subtitulo)} · ${escaparHtml(m.peca)} · ${escaparHtml(estado)}</p>
  <p>${escaparHtml(m.enfase)}</p>
</article>`;
    })
    .join("\n");

  const linhas = matriz.licoes
    .map((l) => {
      const estado = l.produzida ? "Produzida" : "Planejada";
      return `<tr>
  <td>${l.numero}</td>
  <td>${l.modulo}</td>
  <td>${escaparHtml(l.titulo)}</td>
  <td>${escaparHtml(l.textoBase)}</td>
  <td>${escaparHtml(l.objetivo)}</td>
  <td>${estado}</td>
</tr>`;
    })
    .join("\n");

  return `${MARK_INICIO}
<noscript class="fallback-dados">
  <div class="container fluxo">
    <p class="matriz__nota">
      Esta página funciona sem JavaScript. Abaixo estão o mapa dos módulos e a
      matriz curricular completos do programa Discipulando a Caserna.
    </p>
    <section class="fallback-mapa" aria-label="Mapa dos módulos">
      <h3 class="fallback-titulo">Mapa dos módulos</h3>
      ${mapa}
    </section>
    <section class="fallback-matriz" aria-label="Matriz curricular">
      <h3 class="fallback-titulo">Matriz curricular (48 lições)</h3>
      <div class="fallback-tabela-wrap">
        <table class="fallback-tabela">
          <thead>
            <tr>
              <th scope="col">Nº</th>
              <th scope="col">Módulo</th>
              <th scope="col">Título</th>
              <th scope="col">Texto-base</th>
              <th scope="col">Objetivo</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
${linhas}
          </tbody>
        </table>
      </div>
    </section>
  </div>
</noscript>
${MARK_FIM}`;
}

function injetarFallback(modulos, matriz) {
  const indexPath = path.join(raiz, "index.html");
  let html = lerUtf8(indexPath);
  const bloco = montarFallback(modulos, matriz);
  assertSemMojibake(bloco, "fallback noscript");

  if (html.includes(MARK_INICIO) && html.includes(MARK_FIM)) {
    const re = new RegExp(
      `${MARK_INICIO.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${MARK_FIM.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`
    );
    html = html.replace(re, bloco);
  } else if (html.includes('<div class="matriz__lista" data-matriz-lista></div>')) {
    html = html.replace(
      '<div class="matriz__lista" data-matriz-lista></div>',
      `<div class="matriz__lista" data-matriz-lista></div>\n            ${bloco}`
    );
  } else {
    console.log(
      "NÃO APLICÁVEL: index.html não contém marcadores FALLBACK-DADOS; nenhuma alteração foi feita."
    );
    return false;
  }

  escreverUtf8(indexPath, html);
  console.log("OK", "index.html (fallback noscript)");
  return true;
}

function gerarDados({
  raiz: base = raiz,
  diretorioSaida = path.join(base, "js", "dados"),
  silencioso = false,
} = {}) {
  const modulos = gerarScript(
    "conteudo/modulos.json",
    "js/dados/modulos.js",
    "DADOS_MODULOS",
    validarModulos,
    { raiz: base, destino: path.join(diretorioSaida, "modulos.js"), silencioso }
  );
  const matriz = gerarScript(
    "conteudo/matriz-curricular.json",
    "js/dados/matriz.js",
    "DADOS_MATRIZ",
    (dados) => validarMatriz(dados, modulos),
    { raiz: base, destino: path.join(diretorioSaida, "matriz.js"), silencioso }
  );
  return { modulos, matriz };
}

function main() {
  const modo = process.argv[2] || "--dados";
  const dados = gerarDados();
  if (modo === "--fallback") injetarFallback(dados.modulos, dados.matriz);
  else if (modo !== "--dados") throw new Error(`Opção desconhecida: ${modo}`);
}

if (require.main === module) {
  try {
    main();
  } catch (err) {
    console.error("ERRO:", err.message);
    process.exit(1);
  }
}

module.exports = {
  gerarDados,
  injetarFallback,
  montarFallback,
  validarMatriz,
  validarModulos,
};
