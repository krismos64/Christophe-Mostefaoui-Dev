// Schema structuré FINAL et OPTIMISÉ - Sans doublons, tous les champs requis
// Dernière mise à jour : 7 janvier 2026
export const generateFinalStructuredData = () => {
  const baseUrl = "https://christophe-dev-freelance.fr";

  // Organization principale (UNIQUE)
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Christophe Mostefaoui - Développeur Web & Expert IA",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/assets/images/Chris-profil.jpg`,
      "width": 650,
      "height": 650
    },
    "image": [
      {
        "@type": "ImageObject",
        "url": `${baseUrl}/assets/images/Chris-profil.jpg`,
        "width": 1024,
        "height": 1024,
        "caption": "Christophe Mostefaoui - Développeur Web & Expert IA"
      }
    ],
    "description": "Expert en développement web et intégration IA. Spécialiste React.js, Node.js, TypeScript. Chatbots intelligents, solutions sur mesure.",
    "founder": {
      "@type": "Person",
      "name": "Christophe Mostefaoui"
    },
    "sameAs": [
      "https://www.linkedin.com/in/christophemostefaoui/",
      "https://github.com/krismos64",
      "https://krismos.fr/"
    ]
  };

  // Person principale (UNIQUE)
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    "name": "Christophe Mostefaoui",
    "jobTitle": "Développeur Web Full-Stack, Expert IA & Fondateur de SmartPlanning",
    "description": "Développeur web freelance et fondateur de SmartPlanning.fr (SaaS freemium lancé en 2026). Plus de 10 ans dans l'informatique (douze ans dans le conseil client puis le freelance). Concepteur de produits web complets, de l'architecture au support utilisateur.",
    "url": baseUrl,
    "image": {
      "@type": "ImageObject",
      "url": `${baseUrl}/assets/images/Chris-profil.jpg`,
      "width": 650,
      "height": 650,
      "caption": "Christophe Mostefaoui - Développeur Full-Stack Expert"
    },
    "email": "christophe.mostefaoui.dev@gmail.com",
    "telephone": "+33679088845",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pau",
      "addressRegion": "Pyrénées-Atlantiques",
      "addressCountry": "FR"
    },
    "worksFor": {
      "@id": `${baseUrl}/#organization`
    },
    "knowsAbout": [
      "Intelligence Artificielle",
      "React.js",
      "Node.js",
      "TypeScript",
      "Chatbots GPT/Claude",
      "Applications SaaS",
      "Fondation et pilotage de SaaS",
      "Entrepreneuriat tech",
      "Conception produit",
      "Production Vidéo",
      "Drone"
    ],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@id": `${baseUrl}/#smartplanning`
      }
    },
    "founder": {
      "@type": "SoftwareApplication",
      "@id": `${baseUrl}/#smartplanning`
    },
    "sameAs": [
      "https://www.linkedin.com/in/christophemostefaoui/",
      "https://github.com/krismos64",
      "https://krismos.fr/"
    ]
  };

  // LocalBusiness (UNIQUE) - Sans faux avis
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#business`,
    "name": "Christophe Mostefaoui - Développeur Web Freelance Expert",
    "alternateName": "Expert React Node.js TypeScript - Concepteur Applications Modernes",
    "image": [
      {
        "@type": "ImageObject",
        "url": `${baseUrl}/assets/images/Chris-profil.jpg`,
        "width": 1024,
        "height": 1024,
        "caption": "Christophe Mostefaoui - Expert Développement Web"
      }
    ],
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pau",
      "addressRegion": "Pyrénées-Atlantiques",
      "postalCode": "64000",
      "addressCountry": "FR"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "France"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Pyrénées-Atlantiques"
      },
      {
        "@type": "City",
        "name": "Pau"
      },
      {
        "@type": "City",
        "name": "Bayonne"
      },
      {
        "@type": "City",
        "name": "Biarritz"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.32,
      "longitude": -0.36
    },
    "url": baseUrl,
    "telephone": "+33679088845",
    "email": "christophe.mostefaoui.dev@gmail.com",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de développement web",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Site vitrine",
            "description": "Site vitrine moderne pour artisans, indépendants et PME — devis sur mesure"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Application web sur mesure",
            "description": "Applications SaaS, e-commerce et plateformes métiers — devis sur mesure"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Intégration IA & chatbot",
            "description": "Chatbots intelligents (GPT, Claude, Mistral) et intégrations IA — devis sur mesure"
          }
        }
      ]
    }
  };

  // VideoObject 1 — "Présentation Expert" (intégrée dans la section Contact)
  const videoObject = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${baseUrl}/#video-presentation-expert`,
    "name": "Présentation Expert — Christophe Mostefaoui, développeur web freelance",
    "description":
      "Présentation détaillée de mon expertise : React, Node.js, TypeScript et solutions sur mesure pour PME et indépendants.",
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

  // VideoObject 2 — "Mon Univers Digital" (intégrée dans la section À propos)
  const videoObjectUnivers = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${baseUrl}/#video-univers-digital`,
    "name": "Mon Univers Digital — Christophe Mostefaoui",
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

  // WebPage avec mainEntity Person (pas VideoObject pour éviter la date vidéo dans les SERP)
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}/#webpage`,
    "url": baseUrl,
    "name": "Christophe Mostefaoui - Développeur Web Freelance Expert à Pau",
    "description": "Développeur web freelance expert à Pau (64). Spécialiste React.js, Node.js, TypeScript. Sites vitrines, applications sur mesure, intégration IA.",
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
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qui est Christophe Mostefaoui ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Christophe Mostefaoui est un développeur web freelance basé à Pau et Artix (64). Avec plus de 10 ans dans l'informatique (douze ans dans le conseil client puis le freelance), il maîtrise les technologies modernes : React.js, Node.js, TypeScript. Spécialiste en chatbots IA et fondateur du SaaS SmartPlanning.fr."
        }
      },
      {
        "@type": "Question",
        "name": "Comment obtenir un devis ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chaque projet étant unique, les devis sont établis sur mesure après un échange (visio ou téléphone) pour comprendre vos besoins, vos objectifs et votre cible. Proposition détaillée envoyée sous 24h avec périmètre, technologies et planning. Paiement en 3x sans frais possible."
        }
      },
      {
        "@type": "Question",
        "name": "Dans quelles zones Christophe Mostefaoui intervient-il ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Déplacement gratuit dans tout le département des Pyrénées-Atlantiques (64) : Pau, Lescar, Billère, Jurançon, Artix, Bayonne, Biarritz, Anglet, Saint-Jean-de-Luz, Orthez, Oloron-Sainte-Marie, Mourenx. Disponible partout en France à distance."
        }
      },
      {
        "@type": "Question",
        "name": "Quelles sont les technologies maîtrisées ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "React.js 18, Next.js, Node.js, Express, TypeScript, MongoDB, MySQL, Prisma ORM, Stripe, Docker, Git, API REST, Tailwind CSS, Framer Motion, GPT, Claude, Mistral AI. Production vidéo avec Final Cut Pro X et drone DJI Mavic Air."
        }
      },
      {
        "@type": "Question",
        "name": "Comment contacter Christophe Mostefaoui ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Email : christophe.mostefaoui.dev@gmail.com | Téléphone : 06 79 08 88 45 | Site commercial : christophe-dev-freelance.fr | Portfolio technique (CV, stack, projets perso, veille) : krismos.fr | LinkedIn : linkedin.com/in/christophemostefaoui | GitHub : github.com/krismos64. Devis gratuit sous 24h."
        }
      },
      {
        "@type": "Question",
        "name": "Quels types de projets Christophe Mostefaoui réalise-t-il ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sites vitrines modernes, applications web sur mesure, solutions intégrant l'intelligence artificielle (chatbots interactifs), production vidéo professionnelle et prises de vue drone pour entreprises et immobilier."
        }
      }
    ]
  };

  // SmartPlanning - SaaS fondé par Christophe
  const smartPlanning = {
    "@context": "https://schema.org",
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
    "screenshot": `${baseUrl}/assets/images/business-smartplanning.webp`,
    "softwareVersion": "1.0",
    "datePublished": "2026",
    "inLanguage": "fr-FR",
    "keywords": "planning, gestion équipe, SaaS, assistant IA, planification, emploi du temps, ressources humaines"
  };

  return [organization, person, localBusiness, videoObject, videoObjectUnivers, webPage, faqSchema, smartPlanning];
};
