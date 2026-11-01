import cloudflare from '@astrojs/cloudflare';
import { defineConfig, envField, fontProviders } from 'astro/config';

const fontsource = fontProviders.fontsource();

export default defineConfig({
  site: 'https://jake-mackie-portfolio.jakemackie.workers.dev',
  // Pages stay prerendered. The adapter only serves the live GitHub server island.
  adapter: cloudflare({ imageService: 'compile', persistState: false }),
  session: false,
  // The theme switcher already sits on the page edge, so keep the dev toolbar out of the way.
  devToolbar: { enabled: false },
  // Serve /theme/1/about rather than /theme/1/about/.
  build: { format: 'file' },
  // Astro 7 defaults to JSX whitespace rules, which remove the spaces between
  // inline elements written on separate lines. These templates rely on HTML rules.
  compressHTML: true,
  env: {
    schema: {
      GITHUB_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  fonts: [
    // 1 Swiss
    { provider: fontsource, name: 'Inter Tight', cssVariable: '--font-inter-tight', weights: ['100 900'], styles: ['normal'] },
    // 2 Heat
    { provider: fontsource, name: 'Geist', cssVariable: '--font-geist', weights: ['100 900'], styles: ['normal'] },
    // 3 Cobalt
    { provider: fontsource, name: 'Inter', cssVariable: '--font-inter', weights: ['100 900'], styles: ['normal'] },
    { provider: fontsource, name: 'Instrument Serif', cssVariable: '--font-instrument', weights: [400], styles: ['italic'] },
    // 4 Noir, and the theme chooser
    { provider: fontsource, name: 'Space Grotesk', cssVariable: '--font-space', weights: ['300 700'], styles: ['normal'] },
  ],
});
