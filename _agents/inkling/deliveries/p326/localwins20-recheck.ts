// P-326 independent recheck of localWins20 (slope x 20 at +/-spread around the CSV pool-average center).
// Usage:
//   D=<scratch dir>; git archive origin/architect/engine-and-seats colors data | tar -x -C "$D"
//   cp localwins20-recheck.ts "$D/" && cd "$D" && node localwins20-recheck.ts
// Engine of record: origin/architect/engine-and-seats @ 728b2c53 (the w88/w87 pin lineage).
// Pool: data/nfl/madden27-ratings.csv (n=1,941). sha256 54e837dd20378ff63524374a45ba9eeccbbae46c.
import { readFileSync } from 'node:fs';
import { bestUnitPts, slotWins } from './colors/src/sports/nfl/engine/value.ts';
import { teamRatings } from './colors/src/sports/nfl/engine/ratings.ts';
import { GAMES, POINTS_PER_WIN } from './colors/src/sports/nfl/engine/specs.ts';
import { SLOT_IDS, SLOTS, fieldSlots } from './colors/src/sports/nfl/engine/slots.ts';
import type { SlotId } from './colors/src/sports/nfl/engine/slots.ts';

const CSV = 'data/nfl/madden27-ratings.csv';
const rows = readFileSync(CSV, 'utf8').trim().split('\n').slice(1).map(l => l.split(','));
const posOf = new Map<string, number[]>();
for (const r of rows) { const [, pos, , ovr] = r; if (!posOf.has(pos)) posOf.set(pos, []); posOf.get(pos)!.push(Number(ovr)); }
const mean = (a: number[]) => a.reduce((s, x) => s + x, 0) / a.length;
const GROUP: Record<string, string[]> = {
  QB: ['QB'], RB1: ['HB'], RB2: ['HB'], FB: ['FB'],
  WR1: ['WR'], WR2: ['WR'], WR3: ['WR'], WR4: ['WR'],
  TE1: ['TE'], TE2: ['TE'], TE3: ['TE'],
  OT1: ['LT', 'RT'], OT2: ['LT', 'RT'], OG1: ['LG', 'RG'], OG2: ['LG', 'RG'], C: ['C'],
  DE1: ['LEDG', 'REDG'], DE2: ['LEDG', 'REDG'], DT1: ['DT'], DT2: ['DT'], DL5: ['DT'],
  MIKE: ['MIKE'], WILL: ['WILL'], SAM: ['SAM'],
  CB1: ['CB'], CB2: ['CB'], CB3: ['CB'], DIME: ['CB'], FS: ['FS'], SS: ['SS'],
  K: ['K'], P: ['P'],
};
const centerOvr = new Map<string, number>();
for (const s of SLOT_IDS) centerOvr.set(s, mean(GROUP[s].flatMap(p => posOf.get(p) ?? [])));
const POOL_BASE = Object.fromEntries(SLOT_IDS.map(s => [s, centerOvr.get(s)!])) as Record<SlotId, number>;
const FLAT80 = Object.fromEntries(SLOT_IDS.map(s => [s, 80])) as Record<SlotId, number>;
const k = GAMES / POINTS_PER_WIN;
const isOffSide = (slot: SlotId): boolean => slot === 'K' || SLOTS.find(x => x.id === slot)!.unit === 'offense';

function winsWithBase(slot: SlotId, ovr: number, baseVec: Record<SlotId, number>): number {
  const mk = (v: number) => fieldSlots('4-3').map(f => ({ row: f.row, ovr: f.slot === slot ? v : baseVec[f.slot] }));
  const lg = teamRatings(mk(baseVec[slot])); // league baseline = the baseline lineup
  const isOff = isOffSide(slot);
  return (bestUnitPts(teamRatings(mk(ovr)), lg, isOff) - bestUnitPts(lg, lg, isOff)) * k;
}

// --- sanity: an all-80 base must reproduce the engine's own slotWins / slotWins20 exactly
let d1 = 0, d2 = 0;
for (const s of SLOT_IDS) {
  d1 = Math.max(d1, Math.abs(winsWithBase(s, 85, FLAT80) - slotWins(s, 85, '4-3')));
  d2 = Math.max(d2, Math.abs((winsWithBase(s, 90, FLAT80) - winsWithBase(s, 70, FLAT80)) - (slotWins(s, 90, '4-3') - slotWins(s, 70, '4-3'))));
}
console.log('sanity winsWithBase(all-80) vs slotWins @85: max|diff| =', d1);
console.log('sanity (w(90)-w(70), all-80) vs slotWins20: max|diff| =', d2);

// --- full table
const W88: Record<string, number> = { QB: 2.5, DE1: 1.7, WR1: 1.6, DT1: 1.3, OT1: 1.2, WR2: 1.1, CB1: 1.1, OG1: 1.0, MIKE: 0.8, DE2: 0.8, DT2: 0.8, FS: 0.8, SS: 0.8, OT2: 0.8, CB2: 0.7, OG2: 0.6, TE1: 0.6, RB1: 0.6, WILL: 0.4, DL5: 0.4, C: 0.4, TE2: 0.3, CB3: 0.3, WR3: 0.2, DIME: 0.1, SAM: 0.1, K: 0.1, P: 0.1, WR4: 0.1, RB2: 0.1, TE3: 0.1, FB: 0.1 };
console.log('\n slot     center    n   OLD(70-90) span10POOL  NEW±5  W88±5  dW88  | NEW±3  NEW±7');
const rowsOut: Array<{ s: string; d: number }> = [];
for (const s of SLOT_IDS) {
  const c = centerOvr.get(s)!;
  const n = GROUP[s].flatMap(p => posOf.get(p) ?? []).length;
  const OLD = slotWins(s, 90, '4-3') - slotWins(s, 70, '4-3');
  const span10 = winsWithBase(s, c + 10, POOL_BASE) - winsWithBase(s, c - 10, POOL_BASE);
  const w = (spread: number) => (winsWithBase(s, c + spread, POOL_BASE) - winsWithBase(s, c - spread, POOL_BASE)) / (2 * spread) * 20;
  const n5 = w(5);
  const d = Math.round(n5 * 10) / 10 - W88[s];
  rowsOut.push({ s, d });
  console.log(s.padEnd(7), c.toFixed(2).padStart(6), String(n).padStart(4), OLD.toFixed(4).padStart(10), span10.toFixed(4).padStart(10), n5.toFixed(4).padStart(6), W88[s].toFixed(1).padStart(5), d.toFixed(1).padStart(4), ' | ', w(3).toFixed(4).padStart(6), w(7).toFixed(4).padStart(6));
}
const bad = rowsOut.filter(r => Math.abs(r.d) >= 0.05);
console.log('\nmax |NEW±5 - w88| =', Math.max(...rowsOut.map(r => Math.abs(r.d))).toFixed(1), '| slots off by >=0.1:', bad.length ? bad.map(r => r.s).join(',') : 'none');

// --- spread scan for the fragile slots + the trap slots
console.log('\nspread scan (Wins = slope*20): slot  center  s=0.5 1 2 3 5 7 10');
for (const s of ['TE2', 'TE3', 'WR2', 'SAM', 'RB2', 'P', 'FB', 'DIME'] as SlotId[]) {
  const c = centerOvr.get(s)!;
  const v = [0.5, 1, 2, 3, 5, 7, 10].map(sp => ((winsWithBase(s, c + sp, POOL_BASE) - winsWithBase(s, c - sp, POOL_BASE)) / (2 * sp) * 20).toFixed(4));
  console.log(s.padEnd(6), c.toFixed(2), ' ', v.join('  '));
}

// --- TE2 / WR2 marginal-wins curves (piecewise flat then rising)
for (const s of ['TE2', 'WR2', 'TE3'] as SlotId[]) {
  const c = centerOvr.get(s)!;
  console.log(`\n${s} wins curve (center ${c.toFixed(2)}):`);
  for (let o = 60; o <= 90; o += 2) console.log('ovr', String(o), winsWithBase(s, o, POOL_BASE).toFixed(6));
}

// --- pool group stats
console.log('\npool groups (n, mean):');
for (const [p, a] of [...posOf.entries()].sort()) console.log(p.padEnd(6), String(a.length).padStart(4), mean(a).toFixed(2));
