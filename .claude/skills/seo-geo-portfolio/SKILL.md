---
name: seo-geo-portfolio
description: Vérifier, auditer ou modifier le SEO et le GEO de christophe-dev-freelance.fr (pré-rendu, JSON-LD, sitemap, robots, fichiers LLM, .htaccess, codes HTTP, Lighthouse). Utiliser avant tout déploiement touchant une page publique, quand Christophe demande un audit SEO/GEO du portfolio, ou avant de modifier index.html, public/.htaccess, public/sitemap.xml, public/robots.txt, public/llms*.txt ou les schémas structurés.
---

# SEO / GEO — christophe-dev-freelance.fr

Site vitrine Vite + React 18, hébergé sur Hostinger mutualisé (Apache/LiteSpeed).
Le SEO est la priorité maximale du projet. L'état actuel est **conforme** :
ne pas régresser est plus important qu'optimiser.

**Ligne de base à préserver** (mesurée le 08/08/2026, Lighthouse mobile) :

| Catégorie | Valeur | Statut |
|---|---|---|
| SEO | 100 | seuil, ne pas régresser |
| Accessibilité | 100 | seuil, ne pas régresser |
| Best Practices | 100 | seuil, ne pas régresser |
| Performance | 67 | sous le seuil, chantier connu (LCP 5,5 s) |
| CLS | 0,003 | excellent, ne pas casser |

## Audit express (un seul bloc)

À lancer sur la prod après tout déploiement touchant le SEO. Tout doit
être `200`, sauf là où c'est annoté.

```bash
S=https://christophe-dev-freelance.fr

# 1. Toutes les URLs du sitemap en 200, vues par Googlebot (14 URLs)
curl -s $S/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//' |
while read u; do echo "$(curl -s -o /dev/null -w '%{http_code}' -A Googlebot "$u") $u"; done

# 2. /blog en 200 SANS redirection (piège DirectorySlash, cf. pieges.md)
curl -s -o /dev/null -w '/blog -> %{http_code} redirect=[%{redirect_url}]\n' $S/blog

# 3. Contenu lisible sans JS (pré-rendu) : un H1 sur chaque route clé
for u in / /blog /creation-site-internet-pau; do
  echo -n "$u h1="; curl -s "$S$u" | grep -c '<h1'
done   # attendu : 1 partout, jamais 0 ni 2

# 4. Codes d'erreur : 404 sur slug inconnu, 410 sur les 2 articles supprimés
curl -s -o /dev/null -w 'slug inconnu -> %{http_code}\n' $S/blog/slug-invente-test   # 404
for u in blog/chatbot-ia-boutique-locale-resultats-conversions \
         blog/ia-interne-python-ml-vs-ia-externe-economies-2025; do
  curl -s -o /dev/null -w "$u -> %{http_code}\n" "$S/$u"; done   # 410

# 5. Fichiers SEO/LLM lisibles (403 = piège des permissions, cf. pieges.md)
for f in robots.txt sitemap.xml llms.txt llms-full.txt chatbot-knowledge.txt \
         humans.txt .well-known/ai-plugin.json; do
  echo -n "$f -> "; curl -s -o /dev/null -w '%{http_code}\n' -A Googlebot "$S/$f"; done

# 6. Une seule entité d'activité dans le JSON-LD de la home
curl -s $S/ | grep -o '"@id": *"[^"]*#business"' | wc -l   # attendu : 1
```

Lighthouse mobile : `mcp__chrome-devtools__lighthouse_audit` (charger les tools
chrome-devtools via ToolSearch en un seul appel s'ils ne le sont pas).

## Règles de non-régression

Chacune vient d'un incident réel. Détails et symptômes dans `pieges.md`.

1. **Une seule entité d'activité** : `ProfessionalService #business`, inliné
   dans `index.html`. Ne jamais redéclarer un `LocalBusiness` ou un
   `ContactPage` dans un composant React. Les schémas d'IDENTITÉ
   (`#organization`, `#person`, `#business`) vivent dans `index.html` ;
   `src/utils/structured-data-final.tsx` ne génère que des schémas de PAGE
   (WebPage, WebSite, FAQPage, VideoObject, SoftwareApplication). Pas de
   chevauchement entre les deux.
2. **Les horaires du JSON-LD doivent correspondre à l'écran** : 8h30-18h00.
   Google compare les deux et sanctionne l'écart.
3. **Aucune règle ajoutée au `.htaccess` avant le fallback SPA** sans avoir
   testé `/blog` (piège `DirectorySlash`).
4. **Aucun fichier servi en mode 600** : LiteSpeed renvoie 403.
   `find dist -type f ! -perm -004` doit être vide.
5. **Jamais de contenu caché** (`display:none`, `className="hidden"`) pour du
   texte destiné au SEO.
6. **Jamais de stats inventées** dans les schémas ni dans les fichiers LLM
   (vues, likes, « +200% de RDV », « top 3 Google »).
7. **Jamais de numéro fictif** : le vrai est `+33679088845`.
8. **Sitemap et robots cohérents** : rien qui soit à la fois dans le sitemap et
   en `Disallow` ou `noindex`. `/politique-de-confidentialite` est `noindex`,
   donc volontairement hors sitemap, mais pré-rendue via `EXTRA_ROUTES`.
9. **Un seul `<h1>` par page**, hiérarchie sans trou, `alt` sur les images.
10. **Piège JSX/a11y** : les nœuds texte multi-lignes sont concaténés SANS
    espace dans le DOM. Un `aria-label` ne peut donc pas « contenir » un texte
    visible multi-nœuds (règle axe `label-content-name-mismatch`). Laisser le
    nom accessible se calculer depuis le contenu.

## Quand on modifie quoi

| Fichier modifié | À faire ensuite |
|---|---|
| `public/.htaccess` | Tester `/blog` EN PRIORITÉ (attendu 200, pas 301), puis les 14 URLs du sitemap. Test local possible : voir `pieges.md` |
| `index.html` (JSON-LD) | Vérifier qu'il n'existe qu'un `#business`, que les horaires collent à l'UI, relancer Lighthouse |
| `public/sitemap.xml` | Mettre à jour le `<lastmod>` de la page touchée ET du parent (`/blog` quand un article change), rebuild (le pré-rendu lit le sitemap) |
| Une page publique (contenu) | Mettre à jour son `<lastmod>` dans le sitemap : signal de fraîcheur, actuellement figé au 18/05/2026 sur `/` et `/mentions-legales` |
| Un article de blog | Suivre le skill `blog-article` : il inclut la mise à jour de `llms.txt`, `llms-full.txt` et `chatbot-knowledge.txt` |
| `public/robots.txt` | Vérifier qu'aucune URL du sitemap n'est bloquée. Liste des crawlers IA dans `geo-reference.md` |
| Ajout d'une route | L'ajouter au sitemap (sinon pas de pré-rendu) ou à `EXTRA_ROUTES` de `scripts/prerender.mjs` si elle est `noindex` |

## GEO (visibilité dans les LLM)

Le site est structuré pour être lu par les crawlers IA sans JavaScript. Trois
fichiers portent la connaissance servie aux LLM, plus le pré-rendu qui rend
chaque route lisible en HTML brut.

Détails du format attendu, liste des crawlers déclarés et garde-fous
anti-hallucination : lire `geo-reference.md` (à ouvrir avant toute modification
de `llms.txt`, `llms-full.txt`, `chatbot-knowledge.txt` ou `robots.txt`).

## Pièges vécus

Symptômes et diagnostics des incidents rencontrés (DirectorySlash, 403
permissions, doublons de schémas, fallback SPA en 200, timeout FTPS) :
lire `pieges.md` quand quelque chose ne se comporte pas comme attendu en prod.

## Chantier ouvert

**Performance mobile à 67**, LCP 5,5 s (seuil « bon » de Google : 2,5 s).
Causes chiffrées le 08/08/2026 : `assets/animations-*.js` à 111 Ko (Framer
Motion + Lottie) et 263 Ko de polices variables sur 4 fichiers (fraunces italic
80 Ko, caveat 73 Ko, fraunces normal 66 Ko, inter-tight 44 Ko). Poids total
758 Ko sur 20 requêtes, FCP 2,7 s, TBT 350 ms.

Contraintes à respecter en attaquant ce chantier : les polices sont
auto-hébergées pour garantir zéro requête tierce (décision RGPD du 10/07/2026),
donc pas de retour à Google Fonts ; et le CLS à 0,003 ne doit pas se dégrader.

## Skills voisins

- `deploy-portfolio` : déploiement et smoke tests post-deploy
- `blog-article` : rédaction et publication d'un article (inclut la mise à jour des fichiers LLM)
- `seo-audit` (global) : audit générique, utilisé pour les autres projets
