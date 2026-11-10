import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, Quote, Star } from "lucide-react";
import LienContact from "../components/common/LienContact";
import PageHero from "../components/layout/PageHero";
import AvisScene from "../components/sections/AvisScene";
import GoogleReviews from "../components/sections/GoogleReviews";
import PageSeo from "../components/seo/PageSeo";
import { FICHE_GOOGLE_URL } from "../data/avisGoogle";

const bouton =
  "inline-flex min-h-[52px] items-center gap-2.5 rounded-full px-6 text-[16px] font-bold focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-soleil";

const engagements = [
  {
    icone: BadgeCheck,
    titre: "Uniquement ma fiche Google",
    texte:
      "Je publie ici les avis que mes clients déposent eux-mêmes sur ma fiche Google. Aucun témoignage écrit à leur place, aucun avis récupéré par e-mail.",
  },
  {
    icone: Quote,
    titre: "Recopiés mot pour mot",
    texte:
      "Pas de coupe, pas de correction, pas de sélection : la note et le texte sont ceux de la fiche. Si un écart apparaît, c'est la fiche qui fait foi.",
  },
];

/**
 * Page des avis clients (créée le 10/11/2026). Les avis viennent de
 * src/data/avisGoogle.ts ; le balisage Review/aggregateRating reste dans
 * index.html (#business), PageSeo n'ajoute que WebPage + BreadcrumbList.
 */
export default function Avis() {
  return (
    <>
      <PageSeo
        chemin="/avis"
        nomCourt="Avis clients"
        titre="Avis clients : Christophe Mostefaoui, développeur web à Pau"
        description="Les avis Google de mes clients, recopiés mot pour mot depuis ma fiche vérifiée. Création de sites internet pour les TPE et PME de Pau et du Béarn."
      />
      <PageHero
        nomCourt="Avis clients"
        surtitre="Avis clients"
        titre={
          <>
            Ce que mes clients
            <br />
            en disent.
          </>
        }
        intro={
          <p>
            Tous les avis de cette page viennent de ma fiche Google. Je les recopie sans les
            modifier, et vous pouvez les vérifier à la source.
          </p>
        }
      >
        <a
          href={FICHE_GOOGLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${bouton} border border-creme/40 text-creme hover:bg-creme hover:text-foret`}
        >
          <Star className="h-5 w-5" aria-hidden="true" />
          Voir la fiche Google
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only"> (nouvel onglet)</span>
        </a>
        <AvisScene />
      </PageHero>

      <GoogleReviews />

      <section aria-labelledby="provenance-titre" className="bg-creme pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="h-px w-full bg-foret/15" aria-hidden="true" />
          <h2
            id="provenance-titre"
            className="mt-14 text-[26px] font-extrabold leading-tight tracking-[-0.02em] text-foret sm:text-[30px]"
          >
            D'où viennent ces avis
          </h2>
          <dl className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            {engagements.map((e, i) => {
              const Icone = e.icone;
              return (
                <motion.div
                  key={e.titre}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pt-6"
                >
                  {/* Trait orange qui se trace de gauche à droite */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[2px] origin-left bg-soleil"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <dt className="flex items-center gap-3 text-[19px] font-bold text-foret">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foret text-soleil" aria-hidden="true">
                      <Icone className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    {e.titre}
                  </dt>
                  <dd className="hero-body mt-3 text-[16px] leading-relaxed text-foret/80">{e.texte}</dd>
                </motion.div>
              );
            })}
          </dl>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative isolate mt-16 flex flex-col items-start gap-6 overflow-hidden rounded-[28px] bg-foret p-8 text-creme sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-10"
          >
            <div
              aria-hidden="true"
              className="apropos-soleil pointer-events-none absolute -right-12 -top-28 -z-10 h-56 w-56 rounded-full bg-foret-moyen"
            />
            <div>
              <h2 className="text-[24px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[28px]">
                Un projet de site internet ?
              </h2>
              <p className="mt-2 text-[16px] text-foret-brume">
                Devis gratuit et sans engagement, réponse sous 24h en jours ouvrés.
              </p>
            </div>
            <LienContact className={`${bouton} shrink-0 bg-soleil text-foret hover:bg-soleil-clair`}>
              Demander un devis
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </LienContact>
          </motion.div>
        </div>
      </section>
    </>
  );
}
