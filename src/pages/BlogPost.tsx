import { Helmet } from "react-helmet-async";
import { useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { getBlogPostBySlug } from "../data/blogPosts";
import { useNavigation } from "../hooks/useNavigation";

const categories = {
  "veille-tech": "Veille technologique",
  "ia-pratique": "IA accessible",
  "conseils-business": "Conseils business",
};

// Rendu léger du **gras** inline sans injecter de HTML brut
const renderInlineBold = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { handleNavigation } = useNavigation();

  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getCategoryName = (category: string) =>
    categories[category as keyof typeof categories] || "Blog";

  // Schema.org pour l'article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "image": `https://christophe-dev-freelance.fr${post.imageUrl}`,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://christophe-dev-freelance.fr"
    },
    "publisher": {
      "@type": "Person",
      "name": "Christophe Mostefaoui",
      "url": "https://christophe-dev-freelance.fr"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://christophe-dev-freelance.fr/blog/${post.slug}`
    },
    "keywords": post.keywords.join(", "),
    "articleSection": getCategoryName(post.category),
    "wordCount": post.content.split(' ').length,
    "timeRequired": `PT${post.readTime}M`,
    "inLanguage": "fr-FR"
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Blog Christophe Mostefaoui</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords.join(", ")} />
        <link rel="canonical" href={`https://christophe-dev-freelance.fr/blog/${post.slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://christophe-dev-freelance.fr/blog/${post.slug}`} />
        <meta property="og:image" content={`https://christophe-dev-freelance.fr${post.imageUrl}`} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={getCategoryName(post.category)} />
        {post.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={`https://christophe-dev-freelance.fr${post.imageUrl}`} />

        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <main className="relative w-full overflow-hidden bg-[#F4EFE6] dark:bg-[#13110F] pt-32 sm:pt-36 pb-20 sm:pb-28">
        {/* Texture grain papier */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply dark:mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
          aria-hidden="true"
        />

        <article className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10 max-w-3xl">
          {/* Navigation retour */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <button
              type="button"
              onClick={() => handleNavigation("/blog")}
              className="hero-body group inline-flex items-center gap-2 text-[14px] text-[#1A1715]/60 dark:text-[#F4EFE6]/60 hover:text-[#F4D35E] transition-colors"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              Retour au blog
            </button>
          </motion.div>

          {/* Header de l'article */}
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-[#F4D35E] mb-3">
              {getCategoryName(post.category)} —
            </p>

            <h1 className="hero-display text-[#1A1715] dark:text-[#F4EFE6] mb-6">
              {post.title}
            </h1>

            <p className="hero-body text-[17px] sm:text-[18px] leading-[1.7] text-[#1A1715]/75 dark:text-[#F4EFE6]/75 mb-8">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-5 text-[13px] text-[#1A1715]/50 dark:text-[#F4EFE6]/50 pb-8 border-b border-[#1A1715]/15 dark:border-[#F4EFE6]/15">
              <span className="hero-body">{post.author}</span>
              <span className="font-mono tabular-nums">
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readTime} min de lecture
              </span>
            </div>
          </motion.header>

          {/* Image principale */}
          <div className="mb-12 rounded-sm overflow-hidden">
            <div className="aspect-video">
              {(() => {
                const lastSlash = post.imageUrl.lastIndexOf("/");
                const dir = post.imageUrl.slice(0, lastSlash);
                const name = post.imageUrl.slice(lastSlash + 1).replace(/\.[^.]+$/, "");
                const optDir = `${dir}/optimized`;
                return (
                  <picture>
                    <source
                      type="image/avif"
                      srcSet={`${optDir}/${name}-400.avif 400w, ${optDir}/${name}-800.avif 800w`}
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                    <source
                      type="image/webp"
                      srcSet={`${optDir}/${name}-400.webp 400w, ${optDir}/${name}-800.webp 800w`}
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                    <img
                      src={`${optDir}/${name}-800.webp`}
                      alt={post.imageAlt}
                      className="w-full h-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      onError={(e) => {
                        // Fallback vers placeholder si image non trouvée
                        e.currentTarget.style.display = 'none';
                        (e.currentTarget.nextElementSibling as HTMLElement | null)?.style.setProperty('display', 'flex');
                      }}
                    />
                  </picture>
                );
              })()}
              <div className="aspect-video bg-[#1A1715]/5 dark:bg-[#F4EFE6]/5 hidden items-center justify-center">
                <div className="text-center p-8 hero-body text-[#1A1715]/50 dark:text-[#F4EFE6]/50">
                  {post.imageAlt}
                </div>
              </div>
            </div>
          </div>

          {/* Contenu de l'article */}
          <div className="hero-body max-w-none mb-12">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3
                    key={index}
                    style={{
                      fontFamily: '"Fraunces", "Times New Roman", serif',
                      fontStyle: "italic",
                      fontWeight: 500,
                    }}
                    className="text-[19px] sm:text-[21px] leading-tight text-[#1A1715] dark:text-[#F4EFE6] mt-8 mb-3"
                  >
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2
                    key={index}
                    style={{
                      fontFamily: '"Fraunces", "Times New Roman", serif',
                      fontStyle: "italic",
                      fontWeight: 500,
                    }}
                    className="text-[24px] sm:text-[28px] leading-tight text-[#1A1715] dark:text-[#F4EFE6] mt-10 mb-4 pt-8 border-t border-[#1A1715]/15 dark:border-[#F4EFE6]/15"
                  >
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('# ')) {
                return (
                  <h2
                    key={index}
                    style={{
                      fontFamily: '"Fraunces", "Times New Roman", serif',
                      fontStyle: "italic",
                      fontWeight: 500,
                    }}
                    className="text-[24px] sm:text-[28px] leading-tight text-[#1A1715] dark:text-[#F4EFE6] mt-10 mb-4 pt-8 border-t border-[#1A1715]/15 dark:border-[#F4EFE6]/15"
                  >
                    {paragraph.replace('# ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <p
                    key={index}
                    className="text-[15px] sm:text-[16px] leading-[1.7] text-[#1A1715]/80 dark:text-[#F4EFE6]/80 mb-2 pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-[#F4D35E]"
                  >
                    {renderInlineBold(paragraph.replace(/^-\s*/, ''))}
                  </p>
                );
              }
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <p
                    key={index}
                    className="text-[15px] sm:text-[16px] leading-[1.7] font-semibold text-[#1A1715] dark:text-[#F4EFE6] mb-3"
                  >
                    {paragraph.replace(/\*\*/g, '')}
                  </p>
                );
              }
              if (paragraph.trim() === '') {
                return null;
              }
              return (
                <p
                  key={index}
                  className="text-[15px] sm:text-[16px] leading-[1.7] text-[#1A1715]/80 dark:text-[#F4EFE6]/80 mb-4"
                >
                  {renderInlineBold(paragraph)}
                </p>
              );
            })}
          </div>

          {/* CTA de fin d'article */}
          <div className="pt-10 sm:pt-12 border-t border-[#1A1715]/15 dark:border-[#F4EFE6]/15">
            <p className="hero-handwritten text-[19px] sm:text-[22px] text-[#F4D35E] mb-5">
              cet article vous a intéressé —
            </p>
            <p className="hero-body text-[15px] sm:text-[16px] leading-[1.7] text-[#1A1715]/75 dark:text-[#F4EFE6]/75 mb-6 max-w-xl">
              Parlons de votre projet : premier échange gratuit, sans
              engagement.
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
              <button
                type="button"
                onClick={() => handleNavigation("/blog")}
                className="hero-body group inline-flex items-center gap-2 text-[15px] text-[#1A1715]/80 dark:text-[#F4EFE6]/80 hover:text-[#F4D35E] transition-colors"
              >
                <span className="border-b border-current/40 pb-0.5 group-hover:border-[#F4D35E]">
                  Autres articles
                </span>
              </button>
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

export default BlogPost;
