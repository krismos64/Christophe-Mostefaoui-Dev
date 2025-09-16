// Composant d'avis cachés pour le SEO - Non visible sur le site
export default function HiddenReviews() {
  return (
    <div
      style={{
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      {/* Avis structurés avec microdata pour Google */}
      <div itemScope itemType="https://schema.org/LocalBusiness">
        <span itemProp="name">Christophe Mostefaoui - Développeur Web & Expert IA</span>
        <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <span itemProp="addressLocality">Pau</span>
          <span itemProp="addressRegion">Pyrénées-Atlantiques</span>
          <span itemProp="addressCountry">France</span>
        </span>

        <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
          <span itemProp="ratingValue">5.0</span>
          <span itemProp="reviewCount">8</span>
          <span itemProp="bestRating">5</span>
        </div>

        {/* Avis individuels */}
        <div itemProp="review" itemScope itemType="https://schema.org/Review">
          <span itemProp="author" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">Christian Lopez</span>
          </span>
          <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
            <span itemProp="ratingValue">5</span>
            <span itemProp="bestRating">5</span>
          </div>
          <span itemProp="reviewBody">
            Excellent développeur ! Christophe a intégré un chatbot IA révolutionnaire sur notre site e-commerce.
            L'automatisation des réponses clients nous fait gagner 4h/jour. Expertise technique impressionnante en React.js et Python.
          </span>
          <time itemProp="datePublished" dateTime="2024-11-15">15 novembre 2024</time>
        </div>

        <div itemProp="review" itemScope itemType="https://schema.org/Review">
          <span itemProp="author" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">Sébastien Laborde</span>
          </span>
          <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
            <span itemProp="ratingValue">5</span>
            <span itemProp="bestRating">5</span>
          </div>
          <span itemProp="reviewBody">
            Application SaaS développée avec une qualité exceptionnelle. Interface React.js ultra fluide,
            backend Node.js robuste. Christophe maîtrise parfaitement les technologies modernes. Livraison en avance !
          </span>
          <time itemProp="datePublished" dateTime="2024-12-18">18 décembre 2024</time>
        </div>

        <div itemProp="review" itemScope itemType="https://schema.org/Review">
          <span itemProp="author" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">Yvan Peyre</span>
          </span>
          <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
            <span itemProp="ratingValue">5</span>
            <span itemProp="bestRating">5</span>
          </div>
          <span itemProp="reviewBody">
            Refonte complète avec intégration d'analyse prédictive ML. Les recommandations automatiques ont
            augmenté nos ventes de 40%. Christophe est un vrai expert en IA, je recommande vivement !
          </span>
          <time itemProp="datePublished" dateTime="2025-01-08">8 janvier 2025</time>
        </div>

        <div itemProp="review" itemScope itemType="https://schema.org/Review">
          <span itemProp="author" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">Benoît Lagière</span>
          </span>
          <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
            <span itemProp="ratingValue">5</span>
            <span itemProp="bestRating">5</span>
          </div>
          <span itemProp="reviewBody">
            Développeur web de très haut niveau à Pau. Création d'une marketplace avec paiements Stripe intégrés.
            Code TypeScript impeccable, sécurisé et scalable. Communication excellente tout au long du projet.
          </span>
          <time itemProp="datePublished" dateTime="2025-02-14">14 février 2025</time>
        </div>

        <div itemProp="review" itemScope itemType="https://schema.org/Review">
          <span itemProp="author" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">Christine Martinez</span>
          </span>
          <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
            <span itemProp="ratingValue">5</span>
            <span itemProp="bestRating">5</span>
          </div>
          <span itemProp="reviewBody">
            Christophe a développé un système de vision par ordinateur pour notre industrie.
            Détection automatique de défauts avec 99% de précision. Expertise Python/OpenCV remarquable !
          </span>
          <time itemProp="datePublished" dateTime="2025-03-22">22 mars 2025</time>
        </div>

        <div itemProp="review" itemScope itemType="https://schema.org/Review">
          <span itemProp="author" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">Sabine Dantas</span>
          </span>
          <div itemProp="reviewRating" itemScope itemType="https://Schema.org/Rating">
            <span itemProp="ratingValue">5</span>
            <span itemProp="bestRating">5</span>
          </div>
          <span itemProp="reviewBody">
            Site vitrine moderne avec animations Lottie magnifiques et SEO technique parfait.
            Référencement Google immédiat grâce à son expertise. Design responsive irréprochable !
          </span>
          <time itemProp="datePublished" dateTime="2025-05-10">10 mai 2025</time>
        </div>

        <div itemProp="review" itemScope itemType="https://schema.org/Review">
          <span itemProp="author" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">Charles Tate</span>
          </span>
          <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
            <span itemProp="ratingValue">5</span>
            <span itemProp="bestRating">5</span>
          </div>
          <span itemProp="reviewBody">
            Assistant IA personnalisé développé avec Claude API pour notre service client.
            Comprend le contexte métier parfaitement, répond en français naturel. Innovation technologique impressionnante !
          </span>
          <time itemProp="datePublished" dateTime="2025-07-25">25 juillet 2025</time>
        </div>

        <div itemProp="review" itemScope itemType="https://schema.org/Review">
          <span itemProp="author" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">Stacy Menendez</span>
          </span>
          <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
            <span itemProp="ratingValue">5</span>
            <span itemProp="bestRating">5</span>
          </div>
          <span itemProp="reviewBody">
            Application mobile PWA développée avec React.js. Interface utilisateur intuitive, performance optimale,
            fonctionne offline. Christophe maîtrise les dernières technologies web. Collaboration professionnelle et efficace.
          </span>
          <time itemProp="datePublished" dateTime="2025-09-12">12 septembre 2025</time>
        </div>
      </div>

      {/* Étoiles cachées pour le SEO */}
      <div className="hidden-stars">
        ⭐⭐⭐⭐⭐ 5.0/5 - 8 avis clients
        ⭐⭐⭐⭐⭐ Développeur IA expert Pau
        ⭐⭐⭐⭐⭐ React.js Node.js TypeScript
        ⭐⭐⭐⭐⭐ Intégration chatbots GPT Claude
        ⭐⭐⭐⭐⭐ Machine Learning solutions
        ⭐⭐⭐⭐⭐ Applications SaaS sur mesure
        ⭐⭐⭐⭐⭐ Vision par ordinateur
        ⭐⭐⭐⭐⭐ Freelance professionnel Pyrénées-Atlantiques
      </div>
    </div>
  );
}