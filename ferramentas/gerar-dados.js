/**
 * Converte conteudo/*.json → js/dados/*.js (scripts clássicos para uso offline).
 * Uso opcional: node ferramentas/gerar-dados.js
 * Não é etapa de build do site.
 */
const fs = require("fs");
const path = require("path");

const raiz = path.join(__dirname, "..");

function gerar(origemRel, destinoRel, nomeGlobal) {
  const origem = path.join(raiz, origemRel);
  const destino = path.join(raiz, destinoRel);
  const dados = JSON.parse(fs.readFileSync(origem, "utf8"));
  const corpo = JSON.stringify(dados, null, 2);
  const saida = `/**
 * Gerado a partir de ${origemRel}.
 * Não edite à mão — altere o JSON e rode: node ferramentas/gerar-dados.js
 */
window.${nomeGlobal} = ${corpo};
`;
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, saida, "utf8");
  console.log("OK", destinoRel);
}

gerar("conteudo/modulos.json", "js/dados/modulos.js", "DADOS_MODULOS");
gerar(
  "conteudo/matriz-curricular.json",
  "js/dados/matriz.js",
  "DADOS_MATRIZ"
);
