#!/bin/bash

# Script de préparation pour déploiement Vercel
# KAWS CAR - Location de Voiture

echo "🚀 Préparation pour déploiement Vercel..."
echo ""

# Vérifier Node.js et Yarn
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

if ! command -v yarn &> /dev/null; then
    echo "❌ Yarn n'est pas installé"
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo "✅ Yarn: $(yarn --version)"
echo ""

# Build du frontend
echo "📦 Construction du frontend..."
cd frontend
yarn install --silent
yarn build

if [ $? -eq 0 ]; then
    echo "✅ Frontend construit avec succès!"
else
    echo "❌ Erreur lors de la construction du frontend"
    exit 1
fi

cd ..

# Vérifier les fichiers nécessaires
echo ""
echo "🔍 Vérification des fichiers..."

files_to_check=(
    "vercel.json"
    "backend/api/index.py"
    "backend/requirements-vercel.txt"
    "VERCEL_DEPLOYMENT.md"
    ".gitignore"
    ".vercelignore"
)

all_present=true
for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file manquant"
        all_present=false
    fi
done

if [ "$all_present" = false ]; then
    echo ""
    echo "❌ Certains fichiers sont manquants"
    exit 1
fi

echo ""
echo "✅ Tous les fichiers nécessaires sont présents!"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Créez un compte MongoDB Atlas (gratuit)"
echo "2. Obtenez votre URI de connexion MongoDB"
echo "3. Créez un compte Vercel"
echo "4. Déployez avec: vercel --prod"
echo "5. Configurez les variables d'environnement dans Vercel"
echo ""
echo "📖 Consultez VERCEL_DEPLOYMENT.md pour plus de détails"
echo ""
echo "🎉 Votre projet est prêt pour Vercel!"
