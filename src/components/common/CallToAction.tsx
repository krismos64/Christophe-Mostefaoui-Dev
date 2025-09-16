import { motion } from "framer-motion";
import { ArrowRight, Send, MessageCircle, Calendar, Bot, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { trackCTAClick } from "../../utils/analytics";
import { useABTest } from "../../utils/ab-testing";
import { useEffect } from "react";

interface CallToActionProps {
  variant?: "primary" | "secondary" | "gradient" | "white" | "outline-white";
  text: string;
  subtext?: string;
  icon?: "arrow" | "send" | "message" | "calendar" | "bot" | "sparkles";
  size?: "small" | "medium" | "large";
  href?: string;
  className?: string;
  onClick?: () => void;
  location?: string;
  testId?: string;
}

const CallToAction = ({
  variant = "primary",
  text,
  subtext,
  icon = "arrow",
  size = "medium",
  href = "#contact",
  className = "",
  onClick,
  location = "unknown",
  testId,
}: CallToActionProps) => {
  const { variant: abVariant, trackConversion } = useABTest(testId || '');
  
  useEffect(() => {
    if (abVariant && testId) {
      text = abVariant.text;
      subtext = abVariant.subtext;
      variant = abVariant.variant || variant;
      icon = abVariant.icon || icon;
    }
  }, [abVariant]);
  
  const finalText = (abVariant && testId) ? abVariant.text : text;
  const finalSubtext = (abVariant && testId) ? abVariant.subtext : subtext;
  const finalVariant = (abVariant && testId && abVariant.variant) ? abVariant.variant : variant;
  const finalIcon = (abVariant && testId && abVariant.icon) ? abVariant.icon : icon;
  const icons = {
    arrow: ArrowRight,
    send: Send,
    message: MessageCircle,
    calendar: Calendar,
    bot: Bot,
    sparkles: Sparkles,
  };

  const Icon = icons[finalIcon];
  
  const handleClick = () => {
    trackCTAClick(finalText, location, finalVariant);
    if (testId && abVariant) {
      trackConversion();
    }
    onClick?.();
  };

  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl hover:shadow-2xl hover:scale-105",
    secondary:
      "bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700",
    gradient:
      "bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 animate-gradient-x",
    white:
      "bg-white text-purple-600 shadow-xl hover:shadow-2xl hover:scale-105",
    "outline-white":
      "bg-transparent text-white border-2 border-white hover:bg-white hover:text-purple-600 transition-colors",
  };

  const content = (
    <motion.div
      className={`
        inline-flex items-center justify-center gap-3 
        ${sizeClasses[size]} 
        ${variantClasses[finalVariant]}
        rounded-full font-semibold
        transition-all duration-300 transform
        cursor-pointer
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      aria-label={`${finalText} ${finalSubtext || ''}`}
      role="button"
    >
      <div className="flex flex-col items-start">
        <span className="font-bold">{finalText}</span>
        {finalSubtext && (
          <span className="text-xs opacity-90 font-normal">{finalSubtext}</span>
        )}
      </div>
      <motion.div
        animate={{ x: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        aria-hidden="true"
      >
        <Icon className="w-5 h-5" />
      </motion.div>
    </motion.div>
  );

  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          handleClick();
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={href} onClick={handleClick}>
      {content}
    </Link>
  );
};

export default CallToAction;