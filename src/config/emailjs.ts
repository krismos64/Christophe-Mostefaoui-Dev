// EmailJS Configuration
// For security, these should be moved to environment variables in production

export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_1pvfw4u",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_853hpli", 
  userId: import.meta.env.VITE_EMAILJS_USER_ID || "NwZG3Q_sYxu72rLtC"
};

// Validate configuration
export const validateEmailjsConfig = () => {
  const { serviceId, templateId, userId } = emailjsConfig;
  
  if (!serviceId || !templateId || !userId) {
    console.warn("EmailJS configuration incomplete. Check your environment variables.");
    return false;
  }
  
  return true;
};