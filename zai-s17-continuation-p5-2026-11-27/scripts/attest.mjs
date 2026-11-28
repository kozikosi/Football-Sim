#!/usr/bin/env node
/* attest.mjs — the acceptance-run attestation + --resume ledger (the S17 continuation, A1/A3).
 *
 * WHY: the 2026-11-24 sitting's composite died mid-step-13b and ACCEPTANCE-RECEIPTS.txt kept the
 * honest partial tail — but four seats then found the generated SHELL-STATUS still claiming the
 * run "COMPLETE". Three fixes land here:
 *
 *   1. THE LEDGER — deliveries/receipts/acceptance-ledger.json (the RECEIPT LAYER, deliberately
 *      unsealed): one record per run — command, mode, per-step entries (name, command, block
 *      sha256, exit code, reused flag), tree_sha_start, and at finish the terminal state +
 *      log_sha256 + tree_sha_end. The resume machinery reads THIS file. It lives in the receipt
 *      layer because it REWRITES AFTER EVERY STEP — a file that changes per step can never carry a
 *      stable seal (the real composite proved it 2026-11-25: step 14 sealed the attestation's
 *      bytes, step 15's own entry rewrote them, gate-manifest honestly FAILED on the drift, the
 *      run stopped — the gate was right). The receipt layer is excluded from the seal/converse by
 *      design (a receipt is the raw stdout of the tool at its state).
 *
 *   2. THE SEALED ATTESTATION — receipt-attestation.json at the tree root, written ONCE by
 *      `finish` (after the terminal marker, after step 17c): the full run history + log_sha256 =
 *      sha256(ACCEPTANCE-RECEIPTS.txt) + tree_sha_end. Nothing appends to the receipt after
 *      finish, so the attestation is stable and the close-out reseal SEALS it; the claims gate
 *      (claim acceptance-attestation) recomputes log_sha256 against the file of record — a
 *      hand-edited receipt or a stale marker can no longer hide.
 *
 *   3. THE --RESUME RULES — a step is reused ONLY when its ledger entry is exit-0 AND the receipt's
 *      block still hashes to the ledger value AND its name is not in the never-reuse tail
 *      (steps 14/15/16/17/17b/17c — the reseal + gates ALWAYS re-run: the tree bytes may have
 *      changed since the ledger was written, and re-verifying is their whole job).
 *
 * The tree hash mirrors scripts/regen-manifest.mjs's walk EXACTLY (same SKIP/SELF_REF/receipt-layer
 * exclusions, same sort) so the two receipts can never disagree about what "the content tree" is.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ACC = path.join(ROOT, 'ACCEPTANCE-RECEIPTS.txt');
const ATT = path.join(ROOT, 'receipt-attestation.json');          // the SEALED attestation (finish-only)
const LEDGER_DIR = path.join(ROOT, 'deliveries', 'receipts');
const LEDGER = path.join(LEDGER_DIR, 'acceptance-ledger.json');   // the per-step ledger (unsealed, receipt layer)

// the regen-manifest walk, mirrored (regen-manifest.mjs:13-15) — with ONE addition: the attestation
// itself joins the self-reference exclusion (a file cannot hash its own final bytes — same reason
// CHECKSUMS.txt is excluded in regen). regen-manifest still SEALS receipt-attestation.json at the
// close-out (it is not in regen's SELF_REF set); the ledger is under deliveries/receipts/ and rides
// the receipt-layer exclusion both files already carry.
const SKIP = new Set(['node_modules', '.git', '.svelte-kit', 'shots', 'engine-node']);
const SELF_REF = new Set(['ACCEPTANCE-RECEIPTS.txt', 'CHECKSUMS.txt', 'MANIFEST.txt', 'receipt-attestation.json']);
const isReceipt = (rel) => rel.startsWith('deliveries/receipts/') || /(^|\/)gate-manifest-[^/]*\.log$/.test(rel);
function treeSha() {
  const rows = [];
  const walk = (d) => {
    for (const f of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, f.name);
      const rel = path.relative(ROOT, p);
      if (SKIP.has(f.name)) continue;
      if (f.isDirectory()) walk(p);
      else if (SELF_REF.has(f.name) || isReceipt(rel)) continue;
      else rows.push([rel, crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')]);
    }
  };
  walk(ROOT);
  rows.sort((a, b) => a[0].localeCompare(b[0]));
  const h = crypto.createHash('sha256');
  for (const [rel, sha] of rows) h.update(rel + ':' + sha + '\n');
  return h.digest('hex');
}

// item 2 (dist identity): the sealed run record carries the DIST fingerprint it was measured
// against — the same walk tools/shell-status.mjs and the battery receipts use — so the claims
// gate can join acceptance coverage to the shipped dist/, not just to the tree.
function distSha() {
  const dir = path.join(ROOT, 'dist');
  if (!fs.existsSync(dir)) return null;
  const h = crypto.createHash('sha256');
  const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else h.update(path.relative(ROOT, p) + ':' + crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex') + '\n'); } };
  walk(dir);
  return h.digest('hex');
}

const readLedger = () => (fs.existsSync(LEDGER) ? JSON.parse(fs.readFileSync(LEDGER, 'utf8')) : []);
const writeLedger = (recs) => {
  fs.mkdirSync(LEDGER_DIR, { recursive: true });
  const tmp = LEDGER + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(recs, null, 1) + '\n');
  fs.renameSync(tmp, LEDGER);   // atomic: a kill between write and rename leaves the previous file intact
};
const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i === -1 ? undefined : process.argv[i + 1];
};
const has = (name) => process.argv.includes(name);

const cmd = process.argv[2];

// ---- the receipt BLOCK PARSER (shared by resume-plan / truncate-receipt / hash-last-block) ----
// A block is exactly what step() appends: blank line, 66-'=' rule, "== name", 66-'=' rule, "$ cmd",
// the stdout tail, "EXIT_CODE=<n>". A block spans [first rule line .. its EXIT_CODE line] inclusive.
const isRule = (l) => l.length >= 60 && /^=+$/.test(l);
function parseBlocks(txt) {
  const lines = txt.split('\n');
  const blocks = [];
  for (let i = 0; i < lines.length; i++) {
    if (isRule(lines[i]) && i + 1 < lines.length && lines[i + 1].startsWith('== ')) {
      let e = -1;
      for (let j = i + 2; j < lines.length; j++) if (lines[j].startsWith('EXIT_CODE=')) { e = j; break; }
      if (e === -1) break;   // a half-written tail block: never trusted, re-run on resume
      blocks.push(lines.slice(i, e + 1).join('\n') + '\n');
      i = e;
    }
  }
  return blocks;
}
const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');

// the never-reuse tail: the reseal + the gates ALWAYS re-run on resume — the tree bytes may have
// changed since the ledger was written (they did, in the real run: the ledger itself moved), and
// re-verifying is their whole job. Their cost is seconds; their reuse would be a lie.
const NEVER_REUSE = /^(14|15|16|17|17b|17c)\.\s/;

if (cmd === 'hash-last-block') {
  if (!fs.existsSync(ACC)) { console.error('attest: no ACCEPTANCE-RECEIPTS.txt'); process.exit(1); }
  const blocks = parseBlocks(fs.readFileSync(ACC, 'utf8'));
  if (!blocks.length) { console.error('attest: no complete block found'); process.exit(1); }
  console.log(sha256(blocks[blocks.length - 1]));
  process.exit(0);
}
if (cmd === 'resume-plan') {
  const recs = readLedger();
  const last = recs[recs.length - 1];
  if (!last || last.complete) { console.error('attest: resume-plan needs an open (incomplete) record'); process.exit(1); }
  const blocks = parseBlocks(fs.readFileSync(ACC, 'utf8'));
  const steps = last.steps || [];
  let keep = 0;
  // the drill finding (2026-11-25, run-2): a FAILED step's block + ledger entry also hash-match —
  // reuse therefore requires exitCode === 0 as well, or a resumed run would carry a failed block
  // verbatim under a final COMPLETE marker. Only GREEN, non-tail blocks are ever reused.
  while (
    keep < steps.length && keep < blocks.length &&
    steps[keep].exitCode === 0 && steps[keep].blockSha256 === sha256(blocks[keep]) &&
    !NEVER_REUSE.test(steps[keep].name || '')
  ) keep++;
  last.steps = steps.slice(0, keep);   // drop everything unverified, non-green, or tail — it re-runs and re-records
  writeLedger(recs);
  console.log(String(keep));
  process.exit(0);
}
if (cmd === 'truncate-receipt') {
  const keepN = Number(arg('--keep-blocks') ?? 0);
  if (!fs.existsSync(ACC)) process.exit(0);
  const txt = fs.readFileSync(ACC, 'utf8');
  const blocks = parseBlocks(txt);
  const keep = blocks.slice(0, keepN);
  if (keep.length) {
    fs.mkdirSync(path.join(LEDGER_DIR, 'partH-s15'), { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    fs.copyFileSync(ACC, path.join(LEDGER_DIR, 'partH-s15', `resume-truncated-acceptance-receipts-${stamp}.log`));
  }
  fs.writeFileSync(ACC, keep.join(''));   // the verified prefix only; the unverified tail is archived, not destroyed
  console.log(`attest: receipt rewritten to its ${keep.length}-block verified prefix (the pre-resume bytes archived)`);
  process.exit(0);
}
if (cmd === 'preview-step-index') {
  // the 1-based index of the preview step ('6. vite preview …') in the last record's step list —
  // the resume path uses it to know whether the re-run steps live PAST the preview server
  // (which a plain kill would have taken down with the original run).
  const recs = readLedger();
  const last = recs[recs.length - 1];
  const steps = (last && last.steps) || [];
  const i = steps.findIndex((s) => /^6\. vite preview/.test(s.name || ''));
  console.log(String(i + 1));   // 0 when absent
  process.exit(0);
}
if (cmd === 'can-reuse') {
  const recs = readLedger();
  const last = recs[recs.length - 1];
  const name = arg('--name'), command = arg('--command'), block = arg('--block-sha');
  if (!last || last.complete) process.exit(1);
  const hit = (last.steps || []).find((s) => s.name === name && s.command === command && s.blockSha256 === block && s.exitCode === 0);
  process.exit(hit ? 0 : 1);
}
if (cmd === 'start') {
  const recs = readLedger();
  if (has('--resume')) {
    const last = recs[recs.length - 1];
    if (!last) { console.error('attest: --resume but the ledger holds no run record'); process.exit(1); }
    if (last.complete) { console.error('attest: --resume but the last run record is already COMPLETE — nothing to resume'); process.exit(1); }
    last.resumed = true;
    last.resumeCount = (last.resumeCount || 0) + 1;
    writeLedger(recs);
    console.log(`attest: resuming run started ${last.started} (${(last.steps || []).length} step(s) already on the ledger)`);
    process.exit(0);
  }
  // --fresh: append a new ledger record; archive the previous receipt FIRST — a fresh run must
  // never destroy the receipt of record (the A1 law), whatever state it was in (COMPLETE or PARTIAL).
  if (fs.existsSync(ACC) && fs.statSync(ACC).size > 0) {
    fs.mkdirSync(path.join(LEDGER_DIR, 'partH-s15'), { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    fs.copyFileSync(ACC, path.join(LEDGER_DIR, 'partH-s15', `prev-acceptance-receipts-${stamp}.log`));
    const prev = recs[recs.length - 1];
    console.log(`attest: archived the previous receipt (${prev && prev.complete ? 'COMPLETE' : 'partial'}) → deliveries/receipts/partH-s15/prev-acceptance-receipts-${stamp}.log`);
  }
  recs.push({
    started: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
    command: process.env.ATT_COMMAND || 'bash scripts/acceptance-run.sh',
    mode: 'fresh',
    complete: false,
    tree_sha_start: treeSha(),
    steps: [],
  });
  writeLedger(recs);
  console.log(`attest: run opened (tree_sha_start ${recs[recs.length - 1].tree_sha_start.slice(0, 16)}…)`);
  process.exit(0);
}
if (cmd === 'step') {
  const recs = readLedger();
  const last = recs[recs.length - 1];
  if (!last) { console.error('attest: no open run record (call start first)'); process.exit(1); }
  const entry = {
    n: (last.steps || []).length + 1,
    name: arg('--name'),
    command: arg('--command'),
    blockSha256: arg('--block-sha'),
    exitCode: Number(arg('--exit') ?? -1),
  };
  if (has('--reused')) entry.reused = true;
  last.steps = last.steps || [];
  last.steps.push(entry);
  writeLedger(recs);
  process.exit(0);
}
if (cmd === 'finish') {
  const recs = readLedger();
  const last = recs[recs.length - 1];
  if (!last) { console.error('attest: no open run record'); process.exit(1); }
  const complete = has('--complete');
  last.complete = complete;
  if (!complete) {
    last.stoppedAt = arg('--stopped-at') || 'unknown';
    last.failedStep = arg('--failed-step') || null;
    last.failedExit = Number(arg('--exit') ?? -1);
  }
  last.terminalMarker = complete
    ? 'ACCEPTANCE RUN COMPLETE — every step exit 0'
    : `ACCEPTANCE RUN PARTIAL — stopped after step ${(last.steps || []).filter((s) => s.exitCode === 0).length}`;
  last.log_sha256 = fs.existsSync(ACC) ? crypto.createHash('sha256').update(fs.readFileSync(ACC)).digest('hex') : null;
  last.tree_sha_end = treeSha();
  last.dist_sha = distSha();
  last.finished = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
  last.per_step_exit_codes = (last.steps || []).map((s) => s.exitCode);
  writeLedger(recs);
  // the SEALED attestation: written ONCE, here (after the terminal marker is in the receipt) —
  // the close-out reseal seals it; nothing appends to the receipt after this line runs.
  // COMPLETE-ONLY: a PARTIAL run's honesty lives in the LEDGER (the receipt layer). Writing the
  // root file on a partial too left it sitting UNSEALED on the tree — the next resume's
  // gate-manifest honestly read it as EXTRA and failed (the second real-run stop, 2026-11-25).
  // A partial run must leave the tree exactly as it found it, receipt-wise.
  if (complete) {
    const attestation = {
      meta: 'GENERATED by scripts/attest.mjs finish — the sealed, append-only attestation of the acceptance run of record. The ledger (deliveries/receipts/acceptance-ledger.json) is the per-step source; this file is the sealed summary. The claims gate recomputes log_sha256 against ACCEPTANCE-RECEIPTS.txt.',
      runs: recs.map((r) => ({
        started: r.started, finished: r.finished ?? null, command: r.command, mode: r.mode,
        resumed: !!r.resumed, resumeCount: r.resumeCount ?? 0,
        complete: r.complete, stoppedAt: r.stoppedAt ?? null, terminalMarker: r.terminalMarker ?? null,
        steps: (r.steps || []).map((s) => ({ n: s.n, name: s.name, exitCode: s.exitCode, reused: !!s.reused, blockSha256: s.blockSha256 })),
        per_step_exit_codes: r.per_step_exit_codes ?? [],
        log_sha256: r.log_sha256 ?? null, tree_sha_start: r.tree_sha_start ?? null, tree_sha_end: r.tree_sha_end ?? null, dist_sha: r.dist_sha ?? null,
      })),
    };
    const tmp = ATT + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(attestation, null, 1) + '\n');
    fs.renameSync(tmp, ATT);
  }
  console.log(`attest: run closed (${complete ? 'COMPLETE' : 'PARTIAL — ' + last.stoppedAt}); log_sha256 ${(last.log_sha256 || 'n/a').slice(0, 16)}…${complete ? '; sealed attestation written' : '; ledger only (a partial never leaves an unsealed file on the tree)'}`);
  process.exit(0);
}
console.error('attest: unknown subcommand ' + cmd);
process.exit(1);
