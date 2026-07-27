# Contexto do projeto — apresentação Discipulando a Caserna

Documento de orientação para a reformulação visual, narrativa, editorial e técnica.  
Não inventa fatos: lacunas aparecem como **dúvidas**.

Versão de referência do site atual: **v0.4.0**.  
Branch de trabalho da reformulação: `redesign/apresentacao-discipulando-caserna`.

---

## O que é o Projeto Caserna de Adulão

Projeto ministerial, missionário e institucional mais amplo, sediado em Fortaleza-CE (conforme rodapé e `js/config.js`).

No material atual, aparece como:

- contexto da metáfora de Adulão (1Sm 22.2): refúgio de homens feridos, não academia de elite;
- instituição que apresenta o programa e figura na marca, rodapé e metadados;
- portador de CNPJ e contato institucional publicados no site.

**Dúvida:** além do que o prospecto e o rodapé já dizem, não há neste repositório um estatuto, missão institucional completa ou descrição autônoma do Projeto Caserna de Adulão (escopo missionário, estrutura, relação com igrejas/capelanias, etc.).

---

## O que é o Discipulando a Caserna

Projeto específico de formação bíblica e discipulado no contexto da caserna, desenvolvido para servir ao Projeto Caserna de Adulão.

Características documentadas nas fontes canônicas (`conteudo/`, `index.html`):

- quatro módulos sequenciais, doze lições cada (48 encontros, ~1 ano);
- eixo teológico: Cristo chama, treina, molda e envia;
- metáfora da armadura de Efésios 6 a serviço do evangelho (nunca o contrário);
- público primário: militares e custodiados, em restauração; secundário: instrutores, capelanias e lideranças;
- Módulo 1 produzido (edições Aluno e Instrutor); Módulos 2–4 com matriz definida e produção condicionada à validação pastoral do Módulo 1;
- fonte de conteúdo citada: Guia Mestre v1.0-RC (não versionado neste repositório).

---

## Relação entre os dois

| Nome                      | Papel                                                         |
| ------------------------- | ------------------------------------------------------------- |
| Projeto Caserna de Adulão | Contexto institucional, missionário e ministerial             |
| Discipulando a Caserna    | Protagonista da apresentação; programa/projeto de discipulado |

Não são sinônimos. O discipulado serve ao Projeto; o site não substitui um portal institucional do Projeto.

**Tensão com o texto atual:** a abertura e o README ainda formulam “Projeto Caserna de Adulão apresenta o programa…”. Isso é compatível com autoria/apresentação institucional, mas pode competir com a regra de protagonismo do Discipulando a Caserna — a reformulação editorial deverá resolver essa hierarquia sem inventar fatos.

---

## Objetivo do site

Ser uma apresentação digital do Discipulando a Caserna ao **Pr. Glaydston**, para que ele compreenda e possa apreciar, orientar e validar:

1. o contexto que originou a proposta;
2. a necessidade pastoral identificada;
3. o que é o Discipulando a Caserna;
4. a quem se destina;
5. fundamentos bíblicos;
6. princípios pastorais;
7. metodologia;
8. arquitetura curricular;
9. módulos e encontros;
10. integração com o Projeto Caserna de Adulão;
11. o que já foi produzido;
12. o que ainda está em desenvolvimento;
13. o que precisa de apreciação, orientação ou validação pastoral.

Natureza desejada da experiência: prospecto pastoral digital; carta institucional; apresentação de projeto; manifesto de missão; documento editorial interativo; narrativa em rolagem; apresentação curricular.

---

## Destinatário

- Configurado em `js/config.js`: destinatário `Glaydston`; nome formal `Pr. Glaydston Gama Lopes`; cargo `Pastor-presidente`.
- Saudação da abertura: “Pastor Glaydston,”.
- Fechamento lista nome, cargo e e-mail institucional.

**Dúvida:** o repositório não documenta se o Pr. Glaydston é apenas o destinatário da apreciação, também autor/responsável editorial, ou ambos. O cargo “Pastor-presidente” aparece no encerramento sem esclarecer a relação jurídica ou eclesial com o Projeto.

---

## O que o site deve comunicar

- Hierarquia clara: Discipulando a Caserna em primeiro plano; Projeto como contexto.
- Necessidade pastoral (ferimento, Adulão, acolhimento antes da exigência).
- Convicção cristocêntrica e o que o programa recusa (moralismo, militarização da fé, lógica de troféu, exposição do ferido).
- Marca como doutrina em imagem (estudo visual provisório até homologação).
- Arquitetura, matriz, progressão, público, princípios.
- Estado real de produção e pedidos explícitos de apreciação pastoral.
- Tom de documento de trabalho — não de produto acabado ou campanha.

---

## O que o site não deve parecer

- Portal público comum de igreja
- Página de eventos ou notícias
- Catálogo de ministérios
- Página de arrecadação
- Landing page comercial
- Template religioso genérico
- Plataforma de cursos / LMS
- Site de captação de participantes

Também fora do escopo técnico atual (`TODO.md`): formulários, analytics, cookies, back-end, frameworks, bundlers, migração para React/Vue/Next/Astro/Tailwind.

---

## Estado técnico atual (síntese)

- Site estático de página única (`index.html`), sem bundler.
- CSS: `tokens`, `base`, `layout`, `componentes`, `atos`, `prospecto`.
- JS modular clássico; dados gerados em `js/dados/*` a partir de `conteudo/*.json`.
- Publicação: GitHub Pages; `noindex`/`nofollow` (não é autenticação).
- Qualidade: `npm run validate` (generate, encoding, lint HTML/CSS/JS, testes unitários e e2e).
- Seções futuras reservadas (não publicadas): anatomia da lição, encontro, duas edições (`js/anatomia.js`, `js/encontro.js`, `js/edicoes.js`).

Fontes canônicas de conteúdo: `conteudo/*.json`, `conteudo/*.md`.  
Não editar manualmente `js/dados/*.js` nem o bloco gerado `FALLBACK-DADOS` em `index.html`.

---

## Dúvidas e lacunas encontradas

Registradas sem preenchimento inventado:

1. **Definição institucional completa** do Projeto Caserna de Adulão (missão, governança, escopo) — ausente no repositório.
2. **Guia Mestre v1.0-RC** é citado como fonte, mas não está versionado aqui; não há como o agente conferir trechos fora do que já está em `conteudo/` e no HTML.
3. **Virtude, tema e temaRef** dos Módulos 3 e 4 estão `null` em `modulos.json` (já documentado em `conteudo/LEIA-ME.md`).
4. **Arte oficial** da logomarca/brasão: apenas estudos visuais; homologação pendente.
5. **Licença** de código e conteúdo pastoral: indefinida.
6. **Política de acesso**: prévia pública vs. área restrita real — pendente (`TODO.md`).
7. **Papel exacto do Pr. Glaydston** em relação à autoria e à liderança do Projeto.
8. **Necessidade pastoral** está narrada (Adulão/ferimento), mas não há documento separado que a sistematize como diagnóstico pastoral formal.
9. **Metodologia do encontro** e anatomia da lição: previstas, ainda sem conteúdo publicado.
10. **Integração operacional** Discipulando × Projeto (como o programa se encaixa na rotina ministerial do Projeto) — só implícita.
11. **Domínio próprio / remoção de `noindex`**: decisão futura.
12. **Conflito de regras de Git**: `.cursor/rules/commits-na-main.mdc` pede commits na `main`; esta reformulação foi instruída a trabalhar na branch `redesign/apresentacao-discipulando-caserna`. Seguir o pedido explícito da etapa em curso; alinhar a regra de commits quando a reformulação for concluída ou quando o usuário decidir o fluxo permanente.

---

## Próxima etapa recomendada

Alinhar **narrativa e hierarquia editorial** (protagonismo do Discipulando a Caserna) em um plano de reformulação — sem redesenhar ainda — listando seções a manter, reescrever ou acrescentar, e as dúvidas humanas que bloqueiam copy ou marca.
