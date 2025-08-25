export const generateActionStructuredData = (actions: Array<{
  name: string;
  url: string;
  target?: string;
}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "potentialAction": actions.map(action => ({
      "@type": "Action",
      "name": action.name,
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": action.target || action.url,
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      }
    }))
  };
};

export const generateContactActionStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Christophe Mostefaoui - Développeur Web",
    "url": "https://christophe-dev-freelance.fr",
    "potentialAction": [
      {
        "@type": "CommunicateAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://christophe-dev-freelance.fr/#contact",
          "name": "Formulaire de contact"
        },
        "description": "Obtenez un devis gratuit sous 24h"
      },
      {
        "@type": "OrderAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://christophe-dev-freelance.fr/#contact",
          "name": "Demander un devis"
        },
        "deliveryMethod": "OnSitePickup",
        "description": "Consultation gratuite et devis personnalisé"
      }
    ],
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 43.3,
        "longitude": -0.37
      },
      "geoRadius": "50000"
    },
    "priceRange": "€€",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "availability": "http://schema.org/InStock",
      "eligibleRegion": {
        "@type": "Place",
        "name": "Pau, Pyrénées-Atlantiques, France"
      }
    }
  };
};

export const generateSoftwareApplicationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Services de Développement Web",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Devis gratuit sous 24h"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "12"
    },
    "author": {
      "@type": "Person",
      "name": "Christophe Mostefaoui",
      "jobTitle": "Développeur Full-Stack Senior"
    }
  };
};