// Types partagés à travers l'application

export interface MenuItem {
  name: string;
  to: string;
  icon: React.ReactNode;
}

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}