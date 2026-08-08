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
priorité, puis les 14 URLs du sitemap.

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
