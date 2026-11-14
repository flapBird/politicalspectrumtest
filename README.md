# Political Spectrum Test

A free, non-partisan educational website at **politicalspectrumtest.online**: a 24-question political ideology quiz that maps your beliefs across four dimensions (economy, civil liberties, society, global outlook), matches you against 14 ideologies, and explains the spectrum with plain-English guides.

## Key properties

- **Static site.** Everything under `site/` is plain HTML/CSS/JS — deployable to any static host (Cloudflare Pages, Netlify, GitHub Pages, nginx). No build step needed for the core pages.
- **Private by design.** The quiz scores entirely in the browser (no accounts, no cookies, no analytics, no server-side storage). Progress and results live in `localStorage` (`pst_progress_v1`, `pst_result_v1`). Share links carry only the four dimension scores.
- **SEO-first.** Content is in the first-screen HTML; every page has canonical + hreflang (`en` + `x-default`), OG/Twitter meta, and JSON-LD (WebSite, Organization, WebApplication, FAQPage, Article, BreadcrumbList, CollectionPage). `sitemap.xml` and `robots.txt` included. Fonts (Fraunces + Inter, both OFL) are self-hosted — zero third-party requests.

## Structure

```
designs/political-spectrum-test/   Design canvas (claude-design artifacts: artboards)
data/ideologies.mjs                Content data for the 10 ideology guides
build.mjs                          Generates site/ideologies/** and site/sitemap.xml
scripts/generate-images.mjs        Generates favicon PNGs + og-cover.png (pure Node)
site/                              The deployable website
├── index.html                     Homepage (hero → sample result → dimensions → how → guides → FAQ)
├── test/                          The 24-question quiz
├── results/                       Result page (map, axes, matches, share)
├── ideologies/<slug>/             10 ideology guides + hub page
├── methodology/ about/ privacy/   Trust pages
├── 404.html
└── assets/                        css / js / self-hosted fonts / images
```

## Commands

```bash
node build.mjs                    # regenerate ideology guides + sitemap after editing data/
node scripts/generate-images.mjs  # regenerate favicon/OG images
python3 -m http.server -d site 8080   # local preview
```

## Editing content

- **Questions / scoring / ideologies (matching engine):** `site/assets/js/test.js` (QUESTIONS) and `site/assets/js/results.js` (IDEOLOGIES reference positions + band descriptions). Keep the two engines' axis conventions in sync: `e` 0=left→100=right, `c` 0=order→100=liberty, `s` 0=tradition→100=change, `g` 0=nation→100=one world.
- **Ideology guide pages:** edit `data/ideologies.mjs`, then run `node build.mjs`.
- **Analytics:** GA4 (via GTM container `GTM-TK3S6NTX`) + Microsoft Clarity (`zdgwt1geja`), loaded only through `site/assets/js/analytics.js`, which hard-gates localhost/127.0.0.1/::1/`*.local`/private-IP/`file:` origins — they never fire in local development. If analytics change, update the privacy page in the same round.

## Deployment notes

- Point the domain at the host and upload the contents of `site/` as the web root.
- Configure all-traffic HTTPS; the canonical URLs assume `https://politicalspectrumtest.online/`.
- Non-root hosts: `404.html` is the error page; `/results/` is `noindex` and excluded from `robots.txt` to avoid indexing per-user share URLs (share links still work).
