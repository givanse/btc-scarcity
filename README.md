# btc-scarcity

https://bitcoin.givan.se/?btc=0.0025&fiat=20&loc=en

## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload
npm start

# build for production with minification
npm run build

# test the production build locally
npm run preview

# run tests with jest
npm test

# run the backend (Netlify functions + frontend)
npm install -g netlify-cli
npm run lambda

# production ship (https://btc.gratis) — CLI only, not the dashboard
npm run deploy
```

Vite + Preact SPA with a Netlify Function that proxies BTC/USD from CoinGecko.

## Deliberate Netlify deploys (https://btc.gratis)

This Netlify account shares **300 credits/month** (~15 per production deploy). Production is **explicit only** — CLI, not the dashboard. `skip_prs` is already true. Keep `stop_builds` **false** (it would block CLI/`netlify deploy --prod` too).

**How to ship**

1. `npm run deploy` (`netlify deploy --prod` after `vite build`).
2. A **build hook** (bypasses ignore).

Squash-merge with `[skip netlify]` in the commit message unless that merge **is** the ship. Do not use dashboard Trigger deploy.

`[build] ignore` is a path safety net if a git-triggered production build still runs: skip when site inputs (`src/`, `functions/`, `public/`, lockfile, Vite/Tailwind) are unchanged. README, tests, and `netlify.toml` do not auto-deploy. Missing or equal `CACHED_COMMIT_REF`/`COMMIT_REF` (empty cache) **fails open** and builds. Production is **not** `ignore = "exit 0"`.

Deploy Previews use `ignore = "exit 0"`. Landing this ignore does not require a production deploy.
