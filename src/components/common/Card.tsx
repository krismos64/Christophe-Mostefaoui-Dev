import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function Card({ 
  children, 
  className = "", 
  hover = true, 
  delay = 0 
}: CardProps) {
  const hoverClass = hover ? "card-hover" : "";
  
  return (
    <div
      className={`p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300 animate-slideIn ${hoverClass} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}