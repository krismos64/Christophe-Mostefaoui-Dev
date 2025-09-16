import { useEffect, useState } from "react";
import {
  Bot,
  Brain,
  Sparkles,
  MessageSquare,
  TrendingUp,
  Eye,
  BarChart3,
  Users,
  Zap,
  Shield,
  Code2,
  Database,
} from "lucide-react";
import CallToAction from "../common/CallToAction";

export default function AIIntegration() {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const useCases = [
    {
      title: "Chatbot Intelligent",
      icon: <MessageSquare className="h-6 w-6" />,
      description: "Support client 24/7 avec réponses contextuelles",
      example:
        "Un assistant virtuel qui comprend vos clients, répond à leurs questions et les guide vers la conversion.",
      technologies: ["GPT-5", "Claude", "Langchain", "API REST"],
      benefits: [
        "Réduction de 70% du temps de support",
        "Satisfaction client améliorée",
        "Disponibilité 24/7",
      ],
    },
    {
      title: "Analyse Prédictive",
      icon: <TrendingUp className="h-6 w-6" />,
      description: "Anticipez les tendances et comportements clients",
      example:
        "Prédiction des ventes, détection de churn, recommandations personnalisées basées sur l'historique.",
      technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas"],
      benefits: [
        "Décisions data-driven",
        "+35% de conversions",
        "ROI optimisé",
      ],
    },
    {
      title: "Vision par Ordinateur",
      icon: <Eye className="h-6 w-6" />,
      description: "Traitement intelligent d'images et vidéos",
      example:
        "Détection de produits, contrôle qualité automatisé, reconnaissance faciale pour sécurité.",
      technologies: ["OpenCV", "YOLO", "PyTorch", "Cloud Vision API"],
      benefits: ["Automatisation complète", "Précision 99%", "Temps réel"],
    },
    {
      title: "Génération de Contenu",
      icon: <Sparkles className="h-6 w-6" />,
      description: "Création automatique de textes et visuels",
      example:
        "Articles SEO, descriptions produits, emails marketing personnalisés, images générées.",
      technologies: ["GPT-5", "Gemini", "Stable Diffusion", "Midjourney API"],
      benefits: [
        "Production x10 plus rapide",
        "Contenu personnalisé",
        "Coûts réduits",
      ],
    },
  ];

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Intégration Rapide",
      description: "APIs plug & play compatibles avec votre stack existante",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Sécurité & RGPD",
      description:
        "Données chiffrées et conformité totale aux normes européennes",
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Sur Mesure",
      description: "Solutions personnalisées selon vos besoins spécifiques",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Vos Données",
      description: "Exploitation intelligente de vos données existantes",
    },
  ];

  const stats = [
    { value: "85%", label: "Automatisation des tâches" },
    { value: "3x", label: "Productivité augmentée" },
    { value: "60%", label: "Réduction des coûts" },
    { value: "24/7", label: "Disponibilité totale" },
  ];

  return (
    <section
      id="ai-integration"
      className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 transition-all duration-300 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Header avec animation */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              Intelligence Artificielle
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Propulsez votre business dans{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              l'ère de l'IA
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transformez vos processus avec des solutions IA sur mesure. De
            l'automatisation intelligente à l'analyse prédictive, je développe
            les outils qui feront la différence.
          </p>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Use Cases avec tabs */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Solutions IA Concrètes pour Votre Business
          </h3>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {useCases.map((useCase, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === index
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {useCase.icon}
                <span className="hidden sm:inline">{useCase.title}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 transform transition-all duration-500">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
                  {useCases[activeTab].icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {useCases[activeTab].title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {useCases[activeTab].description}
                  </p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 italic">
                  <span className="font-semibold">Exemple concret :</span>{" "}
                  {useCases[activeTab].example}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    Technologies utilisées
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {useCases[activeTab].technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    Bénéfices mesurables
                  </h5>
                  <ul className="space-y-1">
                    {useCases[activeTab].benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2"
                      >
                        <span className="text-green-500">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Pourquoi Choisir Mes Solutions IA ?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex p-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-4 text-purple-600 dark:text-purple-400">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Votre Projet IA en 4 Étapes
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Line connectrice */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-pink-600 hidden md:block"></div>

              {[
                {
                  title: "Analyse & Conseil",
                  description:
                    "Audit de vos besoins, identification des opportunités IA",
                  icon: <Brain />,
                },
                {
                  title: "Conception Sur Mesure",
                  description:
                    "Architecture de la solution, choix des modèles IA adaptés",
                  icon: <Code2 />,
                },
                {
                  title: "Développement & Tests",
                  description:
                    "Implémentation, entraînement des modèles, validation",
                  icon: <Bot />,
                },
                {
                  title: "Déploiement & Suivi",
                  description:
                    "Mise en production, monitoring, optimisation continue",
                  icon: <Users />,
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="relative flex items-start gap-4 mb-8"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg z-10">
                    {step.icon}
                  </div>
                  <div className="flex-1 pt-2">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {index + 1}. {step.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-6 p-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Prêt à Révolutionner Votre Business avec l'IA ?
            </h3>
            <p className="text-lg text-white/90 max-w-2xl">
              Ne restez pas à la traîne. Adoptez l'intelligence artificielle dès
              maintenant et prenez une longueur d'avance sur vos concurrents.
            </p>
            <CallToAction
              variant="white"
              text="Discutons de votre projet IA"
              subtext="Consultation gratuite"
              icon="bot"
              size="large"
              href="#contact"
              location="ai_integration"
              testId="ai_cta_primary"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
