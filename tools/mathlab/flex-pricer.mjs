// mathlab/flex-pricer.mjs — T6 Flex opportunity-cost pricer (deterministic part).
//
// Read-only: reads the product's inline engine via sandbox eval; never touches the
// product file or any protected constants (DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP,
// MC, PLAN_K, RATING_SPECS, modelWeights() contract).
//
// Computes the measured opportunity cost of flexing a player out of position:
//   cost(pos -> dest, ovr) = slotWins(naturalSlot, ovr) - slotWins(dest, ovr)
//   (wins per season lost by playing the player at dest instead of his natural slot)
//   OVR-equivalent cost = winsLost / slotWinsPerOvr(dest)  (rating points the flex
//   "costs", comparable to the flat FLEX table penalties subtracted from OVR in effOvr()).
//
// The curve is deterministic (all-else-80 matchup model, no RNG) so this is an n=1
// measurement per (assignment, ovr) — VERIFIED by this run; spread/CI not applicable
// until seeded games are possible (task T-20261022-claude-2).
//
// The full T6 (full lineup re-optimization under each assignment, paired seeds,
// sampled supporting casts, percentile table) is BLOCKED on the injectable/seeded
// RNG. This pricer is the deterministic lookup the in-game optimizer would use;
// the paired-seed version awaits the RNG.
//
// Output: tools/mathlab/results/flex-pricer-<date>.json + stdout report.
// Anchor: product hash pinned before/after each run; FLEX/NATURAL_SLOT_MAP read
// from product lines 931-952 (REPORTED, not substituted).
//
// Usage: node flex-pricer.mjs [--out results/flex-pricer-<date>.json]

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
const EXPECTED_SHA = '40233d6be00e987c';
const SHA_BEFORE = crypto.createHash('sha256').update(fs.readFileSync(PRODUCT)).digest('hex');
if (!SHA_BEFORE.startsWith(EXPECTED_SHA)) {
  console.error(`REFUSE: product hash ${SHA_BEFORE.slice(0, 16)} != expected Pre-Colors ${EXPECTED_SHA}`);
  process.exit(4);
}

// --- Sandbox eval: extract the product's inline engine functions ---
function sandboxEval(html) {
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
  let m, parts = [];
  while ((m = re.exec(html))) {
    if (/\bsrc\s*=/.test(m[1])) continue;
    parts.push(m[2]);
  }
  let script = parts.join('\n');
  // Neutralize DOM- and UI-dependent calls so the engine loads headless.
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
    `\nreturn { slotWins, slotWinsPerOvr, NATURAL_SLOT_MAP, FLEX, LB_FLEX, ROSTER_SLOTS, WINS_BASE };\n`;
  return new Function('__scope__', body)(scope);
}

// Map a FLEX dest (exact slot or slot family) to one concrete ROSTER_SLOT key
// for slotWins(). Family dests resolve to the first slot of that family.
const FAMILY_SLOT = { QB: 'QB', RB: 'RB1', WR: 'WR1', TE: 'TE1', OT: 'OT1', OG: 'OG1', C: 'C',
  DE: 'DE1', DT: 'DT1', MIKE: 'MIKE', WILL: 'WILL', SAM: 'SAM', CB: 'CB1', SS: 'SS', FS: 'FS', K: 'K', P: 'P' };
function slotForDest(dest) { return dest in FAMILY_SLOT ? FAMILY_SLOT[dest] : dest; }

// Primary natural slot per position (from NATURAL_SLOT_MAP, first listed).
function naturalSlot(engine, pos) {
  const nat = engine.NATURAL_SLOT_MAP[pos];
  return nat && nat.length ? nat[0] : null;
}

// Build the rule set: for each (pos, dest) with a flat penalty, measure wins lost.
function priceFlex(engine) {
  const FLEX = engine.FLEX;
  const OVRS = [70, 80, 85, 90, 95];
  const slope = engine.slotWinsPerOvr();
  const rules = [];
  for (const pos of Object.keys(FLEX)) {
    const natural = naturalSlot(engine, pos);
    if (!natural) continue;
    for (const dest of Object.keys(FLEX[pos])) {
      const flatPenalty = FLEX[pos][dest];
      if (flatPenalty === 0) continue; // natural or free flex — no cost to price
      const flexSlot = slotForDest(dest);
      if (flexSlot === natural) continue;
      const ovrRow = [];
      for (const ovr of OVRS) {
        const winsNat = Number(engine.slotWins(natural, ovr));
        const winsFlex = Number(engine.slotWins(flexSlot, ovr));
        const winsLost = Math.max(0, winsNat - winsFlex);
        const ovrEq = slope[dest] ? winsLost / slope[dest] : null;
        ovrRow.push({ ovr, winsNat: +winsNat.toFixed(5), winsFlex: +winsFlex.toFixed(5),
          winsLost: +winsLost.toFixed(5), ovrEquivalent: ovrEq == null ? null : +ovrEq.toFixed(2) });
      }
      rules.push({ pos, natural, dest, flexSlot, flatOvrPenalty: flatPenalty, measuredAt: ovrRow });
    }
  }
  return { slope, rules };
}

// Compare measured OVR-equivalent cost vs the flat FLEX penalty at each OVR.
function verdictFor(rule) {
  // Use the mid OVR (85) as the representative point; report all.
  const mid = rule.measuredAt.find(r => r.ovr === 85) || rule.measuredAt[rule.measuredAt.length - 1];
  const meq = mid.ovrEquivalent;
  const under = meq != null && meq > rule.flatOvrPenalty + 1;   // flat underprices by >1 OVR pt
  const over = meq != null && meq < rule.flatOvrPenalty - 1;    // flat overprices by >1 OVR pt
  return under ? 'UNDERPRICED' : over ? 'OVERPRICED' : 'ALIGNED';
}

(async () => {
  const html = fs.readFileSync(PRODUCT, 'utf8');
  const engine = sandboxEval(html);
  const shaAfter = crypto.createHash('sha256').update(fs.readFileSync(PRODUCT)).digest('hex');
  if (shaAfter !== SHA_BEFORE) { console.error('REFUSE: product file changed during run'); process.exit(5); }

  const { slope, rules } = priceFlex(engine);
  const report = {
    generatedUtc: new Date().toISOString() + 'Z',
    product: 'Football-Sim-PreColors.html ' + SHA_BEFORE.slice(0, 16),
    method: 'cost(pos->dest, ovr) = slotWins(natural, ovr) - slotWins(dest, ovr); OVR-equivalent = winsLost / slotWinsPerOvr(dest). Deterministic all-else-80 matchup model; no RNG at this layer.',
    labels: 'VERIFIED = measured from the named build by this script (deterministic, n=1 per cell); flat penalties REPORTED from product FLEX table (lines 940-952); no estimates substituted',
    status: 'DETERMINISTIC LOOKUP ONLY. Full T6 (paired-seed lineup re-optimization across sampled supporting casts, percentile table) blocked on injectable/seeded RNG (task T-20261022-claude-2). Owner -10 flex cap stays the interim guard (Owner ruling 2026-10-29).',
    slope,
    rules: rules.map(r => ({
      pos: r.pos, natural: r.natural, dest: r.dest, flexSlot: r.flexSlot,
      flatOvrPenalty: r.flatOvrPenalty, verdict: verdictFor(r),
      measuredAt: r.measuredAt,
    })),
    summary: { nRules: rules.length, nUnderpriced: rules.filter(r => verdictFor(r) === 'UNDERPRICED').length,
      nOverpriced: rules.filter(r => verdictFor(r) === 'OVERPRICED').length, nAligned: rules.filter(r => verdictFor(r) === 'ALIGNED').length },
  };
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(report, null, 1) + '\n');

  const pad = (v) => String(v == null ? '—' : v).padEnd(10);
  console.log('\nT6 FLEX OPPORTUNITY-COST PRICER (deterministic) — ' + SHA_BEFORE.slice(0, 16));
  console.log('pos->dest  flatPen  verdict     @70 wLost/ovrEq  @80  @85  @90  @95   (winsLost / OVR-equivalent)');
  console.log('---------  -------  ----------  -----------------  ---  ---  ---  ---   ---------------------------');
  for (const r of report.rules) {
    const cells = r.measuredAt.map(c => `${c.winsLost.toFixed(3)}/${c.ovrEquivalent == null ? '—' : c.ovrEquivalent.toFixed(1)}`).join('  ');
    console.log(`${r.pos}->${r.dest.padEnd(6)} ${String(r.flatOvrPenalty).padEnd(7)}  ${r.verdict.padEnd(10)}  ${cells}`);
  }
  console.log(`\nSummary: ${report.summary.nRules} rules priced · ${report.summary.nUnderpriced} underpriced · ${report.summary.nOverpriced} overpriced · ${report.summary.nAligned} aligned`);
  console.log('Writes: ' + OUT);
  console.log('Reading: a flat penalty lower than the measured OVR-equivalent underprices the flex (star drifts out of position); higher overprices it. Differences vs the -10 cap regime are candidate flex-table rulings, not silent changes.');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
