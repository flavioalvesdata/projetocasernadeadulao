# Estratégia de testes

## Baseline e instalação

`npm ci` instala exatamente as dependências JavaScript do lockfile; não instala os binários de navegadores. Execute `npx playwright install chromium firefox webkit` ou, no Linux preparado do CI, `npx playwright install --with-deps chromium firefox webkit`.

## Camadas

- `npm test`: servidor, estrutura, relações, metadados e invariantes curriculares.
- `npm run test:e2e`: comportamento em Chromium, Firefox e WebKit, incluindo âncoras, teclado, fallback sem JS e console.
- `npm run test:a11y`: Axe; violações moderadas, sérias e críticas falham. Axe não substitui revisão manual de leitura, foco, contraste contextual e tecnologia assistiva.
- `npm run test:visual`: baseline Chromium em 360×740 e 1280×800, menu e escudo. Fica fora de `validate` para limitar variação de renderização entre sistemas.
- `npm run generate`: preparação editorial explícita; lê `conteudo/*.json` e atualiza `js/dados/*.js`.
- `npm run check:generated`: verificação somente leitura; gera os dados em diretório temporário e os compara byte a byte com `js/dados/*.js`.
- `npm run validate`: começa por `check:generated` e depois executa encoding, formato, linters, unitários e E2E. Não gera nem corrige arquivos da árvore de trabalho; dados divergentes causam falha.

Playwright grava relatório HTML, traces e screenshots em `playwright-report/` e `test-results/`; a CI publica diagnósticos em falha. Viewports manuais adicionais: 768×1024 e 1440×900. Recomenda-se testar Tab/Shift+Tab/Escape, zoom, sem JavaScript, leitores de tela e ausência de overflow.

Falha ao baixar pacotes ou browsers é ambiental; arquivo desatualizado, violação de lint ou asserção é falha do projeto. Registre comando, código de saída e evidência antes de classificar.
