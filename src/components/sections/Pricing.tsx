import { motion, useInView } from "framer-motion";
import Lottie from "lottie-react";
import {
  ArrowUpRight,
  CreditCard,
  HeartHandshake,
  Lightbulb,
  MapPin,
  Phone,
  RefreshCw,
  Target,
} from "lucide-react";
import { useRef } from "react";
import cutVideoAnimation from "../../animations/Cut Video.json";
import droneCameraAnimation from "../../animations/Drone Camera.json";

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const valueProps = [
    {
      numeral: "I",
      icon: Target,
      title: "Analyse de vos besoins",
      description:
        "Échange en visio ou téléphone pour comprendre votre projet, vos objectifs et votre cible.",
    },
    {
      numeral: "II",
      icon: Lightbulb,
      title: "Proposition sur mesure",
      description:
        "Devis détaillé avec périmètre clair, technologies adaptées et planning réaliste.",
    },
    {
      numeral: "III",
      icon: HeartHandshake,
      title: "Accompagnement complet",
      description:
        "Suivi de A à Z, formation à l'utilisation, maintenance et support après livraison.",
    },
  ];

  const reassuranceBadges = [
    { icon: CreditCard, text: "Paiement en 3× sans frais" },
    { icon: RefreshCw, text: "Modifications incluses" },
    { icon: Phone, text: "Accompagnement personnalisé" },
    { icon: MapPin, text: "Partout en France" },
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
      id="tarifs"
      className="relative w-full overflow-hidden bg-[#13110F] py-20 sm:py-28 md:py-32"
      aria-label="Mon approche tarifaire et ma méthode"
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
            V. — Tarifs
          </p>
          <h2 className="hero-display text-[#F4EFE6]">
            Un devis sur mesure pour votre projet.
          </h2>
          <p className="hero-body mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-[#F4EFE6]/80">
            Chaque projet est unique. Parlons de vos besoins et construisons
            ensemble la solution qui vous correspond.
          </p>
        </motion.div>

        {/* Sous-titre approche personnalisée */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-12 max-w-3xl"
        >
          <h3
            style={{
              fontFamily: '"Fraunces", "Times New Roman", serif',
              fontStyle: "italic",
              fontWeight: 500,
            }}
            className="text-[26px] sm:text-[30px] md:text-[34px] leading-tight text-[#F4EFE6] mb-4"
          >
            Une approche personnalisée, sans surprise.
          </h3>
          <p className="hero-body text-[15px] sm:text-[16px] leading-[1.65] text-[#F4EFE6]/75">
            Site vitrine, application SaaS, e-commerce, intégration IA ou
            chatbot : je conçois des solutions adaptées à vos objectifs et à
            votre budget.
          </p>
        </motion.div>

        {/* 3 étapes valeur — liste verticale sobre */}
        <motion.ul
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20 sm:mb-24"
        >
          {valueProps.map((v) => {
            const Icon = v.icon;
            return (
              <motion.li
                key={v.numeral}
                variants={item}
                className="group relative pt-7 pb-7 sm:pt-8 sm:pb-8 border-t border-[#F4EFE6]/15 transition-colors duration-300 hover:border-[#F4D35E]/70 last:border-b last:border-b-[#F4EFE6]/15"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <span
                    className="text-[12px] font-mono tabular-nums tracking-wider text-[#F4EFE6]/40 group-hover:text-[#F4D35E] transition-colors w-8 flex-shrink-0 pt-1.5"
                    aria-hidden="true"
                  >
                    {v.numeral}.
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <h4
                        style={{
                          fontFamily: '"Fraunces", "Times New Roman", serif',
                          fontStyle: "italic",
                          fontWeight: 500,
                        }}
                        className="text-[22px] sm:text-[26px] leading-tight text-[#F4EFE6]"
                      >
                        {v.title}
                      </h4>
                      <Icon
                        className="h-5 w-5 mt-1.5 flex-shrink-0 text-[#F4EFE6]/40 group-hover:text-[#F4D35E] transition-colors"
                        aria-hidden="true"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="hero-body text-[15px] sm:text-[16px] leading-[1.65] text-[#F4EFE6]/70 max-w-2xl">
                      {v.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Bloc Vidéo & Drone — encart bordure jaune avec Lottie */}
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 sm:mb-24 border-l-2 border-[#F4D35E] pl-6 sm:pl-8 md:pl-10 py-4 sm:py-6"
        >
          <p className="hero-handwritten text-[16px] sm:text-[18px] text-[#F4EFE6]/55 mb-2">
            ✏ aérien & post-production
          </p>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
            <div>
              <h3
                style={{
                  fontFamily: '"Fraunces", "Times New Roman", serif',
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
                className="text-[26px] sm:text-[32px] md:text-[36px] leading-tight text-[#F4EFE6] mb-4"
              >
                Montage Vidéo & Prises de Vue Drone.
              </h3>
              <p className="hero-body text-[15px] sm:text-[16px] leading-[1.65] text-[#F4EFE6]/80 max-w-xl">
                Je monte vos vidéos professionnelles (Final Cut Pro) et réalise
                des prises de vue aériennes avec drone DJI Mavic Air pour
                valoriser votre entreprise, vos biens immobiliers ou vos
                événements.
              </p>
            </div>
            {/* 2 Lottie côte à côte : Cut Video + Drone Camera */}
            <div className="flex items-center justify-center md:justify-end gap-2 sm:gap-3">
              <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px]">
                <Lottie animationData={cutVideoAnimation} loop={true} />
              </div>
              <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px]">
                <Lottie animationData={droneCameraAnimation} loop={true} />
              </div>
            </div>
          </div>
        </motion.aside>

        {/* 4 garanties sobres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16"
        >
          <p className="hero-handwritten text-[16px] sm:text-[18px] text-[#F4EFE6]/55 mb-5">
            ↳ 4 garanties
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
            {reassuranceBadges.map((b) => {
              const Icon = b.icon;
              return (
                <li
                  key={b.text}
                  className="hero-body flex items-center gap-2.5 text-[14px] sm:text-[15px] text-[#F4EFE6]/85"
                >
                  <Icon
                    className="h-4 w-4 flex-shrink-0 text-[#F4D35E]"
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
                  <span>{b.text}</span>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-5"
        >
          <button
            onClick={() => scrollTo("contact")}
            className="hero-cta-primary group"
            aria-label="Demander mon devis gratuit"
            data-testid="pricing_cta"
          >
            <span>Demander mon devis</span>
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
          transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-20 max-w-xl"
        >
          <p className="hero-handwritten text-[20px] sm:text-[24px] leading-snug text-[#F4D35E]">
            « Un devis bien fait, c'est un projet déjà à moitié réussi. »
          </p>
          <p className="hero-handwritten mt-1 text-[15px] text-[#F4EFE6]/50">
            — C.M.
          </p>
        </motion.figcaption>
      </div>
    </section>
  );
}
