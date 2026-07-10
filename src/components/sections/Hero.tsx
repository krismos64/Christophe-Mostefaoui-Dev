import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const titleStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
        delayChildren: 0,
      },
    },
  };

  const lineUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 8 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : delay * 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#0B0805]"
      aria-label="Présentation"
    >
      {/* Image de fond : Christophe codant à Pau au coucher du soleil */}
      <div className="absolute inset-0 z-0">
        <picture>
          {/* Mobile (≤767px) : portrait 720x1456 — AVIF, WebP, PNG fallback */}
          <source
            media="(max-width: 767px)"
            type="image/avif"
            srcSet="/assets/images/hero/chris-pau-mobile-480.avif 480w, /assets/images/hero/chris-pau-mobile-768.avif 768w"
            sizes="100vw"
          />
          <source
            media="(max-width: 767px)"
            type="image/webp"
            srcSet="/assets/images/hero/chris-pau-mobile-480.webp 480w, /assets/images/hero/chris-pau-mobile-768.webp 768w"
            sizes="100vw"
          />
          <source
            media="(max-width: 767px)"
            srcSet="/assets/images/chris-pau-smartphone.png"
          />
          {/* Desktop (≥768px) : paysage 1536x1024 — AVIF, WebP, PNG fallback */}
          <source
            type="image/avif"
            srcSet="/assets/images/hero/chris-pau-768.avif 768w, /assets/images/hero/chris-pau-1024.avif 1024w, /assets/images/hero/chris-pau-1536.avif 1536w"
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet="/assets/images/hero/chris-pau-768.webp 768w, /assets/images/hero/chris-pau-1024.webp 1024w, /assets/images/hero/chris-pau-1536.webp 1536w"
            sizes="100vw"
          />
          <img
            src="/assets/images/chris-pau.png"
            alt="Christophe Mostefaoui travaillant sur son ordinateur portable à Pau au coucher du soleil, avec les Pyrénées et le château en arrière-plan"
            width={1536}
            height={1024}
            className="h-full w-full object-cover object-[center_top] md:object-[65%_center]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        {/* Overlay : sur mobile, dégradé vertical (haut sombre pour le texte) — sur desktop, dégradé horizontal */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,8,5,0.88) 0%, rgba(11,8,5,0.72) 22%, rgba(11,8,5,0.35) 45%, rgba(11,8,5,0.15) 65%, rgba(11,8,5,0.5) 88%, rgba(11,8,5,0.9) 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,8,5,0.92) 0%, rgba(11,8,5,0.78) 28%, rgba(11,8,5,0.45) 55%, rgba(11,8,5,0.15) 80%, rgba(11,8,5,0.05) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Voile supplémentaire en bas pour la légende manuscrite (desktop uniquement) */}
        <div
          className="absolute inset-x-0 bottom-0 hidden h-48 md:block"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(11,8,5,0.55) 60%, rgba(11,8,5,0.85) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Voile horizontal en haut pour ne pas écraser le header */}
        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,8,5,0.55) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-start px-5 pt-24 pb-44 sm:px-8 md:justify-center md:px-12 md:pt-32 md:pb-40 lg:px-16">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={titleStagger}
        >
          {/* Méta-info en haut : localisation manuscrite */}
          <motion.div
            variants={lineUp}
            className="mb-8 flex items-center gap-3"
          >
            <span
              className="hero-handwritten flex items-center gap-2 text-[19px] sm:text-[22px] text-[#F4D35E]"
              aria-label="Localisation"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              depuis Pau, Pyrénées-Atlantiques (64)
            </span>
          </motion.div>

          {/* Titre principal manifeste en serif italique */}
          <motion.h1 variants={lineUp} className="hero-display text-[#F4EFE6]">
            <span className="block">Je code</span>
            <span className="block">
              des sites <em className="not-italic font-medium">qui</em>
            </span>
            <span className="block">
              ressemblent <em className="not-italic font-medium">à</em>
            </span>
            <span className="block">leurs propriétaires.</span>
          </motion.h1>

          {/* Trait fin façon règle de magazine */}
          <motion.div
            variants={lineUp}
            className="my-8 h-px w-24 bg-[#F4EFE6]/40"
            aria-hidden="true"
          />

          {/* Bio courte */}
          <motion.p
            custom={0.9}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="hero-body max-w-xl text-[17px] leading-[1.65] text-[#F4EFE6]/85 sm:text-[18px]"
          >
            Christophe Mostefaoui, développeur freelance basé à Pau et Artix
            (64). Je conçois des sites et applications web sur mesure, de
            l'analyse des besoins à la mise en ligne.
          </motion.p>

          {/* Badge fondateur SmartPlanning */}
          <motion.a
            custom={1.05}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            href="https://smartplanning.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-body group mt-5 inline-flex items-center gap-2 text-[15px] text-[#F4EFE6]/80 transition-colors hover:text-[#F4D35E]"
            data-testid="hero_smartplanning_badge"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#F4D35E]" />
            Fondateur de
            <span className="font-medium underline-offset-4 group-hover:underline">
              SmartPlanning
            </span>
            <ExternalLink
              className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </motion.a>

          {/* CTAs */}
          <motion.div
            custom={1.2}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7"
          >
            <button
              onClick={scrollToContact}
              className="hero-cta-primary group"
              data-testid="hero_cta_primary"
            >
              <span>Demander un devis</span>
              <span className="hero-cta-sub">gratuit · sous 24h</span>
              <ArrowRight
                className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <a
              href="https://krismos.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-body group inline-flex items-center gap-2 text-[15px] text-[#F4EFE6]/90 transition-colors hover:text-[#F4D35E]"
              data-testid="hero_cta_portfolio"
            >
              <span className="border-b border-[#F4EFE6]/40 pb-0.5 transition-colors group-hover:border-[#F4D35E]">
                krismos.fr
              </span>
              <span className="opacity-70">mon laboratoire technique</span>
              <ExternalLink
                className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </motion.div>
        </motion.div>

        {/* Légende manuscrite signée — centrée en bas sur mobile, à droite en desktop */}
        <motion.figcaption
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-10 left-5 right-5 mx-auto text-center md:bottom-12 md:left-auto md:right-14 md:mx-0 md:max-w-sm md:text-right"
        >
          <p className="hero-handwritten text-[18px] leading-snug text-[#F4D35E] sm:text-[22px] md:text-[26px]">
            « Cette vue, je l'ai pendant que je code. »
          </p>
          <p className="hero-handwritten mt-1 text-[14px] text-[#F4EFE6]/70 sm:text-[17px] md:text-[18px]">
            — C.M., un soir de mai à Pau
          </p>
        </motion.figcaption>
      </div>

      {/* Indicateur de scroll discret */}
      <Link
        to="#about"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById("about");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[#F4EFE6]/50 transition-colors hover:text-[#F4D35E] md:flex"
        aria-label="Faire défiler vers la suite"
      >
        <span className="hero-handwritten text-[14px]">la suite</span>
        <motion.span
          className="inline-block h-6 w-px bg-current"
          style={{ transformOrigin: "top" }}
          animate={
            prefersReducedMotion
              ? { scaleY: 1 }
              : { scaleY: [0.4, 1, 0.4] }
          }
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
      </Link>
    </section>
  );
}
