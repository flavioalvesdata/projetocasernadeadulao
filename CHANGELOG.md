# Changelog

## [0.4.0] — 2026-07-25

### Correção técnica e consolidação editorial

- Regeneração UTF-8 dos dados (`js/dados/*`) a partir de `conteudo/*.json`, com validação de mojibake e round-trip.
- Hierarquia institucional explícita: Projeto Caserna de Adulão apresenta o programa Discipulando a Caserna.
- Numeração contínua das seções publicadas (1–10); Parte IV com fechamento editorial real.
- Acessibilidade: skip link para `<main>`, headings, sumário móvel, contraste, foco, nomes do escudo, `aria-live` nos filtros.
- Fallback editorial sem JavaScript (mapa + matriz).
- JavaScript resiliente (isolamento de erros, fallback de IntersectionObserver, progresso por rolagem, DOM seguro).
- Metadados técnicos (canonical, theme-color, favicon, Open Graph) mantendo `noindex`.
- Ferramentas mínimas de qualidade (`package.json`, lint, testes unitários e e2e).
- Documentação alinhada à publicação no GitHub Pages (repositório público).

## [0.3.0] — anterior

- Prospecto em quatro partes com seções 1–6 e 10–12.
- Escudo interativo e matriz curricular offline.
