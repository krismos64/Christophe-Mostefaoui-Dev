import { useState } from 'react';
import { Play, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function VideoHero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handlePlayClick = () => {
    setShowVideo(true);
  };


  return (
    <>
      <Helmet>
        {/* Métadonnées pour partage social */}
        <title>Christophe Mostefaoui - Développeur Full-Stack Expert IA</title>
        <meta name="description" content="🔥 Cette vidéo devient VIRALE ! Découvrez Christophe Mostefaoui, le développeur français qui transforme les entreprises avec l'IA. Expert React.js, Node.js, créateur de SaaS révolutionnaires. Regardez jusqu'à la fin !" />

        {/* Open Graph optimisé viral */}
        <meta property="og:title" content="🚀 Ce Développeur Français Fait le BUZZ avec l'IA ! Découvrez Pourquoi..." />
        <meta property="og:description" content="🔥 VIDÉO VIRALE : Christophe révèle ses secrets ! Expert React.js, Node.js, créateur SaaS innovants. Cette présentation change tout ! 👀⚡" />
        <meta property="og:image" content="https://christophe-dev-freelance.fr/assets/images/chris-youtube.JPG" />
        <meta property="og:video" content="https://www.youtube.com/watch?v=eZ6OYMeT1CM" />
        <meta property="og:type" content="video.other" />

        {/* Twitter Card viral */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="🚀 VIRAL : Développeur Français Révolutionne l'IA !" />
        <meta name="twitter:description" content="🔥 Cette présentation fait le BUZZ ! Découvrez les secrets de Christophe, expert React.js qui transforme les entreprises avec l'IA 👀" />
        <meta name="twitter:image" content="https://christophe-dev-freelance.fr/assets/images/chris-youtube.JPG" />

        {/* Mots-clés viral tendance */}
        <meta name="keywords" content="développeur viral France, IA révolution, React.js expert buzz, Node.js génie, Christophe Mostefaoui légende, SaaS créateur succès viral, Pau tech star, développement futuriste trending" />
      </Helmet>

      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 overflow-hidden transition-colors duration-300">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200/30 dark:from-blue-900/50 via-transparent to-transparent"></div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            >
              <div className="w-1 h-1 bg-blue-400/20 dark:bg-blue-400/30 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12 animate-fadeInUp">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 animate-gradient-x">
                Découvrez Mon Univers Digital
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
              Plongez dans mon expertise en développement web
            </p>
          </div>

          {/* Video Container */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
              {!showVideo ? (
                <div
                  className="relative cursor-pointer"
                  onClick={handlePlayClick}
                >
                  {/* Thumbnail */}
                  <img
                    src="/assets/images/chris-youtube.JPG"
                    alt="Christophe Mostefaoui - Présentation YouTube"
                    className="w-full aspect-video object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 dark:from-black/80 dark:via-black/40 to-transparent flex items-center justify-center">
                    {/* Play Button Container */}
                    <div className="relative">
                      {/* Pulsing rings */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute w-32 h-32 bg-white/20 rounded-full animate-ping"></div>
                        <div className="absolute w-24 h-24 bg-white/30 rounded-full animate-ping animation-delay-200"></div>
                        <div className="absolute w-16 h-16 bg-white/40 rounded-full animate-ping animation-delay-400"></div>
                      </div>

                      {/* Play button */}
                      <button className="relative w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-2xl ring-4 ring-white/20 dark:ring-white/10">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </button>

                      {/* Animated pointing finger */}
                      <div className="absolute -bottom-16 -right-16 animate-bounce">
                        <div className="relative">
                          <div className="text-6xl animate-point filter drop-shadow-lg">👆</div>
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                            <span className="text-white text-sm font-semibold px-3 py-1 bg-blue-600/90 dark:bg-blue-600/80 rounded-full backdrop-blur-sm border border-white/20">
                              Cliquez pour découvrir
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Corner badges */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                    NOUVEAU
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/80 dark:bg-white/10 backdrop-blur-sm text-gray-900 dark:text-white text-xs font-bold rounded-full flex items-center gap-1 border border-gray-200 dark:border-transparent">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    En Direct
                  </div>

                </div>
              ) : (
                <div className="relative aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/eZ6OYMeT1CM?autoplay=1&rel=0&showinfo=0&modestbranding=1"
                    title="Christophe Mostefaoui - Présentation Professionnelle"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={() => setIsVideoLoaded(true)}
                  />
                  {!isVideoLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 animate-fadeInUp animation-delay-600">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Prêt à transformer vos idées en réalité digitale ?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 ring-2 ring-blue-200 dark:ring-blue-800"
              >
                <Sparkles className="w-5 h-5" />
Démarrer un Projet
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 dark:bg-white/10 backdrop-blur-sm text-gray-900 dark:text-white font-semibold rounded-full border border-gray-200 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/20 transition-all duration-300"
              >
Voir mes Réalisations
              </a>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}

