import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface WelcomeScreenProps {
  onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [stage, setStage] = useState(0); // 0: fade in, 1: main content, 2: fade out
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const timer1 = setTimeout(() => {
      setStage(1);
    }, 500);

    const timer2 = setTimeout(() => {
      setStage(2);
    }, 4500);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 5200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener("resize", checkMobile);
    };
  }, [onComplete]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.5, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.5,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1,
        ease: "easeOut",
      },
    },
  };

  const progressVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 3.8,
        delay: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const particleVariants = {
    floating: {
      y: [-20, 20],
      x: [-10, 10],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950 px-4 sm:px-6 lg:px-8"
      style={{
        background: `
          radial-gradient(ellipse at top left, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at top right, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at bottom left, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
          linear-gradient(135deg, #0f0f23 0%, #1a0d2e 25%, #0d1b2a  50%, #1e1b4b 75%, #0f0f23 100%)
        `,
      }}
      variants={containerVariants}
      initial="hidden"
      animate={stage === 2 ? "exit" : "visible"}
    >
      {/* Animated background particles - responsive count */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isMobile ? 10 : 20)].map((_, i) => {
          const colors = [
            "bg-cyan-400/40 shadow-cyan-400/50",
            "bg-purple-400/40 shadow-purple-400/50",
            "bg-pink-400/40 shadow-pink-400/50",
            "bg-blue-400/40 shadow-blue-400/50",
            "bg-emerald-400/40 shadow-emerald-400/50",
          ];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];

          return (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 sm:w-2 sm:h-2 rounded-full ${randomColor}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: `0 0 10px currentColor`,
                filter: "blur(0.5px)",
              }}
              variants={particleVariants}
              animate="floating"
              transition={{
                delay: i * 0.2,
                duration: 3 + Math.random() * 2,
              }}
            />
          );
        })}
      </div>

      {/* Gradient orbs - responsive sizes with neon effects */}
      <div
        className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 rounded-full blur-2xl sm:blur-3xl animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)",
          boxShadow: "0 0 80px rgba(6, 182, 212, 0.4)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 rounded-full blur-2xl sm:blur-3xl animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 100%)",
          boxShadow: "0 0 80px rgba(168, 85, 247, 0.4)",
          animationDelay: "1s",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full blur-xl animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(34, 197, 94, 0.15) 50%, transparent 100%)",
          boxShadow: "0 0 60px rgba(16, 185, 129, 0.3)",
          animationDelay: "2s",
        }}
      />

      {/* Main content - responsive container */}
      <div className="relative z-10 text-center w-full max-w-md sm:max-w-lg lg:max-w-xl">
        {/* Logo/Avatar - responsive sizes */}
        <motion.div
          className="mb-6 sm:mb-8 flex justify-center"
          variants={logoVariants}
          initial="hidden"
          animate={stage >= 1 ? "visible" : "hidden"}
        >
          <div className="relative">
            <motion.div
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full p-1"
              style={{
                background:
                  "linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4)",
                backgroundSize: "300% 300%",
              }}
              whileHover={{ scale: 1.05 }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                boxShadow: [
                  "0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(139, 92, 246, 0.4)",
                  "0 0 40px rgba(139, 92, 246, 0.6), 0 0 80px rgba(236, 72, 153, 0.4)",
                  "0 0 30px rgba(236, 72, 153, 0.6), 0 0 60px rgba(6, 182, 212, 0.4)",
                  "0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(139, 92, 246, 0.4)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <video
                  src="/assets/videos/animation-chris-dev.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </motion.div>

            {/* Rotating rings with neon effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid transparent",
                backgroundImage:
                  "linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4)",
                backgroundSize: "200% 200%",
                backgroundClip: "border-box",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
              }}
              animate={{
                rotate: 360,
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                backgroundPosition: { duration: 4, repeat: Infinity },
              }}
            />
            <motion.div
              className="absolute inset-[-2px] rounded-full border border-cyan-400/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ filter: "blur(1px)" }}
            />
          </div>
        </motion.div>

        {/* Welcome text - responsive typography */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate={stage >= 1 ? "visible" : "hidden"}
          className="mb-6 sm:mb-8 px-4"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent mb-3 sm:mb-4"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899, #10b981, #06b6d4)",
              backgroundSize: "300% 300%",
              textShadow:
                "0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Bienvenue
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl font-light px-2 leading-relaxed"
            style={{
              color: "#e2e8f0",
              textShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Christophe - Concepteur/Développeur d'applications Web
          </motion.p>
        </motion.div>

        {/* Loading bar - responsive width */}
        <motion.div
          className="w-48 sm:w-56 md:w-64 h-1 bg-slate-700 rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div
            className="h-full rounded-full origin-left"
            style={{
              background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899)",
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.6)",
            }}
            variants={progressVariants}
            initial="hidden"
            animate={stage >= 1 ? "visible" : "hidden"}
          />
        </motion.div>

        {/* Loading dots - responsive spacing */}
        <motion.div
          className="flex justify-center space-x-1 sm:space-x-2 mt-4 sm:mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          {[0, 1, 2].map((i) => {
            const colors = ["#06b6d4", "#8b5cf6", "#ec4899"];
            return (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                style={{
                  backgroundColor: colors[i],
                  boxShadow: `0 0 15px ${colors[i]}`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Bottom signature - responsive positioning */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <p className="text-slate-400 text-xs sm:text-sm font-light tracking-wider text-center">
          Solutions digitales sur mesure
        </p>
      </motion.div>
    </motion.div>
  );
}
