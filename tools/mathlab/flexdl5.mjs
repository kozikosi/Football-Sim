// mathlab/flexdl5.mjs [--write] — derives the flex rule for the DL5 slot from the Owner's flex guide (flex.json); never from taste.
// RULE (Architect proposal, awaiting Owner approval): DL5 is a rotational lineman who lines up inside or outside. DT and EDGE are natural there (0).
//   Any other role may play DL5 at the CHEAPER of its two penalties, role->DT and role->EDGE, and only if the guide allows at least one of them.
//   So DL5 adds no permission the guide did not already give, and never undercuts it. Roles the guide keeps out of both (QB, RB, WR, CB, SS, FS, K, P) stay out.
// Writes flex-dl5.json with --write; otherwise compares it with the derivation (exit 1 on any difference). Test E3d.
import fs from 'fs';
const dir = new URL('.', import.meta.url);
const G = JSON.parse(fs.readFileSync(new URL('./flex.json', dir))).flex;
const derived = {}; let bad = 0; const fail = m => { console.log('FAIL', m); bad++; };
Object.keys(G).forEach(role => {
  if (role === 'DT' || role === 'EDGE') { derived[role] = 0; return; }
  const c = [G[role].DT, G[role].EDGE].filter(v => v != null);
  if (c.length) derived[role] = Math.min(...c);
});
// invariants: never cheaper than the guide allows; never allowed where the guide allows neither route
Object.keys(G).forEach(role => {
  const d = derived[role], a = G[role].DT, b = G[role].EDGE;
  if (role === 'DT' || role === 'EDGE') return;
  if (d == null && (a != null || b != null)) fail(`${role}: guide allows a route to the line but DL5 was not derived`);
  if (d != null && a == null && b == null) fail(`${role}: DL5 allowed without a guide route`);
  if (d != null && d < Math.min(...[a, b].filter(v => v != null))) fail(`${role}: DL5 cheaper than the guide`);
});
const out = { _source: 'Derived by flexdl5.mjs from flex.json (Owner guide REV 2). DL5 = cheaper of role->DT and role->EDGE; DT and EDGE are natural. PROPOSAL until the Owner approves.', flex: {} };
Object.entries(derived).forEach(([r, p]) => { if (r !== 'DT' && r !== 'EDGE') out.flex[r] = { DL5: p }; });
out.natural = ['DT', 'EDGE'];
if (process.argv.includes('--write')) { fs.writeFileSync(new URL('./flex-dl5.json', dir), JSON.stringify(out, null, 1)); console.log('wrote flex-dl5.json'); }
else {
  const cur = JSON.parse(fs.readFileSync(new URL('./flex-dl5.json', dir)));
  if (JSON.stringify(cur.flex) !== JSON.stringify(out.flex) || JSON.stringify(cur.natural) !== JSON.stringify(out.natural)) fail('flex-dl5.json differs from the derivation (re-run with --write after a guide change)');
}
console.log('DL5 rules:', Object.entries(out.flex).map(([r, t]) => `${r} ${t.DL5}`).join(', '), '| natural:', out.natural.join(', '));
console.log(bad ? 'FLEXDL5 FAIL ' + bad : 'FLEXDL5 OK (derived from the guide; flex-dl5.json matches)');
process.exit(bad ? 1 : 0);
