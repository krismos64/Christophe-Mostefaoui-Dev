import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Minus, Plus } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router-dom";
import LienContact from "../components/common/LienContact";
import OptimizedPicture from "../components/common/OptimizedPicture";
import PageHero from "../components/layout/PageHero";
import PageSeo from "../components/seo/PageSeo";
import {
  ParcoursApplication,
  ParcoursBoutique,
  ParcoursLocal,
  ParcoursRefonte,
  ParcoursVitrine,
} from "../components/services/ScenesParcours";
import { allProjects } from "../data/realisations";
import { getServicePage, servicePages } from "../data/servicePages";

const BASE_URL = "https://christophe-dev-freelance.fr";

const scenes = {
  vitrine: ParcoursVitrine,
  boutique: ParcoursBoutique,
  refonte: ParcoursRefonte,
  local: ParcoursLocal,
  application: ParcoursApplication,
};

const ease = [0.16, 1, 0.3, 1] as const;
const zone = { once: true, margin: "-80px" } as const;
const apparait = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: zone,
  transition: { duration: 0.7, ease },
};
const lienSouligne =
  "inline-flex min-h-[44px] items-center gap-1.5 underline decoration-foret/40 underline-offset-4 hover:text-foret-moyen hover:decoration-soleil focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-soleil";

/**
 * Gabarit des pages dédiées par service (13/11/2026). Le contenu vient de
 * src/data/servicePages.ts. Une seule balise <h1> (PageHero), pas de <main>
 * (celui d'App.tsx), FAQ en <details> natif pour rester dans le HTML pré-rendu.
 * Schémas de PAGE uniquement : Service (relié à #business par provider) et FAQPage.
 */
export default function ServiceDetail() {
  const { pathname } = useLocation();
  const page = getServicePage(pathname);
  if (!page) return <Navigate to="/services" replace />;

  const url = `${BASE_URL}/${page.slug}`;
  const Scene = scenes[page.scene];
  const projet = allProjects.find((p) => p.title === page.preuve.projet);
  const autres = servicePages.filter((p) => p.slug !== page.slug);
  const lienExterne = page.preuve.lien.href.startsWith("http");

  const schemas = [
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: page.metaTitle,
      serviceType: page.serviceType,
      description: page.metaDescription,
      url,
      provider: { "@id": `${BASE_URL}/#business` },
      areaServed: [
        { "@type": "City", name: "Pau" },
        { "@type": "AdministrativeArea", name: "Béarn" },
        { "@type": "AdministrativeArea", name: "Pyrénées-Atlantiques" },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      url,
      mainEntity: page.faq.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.reponse },
      })),
    },
  ];

  return (
    <>
      <PageSeo
        chemin={`/${page.slug}`}
        nomCourt={page.nomCourt}
        parent={{ nom: "Services", chemin: "/services" }}
        titre={page.metaTitle}
        description={page.metaDescription}
        schemas={schemas}
      />
      <PageHero
        nomCourt={page.nomCourt}
        parent={{ nom: "Services", to: "/services" }}
        surtitre={page.nomCourt}
        titre={page.h1}
        intro={<p>{page.intro}</p>}
        illustration={<Scene />}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <LienContact className="group inline-flex min-h-[54px] items-center gap-2.5 rounded-full bg-soleil px-7 text-base font-extrabold text-foret hover:-translate-y-0.5 hover:bg-soleil-clair focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-soleil">
            Demander un devis gratuit
            <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </LienContact>
          <a
            href="tel:+33679088845"
            className="inline-flex min-h-[44px] items-center font-mono text-base tabular-nums text-creme underline decoration-creme/40 underline-offset-[6px] hover:text-soleil hover:decoration-soleil focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-soleil"
          >
            06 79 08 88 45
          </a>
        </div>
      </PageHero>

      {/* Pour qui + ce que contient la prestation */}
      <section className="bg-creme py-16 font-display text-foret sm:py-24" aria-labelledby="service-contenu">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <motion.div {...apparait} className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-[26px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[30px]">
              {page.pourQui.titre}
            </h2>
            <ul className="mt-6 space-y-4">
              {page.pourQui.items.map((item) => (
                <li key={item} className="flex gap-3.5 text-[16px] leading-[1.65] text-foret/80 sm:text-[17px]">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-soleil text-foret" aria-hidden="true">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div>
            <motion.h2 {...apparait} id="service-contenu" className="hero-display">
              {page.comprend.titre}
            </motion.h2>
            <ul className="mt-8">
              {page.comprend.items.map((item, i) => (
                <motion.li
                  key={item.titre}
                  {...apparait}
                  transition={{ duration: 0.6, ease, delay: i * 0.06 }}
                  className="group border-t border-foret/15 py-6 transition-colors duration-300 last:border-b hover:border-soleil/70"
                >
                  <h3 className="text-[20px] font-bold leading-tight sm:text-[22px]">
                    {item.titre}
                    <span
                      className="mt-2 block h-[3px] w-10 origin-left scale-x-50 rounded-full bg-soleil transition-transform duration-300 group-hover:scale-x-100"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="mt-3 max-w-2xl text-[16px] leading-[1.65] text-foret/75">{item.texte}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Bloc propre à la page */}
      <section className="bg-foret py-16 font-display text-creme sm:py-24" aria-labelledby="service-propre">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div {...apparait} className="max-w-3xl">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-soleil">
              {page.propre.surtitre}
            </p>
            <h2 id="service-propre" className="hero-display">
              {page.propre.titre}
            </h2>
            <p className="mt-5 text-[17px] leading-[1.7] text-creme/80">{page.propre.intro}</p>
          </motion.div>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.propre.items.map((item, i) => (
              <motion.li
                key={item.titre}
                {...apparait}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                className="rounded-2xl border border-creme/15 bg-foret-profond/60 p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-soleil/70"
              >
                <span className="font-mono text-[13px] tabular-nums tracking-wider text-soleil" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-[19px] font-bold leading-tight">{item.titre}</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-creme/75">{item.texte}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Déroulement : la ligne se trace, les étapes arrivent une à une */}
      <section className="bg-creme py-16 font-display text-foret sm:py-24" aria-labelledby="service-etapes">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <motion.h2 {...apparait} id="service-etapes" className="hero-display">
            Comment ça se passe.
          </motion.h2>
          <ol className="relative mt-12">
            <span className="absolute bottom-3 left-[19px] top-3 w-px bg-foret/15" aria-hidden="true" />
            <motion.span
              className="etapes-trait absolute bottom-3 left-[19px] top-3 w-px bg-soleil"
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={zone}
              transition={{ duration: 1.6, ease }}
            />
            {page.etapes.map((etape, i) => (
              <motion.li
                key={etape.titre}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={zone}
                transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.25 }}
                className="relative flex gap-6 pb-10 last:pb-0"
              >
                <span
                  className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-foret font-mono text-[14px] font-bold tabular-nums text-soleil ring-4 ring-creme"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div className="min-w-0 pt-1.5">
                  <h3 className="text-[20px] font-bold leading-tight sm:text-[22px]">{etape.titre}</h3>
                  <p className="mt-2 max-w-2xl text-[16px] leading-[1.65] text-foret/75">{etape.texte}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Preuve + limite annoncée */}
      <section className="bg-white py-16 font-display text-foret sm:py-24" aria-labelledby="service-preuve">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <motion.div {...apparait}>
            {projet && (
              <a
                href={projet.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mb-7 block aspect-video overflow-hidden rounded-2xl"
                aria-label={`Visiter ${projet.title} (nouvel onglet)`}
              >
                <OptimizedPicture
                  src={projet.image}
                  alt={projet.alt}
                  widths={[400, 800]}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </a>
            )}
            <h2 id="service-preuve" className="text-[26px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[30px]">
              {page.preuve.titre}
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-[1.7] text-foret/80 sm:text-[17px]">{page.preuve.texte}</p>
            <div className="mt-4 flex flex-wrap gap-x-7 text-[16px] font-medium">
              <a
                href={page.preuve.lien.href}
                {...(lienExterne ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={lienSouligne}
              >
                {page.preuve.lien.label}
                {lienExterne && <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
                {lienExterne && <span className="sr-only">(nouvel onglet)</span>}
              </a>
              <Link to="/realisations" className={lienSouligne}>
                Toutes les réalisations
              </Link>
            </div>
          </motion.div>

          <motion.aside
            {...apparait}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="rounded-2xl border-l-4 border-soleil bg-creme p-7 sm:p-9"
          >
            <h2 className="text-[22px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[26px]">
              {page.limites.titre}
            </h2>
            <p className="mt-4 text-[16px] leading-[1.7] text-foret/80 sm:text-[17px]">{page.limites.texte}</p>
          </motion.aside>
        </div>
      </section>

      {/* FAQ du service */}
      <section className="bg-creme py-16 font-display text-foret sm:py-24" aria-labelledby="service-faq">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <h2 id="service-faq" className="hero-display">
            Vos questions sur ce service.
          </h2>
          <ul className="mt-10 border-b border-foret/15">
            {page.faq.map((q) => (
              <li key={q.question} className="group border-t border-foret/15 transition-colors duration-300 hover:border-soleil/70">
                <details className="faq-item group/faq">
                  <summary className="cursor-pointer list-none py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-soleil focus-visible:ring-offset-2 sm:py-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="flex items-start justify-between gap-4 text-left text-[19px] leading-tight sm:text-[22px]">
                      <span>{q.question}</span>
                      <span className="mt-1 flex-shrink-0 text-foret/70" aria-hidden="true">
                        <Plus className="h-5 w-5 group-open/faq:hidden" strokeWidth={1.75} />
                        <Minus className="hidden h-5 w-5 group-open/faq:block" strokeWidth={1.75} />
                      </span>
                    </h3>
                  </summary>
                  <div className="faq-reponse pb-6 pr-8 sm:pb-7">
                    <p className="max-w-3xl text-[16px] leading-[1.7] text-foret/80">{q.reponse}</p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Maillage : articles liés, autres services, devis */}
      <section className="bg-foret py-16 font-display text-creme sm:py-24" aria-labelledby="service-suite">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 id="service-suite" className="hero-display max-w-3xl">
            Pour aller plus loin.
          </h2>
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <nav aria-label="Articles et pages liés">
              <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-soleil">À lire</p>
              <ul className="space-y-1 text-[16px] sm:text-[17px]">
                {page.liens.map((lien) => (
                  <li key={lien.to}>
                    <Link
                      to={lien.to}
                      className="inline-flex min-h-[44px] items-center underline decoration-creme/40 underline-offset-4 hover:text-soleil hover:decoration-soleil focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-soleil"
                    >
                      {lien.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Autres services">
              <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-soleil">Les autres services</p>
              <ul className="space-y-3">
                {autres.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/${s.slug}`}
                      className="group flex items-center justify-between gap-4 rounded-xl border border-creme/15 px-5 py-4 transition-colors hover:border-soleil/70 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-soleil"
                    >
                      <span>
                        <span className="block text-[18px] font-bold">{s.nomCourt}</span>
                        <span className="block text-[15px] text-creme/70">{s.resume}</span>
                      </span>
                      <ArrowRight className="h-5 w-5 flex-shrink-0 text-soleil transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="mt-14 flex flex-col gap-5 border-t border-creme/15 pt-10 sm:flex-row sm:items-center sm:gap-8">
            <LienContact className="hero-cta-primary group inline-flex">
              <span>Demander un devis</span>
              <span className="hero-cta-sub">gratuit · sous 24h</span>
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </LienContact>
            <p className="text-[15px] text-creme/70">Réponse sous 24h. Je me déplace gratuitement dans tout le 64.</p>
          </div>
        </div>
      </section>
    </>
  );
}
