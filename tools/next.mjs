#!/usr/bin/env node
// tools/next.mjs — "what should I do next?" for ANY seat. Work is never assigned to a named agent (AGENTS.md §1).
//   node tools/next.mjs [--seat <name>] [--board]       (default seat = current branch council/<seat>)
// Reads the ranked list (_agents/PRIORITIES.md on origin/council/base) and every seat's inbox/ files on origin/council/*.
// Chain per item: WORK (1 seat) -> REVIEW by 3 different seats (each may improve it) -> "REVIEWED x3" -> the Architect builds it.
// Next action for you = highest effective tier; a review you can do beats new work in the same tier.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
const REVIEWS_NEEDED = 3, TTL_H = { P0: 24, P1: 72, P2: 72, P3: 72 };
const args = process.argv.slice(2);
const g = (...a) => { try { return execFileSync('git', a, { encoding: 'utf8', maxBuffer: 1 << 27, stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };
const val = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
g('fetch', '-q', 'origin', '+refs/heads/council/*:refs/remotes/origin/council/*');
const me = val('--seat') || g('branch', '--show-current').replace(/^council\//, '');
const prio = g('show', 'origin/council/base:_agents/PRIORITIES.md') || (fs.existsSync('_agents/PRIORITIES.md') ? fs.readFileSync('_agents/PRIORITIES.md', 'utf8') : '');
if (!prio) { console.error('cannot read _agents/PRIORITIES.md (git fetch origin first)'); process.exit(1); }
const items = new Map();
for (const l of prio.split('\n')) {
  const c = l.split('|').map((s) => s.trim());
  if (c.length >= 7 && /^[A-Z]-\d{3}$/.test(c[1]) && /^P[0-3]$/.test(c[2])) items.set(c[1], { id: c[1], tier: c[2], title: c[3], needs: (c[4].match(/[A-Z]-\d{3}/g) || []), work: c[5], source: c[6], files: [], status: '' });
}
const alias = new Map(); for (const it of items.values()) for (const a of it.source.match(/QUEUE-\d+|Q-V23-\d+/g) || []) alias.set(a, it.id);
const canon = (s) => { if (!s) return null; const m = s.match(/[A-Z]-\d{3}/); if (m && items.has(m[0])) return m[0]; const a = s.match(/QUEUE[- ]?(\d+)|Q-V23-(\d+)/i); if (!a) return null; return alias.get(a[1] ? `QUEUE-${a[1]}` : `Q-V23-${a[2]}`) || null; };
// collect inbox files across seat branches
const files = new Map(); // name -> {ref, seat, t, head}
const misfiled = [];
for (const ref of g('for-each-ref', '--format=%(refname:short)', 'refs/remotes/origin/council').split('\n').filter(Boolean)) {
  for (const f of g('ls-tree', '-r', '--name-only', ref).split('\n').filter((x) => /^(_agents\/[^/]+\/inbox\/|inbox\/[^/]+\/)/.test(x))) misfiled.push(`${ref.replace('origin/', '')}:${f}`);
  for (const f of g('ls-tree', '-r', '--name-only', ref, '--', 'inbox/').split('\n').filter(Boolean)) {
    const m = f.match(/inbox\/(\d{8})-(\d{4})-([a-z0-9]+)-?(.*)\.md$/);
    if (!m || files.has(f)) continue;
    const t = Date.UTC(+m[1].slice(0, 4), +m[1].slice(4, 6) - 1, +m[1].slice(6, 8), +m[2].slice(0, 2), +m[2].slice(2, 4));
    const head = g('show', `${ref}:${f}`).split('\n').slice(0, 14).join('\n');
    const id = canon(m[4]) || canon((head.match(/^FOR:\s*(.+)$/im) || [])[1]);
    if (!id) continue;
    const verdict = (head.match(/^VERDICT:\s*(ok|improved|rejected)/im) || [])[1] || '';
    const kind = /^REVIEW-OF:/im.test(head) ? 'review' : (/^CLAIM:/im.test(head) || /claim$/.test(m[4])) ? 'claim' : 'work';
    files.set(f, { f, ref: ref.replace('origin/', ''), seat: m[3], id, t, kind, verdict });
  }
}
for (const x of files.values()) items.get(x.id)?.files.push(x);
const now = Date.now();
for (const it of items.values()) {
  const fs_ = it.files.sort((a, b) => a.t - b.t);
  const works = fs_.filter((x) => x.kind === 'work'); const lastWork = works.at(-1);
  const after = lastWork ? fs_.filter((x) => x.kind === 'review' && x.t >= lastWork.t) : [];
  const rejected = after.some((x) => x.verdict === 'rejected');
  const good = new Map(); for (const r of after) if (r.verdict !== 'rejected' && r.seat !== lastWork.seat) good.set(r.seat, r);
  it.author = lastWork?.seat; it.lastWork = lastWork; it.reviewers = [...good.keys()]; it.nrev = good.size;
  const claim = fs_.filter((x) => x.kind === 'claim').at(-1);
  const claimLive = claim && now - claim.t < TTL_H[it.tier] * 36e5 && (!lastWork || claim.t > lastWork.t);
  it.claimer = claimLive ? claim.seat : null;
  it.status = !lastWork ? (claimLive ? 'CLAIMED' : 'OPEN') : rejected ? 'REWORK' : it.nrev >= REVIEWS_NEEDED ? 'REVIEWED' : 'NEEDS-REVIEW';
}
const done = (id) => items.get(id)?.status === 'REVIEWED';
const rank = (t) => +t[1];
for (const it of items.values()) {
  it.blocked = it.needs.filter((d) => !done(d));
  const upgraded = it.needs.length && !it.blocked.length;
  it.eff = Math.max(0, rank(it.tier) - (upgraded ? 1 : 0)); it.upgraded = upgraded;
}
const line = (it) => `${it.id} [P${it.eff}${it.upgraded ? '↑' : ''}] ${it.status}${it.status === 'NEEDS-REVIEW' ? ` ${it.nrev}/${REVIEWS_NEEDED}` : it.status === 'REVIEWED' ? ' ✓✓✓ (ready for the Architect)' : ''}${it.claimer ? ` (claimed by ${it.claimer})` : ''}  ${it.title}`;
if (args.includes('--board')) {
  console.log(`BOARD (${items.size} items; reviews needed: ${REVIEWS_NEEDED}; branches read: ${new Set([...files.values()].map((x) => x.ref)).size})`);
  for (const it of [...items.values()].sort((a, b) => a.eff - b.eff || a.id.localeCompare(b.id))) console.log((it.blocked.length ? 'BLOCKED(' + it.blocked.join(',') + ') ' : '') + line(it));
  notice(); process.exit(0);
}
const mine = [];
for (const it of items.values()) {
  if (it.blocked.length || it.status === 'REVIEWED') continue;
  if (['OPEN', 'REWORK'].includes(it.status) || (it.status === 'CLAIMED' && it.claimer === me)) mine.push({ it, action: it.status === 'CLAIMED' ? 'CONTINUE your claim' : 'WORK', score: 1 });
  else if (it.status === 'NEEDS-REVIEW' && it.author !== me && !it.reviewers.includes(me)) mine.push({ it, action: `REVIEW #${it.nrev + 1} of ${REVIEWS_NEEDED}: read ${it.lastWork.ref}:${it.lastWork.f}`, score: 0 });
}
mine.sort((a, b) => a.it.eff - b.it.eff || a.score - b.score || a.it.id.localeCompare(b.it.id));
function notice() { if (misfiled.length) console.log(`\nNOTICE: ${misfiled.length} file(s) sit in a per-seat or nested inbox (e.g. ${misfiled.slice(0, 2).join(', ')}). They are IGNORED here. Work is never addressed to a seat: put work in top-level inbox/ on your own branch (inbox/README.md).`); }
console.log(`NEXT FOR ${me || '(unknown seat)'}: top of the list, nobody is assigned. Pick the first line; claim it first (AGENTS.md §5).`);
if (!mine.length) console.log('Nothing open or awaiting your review. Run standing chores (AGENTS.md §5) or --board.');
for (const { it, action } of mine.slice(0, 6)) console.log(`\n${line(it)}\n   ACTION: ${action}\n   BRIEF:  ${it.work}`);
notice();
console.log('\nHow: claim = file inbox/<UTC>-<you>-<ID>-claim.md with "CLAIM: <ID>"; work = inbox/<UTC>-<you>-<ID>-<slug>.md; review = inbox/<UTC>-<you>-<ID>-review.md with "REVIEW-OF: <file>" and "VERDICT: ok|improved|rejected" (+ the improved text). Push your branch.');
