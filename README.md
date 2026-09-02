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
```

Vite + Preact SPA with a Netlify Function that proxies BTC/USD from CoinGecko.

## Deliberate Netlify deploys (https://btc.gratis)

This Netlify account shares **300 credits/month** (~15 per production deploy). Production is **explicit only** — do not auto-ship every `master` push.

**How to ship**

1. Netlify UI → Deploys → **Trigger deploy** (bypasses ignore).
2. A **build hook** (also bypasses ignore).

`[build] ignore` is a path safety net if auto-prod is still on: git-triggered production builds skip when site inputs (`src/`, `functions/`, `public/`, lockfile, Vite/Tailwind) are unchanged. README, tests, and `netlify.toml` do not auto-deploy (Trigger deploy for config-only changes, and so landing ignore does not spend credits). Missing or equal `CACHED_COMMIT_REF`/`COMMIT_REF` (UI retry, empty cache) **fails open** and builds. Production is **not** `ignore = "exit 0"` — that always-skips Trigger deploy in the UI.

Deploy Previews use `ignore = "exit 0"`. `skip_prs` is already true in the Netlify UI.

Do **not** set `stop_builds` (that blocks manual deploys too). Merging ignore config does **not** require a production deploy; the next git-triggered build reads `netlify.toml` from that commit.

**Leftover UI clicks** (this repo cannot toggle them):

- Confirm **Stop builds** stays off.
- Turn off automatic production-branch builds if they are still on (true explicit-only).
- Disable branch deploys if any are enabled.
- Leave the UI Ignore builds command empty so this file owns it.
