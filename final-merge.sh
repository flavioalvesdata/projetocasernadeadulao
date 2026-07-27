#!/bin/bash
set -e

# Configurar Git com credentials
git config --global user.email "flavioalves.data@gmail.com"
git config --global user.name "Flávio Alves"

# Clonar/atualizar
cd /tmp
rm -rf projetocasernadeadulao
git clone https://github.com/flavioalvesdata/projetocasernadeadulao.git
cd projetocasernadeadulao

# Fetch
git fetch origin

# Checkout main
git checkout main

# Merge
git merge flavioalves/codex/2026-07-27/19-14-46/executar-melhorias-tecnicas-do-relatorio-a --allow-unrelated-histories --no-edit

# Push
git push origin main

# Delete branch
git push origin --delete flavioalves/codex/2026-07-27/19-14-46/executar-melhorias-tecnicas-do-relatorio-a

echo "✅ MERGE CONCLUÍDO!"
git branch -a
