import { Helmet } from "react-helmet-async";

const BASE_URL = "https://christophe-dev-freelance.fr";

type Props = {
  /** Balise <title>, 60 caractères environ */
  titre: string;
  /** Meta description, 150 caractères environ */
  description: string;
  /** Chemin de la page, ex. "/services" */
  chemin: string;
  /** Nom court affiché dans le fil d'Ariane, ex. "Services" */
  nomCourt: string;
  /** Page parente dans le fil d'Ariane (ex. Services pour une page de service) */
  parent?: { nom: string; chemin: string };
  /** Schémas de PAGE supplémentaires (jamais d'entité d'identité : elles vivent dans index.html) */
  schemas?: Record<string, unknown>[];
};

/**
 * Balises SEO d'une page intérieure : titre, description, canonical,
 * Open Graph, et un graphe JSON-LD WebPage + BreadcrumbList relié à
 * l'entité #business déclarée dans index.html.
 */
export default function PageSeo({ titre, description, chemin, nomCourt, parent, schemas = [] }: Props) {
  const url = `${BASE_URL}${chemin}`;
  const ariane = [
    { name: "Accueil", item: `${BASE_URL}/` },
    ...(parent ? [{ name: parent.nom, item: `${BASE_URL}${parent.chemin}` }] : []),
    { name: nomCourt, item: url },
  ];
  const graphe = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: titre,
        description,
        inLanguage: "fr-FR",
        about: { "@id": `${BASE_URL}/#business` },
        isPartOf: {
          "@type": "WebSite",
          name: "Christophe Mostefaoui - Développeur Web Freelance",
          url: BASE_URL,
        },
        breadcrumb: { "@id": `${url}#ariane` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#ariane`,
        itemListElement: ariane.map((e, i) => ({ "@type": "ListItem", position: i + 1, ...e })),
      },
      ...schemas,
    ],
  };

  return (
    <Helmet>
      <title>{titre}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={titre} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <script type="application/ld+json">{JSON.stringify(graphe)}</script>
    </Helmet>
  );
}
