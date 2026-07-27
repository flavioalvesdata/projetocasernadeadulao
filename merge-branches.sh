#!/bin/bash

# Script para fazer merge dos branches e manter apenas main

echo "Iniciando processo de merge..."

# Fetch de todas as atualizações
git fetch origin

# Checkout para main
git checkout main

# Pull das atualizações
git pull origin main

# Merge do branch de feature
echo "Fazendo merge de flavioalves/codex/2026-07-27/19-14-46/executar-melhorias-tecnicas-do-relatorio-a..."
git merge flavioalves/codex/2026-07-27/19-14-46/executar-melhorias-tecnicas-do-relatorio-a --no-edit

# Push do merge
git push origin main

# Delete do branch remotamente
echo "Deletando branch remoto..."
git push origin --delete flavioalves/codex/2026-07-27/19-14-46/executar-melhorias-tecnicas-do-relatorio-a

# Delete local (opcional)
git branch -d flavioalves/codex/2026-07-27/19-14-46/executar-melhorias-tecnicas-do-relatorio-a

echo "✅ Merge concluído! Apenas main permanece no repositório."
