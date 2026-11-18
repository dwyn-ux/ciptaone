<?php
declare(strict_types=1);

/**
 * Duitku configuration.
 *
 * DO NOT put real credentials in this file — it is committed to Git.
 * On the server, create api/duitku/config.local.php (never committed) with:
 *
 *   <?php
 *   define('DUITKU_MERCHANT_CODE', 'D12345');
 *   define('DUITKU_API_KEY', 'your-api-key');
 *   define('DUITKU_ENV', 'sandbox'); // 'production' when live
 *
 * See docs/DUITKU.md for the full setup guide.
 */

$duitkuLocalConfig = __DIR__ . '/config.local.php';
if (is_file($duitkuLocalConfig)) {
    require $duitkuLocalConfig;
}

if (!defined('DUITKU_MERCHANT_CODE')) define('DUITKU_MERCHANT_CODE', 'DXXXX');
if (!defined('DUITKU_API_KEY')) define('DUITKU_API_KEY', 'REPLACE_WITH_DUITKU_API_KEY');
if (!defined('DUITKU_ENV')) define('DUITKU_ENV', 'sandbox');
if (!defined('DUITKU_DEFAULT_PAYMENT_METHOD')) define('DUITKU_DEFAULT_PAYMENT_METHOD', 'BC');
if (!defined('DUITKU_EXPIRY_MINUTES')) define('DUITKU_EXPIRY_MINUTES', 60);
if (!defined('DUITKU_STORAGE_DIR')) define('DUITKU_STORAGE_DIR', __DIR__ . '/storage');
if (!defined('DUITKU_NOTIFY_EMAIL')) define('DUITKU_NOTIFY_EMAIL', 'hello@ciptaone.site');
if (!defined('DUITKU_BASE_URL')) define('DUITKU_BASE_URL', '');
if (!defined('DUITKU_RATE_LIMIT')) define('DUITKU_RATE_LIMIT', 8);
