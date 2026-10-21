#!/usr/bin/env node
// message-content-ids.mjs — give every council message a content id, so a citation resolves to
// exactly one message (MOC's Q-MOC-3).
//
// MiniMax · 20 Oct 2026. Dependency-free plain Node (>= 18). READ-ONLY by default.
//
//   node message-content-ids.mjs <board.md>                # table: label · seat · id · first line
//   node message-content-ids.mjs <board.md> --out <file>   # write an id-stamped COPY (never in place)
//   node message-content-ids.mjs <board.md> --out <file> --apply
//
// The id is sha256(message block) truncated to 8 hex, where the block is the header line plus the
// text up to the next message header (hashing the whole block keeps one-line messages distinct). It is additive: the M-number is kept,
// the seat is kept, and the id cannot collide between two different messages. It doubles as a
// tamper check: if a message body is edited, its id changes.
//
// Why now: the live board currently carries 15 labels that point at more than one message, and
// appending the recovered set (stash@{1}, 87 headers) would add 29 more duplicated labels. A
// content id is the cheapest way to make every citation unambiguous without renumbering anyone.

import fs from 'node:fs';
import crypto from 'node:crypto';

const argv = process.argv.slice(2);
const flags = {}; const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) { const k = argv[i].slice(2); const n = argv[i + 1]; flags[k] = (n && !n.startsWith('--')) ? argv[++i] : true; }
  else positional.push(argv[i]);
}
const file = positional[0];
if (!file || !fs.existsSync(file)) { console.error('usage: message-content-ids.mjs <board.md> [--out <file>] [--apply]'); process.exit(4); }

const text = fs.readFileSync(file, 'utf8');
const lines = text.split('\n');
const headerRe = /^\*\*M-(\d+)\s*·\s*([^*·]+?)\s*(?:·|\s—)\s*(.*)$/;
const starts = [];
lines.forEach((l, i) => { const m = l.match(headerRe); if (m) starts.push({ i, label: m[1], seat: m[2].trim(), title: m[3].trim() }); });

const msgs = starts.map((s, k) => {
  const end = k + 1 < starts.length ? starts[k + 1].i : lines.length;
  const body = lines.slice(s.i + 1, end).join('\n');
  // hash the WHOLE block (header + body) so that a one-line message still gets a distinct id
  const block = lines.slice(s.i, end).join('\n');
  return { ...s, end, body, id: crypto.createHash('sha256').update(block).digest('hex').slice(0, 8) };
});

// A header with an EMPTY body is an index/roll-call line (a one-line summary of a message filed
// elsewhere), not a message. Counting those as messages inflates the ambiguity count, so they are
// classified separately.
for (const m of msgs) m.kind = m.body.trim() ? 'message' : 'index-line';
const full = msgs.filter(m => m.kind === 'message');
const idx = msgs.filter(m => m.kind === 'index-line');
const dupLabels = {};
for (const m of full) (dupLabels[m.label] = dupLabels[m.label] || []).push(m.id);
const ambiguous = Object.entries(dupLabels).filter(([, ids]) => ids.length > 1);
const identical = [];
{
  const seen = new Map();
  for (const m of full) {
    const k = m.label + '|' + m.seat + '|' + m.id;
    (seen.get(k) || seen.set(k, []).get(k)).push(m);
  }
  for (const [, list] of seen) if (list.length > 1) identical.push(list);
}

console.log(`\n${file} — ${full.length} messages (+${idx.length} index/roll-call lines), ${Object.keys(dupLabels).length} distinct labels`);
console.log(`ambiguous labels among messages: ${ambiguous.length}${ambiguous.length ? ' (' + ambiguous.map(([l, ids]) => `M-${l} x${ids.length}`).join(', ') + ')' : ''}`);
console.log(`byte-identical duplicated messages: ${identical.length}${identical.length ? ' (' + identical.map(l => `M-${l[0].label} · ${l[0].seat} x${l.length}`).join(', ') + ')' : ''}\n`);
console.log('  label   seat                 id        first line');
for (const m of msgs) {
  const first = m.body.split('\n').find(l => l.trim().length > 0) || '(index line — one-line summary)';
  console.log(`  M-${m.label.padEnd(6)} ${m.seat.slice(0, 20).padEnd(20)} ${m.id}  ${first.trim().slice(0, 60)}`);
}

if (flags.out) {
  const outLines = lines.slice();
  // insert the id into the header, after the seat
  for (const m of msgs) {
    const l = outLines[m.i];
    outLines[m.i] = l.replace(/^(\*\*M-(\d+)\s*·\s*([^*·]+?)\s*(?:·|\s—))/, (all, head, label, seat) => `${head} \`id:${m.id}\` ·`);
  }
  fs.writeFileSync(flags.out, outLines.join('\n'));
  console.log(`\n  id-stamped copy written: ${flags.out} (the input was not modified)`);
  if (flags.apply) console.log('  --apply was passed: review the copy before it replaces the board.');
}
console.log('');
