// tools/release-assemble.mjs: puts the dataset asset into a built dist/ without the data ever touching a git tree. Invented players only.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseAsset } from '../../src/boot/dataset-asset.ts';
import { formatIds, syncIds } from '../../src/sports/nfl/engine/playerids.ts';
import { parseCsv } from '../../src/sports/nfl/engine/players.ts';
import { EMPTY_FA, ratingsCsv } from './synth.ts';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const TOOL = join(REPO, 'tools', 'release-assemble.mjs');
const NAMES = ['madden27-ratings.csv', 'free-agents-old-ratings.csv', 'player-ids.csv'] as const;

function dataFiles(ratings = ratingsCsv()): string[] {
  const floor = { pid: 'nfl-p00000', name: '', pos: 'QB', team: '-' };
  const ids = formatIds(syncIds([floor], parseCsv(ratings, false)).rows.slice(1));
  return [ratings, EMPTY_FA, ids];
}
function put(dir: string, texts = dataFiles()): string {
  mkdirSync(dir, { recursive: true });
  texts.forEach((t, i) => writeFileSync(join(dir, NAMES[i]!), t));
  return dir;
}
function dist(dir: string): string {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), '<!doctype html><title>t</title>');
  return dir;
}
const git = (cwd: string, ...a: string[]) => assert.equal(spawnSync('git', a, { cwd }).status, 0, 'git ' + a.join(' '));

// A scratch area outside every git tree, removed afterwards.
function scratch(fn: (dir: string) => unknown) {
  return async () => {
    const d = mkdtempSync(join(tmpdir(), 'release-assemble-'));
    try { await fn(d); } finally { rmSync(d, { recursive: true, force: true }); }
  };
}
const run = (d: string, distDir: string, dataDir: string, log = join(d, 'log.md')) => {
  const r = spawnSync(process.execPath, [TOOL, '--dist', distDir, '--dataset', dataDir, '--log', log], { encoding: 'utf8' });
  return { status: r.status, out: r.stdout + r.stderr, log, asset: join(distDir, 'dataset', 'nfl.json') };
};
const refused = (r: ReturnType<typeof run>, why: RegExp) => {
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, why);
  assert.equal(existsSync(r.asset), false, 'nothing written');
  assert.equal(existsSync(r.log), false, 'nothing logged');
};

test('release: writes a loadable asset and logs hashes only', scratch(async (d) => {
  const r = run(d, dist(join(d, 'dist')), put(join(d, 'data')));
  assert.equal(r.status, 0, r.out);
  const loaded = await parseAsset(readFileSync(r.asset, 'utf8'));
  assert.ok(loaded.ok);
  const log = readFileSync(r.log, 'utf8');
  assert.ok(log.includes(loaded.value.hash));
  assert.equal(/Synth|Team \d/.test(log + r.out), false, 'no row content in the log or console');
  assert.equal(log.includes(d), false, 'no local paths in the log');
  assert.equal((log.match(/^\| \d{4}-\d\d-\d\dT/gm) ?? []).length, 1);
}));

test('release: a second run appends a row and never edits the first', scratch((d) => {
  const distDir = dist(join(d, 'dist')), data = put(join(d, 'data'));
  const a = run(d, distDir, data);
  const first = readFileSync(a.log, 'utf8');
  const b = run(d, distDir, data);
  assert.equal(b.status, 0, b.out);
  const second = readFileSync(b.log, 'utf8');
  assert.ok(second.startsWith(first));
  assert.equal((second.match(/^\| \d{4}-\d\d-\d\dT/gm) ?? []).length, 2);
}));

test('release: refuses data inside this repo, even untracked', scratch((d) => {
  const inside = mkdtempSync(join(REPO, '.tmp-release-test-'));
  try { refused(run(d, dist(join(d, 'dist')), put(inside)), /inside the repo/); }
  finally { rmSync(inside, { recursive: true, force: true }); }
}));

test('release: refuses a symlink that leads into the repo', scratch((d) => {
  const inside = mkdtempSync(join(REPO, '.tmp-release-test-'));
  try {
    put(inside);
    const data = join(d, 'data'); mkdirSync(data);
    for (const n of NAMES) symlinkSync(join(inside, n), join(data, n));
    refused(run(d, dist(join(d, 'dist')), data), /inside the repo/);
  } finally { rmSync(inside, { recursive: true, force: true }); }
}));

test('release: refuses data that any git repo tracks', scratch((d) => {
  const other = put(join(d, 'other'));
  git(other, 'init', '-q'); git(other, 'add', 'player-ids.csv');
  refused(run(d, dist(join(d, 'dist')), other), /tracked by git/);
}));

test('release: a dist inside a git tree must be ignored there', scratch((d) => {
  const tree = join(d, 'tree'); mkdirSync(tree); git(tree, 'init', '-q');
  const distDir = dist(join(tree, 'dist')), data = put(join(d, 'data'));
  refused(run(d, distDir, data), /git-ignored/);
  writeFileSync(join(tree, '.gitignore'), 'dist/\n');
  const ok = run(d, distDir, data);
  assert.equal(ok.status, 0, ok.out);
}));

test('release: refuses a linked output folder', scratch((d) => {
  const distDir = dist(join(d, 'dist')), elsewhere = join(d, 'elsewhere'); mkdirSync(elsewhere);
  symlinkSync(elsewhere, join(distDir, 'dataset'));
  const r = run(d, distDir, put(join(d, 'data')));
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /symbolic link/);
  assert.equal(existsSync(join(elsewhere, 'nfl.json')), false);
}));

test('release: refuses a dist that is not a build', scratch((d) => {
  const empty = join(d, 'dist'); mkdirSync(empty);
  refused(run(d, empty, put(join(d, 'data'))), /index\.html/);
}));

test('release: names a missing data file', scratch((d) => {
  const data = put(join(d, 'data')); rmSync(join(data, 'player-ids.csv'));
  refused(run(d, dist(join(d, 'dist')), data), /player-ids\.csv/);
}));

test('release: refuses a board too small to play', scratch((d) => {
  refused(run(d, dist(join(d, 'dist')), put(join(d, 'data'), dataFiles(ratingsCsv({ qb: 8, other: 200 })))), /1024/);
}));

test('release: missing arguments print usage', () => {
  const r = spawnSync(process.execPath, [TOOL], { encoding: 'utf8' });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /--dist .*--dataset/);
});
