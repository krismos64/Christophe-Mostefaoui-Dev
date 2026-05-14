import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

export default function SmartPlanningShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const pillars = [
    {
      numeral: "I",
      title: "Conception produit",
      description:
        "De l'idée au cahier des charges, en passant par les wireframes et le parcours utilisateur.",
    },
    {
      numeral: "II",
      title: "Architecture & développement",
      description:
        "Stack moderne, base de données scalable, sécurité, performances : pensé pour durer.",
    },
    {
      numeral: "III",
      title: "Intégration IA en production",
      description:
        "Assistant intelligent intégré au cœur du produit, pas un gadget — vraiment utilisé par les clients.",
    },
    {
      numeral: "IV",
      title: "Déploiement & exploitation",
      description:
        "Hébergement, monitoring, sauvegardes, mises à jour : je gère le run au quotidien.",
    },
    {
      numeral: "V",
      title: "Support client direct",
      description:
        "Je réponds moi-même aux utilisateurs : j'apprends ce qui marche et ce qui doit évoluer.",
    },
    {
      numeral: "VI",
      title: "Modèle freemium lancé",
      description:
        "Stratégie commerciale, pricing, onboarding : un vrai produit en service, pas une démo.",
    },
  ];

  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      ref={containerRef}
      id="smartplanning"
      className="relative w-full overflow-hidden bg-[#13110F] py-20 sm:py-28 md:py-32"
      aria-label="SmartPlanning, mon projet entrepreneurial"
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
            III. — Mon projet entrepreneurial
          </p>
          <h2 className="hero-display text-[#F4EFE6]">
            J'ai fondé un SaaS.
          </h2>
          <p className="hero-body mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-[#F4EFE6]/80">
            Un SaaS de gestion de plannings d'équipe avec assistant IA intégré.
            Conçu, développé et lancé seul en 2026, modèle freemium.{" "}
            <strong className="font-medium text-[#F4EFE6]">
              La preuve que je sais piloter un produit, pas juste écrire du
              code.
            </strong>
          </p>
        </motion.div>

        {/* Image planche + storytelling */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 lg:gap-20 items-start mb-20 sm:mb-24 md:mb-28">
          {/* Image SmartPlanning */}
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 lg:col-span-6"
          >
            <a
              href="https://smartplanning.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative group"
              aria-label="Visiter SmartPlanning.fr (nouvel onglet)"
              data-testid="smartplanning_showcase_image"
            >
              <img
                src="/assets/images/business-smartplanning.webp"
                alt="Aperçu de SmartPlanning, SaaS de gestion de plannings fondé par Christophe Mostefaoui"
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.01]"
              />
              <div
                className="absolute inset-0 ring-1 ring-[#F4EFE6]/15 group-hover:ring-[#F4D35E]/40 transition-colors duration-300 pointer-events-none"
                aria-hidden="true"
              />
            </a>
            <figcaption className="hero-handwritten mt-4 text-[16px] sm:text-[18px] text-[#F4EFE6]/65 flex items-center gap-2">
              <span>↗ smartplanning.fr</span>
              <span className="text-[#F4EFE6]/40">— en service depuis 2026</span>
            </figcaption>
          </motion.figure>

          {/* Storytelling */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="md:col-span-6 lg:col-span-6"
          >
            <motion.h3
              variants={item}
              style={{
                fontFamily: '"Fraunces", "Times New Roman", serif',
                fontStyle: "italic",
                fontWeight: 500,
              }}
              className="text-[28px] sm:text-[32px] md:text-[36px] leading-tight text-[#F4EFE6] mb-6"
            >
              Pourquoi c'est important pour vous ?
            </motion.h3>

            <motion.div
              variants={item}
              className="hero-body space-y-5 text-[16px] sm:text-[17px] leading-[1.7] text-[#F4EFE6]/80 max-w-xl"
            >
              <p>
                Confier son projet à un développeur freelance, c'est faire
                confiance à quelqu'un sur sa capacité à{" "}
                <strong className="font-medium text-[#F4EFE6]">
                  livrer un produit qui marche, pas juste du code qui compile
                </strong>
                .
              </p>
              <p>
                En lançant SmartPlanning, j'ai dû gérer chaque étape qu'un
                client peut me confier : pensée produit, choix techniques,
                sécurité, performances, intégration IA, déploiement,
                facturation, support utilisateurs, évolutions.
              </p>
              <p className="font-medium text-[#F4EFE6]">
                Quand vous me confiez votre site ou votre application, vous
                bénéficiez de cette expérience entrepreneuriale réelle, pas
                seulement de compétences techniques sur papier.
              </p>
            </motion.div>

            <motion.a
              variants={item}
              href="https://smartplanning.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-primary group mt-8"
              aria-label="Découvrir SmartPlanning.fr (nouvel onglet)"
              data-testid="smartplanning_showcase_cta"
            >
              <span>Découvrir SmartPlanning</span>
              <span className="hero-cta-sub">SaaS en production</span>
              <ArrowUpRight
                className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </motion.a>
          </motion.div>
        </div>

        {/* Sous-titre piliers */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-12"
        >
          <p className="hero-handwritten text-[17px] sm:text-[19px] text-[#F4EFE6]/55 mb-2">
            ce que SmartPlanning prouve concrètement
          </p>
          <div
            className="h-px w-24 bg-[#F4EFE6]/30"
            aria-hidden="true"
          />
        </motion.div>

        {/* 6 piliers en grille 2×3 sur desktop, 1 col mobile */}
        <motion.ul
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-14 gap-y-10"
        >
          {pillars.map((pillar) => (
            <motion.li key={pillar.numeral} variants={item} className="group">
              <div className="flex items-baseline gap-3 mb-2">
                <span
                  className="text-[12px] font-mono tabular-nums tracking-wider text-[#F4EFE6]/40 group-hover:text-[#F4D35E] transition-colors w-8 flex-shrink-0"
                  aria-hidden="true"
                >
                  {pillar.numeral}.
                </span>
                <h4
                  style={{
                    fontFamily: '"Fraunces", "Times New Roman", serif',
                    fontStyle: "italic",
                    fontWeight: 500,
                  }}
                  className="text-[20px] sm:text-[22px] leading-tight text-[#F4EFE6]"
                >
                  {pillar.title}
                </h4>
              </div>
              <p className="hero-body text-[14px] sm:text-[15px] leading-[1.65] text-[#F4EFE6]/70 pl-11">
                {pillar.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        {/* Citation manuscrite signée */}
        <motion.figcaption
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-20 max-w-xl"
        >
          <p className="hero-handwritten text-[20px] sm:text-[24px] leading-snug text-[#F4D35E]">
            « Lancer SmartPlanning, c'est ce qui a fait de moi un meilleur
            freelance. »
          </p>
          <p className="hero-handwritten mt-1 text-[15px] text-[#F4EFE6]/50">
            — C.M.
          </p>
        </motion.figcaption>
      </div>
    </section>
  );
}
