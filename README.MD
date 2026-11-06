# Portfolio — Christophe Mostefaoui, développeur web freelance

![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Vite](https://img.shields.io/badge/Vite-5.4-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.17-purple)

Site vitrine professionnel de **Christophe Mostefaoui**, développeur web full-stack freelance basé à **Pau et Artix (64)**, fondateur de [SmartPlanning.fr](https://smartplanning.fr/). Services à distance partout en France, déplacement gratuit dans le 64.

> Site en ligne : [christophe-dev-freelance.fr](https://christophe-dev-freelance.fr)

---

## Parti pris visuel (refonte du 05/11/2026)

Charte « Pied des Pyrénées » : un site qui parle simplement aux TPE et PME
locales non techniques, ancré dans le paysage du Béarn et du Pays basque.
Le mode sombre a été retiré à la refonte.

**Couleurs** (déclarées dans `tailwind.config.js`) :

- `foret` `#12312B` (fonds verts, texte principal), avec `foret-profond` `#0B2420`, `foret-moyen` `#24594C`, `foret-clair` `#3E7A68`, `foret-brume` `#C5D3CC`
- `soleil` `#F2A25C` (accent, boutons ; texte des boutons en `foret`), `soleil-clair` `#F7C08E`
- `creme` `#F5F1E8` (fond des pages), `neige` `#E8EFEC`

Sur fond crème, l'orange n'est jamais utilisé pour du texte (contraste 1,84:1) :
les accents texte y passent en `foret-moyen`.

**Typographie** (auto-hébergée, aucune requête vers Google Fonts) :

- **Bricolage Grotesque** : titres et texte
- **JetBrains Mono** : étiquettes et petits détails techniques

**Motion design** : tout est dessiné en SVG dans la page, rien à télécharger.

- Hero : montagnes en 3 plans avec parallaxe à la souris, titre qui monte mot à mot, fenêtre « votre-entreprise.fr » qui se construit en boucle (devanture, cartes horaires / nous trouver / nous appeler)
- Home, cartes Services : six petites scènes (boutique qui ouvre, page qui déploie ses fiches, refonte, assistant, repère sur un plan, drone), avec un élément orange qui porte le sens dans chacune (`home/ServicesScenes.tsx`)
- Home : scène « le bureau de Christophe » (`home/BureauAnime.tsx`)
- Zone d'intervention : voiture de Bayonne à Pau puis signal vers l'écran de visio, où apparaît la photo de Christophe (`sections/TrajetAnime.tsx`)
- À propos : portrait en arche, soleil et anneau animés, Pyrénées au pied (`sections/About.tsx`)
- Blog : feuille qui se remplit et signet qui se pose, un seul cycle, grands écrans (`sections/BlogScene.tsx`)
- Réalisations : chaque site présenté dans un portable et un téléphone posés sur un bureau, montage par script (voir « Vignettes des réalisations »)
- Règles : animations en `transform`/`opacity` seulement, jamais d'`opacity: 0` de départ dans le hero (le pré-rendu est remplacé au chargement du JS, voir Performances), pause hors écran (`hooks/usePauseHorsEcran.ts`), état fixe et complet en mode « réduire les animations »

---

## Structure du site

Site multi-pages depuis le 05/11/2026. La home résume et renvoie vers les pages
intérieures ; les ancres `#services`, `#portfolio`, `#about` et `#faq` restent
sur la home pour ne casser aucun lien existant.

### Home (`src/App.tsx`)

| Section | Composant | Rôle |
| --- | --- | --- |
| Hero | `sections/Hero.tsx` | Promesse, devis, liens vers les 4 pages locales |
| Services (aperçu) | `home/Apercus.tsx` + `home/ServicesScenes.tsx` | 6 services en cartes animées, lien vers `/services` |
| Réalisations (aperçu) | `home/Apercus.tsx` | Lune-Soleil, Cabinet Infirmier Graslin, SmartPlanning, lien vers `/realisations` |
| À propos (aperçu) | `home/Apercus.tsx` + `home/BureauAnime.tsx` | Présentation courte, lien vers `/a-propos` |
| FAQ | `sections/FeaturedSnippetsFAQ.tsx` | 9 questions en `<details>` (réponses dans le HTML pré-rendu) |
| Zone d'intervention | `sections/ServiceArea.tsx` + `sections/TrajetAnime.tsx` | SEO local, villes du 64 et de France |

Le formulaire de contact n'est plus sur la home : un ancien lien `/#contact`
ouvre `/contact`.

### Pages intérieures

Chacune a `seo/PageSeo.tsx` (titre, canonical, WebPage + BreadcrumbList) et
`layout/PageHero.tsx` (bandeau vert, fil d'Ariane, h1 unique).

- `/services` : `pages/ServicesPage.tsx` (Services + Pricing)
- `/realisations` : `pages/Realisations.tsx` (Portfolio + SmartPlanning, données dans `data/realisations.ts`)
- `/a-propos` : `pages/APropos.tsx` (About avec le portrait en arche, vidéo « Mon univers digital »)
- `/contact` : `pages/Contact.tsx` (vidéo de présentation, avis Google, formulaire, zone d'intervention)
- `/blog` : `pages/Blog.tsx` (PageHero + scène animée, article à la une, grille illustrée, filtres) ; `/blog/:slug` : `pages/BlogPost.tsx`
- `/creation-site-internet-{pau,bayonne,biarritz,orthez-bearn}` : pages locales (`pages/LocalLanding.tsx` + `data/localPages.ts`)
- `/mentions-legales`, `/politique-de-confidentialite` (noindex)
- `/faq` : redirige vers `/#faq` (règle du `.htaccess`)
- `*` : page 404 (`pages/NotFound.tsx`)

### Layout

- `layout/Header.tsx` : navbar transparente sur le hero, verte au défilement, lien Contact et bouton « Devis gratuit » ; menu burger sous 1280 px
- `layout/Footer.tsx` : navigation, coordonnées, lien vers la fiche Google
- `common/RemiseEnHaut.tsx` : remet la page en haut à chaque changement de page (placé DANS le `<Suspense>`)
- `common/LienContact.tsx` : vrai lien `/contact`, défile vers le formulaire s'il est sur la page
- `AIChatbot.tsx` : assistant Mistral en bas à droite

---

## Stack technique

### Core

- **React 18.3** avec **TypeScript 5.5** (strict mode, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`)
- **Vite 5.4** — build optimisé, Terser, cssnano, code splitting
- **Tailwind CSS 3.4** + PostCSS + Autoprefixer
- **React Router DOM 6.22** avec lazy loading

### UI & Animations

- **Framer Motion 12.17** : apparitions au défilement (fondu + translation) ; le motion design du hero et des scènes est en CSS et SVG
- **Lottie React 2.4** — animations chatbot, drone, montage vidéo, thinking (footer), toutes chargées à la demande via `LazyLottie` (voir Performances)
- **Lucide React** — icônes vectorielles cohérentes (strokeWidth 1.5), utilisées partout y compris le blog depuis sa refonte éditoriale

### Formulaires & Communication

- **EmailJS 4.4** — formulaire de contact sans backend
- **Brouillons de réponse** (depuis le 30/09/2026) : après l'envoi EmailJS, le formulaire appelle `public/api/contact-hook.php`, qui relaie la demande à un scénario Make ; Mistral y rédige un brouillon déposé dans Gmail, relu par Christophe avant envoi. Un échec du relais ne bloque jamais le formulaire. Détail : `docs/automatisation-formulaire-make.md`
- Inputs HTML5 optimisés mobile (`autoComplete`, `inputMode`, `autoCapitalize`)

### SEO

- **React Helmet Async 2.0** — meta tags dynamiques
- Hook `useStructuredData` (schémas de la home) et composant `PageSeo` (schémas des pages intérieures)
- Schemas : `Organization`, `Person`, `ProfessionalService` (identité, inlinés dans `index.html`), `FAQPage`, `VideoObject`, `CreativeWork`, `WebPage`, `SoftwareApplication` (page)

### Chatbot IA

- API **Mistral AI** (`mistral-small-2603`, version figée volontairement : l'alias `-latest` pointait vers un modèle retiré par Mistral) en streaming, appelée via un **proxy PHP serveur** (`public/api/chat.php`), jamais directement depuis le client
- Compte Mistral en **Pay-As-You-Go actif** : sans lui, l'API refuse les appels par clé en 429, quel que soit le volume (voir `docs/mistral-ai-setup.md`)
- Clé API **hors webroot** sur Hostinger (fichier `mistral-key.php` au-dessus de `public_html`), aucun secret dans le bundle (aucune variable `VITE_*`)
- Rate limiting côté serveur (10 req/min/IP, 500/jour global), origine vérifiée. Les compteurs par IP (empreinte SHA-256) sont purgés au bout de 24 h, durée annoncée dans la politique de confidentialité
- Capture de leads par email (EmailJS) avec transcript de conversation, relances contextuelles
- Persistance de la conversation en `sessionStorage`, effaçable via un bouton dédié (confirmation en deux temps)
- Affichage plein écran optionnel (masqué sous 640px), colonne de texte limitée pour garder des lignes lisibles
- Effet machine à écrire côté client : le texte reçu par paquets réseau irréguliers est réaffiché à cadence régulière
- Rendu des réponses : `**gras**`, listes à tirets et liens `[texte](url)` cliquables (internes via React Router, le chat reste ouvert)
- Base de connaissances `public/chatbot-knowledge.txt` injectée côté serveur, incluant la liste des articles de blog que l'assistant peut proposer
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
- **Lock du scroll body** quand le menu mobile est ouvert (jusqu'à 1279px, tant que le burger est affiché)
- **Footer** : grille 2 colonnes sur mobile (Navigation + Ailleurs côte à côte) pour éviter le scroll excessif
- **Lottie** dimensionnés en fonction du breakpoint (taille minimum garantie sur mobile), avec conteneur à hauteur fixe pour éviter tout décalage au chargement différé

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
│   │   ├── LazyLottie.tsx          # Lottie différé + respect de prefers-reduced-motion
│   │   ├── LienContact.tsx         # Lien /contact, défile si le formulaire est sur la page
│   │   ├── OptimizedPicture.tsx    # <picture> AVIF/WebP multi-tailles
│   │   ├── RemiseEnHaut.tsx        # Retour en haut à chaque changement de page
│   │   └── VideoEmbed.tsx          # Embed YouTube inline réutilisable
│   ├── home/
│   │   ├── Apercus.tsx             # Aperçus Services, Réalisations, À propos de la home
│   │   ├── BureauAnime.tsx         # Scène SVG animée « le bureau de Christophe »
│   │   └── ServicesScenes.tsx      # Six scènes SVG animées des cartes Services
│   ├── layout/
│   │   ├── Header.tsx              # Navbar + menu burger (sous 1280 px)
│   │   ├── Footer.tsx
│   │   └── PageHero.tsx            # Bandeau vert + fil d'Ariane + h1 des pages intérieures
│   ├── sections/
│   │   ├── Hero.tsx                # Hero Pyrénées + fenêtre « votre-entreprise.fr »
│   │   ├── About.tsx               # /a-propos (portrait en arche animé)
│   │   ├── SmartPlanningShowcase.tsx # /realisations
│   │   ├── Services.tsx            # /services
│   │   ├── Pricing.tsx             # /services (méthode, devis, vidéo et drone)
│   │   ├── Portfolio.tsx           # /realisations (projet fondateur + grille, CreativeWork)
│   │   ├── FeaturedSnippetsFAQ.tsx # FAQ de la home
│   │   ├── ServiceArea.tsx         # Zone d'intervention (home, /contact)
│   │   ├── TrajetAnime.tsx         # Scène SVG animée Bayonne → Pau → visio
│   │   ├── GoogleReviews.tsx       # Avis Google + lien vers la fiche
│   │   ├── BlogSection.tsx         # /blog : article à la une, grille illustrée, filtres
│   │   └── BlogScene.tsx           # Scène SVG du bandeau du blog
│   ├── seo/
│   │   ├── GMBOptimizedContact.tsx # Formulaire de contact (/contact)
│   │   ├── PageSeo.tsx             # Meta + WebPage + BreadcrumbList des pages intérieures
│   │   └── LLMOptimizedHead.tsx    # Meta tags optimisés LLM
│   └── AIChatbot.tsx               # Widget Mistral
├── pages/                          # Pages routées (lazy-loaded)
│   ├── ServicesPage.tsx
│   ├── Realisations.tsx
│   ├── APropos.tsx
│   ├── Contact.tsx
│   ├── Blog.tsx
│   ├── BlogPost.tsx
│   ├── LocalLanding.tsx            # 4 pages SEO locales (Pau, Bayonne, Biarritz, Orthez)
│   ├── LegalNotice.tsx
│   ├── PrivacyPolicy.tsx
│   └── NotFound.tsx
├── utils/
│   ├── structured-data-final.tsx   # Schémas JSON-LD de page (home, vidéos, SmartPlanning)
│   ├── seo-advanced.tsx            # Meta LLM optimisés
│   └── analytics.ts                # Helpers dataLayer (no-op : GTM retiré en 07/2026, site 100% cookieless)
├── hooks/
│   ├── useStructuredData.ts
│   ├── useNavigation.ts
│   └── usePauseHorsEcran.ts        # Pause des scènes SVG hors écran / en mode réduit
├── data/
│   ├── faq.ts                      # FAQ de la home (affichage + schéma FAQPage)
│   ├── realisations.ts             # Projet fondateur + réalisations clients
│   ├── blogPosts.ts                # Articles du blog (contenu éditorial PME/artisans)
│   └── localPages.ts               # Contenu des 4 pages locales SEO
├── config/
│   └── emailjs.ts
├── animations/                     # Lottie (4 fichiers)
│   ├── chatbot.json                # Bouton flottant du chatbot
│   ├── thinking.json               # Footer
│   ├── Drone Camera.json           # Section Pricing
│   └── Cut Video.json              # Section Pricing
└── App.tsx
```

### Fichiers publics (SEO + LLM)

```
public/
├── sitemap.xml                 # home + blog + articles + pages locales + légales
├── robots.txt                  # GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot,
│                               # Google-Extended, Applebot, MistralAI-User… autorisés
├── llms.txt                    # Fiche synthétique pour LLM
├── llms-full.txt               # Base de connaissances complète
├── chatbot-knowledge.txt       # Base de connaissances du chatbot (lue aussi par Make)
├── humans.txt                  # Crédits humains
├── manifest.json               # PWA manifest
├── api/
│   ├── chat.php                # Proxy Mistral (streaming, rate limit, clé hors webroot)
│   └── contact-hook.php        # Relais du formulaire vers Make (brouillons Gmail)
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

## Blog

Articles éditoriaux visant les dirigeants de TPE/PME locales, pas les
développeurs (le contenu technique vit sur krismos.fr). Contenu dans
`src/data/blogPosts.ts`, publication assistée par le skill `blog-article`.

Le rendu (`src/pages/BlogPost.tsx`) accepte un Markdown volontairement limité :
`## H2`, `**gras**`, listes à tirets et liens `[texte](url)`. Les liens internes
passent par React Router et restent crawlables dans le HTML pré-rendu, ce qui
permet le maillage vers les autres articles et les pages locales.

Chaque article a deux images : celle affichée dans la page et dans les cartes
de `/blog`, déclinée en AVIF et WebP (400 et 800px) par
`scripts/optimize-images.sh`, et une image de partage social en 1200×630
suivant la convention `<slug>-og.jpg`. Champs SEO : `seoTitle` (balise title,
60 caractères au plus) et `metaDescription` (160 au plus).

La page `/blog` met en avant l'article `featured: true` (à la une, visible dès
le premier rendu, sans fondu), puis les autres en grille de cartes illustrées.
Un filtre de catégorie remplace la une par les seuls articles concernés.

Règles rédactionnelles : jamais de tarifs, jamais de statistiques invérifiables,
et pas de tirets cadratins (marqueur d'écriture IA). Avis Google vérifiés
autorisés depuis le 24/08/2026 (jamais d'avis inventés ou sollicités de façon
déguisée).

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
2. Normalisation des permissions (644 sur les fichiers, 755 sur les dossiers de `dist/`)
3. Vérification que `dist/.htaccess` et `dist/.well-known/` sont bien présents, et qu'aucun fichier n'est illisible par le serveur web (le workflow échoue sinon)
4. Synchronisation FTPS de `dist/` vers la racine du compte FTP Hostinger (`server-dir: ./`, qui EST `public_html`)

`public/.htaccess` est l'unique source de la config Apache (HTTPS, redirection www→non-www, fallback SPA, pages pré-rendues servies en priorité, cache, en-têtes de sécurité).

Aucun upload manuel : il suffit de merger sur `main`.

> **Note** : l'étape Deploy FTPS échoue parfois sur `Timeout (control socket)`
> alors que le build est vert. C'est une panne réseau ponctuelle côté Hostinger,
> pas un problème de code : relancer avec `gh run rerun <RUN_ID> --failed`.

> **Permissions** : un fichier commité en mode 600 est servi en **403** par
> LiteSpeed et signalé par la Search Console. Git ne versionne pas le bit de
> lecture, d'où la normalisation faite dans le workflow. Diagnostic local :
> `find dist -type f ! -perm -004`.

---

## Performances

Lighthouse mobile sur la home, mesuré en production le 12/08/2026 (avant la
refonte ; en local le 05/11/2026, la nouvelle home est à LCP 1,72 s contre
1,9 s pour l'ancienne, CLS 0, A11y/SEO/BP 100) :

| Métrique | Valeur |
| -------- | ------ |
| Performance | ~83 (médiane de 3 runs) |
| SEO / Accessibilité / Best Practices | 100 / 100 / 100 |
| LCP | 3,9 s |
| TBT | 20 ms |
| CLS | 0 |

### Chargement différé des animations

Les quatre animations Lottie étaient importées statiquement : 462 Ko de JSON
inlinés dans le bundle et parsés au démarrage, plus le moteur `lottie-web`, soit
732 ms de CPU avant le premier rendu. Or aucune n'est visible au chargement
(footer, section tarifs, menu mobile fermé, bouton flottant du chatbot).

`src/components/common/LazyLottie.tsx` ne récupère le moteur et le JSON qu'à
l'approche du viewport (`IntersectionObserver`, marge de 200 px), ou pendant un
moment d'inactivité (`requestIdleCallback`) pour les éléments visibles d'emblée.
Résultat : chunk `animations` de 454 à 117 Ko, TBT de 250 à 20 ms.

> **Deux pièges à connaître avant de toucher au découpage du bundle :**
>
> 1. Ne jamais nommer `lottie-react` dans le `manualChunks` de `vite.config.ts`,
>    cela le force dans un chunk chargé au démarrage et annule le mécanisme.
> 2. Le pré-rendu capture le DOM **après** exécution de React, donc il fige les
>    `<link rel="modulepreload">` que Vite injecte au moment de l'`import()`.
>    Sans nettoyage, le moteur (314 Ko) est retéléchargé avant le premier rendu.
>    Ce nettoyage vit dans `scripts/prerender.mjs`, pas seulement dans la config
>    Vite.

### Ce qui limite encore le LCP

Le TTFB oscille entre 620 et 650 ms, plancher du mutualisé Hostinger, soit un
sixième du LCP. Le reste tient au rendu React : `main.tsx` fait `createRoot`,
pas `hydrateRoot`, donc le HTML pré-rendu est remplacé au chargement du JS et
les animations CSS repartent de zéro. Un texte qui part d'`opacity: 0` devient
alors un LCP tardif (constaté : 3,9 s) : dans le hero, animer en `transform`
seulement. Passer à `hydrateRoot` reste à évaluer (risque de mismatch). Les polices ne
sont pas en cause : les `unicode-range` limitent le téléchargement à 4 fichiers
sur 8, et `font-display: swap` affiche le texte sans les attendre.

---

## Accessibilité

Le site vise 100/100 sur l'audit Accessibilité de Lighthouse, mais trois
mécanismes en place **ne sont détectés par aucun outil automatique** :

| Mécanisme | Où | Pourquoi |
|---|---|---|
| Lien d'évitement | `src/App.tsx` + `.skip-link` dans `src/index.css` | Permet de sauter la navigation au clavier. Premier élément focusable, visible seulement au focus, cible `id="contenu"` sur le `<main>` |
| `MotionConfig reducedMotion="user"` | `src/App.tsx`, autour du `<Router>` | Neutralise les animations Framer Motion selon le réglage système, sur tout le site d'un coup |
| `prefers-reduced-motion` | media query dans `src/index.css` + `matchMedia` dans `LazyLottie.tsx` | Le CSS ne peut rien sur Lottie, qui anime en JavaScript : `loop` et `autoplay` sont coupés |

Ces trois éléments sont invisibles en usage normal : les supprimer ne casse rien
à l'écran et ne fait pas baisser le score Lighthouse. Un hook `PostToolUse`
rappelle leur existence dès qu'on touche à `App.tsx` ou `index.css`, et les
règles de non-régression sont dans `CLAUDE.md`.

Autres points traités : contrastes vérifiés au calcul (le lien d'évitement est à
12,85:1), cibles tactiles de 44×44 px minimum, pas d'interaction au survol seul,
`lang="fr"` sur la racine, et le piège JSX où un `aria-label` ne peut pas
« contenir » un texte visible multi-nœuds (règle axe
`label-content-name-mismatch`).

## Optimisations SEO

### SEO technique

- Title HTML statique de la home orienté client : « Création de site internet à Pau (64) \| Christophe Mostefaoui » (06/11/2026, l'ancien visait « React.js, Node.js, TypeScript »)
- Titres de 60 caractères au plus et descriptions de 160 au plus sur toutes les pages (audit du 06/11/2026) ; les articles ont un `seoTitle` court, le titre long reste le h1
- Une seule balise `<main>` (celle de `App.tsx`) : les pages utilisent `<section>`
- Open Graph (image 1200×630 absolue) + Twitter Card `summary_large_image`
- Canonical URLs dynamiques
- Sitemap XML synchronisé avec robots.txt
- Page 404 éditoriale avec `noindex`, pré-rendue (`/404` dans `EXTRA_ROUTES`) et
  servie via `ErrorDocument` : un slug de blog inexistant renvoie un vrai **404**
  et les articles supprimés un **410**, au lieu de la home en 200 (qui créait du
  contenu dupliqué, d'où « Explorée, actuellement non indexée » en Search Console)

### Schemas JSON-LD

Schemas d'**identité**, inlinés statiquement dans `index.html` (lisibles sans JS),
présents sur toutes les pages et reliés par `@id` :

- **Organization** `#organization` + **Person** `#person`
- **ProfessionalService** `#business` : SEO local (Pau + zone 64 + France).
  **Seule** entité décrivant l'activité : ne jamais redéclarer de `LocalBusiness`
  dans un composant, cela crée une entité concurrente que Google doit départager
- **AggregateRating** + **Review**, portés par `#business` depuis le 24/08/2026 :
  uniquement des avis authentiques repris de la fiche Google Business Profile
  (Place ID `ChIJlTa-96dvUigRyeCBbLb8qkw`). Note et nombre d'avis doivent rester
  strictement alignés sur la fiche : un écart est une donnée structurée trompeuse

Schemas de **page**, générés par `structured-data-final.tsx` :

- **FAQPage** (home) : généré depuis `src/data/faq.ts`, donc identique au texte affiché
- **VideoObject** : vidéo de présentation sur `/contact`, « Mon univers digital » sur `/a-propos`
- **WebSite**, **WebPage** (home), **SoftwareApplication** (SmartPlanning, sur `/realisations`)
- **WebPage** + **BreadcrumbList** sur chaque page intérieure, via `PageSeo`

Schemas de page portés par leur propre composant :

- **CreativeWork** : une entrée par réalisation (fondateur compris), dans `Portfolio.tsx` sur `/realisations`
- **BlogPosting** + **BreadcrumbList** : un par article, dans `BlogPost.tsx`
- **WebPage** + **BreadcrumbList** + **FAQPage** sur les pages locales (`LocalLanding.tsx`), **BreadcrumbList** sur les mentions légales

> Les horaires déclarés dans le JSON-LD doivent correspondre à ceux affichés à
> l'écran (8h30-18h00) : Google compare le contenu visible aux données
> structurées et sanctionne les écarts.

### Optimisation LLM (ChatGPT, Claude, Perplexity, Gemini)

- `llms.txt` + `llms-full.txt` — base de connaissances structurée
- `chatbot-knowledge.txt` — contexte chatbot
- `.well-known/ai-plugin.json` — plugin IA standard
- Meta tags `ai-content-type`, `llm-context`, `llm-capabilities` via `LLMOptimizedHead`
- `robots.txt` autorisant les bots IA légitimes

### Conformité E-E-A-T

- Aucune stat inventée : les seules notes publiées sont les avis vérifiés de
  la fiche Google, jamais de témoignage hors Google ni de chiffre de résultat
- Aucun numéro de téléphone fictif
- Cohérence du nom, des services et de l'expérience sur tous les schemas
- Le texte d'un avis doit être **identique** partout où il apparaît : JSON-LD
  d'`index.html`, composant `GoogleReviews.tsx`, et les trois fichiers LLM. Un
  écart entre le balisage et la fiche publique est une donnée structurée
  trompeuse

### Fiche Google Business Profile

Place ID `ChIJlTa-96dvUigRyeCBbLb8qkw`. Établissement vérifié, réglé en « aucun
établissement physique » avec zones desservies (bon réglage pour un freelance).

Le site et la fiche sont reliés dans les deux sens : la fiche pointe vers
`https://christophe-dev-freelance.fr/`, le site déclare la fiche en `sameAs` et
`hasMap` dans le JSON-LD, et deux liens visibles y renvoient (bloc avis de la
page `/contact`, et footer).

Publication de posts à partir des articles de blog : `docs/posts-google-blog.md`
(textes prêts, gabarit de prompt image, format 4:3 1200x900).

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

Scripts hors npm :

```bash
scripts/optimize-images.sh          # AVIF + WebP multi-tailles de toutes les images listées
scripts/mockup/incruster.sh <nom>   # Vignette d'une réalisation (portable + téléphone)
```

### Vignettes des réalisations

Chaque site est montré dans un portable et un téléphone posés sur un bureau en
chêne. Le décor (`scripts/mockup/decor-portable.png`, écrans en vert et magenta
chroma) a été généré une seule fois avec Codex ; il est commun à toutes les
réalisations et ne doit pas être régénéré pour un seul projet. Les captures
réelles des sites (`scripts/mockup/captures/<nom>-ordi.png` en 1440×900 et
`<nom>-mobile.png` en 393×852 densité 3, bandeau de cookies masqué, jamais
accepté) sont posées en perspective sur les quatre coins de chaque écran.
Sans capture mobile, le téléphone reste éteint (cas de LivresStaka, en
maintenance au 06/11/2026). La sortie `public/assets/images/<nom>-mockup.jpg`
passe ensuite par `optimize-images.sh`.

`scripts/favicons/logo-1024.png` est la source des favicons, gardée hors du
site publié.

---

## Licence

© 2026 Christophe Mostefaoui — Tous droits réservés.
