import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { githubActivityLoader, githubReposLoader } from './loaders/github';

const profile = defineCollection({
  loader: file('src/data/profile.yaml'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    location: z.string(),
    email: z.email(),
    availability: z.string().optional(),
    summary: z.string(),
    intro: z.string(),
    about: z.array(z.string()).min(1),
    links: z.array(z.object({ label: z.string(), handle: z.string(), url: z.url() })),
  }),
});

const highlights = defineCollection({
  loader: file('src/data/highlights.yaml'),
  schema: z.object({
    order: z.number().int(),
    value: z.number().int().positive(),
    suffix: z.string().default(''),
    prefix: z.string().default(''),
    /** Replace `value` with a figure measured at build time. */
    live: z.enum(['contributions']).optional(),
    label: z.string(),
    detail: z.string(),
  }),
});

const experience = defineCollection({
  loader: file('src/data/experience.yaml'),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    kind: z.enum(['engineering', 'placement', 'earlier']),
    start: z.coerce.date(),
    end: z.coerce.date(),
    location: z.string().optional(),
    context: z.string().optional(),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
  }),
});

const clients = defineCollection({
  loader: file('src/data/clients.yaml'),
  schema: z.object({
    order: z.number().int(),
    name: z.string(),
    url: z.url(),
    domain: z.string(),
    sector: z.string(),
    summary: z.string(),
    engagement: reference('experience'),
  }),
});

const skills = defineCollection({
  loader: file('src/data/skills.yaml'),
  schema: z.object({
    order: z.number().int(),
    label: z.string(),
    items: z.array(z.string()).min(1),
  }),
});

const education = defineCollection({
  loader: file('src/data/education.yaml'),
  schema: z.object({
    order: z.number().int(),
    institution: z.string(),
    from: z.number().int(),
    to: z.number().int(),
    awards: z.array(
      z.object({
        title: z.string(),
        grade: z.string().optional(),
        note: z.string().optional(),
      }),
    ),
    verifyUrl: z.url().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string(),
      order: z.number().int(),
      featured: z.boolean().default(false),
      year: z.number().int(),
      platform: z.string(),
      stack: z.array(z.string()).min(1),
      repo: reference('repos').optional(),
      live: z.url().optional(),
      points: z.array(z.string()).min(1),
      images: z.array(z.object({ src: image(), alt: z.string() })).default([]),
    }),
});

/** Public repositories. Live with GITHUB_TOKEN set, otherwise from the committed snapshot. */
const repoSchema = z.object({
  name: z.string(),
  fullName: z.string(),
  description: z.string().nullable(),
  language: z.string().nullable(),
  stars: z.number().int(),
  homepage: z.string().nullable(),
  url: z.url(),
  topics: z.array(z.string()),
  createdAt: z.coerce.date(),
  pushedAt: z.coerce.date(),
});

/** The Level 4 credential: its details as frontmatter, and the story of getting it as the body. */
const credentials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/credentials' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      achievement: z.string(),
      grade: z.string(),
      issuer: z.string(),
      provider: z.string(),
      code: z.string(),
      awarded: z.coerce.date(),
      statement: z.string(),
      verifyUrl: z.url(),
      badge: image(),
      badgeAlt: z.string(),
    }),
});

const repos = defineCollection({ loader: githubReposLoader(), schema: repoSchema });

const activity = defineCollection({
  loader: githubActivityLoader(),
  schema: z.object({
    totalSince2024: z.number().int(),
    years: z.array(z.object({ year: z.number().int(), total: z.number().int() })),
    lastYearTotal: z.number().int(),
    weeks: z.array(z.array(z.object({ date: z.coerce.date(), count: z.number().int() }))),
    fetchedAt: z.coerce.date(),
  }),
});

export const collections = {
  profile,
  highlights,
  experience,
  clients,
  skills,
  education,
  projects,
  credentials,
  repos,
  activity,
};
