# Jake Mackie's portfolio

Astro 7 on Cloudflare Workers. One set of content collections, four separately designed themes.

| Route | What it is |
| --- | --- |
| `/` | Theme chooser with live previews |
| `/theme/1` | Swiss: grey paper and huge uppercase type |
| `/theme/2` | Heat: a gradient hero with a full-width name |
| `/theme/3` | Cobalt: a blue studio landing page |
| `/theme/4` | Noir: near-black with a soft orb and pill nav |

Each theme has `/about`, `/experience`, `/projects`, `/projects/[slug]` and `/contact`.

## Commands

```bash
npm install
npm run dev            # astro dev, on the workerd runtime
npm run build          # astro check, then astro build
npm run preview        # build, then serve the real output with wrangler dev
npm run deploy         # build, then wrangler deploy
```

## Editing content

Everything the themes show comes from the collections in `src/content.config.ts`, validated with Zod.

| Collection | Source |
| --- | --- |
| `profile`, `highlights`, `experience`, `clients`, `skills`, `education`, `themes` | `src/data/*.yaml` |
| `projects` | `src/content/projects/*.md`, with images from `src/assets/projects` |
| `repos`, `activity` | GitHub, through the loaders in `src/loaders/github.ts` |
| `repoStats` (live) | GitHub at request time, defined in `src/live.config.ts` |

## GitHub data

Builds read `src/data/github-snapshot.json`, or fetch fresh data when `GITHUB_TOKEN` is set. To refresh the committed snapshot:

```bash
GITHUB_TOKEN=$(gh auth token) npm run sync:github
```

Project pages also show live stars and last push through a server island (`src/components/RepoPulse.astro`), the only part of the site that runs on the Worker. It works without a token, but unauthenticated requests share GitHub's rate limit, so set one in production:

```bash
npx wrangler secret put GITHUB_TOKEN
```

## Themes

A theme is a folder of styles in `src/themes/<name>` plus a folder of real routes in `src/pages/theme/<n>`. Keeping routes separate means each page only loads its own theme's CSS.

To keep one theme: move its pages up to `src/pages`, delete the other themes and `ThemeBar`, and update the canonical URL logic in `src/components/BaseHead.astro`.

## Deployment notes

- Set `site` in `astro.config.ts` to the real domain.
- `compatibility_date` in `wrangler.jsonc` cannot be newer than the installed `workerd` supports.
- `persistState: false` on the adapter is there because nothing here uses local bindings, and Miniflare's state database cannot open under very long Windows paths.
