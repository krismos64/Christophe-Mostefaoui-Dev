import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { Fragment, useRef } from "react";
import { Helmet } from "react-helmet-async";

export default function ServiceArea() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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

  // Schema.org pour SEO local (vrai numéro de téléphone)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Christophe Mostefaoui — Développeur Web Freelance",
    description:
      "Développeur web freelance spécialisé en création de sites internet, applications web et intégration IA. Déplacement gratuit dans les Pyrénées-Atlantiques (64), disponible partout en France en distanciel.",
    url: "https://christophe-dev-freelance.fr",
    telephone: "+33679088845",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pau",
      addressRegion: "Pyrénées-Atlantiques",
      postalCode: "64000",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.2951,
      longitude: -0.3708,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Pyrénées-Atlantiques",
        sameAs: "https://fr.wikipedia.org/wiki/Pyr%C3%A9n%C3%A9es-Atlantiques",
      },
      {
        "@type": "Country",
        name: "France",
      },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 46.603354,
        longitude: 1.888334,
      },
      geoRadius: "1000 km",
    },
    priceRange: "€€",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  const renderCities = (cities: string[]) =>
    cities.map((city, i) => (
      <Fragment key={city}>
        <span className="text-[#1A1715] dark:text-[#F4EFE6]">{city}</span>
        {i < cities.length - 1 && (
          <span className="text-[#F4D35E]/60 mx-2" aria-hidden="true">
            ·
          </span>
        )}
      </Fragment>
    ));

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <section
        ref={containerRef}
        id="zone-intervention"
        className="relative w-full overflow-hidden bg-[#F4EFE6] dark:bg-[#13110F] py-20 sm:py-28 md:py-32"
        aria-label="Zone d'intervention géographique"
      >
        {/* Texture grain papier */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply dark:mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10 max-w-5xl">
          {/* Header édito */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 sm:mb-16 md:mb-20 max-w-4xl"
          >
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-[#1A1715]/60 dark:text-[#F4EFE6]/60 mb-2">
              VIII. — Zone d'intervention
            </p>
            <h2 className="hero-display text-[#1A1715] dark:text-[#F4EFE6]">
              Proche, ou à distance. Toujours présent.
            </h2>
            <p className="hero-body mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-[#1A1715]/80 dark:text-[#F4EFE6]/80">
              Je me déplace gratuitement pour un premier rendez-vous dans tout
              le département des Pyrénées-Atlantiques. Partout ailleurs en
              France, tout se passe en visio — un format que je maîtrise et qui
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
            className="mb-12 sm:mb-14 pt-8 border-t border-[#1A1715]/15 dark:border-[#F4EFE6]/15"
          >
            <p className="hero-handwritten text-[16px] sm:text-[18px] text-[#1A1715]/55 dark:text-[#F4EFE6]/55 mb-4">
              ↳ déplacement gratuit · Pyrénées-Atlantiques (64)
            </p>
            <p className="hero-body text-[16px] sm:text-[18px] leading-[1.85] text-[#1A1715]/80 dark:text-[#F4EFE6]/80">
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
            className="mb-14 sm:mb-16 pt-8 border-t border-[#1A1715]/15 dark:border-[#F4EFE6]/15"
          >
            <p className="hero-handwritten text-[16px] sm:text-[18px] text-[#1A1715]/55 dark:text-[#F4EFE6]/55 mb-4">
              ↳ en distanciel · France entière
            </p>
            <p className="hero-body text-[16px] sm:text-[18px] leading-[1.85] text-[#1A1715]/80 dark:text-[#F4EFE6]/80">
              {renderCities(nationalCities)}
              <span className="text-[#F4D35E]/60 mx-2" aria-hidden="true">
                ·
              </span>
              <span className="italic text-[#1A1715]/60 dark:text-[#F4EFE6]/60">
                et toutes les autres villes
              </span>
            </p>
          </motion.div>

          {/* Trait final */}
          <div
            className="h-px w-full bg-[#1A1715]/15 dark:bg-[#F4EFE6]/15"
            aria-hidden="true"
          />

          {/* CTA + téléphone direct */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 sm:mt-16 flex flex-col items-start gap-5"
          >
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-[#1A1715]/60 dark:text-[#F4EFE6]/60">
              ↳ envie de démarrer ?
            </p>
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
              <button
                onClick={() => scrollTo("contact")}
                className="hero-cta-primary group"
                aria-label="Discuter de votre projet"
                data-testid="service_area_cta"
              >
                <span>Discutons de votre projet</span>
                <span className="hero-cta-sub">premier échange gratuit</span>
                <ArrowUpRight
                  className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>

              <a
                href="tel:+33679088845"
                className="hero-body group inline-flex items-center gap-2 text-[15px] text-[#1A1715]/85 dark:text-[#F4EFE6]/85 hover:text-[#F4D35E] transition-colors"
                aria-label="Appeler Christophe au 06 79 08 88 45"
              >
                <Phone className="h-4 w-4" aria-hidden="true" strokeWidth={1.5} />
                <span className="border-b border-current/40 pb-0.5 group-hover:border-[#F4D35E] font-mono tabular-nums">
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
            <p className="hero-handwritten text-[20px] sm:text-[24px] leading-snug text-[#1A1715]/90 dark:text-[#F4D35E]">
              « Une heure de route pour la première rencontre, ça vaut tous les
              mails du monde. »
            </p>
            <p className="hero-handwritten mt-1 text-[15px] text-[#1A1715]/50 dark:text-[#F4EFE6]/50">
              — C.M.
            </p>
          </motion.figcaption>
        </div>
      </section>
    </>
  );
}
