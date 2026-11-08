// P-284 / Owner's final weights table (chat message 6–7 Nov 2026): does Claude's engine's REVEALED impact
// (slotWinsPerOvr, the lab's method ported in value.ts) land within the Owner's ±50 band of his table?
// Read-only: imports the engine, prints a table, writes nothing into any repo.
// usage: node --experimental-strip-types _agents/mimo/tools/owner-weights-test.ts <colors-dir> <prec lean-sweep.json>
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const colorsDir = process.argv[2];
const sweepJson = process.argv[3];
if (!colorsDir || !sweepJson) {
  console.error('usage: owner-weights-test.ts <colors-dir> <prec lean-sweep.json>');
  process.exit(4);
}

const eng = (f: string) => pathToFileURL(path.join(colorsDir, 'src/sports/nfl/engine', f)).href;
const value = await import(eng('value.ts'));
const slotsMod = await import(eng('slots.ts'));
const derivedWeights = value.derivedWeights as (b?: '4-3' | '3-4') => Record<string, number>;
const SLOTS = slotsMod.SLOTS as { id: string; weight: number }[];

// Owner's table verbatim (chat 6–7 Nov 2026): "xM POS weight" — x is his rounded salary for a slightly above
// average starter (INTERNAL REFERENCE ONLY, never shown to the user), z is the weight shown on the Madden
// Rankings page. Owner's "NICKEL" is the engine's CB3 slot (dest 'NICKEL').
const OWNER: Record<string, number> = {
  QB: 1000, RB1: 250, RB2: 100, FB: 25, WR1: 650, WR2: 400, WR3: 100, WR4: 50,
  TE1: 250, TE2: 150, TE3: 50, OT1: 500, OG1: 400, C: 150, OG2: 250, OT2: 300,
  DE1: 650, DE2: 300, DT1: 500, DT2: 300, DL5: 150, MIKE: 300, WILL: 150, SAM: 100,
  CB1: 400, SS: 300, FS: 300, CB2: 250, NICKEL: 100, DIME: 50, K: 50, P: 50,
};
const SALARY: Record<string, number> = {
  QB: 40, RB1: 10, RB2: 4, FB: 1, WR1: 25, WR2: 15, WR3: 4, WR4: 2,
  TE1: 10, TE2: 5, TE3: 2, OT1: 20, OG1: 15, C: 5, OG2: 10, OT2: 12,
  DE1: 25, DE2: 12, DT1: 20, DT2: 10, DL5: 5, MIKE: 12, WILL: 6, SAM: 3,
  CB1: 15, SS: 12, FS: 12, CB2: 10, NICKEL: 4, DIME: 2, K: 2, P: 2,
};
// Shipped product DEFAULT_WEIGHTS (Football-Sim-PreColors.html line 452, sha256 40233d6b…): the P-284
// "weight rank" column. Keys are the product's; the product has no DIME (its CB4≈ the sixth DB) and its
// sweep never measured FB/WR4/TE3/DL5/P.
const DEFAULT_WEIGHTS: Record<string, number> = {
  QB: 320, RB1: 100, RB2: 40, WR1: 60, WR2: 40, WR3: 20, WR4: 5, TE1: 80, TE2: 20,
  OT1: 295, OT2: 295, OG1: 295, OG2: 295, C: 295, DE1: 350, DE2: 350, DT1: 320, DT2: 300,
  DL5: 5, MIKE: 100, WILL: 100, SAM: 60, LB4: 5, CB1: 350, CB2: 295, CB3: 80, CB4: 20,
  SS: 80, SS2: 5, FS: 60, FS2: 5, K: 5, P: 1, FB: 1,
};

const ownerKey = (id: string) => (id === 'CB3' ? 'NICKEL' : id);

// average ranks (ties share the mean), rank 1 = heaviest
function ranks(map: Record<string, number>): Record<string, number> {
  const entries = Object.entries(map).sort((a, b) => b[1] - a[1]);
  const out: Record<string, number> = {};
  let i = 0;
  while (i < entries.length) {
    let j = i;
    while (j + 1 < entries.length && entries[j + 1][1] === entries[i][1]) j++;
    const avg = (i + j) / 2 + 1;
    for (let k = i; k <= j; k++) out[entries[k][0]] = avg;
    i = j + 1;
  }
  return out;
}

const sweep = JSON.parse(fs.readFileSync(sweepJson, 'utf8')) as Record<string, { w7090: number }>;
const prodReveal: Record<string, number> = {};
for (const [s, v] of Object.entries(sweep)) prodReveal[s] = v.w7090 / 20;   // wins per +1 OVR, 70→90

const table43 = SLOTS.map((s) => s.id);                                     // engine slot ids (32, CB3 = NICKEL)
const meas43 = derivedWeights('4-3');
const meas34 = derivedWeights('3-4');

// --- check 1: slots.ts table vs the Owner's message (every value must match exactly) ---
const mismatches: string[] = [];
for (const s of SLOTS) {
  const o = OWNER[ownerKey(s.id)];
  if (o === undefined) mismatches.push(`${s.id}: not in the Owner's table`);
  else if (o !== s.weight) mismatches.push(`${s.id}: slots.ts ${s.weight} vs Owner ${o}`);
}
for (const k of Object.keys(OWNER)) if (!SLOTS.some((s) => ownerKey(s.id) === k)) mismatches.push(`Owner ${k}: no engine slot`);
console.log(`CHECK 1 slots.ts == Owner table: ${mismatches.length === 0 ? 'PASS (32/32 exact)' : 'FAIL → ' + mismatches.join('; ')}`);

// --- check 2: the ±50 band on the revealed impact (the Owner's rule for Claude's engine) ---
const ownerById: Record<string, number> = {};
for (const s of SLOTS) ownerById[s.id] = OWNER[ownerKey(s.id)];
const dev = (m: Record<string, number>) => table43.map((id) => ({ id, d: m[id] - ownerById[id] }));
const d43 = dev(meas43), d34 = dev(meas34);
const band = (ds: { id: string; d: number }[]) => {
  const inb = ds.filter((x) => Math.abs(x.d) <= 50);
  const worst = [...ds].sort((a, b) => Math.abs(b.d) - Math.abs(a.d))[0];
  return { inb: inb.length, worst };
};
const b43 = band(d43), b34 = band(d34);
console.log(`CHECK 2 ±50 band (4-3): ${b43.inb}/32 inside; worst ${worst(b43.worst)}`);
console.log(`CHECK 2 ±50 band (3-4): ${b34.inb}/32 inside; worst ${worst(b34.worst)}`);
function worst(x: { id: string; d: number }) { return `${x.id} ${x.d >= 0 ? '+' : ''}${x.d.toFixed(1)}`; }

// --- check 3: salary × 25 vs the Owner's weight (his stated derivation, ±25 personal edits) ---
const salDelta = Object.keys(OWNER).map((k) => ({ k, d: OWNER[k] - SALARY[k] * 25 }));
const salOut = salDelta.filter((x) => x.d !== 0);
console.log(`CHECK 3 weight == salary×25: ${32 - salOut.length}/32 exact; adjusted: ${salOut.map((x) => `${x.k} ${x.d > 0 ? '+' : ''}${x.d}`).join(', ')}`);

// --- check 4: P-284 ranks — revealed (Colors 4-3) vs Owner table vs shipped DEFAULT_WEIGHTS ---
const rMeas = ranks(meas43), rOwner = ranks(ownerById);
const prodOnly: Record<string, number> = {};
for (const s of table43) if (prodReveal[s] !== undefined) prodOnly[s] = prodReveal[s];
const rProd = ranks(prodOnly);
const rDefaultAll = ranks(DEFAULT_WEIGHTS);
const rDefaultShared: Record<string, number> = {};
for (const s of Object.keys(prodOnly)) rDefaultShared[s] = rDefaultAll[s];

console.log('\nslot   owner  sal  meas43   dev   band  meas34  prodReveal  ownerR  measR  gapO  flagO  defWt  defR  gapD  flagD');
let flagO = 0, flagD = 0, inBand = 0;
for (const id of [...table43].sort((a, b) => ownerById[b] - ownerById[a] || a.localeCompare(b))) {
  const o = ownerById[id], m = meas43[id], dv = m - o;
  const inb = Math.abs(dv) <= 50; if (inb) inBand++;
  const gO = rOwner[id] - rMeas[id];
  const fO = Math.abs(gO) >= 4; if (fO) flagO++;
  const hasProd = prodReveal[id] !== undefined;
  const gD = hasProd ? rDefaultShared[id] - rMeas[id] : NaN;
  const fD = hasProd && Math.abs(gD) >= 4; if (fD) flagD++;
  console.log(
    id.padEnd(6) + String(o).padStart(6) + String(SALARY[ownerKey(id)] ?? '?').padStart(5) +
    m.toFixed(1).padStart(8) + (dv >= 0 ? '+' : '') + dv.toFixed(1).padStart(6) + (inb ? '  ok ' : ' FAIL') +
    meas34[id].toFixed(1).padStart(8) +
    (hasProd ? prodReveal[id].toFixed(4).padStart(11) : '          —') +
    rOwner[id].toFixed(1).padStart(8) + rMeas[id].toFixed(1).padStart(7) +
    (gO >= 0 ? '+' : '') + gO.toFixed(1).padStart(5) + (fO ? '   FLAG' : '      .') +
    (hasProd ? String(DEFAULT_WEIGHTS[id] ?? '—').padStart(7) + rDefaultShared[id].toFixed(1).padStart(6) +
      (gD >= 0 ? '+' : '') + gD.toFixed(1).padStart(5) + (fD ? '  FLAG' : '     .') : '      —       —      —       —')
  );
}
console.log(`\nSUMMARY  in ±50 band: ${inBand}/32 | rank flags vs Owner's table: ${flagO} | rank flags vs shipped DEFAULT_WEIGHTS (26 shared): ${flagD}`);

// --- check 5: cross-engine parity — shipped product reveal vs Colors reveal on the shared slots ---
const xs = Object.keys(prodOnly);
const corr = spearman(xs.map((s) => rProd[s]), xs.map((s) => rMeas[s]));
const ratios = xs.map((s) => meas43[s] / prodReveal[s]);
const mean = ratios.reduce((a, b) => a + b, 0) / ratios.length;
console.log(`CHECK 5 cross-engine: Spearman(product, colors) = ${corr.toFixed(3)} over ${xs.length} shared slots; mean colors/product ratio = ${mean.toFixed(3)} (min ${Math.min(...ratios).toFixed(3)}, max ${Math.max(...ratios).toFixed(3)})`);

function spearman(a: number[], b: number[]): number {
  const n = a.length;
  const ma = a.reduce((x, y) => x + y, 0) / n, mb = b.reduce((x, y) => x + y, 0) / n;
  let num = 0, da = 0, db = 0;
  for (let i = 0; i < n; i++) { num += (a[i] - ma) * (b[i] - mb); da += (a[i] - ma) ** 2; db += (b[i] - mb) ** 2; }
  return num / Math.sqrt(da * db);
}
