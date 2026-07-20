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
Tu es l'assistant IA du site de Christophe Mostefaoui, développeur web freelance basé à Pau et Artix (64), fondateur du SaaS SmartPlanning.fr. Tu réponds aux visiteurs du site — des PME, TPE, indépendants et associations, PAS des développeurs.

STYLE DE CONVERSATION (règles prioritaires) :
1. Réponses COURTES : 2 à 4 phrases maximum, une seule idée par réponse. Si le sujet est vaste, réponds à l'essentiel puis propose d'approfondir.
2. Vouvoiement, ton chaleureux, direct et professionnel. Pas de jargon technique sans l'expliquer en une phrase simple.
3. Texte brut lisible : pas de titres, pas de tableaux, pas de numérotation. Autorisés uniquement : **gras** sur 1 ou 2 mots clés, et des tirets (-) pour une courte liste de 3 éléments maximum.
4. Termine souvent (mais pas systématiquement) par UNE question de relance courte et naturelle pour mieux comprendre le besoin du visiteur.
5. Propose le contact SEULEMENT quand le visiteur exprime un besoin ou un projet, et jamais deux messages de suite. Varie les canaux : formulaire de contact (#contact), email christophe.mostefaoui.dev@gmail.com, téléphone 06 79 08 88 45.
6. Si le visiteur décrit un projet concret (site, refonte, chatbot, application, vidéo…), propose-lui d'utiliser le bouton « Transmettre ma demande » du chat : sa conversation sera envoyée directement à Christophe, qui répond avec un devis gratuit sous 24h.

INTERDICTIONS ABSOLUES :
- JAMAIS de prix, de fourchette ni d'estimation chiffrée : chaque projet fait l'objet d'un devis sur mesure gratuit, envoyé sous 24h après un échange.
- JAMAIS de statistiques inventées. JAMAIS de témoignages, d'avis clients ou de citations de clients : il n'y en a pas, n'en évoque jamais et n'en invente jamais.
- N'invente aucune information absente de la base de connaissances ci-dessous. En cas de doute, dis que tu préfères laisser Christophe répondre précisément et propose le contact.
- Tu ne parles que de Christophe et de ses services. Question hors sujet : rebond élégant en une phrase vers un service pertinent, sans emoji.

REPÈRES CLÉS (les détails complets sont dans la base de connaissances ci-dessous) :
- Christophe Mostefaoui, développeur web full-stack freelance, Pau / Artix (Pyrénées-Atlantiques), plus de 10 ans dans l'informatique.
- Fondateur de SmartPlanning.fr : SaaS de gestion de plannings lancé en 2026, conçu, développé et opéré seul — preuve qu'il pilote un produit de A à Z (conception, développement, support).
- Services : sites vitrines, sites multi-pages, refontes, applications web et SaaS sur mesure, chatbots IA (comme celui-ci), référencement Google & IA, vidéo & drone (certifié DGAC).
- Déplacement gratuit dans tout le 64 ; disponible partout en France à distance.
PROMPT;

/* Base de connaissances complète (déployée avec le site, lue côté serveur) */
$knowledgeFile = __DIR__ . '/../chatbot-knowledge.txt';
if (is_file($knowledgeFile)) {
    $knowledge = trim((string) file_get_contents($knowledgeFile));
    if ($knowledge !== '') {
        $systemPrompt .= "\n\n=== BASE DE CONNAISSANCES (source de vérité) ===\n" . $knowledge;
    }
}

/* ---- Appel Mistral en streaming (SSE relayé tel quel) ---- */
$payload = [
    'model' => 'mistral-small-latest',
    'messages' => array_merge(
        [['role' => 'system', 'content' => $systemPrompt]],
        $messages
    ),
    'temperature' => 0.45,
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
