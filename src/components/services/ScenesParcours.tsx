import { useRef, type CSSProperties, type ReactNode } from "react";
import { usePauseHorsEcran } from "../../hooks/usePauseHorsEcran";
import { C } from "../home/ServicesScenes";

/**
 * Scènes des pages dédiées par service (13/11/2026), une par page :
 * chacune montre le parcours que la page explique (contact, commande,
 * continuité d'une refonte, coordonnées cohérentes).
 * Mêmes règles que ServicesScenes : classes « svc-* » (index.css, section
 * Services), transform/opacity uniquement, l'état de BASE est l'image
 * finale lisible (affichée telle quelle en mode réduit), pause hors écran.
 * Décoratives : le texte de la page dit déjà tout (aria-hidden).
 */

/** Décalage de départ d'un élément, lu par les keyframes svc-p1 à svc-p5 */
const depuis = (dx: number, dy = 0, s = 1) =>
  ({ "--dx": `${dx}px`, "--dy": `${dy}px`, "--s": s }) as CSSProperties;

function Scene({ children }: { children: ReactNode }) {
  const ref = useRef<SVGSVGElement>(null);
  usePauseHorsEcran(ref);
  return (
    <svg
      ref={ref}
      viewBox="0 0 360 260"
      aria-hidden="true"
      focusable="false"
      className="svc block h-auto w-full"
    >
      <rect width="360" height="260" fill={C.neige} />
      {children}
    </svg>
  );
}

const legende = { fontSize: 11, fontWeight: 600, fill: C.moyen } as const;

/** Pastille verte cochée : « c'est fait », « c'est vérifié » */
function Coche({ x, y, etape }: { x: number; y: number; etape: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <g className={`svc-p${etape}`} style={depuis(0, 0, 0.4)}>
      <circle cx={x} cy={y} r="10" fill={C.moyen} />
      <path
        d={`M${x - 4.5} ${y} L${x - 1} ${y + 3.5} L${x + 4.5} ${y - 3.5}`}
        stroke={C.blanc}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  );
}

/* 1. Site vitrine : les informations rejoignent la page, puis le bouton d'appel */
export function ParcoursVitrine() {
  const ligne = (y: number, etape: 1 | 2 | 3, dx: number, icone: ReactNode) => (
    <g className={`svc-p${etape}`} style={depuis(dx)}>
      <rect x="144" y={y} width="72" height="30" rx="6" fill={C.neige} />
      <circle cx="159" cy={y + 15} r="8.5" fill={C.moyen} />
      {icone}
      <rect x="174" y={y + 9} width="34" height="4" rx="2" fill={C.clair} />
      <rect x="174" y={y + 17} width="22" height="4" rx="2" fill={C.brume} />
    </g>
  );
  return (
    <Scene>
      {/* Téléphone */}
      <rect x="128" y="24" width="104" height="220" rx="18" fill={C.foret} opacity="0.1" />
      <rect x="128" y="18" width="104" height="220" rx="18" fill={C.foret} />
      <rect x="135" y="26" width="90" height="204" rx="12" fill={C.blanc} />
      <rect x="135" y="26" width="90" height="26" rx="12" fill={C.moyen} />
      <rect x="135" y="42" width="90" height="10" fill={C.moyen} />
      <rect x="144" y="35" width="34" height="6" rx="3" fill={C.soleilClair} />

      {ligne(
        62,
        1,
        -56,
        <g>
          <rect x="155" y="74" width="8" height="2" rx="1" fill={C.blanc} />
          <rect x="155" y="78" width="8" height="2" rx="1" fill={C.blanc} />
        </g>,
      )}
      {ligne(
        100,
        2,
        56,
        <path d="M159 121 C155.5 116.5 154.5 114.5 154.5 113 A4.5 4.5 0 0 1 163.5 113 C163.5 114.5 162.5 116.5 159 121 Z" fill={C.blanc} />,
      )}
      {ligne(
        138,
        3,
        -56,
        <path d="M159 148.5 V153 H162.5" stroke={C.blanc} strokeWidth="1.8" strokeLinecap="round" fill="none" />,
      )}

      {/* Bouton d'appel : l'élément orange qui porte le sens */}
      <rect className="svc-p-halo" x="144" y="184" width="72" height="30" rx="15" fill="none" stroke={C.soleil} strokeWidth="2" />
      <g className="svc-p4" style={depuis(0, 0, 0.7)}>
        <rect x="144" y="184" width="72" height="30" rx="15" fill={C.soleil} />
        <rect x="160" y="197" width="40" height="4" rx="2" fill={C.foret} />
      </g>

      {/* Légendes fixes */}
      <text x="118" y="81" textAnchor="end" {...legende}>Vos services</text>
      <text x="242" y="119" {...legende}>Votre secteur</text>
      <text x="118" y="157" textAnchor="end" {...legende}>Vos horaires</text>
      <text x="242" y="203" {...legende}>Vous joindre</text>
    </Scene>
  );
}

/* 2. Boutique : une même commande passe du panier au paiement, puis à l'envoi */
export function ParcoursBoutique() {
  const carte = (cx: number) => (
    <g>
      <rect x={cx - 44} y="52" width="88" height="104" rx="10" fill={C.foret} opacity="0.08" />
      <rect x={cx - 44} y="48" width="88" height="104" rx="10" fill={C.blanc} />
    </g>
  );
  return (
    <Scene>
      {/* Liaisons entre les trois étapes */}
      <path d="M116 100 H136 M224 100 H244" stroke={C.brume} strokeWidth="2" strokeDasharray="4 4" />

      {/* Panier : un bijou et son bouton d'achat */}
      {carte(72)}
      <rect x="40" y="60" width="64" height="50" rx="6" fill={C.neige} />
      <circle cx="72" cy="90" r="11" fill="none" stroke={C.soleil} strokeWidth="4" />
      <circle cx="72" cy="77" r="4" fill={C.soleilClair} />
      <rect x="40" y="120" width="64" height="16" rx="8" fill={C.foret} />
      <rect x="54" y="126" width="36" height="4" rx="2" fill={C.creme} />

      {/* Paiement : la carte bancaire */}
      {carte(180)}
      <rect x="148" y="68" width="64" height="42" rx="6" fill={C.moyen} />
      <rect x="148" y="78" width="64" height="8" fill={C.foret} />
      <rect x="156" y="93" width="13" height="10" rx="2" fill={C.soleilClair} />
      <rect x="176" y="96" width="28" height="4" rx="2" fill={C.brume} />
      <rect x="148" y="122" width="40" height="5" rx="2.5" fill={C.brume} />
      <rect x="148" y="132" width="26" height="5" rx="2.5" fill={C.brume} />

      {/* Expédition : le colis et son étiquette */}
      {carte(288)}
      <rect x="260" y="70" width="56" height="48" rx="4" fill={C.soleilClair} />
      <rect x="283" y="70" width="10" height="48" fill={C.soleil} />
      <rect x="297" y="94" width="16" height="14" rx="2" fill={C.blanc} />
      <rect x="300" y="98" width="10" height="2" rx="1" fill={C.foret} />
      <rect x="300" y="102" width="7" height="2" rx="1" fill={C.foret} />
      <rect x="260" y="128" width="40" height="5" rx="2.5" fill={C.brume} />

      <Coche x={110} y={52} etape={1} />
      <Coche x={218} y={52} etape={3} />
      <Coche x={326} y={52} etape={5} />

      <text x="72" y="176" textAnchor="middle" {...legende}>Panier</text>
      <text x="180" y="176" textAnchor="middle" {...legende}>Paiement</text>
      <text x="288" y="176" textAnchor="middle" {...legende}>Expédition</text>

      {/* La commande avance sur sa ligne, d'une étape à l'autre */}
      <path d="M72 212 H288" stroke={C.brume} strokeWidth="3" strokeLinecap="round" />
      {[72, 180, 288].map((cx) => (
        <circle key={cx} cx={cx} cy="212" r="5" fill={C.blanc} stroke={C.brume} strokeWidth="2" />
      ))}
      <g className="svc-p-commande">
        <circle cx="288" cy="212" r="10" fill={C.soleil} />
        <circle cx="288" cy="212" r="3.5" fill={C.blanc} />
      </g>
    </Scene>
  );
}

/* 3. Refonte : chaque ancienne page retrouve sa place, l'onglet orange est conservé */
export function ParcoursRefonte() {
  const ys = [44, 110, 176];
  return (
    <Scene>
      <text x="76" y="30" textAnchor="middle" {...legende}>Avant</text>
      <text x="284" y="30" textAnchor="middle" {...legende}>Après</text>

      {/* Anciennes pages : tassées, de travers, puis estompées */}
      <g className="svc-p-ancien">
        {ys.map((y, i) => (
          <g key={y} transform={`rotate(${[-3, 2.5, -2][i]} 76 ${y + 27})`}>
            <rect x="28" y={y} width="96" height="54" rx="3" fill={C.blanc} stroke={C.brume} strokeWidth="1.5" />
            <rect x="34" y={y + 7} width="26" height="7" rx="1.5" fill={C.soleil} />
            {[20, 27, 34, 41].map((dy) => (
              <rect key={dy} x="34" y={y + dy} width={dy === 41 ? 52 : 84} height="3" rx="1.5" fill={C.brume} />
            ))}
          </g>
        ))}
      </g>

      {/* Correspondances : une ancienne adresse, une nouvelle page */}
      {ys.map((y, i) => (
        <g key={y} className={`svc-p${i + 2}`} style={depuis(-28)}>
          <path d={`M134 ${y + 27} H222`} stroke={C.clair} strokeWidth="2" strokeDasharray="5 4" />
          <path d={`M216 ${y + 21} L224 ${y + 27} L216 ${y + 33}`} stroke={C.clair} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      ))}

      {/* Nouvelles pages : aérées, alignées, l'onglet orange au même endroit */}
      {ys.map((y, i) => (
        <g key={y} className={`svc-p${i + 2}`} style={depuis(-22)}>
          <rect x="236" y={y + 4} width="96" height="54" rx="8" fill={C.foret} opacity="0.08" />
          <rect x="236" y={y} width="96" height="54" rx="8" fill={C.blanc} />
          <rect x="244" y={y + 8} width="26" height="7" rx="3.5" fill={C.soleil} />
          <rect x="244" y={y + 23} width="60" height="5" rx="2.5" fill={C.clair} />
          <rect x="244" y={y + 33} width="42" height="5" rx="2.5" fill={C.brume} />
          <rect x="296" y={y + 38} width="28" height="9" rx="4.5" fill={C.foret} />
        </g>
      ))}

      <Coche x={332} y={26} etape={5} />
    </Scene>
  );
}

/* 4. Référencement local : la fiche et le site affichent les mêmes coordonnées */
export function ParcoursLocal() {
  const ys = [120, 150, 180];
  const lignes = (x: number) =>
    ys.map((y, i) => (
      <g key={y}>
        <circle cx={x + 16} cy={y} r="6" fill={i === 0 ? C.soleil : C.brume} />
        <rect x={x + 28} y={y - 3} width={[70, 58, 64][i]} height="6" rx="3" fill={i === 0 ? C.foret : C.clair} />
      </g>
    ));
  return (
    <Scene>
      <text x="90" y="32" textAnchor="middle" {...legende}>Votre fiche Google</text>
      <text x="270" y="32" textAnchor="middle" {...legende}>Votre site</text>

      {/* Fiche d'établissement : la carte et son repère */}
      <rect x="24" y="46" width="132" height="166" rx="10" fill={C.foret} opacity="0.08" />
      <rect x="24" y="42" width="132" height="166" rx="10" fill={C.blanc} />
      <rect x="32" y="50" width="116" height="48" rx="6" fill={C.neige} />
      <path d="M32 84 L60 70 L86 82 L112 64 L148 78 V92 A6 6 0 0 1 142 98 H38 A6 6 0 0 1 32 92 Z" fill={C.brume} />
      <circle className="svc-p-halo" cx="90" cy="70" r="9" fill="none" stroke={C.soleil} strokeWidth="2" />
      <path d="M90 86 C83 77 81 73.5 81 70 A9 9 0 0 1 99 70 C99 73.5 97 77 90 86 Z" fill={C.soleil} />
      <circle cx="90" cy="70" r="3.4" fill={C.blanc} />
      {lignes(24)}

      {/* Page du site */}
      <rect x="204" y="46" width="132" height="166" rx="10" fill={C.foret} opacity="0.08" />
      <rect x="204" y="42" width="132" height="166" rx="10" fill={C.blanc} />
      <rect x="204" y="42" width="132" height="18" rx="10" fill={C.creme} />
      <rect x="204" y="52" width="132" height="8" fill={C.creme} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={216 + i * 9} cy="51" r="2.6" fill={C.brume} />
      ))}
      <rect x="212" y="68" width="116" height="30" rx="6" fill={C.moyen} />
      <rect x="222" y="78" width="56" height="5" rx="2.5" fill={C.soleilClair} />
      <rect x="222" y="87" width="38" height="4" rx="2" fill={C.clair} />
      {lignes(204)}

      {/* Chaque information est vérifiée des deux côtés */}
      {ys.map((y, i) => (
        <g key={y}>
          <path d={`M160 ${y} H200`} stroke={C.brume} strokeWidth="2" strokeDasharray="3 4" />
          <Coche x={180} y={y} etape={(i + 2) as 2 | 3 | 4} />
        </g>
      ))}

      <text x="180" y="236" textAnchor="middle" {...legende}>Nom, téléphone, horaires : identiques</text>
    </Scene>
  );
}

/* 5. Application sur mesure : le même outil au bureau et sur le téléphone */
export function ParcoursApplication() {
  const ys = [68, 98, 128];
  return (
    <Scene>
      <text x="134" y="22" textAnchor="middle" {...legende}>Au bureau</text>
      <text x="290" y="74" textAnchor="middle" {...legende}>Sur téléphone</text>

      {/* Fenêtre de l'application */}
      <rect x="24" y="34" width="220" height="190" rx="10" fill={C.foret} opacity="0.08" />
      <rect x="24" y="30" width="220" height="190" rx="10" fill={C.blanc} />
      <rect x="24" y="30" width="220" height="24" rx="10" fill={C.foret} />
      <rect x="24" y="44" width="220" height="10" fill={C.foret} />
      <rect x="34" y="38" width="34" height="7" rx="3.5" fill={C.soleilClair} />
      <rect x="24" y="54" width="50" height="166" fill={C.creme} />
      <rect x="24" y="210" width="50" height="10" rx="5" fill={C.creme} />
      {[68, 84, 100, 116].map((y, i) => (
        <rect key={y} x="33" y={y} width="32" height="6" rx="3" fill={i === 0 ? C.moyen : C.brume} />
      ))}
      {ys.map((y, i) => (
        <g key={y} className={`svc-p${i + 1}`} style={depuis(0, 10)}>
          <rect x="86" y={y} width="146" height="22" rx="5" fill={C.neige} />
          <circle cx="98" cy={y + 11} r="4.5" fill={i === 0 ? C.soleil : C.clair} />
          <rect x="110" y={y + 8} width={[58, 46, 52][i]} height="6" rx="3" fill={C.clair} />
          <rect x="196" y={y + 6} width="28" height="10" rx="5" fill={i === 0 ? C.soleilClair : C.brume} />
        </g>
      ))}
      <rect x="86" y="176" width="64" height="20" rx="10" fill={C.soleil} />
      <rect x="100" y="184" width="36" height="4" rx="2" fill={C.foret} />

      {/* Le même contenu arrive sur le téléphone */}
      <rect x="236" y="90" width="96" height="160" rx="15" fill={C.foret} opacity="0.1" />
      <rect x="236" y="84" width="96" height="160" rx="15" fill={C.foret} />
      <rect x="242" y="91" width="84" height="146" rx="10" fill={C.blanc} />
      <rect x="250" y="100" width="30" height="6" rx="3" fill={C.soleilClair} />
      {[116, 142, 168].map((y, i) => (
        <g key={y} className={`svc-p${i + 2}`} style={depuis(-34)}>
          <rect x="249" y={y} width="70" height="20" rx="5" fill={C.neige} />
          <circle cx="259" cy={y + 10} r="4" fill={i === 0 ? C.soleil : C.clair} />
          <rect x="268" y={y + 7} width={[40, 32, 36][i]} height="6" rx="3" fill={C.clair} />
        </g>
      ))}
      <rect x="249" y="204" width="70" height="20" rx="10" fill={C.soleil} />
      <rect x="266" y="212" width="36" height="4" rx="2" fill={C.foret} />

      <Coche x={332} y={88} etape={5} />
    </Scene>
  );
}
