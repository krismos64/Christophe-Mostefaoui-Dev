// Données de localisation étendues pour SEO national
export const generateLocationStructuredData = () => {
  const baseUrl = "https://christophe-dev-freelance.fr";

  // Service Areas complet pour la France
  const serviceAreasSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#service-areas`,
    "name": "Développement Web Freelance - France entière",
    "provider": {
      "@type": "Person",
      "name": "Christophe Mostefaoui",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pau",
        "addressRegion": "Pyrénées-Atlantiques",
        "addressCountry": "FR"
      }
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "France",
        "@id": "https://www.wikidata.org/wiki/Q142"
      },
      // Grandes métropoles
      { "@type": "City", "name": "Paris", "address": { "@type": "PostalAddress", "addressRegion": "Île-de-France" }},
      { "@type": "City", "name": "Lyon", "address": { "@type": "PostalAddress", "addressRegion": "Auvergne-Rhône-Alpes" }},
      { "@type": "City", "name": "Marseille", "address": { "@type": "PostalAddress", "addressRegion": "Provence-Alpes-Côte d'Azur" }},
      { "@type": "City", "name": "Toulouse", "address": { "@type": "PostalAddress", "addressRegion": "Occitanie" }},
      { "@type": "City", "name": "Bordeaux", "address": { "@type": "PostalAddress", "addressRegion": "Nouvelle-Aquitaine" }},
      { "@type": "City", "name": "Nice", "address": { "@type": "PostalAddress", "addressRegion": "Provence-Alpes-Côte d'Azur" }},
      { "@type": "City", "name": "Nantes", "address": { "@type": "PostalAddress", "addressRegion": "Pays de la Loire" }},
      { "@type": "City", "name": "Strasbourg", "address": { "@type": "PostalAddress", "addressRegion": "Grand Est" }},
      { "@type": "City", "name": "Lille", "address": { "@type": "PostalAddress", "addressRegion": "Hauts-de-France" }},
      { "@type": "City", "name": "Montpellier", "address": { "@type": "PostalAddress", "addressRegion": "Occitanie" }},
      // Villes locales
      { "@type": "City", "name": "Pau", "address": { "@type": "PostalAddress", "addressRegion": "Pyrénées-Atlantiques" }},
      { "@type": "City", "name": "Artix", "address": { "@type": "PostalAddress", "addressRegion": "Pyrénées-Atlantiques" }},
      { "@type": "City", "name": "Lescar", "address": { "@type": "PostalAddress", "addressRegion": "Pyrénées-Atlantiques" }},
      { "@type": "City", "name": "Billère", "address": { "@type": "PostalAddress", "addressRegion": "Pyrénées-Atlantiques" }},
      { "@type": "City", "name": "Jurançon", "address": { "@type": "PostalAddress", "addressRegion": "Pyrénées-Atlantiques" }}
    ],
    "serviceType": [
      "Développement Web Full-Stack",
      "Applications React.js",
      "Backend Node.js",
      "TypeScript Expert",
      "Intégration IA",
      "Applications SaaS",
      "E-commerce",
      "PWA"
    ],
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": baseUrl,
      "servicePhone": "+33-6-XX-XX-XX-XX",
      "email": "christophe.mostefaoui.dev@gmail.com",
      "availableLanguage": ["fr", "en"],
      "serviceLocation": {
        "@type": "Place",
        "name": "Service à distance - France entière"
      }
    }
  };

  // Breadcrumb pour navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}/#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@id": baseUrl,
          "name": "Christophe Mostefaoui - Développeur Web Freelance France"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@id": `${baseUrl}/#services`,
          "name": "Services Développement Web"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@id": `${baseUrl}/#ai-integration`,
          "name": "Intégration IA"
        }
      }
    ]
  };

  // WebSite avec SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "Christophe Mostefaoui - Expert Développeur Web Freelance",
    "description": "Développeur web freelance expert reconnu. React.js, Node.js, TypeScript. Services dans toute la France à distance.",
    "publisher": {
      "@id": `${baseUrl}/#person`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/?s={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "fr-FR"
  };

  // CollectionPage pour le portfolio
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${baseUrl}/#portfolio`,
    "name": "Portfolio - Projets Développement Web",
    "description": "Projets réalisés : Applications SaaS, E-commerce, Intégration IA. Technologies modernes React.js, Node.js, TypeScript.",
    "url": `${baseUrl}/#portfolio`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": 6,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "CreativeWork",
            "name": "LivresStaka.fr - Plateforme E-commerce",
            "url": "https://livrestaka.fr",
            "description": "E-commerce moderne avec React.js, Stripe, gestion temps record"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "SoftwareApplication",
            "name": "SmartPlanning - SaaS Entreprise",
            "url": "https://smartplanning.fr",
            "description": "Application SaaS complète, TypeScript, optimisation maximale"
          }
        }
      ]
    }
  };

  return [serviceAreasSchema, breadcrumbSchema, websiteSchema, collectionSchema];
};