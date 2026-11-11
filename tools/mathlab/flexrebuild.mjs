#!/usr/bin/env node
// tools/mathlab/flexrebuild.mjs — rebuild the flex table from D + the Owner's overrides, deterministically.
//
// WHY THIS EXISTS (P-317): the 2026-11-09 rebuild was done by hand and the Architect's attempt timed out; a script
// makes the rebuild reproducible, diffable and re-runnable whenever the Owner changes a rule. Nothing here edits the
// product, the engine or the shared flex.json: it writes to --out=<dir> and the Architect integrates.
//
// INPUTS
//   --table=<path>  base table, flex.json shape: { roles:[...], flex:{role:{dest:penalty}} }.
//                   Default tools/mathlab/flex-2026-11-08.json (the engine's 8 Nov table, 104 rules).
//   --d=<path>      D values: the thetaprice markdown table (column "D@90") or a JSON file:
//                   { "RULE": number } | { rules: { "RULE": number|{d90} } } | { rows:[{rule,d90}] }.
//                   Default tools/mathlab/results/thetaprice-2026-11-09.md.
//   --spec=<path>   Owner decisions: tiers, cutoffs, remove[], groups[{penalty,why,rules[]}].
//                   Default tools/mathlab/flex-spec-owner-2026-11-09.json.
//   --theta=<n>     multiplier on D before rounding (default: spec.theta, 1.0).
//   --out=<dir>     write flex.json, flex.ts, report.md there. Creates the directory.
//   --json          print the rebuilt table JSON to stdout (no files).
//   --selftest      run the unit + golden fixtures; exit 1 on any failure.
//   --quiet         suppress the human summary.
//
// PRECEDENCE  remove > owner set > rounding. A rule with no D and no explicit decision is an ERROR (a stale D file
// must fail loudly, not silently keep the base value); --allow-missing keeps the base value and labels it STALE.
//
// OUTPUT (deterministic: same inputs -> byte-identical files; no timestamps, no environment paths)
//   flex.json  the table + _banned (rules the Owner removed) + input hashes.
//   flex.ts    typed copy in the engine's shape, plus FLEX_BANNED. The engine's fit() must consult FLEX_BANNED
//              BEFORE the emergency fallback if "removed" means "not allowed": today an unlisted rule is legal at
//              EMERGENCY_PENALTY 8, so removing a -12 rule makes the move CHEAPER (8), not illegal. See report.
//   report.md  every rule that moves, the zeros, the removals and their emergency-fallback consequence.
//
// Run: node tools/mathlab/flexrebuild.mjs --out=_agents/ds/deliveries/flex-rebuild-2026-11-09
//      node tools/mathlab/flexrebuild.mjs --selftest
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const DEFAULTS = {
  table: path.join(HERE, 'flex-2026-11-08.json'),
  d: path.join(HERE, 'results', 'thetaprice-2026-11-09.md'),
  spec: path.join(HERE, 'flex-spec-owner-2026-11-09.json'),
};
const UNITS = {
  QB: 'off', RB: 'off', FB: 'off', WR: 'off', TE: 'off', OT: 'off', OG: 'off', C: 'off',
  DT: 'def', EDGE: 'def', ILB: 'def', OLB: 'def', SS: 'def', FS: 'def', CB: 'def',
  NICKEL: 'def', DIME: 'def', DL5: 'def', SAM: 'def', K: 'spc', P: 'spc', LS: 'spc',
};
const DEST_EXTRA = ['NICKEL', 'DIME', 'DL5', 'SAM'];

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const flag = (k) => process.argv.includes(`--${k}`);
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const die = (msg) => { console.error(`FLEXREBUILD FAIL: ${msg}`); process.exit(1); };

// ---------- inputs ----------

export function parseD(file) {
  const raw = fs.readFileSync(file, 'utf8');
  if (file.endsWith('.json')) {
    const j = JSON.parse(raw);
    const out = {};
    if (Array.isArray(j.rows)) { for (const r of j.rows) out[r.rule] = +(r.d90 ?? r.D90 ?? r.d); return out; }
    const src = j.rules ?? j;
    for (const [k, v] of Object.entries(src)) out[k] = typeof v === 'number' ? v : +(v.d90 ?? v.D90 ?? v.d);
    return out;
  }
  // markdown: find the D@90 column by header name, never by a fixed index
  const lines = raw.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('|'));
  if (!lines.length) die(`no markdown table rows in ${file}`);
  const cells = (l) => l.replace(/^\|/, '').replace(/\|$/, '').split('|').map((s) => s.trim());
  const header = cells(lines[0]);
  const iRule = header.findIndex((h) => /^rule$/i.test(h));
  const iD = header.findIndex((h) => /^D\s*@?\s*90$/i.test(h.replace(/\s+/g, ' ')));
  if (iD < 0) die(`no "D@90" column in ${file}; header: ${header.join(' | ')}`);
  const out = {};
  for (const l of lines.slice(1)) {
    const c = cells(l);
    if (/^-+$/.test(c[iRule] ?? '')) continue;
    const rule = c[iRule], d = Number(c[iD]);
    if (!rule || !Number.isFinite(d)) continue;
    out[rule] = d;
  }
  if (!Object.keys(out).length) die(`parsed 0 D values from ${file}`);
  return out;
}

export function parseSpec(file) {
  const s = JSON.parse(fs.readFileSync(file, 'utf8'));
  const tiers = (s.tiers ?? [0, 2, 6, 12]).slice().sort((a, b) => a - b);
  const cutoffs = (s.cutoffs ?? [1, 4, 9]).slice().sort((a, b) => a - b);
  if (cutoffs.length !== tiers.length - 1) die(`spec: ${tiers.length} tiers need ${tiers.length - 1} cutoffs, got ${cutoffs.length}`);
  const set = new Map();
  for (const g of s.groups ?? []) {
    if (!tiers.includes(g.penalty)) die(`spec: group penalty ${g.penalty} is not a tier`);
    for (const r of g.rules ?? []) {
      if (set.has(r)) die(`spec: rule ${r} appears in two groups`);
      set.set(r, g.penalty);
    }
  }
  const remove = new Set(s.remove ?? []);
  for (const r of remove) if (set.has(r)) die(`spec: rule ${r} is both removed and set`);
  return { spec: s, tiers, cutoffs, set, remove, theta: s.theta ?? 1, date: s.date ?? 'undated', mode: s.mode ?? 'round' };
}

export function parseTable(file) {
  const j = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!Array.isArray(j.roles) || typeof j.flex !== 'object') die(`${file} is not a flex table (roles[] + flex{})`);
  return { roles: j.roles.slice(), flex: j.flex };
}

// ---------- the rebuild ----------

export function tierFor(d, tiers, cutoffs) {
  for (let i = 0; i < cutoffs.length; i++) if (d < cutoffs[i]) return tiers[i];
  return tiers[tiers.length - 1];
}

export function rebuild({ roles, flex }, D, S, opts = {}) {
  const { tiers, cutoffs, set, remove, theta } = S;
  const mode = opts.mode ?? S.mode ?? 'round';
  const destOrder = [...roles, ...DEST_EXTRA];
  const rank = (d) => { const i = destOrder.indexOf(d); return i < 0 ? destOrder.length : i; };
  const out = {}, rows = [], errors = [], moves = [];
  let banned = {};
  let zeros = 0, rounded = 0, overrides = 0, kept = 0;
  for (const role of roles) {
    const row = flex[role];
    if (!row) { errors.push(`role ${role} has no row in the base table`); continue; }
    out[role] = {};
    for (const dest of Object.keys(row).sort((a, b) => rank(a) - rank(b) || a.localeCompare(b))) {
      const rule = `${role}>${dest}`;
      const cur = row[dest];
      if (remove.has(rule)) {
        (banned[role] ??= []).push(dest);
        rows.push({ rule, cur, d: D[rule] ?? null, tier: null, final: null, how: 'REMOVE' });
        continue;
      }
      const d = D[rule];
      const tier = d === undefined ? null : tierFor(d * theta, tiers, cutoffs);
      let final, how;
      if (set.has(rule)) { final = set.get(rule); how = tier === final ? 'override(=round)' : 'override'; overrides++; }
      else if (mode === 'apply') { final = cur; how = 'keep'; kept++; }
      else if (tier === null) {
        if (!opts.allowMissing) { errors.push(`${rule}: no D and no Owner decision (stale D file?)`); continue; }
        final = cur; how = 'STALE-BASE'; kept++;
      } else { final = tier; how = tier === cur ? 'round-same' : 'round'; rounded++; }
      out[role][dest] = final;
      if (final === 0) zeros++;
      rows.push({ rule, cur, d: d ?? null, tier, final, how });
      if (final !== cur) moves.push({ rule, cur, final, d: d ?? null, tier, how });
    }
  }
  // rules the spec adds that the base table does not have (e.g. a new destination)
  for (const [rule, pen] of set) {
    const [a, b] = rule.split('>');
    if (remove.has(rule) || (out[a] && b in flex[a] && b in out[a])) continue;
    if (!roles.includes(a)) { errors.push(`${rule}: set/add names role ${a}, which is not in roles[]`); continue; }
    if (!destOrder.includes(b)) { errors.push(`${rule}: set/add names destination ${b}, which is not a known destination`); continue; }
    (out[a] ??= {})[b] = pen;
    rows.push({ rule, cur: null, d: D[rule] ?? null, tier: null, final: pen, how: 'add' });
    if (pen === 0) zeros++;
    overrides++;
  }
  // canonical order inside every row
  for (const r of Object.keys(out)) {
    const row = out[r];
    out[r] = Object.fromEntries(Object.keys(row).sort((x, y) => rank(x) - rank(y) || x.localeCompare(y)).map((k) => [k, row[k]]));
  }
  if (!Object.keys(banned).length) banned = {};
  return { flex: out, banned, rows, errors, moves, zeros, rounded, overrides, kept };
}

// ---------- emitters ----------

function tableJSON(res, S, hashes) {
  const src = `GENERATED by tools/mathlab/flexrebuild.mjs on inputs: base=${hashes.table}, d=${hashes.d}, spec=${hashes.spec}, theta=${S.theta}. `
    + `Tiers ${S.tiers.join('/')}, cutoffs ${S.cutoffs.join('/')}. ${S.spec.date}. Deterministic: same inputs -> same bytes. `
    + `_banned lists the rules the Owner removed: they are NOT in flex, and an engine that treats an unlisted rule as EMERGENCY_PENALTY 8 `
    + `must check _banned first if the removal is meant to forbid the placement (see report.md).`;
  return {
    _source: src,
    roles: S.roles,
    flex: res.flex,
    _banned: Object.fromEntries(Object.entries(res.banned).sort(([a], [b]) => S.roles.indexOf(a) - S.roles.indexOf(b))),
    _bannedRules: Object.entries(res.banned).flatMap(([a, ds]) => ds.map((d) => `${a}>${d}`)),
  };
}

function tableTS(res, S, hashes) {
  const q = (s) => `'${s}'`;
  const rows = S.roles.map((r) => {
    const entries = Object.entries(res.flex[r] ?? {});
    const body = entries.length ? `{ ${entries.map(([d, p]) => `${d}: ${p}`).join(', ')} }` : '{}';
    return `  ${r}: ${body},`;
  });
  const banned = Object.entries(res.banned).map(([r, ds]) => `  ${r}: [${ds.map(q).join(', ')}],`);
  return `// GENERATED by tools/mathlab/flexrebuild.mjs — do not edit by hand.
// Inputs: base=${hashes.table} d=${hashes.d} spec=${hashes.spec} theta=${S.theta}.
// Owner decisions ${S.spec.date}: tiers ${S.tiers.join('/')}, cutoffs ${S.cutoffs.join('/')}.
// The Owner's list SUPERSEDES theta; a rule outside the groups is the rounding rule applied to D.
// Removed rules are in FLEX_BANNED: they are absent from FLEX and fit() returns legal:false for them, so REMOVAL
// means "not allowed", not "priced at the emergency fallback". Set BANNED_ARE_ILLEGAL=false to restore the old
// fallback behaviour (an unlisted rule is legal at -8) while keeping the rules deleted.
import type { Role } from './players.ts';
import type { Dest } from './slots.ts';

type Row = Partial<Record<Dest, number>>;
export const FLEX: Readonly<Record<Role, Row>> = {
${rows.join('\n')}
  // LS has no spot (12 long snappers in the data). Anyone not in the table still takes the emergency fallback.
  LS: {},
};

// Owner ${S.spec.date}: delete these rules, do not set them to 0. fit() below reads this before the fallback.
export const FLEX_BANNED: Readonly<Record<string, readonly Dest[]>> = {
${banned.join('\n')}
};
export const BANNED_ARE_ILLEGAL = true;

// Owner (21 Oct): "If you reach your last open spot and nobody left can legally play it, you may take any remaining
// player (except a quarterback) there at -8."
export const EMERGENCY_PENALTY = 8;

// How a role fits a destination: 0 at home, the guide's number if listed, otherwise the emergency fallback
// (\`emergency: true\`); a quarterback has no fallback (\`legal: false\`).
export interface Fit { penalty: number; emergency: boolean; legal: boolean }

// DL5 is the rotational fifth lineman (Owner 27 Oct): natural for DT and EDGE; everyone else pays the cheaper of the
// guide's role->DT and role->EDGE price (spec 12.2).
function dl5Penalty(role: Role): number | undefined {
  if (role === 'DT' || role === 'EDGE') return 0;
  const a = FLEX[role].DT, b = FLEX[role].EDGE;
  if (a === undefined) return b;
  if (b === undefined) return a;
  return Math.min(a, b);
}

export function fit(role: Role, dest: Dest): Fit {
  if (role === dest) return { penalty: 0, emergency: false, legal: true };
  if (BANNED_ARE_ILLEGAL && (FLEX_BANNED[role] ?? []).includes(dest)) return { penalty: EMERGENCY_PENALTY, emergency: true, legal: false };
  const listed = dest === 'DL5' ? dl5Penalty(role) : FLEX[role][dest];
  if (listed !== undefined) return { penalty: listed, emergency: false, legal: true };
  // A quarterback never takes the emergency fallback.
  if (role === 'QB') return { penalty: EMERGENCY_PENALTY, emergency: true, legal: false };
  return { penalty: EMERGENCY_PENALTY, emergency: true, legal: true };
}

// The effective rating of a player at a spot.
export function effectiveOvr(ovr: number, role: Role, dest: Dest): number {
  return ovr - fit(role, dest).penalty;
}
`;
}

function reportMD(res, S, hashes, files) {
  const L = [];
  const p2 = (x) => (x === null || x === undefined ? '—' : (Math.round(x * 100) / 100).toFixed(2));
  L.push(`# Flex rebuild — Owner decisions ${S.spec.date} (D at theta=${S.theta}, tiers ${S.tiers.join('/')})`, '');
  L.push('Generated by `tools/mathlab/flexrebuild.mjs`. VERIFIED by running it; not a build and not integrated.', '');
  L.push('## Inputs', '', '| input | sha256 |', '|---|---|');
  L.push(`| base table \`${path.basename(files.table)}\` | \`${hashes.table}\` |`);
  L.push(`| D values \`${path.basename(files.d)}\` | \`${hashes.d}\` |`);
  L.push(`| Owner spec \`${path.basename(files.spec)}\` | \`${hashes.spec}\` |`, '');
  L.push('## Result', '');
  const n = res.rows.filter((r) => r.final !== null).length;
  const byRound = res.rows.filter((r) => r.final !== null && !r.how.startsWith('override'));
  const roundMoved = byRound.filter((r) => r.final !== r.cur).length;
  const ovrMoved = res.moves.filter((m) => m.how.startsWith('override')).length;
  L.push(`- rules in the rebuilt table: **${n}** (${res.banned ? Object.values(res.banned).flat().length : 0} removed from the ${res.rows.length} base rules)`);
  L.push(`- rules that move from the 8 Nov table: **${res.moves.length}**`);
  L.push(`- Owner overrides: **${res.overrides}** (${ovrMoved} change the tier); rules decided by rounding: **${byRound.length}**, of which ${roundMoved} move`);
  L.push(`- rules at tier 0 (free): **${res.zeros}**`);
  L.push(`- removed rules: **${Object.values(res.banned).flat().length}**`, '');
  if (res.errors.length) { L.push('## ERRORS', ''); for (const e of res.errors) L.push(`- ${e}`); L.push(''); }
  L.push('## Every rule that moves', '', '| rule | 8 Nov | final | D@90 | theta*D | rounded tier | how |', '|---|---|---|---|---|---|---|');
  for (const m of res.moves.sort((a, b) => (a.rule < b.rule ? -1 : 1))) {
    L.push(`| ${m.rule} | ${m.cur === null ? 'new' : m.cur} | **${m.final}** | ${p2(m.d)} | ${p2(m.d === null ? null : m.d * S.theta)} | ${m.tier ?? '—'} | ${m.how} |`);
  }
  L.push('');
  L.push('## Removed rules and the emergency fallback', '');
  L.push('The Owner said delete the rule, not set it to 0. The engine\'s `fit()` gives every unlisted non-QB rule `EMERGENCY_PENALTY = 8` with `legal: true`, so a removed rule is not illegal — it is **cheaper than the -12 it replaces**. Receipt: with FB>EDGE deleted, `fit("FB","EDGE")` -> `{penalty:8, emergency:true, legal:true}` (ds, 2026-11-09, engine `3ed03627`).', '');
  for (const [r, ds] of Object.entries(res.banned)) L.push(`- ${r}>${ds.join(`, ${r}>`)}`);
  L.push('', 'If "removed" means "the draft engine must reject the placement" (P-312 test (d)), `fit()` needs a banned check before the fallback; `FLEX_BANNED` is emitted for that.', '');
  const zeros = res.rows.filter((r) => r.final === 0);
  L.push('## Tier-0 rules (free), with the cross-unit flags', '', '`cross` = source and destination are different units (offence / defence / specialists). A cross-unit 0 is a football-impossible move the engine prices at nothing; the Owner left these at 0 and this report only flags them.', '');
  L.push('| rule | cross | D@90 |', '|---|---|---|');
  for (const z of zeros) {
    const [a, b] = z.rule.split('>');
    const cross = UNITS[a] !== UNITS[b] ? '**yes**' : '';
    L.push(`| ${z.rule} | ${cross} | ${p2(z.d)} |`);
  }
  L.push('');
  L.push('## Checks run by the generator', '');
  L.push(`- QB flexes only to FS: ${JSON.stringify(res.flex.QB)} ${Object.keys(res.flex.QB).length === 1 && res.flex.QB.FS === 12 ? 'PASS' : 'FAIL'}`);
  L.push(`- every role has a row: ${S.roles.every((r) => res.flex[r]) ? 'PASS' : 'FAIL'}`);
  L.push(`- every penalty is a tier: ${res.rows.every((r) => r.final === null || S.tiers.includes(r.final)) ? 'PASS' : 'FAIL'}`);
  L.push(`- no D / no decision: ${res.errors.length ? `FAIL (${res.errors.length})` : 'PASS'}`);
  L.push('');
  return L.join('\n');
}

// ---------- run ----------

function loadDefaults() {
  const table = arg('table', DEFAULTS.table);
  const d = arg('d', DEFAULTS.d);
  const spec = arg('spec', DEFAULTS.spec);
  const base = parseTable(table);
  const D = parseD(d);
  const S = parseSpec(spec);
  if (arg('theta')) S.theta = +arg('theta');
  if (arg('tiers')) S.tiers = arg('tiers').split(',').map(Number);
  if (arg('cutoffs')) S.cutoffs = arg('cutoffs').split(',').map(Number);
  S.roles = base.roles;
  return { base, D, S, table, d, spec };
}

function main() {
  if (flag('selftest')) return selftest();
  const { base, D, S, table, d, spec } = loadDefaults();
  const res = rebuild(base, D, S, { allowMissing: flag('allow-missing') });
  if (res.errors.length && !flag('allow-missing')) die(`${res.errors.length} rule(s) with no D and no decision:\n  ${res.errors.join('\n  ')}`);
  const hashes = { table: sha(table), d: sha(d), spec: sha(spec) };
  const json = tableJSON(res, S, hashes);
  const ts = tableTS(res, S, hashes);
  const report = reportMD(res, S, hashes, { table, d, spec });
  const out = arg('out', '');
  if (flag('json')) { console.log(JSON.stringify(json, null, 1)); return; }
  if (!out) die('no --out=<dir> and no --json: nothing written');
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'flex.json'), JSON.stringify(json, null, 1) + '\n');
  fs.writeFileSync(path.join(out, 'flex.ts'), ts);
  fs.writeFileSync(path.join(out, 'report.md'), report);
  if (!flag('quiet')) {
    console.log(`flexrebuild: ${Object.values(res.flex).reduce((a, r) => a + Object.keys(r).length, 0)} rules, `
      + `${res.moves.length} moved, ${res.overrides} overrides, ${res.zeros} zeros, ${Object.values(res.banned).flat().length} removed`);
    console.log(`wrote ${path.join(out, 'flex.json')}, flex.ts, report.md`);
  }
}

// ---------- selftest ----------

function selftest() {
  let n = 0, bad = 0;
  const ok = (cond, msg) => { n++; if (!cond) { bad++; console.log(`FAIL ${msg}`); } else console.log(`PASS ${msg}`); };
  // 1. tier boundaries (cutoffs 1/4/9)
  const tiers = [0, 2, 6, 12], cut = [1, 4, 9];
  const cases = [[0, 0], [0.99, 0], [1, 2], [3.99, 2], [4, 6], [8.99, 6], [9, 12], [19.27, 12]];
  ok(cases.every(([d, t]) => tierFor(d, tiers, cut) === t), `tier boundaries ${JSON.stringify(cases)}`);
  // 2. precedence: remove beats set; set beats rounding; rounding applies otherwise
  const base = { roles: ['A', 'B'], flex: { A: { B: 12, C: 0 }, B: { A: 0 } } };
  const D = { 'A>B': 0.5, 'A>C': 5, 'B>A': 0 };
  const spec = { spec: {}, tiers, cutoffs: cut, theta: 1, date: 'test', set: new Map([['B>A', 6]]), remove: new Set(['A>B']) };
  const r1 = rebuild(base, D, spec);
  ok(!('B' in r1.flex.A) && r1.banned.A?.[0] === 'B', 'remove deletes the rule and records it');
  ok(r1.flex.B.A === 6, 'owner set beats rounding (0 -> 6)');
  ok(r1.flex.A.C === 6, 'rounding applies to unlisted rules (5 -> 6)');
  // 3. missing D is an error, not a silent base value
  const r2 = rebuild({ roles: ['A'], flex: { A: { Z: 4 } } }, {}, spec);
  ok(r2.errors.some((e) => /A>Z/.test(e)), 'missing D fails loudly');
  const r3 = rebuild({ roles: ['A'], flex: { A: { Z: 4 } } }, {}, spec, { allowMissing: true });
  ok(r3.flex.A.Z === 4, '--allow-missing keeps the base value (labelled STALE-BASE)');
  // 4. theta multiplies D before rounding
  const st = { ...spec, theta: 0.5 };
  ok(rebuild({ roles: ['A'], flex: { A: { C: 0 } } }, { 'A>C': 10 }, st).flex.A.C === 6, 'theta 0.5: D 10 -> 5 -> 6');
  // 5. golden integration on the real inputs
  const { base: gb, D: gd, S } = loadDefaults();
  const g = rebuild(gb, gd, S);
  const flat = (res) => Object.entries(res.flex).flatMap(([a, row]) => Object.entries(row).map(([b, p]) => [`${a}>${b}`, p]));
  const tableOf = new Map(flat(g));
  ok(g.errors.length === 0, 'golden: no missing D');
  ok(tableOf.size === 97, `golden: 97 rules after 7 removals (got ${tableOf.size})`);
  ok(g.zeros === 30, `golden: 30 rules at 0 (got ${g.zeros})`);
  ok(Object.values(g.banned).flat().length === 7, `golden: 7 removed rules (got ${Object.values(g.banned).flat().length})`);
  const expect = { 'QB>FS': 12, 'C>OG': 6, 'OLB>ILB': 6, 'OLB>SS': 6, 'DT>EDGE': 6, 'EDGE>TE': 6, 'TE>OT': 12, 'RB>WR': 12, 'TE>EDGE': 12, 'TE>ILB': 12, 'SS>RB': 12, 'K>P': 2, 'WR>TE': 6, 'DT>OG': 2 };
  for (const [k, v] of Object.entries(expect)) ok(tableOf.get(k) === v, `golden: ${k} = ${v} (got ${tableOf.get(k)})`);
  for (const k of ['FB>EDGE', 'FB>DT', 'FB>ILB', 'FB>OLB', 'CB>RB', 'DT>TE', 'EDGE>FS']) ok(!tableOf.has(k), `golden: ${k} removed`);
  ok(![...tableOf.keys()].some((k) => k.startsWith('QB>') && k !== 'QB>FS'), 'golden: QB flexes only to FS');
  // 6. determinism: rebuild twice -> identical JSON bytes
  const a = JSON.stringify(tableJSON(g, S, { table: 't', d: 'd', spec: 's' }));
  const b = JSON.stringify(tableJSON(rebuild(gb, gd, S), S, { table: 't', d: 'd', spec: 's' }));
  ok(a === b, 'deterministic: two rebuilds are byte-identical');
  // 7. emitters produce parseable text with the banned export
  const ts = tableTS(g, S, { table: 't', d: 'd', spec: 's' });
  ok(ts.includes('FLEX_BANNED') && ts.includes('QB: { FS: 12 }') && ts.includes('LS: {}'), 'flex.ts contains FLEX_BANNED, QB row and LS row');
  const md = reportMD(g, S, { table: 't', d: 'd', spec: 's' }, { table: 't', d: 'd', spec: 's' });
  ok(md.includes('Every rule that moves') && md.includes('emergency fallback'), 'report has the move table and the removal note');
  console.log(`\nFLEXREBUILD SELFTEST ${bad ? `FAIL ${bad}/${n}` : `PASS ${n}/${n}`}`);
  process.exit(bad ? 1 : 0);
}

if (process.argv[1] && import.meta.url === new URL(`file://${path.resolve(process.argv[1])}`).href) main();
