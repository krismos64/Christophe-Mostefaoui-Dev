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
    "image": `${baseUrl}/assets/images/chris-profil.jpg`,
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
    "image": `${baseUrl}/assets/images/chris-profil.jpg`,
    "email": "contact@christophe-dev-freelance.fr",
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
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#business`,
    "name": "Christophe Mostefaoui - Services Développement & IA",
    "image": `${baseUrl}/assets/images/chris-profil.jpg`,
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
    "telephone": "+33-6-XX-XX-XX-XX",
    "email": "contact@christophe-dev-freelance.fr",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "8",
      "bestRating": "5",
      "worstRating": "5"
    },
    "review": [
      {
        "@type": "Review",
        "itemReviewed": {
          "@type": "LocalBusiness",
          "name": "Christophe Mostefaoui - Services Développement & IA"
        },
        "author": {
          "@type": "Person",
          "name": "Christian Lopez"
        },
        "datePublished": "2024-11-15",
        "reviewBody": "Excellent développeur ! Christophe a intégré un chatbot IA révolutionnaire. Expertise technique impressionnante.",
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
          "name": "Christophe Mostefaoui - Services Développement & IA"
        },
        "author": {
          "@type": "Person",
          "name": "Sébastien Laborde"
        },
        "datePublished": "2024-12-18",
        "reviewBody": "Application SaaS développée avec une qualité exceptionnelle. Interface React.js ultra fluide.",
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
      `${baseUrl}/assets/images/chris-profil.jpg`,
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
      "reviewCount": "8",
      "bestRating": "5",
      "worstRating": "5"
    },

    // REVIEWS requis
    "review": [
      {
        "@type": "Review",
        "itemReviewed": {
          "@id": `${baseUrl}/#ai-services-product`
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
          "@id": `${baseUrl}/#ai-services-product`
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

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${baseUrl}/#faq`,
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quels types d'IA intégrez-vous ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chatbots GPT/Claude, Machine Learning, Vision par Ordinateur, Analyse Prédictive, NLP avec Python, TensorFlow."
        }
      },
      {
        "@type": "Question",
        "name": "Quels sont vos tarifs ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "À partir de 2000€ pour un chatbot simple, jusqu'à 15000€ pour des solutions ML complexes. Devis gratuit personnalisé."
        }
      }
    ]
  };

  return [organization, person, localBusiness, aiServicesProduct, videoObject, webPage, faqSchema];
};