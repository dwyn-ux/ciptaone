<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    duitku_fail('Method not allowed.', 405);
}

$orderId = duitku_clean($_GET['order'] ?? '', 50);
$order = duitku_read_order($orderId);

if ($order === null) {
    duitku_json(['ok' => true, 'status' => 'not_found']);
}

// Safety net if a callback was missed: verify with Duitku, at most once
// every 2 minutes so we never hammer their rate-limited endpoint.
if ($order['status'] === 'pending' && duitku_configured()) {
    $lastCheck = strtotime((string) ($order['lastCheckedAt'] ?? '1970-01-01 00:00:00')) ?: 0;
    if (time() - $lastCheck > 120) {
        $order['lastCheckedAt'] = duitku_now();
        duitku_write_order($orderId, $order);

        $payload = json_encode([
            'merchantCode' => DUITKU_MERCHANT_CODE,
            'merchantOrderId' => $orderId,
            'signature' => duitku_sign_status($orderId),
        ], JSON_UNESCAPED_SLASHES);

        [$code, $body] = duitku_post(duitku_api_url('/transactionStatus'), (string) $payload);
        if ($code === 200) {
            $result = json_decode($body, true);
            $statusCode = (string) ($result['statusCode'] ?? '');
            if ($statusCode === '00') {
                $order['status'] = 'paid';
                $order['paidAt'] = duitku_now();
                $order['reference'] = duitku_clean($result['reference'] ?? $order['reference'] ?? '', 255);
                duitku_write_order($orderId, $order);
                duitku_notify_paid($order);
                duitku_log('verified paid ' . $orderId);
            } elseif ($statusCode === '02') {
                $order['status'] = 'failed';
                $order['updatedAt'] = duitku_now();
                duitku_write_order($orderId, $order);
                duitku_log('verified expired ' . $orderId);
            }
        }
    }
}

duitku_json([
    'ok' => true,
    'status' => $order['status'],
    'orderId' => $order['orderId'],
    'reference' => $order['reference'] ?? '',
    'packageName' => $order['packageName'] ?? '',
    'amount' => (int) $order['amount'],
    'appName' => $order['appName'] ?? '',
    'paidAt' => $order['paidAt'] ?? null,
]);
