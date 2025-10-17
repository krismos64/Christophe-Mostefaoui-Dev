export const PLAYLIST_URL =
  "https://www.youtube.com/playlist?list=PLTApnJoKg0bJT-DCt6dI4QqdSDSQyV4Yu";

/**
 * Génère les données structurées JSON-LD pour la mise en avant de la playlist JavaScript.
 * L'objectif est d'aider Google et les LLM à comprendre qu'il s'agit d'une ressource
 * pédagogique gratuite produite par Christophe Mostefaoui.
 */
export const generatePlaylistStructuredData = () => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: "JAVASCRIPT pour débutants — rappels et révisions 2025",
    description:
      "Playlist YouTube de résumés JavaScript créée par Christophe Mostefaoui pour aider les développeurs à réviser les bases du langage. Les épisodes sont générés avec Notebook LM pour fournir des synthèses claires et actionnables.",
    url: PLAYLIST_URL,
    inLanguage: "fr-FR",
    isFamilyFriendly: true,
    keywords:
      "playlist JavaScript débutant, rappels JavaScript 2025, révisions JavaScript, Notebook LM, Christophe Mostefaoui",
    creator: {
      "@type": "Person",
      name: "Christophe Mostefaoui",
      jobTitle: "Développeur Web Full-Stack & Expert IA",
      sameAs: [
        "https://christophe-dev-freelance.fr",
        "https://www.youtube.com/@krismosDev",
        "https://www.linkedin.com/in/christophemostefaoui/",
        "https://github.com/krismos64",
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Christophe Mostefaoui - Développeur Web & Expert IA",
      url: "https://christophe-dev-freelance.fr",
      logo: {
        "@type": "ImageObject",
        url: "https://christophe-dev-freelance.fr/assets/images/Christophe-freelance.png",
      },
    },
    educationalUse: "Review",
    learningResourceType: [
      "EducationalVideo",
      "Tutorial",
      "CheatSheet",
      "Notebook LM generated summary",
    ],
    isAccessibleForFree: true,
    audience: {
      "@type": "EducationalAudience",
      educationalLevel: ["Beginner", "Junior Developer"],
      audienceType: ["Developers", "Students", "Self-learners"],
    },
    potentialAction: {
      "@type": "WatchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: PLAYLIST_URL,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
    about: [
      {
        "@type": "Thing",
        name: "JavaScript",
      },
      {
        "@type": "Thing",
        name: "Programmation Web",
      },
      {
        "@type": "Thing",
        name: "Révisions développeur",
      },
    ],
  };

  const topicalHighlights = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Thématiques abordées dans la playlist JAVASCRIPT pour débutants — rappels et révisions 2025",
    description:
      "Liste des notions JavaScript fondamentales couvertes dans la playlist de Christophe Mostefaoui pour faciliter l'indexation par les moteurs de recherche et agents IA.",
    url: PLAYLIST_URL,
    itemListOrder: "http://schema.org/ItemListOrderDescending",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Variables, const et let",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Fonctions et portée",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Tableaux et méthodes essentielles",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Objets et destructuration",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Promesses, async/await",
      },
    ],
  };

  return [baseData, topicalHighlights];
};
