# Duitku payment setup — Jasa Rilis Play Store

Halaman layanan: `/rilis-aplikasi` · Status pembayaran: `/rilis-aplikasi/status`

## Alur singkat

1. Pengunjung pilih paket & metode pembayaran di `/rilis-aplikasi#checkout`.
2. Browser POST JSON ke `/api/duitku/create-invoice.php`.
3. PHP bikin order ID (`C1-YYYYMMDD-XXXXXX`), simpan data order, lalu panggil **Duitku v2 inquiry** (`POST /webapi/api/merchant/v2/inquiry`).
4. Browser diarahkan ke `paymentUrl` Duitku.
5. Setelah bayar, Duitku kirim **callback** `POST /api/duitku/callback.php` (form-urlencoded) dan mengarahkan user ke `/rilis-aplikasi/status`.
6. Halaman status menanyakan `/api/duitku/status.php?order=...`. Kalau callback terlewat, `status.php` otomatis fallback ke **check transaction** Duitku (maks. sekali per 2 menit).

Semua perhitungan harga ada di server. Browser hanya mengirim ID paket — tidak bisa mengubah nominal.

## Endpoint

| File | Method | Fungsi |
| --- | --- | --- |
| `api/duitku/methods.php?amount=...` | GET | Proxy daftar metode pembayaran aktif dari Duitku |
| `api/duitku/create-invoice.php` | POST | Buat order + invoice, kembalikan `paymentUrl` |
| `api/duitku/callback.php` | POST | Verifikasi signature, update status order, kirim email notifikasi |
| `api/duitku/status.php?order=...` | GET | Status order untuk halaman return |

## Setup di cPanel (sekali)

### 1. Akun Duitku

- Daftar / login ke dashboard Duitku, buat **Project**.
- Ambil **Merchant Code** dan **API Key** project tersebut.
- Di menu project, aktifkan channel yang mau dipakai (VA, QRIS, e-wallet, kartu). Daftar ini yang akan tampil di checkout lewat `methods.php`.
- Catat **Callback URL**: `https://ciptaone.com/api/duitku/callback.php`
- Catat **Return URL**: `https://ciptaone.com/rilis-aplikasi/status`
  (URL ini juga dikirim otomatis dari `create-invoice.php`, tapi tetap daftarkan di dashboard kalau ada kolomnya.)

### 2. Kredensial (JANGAN di-commit)

Buat file `api/duitku/config.local.php` **langsung di server**, di document root:

```php
<?php
define('DUITKU_MERCHANT_CODE', 'D12345');
define('DUITKU_API_KEY', 'kunci-api-dari-dashboard');
define('DUITKU_ENV', 'sandbox'); // ganti ke 'production' saat go live
```

Opsi lain yang bisa ditimpa di file yang sama:

```php
define('DUITKU_DEFAULT_PAYMENT_METHOD', 'BC'); // dipakai kalau methods.php gagal
define('DUITKU_EXPIRY_MINUTES', 60);
define('DUITKU_STORAGE_DIR', '/home/proftweb/duitku-orders'); // disarankan di luar doc root
define('DUITKU_NOTIFY_EMAIL', 'hello@ciptaone.site');
define('DUITKU_BASE_URL', 'https://ciptaone.com'); // paksa base URL callback/return
define('DUITKU_RATE_LIMIT', 8); // maks. 8 request create per IP per 10 menit
```

File `config.local.php` sudah masuk `.gitignore`, dan `deploy-server.sh` sengaja **tidak menimpa / menghapus** file ini.

### 3. Deploy

```bash
bash deploy.sh          # lokal: npm install + build + copy .htaccess
git add -A && git commit -m "layanan rilis playstore + duitku" && git push
```

Di server:

```bash
cd /home/proftweb/ciptaone.site
git pull
bash deploy-server.sh
bash deploy-server.sh   # hanya kalau config.local.php belum ada & mau dibuat dulu
```

`deploy-server.sh` menyalin `dist/api/**/*.php` dan `storage/.htaccess`, tapi membiarkan `config.local.php` dan file order yang sudah ada tetap utuh.

### 4. Kebutuhan server

- PHP 8.1+ dengan ekstensi **cURL** aktif (di cPanel: *Select PHP Version → Extensions → curl*).
- HTTPS aktif — Duitku production menolak callback `http://`.
- Folder `api/duitku/storage/` harus writable oleh user hosting. Kalau dipindah ke luar doc root lewat `DUITKU_STORAGE_DIR`, pastikan folder itu ada & writable (0700).
- Shell `mail()` jalan kalau mau notifikasi email. Kalau tidak, order tetap tercatat; informasikan tim lewat WhatsApp manual.

## Signature (v2, HMAC-SHA256)

| Request | String yang di-sign |
| --- | --- |
| Inquiry | `merchantCode + merchantOrderId + paymentAmount` |
| Payment method | `merchantcode + amount + datetime` |
| Callback | `merchantCode + amount + merchantOrderId` |
| Check status | `merchantCode + merchantOrderId` |

Semua pakai `hash_hmac('sha256', ..., apiKey)` hex lowercase, diverifikasi dengan `hash_equals()`. Callback juga mencocokkan `merchantCode` dan nominal dengan order di database lokal.

## Testing sandbox

1. Set `DUITKU_ENV = 'sandbox'`.
2. Buka `/rilis-aplikasi#checkout`, pilih paket, isi form, lanjut ke Duitku.
3. Bayar memakai VA sandbox / kartu uji:
   - Visa `4000 0000 0000 0044`, exp `03/33`, CVV `123`
   - Mastercard `5500 0000 0000 0004`, exp `03/33`, CVV `123`
4. Cek `api/duitku/storage/` → muncul file `C1-....json` dengan `status: paid` setelah callback.
5. Cek halaman `/rilis-aplikasi/status?order=C1-...`.

Kalau callback tidak masuk saat sandbox dijalankan dari lokal (tidak bisa diakses publik), pakai ngrok/URL publik untuk `callbackUrl`, atau verifikasi manual lewat tombol cek ulang.

## Go live

1. Ganti `DUITKU_ENV` di `config.local.php` jadi `'production'`.
2. Pastikan Merchant Code & API Key production (bedanya dengan sandbox).
3. Pastikan callback URL boleh diakses tanpa redirect `www → non-www` yang merusak POST (redirect sudah ada di `.htaccess`, tapi Duitku mengikuti redirect 301 untuk POST tergantung perilaku — sebaiknya daftarkan hostname final langsung).
4. Uji satu transaksi kecil sebelum membuka promosi.

## Ganti harga / paket

Harga harus sama di dua tempat:

- `src/data/playstore.ts` → `packages[].price` (tampilan)
- `public/api/duitku/bootstrap.php` → `duitku_packages()` (validasi server)

Kalau beda, checkout akan menolak dengan “Paket tidak dikenal” atau nominal tampilan tidak cocok.

## Troubleshooting

| Gejala | Penyebab & solusi |
| --- | --- |
| `Pembayaran belum dikonfigurasi` | `config.local.php` belum ada / nama konstanta salah. |
| `Metode pembayaran tidak tersedia` | cURL mati, API key salah, atau project sandbox belum punya channel aktif. Cek `storage/activity.log`. |
| Status tetap `pending` | Callback belum sampai (server lokal / firewall). Tunggu 2 menit, `status.php` akan verifikasi ke Duitku. |
| `Bad signature` | API key di `config.local.php` bukan milik merchant code yang sama. |
| File JSON tidak muncul | `storage/` tidak writable. Cek permission 0700 / chown ke user cPanel. |
| 404 di `/api/duitku/...` | `deploy-server.sh` belum menyalin `dist/api`, atau rewrite `.htaccess` belum aktif. |
