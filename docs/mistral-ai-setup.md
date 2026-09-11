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
   │  + modèle mistral-small-2603, max_tokens 500
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

Modèle `mistral-small-2603` (Mistral Small 4), plafonné à 500 tokens par réponse,
10 requêtes par minute et par IP et 500 requêtes/jour au global : le coût est
borné par construction.

**Le Pay-As-You-Go doit rester ACTIVÉ** (fait le 07/09/2026). Sans lui, Mistral
refuse tout appel par clé API en 429 `rate_limited` code 1300, en permanence :
c'est la cause du 502 du 07/09, détaillée dans la section de diagnostic plus
bas. Le plafond de dépenses associé a un plancher imposé à 10 EUR. La
consommation reste dans le forfait inclus, à surveiller sur la page Usage de
admin.mistral.ai.

*Correction du 11/09/2026 : cette section conseillait l'inverse (« ne pas
activer le Pay-As-You-Go »), consigne écrite avant la panne du 07/09 et jamais
reprise quand le reste du fichier l'a été. La suivre remettait le chatbot hors
service.*

Historique : `open-mistral-7b` jusqu'au 10/07/2026 (phase 7.1, réponses trop
mécaniques), puis `mistral-small-latest`, et enfin la version datée depuis le
07/09/2026.

## Jamais d'alias `-latest` pour le modèle

**Toujours figer une version datée.** Le 07/09/2026 le chatbot renvoyait un 502
sur toutes les requêtes alors qu'aucune ligne n'avait bougé : l'alias
`mistral-small-latest` pointait vers Mistral Small 3.2, retiré par Mistral le
31/07/2026 (l'alias a survécu quelques semaines, la panne est apparue plus tard).
Une version datée casse à une date annoncée à l'avance dans la table de
dépréciation, consultable sur docs.mistral.ai/models.

## Diagnostiquer un 502 « Assistant temporairement indisponible »

Le proxy renvoie ce message générique dès que l'appel amont échoue, et journalise
le vrai motif via `error_log` (statut HTTP et corps de la réponse Mistral),
lisible dans les logs PHP d'Hostinger via hPanel.

Dans l'ordre :

1. **L'API Pay-As-You-Go est-elle active ?** CAUSE RÉELLE du 07/09/2026.
   admin.mistral.ai → Abonnement : sans elle, Mistral refuse les appels par clé
   en **429 `rate_limited` code 1300**, en permanence, même sur une requête
   isolée. Le forfait « 0 $US / 10 $US » affiché juste au-dessus ne dit rien de
   l'accès API, et un coût à 0 EUR sur la page Usage signifie seulement
   qu'aucune requête n'aboutit. Le plafond de dépenses associé a un plancher
   imposé à 10 EUR.
2. **Le modèle existe-t-il encore ?** Comparer la valeur de `$payload['model']`
   avec la page Limites de admin.mistral.ai, qui liste les modèles réellement
   accessibles au compte.
3. La clé est-elle valide ? console.mistral.ai → Clés API. La colonne « Dernière
   utilisation » dit si les appels arrivent : une date du jour signifie que la
   clé fonctionne et que le problème est ailleurs.
4. Le fichier `mistral-key.php` est-il toujours en place sur Hostinger ?

Un coût à 0 EUR sur la page Usage ne prouve rien à lui seul : il signifie
seulement qu'aucune requête n'a abouti, sans en donner la raison.

**Obtenir le motif exact plutôt que de supposer.** Le 07/09/2026, trois
hypothèses plausibles se sont révélées fausses avant la bonne. Ce qui a tranché :
ajouter temporairement dans le bloc `if (!$streamStarted)` un retour JSON du
statut et du corps de la réponse amont, protégé par un jeton aléatoire en query
string, déployer, interroger, puis **retirer le diagnostic** et redéployer.

Le compte est passé en Pay-As-You-Go le 07/09/2026, avec un plafond mensuel de
dépenses supplémentaires à 10 EUR (minimum autorisé). L'usage réel se surveille
sur admin.mistral.ai → Usage.
