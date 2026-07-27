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

Node.js 18 ou superior e npm compatível com o lockfile. O navegador moderno é necessário para interação; o texto abre sem instalação.

## 8. Versão de Node

A CI usa Node 20; `engines.node` aceita `>=18`.

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

## 15. Fontes canônicas

Edite `conteudo/*.md` e `conteudo/*.json`. Preserve literalmente citações `>` e campos `null`.

## 16. Arquivos gerados

Nunca edite `js/dados/*.js`; após mudar uma fonte JSON, rode explicitamente `npm run generate` para atualizá-los. Use `npm run check:generated` para verificar a sincronização sem escrever nesses artefatos.

## 17. Testes

A estratégia e os comandos individuais estão em `docs/testes.md`. `npm run validate` é a esteira determinística principal: ela começa verificando os gerados e não corrige a árvore de trabalho.

## 18. Acessibilidade

Há skip link, headings sem salto, foco visível, drawer com contenção de foco, teclado e Axe. Axe complementa, mas não substitui, auditoria manual.

## 19. Publicação

Não há deploy automático nesta mudança. Procedimento e rollback: `docs/publicacao-e-rollback.md`.

## 20. Privacidade e noindex

O HTML e `robots.txt` contêm diretivas existentes de não indexação, que não garantem sigilo nem controle de acesso. Sua manutenção é decisão humana.

## 21. Limitações conhecidas

Seções futuras não estão completas; arte é estudo provisório; política de acesso, publicação e segurança institucional estão pendentes. Configurar WebKit não equivale a afirmar suporte a Safari/iOS.

## 22. Roadmap

Concluir somente após autorização as seções 8–15 e decisões registradas em `TODO.md`; manter qualidade, revisão pastoral e rastreabilidade.

## 23. Solução de problemas

Falha `browser executable doesn't exist`: execute a instalação Playwright. Erro de rede/registro: repita em ambiente autorizado. Gerado divergente: execute `npm run generate` como preparação editorial e então repita a verificação. Porta ocupada: `PORT=4174 npm start`.

## 24. Contribuição

Leia `AGENTS.md` e a regra em `.cursor/rules/discipulando-caserna.mdc`; não invente conteúdo. Faça mudanças pequenas, execute `npm run generate` após alterações editoriais e só então rode `npm run validate`, que verifica sem corrigir a árvore.

## 25. Documentos complementares

Índice: [`docs/README.md`](docs/README.md). Conteúdo: [`conteudo/LEIA-ME.md`](conteudo/LEIA-ME.md). Contexto: [`docs/contexto-do-projeto.md`](docs/contexto-do-projeto.md). Segurança: [`SECURITY.md`](SECURITY.md).
