# Arquitetura técnica vigente

## Implementado

O site é HTML estático, CSS modular e JavaScript clássico, sem bundler, back-end ou CDN de runtime. `js/main.js` inicializa saudação, navegação, revelação e escudo. Fontes e imagens são locais. O conteúdo canônico está em `conteudo/*.md` e `conteudo/*.json`; `ferramentas/gerar-dados.js` valida JSON e gera `js/dados/*.js`.

`ferramentas/servidor-estatico.js` serve apenas a raiz local. Playwright cobre Chromium, Firefox e o motor WebKit. GitHub Actions valida qualidade, sem deploy. Caminhos relativos preservam funcionamento em subdiretório do GitHub Pages. Sem JavaScript, o documento e os fallbacks editoriais já presentes permanecem legíveis.

### Ambientes JavaScript no ESLint

A configuração plana do ESLint mantém regras e opções de linguagem em um bloco comum, mas separa os globais por contexto de execução. `js/**/*.js` recebe somente os globais do navegador; `ferramentas/**/*.js`, os do Node.js; e os testes unitários, os do Node.js e do executor `node:test`. A ferramenta de captura declara `window` e `document` em uma exceção restrita, pois seus callbacks de `page.evaluate` rodam na página. Os testes E2E combinam o ambiente Node.js do Playwright com os globais de navegador usados nesses callbacks. Testes unitários da própria configuração garantem que `document` seja rejeitado nas demais ferramentas e que `process` seja rejeitado nos scripts entregues diretamente ao navegador.

## Reservado, planejado e humano

Módulos JavaScript relativos às seções futuras permanecem reservados e não são carregados. Seções 8–15 e eventual fallback da matriz são planejados, mas dependem de conteúdo autorizado. Branch de publicação, domínio, acesso, indexação, marca oficial e aprovação são decisões humanas. A publicação atual não é alterada por esta arquitetura.
