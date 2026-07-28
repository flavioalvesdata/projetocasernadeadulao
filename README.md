# Discipulando a Caserna | Projeto Caserna de Adulão

## 1. Visão geral

Prospecto pastoral digital do programa **Discipulando a Caserna**, submetido ao **Pr. Glaydston** para apreciação, orientação e validação.

## 2. Projeto e programa

O Discipulando a Caserna é o protagonista do documento. O Projeto Caserna de Adulão é seu contexto institucional mais amplo; os nomes não são sinônimos.

## 3. Destinatário e finalidade

É uma carta que se abre em prospecto de trabalho pastoral, não landing page, portal público, curso ou mecanismo de captação.

## 4. Estado real

A versão declarada permanece **1.0.0**, sem declaração de conclusão. Os movimentos I–II (seções 1–7) estão implementados; 8–15 são âncoras incompletas dependentes de decisão humana.

## 5. Pronto

Estrutura editorial, cinco movimentos, sumário, trilho, seções 1–7, escudo interativo, fontes locais, fallback textual e automação técnica.

## 6. Pendente

Conteúdo pastoral 8–15, anatomia, encontro, edições, pedido, arte oficial, acesso, domínio, licença e decisões institucionais. Veja `TODO.md`.

## 7. Requisitos técnicos

Node.js 20.18.0 ou superior e npm compatível com o lockfile. O navegador moderno é necessário para interação; o texto abre sem instalação.

## 8. Versão de Node

A CI usa Node 20.18.0; `engines.node` aceita `>=20.18.0`. Essa versão mínima disponibiliza os filtros e limiares da cobertura nativa do executor `node:test`, sem dependência adicional.

## 9. Instalação

```bash
npm ci
```

O comando instala dependências npm exatas, não binários Playwright.

## 10. Navegadores

```bash
npx playwright install chromium firefox webkit
npx playwright install --with-deps chromium firefox webkit # Linux/CI
```

O segundo também prepara dependências do sistema quando suportado.

## 11. Execução local

```bash
npm start
```

Abra `http://127.0.0.1:4173`. Também é possível abrir `index.html`, com limitações normais do protocolo `file:`.

## 12. Scripts

`npm run generate` é a preparação editorial explícita que atualiza os dados derivados. `npm run check:generated` apenas compara os artefatos atuais com uma geração temporária. `check:encoding`, `format`, `format:check`, três linters, `test`, `test:e2e`, `test:a11y`, `test:visual`, `audit` e `validate` compõem a manutenção.

## 13. Arquitetura

HTML estático + CSS modular + JavaScript clássico + Node para ferramentas. Consulte `docs/arquitetura-tecnica.md`.

## 14. Diretórios

`conteudo/` guarda fontes; `css/` estilos; `js/` comportamento e gerados; `ferramentas/` automação; `testes/` cobertura; `docs/` documentação; `assets/` fontes e imagens locais.

## 15. Módulos funcionais

A relação abaixo descreve apenas o que existe na versão atual. Os componentes reservados
para as seções 8–15 não são apresentados como funcionalidades publicadas. Para uma
explicação não técnica, consulte [`README_SIMPLES.md`](README_SIMPLES.md); para os limites
e detalhes internos, consulte [`docs/arquitetura-tecnica.md`](docs/arquitetura-tecnica.md).

| Módulo                       | Responsabilidade atual                                                                                                                                                                                                                                                                                    | Principais arquivos                                                                                                                     | Dependências internas                                                                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Navegação e sumário          | Liga os itens do índice às âncoras das quinze seções, identifica a seção e o movimento correntes e atualiza os indicadores de progresso durante a rolagem.                                                                                                                                                | `index.html`, `js/navegacao.js`, `css/componentes.css`, `css/layout.css`                                                                | Estrutura de IDs e atributos do `index.html`; inicialização por `js/main.js`.                                                                                     |
| Trilho narrativo             | Permite saltar entre os cinco movimentos e indica o movimento associado à seção corrente. Os marcadores continuam como links de âncora sem JavaScript.                                                                                                                                                    | `index.html`, `js/navegacao.js`, `css/prospecto.css`                                                                                    | Mapa `MOVIMENTOS` de `js/navegacao.js` e âncoras dos movimentos e seções no HTML.                                                                                 |
| Drawer móvel                 | Abre e fecha o sumário em telas estreitas, contém o foco enquanto aberto, fecha com `Escape`, clique no fundo ou escolha de link e devolve o foco quando aplicável.                                                                                                                                       | `index.html`, `js/navegacao.js`, `css/componentes.css`                                                                                  | Botão, painel e sobreposição marcados no HTML; inicialização por `js/main.js`.                                                                                    |
| Escudo interativo            | Sincroniza pontos, abas, botões e painéis explicativos do estudo visual do escudo, com operação por ponteiro e teclado.                                                                                                                                                                                   | `index.html`, `js/abas.js`, `js/marca.js`, `assets/img/marca-escudo.svg`, `css/secoes.css`                                              | `js/marca.js` usa a API de abas de `js/abas.js`; ambos são inicializados por `js/main.js`.                                                                        |
| Dados curriculares           | Mantém módulos e matriz curricular em JSON canônico e disponibiliza cópias JavaScript derivadas. Existem renderizadores em `js/marcha.js` e `js/matriz.js`, mas eles não são carregados pelo `index.html` atual e, portanto, não devem ser descritos como uma experiência publicada das seções pendentes. | `conteudo/modulos.json`, `conteudo/matriz-curricular.json`, `js/dados/modulos.js`, `js/dados/matriz.js`, `js/marcha.js`, `js/matriz.js` | Os derivados dependem de `ferramentas/gerar-dados.js`; os renderizadores dependem dos globais `DADOS_MODULOS` e `DADOS_MATRIZ` e de contêineres próprios no HTML. |
| Configuração institucional   | Centraliza metadados já registrados e aplica o destinatário configurado à saudação quando o JavaScript está ativo; o HTML conserva texto equivalente para leitura sem JavaScript.                                                                                                                         | `js/config.js`, `js/main.js`, `index.html`                                                                                              | `js/main.js` lê `window.SITE_CONFIG`; os valores equivalentes do HTML são verificados pelos testes de metadados.                                                  |
| Geração e validação de dados | Valida os JSON canônicos, gera `js/dados/*.js`, compara derivados sem reescrevê-los e verifica codificação e integridade.                                                                                                                                                                                 | `ferramentas/gerar-dados.js`, `ferramentas/verificar-gerados.js`, `ferramentas/check-encoding.js`, `package.json`                       | Fontes de `conteudo/*.json`, scripts npm `generate`, `check:generated`, `check:encoding` e a esteira `validate`.                                                  |

## 16. Casos de uso

Os atores abaixo indicam somente a relação da pessoa com a tarefa; não criam cargos,
competências institucionais ou aprovações.

### 16.1. Destinatário percorre o prospecto

- **Ator:** destinatário declarado do prospecto.
- **Pré-condição:** o documento foi aberto em navegador e seu conteúdo está disponível.
- **Sequência principal:** inicia pela abertura; percorre os movimentos e as seções em
  ordem; consulta os recursos já publicados; reconhece as âncoras resumidas das seções
  8–15 como incompletas.
- **Resultado esperado:** compreende a narrativa e distingue o conteúdo implementado das
  pendências que ainda exigem decisão humana.

### 16.2. Visitante usa o sumário

- **Ator:** visitante.
- **Pré-condição:** o `index.html` está aberto; para realce automático e drawer, o
  JavaScript está ativo.
- **Sequência principal:** aciona **Sumário** em tela estreita, se necessário; percorre os
  links; escolhe uma seção; o navegador segue a âncora e o drawer é fechado quando estava
  aberto.
- **Resultado esperado:** chega à seção escolhida; com JavaScript, o item corrente e o
  progresso acompanham a rolagem.

### 16.3. Visitante interage com o escudo por teclado e ponteiro

- **Ator:** visitante.
- **Pré-condição:** a seção 7 está visível e o JavaScript está ativo.
- **Sequência principal:** seleciona uma peça por um ponto ou botão com o ponteiro; pelo
  teclado, move-se entre as abas com as setas, `Home` e `End`; confirma a peça desejada.
- **Resultado esperado:** o painel correspondente fica visível e os estados dos controles
  permanecem sincronizados.

### 16.4. Revisor altera conteúdo canônico

- **Ator:** revisor editorial ou técnico autorizado a preparar a alteração.
- **Pré-condição:** a mudança foi definida sem preencher decisões humanas, campos `null`
  ou conteúdo pastoral pendente.
- **Sequência principal:** localiza a fonte em `conteudo/*.md` ou `conteudo/*.json`;
  preserva literalmente as citações iniciadas por `>`; edita a fonte, revisa a diferença
  e executa as verificações pertinentes.
- **Resultado esperado:** a fonte canônica contém somente a alteração autorizada, sem
  criar uma segunda fonte de verdade nem transformar pendências em conteúdo aprovado.

### 16.5. Mantenedor regenera arquivos derivados

- **Ator:** mantenedor técnico.
- **Pré-condição:** um JSON canônico foi alterado e é válido segundo as regras do gerador.
- **Sequência principal:** executa `npm run generate`; examina as mudanças em
  `js/dados/*.js`; executa `npm run check:generated`.
- **Resultado esperado:** os arquivos derivados correspondem exatamente aos JSON de
  `conteudo/`, sem edição manual dos gerados.

### 16.6. Mantenedor valida o repositório

- **Ator:** mantenedor técnico.
- **Pré-condição:** dependências instaladas e, para a cobertura de navegador, binários do
  Playwright disponíveis.
- **Sequência principal:** executa `npm run generate`, `npm run check:generated` e
  `npm run validate`; consulta `docs/testes.md` para verificações adicionais; analisa e
  corrige falhas na fonte apropriada antes de repetir a esteira.
- **Resultado esperado:** geração, codificação, formatação, lint, testes unitários e testes
  de navegador terminam sem divergências, respeitadas eventuais limitações documentadas
  do ambiente.

### 16.7. Visitante acessa a versão sem JavaScript

- **Ator:** visitante.
- **Pré-condição:** o `index.html` foi aberto com JavaScript indisponível ou desativado.
- **Sequência principal:** lê o conteúdo estático; usa os links normais do sumário e do
  trilho para seguir as âncoras; consulta a alternativa textual já incorporada ao escudo.
- **Resultado esperado:** o conteúdo editorial publicado permanece legível, embora drawer,
  realce automático, progresso, revelações e troca interativa dos painéis não funcionem.

## 17. Fontes canônicas

Edite `conteudo/*.md` e `conteudo/*.json`. Preserve literalmente citações `>` e campos `null`.

## 18. Arquivos gerados

Nunca edite `js/dados/*.js`; após mudar uma fonte JSON, rode explicitamente `npm run generate` para atualizá-los. Use `npm run check:generated` para verificar a sincronização sem escrever nesses artefatos.

## 19. Testes

A estratégia e os comandos individuais estão em `docs/testes.md`. `npm run validate` é a esteira determinística principal: ela começa verificando os gerados e não corrige a árvore de trabalho.

## 20. Acessibilidade

Há skip link, headings sem salto, foco visível, drawer com contenção de foco, teclado e Axe. Axe complementa, mas não substitui, auditoria manual.

## 21. Publicação

Não há deploy automático nesta mudança. Procedimento e rollback: `docs/publicacao-e-rollback.md`.

## 22. Privacidade e noindex

O HTML e `robots.txt` contêm diretivas existentes de não indexação, que não garantem sigilo nem controle de acesso. Sua manutenção é decisão humana.

## 23. Limitações conhecidas

Seções futuras não estão completas; arte é estudo provisório; política de acesso, publicação e segurança institucional estão pendentes. Configurar WebKit não equivale a afirmar suporte a Safari/iOS.

## 24. Roadmap

Concluir somente após autorização as seções 8–15 e decisões registradas em `TODO.md`; manter qualidade, revisão pastoral e rastreabilidade.

## 25. Solução de problemas

Falha `browser executable doesn't exist`: execute a instalação Playwright. Erro de rede/registro: repita em ambiente autorizado. Gerado divergente: execute `npm run generate` como preparação editorial e então repita a verificação. Porta ocupada: `PORT=4174 npm start`.

## 26. Contribuição

Leia `AGENTS.md` e a regra em `.cursor/rules/discipulando-caserna.mdc`; não invente conteúdo. Faça mudanças pequenas, execute `npm run generate` após alterações editoriais e só então rode `npm run validate`, que verifica sem corrigir a árvore.

## 27. Documentos complementares

Índice: [`docs/README.md`](docs/README.md). Conteúdo: [`conteudo/LEIA-ME.md`](conteudo/LEIA-ME.md). Contexto: [`docs/contexto-do-projeto.md`](docs/contexto-do-projeto.md). Segurança: [`SECURITY.md`](SECURITY.md).
