#!/usr/bin/env node
// Puts the player dataset into a BUILT site, never into git (pre-deployment T1; Owner 25 Nov: stats show on the site, the files stay private).
//
//   node tools/release-assemble.mjs --dist <built folder with index.html> --dataset <private folder> [--log <file>]
//
// The private folder holds madden27-ratings.csv, free-agents-old-ratings.csv and player-ids.csv. Output: <dist>/dataset/nfl.json (format:
// colors/src/boot/dataset-asset.ts). Run it AFTER the build (a build empties dist/) and before the upload.
// Refuses, writing nothing, when: a data file is inside this repo or tracked by any git repo; dist/ is inside a git tree that does not ignore the
// output; the output path is a symbolic link; or the files do not make a playable board.
// Appends one row of hashes (no content, no local paths) to claude/dataset-assets.md.
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { appendFileSync, existsSync, lstatSync, mkdirSync, readFileSync, realpathSync, renameSync, writeFileSync } from 'node:fs';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const FLAG = '--experimental-strip-types';          // needed on Node 22; accepted on Node 24
const SELF = fileURLToPath(import.meta.url);
if (!process.execArgv.includes(FLAG)) {
  const r = spawnSync(process.execPath, [FLAG, SELF, ...process.argv.slice(2)], { stdio: 'inherit' });
  process.exit(r.status ?? 1);
}

const REPO = realpathSync(join(dirname(SELF), '..'));
const FILES = { ratings: 'madden27-ratings.csv', freeAgents: 'free-agents-old-ratings.csv', ids: 'player-ids.csv' };
const USAGE = 'usage: node tools/release-assemble.mjs --dist <built folder> --dataset <private folder> [--log <file>]';

const stop = (why) => { console.error('release-assemble: ' + why); process.exit(1); };
const arg = (name) => { const i = process.argv.indexOf('--' + name); return i > 0 ? process.argv[i + 1] : undefined; };
const within = (root, p) => { const r = relative(root, p); return r !== '..' && !r.startsWith('..' + sep) && !isAbsolute(r); };
const sha256 = (s) => createHash('sha256').update(s).digest('hex');

function git(dir, ...a) {
  const env = { ...process.env, LC_ALL: 'C' };
  delete env.GIT_DIR; delete env.GIT_WORK_TREE;
  const r = spawnSync('git', ['-C', dir, ...a], { encoding: 'utf8', env });
  if (r.error) stop('git could not be run, so nothing can be proven private: ' + r.error.message);
  return r;
}
// Fails closed: any git answer other than "yes" or "no repository here" stops the run.
function inWorkTree(dir) {
  const r = git(dir, 'rev-parse', '--is-inside-work-tree');
  if (r.status === 0) return r.stdout.trim() === 'true';
  if (/not a git repository/i.test(r.stderr)) return false;
  return stop('git could not say whether ' + dir + ' is in a repository: ' + r.stderr.trim());
}
const tracked = (file) => inWorkTree(dirname(file)) && git(dirname(file), 'ls-files', '--error-unmatch', '--', basename(file)).status === 0;

function privateText(dir, name) {
  const asked = resolve(dir, name);
  if (!existsSync(asked)) stop('missing data file: ' + name);
  const real = realpathSync(asked);
  if (within(REPO, real)) stop(name + ' is inside the repo. Keep the data files in a private folder outside it.');
  if (tracked(real) || tracked(asked)) stop(name + ' is tracked by git. Keep the data files out of every repository.');
  try { return new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(readFileSync(real)); }
  catch { return stop(name + ' is not UTF-8 text'); }
}

const distArg = arg('dist'), dataArg = arg('dataset');
if (!distArg || !dataArg) stop(USAGE);
if (!existsSync(join(distArg, 'index.html'))) stop('--dist has no index.html; build the site first');
const dist = realpathSync(distArg);

const texts = Object.fromEntries(Object.entries(FILES).map(([key, name]) => [key, privateText(dataArg, name)]));

const outDir = join(dist, 'dataset'), out = join(outDir, 'nfl.json');
for (const p of [outDir, out]) if (lstatSync(p, { throwIfNoEntry: false })?.isSymbolicLink()) stop(p + ' is a symbolic link');
if (inWorkTree(dist) && git(dist, 'check-ignore', '-q', '--', 'dataset/nfl.json').status !== 0) stop('dist/ is inside a git tree and dataset/nfl.json is not git-ignored there');

const lib = await import(pathToFileURL(join(REPO, 'colors', 'src', 'boot', 'dataset-asset.ts')).href);
let made;
try { made = await lib.buildAsset(texts); } catch (e) { stop('the data files do not make a playable board: ' + e.message); }
const check = await lib.parseAsset(made.text);
if (!check.ok || check.value.hash !== made.dataVersion) stop('the written format did not load back: ' + (check.ok ? 'data version differs' : check.error.message));

mkdirSync(outDir, { recursive: true });
writeFileSync(out + '.partial', made.text);
renameSync(out + '.partial', out);

const hashes = [sha256(made.text), ...Object.keys(FILES).map((k) => sha256(texts[k]))];
const bytes = Buffer.byteLength(made.text);
const log = arg('log') ?? join(REPO, 'claude', 'dataset-assets.md');
if (!existsSync(log)) {
  writeFileSync(log, '# Dataset assets (append-only; written by tools/release-assemble.mjs)\n\n'
    + 'One row per assembled `dataset/nfl.json`. Hashes only: no player data, no local paths, no secrets. Never edit or delete a row.\n\n'
    + '| Assembled (UTC) | dataVersion | asset sha256 | ratings sha256 | free-agents sha256 | ids sha256 | players | asset bytes |\n|---|---|---|---|---|---|---|---|\n');
}
appendFileSync(log, `| ${new Date().toISOString()} | ${made.dataVersion} | ${hashes.join(' | ')} | ${made.players} | ${bytes} |\n`);

console.log(`release-assemble: wrote dataset/nfl.json (${bytes} bytes, ${made.players} players)\n  dataVersion ${made.dataVersion}\n  asset       ${hashes[0]}`);
Object.values(FILES).forEach((n, i) => console.log(`  ${n.padEnd(28)} ${hashes[i + 1]}`));
