#!/usr/bin/env node
// tools/mathlab/flex-audit.mjs — T6 apparatus: audit the product's FLEX table vs the Owner's flex.json.
// Read-only on the product. Reports every (pos,slot) cell where they disagree, flags the QB->FS
// mismatch (product FLEX.QB = {} -> EMERGENCY_PENALTY 8 vs Owner flex.json QB->FS 10), emits JSON + markdown.
// Usage: node flex-audit.mjs [--html <product.html>] [--out <out.json>] [--md]
// Self-test: `node --check flex-audit.mjs` (syntax clean); running on Pre-Colors must flag QB->FS 10 as ADDED/CHANGED and exit non-zero.
import fs from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const SELF = fileURLToPath(import.meta.url);
const DIR = path.dirname(SELF);

const EMERGENCY_PENALTY = 8;

// product FLEX table collapsed to role level (mirrors flexcheck.mjs `cur`, from Pre-Colors lines ~940-955)
const CUR = {
  QB: {}, RB: { TE: 6 }, FB: {},
  WR: { TE: 4, SS: 4, FS: 4, CB: 4, RB: 6 },
  TE: { ILB: 6, OLB: 6, SS: 6, FS: 6, RB: 6 },
  OT: { OG: 0, C: 0, DT: 4 },
  OG: { C: 0, OT: 4, DT: 4 },
  C: { OG: 0, OT: 4, DT: 4 },
  DT: { EDGE: 4, ILB: 4, OLB: 4, OG: 4, C: 4, OT: 6, RB: 6 },
  EDGE: { DT: 2, ILB: 4, OLB: 2, TE: 6, RB: 6 },
  ILB: { EDGE: 6, DT: 4, NICKEL: 4, SS: 4, FS: 4, TE: 6, RB: 6 },
  OLB: { EDGE: 6, DT: 4, NICKEL: 4, SS: 4, FS: 4, TE: 6, RB: 6 },
  CB: { SS: 2, FS: 0, ILB: 4, OLB: 4, WR: 4, TE: 6, RB: 6 },
  SS: { FS: 2, CB: 4, ILB: 4, OLB: 2, WR: 4, TE: 6, RB: 6 },
  FS: { SS: 2, CB: 4, ILB: 4, OLB: 4, WR: 4, TE: 6, RB: 6 },
  K: {}, P: {}
};

const HTML_DEFAULT_REL = '../../Football-Sim-PreColors.html';
const htmlArg = process.argv.indexOf('--html');
const htmlPath = htmlArg >= 0 ? path.resolve(process.argv[htmlArg + 1]) : path.join(DIR, HTML_DEFAULT_REL);
const outArg = process.argv.indexOf('--out');
const outPath = outArg >= 0 ? process.argv[outArg + 1] : null;
const wantMd = process.argv.includes('--md');

let productFlex = null;
let productSha = null;
let sourceNote = 'CUR (hardcoded Pre-Colors role table)';
try {
  const html = fs.readFileSync(htmlPath, 'utf8');
  productSha = createHash('sha256').update(html).digest('hex').slice(0, 16);
  const m = html.match(/<script[^>]*>([\s\S]*?)<\/script>/);
  if (m) {
    const fm = m[1].match(/const FLEX\s*=\s*(\{[\s\S]*?\});\n/);
    if (fm) productFlex = eval('(' + fm[1] + ')');
    sourceNote = `FLEX extracted from ${htmlPath}`;
  }
} catch (e) {
  // product unavailable; fall back to hardcoded CUR
}

const g = JSON.parse(fs.readFileSync(path.join(DIR, 'flex.json'), 'utf8'));
const roles = Object.keys(g.flex || {});
const dest = new Set([...roles, 'NICKEL', 'DIME']);

const added = [], removed = [], changed = [];
for (const f of roles) {
  const n = g.flex[f] || {};
  const o = (productFlex && productFlex[f]) || CUR[f] || {};
  new Set([...Object.keys(n), ...Object.keys(o)]).forEach(d => {
    if (!dest.has(d)) return;
    if (n[d] != null && o[d] == null) added.push({ from: f, to: d, owner: n[d], product: null });
    else if (n[d] == null && o[d] != null) removed.push({ from: f, to: d, owner: null, product: o[d] });
    else if (n[d] !== o[d]) changed.push({ from: f, to: d, owner: n[d], product: o[d] });
  });
}

const qbFs = changed.find(c => c.from === 'QB' && c.to === 'FS')
  || added.find(c => c.from === 'QB' && c.to === 'FS');
const qbFsIssue = qbFs
  ? `QB->FS: Owner flex.json = ${qbFs.owner}, product FLEX.QB = {} => any QB flex = EMERGENCY_PENALTY ${EMERGENCY_PENALTY}. MISMATCH (D-010).`
  : 'QB->FS: no mismatch found.';

const out = {
  tool: 'flex-audit.mjs', seat: 'super', date: new Date().toISOString(),
  product: htmlPath, productSha256: productSha || 'unknown',
  ownerFlexSource: sourceNote,
  roles: roles.length,
  rules: Object.values(g.flex || {}).reduce((a, t) => a + Object.keys(t || {}).length, 0),
  added, removed, changed,
  qbFsIssue,
  mismatchCount: added.length + removed.length + changed.length,
  ok: added.length === 0 && removed.length === 0 && changed.length === 0
};

const md = []
  .concat('# Flex audit — product FLEX vs Owner flex.json', '')
  .concat(`product: ${htmlPath} (sha256 ${out.productSha256})`)
  .concat(`owner flex source: ${sourceNote}`)
  .concat(`roles: ${out.roles} · rules: ${out.rules} · mismatches: ${out.mismatchCount}`)
  .concat(``, '## QB->FS (D-010)', '', qbFsIssue, '')
  .concat(out.changed.length ? ('## CHANGED (' + out.changed.length + '): ' + out.changed.map(c => `${c.from}->${c.to} product=${c.product} => owner=${c.owner}`).join('; ')) : '## CHANGED: none', '')
  .concat(out.added.length ? ('## ADDED (owner only): ' + out.added.map(c => `${c.from}->${c.to} = ${c.owner}`).join('; ')) : '## ADDED (owner only): none', '')
  .concat(out.removed.length ? ('## REMOVED (product only): ' + out.removed.map(c => `${c.from}->${c.to} was ${c.product}`).join('; ')) : '## REMOVED (product only): none', '')
  .concat(``, out.ok ? 'FLEXAUDIT OK: product and Owner flex tables agree.' : 'FLEXAUDIT MISMATCH: see D-010 / above.');

console.log(md.join('\n'));

if (outPath) fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
if (wantMd) fs.writeFileSync(outPath ? outPath.replace(/\.json$/, '.md') : 'flex-audit-report.md', md.join('\n') + '\n');
process.exit(out.ok ? 0 : 1);
