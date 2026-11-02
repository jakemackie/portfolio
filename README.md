# Portfolio

Astro 7 on Cloudflare Workers, with all content in Zod collections.

| Route | What it is |
| --- | --- |
| `/` | Home |
| `/about` | Profile and skills |
| `/experience`, `/experience/[slug]` | Roles and selected clients, with a page for each client site |
| `/projects`, `/projects/[slug]` | Project list and write-ups |
| `/education` | The Level 4 Distinction, with the badge and a link to verify it |
| `/resume` | The CV, `public/jake-mackie-cv.pdf`, to download or open |
| `/contact` | Email and links |

## Commands

```bash
npm install
npm run dev            # astro dev, on the workerd runtime
npm run build          # astro check, then astro build
npm run preview        # build, then serve the real output with wrangler dev
npm run deploy         # build, then wrangler deploy
```

## Editing content

Everything on the site comes from the collections in `src/content.config.ts`.

| Collection | Source |
| --- | --- |
| `profile`, `highlights`, `experience`, `clients`, `skills`, `education` | `src/data/*.yaml`, with client screenshots from `src/assets/clients` |
| `projects` | `src/content/projects/*.md`, with images from `src/assets/projects` |
| `credentials` | `src/content/credentials/*.md`, with the badge from `src/assets/credentials` |
| `repos`, `activity` | GitHub, through the loaders in `src/loaders/github.ts` |
| `repoStats` (live) | GitHub at request time, defined in `src/live.config.ts` |

The look lives in `src/layouts/Layout.astro` and `src/styles/theme.css`.

## Day and night

The clock pill and the site's colours follow the time in `Europe/London`, whatever the visitor's own zone, so BST and GMT are handled by the browser's time zone data. Night runs from 19:00 to 07:00, set by `NIGHT_FROM` and `NIGHT_UNTIL` in `src/layouts/Layout.astro`, and its palette is the `:root[data-sky="night"]` block in `src/styles/theme.css`. Without JavaScript the site stays in its day colours.

The first page of a visit also compares the device's clock with the `Date` header on a `HEAD` request to the site itself, and corrects for any gap over 30 seconds. If that request fails, the device's clock is used. At night the tab icon swaps to `public/favicon-night.svg`, which is a recolour of `public/favicon.svg`, so regenerate it if the mark changes. Social banners stay in the day colours, because crawlers don't run JavaScript and platforms cache the image. The night stars and their mouse and scroll parallax live in `src/components/Stars.astro`.

## GitHub data

Builds read `src/data/github-snapshot.json`, or fetch fresh data when `GITHUB_TOKEN` is set. To refresh the committed snapshot:

```bash
GITHUB_TOKEN=$(gh auth token) npm run sync:github
```

Project pages also show live stars and last push through a server island (`src/components/RepoPulse.astro`), the only part of the site that runs on the Worker. It works without a token, but unauthenticated requests share GitHub's rate limit, so set one in production:

```bash
npx wrangler secret put GITHUB_TOKEN
```

## Social banners

Each page has a 1200x630 banner in `public/og`, drawn from its built heading and blurb with the site's own stylesheet. Banners are committed, because rendering them needs Chrome (set `CHROME_PATH` if it isn't in the usual place). Re-run this after changing a heading or blurb, or adding a project or client, otherwise the new page's `og:image` will 404:

```bash
npm run og
```

## Search

Canonicals, `robots.txt`, the sitemap and JSON-LD all derive from `site` in `astro.config.ts`. Titles and descriptions are set per page, and project descriptions live in frontmatter. The structured data is in `src/lib/seo.ts`.

## Deployment notes

- `site` in `astro.config.ts` must be the production domain, currently `jakemackie.dev`.
- `compatibility_date` in `wrangler.jsonc` cannot be newer than the installed `workerd` supports.
- `persistState: false` on the adapter is there because nothing here uses local bindings, and Miniflare's state database cannot open under very long Windows paths.
