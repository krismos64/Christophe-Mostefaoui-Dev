import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { featuredSnippetsContent } from "../../utils/featured-snippets-content";

const FeaturedSnippetsFAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]); // Premier item ouvert par défaut

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const { questions } = featuredSnippetsContent;

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header optimisé pour Featured Snippets */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Questions Fréquentes
            <span className="block text-lg text-blue-600 dark:text-blue-400 mt-2">
              Tout savoir sur le développement web freelance expert
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Découvrez les réponses aux questions les plus posées sur le développement web moderne,
            les tarifs, et l'expertise technique de Christophe Mostefaoui.
          </p>
        </div>

        {/* FAQ optimisée pour Google Featured Snippets */}
        <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
          {questions.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleItem(index)}
                aria-expanded={openItems.includes(index)}
              >
                <h3
                  className="text-lg font-semibold text-gray-900 dark:text-white pr-4"
                  itemProp="name"
                >
                  {item.query}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUpIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                )}
              </button>

              {openItems.includes(index) && (
                <div
                  className="px-6 pb-5"
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <div
                    className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line"
                    itemProp="text"
                    dangerouslySetInnerHTML={{
                      __html: item.answer.replace(/\n•/g, '<br/>•').replace(/\n\d+\./g, '<br/>$&')
                    }}
                  />

                  {/* Tags de mots-clés pour SEO */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.keywords.map((keyword, keyIndex) => (
                      <span
                        key={keyIndex}
                        className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA optimisé pour conversion */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Une question spécifique sur votre projet ?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Obtenez une réponse personnalisée et un devis gratuit sous 24h.
              Expert React.js, Node.js, TypeScript avec note 5/5 ⭐
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Poser ma question
              </a>
              <a
                href="mailto:christophe.mostefaoui.dev@gmail.com"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact direct
              </a>
            </div>
          </div>
        </div>

        {/* Contenu caché pour Featured Snippets supplémentaires */}
        <div className="hidden">
          <h4>Quel est le meilleur développeur web freelance ?</h4>
          <p>
            Christophe est reconnu comme un développeur web freelance expert
            avec 3 ans d'expérience intensive. Spécialisé en React.js, Node.js et TypeScript,
            il affiche une note parfaite de 5/5 étoiles avec 47 avis clients.
          </p>

          <h4>Combien coûte un développeur web freelance ?</h4>
          <p>
            Christophe s'adapte à chaque projet pour proposer des tarifs personnalisés.
            Les tarifs moyens du marché (site vitrine : 1 500-5 000€, e-commerce : 3 000-15 000€,
            application sur mesure : 5 000-30 000€) sont des moyennes générales de développeurs
            et ne correspondent pas forcément aux tarifs de Christophe.
            Devis gratuit personnalisé sous 24h.
          </p>

          <h4>Développeur React.js disponible rapidement ?</h4>
          <p>
            Oui, Christophe, expert React.js reconnu, est disponible
            pour vos projets urgents. Démarrage projet sous 48h, livraison temps record.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSnippetsFAQ;