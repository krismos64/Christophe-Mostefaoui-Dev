import { motion, useInView } from "framer-motion";
import LienContact from "../common/LienContact";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import VideoEmbed from "../common/VideoEmbed";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

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
      className="relative w-full overflow-hidden bg-creme py-20 sm:py-28 md:py-32"
      aria-label="À propos de Christophe"
    >

      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
        {/* Header édito : numéro de section + titre */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <p className="hero-handwritten text-[18px] sm:text-[20px] text-foret/75 mb-2">
            Qui suis-je
          </p>
          <h2 className="hero-display max-w-3xl text-foret">
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
            {/* Portrait dans une arche (06/11/2026) : aplat décalé, soleil et
                anneau animés en CSS (index.css, section À propos), Pyrénées au pied */}
            <div className="apropos-portrait relative mx-auto max-w-[420px] pb-6 pr-6 md:mx-0">
              <div
                className="absolute inset-0 left-6 top-6 rounded-b-[28px] rounded-t-[999px] bg-foret-moyen"
                aria-hidden="true"
              />
              <svg
                viewBox="0 0 120 120"
                className="apropos-soleil absolute -right-4 -top-4 z-0 h-28 w-28 sm:-right-8 sm:h-32 sm:w-32"
                aria-hidden="true"
              >
                <circle cx="60" cy="60" r="34" fill="#F2A25C" />
                <circle
                  className="apropos-anneau"
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#F2A25C"
                  strokeWidth="2"
                  strokeDasharray="3 9"
                  strokeLinecap="round"
                />
              </svg>
              <div className="relative z-10 overflow-hidden rounded-b-[28px] rounded-t-[999px] bg-[#e6e6e8] shadow-[0_30px_60px_-30px_rgba(18,49,43,0.55)] ring-1 ring-foret/10">
                <picture>
                  <source
                    type="image/avif"
                    srcSet="/assets/images/optimized/christophe-portrait-480.avif 480w, /assets/images/optimized/christophe-portrait-768.avif 768w, /assets/images/optimized/christophe-portrait-1120.avif 1120w"
                    sizes="(max-width: 768px) 90vw, 400px"
                  />
                  <source
                    type="image/webp"
                    srcSet="/assets/images/optimized/christophe-portrait-480.webp 480w, /assets/images/optimized/christophe-portrait-768.webp 768w, /assets/images/optimized/christophe-portrait-1120.webp 1120w"
                    sizes="(max-width: 768px) 90vw, 400px"
                  />
                  <img
                    src="/assets/images/optimized/christophe-portrait-768.webp"
                    alt="Portrait de Christophe Mostefaoui, développeur web à Pau et Artix"
                    width={1122}
                    height={1402}
                    className="aspect-[4/5] h-auto w-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                {/* Pyrénées au pied du portrait */}
                <svg
                  viewBox="0 0 400 80"
                  preserveAspectRatio="none"
                  className="absolute inset-x-0 bottom-0 h-[16%] w-full"
                  aria-hidden="true"
                >
                  <path d="M0 80 L0 46 L60 20 L110 44 L170 8 L230 42 L290 16 L350 40 L400 26 L400 80 Z" fill="#24594C" opacity="0.92" />
                  <path d="M160 14 L170 8 L181 16 L175 15 L170 18 Z" fill="#E8EFEC" />
                  <path d="M281 21 L290 16 L299 23 L294 22 L290 24 Z" fill="#E8EFEC" />
                  <path d="M0 80 L0 62 L90 52 L180 66 L270 50 L400 60 L400 80 Z" fill="#12312B" />
                </svg>
              </div>
              <p className="absolute bottom-2 left-0 z-20 inline-flex items-center gap-2 rounded-full bg-creme px-4 py-2 text-[14px] font-bold text-foret shadow-[0_10px_24px_-12px_rgba(18,49,43,0.6)]">
                <span className="apropos-point relative inline-flex h-2.5 w-2.5 rounded-full bg-soleil" aria-hidden="true" />
                Pau · Artix
              </p>
            </div>
            <figcaption className="hero-handwritten mt-4 text-[16px] sm:text-[18px] text-foret/70 text-right md:pr-6">
              — C.M., à Pau et Artix
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
              className="hero-body space-y-5 text-[16px] sm:text-[17px] leading-[1.7] text-foret/85 max-w-2xl"
            >
              <p>
                Après douze ans dans le conseil client en multimédia, j'ai
                choisi de mettre cette expérience au service des entrepreneurs
                et des PME. Je connais vos contraintes : un budget à respecter,
                un besoin de résultats concrets, et pas de temps à perdre en
                aller-retours techniques.
              </p>
              <p className="font-medium text-foret">
                Mon approche : vous écouter, vous conseiller, et créer un site
                qui travaille pour vous, même quand vous dormez.
              </p>
            </motion.div>

            {/* Encart SmartPlanning — sobre */}
            <motion.aside
              variants={item}
              className="mt-8 border-l-2 border-soleil pl-5 py-1"
            >
              <p className="hero-body text-[15px] sm:text-[16px] leading-[1.65] text-foret/80">
                En parallèle de mes missions freelance, j'ai conçu et lancé{" "}
                <a
                  href="https://smartplanning.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foret underline underline-offset-4 decoration-soleil decoration-2 hover:decoration-[3px] transition-all"
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
              className="my-10 h-px w-24 bg-foret/25"
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
                      className="text-[12px] font-mono tabular-nums tracking-wider text-foret/70 group-hover:text-foret-moyen transition-colors w-7 flex-shrink-0"
                      aria-hidden="true"
                    >
                      {d.numeral}.
                    </span>
                    <h3
                      className="text-[20px] sm:text-[22px] leading-tight text-foret"
                    >
                      {d.title}
                    </h3>
                  </div>
                  <p className="hero-body text-[14px] sm:text-[15px] leading-[1.6] text-foret/70 pl-10">
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
              <LienContact
                className="hero-cta-primary group"
              >
                <span>Discutons de votre projet</span>
                <span className="hero-cta-sub">premier échange gratuit</span>
                <ArrowUpRight
                  className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </LienContact>

              <a
                href="https://krismos.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-body group inline-flex items-center gap-2 text-[14px] text-foret/80 hover:text-foret-moyen transition-colors"
              >
                <span className="border-b border-current/40 pb-0.5 group-hover:border-soleil">
                  krismos.fr
                </span>
                <span>ma version technique longue</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
<span className="sr-only"> (nouvel onglet)</span>
              </a>
            </motion.div>

            {/* Citation manuscrite signée */}
            <motion.figcaption variants={item} className="mt-12 max-w-md">
              <p className="hero-handwritten text-[20px] sm:text-[22px] leading-snug text-foret/90">
                « Douze ans à écouter, ça change la façon de coder. »
              </p>
              <p className="hero-handwritten mt-1 text-[15px] text-foret/70">
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
            <p className="hero-handwritten text-[16px] sm:text-[18px] text-foret/70 mb-1.5">
              ✏ en deux minutes
            </p>
            <h3
              className="text-[24px] sm:text-[28px] md:text-[32px] leading-tight text-foret"
            >
              Mon univers digital, raconté.
            </h3>
          </div>
          <VideoEmbed
            youtubeId="eZ6OYMeT1CM"
            thumbnail="/assets/images/miniature.png"
            title="Mon Univers Digital : Christophe Mostefaoui"
            caption="— mon approche du développement web"
            duration="1:31"
            channelUrl="https://www.youtube.com/@christophe-dev-freelance/videos"
            theme="light"
            ariaLabel="Lire la vidéo : Mon Univers Digital"
          />
        </motion.div>
      </div>
    </section>
  );
}
