#!/usr/bin/env node
// mathlab/flexverify.mjs — P-311: verify a rebuilt flex table against the Owner's 2026-11-09 custom table.
//
// One command, no engine, no network. It answers the five P-311 questions that can be answered from files:
//   1. Is the table legal (known roles/dests, only tiers 0/2/6/12, QB flexes only to FS at 12)?
//   2. Are the 7 removals absent (the move is disallowed, not merely 0)?
//   3. Are all 53 Owner overrides exact?
//   4. Does every rule the Owner did not name equal the rounded D (from the flexrebuild result file)?
//   5. Does flex.ts say exactly what flex.json says, rule by rule?
//
// Usage:
//   node tools/mathlab/flexverify.mjs --table=<flex.json> --expected=<results/flex-D-2026-11-09-wins.json> [--ts=<flex.ts>]
// Exit 0 = table matches; 1 = every mismatch printed; 2 = usage/read error.
// Self-test: --selftest (checks the parser and the comparison on fixtures, no files needed).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const fail = (m) => { console.error('flexverify: ' + m); process.exit(2); };
const TIERS = [0, 2, 6, 12];
const DESTS = new Set(['QB', 'RB', 'FB', 'WR', 'TE', 'OT', 'OG', 'C', 'DT', 'EDGE', 'ILB', 'OLB', 'SS', 'FS', 'CB', 'K', 'P', 'NICKEL', 'DIME', 'DL5']);

export function parseTs(src) {
  const out = {};
  // one role per line: `  QB: { FS: 12 },` — LS is the only empty row and is not in flex.json
  for (const line of src.split('\n')) {
    const m = line.match(/^\s{2}([A-Z]+):\s*\{(.*)\},?\s*$/);
    if (!m) continue;
    const [, role, body] = m;
    const row = {};
    for (const part of body.split(',')) {
      const p = part.trim(); if (!p) continue;
      const kv = p.match(/^([A-Z]+):\s*(-?\d+(?:\.\d+)?)$/);
      if (!kv) throw new Error(`cannot parse flex.ts entry "${p}" in row ${role}`);
      row[kv[1]] = +kv[2];
    }
    out[role] = row;
  }
  return out;
}

export function flatten(flex) { return new Map(Object.entries(flex || {}).flatMap(([a, row]) => Object.entries(row).map(([b, v]) => [`${a}>${b}`, v]))); }

export function compare({ table, expected, ts }) {
  const problems = [], notes = [];
  const flat = flatten(table.flex);
  const tierOf = new Map(expected.rows.map((r) => [r.rule, r]));
  const removed = expected.rows.filter((r) => r.final == null).map((r) => r.rule);
  const set = expected.rows.filter((r) => r.action.startsWith('override')).map((r) => r.rule);
  // 1 legal shape
  if (!Array.isArray(table.roles)) notes.push('table has no roles array (checked against expected rows only)');
  for (const [rule, v] of flat) {
    const [role, dest] = rule.split('>');
    if (!DESTS.has(dest) || !DESTS.has(role)) problems.push(`unknown role/destination: ${rule}`);
    if (!TIERS.includes(v)) problems.push(`illegal tier ${v} at ${rule} (must be 0/2/6/12)`);
    if (!tierOf.has(rule)) problems.push(`rule not in the Owner universe: ${rule}=${v}`);
  }
  // QB row: only FS, at 12
  const qb = table.flex.QB || {};
  const qbKeys = Object.keys(qb);
  if (qbKeys.length !== 1 || qbKeys[0] !== 'FS' || qb.FS !== 12) problems.push(`QB must flex only to FS at 12 (found ${JSON.stringify(qb)})`);
  // 2 removals absent
  for (const r of removed) if (flat.has(r)) problems.push(`removed rule still present: ${r}=${flat.get(r)}`);
  // 3 overrides exact + 4 unmentioned rules = rounded D
  for (const [rule] of flat) {
    const e = tierOf.get(rule); if (!e) continue;
    if (e.final == null) continue;
    if (flat.get(rule) !== e.final) problems.push(`${set.includes(rule) ? 'override' : 'rounding'} ${rule}: expected ${e.final}, table ${flat.get(rule)}`);
  }
  for (const e of expected.rows) if (e.final != null && !flat.has(e.rule)) problems.push(`missing rule: ${e.rule} (expected ${e.final})`);
  // 5 flex.ts parity
  if (ts) {
    const t = ts; let n = 0;
    for (const [role, row] of Object.entries(t)) {
      for (const [dest, v] of Object.entries(row)) {
        const k = `${role}>${dest}`; n++;
        if (!flat.has(k)) problems.push(`flex.ts has ${k} but flex.json does not`); else if (flat.get(k) !== v) problems.push(`flex.ts ${k}=${v} but flex.json=${flat.get(k)}`);
      }
    }
    for (const k of flat.keys()) { const [r, d] = k.split('>'); if (!t[r] || t[r][d] == null) problems.push(`flex.ts is missing ${k}`); }
    notes.push(`flex.ts rows checked: ${n}`);
  }
  return { problems, notes, counts: { rules: flat.size, removed: removed.length, overrides: set.length, expectedKept: expected.rows.filter((r) => r.final != null).length } };
}

function selftest() {
  let bad = 0;
  const ok = (c, m) => { if (!c) { console.log('FAIL ' + m); bad++; } };
  const t = parseTs("export const FLEX: Readonly<Record<Role, Row>> = {\n  QB: { FS: 12 },\n  RB: { FB: 2, WR: 12 },\n  LS: {},\n};");
  ok(JSON.stringify(t) === JSON.stringify({ QB: { FS: 12 }, RB: { FB: 2, WR: 12 }, LS: {} }), 'parseTs');
  const expected = { rows: [
    { rule: 'QB>FS', final: 12, action: 'override' }, { rule: 'RB>FB', final: 2, action: 'rounding' },
    { rule: 'RB>WR', final: 12, action: 'rounding' }, { rule: 'FB>EDGE', final: null, action: 'removed' },
  ] };
  const good = compare({ table: { roles: ['QB', 'RB'], flex: { QB: { FS: 12 }, RB: { FB: 2, WR: 12 } } }, expected, ts: { QB: { FS: 12 }, RB: { FB: 2, WR: 12 } } });
  ok(good.problems.length === 0, 'good table must pass: ' + good.problems.join('; '));
  const reintroduced = compare({ table: { roles: ['QB', 'RB'], flex: { QB: { FS: 12 }, RB: { FB: 2, WR: 12 }, FB: { EDGE: 12 } } }, expected });
  ok(reintroduced.problems.some((p) => p.includes('removed rule still present: FB>EDGE')), 'must catch a reintroduced removal');
  const wrongTier = compare({ table: { roles: ['QB', 'RB'], flex: { QB: { FS: 12 }, RB: { FB: 0, WR: 12 } } }, expected });
  ok(wrongTier.problems.some((p) => p.includes('RB>FB')), 'must catch a wrong rounding');
  const badQb = compare({ table: { roles: ['QB'], flex: { QB: { FS: 6 } } }, expected });
  ok(badQb.problems.some((p) => p.includes('QB must flex only')), 'must catch a QB row that is not FS 12');
  const drift = compare({ table: { roles: ['QB', 'RB'], flex: { QB: { FS: 12 }, RB: { FB: 2, WR: 12 } } }, expected, ts: { QB: { FS: 12 }, RB: { FB: 2, WR: 6 } } });
  ok(drift.problems.some((p) => p.includes('flex.ts RB>WR=6')), 'must catch flex.ts drift');
  console.log(bad ? `FLEXVERIFY SELFTEST FAIL ${bad}` : 'FLEXVERIFY SELFTEST OK');
  process.exit(bad ? 1 : 0);
}

function main() {
  if (process.argv.includes('--selftest')) selftest();
  const tablePath = arg('table', ''), expPath = arg('expected', path.join(HERE, 'results', 'flex-D-2026-11-09-wins.json')), tsPath = arg('ts', '');
  if (!tablePath) fail('--table=<flex.json> is required');
  for (const p of [tablePath, expPath, tsPath].filter(Boolean)) if (!fs.existsSync(p)) fail('no such file: ' + p);
  const table = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
  const expected = JSON.parse(fs.readFileSync(expPath, 'utf8'));
  if (!Array.isArray(expected.rows)) fail('expected file is not a flexrebuild result (no rows): ' + expPath);
  const ts = tsPath ? parseTs(fs.readFileSync(tsPath, 'utf8')) : null;
  const { problems, notes, counts } = compare({ table, expected, ts });
  console.log(`table ${tablePath}: ${counts.rules} rules; owner table: ${counts.expectedKept} kept, ${counts.removed} removed, ${counts.overrides} owner rules`);
  notes.forEach((n) => console.log('note ' + n));
  problems.forEach((p) => console.log('FAIL ' + p));
  console.log(problems.length ? `FLEXVERIFY FAIL ${problems.length}` : `FLEXVERIFY OK ${counts.rules} rules match the Owner table`);
  process.exit(problems.length ? 1 : 0);
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) main();
