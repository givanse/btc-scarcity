import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import postcssCustomMedia from 'postcss-custom-media';
import { resolve } from 'path';

export default defineConfig({
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    postcss: {
      plugins: [
        postcssCustomMedia,
        tailwindcss('./tailwind.config.js'),
      ],
    },
  },
  build: {
    copyPublicDir: true,
  },
});
