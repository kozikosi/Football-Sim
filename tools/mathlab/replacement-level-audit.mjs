// T4 — replacement-level auditor (colors engine, read-only).
// Merged: super's detailed engine-definition extraction + Beam's DL5 snap comparison (VERIFIED).
// Run: node tools/mathlab/replacement-level-audit.mjs [--pool <pool.json>] [--snaps <snaps.json>] [--out <out.json>]
import fs from 'node:fs';
const args = process.argv.slice(2);
const get = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
const poolPath = get('--pool'), snapsPath = get('--snaps'), outPath = get('--out');

const definition = {
  replacementLevels: "replacementLevels(pool, rosters): counts empty starting slots per group (dem[g]), then takes the (dem[g]-1)th OVR (0-indexed) from the group-sorted player pool — i.e. the best available player NOT yet needed as a starter, per group.",
  staticReplacement: "staticReplacement(): all 32 rosters have every slot empty; pool = PLAYERS filtered by POS_SLOT_MAP. Returns one replacement OVR per group.",
  winsBase: "WINS_BASE = 70. staticWins(p) = sum over STATIC_SLOTS[p.pos] of (slotWins(s, p.ovr) - slotWins(s, 70)).",
  staticSlots: "STATIC_SLOTS maps each position to the slot(s) whose value counts for that player.",
  groups: "WV_SLOT_GROUP / WV_TAG_GROUP assign each slot and each position to a group (OL, DL, LB, CB, S, WR, TE, RB, QB, K, P).",
  note: "Replacement is a LEAGUE-WIDE scarcity concept: as more teams fill a group, the replacement OVR for that group rises. It is NOT a fixed 70 or a fixed percentile.",
};

// Beam's VERIFIED DL5 snap comparison (tools/mathlab/results/dl5-snap-measurement-2026-10-27.txt)
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

let pool = null, snaps = null;
if (poolPath) try { pool = JSON.parse(fs.readFileSync(poolPath, 'utf8')); } catch (e) { console.error('pool read fail:', e.message); process.exit(2); }
if (snapsPath) try { snaps = JSON.parse(fs.readFileSync(snapsPath, 'utf8')); } catch (e) { console.error('snaps read fail:', e.message); process.exit(2); }

const out = {
  tool: 'T4 replacement-level auditor (merged super+beam)',
  engineDefinition: definition,
  knownSlots: known,
  poolSupplied: !!pool,
  snapsSupplied: !!snaps,
  snapComparison: snaps || null,
  generatedAt: new Date().toISOString(),
  reportingLaw: 'T12',
  note: 'No pool supplied -> structural definition only. Supply --pool/--snaps from a named nflverse release (hash-pinned) to compare.',
};
if (outPath) { fs.writeFileSync(outPath, JSON.stringify(out, null, 2)); console.log('wrote', outPath); }
else console.log(JSON.stringify(out, null, 2));
