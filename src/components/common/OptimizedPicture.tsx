import { type CSSProperties } from "react";

type Props = {
  /** Chemin original, ex: "/assets/images/montagne.png" */
  src: string;
  alt: string;
  /** Largeurs disponibles pour ce fichier dans /optimized/ (doivent correspondre au script). Ex: [400, 800] */
  widths: number[];
  /** Attribut sizes du <img> (ex: "(max-width: 768px) 100vw, 50vw") */
  sizes?: string;
  /** Largeur affichée approx (pour ratio) — facultatif */
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  /** Index dans `widths` à utiliser comme src fallback (par défaut le plus grand) */
  fallbackIndex?: number;
};

/**
 * Sert AVIF puis WebP (générés par scripts/optimize-images.sh dans /optimized/),
 * avec fallback sur l'image originale via <img src>.
 */
export default function OptimizedPicture({
  src,
  alt,
  widths,
  sizes = "100vw",
  width,
  height,
  className,
  style,
  loading = "lazy",
  fetchPriority,
  fallbackIndex,
}: Props) {
  const lastSlash = src.lastIndexOf("/");
  const dir = src.slice(0, lastSlash); // "/assets/images"
  const file = src.slice(lastSlash + 1); // "montagne.png"
  const name = file.replace(/\.[^.]+$/, ""); // "montagne"
  const optimizedDir = `${dir}/optimized`;

  const buildSrcSet = (ext: "avif" | "webp") =>
    widths
      .map((w) => `${optimizedDir}/${name}-${w}.${ext} ${w}w`)
      .join(", ");

  const fallbackWidth = widths[fallbackIndex ?? widths.length - 1];
  const fallbackSrc = `${optimizedDir}/${name}-${fallbackWidth}.webp`;

  return (
    <picture>
      <source type="image/avif" srcSet={buildSrcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={buildSrcSet("webp")} sizes={sizes} />
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        loading={loading}
        decoding="async"
        {...(fetchPriority ? { fetchPriority } : {})}
      />
    </picture>
  );
}
