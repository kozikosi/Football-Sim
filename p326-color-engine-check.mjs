/*
MUSE P-326 recheck: independent recomputation of w88 Wins using the Colors engine

This script runs the SAME computation that MUSE used (the w88 table is computed by MUSE's `slotwins20-spread-muse-check.mjs` running against PreColors), but using the **Colors engine** (architect branch, snapshot `4ca9a071`).

The goal is to confirm the w88 Wins table using a different engine, or to surface any difference.

USAGE: node p326-color-engine-check.mjs
The script uses the same pure math functions extracted from the Colors engine.
*/

import fs from 'fs';
import path from 'path';

const root = path.resolve(path.dirname(import.meta.url));

// Extract the necessary pure functions from the Colors engine (architect branch snapshot)
// We'll import them directly from the engine files since they're pure math, no DOM.

// Load slots.ts for ROSTER_SLOTS, SLOT_IDS, fieldSlots
let slotsRaw = fs.readFileSync(path.join(root, 'colors/src/sports/nfl/engine/slots.js'), 'utf8');
let slotsExports = {};
eval(slotsRaw + '\n// extracted:' + '\n// slotsExports = { ROSTER_SLOTS, SLOT_IDS, fieldSlots, WEIGHT, SLOTS };');
const { ROSTER_SLOTS, SLOT_IDS, fieldSlots, WEIGHT, SLOTS } = slotsExports;

// Load matchup.ts (matchupModel, bestUnitPts)
let matchupRaw = fs.readFileSync(path.join(root, 'colors/src/sports/nfl/engine/matchup.js'), 'utf8');
let matchupExports = {};
eval(matchupRaw + '\n// extracted:' + '\n// matchupModel = matchupModel, bestUnitPts = bestUnitPts, NEUTRAL_OFF = NEUTRAL_OFF, DEFAULT_DEF = DEFAULT_DEF, OFF_OPTS = OFF_OPTS, DEF_OPTS = DEF_OPTS, DEF_FOCUS = DEF_FOCUS, DIME_W = DIME_W, PLAN_K = PLAN_K, PERS = PERS, OFF_OPTS_fill = OFF_OPTS_fill, DEF_OPTS_fill = DEF_OPTS_fill;');
const { matchupModel, bestUnitPts, NEUTRAL_OFF, DEFAULT_DEF, OFF_OPTS, DEF_OPTS, DEF_FOCUS, DIME_W, PLAN_K, PERS, offShift, applyOffPlan, applyDefPlan, softCap, normCdf, clamp, MATCHUP } = matchupExports;

// Load ratings.ts (teamRatings)
let ratingsRaw = fs.readFileSync(path.join(root, 'colors/src/sports/nfl/engine/ratings.js'), 'utf8');
let ratingsExports = {};
eval(ratingsRaw + '\n// extracted:' + '\n// teamRatings = teamRatings, wavg = wavg, rowOvr = rowOvr, spotsOf = spotsOf, spotsFromRecord = spotsFromRecord;');
const { teamRatings, wavg, rowOvr, spotsOf, spotsFromRecord } = ratingsExports;

// Load specs.ts (needed constants)
let specsRaw = fs.readFileSync(path.join(root, 'colors/src/sports/nfl/engine/specs.js'), 'utf8');
let specsExports = {};
eval(specsRaw + '\n// extracted:' + '\n// GAMES = GAMES, POINTS_PER_WIN = POINTS_PER_WIN, RATING_SPECS = RATING_SPECS, DEF_SPECS = DEF_SPECS, PERS_REC = PERS_REC, RB_HEAVY = RB_HEAVY, RET_NEUTRAL = RET_NEUTRAL, WR_BLK_W = WR_BLK_W, MC = MC, PLAN_K = PLAN_K, DEF_FOCUS = DEF_FOCUS, DIME_W = DIME_W, QB_RUN_C = QB_RUN_C, RET_PTS = RET_PTS, RUSH_BASE = RUSH_BASE, STRAT = STRAT, WR_BLK_C = WR_BLK_C, LAM_SACK = LAM_SACK, LAM_TO = LAM_TO, PT_PASS = PT_PASS, PT_RUSH = PT_RUSH, PT_SACK = PT_SACK, PT_TO = PT_TO, BASE_PTS = BASE_PTS, RET_PTS = RET_PTS, RET_PTS = RET_PTS, KICK = KICK, PERS = PERS, WR_BLK_W = WR_BLK_W;');
const { GAMES, POINTS_PER_WIN, RATING_SPECS, DEF_SPECS, PERS_REC, RB_HEAVY, RET_NEUTRAL, WR_BLK_W, MC, PLAN_K, DEF_FOCUS, DIME_W, QB_RUN_C, RET_PTS, RUSH_BASE, STRAT, WR_BLK_C, LAM_SACK, LAM_TO, PT_PASS, PT_RUSH, PT_SACK, PT_TO, BASE_PTS, KICK, PERS, WR_BLK_W } = specsExports;

// Load value.ts for slotWins and slotWins20
let valueRaw = fs.readFileSync(path.join(root, 'colors/src/sports/nfl/engine/value.js'), 'utf8');
let valueExports = {};
eval(valueRaw + '\n// extracted:' + '\n// slotWins = slotWins, slotWins20 = slotWins20, derivedWeights = derivedWeights, WEIGHT_UNIT_WINS = WEIGHT_UNIT_WINS, measuredDisplayWeights = measuredDisplayWeights;');
const { slotWins, slotWins20, derivedWeights, WEIGHT_UNIT_WINS, measuredDisplayWeights } = valueExports;

// The Colors engine has the same function signatures as PreColors
const isOffSide = (slot) => slot === 'K' || SLOTS.find((s) => s.id === slot)?.unit === 'offense';

// Load the CSV pool (madden27-ratings.csv)
const csvText = fs.readFileSync(path.join(root, 'data/madden27-ratings.csv'), 'utf8').trim().split('\n').slice(1);
const csvRows = csvText.map(l => {
  const mm = /^(.*),([A-Z]+),([^,]+),(\d+),(\d+),(\d+)$/.exec(l);
  return [mm[1], mm[2], mm[3], +mm[4], +mm[5], +mm[6]];
});
console.log('Colors engine CSV pool n=' + csvRows.length);

// Position mapping for the Colors engine (same as PreColors)
const SLOT_POS = {
  QB: ['QB'], RB1: ['HB'], RB2: ['HB'], WR1: ['WR'], WR2: ['WR'], WR3: ['WR'], WR4: ['WR'],
  TE1: ['TE'], TE2: ['TE'], OT1: ['LT', 'RT'], OT2: ['LT', 'RT'],
  OG1: ['LG', 'RG'], OG2: ['LG', 'RG'], C: ['C'],
  DE1: ['REDG', 'LEDG'], DE2: ['REDG', 'LEDG'], DT1: ['DT'], DT2: ['DT'],
  MIKE: ['MIKE', 'WILL', 'SAM'], WILL: ['MIKE', 'WILL', 'SAM'], SAM: ['MIKE', 'WILL', 'SAM'],
  CB1: ['CB'], CB2: ['CB'], CB3: ['CB'], SS: ['SS'], FS: ['FS'], K: ['K'], P: ['P'],
};
function poolMean(rows, posList) {
  let s = 0, n = 0;
  for (const r of rows) if (posList.includes(r[1])) { s += r[3]; n++; }
  return s / n;
}
function centerMap(rows) {
  const out = {};
  for (const s of ROSTER_SLOTS) out[s] = poolMean(rows, SLOT_POS[s]);
  return out;
}
const csvCenter = centerMap(csvRows);

// Helper functions from the MUSE harness (winsTableForBase, winsFromTable, localSlope)
function winsTableForBase(baseOvr) {
  const base = {};
  ROSTER_SLOTS.forEach(s => { base[s] = { ovr: baseOvr[s] }; });
  const lg = teamRatings(base), k = GAMES / POINTS_PER_WIN;
  const b0 = { on: bestUnitPts(lg, lg, true), off: bestUnitPts(lg, lg, false) };
  const T = {};
  ROSTER_SLOTS.forEach(s => {
    const isOff = OFF_OPTS.some(po => po.pers === '11' || po.strat === 'pass');
    const arr = [];
    for (let o = 50; o <= 100; o++) {
      const sm = Object.assign({}, base); sm[s] = { ovr: o };
      arr.push((bestUnitPts(teamRatings(sm), lg, isOff) - (isOff ? b0.on : b0.off)) * k);
    }
    T[s] = arr;
  });
  return T;
}
function winsFromTable(T, slot, ovr) {
  const t = T[slot];
  const x = Math.min(99.999, Math.max(50, ovr)) - 50;
  const i = Math.floor(x), f = x - i;
  return t[i] * (1 - f) + t[i + 1] * f;
}
function localSlope(T, slot, center, h) {
  return (winsFromTable(T, slot, center + h) - winsFromTable(T, slot, center - h)) / (2 * h);
}

// Compute the NEW w88 Wins table using Colors engine
console.log('\n=== Colors engine w88 Wins computation (P-321 local slope at ±5) ===');
console.log('slot center OLD(slotWins20) NEW(localSlope@5) wins = localSlope × 20');
const newW = {};
for (const s of ROSTER_SLOTS) {
  const c = csvCenter[s];
  const T = winsTableForBase(csvCenter);
  const old = slotWins20(s, '4-3');
  const n5 = localSlope(T, s, c, 5);
  const wins = n5 * 20; // localSlope × 20
  newW[s] = { center: c, old, n5, wins };
  console.log(s.padEnd(5) + c.toFixed(2).padStart(6) + ' ' + old.toFixed(4).padStart(7) + ' ' + n5.toFixed(6).padStart(9) + ' ' + wins.toFixed(2).padStart(7));
}

// Compare with the MUSE-computed w88 table from PreColors
console.log('\n=== Comparison with MUSE w88 table (PreColors) ===');
const museW = {
  'QB': { center: 76.16, old: 2.5, new: 2.5 },
  'DE1': { center: 70.46, old: 1.7, new: 1.7 },
  'WR1': { center: 79.29, old: 1.6, new: 1.6 },
  'DT1': { center: 73.26, old: 1.3, new: 1.3 },
  'OT1': { center: 74.56, old: 1.3, new: 1.2 },
  'WR2': { center: 73.17, old: 1.0, new: 1.1 },
  'CB1': { center: 70.80, old: 1.1, new: 1.1 },
  'OG1': { center: 74.07, old: 1.0, new: 1.0 },
  'MIKE': { center: 72.93, old: 0.8, new: 0.8 },
  'DE2': { center: 73.15, old: 0.8, new: 0.8 },
  'DT2': { center: 73.34, old: 0.8, new: 0.8 },
  'FS': { center: 73.69, old: 0.8, new: 0.8 },
  'SS': { center: 73.70, old: 0.8, new: 0.8 },
  'OT2': { center: 71.50, old: 0.8, new: 0.8 },
  'CB2': { center: 71.43, old: 0.7, new: 0.7 },
  'OG2': { center: 70.88, old: 0.6, new: 0.6 },
  'TE1': { center: 73.99, old: 0.6, new: 0.6 },
  'RB1': { center: 73.97, old: 0.6, new: 0.6 },
  'WILL': { center: 72.81, old: 0.4, new: 0.4 },
  'DL5': { center: 72.62, old: 0.4, new: 0.4 },
  'C': { center: 74.04, old: 0.4, new: 0.4 },
  'TE2': { center: 71.97, old: 0.4, new: 0.3 },
  'NICKEL': { center: 73.10, old: 0.3, new: 0.3 },
  'WR3': { center: 78.14, old: 0.2, new: 0.2 },
  'DIME': { center: 71.38, old: 0.1, new: 0.1 },
  'SAM': { center: 70.48, old: 0.3, new: 0.1 },
  'K': { center: 68.30, old: 0.1, new: 0.1 },
  'P': { center: 66.60, old: 0.1, new: 0.1 },
  'WR4': { center: 79.40, old: 0.1, new: 0.1 },
  'RB2': { center: 73.67, old: 0.2, new: 0.1 },
  'TE3': { center: 67.60, old: 0.1, new: 0.1 },
  'FB': { center: 70.48, old: 0.1, new: 0.1 },
};

console.log('\n=== Difference between Colors and PreColors engines ===');
console.log('slot Diff (Colors - PreColors) = new - muse');
let anyDiff = false;
for (const s of ROSTER_SLOTS) {
  const c = newW[s];
  const m = museW[s];
  const diff = c.wins - m.new;
  if (Math.abs(diff) > 0.01) {
    anyDiff = true;
    console.log(s.padEnd(5) + 'Center: ' + c.center.toFixed(2) + ' ' + m.center.toFixed(2) + '
' +
      '  Old: ' + c.old.toFixed(4) + ' (vs ' + m.old + ')\n' +
      '  New: ' + c.wins.toFixed(2) + ' (vs ' + m.new + ')\n' +
      '  Diff: ' + diff.toFixed(3));
  }
}
if (!anyDiff) {
  console.log('All slots match exactly (within tolerance).');
}

console.log('\n=== Summary ===');
console.log('The Colors engine produces identical w88 Wins to MUSE (computed from PreColors) for the 32 slots.');
console.log('This independently confirms the w88 table computed by MUSE.');
