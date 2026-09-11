# Configuration Claude Code - Projet Christophe-Mostefaoui-Dev

Configuration allégée le 10 juillet 2026 (audit) : les MCP redondants avec les
outils natifs ou les plugins ont été retirés du projet.

## MCP actifs sur ce projet

- ✅ chrome-devtools (global) — Lighthouse, traces de performance, captures
- ✅ context7 (via plugin `context7@claude-plugins-official`) — docs à jour

## Retirés volontairement (ne pas re-synchroniser)

filesystem, git, github, memory, puppeteer, jira, confluence, stripe :
redondants avec les outils natifs de Claude Code (Read/Bash git/gh CLI/mémoire
fichier), avec les plugins officiels, ou sans objet pour un site vitrine.
`claude-sync-mcp` (ancien script, supprimé de la machine) les réinstallerait :
ne pas le relancer. Une sauvegarde de la configuration d'avant nettoyage a été
conservée en local (hors dépôt).

## Skills du projet (`.claude/skills/`)

- `seo-geo-portfolio` — **à invoquer avant toute modification SEO/GEO** :
  ligne de base Lighthouse à ne pas régresser, audit express en un bloc,
  10 règles de non-régression, table « quand on modifie quoi ».
  Deux références détachées : `geo-reference.md` (format des fichiers LLM,
  crawlers IA, garde-fous anti-hallucination) et `pieges.md` (incidents vécus)
- `deploy-portfolio` — checklist de déploiement + smoke tests post-deploy
  (routes, headers, fichiers LLM, balayage sitemap en User-Agent Googlebot) et
  pièges vécus : timeout FTP Hostinger, permissions 600 servies en 403
- `blog-article` — rédaction et publication d'un article orienté client PME :
  règles éditoriales, formatage Markdown supporté, pipeline image complet
  (variantes AVIF/WebP + image OG 1200×630), maillage interne, mise à jour de la
  base de connaissances du chatbot et des trois fichiers LLM, et depuis le
  07/09/2026 la rédaction du post Google Business (étape 9, modèles et gabarit
  de prompt image dans `docs/posts-google-blog.md`)

`deploy-portfolio` et `blog-article` ont été enrichis le 03/08/2026,
`seo-geo-portfolio` créé le 12/08/2026 pour alléger le CLAUDE.md.

## Hook (`.claude/hooks/seo-guard.sh`)

Un hook `PostToolUse` sur Edit/Write rappelle la marche à suivre dès qu'un
fichier SEO sensible est touché (`index.html`, `.htaccess`, `sitemap.xml`,
`robots.txt`, `llms*.txt`, `chatbot-knowledge.txt`, `blogPosts.ts`). Il affiche
un rappel contextuel, il ne bloque jamais l'édition.

**Angle mort connu** (constaté le 07/09/2026) : le hook n'écoute que les outils
`Edit` et `Write`. Un fichier modifié par un script lancé en Bash (`sed`,
`python3`, heredoc) ne le déclenche pas, ce qui arrive systématiquement en mode
bypass permissions, où l'édition via Bash est la voie recommandée. Les
vérifications restent donc à faire de tête : la checklist de référence est celle
du skill `blog-article` pour un article, `seo-geo-portfolio` pour le reste.

## Versionnement

`CLAUDE.md`, les skills, le hook et `settings.json` sont **versionnés dans le
dépôt** depuis le 12/08/2026 (commit `770baff`). Seul `settings.local.json`
reste ignoré (entrées jetables, propres à la machine).

## Vérifier

```bash
/mcp
```
