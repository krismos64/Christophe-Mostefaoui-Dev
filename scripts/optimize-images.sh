#!/usr/bin/env bash
# Optimisation images : génère AVIF + WebP multi-tailles pour chaque image
# Usage : ./scripts/optimize-images.sh
set -euo pipefail

cd "$(dirname "$0")/.."

OUT="public/assets/images/optimized"
mkdir -p "$OUT"

# Format : "fichier_source|tailles_csv|qualité_webp|qualité_avif"
# Les tailles correspondent aux largeurs utiles selon le contexte d'affichage.

declare -a JOBS=(
  # Section About — image fond pleine largeur portrait
  "public/assets/images/montagne.png|480,768,1200,1600|75|30"
  # Smartplanning showcase + Portfolio carte fondateur — logo affiché ~600px max
  "public/assets/images/logosp.png|320,640,960|80|32"
  # Vignettes Portfolio (768x432 max affichage en card)
  "public/assets/images/livrestaka.jpg|400,800|78|30"
  "public/assets/images/graslin.jpg|400,800|78|30"
  "public/assets/images/poulpfiction.jpg|400,800|78|30"
  "public/assets/images/methodea.png|400,800|78|30"
  "public/assets/images/coachtfe.png|400,800|78|30"
  "public/assets/images/garage.jpg|400,800|78|30"
  # Miniatures vidéo YouTube embed (max 800x450)
  "public/assets/images/miniature.png|400,800|78|30"
  "public/assets/images/miniature-2.png|400,800|78|30"
  # Articles blog (vignettes 400-800px)
  "public/assets/images/ia-blog.webp|400,800|78|30"
  "public/assets/images/seo-blog.webp|400,800|78|30"
  "public/assets/images/typescript-blog.webp|400,800|78|30"
  "public/assets/images/iapython-blog.webp|400,800|78|30"
  "public/assets/images/react-blog.webp|400,800|78|30"
  "public/assets/images/combien-coute-site-internet-2026.png|400,800|78|30"
  "public/assets/images/chatbot-ia-commerce-pme.png|400,800|78|30"
  "public/assets/images/referencement-google-chatgpt-2026.png|400,800|78|30"
  "public/assets/images/visibilite-locale-pau-bearn-cote-basque.png|400,800|78|30"
  # Profil — schema.org + chatbot (256-512px)
  "public/assets/images/Chris-profil.jpg|256,512|80|32"
  # Image Knowledge Panel Google (512px)
  "public/assets/images/chris-web.png|512,1024|80|32"
)

total_before=0
total_after=0

for job in "${JOBS[@]}"; do
  IFS='|' read -r SRC SIZES Q_WEBP Q_AVIF <<< "$job"
  [ -f "$SRC" ] || { echo "⚠️  introuvable : $SRC"; continue; }

  base="$(basename "$SRC")"
  name="${base%.*}"
  before=$(stat -f%z "$SRC")
  total_before=$((total_before + before))

  echo ""
  echo "▶ $base ($(($before / 1024)) kB)"

  # sips ne sait pas lire webp → on décode d'abord en PNG si nécessaire
  src_for_resize="$SRC"
  decoded_src=""
  case "$SRC" in
    *.webp)
      decoded_src="$OUT/${name}.decoded.png"
      dwebp "$SRC" -o "$decoded_src" >/dev/null 2>&1
      src_for_resize="$decoded_src"
      ;;
  esac

  IFS=',' read -ra SIZE_ARR <<< "$SIZES"
  for size in "${SIZE_ARR[@]}"; do
    tmp_png="$OUT/${name}-${size}.tmp.png"
    out_webp="$OUT/${name}-${size}.webp"
    out_avif="$OUT/${name}-${size}.avif"

    sips -Z "$size" "$src_for_resize" --out "$tmp_png" >/dev/null 2>&1

    cwebp -q "$Q_WEBP" -m 6 -mt -af "$tmp_png" -o "$out_webp" >/dev/null 2>&1
    avifenc --min $((50 - Q_AVIF)) --max $((63 - Q_AVIF)) --speed 4 "$tmp_png" "$out_avif" >/dev/null 2>&1

    rm -f "$tmp_png"

    s_webp=$(stat -f%z "$out_webp")
    s_avif=$(stat -f%z "$out_avif")
    total_after=$((total_after + s_webp + s_avif))
    printf "   %4dpx  webp %4d kB  avif %4d kB\n" "$size" "$((s_webp / 1024))" "$((s_avif / 1024))"
  done

  [ -n "$decoded_src" ] && rm -f "$decoded_src"
done

echo ""
echo "════════════════════════════════════════"
echo " AVANT : $((total_before / 1024 / 1024)) MB"
echo " APRÈS : $((total_after / 1024 / 1024)) MB (AVIF+WebP cumulés, navigateur ne charge qu'un format)"
echo "════════════════════════════════════════"
