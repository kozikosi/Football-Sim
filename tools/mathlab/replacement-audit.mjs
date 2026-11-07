#!/usr/bin/env node
// tools/mathlab/replacement-audit.mjs — T4: replacement-level auditor.
// Read-only: reads the product's inline engine and data/madden27-ratings.csv;
// never touches the product file or any protected constant.
//
// Documents the engine's replacement definition per slot group (staticReplacement() /
// replacementLevels()) and reports what the engine implies versus what is observable
// in the Madden 27 ratings pool (the ratings set the Owner froze 2026-10-28).
//
// Two comparisons:
//   1. Engine-side (VERIFIED): replacement OVR per group implied by staticReplacement().
//   2. Pool-side (REPORTED from data/madden27-ratings.csv): how many players at each
//      position clear plausible starter thresholds (70/75/80 OVR) — the real-world
//      analog of "Nth-best available". No snap/depth data exists in this workspace,
//      so the real-snap comparison requested by T4 cannot be completed here; it is
//      marked UNKNOWN and left as a data ask for the Owner/another seat.
//
// Output: tools/mathlab/results/replacement-audit-<date>.json + stdout report.

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
    `\nreturn { replacementLevels, staticReplacement, ROSTER_SLOTS, WV_SLOT_GROUP };\n`;
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
  const slotGroup = engine.WV_SLOT_GROUP || {};

  const audit = {
    generatedUtc: new Date().toISOString() + 'Z',
    product: 'Football-Sim-PreColors.html ' + SHA_BEFORE.slice(0, 16),
    dataPool: 'data/madden27-ratings.csv (' + pool.length + ' players; REPORTED from file)',
    labels: 'VERIFIED = engine numbers computed by this script from the named build; pool numbers REPORTED from data/madden27-ratings.csv; real-snap comparison NOT possible in this workspace (UNKNOWN)',
    engine: {
      definition: 'replacementLevels(pool, rosters): for each slot group g (tag from WV_SLOT_GROUP), dem[g] = starting slots of that tag still open across 32 empty rosters (= 32 x slots-per-team); byG[g] = OVR of every pool player tagged to g (WV_TAG_GROUP); replacement OVR = the dem[g]-th best (Nth-best available league-wide). staticReplacement() runs the same with 32 empty rosters (all slots open). WINS_BASE = 70 used by slotWinsPerOvr() is a reference, not a replacement level (Z.ai synthesis E7).',
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
      'slotWinsPerOvr() subtracts WINS_BASE = 70 OVR (a reference, not a replacement level — Z.ai synthesis E7). Whether WINS_BASE=70 aligns with the engine\'s own staticReplacement() per group is an open check (see output below).',
      'T4 sensitivity (vary replacement definition, show weight-vector movement) not yet implemented.',
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

  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(audit, null, 1) + '\n');

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
  console.log('\nWrites: ' + OUT);
  console.log('Real-snap/depth comparison: NOT RUN — no snap data in this workspace (UNKNOWN).');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
