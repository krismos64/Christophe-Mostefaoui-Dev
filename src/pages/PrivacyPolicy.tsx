import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function PrivacyPolicy() {
  const sections = [
    {
      numeral: "I",
      title: "Collecte des données",
      body: (
        <>
          <p>
            Je collecte uniquement les informations que vous me fournissez
            volontairement via le formulaire de contact :
          </p>
          <ul className="mt-3 space-y-1.5 hero-body text-[15px] pl-5 list-disc marker:text-[#F4D35E]">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone (optionnel)</li>
            <li>Ville (optionnel)</li>
            <li>Type de projet et description</li>
          </ul>
        </>
      ),
    },
    {
      numeral: "II",
      title: "Utilisation des données",
      body: (
        <>
          <p>Les données collectées sont utilisées uniquement pour :</p>
          <ul className="mt-3 space-y-1.5 hero-body text-[15px] pl-5 list-disc marker:text-[#F4D35E]">
            <li>Répondre à vos demandes de contact ou de devis</li>
            <li>
              Vous transmettre une proposition adaptée à votre projet
            </li>
            <li>Améliorer le site et les services proposés</li>
          </ul>
          <p className="mt-4">
            <strong className="font-medium text-[#1A1715] dark:text-[#F4EFE6]">
              Vos données ne sont jamais cédées ni revendues
            </strong>{" "}
            à des tiers.
          </p>
        </>
      ),
    },
    {
      numeral: "III",
      title: "Conservation des données",
      body: (
        <p>
          Vos données sont conservées pendant une durée maximale de{" "}
          <strong className="font-medium text-[#1A1715] dark:text-[#F4EFE6]">
            3 ans
          </strong>{" "}
          à compter de notre dernier contact. Au-delà, elles sont supprimées
          automatiquement.
        </p>
      ),
    },
    {
      numeral: "IV",
      title: "Vos droits",
      body: (
        <>
          <p>Conformément au RGPD, vous disposez à tout moment des droits suivants :</p>
          <ul className="mt-3 space-y-1.5 hero-body text-[15px] pl-5 list-disc marker:text-[#F4D35E]">
            <li>Droit d'accès à vos données personnelles</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement (« droit à l'oubli »)</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité</li>
            <li>Droit d'opposition</li>
          </ul>
          <p className="mt-4">
            Pour exercer ces droits, contactez-moi à{" "}
            <a
              href="mailto:christophe.mostefaoui.dev@gmail.com"
              className="border-b border-current/40 pb-0.5 hover:text-[#F4D35E] hover:border-[#F4D35E] transition-colors"
            >
              christophe.mostefaoui.dev@gmail.com
            </a>
            . Une réponse vous sera apportée sous 30 jours maximum.
          </p>
        </>
      ),
    },
    {
      numeral: "V",
      title: "Cookies",
      body: (
        <>
          <p>
            Ce site utilise uniquement des cookies techniques essentiels au bon
            fonctionnement du site (préférence de thème, état de session).
          </p>
          <p className="mt-3">
            <strong className="font-medium text-[#1A1715] dark:text-[#F4EFE6]">
              Aucun cookie publicitaire ou de tracking marketing n'est utilisé.
            </strong>{" "}
            Google Tag Manager est présent à des fins de mesure d'audience
            anonyme uniquement.
          </p>
        </>
      ),
    },
    {
      numeral: "VI",
      title: "Contact",
      body: (
        <>
          <p>
            Pour toute question relative à cette politique de confidentialité ou
            au traitement de vos données personnelles, vous pouvez me joindre :
          </p>
          <ul className="mt-3 space-y-1.5 hero-body text-[15px]">
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
  ];

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>
          Politique de confidentialité — Christophe Mostefaoui, développeur web freelance à Pau
        </title>
        <meta
          name="description"
          content="Politique de confidentialité du site christophe-dev-freelance.fr. Collecte, utilisation et conservation des données personnelles conformément au RGPD."
        />
      </Helmet>

      <main
        id="main"
        className="relative w-full overflow-hidden bg-[#F4EFE6] dark:bg-[#13110F] pt-32 sm:pt-36 pb-20 sm:pb-28"
        aria-label="Politique de confidentialité"
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
              ↳ conforme RGPD
            </p>
            <h1 className="hero-display text-[#1A1715] dark:text-[#F4EFE6]">
              Politique de confidentialité.
            </h1>
            <p className="hero-body mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-[#1A1715]/80 dark:text-[#F4EFE6]/80">
              Vos données personnelles m'intéressent uniquement pour vous
              répondre. Voici précisément comment je les collecte, je les
              utilise et combien de temps je les conserve.
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
                  delay: 0.1 + index * 0.07,
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

          {/* Retour */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
                to="/mentions-legales"
                className="hero-body group inline-flex items-center gap-2 text-[14px] text-[#1A1715]/80 dark:text-[#F4EFE6]/80 hover:text-[#F4D35E] transition-colors"
              >
                <span className="border-b border-current/40 pb-0.5 group-hover:border-[#F4D35E]">
                  mentions légales
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
