# Arquitetura técnica vigente

## Implementado

O site é HTML estático, CSS modular e JavaScript clássico, sem bundler, back-end ou CDN de runtime. `js/main.js` inicializa saudação, navegação, revelação e escudo. Fontes e imagens são locais. O conteúdo canônico está em `conteudo/*.md` e `conteudo/*.json`; `ferramentas/gerar-dados.js` valida JSON e gera `js/dados/*.js`.

`ferramentas/servidor-estatico.js` serve apenas a raiz local. Playwright cobre Chromium, Firefox e o motor WebKit. GitHub Actions valida qualidade, sem deploy. Caminhos relativos preservam funcionamento em subdiretório do GitHub Pages. Sem JavaScript, o documento e os fallbacks editoriais já presentes permanecem legíveis.

## Reservado, planejado e humano

Módulos JavaScript relativos às seções futuras permanecem reservados e não são carregados. Seções 8–15 e eventual fallback da matriz são planejados, mas dependem de conteúdo autorizado. Branch de publicação, domínio, acesso, indexação, marca oficial e aprovação são decisões humanas. A publicação atual não é alterada por esta arquitetura.
