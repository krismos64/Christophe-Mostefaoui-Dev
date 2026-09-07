# Posts Google prêts à publier

Un post par article de blog. À publier **un par semaine**, pas tous d'un coup :
une fiche qui reçoit 10 posts le même jour puis plus rien pendant trois mois
envoie le signal inverse de celui recherché.

## Comment publier

1. Recherche « Christophe Mostefaoui » sur Google en étant connecté, ou va sur
   la fiche via Maps
2. Bouton **Posts** dans le panneau de gestion
3. Colle le texte, ajoute l'image, choisis le bouton **En savoir plus** et colle
   l'URL
4. Publier

## Ce qu'il faut savoir sur le format

- **Les 80 premiers caractères** sont les seuls visibles avant le « en savoir
  plus ». Chaque post ci-dessous commence donc par sa phrase la plus accrocheuse.
- Limite technique : 1500 caractères. Les textes ci-dessous font 300 à 500
  caractères, c'est le format qui se lit le mieux sur mobile.
- Un post reste mis en avant environ **7 jours**, puis bascule dans l'onglet
  « Posts » de la fiche où il reste consultable.
- **Image** : générée via ChatGPT avec le gabarit ci-dessous, ou à défaut celle
  de l'article (`imageUrl` dans `src/data/blogPosts.ts`). Format paysage 4:3,
  1200x900. Ne jamais publier sans image, un post nu passe presque inaperçu.
  Poids max 5 Mo côté Google, largement suffisant.
- **Pas de numéro de téléphone dans le texte** : Google le refuse parfois, et il
  est déjà sur la fiche.

## Gabarit de prompt pour générer l'image (ChatGPT)

Coller tel quel, en remplaçant uniquement la ligne **SUJET** par celle du post
concerné (liste plus bas). Le gabarit reprend les codes visuels des images
d'articles déjà en ligne : bois clair, lumière dorée rasante, Pyrénées floues
par la fenêtre, objets réels au premier plan.

> Photographie réaliste, format paysage 4:3, sans aucun texte ni logo lisible.
>
> Scène : un bureau en bois clair près d'une grande fenêtre. Par la fenêtre, une
> vue floue sur les Pyrénées enneigées et les toits d'une petite ville du
> sud-ouest de la France, en arrière-plan très doux.
>
> Lumière : fin de journée, lumière dorée rasante qui entre par la fenêtre et
> éclaire le bois du bureau. Ambiance chaleureuse et calme, pas de lumière
> artificielle froide.
>
> SUJET : [remplacer]
>
> Style : photo prise au reflex, objectif 35 mm, faible profondeur de champ,
> premier plan net et arrière-plan flou. Couleurs naturelles et chaudes, ambré
> et bois. Aucune personne dont on voit le visage. Pas de texte lisible sur les
> écrans ni sur les documents, pas de marque, pas de logo, pas de filigrane.
> Rendu réaliste, surtout pas illustration ni 3D.

**Toujours garder « sans texte lisible »** : les générateurs inventent du faux
texte, et un post Google couvert de charabia fait amateur.

### Les dix sujets

| Post | SUJET à coller |
|---|---|
| 1. Prix d'un site | Un devis papier posé sur le bureau, une calculatrice et un stylo à côté, une tasse de café. Les colonnes du devis sont visibles mais le texte reste flou et illisible. |
| 2. Préparer un devis | Un carnet ouvert avec des notes manuscrites illisibles et une liste à puces, un stylo posé en travers, un téléphone à côté. |
| 3. Site vitrine ou Facebook | Un smartphone posé à plat affichant une interface de réseau social floutée, et à côté un ordinateur portable ouvert sur un site web, les deux dans le même cadre. |
| 4. Refonte ou réparation | Un vieil ordinateur portable un peu daté à côté d'un modèle récent, sur le même bureau, avec une boîte à outils ou un tournevis posé près du plus ancien. |
| 5. Visibilité locale | *(réutiliser l'image de l'article, elle correspond déjà : carte papier, punaise rouge, laptop avec une carte)* |
| 6. Google et ChatGPT | Deux écrans côte à côte sur le bureau : à gauche une page de résultats de recherche classique floutée, à droite une interface de conversation avec une bulle de réponse, textes illisibles. |
| 7. Questions posées à ChatGPT | Un smartphone tenu à plat sur le bureau montrant une conversation avec un assistant, bulles de dialogue visibles mais texte flou, une tasse et un carnet autour. |
| 8. IA petite entreprise | Un établi d'artisan plutôt qu'un bureau : quelques outils rangés, un carnet de commandes papier, et une tablette posée au milieu. Même lumière dorée, même vue de fenêtre. |
| 9. Chatbot | Le comptoir d'un petit commerce, une tablette posée dessus affichant une fenêtre de discussion, le magasin flou derrière, lumière chaude de fin de journée. |
| 10. SmartPlanning | Un grand planning hebdomadaire affiché sur un écran d'ordinateur, avec des colonnes de jours et des créneaux colorés mais sans texte lisible, un agenda papier ouvert à côté. |

### Recadrer en 1200x900 si l'image n'est pas en 4:3

Les images d'articles sont en 16:9 (1672×941). Rogner **les côtés**, jamais
étirer, sinon on obtient des bandes noires :

```bash
SRC=image.png; H=$(sips -g pixelHeight "$SRC" | awk '/pixelHeight/{print $2}')
W=$(python3 -c "print(round($H*4/3))")
sips -c $H $W "$SRC" --out /tmp/c.png
sips -z 900 1200 /tmp/c.png --out /tmp/r.png
sips -s format jpeg -s formatOptions 88 /tmp/r.png --out post-<slug>.jpg
sips -g pixelWidth -g pixelHeight post-<slug>.jpg   # doit afficher 1200 900
```

---

## 1. Combien coûte un site internet

**Bouton** : En savoir plus
**Lien** : https://christophe-dev-freelance.fr/blog/combien-coute-site-internet-2026

> Combien coûte un site internet ? La vraie réponse, c'est « ça dépend », et je
> vous explique de quoi.
>
> Le prix peut aller du simple au décuple entre deux devis, sans que personne
> ne cherche à vous arnaquer. Ce qui change tout : le nombre de pages, qui
> écrit les textes, les fonctionnalités, et le travail de référencement.
>
> J'ai écrit cet article pour que vous puissiez lire un devis sans avoir
> l'impression qu'on vous raconte n'importe quoi. Il prévient aussi des
> abonnements où vous louez votre site sans jamais le posséder.

---

## 2. Préparer une demande de devis

**Bouton** : En savoir plus
**Lien** : https://christophe-dev-freelance.fr/blog/preparer-demande-devis-site-internet

> « Je voudrais un site, vous me faites un prix ? » Aucun prestataire honnête ne
> peut répondre à ça.
>
> Ce n'est pas de la mauvaise volonté : sans savoir ce que le site doit faire,
> un chiffre serait inventé. Six informations suffisent pourtant à obtenir un
> devis sérieux, et vous pouvez les réunir en une demi-heure.
>
> L'article les détaille une par une. Le préparer vous fera gagner du temps,
> quel que soit le prestataire que vous choisirez.

---

## 3. Site vitrine ou page Facebook

**Bouton** : En savoir plus
**Lien** : https://christophe-dev-freelance.fr/blog/site-vitrine-ou-reseaux-sociaux

> « Ma page Facebook me suffit. » C'est souvent vrai. Jusqu'au jour où ça ne
> l'est plus.
>
> Les réseaux sociaux font très bien certaines choses qu'un site ne fera jamais.
> L'inverse est vrai aussi. Et il existe des situations où créer un site
> maintenant serait de l'argent mal placé.
>
> J'ai écrit cet article sans essayer de vous vendre un site : il dit aussi
> quand il ne faut pas en faire.

---

## 4. Refonte ou réparation

**Bouton** : En savoir plus
**Lien** : https://christophe-dev-freelance.fr/blog/refonte-ou-reparation-site-internet

> Votre site a cinq ans et vous vous demandez s'il faut tout refaire ? Pas
> forcément.
>
> Un site qui date n'est pas bon à jeter par principe. Certains problèmes se
> corrigent en quelques jours pour une fraction du prix d'une refonte : vitesse,
> affichage sur mobile, textes, sécurité.
>
> L'article vous aide à faire le tri entre ce qui se répare et ce qui justifie
> vraiment de repartir de zéro, avant d'engager un budget.

---

## 5. Visibilité locale

**Bouton** : En savoir plus
**Lien** : https://christophe-dev-freelance.fr/blog/visibilite-locale-pau-bearn-cote-basque

> Avoir un site ne veut pas dire être trouvé. Ce sont deux choses complètement
> différentes.
>
> Quand quelqu'un cherche un artisan ou un commerce près de chez lui, à Pau, à
> Bayonne ou dans le Béarn, ce n'est pas le plus beau site qui sort en premier.
> C'est celui qui a travaillé les bons signaux.
>
> L'article explique lesquels, en français, sans jargon de référenceur.

---

## 6. Référencement Google et ChatGPT

**Bouton** : En savoir plus
**Lien** : https://christophe-dev-freelance.fr/blog/referencement-google-chatgpt-2026

> Vos clients ne tapent plus seulement dans Google. Ils posent leur question à
> ChatGPT.
>
> Et un assistant IA ne renvoie pas dix liens : il donne une réponse, en citant
> une ou deux sources. Si votre site n'est pas lisible pour lui, vous n'existez
> pas dans cette réponse, même si vous êtes bien classé sur Google.
>
> L'article explique ce qui a changé et comment un site se prépare aux deux
> canaux à la fois.

---

## 7. Ce qu'on demande à ChatGPT sur les commerces locaux

**Bouton** : En savoir plus
**Lien** : https://christophe-dev-freelance.fr/blog/questions-chatgpt-artisans-commerces-locaux

> « Quel est le meilleur plombier à Pau ? » Des gens posent déjà cette question
> à ChatGPT.
>
> Pas dans dix ans : maintenant. Et l'assistant répond en citant quelques
> établissements. J'ai listé le type de questions réellement posées sur les
> artisans et les commerces du coin.
>
> L'article explique surtout ce qu'il faut écrire sur son site pour avoir une
> chance d'être la réponse plutôt qu'un absent.

---

## 8. L'IA pour une petite entreprise

**Bouton** : En savoir plus
**Lien** : https://christophe-dev-freelance.fr/blog/ia-petite-entreprise-usages-concrets

> L'intelligence artificielle pour un artisan : 4 usages qui font gagner du
> temps, 3 qui en font perdre.
>
> On en entend parler partout, rarement de ce qu'elle change vraiment dans une
> journée de travail. J'ai pris le parti d'être concret : des usages
> applicables cette semaine, sans abonnement à rallonge.
>
> Et je dis aussi dans quels cas elle ne sert à rien, parce que c'est au moins
> aussi utile à savoir.

---

## 9. Chatbot pour un commerce

**Bouton** : En savoir plus
**Lien** : https://christophe-dev-freelance.fr/blog/chatbot-ia-commerce-pme

> Un chatbot qui répond à vos clients la nuit : gadget ou vrai intérêt ? Ça
> dépend du commerce.
>
> Je parle de celui installé sur mon propre site, avec ce qu'il fait, ce qu'il
> ne sait pas faire et ce qu'il coûte réellement à faire tourner.
>
> L'article dit franchement dans quels cas c'est une dépense inutile. Tous les
> commerces n'en ont pas besoin.

---

## 10. SmartPlanning

**Bouton** : En savoir plus
**Lien** : https://christophe-dev-freelance.fr/blog/smartplanning-saas-solo-ce-que-ca-change-pour-vous

> Je ne fais pas que créer des sites : je fais tourner mon propre logiciel,
> seul, depuis 2026.
>
> SmartPlanning est une application de gestion de plannings que j'ai conçue,
> développée, et que je maintiens tous les jours depuis 2026.
>
> Beaucoup de prestataires savent livrer quand tout va bien. Garder un outil en
> état de marche des mois durant, avec de vrais utilisateurs dessus, c'est un
> autre métier : sécurité, disponibilité, mises à jour sans rien casser.
>
> L'article explique ce que cette expérience change pour vos projets.

---

## Après avoir tout publié

Le stock est épuisé au bout de dix semaines. Ensuite, un post par nouvel
article : le skill `blog-article` propose le texte en même temps que la
publication (étape 9).

Si un article ancien reste utile, rien n'interdit de le repasser en post
quelques mois plus tard avec une autre accroche.
