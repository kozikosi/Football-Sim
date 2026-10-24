#!/usr/bin/env node
// tools/seat-save.mjs <seat> <file.md> [--no-push]
// For seats that cannot run git (chat-only, OpenChamber, web chats). The seat ends its chat by printing ONE text block;
// the Owner (or Beam, as scribe) saves it to a file and runs this command. It writes each file into ../wt/<seat>,
// commits and pushes council/<seat>. Nothing else is touched.
//
// Input format (the seat prints exactly this):
//   === FILE: _agents/<folder>/<SEAT>.md ===
//   ...file text...
//   === FILE: bulletin/20261023-2200-<seat>.md ===
//   ...file text...
//   === END ===
// Allowed paths: _agents/**, bulletin/**, tasks/** . Anything else (AGENTS.md, product files, tools/) is refused.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const [seat, file, ...flags] = process.argv.slice(2);
if (!/^[a-z][a-z0-9-]*$/.test(seat || '') || !file) { console.error('usage: seat-save.mjs <seat> <file.md> [--no-push]'); process.exit(2); }
const g = (cwd, ...a) => execFileSync('git', a, { cwd, encoding: 'utf8' }).trim();
const common = path.resolve(g(process.cwd(), 'rev-parse', '--git-common-dir'));
const wt = path.join(path.dirname(path.dirname(common)), 'wt', seat);
if (!fs.existsSync(path.join(wt, '.git'))) { console.error(`no worktree at ${wt}; create it first: tools/new-seat-worktree.sh ${seat}`); process.exit(1); }
if (g(wt, 'branch', '--show-current') !== `council/${seat}`) { console.error(`worktree is not on council/${seat}`); process.exit(1); }
const text = fs.readFileSync(file, 'utf8');
const parts = text.split(/^=== FILE: (.+?) ===\s*$/m);
const written = [];
for (let i = 1; i < parts.length; i += 2) {
  const rel = parts[i].trim();
  const body = parts[i + 1].replace(/^=== END ===\s*$/m, '').replace(/^\n/, '');
  if (path.isAbsolute(rel) || rel.split('/').includes('..') || !/^(_agents|bulletin|tasks)\//.test(rel)) { console.error(`refused path: ${rel} (allowed: _agents/, bulletin/, tasks/)`); process.exit(3); }
  const dest = path.join(wt, rel); fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.writeFileSync(dest, body.trimEnd() + '\n'); written.push(rel);
}
if (!written.length) { console.error('no "=== FILE: path ===" blocks found'); process.exit(4); }
g(wt, 'add', '--', ...written);
g(wt, 'commit', '-q', '-m', `${seat} session save (chat-only seat, saved by Owner/scribe via tools/seat-save.mjs)`);
const sha = g(wt, 'rev-parse', 'HEAD');
console.log(`committed ${written.length} file(s): ${written.join(', ')}  @ ${sha.slice(0, 8)}`);
if (!flags.includes('--no-push')) { g(wt, 'push', 'origin', `council/${seat}`); console.log(`pushed council/${seat}; verify: git ls-remote origin refs/heads/council/${seat} (expect ${sha})`); }
