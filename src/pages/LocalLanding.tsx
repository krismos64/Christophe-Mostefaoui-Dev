import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useLocation } from "react-router-dom";
import LienContact from "../components/common/LienContact";
import { getLocalPage } from "../data/localPages";

const BASE_URL = "https://christophe-dev-freelance.fr";

export default function LocalLanding() {
  const { pathname } = useLocation();
  const page = getLocalPage(pathname);

  if (!page) return <Navigate to="/" replace />;

  const pageUrl = `${BASE_URL}/${page.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: page.metaTitle,
        description: page.metaDescription,
        inLanguage: "fr-FR",
        about: { "@id": `${BASE_URL}/#business` },
        isPartOf: {
          "@type": "WebSite",
          name: "Christophe Mostefaoui - Développeur Web Freelance",
          url: BASE_URL,
        },
        breadcrumb: { "@id": `${pageUrl}/#ariane` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#ariane`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: page.h1, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        url: pageUrl,
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.reponse },
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <section
        className="relative w-full overflow-hidden bg-creme pt-32 sm:pt-36 pb-20 sm:pb-28"
        aria-label={page.h1}
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
              {page.accroche}
            </p>
            <h1 className="hero-display text-foret">
              {page.h1}.
            </h1>
            <p className="hero-body mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-foret/80">
              {page.intro}
            </p>
          </motion.div>

          {/* Sections éditoriales */}
          <ul>
            {page.sections.map((section, index) => (
              <motion.li
                key={section.titre}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + index * 0.08,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="py-8 sm:py-10 border-t border-foret/15"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <span
                    className="text-[12px] font-mono tabular-nums tracking-wider text-foret/70 w-8 flex-shrink-0 pt-1.5"
                    aria-hidden="true"
                  >
                    {["I", "II", "III", "IV"][index]}.
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2
                      className="text-[24px] sm:text-[28px] leading-tight text-foret mb-4"
                    >
                      {section.titre}
                    </h2>
                    <div className="hero-body text-[15px] sm:text-[16px] leading-[1.7] text-foret/80 max-w-2xl space-y-4">
                      {section.paragraphes.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Communes couvertes */}
          <div className="py-8 sm:py-10 border-t border-foret/15">
            <p className="hero-body text-[14px] leading-[1.8] text-foret/75 max-w-2xl flex items-start gap-2.5">
              <MapPin
                className="h-4 w-4 mt-1 flex-shrink-0 text-foret-moyen"
                aria-hidden="true"
              />
              <span>
                <span className="font-medium text-foret/85">
                  J'interviens notamment à :
                </span>{" "}
                {page.communes.join(", ")}, et partout dans les
                Pyrénées-Atlantiques (déplacement gratuit), ainsi qu'à distance
                dans toute la France.
              </span>
            </p>
          </div>

          {/* FAQ locale */}
          <section
            className="py-8 sm:py-10 border-t border-foret/15"
            aria-label={`Questions fréquentes : ${page.ville}`}
          >
            <h2
              className="text-[24px] sm:text-[28px] leading-tight text-foret mb-8"
            >
              Vos questions, mes réponses
            </h2>
            <dl className="space-y-7 max-w-2xl">
              {page.faq.map((item) => (
                <div key={item.question}>
                  <dt className="hero-body font-medium text-[16px] text-foret mb-2">
                    {item.question}
                  </dt>
                  <dd className="hero-body text-[15px] leading-[1.7] text-foret/75">
                    {item.reponse}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Maillage interne : sans ces liens, la page était une impasse pour les robots */}
          <nav
            className="py-8 sm:py-10 border-t border-foret/15"
            aria-labelledby="pour-aller-plus-loin"
          >
            <h2
              id="pour-aller-plus-loin"
              className="text-[24px] sm:text-[28px] leading-tight text-foret mb-6"
            >
              Pour aller plus loin
            </h2>
            <ul className="hero-body max-w-2xl space-y-3 text-[15px] sm:text-[16px] leading-[1.7]">
              {[
                { to: "/services", label: "Le détail de mes services : site vitrine, refonte, référencement" },
                { to: "/realisations", label: "Les sites que j'ai réalisés, tous en ligne" },
                ...page.articles,
              ].map((lien) => (
                <li key={lien.to}>
                  <Link
                    to={lien.to}
                    className="inline-flex min-h-[44px] items-center text-foret underline decoration-foret/40 underline-offset-4 hover:text-foret-moyen hover:decoration-soleil"
                  >
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA final */}
          <div className="pt-10 sm:pt-12 border-t border-foret/15">
            <p className="hero-handwritten text-[19px] sm:text-[22px] text-foret-moyen mb-5">
              parlons de votre projet —
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <LienContact className="hero-cta-primary group inline-flex">
                <span>Demander un devis</span>
                <span className="hero-cta-sub">gratuit · sous 24h</span>
                <ArrowRight
                  className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </LienContact>
              <a
                href="tel:+33679088845"
                className="hero-body group inline-flex items-center gap-2 text-[15px] text-foret/80 hover:text-foret-moyen transition-colors"
              >
                <span className="font-mono tabular-nums border-b border-current/40 pb-0.5 group-hover:border-soleil">
                  06 79 08 88 45
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
