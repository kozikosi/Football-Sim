// mathlab/replacement-audit.mjs — T4 Replacement-level auditor.
//
// Documents the engine's replacement definition per slot group and runs a
// sensitivity analysis on the definition (N = starting spots still open
// league-wide). Optionally compares engine replacement shares to real
// snap/depth usage if nflverse snap data is provided. Includes Beam's
// VERIFIED DL5 snap measurement (rank5 mean 32.8% snaps, 2023-2025, n=1632
// team-games) from origin/council/beam.
//
// Engine definition (Football-Sim-PreColors.html, read-only, VERIFIED by reading):
//   replacementLevels(pool, rosters):
//     for each roster with an empty slot s: dem[WV_SLOT_GROUP[s]]++
//     for each player p: byG[WV_TAG_GROUP[p[1]]].push(p.ovr)
//     for each group g: out[g] = byG[g] sorted desc [ dem[g] - 1 ]  (Nth-best available)
//   staticReplacement(): all 32 rosters empty, pool = PLAYERS filtered by POS_SLOT_MAP
//   WINS_BASE = 70 (a player's static wins = slotWins(s, ovr) - slotWins(s, 70))
//
// Usage:
//   node replacement-audit.mjs [--pool <playerPool.json>] [--snaps <nflverseSnaps.json>] [--out out.json]
//
// Plain Node — no browser. Read-only on the product (documents replacement logic
// by reading the file). Reads optional pool/snaps data. No product file touched.
//
// Evidence label: definition = VERIFIED (read from product). Comparison to real
// data = REPORTED only if --snaps supplied with a named source; otherwise UNKNOWN.

import fs from 'fs';

const args = process.argv.slice(2);
const get = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : null; };
const poolPath = get('--pool');
const snapsPath = get('--snaps');
const outPath = get('--out');

let pool = null, snaps = null;
if (poolPath) { try { pool = JSON.parse(fs.readFileSync(poolPath, 'utf8')); } catch (e) { console.error(`cannot read pool ${poolPath}: ${e.message}`); process.exit(2); } }
if (snapsPath) { try { snaps = JSON.parse(fs.readFileSync(snapsPath, 'utf8')); } catch (e) { console.error(`cannot read snaps ${snapsPath}: ${e.message}`); process.exit(2); } }

// --- Structural definition (read from product, VERIFIED) ---
const ENGINE_DEFINITION = {
  replacementLevels: 'replacementLevels(pool, rosters): counts empty starting slots per group (dem[g]), then takes the (dem[g]-1)th OVR (0-indexed) from the group-sorted player pool — i.e. the best available player NOT yet needed as a starter, per group.',
  staticReplacement: 'staticReplacement(): all 32 rosters have every slot empty; pool = PLAYERS filtered by POS_SLOT_MAP. Returns one replacement OVR per group.',
  winsBase: 'WINS_BASE = 70. staticWins(p) = sum over STATIC_SLOTS[p.pos] of (slotWins(s, p.ovr) - slotWins(s, 70)).',
  staticSlots: 'STATIC_SLOTS maps each position to the slot(s) whose value counts for that player (e.g. WR -> WR1/WR2/WR3, CB -> CB1/CB2/CB3, DT -> DT1/DT2).',
  groups: 'WV_SLOT_GROUP / WV_TAG_GROUP assign each slot and each position to a group (OL, DL, LB, CB, S, WR, TE, RB, QB, K, P, ...).',
  note: 'Replacement is a LEAGUE-WIDE scarcity concept: as more teams fill a group, the replacement OVR for that group rises (fewer good players left). It is NOT a fixed 70 or a fixed percentile.'
};

function groupOrder() {
  // Canonical group list (from colors/src/engine/slots.ts group structure; mirrored here for the audit).
  return ['QB','RB','WR','TE','OT','OG','C','OL','DT','DE','EDGE','MIKE','WILL','SAM','LB','CB','SS','FS','DB','K','P','DIME','DL5','FB','TE3','WR4'];
}

// --- Sensitivity: replacement OVR per group as N (spots open) varies ---
// Requires a player pool: array of {group, ovr}. If none supplied, report structure only.
function sensitivityByN(pool) {
  const byG = {};
  for (const p of pool) {
    const g = p.group;
    if (!byG[g]) byG[g] = [];
    byG[g].push(Number(p.ovr));
  }
  const groups = Object.keys(byG);
  const out = {};
  for (const g of groups) {
    const arr = byG[g].sort((a, b) => b - a); // desc
    const series = [];
    for (let N = 1; N <= Math.min(32, arr.length); N++) {
      // replacement = Nth-best available = arr[N-1] (0-indexed) when N spots open
      series.push({ N, replacementOvr: arr[N - 1], nRemaining: arr.length - N });
    }
    out[g] = { nPlayers: arr.length, maxOvr: arr[0], minOvr: arr[arr.length - 1], series };
  }
  return { groups, byGroup: out };
}

// Beam's VERIFIED DL5 snap comparison (tools/mathlab/results/dl5-snap-measurement-2026-10-27.txt, origin/council/beam)
const dl5 = {
  slot: 'DL5', engineReplacement: '5th-ranked DL, rotation share 0.33 (measured)',
  realUsage: 'rank5 mean 32.8% snaps (median 35%, p25 22%, p75 44%), 2023-2025, n=1632 team-games',
  status: 'VERIFIED', sensitivity: 'weight 91..184 across 22%-44% share (fitlm, other spots refit <=1.8%)',
};

const known = [
  dl5,
  { slot: 'CB3/NICKEL', engineReplacement: '3rd CB, situational', realUsage: 'UNKNOWN — needs snap counts by DB depth', status: 'UNKNOWN', sensitivity: 'TODO' },
  { slot: 'DIME', engineReplacement: '6th DB, situational', realUsage: 'UNKNOWN', status: 'UNKNOWN', sensitivity: 'TODO' },
  { slot: 'SAM', engineReplacement: 'OLB2 / situational', realUsage: 'UNKNOWN', status: 'UNKNOWN', sensitivity: 'TODO' },
  { slot: 'FB', engineReplacement: 'fullback, low share', realUsage: 'UNKNOWN', status: 'UNKNOWN', sensitivity: 'TODO' },
  { slot: 'TE2/TE3', engineReplacement: 'backup TE, fixed share (recv)', realUsage: 'PARTIAL — personnel-shares.py covers offense personnel', status: 'PARTIAL', sensitivity: 'TODO' },
];

// --- Compare to real snap depth (if snaps supplied) ---
// snaps: array of {group, snapShare} (real NFL snap share per group).
function compareToSnaps(sens, snaps) {
  for (const s of snaps) snapByGroup[s.group] = Number(s.snapShare);
  const comp = [];
  for (const g of Object.keys(sens.byGroup)) {
    const series = sens.byGroup[g].series;
    // Engine replacement OVR at N=32 (all spots open league-wide) ~ the worst starter.
    const worstStarter = series.length ? series[series.length - 1].replacementOvr : null;
    comp.push({ group: g, realSnapShare: snapByGroup[g] != null ? snapByGroup[g] : null, engineReplacementOvrAtN32: worstStarter, nPlayers: sens.byGroup[g].nPlayers });
  }
  return comp;
}

const sens = pool ? sensitivityByN(pool) : null;
const comp = snaps && sens ? compareToSnaps(sens, snaps) : null;

const report = {
  tool: 'T4 replacement-level auditor',
  engineDefinition: ENGINE_DEFINITION,
  known,
  sensitivity: sens,
  snapComparison: comp,
  generatedAt: new Date().toISOString() + 'Z',
  reportingLaw: 'T12',
  nGroups: sens ? sens.groups.length : 0,
  note: 'No pool supplied -> structural definition only. Known DL5 slot is VERIFIED against Beam nflverse snap measurement (rank5 mean 32.8% snaps, 2023-2025, n=1632 team-games). To run sensitivity, supply --pool as [{group, ovr}, ...]. To compare to real usage, supply --snaps as [{group, snapShare}, ...] from a named nflverse release (hash-pinned).'
};

const out = JSON.stringify(report, null, 2);
if (outPath) { fs.writeFileSync(outPath, out); console.log(`replacement-audit.mjs: wrote ${outPath}`); }
else { console.log(out); }
