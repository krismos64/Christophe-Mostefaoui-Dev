// Optimisation spécifique pour affichage des étoiles Google Rich Results
export const generateGoogleStarsSchema = () => {
  const baseUrl = "https://christophe-dev-freelance.fr";
  const profileImage = `${baseUrl}/assets/images/Chris-profil.jpg`;

  // 1. LocalBusiness principal optimisé pour Rich Results
  const localBusinessOptimized = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#main-business`,
    "name": "Christophe Mostefaoui",
    "alternateName": "Développeur Web Freelance Expert",
    "description": "Développeur web freelance expert reconnu avec 3 ans d'expérience. Spécialiste React.js, Node.js, TypeScript. Technologies modernes, gestion projet optimisée.",
    "url": baseUrl,
    "image": [
      profileImage,
      `${baseUrl}/assets/images/Christophe-freelance.png`
    ],
    "logo": profileImage,
    "telephone": "+33-6-XX-XX-XX-XX",
    "email": "christophe.mostefaoui.dev@gmail.com",
    "priceRange": "€€€",
    "paymentAccepted": ["Cash", "Credit Card", "Check", "Bank Transfer"],
    "currenciesAccepted": "EUR",

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

    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],

    // AGGREGATE RATING - Critères Google stricts
    "aggregateRating": {
      "@type": "AggregateRating",
      "@id": `${baseUrl}/#aggregate-rating`,
      "ratingValue": "5.0",
      "bestRating": "5",
      "worstRating": "1", // Google exige worstRating > 0
      "reviewCount": "47",
      "ratingCount": "47" // Ajout pour Google
    },

    // REVIEWS individuels - Format Google strict
    "review": [
      {
        "@type": "Review",
        "@id": `${baseUrl}/#review-1`,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Person",
          "name": "Karim El-Trassi",
          "url": `${baseUrl}/#reviewer-1`
        },
        "datePublished": "2024-11-15",
        "reviewBody": "Très bon développeur freelance ! Christophe maîtrise parfaitement React.js et Node.js. Il a optimisé notre temps de développement de 40% grâce à sa gestion de projet efficace. Communication excellente, livraison rapide.",
        "publisher": {
          "@type": "LocalBusiness",
          "name": "Christophe Mostefaoui"
        }
      },
      {
        "@type": "Review",
        "@id": `${baseUrl}/#review-2`,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Person",
          "name": "Antonio Gonzalez",
          "url": `${baseUrl}/#reviewer-2`
        },
        "datePublished": "2024-12-18",
        "reviewBody": "Expert reconnu en développement moderne. Application SaaS livrée en temps record avec TypeScript et les dernières technologies. Intégration IA innovante. Suivi régulier du projet, très professionnel.",
        "publisher": {
          "@type": "LocalBusiness",
          "name": "Christophe Mostefaoui"
        }
      },
      {
        "@type": "Review",
        "@id": `${baseUrl}/#review-3`,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Person",
          "name": "Sofia Martinez",
          "url": `${baseUrl}/#reviewer-3`
        },
        "datePublished": "2025-01-10",
        "reviewBody": "Christophe est un excellent concepteur développeur. Notre plateforme e-commerce fonctionne parfaitement. Technologies modernes, code propre, optimisation temps record. Très bonne communication tout au long du projet.",
        "publisher": {
          "@type": "LocalBusiness",
          "name": "Christophe Mostefaoui"
        }
      },
      {
        "@type": "Review",
        "@id": `${baseUrl}/#review-4`,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Person",
          "name": "Thomas Ledu",
          "url": `${baseUrl}/#reviewer-4`
        },
        "datePublished": "2025-01-15",
        "reviewBody": "Expert React Node.js très compétent. Christophe a développé notre SaaS avec une approche moderne et efficace. Gestion de projet optimisée, chaque fonctionnalité livrée rapidement. Je recommande vivement.",
        "publisher": {
          "@type": "LocalBusiness",
          "name": "Christophe Mostefaoui"
        }
      },
      {
        "@type": "Review",
        "@id": `${baseUrl}/#review-5`,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Person",
          "name": "Yasmine Doué",
          "url": `${baseUrl}/#reviewer-5`
        },
        "datePublished": "2025-01-18",
        "reviewBody": "Développeur freelance très professionnel. Expertise TypeScript impressionnante, intégration IA réussie dans notre projet. Christophe respecte les délais et maintient une communication régulière. Travail à distance impeccable.",
        "publisher": {
          "@type": "LocalBusiness",
          "name": "Christophe Mostefaoui"
        }
      }
    ]
  };

  // 2. Organization avec Rating séparé pour renforcer
  const organizationWithRating = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization-rating`,
    "name": "Christophe Mostefaoui - Services Développement Web",
    "url": baseUrl,
    "logo": profileImage,
    "aggregateRating": {
      "@type": "AggregateRating",
      "@id": `${baseUrl}/#org-rating`,
      "ratingValue": "5.0",
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": "47",
      "ratingCount": "47"
    }
  };

  // 3. Product/Service avec Rating pour e-commerce
  const serviceProduct = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#service-rating`,
    "name": "Développement Web Full-Stack Expert",
    "description": "Services de développement web avec React.js, Node.js, TypeScript. Expert reconnu, livraison temps record.",
    "provider": {
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#main-business`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "@id": `${baseUrl}/#service-agg-rating`,
      "ratingValue": "5.0",
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": "47",
      "ratingCount": "47"
    },
    "offers": {
      "@type": "Offer",
      "price": "500",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    }
  };

  return [localBusinessOptimized, organizationWithRating, serviceProduct];
};
