// w88 §4 verification — recompute the NEW Wins table (localWins20) on the Colors engine at snapshot 4ca9a071.
// Method per the w88 prompt §2: pool center = CSV mean OVR for the slot's position; local slope at ±5
// (wins(center+5) − wins(center−5)) / 10 with everything else at its own position average; Wins = slope × 20.
// Cross-checks: OLD slotWins20 (70→90, everything else 80) must reproduce MUSE's Colors values
// (SAM 0.263, CB1 1.056, WR3 0.2470); NEW table must match §2 of the prompt.
import { bestUnitPts, slotWins20 } from '../work/engine/value.ts';
import { teamRatings } from '../work/engine/ratings.ts';
import { SLOT_IDS, SLOTS, fieldSlots } from '../work/engine/slots.ts';
import { GAMES, POINTS_PER_WIN } from '../work/engine/specs.ts';
import fs from 'node:fs';

// ---------- 1 · pool centers from the CSV (madden27-ratings.csv, n=1941) ----------
const rows = fs.readFileSync('../work/madden27-ratings.csv', 'utf8').trim().split('\n').slice(1)
  .map((l) => { const [name, pos, team, ovr] = l.split(','); return { pos, ovr: +ovr }; });
const mean = (a) => a.reduce((t, x) => t + x, 0) / a.length;
const pick = (...ps) => mean(rows.filter((r) => ps.includes(r.pos)).map((r) => r.ovr));
const POS_CENTER = {
  QB: pick('QB'), RB: pick('HB'), WR: pick('WR'), TE: pick('TE'),
  OT: pick('LT', 'RT'), OG: pick('LG', 'RG'), C: pick('C'),
  EDGE: pick('LEDG', 'REDG'), DT: pick('DT'), LB: pick('MIKE', 'WILL', 'SAM'),
  CB: pick('CB'), SS: pick('SS'), FS: pick('FS'), K: pick('K'), P: pick('P'), FB: pick('FB'),
};
// claimed centers from the w88 prompt §4
const CLAIMED = { QB: 71.85, RB: 75.98, WR: 75.53, TE: 70.48, OT: 74.05, OG: 72.99, C: 71.43, EDGE: 74.87, DT: 73.93, LB: 72.47, CB: 74.99, SS: 74.63, FS: 73.76, K: 78.27, P: 77.03, FB: 71.88 };
console.log('== CSV pool centers vs prompt-claimed (n=' + rows.length + ') ==');
for (const k of Object.keys(CLAIMED)) console.log(`  ${k.padEnd(5)} computed ${POS_CENTER[k].toFixed(2)}  claimed ${CLAIMED[k].toFixed(2)}  ${Math.abs(POS_CENTER[k] - CLAIMED[k]) < 0.005 ? 'OK' : 'MISMATCH'}`);

// slot -> position center. DL5 = the rotational fifth lineman; CB3 (NICKEL) and DIME are DBs -> CB center.
const DEST_POS = { QB: 'QB', RB1: 'RB', RB2: 'RB', FB: 'FB', WR1: 'WR', WR2: 'WR', WR3: 'WR', WR4: 'WR', TE1: 'TE', TE2: 'TE', TE3: 'TE', OT1: 'OT', OT2: 'OT', OG1: 'OG', OG2: 'OG', C: 'C', DE1: 'EDGE', DE2: 'EDGE', DT1: 'DT', DT2: 'DT', DL5: 'DT', MIKE: 'LB', WILL: 'LB', SAM: 'LB', CB1: 'CB', CB2: 'CB', CB3: 'CB', DIME: 'CB', SS: 'SS', FS: 'FS', K: 'K', P: 'P' };
const CENTER = Object.fromEntries(SLOT_IDS.map((s) => [s, POS_CENTER[DEST_POS[s]]]));

// ---------- 2 · wins with everything else at its own position average (P-321 base) ----------
const isOffSide = (slot) => slot === 'K' || SLOTS.find((s) => s.id === slot)?.unit === 'offense';
const spotsAt = (slot, ovr) => fieldSlots('4-3').map((f) => ({ row: f.row, ovr: f.slot === slot ? ovr : CENTER[f.slot] }));
function winsWithBase(slot, ovr) {
  const lg = teamRatings(spotsAt(slot, CENTER[slot])), k = GAMES / POINTS_PER_WIN, isOff = isOffSide(slot);
  return (bestUnitPts(teamRatings(spotsAt(slot, ovr)), lg, isOff) - bestUnitPts(lg, lg, isOff)) * k;
}
// local slope over ±spread OVR around the pool center, scaled to a 20-OVR span
const localWins = (slot, spread) => (winsWithBase(slot, CENTER[slot] + spread) - winsWithBase(slot, CENTER[slot] - spread)) / (2 * spread) * 20;

// ---------- 3 · cross-check the harness: OLD slotWins20 on Colors (MUSE reported values) ----------
console.log('\n== harness cross-check: OLD slotWins20 (70->90, flat 80 base), Colors engine ==');
for (const s of ['SAM', 'CB1', 'WR3', 'QB', 'OT1']) console.log(`  ${s.padEnd(4)} ${slotWins20(s).toFixed(4)}`);
console.log('  (MUSE reported: SAM 0.263, CB1 1.056, WR3 0.2470)');

// ---------- 4 · NEW table (local ±5) vs the §2 table ----------
const PROMPT_NEW = { QB: 2.5, DE1: 1.7, WR1: 1.6, DT1: 1.3, OT1: 1.2, WR2: 1.1, CB1: 1.1, OG1: 1.0, MIKE: 0.8, DE2: 0.8, DT2: 0.8, FS: 0.8, SS: 0.8, OT2: 0.8, CB2: 0.7, OG2: 0.6, TE1: 0.6, RB1: 0.6, WILL: 0.4, DL5: 0.4, C: 0.4, TE2: 0.3, NICKEL: 0.3, WR3: 0.2, DIME: 0.1, SAM: 0.1, K: 0.1, P: 0.1, WR4: 0.1, RB2: 0.1, TE3: 0.1, FB: 0.1 };
const PROMPT_OLD = { QB: 2.5, DE1: 1.7, WR1: 1.6, DT1: 1.3, OT1: 1.3, WR2: 1.0, CB1: 1.1, OG1: 1.0, MIKE: 0.8, DE2: 0.8, DT2: 0.8, FS: 0.8, SS: 0.8, OT2: 0.8, CB2: 0.7, OG2: 0.6, TE1: 0.6, RB1: 0.6, WILL: 0.4, DL5: 0.4, C: 0.4, TE2: 0.4, NICKEL: 0.3, WR3: 0.2, DIME: 0.1, SAM: 0.3, K: 0.1, P: 0.1, WR4: 0.1, RB2: 0.2, TE3: 0.1, FB: 0.1 };
const NAME = { CB3: 'NICKEL' };
console.log('\n== NEW Wins table recompute (local slope ±5 around pool center, ×20) ==');
console.log('  slot   center   OLD(slotWins20)  NEW(±5)  §2 NEW  ±3    ±7    match');
const out = {};
for (const id of SLOT_IDS) {
  const nm = NAME[id] ?? id;
  const old20 = slotWins20(id);
  const n5 = localWins(id, 5), n3 = localWins(id, 3), n7 = localWins(id, 7);
  const r5 = Math.round(n5 * 10) / 10;
  out[nm] = { n5, n3, n7, old20, r5, claimed: PROMPT_NEW[nm], claimedOld: PROMPT_OLD[nm] };
  const ok = Math.abs(r5 - PROMPT_NEW[nm]) < 0.05;
  console.log(`  ${nm.padEnd(6)} ${CENTER[id].toFixed(2).padStart(6)}  ${old20.toFixed(4).padStart(12)}  ${n5.toFixed(4).padStart(7)}  ${PROMPT_NEW[nm].toFixed(1).padStart(5)}  ${n3.toFixed(3).padStart(5)} ${n7.toFixed(3).padStart(5)}  ${ok ? 'OK' : '*** DIFF ***'}`);
}
// exact OT1 check (claimed 1.2505 vs 1.2497 rounding-boundary)
console.log('\n== OT1 exact ==');
console.log('  OT1 OLD slotWins20 exact:', slotWins20('OT1').toFixed(4), '(claimed 1.2505)');
console.log('  OT1 NEW local ±5 exact  :', out.OT1.n5.toFixed(4), '(claimed 1.2497; must round to 1.2)');

// ---------- 5 · the WR3 question + moves ----------
console.log('\n== key moves (claimed) ==');
for (const s of ['WR2', 'TE2', 'SAM', 'RB2']) {
  const o = out[s];
  console.log(`  ${s.padEnd(4)} OLD ${o.claimedOld.toFixed(1)} -> NEW ${o.claimed.toFixed(1)} | recomputed NEW ${o.n5.toFixed(4)} (rounds ${o.r5.toFixed(1)}) | ±3 ${o.n3.toFixed(3)} ±7 ${o.n7.toFixed(3)}`);
}
console.log(`  WR3    recomputed NEW ${out.WR3.n5.toFixed(4)} vs OLD ${out.WR3.old20.toFixed(4)} (MUSE Colors claim: 0.2470 -> 0.2470, no move; PreColors claim: 95 -> 120 weight = 0.2414 -> 0.3048 wins20-equiv)`);
console.log(`  SAM    recomputed NEW ${out.SAM.n5.toFixed(4)} vs OLD ${out.SAM.old20.toFixed(4)}`);
console.log(`  CB1    recomputed NEW ${out.CB1.n5.toFixed(4)} vs OLD ${out.CB1.old20.toFixed(4)}`);
// weight cross-check: weight = wins20 / 0.00254
console.log('\n== weight cross-check (wins/0.00254) for WR3 ==');
console.log('  WR3 OLD slotWins20 as weight:', (out.WR3.old20 / 0.00254).toFixed(1), '(table says 95)');
console.log('  WR3 NEW local ±5 as weight :', (out.WR3.n5 / 0.00254).toFixed(1), '(PreColors claim: 120)');
// ranking order per recomputed NEW
console.log('\n== ranking order (recomputed NEW, desc) ==');
const rank = Object.entries(out).sort((a, b) => b[1].n5 - a[1].n5);
rank.forEach(([nm, v], i) => console.log(`  ${String(i + 1).padStart(2)} ${nm.padEnd(6)} ${v.n5.toFixed(4)}`));
