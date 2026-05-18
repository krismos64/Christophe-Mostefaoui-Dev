import Lottie from "lottie-react";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Linkedin,
  Send,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import chatbotAnimation from "../animations/chatbot.json";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
  media?: MediaAttachment[];
  isStreaming?: boolean;
}

interface MediaAttachment {
  type: "link" | "image" | "project";
  title: string;
  description?: string;
  url: string;
  tags?: string[];
}

/* -------------------------------------------------------------------------- */
/* Carte média (réponses enrichies)                                            */
/* -------------------------------------------------------------------------- */
const MediaCard = ({ media }: { media: MediaAttachment }) => {
  const getIcon = () => {
    if (media.url.includes("github")) return Github;
    if (media.url.includes("linkedin")) return Linkedin;
    return ExternalLink;
  };
  const Icon = getIcon();
  const isInternal = media.url.startsWith("#");

  return (
    <a
      href={media.url}
      target={isInternal ? undefined : "_blank"}
      rel={isInternal ? undefined : "noopener noreferrer"}
      className="group block border-l-2 border-[#F4D35E]/60 pl-3 py-1.5 hover:border-[#F4D35E] transition-colors"
    >
      <div className="flex items-start justify-between gap-2 mb-0.5">
        <span
          style={{
            fontFamily: '"Fraunces", "Times New Roman", serif',
            fontStyle: "italic",
            fontWeight: 500,
          }}
          className="text-[14px] leading-tight text-[#1A1715] dark:text-[#F4EFE6] group-hover:text-[#F4D35E] transition-colors"
        >
          {media.title}
        </span>
        <Icon
          className="h-3.5 w-3.5 mt-1 flex-shrink-0 text-[#1A1715]/40 dark:text-[#F4EFE6]/40 group-hover:text-[#F4D35E] transition-colors"
          aria-hidden="true"
          strokeWidth={1.5}
        />
      </div>
      {media.description && (
        <p className="hero-body text-[12px] leading-snug text-[#1A1715]/65 dark:text-[#F4EFE6]/65">
          {media.description}
        </p>
      )}
      {media.tags && media.tags.length > 0 && (
        <p className="hero-body text-[11px] mt-1 text-[#1A1715]/45 dark:text-[#F4EFE6]/45 flex flex-wrap items-center gap-x-1.5">
          {media.tags.slice(0, 4).map((tag, i) => (
            <span key={i}>
              {tag}
              {i < Math.min(media.tags!.length, 4) - 1 && (
                <span className="text-[#F4D35E]/60 ml-1.5" aria-hidden="true">
                  ·
                </span>
              )}
            </span>
          ))}
        </p>
      )}
    </a>
  );
};

/* -------------------------------------------------------------------------- */
/* Chatbot                                                                     */
/* -------------------------------------------------------------------------- */
const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRobotBubble, setShowRobotBubble] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasShownBubble = useRef(false);

  // Cache local pour les réponses
  const responseCache = useRef<Map<string, string>>(new Map());

  // Limite de contexte (10 derniers messages)
  const MAX_CONTEXT_MESSAGES = 10;

  // Suggestions de questions sobres (sans emoji)
  const SUGGESTED_QUESTIONS = [
    "Combien coûte un site web ?",
    "Quels sont vos délais ?",
    "Pouvez-vous refondre mon site existant ?",
    "Comment vous contacter directement ?",
  ];

  // Base de données médias enrichis
  const MEDIA_DATABASE: Record<string, MediaAttachment[]> = {
    staka: [
      {
        type: "project",
        title: "LivresStaka.fr",
        description:
          "Plateforme d'édition et correction de manuscrits avec espace client et paiement en ligne.",
        url: "https://livrestaka.fr",
        tags: ["React", "Node.js", "Stripe", "Plateforme"],
      },
    ],
    smartplanning: [
      {
        type: "project",
        title: "SmartPlanning.fr",
        description:
          "Mon SaaS de gestion de plannings d'équipe, conçu et lancé en 2026 (modèle freemium).",
        url: "https://smartplanning.fr",
        tags: ["SaaS", "React", "Node.js", "Solo founder"],
      },
    ],
    portfolio: [
      {
        type: "link",
        title: "Voir mes réalisations",
        description: "7 projets clients sur le portfolio.",
        url: "#portfolio",
        tags: ["Portfolio"],
      },
    ],
    github: [
      {
        type: "link",
        title: "GitHub — krismos64",
        description: "Code source et projets open-source.",
        url: "https://github.com/krismos64",
        tags: ["Code", "Open Source"],
      },
    ],
    linkedin: [
      {
        type: "link",
        title: "LinkedIn — Christophe Mostefaoui",
        description: "Profil professionnel et parcours.",
        url: "https://www.linkedin.com/in/christophemostefaoui/",
        tags: ["Profil", "Réseau"],
      },
    ],
    contact: [
      {
        type: "link",
        title: "Demander un devis",
        description: "Réponse personnelle sous 24h en jours ouvrés.",
        url: "#contact",
        tags: ["Contact", "Devis gratuit"],
      },
    ],
    krismos: [
      {
        type: "link",
        title: "krismos.fr",
        description: "Mon portfolio technique détaillé.",
        url: "https://krismos.fr/",
        tags: ["Portfolio tech"],
      },
    ],
  };

  // Contexte système (corrigé : âge, email, expérience, services à jour)
  const SYSTEM_CONTEXT = `Tu es l'assistant virtuel de Christophe Mostefaoui, développeur web freelance basé à Pau et Artix (64).

INFORMATIONS SUR CHRISTOPHE :
- Nom : Christophe Mostefaoui
- Âge : 38 ans
- Localisation : Artix / Pau, Pyrénées-Atlantiques (64)
- Statut : Développeur freelance
- Expérience : plus de 10 ans dans l'informatique (12 ans dans le conseil client multimédia, puis le freelance et le développement)
- Site web : christophe-dev-freelance.fr
- Email : christophe.mostefaoui.dev@gmail.com
- Téléphone : 06 79 08 88 45
- GitHub : github.com/krismos64
- LinkedIn : https://www.linkedin.com/in/christophemostefaoui/
- Portfolio technique : krismos.fr

SERVICES (alignés sur la section Services I-VI du site) :
I. Site Vitrine Moderne — présence en ligne professionnelle, visible sur Google et référencée par les assistants IA.
II. Site Multi-pages — site complet avec blog, formulaire et CMS pour gérer en autonomie.
III. Refonte de Site — modernisation d'un site existant pour une meilleure image et de meilleures performances.
IV. Chatbot intelligent — assistant IA intégré au site (comme celui-ci, visible en bas à droite), capable de répondre aux clients 24h/24.
V. Référencement Google & IA — optimisation SEO pour Google ET les assistants IA (ChatGPT, Claude, Perplexity).
VI. Vidéo & Drone (DGAC) — vidéos professionnelles (Final Cut Pro) et prises de vue aériennes certifiées par la Direction Générale de l'Aviation Civile.

COMPÉTENCES TECHNIQUES :
- Frontend : React, TypeScript, Next.js, TailwindCSS, Framer Motion
- Backend : Node.js, Express, API REST
- Bases de données : MySQL, MongoDB, Prisma ORM
- DevOps : Docker, CI/CD
- Paiement : Stripe
- Temps réel : WebSockets, Socket.io
- IA : intégration OpenAI GPT, Anthropic Claude, Mistral

PROJETS PHARES :
1. SMARTPLANNING (smartplanning.fr) — PROJET FONDATEUR
   - SaaS de gestion de plannings d'équipe, conçu, développé et lancé seul en 2026
   - Modèle freemium
   - À mettre en avant : Christophe a piloté tout le cycle de vie produit (architecture, développement, déploiement, support), pas seulement le code.

2. LIVRESTAKA (livrestaka.fr)
   - Plateforme d'édition et correction de manuscrits
   - Espace client sécurisé, paiement Stripe, messagerie intégrée

3. Cabinet Infirmier Graslin, Poulp Fiction (plongée), Methodea, CoachTFE, Garage Parrot — 5 autres projets clients visibles dans le portfolio.

DEVIS ET TARIFS :
- Aucune grille tarifaire publique : chaque projet fait l'objet d'un devis personnalisé
- Premier échange gratuit (visio ou téléphone), devis envoyé sous 24h
- Paiement en 3× sans frais possible
- Si on te demande un prix précis, invite poliment à demander un devis gratuit via le formulaire de contact (#contact) ou au 06 79 08 88 45

ZONE D'INTERVENTION :
- DÉPLACEMENT GRATUIT dans tout le département des Pyrénées-Atlantiques (64) : Pau, Bayonne, Biarritz, Anglet, Orthez, Oloron, Lescar, Billère, Jurançon, Artix, Saint-Jean-de-Luz, Hendaye...
- PARTOUT EN FRANCE en distanciel (visio, partage d'écran)

MÉTHODE DE TRAVAIL (3 étapes) :
1. Analyse de vos besoins : premier échange gratuit pour comprendre votre projet
2. Proposition sur mesure : devis détaillé sous 24h
3. Accompagnement complet : développement, formation, support après livraison

RÈGLES DE COMMUNICATION :
1. Tu réponds aux questions concernant Christophe et ses services
2. Si on te pose une question hors sujet, fais un rebond élégant vers une compétence pertinente, sans emoji.
3. Termine systématiquement par un CTA discret et naturel :
   - "Vous pouvez demander un devis gratuit via le formulaire de contact."
   - "Christophe répond personnellement sous 24h à christophe.mostefaoui.dev@gmail.com."
   - "Souhaitez-vous plus de détails sur un projet en particulier ?"
4. Ton : professionnel, chaleureux, sobre. Évite les emojis dans tes réponses (un seul à la rigueur si vraiment justifié).
5. Pour les questions sur l'expérience ou la crédibilité, mentionne le rôle de fondateur de SmartPlanning et les plus de 10 ans dans l'informatique.
6. Pour les questions techniques, reste accessible : ta cible est composée de PME, TPE et indépendants, pas de développeurs.
7. Ne réponds JAMAIS avec des stats inventées (taux de satisfaction, nombre d'avis, nombre de projets précis non vérifiable).`;

  // Clé API Mistral via variable d'environnement
  const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY as string | undefined;
  const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

  // Bulle de salut : apparition unique après 30 secondes
  useEffect(() => {
    if (hasShownBubble.current) return;
    const timer = setTimeout(() => {
      if (!isOpen && !hasShownBubble.current) {
        setShowRobotBubble(true);
        hasShownBubble.current = true;
        setTimeout(() => setShowRobotBubble(false), 6000);
      }
    }, 30000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowRobotBubble(false);

    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "Bonjour ! Je suis l'assistant de Christophe. Comment puis-je vous aider avant de le contacter ?",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  const handleClose = () => setIsOpen(false);

  const normalizeQuestion = (question: string): string =>
    question
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const getLimitedContext = (allMessages: Message[]) =>
    allMessages
      .slice(-MAX_CONTEXT_MESSAGES)
      .map((m) => ({ role: m.role, content: m.content }));

  const enrichResponseWithMedia = (response: string): MediaAttachment[] => {
    const mediaAttachments: MediaAttachment[] = [];
    const lower = response.toLowerCase();

    Object.keys(MEDIA_DATABASE).forEach((keyword) => {
      if (lower.includes(keyword)) {
        const medias = MEDIA_DATABASE[keyword];
        if (medias) mediaAttachments.push(...medias);
      }
    });

    if (lower.includes("projet") || lower.includes("réalisation")) {
      mediaAttachments.push(...(MEDIA_DATABASE["portfolio"] || []));
    }
    if (lower.includes("code") || lower.includes("source")) {
      mediaAttachments.push(...(MEDIA_DATABASE["github"] || []));
    }
    if (lower.includes("profil") || lower.includes("expérience")) {
      mediaAttachments.push(...(MEDIA_DATABASE["linkedin"] || []));
    }
    if (
      lower.includes("contact") ||
      lower.includes("email") ||
      lower.includes("devis")
    ) {
      mediaAttachments.push(...(MEDIA_DATABASE["contact"] || []));
    }
    if (lower.includes("livre") || lower.includes("e-commerce")) {
      mediaAttachments.push(...(MEDIA_DATABASE["staka"] || []));
    }
    if (lower.includes("planning") || lower.includes("saas")) {
      mediaAttachments.push(...(MEDIA_DATABASE["smartplanning"] || []));
    }

    const uniqueMedia = mediaAttachments.filter(
      (media, index, self) =>
        index === self.findIndex((m) => m.url === media.url)
    );

    return uniqueMedia.slice(0, 3);
  };

  /**
   * Envoie une question à l'API Mistral en streaming
   */
  const sendQuestion = async (questionText: string) => {
    if (!questionText.trim() || isLoading || isStreaming) return;

    const normalizedInput = normalizeQuestion(questionText.trim());

    // Cache : réponse instantanée
    if (responseCache.current.has(normalizedInput)) {
      const cachedResponse = responseCache.current.get(normalizedInput)!;
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: questionText.trim(),
        timestamp: new Date(),
      };
      const mediaAttachments = enrichResponseWithMedia(cachedResponse);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: cachedResponse,
        timestamp: new Date(),
        media: mediaAttachments,
      };
      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setInput("");
      setShowSuggestions(false);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: questionText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsStreaming(true);
    setShowSuggestions(false);

    try {
      if (!MISTRAL_API_KEY) {
        throw new Error("MISTRAL_API_KEY_MISSING");
      }

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
            { role: "user", content: questionText.trim() },
          ],
          temperature: 0.7,
          max_tokens: 500,
          stream: true,
        }),
      });

      if (!response.ok) throw new Error("Erreur API Mistral");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";

      const assistantMessageId = (Date.now() + 1).toString();
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const jsonStr = line.slice(6);
              if (jsonStr === "[DONE]") continue;
              try {
                const data = JSON.parse(jsonStr);
                const token = data.choices?.[0]?.delta?.content;
                if (token) {
                  fullResponse += token;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMessageId
                        ? { ...msg, content: fullResponse }
                        : msg
                    )
                  );
                }
              } catch {
                /* ignore JSON parsing errors */
              }
            }
          }
        }
      }

      if (fullResponse.trim()) {
        responseCache.current.set(normalizedInput, fullResponse);
        const mediaAttachments = enrichResponseWithMedia(fullResponse);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, media: mediaAttachments, isStreaming: false }
              : msg
          )
        );

        if (responseCache.current.size > 50) {
          const firstKey = responseCache.current.keys().next().value;
          if (firstKey !== undefined) {
            responseCache.current.delete(firstKey);
          }
        }
      }
    } catch (error) {
      console.error("Erreur:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Désolé, l'assistant rencontre un problème technique. Vous pouvez contacter directement Christophe à christophe.mostefaoui.dev@gmail.com ou au 06 79 08 88 45.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleSend = () => sendQuestion(input);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendQuestion(suggestion);
  };

  return (
    <>
      {/* Bulle de salut sobre — apparition unique */}
      {showRobotBubble && !isOpen && (
        <button
          type="button"
          onClick={handleOpen}
          className="fixed bottom-28 right-5 max-w-[260px] z-40 bg-[#F4EFE6] dark:bg-[#13110F] text-[#1A1715] dark:text-[#F4EFE6] border border-[#1A1715]/15 dark:border-[#F4EFE6]/15 shadow-xl px-4 py-3 text-left transition-all duration-300 hover:border-[#F4D35E]"
          style={{ animation: "fade-in 0.5s ease-out" }}
          aria-label="Ouvrir le chat"
        >
          <p className="hero-handwritten text-[16px] text-[#F4D35E] mb-0.5">
            ✏ besoin d'aide ?
          </p>
          <p className="hero-body text-[13px] leading-snug text-[#1A1715]/75 dark:text-[#F4EFE6]/75">
            Posez-moi une question sur Christophe.
          </p>
          <span
            aria-hidden="true"
            className="absolute -bottom-2 right-8 w-3 h-3 bg-[#F4EFE6] dark:bg-[#13110F] border-r border-b border-[#1A1715]/15 dark:border-[#F4EFE6]/15 transform rotate-45"
          />
        </button>
      )}

      {/* Bouton flottant chatbot */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleOpen}
            className="relative bg-transparent transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D35E] focus-visible:ring-offset-2 group"
            aria-label="Ouvrir le chatbot"
          >
            <div className="relative">
              <Lottie
                animationData={chatbotAnimation}
                loop={true}
                className="w-16 h-16 sm:w-[72px] sm:h-[72px]"
              />
            </div>
          </button>
        </div>
      )}

      {/* Fenêtre de chat — design éditorial */}
      {isOpen && (
        <div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] max-h-[calc(100vh-3rem)] z-50 flex flex-col bg-[#F4EFE6] dark:bg-[#13110F] border border-[#1A1715]/15 dark:border-[#F4EFE6]/15 shadow-2xl overflow-hidden"
        >
          {/* Header sobre */}
          <div className="relative flex items-center justify-between gap-3 px-4 py-3.5 border-b border-[#1A1715]/15 dark:border-[#F4EFE6]/15 bg-[#0B0805] text-[#F4EFE6]">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-[#F4D35E]/40">
                <img
                  src="/assets/images/Chris-profil.jpg"
                  alt="Christophe Mostefaoui"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  style={{
                    fontFamily: '"Fraunces", "Times New Roman", serif',
                    fontStyle: "italic",
                    fontWeight: 500,
                  }}
                  className="text-[15px] leading-tight text-[#F4EFE6]"
                >
                  Assistant de Christophe
                </p>
                <p className="hero-body text-[11px] text-[#F4EFE6]/60 truncate">
                  {isStreaming
                    ? "écrit…"
                    : "développeur freelance · Pau (64)"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 text-[#F4EFE6]/70 hover:text-[#F4D35E] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D35E] rounded"
              aria-label="Fermer le chat"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Zone messages */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`relative ${
                  message.role === "user" ? "flex justify-end" : ""
                }`}
                style={{ animation: "fade-in 0.4s ease-out" }}
              >
                <div
                  className={`max-w-[85%] ${
                    message.role === "user"
                      ? "border-r-2 border-[#F4D35E] pr-3 py-2 bg-[#F4D35E]/10"
                      : "border-l-2 border-[#1A1715]/30 dark:border-[#F4EFE6]/30 pl-3 py-2"
                  }`}
                >
                  <p
                    className={`hero-body text-[14px] leading-[1.6] whitespace-pre-wrap ${
                      message.role === "user"
                        ? "text-[#1A1715] dark:text-[#F4EFE6]"
                        : "text-[#1A1715] dark:text-[#F4EFE6]"
                    }`}
                  >
                    {message.content}
                    {message.isStreaming && message.role === "assistant" && (
                      <span className="inline-block w-2 h-4 ml-0.5 bg-[#F4D35E] align-middle animate-pulse" />
                    )}
                  </p>

                  {/* Médias attachés */}
                  {message.media &&
                    message.media.length > 0 &&
                    message.role === "assistant" && (
                      <div className="mt-3 space-y-2.5">
                        {message.media.map((media, index) => (
                          <MediaCard key={index} media={media} />
                        ))}
                      </div>
                    )}

                  <p
                    className={`font-mono tabular-nums text-[10px] mt-1.5 ${
                      message.role === "user"
                        ? "text-[#1A1715]/40 dark:text-[#F4EFE6]/40"
                        : "text-[#1A1715]/40 dark:text-[#F4EFE6]/40"
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

            {/* Indicateur "Christophe réfléchit…" */}
            {isLoading && !isStreaming && (
              <div className="border-l-2 border-[#F4D35E]/40 pl-3 py-2 max-w-[85%]">
                <p className="hero-handwritten text-[14px] text-[#1A1715]/55 dark:text-[#F4EFE6]/55 flex items-center gap-2">
                  <span className="inline-flex gap-1">
                    <span className="w-1 h-1 rounded-full bg-current animate-bounce" />
                    <span
                      className="w-1 h-1 rounded-full bg-current animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="w-1 h-1 rounded-full bg-current animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </span>
                  l'assistant réfléchit…
                </p>
              </div>
            )}

            {/* Suggestions de questions sobres */}
            {showSuggestions && messages.length <= 1 && (
              <div
                className="pt-2"
                style={{ animation: "fade-in 0.5s ease-out" }}
              >
                <p className="hero-handwritten text-[14px] text-[#1A1715]/55 dark:text-[#F4EFE6]/55 mb-3">
                  ↳ vous pouvez aussi demander :
                </p>
                <ul className="space-y-2">
                  {SUGGESTED_QUESTIONS.map((suggestion, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="group w-full text-left flex items-start gap-2 py-1.5 hover:text-[#F4D35E] transition-colors"
                      >
                        <ArrowUpRight
                          className="h-3.5 w-3.5 mt-1 flex-shrink-0 text-[#1A1715]/40 dark:text-[#F4EFE6]/40 group-hover:text-[#F4D35E] transition-colors"
                          aria-hidden="true"
                          strokeWidth={1.5}
                        />
                        <span className="hero-body text-[14px] leading-snug text-[#1A1715]/85 dark:text-[#F4EFE6]/85 group-hover:text-[#F4D35E] border-b border-transparent group-hover:border-[#F4D35E]/40 pb-0.5">
                          {suggestion}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input zone */}
          <div className="px-4 py-3 border-t border-[#1A1715]/15 dark:border-[#F4EFE6]/15">
            <div className="flex items-end gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Posez votre question…"
                autoComplete="off"
                autoCapitalize="sentences"
                className="hero-body flex-1 bg-transparent border-b border-[#1A1715]/25 dark:border-[#F4EFE6]/25 text-[#1A1715] dark:text-[#F4EFE6] placeholder:text-[#1A1715]/40 dark:placeholder:text-[#F4EFE6]/40 text-[16px] py-2 focus:outline-none focus:border-[#F4D35E] transition-colors"
                disabled={isLoading || isStreaming}
                aria-label="Votre question"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() || isLoading || isStreaming}
                className="flex-shrink-0 p-2 text-[#1A1715] dark:text-[#F4EFE6] hover:text-[#F4D35E] disabled:text-[#1A1715]/30 dark:disabled:text-[#F4EFE6]/30 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D35E]"
                aria-label="Envoyer la question"
              >
                <Send
                  className={`w-5 h-5 ${
                    isStreaming || isLoading ? "animate-pulse" : ""
                  }`}
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
