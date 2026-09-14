module.exports = {
  // Drop unused utilities from the production CSS. Off unless NODE_ENV=production
  // (vite build). Scan templates only; @apply in CSS is inlined before purge.
  // `layers` mode purges @tailwind base/utilities only (not custom CSS).
  purge: {
    mode: 'layers',
    content: [
      './index.html',
      './src/**/*.jsx',
      './src/**/*.js',
    ],
  },
  theme: {
    extend: {
      colors: {
        // Official Bitcoin orange — keep saturated; the only loud accent
        'btc-orange': '#f79319',
        // Muted steel for the world/person section (was bright blue)
        'world': '#3f6482',
        // Muted sage for cash (was kelly green)
        'money': '#4d8654',
        // Dusty purple for the wealth/supply section (was Tailwind purple-600)
        'supply': '#6e4f80',
        // Softer steel for generic links on black
        'link': '#8a9bb0',
        // Dusty matte black for the page
        'matte': '#1c1a16',
      }
    },
  },
  variants: {},
  plugins: []
}
