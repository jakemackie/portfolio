import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Repo = CollectionEntry<'repos'>['data'];

const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

async function load() {
  const [profileEntry, activityEntry, highlights, experience, clients, skills, education, themes, projects, repos] =
    await Promise.all([
      getEntry('profile', 'jake'),
      getEntry('activity', 'jakemackie'),
      getCollection('highlights'),
      getCollection('experience'),
      getCollection('clients'),
      getCollection('skills'),
      getCollection('education'),
      getCollection('themes'),
      getCollection('projects'),
      getCollection('repos'),
    ]);
  if (!profileEntry || !activityEntry) throw new Error('profile and activity entries are required');

  const activity = activityEntry.data;
  const reposById = new Map(repos.map((repo) => [repo.id, repo.data]));
  const usedRepos = new Set(
    projects.flatMap((p) => [p.data.repo?.id, ...p.data.extraRepos.map((r) => r.id)]).filter(Boolean),
  );

  return {
    profile: profileEntry.data,
    activity,
    highlights: highlights.sort(byOrder).map(({ id, data }) => ({
      id,
      ...data,
      // Rounded down, so the site never claims more than GitHub can show.
      value: data.live === 'contributions' ? Math.floor(activity.totalSince2024 / 100) * 100 : data.value,
    })),
    experience: experience
      .map(({ id, data }) => ({ id, ...data }))
      .sort((a, b) => b.start.getTime() - a.start.getTime()),
    clients: clients.sort(byOrder).map(({ data }) => data),
    skills: skills.sort(byOrder).map(({ data }) => data),
    education: education.sort(byOrder).map(({ data }) => data),
    themes: themes.sort(byOrder).map(({ id, data }) => ({ id, ...data })),
    projects: projects.sort(byOrder).map((entry) => ({
      entry,
      ...entry.data,
      slug: entry.id,
      repoData: entry.data.repo ? reposById.get(entry.data.repo.id) : undefined,
    })),
    /** Public repositories not already covered by a project page, newest first. */
    otherRepos: repos
      .filter((repo) => !usedRepos.has(repo.id) && repo.data.description)
      .map((repo) => repo.data)
      .sort((a, b) => b.pushedAt.getTime() - a.pushedAt.getTime()),
  };
}

let cached: ReturnType<typeof load> | undefined;
export const getPortfolio = () => (cached ??= load());

export async function projectPaths() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({ params: { slug: project.id }, props: { project } }));
}

const monthYear = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
const fullDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const formatMonth = (date: Date) => monthYear.format(date);
export const formatDate = (date: Date) => fullDate.format(date);
export const formatRange = (start: Date, end: Date) => `${formatMonth(start)} – ${formatMonth(end)}`;
export const formatNumber = (value: number) => value.toLocaleString('en-GB');
export const formatStat = (h: { prefix: string; value: number; suffix: string }) =>
  `${h.prefix}${formatNumber(h.value)}${h.suffix}`;

/** Whole months from start to end, counting both end months. */
export function tenure(start: Date, end: Date) {
  const months =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + end.getUTCMonth() - start.getUTCMonth() + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years && `${years} yr${years > 1 ? 's' : ''}`, rest && `${rest} mo`].filter(Boolean).join(' ');
}

export function coordinate(value: number, axis: 'lat' | 'lon') {
  const hemisphere = axis === 'lat' ? (value >= 0 ? 'N' : 'S') : value >= 0 ? 'E' : 'W';
  const absolute = Math.abs(value);
  const degrees = Math.floor(absolute);
  const minutes = ((absolute - degrees) * 60).toFixed(2).padStart(5, '0');
  return `${degrees}°${minutes}′${hemisphere}`;
}

/** Contributions per calendar month across the last year, oldest first. */
export async function monthlyContributions() {
  const { activity } = await getPortfolio();
  const label = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' });
  const months = new Map<string, { label: string; count: number }>();
  for (const day of activity.weeks.flat()) {
    const key = day.date.toISOString().slice(0, 7);
    const month = months.get(key) ?? { label: label.format(day.date), count: 0 };
    month.count += day.count;
    months.set(key, month);
  }
  return [...months.values()];
}

const pages = [
  { path: '', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/experience', label: 'Experience' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
];

/** Links for a theme's own nav, with the current page marked. */
export function themeNav(theme: string, pathname: string) {
  const base = `/theme/${theme}`;
  const current = pathname.replace(/\.html$/, '').replace(/\/$/, '');
  return pages.map(({ path, label }) => {
    const href = `${base}${path}`;
    const active = path === '' ? current === base : current === href || current.startsWith(`${href}/`);
    return { href, label, active };
  });
}
