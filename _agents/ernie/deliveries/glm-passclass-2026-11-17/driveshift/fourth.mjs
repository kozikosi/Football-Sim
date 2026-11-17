// 4th-down outcomes, taken from the drive result rather than inferred from yards.
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

function tally(mode) {
  let g4 = 0, g4downs = 0, g4other = 0, g4puntfg = 0;
  const dist = { '1-2': [0, 0], '3-5': [0, 0], '6-10': [0, 0], '11+': [0, 0] };
  let sacks4 = 0, pass4 = 0;
  let downsFromNon4 = 0, downsDrives = 0;
  for (let g = 0; g < N; g++) {
    const k = gameKeyOf('glm-bar:' + g);
    const out = mode === 'glm' ? runGame(P, k, { passClass: M }) : runGame(P, k);
    const dr = new Map();
    for (const ev of out.events) {
      if (ev.kind === 'drive_start') dr.set(ev.payload.drive, { snaps: [], result: null });
      else if (ev.kind === 'snap') { const d = dr.get(ev.payload.drive); if (d) d.snaps.push(ev.payload); }
      else if (ev.kind === 'drive_end') { const d = dr.get(ev.payload.drive); if (d) d.result = ev.payload.result; }
    }
    for (const [, d] of dr) {
      const end = d.result || 'clock';
      if (end === 'downs') {
        downsDrives++;
        const last = d.snaps[d.snaps.length - 1];
        if (!last || last.down !== 4) downsFromNon4++;
      }
      const i4 = d.snaps.findIndex((s) => s.down === 4);
      if (i4 < 0) continue;
      const s = d.snaps[i4];
      if (s.call === 0 || s.call === 1) {
        g4++;
        if (s.sack) sacks4++;
        if (s.call === 0) pass4++;
        const b = s.ytg <= 2 ? '1-2' : s.ytg <= 5 ? '3-5' : s.ytg <= 10 ? '6-10' : '11+';
        if (end === 'downs') { g4downs++; dist[b][0]++; } else { g4other++; dist[b][1]++; }
      } else g4puntfg++;
    }
  }
  return { g4, g4downs, g4other, g4puntfg, dist, sacks4, pass4, downsFromNon4, downsDrives };
}

const A = tally('pools'), B = tally('glm');
const G = A.downsDrives / N;
const H = B.downsDrives / N;
const pc = (x, y) => ((x / y) * 100).toFixed(2) + '%';
console.log('4th-down detail | 65673a00 | node ' + process.version + ' | ' + N + ' paired games\n');
console.log('per game                                  pools       glm      diff');
console.log('4th-down snaps (any call)              ', (A.g4 / N + A.g4puntfg / N).toFixed(3).padStart(8), (B.g4 / N + B.g4puntfg / N).toFixed(3).padStart(9));
console.log('4th-down snaps that go for it (pass/run)', (A.g4 / N).toFixed(3).padStart(8), (B.g4 / N).toFixed(3).padStart(9), ((B.g4 - A.g4) / N).toFixed(3).padStart(9));
console.log('  of those, a sack                     ', (A.sacks4 / N).toFixed(3).padStart(8), (B.sacks4 / N).toFixed(3).padStart(9), ((B.sacks4 - A.sacks4) / N).toFixed(3).padStart(9));
console.log('  of those, a pass                     ', (A.pass4 / N).toFixed(3).padStart(8), (B.pass4 / N).toFixed(3).padStart(9));
console.log('4th-down punts / fg                    ', (A.g4puntfg / N).toFixed(3).padStart(8), (B.g4puntfg / N).toFixed(3).padStart(9));
console.log('drives ending "downs"                  ', G.toFixed(3).padStart(8), H.toFixed(3).padStart(9), (H - G).toFixed(3).padStart(9));
console.log('  ...of which the last snap was 4th down', (A.g4downs / N).toFixed(3).padStart(8), (B.g4downs / N).toFixed(3).padStart(9));
console.log('  ...downs from a non-4th-down snap      ', (A.downsFromNon4 / N).toFixed(3).padStart(8), (B.downsFromNon4 / N).toFixed(3).padStart(9));
console.log('\nP(downs | went for it on 4th)            ', pc(A.g4downs, A.g4).padStart(8), pc(B.g4downs, B.g4).padStart(9));
console.log('P(not downs | went for it on 4th)        ', pc(A.g4other, A.g4).padStart(8), pc(B.g4other, B.g4).padStart(9));
console.log('sack rate on 4th-down pass/run           ', pc(A.sacks4, A.g4).padStart(8), pc(B.sacks4, B.g4).padStart(9));

console.log('\nby yards-to-go on 4th down (downs / not-downs):');
for (const b of ['1-2', '3-5', '6-10', '11+']) {
  const a = A.dist[b], c = B.dist[b];
  console.log(b.padEnd(6), 'pools', pc(a[0], a[0] + a[1]).padStart(8), 'glm', pc(c[0], c[0] + c[1]).padStart(8), '| n', (a[0] + a[1]) + '/' + (c[0] + c[1]));
}
console.log('\ndowns per game: pools', G.toFixed(4), 'glm', H.toFixed(4), '| share of the -0.285 that is 4th-down-go failures:',
  (((A.g4downs - B.g4downs) / N) / (G - H) * 100).toFixed(1) + '%');