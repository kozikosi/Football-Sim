#!/usr/bin/env node
// tools/preserve.mjs — make "nothing is only on a disk" a command, not a prose rule.
//
//   node tools/preserve.mjs check [--fetch]            report every worktree/stash/commit that exists only locally; exit 1 if any
//   node tools/preserve.mjs snapshot <worktree> <name> [--no-push]
//        capture a worktree's FULL dirty state (tracked changes + untracked, .gitignore respected) as one commit
//        pushed to refs/heads/preserve/<name>, using a TEMPORARY index: the real index, HEAD, branch and files are not touched
//   node tools/preserve.mjs stashes [--no-push]        push every stash commit to preserve/stash-<n>-<sha8> (no pop/apply/drop)
//   node tools/preserve.mjs commits [--no-push]        push every local commit not on any remote to preserve/<branch>-<sha8>
//
// Read-only on working trees. Pushes only to refs/heads/preserve/*. Never main, never another seat's branch.
// Refuses to snapshot files that look like secrets (.env, *.pem, id_rsa*, *secret*, *token*) or any file > 20 MB.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

process.on('uncaughtException', (e) => { console.error(e.refuse ? e.message : `error: ${e.message.split('\n')[0]}`); process.exit(e.refuse ? 3 : 4); });
const [cmd, ...rest] = process.argv.slice(2);
const flag = (f) => rest.includes(f);
const pos = rest.filter((a) => !a.startsWith('--'));
const run = (cwd, ...a) => execFileSync('git', a, { cwd, encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const tryRun = (cwd, ...a) => { try { return run(cwd, ...a); } catch { return null; } };
const here = process.cwd();
const common = path.resolve(here, run(here, 'rev-parse', '--git-common-dir'));
const shared = path.dirname(common);
const lines = (s) => (s ? s.split('\n').filter(Boolean) : []);

function worktrees() {
  const out = []; let cur = null;
  for (const l of lines(run(shared, 'worktree', 'list', '--porcelain')).concat([''])) {
    if (l.startsWith('worktree ')) cur = { path: l.slice(9), branch: null, head: null };
    else if (l.startsWith('HEAD ') && cur) cur.head = l.slice(5);
    else if (l.startsWith('branch ') && cur) cur.branch = l.slice(7).replace('refs/heads/', '');
    else if (l === 'detached' && cur) cur.branch = '(detached)';
    else if (l === 'prunable' && cur) cur.prunable = true;
  }
  // porcelain separates records with blank lines; re-parse simply
  const recs = run(shared, 'worktree', 'list', '--porcelain').split('\n\n').filter(Boolean);
  return recs.map((r) => {
    const o = { path: '', branch: '(detached)', head: '', prunable: false };
    for (const l of r.split('\n')) {
      if (l.startsWith('worktree ')) o.path = l.slice(9);
      else if (l.startsWith('HEAD ')) o.head = l.slice(5);
      else if (l.startsWith('branch ')) o.branch = l.slice(7).replace('refs/heads/', '');
      else if (l.startsWith('prunable')) o.prunable = true;
    }
    return o;
  });
}

const SUSPECT = /(^|\/)(\.env(\..*)?|id_rsa.*|.*\.pem|.*\.key|.*secret.*|.*token.*|.*credentials.*)$/i;
function snapshotTree(wt, { guard = true } = {}) {
  const idx = path.join(os.tmpdir(), `preserve-idx-${process.pid}-${Math.random().toString(36).slice(2)}`);
  const env = { ...process.env, GIT_INDEX_FILE: idx };
  const g = (...a) => execFileSync('git', a, { cwd: wt, env, encoding: 'utf8', maxBuffer: 1 << 28 }).trim();
  try {
    g('read-tree', 'HEAD');
    g('add', '-A', '--', '.');
    if (guard) {
      const bad = [];
      for (const f of lines(g('ls-files'))) {
        const full = path.join(wt, f);
        if (SUSPECT.test(f)) bad.push(`${f} (name looks like a secret)`);
        else if (fs.existsSync(full) && fs.statSync(full).size > 20 * 1024 * 1024) bad.push(`${f} (> 20 MB)`);
      }
      const known = new Set(lines(tryRun(wt, 'ls-tree', '-r', '--name-only', 'HEAD') || ''));
      const risky = bad.filter((b) => !known.has(b.split(' ')[0]));
      if (risky.length) { const e = new Error(`refusing to snapshot:\n  ${risky.join('\n  ')}`); e.refuse = true; throw e; }
    }
    return g('write-tree');
  } finally { fs.rmSync(idx, { force: true }); }
}

function dirtyCount(wt) { return lines(tryRun(wt, 'status', '--short', '-uall') || '').length; }
function unpushedHere(wt) { return lines(tryRun(wt, 'log', 'HEAD', '--not', '--remotes', '--oneline') || ''); }

if (cmd === 'check') {
  if (flag('--fetch')) tryRun(shared, 'fetch', '-q', 'origin', '+refs/heads/preserve/*:refs/remotes/origin/preserve/*', '+refs/heads/council/*:refs/remotes/origin/council/*');
  const covered = new Set();
  for (const r of lines(tryRun(shared, 'for-each-ref', '--format=%(refname)', 'refs/remotes/origin/preserve', 'refs/remotes/origin/council') || '')) {
    const t = tryRun(shared, 'rev-parse', `${r}^{tree}`); if (t) covered.add(`${t} ${r.replace('refs/remotes/', '')}`);
  }
  const treeCover = (t) => { for (const c of covered) if (c.startsWith(t)) return c.split(' ')[1]; return null; };
  let bad = 0;
  console.log('WORKTREE'.padEnd(52), 'BRANCH'.padEnd(34), 'DIRTY', 'UNPUSHED', 'STATUS');
  for (const w of worktrees()) {
    if (w.prunable || !fs.existsSync(w.path)) { console.log(w.path.padEnd(52), '(missing: run git worktree prune)'); continue; }
    const d = dirtyCount(w.path); const u = unpushedHere(w.path).length;
    let status = 'OK';
    if (d) {
      let cov = null; try { cov = treeCover(snapshotTree(w.path, { guard: false })); } catch { /* ignore */ }
      status = cov ? `dirty, snapshot on ${cov}` : 'UNSAVED (dirty)';
    }
    if (u && status === 'OK') status = 'UNSAVED (unpushed commits)';
    else if (u && !status.startsWith('UNSAVED')) status += `; ${u} unpushed commit(s)`;
    if (status.startsWith('UNSAVED')) bad++;
    console.log(w.path.slice(-50).padEnd(52), String(w.branch).slice(0, 32).padEnd(34), String(d).padStart(5), String(u).padStart(8), status);
  }
  const stashes = lines(tryRun(shared, 'stash', 'list', '--format=%gd %H %gs') || '');
  const refs = lines(tryRun(shared, 'for-each-ref', '--format=%(objectname)', 'refs/remotes/origin') || '');
  const remoteShas = new Set(refs);
  let stashBad = 0;
  for (const s of stashes) {
    const [name, sha, ...msg] = s.split(' ');
    const pushed = remoteShas.has(sha) || lines(tryRun(shared, 'branch', '-r', '--contains', sha) || '').length > 0;
    if (!pushed) { stashBad++; console.log(`STASH ${name} ${sha.slice(0, 8)} NOT on any remote: ${msg.join(' ').slice(0, 70)}`); }
  }
  const lonely = lines(tryRun(shared, 'log', '--branches', '--not', '--remotes', '--format=%h %D %s') || '');
  for (const l of lonely.slice(0, 15)) console.log(`LOCAL-ONLY COMMIT ${l.slice(0, 100)}`);
  bad += stashBad + (lonely.length ? 1 : 0);
  console.log(bad ? `\nUNSAVED WORK FOUND (${stashBad} stash(es), ${lonely.length} local-only commit(s), see table). Fix: snapshot / stashes / commits subcommands, then re-run.` : '\nOK: everything is on a remote branch or covered by a preserve/* snapshot.');
  process.exit(bad ? 1 : 0);
} else if (cmd === 'snapshot') {
  const [wtArg, name] = pos;
  if (!wtArg || !/^[A-Za-z0-9._-]+$/.test(name || '')) { console.error('usage: snapshot <worktree-path> <name> [--no-push]'); process.exit(2); }
  const wt = path.resolve(wtArg);
  const tree = snapshotTree(wt);
  const head = run(wt, 'rev-parse', 'HEAD');
  const commit = execFileSync('git', ['commit-tree', tree, '-p', head, '-m', `preserve: full dirty state of ${wt} (${new Date().toISOString()}); parent is its HEAD; working tree untouched`], { cwd: wt, encoding: 'utf8' }).trim();
  console.log(`snapshot commit ${commit} tree ${tree} (parent ${head.slice(0, 8)}), changed files vs HEAD: ${lines(run(wt, 'diff', '--name-only', head, commit)).length}`);
  if (!flag('--no-push')) { run(wt, 'push', 'origin', `${commit}:refs/heads/preserve/${name}`); console.log(`pushed -> refs/heads/preserve/${name}; verify: git ls-remote origin refs/heads/preserve/${name}`); }
} else if (cmd === 'stashes') {
  for (const s of lines(tryRun(shared, 'stash', 'list', '--format=%gd %H') || '')) {
    const [name, sha] = s.split(' ');
    const n = name.match(/\{(\d+)\}/)[1];
    console.log(`${name} ${sha.slice(0, 8)} -> preserve/stash-${n}-${sha.slice(0, 8)}`);
    if (!flag('--no-push')) run(shared, 'push', 'origin', `${sha}:refs/heads/preserve/stash-${n}-${sha.slice(0, 8)}`);
  }
} else if (cmd === 'commits') {
  const seen = new Set();
  for (const w of worktrees()) for (const l of unpushedHere(w.path)) { const sha = l.split(' ')[0]; if (!seen.has(sha)) { seen.add(sha); } }
  for (const l of lines(tryRun(shared, 'log', '--branches', '--not', '--remotes', '--format=%H %D') || '')) seen.add(l.split(' ')[0]);
  const tips = new Map();
  for (const l of lines(tryRun(shared, 'for-each-ref', '--format=%(objectname) %(refname:short)', 'refs/heads') || '')) { const [s, b] = l.split(' '); tips.set(s, b); }
  for (const w of worktrees()) if (w.head) tips.set(w.head, tips.get(w.head) || `detached-${w.head.slice(0, 8)}`);
  for (const [sha, b] of tips) {
    if (!unpushedHere(shared).length && lines(tryRun(shared, 'branch', '-r', '--contains', sha) || '').length) continue;
    if (lines(tryRun(shared, 'branch', '-r', '--contains', sha) || '').length) continue;
    const name = `${b.replace(/[^A-Za-z0-9._-]/g, '-')}-${sha.slice(0, 8)}`;
    console.log(`${sha.slice(0, 8)} (${b}) -> preserve/${name}`);
    if (!flag('--no-push')) run(shared, 'push', 'origin', `${sha}:refs/heads/preserve/${name}`);
  }
} else {
  console.error('usage: preserve.mjs check [--fetch] | snapshot <worktree> <name> [--no-push] | stashes [--no-push] | commits [--no-push]');
  process.exit(2);
}
