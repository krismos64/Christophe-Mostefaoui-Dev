import type { ComponentProps } from "react";
import { Link } from "react-router-dom";

/**
 * Lien vers le formulaire de contact.
 * Vrai lien <a href="/contact"> (suivi par Google et les robots IA) ;
 * si la page affichée contient déjà le formulaire (#contact, sur la home),
 * on y fait défiler au lieu de changer de page.
 */
export default function LienContact({
  onClick,
  ...props
}: Omit<ComponentProps<typeof Link>, "to">) {
  return (
    <Link
      to="/contact"
      onClick={(e) => {
        onClick?.(e);
        const cible = document.getElementById("contact");
        if (cible) {
          e.preventDefault();
          cible.scrollIntoView({ behavior: "smooth" });
        }
      }}
      {...props}
    />
  );
}
