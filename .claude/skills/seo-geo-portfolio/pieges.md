# Pièges vécus en prod — christophe-dev-freelance.fr

À lire quand quelque chose ne se comporte pas comme attendu en production.
Chaque entrée correspond à un incident réel, avec sa date et son symptôme.

---

## 1. `/blog` passe en 301 après une modification du `.htaccess`

**Symptôme** : `/blog` renvoie 301 vers `/blog/` au lieu de 200. Les autres
routes semblent normales.

**Cause** : `dist/blog/` existe en tant que **dossier réel** (il contient les
`.html` pré-rendus des articles) en plus de `dist/blog.html`. Insérer une règle
de réécriture AVANT le bloc de fallback SPA change l'ordre d'évaluation
d'Apache et laisse `mod_dir` ajouter le trailing slash avant que `blog.html`
soit servi. C'est exactement la 301 que le pré-rendu à fichiers plats cherche
à éviter.

**Fix en place** : `DirectorySlash Off` dans un bloc `<IfModule mod_dir.c>`,
avant la règle qui sert les pages pré-rendues (`public/.htaccess`, commit
`3bebcc1`).

**Règle** : après toute modification du `.htaccess`, tester `/blog` en
priorité, puis toutes les URLs du sitemap.

Vécu le 08/08/2026 en ajoutant les règles 404/410 sur le blog.

### Tester le `.htaccess` en local avant de déployer

`npm run build`, puis Apache système (`/usr/sbin/httpd`, modules dans
`/usr/libexec/apache2/`) avec une config minimale dans le scratchpad :

- servir une **copie du `dist` placée dans le scratchpad**, jamais le `dist` en
  place : Apache tourne en `_www` et ne peut pas traverser `/Users/chris`
  (mode 750), ce qui donne un 403 trompeur
  (`pcfg_openfile: unable to check htaccess file`)
- `chmod -R a+rX` sur la copie
- `AllowOverride All` + `DirectoryIndex index.html` (Hostinger l'a par défaut,
  pas une config Apache vierge)
- neutraliser les règles HTTPS et www dans la copie de test : inapplicables sur
  `127.0.0.1`, elles renvoient sinon des 301 parasites
- charger `mod_rewrite`, `mod_dir`, `mod_headers`, `mod_mime`,
  `mod_authz_core`, `mod_unixd`, `mod_mpm_event`, `mod_log_config`

Cette méthode a détecté la régression sur `/blog` avant tout déploiement.

---

## 2. 403 sur un fichier qui existe pourtant

**Symptôme** : un fichier déployé renvoie 403. Dans la Search Console :
« Bloquée en raison d'une interdiction d'accès ».

**Cause** : le fichier est en mode 600. LiteSpeed ne peut pas lire un fichier
non lisible par « other ». Git ne versionne **pas** le bit de lecture, donc un
`chmod` local ne se propage pas au serveur.

**Diagnostic** : `find dist -type f ! -perm -004` (doit être vide).

**Fix en place** : le workflow CI applique 644/755 sur `dist/` avant le sync et
échoue si un fichier reste illisible. Ne pas retirer ce garde-fou.

Vécu le 03/08/2026 sur `llms.txt` et `humans.txt`, découverts par Googlebot via
des balises `<link>` dans `index.html`.

---

## 3. Une URL inexistante renvoie la home en 200

**Symptôme** : dans la Search Console, « Explorée, actuellement non indexée »
sur des URLs qui ne devraient pas exister. Validation qui échoue en boucle.

**Cause** : le fallback SPA servait la home sous n'importe quelle URL, avec un
canonical vers `/`. Google y voyait du contenu dupliqué et refusait d'indexer.

**Fix en place** (08/08/2026) : 410 Gone sur les 2 anciens slugs d'articles
supprimés en juillet 2025, 404 sur tout slug de blog sans `.html` pré-rendu.
La page `/404` est pré-rendue via les `EXTRA_ROUTES` de `scripts/prerender.mjs`
et servie par `ErrorDocument` (le code HTTP reste 404 ou 410, seul le corps
change).

**Extension du 10/11/2026** : même problème sur les FICHIERS. Toute URL à
extension absente (`.json`, `.xml`, `.js`...) et tout `/.well-known/*` absent
renvoyaient la home en HTML avec un code 200. Symptôme visible : Lighthouse
« Agentic Browsing » à 75, audit `ard-schema` (« Malformed JSON : Unexpected
token '<' ») car `/.well-known/ai-catalog.json` servait du HTML. Règle 404
ajoutée dans le `.htaccess` avant le fallback SPA, testée sur Apache local
(`/blog` 200, sitemap 24/24 en 200) : Agentic Browsing à 100. Ne PAS créer de
`ai-catalog.json` ni de `ard.json` : la spec ARD sert à déclarer des services
appelables par un agent (MCP, API), le site n'en a aucun. `/favicon.ico` a été
créé en même temps (16/32/48 px depuis `public/favicons/`), il servait la home.
Les routes de pages SANS extension inconnues (`/page-inexistante`) restent en
200 via le fallback SPA : chantier distinct, non traité.

Les URLs à paramètres (`/?s={search_term_string}`, `/?share=video`), héritées
d'un ancien schéma `SearchAction`, restent en 200 : impact nul, décision prise.

---

## 4. Plusieurs entités décrivent la même activité

**Symptôme** : schémas structurés divergents entre eux. Cas réel : horaires à
09:00 dans le JSON-LD contre 8h30 affichés à l'écran.

**Cause** : la home déclarait trois entités pour la même activité,
`ProfessionalService #business` dans `index.html` plus un `LocalBusiness` dans
`ServiceArea.tsx` et un `ContactPage` contenant un `LocalBusiness` dans
`GMBOptimizedContact.tsx`, ces deux derniers sans `@id`, donc non reliés.

**Fix en place** (08/08/2026, commit `2d01fbf`) : les deux doublons supprimés,
horaires alignés sur 8h30 (le contenu affiché fait foi, Google compare les
deux). La home est passée de 15 à 13 blocs JSON-LD.

**Règle** : `#business` dans `index.html` est la seule entité d'activité.
Ne jamais redéclarer un `LocalBusiness` ou un `ContactPage` dans un composant.

Contrôle : `curl -s <site>/ | grep -o '"@id": *"[^"]*#business"' | wc -l` → 1.

---

## 5. `.htaccess` absent du déploiement

**Symptôme** : toutes les routes SPA en 404 Hostinger, cache retombé à 7 jours,
headers de sécurité disparus. Silencieux, rien ne le signale.

**Cause historique** : copie manuelle qui rate les dotfiles, ou un `.htaccess`
périmé à la racine du repo copié par `viteStaticCopy` par-dessus le bon.

**Fix en place** : `public/.htaccess` est la source unique, le plugin
`viteStaticCopy` a été retiré, et le workflow échoue si `dist/.htaccess` ou
`dist/.well-known` manquent. Ne pas retirer ce garde-fou.

---

## 6. « Timeout (control socket) » sur l'étape Deploy FTPS

**Symptôme** : Build et Vérifier verts, l'étape de sync FTPS échoue.

**Cause** : panne réseau ponctuelle côté Hostinger. Pas un problème de code.

**Réflexe** : `gh run rerun <RUN_ID> --failed`. Ça passe à la 2e ou 3e
tentative. Ne pas creuser avant d'avoir relancé.

Survenu le 20/07/2026, deux fois le 03/08/2026, une fois le 08/08/2026.

---

## 7. Diagnostic sous fallback SPA : tout renvoie 200

Quand le fallback SPA est actif, une URL inexistante renvoie 200 comme une
vraie page. Pour trancher, comparer le `content-type` et le `content-length`
avec ceux d'une URL témoin volontairement inventée. Si c'est identique, la page
réelle n'existe pas.

Astuce trouvée le 10/07/2026 en vérifiant la suppression d'un dossier imbriqué.

---

## 8. URL avec barre finale en 500 (`/services/`)

**Symptôme** : `/services/`, `/contact/`, `/blog/un-article/` et toute page
pré-rendue demandée avec une barre finale répondent 500. Sans barre finale,
tout est en 200. `/blog/` répondait 404 (vrai dossier).

**Cause** : la règle qui sert les pages pré-rendues (`$1.html` si le `.html`
existe) voyait `services` + `.html` exister, puis réécrivait `services/` en
`services/.html`, et ainsi de suite jusqu'à la limite de récursion d'Apache.
Défaut présent depuis le pré-rendu du 10/07/2026, découvert le 09/11/2026.

**Fix en place** (commit `c59ff4f`) : bloc placé juste AVANT la règle `.html`,
qui redirige en 301 toute URL à barre finale vers sa version sans barre
(`RewriteCond %{REQUEST_FILENAME} !-d`, `/api/` exclu), plus une règle dédiée
`^blog/$ -> /blog` puisque `dist/blog/` est un dossier. `/blog` reste en 200.

**Contrôle** : `curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' $S/services/`
doit donner `301 https://christophe-dev-freelance.fr/services`.

---

## 9. Mails Search Console « Nouveaux motifs » après un déploiement

**Symptôme** : mail « Nouveaux motifs empêchant l'indexation » (404, Page avec
redirection) juste après une mise en ligne, qui laisse croire à une régression.

**Constat du 09/11/2026** (après la refonte) : les 6 URL en 404 du rapport
étaient toutes anciennes (explorées de juin à septembre, déjà en 410/301 ou
volontairement laissées en 404), et la seule redirection était `http://` vers
`https://`. Google regroupe et renomme ses motifs sans que le site ait changé.

**Réflexe** : ouvrir le détail du motif (Pages > motif > Exemples) et regarder
la date de dernière exploration avant de chercher un bug. Ne pas cliquer sur
« Valider la correction » si des URL restent volontairement en 404.

**À savoir aussi** : les images supprimées du dépôt répondent **422**
(`text/plain`, CDN Hostinger), pas 404. Sans conséquence.

---

## Pré-rendu : « capture suspecte » ou pages de 14 Ko

**Symptôme** : `npm run build` échoue sur `Échec du pré-rendu : / : capture
suspecte (14771 octets)`. En neutralisant le garde-fou, TOUTES les routes font
14 Ko au lieu de ~198 Ko, le `#root` est vide, et `dist/index.html` peut même
contenir le contenu d'un autre site.

**Cause** : le port 4173 est déjà occupé par le `vite preview` d'un AUTRE
projet. Le `vite preview` lancé par `prerender.mjs` ne peut pas s'y binder,
échoue sans faire échouer le script, et Puppeteer capture le site du voisin.

Vécu le 19/08/2026 : un `vite preview` d'`artix-racer` tournait depuis la
veille, le pré-rendu du portfolio a capturé ses pages.

**Diagnostic** :
```bash
lsof -nP -iTCP:4173 -sTCP:LISTEN
```

**Correctif** : arrêter le processus qui squatte le port, supprimer le `dist/`
pollué (`rm -rf dist`), relancer le build. Le garde-fou des 20 000 octets dans
`prerender.mjs` est ce qui empêche de déployer un site vide : ne pas le baisser.

**Effet de bord à connaître** : un run de pré-rendu raté écrase déjà
`dist/index.html`. Un `vite preview` relancé ensuite sert cette capture vide,
ce qui fausse tout nouveau diagnostic. Toujours repartir d'un `rm -rf dist`.

## 403 et 429 en rafale avec un user-agent Googlebot ou GPTBot

**Symptôme** : pendant les smoke tests, des URL qui répondaient 200 renvoient
403 (UA Googlebot) ou 429 (UA GPTBot), de façon intermittente, la même URL
passant d'un code à l'autre d'un appel à l'autre. Le site n'y est pour rien.

**Cause** : le CDN de Hostinger (en-tête `server: hcdn`) freine une rafale de
requêtes qui se disent Googlebot ou GPTBot sans venir de leurs adresses IP.
Les vrais robots, qui viennent de leurs propres plages d'IP, ne sont pas
concernés. Vécu le 05/11/2026 après une trentaine d'appels enchaînés, puis
le 09/11/2026 où les 23 URL du sitemap et tous les fichiers LLM sont passés en
403 d'un bloc (tout en 200 en user-agent navigateur).

**Réflexe** : refaire les contrôles avec un user-agent navigateur
(`-A "Mozilla/5.0 (Macintosh) Chrome/130"`). Si tout passe en 200, ce n'était
que le CDN. Un 403 qui persiste en user-agent navigateur relève en revanche du
piège des permissions (mode 600) décrit plus haut.
