import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";

/**
 * Bloc « avis Google » : preuve sociale + lien humain vers la fiche
 * Google Business Profile (jusqu'ici, seul le JSON-LD d'index.html la
 * connaissait via sameAs/hasMap).
 *
 * Pas de JSON-LD ici : l'aggregateRating et le Review sont déjà déclarés
 * dans le ProfessionalService #business d'index.html. Les redéclarer
 * créerait une entité concurrente (voir CLAUDE.md).
 *
 * Contenu strictement issu de la vraie fiche (Place ID
 * ChIJlTa-96dvUigRyeCBbLb8qkw) : aucun avis inventé, aucune statistique
 * fabriquée.
 */

const GOOGLE_PROFILE_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJlTa-96dvUigRyeCBbLb8qkw";

const RATING = 5;
const REVIEW_COUNT = 1;

const review = {
  author: "Stacy Menendez",
  date: "août 2026",
  body: "Christophe est un excellent développeur web. Je tiens à le remercier pour son honnêteté, sa patience, sa disponibilité et son amabilité. Il accompagne véritablement ses clients du début jusqu'à la fin de leur projet, avec sérieux.",
};

const Stars = ({ count }: { count: number }) => (
  <span className="inline-flex items-center gap-0.5" aria-hidden="true">
    {Array.from({ length: count }, (_, i) => (
      <Star
        key={i}
        className="h-3.5 w-3.5 fill-[#F4D35E] text-[#F4D35E]"
        strokeWidth={1.5}
      />
    ))}
  </span>
);

const GoogleReviews = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
    className="mb-14 sm:mb-16"
  >
    <p className="hero-handwritten text-[16px] sm:text-[18px] text-[#1A1715]/55 dark:text-[#F4EFE6]/55 mb-6">
      ↳ ce qu'on en dit sur Google
    </p>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Note globale */}
      <div className="lg:col-span-4">
        <div className="flex items-baseline gap-3">
          <span
            style={{
              fontFamily: '"Fraunces", "Times New Roman", serif',
              fontWeight: 500,
            }}
            className="text-[52px] sm:text-[64px] leading-none tabular-nums text-[#1A1715] dark:text-[#F4EFE6]"
          >
            {RATING.toLocaleString("fr-FR", { minimumFractionDigits: 1 })}
          </span>
          <span className="hero-body text-[15px] text-[#1A1715]/45 dark:text-[#F4EFE6]/45">
            / 5
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2.5">
          <Stars count={RATING} />
          <p className="hero-body text-[13px] text-[#1A1715]/55 dark:text-[#F4EFE6]/55">
            {REVIEW_COUNT} avis vérifié
          </p>
        </div>

        <a
          href={GOOGLE_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-body group mt-5 inline-flex items-center gap-1.5 text-[14px] text-[#1A1715]/80 dark:text-[#F4EFE6]/80 hover:text-[#F4D35E] transition-colors"
          aria-label="voir la fiche Google de Christophe Mostefaoui (nouvel onglet)"
          data-testid="google_profile_link"
        >
          <span className="border-b border-current/30 pb-0.5 group-hover:border-[#F4D35E]">
            voir la fiche Google
          </span>
          <ArrowUpRight
            className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </div>

      {/* Avis */}
      <figure className="lg:col-span-8 border-l-2 border-[#F4D35E] pl-6 sm:pl-8">
        <blockquote
          style={{
            fontFamily: '"Fraunces", "Times New Roman", serif',
            fontStyle: "italic",
            fontWeight: 400,
          }}
          className="text-[19px] sm:text-[22px] leading-[1.55] text-[#1A1715]/90 dark:text-[#F4EFE6]/90"
        >
          « {review.body} »
        </blockquote>
        <figcaption className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="hero-body text-[14px] text-[#1A1715] dark:text-[#F4EFE6]">
            {review.author}
          </span>
          <span
            className="h-px w-5 bg-[#1A1715]/25 dark:bg-[#F4EFE6]/25"
            aria-hidden="true"
          />
          <span className="hero-body text-[13px] text-[#1A1715]/50 dark:text-[#F4EFE6]/50">
            avis Google, {review.date}
          </span>
        </figcaption>
      </figure>
    </div>
  </motion.div>
);

export default GoogleReviews;
