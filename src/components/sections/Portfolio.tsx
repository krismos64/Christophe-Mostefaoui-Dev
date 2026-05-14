import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Fragment, useRef } from "react";

interface Project {
  numeral?: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  tags: string[];
  link: string;
  isFounder?: boolean;
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const founderProject: Project = {
    title: "SmartPlanning.fr",
    description:
      "Mon projet entrepreneurial : un SaaS de gestion des plannings d'équipe, conçu, développé et lancé seul en 2026 (modèle freemium). De l'architecture au déploiement en passant par le support utilisateurs, je maîtrise tout le cycle de vie d'un produit.",
    image: "/assets/images/logosp.png",
    alt: "SmartPlanning — SaaS de gestion des plannings fondé par Christophe Mostefaoui",
    tags: ["SaaS Freemium", "Solo founder", "2026"],
    link: "https://smartplanning.fr/",
    isFounder: true,
  };

  const projects: Project[] = [
    {
      numeral: "I",
      title: "LivresStaka.fr",
      description:
        "Plateforme complète pour accompagner les auteurs dans la correction et l'édition de leurs manuscrits. Espace client sécurisé, paiement en ligne et messagerie intégrée pour échanger facilement avec l'équipe éditoriale.",
      image: "/assets/images/livrestaka.jpg",
      alt: "LivresStaka — Plateforme d'édition et correction de manuscrits",
      tags: ["Plateforme sur mesure", "Paiement en ligne", "Espace client"],
      link: "https://livrestaka.fr/",
    },
    {
      numeral: "II",
      title: "Cabinet Infirmier Graslin",
      description:
        "Site vitrine élégant pour un cabinet infirmier à Nantes. Présentation des services, prise de rendez-vous facilitée et informations pratiques pour les patients du quartier Graslin.",
      image: "/assets/images/graslin.jpg",
      alt: "Cabinet Infirmier Graslin Nantes — Site vitrine professionnel",
      tags: ["Site vitrine", "Santé", "Référencement local"],
      link: "https://cabinet-infirmier-graslin.fr/",
    },
    {
      numeral: "III",
      title: "Poulp Fiction",
      description:
        "Site web dynamique et immersif pour un centre de plongée à Saint-Cyprien. Animations fluides, présentation des formations et réservation simplifiée pour attirer de nouveaux plongeurs.",
      image: "/assets/images/poulpfiction.jpg",
      alt: "Poulp Fiction — Site web centre de plongée Saint-Cyprien",
      tags: ["Site vitrine", "Animations", "Tourisme"],
      link: "https://poulpfiction.netlify.app/",
    },
    {
      numeral: "IV",
      title: "methodea.fr",
      description:
        "Refonte complète d'un site vitrine pour une meilleure visibilité en ligne. Design moderne, responsive et formulaire de contact connecté pour ne manquer aucune opportunité commerciale.",
      image: "/assets/images/methodea.png",
      alt: "Methodea — Refonte site vitrine professionnel",
      tags: ["Refonte", "Design moderne", "Formulaire contact"],
      link: "https://methodea.netlify.app/",
    },
    {
      numeral: "V",
      title: "coachtfe.fr",
      description:
        "Site professionnel pour un coach sportif avec une présentation claire des prestations. Interface moderne qui inspire confiance et incite les visiteurs à prendre contact.",
      image: "/assets/images/coachtfe.png",
      alt: "CoachTFE — Site professionnel coach sportif",
      tags: ["Site vitrine", "Sport & Bien-être", "Conversion"],
      link: "https://coachtfe.fr/",
    },
    {
      numeral: "VI",
      title: "Garage Parrot",
      description:
        "Site complet pour un garage automobile avec système de rendez-vous en ligne et catalogue de véhicules d'occasion. Gestion simplifiée pour le gérant et ses employés via un espace administration dédié.",
      image: "/assets/images/garage.jpg",
      alt: "Garage Parrot — Site gestion garage automobile",
      tags: ["Site complet", "Réservation en ligne", "Espace admin"],
      link: "https://garageparrot.space/",
    },
  ];

  const allProjects = [founderProject, ...projects];

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
        className="relative w-full overflow-hidden bg-[#13110F] py-20 sm:py-28 md:py-32"
        aria-label="Portfolio des projets"
      >
        {/* Texture grain papier */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
          {/* Header édito */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 sm:mb-16 md:mb-20 max-w-4xl"
          >
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-[#F4EFE6]/60 mb-2">
              VII. — Portfolio
            </p>
            <h2 className="hero-display text-[#F4EFE6]">
              Sept projets, sept histoires.
            </h2>
            <p className="hero-body mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-[#F4EFE6]/80">
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
            className="mb-20 sm:mb-24 md:mb-28 border-l-2 border-[#F4D35E] pl-6 sm:pl-8 md:pl-10 py-2 sm:py-4"
          >
            <p className="hero-handwritten text-[16px] sm:text-[18px] text-[#F4D35E]/80 mb-2 uppercase tracking-[0.18em] text-[12px] sm:text-[13px] font-mono">
              <span className="hero-handwritten text-[16px] sm:text-[18px] normal-case tracking-normal text-[#F4D35E]/90">
                ✏ projet fondateur
              </span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mt-4">
              <a
                href={founderProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="md:col-span-5 lg:col-span-5 group block relative"
                aria-label={`Visiter ${founderProject.title} (nouvel onglet)`}
              >
                <img
                  src={founderProject.image}
                  alt={founderProject.alt}
                  loading="lazy"
                  className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  style={{ aspectRatio: "1482 / 1384" }}
                />
                <div
                  className="absolute inset-0 ring-1 ring-[#F4EFE6]/10 group-hover:ring-[#F4D35E]/40 transition-colors duration-300 pointer-events-none"
                  aria-hidden="true"
                />
              </a>
              <div className="md:col-span-7 lg:col-span-7">
                <h3
                  style={{
                    fontFamily: '"Fraunces", "Times New Roman", serif',
                    fontStyle: "italic",
                    fontWeight: 500,
                  }}
                  className="text-[32px] sm:text-[40px] md:text-[48px] leading-[1.05] text-[#F4EFE6] mb-5"
                >
                  {founderProject.title}
                </h3>
                <p className="hero-body text-[16px] sm:text-[17px] leading-[1.7] text-[#F4EFE6]/80 mb-6 max-w-xl">
                  {founderProject.description}
                </p>
                <p className="hero-body text-[14px] text-[#F4EFE6]/55 mb-6 flex flex-wrap items-center gap-x-2 gap-y-1">
                  {founderProject.tags.map((tag, i) => (
                    <Fragment key={tag}>
                      <span>{tag}</span>
                      {i < founderProject.tags.length - 1 && (
                        <span className="text-[#F4D35E]/60" aria-hidden="true">
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
                  className="hero-body group inline-flex items-center gap-2 text-[15px] text-[#F4EFE6]/90 hover:text-[#F4D35E] transition-colors"
                  aria-label={`Visiter ${founderProject.title} (nouvel onglet)`}
                >
                  <span className="border-b border-current/40 pb-0.5 group-hover:border-[#F4D35E]">
                    smartplanning.fr
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </motion.article>

          {/* Mosaïque 2 colonnes des 6 autres projets */}
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
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    className="absolute inset-0 ring-1 ring-[#F4EFE6]/15 group-hover:ring-[#F4D35E]/50 transition-colors duration-300 pointer-events-none"
                    aria-hidden="true"
                  />
                </a>

                <div className="flex items-baseline gap-3 mb-2.5">
                  <span
                    className="text-[12px] font-mono tabular-nums tracking-wider text-[#F4EFE6]/40 group-hover:text-[#F4D35E] transition-colors w-7 flex-shrink-0"
                    aria-hidden="true"
                  >
                    {p.numeral}.
                  </span>
                  <h3
                    style={{
                      fontFamily: '"Fraunces", "Times New Roman", serif',
                      fontStyle: "italic",
                      fontWeight: 500,
                    }}
                    className="flex-1 text-[24px] sm:text-[26px] leading-tight text-[#F4EFE6]"
                  >
                    {p.title}
                  </h3>
                </div>

                <p className="hero-body text-[14px] sm:text-[15px] leading-[1.65] text-[#F4EFE6]/55 mb-3 pl-10 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  {p.tags.map((tag, i) => (
                    <Fragment key={tag}>
                      <span>{tag}</span>
                      {i < p.tags.length - 1 && (
                        <span className="text-[#F4D35E]/60" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </Fragment>
                  ))}
                </p>

                <p className="hero-body text-[15px] sm:text-[16px] leading-[1.65] text-[#F4EFE6]/75 pl-10 mb-3">
                  {p.description}
                </p>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-body group/link inline-flex items-center gap-1.5 text-[13px] text-[#F4EFE6]/70 hover:text-[#F4D35E] transition-colors pl-10"
                  aria-label={`Visiter ${p.title} (nouvel onglet)`}
                >
                  <span className="border-b border-current/40 pb-0.5 group-hover/link:border-[#F4D35E]">
                    {new URL(p.link).hostname.replace("www.", "")}
                  </span>
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
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-[#F4EFE6]/60">
              ↳ un projet en tête ?
            </p>
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
              <button
                onClick={() => scrollTo("contact")}
                className="hero-cta-primary group"
                aria-label="Demander un devis gratuit"
                data-testid="portfolio_cta"
              >
                <span>Demander un devis</span>
                <span className="hero-cta-sub">gratuit · sous 24h</span>
                <ArrowUpRight
                  className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>

              <a
                href="https://krismos.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-body group inline-flex items-center gap-2 text-[14px] text-[#F4EFE6]/80 hover:text-[#F4D35E] transition-colors"
                aria-label="Voir mon portfolio technique sur krismos.fr (nouvel onglet)"
                data-testid="portfolio_cta_krismos"
              >
                <span className="border-b border-current/40 pb-0.5 group-hover:border-[#F4D35E]">
                  krismos.fr
                </span>
                <span className="opacity-70">ma version technique longue</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
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
            <p className="hero-handwritten text-[20px] sm:text-[24px] leading-snug text-[#F4D35E]">
              « Chaque projet, c'est rencontrer quelqu'un et raconter son
              métier. »
            </p>
            <p className="hero-handwritten mt-1 text-[15px] text-[#F4EFE6]/50">
              — C.M.
            </p>
          </motion.figcaption>
        </div>
      </section>
    </>
  );
}
