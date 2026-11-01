import type { Loader } from 'astro/loaders';
import { fetchActivity, fetchRepos } from '../lib/github-api.mjs';
import snapshot from '../data/github-snapshot.json';

const token = process.env.GITHUB_TOKEN;

/** Prefer fresh data when a token is available, and never fail a build over GitHub being down. */
async function freshOr<T>(fetcher: () => Promise<T>, fallback: T, warn: (message: string) => void) {
  if (!token) return fallback;
  try {
    return await fetcher();
  } catch (error) {
    warn(`Using the GitHub snapshot: ${(error as Error).message}`);
    return fallback;
  }
}

export function githubReposLoader(): Loader {
  return {
    name: 'github-repos',
    load: async ({ store, parseData, generateDigest, logger }) => {
      const repos = await freshOr(() => fetchRepos(token), snapshot.repos, logger.warn.bind(logger));
      store.clear();
      for (const repo of repos) {
        const id = repo.name.toLowerCase();
        const data = await parseData({ id, data: repo });
        store.set({ id, data, digest: generateDigest(repo) });
      }
    },
  };
}

export function githubActivityLoader(): Loader {
  return {
    name: 'github-activity',
    load: async ({ store, parseData, generateDigest, logger }) => {
      const activity = await freshOr(() => fetchActivity(token), snapshot.activity, logger.warn.bind(logger));
      store.clear();
      const data = await parseData({ id: 'jakemackie', data: activity });
      store.set({ id: 'jakemackie', data, digest: generateDigest(activity) });
    },
  };
}
