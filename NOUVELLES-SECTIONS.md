# NOUVELLES SECTIONS HTML À AJOUTER

## Instructions: Ajoutez ces sections dans votre fichier index.html

---

## 1. SECTION À PROPOS (après la section trust)

```html
<!-- About Section -->
<section id="about" class="about">
    <div class="about-content scroll-reveal">
        <div class="about-text">
            <h3><i class="fas fa-building"></i> Qui sommes-nous ?</h3>
            <p><strong>Agency Leo Services</strong> est une agence spécialisée dans l'intégration de solutions d'intelligence artificielle pour automatiser et optimiser la gestion du service client.</p>
            <p>Nous aidons les PME, agences et indépendants à gagner du temps, améliorer leur efficacité et offrir une expérience client fluide, 24h/24 et 7j/7.</p>
            <ul class="about-features">
                <li><i class="fas fa-check-circle"></i> Expertise en automatisation IA</li>
                <li><i class="fas fa-check-circle"></i> Solutions personnalisées</li>
                <li><i class="fas fa-check-circle"></i> Support humain inclus</li>
                <li><i class="fas fa-check-circle"></i> Intégration rapide</li>
            </ul>
        </div>
        <div class="about-image">
            <i class="fas fa-brain"></i>
        </div>
    </div>
</section>
```

**CSS à ajouter:**

```css
.about {
    background: var(--light-gray);
}

.about-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.about-text h3 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: var(--dark);
    font-weight: 800;
}

.about-text p {
    font-size: 1.15rem;
    line-height: 1.8;
    color: var(--gray);
    margin-bottom: 1.5rem;
}

.about-features {
    list-style: none;
    margin-top: 2rem;
}

.about-features li {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: var(--dark);
    font-weight: 600;
}

.about-features i {
    color: var(--success);
    font-size: 1.3rem;
}

.about-image {
    background: var(--gradient);
    border-radius: 20px;
    padding: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    box-shadow: 0 20px 60px rgba(37, 99, 235, 0.2);
}

.about-image i {
    font-size: 10rem;
    color: var(--white);
    opacity: 0.9;
}

@media (max-width: 968px) {
    .about-content {
        grid-template-columns: 1fr;
    }
}
```

---

## 2. SECTION MISSION & VISION (après services)

```html
<!-- Mission & Vision -->
<section class="mission-vision">
    <h2 class="section-title scroll-reveal">Notre Mission & Vision</h2>
    <p class="section-subtitle scroll-reveal">Ce qui nous anime au quotidien</p>
    
    <div class="mission-vision-grid">
        <div class="mission-card scroll-reveal">
            <h3><i class="fas fa-rocket"></i> Notre Mission</h3>
            <p>Notre mission est simple : <strong>aider les entreprises à se concentrer sur leur cœur de métier pendant que la technologie s'occupe du reste.</strong></p>
            <p>Nous croyons que chaque entreprise, peu importe sa taille, mérite d'accéder à la puissance de l'intelligence artificielle.</p>
        </div>

        <div class="vision-card scroll-reveal">
            <h3><i class="fas fa-eye"></i> Notre Vision</h3>
            <p>Nous voulons <strong>rendre l'automatisation accessible à tous.</strong> Plus qu'un service, nous proposons un partenariat digital où l'IA devient un allié quotidien.</p>
            <p>Ensemble, construisons l'avenir de votre entreprise avec des solutions intelligentes.</p>
        </div>
    </div>
</section>
```

**CSS à ajouter:**

```css
.mission-vision {
    background: var(--gradient);
    color: var(--white);
}

.mission-vision-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
}

.mission-card, .vision-card {
    background: rgba(255, 255, 255, 0.1);
    padding: 3rem;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.mission-card h3, .vision-card h3 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 800;
}

.mission-card p, .vision-card p {
    font-size: 1.15rem;
    line-height: 1.8;
    opacity: 0.95;
}

.mission-card i, .vision-card i {
    font-size: 2.5rem;
}

@media (max-width: 968px) {
    .mission-vision-grid {
        grid-template-columns: 1fr;
    }
}
```

---

## 3. SECTION POURQUOI NOUS CHOISIR

```html
<!-- Why Choose Us -->
<section id="why-us" class="why-us">
    <h2 class="section-title scroll-reveal">Pourquoi nous choisir ?</h2>
    <p class="section-subtitle scroll-reveal">Des solutions qui font la différence</p>
    
    <div class="why-us-grid">
        <div class="why-us-card scroll-reveal">
            <div class="why-us-icon">
                <i class="fas fa-magic"></i>
            </div>
            <h4>Solutions personnalisées</h4>
            <p>Chaque entreprise est unique. Nous adaptons nos solutions à votre activité et vos objectifs spécifiques.</p>
        </div>

        <div class="why-us-card scroll-reveal">
            <div class="why-us-icon">
                <i class="fas fa-bolt"></i>
            </div>
            <h4>Intégration rapide</h4>
            <p>Mise en place sans complexité technique. Première livraison sous 2 à 5 jours pour des résultats immédiats.</p>
        </div>

        <div class="why-us-card scroll-reveal">
            <div class="why-us-icon">
                <i class="fas fa-user-friends"></i>
            </div>
            <h4>Assistance humaine</h4>
            <p>Support technique et formation inclus. Une équipe dédiée pour vous accompagner à chaque étape.</p>
        </div>

        <div class="why-us-card scroll-reveal">
            <div class="why-us-icon">
                <i class="fas fa-euro-sign"></i>
            </div>
            <h4>Tarifs adaptés PME</h4>
            <p>Solutions accessibles pour toutes les tailles d'entreprises avec un excellent retour sur investissement.</p>
        </div>

        <div class="why-us-card scroll-reveal">
            <div class="why-us-icon">
                <i class="fas fa-graduation-cap"></i>
            </div>
            <h4>Expertise avancée</h4>
            <p>Maîtrise des outils modernes : IA, automation, CRM, marketing digital et intégrations complexes.</p>
        </div>

        <div class="why-us-card scroll-reveal">
            <div class="why-us-icon">
                <i class="fas fa-shield-alt"></i>
            </div>
            <h4>Satisfaction garantie</h4>
            <p>100% de clients satisfaits. Nous nous engageons pour votre réussite avec des résultats mesurables.</p>
        </div>
    </div>
</section>
```

**CSS à ajouter:**

```css
.why-us {
    background: var(--light-gray);
}

.why-us-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.why-us-card {
    background: var(--white);
    padding: 2.5rem;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
    transition: all 0.3s;
}

.why-us-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.12);
}

.why-us-icon {
    width: 60px;
    height: 60px;
    background: var(--gradient);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    color: var(--white);
    font-size: 1.5rem;
}

.why-us-card h4 {
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
    color: var(--dark);
    font-weight: 700;
}

.why-us-card p {
    color: var(--gray);
    line-height: 1.7;
}
```

---

## 4. AMÉLIORER LA SECTION SERVICES

Remplacez vos 2 cartes de services par ces 6 cartes détaillées:

```html
<div class="service-card scroll-reveal">
    <div class="service-icon">
        <i class="fas fa-comments"></i>
    </div>
    <h3>Chatbots & Assistants Virtuels</h3>
    <p>Répondez automatiquement à vos clients avec des chatbots intelligents disponibles 24/7.</p>
    <ul class="service-features">
        <li><i class="fas fa-check"></i> Réponses instantanées</li>
        <li><i class="fas fa-check"></i> Support multilingue</li>
        <li><i class="fas fa-check"></i> Apprentissage continu</li>
        <li><i class="fas fa-check"></i> Intégration WhatsApp/Facebook</li>
    </ul>
</div>

<div class="service-card scroll-reveal">
    <div class="service-icon">
        <i class="fas fa-envelope-open-text"></i>
    </div>
    <h3>Prospection Automatisée</h3>
    <p>Automatisez vos campagnes de prospection par email pour générer plus de leads qualifiés.</p>
    <ul class="service-features">
        <li><i class="fas fa-check"></i> Emails personnalisés</li>
        <li><i class="fas fa-check"></i> Suivi automatique</li>
        <li><i class="fas fa-check"></i> Scoring des leads</li>
        <li><i class="fas fa-check"></i> Reporting en temps réel</li>
    </ul>
</div>

<div class="service-card scroll-reveal">
    <div class="service-icon">
        <i class="fas fa-calendar-alt"></i>
    </div>
    <h3>Gestion de Rendez-vous</h3>
    <p>Planifiez et gérez vos rendez-vous automatiquement avec votre agenda intelligent.</p>
    <ul class="service-features">
        <li><i class="fas fa-check"></i> Réservation en ligne</li>
        <li><i class="fas fa-check"></i> Rappels automatiques</li>
        <li><i class="fas fa-check"></i> Synchronisation calendrier</li>
        <li><i class="fas fa-check"></i> Gestion des annulations</li>
    </ul>
</div>

<div class="service-card scroll-reveal">
    <div class="service-icon">
        <i class="fas fa-chart-line"></i>
    </div>
    <h3>Suivi Client & Reporting</h3>
    <p>Suivez vos clients et analysez vos performances avec des rapports intelligents automatisés.</p>
    <ul class="service-features">
        <li><i class="fas fa-check"></i> Tableaux de bord personnalisés</li>
        <li><i class="fas fa-check"></i> Analytics en temps réel</li>
        <li><i class="fas fa-check"></i> Prédictions IA</li>
        <li><i class="fas fa-check"></i> Alertes automatiques</li>
    </ul>
</div>

<div class="service-card scroll-reveal">
    <div class="service-icon">
        <i class="fas fa-cogs"></i>
    </div>
    <h3>Intégrations Avancées</h3>
    <p>Connectez tous vos outils préférés pour une automatisation complète de votre workflow.</p>
    <ul class="service-features">
        <li><i class="fas fa-check"></i> n8n, Make, Zapier</li>
        <li><i class="fas fa-check"></i> ChatGPT, Claude AI</li>
        <li><i class="fas fa-check"></i> Notion, Airtable</li>
        <li><i class="fas fa-check"></i> CRM personnalisés</li>
    </ul>
</div>

<div class="service-card scroll-reveal">
    <div class="service-icon">
        <i class="fas fa-headset"></i>
    </div>
    <h3>Support & Formation</h3>
    <p>Bénéficiez d'un accompagnement personnalisé et de formations pour maîtriser vos outils.</p>
    <ul class="service-features">
        <li><i class="fas fa-check"></i> Assistance humaine incluse</li>
        <li><i class="fas fa-check"></i> Formations sur-mesure</li>
        <li><i class="fas fa-check"></i> Documentation complète</li>
        <li><i class="fas fa-check"></i> Mises à jour régulières</li>
    </ul>
</div>
```

---

## 5. ICÔNES DANS LE HEADER/NAV

Ajoutez une icône au logo:

```html
<div class="logo">
    <i class="fas fa-robot"></i>
    Agency LeoService
</div>
```

---

## 6. FOOTER AMÉLIORÉ

Remplacez votre footer simple par:

```html
<footer>
    <div class="footer-content">
        <div class="footer-section">
            <h4><i class="fas fa-robot"></i> Agency LeoService</h4>
            <p>Solutions d'intelligence artificielle pour automatiser et optimiser votre service client.</p>
            <div class="footer-social">
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
            </div>
        </div>

        <div class="footer-section">
            <h4>Services</h4>
            <a href="#services">Chatbots & Assistants IA</a>
            <a href="#services">Prospection Automatisée</a>
            <a href="#services">Gestion de Rendez-vous</a>
            <a href="#services">Intégrations</a>
        </div>

        <div class="footer-section">
            <h4>Entreprise</h4>
            <a href="#about">À propos</a>
            <a href="#why-us">Pourquoi nous choisir</a>
            <a href="#contact">Contact</a>
        </div>

        <div class="footer-section">
            <h4>Contact</h4>
            <p><i class="fas fa-envelope"></i> contact@agency-leoservices.ca</p>
            <p><i class="fas fa-phone"></i> +33 (0)6 XX XX XX XX</p>
            <p><i class="fas fa-map-marker-alt"></i> France</p>
        </div>
    </div>

    <div class="footer-bottom">
        <p>&copy; 2024 Agency LeoService. Tous droits réservés.</p>
    </div>
</footer>
```

---

## ORDRE DES SECTIONS RECOMMANDÉ

1. Navigation
2. Hero
3. Stats
4. Trust (logos)
5. **À Propos** (nouveau)
6. Témoignages
7. Services (amélioré avec 6 cartes)
8. **Mission & Vision** (nouveau)
9. **Pourquoi nous choisir** (nouveau)
10. Contact Form
11. CTA Final
12. Footer (amélioré)

---

**📝 Note**: Copiez-collez ces sections dans votre index.html en suivant l'ordre recommandé ci-dessus !
