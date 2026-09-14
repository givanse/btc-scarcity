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
        'btc-orange': '#f79319',
        'money': '#188839',
      }
    },
  },
  variants: {},
  plugins: []
}
