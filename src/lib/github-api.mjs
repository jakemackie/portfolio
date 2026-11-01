// Shared by the build-time loaders and scripts/sync-github.mjs.

const USER = 'jakemackie';
/** Repositories outside the personal account that belong on the site. */
const EXTRA_REPOS = ['dispatch-hq/dispatch'];

const headers = (token) => ({
  Accept: 'application/vnd.github+json',
  'User-Agent': 'jake-mackie-portfolio',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

async function rest(path, token) {
  const response = await fetch(`https://api.github.com${path}`, { headers: headers(token) });
  if (!response.ok) throw new Error(`GitHub ${path} responded ${response.status}`);
  return response.json();
}

const toRepo = (repo) => ({
  name: repo.name,
  fullName: repo.full_name,
  description: repo.description,
  language: repo.language,
  stars: repo.stargazers_count,
  homepage: repo.homepage || null,
  url: repo.html_url,
  topics: repo.topics ?? [],
  createdAt: repo.created_at,
  pushedAt: repo.pushed_at,
});

export async function fetchRepos(token) {
  const [owned, ...extra] = await Promise.all([
    rest(`/users/${USER}/repos?per_page=100&sort=pushed&type=owner`, token),
    ...EXTRA_REPOS.map((name) => rest(`/repos/${name}`, token)),
  ]);
  return [...extra, ...owned.filter((repo) => !repo.fork && !repo.private)].map(toRepo);
}

/** Contribution counts need an authenticated GraphQL call. */
export async function fetchActivity(token) {
  const now = new Date();
  const span = (from, to) =>
    `contributionsCollection(from: "${from}", to: "${to}") { contributionCalendar { totalContributions } }`;
  const yearAliases = [];
  for (let year = 2024; year <= now.getUTCFullYear(); year += 1) {
    const end = year === now.getUTCFullYear() ? now.toISOString() : `${year}-12-31T23:59:59Z`;
    yearAliases.push(`y${year}: ${span(`${year}-01-01T00:00:00Z`, end)}`);
  }
  const query = `{ user(login: "${USER}") {
    ${yearAliases.join('\n')}
    contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } } }
  } }`;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify({ query }),
  });
  if (!response.ok) throw new Error(`GitHub GraphQL responded ${response.status}`);
  const { data, errors } = await response.json();
  if (errors?.length) throw new Error(errors[0].message);

  const years = Object.entries(data.user)
    .filter(([key]) => key.startsWith('y'))
    .map(([key, value]) => ({
      year: Number(key.slice(1)),
      total: value.contributionCalendar.totalContributions,
    }));
  const calendar = data.user.contributionsCollection.contributionCalendar;

  return {
    totalSince2024: years.reduce((sum, { total }) => sum + total, 0),
    years,
    lastYearTotal: calendar.totalContributions,
    weeks: calendar.weeks.map((week) =>
      week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount })),
    ),
    fetchedAt: now.toISOString(),
  };
}
