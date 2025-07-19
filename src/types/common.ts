// Common types and interfaces used across the application

export interface MenuItem {
  name: string;
  to: string;
  icon: React.ReactNode;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  alt: string;
  tech: string[];
  link: string;
}

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  rating: number;
  review: string;
  date: string;
}

export interface Skill {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
}

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}