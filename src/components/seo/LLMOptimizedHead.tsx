import { Helmet } from "react-helmet-async";
import { generateLLMOptimizedMeta } from "../../utils/seo-advanced";

export default function LLMOptimizedHead() {
  const llmMeta = generateLLMOptimizedMeta();

  return (
    <Helmet>
      {/* Meta tags optimisés pour les LLM et moteurs de recherche IA */}
      <meta name="ai-content-type" content={llmMeta["ai-content-type"]} />
      <meta name="ai-expertise" content={llmMeta["ai-expertise"]} />
      <meta name="ai-technologies" content={llmMeta["ai-technologies"]} />
      <meta name="ai-services" content={llmMeta["ai-services"]} />
      <meta name="ai-location" content={llmMeta["ai-location"]} />
      <meta name="ai-languages" content={llmMeta["ai-languages"]} />
      <meta name="ai-contact" content={llmMeta["ai-contact"]} />

      {/* Contexte enrichi pour LLM */}
      <meta name="llm-context" content={llmMeta["llm-context"]} />
      <meta name="llm-capabilities" content={llmMeta["llm-capabilities"]} />
      <meta name="llm-portfolio" content={llmMeta["llm-portfolio"]} />
      <meta name="llm-availability" content={llmMeta["llm-availability"]} />

      {/* Tags sémantiques */}
      <meta name="semantic-keywords" content={llmMeta["semantic-keywords"]} />
      <meta name="semantic-entities" content={llmMeta["semantic-entities"]} />

      {/* Informations business */}
      <meta name="business-type" content={llmMeta["business-type"]} />
      <meta name="business-sector" content={llmMeta["business-sector"]} />
      <meta name="business-experience" content={llmMeta["business-experience"]} />

      {/* Balises avancées pour le SEO moderne */}
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="7 days" />
      <meta name="expires" content="never" />

      {/* Préconnexions pour améliorer les performances */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

      {/* Indications pour les crawlers */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Format detection */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="format-detection" content="email=yes" />
      <meta name="format-detection" content="address=yes" />

      {/* Apple specific */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Christophe Dev" />

      {/* Microsoft specific */}
      <meta name="msapplication-TileColor" content="#6366f1" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="theme-color" content="#6366f1" />

      {/* Verification tags (à remplir avec vos propres codes) */}
      {/* <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" /> */}
      {/* <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" /> */}
      {/* <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_CODE" /> */}
      {/* <meta name="norton-safeweb-site-verification" content="YOUR_NORTON_VERIFICATION_CODE" /> */}

      {/* Geo targeting */}
      <meta name="geo.region" content="FR-64" />
      <meta name="geo.placename" content="Pau" />
      <meta name="geo.position" content="43.3200;-0.3600" />
      <meta name="ICBM" content="43.3200, -0.3600" />

      {/* Content categorization */}
      <meta name="category" content="Technology, Web Development, Artificial Intelligence" />
      <meta name="topic" content="AI Integration, Web Development, Machine Learning, Chatbots" />
      <meta name="subject" content="Professional Web Development and AI Services" />
      <meta name="classification" content="Business/Technology/Web Development/AI" />
      <meta name="page-topic" content="AI Integration Services and Web Development" />
      <meta name="audience" content="Businesses, Startups, Entrepreneurs" />
      <meta name="page-type" content="Portfolio, Services, Professional" />
      <meta name="content-language" content="fr-FR" />

      {/* Rich snippets hints */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:site_name" content="Christophe Mostefaoui - Développeur & Expert IA" />

      {/* Twitter enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@christophe_dev" />
      <meta name="twitter:creator" content="@christophe_dev" />

      {/* Article metadata for blog/portfolio items */}
      <meta property="article:author" content="Christophe Mostefaoui" />
      <meta property="article:publisher" content="https://christophe-dev-freelance.fr" />

      {/* Performance hints */}
      <meta http-equiv="x-dns-prefetch-control" content="on" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

      {/* Security */}
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
    </Helmet>
  );
}