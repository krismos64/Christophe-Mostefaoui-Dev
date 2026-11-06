import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts, type BlogPost } from "../../data/blogPosts";
import { useNavigation } from "../../hooks/useNavigation";
import OptimizedPicture from "../common/OptimizedPicture";

/*
 * Page /blog (refonte du 06/11/2026, avis Codex) : un article à la une en
 * grand, puis une grille de cartes illustrées par les images éditoriales
 * déjà produites pour chaque article. Le h1 est porté par PageHero (Blog.tsx).
 * L'article à la une est visible dès le premier rendu (jamais d'opacity: 0
 * au départ, cf. CLAUDE.md, LCP) ; seules les cartes sous la ligne de
 * flottaison apparaissent au défilement.
 */

const categories: Record<BlogPost["category"], string> = {
  "veille-tech": "Veille technologique",
  "ia-pratique": "IA accessible",
  "conseils-business": "Conseils business",
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const focus =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[4px] focus-visible:outline-foret";

function Meta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-foret/70">
      <time dateTime={post.publishedAt} className="font-mono tabular-nums">
        {formatDate(post.publishedAt)}
      </time>
      <span className="flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        {post.readTime} min de lecture
      </span>
    </div>
  );
}

function Categorie({ post }: { post: BlogPost }) {
  return (
    <span className="inline-flex rounded-full bg-soleil/25 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-foret">
      {categories[post.category]}
    </span>
  );
}

/** Article à la une : grande image et titre, visible dès le premier rendu */
function ALaUne({ post }: { post: BlogPost }) {
  return (
    <article className="blog-une group relative grid overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_-40px_rgba(18,49,43,0.45)] ring-1 ring-foret/10 md:grid-cols-[1.15fr_1fr]">
      <div className="relative overflow-hidden">
        <OptimizedPicture
          src={post.imageUrl}
          alt={post.imageAlt}
          widths={[400, 800]}
          sizes="(max-width: 768px) 100vw, 55vw"
          width={1672}
          height={941}
          loading="eager"
          fetchPriority="high"
          className="aspect-[16/9] h-full w-full object-cover transition-transform duration-700 ease-out md:aspect-auto [@media(hover:hover)]:group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-foret px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-creme">
          <span className="blog-point relative inline-flex h-2 w-2 rounded-full bg-soleil" aria-hidden="true" />
          À la une
        </span>
      </div>
      <div className="flex flex-col justify-center gap-4 p-6 sm:p-10">
        <Categorie post={post} />
        <h2 className="text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em] text-foret sm:text-[34px]">
          <Link
            to={`/blog/${post.slug}`}
            className={`rounded-sm decoration-soleil decoration-[3px] underline-offset-[6px] after:absolute after:inset-0 group-hover:underline ${focus}`}
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-[16px] leading-[1.7] text-foret/75 sm:text-[17px]">{post.excerpt}</p>
        <Meta post={post} />
        <span className="inline-flex items-center gap-2 text-[15px] font-bold text-foret" aria-hidden="true">
          Lire l'article
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

/** Carte de la grille : image 16:9, catégorie, titre, extrait, date */
function Carte({ post }: { post: BlogPost }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-[22px] bg-white ring-1 ring-foret/10 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_40px_-28px_rgba(18,49,43,0.45)]"
    >
      <div className="relative overflow-hidden">
        <OptimizedPicture
          src={post.imageUrl}
          alt=""
          widths={[400, 800]}
          sizes="(max-width: 768px) 100vw, 45vw"
          width={1672}
          height={941}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-[1.05]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <Categorie post={post} />
        </div>
        <h2 className="text-[21px] font-bold leading-tight text-foret sm:text-[23px]">
          <Link
            to={`/blog/${post.slug}`}
            className={`rounded-sm decoration-soleil decoration-[3px] underline-offset-[5px] after:absolute after:inset-0 group-hover:underline ${focus}`}
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-[15px] leading-[1.65] text-foret/75">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-2">
          <Meta post={post} />
          <ArrowRight
            className="h-4 w-4 flex-shrink-0 text-foret/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foret"
            aria-hidden="true"
          />
        </div>
      </div>
    </motion.li>
  );
}

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState<BlogPost["category"] | null>(null);
  const { handleNavigation } = useNavigation();

  const sortedPosts = [...blogPosts].sort((a, b) =>
    a.featured === b.featured ? 0 : a.featured ? -1 : 1
  );
  const filtres = Object.entries(categories) as [BlogPost["category"], string][];

  // Sans filtre : la une, puis la grille. Avec filtre : la grille seule.
  const une = activeCategory ? null : sortedPosts[0];
  const grille = activeCategory
    ? sortedPosts.filter((post) => post.category === activeCategory)
    : sortedPosts.slice(1);

  const bouton = (actif: boolean) =>
    `min-h-[40px] rounded-full px-4 text-[14px] font-semibold transition-colors ${focus} ${
      actif ? "bg-foret text-creme" : "bg-white text-foret ring-1 ring-foret/15 hover:ring-foret/40"
    }`;

  return (
    <section aria-label="Articles du blog" className="relative w-full bg-creme pb-20 pt-10 font-display sm:pb-28 sm:pt-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {une && <ALaUne post={une} />}

        {/* Sommaire par catégorie */}
        <div
          role="group"
          aria-label="Filtrer les articles par catégorie"
          className="mb-8 mt-14 flex flex-wrap gap-2.5 sm:mt-16"
        >
          <button
            type="button"
            aria-pressed={activeCategory === null}
            onClick={() => setActiveCategory(null)}
            className={bouton(activeCategory === null)}
          >
            Tous les articles
          </button>
          {filtres.map(([key, name]) => (
            <button
              type="button"
              key={key}
              aria-pressed={activeCategory === key}
              onClick={() => setActiveCategory(key)}
              className={bouton(activeCategory === key)}
            >
              {name}
            </button>
          ))}
        </div>

        <ul key={activeCategory ?? "tous"} className="blog-grille grid gap-6 md:grid-cols-2 lg:gap-8">
          {grille.map((post) => (
            <Carte key={post.id} post={post} />
          ))}
        </ul>

        {/* CTA de bas de page */}
        <div className="mt-16 flex flex-col gap-6 rounded-[28px] bg-foret p-8 text-creme sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-soleil">
              Une question, un projet
            </p>
            <p className="mt-2 max-w-md text-[22px] font-bold leading-snug sm:text-[26px]">
              Un article vous a fait penser à votre site ? Parlons-en.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <button
              type="button"
              onClick={() => handleNavigation("/contact")}
              className="hero-cta-primary group inline-flex"
            >
              <span>Demander un devis</span>
              <span className="hero-cta-sub">gratuit · sous 24h</span>
              <ArrowRight
                className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
            <a
              href="mailto:christophe.mostefaoui.dev@gmail.com"
              className="text-[15px] text-creme/80 underline underline-offset-4 hover:text-soleil"
            >
              Ou écrivez-moi directement
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
