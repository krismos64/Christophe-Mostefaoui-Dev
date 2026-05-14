import { motion } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface VideoEmbedProps {
  youtubeId: string;
  thumbnail: string;
  title: string;
  caption?: string;
  duration?: string;
  channelUrl?: string;
  /**
   * Theme : "light" pour fond crème (texte sombre), "dark" pour fond sombre (texte crème)
   */
  theme?: "light" | "dark";
  ariaLabel?: string;
}

export default function VideoEmbed({
  youtubeId,
  thumbnail,
  title,
  caption,
  duration,
  channelUrl,
  theme = "light",
  ariaLabel,
}: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const isDark = theme === "dark";
  const ringColor = isDark ? "ring-[#F4EFE6]/15" : "ring-[#1A1715]/15";
  const ringHover = "group-hover:ring-[#F4D35E]/50";
  const captionColor = isDark ? "text-[#F4EFE6]/70" : "text-[#1A1715]/70";
  const captionMuted = isDark ? "text-[#F4EFE6]/45" : "text-[#1A1715]/50";
  const linkColor = isDark
    ? "text-[#F4EFE6]/80 hover:text-[#F4D35E]"
    : "text-[#1A1715]/80 hover:text-[#F4D35E]";
  const linkBorder = isDark
    ? "border-[#F4EFE6]/30 group-hover/yt:border-[#F4D35E]"
    : "border-[#1A1715]/30 group-hover/yt:border-[#F4D35E]";

  return (
    <figure className="w-full">
      <div className="relative w-full aspect-video overflow-hidden group bg-[#0B0805]">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={thumbnail}
              alt={title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            {/* Overlay sobre, sans gradient bleu/violet */}
            <div
              className="absolute inset-0 bg-[#0B0805]/30 group-hover:bg-[#0B0805]/45 transition-colors duration-300 pointer-events-none"
              aria-hidden="true"
            />

            {/* Bouton play centré (cliquable) */}
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 w-full h-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D35E] focus-visible:ring-offset-2"
              aria-label={ariaLabel ?? `Lire la vidéo : ${title}`}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F4EFE6]/95 text-[#1A1715] shadow-[0_8px_30px_-8px_rgba(0,0,0,0.5)] ring-1 ring-[#1A1715]/10"
              >
                <Play
                  className="h-6 w-6 sm:h-7 sm:w-7 ml-1"
                  fill="currentColor"
                  strokeWidth={0}
                  aria-hidden="true"
                />
              </motion.span>
            </button>

            {/* Durée en mono, coin bas-droit */}
            {duration && (
              <span
                className="absolute bottom-3 right-3 font-mono text-[12px] tabular-nums tracking-wider text-[#F4EFE6] bg-[#0B0805]/70 backdrop-blur-sm px-2 py-1 pointer-events-none"
                aria-hidden="true"
              >
                {duration}
              </span>
            )}
          </>
        )}
        {/* Cadre fin éditorial */}
        <div
          className={`absolute inset-0 ring-1 ${ringColor} ${!isPlaying ? ringHover : ""} transition-colors duration-300 pointer-events-none`}
          aria-hidden="true"
        />
      </div>

      {/* Légende manuscrite + lien chaîne */}
      {(caption || channelUrl) && (
        <figcaption className="mt-4 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          {caption && (
            <span className={`hero-handwritten text-[16px] sm:text-[18px] ${captionColor}`}>
              {caption}
            </span>
          )}
          {channelUrl && (
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hero-body group/yt inline-flex items-center gap-1.5 text-[13px] ${linkColor} transition-colors`}
              aria-label="Voir toutes les vidéos sur YouTube (nouvel onglet)"
            >
              <span className={`border-b pb-0.5 ${linkBorder}`}>
                voir mes autres vidéos
              </span>
              <ArrowUpRight
                className="h-3.5 w-3.5 opacity-70 transition-transform group-hover/yt:translate-x-0.5 group-hover/yt:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          )}
          {!channelUrl && caption && duration && (
            <span className={`font-mono text-[12px] tabular-nums tracking-wider ${captionMuted}`}>
              {duration}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
