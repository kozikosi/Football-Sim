// Mechanism pass: why does the GLM produce fewer 'downs' endings and fewer sacks?
// Play-level, from the same paired keys. No engine edit.
import fs from 'node:fs';
import { makePack } from '/tmp/glmrec2/colors/src/core/pack.ts';
import { gameKeyOf } from '/tmp/glmrec2/colors/src/core/keyedrng.ts';
import { loadPools } from '/tmp/glmrec2/colors/src/sports/nfl/sim/pools.ts';
import { loadPassClass } from '/tmp/glmrec2/colors/src/sports/nfl/sim/passclass.ts';
import { runGame } from '/tmp/glmrec2/colors/src/sports/nfl/sim/game.ts';

const load = (n) => JSON.parse(fs.readFileSync('/tmp/glm/data/packs/' + n + '.json', 'utf8'));
const P = loadPools(makePack(load('nfl-pools-fit2023-2025')));
const M = loadPassClass(makePack(load('nfl-passclass-fit2023-2025')));
const N = Number(process.argv[2] || 12000);

const CALLNAME = ['pass', 'run', 'punt', 'fg', 'kneel', 'spike'];

function tally(mode) {
  const A = {
    games: 0, drives: 0, drives4th: 0, fourthSnaps: 0, fourthGo: 0, fourthConv: 0, fourthFail: 0,
    sacks: [0, 0, 0, 0, 0], pass: [0, 0, 0, 0, 0], run: [0, 0, 0, 0, 0],
    downsDrives: 0, downsDrivesWithSack: 0, sacksInDownsDrives: 0,
    drivesWithSack: 0, sacksTotal: 0,
    fourthCall: [0, 0, 0, 0, 0, 0],
    thirdDownAtt: 0, thirdDownConv: 0,
  };
  for (let g = 0; g < N; g++) {
    const k = gameKeyOf('glm-bar:' + g);
    const out = mode === 'glm' ? runGame(P, k, { passClass: M }) : runGame(P, k);
    const drives = new Map(); // n -> {snaps:[], result:null}
    for (const ev of out.events) {
      if (ev.kind === 'drive_start') drives.set(ev.payload.drive, { snaps: [], result: null });
      else if (ev.kind === 'snap') {
        const d = drives.get(ev.payload.drive);
        if (d) d.snaps.push({ down: ev.payload.down, ytg: ev.payload.ytg, ydl: ev.payload.ydl, call: ev.payload.call, sack: ev.payload.sack, yards: ev.payload.yards, oc: ev.payload.oc });
      } else if (ev.kind === 'drive_end') {
        const d = drives.get(ev.payload.drive);
        if (d) d.result = ev.payload.result;
      }
    }
    A.games++; A.drives += drives.size;
    for (const [, d] of drives) {
      const end = d.result || 'clock';
      const nsack = d.snaps.reduce((s, x) => s + (x.sack ? 1 : 0), 0);
      if (nsack > 0) A.drivesWithSack++;
      A.sacksTotal += nsack;
      if (end === 'downs') { A.downsDrives++; A.sacksInDownsDrives += nsack; if (nsack > 0) A.downsDrivesWithSack++; }
      for (const s of d.snaps) {
        const dn = s.down - 1;
        if (s.call === 0) { A.pass[dn]++; if (s.sack) A.sacks[dn]++; }
        else if (s.call === 1) { A.run[dn]++; if (s.sack) A.sacks[dn]++; }
        if (s.down === 3) { A.thirdDownAtt++; if (s.yards >= s.ytg || s.oc === 6) A.thirdDownConv++; }
        if (s.down === 4) {
          A.fourthSnaps++; A.fourthCall[s.call]++;
          if (s.call === 0 || s.call === 1) {
            A.fourthGo++;
            if (s.yards >= s.ytg || s.oc === 6) A.fourthConv++; else A.fourthFail++;
          }
        }
      }
      if (d.snaps.some((s) => s.down === 4)) A.drives4th++;
    }
  }
  return A;
}

const A = tally('pools'), B = tally('glm');
const m = (x) => x / A.games;
const pc = (a, b) => ((a / b) * 100).toFixed(3) + '%';
console.log('mechanism pass | architect tip 65673a00 | node ' + process.version + ' | ' + A.games + ' paired games\n');
console.log('per game                              pools       glm      diff');
console.log('drives                             ', m(A.drives).toFixed(3).padStart(8), m(B.drives).toFixed(3).padStart(9), (m(B.drives) - m(A.drives)).toFixed(3).padStart(9));
console.log('drives that reach 3rd+4th down     ', (A.drives4th / A.games).toFixed(3).padStart(8), (B.drives4th / B.games).toFixed(3).padStart(9), ((B.drives4th - A.drives4th) / A.games).toFixed(3).padStart(9));
console.log('drives with >=1 sack               ', (A.drivesWithSack / A.games).toFixed(3).padStart(8), (B.drivesWithSack / B.games).toFixed(3).padStart(9), ((B.drivesWithSack - A.drivesWithSack) / A.games).toFixed(3).padStart(9));
console.log('sacks per game                     ', m(A.sacksTotal).toFixed(3).padStart(8), m(B.sacksTotal).toFixed(3).padStart(9), (m(B.sacksTotal) - m(A.sacksTotal)).toFixed(3).padStart(9));
console.log('drives ending "downs"              ', (A.downsDrives / A.games).toFixed(3).padStart(8), (B.downsDrives / B.games).toFixed(3).padStart(9), ((B.downsDrives - A.downsDrives) / A.games).toFixed(3).padStart(9));

console.log('\nsacks by down (count, all plays)');
for (let i = 0; i < 5; i++) {
  const lbl = (i + 1) + (i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th');
  console.log(lbl.padEnd(6), String(A.sacks[i]).padStart(9), String(B.sacks[i]).padStart(9), (B.sacks[i] - A.sacks[i]).toString().padStart(9));
}
console.log('\npass / run attempts by down (all plays)');
for (let i = 0; i < 5; i++) {
  const lbl = (i + 1) + (i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th');
  console.log(lbl.padEnd(6), 'pass', String(A.pass[i]).padStart(8), String(B.pass[i]).padStart(8), '| run', String(A.run[i]).padStart(8), String(B.run[i]).padStart(8));
}

console.log('\n4th down: what happens there');
console.log('4th-down snaps per game            ', (A.fourthSnaps / A.games).toFixed(3).padStart(8), (B.fourthSnaps / B.games).toFixed(3).padStart(9), ((B.fourthSnaps - A.fourthSnaps) / A.games).toFixed(3).padStart(9));
console.log('  4th-down calls  pass             ', pc(A.fourthCall[0], A.fourthSnaps).padStart(8), pc(B.fourthCall[0], B.fourthSnaps).padStart(9));
console.log('  4th-down calls  run              ', pc(A.fourthCall[1], A.fourthSnaps).padStart(8), pc(B.fourthCall[1], B.fourthSnaps).padStart(9));
console.log('  4th-down calls  punt             ', pc(A.fourthCall[2], A.fourthSnaps).padStart(8), pc(B.fourthCall[2], B.fourthSnaps).padStart(9));
console.log('  4th-down calls  fg               ', pc(A.fourthCall[3], A.fourthSnaps).padStart(8), pc(B.fourthCall[3], B.fourthSnaps).padStart(9));
console.log('  went for it (pass|run) per game  ', (A.fourthGo / A.games).toFixed(3).padStart(8), (B.fourthGo / B.games).toFixed(3).padStart(9), ((B.fourthGo - A.fourthGo) / A.games).toFixed(3).padStart(9));
console.log('  convert | went (ydl reached/TD)  ', pc(A.fourthConv, A.fourthGo).padStart(8), pc(B.fourthConv, B.fourthGo).padStart(9));
console.log('  FAIL  | went  = "downs"         ', pc(A.fourthFail, A.fourthGo).padStart(8), pc(B.fourthFail, B.fourthGo).padStart(9));
console.log('  downs-ending drives per game     ', (A.downsDrives / A.games).toFixed(3).padStart(8), (B.downsDrives / B.games).toFixed(3).padStart(9));

console.log('\nfor drives that END in "downs": sacks in the drive');
console.log('  downs drives with >=1 sack       ', pc(A.downsDrivesWithSack, A.downsDrives).padStart(8), pc(B.downsDrivesWithSack, B.downsDrives).padStart(9));
console.log('  mean sacks in a downs drive      ', (A.sacksInDownsDrives / A.downsDrives).toFixed(4).padStart(8), (B.sacksInDownsDrives / B.downsDrives).toFixed(4).padStart(9));

// chain: how much of the 'downs' drop is the sack drop?
const downsDrop = (A.downsDrives - B.downsDrives) / A.games;
const sackDrop = (A.sacksTotal - B.sacksTotal) / A.games;
const sacksPerDowns = A.sacksInDownsDrives / A.downsDrives;
console.log('\nchain');
console.log('  Δdowns per game                  ', (-downsDrop).toFixed(4));
console.log('  Δsacks per game                  ', (-sackDrop).toFixed(4));
console.log('  ratio (sacks per downs-drive lost)', (downsDrop / sackDrop).toFixed(3));
console.log('  mean sacks in a pools downs drive ', sacksPerDowns.toFixed(4));