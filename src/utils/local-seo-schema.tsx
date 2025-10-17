// Schema.org spécifique pour SEO local et GMB
export const generateLocalSEOSchema = () => {
  const baseUrl = "https://christophe-dev-freelance.fr";

  // LocalBusiness enrichi pour GMB sync
  const gmbLinkedBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#gmb-business`,
    "name": "Christophe Mostefaoui - Développeur Web Freelance Expert",
    "alternateName": [
      "Christophe Mostefaoui Dev",
      "Expert React.js Pau",
      "Développeur Node.js Pyrénées-Atlantiques"
    ],
    "description": "Développeur web freelance expert avec 3 ans d'expérience. Spécialisé React.js, Node.js, TypeScript. Note 5/5 étoiles, 47 avis clients. Disponible France entière.",

    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pau",
      "addressLocality": "Pau",
      "addressRegion": "Pyrénées-Atlantiques",
      "postalCode": "64000",
      "addressCountry": "FR"
    },

    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.2951,
      "longitude": -0.3707
    },

    "url": baseUrl,
    "telephone": "+33-6-XX-XX-XX-XX",
    "email": "christophe.mostefaoui.dev@gmail.com",
    "image": [
      `${baseUrl}/assets/images/Chris-profil.jpg`,
      `${baseUrl}/assets/images/workspace-pau.jpg`,
      `${baseUrl}/assets/images/projects-screen.jpg`
    ],

    "priceRange": "€€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "Check"],

    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],

    "serviceArea": [
      {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 43.2951,
          "longitude": -0.3707
        },
        "geoRadius": "50000" // 50km autour de Pau
      },
      {
        "@type": "Country",
        "name": "France"
      }
    ],

    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services Développement Web Expert",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Développement Applications React.js",
            "description": "Applications web modernes avec React.js 18, TypeScript et design responsive"
          },
          "price": "450",
          "priceCurrency": "EUR",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "450-650",
            "priceCurrency": "EUR",
            "unitText": "DAY"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Applications SaaS sur mesure",
            "description": "Solutions cloud complètes avec authentification, paiements et APIs"
          },
          "price": "15000",
          "priceCurrency": "EUR",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "minPrice": "10000",
            "maxPrice": "50000",
            "priceCurrency": "EUR"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Intégration Intelligence Artificielle",
            "description": "Chatbots GPT/Claude, machine learning et analyse prédictive"
          },
          "price": "3000",
          "priceCurrency": "EUR",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "minPrice": "3000",
            "priceCurrency": "EUR"
          }
        }
      ]
    },

    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": "47",
      "ratingCount": "47"
    },

    "knowsAbout": [
      "React.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "Intelligence Artificielle",
      "Applications SaaS",
      "E-commerce",
      "Développement Web",
      "API REST",
      "MongoDB",
      "MySQL",
      "Python"
    ],

    "slogan": "Expert développeur web moderne - Livraison temps record"
  };

  // Place spécifique pour Pau
  const paulocation = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${baseUrl}/#pau-location`,
    "name": "Pau - Services Développement Web",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pau",
      "addressRegion": "Pyrénées-Atlantiques",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.2951,
      "longitude": -0.3707
    },
    "containedInPlace": {
      "@type": "AdministrativeArea",
      "name": "Pyrénées-Atlantiques"
    }
  };

  // Service spécialisé pour recherches locales
  const localService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#local-service`,
    "name": "Services Développement Web Pau Pyrénées-Atlantiques",
    "serviceType": "Développement Web et Applications",
    "provider": {
      "@id": `${baseUrl}/#gmb-business`
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Pau",
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": "Pyrénées-Atlantiques"
        }
      },
      {
        "@type": "City",
        "name": "Artix"
      },
      {
        "@type": "City",
        "name": "Lescar"
      },
      {
        "@type": "City",
        "name": "Billère"
      },
      {
        "@type": "City",
        "name": "Jurançon"
      },
      {
        "@type": "City",
        "name": "Bayonne"
      },
      {
        "@type": "City",
        "name": "Biarritz"
      },
      {
        "@type": "City",
        "name": "Tarbes"
      }
    ],
    "hasOfferCatalog": {
      "@id": `${baseUrl}/#gmb-business`
    }
  };

  return [gmbLinkedBusiness, paulocation, localService];
};

// Générateur d'avis automatique pour GMB
export const generateReviewRequestSchema = (clientName: string, projectType: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "ReviewAction",
    "target": {
      "@type": "LocalBusiness",
      "name": "Christophe Mostefaoui - Développeur Web Freelance Expert"
    },
    "object": {
      "@type": "Service",
      "name": projectType
    },
    "agent": {
      "@type": "Person",
      "name": clientName
    },
    "actionStatus": "PotentialActionStatus"
  };
};
