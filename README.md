# 🤖 Agency Leo Services - Site Web Dynamique

Site web professionnel avec automatisation IA, formulaire de contact, avis clients dynamiques et chatbot intelligent.

![Agency Leo Services](./public/images/logo.png)

## ✨ Fonctionnalités

- ✅ **Formulaire de contact fonctionnel** avec envoi d'emails automatique
- ✅ **Catalogue de services dynamique** chargé depuis JSON
- ✅ **Système d'avis clients** avec rotation automatique
- ✅ **Chatbot IA intelligent** pour assistance 24/7
- ✅ **Design responsive** mobile-first
- ✅ **API REST sécurisée** avec rate limiting
- ✅ **Prêt pour production** avec PM2 et Nginx

## 🚀 Démarrage Rapide

### Prérequis
- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd agency-leo-dynamic
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration**
```bash
cp .env.example .env
nano .env
```

Configurez vos variables d'environnement:
- `EMAIL_USER`: Votre email Gmail
- `EMAIL_PASSWORD`: Mot de passe d'application Gmail
- `PORT`: Port du serveur (défaut: 3000)

4. **Lancer en développement**
```bash
npm run dev
```

5. **Accéder à l'application**
Ouvrez votre navigateur sur: http://localhost:3000

## 📁 Structure du Projet

```
agency-leo-dynamic/
├── server/
│   └── server.js              # Serveur Express principal
├── public/
│   ├── index.html             # Page HTML principale
│   ├── css/
│   │   └── style.css          # Styles CSS
│   ├── js/
│   │   └── main.js            # JavaScript client
│   └── images/                # Images et assets
├── data/
│   ├── avis.json              # Base de données des avis clients
│   ├── services.json          # Catalogue des services
│   └── contacts.json          # Historique des contacts (créé auto)
├── config/                    # Fichiers de configuration
├── package.json               # Dépendances npm
├── .env.example               # Template des variables d'environnement
├── ecosystem.config.js        # Configuration PM2 pour production
└── DEPLOY_AWS_EC2.md          # Guide de déploiement AWS
```

## 🎨 Personnalisation

### Modifier les avis clients
Éditez le fichier `data/avis.json`:

```json
{
  "avis": [
    {
      "id": 1,
      "rating": 5,
      "nom": "Votre Client",
      "poste": "Son poste",
      "entreprise": "Son entreprise",
      "texte": "Son témoignage...",
      "visible": true
    }
  ]
}
```

### Modifier les services
Éditez le fichier `data/services.json`:

```json
{
  "services": [
    {
      "id": 1,
      "titre": "Nom du service",
      "description": "Description...",
      "icon": "🤖",
      "prix": "À partir de 499€",
      "features": ["Feature 1", "Feature 2"],
      "categorie": "Catégorie",
      "populaire": true
    }
  ]
}
```

### Personnaliser les couleurs
Dans `public/css/style.css`, modifiez les variables CSS:

```css
:root {
    --primary-color: #00FF00;      /* Couleur principale */
    --secondary-color: #1a1a1a;    /* Couleur secondaire */
    --accent-color: #00CC00;       /* Couleur d'accent */
}
```

## 🔌 API Endpoints

### Avis Clients
- `GET /api/avis` - Liste tous les avis visibles
- `GET /api/avis/:id` - Récupère un avis spécifique
- `POST /api/avis` - Ajoute un nouvel avis

### Services
- `GET /api/services` - Liste tous les services
- `GET /api/services?categorie=X` - Filtre par catégorie
- `GET /api/services?populaire=true` - Services populaires uniquement
- `GET /api/services/:id` - Récupère un service spécifique

### Contact
- `POST /api/contact` - Envoi du formulaire de contact

### Chatbot
- `POST /api/chatbot` - Conversation avec le bot

### Health Check
- `GET /api/health` - Vérification de l'état du serveur

## 🌐 Déploiement

### Déploiement sur AWS EC2
Suivez le guide complet dans [`DEPLOY_AWS_EC2.md`](./DEPLOY_AWS_EC2.md)

### Déploiement rapide avec PM2
```bash
# Installation PM2
npm install -g pm2

# Démarrage
pm2 start ecosystem.config.js

# Monitoring
pm2 monit

# Logs
pm2 logs
```

## 🔒 Sécurité

- ✅ Rate limiting sur toutes les routes API
- ✅ Helmet.js pour les headers de sécurité
- ✅ Validation des entrées
- ✅ Protection CORS
- ✅ Variables d'environnement pour les secrets

## 🛠️ Technologies Utilisées

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Nodemailer** - Envoi d'emails
- **Helmet** - Sécurité HTTP
- **express-rate-limit** - Protection contre les abus

### Frontend
- **HTML5** - Structure
- **CSS3** - Styles modernes
- **JavaScript (ES6+)** - Logique client
- **Font Awesome** - Icônes
- **Google Fonts** - Typographie

### DevOps
- **PM2** - Gestionnaire de processus
- **Nginx** - Reverse proxy
- **Let's Encrypt** - Certificats SSL gratuits

## 📊 Monitoring

### Logs PM2
```bash
pm2 logs agency-leo-services
```

### Métriques
```bash
pm2 monit
```

### Logs Nginx
```bash
sudo tail -f /var/log/nginx/agency-leo-access.log
```

## 🐛 Débogage

### Problèmes courants

**L'application ne démarre pas**
```bash
# Vérifier les dépendances
npm install

# Vérifier le fichier .env
cat .env

# Tester manuellement
npm start
```

**Les emails ne s'envoient pas**
- Vérifiez vos credentials Gmail dans `.env`
- Créez un mot de passe d'application: https://myaccount.google.com/apppasswords
- Vérifiez que la validation en 2 étapes est activée

**Erreur de connexion API**
```bash
# Vérifier que le serveur tourne
curl http://localhost:3000/api/health
```

## 📈 Améliorations Futures

- [ ] Intégration d'un vrai chatbot IA (OpenAI/Claude)
- [ ] Dashboard administrateur
- [ ] Base de données MongoDB
- [ ] Système de réservation en ligne
- [ ] Authentification utilisateur
- [ ] Analytics et suivi des conversions
- [ ] Tests automatisés
- [ ] CI/CD avec GitHub Actions

## 📝 Licence

© 2024 Agency Leo Services. Tous droits réservés.

## 👨‍💻 Support

Pour toute question ou support:
- 📧 Email: contact@agencyleo.com
- 🌐 Site web: https://agencyleo.com

---

**Développé avec ❤️ par Agency Leo Services**
