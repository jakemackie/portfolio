// Renders a 1200x630 social banner for every built page into public/og, using the
// site's own stylesheet so the banners stay in step with the hero. Run `npm run og`
// after changing a page's heading or blurb, or adding a project or client.

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, extname, join, relative, sep } from 'node:path';
import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;
const client = 'dist/client';

const chromePaths = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const chrome = chromePaths.find((path) => path && existsSync(path));
if (!chrome) throw new Error('Chrome not found. Set CHROME_PATH.');

const mime = { '.css': 'text/css', '.woff2': 'font/woff2' };

const decode = (text) =>
  text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');

const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** Stops along the hero's breathing animation, so each banner catches the gradient at a different moment. */
const breaths = [
  'translate3d(-2%,-2%,0) scale(1.3)',
  'translate3d(3%,-4%,0) scale(1.08)',
  'translate3d(-3%,2%,0) scale(0.88)',
  'translate3d(1%,-3%,0) scale(1.18)',
  'translate3d(-1%,0,0) scale(0.98)',
];

// Fine film grain, which also stops the gradient banding once it is compressed.
const grain = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>',
)}")`;

async function pages(dir = client) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '_astro' && entry.name !== 'og') found.push(...(await pages(full)));
    } else if (entry.name.endsWith('.html') && entry.name !== '404.html') {
      found.push(full);
    }
  }
  return found;
}

/** Everything a banner says comes from the built page, so there is no second copy of the words. */
function readPage(html, file) {
  const route = relative(client, file).split(sep).join('/').replace(/\.html$/, '');
  const heading = html.match(/<h1[^>]*aria-label="([^"]+)"/)?.[1];
  if (!heading) throw new Error(`No hero heading in ${file}`);
  const blurb = html.match(/<p class="band-blurb"[^>]*>(.*?)<\/p>/)?.[1];
  const title = html.match(/<title>(.*?)<\/title>/)[1];
  const section = route.split('/')[0];
  return {
    route: route === 'index' ? 'home' : route,
    isHome: route === 'index',
    name: decode(html.match(/<a class="logo"[^>]*>(.*?)<\/a>/)[1]),
    crumb: route === 'index' ? '' : section[0].toUpperCase() + section.slice(1),
    heading: decode(heading),
    // The home hero has no short blurb, so it uses the role line from the title.
    blurb: decode(blurb ?? title.split(' · ')[1]),
    styles: [...html.matchAll(/<style>.*?<\/style>|<link rel="stylesheet"[^>]*>/g)].map((m) => m[0]).join(''),
  };
}

function template(page, index, host) {
  const [first, ...rest] = page.heading.split(' ');
  const heading = page.isHome
    ? `<h1 class="giant"><span class="word">${escape(first)}</span> <span class="word fade">${escape(rest.join(' '))}</span></h1>`
    : `<h1 class="band-heading">${escape(page.heading)}</h1>`;
  const blurb = `<p class="og-blurb">${escape(page.blurb)}</p>`;

  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8">${page.styles}<style>
    html, body { margin: 0; inline-size: ${WIDTH}px; block-size: ${HEIGHT}px; overflow: hidden; }
    .band.og { inline-size: ${WIDTH}px; block-size: ${HEIGHT}px; min-block-size: 0; }
    .band.og::before { animation: none; transform: ${breaths[index % breaths.length]}; }
    .band.og::after { content: ""; position: absolute; inset: 0; z-index: 0; background: ${grain}; mix-blend-mode: overlay; opacity: .34; }
    .band.og .word { animation: none; }
    .og-top { display: flex; align-items: center; gap: 10px; padding: 40px 48px 0; font-size: 30px; font-weight: 500; letter-spacing: -.01em; }
    .og-crumb { opacity: .72; }
    .og-host { margin-inline-start: auto; padding: 9px 22px; border-radius: 999px; background: #14110c; color: #f6f2e6; font-size: 22px; letter-spacing: 0; }
    .og-blurb { padding: 0 48px; font-size: 34px; font-weight: 500; line-height: 1.2; letter-spacing: -.015em; text-wrap: balance; max-inline-size: 960px; animation: none; }
    .og-copy { margin-block-start: auto; }
    .band.og .band-heading { margin: 0; padding: 0 42px; font-size: 168px; text-wrap: balance; }
    .band.og .giant { padding: 0 16px 8px; font-size: 211px; }
    .band.og.home .og-blurb { box-sizing: content-box; max-inline-size: 400px; margin: 0 0 18px auto; }
    .band.og:not(.home) .og-blurb { margin-block-start: 18px; padding-block-end: 44px; }
  </style></head><body>
    <div class="band og${page.isHome ? ' home' : ''}">
      <header class="og-top"><span>${escape(page.name)}</span>${page.crumb ? `<span class="og-crumb">/ ${escape(page.crumb)}</span>` : ''}<span class="og-host">${host}</span></header>
      <div class="og-copy">${page.isHome ? blurb + heading : heading + blurb}</div>
    </div>
    <script>
      // Long titles shrink until the copy fits under the header.
      document.fonts.ready.then(() => {
        const copy = document.querySelector('.og-copy');
        const h1 = document.querySelector('h1');
        const room = () => ${HEIGHT} - document.querySelector('.og-top').offsetHeight - 16;
        let size = parseFloat(getComputedStyle(h1).fontSize);
        while (size > 40 && (copy.offsetHeight > room() || h1.scrollWidth > h1.clientWidth)) {
          size -= 2;
          h1.style.fontSize = size + 'px';
        }
      });
    </script>
  </body></html>`;
}

const site = (await readFile('astro.config.ts', 'utf8')).match(/site: '([^']+)'/)[1];
const host = new URL(site).host;
const files = await pages();
if (!files.length) throw new Error('No built pages. Run astro build first.');
const list = await Promise.all(files.map(async (file) => readPage(await readFile(file, 'utf8'), file)));
list.sort((a, b) => a.route.localeCompare(b.route));

// Pages' CSS links are root-relative, so banners are served next to the build.
const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  const banner = pathname.match(/^\/__og\/(\d+)$/);
  if (banner) {
    res.setHeader('content-type', 'text/html');
    return res.end(template(list[Number(banner[1])], Number(banner[1]), host));
  }
  try {
    res.setHeader('content-type', mime[extname(pathname)] ?? 'application/octet-stream');
    res.end(await readFile(join(client, pathname)));
  } catch {
    res.statusCode = 404;
    res.end();
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();

const work = await mkdtemp(join(tmpdir(), 'og-'));

function screenshot(url, out) {
  return new Promise((resolve, reject) => {
    const proc = spawn(chrome, [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--force-device-scale-factor=1',
      `--user-data-dir=${join(work, 'profile')}`,
      // Taller than the banner, because some Chrome versions take the window frame out of the viewport.
      `--window-size=${WIDTH},${HEIGHT + 200}`,
      '--virtual-time-budget=4000',
      `--screenshot=${out}`,
      url,
    ], { stdio: 'ignore' });
    proc.on('error', reject);
    proc.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`Chrome exited with ${code}`))));
  });
}

try {
  for (const [i, page] of list.entries()) {
    const shot = join(work, `${i}.png`);
    await screenshot(`http://127.0.0.1:${port}/__og/${i}`, shot);
    const out = join('public/og', `${page.route}.jpg`);
    await mkdir(dirname(out), { recursive: true });
    const { size } = await sharp(shot)
      .extract({ left: 0, top: 0, width: WIDTH, height: HEIGHT })
      .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' })
      .toFile(out);
    console.log(`${out}  ${Math.round(size / 1024)} KB`);
  }
  // iOS home-screen icon, on an opaque square because iOS rounds the corners itself.
  const icon = (await readFile('public/favicon.svg', 'utf8')).replace(/ rx="[^"]+"/, '');
  await sharp(Buffer.from(icon), { density: 600 })
    .resize(180, 180)
    .flatten({ background: '#17181a' })
    .png()
    .toFile('public/apple-touch-icon.png');
} finally {
  server.close();
  await rm(work, { recursive: true, force: true, maxRetries: 3 });
}
