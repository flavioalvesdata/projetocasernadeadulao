# Auditoria técnica v0.4.0

## Contexto

Correção técnica completa do prospecto estático publicado em GitHub Pages, partindo da v0.3 (seções 1–6 e 10–12, dados com mojibake, Parte IV incompleta).

Baseline: commit `112a08a` em `main`. Branch de entrega: `fix/auditoria-tecnica-v0.4.0`.

## Problemas encontrados

1. Mojibake em `js/dados/modulos.js` e `js/dados/matriz.js` (JSON-fonte intacto).
2. Linguagem de confidencialidade incompatível com repositório/Pages públicos.
3. Numeração interrompida (1–6 → 10–12) e Parte IV com texto de “próximo lote”.
4. Hierarquia Projeto × Programa ambígua no título/`h1`.
5. Skip link apontava para `#secao-1`, não para `<main>`.
6. `h2` de parte antes do único `h1`.
7. Navegação móvel por pontos pequenos; alvos insuficientes.
8. Contraste fraco em metadados, rolagem e estados inativos.
9. Controles do escudo anunciados como “1…6”.
10. Sem `aria-live` nos filtros; `innerHTML` com dados textuais.
11. Inicialização sem isolamento de erros; progresso por índice de parte.
12. README desatualizado (Vercel/privado).
13. Ausência de testes e de `package.json` de qualidade.

## Correções

- Gerador UTF-8 com validação, mojibake check, round-trip e fallback noscript.
- Renumeração contínua 1–10; fechamento pastoral na seção 10.
- Abertura com hierarquia institucional e copy revisada.
- Sumário móvel (drawer), contraste, foco, tipografia ≥ 0.75rem.
- Escudo com `aria-label` e lista alternativa; filtros com live region.
- Renderização via DOM APIs; `main.js` com try/catch por módulo.
- Progresso de leitura por rolagem do documento.
- Metadados SEO/compartilhamento com `noindex` mantido.
- Documentação, changelog, regra Cursor e testes reproduzíveis.

## Decisões

- Não reintroduzir anatomia/encontro/edições nesta versão (sem conteúdo pronto e sem ativos de lição).
- Manter SVGs como estudo visual; não inventar marca oficial.
- Não inventar licença nem aprovação pastoral.
- `package.json` apenas para qualidade; site permanece estático sem build.

## Testes executados

Comandos previstos:

```bash
npm run validate
```

Cobertura mínima: encoding, round-trip, h1 único, skip link, IDs, metadados, filtros/abas/acordeões, teclado, overflow nos viewports-alvo, axe (violações critical/serious), fallback noscript, init resiliente.

## Limitações

- Arte oficial pendente.
- Axe cobre violações automatizáveis; contraste manual residual possível em casos extremos.
- `#secao-10` antigo (progressão) agora identifica o fechamento; progressão passou a `#secao-7`. `#secao-11` e `#secao-12` permanecem como âncoras ocultas.

## Pendências humanas

- Homologação da marca oficial.
- Política de acesso (se desejar restrição real).
- Licença de código e conteúdo.
- Aprovação pastoral do Módulo 1 e do prospecto.
- Domínio próprio e publicação definitiva (remoção de `noindex`).

## Resultado final

Versão **0.4.0** preparada para pull request e homologação pastoral, **não** para produção definitiva sem decisão humana sobre marca, licença e indexação.
