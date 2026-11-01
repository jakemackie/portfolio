import { getEntry } from 'astro:content';
import { getPortfolio } from './content';

/** The URL path a built page is served at: /about.html is /about, and /index.html is /. */
export const pagePath = (pathname: string) => pathname.replace(/(index)?\.html$/, '') || '/';

/** Where `npm run og` writes the banner for a page. */
export const bannerPath = (path: string) => `/og${path === '/' ? '/home' : path}.jpg`;

const personId = (site: URL) => new URL('/#person', site).href;

export const personRef = (site: URL) => ({ '@id': personId(site) });

/** The site and the person behind it. Every page carries these, and page schemas point back to them. */
export async function siteSchema(site: URL) {
  const { profile, skills, education } = await getPortfolio();
  const credential = (await getEntry('credentials', 'level-4-software-developer'))?.data;
  const [locality, region] = profile.location.split(', ');

  return [
    {
      '@type': 'WebSite',
      '@id': new URL('/#website', site).href,
      url: site.href,
      name: profile.name,
      inLanguage: 'en-GB',
      publisher: personRef(site),
    },
    {
      '@type': 'Person',
      '@id': personId(site),
      name: profile.name,
      url: site.href,
      jobTitle: profile.role,
      description: profile.summary,
      email: `mailto:${profile.email}`,
      address: { '@type': 'PostalAddress', addressLocality: locality, addressRegion: region, addressCountry: 'GB' },
      sameAs: profile.links.map((link) => link.url),
      knowsAbout: skills.flatMap((group) => group.items),
      alumniOf: education.map((school) => ({ '@type': 'EducationalOrganization', name: school.institution })),
      ...(credential && {
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: `${credential.title} apprenticeship, ${credential.grade}`,
          credentialCategory: 'Apprenticeship',
          dateCreated: credential.awarded.toISOString().slice(0, 10),
          url: credential.verifyUrl,
          recognizedBy: { '@type': 'Organization', name: credential.issuer },
        },
      }),
    },
  ];
}

/** Home > Projects > Dispatch, as Google's breadcrumb markup. */
export function breadcrumbSchema(site: URL, trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(({ name, path }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: new URL(path, site).href,
    })),
  };
}
