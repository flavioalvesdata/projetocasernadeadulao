---
name: Apresentação v0.1
overview: Site estático de página única (HTML/CSS/JS sem build nem dependências) com Atos 0–3, índice lateral, trilho da marcha e mapa de módulos acessível — branch `feat/apresentacao-v0-1`, destinatário `Glaydston` em config.
todos:
  - id: scaffold
    content: Branch, .gitignore, robots.txt, tokens/base/layout, fontes woff2, brasao.svg placeholder
    status: completed
  - id: nav-trilho
    content: index.html esqueleto + índice lateral + trilho da marcha + navegacao.js
    status: completed
  - id: ato-0
    content: Ato 0 (abertura) + SITE_CONFIG com Glaydston / cargo / nomeFormal
    status: completed
  - id: ato-1
    content: Ato 1 — A caverna (texto literal)
    status: completed
  - id: ato-2
    content: Ato 2 — A convicção + 4 cartões de recusa
    status: completed
  - id: ato-3
    content: Ato 3 — mapa tablist/tabpanel + marcha.js
    status: completed
  - id: footer-docs
    content: Rodapé, README, TODO, a11y/reduced-motion, checklist e PR
    status: completed
isProject: false
---

# PR #1 — Apresentação Discipulando a Caserna (v0.1)

## Contexto

Repositório vazio (só `.git`). Construir do zero em `feat/apresentacao-v0-1`, commits Conventional Commits em português, um por unidade lógica. Escopo estrito: andaime + Atos 0–3 + rodapé + docs. Atos 4–9, PDFs e amostra de material ficam em [`TODO.md`](TODO.md).

## Arquivos a criar

```
/
├── index.html
├── robots.txt
├── .gitignore
├── README.md
├── TODO.md
├── css/tokens.css | base.css | layout.css | componentes.css | atos.css
├── js/config.js | main.js | navegacao.js | revelar.js | marcha.js
└── assets/fonts/*.woff2
    assets/img/brasao.svg
```

## `SITE_CONFIG` ([`js/config.js`](js/config.js))

```js
export const SITE_CONFIG = {
  destinatario: "Glaydston",           // → "Pastor Glaydston,"
  cargo: "Pastor-presidente",
  nomeFormal: "Pr. Glaydston Gama Lopes", // Ato 8 / assinatura (fora deste PR)
  instituicao: "Projeto Caserna de Adulão",
  cidade: "Fortaleza-CE",
  cnpj: "63.724.286/0001-78",
  email: "casernadeadulao@gmail.com",
};
```

No Ato 0, JS injeta só a saudação a partir de `destinatario`. HTML base inclui fallback estático `Pastor Glaydston,` para funcionar sem JS. Cargo e nome formal ficam no config para PRs futuros — não acoplar à saudação.

## Abordagem visual e de interação

**Cadência dos atos:** 0 navy → 1 creme → 2 navy → 3 creme (ou papel). Bronze só em acentos (trilho, selo, filetes, foco).

**Trilho da marcha** (assinatura): linha vertical fina fixa à esquerda no desktop; no mobile, à direita ou omitida se competir com o texto. Preenchimento proporcional ao progresso de rolagem (`scroll` + altura do documento). Marcadores em bronze alinhados aos `id` dos atos. Em `prefers-reduced-motion: reduce`, sem animação — só atualização de posição. CSS em [`css/componentes.css`](css/componentes.css); lógica em [`js/navegacao.js`](js/navegacao.js) junto com o índice.

**Índice lateral:** links âncora para `#ato-0` … `#ato-3`; seção ativa via `IntersectionObserver` (ou cálculo de offset). Escondido/compacto em 360px para não roubar leitura.

**Mapa dos módulos (Ato 3):** sequência horizontal (desktop) / vertical (mobile). `role="tablist"` / `tab` / `tabpanel`; Módulo 1 selecionado por padrão; setas esquerda/direita (ou cima/baixo no empilhado); clique/toque; `aria-selected` + `tabindex`. Painel adjacente com detalhes (ênfase, etapa, resultado, peça, rótulo `MATERIAL COMPLETO` / `EM PRODUÇÃO`). Lógica em [`js/marcha.js`](js/marcha.js). Sem hover obrigatório.

**Revelações:** [`js/revelar.js`](js/revelar.js) com `IntersectionObserver`; conteúdo já no DOM e legível sem JS.

**Fontes:** Montserrat (700/800) + Source Serif 4 em `.woff2` self-hosted em `assets/fonts/` (licença OFL), `@font-face` com `font-display: swap`. Sem CDN.

**Brasão:** SVG placeholder (escudo em traço bronze) em [`assets/img/brasao.svg`](assets/img/brasao.svg); nota em `TODO.md` para arte oficial.

## Conteúdo e travas

Texto dos Atos 0–3 e rodapé **literal** da especificação. Selo `VERSÃO CANDIDATA — AGUARDANDO APRECIAÇÃO PASTORAL` no Ato 0 e aviso no rodapé. `robots.txt` + meta `noindex, nofollow`. Zero menção a remição, instituições militares, aprovação pastoral, fotos de pessoas.

Rodapé (dados de `SITE_CONFIG` onde couber, texto fixo do e-mail/CNPJ):

```
Projeto Caserna de Adulão · Fortaleza-CE
CNPJ 63.724.286/0001-78 · casernadeadulao@gmail.com
Material em versão candidata — não distribuir antes da apreciação pastoral.
```

## Ordem de construção e commits

1. Branch + `.gitignore` + `robots.txt` + tokens/base/layout  
2. Estrutura HTML semântica + índice + trilho + `navegacao.js`  
3. Ato 0 (+ config/saudação)  
4. Ato 1  
5. Ato 2 (quatro cartões de recusa)  
6. Ato 3 + `marcha.js`  
7. Rodapé + `brasao.svg` + polimento `atos.css` / reduced-motion / a11y  
8. `README.md` + `TODO.md`  
9. Checklist da seção 14 → abrir PR com o template da seção 16

## Git

- Branch: `feat/apresentacao-v0-1` (primeiro commit pode ser o andaime; `main` ainda sem histórico)
- Sem `node_modules`, sem bundler, sem dependências
- PR privado/Vercel fica documentado no README; publicação não bloqueia o código

## Fora de escopo → `TODO.md`

Atos 4–9; folheador/comparador/linha do tempo; PDFs; brasão oficial; uso de `nomeFormal` / `cargo` em Ato 8 e assinatura.
