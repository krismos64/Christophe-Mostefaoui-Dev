// Pages dédiées par service (créées le 13/11/2026), rendues par src/pages/ServiceDetail.tsx.
// RÈGLES : jamais de prix ni de stats inventées, jamais de promesse de position
// sur Google, jamais « expert ». Chaque page a un bloc « propre » qui lui est
// spécifique : sans lui, les quatre pages se ressemblent (pages satellites).
// Les faits (délais, paiement, Stripe, Mondial Relay) viennent de
// public/chatbot-knowledge.txt : changer l'un impose de changer l'autre.

export interface ServiceItem {
  titre: string;
  texte: string;
}

export interface ServiceLien {
  to: string;
  label: string;
}

export interface ServicePage {
  slug: string;
  /** Nom dans le fil d'Ariane, le footer et les liens croisés */
  nomCourt: string;
  /** Une ligne pour les liens croisés entre services */
  resume: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  scene: "vitrine" | "boutique" | "refonte" | "local" | "application";
  /** Champ serviceType du schéma Service */
  serviceType: string;
  pourQui: { titre: string; items: string[] };
  comprend: { titre: string; items: ServiceItem[] };
  /** Bloc spécifique à la page : ce qui la distingue des trois autres */
  propre: { surtitre: string; titre: string; intro: string; items: ServiceItem[] };
  etapes: ServiceItem[];
  preuve: {
    /** Titre du projet dans src/data/realisations.ts ; absent = pas de vignette */
    projet?: string;
    titre: string;
    texte: string;
    lien: { href: string; label: string };
  };
  limites: { titre: string; texte: string };
  faq: { question: string; reponse: string }[];
  liens: ServiceLien[];
}

export const servicePages: ServicePage[] = [
  {
    slug: "creation-site-vitrine",
    nomCourt: "Site vitrine",
    resume: "Quelques pages claires pour être trouvé et contacté.",
    metaTitle: "Création de site vitrine à Pau pour artisans et TPE",
    metaDescription:
      "Un site vitrine clair, lisible sur téléphone et visible sur Google, pour les artisans, commerçants et TPE de Pau et du Béarn. Devis gratuit sous 24h.",
    h1: "Création de site vitrine pour artisans, commerçants et TPE.",
    intro:
      "Quelques pages qui disent ce que vous faites, où vous trouver et comment vous joindre. Je conçois votre site vitrine sur mesure, depuis Artix, près de Pau, et vous gardez un seul interlocuteur du premier rendez-vous à la mise en ligne.",
    scene: "vitrine",
    serviceType: "Création de site vitrine",
    pourQui: {
      titre: "Un site vitrine vous convient si",
      items: [
        "Vos clients vous cherchent sur Google avant d'appeler, et ne trouvent aujourd'hui qu'une page Facebook ou un annuaire.",
        "Vous voulez recevoir des appels et des demandes de devis, sans vendre en ligne.",
        "Vous lancez votre activité et il vous faut une adresse sérieuse à mettre sur vos cartes et vos devis.",
      ],
    },
    comprend: {
      titre: "Ce que contient la prestation",
      items: [
        {
          titre: "Des pages écrites pour vos clients",
          texte:
            "Accueil, services, à propos, contact : chaque page répond à une question précise, avec vos mots et ceux que vos clients tapent dans Google.",
        },
        {
          titre: "Un site conçu d'abord pour le téléphone",
          texte:
            "Je dessine le site sur un écran de téléphone avant de l'adapter à l'ordinateur : texte lisible sans zoomer, bouton d'appel sous le pouce.",
        },
        {
          titre: "Le référencement dès le départ",
          texte:
            "Titres, structure, vitesse et données lues par Google sont travaillés pendant la création. Le contenu reste lisible par les assistants IA comme ChatGPT.",
        },
        {
          titre: "Un formulaire et un numéro cliquable",
          texte:
            "Chaque page mène à une prise de contact : formulaire court, numéro qui lance l'appel, plan d'accès.",
        },
        {
          titre: "La main sur votre site",
          texte:
            "Le site vous appartient. Après la mise en ligne, vous choisissez entre une formation pour modifier vos textes vous-même et une maintenance que j'assure.",
        },
      ],
    },
    propre: {
      surtitre: "Avant d'appeler",
      titre: "Ce que votre futur client doit pouvoir vérifier en une minute.",
      intro:
        "Un visiteur parcourt un site vitrine pour décider s'il vous contacte. Je construis les pages autour de quatre vérifications.",
      items: [
        {
          titre: "Ce que vous faites",
          texte: "Vos prestations, nommées comme vos clients les nomment, dès le haut de la page.",
        },
        {
          titre: "Où vous intervenez",
          texte: "Votre commune, votre secteur, vos horaires : ce qui lui dit s'il est concerné.",
        },
        {
          titre: "Pourquoi vous faire confiance",
          texte:
            "Photos de vos réalisations, ancienneté, labels, avis Google : des éléments qu'il peut contrôler.",
        },
        {
          titre: "Comment vous joindre",
          texte: "Un numéro cliquable et un formulaire court, visibles sans chercher.",
        },
      ],
    },
    etapes: [
      {
        titre: "Premier échange, gratuit",
        texte:
          "Chez vous, dans le 64, ou en visio. Vous me décrivez votre activité et vos clients, je vous dis ce qui est utile et ce qui ne l'est pas.",
      },
      {
        titre: "Devis sous 24h",
        texte:
          "Périmètre, planning et prix posés noir sur blanc. Le paiement en trois fois sans frais est possible.",
      },
      {
        titre: "Contenus et maquette",
        texte:
          "Vous me transmettez vos textes, vos photos et votre logo. Je peux écrire les textes avec vous et réaliser les photos ou les vidéos, y compris par drone.",
      },
      {
        titre: "Mise en ligne et prise en main",
        texte:
          "Je mets le site en ligne, je vérifie son affichage sur téléphone et ordinateur, et je vous montre comment le faire vivre.",
      },
    ],
    preuve: {
      projet: "Cabinet Infirmier Graslin",
      titre: "Un exemple en ligne : le Cabinet Infirmier Graslin",
      texte:
        "Un site vitrine pour un cabinet infirmier : présentation des soins, informations pratiques et prise de contact pour les patients du quartier. Le site est en ligne, vous pouvez le parcourir.",
      lien: { href: "https://cabinet-infirmier-graslin.fr/", label: "Visiter le site du cabinet" },
    },
    limites: {
      titre: "Quand un site vitrine ne suffit pas",
      texte:
        "Pour encaisser des commandes, il vous faut une boutique en ligne. Si vos clients doivent se connecter à un espace personnel ou réserver un créneau, on parle d'un site plus complet ou d'une application. Dites-le au premier échange : le devis part de votre besoin.",
    },
    faq: [
      {
        question: "Combien de temps faut-il pour créer un site vitrine ?",
        reponse:
          "À titre indicatif, un site vitrine simple demande une à deux semaines une fois vos contenus réunis. Le délai réel dépend de votre projet et figure dans le devis.",
      },
      {
        question: "Combien coûte un site vitrine ?",
        reponse:
          "Je travaille uniquement au devis sur mesure, gratuit et envoyé sous 24h après un premier échange. Le prix dépend du nombre de pages, des contenus à produire et des fonctionnalités prévues.",
      },
      {
        question: "Dois-je fournir les textes et les photos ?",
        reponse:
          "Vous pouvez les fournir, ou me confier leur production : j'écris les textes avec vous et je réalise photos et vidéos. Je ne crée pas de logo : j'intègre le vôtre, ou je conçois un site cohérent sans logo.",
      },
      {
        question: "Qui s'occupe de l'hébergement et du nom de domaine ?",
        reponse:
          "Je vous accompagne dans le choix et la configuration de l'hébergement et du nom de domaine. Hébergement, maintenance et évolutions figurent dans le devis comme des options séparées, sans obligation cachée. Le site vous appartient entièrement.",
      },
    ],
    liens: [
      { to: "/blog/site-vitrine-ou-reseaux-sociaux", label: "Site vitrine ou page Facebook : faut-il les deux ?" },
      { to: "/blog/preparer-demande-devis-site-internet", label: "Préparer sa demande de devis de site internet" },
      { to: "/creation-site-internet-pau", label: "Votre site internet dans l'agglomération de Pau" },
    ],
  },
  {
    slug: "creation-boutique-en-ligne",
    nomCourt: "Boutique en ligne",
    resume: "Vendre en ligne, avec une gestion qui tient dans votre journée.",
    metaTitle: "Création de boutique en ligne à Pau et dans le Béarn",
    metaDescription:
      "Boutique en ligne sur mesure pour artisans et commerçants du Béarn : paiement par carte, stock, livraison, gestion depuis votre téléphone. Devis sous 24h.",
    h1: "Création de boutique en ligne pour artisans et commerçants.",
    intro:
      "Vendre en ligne, c'est aussi préparer des colis, suivre un stock et répondre aux acheteurs. Je construis votre boutique autour de votre façon de travailler, pour que sa gestion tienne dans votre journée.",
    scene: "boutique",
    serviceType: "Création de boutique en ligne",
    pourQui: {
      titre: "Une boutique sur mesure vous convient si",
      items: [
        "Vous vendez déjà en direct (atelier, marché, magasin) et vous voulez un seul stock pour le site et la vente en direct.",
        "Vos produits ont des particularités : pièces uniques, options, fabrication à la commande.",
        "Vous voulez gérer vos commandes depuis votre téléphone, sans ordinateur sous la main.",
      ],
    },
    comprend: {
      titre: "Ce que contient la prestation",
      items: [
        {
          titre: "Un catalogue que vous tenez vous-même",
          texte:
            "Ajouter un produit, changer un prix, retirer une pièce vendue : vous le faites depuis l'administration, sans m'appeler.",
        },
        {
          titre: "Le paiement par carte",
          texte:
            "Le paiement par carte passe par Stripe, un prestataire spécialisé dans le paiement en ligne.",
        },
        {
          titre: "Le stock et les factures",
          texte:
            "Le stock se met à jour à chaque vente et la facture est générée pour l'acheteur.",
        },
        {
          titre: "La livraison",
          texte:
            "Point relais ou envoi à domicile : le mode de livraison est choisi avec vous et intégré au parcours d'achat.",
        },
        {
          titre: "Un espace pour vos acheteurs",
          texte: "Ils y retrouvent leurs commandes, leurs factures et leurs adresses.",
        },
      ],
    },
    propre: {
      surtitre: "Après le clic",
      titre: "Ce qui se passe après la commande, de votre côté.",
      intro:
        "Une boutique se juge à ce que vous devrez faire chaque jour. Avant de coder, on déroule ensemble le trajet d'une commande.",
      items: [
        {
          titre: "La commande arrive",
          texte: "Vous êtes prévenu, le stock a déjà baissé, le paiement est encaissé.",
        },
        {
          titre: "Vous préparez le colis",
          texte:
            "Les informations utiles à l'envoi sont dans la commande : adresse ou point relais, contenu.",
        },
        {
          titre: "L'acheteur est tenu au courant",
          texte: "Il reçoit sa confirmation et sa facture, et retrouve sa commande dans son espace.",
        },
        {
          titre: "Vous vendez aussi en direct",
          texte:
            "Une vente faite sur un marché se saisit depuis votre téléphone : le stock du site reste juste.",
        },
      ],
    },
    etapes: [
      {
        titre: "Premier échange, gratuit",
        texte:
          "Vous me montrez vos produits et votre façon de vendre aujourd'hui. On liste ce que la boutique doit faire, et ce dont vous n'avez pas besoin.",
      },
      {
        titre: "Devis sous 24h",
        texte:
          "Le devis détaille le périmètre, le planning et le prix. Le paiement en trois fois sans frais est possible.",
      },
      {
        titre: "Construction et essais",
        texte:
          "Je construis la boutique, puis nous passons de vraies commandes d'essai, du panier jusqu'à l'envoi.",
      },
      {
        titre: "Ouverture et formation",
        texte:
          "Mise en ligne, formation à l'administration, puis corrections de bugs prises en charge après la livraison.",
      },
    ],
    preuve: {
      projet: "Lune-Soleil",
      titre: "Un exemple en ligne : Lune-Soleil, bijoux faits main à Artix",
      texte:
        "Boutique sur mesure pour une créatrice de bijoux : paiement par carte, stock partagé entre le site et les marchés, factures, livraison Mondial Relay, espace client. Elle gère sa boutique depuis son téléphone, y compris sur un stand de marché.",
      lien: { href: "https://lune-soleil.fr/", label: "Visiter la boutique Lune-Soleil" },
    },
    limites: {
      titre: "Quand une plateforme standard suffit",
      texte:
        "Si vous débutez avec peu de produits et sans contrainte particulière, une plateforme par abonnement permet de tester votre marché. Elle a ses contreparties : un coût chaque mois, un rendu proche de celui des autres boutiques du même outil, et une boutique qui s'arrête avec l'abonnement. Le sur mesure se justifie quand la boutique doit s'adapter à votre organisation.",
    },
    faq: [
      {
        question: "Combien coûte une boutique en ligne sur mesure ?",
        reponse:
          "Je travaille uniquement au devis, gratuit et envoyé sous 24h après un premier échange. Le prix dépend du catalogue, des modes de livraison et de paiement, et de ce que l'administration doit gérer.",
      },
      {
        question: "Puis-je gérer la boutique seul, sans connaissances techniques ?",
        reponse:
          "Oui. L'administration est conçue pour vous, avec vos mots, et je vous forme à son utilisation. Celle de Lune-Soleil s'utilise depuis un téléphone.",
      },
      {
        question: "Le paiement en ligne est-il sécurisé ?",
        reponse:
          "Le paiement par carte passe par Stripe, un prestataire spécialisé dans le paiement en ligne. C'est celui de la boutique Lune-Soleil.",
      },
      {
        question: "Combien de temps faut-il pour ouvrir une boutique ?",
        reponse:
          "Une boutique demande plusieurs semaines, selon le catalogue et les fonctions prévues. Le planning figure dans le devis.",
      },
    ],
    liens: [
      { to: "/blog/combien-coute-site-internet-2026", label: "Ce qui fait varier le devis d'un site internet" },
      { to: "/blog/automatiser-taches-repetitives-petite-entreprise", label: "Automatiser les tâches répétitives d'une petite entreprise" },
      { to: "/creation-site-internet-orthez-bearn", label: "Votre site internet à Orthez et dans le Béarn" },
    ],
  },
  {
    slug: "refonte-site-internet",
    nomCourt: "Refonte de site",
    resume: "Refaire un site daté en gardant ce qui marche déjà.",
    metaTitle: "Refonte de site internet à Pau pour entreprises",
    metaDescription:
      "Site daté, lent ou illisible sur téléphone ? Je le refais en préservant vos contenus utiles et vos adresses connues de Google. Freelance à Pau, devis sous 24h.",
    h1: "Refonte de site internet : repartir de ce qui marche.",
    intro:
      "Votre site existe déjà : il a des pages que Google connaît, des contenus qui servent, des habitudes. Je commence par la liste de ce qu'il faut garder, puis nous parlons du nouveau design.",
    scene: "refonte",
    serviceType: "Refonte de site internet",
    pourQui: {
      titre: "Une refonte se justifie si",
      items: [
        "Le site s'affiche mal sur téléphone ou met plusieurs secondes à charger.",
        "Vous ne pouvez plus le modifier : prestataire injoignable, outil abandonné, accès perdus.",
        "Votre activité a changé et le site décrit encore l'ancienne.",
      ],
    },
    comprend: {
      titre: "Ce que contient la prestation",
      items: [
        {
          titre: "Un état des lieux",
          texte:
            "Je relève ce que le site contient, ce qui est encore juste, les pages que Google affiche et les accès dont vous disposez (nom de domaine, hébergement).",
        },
        {
          titre: "Un nouveau site",
          texte:
            "Structure, textes et design sont repris pour le téléphone et pour vos clients d'aujourd'hui. Selon l'état de l'existant, je le reprends ou je repars d'une base neuve.",
        },
        {
          titre: "Les anciennes adresses redirigées",
          texte:
            "Chaque ancienne page utile pointe vers sa nouvelle version : les liens et les résultats Google existants n'aboutissent pas à une page d'erreur.",
        },
        {
          titre: "Le référencement remis à niveau",
          texte:
            "Titres, vitesse, données lues par Google et lisibilité par les assistants IA sont revus page par page.",
        },
        {
          titre: "Une bascule sans coupure",
          texte:
            "L'ancien site reste en ligne jusqu'à la mise en ligne du nouveau, puis je contrôle les redirections.",
        },
      ],
    },
    propre: {
      surtitre: "Avant de toucher au design",
      titre: "Ce qu'une refonte doit préserver.",
      intro:
        "Refaire un site en repartant de zéro efface parfois ce qui fonctionnait. Je vérifie quatre points avant de proposer un plan.",
      items: [
        {
          titre: "Les adresses de vos pages",
          texte:
            "Celles que Google affiche et celles que d'autres sites citent sont conservées ou redirigées une à une.",
        },
        {
          titre: "Les contenus qui servent",
          texte:
            "Textes, photos, avis, documents : on trie ensemble ce qui reste, ce qui se réécrit, ce qui part.",
        },
        {
          titre: "Les demandes que vous recevez",
          texte:
            "Formulaire, téléphone, prise de rendez-vous : ce qui vous apporte des contacts continue de fonctionner pendant et après.",
        },
        {
          titre: "Vos accès",
          texte:
            "Nom de domaine, hébergement, messagerie : on vérifie que vous en avez la main avant de commencer.",
        },
      ],
    },
    etapes: [
      {
        titre: "État des lieux, gratuit",
        texte:
          "Je regarde votre site actuel avec vous et je vous dis s'il faut le refaire ou si une réparation suffit.",
      },
      {
        titre: "Devis sous 24h",
        texte:
          "Le devis précise ce qui est repris, ce qui est refait, le planning et le prix. Le paiement en trois fois sans frais est possible.",
      },
      {
        titre: "Reconstruction à part",
        texte: "Le nouveau site est construit sans toucher à l'ancien. Vous le validez avant qu'il le remplace.",
      },
      {
        titre: "Bascule et vérifications",
        texte:
          "Mise en ligne, redirection des anciennes adresses, puis contrôle des pages une à une.",
      },
    ],
    preuve: {
      projet: "methodea.fr",
      titre: "Un exemple en ligne : la refonte de Methodea",
      texte:
        "Refonte complète d'un site vitrine : design repris, affichage adapté au téléphone et formulaire de contact connecté. Le site est en ligne, vous pouvez le parcourir.",
      lien: { href: "https://methodea.netlify.app/", label: "Visiter le site Methodea" },
    },
    limites: {
      titre: "Quand une réparation suffit",
      texte:
        "Un site récent, que vous pouvez encore modifier et qui s'affiche correctement sur téléphone, n'a pas besoin d'être refait. Corriger sa vitesse, ses textes ou son formulaire demande moins de travail qu'une refonte. Je vous le dis au premier échange.",
    },
    faq: [
      {
        question: "Vais-je perdre mon référencement Google en refaisant mon site ?",
        reponse:
          "C'est le principal risque d'une refonte, et il se prépare. Les positions dépendent de Google ; mon engagement porte sur la méthode : chaque page utile est conservée ou redirigée, et les contenus qui fonctionnent sont repris.",
      },
      {
        question: "Mon site a été fait par un autre prestataire, pouvez-vous le reprendre ?",
        reponse:
          "Oui. Selon son état, je reprends l'existant ou je repars d'une base neuve en récupérant les contenus. Il me faut les accès au nom de domaine et à l'hébergement ; s'ils sont perdus, on commence par les retrouver.",
      },
      {
        question: "Le site sera-t-il coupé pendant la refonte ?",
        reponse:
          "Non. Le nouveau site est construit à part et l'ancien reste en ligne jusqu'à la bascule.",
      },
      {
        question: "Combien coûte une refonte ?",
        reponse:
          "Je travaille uniquement au devis, gratuit et envoyé sous 24h après un premier échange. Le prix dépend de la quantité de contenu à reprendre et de ce que le nouveau site doit faire.",
      },
    ],
    liens: [
      { to: "/blog/refonte-ou-reparation-site-internet", label: "Refaire son site ou le réparer : comment choisir" },
      { to: "/blog/site-accessible-petite-entreprise", label: "Ce qu'un site accessible change pour une petite structure" },
      { to: "/creation-site-internet-bayonne", label: "Votre site internet à Bayonne" },
    ],
  },
  {
    slug: "referencement-local",
    nomCourt: "Référencement local",
    resume: "Être trouvé près de chez vous, sur Google et dans les IA.",
    metaTitle: "Référencement local à Pau : Google et IA pour les TPE",
    metaDescription:
      "Apparaître quand on cherche votre métier à Pau ou dans le Béarn, sur Google comme dans ChatGPT : ce que je vérifie et corrige sur votre site. Devis sous 24h.",
    h1: "Référencement local : être trouvé près de chez vous.",
    intro:
      "Quand quelqu'un tape votre métier suivi du nom de votre ville, ou pose la question à ChatGPT, votre entreprise doit pouvoir être citée. Je travaille ce que votre site dit aux moteurs, et je vous montre ce qui a été fait.",
    scene: "local",
    serviceType: "Référencement local",
    pourQui: {
      titre: "Ce travail vous concerne si",
      items: [
        "Votre site existe mais n'apparaît pas quand on cherche votre métier dans votre commune.",
        "Vos coordonnées ou vos horaires diffèrent entre votre site, votre fiche Google et les annuaires.",
        "Vous voulez savoir ce que les assistants IA disent de votre entreprise, et pourquoi.",
      ],
    },
    comprend: {
      titre: "Ce que je contrôle et corrige sur votre site",
      items: [
        {
          titre: "Les titres et descriptions de chaque page",
          texte:
            "C'est ce que Google affiche dans ses résultats : une page, un sujet, votre métier et votre secteur nommés clairement.",
        },
        {
          titre: "La structure et la vitesse",
          texte:
            "Un seul titre principal par page, des intertitres logiques, des images allégées, un affichage rapide sur téléphone.",
        },
        {
          titre: "Les données structurées",
          texte:
            "Un balisage invisible indique aux moteurs votre nom, votre adresse, vos horaires et vos services, à l'identique de ce qui est écrit à l'écran.",
        },
        {
          titre: "La lisibilité par les IA",
          texte:
            "Le texte est présent dans la page telle qu'un robot la reçoit, sans attendre l'exécution d'un programme, et il répond à des questions concrètes.",
        },
        {
          titre: "La cohérence avec votre fiche Google",
          texte:
            "Nom, adresse, téléphone et horaires du site correspondent à ceux de votre fiche d'établissement.",
        },
      ],
    },
    propre: {
      surtitre: "Des livrables",
      titre: "Ce que vous pouvez contrôler vous-même.",
      intro:
        "Le jour de la livraison, vous pouvez contrôler ces quatre points vous-même.",
      items: [
        {
          titre: "La liste des corrections",
          texte: "Page par page : ce qui a été changé, et pourquoi.",
        },
        {
          titre: "Des coordonnées identiques partout",
          texte: "Le site, son balisage et votre fiche Google affichent les mêmes informations.",
        },
        {
          titre: "Des pages lisibles par les robots",
          texte:
            "Le texte de vos pages est présent dans le code que reçoit un robot : cela se vérifie depuis un navigateur.",
        },
        {
          titre: "Un travail qui reste en place",
          texte:
            "Les corrections sont faites sur votre site : elles y restent si vous changez de prestataire.",
        },
      ],
    },
    etapes: [
      {
        titre: "Premier échange, gratuit",
        texte:
          "Vous me dites sur quelles recherches vous voulez apparaître. Je regarde votre site et votre fiche Google.",
      },
      {
        titre: "Devis sous 24h",
        texte:
          "La liste de ce qu'il y a à corriger, avec le planning et le prix. Le paiement en trois fois sans frais est possible.",
      },
      {
        titre: "Corrections",
        texte: "J'interviens sur votre site : titres, structure, vitesse, balisage.",
      },
      {
        titre: "Compte rendu",
        texte: "Je vous remets la liste de ce qui a été fait et je réponds à vos questions.",
      },
    ],
    preuve: {
      titre: "Un exemple vérifiable : ce site",
      texte:
        "Chaque page de christophe-dev-freelance.fr est lisible sans JavaScript, porte des données structurées conformes à ce qui est affiché, et le site publie un fichier llms.txt à destination des assistants IA. Le référencement fait partie de chaque site que je livre.",
      lien: { href: "/llms.txt", label: "Voir le fichier llms.txt de ce site" },
    },
    limites: {
      titre: "Ce que je ne promets pas",
      texte:
        "Je ne garantis aucune position : Google et les assistants IA décident seuls de ce qu'ils affichent. Les avis clients et l'ancienneté de votre fiche Google pèsent aussi, et ils ne dépendent pas du code. Mon travail porte sur ce que votre site maîtrise.",
    },
    faq: [
      {
        question: "En combien de temps voit-on un résultat ?",
        reponse:
          "Les corrections sont visibles sur le site dès leur mise en ligne. Leur prise en compte dépend du rythme de passage de Google, que je ne maîtrise pas : je ne vous annonce pas de délai.",
      },
      {
        question: "Faut-il refaire mon site pour être mieux référencé ?",
        reponse:
          "Pas forcément. Si le site est sain, des corrections suffisent. S'il est trop lent ou impossible à modifier, une refonte est plus efficace : je vous le dis après l'avoir examiné.",
      },
      {
        question: "Qu'est-ce que le référencement pour les IA (GEO) ?",
        reponse:
          "Une part des internautes pose sa question à ChatGPT, Claude ou Perplexity, qui répondent en citant une ou deux sources. Pour être cité, le contenu doit être lisible par leurs robots et répondre clairement à des questions précises.",
      },
      {
        question: "Combien coûte ce travail ?",
        reponse:
          "Je travaille uniquement au devis, gratuit et envoyé sous 24h après un premier échange. Le prix dépend du nombre de pages et de l'état du site.",
      },
    ],
    liens: [
      { to: "/blog/visibilite-locale-pau-bearn-cote-basque", label: "Être visible localement à Pau, Bayonne et dans le Béarn" },
      { to: "/blog/referencement-google-chatgpt-2026", label: "Être trouvé sur Google et sur ChatGPT" },
      { to: "/blog/questions-chatgpt-artisans-commerces-locaux", label: "Ce que les gens demandent à ChatGPT sur les commerces locaux" },
    ],
  },
  {
    slug: "application-web-sur-mesure",
    nomCourt: "Application sur mesure",
    resume: "Un outil construit sur votre façon de travailler.",
    metaTitle: "Application web sur mesure à Pau pour TPE et PME",
    metaDescription:
      "Outil métier, espace client, gestion de stock ou de commandes : une application web construite sur votre façon de travailler. Freelance à Pau, devis sous 24h.",
    h1: "Application web sur mesure pour TPE et PME.",
    intro:
      "Quand un tableur, un carnet et des messages ne suffisent plus à suivre votre activité, un outil construit pour vous peut en regrouper l'essentiel. Je le conçois à partir de votre façon de travailler, et vous l'utilisez au bureau comme sur votre téléphone.",
    scene: "application",
    serviceType: "Développement d'application web sur mesure",
    pourQui: {
      titre: "Une application sur mesure vous convient si",
      items: [
        "Vous suivez votre activité avec plusieurs outils qui ne se parlent pas : tableur, carnet, messages.",
        "Vos clients ou vos employés doivent se connecter pour suivre une commande, un dossier ou un rendez-vous.",
        "Les logiciels du marché vous font payer des fonctions dont vous ne vous servez pas, sans faire celle qu'il vous faut.",
      ],
    },
    comprend: {
      titre: "Ce que contient la prestation",
      items: [
        {
          titre: "Un outil calqué sur votre organisation",
          texte:
            "Je conçois les écrans à partir de vos tâches, avec vos mots et dans l'ordre où vous travaillez.",
        },
        {
          titre: "Un accès pour chacun",
          texte:
            "Gérant, employés, clients : chaque personne se connecte et voit ce qui la concerne.",
        },
        {
          titre: "Utilisable sur téléphone",
          texte:
            "L'application s'ouvre dans un navigateur, sans rien installer, sur ordinateur comme sur téléphone.",
        },
        {
          titre: "Paiement et factures, si vous en avez besoin",
          texte:
            "Le paiement par carte passe par Stripe, et les factures sont générées par l'application.",
        },
        {
          titre: "Un outil qui vous appartient",
          texte:
            "L'application est à vous. Après la livraison, les corrections de bugs sont prises en charge, et les nouvelles fonctions font l'objet d'un devis.",
        },
      ],
    },
    propre: {
      surtitre: "Avant d'écrire du code",
      titre: "Ce qu'on décide ensemble avant de construire.",
      intro:
        "Avant la première ligne de code, nous fixons quatre points : qui s'en sert, ce qui doit aller vite, ce qui existe déjà et ce qui attendra.",
      items: [
        {
          titre: "Qui s'en sert",
          texte: "Vous seul, votre équipe, vos clients : la liste des personnes fixe celle des écrans.",
        },
        {
          titre: "Ce qui se fait en un geste",
          texte:
            "La tâche que vous répétez le plus souvent doit demander le moins d'étapes possible, y compris sur téléphone.",
        },
        {
          titre: "Ce qui existe déjà",
          texte:
            "Vos logiciels actuels restent en place quand ils font bien leur travail. On regarde ce qui peut être relié à l'application.",
        },
        {
          titre: "Ce qu'on garde pour plus tard",
          texte:
            "La première version couvre l'essentiel. Le reste s'ajoute ensuite, sur devis, quand l'usage le demande.",
        },
      ],
    },
    etapes: [
      {
        titre: "Premier échange, gratuit",
        texte:
          "Vous me montrez comment vous travaillez aujourd'hui, avec vos vrais documents. Je vous dis si une application se justifie.",
      },
      {
        titre: "Devis sous 24h",
        texte:
          "Les écrans prévus, le planning et le prix. Le paiement en trois fois sans frais est possible.",
      },
      {
        titre: "Une première version à essayer",
        texte:
          "Je construis l'application, puis vous l'essayez sur vos cas réels avant sa mise en service.",
      },
      {
        titre: "Mise en service et formation",
        texte:
          "Je vous forme, ainsi que votre équipe, et je reste votre interlocuteur pour la suite.",
      },
    ],
    preuve: {
      projet: "Lune-Soleil",
      titre: "Un exemple en ligne : l'administration de Lune-Soleil",
      texte:
        "Derrière la boutique de cette créatrice de bijoux d'Artix, une administration sur mesure : stock partagé entre le site et les marchés, commandes, factures. Elle la gère depuis son téléphone, y compris sur un stand de marché. Je développe et j'exploite aussi seul SmartPlanning, un logiciel de gestion de plannings d'équipe.",
      lien: { href: "https://lune-soleil.fr/", label: "Visiter la boutique Lune-Soleil" },
    },
    limites: {
      titre: "Quand un logiciel du marché suffit",
      texte:
        "Si un logiciel existant couvre votre besoin sans vous contraindre, prenez-le : il sera en place plus vite. Le sur mesure se justifie quand aucun outil ne correspond à votre organisation, ou quand vous en empilez plusieurs pour faire un seul travail.",
    },
    faq: [
      {
        question: "Combien coûte une application sur mesure ?",
        reponse:
          "Je travaille uniquement au devis, gratuit et envoyé sous 24h après un premier échange. Le prix dépend du nombre d'écrans, des types d'utilisateurs et des liaisons avec vos outils.",
      },
      {
        question: "Combien de temps faut-il pour la développer ?",
        reponse:
          "Une application sur mesure demande plusieurs semaines, selon sa complexité. Le planning figure dans le devis.",
      },
      {
        question: "Que se passe-t-il si mes besoins changent ?",
        reponse:
          "Les corrections de bugs sont prises en charge après la livraison. Les nouvelles fonctions font l'objet d'un devis, et une maintenance continue est possible.",
      },
      {
        question: "Peut-on relier l'application à mes outils actuels ?",
        reponse:
          "Cela dépend de vos outils : on le regarde au premier échange. Pour les tâches répétitives (relances, rappels, rangement des demandes), une automatisation avec Make, Zapier ou n8n est parfois plus simple qu'un développement.",
      },
    ],
    liens: [
      { to: "/blog/smartplanning-saas-solo-ce-que-ca-change-pour-vous", label: "Un logiciel développé seul : ce que ça change pour vous" },
      { to: "/blog/automatiser-taches-repetitives-petite-entreprise", label: "Automatiser les tâches répétitives d'une petite entreprise" },
      { to: "/blog/ia-petite-entreprise-usages-concrets", label: "L'IA pour une petite entreprise : quatre usages concrets" },
    ],
  },
];

export const getServicePage = (pathname: string) =>
  servicePages.find((p) => `/${p.slug}` === pathname.replace(/\/$/, ""));
