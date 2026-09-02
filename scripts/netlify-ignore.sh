#!/usr/bin/env bash
# Production path ignore. Exit 0 = skip the build; anything else = build.
# Fail open: missing refs, equal refs (empty cache), or git errors continue the build.
# Do not use `exit 0` here. Ship with `netlify deploy --prod` or a build hook.
# Build hooks skip this command. Squash-merge with [skip netlify] unless shipping.

if [ -z "${CACHED_COMMIT_REF:-}" ] || [ -z "${COMMIT_REF:-}" ] || [ "$CACHED_COMMIT_REF" = "$COMMIT_REF" ]; then
  exit 1
fi

# Ignore runs from the site base directory. Honor NETLIFY_REPO_PATH / git root
# so pathspecs resolve from the repo when a base directory is set.
root="${NETLIFY_REPO_PATH:-}"
if [ -z "$root" ] || [ ! -d "$root" ]; then
  root="$(git rev-parse --show-toplevel 2>/dev/null)" || exit 1
fi
cd "$root" || exit 1

# Skip only when site inputs are unchanged. README, tests, netlify.toml, and
# this script do not ship — so landing ignore does not spend a production deploy.
git diff --quiet "$CACHED_COMMIT_REF" "$COMMIT_REF" -- \
  src functions public index.html \
  package.json package-lock.json \
  vite.config.js tailwind.config.js \
  .babelrc .nvmrc .npmrc \
  || exit 1
