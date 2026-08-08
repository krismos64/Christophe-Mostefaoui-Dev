# GEO — fichiers LLM et crawlers IA

À lire avant de modifier `public/llms.txt`, `public/llms-full.txt`,
`public/chatbot-knowledge.txt` ou `public/robots.txt`.

Le GEO (Generative Engine Optimization) vise la citation du site dans les
réponses de ChatGPT, Claude, Perplexity, Gemini et les AI Overviews de Google.
Deux leviers en place : le contenu lisible sans JavaScript (pré-rendu Puppeteer
au build) et des fichiers de connaissance servis en texte brut.

## Les quatre fichiers

| Fichier | Rôle | Public |
|---|---|---|
| `public/llms.txt` | Fiche synthétique, format spec llmstxt.org (H1 + blockquote + sections `##`) | LLM externes |
| `public/llms-full.txt` | Base de connaissances complète, sections numérotées 1 à 11 | LLM externes |
| `public/chatbot-knowledge.txt` | Base injectée côté serveur dans le prompt par `public/api/chat.php` | Chatbot du site |
| `public/.well-known/ai-plugin.json` | Plugin IA standard, `api.type = "none"` | Agents |

Les trois premiers sont **à tenir à jour à chaque publication d'article**
(le skill `blog-article` détaille le processus, étapes 7 et 8).

## Le format qui compte : « questions auxquelles il répond »

Dans la section 9 de `llms-full.txt`, chaque article porte une ligne listant
les **formulations réelles** que tape un internaute. C'est ce qui fait le
travail en GEO : un LLM rapproche la question de l'utilisateur de ces
formulations bien plus que du titre de l'article.

Écrire des questions comme les pose un client PME, pas comme les pose un
développeur. « Combien ça coûte un site pour mon commerce ? » plutôt que
« tarification d'un site vitrine React ».

Structure par article dans `llms-full.txt` : titre, URL, date, catégorie,
temps de lecture, résumé, puis la ligne des questions.
Dans `llms.txt` (section « Blog »), une entrée plus courte : titre, URL,
résumé d'une phrase, date.

Penser à mettre à jour la date « Dernière mise à jour » en tête des deux
fichiers.

## Garde-fous anti-hallucination

Les trois fichiers portent une liste explicite de ce qu'un LLM ne doit **pas**
attribuer à Christophe. Elle protège contre l'invention plausible par un modèle
externe. Ne jamais la retirer, et la répliquer si un nouveau fichier de
connaissance apparaît :

- pas de tarifs chiffrés (devis sur mesure uniquement)
- pas d'avis ni de témoignages clients (il n'y en a aucun)
- pas d'équipe, d'agence ni de sous-traitants (Christophe travaille seul)
- pas de création de logo ni d'identité visuelle
- pas de statistiques de résultat (« +40% de conversions », « top 3 Google »)

Ces stats inventées ont été purgées de `llms-full.txt` le 08/08/2026 : elles
étaient servies aux LLM comme des faits à répéter. Le libellé `- Résultats:`
est devenu `- Réalisé:` sur les 6 projets du portfolio, précisément parce que
le mot invitait à y remettre un chiffre.

## Crawlers IA déclarés dans robots.txt

Tous en `Allow: /`. Modernisés le 08/08/2026.

**Anthropic** : `ClaudeBot`, `ClaudeBot-User`. `Claude-Web` et `anthropic-ai`
sont dépréciés mais restent déclarés par sécurité ; ne pas les compter comme
la couverture actuelle.

**OpenAI** : `GPTBot` (entraînement), `OAI-SearchBot` (index de recherche
ChatGPT, distinct du précédent), `ChatGPT-User`.

**Autres** : `PerplexityBot`, `Perplexity-User`, `Google-Extended` (pilote
Gemini et les AI Overviews, distinct de `Googlebot`), `Applebot`,
`Applebot-Extended`, `MistralAI-User`, `meta-externalagent`, `CCBot`.

Quand un nouveau crawler IA notable apparaît, l'ajouter ici. Vérifier avant
d'ajouter qu'il n'est pas un alias déprécié d'un agent déjà déclaré.

## Contenu lisible sans JavaScript

`scripts/prerender.mjs` transforme chaque route du sitemap (plus les
`EXTRA_ROUTES`) en fichier `.html` complet dans `dist/`. Les crawlers IA
n'exécutent pas JavaScript : sans ce pré-rendu, ils ne verraient qu'un `<div
id="root">` vide.

Les fichiers sont **plats** (`blog.html`, pas `blog/index.html`) pour éviter la
301 trailing-slash d'Apache.

Contrôle après build : `dist/<route>.html` doit contenir le `<title>`, le
canonical, un `<h1>` et le corps du texte. Une route absente du sitemap et
d'`EXTRA_ROUTES` n'est pas pré-rendue, donc invisible pour les LLM.

## Vérifier ce que voit un LLM

```bash
S=https://christophe-dev-freelance.fr
curl -s -A 'ClaudeBot' $S/llms.txt | head -20
curl -s -A 'GPTBot' $S/blog | grep -c '<h1'      # 1 : le contenu est bien là sans JS
```
