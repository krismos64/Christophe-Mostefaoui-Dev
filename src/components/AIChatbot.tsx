import { Bot, MessageCircle, Send, User, X, ExternalLink, Github, Linkedin, Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import chatbotAnimation from "../animations/chatbot.json";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
  media?: MediaAttachment[];
}

interface MediaAttachment {
  type: 'link' | 'image' | 'project';
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
  tags?: string[];
}

// Composant pour afficher un média attaché
const MediaCard = ({ media, isDarkMode }: { media: MediaAttachment; isDarkMode: boolean }) => {
  const getIcon = () => {
    if (media.url.includes('github')) return <Github className="w-4 h-4" />;
    if (media.url.includes('linkedin')) return <Linkedin className="w-4 h-4" />;
    if (media.type === 'project') return <Eye className="w-4 h-4" />;
    return <ExternalLink className="w-4 h-4" />;
  };

  return (
    <a
      href={media.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-3 rounded-xl border transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm group ${
        isDarkMode
          ? 'bg-gray-800/60 border-cyan-500/20 hover:border-cyan-400/40 hover:shadow-cyan-500/10'
          : 'bg-white/60 border-blue-500/20 hover:border-blue-400/40 hover:shadow-blue-500/10'
      } shadow-lg hover:shadow-xl`}
    >
      <div className="flex items-start gap-3">
        {media.thumbnail && (
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
            <img
              src={media.thumbnail}
              alt={media.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                // Fallback si l'image n'existe pas
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`font-medium text-sm leading-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {media.title}
            </h4>
            <div className={`p-1 rounded-full ${
              isDarkMode ? 'text-cyan-400' : 'text-blue-600'
            }`}>
              {getIcon()}
            </div>
          </div>
          {media.description && (
            <p className={`text-xs mt-1 leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {media.description}
            </p>
          )}
          {media.tags && media.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {media.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isDarkMode
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'bg-blue-500/20 text-blue-700 border border-blue-500/30'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </a>
  );
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showRobotBubble, setShowRobotBubble] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cache local pour les réponses
  const responseCache = useRef<Map<string, string>>(new Map());

  // Limite de contexte (garder seulement les 10 derniers messages)
  const MAX_CONTEXT_MESSAGES = 10;

  // Suggestions de questions pour engager la conversation
  const SUGGESTED_QUESTIONS = [
    "🚀 Quels services proposez-vous ?",
    "💻 Quelles technologies maîtrisez-vous ?",
    "📂 Pouvez-vous me parler de vos projets ?",
    "💰 Quels sont vos tarifs ?",
    "📅 Êtes-vous disponible pour un nouveau projet ?",
    "🎯 Comment travaillez-vous avec vos clients ?"
  ];

  // Base de données des médias pour enrichir les réponses
  const MEDIA_DATABASE: { [key: string]: MediaAttachment[] } = {
    'staka': [{
      type: 'project',
      title: 'Staka Livres',
      description: 'Plateforme e-commerce de livres d\'occasion avec 10,000+ références',
      url: 'https://livresstaka.fr',
      thumbnail: '/assets/images/livrestaka.jpg',
      tags: ['React', 'Node.js', 'MySQL', 'Stripe', 'E-commerce']
    }],
    'smartplanning': [{
      type: 'project',
      title: 'SmartPlanning SaaS',
      description: 'Solution de gestion de planning temps réel pour entreprises',
      url: 'https://smartplanning.fr',
      thumbnail: '/assets/images/business-smartplanning.webp',
      tags: ['React', 'Node.js', 'MongoDB', 'WebSockets', 'SaaS']
    }],
    'portfolio': [{
      type: 'link',
      title: 'Portfolio Complet',
      description: 'Découvrez tous les projets de Christophe',
      url: '#portfolio',
      thumbnail: '/assets/images/portfolio.jpg',
      tags: ['Portfolio', 'Projets', 'Réalisations']
    }],
    'github': [{
      type: 'link',
      title: 'GitHub - krismos64',
      description: 'Code source et projets open-source',
      url: 'https://github.com/krismos64',
      thumbnail: '/assets/images/Chris-profil.jpg',
      tags: ['Code', 'Open Source', 'GitHub']
    }],
    'linkedin': [{
      type: 'link',
      title: 'LinkedIn - Christophe Mostefaoui',
      description: 'Profil professionnel et recommandations',
      url: 'https://www.linkedin.com/in/christophemostefaoui/',
      thumbnail: '/assets/images/Chris-profil.jpg',
      tags: ['LinkedIn', 'Profil', 'Réseau']
    }],
    'contact': [{
      type: 'link',
      title: 'Contactez Christophe',
      description: 'Email, téléphone et formulaire de contact',
      url: '#contact',
      thumbnail: '/assets/images/Chris-profil.jpg',
      tags: ['Contact', 'Email', 'Devis']
    }]
  };

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
2. Si on te demande quelque chose hors sujet, fais un "rebound" créatif qui relie le sujet à l'expertise de Christophe :
   - Météo → "Je ne peux pas donner la météo, mais Christophe pourrait créer une superbe app météo en React avec API temps réel ! 🌤️"
   - Cuisine → "Je ne suis pas chef, mais Christophe développe des plateformes e-commerce parfaites pour vendre vos recettes en ligne ! 👨‍🍳"
   - Sport → "Je ne donne pas de conseils sport, mais Christophe peut créer des apps de coaching ou de suivi d'activité ! 🏃‍♂️"
   - Toujours rebondir de manière positive vers ses compétences tech
3. TOUJOURS terminer par un CTA (Call-To-Action) clair et engageant :
   - "👉 Contactez Christophe : christophe.mostefaoui.dev@gmail.com"
   - "📞 Appelez-le au 06 79 08 88 45 pour discuter de votre projet"
   - "💬 Voulez-vous que je vous donne plus de détails sur ses réalisations ?"
   - "📅 Souhaitez-vous planifier un appel découverte gratuit ?"
   - "🚀 Prêt à lancer votre projet ? Christophe peut vous accompagner !"
4. Sois professionnel mais chaleureux, avec une pointe d'humour quand approprié
5. Pour les demandes de devis, crée de l'urgence : "Christophe offre un audit gratuit de 30min pour les nouveaux projets cette semaine !"
6. Mets en avant l'expertise avec des chiffres concrets : "7+ ans d'expérience", "10,000+ livres gérés sur Staka", "Planning temps réel pour 50+ entreprises"
7. Utilise des emojis stratégiquement pour guider l'œil vers les CTAs`;

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

  // Fonction pour normaliser les questions et détecter les doublons
  const normalizeQuestion = (question: string): string => {
    return question.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Fonction pour obtenir le contexte limité
  const getLimitedContext = (allMessages: Message[]): any[] => {
    const recentMessages = allMessages.slice(-MAX_CONTEXT_MESSAGES);
    return recentMessages.map(m => ({ role: m.role, content: m.content }));
  };

  // Fonction pour enrichir les réponses avec des médias
  const enrichResponseWithMedia = (response: string): MediaAttachment[] => {
    const mediaAttachments: MediaAttachment[] = [];
    const lowerResponse = response.toLowerCase();

    // Détecter les mots-clés et ajouter les médias correspondants
    Object.keys(MEDIA_DATABASE).forEach(keyword => {
      if (lowerResponse.includes(keyword)) {
        mediaAttachments.push(...MEDIA_DATABASE[keyword]);
      }
    });

    // Détecter des variations de mots-clés
    if (lowerResponse.includes('projet') || lowerResponse.includes('réalisation')) {
      mediaAttachments.push(...MEDIA_DATABASE['portfolio']);
    }

    if (lowerResponse.includes('code') || lowerResponse.includes('source')) {
      mediaAttachments.push(...MEDIA_DATABASE['github']);
    }

    if (lowerResponse.includes('profil') || lowerResponse.includes('expérience')) {
      mediaAttachments.push(...MEDIA_DATABASE['linkedin']);
    }

    if (lowerResponse.includes('contact') || lowerResponse.includes('email') || lowerResponse.includes('devis')) {
      mediaAttachments.push(...MEDIA_DATABASE['contact']);
    }

    if (lowerResponse.includes('livre') || lowerResponse.includes('e-commerce')) {
      mediaAttachments.push(...MEDIA_DATABASE['staka']);
    }

    if (lowerResponse.includes('planning') || lowerResponse.includes('saas')) {
      mediaAttachments.push(...MEDIA_DATABASE['smartplanning']);
    }

    // Retirer les doublons
    const uniqueMedia = mediaAttachments.filter((media, index, self) =>
      index === self.findIndex(m => m.url === media.url)
    );

    return uniqueMedia.slice(0, 3); // Limiter à 3 médias maximum
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || isStreaming) return;

    const normalizedInput = normalizeQuestion(input.trim());

    // Vérifier le cache d'abord
    if (responseCache.current.has(normalizedInput)) {
      const cachedResponse = responseCache.current.get(normalizedInput)!;

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: input.trim(),
        timestamp: new Date(),
      };

      const mediaAttachments = enrichResponseWithMedia(cachedResponse);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: cachedResponse + "\n\n💡 *Réponse instantanée (cache)*",
        timestamp: new Date(),
        media: mediaAttachments,
      };

      setMessages(prev => [...prev, userMessage, assistantMessage]);
      setInput("");
      setShowSuggestions(false); // Masquer les suggestions même pour le cache
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsStreaming(true);
    setCurrentStreamingMessage("");
    setShowSuggestions(false); // Masquer les suggestions après la première question

    try {
      // Contexte limité pour éviter la surcharge
      const limitedContext = getLimitedContext(messages);

      // Appel à l'API Mistral avec streaming
      const response = await fetch(MISTRAL_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          model: "open-mistral-7b",
          messages: [
            { role: "system", content: SYSTEM_CONTEXT },
            ...limitedContext,
            { role: "user", content: input.trim() },
          ],
          temperature: 0.7,
          max_tokens: 500,
          stream: true, // Activation du streaming
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur API Mistral");
      }

      // Streaming de la réponse token par token
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";

      // Créer le message assistant vide pour le streaming
      const assistantMessageId = (Date.now() + 1).toString();
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6);
              if (jsonStr === '[DONE]') continue;

              try {
                const data = JSON.parse(jsonStr);
                const token = data.choices?.[0]?.delta?.content;

                if (token) {
                  fullResponse += token;
                  setCurrentStreamingMessage(fullResponse);

                  // Mettre à jour le message en temps réel
                  setMessages((prev) => prev.map(msg =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: fullResponse }
                      : msg
                  ));
                }
              } catch (e) {
                // Ignorer les erreurs de parsing JSON
              }
            }
          }
        }
      }

      // Sauvegarder dans le cache et enrichir avec médias
      if (fullResponse.trim()) {
        responseCache.current.set(normalizedInput, fullResponse);

        // Ajouter les médias à la réponse finale
        const mediaAttachments = enrichResponseWithMedia(fullResponse);
        setMessages((prev) => prev.map(msg =>
          msg.id === assistantMessageId
            ? { ...msg, media: mediaAttachments }
            : msg
        ));

        // Limiter la taille du cache (garder seulement 50 entrées)
        if (responseCache.current.size > 50) {
          const firstKey = responseCache.current.keys().next().value;
          responseCache.current.delete(firstKey);
        }
      }

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
      setIsStreaming(false);
      setCurrentStreamingMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    // Retirer l'emoji du début pour la question
    const cleanQuestion = suggestion.replace(/^[^\s]+\s/, '');
    setInput(cleanQuestion);

    // Simuler l'envoi automatique après un petit délai
    setTimeout(async () => {
      if (!cleanQuestion.trim() || isLoading || isStreaming) return;

      const normalizedInput = normalizeQuestion(cleanQuestion.trim());

      // Vérifier le cache d'abord
      if (responseCache.current.has(normalizedInput)) {
        const cachedResponse = responseCache.current.get(normalizedInput)!;

        const userMessage: Message = {
          id: Date.now().toString(),
          role: "user",
          content: cleanQuestion.trim(),
          timestamp: new Date(),
        };

        const mediaAttachments = enrichResponseWithMedia(cachedResponse);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: cachedResponse + "\n\n💡 *Réponse instantanée (cache)*",
          timestamp: new Date(),
          media: mediaAttachments,
        };

        setMessages(prev => [...prev, userMessage, assistantMessage]);
        setInput("");
        setShowSuggestions(false);
        return;
      }

      // Sinon traiter comme un envoi normal
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: cleanQuestion.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);
      setIsStreaming(true);
      setCurrentStreamingMessage("");
      setShowSuggestions(false);

      // Appeler la logique d'envoi existante (copie du code principal)
      try {
        const limitedContext = getLimitedContext(messages);

        const response = await fetch(MISTRAL_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MISTRAL_API_KEY}`,
          },
          body: JSON.stringify({
            model: "open-mistral-7b",
            messages: [
              { role: "system", content: SYSTEM_CONTEXT },
              ...limitedContext,
              { role: "user", content: cleanQuestion.trim() },
            ],
            temperature: 0.7,
            max_tokens: 500,
            stream: true,
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur API Mistral");
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";

        const assistantMessageId = (Date.now() + 1).toString();
        const assistantMessage: Message = {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const jsonStr = line.slice(6);
                if (jsonStr === '[DONE]') continue;

                try {
                  const data = JSON.parse(jsonStr);
                  const token = data.choices?.[0]?.delta?.content;

                  if (token) {
                    fullResponse += token;
                    setCurrentStreamingMessage(fullResponse);

                    setMessages((prev) => prev.map(msg =>
                      msg.id === assistantMessageId
                        ? { ...msg, content: fullResponse }
                        : msg
                    ));
                  }
                } catch (e) {
                  // Ignorer les erreurs de parsing JSON
                }
              }
            }
          }
        }

        if (fullResponse.trim()) {
          responseCache.current.set(normalizedInput, fullResponse);

          if (responseCache.current.size > 50) {
            const firstKey = responseCache.current.keys().next().value;
            responseCache.current.delete(firstKey);
          }
        }

      } catch (error) {
        console.error("Erreur:", error);

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
        setIsStreaming(false);
        setCurrentStreamingMessage("");
      }
    }, 100);
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
                <div className="flex items-center gap-2">
                  <p className="text-xs text-white/70">Concepteur développeur d'applications web</p>
                  {isStreaming && (
                    <div className="flex items-center gap-1">
                      <div className={`w-1 h-1 rounded-full animate-pulse ${
                        isDarkMode ? 'bg-cyan-400' : 'bg-green-400'
                      }`}></div>
                      <span className="text-xs text-white/70">En direct</span>
                    </div>
                  )}
                  {responseCache.current.size > 0 && (
                    <div className="text-xs text-white/70">
                      💾 {responseCache.current.size}/50
                    </div>
                  )}
                </div>
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

                  {/* Médias attachés */}
                  {message.media && message.media.length > 0 && message.role === "assistant" && (
                    <div className="mt-3 space-y-2">
                      {message.media.map((media, index) => (
                        <MediaCard key={index} media={media} isDarkMode={isDarkMode} />
                      ))}
                    </div>
                  )}

                  <p
                    className={`text-xs mt-2 ${
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
            {(isLoading || isStreaming) && (
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
                    }`}>
                      {isStreaming ? 'Christophe écrit...' : 'Christophe réfléchit...'}
                    </span>
                    {isStreaming && (
                      <div className={`w-1 h-4 ml-1 animate-pulse ${
                        isDarkMode ? 'bg-cyan-400' : 'bg-blue-500'
                      }`}></div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions de questions */}
            {showSuggestions && messages.length <= 1 && (
              <div className="relative animate-fade-in p-3">
                <p className={`text-xs mb-3 text-center ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>💡 Questions fréquentes :</p>
                <div className="grid grid-cols-1 gap-2">
                  {SUGGESTED_QUESTIONS.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`text-left text-sm p-3 rounded-xl border transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm ${
                        isDarkMode
                          ? 'bg-gray-800/60 border-cyan-500/20 text-white hover:border-cyan-400/40 hover:shadow-cyan-500/10'
                          : 'bg-white/60 border-blue-500/20 text-gray-800 hover:border-blue-400/40 hover:shadow-blue-500/10'
                      } shadow-lg hover:shadow-xl`}
                    >
                      {suggestion}
                    </button>
                  ))}
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
                disabled={!input.trim() || isLoading || isStreaming}
                className={`relative px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-110 disabled:scale-100 focus:outline-none group overflow-hidden ${
                  !input.trim() || isLoading || isStreaming
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
                  isLoading || isStreaming ? 'animate-spin' : 'group-hover:translate-x-0.5'
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
