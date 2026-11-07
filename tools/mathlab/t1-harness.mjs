#!/usr/bin/env node
// tools/mathlab/t1-harness.mjs — T1: mechanics validation harness (SKELETON, not runnable end-to-end yet).
//
// Read-only: reads the product's inline engine; never touches the product file or any protected constants.
//
// Design (from Z.ai synthesis §4 P0 T1 and Beam pre-registration M1-M6):
//   Run N seeded seasons on random rosters; aggregate by slot (targets, yards, snaps, EPA by position);
//   compare against real data on the 4-level ladder:
//     opportunity (snaps, targets, routes) -> production (yards, TDs, sacks, INTs)
//     -> efficiency (EPA/play, success rate, yards/route, pressure rate)
//     -> team impact (wins, point diff).
//   Play-level outcome distributions included: completion% by air-yards bucket, INT rate by coverage role,
//   pressure->sack, YAC by slot. Pre-registered tolerance bands; fail -> report, never auto-adjust.
//
// BLOCKERS (this workspace):
//   1. No seeded/injectable RNG in the product (56-58 Math.random() sites, no seed) — task T-20261022-claude-2.
//      Paired before/after and proper CIs are impossible without it.
//   2. No nflverse snap/target/EPA data in this workspace (only data/madden27-ratings.csv exists).
//      Real-data comparison cannot run here; it is a data ask for the Owner/another seat.
//
// This skeleton: (a) documents the harness contract (what must be measured, at what granularity,
//     which anchors, which tolerance bands to pre-register), and
//   (b) runs a deterministic dry-run: engine slotWinsPerOvr() implied volume shares vs the
//     Owner's final table shares (no sim, no RNG, no external data — VERIFIED n=1).
//
// Output: tools/mathlab/results/t1-dryrun-<date>.json

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const PRODUCT = path.join(ROOT, 'Football-Sim-PreColors.html');
const RESULTS_DIR = path.join(HERE, 'results');
const DATE = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16);
const OUT = path.join(RESULTS_DIR, `t1-dryrun-${DATE}.json`);
const EXPECTED_SHA = '40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd';
const SHA_BEFORE = crypto.createHash('sha256').update(fs.readFileSync(PRODUCT)).digest('hex');
if (SHA_BEFORE !== EXPECTED_SHA) {
  console.error(`REFUSE: product hash ${SHA_BEFORE.slice(0, 16)} != expected Pre-Colors 40233d6be00e987c`);
  process.exit(4);
}

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
    `\nreturn { slotWinsPerOvr, ROSTER_SLOTS };\n`;
  return new Function('__scope__', body)(scope);
}

// Owner's final 11-06 weights (REPORTED: _agents/owner-notes/2026-11-06-weights-final-verbatim.txt)
const OWNER = { QB: 1000, RB1: 250, RB2: 100, WR1: 650, WR2: 400, WR3: 100, WR4: 50,
  TE1: 250, TE2: 150, OT1: 500, OG1: 400, OG2: 250, C: 150, OT2: 300,
  DE1: 650, DE2: 300, DT1: 500, DT2: 300, DL5: 150,
  MIKE: 300, WILL: 150, SAM: 100, CB1: 400, CB2: 250, CB3: 100, SS: 300, FS: 300,
  K: 50, P: 50, FB: 25, CB4: 50, SS2: 5, FS2: 5, LB4: 5 };
const GROUP_OF = { QB: 'QB', RB1: 'RB', RB2: 'RB', WR1: 'WR', WR2: 'WR', WR3: 'WR', WR4: 'WR',
  TE1: 'TE', TE2: 'TE', OT1: 'OT', OT2: 'OT', OG1: 'OG', OG2: 'OG', C: 'OL',
  DE1: 'DL', DE2: 'DL', DT1: 'DL', DT2: 'DL', DL5: 'DL',
  MIKE: 'LB', WILL: 'LB', SAM: 'LB', LB4: 'LB',
  CB1: 'DB', CB2: 'DB', CB3: 'DB', CB4: 'DB', SS: 'DB', SS2: 'DB', FS: 'DB', FS2: 'DB',
  K: 'ST', P: 'ST', FB: 'ST' };

(async () => {
  const html = fs.readFileSync(PRODUCT, 'utf8');
  const engine = sandboxEval(html);
  const shaAfter = crypto.createHash('sha256').update(fs.readFileSync(PRODUCT)).digest('hex');
  if (shaAfter !== SHA_BEFORE) { console.error('REFUSE: product file changed during run'); process.exit(5); }

  const wpo = engine.slotWinsPerOvr();
  const total = Object.values(wpo).reduce((a, b) => a + b, 0);
  const implied = {};
  for (const s of engine.ROSTER_SLOTS) implied[s] = wpo[s] / total * 100;
  const groupImplied = {}; const groupOwner = {};
  for (const s of engine.ROSTER_SLOTS) {
    const g = GROUP_OF[s];
    groupImplied[g] = (groupImplied[g] || 0) + implied[s];
    groupOwner[g] = (groupOwner[g] || 0) + (OWNER[s] == null ? 0 : OWNER[s]);
  }
  const groupOwnerTot = Object.values(groupOwner).reduce((a, b) => a + b, 0);
  for (const g of Object.keys(groupOwner)) groupOwner[g] = groupOwner[g] / groupOwnerTot * 100;

  const rows = [];
  for (const g of ['QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'DB', 'ST']) {
    rows.push({ group: g, engineImpliedShare: Number(groupImplied[g].toFixed(2)), ownerFinalShare: Number(groupOwner[g].toFixed(2)), delta: Number((groupImplied[g] - groupOwner[g]).toFixed(2)) });
  }

  const report = {
    generatedUtc: new Date().toISOString() + 'Z',
    product: 'Football-Sim-PreColors.html ' + SHA_BEFORE.slice(0, 16),
    labels: 'VERIFIED = dry-run measured from the named build by this script (deterministic, n=1, NO sim, NO external data); group shares REPORTED from Owner final table (named file). This is NOT the full T1 harness — see status.',
    status: 'SKELETON ONLY. Full T1 (N seeded seasons, per-slot targets/yards/snaps/EPA, 4-level ladder vs nflverse, play-level outcome distributions, pre-registered tolerance bands) is BLOCKED on: (1) injectable/seeded RNG — task T-20261022-claude-2; (2) nflverse snap/target/EPA data — data ask. Nothing here simulates a season.',
    method: 'Dry run: slotWinsPerOvr() shares of total measured value, grouped, vs Owner final 11-06 weight shares. No randomness, no simulation.',
    rows,
  };
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(report, null, 1) + '\n');

  console.log('\nT1 DRY RUN (skeleton, no sim, no RNG, no external data) — ' + SHA_BEFORE.slice(0, 16));
  console.log('group  engineImpliedShare  ownerFinalShare  delta');
  console.log('-----  ------------------  ---------------  -----');
  for (const r of rows) console.log(`${r.group.padEnd(6)} ${String(r.engineImpliedShare).padEnd(18)} ${String(r.ownerFinalShare).padEnd(17)} ${r.delta}`);
  console.log('\nWrites: ' + OUT);
  console.log('Note: engine implied shares are driven by the fitted RATING_SPECS/MC (28-Oct lab fit to design.json), so they echo the fit target — they are NOT an independent validation. See P-013 audit (vloc 20261107-2059).');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
