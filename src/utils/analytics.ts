declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// Initialise dataLayer même sans GTM : le chatbot y pousse ses events
// (chatbot_open, chatbot_question, chatbot_lead_sent), no-op tant qu'aucun
// tag manager n'est configuré. Voir AIChatbot.tsx.
export const initDataLayer = () => {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
};
