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
        titre="Réalisations : sites et applications | Christophe Mostefaoui"
        description="Boutique de bijoux à Artix, cabinet infirmier, plateforme d'édition, logiciel SmartPlanning : les sites d'un développeur web à Pau, tous en ligne."
        schemas={[schemaSmartPlanning()]}
      />
      <PageHero
        nomCourt="Réalisations"
        surtitre="Réalisations"
        suite="foret"
        titre="Des sites pour des métiers très différents."
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
