#!/usr/bin/env node
// track-probe.mjs — measure the two engine copies instead of describing them.
// Reads git objects only (never a working tree), extracts each package to a temp dir
// and runs its own test command with the same Node binary. Prints:
//   1. hermeticity: does the package pass when extracted ALONE?
//   2. drift: which files differ between the two copies, and by how much?
// Usage: node track-probe.mjs [repoDir]
// Exit 0 = both copies green in their own package; 1 = a copy needs the whole repo to pass.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const repo = process.argv[2] ?? process.cwd();
const COLORS = { ref: process.env.COLORS_REF ?? 'origin/architect/engine-and-seats', pkg: 'colors' };
const CAKE = { ref: process.env.CAKE_REF ?? 'origin/gh-pages', pkg: '67-cakepanz' };
const git = (...a) => execFileSync('git', ['-C', repo, ...a], { encoding: 'utf8', maxBuffer: 1 << 28 });

function extract({ ref, pkg }, extra = []) {
  const dir = mkdtempSync(path.join(tmpdir(), 'probe-'));
  const tar = execFileSync('git', ['-C', repo, 'archive', ref, pkg, ...extra], { maxBuffer: 1 << 28 });
  execFileSync('tar', ['-x', '-C', dir], { input: tar });
  return path.join(dir, pkg);
}

function run(cwd, pattern) {
  try {
    const out = execFileSync('node', ['--test', '--experimental-strip-types', pattern], { cwd, encoding: 'utf8', stdio: 'pipe', maxBuffer: 1 << 28 });
    return { ok: true, out };
  } catch (e) {
    return { ok: false, out: (e.stdout ?? '') + (e.stderr ?? '') };
  }
}
const counts = (out) => {
  const n = (k) => Number((out.match(new RegExp(`^\\u2139 ${k} (\\d+)$`, 'm')) ?? [])[1] ?? -1);
  return { tests: n('tests'), pass: n('pass'), fail: n('fail') };
};
const fmt = (c) => `${c.pass}/${c.tests} pass, ${c.fail} fail`;

function probe(name, target, { solo }) {
  const dir = extract(target, solo ? [] : ['data', 'tools/mathlab']);
  const pattern = existsSync(path.join(dir, 'test/engine.test.ts')) ? 'test/engine.test.ts' : 'test/**/*.test.ts';
  const r = run(dir, pattern);
  const c = counts(r.out);
  const filesFailed = new Set((r.out.match(/^\u2716 (test\/[^\s]+\.test\.ts)/gm) ?? []).map((l) => l.slice(2))).size;
  const firstErr = (r.out.match(/^(Error: .*)$/m) ?? [])[1] ?? '';
  console.log(`${name.padEnd(10)} ${solo ? 'ALONE (package only)      ' : 'with repo data + mathlab   '} ${fmt(c)}${filesFailed ? ` (${filesFailed} test files could not load)` : ''}  ${firstErr ? '| ' + firstErr : ''}`);
  return { ...c, ok: r.ok, solo };
}

console.log(`# track-probe | node ${process.version} | repo ${repo}`);
const sha = (ref) => git('rev-parse', '--short=8', ref).trim();
console.log(`# Colors = ${COLORS.ref}:${COLORS.pkg} @ ${sha(COLORS.ref)}`);
console.log(`# Fork   = ${CAKE.ref}:${CAKE.pkg} @ ${sha(CAKE.ref)}\n`);
console.log('## 0. resolve every ref to the sha actually measured (a local branch may not be the remote head)\n');
console.log('## 1. hermeticity — the same suite from a bare archive\n');
const cSolo = probe('Colors', COLORS, { solo: true });
const cFull = probe('Colors', COLORS, { solo: false });
const kSolo = probe('Cake', CAKE, { solo: true });

// ---- drift ----
const strip = (t, p) => p.replace(`${t.pkg}/src/`, '').replace(/^engine\//, '');
const list = (t) => git('ls-tree', '-r', `${t.ref}:${t.pkg}/src`).trim().split('\n').filter(Boolean)
  .map((l) => { const [meta, p] = l.split('\t'); return { sha: meta.split(/\s+/)[2], p: strip(t, p) }; });
const A = new Map(list(COLORS).map((x) => [x.p, x.sha]));
const B = new Map(list(CAKE).map((x) => [x.p, x.sha]));
const show = (t, p) => git('show', `${t.ref}:${t.pkg}/src/` + (t.pkg === 'colors' ? '' : 'engine/') + p);
const shared = [...A.keys()].filter((p) => B.has(p)).sort();
const same = shared.filter((p) => A.get(p) === B.get(p));
const diff = shared.filter((p) => A.get(p) !== B.get(p)).map((p) => ({ p, lines: show(COLORS, p).split('\n').length - 1, changed: 0 }));

// count changed lines by diffing the two blobs through temp files
const changedLines = (p) => {
  const f1 = path.join(path.dirname(mkdtempSync(path.join(tmpdir(), 'd-')), 'x'), 'a');
  const d1 = path.dirname(f1); mkdirSync(d1, { recursive: true }); writeFileSync(f1, show(COLORS, p));
  const f2 = f1 + '.b'; writeFileSync(f2, show(CAKE, p));
  try {
    execFileSync('diff', ['-u', f1, f2], { encoding: 'utf8', maxBuffer: 1 << 26 });
    return 0;
  } catch (e) {
    return (e.stdout ?? '').split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)).length;
  }
};
const rows = diff.map((r) => ({ ...r, changed: changedLines(r.p) })).sort((a, b) => b.changed - a.changed);
const engineOnly = rows.filter((r) => r.p.startsWith('sports/nfl/engine/'));
console.log('\n## 2. drift — the two copies of the same engine\n');
console.log(`shared files: ${shared.length} | identical: ${same.length} | differing: ${rows.length} | colors-only: ${[...A.keys()].filter((p) => !B.has(p)).length} | fork-only: ${[...B.keys()].filter((p) => !A.has(p)).length}`);
console.log(`changed lines total: ${rows.reduce((s, r) => s + r.changed, 0)} | in sports/nfl/engine only: ${engineOnly.reduce((s, r) => s + r.changed, 0)}`);
console.log('\nfile'.padEnd(38) + 'lines'.padStart(6) + 'changed'.padStart(9));
for (const r of rows) console.log(r.p.padEnd(38) + String(r.lines).padStart(6) + String(r.changed).padStart(9));
const forkOnly = [...B.keys()].filter((p) => !A.has(p)).sort();
if (forkOnly.length) console.log('\nfork-only: ' + forkOnly.join(', '));
const colorsOnly = [...A.keys()].filter((p) => !B.has(p)).sort();
if (colorsOnly.length) console.log('\ncolors-only: ' + colorsOnly.join(', '));

// ---- value model: the two design.json files, and whether each copy pins its own ----
import { createHash } from 'node:crypto';
const design = (t) => JSON.parse(git('show', `${t.ref}:${t.pkg === 'colors' ? 'tools/mathlab' : t.pkg + '/tools/mathlab'}/design.json`));
const DA = design(COLORS), DB = design(CAKE);
const h = (o) => createHash('sha256').update(JSON.stringify(o)).digest('hex').slice(0, 16);
console.log('\n## 3. value model — the 32-spot table each copy is pinned to\n');
console.log(`Colors design.json sha256:${h(DA)}   Fork design.json sha256:${h(DB)}   identical: ${h(DA) === h(DB)}`);
const slots = [...new Set([...Object.keys(DA), ...Object.keys(DB)])].sort();
const moved = slots.filter((k) => DA[k] !== DB[k]);
console.log(`slots: ${slots.length} | differing: ${moved.length}`);
console.log('\nslot'.padEnd(8) + 'colors'.padStart(8) + 'fork'.padStart(8) + 'fork/colors'.padStart(13));
for (const k of moved) console.log(k.padEnd(8) + String(DA[k]).padStart(8) + String(DB[k]).padStart(8) + (DB[k] / DA[k]).toFixed(2).padStart(13));
console.log(`\n# the pin: each copy's lineup test reads ITS OWN tools/mathlab/design.json,`);
console.log(moved.length === 0
  ? `# so right now the two tables agree in all ${slots.length} slots — and a suite can still be green only while they agree by luck, not by check.`
  : `# so both suites are green while the value table differs in ${moved.length} of ${slots.length} slots.`);

const verdict = cSolo.ok && kSolo.ok ? 'both copies pass alone' : 'a copy needs the whole repo to pass';
console.log(`\n# verdict: ${verdict}`);
process.exit(cSolo.ok && kSolo.ok ? 0 : 1);
