import PageHero from "../components/layout/PageHero";
import Portfolio from "../components/sections/Portfolio";
import SmartPlanningShowcase from "../components/sections/SmartPlanningShowcase";
import PageSeo from "../components/seo/PageSeo";
import { schemaSmartPlanning } from "../utils/structured-data-final";

export default function Realisations() {
  return (
    <>
      <PageSeo
        chemin="/realisations"
        nomCourt="Réalisations"
        titre="Réalisations : 11 sites et applications | Christophe Mostefaoui"
        description="Boutique de bijoux à Artix, cabinet infirmier, plateforme d'édition, logiciel de plannings SmartPlanning : 11 projets d'un développeur web freelance à Pau."
        schemas={[schemaSmartPlanning()]}
      />
      <PageHero
        nomCourt="Réalisations"
        surtitre="Réalisations"
        suite="foret"
        titre="Onze projets, onze métiers différents."
        intro={
          <p>
            Artisans, professions de santé, formation, logiciels : chaque site a été pensé pour le
            métier de son propriétaire. Tous sont en ligne, vous pouvez les visiter.
          </p>
        }
      />
      <Portfolio />
      <SmartPlanningShowcase />
    </>
  );
}
