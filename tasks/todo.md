# Long-cache hashed assets

## Plan
- [x] Add `Cache-Control: public, max-age=31536000, immutable` for `/assets/*`
- [x] Keep existing CSS/JS `Content-Type` header rules
- [x] Comment why immutable is safe (Vite content hashes)

## Review
Vite already fingerprints files under `/assets/`. Netlify now sends `Cache-Control: public, max-age=31536000, immutable` for that path so browsers and the CDN can keep JS, CSS, and hashed fonts for a year. Content-Type rules for `*.css` / `*.js` are unchanged. Takes effect on the next deploy; confirm in response headers on `/assets/index-*.js`.

## Files to edit or create
- `netlify.toml`
- `tasks/todo.md`
