import { motion, useInView } from "framer-motion";
import LienContact from "../common/LienContact";
import { ArrowUpRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Fragment, useRef } from "react";
import OptimizedPicture from "../common/OptimizedPicture";
import { allProjects, founderProject, projects } from "../../data/realisations";


export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const generatePortfolioStructuredData = () =>
    allProjects.map((project) => ({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      image: `https://christophe-dev-freelance.fr${project.image}`,
      url: project.link,
      creator: {
        "@type": "Person",
        name: "Christophe Mostefaoui",
        url: "https://christophe-dev-freelance.fr",
      },
      keywords: project.tags.join(", "),
      dateCreated: "2024",
    }));

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <>
      <Helmet>
        {generatePortfolioStructuredData().map((data, index) => (
          <script key={`portfolio-product-${index}`} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))}
      </Helmet>

      <section
        ref={containerRef}
        id="portfolio"
        className="relative w-full overflow-hidden bg-foret py-20 sm:py-28 md:py-32"
        aria-label="Portfolio des projets"
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
          {/* Header édito */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 sm:mb-16 md:mb-20 max-w-4xl"
          >
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-creme/60 mb-2">
              Portfolio
            </p>
            <h2 className="hero-display text-creme">
              Onze projets, onze histoires.
            </h2>
            <p className="hero-body mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-creme/80">
              Des sites pour artisans locaux aux SaaS en production : voici
              les projets qui ont marqué mon parcours freelance.
            </p>
          </motion.div>

          {/* Bloc projet fondateur — pleine largeur */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-20 sm:mb-24 md:mb-28 border-l-2 border-soleil pl-6 sm:pl-8 md:pl-10 py-2 sm:py-4"
          >
            <p className="hero-handwritten text-[16px] sm:text-[18px] text-soleil/80 mb-2 uppercase tracking-[0.18em] text-[12px] sm:text-[13px] font-mono">
              <span className="hero-handwritten text-[16px] sm:text-[18px] normal-case tracking-normal text-soleil/90">
                ✏ projet fondateur
              </span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mt-4">
              <a
                href={founderProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="md:col-span-5 lg:col-span-5 group block relative max-w-[280px] mx-auto md:max-w-none md:mx-0"
                aria-label={`Visiter ${founderProject.title} (nouvel onglet)`}
              >
                <OptimizedPicture
                  src={founderProject.image}
                  alt={founderProject.alt}
                  widths={[320, 640, 960]}
                  sizes="(max-width: 768px) 80vw, 35vw"
                  loading="lazy"
                  className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  style={{ aspectRatio: "1482 / 1384" }}
                />
                <div
                  className="absolute inset-0 ring-1 ring-creme/10 group-hover:ring-soleil/40 transition-colors duration-300 pointer-events-none"
                  aria-hidden="true"
                />
              </a>
              <div className="md:col-span-7 lg:col-span-7">
                <h3
                  className="text-[32px] sm:text-[40px] md:text-[48px] leading-[1.05] text-creme mb-5"
                >
                  {founderProject.title}
                </h3>
                <p className="hero-body text-[16px] sm:text-[17px] leading-[1.7] text-creme/80 mb-6 max-w-xl">
                  {founderProject.description}
                </p>
                <p className="hero-body text-[14px] text-creme/70 mb-6 flex flex-wrap items-center gap-x-2 gap-y-1">
                  {founderProject.tags.map((tag, i) => (
                    <Fragment key={tag}>
                      <span>{tag}</span>
                      {i < founderProject.tags.length - 1 && (
                        <span className="text-soleil/60" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </Fragment>
                  ))}
                </p>
                <a
                  href={founderProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-body group inline-flex items-center gap-2 text-[15px] text-creme/90 hover:text-soleil transition-colors"
                >
                  <span className="border-b border-current/40 pb-0.5 group-hover:border-soleil">
                    smartplanning.fr
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
<span className="sr-only"> (nouvel onglet)</span>
                </a>
              </div>
            </div>
          </motion.article>

          {/* Mosaïque 2 colonnes des 10 autres projets */}
          <motion.ul
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-14 sm:gap-y-16"
          >
            {projects.map((p) => (
              <motion.li
                key={p.numeral}
                variants={item}
                className="group"
              >
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-video overflow-hidden mb-5"
                  aria-label={`Visiter ${p.title} (nouvel onglet)`}
                >
                  <OptimizedPicture
                    src={p.image}
                    alt={p.alt}
                    widths={[400, 800]}
                    sizes="(max-width: 768px) 100vw, 45vw"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    className="absolute inset-0 ring-1 ring-creme/15 group-hover:ring-soleil/50 transition-colors duration-300 pointer-events-none"
                    aria-hidden="true"
                  />
                </a>

                <div className="flex items-baseline mb-2.5">
                  <span
                    className="text-[12px] font-mono tabular-nums tracking-wide text-creme/70 group-hover:text-soleil transition-colors w-12 flex-shrink-0"
                    aria-hidden="true"
                  >
                    {p.numeral}.
                  </span>
                  <h3
                    className="flex-1 text-[24px] sm:text-[26px] leading-tight text-creme"
                  >
                    {p.title}
                  </h3>
                </div>

                <p className="hero-body text-[14px] sm:text-[15px] leading-[1.65] text-creme/70 mb-3 pl-12 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  {p.tags.map((tag, i) => (
                    <Fragment key={tag}>
                      <span>{tag}</span>
                      {i < p.tags.length - 1 && (
                        <span className="text-soleil/60" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </Fragment>
                  ))}
                </p>

                <p className="hero-body text-[15px] sm:text-[16px] leading-[1.65] text-creme/75 pl-12 mb-3">
                  {p.description}
                </p>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-body group/link inline-flex items-center gap-1.5 text-[13px] text-creme/70 hover:text-soleil transition-colors pl-12"
                >
                  <span className="border-b border-current/40 pb-0.5 group-hover/link:border-soleil">
                    {new URL(p.link).hostname.replace("www.", "")}
                  </span>
                  <span className="sr-only"> : site de {p.title} (nouvel onglet)</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 opacity-70 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA + lien krismos.fr en ligne (option B sobre) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 sm:mt-20 flex flex-col items-start gap-5"
          >
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-creme/60">
              ↳ un projet en tête ?
            </p>
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
              <LienContact
                className="hero-cta-primary group"
                data-testid="portfolio_cta"
              >
                <span>Demander un devis</span>
                <span className="hero-cta-sub">gratuit · sous 24h</span>
                <ArrowUpRight
                  className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </LienContact>

              <a
                href="https://krismos.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-body group inline-flex items-center gap-2 text-[14px] text-creme/80 hover:text-soleil transition-colors"
                data-testid="portfolio_cta_krismos"
              >
                <span className="border-b border-current/40 pb-0.5 group-hover:border-soleil">
                  krismos.fr
                </span>
                <span className="opacity-70">ma version technique longue</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
<span className="sr-only"> (nouvel onglet)</span>
              </a>
            </div>
          </motion.div>

          {/* Citation manuscrite signée */}
          <motion.figcaption
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 sm:mt-20 max-w-2xl"
          >
            <p className="hero-handwritten text-[20px] sm:text-[24px] leading-snug text-soleil">
              « Chaque projet, c'est rencontrer quelqu'un et raconter son
              métier. »
            </p>
            <p className="hero-handwritten mt-1 text-[15px] text-creme/70">
              — C.M.
            </p>
          </motion.figcaption>
        </div>
      </section>
    </>
  );
}
