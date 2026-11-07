#!/usr/bin/env node
// tools/mathlab/flex-pricer.mjs — T6 (deterministic part): flex opportunity-cost pricer.
// Read-only: reads the product's inline engine; never touches the product file or
// protected constants.
//
// Computes the measured opportunity cost of flexing a player out of position:
//   cost(pos -> dest, ovr) = slotWins(naturalSlot, ovr) - slotWins(dest, ovr)
//   (wins per season lost by playing the player at dest instead of his natural slot)
//   OVR-equivalent cost = winsLost / slotWinsPerOvr(dest)  (rating points the flex
//   "costs", on the same scale as the flat FLEX table penalties which are subtracted
//   from OVR in effOvr()).
//
// The curve is deterministic (all-else-80 matchup model, no RNG) so this is an n=1
// measurement per (assignment, ovr) — VERIFIED by this run, spread not applicable.
//
// The full T6 (full lineup re-optimization under each assignment, paired seeds,
// sampled supporting casts, percentile table) is BLOCKED on the injectable/seeded
// RNG (task T-20261022-claude-2): without seeded games you cannot separate flex cost
// from game variance, so the pricer below is the deterministic lookup the in-game
// optimizer would use; the paired-seed version awaits the RNG.
//
// Output: tools/mathlab/results/flex-pricer-<date>.json + stdout report.
// Anchor: FLEX table values (REPORTED from product lines 940-952, 939).

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const PRODUCT = path.join(ROOT, 'Football-Sim-PreColors.html');
const RESULTS_DIR = path.join(HERE, 'results');
const DATE = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16);
const OUT = path.join(RESULTS_DIR, `flex-pricer-${DATE}.json`);
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
    `\nreturn { slotWins, slotWinsPerOvr, NATURAL_SLOT_MAP, FLEX, LB_FLEX, ROSTER_SLOTS };\n`;
  return new Function('__scope__', body)(scope);
}

// Map a FLEX dest (exact slot or slot family) to one concrete ROSTER_SLOT key
// for slotWins(). Family dests (OT, OG, C, DE, DT, CB, WR, TE, RB, SS, FS,
// MIKE, WILL, SAM) resolve to the first slot of that family.
const FAMILY_SLOT = { QB: 'QB', RB: 'RB1', WR: 'WR1', TE: 'TE1', OT: 'OT1', OG: 'OG1', C: 'C',
  DE: 'DE1', DT: 'DT1', MIKE: 'MIKE', WILL: 'WILL', SAM: 'SAM', CB: 'CB1', SS: 'SS', FS: 'FS', K: 'K' };
function slotForDest(dest) { return dest in FAMILY_SLOT ? FAMILY_SLOT[dest] : dest; }

// FLEX rules as pos -> {dest: flatOvrPenalty}, expanded from product + LB_FLEX
function flexRules() {
  const FLEX = {
    LT: { OG: 0, C: 0, DT: 4 }, RT: { OG: 0, C: 0, DT: 4 },
    LG: { C: 0, OT: 4, DT: 4 }, RG: { C: 0, OT: 4, DT: 4 }, C: { OG: 0, OT: 4, DT: 4 },
    DT: { DE: 4, MIKE: 4, WILL: 4, SAM: 4, OG: 4, C: 4, OT: 6, RB: 6 },
    REDG: { DT: 2, MIKE: 4, WILL: 2, SAM: 2, TE: 6, RB: 6 }, LEDG: { DT: 2, MIKE: 4, WILL: 2, SAM: 2, TE: 6, RB: 6 },
    MIKE: { DE: 6, DT: 4, CB3: 4, SS: 4, FS: 4, TE: 6, RB: 6 }, // LB_FLEX
    WILL: { DE: 6, DT: 4, CB3: 4, SS: 4, FS: 4, TE: 6, RB: 6 }, // LB_FLEX
    SAM: { DE: 6, DT: 4, CB3: 4, SS: 4, FS: 4, TE: 6, RB: 6 }, // LB_FLEX
    CB: { SS: 2, FS: 0, MIKE: 4, WILL: 4, SAM: 4, WR: 4, TE: 6, RB: 6 },
    SS: { FS: 2, CB: 4, MIKE: 4, WILL: 4, SAM: 2, WR: 4, TE: 6, RB: 6 },
    FS: { SS: 2, CB: 4, MIKE: 4, WILL: 4, SAM: 4, WR: 4, TE: 6, RB: 6 },
    WR: { TE: 4, SS: 4, FS: 4, CB: 4, RB: 6 },
    TE: { MIKE: 6, WILL: 6, SAM: 6, SS: 6, FS: 6, RB: 6 },
    HB: { TE: 6 },
  };
  return FLEX;
}

(async () => {
  const html = fs.readFileSync(PRODUCT, 'utf8');
  const engine = sandboxEval(html);
  const shaAfter = crypto.createHash('sha256').update(fs.readFileSync(PRODUCT)).digest('hex');
  if (shaAfter !== SHA_BEFORE) { console.error('REFUSE: product file changed during run'); process.exit(5); }

  const FLEX = flexRules();
  const OVRS = [70, 80, 85, 90, 95];
  const slope = engine.slotWinsPerOvr();
  const rules = [];
  for (const pos of Object.keys(FLEX)) {
    const natSlots = engine.NATURAL_SLOT_MAP[pos];
    if (!natSlots || natSlots.length === 0) continue;
    const natural = natSlots[0]; // primary natural slot
    for (const dest of Object.keys(FLEX[pos])) {
      const flexSlot = slotForDest(dest);
      if (flexSlot === natural) continue;
      const flatPenalty = FLEX[pos][dest];
      const ovrRow = [];
      for (const ovr of OVRS) {
        const winsNat = engine.slotWins(natural, ovr);
        const winsFlex = engine.slotWins(flexSlot, ovr);
        const winsLost = Math.max(0, winsNat - winsFlex);
        const ovrEq = slope[dest] ? winsLost / slope[dest] : null;
        ovrRow.push({ ovr, winsNat: Number(winsNat.toFixed(5)), winsFlex: Number(winsFlex.toFixed(5)), winsLost: Number(winsLost.toFixed(5)), ovrEquivalent: ovrEq == null ? null : Number(ovrEq.toFixed(2)) });
      }
      rules.push({ pos, natural, dest, flatOvrPenalty: flatPenalty, measuredAt: ovrRow });
    }
  }

  const report = {
    generatedUtc: new Date().toISOString() + 'Z',
    product: 'Football-Sim-PreColors.html ' + SHA_BEFORE.slice(0, 16),
    labels: 'VERIFIED = measured from the named build by this script (deterministic, n=1 per cell); flat penalties REPORTED from product FLEX table (lines 940-952, 939); no estimates substituted',
    method: 'cost(pos->dest, ovr) = slotWins(natural, ovr) - slotWins(dest, ovr); OVR-equivalent = winsLost / slotWinsPerOvr(dest). Deterministic all-else-80 matchup model; no RNG at this layer.',
    status: 'DETERMINISTIC LOOKUP ONLY. Full T6 (paired-seed lineup re-optimization across sampled supporting casts, percentile table) blocked on injectable/seeded RNG (task T-20261022-claude-2). Owner -10 flex cap stays the interim guard (Owner ruling 2026-10-29).',
    rules,
  };
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(report, null, 1) + '\n');

  const pad = (v) => String(v == null ? '—' : v).padEnd(10);
  console.log('\nT6 FLEX OPPORTUNITY-COST PRICER (deterministic) — ' + SHA_BEFORE.slice(0, 16));
  console.log('pos->dest  flatPen  @70 wLost/ovrEq  @80  @85  @90  @95   (winsLost / OVR-equivalent)');
  console.log('---------  -------  -----------------  ---  ---  ---  ---   ---------------------------');
  for (const r of rules) {
    const cells = r.measuredAt.map(c => `${c.winsLost.toFixed(3)}/${c.ovrEquivalent == null ? '—' : c.ovrEquivalent.toFixed(1)}`).join('  ');
    console.log(`${r.pos}->${r.dest.padEnd(6)} ${String(r.flatOvrPenalty).padEnd(7)}  ${cells}`);
  }
  console.log('\nWrites: ' + OUT);
  console.log('Reading: a flat penalty lower than the measured OVR-equivalent underprices the flex (star drifts out of position); higher overprices it. Differences vs the -10 cap regime are candidate flex-table rulings, not silent changes.');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
