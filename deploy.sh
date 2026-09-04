#!/usr/bin/env bash
# Deploy Cipta One ke shared hosting (DomaiNesia cPanel).
# Struktur di hosting:
#   /home/proftweb/ciptaone.site/        ← repo + doc root (semua di sini)
#   /home/proftweb/ciptaone.site/dist/  ← build output
#
# Workflow: git pull → install → build → flatten dist/* ke doc root.
# Usage:   bash deploy.sh

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"

cd "$REPO_DIR"

echo "→ git pull"
git pull --ff-only

echo "→ npm install"
npm install --no-audit --no-fund

echo "→ npm run build"
npm run build

echo "→ flatten dist → doc root"
# Hati-hati: hanya flatten isi dist, bukan folder dist itu sendiri.
# Backup index.html lama kalau ada.
if [ -f index.html ] && [ ! -L index.html ]; then
  cp -f index.html index.html.bak 2>/dev/null || true
fi

# Salin isi dist ke root repo (yang juga = doc root)
shopt -s dotglob nullglob
for entry in dist/* dist/.[!.]*; do
  [ -e "$entry" ] || continue
  name="$(basename "$entry")"
  # Jangan timpa file repo penting
  case "$name" in
    src|public|node_modules|.astro|.git|package.json|package-lock.json|astro.config.mjs|tailwind.config.mjs|tsconfig.json|.gitignore|README.md|deploy.sh|index.html.bak)
      continue
      ;;
  esac
  rm -rf "$name"
  cp -r "$entry" "$name"
done
shopt -u dotglob nullglob

# Bersihkan folder dist setelah flatten
rm -rf dist

echo "→ copy .htaccess & .user.ini"
[ -f public/.htaccess ] && cp -f public/.htaccess .htaccess
[ -f public/.user.ini ] && cp -f public/.user.ini .user.ini

echo "→ chmod"
[ -f index.html ] && chmod 644 index.html
[ -f .htaccess ] && chmod 644 .htaccess
[ -f .user.ini ] && chmod 644 .user.ini
[ -d assets ] && chmod 755 assets
[ -d _astro ] && chmod 755 _astro

echo "✓ deploy done"
