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
      title: "Un site vitrine",
      description:
        "Votre entreprise présentée en quelques pages claires : ce que vous faites, où vous trouver, comment vous joindre. Visible sur Google et dans ChatGPT.",
    },
    {
      numeral: "II",
      icon: Layers,
      title: "Un site plus complet",
      description:
        "Plusieurs pages, un blog pour vos actualités et un formulaire de contact. Vous changez vos textes vous-même, sans appeler personne.",
    },
    {
      numeral: "III",
      icon: RefreshCw,
      title: "La refonte de votre site",
      description:
        "Votre site a vieilli ou rame sur téléphone ? Je le remets à neuf en gardant ce qui marche déjà sur Google.",
    },
    {
      numeral: "IV",
      icon: Bot,
      title: "Un assistant pour vos clients",
      description:
        "Un chatbot (assistant IA) répond jour et nuit aux questions courantes de vos clients. Celui en bas à droite de cette page en est un exemple.",
    },
    {
      numeral: "V",
      icon: Search,
      title: "Être trouvé sur Google (référencement)",
      description:
        "Quand on cherche votre métier près de chez vous, votre entreprise doit apparaître. Sur Google, et aussi dans ChatGPT ou Perplexity.",
    },
    {
      numeral: "VI",
      icon: Video,
      title: "Vidéo et drone",
      description:
        "Des vidéos de votre activité et des vues aériennes de vos locaux ou chantiers, par un télépilote certifié DGAC (Aviation civile).",
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
      className="relative w-full overflow-hidden bg-creme py-20 sm:py-28 md:py-32"
      aria-label="Mes services de développement web"
    >

      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {/* Header édito */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16 md:mb-20 max-w-4xl"
        >
          <p className="hero-handwritten text-[18px] sm:text-[20px] text-foret/75 mb-2">
            Services
          </p>
          <h2 className="hero-display text-foret">
            Ce que je peux faire pour votre entreprise.
          </h2>
          <p className="hero-body mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-foret/80">
            Vous me dites ce dont vous avez besoin, je vous dis ce qui est utile
            et ce qui ne l'est pas. Clients partout en France,{" "}
            <strong className="font-medium text-foret">
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
                className="group relative pt-7 pb-9 sm:pt-8 sm:pb-10 border-t border-foret/15 transition-colors duration-300 hover:border-soleil/70"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <span
                    className="text-[12px] font-mono tabular-nums tracking-wider text-foret/70 group-hover:text-foret-moyen transition-colors w-8 flex-shrink-0 pt-1.5"
                    aria-hidden="true"
                  >
                    {s.numeral}.
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <h3
                        className="text-[22px] sm:text-[26px] leading-tight text-foret"
                      >
                        {s.title}
                      </h3>
                      <Icon
                        className="h-5 w-5 mt-1.5 flex-shrink-0 text-foret/70 group-hover:text-foret-moyen transition-colors"
                        aria-hidden="true"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="hero-body text-[15px] sm:text-[16px] leading-[1.65] text-foret/70">
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
          className="h-px w-full bg-foret/15 mt-2"
          aria-hidden="true"
        />

        {/* CTA + transition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 flex flex-col items-start gap-5"
        >
          <p className="hero-handwritten text-[18px] sm:text-[20px] text-foret/75">
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
          <p className="hero-handwritten text-[20px] sm:text-[24px] leading-snug text-foret/90">
            « Six services, une seule promesse : un site qui vous ressemble. »
          </p>
          <p className="hero-handwritten mt-1 text-[15px] text-foret/70">
            — C.M.
          </p>
        </motion.figcaption>
      </div>
    </section>
  );
}
