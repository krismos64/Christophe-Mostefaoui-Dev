import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function LegalNotice() {
  const lien =
    "border-b border-current/40 pb-0.5 hover:text-foret-moyen hover:border-soleil transition-colors";
  const liste = "mt-3 space-y-1.5 hero-body text-[15px]";

  const sections = [
    {
      numeral: "I",
      title: "Édition du site",
      body: (
        <>
          <p>
            Le site christophe-dev-freelance.fr est édité par{" "}
            <strong className="font-medium text-foret">Christophe Mostefaoui</strong>,
            entrepreneur individuel (EI), développeur web.
          </p>
          <ul className={liste}>
            <li>Adresse : 4 avenue Edmond Rostand, 64170 Artix, France</li>
            <li>
              SIRET : <span className="font-mono tabular-nums">937 719 177 00019</span>
            </li>
            <li>
              TVA intracommunautaire :{" "}
              <span className="font-mono tabular-nums">FR15 937 719 177</span>
            </li>
            <li>
              Email :{" "}
              <a href="mailto:christophe.mostefaoui.dev@gmail.com" className={lien}>
                christophe.mostefaoui.dev@gmail.com
              </a>
            </li>
            <li>
              Téléphone :{" "}
              <a href="tel:+33679088845" className={`font-mono tabular-nums ${lien}`}>
                06 79 08 88 45
              </a>
            </li>
          </ul>
          <p className="mt-4">
            Directeur de la publication : Christophe Mostefaoui.
          </p>
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
            <strong className="font-medium text-foret">Hostinger International Limited</strong>,
            société de droit chypriote.
          </p>
          <ul className={liste}>
            <li>Adresse : 61 Lordou Vironos Street, 6023 Larnaca, Chypre</li>
            <li>
              Téléphone : <span className="font-mono tabular-nums">+370 645 03378</span>
            </li>
            <li>
              Site :{" "}
              <a
                href="https://www.hostinger.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-1 ${lien}`}
              >
                hostinger.com
                <ArrowUpRight
                  className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </li>
          </ul>
          <p className="mt-4">
            Les serveurs qui font fonctionner le site sont situés en France, et
            leurs sauvegardes en Lituanie.
          </p>
        </>
      ),
    },
    {
      numeral: "III",
      title: "Clientèle professionnelle",
      body: (
        <p>
          Les prestations présentées sur ce site (création de sites internet,
          applications, intégration d'intelligence artificielle) sont proposées
          exclusivement aux professionnels : entreprises, commerçants, artisans,
          professions libérales. Elles ne s'adressent pas aux consommateurs ; le
          dispositif de médiation de la consommation ne s'applique donc pas.
          Chaque prestation fait l'objet d'un devis écrit.
        </p>
      ),
    },
    {
      numeral: "IV",
      title: "Propriété intellectuelle",
      body: (
        <>
          <p>
            Les textes, illustrations, animations et le code de ce site sont
            protégés par le droit d'auteur. Leur reproduction, totale ou
            partielle, demande une autorisation écrite préalable, sauf dans les
            cas prévus par la loi (courte citation avec mention de la source,
            par exemple).
          </p>
          <p className="mt-4">
            Les captures des sites présentés dans les réalisations, ainsi que
            les noms et logos qui y figurent, restent la propriété de leurs
            éditeurs respectifs.
          </p>
        </>
      ),
    },
    {
      numeral: "V",
      title: "Responsabilité",
      body: (
        <p>
          Je veille à ce que les informations publiées soient exactes et à
          jour, sans pouvoir garantir qu'elles le restent en permanence. Si
          vous relevez une erreur, écrivez-moi : je la corrige rapidement. Les
          liens vers d'autres sites sont fournis pour information ; je n'ai pas
          la maîtrise de leur contenu.
        </p>
      ),
    },
    {
      numeral: "VI",
      title: "Droit applicable",
      body: (
        <p>
          Les présentes mentions légales sont soumises au droit français. En
          cas de différend, une solution amiable sera recherchée en priorité ;
          à défaut, le tribunal compétent est désigné selon les règles de droit
          applicables.
        </p>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Mentions légales | Christophe Mostefaoui, développeur web</title>
        <meta
          name="description"
          content="Mentions légales de christophe-dev-freelance.fr : identité de l'éditeur, directeur de la publication, hébergeur, propriété intellectuelle."
        />
        <link
          rel="canonical"
          href="https://christophe-dev-freelance.fr/mentions-legales"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "https://christophe-dev-freelance.fr/" },
              { "@type": "ListItem", position: 2, name: "Mentions légales", item: "https://christophe-dev-freelance.fr/mentions-legales" },
            ],
          })}
        </script>
      </Helmet>

      <section
        className="relative w-full overflow-hidden bg-creme pt-32 sm:pt-36 pb-20 sm:pb-28"
        aria-label="Mentions légales"
      >

        <div className="mx-auto px-5 sm:px-8 relative z-10 max-w-4xl">
          {/* Header édito */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 sm:mb-16"
          >
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-foret/75 mb-2">
              ↳ informations légales
            </p>
            <h1 className="hero-display text-foret">
              Mentions légales.
            </h1>
            <p className="hero-body mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-foret/80">
              Conformément à la loi pour la confiance dans l'économie numérique
              (LCEN), voici les informations légales relatives à ce site.
              Dernière mise à jour : 6 novembre 2026.
            </p>
          </motion.div>

          {/* Sections */}
          <ul className="border-b border-foret/15">
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
                className="group py-8 sm:py-10 border-t border-foret/15"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <span
                    className="text-[12px] font-mono tabular-nums tracking-wider text-foret/70 w-8 flex-shrink-0 pt-1.5"
                    aria-hidden="true"
                  >
                    {section.numeral}.
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2
                      className="text-[24px] sm:text-[28px] leading-tight text-foret mb-4"
                    >
                      {section.title}
                    </h2>
                    <div className="hero-body text-[15px] sm:text-[16px] leading-[1.7] text-foret/80 max-w-2xl">
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
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-foret/75">
              ↳ besoin d'autre chose ?
            </p>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
              <Link
                to="/"
                className="hero-body group inline-flex items-center gap-2 text-[14px] text-foret/80 hover:text-foret-moyen transition-colors"
              >
                <span className="border-b border-current/40 pb-0.5 group-hover:border-soleil">
                  retour à l'accueil
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                to="/politique-de-confidentialite"
                className="hero-body group inline-flex items-center gap-2 text-[14px] text-foret/80 hover:text-foret-moyen transition-colors"
              >
                <span className="border-b border-current/40 pb-0.5 group-hover:border-soleil">
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
      </section>
    </>
  );
}
