# 🚀 GUIDE DE DÉPLOIEMENT RAPIDE
## Agency Leo Services - Mise en Ligne

---

## 📋 Prérequis

- [ ] Nom de domaine configuré (ex: agency-leoservices.ca)
- [ ] Hébergement web choisi (Netlify, Vercel, ou hébergeur classique)
- [ ] Accès FTP ou GitHub (selon méthode de déploiement)
- [ ] Email professionnel configuré

---

## 🎯 Méthode 1 : Déploiement Netlify (RECOMMANDÉ)

### Pourquoi Netlify ?
✅ Gratuit pour les petits sites
✅ HTTPS automatique
✅ Déploiement en 2 minutes
✅ CDN mondial inclus
✅ Mises à jour simples

### Étapes

#### 1. Créer un compte Netlify
- Aller sur [netlify.com](https://netlify.com)
- S'inscrire gratuitement avec GitHub ou email

#### 2. Préparer le fichier
```bash
# Renommer le fichier
agency-leoservices.html → index.html
```

#### 3. Déployer
**Option A : Drag & Drop**
1. Se connecter à Netlify
2. Cliquer sur "Add new site" → "Deploy manually"
3. Glisser-déposer le fichier `index.html`
4. Attendre 30 secondes → Site en ligne !

**Option B : Via GitHub** (pour mises à jour automatiques)
1. Créer un repository GitHub
2. Pousser le fichier `index.html`
3. Dans Netlify : "Add new site" → "Import from Git"
4. Sélectionner le repository
5. Deploy !

#### 4. Configurer le Domaine
1. Dans Netlify : "Domain settings"
2. Cliquer "Add custom domain"
3. Entrer votre domaine : `agency-leoservices.ca`
4. Suivre les instructions DNS

#### 5. Activer HTTPS
- Automatique dans Netlify
- Attendre 1-2 minutes pour le certificat SSL

**✅ TERMINÉ ! Votre site est en ligne.**

---

## 🎯 Méthode 2 : Déploiement Vercel

### Pourquoi Vercel ?
✅ Gratuit et rapide
✅ Performance optimale
✅ Déploiement Git intégré
✅ Analytics inclus

### Étapes

1. **Créer un compte** sur [vercel.com](https://vercel.com)
2. **Installer Vercel CLI** (optionnel)
   ```bash
   npm i -g vercel
   ```
3. **Déployer**
   - Via interface web : Drag & drop `index.html`
   - Via CLI :
     ```bash
     cd dossier-du-site
     vercel
     ```
4. **Configurer le domaine** dans les paramètres
5. **✅ En ligne !**

---

## 🎯 Méthode 3 : Hébergement Classique (cPanel, FTP)

### Pour qui ?
- Hébergement existant (OVH, Hostinger, etc.)
- Contrôle total du serveur
- Intégration avec autres services

### Étapes

#### 1. Préparer le fichier
```bash
# Renommer
agency-leoservices.html → index.html
```

#### 2. Se connecter en FTP
- Utiliser FileZilla ou le gestionnaire de fichiers cPanel
- Identifiants fournis par l'hébergeur

#### 3. Upload
1. Se connecter au serveur
2. Naviguer vers `/public_html/` ou `/www/`
3. Uploader `index.html`
4. Vérifier les permissions (644 recommandé)

#### 4. Configurer le Domaine
- Pointer le domaine vers le serveur
- Configuration DNS chez le registrar
- Attendre propagation (24-48h max)

#### 5. HTTPS (SSL)
- Activer dans cPanel ou via Let's Encrypt
- Installer certificat SSL gratuit

**✅ Site accessible !**

---

## 🎯 Méthode 4 : GitHub Pages (Gratuit)

### Avantages
✅ 100% gratuit
✅ Hébergé par GitHub
✅ Version control intégré
✅ Simple à mettre à jour

### Étapes

1. **Créer un repository GitHub**
   ```bash
   nom: agency-leoservices
   ```

2. **Uploader le fichier**
   - Renommer en `index.html`
   - Commit et push

3. **Activer GitHub Pages**
   - Settings → Pages
   - Source : main branch
   - Save

4. **Accéder au site**
   ```
   https://votre-username.github.io/agency-leoservices/
   ```

5. **Domaine personnalisé** (optionnel)
   - Dans Settings → Pages
   - Ajouter custom domain
   - Configurer DNS

---

## 📧 Configuration Email Professionnel

### Option 1 : Google Workspace (Recommandé)

**Avantages :**
- Interface Gmail familière
- Synchronisation parfaite
- Stockage Drive inclus
- ~6€/mois par utilisateur

**Configuration :**
1. S'inscrire sur [workspace.google.com](https://workspace.google.com)
2. Ajouter le domaine `agency-leoservices.ca`
3. Configurer les enregistrements MX
4. Créer `contact@agency-leoservices.ca`

### Option 2 : Email avec Hébergeur

**Si déjà un hébergement web :**
1. Accéder au cPanel
2. Section "Email Accounts"
3. Créer `contact@agency-leoservices.ca`
4. Configurer dans client email (Outlook, Thunderbird)

---

## 🔧 Configuration DNS (Guide Général)

### Enregistrements DNS à Configurer

```
Type    Nom              Valeur                    TTL
----------------------------------------------------
A       @                [IP du serveur]           3600
CNAME   www              agency-leoservices.ca     3600
MX      @                [Serveur email]           3600
TXT     @                [Vérification domaine]    3600
```

### Où Configurer ?
- **OVH** : Manager → Domaines → Zone DNS
- **Namecheap** : Dashboard → Advanced DNS
- **GoDaddy** : DNS Management
- **Cloudflare** : DNS Settings

### Temps de Propagation
⏱️ 1-24 heures (généralement < 2h)

---

## 🔐 Sécurité et Optimisations

### SSL/HTTPS (Obligatoire)

**Netlify/Vercel :**
- ✅ Automatique

**Hébergement classique :**
```bash
# Via Let's Encrypt (gratuit)
certbot --apache -d agency-leoservices.ca
```

**cPanel :**
- AutoSSL activé par défaut
- Ou installer Let's Encrypt via interface

### Headers de Sécurité

Ajouter au fichier `.htaccess` (Apache) :

```apache
# Sécurité
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"

# Cache
<FilesMatch "\.(html|css|js)$">
    Header set Cache-Control "max-age=86400, public"
</FilesMatch>
```

### Performance

1. **Compression GZIP**
   ```apache
   # .htaccess
   <IfModule mod_deflate.c>
       AddOutputFilterByType DEFLATE text/html text/css text/javascript
   </IfModule>
   ```

2. **CDN** (optionnel)
   - Cloudflare gratuit
   - Cache automatique
   - Protection DDoS

---

## 📊 Analytics (Recommandé)

### Google Analytics

1. **Créer un compte** : [analytics.google.com](https://analytics.google.com)

2. **Obtenir le code de suivi** (GA4)

3. **Ajouter dans le site** avant `</head>` :
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### Événements à Tracker

```javascript
// CTA Principal
document.querySelector('.hero-cta').addEventListener('click', () => {
    gtag('event', 'cta_click', {
        'event_category': 'engagement',
        'event_label': 'hero_primary_cta'
    });
});

// Contact
document.querySelector('a[href*="contact@"]').addEventListener('click', () => {
    gtag('event', 'contact_click', {
        'event_category': 'conversion',
        'event_label': 'email_link'
    });
});
```

---

## ✅ Checklist Avant Mise en Ligne

### Contenu
- [ ] Email de contact vérifié (`contact@agency-leoservices.ca`)
- [ ] Liens réseaux sociaux mis à jour
- [ ] Textes relus (orthographe, grammaire)
- [ ] Informations de contact correctes

### Technique
- [ ] Fichier renommé en `index.html`
- [ ] Testé sur Chrome, Firefox, Safari
- [ ] Testé sur mobile et tablette
- [ ] Effet pixelisé fonctionne
- [ ] Widget luminosité opérationnel
- [ ] Smooth scroll fonctionne

### SEO
- [ ] Meta description présente
- [ ] Titre optimisé (< 60 caractères)
- [ ] URL propre et lisible
- [ ] Balises alt sur les icônes importantes

### Performance
- [ ] Temps de chargement < 2s
- [ ] Aucune erreur console
- [ ] Images optimisées (si ajoutées)
- [ ] CSS/JS inline (déjà fait ✅)

### Sécurité
- [ ] HTTPS activé
- [ ] Headers de sécurité configurés
- [ ] Backup du fichier effectué

---

## 🎯 Post-Lancement (Première Semaine)

### Jour 1
- [ ] Vérifier que le site est accessible
- [ ] Tester tous les liens
- [ ] Vérifier l'email de contact
- [ ] Partager sur réseaux sociaux

### Jour 2-3
- [ ] Installer Google Analytics
- [ ] Configurer Google Search Console
- [ ] Soumettre le sitemap

### Jour 4-7
- [ ] Surveiller les analytics
- [ ] Corriger bugs éventuels
- [ ] Collecter premiers retours
- [ ] Ajuster si nécessaire

---

## 📱 Réseaux Sociaux

### Profils à Créer/Mettre à Jour

1. **LinkedIn** (Prioritaire pour B2B)
   - Page entreprise
   - Lien vers site web
   - Posts réguliers

2. **Twitter/X**
   - Actualités et veille tech
   - Engagement communauté

3. **Facebook**
   - Page professionnelle
   - Témoignages clients

4. **Instagram**
   - Visuels et stories
   - Behind the scenes

### Contenu de Lancement

**Post type :**
```
🚀 Lancement officiel !

Découvrez notre nouveau site web Agency Leo Services

✨ Solutions d'automatisation IA
🤖 Chatbots intelligents
📧 Prospection automatisée
📊 Reporting en temps réel

👉 [LIEN DU SITE]

#AutomatisationIA #PME #Innovation #TechStartup
```

---

## 🔄 Maintenance et Mises à Jour

### Hebdomadaire
- Vérifier disponibilité du site
- Surveiller analytics
- Répondre aux emails

### Mensuel
- Mettre à jour contenu si besoin
- Analyser performances
- Optimiser SEO
- Backup du site

### Trimestriel
- Audit complet
- Mise à jour design si tendances
- Ajouter nouveaux témoignages
- Enrichir FAQ

---

## 🆘 Troubleshooting

### Site ne s'affiche pas
1. Vérifier DNS (propagation peut prendre 24h)
2. Vider cache navigateur (Ctrl+Shift+R)
3. Essayer en navigation privée
4. Vérifier fichier nommé `index.html`

### HTTPS ne fonctionne pas
1. Attendre 1-2h après activation
2. Forcer HTTPS dans paramètres hébergeur
3. Vérifier certificat SSL installé

### Email ne fonctionne pas
1. Vérifier configuration MX records
2. Attendre propagation DNS
3. Tester avec mail-tester.com
4. Contacter support hébergeur

### Effet pixelisé lent
1. Réduire nombre de particules (voir GUIDE-COMPLET.md)
2. Vérifier sur autre navigateur
3. Tester sur connexion rapide

---

## 📞 Support et Assistance

### Ressources
- **Documentation complète** : Voir GUIDE-COMPLET.md
- **Modifications** : Voir RECAP-MODIFICATIONS.md
- **Community** : Forums des hébergeurs

### Contacts Utiles
- **Support technique** : contact@agency-leoservices.ca
- **Hébergeur** : [Support de votre hébergeur]
- **DNS** : [Support registrar domaine]

---

## 🎉 Félicitations !

Votre site **Agency Leo Services** est maintenant **EN LIGNE** ! 🚀

**Prochaines étapes :**
1. Partager le lien
2. Surveiller les analytics
3. Collecter les retours
4. Optimiser continuellement

**Votre site professionnel avec effet pixelisé unique est prêt à convertir vos visiteurs en clients !**

---

*Guide créé le 6 novembre 2025*
*Agency Leo Services - Solutions d'Automatisation IA*
*Bonne chance avec votre lancement ! 🚀*
