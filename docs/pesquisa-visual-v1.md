# Pesquisa visual v1 — Discipulando a Caserna

Documento de pesquisa, diagnóstico e concepção.  
**Não** altera o site de produção.  
Versão de referência do site analisado: **v0.4.0**.  
Data da pesquisa: 25 de julho de 2026.

---

## 1. Resumo executivo

O produto digital necessário não é um portal de igreja nem uma landing de curso. É uma **apresentação pastoral de um único projeto** — o Discipulando a Caserna — submetida ao Pr. Glaydston para apreciação, orientação e validação. A experiência deve unir prospecto, carta institucional, manifesto, narrativa em rolagem e apresentação curricular.

A pesquisa em sites reais, relatórios digitais, educação teológica, missões, galerias (Awwwards, Godly/Recent, Lapa Ninja, Behance) e princípios de longform/scrollytelling indica que as referências mais úteis são as que tratam o leitor como **destinatário institucional de um documento**, não como lead a converter. As menos úteis — ainda quando premiadas — são portais conversacionais, templates de igreja e experiências cinematográficas que sacrificam legibilidade.

O site atual (v0.4.0) já possui uma espinha promissora (atos, carta, escudo, matriz, honestidade de status). O que enfraquece o objetivo pastoral é a **deriva institucional** (Projeto sobre Discipulando), a **quebra da voz epistolar**, o **manual de marca** no meio do prospecto e padrões de landing (stats, cards, chips de paleta).

Três direções visuais distintas (detalhadas em [`arquitetura-narrativa-v1.md`](arquitetura-narrativa-v1.md)) respondem a esse diagnóstico. Esta pesquisa **não decide** a direção final: informa a escolha humana.

### Limitações desta pesquisa

| Limitação                                                                            | Tratamento                                                                                 |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Sem browser automatizado para capturas em 360×800 / 768×1024 / 1440×900              | Diagnóstico por HTML + media queries CSS + URL publicada; sem inventar screenshots         |
| Behance / Dribbble / Pinterest / Godly frequentemente pedem login ou limitam preview | Fichas via páginas públicas, cases de estúdio e metadados de galeria; limitação registrada |
| “The Haven Church” ambíguo (template Framer vs. igrejas reais)                       | Ambiguidade documentada; uso principalmente como anti-referência conversional              |
| Guia Mestre e arte oficial não versionados no repositório                            | Não inventar conteúdo; trabalhar só com `conteudo/` e HTML publicado                       |

---

## 2. Entendimento do objetivo

### Hierarquia

- **Discipulando a Caserna** — protagonista da apresentação.
- **Projeto Caserna de Adulão** — contexto institucional, missionário e ministerial ao qual o discipulado serve.
- Não são sinônimos.

### Destinatário

Pr. Glaydston (nome formal e cargo conforme `js/config.js`): leitura para compreender, apreciar, orientar e validar — não para “inscrever-se” ou “doar”.

### Natureza desejada da experiência

Prospecto pastoral digital + carta institucional + apresentação de projeto + manifesto de missão + documento editorial interativo + narrativa em rolagem + apresentação curricular.

### O que o site não deve parecer

Portal de igreja; eventos/notícias; catálogo de ministérios; arrecadação; landing comercial; template religioso genérico; LMS / plataforma de cursos; captação de participantes.

### O que a pesquisa procura nas referências

Não “sites de igreja bonitos”, e sim padrões de:

- apresentações digitais de projeto;
- microsites institucionais;
- relatórios anuais interativos;
- manifestos digitais;
- prospectos acadêmicos / programas educacionais;
- storytelling editorial e scrollytelling sóbrio;
- dossiês submetidos a decisão institucional.

---

## 3. Critérios utilizados

Cada referência foi avaliada (0–10 mentalmente; ver fichas) segundo:

1. Adequação a apresentação para um único destinatário institucional
2. Capacidade de contar uma história
3. Clareza da missão
4. Solenidade
5. Sobriedade pastoral
6. Força editorial
7. Hierarquia tipográfica
8. Ritmo de rolagem
9. Apresentação de currículo ou metodologia
10. Fechamento institucional
11. Responsividade
12. Acessibilidade
13. Viabilidade no HTML, CSS e JavaScript atuais (sem framework)
14. Ausência de aparência comercial
15. Originalidade sem excesso de efeitos

**Regra:** não recomendar referência só porque é visualmente premiada.

Tipos de inspiração diferenciados nas fichas:

- conceitual · layout · tipográfica · navegação · interação · storytelling

Não se copia texto, marca, imagens, composição integral, código ou identidade.

---

## 4. Catálogo de referências (≥15)

### R01 — UPA DI Annual Report 2023–2024

| Campo                         | Conteúdo                                                                                                                                                                                                 |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Origem**                    | Awwwards Honorable Mention (out/2024); estúdio fatfish                                                                                                                                                   |
| **Endereço**                  | https://rapport2023-2024.upadi.ca/en/ · case: https://fatfish.ca/en/projects/upa-di/                                                                                                                     |
| **Finalidade original**       | Relatório anual digital de ONG (agricultura familiar / solidariedade internacional) para doadores e públicos institucionais                                                                              |
| **Imagem / captura**          | Site vivo acessível; case do estúdio descreve navegação inferior + indicador de progresso. Captura local não arquivada neste repositório                                                                 |
| **Tipos de inspiração**       | Navegação, storytelling, layout                                                                                                                                                                          |
| **Aproveitável**              | Palavra introdutória (presidente / secretário-geral) antes do corpo; leitura guiada com progresso; seções nomeadas; equilíbrio entre dados e narrativa; versão PDF paralela como metáfora de “documento” |
| **Incompatível**              | Direção artística colorida/orgânica; mapa interativo geográfico; energia de “impacto para doador”; cookies/tracking                                                                                      |
| **Riscos**                    | Parecer relatório de fundraising; saturação visual                                                                                                                                                       |
| **Dificuldade técnica**       | Baixa–média (índice + progresso já existem no prospecto)                                                                                                                                                 |
| **Aplicação no Discipulando** | Modelo de **documento submetido**: carta → seções → pedido. Progresso e índice como “sumário do relatório”, não mega-nav de portal                                                                       |

---

### R02 — The New York Times — Snow Fall (e princípios de scrollytelling editorial)

| Campo                   | Conteúdo                                                                                                                                      |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Origem**              | The New York Times (2012); documentação OpenNews / Poynter                                                                                    |
| **Endereço**            | https://www.nytimes.com/projects/2012/snow-fall/ · https://opennews.org/ (artigos “How We Made Snow Fall”)                                    |
| **Finalidade original** | Longform jornalístico multimídia                                                                                                              |
| **Imagem / captura**    | Abertura full-bleed clássica documentada em críticas; não reimplementar vídeo                                                                 |
| **Tipos de inspiração** | Storytelling, interação (conceitual), tipografia                                                                                              |
| **Aproveitável**        | Um único fluxo narrativo; multimídia a serviço do texto (entrar e sair sem “desvio”); capítulos; ritmo com pausas; colaboração conteúdo↔forma |
| **Incompatível**        | Orçamento/equipe de newsroom; vídeo em loop; WebGL; efeitos que competem com a prosa pastoral                                                 |
| **Riscos**              | “Snowfallização” — efeito pelo efeito; prejuízo a11y e mobile                                                                                 |
| **Dificuldade técnica** | Alta se copiar a forma; **baixa** se extrair só o princípio (IntersectionObserver já no stack)                                                |
| **Aplicação**           | Direção B: scrollytelling **leve**; texto governa; motion discreto                                                                            |

---

### R03 — Christian Theological Seminary (CTS)

| Campo                   | Conteúdo                                                                                                 |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| **Origem**              | Seminário teológico (Indianapolis); redesign 2021                                                        |
| **Endereço**            | https://www.cts.edu/                                                                                     |
| **Finalidade original** | Portal institucional multi-oferta (teologia, counseling, doações, notícias)                              |
| **Tipos de inspiração** | Conceitual (seriedade teológica); **anti** em navegação/layout                                           |
| **Aproveitável**        | Tom de formação; linguagem de missão; clareza de “escolas” como metáfora de eixos (não copiar estrutura) |
| **Incompatível**        | Hero de captação; news grid; giving; admissions CTAs; “Two Schools” como produto                         |
| **Riscos**              | Tratar o prospecto como site de seminário                                                                |
| **Dificuldade técnica** | N/A (anti-padrão estrutural)                                                                             |
| **Aplicação**           | Lembrar solenidade acadêmico-pastoral; **não** importar IA de portal                                     |

---

### R04 — Princeton Theological Seminary — Our Curriculum

| Campo                   | Conteúdo                                                                                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Origem**              | Princeton Theological Seminary                                                                                                                      |
| **Endereço**            | https://ptsem.edu/academics/our-curriculum/                                                                                                         |
| **Finalidade original** | Explicar arquitetura curricular e Core Commitments a estudantes e comunidade                                                                        |
| **Tipos de inspiração** | Conceitual, storytelling curricular, tipografia (clareza)                                                                                           |
| **Aproveitável**        | Compromissos nomeados antes do catálogo de cursos; FAQ que antecipa objeções; progressão foundation → commitments; formação + educação entrelaçadas |
| **Incompatível**        | Contexto de campus residencial; concentrações denominacionais; tom norte-americano de seminário                                                     |
| **Riscos**              | Academicismo excessivo (o destinatário é pastor, não ENEM teológico)                                                                                |
| **Dificuldade técnica** | Baixa (prosa + listas tipográficas)                                                                                                                 |
| **Aplicação**           | Movimento III–IV: princípios e eixos **antes** da matriz de 48 lições                                                                               |

---

### R05 — Fuller Seminary — MA in Theological Studies

| Campo                   | Conteúdo                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| **Origem**              | Fuller Theological Seminary                                                                 |
| **Endereço**            | https://fuller.edu/master-of-arts-in-theological-studies/                                   |
| **Finalidade original** | Página de programa de formação (admissions)                                                 |
| **Tipos de inspiração** | Layout de programa, clareza metodológica                                                    |
| **Aproveitável**        | Sequência fundação → disciplinas → eletivas/avançado → capstone; duração e ritmo explícitos |
| **Incompatível**        | CTA de inscrição; pricing; “concentrações” como marketing                                   |
| **Riscos**              | Parecer LMS / catálogo de curso                                                             |
| **Dificuldade técnica** | Baixa                                                                                       |
| **Aplicação**           | Explicar 4 módulos × 12 lições como **percurso**, não como grade de e-commerce              |

---

### R06 — Calvin Theological Seminary — CBTE

| Campo                   | Conteúdo                                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| **Origem**              | Calvin Theological Seminary                                                                     |
| **Endereço**            | https://calvinseminary.edu/academics/cbte/                                                      |
| **Finalidade original** | Apresentar formação competency-based no contexto ministerial                                    |
| **Tipos de inspiração** | Conceitual (progressão por cuidado/formação)                                                    |
| **Aproveitável**        | Formação no contexto; mentoria; ritmo adaptável sem banalizar rigor; linguagem de florescimento |
| **Incompatível**        | Modelo CBTE/créditos; UI de “apply now”                                                         |
| **Riscos**              | Importar jargão educacional estrangeiro                                                         |
| **Dificuldade técnica** | Baixa                                                                                           |
| **Aplicação**           | Reforçar “progressão é cuidado, não promoção” (`conteudo/programa.md`)                          |

---

### R07 — JAMI — Junta Administrativa de Missões

| Campo                   | Conteúdo                                                                                                              |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Origem**              | Agência missionária CBN (Brasil)                                                                                      |
| **Endereço**            | https://jami.com.br/ · projetos: https://jami.com.br/projetos/                                                        |
| **Finalidade original** | Portal de missões: campanhas, missionários, projetos, contribuição                                                    |
| **Tipos de inspiração** | Conceitual (missão BR); **anti** em composição                                                                        |
| **Aproveitável**        | Páginas de projeto individual (um projeto por vez); presença de “carta informativa” missionária como gênero epistolar |
| **Incompatível**        | Carrosséis de stats; campanhas; doação; catálogo continental; slides                                                  |
| **Riscos**              | Visual genérico de ONG evangélica; aparência de captação                                                              |
| **Dificuldade técnica** | N/A (anti)                                                                                                            |
| **Aplicação**           | Diferenciar **página de um projeto** de **portal de muitos projetos** — o prospecto é o primeiro                      |

---

### R08 — Missões Siloé

| Campo                   | Conteúdo                                                                                                                                |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Origem**              | Departamento de missões IEADJO                                                                                                          |
| **Endereço**            | https://missoessiloe.com.br/ · https://missoessiloe.com.br/quem-somos/                                                                  |
| **Finalidade original** | Apresentar história, campos e projetos missionários                                                                                     |
| **Tipos de inspiração** | Storytelling institucional local; **anti** em UI                                                                                        |
| **Aproveitável**        | Narrativa histórica linear; foco em necessidade do campo antes do “produto”; materiais de apresentação (PPT) como paralelo ao prospecto |
| **Incompatível**        | Layout WordPress genérico; cards de país; CTA de contribuição implícito                                                                 |
| **Riscos**              | Baixa força editorial; aparência de site paroquial                                                                                      |
| **Dificuldade técnica** | N/A                                                                                                                                     |
| **Aplicação**           | Lembrar que história + necessidade precedem método — sem herdar o visual                                                                |

---

### R09 — Bulletin of the Atomic Scientists — Digital Annual Report 2024

| Campo                   | Conteúdo                                                                                                                                                   |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Origem**              | Case Reaktiv                                                                                                                                               |
| **Endereço**            | https://reaktiv.co/case-studies/bulletin-of-the-atomic-scientists/                                                                                         |
| **Finalidade original** | Relatório anual digital para doadores em momento de transição de liderança                                                                                 |
| **Tipos de inspiração** | Storytelling, navegação, interação discreta                                                                                                                |
| **Aproveitável**        | Gravitas preservada; cartas expansíveis (profundidade sob demanda); seções exploráveis sem perder o arco; “continuidade e evolução”; scrollytelling sóbrio |
| **Incompatível**        | Charts financeiros de donor report; CMS construtor (Beaver Builder); tom de think-tank secular                                                             |
| **Riscos**              | Interatividade demais em dados; aparência de fundraising                                                                                                   |
| **Dificuldade técnica** | Média (acordeões/expansíveis já no padrão da matriz)                                                                                                       |
| **Aplicação**           | Estado atual e pedidos pastorais com **detalhe sob demanda**; selo de documento em transição (não produto acabado)                                         |

---

### R10 — Tides — Interactive Annual Reports

| Campo                   | Conteúdo                                                                                                    |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Origem**              | Acton Circle portfolio                                                                                      |
| **Endereço**            | https://www.actoncircle.co/portfolio/tides                                                                  |
| **Finalidade original** | Microsites anuais de impacto para fundação/nonprofit                                                        |
| **Tipos de inspiração** | Storytelling, layout (com ressalvas)                                                                        |
| **Aproveitável**        | Relatório como hub narrativo; seções temáticas; scroll como estrutura                                       |
| **Incompatível**        | Fotografia large-format de campanha; cor ousada; energia “Community Is Power” de marca progressista secular |
| **Riscos**              | Parecer campanha; excesso de multimídia                                                                     |
| **Dificuldade técnica** | Alta se copiar motion/foto                                                                                  |
| **Aplicação**           | Só o princípio “microsite = um documento com arco”; não a estética                                          |

---

### R11 — Transmissions (Cristóbal Balenciaga Museoa) — via Godly

| Campo                   | Conteúdo                                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Origem**              | Godly feature; museu / exposição digital                                                                                                                            |
| **Endereço**            | https://godly.website/website/transmissions-637 · site: https://transmissions.cristobalbalenciagamuseoa.com                                                         |
| **Finalidade original** | Experiência editorial/imersiva de exposição                                                                                                                         |
| **Limitação**           | Galeria Godly/Recent e o site podem exigir permissões ou ter performance pesada; análise baseada em metadados públicos (GSAP, tipografia display, scroll animation) |
| **Tipos de inspiração** | Tipográfica, interação, storytelling                                                                                                                                |
| **Aproveitável**        | Contenção tipográfica de alta costura; capítulos; scroll como virada de página                                                                                      |
| **Incompatível**        | Fashion/museum cool; GSAP pesado; estética de vitrine                                                                                                               |
| **Riscos**              | Trailer cinematográfico; legibilidade sacrificada                                                                                                                   |
| **Dificuldade técnica** | Alta (fora do escopo: sem framework/GSAP)                                                                                                                           |
| **Aplicação**           | Direção B: **apenas** ritmo e tipografia; zero estética fashion                                                                                                     |

---

### R12 — Primary Paper (Lapa Ninja)

| Campo                   | Conteúdo                                                                               |
| ----------------------- | -------------------------------------------------------------------------------------- |
| **Origem**              | Lapa Ninja gallery                                                                     |
| **Endereço**            | https://www.lapa.ninja/post/primary-paper/                                             |
| **Finalidade original** | Site editorial (“magazine / exhibition”)                                               |
| **Limitação**           | Lapa exibe screenshots/vídeo; site vivo pode mudar — princípios via arquivo da galeria |
| **Tipos de inspiração** | Layout editorial, tipografia                                                           |
| **Aproveitável**        | Sensação de publicação; exploração curada; tipografia como herói                       |
| **Incompatível**        | Tom de revista cultural secular; possível frieza                                       |
| **Riscos**              | Editorial fashion, não pastoral                                                        |
| **Dificuldade técnica** | Média                                                                                  |
| **Aplicação**           | Direção A: prospecto como **edição**, não como app                                     |

---

### R13 — Archifest Prospectus (Octopus Ink / SIA)

| Campo                   | Conteúdo                                                                                                   |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Origem**              | Prospecto impresso/digital para expositores                                                                |
| **Endereço**            | https://octopus.sg/noir/project/archifest-prospectus                                                       |
| **Finalidade original** | Prospecto institucional de evento (vendas B2B)                                                             |
| **Tipos de inspiração** | Layout, tipografia, conceitual (dossiê)                                                                    |
| **Aproveitável**        | Grid disciplinado; densidades claras; percurso overview → detalhe → decisão; tipografia bold para sínteses |
| **Incompatível**        | Objetivo comercial (expositor); métricas de “social proof” de evento                                       |
| **Riscos**              | Tom de brochure de vendas                                                                                  |
| **Dificuldade técnica** | Baixa–média                                                                                                |
| **Aplicação**           | Direção C: dossiê que conduz à **decisão pastoral**, não à compra                                          |

---

### R14 — Impetus — Designing Clarity (Behance)

| Campo                   | Conteúdo                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| **Origem**              | Behance (manifesto de identidade)                                                                 |
| **Endereço**            | https://www.behance.net/gallery/243190679/IMPETUS-Designing-Clarity-Creating-Momentum             |
| **Limitação**           | Behance pode exigir login para recomendações/full gallery; descrição pública do projeto foi usada |
| **Finalidade original** | Apresentação de brand system / manifesto de clareza                                               |
| **Tipos de inspiração** | Conceitual, tipográfica                                                                           |
| **Aproveitável**        | Clareza como virtude; contenção; design como entendimento, não tendência; calma decisiva          |
| **Incompatível**        | Brand book de estúdio de design; minimalismo fashion                                              |
| **Riscos**              | Frieza; manifesto vazio sem substância teológica                                                  |
| **Dificuldade técnica** | Baixa                                                                                             |
| **Aplicação**           | Tom das Direções A e C: **intenção, não efeito**                                                  |

---

### R15 — Katagami Literary Longform / hierarquia tipográfica editorial

| Campo                   | Conteúdo                                                                                                               |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Origem**              | Sistema tipográfico editorial (Katagami) + craft de hierarquia editorial (open-design-pro)                             |
| **Endereço**            | https://katagami.ai/ (literary longform) · craft tipográfico editorial em repositórios públicos de design rules        |
| **Finalidade original** | Linguagem de interface para leitura longa                                                                              |
| **Tipos de inspiração** | Tipográfica, layout                                                                                                    |
| **Aproveitável**        | Medida 60–70ch; serif no corpo; mono só em metadados; espaço como hierarquia; ritmo compressão/expansão; chrome quieto |
| **Incompatível**        | Stack de fontes diferente do projeto (já há Source Serif 4 + Montserrat self-hosted)                                   |
| **Riscos**              | Trocar fontes sem necessidade; “revista literária” sem escudo/caserna                                                  |
| **Dificuldade técnica** | Baixa (alinhar tokens existentes)                                                                                      |
| **Aplicação**           | Direção A: prospecto como superfície de leitura                                                                        |

---

### R16 — Haven Church (ambiguidade registrada)

| Campo                   | Conteúdo                                                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Origem**              | (a) Template Framer “Haven Church” — https://framplates.com/haven-church · (b) The Haven Church — https://www.thehavenchurch.net/ |
| **Limitação**           | O ponto de partida do brief não corresponde a um único site Awwwards editorial. São produtos distintos                            |
| **Finalidade original** | Portal/template de igreja (cultos, grupos, doação, visit)                                                                         |
| **Tipos de inspiração** | Tipografia dark+serif (limitado); majoritariamente **anti**                                                                       |
| **Aproveitável**        | Pouco: eventual sobriedade de paleta escura + serif                                                                               |
| **Incompatível**        | Video hero; CMS de sermões; newsletter; “plan your visit”; conversão                                                              |
| **Riscos**              | Confundir prospecto pastoral com site de igreja                                                                                   |
| **Dificuldade técnica** | N/A                                                                                                                               |
| **Aplicação**           | Anti-referência explícita                                                                                                         |

---

### R17 — Soul Church / Cornerstone Church (Awwwards)

| Campo                   | Conteúdo                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| **Origem**              | Awwwards (Honorable Mention / Nominee)                                                         |
| **Endereço**            | https://www.awwwards.com/sites/soul-church · https://www.awwwards.com/sites/cornerstone-church |
| **Finalidade original** | Sites de igreja com motion e engajamento comunitário                                           |
| **Tipos de inspiração** | Interação (como anti-modelo)                                                                   |
| **Aproveitável**        | Quase nada para o brief pastoral de um destinatário                                            |
| **Incompatível**        | Card stacking, draggable images, intro animations, sticky footers de campanha, mega-nav        |
| **Riscos**              | Copiar “igreja premiada” e perder solenidade                                                   |
| **Dificuldade técnica** | Alta e indesejável                                                                             |
| **Aplicação**           | Anti-referências de motion e captação                                                          |

---

### R18 — Galerias agregadoras (Godly/Recent, Land-book, One Page Love, Dribbble, Behance, Pinterest)

| Campo                             | Conteúdo                                                                                                                                                   |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Origem**                        | Curadorias de design                                                                                                                                       |
| **Endereços**                     | https://godly.website/ · https://land-book.com/ · https://onepagelove.com/ · https://dribbble.com/ · https://www.behance.net/ · https://www.pinterest.com/ |
| **Limitação**                     | Login walls, paywalls e feeds personalizados impedem inventário exaustivo confiável. Usadas para **padrões**, não como fichas de site único inventadas     |
| **Padrões observados (úteis)**    | One-pagers editoriais; tipografia oversized com corpo serif; progress bars; chapter markers; sticky TOC                                                    |
| **Padrões observados (a evitar)** | Purple SaaS; cream+terracotta clichê; glow; pills; hero com badges flutuantes; glassmorphism                                                               |
| **Aplicação**                     | Checklist negativo/positivo na direção visual — sem copiar shots                                                                                           |

---

### R19 — Internet Outreach Experts — “Editorial magazine” church template (complementar)

| Campo                   | Conteúdo                                                        |
| ----------------------- | --------------------------------------------------------------- |
| **Origem**              | Descrição pública de template editorial para igrejas            |
| **Endereço**            | https://internetoutreachexperts.com/templates/                  |
| **Finalidade original** | Template de igreja estilo magazine (“issue numbers”)            |
| **Tipos de inspiração** | Conceitual (publicação)                                         |
| **Aproveitável**        | Tratar a apresentação como **edição / fascículo**, não brochure |
| **Incompatível**        | Ainda é template de igreja com teaser de sermão                 |
| **Aplicação**           | Metáfora de “documento em versão” já presente no selo v0.4.0    |

---

## 5. Análise detalhada das 8 melhores

Seleção: adequação a destinatário único + solenidade + sobriedade + viabilidade no stack atual.

### 5.1 UPA DI Annual Report (R01) — nota-guia: excelente em navegação de documento

**Por que está no top 8:** É um microsite cuja função é **ser lido como relatório**, com palavra de liderança e percurso guiado — análogo funcional ao prospecto ao pastor.

**Princípios a extrair:**

1. Abertura com voz de autoridade institucional (carta), não com catálogo.
2. Navegação que comunica “você está em um documento com partes”.
3. Progresso de leitura como cortesia, não gamificação.
4. Densidade textual aceita, desde que o caminho seja claro.

**O que não levar:** cor alegre de ONG, mapa-mundo, storytelling de impacto para doador.

**No Discipulando:** reforçar o índice atual como sumário de prospecto; manter selo de versão; estruturar Parte V como “o que pedimos”.

---

### 5.2 Snow Fall / scrollytelling editorial (R02) — excelente em storytelling

**Princípios:**

1. Um único arco; mídia não é desvio.
2. Capítulos e pausas.
3. Surpresa controlada, sensação natural.
4. O texto estabelece o ritmo.

**O que não levar:** vídeo full-bleed, simulações, orçamento de newsroom.

**No Discipulando:** Direção B — atmosferas por seção (escuro/papel/claro já existem) com revelações sóbrias; nunca “trailer da caserna”.

---

### 5.3 Princeton Curriculum / Core Commitments (R04) — excelente em currículo/metodologia

**Princípios:**

1. Compromissos nomeados antes da lista de cursos.
2. Racional teológico explícito.
3. Formação e educação juntas.
4. Antecipar perguntas (FAQ) sem tom de chat comercial.

**No Discipulando:** subir princípios e público; apresentar o eixo “Cristo chama…” e as recusas como **compromissos**, não como feature cards.

---

### 5.4 Archifest Prospectus (R13) — excelente em dossiê / fechamento decisório

**Princípios:**

1. Grid que organiza densidade.
2. Percurso overview → prova → decisão.
3. Tipografia que hierarquiza síntese vs. detalhe.

**No Discipulando:** Direção C — matriz, status e checklist de apreciação com acabamento de dossiê, sem “sales deck”.

---

### 5.5 Impetus manifesto (R14) — excelente em solenidade por contenção

**Princípios:**

1. Clareza como postura.
2. Intenção > tendência.
3. Calma decisiva.

**No Discipulando:** critério estético transversal — se um efeito não serve à compreensão pastoral, corta-se.

---

### 5.6 Literary longform / Katagami (R15) — excelente em tipografia e legibilidade

**Princípios:**

1. Medida de leitura (~62ch já no token `--medida`).
2. Serif no corpo; labels discretos.
3. Espaço como hierarquia.
4. Chrome (nav) silencioso.

**No Discipulando:** Direção A — margens, folha, notas, capítulos; índice como sumário de livro.

---

### 5.7 CTS (R03) — útil só como seriedade teológica (portal = anti)

**Princípio aproveitável:** instituição de formação fala com peso.  
**Princípio rejeitado:** arquitetura de portal multi-serviço.

**No Discipulando:** tom, não template.

---

### 5.8 Bulletin digital report (R09) — excelente em gravitas + profundidade sob demanda

**Princípios:**

1. Documento em transição pode ser digital sem perder solenidade.
2. Cartas/seções expansíveis preservam fluxo.
3. Arco narrativo nomeado (“continuidade e evolução”).

**No Discipulando:** estado atual + lacunas (anatomia/encontro/edições) como blocos honestos expansíveis; não esconder o que falta nem inventar.

---

## 6. Padrões recorrentes (úteis)

Entre as referências adequadas, repetem-se:

1. **Documento com destinatário** — carta ou palavra de abertura.
2. **Índice + progresso** — leitura longa sem perder o lugar.
3. **Arco narrativo** — origem → necessidade → proposta → prova → pedido.
4. **Compromissos antes do catálogo** — valores/eixos antes da grade.
5. **Tipografia de leitura** — serif, medida controlada, hierarquia por espaço.
6. **Interação a serviço do entendimento** — mapa, acordeão, hotspots — não ornamentação.
7. **Fechamento decisório** — o leitor sabe o que fazer/validar.
8. **Honestidade de status** — versão, rascunho, transição.
9. **Um projeto por superfície** — microsite, não portal.
10. **Conteção de motion** — preferível a premiados “barulhentos”.

---

## 7. Oportunidades

| Oportunidade                        | Por quê                                                                                       |
| ----------------------------------- | --------------------------------------------------------------------------------------------- |
| Reforçar gênero “carta-prospecto”   | Único e alinhado ao destinatário; raro em “igrejas Awwwards”                                  |
| Escudo como doutrina (já existente) | Diferencial autêntico; não precisa de stock photo                                             |
| Matriz como ferramenta pastoral     | UPA/Bulletin mostram que dados podem ser documento, não dashboard SaaS                        |
| Cinco movimentos narrativos         | Corrige ordem atual (princípios tarde; marca cedo demais)                                     |
| Selo de versão / apreciação         | Já existe; pode ser o fio editorial da Direção A                                              |
| Progressive enhancement             | Noscript/fallback já no DNA — vantagem sobre scrollytelling frágil                            |
| Tokens atuais (navy/bronze/papel)   | Base sólida; evitar clichês AI (purple, cream+terracotta genérico mal usado, broadsheet frio) |

---

## 8. Riscos

| Risco                             | Mitigação                                                             |
| --------------------------------- | --------------------------------------------------------------------- |
| Copiar igreja premiada            | Anti-referências R16–R17; critérios 1, 5, 14                          |
| Scrollytelling cinematográfico    | Direção B com teto técnico: IO + CSS; sem GSAP/vídeo                  |
| Manual de marca no scroll         | Cortar paleta/hex/amostra tipográfica do caminho pastoral             |
| Protagonismo do Projeto           | Sobrelinha e Parte I hoje competem com o h1 — corrigir na arquitetura |
| Aparência comercial (stats/cards) | Preferir prosa e regras tipográficas                                  |
| Esfriar demais (só dossiê)        | Manter Adulão, citação, carta                                         |
| Inventar conteúdo                 | Campos null omitidos; lacunas explícitas                              |
| Framework / libs                  | Fora do escopo (`docs/contexto-do-projeto.md`)                        |

---

## 9. Anti-referências (não seguir)

1. **Templates e portais de igreja conversacionais** (Haven template, thehavenchurch.net, Soul/Cornerstone Awwwards) — culto, visit, give, groups.
2. **JAMI / Siloé como sistema visual** — missão real, UI genérica de captação/catálogo.
3. **CTS como arquitetura de IA** — multi-oferta, news, donate.
4. **Tides / annual reports “bold campaign”** — energia de marca e foto large-format.
5. **Transmissions / fashion-museum immersive** — belo, inadequado pastoralmente se copiado.
6. **SaaS landing patterns** — stat strips, feature cards com hover lift, pills, glow, badges no hero.
7. **LMS / catálogo de curso** — “modules grid” estilo Udemy.
8. **Dribbble shots órfãos** — composição sem contexto institucional; risco de estética de app.

---

## 10. Diagnóstico do site atual (v0.4.0)

### Método

Análise de [`index.html`](../index.html), CSS (`tokens`, `layout`, `componentes`, `atos`, `prospecto`), JS e conteúdo canônico.  
**Sem capturas automatizadas de viewport** (limitação registrada). Viewports inferidos pelas breakpoints: ≤899px (drawer), ≥768px (texto justificado / ajustes), ≥860–900px (mapa/escudo em grid), ≥1280px (espaçamento de ato).

### Abertura (`#secao-1`)

- **Forte:** h1 correto (“Discipulando a Caserna”); saudação; parágrafo de submissão; selo de documento de trabalho.
- **Fraco:** sobrelinha “Projeto Caserna de Adulão apresenta”; primeiro viewport carregado (marca + subtítulo + carta + selo + “Role para continuar”); fundo só em gradiente navy, sem plano visual dominante de conteúdo (aceitável se editorial, frágil se “hero de produto”).

### Hierarquia

- DOM: h1 → h2 de parte → h3 de seção — correto.
- Narrativa: Parte I ainda centra o **Projeto** (“De onde o Projeto… vem”). Meta description também lidera com o Projeto.

### Narrativa

- Quatro partes (Identidade / Programa / Implantação / Estado) funcionam como spine.
- Falta o par explícito **necessidade → resposta** em um fôlego.
- Voz “Pastor,” quase some entre abertura e fechamento.

### Carta ao Pr. Glaydston

- Presente e valiosa.
- Deveria ser o gênero contínuo do documento, não só o prólogo.

### Problema / resposta

- Problema: Adulão / feridos (`#secao-2`).
- Resposta: eixo + recusas (`#secao-3`) — conteúdo ouro em **cards** genéricos.

### Módulos / matriz / escudo

- Escudo interativo: preservar conceito; simplificar densidade no mobile (hotspots + lista).
- Mapa de marchas + matriz: preservar; antepor brief pastoral “como ler isto”.
- Cauda `#secao-4` (marchas ok; paleta hex, tipografia-amostra, certificado): **fora do caminho pastoral principal**.

### Navegação

- Índice hierárquico + progresso: padrão alinhado a UPA/Bulletin.
- Rótulos abstratos (“Arquitetura”, “Matriz”) — preferir linguagem de stakes pastorais.

### Fechamento / rodapé

- `#secao-10` honesto, porém tom de checklist de projeto.
- Rodapé recentra o Projeto (CNPJ, brasão) — ok em miúdo, não como segundo herói.

### Experiência móvel (inferida)

| Viewport     | Leitura                                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| **360×800**  | Drawer “Sumário”; sem rail; mapa empilha; escudo denso; scroll longo em marca+matriz; alvos ≥44px em vários controles |
| **768×1024** | Texto justificado; grids intermediários; ainda sem rail completo até 900px                                            |
| **1440×900** | Rail 9.5rem; escudo e mapa em layout largo; leitura confortável no container 40rem                                    |

### Preservar / refinar / reconstruir / remover

| Ação                              | Itens                                                                                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Preservar**                     | Atos/partes; carta; citação Adulão; escudo-doutrina; mapa; matriz; selo; a11y (skip, foco, reduced-motion); noscript; honestidade Módulo 1 vs 2–4 |
| **Refinar**                       | Protagonismo Discipulando; voz epistolar; abertura; rótulos do índice; escudo mobile; fechamento como pedido pastoral                             |
| **Reconstruir**                   | Ordem narrativa (ver arquitetura); apresentação das recusas; apresentação dos números 4/12/48                                                     |
| **Remover do scroll principal**   | Paleta/hex; tipografia-amostra; energia de brand guidelines; hover de card como pedagogia                                                         |
| **Visualmente genérico**          | Eyebrows uppercase; stat strip; card grid; “Role para continuar” animado                                                                          |
| **Editorialmente incompleto**     | Anatomia da lição; encontro; duas edições (ausências a declarar, não inventar)                                                                    |
| **Prejudica o objetivo pastoral** | Pedir validação de sistema gráfico em vez de caminho de discipulado                                                                               |

---

## 11. Conclusão

A reformulação deve aprofundar o que o site já é em embrião — **documento pastoral interativo** — e remover o que o puxa para portal, brand book ou landing.

As referências mais férteis não são igrejas Awwwards, e sim **relatórios digitais sóbrios**, **páginas de currículo teológico**, **prospectos de decisão** e **princípios de longform**.

Três direções (A editorial, B jornada, C dossiê) são desenvolvidas e confrontadas em [`arquitetura-narrativa-v1.md`](arquitetura-narrativa-v1.md).  
**A decisão final é humana.**

---

## Apêndice — Índice rápido de URLs

| ID   | URL                                                                                   |
| ---- | ------------------------------------------------------------------------------------- |
| R01  | https://rapport2023-2024.upadi.ca/en/                                                 |
| R02  | https://www.nytimes.com/projects/2012/snow-fall/                                      |
| R03  | https://www.cts.edu/                                                                  |
| R04  | https://ptsem.edu/academics/our-curriculum/                                           |
| R05  | https://fuller.edu/master-of-arts-in-theological-studies/                             |
| R06  | https://calvinseminary.edu/academics/cbte/                                            |
| R07  | https://jami.com.br/                                                                  |
| R08  | https://missoessiloe.com.br/                                                          |
| R09  | https://reaktiv.co/case-studies/bulletin-of-the-atomic-scientists/                    |
| R10  | https://www.actoncircle.co/portfolio/tides                                            |
| R11  | https://transmissions.cristobalbalenciagamuseoa.com                                   |
| R12  | https://www.lapa.ninja/post/primary-paper/                                            |
| R13  | https://octopus.sg/noir/project/archifest-prospectus                                  |
| R14  | https://www.behance.net/gallery/243190679/IMPETUS-Designing-Clarity-Creating-Momentum |
| R16a | https://framplates.com/haven-church                                                   |
| R16b | https://www.thehavenchurch.net/                                                       |
| R17  | https://www.awwwards.com/sites/soul-church                                            |
