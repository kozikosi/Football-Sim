// tools/mathlab/flexrebuild.mjs
//
// Deterministic rebuild of the flex table from D values + Owner overrides.
//
// Owner decision 2026-11-09 (council/muse, claude-reply-owner-picks-D-2026-11-09):
//   Adopt D at theta = 1.0, round to nearest tier (0 / 2 / 6 / 12;
//   cutoffs at midpoints 1 / 4 / 9), with Owner overrides. WILL 150->200 and
//   C 150->200 engine changes must be applied FIRST, then D recomputed for all
//   rules with the new weights, then rounding rule + overrides applied.
//
// Usage:
//   node flexrebuild.mjs --d-values <file.json> [--out <dir>] [--check]
//
// Inputs:
//   --d-values  JSON map of "ROLE>DEST" -> D number (post-bump recomputed D).
//               Required. Missing entries => no flex rule for that pair.
//   --out       Output directory (default: the script's own dir, tools/mathlab).
//   --check     Self-validate the generated output (tiers, overrides, removals,
//               QB flexes only to FS) and exit non-zero on any problem.
//
// Outputs:
//   flex.json  mathlab data file (roles + flex map), diffable against any prior table.
//   flex.ts    typed engine rendering of the same table.
//
// The script writes only its outputs; it never touches the product HTML or any
// protected constant. It fails loudly if the D input is malformed.

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Roles and destinations mirror the engine's Role / Dest types:
//   Role = 'QB' | 'RB' | 'FB' | 'WR' | 'TE' | 'OT' | 'OG' | 'C' | 'DT' |
//          'EDGE' | 'ILB' | 'OLB' | 'SS' | 'FS' | 'CB' | 'K' | 'P' | 'LS';
//   Dest = Role | 'NICKEL' | 'DIME' | 'DL5';
// LS has no flex row (no flex destinations). NICKEL/DIME are destinations only.
const ROLES = [
  'QB', 'RB', 'FB', 'WR', 'TE', 'OT', 'OG', 'C', 'DT', 'EDGE', 'ILB', 'OLB',
  'SS', 'FS', 'CB', 'K', 'P',
];
const EXTRA_DESTS = ['NICKEL', 'DIME'];
const DESTS = [...ROLES, ...EXTRA_DESTS];

// Rounding: theta = 1.0, nearest tier {0, 2, 6, 12}; cutoffs at 1, 4, 9.
//   D in [0,1)  -> 0
//   D in [1,4)  -> 2
//   D in [4,9)  -> 6
//   D in [9,inf)-> 12
function roundTier(d) {
  if (!(typeof d === 'number' && Number.isFinite(d) && d >= 0)) {
    throw new Error(`invalid D value: ${JSON.stringify(d)}`);
  }
  if (d < 1) return 0;
  if (d < 4) return 2;
  if (d < 9) return 6;
  return 12;
}

// Owner overrides (penalty magnitudes stored as positive numbers; effective
// rating is ovr - penalty). These override the rounding rule for the named pair.
const OVERRIDES = {
  // -2
  'DT>OG': 2, 'EDGE>C': 2, 'FS>SS': 2, 'SS>FS': 2, 'ILB>SS': 2,
  'OT>C': 2, 'SS>OLB': 2, 'WR>CB': 2, 'WR>DIME': 2, 'WR>NICKEL': 2,
  'WR>FS': 2, 'WR>SS': 2, 'FB>RB': 2, 'K>P': 2, 'P>K': 2,
  // -6
  'FB>TE': 6, 'C>OG': 6, 'OLB>ILB': 6, 'OLB>SS': 6, 'OT>EDGE': 6,
  'SS>CB': 6, 'FS>CB': 6, 'FS>OLB': 6, 'ILB>NICKEL': 6, 'ILB>TE': 6,
  'OLB>NICKEL': 6, 'DT>OT': 6, 'OT>DT': 6, 'SS>TE': 6, 'TE>C': 6,
  'TE>DIME': 6, 'TE>NICKEL': 6, 'TE>OLB': 6, 'TE>RB': 6, 'WR>RB': 6,
  'WR>TE': 6, 'EDGE>TE': 6,
  // -12
  'TE>EDGE': 12, 'RB>WR': 12, 'TE>OT': 12, 'C>DT': 12, 'C>OT': 12,
  'OLB>EDGE': 12, 'RB>FS': 12, 'RB>SS': 12, 'TE>ILB': 12, 'EDGE>SS': 12,
  'ILB>DIME': 12, 'OLB>DIME': 12, 'QB>FS': 12, 'SS>RB': 12,
};

// Removed entirely: no flex rule exists for these pairs (not even at 0).
const REMOVED = new Set([
  'FB>EDGE', 'FB>DT', 'FB>ILB', 'FB>OLB', 'CB>RB', 'DT>TE', 'EDGE>FS',
]);

function keyOf(role, dest) {
  return `${role}>${dest}`;
}

function buildTable(dValues) {
  const flex = {};
  let nRules = 0;
  for (const role of ROLES) {
    const row = {};
    // Playing one's own role is always legal at 0 (not a flex rule, but listed).
    row[role] = 0;
    // QB flexes ONLY to FS (Owner, REV 4): no other destination, D input or not.
    const dests = role === 'QB' ? ['FS'] : DESTS;
    for (const dest of dests) {
      if (dest === role) continue;
      const key = keyOf(role, dest);
      if (REMOVED.has(key)) continue; // disallowed entirely
      if (Object.prototype.hasOwnProperty.call(OVERRIDES, key)) {
        row[dest] = OVERRIDES[key]; nRules++; continue; // Owner override wins
      }
      if (Object.prototype.hasOwnProperty.call(dValues, key)) {
        row[dest] = roundTier(dValues[key]); nRules++; continue; // rounding rule
      }
      // Unspecified pair with no D input: no rule (not allowed to flex).
    }
    flex[role] = row;
  }
  return { flex, nRules };
}

function toFlexJson(flex) {
  return {
    _source: 'FLEX REBUILD by tools/mathlab/flexrebuild.mjs — Owner D decision 2026-11-09: D at theta=1.0 rounded to nearest tier (0/2/6/12; cutoffs 1/4/9) with Owner overrides. WILL 150->200 and C 150->200 engine changes must be applied first; D values recomputed post-bump. Roles not listed under a destination may not flex there. 0 = free.',
    roles: ROLES,
    flex,
  };
}

function toFlexTs(flex) {
  const lines = [
    '// Flex table rebuilt by tools/mathlab/flexrebuild.mjs from D values + Owner overrides.',
    '// Owner D decision 2026-11-09: D at theta=1.0 rounded to nearest tier (0/2/6/12; cutoffs 1/4/9),',
    '// with the Owner override list applied. WILL 150->200 and C 150->200 engine changes apply first.',
    '// Source of truth for regeneration: tools/mathlab/flexrebuild.mjs + its --d-values input.',
    '// from-position -> {destination: penalty}. 0 = free. NICKEL = CB3 slot; DIME = 6th-DB slot.',
    '',
    'import type { Role } from \'./players.ts\';',
    'import type { Dest } from \'./slots.ts\';',
    '',
    'type Row = Partial<Record<Dest, number>>;',
    'export const FLEX: Readonly<Record<Role, Row>> = {',
  ];
  for (const role of ROLES) {
    const row = flex[role] || {};
    const entries = Object.entries(row)
      .map(([d, p]) => `    ${d}: ${p}`)
      .join(',\n');
    lines.push(`  ${role}: {${entries ? '\n' + entries + '\n  ' : ''}},`);
  }
  lines.push('};');
  lines.push('');
  lines.push('// Owner (21 Oct): emergency fallback at -8 for the last open spot; a quarterback never takes it.');
  lines.push('export const EMERGENCY_PENALTY = 8;');
  lines.push('');
  lines.push('export interface Fit { penalty: number; emergency: boolean; legal: boolean }');
  lines.push('');
  lines.push('// DL5 is the rotational fifth lineman: natural for DT and EDGE; everyone else pays the cheaper');
  lines.push('// of role->DT and role->EDGE (spec 12.2).');
  lines.push('function dl5Penalty(role: Role): number | undefined {');
  lines.push("  if (role === 'DT' || role === 'EDGE') return 0;");
  lines.push("  const a = FLEX[role].DT, b = FLEX[role].EDGE;");
  lines.push('  if (a === undefined) return b;');
  lines.push('  if (b === undefined) return a;');
  lines.push('  return Math.min(a, b);');
  lines.push('}');
  lines.push('');
  lines.push('export function fit(role: Role, dest: Dest): Fit {');
  lines.push("  if (role === dest) return { penalty: 0, emergency: false, legal: true };");
  lines.push('  const listed = dest === \'DL5\' ? dl5Penalty(role) : FLEX[role][dest];');
  lines.push('  if (listed !== undefined) return { penalty: listed, emergency: false, legal: true };');
  lines.push("  if (role === 'QB') return { penalty: EMERGENCY_PENALTY, emergency: true, legal: false };");
  lines.push('  return { penalty: EMERGENCY_PENALTY, emergency: true, legal: true };');
  lines.push('}');
  lines.push('');
  lines.push('export function effectiveOvr(ovr: number, role: Role, dest: Dest): number {');
  lines.push('  return ovr - fit(role, dest).penalty;');
  lines.push('}');
  return lines.join('\n') + '\n';
}

function validate(flex) {
  const problems = [];
  const validPenalties = new Set([0, 2, 6, 12]);
  for (const role of ROLES) {
    const row = flex[role] || {};
    if (!Object.prototype.hasOwnProperty.call(row, role)) {
      problems.push(`${role}: missing self row at 0`);
    }
    for (const [dest, pen] of Object.entries(row)) {
      if (!DESTS.includes(dest)) problems.push(`${role}>${dest}: unknown destination`);
      if (!validPenalties.has(pen)) problems.push(`${role}>${dest}: penalty ${pen} not in {0,2,6,12}`);
    }
    // QB flexes only to FS
    if (role === 'QB') {
      const qbDests = Object.keys(row).filter(d => d !== 'QB');
      if (qbDests.length !== 1 || qbDests[0] !== 'FS') {
        problems.push(`QB flexes to destinations other than FS: ${qbDests.join(',')}`);
      }
    }
  }
  // Removed rules must be absent
  for (const key of REMOVED) {
    const [role, dest] = key.split('>');
    if (Object.prototype.hasOwnProperty.call(flex[role] || {}, dest)) {
      problems.push(`removed rule still present: ${key}`);
    }
  }
  // Overrides must be present with exact values
  for (const [key, want] of Object.entries(OVERRIDES)) {
    const [role, dest] = key.split('>');
    const got = flex[role]?.[dest];
    if (got !== want) problems.push(`override ${key}: expected ${want}, got ${got === undefined ? '<absent>' : got}`);
  }
  return problems;
}

function parseArgs(argv) {
  const args = { 'd-values': undefined, out: __dirname, check: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--d-values') args['d-values'] = argv[++i];
    else if (a === '--out') args.out = argv[++i];
    else if (a === '--check') args.check = true;
    else if (a === '--help' || a === '-h') {
      console.log(fs.readFileSync(new URL('./flexrebuild.mjs', import.meta.url), 'utf8').split('\n').slice(1, 22).join('\n'));
      process.exit(0);
    } else {
      throw new Error(`unknown argument: ${a}`);
    }
  }
  if (!args['d-values']) throw new Error('--d-values is required');
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const dValues = JSON.parse(
    fs.readFileSync(args['d-values'], 'utf8').replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, '')
  );
  const { flex, nRules } = buildTable(dValues);
  const json = toFlexJson(flex);
  const ts = toFlexTs(flex);
  fs.mkdirSync(args.out, { recursive: true });
  fs.writeFileSync(join(args.out, 'flex.json'), JSON.stringify(json, null, 2) + '\n');
  fs.writeFileSync(join(args.out, 'flex.ts'), ts);
  const tierCounts = { 0: 0, 2: 0, 6: 0, 12: 0 };
  for (const role of ROLES) {
    for (const [dest, pen] of Object.entries(flex[role] || {})) {
      if (dest === role) continue;
      tierCounts[pen] = (tierCounts[pen] || 0) + 1;
    }
  }
  console.log(`roles ${ROLES.length}  rules ${nRules}`);
  console.log('tiers:', Object.entries(tierCounts).map(([t, c]) => `${t}:${c}`).join(' '));
  if (args.check) {
    const problems = validate(flex);
    if (problems.length) {
      problems.forEach(p => console.log('FAIL', p));
      process.exit(1);
    }
    console.log('FLEXREBUILD OK');
  }
}

try {
  main();
} catch (err) {
  console.error('FLEXREBUILD ERROR:', err.message);
  process.exit(1);
}
