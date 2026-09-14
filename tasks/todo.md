# 404 scanner probe paths

## Plan
- [x] Remove the `/*` → `/index.html` 200 SPA rewrite so unknown paths are not counted as visits
- [x] Add a tiny `public/404.html` for Netlify's default missing-file response
- [x] Keep comments in `netlify.toml` (update, do not delete): routing is query-string only; scanners must 404
- [x] Confirm real URLs still work: `/`, `/?btc=`, `/assets/*`, `/robots.txt`, `/api/btc-usd`
- [x] Confirm probe paths 404: `/wp-admin/`, `/.git/config`, `/blog/`, `/wp/`, `/wp-login.php`, `/wordpress/`, `/wp-json/batch/v1`

## Review
Scanner "top pages" were 200s because `/*` rewrote to `index.html`. The app only uses query-string state, so that rewrite was unused.

- Removed the SPA 200 rewrite in `netlify.toml` (comments kept and updated)
- Added `public/404.html` ("Not found"); Vite copies it to `dist/`
- Local smoke test against `dist` (Netlify-style: file exists → 200, else 404 page):
  - 200 APP `/` and `/?btc=1&fiat=100`
  - 200 `/robots.txt`, `/manifest.json`
  - 404 404-PAGE `/wp-admin/index.php`, `/.git/config`, `/blog/`, `/wp/`, `/wp-login.php`, `/wordpress/`, `/wp-json/batch/v1`
- `/api/btc-usd` is unchanged (function path, not the catch-all)
- After deploy, those paths should drop off Netlify "top pages" as new traffic replaces the old 200s

## Files to edit or create
- `netlify.toml`
- `public/404.html` (create)
- `tasks/todo.md`
