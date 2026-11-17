// ERNIE adjudication: independent implementation (not a re-run of decomp.mjs).
// Layer 1  aggregate sack rate
// Layer 2  Kitagawa-Oaxaca at two granularities: (a) the 160-cell Ernie used, (b) the engine's own rec cells
// Layer 3  score-bucket redistribution (Glyph's test)
// Layer 4  within-cell sack rate by down and by the level the class sampler actually used
import fs from 'node:fs';
import { makePack } from '/tmp/glmrec2/colors/src/core/pack.ts';
import { gameKeyOf } from '/tmp/glmrec2/colors/src/core/keyedrng.ts';
import { loadPools, recKeys, binOf } from '/tmp/glmrec2/colors/src/sports/nfl/sim/pools.ts';
import { loadPassClass } from '/tmp/glmrec2/colors/src/sports/nfl/sim/passclass.ts';
import { runGame } from '/tmp/glmrec2/colors/src/sports/nfl/sim/game.ts';
import { at } from '/tmp/glmrec2/colors/src/core/at.ts';

const load = (n) => JSON.parse(fs.readFileSync('/tmp/glm/data/packs/' + n + '.json', 'utf8'));
const P = loadPools(makePack(load('nfl-pools-fit2023-2025')));
const M = loadPassClass(makePack(load('nfl-passclass-fit2023-2025')));
const N = Number(process.argv[2] || 12000);

// class-restricted sub-pool total, same rule as passclass.ts classPool
function classTotal(p, oc, cls) {
  let t = 0;
  for (let k = 0; k < p.ids.length; k++) {
    if (at(oc, p.ids[k]) !== cls) continue;
    t += p.cum[k] - (k > 0 ? p.cum[k - 1] : 0);
  }
  return t;
}
// which level the GLM sampler would land on for this cell+class
function glmLevel(keys, cls) {
  let last = -1;
  for (let L = 0; L < P.rec.length; L++) {
    const p = P.rec[L].get(keys[L]);
    if (p === undefined) continue;
    if (classTotal(p, P.tuples.oc, cls) > 0) {
      last = L;
      if (classTotal(p, P.tuples.oc, cls) >= M.minClassPool) return L;
    }
  }
  return last;
}

const yb = (y) => (y <= 3 ? 0 : y <= 6 ? 1 : y <= 10 ? 2 : 3);
const sb = (s) => (s <= -7 ? 0 : s < 0 ? 1 : s === 0 ? 2 : s <= 7 ? 3 : 4);
const SBN = ['trail-big', 'trail', 'tied', 'lead', 'lead-big'];

// per-play record
const rows = { pools: [], glm: [] };
for (let g = 0; g < N; g++) {
  const k = gameKeyOf('glm-bar:' + g);
  for (const [mode, out] of [['pools', runGame(P, k)], ['glm', runGame(P, k, { passClass: M })]]) {
    let sd = 0;
    const ev = out.events;
    for (const e of ev) {
      if (e.kind === 'score') { /* tracked below via running diff */ }
    }
    // running score to get sd at each snap
    let sc = [0, 0];
    let cur = null;
    const scoreAt = new Map();
    for (const e of ev) {
      if (e.kind === 'drive_start') cur = e.payload.team;
      else if (e.kind === 'score') { const i = e.payload.team === 'A' ? 0 : 1; sc[i] += e.payload.points; }
      else if (e.kind === 'snap') {
        const p = e.payload;
        const my = p.team === 'A' ? 0 : 1;
        scoreAt.set(p.drive + ':' + p.down + ':' + p.ydl + ':' + p.ytg + ':' + p.hs, sc[my] - sc[1 - my]);
      }
    }
    // second pass with the state
    sc = [0, 0];
    for (const e of ev) {
      if (e.kind === 'score') { const i = e.payload.team === 'A' ? 0 : 1; sc[i] += e.payload.points; }
      else if (e.kind !== 'snap') continue;
      const p = e.payload;
      if (p.call !== 0) continue;                       // pass only
      const my = p.team === 'A' ? 0 : 1;
      const sd0 = sc[my] - sc[1 - my];
      const keys = recKeys(P.bins, p.call, p.down, p.ytg, p.ydl);
      rows[mode].push({
        down: p.down, ytg: p.ytg, ydl: p.ydl, sd: sd0,
        sack: p.sack ? 1 : 0, oc: p.oc,
        lvl: mode === 'glm' ? glmLevel(keys, p.oc) : -1,
        cell: keys[0],
      });
    }
  }
}

const A = rows.pools, B = rows.glm;
const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length;
const rate = (xs) => mean(xs.map((r) => r.sack));

console.log('ERNIE adjudication | architect tip 65673a00 | node ' + process.version + ' | ' + N + ' paired games');
console.log('independent implementation: the engine is run twice per key and each pass play is re-derived from the snap event');
console.log('(cell = recKeys level 0; lvl = the level the class-restricted sampler lands on, -1 for the pools node)\n');

// ---------- Layer 1 ----------
const nA = A.length, nB = B.length;
const rA = rate(A), rB = rate(B);
const se = (xs, r) => Math.sqrt(r * (1 - r) / xs.length);
console.log('LAYER 1 — aggregate');
console.log('  pass plays        pools ' + nA + '   glm ' + nB);
console.log('  sacks             pools ' + A.reduce((s, r) => s + r.sack, 0) + '   glm ' + B.reduce((s, r) => s + r.sack, 0));
console.log('  sack rate         pools ' + (rA * 100).toFixed(4) + '%   glm ' + (rB * 100).toFixed(4) + '%');
console.log('  difference        ' + ((rB - rA) * 100).toFixed(4) + ' points   SE ' + (se(A, rA) * 100).toFixed(4) + ' / ' + (se(B, rB) * 100).toFixed(4));

// ---------- Layer 2: Kitagawa-Oaxaca, my own code ----------
function ko(keyfn, label) {
  const g = new Map();
  for (const r of A) { const k = keyfn(r); let e = g.get(k); if (!e) { e = { np: 0, sp: 0, ng: 0, sg: 0 }; g.set(k, e); } e.np++; e.sp += r.sack; }
  for (const r of B) { const k = keyfn(r); let e = g.get(k); if (!e) { e = { np: 0, sp: 0, ng: 0, sg: 0 }; g.set(k, e); } e.ng++; e.sg += r.sack; }
  const cells = [...g.values()];
  const NP = cells.reduce((s, c) => s + c.np, 0), NG = cells.reduce((s, c) => s + c.ng, 0);
  let rateEff = 0, mixEff = 0;
  for (const c of cells) {
    const rp = c.np ? c.sp / c.np : 0, rg = c.ng ? c.sg / c.ng : 0;
    const wp = c.np / NP, wg = c.ng / NG;
    rateEff += 0.5 * (wp + wg) * (rg - rp);
    mixEff += 0.5 * (rp + rg) * (wg - wp);
  }
  console.log('\nLAYER 2' + label + ' — Kitagawa-Oaxaca, ' + cells.length + ' cells');
  console.log('  total difference  ' + ((rB - rA) * 100).toFixed(4) + ' points');
  console.log('  rate effect       ' + (rateEff * 100).toFixed(4) + ' points   (' + (rateEff / (rB - rA) * 100).toFixed(1) + '% of the total)');
  console.log('  mix  effect       ' + (mixEff * 100).toFixed(4) + ' points   (' + (mixEff / (rB - rA) * 100).toFixed(1) + '%)');
  console.log('  sum check         ' + ((rateEff + mixEff) * 100).toFixed(4));
  return { rateEff, mixEff, cells: cells.length };
}
ko((r) => r.down * 1000 + yb(r.ytg) * 100 + (r.ydl > 50 ? 0 : 10) + sb(r.sd), ' (a) — Ernie 160-cell: down x ytg-bin x side x score-bin');
ko((r) => r.cell, ' (b) — the engine own rec cell (call, down, distBin, ydlBin)');
ko((r) => r.down, ' (c) — down only');
ko((r) => r.cell * 10 + sb(r.sd), ' (d) — engine rec cell x score-bin  [the test that separates Camp A from Camp B]');
ko((r) => r.down * 10 + sb(r.sd), ' (e) — down x score-bin');
ko((r) => r.cell * 10 + yb(r.ytg), ' (f) — engine rec cell x ytg-bin');


// ---------- Layer 3: Glyph score-bucket redistribution ----------
console.log('\nLAYER 3 — score-bucket redistribution (Glyph)');
console.log('  bucket        n_pools   n_glm    share_pools  share_glm   rate_pools  rate_glm   diff(pp)');
for (let b = 0; b < 5; b++) {
  const a = A.filter((r) => sb(r.sd) === b), c = B.filter((r) => sb(r.sd) === b);
  const ra = rate(a), rc = rate(c);
  console.log('  ' + SBN[b].padEnd(12) + String(a.length).padStart(8) + String(c.length).padStart(9) +
    (a.length / nA * 100).toFixed(3).padStart(12) + (c.length / nB * 100).toFixed(3).padStart(11) +
    (ra * 100).toFixed(3).padStart(12) + (rc * 100).toFixed(3).padStart(10) + ((rc - ra) * 100).toFixed(3).padStart(10));
}

// ---------- Layer 4: within-cell by down and by level ----------
console.log('\nLAYER 4 — sack rate per pass attempt by down');
console.log('  down   n_pools  n_glm   rate_pools  rate_glm   diff(pp)   rel%');
for (let d = 1; d <= 4; d++) {
  const a = A.filter((r) => r.down === d), c = B.filter((r) => r.down === d);
  const ra = rate(a), rc = rate(c);
  console.log('  ' + d + '     ' + String(a.length).padStart(7) + String(c.length).padStart(8) +
    (ra * 100).toFixed(3).padStart(11) + (rc * 100).toFixed(3).padStart(10) + ((rc - ra) * 100).toFixed(3).padStart(10) + ((rc / ra - 1) * 100).toFixed(2).padStart(8));
}

console.log('\nLAYER 4b — GLM only: sack rate by the level the class sampler landed on');
console.log('  (L0 = it stayed in the down-aware cell; L>0 = it fell back to a coarser, down-blind cell)');
console.log('  level   n_glm    share   rate_glm   (pools rate on the same plays is not defined: the pools node never visits these levels)');
for (const L of [0, 1, 2, 3]) {
  const c = B.filter((r) => r.lvl === L);
  if (!c.length) continue;
  console.log('  L' + L + '     ' + String(c.length).padStart(7) + (c.length / nB * 100).toFixed(2).padStart(8) + (rate(c) * 100).toFixed(3).padStart(10));
}
const l0 = B.filter((r) => r.lvl === 0), lpos = B.filter((r) => r.lvl > 0);
console.log('  L0 vs L>0 relative rate: ' + ((rate(lpos) / rate(l0) - 1) * 100).toFixed(2) + '%');
console.log('  L0 share of 4th-down pass plays: ' + (l0.filter((r) => r.down === 4).length / B.filter((r) => r.down === 4).length * 100).toFixed(2) + '%');

// ---------- the split: how much of the aggregate rate effect is the 4th-down cell? ----------
const d4 = B.filter((r) => r.down === 4), d123 = B.filter((r) => r.down !== 4);
const a4 = A.filter((r) => r.down === 4), a123 = A.filter((r) => r.down !== 4);
const contrib = (a, b) => (b.length / nB) * (rate(b) - rate(a)) * 100;   // pp of aggregate
console.log('\nLAYER 5 — who carries the aggregate rate effect');
console.log('  share of GLM pass plays that are 4th down: ' + (d4.length / nB * 100).toFixed(2) + '%');
console.log('  contribution to the aggregate (pp):  4th down ' + contrib(a4, d4).toFixed(4) + '   downs 1-3 ' + contrib(a123, d123).toFixed(4) + '   sum ' + (contrib(a4, d4) + contrib(a123, d123)).toFixed(4));
console.log('  (measured total ' + ((rB - rA) * 100).toFixed(4) + ' pp)');