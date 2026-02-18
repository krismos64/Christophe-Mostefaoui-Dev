import { useState } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import FuturisticBackground, { LIGHT_CONFIG } from "../effects/FuturisticBackground";
import { containerVariants, itemVariants } from "../effects/FuturisticEffects";

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
}

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  const videos: Video[] = [
    {
      id: "1",
      youtubeId: "eZ6OYMeT1CM",
      title: "Mon Univers Digital",
      description: "Découvrez mon approche du développement web",
      thumbnail: "/assets/images/chris-youtube.JPG",
      duration: "2:45",
    },
    {
      id: "2",
      youtubeId: "tdjXblz4mr4",
      title: "Présentation Expert",
      description: "React.js, Node.js, TypeScript & solutions sur mesure",
      thumbnail: "/assets/images/Christophe-freelance.png",
      duration: "2:30",
    },
  ];

  const openModal = (video: Video) => {
    setActiveVideo(video);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveVideo(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <FuturisticBackground
        id="video-showcase"
        {...LIGHT_CONFIG}
        orbs={[
          { size: 250, colorClass: "glowing-orb-cyan", left: "80%", top: "10%", delay: 0 },
          { size: 200, colorClass: "glowing-orb-purple", left: "5%", top: "60%", delay: 1.5 },
          { size: 150, colorClass: "glowing-orb-pink", left: "50%", top: "80%", delay: 3 },
        ]}
      >
        <div className="container mx-auto px-6 relative z-10" ref={contentRef}>
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Découvrez mon{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                expertise en vidéo
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Prenez quelques minutes pour mieux me connaître et comprendre comment je peux vous accompagner
            </motion.p>
          </motion.div>

          {/* Videos Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group cursor-pointer"
                onClick={() => openModal(video)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Pulse effect */}
                        <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
                        <div className="relative w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                          <Play className="w-7 h-7 text-white ml-1" fill="white" />
                        </div>
                      </motion.div>
                    </div>

                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {video.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discutons de votre projet
            </motion.a>
          </motion.div>
        </div>
      </FuturisticBackground>

      {/* Modal Video */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
              aria-label="Fermer la vidéo"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Video container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
