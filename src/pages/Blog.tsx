import { Helmet } from "react-helmet-async";
import BlogSection from "../components/sections/BlogSection";

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog - Christophe Mostefaoui | Conseils site internet pour PME et artisans</title>
        <meta
          name="description"
          content="Conseils concrets sur la création de site internet, le référencement et le chatbot IA pour artisans, commerçants et PME à Pau et en Pyrénées-Atlantiques. Sans jargon, sans grille tarifaire magique."
        />
        <meta
          name="keywords"
          content="blog création site internet PME, conseils site web artisan, référencement local Pau, chatbot IA commerce, développeur web freelance Pau, prix site internet"
        />
        <link rel="canonical" href="https://christophe-dev-freelance.fr/blog" />

        {/* Open Graph */}
        <meta property="og:title" content="Blog - Conseils site internet pour PME et artisans | Christophe Mostefaoui" />
        <meta property="og:description" content="Conseils concrets et sans jargon sur le web, le référencement et l'IA, pour les artisans, commerçants et dirigeants de PME." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://christophe-dev-freelance.fr/blog" />

        {/* Schema.org pour Blog */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Blog Christophe Mostefaoui",
            "description": "Conseils sur la création de site internet, le référencement et le chatbot IA pour PME et artisans",
            "url": "https://christophe-dev-freelance.fr/blog",
            "author": {
              "@type": "Person",
              "name": "Christophe Mostefaoui",
              "jobTitle": "Développeur Web Freelance",
              "url": "https://christophe-dev-freelance.fr"
            },
            "publisher": {
              "@type": "Person",
              "name": "Christophe Mostefaoui"
            },
            "inLanguage": "fr-FR",
            "about": [
              "Création de site internet",
              "Référencement local",
              "Chatbot IA",
              "Conseils PME",
              "Artisans et commerçants"
            ]
          })}
        </script>
      </Helmet>

      <main id="main">
        <BlogSection />
      </main>
    </>
  );
};

export default Blog;