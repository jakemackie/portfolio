# Portfolio

Astro 7 on Cloudflare Workers, with all content in Zod collections.

| Route | What it is |
| --- | --- |
| `/` | Home |
| `/about` | Profile and skills |
| `/experience` | Roles and selected clients |
| `/projects`, `/projects/[slug]` | Project list and write-ups |
| `/education` | The Level 4 Distinction, with the badge and a link to verify it |
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
| `profile`, `highlights`, `experience`, `clients`, `skills`, `education` | `src/data/*.yaml` |
| `projects` | `src/content/projects/*.md`, with images from `src/assets/projects` |
| `credentials` | `src/content/credentials/*.md`, with the badge from `src/assets/credentials` |
| `repos`, `activity` | GitHub, through the loaders in `src/loaders/github.ts` |
| `repoStats` (live) | GitHub at request time, defined in `src/live.config.ts` |

The look lives in `src/layouts/Layout.astro` and `src/styles/theme.css`.

## GitHub data

Builds read `src/data/github-snapshot.json`, or fetch fresh data when `GITHUB_TOKEN` is set. To refresh the committed snapshot:

```bash
GITHUB_TOKEN=$(gh auth token) npm run sync:github
```

Project pages also show live stars and last push through a server island (`src/components/RepoPulse.astro`), the only part of the site that runs on the Worker. It works without a token, but unauthenticated requests share GitHub's rate limit, so set one in production:

```bash
npx wrangler secret put GITHUB_TOKEN
```

## Deployment notes

- Set `site` in `astro.config.ts` to the real domain.
- `compatibility_date` in `wrangler.jsonc` cannot be newer than the installed `workerd` supports.
- `persistState: false` on the adapter is there because nothing here uses local bindings, and Miniflare's state database cannot open under very long Windows paths.
