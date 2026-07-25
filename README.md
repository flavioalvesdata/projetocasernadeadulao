# Discipulando a Caserna — Apresentação pastoral

Site de página única para apresentação do currículo **Discipulando a Caserna** ao pastor-presidente, validador pastoral do material. Produzido pelo Projeto Caserna de Adulão (Fortaleza-CE).

Versão atual: **v0.1** (Atos 0–3). Material em versão candidata — não distribuir antes da apreciação pastoral.

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
js/                 config, navegação, revelar, marcha, main
assets/fonts/       Montserrat e Source Serif 4 (.woff2)
assets/img/         Brasão (placeholder)
robots.txt          Bloqueia indexação
```

## Publicação (Vercel)

1. Importe o repositório privado na Vercel.
2. Framework Preset: **Other** (site estático, sem build).
3. Output Directory: raiz do projeto (`.`).
4. Confirme que o deploy respeita `robots.txt` e a meta `noindex, nofollow`.

O repositório deve permanecer privado; o link é para leitura pastoral, não para indexação pública.

## Escopo v0.1

- Andaime (tokens, tipografia, layout)
- Índice lateral + trilho da marcha
- Atos 0 (abertura), 1 (a caverna), 2 (a convicção), 3 (a marcha)
- Rodapé institucional

Pendências e próximos atos: ver `TODO.md`.

## Licença das fontes

Montserrat e Source Serif 4 são distribuídas sob SIL Open Font License (OFL), empacotadas localmente em `assets/fonts/`.
