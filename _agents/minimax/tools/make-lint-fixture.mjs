#!/usr/bin/env node
// MiniMax — builds a SYNTHETIC lint fixture in /tmp to validate candidate-lint.mjs.
//
// This is a TEST FIXTURE, never a build and never a proposal: it writes only to /tmp and never
// touches the product files or the repo. Its only job is to prove that candidate-lint.mjs
// reports zero FAILs on a correctly merged candidate — a gate that can only ever fail would be
// worthless to the Architect and the verifier.
//
// The fixture performs the merge decisions the council settled (M-53 / the relayed prompt):
//   base                 v20
//   14 functions         donor bodies (cpuPick, render100 + the 12 donor-group)
//   renderDraftBoard2    v20 (the keep)
//   setActiveTab,        v20 (markup-dependent: v20 markup has no viewSeason/tabSeasonBtn,
//   renderSeasonTab,     so the donor's Season-entry line must NOT be taken — option (a))
//   renderSeasonTabInner
//   phone block          donor's, plus the Variant A `nostack` guard
//   wrapper              base style relocated into the structured head; duplicate + stray removed
//   color-scheme         light dark
//   tail                 v20's setActiveTab('viewDraft','tabDraftBtn')
//
// Usage: node _agents/minimax/tools/make-lint-fixture.mjs [outfile]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..', '..');
const V20 = path.join(root, 'NFL Draft Simulator v20 Claude.html');
const DONOR = path.join(root, 'NFL Draft Simulator.html');
const outArg = process.argv.slice(2).find(a => !a.startsWith('--'));
const OUT = outArg || '/tmp/minimax-lint-fixture.html';

const DONOR_TAKES = ['cpuPick', 'render100', 'fitNoteHTML', 'buildDefenseDetail', 'dramaticEnding',
  'turnoverParagraph', 'playByPlay', 'generateGameSummary', 'matchupTagHTML', 'renderPlayoffsView',
  'renderGuideHTML', 'finishDraft2', 'renderDraftResults'];
// Variant switch: --v20-results keeps v20's renderDraftResults + finishDraft2 instead of the
// donor's (the donor's draft results carry the "Play a Season" CTA that points at the donor's
// Season tab, which v20's markup does not have).
const V20_RESULTS = process.argv.includes('--v20-results');
const V20_RESULTS_ONLY = process.argv.includes('--v20-results-only');
const TAKES = V20_RESULTS
  ? DONOR_TAKES.filter(n => n !== 'renderDraftResults' && n !== 'finishDraft2')
  : V20_RESULTS_ONLY
    ? DONOR_TAKES.filter(n => n !== 'renderDraftResults')
    : DONOR_TAKES;

function scriptSpan(file) {
  const html = fs.readFileSync(file, 'utf8');
  const m = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/);
  const start = m.index + m[0].indexOf('>') + 1;
  const startLine = (html.slice(0, start).match(/\n/g) || []).length;   // 0-based line of script line 0
  const L = m[1].split('\n');
  return { html, script: m[1], L, startLine };
}
function functionSpans(L) {
  const starts = [];
  L.forEach((l, i) => { const f = l.match(/^function\s+([A-Za-z_$][\w$]*)\s*\(/); if (f) starts.push({ name: f[1], i }); });
  const out = new Map();
  for (let k = 0; k < starts.length; k++) {
    const { name, i } = starts[k];
    const next = k + 1 < starts.length ? starts[k + 1].i : L.length;
    let end = i;
    for (let j = next - 1; j > i; j--) { if (L[j].trim() === '}') { end = j; break; } }
    out.set(name, { from: i, to: end, body: L.slice(i, end + 1).join('\n') });
  }
  return out;
}
function phoneBlock(L) {
  const marker = L.findIndex(l => l.includes('// ---- phone layout:'));
  if (marker < 0) throw new Error('phone block marker not found');
  let end = marker;
  for (let j = marker; j < L.length; j++) if (L[j].trim() === '})();') { end = j; break; }
  return { from: marker, to: end };
}

const A = scriptSpan(V20), B = scriptSpan(DONOR);
const aFns = functionSpans(A.L), bFns = functionSpans(B.L);
const aPhone = phoneBlock(A.L), bPhone = phoneBlock(B.L);

// --- 1. build the merged script line array (v20 base, donor bodies spliced in) -----------------
const lines = A.L.slice();
const edits = [];
for (const name of TAKES) {
  const a = aFns.get(name), b = bFns.get(name);
  if (!a || !b) throw new Error('missing function in one build: ' + name);
  edits.push({ from: a.from, to: a.to, lines: B.L.slice(b.from, b.to + 1), label: name });
}
edits.push({ from: aPhone.from, to: aPhone.to, lines: B.L.slice(bPhone.from, bPhone.to + 1), label: 'phone-block' });

for (const e of edits.sort((x, y) => y.from - x.from)) {
  let repl = e.lines.slice();
  if (e.label === 'phone-block') {
    // Variant A: keep v20's #draftTable2 markup and skip the table it marks.
    const at = repl.findIndex(l => l.includes('if(!mq.matches)'));
    if (at < 0) throw new Error('phone block: no !mq.matches guard found');
    repl.splice(at + 1, 0, '    if(t.dataset.nostack) return;');
  }
  lines.splice(e.from, e.to - e.from + 1, ...repl);
}

// Donor-only helpers the settled oracle keeps: seasonToast, goSeason, meetingInfo, meetingTagText.
// Two of them are called by donor bodies the merge takes (finishDraft2 -> seasonToast,
// matchupTagHTML -> meetingTagText), so they must travel with those bodies.
const aTop = new Set([...A.L].filter(l => /^function\s/.test(l)).map(l => l.match(/^function\s+([A-Za-z_$][\w$]*)/)[1]));
const donorOnlyFns = [...bFns.keys()].filter(n => !aTop.has(n));
const helperLines = [];
for (const name of donorOnlyFns) {
  const b = bFns.get(name);
  helperLines.push('', '// ---- donor-only helper carried with the donor bodies: ' + name + ' ----', ...B.L.slice(b.from, b.to + 1));
}
if (helperLines.length) {
  let tailAt = lines.length - 1;
  while (tailAt > 0 && lines[tailAt].trim() === '') tailAt--;
  lines.splice(tailAt, 0, ...helperLines);
}
let script = lines.join('\n');
const oldScript = A.script;

// --- 2. wrapper surgery on the html ------------------------------------------------------------
let html = A.html;
const firstNl = html.indexOf('\n');
const compact = html.slice(0, firstNl);                 // v20's duplicate compact wrapper (line 1)
const baseStyle = (compact.match(/<style>([\s\S]*?)<\/style>/) || [])[1] || '';
if (!baseStyle) throw new Error('base style not found on v20 line 1');
html = html.slice(firstNl + 1);                        // drop the duplicate wrapper line
html = html.replace(/\n<head>\n/, '\n<head>\n<style>' + baseStyle.replace('color-scheme:light', 'color-scheme:light dark') + '</style>\n');
html = html.replace(/<\/body><\/html>\s*$/, '');        // remove v20's stray close
html = html.replace(oldScript, () => script);            // splice the merged script (literal-safe)
fs.writeFileSync(OUT, html);
console.log('fixture written: ' + OUT + ' (' + fs.statSync(OUT).size + ' bytes)');
