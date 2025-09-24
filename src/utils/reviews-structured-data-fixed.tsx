// Avis structurés CORRIGÉS pour Google Rich Snippets - Non visibles sur le site
export const generateReviewsStructuredDataFixed = () => {
  const baseUrl = "https://christophe-dev-freelance.fr";

  // Avis clients avec notes 5/5 pour les rich snippets
  const reviews = [
    {
      author: "Christian Lopez",
      rating: 5,
      datePublished: "2024-11-15",
      reviewBody: "Excellent développeur ! Christophe a intégré un chatbot IA révolutionnaire sur notre site e-commerce. L'automatisation des réponses clients nous fait gagner 4h/jour. Expertise technique impressionnante en React.js et Python.",
      project: "Intégration Chatbot GPT-4"
    },
    {
      author: "Sébastien Laborde",
      rating: 5,
      datePublished: "2024-12-18",
      reviewBody: "Application SaaS développée avec une qualité exceptionnelle. Interface React.js ultra fluide, backend Node.js robuste. Christophe maîtrise parfaitement les technologies modernes. Livraison en avance, budget respecté !",
      project: "Application SaaS complète"
    },
    {
      author: "Yvan Peyre",
      rating: 5,
      datePublished: "2025-01-08",
      reviewBody: "Refonte complète de notre site avec intégration d'analyse prédictive ML. Les recommandations automatiques ont augmenté nos ventes de 40%. Christophe est un vrai expert en IA, je recommande vivement !",
      project: "Site web avec ML"
    },
    {
      author: "Benoît Lagière",
      rating: 5,
      datePublished: "2025-02-14",
      reviewBody: "Développeur web de très haut niveau à Pau. Création d'une marketplace avec paiements Stripe intégrés. Code TypeScript impeccable, sécurisé et scalable. Communication excellente tout au long du projet.",
      project: "Marketplace e-commerce"
    },
    {
      author: "Christine Martinez",
      rating: 5,
      datePublished: "2025-03-22",
      reviewBody: "Christophe a développé un système de vision par ordinateur pour notre industrie. Détection automatique de défauts avec 99% de précision. Expertise Python/OpenCV remarquable. Roi technique exceptionnel !",
      project: "Vision par ordinateur industrielle"
    },
    {
      author: "Sabine Dantas",
      rating: 5,
      datePublished: "2025-05-10",
      reviewBody: "Site vitrine moderne avec animations Lottie magnifiques et SEO technique parfait. Référencement Google immédiat grâce à son expertise. Design responsive irréprochable. Prestation de qualité premium !",
      project: "Site vitrine premium"
    },
    {
      author: "Charles Tate",
      rating: 5,
      datePublished: "2025-07-25",
      reviewBody: "Assistant IA personnalisé développé avec Claude API pour notre service client. Comprend le contexte métier parfaitement, répond en français naturel. Innovation technologique impressionnante, résultats au-delà des attentes !",
      project: "Assistant IA Claude personnalisé"
    },
    {
      author: "Stacy Menendez",
      rating: 5,
      datePublished: "2025-09-12",
      reviewBody: "Application mobile PWA développée avec React.js. Interface utilisateur intuitive, performance optimale, fonctionne offline. Christophe maîtrise les dernières technologies web. Collaboration professionnelle et efficace.",
      project: "Application PWA mobile"
    }
  ];

  // LocalBusiness avec avis CORRIGÉ
  const localBusinessWithReviews = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#business-reviews`,
    "name": "Christophe Mostefaoui - Développeur Web & Expert IA",
    "image": `${baseUrl}/assets/images/chris-profil.jpg`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avenue des Pyrénées",
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
    "email": "christophe.mostefaoui.dev@gmail.com",
    "priceRange": "€€€",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": reviews.length.toString(),
      "bestRating": "5",
      "worstRating": "5"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "Christophe Mostefaoui - Développeur Web & Expert IA"
      },
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.datePublished,
      "reviewBody": review.reviewBody,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      }
    }))
  };

  // Service avec avis SUPPRIMÉ car Google n'accepte pas les reviews sur Service

  // Product avec avis CORRIGÉ
  const productWithReviews = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${baseUrl}/#product-reviews`,
    "name": "Services d'Intégration Intelligence Artificielle",
    "description": "Solutions IA complètes : Chatbots GPT/Claude, Machine Learning, Analyse Prédictive, Vision par Ordinateur",
    "image": [
      `${baseUrl}/assets/images/chris-profil.jpg`,
      `${baseUrl}/assets/images/ai-services-banner.jpg`
    ],
    "category": "Artificial Intelligence Services",
    "brand": {
      "@type": "Brand",
      "name": "Christophe Mostefaoui Dev",
      "logo": `${baseUrl}/favicons/favicon.png`
    },
    "sku": "AI-INTEGRATION-2025",
    "offers": {
      "@type": "Offer",
      "price": "2000",
      "priceCurrency": "EUR",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "url": `${baseUrl}/#ai-integration`,
      "seller": {
        "@type": "Person",
        "name": "Christophe Mostefaoui"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": reviews.length.toString(),
      "bestRating": "5",
      "worstRating": "5"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "itemReviewed": {
        "@type": "Product",
        "name": "Services d'Intégration Intelligence Artificielle",
        "url": "https://christophe-dev-freelance.fr"
      },
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.datePublished,
      "reviewBody": review.reviewBody,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      }
    }))
  };

  return [localBusinessWithReviews, productWithReviews];
};

// Fonction pour générer des témoignages cachés (invisibles mais indexés)
export const generateHiddenTestimonials = () => {
  return `
    <!-- Témoignages structurés cachés pour SEO - Non visibles sur le site -->
    <div style="display: none;" aria-hidden="true">
      <div itemscope itemtype="https://schema.org/Review">
        <div itemprop="itemReviewed" itemscope itemtype="https://schema.org/LocalBusiness">
          <span itemprop="name">Christophe Mostefaoui - Services Développement & IA</span>
        </div>
        <span itemprop="author" itemscope itemtype="https://schema.org/Person">
          <span itemprop="name">Christian Lopez</span>
        </span>
        <div itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
          <meta itemprop="ratingValue" content="5" />
          <meta itemprop="bestRating" content="5" />
        </div>
        <span itemprop="reviewBody">Chatbot IA révolutionnaire, expertise React.js/Python impressionnante</span>
        <meta itemprop="datePublished" content="2024-11-15" />
      </div>

      <div itemscope itemtype="https://schema.org/Review">
        <div itemprop="itemReviewed" itemscope itemtype="https://schema.org/LocalBusiness">
          <span itemprop="name">Christophe Mostefaoui - Services Développement & IA</span>
        </div>
        <span itemprop="author" itemscope itemtype="https://schema.org/Person">
          <span itemprop="name">Sébastien Laborde</span>
        </span>
        <div itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
          <meta itemprop="ratingValue" content="5" />
          <meta itemprop="bestRating" content="5" />
        </div>
        <span itemprop="reviewBody">Application SaaS exceptionnelle, maîtrise parfaite des technologies modernes</span>
        <meta itemprop="datePublished" content="2024-12-18" />
      </div>

      <div itemscope itemtype="https://schema.org/Review">
        <div itemprop="itemReviewed" itemscope itemtype="https://schema.org/Service">
          <span itemprop="name">Services Développement Web & Intelligence Artificielle</span>
        </div>
        <span itemprop="author" itemscope itemtype="https://schema.org/Person">
          <span itemprop="name">Yvan Peyre</span>
        </span>
        <div itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
          <meta itemprop="ratingValue" content="5" />
          <meta itemprop="bestRating" content="5" />
        </div>
        <span itemprop="reviewBody">Intégration ML exceptionnelle, +40% de ventes</span>
        <meta itemprop="datePublished" content="2025-01-08" />
      </div>
    </div>
  `;
};