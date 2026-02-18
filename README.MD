# Portfolio Développeur Web Freelance - Christophe Mostefaoui

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.15-blue)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.17.3-purple)
![SEO](https://img.shields.io/badge/SEO-Expert-green)
![React Helmet Async](https://img.shields.io/badge/React_Helmet_Async-2.0.5-blue)

Site web portfolio professionnel moderne présentant les services de Christophe Mostefaoui : développement web full-stack (React.js/Node.js), production vidéo (FCPX), prises de vue drone (DJI Mavic Air), et intégration IA. Basé à Pau / Artix (64) avec services à distance partout en France.

## Fonctionnalités

- **Design moderne et épuré** - Interface glassmorphism avec effets futuristes (orbs, shapes, code lines)
- **Mode sombre/clair** - Basculement intelligent avec persistance localStorage et détection système
- **Animations avancées** - Framer Motion + Lottie avec micro-interactions
- **Formulaire de contact optimisé** - Validation temps réel, EmailJS, animations de feedback
- **Portfolio interactif** - Carousel Embla avec 7 projets (SmartPlanning en avant)
- **Section Production Vidéo & Drone** - Services audiovisuels avec animations Lottie
- **VideoShowcase** - 2 vidéos YouTube en grille avec modal lightbox
- **Section Zone d'intervention** - SEO local avec couverture géographique (64 + France)
- **Chatbot IA intégré** - Assistant conversationnel flottant
- **Blog** - 5 articles avec SEO automatisé (BlogPosting schema)
- **Page Avis** - Témoignages clients
- **Navigation intuitive** - Menu mobile animé avec smooth scroll
- **Architecture modulaire** - Components réutilisables et hooks personnalisés
- **SEO Expert & LLM Ready** - Schemas JSON-LD, métadonnées enrichies, llms.txt, llms-full.txt
- **Performance optimisée** - Core Web Vitals, lazy loading, code splitting
- **Accessibilité** - ARIA labels, WCAG compliance, sémantique HTML

## Stack Technique

### Core
- **Frontend Framework**: React 18.3.1 avec TypeScript 5.5.3 (strict mode)
- **Build Tool**: Vite 5.4.2 avec optimisations avancées
- **Styling**: Tailwind CSS 3.4.15 + PostCSS + cssnano
- **Routing**: React Router DOM 6.22.3 avec lazy loading

### UI & Animations
- **Animations**: Framer Motion 12.17.3 + Lottie React 2.4.1
- **Carousel**: Embla Carousel React pour le portfolio
- **Icons**: Lucide React 0.344.0 + Heroicons
- **Formulaires**: EmailJS 4.4.1 + React Hot Toast 2.4.1

### SEO & Performance
- **SEO**: React Helmet Async 2.0.5 + hook personnalisé `useStructuredData`
- **Compression**: Terser 5.44.0 + cssnano 7.1.1
- **Code Splitting**: React.lazy + Suspense (6 pages lazy-loaded)
- **Error Handling**: Error Boundaries personnalisés

### Optimisations Build
- **TypeScript**: Configuration stricte (`noImplicitReturns`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- **Vite Plugins**: vite-plugin-static-copy pour .htaccess
- **Performance**: Server warmup, optimizeDeps, manualChunks (vendor, animations, ui, helmet)

## Installation

```bash
# Cloner le repository
git clone https://github.com/krismos64/Christophe-Mostefaoui-Dev

# Accéder au répertoire
cd Christophe-Mostefaoui-Dev

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## Configuration

### EmailJS (Formulaire de Contact)

1. Créer un compte sur [EmailJS](https://www.emailjs.com/)
2. Créer un fichier `.env` à la racine :

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_USER_ID=your_user_id
```

## Déploiement

### Build de Production

```bash
npm run build      # Build optimisé avec Terser, cssnano, et code splitting
npm run preview    # Preview de la version de production
```

### Déploiement Hostinger

Le build génère automatiquement :
- **dist/.htaccess** : Configuration Apache optimisée (HTTPS, GZIP, cache 1 an, React Router SPA)
- **Chunks JS optimisés** : vendor (~161 KB), animations (~456 KB), ui, helmet, pages lazy-loaded
- **CSS minifié** : ~89 KB → ~14.5 KB gzip
- **Assets optimisés** : Compression terser + cache immutable

Upload sur Hostinger :
1. `npm run build`
2. Uploader tout le contenu de `dist/` via FTP/SFTP
3. Le `.htaccess` configure automatiquement Apache

## Architecture du Projet

```
src/
├── components/
│   ├── common/          # Composants réutilisables
│   │   ├── AnimatedButton.tsx
│   │   ├── AnimatedSection.tsx
│   │   ├── Button.tsx
│   │   ├── CallToAction.tsx
│   │   ├── Card.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── FormField.tsx
│   ├── layout/          # Mise en page
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/        # Sections de la page d'accueil
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── VideoShowcase.tsx
│   │   ├── Services.tsx
│   │   ├── Pricing.tsx
│   │   ├── FeaturedSnippetsFAQ.tsx
│   │   ├── AIIntegration.tsx
│   │   ├── Portfolio.tsx
│   │   ├── VideoServices.tsx
│   │   ├── ServiceArea.tsx
│   │   └── Contact.tsx
│   ├── seo/             # Composants SEO
│   │   ├── GMBOptimizedContact.tsx
│   │   ├── LLMOptimizedHead.tsx
│   │   └── VideoSEOHead.tsx
│   ├── effects/         # Effets visuels
│   │   ├── FuturisticBackground.tsx
│   │   └── FuturisticEffects.tsx
│   └── welcome/
│       └── WelcomeScreen.tsx
├── pages/               # Pages de routing (lazy-loaded)
│   ├── Avis.tsx
│   ├── Blog.tsx
│   ├── BlogPost.tsx
│   ├── FAQ.tsx
│   ├── LegalNotice.tsx
│   └── PrivacyPolicy.tsx
├── utils/               # Utilitaires SEO
│   ├── structured-data-final.tsx
│   ├── seo-advanced.tsx
│   ├── video-seo-optimization.tsx
│   ├── viral-video-seo.tsx
│   ├── local-seo-schema.tsx
│   ├── seo-location-data.tsx
│   ├── featured-snippets-content.tsx
│   ├── blog-automation.tsx
│   └── google-my-business-optimization.tsx
├── hooks/               # Hooks personnalisés
│   ├── useStructuredData.ts
│   ├── useNavigation.ts
│   └── useFormValidation.ts
├── data/
│   └── blogPosts.ts     # 5 articles de blog
├── context/
│   └── ThemeContext.tsx
├── config/
│   └── emailjs.ts
└── App.tsx
```

### Fichiers publics SEO & LLM

```
public/
├── sitemap.xml              # 11 URLs indexées
├── robots.txt               # Bots IA autorisés, bots spam bloqués
├── llms.txt                 # Fiche synthétique pour LLM
├── llms-full.txt            # Base de connaissances complète pour LLM
├── chatbot-knowledge.txt    # Base de connaissances chatbot IA
├── humans.txt               # Crédits humains
├── manifest.json            # PWA manifest
└── .well-known/
    └── ai-plugin.json       # Plugin IA standard
```

## Optimisations SEO

### SEO Technique
- **Title optimisé** avec nom, localisation et technologies dans le HTML statique
- **Meta description** ciblée (Pau, 64, React.js, Node.js, IA)
- **Open Graph** avec image 1200x630 en URL absolue
- **Twitter Cards** summary_large_image
- **Canonical URLs** dynamiques sur toutes les pages (y compris blog)
- **Google Search Console** vérifié via balise meta
- **Sitemap XML** complet et cohérent avec robots.txt

### Données Structurées JSON-LD
- **Organization** - Profil entreprise
- **Person** - Profil expert avec formation et credentials
- **ProfessionalService** - Services détaillés avec géolocalisation et tarifs
- **LocalBusiness** - SEO local GMB avec areaServed
- **FAQPage** - Questions optimisées pour featured snippets
- **VideoObject** - SEO vidéo YouTube (2 vidéos)
- **BlogPosting** - Articles de blog avec schema automatique
- **CreativeWork** - Portfolio projets
- **WebSite** - SearchAction pour sitelinks
- **BreadcrumbList** - Navigation structurée

### Optimisation LLM (ChatGPT, Claude, Perplexity, Gemini)
- **llms.txt** - Fiche synthétique avec mots-clés locaux et résultats clients
- **llms-full.txt** - Base de connaissances exhaustive (portfolio, témoignages, FAQ, zones)
- **chatbot-knowledge.txt** - Base de connaissances pour chatbot intégré
- **ai-plugin.json** - Plugin IA standard (.well-known)
- **Meta tags LLM** - ai-content-type, llm-context, semantic-keywords via LLMOptimizedHead
- **robots.txt** - GPTBot, Claude-Web, ChatGPT-User, CCBot autorisés
- **Contenu structuré** - Couverture géographique (15 villes 64 + France entière)

## Services Présentés

### Développement Web
- **Site Vitrine Moderne** - 800€ à 1 500€
- **Site Multi-pages** - 1 500€ à 3 000€
- **Application Sur-mesure / SaaS** - À partir de 3 000€
- **Intégration IA** - Chatbots GPT/Claude/Mistral
- **Maintenance & Support**
- **Refonte de Site**

### Production Audiovisuelle
- **Montage Vidéo Professionnel** - Final Cut Pro X, exports 4K
- **Prises de Vue Drone** - DJI Mavic Air, certifié DGAC AlphaTango

## Contact

- **Email**: christophe.mostefaoui.dev@gmail.com
- **Téléphone**: 06 79 08 88 45
- **Localisation**: Pau / Artix (64) - Pyrénées-Atlantiques
- **Site**: [christophe-dev-freelance.fr](https://christophe-dev-freelance.fr)
- **LinkedIn**: [christophemostefaoui](https://www.linkedin.com/in/christophemostefaoui/)
- **GitHub**: [krismos64](https://github.com/krismos64)

## Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production (tsc + vite build)
npm run preview      # Preview du build
```

## Licence

Copyright 2026 Christophe Mostefaoui. Tous droits réservés.
