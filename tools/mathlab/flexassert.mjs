#!/usr/bin/env node
// tools/mathlab/flexassert.mjs — independent validator for a flex table against the Owner decision spec.
//
// This is deliberately a SECOND implementation: it does not import flexrebuild.mjs, so a bug in the generator
// cannot hide itself in the checker. It answers one question: "does this table say exactly what the Owner decided,
// and nothing else?"
//
// CHECKS
//   1 structure   roles[] non-empty; every role has a row; row keys == roles; no unknown destination
//   2 tiers       every penalty is one of spec.tiers
//   3 QB          QB flexes only to FS, at exactly the spec's QB>FS value
//   4 removed     every rule in spec.remove is ABSENT (removed means deleted, not set to 0)
//   5 overrides   every rule in a spec group carries exactly that group's penalty
//   6 rounding    every other rule equals tier(D * theta) (needs --d; skipped with a warning without it)
//   7 integrity   with --base: every base rule is either in the table or in spec.remove (nothing silently dropped)
//   8 banned      if the table carries _banned, it matches spec.remove and none of its rules is still in flex
//
// USAGE
//   node tools/mathlab/flexassert.mjs --table=<flex.json> [--spec=...] [--d=...] [--base=...]
//   node tools/mathlab/flexassert.mjs --selftest
//
// Exit 0 = FLEXASSERT OK; 1 = violations (all printed); 2 = usage.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DEFAULTS = {
  spec: path.join(HERE, 'flex-spec-owner-2026-11-09.json'),
  d: path.join(HERE, 'results', 'thetaprice-2026-11-09.md'),
  base: path.join(HERE, 'flex-2026-11-08.json'),
};
const UNITS = {
  QB: 'off', RB: 'off', FB: 'off', WR: 'off', TE: 'off', OT: 'off', OG: 'off', C: 'off',
  DT: 'def', EDGE: 'def', ILB: 'def', OLB: 'def', SS: 'def', FS: 'def', CB: 'def', NICKEL: 'def', DIME: 'def', DL5: 'def', SAM: 'def', K: 'spc', P: 'spc', LS: 'spc',
};
const DEST_EXTRA = ['NICKEL', 'DIME', 'DL5', 'SAM', 'LS'];
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const flag = (k) => process.argv.includes(`--${k}`);

function readSpec(file) {
  const s = JSON.parse(fs.readFileSync(file, 'utf8'));
  const tiers = (s.tiers ?? [0, 2, 6, 12]).slice().sort((a, b) => a - b);
  const cutoffs = (s.cutoffs ?? [1, 4, 9]).slice().sort((a, b) => a - b);
  const set = new Map();
  for (const g of s.groups ?? []) for (const r of g.rules ?? []) set.set(r, g.penalty);
  return { tiers, cutoffs, set, remove: new Set(s.remove ?? []), theta: s.theta ?? 1, raw: s };
}

function readD(file) {
  const raw = fs.readFileSync(file, 'utf8');
  if (file.endsWith('.json')) {
    const j = JSON.parse(raw);
    const out = {};
    if (Array.isArray(j.rows)) { for (const r of j.rows) out[r.rule] = +(r.d90 ?? r.D90 ?? r.d); return out; }
    const src = j.rules ?? j;
    for (const [k, v] of Object.entries(src)) out[k] = typeof v === 'number' ? v : +(v.d90 ?? v.D90 ?? v.d);
    return out;
  }
  const lines = raw.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('|'));
  const cells = (l) => l.replace(/^\|/, '').replace(/\|$/, '').split('|').map((s) => s.trim());
  const header = cells(lines[0]);
  const iRule = header.findIndex((h) => /^rule$/i.test(h));
  const iD = header.findIndex((h) => /^D\s*@?\s*90$/i.test(h));
  if (iD < 0) throw new Error(`no D@90 column in ${file}`);
  const out = {};
  for (const l of lines.slice(1)) {
    const c = cells(l);
    if (/^-+$/.test(c[iRule] ?? '')) continue;
    const d = Number(c[iD]);
    if (c[iRule] && Number.isFinite(d)) out[c[iRule]] = d;
  }
  return out;
}

function tierFor(d, tiers, cutoffs) {
  for (let i = 0; i < cutoffs.length; i++) if (d < cutoffs[i]) return tiers[i];
  return tiers[tiers.length - 1];
}

export function assertTable(table, spec, D, base) {
  const { roles, flex } = table;
  const banned = table._banned ?? table.banned;
  const v = [], warn = [];
  const dests = new Set([...roles, ...DEST_EXTRA]);
  if (!Array.isArray(roles) || !roles.length) v.push('structure: roles[] is empty');
  // 1 structure
  for (const r of roles) if (!flex[r] || typeof flex[r] !== 'object') v.push(`structure: role ${r} has no row`);
  for (const r of Object.keys(flex)) if (!roles.includes(r)) v.push(`structure: row ${r} is not in roles[]`);
  for (const [r, row] of Object.entries(flex)) {
    for (const [d, p] of Object.entries(row)) {
      if (!dests.has(d)) v.push(`structure: ${r}>${d} unknown destination`);
      if (!Number.isInteger(p)) v.push(`structure: ${r}>${d} penalty ${p} is not an integer`);
    }
  }
  // 2 tiers
  for (const [r, row] of Object.entries(flex)) for (const [d, p] of Object.entries(row)) {
    if (!spec.tiers.includes(p)) v.push(`tier: ${r}>${d} = ${p}, not in ${spec.tiers.join('/')}`);
  }
  // 3 QB
  const qb = flex.QB ?? {};
  const qbKeys = Object.keys(qb);
  if (qbKeys.length !== 1 || qbKeys[0] !== 'FS') v.push(`QB: flexes to ${qbKeys.join(',') || 'nothing'}, must be FS only`);
  const qbWant = spec.set.get('QB>FS');
  if (qbWant !== undefined && qb.FS !== qbWant) v.push(`QB: FS = ${qb.FS}, Owner says ${qbWant}`);
  // 4 removed
  for (const r of spec.remove) {
    const [a, b] = r.split('>');
    if (flex[a] && b in flex[a]) v.push(`removed: ${r} is still in the table (${flex[a][b]})`);
  }
  // 5 overrides + 6 rounding
  let checked = 0, rounded = 0;
  for (const [r, row] of Object.entries(flex)) for (const [d, p] of Object.entries(row)) {
    const rule = `${r}>${d}`;
    checked++;
    if (spec.set.has(rule)) {
      if (p !== spec.set.get(rule)) v.push(`override: ${rule} = ${p}, Owner says ${spec.set.get(rule)}`);
      continue;
    }
    if (!D) continue;
    if (!(rule in D)) { warn.push(`rounding: ${rule} has no D, not checked`); continue; }
    const want = tierFor(D[rule] * spec.theta, spec.tiers, spec.cutoffs);
    rounded++;
    if (p !== want) v.push(`rounding: ${rule} = ${p}, D@90 ${D[rule]} * ${spec.theta} -> ${want}`);
  }
  // 7 integrity against the base table
  if (base) {
    const inTable = new Set(Object.entries(flex).flatMap(([a, r]) => Object.keys(r).map((b) => `${a}>${b}`)));
    for (const [a, r] of Object.entries(base.flex)) for (const b of Object.keys(r)) {
      const rule = `${a}>${b}`;
      if (!inTable.has(rule) && !spec.remove.has(rule)) v.push(`integrity: ${rule} was in the base table and is neither present nor removed`);
    }
    for (const rule of inTable) { const [a, b] = rule.split('>'); if (!(b in (base.flex[a] ?? {})) && !spec.set.has(rule)) v.push(`integrity: ${rule} is new and has no Owner decision`); }
  }
  // 8 banned
  if (banned) {
    const listed = new Set(Object.entries(banned).flatMap(([a, ds]) => ds.map((d) => `${a}>${d}`)));
    for (const r of spec.remove) if (!listed.has(r)) v.push(`banned: ${r} is removed in the spec but missing from _banned`);
    for (const r of listed) {
      const [a, b] = r.split('>');
      if (flex[a] && b in flex[a]) v.push(`banned: ${r} is in _banned and still in flex`);
    }
  }
  return { violations: v, warnings: warn, checked, rounded };
}

function freeLunch(table) {
  const out = [];
  for (const [a, row] of Object.entries(table.flex)) for (const [b, p] of Object.entries(row)) {
    if (p !== 0) continue;
    if (UNITS[a] !== UNITS[b]) out.push(`${a}>${b}`);
  }
  return out.sort();
}

function main() {
  if (flag('selftest')) return selftest();
  const file = arg('table', '');
  if (!file) { console.error('usage: node tools/mathlab/flexassert.mjs --table=<flex.json> [--spec=] [--d=] [--base=]'); process.exit(2); }
  const table = JSON.parse(fs.readFileSync(file, 'utf8'));
  const spec = readSpec(arg('spec', DEFAULTS.spec));
  let D = null;
  if (!flag('no-d')) { try { D = readD(arg('d', DEFAULTS.d)); } catch (e) { console.error(`note: D not read (${e.message}); rounding checks skipped`); } }
  const base = flag('no-base') ? null : (() => { try { return JSON.parse(fs.readFileSync(arg('base', DEFAULTS.base), 'utf8')); } catch { return null; } })();
  const { violations, warnings, checked, rounded } = assertTable(table, spec, D, base);
  if (warnings.length) for (const w of warnings) console.error(`WARN ${w}`);
  if (violations.length) {
    console.error(`FLEXASSERT FAIL ${violations.length} violation(s):`);
    for (const x of violations) console.error(`  - ${x}`);
    process.exit(1);
  }
  const n = Object.values(table.flex).reduce((a, r) => a + Object.keys(r).length, 0);
  const zeros = Object.values(table.flex).reduce((a, r) => a + Object.values(r).filter((p) => p === 0).length, 0);
  const banned = table._banned ? Object.values(table._banned).flat().length : 0;
  const fl = freeLunch(table);
  console.log(`FLEXASSERT OK ${n} rules, ${zeros} at 0, ${banned} banned, ${checked} checked, ${rounded} rounding-checked`);
  console.log(`cross-unit zeros (${fl.length}): ${fl.join(' ') || 'none'}`);
}

// ---------- selftest ----------

function selftest() {
  let n = 0, bad = 0;
  const ok = (cond, msg) => { n++; if (!cond) { bad++; console.log(`FAIL ${msg}`); } else console.log(`PASS ${msg}`); };
  const spec = {
    tiers: [0, 2, 6, 12], cutoffs: [1, 4, 9], theta: 1,
    set: new Map([['QB>FS', 12], ['RB>FB', 2], ['FB>RB', 2]]),
    remove: new Set(['FB>EDGE']),
  };
  const good = {
    roles: ['QB', 'RB', 'FB', 'FS'],
    flex: { QB: { FS: 12 }, RB: { FB: 2 }, FB: { RB: 2 }, FS: {} },
    _banned: { FB: ['EDGE'] },
  };
  const D = { 'QB>FS': 0, 'RB>FB': 0, 'FB>RB': 0 };
  const run = (t, d = D, sp = spec, base = null) => assertTable(t, sp, d, base);
  ok(run(good).violations.length === 0, 'good table passes');
  const clone = (f) => JSON.parse(JSON.stringify(good, f));
  const mutate = (fn) => { const t = clone(); fn(t); return run(t).violations; };
  const mutateTable = (fn) => { const t = clone(); fn(t); return t; };
  ok(mutate((t) => { t.flex.QB.FS = 10; }).some((x) => x.startsWith('tier')), 'bad tier caught');
  ok(mutate((t) => { t.flex.FB.EDGE = 12; }).some((x) => x.startsWith('removed')), 'removed rule present caught');
  ok(mutate((t) => { t.roles.push('WR'); }).some((x) => x.includes('role WR has no row')), 'missing row caught');
  ok(mutate((t) => { t.flex.QB.WR = 0; }).some((x) => x.startsWith('QB')), 'QB second destination caught');
  ok(mutate((t) => { t.flex.RB.FB = 0; }).some((x) => x.startsWith('override')), 'override mismatch caught');
  ok(run(mutateTable((t) => { t.flex.RB.FB = 2; t.flex.RB.FS = 0; })).warnings.some((x) => x.includes('RB>FS')), 'rule with no D warns, does not silently pass as ok');
  ok(mutate((t) => { t.flex.FB.ZZ = 0; }).some((x) => x.includes('unknown destination')), 'unknown destination caught');
  ok(mutate((t) => { t._banned = {}; }).some((x) => x.startsWith('banned')), 'missing _banned entry caught');
  ok(mutate((t) => { t.flex.FB.RB = 0; t._banned = { FB: ['EDGE', 'RB'] }; }).some((x) => x.includes('still in flex')), 'banned rule still in flex caught');
  const base = { roles: ['QB', 'RB', 'FB', 'FS'], flex: { QB: { FS: 12 }, RB: { FB: 2 }, FB: { RB: 2, EDGE: 12 }, FS: {} } };
  ok(run(good, D, spec, base).violations.length === 0, 'base integrity passes when the removed rule is the only drop');
  ok(run(good, D, spec, { roles: ['QB', 'RB', 'FB', 'FS', 'WR'], flex: { ...base.flex, WR: { RB: 6 } } }).violations.some((x) => x.startsWith('integrity')), 'silently dropped base rule caught');
  const roundT = { roles: ['QB', 'RB', 'FB', 'FS'], flex: { QB: { FS: 12 }, RB: { FB: 2, TE: 0 }, FB: { RB: 2 }, FS: {} }, _banned: { FB: ['EDGE'] } };
  ok(run(roundT, { ...D, 'RB>TE': 5 }).violations.some((x) => x.startsWith('rounding') && x.includes('RB>TE')), 'rounding uses D when the rule is not an override (D 5 -> 6, table 0)');
  ok(freeLunch({ flex: { QB: { FS: 0 }, FB: { EDGE: 0 }, CB: { FS: 0 } } }).length === 2, 'cross-unit zero report counts unit changes');
  console.log(`\nFLEXASSERT SELFTEST ${bad ? `FAIL ${bad}/${n}` : `PASS ${n}/${n}`}`);
  process.exit(bad ? 1 : 0);
}

if (process.argv[1] && import.meta.url === new URL(`file://${path.resolve(process.argv[1])}`).href) main();
