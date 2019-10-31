import tailwindcss from 'tailwindcss';
import postcssCustomMedia from 'postcss-custom-media';

export default function(config, env, helpers) {

  const results = helpers.getLoadersByName(config, 'postcss-loader');
  for (const result of results) {
    result.loader.options.plugins = [
      postcssCustomMedia,
      tailwindcss('./tailwind.config.js'),
      ...result.loader.options.plugins
    ];
  }

  return config;
};
