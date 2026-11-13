/* Generates favicon PNGs and the OG cover image (pure Node, no dependencies).
   Run: node scripts/generate-images.mjs */
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const IMG = join(ROOT, '..', 'site', 'assets', 'img');
mkdirSync(IMG, { recursive: true });

/* ---------- minimal PNG writer ---------- */
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function chunk(type, data) {
  const out = Buffer.alloc(8 + data.length + 4);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, 'ascii');
  data.copy(out, 8);
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length);
  return out;
}
function writePng(path, w, h, pixels /* Uint8Array RGBA */) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0; // filter: none
    for (let x = 0; x < w * 4; x++) {
      raw[y * (w * 4 + 1) + 1 + x] = pixels[y * w * 4 + x];
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
  writeFileSync(path, png);
  console.log('✓ wrote', path.replace(ROOT + '/..', 'site'));
}

/* ---------- spectrum helpers ---------- */
const STOPS = [
  [0, 0xD6, 0x45, 0x50],
  [0.34, 0xE3, 0x9B, 0x2D],
  [0.63, 0x7C, 0x9C, 0x62],
  [1, 0x3D, 0x6F, 0xA8]
];
function spectrum(t) {
  for (let i = 1; i < STOPS.length; i++) {
    if (t <= STOPS[i][0] || i === STOPS.length - 1) {
      const [t0, r0, g0, b0] = STOPS[i - 1];
      const [t1, r1, g1, b1] = STOPS[i];
      const k = (t - t0) / (t1 - t0 || 1);
      return [
        Math.round(r0 + (r1 - r0) * k),
        Math.round(g0 + (g1 - g0) * k),
        Math.round(b0 + (b1 - b0) * k)
      ];
    }
  }
}

/* Draw a gradient ring onto an RGBA canvas (with alpha antialiasing).
   Gradient maps across the ring's own bounding box so the full spectrum shows. */
function drawRing(px, w, h, cx, cy, radius, stroke, bg /* null = transparent */) {
  const gx0 = cx - radius - stroke / 2;
  const gx1 = cx + radius + stroke / 2;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = x + 0.5 - cx, dy = y + 0.5 - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const edge = stroke / 2 - Math.abs(dist - radius);
      const alpha = Math.max(0, Math.min(1, edge + 0.5));
      if (alpha <= 0 && bg) continue;
      const i = (y * w + x) * 4;
      const t = Math.max(0, Math.min(1, (x + 0.5 - gx0) / (gx1 - gx0)));
      const [r, g, b] = spectrum(t);
      if (bg) {
        px[i] = Math.round(r * alpha + bg[0] * (1 - alpha));
        px[i + 1] = Math.round(g * alpha + bg[1] * (1 - alpha));
        px[i + 2] = Math.round(b * alpha + bg[2] * (1 - alpha));
        px[i + 3] = 255;
      } else {
        px[i] = r; px[i + 1] = g; px[i + 2] = b;
        px[i + 3] = Math.round(alpha * 255);
      }
    }
  }
}
function fill(px, w, h, color) {
  for (let i = 0; i < w * h * 4; i += 4) {
    px[i] = color[0]; px[i + 1] = color[1]; px[i + 2] = color[2]; px[i + 3] = 255;
  }
}
function drawRoundedBar(px, w, h, x0, y0, bw, bh) {
  const r = bh / 2;
  for (let y = y0; y < y0 + bh; y++) {
    for (let x = x0; x < x0 + bw; x++) {
      // rounded ends: reject pixels outside end circles
      if (x < x0 + r && Math.hypot(x - (x0 + r), y - (y0 + r)) > r) continue;
      if (x > x0 + bw - r && Math.hypot(x - (x0 + bw - r), y - (y0 + r)) > r) continue;
      const i = (y * w + x) * 4;
      const t = Math.max(0, Math.min(1, (x - x0) / bw));
      const [cr, cg, cb] = spectrum(t);
      px[i] = cr; px[i + 1] = cg; px[i + 2] = cb; px[i + 3] = 255;
    }
  }
}

const PAPER = [0xF8, 0xF7, 0xF4];

/* favicon-32.png — ring on transparent */
{
  const w = 32, h = 32, px = new Uint8Array(w * h * 4);
  drawRing(px, w, h, 16, 16, 11, 6, null);
  writePng(join(IMG, 'favicon-32.png'), w, h, px);
}

/* apple-touch-icon.png — 180×180, opaque paper background */
{
  const w = 180, h = 180, px = new Uint8Array(w * h * 4);
  fill(px, w, h, PAPER);
  drawRing(px, w, h, 90, 90, 58, 32, PAPER);
  writePng(join(IMG, 'apple-touch-icon.png'), w, h, px);
}

/* og-cover.png — 1200×630 brand card */
{
  const w = 1200, h = 630, px = new Uint8Array(w * h * 4);
  fill(px, w, h, PAPER);
  drawRing(px, w, h, 600, 250, 150, 74, PAPER);
  drawRoundedBar(px, w, h, 300, 470, 600, 26);
  writePng(join(IMG, 'og-cover.png'), w, h, px);
}
