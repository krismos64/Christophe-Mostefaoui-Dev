export const generateAdvancedStructuredData = () => {
  const baseUrl = "https://christophe-dev-freelance.fr";
  const profileImage = `${baseUrl}/assets/images/Chris-profil.jpg`;
  const brandLogo = profileImage;

  // Organisation complète avec tous les détails
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Christophe Mostefaoui - Développeur Web & Expert IA",
    "alternateName": ["Christophe Dev", "Chris Dev Freelance"],
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": brandLogo,
      "width": 1024,
      "height": 1024
    },
    "image": profileImage,
    "description": "Expert en développement web et intégration IA. Spécialiste React.js, Node.js, Python. Chatbots intelligents, machine learning, analyse prédictive.",
    "founder": {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      "name": "Christophe Mostefaoui"
    },
    "foundingDate": "2020",
    "slogan": "Transformez vos idées en succès digitaux avec l'IA",
    "knowsAbout": [
      "Intelligence Artificielle",
      "Machine Learning",
      "Chatbots GPT/Claude",
      "React.js",
      "Node.js",
      "TypeScript",
      "Python",
      "TensorFlow",
      "Scikit-learn",
      "API REST",
      "MongoDB",
      "MySQL"
    ],
    "sameAs": [
      "https://www.linkedin.com/in/christophemostefaoui/",
      "https://github.com/krismos64",
      "https://twitter.com/christophe_dev"
    ]
  };

  // Personne avec expertise complète
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    "name": "Christophe Mostefaoui",
    "givenName": "Christophe",
    "familyName": "Mostefaoui",
    "jobTitle": "Concepteur/Développeur d'applications web modernes & Expert IA",
    "description": "Expert en intégration IA et développement full-stack. 3 ans d'expérience intensive. Spécialiste React.js, Node.js, TypeScript.",
    "url": baseUrl,
    "image": profileImage,
    "email": "christophe.mostefaoui.dev@gmail.com",
    "telephone": "+33679088845",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pau",
      "addressRegion": "Pyrénées-Atlantiques",
      "postalCode": "64000",
      "addressCountry": "FR"
    },
    "worksFor": {
      "@id": `${baseUrl}/#organization`
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "La Fabrique Numérique Paloise",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pau",
        "addressRegion": "Pyrénées-Atlantiques",
        "addressCountry": "FR"
      }
    },
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Développeur Full-Stack",
        "occupationLocation": {
          "@type": "City",
          "name": "Pau"
        },
        "estimatedSalary": {
          "@type": "MonetaryAmount",
          "currency": "EUR",
          "value": {
            "@type": "QuantitativeValue",
            "value": 500,
            "unitText": "DAY"
          }
        },
        "experienceRequirements": "3 ans d'expérience intensive",
        "skills": "React.js, Node.js, TypeScript, Python, IA/ML"
      },
      {
        "@type": "Occupation",
        "name": "Expert en Intelligence Artificielle",
        "occupationLocation": {
          "@type": "City",
          "name": "Pau"
        }
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Titre Concepteur Développeur d'Applications (Bac+3/4)",
        "credentialCategory": "degree",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": "La Fabrique Numérique Paloise"
        }
      }
    ],
    "knowsAbout": [
      "Intelligence Artificielle",
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "Chatbots Development",
      "React.js",
      "Node.js",
      "TypeScript",
      "Python",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "OpenAI API",
      "Claude API",
      "Langchain",
      "Vector Databases",
      "RAG Systems"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Association des Développeurs Web de Nouvelle-Aquitaine"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/in/christophemostefaoui/",
      "https://github.com/krismos64"
    ]
  };

  // WebSite avec SearchAction
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "Christophe Mostefaoui - Portfolio & Services",
    "description": "Site professionnel de Christophe Mostefaoui, expert IA et développeur full-stack",
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "fr-FR"
  };

  // WebPage enrichie
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}/#webpage`,
    "url": baseUrl,
    "name": "Christophe, Concepteur/Développeur d'applications web modernes",
    "isPartOf": {
      "@id": `${baseUrl}/#website`
    },
    "about": {
      "@id": `${baseUrl}/#person`
    },
    "description": "Portfolio et services de Christophe Mostefaoui. Intégration IA, chatbots, machine learning, développement React.js et Node.js",
    "breadcrumb": {
      "@id": `${baseUrl}/#breadcrumb`
    },
    "inLanguage": "fr-FR",
    "potentialAction": [
      {
        "@type": "ReadAction",
        "target": [baseUrl]
      }
    ],
    "author": {
      "@id": `${baseUrl}/#person`
    }
  };

  // Services détaillés
  const services = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#services`,
    "serviceType": "Développement Web & Intégration IA",
    "provider": {
      "@id": `${baseUrl}/#organization`
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 43.32,
        "longitude": -0.36
      },
      "geoRadius": "200"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services Développement & IA",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Intégration Intelligence Artificielle",
            "description": "Chatbots GPT/Claude, analyse prédictive, vision par ordinateur, NLP",
            "image": `${baseUrl}/assets/images/ai-service.jpg`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Développement Applications SaaS",
            "description": "Applications cloud scalables avec React.js, Node.js, TypeScript"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Chatbots Conversationnels",
            "description": "Assistants virtuels intelligents avec GPT-4, Claude, intégration API"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Machine Learning Solutions",
            "description": "Modèles prédictifs, classification, recommandations personnalisées"
          }
        }
      ]
    },
    "audience": {
      "@type": "BusinessAudience",
      "name": "Entreprises et startups"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": baseUrl,
      "servicePhone": "+33679088845",
      "availableLanguage": ["fr", "en"]
    }
  };

  // Profil professionnel enrichi
  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#professional-service`,
    "name": "Christophe Mostefaoui - Services Développement & IA",
    "image": profileImage,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pau",
      "addressRegion": "Pyrénées-Atlantiques",
      "postalCode": "64000",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.32,
      "longitude": -0.36
    },
    "url": baseUrl,
    "telephone": "+33679088845",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "€€"
  };

  // FAQ Schema supprimé - maintenant géré dans structured-data-final.tsx pour éviter les doublons

  // Breadcrumb
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}/#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${baseUrl}/#services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Solutions IA",
        "item": `${baseUrl}/#ai-integration`
      }
    ]
  };

  // Combiner tous les schemas
  return [
    organization,
    person,
    website,
    webPage,
    services,
    professionalService,
    breadcrumb
  ];
};

// Meta tags optimisés pour LLM
export const generateLLMOptimizedMeta = () => {
  return {
    // Tags spécifiques pour l'indexation LLM
    "ai-content-type": "professional-portfolio",
    "ai-expertise": "AI-integration, machine-learning, chatbots, web-development",
    "ai-technologies": "React.js, Node.js, TypeScript, Python, TensorFlow, GPT, Claude",
    "ai-services": "Sites vitrines, Applications sur mesure, Chatbots GPT/Claude, Production vidéo, Drone DJI Mavic Air",
    "ai-location": "Pau, France, Pyrénées-Atlantiques, 64000",
    "ai-languages": "French, English",
    "ai-contact": "christophe.mostefaoui.dev@gmail.com",
    "ai-learning-resources":
      "AI tutorials, cheat sheets, developer resources",

    // Contexte enrichi pour LLM
    "llm-context":
      "Christophe Mostefaoui est un développeur web full-stack freelance basé à Pau (64) avec 3 ans d'expérience intensive. Expert React.js, Node.js, TypeScript. Services: sites vitrines (800-1500€), sites multi-pages (1500-3000€), sur-mesure avec IA (3000€+), vidéo/drone. Déplacement gratuit dans le 64, disponible partout en France à distance.",
    "llm-capabilities":
      "Sites vitrines modernes, applications web sur mesure, intégration IA (chatbots GPT/Claude/Mistral), production vidéo (Final Cut Pro X), prises de vue drone (DJI Mavic Air)",
    "llm-portfolio": "SmartPlanning.fr (SaaS freemium de plannings, fondé par Christophe), LivresStaka.fr (e-commerce de livres)",
    "llm-availability": "Disponible pour nouveaux projets. Devis gratuit sous 24h. Déplacement gratuit Pyrénées-Atlantiques (64), France entière à distance.",

    // Tags sémantiques
    "semantic-keywords":
      "intelligence artificielle, IA, machine learning, deep learning, chatbot GPT, Claude AI, développeur web, full-stack, React.js expert, Node.js, Python, Pau, freelance, SaaS, e-commerce",
    "semantic-entities": "Christophe Mostefaoui, Pau, Pyrénées-Atlantiques, France, OpenAI, Anthropic, React, Node, TypeScript, Python, TensorFlow",

    // Informations business
    "business-type": "B2B, B2C, Freelance",
    "business-sector": "Technology, AI, Web Development, Video Production",
    "business-size": "Freelancer, 1 person",
    "business-experience": "3 ans d'expérience intensive",
    "business-pricing": "Site One-Page 800-1500€, Site Multi-pages 1500-3000€, Sur-mesure à partir de 3000€"
  };
};
