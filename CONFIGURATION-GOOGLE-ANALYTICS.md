# 📊 Configuration Google Analytics 4 - Agency Leo Services

## 📋 Guide Complet d'Installation

### ✅ ÉTAPE 1 : Créer un Compte Google Analytics

1. **Visitez** : [https://analytics.google.com](https://analytics.google.com)
2. **Connectez-vous** avec votre compte Google (@gmail.com ou Google Workspace)
3. **Cliquez** sur "Commencer la mesure" (ou "Start measuring")

---

### ✅ ÉTAPE 2 : Configurer votre Propriété

#### 2.1 Nom du Compte
- **Nom du compte** : `Agency Leo Services`
- Cochez les options de partage de données (recommandé)
- Cliquez sur **"Suivant"**

#### 2.2 Créer une Propriété
- **Nom de la propriété** : `AutomaPros - Site Web Principal`
- **Fuseau horaire** : `(GMT-05:00) Heure de l'Est - New York` ou `(GMT-05:00) Eastern Time`
- **Devise** : `Dollar canadien (CAD)` ou `Dollar américain (USD)`
- Cliquez sur **"Suivant"**

#### 2.3 Informations sur l'Entreprise
- **Secteur d'activité** : `Technologie` ou `Services aux entreprises`
- **Taille de l'entreprise** : `Petite (1-10 employés)`
- **Utilisation de Google Analytics** :
  - ✅ Mesurer les conversions
  - ✅ Analyser le comportement des utilisateurs
  - ✅ Examiner les données utilisateurs
- Cliquez sur **"Créer"**
- **Acceptez** les conditions d'utilisation

---

### ✅ ÉTAPE 3 : Configurer un Flux de Données Web

1. **Plateforme** : Sélectionnez **"Web"**
2. **URL du site web** : `https://automapros.ca`
3. **Nom du flux** : `Site Web AutomaPros`
4. Cliquez sur **"Créer un flux"**

---

### ✅ ÉTAPE 4 : Récupérer votre ID de Mesure

Une fois le flux créé, vous verrez :

```
ID de mesure : G-XXXXXXXXXX
```

**C'est cet ID que vous allez utiliser dans votre site web !**

Exemple : `G-12ABC34DEF`

---

### ✅ ÉTAPE 5 : Intégrer Google Analytics dans votre Site

#### Option A : Modification Manuelle (Recommandé)

1. **Ouvrez** le fichier `index.html`
2. **Cherchez** la ligne suivante (vers la ligne 70-80) :

```javascript
gtag('config', 'G-XXXXXXXXXX', {
```

3. **Remplacez** `G-XXXXXXXXXX` par votre vrai ID de mesure

**Exemple :**
```javascript
// AVANT
gtag('config', 'G-XXXXXXXXXX', {

// APRÈS
gtag('config', 'G-12ABC34DEF', {
```

4. **Sauvegardez** le fichier

#### Option B : Recherche et Remplacement

Si vous utilisez un éditeur de code (VS Code, Sublime Text, etc.) :

1. Ouvrez `index.html`
2. **Recherchez** : `G-XXXXXXXXXX` (2 occurrences)
3. **Remplacez par** : Votre ID réel (ex: `G-12ABC34DEF`)
4. **Sauvegardez**

---

### ✅ ÉTAPE 6 : Uploader votre Site sur EC2

1. **Connectez-vous à votre serveur EC2** via SSH :
```bash
ssh -i votre-cle.pem ubuntu@54.226.53.197
```

2. **Naviguez vers le répertoire web** :
```bash
cd /var/www/html
# ou
cd /home/ubuntu/site
```

3. **Uploadez les fichiers** depuis votre ordinateur :

**Option A - Via SCP (depuis votre ordinateur local)** :
```bash
scp -i votre-cle.pem index.html ubuntu@54.226.53.197:/var/www/html/
scp -i votre-cle.pem mentions-legales.html ubuntu@54.226.53.197:/var/www/html/
scp -i votre-cle.pem politique-confidentialite.html ubuntu@54.226.53.197:/var/www/html/
scp -i votre-cle.pem logo.png ubuntu@54.226.53.197:/var/www/html/
```

**Option B - Via SFTP (FileZilla, Cyberduck, etc.)** :
- **Host** : `54.226.53.197`
- **Username** : `ubuntu`
- **Port** : `22`
- **Key file** : Votre fichier .pem
- Glissez-déposez les fichiers

4. **Vérifiez les permissions** :
```bash
sudo chmod 644 /var/www/html/*.html
sudo chmod 644 /var/www/html/*.png
```

---

### ✅ ÉTAPE 7 : Tester l'Installation

#### 7.1 Test en Temps Réel

1. **Retournez sur Google Analytics**
2. Dans le menu de gauche : **Rapports** → **Temps réel** → **Aperçu**
3. **Ouvrez** votre site : `https://automapros.ca`
4. Vous devriez voir **1 utilisateur actif** dans Google Analytics (vous !)

#### 7.2 Vérification Console Développeur

1. Sur votre site, appuyez sur **F12** (ouvre la console)
2. Allez dans l'onglet **"Console"**
3. Recherchez les messages Google Analytics :
   - ✅ Bon signe : Pas d'erreurs rouges liées à `gtag`
   - ❌ Problème : Erreurs `gtag is not defined` ou `Failed to load`

#### 7.3 Extension Google Tag Assistant (Chrome)

1. **Installez** : [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Cliquez sur l'extension
3. Cliquez sur **"Enable"**
4. Rechargez votre site
5. L'extension devrait afficher :
   - ✅ **Google Analytics: GA4** - Tag fonctionnel (vert)

---

### ✅ ÉTAPE 8 : Configuration Avancée (Optionnel)

#### 8.1 Événements Personnalisés

Le code déjà intégré dans `index.html` suit automatiquement :
- **Clics sur les boutons CTA**
- **Soumissions de formulaire**
- **Interactions chatbot**
- **Scroll depth (profondeur de défilement)**

#### 8.2 Objectifs et Conversions

1. Dans Google Analytics : **Admin** → **Conversions**
2. Cliquez sur **"Créer un événement de conversion"**
3. Ajoutez les événements importants :
   - `form_submit` (soumission formulaire)
   - `cta_click` (clic sur CTA)
   - `chatbot_interaction` (interaction chatbot)

#### 8.3 Rapports Personnalisés

1. **Rapports** → **Bibliothèque**
2. Créez des rapports pour :
   - **Sources de trafic** : D'où viennent vos visiteurs
   - **Pages populaires** : Quelles pages sont les plus visitées
   - **Conversions** : Combien de formulaires remplis

---

### ✅ ÉTAPE 9 : Conformité RGPD

#### 9.1 Bannière Cookies (À Ajouter)

Votre site a besoin d'une bannière de consentement pour être conforme au RGPD.

**Solutions recommandées (gratuites)** :
1. **Cookiebot** - [https://www.cookiebot.com](https://www.cookiebot.com)
2. **Axeptio** - [https://www.axeptio.eu](https://www.axeptio.eu)
3. **Tarteaucitron.js** - [https://tarteaucitron.io](https://tarteaucitron.io) (Open Source)

#### 9.2 Anonymisation IP (Déjà Activée)

Google Analytics 4 anonymise automatiquement les adresses IP par défaut. ✅

---

## 🎯 Métriques Clés à Suivre

### Dashboard Recommandé

Créez un dashboard personnalisé pour suivre :

| Métrique | Objectif Mensuel |
|----------|------------------|
| **Visiteurs uniques** | 500+ |
| **Pages vues** | 2000+ |
| **Taux de rebond** | < 60% |
| **Durée moyenne session** | > 2 minutes |
| **Conversions (formulaires)** | 20+ |
| **Interactions chatbot** | 50+ |

---

## 📱 Rapports Hebdomadaires

Consultez chaque lundi :

1. **Vue d'ensemble** (7 derniers jours)
2. **Acquisitions** : Sources de trafic
3. **Engagement** : Pages populaires
4. **Conversions** : Objectifs atteints

---

## 🆘 Dépannage

### Problème : "Google Analytics ne détecte aucune donnée"

**Solutions :**
1. Vérifiez que vous avez remplacé `G-XXXXXXXXXX` par votre vrai ID
2. Attendez 24-48h pour voir les premières données (hors temps réel)
3. Désactivez les bloqueurs de pub (uBlock, AdBlock)
4. Testez en navigation privée

### Problème : "Erreur gtag is not defined"

**Solution :**
- Le script Google Analytics n'est pas chargé
- Vérifiez que le `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>` est présent dans le `<head>`

### Problème : "Les événements personnalisés ne s'enregistrent pas"

**Solution :**
1. Ouvrez la console (F12)
2. Recherchez les erreurs JavaScript
3. Vérifiez que les noms d'événements sont corrects dans le code

---

## 📚 Ressources Utiles

- **Documentation Google Analytics 4** : [https://support.google.com/analytics](https://support.google.com/analytics)
- **Académie Google Analytics** : [https://analytics.google.com/analytics/academy](https://analytics.google.com/analytics/academy)
- **Communauté Google Analytics** : [https://www.en.advertisercommunity.com/t5/Google-Analytics/ct-p/Google_Analytics](https://www.en.advertisercommunity.com/t5/Google-Analytics/ct-p/Google_Analytics)

---

## ✅ Checklist Finale

Avant de considérer la configuration terminée :

- [ ] Compte Google Analytics créé
- [ ] Propriété GA4 configurée
- [ ] ID de mesure récupéré (G-XXXXXXXXXX)
- [ ] ID remplacé dans index.html
- [ ] Fichiers uploadés sur EC2
- [ ] Test temps réel réussi (vous apparaissez dans les stats)
- [ ] Événements personnalisés fonctionnels
- [ ] Bannière cookies installée (RGPD)
- [ ] Dashboard personnalisé créé
- [ ] Objectifs de conversion définis

---

## 🎉 Félicitations !

Votre site **automapros.ca** est maintenant équipé de Google Analytics 4 !

Vous pouvez maintenant :
- ✅ Suivre vos visiteurs en temps réel
- ✅ Analyser les sources de trafic
- ✅ Mesurer l'efficacité de vos pages
- ✅ Optimiser votre stratégie marketing

**Prochaine étape** : Lancez une campagne Google Ads ou Facebook Ads et suivez vos conversions ! 🚀

---

**Support** : Si vous avez besoin d'aide, contactez-moi ou consultez la documentation Google Analytics.

**Version** : 1.0 - Novembre 2025
