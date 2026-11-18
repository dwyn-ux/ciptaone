<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

const DUITKU_ORDER_PATTERN = '/^C1-[0-9]{8}-[0-9A-F]{6}$/';

function duitku_json(array $data, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function duitku_fail(string $message, int $status = 400): never
{
    duitku_json(['ok' => false, 'error' => $message], $status);
}

function duitku_configured(): bool
{
    return DUITKU_MERCHANT_CODE !== 'DXXXX'
        && DUITKU_API_KEY !== 'REPLACE_WITH_DUITKU_API_KEY'
        && strlen(DUITKU_API_KEY) > 8;
}

function duitku_base_url(): string
{
    if (DUITKU_BASE_URL !== '') {
        return rtrim(DUITKU_BASE_URL, '/');
    }

    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
    $scheme = $https ? 'https' : 'http';
    $host = preg_replace('/[^a-zA-Z0-9.\-:]/', '', (string) ($_SERVER['HTTP_HOST'] ?? 'ciptaone.com'));
    if ($host === '' || !str_contains($host, '.')) {
        $host = 'ciptaone.com';
    }

    return $scheme . '://' . $host;
}

function duitku_api_url(string $path): string
{
    $base = DUITKU_ENV === 'production'
        ? 'https://passport.duitku.com/webapi/api/merchant'
        : 'https://sandbox.duitku.com/webapi/api/merchant';

    return $base . $path;
}

function duitku_post(string $url, string $payload, bool $json = true): array
{
    if (!function_exists('curl_init')) {
        return [0, '', 'cURL PHP extension is not enabled on this server.'];
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 20,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2,
        CURLOPT_HTTPHEADER => $json
            ? ['Content-Type: application/json', 'Content-Length: ' . strlen($payload), 'Accept: application/json']
            : ['Content-Type: application/x-www-form-urlencoded', 'Accept: application/json'],
    ]);

    $body = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = $body === false ? (string) curl_error($ch) : '';
    curl_close($ch);

    return [$code, $body === false ? '' : (string) $body, $error];
}

function duitku_sign_inquiry(string $orderId, int $amount): string
{
    return hash_hmac('sha256', DUITKU_MERCHANT_CODE . $orderId . $amount, DUITKU_API_KEY);
}

function duitku_sign_payment_methods(string $amount, string $datetime): string
{
    return hash_hmac('sha256', DUITKU_MERCHANT_CODE . $amount . $datetime, DUITKU_API_KEY);
}

function duitku_sign_callback(string $amount, string $orderId): string
{
    return hash_hmac('sha256', DUITKU_MERCHANT_CODE . $amount . $orderId, DUITKU_API_KEY);
}

function duitku_sign_status(string $orderId): string
{
    return hash_hmac('sha256', DUITKU_MERCHANT_CODE . $orderId, DUITKU_API_KEY);
}

/** Price whitelist — the browser never decides the amount. */
function duitku_packages(): array
{
    return [
        'starter' => ['name' => 'Starter', 'price' => 850000],
        'pro' => ['name' => 'Pro', 'price' => 1750000],
        'skala' => ['name' => 'Skala', 'price' => 3500000],
    ];
}

function duitku_storage(): string
{
    $dir = DUITKU_STORAGE_DIR;
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    return $dir;
}

function duitku_order_path(string $orderId): ?string
{
    if (!preg_match(DUITKU_ORDER_PATTERN, $orderId)) {
        return null;
    }
    return duitku_storage() . '/' . $orderId . '.json';
}

function duitku_read_order(string $orderId): ?array
{
    $path = duitku_order_path($orderId);
    if ($path === null || !is_file($path)) {
        return null;
    }
    $data = json_decode((string) file_get_contents($path), true);
    return is_array($data) ? $data : null;
}

function duitku_write_order(string $orderId, array $order): bool
{
    $path = duitku_order_path($orderId);
    if ($path === null) {
        return false;
    }
    return file_put_contents($path, json_encode($order, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX) !== false;
}

function duitku_log(string $message): void
{
    $line = '[' . date('Y-m-d H:i:s') . '] ' . $message . PHP_EOL;
    @file_put_contents(duitku_storage() . '/activity.log', $line, FILE_APPEND | LOCK_EX);
}

function duitku_client_ip(): string
{
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'] as $key) {
        if (!empty($_SERVER[$key])) {
            $ip = trim(explode(',', (string) $_SERVER[$key])[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
    return '0.0.0.0';
}

function duitku_rate_limit(): void
{
    $key = hash('sha256', duitku_client_ip() . '|' . DUITKU_MERCHANT_CODE);
    $file = duitku_storage() . '/rl-' . substr($key, 0, 16) . '.json';
    $now = time();
    $hits = is_file($file) ? (json_decode((string) file_get_contents($file), true) ?: []) : [];
    $hits = array_values(array_filter($hits, static fn ($t) => is_int($t) && $t > $now - 600));

    if (count($hits) >= DUITKU_RATE_LIMIT) {
        duitku_fail('Terlalu banyak permintaan. Coba lagi beberapa menit.', 429);
    }

    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
}

function duitku_clean(mixed $value, int $max = 255): string
{
    if (!is_string($value)) {
        return '';
    }
    $value = strip_tags($value);
    $value = preg_replace('/[\r\n\t]+/', ' ', $value) ?? '';
    return trim(mb_substr($value, 0, $max));
}

function duitku_now(): string
{
    return date('Y-m-d H:i:s');
}

function duitku_notify_paid(array $order): void
{
    $to = filter_var(DUITKU_NOTIFY_EMAIL, FILTER_VALIDATE_EMAIL) ? DUITKU_NOTIFY_EMAIL : '';
    if ($to === '') {
        return;
    }

    $subject = 'Pembayaran Play Store — ' . ($order['orderId'] ?? '');
    $lines = [
        'Pembayaran dikonfirmasi:',
        'Order ID: ' . ($order['orderId'] ?? ''),
        'Paket: ' . ($order['packageName'] ?? ''),
        'Jumlah: Rp ' . number_format((int) ($order['amount'] ?? 0), 0, ',', '.'),
        'Nama: ' . ($order['customer']['name'] ?? ''),
        'Email: ' . ($order['customer']['email'] ?? ''),
        'WhatsApp: ' . ($order['customer']['whatsapp'] ?? ''),
        'Aplikasi: ' . ($order['appName'] ?? ''),
        'Referensi Duitku: ' . ($order['reference'] ?? ''),
    ];
    $message = implode(PHP_EOL, $lines);
    $headers = 'From: no-reply@' . parse_url(duitku_base_url(), PHP_URL_HOST) . PHP_EOL
        . 'Content-Type: text/plain; charset=UTF-8' . PHP_EOL;

    @mail($to, $subject, $message, $headers);
}
