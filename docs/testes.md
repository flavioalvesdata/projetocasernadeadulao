# Estratégia de testes

## Baseline e instalação

`npm ci` instala exatamente as dependências JavaScript do lockfile; não instala os binários de navegadores. Execute `npx playwright install chromium firefox webkit` ou, no Linux preparado do CI, `npx playwright install --with-deps chromium firefox webkit`.

## Matriz de testes

| Camada           | Comando               | Cobertura                                                                                                                                                                                                                | Execução na CI                                                                                    |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Unitários        | `npm test`            | Servidor, estrutura estática, relações, metadados, configuração do ESLint, geração e invariantes curriculares.                                                                                                           | Uma vez, por meio de `npm run validate`.                                                          |
| E2E              | `npm run test:e2e`    | Chromium, Firefox e WebKit: console e recursos, âncoras, teclado, foco, skip link, nomes e relações acessíveis, menu móvel, escudo, fallback sem JavaScript e overflow responsivo. Inclui os cenários de acessibilidade. | Uma vez, por meio de `npm run validate`.                                                          |
| Acessibilidade   | `npm run test:a11y`   | Recorte local dos casos identificados por `@a11y`: Axe na página e nos estados interativos do menu móvel e do escudo. Violações moderadas, sérias e críticas falham.                                                     | Não constitui uma segunda etapa: esses mesmos casos já pertencem ao E2E executado por `validate`. |
| Regressão visual | `npm run test:visual` | Baselines Chromium em 360×740 e 1280×800 para página, menu móvel e escudo.                                                                                                                                               | Uma vez, após `validate`.                                                                         |

A organização adotada mantém a acessibilidade na suíte E2E geral. Portanto, a pipeline não chama `test:a11y` depois de `validate`: a marca `@a11y` existe somente para a seleção rápida dos casos Axe durante o desenvolvimento. Os cenários de teclado, foco, skip link, nomes acessíveis e navegação continuam no arquivo E2E e são executados pela validação completa. Axe não substitui revisão manual de leitura, foco, contraste contextual e tecnologia assistiva.

Para auditar a seleção sem executar os navegadores, use `npm run test:e2e -- --list` e `npm run test:a11y -- --list`. A primeira listagem deve conter todos os casos, inclusive cada caso `@a11y`; a segunda deve conter somente os dois casos Axe, sempre repetidos uma vez por motor. Na pipeline completa, apenas a primeira seleção é executada, logo cada combinação de cenário de acessibilidade e motor roda exatamente uma vez.

## Comandos de qualidade e geração

- `npm run generate`: preparação editorial explícita; lê `conteudo/*.json` e atualiza `js/dados/*.js`.
- `npm run format` e `npm run format:check`: usam a lista centralizada em `format:files`, no `package.json`. Os artefatos `js/dados/*.js` ficam fora do Prettier para não competir com a serialização determinística, com recuo de dois espaços, realizada por `npm run generate`.
- `npm run check:generated`: verificação somente leitura; gera os dados em diretório temporário e os compara byte a byte com `js/dados/*.js`.
- `npm run validate`: começa por `check:generated` e depois executa encoding, formato, linters, unitários e E2E. Não gera nem corrige arquivos da árvore de trabalho; dados divergentes causam falha.

Na pipeline, `npm run check:generated` também é executado explicitamente antes da validação principal. A regressão visual é executada depois de `validate`, mas o recorte `test:a11y` não é repetido. Depois de todas as verificações determinísticas, `git diff --exit-code -- .` exige que a árvore de trabalho continue limpa quanto a arquivos versionados. Assim, qualquer artefato ou correção de formatação produzida inadvertidamente por um comando da CI causa falha, em vez de ser ignorada ou incorporada automaticamente.

A workflow agrupa execuções pela combinação do próprio nome com a referência Git. Quando um novo `push` ou uma atualização de `pull_request` inicia uma execução no mesmo grupo, a execução anterior ainda em andamento é cancelada automaticamente. O job de qualidade possui timeout de 30 minutos, margem destinada à instalação das dependências e dos três motores do Playwright, à validação completa e à regressão visual; ao atingir esse limite, o GitHub Actions encerra o job para evitar consumo indefinido de recursos.

Playwright grava relatório HTML, traces e screenshots em `playwright-report/` e `test-results/`; a CI publica diagnósticos em falha. Viewports manuais adicionais: 768×1024 e 1440×900. Recomenda-se testar Tab/Shift+Tab/Escape, zoom, sem JavaScript, leitores de tela e ausência de overflow.

Falha ao baixar pacotes ou browsers é ambiental; arquivo desatualizado, violação de lint ou asserção é falha do projeto. Registre comando, código de saída e evidência antes de classificar.
