#!/usr/bin/env node
// mathlab/flexrebuild.mjs — P-317 (prompt C, 9 Nov): rebuild the flex table from D + the Owner's custom rules,
// deterministically, so a manual edit can never time out again.
//
// What it does
//   1. Reads the rule universe from a flex.json (default tools/mathlab/flex.json).
//   2. Measures D for every rule on the Colors engine: D(a>b) = max(0, (X-Y) * (1 - slopeA/slopeB)),
//      slope = slotWins20(slot)/20 (--slope=wins, the definition thetaprice.mjs uses and the one that produced
//      the published 12.7 / 12.3 / 10.0 / 4.6) or slot weight (--slope=weight, the definition implied by the
//      Owner's "the WILL bump brings D down to ~6.7" reasoning; see D-03 in _agents/pickle/notes/flex-D-2026-11-09.md).
//   3. Rounds theta*D to the nearest tier of 0/2/6/12 (cutoffs at the midpoints 1/4/9), clamps to [0,30].
//   4. Applies the Owner's rules from flex-owner-2026-11-09.json: removals (delete the rule), overrides (exact value).
//      Rules the Owner does not name keep the rounded D.
//   5. Writes a JSON result (every rule, every number), an md report of every rule that moves, a generated flex.json
//      and a generated flex.ts (the engine's typed copy shape).
//
// Usage (run from colors/, like thetaprice.mjs):
//   node --experimental-strip-types ../tools/mathlab/flexrebuild.mjs \
//        [--owner=../tools/mathlab/flex-owner-2026-11-09.json] [--base=../tools/mathlab/flex.json] \
//        [--slope=wins|weight] [--theta=1.0] [--x=90] [--y=70] [--cutoffs=1,4,9] [--bump=WILL:200,C:200] \
//        [--out-dir=../tools/mathlab/results] [--name=flex-D-2026-11-09] \
//        [--check=<flex.json>] [--write=<dir>] [--selftest]
//
// --check is the P-311 verifier: it compares the generated table with an existing flex.json rule by rule and
// exits 1 on any difference (including a rule the file has that the rebuild deletes, and vice versa).
// --selftest runs the pure math and the Owner file (no engine needed) and exits 1 on any failure.
// READ-ONLY on the engine and on any flex.json: output goes to --out-dir / --write only.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const flag = (k) => process.argv.includes('--' + k);
const r2 = (x) => Math.round(x * 100) / 100;
const clamp030 = (x) => Math.min(30, Math.max(0, x));
const fail = (m) => { console.error('flexrebuild: ' + m); process.exit(2); };
// a path as it should appear in a report: repo-relative when inside this repo, else absolute
const REPO_ROOT = path.resolve(HERE, '..', '..');
const display = (p) => {
  const r = path.relative(REPO_ROOT, p); if (!r.startsWith('..')) return r;
  const c = path.relative(process.cwd(), p);
  const ups = ((c.match(/^(?:\.\.\/)+/) || [''])[0].length) / 3;
  return ups <= 1 ? c : p;
};

// ---------- pure math (selftested, no engine) ----------
export function tierFor(d, cutoffs = [1, 4, 9], tiers = [0, 2, 6, 12]) {
  if (!Array.isArray(cutoffs) || cutoffs.length !== tiers.length - 1) throw new Error('cutoffs must have tiers.length-1 entries');
  for (let i = 0; i < cutoffs.length; i++) if (d < cutoffs[i]) return tiers[i];
  return tiers[tiers.length - 1];
}
export function ovrEqD(slopeA, slopeB, x = 90, y = 70) {
  if (!(slopeB > 0)) throw new Error('ovrEqD: slope of the destination must be positive');
  return Math.max(0, (x - y) * (1 - slopeA / slopeB));
}
export function penalty(theta, d) { return clamp030(r2(theta * d)); }

// Validate the Owner spec: every value legal, no rule both removed and set, every cutoffs/tiers sane.
export function validateOwner(o) {
  const errs = [];
  const tiers = o.tiers || [0, 2, 6, 12];
  (o.cutoffs || [1, 4, 9]).forEach((c, i, a) => { if (i && !(c > a[i - 1])) errs.push('cutoffs not increasing at ' + i); });
  if ((o.cutoffs || []).length !== tiers.length - 1) errs.push('cutoff count != tiers-1');
  for (const [r, v] of Object.entries(o.set || {})) {
    if (!tiers.includes(v)) errs.push(`override ${r}=${v} is not a tier`);
    if ((o.remove || []).includes(r)) errs.push(`${r} is both removed and set`);
  }
  for (const r of o.remove || []) if (!/^[A-Z]+>[A-Z]+$/.test(r)) errs.push('removal not a rule: ' + r);
  for (const [slot, w] of Object.entries(o.bumps || {})) { if (!(w > 0)) errs.push('bump ' + slot + ' not positive'); }
  return errs;
}

// ---------- the table itself ----------
const splitRule = (r) => { const [a, b] = r.split('>'); return { role: a, dest: b }; };

function selftest() {
  let bad = 0;
  const eq = (name, got, want) => { const ok = JSON.stringify(got) === JSON.stringify(want); if (!ok) { console.log(`FAIL ${name}: got ${JSON.stringify(got)} want ${JSON.stringify(want)}`); bad++; } };
  // tier boundaries at the midpoints of 0/2/6/12
  eq('tier 0.99', tierFor(0.99), 0); eq('tier 1.0', tierFor(1), 2); eq('tier 3.99', tierFor(3.99), 2);
  eq('tier 4.0', tierFor(4), 6); eq('tier 8.99', tierFor(8.99), 6); eq('tier 9.0', tierFor(9), 12);
  eq('tier 19.27', tierFor(19.27), 12);
  // D: same slope -> 0; half the slope -> half of (X-Y); steeper source -> 0 (floored); destination slope 0 -> throws
  eq('D equal slope', ovrEqD(0.6, 0.6), 0);
  eq('D half slope', ovrEqD(0.3, 0.6), 10);
  eq('D steeper source floors at 0', ovrEqD(1.2, 0.6), 0);
  try { ovrEqD(0.5, 0); bad++; console.log('FAIL D zero dest slope did not throw'); } catch { /* expected */ }
  // penalty clamps and rounds
  eq('penalty 30 cap', penalty(1, 31.4), 30);
  eq('penalty round2', penalty(1, 12.345), 12.35);
  eq('penalty floor', penalty(1, -3), 0);
  eq('penalty theta .75', penalty(0.75, 12.71), 9.53);
  // the published headline numbers (measured slope, thetaprice 3ed03627) must round to the Owner's four rules
  const published = { 'TE>EDGE': 12.71, 'RB>WR': 12.32, 'TE>OT': 10.03, 'DT>EDGE': 4.61 };
  const want = { 'TE>EDGE': 12, 'RB>WR': 12, 'TE>OT': 12, 'DT>EDGE': 6 };
  for (const [r, d] of Object.entries(published)) eq('published ' + r, tierFor(penalty(1, d)), want[r]);
  // the Owner file must be legal and self-consistent
  const o = JSON.parse(fs.readFileSync(path.join(HERE, 'flex-owner-2026-11-09.json'), 'utf8'));
  const errs = validateOwner(o);
  if (errs.length) { console.log('FAIL owner spec: ' + errs.join('; ')); bad++; } else console.log('owner spec: legal, ' + Object.keys(o.set).length + ' rules set, ' + o.remove.length + ' removed, bumps ' + JSON.stringify(o.bumps));
  // every set/remove rule must be a syntactically valid ROLE>DEST
  for (const r of [...Object.keys(o.set), ...o.remove]) if (!/^[A-Z]+>[A-Z]+$/.test(r)) { console.log('FAIL bad rule id ' + r); bad++; }
  // determinism: the built table function is a pure function of its inputs
  const t1 = JSON.stringify(buildTable({ rows: [{ rule: 'A>B', d: 4.2 }], owner: o, universe: ['A>B'] }));
  const t2 = JSON.stringify(buildTable({ rows: [{ rule: 'A>B', d: 4.2 }], owner: o, universe: ['A>B'] }));
  eq('deterministic', t1, t2);
  console.log(bad ? `FLEXREBUILD SELFTEST FAIL ${bad}` : 'FLEXREBUILD SELFTEST OK');
  process.exit(bad ? 1 : 0);
}

// rows: [{rule, d, dWeight}] -> Map(rule -> {final, action}) ; universe = every rule that must appear
export function buildTable({ rows, owner, universe }) {
  const set = owner.set || {}, remove = owner.remove || [], tiers = owner.tiers || [0, 2, 6, 12], cut = owner.cutoffs || [1, 4, 9];
  const byRule = new Map(rows.map((r) => [r.rule, r]));
  const out = new Map();
  for (const rule of universe) {
    const row = byRule.get(rule) || { rule, d: 0 };
    if (remove.includes(rule)) { out.set(rule, { final: null, action: 'removed' }); continue; }
    const rounded = tierFor(penalty(owner.theta == null ? 1 : owner.theta, row.d), cut, tiers);
    if (set[rule] != null) out.set(rule, { final: set[rule], action: rounded === set[rule] ? 'override (agrees with D)' : 'override', rounded });
    else out.set(rule, { final: rounded, action: 'rounding', rounded });
  }
  return out;
}

// ---------- engine ----------
async function loadEngine() {
  const root = path.resolve(process.cwd());
  const v = path.join(root, 'src/sports/nfl/engine/value.ts');
  const s = path.join(root, 'src/sports/nfl/engine/slots.ts');
  if (!fs.existsSync(v) || !fs.existsSync(s)) fail('run from the colors/ directory (src/sports/nfl/engine/value.ts not found under ' + root + ')');
  const { slotWins20 } = await import(pathToFileURL(v).href);
  const { SLOTS } = await import(pathToFileURL(s).href);
  return { slotWins20, SLOTS };
}

function makeSlope(slotWins20, SLOTS, mode) {
  const byId = new Map(SLOTS.map((s) => [s.id, s]));
  const slope = mode === 'weight' ? (id) => (byId.get(id) ? byId.get(id).weight : 0) : (id) => slotWins20(id) / 20;
  const best = (dest) => { const c = SLOTS.filter((s) => s.dest === dest); if (!c.length) return null; return c.reduce((b, x) => (slope(x.id) > slope(b.id) ? x : b)); };
  return { slope, best };
}

// ---------- output ----------
function emitTs(table, roles, owner) {
  const lines = [
    '// FLEX table, built from D (displacement-aware ovrEq) + the Owner\'s 2026-11-09 custom rules.',
    `// theta ${owner.theta}, X ${owner.x}, Y ${owner.y}, tiers ${owner.tiers.join('/')}, cutoffs ${owner.cutoffs.join('/')}.`,
    '// GENERATED by tools/mathlab/flexrebuild.mjs — do not hand-edit; rebuild instead.',
    'import type { Role } from \'./players.ts\';',
    'import type { Dest } from \'./slots.ts\';',
    '',
    'type Row = Partial<Record<Dest, number>>;',
    'export const FLEX: Readonly<Record<Role, Row>> = {',
  ];
  for (const role of roles) {
    const row = table.get(role) || [];
    lines.push(`  ${role}: { ${row.map(([d, v]) => `${d}: ${v}`).join(', ')} },`);
  }
  lines.push('  LS: {},', '};', '');
  return lines.join('\n');
}

function emitJson(table, roles) {
  const flex = {};
  for (const role of roles) { const row = table.get(role); if (row && row.length) flex[role] = Object.fromEntries(row); }
  return { _source: 'tools/mathlab/flexrebuild.mjs — D (theta 1.0) rounded to 0/2/6/12 with the Owner 2026-11-09 overrides. Generated, not hand-edited.', roles, flex };
}

async function main() {
  if (flag('selftest')) selftest();
  const ownerPath = path.resolve(arg('owner', path.join(HERE, 'flex-owner-2026-11-09.json')));
  const basePath = path.resolve(arg('base', path.join(HERE, 'flex.json')));
  const outDir = path.resolve(arg('out-dir', path.join(HERE, 'results')));
  const name = arg('name', 'flex-D-2026-11-09');
  const theta = arg('theta', null);
  const base = JSON.parse(fs.readFileSync(basePath, 'utf8'));
  const owner = JSON.parse(fs.readFileSync(ownerPath, 'utf8'));
  if (theta != null) owner.theta = +theta;
  if (owner.theta == null) owner.theta = 1;
  if (!Number.isFinite(owner.theta)) fail('--theta must be a number');
  owner.x = +arg('x', String(owner.x == null ? 90 : owner.x));
  owner.y = +arg('y', String(owner.y == null ? 70 : owner.y));
  const cutArg = arg('cutoffs', ''); if (cutArg) owner.cutoffs = cutArg.split(',').map(Number);
  const slopeMode = arg('slope', 'wins');
  if (!['wins', 'weight'].includes(slopeMode)) fail('--slope must be wins or weight');
  const bumps = {};
  const bumpArg = arg('bump', null);
  const bumpSpec = bumpArg === null ? owner.bumps || {} : Object.fromEntries(bumpArg.split(',').filter(Boolean).map((p) => p.split(':').map((x) => (isNaN(+x) ? x : +x))));
  for (const [k, v] of Object.entries(bumpSpec)) bumps[k] = v;

  const errs = validateOwner(owner);
  if (errs.length) fail('owner spec: ' + errs.join('; '));

  const { slotWins20, SLOTS } = await loadEngine();
  const roles = base.roles || Object.keys(base.flex);
  const knownRoles = new Set(roles);
  const dests = new Set([...roles, 'NICKEL', 'DIME', 'DL5']);

  // universe: every rule in the base table + every rule the Owner names
  const universe = new Set(Object.entries(base.flex).flatMap(([a, row]) => Object.keys(row).map((b) => `${a}>${b}`)));
  for (const r of [...Object.keys(owner.set || {}), ...(owner.remove || [])]) universe.add(r);
  for (const r of universe) { const { role, dest } = splitRule(r); if (!knownRoles.has(role)) fail('unknown role in rule ' + r); if (!dests.has(dest)) fail('unknown destination in rule ' + r); }

  const warnings = [];
  for (const r of Object.keys(owner.set || {})) { const { role, dest } = splitRule(r); if (!base.flex[role] || base.flex[role][dest] == null) warnings.push('owner rule ' + r + ' is not in the base table — added at the Owner value'); }
  for (const r of owner.remove || []) { const { role, dest } = splitRule(r); if (!base.flex[role] || base.flex[role][dest] == null) warnings.push('remove ' + r + ' — no such rule in the base table (nothing to remove)' + (owner.removeAbsent && owner.removeAbsent[r] ? '' : '')); }

  // measure twice: without and with the Owner's weight bumps (the invariance check, D-03)
  const measure = (bump) => {
    const saved = SLOTS.map((s) => s.weight);
    if (bump) for (const s of SLOTS) if (bumps[s.id] != null) s.weight = bumps[s.id];
    const { slope, best } = makeSlope(slotWins20, SLOTS, slopeMode);
    const rows = [];
    for (const rule of universe) {
      const { role, dest } = splitRule(rule);
      const A = best(role), B = best(dest);
      if (!A || !B) { warnings.push('no slot for ' + rule); rows.push({ rule, d: 0 }); continue; }
      rows.push({ rule, d: ovrEqD(slope(A.id), slope(B.id), owner.x, owner.y), slopeA: r2(slope(A.id)), slopeB: r2(slope(B.id)), natural: A.id, destSlot: B.id });
    }
    SLOTS.forEach((s, i) => { s.weight = saved[i]; });
    return rows;
  };
  const rowsNoBump = measure(false);
  const rows = measure(true);   // the table is built on the post-bump engine (Owner: apply the bump first)
  const dNoBump = new Map(rowsNoBump.map((r) => [r.rule, r.d]));
  let movedByBump = 0, maxBumpDelta = 0;
  for (const r of rows) { const d = Math.abs(r.d - (dNoBump.get(r.rule) || 0)); if (d > 1e-9) movedByBump++; maxBumpDelta = Math.max(maxBumpDelta, d); }

  // the same rules under the other slope definition (reported, never used to choose the table)
  const otherMode = slopeMode === 'wins' ? 'weight' : 'wins';
  const savedW = SLOTS.map((s) => s.weight);
  for (const s of SLOTS) if (bumps[s.id] != null) s.weight = bumps[s.id];
  const alt = (() => { const { slope, best } = makeSlope(slotWins20, SLOTS, otherMode); return new Map([...universe].map((rule) => { const { role, dest } = splitRule(rule); const A = best(role), B = best(dest); return [rule, A && B ? ovrEqD(slope(A.id), slope(B.id), owner.x, owner.y) : 0]; })); })();
  SLOTS.forEach((s, i) => { s.weight = savedW[i]; });

  const built = buildTable({ rows, owner, universe });
  const byRole = new Map(roles.map((r) => [r, []]));
  for (const [rule, v] of built) { if (v.final == null) continue; const { role, dest } = splitRule(rule); if (!byRole.has(role)) byRole.set(role, []); byRole.get(role).push([dest, v.final, rule]); }
  // order: base order first, then anything new
  for (const [role, arr] of byRole) {
    const order = base.flex[role] ? Object.keys(base.flex[role]) : [];
    arr.sort((a, b) => { const ia = order.indexOf(a[0]), ib = order.indexOf(b[0]); return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib); });
  }
  const table = new Map([...byRole].map(([r, arr]) => [r, arr.map(([d, v]) => [d, v])]));

  // ---- the diff against the base table (what the Owner asked to see: every rule that moves) ----
  const moves = [];
  for (const [rule, v] of built) {
    const { role, dest } = splitRule(rule);
    const was = base.flex[role] ? base.flex[role][dest] : undefined;
    if (v.final == null && was != null) moves.push({ rule, was, now: null, action: v.action, d: v.rounded });
    else if (v.final != null && was == null) moves.push({ rule, was: null, now: v.final, action: v.action, d: v.rounded });
    else if (v.final != null && was != null && v.final !== was) moves.push({ rule, was, now: v.final, action: v.action, d: v.rounded });
  }
  const tierCount = (t) => { const c = {}; for (const v of t.values()) if (v.final != null) c[v.final] = (c[v.final] || 0) + 1; return c; };
  const before = {}; for (const row of Object.values(base.flex)) for (const v of Object.values(row)) before[v] = (before[v] || 0) + 1;
  const after = tierCount(built);
  const altDiff = [...universe].filter((r) => tierFor(penalty(owner.theta, alt.get(r))) !== tierFor(penalty(owner.theta, rows.find((x) => x.rule === r).d))).sort();

  const result = {
    generated: new Date().toISOString(), engine: 'colors @ ' + (process.env.FLEX_ENGINE_COMMIT || 'working tree'), slope: slopeMode, theta: owner.theta,
    x: owner.x, y: owner.y, cutoffs: owner.cutoffs, tiers: owner.tiers, bumps,
    base: display(basePath), owner: display(ownerPath),
    counts: { rules: [...universe].length, kept: [...built.values()].filter((v) => v.final != null).length, removed: [...built.values()].filter((v) => v.final == null).length, moves: moves.length },
    tierCountsBefore: before, tierCountsAfter: after,
    weightBump: { rulesMovedBy: movedByBump, maxDeltaD: r2(maxBumpDelta) },
    slopeDefinitionDisagreements: altDiff,
    warnings,
    rows: [...built].map(([rule, v]) => { const r = rows.find((x) => x.rule === rule) || {}; return { rule, base: (base.flex[splitRule(rule).role] || {})[splitRule(rule).dest] ?? null, d: r2(r.d || 0), rounded: v.rounded == null ? null : v.rounded, action: v.action, final: v.final, dOtherSlope: r2(alt.get(rule) || 0), natural: r.natural || null, destSlot: r.destSlot || null, slopeA: r.slopeA, slopeB: r.slopeB }; }),
    flex: emitJson(table, roles).flex,
  };

  fs.mkdirSync(outDir, { recursive: true });
  const jsonPath = path.join(outDir, name + '.json');
  fs.writeFileSync(jsonPath, JSON.stringify(result, null, 1) + '\n');

  const md = [];
  md.push(`# Flex rebuild from D — ${name}`, '', `Generated ${result.generated} on the Colors engine (slope = ${slopeMode}${slopeMode === 'wins' ? ', slotWins20/20' : ', slot weight'}).`,
    `theta ${owner.theta}, X ${owner.x}, Y ${owner.y}, tiers ${owner.tiers.join('/')}, cutoffs ${owner.cutoffs.join('/')}. Bumps ${JSON.stringify(bumps)}.`,
    `Base table: ${result.base}. Owner rules: ${result.owner}.`, '',
    `Rules ${result.counts.rules}: kept ${result.counts.kept}, removed ${result.counts.removed}, **${result.counts.moves} rules move** vs the base table.`,
    `Tier counts before ${JSON.stringify(before)} -> after ${JSON.stringify(after)}.`,
    `Weight bumps move ${movedByBump} rule(s) in D (max |delta D| ${r2(maxBumpDelta)}).`,
    altDiff.length ? `The other slope definition (${otherMode}) rounds ${altDiff.length} rule(s) differently: ${altDiff.join(', ')}.` : `The other slope definition (${otherMode}) rounds every rule the same.`,
    warnings.length ? `Warnings: ${warnings.join(' | ')}` : 'Warnings: none.', '');
  md.push('## Every rule that moves', '', '| rule | was | now | D | source |', '|---|---|---|---|---|');
  for (const m of moves.sort((a, b) => a.rule.localeCompare(b.rule))) md.push(`| ${m.rule} | ${m.was == null ? '(absent)' : m.was} | ${m.now == null ? 'REMOVED' : m.now} | ${m.d == null ? '' : m.d} | ${m.action} |`);
  md.push('', '## Full table (final)', '', '| rule | was | D | rounded | owner | final |', '|---|---|---|---|---|---|');
  for (const r of result.rows) md.push(`| ${r.rule} | ${r.base == null ? '(absent)' : r.base} | ${r.d} | ${r.rounded == null ? '—' : r.rounded} | ${r.action} | ${r.final == null ? 'REMOVED' : r.final} |`);
  md.push('', '## Notes', '', '- D is floored at 0 and clamped to 30 after theta; the tier cutoffs are the midpoints of 0/2/6/12.', '- Rules the Owner does not name keep the rounded D. The Owner\'s named rules supersede the rounding.', '- `action` = rounding | override | override (agrees with D) | removed.', '- A negative D is the formula saying the destination is the heavier spot; the floor at 0 is what makes 30 rules free.', '');
  fs.writeFileSync(path.join(outDir, name + '.md'), md.join('\n'));

  const ts = emitTs(table, roles, owner);
  fs.writeFileSync(path.join(outDir, name + '.ts'), ts);
  const genJson = JSON.stringify(emitJson(table, roles), null, 1) + '\n';
  fs.writeFileSync(path.join(outDir, name + '.flex.json'), genJson);

  console.log(`rules ${result.counts.rules} kept ${result.counts.kept} removed ${result.counts.removed} moves ${result.counts.moves}`);
  console.log(`tiers before ${JSON.stringify(before)} after ${JSON.stringify(after)}`);
  console.log(`weight bumps moved ${movedByBump} rule(s) (max |dD| ${r2(maxBumpDelta)})`);
  console.log(`slope-definition disagreements (${otherMode}): ${altDiff.length ? altDiff.join(',') : 'none'}`);
  if (warnings.length) warnings.forEach((w) => console.log('WARN ' + w));
  console.log(`OUT ${path.relative(process.cwd(), jsonPath)} (+ .md, .ts, .flex.json)`);

  const writeDir = arg('write', '');
  if (writeDir) {
    const d = path.resolve(writeDir);
    fs.mkdirSync(d, { recursive: true });
    fs.writeFileSync(path.join(d, 'flex.json'), genJson);
    fs.writeFileSync(path.join(d, 'flex.ts'), ts);
    console.log('WROTE ' + path.join(d, 'flex.json') + ' and flex.ts');
  }

  const checkPath = arg('check', '');
  if (checkPath) {
    const cand = JSON.parse(fs.readFileSync(path.resolve(checkPath), 'utf8'));
    const flatC = new Map(Object.entries(cand.flex || {}).flatMap(([a, row]) => Object.entries(row).map(([b, v]) => [`${a}>${b}`, v])));
    const flatG = new Map(result.rows.filter((r) => r.final != null).map((r) => [r.rule, r.final]));
    const diffs = [];
    for (const [rule, v] of flatG) { if (!flatC.has(rule)) diffs.push(`${rule}: rebuild ${v}, candidate ABSENT`); else if (flatC.get(rule) !== v) diffs.push(`${rule}: rebuild ${v}, candidate ${flatC.get(rule)}`); }
    for (const [rule, v] of flatC) if (!flatG.has(rule)) diffs.push(`${rule}: rebuild REMOVED, candidate ${v}`);
    console.log(`CHECK ${checkPath}: ${diffs.length ? 'DIFF ' + diffs.length : 'IDENTICAL'} (rebuild ${flatG.size} rules, candidate ${flatC.size})`);
    diffs.slice(0, 60).forEach((d) => console.log('  ' + d));
    if (diffs.length) process.exit(1);
  }
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);if (invokedDirectly) await main();
