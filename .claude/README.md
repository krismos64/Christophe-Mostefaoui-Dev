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

- `deploy-portfolio` — checklist de déploiement + smoke tests post-deploy
  (routes, headers, fichiers LLM, balayage sitemap en User-Agent Googlebot) et
  pièges vécus : timeout FTP Hostinger, permissions 600 servies en 403
- `blog-article` — rédaction et publication d'un article orienté client PME :
  règles éditoriales, formatage Markdown supporté, pipeline image complet
  (variantes AVIF/WebP + image OG 1200×630), maillage interne, mise à jour de la
  base de connaissances du chatbot

Les deux ont été enrichis le 03/08/2026 : ils documentent désormais ce qui avait
dû être redécouvert en cours de session.

## Vérifier

```bash
/mcp
```
