# Discipulando a Caserna | Projeto Caserna de Adulão

Prospecto pastoral digital do programa **Discipulando a Caserna**, submetido ao
**Pr. Glaydston** para apreciação, orientação e validação.

Versão em construção neste branch: **v1.0** (Movimentos I e II — seções 1 a 7).

## O que é

Não é landing page, portal de igreja nem plataforma de cursos. É uma **carta que
se abre em prospecto**: começa pessoal e desenvolve a necessidade, a resposta e
(em PRs seguintes) o programa, a prova e o pedido pastoral.

## Hierarquia

- **Discipulando a Caserna** — protagonista desta apresentação
- **Projeto Caserna de Adulão** — contexto institucional ao qual o discipulado serve

## Arquitetura narrativa

Cinco movimentos, quinze seções:

| Movimento | Seções | Status |
|---|---|---|
| I — A necessidade | 1–4 | neste PR |
| II — A resposta | 5–7 | neste PR |
| III — O programa | 8–11 | âncoras (próximo PR) |
| IV — A prova | 12–13 | âncoras (próximo PR) |
| V — O pedido | 14–15 | âncoras (próximo PR) |

## Como abrir

Offline, sem instalação:

1. Abra `index.html` no navegador (duplo clique), ou
2. Sirva a raiz com qualquer servidor estático:

```bash
npx serve .
```

Zero CDN. Fontes self-hosted em `assets/fonts/`.

## Conteúdo

Fonte da verdade: `conteudo/`. Ver `conteudo/LEIA-ME.md`.

Citações (`>`) nos Markdown são literais — não parafrasear.

## Qualidade

```bash
npm install
npm run validate
```

## Publicação

- URL prevista: <https://flavioiabuilder.github.io/projetocasernadeadulao/>
- Indexação bloqueada (`robots.txt` + `noindex`)

## Referência de layout

Mockups em `referencia/stitch/` (ignorados pelo git) orientam composição.
Nenhum código Tailwind/CDN deles entra no produto.

## Pendências

Ver [`TODO.md`](TODO.md).
