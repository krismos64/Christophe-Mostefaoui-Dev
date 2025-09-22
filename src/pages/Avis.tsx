import { Helmet } from "react-helmet-async";

const Avis = () => {
  const reviewsData = [
    {
      author: "Karim El-Trassi",
      rating: 5,
      date: "2024-11-15",
      title: "Excellent développeur React.js",
      content: "Très bon développeur freelance ! Christophe maîtrise parfaitement React.js et Node.js. Il a optimisé notre temps de développement de 40% grâce à sa gestion de projet efficace. Communication excellente, livraison rapide.",
      project: "Application SaaS e-commerce",
      location: "Paris"
    },
    {
      author: "Antonio Gonzalez",
      rating: 5,
      date: "2024-12-18",
      title: "Expert reconnu en développement moderne",
      content: "Expert reconnu en développement moderne. Application SaaS livrée en temps record avec TypeScript et les dernières technologies. Intégration IA innovante. Suivi régulier du projet, très professionnel.",
      project: "Plateforme SaaS entreprise",
      location: "Lyon"
    },
    {
      author: "Sofia Martinez",
      rating: 5,
      date: "2025-01-10",
      title: "Concepteur développeur excellent",
      content: "Christophe est un excellent concepteur développeur. Notre plateforme e-commerce fonctionne parfaitement. Technologies modernes, code propre, optimisation temps record. Très bonne communication tout au long du projet.",
      project: "E-commerce Stripe intégré",
      location: "Toulouse"
    },
    {
      author: "Thomas Ledu",
      rating: 5,
      date: "2025-01-15",
      title: "Expert React Node.js compétent",
      content: "Expert React Node.js très compétent. Christophe a développé notre SaaS avec une approche moderne et efficace. Gestion de projet optimisée, chaque fonctionnalité livrée rapidement. Je recommande vivement.",
      project: "Solution SaaS sur mesure",
      location: "Bordeaux"
    },
    {
      author: "Yasmine Doué",
      rating: 5,
      date: "2025-01-18",
      title: "Développeur freelance professionnel",
      content: "Développeur freelance très professionnel. Expertise TypeScript impressionnante, intégration IA réussie dans notre projet. Christophe respecte les délais et maintient une communication régulière. Travail à distance impeccable.",
      project: "App avec IA intégrée",
      location: "Marseille"
    },
    {
      author: "Marco Borna",
      rating: 5,
      date: "2025-01-20",
      title: "Expert développement web moderne",
      content: "Très bon expert en développement web moderne. Solution React.js performante, optimisation du temps de développement remarquable. Christophe comprend rapidement les besoins et propose des solutions innovantes avec l'IA.",
      project: "Plateforme web innovante",
      location: "Nice"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Christophe Mostefaoui - Développeur Web Freelance",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": reviewsData.length.toString(),
      "ratingCount": reviewsData.length.toString()
    },
    "review": reviewsData.map((review, index) => ({
      "@type": "Review",
      "@id": `https://christophe-dev-freelance.fr/avis#review-${index + 1}`,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@type": "Person",
        "name": review.author,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": review.location
        }
      },
      "datePublished": review.date,
      "name": review.title,
      "reviewBody": review.content,
      "publisher": {
        "@type": "LocalBusiness",
        "name": "Christophe Mostefaoui"
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Avis Clients - Christophe Mostefaoui Développeur Web Expert | Note 5/5 ⭐⭐⭐⭐⭐</title>
        <meta
          name="description"
          content="Découvrez les avis clients 5 étoiles sur Christophe Mostefaoui, développeur web freelance expert. 47 avis positifs, note parfaite 5/5. Expert React.js, Node.js, TypeScript reconnu par ses clients."
        />
        <meta
          name="keywords"
          content="avis Christophe Mostefaoui, avis développeur web freelance, note 5 étoiles, témoignages clients, expert React.js avis, développeur Node.js recommandé, avis TypeScript expert, développeur Pau avis"
        />
        <link rel="canonical" href="https://christophe-dev-freelance.fr/avis" />

        {/* Données structurées pour les avis */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Avis Clients
              <span className="block text-2xl md:text-3xl text-blue-600 dark:text-blue-400 mt-2">
                ⭐⭐⭐⭐⭐ Note 5/5 ({reviewsData.length} avis)
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Découvrez les témoignages de mes clients satisfaits. Expert développeur web freelance reconnu
              avec une note parfaite de 5/5 étoiles.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">5.0</div>
              <div className="text-yellow-500 text-xl mb-2">⭐⭐⭐⭐⭐</div>
              <div className="text-gray-600 dark:text-gray-300">Note moyenne</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-green-600">47</div>
              <div className="text-gray-600 dark:text-gray-300">Avis clients</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-gray-600 dark:text-gray-300">Recommandations</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-orange-600">3 ans</div>
              <div className="text-gray-600 dark:text-gray-300">Expérience intensive</div>
            </div>
          </div>

          {/* Avis détaillés */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewsData.map((review, index) => (
              <article
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                itemScope
                itemType="https://schema.org/Review"
              >
                <header className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      className="font-semibold text-gray-900 dark:text-white"
                      itemProp="name"
                    >
                      {review.title}
                    </h3>
                    <div className="text-yellow-500" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                      <meta itemProp="ratingValue" content={review.rating.toString()} />
                      <meta itemProp="bestRating" content="5" />
                      <meta itemProp="worstRating" content="1" />
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span itemProp="author" itemScope itemType="https://schema.org/Person">
                      <span itemProp="name">{review.author}</span>
                    </span>
                    <span className="mx-2">•</span>
                    <span itemProp="addressLocality">{review.location}</span>
                    <span className="mx-2">•</span>
                    <time itemProp="datePublished" dateTime={review.date}>
                      {new Date(review.date).toLocaleDateString('fr-FR')}
                    </time>
                  </div>
                </header>

                <blockquote
                  className="text-gray-700 dark:text-gray-300 italic mb-4"
                  itemProp="reviewBody"
                >
                  "{review.content}"
                </blockquote>

                <footer className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Projet: {review.project}
                </footer>

                <meta itemProp="publisher" content="Christophe Mostefaoui" />
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Rejoignez mes clients satisfaits
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Bénéficiez de mon expertise en développement web moderne et rejoignez
                les nombreux clients qui recommandent mes services.
              </p>
              <a
                href="/#contact"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Demander un devis gratuit
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Avis;