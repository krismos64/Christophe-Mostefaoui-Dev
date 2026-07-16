# Portfolio — Christophe Mostefaoui, développeur web freelance

![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.17-purple)

Site vitrine professionnel de **Christophe Mostefaoui**, développeur web full-stack freelance basé à **Pau et Artix (64)**, fondateur de [SmartPlanning.fr](https://smartplanning.fr/). Services à distance partout en France, déplacement gratuit dans le 64.

> Site en ligne : [christophe-dev-freelance.fr](https://christophe-dev-freelance.fr)

---

## Parti pris éditorial

Le site assume un **design éditorial sobre et humain**, à contre-courant de l'esthétique « SaaS futuriste » générée par IA (gradients bleu/violet, glassmorphism, orbes flous, particules, emojis pills). L'objectif : que personne ne puisse dire « ce site a été vibe-codé en 10 minutes ».

**Palette unique** :

- `#0B0805` — encre profonde (Hero, Footer)
- `#13110F` — encre (sections sombres alternées)
- `#F4EFE6` — papier crème (sections claires)
- `#F4D35E` — jaune surligneur (seul accent couleur)
- `#1A1715` — encre texte sur fond clair

**Typographie** :

- **Fraunces** (italique) — titres et accents éditoriaux
- **Inter Tight** — corps de texte
- **Caveat** — légendes manuscrites et signatures

**Vocabulaire visuel récurrent** :

- Numérotation en chiffres romains (`I. II. III.` …) — sommaire de magazine
- Hairlines (traits 1px) entre les blocs au lieu de cartes arrondies
- Citations manuscrites signées en bas de chaque section
- Aucun gradient, aucun glassmorphism, aucun emoji décoratif
- Animations Framer Motion **discrètes** (fade + translation, jamais de scale agressif)

---

## Structure du site

Le site est une **single page** avec ancres + un ensemble de pages secondaires (légales, blog, pages locales SEO).

### Sections de la home (9 sections, ordre narratif)

| #    | Section             | Composant                     | Fond                        | Rôle                                    |
| ---- | ------------------- | ----------------------------- | --------------------------- | --------------------------------------- |
| I    | Hero                | `Hero.tsx`                    | image Pau coucher de soleil | Promesse                                |
| II   | À propos            | `About.tsx`                   | crème                       | Identité + portrait montagne + vidéo 1  |
| III  | SmartPlanning       | `SmartPlanningShowcase.tsx`   | sombre                      | Projet entrepreneurial + liens sociaux  |
| IV   | Services            | `Services.tsx`                | crème                       | 6 services en grille 2 colonnes         |
| V    | Tarifs              | `Pricing.tsx`                 | sombre                      | Méthode + encart Vidéo & Drone (Lottie) |
| VI   | FAQ                 | `FeaturedSnippetsFAQ.tsx`     | crème                       | 9 questions à la 1ère personne          |
| VII  | Portfolio           | `Portfolio.tsx`               | sombre                      | Projet fondateur + mosaïque 6 projets   |
| VIII | Zone d'intervention | `ServiceArea.tsx`             | crème                       | SEO local (25 villes)                   |
| IX   | Contact             | `seo/GMBOptimizedContact.tsx` | crème                       | Formulaire + vidéo 2 + infos            |

### Pages secondaires

- `/mentions-legales` — `pages/LegalNotice.tsx`
- `/politique-de-confidentialite` — `pages/PrivacyPolicy.tsx`
- `/blog` + `/blog/:slug` — blog éditorial SEO/GEO, lié depuis Header et Footer
- `/creation-site-internet-{pau,bayonne,biarritz,orthez-bearn}` — pages locales SEO (`pages/LocalLanding.tsx` + `data/localPages.ts`)
- `/faq` — redirige vers `/#faq` (ancre home)
- `*` — page 404 éditoriale (`pages/NotFound.tsx`)

### Layout

- `layout/Header.tsx` — Navbar transparente sur Hero, opaque crème au scroll
- `layout/Footer.tsx` — Footer encre 4 colonnes avec colophon manuscrit
- `AIChatbot.tsx` — Widget assistant Mistral en bas à droite

---

## Stack technique

### Core

- **React 18.3** avec **TypeScript 5.5** (strict mode, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`)
- **Vite 5.4** — build optimisé, Terser, cssnano, code splitting
- **Tailwind CSS 3.4** + PostCSS + Autoprefixer
- **React Router DOM 6.22** avec lazy loading

### UI & Animations

- **Framer Motion 12.17** — animations sobres (fade + translation, courbe ease-out)
- **Lottie React 2.4** — animations chatbot, drone, montage vidéo, thinking (footer)
- **Lucide React** — icônes vectorielles cohérentes (strokeWidth 1.5), utilisées partout y compris le blog depuis sa refonte éditoriale

### Formulaires & Communication

- **EmailJS 4.4** — formulaire de contact sans backend
- Inputs HTML5 optimisés mobile (`autoComplete`, `inputMode`, `autoCapitalize`)

### SEO

- **React Helmet Async 2.0** — meta tags dynamiques
- Hook personnalisé `useStructuredData` — agrège 5 sources de schemas JSON-LD
- Schemas : `Organization`, `Person`, `ProfessionalService`, `LocalBusiness`, `FAQPage`, `VideoObject`, `CreativeWork`, `WebSite`, `BreadcrumbList`, `ContactPage`

### Chatbot IA

- API **Mistral AI** (`mistral-small-latest`) en streaming, appelée via un **proxy PHP serveur** (`public/api/chat.php`), jamais directement depuis le client
- Clé API **hors webroot** sur Hostinger (fichier `mistral-key.php` au-dessus de `public_html`), aucun secret dans le bundle (aucune variable `VITE_*`)
- Rate limiting côté serveur (10 req/min/IP, 500/jour global), origine vérifiée
- Capture de leads par email (EmailJS) avec transcript de conversation, relances contextuelles
- Persistance de la conversation en `sessionStorage`
- En dev local, le PHP n'est pas exécuté : le chatbot affiche un message d'erreur générique (comportement attendu, voir `npm run dev` ci-dessous)

---

## Mobile-first

Le site est pensé d'abord pour mobile (375px et plus). Détails techniques :

- **Viewport meta** : `width=device-width, initial-scale=1.0`
- **Anti-overflow horizontal** : `overflow-x: hidden` sur `html`, `body`, `#root`, `.App`, `main`
- **Inputs formulaire à 16px** pour empêcher le zoom automatique de Safari iOS au focus
- **Attributs HTML5 mobiles** systématiques :
  - `autoComplete` (name, email, tel, address-level2)
  - `inputMode` (email, tel) — déclenche le bon clavier
  - `autoCapitalize` (words, sentences, off selon le champ)
  - `spellCheck={false}` sur l'email
- **Target sizes** : CTA principaux dimensionnés ≥ 44×44px
- **Pas de hover-only** : tous les états interactifs ont une version focus/active visible
- **Lock du scroll body** quand le menu mobile est ouvert (jusqu'à 1023px)
- **Footer** : grille 2 colonnes sur mobile (Navigation + Ailleurs côte à côte) pour éviter le scroll excessif
- **Lottie** dimensionnés en fonction du breakpoint (taille minimum garantie sur mobile)

---

## Installation

```bash
# Cloner le repository
git clone https://github.com/krismos64/Christophe-Mostefaoui-Dev
cd Christophe-Mostefaoui-Dev

# Installer les dépendances
npm install

# Copier le template de variables d'environnement
cp .env.example .env
# Puis remplir .env avec les clés EmailJS (le chatbot Mistral n'a pas de
# variable côté client, voir section Chatbot IA ci-dessous)

# Lancer le serveur de développement
npm run dev
```

### Variables d'environnement

Voir `.env.example` pour le template complet.

```env
# EmailJS — formulaire de contact
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_USER_ID=...

# Mistral AI — chatbot
# AUCUNE variable ici : la clé vit côté serveur uniquement, hors webroot,
# hors repo, hors CI. Voir docs/mistral-ai-setup.md.
```

> **Sécurité — règle absolue** : jamais de secret dans une variable `VITE_*`, tout finit en clair dans le bundle client livré au navigateur.

---

## Architecture du projet

```
src/
├── components/
│   ├── common/
│   │   ├── ErrorBoundary.tsx       # Error boundary global
│   │   └── VideoEmbed.tsx          # Embed YouTube inline réutilisable
│   ├── layout/
│   │   ├── Header.tsx              # Navbar éditoriale + menu mobile chiffres romains
│   │   └── Footer.tsx              # Footer 4 cols + colophon manuscrit
│   ├── sections/                   # Sections de la home (ordre narratif I→VIII)
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── SmartPlanningShowcase.tsx
│   │   ├── Services.tsx
│   │   ├── Pricing.tsx
│   │   ├── FeaturedSnippetsFAQ.tsx
│   │   ├── Portfolio.tsx
│   │   ├── ServiceArea.tsx
│   │   └── BlogSection.tsx         # Utilisé uniquement par /blog
│   ├── seo/
│   │   ├── GMBOptimizedContact.tsx # Section Contact effective de la home (IX)
│   │   └── LLMOptimizedHead.tsx    # Meta tags optimisés LLM
│   └── AIChatbot.tsx               # Widget Mistral éditorial
├── pages/                          # Pages routées (lazy-loaded)
│   ├── Blog.tsx
│   ├── BlogPost.tsx
│   ├── LocalLanding.tsx            # 4 pages SEO locales (Pau, Bayonne, Biarritz, Orthez)
│   ├── LegalNotice.tsx
│   ├── PrivacyPolicy.tsx
│   └── NotFound.tsx                # Catch-all éditorial
├── utils/
│   ├── structured-data-final.tsx   # Schemas JSON-LD agrégés
│   ├── seo-advanced.tsx            # Meta LLM optimisés
│   ├── featured-snippets-content.tsx  # FAQ 1ère personne
│   └── analytics.ts                # Helpers dataLayer (no-op : GTM retiré en 07/2026, site 100% cookieless)
├── hooks/
│   ├── useStructuredData.ts
│   └── useNavigation.ts
├── data/
│   ├── blogPosts.ts                # Articles du blog (contenu éditorial PME/artisans)
│   └── localPages.ts               # Contenu des 4 pages locales SEO
├── context/
│   └── ThemeContext.tsx            # Mode clair/sombre + localStorage
├── config/
│   └── emailjs.ts
├── animations/                     # Lottie (4 fichiers)
│   ├── chatbot.json                # Bouton flottant + menu mobile
│   ├── thinking.json               # Footer
│   ├── Drone Camera.json           # Section Pricing
│   └── Cut Video.json              # Section Pricing
├── types/
│   └── common.ts                   # MenuItem, Theme, ThemeContextType
└── App.tsx
```

### Fichiers publics (SEO + LLM)

```
public/
├── sitemap.xml                 # home + blog + articles + pages locales + légales
├── robots.txt                  # GPTBot, Claude-Web, ChatGPT-User, CCBot autorisés
├── llms.txt                    # Fiche synthétique pour LLM
├── llms-full.txt               # Base de connaissances complète
├── chatbot-knowledge.txt       # Base de connaissances du chatbot
├── humans.txt                  # Crédits humains
├── manifest.json               # PWA manifest
├── api/
│   └── chat.php                # Proxy Mistral (streaming, rate limit, clé hors webroot)
└── .well-known/
    └── ai-plugin.json          # Plugin IA standard
```

> Le contenu de chaque page importante (home, blog, articles, pages locales) est **pré-rendu en HTML statique** au build (`scripts/prerender.mjs`), lisible sans exécution de JavaScript — essentiel pour les robots d'indexation IA (GPTBot, ClaudeBot…) qui n'exécutent pas toujours le JS.

---

## Services proposés

> **Devis sur mesure uniquement.** Aucune grille tarifaire publique : chaque projet fait l'objet d'une proposition adaptée après un premier échange gratuit. Devis sous 24h.

| #   | Service                   | Description                                                    |
| --- | ------------------------- | -------------------------------------------------------------- |
| I   | Site Vitrine Moderne      | Présence en ligne pro, visible Google + assistants IA          |
| II  | Site Multi-pages          | Site complet avec blog, formulaire, CMS autonome               |
| III | Refonte de Site           | Modernisation d'un site existant                               |
| IV  | Chatbot intelligent       | Assistant IA 24h/24 (démontré par le chatbot du site)          |
| V   | Référencement Google & IA | SEO classique + optimisation LLM (ChatGPT, Claude, Perplexity) |
| VI  | Vidéo & Drone (DGAC)      | Final Cut Pro + DJI Mavic Air certifié DGAC                    |

---

## Déploiement

### Build de production

```bash
npm run build      # tsc + vite build + pré-rendu Puppeteer (dist/*.html statiques)
npm run build:spa  # Build sans pré-rendu (debug)
npm run preview    # Aperçu local du build
```

### Déploiement automatique (Hostinger via GitHub Actions)

Chaque push sur `main` déclenche `.github/workflows/deploy.yml` :

1. Build complet (`tsc` + `vite build` + pré-rendu)
2. Vérification que `dist/.htaccess` et `dist/.well-known/` sont bien présents (le workflow échoue sinon)
3. Synchronisation FTPS de `dist/` vers la racine du compte FTP Hostinger (`server-dir: ./`, qui EST `public_html`)

`public/.htaccess` est l'unique source de la config Apache (HTTPS, redirection www→non-www, fallback SPA, pages pré-rendues servies en priorité, cache, en-têtes de sécurité).

Aucun upload manuel : il suffit de merger sur `main`.

---

## Optimisations SEO

### SEO technique

- Title HTML statique avec nom + localisation + technologies (lu par les bots avant le JS)
- Meta description ciblée (Pau, 64, React, Node, TypeScript)
- Open Graph (image 1200×630 absolue) + Twitter Card `summary_large_image`
- Canonical URLs dynamiques
- Sitemap XML synchronisé avec robots.txt
- Page 404 éditoriale avec `noindex` (évite le crawl des URLs cassées)

### Schemas JSON-LD

- **Organization** + **Person** — entité principale
- **ProfessionalService** + **LocalBusiness** — SEO local (Pau + zone 64 + France)
- **FAQPage** — 9 questions/réponses pour featured snippets
- **VideoObject** — 2 vidéos YouTube
- **CreativeWork** — 7 projets portfolio (1 fondateur + 6 clients)
- **BreadcrumbList**, **WebSite**, **ContactPage**

### Optimisation LLM (ChatGPT, Claude, Perplexity, Gemini)

- `llms.txt` + `llms-full.txt` — base de connaissances structurée
- `chatbot-knowledge.txt` — contexte chatbot
- `.well-known/ai-plugin.json` — plugin IA standard
- Meta tags `ai-content-type`, `llm-context`, `llm-capabilities` via `LLMOptimizedHead`
- `robots.txt` autorisant les bots IA légitimes

### Conformité E-E-A-T

- Aucune stat inventée (notes, nombre d'avis, témoignages factices)
- Aucun numéro de téléphone fictif
- Cohérence du nom, des services et de l'expérience sur tous les schemas

---

## Contact

- **Email** : christophe.mostefaoui.dev@gmail.com
- **Téléphone** : 06 79 08 88 45
- **Localisation** : Artix / Pau (64) — Pyrénées-Atlantiques
- **Site** : [christophe-dev-freelance.fr](https://christophe-dev-freelance.fr)
- **Portfolio technique** : [krismos.fr](https://krismos.fr/)
- **SmartPlanning** : [smartplanning.fr](https://smartplanning.fr/)
- **LinkedIn** : [christophemostefaoui](https://www.linkedin.com/in/christophemostefaoui/)
- **GitHub** : [krismos64](https://github.com/krismos64)
- **YouTube** : [@christophe-dev-freelance](https://www.youtube.com/@christophe-dev-freelance/videos)

---

## Scripts disponibles

```bash
npm run dev          # Serveur de développement (Vite HMR) — le chatbot est HS en dev, le proxy PHP n'est pas exécuté
npm run build        # Build de production (tsc + vite build + pré-rendu Puppeteer)
npm run build:spa    # Build sans pré-rendu (debug)
npm run preview      # Preview du build
```

---

## Licence

© 2026 Christophe Mostefaoui — Tous droits réservés.
