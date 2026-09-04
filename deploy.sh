#!/usr/bin/env bash
# Deploy Cipta One ke shared hosting (DomaiNesia cPanel).
# Strategi: dist/ ikut di-push ke repo, server tinggal git pull + copy ke doc root.
# Tidak perlu npm install / npm run build di server.
#
# Workflow lokal:
#   1. Edit source code
#   2. bash deploy.sh     (atau npm run build)
#   3. git add -A && git commit -m "..." && git push
#
# Workflow di server (sekali setup):
#   cd /home/proftweb/ciptaone.site
#   bash deploy-server.sh
#
# Workflow update berikutnya (server):
#   cd /home/proftweb/ciptaone.site
#   git pull
#   bash deploy-server.sh

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO_DIR"

echo "→ npm install"
npm install --no-audit --no-fund

echo "→ npm run build"
npm run build

echo "→ copy .htaccess & .user.ini ke dist/"
cp -f public/.htaccess dist/.htaccess
cp -f public/.user.ini dist/.user.ini

echo "✓ build done. dist/ siap di-push atau di-upload."
