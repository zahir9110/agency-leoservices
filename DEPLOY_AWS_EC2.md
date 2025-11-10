# 🚀 Guide de Déploiement sur AWS EC2

## 📋 Prérequis

- Un compte AWS actif
- Une clé SSH pour se connecter à l'instance
- Nom de domaine (optionnel mais recommandé)
- Compte email (Gmail recommandé) pour les notifications

---

## 🎯 ÉTAPE 1: Créer une Instance EC2

### 1.1 Connexion à AWS Console
1. Allez sur https://console.aws.amazon.com
2. Naviguez vers **EC2** > **Instances** > **Launch Instance**

### 1.2 Configuration de l'instance
- **Nom**: `agency-leo-services-prod`
- **AMI**: Ubuntu Server 22.04 LTS (Free tier eligible)
- **Type d'instance**: t2.small ou t2.medium (recommandé pour production)
- **Paire de clés**: Créez une nouvelle clé SSH ou utilisez une existante
- **Stockage**: 20 GB gp3 (minimum)

### 1.3 Configuration réseau
Dans **Paramètres réseau**, configurez les règles de groupe de sécurité:

| Type | Protocol | Port | Source | Description |
|------|----------|------|--------|-------------|
| SSH | TCP | 22 | Mon IP | Accès SSH |
| HTTP | TCP | 80 | 0.0.0.0/0 | Trafic web |
| HTTPS | TCP | 443 | 0.0.0.0/0 | Trafic web sécurisé |
| Custom TCP | TCP | 3000 | 0.0.0.0/0 | Application Node.js (temporaire) |

### 1.4 Lancer l'instance
- Cliquez sur **Launch Instance**
- Notez l'**IP publique** de votre instance

---

## 🔌 ÉTAPE 2: Connexion à l'Instance

### 2.1 Via Terminal (Mac/Linux)
```bash
chmod 400 votre-cle.pem
ssh -i votre-cle.pem ubuntu@VOTRE_IP_PUBLIQUE
```

### 2.2 Via PuTTY (Windows)
1. Convertir la clé .pem en .ppk avec PuTTYgen
2. Configurer la session avec l'IP publique
3. Charger la clé .ppk dans SSH > Auth

---

## ⚙️ ÉTAPE 3: Installation des Dépendances

### 3.1 Mise à jour du système
```bash
sudo apt update && sudo apt upgrade -y
```

### 3.2 Installation de Node.js et npm
```bash
# Installation de Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérification
node -v
npm -v
```

### 3.3 Installation de Git
```bash
sudo apt install git -y
git --version
```

### 3.4 Installation de Nginx (serveur web)
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 3.5 Installation de PM2 (gestionnaire de processus)
```bash
sudo npm install -g pm2
```

---

## 📦 ÉTAPE 4: Déploiement de l'Application

### 4.1 Transfert des fichiers
Option A - Via SCP (recommandé):
```bash
# Depuis votre ordinateur local
scp -i votre-cle.pem -r /chemin/vers/agency-leo-dynamic ubuntu@VOTRE_IP:/home/ubuntu/
```

Option B - Via Git:
```bash
# Sur le serveur EC2
cd /home/ubuntu
git clone VOTRE_REPO_GIT
cd agency-leo-dynamic
```

### 4.2 Installation des dépendances Node.js
```bash
cd /home/ubuntu/agency-leo-dynamic
npm install --production
```

### 4.3 Configuration des variables d'environnement
```bash
# Copier le fichier exemple
cp .env.example .env

# Éditer le fichier
nano .env
```

Configurez les variables suivantes:
```env
PORT=3000
NODE_ENV=production

# Email (utiliser Gmail avec mot de passe d'application)
EMAIL_SERVICE=gmail
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-app
NOTIFICATION_EMAIL=contact@agencyleo.com

# Domaine
DOMAIN=https://votre-domaine.com
```

Pour Gmail, créez un "Mot de passe d'application":
1. Allez sur https://myaccount.google.com/security
2. Activez la validation en deux étapes
3. Générez un mot de passe d'application

### 4.4 Test de l'application
```bash
# Test rapide
npm start

# L'application devrait démarrer sur le port 3000
# Testez dans votre navigateur: http://VOTRE_IP:3000
```

Appuyez sur `Ctrl+C` pour arrêter le test.

---

## 🔄 ÉTAPE 5: Configuration PM2

### 5.1 Créer le fichier de configuration PM2
```bash
nano ecosystem.config.js
```

Contenu:
```javascript
module.exports = {
  apps: [{
    name: 'agency-leo-services',
    script: './server/server.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};
```

### 5.2 Créer le dossier de logs
```bash
mkdir -p logs
```

### 5.3 Démarrer l'application avec PM2
```bash
pm2 start ecosystem.config.js

# Vérifier le statut
pm2 status

# Voir les logs
pm2 logs

# Configurer PM2 pour démarrer au boot
pm2 startup
pm2 save
```

---

## 🌐 ÉTAPE 6: Configuration Nginx

### 6.1 Créer la configuration Nginx
```bash
sudo nano /etc/nginx/sites-available/agency-leo
```

Contenu:
```nginx
server {
    listen 80;
    server_name votre-domaine.com www.votre-domaine.com;

    # Logs
    access_log /var/log/nginx/agency-leo-access.log;
    error_log /var/log/nginx/agency-leo-error.log;

    # Proxy vers Node.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Fichiers statiques
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### 6.2 Activer la configuration
```bash
# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/agency-leo /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx
```

---

## 🔒 ÉTAPE 7: Configuration HTTPS avec Let's Encrypt

### 7.1 Installation de Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 7.2 Obtention du certificat SSL
```bash
# Remplacez par votre vrai domaine
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com

# Suivez les instructions
# - Entrez votre email
# - Acceptez les conditions
# - Choisissez de rediriger HTTP vers HTTPS
```

### 7.3 Renouvellement automatique
```bash
# Tester le renouvellement
sudo certbot renew --dry-run

# Le renouvellement automatique est configuré via cron
sudo systemctl status certbot.timer
```

---

## 🗄️ ÉTAPE 8: Configuration de la Base de Données (Optionnel)

### 8.1 Installation de MongoDB (si besoin)
```bash
# Import de la clé GPG
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Ajout du repo
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] \
https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Installation
sudo apt-get update
sudo apt-get install -y mongodb-org

# Démarrage
sudo systemctl start mongod
sudo systemctl enable mongod
```

---

## 📊 ÉTAPE 9: Monitoring et Maintenance

### 9.1 Commandes PM2 utiles
```bash
# Voir les logs en temps réel
pm2 logs agency-leo-services

# Redémarrer l'application
pm2 restart agency-leo-services

# Recharger sans downtime
pm2 reload agency-leo-services

# Voir les métriques
pm2 monit

# Sauvegarder la configuration
pm2 save
```

### 9.2 Voir les logs Nginx
```bash
# Logs d'accès
sudo tail -f /var/log/nginx/agency-leo-access.log

# Logs d'erreur
sudo tail -f /var/log/nginx/agency-leo-error.log
```

### 9.3 Monitoring système
```bash
# Utilisation CPU/RAM
htop

# Espace disque
df -h

# Processus Node.js
ps aux | grep node
```

---

## 🔄 ÉTAPE 10: Déploiement des Mises à Jour

### 10.1 Script de déploiement automatique
Créez un script `deploy.sh`:
```bash
#!/bin/bash
echo "🚀 Déploiement de Agency Leo Services..."

# Aller dans le dossier
cd /home/ubuntu/agency-leo-dynamic

# Sauvegarder l'ancien code
echo "📦 Sauvegarde..."
cp -r . ../backup-$(date +%Y%m%d-%H%M%S)

# Récupérer les nouvelles modifications
echo "📥 Récupération du code..."
git pull origin main

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install --production

# Redémarrer l'application
echo "🔄 Redémarrage..."
pm2 reload ecosystem.config.js

echo "✅ Déploiement terminé!"
pm2 status
```

Rendre exécutable:
```bash
chmod +x deploy.sh
```

Utilisation:
```bash
./deploy.sh
```

---

## 🛡️ ÉTAPE 11: Sécurité

### 11.1 Configurer le Firewall
```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

### 11.2 Désactiver l'accès direct au port 3000
Dans le groupe de sécurité AWS, supprimez la règle autorisant le port 3000.

### 11.3 Mettre à jour régulièrement
```bash
# Automatiser les mises à jour de sécurité
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

## 📝 ÉTAPE 12: Configuration DNS

### 12.1 Pointer votre domaine vers l'IP EC2
Dans votre registrar de domaine (OVH, Namecheap, etc.):

1. Créez un enregistrement A:
   - **Type**: A
   - **Nom**: @ (ou vide)
   - **Valeur**: VOTRE_IP_PUBLIQUE_EC2
   - **TTL**: 3600

2. Créez un enregistrement A pour www:
   - **Type**: A
   - **Nom**: www
   - **Valeur**: VOTRE_IP_PUBLIQUE_EC2
   - **TTL**: 3600

Attendez 5-30 minutes pour la propagation DNS.

---

## ✅ Vérification Finale

### Checklist de déploiement:
- [ ] Application accessible via http://votre-domaine.com
- [ ] Redirection HTTPS fonctionne
- [ ] Certificat SSL valide (cadenas vert)
- [ ] Formulaire de contact envoie des emails
- [ ] Services chargés dynamiquement
- [ ] Avis clients affichés
- [ ] Chatbot fonctionnel
- [ ] PM2 redémarre automatiquement
- [ ] Logs accessibles et surveillés

---

## 🆘 Dépannage

### L'application ne démarre pas
```bash
# Vérifier les logs PM2
pm2 logs

# Vérifier le fichier .env
cat .env

# Tester manuellement
cd /home/ubuntu/agency-leo-dynamic
npm start
```

### Erreur 502 Bad Gateway
```bash
# Vérifier que l'app tourne
pm2 status

# Vérifier Nginx
sudo nginx -t
sudo systemctl restart nginx

# Vérifier les logs
sudo tail -f /var/log/nginx/error.log
```

### Emails ne s'envoient pas
```bash
# Vérifier les credentials dans .env
nano .env

# Tester l'envoi d'email manuellement
# Créer un script de test test-email.js
```

---

## 📞 Support

En cas de problème:
1. Vérifiez les logs: `pm2 logs`
2. Consultez la documentation AWS EC2
3. Vérifiez les groupes de sécurité AWS
4. Testez la connexion: `curl http://localhost:3000`

---

## 🎉 Félicitations!

Votre site Agency Leo Services est maintenant en production sur AWS EC2!

**URL de production**: https://votre-domaine.com
