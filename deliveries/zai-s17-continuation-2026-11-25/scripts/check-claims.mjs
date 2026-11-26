#!/usr/bin/env node
/* check-claims.mjs — the T2 claims protocol (2026-11-24, the orcads F2 fix).
 *
 * The 2026-11-23 verifier RED was a mis-specified LITERAL expectation ("37 pass · 0 fail") that
 * the package author resolved in prose — the independence pattern the council exists to prevent.
 * This file makes that class impossible: every claim a reviewer would test is a machine-readable
 * assertion over real files (regex/count/seal/recomputation), matched against the formats the
 * tools ACTUALLY print (node:test's "ℹ pass 37", the batteries' "· N pass · 0 fail" banners).
 * A RED is a failing line + exit 1 — never a paragraph. The original RED + its resolution stay
 * on record at deliveries/receipts/partH-s15/verifier-2026-11-23.log, cited by claim sbs/verifier
 * history in the hand-over.
 *
 * Phases:
 *   --phase packaging — the claims that hold MID-COMPOSITE (acceptance-run step 17c, after step
 *   14's reseal and 13d's SHELL-STATUS regen, while ACCEPTANCE-RECEIPTS.txt is still growing).
 *   default (full)    — everything, including the acceptance-derived claims; run after the
 *   composite at the final bytes (its receipt is the close-out's independence evidence).
 *
 * Usage: node scripts/check-claims.mjs [--phase packaging]   (exit 0 = all claims OK)
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const PHASE = process.argv.includes('--phase') ? process.argv[process.argv.indexOf('--phase') + 1] : 'full';
const claims = JSON.parse(fs.readFileSync(path.join(ROOT, 'claims.json'), 'utf8'));
let fail = 0, pass = 0, skipped = 0;
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const countOf = (txt, re) => (txt.match(re) || []).length;

function check(c) {
  const abs = path.join(ROOT, c.file);
  const txt = fs.existsSync(abs) ? read(c.file) : null;
  switch (c.kind) {
    case 'fileExists':
      return fs.existsSync(abs) ? null : `missing file ${c.file}`;
    case 'regex': {
      if (txt === null) return `missing file ${c.file}`;
      const hit = new RegExp(c.pattern, c.flags || 'm').test(txt);
      return c.negate ? (hit ? `forbidden pattern FOUND: /${c.pattern}/` : null) : (hit ? null : `pattern NOT FOUND: /${c.pattern}/`);
    }
    case 'count': {
      if (txt === null) return `missing file ${c.file}`;
      const n = countOf(txt, new RegExp(c.pattern, c.flags || 'gm'));
      return n === c.expect ? null : `count ${n} ≠ ${c.expect} for /${c.pattern}/`;
    }
    case 'seal': {
      const lines = read(c.file).split('\n').filter((l) => l.trim());
      return lines.length === c.expect ? null : `seal lines ${lines.length} ≠ ${c.expect}`;
    }
    case 'manifestIdentity': {
      const a = read('CHECKSUMS.txt'), b = read('MANIFEST.txt');
      return a === b ? null : 'MANIFEST.txt ≠ CHECKSUMS.txt (the two must stay identical)';
    }
    case 'verifyPackage': {
      let o;
      try { o = execFileSync('node', ['tools/verify-package.mjs', '.'], { cwd: ROOT, encoding: 'utf8' }); }
      catch (e) { return `verify-package exit ≠ 0: ${String((e.stdout || '') + (e.stderr || e)).split('\n')[0].slice(0, 140)}`; }
      const m = o.match(/verify-package: (\d+) OK \/ (\d+) FAILED \/ (\d+) missing/);
      if (!m) return `unparseable verify output: ${o.split('\n')[0].slice(0, 120)}`;
      if (+m[2] !== 0 || +m[3] !== 0) return `verify FAILED=${m[2]} missing=${m[3]} (expect 0/0)`;
      const sealLines = read('CHECKSUMS.txt').split('\n').filter((l) => l.trim()).length;
      if (+m[1] !== sealLines) return `verify OK ${m[1]} ≠ seal lines ${sealLines} (the converse-consistent seal)`;
      if (!/converse clean/.test(o)) return 'converse check line missing from verify output';
      return null;
    }
    case 'distPrefix': {
      const status = read(c.file);
      for (const rel of c.files) {
        const p = path.join(ROOT, rel);
        if (!fs.existsSync(p)) return `missing dist file ${rel}`;
        const pre = createHash('sha256').update(fs.readFileSync(p)).digest('hex').slice(0, 16);
        if (!status.includes(pre)) return `dist ${rel} prefix ${pre}… absent from ${c.file}`;
      }
      return null;
    }
    case 'sideBySide': {
      const j = JSON.parse(read(c.file));
      const caps = j.captures || [];
      const fails = (j.verdicts || []).filter((v) => v.checks && Object.values(v.checks).some((x) => x === false));
      const fb = caps.filter((x) => x.fallback);
      const det = [];
      if ((j.matrix ? j.matrix.complete : false) !== true) det.push(`matrix incomplete: missing ${((j.matrix || {}).missing || []).join(', ')}`);
      if (caps.length !== c.expectCaptures) det.push(`captures ${caps.length} ≠ ${c.expectCaptures}`);
      if (fb.length !== (c.expectFallback ?? 0)) det.push(`fallback captures ${fb.length} ≠ ${c.expectFallback ?? 0}`);
      if (fails.length) det.push(`${fails.length} right-verdict FAIL row(s): ${fails.map((v) => `${v.scene} ${v.w}x${v.h} ${v.theme}`).join(', ')}`);
      const doc = read('deliveries/S15-SIDE-BY-SIDE-2026-11-21.md');
      const docFb = countOf(doc, /^\| [^|]*\*\*FALLBACK — NOT the intended scene\*\*/gm);   // table CELLS only — the header prose mentions the mechanism by name
      if (docFb !== fb.length) det.push(`doc fallback cells ${docFb} ≠ receipt fallback ${fb.length}`);
      return det.length ? det.join('; ') : null;
    }
    case 'statusAcceptance': {
      // the S17 A4 work order's kind, verbatim semantics: the SHELL-STATUS acceptance line must
      // agree with the TERMINAL MARKER the acceptance script actually wrote — never the reverse.
      const acc = read(c.acceptanceFile || 'ACCEPTANCE-RECEIPTS.txt');
      const status = read(c.file || 'SHELL-STATUS.md');
      const wantsComplete = c.expect === 'complete';
      const hasComplete = /ACCEPTANCE RUN COMPLETE — every step exit 0/.test(acc);
      const line = (status.match(/^- acceptance run: .*$/m) || [])[0] || '';
      if (hasComplete !== wantsComplete) return `acceptance marker ${hasComplete ? 'present' : 'absent'} ≠ expect ${c.expect}`;
      if (wantsComplete ? !/COMPLETE/.test(line) : !/no COMPLETE marker/.test(line))
        return `SHELL-STATUS line disagrees with the receipt: ${line || '(missing)'}`;
      return null;
    }
    case 'statusAgreement': {
      // the PROMOTED packaging-phase claim (A4 bullet 4): no contradictory COMPLETE line, in EITHER
      // direction, at ANY phase — the status line and the receipt marker must agree with each other
      // whatever the state (the 2026-11-24 defect was exactly this contradiction, invisible to the
      // packaging gate because the freshness regex accepted UNKNOWN). Phase-stable: mid-composite
      // both sides say not-complete; at final bytes both sides say COMPLETE.
      const acc = read(c.acceptanceFile || 'ACCEPTANCE-RECEIPTS.txt');
      const status = read(c.file || 'SHELL-STATUS.md');
      const hasComplete = /ACCEPTANCE RUN COMPLETE — every step exit 0/.test(acc);
      const line = (status.match(/^- acceptance run: .*$/m) || [])[0] || '';
      if (!line) return 'SHELL-STATUS carries no `- acceptance run:` line';
      if (hasComplete && !/COMPLETE/.test(line)) return `receipt says COMPLETE but the status line does not: ${line}`;
      if (!hasComplete && /the acceptance run of record is COMPLETE/.test(line)) return `CONTRADICTORY COMPLETE line while the receipt holds no COMPLETE marker: ${line}`;
      return null;
    }
    case 'statusFreshness': {
      // the S17 A4 work order's kind, verbatim semantics: each named receipt's distHash decides the
      // content verdict; the generated status line must carry exactly that verdict.
      const status = read(c.file || 'SHELL-STATUS.md');
      const h = createHash('sha256');
      const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else h.update(path.relative(ROOT, p) + ':' + createHash('sha256').update(fs.readFileSync(p)).digest('hex') + '\n'); } };
      walk(path.join(ROOT, 'dist'));
      const now = h.digest('hex');
      for (const [receipt, label] of c.receipts) {
        const j = JSON.parse(read(receipt));
        if (!j.distHash) return `${receipt} has no distHash (T1 receipt format missing)`;
        const want = j.distHash === now ? 'content FRESH' : 'content STALE';
        const line = status.split('\n').find((l) => l.startsWith(`- ${label}:`)) || '';
        if (!line.includes(want)) return `${label} says "${line || '(missing)'}" but the bytes say ${want}`;
      }
      return null;
    }
    case 'sideBySideNonVacuity': {
      // the S17 A4 structured check replacing hy4 N4's raw "met": true count (a planted `"met":
      // "true"` STRING or a count fudge cannot satisfy a structured join): every capture record
      // joins 1:1 to its nonVacuity record on (side, scene, w, h, theme) and every joined record
      // requires met === true — no false, no null, no string, no missing twin.
      const j = JSON.parse(read(c.file));
      const caps = j.captures || [];
      const nvs = j.nonVacuity || [];
      const key = (r) => `${r.side}|${r.scene}|${r.w}|${r.h}|${r.theme}`;
      const byKey = new Map(nvs.map((r) => [key(r), r]));
      const bad = [];
      if (nvs.length !== caps.length) bad.push(`nonVacuity records ${nvs.length} ≠ captures ${caps.length}`);
      for (const cap of caps) {
        const nv = byKey.get(key(cap));
        if (!nv) { bad.push(`${key(cap)}: no nonVacuity twin`); continue; }
        if (nv.met !== true) bad.push(`${key(cap)}: met=${JSON.stringify(nv.met)} (must be exactly true)`);
        if (nv.expected !== cap.expected) bad.push(`${key(cap)}: expected marker text differs between capture and nonVacuity`);
      }
      return bad.length ? bad.join('; ') : null;
    }
    case 'attestation': {
      // the S17 A1/A3 gate: receipt-attestation.json's LAST run must describe the receipt of
      // record EXACTLY — same log bytes (log_sha256 recomputed here), a CLOSED terminal state, all
      // step exits 0. The file shape is {meta, runs:[…]} (the sealed summary over the receipt-layer
      // ledger); a bare array (the first draft's shape) is accepted too, so the gate reads both.
      const raw = JSON.parse(read(c.file || 'receipt-attestation.json'));
      const recs = Array.isArray(raw) ? raw : raw.runs || [];
      const last = recs[recs.length - 1];
      if (!last) return 'receipt-attestation.json holds no run record';
      if (last.complete !== true) return `the last run record is not COMPLETE (complete=${JSON.stringify(last.complete)}${last.stoppedAt ? ', stoppedAt ' + last.stoppedAt : ''})`;
      const got = createHash('sha256').update(fs.readFileSync(path.join(ROOT, c.acceptanceFile || 'ACCEPTANCE-RECEIPTS.txt'))).digest('hex');
      if (last.log_sha256 !== got) return `log_sha256 mismatch: attestation ${last.log_sha256} vs ACCEPTANCE-RECEIPTS.txt ${got} — the receipt changed after the run closed (or the attestation is stale)`;
      const exits = last.per_step_exit_codes || [];
      if (!exits.length || exits.some((x) => x !== 0)) return `per_step_exit_codes not all 0: [${exits.join(', ')}]`;
      if (!last.tree_sha_start || !last.tree_sha_end) return 'tree_sha_start/tree_sha_end missing from the run record';
      if (!/ACCEPTANCE RUN COMPLETE — every step exit 0/.test(read(c.acceptanceFile || 'ACCEPTANCE-RECEIPTS.txt'))) return 'the receipt of record carries no COMPLETE terminal marker';
      return null;
    }
    case 'freshnessMap': {
      // the S17 A3 gate: freshness.json maps every generated file to the sha256 of every input it
      // reads; recomputing each input here turns the claim RED with the CHANGED FILE NAMED the
      // moment any input drifts. acceptanceSha must equal the live ACCEPTANCE-RECEIPTS.txt hash and
      // the generated status must print the same value.
      const map = JSON.parse(read(c.file || 'freshness.json'));
      const det = [];
      for (const [gen, rec] of Object.entries(map.files || {})) {
        for (const [inp, want] of Object.entries(rec.inputs || {})) {
          const p = path.join(ROOT, inp);
          if (!fs.existsSync(p)) { det.push(`${gen}: input missing ${inp}`); continue; }
          const got = createHash('sha256').update(fs.readFileSync(p)).digest('hex');
          if (got !== want) det.push(`${gen}: input ${inp} CHANGED (recorded ${want.slice(0, 16)}…, now ${got.slice(0, 16)}…) — regenerate freshness.json`);
        }
        if (rec.acceptanceSha) {
          const acc = path.join(ROOT, c.acceptanceFile || 'ACCEPTANCE-RECEIPTS.txt');
          const got = createHash('sha256').update(fs.readFileSync(acc)).digest('hex');
          if (rec.acceptanceSha !== got) det.push(`${gen}: acceptanceSha ${rec.acceptanceSha.slice(0, 16)}… ≠ live ACCEPTANCE-RECEIPTS.txt ${got.slice(0, 16)}…`);
        }
      }
      if (map.acceptanceSha) {
        const acc = path.join(ROOT, c.acceptanceFile || 'ACCEPTANCE-RECEIPTS.txt');
        const got = createHash('sha256').update(fs.readFileSync(acc)).digest('hex');
        if (map.acceptanceSha !== got) det.push(`freshness.json: acceptanceSha ≠ live ACCEPTANCE-RECEIPTS.txt`);
      }
      const status = read(c.file2 || 'SHELL-STATUS.md');
      const m = status.match(/- acceptance receipt sha256 \(acceptanceSha\): ([0-9a-f]{64})/);
      const live = createHash('sha256').update(fs.readFileSync(path.join(ROOT, c.acceptanceFile || 'ACCEPTANCE-RECEIPTS.txt'))).digest('hex');
      if (!m) det.push('SHELL-STATUS.md prints no acceptanceSha line');
      else if (m[1] !== live) det.push(`SHELL-STATUS acceptanceSha ${m[1].slice(0, 16)}… ≠ live receipt ${live.slice(0, 16)}…`);
      return det.length ? det.join('; ') : null;
    }
    case 'offlineTent': {
      // the Wave B #4 tent gate: the receipt's own numbers are the law — zero external requests,
      // the boot/restore loop completed, the dist fingerprint present. A planted remote font URL
      // makes the battery itself DIE NAMING THE URL (the receipt then carries externalRequests).
      const j = JSON.parse(read(c.file || 'deliveries/receipts/offline-tent.json'));
      const ext = j.externalRequests || [];
      if (ext.length) return `the tent leaked: ${ext.length} external request(s) — ${ext.slice(0, 3).join(' | ')}`;
      if (j.booted !== true || j.drafted !== true || j.restored !== true) return `the draft turn broke under the tent: booted=${j.booted} drafted=${j.drafted} restored=${j.restored}`;
      if (!j.distHash) return 'the tent receipt carries no distHash (the bytes it pinned are unrecorded)';
      return null;
    }
    case 'stateBlocks': {
      // the S17 A3 gate: the generated state blocks (README top block, ZAI.md, the hand-over state
      // paragraph) must equal what gen-state-block.mjs produces from the CURRENT claim results —
      // green prose becomes impossible while a claim is RED, because the block itself shows RED.
      try {
        execFileSync('node', ['scripts/gen-state-block.mjs', '--check'], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
        return null;
      } catch (e) {
        const o = String((e.stdout || '') + (e.stderr || ''));
        return o.trim().split('\n').filter(Boolean).slice(0, 3).join(' | ') || 'gen-state-block --check failed';
      }
    }
    default:
      return `unknown claim kind ${c.kind}`;
  }
}

for (const c of claims.claims) {
  // the recursion guard (live-caused 2026-11-25: the unguarded chain check-claims → gen-state-block
  // → check-claims exhausted the fork table in ~30 s). gen-state-block's own check-claims call sets
  // CP_CLAIMS_SKIP_STATEBLOCKS=1; the stateBlocks row is excluded from its rendered block anyway.
  if (c.kind === 'stateBlocks' && process.env.CP_CLAIMS_SKIP_STATEBLOCKS === '1') { skipped++; console.log(`SKIP  [${c.id}] recursion guard (stateBlocks renders outside its own output)`); continue; }
  const phases = c.phases || ['full'];
  if (!phases.includes(PHASE)) { skipped++; console.log(`SKIP  [${c.id}] not in phase ${PHASE}`); continue; }
  let err;
  try { err = check(c); } catch (e) { err = `checker threw: ${String(e).split('\n')[0].slice(0, 120)}`; }
  if (err) { fail++; console.log(`RED   [${c.id}] ${err}`); }
  else { pass++; console.log(`OK    [${c.id}] ${c.desc}`); }
}
console.log(`check-claims: ${pass} OK · ${fail} RED · ${skipped} skipped (phase ${PHASE}; the claim list is claims.json — the T2 protocol, the orcads F2 fix)`);
process.exit(fail ? 1 : 0);
