// measure-slot-slope.mjs — VLOC measurement harness for the slotWins20 spread question (P-321).
// Reads Football-Sim-PreColors.html, extracts its inline script, runs it in Node with a minimal
// DOM shim, and measures the slot-wins slope at half-spreads 3, 5, 7, 10 for every roster slot.
//
// Experiment A (isolates the spread effect): center = 80 for every slot, everything else at 80.
//   h=10 reproduces the OLD slotWinsPerOvr() (70->90 over 20 OVR).
// Experiment B (MUSE proposal refinement): per-position center = pool average OVR for that slot's
//   position, everything else at that position's pool average OVR. h in {3,5,7,10}.
// Also reports modelWeights under OLD vs MUSE h=5, and position-average OVR sanity checks.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const HTML = path.join(ROOT, 'Football-Sim-PreColors.html');
if (!fs.existsSync(HTML)) { console.error('product HTML not found at', HTML); process.exit(4); }
const html = fs.readFileSync(HTML, 'utf8');

// ---- extract inline script (same regex as tools/lint.mjs) ----
const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/g; let m; const parts = [];
while ((m = re.exec(html))) {
  if (/\bsrc\s*=/.test(m[1])) continue;
  if (/type\s*=\s*["']?(?!text\/javascript|module)/i.test(m[1]) && /type\s*=/.test(m[1])) continue;
  parts.push(m[2]);
}
const script = parts.join('\n');

// ---- minimal DOM shim so the product's top-level code loads in Node ----
const fakeEl = {
  addEventListener(){}, removeEventListener(){},
  classList: { add(){}, remove(){}, contains(){ return false; }, toggle(){ return true; } },
  querySelectorAll(){ return []; }, querySelector(){ return null; },
  children: [], parentElement: null, clientWidth: 0, scrollWidth: 0,
  dataset: {}, textContent: '', rows: [], cells: [], tHead: null, style: {},
  setAttribute(){}, getAttribute(){ return null; },
  appendChild(n){ return n; }, insertBefore(n){ return n; }, removeChild(){}, insertAdjacentHTML(){},
  parentNode: null,
};
const doc = {
  body: fakeEl, documentElement: fakeEl, head: fakeEl,
  getElementById: () => fakeEl, querySelectorAll: () => [fakeEl], querySelector: () => fakeEl,
  createElement: () => fakeEl, addEventListener(){}, removeEventListener(){},
  location: { href: '' },
};
globalThis.window = globalThis;
globalThis.document = doc;
Object.defineProperty(globalThis, 'location', { value: doc.location, configurable: true });
Object.defineProperty(globalThis, 'navigator', { value: { userAgent: 'node-measure', language: 'en' }, configurable: true });
globalThis.addEventListener = () => {}; globalThis.removeEventListener = () => {}; globalThis.dispatchEvent = () => true;
globalThis.scrollTo = () => {}; globalThis.scrollBy = () => {}; globalThis.alert = () => {}; globalThis.open = () => null;
globalThis.MutationObserver = function(){ this.observe = () => {}; this.disconnect = () => {}; this.takeRecords = () => []; };
globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} };
globalThis.matchMedia = () => ({ matches: false, addEventListener(){}, removeEventListener(){}, addListener(){}, removeListener(){} });
globalThis.ResizeObserver = function(){ this.observe = () => {}; this.disconnect = () => {}; this.unobserve = () => {}; };

let engine = null;
try {
  engine = new Function(
    'window','document','location','navigator','MutationObserver','localStorage','matchMedia','ResizeObserver',
    'setTimeout','setInterval','clearTimeout','clearInterval','console','Promise',
    script + '\nreturn { ROSTER_SLOTS, WV_OFF_SLOTS, WV_SLOT_GROUP, WV_TAG_GROUP, POS_SLOT_MAP, NATURAL_SLOT_MAP, FLEX, PLAYERS, TEAM_DATA, DEFAULT_WEIGHTS, POINTS_PER_WIN, WINS_BASE, slotWinsTable, slotWins, teamRatings, bestUnitPts, matchupModel, modelWeights, slotWinsPerOvr, slotRoleRows };'
  )(globalThis, doc, doc.location, globalThis.navigator, globalThis.MutationObserver, globalThis.localStorage, globalThis.matchMedia, globalThis.ResizeObserver,
    setTimeout, setInterval, clearTimeout, clearInterval, console, Promise);
} catch (e) {
  console.error('engine eval failed:', e.message);
  process.exit(5);
}
if (!engine) { console.error('engine returned null'); process.exit(5); }

const {
  ROSTER_SLOTS, WV_OFF_SLOTS, WV_SLOT_GROUP, WV_TAG_GROUP, POS_SLOT_MAP, PLAYERS,
  DEFAULT_WEIGHTS, POINTS_PER_WIN, slotWinsTable, slotWins, teamRatings, bestUnitPts, matchupModel,
  modelWeights, slotWinsPerOvr,
} = engine;

// ---- sanity: position-average OVR from the pool (compare to MUSE's quoted values) ----
function posAvg(tag) {
  const vals = PLAYERS.filter(p => p[1] === tag).map(p => p[3]);
  return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length) : 80;
}
// slot -> exact position tag (LT vs RT, LG vs RG, LEDG vs REDG kept separate, like MUSE)
const SLOT_POS = {
  QB:'QB', RB1:'HB', RB2:'HB', WR1:'WR', WR2:'WR', WR3:'WR', TE1:'TE', TE2:'TE',
  OT1:'LT', OT2:'RT', OG1:'LG', OG2:'RG', C:'C',
  DE1:'LEDG', DE2:'REDG', DT1:'DT', DT2:'DT',
  MIKE:'MIKE', WILL:'WILL', SAM:'SAM',
  CB1:'CB', CB2:'CB', CB3:'CB', SS:'SS', FS:'FS', K:'K',
};
const POS_AVG = {}; Object.values(SLOT_POS).forEach(t => { POS_AVG[t] = posAvg(t); });
const allOvr = PLAYERS.map(p => p[3]);
console.log(`pool: ${PLAYERS.length} players, mean OVR = ${(allOvr.reduce((a,b)=>a+b,0)/allOvr.length).toFixed(2)}`);
console.log('position-average OVR from pool (n = players):');
for (const t of Object.keys(POS_AVG)) {
  const n = PLAYERS.filter(p => p[1] === t).length;
  console.log(`  ${t.padEnd(6)} avg=${POS_AVG[t].toFixed(2)} n=${n}`);
}

// ---- table builder: baseOvrBySlot = fixed OVR for every slot except the one being varied ----
function buildTable(baseOvrBySlot) {
  const T = {}, k = 17 / POINTS_PER_WIN;
  const lg = teamRatings(Object.fromEntries(ROSTER_SLOTS.map(s => [s, { ovr: 80 }])));
  const b0on = bestUnitPts(lg, lg, true), b0off = bestUnitPts(lg, lg, false);
  ROSTER_SLOTS.forEach(s => {
    const isOff = WV_OFF_SLOTS.has(s), arr = [];
    for (let o = 50; o <= 100; o++) {
      const sm = {};
      ROSTER_SLOTS.forEach(s2 => { sm[s2] = { ovr: baseOvrBySlot[s2] }; });
      sm[s] = { ovr: o };
      const R = teamRatings(sm);
      arr.push((bestUnitPts(R, lg, isOff) - (isOff ? b0on : b0off)) * k);
    }
    T[s] = arr;
  });
  return T;
}
function sw(T, slot, ovr) {
  const t = T[slot], x = Math.max(50, Math.min(99.999, ovr)) - 50, i = Math.floor(x), f = x - i;
  return t[i] * (1 - f) + t[i + 1] * f;
}
function slope(T, slot, center, h) {
  const lo = Math.max(50, center - h), hi = Math.min(99.999, center + h);
  return (sw(T, slot, hi) - sw(T, slot, lo)) / (hi - lo);
}

// ---- sanity check: experiment A base-80 table must reproduce slotWinsTable() ----
const Tcheck = buildTable(Object.fromEntries(ROSTER_SLOTS.map(s => [s, 80])));
const Tengine = slotWinsTable();
let checkOk = true;
for (const s of ROSTER_SLOTS) {
  for (let o = 50; o <= 99; o += 7) {
    if (Math.abs(sw(Tcheck, s, o) - slotWins(s, o)) > 1e-9) { checkOk = false; }
  }
}
console.log('\nsanity: buildTable(all-80) reproduces engine slotWinsTable:', checkOk ? 'OK' : 'MISMATCH');

// ---- experiments ----
const base80 = Object.fromEntries(ROSTER_SLOTS.map(s => [s, 80]));
const basePos = Object.fromEntries(ROSTER_SLOTS.map(s => [s, POS_AVG[SLOT_POS[s]]]));
const TA = buildTable(base80);          // experiment A: everything else at 80
const TB = buildTable(basePos);         // experiment B: everything else at position averages
const CENTER_POS = Object.fromEntries(ROSTER_SLOTS.map(s => [s, POS_AVG[SLOT_POS[s]]]));
const spreads = [3, 5, 7, 10];
const hLabel = h => `±${h}`;

function slopesFor(T, centerFor) {
  const out = {};
  ROSTER_SLOTS.forEach(s => {
    const c = (centerFor != null && centerFor[s] !== undefined) ? centerFor[s] : 80;
    out[s] = spreads.map(h => slope(T, s, c, h));
  });
  return out;
}
const fixedCenter = slopesFor(TA, null);      // A: center 80, everything-else 80
const muse = slopesFor(TB, CENTER_POS);       // B: per-position center, everything-else pos-avg
const old = slotWinsPerOvr();                  // current: center 80, half-spread 10, everything-else 80

// ---- modelWeights from a slope map (same scaling as engine: max->700, nearest 5, floor 5) ----
function weightsFrom(slopeMap) {
  const w = {}, mx = Math.max(...ROSTER_SLOTS.map(s => slopeMap[s]));
  ROSTER_SLOTS.forEach(s => {
    w[s] = Math.max(5, Math.round((slopeMap[s] / mx) * 700 / 5) * 5);
  });
  return w;
}
const wOld = weightsFrom(old);                                   // == modelWeights()
const wMuseH5 = weightsFrom(Object.fromEntries(ROSTER_SLOTS.map(s => [s, muse[s][1]]))); // B, h=5
const wFixedH5 = weightsFrom(Object.fromEntries(ROSTER_SLOTS.map(s => [s, fixedCenter[s][1]]))); // A, h=5

// ---- reporting helpers ----
const pad = (s, w) => String(s).padEnd(w);
const f3 = (x) => x.toFixed(3);
const pct = (x) => (x * 100).toFixed(1) + '%';

console.log('\n===============================================================================');
console.log('SLOT-WINS SLOPE AT EACH SPREAD (wins per +1 OVR), side by side');
console.log('===============================================================================');
console.log(pad('slot', 8) + pad('OLD(70-90)', 12) + pad('A h=3', 10) + pad('A h=5', 10) + pad('A h=7', 10) + pad('A h=10', 10) + pad('B h=3', 10) + pad('B h=5', 10) + pad('B h=7', 10) + pad('B h=10', 10) + pad('maxΔ A', 10) + pad('maxΔ B', 10));
for (const s of ROSTER_SLOTS) {
  const a = fixedCenter[s], b = muse[s];
  const maxA = Math.max(...a) - Math.min(...a);
  const maxB = Math.max(...b) - Math.min(...b);
  console.log(pad(s, 8) + pad(f3(old[s] || 0), 12) + pad(f3(a[0]), 10) + pad(f3(a[1]), 10) + pad(f3(a[2]), 10) + pad(f3(a[3]), 10) +
    pad(f3(b[0]), 10) + pad(f3(b[1]), 10) + pad(f3(b[2]), 10) + pad(f3(b[3]), 10) + pad(f3(maxA), 10) + pad(f3(maxB), 10));
}

// which slots move most between spreads (experiment A, fixed center)
const moveRank = ROSTER_SLOTS.map(s => ({ s, d: Math.max(...fixedCenter[s]) - Math.min(...fixedCenter[s]) }))
  .sort((x, y) => y.d - x.d);
console.log('\nSlots whose slope moves MOST across spreads (experiment A, center 80, everything-else 80):');
moveRank.slice(0, 8).forEach(x => console.log(`  ${x.s.padEnd(6)} Δ=${x.d.toFixed(4)}  (h3..h10 = ${fixedCenter[x.s].map(f3).join(', ')})`));

// ---- model weights: OLD vs MUSE h=5 ----
console.log('\n===============================================================================');
console.log('MODEL WEIGHTS (max scaled to 700): OLD (70->90) vs MUSE per-position-center h=5');
console.log('===============================================================================');
console.log(pad('slot', 8) + pad('OLD', 8) + pad('MUSE h=5', 10) + pad('Δ', 8) + '  ' + pad('slot', 8) + pad('OLD', 8) + pad('MUSE h=5', 10) + pad('Δ', 8));
const half = Math.ceil(ROSTER_SLOTS.length / 2);
for (let i = 0; i < half; i++) {
  const s1 = ROSTER_SLOTS[i], s2 = ROSTER_SLOTS[i + half] || null;
  const d1 = (wMuseH5[s1] || 0) - (wOld[s1] || 0);
  const d2 = s2 ? (wMuseH5[s2] || 0) - (wOld[s2] || 0) : 0;
  console.log(pad(s1, 8) + pad(wOld[s1] || 0, 8) + pad(wMuseH5[s1] || 0, 10) + pad(d1, 8) +
    (s2 ? '  ' + pad(s2, 8) + pad(wOld[s2] || 0, 8) + pad(wMuseH5[s2] || 0, 10) + pad(d2, 8) : ''));
}
const wChanged = ROSTER_SLOTS.filter(s => (wMuseH5[s] || 0) !== (wOld[s] || 0));
console.log(`\nWeights changed (OLD vs MUSE h=5): ${wChanged.length} of ${ROSTER_SLOTS.length} slots: ${wChanged.join(', ') || 'none'}`);
const maxWDelta = Math.max(...ROSTER_SLOTS.map(s => Math.abs((wMuseH5[s]||0) - (wOld[s]||0))));
console.log(`Max absolute weight change: ${maxWDelta} points (of 700 max)`);

// SPREAD-ONLY effect on weights: fixed center 80, everything-else 80, h=10 (== OLD) vs h=5.
console.log('\n-------------------------------------------------------------------------------');
console.log('SPREAD-ONLY weight effect (fixed center 80, everything-else 80): OLD h=10 vs h=5');
console.log('-------------------------------------------------------------------------------');
const wFixedH10 = wOld; // old == A h=10 (center 80, half-spread 10, everything-else 80)
const wSpreadChanged = ROSTER_SLOTS.filter(s => (wFixedH5[s] || 0) !== (wFixedH10[s] || 0));
console.log(`Slots whose weight changes from spread alone (h=10 -> h=5): ${wSpreadChanged.length} of ${ROSTER_SLOTS.length}: ${wSpreadChanged.join(', ') || 'none'}`);
for (const s of wSpreadChanged) {
  console.log(`  ${s.padEnd(6)} h=10(OLD)=${wFixedH10[s]||0}  h=5=${wFixedH5[s]||0}  Δ=${(wFixedH5[s]||0)-(wFixedH10[s]||0)}  (slope h=10=${f3(fixedCenter[s][3])}, h=5=${f3(fixedCenter[s][1])})`);
}
const maxSpreadWDelta = Math.max(...ROSTER_SLOTS.map(s => Math.abs((wFixedH5[s]||0) - (wFixedH10[s]||0))));
console.log(`Max absolute weight change from spread alone: ${maxSpreadWDelta} points (of 700 max)`);

// ---- D / roleBonus direction: factor w/0.06 under OLD vs MUSE h=5 (defensive player ratings) ----
console.log('\n===============================================================================');
console.log('DEFENSIVE RATING (roleBonus) exposure: slotWinsPerOvr() factor w/0.06, OLD vs MUSE h=5');
console.log('===============================================================================');
const DEF_SLOTS = ['DE1','DE2','DT1','DT2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS'];
for (const s of DEF_SLOTS) {
  console.log(`  ${s.padEnd(6)} OLD w/0.06 = ${((old[s]||0)/0.06).toFixed(3)}  MUSE h=5 w/0.06 = ${((muse[s][1]||0)/0.06).toFixed(3)}`);
}

// ---- P-318 link: WILL and C under old vs new ----
console.log('\nP-318 link (WILL / C): OLD w =', f3(old['WILL']||0), '/', f3(old['C']||0),
  '  MUSE h=5 w =', f3(muse['WILL'][1]||0), '/', f3(muse['C'][1]||0));

console.log('\n===============================================================================');
console.log('END OF MEASUREMENT');
console.log('===============================================================================');
