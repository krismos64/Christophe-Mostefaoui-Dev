import emailjs from "@emailjs/browser";
import Lottie from "lottie-react";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Send,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import chatbotAnimation from "../animations/chatbot.json";
import { emailjsConfig } from "../config/emailjs";

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
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [suggestLead, setSuggestLead] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSending, setLeadSending] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [hasBadge, setHasBadge] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasShownBubble = useRef(false);

  // Cache local pour les réponses
  const responseCache = useRef<Map<string, string>>(new Map());

  // Machine à écrire : le texte reçu (souvent par paquets) est mis en file
  // et réaffiché caractère par caractère à cadence régulière, indépendamment
  // du débit réseau/API.
  const typewriterQueue = useRef<string>("");
  const typewriterDisplayed = useRef<string>("");
  const typewriterTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const typewriterMessageId = useRef<string>("");

  const stopTypewriter = () => {
    if (typewriterTimer.current) {
      clearInterval(typewriterTimer.current);
      typewriterTimer.current = null;
    }
  };

  const flushTypewriter = (messageId: string) => {
    stopTypewriter();
    typewriterDisplayed.current = typewriterQueue.current;
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, content: typewriterDisplayed.current }
          : msg
      )
    );
  };

  const startTypewriter = (messageId: string) => {
    if (typewriterTimer.current) return;
    typewriterMessageId.current = messageId;
    typewriterTimer.current = setInterval(() => {
      const remaining =
        typewriterQueue.current.length - typewriterDisplayed.current.length;
      if (remaining <= 0) return;
      // Rattrape plusieurs caractères à la fois si la file s'accumule,
      // pour ne jamais prendre un retard visible sur un long flux.
      const step = remaining > 60 ? 4 : remaining > 20 ? 2 : 1;
      typewriterDisplayed.current = typewriterQueue.current.slice(
        0,
        typewriterDisplayed.current.length + step
      );
      const snapshot = typewriterDisplayed.current;
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, content: snapshot } : msg
        )
      );
    }, 22);
  };

  // Limite de contexte (10 derniers messages)
  const MAX_CONTEXT_MESSAGES = 10;

  // Suggestions de questions sobres (sans emoji)
  const SUGGESTED_QUESTIONS = [
    "Combien coûte un site web ?",
    "Quels sont vos délais ?",
    "Pouvez-vous refondre mon site existant ?",
    "Comment vous contacter directement ?",
  ];

  // Relances contextuelles proposées après chaque réponse (règles par mots-clés)
  const FOLLOWUP_RULES: { pattern: RegExp; questions: string[] }[] = [
    {
      pattern: /devis|tarif|prix|budget|coût/i,
      questions: [
        "Comment se passe un devis ?",
        "Peut-on payer en plusieurs fois ?",
      ],
    },
    {
      pattern: /délai|semaine|planning|livraison/i,
      questions: [
        "Comment se déroule un projet de A à Z ?",
        "Sous quel délai peut-on démarrer ?",
      ],
    },
    {
      pattern: /vitrine/i,
      questions: [
        "Que comprend un site vitrine ?",
        "Faut-il fournir les textes et les photos ?",
      ],
    },
    {
      pattern: /refonte|existant/i,
      questions: [
        "Peut-on garder une partie de mon site actuel ?",
        "Combien de temps dure une refonte ?",
      ],
    },
    {
      pattern: /chatbot|intelligence artificielle|\bia\b/i,
      questions: [
        "Un chatbot est-il utile pour mon activité ?",
        "Le chatbot répond-il vraiment 24h/24 ?",
      ],
    },
    {
      pattern: /seo|référencement|google/i,
      questions: [
        "Comment être visible sur Google localement ?",
        "C'est quoi le référencement pour les IA ?",
      ],
    },
    {
      pattern: /vidéo|drone/i,
      questions: [
        "Quels types de vidéos réalisez-vous ?",
        "Le drone est-il autorisé partout ?",
      ],
    },
    {
      pattern: /smartplanning|saas|application/i,
      questions: [
        "Pouvez-vous créer un outil métier sur mesure ?",
        "Qu'est-ce que SmartPlanning ?",
      ],
    },
  ];
  const GENERIC_FOLLOWUPS = [
    "Quels sont vos délais ?",
    "Comment se passe un devis ?",
    "Travaillez-vous à distance ?",
  ];

  // Mots-clés déclenchant la proposition de transmettre la demande
  const LEAD_INTENT =
    /devis|prix|tarif|coût|projet|refonte|site|application|chatbot|vidéo|drone|besoin|créer|rdv|rendez-vous/i;

  // Événements analytics (dataLayer GTM — inertes tant qu'aucun tag n'est configuré)
  const track = (event: string) => {
    (
      window as unknown as { dataLayer?: Record<string, unknown>[] }
    ).dataLayer?.push({ event });
  };

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

  // Proxy serveur : la clé Mistral ET le prompt système vivent côté serveur
  // (public/api/chat.php) — rien de sensible dans le bundle client.
  // En dev local (vite), le PHP n'est pas exécuté : le chatbot répond
  // par son message d'erreur générique, c'est attendu.
  const CHAT_PROXY_URL = "/api/chat.php";

  // Restauration de session : la conversation survit à la navigation
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("chatbot_state_v1");
      if (saved) {
        const parsed = JSON.parse(saved) as {
          messages?: (Omit<Message, "timestamp"> & { timestamp: string })[];
          leadSent?: boolean;
        };
        if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
          setMessages(
            parsed.messages.map((m) => ({
              ...m,
              timestamp: new Date(m.timestamp),
            }))
          );
          setShowSuggestions(false);
        }
        if (parsed.leadSent) setLeadSent(true);
      }
    } catch {
      /* stockage indisponible : mode volatile */
    }
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    try {
      sessionStorage.setItem(
        "chatbot_state_v1",
        JSON.stringify({
          messages: messages
            .slice(-40)
            .map((m) => ({ ...m, isStreaming: false })),
          leadSent,
        })
      );
    } catch {
      /* quota plein ou navigation privée : tant pis */
    }
  }, [messages, leadSent]);

  // Fermeture au clavier (Échap)
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Nettoyage de la machine à écrire au démontage du composant
  useEffect(() => stopTypewriter, []);

  // Bulle de salut : apparition unique après 12 secondes (+ badge sur le bouton)
  useEffect(() => {
    if (hasShownBubble.current) return;
    const timer = setTimeout(() => {
      if (!isOpen && !hasShownBubble.current) {
        setShowRobotBubble(true);
        setHasBadge(true);
        hasShownBubble.current = true;
        setTimeout(() => setShowRobotBubble(false), 6000);
      }
    }, 12000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowRobotBubble(false);
    setHasBadge(false);
    track("chatbot_open");

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

  // Relances contextuelles : règles mots-clés, sans re-proposer une question déjà posée
  const computeFollowUps = (conversationText: string): string[] => {
    const asked = new Set(
      messages
        .filter((m) => m.role === "user")
        .map((m) => normalizeQuestion(m.content))
    );
    const picks: string[] = [];
    for (const rule of FOLLOWUP_RULES) {
      if (picks.length >= 3) break;
      if (rule.pattern.test(conversationText)) {
        for (const q of rule.questions) {
          if (
            picks.length < 3 &&
            !asked.has(normalizeQuestion(q)) &&
            !picks.includes(q)
          ) {
            picks.push(q);
          }
        }
      }
    }
    for (const q of GENERIC_FOLLOWUPS) {
      if (picks.length >= 2) break;
      if (!asked.has(normalizeQuestion(q)) && !picks.includes(q)) picks.push(q);
    }
    return picks.slice(0, 3);
  };

  // Rendu léger des réponses : **gras** et listes à tirets (aucun HTML injecté)
  const renderAssistantText = (text: string) => {
    const renderInline = (line: string, keyPrefix: string) =>
      line.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={`${keyPrefix}-${i}`} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      );
    return text.split("\n").map((line, i) => {
      if (/^\s*-\s+/.test(line)) {
        return (
          <span key={i} className="block pl-3">
            <span aria-hidden="true">•&nbsp;</span>
            {renderInline(line.replace(/^\s*-\s+/, ""), String(i))}
          </span>
        );
      }
      return (
        <span key={i}>
          {renderInline(line, String(i))}
          {"\n"}
        </span>
      );
    });
  };

  // Envoi du lead à Christophe via EmailJS (même template que le formulaire de contact)
  const submitLead = async () => {
    const email = leadEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || leadSending) return;
    setLeadSending(true);
    try {
      const transcript = messages
        .slice(-20)
        .map(
          (m) => `${m.role === "user" ? "Visiteur" : "Assistant"} : ${m.content}`
        )
        .join("\n\n");
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          to_name: "Christophe Mostefaoui",
          from_name: leadName.trim() || "Visiteur du chatbot",
          email,
          subject: `Lead chatbot — ${leadName.trim() || email}`,
          message: `Demande transmise depuis le chatbot du site.\n\nContact : ${email}\n\n--- Conversation ---\n\n${transcript}`,
        },
        emailjsConfig.userId
      );
      setLeadSent(true);
      setShowLeadForm(false);
      setSuggestLead(false);
      track("chatbot_lead_sent");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant" as const,
          content:
            "C'est transmis ! Christophe reçoit votre conversation et vous répond personnellement sous 24h (jours ouvrés). Merci pour votre confiance.",
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant" as const,
          content:
            "L'envoi n'a pas fonctionné. Vous pouvez écrire directement à christophe.mostefaoui.dev@gmail.com ou appeler le 06 79 08 88 45.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLeadSending(false);
    }
  };

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
      track("chatbot_question");
      if (LEAD_INTENT.test(questionText)) setSuggestLead(true);
      setFollowUps(computeFollowUps(questionText + " " + cachedResponse));
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
    setFollowUps([]);
    track("chatbot_question");
    if (LEAD_INTENT.test(questionText)) setSuggestLead(true);

    try {
      const limitedContext = getLimitedContext(messages);

      // Modèle, max_tokens et prompt système sont imposés par le proxy
      const response = await fetch(CHAT_PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...limitedContext,
            { role: "user", content: questionText.trim() },
          ],
        }),
      });

      if (!response.ok) throw new Error("Erreur proxy chatbot");

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

      // Réinitialise la machine à écrire pour ce nouveau message
      typewriterQueue.current = "";
      typewriterDisplayed.current = "";
      startTypewriter(assistantMessageId);

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
                  typewriterQueue.current = fullResponse;
                }
              } catch {
                /* ignore JSON parsing errors */
              }
            }
          }
        }
      }

      // Le flux réseau est terminé : on laisse la machine à écrire finir
      // d'afficher la file à son rythme, sans tronquer le texte.
      await new Promise<void>((resolve) => {
        const check = setInterval(() => {
          if (
            typewriterDisplayed.current.length >= typewriterQueue.current.length
          ) {
            clearInterval(check);
            resolve();
          }
        }, 30);
      });
      flushTypewriter(assistantMessageId);

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

        setFollowUps(computeFollowUps(questionText + " " + fullResponse));
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
      stopTypewriter();
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
              {hasBadge && (
                <span
                  className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#F4D35E] ring-2 ring-[#0B0805] animate-pulse"
                  aria-hidden="true"
                />
              )}
            </div>
          </button>
        </div>
      )}

      {/* Fenêtre de chat — design éditorial */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Assistant IA de Christophe"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] max-h-[calc(100vh-3rem)] z-50 flex flex-col bg-[#F4EFE6] dark:bg-[#13110F] border border-[#1A1715]/15 dark:border-[#F4EFE6]/15 shadow-2xl overflow-hidden"
        >
          {/* Header sobre */}
          <div className="relative flex items-center justify-between gap-3 px-4 py-3.5 border-b border-[#1A1715]/15 dark:border-[#F4EFE6]/15 bg-[#0B0805] text-[#F4EFE6]">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-[#F4D35E]/40">
                <picture>
                  <source
                    type="image/avif"
                    srcSet="/assets/images/optimized/Chris-profil-256.avif"
                  />
                  <source
                    type="image/webp"
                    srcSet="/assets/images/optimized/Chris-profil-256.webp"
                  />
                  <img
                    src="/assets/images/optimized/Chris-profil-256.webp"
                    alt="Christophe Mostefaoui"
                    width={256}
                    height={256}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </picture>
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
          <div
            className="flex-1 overflow-y-auto px-4 py-5 space-y-5"
            aria-live="polite"
          >
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
                    {message.role === "assistant"
                      ? renderAssistantText(message.content)
                      : message.content}
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

            {/* Formulaire de transmission à Christophe (lead) */}
            {showLeadForm && !leadSent && (
              <div
                className="border-l-2 border-[#F4D35E] pl-3 py-2.5 space-y-3 max-w-[92%]"
                style={{ animation: "fade-in 0.4s ease-out" }}
              >
                <p className="hero-body text-[13px] leading-snug text-[#1A1715]/85 dark:text-[#F4EFE6]/85">
                  Christophe reçoit votre conversation et vous répond
                  personnellement <strong>sous 24h</strong> (jours ouvrés).
                </p>
                <input
                  type="text"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="Votre nom (facultatif)"
                  autoComplete="name"
                  className="hero-body w-full bg-transparent border-b border-[#1A1715]/25 dark:border-[#F4EFE6]/25 text-[#1A1715] dark:text-[#F4EFE6] placeholder:text-[#1A1715]/40 dark:placeholder:text-[#F4EFE6]/40 text-[14px] py-1.5 focus:outline-none focus:border-[#F4D35E] transition-colors"
                  aria-label="Votre nom"
                />
                <input
                  type="email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder="Votre email *"
                  autoComplete="email"
                  required
                  className="hero-body w-full bg-transparent border-b border-[#1A1715]/25 dark:border-[#F4EFE6]/25 text-[#1A1715] dark:text-[#F4EFE6] placeholder:text-[#1A1715]/40 dark:placeholder:text-[#F4EFE6]/40 text-[14px] py-1.5 focus:outline-none focus:border-[#F4D35E] transition-colors"
                  aria-label="Votre email"
                />
                <div className="flex items-center gap-4 pt-1">
                  <button
                    type="button"
                    onClick={submitLead}
                    disabled={
                      leadSending ||
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail.trim())
                    }
                    className="hero-body inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1A1715] dark:text-[#F4EFE6] border-b border-[#F4D35E] pb-0.5 hover:text-[#F4D35E] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    {leadSending ? "Envoi en cours…" : "Envoyer à Christophe"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLeadForm(false)}
                    className="hero-body text-[12px] text-[#1A1715]/50 dark:text-[#F4EFE6]/50 hover:text-[#F4D35E] transition-colors"
                  >
                    annuler
                  </button>
                </div>
                <p className="hero-body text-[10px] leading-snug text-[#1A1715]/45 dark:text-[#F4EFE6]/45">
                  Votre email et cette conversation sont transmis à Christophe
                  uniquement pour vous recontacter.
                </p>
              </div>
            )}

            {/* Relances contextuelles + proposition de transmission */}
            {!isLoading &&
              !isStreaming &&
              !showLeadForm &&
              messages.length > 1 && (
                <div
                  className="pt-1 space-y-2"
                  style={{ animation: "fade-in 0.5s ease-out" }}
                >
                  {suggestLead && !leadSent && (
                    <button
                      type="button"
                      onClick={() => setShowLeadForm(true)}
                      className="group w-full text-left flex items-center gap-2 py-2 px-3 border border-[#F4D35E]/50 hover:border-[#F4D35E] bg-[#F4D35E]/10 transition-colors"
                    >
                      <Mail
                        className="h-4 w-4 flex-shrink-0 text-[#F4D35E]"
                        aria-hidden="true"
                        strokeWidth={1.5}
                      />
                      <span className="hero-body text-[13px] leading-snug text-[#1A1715] dark:text-[#F4EFE6]">
                        Transmettre ma demande à Christophe —{" "}
                        <strong>devis gratuit sous 24h</strong>
                      </span>
                    </button>
                  )}
                  {followUps.length > 0 && (
                    <ul className="space-y-1.5">
                      {followUps.map((q) => (
                        <li key={q}>
                          <button
                            type="button"
                            onClick={() => handleSuggestionClick(q)}
                            className="group w-full text-left flex items-start gap-2 py-1 hover:text-[#F4D35E] transition-colors"
                          >
                            <ArrowUpRight
                              className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-[#1A1715]/40 dark:text-[#F4EFE6]/40 group-hover:text-[#F4D35E] transition-colors"
                              aria-hidden="true"
                              strokeWidth={1.5}
                            />
                            <span className="hero-body text-[13px] leading-snug text-[#1A1715]/75 dark:text-[#F4EFE6]/75 group-hover:text-[#F4D35E] border-b border-transparent group-hover:border-[#F4D35E]/40 pb-0.5">
                              {q}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
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

            {/* Transmission + transparence IA (RGPD) */}
            <div className="mt-2.5 flex items-center justify-between gap-3">
              {!leadSent && messages.length > 1 && !showLeadForm ? (
                <button
                  type="button"
                  onClick={() => setShowLeadForm(true)}
                  className="hero-body inline-flex items-center gap-1.5 text-[11px] text-[#1A1715]/60 dark:text-[#F4EFE6]/60 hover:text-[#F4D35E] transition-colors"
                >
                  <Mail className="h-3 w-3" aria-hidden="true" />
                  <span className="border-b border-current/30 pb-px">
                    Transmettre ma demande
                  </span>
                </button>
              ) : (
                <span aria-hidden="true" />
              )}
              <Link
                to="/politique-de-confidentialite"
                onClick={handleClose}
                className="hero-body text-[10px] text-[#1A1715]/45 dark:text-[#F4EFE6]/45 hover:text-[#F4D35E] transition-colors text-right"
              >
                Assistant IA · messages traités par Mistral AI (France)
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
