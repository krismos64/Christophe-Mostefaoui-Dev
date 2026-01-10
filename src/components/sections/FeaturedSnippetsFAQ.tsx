import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { featuredSnippetsContent } from "../../utils/featured-snippets-content";
import FuturisticBackground, { SUBTLE_CONFIG } from "../effects/FuturisticBackground";
import { containerVariants, itemVariants } from "../effects/FuturisticEffects";

const FeaturedSnippetsFAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const { questions } = featuredSnippetsContent;

  return (
    <FuturisticBackground
      {...SUBTLE_CONFIG}
      className="py-16"
      orbs={[
        { size: 220, colorClass: "glowing-orb-cyan", left: "85%", top: "15%", delay: 0 },
        { size: 180, colorClass: "glowing-orb-purple", left: "5%", top: "70%", delay: 2 },
      ]}
      shapes={[
        { delay: 0, duration: 12, size: 35, left: "90%", top: "40%", shape: "circle" },
        { delay: 1.5, duration: 14, size: 40, left: "8%", top: "25%", shape: "hexagon" },
      ]}
      showCorners={false}
    >
      <div className="max-w-4xl mx-auto px-4 relative z-10" ref={contentRef}>
        {/* Header optimisé pour Featured Snippets */}
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Questions Fréquentes
            <span className="block text-lg text-blue-600 dark:text-blue-400 mt-2">
              Tout savoir sur le développement web freelance expert
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Découvrez les réponses aux questions les plus posées sur le développement web moderne,
            les tarifs, et l'expertise technique de Christophe Mostefaoui.
          </motion.p>
        </motion.div>

        {/* FAQ */}
        <div className="space-y-4">
          {questions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="card-futuristic overflow-hidden"
            >
              <div className="card-futuristic-glow" />
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors relative z-10"
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
                <motion.div
                  className="px-6 pb-5 relative z-10"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
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
                        className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full border border-blue-200/50 dark:border-blue-700/50"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA optimisé pour conversion */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">
              Une question spécifique sur votre projet ?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Obtenez une réponse personnalisée et un devis gratuit sous 24h.
              Expert React.js, Node.js, TypeScript.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Poser ma question
              </motion.a>
              <motion.a
                href="mailto:christophe.mostefaoui.dev@gmail.com"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact direct
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Contenu caché pour Featured Snippets supplémentaires */}
        <div className="hidden">
          <h4>Quel est le meilleur développeur web freelance ?</h4>
          <p>
            Christophe est un développeur web freelance expert
            avec 3 ans d'expérience intensive. Spécialisé en React.js, Node.js et TypeScript,
            il accompagne les PME et indépendants dans leur transformation digitale.
          </p>

          <h4>Combien coûte un développeur web freelance ?</h4>
          <p>
            Christophe propose des tarifs adaptés : Site One-Page à partir de 800€,
            Site Multi-pages à partir de 1 500€, Site Sur-mesure à partir de 3 000€.
            Paiement en 3x sans frais possible. Devis gratuit personnalisé sous 24h.
          </p>

          <h4>Développeur React.js disponible rapidement ?</h4>
          <p>
            Oui, Christophe, expert React.js, est disponible
            pour vos projets. Démarrage sous 48h, déplacement gratuit dans le 64.
          </p>
        </div>
      </div>
    </FuturisticBackground>
  );
};

export default FeaturedSnippetsFAQ;
