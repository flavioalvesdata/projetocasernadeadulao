# Conteúdo estruturado — Discipulando a Caserna

Arquivos de conteúdo para o site de apresentação. **São a fonte da verdade do site.**
O agente deve consumir estes arquivos e nunca PDF ou DOCX.

| Arquivo | Conteúdo | Uso |
|---|---|---|
| `matriz-curricular.json` | As 48 lições: número, módulo, título, texto-base, objetivo, estado de produção | Seção "Matriz curricular" |
| `modulos.json` | Os 4 módulos: ênfase, etapa, resultado, peça da armadura, virtude, marcha | Seções "Arquitetura" e "A marca" |
| `identidade.md` | A logomarca, seu fundamento bíblico, os símbolos e o sistema gráfico | Seção "A marca" |
| `programa.md` | Arquitetura curricular, pré-requisito pastoral, público, princípios | Seções do bloco "O programa" |

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
