// T4 — replacement-level auditor (colors engine, read-only).
// Documents the engine's replacement definition per slot and compares to real snap/depth usage.
// Run: node tools/mathlab/replacement-level-audit.mjs
const rows = [
  { slot: 'DL5', engineReplacement: '5th-ranked DL, rotation share 0.33 (measured)', realUsage: 'rank5 mean 32.8% snaps 2023-2025 (VERIFIED dl5-snaps.py)', status: 'VERIFIED', sensitivity: 'weight 91..184 across 22%-44% share' },
  { slot: 'CB3/NICKEL', engineReplacement: '3rd CB, situational (dime share)', realUsage: 'UNKNOWN — needs snap counts by DB depth', status: 'UNKNOWN', sensitivity: 'TODO' },
  { slot: 'DIME', engineReplacement: '6th DB, situational', realUsage: 'UNKNOWN', status: 'UNKNOWN', sensitivity: 'TODO' },
  { slot: 'SAM', engineReplacement: 'OLB2 / situational', realUsage: 'UNKNOWN', status: 'UNKNOWN', sensitivity: 'TODO' },
  { slot: 'FB', engineReplacement: 'fullback, low share', realUsage: 'UNKNOWN', status: 'UNKNOWN', sensitivity: 'TODO' },
  { slot: 'TE2/TE3', engineReplacement: 'backup TE, fixed share (recv)', realUsage: 'UNKNOWN — personnel-shares.py has offense personnel', status: 'PARTIAL', sensitivity: 'TODO' },
];
console.log('T4 replacement-level audit (scaffold)');
console.log('Engine replacement baseline overall: flat 80 OVR (reference, not replacement level).');
for (const r of rows) console.log(`- ${r.slot}: ${r.status} | ${r.engineReplacement} | real: ${r.realUsage}`);
console.log('\nOpen items: fill realUsage for all slots from nflverse snap_counts by position depth (hash-pinned).');
