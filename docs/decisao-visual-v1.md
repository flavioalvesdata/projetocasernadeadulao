# Decisão visual — Discipulando a Caserna

Documento normativo da Fase 7.  
Não implementa o redesign. A próxima etapa é o planejamento da implementação.

---

## 1. Estado da decisão

| Campo | Valor |
|---|---|
| **Data** | 25 de julho de 2026 |
| **Branch** | `redesign/apresentacao-discipulando-caserna` |
| **Direção-base aprovada** | **A — Prospecto pastoral editorial** |
| **Responsável pela decisão** | Decisão humana registrada nesta conversa (aprovação expressa do usuário do repositório) |
| **Status** | Aprovada para planejamento da implementação |

Fontes da decisão: reavaliação dos protótipos em `prototipos/direcao-{a,b,c}/`, [`pesquisa-visual-v1.md`](pesquisa-visual-v1.md), [`arquitetura-narrativa-v1.md`](arquitetura-narrativa-v1.md), [`comparativo-prototipos-v1.md`](comparativo-prototipos-v1.md), e resposta humana de escolha da direção-base.

---

## 2. Objetivo da apresentação

| Item | Definição |
|---|---|
| **O que** | Apresentação digital do projeto **Discipulando a Caserna** |
| **A quem** | Pr. Glaydston (apreciação, orientação e validação pastoral) |
| **Finalidade** | Permitir compreender origem/necessidade, definição, fundamentos, metodologia, currículo, integração com o Projeto, estado real e o que pede validação |
| **Relação entre os projetos** | O **Discipulando a Caserna** é o protagonista. O **Projeto Caserna de Adulão** é o contexto ministerial, institucional e missionário ao qual o discipulado serve — não o assunto principal do site |

A experiência deve manter a sensação de **prospecto pastoral submetido**, não de landing page, relatório corporativo, portal de igreja ou plataforma de cursos.

---

## 3. Direção-base

### Conceito

Prospecto pastoral editorial: aparência de documento tipográfico (capítulos, margens generosas, medida de leitura, selo de versão), com identidade digital própria — não um PDF apenas colocado na web.

### Motivos da escolha

- Adequação ao destinatário e ao gênero de documento submetido à apreciação.
- Sobriedade pastoral, legibilidade e capacidade de acomodar o conteúdo completo.
- Viabilidade no stack atual (HTML, CSS e JavaScript nativos, sem framework).
- Menor risco de aparência comercial ou de template.

### Qualidades determinantes a preservar

- Superfície clara para a carta ao Pr. Glaydston.
- Tipografia serif de leitura; hierarquia por espaço e filetes.
- Capítulos / folios; selo de documento de trabalho.
- Protagonismo tipográfico do nome **Discipulando a Caserna**.

### Riscos que precisam ser controlados

1. **Parecer apenas um PDF na web** — mitigar com ritmo narrativo, identidade digital própria e **uma** âncora simbólica discreta ligada a Adulão (não logotipo oficial).
2. **Frialdade narrativa** — mitigar apenas pelo umbral atmosférico autorizado (exceção única).
3. **Diluição do protagonismo** — nunca recentrar o Projeto Caserna de Adulão na abertura ou na sobrelinha do h1.

---

## 4. Sistema visual obrigatório

A Direção A governa **integralmente**:

| Sistema | Decisão |
|---|---|
| **Grid** | Coluna de leitura estreita (~40–45rem / medida ~62–68ch); container largo só para ferramentas curriculares quando necessário |
| **Tipografia** | Serif dominante no corpo e nos títulos de ato (sistema editorial da Direção A); metadados discretos; sem uppercase gritado do Projeto competindo com o h1 |
| **Paleta** | Papel/creme como superfície principal; navy para umbrais de parte e, se preciso, o umbral excepcional; bronze para regras, foco, citações e metadados — não como CTA comercial |
| **Espaço** | Margens generosas; ritmo vertical de documento; espaço negativo como hierarquia |
| **Ritmo** | Capítulos editoriais; progressão carta → contexto → necessidade → proposta → currículo → apreciação |
| **Componentes** | Listas tipográficas, citações com filete, notas, selos, rótulos de estado editoriais, checklist final — sem cards de feature, sem stat strips, sem dashboard |
| **Navegação** | Sumário de prospecto / índice de documento (linguagem pastoral); progresso de leitura discreto |
| **Movimento** | Mínimo e progressivo; revelação discreta opcional; identidade **não** depende de animação; respeitar `prefers-reduced-motion` |
| **Mobile** | Uma coluna; mesma identidade; currículo em estrutura vertical (acordeão, listas editoriais ou equivalente semântico) — **sem** tabela rígida em telas estreitas |

### Âncora simbólica (obrigatória na implementação futura)

- Uma âncora discreta ligada ao conceito de Adulão (presença narrativa / simbólica).
- **Não** é a logomarca oficial; **não** homologa arte de marca.
- Não substitui o umbral atmosférico autorizado nem se multiplica em ornamentos.

### Carta pastoral

- Superfície clara.
- Medida de leitura confortável.
- Tratamento editorial solene.
- Destinatário explícito (Pr. Glaydston / saudação pastoral conforme config).

### Números formativos (4, 12, 48)

- Quando necessários, integados à prosa ou à arquitetura formativa.
- **Proibido** apresentá-los como métricas comerciais, cards de dashboard ou stat strip.

### Fechamento

Deve unir solenidade pastoral e objetividade decisória, contendo:

1. síntese da proposta;  
2. estado atual;  
3. pontos submetidos à apreciação (checklist);  
4. próximos passos;  
5. identificação da versão.

---

## 5. Elementos importados

Exatamente **duas** importações autorizadas. Nenhuma outra.

### 5.1 Da Direção B — umbral atmosférico único

| Campo | Definição |
|---|---|
| **Origem** | Direção B (jornada imersiva) |
| **Função** | Ênfase excepcional na passagem entre o **contexto** do Projeto Caserna de Adulão e a **necessidade pastoral** que dá origem ao Discipulando a Caserna |
| **Conteúdo** | Pode usar uma frase canônica relacionada à caverna (já presente nas fontes do projeto; não inventar) |
| **Adaptação** | Redesenhado por completo dentro da tipografia, paleta, grid e ritmo editorial da Direção A |
| **Limites** | Um único momento; transição sutil; forte presença narrativa; **não** seção fullscreen; **não** pausas vazias prolongadas; **não** depender de animação; **não** estabelecer segunda identidade visual; **não** se repetir ao longo da página |

### 5.2 Da Direção C — rótulos de estado e checklist de apreciação

| Campo | Definição |
|---|---|
| **Origem** | Direção C (dossiê institucional) |
| **Função** | (1) Rótulos de estado do material/programa — p.ex. “Produzido”, “Em desenvolvimento”, “Condicionado à apreciação”; (2) checklist final dos pontos submetidos à orientação ou validação pastoral |
| **Adaptação** | Tratamento editorial dentro da Direção A (filetes, tipografia, listas) |
| **Limites** | Sem aparência de dashboard, SaaS, PMO, tabela corporativa ou cards estatísticos; no mobile, sem tabela rígida para o currículo |

---

## 6. Elementos rejeitados

- Qualquer outro elemento das Direções B ou C além dos dois autorizados.
- Fullscreen, pausas vazias prolongadas, scrollytelling cinematográfico, dependência de animação para identidade.
- Landing page, portal de igreja, LMS, captação, catálogo de ministérios.
- Stat strips / cards com 4 · 12 · 48.
- Feature cards com hover comercial; pills; glow; badges flutuantes no hero.
- Brand manual no scroll (paleta hex, tipografia-amostra como guia de marca).
- Sobrelinha que coloque o Projeto Caserna de Adulão como protagonista visual.
- Tabela curricular rígida em viewport estreito.
- Mistura arbitrária de grids, tipografias ou paletas das três direções.
- Uso da âncora de Adulão como logotipo oficial ou arte homologada inventada.

---

## 7. Regras de coerência

1. Uma única direção (A) governa o sistema visual.  
2. Elementos importados são redesenhados dentro de A — não carregam a identidade de B ou C.  
3. Não há mistura arbitrária de estilos.  
4. O conteúdo tem prioridade sobre o efeito.  
5. O projeto não parecerá landing page comercial.  
6. A apresentação não dependerá de animações.  
7. A experiência móvel manterá a mesma identidade editorial.  
8. O umbral de B é exceção única, não padrão de seção.

---

## 8. Regras editoriais

| Regra | Definição |
|---|---|
| **Protagonista** | Discipulando a Caserna |
| **Contexto** | Projeto Caserna de Adulão |
| **Destinatário** | Pr. Glaydston — apreciação, orientação e validação |
| **Tom** | Pastoral e institucional; português brasileiro natural |
| **Vocabulário** | Prospecto, documento de trabalho, apreciação — não “curso”, “inscreva-se”, “impacto”, “features” |
| **Conteúdo** | Fontes canônicas (`conteudo/*`, HTML editorial publicado); não inventar endossos, cargos, datas, resultados ou lacunas do Guia Mestre; campos `null` omitidos na UI |
| **Citações** | Literais quando marcadas nas fontes; Escrituras na NAA, refs. decimais |
| **Apreciação** | Pedidos explícitos e honestos; selo de versão; sem fingir aprovação já concedida |

---

## 9. Requisitos de implementação

A próxima fase (planejamento e, depois, implementação) deverá observar:

- Responsividade nos viewports de trabalho do projeto (incl. mobile estreito).  
- Acessibilidade: um `h1`; headings em ordem; skip `#conteudo`; `:focus-visible`; alvos adequados; contraste AA; `prefers-reduced-motion`.  
- Desempenho adequado a GitHub Pages (estático).  
- Conteúdo real a partir das fontes canônicas; `npm run generate` após JSON.  
- Expansão para módulos, matriz, princípios e lacunas declaradas — sem inventar.  
- Suporte a textos longos (carta, Adulão, princípios).  
- JavaScript progressivo; sem frameworks/bundlers desnecessários.  
- Compatibilidade com a base atual (`index.html` + CSS modular + JS clássico).  
- Não editar à mão `js/dados/*.js` nem `FALLBACK-DADOS`.

---

## 10. Critérios de aceite visual

A implementação será aceita visualmente quando:

| Área | Critério verificável |
|---|---|
| **Abertura** | Discipulando é o sinal dominante; Projeto aparece como contexto; não parece landing |
| **Carta** | Superfície clara; medida confortável; saudação e submissão legíveis |
| **Contexto** | Adulão e citação com tratamento editorial |
| **Umbral (B)** | Um único momento entre contexto e necessidade; redesenhado em A; sem fullscreen/pausa vazia/animação obrigatória |
| **Narrativa** | Progressão problema → proposta compreensível |
| **Currículo** | Claro e expansível; estados rotulados; mobile sem tabela rígida; números 4/12/48 não são dashboard |
| **Estado atual** | Honestidade produzido / em desenvolvimento / condicionado |
| **Apreciação** | Checklist dos pontos submetidos, editorial |
| **Encerramento** | Síntese + estado + checklist + próximos passos + versão |
| **Mobile** | Mesma identidade; sem overflow horizontal estrutural |
| **Reduced motion** | Experiência completa e digna sem movimento |

---

## 11. Pendências

Decisões ainda abertas (não reabrem a direção-base):

1. Planejamento detalhado da implementação na base atual (mapeamento seção a seção).  
2. Forma exata da âncora simbólica de Adulão (discreta; não arte oficial).  
3. Frase canônica precisa do umbral (escolha entre trechos já existentes nas fontes — sem inventar).  
4. Homologação da arte oficial da marca (permanece pendência humana do `TODO.md`; fora do escopo desta decisão visual de direção).  
5. Apreciação pastoral do conteúdo (fato externo; o site continua documento de trabalho).

---

## Registro

- **Não implementado** nesta fase.  
- Site principal (`index.html`, CSS/JS de produção, conteúdo canônico, imagens, Pages) **não** alterado por este documento.  
- Protótipos permanecem como referência histórica em `prototipos/`.
