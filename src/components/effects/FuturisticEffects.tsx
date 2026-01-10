import { motion } from "framer-motion";

// ============================================
// TYPES & INTERFACES
// ============================================

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
}

export type ShapeType = "circle" | "square" | "hexagon";

// ============================================
// COMPOSANTS D'EFFETS VISUELS
// ============================================

/**
 * Forme géométrique flottante avec animation
 */
export const GeometricShape = ({
  delay,
  duration,
  size,
  left,
  top,
  shape,
}: {
  delay: number;
  duration: number;
  size: number;
  left: string;
  top: string;
  shape: ShapeType;
}) => {
  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg rotate-45",
    hexagon: "clip-hexagon",
  };

  return (
    <motion.div
      className={`geometric-shape ${shapeClasses[shape]}`}
      style={{ width: size, height: size, left, top }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.2, 0.4, 0.2],
        scale: [1, 1.1, 1],
        rotate: [0, 180, 360],
        y: [0, -15, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

/**
 * Orbe lumineuse avec effet de pulsation
 */
export const GlowingOrb = ({
  size,
  colorClass,
  left,
  top,
  delay,
}: {
  size: number;
  colorClass: string;
  left: string;
  top: string;
  delay: number;
}) => (
  <motion.div
    className={`glowing-orb ${colorClass}`}
    style={{ width: size, height: size, left, top }}
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0.15, 0.3, 0.15],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 5,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

/**
 * Ligne de code animée traversant l'écran
 */
export const CodeLine = ({ delay, width }: { delay: number; width: string }) => (
  <motion.div
    className="code-line"
    style={{ width }}
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: [0, 0.4, 0], x: ["-100%", "200%"] }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

/**
 * Particule individuelle animée
 */
export const AnimatedParticle = ({ particle }: { particle: Particle }) => (
  <motion.div
    className="particle"
    style={{
      width: particle.size,
      height: particle.size,
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      background: `hsl(${particle.hue}, 80%, 60%)`,
      boxShadow: `0 0 ${particle.size * 3}px hsl(${particle.hue}, 80%, 50%)`,
    }}
    animate={{
      x: [0, particle.speedX * 80, 0],
      y: [0, particle.speedY * 80, 0],
      opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
    }}
    transition={{
      duration: 6 + Math.random() * 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

/**
 * Lueur suivant le curseur de la souris
 */
export const MouseGlow = ({
  smoothMouseX,
  smoothMouseY,
}: {
  smoothMouseX: import("framer-motion").MotionValue<number>;
  smoothMouseY: import("framer-motion").MotionValue<number>;
}) => (
  <motion.div
    className="mouse-glow"
    style={{
      x: smoothMouseX,
      y: smoothMouseY,
      translateX: "-50%",
      translateY: "-50%",
    }}
  />
);

// ============================================
// VARIANTS D'ANIMATION FRAMER MOTION
// ============================================

/**
 * Variants pour conteneur avec stagger effect
 */
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

/**
 * Variants pour éléments individuels avec blur
 */
export const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

/**
 * Variants pour animations Lottie
 */
export const lottieVariants = {
  hidden: { opacity: 0, scale: 0.8, x: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: "easeOut" as const,
      delay: 0.5,
    },
  },
};

/**
 * Variants pour Lottie venant de la gauche
 */
export const lottieVariantsLeft = {
  hidden: { opacity: 0, scale: 0.85, x: -40 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut" as const,
      delay: 0.2,
    },
  },
};

/**
 * Variants pour cartes avec index personnalisé
 */
export const createCardVariants = (baseDelay: number = 0.3, stagger: number = 0.1) => ({
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
      delay: baseDelay + i * stagger,
    },
  }),
});

// ============================================
// UTILITAIRES
// ============================================

/**
 * Génère un tableau de particules avec des valeurs aléatoires
 */
export const generateParticles = (count: number): Particle[] => {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
      hue: Math.random() * 60 + 180, // Teintes cyan/bleu
    });
  }
  return particles;
};
