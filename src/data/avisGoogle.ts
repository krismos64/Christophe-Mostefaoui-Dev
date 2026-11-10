/**
 * Avis Google : source UNIQUE de l'affichage (page /avis, sections/GoogleReviews.tsx).
 *
 * Contenu recopié mot pour mot de la fiche Google (Place ID
 * ChIJlTa-96dvUigRyeCBbLb8qkw) : jamais d'avis inventé, reformulé ou
 * raccourci, note jamais arrondie. Quand un avis arrive sur la fiche, le
 * reporter À L'IDENTIQUE dans les cinq endroits suivants :
 *   1. ce fichier (ajouter l'avis en tête de liste)
 *   2. le JSON-LD d'index.html (aggregateRating + review du #business)
 *   3. public/llms.txt, public/llms-full.txt, public/chatbot-knowledge.txt
 * puis mettre à jour le <lastmod> de /avis dans public/sitemap.xml.
 * Un écart entre le site et la fiche publique est une donnée structurée
 * trompeuse (CLAUDE.md, règle 7bis du skill seo-geo-portfolio).
 */

export const FICHE_GOOGLE_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJlTa-96dvUigRyeCBbLb8qkw";

/** Formulaire officiel de Google pour déposer un avis sur la fiche */
export const LAISSER_AVIS_URL =
  "https://search.google.com/local/writereview?placeid=ChIJlTa-96dvUigRyeCBbLb8qkw";

export type AvisGoogle = {
  auteur: string;
  /** Mois de publication tel qu'affiché, ex. « août 2026 » */
  date: string;
  note: 1 | 2 | 3 | 4 | 5;
  /** Texte exact de la fiche ; les paragraphes sont séparés par une ligne vide (\n\n) */
  texte: string;
};

/** Du plus récent au plus ancien */
export const avisGoogle: AvisGoogle[] = [
  {
    auteur: "Nico Las",
    date: "novembre 2026",
    note: 5,
    texte:
      "J'ai déjà fait appelle à Christophe pour la création du site de mon entreprise. Il a été d'excellents conseils, très réactif et a su s'adapter à mon projet. J'ai aussi apprécier de pouvoir échanger facilement avec lui tout au long du projet! Le site cartonne et j'en ai eu que d'excellents retours! Encore un grand merci à lui Je recommande très fortement!",
  },
  {
    auteur: "Stacy Menendez",
    date: "août 2026",
    note: 5,
    texte:
      "Christophe est un excellent développeur web. Je tiens à le remercier pour son honnêteté, sa patience, sa disponibilité et son amabilité. Il accompagne véritablement ses clients du début jusqu’à la fin de leur projet, avec sérieux et implication.\n\nJ’ai personnellement fait appel à lui pour la création de mon site Lune-Soleil, et je suis très satisfaite du travail réalisé. Il s’est montré particulièrement investi, persévérant et attentif afin de toujours trouver des solutions et de mener le projet à bien.\n\nMerci encore pour votre travail, votre professionnalisme et surtout votre patience. Je recommande Christophe sans hésitation !",
  },
];

/**
 * Note moyenne calculée depuis la liste. Elle doit rester égale à celle que
 * Google affiche sur la fiche : si Google arrondit autrement, c'est la fiche
 * qui fait foi.
 */
export const noteMoyenne =
  avisGoogle.reduce((total, a) => total + a.note, 0) / Math.max(avisGoogle.length, 1);
