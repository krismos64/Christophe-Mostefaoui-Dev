import { useState, useEffect } from 'react';

interface ABTestVariant {
  id: string;
  text: string;
  subtext?: string;
  variant?: 'primary' | 'secondary' | 'gradient';
  icon?: 'arrow' | 'send' | 'message' | 'calendar';
}

interface ABTest {
  testId: string;
  variants: ABTestVariant[];
  weights?: number[];
}

const AB_TESTS: Record<string, ABTest> = {
  hero_cta_primary: {
    testId: 'hero_cta_primary',
    variants: [
      {
        id: 'A',
        text: 'Obtenez un devis gratuit',
        subtext: 'Réponse sous 24h',
        variant: 'gradient',
        icon: 'send'
      },
      {
        id: 'B',
        text: 'Commencez votre projet',
        subtext: 'Consultation offerte',
        variant: 'gradient',
        icon: 'arrow'
      },
      {
        id: 'C',
        text: 'Transformez vos idées',
        subtext: 'Devis personnalisé gratuit',
        variant: 'gradient',
        icon: 'message'
      }
    ],
    weights: [0.34, 0.33, 0.33]
  },
  hero_cta_secondary: {
    testId: 'hero_cta_secondary',
    variants: [
      {
        id: 'A',
        text: 'Discutons de votre projet',
        variant: 'secondary',
        icon: 'calendar'
      },
      {
        id: 'B',
        text: 'Prendre rendez-vous',
        variant: 'secondary',
        icon: 'calendar'
      },
      {
        id: 'C',
        text: 'Parlons de vos besoins',
        variant: 'secondary',
        icon: 'message'
      }
    ]
  },
  services_cta: {
    testId: 'services_cta',
    variants: [
      {
        id: 'A',
        text: 'Démarrez votre projet maintenant',
        subtext: 'Consultation gratuite',
        variant: 'gradient',
        icon: 'message'
      },
      {
        id: 'B',
        text: 'Créons votre solution sur mesure',
        subtext: 'Devis en 24h',
        variant: 'gradient',
        icon: 'arrow'
      }
    ]
  },
  portfolio_cta: {
    testId: 'portfolio_cta',
    variants: [
      {
        id: 'A',
        text: 'Lancer mon projet',
        subtext: 'Devis gratuit sous 24h',
        variant: 'primary',
        icon: 'arrow'
      },
      {
        id: 'B',
        text: 'Créer mon application',
        subtext: 'Accompagnement personnalisé',
        variant: 'primary',
        icon: 'send'
      }
    ]
  }
};

const getStorageKey = (testId: string) => `ab_test_${testId}`;
const getConversionKey = (testId: string) => `ab_conversion_${testId}`;

export const getVariant = (testId: string): ABTestVariant | null => {
  const test = AB_TESTS[testId];
  if (!test) return null;

  const storageKey = getStorageKey(testId);
  const storedVariant = localStorage.getItem(storageKey);

  if (storedVariant) {
    const variant = test.variants.find(v => v.id === storedVariant);
    if (variant) return variant;
  }

  // Sélection pondérée du variant
  const weights = test.weights || test.variants.map(() => 1 / test.variants.length);
  const random = Math.random();
  let cumulativeWeight = 0;
  
  for (let i = 0; i < test.variants.length; i++) {
    cumulativeWeight += weights[i];
    if (random < cumulativeWeight) {
      const selectedVariant = test.variants[i];
      localStorage.setItem(storageKey, selectedVariant.id);
      
      // Track l'assignation du variant via GTM
      if (window.dataLayer) {
        window.dataLayer.push({
          'event': 'ab_test_assignment',
          'test_id': testId,
          'variant_id': selectedVariant.id,
        });
      }
      
      return selectedVariant;
    }
  }

  return test.variants[0];
};

export const trackABTestConversion = (testId: string, variantId: string) => {
  const conversionKey = getConversionKey(testId);
  const conversions = JSON.parse(localStorage.getItem(conversionKey) || '[]');
  
  if (!conversions.includes(variantId)) {
    conversions.push(variantId);
    localStorage.setItem(conversionKey, JSON.stringify(conversions));
    
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'ab_test_conversion',
        'test_id': testId,
        'variant_id': variantId,
        'conversion_count': conversions.length,
      });
    }
  }
};

export const useABTest = (testId: string) => {
  const [variant, setVariant] = useState<ABTestVariant | null>(null);

  useEffect(() => {
    setVariant(getVariant(testId));
  }, [testId]);

  const trackConversion = () => {
    if (variant) {
      trackABTestConversion(testId, variant.id);
    }
  };

  return { variant, trackConversion };
};

export const clearABTests = () => {
  Object.keys(AB_TESTS).forEach(testId => {
    localStorage.removeItem(getStorageKey(testId));
    localStorage.removeItem(getConversionKey(testId));
  });
};

export const getABTestResults = () => {
  const results: Record<string, any> = {};
  
  Object.entries(AB_TESTS).forEach(([testId, test]) => {
    const assignments: Record<string, number> = {};
    const conversions: Record<string, number> = {};
    
    test.variants.forEach(variant => {
      assignments[variant.id] = 0;
      conversions[variant.id] = 0;
    });
    
    // Cette fonction serait normalement alimentée par Google Analytics
    // Ici c'est une simulation pour le développement
    results[testId] = {
      assignments,
      conversions,
      conversionRates: {}
    };
  });
  
  return results;
};