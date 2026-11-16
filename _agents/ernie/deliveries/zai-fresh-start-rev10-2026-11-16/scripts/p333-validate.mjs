#!/usr/bin/env node
/* p333-validate.mjs — Part A harness validation.
 * Replicates colors/test/nfl/formation-gap.test.ts EXACTLY (the Architect's protocol, DL5 pinned)
 * on the vendored pin engine (d3bd81d2), under BOTH providers:
 *   table    = the pin's own spender (slot.weight, the retired fitted reference)
 *   measured = the P-318 provider replicated on the pin: units = derivedWeights(row, base)
 *              (valueprovider.ts: winsPerOvr = slotWins20(row, base)/20; unitsOf = /WINS_PER_UNIT
 *              = slotWins20/0.00254 = derivedWeights — same number the engine's value.ts exports)
 * EXPECTED (work-order premises): gap 900 (table) / 914.5 (measured), DL5=DT pinned;
 * DL5=EDGE → 0. Own-base value 600250 (table). If any of these fail, the HARNESS is wrong —
 * fix it before any candidate is measured.
 * Run: node p333-validate.mjs   (exit 0 = harness validated)
 */
import { fieldSlots } from '../football-sim-vue/src/engine/sports/nfl/engine/slots.ts';
import { hungarian } from '../football-sim-vue/src/engine/core/hungarian.ts';
import { fit, EMERGENCY_PENALTY } from '../football-sim-vue/src/engine/sports/nfl/engine/flex.ts';
import { derivedWeights, WEIGHT_UNIT_WINS } from '../football-sim-vue/src/engine/sports/nfl/engine/value.ts';
import { WEIGHT, SLOT_IDS } from '../football-sim-vue/src/engine/sports/nfl/engine/slots.ts';

const EMPTY_OVR = 70, PLAYS = 1e7, EMERGENCY = 1e5, ILLEGAL = 1e12;
let uid = 0;
const mk = (role) => ({ id: `g${uid++}|${role}|T`, name: `g${uid}`, pos: role, role, team: 'T', ovr: 70, spd: 70, str: 70, freeAgent: false });
const native = (base, dl5) => fieldSlots(base).map((x) => mk(x.dest === 'NICKEL' || x.dest === 'DIME' ? 'CB' : x.dest === 'DL5' ? dl5 : x.dest));

// the provider seam, exactly as valueprovider.ts + the architect's lineup.ts spend it
// (measuredValues() memoizes per base — one measurement per base, reused; never re-derive per slot)
const unitsTable = (row) => WEIGHT[row];                       // pin engine spender (slot.weight)
const _memo = new Map();
const unitsMeasured = (row, base) => {
  // derivedWeights(base) already returns every slot's units — one call per base, then index
  let t = _memo.get(base);
  if (!t) { t = derivedWeights(base); _memo.set(base, t); }
  return t[row];
};

function optimalLineupP(players, slots, units, base = '4-3') {
  const n = players.length, s = slots.length, k = n + s;
  const v = slots.map((f) => units(f.row, base));
  const cost = [];
  for (let i = 0; i < k; i++) {
    const row = new Array(k).fill(0);
    for (let j = 0; j < s; j++) {
      if (i < n) {
        const f = fit(players[i].role, slots[j].dest);
        row[j] = f.legal ? -(PLAYS + v[j] * (players[i].ovr - f.penalty)) + (f.emergency ? EMERGENCY : 0) : ILLEGAL;
      } else {
        row[j] = -v[j] * EMPTY_OVR;
      }
    }
    cost.push(row);
  }
  const asg = hungarian(cost);
  const placements = slots.map((slot) => ({ slot, player: null, effOvr: EMPTY_OVR, penalty: 0, emergency: false }));
  const bench = [];
  for (let i = 0; i < n; i++) {
    const j = asg[i];
    if (j >= s) { bench.push(players[i]); continue; }
    const f = fit(players[i].role, slots[j].dest);
    placements[j] = { slot: slots[j], player: players[i], effOvr: players[i].ovr - f.penalty, penalty: f.penalty, emergency: f.emergency };
  }
  const value = placements.reduce((t, p, j) => t + v[j] * p.effOvr, 0);
  return { placements, bench, value, emergencyFills: placements.filter((p) => p.emergency).length };
}

const loss = (base, dl5, units) => {
  const ps = native(base, dl5), other = base === '4-3' ? '3-4' : '4-3';
  return optimalLineupP(ps, fieldSlots(base), units, base).value - optimalLineupP(ps, fieldSlots(other), units, other).value;
};

let fails = 0;
const check = (what, got, want, tol = 0) => {
  const ok = Math.abs(got - want) <= tol;
  if (!ok) fails++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${what}: got ${got}${tol ? ` (tol ${tol})` : ''} want ${want}`);
};

// reference-table cells (the pinned numbers in formation-gap.test.ts)
check('own-base value (table, DL5=DT)', optimalLineupP(native('4-3', 'DT'), fieldSlots('4-3'), unitsTable, '4-3').value, 600250);
check('4-3 roster loses in 3-4 (table, DL5=DT)', loss('4-3', 'DT', unitsTable), 2700);
check('3-4 roster loses in 4-3 (table, DL5=DT)', loss('3-4', 'DT', unitsTable), 1800);
check('GAP (table, DL5=DT)', loss('4-3', 'DT', unitsTable) - loss('3-4', 'DT', unitsTable), 900);
check('GAP (table, DL5=EDGE)', loss('4-3', 'EDGE', unitsTable) - loss('3-4', 'EDGE', unitsTable), 0);

// measured provider (REPORTED, not pinned, by the Architect's own test — premises say 914.5)
const m4 = loss('4-3', 'DT', unitsMeasured), m3 = loss('3-4', 'DT', unitsMeasured);
console.log(`measured (DL5=DT): 4-3 roster loses ${m4.toFixed(1)}, 3-4 roster loses ${m3.toFixed(1)}, gap ${(m4 - m3).toFixed(1)}`);
check('GAP (measured, DL5=DT) vs premise', m4 - m3, 914.5, 1.0);
const edgeGap = loss('4-3', 'EDGE', unitsMeasured) - loss('3-4', 'EDGE', unitsMeasured);
console.log(`measured (DL5=EDGE): gap ${edgeGap.toFixed(1)} — the Architect's test REPORTS this (not pinned); allowance < 32 (one unit per spot)`);
check('GAP (measured, DL5=EDGE) within the base-to-base noise allowance', Math.abs(edgeGap), 0, 32);

// the value scale the priority ladder must clear (premises: 98,932 single-spot / 854,227 whole-lineup)
const scale = (units) => {
  const slots = fieldSlots('4-3');
  const v = slots.map((f) => units(f.row, '4-3'));
  return { single: Math.max(...v) * 99, whole: v.reduce((t, x) => t + x * 99, 0) };
};
const st = scale(unitsTable), sm = scale(unitsMeasured);
console.log(`value scale — table: single-spot max ${st.single.toFixed(0)}, whole-lineup max ${st.whole.toFixed(0)}`);
console.log(`value scale — measured: single-spot max ${sm.single.toFixed(0)}, whole-lineup max ${sm.whole.toFixed(0)}`);
check('single-spot swing (measured)', sm.single, 98932, 1);
check('whole-lineup max (measured)', sm.whole, 854227, 1);
console.log(`EMERGENCY shipped = ${1e5} — strictly above the whole-lineup max? ${1e5 > sm.whole ? 'yes' : 'NO — mis-scaled (this is the Part A finding)'}`);
process.exit(fails ? 1 : 0);
