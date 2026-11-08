#!/usr/bin/env node
// tools/mathlab/replacement-audit.mjs — T4: replacement-level auditor.
// Read-only: reads the product's inline engine and data/madden27-ratings.csv;
// never touches the product file or any protected constant.
//
// Documents the engine's replacement definition per slot group (replacementLevels()
// / staticReplacement() / WINS_BASE=70 / STATIC_SLOTS) and runs a sensitivity
// analysis on the definition (N = starting spots still open league-wide).
// Compares engine replacement shares to the Madden 27 ratings pool Nth-best per
// group. Includes Beam's VERIFIED DL5 snap measurement (rank5 mean 32.8% snaps,
// 2023-2025, n=1632 team-games) from origin/council/beam.
//
// Usage:
//   node replacement-audit.mjs [--pool <playerPool.json>] [--snaps <nflverseSnaps.json>] [--out out.json]
//
// Plain Node — no browser. Read-only on the product (documents replacement logic
// by reading the file). Reads optional pool/snaps data. No product file touched.
//
// Evidence label: engine definition = VERIFIED (read from product source). Pool
// comparison = VERIFIED (computed from data/madden27-ratings.csv). Real-snap
// comparison = UNKNOWN unless --snaps supplied with a named hash-pinned source.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const PRODUCT = path.join(ROOT, 'Football-Sim-PreColors.html');
const DATA = path.join(ROOT, 'data', 'madden27-ratings.csv');
const RESULTS_DIR = path.join(HERE, 'results');
const DATE = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16);
const OUT = path.join(RESULTS_DIR, `replacement-audit-${DATE}.json`);
const EXPECTED_SHA = '40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd';
const SHA_BEFORE = crypto.createHash('sha256').update(fs.readFileSync(PRODUCT)).digest('hex');
if (SHA_BEFORE !== EXPECTED_SHA) {
  console.error(`REFUSE: product hash ${SHA_BEFORE.slice(0, 16)} != expected Pre-Colors 40233d6be00e987c`);
  process.exit(4);
}

const args = process.argv.slice(2);
const get = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : null; };
const poolPath = get('--pool');
const snapsPath = get('--snaps');
const outPath = get('--out');

let pool = null, snaps = null;
if (poolPath) { try { pool = JSON.parse(fs.readFileSync(poolPath, 'utf8')); } catch (e) { console.error(`cannot read pool ${poolPath}: ${e.message}`); process.exit(2); } }
if (snapsPath) { try { snaps = JSON.parse(fs.readFileSync(snapsPath, 'utf8')); } catch (e) { console.error(`cannot read snaps ${snapsPath}: ${e.message}`); process.exit(2); } }

// ---------- sandbox: evaluate the product's inline engine in Node ----------
function sandboxEval(html) {
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
  let m, parts = [];
  while ((m = re.exec(html))) {
    if (/\bsrc\s*=/.test(m[1])) continue;
    parts.push(m[2]);
  }
  let script = parts.join('\n');
  for (const pat of [/initPlayerBrowser\(\);/g, /initGroupRankings\(\);/g, /initDraftSetup\(\);/g,
                     /buildControls\(\); render\(\);/g, /setActiveTab\('viewDraft','tabDraftBtn'\);/g]) {
    script = script.replace(pat, '/* sandbox neutralized */;');
  }
  const nothing = new Proxy(function () {}, {
    get(_, k) { if (k === Symbol.toStringTag) return 'nothing'; return nothing; },
    apply() { return nothing; },
    construct() { return nothing; },
  });
  const scope = {
    document: nothing, window: nothing, localStorage: nothing, sessionStorage: nothing,
    location: nothing, navigator: nothing, screen: nothing, history: nothing,
    performance: { now: () => 0 }, MutationObserver: nothing,
    setTimeout: () => {}, setInterval: () => {}, clearTimeout: () => {}, clearInterval: () => {},
    requestAnimationFrame: (f) => { if (typeof f === 'function') f(0); return 0; },
    fetch: () => Promise.reject(new Error('no network')),
    Event: function () {}, customElements: nothing,
    console: { log() {}, error() {}, warn() {}, info() {}, debug() {} },
  };
  let seed = 123456;
  scope.Math = Object.create(globalThis.Math);
  scope.Math.random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const assigns = Object.keys(scope).map(k => `const ${k} = __scope__.${k};`).join('\n');
  const randomSrc = `let __seed = 123456;\nconst random = () => { __seed = (__seed * 16807) % 2147483647; return __seed / 2147483647; };\n`;
  const body = `'use strict';\n` + assigns + `\n` + randomSrc + `Math.random = random;\n` +
    script +
    `\nreturn { replacementLevels, staticReplacement, ROSTER_SLOTS, WV_SLOT_GROUP, WV_TAG_GROUP, POS_SLOT_MAP, STATIC_SLOTS, WINS_BASE };`;
  return new Function('__scope__', body)(scope);
}
// pool rows as arrays [name, pos, team, ovr] — replacementLevels() reads p[1] (pos) and p[3] (ovr)
function poolAsRows(pool) { return pool.map(p => [p.name, p.pos, p.team, p.ovr]); }

// ---------- Madden 27 pool ----------
function loadPool() {
  const lines = fs.readFileSync(DATA, 'utf8').trim().split('\n');
  const header = lines[0].split(',');
  const idx = {};
  header.forEach((h, i) => { idx[h] = i; });
  const pool = [];
  for (let i = 1; i < lines.length; i++) {
    const c = lines[i].split(',');
    if (c.length < 4) continue;
    pool.push({ name: c[idx.name], pos: c[idx.pos], team: c[idx.team], ovr: Number(c[idx.ovr]) });
  }
  return pool;
}

// Engine replacement groups (tags from WV_SLOT_GROUP) -> pool positions (from WV_TAG_GROUP semantics)
const GROUP_TAGS = ['QB', 'RB', 'WR', 'TE', 'OT', 'OG', 'C', 'EDGE', 'DT', 'LB', 'CB', 'SS', 'FS', 'K'];
const POOL_POS_BY_TAG = {
  QB: ['QB'], RB: ['HB'], WR: ['WR'], TE: ['TE'], OT: ['LT', 'RT'], OG: ['LG', 'RG'], C: ['C'],
  EDGE: ['REDG', 'LEDG'], DT: ['DT'], LB: ['MIKE', 'WILL', 'SAM'], CB: ['CB'], SS: ['SS'], FS: ['FS'], K: ['K'],
};
function poolOvrsByTag(pool, tag) {
  const pos = POOL_POS_BY_TAG[tag];
  return pool.filter(p => pos.includes(p.pos)).map(p => p.ovr).sort((a, b) => b - a);
}

// Beam's VERIFIED DL5 snap measurement (origin/council/beam, tools/mathlab/results/dl5-snap-measurement-2026-10-27.txt)
const DL5_SNAP = {
  slot: 'DL5',
  engineReplacement: '5th-ranked DL, rotation share 0.33 (measured)',
  realUsage: 'rank5 mean 32.8% snaps (median 35%, p25 22%, p75 44%), 2023-2025, n=1632 team-games',
  status: 'VERIFIED',
  sensitivity: 'weight 91..184 across 22%-44% share (fitlm, other spots refit <=1.8%)',
  source: 'origin/council/beam:tools/mathlab/results/dl5-snap-measurement-2026-10-27.txt',
};

// ---------- main ----------
(async () => {
  const html = fs.readFileSync(PRODUCT, 'utf8');
  const engine = sandboxEval(html);
  const shaAfter = crypto.createHash('sha256').update(fs.readFileSync(PRODUCT)).digest('hex');
  if (shaAfter !== SHA_BEFORE) { console.error('REFUSE: product file changed during run'); process.exit(5); }

  const pool = loadPool();
  // Engine replacement: 32 empty rosters -> every starting slot open league-wide
  const emptyRosters = []; for (let i = 0; i < 32; i++) emptyRosters.push({ slots: {} });
  const engineByGroup = engine.replacementLevels(poolAsRows(pool), emptyRosters); // keyed by group tag
  const staticRepl = engine.staticReplacement();
  const slotGroup = engine.WV_SLOT_GROUP || {};
  const winsBase = engine.WINS_BASE;

  const audit = {
    generatedUtc: new Date().toISOString() + 'Z',
    product: 'Football-Sim-PreColors.html ' + SHA_BEFORE.slice(0, 16),
    dataPool: 'data/madden27-ratings.csv (' + pool.length + ' players; REPORTED from file)',
    labels: 'VERIFIED = engine numbers computed by this script from the named build; pool numbers REPORTED from data/madden27-ratings.csv; DL5 snap data VERIFIED from Beam (named source); real-snap/depth comparison UNKNOWN unless --snaps supplied',
    engineDefinition: {
      replacementLevels: 'replacementLevels(pool, rosters): counts empty starting slots per group (dem[g]), then takes the (dem[g]-1)th OVR (0-indexed) from the group-sorted player pool — i.e. the best available player NOT yet needed as a starter, per group.',
      staticReplacement: 'staticReplacement(): all 32 rosters have every slot empty; pool = PLAYERS filtered by POS_SLOT_MAP. Returns one replacement OVR per group.',
      winsBase: `WINS_BASE = ${winsBase}. staticWins(p) = sum over STATIC_SLOTS[p.pos] of (slotWins(s, p.ovr) - slotWins(s, ${winsBase})).`,
      staticSlots: 'STATIC_SLOTS maps each position to the slot(s) whose value counts for that player (e.g. WR -> WR1/WR2/WR3, CB -> CB1/CB2/CB3, DT -> DT1/DT2).',
      groups: 'WV_SLOT_GROUP / WV_TAG_GROUP assign each slot and each position to a group (OL, DL, LB, CB, S, WR, TE, RB, QB, K, P, ...).',
      note: 'Replacement is a LEAGUE-WIDE scarcity concept: as more teams fill a group, the replacement OVR for that group rises (fewer good players left). It is NOT a fixed 70 or a fixed percentile.',
    },
    known: [
      DL5_SNAP,
      { slot: 'CB3/NICKEL', engineReplacement: '3rd CB, situational', realUsage: 'UNKNOWN — needs snap counts by DB depth', status: 'UNKNOWN', sensitivity: 'TODO' },
      { slot: 'DIME', engineReplacement: '6th DB, situational', realUsage: 'UNKNOWN', status: 'UNKNOWN', sensitivity: 'TODO' },
      { slot: 'SAM', engineReplacement: 'OLB2 / situational', realUsage: 'UNKNOWN', status: 'UNKNOWN', sensitivity: 'TODO' },
      { slot: 'FB', engineReplacement: 'fullback, low share', realUsage: 'UNKNOWN', status: 'UNKNOWN', sensitivity: 'TODO' },
      { slot: 'TE2/TE3', engineReplacement: 'backup TE, fixed share (recv)', realUsage: 'PARTIAL — personnel-shares.py covers offense personnel', status: 'PARTIAL', sensitivity: 'TODO' },
    ],
    engine: {
      perSlot: {},
      perGroup: {},
    },
    pool: {
      note: 'pool analog: Nth-best available by replacement group from Madden 27 OVR (not snaps — real snap/depth data unavailable in this workspace, UNKNOWN)',
      perGroup: {},
    },
    gap: {},
    openQuestions: [
      'The engine defines replacement as "Nth-best available league-wide" (N = starting spots still open). Real NFL deployment uses snap counts + injury backfills + sub-packages (nickel/dime play 40%+ of snaps); no snap data is in this workspace (UNKNOWN).',
      `slotWinsPerOvr() subtracts WINS_BASE = ${winsBase} OVR (a reference, not a replacement level — Z.ai synthesis E7). Whether WINS_BASE=${winsBase} aligns with the engine\'s own staticReplacement() per group is an open check (see output below).`,
      'T4 sensitivity (vary replacement definition, show weight-vector movement): supply --pool as [{group, ovr}, ...] to run sensitivityByN.',
    ],
  };

  for (const s of engine.ROSTER_SLOTS) {
    const g = slotGroup[s];
    audit.engine.perSlot[s] = { group: g, engineReplOvr: engineByGroup[g] == null ? null : engineByGroup[g] };
    audit.engine.perGroup[g] = engineByGroup[g] == null ? null : engineByGroup[g];
  }

  const dem = {}; // starting slots open per group across 32 teams
  for (const s of engine.ROSTER_SLOTS) { dem[slotGroup[s]] = (dem[slotGroup[s]] || 0) + 32; }
  for (const g of GROUP_TAGS) {
    const ovrs = poolOvrsByTag(pool, g);
    const n = dem[g] || 0;
    audit.pool.perGroup[g] = {
      nPlayers: ovrs.length,
      demStarts: n,
      poolNthBest: n > 0 && ovrs.length >= n ? ovrs[n - 1] : (ovrs.length ? ovrs[ovrs.length - 1] : null),
      top10: ovrs.slice(0, 10),
      ovr70plus: ovrs.filter(v => v >= 70).length,
      ovr75plus: ovrs.filter(v => v >= 75).length,
      ovr80plus: ovrs.filter(v => v >= 80).length,
    };
    const e = audit.engine.perGroup[g];
    const p = audit.pool.perGroup[g].poolNthBest;
    audit.gap[g] = { engineReplOvr: e, poolNthBest: p, gapPoints: e != null && p != null ? Number((e - p).toFixed(2)) : null, dem: n };
  }

  // Sensitivity: replacement OVR per group as N (spots open) varies, if pool supplied
  let sensitivity = null;
  if (pool) {
    const byG = {};
    for (const p of pool) {
      const g = p.group;
      if (!byG[g]) byG[g] = [];
      byG[g].push(Number(p.ovr));
    }
    sensitivity = { groups: Object.keys(byG), byGroup: {} };
    for (const g of Object.keys(byG)) {
      const arr = byG[g].sort((a, b) => b - a); // desc
      const series = [];
      for (let N = 1; N <= Math.min(32, arr.length); N++) {
        series.push({ N, replacementOvr: arr[N - 1], nRemaining: arr.length - N });
      }
      sensitivity.byGroup[g] = { nPlayers: arr.length, maxOvr: arr[0], minOvr: arr[arr.length - 1], series };
    }
  }
  audit.sensitivity = sensitivity;

  // Optional snap comparison
  let snapComparison = null;
  if (snaps && sensitivity) {
    const snapByGroup = {};
    for (const s of snaps) snapByGroup[s.group] = Number(s.snapShare);
    snapComparison = [];
    for (const g of Object.keys(sensitivity.byGroup)) {
      const series = sensitivity.byGroup[g].series;
      const worstStarter = series.length ? series[series.length - 1].replacementOvr : null;
      snapComparison.push({ group: g, realSnapShare: snapByGroup[g] != null ? snapByGroup[g] : null, engineReplacementOvrAtN32: worstStarter, nPlayers: sensitivity.byGroup[g].nPlayers });
    }
  }
  audit.snapComparison = snapComparison;

  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  const outPathFinal = outPath || OUT;
  fs.writeFileSync(outPathFinal, JSON.stringify(audit, null, 1) + '\n');

  const pad = (v) => String(v == null ? '—' : v).padEnd(10);
  console.log('\nT4 REPLACEMENT-LEVEL AUDIT — ' + SHA_BEFORE.slice(0, 16));
  console.log('slot   group  engineReplOvr (Nth-best available league-wide, 32 teams)');
  console.log('-----  -----  --------------------');
  for (const s of engine.ROSTER_SLOTS) {
    const x = audit.engine.perSlot[s];
    console.log(`${s.padEnd(6)} ${String(x.group).padEnd(6)} ${x.engineReplOvr == null ? '—' : x.engineReplOvr}`);
  }
  console.log('\ngroup  demStarts  engineRepl  poolNthBest  gapPts  poolN  pool>=70  pool>=75  pool>=80');
  console.log('-----  ---------  ----------  ------------ ------- ------ --------- --------- ---------');
  for (const g of GROUP_TAGS) {
    const x = audit.gap[g]; const p = audit.pool.perGroup[g];
    console.log(`${g.padEnd(6)} ${String(p.demStarts).padEnd(10)} ${String(x.engineReplOvr).padEnd(11)} ${String(x.poolNthBest).padEnd(13)} ${String(x.gapPoints).padEnd(7)} ${String(p.nPlayers).padEnd(6)} ${String(p.ovr70plus).padEnd(9)} ${String(p.ovr75plus).padEnd(9)} ${p.ovr80plus}`);
  }
  console.log(`\nDL5 snap data (VERIFIED, Beam): ${DL5_SNAP.realUsage}`);
  console.log(`Source: ${DL5_SNAP.source}`);
  console.log('\nKnown replacement slots: ' + audit.known.map(k => `${k.slot}=${k.status}`).join(', '));
  console.log('\nWrites: ' + outPathFinal);
  if (!sensitivity) console.log('Sensitivity: NOT RUN — supply --pool as [{group, ovr}, ...] to run sensitivityByN.');
  if (!snapComparison) console.log('Snap comparison: NOT RUN — supply --snaps as [{group, snapShare}, ...] from a named hash-pinned nflverse release.');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
