/* Build script: generates ideology guide pages, the guides hub, and sitemap.xml
   from data/ideologies.mjs into site/. Run: node build.mjs */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, ideologies } from './data/ideologies.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, 'site');
const LASTMOD = '2026-11-14';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ---------- Shared chrome ---------- */
const ringSvg = (id, size) => `
      <svg width="${size}" height="${size}" viewBox="0 0 28 28" aria-hidden="true">
        <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#D64550"/><stop offset="0.36" stop-color="#E39B2D"/><stop offset="0.64" stop-color="#7C9C62"/><stop offset="1" stop-color="#3D6FA8"/>
        </linearGradient></defs>
        <circle cx="14" cy="14" r="9.5" fill="none" stroke="url(#${id})" stroke-width="5"/>
      </svg>`;

function header({ gradientId, navActive }) {
  return `
<header class="site-header">
  <div class="container">
    <a class="brand" href="/">${ringSvg(gradientId, 27)}
      <span class="brand-name">Political Spectrum Test</span>
    </a>
    <nav class="header-nav" aria-label="Main">
      <a class="nav-link" href="/#guides"${navActive === 'guides' ? ' style="color:var(--ink)"' : ''}>Guides</a>
      <a class="nav-link" href="/methodology/"${navActive === 'methodology' ? ' style="color:var(--ink)"' : ''}>Methodology</a>
      <a class="nav-link" href="/about/"${navActive === 'about' ? ' style="color:var(--ink)"' : ''}>About</a>
      <a class="btn btn--sm" href="/test/">Take the Test</a>
    </nav>
    <a class="btn btn--sm header-cta-mobile" href="/test/">Take the Test</a>
  </div>
</header>`;
}

function footerSlim() {
  return `
<footer class="site-footer footer-slim">
  <div class="container footer-grid">
    <a class="brand" href="/" style="color:#FFFFFF">${ringSvg('lg-gfoot', 24)}
      <span class="brand-name" style="font-size:16px">Political Spectrum Test</span>
    </a>
    <div style="font-size:13px">Educational tool — results are for reflection, not science.</div>
    <div style="font-size:13px; color:var(--ghost)">© ${SITE.year} politicalspectrumtest.online</div>
  </div>
</footer>`;
}

function ctaBand(title, sub) {
  return `
<section class="container" style="padding-top:56px">
  <div class="cta-band">
    <div>
      <p class="cta-title">${esc(title)}</p>
      <p class="cta-sub">${esc(sub)}</p>
    </div>
    <a class="btn btn--light" href="/test/">Take the free test
      <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>
    </a>
  </div>
</section>`;
}

/* ---------- Guide page ---------- */
const AXIS_KEYS = ['econ', 'civ', 'soc', 'geo'];
const AXIS_TITLES = { econ: 'Economy', civ: 'Civil Liberties', soc: 'Society', geo: 'Global Outlook' };
const AXIS_TRACK = { econ: 'axis-track', civ: 'axis-track', soc: 'axis-track axis-track--society', geo: 'axis-track axis-track--global' };
const PERSON_FORM = {
  'social-democracy': 'a Social Democrat',
  liberalism: 'a Liberal',
  conservatism: 'a Conservative',
  'democratic-socialism': 'a Democratic Socialist',
  libertarianism: 'a Libertarian',
  progressivism: 'a Progressive',
  'green-politics': 'a Green',
  centrism: 'a Centrist',
  'national-conservatism': 'a National Conservative',
  populism: 'a Populist'
};

/* Mini map: 210 viewBox, plot area 25..185 (160px for 0-100). Liberty is up. */
const miniX = (v) => Math.round((25 + 1.6 * v) * 10) / 10;
const miniY = (v) => Math.round((25 + 1.6 * (100 - v)) * 10) / 10;

function miniMapSvg(pos) {
  return `
      <svg width="210" height="210" viewBox="0 0 210 210" role="img" aria-label="Position of this ideology on the economic and liberty axes">
        <rect x="25" y="25" width="80" height="80" fill="#F6E3E0"/>
        <rect x="105" y="25" width="80" height="80" fill="#E2E7F0"/>
        <rect x="25" y="105" width="80" height="80" fill="#E4EAD9"/>
        <rect x="105" y="105" width="80" height="80" fill="#F2E9D4"/>
        <line x1="105" y1="18" x2="105" y2="192" stroke="#B9B6AC" stroke-width="1"/>
        <line x1="18" y1="105" x2="192" y2="105" stroke="#B9B6AC" stroke-width="1"/>
        <text x="105" y="12" text-anchor="middle" font-family="Inter, sans-serif" font-size="9.5" font-weight="600" fill="#4A4850">LIBERTY</text>
        <text x="105" y="204" text-anchor="middle" font-family="Inter, sans-serif" font-size="9.5" font-weight="600" fill="#4A4850">AUTHORITY</text>
        <text x="9" y="108" text-anchor="middle" transform="rotate(-90 9 108)" font-family="Inter, sans-serif" font-size="9.5" font-weight="600" fill="#4A4850">LEFT</text>
        <text x="201" y="108" text-anchor="middle" transform="rotate(90 201 108)" font-family="Inter, sans-serif" font-size="9.5" font-weight="600" fill="#4A4850">RIGHT</text>
        <circle cx="${miniX(pos.e)}" cy="${miniY(pos.c)}" r="9" fill="#3D6FA8" stroke="#FFFFFF" stroke-width="3"/>
      </svg>`;
}

function sitsAxes(pos, poles) {
  return AXIS_KEYS.map((k) => `
        <div>
          <div class="axis-labels"><span>${AXIS_TITLES[k]}</span><span class="axis-value">${esc(poles[k])}</span></div>
          <div class="${AXIS_TRACK[k]}"><div class="axis-marker" style="left:${pos[k]}%"></div></div>
        </div>`).join('');
}

function guidePage(ideo, all) {
  const url = `${SITE.domain}/ideologies/${ideo.slug}/`;
  const related = ideo.related.map((r) => `
          <a class="related-card" href="${r.slug ? `/ideologies/${r.slug}/` : '/ideologies/'}">
            <div class="related-head">
              <h3>${esc(r.name)}</h3>
              <span class="pos-chip">${esc(r.chip)}</span>
            </div>
            <p>${esc(r.line)}</p>
          </a>`).join('');

  const beliefs = ideo.beliefs.map((b) => `
        <div class="belief-item">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>
          <div>${esc(b)}</div>
        </div>`).join('');

  const figures = ideo.figures.map((f) => `
          <div class="person-card">
            <div class="person-name">${esc(f.name)} <span class="person-life">· ${esc(f.life)}</span></div>
            <p>${esc(f.line)}</p>
          </div>`).join('');

  const faqItems = ideo.faq.map((f, i) => `
        <details class="faq-item"${i === 0 ? ' open' : ''}>
          <summary>${esc(f.q)}
            <svg class="faq-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6E6C76" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
          </summary>
          <p class="faq-a">${esc(f.a)}</p>
        </details>`).join('');

  const sources = [
    { label: `Wikipedia — ${ideo.name}`, url: `https://en.wikipedia.org/wiki/${encodeURIComponent(ideo.name.replace(/ /g, '_'))}` },
    ...(ideo.extraSources || [])
  ];
  const sourceItems = sources
    .map((s) => `        <li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`)
    .concat('        <li><a href="/methodology/">How the Political Spectrum Test scores and matches</a></li>')
    .join('\n');

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': url + '#faq',
    mainEntity: ideo.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': url + '#article',
        headline: `${ideo.name} — What It Believes and Where It Sits`,
        description: ideo.desc,
        datePublished: LASTMOD,
        dateModified: LASTMOD,
        inLanguage: 'en',
        isPartOf: { '@id': SITE.domain + '/#website' },
        about: { '@type': 'Thing', name: ideo.name },
        author: { '@id': SITE.domain + '/#organization' },
        publisher: { '@id': SITE.domain + '/#organization' }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain + '/' },
          { '@type': 'ListItem', position: 2, name: 'Ideology Guides', item: SITE.domain + '/ideologies/' },
          { '@type': 'ListItem', position: 3, name: ideo.name }
        ]
      }
    ]
  };

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(ideo.name)} — Beliefs &amp; Spectrum Position</title>
<meta name="description" content="${esc(ideo.desc)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">
<meta name="theme-color" content="#F8F7F4">
<link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<meta property="og:type" content="article">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(ideo.name)} — What It Believes and Where It Sits">
<meta property="og:description" content="${esc(ideo.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.domain}/assets/img/og-cover.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/assets/css/style.css">
<script src="/assets/js/analytics.js" defer></script>
<script type="application/ld+json">${JSON.stringify(articleSchema)}</script>
<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${header({ gradientId: 'lg-' + ideo.slug.replace(/-/g, ''), navActive: 'guides' })}
<main id="main">

  <section class="container guide-hero" style="padding-top:56px">
    <div class="breadcrumbs"><a href="/">Home</a><span class="sep">/</span><a href="/ideologies/">Guides</a><span class="sep">/</span><span style="color:var(--ink); font-weight:500">${esc(ideo.name)}</span></div>
    <p class="eyebrow" style="margin-top:22px">Political ideology guide</p>
    <h1>${esc(ideo.name)}</h1>
    <p class="guide-lede">${esc(ideo.lede)}</p>
    <p class="page-meta">Last updated ${LASTMOD}</p>
  </section>

  <section class="container" style="padding-top:44px">
    <div class="sits-card">
      <div class="sits-map">
        ${miniMapSvg(ideo.pos)}
        <div class="sits-caption">Where ${esc(ideo.name)} sits</div>
      </div>
      <div>
        <h2 style="font-family:var(--font-body); font-size:18px; font-weight:600; margin:0">On the four dimensions</h2>
        <div class="sits-axes" style="margin-top:20px">${sitsAxes(ideo.pos, ideo.poles)}
        </div>
        <p style="margin-top:18px; font-size:13px; color:var(--faint)">Approximate placement — real ideologies are internally diverse. See the <a href="/methodology/">methodology</a>.</p>
      </div>
    </div>
  </section>

  <section class="container section" style="padding-top:56px">
    <h2 style="font-size:30px">Core beliefs</h2>
    <div class="belief-grid">${beliefs}
    </div>
  </section>

  <section class="container" style="padding-top:8px">
    <div class="guide-cols">
      <div>
        <h2 style="font-size:30px">Key figures</h2>
        <div class="stack-list">${figures}
        </div>
      </div>
      <div>
        <h2 style="font-size:30px">Neighbours on the spectrum</h2>
        <div class="stack-list">${related}
        </div>
      </div>
    </div>
  </section>

  <section class="container section" style="padding-top:56px">
    <h2 style="font-size:30px">${esc(ideo.name)} — questions, answered</h2>
    <div class="faq-list" style="max-width:900px">${faqItems}
    </div>
  </section>

  <section class="container section" style="padding-top:56px">
    <h2 style="font-size:30px">Sources &amp; further reading</h2>
    <ul class="sources-list">
${sourceItems}
    </ul>
    <p style="margin-top:16px; font-size:13px; color:var(--faint)">Outbound links are for independent reading — we don’t control their content.</p>
  </section>
${ctaBand(`How close are you to ${PERSON_FORM[ideo.slug] || ideo.name + ' supporters'}?`, 'Take the free test and compare yourself against 14 ideologies — right on your own device.')}${footerSlim()}
</main>
</body>
</html>
`;
}

/* ---------- Guides hub ---------- */
function hubPage(all) {
  const url = SITE.domain + '/ideologies/';
  const cards = all.map((i) => `
      <a class="idea-card" href="/ideologies/${i.slug}/">
        <div style="display:flex; justify-content:space-between; gap:8px; align-items:center">
          <h3>${esc(i.name)}</h3>
          <span class="pos-chip" style="background:var(--soft); color:var(--faint); font-size:11px; font-weight:600; border-radius:999px; padding:4px 10px; white-space:nowrap">${esc(i.poles.econ)}</span>
        </div>
        <p>${esc(i.tagline)}</p>
      </a>`).join('');

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': url,
        name: 'Ideology Guides — Explore the Political Spectrum',
        url,
        description: 'Plain-English guides to the major political ideologies: what they believe, key figures, and where each sits on the spectrum.',
        isPartOf: { '@id': SITE.domain + '/#website' },
        hasPart: all.map((i) => ({ '@type': 'Article', name: i.name, url: `${SITE.domain}/ideologies/${i.slug}/` }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain + '/' },
          { '@type': 'ListItem', position: 2, name: 'Ideology Guides' }
        ]
      }
    ]
  };

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ideology Guides — Explore the Political Spectrum</title>
<meta name="description" content="Plain-English guides to 10 political ideologies: beliefs, key figures, FAQs, and where each sits on the spectrum — with a free test to find yours.">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${url}">
<link rel="alternate" hreflang="x-default" href="${url}">
<meta name="theme-color" content="#F8F7F4">
<link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="Ideology Guides — Explore the Political Spectrum">
<meta property="og:description" content="Plain-English guides to 10 major political ideologies: beliefs, key figures, and where each sits on the spectrum.">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.domain}/assets/img/og-cover.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/assets/css/style.css">
<script src="/assets/js/analytics.js" defer></script>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${header({ gradientId: 'lg-hub', navActive: 'guides' })}
<main id="main">
  <section class="container" style="padding-top:72px">
    <p class="eyebrow">Ideology guides</p>
    <h1 style="font-size:clamp(38px,5vw,56px); margin-top:16px">Explore the Spectrum</h1>
    <p class="guide-lede">Ten plain-English guides to the traditions that shape modern politics — what each believes, who led it, who its neighbours are, and the questions people actually ask about it.</p>
    <div style="max-width:820px; margin-top:20px">
      <p style="margin:0; font-size:15.5px; line-height:1.75; color:var(--ink-soft)">Every guide follows the same structure: a one-paragraph definition, where the tradition sits on our four dimensions, its core beliefs, three key figures, its neighbours on the spectrum, and the questions people actually ask about it. The dimensions are the same ones the test measures — <strong>economy</strong> (public versus market), <strong>civil liberties</strong> (liberty versus order), <strong>society</strong> (tradition versus change), and <strong>global outlook</strong> (nation versus one world) — so what you read here maps directly onto what you score there.</p>
      <p style="margin:14px 0 0; font-size:15.5px; line-height:1.75; color:var(--ink-soft)">Read them before the test to know what to look for, or after it to put your result in context. “Neighbour on the spectrum” is a description of position, never a judgment of worth — and every guide links to independent sources if you want to go deeper than a summary can take you.</p>
      <p style="margin:14px 0 0; font-size:15.5px; line-height:1.75; color:var(--ink-soft)">Not sure where to start? <a href="/ideologies/social-democracy/">Social Democracy</a> and <a href="/ideologies/liberalism/">Liberalism</a> anchor the centre-left and the centre-right — follow the neighbour links wherever your curiosity goes.</p>
    </div>
  </section>

  <section class="container" style="padding-top:44px">
    <div class="idea-grid" style="grid-template-columns:repeat(3, minmax(0,1fr))">${cards}
    </div>
    <p style="margin-top:24px; font-size:13.5px; color:var(--faint)">Communism, social liberalism, and anarchism also appear in the test’s matching engine — guides for them are on the way.</p>
  </section>
${ctaBand('Where do you sit on the spectrum?', 'Take the free 24-question test and see which of these traditions your answers resemble — computed entirely on your device.')}${footerSlim()}
</main>
</body>
</html>
`;
}

/* ---------- Sitemap ---------- */
function sitemap(all) {
  const urls = [
    { loc: '/', priority: '1.0' },
    { loc: '/test/', priority: '0.9' },
    { loc: '/ideologies/', priority: '0.8' },
    { loc: '/methodology/', priority: '0.7' },
    { loc: '/about/', priority: '0.5' },
    { loc: '/privacy/', priority: '0.3' },
    ...all.map((i) => ({ loc: `/ideologies/${i.slug}/`, priority: '0.8' }))
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${SITE.domain}${u.loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
}

/* ---------- Write everything ---------- */
mkdirSync(join(OUT, 'ideologies'), { recursive: true });
for (const ideo of ideologies) {
  const dir = join(OUT, 'ideologies', ideo.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), guidePage(ideo, ideologies));
  console.log('✓ wrote', `site/ideologies/${ideo.slug}/index.html`);
}
writeFileSync(join(OUT, 'ideologies', 'index.html'), hubPage(ideologies));
console.log('✓ wrote site/ideologies/index.html');
writeFileSync(join(OUT, 'sitemap.xml'), sitemap(ideologies));
console.log('✓ wrote site/sitemap.xml');
