# 📧 Configuration Zoho Mail pour Agency Leo Services

## ⚠️ Important - Authentification Zoho Mail

Votre configuration email actuelle utilise Zoho Mail Cloud. Pour que l'envoi d'emails fonctionne, vous devez configurer l'authentification correctement.

## 🔐 Options d'Authentification

### Option 1: Mot de Passe d'Application (Recommandé)

Si votre compte Zoho a l'authentification à deux facteurs (2FA) activée :

1. **Connectez-vous à Zoho Mail** : https://mail.zoho.com
2. **Allez dans Paramètres** → **Sécurité**
3. **Créez un "Mot de passe d'application"** :
   - Nom : "Agency Leo Services"
   - Application : Autre
   - Copiez le mot de passe généré
4. **Mettez à jour votre `.env`** :
   ```env
   EMAIL_PASSWORD=le-mot-de-passe-genere
   ```

### Option 2: Autoriser les Clients Moins Sécurisés

Si vous n'avez PAS de 2FA activée :

1. **Connectez-vous à Zoho Mail** : https://mail.zoho.com
2. **Allez dans Paramètres** → **Sécurité**
3. **Activez "Autoriser les clients moins sécurisés"**
4. Utilisez votre mot de passe habituel dans `.env`

## 🧪 Tester la Configuration

Après avoir configuré l'authentification, testez :

```bash
# Dans le dossier du projet
node test-email.js
```

Si vous voyez :
- ✅ **"Connexion SMTP réussie !"** → Tout est bon !
- ❌ **"Authentication Failed"** → Vérifiez vos identifiants et suivez les étapes ci-dessus

## 📝 Configuration Actuelle

Vos paramètres Zoho Mail dans `.env` :

```env
EMAIL_SERVICE=Zoho
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=agency-leoservices@zohomailcloud.ca
EMAIL_PASSWORD=votre-mot-de-passe-ou-mot-de-passe-application
```

## 🔍 Vérification des Paramètres SMTP Zoho

Les paramètres SMTP corrects pour Zoho Mail :

| Paramètre | Valeur |
|-----------|--------|
| **Serveur SMTP** | smtp.zoho.com |
| **Port** | 465 (SSL) ou 587 (TLS) |
| **Sécurité** | SSL/TLS |
| **Authentification** | Oui |
| **Nom d'utilisateur** | Votre adresse email complète |
| **Mot de passe** | Mot de passe ou mot de passe d'application |

## 🆘 Problèmes Courants

### Erreur: "Authentication Failed"

**Solutions** :
1. Vérifiez que l'email est correct : `agency-leoservices@zohomailcloud.ca`
2. Vérifiez le mot de passe (pas d'espaces au début/fin)
3. Si 2FA est activé, utilisez un mot de passe d'application
4. Vérifiez que "Clients moins sécurisés" est autorisé

### Erreur: "Connection Timeout"

**Solutions** :
1. Vérifiez votre connexion internet
2. Le port 465 peut être bloqué par un pare-feu
3. Essayez le port 587 avec TLS :
   ```env
   EMAIL_PORT=587
   EMAIL_SECURE=false
   ```

### Le formulaire de contact ne fonctionne pas

1. Testez d'abord avec `node test-email.js`
2. Vérifiez les logs PM2 : `pm2 logs agency-leo-services`
3. Vérifiez que le serveur est en mode production : `NODE_ENV=production`

## 📚 Documentation Zoho

Pour plus d'informations :
- [Paramètres SMTP Zoho Mail](https://www.zoho.com/mail/help/zoho-smtp.html)
- [Mots de passe d'application Zoho](https://www.zoho.com/mail/help/adminconsole/two-factor-authentication.html)

## ✅ Checklist de Vérification

Avant le déploiement, vérifiez :

- [ ] Compte Zoho Mail actif et accessible
- [ ] Paramètres SMTP corrects dans `.env`
- [ ] Authentification configurée (mot de passe d'app ou clients moins sécurisés)
- [ ] Test `node test-email.js` réussi
- [ ] Formulaire de contact testé en local

---

**Note** : Une fois la configuration validée, vous pouvez supprimer le mot de passe en clair du `.env` sur GitHub en utilisant des secrets d'environnement sur le serveur EC2.
