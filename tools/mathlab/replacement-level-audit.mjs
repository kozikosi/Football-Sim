// mathlab/replacement-level-audit.mjs — T4 replacement-level auditor (scaffold).
// Documents the engine's replacement definition per slot and compares to real snap/depth usage.
// Read-only: reads existing mathlab results; never touches a product file or protected constant.
// usage: node replacement-level-audit.mjs [--out results/replacement-level-audit-<date>.md]
// Evidence labels: VERIFIED (measured in this tree) / PARTIAL / UNKNOWN (needs hash-pinned snap-depth data).
import fs from 'fs';
const outArg = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : null;
const ENGINE_BASELINE = 'flat 80 OVR: slotWins(s, ovr) is measured with all other slots at 80, so the engine\'s implicit replacement level is an 80-OVR player at every slot — NOT a position-specific replacement level.';
const slots = [
  { slot: 'DL5', status: 'VERIFIED', basis: '5th-ranked DL rotation share 0.33 (mean), median 35%, middle half 22%-44%, stable 2023-2025 (dl5-snaps.py, nflverse snap_counts, 1632 team-games, REG). Engine weight 91..184 across the 22%-44% share band. Replacement = 4th DL rotated off ~67% of snaps. Who DL5 replaces while on field (uniform over DE1/DE2/DT1/DT2) is INFERRED.' },
  { slot: 'TE3', status: 'PARTIAL', basis: '13 personnel (1RB 3TE 1WR) = 4.40% of plays (personnel-shares.py, nflverse participation 96,624 plays 2023-25); installRecv bakes 4.52% share from WR2 into TE3. Depth-snap split TE2 vs TE3 not yet measured — UNKNOWN component.' },
  { slot: 'CB3', status: 'UNKNOWN', basis: 'needs snap counts by defensive depth (CB1/CB2/CB3/NICKEL/DIME) from hash-pinned nflverse depth_charts + snap_counts.' },
  { slot: 'NICKEL', status: 'UNKNOWN', basis: 'same as CB3.' },
  { slot: 'DIME', status: 'UNKNOWN', basis: 'installDime assumes w=0.15 (~10% of snaps, passing-down leverage INFERRED); not measured against real depth data.' },
  { slot: 'SAM', status: 'UNKNOWN', basis: 'no LB depth snap data in tree.' },
  { slot: 'FB', status: 'UNKNOWN', basis: 'no FB snap/depth data; personnel-shares.py 21 personnel (2RB) = 1.94% of plays is the only related signal.' },
  { slot: 'WR4', status: 'UNKNOWN', basis: '01/00 personnel <1% of plays; WR4 share not measured against real depth.' },
  { slot: 'all others', status: 'UNKNOWN', basis: 'engine uses flat-80 baseline; position-specific replacement levels (replacement QB != replacement K) not built. PFR Approximate Value is the public fallback (position-agnostic).' },
];
let md = '# Replacement-level audit (T4) — engine replacement baseline per slot\n\n';
md += `Generated: ${new Date().toISOString()} · engine baseline: ${ENGINE_BASELINE}\n\n`;
md += '| slot | status | basis / evidence |\n|------|--------|------------------|\n';
for (const s of slots) md += `| ${s.slot} | ${s.status} | ${s.basis} |\n`;
md += `\nFinding: the engine has NO position-specific replacement level — flat 80 OVR everywhere. That makes WAR incomparable across offense/defense/special teams (replacement QB ≠ replacement K). DL5 is the only slot with a measured, baked-in replacement share (0.33). All depth slots (CB3/NICKEL/DIME/SAM/FB/WR4) are UNKNOWN pending hash-pinned snap-depth data. Never auto-apply a replacement level; present as candidate ruling.\n`;
const outPath = outArg || `tools/mathlab/results/replacement-level-audit-${new Date().toISOString().slice(0,10)}.md`;
fs.mkdirSync('tools/mathlab/results', { recursive: true });
fs.writeFileSync(outPath, md);
fs.writeFileSync(outPath.replace(/\.md$/, '.json'), JSON.stringify({ generatedAt: new Date().toISOString(), engineBaseline: ENGINE_BASELINE, slots }, null, 1));
console.log(JSON.stringify({ outPath, nSlots: slots.length, verified: slots.filter(s=>s.status==='VERIFIED').length, unknown: slots.filter(s=>s.status==='UNKNOWN').length, partial: slots.filter(s=>s.status==='PARTIAL').length }, null, 1));
process.exit(0);
