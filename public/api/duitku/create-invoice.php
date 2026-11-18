<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    duitku_fail('Method not allowed.', 405);
}

if (!duitku_configured()) {
    duitku_fail('Pembayaran belum dikonfigurasi. Hubungi kami via WhatsApp.', 503);
}

duitku_rate_limit();

$raw = file_get_contents('php://input');
$input = json_decode($raw === false ? '' : $raw, true);
if (!is_array($input)) {
    duitku_fail('Format permintaan tidak valid.');
}

$packages = duitku_packages();
$packageId = duitku_clean($input['package'] ?? '', 20);
if (!isset($packages[$packageId])) {
    duitku_fail('Paket tidak dikenal.');
}

$amount = (int) $packages[$packageId]['price'];

$method = strtoupper(duitku_clean($input['paymentMethod'] ?? '', 4));
if ($method === '') {
    $method = strtoupper(DUITKU_DEFAULT_PAYMENT_METHOD);
}
if (!preg_match('/^[A-Z0-9]{2}$/', $method)) {
    duitku_fail('Metode pembayaran tidak valid.');
}

$name = duitku_clean($input['name'] ?? '', 80);
$email = duitku_clean($input['email'] ?? '', 120);
$whatsappRaw = duitku_clean($input['whatsapp'] ?? '', 20);
$appName = duitku_clean($input['appName'] ?? '', 100);
$category = duitku_clean($input['category'] ?? '', 30);
$notes = duitku_clean($input['notes'] ?? '', 1000);

$digits = preg_replace('/\D+/', '', $whatsappRaw) ?? '';
if (str_starts_with($digits, '0')) {
    $digits = '62' . substr($digits, 1);
}
if (str_starts_with($digits, '8')) {
    $digits = '62' . $digits;
}

$categories = ['education', 'business', 'utility', 'health', 'entertainment', 'other'];

if (mb_strlen($name) < 2) duitku_fail('Nama lengkap wajib diisi.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) duitku_fail('Email tidak valid.');
if (strlen($digits) < 8 || strlen($digits) > 15) duitku_fail('Nomor WhatsApp tidak valid.');
if (mb_strlen($appName) < 2) duitku_fail('Nama aplikasi wajib diisi.');
if (!in_array($category, $categories, true)) duitku_fail('Kategori aplikasi tidak valid.');

$orderId = 'C1-' . date('Ymd') . '-' . strtoupper(bin2hex(random_bytes(3)));
$now = duitku_now();

$nameParts = preg_split('/\s+/', $name) ?: [$name];
$firstName = array_shift($nameParts) ?: $name;
$lastName = implode(' ', $nameParts) ?: '-';
$address = [
    'firstName' => mb_substr($firstName, 0, 50),
    'lastName' => mb_substr($lastName, 0, 50),
    'address' => '-',
    'city' => 'Jakarta',
    'postalCode' => '00000',
    'phone' => $digits,
    'countryCode' => 'ID',
];

$order = [
    'orderId' => $orderId,
    'package' => $packageId,
    'packageName' => $packages[$packageId]['name'],
    'amount' => $amount,
    'appName' => $appName,
    'category' => $category,
    'customer' => [
        'name' => $name,
        'email' => $email,
        'whatsapp' => $digits,
    ],
    'notes' => $notes,
    'paymentMethod' => $method,
    'status' => 'pending',
    'reference' => '',
    'createdAt' => $now,
    'updatedAt' => $now,
    'paidAt' => null,
    'callback' => null,
];

if (!duitku_write_order($orderId, $order)) {
    duitku_log('cannot write order ' . $orderId);
    duitku_fail('Penyimpanan pesanan gagal. Hubungi kami via WhatsApp.', 500);
}

$base = duitku_base_url();
$payload = [
    'merchantCode' => DUITKU_MERCHANT_CODE,
    'paymentAmount' => $amount,
    'paymentMethod' => $method,
    'merchantOrderId' => $orderId,
    'productDetails' => 'Jasa Rilis Play Store - Paket ' . $packages[$packageId]['name'],
    'additionalParam' => '',
    'merchantUserInfo' => $email,
    'customerVaName' => mb_substr($name, 0, 20),
    'email' => $email,
    'phoneNumber' => $digits,
    'itemDetails' => [[
        'name' => 'Paket ' . $packages[$packageId]['name'] . ' - Rilis Play Store',
        'price' => $amount,
        'quantity' => 1,
    ]],
    'customerDetail' => [
        'firstName' => $address['firstName'],
        'lastName' => $address['lastName'],
        'email' => $email,
        'phoneNumber' => $digits,
        'billingAddress' => $address,
        'shippingAddress' => $address,
    ],
    'callbackUrl' => $base . '/api/duitku/callback.php',
    'returnUrl' => $base . '/rilis-aplikasi/status',
    'signature' => duitku_sign_inquiry($orderId, $amount),
    'expiryPeriod' => DUITKU_EXPIRY_MINUTES,
];

[$code, $body, $error] = duitku_post(duitku_api_url('/v2/inquiry'), (string) json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

if ($error !== '' || $code !== 200) {
    $order['status'] = 'error';
    $order['updatedAt'] = duitku_now();
    duitku_write_order($orderId, $order);
    duitku_log('inquiry failed ' . $orderId . ': HTTP ' . $code . ' ' . $error . ' ' . mb_substr($body, 0, 400));
    duitku_fail('Duitku belum bisa membuat pembayaran. Coba metode lain atau hubungi kami via WhatsApp.', 502);
}

$result = json_decode($body, true);
$paymentUrl = (string) ($result['paymentUrl'] ?? '');
if (($result['statusCode'] ?? null) !== '00' || !str_starts_with($paymentUrl, 'http')) {
    $order['status'] = 'error';
    $order['updatedAt'] = duitku_now();
    duitku_write_order($orderId, $order);
    duitku_log('inquiry rejected ' . $orderId . ': ' . mb_substr($body, 0, 400));
    duitku_fail('Pembayaran ditolak Duitku: ' . duitku_clean($result['statusMessage'] ?? 'metode tidak tersedia', 120), 502);
}

$order['reference'] = duitku_clean($result['reference'] ?? '', 255);
$order['updatedAt'] = duitku_now();
duitku_write_order($orderId, $order);
duitku_log('invoice created ' . $orderId . ' ' . $amount . ' ' . $method);

duitku_json([
    'ok' => true,
    'orderId' => $orderId,
    'paymentUrl' => $paymentUrl,
    'amount' => $amount,
]);
