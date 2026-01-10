import { useEffect, useState, useRef, useCallback, ReactNode } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import {
  Particle,
  GeometricShape,
  GlowingOrb,
  CodeLine,
  AnimatedParticle,
  MouseGlow,
  generateParticles,
  ShapeType,
} from "./FuturisticEffects";

// ============================================
// CONFIGURATION DES EFFETS
// ============================================

interface OrbConfig {
  size: number;
  colorClass: "glowing-orb-cyan" | "glowing-orb-purple" | "glowing-orb-pink";
  left: string;
  top: string;
  delay: number;
}

interface ShapeConfig {
  delay: number;
  duration: number;
  size: number;
  left: string;
  top: string;
  shape: ShapeType;
}

interface CodeLineConfig {
  delay: number;
  width: string;
}

interface FuturisticBackgroundProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Nombre de particules (défaut: 20) */
  particleCount?: number;
  /** Configuration des orbes lumineuses */
  orbs?: OrbConfig[];
  /** Configuration des formes géométriques */
  shapes?: ShapeConfig[];
  /** Configuration des lignes de code */
  codeLines?: CodeLineConfig[];
  /** Position des lignes de code (défaut: "top-1/4") */
  codeLinesPosition?: string;
  /** Afficher la grille de fond */
  showGrid?: boolean;
  /** Afficher les décorations de coins */
  showCorners?: boolean;
  /** Afficher la lueur suivant la souris */
  showMouseGlow?: boolean;
  /** Gestionnaire d'événement de souris custom */
  onMouseMove?: (e: React.MouseEvent) => void;
}

// Configurations par défaut pour chaque type de section
export const DEFAULT_ORBS: OrbConfig[] = [
  { size: 300, colorClass: "glowing-orb-cyan", left: "75%", top: "15%", delay: 0 },
  { size: 250, colorClass: "glowing-orb-purple", left: "-5%", top: "50%", delay: 1.5 },
  { size: 180, colorClass: "glowing-orb-pink", left: "45%", top: "75%", delay: 3 },
];

export const DEFAULT_SHAPES: ShapeConfig[] = [
  { delay: 0.5, duration: 11, size: 45, left: "5%", top: "20%", shape: "circle" },
  { delay: 1.5, duration: 13, size: 55, left: "92%", top: "35%", shape: "hexagon" },
  { delay: 2.5, duration: 15, size: 40, left: "85%", top: "75%", shape: "square" },
  { delay: 0, duration: 12, size: 35, left: "10%", top: "80%", shape: "hexagon" },
];

export const DEFAULT_CODE_LINES: CodeLineConfig[] = [
  { delay: 0.5, width: "45%" },
  { delay: 1.5, width: "60%" },
  { delay: 2.5, width: "35%" },
];

// ============================================
// COMPOSANT PRINCIPAL
// ============================================

export default function FuturisticBackground({
  children,
  id,
  className = "py-20",
  particleCount = 20,
  orbs = DEFAULT_ORBS,
  shapes = DEFAULT_SHAPES,
  codeLines = DEFAULT_CODE_LINES,
  codeLinesPosition = "top-1/4",
  showGrid = true,
  showCorners = true,
  showMouseGlow = true,
  onMouseMove,
}: FuturisticBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Suivi de la souris pour effet magnétique
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 300 });

  // Initialiser les particules
  useEffect(() => {
    if (particleCount > 0) {
      setParticles(generateParticles(particleCount));
    }
  }, [particleCount]);

  // Gestionnaire de mouvement de souris
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);

      // Appeler le gestionnaire custom si fourni
      onMouseMove?.(e);
    },
    [mouseX, mouseY, onMouseMove]
  );

  return (
    <section
      ref={containerRef}
      id={id}
      className={`section-futuristic ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Grille animée en fond */}
      {showGrid && (
        <div className="absolute inset-0 bg-grid-opacity">
          <div className="absolute inset-0 bg-grid-pattern" />
        </div>
      )}

      {/* Orbes lumineuses */}
      {orbs.map((orb, index) => (
        <GlowingOrb
          key={`orb-${index}`}
          size={orb.size}
          colorClass={orb.colorClass}
          left={orb.left}
          top={orb.top}
          delay={orb.delay}
        />
      ))}

      {/* Formes géométriques flottantes */}
      {shapes.length > 0 && (
        <div className="hidden md:block">
          {shapes.map((shape, index) => (
            <GeometricShape
              key={`shape-${index}`}
              delay={shape.delay}
              duration={shape.duration}
              size={shape.size}
              left={shape.left}
              top={shape.top}
              shape={shape.shape}
            />
          ))}
        </div>
      )}

      {/* Lignes de code animées */}
      {codeLines.length > 0 && (
        <div className={`absolute left-0 right-0 ${codeLinesPosition} space-y-16 opacity-40 hidden lg:block`}>
          {codeLines.map((line, index) => (
            <CodeLine key={`code-${index}`} delay={line.delay} width={line.width} />
          ))}
        </div>
      )}

      {/* Système de particules */}
      {particleCount > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <AnimatedParticle key={particle.id} particle={particle} />
          ))}
        </div>
      )}

      {/* Lueur qui suit la souris */}
      {showMouseGlow && (
        <MouseGlow smoothMouseX={smoothMouseX} smoothMouseY={smoothMouseY} />
      )}

      {/* Contenu de la section */}
      {children}

      {/* Décorations de coins */}
      {showCorners && (
        <>
          <div className="corner-decoration corner-top-left" />
          <div className="corner-decoration corner-top-right" />
          <div className="corner-decoration corner-bottom-left" />
          <div className="corner-decoration corner-bottom-right" />
        </>
      )}
    </section>
  );
}

// ============================================
// PRESETS DE CONFIGURATION
// ============================================

/** Configuration légère pour sections moins importantes */
export const LIGHT_CONFIG = {
  particleCount: 10,
  orbs: [
    { size: 200, colorClass: "glowing-orb-cyan" as const, left: "80%", top: "20%", delay: 0 },
    { size: 150, colorClass: "glowing-orb-purple" as const, left: "10%", top: "60%", delay: 2 },
  ],
  shapes: [
    { delay: 0, duration: 12, size: 35, left: "90%", top: "30%", shape: "circle" as ShapeType },
    { delay: 1, duration: 14, size: 40, left: "5%", top: "70%", shape: "hexagon" as ShapeType },
  ],
  codeLines: [
    { delay: 0, width: "40%" },
    { delay: 2, width: "55%" },
  ],
};

/** Configuration pour sections avec beaucoup de contenu */
export const SUBTLE_CONFIG = {
  particleCount: 8,
  orbs: [
    { size: 180, colorClass: "glowing-orb-cyan" as const, left: "85%", top: "10%", delay: 0 },
    { size: 150, colorClass: "glowing-orb-purple" as const, left: "5%", top: "80%", delay: 2 },
  ],
  shapes: [],
  codeLines: [],
  showCorners: false,
};

/** Configuration minimale */
export const MINIMAL_CONFIG = {
  particleCount: 5,
  orbs: [
    { size: 150, colorClass: "glowing-orb-cyan" as const, left: "90%", top: "20%", delay: 0 },
  ],
  shapes: [],
  codeLines: [],
  showCorners: false,
  showMouseGlow: false,
};
