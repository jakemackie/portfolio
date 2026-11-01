import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *
Allow: /
Disallow: /_server-islands/

Sitemap: ${new URL('/sitemap-index.xml', site)}
`,
  );
