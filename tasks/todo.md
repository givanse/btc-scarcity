# Mute the beach-ball palette

## Plan
- [x] Keep the pyramid taupe fills and official Bitcoin orange
- [x] Replace bright blue / kelly green with muted steel and sage
- [x] Keep purple for the wealth section, but dusty instead of neon
- [x] Soften leftover toy blues/greens (links, sliders, price, locale focus)
- [x] Verify the header and each section in the browser

## Review
The sticky header and section bars were four saturated primaries (bright blue, kelly green, bitcoin orange, neon purple). Orange stays `#f79319`. World/person is muted steel `#4a5c70`. Cash is muted sage `#5c7a60`. Wealth/supply is dusty purple `#6e4f80` (nudged more purple from `#5a4e6e`). Generic links, slider tracks, live price text, and locale-button focus follow the same muted set. The pyramid fills were left alone. Browser check of the full page: orange is the only loud color, purple still reads as purple, and the toy/beach-ball feel is gone.

## Files to edit or create
- `tailwind.config.js`
- `src/style/index.css`
- `src/components/the-header/index.jsx`
- `src/components/per-person/index.jsx`
- `src/components/supply-section/index.jsx`
- `src/components/the-form/style.module.css`
- `src/components/arr-slider/style.module.css`
- `tasks/todo.md`
