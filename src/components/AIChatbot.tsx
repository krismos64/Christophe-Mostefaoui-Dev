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
      {/* Bulle de salut du robot - Adaptée au thème */}
      {showRobotBubble && !isOpen && (
        <div
          className={`fixed bottom-32 right-4 p-3 rounded-lg shadow-xl max-w-xs animate-bounce cursor-pointer z-40 ${
            isDarkMode
              ? 'bg-gray-800 text-white border border-gray-700'
              : 'bg-blue-600 text-white'
          }`}
          onClick={handleOpen}
        >
          <p className="text-sm font-medium">
            👋 Salut ! Besoin d'aide ?
          </p>
          <div className={`absolute bottom-0 right-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent transform translate-y-full ${
            isDarkMode ? 'border-t-gray-800' : 'border-t-blue-600'
          }`}></div>
        </div>
      )}

      {/* Robot animé flottant - Plus grand et transparent */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleOpen}
            className="relative bg-transparent transition-all duration-300 hover:scale-110 focus:outline-none"
            aria-label="Ouvrir le chat"
          >
            <Lottie
              animationData={chatbotAnimation}
              loop={true}
              className="w-24 h-24 drop-shadow-lg"
            />
            {/* Effet de pulsation subtil */}
            <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 animate-ping"></div>
          </button>
        </div>
      )}

      {/* Fenêtre de chat - Adaptée au thème */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-96 h-[600px] rounded-2xl shadow-2xl flex flex-col z-50 ${
          isDarkMode
            ? 'bg-gray-900 border border-gray-700'
            : 'bg-white border border-gray-200'
        }`}>
          {/* Header */}
          <div className={`p-4 rounded-t-2xl flex items-center justify-between ${
            isDarkMode
              ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-white'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                <img
                  src="/assets/images/Chris-profil.jpg"
                  alt="Christophe Mostefaoui"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">Assistant virtuel de Christophe</h3>
                <p className="text-xs opacity-90">Concepteur développeur d'applications web</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="hover:bg-white/20 p-2 rounded-full transition"
              aria-label="Fermer le chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <img
                        src="/assets/images/Chris-profil.jpg"
                        alt="Christophe"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <div
                  className={`max-w-[70%] p-3 rounded-xl ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : isDarkMode
                      ? "bg-gray-700 border border-gray-600 text-white"
                      : "bg-white border border-gray-200 text-gray-900"
                  }`}
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
              <div className="flex gap-3">
                <div className={`p-2 rounded-full ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}>
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img
                      src="/assets/images/Chris-profil.jpg"
                      alt="Christophe"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${
                  isDarkMode
                    ? 'bg-gray-700 border border-gray-600'
                    : 'bg-white border border-gray-200'
                }`}>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`p-4 border-t rounded-b-2xl ${
            isDarkMode
              ? 'bg-gray-900 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question..."
                className={`flex-1 px-4 py-2 border rounded-full focus:outline-none focus:border-blue-600 ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2 rounded-full transition"
                aria-label="Envoyer"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
