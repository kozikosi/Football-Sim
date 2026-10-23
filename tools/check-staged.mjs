#!/usr/bin/env node
// tools/check-staged.mjs — pre-commit guard for the shared tree. Plain Node, no dependencies.
// Blocks the accidents the council has actually had (a wholesale add that replaced AGENTS.md and
// deleted biome.json; a seat committing the product file). It is a seatbelt, not a lock: the Architect
// or Owner overrides on purpose with  ARCHITECT_OK=1 git commit ...  (honour system, but never silent).
// Enable once per clone/worktree:  git config core.hooksPath tools/hooks
import { spawnSync } from 'node:child_process';
const git = (...a) => spawnSync('git', a, { encoding: 'utf8' }).stdout.trim().split('\n').filter(Boolean);
const rows = git('diff', '--cached', '--name-status', '--no-renames').map((l) => { const [s, ...p] = l.split('\t'); return { s, p: p.join('\t') }; });
const PROTECTED = [/^Football-Sim-.+\.html$/, /^AGENTS\.md$/, /^CLAUDE\.md$/, /^biome\.json$/, /^tools\/(lint|check-staged|check-tasks|build-merged)\./, /^tools\/hooks\//, /^MERGE-MANIFEST\.md$/];
const problems = [];
const ok = process.env.ARCHITECT_OK === '1';
for (const { s, p } of rows) {
  if (!ok && PROTECTED.some((re) => re.test(p))) problems.push(`${s} ${p} — protected: only the Architect/Owner commits this (override: ARCHITECT_OK=1)`);
  if (s === 'D' && !/^_agents\/|^_archive\//.test(p) && process.env.ALLOW_DELETE !== '1') problems.push(`D ${p} — deletion outside your lane (override: ALLOW_DELETE=1, and say why in the message)`);
}
const branch = git('rev-parse', '--abbrev-ref', 'HEAD')[0];
if ((branch === 'main' || branch === 'HEAD') && !ok) problems.push(`you are committing on '${branch}' — use your own worktree/branch (AGENTS.md §4)`);
const added = rows.filter((r) => r.s === 'A').length;
if (added > 40 && process.env.ALLOW_BULK !== '1') problems.push(`${added} files added in one commit — looks like a wholesale add; add by path (override: ALLOW_BULK=1)`);
if (problems.length) { console.error('pre-commit guard (AGENTS.md §4):\n  ' + problems.join('\n  ')); process.exit(1); }
