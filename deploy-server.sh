#!/usr/bin/env bash
# Deploy server-side: copy dist/* ke document root.
# Jalankan dari root repo (/home/proftweb/ciptaone.site).
#
# Asumsi doc root = /home/proftweb/ciptaone.site/
# Kalau doc root beda (mis. /home/proftweb/public_html/ciptaone.site/),
# edit variabel DOC_ROOT di bawah.

set -euo pipefail

DOC_ROOT="${DOC_ROOT:-/home/proftweb/ciptaone.site}"

REPO_DIR="$(pwd)"

if [ ! -d "$REPO_DIR/dist" ]; then
  echo "✗ dist/ tidak ditemukan. Jalankan 'git pull' dulu."
  exit 1
fi

echo "→ copy dist/* ke doc root: $DOC_ROOT"

# Pastikan folder ada
mkdir -p "$DOC_ROOT"

# Backup index.html lama
if [ -f "$DOC_ROOT/index.html" ] && [ ! -L "$DOC_ROOT/index.html" ]; then
  cp -f "$DOC_ROOT/index.html" "$DOC_ROOT/index.html.bak"
fi

# Hapus file lama hasil deploy (asset & astro only, bukan repo)
rm -rf "$DOC_ROOT/assets" "$DOC_ROOT/_astro"
rm -f  "$DOC_ROOT/index.html" "$DOC_ROOT/.htaccess" "$DOC_ROOT/.user.ini"

# Copy dari dist
cp -r "$REPO_DIR/dist/index.html"   "$DOC_ROOT/"
cp -r "$REPO_DIR/dist/assets"       "$DOC_ROOT/" 2>/dev/null || true
cp -r "$REPO_DIR/dist/_astro"       "$DOC_ROOT/" 2>/dev/null || true
cp -f  "$REPO_DIR/dist/.htaccess"   "$DOC_ROOT/" 2>/dev/null || true
cp -f  "$REPO_DIR/dist/.user.ini"   "$DOC_ROOT/" 2>/dev/null || true

# Permission
[ -f "$DOC_ROOT/index.html" ] && chmod 644 "$DOC_ROOT/index.html"
[ -f "$DOC_ROOT/.htaccess" ]   && chmod 644 "$DOC_ROOT/.htaccess"
[ -f "$DOC_ROOT/.user.ini" ]   && chmod 644 "$DOC_ROOT/.user.ini"
[ -d "$DOC_ROOT/assets" ]      && chmod 755 "$DOC_ROOT/assets"
[ -d "$DOC_ROOT/_astro" ]      && chmod 755 "$DOC_ROOT/_astro"

echo "✓ deployed ke $DOC_ROOT"
