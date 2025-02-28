import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useTheme } from "../context/ThemeContext";

const FAQ: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Données de la FAQ
  const faqData = [
    {
      question: "Quels types de projets réalisez-vous ?",
      answer: (
        <>
          Je développe :
          <ul>
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
          <ul>
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
          Vous recevez également toute la documentation technique (cahier des
          charges, schémas, etc.).
        </>
      ),
    },
    {
      question: "Êtes-vous disponible pour des rencontres locales ?",
      answer: (
        <>
          Oui, je peux me déplacer dans les zones suivantes :
          <ul>
            <li>📍 Pau</li>
            <li>📍 Tarbes</li>
            <li>📍 Orthez</li>
            <li>📍 Et leurs environs</li>
          </ul>
          Ces rencontres permettent d'échanger humainement, capturer du contenu
          visuel et mieux comprendre vos besoins.
        </>
      ),
    },
    {
      question:
        "Pouvez-vous capturer du contenu pour mon projet lors de vos déplacements ?",
      answer: (
        <>
          Absolument ! Lors de mes visites, je peux :
          <ul>
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
          <ul>
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
          <ul>
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
          <ul>
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
          Je reste en veille constante pour intégrer les dernières innovations.
        </>
      ),
    },
    {
      question: "Comment se déroule la collaboration sur un projet ?",
      answer: (
        <>
          Voici les principales étapes :
          <ol>
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
          <ul>
            <li>📅 Des points hebdomadaires pour ajuster le projet</li>
            <li>📩 Des mises à jour sur l'état d'avancement</li>
          </ul>
        </>
      ),
    },
    {
      question:
        "Pourquoi mettez-vous l'accent sur les rencontres locales et le contenu personnalisé ?",
      answer:
        "Je crois fermement que les échanges humains et une immersion dans votre environnement permettent de mieux comprendre vos besoins. Lors de mes déplacements, je prends le temps de m'imprégner de votre projet et de capturer des éléments authentiques (photos/vidéos) pour refléter parfaitement votre identité.",
    },
    {
      question: "Pourquoi vous choisir ?",
      answer:
        "Avec un parcours combinant une forte expérience client, une passion pour le développement web et une approche humaine basée sur l'échange local, je suis convaincu de pouvoir transformer vos idées en projets concrets et innovants. Mon attention aux détails, ma communication claire et mes livrables bien documentés font toute la différence.",
    },
  ];

  // Gestion de l'état pour ouvrir/fermer les réponses
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Fonction pour ouvrir/fermer une question
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>FAQ</title>
      </Helmet>
      <div className="font-sans pt-20">
        <div
          className={`max-w-3xl mx-auto my-8 p-6 rounded-lg shadow-md transition-colors duration-300 ${
            isDark ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <h1
            className={`text-center text-3xl font-bold mb-8 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            FAQ
          </h1>
          <div className="flex flex-col space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className={`border-b ${
                  isDark ? "border-gray-700" : "border-gray-200"
                } pb-4`}
              >
                <h2
                  onClick={() => toggleFAQ(index)}
                  className={`text-xl font-medium cursor-pointer transition-colors duration-300 ${
                    openIndex === index
                      ? "text-blue-500 dark:text-blue-400"
                      : isDark
                      ? "text-gray-200"
                      : "text-gray-700"
                  }`}
                >
                  {item.question}
                </h2>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } ${
                    openIndex === index
                      ? "max-h-[1000px] opacity-100 mt-3"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="prose dark:prose-invert">{item.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
