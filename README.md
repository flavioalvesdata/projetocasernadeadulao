# Discipulando a Caserna — Prospecto pastoral

Site de página única: prospecto institucional do currículo **Discipulando a Caserna**, dirigido ao pastor-presidente. Projeto Caserna de Adulão (Fortaleza-CE).

Versão atual: **v0.3** — Partes I–III (seções 1–6 e 10–12). Material em versão candidata.

## Requisitos

Nenhum. HTML/CSS/JS sem build e sem dependências. Abre offline por duplo clique em `index.html`.

## Conteúdo estruturado

A fonte editável fica em `conteudo/`:

| Arquivo | Uso no site |
|---|---|
| `conteudo/modulos.json` | Mapa dos módulos (seção 5) e cabeçalhos da matriz |
| `conteudo/matriz-curricular.json` | As 48 lições (seção 6) |
| `conteudo/identidade.md` | Seção 4 — A marca |
| `conteudo/programa.md` | Seções 5, 10, 11 e 12 |

Os JSON são convertidos para scripts clássicos (uso offline, sem `fetch`):

```
conteudo/*.json  →  js/dados/modulos.js
                 →  js/dados/matriz.js
```

Após editar um JSON, regenere:

```bash
node ferramentas/gerar-dados.js
```

Não edite `js/dados/*.js` à mão. O script **não** é etapa de build do site — o site já consome os `.js` gerados.

Campos `null` em `modulos.json` (virtude/tema dos módulos 3–4) são omitidos na interface.

## Destinatário

Em `js/config.js`:

```js
destinatario: "Glaydston"  // → "Pastor Glaydston,"
```

## Estrutura

```
index.html
conteudo/           Fonte editável (JSON + MD)
css/                tokens, base, layout, componentes, atos, prospecto
js/
  dados/            modulos.js, matriz.js (gerados)
  abas.js, navegacao.js, marcha.js, marca.js, matriz.js, …
assets/img/         brasao.svg, marca-escudo.svg (placeholders)
ferramentas/        gerar-dados.js (opcional)
```

## Navegação

Quatro partes; o trilho marca as **partes**; o índice lista partes e seções.

1. **Parte I — A identidade** — Abertura, Caverna, Convicção, Marca  
2. **Parte II — O programa** — Arquitetura, Matriz  
3. **Parte III — A implantação** — Progressão, Público, Princípios  
4. **Parte IV — O estado atual** — seções 13–15 (próximo lote)

## Publicação (Vercel)

Preset **Other**, output na raiz, repositório privado, `noindex`.

## Licença das fontes

Montserrat e Source Serif 4 — SIL OFL, self-hosted em `assets/fonts/`.
