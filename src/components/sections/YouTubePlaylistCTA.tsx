import { motion } from "framer-motion";
import { Youtube } from "lucide-react";
import { PLAYLIST_URL } from "../../utils/playlist-seo";

export default function YouTubePlaylistCTA() {
  return (
    <section
      id="playlist-javascript"
      className="relative py-16 sm:py-20 bg-gradient-to-br from-rose-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-cyan-950 overflow-hidden"
      aria-labelledby="playlist-javascript-title"
      itemScope
      itemType="https://schema.org/CreativeWorkSeries"
    >
      <meta
        itemProp="name"
        content="JAVASCRIPT pour débutants — rappels et révisions 2025"
      />
      <meta itemProp="url" content={PLAYLIST_URL} />
      <meta itemProp="learningResourceType" content="EducationalVideo" />
      <meta itemProp="learningResourceType" content="Tutorial" />
      <meta itemProp="inLanguage" content="fr-FR" />
      <meta itemProp="isAccessibleForFree" content="true" />

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-rose-300/30 blur-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl"
          animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          className="flex flex-col gap-8 rounded-3xl border border-white/40 bg-white/90 p-8 shadow-xl backdrop-blur dark:border-white/10 dark:bg-gray-900/90 sm:p-10 md:flex-row md:items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30">
            <Youtube className="h-16 w-16 text-white" aria-hidden="true" />
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500 dark:text-rose-300">
                Playlist exclusive
              </p>
              <h2
                id="playlist-javascript-title"
                className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
              >
                JAVASCRIPT pour débutants — rappels et révisions 2025
              </h2>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300" itemProp="description">
              Une série de vidéos concises pour t'aider à réviser les bases de
              JavaScript. Chaque épisode résume une notion essentielle, générée
              avec Notebook&nbsp;LM pour offrir des synthèses claires et
              faciles&nbsp;à&nbsp;retenir.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-start">
              <motion.a
                href={PLAYLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-red-500/30 transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                itemProp="url"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                Regarder la playlist sur YouTube
              </motion.a>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Disponibles gratuitement — booste tes révisions JS en quelques
                minutes.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
