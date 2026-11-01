import { defineLiveCollection } from 'astro:content';
import type { LiveLoader } from 'astro/loaders';
import { z } from 'astro/zod';
import { getSecret } from 'astro:env/server';

interface RepoStats {
  stars: number;
  pushedAt: string;
  openIssues: number;
}

/** Fetched on the Worker at request time for the server island on project pages. */
function repoStatsLoader(): LiveLoader<RepoStats, { id: string }, never> {
  return {
    name: 'repo-stats',
    loadCollection: async () => ({ error: new Error('repoStats only supports single entries') }),
    loadEntry: async ({ filter }) => {
      const token = getSecret('GITHUB_TOKEN');
      const response = await fetch(`https://api.github.com/repos/${filter.id}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'jake-mackie-portfolio',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        // Workers-only option: share one upstream call between visitors for 15 minutes.
        cf: { cacheTtl: 900, cacheEverything: true },
      } as RequestInit);
      if (!response.ok) return { error: new Error(`GitHub responded ${response.status}`) };
      const repo = (await response.json()) as {
        stargazers_count: number;
        pushed_at: string;
        open_issues_count: number;
      };
      return {
        id: filter.id,
        data: {
          stars: repo.stargazers_count,
          pushedAt: repo.pushed_at,
          openIssues: repo.open_issues_count,
        },
      };
    },
  };
}

const repoStats = defineLiveCollection({
  loader: repoStatsLoader(),
  schema: z.object({
    stars: z.number().int(),
    pushedAt: z.coerce.date(),
    openIssues: z.number().int(),
  }),
});

export const collections = { repoStats };
