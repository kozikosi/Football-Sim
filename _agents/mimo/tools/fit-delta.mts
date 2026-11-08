// fit-delta.mts — the bias audit the Owner asked for (7 Nov): how much does each slot's MEASURED value
// move when the engine's fitted coefficients move, and does either fit echo the table it was aimed at?
// Three eras, one row per slot:
//   personal1000 = the OLD personal DEFAULT_WEIGHTS (Pre-Colors line 452, QB 320 scale → x3.125) — the
//                   Owner's made-up-by-preference table, the suspected bias source;
//   legacy        = derivedWeights under the pre-6-Nov coefficients (withLegacyCoefficients, the golden
//                   oracle) — the 28 Oct fitlm.js fit, which Beam reports was targeted at the personal table;
//   current       = derivedWeights under today's coefficients (the 6 Nov salary refit);
//   owner         = the Owner's 6 Nov salary table (== slots.ts, VERIFIED 32/32 by owner-weights-test).
// Read-only: imports the engine, prints, writes nothing into any repo.
// usage: node --experimental-strip-types _agents/mimo/tools/fit-delta.mts <colors-dir>
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const colorsDir = process.argv[2];
if (!colorsDir) { console.error('usage: fit-delta.mts <colors-dir>'); process.exit(4); }
const eng = (p: string) => pathToFileURL(path.join(colorsDir, p)).href;
const value = await import(eng('src/sports/nfl/engine/value.ts'));
const slotsMod = await import(eng('src/sports/nfl/engine/slots.ts'));
const legacyMod = await import(eng('test/nfl/golden/legacy-coefficients.ts'));
const derivedWeights = value.derivedWeights as (b?: '4-3' | '3-4') => Record<string, number>;
const SLOTS = slotsMod.SLOTS as { id: string; weight: number }[];

// Owner's 6 Nov salary table (== tools/mathlab/salary-reference.json; NICKEL = the CB3 slot)
const OWNER: Record<string, number> = {
  QB: 1000, RB1: 250, RB2: 100, FB: 25, WR1: 650, WR2: 400, WR3: 100, WR4: 50,
  TE1: 250, TE2: 150, TE3: 50, OT1: 500, OG1: 400, C: 150, OG2: 250, OT2: 300,
  DE1: 650, DE2: 300, DT1: 500, DT2: 300, DL5: 150, MIKE: 300, WILL: 150, SAM: 100,
  CB1: 400, SS: 300, FS: 300, CB2: 250, NICKEL: 100, DIME: 50, K: 50, P: 50,
};
// OLD personal DEFAULT_WEIGHTS (Football-Sim-PreColors.html line 452) on its own QB=320 scale
const PERSONAL_RAW: Record<string, number> = {
  QB: 320, RB1: 100, RB2: 40, WR1: 60, WR2: 40, WR3: 20, WR4: 5, TE1: 80, TE2: 20,
  OT1: 295, OT2: 295, OG1: 295, OG2: 295, C: 295, DE1: 350, DE2: 350, DT1: 320, DT2: 300,
  DL5: 5, MIKE: 100, WILL: 100, SAM: 60, CB1: 350, CB2: 295, CB3: 80, SS: 80, FS: 60, K: 5, P: 1, FB: 1,
};
const personal1000: Record<string, number> = {};
for (const [k, v] of Object.entries(PERSONAL_RAW)) personal1000[k] = (v * 1000) / 320;

const ownerKey = (id: string) => (id === 'CB3' ? 'NICKEL' : id);
const ids = SLOTS.map((s) => s.id);
const owner: Record<string, number> = {};
for (const s of SLOTS) owner[s.id] = OWNER[ownerKey(s.id)];

const current = derivedWeights('4-3');
const legacy = legacyMod.withLegacyCoefficients(() => derivedWeights('4-3')) as Record<string, number>;

// ---- rows ----
console.log('slot   personal1000  legacyFit  currentFit   ownerT   bend6nov  resid  | personal-legacy resid');
const rows = [...ids].sort((a, b) => owner[b] - owner[a] || a.localeCompare(b));
for (const id of rows) {
  const p = personal1000[id] ?? NaN, l = legacy[id], c = current[id], o = owner[id];
  const bend = c - l, resid = c - o, pres = l - p;
  console.log(
    id.padEnd(6) + p.toFixed(0).padStart(13) + l.toFixed(1).padStart(11) + c.toFixed(1).padStart(12) +
    o.toFixed(0).padStart(9) + (bend >= 0 ? '+' : '') + bend.toFixed(1).padStart(10) +
    (resid >= 0 ? '+' : '') + resid.toFixed(1).padStart(7) + ' |' + (pres >= 0 ? '+' : '') + pres.toFixed(1).padStart(9)
  );
}

// ---- rank agreement (Spearman with average ties) ----
function ranks(m: Record<string, number>): Record<string, number> {
  const e = Object.entries(m).sort((a, b) => b[1] - a[1]); const out: Record<string, number> = {};
  let i = 0;
  while (i < e.length) { let j = i; while (j + 1 < e.length && e[j + 1][1] === e[i][1]) j++; const avg = (i + j) / 2 + 1; for (let k = i; k <= j; k++) out[e[k][0]] = avg; i = j + 1; }
  return out;
}
function spearman(a: Record<string, number>, b: Record<string, number>): number {
  const ks = Object.keys(a).filter((k) => b[k] !== undefined);
  const ra = ranks(Object.fromEntries(ks.map((k) => [k, a[k]]))), rb = ranks(Object.fromEntries(ks.map((k) => [k, b[k]])));
  const n = ks.length;
  const ma = ks.reduce((s, k) => s + ra[k], 0) / n, mb = ks.reduce((s, k) => s + rb[k], 0) / n;
  let num = 0, da = 0, db = 0;
  for (const k of ks) { num += (ra[k] - ma) * (rb[k] - mb); da += (ra[k] - ma) ** 2; db += (rb[k] - mb) ** 2; }
  return num / Math.sqrt(da * db);
}
console.log(`\nSpearman legacy-fit vs OLD personal table : ${spearman(legacy, personal1000).toFixed(3)}  (high = the 28 Oct fit echoes the personal table)`);
console.log(`Spearman current-fit vs OLD personal table: ${spearman(current, personal1000).toFixed(3)}`);
console.log(`Spearman current-fit vs Owner salary table: ${spearman(current, owner).toFixed(3)}  (the 6 Nov refit's target)`);
console.log(`Spearman legacy-fit   vs Owner salary table: ${spearman(legacy, owner).toFixed(3)}`);

// ---- the secondary share (the Owner's specific worry: a CB/SS/FS-heavy engine) ----
const SECONDARY = ['CB1', 'CB2', 'CB3', 'DIME', 'SS', 'FS'];
const share = (m: Record<string, number>) => {
  const tot = Object.values(m).reduce((a, b) => a + b, 0);
  const sec = SECONDARY.reduce((a, s) => a + (m[s] ?? 0), 0);
  return { sec, tot, pct: (100 * sec) / tot };
};
const sp = share(personal1000), sl = share(legacy), sc = share(current), so = share(owner);
console.log(`\nsecondary share (CB1+CB2+CB3+DIME+SS+FS as % of table total):`);
console.log(`  OLD personal table : ${sp.sec.toFixed(0)}/${sp.tot.toFixed(0)} = ${sp.pct.toFixed(1)}%`);
console.log(`  legacy fit (28 Oct): ${sl.sec.toFixed(0)}/${sl.tot.toFixed(0)} = ${sl.pct.toFixed(1)}%`);
console.log(`  current fit (6 Nov): ${sc.sec.toFixed(0)}/${sc.tot.toFixed(0)} = ${sc.pct.toFixed(1)}%`);
console.log(`  Owner salary table : ${so.sec.toFixed(0)}/${so.tot.toFixed(0)} = ${so.pct.toFixed(1)}%`);

// ---- bend summary: did the 6 Nov refit move measured values toward the Owner's table? ----
const mae = (f: (id: string) => number) => ids.reduce((s, id) => s + Math.abs(f(id)), 0) / ids.length;
console.log(`\nmean |deviation| from Owner table: legacy fit ${mae((id) => legacy[id] - owner[id]).toFixed(1)} → current fit ${mae((id) => current[id] - owner[id]).toFixed(1)} (weight points)`);
console.log(`mean |bend| from the 6 Nov refit (|current-legacy|): ${mae((id) => current[id] - legacy[id]).toFixed(1)}`);
const moved = [...ids].sort((a, b) => Math.abs(current[b] - legacy[b]) - Math.abs(current[a] - legacy[a])).slice(0, 6);
console.log(`largest bends: ${moved.map((id) => `${id} ${(current[id] - legacy[id]) >= 0 ? '+' : ''}${(current[id] - legacy[id]).toFixed(1)}`).join(', ')}`);
