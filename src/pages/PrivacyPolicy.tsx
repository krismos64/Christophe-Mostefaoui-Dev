export default function PrivacyPolicy() {
  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">
          Politique de Confidentialité
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            1. Collecte des données
          </h2>
          <p className="mb-4">
            Nous collectons les informations que vous nous fournissez via le
            formulaire de contact :
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Nom</li>
            <li>Adresse email</li>
            <li>Message</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            2. Utilisation des données
          </h2>
          <p className="mb-4">Les données collectées sont utilisées pour :</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Répondre à vos demandes de contact</li>
            <li>Vous envoyer des informations relatives à nos services</li>
            <li>Améliorer notre site web et nos services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            3. Conservation des données
          </h2>
          <p className="mb-4">
            Vos données sont conservées pendant une durée de 3 ans à compter de
            notre dernier contact.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Vos droits</h2>
          <p className="mb-4">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc ml-6 mb-4">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Cookies</h2>
          <p className="mb-4">
            Notre site utilise des cookies techniques essentiels au
            fonctionnement du site. Aucun cookie publicitaire n'est utilisé.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Contact</h2>
          <p className="mb-4">
            Pour toute question relative à notre politique de confidentialité,
            vous pouvez nous contacter à : christophe.mostefaoui.dev@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
}
