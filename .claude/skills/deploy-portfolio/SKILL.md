---
name: deploy-portfolio
description: Déployer christophe-dev-freelance.fr (Hostinger via GitHub Actions FTPS) et vérifier la prod. Utiliser pour tout déploiement, vérification post-deploy, ou diagnostic de la prod du portfolio.
---

# Déploiement du portfolio — christophe-dev-freelance.fr

Hébergement : Hostinger mutualisé (Apache + hPanel). Déploiement : **automatique
à chaque push sur `main`** via `.github/workflows/deploy.yml` (build + pré-rendu
+ sync FTPS de `dist/` vers la racine du compte FTP = `public_html`).

## Déployer

```bash
git push origin main          # déclenche le workflow
gh run list --workflow=deploy.yml --limit 1
gh run watch <RUN_ID> --exit-status --interval 15
```

Relance manuelle : `gh workflow run deploy.yml` (workflow_dispatch).
Le build complet = `tsc && vite build && node scripts/prerender.mjs`
(pré-rendu Puppeteer des routes du sitemap + EXTRA_ROUTES en fichiers .html plats).

## Smoke tests post-deploy (OBLIGATOIRES)

```bash
# 1. Routes pré-rendues : 200 direct, PAS de redirection, contenu présent
for u in / /blog /mentions-legales; do
  curl -s -o /dev/null -w "$u -> %{http_code} redirect=[%{redirect_url}]\n" "https://christophe-dev-freelance.fr$u"
done
curl -s https://christophe-dev-freelance.fr/blog | grep -c '<h1'   # >= 1

# 2. .htaccess appliqué : cache 1 an sur assets + headers sécurité
curl -sI https://christophe-dev-freelance.fr/assets/$(curl -s https://christophe-dev-freelance.fr/ | grep -oE 'index-[^"]+\.js' | head -1) | grep -i cache-control   # attendu : max-age=31536000, immutable
curl -sI https://christophe-dev-freelance.fr | grep -ci 'strict-transport\|x-content-type'   # attendu : 2

# 3. www -> non-www en 301
curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}\n' https://www.christophe-dev-freelance.fr/

# 4. Proxy chatbot opérationnel
curl -s -o /dev/null -w '%{http_code}\n' -X POST https://christophe-dev-freelance.fr/api/chat.php \
  -H 'Content-Type: application/json' -H 'Origin: https://christophe-dev-freelance.fr' \
  -d '{"messages":[{"role":"user","content":"ping"}]}'   # attendu : 200

# 5. Fichiers LLM et robots lisibles (aucun 403 : cf. piège des permissions)
for f in llms.txt llms-full.txt chatbot-knowledge.txt robots.txt sitemap.xml \
         humans.txt .well-known/ai-plugin.json; do
  echo -n "$f -> "; curl -s -o /dev/null -w '%{http_code}\n' \
    -A 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' \
    "https://christophe-dev-freelance.fr/$f"
done   # attendu : 200 partout

# 6. URLs de blog inexistantes : 404, et articles supprimés : 410
#    (si /blog renvoie 301 ici, c'est le piège DirectorySlash — voir plus bas)
curl -s -o /dev/null -w 'slug inconnu -> %{http_code}\n' https://christophe-dev-freelance.fr/blog/slug-invente-test   # attendu : 404
for u in blog/chatbot-ia-boutique-locale-resultats-conversions blog/ia-interne-python-ml-vs-ia-externe-economies-2025; do
  curl -s -o /dev/null -w "$u -> %{http_code}\n" "https://christophe-dev-freelance.fr/$u"
done   # attendu : 410

# 7. Balayage complet du sitemap en User-Agent Googlebot
curl -s https://christophe-dev-freelance.fr/sitemap.xml | grep -o '<loc>[^<]*' | sed 's/<loc>//' |
while read u; do
  echo "$(curl -s -o /dev/null -w '%{http_code}' -A 'Googlebot' "$u") $u"
done   # attendu : 200 sur toutes les lignes
```

## Pièges connus (vécus)

- **« Timeout (control socket) » sur l'étape Deploy FTPS**, alors que Build et
  Vérifier sont verts : panne réseau ponctuelle côté Hostinger, PAS un problème
  de code. Réflexe : `gh run rerun <RUN_ID> --failed`, ça passe à la 2e ou 3e
  tentative. Survenu le 20/07/2026 puis deux fois le 03/08/2026. Ne pas creuser
  avant d'avoir relancé.
- **Fichier en mode 600 = 403 en prod.** LiteSpeed ne peut pas lire un fichier
  non lisible par « other » et renvoie 403, ce qui remonte dans la Search
  Console en « Bloquée en raison d'une interdiction d'accès ». Vécu le
  03/08/2026 sur `llms.txt` et `humans.txt`, découverts par Googlebot via des
  balises `<link>` dans `index.html`. Diagnostic :
  `find dist -type f ! -perm -004`. Git ne versionne PAS le bit de lecture, donc
  un `chmod` local ne se propage pas : le workflow applique 644/755 avant le
  sync et échoue si un fichier reste illisible.
- **`.htaccess` manquant** = toutes les routes en 404 Hostinger + cache 7 j +
  zéro header sécurité. Cause historique : copie manuelle qui rate les dotfiles.
  Le workflow a un garde-fou (`test -f dist/.htaccess`) — ne pas le retirer.
- **Toute règle ajoutée au `.htaccess` AVANT le fallback SPA casse `/blog` en
  301.** `dist/blog/` est un dossier réel (il contient les articles pré-rendus)
  en plus de `dist/blog.html` : changer l'ordre d'évaluation laisse `mod_dir`
  ajouter le trailing slash avant que `blog.html` soit servi. C'est exactement
  la 301 que le pré-rendu à fichiers plats cherche à éviter. Fix en place :
  `DirectorySlash Off`. Vécu le 08/08/2026. **Après toute modification du
  `.htaccess`, tester `/blog` en priorité** (attendu 200, pas 301), puis les 15
  routes du sitemap. Tester en local avant de pousser : voir la procédure
  Apache dans la mémoire projet `htaccess-directoryslash`.
- **La racine du compte FTP EST `public_html`** : `server-dir: ./` dans le
  workflow. `public_html/` en server-dir crée un dossier imbriqué public.
- La clé Mistral vit dans `mistral-key.php` au-dessus de `public_html` (hors
  webroot, hors repo, hors CI). Jamais de secret dans une variable `VITE_*`.
- Le pré-rendu exige Chrome (préinstallé sur ubuntu-latest et sur le Mac).
  Build sans pré-rendu si besoin : `npm run build:spa`.

## Rollback

`git revert <commit> && git push origin main` — le CI redéploie l'état précédent
(~2 min). Pas de rollback côté serveur : le serveur est un miroir de `dist/`.
