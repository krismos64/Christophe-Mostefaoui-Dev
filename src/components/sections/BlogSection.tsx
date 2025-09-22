import { CalendarDaysIcon, ClockIcon, UserIcon, TagIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts, BlogPost } from "../../data/blogPosts";

const categories = {
  "veille-tech": {
    name: "Veille Technologique",
    color: "blue",
    description: "Les dernières innovations web expliquées simplement"
  },
  "ia-pratique": {
    name: "IA Accessible",
    color: "purple",
    description: "Intelligence artificielle concrète pour votre business"
  },
  "conseils-business": {
    name: "Conseils Business",
    color: "green",
    description: "Stratégies digitales pour entrepreneurs"
  }
};

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory
    ? blogPosts.filter(post => post.category === activeCategory)
    : blogPosts;

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    };
    return colors[categories[category as keyof typeof categories]?.color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header avec personnalité */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 px-6 py-3 rounded-full mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              Nouvelles idées chaque quinzaine
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Mon Blog Tech
            <span className="block text-2xl md:text-3xl text-blue-600 dark:text-blue-400 font-normal mt-2">
              Veille technologique & IA accessible pour PME
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Je partage ici mes découvertes, mes expériences terrain et mes analyses sur les technologies
            qui peuvent <strong>vraiment</strong> transformer votre business. Du concret, du testé,
            du vécu avec de vrais projets clients.
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeCategory === null
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
            }`}
          >
            Tous les articles
          </button>
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === key
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Article featured */}
        {featuredPost && !activeCategory && (
          <div className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm">
                    ⭐ Article phare
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(featuredPost.category)} bg-white/20 text-white`}>
                    {categories[featuredPost.category].name}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  {featuredPost.title}
                </h3>

                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-blue-200 mb-8">
                  <div className="flex items-center gap-2">
                    <CalendarDaysIcon className="h-5 w-5" />
                    <span>{formatDate(featuredPost.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-5 w-5" />
                    <span>{featuredPost.readTime} min de lecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5" />
                    <span>{featuredPost.author}</span>
                  </div>
                </div>

                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
                >
                  Lire l'article complet
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Grille des articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      {post.category === 'veille-tech' && (
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                      {post.category === 'ia-pratique' && (
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      )}
                      {post.category === 'conseils-business' && (
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      📸 Image suggerée : {post.imageAlt}
                    </div>
                  </div>
                </div>

                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                  {categories[post.category].name}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <CalendarDaysIcon className="h-4 w-4" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      {post.readTime} min
                    </span>
                  </div>
                </div>

                <Link
                  to={`/blog/${post.slug}`}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                >
                  Lire la suite
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Message personnel */}
        <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">💡</span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Une question sur un article ? Un sujet que vous aimeriez voir traité ?
            </h3>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Je suis toujours curieux de savoir ce qui vous préoccupe dans votre transformation digitale.
              Vos questions nourrissent mes prochains articles ! N'hésitez pas à me faire signe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:christophe.mostefaoui.dev@gmail.com"
                className="bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors inline-flex items-center justify-center gap-2"
              >
                📧 Poser une question
              </a>
              <a
                href="mailto:christophe.mostefaoui.dev@gmail.com?subject=Projet%20suite%20%C3%A0%20votre%20blog&body=Bonjour%20Christophe%2C%0A%0AJ'ai%20lu%20votre%20blog%20et%20j'aimerais%20discuter%20d'un%20projet%20avec%20vous.%0A%0AMon%20entreprise%20%3A%20%0AMes%20besoins%20%3A%20%0A%0AMerci%20%21"
                className="border-2 border-amber-500 text-amber-600 dark:text-amber-400 px-8 py-3 rounded-lg font-semibold hover:bg-amber-500 hover:text-white transition-colors"
              >
                💬 Discuter d'un projet
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;