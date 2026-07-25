# Discipulando a Caserna — Apresentação pastoral

Site de página única para apresentação do currículo **Discipulando a Caserna** ao pastor-presidente, validador pastoral do material. Produzido pelo Projeto Caserna de Adulão (Fortaleza-CE).

Versão atual: **v0.2** (Atos 0–6). Material em versão candidata — não distribuir antes da apreciação pastoral.

## Requisitos

Nenhum. Não há framework, bundler nem dependências. Basta um navegador moderno.

## Como abrir localmente

1. Abra o arquivo `index.html` com duplo clique (funciona offline).
2. Ou sirva a pasta com qualquer servidor estático, se preferir:

```bash
# Python 3
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Destinatário da saudação

O nome da abertura fica em `js/config.js`:

```js
window.SITE_CONFIG = {
  destinatario: "Glaydston",       // → "Pastor Glaydston,"
  cargo: "Pastor-presidente",
  nomeFormal: "Pr. Glaydston Gama Lopes",
  // …
};
```

Altere só `destinatario` para trocar a saudação. `cargo` e `nomeFormal` servem a referências formais futuras (Ato 8 / assinatura).

## Estrutura

```
index.html          Página única
css/                Tokens, base, layout, componentes, atos
js/                 config, abas, navegação, revelar, marcha, anatomia, edicoes, encontro, main
assets/fonts/       Montserrat e Source Serif 4 (.woff2)
assets/img/         Brasão (placeholder) + licao1/ (páginas WebP)
robots.txt          Bloqueia indexação
```

## Publicação (Vercel)

1. Importe o repositório privado na Vercel.
2. Framework Preset: **Other** (site estático, sem build).
3. Output Directory: raiz do projeto (`.`).
4. Confirme que o deploy respeita `robots.txt` e a meta `noindex, nofollow`.

O repositório deve permanecer privado; o link é para leitura pastoral, não para indexação pública.

## Escopo

### v0.1
- Andaime (tokens, tipografia, layout)
- Índice lateral + trilho da marcha
- Atos 0–3
- Rodapé institucional

### v0.2
- Ato 4 — Anatomia de uma lição (marcadores sobre a página)
- Ato 5 — Comparação Aluno / Instrutor
- Ato 6 — Linha do tempo do encontro (1h30)
- Módulo compartilhado de abas (`js/abas.js`)
- Páginas WebP da Lição 1 em `assets/img/licao1/` (~2,7 MB no disco)

Pendências (Atos 7–9, PDFs, brasão oficial): ver `TODO.md`.

## Licença das fontes

Montserrat e Source Serif 4 são distribuídas sob SIL Open Font License (OFL), empacotadas localmente em `assets/fonts/`.
