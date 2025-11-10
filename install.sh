#!/bin/bash

# Script d'installation rapide pour Agency Leo Services
# Usage: ./install.sh

echo "🤖 Installation de Agency Leo Services..."
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé!"
    echo "Installez Node.js depuis: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Installation des dépendances
echo "📦 Installation des dépendances npm..."
npm install

# Vérifier si .env existe
if [ ! -f .env ]; then
    echo ""
    echo "⚙️  Configuration de l'environnement..."
    cp .env.example .env
    echo "✅ Fichier .env créé!"
    echo "⚠️  IMPORTANT: Éditez le fichier .env avec vos paramètres:"
    echo "   - EMAIL_USER (votre email Gmail)"
    echo "   - EMAIL_PASSWORD (mot de passe d'application Gmail)"
    echo "   - NOTIFICATION_EMAIL (email de réception)"
    echo ""
fi

# Créer le dossier logs
mkdir -p logs
echo "✅ Dossier logs créé"

echo ""
echo "✅ Installation terminée!"
echo ""
echo "📝 Prochaines étapes:"
echo "1. Éditez le fichier .env avec vos paramètres"
echo "2. Pour Gmail, créez un mot de passe d'application:"
echo "   https://myaccount.google.com/apppasswords"
echo "3. Lancez l'application:"
echo "   - Développement: npm run dev"
echo "   - Production: npm start"
echo ""
echo "🌐 L'application sera accessible sur http://localhost:3000"
echo ""
