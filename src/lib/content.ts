import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Repo = CollectionEntry<'repos'>['data'];

const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

async function load() {
  const [profileEntry, activityEntry, highlights, experience, clients, skills, education, projects, repos] =
    await Promise.all([
      getEntry('profile', 'jake'),
      getEntry('activity', 'jakemackie'),
      getCollection('highlights'),
      getCollection('experience'),
      getCollection('clients'),
      getCollection('skills'),
      getCollection('education'),
      getCollection('projects'),
      getCollection('repos'),
    ]);
  if (!profileEntry || !activityEntry) throw new Error('profile and activity entries are required');

  const activity = activityEntry.data;
  const reposById = new Map(repos.map((repo) => [repo.id, repo.data]));

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
    projects: projects.sort(byOrder).map((entry) => ({
      entry,
      ...entry.data,
      slug: entry.id,
      repoData: entry.data.repo ? reposById.get(entry.data.repo.id) : undefined,
    })),
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

const pages = [
  { path: '/about', label: 'About' },
  { path: '/experience', label: 'Experience' },
  { path: '/projects', label: 'Projects' },
  { path: '/education', label: 'Education' },
  { path: '/contact', label: 'Contact' },
];

/** Links for the main nav, with the current page marked. */
export function siteNav(pathname: string) {
  const current = pathname.replace(/\.html$/, '').replace(/\/$/, '');
  return pages.map(({ path, label }) => ({
    href: path,
    label,
    active: current === path || current.startsWith(`${path}/`),
  }));
}
