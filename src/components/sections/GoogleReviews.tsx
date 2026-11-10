import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { avisGoogle, FICHE_GOOGLE_URL, LAISSER_AVIS_URL, noteMoyenne } from "../../data/avisGoogle";

/**
 * Corps de la page /avis : bandeau de note et cartes des avis de la fiche
 * Google. Données dans src/data/avisGoogle.ts (source unique, procédure
 * d'ajout en tête de ce fichier).
 *
 * Pas de JSON-LD ici : l'aggregateRating et les Review sont déclarés dans le
 * ProfessionalService #business d'index.html. Les redéclarer créerait une
 * entité concurrente (voir CLAUDE.md).
 *
 * Animations Framer Motion (au défilement, une seule fois) : MotionConfig
 * reducedMotion="user" d'App.tsx les neutralise en mode réduit.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const initiales = (nom: string) =>
  nom
    .split(/\s+/)
    .map((mot) => mot[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** Étoiles qui apparaissent une à une quand le bloc entre dans l'écran */
function Etoiles({ nombre, taille, delai = 0 }: { nombre: number; taille: string; delai?: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <motion.span
          key={i}
          className="inline-flex"
          initial={{ scale: 0.3, opacity: 0, rotate: -40 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 380, damping: 16, delay: delai + i * 0.09 }}
        >
          <Star
            className={`${taille} ${i < nombre ? "fill-soleil text-soleil" : "fill-transparent text-foret/25"}`}
            strokeWidth={1.5}
          />
        </motion.span>
      ))}
    </span>
  );
}

function LienGoogle({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hero-body group inline-flex items-center gap-1.5 text-[15px] text-foret/80 transition-colors hover:text-soleil"
    >
      <span className="border-b border-current/30 pb-0.5 group-hover:border-soleil">{children}</span>
      <ArrowUpRight
        className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
      <span className="sr-only"> (nouvel onglet)</span>
    </a>
  );
}

export default function GoogleReviews() {
  const nombre = avisGoogle.length;
  const note = noteMoyenne.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <section aria-labelledby="avis-titre" className="bg-creme pb-16 pt-12 sm:pb-24 sm:pt-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Bandeau de note */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative isolate overflow-hidden rounded-[28px] bg-white/70 p-7 shadow-[0_30px_60px_-40px_rgba(18,49,43,0.45)] ring-1 ring-foret/10 sm:p-10"
        >
          <div
            aria-hidden="true"
            className="apropos-soleil pointer-events-none absolute -bottom-32 -left-16 -z-10 h-64 w-64 rounded-full bg-soleil/20"
          />
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2
                id="avis-titre"
                className="hero-body text-[13px] font-semibold uppercase tracking-[0.14em] text-foret/70"
              >
                Note sur Google
              </h2>
              <div className="mt-3 flex flex-wrap items-end gap-x-5 gap-y-3">
                <p className="flex items-baseline gap-2">
                  <span className="text-[72px] font-extrabold leading-none tracking-[-0.04em] tabular-nums text-foret sm:text-[88px]">
                    {note}
                  </span>
                  <span className="hero-body text-[17px] text-foret/70">sur 5</span>
                </p>
                <div className="pb-2">
                  <Etoiles nombre={Math.round(noteMoyenne)} taille="h-6 w-6 sm:h-7 sm:w-7" delai={0.3} />
                  <p className="hero-body mt-1.5 text-[14px] text-foret/70">
                    {nombre} avis vérifié{nombre > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
            <ul className="space-y-3 md:text-right">
              <li>
                <LienGoogle href={FICHE_GOOGLE_URL}>Voir les avis sur la fiche Google</LienGoogle>
              </li>
              <li>
                <LienGoogle href={LAISSER_AVIS_URL}>Vous êtes client ? Laisser un avis</LienGoogle>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Cartes des avis, en colonnes : les textes longs et courts s'emboîtent */}
        <ol className="mt-10 gap-8 sm:mt-14 md:columns-2">
          {avisGoogle.map((avis, i) => (
            <motion.li
              key={`${avis.auteur}-${avis.date}`}
              initial={{ opacity: 0, y: 36, rotate: i % 2 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: Math.min(i, 3) * 0.12, ease: EASE }}
              className="mb-8 break-inside-avoid"
            >
              <figure className="group relative isolate h-full overflow-hidden rounded-[24px] bg-white/70 p-7 shadow-[0_24px_50px_-36px_rgba(18,49,43,0.5)] ring-1 ring-foret/10 transition-transform duration-500 ease-out hover:-translate-y-1 sm:p-9">
                {/* Guillemet décoratif */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 right-4 -z-10 select-none text-[150px] font-extrabold leading-none text-soleil/20 transition-transform duration-700 ease-out group-hover:-translate-x-2 group-hover:translate-y-2"
                >
                  »
                </span>
                <p className="flex items-center">
                  <Etoiles nombre={avis.note} taille="h-4 w-4" delai={0.2 + i * 0.12} />
                  <span className="sr-only">{avis.note} étoiles sur 5</span>
                </p>
                <blockquote className="mt-5 space-y-4 text-[18px] leading-[1.6] text-foret/90 sm:text-[19px]">
                  {avis.texte.split("\n\n").map((paragraphe, j, tous) => (
                    <p key={j}>
                      {j === 0 && "« "}
                      {paragraphe}
                      {j === tous.length - 1 && " »"}
                    </p>
                  ))}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3.5 border-t border-foret/10 pt-6">
                  <span
                    aria-hidden="true"
                    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[15px] font-bold ${
                      i % 2 ? "bg-soleil text-foret" : "bg-foret text-creme"
                    }`}
                  >
                    {initiales(avis.auteur)}
                  </span>
                  <span className="flex flex-col">
                    <span className="hero-body text-[16px] font-semibold text-foret">{avis.auteur}</span>
                    <span className="hero-body text-[14px] text-foret/70">avis Google, {avis.date}</span>
                  </span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
