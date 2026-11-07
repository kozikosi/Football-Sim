// mathlab/flexcap.mjs <html> — applies the Owner's flex-penalty cap and re-derives the DL5 rule, then runs the full flex suite.
//   Cap rule (Owner 7 Nov, w79): every flex penalty is capped at 10. Values of 6 -> 10, 12 -> 10. 2s and 4s stay.
//   CB->WR, TE->WR and RB->WR are set to 10 explicitly.
//   After capping, flexdl5.mjs is re-run (--write) so flex-dl5.json follows the guide.
//   Then flexengine.js is run against the product HTML to confirm the engine reproduces the guide on every tag x slot.
// Exit 1 on any failure. Usage: node flexcap.mjs <html>
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const html = process.argv[2];
if (!html) { console.log('usage: node flexcap.mjs <html>'); process.exit(2); }

// 1. cap flex.json in place (idempotent: re-running on an already-capped file is a no-op)
const flexPath = path.join(dir, 'flex.json');
const data = JSON.parse(fs.readFileSync(flexPath, 'utf8'));
let capped = 0;
for (const [role, targets] of Object.entries(data.flex)) {
  for (const [dest, pen] of Object.entries(targets)) {
    let next = pen;
    if (pen === 6) next = 10;
    else if (pen === 12) next = 10;
    if (role === 'CB' && dest === 'WR') next = 10;
    if (role === 'TE' && dest === 'WR') next = 10;
    if (role === 'RB' && dest === 'WR') next = 10;
    if (next !== pen) { targets[dest] = next; capped++; }
  }
}
data._source = 'REV 5, Owner 7 Nov 10:05 HST: flex penalty cap at 10. All 6s -> 10, all 12s -> 10 (none existed). 2s and 4s unchanged. CB->WR=10, TE->WR=10, RB->WR=10. This is the w79 flex table.';
data._notes = Object.assign({}, data._notes, {
  REV5_CAP: 'Owner 7 Nov: every flex penalty is capped at 10. Values of 6 become 10; values of 12 become 10. 2s and 4s are left alone. The three named exceptions (CB->WR, TE->WR, RB->WR) are set to 10 explicitly because the Owner wants no 85+ player flexed off his natural position into WR1, DE1 or OT1 under a -10 cap.'
});
fs.writeFileSync(flexPath, JSON.stringify(data, null, 1) + '\n');
console.log(`flex.json: ${capped} penalties capped to 10`);

// 2. re-derive flex-dl5.json from the capped guide
execFileSync('node', [path.join(dir, 'flexdl5.mjs'), '--write'], { stdio: 'inherit', cwd: dir });

// 3. compile and verify against the product HTML
execFileSync('node', [path.join(dir, 'flexengine.js'), html], { stdio: 'inherit', cwd: dir });

console.log('FLEXCAP OK');