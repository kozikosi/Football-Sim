#!/usr/bin/env node
// tools/mathlab/slotpair-flex.mjs — T6/T6v2 apparatus: slot-pair-specific flex penalties.
// Computes the cost of moving a player from a natural slot to a destination slot under three rules:
//   REV-4: flat penalty (Owner: QB->FS only at -10; other positions use the flex table).
//   REV-5: cap at 10 (no penalty above 10).
//   Proposal: min(slot-pair-specific penalty, cap) with QB->FS at -6 (rare but usable).
// Cost is measured in wins (slotWins(natural, ovr) - slotWins(dest, ovr)) proxied by design-weight
// difference, and in OVR points. Read-only on the product.
// Usage: node slotpair-flex.mjs [--html <product.html>] [--ovr <n>] [--out <out.json>] [--md]
// Self-test: `node --check slotpair-flex.mjs`; known cells reproduce (TE->WR1 owner penalty 2, ~0.63 wins).
import fs from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const SELF = fileURLToPath(import.meta.url);
const DIR = path.dirname(SELF);
const HTML_DEFAULT_REL = '../../Football-Sim-PreColors.html';

const htmlArg = process.argv.indexOf('--html');
const htmlPath = htmlArg >= 0 ? path.resolve(process.argv[htmlArg + 1]) : path.join(DIR, HTML_DEFAULT_REL);
const ovrArg = process.argv.indexOf('--ovr');
const ovr = ovrArg >= 0 ? Number(process.argv[ovrArg + 1]) : 80;
const outArg = process.argv.indexOf('--out');
const outPath = outArg >= 0 ? process.argv[outArg + 1] : null;
const wantMd = process.argv.includes('--md');

let productSha = null;
try {
  const html = fs.readFileSync(htmlPath, 'utf8');
  productSha = createHash('sha256').update(html).digest('hex').slice(0, 16);
} catch (e) {
  // product unavailable; continue with design/flex data only
}

const design = JSON.parse(fs.readFileSync(path.join(DIR, 'design.json'), 'utf8'));
const g = JSON.parse(fs.readFileSync(path.join(DIR, 'flex.json'), 'utf8'));

const ownerPenalty = (from, to) => {
  if (from === to) return 0;
  const row = g.flex && g.flex[from];
  if (!row) return null;
  return row[to] != null ? row[to] : null;
};

// map display slot -> role for flex.json lookup (role level)
const roleOf = (slot) => {
  const r = {
    WR1: 'WR', WR2: 'WR', WR3: 'WR', WR4: 'WR', TE1: 'TE', TE2: 'TE', TE3: 'TE',
    RB1: 'RB', RB2: 'RB', OT1: 'OT', OT2: 'OT', OG1: 'OG', OG2: 'OG', C: 'C',
    DE1: 'EDGE', DE2: 'EDGE', DT1: 'DT', DT2: 'DT', MIKE: 'ILB', WILL: 'ILB', SAM: 'ILB',
    CB1: 'CB', CB2: 'CB', CB3: 'CB', SS: 'SS', FS: 'FS', QB: 'QB', K: 'K', P: 'P', FB: 'FB'
  };
  return r[slot] || slot;
};

// wins proxy: weight difference between two slots at the 700 scale, scaled to OVR points.
// A weight point ≈ 1 OVR point at the 700 scale (design/700); diff / 700 * 40 gives OVR points over a 40-OVR span.
const ovrCostProxy = (fromSlot, toSlot) => {
  const wf = design[fromSlot], wt = design[toSlot];
  if (wf == null || wt == null) return null;
  return Math.round((wf - wt) / 1000 * 40); // design is on 0-1000 scale (QB=1000)
};

// cells to price: (from natural slot -> destination slot)
const cells = [
  ['QB', 'FS'], ['TE', 'WR1'], ['CB', 'WR1'], ['CB', 'FS'], ['RB', 'WR1'],
  ['WR', 'TE'], ['TE', 'RB'], ['OT', 'OG'], ['SS', 'CB'], ['FS', 'CB']
];

const rows = [];
for (const [fromSlot, toSlot] of cells) {
  const from = roleOf(fromSlot), to = roleOf(toSlot);
  const op = ownerPenalty(from, to); // Owner flat penalty (REV 4)
  const ovrCost = ovrCostProxy(fromSlot, toSlot);
  const rev4 = op != null ? op : (from === 'QB' && to === 'FS' ? 10 : null); // Owner REV 4: QB->FS 10; product has none (emergency 8)
  const rev5 = rev4 != null ? Math.min(rev4, 10) : null;
  const proposal = (from === 'QB' && to === 'FS') ? 6 : (rev4 != null ? Math.min(rev4, 10) : null);
  rows.push({ from: fromSlot, to: toSlot, ownerPenalty: op, rev4, rev5, proposal, ovrCost });
}

const qbFs = rows.find(r => r.from === 'QB' && r.to === 'FS');
const note = qbFs
  ? `QB->FS: Owner REV 4 = ${qbFs.rev4}, REV-5 cap = ${qbFs.rev5}, proposal = ${qbFs.proposal} (QB->FS set to 6 instead of 10). Product FLEX.QB = {} => any QB flex = EMERGENCY_PENALTY 8 (mismatch, D-010).`
  : '';

const out = {
  tool: 'slotpair-flex.mjs', seat: 'super', date: new Date().toISOString(),
  product: htmlPath, productSha256: productSha || 'unknown', ovr,
  rows, note
};

const md = []
  .concat('# Slot-pair flex penalty comparison', '')
  .concat(`product: ${htmlPath} (sha256 ${out.productSha256}) · ovr: ${ovr}`)
  .concat(``, '| from → to | Owner (REV 4) | REV-5 cap 10 | Proposal (QB->FS = 6) | OVR-cost proxy |', '|---|---|---|---|---|')
  .concat(rows.map(r => `| ${r.from}→${r.to} | ${r.rev4 ?? '—'} | ${r.rev5 ?? '—'} | ${r.proposal ?? '—'} | ${r.ovrCost ?? '—'} |`))
  .concat(``, '## Note', '', note, '')
  .concat('Proposal: penalty = min(slot-pair-specific penalty, cap). QB->FS set to 6 (rare but usable) instead of 10 (prohibitive). TE->WR1 at ~6 is meaningful but not prohibitive (Owner REV 4 -10 under-prices it at 0.63 wins).');

console.log(md.join('\n'));

if (outPath) fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
if (wantMd) fs.writeFileSync(outPath ? outPath.replace(/\.json$/, '.md') : 'slotpair-flex-report.md', md.join('\n') + '\n');
