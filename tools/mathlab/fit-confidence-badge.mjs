#!/usr/bin/env node
// tools/mathlab/fit-confidence-badge.mjs — draft board fit-confidence badge (VLOC, 2026-11-09).
//
// Computes a per-slot fit-confidence badge from the triangulation (raw engine curve
// vs Owner / design.json / salary anchors). The badge is what the draft board
// surfaces to the user (Q49): a 0-100 score + a High / Medium / Low label + a
// one-line plain-language tooltip. Internals (raw curve values, anchor tables,
// quantisation) are NOT exposed to the user.
//
// Read-only: reads the latest triangulate-*.json (which pins Football-Sim-PreColors.html
// sha256 before and after); never touches the product file or any protected constant.
//
// Commands:
//   node fit-confidence-badge.mjs [triangulate.json]   default = latest triangulate-*.json
//   node fit-confidence-badge.mjs --selftest
//
// Outputs tools/mathlab/results/fit-confidence-badge-<date>.json + stdout table.
//
// Badge logic:
//   score  = 100 - spreadPenalty - rankPenalty, floored at 0
//   spreadPenalty = clamp(spread1000 / 150 * 60, 0, 60)   (anchor spread on 1000 scale)
//   rankPenalty   = clamp(rankSpread / 4 * 40, 0, 40)     (rank spread between anchors)
//   label: score >= 70 High | >= 40 Medium | < 40 Low
//   tooltip: plain language, no internals

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MATHLAB = HERE;
const RESULTS_DIR = path.join(MATHLAB, 'results');
const DATE = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16);
const OUT_JSON = path.join(RESULTS_DIR, `fit-confidence-badge-${DATE}.json`);

function latestTriangulate() {
  try {
    const files = fs.readdirSync(RESULTS_DIR)
      .filter(f => f.startsWith('triangulate-') && f.endsWith('.json'))
      .sort().reverse();
    return files.length ? path.join(RESULTS_DIR, files[0]) : null;
  } catch (e) { return null; }
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function badge(score) {
  return score >= 70 ? 'High' : score >= 40 ? 'Medium' : 'Low';
}

function tooltip(slot, score, label, spread1000, rankSpread) {
  const anchorsAgree = label === 'High';
  const vary = label === 'Low';
  if (anchorsAgree) return `Value estimate is stable across all reference tables — safe to use for drafting ${slot}.`;
  if (label === 'Medium') return `Value estimate is broadly stable but shifts slightly between reference tables — treat ${slot} as a solid, not a certain, pick.`;
  return `Value estimate moves a lot between reference tables — treat ${slot} as approximate; check the Owner's table and engine together before drafting.`;
}

function computeBadges(report) {
  const rows = report.rows || [];
  const badges = rows.map(r => {
    const spread1000 = r.spread1000 == null ? 0 : r.spread1000;
    const rankSpread = r.rankSpread == null ? 0 : r.rankSpread;
    const spreadPenalty = clamp(spread1000 / 150 * 60, 0, 60);
    const rankPenalty = clamp(rankSpread / 4 * 40, 0, 40);
    const score = +Math.max(0, 100 - spreadPenalty - rankPenalty).toFixed(1);
    const label = badge(score);
    return {
      slot: r.slot,
      score,
      label,
      spread1000,
      rankSpread,
      disagreement: !!r.disagreement1000,
      tooltip: tooltip(r.slot, score, label, spread1000, rankSpread),
    };
  });
  const summary = {
    nSlots: badges.length,
    high: badges.filter(b => b.label === 'High').length,
    medium: badges.filter(b => b.label === 'Medium').length,
    low: badges.filter(b => b.label === 'Low').length,
  };
  return { badges, summary };
}

(async () => {
  const inPath = process.argv.slice(2).find(a => a && !a.startsWith('--')) || latestTriangulate();
  if (!inPath) { console.error('ERROR: no triangulate JSON found (run triangulate.mjs first, or pass a path)'); process.exit(4); }
  const report = JSON.parse(fs.readFileSync(inPath, 'utf8'));
  const { badges, summary } = computeBadges(report);
  const out = {
    generatedUtc: new Date().toISOString() + 'Z',
    source: path.basename(inPath),
    product: report.product,
    productSha256: report.productSha256,
    method: 'badge score from anchor spread + rank spread (triangulation); internals not exposed to user',
    labels: 'VERIFIED = computed from the named triangulate JSON; badge labels High/Medium/Low; tooltip is plain language',
    badges,
    summary,
  };
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(out, null, 1) + '\n');

  console.log('=== Fit-confidence badges (draft board, Q49) ===');
  console.log(`Source: ${path.basename(inPath)}  product ${(report.productSha256 || '').slice(0, 16)}`);
  console.log('slot     score label  spread1000 rankSpread disagree tooltip');
  console.log('----     ----- -----  ---------- ---------- ----------');
  for (const b of badges) {
    console.log(`${b.slot.padEnd(8)} ${String(b.score).padStart(3)}   ${b.label.padEnd(6)} ${String(b.spread1000).padStart(10)} ${String(b.rankSpread).padStart(10)} ${String(b.disagreement).padStart(10)} ${b.tooltip}`);
  }
  console.log(`\nSummary: ${summary.high} High / ${summary.medium} Medium / ${summary.low} Low of ${summary.nSlots} slots`);
  console.log(`Wrote ${OUT_JSON}`);
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });

// ---------- self-test ----------
if (process.argv.includes('--selftest')) {
  (() => {
    let fails = 0;
    function check(name, cond, detail) {
      if (cond) console.log(`PASS  ${name}`);
      else { fails++; console.log(`FAIL  ${name}  ${detail || ''}`); }
    }
    // Synthetic triangulate report: slot A tight (High), B medium, C wide (Low)
    const synth = {
      product: 'synth', productSha256: '00000000',
      rows: [
        { slot: 'QB', spread1000: 10, rankSpread: 0, disagreement1000: false },
        { slot: 'WR1', spread1000: 90, rankSpread: 2, disagreement1000: false },
        { slot: 'CB1', spread1000: 200, rankSpread: 5, disagreement1000: true },
      ],
    };
    const { badges, summary } = computeBadges(synth);
    const bySlot = Object.fromEntries(badges.map(b => [b.slot, b]));
    check('QB High badge', bySlot.QB.label === 'High', bySlot.QB.label);
    check('QB score near 90', bySlot.QB.score >= 85, String(bySlot.QB.score));
    check('WR1 Medium badge', bySlot.WR1.label === 'Medium', bySlot.WR1.label);
    check('CB1 Low badge', bySlot.CB1.label === 'Low', bySlot.CB1.label);
    check('CB1 score low (<40)', bySlot.CB1.score < 40, String(bySlot.CB1.score));
    check('summary counts', summary.high === 1 && summary.medium === 1 && summary.low === 1, JSON.stringify(summary));
    check('tooltips non-empty', badges.every(b => b.tooltip && b.tooltip.length > 0), 'some empty');
    console.log(fails === 0 ? '\nALL FIT-CONFIDENCE-BADGE SELF-TESTS PASS' : `\n${fails} FAILURES`);
    process.exit(fails === 0 ? 0 : 1);
  })();
}
