# Publicação e rollback técnico

## Antes de publicar

1. Confirmar revisão humana e árvore limpa; executar `npm ci` e `npm run validate`.
2. Revisar caminhos relativos, artefatos gerados e `noindex` sem alterar sua política automaticamente.
3. Confirmar no GitHub Pages a branch realmente configurada e coletar SHA, logs e capturas.
4. Registrar como **a definir**: branch oficial, responsável, aprovador, política de acesso, domínio, prazo de rollback e critérios institucionais.

## Depois de publicar

Verificar URL, recursos, console, viewports, teclado e conteúdo sem JavaScript. Guarde SHA, horário, executor, resultados e evidências.

## Rollback e incidente

Reverta por novo commit que desfaça a mudança; uma tag previamente aprovada pode identificar o estado conhecido, mas este procedimento não cria tags. Reexecute validações, publique pelo processo confirmado e valide novamente. Em incidente, preserve evidências, limite alterações, comunique pelo canal definido e registre causa e recuperação. Prazo e autoridade de decisão permanecem a definir.
