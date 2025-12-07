// =================================
// NAVIGATION MOBILE
// =================================

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// =================================
// CHARGEMENT DES SERVICES
// =================================

async function loadServices() {
    const servicesGrid = document.getElementById('services-grid');

    try {
        const response = await fetch('/api/services');
        if (!response.ok) throw new Error('Erreur de chargement');

        const services = await response.json();

        if (services.length === 0) {
            servicesGrid.innerHTML = '<p class="text-center">Aucun service disponible pour le moment.</p>';
            return;
        }

        servicesGrid.innerHTML = services.map(service => `
            <div class="service-card">
                <div class="service-icon">${service.icon || '🤖'}</div>
                <h3>${service.titre}</h3>
                <p>${service.description}</p>
                ${service.features ? `
                    <ul class="service-features">
                        ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                ` : ''}
                <div class="service-price">${service.prix}</div>
                ${service.populaire ? '<span class="badge">Populaire</span>' : ''}
            </div>
        `).join('');

    } catch (error) {
        console.error('Erreur lors du chargement des services:', error);
        servicesGrid.innerHTML = '<p class="error">Erreur lors du chargement des services. Veuillez réessayer.</p>';
    }
}

// =================================
// CHARGEMENT DES AVIS CLIENTS
// =================================

async function loadTestimonials() {
    const testimonialsContainer = document.getElementById('testimonials-container');

    try {
        const response = await fetch('/api/avis');
        if (!response.ok) throw new Error('Erreur de chargement');

        const testimonials = await response.json();

        if (testimonials.length === 0) {
            testimonialsContainer.innerHTML = '<p class="text-center">Aucun avis disponible pour le moment.</p>';
            return;
        }

        testimonialsContainer.innerHTML = testimonials.map(testimonial => `
            <div class="testimonial-card">
                <div class="rating">
                    ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
                </div>
                <p class="testimonial-text">"${testimonial.texte}"</p>
                <div class="testimonial-author">
                    <div class="author-info">
                        <h4>${testimonial.nom}</h4>
                        <p>${testimonial.poste} - ${testimonial.entreprise}</p>
                    </div>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Erreur lors du chargement des avis:', error);
        testimonialsContainer.innerHTML = '<p class="error">Erreur lors du chargement des avis. Veuillez réessayer.</p>';
    }
}

// =================================
// FORMULAIRE DE CONTACT
// =================================

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Désactiver le bouton pendant l'envoi
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Envoi en cours...</span> <i class="fas fa-spinner fa-spin"></i>';

        const formData = {
            nom: document.getElementById('nom').value,
            email: document.getElementById('email').value,
            telephone: document.getElementById('telephone').value,
            entreprise: document.getElementById('entreprise').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                formMessage.textContent = data.message || 'Message envoyé avec succès !';
                formMessage.className = 'form-message success';
                contactForm.reset();
            } else {
                throw new Error(data.error || 'Erreur lors de l\'envoi');
            }

        } catch (error) {
            console.error('Erreur:', error);
            formMessage.textContent = error.message || 'Une erreur est survenue. Veuillez réessayer.';
            formMessage.className = 'form-message error';
        } finally {
            // Réactiver le bouton
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Envoyer le message</span> <i class="fas fa-paper-plane"></i>';

            // Masquer le message après 5 secondes
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// =================================
// CHATBOT
// =================================

const chatbot = document.getElementById('chatbot');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

// Ouvrir/Fermer le chatbot
if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        chatbot.classList.add('active');
    });
}

if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        chatbot.classList.remove('active');
    });
}

// Envoyer un message au chatbot
if (chatbotForm) {
    chatbotForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const message = chatbotInput.value.trim();
        if (!message) return;

        // Afficher le message de l'utilisateur
        addChatMessage(message, 'user');
        chatbotInput.value = '';

        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();

            if (response.ok) {
                // Afficher la réponse du bot après un court délai
                setTimeout(() => {
                    addChatMessage(data.response, 'bot');
                }, 500);
            } else {
                throw new Error(data.error || 'Erreur de communication');
            }

        } catch (error) {
            console.error('Erreur chatbot:', error);
            setTimeout(() => {
                addChatMessage('Désolé, je rencontre un problème technique. Veuillez utiliser le formulaire de contact.', 'bot');
            }, 500);
        }
    });
}

// Fonction pour ajouter un message au chat
function addChatMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatbotMessages.appendChild(messageDiv);

    // Scroll vers le bas
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// =================================
// SMOOTH SCROLL POUR LES ANCRES
// =================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =================================
// ANIMATION AU SCROLL
// =================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes de services et d'avis
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.service-card, .testimonial-card, .advantage-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }, 100);
});

// =================================
// INITIALISATION AU CHARGEMENT
// =================================

document.addEventListener('DOMContentLoaded', () => {
    loadServices();
    loadTestimonials();
});

// =================================
// HEADER SCROLL EFFECT
// =================================

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    }

    lastScroll = currentScroll;
});
