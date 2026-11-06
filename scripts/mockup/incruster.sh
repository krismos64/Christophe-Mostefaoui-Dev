#!/usr/bin/env bash
# Vignette de réalisation : la vraie capture d'un site dans l'écran d'un
# portable, et sa version mobile dans le téléphone posé à côté.
# Décor généré une fois avec Codex le 06/11/2026 (bureau en chêne, caméra 10°
# à gauche) : écran du portable en vert chroma, écran du téléphone en magenta.
# Chaque capture est déformée en perspective sur les quatre coins de son écran.
#
# Usage : scripts/mockup/incruster.sh lune-soleil
#   capture ordinateur : scripts/mockup/captures/<nom>-ordi.png ou .jpg
#                        (viewport 1440x900, densité 1 ; LivresStaka, en
#                        maintenance le 06/11/2026, garde son ancienne capture)
#   capture mobile     : scripts/mockup/captures/<nom>-mobile.png (viewport
#                        393x852, densité 3) ; absente = téléphone écran éteint
#   Captures prises en haut de la page d'accueil en ligne, bandeau de cookies
#   masqué dans le navigateur (jamais accepté au nom du visiteur)
# Sortie : public/assets/images/<nom>-mockup.jpg (16:9), à passer ensuite dans
# scripts/optimize-images.sh.
set -euo pipefail
cd "$(dirname "$0")/../.."

nom="$1"
src=""
for f in "scripts/mockup/captures/${nom}-ordi.png" "scripts/mockup/captures/${nom}-ordi.jpg"; do
  [ -f "$f" ] && { src="$f"; break; }
done
[ -n "$src" ] || { echo "Capture ordinateur manquante pour $nom" >&2; exit 1; }
mobile="scripts/mockup/captures/${nom}-mobile.png"
decor="scripts/mockup/decor-portable.png"
sortie="public/assets/images/${nom}-mockup.jpg"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
dim="$(magick identify -format '%wx%h' "$decor")"

# poser <image> <largeur> <hauteur> <rayon> <TL> <TR> <BR> <BL> <sortie>
# Coins arrondis dessinés à plat, reflet léger, puis perspective : les bords
# restent lisses (un masque tiré du chroma suivait le grain de l'image générée)
poser() {
  local img="$1" L="$2" H="$3" R="$4" tl="$5" tr="$6" br="$7" bl="$8" out="$9"
  magick "$img" \
    \( -size "${L}x${H}" xc:white -alpha set -channel A \
       -fx "max(0, 0.09 - 0.12*(i/w + j/h)/2)" +channel \) -compose over -composite \
    \( -size "${L}x${H}" xc:black -fill white \
       -draw "roundrectangle 0,0 $((L-1)),$((H-1)) $R,$R" \) \
    -alpha off -compose CopyOpacity -composite "$tmp/plat.png"
  magick "$tmp/plat.png" -virtual-pixel transparent -background none \
    -define distort:viewport="$dim+0+0" -distort Perspective \
    "0,0 $tl  $((L-1)),0 $tr  $((L-1)),$((H-1)) $br  0,$((H-1)) $bl" \
    +repage "$out"
}

# Portable : écran 16:10. Capture calée sur la largeur (rien de coupé à gauche
# ni à droite), ancrée en haut ; s'il manque de la hauteur, le fond du site est
# prolongé. Coins mesurés sur le vert, poussés de 2 px vers l'extérieur.
fond="$(magick "$src" -format '%[pixel:p{2,%[fx:h-3]}]' info:)"
magick "$src" -resize 1000x -background "$fond" -gravity north -extent 1000x625 "$tmp/ordi.png"
poser "$tmp/ordi.png" 1000 625 8 "121,145" "950,144" "946,619" "151,657" "$tmp/ordi-pose.png"

# Téléphone : écran 1179x2556 (format d'un grand smartphone récent), à plat.
# Coins rentrés de 5 px : le chroma est collé au bord du téléphone, la marge
# libérée devient un cadre noir régulier (sinon pas de bordure en haut et à gauche)
if [ -f "$mobile" ]; then
  magick "$mobile" -resize 600x1300^ -gravity north -extent 600x1300 "$tmp/mobile.png"
  poser "$tmp/mobile.png" 600 1300 70 "1134,631" "1295,631" "1414,827" "1206,829" "$tmp/mobile-pose.png"
else
  magick -size "$dim" xc:none "$tmp/mobile-pose.png"   # écran éteint (noir du cadre)
fi

# Chroma résiduel au ras des cadres ramené au noir, pose des deux écrans,
# puis cadrage 16:9 (le 16:10 de la home rogne les côtés)
magick "$decor" -fx "(g - max(r,b)) > 0.25 || (min(r,b) - g) > 0.25 ? 0.07 : u" \
  "$tmp/ordi-pose.png" -compose over -composite \
  "$tmp/mobile-pose.png" -compose over -composite \
  -crop 1536x864+0+85 +repage -strip -quality 86 "$sortie"
chmod 644 "$sortie"
echo "$sortie"
