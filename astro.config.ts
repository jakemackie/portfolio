import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { defineConfig, envField, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://jakemackie.dev',
  integrations: [sitemap()],
  // Pages stay prerendered. The adapter only serves the live GitHub server island.
  adapter: cloudflare({ imageService: 'compile', persistState: false }),
  session: false,
  // Serve /about rather than /about/.
  build: { format: 'file' },
  trailingSlash: 'never',
  // Astro 7 defaults to JSX whitespace rules, which remove the spaces between
  // inline elements written on separate lines. These templates rely on HTML rules.
  compressHTML: true,
  env: {
    schema: {
      GITHUB_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  fonts: [{ provider: fontProviders.fontsource(), name: 'Geist', cssVariable: '--font-geist', weights: ['100 900'], styles: ['normal'] }],
});
