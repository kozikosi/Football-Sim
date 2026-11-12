// Cross-position flex measurement for the Owner's question:
// "With WR1 at 650 and CB1 at 400, ... move a high-rated CB to WR1 at a -4 penalty.
// We want to reduce the potential of any player preferring to play another position in the first 10 rounds of the draft.
// What other positions would want to flex out of their positions early?"
//
// For every spot (slot) with weight W, and every alternative role that can flex there at penalty P,
// we find: how many OVR points better than the natural slot player must the alternative role be
// before the Hungarian optimizer chooses to move him? If the required gap is small (<= ~10 OVR),
// the cross-position flex is attractive early.
//
// We measure on synthetic rosters: one candidate of role R at slot S vs alternatives of other roles
// that flex to S at penalty P. Then we binary-search the minimum OVR gap.
import { SLOTS, SLOT_IDS, WEIGHT, fieldSlots } from '../../colors/src/sports/nfl/engine/slots.ts';
import { FLEX, fit } from '../../colors/src/sports/nfl/engine/flex.ts';
import { optimalLineup } from '../../colors/src/sports/nfl/engine/lineup.ts';

let uid = 0;
const mk = (role, ovr) => ({ id: `${uid++}|${role}|T`, name: `p${uid}`, pos: role, role, team: 'T', ovr, spd: 70, str: 70, freeAgent: false });

function naturalMap() {
  return fieldSlots('4-3').map((s) => mk(s.dest === 'NICKEL' || s.dest === 'DIME' ? 'CB' : s.dest === 'DL5' ? 'DT' : s.dest, 70));
}

function minGapFor(dest, altRole) {
  const ps = naturalMap();
  const slots = fieldSlots('4-3');
  const s = slots.find((f) => f.slot === dest);
  if (!s) return null;
  // Find the natural player for this slot's dest. Some dests are NICKEL/DIME which need mapping.
  const destMap = { NICKEL: 'CB', DIME: 'CB', DL5: 'DT' };
  const effectiveDest = destMap[s.dest] || s.dest;
  const nat = ps.find((p) => p.role === effectiveDest);
  if (!nat) { console.error(`No natural player found for dest=${s.dest}, effectiveDest=${effectiveDest}`); return null; }
  nat.ovr = 70;
  const alt = mk(altRole, 70);
  ps.push(alt);
  let lo = 0, hi = 60, ans = null;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    alt.ovr = 70 + mid;
    const l = optimalLineup([...ps], fieldSlots('4-3'));
    const pl = l.placements.find((p) => p.slot.slot === dest);
    if (!pl) { lo = mid + 1; continue; }
    const p = pl.player;
    const moved = p && p.role === altRole && (p.ovr - fit(altRole, pl.slot.dest).penalty) > 70;
    if (moved) { ans = mid; hi = mid - 1; } else lo = mid + 1;
  }
  return ans;
}

const results = [];
for (const s of fieldSlots('4-3')) {
  const dest = s.dest;
  const weight = WEIGHT[s.slot];
  for (const [role, row] of Object.entries(FLEX)) {
    if (role === dest) continue;
    const pen = row[dest];
    if (pen === undefined) continue;
    if (pen > 6) continue; // only -2 and -4 flex shown in first 10 rounds
    const gap = minGapFor(s.slot, role);
    results.push({ dest: s.slot, alt: role, pen, weight, gap });
  }
}

results.sort((a, b) => (a.gap ?? 99) - (b.gap ?? 99));

console.log('CROSS-POSITION FLEX — minimum OVR gap for an alternative role to displace a natural player at each spot');
console.log('Only penalties shown in the first 10 rounds (-2 and -4 flex) are listed.');
console.log('');
console.log('SPOT  weight  ALT -> SPOT   pen   min OVR gap to flex');
console.log('----------------------------------------------------------------');
let count = 0;
for (const r of results) {
  const gapStr = r.gap === null ? 'never' : r.gap.toString().padStart(3);
  console.log(`${r.dest.padEnd(6)} ${String(r.weight).padStart(5)}  ${r.alt.padEnd(4)} -> ${r.dest.padEnd(4)}   ${String(r.pen).padStart(3)}   gap: ${gapStr}`);
  if (r.gap !== null && r.gap <= 20) count++;
}
console.log('');
console.log(`Positions where a flex is attractive within a 20 OVR gap: ${count} of ${results.length}`);
console.log('These are the positions most likely to flex OUT early (first 10 rounds).');