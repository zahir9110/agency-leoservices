# 🚀 GUIDE DE DÉPLOIEMENT RAPIDE

## ⚡ Mise en Ligne en 10 Minutes

### 📋 Étape 1 : Préparez vos fichiers

Vous avez maintenant **8 fichiers** prêts à uploader :

```
✅ index.html                          (Site principal)
✅ mentions-legales.html               (Page légale)
✅ politique-confidentialite.html      (Page RGPD)
✅ logo.png                            (Votre logo)
✅ sitemap.xml                         (Pour Google)
✅ robots.txt                          (Pour les moteurs de recherche)
✅ README.md                           (Documentation)
✅ CONFIGURATION-GOOGLE-ANALYTICS.md   (Guide Analytics)
```

---

### 📋 Étape 2 : Uploadez sur votre serveur EC2

#### Option A : Via FileZilla (Le plus simple) 👍

1. **Téléchargez FileZilla** : https://filezilla-project.org/download.php?type=client

2. **Configurez la connexion** :
   ```
   Protocole : SFTP
   Hôte : 54.226.53.197
   Port : 22
   Utilisateur : ubuntu
   Mot de passe : (Laissez vide)
   Fichier de clé : [Sélectionnez votre fichier .pem]
   ```

3. **Connectez-vous** (cliquez sur "Connexion rapide")

4. **Naviguez vers le dossier web** sur le serveur (panneau de droite) :
   - `/var/www/html/` (Apache)
   - OU `/usr/share/nginx/html/` (Nginx)

5. **Glissez-déposez** tous les fichiers du panneau gauche vers le panneau droit

6. **C'est fait !** 🎉

#### Option B : Via Ligne de commande (Pour utilisateurs avancés)

```bash
# Depuis votre Mac/Linux, dans le dossier des fichiers :
cd /chemin/vers/automapros-site-complet/

# Uploadez tous les fichiers d'un coup :
scp -i votre-cle.pem *.html *.png *.xml *.txt ubuntu@54.226.53.197:/var/www/html/
```

---

### 📋 Étape 3 : Configurez Google Analytics (5 minutes)

1. **Allez sur** : https://analytics.google.com

2. **Créez un compte** et une propriété "AutomaPros"

3. **Récupérez votre ID** : `G-XXXXXXXXXX`

4. **Dans index.html**, trouvez la ligne (vers ligne 80) :
   ```javascript
   gtag('config', 'G-XXXXXXXXXX', {
   ```

5. **Remplacez** `G-XXXXXXXXXX` par votre vrai ID

6. **Sauvegardez** et **re-uploadez** `index.html`

**Détails complets** : Lisez `CONFIGURATION-GOOGLE-ANALYTICS.md`

---

### 📋 Étape 4 : Activez HTTPS (SSL) - 5 minutes

```bash
# Connectez-vous à votre serveur :
ssh -i votre-cle.pem ubuntu@54.226.53.197

# Installez Certbot :
sudo apt update
sudo apt install certbot python3-certbot-apache -y

# Obtenez votre certificat SSL GRATUIT :
sudo certbot --apache -d automapros.ca -d www.automapros.ca

# Suivez les instructions à l'écran
# Choisissez l'option 2 (Rediriger HTTP vers HTTPS)
```

**C'est tout !** Votre site est maintenant en HTTPS 🔒

---

### 📋 Étape 5 : Testez votre site

Visitez ces URLs et vérifiez qu'elles fonctionnent :

- ✅ https://automapros.ca
- ✅ https://www.automapros.ca
- ✅ https://automapros.ca/mentions-legales.html
- ✅ https://automapros.ca/politique-confidentialite.html

**Tests à faire** :
- [ ] Le logo s'affiche
- [ ] Toutes les sections sont présentes
- [ ] Le formulaire de contact fonctionne
- [ ] Le chatbot fonctionne
- [ ] Le site est responsive (testez sur mobile)
- [ ] Les pages légales s'ouvrent

---

## 🎯 CE QUI EST DÉJÀ FAIT

### ✅ Site Web
- Logo professionnel intégré
- 11 sections complètes (Hero, About, Services, Mission/Vision, Why Us, etc.)
- Design moderne Matrix (noir/vert néon)
- Responsive mobile/tablet/desktop
- Chatbot IA fonctionnel
- Formulaire de contact avec EmailJS
- Animations au scroll

### ✅ SEO Optimisé
- Meta tags complets (titre, description, keywords)
- Open Graph (Facebook/LinkedIn)
- Twitter Cards
- Schema.org markup
- Sitemap.xml
- Robots.txt
- Mots-clés locaux (Montréal, Québec)

### ✅ Pages Légales (RGPD)
- Mentions légales complètes
- Politique de confidentialité détaillée
- Conformité RGPD et lois canadiennes

### ✅ Analytics
- Code Google Analytics 4 intégré
- Événements personnalisés (clics, formulaire, chatbot)
- Guide de configuration complet

---

## ⚠️ À FAIRE APRÈS LA MISE EN LIGNE

### 📅 Cette Semaine

1. **Configurez Google Analytics** (5 min)
   - Suivez le guide : `CONFIGURATION-GOOGLE-ANALYTICS.md`

2. **Ajoutez une bannière cookies** (15 min)
   - Installez Cookiebot : https://www.cookiebot.com/fr/
   - OU Tarteaucitron.js (gratuit) : https://tarteaucitron.io/fr/

3. **Personnalisez les contenus** (30 min)
   - Vérifiez tous les textes
   - Ajoutez vos vrais témoignages clients si disponibles
   - Mettez à jour les prix/offres si nécessaire

### 📅 Ce Mois

4. **Créez vos comptes réseaux sociaux**
   - LinkedIn Company
   - Facebook Business
   - Instagram Business
   - Twitter

5. **Mettez à jour les liens** dans le footer

6. **Google Search Console**
   - Ajoutez votre site : https://search.google.com/search-console
   - Soumettez le sitemap.xml
   - Vérifiez l'indexation

7. **Google My Business**
   - Créez votre fiche : https://www.google.com/business/
   - Ajoutez photos, horaires, services
   - Améliorez votre SEO local

---

## 📊 MÉTRIQUES À SUIVRE

Après 1 mois, vous devriez viser :

| Métrique | Objectif |
|----------|----------|
| Visiteurs uniques | 200-500 |
| Pages vues | 800-2000 |
| Taux de rebond | < 65% |
| Durée moyenne | > 2 minutes |
| Formulaires remplis | 10-20 |
| Interactions chatbot | 30-50 |

---

## 🆘 PROBLÈMES COURANTS

### "Le site ne s'affiche pas"

**Solutions** :
1. Vérifiez que le serveur web est actif :
   ```bash
   sudo systemctl status apache2
   # OU
   sudo systemctl status nginx
   ```

2. Si arrêté, démarrez-le :
   ```bash
   sudo systemctl start apache2
   # OU
   sudo systemctl start nginx
   ```

### "Le logo ne s'affiche pas"

**Solutions** :
1. Vérifiez que `logo.png` est dans `/var/www/html/`
2. Vérifiez les permissions :
   ```bash
   sudo chmod 644 /var/www/html/logo.png
   ```

### "Erreur 404 sur les pages légales"

**Solutions** :
1. Vérifiez que les fichiers sont uploadés :
   ```bash
   ls -la /var/www/html/
   ```
2. Vérifiez les noms de fichiers (pas d'espaces)

### "Google Analytics ne fonctionne pas"

**Solutions** :
1. Attendez 24-48h pour les premières données
2. Testez en mode "Temps réel" sur Google Analytics
3. Vérifiez que votre ID G-XXXXXXXXXX est correct
4. Désactivez les bloqueurs de pub pour tester

---

## 📞 BESOIN D'AIDE ?

**Email** : contact@automapros.ca  
**Téléphone** : +1 (438) 334-0328

---

## 🎉 FÉLICITATIONS !

Votre site professionnel est prêt ! 🚀

**Prochaine étape** : Lancez votre première campagne marketing (Google Ads, Facebook Ads, LinkedIn) et suivez vos conversions avec Google Analytics !

**Bon succès avec Agency Leo Services ! 💪**

---

**Version** : 1.0 - Guide de Déploiement Rapide  
**Date** : Novembre 2025
