# 🚀 Guide de Déploiement sur VOTRE Instance EC2

## 📋 Informations de Votre Instance

- **Instance ID**: `i-06689a91e2ce1f5a2`
- **IP Publique**: `54.226.53.197`
- **Email**: agency-leoservices@zohomailcloud.ca (Zoho Mail)

---

## 🎯 Déploiement Rapide en 10 Minutes

### ÉTAPE 1: Connexion à votre EC2

```bash
# Remplacez 'votre-cle.pem' par le chemin vers votre clé SSH
chmod 400 votre-cle.pem
ssh -i votre-cle.pem ubuntu@54.226.53.197
```

### ÉTAPE 2: Installation des Dépendances (Premier déploiement uniquement)

```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation de Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installation de Git
sudo apt install git -y

# Installation de Nginx
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

# Installation de PM2
sudo npm install -g pm2

# Vérification des installations
node -v && npm -v && git --version && pm2 -v
```

### ÉTAPE 3: Clonage du Projet

```bash
# Aller dans le dossier home
cd /home/ubuntu

# Cloner le repository
git clone https://github.com/zahir9110/agency-leoservices.git
cd agency-leoservices

# Installer les dépendances
npm install --production
```

### ÉTAPE 4: Configuration de l'Application

```bash
# Copier le fichier d'environnement
cp .env.example .env

# Éditer le fichier .env
nano .env
```

**Le fichier .env est déjà pré-configuré avec vos identifiants Zoho !**

Vérifiez que ces lignes sont présentes :

```env
PORT=3000
NODE_ENV=production

EMAIL_SERVICE=Zoho
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=agency-leoservices@zohomailcloud.ca
EMAIL_PASSWORD=2014@infinit9Kid$
NOTIFICATION_EMAIL=agency-leoservices@zohomailcloud.ca

DOMAIN=http://54.226.53.197
EC2_INSTANCE_ID=i-06689a91e2ce1f5a2
EC2_PUBLIC_IP=54.226.53.197
```

Sauvegardez avec `CTRL+X`, puis `Y`, puis `Enter`.

### ÉTAPE 5: Démarrage avec PM2

```bash
# Créer le dossier de logs
mkdir -p logs

# Démarrer l'application
pm2 start ecosystem.config.js

# Sauvegarder la configuration PM2
pm2 save

# Configurer PM2 pour démarrer au boot
pm2 startup
# Copiez et exécutez la commande affichée

# Vérifier que tout fonctionne
pm2 status
pm2 logs
```

### ÉTAPE 6: Configuration de Nginx

```bash
# Créer la configuration Nginx
sudo nano /etc/nginx/sites-available/agency-leo
```

Collez cette configuration :

```nginx
server {
    listen 80;
    server_name 54.226.53.197;

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

Sauvegardez avec `CTRL+X`, puis `Y`, puis `Enter`.

```bash
# Activer la configuration
sudo ln -s /etc/nginx/sites-available/agency-leo /etc/nginx/sites-enabled/

# Tester la configuration Nginx
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx

# Vérifier le statut
sudo systemctl status nginx
```

### ÉTAPE 7: Configuration du Firewall

```bash
# Configurer UFW
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

### ÉTAPE 8: Vérification Finale

Ouvrez votre navigateur et testez :

✅ **Site web** : http://54.226.53.197
✅ **API Santé** : http://54.226.53.197/api/health
✅ **Services** : http://54.226.53.197/api/services
✅ **Avis** : http://54.226.53.197/api/avis

Testez le formulaire de contact - vous devriez recevoir un email sur agency-leoservices@zohomailcloud.ca !

---

## 🔄 Mise à Jour de l'Application

Pour déployer les nouvelles modifications :

```bash
# Aller dans le dossier du projet
cd /home/ubuntu/agency-leoservices

# Récupérer les dernières modifications
git pull origin main

# Installer les nouvelles dépendances si nécessaire
npm install --production

# Redémarrer l'application
pm2 reload ecosystem.config.js

# Vérifier le statut
pm2 status
pm2 logs
```

---

## 📊 Commandes Utiles

### PM2
```bash
# Voir les logs en temps réel
pm2 logs agency-leo-services

# Voir les logs d'erreur uniquement
pm2 logs agency-leo-services --err

# Redémarrer l'application
pm2 restart agency-leo-services

# Recharger sans downtime
pm2 reload agency-leo-services

# Voir les métriques
pm2 monit

# Voir le statut
pm2 status
```

### Nginx
```bash
# Voir les logs d'accès
sudo tail -f /var/log/nginx/agency-leo-access.log

# Voir les logs d'erreur
sudo tail -f /var/log/nginx/agency-leo-error.log

# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx

# Voir le statut
sudo systemctl status nginx
```

### Système
```bash
# Utilisation CPU/RAM
htop

# Espace disque
df -h

# Processus Node.js
ps aux | grep node
```

---

## 🆘 Dépannage

### L'application ne démarre pas

```bash
# Vérifier les logs PM2
pm2 logs agency-leo-services

# Vérifier le fichier .env
cat .env

# Tester manuellement
cd /home/ubuntu/agency-leoservices
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
pm2 logs
```

### Les emails ne s'envoient pas

1. Vérifiez que vos identifiants Zoho sont corrects dans `.env`
2. Vérifiez les logs PM2 : `pm2 logs agency-leo-services --err`
3. Testez la connexion SMTP :
```bash
curl -v telnet://smtp.zoho.com:465
```

### Port 3000 déjà utilisé

```bash
# Trouver le processus
sudo lsof -i :3000

# Tuer le processus
sudo kill -9 PID_DU_PROCESSUS

# Redémarrer l'application
pm2 restart agency-leo-services
```

---

## 🔒 Prochaines Étapes (Optionnel)

### 1. Ajouter un Nom de Domaine

Si vous avez un nom de domaine (ex: agencyleo.com) :

1. Dans votre registrar DNS, créez un enregistrement A pointant vers `54.226.53.197`
2. Modifiez la configuration Nginx :
```bash
sudo nano /etc/nginx/sites-available/agency-leo
# Changez: server_name 54.226.53.197;
# Par: server_name votredomaine.com www.votredomaine.com;
```
3. Redémarrez Nginx : `sudo systemctl restart nginx`

### 2. Installer un Certificat SSL (HTTPS)

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtenir le certificat (remplacez par votre domaine)
sudo certbot --nginx -d votredomaine.com -d www.votredomaine.com

# Tester le renouvellement automatique
sudo certbot renew --dry-run
```

### 3. Configurer les Sauvegardes Automatiques

```bash
# Créer un script de sauvegarde
nano /home/ubuntu/backup.sh
```

Contenu :
```bash
#!/bin/bash
BACKUP_DIR="/home/ubuntu/backups"
mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/agency-leo-$(date +%Y%m%d-%H%M%S).tar.gz \
  /home/ubuntu/agency-leoservices \
  --exclude=node_modules \
  --exclude=logs

# Garder seulement les 7 dernières sauvegardes
ls -t $BACKUP_DIR/*.tar.gz | tail -n +8 | xargs rm -f
```

Rendre exécutable et ajouter au cron :
```bash
chmod +x /home/ubuntu/backup.sh
crontab -e
# Ajouter : 0 2 * * * /home/ubuntu/backup.sh
```

---

## 🎉 Félicitations !

Votre site **Agency Leo Services** est maintenant en ligne sur :

**🌐 http://54.226.53.197**

Pour toute question ou problème, consultez les logs ou le guide complet [DEPLOY_AWS_EC2.md](./DEPLOY_AWS_EC2.md).
