/**
 * Petite scène du bandeau du blog (06/11/2026, idée Codex) : une feuille se
 * remplit de lignes, le signet orange se pose, puis la scène s'arrête
 * (un seul cycle). CSS dans index.css (section Blog) ; mode réduit : image
 * finale directe. Décorative et réservée aux grands écrans, pour ne pas
 * repousser les articles sur mobile.
 */
export default function BlogScene() {
  return (
    <svg
      viewBox="0 0 260 220"
      aria-hidden="true"
      focusable="false"
      className="blog-scene pointer-events-none absolute right-8 top-1/2 hidden w-[260px] -translate-y-1/2 xl:right-0 xl:block xl:w-[280px]"
    >
      {/* Soleil derrière */}
      <circle className="blog-soleil" cx="200" cy="52" r="30" fill="#F2A25C" />
      {/* Feuille du dessous, légèrement tournée */}
      <rect x="62" y="40" width="140" height="170" rx="10" fill="#24594C" transform="rotate(-7 132 125)" />
      {/* Feuille principale */}
      <g className="blog-feuille">
        <rect x="56" y="30" width="150" height="180" rx="10" fill="#F5F1E8" />
        <rect x="74" y="52" width="84" height="10" rx="5" fill="#12312B" />
        {[78, 92, 106, 120, 134, 148, 162].map((y, i) => (
          <rect
            key={y}
            className="blog-ligne"
            style={{ animationDelay: `${0.5 + i * 0.18}s` }}
            x="74"
            y={y}
            width={i % 3 === 2 ? 70 : 114}
            height="5"
            rx="2.5"
            fill="#C5D3CC"
          />
        ))}
        <rect className="blog-ligne" style={{ animationDelay: "1.9s" }} x="74" y="180" width="46" height="12" rx="6" fill="#3E7A68" />
      </g>
      {/* Signet orange qui se pose */}
      <path className="blog-signet" d="M168 22 H188 V70 L178 61 L168 70 Z" fill="#F2A25C" />
    </svg>
  );
}
