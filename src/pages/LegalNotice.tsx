import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function LegalNotice() {
  const sections = [
    {
      numeral: "I",
      title: "Édition du site",
      body: (
        <>
          <p>
            Le site web est édité par{" "}
            <strong className="font-medium text-[#1A1715] dark:text-[#F4EFE6]">
              Mostefaoui Christophe
            </strong>
            , entrepreneur individuel.
          </p>
          <ul className="mt-3 space-y-1.5 hero-body text-[15px]">
            <li>Adresse : 64170 Artix, France</li>
            <li>
              SIRET :{" "}
              <span className="font-mono tabular-nums">937 719 177 00019</span>
            </li>
            <li>
              Email :{" "}
              <a
                href="mailto:christophe.mostefaoui.dev@gmail.com"
                className="border-b border-current/40 pb-0.5 hover:text-[#F4D35E] hover:border-[#F4D35E] transition-colors"
              >
                christophe.mostefaoui.dev@gmail.com
              </a>
            </li>
            <li>
              Téléphone :{" "}
              <a
                href="tel:+33679088845"
                className="font-mono tabular-nums border-b border-current/40 pb-0.5 hover:text-[#F4D35E] hover:border-[#F4D35E] transition-colors"
              >
                06 79 08 88 45
              </a>
            </li>
          </ul>
        </>
      ),
    },
    {
      numeral: "II",
      title: "Hébergement",
      body: (
        <>
          <p>
            Le site est hébergé par{" "}
            <strong className="font-medium text-[#1A1715] dark:text-[#F4EFE6]">
              Hostinger International Ltd.
            </strong>
          </p>
          <ul className="mt-3 space-y-1.5 hero-body text-[15px]">
            <li>Adresse : 61 Lordou Vironos Street, 6023 Larnaca, Chypre</li>
            <li>
              Téléphone :{" "}
              <span className="font-mono tabular-nums">+370 645 03378</span>
            </li>
            <li>
              Email :{" "}
              <a
                href="mailto:domains@hostinger.com"
                className="border-b border-current/40 pb-0.5 hover:text-[#F4D35E] hover:border-[#F4D35E] transition-colors"
              >
                domains@hostinger.com
              </a>
            </li>
            <li>
              Site :{" "}
              <a
                href="https://www.hostinger.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 border-b border-current/40 pb-0.5 hover:text-[#F4D35E] hover:border-[#F4D35E] transition-colors"
              >
                hostinger.com
                <ArrowUpRight
                  className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </li>
          </ul>
        </>
      ),
    },
    {
      numeral: "III",
      title: "Propriété intellectuelle",
      body: (
        <p>
          L'ensemble du contenu de ce site (textes, images, vidéos, code source,
          etc.) est protégé par le droit d'auteur. Toute reproduction ou
          représentation, totale ou partielle, est interdite sans autorisation
          écrite préalable.
        </p>
      ),
    },
    {
      numeral: "IV",
      title: "Responsabilité",
      body: (
        <p>
          Les informations fournies sur ce site le sont à titre indicatif.
          L'éditeur ne saurait garantir l'exactitude, la complétude et
          l'actualité des informations diffusées.
        </p>
      ),
    },
    {
      numeral: "V",
      title: "Litiges",
      body: (
        <p>
          Les présentes mentions légales sont soumises au droit français. En cas
          de litige, les tribunaux français seront seuls compétents.
        </p>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Mentions légales — Christophe Mostefaoui, développeur web freelance à Pau</title>
        <meta
          name="description"
          content="Mentions légales du site christophe-dev-freelance.fr. Identité de l'éditeur, hébergeur, propriété intellectuelle, responsabilité, juridiction française."
        />
      </Helmet>

      <main
        id="main"
        className="relative w-full overflow-hidden bg-[#F4EFE6] dark:bg-[#13110F] pt-32 sm:pt-36 pb-20 sm:pb-28"
        aria-label="Mentions légales"
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

        <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10 max-w-4xl">
          {/* Header édito */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 sm:mb-16"
          >
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-[#1A1715]/60 dark:text-[#F4EFE6]/60 mb-2">
              ↳ informations légales
            </p>
            <h1 className="hero-display text-[#1A1715] dark:text-[#F4EFE6]">
              Mentions légales.
            </h1>
            <p className="hero-body mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-[#1A1715]/80 dark:text-[#F4EFE6]/80">
              Conformément à la loi pour la confiance dans l'économie numérique
              (LCEN), voici les informations légales relatives à ce site.
            </p>
          </motion.div>

          {/* Sections */}
          <ul className="border-b border-[#1A1715]/15 dark:border-[#F4EFE6]/15">
            {sections.map((section, index) => (
              <motion.li
                key={section.numeral}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + index * 0.08,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group py-8 sm:py-10 border-t border-[#1A1715]/15 dark:border-[#F4EFE6]/15"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <span
                    className="text-[12px] font-mono tabular-nums tracking-wider text-[#1A1715]/40 dark:text-[#F4EFE6]/40 w-8 flex-shrink-0 pt-1.5"
                    aria-hidden="true"
                  >
                    {section.numeral}.
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2
                      style={{
                        fontFamily: '"Fraunces", "Times New Roman", serif',
                        fontStyle: "italic",
                        fontWeight: 500,
                      }}
                      className="text-[24px] sm:text-[28px] leading-tight text-[#1A1715] dark:text-[#F4EFE6] mb-4"
                    >
                      {section.title}
                    </h2>
                    <div className="hero-body text-[15px] sm:text-[16px] leading-[1.7] text-[#1A1715]/80 dark:text-[#F4EFE6]/80 max-w-2xl">
                      {section.body}
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Retour accueil */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 sm:mt-16 flex flex-col items-start gap-5"
          >
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-[#1A1715]/60 dark:text-[#F4EFE6]/60">
              ↳ besoin d'autre chose ?
            </p>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
              <Link
                to="/"
                className="hero-body group inline-flex items-center gap-2 text-[14px] text-[#1A1715]/80 dark:text-[#F4EFE6]/80 hover:text-[#F4D35E] transition-colors"
              >
                <span className="border-b border-current/40 pb-0.5 group-hover:border-[#F4D35E]">
                  retour à l'accueil
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                to="/politique-de-confidentialite"
                className="hero-body group inline-flex items-center gap-2 text-[14px] text-[#1A1715]/80 dark:text-[#F4EFE6]/80 hover:text-[#F4D35E] transition-colors"
              >
                <span className="border-b border-current/40 pb-0.5 group-hover:border-[#F4D35E]">
                  politique de confidentialité
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
