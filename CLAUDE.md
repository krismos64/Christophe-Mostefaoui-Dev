# CLAUDE.md — Site Portfolio Christophe Mostefaoui

## Projet
Site vitrine freelance : **christophe-dev-freelance.fr**
Stack : Vite + React 18 + TypeScript + Tailwind CSS 3 + Framer Motion
Hébergement : Hostinger mutualisé (Apache + hPanel)

## Commandes
```bash
npm run dev        # Dev local (le chatbot est HS en dev : le proxy PHP n'est pas exécuté)
npm run build      # Build prod (tsc + vite build + pré-rendu Puppeteer)
npm run build:spa  # Build sans pré-rendu (debug)
npm run preview    # Preview build
```

## Déploiement (automatique)
- Chaque push sur `main` déclenche `.github/workflows/deploy.yml` : build +
  pré-rendu + sync FTPS de `dist/` vers la racine du compte FTP (= `public_html`)
- Secrets GitHub : `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`
- Smoke tests post-deploy : utiliser le skill `deploy-portfolio`
- `public/.htaccess` = unique source de la config Apache (HTTPS, www→non-www,
  SPA fallback, pages pré-rendues, cache, sécurité). Le workflow échoue si
  `dist/.htaccess` ou `dist/.well-known` manquent — ne pas retirer ce garde-fou

## Sécurité — Règle absolue
- **Jamais de secret dans une variable `VITE_*`** : tout finit en clair dans le
  bundle client (la clé Mistral a fuité comme ça en 2026)
- Clé Mistral : côté serveur uniquement, fichier `mistral-key.php` au-dessus de
  `public_html` sur Hostinger (hors webroot, hors repo, hors CI), lu par
  `public/api/chat.php` (proxy avec rate limiting — voir docs/mistral-ai-setup.md)

## Architecture clé
- `src/App.tsx` — routing principal, Home + pages lazy-loaded
- `scripts/prerender.mjs` — pré-rendu statique au build : chaque route du
  sitemap (+ EXTRA_ROUTES) devient un .html complet dans dist/, lisible par les
  crawlers sans JS (GPTBot, ClaudeBot…). Les fichiers sont PLATS (blog.html,
  pas blog/index.html) pour éviter la 301 trailing-slash d'Apache
- `public/api/chat.php` — proxy Mistral du chatbot (prompt système + modèle
  imposés côté serveur)
- JSON-LD : schémas d'IDENTITÉ (Organization, Person, ProfessionalService)
  inlinés statiquement dans `index.html` ; `src/utils/structured-data-final.tsx`
  ne génère que les schémas de PAGE (VideoObject, WebPage, FAQPage,
  SmartPlanning). Ne pas dupliquer entre les deux. Horaires du JSON-LD alignés
  sur l'écran : 8h30-18h00. Détail dans le skill `seo-geo-portfolio`
- `src/components/common/LazyLottie.tsx` — TOUTES les animations Lottie passent
  par ce composant (moteur + JSON chargés à l'approche du viewport). Ne jamais
  réimporter `lottie-react` directement, ni nommer ce paquet dans le
  `manualChunks` de `vite.config.ts` : les deux annulent le gain (TBT 250→20 ms).
  Le nettoyage des `modulepreload` qu'il implique vit dans `prerender.mjs`
- `src/hooks/useStructuredData.ts` — hook d'injection des schémas de page
- `src/components/seo/LLMOptimizedHead.tsx` — injecte les meta tags LLM
- `src/data/blogPosts.ts` — articles du blog (publication : skill `blog-article`)
- `src/pages/BlogPost.tsx` — rendu Markdown limité : `## H2`, `**gras**`, listes
  à tirets, liens `[texte](url)` (internes via React Router, donc crawlables).
  Pas de `# H1` dans `content` (le titre est déjà rendu en h1). L'image OG suit
  la convention `<imageUrl-sans-extension>-og.jpg`, distincte de l'image
  éditoriale affichée dans l'article
- `public/chatbot-knowledge.txt` — base de connaissances du chatbot, injectée
  côté serveur par `chat.php`. Contient la liste des articles de blog avec leurs
  liens : la tenir à jour à chaque publication

## SEO / GEO — voir le skill `seo-geo-portfolio`
Le détail (audit express, règles de non-régression, format des fichiers LLM,
crawlers IA, codes HTTP, pièges vécus) vit dans `.claude/skills/seo-geo-portfolio/`.
**L'invoquer avant toute modification de `index.html`, `public/.htaccess`,
`public/sitemap.xml`, `public/robots.txt`, `public/llms*.txt` ou des schémas
structurés**, et avant tout déploiement touchant une page publique.

Règles absolues, à connaître sans ouvrir le skill :
- **Priorité maximale** sur le SEO (Google + LLM)
- Seuils Lighthouse mobile : SEO 100, A11y 100, Best Practices 100. Ne pas régresser
- **Jamais de contenu caché** (`display:none`, `hidden`) pour du texte SEO
- **Jamais de stats inventées** (vues, likes, « +40% de conversions »)
- **Jamais de numéro fictif** : le vrai est +33679088845
- **Une seule entité d'activité** : `ProfessionalService #business` dans
  `index.html`. Ne jamais redéclarer un `LocalBusiness` ou un `ContactPage`
  dans un composant
- **`llms.txt`, `llms-full.txt` et `chatbot-knowledge.txt` sont à mettre à jour
  à chaque publication d'article** (le skill `blog-article` détaille le format)
- Après toute modification du `.htaccess`, **tester `/blog` en priorité**
  (attendu 200, pas 301)
- Piège JSX/a11y : les nœuds texte multi-lignes sont concaténés SANS espace dans le DOM → ne pas mettre d'aria-label « contenant » un texte visible multi-nœuds (règle axe label-content-name-mismatch) ; laisser le nom se calculer depuis le contenu

## Rédaction — Règles absolues (tout contenu visible : articles, pages, meta, chatbot)
- **Jamais de tiret cadratin (—) ni demi-cadratin (–)** : marqueur d'écriture IA.
  Virgule, deux-points ou parenthèses. Règle prospective : ne pas corriger
  rétroactivement l'existant sauf demande.
  **Exception validée le 10/08/2026** : les cadratins du GABARIT sont un parti
  pris typographique et restent en place (numérotation romaine « II. — Qui
  suis-je », signatures « — C.M. », légendes manuscrites, accroches du blog
  « IA accessible — »). La règle vise la prose rédigée, pas les séparateurs de
  design. Ne plus les signaler ni proposer de les remplacer
- **Jamais qualifier Christophe d'« expert »** (nettoyage fait le 03/08/2026,
  40 occurrences) : décrire ce qu'il fait ou citer un fait vérifiable. Exceptions
  conservées : le champ meta `ai-expertise`, le `@id` `#video-presentation-expert`,
  les requêtes d'internautes listées dans `llms-full.txt`, « votre expertise »
  quand la phrase s'adresse au client
- **Jamais de témoignages ni d'avis clients**, même anonymisés
- **Jamais de grille tarifaire** : devis sur mesure gratuit sous 24h
- Christophe travaille seul : pas d'agence, pas de sous-traitants, pas de
  « partenaires » à recommander. Pas de création de logo ni d'identité visuelle

## Données factuelles
- Christophe Mostefaoui, 38 ans
- Formation : Titre CDA Bac+3/4, La Fabrique Numérique Paloise
- Localisation : Pau / Artix (64), Pyrénées-Atlantiques
- Email : christophe.mostefaoui.dev@gmail.com | Tel : 06 79 08 88 45
- Projets phares : SmartPlanning.fr (SaaS), LivresStaka.fr (e-commerce)
- Tarifs : **devis sur mesure uniquement** — ne plus afficher de grille tarifaire publique (les prix faisaient fuir, positionnement valeur)

## Mots-clés SEO ciblés
Développeur web freelance Pau, freelance web 64, développeur Artix, React.js Node.js TypeScript Pau, intégration IA chatbot, application SaaS sur mesure, Pyrénées-Atlantiques, Béarn, Bayonne, Biarritz
