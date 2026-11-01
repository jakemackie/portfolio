// Refreshes the committed GitHub snapshot. The token is read from the environment only:
//   GITHUB_TOKEN=$(gh auth token) npm run sync:github
import { writeFile } from 'node:fs/promises';
import { fetchActivity, fetchRepos } from '../src/lib/github-api.mjs';

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('GITHUB_TOKEN is required. Contribution counts need an authenticated request.');
  process.exit(1);
}

const [repos, activity] = await Promise.all([fetchRepos(token), fetchActivity(token)]);
const target = new URL('../src/data/github-snapshot.json', import.meta.url);
await writeFile(target, `${JSON.stringify({ repos, activity }, null, 2)}\n`);
console.log(`Saved ${repos.length} repositories and ${activity.totalSince2024} contributions.`);
