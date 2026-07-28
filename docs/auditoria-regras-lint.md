# Auditoria das regras desativadas de HTML e CSS

## Escopo e método

Esta auditoria cobre as regras que estavam explicitamente desligadas em
`ferramentas/lint-html.js` e `.stylelintrc.json`. Cada regra foi reativada isoladamente
contra `index.html` ou `css/**/*.css`, conforme o caso, antes das correções. A
classificação adota estes critérios:

- **incompatibilidade legítima:** a convenção padrão da regra conflita com um padrão
  técnico deliberado do projeto;
- **dívida corrigível:** a regra é aplicável e a configuração ou o código podia ser
  corrigido sem alterar conteúdo, identidade visual ou comportamento;
- **falso positivo:** a regra sinaliza uma construção válida cujo padrão alternativo já
  oferece a semântica ou compatibilidade requerida.

Após a auditoria, a configuração Stylelint passou a ser JavaScript em
`.stylelintrc.cjs`, permitindo justificar as exceções com comentários sem recorrer a
campos estranhos ao esquema da ferramenta.

## HTML (`npm run lint:html`)

| Regra                     | Resultado isolado antes da correção | Classificação              | Tratamento                                                                                                      |
| ------------------------- | ----------------------------------: | -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `no-inline-style`         |                       6 ocorrências | dívida corrigível          | As cores das amostras migraram para modificadores BEM no CSS.                                                   |
| `doctype-style`           |                        1 ocorrência | incompatibilidade legítima | A regra agora valida explicitamente o `<!doctype html>` em minúsculas normalizado pelo Prettier.                |
| `void-style`              |                      21 ocorrências | incompatibilidade legítima | A regra agora aceita explicitamente elementos vazios autocontidos, padrão emitido pelo Prettier.                |
| `no-implicit-button-type` |                  nenhuma ocorrência | dívida corrigível          | Reativada globalmente; a exceção anterior era desnecessária.                                                    |
| `prefer-native-element`   |                      15 ocorrências | falso positivo             | Exceções locais documentam a tabela e a lista comparativas responsivas, que preservam papéis ARIA equivalentes. |
| `text-content`            |                  nenhuma ocorrência | dívida corrigível          | Reativada globalmente; a exceção anterior era desnecessária.                                                    |
| `long-title`              |                  nenhuma ocorrência | dívida corrigível          | Reativada globalmente; a exceção anterior era desnecessária.                                                    |
| `no-trailing-whitespace`  |                  nenhuma ocorrência | dívida corrigível          | Reativada globalmente; a exceção anterior era desnecessária.                                                    |

## CSS (`npm run lint:css`)

| Regra                               | Resultado isolado antes da correção | Classificação              | Tratamento                                                                                                            |
| ----------------------------------- | ----------------------------------: | -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `custom-property-pattern`           |                  nenhuma ocorrência | dívida corrigível          | Reativada com kebab-case explícito.                                                                                   |
| `selector-class-pattern`            |                     224 ocorrências | incompatibilidade legítima | A expressão regular agora reconhece o BEM em português (`__` e `--`) adotado no projeto.                              |
| `selector-id-pattern`               |                  nenhuma ocorrência | dívida corrigível          | Reativada com kebab-case explícito.                                                                                   |
| `keyframes-name-pattern`            |                  nenhuma ocorrência | dívida corrigível          | Reativada com kebab-case explícito.                                                                                   |
| `color-function-notation`           |                      12 ocorrências | dívida corrigível          | Funções convertidas automaticamente para a notação moderna.                                                           |
| `color-function-alias-notation`     |                      12 ocorrências | dívida corrigível          | Aliases com alfa convertidos para `rgb()`.                                                                            |
| `alpha-value-notation`              |                      12 ocorrências | dívida corrigível          | Valores alfa convertidos para porcentagens equivalentes.                                                              |
| `hue-degree-notation`               |                  nenhuma ocorrência | dívida corrigível          | Reativada com ângulos explícitos.                                                                                     |
| `import-notation`                   |                  nenhuma ocorrência | dívida corrigível          | Reativada com importações em string.                                                                                  |
| `no-descending-specificity`         |                        1 ocorrência | dívida corrigível          | O seletor-base foi antecipado aos modificadores sem mudar a cascata resultante.                                       |
| `media-feature-range-notation`      |                      29 ocorrências | dívida corrigível          | Media queries convertidas para a notação contextual suportada pelos navegadores modernos requeridos pelo projeto.     |
| `font-family-name-quotes`           |                       2 ocorrências | dívida corrigível          | Aspas redundantes foram removidas de `Montserrat`; nomes que as requerem continuam protegidos.                        |
| `value-keyword-case`                |                       2 ocorrências | falso positivo             | `optimizeLegibility` e `Georgia` mantêm sua grafia canônica por exceção nominal; os demais valores exigem minúsculas. |
| `rule-empty-line-before`            |                       6 ocorrências | dívida corrigível          | Espaçamento entre regras foi normalizado; a primeira regra aninhada segue a serialização do Prettier.                 |
| `custom-property-empty-line-before` |                       2 ocorrências | dívida corrigível          | Espaçamento entre propriedades customizadas foi normalizado.                                                          |

## Resultado

Nenhuma regra permanece globalmente desativada. As duas divergências de serialização
HTML e os padrões BEM/valores canônicos estão configurados de forma explícita. A única
supressão está restrita aos dois componentes comparativos afetados por
`prefer-native-element`, junto da justificativa técnica e do padrão ARIA alternativo.
