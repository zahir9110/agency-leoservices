# 🚀 Démarrage Rapide - Agency Leo Services

## ⚡ Installation en 3 minutes

### 1️⃣ Installation automatique (recommandé)

```bash
chmod +x install.sh
./install.sh
```

### 2️⃣ Configuration Email

Éditez le fichier `.env`:
```bash
nano .env
```

Configurez ces variables:
```env
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-app
NOTIFICATION_EMAIL=contact@agencyleo.com
```

**Pour Gmail:**
1. Allez sur https://myaccount.google.com/security
2. Activez la "Validation en deux étapes"
3. Créez un "Mot de passe d'application" sur https://myaccount.google.com/apppasswords
4. Utilisez ce mot de passe dans EMAIL_PASSWORD

### 3️⃣ Lancement

**Développement** (avec rechargement automatique):
```bash
npm run dev
```

**Production**:
```bash
npm start
```

### 4️⃣ Accès

Ouvrez votre navigateur sur: **http://localhost:3000**

---

## 📦 Installation Manuelle

Si le script d'installation ne fonctionne pas:

```bash
# 1. Installer les dépendances
npm install

# 2. Copier le fichier de configuration
cp .env.example .env

# 3. Éditer la configuration
nano .env

# 4. Créer le dossier logs
mkdir -p logs

# 5. Lancer l'application
npm start
```

---

## ✅ Vérification

Testez les fonctionnalités:

1. **Page d'accueil**: http://localhost:3000
2. **API Health**: http://localhost:3000/api/health
3. **Services**: http://localhost:3000/api/services
4. **Avis**: http://localhost:3000/api/avis

---

## 🔧 Personnalisation Rapide

### Modifier les avis clients
```bash
nano data/avis.json
```

### Modifier les services
```bash
nano data/services.json
```

### Modifier les couleurs
```bash
nano public/css/style.css
# Cherchez :root et modifiez les variables CSS
```

---

## 🌐 Déploiement sur AWS EC2

Pour déployer en production, suivez le guide détaillé:
```bash
cat DEPLOY_AWS_EC2.md
```

Ou en ligne: [Guide de déploiement AWS EC2](./DEPLOY_AWS_EC2.md)

---

## 🆘 Problèmes Courants

### L'application ne démarre pas
```bash
# Vérifier Node.js
node -v
npm -v

# Réinstaller les dépendances
rm -rf node_modules
npm install
```

### Erreur de port déjà utilisé
```bash
# Changer le port dans .env
PORT=3001
```

### Les emails ne partent pas
- Vérifiez EMAIL_USER et EMAIL_PASSWORD dans .env
- Créez un mot de passe d'application Gmail
- Testez avec un autre service email si besoin

---

## 📞 Support

- 📖 Documentation complète: [README.md](./README.md)
- 🚀 Guide AWS: [DEPLOY_AWS_EC2.md](./DEPLOY_AWS_EC2.md)
- 📧 Email: contact@agencyleo.com

---

**Bon développement! 🎉**
