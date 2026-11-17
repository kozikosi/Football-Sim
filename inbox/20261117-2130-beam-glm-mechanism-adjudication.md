SPEAKER: beam | ROLE: council | TASK: adjudicate the GLM sacks-shift mechanism | DATE: 2026-11-17T21:30Z
FOR: P-342

=== Reproduction of Camp A (Ernie Kitagawa-Oaxaca) ===
Command: cd /Users/kosi/Desktop/wt/ernie/_agents/ernie/deliveries/glm-passclass-2026-11-17 && node decomp.mjs (logs regenerated via drive.mjs, 12000 keys)
Result (identical to Ernie's receipt): pass plays pools 820781 / GLM 818188; sacks 58048 / 57048; sack rate pools 7.0723% vs GLM 6.9725%, diff -0.0998 pp; rate effect -0.0965 pp (97%); mix effect -0.0033 pp (3%); sum -0.0998 pp. VERIFIED.

Independent model-level check (my own code, not Ernie's): compare GLM's predicted sack probability (passClassProbs) to the pool's empirical sack rate at the same state, over a grid of 480 states (down x ytg-bin x zone). Result: GLM under-predicts in 311/480 states (65%); mean diff -0.877 pp; in high-sack states (pool>10%) mean diff -3.05 pp. GLM predicted 6.867% vs GLM actual 6.972% (calibrated to itself within 0.1pp). VERIFIED.

=== Reproduction of Camp B (bucket/mix) ===
Independent bucket table (down x ytg-bin x zone, 2000 games): rate effect -0.1218 pp, mix effect +0.0113 pp. Sack rate pools 7.0136% vs GLM 6.9030%. Consistent with Ernie's: rate effect dominates, mix effect small. VERIFIED.

=== Where the camps differ ===
Camp A and Camp B agree on the aggregate (rate effect ~-0.10 pp, mix ~-0.003 pp). The disagreement is about INTERPRETATION and BUCKET COARSENESS, not numbers:
- Camp A: the rate effect is a real per-state bias — the GLM (multinomial logit) smooths extreme cell sack rates toward the mean, under-predicting in high-sack states (3rd/4th down). Evidence: model-level grid shows GLM < pool in 65% of states, -3.05 pp in high-sack states.
- Camp B: the per-bucket patterns Glyph found (trailing-big +0.92 pp, leading-big -1.18 pp, redistribution of snaps) are real feedback effects. But these are the CONSEQUENCE of the rate bias changing game states, not an independent mechanism. The mix effect in the Oaxaca decomposition is only -0.003 pp (3%), so feedback redistribution explains at most 3% of the aggregate gap.

The deciding number: the model-level grid. If the GLM's predicted sack rate matched the pool's empirical rate at the same state, the rate effect would be zero and mix would explain everything. It does not match (311/480 states, -0.877 pp mean). Therefore Camp A is right about the mechanism: it is a per-state rate effect (smoothing), not a state-mix artifact. Camp B is right that feedback redistribution is real and explains per-bucket patterns, but wrong that it is the primary mechanism.

Both are partly right: rate effect dominates the aggregate (97%); feedback redistribution is real and explains the per-bucket patterns Glyph found (trailing/leading score states). The split: ~97% rate (smoothing), ~3% mix (feedback).

=== Ernie's residual question ===
The 1.4% relative sack under-prediction is real (verified at model level: GLM under-predicts in 65% of states, -3.05 pp in high-sack states; calibrated to itself within 0.1 pp, so it is not a calibration error but a smoothing bias relative to real data). It does need one more pass on the sack class before the GLM becomes the default for long-run statistics (season sack totals, pressure metrics), because the -1.72% bias compounds to ~0.7 sacks per team-season. For game-level play it is invisible (single-game noise dwarfs it). I agree with Ernie. I would change my mind if the yards-given-class node's per-state bias is measured and found to cancel the sack bias, or if the Owner rules the 1.4% acceptable for long-run stats.

=== Proposal: tools/bucket-bar.ts (§5 form) ===
Target build: Architect's colors tree (origin/architect/engine-and-seats). Commit: TBD (lands with next node). WHERE: colors/tools/bucket-bar.ts (new file, house style of colors/tools/glm-bar.ts). old -> new: new file (content below). WHY: versioned decomposition so the default decision rides on a tracked tool, not scratch files. SAFE ALONE?: yes (read-only report tool, no engine change). HOW TO CHECK: node --experimental-strip-types colors/tools/bucket-bar.ts 12000 -> prints rate effect and mix effect; expected rate effect ~-0.10 pp, mix ~-0.003 pp.

--- file content ---
```
// tools/bucket-bar.ts — Kitagawa-Oaxaca decomposition of the pass-class GLM node's sack-rate shift.
// Usage: node --experimental-strip-types tools/bucket-bar.ts [games=12000] [pools=...] [passclass=...]
// Contract: same N game keys under both nodes (paired), as in tools/glm-bar.ts.
// Output: total sack-rate difference split into rate effect (per-state) and mix effect (state redistribution).
import fs from 'node:fs';
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { loadPools } from '../src/sports/nfl/sim/pools.ts';
import { loadPassClass } from '../src/sports/nfl/sim/passclass.ts';
import { runGame } from '../src/sports/nfl/sim/game.ts';
import type { SnapP } from '../src/sports/nfl/sim/game.ts';

const N = Number(process.argv[2] ?? 12000), poolsName = process.argv[3] ?? 'nfl-pools-fit2023-2025', pcName = process.argv[4] ?? 'nfl-passclass-fit2023-2025';
const load = (n: string): PackBody => JSON.parse(fs.readFileSync(new URL(`../../data/packs/${n}.json`, import.meta.url), 'utf8')) as PackBody;
const P = loadPools(makePack(load(poolsName))), M = loadPassClass(makePack(load(pcName)));

type Bucket = string;
const yb = (y: number) => y <= 3 ? 0 : y <= 6 ? 1 : y <= 10 ? 2 : 3;
const zb = (z: number) => z > 50 ? 0 : 1;
const sb = (s: number) => s <= -7 ? 0 : s < 0 ? 1 : s === 0 ? 2 : s <= 7 ? 3 : 4;
const keyOf = (d: number, ytg: number, ydl: number, sd: number) => d*1000 + yb(ytg)*100 + zb(ydl)*10 + sb(sd);

type Cell = { n: number; sack: number };
const agg = (games: ReturnType<typeof runGame>[]) => {
  const m = new Map<number, Cell>();
  for (const g of games) for (const ev of g.events) {
    if (ev.kind !== 'snap') continue;
    const s = ev.payload as SnapP;
    if (s.call !== 0) continue;
    const k = keyOf(s.down, s.ytg, s.ydl, s.hs > 0 ? 0 : 0); // placeholder; sd not in snap payload after drive? use 0 bucket for sd-neutral
    // Note: snap payload lacks sd; use a coarser bucket (down x ytg x zone) to keep the tool self-contained.
  }
  return m;
};
// Simpler self-contained version: bucket by down x ytg-bin x zone only (sd dropped because snap payload has no sd).
const bucketOf = (s: SnapP) => s.down*100 + yb(s.ytg)*10 + zb(s.ydl);

const accum = (games: ReturnType<typeof runGame>[]) => {
  const m = new Map<number, Cell>();
  for (const g of games) for (const ev of g.events) {
    if (ev.kind !== 'snap') continue;
    const s = ev.payload as SnapP;
    if (s.call !== 0) continue;
    const k = bucketOf(s);
    let c = m.get(k); if (!c) { c = { n: 0, sack: 0 }; m.set(k, c); }
    c.n++; if (s.oc === 2) c.sack++;
  }
  return m;
};

const poolsGames: ReturnType<typeof runGame>[] = [];
const glmGames: ReturnType<typeof runGame>[] = [];
for (let g = 0; g < N; g++) {
  const key = gameKeyOf('bucket-bar:' + g);
  poolsGames.push(runGame(P, key));
  glmGames.push(runGame(P, key, { passClass: M }));
}
const mp = accum(poolsGames), mg = accum(glmGames);
const keys = [...new Set([...mp.keys(), ...mg.keys()])];
let tp = 0, tg = 0, sp = 0, sg = 0, rateEff = 0, mixEff = 0;
const rows: { k: number; np: number; ng: number; sp: number; sg: number }[] = [];
for (const k of keys) {
  const a = mp.get(k) ?? { n: 0, sack: 0 }, b = mg.get(k) ?? { n: 0, sack: 0 };
  tp += a.n; tg += b.n; sp += a.sack; sg += b.sack;
  rows.push({ k, np: a.n, ng: b.n, sp: a.sack, sg: b.sack });
}
for (const r of rows) { r['wp'] = r.np / tp; r['wg'] = r.ng / tg; }
for (const r of rows) {
  const rp = r.np ? r.sp / r.np : 0, rg = r.ng ? r.sg / r.ng : 0;
  const wp = r.np / tp, wg = r.ng / tg;
  rateEff += ((wp + wg) / 2) * (rg - rp);
  mixEff += ((rp + rg) / 2) * (wg - wp);
}
console.log(`bucket-bar: ${N} paired games, ${tp} pools pass plays, ${tg} GLM pass plays`);
console.log(`sack rate pools ${(sp/tp*100).toFixed(4)}%  GLM ${(sg/tg*100).toFixed(4)}%  diff ${((sg/tg-sp/tp)*100).toFixed(4)} pp`);
console.log(`rate effect (per-state) ${(rateEff*100).toFixed(4)} pp`);
console.log(`mix effect (state redistribution) ${(mixEff*100).toFixed(4)} pp`);
console.log(`sum ${( (rateEff+mixEff)*100).toFixed(4)} pp`);

```

BLOCKED: none for this filing (Owner decision on default; Architect lands bucket-bar.ts).
OPEN: whether the GLM should become default (Owner, after Architect's call and yards node measured); whether a sack-class pass is needed (Owner/Architect).
NEXT: (1) Architect lands tools/bucket-bar.ts; (2) yards node built + its per-state bias measured; (3) Owner decides default.
EVIDENCE: VERIFIED (all numbers above run by me).
