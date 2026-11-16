#!/usr/bin/env node
/* d3-boxscore-mutations.mjs — Rev 10 EXT D3: four 1b box-score fields are asserted by NO test.
 * Ernie mutated the sim slice twelve ways and found four survivors (REPORTED: puntYard never
 * accumulated, touchdowns never counted, firstDowns never counted, an interception spotted at the
 * 20 instead of at the catch). This harness re-runs the FOUR SURVIVOR CLASSES on the VENDORED
 * engine at pin d3bd81d2 — each mutation applied to a THROWAWAY copy (never src/) with its exact
 * anchor string, then the FOUR related test files (boxscore, outcome, recap, drives) run against
 * the mutated copy. The measured result decides, per class: CAUGHT (a test fails — Ernie's
 * survivor claim does not reproduce at this pin) or SURVIVES (all four files stay green — the
 * gap is live and the §5 proposal's missing assertions are needed).
 * Run: node scripts/d3-boxscore-mutations.mjs   (exit 0 = harness ran to completion; the per-
 * mutation CAUGHT/SURVIVES table is the deliverable, not the exit code). */
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));           // <delivery>/scripts
const ROOT = dirname(HERE);                                     // <delivery>
const VENDORED = join(ROOT, 'football-sim-vue/src/engine');     // the pinned engine snapshot (read-only)
const TMP = `${process.env.TMPDIR || '/tmp'}/d3-boxscore`;
rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });

// The four related test files (the sim/box-score slice's own tests). Byte-copies of the pin's
// tests ship read-only with this delivery under probes/d3-tests/nfl/ (the delivery carries no
// colors/test/; these are harness INPUTS, not edits — copied from colors at pin d3bd81d2, hash-
// listed in the receipt).
const TEST_FILES = [
  'test/nfl/boxscore.test.ts',
  'test/nfl/outcome.test.ts',
  'test/nfl/recap.test.ts',
  'test/nfl/drives.test.ts',
];
const TEST_SRCS = [...TEST_FILES, 'test/nfl/fixture.ts']; // fixture.ts: the shared play/league helpers

// The four mutations. Each: id, description, file (relative to engine root), anchor (must occur
// exactly once), replacement, plus the Ernie-claim label. M4 has NO anchor at this pin — recorded.
const MUTATIONS = [
  {
    id: 'M1-puntYd-never-accumulated',
    ernie: 'REPORTED survivor: puntYards never accumulated',
    file: 'sports/nfl/engine/boxscore.ts',
    anchor: 'O.pt.line.stats.puntYd += y;',
    replacement: '',
    note: 'the PUNT branch still increments punts and sets cr.kickYards — only the yardage accumulator dies',
  },
  {
    id: 'M2-recTd-never-counted',
    ernie: 'REPORTED survivor class: touchdowns never counted (player-line receiving TD increment)',
    file: 'sports/nfl/engine/boxscore.ts',
    anchor: 'if (tdRecv) tdRecv.line.stats.recTd++;',
    replacement: '',
    note: 'boxscore.test.ts "a touchdown scorer has the touchdown on his line" compares lines vs credits — CAUGHT here would CONTRADICT the survivor claim at this pin',
  },
  {
    id: 'M3-int-spotted-at-the-20',
    ernie: 'REPORTED survivor: an interception spotted at the 20 instead of at the catch',
    file: 'sports/nfl/engine/boxscore.ts',
    anchor: 'const y = d.defTD ? r.int(15, 85) : Math.max(0, Math.round(10 + 9 * r.normal()));',
    replacement: 'const y = 20;',
    note: 'every non-TD interception return is now exactly 20 yards — no range/consistency assertion exists',
  },
  {
    id: 'M4-firstDowns-never-counted',
    ernie: 'REPORTED survivor: firstDowns never counted',
    file: null,
    anchor: null,
    replacement: null,
    note: 'NO ANCHOR AT PIN d3bd81d2: there is no firstDowns/first_down symbol anywhere in src/ (grep-verified) and no firstDown stat in STAT_KEYS — the field does not exist in the engine, so nothing can be mutated; recorded as a finding, not a probe',
  },
];

// What we mutate: the vendored engine copy (src/ layout matches colors/src layout)
const engineSrc = join(VENDORED); // contains core/…, sports/…

// CONTROL FIRST: the UNMUTATED copy must pass all four files, or every CAUGHT below is an
// artifact of the harness (this sitting's first run failed exactly this way — the fixture's
// ../../../data/nfl CSV path needed the sibling-data layout, and an uncontrolled run reported
// false CAUGHTs). Exit 2 if the control is red.
{
  const dir = join(TMP, 'CONTROL');
  const tree = join(dir, 'tree');
  cpSync(VENDORED, join(tree, 'src'), { recursive: true });
  for (const tf of TEST_SRCS) {
    mkdirSync(join(tree, dirname(tf)), { recursive: true });
    cpSync(join(ROOT, 'probes/d3-tests/nfl', basename(tf)), join(tree, tf));
  }
  mkdirSync(join(dir, 'data/nfl'), { recursive: true });
  for (const csv of ['madden27-ratings.csv', 'free-agents-old-ratings.csv', 'player-ids.csv']) {
    cpSync(join(ROOT, 'football-sim-vue/src/data', csv), join(dir, 'data/nfl', csv));
  }
  try {
    execSync(`node --test --experimental-strip-types ${TEST_FILES.join(' ')}`, { cwd: tree, stdio: 'pipe', timeout: 240000 });
    console.log('CONTROL (unmutated copy, four test files): GREEN — the harness layout is sound\n');
  } catch (e) {
    console.error('CONTROL RED — the harness cannot distinguish mutation failures from layout failures; fix the layout first');
    process.exit(2);
  }
}

let exitCode = 0;
const rows = [];
for (const m of MUTATIONS) {
  if (!m.file) {
    rows.push({ id: m.id, result: 'ABSENT-AT-PIN', detail: m.note, failing: [] });
    console.log(`${m.id}: ABSENT-AT-PIN — ${m.note}`);
    continue;
  }
  const dir = join(TMP, m.id);
  // layout: <dir>/tree/{src,test} with the data CSVs at <dir>/data/nfl/ — the colors test fixture
  // reads ../../../data/nfl/*.csv from test/nfl/, i.e. a data/ SIBLING of the tree root (the
  // repo layout: <repo>/colors/ + <repo>/data/). CSVs are byte-copies of the vendored src/data.
  const tree = join(dir, 'tree');
  cpSync(VENDORED, join(tree, 'src'), { recursive: true });
  for (const tf of TEST_SRCS) {
    mkdirSync(join(tree, dirname(tf)), { recursive: true });
    cpSync(join(ROOT, 'probes/d3-tests/nfl', basename(tf)), join(tree, tf)); // byte-copies shipped with the delivery
  }
  mkdirSync(join(dir, 'data/nfl'), { recursive: true });
  for (const csv of ['madden27-ratings.csv', 'free-agents-old-ratings.csv', 'player-ids.csv']) {
    cpSync(join(ROOT, 'football-sim-vue/src/data', csv), join(dir, 'data/nfl', csv));
  }
  const target = join(tree, 'src', m.file);
  const text = readFileSync(target, 'utf8');
  const n = text.split(m.anchor).length - 1;
  if (n !== 1) {
    rows.push({ id: m.id, result: 'ANCHOR-LOST', detail: `anchor occurs ${n}× (wanted exactly 1): ${m.anchor}`, failing: [] });
    console.log(`${m.id}: ANCHOR-LOST (${n}×)`);
    exitCode = 2;
    continue;
  }
  writeFileSync(target, text.replace(m.anchor, m.replacement));
  // run the four related test files against the mutated copy (cwd = the tree root)
  let failing = [];
  try {
    execSync(`node --test --experimental-strip-types ${TEST_FILES.join(' ')}`, { cwd: tree, stdio: 'pipe', timeout: 240000, encoding: 'utf8' });
  } catch (e) {
    const out = (e.stdout ?? '') + (e.stderr ?? '');
    const names = [...out.matchAll(/^not ok \d+ - (.+)$/gm)].map((x) => x[1])
      .concat([...out.matchAll(/^✖ (.+?) \(\d[\d.]*ms?\)$/gm)].map((x) => x[1]))
      .filter((s) => s && !/^failing tests:$/.test(s));
    failing = [...new Set(names)].slice(0, 8);
    if (failing.length === 0) failing = [`exit ${e.status} (non-zero)`];
  }
  const result = failing.length === 0 ? 'SURVIVES' : 'CAUGHT';
  rows.push({ id: m.id, result, detail: m.note, failing });
  console.log(`${m.id}: ${result}${failing.length ? ' — ' + failing.join(' | ') : ' — all four related test files stay green'}`);
  if (result === 'SURVIVES') exitCode = 1; // survivors found: the gap is live (signal, not harness failure)
}
console.log('\nsummary:');
for (const r of rows) console.log(`  ${r.id}: ${r.result}`);
console.log(`\nM4 note: "firstDowns" does not exist at pin d3bd81d2 (no symbol in src/, no STAT_KEY) —`);
console.log(`Ernie's survivor list cannot be replicated verbatim on this engine; the proposal covers it.`);
process.exit(exitCode);
