import { Helmet } from 'react-helmet-async';

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
  title = 'Christophe Mostefaoui - Développeur Web Full-Stack Expert à Pau | React.js & Node.js',
  description = 'Christophe Mostefaoui - Développeur web full-stack freelance expert à Pau (64). Spécialiste React.js, Node.js, TypeScript, Symfony PHP. Création d\'applications SaaS, e-commerce et sites vitrines sur mesure. SEO technique, performance web et solutions digitales innovantes.',
  keywords = 'Développeur web freelance Pau, React.js expert, Node.js développeur, TypeScript spécialiste, Symfony PHP, full-stack developer, SaaS application, e-commerce development, site vitrine, SEO technique, performance web, API REST, MongoDB, MySQL, développement sur mesure, solutions digitales, Christophe Mostefaoui, Artix 64170',
  canonical = 'https://christophe-dev-freelance.fr/',
  image = 'https://christophe-dev-freelance.fr/assets/images/business-smartplanning.webp',
  type = 'website',
  structuredData
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

export const generateBreadcrumbStructuredData = (items: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
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
    "headline": article.title,
    "description": article.description,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "image": article.image,
    "url": article.url,
    "publisher": {
      "@type": "Organization",
      "name": "Christophe Mostefaoui - Développeur Web",
      "logo": {
        "@type": "ImageObject",
        "url": "https://christophe-dev-freelance.fr/assets/images/favicon.png"
      }
    }
  };
};

export const generateFAQStructuredData = (faqs: Array<{question: string, answer: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};