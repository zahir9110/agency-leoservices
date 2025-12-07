# 🚀 Guide de Déploiement Rapide

## ✅ Votre Application est Prête !

Tous les fichiers nécessaires au déploiement sur AWS EC2 sont maintenant présents.

## 📁 Structure du Projet

```
agency-leoservices/
├── server/
│   └── server.js              ✅ Serveur Express complet
├── public/
│   ├── index.html             ✅ Page principale
│   ├── 404.html               ✅ Page d'erreur
│   ├── css/
│   │   └── style.css          ✅ Styles CSS
│   ├── js/
│   │   └── main.js            ✅ JavaScript client
│   └── images/                ✅ Dossier images
├── data/
│   ├── avis.json              ✅ Base de données des avis
│   └── services.json          ✅ Catalogue des services
├── logs/                      ✅ Dossier des logs PM2
├── .env.example               ✅ Template de configuration
├── .gitignore                 ✅ Fichiers à ignorer
├── package.json               ✅ Dépendances npm
├── ecosystem.config.js        ✅ Configuration PM2
├── install.sh                 ✅ Script d'installation
└── DEPLOY_AWS_EC2.md          ✅ Guide de déploiement détaillé
```

## 🎯 Prochaines Étapes

### 1. Test Local (Optionnel)

```bash
# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Éditez .env avec vos paramètres email

# Lancer en développement
npm run dev

# Accéder à l'application
# http://localhost:3000
```

### 2. Déploiement sur AWS EC2

Suivez le guide complet : **[DEPLOY_AWS_EC2.md](./DEPLOY_AWS_EC2.md)**

**Résumé rapide :**

1. **Créer une instance EC2** (Ubuntu 22.04, t2.small minimum)
2. **Configurer les ports** (22, 80, 443, 3000)
3. **Se connecter via SSH**
4. **Installer les dépendances** :
   ```bash
   sudo apt update && sudo apt upgrade -y
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs nginx git
   sudo npm install -g pm2
   ```

5. **Cloner le projet** :
   ```bash
   git clone https://github.com/zahir9110/agency-leoservices.git
   cd agency-leoservices
   ```

6. **Installer et configurer** :
   ```bash
   npm install --production
   cp .env.example .env
   nano .env  # Éditer avec vos paramètres
   ```

7. **Démarrer avec PM2** :
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

8. **Configurer Nginx** (voir DEPLOY_AWS_EC2.md section 6)

9. **Configurer SSL** (voir DEPLOY_AWS_EC2.md section 7)

## 🔐 Configuration Email (Important)

Pour que le formulaire de contact fonctionne, configurez Gmail :

1. Allez sur https://myaccount.google.com/security
2. Activez la validation en deux étapes
3. Allez dans "Mots de passe d'application"
4. Générez un mot de passe pour "Agency Leo Services"
5. Ajoutez-le dans votre fichier .env :
   ```
   EMAIL_USER=votre-email@gmail.com
   EMAIL_PASSWORD=votre-mot-de-passe-application
   ```

## 🧪 Tests de Fonctionnement

Une fois déployé, testez :

- ✅ Page d'accueil : `http://votre-ip/`
- ✅ API Santé : `http://votre-ip/api/health`
- ✅ Services : `http://votre-ip/api/services`
- ✅ Avis : `http://votre-ip/api/avis`
- ✅ Formulaire de contact
- ✅ Chatbot

## 📊 Commandes Utiles

```bash
# Voir les logs
pm2 logs agency-leo-services

# Redémarrer l'application
pm2 restart agency-leo-services

# Voir le statut
pm2 status

# Monitoring
pm2 monit
```

## 🆘 Problèmes Courants

### Le serveur ne démarre pas
```bash
pm2 logs  # Voir les erreurs
cat .env  # Vérifier la configuration
```

### Erreur 502 Bad Gateway
```bash
pm2 status  # Vérifier que l'app tourne
sudo nginx -t  # Tester la config Nginx
sudo systemctl restart nginx
```

### Emails ne s'envoient pas
- Vérifiez vos credentials Gmail dans .env
- Vérifiez que la validation 2 étapes est activée
- Utilisez bien un "Mot de passe d'application"

## 🎉 Félicitations !

Votre application Agency Leo Services est prête à être déployée sur AWS EC2 !

Pour toute question, consultez [DEPLOY_AWS_EC2.md](./DEPLOY_AWS_EC2.md) pour le guide détaillé.
