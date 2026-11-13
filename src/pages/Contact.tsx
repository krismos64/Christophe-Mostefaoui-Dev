import { Mail, Phone } from "lucide-react";
import PageHero from "../components/layout/PageHero";
import ServiceArea from "../components/sections/ServiceArea";
import GMBOptimizedContact from "../components/seo/GMBOptimizedContact";
import PageSeo from "../components/seo/PageSeo";
import { schemaVideoPresentation } from "../utils/structured-data-final";

const bouton =
  "inline-flex min-h-[52px] items-center gap-2.5 rounded-full px-6 text-[16px] font-bold focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-soleil";

export default function Contact() {
  return (
    <>
      <PageSeo
        chemin="/contact"
        nomCourt="Contact"
        titre="Contact : devis gratuit sous 24h | Christophe Mostefaoui"
        schemas={[schemaVideoPresentation()]}
        description="Parlez-moi de votre projet de site internet : réponse sous 24h, déplacement gratuit dans les Pyrénées-Atlantiques. Téléphone : 06 79 08 88 45."
      />
      <PageHero
        nomCourt="Contact"
        surtitre="Contact"
        titre="Parlons de votre projet."
        intro={
          <p>
            Un appel, un e-mail ou le formulaire juste en dessous : je réponds personnellement sous 24h en
            jours ouvrés. Le premier échange est gratuit et sans engagement.
          </p>
        }
      >
        <div className="flex flex-wrap gap-4">
          <a href="tel:+33679088845" className={`${bouton} bg-soleil text-foret hover:bg-soleil-clair`}>
            <Phone className="h-5 w-5" aria-hidden="true" />
            06 79 08 88 45
          </a>
          <a
            href="mailto:christophe.mostefaoui.dev@gmail.com"
            className={`${bouton} border border-creme/40 text-creme hover:bg-creme hover:text-foret`}
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            Écrire un e-mail
          </a>
        </div>
      </PageHero>
      <GMBOptimizedContact />
      <ServiceArea />
    </>
  );
}
