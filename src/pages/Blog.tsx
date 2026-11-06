import PageSeo from "../components/seo/PageSeo";
import PageHero from "../components/layout/PageHero";
import BlogSection from "../components/sections/BlogSection";
import BlogScene from "../components/sections/BlogScene";

const Blog = () => {
  return (
    <>
      <PageSeo
        chemin="/blog"
        nomCourt="Blog"
        titre="Blog : conseils site internet pour TPE et artisans"
        description="Conseils concrets et sans jargon sur le site internet, le référencement local et l'IA, pour les artisans, commerçants et PME du 64."
        schemas={[
          {
            "@type": "Blog",
            "@id": "https://christophe-dev-freelance.fr/blog#blog",
            name: "Blog Christophe Mostefaoui",
            description: "Conseils sur la création de site internet, le référencement et le chatbot IA pour PME et artisans",
            url: "https://christophe-dev-freelance.fr/blog",
            inLanguage: "fr-FR",
            author: { "@type": "Person", name: "Christophe Mostefaoui", url: "https://christophe-dev-freelance.fr" },
            about: ["Création de site internet", "Référencement local", "Chatbot IA", "Conseils PME", "Artisans et commerçants"],
          },
        ]}
      />

      <PageHero
        nomCourt="Blog"
        surtitre="Blog"
        titre="Des conseils concrets pour le site de votre entreprise."
        intro={
          <p>
            Pour les artisans, commerçants et dirigeants de PME qui envisagent un site internet ou
            veulent mieux comprendre le web. Sans jargon, sans grille tarifaire magique.
          </p>
        }
      >
        <BlogScene />
      </PageHero>
      <BlogSection />
    </>
  );
};

export default Blog;