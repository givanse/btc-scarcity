# Name the per-person unit

## Plan
- [x] World section names the unit: "If it were split evenly" / "one person's bitcoin"
- [x] Move "adult" to a footnote; keep adults as the math denominator
- [x] Cash and Bitcoin count that unit as N×, same label
- [x] Wealth rows stop saying "shares" ("of a $2M fortune", "of a $5M fortune")
- [x] Echo the unit on the stats table
- [x] Update English and Spanish copy
- [x] Verify World, Cash, Bitcoin, and stats in the browser

## Review
World now defines the unit: remaining supply split evenly is **one person's bitcoin** (shown as 1×). Cash and Bitcoin reuse that label and show how many of those units you hold (1 BTC = 220.65×). Wealth comparisons are "of a $2M fortune" / "of a $5M fortune", so "share" is no longer doing two jobs. Adults stay in the denominator and a UBS footnote. Headless pass of `/?btc=1` in English and Spanish: no leftover "adult shares", and the stats table repeats the unit.

## Files to edit or create
- `src/i18n/en-us.json`
- `src/i18n/es-mx.json`
- `src/components/per-person/index.jsx`
- `src/components/input-fiat/index.jsx`
- `src/components/bitcoin-section/index.jsx`
- `src/components/bitcoin-stats/index.jsx`
- `src/components/the-header/index.jsx`
- `tasks/todo.md`
