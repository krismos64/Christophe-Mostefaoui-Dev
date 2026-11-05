import { ArrowRight } from "lucide-react";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * Hero « Pied des Pyrénées » (refonte du 05/11/2026, maquette D).
 *
 * Tout le mouvement est en CSS (index.css, section Hero) : rien à attendre
 * côté JavaScript pour afficher le titre. Seule la parallaxe des montagnes
 * passe par ce composant, via deux variables CSS posées sans re-rendu.
 */

// Villes qui ont leur page locale (src/data/localPages.ts)
const villes = [
  { nom: "Pau", to: "/creation-site-internet-pau" },
  { nom: "Orthez et Béarn", to: "/creation-site-internet-orthez-bearn" },
  { nom: "Bayonne", to: "/creation-site-internet-bayonne" },
  { nom: "Biarritz", to: "/creation-site-internet-biarritz" },
];

const motsTitre = ["Des", "sites", "web", "faits", "au", "pied", "des"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallaxe : souris uniquement (pas au doigt), coupée si l'utilisateur
  // a demandé de réduire les animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const autorise = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    if (!autorise.matches) return;

    let frame = 0;
    const bouge = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = section.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width) * 2 - 1;
        const my = ((e.clientY - r.top) / r.height) * 2 - 1;
        section.style.setProperty("--mx", mx.toFixed(3));
        section.style.setProperty("--my", my.toFixed(3));
      });
    };
    const quitte = () => {
      cancelAnimationFrame(frame);
      section.style.setProperty("--mx", "0");
      section.style.setProperty("--my", "0");
    };
    section.addEventListener("pointermove", bouge);
    section.addEventListener("pointerleave", quitte);
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", bouge);
      section.removeEventListener("pointerleave", quitte);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-titre"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-foret font-display text-creme"
    >
      <Montagnes />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-wrap items-center gap-12 px-5 pb-44 pt-28 sm:px-8 sm:pb-52 md:pt-32 lg:gap-14 lg:pb-52">
        <div className="min-w-0 flex-[999_1_520px]">
          <h1
            id="hero-titre"
            className="m-0 font-extrabold tracking-[-0.035em] text-creme"
          >
            <span className="mb-5 block text-[15px] font-medium tracking-normal text-foret-brume sm:text-base">
              Développeur web freelance à Pau et Artix (64)
            </span>
            <span className="block text-[clamp(2.6rem,6.2vw,4.6rem)] leading-[0.98]">
              {motsTitre.map((mot, i) => (
                <span key={mot + i}>
                  <span
                    className="hero-mot"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    {mot}
                  </span>{" "}
                </span>
              ))}
              <span
                className="hero-mot text-soleil"
                style={{ animationDelay: `${motsTitre.length * 0.06}s` }}
              >
                Pyrénées.
              </span>
            </span>
          </h1>

          <div className="hero-apparait">
            <p className="mt-7 max-w-xl text-[18px] leading-relaxed text-[#D6E0DB] sm:text-[19px]">
              Je crée le site internet de votre entreprise : simple à lire sur
              téléphone, facile à trouver sur Google. Un seul interlocuteur, de
              la première maquette à la mise en ligne.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="/#contact"
                onClick={(e) => {
                  const cible = document.getElementById("contact");
                  if (cible) {
                    e.preventDefault();
                    cible.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="group inline-flex min-h-[54px] items-center gap-2.5 rounded-full bg-soleil px-7 text-base font-extrabold text-foret hover:-translate-y-0.5 hover:bg-soleil-clair focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-soleil"
                data-testid="hero_cta_primary"
              >
                Demander un devis gratuit
                <ArrowRight
                  className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="/#portfolio"
                onClick={(e) => {
                  const cible = document.getElementById("portfolio");
                  if (cible) {
                    e.preventDefault();
                    cible.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-flex min-h-[44px] items-center text-base font-medium text-creme underline decoration-creme/40 underline-offset-[6px] hover:text-soleil hover:decoration-soleil focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-soleil"
                data-testid="hero_cta_portfolio"
              >
                Voir mes réalisations
              </a>
            </div>
            <p className="mt-4 text-[15px] text-foret-brume">
              Réponse sous 24h. Je me déplace gratuitement dans tout le 64.
            </p>

            <nav aria-label="Villes d'intervention" className="mt-7">
              <ul className="flex flex-wrap gap-2.5">
                {villes.map((v) => (
                  <li key={v.to}>
                    <Link
                      to={v.to}
                      className="inline-flex min-h-[44px] items-center rounded-full border border-creme/35 bg-foret/60 px-3.5 text-[14px] text-creme hover:bg-creme hover:text-foret focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-soleil"
                    >
                      Site internet à {v.nom}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <FenetreChantier />
      </div>
    </section>
  );
}

/** Trois plans de montagnes et un soleil, en SVG dans la page (aucune image à télécharger). */
function Montagnes() {
  const svg = "absolute inset-0 h-full w-full";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[200px] sm:h-[240px] lg:h-[270px]"
    >
      <div className="hero-parallaxe absolute inset-0" style={{ "--profondeur": 6 } as CSSProperties}>
        <svg className={`hero-soleil ${svg}`} viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice">
          <circle cx="1180" cy="120" r="60" fill="#F2A25C" />
        </svg>
      </div>
      <div className="hero-parallaxe absolute inset-0" style={{ "--profondeur": 12 } as CSSProperties}>
        <svg className={`hero-plan-1 ${svg}`} viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice">
          <path d="M-40 320 L-40 180 L120 130 L230 160 L360 80 L470 150 L600 100 L720 40 L840 120 L960 80 L1090 140 L1210 95 L1330 150 L1480 120 L1480 320 Z" fill="#3E7A68" />
          <path d="M692 72 L720 40 L750 88 L734 80 L720 90 L706 78 Z" fill="#E8EFEC" />
          <path d="M340 102 L360 80 L383 108 L369 102 L358 110 Z" fill="#E8EFEC" />
        </svg>
      </div>
      <div className="hero-parallaxe absolute inset-0" style={{ "--profondeur": 22 } as CSSProperties}>
        <svg className={`hero-plan-2 ${svg}`} viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice">
          <path d="M-40 320 L-40 220 L150 175 L280 210 L420 150 L560 205 L700 160 L860 220 L1000 170 L1150 215 L1300 175 L1480 205 L1480 320 Z" fill="#24594C" />
        </svg>
      </div>
      <div className="hero-parallaxe absolute inset-0" style={{ "--profondeur": 34 } as CSSProperties}>
        <svg className={`hero-plan-3 ${svg}`} viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice">
          <path d="M-40 320 L-40 270 L200 240 L380 270 L560 248 L760 280 L960 252 L1160 280 L1320 256 L1480 268 L1480 320 Z" fill="#0B2420" />
        </svg>
      </div>
    </div>
  );
}

type BlocProps = {
  retard: number;
  balise?: string;
  className?: string;
  children?: ReactNode;
  rempliClassName?: string;
};

function Bloc({ retard, balise, className = "", children, rempliClassName = "" }: BlocProps) {
  const delai = { animationDelay: `${1.2 + retard * 0.35}s` };
  return (
    <div className={`hero-bloc ${className}`}>
      <span className="hero-trace" style={delai} />
      {balise && (
        <span className="hero-balise" style={delai}>
          {balise}
        </span>
      )}
      <div className={`hero-rempli ${rempliClassName}`} style={delai}>
        {children}
      </div>
    </div>
  );
}

/**
 * Illustration décorative : un site « votre-entreprise.fr » qui se monte
 * bloc par bloc. Masquée aux lecteurs d'écran (aria-hidden) et sur petit
 * téléphone, où elle repousserait le texte trop bas.
 */
function FenetreChantier() {
  return (
    <div
      aria-hidden="true"
      className="hero-fenetre hidden min-w-0 flex-[1_1_420px] overflow-hidden rounded-[14px] border border-[#2F5E52] bg-foret-profond shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] md:block"
    >
      <div className="flex items-center gap-2 border-b border-[#2F5E52] px-4 py-3">
        <span className="h-[11px] w-[11px] rounded-full bg-[#2F5E52]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#2F5E52]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#2F5E52]" />
        <span className="ml-3 flex-1 rounded-md bg-foret px-3 py-1.5 font-mono text-xs text-[#A9C2B8]">
          votre-entreprise.fr
        </span>
      </div>
      <div className="flex flex-col gap-7 bg-creme px-6 pb-7 pt-8">
        <Bloc retard={0} balise="<header>" className="h-9" rempliClassName="flex items-center justify-between px-1">
          <span className="text-[15px] font-extrabold text-foret">Votre entreprise</span>
          <span className="flex gap-3">
            <span className="h-2 w-10 rounded bg-[#C9D6CF]" />
            <span className="h-2 w-10 rounded bg-[#C9D6CF]" />
            <span className="h-2 w-10 rounded bg-[#C9D6CF]" />
          </span>
        </Bloc>
        <div className="flex gap-[18px]">
          <Bloc retard={1} balise="<h1>" className="h-[140px] flex-1" rempliClassName="flex flex-col justify-center gap-3">
            <span className="text-2xl font-extrabold leading-tight text-foret">
              Votre activité, expliquée en clair.
            </span>
            <span className="inline-flex w-max rounded-full bg-foret px-4 py-2.5 text-[13px] font-medium text-creme">
              Prendre rendez-vous
            </span>
          </Bloc>
          <Bloc
            retard={2}
            balise="<img>"
            className="h-[140px] flex-[0_0_36%]"
            rempliClassName="bg-[linear-gradient(170deg,#F2A25C_0%,#F2A25C_35%,#3E7A68_36%,#24594C_70%,#12312B_100%)]"
          />
        </div>
        <div className="flex gap-3.5">
          {[3, 4, 5].map((r) => (
            <Bloc
              key={r}
              retard={r}
              balise={r === 3 ? "<article>" : undefined}
              className="h-[88px] flex-1"
              rempliClassName="bg-white shadow-[0_1px_3px_rgba(18,49,43,0.15)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
