import { useTheme } from "../context/ThemeContext";

export default function LegalNotice() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="pt-24 pb-12">
      <div
        className={`container mx-auto px-6 ${
          isDark ? "text-gray-200" : "text-gray-800"
        }`}
      >
        <h1
          className={`text-3xl font-bold mb-8 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Mentions Légales
        </h1>

        <section className="mb-8">
          <h2
            className={`text-xl font-semibold mb-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            1. Édition du site
          </h2>
          <p className="mb-4">
            Le site web est édité par Mostefaoui Christophe, entrepreneur
            individuel.
            <br />
            Adresse : 64170 Artix
            <br />
            SIRET : 93771917700019
            <br />
            Mail : christophe.mostefaoui.dev@gmail.com
          </p>
        </section>

        <section className="mb-8">
          <h2
            className={`text-xl font-semibold mb-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            2. Hébergement
          </h2>
          <p className="mb-4">
            Le site est hébergé par Hostinger
            <br />
            Hostinger International Ltd. 61 Lordou Vironos Street, 6023 Larnaca,
            Chypre Téléphone : +370 645 03378 Email : domains@hostinger.com
            <br />
            Site web : Hostinger.com
          </p>
        </section>

        <section className="mb-8">
          <h2
            className={`text-xl font-semibold mb-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            3. Propriété intellectuelle
          </h2>
          <p className="mb-4">
            L'ensemble du contenu de ce site (textes, images, vidéos, etc.) est
            protégé par le droit d'auteur. Toute reproduction ou représentation,
            totale ou partielle, est interdite sans autorisation expresse.
          </p>
        </section>

        <section className="mb-8">
          <h2
            className={`text-xl font-semibold mb-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            4. Responsabilité
          </h2>
          <p className="mb-4">
            Les informations fournies sur ce site le sont à titre indicatif.
            L'éditeur ne saurait garantir l'exactitude, la complétude et
            l'actualité des informations diffusées.
          </p>
        </section>

        <section className="mb-8">
          <h2
            className={`text-xl font-semibold mb-4 ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            5. Litiges
          </h2>
          <p className="mb-4">
            Les présentes mentions légales sont soumises au droit français. En
            cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </section>
      </div>
    </div>
  );
}
