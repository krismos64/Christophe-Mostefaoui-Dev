import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: string;
  structuredData?: object;
}

export const SEOHead = ({
  title = "Christophe Mostefaoui - Développeur Web Full-Stack & Expert IA à Pau | React.js, Node.js & Python",
  description = "Christophe Mostefaoui - Développeur web full-stack et expert en intégration IA à Pau (64). Chatbots intelligents GPT/Claude, machine learning, analyse prédictive. Spécialiste React.js, Node.js, TypeScript, Python. Création d'applications SaaS avec IA, e-commerce intelligent et solutions digitales innovantes.",
  keywords = "Développeur IA Pau, intégration intelligence artificielle, chatbot GPT Claude, machine learning, Python développeur, React.js expert, Node.js, TypeScript, analyse prédictive, vision par ordinateur, génération contenu IA, full-stack developer, SaaS IA, automatisation intelligente, TensorFlow, scikit-learn, OpenAI API, Christophe Mostefaoui, Artix 64170,",
  canonical = "https://christophe-dev-freelance.fr/",
  image = "https://christophe-dev-freelance.fr/assets/images/chris-profil.jpg",
  type = "website",
  structuredData,
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export const generateBreadcrumbStructuredData = (
  items: Array<{ name: string; url: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const generateArticleStructuredData = (article: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image: string;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Person",
      name: article.author,
    },
    image: article.image,
    url: article.url,
    publisher: {
      "@type": "Organization",
      name: "Christophe Mostefaoui - Développeur Web",
      logo: {
        "@type": "ImageObject",
        url: "https://christophe-dev-freelance.fr/assets/images/favicon.png",
      },
    },
  };
};

export const generateFAQStructuredData = (
  faqs: Array<{ question: string; answer: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

export const generateLocalBusinessStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://christophe-dev-freelance.fr/#business",
    name: "Christophe Mostefaoui",
    alternateName: "Christophe Mostefaoui - Développeur Web",
    description:
      "Développeur web freelance et expert IA à Pau. Intégration d'intelligence artificielle, chatbots, machine learning. Spécialiste React.js, Node.js, TypeScript et Python. Création d'applications SaaS avec IA, e-commerce intelligent.",
    url: "https://christophe-dev-freelance.fr",
    telephone: "+33-6-XX-XX-XX-XX",
    email: "contact@christophe-dev-freelance.fr",
    image: "https://christophe-dev-freelance.fr/assets/images/chris-profil.jpg",
    logo: "https://christophe-dev-freelance.fr/favicons/favicon.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pau",
      addressRegion: "Pyrénées-Atlantiques",
      postalCode: "64000",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.32,
      longitude: -0.36,
    },
    areaServed: [
      {
        "@type": "Place",
        name: "Pau",
      },
      {
        "@type": "Place",
        name: "Pyrénées-Atlantiques",
      },
      {
        "@type": "Place",
        name: "France",
      },
    ],
    serviceType: [
      "Intégration Intelligence Artificielle",
      "Développement Chatbots IA",
      "Machine Learning Solutions",
      "Analyse Prédictive",
      "Vision par Ordinateur",
      "Développement Web",
      "Applications SaaS avec IA",
      "Sites E-commerce Intelligents",
      "Développement React.js",
      "Développement Node.js",
      "Python AI Development",
      "TypeScript Development",
    ],
    priceRange: "€€",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "24",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Client Satisfait",
        },
        reviewBody:
          "Excellent développeur, très professionnel et à l'écoute. Christophe a créé notre application SaaS avec une expertise remarquable en React.js et Node.js.",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Entreprise Locale",
        },
        reviewBody:
          "Site e-commerce parfaitement optimisé et moderne. Un freelance de grande qualité à Pau, je recommande vivement !",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/in/christophemostefaoui/",
      "https://github.com/krismos64",
      "https://g.page/r/CcnggWy2_KpMEBI",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de Développement Web",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Développement Applications SaaS",
            description:
              "Création d'applications SaaS complètes avec React.js, Node.js et TypeScript",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sites E-commerce",
            description:
              "Solutions e-commerce performantes avec paiements intégrés",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sites Web sur Mesure",
            description: "Création de sites web modernes et optimisés SEO",
          },
        },
      ],
    },
  };
};
