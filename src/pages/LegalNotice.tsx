export default function LegalNotice() {
  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Édition du site</h2>
          <p className="mb-4">
            Le site devfreelance.fr est édité par [Votre Nom], entrepreneur
            individuel.
            <br />
            Adresse : [Votre Adresse]
            <br />
            SIRET : [Votre numéro SIRET]
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Hébergement</h2>
          <p className="mb-4">
            Le site est hébergé par Netlify
            <br />
            Adresse : 2325 3rd Street, Suite 215, San Francisco, California
            94107
            <br />
            Site web : netlify.com
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            3. Propriété intellectuelle
          </h2>
          <p className="mb-4">
            L'ensemble du contenu de ce site (textes, images, vidéos, etc.) est
            protégé par le droit d'auteur. Toute reproduction ou représentation,
            totale ou partielle, est interdite sans autorisation expresse.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Responsabilité</h2>
          <p className="mb-4">
            Les informations fournies sur ce site le sont à titre indicatif.
            L'éditeur ne saurait garantir l'exactitude, la complétude et
            l'actualité des informations diffusées.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Litiges</h2>
          <p className="mb-4">
            Les présentes mentions légales sont soumises au droit français. En
            cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </section>
      </div>
    </div>
  );
}
