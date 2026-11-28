#!/usr/bin/env node
/* gen-state-block.mjs — the S17 A3 "single most transferable idea in the four reviews": the
 * human-readable state block (README top block, ZAI.md state block, the hand-over state paragraph)
 * is GENERATED from the live check-claims results — one line per claim with OK/RED + the command —
 * so green prose is impossible while a claim is RED: the block itself prints the RED lines.
 *
 * Usage:
 *   node scripts/gen-state-block.mjs            regenerate the three blocks in place
 *   node scripts/gen-state-block.mjs --check    verify the on-disk blocks equal the current
 *                                               generation — exit 1 with the drifted doc named
 *
 * The blocks live between GENERATED markers in each doc:
 *   <!-- STATE:BEGIN generated from claims.json — do not edit -->
 *   ...
 *   <!-- STATE:END -->
 *
 * The stateBlocks claim row (claims.json) runs --check; its own row is EXCLUDED from the rendered
 * block (a block cannot contain the verdict of the check that verifies the block — the fixed point).
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BEGIN = '<!-- STATE:BEGIN generated from claims.json — do not edit -->';
const END = '<!-- STATE:END -->';

function claimResults() {
  // CP_CLAIMS_SKIP_STATEBLOCKS breaks the recursion: the stateBlocks claim runs this generator,
  // which runs check-claims — without the skip the inner run would evaluate stateBlocks again,
  // forever (caught live on the first smoke run: the fork table exhausted in ~30 s). The inner
  // run's results feed the RENDERED block, and the rendered block excludes the stateBlocks row by
  // design (a block cannot contain the verdict of the check that verifies it) — so the skip loses
  // nothing and the fixed point holds.
  //
  // A RED run exits 1 — that is not a generator failure, it is exactly the state the block exists
  // to render truthfully (green prose impossible while a claim is RED). execFileSync throws on a
  // non-zero exit, so the results are read from the caught error's stdout.
  let o;
  try {
    o = execFileSync('node', ['scripts/check-claims.mjs'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1024 * 1024 * 8, env: { ...process.env, CP_CLAIMS_SKIP_STATEBLOCKS: '1' } });
  } catch (e) {
    o = String(e.stdout || '');
    if (!o) throw e;
  }
  const claims = JSON.parse(fs.readFileSync(path.join(ROOT, 'claims.json'), 'utf8')).claims;
  const byId = {};
  for (const line of o.split('\n')) {
    const m = line.match(/^(OK|RED|SKIP)\s+\[([^\]]+)\]\s?(.*)$/);
    if (m) byId[m[2]] = { verdict: m[1], detail: m[3] || '' };
  }
  const summary = (o.match(/check-claims: (.*)$/m) || [])[1] || 'unparseable';
  return { claims, byId, summary, raw: o };
}

// item 3 (close-out chain order — DS N2/N3): the GENERATED header used to carry a WALL-CLOCK
// stamp, which changes on every regeneration — the block could never reach a fixed point and the
// freshness discipline could not pin it. The header now carries a CONTENT hash instead: the
// receipt-of-record's log_sha256 from receipt-attestation.json (the same value the attestation
// claim recomputes against ACCEPTANCE-RECEIPTS.txt). Two regenerations over the same state now
// produce BYTE-IDENTICAL blocks; a changed receipt of record moves the stamp by design.
// --check compares full bytes (no stripping needed any more) — the fixed point is the content.
const stateStamp = () => {
  try {
    const att = JSON.parse(fs.readFileSync(path.join(ROOT, 'receipt-attestation.json'), 'utf8'));
    const last = (att.runs || [])[((att.runs || []).length) - 1];
    return last && last.log_sha256 ? `state over ACCEPTANCE-RECEIPTS.txt ${last.log_sha256.slice(0, 16)}…` : 'state over an unsealed receipt of record (no attestation log_sha256 yet)';
  } catch { return 'state over an unsealed receipt of record (no receipt-attestation.json yet)'; }
};

function renderBlock({ claims, byId, summary }) {
  const L = [];
  L.push(BEGIN);
  const renderable = claims.filter((c) => c.kind !== 'stateBlocks');
  const counts = { OK: 0, RED: 0, SKIP: 0 };
  for (const c of renderable) {
    const r = byId[c.id] || { verdict: 'SKIP', detail: 'not in phase full' };
    counts[r.verdict] = (counts[r.verdict] || 0) + 1;
  }
  L.push(`**State of record (${stateStamp()} — from claims.json by \`node scripts/check-claims.mjs\` — ${counts.OK} OK · ${counts.RED} RED · ${counts.SKIP} skipped/not-in-phase across the ${renderable.length} rendered claims, plus 1 self-check row; summary: ${summary}; do not edit — regenerate with \`node scripts/gen-state-block.mjs\`).**`);
  L.push('');
  for (const c of renderable) {
    const r = byId[c.id] || { verdict: 'SKIP', detail: '' };
    const cmd = c.cmd ? ` — ${c.cmd}` : '';
    if (r.verdict === 'OK') L.push(`- OK [${c.id}] ${c.desc}${cmd}`);
    else if (r.verdict === 'RED') L.push(`- **RED [${c.id}]** ${r.detail || c.desc}${cmd} — the prose around this block MUST NOT be read as green while this line is RED`);
    else L.push(`- SKIP [${c.id}] ${r.detail || 'not in phase full'}`);
  }
  L.push(END);
  return L.join('\n');
}

function applyTo(docRel, block) {
  const p = path.join(ROOT, docRel);
  const txt = fs.readFileSync(p, 'utf8');
  const bi = txt.indexOf(BEGIN), ei = txt.indexOf(END);
  if (bi === -1 || ei === -1 || ei < bi) {
    return { changed: false, missing: docRel };
  }
  const next = txt.slice(0, bi) + block + txt.slice(ei + END.length);
  return { changed: next !== txt, next, p };
}

const check = process.argv.includes('--check');
const { claims, byId, summary } = claimResults();
const block = renderBlock({ claims, byId, summary });
const DOCS = ['README.md', 'ZAI.md', 'deliveries/zai-s15-closeout-handover-2026-11-21.md'];
if (check) {
  const drift = [];
  for (const d of DOCS) {
    const p = path.join(ROOT, d);
    const txt = fs.readFileSync(p, 'utf8');
    const bi = txt.indexOf(BEGIN), ei = txt.indexOf(END);
    if (bi === -1 || ei === -1) { drift.push(`${d}: no STATE markers (the generated block is absent)`); continue; }
    const current = txt.slice(bi, ei + END.length);
    if (current !== block) {
      // name the first differing claim line for the receipt (the stamp is content-derived, so the
      // bytes themselves are the fixed point — no stripping, full comparison)
      const a = current.split('\n'), b = block.split('\n');
      let diffAt = 0;
      while (diffAt < Math.max(a.length, b.length) && a[diffAt] === b[diffAt]) diffAt++;
      drift.push(`${d}: block drifts at line ${diffAt + 1} — on disk: ${(a[diffAt] || '').slice(0, 90)} | generated: ${(b[diffAt] || '').slice(0, 90)}`);
    }
  }
  if (drift.length) { for (const d of drift) console.log('STATE-BLOCK DRIFT: ' + d); process.exit(1); }
  console.log('state blocks: current (README.md, ZAI.md, hand-over state paragraph all match the live claim results)');
  process.exit(0);
}
let wrote = 0;
for (const d of DOCS) {
  const r = applyTo(d, block);
  if (r.missing) { console.error(`gen-state-block: ${r.missing} has no STATE markers — add them first`); process.exit(1); }
  if (r.changed) { fs.writeFileSync(r.p, r.next); wrote++; console.log(`gen-state-block: ${d} state block regenerated`); }
  else console.log(`gen-state-block: ${d} already current`);
}
console.log(`gen-state-block: ${wrote} doc(s) updated`);
