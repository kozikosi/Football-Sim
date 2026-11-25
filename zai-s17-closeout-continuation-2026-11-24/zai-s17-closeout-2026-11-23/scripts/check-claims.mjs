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
    default:
      return `unknown claim kind ${c.kind}`;
  }
}

for (const c of claims.claims) {
  const phases = c.phases || ['full'];
  if (!phases.includes(PHASE)) { skipped++; console.log(`SKIP  [${c.id}] not in phase ${PHASE}`); continue; }
  let err;
  try { err = check(c); } catch (e) { err = `checker threw: ${String(e).split('\n')[0].slice(0, 120)}`; }
  if (err) { fail++; console.log(`RED   [${c.id}] ${err}`); }
  else { pass++; console.log(`OK    [${c.id}] ${c.desc}`); }
}
console.log(`check-claims: ${pass} OK · ${fail} RED · ${skipped} skipped (phase ${PHASE}; the claim list is claims.json — the T2 protocol, the orcads F2 fix)`);
process.exit(fail ? 1 : 0);
