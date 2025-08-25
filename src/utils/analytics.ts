declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GTM_ID = 'GTM-KLGC32HC';

export const initGoogleAnalytics = () => {
  // GTM est déjà initialisé dans index.html
  // Cette fonction est gardée pour compatibilité
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
};

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': action,
      'event_category': category,
      'event_label': label,
      'value': value,
    });
  }
};

export const trackCTAClick = (
  ctaText: string,
  ctaLocation: string,
  ctaVariant: string
) => {
  // Envoi vers GTM avec structure GA4
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'cta_click',
      'cta_text': ctaText,
      'cta_location': ctaLocation,
      'cta_variant': ctaVariant,
      'event_category': 'engagement',
      'event_label': `${ctaText} - ${ctaLocation} - ${ctaVariant}`,
    });
  }
};

export const trackConversion = (
  conversionType: 'form_submission' | 'contact_request' | 'quote_request',
  value?: number
) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'conversion',
      'conversion_type': conversionType,
      'value': value || 0,
      'currency': 'EUR',
    });
  }
};

export const trackPageView = (url: string) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'page_view',
      'page_path': url,
    });
  }
};

export const trackUserEngagement = (
  engagementType: 'scroll' | 'time_on_page' | 'interaction',
  details?: any
) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'user_engagement',
      'engagement_type': engagementType,
      ...details,
    });
  }
};