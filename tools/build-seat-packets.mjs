#!/usr/bin/env node
// tools/build-seat-packets.mjs [--ref <git ref>] [--check]
// Builds _agents/seats/packets/PACKET-<SEAT>.md for every seat in _agents/seats/seats.json from ONE template (seat-template.md),
// _agents/seats/STATE.md and the rows of _agents/PRIORITIES.md named on STATE.md's FOCUS line. Attach-mode seats (no GitHub)
// also get BUNDLE-<SEAT>.md = the packet + every file they need, concatenated, so the Owner attaches ONE file.
// --check rebuilds in memory and fails (exit 1) if a committed packet is stale, a placeholder is unresolved, a packet exceeds its
// size budget, a focus ID is missing from PRIORITIES.md, or a file named in seats.json "files" does not exist.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const args = process.argv.slice(2), check = args.includes('--check');
const ref = args.includes('--ref') ? args[args.indexOf('--ref') + 1] : 'council/base';
const R = p => path.join(root, p), rd = p => fs.readFileSync(R(p), 'utf8');
const git = (...a) => { try { return execFileSync('git', a, { cwd: root, encoding: 'utf8' }).trim(); } catch { return ''; } };
const seats = JSON.parse(rd('_agents/seats/seats.json'));
const tpl = rd('_agents/seats/seat-template.md');
const stateRaw = rd('_agents/seats/STATE.md');
const commit = git('rev-parse', '--short=8', 'HEAD') || 'unknown';
const built = process.env.PACKET_BUILT || (check ? null : new Date().toISOString().replace(/:\d\d\.\d+Z$/, 'Z'));
const RAW = `https://raw.githubusercontent.com/kozikosi/football-sim/${ref}`;
const PACKET_MAX = 18000, BUNDLE_MAX = 110000;
const problems = [];
const fail = m => problems.push(m);

// ---- STATE: strip the header line, keep the rest ----
const state = stateRaw.split('\n').filter(l => !l.startsWith('# STATE')).join('\n').trim();
const focusLine = (stateRaw.match(/^FOCUS:\s*(.+)$/m) || [])[1] || '';
const focusIds = focusLine.split(/[\s,]+/).filter(x => /^P-\d+$/.test(x));
if (!focusIds.length) fail('STATE.md has no FOCUS: line with P-ids');

// ---- PRIORITIES rows (| ID | Tier | Title | Needs | Council work | Source |) ----
const prio = {}; rd('_agents/PRIORITIES.md').split('\n').forEach(l => {
  const m = l.match(/^\| (P-\d+) \| (P\d) \| (.*)$/); if (!m) return;
  const cells = m[3].split(' | '); prio[m[1]] = { tier: m[2], title: cells[0], needs: (cells[1] || '').trim(), work: (cells[2] || '').trim() };
});
const focusRows = focusIds.map(id => {
  const r = prio[id]; if (!r) { fail(`focus ${id} not found in PRIORITIES.md`); return `- ${id}: MISSING`; }
  const needs = r.needs ? ` _(after ${r.needs})_` : '';
  return `- **${id}** · ${r.tier} · ${r.title}${needs}\n  ${r.work}`;
}).join('\n');

const link = p => `${RAW}/${p}`;
function filesTable(seat) {
  const rows = (seat.files || []).map(f => {
    if (!fs.existsSync(R(f.path))) fail(`${seat.name}: listed file missing: ${f.path}`);
    return seat.mode === 'attach' ? `| \`${f.path}\` | ${f.why} | appended below in this bundle |` : `| \`${f.path}\` | ${f.why} | ${link(f.path)} |`;
  });
  return '| File | Why | Where |\n|---|---|---|\n' + rows.join('\n') +
    (seat.mode === 'attach' ? '\n\nYou cannot read GitHub. Everything above is appended below. If you need something that is not, name it in your reply.'
      : `\n\nFetch order, stop at the first that works: (1) the link above; (2) \`https://github.com/kozikosi/football-sim/raw/${ref}/<path>\`; (3) \`git init -q x && cd x && git remote add origin https://github.com/kozikosi/football-sim && git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch --depth 1 origin ${ref}\` then \`git show FETCH_HEAD:<path>\` (**never fetch \`main\`: it is about 150 MB; this branch is about 8 MB**); (4) ask the Owner to attach the file. Raw-link reachability from your sandbox is UNVERIFIED.`);
}
function resume(key, seat) {
  if (seat.mode === 'attach') return `Your resume card is your lane file \`${seat.lane}\`. The Owner attaches your latest one as \`${path.basename(seat.lane)}\` (the file you returned last chat). **If none is attached, you are new or it was lost: say so in your first reply and start from §4.** Write it fresh at the end of this chat (§6).`;
  return `Your resume card is your lane file \`${seat.lane}\` on branch \`${seat.branch}\`: fetch it with the same method as §7 (\`${RAW.replace(ref, seat.branch)}/${seat.lane}\`). It is rewritten from your RETURN BLOCK each chat, so it can lag by one chat: **a card newer than your own memory of the last chat beats this packet's STATE; this packet beats an older card.** If none exists, you are new: say so and start from §4.`;
}

function build(key, seat) {
  const map = { NAME: seat.name, ROLE: seat.role, BUILT: built, REF: ref, COMMIT: commit, BRANCH: seat.branch, LANE: seat.lane, AUTHORITY: seat.authority, REACH: seat.reach,
    RETURN_VIA: seat.returnVia, SEAT: key, STATE: state, RESUME: resume(key, seat), FOCUS_ROWS: focusRows, FILES_TABLE: filesTable(seat) };
  let out = tpl; Object.entries(map).forEach(([k, v]) => { out = out.split(`{{${k}}}`).join(v); });
  const left = out.match(/\{\{[A-Z_]+\}\}/g); if (left) fail(`${seat.name}: unresolved ${left.join(',')}`);
  return out;
}
function bundle(key, seat, packet) {
  let out = packet + '\n\n---\n# FILES APPENDED FOR YOU (you cannot read GitHub)\n';
  (seat.files || []).forEach(f => { if (fs.existsSync(R(f.path))) out += `\n\n=========== FILE: ${f.path} ===========\n` + rd(f.path); });
  return out;
}

const outDir = R('_agents/seats/packets'); fs.mkdirSync(outDir, { recursive: true });
const results = {};
Object.entries(seats).filter(([k]) => !k.startsWith('_')).forEach(([key, seat]) => {
  const p = build(key, seat); results[`PACKET-${key.toUpperCase()}.md`] = p;
  if (p.length > PACKET_MAX) fail(`${seat.name}: packet ${p.length} B > ${PACKET_MAX}`);
  if (seat.mode === 'attach') { const b = bundle(key, seat, p); results[`BUNDLE-${key.toUpperCase()}.md`] = b; if (b.length > BUNDLE_MAX) fail(`${seat.name}: bundle ${b.length} B > ${BUNDLE_MAX}`); }
});

if (check) {
  Object.entries(results).forEach(([name, text]) => {
    const f = path.join(outDir, name); if (!fs.existsSync(f)) return fail(`${name} not built`);
    const norm = s => s.replace(/BUILT \S+ · from `[^`]*` @ `[^`]*`/, 'BUILT x');
    if (norm(fs.readFileSync(f, 'utf8')) !== norm(text)) fail(`${name} is stale (inputs changed since it was built): rebuild`);
  });
} else {
  Object.entries(results).forEach(([name, text]) => fs.writeFileSync(path.join(outDir, name), text));
  fs.writeFileSync(path.join(outDir, 'PROMPTS.md'), `# Prompts the Owner pastes (generated ${built}, ref ${ref})\nOne short prompt per seat per chat.\n\n` + Object.entries(seats).filter(([k]) => !k.startsWith('_')).map(([k, v]) => `## ${v.name}\n\n\`\`\`\n${v.starter.split('{{RAW}}').join(RAW)}\n\`\`\`\n` + (v.mode === 'attach' ? `Attach: BUNDLE-${k.toUpperCase()}.md` + (k === 'gpt' ? ', your latest GPT.md lane file if you have one,' : '') + ' and the latest HTML build.\n' : 'No attachment needed.\n')).join('\n'));
  fs.writeFileSync(path.join(outDir, 'INDEX.md'), `# Seat packets (generated ${built}, ref ${ref} @ ${commit})\n\n` + Object.entries(results).map(([n, t]) => `- \`${n}\` ${t.length} B`).join('\n') + '\n\nGit-read seats read PACKET-<SEAT>.md. Attach-mode seats get BUNDLE-<SEAT>.md (one file) plus the latest HTML build.\n');
  console.log('built:', Object.entries(results).map(([n, t]) => `${n} ${t.length} B`).join(' · '));
}
if (problems.length) { problems.forEach(p => console.log('FAIL', p)); console.log('build-seat-packets: FAIL ' + problems.length); process.exit(1); }
console.log(check ? 'build-seat-packets --check: OK' : 'build-seat-packets: OK');
