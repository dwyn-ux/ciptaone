# AGENTS.md

Project-specific rules for AI coding agents working on this repository.

## Deploy is MANUAL — never assume auto-deploy

This site uses a **manual two-step deploy** via shared hosting (cPanel).
There is no Vercel/Netlify auto-deploy. Pushing to GitHub does NOT update
the live site.

### Mandatory deploy workflow after any source change

1. **Build locally**:
   ```bash
   bash deploy.sh
   ```
   This runs `npm install`, `npm run build`, copies `.htaccess` / `.user.ini`
   into `dist/`. `dist/` is the artifact that actually ships.

2. **Commit and push BOTH source and dist**:
   ```bash
   git add -A
   git commit -m "..."
   git push
   ```
   - The `src/`, `public/`, `astro.config.mjs`, etc. are tracked.
   - The built `dist/` is ALSO tracked and shipped to the server.
   - Astro copies `public/assets/*` into `dist/assets/*` at build time.
   - If you changed anything under `public/` (favicon, logo, OG images,
     static assets), `dist/` must be rebuilt — pushing source alone will
     leave the live site serving the old assets.

3. **Server pulls and copies**:
   ```bash
   cd /home/proftweb/ciptaone.site
   git pull
   bash deploy-server.sh
   ```
   This step happens on the server, not in this repo.

### Failure mode to avoid

After editing only `src/` and pushing, you may see "nothing changed" on
the live site — `dist/` is stale. Always rebuild before push.

## Tech stack

- Astro (static site)
- Tailwind CSS
- Vanilla CSS for custom styles in `src/styles/` and component `<style>` blocks
- Custom cursor, scroll progress, theme toggle as components
- Domain: https://ciptaone.com

## Asset rules

- Logo / favicon source: `public/assets/logo.svg` (white version).
- Do NOT add PNG fallbacks unless asked — SVG favicon is sufficient for
  modern browsers.
- When renaming or replacing assets, update all references in:
  `src/layouts/Layout.astro` (favicon link), component `<img>` tags,
  and rebuild `dist/`.