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
  SmartPlanning) — ne pas dupliquer entre les deux.
  `ProfessionalService #business` est la SEULE entité décrivant l'activité :
  ne jamais redéclarer un `LocalBusiness` ou un `ContactPage` dans un composant
  (deux doublons sans `@id` retirés de `ServiceArea.tsx` et
  `GMBOptimizedContact.tsx` le 08/08/2026). Les horaires du JSON-LD doivent
  correspondre à ceux affichés à l'écran : 8h30-18h00
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

## SEO — Règles absolues
- **Priorité maximale** sur le SEO (Google + LLM)
- Le `<title>` dans `index.html` doit toujours inclure nom + localisation + technologies (c'est ce que les bots voient avant le JS)
- Image OG : toujours 1200x630, URL absolue
- **Jamais de contenu caché** (`display:none`, `className="hidden"`) pour du texte SEO — Google pénalise
- **Jamais de stats inventées** (vues, likes) dans les schemas — Google pénalise
- **Jamais de numéros fictifs** (+33-6-XX-XX-XX-XX) — vrai numéro : +33679088845
- Sitemap et robots.txt doivent rester cohérents (pas de Disallow ni de noindex sur une URL présente dans le sitemap — `/politique-de-confidentialite` est noindex donc volontairement HORS sitemap, mais pré-rendue via EXTRA_ROUTES)
- Google Search Console vérifié via meta tag dans index.html
- Seuils Lighthouse (mobile) : SEO 100, A11y 100, Best Practices 100 — atteints le 10/07/2026, ne pas régresser
- **Permissions des fichiers servis** : un fichier en mode 600 est renvoyé en 403
  par LiteSpeed et remonte en « Bloquée en raison d'une interdiction d'accès »
  dans la Search Console (vécu le 03/08/2026 sur `llms.txt` et `humans.txt`).
  Git ne versionne pas le bit de lecture : le workflow applique 644/755 sur
  `dist/` avant le sync et échoue si un fichier reste illisible. Diagnostic :
  `find dist -type f ! -perm -004`
- Piège JSX/a11y : les nœuds texte multi-lignes sont concaténés SANS espace dans le DOM → ne pas mettre d'aria-label « contenant » un texte visible multi-nœuds (règle axe label-content-name-mismatch) ; laisser le nom se calculer depuis le contenu

## Fichiers LLM (dans public/)
- `llms.txt` — fiche synthétique pour LLM (section « Blog » : les 7 articles)
- `llms-full.txt` — base de connaissances complète (section 9 : chaque article
  avec ses « questions auxquelles il répond », le format qui compte en GEO)
- `chatbot-knowledge.txt` — base de connaissances chatbot
- `.well-known/ai-plugin.json` — plugin IA standard (api.type = "none")
- **À TENIR À JOUR à chaque publication d'article** : les trois premiers fichiers
  (le skill `blog-article` détaille le format attendu)
- Les trois fichiers portent une liste « à ne pas attribuer à Christophe » (pas
  de tarifs chiffrés, pas d'avis clients, pas de sous-traitants, pas de logo,
  pas de stats de résultat) : garde-fou anti-hallucination pour les LLM externes
- `robots.txt` déclare les crawlers IA actuels : GPTBot, OAI-SearchBot,
  ClaudeBot (pas `Claude-Web`, déprécié), PerplexityBot, Google-Extended,
  Applebot, MistralAI-User, meta-externalagent

## Codes HTTP et .htaccess
- Un slug de blog inexistant renvoie **404**, les deux articles supprimés en
  juillet 2025 renvoient **410**, via `public/.htaccess`. La page `/404` est
  pré-rendue (`EXTRA_ROUTES` de `scripts/prerender.mjs`) et servie par
  `ErrorDocument`. Avant : le fallback SPA renvoyait la home en 200, ce qui
  créait du contenu dupliqué (« Explorée, actuellement non indexée » en GSC)
- **PIÈGE** : toute règle insérée AVANT le fallback SPA casse `/blog` en 301.
  `dist/blog/` est un dossier réel, `mod_dir` ajoute le trailing slash avant que
  `blog.html` soit servi. `DirectorySlash Off` corrige. Après toute modification
  du `.htaccess`, tester `/blog` en priorité (attendu 200), puis tout le sitemap

## Rédaction — Règles absolues (tout contenu visible : articles, pages, meta, chatbot)
- **Jamais de tiret cadratin (—) ni demi-cadratin (–)** : marqueur d'écriture IA.
  Virgule, deux-points ou parenthèses. Règle prospective : ne pas corriger
  rétroactivement l'existant sauf demande
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
