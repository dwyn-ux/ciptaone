<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    duitku_fail('Method not allowed.', 405);
}

if (!duitku_configured()) {
    duitku_fail('Pembayaran belum dikonfigurasi.', 503);
}

$amount = filter_input(INPUT_GET, 'amount', FILTER_VALIDATE_INT);
if ($amount === false || $amount < 1000 || $amount > 100000000) {
    duitku_fail('Nominal tidak valid.');
}

$datetime = date('Y-m-d H:i:s');
$payload = json_encode([
    'merchantcode' => DUITKU_MERCHANT_CODE,
    'amount' => $amount,
    'datetime' => $datetime,
    'signature' => duitku_sign_payment_methods((string) $amount, $datetime),
], JSON_UNESCAPED_SLASHES);

[$code, $body, $error] = duitku_post(duitku_api_url('/paymentmethod/getpaymentmethod'), (string) $payload);

if ($error !== '' || $code !== 200) {
    duitku_log('methods failed: HTTP ' . $code . ' ' . $error . ' ' . mb_substr($body, 0, 300));
    duitku_json(['ok' => false, 'error' => 'Metode pembayaran tidak tersedia.'], 502);
}

$response = json_decode($body, true);
$fees = is_array($response['paymentFee'] ?? null) ? $response['paymentFee'] : [];

$methods = [];
foreach ($fees as $fee) {
    if (!is_array($fee)) {
        continue;
    }
    $method = duitku_clean($fee['paymentMethod'] ?? '', 4);
    if ($method === '') {
        continue;
    }
    $methods[] = [
        'code' => $method,
        'name' => duitku_clean($fee['paymentName'] ?? $method, 80),
        'fee' => duitku_clean($fee['totalFee'] ?? '0', 20),
        'image' => duitku_clean($fee['paymentImage'] ?? '', 255),
    ];
}

duitku_json(['ok' => true, 'methods' => $methods]);
