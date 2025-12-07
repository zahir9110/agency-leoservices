const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de sécurité
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(cors());
app.use(compression());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, '../public')));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite de 100 requêtes par IP
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 5 // limite de 5 emails par heure
});

app.use('/api/', limiter);

// Configuration Nodemailer
const transporterConfig = {
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
};

// Configuration spécifique selon le service
if (process.env.EMAIL_SERVICE === 'Zoho') {
  transporterConfig.host = process.env.EMAIL_HOST || 'smtp.zoho.com';
  transporterConfig.port = parseInt(process.env.EMAIL_PORT) || 465;
  transporterConfig.secure = process.env.EMAIL_SECURE === 'true';
} else {
  transporterConfig.service = process.env.EMAIL_SERVICE || 'gmail';
}

const transporter = nodemailer.createTransport(transporterConfig);

// Fonction pour charger les données JSON
async function loadJSON(filename) {
  try {
    const data = await fs.readFile(path.join(__dirname, '../data', filename), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erreur lors du chargement de ${filename}:`, error);
    return null;
  }
}

// Fonction pour sauvegarder les données JSON
async function saveJSON(filename, data) {
  try {
    await fs.writeFile(
      path.join(__dirname, '../data', filename),
      JSON.stringify(data, null, 2),
      'utf8'
    );
    return true;
  } catch (error) {
    console.error(`Erreur lors de la sauvegarde de ${filename}:`, error);
    return false;
  }
}

// =========================
// ROUTES API - AVIS CLIENTS
// =========================

// GET tous les avis visibles
app.get('/api/avis', async (req, res) => {
  try {
    const data = await loadJSON('avis.json');
    if (!data) {
      return res.status(500).json({ error: 'Impossible de charger les avis' });
    }
    const avisVisibles = data.avis.filter(avis => avis.visible);
    res.json(avisVisibles);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET un avis spécifique
app.get('/api/avis/:id', async (req, res) => {
  try {
    const data = await loadJSON('avis.json');
    if (!data) {
      return res.status(500).json({ error: 'Impossible de charger les avis' });
    }
    const avis = data.avis.find(a => a.id === parseInt(req.params.id));
    if (!avis) {
      return res.status(404).json({ error: 'Avis non trouvé' });
    }
    res.json(avis);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST un nouvel avis
app.post('/api/avis', [
  body('nom').trim().isLength({ min: 2, max: 100 }),
  body('poste').trim().isLength({ min: 2, max: 100 }),
  body('entreprise').trim().isLength({ min: 2, max: 100 }),
  body('texte').trim().isLength({ min: 10, max: 500 }),
  body('rating').isInt({ min: 1, max: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const data = await loadJSON('avis.json');
    if (!data) {
      return res.status(500).json({ error: 'Impossible de charger les avis' });
    }

    const nouvelAvis = {
      id: data.avis.length > 0 ? Math.max(...data.avis.map(a => a.id)) + 1 : 1,
      rating: req.body.rating,
      nom: req.body.nom,
      poste: req.body.poste,
      entreprise: req.body.entreprise,
      texte: req.body.texte,
      date: new Date().toISOString(),
      visible: false // Nécessite validation manuelle
    };

    data.avis.push(nouvelAvis);
    const saved = await saveJSON('avis.json', data);

    if (saved) {
      res.status(201).json({ message: 'Avis ajouté avec succès', avis: nouvelAvis });
    } else {
      res.status(500).json({ error: 'Erreur lors de la sauvegarde' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// =========================
// ROUTES API - SERVICES
// =========================

// GET tous les services
app.get('/api/services', async (req, res) => {
  try {
    const data = await loadJSON('services.json');
    if (!data) {
      return res.status(500).json({ error: 'Impossible de charger les services' });
    }

    let services = data.services;

    // Filtrer par catégorie si spécifié
    if (req.query.categorie) {
      services = services.filter(s => s.categorie === req.query.categorie);
    }

    // Filtrer les services populaires si spécifié
    if (req.query.populaire === 'true') {
      services = services.filter(s => s.populaire);
    }

    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET un service spécifique
app.get('/api/services/:id', async (req, res) => {
  try {
    const data = await loadJSON('services.json');
    if (!data) {
      return res.status(500).json({ error: 'Impossible de charger les services' });
    }
    const service = data.services.find(s => s.id === parseInt(req.params.id));
    if (!service) {
      return res.status(404).json({ error: 'Service non trouvé' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// =========================
// ROUTES API - CONTACT
// =========================

app.post('/api/contact', contactLimiter, [
  body('nom').trim().isLength({ min: 2, max: 100 }),
  body('email').trim().isEmail().normalizeEmail(),
  body('telephone').optional().trim().matches(/^[0-9\s\+\-\(\)]+$/),
  body('entreprise').optional().trim().isLength({ max: 100 }),
  body('message').trim().isLength({ min: 10, max: 1000 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nom, email, telephone, entreprise, message } = req.body;

  try {
    // Envoyer l'email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: `Nouveau contact de ${nom} - Agency Leo Services`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${nom}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${telephone || 'Non fourni'}</p>
        <p><strong>Entreprise:</strong> ${entreprise || 'Non fourni'}</p>
        <h3>Message:</h3>
        <p>${message}</p>
        <hr>
        <p><small>Message reçu le ${new Date().toLocaleString('fr-FR')}</small></p>
      `
    };

    await transporter.sendMail(mailOptions);

    // Email de confirmation au client
    const confirmationMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmation de réception - Agency Leo Services',
      html: `
        <h2>Bonjour ${nom},</h2>
        <p>Nous avons bien reçu votre message et nous vous en remercions.</p>
        <p>Notre équipe reviendra vers vous dans les plus brefs délais.</p>
        <h3>Récapitulatif de votre message:</h3>
        <p>${message}</p>
        <hr>
        <p>Cordialement,<br><strong>L'équipe Agency Leo Services</strong></p>
      `
    };

    await transporter.sendMail(confirmationMail);

    // Sauvegarder le contact dans un fichier JSON
    const contactData = {
      nom,
      email,
      telephone,
      entreprise,
      message,
      date: new Date().toISOString(),
      ip: req.ip
    };

    let contacts = { contacts: [] };
    try {
      const existingContacts = await loadJSON('contacts.json');
      if (existingContacts) {
        contacts = existingContacts;
      }
    } catch (error) {
      console.log('Création du fichier contacts.json');
    }

    contacts.contacts.push(contactData);
    await saveJSON('contacts.json', contacts);

    res.json({
      success: true,
      message: 'Message envoyé avec succès. Nous vous répondrons bientôt!'
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({
      error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
    });
  }
});

// =========================
// ROUTES API - CHATBOT
// =========================

app.post('/api/chatbot', [
  body('message').trim().isLength({ min: 1, max: 500 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { message } = req.body;
  const messageLower = message.toLowerCase();

  // Réponses prédéfinies simples (à remplacer par une vraie IA plus tard)
  let response = '';

  if (messageLower.includes('prix') || messageLower.includes('tarif') || messageLower.includes('coût')) {
    response = "Nos tarifs varient selon vos besoins spécifiques. Nos services commencent à partir de 499€. Je vous invite à nous contacter pour un devis personnalisé gratuit !";
  } else if (messageLower.includes('service') || messageLower.includes('offre')) {
    response = "Nous proposons plusieurs services : Chatbots IA, Automatisation des processus, Analyse de données, et CRM intelligent. Que souhaitez-vous savoir plus précisément ?";
  } else if (messageLower.includes('contact') || messageLower.includes('rendez-vous')) {
    response = "Pour nous contacter, vous pouvez utiliser le formulaire de contact en bas de page, nous appeler, ou nous envoyer un email. Nous répondons généralement sous 24h !";
  } else if (messageLower.includes('délai') || messageLower.includes('temps')) {
    response = "Le délai de mise en œuvre dépend du projet, mais généralement entre 2 à 6 semaines. Nous pouvons discuter de vos contraintes de temps lors d'un premier rendez-vous.";
  } else if (messageLower.includes('bonjour') || messageLower.includes('salut') || messageLower.includes('hello')) {
    response = "Bonjour ! Je suis l'assistant virtuel d'Agency Leo Services. Comment puis-je vous aider aujourd'hui ?";
  } else {
    response = "Merci pour votre message ! Pour une réponse plus précise à votre question, je vous invite à remplir le formulaire de contact. Notre équipe vous répondra rapidement !";
  }

  res.json({
    response,
    timestamp: new Date().toISOString()
  });
});

// =========================
// ROUTE HEALTH CHECK
// =========================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// =========================
// ROUTES HTML
// =========================

// Route principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Une erreur est survenue sur le serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 Agency Leo Services - Serveur démarré           ║
║                                                       ║
║   🌐 URL: http://localhost:${PORT}                      ║
║   📝 Environment: ${process.env.NODE_ENV || 'development'}                    ║
║   ⏰ Démarré: ${new Date().toLocaleString('fr-FR')}     ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

// Gestion propre de l'arrêt
process.on('SIGTERM', () => {
  console.log('SIGTERM reçu. Arrêt gracieux du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT reçu. Arrêt gracieux du serveur...');
  process.exit(0);
});
