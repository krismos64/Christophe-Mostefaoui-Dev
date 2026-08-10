#!/bin/bash
# PostToolUse (Edit|Write) : rappelle les vérifications SEO/GEO obligatoires
# quand un fichier sensible du portfolio vient d'être modifié.
# Voir le skill .claude/skills/seo-geo-portfolio/ pour le détail.

INPUT=$(cat)
FILE=$(printf '%s' "$INPUT" | python3 -c "
import json,sys
try:
    d = json.load(sys.stdin)
    print(d.get('tool_input', {}).get('file_path', ''))
except Exception:
    print('')
" 2>/dev/null)

[ -z "$FILE" ] && exit 0

MSG=""

case "$FILE" in
  */public/.htaccess)
    MSG="PIÈGE CONNU : toute règle placée avant le fallback SPA casse /blog en 301 (mod_dir ajoute le trailing slash sur le dossier réel dist/blog/). Vérifier que DirectorySlash Off est toujours présent, puis tester /blog EN PRIORITÉ (attendu 200, pas 301) avant de déployer, puis toutes les URLs du sitemap. Procédure de test Apache en local : .claude/skills/seo-geo-portfolio/pieges.md"
    ;;
  */src/data/blogPosts.ts)
    MSG="Article de blog modifié. Publication d'un NOUVEL article : suivre le skill /blog-article. Ne pas oublier, en plus de blogPosts.ts : (1) l'URL dans public/sitemap.xml + le <lastmod> de /blog, (2) les TROIS fichiers LLM (llms.txt, llms-full.txt section 9 avec la ligne « Questions auxquelles il répond », chatbot-knowledge.txt avec les questions déclencheuses), (3) le pipeline image (job dans scripts/optimize-images.sh + image OG <slug>-og.jpg en 1200x630), (4) npm run build pour générer le HTML pré-rendu. Vérifier l'absence de cadratin dans content/excerpt/metaDescription (les 3 cadratins du gabarit dans le HTML sont normaux)."
    ;;
  */index.html)
    MSG="index.html porte les schémas JSON-LD d'IDENTITÉ. Vérifier qu'il n'existe qu'une seule entité #business, que les horaires collent à l'UI (8h30-18h00), et relancer Lighthouse mobile (seuils : SEO/A11y/BP à 100). Détail : .claude/skills/seo-geo-portfolio/SKILL.md"
    ;;
  */public/sitemap.xml)
    MSG="Sitemap modifié : mettre à jour le <lastmod> de la page touchée ET de son parent (/blog quand un article change), vérifier qu'aucune URL n'est en noindex ou en Disallow, puis rebuild (le pré-rendu lit le sitemap)."
    ;;
  */public/robots.txt)
    MSG="robots.txt modifié : vérifier qu'aucune URL du sitemap n'est bloquée. Liste des crawlers IA déclarés : .claude/skills/seo-geo-portfolio/geo-reference.md"
    ;;
  */public/llms.txt|*/public/llms-full.txt|*/public/chatbot-knowledge.txt)
    MSG="Fichier LLM modifié : les trois (llms.txt, llms-full.txt, chatbot-knowledge.txt) doivent rester cohérents entre eux. Conserver les garde-fous anti-hallucination (pas de tarifs, pas d'avis clients, pas de sous-traitants, pas de stats de résultat) et mettre à jour la date « Dernière mise à jour ». Format : .claude/skills/seo-geo-portfolio/geo-reference.md"
    ;;
  *)
    exit 0
    ;;
esac

printf '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":%s}}\n' \
  "$(printf '%s' "$MSG" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')"
exit 0
