import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Globe,
  Layers,
  RefreshCw,
  Search,
  Video,
} from "lucide-react";
import { useRef } from "react";

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const services = [
    {
      numeral: "I",
      icon: Globe,
      title: "Site Vitrine Moderne",
      description:
        "Une présence en ligne professionnelle, visible sur Google et référencée par les assistants IA comme ChatGPT ou Claude.",
    },
    {
      numeral: "II",
      icon: Layers,
      title: "Site Multi-pages",
      description:
        "Un site complet avec blog, formulaire de contact et CMS pour gérer votre actualité en autonomie.",
    },
    {
      numeral: "III",
      icon: RefreshCw,
      title: "Refonte de Site",
      description:
        "Modernisation d'un site existant pour une image professionnelle et de meilleures performances.",
    },
    {
      numeral: "IV",
      icon: Bot,
      title: "Chatbot intelligent",
      description:
        "Un assistant IA intégré à votre site, capable de répondre à vos clients 24h/24, comme celui visible en bas à droite de ce site.",
    },
    {
      numeral: "V",
      icon: Search,
      title: "Référencement Google & IA",
      description:
        "Soyez trouvé sur Google ET recommandé par les intelligences artificielles comme ChatGPT, Claude ou Perplexity.",
    },
    {
      numeral: "VI",
      icon: Video,
      title: "Vidéo & Drone (DGAC)",
      description:
        "Vidéos professionnelles et prises de vue aériennes certifiées par la Direction Générale de l'Aviation Civile.",
    },
  ];

  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
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
    <section
      ref={containerRef}
      id="services"
      className="relative w-full overflow-hidden bg-[#F4EFE6] dark:bg-[#13110F] py-20 sm:py-28 md:py-32"
      aria-label="Mes services de développement web"
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

      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {/* Header édito */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16 md:mb-20 max-w-4xl"
        >
          <p className="hero-handwritten text-[18px] sm:text-[20px] text-[#1A1715]/60 dark:text-[#F4EFE6]/60 mb-2">
            IV. — Services
          </p>
          <h2 className="hero-display text-[#1A1715] dark:text-[#F4EFE6]">
            Six manières de donner vie à votre projet.
          </h2>
          <p className="hero-body mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-[#1A1715]/80 dark:text-[#F4EFE6]/80">
            Des sites web optimisés pour Google et les assistants IA. Clients
            partout en France,{" "}
            <strong className="font-medium text-[#1A1715] dark:text-[#F4EFE6]">
              déplacement offert dans le 64
            </strong>
            .
          </p>
        </motion.div>

        {/* Grille 2 colonnes : 6 services en 3 lignes × 2 */}
        <motion.ul
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16"
        >
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.li
                key={s.numeral}
                variants={item}
                className="group relative pt-7 pb-9 sm:pt-8 sm:pb-10 border-t border-[#1A1715]/15 dark:border-[#F4EFE6]/15 transition-colors duration-300 hover:border-[#F4D35E]/70"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <span
                    className="text-[12px] font-mono tabular-nums tracking-wider text-[#1A1715]/40 dark:text-[#F4EFE6]/40 group-hover:text-[#F4D35E] transition-colors w-8 flex-shrink-0 pt-1.5"
                    aria-hidden="true"
                  >
                    {s.numeral}.
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <h3
                        style={{
                          fontFamily: '"Fraunces", "Times New Roman", serif',
                          fontStyle: "italic",
                          fontWeight: 500,
                        }}
                        className="text-[22px] sm:text-[26px] leading-tight text-[#1A1715] dark:text-[#F4EFE6]"
                      >
                        {s.title}
                      </h3>
                      <Icon
                        className="h-5 w-5 mt-1.5 flex-shrink-0 text-[#1A1715]/40 dark:text-[#F4EFE6]/40 group-hover:text-[#F4D35E] transition-colors"
                        aria-hidden="true"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="hero-body text-[15px] sm:text-[16px] leading-[1.65] text-[#1A1715]/70 dark:text-[#F4EFE6]/70">
                      {s.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Trait fin de section */}
        <div
          className="h-px w-full bg-[#1A1715]/15 dark:bg-[#F4EFE6]/15 mt-2"
          aria-hidden="true"
        />

        {/* CTA + transition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 flex flex-col items-start gap-5"
        >
          <p className="hero-handwritten text-[18px] sm:text-[20px] text-[#1A1715]/60 dark:text-[#F4EFE6]/60">
            un projet en tête ?
          </p>
          <button
            onClick={() => scrollTo("contact")}
            className="hero-cta-primary group"
            aria-label="Demander un devis gratuit"
            data-testid="services_cta"
          >
            <span>Demander un devis</span>
            <span className="hero-cta-sub">gratuit · sous 24h</span>
            <ArrowUpRight
              className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </motion.div>

        {/* Citation manuscrite signée */}
        <motion.figcaption
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-20 max-w-xl"
        >
          <p className="hero-handwritten text-[20px] sm:text-[24px] leading-snug text-[#1A1715]/90 dark:text-[#F4D35E]">
            « Six services, une seule promesse : un site qui vous ressemble. »
          </p>
          <p className="hero-handwritten mt-1 text-[15px] text-[#1A1715]/50 dark:text-[#F4EFE6]/50">
            — C.M.
          </p>
        </motion.figcaption>
      </div>
    </section>
  );
}
