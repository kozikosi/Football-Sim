// mathlab/flexderive.mjs [--d <thetaprice.md>] [--floor 6] [--cuts 1.5,4,9] [--literal] — READ-ONLY prototype: derive all flex prices from a formula and diff them against flex.json.
// Nothing here changes flex.json or the engine. Inputs: flex.json (the Owner's live table, the oracle), a D table (default results/thetaprice-2026-11-09.md, column D@90),
// skill-profiles-p322.json (Inkling's P-322 profile, transcribed). Re-run with --d <new table> when P-321 recomputes D, and read the fit again.
// Formula (Inkling P-322 section 3, implemented from the written spec): tier( max(0,D) + gate(A) + U ), with D from the table, A = skill gaps, U = named unlikeness deltas,
// override rows and the FB whitelist as explicit fiat. --floor N adds the cross-side floor (offense<->defense never cheaper than N) that the live table's header names.
// Prints: counts (exact / off-by-one / hard), every disagreement, a formula-only count (fiat rows excluded), and a cut-point re-fit. --cuts a,b,c tries other cut points; --literal reads the elite-line rule as written.
import fs from 'fs';
const dir = new URL('.', import.meta.url);
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const dFile = arg('--d', 'results/thetaprice-2026-11-09.md');
const floor = arg('--floor', null) == null ? null : Number(arg('--floor'));
const literal = process.argv.includes('--literal');                  // read the elite-line rule exactly as Inkling wrote it (dst==C only; never fires)
const live = JSON.parse(fs.readFileSync(new URL('flex.json', dir))).flex;
const P = JSON.parse(fs.readFileSync(new URL('skill-profiles-p322.json', dir)));
if (arg('--cuts', null)) P.cuts = arg('--cuts').split(',').map(Number);
const TIERS = [0, 2, 6, 12];

// ---- D table: "| rule | now | W@85 | W@90 | D@85 | D@90 | ..." ----
const D = {};
for (const l of fs.readFileSync(new URL(dFile, dir), 'utf8').split('\n')) {
  if (!/^\| [A-Z]+>[A-Z]+ /.test(l)) continue;
  const c = l.split('|').map((x) => x.trim()); D[c[1]] = parseFloat(c[6]);
}
const dBump = P.dBump || {};
const dOf = (k) => (k in dBump ? dBump[k] : k in D ? D[k] : 0);       // a rule with no D row (ILB>FS, OLB>FS) counts D = 0; flagged below
const noD = (k) => !(k in dBump) && !(k in D);

const tier = (x, cuts = P.cuts) => (x < cuts[0] ? 0 : x < cuts[1] ? 2 : x < cuts[2] ? 6 : 12);
const sideOf = (r) => (P.side.offense.includes(r) ? 'O' : P.side.defense.includes(r) ? 'D' : 'S');

function aOf(src, dst) {
  const ps = P.profile[src], pd = P.profile[dst]; let A = 0;
  for (const s of P.skills) {
    const sc = P.scope[s]; if (sc && !sc.includes(dst)) continue;
    const gap = Math.max(0, (pd[s] || 0) - (ps[s] || 0)); if (!gap) continue;
    if (s === 'BLK' && (ps.BLK || 0) >= P.eliteLine.blkMin && (pd.BLK || 0) >= P.eliteLine.blkMin && (literal ? dst === 'C' : true)) continue;   // elite-line swap: D alone
    let w = P.beta[s];
    if (s === 'COV' && P.covDmult[dst]) w *= P.covDmult[dst];
    if ((ps.CTH || 0) >= P.catcherCut.ctHmin && P.catcherCut.skills.includes(s)) w *= P.catcherCut.factor;
    A += w * gap;
  }
  return A;
}
function rawOf(src, dst) {                                            // the continuous score the cut points are applied to; null = fiat row (no score)
  const k = `${src}>${dst}`;
  if (k in P.override) return null;
  if (dst === 'FB' && P.fbFree.includes(src)) return null;
  const d = Math.max(0, dOf(k)); let A = aOf(src, dst);
  A *= d >= P.gate.hi ? 0 : d >= P.gate.lo ? P.gate.midFactor : 1;
  return d + A + (P.U[k] || 0);
}
function price(src, dst, cuts = P.cuts) {
  const k = `${src}>${dst}`;
  if (k in P.override) return { p: P.override[k], how: 'override' };
  if (dst === 'FB' && P.fbFree.includes(src)) return { p: 0, how: 'fb-free' };
  let p = tier(rawOf(src, dst), cuts);
  const cross = floor != null && sideOf(src) !== sideOf(dst) && sideOf(src) !== 'S' && sideOf(dst) !== 'S';
  if (cross && p < floor) p = floor;
  return { p, how: k in P.U ? 'formula+U' : 'formula' };
}

// ---- diff against the live table ----
const rows = [];
for (const s of Object.keys(live)) for (const d of Object.keys(live[s])) {
  if (!P.profile[s] || !P.profile[d]) { rows.push({ k: `${s}>${d}`, own: live[s][d], skip: true }); continue; }
  const m = price(s, d); rows.push({ k: `${s}>${d}`, own: live[s][d], model: m.p, how: m.how, raw: rawOf(s, d), noD: noD(`${s}>${d}`) });
}
const scored = rows.filter((r) => !r.skip);
const step = (a, b) => Math.abs(TIERS.indexOf(a) - TIERS.indexOf(b));
const exact = scored.filter((r) => r.own === r.model), off1 = scored.filter((r) => step(r.own, r.model) === 1), hard = scored.filter((r) => step(r.own, r.model) > 1);
const fiat = scored.filter((r) => r.how === 'override' || r.how === 'fb-free'), U = scored.filter((r) => r.how === 'formula+U');
const pure = scored.filter((r) => r.how === 'formula');
const out = [];
const log = (...a) => { const s = a.join(' '); console.log(s); out.push(s); };
log(`flexderive: ${scored.length} live rules scored (${rows.length - scored.length} skipped, no profile) | D table ${dFile} | floor ${floor ?? 'none'}`);
log(`exact ${exact.length} | off by one tier ${off1.length} | hard misses ${hard.length}`);
log(`by source: pure formula ${pure.filter((r) => r.own === r.model).length}/${pure.length} exact | formula+U ${U.filter((r) => r.own === r.model).length}/${U.length} | fiat (override + FB list) ${fiat.filter((r) => r.own === r.model).length}/${fiat.length}`);
log(`rules with no D row (D taken as 0): ${scored.filter((r) => r.noD).map((r) => r.k).join(' ') || 'none'}`);
log('disagreements (rule: owner -> model, raw score):');
[...off1, ...hard].sort((a, b) => a.k.localeCompare(b.k)).forEach((r) => log(`  ${r.k}: ${r.own} -> ${r.model}  raw ${r.raw == null ? '-' : r.raw.toFixed(2)}  [${r.how}]`));

// ---- cut-point re-fit (tiers fixed 0/2/6/12; only the three cut points move) ----
const grid = []; for (let x = 0.25; x <= 14; x += 0.25) grid.push(x);
function fit(rowsF, score) {
  let best = [];
  for (const a of grid) for (const b of grid) { if (b <= a) continue; for (const c of grid) { if (c <= b) continue;
    let n = 0; for (const r of rowsF) if (tier(score(r), [a, b, c]) === r.own) n++;
    best.push({ cuts: [a, b, c], n, dist: Math.abs(a - 1) + Math.abs(b - 4) + Math.abs(c - 9) }); } }
  best.sort((x, y) => y.n - x.n || x.dist - y.dist); return best;
}
const dOnly = scored.filter((r) => !noD(r.k) && r.how !== 'override' && r.how !== 'fb-free').map((r) => ({ ...r, d: Math.max(0, dOf(r.k)) }));
const f1 = fit(dOnly, (r) => r.d), at = (arr, c) => arr.find((x) => x.cuts.join() === c.join());
log(`cut-point re-fit, D alone (${dOnly.length} D-priced rules): at 1/4/9 -> ${at(f1, [1, 4, 9]).n} exact; best ${f1[0].n} at ${f1[0].cuts.join('/')}; top ties within 1: ${f1.filter((x) => x.n >= f1[0].n - 1).length} triples`);
const full = scored.filter((r) => r.raw != null);
const f2 = fit(full, (r) => r.raw), plateau = f2.filter((x) => x.n === f2[0].n);
log(`cut-point re-fit, full formula (${full.length} scored rules, floor ${floor ?? 'none'} not applied in the fit): at 1/4/9 -> ${at(f2, [1, 4, 9]).n} exact; best ${f2[0].n} at ${f2[0].cuts.join('/')}; ${plateau.length} triples tie at the best; nearest to 1/4/9: ${plateau.sort((a, b) => a.dist - b.dist)[0].cuts.join('/')}`);
