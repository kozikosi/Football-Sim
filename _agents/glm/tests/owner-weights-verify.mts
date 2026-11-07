// GLM probe for the Owner's 7 Nov weight directive: measures Claude's engine's REVEALED impact
// for every slot (derivedWeights on the matchup model itself — the lab's method, ported, no
// engine edits) against (a) the Owner's table verbatim and (b) the SLOTS constant.
// Usage: node --experimental-strip-types _agents/glm/tests/owner-weights-verify.mts
import { derivedWeights, WEIGHT_UNIT_WINS } from '../../../colors/src/sports/nfl/engine/value.ts';
import { SLOTS, WEIGHT } from '../../../colors/src/sports/nfl/engine/slots.ts';
import type { SlotId } from '../../../colors/src/sports/nfl/engine/slots.ts';

// The Owner's 7 Nov directive, verbatim (salary $M, weight; "slightly above average" player).
const OWNER: [string, number, number, SlotId][] = [
  ['40', 'QB', 1000, 'QB'], ['10', 'RB1', 250, 'RB1'], ['4', 'RB2', 100, 'RB2'], ['1', 'FB', 25, 'FB'],
  ['25', 'WR1', 650, 'WR1'], ['15', 'WR2', 400, 'WR2'], ['4', 'WR3', 100, 'WR3'], ['2', 'WR4', 50, 'WR4'],
  ['10', 'TE1', 250, 'TE1'], ['5', 'TE2', 150, 'TE2'], ['2', 'TE3', 50, 'TE3'],
  ['20', 'OT1', 500, 'OT1'], ['15', 'OG1', 400, 'OG1'], ['5', 'C', 150, 'C'], ['10', 'OG2', 250, 'OG2'], ['12', 'OT2', 300, 'OT2'],
  ['25', 'DE1', 650, 'DE1'], ['12', 'DE2', 300, 'DE2'], ['20', 'DT1', 500, 'DT1'], ['10', 'DT2', 300, 'DT2'], ['5', 'DL5', 150, 'DL5'],
  ['12', 'MIKE', 300, 'MIKE'], ['6', 'WILL', 150, 'WILL'], ['3', 'SAM', 100, 'SAM'],
  ['15', 'CB1', 400, 'CB1'], ['10', 'CB2', 250, 'CB2'], ['4', 'NICKEL', 100, 'CB3'], ['2', 'DIME', 50, 'DIME'],
  ['12', 'SS', 300, 'SS'], ['12', 'FS', 300, 'FS'], ['2', 'K', 50, 'K'], ['2', 'P', 50, 'P'],
];

const r1 = (x: number): number => Math.round(x * 10) / 10;

// 1. Owner table vs the engine constant (SLOTS):
let exact = 0;
console.log('slot       salary  owner  const  revealed43  err43  revealed34  err34  dev(25x$)');
const reveal43 = derivedWeights('4-3'), reveal34 = derivedWeights('3-4');
let maxErr43 = 0, maxErr34 = 0, within50 = 0;
const order: { id: SlotId; w: number; r: number; own: number }[] = [];
for (const [sal, _, own, slot] of OWNER) {
  const c = WEIGHT[slot], rev43 = reveal43[slot], rev34 = reveal34[slot];
  if (c === own) exact++;
  const e43 = r1(rev43 - own), e34 = r1(rev34 - own);
  maxErr43 = Math.max(maxErr43, Math.abs(e43)); maxErr34 = Math.max(maxErr34, Math.abs(e34));
  if (Math.abs(e43) <= 50 && Math.abs(e34) <= 50) within50++;
  const dev = own - 25 * +sal;
  console.log(`${slot.padEnd(9)} ${sal.padStart(4)}M  ${String(own).padStart(5)} ${String(c).padStart(5)} ${r1(rev43).toFixed(1).padStart(11)} ${String(e43).padStart(6)} ${(rev34 ? r1(rev34).toFixed(1) : '-').padStart(11)} ${(rev34 ? String(e34) : '-').padStart(6)} ${String(dev).padStart(5)}`);
  order.push({ id: slot, w: c, r: rev43, own });
}
console.log(`\nCONST MATCH: ${exact}/32 exact (owner table == SLOTS constant)`);
console.log(`REVEALED vs OWNER 4-3: max err ${maxErr43} · 3-4: max err ${maxErr34} · slots inside ±50 on both bases: ${within50}/32`);
console.log(`unit check: 1 weight point = ${WEIGHT_UNIT_WINS} wins (70→90 OVR at the slot)`);

// 2. Draft-board order the weights imply (top 8 and bottom 4 by owner weight, revealed as tiebreak):
const byW = order.sort((a, b) => b.own - a.own || b.r - a.r);
console.log(`\nDraft priority (owner weight desc): ${byW.slice(0, 8).map((o) => o.id + ' ' + o.own).join('  ')}`);
console.log(`                        bottom 4:  ${byW.slice(-4).map((o) => o.id + ' ' + o.own).join('  ')}`);
