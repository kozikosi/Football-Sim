#!/usr/bin/env node
// triangulate.mjs — T3b · TRIANGULATION GENERATOR (Z.ai lab, 2026-11-08)
// Usage: node triangulate.mjs <witness.json> <out.json>
// One row per slot: raw measured span (the witness) · calibrated display value · Owner
// salary table (INDEPENDENT ANCHOR ONLY — never a fit target, per Owner ruling 2026-11-07)
// · old personal table (RETIRED anchor — recorded for the historical record only)
// · new display-preset proposal (QB=1000, others from engine math, increments of 50 —
// Owner ruling 2, 2026-11-07) · volume-derived / EPA-derived (receiving slots, nflverse
// 2024, hash-pinned) · rank correlations · spread · disagreement flag (rank move ≥3, Beam
// M3 rule). AV-derived and salary-derived-per-slot beyond these tables: UNKNOWN this pass.
import fs from 'node:fs';
import { writeJSON } from './lablib.mjs';

const [witnessPath, out] = process.argv.slice(2);
const W = JSON.parse(fs.readFileSync(witnessPath, 'utf8'));

// ---- anchor tables (provenance stated; both are ANCHORS, never targets) ----
const OWNER_SALARY_6NOV = { QB: 1000, RB1: 250, RB2: 100, FB: 25, WR1: 650, WR2: 400, WR3: 100, WR4: 50, TE1: 250, TE2: 150, TE3: 50, OT1: 500, OG1: 400, C: 150, OG2: 250, OT2: 300, DE1: 650, DE2: 300, DT1: 500, DT2: 300, DL5: 150, MIKE: 300, WILL: 150, SAM: 100, CB1: 400, SS: 300, FS: 300, CB2: 250, CB3: 100, K: 50, P: 50 };
const OLD_PERSONAL_PRECOLORS = { QB: 320, RB1: 100, RB2: 40, WR1: 60, WR2: 40, WR3: 20, WR4: 5, TE1: 80, TE2: 20, OT1: 295, OT2: 295, OG1: 295, OG2: 295, C: 295, DE1: 350, DE2: 350, DT1: 320, DT2: 300, DL5: 5, MIKE: 100, WILL: 100, SAM: 60, LB4: 5, CB1: 350, CB2: 295, CB3: 80, CB4: 20, SS: 80, SS2: 5, FS: 60, FS2: 5, K: 5, P: 1, FB: 1 };
// provenance lines that travel with the table:
const TABLE_PROVENANCE = {
  OWNER_SALARY_6NOV: 'Owner salary table, 6 Nov 2026 (tools/mathlab/salary-reference.json, architect/engine-and-seats) — INDEPENDENT ANCHOR ONLY per Owner ruling 2026-11-07; never a fit target again',
  OLD_PERSONAL_PRECOLORS: 'Pre-Colors DEFAULT_WEIGHTS (Owner personal preferences, secondary-heavy) — RETIRED as any kind of target/foundation per Owner permission 2026-11-07; recorded here so history stays auditable',
};

// ---- new display-preset proposal (Owner ruling 2): QB=1000, engine math, increments of 50 ----
function newDisplayPreset() {
  const slopes = Object.fromEntries(Object.entries(W.curves).map(([s, c]) => [s, c.raw_slope_per_ovr]));
  const qb = slopes.QB;
  if (!qb) return null;
  const out = {};
  Object.entries(slopes).forEach(([s, v]) => {
    const raw = 1000 * v / qb;
    out[s] = Math.max(50, Math.round(raw / 50) * 50);   // floor 50, increments of 50
  });
  return out;
}
const NEW_PRESET = newDisplayPreset();

// ---- real-data anchors (receiving slots; hash-pinned nflverse 2024) ----
const realPath = process.env.REAL_ANCHORS || '/tmp/nflverse/real_anchors_2024.json';
let real = null;
if (fs.existsSync(realPath)) real = JSON.parse(fs.readFileSync(realPath, 'utf8'));

// ---- build the table ----
const slots = Object.keys(W.curves);
const rank = (obj, keys) => {
  const ks = keys.filter(k => Number.isFinite(obj[k]));
  const sorted = [...ks].sort((a, b) => obj[b] - obj[a]);
  const out = {};
  sorted.forEach((k, i) => out[k] = i + 1);
  return out;
};
const rows = slots.map(s => {
  const c = W.curves[s];
  const row = {
    slot: s,
    raw_span_70_90_wins: c.raw_span_70_90,
    raw_slope_per_ovr: c.raw_slope_per_ovr,
    modelWeights_700scale: W.modelWeights_output ? W.modelWeights_output[s] : null,
    display_weights_on_build: W.display_weights ? W.display_weights[s] : null,
    owner_salary_6nov_ANCHOR: OWNER_SALARY_6NOV[s] ?? null,
    old_personal_RETIRED: OLD_PERSONAL_PRECOLORS[s] ?? null,
    new_preset_proposal: NEW_PRESET ? NEW_PRESET[s] : null,
    volume_anchor_target_share: (real && real.receiving_slots[s]) ? real.receiving_slots[s].target_share : null,
    epa_anchor_epa_share: (real && real.receiving_slots[s]) ? real.receiving_slots[s].epa_share : null,
    av_anchor: null,   // PFR AV not loaded this pass — UNKNOWN, never invented
    salary_anchor_per_slot: (OWNER_SALARY_6NOV[s] != null) ? OWNER_SALARY_6NOV[s] : null,
  };
  return row;
});

// rank correlations across anchor families (Spearman, over slots where both columns exist)
const spearman = (a, b) => {
  const ks = rows.filter(r => Number.isFinite(r[a]) && Number.isFinite(r[b])).map(r => r.slot);
  if (ks.length < 3) return null;
  const ra = rankOf(ks.map(k => rows.find(r => r.slot === k)[a]));
  const rb = rankOf(ks.map(k => rows.find(r => r.slot === k)[b]));
  const n = ks.length;
  const d2 = ra.reduce((s, x, i) => s + (x - rb[i]) ** 2, 0);
  return Math.round((1 - 6 * d2 / (n * (n * n - 1))) * 1000) / 1000;
};
const rankOf = v => { const o = [...v.keys()].sort((i, j) => v[j] - v[i]); const r = new Array(v.length); o.forEach((idx, i) => r[idx] = i + 1); return r; };

const correlations = {
  rawSpan_vs_ownerSalary: spearman('raw_span_70_90_wins', 'owner_salary_6nov_ANCHOR'),
  rawSpan_vs_oldPersonal: spearman('raw_span_70_90_wins', 'old_personal_RETIRED'),
  rawSpan_vs_newPreset: spearman('raw_span_70_90_wins', 'new_preset_proposal'),
  ownerSalary_vs_newPreset: spearman('owner_salary_6nov_ANCHOR', 'new_preset_proposal'),
  rawSpan_vs_targetShare_receiving: (() => {
    const rec = rows.filter(r => r.volume_anchor_target_share != null);
    if (rec.length < 3) return null;
    const ra = rankOf(rec.map(r => r.raw_span_70_90_wins)), rb = rankOf(rec.map(r => r.volume_anchor_target_share));
    const n = rec.length, d2 = ra.reduce((s, x, i) => s + (x - rb[i]) ** 2, 0);
    return Math.round((1 - 6 * d2 / (n * (n * n - 1))) * 1000) / 1000;
  })(),
};

// disagreement flags: rank of the slot among all slots by raw span vs by owner salary (M3 rule ≥3)
const rkRaw = rank(Object.fromEntries(rows.map(r => [r.slot, r.raw_span_70_90_wins])), rows.map(r => r.slot));
const rkOwn = rank(Object.fromEntries(rows.map(r => [r.slot, r.owner_salary_6nov_ANCHOR ?? -1])), rows.map(r => r.slot));
rows.forEach(r => {
  r.rank_by_rawSpan = rkRaw[r.slot];
  r.rank_by_ownerSalary = rkOwn[r.slot];
  r.rank_move_raw_vs_owner = rkOwn[r.slot] - rkRaw[r.slot];
  r.disagreement_flag = Math.abs(rkOwn[r.slot] - rkRaw[r.slot]) >= 3 ? 'FLAG(rank≥3)' : '';
});

const doc = {
  schema: 'zai-t3-triangulation/1',
  tool: 'triangulate.mjs (T3b)',
  witnessBuild: W.build,
  tableProvenance: TABLE_PROVENANCE,
  realSource: real ? real.source : 'real_anchors_2024.json missing — volume/EPA columns absent this pass',
  presetRule: 'Owner ruling 2026-11-07 #2: QB=1000, other slots from engine math, increments of 50. Proposal computed from RAW slopes (no table fit), floor 50.',
  newPresetProposal: NEW_PRESET,
  correlations,
  rows,
  unknowns: ['AV-derived column (PFR AV not loaded this pass)', 'salary-derived beyond the Owner table', 'efficiency-derived for non-receiving slots'],
  generated: '2026-11-08',
};
writeJSON(out, doc);

// human-readable rosetta table
console.log('\nslot  raw70→90  rawSlope   mW700  owner$  oldPers  NEWpres  tgtShare  EPAshare  Δrank flag');
rows.forEach(r => {
  console.log(`${r.slot.padEnd(5)} ${r.raw_span_70_90_wins.toFixed(3).padStart(8)} ${r.raw_slope_per_ovr.toFixed(5).padStart(9)} ${String(r.modelWeights_700scale ?? '').padStart(6)} ${String(r.owner_salary_6nov_ANCHOR ?? '').padStart(7)} ${String(r.old_personal_RETIRED ?? '').padStart(8)} ${String(r.new_preset_proposal ?? '').padStart(8)} ${r.volume_anchor_target_share != null ? (100 * r.volume_anchor_target_share).toFixed(1) + '%' : '  —'.padStart(8)} ${r.epa_anchor_epa_share != null ? (100 * r.epa_anchor_epa_share).toFixed(1) + '%' : '  —'} ${String(r.rank_move_raw_vs_owner).padStart(5)}  ${r.disagreement_flag}`);
});
console.log('\nSpearman:', JSON.stringify(correlations));
