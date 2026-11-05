import PageHero from "../components/layout/PageHero";
import About from "../components/sections/About";
import PageSeo from "../components/seo/PageSeo";
import { schemaVideoUnivers } from "../utils/structured-data-final";

export default function APropos() {
  return (
    <>
      <PageSeo
        chemin="/a-propos"
        nomCourt="À propos"
        titre="À propos : Christophe Mostefaoui, développeur web à Pau"
        description="Douze ans de conseil client, puis le développement web. Christophe Mostefaoui crée seul les sites des TPE et PME du Béarn et du Pays basque, depuis Pau et Artix."
        schemas={[schemaVideoUnivers()]}
      />
      <PageHero
        nomCourt="À propos"
        surtitre="À propos"
        titre="Christophe Mostefaoui, développeur web à Pau et Artix."
        intro={
          <p>
            Je travaille seul, sans agence ni sous-traitant : la personne qui vous répond au
            téléphone est celle qui crée votre site.
          </p>
        }
      />
      <About />
    </>
  );
}
