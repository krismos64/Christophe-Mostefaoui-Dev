import { useRef, type ReactNode } from "react";
import { usePauseHorsEcran } from "../../hooks/usePauseHorsEcran";

/**
 * Petites scènes animées des cartes « Ce que je peux faire » (06/11/2026).
 * Concepts proposés par Codex, filtrés puis dessinés en SVG dans la charte.
 * Fil conducteur : dans chaque scène, l'élément orange porte le sens
 * (porte, onglet, repère conservé, veilleuse, adresse, enregistrement).
 * Animations en CSS (index.css, section Services), transform/opacity
 * uniquement, pause hors écran et état fixe lisible en mode réduit.
 * Décoratives : le titre et le texte de la carte disent déjà tout.
 */

const C = {
  foret: "#12312B",
  moyen: "#24594C",
  clair: "#3E7A68",
  brume: "#C5D3CC",
  soleil: "#F2A25C",
  soleilClair: "#F7C08E",
  creme: "#F5F1E8",
  neige: "#E8EFEC",
  blanc: "#FFFFFF",
};

function Scene({ children }: { children: ReactNode }) {
  const ref = useRef<SVGSVGElement>(null);
  usePauseHorsEcran(ref);
  return (
    <svg
      ref={ref}
      viewBox="0 0 280 150"
      aria-hidden="true"
      focusable="false"
      className="svc block h-auto w-full"
    >
      <rect width="280" height="150" fill={C.neige} />
      {children}
    </svg>
  );
}

/** Fenêtre de navigateur commune (cadre blanc, trois points) */
function Navigateur({ x = 40, y = 14, l = 200, h = 122, children }: { x?: number; y?: number; l?: number; h?: number; children?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y + 4} width={l} height={h} rx="10" fill={C.foret} opacity="0.08" />
      <rect x={x} y={y} width={l} height={h} rx="10" fill={C.blanc} />
      <rect x={x} y={y} width={l} height="16" rx="10" fill={C.creme} />
      <rect x={x} y={y + 10} width={l} height="6" fill={C.creme} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 11 + i * 9} cy={y + 8} r="2.6" fill={C.brume} />
      ))}
      {children}
    </g>
  );
}

/* 1. Site vitrine : la boutique ouvre ses volets dans la fenêtre du navigateur */
export function SceneVitrine() {
  return (
    <Scene>
      <Navigateur>
        <defs>
          <clipPath id="svc-vitre">
            <rect x="82" y="66" width="56" height="40" rx="3" />
          </clipPath>
        </defs>
        {/* Façade */}
        <rect x="70" y="44" width="140" height="86" fill={C.creme} />
        <rect x="64" y="38" width="152" height="12" rx="3" fill={C.moyen} />
        {/* Enseigne sans texte */}
        <rect x="112" y="54" width="56" height="7" rx="3.5" fill={C.foret} />
        <rect x="120" y="56.5" width="40" height="2" rx="1" fill={C.soleilClair} />
        {/* Vitrine : lumière puis volet qui remonte */}
        <rect x="82" y="66" width="56" height="40" rx="3" fill={C.brume} />
        <rect className="svc-lueur" x="82" y="66" width="56" height="40" rx="3" fill={C.soleilClair} />
        <g clipPath="url(#svc-vitre)">
          <g className="svc-volet">
            <rect x="82" y="66" width="56" height="40" fill={C.clair} />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x="82" y={70 + i * 8} width="56" height="1.6" fill={C.moyen} />
            ))}
          </g>
        </g>
        {/* Jardinière qui déborde */}
        <rect x="80" y="106" width="60" height="6" rx="2" fill={C.moyen} />
        {[86, 96, 106, 116, 126, 134].map((cx, i) => (
          <circle key={cx} cx={cx} cy={105 - (i % 2) * 2} r="4.5" fill={i % 2 ? C.clair : C.moyen} />
        ))}
        {/* Porte orange */}
        <rect x="156" y="78" width="34" height="52" rx="3" fill={C.soleil} />
        <rect x="162" y="84" width="22" height="20" rx="2" fill={C.soleilClair} />
        <circle cx="184" cy="108" r="1.8" fill={C.foret} />
        <rect x="64" y="128" width="152" height="4" fill={C.brume} />
      </Navigateur>
    </Scene>
  );
}

/* 2. Site plus complet : la page déploie ses fiches blog et formulaire */
export function SceneComplet() {
  return (
    <Scene>
      {/* Fiche blog (à gauche), avec son onglet orange */}
      <g className="svc-fiche-g">
        <rect x="22" y="34" width="70" height="86" rx="8" fill={C.blanc} />
        <rect x="74" y="28" width="9" height="16" rx="2" fill={C.soleil} />
        <rect x="30" y="42" width="54" height="30" rx="4" fill={C.clair} />
        <path d="M30 72 L48 56 L60 66 L70 58 L84 72 Z" fill={C.moyen} />
        <circle cx="74" cy="51" r="4" fill={C.soleilClair} />
        {[80, 89, 98].map((y, i) => (
          <rect key={y} x="30" y={y} width={i === 2 ? 34 : 54} height="4" rx="2" fill={C.brume} />
        ))}
      </g>
      {/* Fiche formulaire (à droite) */}
      <g className="svc-fiche-d">
        <rect x="188" y="34" width="70" height="86" rx="8" fill={C.blanc} />
        {[44, 62, 80].map((y) => (
          <rect key={y} x="196" y={y} width="54" height="11" rx="3" fill={C.neige} stroke={C.brume} />
        ))}
        <rect x="196" y="99" width="34" height="12" rx="6" fill={C.foret} />
      </g>
      {/* Page centrale */}
      <rect x="92" y="18" width="96" height="120" rx="10" fill={C.foret} opacity="0.08" />
      <rect x="92" y="14" width="96" height="120" rx="10" fill={C.blanc} />
      <rect x="92" y="14" width="96" height="22" rx="10" fill={C.foret} />
      <rect x="92" y="28" width="96" height="8" fill={C.foret} />
      <rect x="102" y="22" width="30" height="5" rx="2.5" fill={C.soleilClair} />
      {[46, 56, 66].map((y, i) => (
        <rect key={y} x="102" y={y} width={i === 2 ? 46 : 76} height="5" rx="2.5" fill={C.brume} />
      ))}
      <rect x="102" y="80" width="36" height="26" rx="4" fill={C.neige} />
      <rect x="142" y="80" width="36" height="26" rx="4" fill={C.neige} />
      <rect x="102" y="114" width="44" height="10" rx="5" fill={C.soleil} />
    </Scene>
  );
}

/* 3. Refonte : une page tassée se réorganise, l'onglet orange reste en place */
export function SceneRefonte() {
  return (
    <Scene>
      <Navigateur>
        {/* Avant : blocs serrés et désalignés */}
        <g className="svc-avant">
          <rect x="52" y="40" width="60" height="26" fill={C.brume} />
          <rect x="118" y="38" width="96" height="6" fill={C.brume} />
          <rect x="122" y="48" width="84" height="4" fill={C.brume} />
          <rect x="116" y="56" width="100" height="4" fill={C.brume} />
          <rect x="54" y="74" width="150" height="4" fill={C.brume} />
          <rect x="50" y="82" width="170" height="4" fill={C.brume} />
          <rect x="58" y="90" width="120" height="4" fill={C.brume} />
          <rect x="200" y="118" width="30" height="8" fill={C.clair} />
        </g>
        {/* Après : grande image, titre, texte aéré, bouton bien placé */}
        <g className="svc-apres">
          <rect x="52" y="38" width="176" height="40" rx="6" fill={C.clair} />
          <path d="M52 78 L92 56 L120 70 L150 50 L194 72 L228 60 L228 78 Z" fill={C.moyen} />
          <circle cx="204" cy="50" r="7" fill={C.soleilClair} />
          <rect x="52" y="88" width="90" height="8" rx="4" fill={C.foret} />
          <rect x="52" y="102" width="108" height="4" rx="2" fill={C.brume} />
          <rect x="52" y="110" width="86" height="4" rx="2" fill={C.brume} />
          <rect x="176" y="98" width="52" height="16" rx="8" fill={C.foret} />
        </g>
        {/* Ce qui marche déjà sur Google : conservé tel quel */}
        <rect x="52" y="120" width="26" height="8" rx="4" fill={C.soleil} />
      </Navigateur>
      <g className="svc-etincelle">
        <path d="M244 30 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 Z" fill={C.soleil} />
      </g>
    </Scene>
  );
}

/* 4. Assistant : deux questions courantes, deux réponses, veilleuse allumée */
export function SceneAssistant() {
  return (
    <Scene>
      <rect x="54" y="14" width="172" height="126" rx="12" fill={C.foret} opacity="0.08" />
      <rect x="54" y="10" width="172" height="126" rx="12" fill={C.blanc} />
      <rect x="54" y="10" width="172" height="24" rx="12" fill={C.foret} />
      <rect x="54" y="24" width="172" height="10" fill={C.foret} />
      <rect x="66" y="19" width="40" height="5" rx="2.5" fill={C.brume} />
      <circle className="svc-veilleuse" cx="212" cy="22" r="4" fill={C.soleil} />

      {/* Question 1 : les horaires */}
      <g className="svc-b1">
        <rect x="146" y="42" width="68" height="20" rx="10" fill={C.creme} />
        <circle cx="160" cy="52" r="6" fill="none" stroke={C.foret} strokeWidth="1.6" />
        <path d="M160 48.5 V52 L162.5 53.5" fill="none" stroke={C.foret} strokeWidth="1.6" strokeLinecap="round" />
        <rect x="171" y="50" width="34" height="4" rx="2" fill={C.brume} />
      </g>
      {/* Réponse 1 */}
      <g className="svc-b2">
        <rect x="66" y="66" width="80" height="20" rx="10" fill={C.moyen} />
        <rect x="76" y="74" width="60" height="4" rx="2" fill={C.neige} />
      </g>
      {/* Question 2 : le contact */}
      <g className="svc-b3">
        <rect x="146" y="90" width="68" height="20" rx="10" fill={C.creme} />
        <rect x="154" y="95" width="13" height="10" rx="1.5" fill="none" stroke={C.foret} strokeWidth="1.6" />
        <path d="M154.5 96 L160.5 101 L166.5 96" fill="none" stroke={C.foret} strokeWidth="1.4" />
        <rect x="171" y="98" width="34" height="4" rx="2" fill={C.brume} />
      </g>
      {/* Réponse 2 */}
      <g className="svc-b4">
        <rect x="66" y="114" width="64" height="16" rx="8" fill={C.moyen} />
        <rect x="76" y="120" width="44" height="4" rx="2" fill={C.neige} />
      </g>
    </Scene>
  );
}

/* 5. Être trouvé : une recherche, puis le repère tombe sur la porte orange */
export function SceneGoogle() {
  return (
    <Scene>
      {/* Plan */}
      <rect x="0" y="0" width="280" height="150" fill={C.neige} />
      <path d="M0 108 C70 96 120 118 180 100 S260 88 280 92" fill="none" stroke={C.blanc} strokeWidth="9" />
      <path d="M150 150 C146 120 160 90 154 50" fill="none" stroke={C.blanc} strokeWidth="7" />
      {[
        [26, 64, 34, 24],
        [72, 70, 26, 20],
        [196, 58, 30, 26],
        [234, 112, 30, 22],
        [40, 118, 30, 20],
      ].map(([x, y, l, h]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={l} height={h} rx="3" fill={C.brume} />
      ))}
      {/* Votre établissement */}
      <rect x="104" y="64" width="36" height="28" rx="3" fill={C.creme} stroke={C.clair} strokeWidth="1.5" />
      <path d="M100 66 L122 52 L144 66 Z" fill={C.moyen} />
      <rect x="116" y="76" width="12" height="16" rx="1.5" fill={C.soleil} />
      <circle className="svc-halo" cx="122" cy="82" r="22" fill="none" stroke={C.soleil} strokeWidth="2" />
      {/* Repère */}
      <g className="svc-repere">
        <path d="M122 70 C112 58 110 52 110 47 a12 12 0 0 1 24 0 c0 5 -2 11 -12 23 Z" fill={C.foret} />
        <circle cx="122" cy="47" r="4.5" fill={C.soleil} />
      </g>
      {/* Barre de recherche sans marque */}
      <rect x="40" y="12" width="200" height="26" rx="13" fill={C.foret} opacity="0.08" />
      <rect x="40" y="10" width="200" height="26" rx="13" fill={C.blanc} />
      <circle cx="58" cy="23" r="5.5" fill="none" stroke={C.foret} strokeWidth="1.8" />
      <path d="M62 27 L66 31" stroke={C.foret} strokeWidth="1.8" strokeLinecap="round" />
      <rect className="svc-saisie" x="74" y="20" width="110" height="6" rx="3" fill={C.brume} />
    </Scene>
  );
}

/* 6. Vidéo et drone : le drone survole une ferme, le cadre se resserre, REC */
export function SceneDrone() {
  return (
    <Scene>
      <rect width="280" height="150" fill={C.creme} />
      <circle cx="226" cy="40" r="14" fill={C.soleilClair} />
      {/* Pyrénées */}
      <path d="M0 104 L46 70 L74 88 L118 50 L158 84 L196 60 L240 86 L280 66 L280 150 L0 150 Z" fill={C.brume} />
      <path d="M108 58 L118 50 L129 60 L123 58 L118 62 Z" fill={C.blanc} />
      <path d="M187 67 L196 60 L206 69 L200 67 L196 70 Z" fill={C.blanc} />
      {/* Collines */}
      <path d="M0 118 C60 100 110 112 160 104 S250 96 280 108 L280 150 L0 150 Z" fill={C.clair} />
      <path d="M0 134 C70 124 140 136 210 126 S270 124 280 128 L280 150 L0 150 Z" fill={C.moyen} />
      {/* Grange */}
      <rect x="150" y="94" width="38" height="24" fill={C.creme} />
      <path d="M146 96 L169 80 L192 96 Z" fill={C.foret} />
      <rect x="163" y="104" width="12" height="14" fill={C.moyen} />
      {/* Drone */}
      <g className="svc-drone">
        <rect x="-14" y="-3" width="28" height="7" rx="3.5" fill={C.foret} />
        <path d="M-12 -1 L-20 -6 M12 -1 L20 -6" stroke={C.foret} strokeWidth="2" strokeLinecap="round" />
        <ellipse className="svc-helice" cx="-21" cy="-7" rx="9" ry="1.6" fill={C.foret} opacity="0.55" />
        <ellipse className="svc-helice" cx="21" cy="-7" rx="9" ry="1.6" fill={C.foret} opacity="0.55" />
        <circle cx="0" cy="6" r="2.6" fill={C.moyen} />
      </g>
      {/* Cadre de prise de vue */}
      <g className="svc-cadre" fill="none" stroke={C.foret} strokeWidth="2.5" strokeLinecap="round">
        <path d="M110 62 V54 H120" />
        <path d="M228 62 V54 H218" />
        <path d="M110 120 V128 H120" />
        <path d="M228 120 V128 H218" />
      </g>
      <circle className="svc-rec" cx="122" cy="66" r="3.5" fill={C.soleil} />
    </Scene>
  );
}
