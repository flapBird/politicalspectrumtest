/* Site analytics loader — GA4 (via Google Tag Manager) + Microsoft Clarity.
   ALLOWLIST mode: analytics fire ONLY on the production domain
   (politicalspectrumtest.online / www.politicalspectrumtest.online).
   Everything else injects no scripts and makes no external requests:
   - local development: localhost, 127.0.0.1, ::1, *.local / *.localhost,
     bare hostnames, private / loopback / link-local IPs, file://
   - Cloudflare preview deployments: *.pages.dev
   - staging hosts and any other mirror
   If the site later runs on another production domain, add it to ALLOWED. */
(function () {
  'use strict';

  var host = (window.location.hostname || '').toLowerCase();
  var protocol = window.location.protocol;

  /* Only ever run on http(s). */
  if (protocol !== 'https:' && protocol !== 'http:') return;

  /* Production domains only — previews, staging and local origins stay silent. */
  var ALLOWED = ['politicalspectrumtest.online', 'www.politicalspectrumtest.online'];
  if (ALLOWED.indexOf(host) === -1) return;

  /* --- Google Tag Manager (GA4 flows through container GTM-TK3S6NTX) --- */
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var gtm = document.createElement('script');
  gtm.async = true;
  gtm.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-TK3S6NTX';
  document.head.appendChild(gtm);

  /* --- Microsoft Clarity (project zdgwt1geja) --- */
  window.clarity = window.clarity || function () {
    (window.clarity.q = window.clarity.q || []).push(arguments);
  };
  var clarity = document.createElement('script');
  clarity.async = true;
  clarity.src = 'https://www.clarity.ms/tag/zdgwt1geja';
  document.head.appendChild(clarity);
})();
