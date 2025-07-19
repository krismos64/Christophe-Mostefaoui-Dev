import React from "react";

interface AnimatedSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export default function AnimatedSection({ 
  id, 
  className = "", 
  children, 
  delay = 0 
}: AnimatedSectionProps) {
  return (
    <section
      id={id}
      className={`animate-slideIn ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}