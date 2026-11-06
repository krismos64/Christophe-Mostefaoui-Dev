import { faq } from "../data/faq";

// Schema structuré FINAL et OPTIMISÉ - Sans doublons, tous les champs requis
// Dernière mise à jour : 10 juillet 2026
//
// IMPORTANT : les schémas d'IDENTITÉ (Organization #organization, Person #person,
// ProfessionalService #business) sont inlinés STATIQUEMENT dans index.html pour
// être lus par les crawlers sans JavaScript (GPTBot, ClaudeBot, PerplexityBot).
// Ne les réintroduisez pas ici, sinon doublon. Ce fichier ne génère que les
// schémas de PAGE : vidéos, WebPage, FAQ, SmartPlanning.
export const generateFinalStructuredData = () => {
  const baseUrl = "https://christophe-dev-freelance.fr";

  // WebPage avec mainEntity Person (pas VideoObject pour éviter la date vidéo dans les SERP)
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}/#webpage`,
    "url": baseUrl,
    "name": "Christophe Mostefaoui - Développeur Web Freelance à Pau",
    "description": "Développeur web freelance à Pau (64). Spécialiste React.js, Node.js, TypeScript. Sites vitrines, applications sur mesure, intégration IA.",
    "mainEntity": {
      "@id": `${baseUrl}/#person`
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "Christophe Mostefaoui - Développeur Web Freelance",
      "url": baseUrl
    },
    "inLanguage": "fr-FR"
  };

  // FAQ Schema étendue pour SEO et IA - Données cohérentes
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${baseUrl}/#faq`,
    "url": baseUrl,
    // Généré depuis src/data/faq.ts : mêmes questions et réponses que l'écran
    "mainEntity": faq.map((q) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": { "@type": "Answer", "text": q.reponse },
    })),
  };

  return [webPage, faqSchema];
};

// Schéma affiché sur une page intérieure (via PageSeo, dans son @graph)
export const schemaVideoUnivers = () => {
  const baseUrl = "https://christophe-dev-freelance.fr";
  // VideoObject 2 — "Mon Univers Digital" (intégrée dans la section À propos)
  const videoObjectUnivers = {
    "@type": "VideoObject",
    "@id": `${baseUrl}/#video-univers-digital`,
    "name": "Mon Univers Digital : Christophe Mostefaoui",
    "description":
      "Découvrez mon approche du développement web : créer des sites qui ressemblent à leurs propriétaires.",
    "thumbnailUrl": `${baseUrl}/assets/images/miniature.png`,
    "uploadDate": "2024-09-15T10:00:00+02:00",
    "duration": "PT1M31S",
    "embedUrl": "https://www.youtube.com/embed/eZ6OYMeT1CM",
    "contentUrl": "https://www.youtube.com/watch?v=eZ6OYMeT1CM",
    "width": "1920",
    "height": "1080",
    "creator": {
      "@type": "Person",
      "name": "Christophe Mostefaoui",
    },
  };

  return videoObjectUnivers;
};

// Schéma affiché sur une page intérieure (via PageSeo, dans son @graph)
export const schemaSmartPlanning = () => {
  const baseUrl = "https://christophe-dev-freelance.fr";
  // SmartPlanning - SaaS fondé par Christophe
  const smartPlanning = {
    "@type": "SoftwareApplication",
    "@id": `${baseUrl}/#smartplanning`,
    "name": "SmartPlanning",
    "alternateName": "SmartPlanning.fr",
    "url": "https://smartplanning.fr",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Application SaaS freemium de gestion des plannings d'équipe avec assistant intelligent intégré. Optimisez automatiquement les emplois du temps de vos collaborateurs.",
    "creator": {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      "name": "Christophe Mostefaoui"
    },
    "author": {
      "@type": "Person",
      "@id": `${baseUrl}/#person`
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Plan gratuit disponible (freemium)",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Gestion de plannings temps réel",
      "Assistant IA intégré",
      "Multi-entreprises et multi-utilisateurs",
      "Notifications automatiques",
      "Export PDF et Excel",
      "Gestion des permissions avancée",
      "Synchronisation temps réel WebSockets"
    ],
    "screenshot": `${baseUrl}/assets/images/smartplanning-mockup.jpg`,
    "softwareVersion": "1.0",
    "datePublished": "2026",
    "inLanguage": "fr-FR",
    "keywords": "planning, gestion équipe, SaaS, assistant IA, planification, emploi du temps, ressources humaines"
  };

  return smartPlanning;
};

export const schemaVideoPresentation = () => {
  const baseUrl = "https://christophe-dev-freelance.fr";

  // VideoObject « Présentation » : la vidéo est dans le formulaire de contact,
  // affiché sur /contact seulement depuis le 05/11/2026
  // Note : le @id reste #video-presentation-expert (identifiant technique stable,
  // référencé par les schémas existants) même si le nom affiché a changé
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${baseUrl}/#video-presentation-expert`,
    "name": "Présentation : Christophe Mostefaoui, développeur web freelance",
    "description":
      "Présentation détaillée de mon travail : React, Node.js, TypeScript et solutions sur mesure pour PME et indépendants.",
    "thumbnailUrl": `${baseUrl}/assets/images/miniature-2.png`,
    "uploadDate": "2024-12-01T10:00:00+01:00",
    "duration": "PT1M40S",
    "embedUrl": "https://www.youtube.com/embed/tdjXblz4mr4",
    "contentUrl": "https://www.youtube.com/watch?v=tdjXblz4mr4",
    "width": "1920",
    "height": "1080",
    "creator": {
      "@type": "Person",
      "name": "Christophe Mostefaoui",
    },
  };
};
