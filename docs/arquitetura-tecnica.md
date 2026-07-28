# Arquitetura técnica vigente

## Implementado

O site é HTML estático, CSS modular e JavaScript clássico, sem bundler, back-end ou CDN de runtime. `js/main.js` inicializa saudação, navegação, revelação e escudo. Fontes e imagens são locais. O conteúdo canônico está em `conteudo/*.md` e `conteudo/*.json`; `ferramentas/gerar-dados.js` valida JSON e gera `js/dados/*.js`.

`ferramentas/servidor-estatico.js` serve apenas a raiz local. Playwright cobre Chromium, Firefox e o motor WebKit. GitHub Actions valida qualidade, sem deploy. Caminhos relativos preservam funcionamento em subdiretório do GitHub Pages. Sem JavaScript, o documento e os fallbacks editoriais já presentes permanecem legíveis.

### Módulos ativos

O `index.html` carrega somente os módulos necessários à interface publicada:

- `js/config.js`: configuração editorial disponível no navegador;
- `js/abas.js`: comportamento acessível e compartilhado de abas;
- `js/navegacao.js`: navegação e estado do índice;
- `js/revelar.js`: revelação progressiva da apresentação;
- `js/marca.js`: interação do escudo, apoiada no utilitário de abas;
- `js/main.js`: ponto de entrada que inicializa os comportamentos ativos.

### Ambientes JavaScript no ESLint

A configuração plana do ESLint mantém regras e opções de linguagem em um bloco comum, mas separa os globais por contexto de execução. `js/**/*.js` recebe somente os globais do navegador; `ferramentas/**/*.js`, os do Node.js; e os testes unitários, os do Node.js e do executor `node:test`. A ferramenta de captura declara `window` e `document` em uma exceção restrita, pois seus callbacks de `page.evaluate` rodam na página. Os testes E2E combinam o ambiente Node.js do Playwright com os globais de navegador usados nesses callbacks. Testes unitários da própria configuração garantem que `document` seja rejeitado nas demais ferramentas e que `process` seja rejeitado nos scripts entregues diretamente ao navegador.

## Reservado, planejado e humano

### Módulos reservados

Os módulos `js/anatomia.js`, `js/edicoes.js` e `js/encontro.js` são adaptadores reservados do utilitário comum de abas. Eles não são carregados nem inicializados pelo `index.html` atual e não pressupõem markup, dados ou conteúdo pastoral das seções futuras. Um teste unitário protege essa separação contra carregamento acidental.

`js/marcha.js` e `js/matriz.js` também permanecem fora do documento atual. A eventual ativação deles e o fallback da matriz dependem de conteúdo autorizado. Seções 8–15, branch de publicação, domínio, acesso, indexação, marca oficial e aprovação são decisões humanas. A publicação atual não é alterada por esta arquitetura.
