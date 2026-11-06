import { ArrowRight, Bot, Globe, Layers, RefreshCw, Search, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../../data/realisations";
import OptimizedPicture from "../common/OptimizedPicture";
import BureauAnime from "./BureauAnime";

/*
 * Aperçus de la home : chaque bloc résume une page intérieure et y renvoie
 * par un vrai lien (crawlable). Les id des anciennes sections sont gardés
 * (#services, #portfolio, #about) pour ne casser aucun lien existant.
 */

const focus =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px]";

function LienSuite({ to, children, sombre = false }: { to: string; children: string; sombre?: boolean }) {
  return (
    <Link
      to={to}
      className={`group mt-12 inline-flex min-h-[48px] items-center gap-2 text-[17px] font-bold underline decoration-2 underline-offset-[6px] ${focus} ${
        sombre
          ? "text-creme decoration-soleil hover:text-soleil focus-visible:outline-soleil"
          : "text-foret decoration-soleil hover:text-foret-moyen focus-visible:outline-foret"
      }`}
    >
      {children}
      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

const services = [
  { icon: Globe, titre: "Un site vitrine", texte: "Vos services, vos horaires et votre téléphone, en quelques pages claires." },
  { icon: Layers, titre: "Un site plus complet", texte: "Un blog, un formulaire, des pages que vous modifiez vous-même." },
  { icon: RefreshCw, titre: "La refonte de votre site", texte: "Un site daté remis à neuf, en gardant ce qui marche déjà sur Google." },
  { icon: Bot, titre: "Un assistant pour vos clients", texte: "Un chatbot qui répond aux questions courantes, jour et nuit." },
  { icon: Search, titre: "Être trouvé sur Google", texte: "Apparaître quand on cherche votre métier près de chez vous." },
  { icon: Video, titre: "Vidéo et drone", texte: "Vidéos et vues aériennes, par un télépilote certifié DGAC." },
];

export function ApercuServices() {
  return (
    <section id="services" aria-labelledby="apercu-services" className="bg-creme py-20 font-display text-foret sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-foret-moyen">Services</p>
        <h2 id="apercu-services" className="hero-display max-w-3xl">
          Ce que je peux faire pour votre entreprise.
        </h2>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-foret/80">
          Vous me dites ce dont vous avez besoin, je vous dis ce qui est utile et ce qui ne l'est
          pas. Déplacement offert dans tout le 64.
        </p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icone, titre, texte }) => (
            <li
              key={titre}
              className="rounded-2xl border border-foret/10 bg-white p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-soleil/25 text-foret">
                <Icone className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
              </span>
              <h3 className="text-[21px] font-bold leading-tight">{titre}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-foret/75">{texte}</p>
            </li>
          ))}
        </ul>
        <LienSuite to="/services">Voir le détail des services et le déroulement d'un projet</LienSuite>
      </div>
    </section>
  );
}

// Trois projets aux métiers différents : commerce local, santé, édition
const selection = ["Lune-Soleil", "Cabinet Infirmier Graslin", "LivresStaka.fr"];

export function ApercuRealisations() {
  const choisis = selection
    .map((titre) => projects.find((p) => p.title === titre))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section id="portfolio" aria-labelledby="apercu-realisations" className="bg-foret py-20 font-display text-creme sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-soleil">Réalisations</p>
        <h2 id="apercu-realisations" className="hero-display max-w-3xl">
          Des sites qui travaillent pour leurs propriétaires.
        </h2>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-creme/80">
          Une créatrice de bijoux à Artix, un cabinet infirmier, une maison d'édition : quelques-uns
          des sites que j'ai mis en ligne.
        </p>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {choisis.map((p) => (
            <li key={p.title} className="flex flex-col overflow-hidden rounded-2xl bg-foret-profond">
              <OptimizedPicture
                src={p.image}
                alt={p.alt}
                widths={[400, 800]}
                sizes="(max-width: 768px) 100vw, 33vw"
                width={800}
                height={500}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover object-top"
              />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-[22px] font-bold leading-tight">{p.title}</h3>
                <p className="mt-1 text-[14px] text-foret-brume">{p.tags.join(" · ")}</p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto inline-flex min-h-[44px] items-center gap-1.5 pt-4 text-[15px] text-creme underline underline-offset-4 hover:text-soleil ${focus} focus-visible:outline-soleil`}
                >
                  Voir le site en ligne
                  <span className="sr-only"> {p.title} (nouvel onglet)</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
        <LienSuite to="/realisations" sombre>
          Voir toutes les réalisations
        </LienSuite>
      </div>
    </section>
  );
}

export function ApercuAPropos() {
  return (
    <section id="about" aria-labelledby="apercu-apropos" className="bg-creme py-20 font-display text-foret sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <BureauAnime className="aspect-[4/5] w-full rounded-2xl md:max-w-md" />
        <div>
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-foret-moyen">À propos</p>
          <h2 id="apercu-apropos" className="hero-display">
            Un seul interlocuteur, du premier appel à la mise en ligne.
          </h2>
          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-foret/80">
            <p>
              Je m'appelle Christophe Mostefaoui. Après douze ans dans le conseil client en
              multimédia, je crée les sites internet des entreprises du Béarn et du Pays basque,
              depuis Pau et Artix.
            </p>
            <p>
              Je travaille seul, sans agence ni sous-traitant : la personne qui vous répond est
              celle qui crée votre site. J'ai aussi conçu{" "}
              <a
                href="https://smartplanning.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold text-foret underline decoration-soleil decoration-2 underline-offset-4 ${focus} focus-visible:outline-foret`}
              >
                SmartPlanning
              </a>
              , un logiciel en ligne de plannings d'équipe.
            </p>
          </div>
          <LienSuite to="/a-propos">En savoir plus sur mon parcours</LienSuite>
        </div>
      </div>
    </section>
  );
}
