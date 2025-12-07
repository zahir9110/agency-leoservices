#!/usr/bin/env node

/**
 * Script de Test de Configuration Email
 * Usage: node test-email.js
 */

const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('\n🔍 Test de la Configuration Email\n');
console.log('═══════════════════════════════════════\n');

// Afficher la configuration (masquer le mot de passe)
console.log('Configuration détectée:');
console.log('  Service:', process.env.EMAIL_SERVICE || 'Non défini');
console.log('  Host:', process.env.EMAIL_HOST || 'Non défini');
console.log('  Port:', process.env.EMAIL_PORT || 'Non défini');
console.log('  Secure:', process.env.EMAIL_SECURE || 'Non défini');
console.log('  User:', process.env.EMAIL_USER || 'Non défini');
console.log('  Password:', process.env.EMAIL_PASSWORD ? '***' + process.env.EMAIL_PASSWORD.slice(-4) : 'Non défini');
console.log('\n───────────────────────────────────────\n');

// Configuration du transporteur
const transporterConfig = {
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
};

if (process.env.EMAIL_SERVICE === 'Zoho') {
  transporterConfig.host = process.env.EMAIL_HOST || 'smtp.zoho.com';
  transporterConfig.port = parseInt(process.env.EMAIL_PORT) || 465;
  transporterConfig.secure = process.env.EMAIL_SECURE === 'true';
  console.log('📧 Utilisation de Zoho Mail SMTP');
} else {
  transporterConfig.service = process.env.EMAIL_SERVICE || 'gmail';
  console.log('📧 Utilisation de', transporterConfig.service);
}

const transporter = nodemailer.createTransport(transporterConfig);

console.log('🔄 Vérification de la connexion SMTP...\n');

// Vérifier la connexion
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Erreur de connexion SMTP:\n');
    console.error('   Message:', error.message);
    console.error('   Code:', error.code);
    console.error('\n💡 Solutions possibles:\n');

    if (error.message.includes('Authentication Failed')) {
      console.error('   1. Vérifiez vos identifiants email dans .env');
      console.error('   2. Pour Zoho Mail:');
      console.error('      - Connectez-vous sur https://mail.zoho.com');
      console.error('      - Allez dans Paramètres > Sécurité');
      console.error('      - Activez "Autoriser les clients moins sécurisés"');
      console.error('      - OU créez un "Mot de passe d\'application"');
      console.error('   3. Vérifiez que le compte n\'a pas de 2FA sans mot de passe d\'application');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('   1. Vérifiez votre connexion internet');
      console.error('   2. Vérifiez que le port', process.env.EMAIL_PORT, 'n\'est pas bloqué');
      console.error('   3. Vérifiez le hostname:', process.env.EMAIL_HOST);
    } else if (error.code === 'ETIMEDOUT') {
      console.error('   1. Votre pare-feu peut bloquer la connexion');
      console.error('   2. Le serveur SMTP peut être temporairement indisponible');
    }

    console.error('\n');
    process.exit(1);
  } else {
    console.log('✅ Connexion SMTP réussie !\n');
    console.log('═══════════════════════════════════════\n');
    console.log('🎉 Configuration email valide\n');
    console.log('Vous pouvez maintenant envoyer des emails.');
    console.log('Pour tester l\'envoi réel, démarrez le serveur et');
    console.log('utilisez le formulaire de contact.\n');
    process.exit(0);
  }
});
