#!/usr/bin/env node
// tools/roster.mjs — the live roster, derived from origin/council/* branches (a seat exists when its branch exists)
// and _agents/RETIRED.txt. No one has to edit a table for a seat to be admitted.   node tools/roster.mjs
import { execFileSync } from 'node:child_process';
const g = (...a) => { try { return execFileSync('git', a, { encoding: 'utf8', maxBuffer: 1 << 26, stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };
g('fetch', '-q', 'origin', '+refs/heads/council/*:refs/remotes/origin/council/*');
const retired = new Set(g('show', 'origin/council/base:_agents/RETIRED.txt').split('\n').filter((l) => l && !l.startsWith('#')));
const refs = g('for-each-ref', '--format=%(refname:short)|%(committerdate:relative)', 'refs/remotes/origin/council').split('\n').filter(Boolean);
console.log('SEAT'.padEnd(14), 'STATE'.padEnd(10), 'LAST PUSH'.padEnd(18), 'LANE FILE');
for (const r of refs) {
  const [ref, when] = r.split('|'); const seat = ref.replace('origin/council/', '');
  if (['base', 'HEAD'].includes(seat) || seat.includes('lane') || seat.startsWith('owner-')) continue;
  const lane = g('ls-tree', '-r', '--name-only', ref, '--', '_agents/').split('\n').find((f) => new RegExp(`/${seat}\\.md$`, 'i').test(f) && !/notes\//.test(f)) || '(none yet)';
  const txt = lane.startsWith('(') ? '' : g('show', `${ref}:${lane}`);
  const st = (txt.match(/\*\*State:\*\*\s*([a-z]+)/i) || [])[1] || 'advisor';
  console.log(seat.padEnd(14), (retired.has(seat) ? 'RETIRED' : st).padEnd(10), when.padEnd(18), lane);
}
console.log(`\nretired (RETIRED.txt): ${[...retired].join(', ')}`);
console.log('Priority/core notes: _agents/README.md (the Owner\'s word, not an admission gate).');
