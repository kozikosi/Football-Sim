// MUSE seat independent P-321 check: slotWins20 spread stability + baseline change.
// Runs the REAL engine math (PreColors sha256 40233d6be00e987c) by extracting the pure
// functions from Football-Sim-PreColors.html. Computes OLD (70->90, everything else at
// 80) and NEW (per-position pool-grounded center, everything else at position-specific
// averages) local slopes at h = 3, 5, 7, 10. Centers from BOTH pools: the CSV
// (data/madden27-ratings.csv, n=1,941) and the engine's embedded PLAYERS (n=1,200).
// Run from the repo root: node _agents/muse/deliveries/slotwins20-spread-muse-check.mjs
import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const preSrc = fs.readFileSync(path.join(root, 'Football-Sim-PreColors.html'), 'utf8');
// Extract the inline script (between the first <script> and </script>).
const sm = preSrc.match(/<script>([\s\S]*?)<\/script>/);
if (!sm) throw new Error('inline script not found');
const lines = sm[1].split('\n');

function stripComment(line) {
  const idx = line.indexOf('//');
  return idx === -1 ? line : line.slice(0, idx);
}
function extract(start1) {
  let i = start1 - 1, depth = 0, started = false;
  const out = [];
  while (i < lines.length) {
    const line = lines[i];
    out.push(line);
    const code = stripComment(line);
    for (const ch of code) {
      if (ch === '{') { depth++; started = true; }
      else if (ch === '}') depth--;
    }
    i++;
    if (started && depth === 0) break;
    if (!started && code.trim().endsWith(';')) break;
  }
  return out.join('\n');
}
function findLine(re) {
  for (let i = 0; i < lines.length; i++) if (re.test(lines[i])) return i + 1;
  throw new Error('not found: ' + re);
}
const T = [
  ['DEFAULT_WEIGHTS', /const DEFAULT_WEIGHTS = \{/],
  ['modelWeights', /function modelWeights\(\)/],
  ['ROSTER_SLOTS', /const ROSTER_SLOTS = \[/],
  ['WV_OFF_SLOTS', /const WV_OFF_SLOTS = new Set/],
  ['bestUnitPts', /function bestUnitPts\(/],
  ['slotWinsTable', /function slotWinsTable\(\)/],
  ['slotWins', /function slotWins\(slot, ovr\)/],
  ['slotWinsPerOvr', /function slotWinsPerOvr\(\)/],
  ['clampNum', /function clampNum\(/],
  ['RATING_SPECS', /const RATING_SPECS = \{/],
  ['slotOvr', /function slotOvr\(/],
  ['wavgSlots', /function wavgSlots\(/],
  ['RET_PICK', /const RET_PICK = new WeakMap/],
  ['RET_PTS', /const RET_PTS = /],
  ['retScore', /function retScore\(/],
  ['teamRatings', /function teamRatings\(/],
  ['PERS', /const PERS = \{/],
  ['STRAT', /const STRAT = \{/],
  ['DEF_FOCUS', /const DEF_FOCUS = \{/],
  ['PERS_REC', /const PERS_REC = \{/],
  ['DEF_SPECS', /const DEF_SPECS = \{/],
  ['PLAN_K', /const PLAN_K = \{/],
  ['NEUTRAL_OFF', /const NEUTRAL_OFF = \{/],
  ['OFF_OPTS', /const OFF_OPTS = \[\], DEF_OPTS/],
  ['OFF_OPTS_fill', /\['11','12','13','21','22'\]\.forEach/],
  ['DEF_OPTS_fill', /\['base','nickel'\]\.forEach/],
  ['offShift', /function offShift\(/],
  ['normCdf', /function normCdf\(/],
  ['applyOffPlan', /function applyOffPlan\(/],
  ['applyDefPlan', /function applyDefPlan\(/],
  ['MC', /const MC = \{/],
  ['RUSH_BASE', /const RUSH_BASE = /],
  ['PT_RUSH', /const PT_RUSH = /],
  ['BASE_PTS', /const BASE_PTS = /],
  ['softCap', /function softCap\(/],
  ['matchupModel', /function matchupModel\(/],
  ['RETURN_SLOTS', /const RETURN_SLOTS = \[/],
  ['returnerCandidates', /function returnerCandidates\(/],
  ['returnerRating', /function returnerRating\(/],
  ['POINTS_PER_WIN', /const POINTS_PER_WIN = /],
];
let engineSrc = 'let _wpoCache = null, _wTable = null;\n';
for (const [label, re] of T) engineSrc += '// ' + label + '\n' + extract(findLine(re)) + '\n\n';

const sandbox = { console, Math, Object, Array, WeakMap, Set, Map, JSON };
vm.createContext(sandbox);
vm.runInContext(engineSrc + '\nthis.__eng = { ROSTER_SLOTS, teamRatings, bestUnitPts, slotWinsTable, slotWins, slotWinsPerOvr, modelWeights, POINTS_PER_WIN, WV_OFF_SLOTS };', sandbox);
const E = sandbox.__eng;
const { ROSTER_SLOTS, teamRatings, bestUnitPts, slotWins, slotWinsPerOvr, modelWeights, POINTS_PER_WIN, WV_OFF_SLOTS } = E;

// Embedded PLAYERS pool (from the inline script).
const pm = sm[1].match(/const PLAYERS = (\[[\s\S]*?\]);\n/);
if (!pm) throw new Error('PLAYERS array not found');
const PLAYERS = eval(pm[1]);
console.log('Embedded PLAYERS n=' + PLAYERS.length);

// CSV pool.
const csvText = fs.readFileSync(path.join(root, 'data/madden27-ratings.csv'), 'utf8').trim().split('\n').slice(1);
const csvRows = csvText.map(l => {
  const mm = /^(.*),([A-Z]+),([^,]+),(\d+),(\d+),(\d+)$/.exec(l);
  return [mm[1], mm[2], mm[3], +mm[4], +mm[5], +mm[6]];
});
console.log('CSV pool n=' + csvRows.length);

function poolMean(rows, posList) {
  let s = 0, n = 0;
  for (const r of rows) if (posList.includes(r[1])) { s += r[3]; n++; }
  return s / n;
}
const SLOT_POS = {
  QB: ['QB'], RB1: ['HB'], RB2: ['HB'], WR1: ['WR'], WR2: ['WR'], WR3: ['WR'],
  TE1: ['TE'], TE2: ['TE'], OT1: ['LT', 'RT'], OT2: ['LT', 'RT'],
  OG1: ['LG', 'RG'], OG2: ['LG', 'RG'], C: ['C'],
  DE1: ['REDG', 'LEDG'], DE2: ['REDG', 'LEDG'], DT1: ['DT'], DT2: ['DT'],
  MIKE: ['MIKE', 'WILL', 'SAM'], WILL: ['MIKE', 'WILL', 'SAM'], SAM: ['MIKE', 'WILL', 'SAM'],
  CB1: ['CB'], CB2: ['CB'], CB3: ['CB'], SS: ['SS'], FS: ['FS'], K: ['K'],
};
function centerMap(rows) {
  const out = {};
  for (const s of ROSTER_SLOTS) out[s] = poolMean(rows, SLOT_POS[s]);
  return out;
}
const csvCenter = centerMap(csvRows);
const embCenter = centerMap(PLAYERS);
console.log('CSV overall mean: ' + (csvRows.reduce((a, r) => a + r[3], 0) / csvRows.length).toFixed(2));
console.log('Embedded overall mean: ' + (PLAYERS.reduce((a, r) => a + r[3], 0) / PLAYERS.length).toFixed(2));

function winsTableForBase(baseOvr) {
  const base = {};
  ROSTER_SLOTS.forEach(s => { base[s] = { ovr: baseOvr[s] }; });
  const lg = teamRatings(base), k = 17 / POINTS_PER_WIN;
  const b0 = { on: bestUnitPts(lg, lg, true), off: bestUnitPts(lg, lg, false) };
  const T = {};
  ROSTER_SLOTS.forEach(s => {
    const isOff = WV_OFF_SLOTS.has(s), arr = [];
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

const oldSlope = slotWinsPerOvr();
console.log('\nOLD slotWinsPerOvr (engine, 70->90, else 80):');
for (const s of ROSTER_SLOTS) console.log(' ' + s + ' ' + oldSlope[s].toFixed(4));
console.log('modelWeights() (engine): ' + JSON.stringify(modelWeights()));

function runNew(center, label) {
  const T = winsTableForBase(center);
  console.log('\n=== NEW (' + label + ') ===');
  console.log('slot center OLD NEW@3 NEW@5 NEW@7 NEW@10 maxDelta');
  const res = {};
  for (const s of ROSTER_SLOTS) {
    const c = center[s];
    const n3 = localSlope(T, s, c, 3), n5 = localSlope(T, s, c, 5),
          n7 = localSlope(T, s, c, 7), n10 = localSlope(T, s, c, 10);
    const mx = Math.max(n3, n5, n7, n10), mn = Math.min(n3, n5, n7, n10);
    res[s] = { center: c, old: oldSlope[s], n3, n5, n7, n10, maxDelta: mx - mn };
    console.log(s.padEnd(5) + c.toFixed(2).padStart(6) + ' ' + oldSlope[s].toFixed(4).padStart(7) +
      ' ' + n3.toFixed(4).padStart(7) + ' ' + n5.toFixed(4).padStart(7) +
      ' ' + n7.toFixed(4).padStart(7) + ' ' + n10.toFixed(4).padStart(7) +
      ' ' + (mx - mn).toFixed(4).padStart(8));
  }
  return res;
}
const csvNew = runNew(csvCenter, 'CSV pool centers (n=1,941)');
const embNew = runNew(embCenter, 'Embedded PLAYERS centers (n=1,200)');

function scaledWeights(slopeMap) {
  const mx = Math.max(...Object.values(slopeMap));
  const out = {};
  for (const s of ROSTER_SLOTS) out[s] = Math.max(5, Math.round(slopeMap[s] / mx * 700 / 5) * 5);
  return out;
}
const oldW = scaledWeights(oldSlope);
const csvW5 = scaledWeights(Object.fromEntries(ROSTER_SLOTS.map(s => [s, csvNew[s].n5])));
const embW5 = scaledWeights(Object.fromEntries(ROSTER_SLOTS.map(s => [s, embNew[s].n5])));
console.log('\n=== modelWeights-equivalent (max->700, nearest 5, floor 5) ===');
console.log('slot OLD NEW@5(CSV) NEW@5(embedded)');
for (const s of ROSTER_SLOTS) {
  console.log(s.padEnd(5) + String(oldW[s]).padStart(5) + String(csvW5[s]).padStart(10) + String(embW5[s]).padStart(14));
}

function D(slopeMap, a, b) { return 20 * (1 - slopeMap[a] / slopeMap[b]); }
const pairs = [['TE1', 'DE1'], ['RB1', 'WR1'], ['TE1', 'OT1'], ['DT1', 'DE1']];
console.log('\n=== D for the four proposed rules (CSV centers) ===');
console.log('rule OLD NEW@3 NEW@5 NEW@7 NEW@10');
for (const [a, b] of pairs) {
  const d = h => D(Object.fromEntries(ROSTER_SLOTS.map(s => [s, csvNew[s]['n' + h]])), a, b);
  console.log((a + '>' + b).padEnd(9) + D(oldSlope, a, b).toFixed(2).padStart(7) +
    d(3).toFixed(2).padStart(7) + d(5).toFixed(2).padStart(7) + d(7).toFixed(2).padStart(7) + d(10).toFixed(2).padStart(7));
}

console.log('\n=== Spread-only weight moves (CSV centers): max |weight(h) - weight(5)| ===');
const worst = [];
for (const s of ROSTER_SLOTS) {
  const w = h => scaledWeights(Object.fromEntries(ROSTER_SLOTS.map(x => [x, csvNew[x]['n' + h]])))[s];
  worst.push([s, Math.max(Math.abs(w(3) - w(5)), Math.abs(w(7) - w(5)), Math.abs(w(10) - w(5)))]);
}
worst.sort((a, b) => b[1] - a[1]);
console.log(worst.slice(0, 8).map(([s, m]) => s + ':' + m).join('  '));
console.log('slots with spread-only weight move > 0: ' + worst.filter(([, m]) => m > 0).length + ' of ' + ROSTER_SLOTS.length);

console.log('\n=== CSV centers vs embedded centers (NEW@5 slope): max |diff| ===');
let maxDiff = 0, worstSlot = '';
for (const s of ROSTER_SLOTS) {
  const d = Math.abs(csvNew[s].n5 - embNew[s].n5);
  if (d > maxDiff) { maxDiff = d; worstSlot = s; }
}
console.log('max |CSV@5 - embedded@5| = ' + maxDiff.toFixed(4) + ' (' + worstSlot + ')');
