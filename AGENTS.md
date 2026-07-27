# Mapa operacional do repositório

Este repositório contém o prospecto pastoral digital do programa **Discipulando a Caserna**, apresentado no contexto mais amplo do **Projeto Caserna de Adulão**. Leia `.cursor/rules/discipulando-caserna.mdc` antes de editar.

- Fontes editoriais canônicas: `conteudo/*.md` e `conteudo/*.json`.
- Gerados: `js/dados/*.js`; nunca os edite manualmente. Use `npm run generate`.
- Não invente conteúdo pastoral, institucional, campos `null`, aprovações, cargos ou decisões sobre as seções 8–15.
- Preserve HTML estático, CSS modular, JavaScript clássico e ferramentas Node; não adicione framework, bundler, back-end, CDN de runtime ou serviço externo.
- Preserve citações Markdown iniciadas por `>` literalmente.
- Acessibilidade mínima: um `h1`, headings sem saltos, skip link funcional, foco visível, nomes acessíveis, teclado e alvos de aproximadamente 44×44 px.
- Versão, publicação, indexação, acesso, PMCE, licença, domínio, marca oficial, conteúdo pastoral e canal/SLA de segurança exigem decisão humana.
- Antes de concluir: `npm run generate`, `npm run check:generated`, `npm run validate`; para cobertura completa, consulte `docs/testes.md`.

Documentação detalhada: `README.md`, `conteudo/LEIA-ME.md`, `docs/arquitetura-tecnica.md` e `docs/README.md`.
