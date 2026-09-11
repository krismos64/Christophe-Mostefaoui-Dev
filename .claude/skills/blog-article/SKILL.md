---
name: blog-article
description: Rédiger et publier un article de blog SEO orienté client PME sur christophe-dev-freelance.fr. Utiliser quand Christophe demande un nouvel article, une idée d'article, ou la mise à jour du blog.
---

# Article de blog — christophe-dev-freelance.fr

Cible : **PME, TPE, indépendants locaux (64)** — PAS des développeurs. Le
contenu technique pointu vit sur krismos.fr ; ici on parle bénéfices métier,
coûts, délais, résultats. Objectif de chaque article : amener une demande de devis.

## Règles éditoriales (absolues)

- Vocabulaire accessible, exemples concrets de commerce/artisan/PME locale
- **Jamais de stats inventées** (vues, taux, nombre de clients invérifiable)
- **Jamais de grille tarifaire** — toujours « devis sur mesure gratuit sous 24h »
- **Avis Google vérifiés autorisés depuis le 24/08/2026** (fiche GBP validée,
  premiers vrais avis reçus) : uniquement des avis authentiques de la fiche
  Google, jamais inventés ni sollicités de façon déguisée. Pas de témoignages
  hors Google sans vérification équivalente
- **Jamais de tiret cadratin (—) ni demi-cadratin (–) dans le texte** de
  l'article : marqueur d'écriture IA. Virgule, deux-points ou parenthèses selon
  le contexte. Vérifier avant commit, y compris dans `excerpt` et
  `metaDescription`.
  **Exception (décidée le 10/08/2026)** : les cadratins du GABARIT sont du
  design assumé et restent en place. Sur une page d'article pré-rendue, trois
  occurrences sont normales et ne viennent pas du contenu : l'accroche
  manuscrite du hero, celle du bloc de fin (« cet article vous a intéressé — »)
  et la signature « — 2026 » du footer. Un `grep` de cadratins sur le HTML de
  `dist/` compte donc 3 (plus 1 dans un commentaire HTML) même quand l'article
  est propre : vérifier la source dans `blogPosts.ts`, pas le HTML.
  **S'ajoute un cadratin par item de liste** : les puces sont dessinées en CSS
  par `before:content-['—']` dans `BlogPost.tsx`. Un article avec 9 puces compte
  donc 12 cadratins dans le HTML sans qu'aucun vienne du texte. Le seul contrôle
  qui fait foi : `grep` sur l'objet de l'article dans `blogPosts.ts`
- **Ne jamais qualifier Christophe d'« expert »** : décrire ce qu'il fait, ou
  citer un fait vérifiable (fondateur de SmartPlanning, 10 ans d'informatique)
- Mots-clés locaux à travailler naturellement : Pau, Artix, Béarn, Bayonne,
  Biarritz, Pyrénées-Atlantiques, 64
- CTA final : formulaire de contact (#contact) + 06 79 08 88 45
- Un seul H1 (le titre), hiérarchie H2/H3 propre, meta description 150-160 chars
  (contrôler la longueur, 165 caractères passe inaperçu à l'écriture)
- 1200-2000 mots ; sujets orientés décision d'achat (« Combien coûte… »,
  « Faut-il refaire mon site ? », « Un chatbot pour mon commerce ? »)

## Formatage supporté dans `content`

`BlogPost.tsx` rend un Markdown volontairement limité. Ce qui marche :

- `## Titre` pour les sections (H2)
- `**gras**` en ligne
- listes à tirets `- item`
- **liens `[texte](url)`** : internes via React Router (crawlables dans le HTML
  pré-rendu), externes en nouvel onglet

Ce qui ne marche PAS : `# H1` (le titre est déjà rendu en h1, doublon), tableaux,
images en ligne, `*italique*`, code.

**Maillage interne** : placer 2 ou 3 liens vers d'autres articles ou vers les
pages locales (`/creation-site-internet-pau`, `-bayonne`, `-biarritz`,
`-orthez-bearn`), intégrés dans une phrase, pas en liste. Piège : le chemin d'un
article est `/blog/<slug>`, pas `/<slug>`.

## Processus de publication (dans cet ordre)

1. **Écrire l'article** dans `src/data/blogPosts.ts` : nouvel objet en tête du
   tableau, `id` = celui du premier article du tableau + 1 (les ids ne
   correspondent PAS au rang : 11 articles portent les ids 6 à 16, héritage de
   la purge de 2026), en respectant strictement l'interface existante
   (slug kebab-case, `metaDescription`, `imageUrl`). `featured: false` sauf
   décision contraire (l'article prix est le `featured: true` actuel)
2. **Image** — pipeline établi, à suivre tel quel :
   a. Demander l'image à Christophe (il la génère via ChatGPT) en lui
      fournissant un prompt : ~1672×941, photo réaliste, lumière dorée, sans
      texte ni logo
   b. La renommer `<slug>.png` dans `public/assets/images/`
   c. Ajouter une ligne dans la liste `JOBS` de `scripts/optimize-images.sh` :
      `"public/assets/images/<slug>.png|400,800|78|30"`, puis lancer le script
      (génère les AVIF/WebP dans `optimized/`)
   d. Générer l'image OG **1200×630** nommée `<slug>-og.jpg` (convention lue par
      `BlogPost.tsx` pour og:image/twitter:image/schema.org). La largeur source
      varie d'une génération à l'autre (1671 ou 1672 px selon les cas), donc la
      lire plutôt que la coder en dur, sinon `sips -c` élargit l'image au lieu
      de la rogner :
      ```bash
      W=$(sips -g pixelWidth <slug>.png | awk '/pixelWidth/{print $2}')
      H=$(python3 -c "print(round($W * 630 / 1200))")   # hauteur du cadre 1200x630
      sips -c $H $W <slug>.png --out /tmp/c.png
      sips -z 630 1200 /tmp/c.png --out /tmp/r.png
      sips -s format jpeg -s formatOptions 82 /tmp/r.png --out <slug>-og.jpg
      sips -g pixelWidth -g pixelHeight <slug>-og.jpg   # doit afficher 1200x630
      ```
3. **Ajouter l'URL au sitemap** `public/sitemap.xml` : `<loc>` complet,
   `<lastmod>` = date du jour, `changefreq` monthly, `priority` 0.5
4. **Mettre à jour `<lastmod>` de `/blog`** dans le sitemap
5. **Build local** : `npm run build` — le pré-rendu génère automatiquement le
   .html statique de l'article (il lit le sitemap) ; vérifier
   `dist/blog/<slug>.html` (title, canonical, H1, liens internes)
6. **Commit + push** → CI déploie ; smoke test :
   `curl -s https://christophe-dev-freelance.fr/blog/<slug> | grep '<h1'`
   Si l'étape Deploy FTPS échoue sur « Timeout (control socket) » alors que
   Build et Vérifier sont verts : panne réseau Hostinger, `gh run rerun <id>
   --failed` suffit (arrivé 3 fois entre juillet et août 2026)
7. **Base de connaissances du chatbot** : ajouter l'article à la liste de
   `public/chatbot-knowledge.txt` (section « Articles du blog »), avec des
   exemples de questions déclencheuses et le lien `[texte](/blog/<slug>)`
8. **Fichiers LLM** (depuis le 08/08/2026, ne pas oublier) : ajouter l'article
   dans `public/llms.txt` (section « Blog » : titre, URL, résumé d'une phrase,
   date) ET dans `public/llms-full.txt` (section 9 : titre, URL, date,
   catégorie, temps de lecture, résumé, puis la ligne « Questions auxquelles il
   répond » qui liste les formulations réelles des internautes). C'est cette
   dernière ligne qui fait le travail en GEO : un LLM rapproche la question de
   l'utilisateur de ces formulations plutôt que du titre. Mettre à jour la date
   « Dernière mise à jour » en tête des deux fichiers
9. **Post Google** (depuis le 07/09/2026) : proposer à Christophe un texte prêt
   à coller sur la fiche Google Business, qu'il publie lui-même (bouton
   « Posts » dans le panneau de gestion). Le rédiger, ne pas juste le
   mentionner. Format : 300 à 500 caractères, **les 80 premiers sont les seuls
   visibles** avant le « en savoir plus », donc y mettre l'accroche ; bouton
   « En savoir plus » + URL complète de l'article. Un post reste mis en avant
   ~7 jours. Ton identique à celui de l'article : on parle au client, pas au
   développeur. Modèles, gabarit de prompt image et consignes de publication
   dans `docs/posts-google-blog.md`.
   **Image** : Christophe la génère via ChatGPT à partir du gabarit de prompt de
   ce fichier (bureau bois, lumière dorée, Pyrénées floues, « sans texte lisible »
   impératif). Format 4:3 1200x900 : les images d'articles étant en 16:9, les
   recadrer en rognant les CÔTÉS, jamais en étirant (sinon bandes noires) :
   commande `sips` dans le même fichier.
   Intérêt réel et limites, à ne pas survendre : une fiche active est mieux
   classée dans le pack local qu'une fiche figée, et le bouton ramène du trafic.
   En revanche un post n'est pas indexé comme une page et ne se classe sur aucun
   mot-clé : inutile d'y bourrer « développeur web Pau »
10. **Ne pas** proposer de demander l'indexation dans Search Console :
   Christophe la gère lui-même et a demandé qu'on ne le lui rappelle plus
   (12/08/2026). La publication s'arrête au smoke test de l'étape 6

## Ne pas oublier

- L'article doit apparaître sur la page /blog automatiquement (elle lit
  `blogPosts.ts`) — vérifier dans le build
- Dates réalistes (pas d'antidatage), auteur = Christophe Mostefaoui
- Schema BlogPosting : généré par la page article, ne pas dupliquer à la main
- Vérifier les permissions des fichiers ajoutés : un fichier en mode 600 est
  servi en 403 par LiteSpeed (le workflow CI applique 644, mais autant ne pas
  committer un fichier mal fichu)
- Le post Google (étape 9) se rédige, il ne se publie pas à la place de
  Christophe : c'est du contenu public sur sa fiche d'établissement
