// Types pour les articles
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  category: "veille-tech" | "ia-pratique" | "conseils-business";
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  featured: boolean;
  metaDescription: string;
  keywords: string[];
}

// Articles du blog
// RÈGLES ÉDITORIALES (voir .claude/skills/blog-article) : cible PME/artisans
// locaux (pas les développeurs), JAMAIS de stats inventées ni de clients cités,
// JAMAIS de grille tarifaire, mots-clés locaux naturels, CTA devis.
// Historique : les 5 articles d'origine (2025) ont été supprimés le 10/07/2026 —
// hors cible et contraires à ces règles (chiffres et clients inventés).
export const blogPosts: BlogPost[] = [
  {
    id: "10",
    title:
      "Ce que les gens demandent vraiment à ChatGPT sur les artisans et commerces du coin",
    slug: "questions-chatgpt-artisans-commerces-locaux",
    excerpt:
      "« Quel est le meilleur plombier à Pau », « un restaurant sympa à Bayonne pour un repas d'affaires » : voici, très concrètement, le type de questions que les gens posent déjà à ChatGPT sur des activités locales, et ce qu'il faut écrire sur son site pour avoir une chance d'être la réponse.",
    content: `Vous doutez encore que quelqu'un puisse chercher un artisan ou un commerce en discutant avec une intelligence artificielle plutôt qu'en tapant une recherche Google classique ? Essayez, là, maintenant : ouvrez ChatGPT et demandez-lui de vous recommander un plombier à Pau ou un bon restaurant à Bayonne pour un dîner d'affaires. Vous allez obtenir une réponse construite, avec des noms, parfois des explications sur pourquoi tel choix plutôt qu'un autre. La question n'est plus de savoir si ça arrive, elle arrive déjà. La vraie question est : votre activité a-t-elle une chance d'apparaître dans cette réponse ?

## Les questions que les gens posent réellement

Ce ne sont pas des requêtes de trois mots comme sur Google. Ce sont des phrases complètes, parfois avec du contexte, formulées comme on parlerait à quelqu'un qui connaît le coin :

- « Quel est le meilleur plombier à Pau pour une urgence le week-end ? »
- « Un restaurant sympa à Bayonne pour un repas d'affaires, pas trop bruyant »
- « Comment trouver un développeur web fiable dans le 64 pour refaire le site de mon entreprise ? »
- « Un institut de beauté à Biarritz qui prend en dernière minute »
- « Une entreprise sérieuse pour une extension de maison du côté d'Orthez »

Ce qui frappe dans ces formulations, c'est la présence d'un critère de choix en plus du simple métier et de la ville : l'urgence, l'ambiance, la fiabilité, la disponibilité. Un assistant IA ne se contente pas de retrouver un annuaire, il essaie de répondre à ce critère précis. Un site qui ne parle que de lui-même, sans jamais répondre aux questions concrètes que ses clients se posent, a peu de chances d'être repris dans ce genre de réponse.

## Comment une IA générative construit sa réponse

Contrairement à un moteur de recherche classique, qui affiche une liste de liens et laisse la personne comparer, un assistant IA lit plusieurs sources, en retient certaines, et rédige une réponse directe. Pour choisir quoi citer, il cherche du contenu qui répond clairement à la question posée : des informations précises, honnêtes, faciles à vérifier. Un texte qui tourne autour du pot, qui multiplie les formules toutes faites sans jamais dire concrètement ce que fait l'entreprise, pour qui et où, est beaucoup plus difficile à exploiter pour lui.

Il y a aussi une question technique importante, dont je parle plus en détail dans un autre article sur le référencement pour les IA : si le contenu d'un site n'apparaît qu'après exécution de code dans le navigateur, une IA qui lit rapidement la page peut ne rien y trouver, même si le contenu existe bel et bien pour un visiteur humain. Ce point technique, invisible pour vous, change tout pour ces outils.

## Écrire pour répondre à une question, pas pour se présenter

La plupart des sites de commerces et d'artisans sont écrits à la première personne, pour se présenter : « nous sommes une entreprise familiale », « nous mettons un point d'honneur à la qualité ». C'est légitime, mais ça ne répond à aucune question précise qu'un client pourrait poser.

Une approche complémentaire, qui change beaucoup pour ce type de visibilité, consiste à écrire aussi en anticipant les questions réelles : sous quel délai intervenez-vous, dans quelles communes, pour quels types de besoins, ce que vous faites et ce que vous ne faites pas. Un plombier qui écrit clairement qu'il intervient en urgence le week-end à Pau et dans les communes voisines, avec un exemple concret du type d'intervention qu'il traite, donne à une IA générative une réponse toute prête à la question « quel plombier appeler un dimanche à Pau ».

C'est le même principe que j'applique aux pages locales de ce site : plutôt qu'une présentation générale de mes services, chaque page répond aux questions propres à son territoire, avec les communes, les réalités et le vocabulaire de ce bassin précis. J'en parle plus en détail dans [un article sur la visibilité locale](/blog/visibilite-locale-pau-bearn-cote-basque), qui explique pourquoi un contenu générique ne suffit pas, même quand le site est par ailleurs très bien fait.

## Le rôle discret d'une FAQ bien pensée

Une page de questions fréquentes, écrite avec les vraies formulations de vos clients plutôt qu'un jargon d'entreprise, est un des formats les plus efficaces pour ce type de visibilité. Chaque question-réponse est déjà construite dans le format qu'une IA générative cherche à reproduire : une question précise, une réponse claire et complète.

Ce n'est pas un hasard si les pages locales de ce site comportent chacune une FAQ courte, propre à son territoire. Ce n'est pas seulement pour rassurer un visiteur humain qui hésite encore, c'est aussi une structure que les assistants IA savent particulièrement bien lire et reprendre.

## Ce que ça ne change pas

Répondre à des questions précises ne veut pas dire inventer des réponses toutes faites pour plaire à un algorithme. Une IA générative, comme un client, se méfie très vite d'un contenu qui sonne faux, qui promet tout sans jamais rien préciser, ou qui répète des formules marketing vidées de sens. La meilleure stratégie reste, très simplement, d'écrire honnêtement ce que vous faites, pour qui, où, et dans quelles conditions, exactement comme vous l'expliqueriez à un client au téléphone.

## Parlons de votre visibilité sur ces nouveaux canaux

Vous vous demandez si votre site actuel a une chance d'être repris par ChatGPT ou un autre assistant IA quand quelqu'un cherche votre activité à Pau, Bayonne, Biarritz ou ailleurs dans le 64 ? Décrivez-moi votre activité via le formulaire de contact ou au 06 79 08 88 45 : premier échange gratuit et sans engagement, devis clair sous 24h.`,
    author: "Christophe Mostefaoui",
    publishedAt: "2026-07-20",
    readTime: 6,
    category: "veille-tech",
    tags: [
      "GEO",
      "ChatGPT",
      "Référencement IA",
      "PME",
      "Artisans",
      "Pau",
      "Béarn",
    ],
    imageUrl: "/assets/images/questions-chatgpt-artisans-commerces-locaux.png",
    imageAlt:
      "Illustration d'une personne posant une question à une intelligence artificielle sur un commerce local",
    featured: false,
    metaDescription:
      "Ce que les gens demandent vraiment à ChatGPT sur les artisans et commerces locaux, et comment écrire son site pour avoir une chance d'être la réponse. Par un développeur freelance du 64.",
    keywords: [
      "questions ChatGPT commerce local",
      "GEO référencement IA générative",
      "être cité par ChatGPT",
      "référencement local Pau",
      "visibilité IA artisan",
      "développeur web freelance 64",
      "SEO GEO Pyrénées-Atlantiques",
    ],
  },
  {
    id: "9",
    title:
      "Avoir un site ne suffit pas : être visible localement à Pau, Bayonne ou dans le Béarn",
    slug: "visibilite-locale-pau-bearn-cote-basque",
    excerpt:
      "Un site en ligne n'est pas automatiquement un site trouvé. Voici ce qui fait vraiment la différence quand quelqu'un cherche un artisan, un commerce ou un service près de chez lui, à Pau, à Bayonne, à Biarritz ou dans le Béarn intérieur.",
    content: `Vous avez un site, ou vous êtes en train d'en faire faire un, et vous vous demandez pourquoi il n'apparaît pas quand vous tapez votre propre métier suivi du nom de votre ville. C'est une des questions que j'entends le plus souvent, et la réponse tient en une phrase : avoir un site en ligne et être trouvé localement sont deux choses différentes. La seconde se construit, elle ne vient pas toute seule avec la première.

## Pourquoi un site « fini » peut rester invisible

Un site peut être esthétique, rapide, parfaitement fonctionnel, et malgré tout ne jamais apparaître quand un client potentiel cherche votre activité près de chez lui. La raison est presque toujours la même : rien dans le site ne dit clairement, ni à Google ni aux assistants IA, où vous exercez et pour qui. Un texte du type « bienvenue sur notre site, spécialiste de qualité depuis plusieurs années » ne contient aucun signal local exploitable, même si le message est sincère.

Ce qui fait la différence, c'est un contenu qui nomme réellement votre zone d'intervention, vos quartiers, vos villes voisines, votre métier tel que vos clients le formulent eux-mêmes. Un plombier qui écrit « intervention rapide à Pau, Lescar et Billère » sera compris et retenu bien plus facilement qu'un plombier qui écrit seulement « intervention rapide dans toute la région ».

## Ce que cherchent réellement vos clients

Quand quelqu'un a un problème à résoudre près de chez lui, il tape rarement une recherche vague. Il tape quelque chose de précis : le métier, parfois le quartier ou la ville, parfois une urgence. « Électricien Pau », « restaurant Bayonne centre », « institut de beauté Biarritz », « artisan couvreur Orthez ». De plus en plus, la même personne pose la question presque mot pour mot à ChatGPT ou à un autre assistant IA, et attend une réponse directe plutôt qu'une liste de liens à explorer.

Dans les deux cas, le principe est identique : votre site doit contenir, en toutes lettres, les réponses à ces questions précises. Pas de façon forcée ou répétitive, ce qui desservirait autant votre lecteur que votre référencement, mais de façon naturelle, dans des phrases qui décrivent réellement votre activité et votre secteur.

## Les trois leviers qui font une vraie différence locale

**Un contenu qui nomme votre territoire précisément.** Votre ville, mais aussi les communes voisines où vous intervenez réellement. Un artisan de l'agglomération paloise a intérêt à mentionner Lescar, Lons ou Jurançon s'il y travaille effectivement, pas à se limiter à « Pau » par prudence. La précision rassure autant qu'elle référence.

**Des pages qui répondent à une intention claire**, plutôt qu'une page unique qui essaie de tout dire à tout le monde. C'est exactement pour ça que j'ai construit, sur ce site, des pages dédiées à chaque grand bassin où j'interviens : une page pour [l'agglomération paloise](/creation-site-internet-pau), une pour [le Pays basque autour de Bayonne](/creation-site-internet-bayonne), une pour [Biarritz et la côte](/creation-site-internet-biarritz), une pour [Orthez et le Béarn intérieur](/creation-site-internet-orthez-bearn). Chacune parle du territoire concerné avec ses propres réalités, pas un copier-coller avec le nom de la ville changé.

**Des informations à jour et cohérentes partout.** Vos horaires, votre zone d'intervention, votre façon de travailler doivent dire la même chose sur votre site, sur votre fiche d'établissement si vous en avez une, et dans tout ce qu'un visiteur ou une IA générative pourrait lire à votre sujet. Des informations qui se contredisent d'un endroit à l'autre sèment le doute, autant chez un client que dans la façon dont un moteur de recherche évalue votre fiabilité.

## Le piège du site qui parle à tout le monde, donc à personne

Beaucoup de sites d'artisans ou de petites entreprises restent volontairement génériques, par souci de ne braquer personne : « nous intervenons dans toute la région », « des solutions pour tous vos besoins ». L'intention est compréhensible, le résultat est souvent contre-productif. Un texte trop large ne convainc ni un lecteur humain, qui n'y trouve rien de concret, ni un moteur de recherche, qui n'y trouve rien de précis à associer à une recherche locale.

Être précis ne veut pas dire s'enfermer. Un artisan qui écrit clairement qu'il intervient à Pau, Lescar et Billère peut tout à fait préciser plus loin qu'il se déplace aussi ailleurs sur demande. La précision d'abord, l'ouverture ensuite : c'est cet ordre qui fonctionne, pas l'inverse.

## Ce que je mets en place sur les sites que je construis

Sur les sites que je développe pour des clients du 64, chaque page importante est écrite pour un territoire précis, avec ses communes, ses réalités et son vocabulaire, jamais un modèle générique dupliqué. C'est le même principe que j'applique sur ce site : une page pour l'agglomération paloise, une pour Bayonne et le BAB, une pour Biarritz et la côte basque, une pour Orthez et le Béarn intérieur, chacune écrite différemment parce que ces territoires n'ont ni les mêmes clients ni les mêmes attentes.

S'y ajoute le travail sur le référencement pour les IA génératives, dont je parle plus en détail dans un autre article : un contenu clair et honnête, lisible sans détour, a bien plus de chances d'être repris par un assistant IA qu'un texte marketing vague, quel que soit le territoire concerné.

## Par où commencer si votre site est déjà en ligne

Il n'est pas toujours nécessaire de tout refaire. Souvent, il suffit de reprendre les pages existantes pour y intégrer clairement votre zone d'intervention réelle, avec les noms de communes que vos clients connaissent et utilisent. Dans d'autres cas, une page dédiée par secteur d'activité ou par zone géographique a plus de sens, en particulier si vous intervenez sur plusieurs bassins bien distincts, comme Pau et la côte basque.

Dans tous les cas, la meilleure façon de savoir ce qui manque à votre site est d'en parler avec quelqu'un qui connaît à la fois le référencement et votre territoire.

## Parlons de votre visibilité locale

Vous avez un site qui ne remonte pas quand on cherche votre activité à Pau, Bayonne, Biarritz ou ailleurs dans le 64, ou vous préparez un projet de site et voulez le construire directement avec ce travail en tête ? Décrivez-moi votre activité et votre zone d'intervention via le formulaire de contact ou au 06 79 08 88 45 : premier échange gratuit et sans engagement, devis clair sous 24h.`,
    author: "Christophe Mostefaoui",
    publishedAt: "2026-07-20",
    readTime: 7,
    category: "conseils-business",
    tags: [
      "Référencement local",
      "SEO local",
      "Pau",
      "Bayonne",
      "Biarritz",
      "Béarn",
      "PME",
      "Artisans",
    ],
    imageUrl: "/assets/images/visibilite-locale-pau-bearn-cote-basque.png",
    imageAlt:
      "Illustration sur la visibilité locale en ligne pour les commerces et artisans du Béarn et du Pays basque",
    featured: false,
    metaDescription:
      "Avoir un site ne suffit pas à être trouvé localement. Ce qui fait vraiment la différence pour apparaître dans les recherches à Pau, Bayonne, Biarritz ou dans le Béarn, par un développeur freelance du 64.",
    keywords: [
      "référencement local Pau",
      "visibilité locale Béarn",
      "SEO local Pyrénées-Atlantiques",
      "être trouvé sur Google Bayonne",
      "site internet artisan Pau",
      "développeur web freelance 64",
      "référencement Béarn Pays basque",
    ],
  },
  {
    id: "8",
    title:
      "Être trouvé sur Google ET sur ChatGPT en 2026 : le référencement a changé",
    slug: "referencement-google-chatgpt-2026",
    excerpt:
      "Vos clients ne tapent plus seulement leur recherche dans Google, ils la posent aussi à ChatGPT ou à d'autres assistants IA. Un site pensé uniquement pour Google devient invisible pour cette nouvelle façon de chercher. Voici ce que ça change concrètement, et comment je prépare mes sites pour les deux.",
    content: `Tapez une question sur un artisan, un commerce ou un service près de chez vous, et il y a de fortes chances que vous ne l'ayez pas tapée dans Google. De plus en plus de gens demandent directement à ChatGPT, à Claude ou à Perplexity de leur trouver une solution, de comparer des options ou de leur expliquer un sujet, et ces assistants répondent avec des sources qu'ils choisissent eux-mêmes. Si votre site n'est pas fait pour être compris par ces outils, il devient invisible pour une partie croissante de vos clients potentiels, même s'il est parfaitement placé sur Google.

## Deux façons de chercher, deux façons d'être trouvé

Le référencement que tout le monde connaît consiste à apparaître dans la liste de résultats Google quand quelqu'un tape une recherche. Vous cliquez, vous arrivez sur un site, vous comparez plusieurs pages vous-même. C'est un jeu de positionnement : être dans les trois premiers résultats change tout.

La recherche via une IA générative fonctionne différemment. Vous posez une question complète, en langage naturel, et l'assistant vous donne directement une réponse construite, parfois en citant une ou deux sources qu'il juge fiables et claires. Il n'y a plus de liste de dix liens à comparer : il y a une réponse, et votre site y figure ou n'y figure pas. C'est plus radical que le référencement classique, et c'est exactement pour ça que peu de prestataires s'en occupent encore sérieusement.

## Pourquoi un site optimisé pour Google ne suffit plus

Un site pensé uniquement pour Google mise beaucoup sur des mots-clés, des liens et des signaux techniques que le visiteur ne voit jamais. Une IA générative, elle, lit le contenu à peu près comme le ferait un lecteur humain pressé : elle cherche une réponse claire, complète et honnête à une question précise. Un site truffé de superlatifs marketing sans réponse concrète a peu de chances d'être cité, même s'il est bien positionné sur Google.

Il y a aussi un problème technique plus discret : beaucoup de sites modernes affichent leur contenu uniquement une fois que le navigateur a exécuté du code. C'est invisible pour le visiteur, mais pour un robot qui vient lire rapidement une page sans forcément exécuter ce code, la page peut apparaître vide ou incomplète. Le contenu existe, mais l'outil qui devrait le lire ne le voit pas.

## Ce que je mets en place concrètement sur mes sites

Sur ce site, chaque page importante existe sous une forme lisible directement, sans dépendre de l'exécution du code par le visiteur : le contenu est déjà présent dans la page telle qu'un robot la reçoit, articles de blog compris. C'est un travail technique que je fais systématiquement, pas une option.

J'ajoute aussi des fichiers spécifiquement destinés aux intelligences artificielles, qui résument clairement qui vous êtes, ce que vous proposez et où vous intervenez, dans un format que ces outils savent lire facilement. C'est un peu l'équivalent d'une carte de visite écrite spécialement pour eux, en plus de la version destinée aux visiteurs humains.

J'utilise également des données structurées, un langage technique standardisé que les moteurs de recherche et les IA comprennent nativement, pour décrire précisément votre activité, vos horaires, vos avis ou votre zone d'intervention. C'est invisible sur la page, mais ça aide énormément ces outils à comprendre de quoi parle réellement votre site.

## Répondre à une vraie question reste la meilleure stratégie

Au-delà des aspects techniques, il y a un principe simple qui compte autant, sinon plus : une IA générative cite volontiers une page qui répond clairement à une question précise, sans détour ni contenu creux. C'est exactement l'esprit de l'article que j'ai publié récemment sur le coût d'un site internet : une vraie question, une réponse honnête et complète, sans grille tarifaire artificielle ni promesse vague.

Une page de questions fréquentes bien écrite, avec des réponses complètes et autonomes plutôt que des phrases coupées, est un excellent format pour ce type de citation. C'est ce que je mets en place sur les pages de service et les pages locales que je développe : des vraies réponses à des vraies questions que se posent vos clients, pas du remplissage.

## Les questions que vos clients posent déjà à une IA

Ce ne sont pas des questions futuristes, elles sont déjà posées aujourd'hui, tous les jours, par des gens qui pourraient être vos clients :

- « Trouve-moi un artisan qui rénove une salle de bain dans le Béarn »
- « Compare les options pour créer un site pour mon restaurant à Bayonne »
- « Explique-moi ce que je dois vérifier avant de choisir un développeur web »
- « Quels sont les documents à demander à un prestataire avant de signer »

Chacune de ces questions débouche sur une réponse construite par l'IA, avec parfois un site cité en source, parfois aucun site du tout si l'outil ne trouve rien d'assez clair pour appuyer sa réponse. Un artisan ou une PME qui n'a jamais entendu parler de ce sujet perd cette opportunité sans même savoir qu'elle existait.

## Ce que ça change concrètement pour votre activité

Un client qui demande à une IA « qui peut créer mon site à Pau » ou « comment choisir un développeur web dans le Béarn » reçoit une réponse construite à partir de sites que l'outil juge fiables et clairs. Si le vôtre n'est pas préparé pour ça, vous perdez une visibilité qui grandit chaque mois, sans même vous en rendre compte puisque rien ne vous alerte de cette invisibilité-là.

À l'inverse, un site bien préparé peut se retrouver cité dans une réponse générée par une IA, avec un lien vers votre page, alors même qu'il n'est pas forcément en première position sur Google. C'est un canal encore peu occupé par la concurrence locale, ce qui en fait un vrai avantage pour les entreprises qui s'y intéressent maintenant plutôt que dans deux ans.

## Un premier réflexe simple, même sans refaire votre site tout de suite

Si une refonte complète n'est pas encore d'actualité pour vous, il y a un premier réflexe accessible à tous : tapez vous-même quelques questions que poserait un client dans ChatGPT ou un autre assistant, et regardez ce qui ressort. Votre activité apparaît-elle ? Les informations citées sont-elles justes ? C'est un test simple, gratuit, qui vous donne une idée concrète de votre visibilité actuelle sur ce nouveau canal, bien avant d'investir quoi que ce soit.

Vous découvrirez peut-être que des informations obsolètes ou approximatives circulent déjà à votre sujet, reprises par l'IA depuis une ancienne fiche ou un site mal tenu. C'est aussi une bonne raison de s'y intéresser maintenant plutôt que de laisser d'autres sources moins fiables raconter votre activité à votre place.

## Ce que je ne promets pas

Je ne peux pas vous garantir qu'une IA en particulier citera votre site pour telle ou telle question : personne ne le peut, ces outils évoluent constamment et gardent leurs critères de sélection largement secrets. Ce que je peux garantir, c'est que je mets en place tout ce qui est techniquement en mon pouvoir pour que votre site soit lisible, clair et crédible aux yeux de ces outils, exactement comme je le fais pour Google depuis toujours.

## Parlons de votre projet

Vous avez un site qui mériterait d'être aussi visible pour les IA que pour Google, ou un projet de site à construire directement avec ces deux exigences en tête ? Décrivez-moi votre activité via le formulaire de contact ou au 06 79 08 88 45, où que vous soyez à Pau, dans le Béarn, sur la côte basque ou ailleurs : premier échange gratuit et sans engagement, devis clair sous 24h.`,
    author: "Christophe Mostefaoui",
    publishedAt: "2026-07-16",
    readTime: 8,
    category: "veille-tech",
    tags: [
      "Référencement",
      "SEO",
      "Intelligence artificielle",
      "ChatGPT",
      "GEO",
      "PME",
      "Pau",
    ],
    imageUrl: "/assets/images/referencement-google-chatgpt-2026.png",
    imageAlt:
      "Illustration sur le référencement d'un site internet pour Google et les intelligences artificielles",
    featured: false,
    metaDescription:
      "Vos clients cherchent aussi sur ChatGPT, pas seulement sur Google. Ce que le référencement pour les IA change concrètement pour votre site, par un développeur freelance du 64.",
    keywords: [
      "référencement ChatGPT",
      "SEO IA 2026",
      "GEO référencement",
      "être visible sur ChatGPT",
      "référencement intelligence artificielle",
      "développeur web freelance Pau",
      "visibilité IA générative",
    ],
  },
  {
    id: "7",
    title:
      "Un chatbot IA pour votre commerce : gadget ou vrai retour sur investissement ?",
    slug: "chatbot-ia-commerce-pme",
    excerpt:
      "Un assistant qui répond à vos clients 24h/24, ça fait rêver ou ça fait peur, selon qui vous demandez. Je vous explique honnêtement comment fonctionne un chatbot IA, ce qu'il coûte vraiment et dans quels commerces il a un intérêt réel, en m'appuyant sur celui installé sur ce site.",
    content: `Vous avez sans doute déjà croisé un chatbot sur un site et pensé qu'il ne servait à rien, un menu déroulant déguisé qui répond à côté de la question. Vous en avez peut-être croisé un autre, plus convaincant, qui a répondu juste et vous a fait gagner du temps. La différence entre les deux n'est pas magique : elle tient à la technologie utilisée et à la façon dont elle est configurée. Si vous vous demandez si un chatbot IA a du sens pour votre commerce, votre cabinet ou votre atelier, voici une réponse honnête, en m'appuyant sur celui que vous pouvez tester en bas à droite de cette page.

## Ce qu'un chatbot IA fait vraiment, concrètement

Un chatbot IA n'est pas un arbre de décision avec des boutons préprogrammés. Il comprend une question posée avec ses propres mots, même mal formulée ou incomplète, et répond en s'appuyant sur les informations que vous lui avez fournies sur votre activité : vos services, vos horaires, votre zone d'intervention, votre façon de travailler. Il ne remplace pas un vendeur ou un artisan, il filtre et prépare le terrain avant que vous n'interveniez vous-même.

Sur ce site, le mien répond aux questions sur mes services, mon parcours ou mes tarifs, propose de transmettre une demande de devis quand la conversation s'y prête, et relance poliment si un visiteur semble hésiter sans jamais insister lourdement. C'est ce niveau d'usage, modeste mais utile, qui a du sens pour la plupart des commerces et PME, bien plus qu'un robot qui prétend tout faire.

## Ce qu'il peut faire pour un commerce, un artisan ou une PME

Les cas d'usage qui reviennent le plus souvent chez mes clients :

- **Répondre aux questions répétitives** : horaires, tarifs de base, zone d'intervention, délais. Ce sont souvent les mêmes questions, à toute heure, y compris en dehors de vos horaires d'ouverture.
- **Qualifier une demande avant un appel** : le visiteur décrit son besoin, le chatbot pose les bonnes questions et vous transmet une demande déjà structurée plutôt qu'un simple « bonjour, j'ai une question ».
- **Capturer un contact qui, sinon, repartirait** : un visiteur qui hésite à 23h ne va pas attendre votre ouverture pour vous appeler. S'il peut laisser sa question et son email en deux phrases, vous avez une chance de le recontacter le lendemain matin.
- **Rassurer sur des points précis** : garanties, matériaux utilisés, processus de travail, tout ce qui lève un doute avant que le visiteur ne quitte simplement la page.

Ce qu'il ne fait pas, et qu'aucun chatbot sérieux ne devrait prétendre faire : vendre à votre place un produit ou service complexe, remplacer un vrai conseil personnalisé, ou improviser des informations que vous ne lui avez pas fournies. Un bon chatbot dit « je ne sais pas, laissez-moi vous mettre en contact » plutôt que d'inventer une réponse.

## Comment ça fonctionne techniquement, sans jargon

Le chatbot de ce site s'appuie sur un modèle d'intelligence artificielle (Mistral AI, une entreprise française) auquel je transmets, à chaque question, des consignes précises : le ton à adopter, les informations à connaître sur mon activité, ce qu'il a le droit de dire ou non. Tout cela passe par un serveur que j'ai configuré moi-même, pas par un widget générique branché en cinq minutes.

Cette différence compte pour vous, si vous envisagez d'en installer un : un chatbot mal configuré peut donner des informations fausses sur vos prix ou vos délais, ce qui abîme la confiance plus vite que l'absence de chatbot. La configuration, le prompt qui définit son comportement et les garde-fous qui l'empêchent de sortir de son rôle, est le vrai travail. L'outil en lui-même n'est que la partie visible.

## Chatbot générique ou chatbot sur mesure : la vraie différence

Beaucoup d'outils en ligne promettent d'ajouter un chatbot IA à votre site en quelques clics, sans développeur. Ils fonctionnent, dans une certaine mesure, mais avec des limites que je constate régulièrement chez des clients qui en avaient testé un avant de venir me voir.

Un chatbot générique connaît ce que vous lui écrivez dans une petite fenêtre de configuration, rarement plus. Il ne sait pas nuancer, il répète une formule dès qu'une question sort du script prévu, et il ressemble à celui de vos concurrents qui utilisent le même outil. Il s'affiche aussi souvent avec le logo de la plateforme qui l'héberge, ce qui rappelle en permanence au visiteur qu'il ne parle pas vraiment à votre entreprise.

Un chatbot configuré sur mesure connaît votre activité en détail, parle avec le ton de votre marque, s'intègre visuellement à votre site plutôt que de flotter dessus comme un corps étranger, et surtout respecte des règles précises que vous avez définies : ce qu'il peut promettre, ce qu'il doit refuser de dire, quand il doit vous transmettre la main plutôt que d'improviser. C'est cette rigueur de configuration qui fait la différence entre un gadget et un outil qui rapporte réellement des contacts.

## Combien ça coûte réellement

C'est la question que tout le monde pose, et la réponse surprend souvent : le fonctionnement au quotidien coûte très peu. Les modèles d'IA facturent à l'usage, au volume de texte traité, et pour un commerce qui reçoit quelques dizaines de conversations par mois, la facture mensuelle d'API se compte en quelques euros, pas en centaines.

Ce qui a un coût réel, c'est la mise en place : configurer le comportement du chatbot pour qu'il connaisse précisément votre activité, sécuriser les échanges pour que personne ne puisse détourner l'outil ou faire exploser votre facture, brancher la capture de contact vers votre email ou votre outil de gestion, et surtout intégrer tout ça proprement dans le design de votre site plutôt que de coller un widget qui jure avec le reste. C'est un développement sur mesure, chiffré comme tel dans un devis, pas un abonnement mensuel à un outil tout fait.

## Dans quels cas ça vaut le coup, et dans quels cas non

Un chatbot IA a du sens si vous recevez régulièrement les mêmes questions par téléphone ou email, si votre activité génère des demandes en dehors de vos horaires, ou si votre site a suffisamment de visites pour que la capture de quelques contacts supplémentaires par mois représente un vrai gain.

Il a moins de sens si votre activité repose avant tout sur la relation humaine directe dès le premier contact (certains artisans, certains professionnels du soin), si votre site reçoit très peu de visites, ou si vous n'avez pas la capacité de traiter rapidement les contacts qu'il capture. Un chatbot qui génère des demandes que personne ne rappelle est pire qu'inutile : il déçoit un client qui pensait avoir été pris en charge.

Je le dis aussi clairement à mes clients qu'ici : un formulaire de contact bien conçu suffit largement à beaucoup de sites. Le chatbot est un plus, pas un passage obligé, et je ne le propose pas systématiquement dans un devis si le besoin ne le justifie pas.

## Testez celui-ci avant de vous décider

La meilleure façon de juger si un chatbot IA a sa place sur votre site n'est pas de lire un article de plus à ce sujet, c'est d'en tester un vrai. Posez-lui une question sur mes services, sur SmartPlanning, ou sur mes tarifs, vous verrez de vous-même ce qu'une conversation bien pensée peut apporter, ou pas, à votre propre activité.

## Parlons de votre projet

Vous vous demandez si un chatbot IA aurait sa place sur votre site, ou vous avez simplement un projet de site à Pau, dans le Béarn, sur la côte basque ou ailleurs ? Décrivez-moi votre activité via le formulaire de contact ou au 06 79 08 88 45 : premier échange gratuit et sans engagement, devis clair sous 24h. Si un chatbot n'est pas la bonne réponse pour vous, je vous le dirai aussi.`,
    author: "Christophe Mostefaoui",
    publishedAt: "2026-07-16",
    readTime: 8,
    category: "ia-pratique",
    tags: [
      "Chatbot IA",
      "Intelligence artificielle",
      "PME",
      "Commerce",
      "Artisans",
      "Pau",
      "Conseils",
    ],
    imageUrl: "/assets/images/chatbot-ia-commerce-pme.png",
    imageAlt:
      "Illustration d'un chatbot IA intégré à un site internet pour un commerce",
    featured: false,
    metaDescription:
      "Un chatbot IA pour votre commerce : gadget ou vrai retour sur investissement ? Fonctionnement, coût réel et cas où ça a du sens, par un développeur freelance du 64.",
    keywords: [
      "chatbot IA commerce",
      "chatbot intelligent PME",
      "assistant conversationnel site internet",
      "coût chatbot IA",
      "chatbot Mistral AI",
      "intelligence artificielle PME Pau",
      "développeur web freelance 64",
    ],
  },
  {
    id: "6",
    title:
      "Combien coûte un site internet en 2026 ? Ce qui fait vraiment varier un devis",
    slug: "combien-coute-site-internet-2026",
    excerpt:
      "Le prix d'un site internet peut aller du simple au décuple, et ce n'est ni du hasard ni de l'arnaque. Périmètre, contenu, fonctionnalités, référencement : je vous explique honnêtement ce qui fait varier un devis, et les pièges des offres « pas chères ».",
    content: `Vous avez demandé deux devis pour votre site et reçu deux montants sans rapport l'un avec l'autre ? C'est l'expérience de la plupart des artisans, commerçants et dirigeants de PME que je rencontre entre Pau, le Béarn et la côte basque. Cette page ne vous donnera pas un tarif magique, méfiez-vous de ceux qui en affichent un sans vous avoir parlé. Elle vous explique ce que vous payez réellement dans un site internet, et comment comparer des devis qui semblent incomparables.

## La seule vraie réponse : ça dépend de ce que votre site doit faire

Demander « combien coûte un site ? », c'est un peu demander « combien coûte un local commercial ? ». Un atelier en zone artisanale et une boutique en centre-ville de Pau n'ont ni le même prix, ni le même rôle. Pour un site, c'est pareil : tout dépend du travail qu'il doit accomplir pour vous.

Un site qui doit simplement présenter votre activité et permettre de vous contacter ne demande pas le même travail qu'un site qui doit prendre des réservations, vendre en ligne, répondre aux questions de vos clients à votre place ou vous faire remonter dans les recherches locales face à vos concurrents.

C'est la première question que je pose, bien avant de parler technique : **qu'est-ce que ce site doit rapporter ou faire gagner ?** Des demandes de devis ? Des appels ? Des ventes ? Du temps ? La réponse dimensionne tout le reste.

## Les six facteurs qui font varier un devis

### 1. Le périmètre : ce que le site contient

Une page unique bien construite, un site vitrine de cinq pages, un site complet avec blog et pages par service ou par ville : chaque page supplémentaire représente de la conception, de la rédaction, de la structure et des tests. Un devis sérieux liste précisément ce qui est inclus.

### 2. Le contenu : textes, photos, vidéos

C'est le poste le plus sous-estimé. Qui écrit les textes ? Qui fournit les photos ? Un site magnifique avec des textes bâclés ne convaincra ni vos clients ni Google. Selon les projets, je pars de votre matière brute et je la retravaille, ou je produis le contenu avec vous, y compris photos et vidéos professionnelles, jusqu'aux prises de vue par drone pour montrer vos locaux ou vos réalisations (je suis télépilote certifié).

### 3. Les fonctionnalités : du formulaire au chatbot

Formulaire de contact, prise de rendez-vous, galerie, avis, espace client, paiement en ligne, assistant conversationnel qui répond 24h/24 (comme celui en bas à droite de ce site) : chaque fonctionnalité a un coût de développement et de fiabilisation. La bonne démarche n'est pas d'en empiler, mais de choisir celles qui servent votre objectif.

### 4. Le référencement : être trouvé, sur Google et ailleurs

Un site que personne ne trouve est une plaquette rangée dans un tiroir. Le référencement local, apparaître quand on cherche votre métier à Pau, Bayonne, Orthez ou Biarritz, se construit dans la structure même du site : textes, vitesse, données techniques lisibles par les moteurs. Et en 2026, vos clients posent aussi leurs questions à ChatGPT ou à d'autres assistants : préparer votre site à être compris et cité par ces outils est un travail spécifique, que très peu de prestataires font.

### 5. Votre autonomie : qui fera vivre le site ?

Voulez-vous modifier vous-même vos horaires, vos menus, vos actualités ? Cela suppose une interface d'administration et une formation à la livraison. Préférez-vous déléguer ? Cela suppose un accompagnement dans la durée. Les deux se chiffrent différemment : l'important est que ce soit décidé dès le départ, pas découvert après.

### 6. La suite : hébergement, maintenance, évolutions

Un site vit : mises à jour de sécurité, sauvegardes, petites évolutions. Certains prestataires cachent une dépendance coûteuse derrière un prix d'appel bas. Chez moi, c'est l'inverse : le site vous appartient entièrement, et la maintenance est une option claire, jamais une obligation déguisée.

## Pourquoi les offres « pas chères » coûtent souvent le plus cher

Les plateformes de création en ligne et les offres à petit prix mensuel séduisent, et je comprends pourquoi. Mais regardez ce qu'elles impliquent vraiment :

- **Un abonnement sans fin** : sur plusieurs années, le « petit prix mensuel » dépasse souvent largement un site sur mesure… que vous ne posséderez jamais.
- **Un modèle identique à vos concurrents** : mêmes gabarits, mêmes pages interchangeables. Difficile de se démarquer quand tout le monde a le même site.
- **Un référencement au rabais** : ces sites se ressemblent aussi pour Google, et les premiers résultats locaux restent occupés par ceux qui ont investi correctement.
- **Votre site ne vous appartient pas** : vous arrêtez de payer, tout disparaît. Textes, images, historique : repartis de zéro.

Il y a des cas où une solution simple suffit, et je le dis quand c'est le cas : un devis honnête commence par là.

## Freelance local, agence, plateforme : comment choisir

Une agence facture une équipe, des locaux et de la coordination, pertinent pour de très gros projets. Une plateforme en ligne vous laisse tout faire vous-même. Entre les deux, le freelance local vous donne un interlocuteur unique qui conçoit, développe et livre lui-même votre site, se déplace chez vous (gratuitement dans tout le 64 en ce qui me concerne), comprend votre marché local et reste joignable après la mise en ligne.

Mon parcours ajoute une garantie qui compte : je suis le fondateur de SmartPlanning.fr, un logiciel de gestion de plannings que j'ai conçu, développé et que j'exploite seul. Concevoir un produit complet et le faire tourner au quotidien, c'est un autre niveau d'exigence que « livrer un site et disparaître », et vos projets en bénéficient directement.

## Comment se passe un devis avec moi

Pas de grille tarifaire à faire peur ou à enjoliver : chaque projet est chiffré sur mesure, et c'est une bonne nouvelle pour vous : vous ne payez que ce dont vous avez besoin.

1. **Un premier échange gratuit**, chez vous, dans votre commerce ou en visio : vos objectifs, vos clients, votre concurrence, votre budget réaliste.
2. **Un devis détaillé sous 24h** : périmètre précis, fonctionnalités incluses, planning, et ce qui n'est *pas* inclus, écrit noir sur blanc.
3. **Un paiement en 3 fois sans frais possible**, et un démarrage généralement sous une semaine.

Vous savez exactement ce que vous achetez avant d'engager un euro.

## Les bonnes questions à poser avant de signer (à moi comme aux autres)

- Le site m'appartiendra-t-il totalement, fichiers et nom de domaine compris ?
- Qui écrit les textes, et le référencement local est-il inclus ou en option ?
- Que se passe-t-il après la livraison : formation, corrections, maintenance ?
- Puis-je voir des sites réellement en ligne que vous avez développés ?
- Le devis liste-t-il ce qui n'est pas compris ?

Un prestataire sérieux répond à ces cinq questions sans détour. C'est même un excellent filtre.

## Parlons de votre projet

Vous avez un projet de site (création, refonte, boutique en ligne) à Pau, dans le Béarn, sur la côte basque ou ailleurs ? Décrivez-le-moi via le formulaire de contact ou au 06 79 08 88 45 : premier échange gratuit et sans engagement, devis clair sous 24h. Et si une solution simple suffit à votre besoin, je vous le dirai aussi.`,
    author: "Christophe Mostefaoui",
    publishedAt: "2026-07-10",
    readTime: 7,
    category: "conseils-business",
    tags: [
      "Prix site internet",
      "Devis",
      "PME",
      "Artisans",
      "Pau",
      "Béarn",
      "Conseils",
    ],
    imageUrl: "/assets/images/combien-coute-site-internet-2026.png",
    imageAlt:
      "Illustration sur le coût et le devis d'un site internet pour une PME",
    featured: true,
    metaDescription:
      "Combien coûte un site internet en 2026 ? Les 6 facteurs qui font varier un devis, les pièges des offres pas chères, et comment comparer. Par un développeur freelance du 64.",
    keywords: [
      "combien coûte un site internet",
      "prix site internet 2026",
      "devis site internet Pau",
      "tarif création site web",
      "coût site vitrine PME",
      "création site internet Béarn",
      "développeur web freelance 64",
    ],
  },
];

// Fonction utilitaire pour récupérer un article par slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Fonction utilitaire pour récupérer les articles par catégorie
export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

// Fonction utilitaire pour récupérer les articles featured
export const getFeaturedBlogPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};
