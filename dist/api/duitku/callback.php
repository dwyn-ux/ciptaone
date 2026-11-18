<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    duitku_fail('Method not allowed.', 405);
}

// Duitku sends x-www-form-urlencoded; JSON is accepted as a fallback.
$contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
if (str_contains($contentType, 'application/json')) {
    $raw = file_get_contents('php://input');
    $input = json_decode($raw === false ? '' : $raw, true);
    $input = is_array($input) ? $input : [];
} else {
    $input = $_POST;
}

$merchantCode = duitku_clean($input['merchantCode'] ?? '', 50);
$amountRaw = duitku_clean($input['amount'] ?? '', 20);
$orderId = duitku_clean($input['merchantOrderId'] ?? '', 50);
$signature = strtolower(duitku_clean($input['signature'] ?? '', 128));
$resultCode = duitku_clean($input['resultCode'] ?? '', 4);
$reference = duitku_clean($input['reference'] ?? '', 255);

if ($merchantCode === '' || $amountRaw === '' || $orderId === '' || $signature === '') {
    duitku_log('callback rejected: missing parameters');
    duitku_fail('Bad parameter.', 400);
}

if (!hash_equals(duitku_sign_callback($amountRaw, $orderId), $signature)) {
    duitku_log('callback rejected: bad signature ' . $orderId);
    duitku_fail('Bad signature.', 403);
}

if (!hash_equals(DUITKU_MERCHANT_CODE, $merchantCode)) {
    duitku_log('callback rejected: merchant mismatch ' . $merchantCode);
    duitku_fail('Bad merchant.', 403);
}

$order = duitku_read_order($orderId);
if ($order === null) {
    duitku_log('callback: unknown order ' . $orderId);
    duitku_fail('Unknown order.', 404);
}

if ((int) $amountRaw !== (int) $order['amount']) {
    duitku_log('callback: amount mismatch ' . $orderId);
    duitku_fail('Amount mismatch.', 400);
}

if ($order['status'] === 'paid') {
    // Idempotent: Duitku may resend callbacks. Always answer 200.
    duitku_json(['ok' => true, 'status' => 'paid']);
}

$order['status'] = $resultCode === '00' ? 'paid' : 'failed';
$order['reference'] = $reference !== '' ? $reference : (string) ($order['reference'] ?? '');
$order['updatedAt'] = duitku_now();
$order['paidAt'] = $order['status'] === 'paid' ? $order['updatedAt'] : null;
$order['callback'] = [
    'resultCode' => $resultCode,
    'paymentCode' => duitku_clean($input['paymentCode'] ?? '', 4),
    'settlementDate' => duitku_clean($input['settlementDate'] ?? '', 20),
    'reference' => $reference,
];
duitku_write_order($orderId, $order);

duitku_log('callback ' . $orderId . ' -> ' . $order['status'] . ' (' . $resultCode . ')');

if ($order['status'] === 'paid') {
    duitku_notify_paid($order);
}

duitku_json(['ok' => true, 'status' => $order['status']]);
