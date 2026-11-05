#!/usr/bin/env node
// council-telemetry.mjs — catch-rate curves per seat (Pickle's idea, w74).
//
// What it measures: for every review file in the council's inboxes, the review governor's
// numbers — FOUND: <n> (findings in the review) and NEW: <n> (findings no earlier review
// had) — become a per-seat unique-catch rate = NEW/FOUND. The review governor stops
// reviewing an item when the latest review finds <10% new; this script shows the
// process's actual catch curve, per seat, from the real files.
//
// Sources: review files live on each seat's branch as inbox/<UTC>-<seat>-<ID>-review.md.
// The script reads whatever refs you give it (default: the branches this machine has).
//
// Usage:
//   node tools/council-telemetry.mjs [--refs origin/architect/engine-and-seats,…] \
//        [--json out/telemetry.json] [--html out/telemetry.html]
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i >= 0 ? process.argv[i + 1] : d; };
const refs = (arg('refs', 'origin/architect/engine-and-seats,origin/council/muse,origin/council/beam,origin/council/base,origin/main,origin/council/glm') || '').split(',').filter(Boolean);
const jsonOut = arg('json', 'out/telemetry.json');
const htmlOut = arg('html', 'out/telemetry.html');

// ---- collect review files ----
const reviews = [];
for (const ref of refs) {
  let files = [];
  try { files = execSync(`git ls-tree -r ${ref} --name-only`, { encoding: 'utf8', maxBuffer: 64e6 })
    .split('\n').filter((f) => f.startsWith('inbox/') && /review/.test(f)); } catch { continue; }
  for (const f of files) {
    let text = '';
    try { text = execSync(`git show ${ref}:${f}`, { encoding: 'utf8', maxBuffer: 16e6 }); } catch { continue; }
    const seat = (f.match(/inbox\/\d{8}-\d{4}-([a-z0-9]+)-/) || [])[1] ?? 'unknown';
    const id = (f.match(/-(P\d+|E\d+|N\d+|Q\d+)-/) || (f.match(/-(P\d+|E\d+|N\d+|Q\d+)-/) ? [] : f.match(/-([A-Z]-?\d+)-/)) || [])[1] ?? null;
    const verdict = (text.match(/VERDICT:\s*(ok|improved|rejected)/i) || [])[1] ?? null;
    const found = Number((text.match(/^FOUND:\s*(\d+)/mi) || [])[1]);
    const neu = Number((text.match(/^NEW:\s*(\d+)/mi) || [])[1]);
    const has = Number.isFinite(found) && Number.isFinite(neu) && (text.match(/^FOUND:/mi) !== null);
    reviews.push({ ref, file: f, seat, item: id, verdict,
      found: has ? found : null, neu: has ? neu : null,
      // governor defaults (COUNCIL.md §2b): ok = 0/0; improved/rejected = 1/1 when headers absent
      catch: has && found > 0 ? neu / found : verdict === 'ok' ? 0 : verdict ? 1 : null,
      date: (f.match(/(\d{8})-(\d{4})/) || [])[1] ?? null });
  }
}

// ---- per-seat aggregates ----
const bySeat = {};
for (const r of reviews) {
  const s = bySeat[r.seat] ??= { reviews: 0, withNumbers: 0, catches: [], verdicts: { ok: 0, improved: 0, rejected: 0 } };
  s.reviews++;
  if (r.verdict) s.verdicts[r.verdict.toLowerCase()] = (s.verdicts[r.verdict.toLowerCase()] ?? 0) + 1;
  if (r.catch !== null) { s.catches.push(r.catch); s.withNumbers++; }
}
const seats = Object.fromEntries(Object.entries(bySeat).map(([k, v]) => [k, {
  reviews: v.reviews,
  withCatchNumbers: v.withNumbers,
  medianCatch: v.catches.length ? +(v.catches.slice().sort((a, b) => a - b)[v.catches.length >> 1] * 100).toFixed(0) : null,
  verdicts: v.verdicts,
}]));
const allCatches = reviews.filter((r) => r.catch !== null).map((r) => r.catch).sort((a, b) => a - b);
const result = {
  generated: new Date().toISOString(),
  refs, reviews: reviews.length,
  seats: Object.keys(seats).length,
  medianCatch: allCatches.length ? +(allCatches[allCatches.length >> 1] * 100).toFixed(0) : null,
  bySeat: seats,
  items: reviews.map(({ ref, file, seat, item, verdict, found, neu, catch: c, date }) => ({ ref, file, seat, item, verdict, found, neu, catch: c, date })),
};

// ---- static page (no server, no dependencies) ----
const seatNames = Object.keys(seats);
const colors = ['#8e5566', '#b08d3f', '#3f6f5f', '#5a6b8c', '#8c5a6b', '#6b8c5a'];
const maxReviews = Math.max(1, ...seatNames.map((s) => seats[s].reviews));
const bars = seatNames.map((s, i) => {
  const w = (seats[s].reviews / maxReviews) * 260;
  const c = colors[i % colors.length];
  return `<g transform="translate(180,${40 + i * 46})">
    <text x="-12" y="14" text-anchor="end" font-size="14" fill="#3a2e33">${s}</text>
    <rect x="0" y="2" width="${w}" height="18" fill="${c}" rx="4"/>
    <text x="${w + 8}" y="16" font-size="13" fill="#3a2e33">${seats[s].reviews} reviews · ${seats[s].withCatchNumbers} with counts · median catch ${seats[s].medianCatch === null ? '—' : seats[s].medianCatch + '%'}</text>
  </g>`;
}).join('\n');
const catchHist = allCatches.length ? (() => {
  const bins = new Array(10).fill(0);
  for (const c of allCatches) bins[Math.min(9, Math.floor(c * 10))]++;
  const maxB = Math.max(...bins);
  return bins.map((b, i) => {
    const h = maxB ? (b / maxB) * 120 : 0;
    return `<g transform="translate(${50 + i * 44},210)">
      <rect x="0" y="${130 - h}" width="34" height="${h}" fill="#b08d3f" rx="3"/>
      <text x="17" y="146" text-anchor="middle" font-size="11" fill="#3a2e33">${i * 10}-${i * 10 + 10}</text>
      <text x="17" y="${124 - h}" text-anchor="middle" font-size="11" fill="#3a2e33">${b || ''}</text>
    </g>`;
  }).join('\n');
})() : '';
const html = `<!doctype html>
<meta charset="utf-8"><title>Council telemetry — review catch rates</title>
<style>body{font-family:Georgia,serif;background:#faf6ef;color:#3a2e33;max-width:900px;margin:2rem auto;padding:0 1rem}
h1{font-size:1.5rem} .kpi{display:flex;gap:2rem;margin:1rem 0}
.kpi div{background:#fff;border:1px solid #e2d8c8;border-radius:8px;padding:.8rem 1.2rem}
.kpi b{font-size:1.6rem;display:block} svg text{font-family:Georgia,serif}</style>
<h1>Council telemetry — the review process, measured</h1>
<p>The review governor stops reviewing an item when the latest review finds fewer than
10% new findings (min 2 seats, cap 8). This page shows what the process actually caught,
from the review files themselves: per-seat volume and unique-catch rates
(catch = NEW/FOUND). Generated ${new Date().toISOString().slice(0, 10)}.</p>
<div class="kpi">
  <div><b>${result.reviews}</b> reviews filed</div>
  <div><b>${result.seats}</b> seats reviewing</div>
  <div><b>${result.medianCatch === null ? '—' : result.medianCatch + '%'}</b> median unique-catch</div>
</div>
<svg width="860" height="${120 + seatNames.length * 46 + 230}" role="img" aria-label="Bar chart of reviews per seat; histogram of unique-catch rates">
  <text x="40" y="24" font-size="15" font-weight="bold">Reviews per seat (median unique-catch at right)</text>
  ${bars}
  <text x="50" y="${120 + seatNames.length * 46 + 40}" font-size="15" font-weight="bold">Unique-catch rate distribution (NEW/FOUND, 10-point bins)</text>
  ${catchHist}
</svg>
<p style="font-size:.85rem;color:#7a6a70">Method: FOUND/NEW headers per COUNCIL.md §2b; reviews without headers count as ok=0/0, improved/rejected=1/1
(the governor's defaults). Script: <code>tools/council-telemetry.mjs</code>; data: <code>out/telemetry.json</code>.</p>
<p style="font-size:.85rem;color:#7a6a70">Reading note (honest caveat): the FOUND/NEW headers were introduced 3 Nov 2026, so most counted reviews are
first reviews of their item — where every finding is unique by definition and catch reads 100%. The number that matters is the catch rate of
<i>later</i> reviews on the same item (the governor's &lt;10% stopping rule); the JSON keeps the item IDs so that curve can be drawn as the
two-reviewer dataset grows.</p>`;
fs.mkdirSync(jsonOut.split('/').slice(0, -1).join('/') || '.', { recursive: true });
fs.writeFileSync(jsonOut, JSON.stringify(result, null, 2));
fs.writeFileSync(htmlOut, html);
console.log(`reviews: ${result.reviews} · seats: ${result.seats} · median catch: ${result.medianCatch}%`);
console.log(`written: ${jsonOut}, ${htmlOut}`);
