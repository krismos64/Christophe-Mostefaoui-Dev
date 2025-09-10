import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

interface VideoPresentationProps {
  youtubeUrl?: string;
  videoTitle?: string;
  videoDescription?: string;
  videoDuration?: string;
  videoThumbnail?: string;
}

export default function VideoPresentation({ 
  youtubeUrl, 
  videoTitle = "Présentation Christophe Mostefaoui - Développeur Web Full-Stack Expert",
  videoDescription = "Découvrez l'approche unique de Christophe Mostefaoui pour le développement d'applications web modernes avec React.js, Node.js et TypeScript. Services SaaS, e-commerce et solutions sur mesure à Pau.",
  videoDuration = "PT3M",
  videoThumbnail = "/assets/images/Christophe-freelance.png"
}: VideoPresentationProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // SEO: Generate structured data for video with all required fields
  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": videoTitle || "Présentation de Christophe Mostefaoui - Développeur Web Full-Stack Expert",
    "description": videoDescription || "Découvrez mon expertise en développement web full-stack avec React.js, Node.js et TypeScript. Création d'applications SaaS et e-commerce sur mesure à Pau.",
    "thumbnailUrl": videoThumbnail || "https://christophe-dev-freelance.fr/video-thumbnail.jpg",
    "uploadDate": "2024-12-01T10:00:00+01:00",
    "duration": videoDuration || "PT2M30S",
    "contentUrl": youtubeUrl ? youtubeUrl.replace('/embed/', '/watch?v=').replace('http://', 'https://') : "https://www.youtube.com/watch?v=tdjXblz4mr4",
    "embedUrl": youtubeUrl ? youtubeUrl.replace('http://', 'https://') : "https://www.youtube.com/embed/tdjXblz4mr4",
    "publisher": {
      "@type": "Person",
      "name": "Christophe Mostefaoui",
      "url": "https://christophe-dev-freelance.fr",
      "sameAs": [
        "https://www.linkedin.com/in/christophemostefaoui/",
        "https://github.com/krismos64",
        "https://www.youtube.com/@krismosDev"
      ]
    },
    "creator": {
      "@type": "Person",
      "name": "Christophe Mostefaoui",
      "jobTitle": "Développeur Web Full-Stack",
      "worksFor": {
        "@type": "Organization",
        "name": "Christophe Mostefaoui - Développement Web"
      }
    },
    "about": {
      "@type": "Service",
      "name": "Développement Web Full-Stack",
      "provider": {
        "@type": "Person",
        "name": "Christophe Mostefaoui"
      },
      "serviceType": "Développement d'applications web, SaaS, e-commerce",
      "areaServed": {
        "@type": "Place",
        "name": "Pau, Pyrénées-Atlantiques, France"
      }
    },
    "keywords": "développeur web Pau, React.js expert, Node.js développeur, TypeScript specialist, SaaS development, e-commerce solutions, full-stack developer France, Christophe Mostefaoui, développement web sur mesure, applications web modernes, API REST, MongoDB, MySQL, Stripe integration, freelance développeur Pyrénées-Atlantiques",
    "inLanguage": "fr-FR",
    "isFamilyFriendly": true,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/WatchAction",
      "userInteractionCount": 1500
    },
    "potentialAction": {
      "@type": "WatchAction",
      "target": youtubeUrl ? youtubeUrl.replace('/embed/', '/watch?v=') : "https://www.youtube.com/watch?v=tdjXblz4mr4"
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const videoContainerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut" as const,
        delay: 0.3
      }
    }
  };

  const neonGlowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(139, 92, 246, 0.2), 0 0 60px rgba(236, 72, 153, 0.1)",
        "0 0 30px rgba(139, 92, 246, 0.4), 0 0 50px rgba(236, 72, 153, 0.2), 0 0 70px rgba(6, 182, 212, 0.1)",
        "0 0 25px rgba(236, 72, 153, 0.4), 0 0 45px rgba(6, 182, 212, 0.2), 0 0 65px rgba(139, 92, 246, 0.1)",
        "0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(139, 92, 246, 0.2), 0 0 60px rgba(236, 72, 153, 0.1)"
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const borderGlowVariants = {
    animate: {
      background: [
        "linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4)",
        "linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)",
        "linear-gradient(225deg, #ec4899, #06b6d4, #8b5cf6, #ec4899)",
        "linear-gradient(315deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4)"
      ],
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear" as const
      }
    }
  };

  return (
    <>
      {/* SEO: Enhanced metadata for video section */}
      <Helmet>
        <title>Présentation Vidéo - Christophe Mostefaoui Développeur Web Expert</title>
        <meta name="description" content={videoDescription} />
        <meta name="keywords" content="présentation vidéo développeur web, Christophe Mostefaoui, React.js expert, Node.js développeur, services développement web Pau, applications SaaS sur mesure" />
        
        {/* Open Graph Video Tags */}
        <meta property="og:title" content={videoTitle} />
        <meta property="og:description" content={videoDescription} />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content="https://christophe-dev-freelance.fr/#video-presentation" />
        <meta property="og:image" content={videoThumbnail} />
        <meta property="og:video" content={youtubeUrl ? youtubeUrl.replace('/embed/', '/watch?v=') : "https://www.youtube.com/watch?v=tdjXblz4mr4"} />
        <meta property="og:video:secure_url" content={youtubeUrl ? youtubeUrl.replace('/embed/', '/watch?v=').replace('http://', 'https://') : "https://www.youtube.com/watch?v=tdjXblz4mr4"} />
        <meta property="og:video:type" content="video/mp4" />
        <meta property="og:video:width" content="1920" />
        <meta property="og:video:height" content="1080" />
        <meta property="og:site_name" content="Christophe Mostefaoui - Développeur Web" />
        
        {/* Twitter Card Video */}
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="@christophe_dev" />
        <meta name="twitter:title" content={videoTitle} />
        <meta name="twitter:description" content={videoDescription} />
        <meta name="twitter:image" content={videoThumbnail} />
        <meta name="twitter:player" content={youtubeUrl || "https://www.youtube.com/embed/tdjXblz4mr4"} />
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(videoStructuredData)}
        </script>
        
        {/* Additional SEO enhancements */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
        <meta name="author" content="Christophe Mostefaoui" />
        <meta name="subject" content="Développement Web Full-Stack" />
        <meta name="classification" content="Business, Technology, Web Development" />
        <meta name="geo.region" content="FR-64" />
        <meta name="geo.placename" content="Pau" />
        <meta name="geo.position" content="43.3200;-0.3600" />
        <meta name="ICBM" content="43.3200, -0.3600" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta name="video:duration" content="150" />
        <meta name="video:release_date" content="2024-12-01" />
        <meta name="video:tag" content="développeur web" />
        <meta name="video:tag" content="React.js" />
        <meta name="video:tag" content="Node.js" />
        <meta name="video:tag" content="TypeScript" />
        <meta name="video:tag" content="Pau" />
        <meta name="video:tag" content="freelance" />
      </Helmet>

      <section 
        id="video-presentation" 
        className="py-20 relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 transition-colors duration-300"
        itemScope 
        itemType="https://schema.org/VideoObject"
        role="main"
        aria-labelledby="video-presentation-title"
        aria-describedby="video-presentation-description"
      >
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              x: [-10, 10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          {/* Header Section with Enhanced SEO */}
          <motion.div variants={itemVariants} className="mb-16">
            <motion.h1 
              id="video-presentation-title"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899, #10b981)',
                backgroundSize: '300% 300%',
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              itemProp="name"
            >
              Présentation Vidéo - Développeur Web Expert
            </motion.h1>
            <motion.p 
              id="video-presentation-description"
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
              itemProp="description"
            >
              Découvrez l'expertise de <strong>Christophe Mostefaoui</strong> en développement web full-stack. 
              Spécialiste <strong>React.js, Node.js et TypeScript</strong>, je crée des applications SaaS performantes 
              et des solutions e-commerce sur mesure à <strong>Pau</strong> et dans les Pyrénées-Atlantiques.
            </motion.p>
            
            {/* SEO: Additional semantic content */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400"
            >
              <span className="bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full backdrop-blur-sm">
                #DéveloppeurWeb
              </span>
              <span className="bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full backdrop-blur-sm">
                #ReactJS
              </span>
              <span className="bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full backdrop-blur-sm">
                #NodeJS
              </span>
              <span className="bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full backdrop-blur-sm">
                #TypeScript
              </span>
              <span className="bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full backdrop-blur-sm">
                #SaaS
              </span>
              <span className="bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full backdrop-blur-sm">
                #Pau64
              </span>
            </motion.div>
          </motion.div>

          {/* Video Container */}
          <motion.div
            variants={videoContainerVariants}
            className="max-w-4xl mx-auto relative"
          >
            {/* Animated border container */}
            <motion.div
              className="relative p-1 rounded-2xl"
              style={{
                background: 'linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4)',
                backgroundSize: '400% 400%'
              }}
              variants={borderGlowVariants}
              animate="animate"
            >
              {/* Inner video container with neon glow */}
              <motion.div
                className="relative bg-black rounded-xl overflow-hidden"
                variants={neonGlowVariants}
                animate="animate"
              >
                {/* Video placeholder or iframe */}
                <div className="relative aspect-video w-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
                  {youtubeUrl && isPlaying ? (
                    <iframe
                      src={`${youtubeUrl}?rel=0&modestbranding=1&showinfo=1&controls=1&autoplay=1&mute=0&loop=0&color=white&iv_load_policy=3&cc_load_policy=1&cc_lang_pref=fr&hl=fr`}
                      title={videoTitle}
                      className="absolute inset-0 w-full h-full"
                      style={{ border: 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      itemProp="embedUrl"
                      aria-label="Vidéo de présentation de Christophe Mostefaoui, développeur web full-stack expert à Pau spécialisé React.js Node.js TypeScript"
                    />
                  ) : (
                    // Placeholder when no video URL is provided
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-contain bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${videoThumbnail})`,
                      }}
                    >
                      <article className="text-center">
                        <motion.div
                          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center cursor-pointer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          animate={{
                            boxShadow: [
                              "0 0 20px rgba(6, 182, 212, 0.6)",
                              "0 0 40px rgba(139, 92, 246, 0.6)",
                              "0 0 30px rgba(236, 72, 153, 0.6)",
                              "0 0 20px rgba(6, 182, 212, 0.6)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          onClick={() => setIsPlaying(true)}
                          role="button"
                          aria-label="Lancer la vidéo de présentation"
                          tabIndex={0}
                        >
                          <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-4" itemProp="name">
                          {youtubeUrl ? "▶️ Regarder ma présentation vidéo" : "Présentation Christophe Mostefaoui - Développeur Full-Stack"}
                        </h3>
                        <div className="mt-8 text-sm text-gray-400">
                          {youtubeUrl ? "🎬 Cliquez pour charger la vidéo | ⚡ Chargement optimisé" : "🎬 Vidéo bientôt disponible | ⚡ Services disponibles dès maintenant"}
                        </div>
                        
                        {/* Hidden structured data for SEO */}
                        <meta itemProp="thumbnailUrl" content={videoThumbnail} />
                        <meta itemProp="duration" content={videoDuration} />
                        <meta itemProp="uploadDate" content="2024-12-01T10:00:00Z" />
                        <meta itemProp="author" content="Christophe Mostefaoui" />
                        <meta itemProp="publisher" content="Christophe Mostefaoui - Développement Web" />
                      </article>
                    </div>
                  )}

                  {/* Floating particles inside video area */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${
                            ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981'][i % 4]
                          }, transparent)`,
                          left: `${10 + (i * 12)}%`,
                          top: `${20 + (i * 8)}%`,
                        }}
                        animate={{
                          y: [-10, 10],
                          opacity: [0.2, 0.8, 0.2],
                          scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2 + Math.random(),
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Overlay gradient for futuristic effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </motion.div>

            {/* Corner accent lights */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-cyan-400 rounded-full animate-pulse opacity-60" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }} />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1.5s' }} />
          </motion.div>

          {/* Bottom accent line */}
          <motion.div
            className="mt-16 h-1 max-w-md mx-auto rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, #06b6d4, #8b5cf6, #ec4899, transparent)',
              backgroundSize: '200% 100%'
            }}
            animate={{
              backgroundPosition: ['200% 0%', '-200% 0%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>

      {/* SEO: Additional content for crawlers */}
      <div className="sr-only" aria-hidden="true">
        <h2>Services de développement web présentés dans la vidéo</h2>
        <ul>
          <li>Développement d'applications web avec React.js et TypeScript</li>
          <li>Création d'API REST performantes avec Node.js et Express</li>
          <li>Solutions SaaS complètes avec authentification et paiements</li>
          <li>Sites e-commerce avec Stripe et gestion avancée</li>
          <li>Optimisation SEO technique et Core Web Vitals</li>
          <li>Applications Progressive Web App (PWA)</li>
          <li>Développement mobile-first responsive</li>
          <li>Intégrations tierces et APIs</li>
          <li>Maintenance et support technique</li>
          <li>Consulting technique et audit de code</li>
          <li>Formation et accompagnement technique</li>
          <li>Architecture logicielle moderne et scalable</li>
          <li>DevOps et déploiement continu</li>
          <li>Tests automatisés et qualité de code</li>
        </ul>
        <p>
          Christophe Mostefaoui, développeur web freelance basé à Pau (64), 
          spécialisé dans les technologies modernes : React.js, Node.js, TypeScript, 
          MongoDB, MySQL, Docker. Expert en applications SaaS et solutions e-commerce 
          sur mesure pour entreprises locales et nationales.
        </p>
        <address>
          Christophe Mostefaoui
          Développeur Web Freelance
          Pau, Pyrénées-Atlantiques (64)
          France
          Email: contact@christophe-dev-freelance.fr
        </address>
        <p>
          Mots-clés additionnels pour le référencement : développeur React Pau, expert Node.js Pyrénées-Atlantiques,
          créateur applications SaaS France, développement TypeScript professionnel, consultant technique web,
          freelance développeur full-stack Béarn, programmeur JavaScript senior, architecte logiciel web,
          spécialiste API REST, expert MongoDB MySQL, intégration Stripe paiements, développement agile,
          création sites e-commerce performants, optimisation Core Web Vitals, développeur web indépendant.
        </p>
      </div>
    </section>
  </>
  );
}