import fs from 'node:fs';
import { makePack } from '/tmp/glmrec/src/core/pack.ts';
import { gameKeyOf } from '/tmp/glmrec/src/core/keyedrng.ts';
import { loadPools } from '/tmp/glmrec/src/sports/nfl/sim/pools.ts';
import { loadPassClass } from '/tmp/glmrec/src/sports/nfl/sim/passclass.ts';
import { runGame } from '/tmp/glmrec/src/sports/nfl/sim/game.ts';
import { gameTotals } from '/tmp/glmrec/src/sports/nfl/sim/totals.ts';
const load = (n) => JSON.parse(fs.readFileSync('/tmp/glm/data/packs/'+n+'.json','utf8'));
const P = loadPools(makePack(load('nfl-pools-fit2023-2025')));
const M = loadPassClass(makePack(load('nfl-passclass-fit2023-2025')));
const rows = [];
for (let g=0; g<12000; g++) {
  const k = gameKeyOf('glm-bar:'+g);
  const a = gameTotals(runGame(P, k)), b = gameTotals(runGame(P, k, {passClass: M}));
  rows.push({ a, b });
}
const f = (o, k) => (o.A[k] + o.B[k]) / 2;   // per team-game mean, as glm-bar reports
const mean = (k, s) => rows.reduce((t, r) => t + f(r[s], k), 0) / rows.length;
const avg = (xs) => xs.reduce((t, x) => t + x, 0) / xs.length;
const corr = (x, y) => { const mx = avg(x), my = avg(y); let n=0, dx=0, dy=0; for (let i=0;i<x.length;i++){ n+=(x[i]-mx)*(y[i]-my); dx+=(x[i]-mx)**2; dy+=(y[i]-my)**2; } return n/Math.sqrt(dx*dy); };
const keys = ['points','drives','plays','off_plays','pass_att','rush_att','completions','yards','sacks','giveaways'];
console.log('metric        pools     glm     diff');
for (const k of keys) console.log(k.padEnd(12), mean(k,'a').toFixed(3).padStart(8), mean(k,'b').toFixed(3).padStart(8), (mean(k,'b')-mean(k,'a')).toFixed(3).padStart(8));
const dd = rows.map(r => f(r.b,'drives') - f(r.a,'drives'));
const ds = rows.map(r => f(r.b,'sacks') - f(r.a,'sacks'));
const dp = rows.map(r => f(r.b,'plays') - f(r.a,'plays'));
const dw = rows.map(r => f(r.b,'yards') - f(r.a,'yards'));
console.log('\ncorr(Δdrives, Δsacks)  =', corr(dd, ds).toFixed(3));
console.log('corr(Δdrives, Δplays)  =', corr(dd, dp).toFixed(3));
console.log('corr(Δdrives, Δyards)  =', corr(dd, dw).toFixed(3));
console.log('mean Δdrives', avg(dd).toFixed(4), '| mean Δsacks', avg(ds).toFixed(4));
// per-drive arithmetic
console.log('\nseconds per drive: pools', (1800/mean('drives','a')).toFixed(1), ' glm', (1800/mean('drives','b')).toFixed(1));
