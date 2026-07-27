#!/bin/bash
set -e

echo "🚀 Iniciando merge de branches..."
echo ""

# Configurar git
git config --global user.email "action@github.com"
git config --global user.name "GitHub Action Bot"

# Fetch
echo "📥 Fazendo fetch de todas as branches..."
git fetch origin

# Checkout main
echo "🔄 Mudando para branch main..."
git checkout main

# Pull
echo "⬇️ Puxando atualizações do main..."
git pull origin main

# Merge
echo "🔗 Fazendo merge de flavioalves/codex/2026-07-27/19-14-46/executar-melhorias-tecnicas-do-relatorio-a..."
git merge flavioalves/codex/2026-07-27/19-14-46/executar-melhorias-tecnicas-do-relatorio-a --no-edit || {
    echo "⚠️ Erro no merge! Abortando..."
    git merge --abort
    exit 1
}

# Push
echo "⬆️ Enviando merge para GitHub..."
git push origin main

# Delete branch
echo "🗑️ Deletando branch remoto..."
git push origin --delete flavioalves/codex/2026-07-27/19-14-46/executar-melhorias-tecnicas-do-relatorio-a || true

echo ""
echo "✅ SUCESSO! Branches foram merged e apenas main permanece!"
echo "📊 Estado final:"
git branch -a
