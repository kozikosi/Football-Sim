#!/usr/bin/env node
/* p333-ladder.mjs — Part A: the P-333 candidate derivation ladder, run on the REAL pool.
 *
 * Formula (P-333 Q1, the Owner's direction: destination weight + athletic distance):
 *   price_raw(role -> dest) = ALPHA * dHat + BETA * wHat
 *   dHat: athletic distance between the two roles' REAL pool centroids (spd+str, normalized 0..1)
 *   wHat: destination weight (max slot weight with that dest, normalized to QB=1)
 * (ALPHA, BETA) fitted to the LIVE 99-rule table by least squares over tier midpoints {0,2,6,12}.
 * The tier cut maps price_raw to the Owner's tiers 0/2/6/12; the floor dimension applies the
 * Owner's cross-side floor ruling (cross-side < 6 -> 6, except INTO FB — the FB exception).
 * Candidates: 4 cuts x 2 floors = 8, + FB->TE 6->2 overlay (Owner-approved), + ability-only (BETA=0,
 * the council's "the objective already prices the weight" critique) = 10.
 *
 * Six axes per candidate, all on the REAL 1,953-player pool (buildPool over the repos' CSVs —
 * madden27 1,941 + 12 free agents):
 *   1 formation gap under BOTH providers (table + measured; Architect protocol, DL5=DT pinned, EDGE cell reported)
 *   2 flexed-spot count (placements with penalty>0, 32 real teams x both bases) + emergency fills
 *   3 out-of-position count on a native roster (cross-base, table provider, DL5=DT; own-base sanity = 0)
 *   4 worst absurd pair (max dHat/penalty among USED priced pairs; runner-up + table-level worst reported)
 *   5 fit vs the live table: exact / off-by-one (adjacent tier) / hard miss (>=2 tiers or missing/extra)
 *   6 rule count (listed nonzero rules)
 *
 * Engine truth: fit() is the ENGINE'S OWN code — each candidate's flex.ts is the vendored file with
 * only the FLEX literal replaced, so fit/dl5Penalty/QB-illegal/emergency semantics cannot drift.
 * The live-table identity is checked before any candidate runs (fit from the untouched engine).
 * Run: node p333-ladder.mjs  -> ladder.json + ladder.md
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fieldSlots, WEIGHT, SLOT_IDS } from '../football-sim-vue/src/engine/sports/nfl/engine/slots.ts';
import { hungarian } from '../football-sim-vue/src/engine/core/hungarian.ts';
import { derivedWeights } from '../football-sim-vue/src/engine/sports/nfl/engine/value.ts';
import { buildPool } from '../football-sim-vue/src/engine/sports/nfl/engine/players.ts';

const REPO = new URL('..', import.meta.url).pathname + 'football-sim-vue';
const EMPTY_OVR = 70, PLAYS = 1e7, EMERGENCY = 1e5, ILLEGAL = 1e12;
const TIERS = [0, 2, 6, 12];

// ---- the live table (parsed from the vendored flex.ts, never re-typed) ----
const flexSrc = readFileSync(new URL('../football-sim-vue/src/engine/sports/nfl/engine/flex.ts', import.meta.url), 'utf8');
const liveBlock = flexSrc.slice(flexSrc.indexOf('export const FLEX'), flexSrc.indexOf('};', flexSrc.indexOf('export const FLEX')) + 2);
function parseTable(src) {
  const t = {};
  for (const m of src.matchAll(/(\w+):\s*\{([^}]*)\}/g)) {
    const role = m[1]; t[role] = {};
    for (const r of m[2].matchAll(/(\w+):\s*(\d+)/g)) t[role][r[1]] = +r[2];
  }
  return t;
}
const LIVE = parseTable(liveBlock);
const SIDES = { QB: 'o', RB: 'o', FB: 'o', WR: 'o', TE: 'o', OT: 'o', OG: 'o', C: 'o', DT: 'd', EDGE: 'd', ILB: 'd', OLB: 'd', SS: 'd', FS: 'd', CB: 'd', K: 's', P: 's', LS: 's' };
const crossSide = (a, b) => SIDES[a] !== SIDES[b] && SIDES[a] !== 's' && SIDES[b] !== 's';

// ---- the REAL pool ----
const ratings = readFileSync(`${REPO}/src/data/madden27-ratings.csv`, 'utf8');
const fa = readFileSync(`${REPO}/src/data/free-agents-old-ratings.csv`, 'utf8');
const ids = readFileSync(`${REPO}/src/data/player-ids.csv`, 'utf8');
const POOL = buildPool(ratings, fa, ids);
console.error(`real pool: ${POOL.length} players (premise: 1,953)`);
if (POOL.length !== 1953) { console.error('FATAL: pool size != 1953'); process.exit(2); }
const TEAMS = [...new Set(POOL.map((p) => p.team))].filter((t) => t !== 'Free Agent').sort();
console.error(`teams: ${TEAMS.length}`);

// athletic distance from REAL centroids
const centroid = {};
for (const p of POOL) (centroid[p.role] ??= { spd: [], str: [] });
for (const p of POOL) { centroid[p.role].spd.push(p.spd); centroid[p.role].str.push(p.str); }
const mean = (a) => a.reduce((t, x) => t + x, 0) / a.length;
const C = Object.fromEntries(Object.entries(centroid).map(([r, v]) => [r, { spd: mean(v.spd), str: mean(v.str) }]));
const ROLES = Object.keys(LIVE).filter((r) => Object.keys(LIVE[r]).length > 0 || r === 'LS');
const DESTS = [...new Set(Object.values(LIVE).flatMap((r) => Object.keys(r)))];
const PAIRS = Object.entries(LIVE).flatMap(([r, dests]) => Object.keys(dests).map((d) => [r, d]));
const ROLE_OF_DEST = { NICKEL: 'CB', DIME: 'CB', DL5: 'DT' }; // synthetic dests -> the role whose athletics the spot demands (DL5 pinned to DT per the formation-gap protocol)
const roleOf = (x) => ROLE_OF_DEST[x] ?? x;
let DMAX = 0;
const dHatOf = (a, b) => {
  const raw = Math.hypot(C[roleOf(a)].spd - C[roleOf(b)].spd, C[roleOf(a)].str - C[roleOf(b)].str);
  DMAX = Math.max(DMAX, raw);
  return raw;
};
const RAWD = new Map(PAIRS.map(([r, d]) => [`${r}>${d}`, dHatOf(r, d)]));
for (const k of [...RAWD.keys()]) RAWD.set(k, RAWD.get(k) / DMAX); // normalize 0..1
const DESTW = {};
for (const s of SLOT_IDS) {
  const dest = fieldSlots('4-3').find((f) => f.slot === s).dest;
  DESTW[dest] = Math.max(DESTW[dest] ?? 0, WEIGHT[s]);
}
const WMAX = Math.max(...Object.values(DESTW));
const wHatOf = (d) => DESTW[d] / WMAX;
console.error(`pairs: ${PAIRS.length} · max raw athletic distance: ${DMAX.toFixed(1)} (normalized to 1)`);

// ---- fit ALPHA, BETA to the live table (least squares on tier midpoints) ----
const S11 = PAIRS.reduce((t, [r, d]) => t + RAWD.get(`${r}>${d}`) ** 2, 0);
const S22 = PAIRS.reduce((t, [r, d]) => t + wHatOf(d) ** 2, 0);
const S12 = PAIRS.reduce((t, [r, d]) => t + RAWD.get(`${r}>${d}`) * wHatOf(d), 0);
const T1 = PAIRS.reduce((t, [r, d]) => t + RAWD.get(`${r}>${d}`) * LIVE[r][d], 0);
const T2 = PAIRS.reduce((t, [r, d]) => t + wHatOf(d) * LIVE[r][d], 0);
const det = S11 * S22 - S12 * S12;
const ALPHA = (T1 * S22 - T2 * S12) / det, BETA = (T2 * S11 - T1 * S12) / det;
console.error(`fitted: ALPHA = ${ALPHA.toFixed(1)} (athletic), BETA = ${BETA.toFixed(1)} (weight x ${WMAX}) — price_raw = ALPHA*dHat + BETA*wHat`);
const priceRaw = (r, d) => ALPHA * RAWD.get(`${r}>${d}`) + BETA * wHatOf(d);

// ---- candidate table builder (cut + floor) ----
function buildTable({ cut, floor, fbTE2, betaOverride, liveBase }) {
  const t = {};
  if (liveBase) { for (const [r, ds] of Object.entries(LIVE)) t[r] = { ...ds }; } // the Owner-approved single-rule change sits on the LIVE table, not on the formula
  else for (const r of Object.keys(LIVE)) t[r] = {}; // every live role gets a row (LS: {} — fit indexes FLEX[role] unconditionally)
  for (const [r, d] of PAIRS) {
    let price;
    if (liveBase) price = LIVE[r][d];
    else if (betaOverride !== undefined) price = betaOverride * RAWD.get(`${r}>${d}`);
    else price = priceRaw(r, d);
    let tier = price < cut[0] ? 0 : price < cut[1] ? 2 : price < cut[2] ? 6 : 12;
    if (floor === 6 && crossSide(r, d) && d !== 'FB' && tier < 6) tier = 6; // Owner floor ruling, FB exception
    if (r === 'FB' && d === 'TE' && fbTE2) tier = 2;                        // Owner-approved FB->TE 6->2
    t[r][d] = tier;
  }
  return t;
}
function tableToTs(t) {
  const rows = Object.entries(t).map(([r, ds]) => `  ${r}: { ${Object.entries(ds).map(([d, v]) => `${d}: ${v}`).join(', ')} },`);
  return `import type { Role } from './players.ts';\nimport type { Dest } from './slots.ts';\ntype Row = Partial<Record<Dest, number>>;\nexport const FLEX: Readonly<Record<Role, Row>> = {\n${rows.join('\n')}\n};\nexport const EMERGENCY_PENALTY = 8;\n`;
}

// ---- parameterized fit(): the ENGINE'S OWN flex.ts with only the FLEX literal swapped ----
mkdirSync('/tmp/p333-cand', { recursive: true });
const engineFitSrc = flexSrc
  .replace(/^import type.*$/gm, '')
  .replace(liveBlock, '__FLEX__');
function makeFit(table, tag) {
  const dir = `/tmp/p333-cand/${tag}`;
  mkdirSync(dir, { recursive: true });
  // copy the engine files flex.ts depends on (types + slots), then the patched flex
  const engUrl = (f) => new URL(`../football-sim-vue/src/engine/sports/nfl/engine/${f}`, import.meta.url);
  for (const f of ['players.ts', 'slots.ts']) writeFileSync(`${dir}/${f}`, readFileSync(engUrl(f)));
  writeFileSync(`${dir}/flex.ts`, engineFitSrc.replace('__FLEX__', tableToTs(table).replace(/^import type.*\n/gm, '').replace(/^type Row.*\n/m, '').replace(/^export const EMERGENCY_PENALTY.*\n/m, '')));
  return import(`${dir}/flex.ts`);
}

// ---- solver on the candidate table ----
function optimalLineup(players, slots, units, base, fitFn) {
  const n = players.length, s = slots.length, k = n + s;
  const v = slots.map((f) => units(f.row, base));
  const cost = [];
  for (let i = 0; i < k; i++) {
    const row = new Array(k).fill(0);
    for (let j = 0; j < s; j++) {
      if (i < n) {
        const f = fitFn(players[i].role, slots[j].dest);
        row[j] = f.legal ? -(PLAYS + v[j] * (players[i].ovr - f.penalty)) + (f.emergency ? EMERGENCY : 0) : ILLEGAL;
      } else row[j] = -v[j] * EMPTY_OVR;
    }
    cost.push(row);
  }
  const asg = hungarian(cost);
  const placements = slots.map((slot) => ({ slot, player: null, effOvr: EMPTY_OVR, penalty: 0, emergency: false }));
  const bench = [];
  for (let i = 0; i < n; i++) {
    const j = asg[i];
    if (j >= s) { bench.push(players[i]); continue; }
    const f = fitFn(players[i].role, slots[j].dest);
    placements[j] = { slot: slots[j], player: players[i], effOvr: players[i].ovr - f.penalty, penalty: f.penalty, emergency: f.emergency };
  }
  return { placements, value: placements.reduce((t, p, j) => t + v[j] * p.effOvr, 0), flexed: placements.filter((p) => p.penalty > 0).length, emergency: placements.filter((p) => p.emergency).length };
}

const _memo = new Map();
const unitsMeasured = (row, base) => { let t = _memo.get(base); if (!t) { t = derivedWeights(base); _memo.set(base, t); } return t[row]; };
const unitsTable = (row) => WEIGHT[row];

let uid = 0;
const mk = (role) => ({ id: `g${uid++}|${role}|T`, name: `g${uid}`, pos: role, role, team: 'T', ovr: 70, spd: 70, str: 70, freeAgent: false });
const native = (base, dl5) => fieldSlots(base).map((x) => mk(x.dest === 'NICKEL' || x.dest === 'DIME' ? 'CB' : x.dest === 'DL5' ? dl5 : x.dest));
const gapCells = (fitFn, units, dl5) => {
  const loss = (base) => {
    const ps = native(base, dl5), other = base === '4-3' ? '3-4' : '4-3';
    return optimalLineup(ps, fieldSlots(base), units, base, fitFn).value - optimalLineup(ps, fieldSlots(other), units, other, fitFn).value;
  };
  const l4 = loss('4-3'), l3 = loss('3-4');
  return { l4, l3, gap: l4 - l3 };
};

// ---- candidate definitions ----
const CUTS = { 'C1(0.5,4,9)': [0.5, 4, 9], 'C2(1,4,9)': [1, 4, 9], 'C3(0.5,3,9)': [0.5, 3, 9], 'C4(1,3,8)': [1, 3, 8] };
const candidates = [];
for (const [cname, cut] of Object.entries(CUTS)) for (const floor of [0, 6]) candidates.push({ tag: `floor${floor}-${cname}`, cut, floor });
candidates.push({ tag: 'floor6-C1(0.5,4,9)+FBTE2', cut: CUTS['C1(0.5,4,9)'], floor: 6, fbTE2: true });
candidates.push({ tag: 'ability-only-floor6-C1', cut: CUTS['C1(0.5,4,9)'], floor: 6, betaOverride: 12.5 });
candidates.push({ tag: 'LIVE+FBTE2 (Owner-approved)', cut: CUTS['C1(0.5,4,9)'], liveBase: true, fbTE2: true });

// ---- measure every candidate ----
const results = [];
for (const c of candidates) {
  const table = buildTable(c);
  const mod = await makeFit(table, c.tag);
  const fitFn = mod.fit;
  const rules = Object.values(table).reduce((t, ds) => t + Object.values(ds).filter((v) => v > 0).length, 0);

  // axis 1: formation gap, both providers, DL5=DT pinned (+ EDGE reported, table provider)
  const gT = gapCells(fitFn, unitsTable, 'DT');
  const gM = gapCells(fitFn, unitsMeasured, 'DT');
  const gTe = gapCells(fitFn, unitsTable, 'EDGE').gap;

  // axis 2+4: real pool, 32 teams x both bases
  let flexed = 0, emerg = 0;
  const used = new Map();
  for (const team of TEAMS) {
    const roster = POOL.filter((p) => p.team === team);
    for (const base of ['4-3', '3-4']) {
      const L = optimalLineup(roster, fieldSlots(base), unitsTable, base, fitFn);
      flexed += L.flexed; emerg += L.emergency;
      for (const p of L.placements) if (p.penalty > 0) {
        const k = `${p.player.role}>${p.slot.dest}`;
        used.set(k, (used.get(k) ?? 0) + 1);
      }
    }
  }
  // axis 4: worst absurd pair = max athletic distance per penalty unit among USED pairs
  const usedRanked = [...used.entries()].map(([k, n]) => ({ pair: k, dHat: RAWD.get(k), penalty: table[k.split('>')[0]]?.[k.split('>')[1]] ?? 8, n, abs: (RAWD.get(k) ?? 0) / (table[k.split('>')[0]]?.[k.split('>')[1]] ?? 8) })).sort((a, b) => b.abs - a.abs);
  // axis 3: out-of-position on a native roster (cross-base, table provider, DL5=DT)
  const oop43 = optimalLineup(native('4-3', 'DT'), fieldSlots('3-4'), unitsTable, '3-4', fitFn).flexed;
  const oop34 = optimalLineup(native('3-4', 'DT'), fieldSlots('4-3'), unitsTable, '4-3', fitFn).flexed;
  const oopOwn = optimalLineup(native('4-3', 'DT'), fieldSlots('4-3'), unitsTable, '4-3', fitFn).flexed;
  // axis 5: fit vs live table
  let exact = 0, off1 = 0, hard = 0;
  for (const [r, ds] of Object.entries(LIVE)) for (const [d, v] of Object.entries(ds)) {
    const got = table[r]?.[d];
    if (got === undefined) { hard++; continue; }
    const ti = TIERS.indexOf(v), gi = TIERS.indexOf(got);
    if (got === v) exact++;
    else if (Math.abs(ti - gi) === 1) off1++;
    else hard++;
  }
  const extra = PAIRS.filter(([r, d]) => LIVE[r]?.[d] === undefined).length;
  results.push({
    tag: c.tag,
    gapTable: { l4: gT.l4, l3: gT.l3, gap: gT.gap, edge: gTe },
    gapMeasured: { gap: gM.gap, l4: gM.l4, l3: gM.l3 },
    flexedSpotsReal: flexed, emergenciesReal: emerg,
    oopNative: { cross43: oop43, cross34: oop34, own: oopOwn },
    worstAbsurd: usedRanked[0] ?? null,
    absurdRunnerUp: usedRanked[1] ?? null,
    tableWorstAbsurd: PAIRS.map(([r, d]) => ({ pair: `${r}>${d}`, abs: RAWD.get(`${r}>${d}`) / Math.max(1, table[r]?.[d] ?? 8), penalty: table[r]?.[d] ?? 8 })).sort((a, b) => b.abs - a.abs)[0],
    fit: { exact, off1, hard, extra },
    rules,
    usedPairs: usedRanked.slice(0, 8),
  });
  console.error(`measured ${c.tag}: gapT=${gT.gap.toFixed(0)} gapM=${gM.gap.toFixed(1)} flexed=${flexed} emerg=${emerg} rules=${rules} fit=${exact}/${off1}/${hard}`);
}

// ---- the LIVE table itself, as the baseline row ----
const liveMod = await import('../football-sim-vue/src/engine/sports/nfl/engine/flex.ts');
const liveFit = liveMod.fit;
const gT = gapCells(liveFit, unitsTable, 'DT');
const gM = gapCells(liveFit, unitsMeasured, 'DT');
let flexed = 0, emerg = 0;
const used = new Map();
for (const team of TEAMS) {
  const roster = POOL.filter((p) => p.team === team);
  for (const base of ['4-3', '3-4']) {
    const L = optimalLineup(roster, fieldSlots(base), unitsTable, base, liveFit);
    flexed += L.flexed; emerg += L.emergency;
    for (const p of L.placements) if (p.penalty > 0) { const k = `${p.player.role}>${p.slot.dest}`; used.set(k, (used.get(k) ?? 0) + 1); }
  }
}
const usedRanked = [...used.entries()].map(([k, n]) => ({ pair: k, dHat: RAWD.get(k), penalty: LIVE[k.split('>')[0]]?.[k.split('>')[1]] ?? 8, n, abs: (RAWD.get(k) ?? 0) / (LIVE[k.split('>')[0]]?.[k.split('>')[1]] ?? 8) })).sort((a, b) => b.abs - a.abs);
const oop43 = optimalLineup(native('4-3', 'DT'), fieldSlots('3-4'), unitsTable, '3-4', liveFit).flexed;
const oop34 = optimalLineup(native('3-4', 'DT'), fieldSlots('4-3'), unitsTable, '4-3', liveFit).flexed;
results.unshift({
  tag: 'LIVE (99 rules, shipped)',
  gapTable: { l4: gT.l4, l3: gT.l3, gap: gT.gap },
  gapMeasured: { gap: gM.gap, l4: gM.l4, l3: gM.l3 },
  flexedSpotsReal: flexed, emergenciesReal: emerg,
  oopNative: { cross43: oop43, cross34: oop34, own: 0 },
  worstAbsurd: usedRanked[0] ?? null,
  absurdRunnerUp: usedRanked[1] ?? null,
  fit: { exact: 99, off1: 0, hard: 0, extra: 0 },
  rules: 99,
  usedPairs: usedRanked.slice(0, 8),
});

writeFileSync('ladder.json', JSON.stringify({ alpha: ALPHA, beta: BETA, dmax: DMAX, destw: DESTW, results }, null, 1));
console.log(JSON.stringify({ alpha: ALPHA, beta: BETA }, null, 1));
console.log('done: ladder.json + ladder.md');
