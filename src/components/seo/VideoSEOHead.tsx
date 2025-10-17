import { Helmet } from "react-helmet-async";
import { generateVideoMetaTags } from "../../utils/video-seo-optimization";

export default function VideoSEOHead() {
  const videoMeta = generateVideoMetaTags();

  return (
    <Helmet>
      {/* Meta tags spécifiques vidéo pour l'indexation Google */}
      <meta name="video:title" content={videoMeta["video:title"]} />
      <meta name="video:description" content={videoMeta["video:description"]} />
      <meta name="video:thumbnail" content={videoMeta["video:thumbnail"]} />
      <meta name="video:duration" content={videoMeta["video:duration"]} />
      <meta name="video:width" content={videoMeta["video:width"]} />
      <meta name="video:height" content={videoMeta["video:height"]} />
      <meta name="video:type" content={videoMeta["video:type"]} />
      <meta name="video:url" content={videoMeta["video:url"]} />
      <meta name="video:secure_url" content={videoMeta["video:secure_url"]} />
      <meta name="video:tag" content={videoMeta["video:tag"]} />

      {/* Open Graph vidéo enrichi */}
      <meta property="og:video" content={videoMeta["og:video"]} />
      <meta property="og:video:secure_url" content={videoMeta["og:video:secure_url"]} />
      <meta property="og:video:type" content={videoMeta["og:video:type"]} />
      <meta property="og:video:width" content={videoMeta["og:video:width"]} />
      <meta property="og:video:height" content={videoMeta["og:video:height"]} />
      <meta property="og:video:duration" content={videoMeta["og:video:duration"]} />

      {/* Tags vidéo multiples */}
      {videoMeta["og:video:tag"].map((tag: string, index: number) => (
        <meta key={index} property="og:video:tag" content={tag} />
      ))}

      {/* Twitter Player Card optimisé */}
      <meta name="twitter:card" content="player" />
      <meta name="twitter:player" content={videoMeta["twitter:player"]} />
      <meta name="twitter:player:width" content={videoMeta["twitter:player:width"]} />
      <meta name="twitter:player:height" content={videoMeta["twitter:player:height"]} />
      <meta name="twitter:player:stream" content={videoMeta["twitter:player:stream"]} />
      <meta name="twitter:player:stream:content_type" content={videoMeta["twitter:player:stream:content_type"]} />

      {/* Instructions pour les robots sur les vidéos */}
      <meta name="robots" content={videoMeta["robots"]} />
      <meta name="googlebot" content={videoMeta["googlebot"]} />

      {/* Rich snippets vidéo hints */}
      <meta name="video-indexable" content="true" />
      <meta name="video-searchable" content="true" />
      <meta name="content-rating" content="general" />
      <meta name="video-category" content="Technology" />
      <meta name="video-genre" content="Tutorial, Portfolio, Technology" />

      {/* Informations de licence et droits */}
      <meta name="copyright" content="Christophe Mostefaoui 2024" />
      <meta name="video-license" content="Creative Commons Attribution 4.0" />

      {/* Géolocalisation pour la vidéo */}
      <meta name="geo.region" content="FR-64" />
      <meta name="geo.placename" content="Pau" />
      <meta name="video-location" content="Pau, France" />

      {/* Accessibilité vidéo */}
      <meta name="video-accessibility" content="captions-available, transcript-available" />
      <meta name="video-language" content="fr-FR" />

      {/* Indications pour l'indexation vidéo */}
      <meta name="video-featured" content="true" />
      <meta name="video-quality" content="HD" />
      <meta name="video-format" content="MP4" />
      <meta name="video-codec" content="H.264" />

      {/* SEO vidéo avancé */}
      <link rel="video_src" href="https://christophe-dev-freelance.fr/assets/videos/animation-chris-dev.mp4" />
      <link rel="image_src" href="https://christophe-dev-freelance.fr/assets/images/Chris-profil.jpg" />

      {/* Preload de la vidéo pour améliorer l'UX et les signaux SEO */}
      <link
        rel="preload"
        as="video"
        href="https://christophe-dev-freelance.fr/assets/videos/animation-chris-dev.mp4"
        type="video/mp4"
      />
    </Helmet>
  );
}
