// mathlab/flexcheck.mjs — validates flex.json: tiers -2 / -6 / -12 (Owner 8 Nov 2026, P-294), known roles and destinations, a row for every role.
// REV 4 (tiers 0/2/4/6, QB->FS 10) is retired; there is no diff against it any more.
import fs from 'fs';
const g = JSON.parse(fs.readFileSync(new URL('./flex.json', import.meta.url)));
const roles = new Set(g.roles), dest = new Set([...g.roles, 'NICKEL', 'DIME']);
let bad = 0; const bump = m => { console.log('FAIL', m); bad++; };
for (const [f, t] of Object.entries(g.flex)) {
  if (!roles.has(f)) bump('unknown from-role ' + f);
  for (const [d, p] of Object.entries(t)) { if (!dest.has(d)) bump(f + ' -> unknown ' + d); if (![0, 2, 6, 12].includes(p)) bump(f + '->' + d + ' penalty ' + p + ' (allowed: 0, 2, 6, 12)'); }
}
roles.forEach(r => { if (!g.flex[r]) bump('role without row ' + r); });
if (Object.keys(g.flex.QB || {}).join() !== 'FS') bump('QB flexes only to FS');
const tiers = {}; Object.values(g.flex).forEach(t => Object.values(t).forEach(p => { tiers[p] = (tiers[p] || 0) + 1; }));
console.log('rows', roles.size, 'rules', Object.values(g.flex).reduce((a, t) => a + Object.keys(t).length, 0), 'tiers', JSON.stringify(tiers));
// asymmetry report (informational): A->B allowed but B->A missing
const asym = []; roles.forEach(a => Object.keys(g.flex[a] || {}).forEach(b => { if (b !== 'NICKEL' && b !== 'DIME' && roles.has(b) && a !== b && (g.flex[b] || {})[a] == null) asym.push(`${a}->${b}`); }));
console.log('ONE-WAY (info, ' + asym.length + '):', asym.join(' '));
console.log(bad ? 'FLEXCHECK FAIL ' + bad : 'FLEXCHECK OK');
process.exit(bad ? 1 : 0);
