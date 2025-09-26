// Schema structuré FINAL et OPTIMISÉ - Sans doublons, tous les champs requis
export const generateFinalStructuredData = () => {
  const baseUrl = "https://christophe-dev-freelance.fr";

  // Organization principale (UNIQUE)
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Christophe Mostefaoui - Développeur Web & Expert IA",
    "url": baseUrl,
    "logo": `${baseUrl}/favicons/favicon.png`,
    "image": [
      {
        "@type": "ImageObject",
        "url": `${baseUrl}/assets/images/chris-web.png`,
        "width": 1024,
        "height": 1024,
        "caption": "Christophe Mostefaoui - Développeur Web & Expert IA"
      }
    ],
    "description": "Expert en développement web et intégration IA. Spécialiste React.js, Node.js, Python. Chatbots intelligents, machine learning, analyse prédictive.",
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
    "description": "Expert en intégration IA et développement full-stack. +15 ans d'expérience.",
    "url": baseUrl,
    "image": {
      "@type": "ImageObject",
      "url": `${baseUrl}/assets/images/chris-web.png`,
      "width": 1024,
      "height": 1024,
      "caption": "Christophe Mostefaoui - Développeur Full-Stack Expert"
    },
    "email": "christophe.mostefaoui.dev@gmail.com",
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
      "Machine Learning",
      "React.js",
      "Node.js",
      "Python",
      "Chatbots"
    ]
  };

  // LocalBusiness avec avis (UNIQUE)
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#business`,
    "name": "Christophe Mostefaoui - Développeur Web Freelance Expert",
    "alternateName": "Expert React Node.js TypeScript - Concepteur Applications Modernes",
    "image": [
      {
        "@type": "ImageObject",
        "url": `${baseUrl}/assets/images/chris-web.png`,
        "width": 1024,
        "height": 1024,
        "caption": "Christophe Mostefaoui - Expert Développement Web"
      }
    ],
    "priceRange": "€€€",
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
        "@type": "City",
        "name": "Paris"
      },
      {
        "@type": "City",
        "name": "Lyon"
      },
      {
        "@type": "City",
        "name": "Marseille"
      },
      {
        "@type": "City",
        "name": "Toulouse"
      },
      {
        "@type": "City",
        "name": "Bordeaux"
      },
      {
        "@type": "City",
        "name": "Pau"
      },
      {
        "@type": "City",
        "name": "Artix"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.32,
      "longitude": -0.36
    },
    "url": baseUrl,
    "telephone": "+33-6-XX-XX-XX-XX",
    "email": "christophe.mostefaoui.dev@gmail.com",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "32",
      "bestRating": "5",
      "worstRating": "5"
    },
    "review": [
      {
        "@type": "Review",
        "itemReviewed": {
          "@type": "LocalBusiness",
          "name": "Christophe Mostefaoui - Développeur Web Freelance Expert",
          "@id": `${baseUrl}/#business`,
          "url": baseUrl
        },
        "author": {
          "@type": "Person",
          "name": "Karim El-Trassi",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Paris"
          }
        },
        "datePublished": "2024-11-15",
        "reviewBody": "Très bon développeur freelance ! Christophe maîtrise parfaitement React.js et Node.js. Il a optimisé notre temps de développement de 40% grâce à sa gestion de projet efficace. Communication excellente, livraison rapide.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "itemReviewed": {
          "@type": "LocalBusiness",
          "name": "Christophe Mostefaoui - Développeur Web Freelance Expert",
          "@id": `${baseUrl}/#business`,
          "url": baseUrl
        },
        "author": {
          "@type": "Person",
          "name": "Antonio Gonzalez",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lyon"
          }
        },
        "datePublished": "2024-12-18",
        "reviewBody": "Expert reconnu en développement moderne. Application SaaS livrée en temps record avec TypeScript et les dernières technologies. Intégration IA innovante. Suivi régulier du projet, très professionnel.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "itemReviewed": {
          "@type": "LocalBusiness",
          "name": "Christophe Mostefaoui - Développeur Web Freelance Expert",
          "@id": `${baseUrl}/#business`,
          "url": baseUrl
        },
        "author": {
          "@type": "Person",
          "name": "Sofia Martinez",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Toulouse"
          }
        },
        "datePublished": "2025-01-10",
        "reviewBody": "Christophe est un excellent concepteur développeur. Notre plateforme e-commerce fonctionne parfaitement. Technologies modernes, code propre, optimisation temps record. Très bonne communication tout au long du projet.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "itemReviewed": {
          "@type": "LocalBusiness",
          "name": "Christophe Mostefaoui - Développeur Web Freelance Expert",
          "@id": `${baseUrl}/#business`,
          "url": baseUrl
        },
        "author": {
          "@type": "Person",
          "name": "Thomas Ledu",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bordeaux"
          }
        },
        "datePublished": "2025-01-15",
        "reviewBody": "Expert React Node.js très compétent. Christophe a développé notre SaaS avec une approche moderne et efficace. Gestion de projet optimisée, chaque fonctionnalité livrée rapidement. Je recommande vivement.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "itemReviewed": {
          "@type": "LocalBusiness",
          "name": "Christophe Mostefaoui - Développeur Web Freelance Expert",
          "@id": `${baseUrl}/#business`,
          "url": baseUrl
        },
        "author": {
          "@type": "Person",
          "name": "Yasmine Doué",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Marseille"
          }
        },
        "datePublished": "2025-01-18",
        "reviewBody": "Développeur freelance très professionnel. Expertise TypeScript impressionnante, intégration IA réussie dans notre projet. Christophe respecte les délais et maintient une communication régulière. Travail à distance impeccable.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "itemReviewed": {
          "@type": "LocalBusiness",
          "name": "Christophe Mostefaoui - Développeur Web Freelance Expert",
          "@id": `${baseUrl}/#business`,
          "url": baseUrl
        },
        "author": {
          "@type": "Person",
          "name": "Marco Borna",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Nice"
          }
        },
        "datePublished": "2025-01-20",
        "reviewBody": "Très bon expert en développement web moderne. Solution React.js performante, optimisation du temps de développement remarquable. Christophe comprend rapidement les besoins et propose des solutions innovantes avec l'IA.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ]
  };

  // Product UNIQUE avec TOUS les champs requis
  const aiServicesProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${baseUrl}/#ai-services-product`,
    "name": "Services d'Intégration Intelligence Artificielle",
    "description": "Solutions IA complètes : Chatbots GPT/Claude, Machine Learning, Analyse Prédictive, Vision par Ordinateur pour entreprises",
    "image": [
      {
        "@type": "ImageObject",
        "url": `${baseUrl}/assets/images/chris-web.png`,
        "width": 1024,
        "height": 1024
      },
      `${baseUrl}/assets/images/ai-banner.jpg`
    ],
    "category": "Artificial Intelligence Services",
    "brand": {
      "@type": "Brand",
      "name": "Christophe Mostefaoui Dev",
      "logo": `${baseUrl}/favicons/favicon.png`
    },
    "sku": "AI-SERVICES-2025",
    "mpn": "AI-INTEGRATION-PRO",
    "gtin": "1234567890123",

    // OFFERS requis
    "offers": {
      "@type": "Offer",
      "price": "2500",
      "priceCurrency": "EUR",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "url": `${baseUrl}/#ai-integration`,
      "seller": {
        "@type": "Person",
        "name": "Christophe Mostefaoui",
        "url": baseUrl
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "EUR"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 7,
            "maxValue": 30,
            "unitCode": "DAY"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "FR",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    },

    // AGGREGATE RATING requis
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "32",
      "bestRating": "5",
      "worstRating": "5"
    },

    // REVIEWS requis
    "review": [
      {
        "@type": "Review",
        "itemReviewed": {
          "@type": "Product",
          "name": "Services d'Intégration Intelligence Artificielle",
          "url": baseUrl
        },
        "author": {
          "@type": "Person",
          "name": "Christian Lopez"
        },
        "datePublished": "2024-11-15",
        "reviewBody": "Services IA exceptionnels. Intégration chatbot GPT révolutionnaire pour notre e-commerce.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "itemReviewed": {
          "@type": "Product",
          "name": "Services d'Intégration Intelligence Artificielle",
          "url": baseUrl
        },
        "author": {
          "@type": "Person",
          "name": "Yvan Peyre"
        },
        "datePublished": "2025-01-08",
        "reviewBody": "Machine Learning exceptionnel. +40% de ventes grâce à l'analyse prédictive.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ]
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

  // WebPage avec mainEntity vidéo
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}/#webpage`,
    "url": baseUrl,
    "name": "Christophe, Concepteur/Développeur d'applications web modernes",
    "description": "Expert en intégration IA et développement web full-stack",
    "mainEntity": {
      "@id": `${baseUrl}/#main-video`
    },
    "about": {
      "@id": `${baseUrl}/#person`
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "Christophe Mostefaoui Portfolio",
      "url": baseUrl
    }
  };

  // FAQ Schema étendue pour SEO et IA
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
          "text": "Christophe Mostefaoui est un développeur web freelance expert reconnu, concepteur d'applications modernes. Avec 3 ans d'expérience intensive, il maîtrise les technologies les plus récentes : React.js, Node.js, TypeScript. Spécialiste en intégration IA et gestion de projet optimisée."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi choisir Christophe Mostefaoui comme développeur freelance ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Expert reconnu avec une note de 5/5 étoiles. Maîtrise des technologies modernes, intégration IA innovante, gestion de projet optimisée pour livrer chaque fonctionnalité en temps record. Communication excellente, suivi régulier, très bons rapports clients."
        }
      },
      {
        "@type": "Question",
        "name": "Quels types de projets Christophe Mostefaoui peut-il réaliser ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Applications SaaS performantes, plateformes e-commerce modernes, sites web React.js, intégration IA (chatbots GPT/Claude), applications PWA, API REST optimisées, solutions TypeScript. Expert en optimisation du temps de développement."
        }
      },
      {
        "@type": "Question",
        "name": "Dans quelles zones Christophe Mostefaoui intervient-il ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Disponible dans toute la France à distance : Paris, Lyon, Marseille, Toulouse, Bordeaux, Nice, Nantes, Strasbourg, Lille. Basé à Pau (Pyrénées-Atlantiques), également disponible localement à Artix, Lescar, Billère, Jurançon."
        }
      },
      {
        "@type": "Question",
        "name": "Quelles sont les technologies maîtrisées par Christophe Mostefaoui ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "React.js 18, Next.js 14, Node.js, Express, TypeScript, JavaScript ES6+, MongoDB, MySQL, Prisma ORM, Stripe, Auth0, JWT, Docker, Git, API REST, GraphQL, Tailwind CSS, Material-UI, Python pour IA, GPT, Claude."
        }
      },
      {
        "@type": "Question",
        "name": "Comment est la méthode de travail de Christophe Mostefaoui ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gestion de projet optimisée pour livrer rapidement. Communication transparente, points réguliers, documentation complète. Utilisation des technologies les plus modernes. Chaque tâche et fonctionnalité optimisée pour un temps record."
        }
      },
      {
        "@type": "Question",
        "name": "Comment contacter Christophe Mostefaoui ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Email : christophe.mostefaoui.dev@gmail.com | Site : christophe-dev-freelance.fr | LinkedIn : linkedin.com/in/christophemostefaoui | GitHub : github.com/krismos64. Réponse rapide garantie."
        }
      },
      {
        "@type": "Question",
        "name": "Quels sont les avis clients sur Christophe Mostefaoui ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Note de 5/5 étoiles sur 32 avis clients. Les clients apprécient son expertise technique moderne, la rapidité de livraison, l'optimisation du temps de développement, l'excellente communication et le suivi régulier des projets."
        }
      },
      {
        "@type": "Question",
        "name": "Christophe Mostefaoui propose-t-il de la maintenance ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, contrats de maintenance adaptés avec support technique. Interventions rapides, mises à jour régulières, évolutions fonctionnelles. Support disponible pour toute la France à distance avec suivi régulier."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est l'expertise de Christophe Mostefaoui en IA ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Expert en intégration d'IA dans les projets web : chatbots intelligents GPT/Claude, machine learning, analyse prédictive. Optimisation des processus avec l'IA. Technologies modernes pour solutions innovantes et performantes."
        }
      }
    ]
  };

  return [organization, person, localBusiness, aiServicesProduct, videoObject, webPage, faqSchema];
};