import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import FuturisticBackground from "../components/effects/FuturisticBackground";
import { containerVariants, itemVariants } from "../components/effects/FuturisticEffects";

const FAQ: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  // Données de la FAQ
  const faqData = [
    {
      question: "Quels types de projets réalisez-vous ?",
      answer: (
        <>
          Je développe :
          <ul className="mt-2 space-y-1">
            <li>
              🖥️ <strong>Sites web vitrines</strong>
            </li>
            <li>
              ⚙️ <strong>Applications web sur mesure</strong>
            </li>
            <li>
              🤖 Solutions intégrant des{" "}
              <strong>technologies d'intelligence artificielle</strong>{" "}
              (chatbots interactifs, etc.)
            </li>
          </ul>
        </>
      ),
    },
    {
      question: "Comment fonctionne votre système de devis et de paiement ?",
      answer: (
        <>
          Je propose :
          <ul className="mt-2 space-y-1">
            <li>
              📄 Un <strong>devis détaillé gratuit</strong> avant de démarrer
            </li>
            <li>
              💳 Un <strong>acompte de 30%</strong> à la signature pour lancer
              le projet
            </li>
            <li>
              📦 Le solde à la <strong>livraison du produit final</strong>
            </li>
          </ul>
          <p className="mt-2">
            Vous recevez également toute la documentation technique (cahier des
            charges, schémas, etc.).
          </p>
        </>
      ),
    },
    {
      question: "Quels sont vos tarifs ?",
      answer: (
        <>
          Voici mes tarifs indicatifs :
          <ul className="mt-2 space-y-1">
            <li>🖥️ <strong>Site One-Page :</strong> 800€ – 1 500€ (artisans, indépendants)</li>
            <li>📄 <strong>Site Multi-pages :</strong> 1 500€ – 3 000€ (commerces, PME)</li>
            <li>🚀 <strong>Site Sur-mesure :</strong> À partir de 3 000€ (projets complexes, IA)</li>
            <li>🎬 <strong>Vidéo & Drone :</strong> Sur devis</li>
          </ul>
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
            <strong>💳 Paiement en 3x sans frais possible.</strong> Chaque devis est personnalisé selon la complexité et les fonctionnalités demandées.
          </div>
          <p className="mt-3">
            N'hésitez pas à demander un <strong>devis gratuit et sans engagement sous 24h</strong> !
          </p>
        </>
      ),
    },
    {
      question: "Êtes-vous disponible pour des rencontres locales ?",
      answer: (
        <>
          Oui ! <strong>Déplacement gratuit dans tout le département des Pyrénées-Atlantiques (64)</strong> pour un premier rendez-vous :
          <ul className="mt-2 space-y-1">
            <li>📍 Pau, Lescar, Billère, Jurançon, Artix</li>
            <li>📍 Bayonne, Biarritz, Anglet, Saint-Jean-de-Luz</li>
            <li>📍 Orthez, Oloron-Sainte-Marie, Mourenx</li>
          </ul>
          <p className="mt-2">
            Pour les clients hors département, je travaille <strong>partout en France en distanciel</strong> (visioconférence, partage d'écran, messagerie instantanée).
          </p>
        </>
      ),
    },
    {
      question:
        "Pouvez-vous capturer du contenu pour mon projet lors de vos déplacements ?",
      answer: (
        <>
          Absolument ! Lors de mes visites, je peux :
          <ul className="mt-2 space-y-1">
            <li>📸 Capturer des photos professionnelles</li>
            <li>🎥 Réaliser des vidéos de vos locaux ou produits</li>
            <li>
              🎞️ Transformer ces contenus en <strong>montages vidéo</strong>{" "}
              professionnels adaptés à votre communication digitale
            </li>
          </ul>
        </>
      ),
    },
    {
      question: "Quels sont vos délais moyens pour un projet ?",
      answer: (
        <>
          Cela dépend de la complexité :
          <ul className="mt-2 space-y-1">
            <li>
              ⏳ <strong>Site vitrine :</strong> 1 à 2 semaines
            </li>
            <li>
              🛠️ <strong>Application web personnalisée :</strong> 3 à 6 semaines
            </li>
            <li>
              🤖 <strong>Projets complexes ou avec IA :</strong> Sur devis après
              étude
            </li>
          </ul>
        </>
      ),
    },
    {
      question:
        "Proposez-vous des services de maintenance ou de mise à jour après livraison ?",
      answer: (
        <>
          Oui ! Je propose des services de maintenance pour :
          <ul className="mt-2 space-y-1">
            <li>
              🔒 Assurer la <strong>sécurité</strong> de votre site ou
              application
            </li>
            <li>
              📈 Effectuer les <strong>mises à jour nécessaires</strong>
            </li>
            <li>
              🚀 Ajouter des <strong>évolutions</strong> pour répondre à vos
              besoins futurs
            </li>
          </ul>
        </>
      ),
    },
    {
      question: "Quels outils et technologies utilisez-vous ?",
      answer: (
        <>
          Voici les technologies et outils que j'utilise :
          <ul className="mt-2 space-y-1">
            <li>
              🖌️ <strong>Frontend :</strong> HTML, CSS, JavaScript, React
            </li>
            <li>
              ⚙️ <strong>Backend :</strong> Symfony, Node.js, PHP
            </li>
            <li>
              🗄️ <strong>Bases de données :</strong> MySQL, MongoDB
            </li>
            <li>
              🛠️ <strong>Outils :</strong> Git, Docker, Visual Studio Code
            </li>
          </ul>
          <p className="mt-2">
            Je reste en veille constante pour intégrer les dernières innovations.
          </p>
        </>
      ),
    },
    {
      question: "Comment se déroule la collaboration sur un projet ?",
      answer: (
        <>
          Voici les principales étapes :
          <ol className="mt-2 space-y-1 list-decimal list-inside">
            <li>
              📞 <strong>Prise de contact :</strong> Vous m'expliquez votre
              projet et vos besoins
            </li>
            <li>
              📄 <strong>Devis et planification :</strong> Un devis gratuit est
              réalisé
            </li>
            <li>
              🏠 <strong>Déplacement (si nécessaire) :</strong> Une visite pour
              comprendre vos attentes
            </li>
            <li>
              💻 <strong>Développement :</strong> Le projet est réalisé après
              validation
            </li>
            <li>
              ✅ <strong>Validation et livraison :</strong> Vous recevez le
              produit final
            </li>
            <li>
              🔧 <strong>Suivi :</strong> Maintenance et évolutions (optionnel)
            </li>
          </ol>
        </>
      ),
    },
    {
      question: "Puis-je suivre l'avancement de mon projet ?",
      answer: (
        <>
          Oui ! Je vous tiens régulièrement informé avec :
          <ul className="mt-2 space-y-1">
            <li>📅 Des points hebdomadaires pour ajuster le projet</li>
            <li>📩 Des mises à jour sur l'état d'avancement</li>
          </ul>
        </>
      ),
    },
    {
      question:
        "Pourquoi mettez-vous l'accent sur les rencontres locales et le contenu personnalisé ?",
      answer: (
        <p>
          Je crois fermement que les échanges humains et une immersion dans votre environnement permettent de mieux comprendre vos besoins. Lors de mes déplacements, je prends le temps de m'imprégner de votre projet et de capturer des éléments authentiques (photos/vidéos) pour refléter parfaitement votre identité.
        </p>
      ),
    },
    {
      question: "Pourquoi vous choisir ?",
      answer: (
        <p>
          Avec un parcours combinant une forte expérience client, une passion pour le développement web et une approche humaine basée sur l'échange local, je suis convaincu de pouvoir transformer vos idées en projets concrets et innovants. Mon attention aux détails, ma communication claire et mes livrables bien documentés font toute la différence.
        </p>
      ),
    },
  ];

  // Gestion de l'état pour ouvrir/fermer les réponses
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Fonction pour ouvrir/fermer une question
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Schema.org FAQ pour le SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof item.answer === "string"
          ? item.answer
          : "Consultez notre page FAQ pour plus de détails.",
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>FAQ - Christophe Mostefaoui | Développeur Web Freelance Pau</title>
        <meta
          name="description"
          content="Questions fréquentes sur mes services de développement web freelance à Pau. Tarifs, délais, technologies, processus de travail - toutes les réponses."
        />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <FuturisticBackground
        className="min-h-screen pt-24 pb-16"
        orbs={[
          { size: 300, colorClass: "glowing-orb-cyan", left: "5%", top: "15%", delay: 0 },
          { size: 260, colorClass: "glowing-orb-purple", left: "85%", top: "40%", delay: 1.5 },
          { size: 200, colorClass: "glowing-orb-pink", left: "50%", top: "75%", delay: 3 },
        ]}
        shapes={[
          { delay: 0, duration: 12, size: 50, left: "8%", top: "30%", shape: "hexagon" },
          { delay: 1.5, duration: 14, size: 45, left: "92%", top: "20%", shape: "circle" },
          { delay: 2.5, duration: 10, size: 40, left: "88%", top: "70%", shape: "square" },
        ]}
        codeLines={[
          { delay: 0.5, width: "40%" },
          { delay: 2, width: "55%" },
        ]}
      >
        <div className="container mx-auto px-6 relative z-10" ref={contentRef}>
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg"
            >
              <HelpCircle className="w-10 h-10" />
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Questions Fréquentes
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Tout ce que vous devez savoir sur mes services de développement web
            </motion.p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            className="max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="mb-4"
              >
                <motion.div
                  className="card-futuristic overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="card-futuristic-glow" />

                  {/* Question */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full relative z-10 p-5 flex items-center justify-between text-left transition-colors"
                  >
                    <span className={`text-lg font-semibold pr-4 transition-colors ${
                      openIndex === index
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-900 dark:text-white"
                    }`}>
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 p-2 rounded-full transition-colors ${
                        openIndex === index
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="relative z-10 px-5 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed">
                          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <div className="mt-3">
                              {item.answer}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8 }}
          >
            <div className="card-futuristic p-8 max-w-2xl mx-auto">
              <div className="card-futuristic-glow" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Une question non listée ?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  N'hésitez pas à me contacter directement, je vous répondrai dans les plus brefs délais.
                </p>
                <motion.a
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Me contacter
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </FuturisticBackground>
    </>
  );
};

export default FAQ;
