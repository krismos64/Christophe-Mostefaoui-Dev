// Pages locales « création de site internet + zone » (phase 6.4)
// RÈGLES : contenus différenciés par bassin (pas de doorway pages),
// jamais de prix ni de stats inventées, jamais de témoignages clients.

export interface LocalPageFaq {
  question: string;
  reponse: string;
}

export interface LocalPageSection {
  titre: string;
  paragraphes: string[];
}

export interface LocalPage {
  slug: string;
  ville: string;
  labelFooter: string;
  metaTitle: string;
  metaDescription: string;
  accroche: string;
  h1: string;
  intro: string;
  sections: LocalPageSection[];
  communes: string[];
  faq: LocalPageFaq[];
}

export const localPages: LocalPage[] = [
  {
    slug: "creation-site-internet-pau",
    ville: "Pau",
    labelFooter: "Pau",
    metaTitle:
      "Création de site internet à Pau (64) — Développeur web freelance local",
    metaDescription:
      "Développeur web freelance à Pau : création de sites vitrines, refontes et applications sur mesure pour commerces, artisans et PME de l'agglomération paloise. Rencontre sur place, devis gratuit sous 24h.",
    accroche: "↳ votre développeur web à Pau",
    h1: "Création de site internet à Pau",
    intro:
      "Je suis Christophe, développeur web freelance installé entre Pau et Artix. Je conçois des sites vitrines, des refontes et des applications sur mesure pour les commerces, artisans, professions libérales et PME de l'agglomération paloise,avec une vraie rencontre autour d'un café plutôt qu'un ticket de support.",
    sections: [
      {
        titre: "Un site pensé pour votre clientèle paloise",
        paragraphes: [
          "Un institut à Trespoey, un cabinet près du Palais de Justice, une boutique rue Serviez ou un artisan à Lescar n'ont pas les mêmes clients ni les mêmes besoins. Je commence toujours par comprendre votre activité et la façon dont vos clients vous cherchent, avant d'écrire la moindre ligne de code.",
          "Votre site est ensuite construit sur mesure : rapide, adapté au mobile, visible sur Google, et désormais aussi dans les réponses des assistants IA (ChatGPT, Claude, Perplexity…), un canal que la plupart des sites palois ignorent encore.",
        ],
      },
      {
        titre: "Ce que je réalise pour les entreprises du Béarn",
        paragraphes: [
          "Sites vitrines pour présenter votre activité et capter des demandes de devis, sites multi-pages avec blog et gestion autonome du contenu, refontes de sites vieillissants, applications web et outils métiers sur mesure, chatbots d'accueil intelligents (comme celui de ce site), et production vidéo/drone certifiée pour mettre en valeur vos locaux.",
          "Je suis aussi le fondateur de SmartPlanning.fr, un logiciel de gestion de plannings que j'ai conçu et que j'exploite seul : vous travaillez avec quelqu'un qui sait mener un projet web de bout en bout, pas seulement « faire un site ».",
        ],
      },
      {
        titre: "La proximité, vraiment",
        paragraphes: [
          "Basé à quelques minutes de Pau, je me déplace gratuitement dans toute l'agglomération pour l'échange de cadrage : on définit ensemble vos objectifs, votre périmètre et votre planning, puis vous recevez un devis clair sous 24h. Pendant le projet, vous avez un interlocuteur unique, celui qui développe réellement votre site.",
        ],
      },
    ],
    communes: [
      "Pau",
      "Lescar",
      "Lons",
      "Billère",
      "Jurançon",
      "Idron",
      "Bizanos",
      "Gan",
    ],
    faq: [
      {
        question: "Intervenez-vous aussi à Lescar, Lons ou Billère ?",
        reponse:
          "Oui, je couvre toute l'agglomération paloise : Lescar, Lons, Billère, Jurançon, Idron, Bizanos, Gan… Le déplacement est gratuit dans tout le département des Pyrénées-Atlantiques.",
      },
      {
        question: "Combien coûte un site internet à Pau ?",
        reponse:
          "Chaque projet est différent : je ne travaille qu'au devis sur mesure, gratuit et envoyé sous 24h après un premier échange (sur place ou en visio). Le périmètre, les technologies et le planning sont posés noir sur blanc avant de démarrer, et le paiement en 3 fois sans frais est possible.",
      },
      {
        question: "Peut-on se rencontrer avant de commencer ?",
        reponse:
          "Bien sûr, c'est même ma façon de travailler : un premier rendez-vous gratuit et sans engagement, chez vous ou dans un café palois, pour comprendre votre métier avant de parler technique.",
      },
    ],
  },
  {
    slug: "creation-site-internet-bayonne",
    ville: "Bayonne",
    labelFooter: "Bayonne",
    metaTitle:
      "Création de site internet à Bayonne — Développeur web freelance (64)",
    metaDescription:
      "Création de sites internet à Bayonne et sur le BAB : sites vitrines, refontes et boutiques en ligne pour commerces, artisans et PME du Pays basque. Développeur freelance du 64, déplacement gratuit, devis sous 24h.",
    accroche: "↳ votre développeur web au Pays basque",
    h1: "Création de site internet à Bayonne",
    intro:
      "Développeur web freelance basé dans le Béarn voisin, j'accompagne les commerces, artisans et PME de Bayonne et de l'agglomération BAB dans la création ou la refonte de leur site internet. Le déplacement est gratuit dans tout le 64 : Bayonne n'est jamais qu'à une heure de route de mon bureau.",
    sections: [
      {
        titre:
          "Bayonne : un tissu commerçant qui mérite mieux que des modèles tout faits",
        paragraphes: [
          "Entre les commerces du Petit et du Grand Bayonne, les artisans des halles, les entreprises des zones d'Ametzondo ou de Saint-Étienne et les professions libérales du centre, la concurrence locale sur Google est réelle. Un site générique construit sur un modèle ne vous en sortira pas.",
          "Je conçois des sites sur mesure, écrits pour vos clients et structurés pour le référencement local : votre activité, votre quartier, vos spécialités, pas un texte interchangeable.",
        ],
      },
      {
        titre: "Du site vitrine à la vente en ligne",
        paragraphes: [
          "Site vitrine pour être trouvé et contacté, site multi-pages avec blog pour asseoir votre expertise, boutique en ligne pour vendre vos produits (j'ai notamment développé la plateforme e-commerce LivresStaka.fr avec paiement sécurisé Stripe), ou outil métier sur mesure : je construis ce qui sert réellement votre activité, et je vous forme à le faire vivre.",
          "Chaque site est rapide, adapté au mobile, et optimisé pour Google comme pour les assistants IA, les deux endroits où vos futurs clients vous cherchent.",
        ],
      },
      {
        titre: "Un seul interlocuteur, du cadrage à la mise en ligne",
        paragraphes: [
          "Premier échange gratuit (à Bayonne ou en visio), devis détaillé sous 24h, développement, mise en ligne, formation et suivi : vous travaillez du début à la fin avec la personne qui code votre site. Pas d'agence, pas d'intermédiaire, pas de sous-traitance.",
        ],
      },
    ],
    communes: [
      "Bayonne",
      "Anglet",
      "Boucau",
      "Mouguerre",
      "Saint-Pierre-d'Irube",
      "Ustaritz",
    ],
    faq: [
      {
        question: "Vous déplacez-vous vraiment jusqu'à Bayonne ?",
        reponse:
          "Oui : le déplacement est gratuit dans tout le département des Pyrénées-Atlantiques, côte basque comprise. Pour les points d'étape courts, la visioconférence permet d'avancer vite entre deux rendez-vous sur place.",
      },
      {
        question: "Travaillez-vous avec les commerces du centre-ville ?",
        reponse:
          "C'est le cœur de mon activité : commerces, artisans, restaurateurs et professions libérales. L'objectif est toujours concret, être trouvé sur Google et sur les assistants IA, donner confiance, et déclencher la visite ou la demande de devis.",
      },
      {
        question: "Mon site actuel est vieillissant, faut-il tout refaire ?",
        reponse:
          "Pas forcément. J'audite d'abord l'existant : parfois une refonte visuelle et technique suffit, parfois repartir d'une base saine est plus économique à long terme. Le devis compare clairement les options, sans engagement.",
      },
    ],
  },
  {
    slug: "creation-site-internet-biarritz",
    ville: "Biarritz",
    labelFooter: "Biarritz",
    metaTitle:
      "Création de site internet à Biarritz — Développeur web freelance (64)",
    metaDescription:
      "Sites internet haut de gamme à Biarritz : hôtellerie, restaurants, locations saisonnières, commerces et activités touristiques. Développeur web freelance du 64, vidéo et drone certifié DGAC, devis gratuit sous 24h.",
    accroche: "↳ votre développeur web sur la côte basque",
    h1: "Création de site internet à Biarritz",
    intro:
      "À Biarritz, votre site est souvent le premier contact d'un client qui ne vous verra jamais avant de réserver. Hôtels, restaurants, locations saisonnières, écoles de surf, commerces et thérapeutes : je crée des sites à la hauteur de votre image, et de celle de la ville.",
    sections: [
      {
        titre: "Une clientèle exigeante, locale et internationale",
        paragraphes: [
          "La clientèle biarrote réserve depuis Paris, Londres ou Madrid, sur mobile, et se décide en quelques secondes. Votre site doit être irréprochable : rapide, élégant, multilingue si besoin, et parfaitement visible sur Google comme dans les réponses des assistants IA qui recommandent désormais hôtels et restaurants.",
          "Je conçois chaque page comme une vitrine de votre établissement : vos photos, votre ambiance, vos points forts, pas un thème générique qu'on retrouve chez trois concurrents de la même rue.",
        ],
      },
      {
        titre: "Image, vidéo et prises de vue aériennes",
        paragraphes: [
          "Télépilote de drone certifié DGAC et monteur vidéo (Final Cut Pro), je peux compléter votre site par des vidéos professionnelles et des prises de vue aériennes de votre établissement, de la Grande Plage à la Côte des Basques. Un atout rare : le même prestataire réalise votre site et les images qui le font vivre.",
        ],
      },
      {
        titre: "Pensé pour durer, simple à faire vivre",
        paragraphes: [
          "Menus, horaires saisonniers, galeries, tarifs de chambres : je vous laisse la main sur ce qui change souvent, avec une formation incluse à la livraison. Et le site reste rapide et bien référencé, saison après saison. Premier échange gratuit sur place ou en visio, devis sous 24h.",
        ],
      },
    ],
    communes: [
      "Biarritz",
      "Anglet",
      "Bidart",
      "Guéthary",
      "Saint-Jean-de-Luz",
      "Hendaye",
    ],
    faq: [
      {
        question:
          "Faites-vous des sites pour hôtels et locations saisonnières ?",
        reponse:
          "Oui : sites d'établissements avec galeries, présentation des chambres ou logements, informations pratiques et liens de réservation. L'objectif est de donner envie et confiance avant même le premier contact, y compris auprès d'une clientèle internationale.",
      },
      {
        question: "Proposez-vous des vidéos ou des images par drone ?",
        reponse:
          "Oui, je suis télépilote certifié DGAC et j'assure la production vidéo (tournage, montage, export 4K). Site et images peuvent être pensés ensemble, ce qui garantit une cohérence visuelle totale.",
      },
      {
        question: "Un site multilingue est-il possible ?",
        reponse:
          "Tout à fait : français, anglais, espagnol… La structure multilingue est prévue dès la conception pour que chaque version soit correctement référencée, plutôt qu'ajoutée après coup.",
      },
    ],
  },
  {
    slug: "creation-site-internet-orthez-bearn",
    ville: "Orthez & Béarn intérieur",
    labelFooter: "Orthez & Béarn",
    metaTitle:
      "Création de site internet à Orthez, Mourenx, Oloron — Développeur web local (64)",
    metaDescription:
      "Développeur web freelance installé à Artix : création de sites internet pour artisans, commerces, industries et associations d'Orthez, Mourenx, Lacq, Monein et Oloron-Sainte-Marie. Le développeur d'à côté, devis gratuit sous 24h.",
    accroche: "↳ le développeur web d'à côté",
    h1: "Création de site internet à Orthez et dans le Béarn intérieur",
    intro:
      "J'habite et je travaille à Artix, au cœur du bassin de Lacq. Orthez, Mourenx, Monein, Oloron-Sainte-Marie : c'est mon territoire au quotidien, et les entreprises d'ici méritent les mêmes sites que celles des métropoles, sans passer par une agence bordelaise qui ne mettra jamais les pieds dans votre atelier.",
    sections: [
      {
        titre: "Artisans, industriels, commerçants : des besoins concrets",
        paragraphes: [
          "Un artisan de Mourenx veut des demandes de devis, un sous-traitant du bassin de Lacq veut rassurer ses donneurs d'ordres, un commerce d'Orthez veut qu'on le trouve avant le concurrent de la zone. Je construis des sites qui répondent à ces objectifs-là : clairs, rapides, trouvables sur Google, sans jargon ni superflu.",
          "Et parce que le premier contact se fait de plus en plus via ChatGPT ou les résultats enrichis de Google, vos informations sont structurées pour être comprises et citées par ces outils.",
        ],
      },
      {
        titre: "Le vrai local : je suis d'Artix",
        paragraphes: [
          "Pas un prestataire « qui couvre la région » depuis une grande ville : votre développeur habite ici. Rendez-vous chez vous, dans votre atelier ou votre boutique, souvent le jour même. Vous montrez votre métier, j'en fais un site qui vous ressemble, c'est ma spécialité, et c'est écrit sur ma page d'accueil.",
        ],
      },
      {
        titre: "De la petite vitrine à l'outil métier",
        paragraphes: [
          "Site vitrine d'artisan, site d'association, site multi-pages de PME, mais aussi outils métiers sur mesure : je suis le fondateur de SmartPlanning.fr, un logiciel de gestion de plannings d'équipe que j'ai conçu et que j'exploite seul. Si votre entreprise a un besoin qui dépasse le site classique, on peut le construire ensemble. Premier échange gratuit, devis sous 24h, paiement en 3 fois possible.",
        ],
      },
    ],
    communes: [
      "Orthez",
      "Artix",
      "Mourenx",
      "Lacq",
      "Monein",
      "Oloron-Sainte-Marie",
      "Mont",
      "Arthez-de-Béarn",
    ],
    faq: [
      {
        question: "Intervenez-vous à Mourenx, Lacq, Monein ou Oloron ?",
        reponse:
          "Oui, c'est mon secteur immédiat : j'habite à Artix. Orthez, Mourenx, Lacq, Monein, Oloron-Sainte-Marie et toutes les communes alentour, le déplacement est gratuit et souvent possible le jour même.",
      },
      {
        question:
          "Une petite entreprise a-t-elle vraiment besoin d'un site internet ?",
        reponse:
          "Si vos clients vous cherchent sur Google ou demandent conseil à un assistant IA, et c'est déjà le cas, mieux vaut que ce soit vous qu'ils trouvent. Un site vitrine simple, bien référencé localement, suffit souvent à faire la différence face à un concurrent invisible.",
      },
      {
        question: "Comment se passe un projet avec vous ?",
        reponse:
          "Un premier rendez-vous gratuit (chez vous ou en visio) pour comprendre votre activité, un devis clair sous 24h avec périmètre et planning, puis le développement avec des points réguliers. À la livraison : formation et accompagnement, vous n'êtes jamais seul face à votre site.",
      },
    ],
  },
];

export const getLocalPage = (pathname: string): LocalPage | undefined =>
  localPages.find((p) => `/${p.slug}` === pathname.replace(/\/$/, ""));
