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

## Contrato técnico verificável

Os números são os identificadores dos 4 módulos e das 48 lições e não podem se
repetir. Cada módulo cobre 12 lições consecutivas. A validação também protege as
lacunas editoriais já registradas: apenas `virtude`, `tema` e `temaRef` dos módulos
3 e 4 são `null`, e nenhuma ferramenta pode preenchê-las automaticamente.

Essas verificações tratam somente de estrutura, cardinalidade, identidade e
preservação literal. Estado de produção e qualquer alteração das lacunas continuam
dependendo das fontes canônicas e de decisão humana, não de inferência do código.

## Fluxo dos dados derivados

Após editar `conteudo/*.json`, execute `npm run generate` como etapa explícita de
preparação editorial; esse comando atualiza `js/dados/*.js`. `npm run check:generated`
somente gera uma cópia temporária e a compara com os arquivos versionados, sem
sobrescrevê-los. `npm run validate` começa por essa verificação e também não corrige
a árvore de trabalho: uma divergência deve falhar até que a geração seja executada
deliberadamente.

Geradores e verificadores devem usar saídas temporárias durante os testes, manter
`conteudo/*.json` e as citações `>` byte a byte intactos e emitir erro acionável com
código de saída não zero diante de JSON inválido ou artefato editado manualmente.
