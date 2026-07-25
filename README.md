# Discipulando a Caserna | Projeto Caserna de Adulão

Site de página única: prospecto institucional do programa **Discipulando a Caserna**, apresentado pelo **Projeto Caserna de Adulão** (Fortaleza-CE).

Versão atual: **v0.4.0** — correção técnica e consolidação editorial.

## Hierarquia institucional

- **Projeto Caserna de Adulão** — projeto institucional mais amplo.
- **Discipulando a Caserna** — programa de formação bíblica e discipulado no contexto da caserna, pertencente ao Projeto.

## Publicação atual

- URL: <https://flavioiabuilder.github.io/projetocasernadeadulao/>
- Hospedagem: **GitHub Pages**
- Repositório: **público**
- Indexação: a página usa `noindex, nofollow` e `robots.txt` com `Disallow: /`

**Importante:** `noindex` e `robots.txt` **não são autenticação**. Qualquer pessoa com o link pode abrir o conteúdo. Trate esta publicação como prévia pública em apreciação pastoral.

### Nota histórica

Versões anteriores do README mencionavam publicação na Vercel e repositório privado. Isso não descreve o estado atual.

## Como rodar localmente

Sem instalação (somente leitura):

1. Abra `index.html` em um navegador, ou
2. Sirva a raiz com qualquer servidor estático, por exemplo:

```bash
npx serve .
```

## Regenerar dados

Fonte canônica: `conteudo/*.json`.

```bash
npm run generate
# ou: node ferramentas/gerar-dados.js
```

Não edite `js/dados/*.js` à mão. O gerador também injeta o fallback `<noscript>` em `index.html`.

## Qualidade e testes

Requer Node.js 18+.

```bash
npm install
npm run validate
```

Scripts principais:

| Script | Função |
|---|---|
| `npm run generate` | Regenera `js/dados/*` e fallback noscript |
| `npm run check:encoding` | Mojibake + round-trip |
| `npm run lint:html` | Validação HTML |
| `npm run lint:css` | Stylelint |
| `npm run lint:js` | ESLint |
| `npm run test` | Testes unitários (Node) |
| `npm run test:e2e` | Playwright + axe |
| `npm run validate` | Cadeia completa |

## Arquitetura

```
index.html              Prospecto (HTML semântico)
conteudo/               Fonte editável (JSON + MD)
css/                    tokens, base, layout, componentes, atos, prospecto
js/
  dados/                modulos.js, matriz.js (gerados)
  main.js               inicialização resiliente
  navegacao.js          sumário, progresso de leitura
  marcha.js, matriz.js  renderização segura dos dados
assets/                 fontes OFL, estudos visuais de marca
ferramentas/            geração e checagens
testes/                 unitários e e2e
docs/                   relatórios de auditoria
```

Sem framework, sem bundler. O `package.json` existe apenas para scripts de qualidade.

## Destinatário

Em `js/config.js`:

```js
destinatario: "Glaydston"  // → "Pastor Glaydston,"
```

## Estrutura do prospecto (v0.4.0)

1. **Parte I — A identidade** — Abertura, Caverna, Convicção, Marca  
2. **Parte II — O programa** — Arquitetura, Matriz  
3. **Parte III — A implantação** — Progressão, Público, Princípios  
4. **Parte IV — O estado atual** — Fechamento editorial (apreciação pastoral)

## Limitações conhecidas

- Arte do escudo/brasão é estudo visual provisório (sem marca oficial homologada).
- Módulos 2–4 têm matriz definida; produção condicionada à validação pastoral do Módulo 1.
- Seções futuras (anatomia da lição, encontro, duas edições) ainda não publicadas.
- Licença do código e do conteúdo pastoral ainda **não definida**.

## Política de arquivos gerados

| Editar | Não editar |
|---|---|
| `conteudo/*.json` | `js/dados/*.js` |
| `conteudo/*.md` | marcadores `FALLBACK-DADOS` gerados em `index.html` |

## Política `.cursor/`

- `.cursor/rules/` pode ser versionada (instruções técnicas não sensíveis).
- `.cursor/plans/` fica fora do repositório público (ver `.gitignore`).

## Licenças

- **Fontes** Montserrat e Source Serif 4: SIL Open Font License, self-hosted em `assets/fonts/`.
- **Código e conteúdo pastoral:** licenciamento ainda pendente de decisão explícita. Nenhuma licença MIT/GPL/CC foi adotada neste repositório sem autorização.

## Processo de publicação

1. Trabalhar em branch de correção/release quando solicitado.
2. Rodar `npm run validate`.
3. Abrir pull request para `main`.
4. Após merge, o GitHub Pages publica a partir de `main` (conforme configuração do repositório).
5. Manter `noindex` enquanto o material estiver em apreciação.
