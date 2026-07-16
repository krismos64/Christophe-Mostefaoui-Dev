import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "../../data/blogPosts";
import { useNavigation } from "../../hooks/useNavigation";

const categories = {
  "veille-tech": "Veille technologique",
  "ia-pratique": "IA accessible",
  "conseils-business": "Conseils business",
};

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { handleNavigation } = useNavigation();

  const sortedPosts = [...blogPosts].sort((a, b) =>
    a.featured === b.featured ? 0 : a.featured ? -1 : 1
  );

  const filteredPosts = activeCategory
    ? sortedPosts.filter((post) => post.category === activeCategory)
    : sortedPosts;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  return (
    <section className="relative w-full overflow-hidden bg-[#F4EFE6] dark:bg-[#13110F] pt-32 sm:pt-36 pb-20 sm:pb-28">
      {/* Texture grain papier */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply dark:mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10 max-w-4xl">
        {/* Header édito */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16"
        >
          <p className="hero-handwritten text-[18px] sm:text-[20px] text-[#1A1715]/60 dark:text-[#F4EFE6]/60 mb-2">
            conseils, retours d'expérience —
          </p>
          <h1 className="hero-display text-[#1A1715] dark:text-[#F4EFE6]">
            Le blog.
          </h1>
          <p className="hero-body mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-[#1A1715]/80 dark:text-[#F4EFE6]/80">
            Des conseils concrets pour les artisans, commerçants et
            dirigeants de PME qui envisagent un site internet ou veulent
            mieux comprendre le web. Sans jargon, sans grille tarifaire
            magique.
          </p>
        </motion.div>

        {/* Filtres par catégorie */}
        {blogPosts.length > 1 && (
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10 pb-6 border-b border-[#1A1715]/15 dark:border-[#F4EFE6]/15">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={`hero-body text-[14px] transition-colors ${
                activeCategory === null
                  ? "text-[#1A1715] dark:text-[#F4EFE6] font-medium"
                  : "text-[#1A1715]/50 dark:text-[#F4EFE6]/50 hover:text-[#1A1715]/80 dark:hover:text-[#F4EFE6]/80"
              }`}
            >
              Tous les articles
            </button>
            {Object.entries(categories).map(([key, name]) => (
              <button
                type="button"
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`hero-body text-[14px] transition-colors ${
                  activeCategory === key
                    ? "text-[#1A1715] dark:text-[#F4EFE6] font-medium"
                    : "text-[#1A1715]/50 dark:text-[#F4EFE6]/50 hover:text-[#1A1715]/80 dark:hover:text-[#F4EFE6]/80"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}

        {/* Liste éditoriale des articles */}
        <ul>
          {filteredPosts.map((post, index) => (
            <motion.li
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + index * 0.08,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="py-8 sm:py-10 border-t border-[#1A1715]/15 dark:border-[#F4EFE6]/15 first:border-t-0"
            >
              <Link to={`/blog/${post.slug}`} className="group flex items-start gap-4 sm:gap-6">
                <span
                  className="text-[12px] font-mono tabular-nums tracking-wider text-[#1A1715]/40 dark:text-[#F4EFE6]/40 w-8 flex-shrink-0 pt-1.5"
                  aria-hidden="true"
                >
                  {romanNumerals[index] ?? index + 1}.
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="hero-body text-[12px] uppercase tracking-wider text-[#1A1715]/50 dark:text-[#F4EFE6]/50">
                      {categories[post.category]}
                    </span>
                    {post.featured && (
                      <span className="hero-handwritten text-[15px] text-[#F4D35E]">
                        article du moment
                      </span>
                    )}
                  </div>

                  <h2
                    style={{
                      fontFamily: '"Fraunces", "Times New Roman", serif',
                      fontStyle: "italic",
                      fontWeight: 500,
                    }}
                    className="text-[22px] sm:text-[26px] leading-tight text-[#1A1715] dark:text-[#F4EFE6] mb-3 group-hover:text-[#1A1715]/70 dark:group-hover:text-[#F4EFE6]/70 transition-colors"
                  >
                    {post.title}
                  </h2>

                  <p className="hero-body text-[15px] sm:text-[16px] leading-[1.7] text-[#1A1715]/75 dark:text-[#F4EFE6]/75 max-w-2xl mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#1A1715]/50 dark:text-[#F4EFE6]/50">
                    <span className="font-mono tabular-nums">
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {post.readTime} min de lecture
                    </span>
                    <span className="flex items-center gap-1 text-[#1A1715]/70 dark:text-[#F4EFE6]/70 group-hover:text-[#F4D35E] transition-colors">
                      Lire
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* CTA de bas de page */}
        <div className="pt-10 sm:pt-12 mt-8 border-t border-[#1A1715]/15 dark:border-[#F4EFE6]/15">
          <p className="hero-handwritten text-[19px] sm:text-[22px] text-[#F4D35E] mb-5">
            une question, un projet —
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <button
              type="button"
              onClick={() => handleNavigation("/#contact")}
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
              className="hero-body group inline-flex items-center gap-2 text-[15px] text-[#1A1715]/80 dark:text-[#F4EFE6]/80 hover:text-[#F4D35E] transition-colors"
            >
              <span className="border-b border-current/40 pb-0.5 group-hover:border-[#F4D35E]">
                Une question sur un article ? Écrivez-moi
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
