// Drive-ending mix test: does the GLM's -1.07% drives shift come from a different
// mix of drive-ending results, or from a lower per-snap drive-ending hazard?
// Uses the engine's own drive_start / snap / drive_end events at 65673a00. No engine edit.
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

const ENDS = ['td', 'fg', 'fgmiss', 'punt', 'to', 'downs', 'safety', 'deftd', 'clock'];

function tally(mode) {
  const agg = {
    games: 0, drives: 0, offsnaps: 0, snaps: 0, sacks: 0, pts: 0,
    ends: Object.fromEntries(ENDS.map((e) => [e, 0])),
    playsPerDrive: [], // per game
  };
  for (let g = 0; g < N; g++) {
    const k = gameKeyOf('glm-bar:' + g);
    const out = mode === 'glm' ? runGame(P, k, { passClass: M }) : runGame(P, k);
    let drives = 0, offsnaps = 0, sacks = 0;
    const open = new Map(); // drive number -> {snaps, result}
    for (const ev of out.events) {
      if (ev.kind === 'drive_start') { drives++; open.set(ev.payload.drive, { snaps: 0, result: null }); }
      else if (ev.kind === 'snap') {
        const o = open.get(ev.payload.drive);
        if (o) o.snaps++;
        if (ev.payload.call === 0 || ev.payload.call === 1) { offsnaps++; if (ev.payload.sack) sacks++; }
      } else if (ev.kind === 'drive_end') {
        const o = open.get(ev.payload.drive);
        if (o) o.result = ev.payload.result;
      }
    }
    // any drive still open at the clock = ended by clock
    for (const [, o] of open) if (o.result === null) o.result = 'clock';
    agg.games++; agg.drives += drives; agg.offsnaps += offsnaps; agg.sacks += sacks;
    agg.pts += out.points[0] + out.points[1];
    for (const o of open.values()) agg.ends[o.result]++;
    agg.playsPerDrive.push(drives ? offsnaps / drives : 0);
  }
  return agg;
}

const A = tally('pools');
const B = tally('glm');
const mean = (x) => x / A.games;
const f = (x, d = 3) => x.toFixed(d);
const pct = (x, t) => ((x / t) * 100).toFixed(3) + '%';

console.log('drive-ending mix test  |  architect tip 65673a00  |  node ' + process.version);
console.log('paired keys "glm-bar:0..' + (N - 1) + '"  (' + A.games + ' games, 2 nodes)\n');
console.log('metric                    pools       glm      diff     diff%');
console.log('drives                  ', f(mean(A.drives)), '   ', f(mean(B.drives)), '  ', f(mean(B.drives) - mean(A.drives)), '  ', (((mean(B.drives) - mean(A.drives)) / mean(A.drives)) * 100).toFixed(2) + '%');
console.log('offensive snaps         ', f(mean(A.offsnaps)), '   ', f(mean(B.offsnaps)), '  ', f(mean(B.offsnaps) - mean(A.offsnaps)), '  ', (((mean(B.offsnaps) - mean(A.offsnaps)) / mean(A.offsnaps)) * 100).toFixed(2) + '%');
console.log('snaps per drive         ', f(mean(A.offsnaps) / mean(A.drives), 4), '  ', f(mean(B.offsnaps) / mean(B.drives), 4), ' ', f(mean(B.offsnaps) / mean(B.drives) - mean(A.offsnaps) / mean(A.drives), 4));
console.log('sacks                   ', f(mean(A.sacks)), '   ', f(mean(B.sacks)), '  ', f(mean(B.sacks) - mean(A.sacks)), '  ', (((mean(B.sacks) - mean(A.sacks)) / mean(A.sacks)) * 100).toFixed(2) + '%');
console.log('points                  ', f(mean(A.pts)), '   ', f(mean(B.pts)), '  ', f(mean(B.pts) - mean(A.pts)));

console.log('\ndrive-ending result mix (share of all drives that end that way)');
console.log('result        pools      glm     diff(pp)   n_pools   n_glm');
for (const e of ENDS) {
  const sp = A.ends[e] / A.drives, sg = B.ends[e] / B.drives;
  console.log(e.padEnd(12), pct(A.ends[e], A.drives).padStart(8), pct(B.ends[e], B.drives).padStart(9),
    ((sg - sp) * 100).toFixed(3).padStart(9), String(A.ends[e]).padStart(10), String(B.ends[e]).padStart(8));
}

// decomposition: drives = offsnaps * hazard, hazard = sum over results of P(end in r | snap)
console.log('\nper-snap drive-ending hazard by result (ends per 1000 offensive snaps)');
console.log('result        pools     glm      diff');
for (const e of ENDS) {
  const hp = A.ends[e] / A.offsnaps, hg = B.ends[e] / B.offsnaps;
  console.log(e.padEnd(12), (hp * 1000).toFixed(4).padStart(9), (hg * 1000).toFixed(4).padStart(9), ((hg - hp) * 1000).toFixed(4).padStart(9));
}
const hAp = 1 / (mean(A.offsnaps) / mean(A.drives));
const hAg = 1 / (mean(B.offsnaps) / mean(B.drives));
console.log('TOTAL hazard', (hAp * 1000).toFixed(4).padStart(9), (hAg * 1000).toFixed(4).padStart(9), ((hAg - hAp) * 1000).toFixed(4).padStart(9));

// counterfactual: if the GLM had the pools' hazard but its own offsnap count
const cf = mean(B.offsnaps) * hAp;
console.log('\ncounterfactual drives if GLM used the POOLS hazard:', cf.toFixed(3), ' (glm actual', mean(B.drives).toFixed(3), ', pools', mean(A.drives).toFixed(3) + ')');
console.log('=> share of the drives gap explained by the hazard difference:',
  (((cf - mean(A.drives)) / (mean(B.drives) - mean(A.drives))) * 100).toFixed(1) + '%');