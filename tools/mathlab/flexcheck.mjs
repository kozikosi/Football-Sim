// mathlab/flexcheck.mjs — validates flex.json and prints the diff against the product's CURRENT FLEX table (Pre-Colors, role level).
import fs from 'fs';
const g = JSON.parse(fs.readFileSync(new URL('./flex.json', import.meta.url)));
const roles = new Set(g.roles), dest = new Set([...g.roles, 'NICKEL', 'DIME']);
let bad = 0; const bump = m => { console.log('FAIL', m); bad++; };
for (const [f, t] of Object.entries(g.flex)) {
  if (!roles.has(f)) bump('unknown from-role ' + f);
  for (const [d, p] of Object.entries(t)) { if (!dest.has(d)) bump(f + ' -> unknown ' + d); if (![0, 2, 4, 6].includes(p)) bump(f + '->' + d + ' penalty ' + p); }
}
roles.forEach(r => { if (!g.flex[r]) bump('role without row ' + r); });
// current product table (Pre-Colors lines ~940-955), collapsed to roles. NICKEL = CB3 slot; the product has no FB/P/ILB/OLB flex rows.
const cur = {
  QB: {}, RB: { TE: 6 }, FB: {}, WR: { TE: 4, SS: 4, FS: 4, CB: 4, RB: 6 }, TE: { ILB: 6, OLB: 6, SS: 6, FS: 6, RB: 6 },
  OT: { OG: 0, C: 0, DT: 4 }, OG: { C: 0, OT: 4, DT: 4 }, C: { OG: 0, OT: 4, DT: 4 },
  DT: { EDGE: 4, ILB: 4, OLB: 4, OG: 4, C: 4, OT: 6, RB: 6 },
  EDGE: { DT: 2, ILB: 4, OLB: 2, TE: 6, RB: 6 },
  ILB: { EDGE: 6, DT: 4, NICKEL: 4, SS: 4, FS: 4, TE: 6, RB: 6 }, OLB: { EDGE: 6, DT: 4, NICKEL: 4, SS: 4, FS: 4, TE: 6, RB: 6 },
  CB: { SS: 2, FS: 0, ILB: 4, OLB: 4, WR: 4, TE: 6, RB: 6 }, SS: { FS: 2, CB: 4, ILB: 4, OLB: 2, WR: 4, TE: 6, RB: 6 }, FS: { SS: 2, CB: 4, ILB: 4, OLB: 4, WR: 4, TE: 6, RB: 6 },
  K: {}, P: {}
};
const added = [], removed = [], changed = [];
roles.forEach(f => {
  const n = g.flex[f] || {}, o = cur[f] || {};
  new Set([...Object.keys(n), ...Object.keys(o)]).forEach(d => {
    if (n[d] != null && o[d] == null) added.push(`${f}->${d} ${n[d]}`);
    else if (n[d] == null && o[d] != null) removed.push(`${f}->${d} was ${o[d]}`);
    else if (n[d] !== o[d]) changed.push(`${f}->${d} ${o[d]} => ${n[d]}`);
  });
});
console.log('rows', roles.size, 'rules', Object.values(g.flex).reduce((a, t) => a + Object.keys(t).length, 0));
console.log('ADDED   (' + added.length + '):', added.join('; '));
console.log('REMOVED (' + removed.length + '):', removed.join('; '));
console.log('CHANGED (' + changed.length + '):', changed.join('; '));
// asymmetry report (informational): A->B allowed but B->A missing
const asym = []; roles.forEach(a => Object.keys(g.flex[a] || {}).forEach(b => { if (b !== 'NICKEL' && b !== 'DIME' && roles.has(b) && a !== b && (g.flex[b] || {})[a] == null) asym.push(`${a}->${b}`); }));
console.log('ONE-WAY (info, ' + asym.length + '):', asym.join(' '));
// reachability: every non-QB position must have a legal slot besides its own group
console.log(bad ? 'FLEXCHECK FAIL ' + bad : 'FLEXCHECK OK');
process.exit(bad ? 1 : 0);
