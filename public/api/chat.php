<?php
/**
 * Proxy Mistral AI pour le chatbot du site.
 *
 * La clé API ne quitte jamais le serveur : elle est lue depuis
 *   ../../mistral-key.php  (dossier du domaine, HORS de public_html)
 * fichier créé manuellement via le Gestionnaire de fichiers hPanel :
 *   <?php return 'VOTRE_CLE'; ?>
 *
 * Protections : POST uniquement, origine vérifiée, taille bornée,
 * rôles/longueurs des messages validés, rate limiting par IP (10/min)
 * et plafond global journalier (500/jour), modèle et max_tokens imposés
 * côté serveur, prompt système non modifiable par le client.
 */

declare(strict_types=1);

const ALLOWED_ORIGIN_PATTERN = '#^https://(www\.)?christophe-dev-freelance\.fr(/|$)#';
const MAX_BODY_BYTES = 20000;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 2000;
const RATE_PER_MINUTE = 10;
const RATE_PER_DAY_GLOBAL = 500;

function fail(int $code, string $message): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

/* ---- Méthode ---- */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail(405, 'Méthode non autorisée');
}

/* ---- Origine (protection basique contre l'utilisation hors site) ---- */
$origin = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
if (!preg_match(ALLOWED_ORIGIN_PATTERN, $origin)) {
    fail(403, 'Origine non autorisée');
}

/* ---- Rate limiting ---- */
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlDir = sys_get_temp_dir() . '/chatbot-ratelimit';
if (!is_dir($rlDir)) {
    @mkdir($rlDir, 0700, true);
}
$now = time();

$ipFile = $rlDir . '/ip-' . hash('sha256', $ip);
$stamps = [];
if (is_file($ipFile)) {
    foreach (explode(',', (string) file_get_contents($ipFile)) as $t) {
        if ((int) $t > $now - 60) {
            $stamps[] = (int) $t;
        }
    }
}
if (count($stamps) >= RATE_PER_MINUTE) {
    fail(429, 'Trop de requêtes, réessayez dans une minute');
}
$stamps[] = $now;
@file_put_contents($ipFile, implode(',', $stamps), LOCK_EX);

$dayFile = $rlDir . '/global-' . date('Y-m-d');
$dayCount = is_file($dayFile) ? (int) file_get_contents($dayFile) : 0;
if ($dayCount >= RATE_PER_DAY_GLOBAL) {
    fail(429, 'Quota journalier atteint');
}
@file_put_contents($dayFile, (string) ($dayCount + 1), LOCK_EX);

/* ---- Clé API (hors webroot ; jamais dans le repo ni le bundle) ---- */
$key = getenv('MISTRAL_API_KEY') ?: null;
if ($key === null) {
    $keyFile = __DIR__ . '/../../mistral-key.php';
    if (is_file($keyFile)) {
        $key = require $keyFile;
    }
}
if (!is_string($key) || $key === '') {
    fail(503, 'Assistant temporairement indisponible (clé non configurée)');
}

/* ---- Corps de la requête ---- */
$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($raw === false || strlen($raw) > MAX_BODY_BYTES) {
    fail(413, 'Requête trop volumineuse');
}
$input = json_decode($raw, true);
if (!is_array($input) || !isset($input['messages']) || !is_array($input['messages'])) {
    fail(400, 'Format invalide');
}

$messages = [];
foreach (array_slice($input['messages'], -MAX_MESSAGES) as $m) {
    if (!is_array($m) || !isset($m['role'], $m['content'])) {
        fail(400, 'Message invalide');
    }
    $role = $m['role'];
    $content = $m['content'];
    if (!in_array($role, ['user', 'assistant'], true) || !is_string($content)) {
        fail(400, 'Message invalide');
    }
    $content = trim($content);
    if ($content === '' || mb_strlen($content) > MAX_MESSAGE_CHARS) {
        fail(400, 'Message vide ou trop long');
    }
    $messages[] = ['role' => $role, 'content' => $content];
}
if ($messages === [] || end($messages)['role'] !== 'user') {
    fail(400, 'Aucune question utilisateur');
}

/* ---- Prompt système (imposé côté serveur, non modifiable par le client) ---- */
$systemPrompt = <<<'PROMPT'
Tu es l'assistant virtuel de Christophe Mostefaoui, développeur web freelance basé à Pau et Artix (64).

INFORMATIONS SUR CHRISTOPHE :
- Nom : Christophe Mostefaoui
- Âge : 38 ans
- Localisation : Artix / Pau, Pyrénées-Atlantiques (64)
- Statut : Développeur freelance
- Expérience : plus de 10 ans dans l'informatique (12 ans dans le conseil client multimédia, puis le freelance et le développement)
- Site web : christophe-dev-freelance.fr
- Email : christophe.mostefaoui.dev@gmail.com
- Téléphone : 06 79 08 88 45
- GitHub : github.com/krismos64
- LinkedIn : https://www.linkedin.com/in/christophemostefaoui/
- Portfolio technique : krismos.fr

SERVICES (alignés sur la section Services I-VI du site) :
I. Site Vitrine Moderne — présence en ligne professionnelle, visible sur Google et référencée par les assistants IA.
II. Site Multi-pages — site complet avec blog, formulaire et CMS pour gérer en autonomie.
III. Refonte de Site — modernisation d'un site existant pour une meilleure image et de meilleures performances.
IV. Chatbot intelligent — assistant IA intégré au site (comme celui-ci, visible en bas à droite), capable de répondre aux clients 24h/24.
V. Référencement Google & IA — optimisation SEO pour Google ET les assistants IA (ChatGPT, Claude, Perplexity).
VI. Vidéo & Drone (DGAC) — vidéos professionnelles (Final Cut Pro) et prises de vue aériennes certifiées par la Direction Générale de l'Aviation Civile.

COMPÉTENCES TECHNIQUES :
- Frontend : React, TypeScript, Next.js, TailwindCSS, Framer Motion
- Backend : Node.js, Express, API REST
- Bases de données : MySQL, MongoDB, Prisma ORM
- DevOps : Docker, CI/CD
- Paiement : Stripe
- Temps réel : WebSockets, Socket.io
- IA : intégration OpenAI GPT, Anthropic Claude, Mistral

PROJETS PHARES :
1. SMARTPLANNING (smartplanning.fr) — PROJET FONDATEUR
   - SaaS de gestion de plannings d'équipe, conçu, développé et lancé seul en 2026
   - Modèle freemium
   - À mettre en avant : Christophe a piloté tout le cycle de vie produit (architecture, développement, déploiement, support), pas seulement le code.

2. LIVRESTAKA (livrestaka.fr)
   - Plateforme d'édition et correction de manuscrits
   - Espace client sécurisé, paiement Stripe, messagerie intégrée

3. Cabinet Infirmier Graslin, Poulp Fiction (plongée), Methodea, CoachTFE, Garage Parrot — 5 autres projets clients visibles dans le portfolio.

DEVIS ET TARIFS :
- Aucune grille tarifaire publique : chaque projet fait l'objet d'un devis personnalisé
- Premier échange gratuit (visio ou téléphone), devis envoyé sous 24h
- Paiement en 3× sans frais possible
- Si on te demande un prix précis, invite poliment à demander un devis gratuit via le formulaire de contact (#contact) ou au 06 79 08 88 45

ZONE D'INTERVENTION :
- DÉPLACEMENT GRATUIT dans tout le département des Pyrénées-Atlantiques (64) : Pau, Bayonne, Biarritz, Anglet, Orthez, Oloron, Lescar, Billère, Jurançon, Artix, Saint-Jean-de-Luz, Hendaye...
- PARTOUT EN FRANCE en distanciel (visio, partage d'écran)

MÉTHODE DE TRAVAIL (3 étapes) :
1. Analyse de vos besoins : premier échange gratuit pour comprendre votre projet
2. Proposition sur mesure : devis détaillé sous 24h
3. Accompagnement complet : développement, formation, support après livraison

RÈGLES DE COMMUNICATION :
1. Tu réponds aux questions concernant Christophe et ses services
2. Si on te pose une question hors sujet, fais un rebond élégant vers une compétence pertinente, sans emoji.
3. Termine systématiquement par un CTA discret et naturel :
   - "Vous pouvez demander un devis gratuit via le formulaire de contact."
   - "Christophe répond personnellement sous 24h à christophe.mostefaoui.dev@gmail.com."
   - "Souhaitez-vous plus de détails sur un projet en particulier ?"
4. Ton : professionnel, chaleureux, sobre. Évite les emojis dans tes réponses (un seul à la rigueur si vraiment justifié).
5. Pour les questions sur l'expérience ou la crédibilité, mentionne le rôle de fondateur de SmartPlanning et les plus de 10 ans dans l'informatique.
6. Pour les questions techniques, reste accessible : ta cible est composée de PME, TPE et indépendants, pas de développeurs.
7. Ne réponds JAMAIS avec des stats inventées (taux de satisfaction, nombre d'avis, nombre de projets précis non vérifiable).
PROMPT;

/* ---- Appel Mistral en streaming (SSE relayé tel quel) ---- */
$payload = [
    'model' => 'open-mistral-7b',
    'messages' => array_merge(
        [['role' => 'system', 'content' => $systemPrompt]],
        $messages
    ),
    'temperature' => 0.7,
    'max_tokens' => 500,
    'stream' => true,
];

@ini_set('zlib.output_compression', '0');
while (ob_get_level() > 0) {
    ob_end_clean();
}

$status = 0;
$errorBody = '';
$streamStarted = false;

$ch = curl_init('https://api.mistral.ai/v1/chat/completions');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $key,
        'Accept: text/event-stream',
    ],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 90,
    CURLOPT_HEADERFUNCTION => static function ($ch, string $header) use (&$status): int {
        if (preg_match('#^HTTP/\S+\s+(\d+)#', $header, $m)) {
            $status = (int) $m[1];
        }
        return strlen($header);
    },
    CURLOPT_WRITEFUNCTION => static function ($ch, string $data) use (&$status, &$errorBody, &$streamStarted): int {
        if ($status >= 200 && $status < 300) {
            if (!$streamStarted) {
                http_response_code(200);
                header('Content-Type: text/event-stream; charset=utf-8');
                header('Cache-Control: no-cache');
                header('X-Accel-Buffering: no');
                $streamStarted = true;
            }
            echo $data;
            flush();
        } else {
            $errorBody .= $data; // consommé mais jamais relayé au client
        }
        return strlen($data);
    },
]);

$ok = curl_exec($ch);
$curlError = curl_error($ch);
curl_close($ch);

if (!$streamStarted) {
    error_log(sprintf(
        'chatbot proxy: statut Mistral %d, curl "%s", corps: %s',
        $status,
        $curlError,
        substr($errorBody, 0, 500)
    ));
    fail(502, 'Assistant temporairement indisponible');
}
