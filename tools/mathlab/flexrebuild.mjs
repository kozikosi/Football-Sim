#!/usr/bin/env node
// tools/mathlab/flexrebuild.mjs — deterministic flex-table rebuild generator.
//
// Reads D values + the Owner's override list as INPUT and generates flex.json +
// flex.ts deterministically. It does NOT compute D (D comes from the engine's
// slot weights, recomputed post-bump by whoever owns the engine change).
//
//   node flexrebuild.mjs --d <d-values.json> --overrides <overrides.json> --out <dir>
//
// Inputs:
//   --d        D values JSON:  { role: { dest: D } }   (D >= 0, from the engine)
//   --overrides  Owner overrides JSON:
//                { "set": { "role->dest": penalty }, "remove": [ "role->dest" ] }
//   --out      output directory (default: tools/mathlab/scratch/flexrebuild-<utc>/)
//
// Rounding rule (theta = 1.0, cutoffs at midpoints 1 / 4 / 9):
//   D < 1   -> 0      1 <= D < 4  -> 2      4 <= D < 9  -> 6      D >= 9 -> 12
//
// Process:
//   1. Start from every (role, dest) in the D input, penalty = round(D).
//   2. Apply "set" overrides (add or overwrite a rule's penalty).
//   3. Drop every rule in "remove".
//   4. Ensure all 17 roles have a row (empty {} if no rules).
//   5. Generate flex.json and flex.ts in the same format as the existing files.
//   6. Validate: known roles/dests, penalties in the allowed set, every role has
//      a row, QB flexes ONLY to FS (Owner REV 4 / 29 Oct).
//
// Outputs are written ONLY to --out (never to the real tools/mathlab/flex.json
// or colors/src/engine/flex.ts). Deterministic: sorted keys, stable formatting.
//
// Known penalty set: {0, 2, 4, 6} for all roles, plus 10 and 12 for QB->FS
// (the Owner's QB flex is locked to FS; the exact value is an override input).

import fs from 'node:fs';
import path from 'node:path';

const ROLES = [
  'QB','RB','FB','WR','TE','OT','OG','C','DT','EDGE','ILB','OLB','SS','FS','CB','K','P',
];
const DESTS = new Set([...ROLES, 'NICKEL', 'DIME']);
const ALLOWED = new Set([0, 2, 4, 6, 10, 12]);
const roleIndex = {};
ROLES.forEach((r, i) => { roleIndex[r] = i; });

const CUTOFFS = [1, 4, 9];   // midpoints between tiers 0/2/6/12
const TIERS = [0, 2, 6, 12];

function roundTier(d) {
  if (d < 1) return 0;
  if (d < 4) return 2;
  if (d < 9) return 6;
  return 12;
}

function parseKey(k) {
  const i = k.indexOf('->');
  if (i < 0) throw new Error('bad override key (expect role->dest): ' + k);
  return { role: k.slice(0, i), dest: k.slice(i + 2) };
}

function fail(msg) { console.error('FLEXREBUILD FAIL: ' + msg); process.exit(1); }

(async () => {
  const args = process.argv.slice(2);
  const opt = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--d') opt.d = args[++i];
    else if (args[i] === '--overrides') opt.overrides = args[++i];
    else if (args[i] === '--out') opt.out = args[++i];
    else fail('unknown argument: ' + args[i]);
  }
  if (!opt.d) fail('--d <d-values.json> is required');
  if (!opt.overrides) fail('--overrides <overrides.json> is required');

  let dValues, overrides;
  try { dValues = JSON.parse(fs.readFileSync(opt.d, 'utf8')); } catch (e) { fail('cannot read --d: ' + e.message); }
  try { overrides = JSON.parse(fs.readFileSync(opt.overrides, 'utf8')); } catch (e) { fail('cannot read --overrides: ' + e.message); }
  const setMap = overrides.set || {};
  const removeSet = new Set(overrides.remove || []);

  // Validate D input roles/dests. Only the 17 known roles are processed; any
  // other top-level keys (e.g. "_source", "_notes") are metadata and ignored.
  const bad = [];
  for (const role of Object.keys(dValues)) {
    if (!(role in roleIndex)) continue; // metadata key, not a role
    const row = dValues[role] || {};
    for (const dest of Object.keys(row)) {
      if (!DESTS.has(dest)) bad.push(role + '->' + dest + ' unknown dest');
      const D = row[dest];
      if (typeof D !== 'number' || !Number.isFinite(D) || D < 0) bad.push(role + '->' + dest + ' invalid D ' + D);
    }
  }
  if (bad.length) { bad.forEach(b => console.error('FLEXREBUILD FAIL: ' + b)); process.exit(1); }

  // Build the table: rounded D, then overrides, then removals.
  const flex = {};
  ROLES.forEach(r => { flex[r] = {}; });

  for (const role of ROLES) {
    const row = dValues[role] || {};
    for (const dest of Object.keys(row)) {
      flex[role][dest] = roundTier(row[dest]);
    }
  }

  for (const key of Object.keys(setMap)) {
    const { role, dest } = parseKey(key);
    if (!(role in roleIndex)) fail('override set unknown role: ' + role);
    if (!DESTS.has(dest)) fail('override set unknown dest: ' + dest);
    const p = setMap[key];
    if (typeof p !== 'number' || !Number.isFinite(p) || p < 0) fail('override set ' + key + ' invalid penalty ' + p);
    flex[role][dest] = p;
  }

  for (const key of removeSet) {
    const { role, dest } = parseKey(key);
    if (flex[role] && flex[role][dest] != null) delete flex[role][dest];
  }

  // QB may flex ONLY to FS (Owner REV 4 / 29 Oct). Drop any other QB rule.
  if (flex.QB) {
    for (const dest of Object.keys(flex.QB)) { if (dest !== 'FS') delete flex.QB[dest]; }
  }

  // Validation.
  const problems = [];
  let nRules = 0;
  const tierCounts = { 0: 0, 2: 0, 4: 0, 6: 0, 10: 0, 12: 0 };
  for (const role of ROLES) {
    if (!flex[role]) problems.push(role + ' missing row');
    const row = flex[role] || {};
    for (const dest of Object.keys(row)) {
      nRules++;
      const p = row[dest];
      if (!ALLOWED.has(p)) problems.push(role + '->' + dest + ' penalty ' + p + ' not in allowed set');
      if (role === 'QB' && dest !== 'FS') problems.push('QB->' + dest + ' (QB may flex only to FS)');
      tierCounts[p] = (tierCounts[p] || 0) + 1;
    }
  }

  // One-way asymmetries (informational): A->B allowed but B->A missing (both roles).
  const asym = [];
  for (const a of ROLES) {
    for (const b of Object.keys(flex[a] || {})) {
      if (b === 'NICKEL' || b === 'DIME' || b === a) continue;
      if (roleIndex[b] && (flex[b] || {})[a] == null) asym.push(a + '->' + b);
    }
  }

  const outDir = opt.out || path.join('tools', 'mathlab', 'scratch', 'flexrebuild-' + new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16));
  fs.mkdirSync(outDir, { recursive: true });

  // Deep sort all keys for deterministic output.
  function stable(obj) {
    if (Array.isArray(obj)) return obj.map(stable);
    if (obj && typeof obj === 'object') {
      const sorted = {};
      Object.keys(obj).sort().forEach((k) => { sorted[k] = stable(obj[k]); });
      return sorted;
    }
    return obj;
  }
  const write = (name, obj) => fs.writeFileSync(path.join(outDir, name), JSON.stringify(stable(obj), null, 2) + '\n');

  // --- flex.json ---
  const flexJson = {
    _source: 'Generated by tools/mathlab/flexrebuild.mjs from D values + Owner overrides (theta=1.0, cutoffs 1/4/9 -> tiers 0/2/6/12). D values are INPUT (engine-derived, post-bump); this script does not compute them. Overrides: see --overrides file. Roles with no rules keep an empty row; 0 = free flex.',
    roles: [...ROLES],
    flex,
    _notes: {
      method: 'round(D) then apply Owner set/remove overrides; removals delete the rule entirely (not set to 0). QB flexes ONLY to FS. Deterministic output for identical inputs.',
      tiers: '0 / 2 / 6 / 12 with cutoffs at D = 1 / 4 / 9 (theta = 1.0).',
    },
  };
  write('flex.json', flexJson);

  // --- flex.ts (typed copy, same shape as colors/src/engine/flex.ts) ---
  const rows = [];
  for (const role of ROLES) {
    const row = flex[role] || {};
    const entries = Object.keys(row).sort((a, b) => roleIndex[a] - roleIndex[b] || a.localeCompare(b)).map(d => `    ${d}: ${row[d]}`);
    rows.push(`  ${role}: {${entries.length ? '\n' + entries.join(',\n') + '\n  ' : ''}}`);
  }
  const ts = `// Generated by tools/mathlab/flexrebuild.mjs from D values + Owner overrides (theta=1.0, cutoffs 1/4/9 -> tiers 0/2/6/12).\n// Source of truth: the --d and --overrides inputs; this file is a typed copy and is compared with flex.json rule by rule.\nimport type { Role } from './players.ts';\nimport type { Dest } from './slots.ts';\n\ntype Row = Partial<Record<Dest, number>>;\nexport const FLEX: Readonly<Record<Role, Row>> = {\n${rows.join(',\n')}\n};\n`;
  fs.writeFileSync(path.join(outDir, 'flex.ts'), ts);

  // --- run report ---
  const report = {
    generatedUtc: new Date().toISOString() + 'Z',
    inputs: { d: opt.d, overrides: opt.overrides },
    rounding: { theta: 1.0, cutoffs: [1, 4, 9], tiers: [0, 2, 6, 12] },
    roles: ROLES.length,
    rules: nRules,
    tierCounts,
    removed: [...removeSet].sort(),
    overridesSet: Object.keys(setMap).sort(),
    oneWayAsymmetries: asym,
    problems,
    ok: problems.length === 0,
  };
  write('report.json', report);

  console.log('FLEXREBUILD — wrote ' + outDir);
  console.log('roles', ROLES.length, 'rules', nRules);
  console.log('tiers', JSON.stringify(tierCounts));
  console.log('removed', report.removed.join('; ') || '(none)');
  console.log('set overrides', report.overridesSet.length);
  console.log('one-way asymmetries (info):', asym.length ? asym.join(' ') : '(none)');
  console.log(problems.length ? 'VALIDATION PROBLEMS: ' + problems.join('; ') : 'FLEXREBUILD OK');
  process.exit(problems.length ? 1 : 0);
})().catch((e) => { console.error('FLEXREBUILD FAIL: ' + e.message); process.exit(1); });
