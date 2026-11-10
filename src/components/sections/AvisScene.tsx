import { useRef } from "react";
import { usePauseHorsEcran } from "../../hooks/usePauseHorsEcran";

const ETOILE =
  "M0 -11 L3.2 -3.6 L11 -3.4 L4.8 1.6 L6.9 9.4 L0 4.9 L-6.9 9.4 L-4.8 1.6 L-11 -3.4 L-3.2 -3.6 Z";
const ECLAT = "M0 -8 Q1.2 -1.2 8 0 Q1.2 1.2 0 8 Q-1.2 1.2 -8 0 Q-1.2 -1.2 0 -8 Z";

/**
 * Scène du bandeau de la page /avis (10/11/2026) : une bulle d'avis dont les
 * cinq étoiles s'allument une à une (un seul cycle), une seconde bulle et le
 * soleil qui flottent, des éclats qui scintillent. CSS dans index.css
 * (section Avis). L'état de base est l'image finale : le mode réduit
 * l'affiche telle quelle. Décorative, réservée aux grands écrans.
 */
export default function AvisScene() {
  const ref = useRef<SVGSVGElement>(null);
  usePauseHorsEcran(ref);

  return (
    <svg
      ref={ref}
      viewBox="0 0 340 280"
      aria-hidden="true"
      focusable="false"
      className="avis-scene pointer-events-none absolute right-8 top-1/2 hidden w-[340px] -translate-y-1/2 xl:right-0 xl:block xl:w-[360px]"
    >
      {/* Soleil derrière */}
      <circle className="avis-soleil" cx="268" cy="62" r="44" fill="#F2A25C" />

      {/* Bulle du fond, vert moyen, qui flotte */}
      <g className="avis-bulle-fond">
        <g transform="rotate(6 210 170)">
          <rect x="128" y="128" width="170" height="92" rx="18" fill="#24594C" />
          <path d="M262 218 L276 244 L244 218 Z" fill="#24594C" />
          <rect x="148" y="150" width="96" height="8" rx="4" fill="#3E7A68" />
          <rect x="148" y="168" width="124" height="8" rx="4" fill="#3E7A68" />
          <rect x="148" y="186" width="70" height="8" rx="4" fill="#3E7A68" />
        </g>
      </g>

      {/* Bulle principale, crème, avec les cinq étoiles */}
      <g className="avis-bulle">
        <rect x="24" y="58" width="208" height="124" rx="22" fill="#F5F1E8" />
        <path d="M62 180 L52 214 L92 180 Z" fill="#F5F1E8" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${58 + i * 35} 92)`}>
            <path
              className="avis-etoile"
              style={{ animationDelay: `${0.5 + i * 0.16}s` }}
              d={ETOILE}
              fill="#F2A25C"
            />
          </g>
        ))}
        <rect className="avis-ligne" style={{ animationDelay: "1.4s" }} x="46" y="122" width="164" height="8" rx="4" fill="#C5D3CC" />
        <rect className="avis-ligne" style={{ animationDelay: "1.55s" }} x="46" y="140" width="128" height="8" rx="4" fill="#C5D3CC" />
        <rect className="avis-ligne" style={{ animationDelay: "1.7s" }} x="46" y="158" width="92" height="8" rx="4" fill="#3E7A68" />
      </g>

      {/* Éclats */}
      <g transform="translate(30 34)">
        <path className="avis-eclat" d={ECLAT} fill="#F7C08E" />
      </g>
      <g transform="translate(318 150) scale(.8)">
        <path className="avis-eclat" style={{ animationDelay: "1.1s" }} d={ECLAT} fill="#F7C08E" />
      </g>
      <g transform="translate(112 246) scale(.6)">
        <path className="avis-eclat" style={{ animationDelay: "2.2s" }} d={ECLAT} fill="#C5D3CC" />
      </g>
    </svg>
  );
}
