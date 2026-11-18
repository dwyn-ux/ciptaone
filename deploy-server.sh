#!/usr/bin/env bash
# Deploy server-side: copy seluruh dist/* ke document root.
# Jalankan dari root repo (/home/proftweb/ciptaone.site).
#
# Asumsi doc root = /home/proftweb/ciptaone.site/
# Kalau doc root beda (mis. /home/proftweb/public_html/ciptaone.site/),
# edit variabel DOC_ROOT di bawah.
#
# Catatan: file khusus server TIDAK ditimpa:
#   api/duitku/config.local.php  -> kredensial Duitku
#   api/duitku/storage/*.json    -> data order
#   api/duitku/storage/*.log     -> log aktivitas

set -euo pipefail

DOC_ROOT="${DOC_ROOT:-/home/proftweb/ciptaone.site}"

REPO_DIR="$(pwd)"

if [ ! -d "$REPO_DIR/dist" ]; then
  echo "✗ dist/ tidak ditemukan. Jalankan 'git pull' dulu."
  exit 1
fi

echo "→ copy dist/* ke doc root: $DOC_ROOT"

mkdir -p "$DOC_ROOT"

# Backup index.html lama
if [ -f "$DOC_ROOT/index.html" ] && [ ! -L "$DOC_ROOT/index.html" ]; then
  cp -f "$DOC_ROOT/index.html" "$DOC_ROOT/index.html.bak"
fi

# Hapus asset lama hasil build (folder static saja)
rm -rf "$DOC_ROOT/assets" "$DOC_ROOT/_astro"

# Copy seluruh isi dist: index.html, halaman layanan, assets, _astro,
# .htaccess, .user.ini, dan endpoint PHP Duitku.
tar -C "$REPO_DIR/dist" \
  --exclude='./api/duitku/config.local.php' \
  --exclude='./api/duitku/storage/*.json' \
  --exclude='./api/duitku/storage/*.log' \
  -cf - . | tar -C "$DOC_ROOT" -xf -

# Permission
[ -f "$DOC_ROOT/index.html" ] && chmod 644 "$DOC_ROOT/index.html"
[ -f "$DOC_ROOT/.htaccess" ]   && chmod 644 "$DOC_ROOT/.htaccess"
[ -f "$DOC_ROOT/.user.ini" ]   && chmod 644 "$DOC_ROOT/.user.ini"
[ -d "$DOC_ROOT/assets" ]      && chmod 755 "$DOC_ROOT/assets"
[ -d "$DOC_ROOT/_astro" ]      && chmod 755 "$DOC_ROOT/_astro"
[ -d "$DOC_ROOT/api/duitku" ]  && chmod 755 "$DOC_ROOT/api/duitku"

# Folder order: pastikan ada, tertutup dari web, dan writable
mkdir -p "$DOC_ROOT/api/duitku/storage"
chmod 700 "$DOC_ROOT/api/duitku/storage"
[ -f "$DOC_ROOT/api/duitku/storage/.htaccess" ] && chmod 644 "$DOC_ROOT/api/duitku/storage/.htaccess"

echo "✓ deployed ke $DOC_ROOT"
