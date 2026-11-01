import cloudflare from '@astrojs/cloudflare';
import { defineConfig, envField, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://jake-mackie-portfolio.jakemackie.workers.dev',
  // Pages stay prerendered. The adapter only serves the live GitHub server island.
  adapter: cloudflare({ imageService: 'compile', persistState: false }),
  session: false,
  // Serve /about rather than /about/.
  build: { format: 'file' },
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
