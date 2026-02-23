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
      "https://github.com/krismos64"
    ]
  };

  // Person principale (UNIQUE)
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    "name": "Christophe Mostefaoui",
    "jobTitle": "Développeur Web Full-Stack & Expert Intelligence Artificielle",
    "description": "Expert en intégration IA et développement full-stack. 3 ans d'expérience intensive en technologies modernes.",
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
    }
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
            "name": "Site One-Page",
            "description": "Site vitrine moderne pour artisans et indépendants"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "800",
            "priceCurrency": "EUR",
            "minPrice": "800",
            "maxPrice": "1500"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Site Multi-pages",
            "description": "Site web complet pour commerces et PME"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "1500",
            "priceCurrency": "EUR",
            "minPrice": "1500",
            "maxPrice": "3000"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Site Sur-mesure",
            "description": "Projets complexes avec intégration IA"
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "3000",
            "priceCurrency": "EUR",
            "minPrice": "3000"
          }
        }
      ]
    }
  };

  // VideoObject pour l'indexation vidéo
  const videoObject = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${baseUrl}/#main-video`,
    "name": "Présentation Christophe Mostefaoui - Expert IA & Développement",
    "description": "Découvrez mon expertise en intégration IA, chatbots intelligents et développement web moderne",
    "thumbnailUrl": `${baseUrl}/assets/images/Christophe-freelance.png`,
    "uploadDate": "2024-12-01T10:00:00+01:00",
    "duration": "PT2M30S",
    "contentUrl": `${baseUrl}/assets/videos/animation-chris-dev.mp4`,
    "embedUrl": "https://www.youtube.com/embed/tdjXblz4mr4",
    "width": "1920",
    "height": "1080",
    "creator": {
      "@type": "Person",
      "name": "Christophe Mostefaoui"
    }
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
          "text": "Christophe Mostefaoui est un développeur web freelance expert basé à Pau (64). Avec 3 ans d'expérience intensive, il maîtrise les technologies modernes : React.js, Node.js, TypeScript. Spécialiste en intégration IA et production vidéo/drone."
        }
      },
      {
        "@type": "Question",
        "name": "Quels sont les tarifs de Christophe Mostefaoui ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Site One-Page : 800€ – 1 500€ (artisans, indépendants). Site Multi-pages : 1 500€ – 3 000€ (commerces, PME). Site Sur-mesure : à partir de 3 000€ (projets complexes, IA). Vidéo & Drone : sur devis. Paiement en 3x sans frais possible."
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
          "text": "Email : christophe.mostefaoui.dev@gmail.com | Téléphone : 06 79 08 88 45 | Site : christophe-dev-freelance.fr | LinkedIn : linkedin.com/in/christophemostefaoui | GitHub : github.com/krismos64. Devis gratuit sous 24h."
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

  return [organization, person, localBusiness, videoObject, webPage, faqSchema, smartPlanning];
};
