# Comparativo dos protótipos v1

Comparação das três direções prototipadas em isolamento.  
**Não** altera a versão principal.  
**Não** implementa automaticamente a recomendação — a decisão é humana.

Data: 25 de julho de 2026.

---

## 1. O que foi produzido

| Direção | Caminho                                             | Conceito                           |
| ------- | --------------------------------------------------- | ---------------------------------- |
| **A**   | [`prototipos/direcao-a/`](../prototipos/direcao-a/) | Prospecto pastoral editorial       |
| **B**   | [`prototipos/direcao-b/`](../prototipos/direcao-b/) | Jornada narrativa imersiva         |
| **C**   | [`prototipos/direcao-c/`](../prototipos/direcao-c/) | Dossiê institucional contemporâneo |

Cada protótipo inclui, com conteúdo real do projeto:

1. abertura
2. identificação do Projeto Caserna de Adulão
3. título Discipulando a Caserna
4. indicação de proposta de discipulado
5. palavra ao Pr. Glaydston
6. contexto (Adulão)
7. necessidade pastoral
8. apresentação da proposta
9. amostra curricular (4 módulos)
10. fechamento com apreciação pastoral

Elementos provisórios estão rotulados nos próprios protótipos (matriz completa e escudo interativo não reproduzidos).

### Capturas

Geradas com Playwright (`ferramentas/capturar-prototipos.js`), `prefers-reduced-motion: reduce`, viewports:

- 360 × 800
- 768 × 1024
- 1440 × 900

Posições: topo · meio · fim.

Arquivos em [`docs/capturas-prototipos/`](capturas-prototipos/) (27 PNGs + README).

Amostra de referência:

|           | A                             | B                             | C                             |
| --------- | ----------------------------- | ----------------------------- | ----------------------------- |
| Topo 1440 | `direcao-a_1440x900_topo.png` | `direcao-b_1440x900_topo.png` | `direcao-c_1440x900_topo.png` |
| Meio 360  | `direcao-a_360x800_meio.png`  | `direcao-b_360x800_meio.png`  | `direcao-c_360x800_meio.png`  |
| Fim 768   | `direcao-a_768x1024_fim.png`  | `direcao-b_768x1024_fim.png`  | `direcao-c_768x1024_fim.png`  |

---

## 2. Comparação visual e narrativa

### Direção A — Prospecto editorial

**Caráter:** página de documento; margens generosas; tipografia serif; capítulos (Cap. I–VI); filetes e selo de versão.

| Aspecto            | Avaliação                                                                                                                                                |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pontos fortes      | Solenidade alta; leitura confortável; hierarquia clara (Projeto → Discipulando → proposta → carta); sem aparência comercial; mobile natural (uma coluna) |
| Falhas             | Pouca “presença” atmosférica; escudo ausente deixa o protótipo quase só tipográfico; banner de protótipo compete levemente com a abertura                |
| Responsividade     | Excelente nos três viewports; sem quebra de layout                                                                                                       |
| Acessibilidade     | Skip link; foco visível; reduced-motion; contraste navy/papel adequado; sem controles complexos                                                          |
| Adequação pastoral | **Muito alta** — o pastor lê um documento submetido                                                                                                      |

### Direção B — Jornada imersiva

**Caráter:** fundos navy profundos; símbolo de escudo discreto; pausas tipográficas (“Adulão não é o lugar dos prontos”); alternância escuro/papel; retorno epistolar no fechamento.

| Aspecto            | Avaliação                                                                                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pontos fortes      | Impacto emocional; metáfora da caverna sentida; marchas numeradas legíveis; diferenciação clara de A e C; selo de documento mantido                                                                                       |
| Falhas             | Texto longo em fundo escuro exige atenção ao contraste (bronze/creme ajudam, mas cansa mais); pausas ocupam viewport sem informação nova; risco de “trailer” se exagerada na implementação plena; sem índice de navegação |
| Responsividade     | Boa; abertura alta em desktop; mobile empilha bem; pausas podem alongar o scroll                                                                                                                                          |
| Acessibilidade     | Skip + reduced-motion + foco; contraste geral ok nas capturas; motion desligado nos testes                                                                                                                                |
| Adequação pastoral | **Alta se contida** — emociona sem perder a carta; menos “documento oficial” que A                                                                                                                                        |

### Direção C — Dossiê institucional

**Caráter:** sumário lateral (desktop); badges de status; sínteses em blocos; tabela curricular; checklist de apreciação.

| Aspecto            | Avaliação                                                                                                                                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pontos fortes      | Clareza decisória máxima; status Produzido/Condicionado explícitos; checklist alinhado ao pedido pastoral; navegação por seções; tipografia híbrida (sans metadados / serif prosa)                                                   |
| Falhas             | Pode parecer relatório corporativo se a carta for encurtada demais (no protótipo a carta está presente); tabela exige scroll horizontal em 360px; blocos de síntese lembram levemente “cards” (mitigado: sem sombra/hover comercial) |
| Responsividade     | Boa em 768/1440; em 360 o sumário empilha no topo (ok) e a tabela rola horizontalmente (aceitável com aviso)                                                                                                                         |
| Acessibilidade     | Skip; alvos ≥44px no índice e checklist; foco; tabela com `th`/`scope`; contraste ok                                                                                                                                                 |
| Adequação pastoral | **Alta para a decisão**; média-alta no tom — menos solene que A, mais operacional                                                                                                                                                    |

---

## 3. Quadro-resumo

| Critério                        | A     | B     | C     |
| ------------------------------- | ----- | ----- | ----- |
| Solenidade pastoral             | ●●●●● | ●●●●○ | ●●●○○ |
| Clareza da proposta             | ●●●●○ | ●●●○○ | ●●●●● |
| Impacto emocional               | ●●○○○ | ●●●●● | ●●○○○ |
| Força para validar Módulo 1     | ●●●●○ | ●●●○○ | ●●●●● |
| Legibilidade sustentada         | ●●●●● | ●●●○○ | ●●●●○ |
| Originalidade vs site atual     | ●●●○○ | ●●●●● | ●●●●○ |
| Responsividade                  | ●●●●● | ●●●●○ | ●●●●○ |
| Acessibilidade                  | ●●●●● | ●●●●○ | ●●●●● |
| Viabilidade no stack atual      | ●●●●● | ●●●●○ | ●●●●● |
| Ausência de aparência comercial | ●●●●● | ●●●●○ | ●●●●○ |

---

## 4. O que cada direção prova (e o que não prova)

- **A prova** que o gênero “documento tipográfico” basta para dignidade pastoral — sem hero, sem cards, sem stats.
- **B prova** que atmosfera e pausas reforçam Adulão sem precisar de vídeo ou GSAP.
- **C prova** que status + checklist tornam o pedido de validação inconfundível.

Nenhum protótipo prova ainda a integração plena com escudo interativo, matriz das 48 lições ou a reordenação completa dos cinco movimentos no site principal.

---

## 5. Recomendação de pesquisa

**Recomendação: Direção A como base de implementação**, absorvendo:

1. De **C** — badges/status Produzido|Condicionado, tabela ou lista estruturada dos módulos, checklist de apreciação no fechamento, sumário com rótulos pastorais.
2. De **B** — uma pausa tipográfica na caverna e um umbral antes da jornada (sem full-bleed cinematográfico contínuo).

### Por quê

- Alinha ao destinatário (documento submetido).
- Melhor equilíbrio legibilidade × solenidade × viabilidade.
- C sozinha esfria a metáfora; B sozinha alonga e cansa na validação.
- A combinação A+C(+pausas B) já havia sido sugerida em [`arquitetura-narrativa-v1.md`](arquitetura-narrativa-v1.md) e os protótipos **confirmam** essa hipótese na prática.

### Alternativas honestas

- Se a prioridade for **emoção da abertura**: começar por B e disciplinar motion.
- Se a prioridade for **só a decisão do Módulo 1**: C pura, mantendo a carta intacta.

---

## 6. Parada para decisão humana

Escolha uma das opções:

1. **A** pura
2. **B** pura (com teto anti-trailer)
3. **C** pura (preservando a carta)
4. **A + elementos de C + pausas pontuais de B** (recomendação)

Após a escolha, a próxima etapa será o plano de implementação na versão principal (ainda a confirmar) — **sem** aplicar automaticamente esta recomendação.

---

## 7. Limites desta rodada

- Site principal (`index.html`, CSS/JS de produção) **não** alterado.
- Sem frameworks.
- Sem imagens externas protegidas.
- Fontes apontam para `assets/fonts/` do projeto; se os arquivos locais falharem, o fallback tipográfico (Georgia / system) ainda permite julgamento de layout.
- Capturas com motion reduzido — não mostram animações de revelação da Direção B.
