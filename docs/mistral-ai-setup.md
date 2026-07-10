# Chatbot Mistral AI — architecture et configuration

> ⚠️ Depuis juillet 2026, la clé API ne se met **plus jamais** dans le code ni dans
> une variable `VITE_*` (tout ce qui est `VITE_*` finit **en clair** dans le bundle
> JavaScript public — c'est ainsi que l'ancienne clé a fuité).

## Architecture

```
Navigateur (AIChatbot.tsx)
   │  POST /api/chat.php   { messages: [...] }
   ▼
Proxy PHP sur Hostinger (public/api/chat.php)
   │  + clé API (lue hors webroot)
   │  + prompt système (imposé côté serveur)
   │  + modèle open-mistral-7b, max_tokens 500
   ▼
https://api.mistral.ai/v1/chat/completions  (streaming SSE relayé)
```

Protections intégrées au proxy : POST uniquement, vérification d'origine
(christophe-dev-freelance.fr), rate limiting 10 req/min par IP et 500 req/jour au
global, taille et rôles des messages validés, prompt système non modifiable par
le client.

## Configurer la clé (une seule fois, ou après rotation)

1. Générer une clé sur [console.mistral.ai](https://console.mistral.ai) → API Keys.
2. hPanel → **Fichiers → Gestionnaire de fichiers** → dossier du domaine
   (`domains/christophe-dev-freelance.fr/` — celui qui **contient** `public_html`,
   ne pas entrer dedans).
3. Créer un fichier **`mistral-key.php`** à cet endroit (donc HORS de `public_html`,
   inaccessible par le web) avec ce contenu exact :

```php
<?php return 'VOTRE_CLE_ICI';
```

C'est tout : le proxy la lit à chaque requête, aucun redéploiement nécessaire.

## Rotation de la clé

Révoquer l'ancienne sur console.mistral.ai, en créer une nouvelle, remplacer la
valeur dans `mistral-key.php` via le Gestionnaire de fichiers. Effet immédiat.

## Développement local

`npm run dev` ne sert pas le PHP : le chatbot affiche son message d'erreur
générique en local, c'est attendu. Tester le chatbot sur la prod après déploiement.

## Maintenance du prompt système

Le prompt (identité, services, règles de communication) vit dans
`public/api/chat.php` (constante `$systemPrompt`). Le modifier = commit + push,
le CI déploie. Rappel : jamais de tarifs chiffrés ni de stats inventées dans le
prompt (devis sur mesure uniquement).

## Coûts

Modèle `open-mistral-7b` (~0,25 €/million de tokens) plafonné à 500 tokens par
réponse et 500 requêtes/jour par le proxy → coût mensuel négligeable, borné par
construction. Surveiller la consommation sur console.mistral.ai.
