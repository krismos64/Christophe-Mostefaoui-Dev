import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import { CalendarDaysIcon, ClockIcon, UserIcon, ArrowLeftIcon, TagIcon } from "@heroicons/react/24/outline";
import { getBlogPostBySlug, BlogPost as BlogPostType } from "../data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "veille-tech": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "ia-pratique": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "conseils-business": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    };
    return colors[category as keyof typeof colors] || colors["veille-tech"];
  };

  const getCategoryName = (category: string) => {
    const categories = {
      "veille-tech": "Veille Technologique",
      "ia-pratique": "IA Accessible",
      "conseils-business": "Conseils Business"
    };
    return categories[category as keyof typeof categories] || "Blog";
  };

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
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
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
        <meta property="article:published_time" content={post.publishedAt} />
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

      <main className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Navigation retour */}
          <div className="mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Retour au blog
            </Link>
          </div>

          {/* Header de l'article */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                {getCategoryName(post.category)}
              </span>
              {post.featured && (
                <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                  ⭐ Article phare
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="h-5 w-5" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                <span>{post.readTime} min de lecture</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  <TagIcon className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Image principale */}
          <div className="mb-12">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl text-white">📄</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  <strong>Image suggérée :</strong><br />
                  {post.imageAlt}
                </div>
              </div>
            </div>
          </div>

          {/* Contenu de l'article */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <div className="whitespace-pre-line leading-relaxed text-gray-700 dark:text-gray-300">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                      {paragraph.replace('# ', '')}
                    </h1>
                  );
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <p key={index} className="font-bold text-gray-900 dark:text-white mb-3">
                      {paragraph.replace(/\*\*/g, '')}
                    </p>
                  );
                }
                if (paragraph.trim() === '') {
                  return <br key={index} />;
                }
                return (
                  <p key={index} className="mb-3">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>

          {/* CTA de fin d'article */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Cet article vous a intéressé ?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Parlons de votre projet ! Je suis à votre disposition pour un échange personnalisé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:christophe.mostefaoui.dev@gmail.com?subject=Contact%20suite%20%C3%A0%20l'article%20sur%20React%2019&body=Bonjour%20Christophe%2C%0A%0AJ'ai%20lu%20votre%20article%20et%20j'aimerais%20discuter%20avec%20vous.%0A%0AMon%20projet%20%3A%20%0A%0AMerci%20%21"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
                >
                  📧 Me contacter
                </a>
                <Link
                  to="/blog"
                  className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                >
                  📚 Autres articles
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

export default BlogPost;