import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { usePauseHorsEcran } from "../../hooks/usePauseHorsEcran";

/**
 * Décor « plateau de tournage » autour de la vidéo de présentation de la page
 * Contact (10/11/2026) : feuille verte décalée derrière le cadre, soleil qui
 * flotte, clap qui claque et ondes sonores sur les grands écrans, halo sur le
 * bouton lecture (prop `halo` de VideoEmbed). CSS dans index.css (section
 * Plateau vidéo). L'état de base de chaque élément est l'image finale : le
 * mode réduit l'affiche telle quelle.
 */
export default function PlateauVideo({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  usePauseHorsEcran(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="plateau relative isolate mx-auto max-w-3xl"
    >
      {/* Soleil derrière le coin haut droit */}
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute -right-6 -top-8 -z-10 w-24 sm:-right-10 sm:-top-12 sm:w-36"
      >
        <circle className="plateau-soleil" cx="50" cy="50" r="48" fill="#F2A25C" />
      </svg>

      {/* Feuille verte décalée, calée sur le cadre 16/9 de la vidéo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 -z-10 aspect-video w-full translate-x-3 translate-y-3 rotate-[1.2deg] rounded-[22px] bg-foret sm:translate-x-5 sm:translate-y-5"
      />

      {/* Clap de cinéma, à gauche (grands écrans seulement) */}
      <svg
        viewBox="0 0 120 110"
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute -left-36 top-[30%] hidden w-28 -rotate-[10deg] xl:block"
      >
        <rect x="10" y="40" width="100" height="64" rx="6" fill="#12312B" />
        <rect x="22" y="56" width="52" height="5" rx="2.5" fill="#C5D3CC" />
        <rect x="22" y="70" width="36" height="5" rx="2.5" fill="#C5D3CC" />
        <rect x="22" y="84" width="60" height="5" rx="2.5" fill="#C5D3CC" />
        <circle className="plateau-rec" cx="94" cy="58" r="5" fill="#F2A25C" />
        {/* Barre fixe */}
        <rect x="10" y="27" width="100" height="13" fill="#F5F1E8" stroke="#12312B" strokeWidth="2" />
        <path d="M24 28 L34 28 L28 39 L18 39 Z M48 28 L58 28 L52 39 L42 39 Z M72 28 L82 28 L76 39 L66 39 Z M96 28 L106 28 L100 39 L90 39 Z" fill="#12312B" />
        {/* Bras articulé : charnière en bas à gauche */}
        <g className="plateau-clap">
          <rect x="10" y="13" width="100" height="13" fill="#F5F1E8" stroke="#12312B" strokeWidth="2" />
          <path d="M18 14 L28 14 L34 25 L24 25 Z M42 14 L52 14 L58 25 L48 25 Z M66 14 L76 14 L82 25 L72 25 Z M90 14 L100 14 L106 25 L96 25 Z" fill="#F2A25C" />
        </g>
      </svg>

      {/* Ondes sonores, à droite (grands écrans seulement) */}
      <svg
        viewBox="0 0 40 80"
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute -right-20 top-[38%] hidden w-10 xl:block"
      >
        {[
          "M8 30 Q16 40 8 50",
          "M16 22 Q30 40 16 58",
          "M24 14 Q44 40 24 66",
        ].map((d, i) => (
          <path
            key={d}
            className="plateau-onde"
            style={{ animationDelay: `${i * 0.25}s` }}
            d={d}
            fill="none"
            stroke="#24594C"
            strokeWidth="4"
            strokeLinecap="round"
          />
        ))}
      </svg>

      {children}
    </motion.div>
  );
}
