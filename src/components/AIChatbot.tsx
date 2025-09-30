import { Bot, MessageCircle, Send, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import chatbotAnimation from "../animations/chatbot.json";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showRobotBubble, setShowRobotBubble] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Contexte complet de Christophe pour Mistral AI
  const SYSTEM_CONTEXT = `Tu es l'assistant virtuel de Christophe Mostefaoui, développeur web freelance expert basé à Pau (64).

INFORMATIONS IMPORTANTES SUR CHRISTOPHE :

PROFIL :
- Nom : Christophe Mostefaoui
- Âge : 37 ans
- Localisation : Pau/Artix, Pyrénées-Atlantiques (64)
- Statut : Freelance Full-Stack MERN + Symfony
- Site web : christophe-dev-freelance.fr
- Email : christophe.mostefaoui.dev@gmail.com
- Téléphone : 06 79 08 88 45
- GitHub : github.com/krismos64
- Linkedin : https://www.linkedin.com/in/christophemostefaoui/
SERVICES PROPOSÉS :
1. Développement d'applications web sur mesure (React.js/Node.js)
2. Création de plateformes SaaS complètes
3. Sites e-commerce avec système de paiement intégré
4. Intégration d'IA (ChatGPT, Claude, Mistral etc.)

COMPÉTENCES TECHNIQUES :
- Frontend : React.js 18, TypeScript, Next.js 14, TailwindCSS, Framer Motion
- Backend : Node.js, Express, API REST, GraphQL
- Bases de données : MySQL, MongoDB, PostgreSQL, Prisma ORM
- DevOps : Docker, CI/CD, GitHub Actions
- Paiement : Stripe, PayPal
- Temps réel : WebSockets, Socket.io
- IA : Intégration OpenAI, Anthropic Claude, Mistral
- CMS : WordPress, Strapi
- PHP : Symfony 7 (stack secondaire)

PROJETS PHARES :
1. STAKA LIVRES (livresstaka.fr)
   - Plateforme e-commerce de livres d'occasion
   - 10,000+ livres référencés
   - Système de paiement Stripe intégré
   - Multi-vendeurs, gestion des stocks
   - Technologies : React, Node.js, MySQL, Stripe

2. SMARTPLANNING
   - SaaS de gestion de planning pour entreprises
   - Multi-entreprises, multi-utilisateurs
   - Synchronisation temps réel
   - Notifications automatiques
   - Technologies : React, Node.js, MongoDB, WebSockets

3. AUTRES RÉALISATIONS
   - Sites vitrines modernes et optimisés SEO
   - Applications métiers sur mesure
   - Dashboards analytiques

TARIFS :
- TJM (Taux Journalier Moyen) : 250€
- Site vitrine : à partir de 1000€
- Application web : à partir de 3000€
- Plateforme SaaS : sur devis personnalisé
- Maintenance mensuelle : à partir de 80€

MÉTHODE DE TRAVAIL :
1. Analyse des besoins et conseil gratuit
2. Proposition technique et commerciale
3. Maquettage et validation UX/UI
4. Développement agile par sprints
5. Tests et optimisations (SEO, performances)
6. Déploiement et formation
7. Maintenance et évolutions

VALEURS & APPROCHE :
- Code propre et maintenable
- Sécurité OWASP
- Performance optimisée (Core Web Vitals 90+)
- SEO technique avancé
- Design moderne et UX soignée
- Documentation complète
- Support réactif (réponse sous 24h)

DISPONIBILITÉ :
- Remote pour toute la France
- Présentiel dans les Pyrénées-Atlantiques, déplacements gratuits possibles
- Disponible pour missions courtes ou longues
- Démarrage rapide possible

RÈGLES IMPORTANTES :
1. Tu réponds UNIQUEMENT aux questions concernant Christophe et ses services
2. Si on te demande quelque chose hors sujet, réponds poliment : "Je suis l'assistant de Christophe Mostefaoui et je peux uniquement vous renseigner sur ses services de développement web."
3. Sois professionnel mais chaleureux
4. Pour les demandes de devis, oriente vers le formulaire de contact ou l'email
5. Mets en avant l'expertise et l'expérience de Christophe
6. Utilise des emojis avec parcimonie pour rendre la conversation plus agréable`;

  // Clé API Mistral
  const MISTRAL_API_KEY = "FwtWUW9ylbegvlKbEAP94tMg2vRgRWI7";
  const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

  // Détection automatique du thème (dark/light mode)
  useEffect(() => {
    const detectTheme = () => {
      // Détection via la classe 'dark' sur html ou body
      const isDark = document.documentElement.classList.contains('dark') ||
                    document.body.classList.contains('dark') ||
                    // Détection via prefers-color-scheme
                    window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
    };

    // Détection initiale
    detectTheme();

    // Observer les changements de classe sur l'élément html
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Observer les changements de prefers-color-scheme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', detectTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', detectTheme);
    };
  }, []);

  useEffect(() => {
    // Bulle robot qui apparaît toutes les 3 secondes
    const robotBubbleTimer = setInterval(() => {
      if (!isOpen) {
        setShowRobotBubble(true);
        // La bulle disparaît après 2 secondes
        setTimeout(() => setShowRobotBubble(false), 2000);
      }
    }, 3000);

    return () => clearInterval(robotBubbleTimer);
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpen = () => {
    setIsOpen(true);
    setShowWelcome(false);
    setShowRobotBubble(false);

    // Message de bienvenue initial
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "Bonjour ! 👋 Je suis l'assistant de Christophe ! Comment puis-je vous aider avant de le contacter ?",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Appel à l'API Mistral
      const response = await fetch(MISTRAL_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          model: "open-mistral-7b", // Modèle gratuit
          messages: [
            { role: "system", content: SYSTEM_CONTEXT },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: input.trim() },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur API Mistral");
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erreur:", error);

      // Message d'erreur avec fallback
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "⚠️ La connexion avec l'IA n'est pas configurée. Pour activer le chatbot :\n\n1. Créez un compte gratuit sur console.mistral.ai\n2. Générez une clé API\n3. Remplacez VOTRE_CLE_API_MISTRAL_ICI dans le fichier AIChatbot.tsx\n\nEn attendant, contactez directement Christophe à contact@christophe-dev-freelance.fr",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Bulle de salut du robot - Design futuriste */}
      {showRobotBubble && !isOpen && (
        <div
          className={`fixed bottom-32 right-4 p-4 rounded-2xl shadow-2xl max-w-xs animate-bounce cursor-pointer z-40 backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
            isDarkMode
              ? 'bg-gray-900/90 text-white border-cyan-500/30 shadow-cyan-500/20'
              : 'bg-white/90 text-gray-900 border-blue-500/30 shadow-blue-500/20'
          }`}
          onClick={handleOpen}
        >
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              isDarkMode ? 'bg-cyan-400' : 'bg-blue-500'
            }`}></div>
            <p className="text-sm font-medium">
              👋 Salut ! Besoin d'aide ?
            </p>
          </div>
          <div className={`absolute bottom-0 right-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent transform translate-y-full ${
            isDarkMode ? 'border-t-gray-900/90' : 'border-t-white/90'
          }`}></div>
        </div>
      )}

      {/* Robot animé flottant - Design futuriste */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleOpen}
            className="relative bg-transparent transition-all duration-500 hover:scale-110 focus:outline-none group"
            aria-label="Ouvrir le chat"
          >
            {/* Cercles d'onde futuristes */}
            <div className={`absolute inset-0 rounded-full animate-ping ${
              isDarkMode ? 'bg-cyan-400/30' : 'bg-blue-500/30'
            }`}></div>
            <div className={`absolute inset-2 rounded-full animate-ping delay-1000 ${
              isDarkMode ? 'bg-purple-400/20' : 'bg-indigo-500/20'
            }`}></div>

            {/* Robot avec effet glassmorphism */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20 shadow-2xl">
              <Lottie
                animationData={chatbotAnimation}
                loop={true}
                className="w-16 h-16 drop-shadow-lg filter group-hover:brightness-110 transition-all duration-300"
              />
            </div>

            {/* Effet de halo au hover */}
            <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500'
                : 'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500'
            } blur-xl`}></div>
          </button>
        </div>
      )}

      {/* Fenêtre de chat - Design futuriste */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-96 h-[600px] rounded-3xl shadow-2xl flex flex-col z-50 backdrop-blur-xl border overflow-hidden transition-all duration-500 ${
          isDarkMode
            ? 'bg-gray-900/95 border-cyan-500/30 shadow-cyan-500/20'
            : 'bg-white/95 border-blue-500/30 shadow-blue-500/20'
        }`}>
          {/* Header futuriste */}
          <div className={`relative p-4 flex items-center justify-between overflow-hidden ${
            isDarkMode
              ? 'bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 text-white'
              : 'bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-purple-600/90 text-white'
          }`}>
            {/* Effet de particules animées */}
            <div className="absolute inset-0 opacity-30">
              <div className={`absolute top-2 left-4 w-1 h-1 rounded-full animate-pulse ${
                isDarkMode ? 'bg-cyan-400' : 'bg-white'
              }`}></div>
              <div className={`absolute top-6 right-8 w-0.5 h-0.5 rounded-full animate-pulse delay-500 ${
                isDarkMode ? 'bg-purple-400' : 'bg-white'
              }`}></div>
              <div className={`absolute bottom-3 left-12 w-0.5 h-0.5 rounded-full animate-pulse delay-1000 ${
                isDarkMode ? 'bg-pink-400' : 'bg-white'
              }`}></div>
            </div>
            <div className="relative flex items-center gap-3 z-10">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 shadow-lg">
                  <img
                    src="/assets/images/Chris-profil.jpg"
                    alt="Christophe Mostefaoui"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Indicateur en ligne */}
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white animate-pulse ${
                  isDarkMode ? 'bg-cyan-400' : 'bg-green-400'
                }`}></div>
              </div>
              <div>
                <h3 className="font-semibold text-white/95">Assistant virtuel de Christophe</h3>
                <p className="text-xs text-white/70">Concepteur développeur d'applications web</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="relative z-10 hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:scale-110 group"
              aria-label="Fermer le chat"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Messages avec effet glassmorphism */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 relative ${
            isDarkMode
              ? 'bg-gradient-to-b from-gray-900/50 to-gray-800/50'
              : 'bg-gradient-to-b from-gray-50/50 to-white/50'
          }`}>
            {/* Effet de grille futuriste en arrière-plan */}
            <div className={`absolute inset-0 opacity-5 ${
              isDarkMode ? 'bg-cyan-500' : 'bg-blue-500'
            }`} style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`relative animate-fade-in ${
                  message.role === "user" ? "flex justify-end" : ""
                }`}
              >
                <div
                  className={`relative max-w-[80%] p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-500/90 to-purple-600/90 text-white border-blue-400/30 shadow-blue-500/20"
                      : isDarkMode
                      ? "bg-gray-800/80 border-cyan-500/20 text-white shadow-cyan-500/10"
                      : "bg-white/80 border-blue-500/20 text-gray-900 shadow-blue-500/10"
                  } shadow-xl`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      message.role === "user"
                        ? "text-blue-100"
                        : isDarkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="relative animate-fade-in">
                <div className={`relative max-w-[80%] p-4 rounded-2xl backdrop-blur-sm border shadow-xl ${
                  isDarkMode
                    ? 'bg-gray-800/80 border-cyan-500/20 shadow-cyan-500/10'
                    : 'bg-white/80 border-blue-500/20 shadow-blue-500/10'
                }`}>
                  <div className="flex gap-2 items-center">
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDarkMode ? 'bg-cyan-400' : 'bg-blue-500'
                    }`} />
                    <div className={`w-2 h-2 rounded-full animate-bounce delay-100 ${
                      isDarkMode ? 'bg-purple-400' : 'bg-indigo-500'
                    }`} />
                    <div className={`w-2 h-2 rounded-full animate-bounce delay-200 ${
                      isDarkMode ? 'bg-pink-400' : 'bg-purple-500'
                    }`} />
                    <span className={`text-xs ml-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>Christophe réfléchit...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input futuriste */}
          <div className={`relative p-4 backdrop-blur-xl border-t overflow-hidden ${
            isDarkMode
              ? 'bg-gray-900/90 border-cyan-500/20'
              : 'bg-white/90 border-blue-500/20'
          }`}>
            {/* Effet de lueur en bas */}
            <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${
              isDarkMode
                ? 'from-transparent via-cyan-500 to-transparent'
                : 'from-transparent via-blue-500 to-transparent'
            } opacity-50`}></div>

            <div className="relative flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez votre question à Christophe..."
                  className={`w-full px-5 py-3 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:scale-[1.02] ${
                    isDarkMode
                      ? 'bg-gray-800/80 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400 focus:shadow-cyan-500/20'
                      : 'bg-white/80 border-blue-500/30 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:shadow-blue-500/20'
                  } focus:shadow-xl`}
                  disabled={isLoading}
                />
                {/* Indicateur de saisie */}
                {input && (
                  <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full animate-pulse ${
                    isDarkMode ? 'bg-cyan-400' : 'bg-blue-500'
                  }`}></div>
                )}
              </div>

              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={`relative px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-110 disabled:scale-100 focus:outline-none group overflow-hidden ${
                  !input.trim() || isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : isDarkMode
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500'
                } text-white shadow-lg hover:shadow-xl`}
                aria-label="Envoyer"
              >
                {/* Effet de brillance au hover */}
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <Send className={`relative w-5 h-5 transition-transform duration-300 ${
                  isLoading ? 'animate-spin' : 'group-hover:translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
