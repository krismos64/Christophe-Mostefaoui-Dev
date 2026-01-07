# Portfolio Développeur Web Freelance - Christophe Mostefaoui

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.15-blue)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.17.3-purple)
![SEO](https://img.shields.io/badge/SEO-Expert-green)
![React Helmet Async](https://img.shields.io/badge/React_Helmet_Async-2.0.5-blue)

Site web portfolio professionnel moderne présentant les services de Christophe Mostefaoui : développement web full-stack (React.js/Node.js), production vidéo (FCPX), prises de vue drone (DJI Mavic Air), et intégration IA. Basé à Pau avec services à distance partout en France.

## ✨ Fonctionnalités

- **Design moderne et épuré** - Interface glassmorphism orientée PME avec effets de transparence
- **Mode sombre/clair** - Basculement intelligent avec persistance localStorage et détection système
- **Animations avancées** - Framer Motion + Lottie avec micro-interactions
- **Formulaire de contact optimisé** - Validation temps réel, champs flottants, animations de feedback
- **Portfolio interactif** - Carousel Embla avec projets et hover effects
- **Section Production Vidéo & Drone** - Services audiovisuels professionnels avec animations Lottie
- **VideoShowcase** - 2 vidéos YouTube en grille avec modal lightbox moderne
- **Section Zone d'intervention** - SEO local avec timeline et couverture géographique
- **Navigation intuitive** - Menu mobile animé avec gestes et smooth scroll
- **Architecture modulaire** - Components réutilisables et hooks personnalisés
- **SEO Expert & LLM Ready** - Schemas JSON-LD, métadonnées enrichies, optimisation IA
- **Performance optimisée** - Core Web Vitals, lazy loading, bundle optimization
- **Accessibilité avancée** - ARIA labels, WCAG compliance, sémantique HTML

## 🛠 Stack Technique

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

### Optimisations
- **TypeScript**: Configuration stricte (`noImplicitReturns`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- **Vite Plugins**: vite-plugin-static-copy pour .htaccess
- **Performance**: Server warmup, optimizeDeps, manualChunks (vendor, animations, ui, helmet)

## 📦 Installation

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

## 🔧 Configuration

### EmailJS (Formulaire de Contact)

1. Créer un compte sur [EmailJS](https://www.emailjs.com/)
2. **Méthode sécurisée recommandée** - Créer un fichier `.env` à la racine :

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_USER_ID=your_user_id
```

3. **Alternative** - Modifier directement `src/config/emailjs.ts` (non recommandé pour la production)

> Un fichier `.env.example` est fourni comme modèle

## 🚀 Déploiement

### Build de Production

```bash
# Build optimisé avec Terser, cssnano, et code splitting
npm run build

# Preview de la version de production
npm run preview
```

### Déploiement Hostinger

Le build génère automatiquement :
- **dist/.htaccess** : Configuration Apache optimisée (HTTPS force, compression GZIP, cache 1 an)
- **Chunks JS optimisés** : vendor (161 KB), animations (~450 KB), ui, helmet, pages lazy-loaded
- **CSS minifié** : ~81 KB → ~13 KB gzip
- **Assets optimisés** : Compression terser + cache immutable

**Upload sur Hostinger** :
1. `npm run build`
2. Uploader **tout le contenu de `dist/`** via FTP/SFTP
3. Le `.htaccess` configure automatiquement Apache (React Router, HTTPS, cache)

### Optimisations Hostinger

Le `.htaccess` inclus offre :
- **Force HTTPS** : Redirection automatique HTTP → HTTPS
- **React Router SPA** : Toutes les routes (`/blog`, `/faq`, etc.) fonctionnent
- **Compression GZIP** : Réduction 70% taille fichiers
- **Cache navigateur** : CSS/JS/images 1 an, HTML no-cache
- **Headers sécurité** : CSP, X-Frame-Options, X-XSS-Protection
- **Types MIME** : Support fonts, webp, vidéos
- **Cache immutable** : Assets avec hash Vite optimisés Core Web Vitals

## 🏗 Architecture du Projet

### Structure des dossiers (Architecture Clean)

```
src/
├── components/
│   ├── common/          # Composants réutilisables
│   │   ├── AnimatedButton.tsx    # Bouton avec animations avancées
│   │   ├── AnimatedSection.tsx   # Wrapper d'animations
│   │   ├── Button.tsx           # Bouton configurable
│   │   ├── CallToAction.tsx     # CTA réutilisable
│   │   ├── Card.tsx             # Composant carte générique
│   │   ├── ErrorBoundary.tsx    # Gestion erreurs React
│   │   └── FormField.tsx        # Champ de formulaire intelligent
│   ├── layout/          # Composants de mise en page
│   │   ├── Header.tsx           # Navigation avec menu mobile
│   │   └── Footer.tsx           # Pied de page avec liens
│   ├── sections/        # Sections de pages
│   │   ├── About.tsx            # Présentation humaine PME-friendly
│   │   ├── AIIntegration.tsx    # Solutions IA avec use cases
│   │   ├── FeaturedSnippetsFAQ.tsx # FAQ optimisée SEO
│   │   ├── Hero.tsx             # Section d'accueil animée
│   │   ├── Portfolio.tsx        # Carousel Embla projets
│   │   ├── Pricing.tsx          # Grille tarifaire 3 offres
│   │   ├── ServiceArea.tsx      # Zone d'intervention + timeline
│   │   ├── Services.tsx         # 6 services PME-friendly
│   │   ├── VideoServices.tsx    # Production vidéo & drone
│   │   └── VideoShowcase.tsx    # 2 vidéos YouTube avec modal
│   └── seo/             # Composants SEO
│       ├── GMBOptimizedContact.tsx  # Formulaire contact GMB
│       ├── LLMOptimizedHead.tsx     # Meta tags LLM
│       └── VideoSEOHead.tsx         # SEO vidéo
├── pages/              # Pages de routing
│   ├── Avis.tsx        # Page avis clients
│   ├── Blog.tsx        # Liste articles blog
│   ├── BlogPost.tsx    # Article individuel
│   ├── FAQ.tsx         # Questions fréquentes
│   ├── LegalNotice.tsx # Mentions légales
│   └── PrivacyPolicy.tsx # Politique de confidentialité
├── utils/              # Utilitaires SEO
│   ├── structured-data-final.tsx    # Données structurées consolidées
│   ├── seo-advanced.tsx             # Meta tags avancés LLM
│   ├── video-seo-optimization.tsx   # SEO vidéo
│   ├── viral-video-seo.tsx          # SEO viral YouTube
│   ├── local-seo-schema.tsx         # SEO local
│   └── seo-location-data.tsx        # Géolocalisation
├── hooks/              # Hooks personnalisés
│   ├── useStructuredData.ts     # Hook SEO consolidé (useMemo)
│   ├── useNavigation.ts         # Logique de navigation
│   └── useFormValidation.ts     # Validation de formulaires
├── types/              # Types TypeScript
│   └── common.ts                # Interfaces partagées
├── config/             # Configuration
│   └── emailjs.ts               # Configuration EmailJS sécurisée
├── context/            # React Context
│   └── ThemeContext.tsx         # Gestion thème global
├── animations/         # Animations Lottie
│   ├── chatbot.json    # Animation section About
│   ├── company.json    # Animation section Hero
│   ├── contact.json    # Animation section Contact
│   ├── thinking.json   # Animation header/footer
│   ├── Drone Camera.json # Animation drone DJI
│   └── Cut Video.json  # Animation montage vidéo
└── App.tsx            # Application principale (HelmetProvider)
```

### Composants clés

- **VideoShowcase**: 2 vidéos YouTube en grille responsive avec modal lightbox
- **ServiceArea**: Zone d'intervention (15 villes 64 + France) avec timeline 4 étapes
- **Portfolio**: Carousel Embla avec 7 projets orientés bénéfices PME
- **Pricing**: 3 offres tarifaires (Site vitrine, E-commerce, SaaS)
- **ErrorBoundary**: Gestion globale des erreurs React avec fallback UI élégant
- **CallToAction**: Composant CTA réutilisable avec variants
- **useStructuredData**: Hook SEO consolidé avec useMemo
- **useNavigation**: Hook centralisé pour la navigation avec smooth scroll
- **ThemeProvider**: Contexte global pour mode sombre/clair avec détection système

## 📱 Design Responsive

- **Mobile First**: < 768px avec animations adaptées
- **Tablettes**: 768px - 1024px avec grilles optimisées
- **Desktop**: > 1024px avec animations Lottie complètes
- **Menu mobile**: Animation personnalisée avec Tailwind

## 🔍 Optimisations SEO

### SEO Technique Avancé

- **Métadonnées enrichies**: Titles optimisés avec mots-clés stratégiques
- **Keywords longue traîne**: "développeur web Pau", "création site PME", etc.
- **Open Graph optimisé**: Images et descriptions complètes
- **Canonical URLs**: Éviter le contenu dupliqué
- **Google Search Console**: Validé via DNS

### Données Structurées JSON-LD

- **ProfessionalService**: Services détaillés avec géolocalisation
- **Organization**: Google Business Profile ready
- **Person**: Profil expert complet
- **FAQPage**: Questions optimisées IA
- **LocalBusiness**: SEO local pour zone d'intervention
- **VideoObject**: SEO vidéo YouTube

### Optimisation LLM (Large Language Models)

- **Contenu structuré**: Distribution optimale mots-clés
- **Couverture géographique**: 15 villes Pyrénées-Atlantiques + France entière
- **FAQ exhaustive**: Questions types des LLM avec réponses détaillées

## 🎯 Services Présentés

### Développement Web (6 services PME-friendly)

- **Site Vitrine Moderne** - Votre vitrine professionnelle sur internet
- **E-commerce Sur Mesure** - Vendez en ligne 24h/24
- **Application SaaS** - Digitalisez votre métier
- **Refonte de Site** - Modernisez votre image
- **Maintenance & Support** - Tranquillité d'esprit
- **Intégration IA** - Un assistant qui travaille pour vous

### Production Audiovisuelle

- **Montage Vidéo Professionnel** - Final Cut Pro X sur Mac, exports 4K
- **Prises de Vue Drone** - DJI Mavic Air pour entreprises et immobilier

### Tarification

- **Site Vitrine** - À partir de 1 500€
- **E-commerce** - À partir de 3 000€
- **Application SaaS** - Sur devis

## 📞 Contact Développeur

- **Email**: christophe.mostefaoui.dev@gmail.com
- **Téléphone**: +33 6 79 08 88 45
- **Localisation**: Artix, France (secteur Pau - Pyrénées-Atlantiques)
- **LinkedIn**: [christophemostefaoui](https://www.linkedin.com/in/christophemostefaoui/)
- **GitHub**: [krismos64](https://github.com/krismos64)

## 🆕 Dernières Améliorations

### v4.0 - Refonte PME-Friendly (Janvier 2025)

- **VideoShowcase** - Fusion des 2 sections vidéo en une seule avec modal lightbox
- **ServiceArea** - Nouvelle section zone d'intervention avec timeline
- **Portfolio Carousel** - Embla Carousel avec 7 projets orientés bénéfices
- **Pricing Section** - 3 offres tarifaires claires
- **About Refonte** - Présentation humaine avec 3 différenciateurs
- **Services Simplifiés** - 6 services sans jargon technique
- **Nettoyage** - Suppression sections testimonials, blog navbar, playlist
- **Bundle optimisé** - ~621 KB (réduction significative)

### v3.1 - Optimisations Performance & Production

- **Hook useStructuredData** - Consolidation générateurs SEO avec useMemo
- **React.lazy + Suspense** - Code splitting 6 pages
- **Error Boundaries** - Gestion globale erreurs React
- **TypeScript strict++** - Configuration ultra-rigoureuse
- **Vite optimisé** - Terser, server warmup, manualChunks avancés

### v3.0 - Multi-Services & SEO Maximum

- **Section VideoServices** - Production vidéo FCPX et drone DJI Mavic Air
- **FAQ Enrichie** - Questions optimisées (déplacements, remote, vidéo, drone, chatbots IA)
- **Multi-compétences** - Dev + Vidéo + Drone + SEO + Chatbots IA
- **Couverture Géographique** - Pyrénées-Atlantiques + France entière

## 🛠 Développement

### Scripts disponibles

```bash
npm run dev          # Serveur de développement (port 3000)
npm run build        # Build de production
npm run preview      # Preview du build
```

### Bonnes pratiques

- **TypeScript strict++** - Configuration ultra-rigoureuse
- **React best practices** - useMemo, useCallback, React.lazy, Error Boundaries
- **Performance-first** - Code splitting, lazy loading, compression, cache strategy
- **Clean Architecture** - Hooks personnalisés, composants réutilisables
- **SEO Expert** - Structured data, meta tags, sitemap, robots.txt, .htaccess optimisé
- **Semantic commits** - Messages de commit structurés

## 📝 Licence

Copyright © 2025 Christophe Mostefaoui. Tous droits réservés.

---

_Portfolio moderne développé avec React 18, TypeScript strict et Tailwind CSS. Services : développement web full-stack, production vidéo FCPX, prises de vue drone DJI Mavic Air, intégration IA. Optimisé pour les Core Web Vitals avec code splitting avancé, React.lazy, Error Boundaries, compression terser + cssnano. Services disponibles Pyrénées-Atlantiques et France entière à distance._
