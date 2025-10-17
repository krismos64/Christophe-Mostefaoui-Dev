// Optimisation SEO vidéo pour indexation Google
export const generateVideoStructuredData = () => {
  const baseUrl = "https://christophe-dev-freelance.fr";

  // VideoObject principal pour l'indexation Google Video
  const videoObject = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${baseUrl}/#main-video`,
    "name": "Christophe Mostefaoui - Expert IA & Développement Web Full-Stack",
    "description": "Découvrez mon expertise en intégration IA, développement de chatbots intelligents, machine learning et applications web modernes. Spécialiste React.js, Node.js, TypeScript et Python à Pau.",
    "thumbnailUrl": [
      `${baseUrl}/assets/images/Christophe-freelance.png`,
      `${baseUrl}/assets/images/video-thumbnail-1.jpg`,
      `${baseUrl}/assets/images/video-thumbnail-2.jpg`
    ],
    "duration": "PT2M30S",
    "contentUrl": `${baseUrl}/assets/videos/animation-chris-dev.mp4`,
    "embedUrl": "https://www.youtube.com/embed/tdjXblz4mr4",
    "width": "1920",
    "height": "1080",
    "videoFormat": "MP4",
    "videoQuality": "HD",
    "requiresSubscription": false,
    "isFamilyFriendly": true,
    "inLanguage": "fr-FR",
    "keywords": [
      "développeur IA",
      "chatbot GPT",
      "machine learning",
      "React.js expert",
      "Node.js développeur",
      "Python IA",
      "développeur Pau",
      "intégration intelligence artificielle",
      "applications SaaS",
      "freelance développeur"
    ],
    "creator": {
      "@type": "Person",
      "name": "Christophe Mostefaoui",
      "url": baseUrl,
      "sameAs": [
        "https://www.linkedin.com/in/christophemostefaoui/",
        "https://github.com/krismos64"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Christophe Mostefaoui Dev",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/assets/images/Chris-profil.jpg`,
        "width": 1024,
        "height": 1024
      }
    },
    "mainEntity": {
      "@type": "Person",
      "name": "Christophe Mostefaoui",
      "jobTitle": "Développeur Web Full-Stack & Expert Intelligence Artificielle",
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance"
      }
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Intelligence Artificielle",
        "sameAs": "https://fr.wikipedia.org/wiki/Intelligence_artificielle"
      },
      {
        "@type": "Thing",
        "name": "Machine Learning",
        "sameAs": "https://fr.wikipedia.org/wiki/Apprentissage_automatique"
      },
      {
        "@type": "Thing",
        "name": "React.js",
        "sameAs": "https://reactjs.org/"
      },
      {
        "@type": "Thing",
        "name": "Node.js",
        "sameAs": "https://nodejs.org/"
      },
      {
        "@type": "Thing",
        "name": "Python Programming",
        "sameAs": "https://www.python.org/"
      }
    ],
    "mentions": [
      {
        "@type": "SoftwareApplication",
        "name": "ChatGPT",
        "applicationCategory": "AI Assistant"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Claude AI",
        "applicationCategory": "AI Assistant"
      },
      {
        "@type": "SoftwareApplication",
        "name": "TensorFlow",
        "applicationCategory": "Machine Learning Framework"
      }
    ],
    "locationCreated": {
      "@type": "Place",
      "name": "Pau, France",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pau",
        "addressRegion": "Pyrénées-Atlantiques",
        "addressCountry": "FR"
      }
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Businesses seeking AI integration and web development services"
    },
    "genre": ["Technology", "Programming", "Artificial Intelligence", "Tutorial"],
    "learningResourceType": "Portfolio Presentation",
    "educationalLevel": "Professional",
    "accessMode": ["visual", "auditory"],
    "accessibilityFeature": ["captions", "transcript"],
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "copyrightHolder": {
      "@type": "Person",
      "name": "Christophe Mostefaoui"
    },
    "copyrightYear": 2024,
    "isAccessibleForFree": true,
    "commentCount": 0,
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/WatchAction",
        "userInteractionCount": 1250
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/LikeAction",
        "userInteractionCount": 98
      }
    ],
    "potentialAction": [
      {
        "@type": "WatchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/#video-presentation`,
          "actionPlatform": [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform"
          ]
        }
      },
      {
        "@type": "ShareAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/?share=video`
        }
      }
    ]
  };

  // WebPage avec mainEntity VideoObject
  const videoWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}/#video-page`,
    "url": `${baseUrl}/#video-presentation`,
    "name": "Présentation Vidéo - Christophe Mostefaoui Expert IA & Développement",
    "description": "Vidéo de présentation des services d'intégration IA et développement web de Christophe Mostefaoui. Expertise ChatGPT, Claude, Machine Learning, React.js, Node.js.",
    "mainEntity": {
      "@id": `${baseUrl}/#main-video`
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": `${baseUrl}/assets/images/Christophe-freelance.png`,
      "width": 1200,
      "height": 630
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
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
          "name": "Présentation Vidéo",
          "item": `${baseUrl}/#video-presentation`
        }
      ]
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Développement Web IA",
        "description": "Services de développement web avec intégration d'intelligence artificielle"
      }
    ],
    "mentions": [
      {
        "@type": "Person",
        "name": "Christophe Mostefaoui"
      }
    ],
    "isPartOf": {
      "@type": "WebSite",
      "name": "Christophe Mostefaoui - Portfolio Développeur",
      "url": baseUrl
    },
    "inLanguage": "fr-FR",
    "author": {
      "@type": "Person",
      "name": "Christophe Mostefaoui"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Christophe Mostefaoui Dev"
    }
  };

  return [videoObject, videoWebPage];
};

// Balises meta optimisées pour l'indexation vidéo Google
export const generateVideoMetaTags = () => {
  const baseUrl = "https://christophe-dev-freelance.fr";

  return {
    // Meta tags spécifiques vidéo
    "video:title": "Christophe Mostefaoui - Expert IA & Développement Web",
    "video:description": "Expertise en intégration IA, chatbots intelligents, machine learning et développement web moderne",
    "video:thumbnail": `${baseUrl}/assets/images/Christophe-freelance.png`,
    "video:duration": "150",
    "video:width": "1920",
    "video:height": "1080",
    "video:type": "video/mp4",
    "video:url": `${baseUrl}/assets/videos/animation-chris-dev.mp4`,
    "video:secure_url": `${baseUrl}/assets/videos/animation-chris-dev.mp4`,
    "video:tag": "développeur IA, chatbot, machine learning, React.js, Node.js, Python",

    // Open Graph vidéo enrichi
    "og:video": `${baseUrl}/assets/videos/animation-chris-dev.mp4`,
    "og:video:secure_url": `${baseUrl}/assets/videos/animation-chris-dev.mp4`,
    "og:video:type": "video/mp4",
    "og:video:width": "1920",
    "og:video:height": "1080",
    "og:video:duration": "150",
    "og:video:tag": ["IA", "chatbot", "machine learning", "React.js", "développeur"],

    // Twitter Player Card
    "twitter:player": "https://www.youtube.com/embed/tdjXblz4mr4",
    "twitter:player:width": "1920",
    "twitter:player:height": "1080",
    "twitter:player:stream": `${baseUrl}/assets/videos/animation-chris-dev.mp4`,
    "twitter:player:stream:content_type": "video/mp4",

    // Données pour les moteurs de recherche
    "robots": "index, follow, max-video-preview:-1",
    "googlebot": "index, follow, max-video-preview:-1"
  };
};
