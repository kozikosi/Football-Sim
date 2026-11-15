#!/usr/bin/env node
// tools/council.mjs — the whole council protocol in one tool (v11, 10 Nov 2026). Spec: _agents/COUNCIL.md
// v11 (MUSE, council infrastructure owner 10 Nov 2026): the queue file is renamed `_agents/PRIORITIES.md` → `_agents/QUEUE.md` (Owner 2026-11-10; the old name was confusing). `readFrom` now reads `_agents/QUEUE.md`; all references updated. The old `_agents/PRIORITIES.md` is deleted; the old `_agents/QUEUE.md` pointer file is replaced by the queue itself.
// v10 fixes (MUSE, council infrastructure owner 10 Nov 2026): (1) `next` prints the P-item brief for REVIEW items and for the fallback rows — before, REVIEW printed only the file to read and the fallback only ID/status/title, so the reviewer had to grep the 132 KB QUEUE.md to understand the item (P-331). The brief is truncated to 200 chars in `next`; `show <ID>` prints it in full. (2) `next` weights P1 items referenced in the current council prompt above old P0 reviews — before, it sorted by tier only, so old P0 reviews surfaced before current P1 work (P-331). The latest council prompt file (`_agents/muse/deliveries/**/council-prompt-*.md` on origin/council/muse) is read and its P-IDs are boosted to the top of the list, marked ★.
//   node tools/council.mjs next [--seat <s>]     what should this seat do now (default seat = branch name)
//   node tools/council.mjs board                 every live item with its state
//   node tools/council.mjs show <ID>             the item's final spec in one read: work + improved reviews
//   node tools/council.mjs digest                the Architect's start-of-chat read: ready, answers, notes, changes
//   node tools/council.mjs add "<title>" --tier P2|P3 --work "<what the council should produce>"
//   node tools/council.mjs retire <ID...> --why BUILT|SUPERSEDED|DUPLICATE|STALE --evidence "<proof>"
//   node tools/council.mjs revive|keep <ID...> --evidence "<why>"
//   node tools/council.mjs probe <ID> present|absent "<needle>"
//   node tools/council.mjs ask "<question>" --format "<shape of the answer>"
//   node tools/council.mjs ack <inbox file name...>
// Flags: --no-fetch (use refs already fetched), --json (machine output for board/digest).
// The writers only create one file in ./inbox/ (commit + push your branch as usual). Nobody edits a shared file:
// the live queue is DERIVED = QUEUE.md rows + every seat's ops + probes + age. There is no claiming.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

// Continuous-trust reviews (3 Nov 2026): no fixed count per tier. A review's unique-catch rate = NEW/FOUND (its findings no earlier review had).
// Reviews keep coming until the latest one finds <10% new (the governor), but never fewer than `floor` distinct seats and never more than `softCap`.
export const CFG = { floor: 2, softCap: 8, governor: 0.10, staleDays: 21, warnDays: 14, recentDays: 3, ownerNeeds: 2, architect: 'architect' };
const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const val = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
const g = (...a) => { try { return execFileSync('git', a, { encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };

// ---------- pure core (exported for tests) ----------
const ID = /^[A-Z]-[0-9a-z]{3,4}$/;
export const parseTable = (md) => {
  const items = new Map();
  for (const l of md.split(/^## RETIRED/m)[0].split('\n')) {
    const c = l.split('|').map((s) => s.trim());
    if (c.length >= 7 && ID.test(c[1]) && /^P[0-3]$/.test(c[2])) items.set(c[1], { id: c[1], tier: c[2], title: c[3], needs: c[4].match(/[A-Z]-[0-9a-z]{3,4}/g) || [], work: c[5], source: c[6], added: null, retired: null, probes: [], files: [] });
  }
  return items;
};
const hdr = (txt, k) => ((txt.match(new RegExp(`^${k}:\\s*(.+)$`, 'im')) || [])[1] || '').trim();
const stamp = (name) => { const m = name.match(/(\d{8})-(\d{4})-/); return m ? Date.UTC(+m[1].slice(0, 4), +m[1].slice(4, 6) - 1, +m[1].slice(6, 8), +m[2].slice(0, 2), +m[2].slice(2, 4)) : 0; };
// FOUND: <n> findings in the review, NEW: <n> of them no earlier review had. Defaults: ok = 0/0; improved or rejected = 1/1 (counts as a full catch).
const catches = (h) => {
  const v = (hdr(h, 'VERDICT').match(/ok|improved|rejected/i) || [''])[0].toLowerCase(), n = (k) => { const m = hdr(h, k).match(/^\d+/); return m ? +m[0] : null; };
  let found = n('FOUND'), neu = n('NEW');
  if (found === null && neu === null) { found = v === 'ok' || !v ? 0 : 1; neu = found; }
  else if (neu === null) neu = found; else if (found === null) found = neu;
  return { found, neu: Math.min(neu, found) };
};
// file = { name, ref, seat, head }  -> classified record
export const classify = (f) => {
  const base = f.name.split('/').pop(), t = stamp(base), h = f.head;
  const rec = { ...f, base, t, kind: 'work', ids: [] };
  const op = hdr(h, 'OP');
  const forId = (hdr(h, 'FOR').match(/[A-Z]-[0-9a-z]{3,4}/) || [])[0] || (base.match(/-([A-Z]-[0-9a-z]{3,4})-/) || [])[1];
  if (/^(CLAIM)\b/im.test(h) || /-claim\.md$/.test(base)) return { ...rec, kind: 'legacy' };
  if (op) {
    const [verb, rest = ''] = [op.split(/\s+/)[0].toUpperCase(), op.split(/\s+(.*)/s)[1] || ''];
    const parts = rest.split('|').map((s) => s.trim());
    return { ...rec, kind: 'op', verb, arg: parts, id: verb === 'ADD' ? 'N-' + createHash('sha1').update(base).digest('hex').slice(0, 4) : (rest.match(/[A-Z]-[0-9a-z]{3,4}/) || [])[0] };
  }
  if (/^ASK:/im.test(h)) return { ...rec, kind: 'ask', text: hdr(h, 'ASK'), format: hdr(h, 'FORMAT') };
  if (/^ANSWER-OF:/im.test(h)) return { ...rec, kind: 'answer', of: hdr(h, 'ANSWER-OF') };
  if (/^ACK:/im.test(h)) return { ...rec, kind: 'ack', of: hdr(h, 'ACK') };
  if (/^TO-ARCHITECT:/im.test(h)) return { ...rec, kind: 'note', text: hdr(h, 'TO-ARCHITECT') };
  if (/^REVIEW-OF:/im.test(h)) return { ...rec, kind: 'review', id: forId, verdict: (hdr(h, 'VERDICT').match(/ok|improved|rejected/i) || [''])[0].toLowerCase(), ...catches(h) };
  // v9: a CONFIRM: file confirms a claim (it is not new work). Without this it fell through to kind 'work', making the confirmer an author of the item and dropping their review (VL, P-008, 2026-11-06). Work files also carry FOR: — only CONFIRM: (or a -confirm filename) makes a file a note.
  if (/^CONFIRM:/im.test(h) || /-confirm\.md$/.test(base)) return { ...rec, kind: 'note', text: hdr(h, 'CONFIRM') };
  return { ...rec, kind: 'work', id: forId };
};

// state machine: table + records -> live items with status
export const derive = (table, recs, { now = Date.now(), build = null, epoch = 0 } = {}) => {
  const items = new Map([...table].map(([k, v]) => [k, { ...v, files: [], ops: [] }]));
  const sorted = recs.filter((r) => r.kind !== 'legacy').sort((a, b) => a.t - b.t);
  const events = [];
  for (const r of sorted) {
    if (r.kind === 'op' && r.verb === 'ADD') {
      const [tier, title, work] = r.arg;
      if (!items.has(r.id) && /^P[23]$/.test(tier || '') && title) { items.set(r.id, { id: r.id, tier, title, needs: [], work: work || '', source: `council ADD by ${r.seat}`, added: r.t, retired: null, probes: [], files: [], ops: [] }); events.push({ t: r.t, what: `ADD ${r.id} [${tier}] ${title} (by ${r.seat})` }); }
    }
  }
  for (const r of sorted) {
    const it = items.get(r.id); if (!it) continue;
    if (r.kind === 'op' && r.verb !== 'ADD') it.ops.push(r);
    else if (r.kind === 'work' || r.kind === 'review') it.files.push(r);
  }
  for (const it of items.values()) {
    let retiredBy = new Map(), touched = Math.max(epoch, it.added || 0);
    for (const r of it.ops.concat(it.files).sort((a, b) => a.t - b.t)) {
      touched = Math.max(touched, r.t);
      if (r.kind === 'op' && r.verb === 'RETIRE') { retiredBy.set(r.seat, { t: r.t, why: (r.arg[1] || '').toUpperCase(), ev: r.arg[2] || '' }); }
      if (r.kind === 'op' && (r.verb === 'REVIVE' || r.verb === 'KEEP')) { if (r.verb === 'REVIVE') { retiredBy = new Map(); it.retired = null; } }
      if (r.kind === 'op' && r.verb === 'PROBE' && /^(present|absent)$/i.test(r.arg[1] || '') && r.arg[2]) it.probes.push({ mode: r.arg[1].toLowerCase(), needle: r.arg[2] });
    }
    const ownerItem = /^P[01]$/.test(it.tier) && /owner/i.test(it.source);
    const need = ownerItem ? CFG.ownerNeeds : 1;
    const valid = [...retiredBy.entries()].filter(([, v]) => v.ev);
    const arch = valid.find(([s]) => s === CFG.architect);
    if (arch) it.retired = { why: arch[1].why || 'BUILT', by: arch[0], ev: arch[1].ev, t: arch[1].t };
    else if (valid.length >= need) { const [s, v] = valid.at(-1); it.retired = { why: v.why, by: valid.map(([x]) => x).join('+'), ev: v.ev, t: v.t }; }
    else if (valid.length) it.pending = `retire proposed by ${valid.map(([x]) => x).join('+')} (needs ${need}${need > 1 ? ' seats or the Architect' : ''})`;
    it.touched = touched;
    // probes: auto-retire only when every probe passes AND at least one is a 'present' check (absence alone proves nothing)
    if (!it.retired && build && it.probes.length) {
      const ok = it.probes.every((p) => build.includes(p.needle) === (p.mode === 'present'));
      it.probeOk = ok && it.probes.some((p) => p.mode === 'present');
      if (it.probeOk) it.retired = { why: 'BUILT', by: 'probe', ev: `all ${it.probes.length} probe(s) pass on the current build`, t: now };
    }
    const age = (now - touched) / 864e5;
    // v10 (P-331): do not auto-retire when touched is 0 — that means the item has no recorded
    // activity AND no epoch (STALE-EPOCH.txt empty) AND no added date, so its age is unknowable.
    // Before this fix, newly added P2/P3 rows (added: null, no files yet) had touched = 0, age ~20,000
    // days, and were instantly auto-retired STALE on the next board/next run (P-330 and P-331 were
    // both retired this way the day they were filed). A stale item needs evidence of inactivity.
    if (!it.retired && touched > 0 && /^P[23]$/.test(it.tier) && age >= CFG.staleDays) it.retired = { why: 'STALE', by: 'auto', ev: `no activity for ${Math.floor(age)} days; any seat can KEEP or REVIVE`, t: now };
    else if (!it.retired && touched > 0 && /^P[23]$/.test(it.tier) && age >= CFG.warnDays) it.staleIn = Math.ceil(CFG.staleDays - age);
    const works = it.files.filter((x) => x.kind === 'work'), lastWork = works.at(-1), authors = new Set(works.map((x) => x.seat));
    // verdicts survive later work: each seat's LATEST verdict stands (one vote per seat, no double reviews); the author(s) never vote.
    // A rejection is answered by work filed after it; the rejecter may then review again (their new verdict replaces the old one).
    const latest = new Map();
    for (const r of it.files.filter((x) => x.kind === 'review' && !authors.has(x.seat))) latest.set(r.seat, r);
    const verdicts = [...latest.values()].sort((a, b) => a.t - b.t);
    const open = verdicts.filter((r) => r.verdict === 'rejected' && lastWork && r.t >= lastWork.t);   // rejected and not yet answered by new work
    const good = verdicts.filter((r) => r.verdict !== 'rejected');
    const last = good.at(-1), lastRate = last ? (last.found ? last.neu / last.found : 0) : null;
    // reviewers = seats with a standing verdict; an answered rejecter may review again
    it.lastWork = lastWork; it.nrev = good.length; it.authors = [...authors]; it.reviewers = verdicts.filter((r) => r.verdict !== 'rejected' || open.includes(r)).map((r) => r.seat); it.lastReview = last; it.lastRate = lastRate;
    it.capped = good.length >= CFG.softCap;
    it.governed = good.length >= CFG.floor && lastRate !== null && lastRate < CFG.governor;
    it.status = !lastWork ? 'OPEN' : open.length ? 'REWORK' : it.capped || it.governed ? 'REVIEWED' : 'NEEDS-REVIEW';
  }
  const live = (id) => items.get(id) && !items.get(id).retired;
  for (const it of items.values()) {
    it.blocked = it.needs.filter((d) => live(d) && items.get(d).status !== 'REVIEWED');
    const up = it.needs.length && !it.blocked.length;
    it.eff = Math.max(0, +it.tier[1] - (up ? 1 : 0)); it.up = !!up;
  }
  const answered = new Set(sorted.filter((r) => r.kind === 'answer').map((r) => r.of.replace(/^.*\//, '')));
  const acked = new Set(sorted.filter((r) => r.kind === 'ack').map((r) => r.of.replace(/^.*\//, '')));
  return { items, recs: sorted, answered, acked, events };
};

// what to do next for one seat
// v10 (P-331): `state.highlights` is a Set of P-IDs mentioned in the current council prompt (set by loadState; absent in tests → no boost). Highlighted items sort first (before tier), marked ★ in the text.
export const nextFor = (state, me) => {
  const hl = state.highlights || new Set();
  const out = [];
  for (const r of state.recs) if (r.kind === 'ask' && !state.answered.has(r.base) && r.seat !== me) out.push({ score: -1, eff: -1, highlight: 0, text: `ANSWER ${r.base}: ${r.text}${r.format ? `  [format: ${r.format}]` : ''}` });
  for (const it of state.items.values()) {
    if (it.retired || it.blocked.length || it.status === 'REVIEWED') continue;
    const highlight = hl.has(it.id) ? 0 : 1;
    const star = highlight === 0 ? '★ ' : '';
    const brief = (it.work || '').replace(/\s+/g, ' ').trim();
    const briefShort = brief.length > 200 ? brief.slice(0, 200) + '…' : brief;
    if (it.status === 'OPEN' || it.status === 'REWORK') out.push({ score: 1, eff: it.eff, it, highlight, text: `${star}WORK ${it.id} [P${it.eff}${it.up ? '↑' : ''}] ${it.title}\n   BRIEF: ${it.work}` });
    else if (!it.authors.includes(me) && !it.reviewers.includes(me)) out.push({ score: 0, eff: it.eff, it, highlight, text: `${star}REVIEW ${it.id} [P${it.eff}] (${it.nrev} done${it.lastRate === null ? '' : `, last catch ${Math.round(it.lastRate * 100)}%`}; stops at <${CFG.governor * 100}% once ${CFG.floor}+, cap ${CFG.softCap}) ${it.title}\n   READ: ${it.lastWork.ref}:${it.lastWork.name}\n   BRIEF: ${briefShort}  [full brief: node tools/council.mjs show ${it.id}]` });
  }
  return out.sort((a, b) => a.highlight - b.highlight || a.eff - b.eff || a.score - b.score || (a.it?.id || '').localeCompare(b.it?.id || ''));
};

// ---------- git IO ----------
const prefix = 'refs/remotes/origin/';
// v10 (P-331): the P-IDs mentioned in the current council prompt's WORK section. The latest council-prompt file
// (`_agents/muse/deliveries/**/council-prompt-*.md`, dated YYYY-MM-DD in the name) is read from
// origin/council/muse and the P-IDs in its "Work to take" section are returned. Only that section
// counts — the "Recent council work" section names already-reviewed items, and boosting those would
// put old P0 reviews even higher. Empty set when no prompt file is found (or the fetch failed) —
// `next` then behaves exactly as before.
const promptHighlights = () => {
  const files = g('ls-tree', '-r', '--name-only', 'origin/council/muse', '--', '_agents/muse/deliveries/').split('\n').filter((f) => /(^|\/)council-prompt-[^/]*\.md$/.test(f));
  const dated = files.map((f) => { const base = f.split('/').pop(); return { f, d: (base.match(/(\d{4}-\d{2}-\d{2})/) || [])[1] || '' }; }).filter((x) => x.d).sort((a, b) => b.d.localeCompare(a.d));
  if (!dated.length) return new Set();
  const text = g('show', `origin/council/muse:${dated[0].f}`);
  const work = (text.split(/^## Work to take/m)[1] || '').split(/^## /m)[0] || '';
  return new Set((work.match(/\bP-\d{3}\b/g) || []));
};
const loadState = () => {
  // v9: a failed fetch used to be swallowed (g() returns '' on error) and the board was computed from stale refs with no warning. Track it and surface it.
  let fetchOk = true;
  if (!flag('--no-fetch')) {
    try { execFileSync('git', ['fetch', '-q', '--depth=1', 'origin', '+refs/heads/council/*:' + prefix + 'council/*', '+refs/heads/architect/*:' + prefix + 'architect/*'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); } catch { fetchOk = false; }
  }
  const refs = g('for-each-ref', '--format=%(refname:short)', 'refs/remotes/origin/council', 'refs/remotes/origin/architect').split('\n').filter(Boolean);
  const arch = refs.find((r) => r === 'origin/architect/engine-and-seats') || refs.find((r) => /^origin\/architect\//.test(r));   // the Architect's branch by name; any other architect/* only as a fallback
  const onArch = /^architect\//.test(g('branch', '--show-current')); // the Architect's working copy is the newest truth
  const local = (path) => (fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : '');
  // v10 (P-331): read council docs from origin/council/muse FIRST — that is the live queue (MUSE is
  // custodian, Owner 2026-11-09). Before this fix, readFrom read the Architect's branch first, so a
  // council seat running `next`/`board` read the Architect's (stale) QUEUE.md, not the live
  // queue — newly filed items (P-330, P-331) never appeared. Files council/muse lacks (BUILD.txt,
  // STALE-EPOCH.txt) fall through to the Architect's branch, then council/base, then the local file.
  const readFrom = (path) => (onArch && local(path)) || ['origin/council/muse', arch, 'origin/council/base'].filter(Boolean).map((r) => g('show', `${r}:${path}`)).find(Boolean) || local(path);
  const table = parseTable(readFrom('_agents/QUEUE.md'));
  if (!table.size) { console.error('cannot read _agents/QUEUE.md (git fetch origin first)'); process.exit(1); }
  const seen = new Set(), recs = [];
  for (const ref of refs) {
    const seatOf = (n) => (/^origin\/architect\//.test(ref) ? CFG.architect : ref.replace('origin/council/', ''));
    for (const f of g('ls-tree', '-r', '--name-only', ref, '--', 'inbox/').split('\n').filter((x) => /^inbox\/\d{8}-\d{4}-.+\.md$/.test(x))) {
      if (seen.has(f)) continue; seen.add(f);
      const m = f.match(/^inbox\/\d{8}-\d{4}-([a-z0-9]+)-/);
      recs.push(classify({ name: f, ref: ref.replace('origin/', ''), seat: (m && m[1] !== 'architect' ? m[1] : null) || seatOf(), head: g('show', `${ref}:${f}`).split('\n').slice(0, 16).join('\n') }));
    }
  }
  const buildName = (readFrom('_agents/BUILD.txt').split('\n')[0] || '').trim();
  const build = buildName ? (arch ? g('show', `${arch}:${buildName}`) : '') || (fs.existsSync(buildName) ? fs.readFileSync(buildName, 'utf8') : '') : null;
  const epochTxt = (readFrom('_agents/STALE-EPOCH.txt').split('\n')[0] || '').trim();
  const st = derive(table, recs, { build: build || null, epoch: epochTxt ? Date.parse(epochTxt) || 0 : 0 });
  st.fetchOk = fetchOk; st.refCount = refs.length;
  st.highlights = promptHighlights();   // v10 (P-331): P-IDs in the current council prompt, boosted in `next`
  return st;
};

// ---------- writers ----------
const mySeat = () => val('--seat') || (g('branch', '--show-current').match(/^(?:council|architect)\/(.+)$/) || [])[0]?.replace(/^council\//, '').replace(/^architect\/.*/, CFG.architect) || 'seat';
const utc = () => new Date().toISOString().replace(/[-:]/g, '').replace(/T(\d{4}).*/, '-$1');
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30).replace(/^-|-$/g, '') || 'x';
const put = (kind, body) => { fs.mkdirSync('inbox', { recursive: true }); const p = `inbox/${utc()}-${mySeat()}-${kind}.md`; if (fs.existsSync(p)) { console.error('exists: ' + p); process.exit(1); } fs.writeFileSync(p, body + '\n'); console.log('wrote ' + p + '  (commit and push your branch)'); };

// ---------- commands ----------
const cmd = args[0], pos = args.slice(1).filter((a, i, arr) => !a.startsWith('--') && !(arr[i - 1] || '').startsWith('--'));
const age = (t) => `${Math.max(0, Math.floor((Date.now() - t) / 36e5))}h`;
// Entry guard (v9): macOS /tmp is a symlink to /private/tmp, so import.meta.url resolves the real path while process.argv[1] keeps the invoked path — the old string comparison never fired and the tool exited silently with no output. Compare realpaths instead. When imported as a module (tests), argv[1] is a different file and main() does not run.
const isMain = (() => { try { return pathToFileURL(fs.realpathSync(process.argv[1])).href === import.meta.url; } catch { return false; } })();
if (isMain) main();
function main() {
  if (cmd === 'add') { const tier = val('--tier') || 'P2'; if (!/^P[23]$/.test(tier)) { console.error('seats add P2 or P3 items (P0/P1 are the Owner\'s)'); process.exit(1); } put(`OP-add-${slug(pos[0] || '')}`, `OP: ADD | ${tier} | ${pos[0]} | ${val('--work') || ''}`); }
  else if (cmd === 'retire') { const ids = pos; const why = (val('--why') || '').toUpperCase(), ev = val('--evidence'); if (!ids.length || !/^(BUILT|SUPERSEDED|DUPLICATE|STALE)$/.test(why) || !ev) { console.error('usage: retire <ID...> --why BUILT|SUPERSEDED|DUPLICATE|STALE --evidence "<proof: commit, file, command>"'); process.exit(1); } for (const id of ids) put(`OP-retire-${id}`, `OP: RETIRE ${id} | ${why} | ${ev}`); }
  else if (cmd === 'revive' || cmd === 'keep') { for (const id of pos) put(`OP-${cmd}-${id}`, `OP: ${cmd.toUpperCase()} ${id} | ${val('--evidence') || ''}`); }
  else if (cmd === 'probe') { put(`OP-probe-${pos[0]}`, `OP: PROBE ${pos[0]} | ${pos[1]} | ${pos[2]}`); }
  else if (cmd === 'ask') { put(`ASK-${slug(pos[0] || '')}`, `ASK: ${pos[0]}\nFORMAT: ${val('--format') || 'short table or list with sources; label VERIFIED/REPORTED/INFERRED/UNKNOWN'}`); }
  else if (cmd === 'ack') { for (const f of pos) put(`ACK-${slug(f).slice(0, 20)}`, `ACK: ${f.replace(/^.*\//, '')}`); }
  else if (cmd === 'next') {
    const st = loadState(), me = mySeat(), list = nextFor(st, me);
    console.log(`NEXT FOR ${me}: nobody is assigned; take the first line. Refused work is fine (no claims); you may also ADD/RETIRE/KEEP items (tools/council.mjs --help in the header).`);
    if (!st.fetchOk) console.log('WARNING: git fetch failed — refs may be stale (run with --no-fetch to use local refs, or fetch manually).');
    if (!list.length) {
      console.log('Nothing open or awaiting you. Run the standing chore: look for dead items (node tools/council.mjs board) and RETIRE any you can prove built or superseded.');
      // v9: never print nothing useful — fall back to the top open PRIORITIES rows so a seat always has a next step.
      // v10 (P-331): the fallback rows now print the brief too (truncated), so a seat need not grep QUEUE.md.
      const open = [...st.items.values()].filter((i) => !i.retired).sort((a, b) => a.eff - b.eff || a.id.localeCompare(b.id)).slice(0, 5);
      if (open.length) { console.log('\nTop open PRIORITIES rows (fallback — derived list empty):'); for (const i of open) { const b = (i.work || '').replace(/\s+/g, ' ').trim(); console.log(`  ${i.id} [P${i.eff}] ${i.status}  ${i.title.slice(0, 90)}`); if (b) console.log(`     BRIEF: ${b.length > 120 ? b.slice(0, 120) + '…' : b}`); } }
    }
    for (const x of list.slice(0, 6)) console.log('\n' + x.text);
    const dead = [...st.items.values()].filter((i) => i.retired && i.retired.by === 'auto' && Date.now() - i.retired.t < 864e5 * 0);
    void dead;
  }
  else if (cmd === 'board') {
    const st = loadState();
    if (!st.fetchOk) console.log('WARNING: git fetch failed — board may be stale (run with --no-fetch to use local refs, or fetch manually).');
    if (flag('--json')) { console.log(JSON.stringify([...st.items.values()].map(({ files, ops, ...i }) => i), null, 1)); process.exit(0); }
    const live = [...st.items.values()].filter((i) => !i.retired).sort((a, b) => a.eff - b.eff || a.id.localeCompare(b.id));
    console.log(`BOARD: ${live.length} live, ${st.items.size - live.length} retired, review governor: ${CFG.floor}+ reviews, stop when the last finds <${CFG.governor * 100}% new, cap ${CFG.softCap}`);
    for (const i of live) console.log(`${i.blocked.length ? `BLOCKED(${i.blocked.join(',')}) ` : ''}${i.id} [P${i.eff}${i.up ? '↑' : ''}] ${i.status}${i.status === 'NEEDS-REVIEW' ? ` ${i.nrev} done${i.lastRate === null ? '' : `, last catch ${Math.round(i.lastRate * 100)}%`}` : ''}${i.staleIn ? ` (auto-retires in ${i.staleIn}d unless kept)` : ''}${i.pending ? ` (${i.pending})` : ''}  ${i.title.slice(0, 90)}`);
  }
  else if (cmd === 'show') {
    const st = loadState(), it = st.items.get(pos[0]); if (!it) { console.error('no such item'); process.exit(1); }
    console.log(`${it.id} [${it.tier}] ${it.status}${it.retired ? ` — RETIRED ${it.retired.why} by ${it.retired.by}: ${it.retired.ev}` : ''}\n${it.title}\nOWNER/COUNCIL BRIEF: ${it.work}\nSOURCE: ${it.source}\n`);
    const show = (r, label) => { console.log(`----- ${label}: ${r.ref}:${r.name}`); console.log(g('show', `origin/${r.ref}:${r.name}`)); };
    if (it.lastWork) show(it.lastWork, `WORK by ${it.lastWork.seat}`);
    for (const r of it.files.filter((x) => x.kind === 'review' && x.t >= (it.lastWork?.t || 0))) show(r, `REVIEW ${r.verdict} by ${r.seat}`);
  }
  else if (cmd === 'digest') {
    const st = loadState(), items = [...st.items.values()], now = Date.now();
    const ready = items.filter((i) => !i.retired && i.status === 'REVIEWED' && !i.blocked.length).sort((a, b) => a.eff - b.eff);
    const myAsks = st.recs.filter((r) => r.kind === 'ask' && r.seat === CFG.architect);
    const answers = st.recs.filter((r) => r.kind === 'answer' && myAsks.some((a) => a.base === r.of.replace(/^.*\//, '')) && !st.acked.has(r.base));
    const open = myAsks.filter((a) => !st.answered.has(a.base));
    const notes = st.recs.filter((r) => r.kind === 'note' && !st.acked.has(r.base));
    const recent = st.recs.filter((r) => r.kind === 'op' && now - r.t < CFG.recentDays * 864e5 && r.seat !== CFG.architect);
    const auto = items.filter((i) => i.retired && i.retired.by !== CFG.architect && now - (i.retired.t || 0) < 864e5 && (i.retired.by === 'auto' || i.retired.by === 'probe'));
    const warn = items.filter((i) => !i.retired && i.staleIn);
    const tobuild = items.filter((i) => !i.retired && i.status === 'NEEDS-REVIEW' && i.nrev >= 1).length;
    if (flag('--json')) { console.log(JSON.stringify({ ready: ready.map((i) => i.id), answers: answers.map((r) => r.base), notes: notes.map((r) => r.base) })); process.exit(0); }
    console.log(`COUNCIL DIGEST (${new Date().toISOString().slice(0, 16)}Z): ${ready.length} ready to build · ${answers.length} answers · ${notes.length} notes to you · ${open.length} of your asks pending · ${tobuild} awaiting last review`);
    const sec = (t, a, cap = 15) => a.length && console.log(`\n${t}\n` + a.slice(0, cap).map((x) => '  ' + x).join('\n') + (a.length > cap ? `\n  ... +${a.length - cap} more (node tools/council.mjs board)` : ''));
    sec('READY TO BUILD (reviewed; `node tools/council.mjs show <ID>` prints the final spec; when built: retire <ID> --why BUILT --evidence <hash>)', ready.map((i) => `${i.id} [P${i.eff}${i.up ? '↑' : ''}] ${i.title.slice(0, 90)}`));
    sec('ANSWERS TO YOUR ASKS (read, use, then `ack <file>`)', answers.map((r) => `${r.ref}:${r.name}`));
    sec('NOTES TO YOU (`ack <file>` when handled)', notes.map((r) => `${r.seat}: ${r.text.slice(0, 100)}  [${r.ref}:${r.name}]`));
    sec('SEAT CHANGES, LAST ' + CFG.recentDays + ' DAYS (informational; `revive <ID>` undoes any)', recent.map((r) => `${r.verb} ${r.id || ''} ${(r.arg || []).join(' | ').slice(0, 100)} (${r.seat}, ${age(r.t)} ago)`));
    sec('AUTO-RETIRED TODAY (STALE or probe-verified)', auto.map((i) => `${i.id} ${i.retired.why}: ${i.title.slice(0, 70)}`));
    sec(`ABOUT TO AUTO-RETIRE (any seat can \`keep\`)`, warn.map((i) => `${i.id} in ${i.staleIn}d: ${i.title.slice(0, 70)}`));
    sec('YOUR OPEN ASKS (do not research these yourself)', open.map((a) => `${a.base}: ${a.text.slice(0, 100)}`));
    console.log('\nBuilding is your job. Research, statistics and "find every occurrence" go to the council: `node tools/council.mjs ask "<question>"`, or a subagent for in-repo exploration. Never web-search facts the council can fetch.');
  }
  else { console.log(fs.readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(1, 16).join('\n')); }
}
