#!/usr/bin/env node
// Storage dump harness (w74 item 4g, Z.ai draft) — dump all sim:* keys with sizes, for debugging and verification.
//
// Usage (node, 20+):
//   node tools/dump-storage.mjs storage-export.json        # dump a browser export
//   node tools/dump-storage.mjs storage-export.json --json # machine-readable (evidence packs, bug reports)
//
// Browser export (paste in the game's DevTools console — the one-liner this harness consumes):
//   copy(JSON.stringify(Object.fromEntries(Object.entries(localStorage).filter(([k]) => k.startsWith('sim:')))))
//
// What it prints per key: byte size, the slot the key names (F8's slotOfKey), and for envelope-shaped values the
// sport/kind/saveId/saveRevision/schemaVersion — so a bug report can carry the full storage picture without the
// payloads. P-258 note: with legacy.ts deleted there is no migration use for enumeration left; this harness is
// the remaining need (plus the cache-coherence sweep), exactly as F3 filed it.
import fs from 'node:fs';

const SLOTS = ['A', 'B', 'C'];
const slotOfKey = (key) => { const p = key.split(':'); return p.length >= 4 && p[2] === 'slot' && SLOTS.includes(p[3]) ? p[3] : null; };

const file = process.argv[2];
if (!file) { console.error('usage: node tools/dump-storage.mjs <storage-export.json> [--json]'); process.exit(2); }
const kv = JSON.parse(fs.readFileSync(file, 'utf8'));
if (typeof kv !== 'object' || Array.isArray(kv)) { console.error('not a key/value export'); process.exit(2); }

const bytes = (s) => Buffer.byteLength(s, 'utf8');
const rows = [];
for (const [k, v] of Object.entries(kv)) {
  if (!k.startsWith('sim:')) continue;
  const row = { key: k, bytes: bytes(v), slot: slotOfKey(k), envelope: null, json: null };
  try { const j = JSON.parse(v); row.json = true;
    if (j && typeof j === 'object' && !Array.isArray(j) && 'payload' in j) {
      row.envelope = { sport: j.sport, kind: j.kind, schemaVersion: j.schemaVersion, saveId: j.saveId, saveRevision: j.saveRevision, savedAt: j.savedAt, slot: j.slot };
      // F8 cross-check on the dump: a slot key holding a differently-stamped envelope is the bug this harness exists to catch.
      row.slotMismatch = row.slot && j.slot && row.slot !== j.slot ? `${j.slot} under ${k}` : null;
    }
  } catch { row.json = false; }
  rows.push(row);
}
rows.sort((a, b) => a.key < b.key ? -1 : 1);

if (process.argv.includes('--json')) { console.log(JSON.stringify({ exported: rows.length, totalBytes: rows.reduce((s, r) => s + r.bytes, 0), rows }, null, 2)); process.exit(0); }

console.log(`sim:* storage dump — ${rows.length} keys, ${rows.reduce((s, r) => s + r.bytes, 0).toLocaleString()} bytes total\n`);
for (const r of rows) {
  const env = r.envelope ? ` [${r.envelope.sport}/${r.envelope.kind} rev ${r.envelope.saveRevision} schema ${r.envelope.schemaVersion}]` : (r.json ? ' [json]' : ' [text]');
  const bad = r.slotMismatch ? `  !! SLOT MISMATCH: ${r.slotMismatch}` : '';
  console.log(`${String(r.bytes).padStart(9)}  ${r.key}${r.slot ? ` (slot ${r.slot})` : ''}${env}${bad}`);
}
const mismatched = rows.filter((r) => r.slotMismatch);
if (mismatched.length) { console.error(`\n${mismatched.length} slot-mismatched key(s) — see F8`); process.exit(1); }
