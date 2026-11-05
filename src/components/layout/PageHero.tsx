import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  surtitre: string;
  titre: ReactNode;
  intro: ReactNode;
  /** Nom de la page dans le fil d'Ariane visible */
  nomCourt: string;
  /** Fond de la section qui suit, pour que la ligne de crête s'y fonde */
  suite?: "creme" | "foret";
  children?: ReactNode;
};

/**
 * En-tête des pages intérieures : bandeau vert, fil d'Ariane, h1 unique
 * de la page, et la ligne de crête du hero de la home en bas (SVG statique).
 */
export default function PageHero({ surtitre, titre, intro, nomCourt, suite = "creme", children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-foret pb-28 pt-32 font-display text-creme sm:pb-32 sm:pt-36">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <nav aria-label="Fil d'Ariane" className="mb-8 text-[14px] text-foret-brume">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="underline-offset-4 hover:text-soleil hover:underline">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-creme">
              {nomCourt}
            </li>
          </ol>
        </nav>
        <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-soleil">
          {surtitre}
        </p>
        <h1 className="max-w-4xl text-[clamp(2.3rem,5.5vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
          {titre}
        </h1>
        <div className="mt-6 max-w-2xl text-[18px] leading-relaxed text-[#D6E0DB]">{intro}</div>
        {children && <div className="mt-8">{children}</div>}
      </div>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-px h-[90px] w-full sm:h-[120px]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path d="M0 120 L0 70 L150 30 L280 60 L420 10 L560 55 L700 20 L860 70 L1000 25 L1150 65 L1300 30 L1440 55 L1440 120 Z" fill={suite === "creme" ? "#24594C" : "#0B2420"} />
        <path d="M0 120 L0 95 L200 70 L380 95 L560 78 L760 102 L960 80 L1160 102 L1320 84 L1440 92 L1440 120 Z" fill={suite === "creme" ? "#F5F1E8" : "#12312B"} />
      </svg>
    </section>
  );
}
