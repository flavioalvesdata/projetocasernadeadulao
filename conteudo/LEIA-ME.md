# Conteúdo estruturado — Discipulando a Caserna

Arquivos de conteúdo para o site de apresentação. **São a fonte da verdade do site.**
O agente deve consumir estes arquivos e nunca PDF ou DOCX.

| Arquivo                              | Conteúdo                                    | Uso                          |
| ------------------------------------ | ------------------------------------------- | ---------------------------- |
| `secoes-01-04-a-necessidade.md`      | Texto literal das seções 1 a 4              | Movimento I                  |
| `secoes-05-07-a-resposta.md`         | Texto das seções 5–6 e transição da 7       | Movimento II                 |
| `secoes-12-15-a-prova-e-o-pedido.md` | Texto das seções 12 a 15                    | Movimentos IV–V (próximo PR) |
| `identidade.md`                      | Logomarca, símbolos e sistema gráfico       | Seção 7 — A marca            |
| `programa.md`                        | Arquitetura, público, princípios, matriz    | Seções do Movimento III      |
| `matriz-curricular.json`             | As 48 lições                                | Seção 9 — Matriz curricular  |
| `modulos.json`                       | Os 4 módulos (ênfase, peça, marcha, estado) | Seções 7 e 8                 |

## Lacunas registradas

Campos com valor `null` em `modulos.json` não foram localizados no Guia Mestre
e **não devem ser inventados**:

- Módulo 3 — `virtude`, `tema`, `temaRef`
- Módulo 4 — `virtude`, `tema`, `temaRef`

Enquanto estiverem nulos, a interface deve simplesmente omitir o campo — sem placeholder
visível e sem texto substituto.

## Regra de uso

Todo texto marcado como citação (`>`) nos arquivos `.md` é **literal**. Não parafrasear,
não resumir, não "melhorar". Faltando algo, registrar em `TODO.md`.
