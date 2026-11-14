/* SEO + content audit for site/ — run: node scripts/seo-audit.mjs */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');

function walk(dir) {
  let out = [];
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, f.name);
    if (f.isDirectory()) out = out.concat(walk(p));
    else if (f.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function attr(html, re) {
  const m = html.match(re);
  return m ? m[1] : null;
}

const pages = walk(ROOT).map((file) => {
  const html = readFileSync(file, 'utf8');
  const rel = relative(ROOT, file).replace(/\\/g, '/');

  const title = (html.match(/<title>([^]*)<\/title>/) || [])[1] || '';
  const desc = attr(html, /<meta name="description" content="([^"]*)"/) || '';
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const hreflang = (html.match(/hreflang=/g) || []).length;
  const robots = attr(html, /<meta name="robots" content="([^"]*)"/) || 'index';
  const ogTitle = !!html.includes('property="og:title"');
  const ogDesc = !!html.includes('property="og:description"');
  const ogImage = !!html.includes('property="og:image"');
  const twitter = !!html.includes('name="twitter:card"');
  const lang = attr(html, /<html lang="([^"]*)"/);

  // JSON-LD
  const ldTypes = [];
  let ldParseErrors = 0;
  for (const m of html.matchAll(/<script type="application\/ld\+json">([^]*?)<\/script>/g)) {
    try {
      const j = JSON.parse(m[1]);
      const graph = j['@graph'] || [j];
      for (const n of graph) ldTypes.push(n['@type'] + (n.datePublished ? '+date' : ''));
      if (graph.some((n) => n['@type'] === 'Article' && !n.datePublished)) ldTypes.push('MISSING:articleDate');
    } catch (e) { ldParseErrors++; }
  }

  // Headings
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const h2 = (html.match(/<h2[\s>]/g) || []).length;
  const h3 = (html.match(/<h3[\s>]/g) || []).length;

  // Visible text word count (strip scripts/styles/svg text)
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .trim();
  const words = text.split(/\s+/).filter(Boolean).length;

  // Links
  const hrefs = [...html.matchAll(/href="([^"]*)"/g)].map((m) => m[1]).filter((h) => !h.startsWith('#') && !h.startsWith('mailto:'));
  const outbound = hrefs.filter((h) => /^https?:\/\//.test(h) && !h.includes('politicalspectrumtest.online'));
  const internal = hrefs.filter((h) => h.startsWith('/'));
  // verify internal targets exist
  const brokenInternal = internal.filter((h) => {
    const clean = h.split('#')[0].split('?')[0];
    if (clean === '' || clean === '/') return false;
    const p = join(ROOT, clean, 'index.html');
    if (existsSync(p)) return false;
    if (existsSync(join(ROOT, clean))) return false; // e.g. /sitemap.xml handled separately
    return true;
  }).filter((h) => !/\.\w+$/.test(h.split('#')[0].split('?')[0].replace(/\/$/, '')) );

  const imgsNoAlt = (html.match(/<img(?![^>]*alt=)[^>]*>/g) || []).length;

  return { file, rel, title: title.trim(), desc, canonical, hreflang, robots, ogTitle, ogDesc, ogImage, twitter, lang, ldTypes, ldParseErrors, h1, h2, h3, words, internal: internal.length, outbound: outbound.length, brokenInternal, imgsNoAlt };
});

// Report
console.log('=== PER-PAGE AUDIT ===');
for (const p of pages) {
  const ld = p.ldTypes.join(', ') || 'NONE';
  console.log(`\n[${p.rel}]`);
  console.log(`  title(${p.title.length}): ${p.title}`);
  console.log(`  desc(${p.desc.length})  canonical: ${p.canonical ? 'yes' : 'NO'}  hreflang: ${p.hreflang}  robots: ${p.robots}`);
  console.log(`  OG: t${p.ogTitle ? 1 : 0}/d${p.ogDesc ? 1 : 0}/img${p.ogImage ? 1 : 0}  twitter: ${p.twitter ? 1 : 0}  lang: ${p.lang}`);
  console.log(`  JSON-LD: ${ld}  parseErrors: ${p.ldParseErrors}`);
  console.log(`  h1:${p.h1} h2:${p.h2} h3:${p.h3}  words: ${p.words}  internal links: ${p.internal}  outbound: ${p.outbound}  broken: ${p.brokenInternal.length}  img-no-alt: ${p.imgsNoAlt}`);
}

// Global checks
console.log('\n=== GLOBAL CHECKS ===');
const titles = pages.map((p) => p.title);
const dupTitles = titles.filter((t, i) => titles.indexOf(t) !== i);
console.log('duplicate titles:', dupTitles.length ? dupTitles : 'none');
const descs = pages.map((p) => p.desc);
const dupDescs = descs.filter((d) => d && descs.indexOf(d) !== d.length ? false : false);
console.log('duplicate descs:', descs.some((d, i) => descs.indexOf(d) !== i) ? 'YES' : 'none');
const thin = pages.filter((p) => p.words < 300 && !p.robots.includes('noindex'));
console.log('pages under 300 words (indexable):', thin.length ? thin.map((p) => `${p.rel} (${p.words})`) : 'none');

// sitemap coverage
const sm = readFileSync(join(ROOT, 'sitemap.xml'), 'utf8');
const smUrls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace('https://politicalspectrumtest.online', ''));
const fileUrls = pages.map((p) => {
  let r = '/' + relative(ROOT, p.file).replace(/\\/g, '/');
  r = r.replace(/index\.html$/, '');
  return r === '/index.html' ? '/' : r;
}).filter((u) => u !== '/404.html');
const inSitemapNotFile = smUrls.filter((u) => !fileUrls.includes(u));
const inFileNotSitemap = fileUrls.filter((u) => !smUrls.includes(u));
console.log('sitemap entries:', smUrls.length, '| in sitemap but no file:', inSitemapNotFile.length ? inSitemapNotFile : 'none', '| file but not in sitemap:', inFileNotSitemap.length ? inFileNotSitemap : 'none');
console.log('outbound links sitewide:', pages.reduce((s, p) => s + p.outbound, 0));
console.log('noindex pages:', pages.filter((p) => p.robots.includes('noindex')).map((p) => p.rel));
