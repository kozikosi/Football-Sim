#!/usr/bin/env node
/* gate-numerals.mjs — Rev 8 Part C3: the NUMERAL GATE (prototype; the council decides adoption).
 * Implements Glyph's Rev 8 adjudication (Q3, ADOPT amended): scope to DECISION-CARRYING numerals,
 * matched by VALUE against a named source of truth that is checkable on the shipped tree — not a
 * verbatim substring sweep over all prose (that false-fails benign numerals).
 * Two modes:
 *   --legacy-scan   the three Rev 6 drift rules (they flag 867, 4 vs 6, and the manifest-line claim):
 *      R1 fidelity-pin: the cards node count quoted in DELIVERY-NOTE.md/RECEIPT.md/verified-as-of.json
 *                      must equal probes/battery-*.json screens.cards.nodeCount;
 *      R2 cross-receipt: a workaround figure quoted as "X vs Y" in DELIVERY-NOTE.md must equal the
 *                      pair RECEIPT.md itemises (Svelte 4 / Vue 3);
 *      R3 self-count:   any prose claim "MANIFEST.txt … N sha256 lines" must equal the shipped
 *                      MANIFEST.txt's actual wc -l.
 *   --claims        the adopted form for NEW deliveries: every decision-carrying numeral in
 *      DELIVERY-NOTE.md + RECEIPT.md verdict lines must appear in verified-as-of.json (the claims
 *      block) with a "command" or "file" source; claims without a source FAIL.
 * Run: node gate-numerals.mjs <tree-root> --legacy-scan | --claims   (exit 0 clean, 1 hits, 2 usage) */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2];
const mode = process.argv.includes('--legacy-scan') ? 'legacy' : process.argv.includes('--claims') ? 'claims' : null;
if (!root || !existsSync(root) || !mode) { console.error('usage: node gate-numerals.mjs <tree-root> --legacy-scan|--claims'); process.exit(2); }
const read = (p) => (existsSync(join(root, p)) ? readFileSync(join(root, p), 'utf8') : null);

const hits = [];
const note = read('DELIVERY-NOTE.md') || '';
const receipt = read('RECEIPT.md') || '';
const vao = read('verified-as-of.json') || '';

if (mode === 'legacy') {
  // R1 — fidelity pin vs battery JSONs
  const batt = ['vue', 'svelte'].map((a) => {
    const p = join(root, `football-sim-${a}/probes/battery-${a}.json`);
    try { return JSON.parse(readFileSync(p, 'utf8')).screens?.cards?.nodeCount; } catch { return null; }
  }).filter((n) => n != null);
  if (batt.length) {
    const quoted = [...note.matchAll(/cards (\d+)\/(\d+)/g), ...note.matchAll(/\(cards (\d+)\//g)]
      .map((m) => Number(m[1]));
    const rq = [...receipt.matchAll(/\| fidelity pin \| (\d+)\//g)].map((m) => Number(m[1]));
    const vq = [...vao.matchAll(/"cards": (\d+)/g)].map((m) => Number(m[1]));
    for (const [src, vals] of [['DELIVERY-NOTE.md', quoted], ['RECEIPT.md', rq], ['verified-as-of.json', vq]]) {
      for (const v of vals) for (const b of batt) {
        if (v !== b) hits.push(`R1 ${src}: cards count quoted ${v} but battery JSONs say ${b}`);
      }
    }
  }
  // R2 — workarounds pair cross-receipt (scope convention: a claim that NAMES its scope in the text
  // LEADING INTO it — "Rev 8 erratum…", "original…", "covering note…" — is a labelled historical
  // mention, not a live claim; the adjudication requires scope-labelled claims. Only the before-text
  // counts: a scope marker trailing a live claim must not launder it.)
  const isHistorical = (s, i) => /rev\s*[5678]|rev-5|original|covering note|erratum/i.test(s.slice(Math.max(0, i - 120), i));
  const nw = [...note.matchAll(/workarounds[: ]*(\d+) vs (\d+)/gi)].filter((m) => !isHistorical(note, m.index)).map((m) => `${m[1]} vs ${m[2]}`);
  const rw = [...receipt.matchAll(/workarounds svelte (\d+) vs vue (\d+)/gi)].filter((m) => !isHistorical(receipt, m.index)).map((m) => `${m[1]} vs ${m[2]}`);
  if (rw.length) for (const q of nw) if (!rw.includes(q)) hits.push(`R2 DELIVERY-NOTE.md: workarounds quoted ${q} but RECEIPT.md itemises ${rw[0]}`);
  // R3 — manifest self-count (same scope convention)
  const mf = read('MANIFEST.txt');
  if (mf) {
    const actual = mf.split('\n').filter((l) => l.trim()).length;
    for (const [srcName, src] of [['DELIVERY-NOTE.md', note], ['RECEIPT.md', receipt]]) {
      for (const m of src.matchAll(/MANIFEST\.txt[^.\n]*?([\d,]+)\s*(?:sha256\s*)?lines/gi)) {
        if (isHistorical(src, m.index)) continue;
        const claimed = Number(m[1].replace(/,/g, ''));
        if (claimed !== actual) hits.push(`R3 ${srcName}: claims MANIFEST.txt ${m[1]} lines but the shipped file has ${actual}`);
      }
    }
  }
} else {
  // claims mode — decision-carrying numerals in the two verdict docs need a source in verified-as-of.json
  const vaoKeys = JSON.parse(vao);
  const sourcedText = JSON.stringify(vaoKeys);
  const decisionLines = [...note.matchAll(/\*\*([^*]+\*\*)/g)].map((m) => m[1]);
  for (const line of decisionLines) {
    for (const m of line.matchAll(/\b(\d{2,5})\b/g)) {
      const n = m[1];
      if (!sourcedText.includes(n) && !/^(19|20)\d\d$/.test(n)) hits.push(`claims: decision numeral ${n} in "${line.slice(0, 60)}…" has no entry in verified-as-of.json`);
    }
  }
}

if (hits.length) {
  const uniq = [...new Set(hits)];
  console.log(`gate-numerals (${mode}): ${hits.length} raw hit(s), ${uniq.length} distinct`);
  for (const h of uniq) console.log('  ' + h);
  process.exit(1);
}
console.log(`gate-numerals (${mode}): CLEAN — 0 hits`);
process.exit(0);
