// Configuration EmailJS pour Agency LeoService
// À intégrer dans votre fichier HTML

// 1. INITIALISEZ EmailJS (remplacez YOUR_PUBLIC_KEY)
emailjs.init("YOUR_PUBLIC_KEY");

// 2. ENVOI D'EMAIL AU SUBMIT DU FORMULAIRE
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
        message: document.getElementById('message').value
    };

    try {
        // Envoi via EmailJS
        await emailjs.send(
            'YOUR_SERVICE_ID',      // Ex: service_abc123
            'YOUR_TEMPLATE_ID',     // Ex: template_contact
            {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                company: formData.company,
                message: formData.message,
                to_email: 'votre@email.com'  // Votre email
            }
        );

        // Succès
        formMessage.className = 'form-message success';
        formMessage.innerHTML = '✅ Message envoyé ! Nous vous contacterons sous 24h.';
        contactForm.reset();

    } catch (error) {
        // Erreur
        formMessage.className = 'form-message error';
        formMessage.innerHTML = '❌ Erreur d\'envoi. Réessayez ou contactez-nous directement.';
        console.error('EmailJS Error:', error);
    }
});

// 3. TEMPLATE EMAIL (à configurer sur emailjs.com)
/*
Objet: Nouvelle demande de {{from_name}}

Bonjour,

Vous avez reçu une nouvelle demande via Agency LeoService:

Nom: {{from_name}}
Email: {{from_email}}
Téléphone: {{phone}}
Entreprise: {{company}}

Message:
{{message}}

---
Répondez rapidement pour maximiser vos conversions !
*/

// 4. INSTRUCTIONS RAPIDES

// Étape 1: Créez un compte sur https://www.emailjs.com (gratuit)
// Étape 2: Ajoutez votre service email (Gmail/Outlook/etc)
// Étape 3: Créez un template avec les variables ci-dessus
// Étape 4: Copiez vos clés (Public Key, Service ID, Template ID)
// Étape 5: Remplacez YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, YOUR_TEMPLATE_ID
// Étape 6: Testez ! 🚀

// SUPPORT: https://www.emailjs.com/docs
