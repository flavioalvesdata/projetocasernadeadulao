# Guia simples do prospecto digital

Este guia explica, sem exigir conhecimento de programação, o que já existe neste
repositório, como ler o prospecto e como cuidar dele sem transformar uma pendência em
informação oficial. Ele complementa o `README.md`: não cria outro produto nem substitui
as fontes editoriais.

## O que é este prospecto digital

O site de uma página só, aberto a partir de `index.html`, é uma apresentação de trabalho
do programa **Discipulando a Caserna**. Ele combina carta pastoral, narrativa de leitura
contínua e explicação visual do programa. Seu destinatário declarado é o **Pr.
Glaydston**, que recebe o material para apreciação, orientação e validação pastoral.

Portanto, o site não é um portal público da instituição, uma plataforma de cursos, uma
página de inscrição ou uma declaração de que todo o programa foi aprovado. O próprio
prospecto se apresenta como versão candidata.

## Projeto Caserna de Adulão e Discipulando a Caserna não são a mesma coisa

- **Projeto Caserna de Adulão** é o contexto ministerial, missionário e institucional
  mais amplo.
- **Discipulando a Caserna** é o programa específico de formação bíblica e discipulado
  apresentado pelo prospecto. Ele serve ao Projeto e é o protagonista desta página.

Essa diferença evita duas leituras erradas: o prospecto não descreve toda a instituição,
e o nome do programa não deve ser usado como sinônimo do Projeto.

## Quem revisa o material

Há revisões com finalidades diferentes:

- a **apreciação pastoral** é dirigida ao Pr. Glaydston. O repositório não autoriza
  concluir, além disso, quem aprova cada decisão institucional ou qual é o papel formal
  de cada pessoa;
- a **revisão editorial humana** confere o texto da página com as fontes de `conteudo/`,
  preserva as citações literais e deixa lacunas como lacunas;
- a **revisão técnica** verifica geração, codificação, formatação, acessibilidade,
  navegação e testes. As automações ajudam a encontrar erros, mas não concedem aprovação
  pastoral nem resolvem decisões humanas.

## Como percorrer a apresentação

A leitura mais natural é de cima para baixo. O prospecto organiza a narrativa em cinco
movimentos: **Necessidade**, **Resposta**, **Programa**, **Prova** e **Pedido**.

### Sumário

O botão **Sumário** abre o índice lateral quando o JavaScript está ativo. Cada item leva
diretamente a uma seção numerada. Em telas maiores, o índice pode permanecer visível; ao
rolar a página, o JavaScript realça a seção corrente e atualiza a barra de progresso.

### Movimentos e trilho narrativo

O trilho é a sequência de cinco marcadores na lateral. Use-o para saltar ao início de um
movimento; use o sumário quando quiser uma seção específica. Os marcadores são links
normais, por isso continuam levando às âncoras mesmo sem JavaScript. A ordem dos
movimentos funciona como uma visão geral da história, mas não significa que todos eles
já tenham conteúdo completo.

### Escudo

Na seção 7, **A marca**, o escudo relaciona suas peças ao conteúdo apresentado. Com
JavaScript, selecione uma peça pelo ponto no desenho ou pelo botão correspondente para
trocar o painel explicativo. Pelo teclado, as abas aceitam as setas, `Home` e `End`. A
arte exibida é um estudo visual provisório, não a confirmação de uma marca oficial.

## O que acontece com e sem JavaScript

Com JavaScript, a página oferece o menu móvel do sumário, indicação de progresso e da
seção atual, revelação gradual de elementos e troca dos painéis do escudo. O menu pode
ser operado por teclado e fechado com `Escape`.

Sem JavaScript, o conteúdo editorial que já está no HTML permanece legível, e os links
do sumário e do trilho continuam funcionando como âncoras. Em contrapartida, não há
atualização automática de progresso ou item atual, o botão do sumário móvel não ganha o
comportamento de abrir e fechar, as revelações deixam de ser interativas e o escudo não
troca de painel. Isso é uma forma de leitura reduzida, não uma cópia funcional completa
da experiência com JavaScript.

## O que está implementado e o que continua pendente

### Implementado

- estrutura estática, estilos, fontes e imagens locais;
- sumário, trilho dos cinco movimentos e âncoras das quinze seções;
- conteúdo apresentado nas seções 1 a 7, correspondentes aos movimentos Necessidade e
  Resposta;
- escudo interativo e alternativa textual já presente no HTML;
- ferramentas de geração e verificação, testes unitários, testes nos navegadores e
  verificações de acessibilidade.

### Pendente de conteúdo ou decisão humana

- conteúdo completo das seções 8 a 15; hoje elas são apenas âncoras resumidas na página;
- anatomia da lição, encontro, duas edições, matriz publicada e demais experiências
  reservadas para essas seções;
- apreciação pastoral do Módulo 1 e do prospecto;
- arte oficial, licença, domínio, política de acesso e política futura de indexação;
- os valores que continuam `null` nos módulos 3 e 4 e qualquer outra lacuna editorial;
- decisões sobre publicação, menções institucionais e responsabilidades formais.

Arquivos com textos planejados para movimentos futuros não tornam essas partes
automaticamente publicadas ou aprovadas. Este guia apenas registra o estado observado e
não preenche nenhuma dessas pendências.

## Onde cada coisa mora

Não é preciso decorar a árvore inteira. Estas são as áreas principais:

- `index.html` reúne a página publicada, suas âncoras, textos editoriais já incorporados
  e a ordem de carregamento dos estilos e comportamentos;
- `conteudo/` guarda as **fontes canônicas** em Markdown e JSON. É o primeiro lugar para
  conferir ou alterar conteúdo editorial autorizado;
- `css/` separa aparência básica, layout, componentes e seções;
- `js/` contém os comportamentos da página. Dentro dele, `js/dados/` contém resultados
  gerados, não fontes para edição;
- `assets/` contém fontes, imagens e outros recursos locais;
- `ferramentas/` contém os programas Node usados para servir, gerar e verificar o site;
- `testes/` descreve em código os comportamentos que devem continuar funcionando;
- `docs/` reúne contexto, arquitetura, testes e procedimentos mais detalhados;
- `README.md`, `TODO.md` e `SECURITY.md` resumem operação, pendências e segurança.

## Fontes canônicas e arquivos gerados

As fontes de verdade editoriais são `conteudo/*.md` e `conteudo/*.json`. Uma citação
Markdown iniciada por `>` nesses arquivos é literal: deve ser preservada sem resumo,
paráfrase ou “melhoria”. Valores `null` também devem continuar nulos e ser omitidos da
interface, nunca substituídos por texto inventado.

Os arquivos `js/dados/*.js` são cópias derivadas dos JSON canônicos, produzidas de modo
padronizado por `ferramentas/gerar-dados.js`. Uma edição manual nesses arquivos cria duas
versões concorrentes do mesmo dado e será perdida na próxima geração. Por isso, corrija
o JSON em `conteudo/` e execute `npm run generate`. A verificação
`npm run check:generated` apenas compara os resultados; ela não atualiza os arquivos.

## Sequência segura para editar e revisar

1. Leia `AGENTS.md`, `.cursor/rules/discipulando-caserna.mdc` e a fonte relevante em
   `conteudo/`. Consulte o `README.md`, o `TODO.md` e `docs/` quando a mudança tocar
   estado, arquitetura, testes ou publicação.
2. Confirme que a mudança já foi autorizada. Se depender de conteúdo pastoral, campo
   `null`, cargo, aprovação, marca, acesso ou outra decisão institucional, registre a
   pendência em vez de completar por conta própria.
3. Edite a fonte canônica. Preserve literalmente toda citação iniciada por `>`.
4. Execute `npm run generate`, especialmente depois de alterar um JSON. Nunca “acerte” o
   resultado diretamente em `js/dados/`.
5. Execute `npm run check:generated`, `npm run check:encoding` e
   `npm run format:check`. Se o formato estiver incorreto, use `npm run format`, revise o
   que ele mudou e repita as verificações.
6. Execute `npm run validate`. Essa esteira verifica os gerados, a codificação, o
   formato, HTML, CSS, JavaScript, testes unitários e testes de navegador; ela não gera
   nem corrige conteúdo automaticamente.
7. Faça a revisão humana: compare antes e depois, leia o trecho no contexto, percorra
   sumário, trilho e escudo com mouse e teclado, confira telas estreitas e largas e abra
   a página sem JavaScript.
8. Só então registre a mudança no Git, informando claramente qualquer limitação ou
   pendência que permaneceu.

Para leitura simples, uma cópia completa pode abrir `index.html` diretamente. Para uma
revisão técnica mais fiel, execute `npm start` e abra `http://127.0.0.1:4173`, pois o
protocolo `file:` tem limitações próprias.

## `noindex`, `nofollow` e `robots.txt` não protegem o site

O `index.html` declara `noindex, nofollow`, pedindo a mecanismos de busca que não
indexem a página nem sigam seus links. O `robots.txt` declara `Disallow: /`, pedindo aos
robôs que respeitam esse padrão que não rastreiem nenhuma rota.

Essas diretivas são pedidos para robôs, não barreiras de segurança. Elas não exigem
senha, não autenticam visitantes, não criptografam o conteúdo, não revogam cópias já
compartilhadas e não impedem que alguém com a URL abra a página. Robôs podem ignorá-las,
e bloquear rastreamento não garante que uma URL nunca apareça em resultados por outras
referências. Acesso restrito real depende de uma solução de controle de acesso e de uma
decisão institucional; remover ou manter essas diretivas também depende de decisão
humana.

## Casos de uso em forma de história

### Visitante: compreender antes de julgar

Uma pessoa recebe a URL e começa pela abertura. Ela lê Necessidade e Resposta na ordem,
usa o trilho para entender os cinco grandes momentos e abre o escudo para relacionar as
peças à proposta. Ao chegar às seções 8 a 15, encontra âncoras incompletas e entende que
não deve tratá-las como conteúdo final. Se o JavaScript estiver desativado, ela ainda
consegue ler o texto e seguir as âncoras, sabendo que algumas interações não funcionarão.

### Revisor editorial: proteger fidelidade e lacunas

Uma revisora recebe uma alteração de texto. Primeiro localiza o arquivo correspondente
em `conteudo/`, compara a redação com a página e verifica se citações literais não foram
alteradas. Ela não completa valores `null` nem aproveita textos planejados das seções
8–15 como se já estivessem publicados. Depois da geração e das verificações, lê a página
inteira ao redor da mudança e encaminha questões pastorais ou institucionais para decisão
humana.

### Mantenedor técnico: mudar sem criar duas fontes da verdade

Um mantenedor precisa corrigir um dado curricular autorizado. Ele altera o JSON em
`conteudo/`, executa `npm run generate` e confirma que somente os artefatos esperados
mudaram. Em seguida roda as verificações e `npm run validate`, revisa a página no servidor
local, testa teclado e comportamento sem JavaScript e registra a mudança. Se a validação
apontar divergência em `js/dados/`, ele volta à fonte e à geração; não remenda o arquivo
derivado.
