import { useRef, type CSSProperties } from "react";
import { usePauseHorsEcran } from "../../hooks/usePauseHorsEcran";

/**
 * « Proche, ou à distance » en motion design (05/11/2026) : une voiture
 * roule de Bayonne à Pau en passant par Orthez et Artix, puis un signal
 * part de Pau vers un écran de visio « France entière ». Tout en SVG dans
 * la page, rien à télécharger. Les pulsations sont en CSS (index.css,
 * section Trajet), les trajets en <animateMotion>, pilotés par
 * usePauseHorsEcran (pause hors écran et en mode animations réduites).
 */

const ROUTE = "M66 118 C100 96 140 96 168 106 C196 116 206 128 226 128 C246 128 258 140 282 150";
const SIGNAL = "M282 150 C296 128 288 100 302 82";

const villes = [
  { nom: "Bayonne", x: 66, y: 118, lx: 66, ly: 100, ancre: "middle" },
  { nom: "Orthez", x: 168, y: 106, lx: 168, ly: 88, ancre: "middle" },
  { nom: "Artix", x: 226, y: 128, lx: 226, ly: 150, ancre: "middle" },
  { nom: "Pau", x: 282, y: 150, lx: 282, ly: 172, ancre: "middle" },
] as const;

const police = "Bricolage Grotesque, sans-serif";

export default function TrajetAnime({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  usePauseHorsEcran(ref);

  return (
    <div className={`overflow-hidden rounded-[24px] shadow-[0_30px_60px_-30px_rgba(18,49,43,0.5)] ${className}`}>
      <svg
        ref={ref}
        viewBox="0 0 400 300"
        role="img"
        aria-label="Illustration animée : une voiture roule de Bayonne à Pau en passant par Orthez et Artix, au pied des Pyrénées, puis un signal part de Pau vers un écran de visioconférence pour la France entière"
        className="trajet block h-full w-full"
      >
        <rect width="400" height="300" fill="#12312B" />

        {/* Océan et vagues */}
        <path d="M0 0 H46 C38 60 54 120 42 180 C34 230 48 270 42 300 H0 Z" fill="#24594C" />
        {[70, 130, 190].map((y, i) => (
          <path
            key={y}
            className="trajet-vague"
            style={{ "--i": i } as CSSProperties}
            d={`M8 ${y} q6 -5 12 0 q6 5 12 0`}
            fill="none"
            stroke="#C5D3CC"
            strokeOpacity="0.5"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}

        {/* Pyrénées */}
        <path d="M0 300 L0 250 L50 222 L90 240 L140 198 L185 236 L230 194 L280 232 L330 204 L400 238 L400 300 Z" fill="#24594C" />
        <path d="M128 208 L140 198 L153 210 L146 207 L140 212 Z" fill="#E8EFEC" />
        <path d="M218 204 L230 194 L243 206 L236 203 L230 208 Z" fill="#E8EFEC" />
        <path d="M0 300 L0 272 L70 256 L130 270 L200 252 L270 272 L340 258 L400 268 L400 300 Z" fill="#0B2420" />

        {/* Route, villes, voiture et signal, descendus de 25 pour aérer la scène */}
        <g transform="translate(0 25)">
        {/* Route en pointillés */}
        <path d={ROUTE} fill="none" stroke="#E8EFEC" strokeOpacity="0.45" strokeWidth="2.5" strokeDasharray="4 7" strokeLinecap="round" />

        {/* Villes : repères qui pulsent */}
        {villes.map((v, i) => (
          <g key={v.nom}>
            <circle className="trajet-onde" style={{ "--i": i } as CSSProperties} cx={v.x} cy={v.y} r="5" fill="none" stroke="#F2A25C" strokeWidth="2" />
            <circle cx={v.x} cy={v.y} r="5" fill="#F2A25C" />
            <text x={v.lx} y={v.ly} textAnchor={v.ancre} fontSize="12" fontWeight="700" fill="#E8EFEC" fontFamily={police}>
              {v.nom}
            </text>
          </g>
        ))}

        {/* Voiture */}
        <g>
          <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path={ROUTE} keyPoints="0;1;1" keyTimes="0;0.85;1" calcMode="linear" />
          <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.06;0.82;0.9;1" dur="7s" repeatCount="indefinite" />
          <path d="M-6 -6 L-3 -11 H5 L8 -6 Z" fill="#F7C08E" />
          <rect x="-11" y="-6" width="22" height="9" rx="3" fill="#F2A25C" />
          <circle cx="-6" cy="3.5" r="2.8" fill="#0B2420" />
          <circle cx="6" cy="3.5" r="2.8" fill="#0B2420" />
        </g>

        {/* Visio : l'écran et le signal venu de Pau */}
        <path d={SIGNAL} fill="none" stroke="#F2A25C" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="2 5" strokeLinecap="round" />
        <circle r="3.5" fill="#F7C08E">
          <animateMotion dur="2.4s" repeatCount="indefinite" path={SIGNAL} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur="2.4s" repeatCount="indefinite" />
        </circle>
        </g>

        <rect x="290" y="44" width="86" height="62" rx="7" fill="#F5F1E8" />
        <rect x="295" y="49" width="76" height="48" rx="4" fill="#C5D3CC" />
        <circle cx="333" cy="67" r="9" fill="#24594C" />
        <path d="M316 97 Q333 76 350 97 Z" fill="#24594C" />
        <circle className="trajet-direct" cx="302" cy="55" r="2.5" fill="#F2A25C" />
        <rect x="327" y="106" width="12" height="7" fill="#C5D3CC" />
        <rect x="317" y="113" width="32" height="3" rx="1.5" fill="#C5D3CC" />
        <text x="333" y="34" textAnchor="middle" fontSize="12" fontWeight="700" fill="#E8EFEC" fontFamily={police}>
          Visio · France entière
        </text>
      </svg>
    </div>
  );
}
