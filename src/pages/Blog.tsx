import { Helmet } from "react-helmet-async";
import BlogSection from "../components/sections/BlogSection";

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog Tech - Christophe Mostefaoui | Veille Technologique & IA pour PME</title>
        <meta
          name="description"
          content="Découvrez les dernières innovations web et IA expliquées simplement pour PME. React.js, Node.js, TypeScript, chatbots, automatisation. Conseils pratiques et retours d'expérience terrain."
        />
        <meta
          name="keywords"
          content="blog développeur web, veille technologique PME, IA accessible entreprises, React.js 2025, Node.js conseils, TypeScript business, chatbot ROI, automatisation PME, modernisation digitale Pau"
        />
        <link rel="canonical" href="https://christophe-dev-freelance.fr/blog" />

        {/* Open Graph */}
        <meta property="og:title" content="Blog Tech - Innovations Web & IA pour Entreprises | Christophe Mostefaoui" />
        <meta property="og:description" content="Veille technologique et retours d'expérience sur les innovations qui transforment vraiment les PME. Du concret, du testé, du vécu." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://christophe-dev-freelance.fr/blog" />

        {/* Schema.org pour Blog */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Blog Tech Christophe Mostefaoui",
            "description": "Veille technologique et innovations IA expliquées pour PME",
            "url": "https://christophe-dev-freelance.fr/blog",
            "author": {
              "@type": "Person",
              "name": "Christophe Mostefaoui",
              "jobTitle": "Développeur Web Freelance Expert",
              "url": "https://christophe-dev-freelance.fr"
            },
            "publisher": {
              "@type": "Person",
              "name": "Christophe Mostefaoui"
            },
            "inLanguage": "fr-FR",
            "about": [
              "Développement Web",
              "React.js",
              "Node.js",
              "Intelligence Artificielle",
              "TypeScript",
              "Modernisation PME"
            ]
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <BlogSection />
      </main>
    </>
  );
};

export default Blog;