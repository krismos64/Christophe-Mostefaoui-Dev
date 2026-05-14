import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import VideoEmbed from "../common/VideoEmbed";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const differentiators = [
    {
      numeral: "I",
      title: "Je parle votre langue",
      description: "Pas de jargon technique, des explications claires.",
    },
    {
      numeral: "II",
      title: "Disponible et réactif",
      description: "Réponse sous 24h, suivi personnalisé.",
    },
    {
      numeral: "III",
      title: "Fondateur d'un SaaS",
      description:
        "SmartPlanning conçu de A à Z : je sais piloter un produit, pas juste écrire du code.",
    },
    {
      numeral: "IV",
      title: "Présent après la livraison",
      description: "Accompagnement et modifications incluses.",
    },
  ];

  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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
      id="about"
      className="relative w-full overflow-hidden bg-[#F4EFE6] dark:bg-[#13110F] py-20 sm:py-28 md:py-32"
      aria-label="À propos de Christophe"
    >
      {/* Texture grain papier subtile */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply dark:mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {/* Header édito : numéro de section + titre */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <p className="hero-handwritten text-[18px] sm:text-[20px] text-[#1A1715]/60 dark:text-[#F4EFE6]/60 mb-2">
            II. — Qui suis-je
          </p>
          <h2 className="hero-display max-w-3xl text-[#1A1715] dark:text-[#F4EFE6]">
            Douze ans à conseiller des clients, puis le code.
          </h2>
        </motion.div>

        {/* Grille principale : portrait + texte */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 lg:gap-20 items-start">
          {/* Portrait */}
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 lg:col-span-5"
          >
            <div className="relative">
              <img
                src="/assets/images/montagne.png"
                alt="Christophe Mostefaoui codant face aux Pyrénées au coucher du soleil, avec un refuge en pierre et la vallée en contrebas"
                className="w-full h-auto aspect-[4/5] object-cover object-[60%_center]"
                loading="lazy"
              />
              {/* Cadre fin */}
              <div
                className="absolute inset-0 ring-1 ring-[#1A1715]/15 dark:ring-[#F4EFE6]/20 pointer-events-none"
                aria-hidden="true"
              />
            </div>
            <figcaption className="hero-handwritten mt-4 text-[16px] sm:text-[18px] text-[#1A1715]/70 dark:text-[#F4EFE6]/70 text-right">
              — bureau d'altitude, face aux Pyrénées
            </figcaption>
          </motion.figure>

          {/* Contenu texte */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="md:col-span-7 lg:col-span-7"
          >
            <motion.div
              variants={item}
              className="hero-body space-y-5 text-[16px] sm:text-[17px] leading-[1.7] text-[#1A1715]/85 dark:text-[#F4EFE6]/85 max-w-2xl"
            >
              <p>
                Après douze ans dans le conseil client en multimédia, j'ai
                choisi de mettre cette expérience au service des entrepreneurs
                et des PME. Je connais vos contraintes : un budget à respecter,
                un besoin de résultats concrets, et pas de temps à perdre en
                aller-retours techniques.
              </p>
              <p className="font-medium text-[#1A1715] dark:text-[#F4EFE6]">
                Mon approche : vous écouter, vous conseiller, et créer un site
                qui travaille pour vous, même quand vous dormez.
              </p>
            </motion.div>

            {/* Encart SmartPlanning — sobre */}
            <motion.aside
              variants={item}
              className="mt-8 border-l-2 border-[#F4D35E] pl-5 py-1"
            >
              <p className="hero-body text-[15px] sm:text-[16px] leading-[1.65] text-[#1A1715]/80 dark:text-[#F4EFE6]/80">
                En parallèle de mes missions freelance, j'ai conçu et lancé{" "}
                <a
                  href="https://smartplanning.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#1A1715] dark:text-[#F4EFE6] underline underline-offset-4 decoration-[#F4D35E] decoration-2 hover:decoration-[3px] transition-all"
                >
                  SmartPlanning
                </a>
                , un SaaS de gestion de plannings d'équipe avec assistant IA
                intégré. Architecture, développement, IA, déploiement, support,
                je maîtrise tout le cycle de vie d'un produit, pas juste le
                code.
              </p>
            </motion.aside>

            {/* Trait séparateur */}
            <motion.div
              variants={item}
              className="my-10 h-px w-24 bg-[#1A1715]/25 dark:bg-[#F4EFE6]/25"
              aria-hidden="true"
            />

            {/* 4 différenciateurs en chiffres romains */}
            <motion.ul
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7"
            >
              {differentiators.map((d) => (
                <motion.li key={d.numeral} variants={item} className="group">
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span
                      className="text-[12px] font-mono tabular-nums tracking-wider text-[#1A1715]/40 dark:text-[#F4EFE6]/40 group-hover:text-[#F4D35E] transition-colors w-7 flex-shrink-0"
                      aria-hidden="true"
                    >
                      {d.numeral}.
                    </span>
                    <h3
                      style={{
                        fontFamily: '"Fraunces", "Times New Roman", serif',
                        fontStyle: "italic",
                        fontWeight: 500,
                      }}
                      className="text-[20px] sm:text-[22px] leading-tight text-[#1A1715] dark:text-[#F4EFE6]"
                    >
                      {d.title}
                    </h3>
                  </div>
                  <p className="hero-body text-[14px] sm:text-[15px] leading-[1.6] text-[#1A1715]/70 dark:text-[#F4EFE6]/70 pl-10">
                    {d.description}
                  </p>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTAs sobres */}
            <motion.div
              variants={item}
              className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8"
            >
              <button
                onClick={() => scrollTo("contact")}
                className="hero-cta-primary group"
                aria-label="Discuter de votre projet"
              >
                <span>Discutons de votre projet</span>
                <span className="hero-cta-sub">premier échange gratuit</span>
                <ArrowUpRight
                  className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>

              <a
                href="https://krismos.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-body group inline-flex items-center gap-2 text-[14px] text-[#1A1715]/80 dark:text-[#F4EFE6]/80 hover:text-[#F4D35E] transition-colors"
                aria-label="Voir mon portfolio technique sur krismos.fr (nouvel onglet)"
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
            </motion.div>

            {/* Citation manuscrite signée */}
            <motion.figcaption variants={item} className="mt-12 max-w-md">
              <p className="hero-handwritten text-[20px] sm:text-[22px] leading-snug text-[#1A1715]/90 dark:text-[#F4D35E]">
                « Douze ans à écouter, ça change la façon de coder. »
              </p>
              <p className="hero-handwritten mt-1 text-[15px] text-[#1A1715]/50 dark:text-[#F4EFE6]/50">
                — C.M.
              </p>
            </motion.figcaption>
          </motion.div>
        </div>

        {/* Vidéo : Mon Univers Digital */}
        <motion.div
          id="video-presentation"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 sm:mt-24 md:mt-28 max-w-4xl mx-auto"
        >
          <div className="mb-6">
            <p className="hero-handwritten text-[16px] sm:text-[18px] text-[#1A1715]/55 dark:text-[#F4EFE6]/55 mb-1.5">
              ✏ en deux minutes
            </p>
            <h3
              style={{
                fontFamily: '"Fraunces", "Times New Roman", serif',
                fontStyle: "italic",
                fontWeight: 500,
              }}
              className="text-[24px] sm:text-[28px] md:text-[32px] leading-tight text-[#1A1715] dark:text-[#F4EFE6]"
            >
              Mon univers digital, raconté.
            </h3>
          </div>
          <VideoEmbed
            youtubeId="eZ6OYMeT1CM"
            thumbnail="/assets/images/chris-youtube.JPG"
            title="Mon Univers Digital — Christophe Mostefaoui"
            caption="— mon approche du développement web"
            duration="2:45"
            channelUrl="https://www.youtube.com/@christophe-dev-freelance/videos"
            theme="light"
            ariaLabel="Lire la vidéo : Mon Univers Digital"
          />
        </motion.div>
      </div>
    </section>
  );
}
