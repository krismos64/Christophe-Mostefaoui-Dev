import { useRef, type CSSProperties } from "react";
import { usePauseHorsEcran } from "../../hooks/usePauseHorsEcran";

/**
 * « Le bureau de Christophe » en motion design (remplace la photo montagne
 * sur la home, 05/11/2026). Tout est en SVG dans la page : rien à télécharger.
 * Animations CSS en transform/opacity (index.css, section Bureau), mises en
 * pause hors de l'écran, coupées si l'utilisateur réduit les animations.
 */

const lignes = [
  { x: 92, l: 52, c: "#F2A25C" },
  { x: 104, l: 88, c: "#E8EFEC" },
  { x: 104, l: 64, c: "#7FA596" },
  { x: 116, l: 76, c: "#E8EFEC" },
  { x: 116, l: 40, c: "#F2A25C" },
  { x: 104, l: 70, c: "#7FA596" },
];

const varI = (i: number) => ({ "--i": i }) as CSSProperties;

export default function BureauAnime({
  className = "",
}: {
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);

  usePauseHorsEcran(ref);

  return (
    <div className={`overflow-hidden ${className}`}>
      <svg
        ref={ref}
        viewBox="0 0 400 500"
        role="img"
        aria-label="Illustration animée : le bureau de Christophe Mostefaoui face aux Pyrénées, un ordinateur portable sur une table en bois et un refuge en pierre dans la vallée"
        className="bureau block h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="bureau-ciel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F2A25C" />
            <stop offset="0.6" stopColor="#F7C08E" />
            <stop offset="1" stopColor="#F5F1E8" />
          </linearGradient>
        </defs>

        {/* Ciel, soleil, nuages, oiseaux */}
        <rect width="400" height="500" fill="url(#bureau-ciel)" />
        <circle
          className="bureau-soleil"
          cx="292"
          cy="140"
          r="44"
          fill="#F5F1E8"
          opacity="0.9"
        />
        <g className="bureau-nuage" fill="#F5F1E8" opacity="0.75">
          <rect x="40" y="88" width="90" height="16" rx="8" />
          <rect x="62" y="76" width="44" height="18" rx="9" />
        </g>
        <g className="bureau-nuage bureau-nuage-2" fill="#F5F1E8" opacity="0.6">
          <rect x="250" y="208" width="70" height="12" rx="6" />
        </g>
        <g
          className="bureau-oiseaux"
          fill="none"
          stroke="#12312B"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M120 150 q6 -6 12 0 q6 -6 12 0" />
          <path d="M150 166 q4 -4 8 0 q4 -4 8 0" />
        </g>

        {/* Montagnes */}
        <path
          d="M0 262 L58 196 L108 228 L176 132 L236 206 L290 166 L346 218 L400 180 L400 500 L0 500 Z"
          fill="#24594C"
        />
        <path
          d="M160 155 L176 132 L194 156 L184 151 L176 160 L168 150 Z"
          fill="#E8EFEC"
        />
        <path d="M48 208 L58 196 L70 210 L62 207 L56 212 Z" fill="#E8EFEC" />
        <path
          d="M0 330 C80 292 150 302 220 282 C292 262 350 292 400 272 L400 500 L0 500 Z"
          fill="#3E7A68"
        />

        {/* Refuge : fenêtre allumée, fumée qui monte */}
        <rect x="230" y="262" width="46" height="30" fill="#A9B5AE" />
        <rect x="266" y="244" width="7" height="14" fill="#0B2420" />
        <path d="M224 265 L253 243 L282 265 Z" fill="#0B2420" />
        <rect x="249" y="275" width="10" height="17" fill="#12312B" />
        <rect
          className="bureau-lueur"
          x="236"
          y="271"
          width="8"
          height="7"
          fill="#F7C08E"
        />
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            className="bureau-fumee"
            style={varI(i)}
            cx="269.5"
            cy="238"
            r="4"
            fill="#F5F1E8"
          />
        ))}

        {/* Panneau qui se balance */}
        <rect x="331" y="334" width="6" height="64" fill="#5B3A22" />
        <g className="bureau-panneau">
          <rect
            x="288"
            y="334"
            width="94"
            height="36"
            rx="4"
            fill="#E9D3B0"
            stroke="#5B3A22"
            strokeWidth="2"
          />
          <text
            x="335"
            y="349"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#12312B"
            fontFamily="Bricolage Grotesque, sans-serif"
          >
            LE BUREAU
          </text>
          <text
            x="335"
            y="362"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#12312B"
            fontFamily="Bricolage Grotesque, sans-serif"
          >
            DE CHRISTOPHE
          </text>
        </g>

        {/* Table */}
        <rect x="0" y="396" width="400" height="104" fill="#8A5A36" />
        <rect x="0" y="396" width="400" height="8" fill="#A06A40" />
        <path d="M0 440 H400 M0 474 H400" stroke="#6E4428" strokeWidth="2" />

        {/* Plante */}
        <g className="bureau-plante">
          <ellipse
            cx="30"
            cy="392"
            rx="7"
            ry="18"
            fill="#12312B"
            transform="rotate(-20 30 392)"
          />
          <ellipse cx="44" cy="388" rx="7" ry="20" fill="#24594C" />
          <ellipse
            cx="57"
            cy="394"
            rx="7"
            ry="16"
            fill="#12312B"
            transform="rotate(22 57 394)"
          />
        </g>
        <path d="M26 404 H62 L58 432 H30 Z" fill="#C5D3CC" />

        {/* Ordinateur : le code s'écrit ligne par ligne */}
        <rect
          x="80"
          y="324"
          width="156"
          height="104"
          rx="7"
          fill="#0B2420"
          stroke="#C5D3CC"
          strokeWidth="4"
        />
        {lignes.map((ligne, i) => (
          <rect
            key={i}
            className="bureau-ligne"
            style={varI(i)}
            x={ligne.x}
            y={340 + i * 13}
            width={ligne.l}
            height="5"
            rx="2.5"
            fill={ligne.c}
          />
        ))}
        <rect
          className="bureau-curseur"
          x="92"
          y="418"
          width="7"
          height="3"
          fill="#F2A25C"
        />
        <path d="M62 430 L254 430 L268 444 L48 444 Z" fill="#C5D3CC" />

        {/* Tasse fumante */}
        <path
          d="M308 420 q12 0 12 10 q0 10 -12 10"
          fill="none"
          stroke="#F5F1E8"
          strokeWidth="4"
        />
        <rect x="280" y="410" width="30" height="36" rx="5" fill="#F5F1E8" />
        {[0, 1].map((i) => (
          <path
            key={i}
            className="bureau-vapeur"
            style={varI(i)}
            d={`M${289 + i * 10} 402 q-5 -8 0 -16 q5 -8 0 -16`}
            fill="none"
            stroke="#F5F1E8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}
