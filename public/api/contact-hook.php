<?php
/**
 * Relais du formulaire de contact vers le scénario Make qui prépare un
 * brouillon de réponse dans Gmail (voir docs/automatisation-formulaire-make.md).
 *
 * L'URL du webhook Make et sa clé API ne quittent jamais le serveur : elles
 * sont lues depuis ../../make-webhook.php (dossier du domaine, HORS de
 * public_html), fichier créé manuellement via le Gestionnaire de fichiers hPanel :
 *   <?php return ['url' => 'https://hook.eu1.make.com/...', 'key' => '...']; ?>
 * La clé est envoyée dans l'en-tête x-make-apikey, que le webhook exige : une
 * URL qui fuiterait ne suffirait pas à déclencher le scénario. Ni l'une ni
 * l'autre ne doivent apparaître dans le repo, le bundle ou la CI.
 *
 * Le mail de notification reste envoyé par EmailJS côté navigateur : ce relais
 * est un complément, son échec ne doit jamais bloquer le formulaire.
 *
 * Protections : POST uniquement, origine vérifiée, taille bornée, champs
 * validés et tronqués, rate limiting par IP (3/heure) et plafond global
 * journalier (30/jour), hôte du webhook vérifié.
 */

declare(strict_types=1);

const ALLOWED_ORIGIN_PATTERN = '#^https://(www\.)?christophe-dev-freelance\.fr(/|$)#';
const WEBHOOK_PATTERN = '#^https://hook\.eu1\.make\.com/[A-Za-z0-9]+$#';
const MAX_BODY_BYTES = 10000;
const RATE_PER_HOUR = 3;
const RATE_PER_DAY_GLOBAL = 30;

/** Champ => longueur maximale (en caractères) */
const FIELDS = [
    'name' => 100,
    'email' => 254,
    'phone' => 30,
    'city' => 100,
    'projectType' => 100,
    'description' => 5000,
];

function reply(int $code, array $body): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

/* ---- Méthode ---- */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    reply(405, ['error' => 'Méthode non autorisée']);
}

/* ---- Origine (protection basique contre l'utilisation hors site) ---- */
$origin = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
if (!preg_match(ALLOWED_ORIGIN_PATTERN, $origin)) {
    reply(403, ['error' => 'Origine non autorisée']);
}

/* ---- Corps de la requête ---- */
$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($raw === false || strlen($raw) > MAX_BODY_BYTES) {
    reply(413, ['error' => 'Requête trop volumineuse']);
}
$input = json_decode($raw, true);
if (!is_array($input)) {
    reply(400, ['error' => 'Format invalide']);
}

$data = [];
foreach (FIELDS as $field => $max) {
    $value = $input[$field] ?? '';
    if (!is_string($value)) {
        reply(400, ['error' => 'Champ invalide']);
    }
    // Caractères de contrôle retirés (sauf retours à la ligne), longueur bornée
    $value = trim(preg_replace('/[^\P{C}\n]/u', '', $value) ?? '');
    $data[$field] = mb_substr($value, 0, $max);
}

if ($data['name'] === '' || $data['projectType'] === '') {
    reply(400, ['error' => 'Champs obligatoires manquants']);
}
if (filter_var($data['email'], FILTER_VALIDATE_EMAIL) === false) {
    reply(400, ['error' => 'Adresse e-mail invalide']);
}

/* ---- Rate limiting (après validation : une requête invalide ne compte pas) ---- */
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rlDir = sys_get_temp_dir() . '/contact-hook-ratelimit';
if (!is_dir($rlDir)) {
    @mkdir($rlDir, 0700, true);
}
$now = time();

// Un seul verrou pour toute la séquence lecture, contrôle, écriture : sans lui,
// deux requêtes simultanées lisent le même compteur et passent toutes les deux.
// Le verrou est libéré à la fin du bloc, ou à la sortie du script (reply).
$lock = fopen($rlDir . '/.lock', 'c');
if ($lock === false || !flock($lock, LOCK_EX)) {
    reply(503, ['error' => 'Service temporairement indisponible']);
}

$ipFile = $rlDir . '/ip-' . hash('sha256', $ip);
$stamps = [];
if (is_file($ipFile)) {
    foreach (explode(',', (string) file_get_contents($ipFile)) as $t) {
        if ((int) $t > $now - 3600) {
            $stamps[] = (int) $t;
        }
    }
}
if (count($stamps) >= RATE_PER_HOUR) {
    reply(429, ['error' => 'Trop de demandes, réessayez plus tard']);
}
$stamps[] = $now;
@file_put_contents($ipFile, implode(',', $stamps), LOCK_EX);

$dayFile = $rlDir . '/global-' . date('Y-m-d');
$dayCount = is_file($dayFile) ? (int) file_get_contents($dayFile) : 0;
if ($dayCount >= RATE_PER_DAY_GLOBAL) {
    reply(429, ['error' => 'Quota journalier atteint']);
}
@file_put_contents($dayFile, (string) ($dayCount + 1), LOCK_EX);
flock($lock, LOCK_UN);
fclose($lock);

/* ---- Webhook et clé (hors webroot ; jamais dans le repo ni le bundle) ---- */
$config = null;
$configFile = __DIR__ . '/../../make-webhook.php';
if (is_file($configFile)) {
    $config = require $configFile;
}
$webhook = is_array($config) ? ($config['url'] ?? null) : null;
$apiKey = is_array($config) ? ($config['key'] ?? null) : null;
if (!is_string($webhook) || !preg_match(WEBHOOK_PATTERN, $webhook)
    || !is_string($apiKey) || strlen($apiKey) < 32) {
    error_log('contact-hook: configuration du webhook Make absente ou invalide');
    reply(503, ['error' => 'Service temporairement indisponible']);
}

/* ---- Transmission à Make ---- */
$ch = curl_init($webhook);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'x-make-apikey: ' . $apiKey,
    ],
    CURLOPT_POSTFIELDS => json_encode($data, JSON_UNESCAPED_UNICODE),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 10,
]);
$response = curl_exec($ch);
$status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($status < 200 || $status >= 300) {
    error_log(sprintf(
        'contact-hook: statut Make %d, curl "%s", corps: %s',
        $status,
        $curlError,
        substr((string) $response, 0, 300)
    ));
    reply(502, ['error' => 'Transmission impossible']);
}

reply(202, ['ok' => true]);
