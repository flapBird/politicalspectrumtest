/* Site analytics loader — GA4 (via Google Tag Manager) + Microsoft Clarity.
   Hard-gated: NEVER injects anything on local or development origins —
   localhost, 127.0.0.1, ::1, *.local / *.localhost, bare hostnames,
   private / loopback / link-local IP ranges, and non-http(s) protocols
   (e.g. file://) produce no script injection and no external requests. */
(function () {
  'use strict';

  var host = (window.location.hostname || '').toLowerCase();
  var protocol = window.location.protocol;

  /* Only ever run on http(s). */
  if (protocol !== 'https:' && protocol !== 'http:') return;

  /* Local / dev hostnames. */
  if (host === 'localhost' || host === '::1' || host === '[::1]' || host === '' || host === '0.0.0.0') return;
  if (host.slice(0, 6) === '.local' || host.indexOf('.local') === host.length - 6) return;
  if (host.indexOf('.localhost') === host.length - 10) return;
  if (host.indexOf('.') === -1) return; /* bare hostname (dev box without a domain) */

  /* Private / loopback / link-local IPv4 ranges (10/8, 127/8, 172.16/12,
     192.168/16, 169.254/16, 0/8). */
  var ipv4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    var a = +ipv4[1], b = +ipv4[2];
    if (a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) ||
        (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)) return;
  }

  /* IPv6 loopback, unique-local (fc00::/7) and link-local (fe80::/10). */
  if (host.indexOf(':') !== -1) {
    var h = host.replace(/^\[|\]$/g, '');
    if (h === '::1' || /^f[cd]/.test(h) || /^fe[89ab]/.test(h)) return;
  }

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
