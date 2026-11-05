import { motion, useInView } from "framer-motion";
import LienContact from "../common/LienContact";
import { ArrowUpRight, Phone } from "lucide-react";
import { Fragment, useRef } from "react";

export default function ServiceArea() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const localCities = [
    "Pau",
    "Bayonne",
    "Biarritz",
    "Anglet",
    "Orthez",
    "Oloron-Sainte-Marie",
    "Mourenx",
    "Lescar",
    "Billère",
    "Jurançon",
    "Lons",
    "Artix",
    "Hasparren",
    "Saint-Jean-de-Luz",
    "Hendaye",
  ];

  const nationalCities = [
    "Paris",
    "Lyon",
    "Marseille",
    "Toulouse",
    "Bordeaux",
    "Nantes",
    "Lille",
    "Strasbourg",
    "Nice",
    "Montpellier",
  ];

  const renderCities = (cities: string[]) =>
    cities.map((city, i) => (
      <Fragment key={city}>
        <span className="text-foret">{city}</span>
        {i < cities.length - 1 && (
          <span className="text-soleil/60 mx-2" aria-hidden="true">
            ·
          </span>
        )}
      </Fragment>
    ));

  return (
    <>
      <section
        ref={containerRef}
        id="zone-intervention"
        className="relative w-full overflow-hidden bg-creme py-20 sm:py-28 md:py-32"
        aria-label="Zone d'intervention géographique"
      >

        <div className="mx-auto px-5 sm:px-8 relative z-10 max-w-5xl">
          {/* Header édito */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 sm:mb-16 md:mb-20 max-w-4xl"
          >
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-foret/75 mb-2">
              Zone d'intervention
            </p>
            <h2 className="hero-display text-foret">
              Proche, ou à distance. Toujours présent.
            </h2>
            <p className="hero-body mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-foret/80">
              Je me déplace gratuitement pour un premier rendez-vous dans tout
              le département des Pyrénées-Atlantiques. Partout ailleurs en
              France, tout se passe en visio, un format que je maîtrise et qui
              n'a aucun impact sur la qualité du suivi.
            </p>
          </motion.div>

          {/* Bloc 1 : Déplacement gratuit dans le 64 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.2,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-12 sm:mb-14 pt-8 border-t border-foret/15"
          >
            <p className="hero-handwritten text-[16px] sm:text-[18px] text-foret/70 mb-4">
              ↳ déplacement gratuit · Pyrénées-Atlantiques (64)
            </p>
            <p className="hero-body text-[16px] sm:text-[18px] leading-[1.85] text-foret/80">
              {renderCities(localCities)}
            </p>
          </motion.div>

          {/* Bloc 2 : Distanciel France entière */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.3,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-14 sm:mb-16 pt-8 border-t border-foret/15"
          >
            <p className="hero-handwritten text-[16px] sm:text-[18px] text-foret/70 mb-4">
              ↳ en distanciel · France entière
            </p>
            <p className="hero-body text-[16px] sm:text-[18px] leading-[1.85] text-foret/80">
              {renderCities(nationalCities)}
              <span className="text-soleil/60 mx-2" aria-hidden="true">
                ·
              </span>
              <span className="italic text-foret/75">
                et toutes les autres villes
              </span>
            </p>
          </motion.div>

          {/* Trait final */}
          <div
            className="h-px w-full bg-foret/15"
            aria-hidden="true"
          />

          {/* CTA + téléphone direct */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 sm:mt-16 flex flex-col items-start gap-5"
          >
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-foret/75">
              ↳ envie de démarrer ?
            </p>
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
              <LienContact
                className="hero-cta-primary group"
                data-testid="service_area_cta"
              >
                <span>Discutons de votre projet</span>
                <span className="hero-cta-sub">premier échange gratuit</span>
                <ArrowUpRight
                  className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </LienContact>

              <a
                href="tel:+33679088845"
                className="hero-body group inline-flex items-center gap-2 text-[15px] text-foret/85 hover:text-soleil transition-colors"
              >
                <Phone
                  className="h-4 w-4"
                  aria-hidden="true"
                  strokeWidth={1.5}
                />
                <span className="border-b border-current/40 pb-0.5 group-hover:border-soleil font-mono tabular-nums">
                  06 79 08 88 45
                </span>
              </a>
            </div>
          </motion.div>

          {/* Citation manuscrite signée */}
          <motion.figcaption
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 sm:mt-20 max-w-xl"
          >
            <p className="hero-handwritten text-[20px] sm:text-[24px] leading-snug text-foret/90">
              « Une heure de route pour la première rencontre, ça vaut tous les
              mails du monde. »
            </p>
            <p className="hero-handwritten mt-1 text-[15px] text-foret/70">
              — C.M.
            </p>
          </motion.figcaption>
        </div>
      </section>
    </>
  );
}
