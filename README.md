# Cipta One — ciptaone.site

Editorial portfolio for **Cipta One**. Astro + TypeScript + Tailwind, no JS framework runtime, SVG-only visuals.

## Stack

- Astro 4
- TypeScript
- Tailwind CSS (layout/spacing) + custom CSS (animation, orbital, cursor)
- Vanilla TS for animation logic (IntersectionObserver, requestAnimationFrame)
- Inline SVG assets (no stock images, no WebGL)

## Local dev

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # ./dist (static output)
npm run preview
```

## Deploy (shared hosting — DomaiNesia cPanel)

**Strategi: `dist/` ikut di-push ke repo. Server tidak perlu Node.js.**

### Setup sekali (server)

```bash
cd /home/proftweb
rm -rf ciptaone.site
git clone https://github.com/dwyn-ux/ciptaone.git ciptaone.site
cd ciptaone.site
chmod +x deploy-server.sh
bash deploy-server.sh
```

`deploy-server.sh` copy `dist/index.html`, `assets/`, `_astro/`, `.htaccess`, `.user.ini` ke doc root. Set permission 644/755.

### Update berikutnya (server)

```bash
cd /home/proftweb/ciptaone.site
git pull
bash deploy-server.sh
```

### Update dari lokal

```bash
cd ciptaone-site
npm run build
git add -A && git commit -m "update content"
git push
```

Server cukup `git pull` + `bash deploy-server.sh`.

### Kalau doc root bukan `/home/proftweb/ciptaone.site/`

```bash
DOC_ROOT=/home/proftweb/public_html/ciptaone.site bash deploy-server.sh
```

Atau edit `DOC_ROOT` default di dalam `deploy-server.sh`.

### Document Root di cPanel

`Domains` → `ciptaone.site` → **Manage** → **Document Root** = `/home/proftweb/ciptaone.site/` (atau path custom yang lo pakai).

## Accessibility / motion

- `prefers-reduced-motion` short-circuits every animation, cursor, tilt, and orbital motion.
- Custom cursor disabled on coarse-pointer / touch / reduced-motion devices.
- Skip-to-content link, semantic landmarks, visible `:focus-visible` outlines.
- Project interactions never gate content; hover-only styling is decorative.
