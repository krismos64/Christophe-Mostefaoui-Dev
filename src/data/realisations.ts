// Les 11 réalisations : source unique pour la page /realisations et l'aperçu de la home.
// Ajouter un projet impose aussi les mises à jour listées dans CLAUDE.md (titre, chatbot, fichiers LLM).

export interface Project {
  numeral?: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  tags: string[];
  link: string;
  isFounder?: boolean;
}

export const founderProject: Project = {
  title: "SmartPlanning.fr",
  description:
    "Mon projet entrepreneurial : un SaaS de gestion des plannings d'équipe, conçu, développé et lancé seul en 2026 (modèle freemium). De l'architecture au déploiement en passant par le support utilisateurs, je maîtrise tout le cycle de vie d'un produit.",
  image: "/assets/images/logosp.png",
  alt: "SmartPlanning, SaaS de gestion des plannings fondé par Christophe Mostefaoui",
  tags: ["SaaS Freemium", "Solo founder", "2026"],
  link: "https://smartplanning.fr/",
  isFounder: true,
};

export const projects: Project[] = [
  {
    numeral: "I",
    title: "Lune-Soleil",
    description:
      "Boutique en ligne sur mesure pour une créatrice de bijoux faits main à Artix. Catalogue, paiement par carte, stock partagé entre le site et les marchés, factures, livraison Mondial Relay et un back-office utilisable depuis un smartphone, y compris sur un stand de marché.",
    image: "/assets/images/lune-soleil-mockup.jpg",
    alt: "Lune-Soleil, boutique en ligne de bijoux artisanaux faits main en Béarn",
    tags: ["E-commerce sur mesure", "Paiement en ligne", "Artisanat local"],
    link: "https://lune-soleil.fr/",
  },
  {
    numeral: "II",
    title: "LivresStaka.fr",
    description:
      "Plateforme complète pour accompagner les auteurs dans la correction et l'édition de leurs manuscrits. Espace client sécurisé, paiement en ligne et messagerie intégrée pour échanger facilement avec l'équipe éditoriale.",
    image: "/assets/images/livrestaka-mockup.jpg",
    alt: "LivresStaka, plateforme d'édition et correction de manuscrits",
    tags: ["Plateforme sur mesure", "Paiement en ligne", "Espace client"],
    link: "https://livrestaka.fr/",
  },
  {
    numeral: "III",
    title: "Cabinet Infirmier Graslin",
    description:
      "Site vitrine élégant pour un cabinet infirmier à Nantes. Présentation des services, prise de rendez-vous facilitée et informations pratiques pour les patients du quartier Graslin.",
    image: "/assets/images/graslin-mockup.jpg",
    alt: "Cabinet Infirmier Graslin Nantes, site vitrine professionnel",
    tags: ["Site vitrine", "Santé", "Référencement local"],
    link: "https://cabinet-infirmier-graslin.fr/",
  },
  {
    numeral: "IV",
    title: "methodea.fr",
    description:
      "Refonte complète d'un site vitrine pour une meilleure visibilité en ligne. Design moderne, responsive et formulaire de contact connecté pour ne manquer aucune opportunité commerciale.",
    image: "/assets/images/methodea-mockup.jpg",
    alt: "Methodea, refonte site vitrine professionnel",
    tags: ["Refonte", "Design moderne", "Formulaire contact"],
    link: "https://methodea.netlify.app/",
  },
  {
    numeral: "V",
    title: "coachtfe.fr",
    description:
      "Site professionnel pour une équipe de soignants et d'enseignants spécialisés en méthodologie de recherche infirmière. Présentation claire de l'accompagnement proposé aux étudiants pour leur Travail de Fin d'Études (TFE), avec parcours de contact dédié.",
    image: "/assets/images/coachtfe-mockup.jpg",
    alt: "CoachTFE, accompagnement méthodologie de recherche infirmière (TFE)",
    tags: ["Site vitrine", "Santé & Éducation", "Méthodologie TFE"],
    link: "https://coachtfe.fr/",
  },
  {
    numeral: "VI",
    title: "CoachDEC",
    description:
      "Site vitrine pour un service d'accompagnement méthodologique au mémoire du DEC (diplôme d'expertise comptable). Quiz d'orientation, présentation des formules, formulaire de contact protégé contre le spam et données structurées qui clarifient l'offre auprès de Google : le candidat rédige, l'équipe le guide.",
    image: "/assets/images/coachdec-mockup.jpg",
    alt: "CoachDEC, accompagnement méthodologique au mémoire d'expertise comptable",
    tags: ["Site vitrine", "Formation", "Formulaire sécurisé"],
    link: "https://coachdec.fr/",
  },
  {
    numeral: "VII",
    title: "Doctorat.me",
    description:
      "Landing page pour un service d'accompagnement doctoral assuré par des docteurs, toutes disciplines : méthodologie, relecture avec recommandations, aide au traitement des données (SPSS, Stata, R). Formulaire de rappel, contact WhatsApp, charte d'intégrité et contenus reformulés pour présenter clairement une démarche éthique : le doctorant reste l'auteur de sa thèse.",
    image: "/assets/images/doctorat-mockup.jpg",
    alt: "Doctorat.me, accompagnement doctoral éthique par des docteurs",
    tags: ["Landing page", "Enseignement supérieur", "Données structurées"],
    link: "https://doctorat.me/",
  },
  {
    numeral: "VIII",
    title: "MasterMentor",
    description:
      "Site vitrine pour un service d'accompagnement méthodologique au mémoire de Master 2, assuré par des enseignants-chercheurs. Présentation des disciplines et de l'équipe, quiz, page tarifs, formulaire de diagnostic gratuit sécurisé, charte d'intégrité académique et adresses lisibles sans extension pour le référencement.",
    image: "/assets/images/mastermentor-mockup.jpg",
    alt: "MasterMentor, accompagnement méthodologique au mémoire de Master 2",
    tags: ["Site vitrine", "Enseignement supérieur", "Formulaire sécurisé"],
    link: "https://mastermentor.fr/",
  },
  {
    numeral: "IX",
    title: "Garage Parrot",
    description:
      "Site complet pour un garage automobile avec système de rendez-vous en ligne et catalogue de véhicules d'occasion. Gestion simplifiée pour le gérant et ses employés via un espace administration dédié.",
    image: "/assets/images/garage-mockup.jpg",
    alt: "Garage Parrot, site de gestion garage automobile",
    tags: ["Site complet", "Réservation en ligne", "Espace admin"],
    link: "https://garage-parrot.online/",
  },
  {
    numeral: "X",
    title: "Poulp Fiction",
    description:
      "Site web dynamique et immersif pour un centre de plongée à Saint-Cyprien. Animations fluides, présentation des formations et réservation simplifiée pour attirer de nouveaux plongeurs.",
    image: "/assets/images/poulpfiction-mockup.jpg",
    alt: "Poulp Fiction, site web centre de plongée Saint-Cyprien",
    tags: ["Site vitrine", "Animations", "Tourisme"],
    link: "https://poulpfiction.netlify.app/",
  },
];

export const allProjects: Project[] = [founderProject, ...projects];
