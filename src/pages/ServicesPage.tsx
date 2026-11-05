import PageHero from "../components/layout/PageHero";
import Pricing from "../components/sections/Pricing";
import Services from "../components/sections/Services";
import PageSeo from "../components/seo/PageSeo";

export default function ServicesPage() {
  return (
    <>
      <PageSeo
        chemin="/services"
        nomCourt="Services"
        titre="Création de site internet, refonte et chatbot IA à Pau"
        description="Site vitrine, site plus complet, refonte, assistant IA, référencement Google, vidéo et drone. Développeur web freelance à Pau, devis gratuit sous 24h."
      />
      <PageHero
        nomCourt="Services"
        surtitre="Services"
        titre="Votre site internet, de A à Z, avec un seul interlocuteur."
        intro={
          <p>
            Je crée, refais et fais connaître les sites internet des entreprises du Béarn et du
            Pays basque. Vous me parlez de votre activité, je m'occupe du reste et je vous
            explique chaque étape, sans jargon.
          </p>
        }
      />
      <Services />
      <Pricing />
    </>
  );
}
