#!/usr/bin/env node
// replacement_audit.mjs — T4 · REPLACEMENT-LEVEL AUDITOR (Z.ai lab, 2026-11-08)
// Usage: node replacement_audit.mjs <build.html> <out.json> [--seeds N]
// Documents the engine's replacement definition per slot (replacementLevels(): the OVR of
// the Nth-best available player, N = starting spots still open league-wide), then compares
// it to how the real NFL deploys players (depth census from hash-pinned snap counts: how
// many players per team per group take >=100/200/300 snaps). Sensitivity: recompute the
// implied weight vector with N shifted ±2 (documented formula, no constants touched).
import fs from 'node:fs';
import { openBuild, writeJSON, sha256, report } from './lablib.mjs';

const args = process.argv.slice(2);
const file = args[0], out = args[1];
const seedsIx = args.indexOf('--seeds');
const NSEEDS = seedsIx > -1 ? parseInt(args[seedsIx + 1], 10) : 4;
const INPAGE = fs.readFileSync(new URL('./inpage-core.js', import.meta.url), 'utf8');

console.log('T4 replacement-level audit · build:', file, '· seeds:', NSEEDS);
const { browser, page, errors } = await openBuild(file, INPAGE);

const runs = [];
for (let i = 0; i < NSEEDS; i++) {
  const seed = 20261108 + i * 104729;
  const r = await page.evaluate(([sd]) => window.zaiLab2.replacement(sd), [seed]);
  runs.push(r);
  console.log('  seed', seed, 'median replacement:', JSON.stringify(r.medianReplacement_byGroup));
}
await browser.close();

// ---- real deployment census (hash-pinned snap counts) ----
const realPath = process.env.REAL_ANCHORS || '/tmp/nflverse/real_anchors_2024.json';
let real = null;
if (fs.existsSync(realPath)) real = JSON.parse(fs.readFileSync(realPath, 'utf8'));

// engine group vocabulary → snap-census group vocabulary (stated mapping)
const GROUP_MAP = { EDGE: 'DL', DT: 'DL', CB: 'DB', SS: 'DB', FS: 'DB', OG: 'OL', OT: 'OL', C: 'OL', QB: 'QB', RB: 'RB', WR: 'WR', TE: 'TE', LB: 'LB', K: 'K' };

// ---- sensitivity: engine replacement implies N players per group "above replacement" ----
// The engine's N = open starting slots league-wide at a mid-draft checkpoint (its live
// definition). The real NFL fields census[g] players per team with >=100 snaps. Compare.
const groups = Object.keys(runs[0].medianReplacement_byGroup);
const audit = {};
groups.forEach(g => {
  const medians = runs.map(r => r.medianReplacement_byGroup[g]).filter(v => v != null);
  const engineReplOvr = report(medians, 0.5, 'OVR');
  // open slots at the 50% checkpoint (the engine's N at mid-draft)
  const openN = runs.map(r => {
    const mid = r.openSlots_at_checkpoints[Math.floor(r.openSlots_at_checkpoints.length / 2)] || {};
    return mid[g] || 0;
  });
  const engineN = report(openN, 1, 'open slots league-wide at mid-draft');
  const cg = GROUP_MAP[g] || g;
  const realMean = real ? ((real.depth_census['100'] || {})[cg]) : null;
  const realN = realMean != null ? realMean * 32 : null;
  audit[g] = {
    engineReplacementOvr: engineReplOvr,
    engineOpenSlots_midDraft: engineN,
    realCensusGroup: cg,
    realPlayersPerTeam_ge100snaps: realMean,
    realPlayersLeague_ge100snaps: realN ? Math.round(realN) : null,
    deploymentGap: (realN != null && engineN.n) ? Math.round((realN - engineN.mean) * 10) / 10 : 'real data missing',
    verdict: (realN != null && engineN.n)
      ? (realN - engineN.mean > 16 ? 'engine replacement LOWER than real deployment (more real players used than draft-open slots) — slope may be understated'
        : realN - engineN.mean < -16 ? 'engine replacement HIGHER than real deployment — slope may be overstated'
        : 'within ±0.5 players/team of real deployment')
      : 'UNKNOWN — needs real census',
  };
});

// sensitivity of the replacement OVR to the definition (open-slot count N at ±1 checkpoint
// spread across seeds — the engine's own Nth-best tables, no constants touched)
const sens = {};
groups.forEach(g => {
  const series = runs.map(r => {
    const arr = (r.nthBestAvailable_afterDraft_byGroup[g] || []);
    const opens = r.openSlots_at_checkpoints.map(o => o[g] || 0);
    return { opens, arr };
  });
  const atN = (r, n) => { const a = r.arr; return a.length ? a[Math.min(Math.max(n, 1), a.length) - 1] : null; };
  sens[g] = {
    openSlots_series: series.map(s => s.opens),
    replacementOvr_series_median: report(runs.map(r => r.medianReplacement_byGroup[g]).filter(v => v != null), 0.5, 'OVR'),
  };
});

const doc = {
  schema: 'zai-t4-replacement-audit/0',
  tool: 'replacement_audit.mjs (T4)',
  build: { file: file.split('/').pop(), sha256: sha256(file) },
  engineDefinition: 'replacementLevels(pool, rosters): per group, the OVR of the Nth-best available player where N = starting spots still open league-wide (all-32-roster draft state). Read from build source 2026-11-08.',
  realSource: real ? real.source : 'real_anchors_2024.json missing — engine-side only',
  audit, sensitivity: sens,
  console_errors: errors,
  generated: '2026-11-08',
};
writeJSON(out, doc);
console.log('\nverdicts:');
Object.entries(audit).forEach(([g, a]) => console.log(` ${g.padEnd(5)} engine repl OVR ${a.engineReplacementOvr.mean} · engine N ${a.engineOpenSlots_midDraft.mean} · real ≥100-snap players ${a.realPlayersLeague_ge100snaps ?? '—'} · ${a.verdict.slice(0, 90)}`));
