SPEAKER: glyph | ROLE: council | TASK: adjudicate the GLM sacks-shift mechanism | DATE: 2026-11-17T21:34:25Z
FOR: P-342

## Scope
Adjudicate sacks/drives shift for pass-class GLM node at Architect tip `65673a00` (`origin/architect/engine-and-seats`, “2a: the pass-class GLM node…”). Reproduce Camp A (VL/Ernie) and Camp B (Inkling/Glyph/Beam lean) on 12,000 paired keys, find exact divergence, answer Ernie’s residual question, propose tracked `tools/bucket-bar.ts`. No engine/product edits, no default decision, no fitting.

## Environment / method (VERIFIED)
- Host: macOS arm64 (Darwin 24.6.0), Node `v26.13.0`.
- Source: `git archive origin/architect/engine-and-seats | tar -x -C /tmp/glm-adj` (tip `65673a00`).
- Baseline tool: `colors/tools/glm-bar.ts` run as-is. Independent adjudication: `colors/tools/mech-adj.ts` and `colors/tools/bucket-bar.ts` (proposed, written this session in `/tmp/glm-adj/colors/tools/`) parsing `runGame(...).events` (`ev.kind`, `ev.payload`) with paired keys `gameKeyOf('glm-bar:'+g)` and same packs contract; pass outcomes from `snap.payload` (`call===0` pass, `oc` 0 comp/1 inc/2 sack/3 int). GLM predicted class probs computed via `passClassProbs(M, passFeatures(p.down,p.ytg,p.ydl, sdF,qtrF,hsF))` with OT normalization `qtrF=2, hsF=600, sdF=0` (same as `game.ts`), pre-snap score diff from offense perspective tracked from score/XP events.
- Ernie’s shipped `decomp.mjs` was read (`git show origin/council/ernie:_agents/ernie/deliveries/glm-passclass-2026-11-17/decomp.mjs`, `README.txt`, `drive.mjs`): it expects `/tmp/log-pools.json`/`/tmp/log-glm.json` produced by `drive.mjs` which hardcodes `/tmp/glmrec` and uses `PASSLOG` export not present in architect-tip `game.ts`; I could not run it directly. I reproduced its Kitagawa–Oaxaca (K-O) formula and bucketing independently from the architect tip (not a re-run of his script). Inkling’s/Glyph’s/Beam’s/VL’s filings read from council branches for method/numbers context.

## 1) Baseline paired comparison (VERIFIED, reproduced)
Command: `cd /tmp/glm-adj/colors && node --experimental-strip-types tools/glm-bar.ts 12000`
Output:
```
pools nfl-pools-fit2023-2025 + passclass nfl-passclass-fit2023-2025: 12000 paired games (per team-game means), class-pool holes 0
metric        pools     GLM    diff   diff%   SE(diff)  z
points        23.250  23.391   0.141    0.60    0.076   1.9
drives        11.038  10.920  -0.118   -1.07    0.018  -6.4
plays         74.972  74.915  -0.058   -0.08    0.053  -1.1
off_plays     60.999  60.885  -0.114   -0.19    0.041  -2.8
pass_att      34.199  34.091  -0.108   -0.32    0.043  -2.5
rush_att      26.554  26.542  -0.012   -0.05    0.029  -0.4
completions   20.579  20.509  -0.070   -0.34    0.031  -2.3
yards        328.604 327.827  -0.777   -0.24    0.570  -1.4
sacks          2.419   2.377  -0.042   -1.72    0.014  -3.0
giveaways      1.102   1.101  -0.000   -0.04    0.009  -0.0
top_dt      1789.8231789.470  -0.353   -0.02    0.654  -0.5
```
Agrees with consensus (MUSE/Beam/VL/Inkling/Glyph reports). VERIFIED.

## 2) Camp A reproduction — Ernie-style K-O / per-state rate effect (VERIFIED, independent)
Command: `cd /tmp/glm-adj/colors && node --experimental-strip-types tools/bucket-bar.ts 12000`
Bucketing (matching Ernie’s decomp logic, independently implemented): `down × ytg-bin{0-3,4-6,7-10,11+} × field-side{own if ydl>50 else opp} × score-bin{<=-7,-6..-1,0,1..7,>=8}`. K-O: `rate = Σ ((w_p + w_g)/2)(r_g - r_p)`, `mix = Σ ((r_p + r_g)/2)(w_g - w_p)`.
Output:
```
pools nfl-pools-fit2023-2025 + passclass nfl-passclass-fit2023-2025: 12000 paired games, class-pool holes 0
pass plays pools 820781 glm 818188 (diff -2593)

Kitagawa-Oaxaca, Ernie cells (down x ytg-bin{0-3,4-6,7-10,11+} x field-side{own/opp} x score-bin{<=-7,-6..-1,0,1..7,>=8}):
  sack rate pools 7.0723%  glm 6.9725%  diff -0.0998pp
  rate effect -0.0965pp  mix effect -0.0034pp  sum -0.0998pp  (rate share 96.6%)
  counterfactual (GLM mix * pool per-cell sack rates): 7.0699%  => rate -0.0974pp  mix -0.0024pp
  largest per-cell sack-rate gaps (key np ng pool% glm% diff_pp), n>500 both:
    1111 633 590 8.057 3.220 -4.837
    4112 653 588 5.360 9.354 3.994
    3310 4693 4808 8.864 12.521 3.657
    1010 829 762 2.171 5.381 3.209
    4210 776 969 12.758 9.804 -2.954
    2004 1598 1696 7.009 4.068 -2.940
    4200 614 882 7.655 10.431 2.776
    3110 8716 8660 9.110 11.836 2.726
    3204 5632 5932 12.447 9.761 -2.686
    2012 2739 2725 6.426 3.780 -2.646
```
Comparison to Camp A claims: Ernie reported sacks pools 58048 glm 57048, sack rate 7.0723%/6.9725%, diff -0.0998pp, rate -0.0965 (97%), mix -0.0033 (3%) (REPORTED from his filing/README). My independent reproduction matches: same totals/rates/diff, rate -0.0965pp, mix -0.0034pp (rounding vs -0.0033), 96.6% rate share. VL’s “state-mix negligible, per-state dominates” (REPORTED) is directionally/magnitudinally consistent at this partition. **Camp A aggregate decomposition: REPRODUCED.**

## 3) Camp B reproduction — coarse buckets, redistribution, calibration (VERIFIED, independent)
Same run (`bucket-bar.ts 12000`):

**Coarse K-O (down × ytg-bin{0-3,4-7,8-12,13+}, 16 cells):**
```
  rate effect -0.0992pp  mix effect -0.0006pp  sum -0.0998pp
```
**Down × ytg-bin per-pass rates (calibration on GLM-visited states):**
```
bucket                 nP      nG   sackP%  sackG%  predG%  diff_pp  compP% compG% predC%
1|0-3                   2547    2503   2.63   4.16   3.49     1.52  49.82  48.26  50.99
1|4-7                   4491    4643   6.81   4.52   4.51    -2.29  49.32  53.59  53.68
1|8-12                287726  286238   5.39   5.34   5.40    -0.05  64.04  63.87  63.82
2|0-3                  27514   27360   6.37   5.20   5.31    -1.17  62.43  63.42  63.48
2|13+                  26045   25698   5.79   5.32   5.46    -0.47  64.35  66.10  65.84
2|4-7                  85866   85726   5.80   6.02   6.15     0.23  62.28  61.90  61.68
2|8-12                142226  141561   6.27   6.20   6.17    -0.07  62.46  62.30  62.35
3|0-3                  42831   42775   8.47   8.38   8.43    -0.09  54.85  55.13  55.29
3|13+                  26686   26175  10.17  10.75  10.63     0.58  59.39  56.27  55.94
3|4-7                  84081   83076  10.69  10.52  10.50    -0.17  51.65  52.32  52.28
3|8-12                 71577   71547  11.40  11.29  11.19    -0.11  51.52  52.23  52.51
4|0-3                  10088   11116   6.77   5.85   6.24    -0.92  56.49  54.29  53.89
4|13+                    771     751   9.60   7.46   8.63    -2.14  53.96  54.73  52.65
4|4-7                   5990    6117   8.50   8.35   8.37    -0.14  52.92  50.81  50.29
4|8-12                  2342    2902  10.85   9.96   9.60    -0.89  41.59  48.59  48.60
```
**Context buckets (redistribution + calibration, selected):**
```
bucket                    nP      nG   compP% compG% predC%  incP%  incG% predI%  sackP% sackG% predS%  intP%  intG% predN%
ALL                       820781  818188  60.17  60.16  60.14  30.77  30.86  30.87   7.07   6.97   7.00   1.99   2.01   1.99
not_late                  608914  604901  60.12  61.32  61.28  30.79  29.91  29.95   7.10   6.86   6.86   2.00   1.92   1.91
late(<=300,q2/q4)         207444  208953  60.34  56.77  56.79  30.70  33.63  33.57   7.01   7.31   7.42   1.95   2.29   2.22
trail_big(<=-8)           190714  198487  60.42  58.72  58.63  30.71  31.08  31.08   6.88   7.80   7.90   1.98   2.41   2.39
trail(-7..-1)             223812  213789  60.34  59.87  59.70  30.64  30.90  31.01   7.04   7.03   7.10   1.98   2.20   2.19
tied(0)                   141454  137670  60.05  61.11  61.09  30.82  30.24  30.30   7.11   6.81   6.79   2.02   1.84   1.82
lead(1..7)                164480  159145  60.15  60.67  60.92  30.67  30.92  30.78   7.23   6.66   6.63   1.95   1.75   1.67
lead_big(>=8)             100321  109097  59.55  61.39  61.38  31.25  31.07  31.09   7.20   6.02   5.99   2.01   1.53   1.54
d1                        294764  293384  63.69  63.57  63.55  29.17  29.29  29.30   5.39   5.31   5.37   1.74   1.82   1.78
d2                        281651  280345  62.57  62.64  62.57  29.50  29.56  29.61   6.09   5.97   6.02   1.83   1.83   1.80
d3                        225175  223573  53.14  53.29  53.36  34.05  34.02  33.99  10.43  10.39  10.34   2.39   2.30   2.32
d4                         19191   20886  53.46  52.49  52.06  35.32  36.36  36.66   7.92   7.21   7.42   3.30   3.93   3.86
ytg7-10                   518486  516503  61.51  61.50  61.51  30.09  30.10  30.07   6.52   6.47   6.51   1.88   1.94   1.91
mid(21-80)                653267  651285  61.14  61.09  61.05  29.75  29.85  29.87   7.17   7.07   7.13   1.94   1.99   1.96
d1|ytg7-10                288873  287443  63.99  63.83  63.79  28.88  29.02  29.03   5.40   5.33   5.40   1.74   1.82   1.78
d2|ytg7-10                149760  148934  62.47  62.10  62.16  29.48  29.86  29.80   6.24   6.22   6.21   1.81   1.82   1.84
d3|ytg7-10                 76759   76507  51.04  52.17  52.29  35.38  34.33  34.17  11.16  11.07  11.13   2.42   2.43   2.41
d3|ytg4-6                  64867   64003  51.78  52.33  52.30  35.20  35.13  35.14  10.59  10.43  10.37   2.43   2.11   2.19
OT                          4423    4334  60.19  61.91  61.57  31.18  29.63  29.94   6.65   6.37   6.65   1.99   2.10   1.84

Overall class rates (pass plays):
  pools actual comp/inc/sack/int 60.174% 30.768% 7.072% 1.986%
  glm   actual comp/inc/sack/int 60.159% 30.857% 6.972% 2.012%
  glm   pred   comp/inc/sack/int 60.136% 30.875% 7.003% 1.987%
```
Mapping to Camp B (REPORTED by seats, compared to my VERIFIED run): Inkling’s coarse claim (no single decisive down×ytg bucket; per-pass rates roughly flat overall) is consistent with 16-cell view and small/mixed diffs (big-n buckets near flat; some small-n 1st/4th-down buckets move but offsetting). Glyph’s key facts reproduce: overall sack 7.072% vs 6.972% (-0.100pp), GLM pred 7.00% vs actual 6.97%; large visit redistributions (trail_big 190,714→198,487, lead_big 100,321→109,097, late 207,444→208,953, trail -7..-1 223,812→213,789, tied/lead shifts, d4 19,191→20,886, total passes 820,781→818,188); GLM pred ≈ GLM actual in context buckets while pool-vs-GLM actual diverges in redistributed contexts (e.g. trail_big sack +0.92pp pred 7.90%, lead_big -1.18pp pred 5.99%). **Camp B’s redistribution/calibration observations: REPRODUCED.**

## 4) Exact point of divergence — adjudication (INFERRED from VERIFIED measurements)

**Numbers that decide it:**
- Ernie-cell K-O (VERIFIED): **rate -0.0965pp, mix -0.0034pp, diff -0.0998pp** (96.6% rate). Counterfactual (GLM mix × pool per-Ernie-cell sack rates) = **7.0699%** vs pools 7.0723% (mix -0.0024pp) and GLM actual 6.9725% (rate -0.0974pp).
- Coarse 16-cell K-O (VERIFIED): rate -0.0992pp, mix -0.0006pp.
- Context redistribution is real (VERIFIED): e.g. trail_big n +7,773, sack 6.88→7.80% (pred 7.90%); lead_big n +8,776, sack 7.20→6.02% (pred 5.99%); late n +1,509, comp 60.34→56.77% (pred 56.79%); total pass plays -2,593.

**Where camps differ:**
1. **Bucketing / what “state” means:** K-O attributes to “rate” the within-cell conditional difference at the chosen partition. At partitions aligned with down/ytg/field-side/score (Ernie cells) the sack delta is ~97% rate. Finer alignment with model-relevant conditioning tends to preserve a dominant within-cell rate term when the GLM’s smoothed `p(class|state)` differs from pool empirical cell rates at visited states.
2. **Definition of “rate” vs “mix” under feedback:** Camp A treats the K-O rate term as the mechanism (GLM under-prices sack within same-state buckets / smoothing relative to pool cells). Camp B emphasizes feedback: outcomes alter downstream score/clock/down-distance/possessions so visit distribution shifts; GLM is calibrated to its own predicted conditionals on visited states (pred≈actual overall and by context buckets). But the K-O mix term at Ernie cells is only -0.0034pp for sacks — **within that partition, reweighting visits alone (keeping pool rates) barely changes sacks**. Feedback redistribution is large across other context cuts (score/late/4th down, total pass attempts) and matters for game-flow metrics (drives, plays, context composition), yet it does not arithmetically explain the aggregate sack-rate drop at Ernie-cell granularity.
3. **Sample size (3k vs 12k):** not decisive; 12k confirms direction/magnitudes.

**Adjudication:** **Both are partly right, with a clear split.** (a) The sack-rate delta is **predominantly a per-state conditional-rate effect** (~97% in Ernie-cell K-O; -0.0965pp of -0.0998pp), consistent with GLM conditional probabilities differing from pool empirical rates within those state buckets (smoothing of cell rates). **Camp A is right** on the sack-rate decomposition at model-relevant state granularity. (b) **Feedback/state redistribution is real** (VERIFIED: fewer pass plays, substantial shifts in late/score/4th-down contexts) and GLM is well-calibrated to its own predictions in visited states; this coexists with (a) and is relevant to drives/flow and to heterogeneous bucket patterns (some redistributed contexts see higher GLM sack rates, others lower), but **Camp B’s “mix explains the sack drop” is not supported as the aggregate sack mechanism** by K-O at Ernie/coarse cells (mix ≈ -0.003pp). (c) Drift (6.4% train vs 7.0% 2023–25 real, REPORTED in prior filings) cannot explain the pools-vs-GLM in-sim paired difference on matched 2023–25 packs (same-era comparison), though era effects matter for absolute calibration to real data (separately tracked).

## 5) Ernie’s residual: 1.4% relative sack under-prediction — needed before default for long-run stats? (INFERRED judgement)
- Measured residual: -0.0998pp per pass play = **~1.41% relative** of pools’ 7.0723% sack rate (VERIFIED). Per team-game sacks 2.419→2.377 (-0.042, -1.72%, z -3.0) (VERIFIED). Systematic in paired aggregate (rate-dominated, same sign in K-O), but small in football terms and inside ~10% totals bar.
- **Game-level play:** agree with Ernie — effectively invisible at game level given magnitude.
- **Season/long-run sack totals & pressure metrics:** a systematic ~1.4% lower sack rate vs pool baseline could bias aggregates slightly over a season; not obviously blocking “becoming default later” given small size and GLM’s held-out/log-loss/0-hole advantages (REPORTED by prior reviews), but it is a fidelity consideration if season sack totals are a product-tracked metric.
- **What would change my mind:** (i) tracked season-scale sims show sack totals/pressure metrics drifting outside accepted tolerance vs target baselines; (ii) a versioned bucket/K-O report shows large systematic GLM pred-vs-actual miscalibration for sacks on visited states (current run shows pred 7.003% vs actual 6.972% overall, close). I did not fit theta/lambda and do not propose a fit; this answers “is another sack-class pass needed?” as: **not clearly required by current evidence for game-level/default-later, but worth an explicit check if season sack aggregates are decision-critical** (Owner/Architect decision).

## 6) §5 proposal — land `tools/bucket-bar.ts` (tracked adjudication tool)
**Target:** Architect tip `65673a00` on `origin/architect/engine-and-seats` (colors tree). To be landed by Architect on a future commit.
**WHERE (anchor):** new file `colors/tools/bucket-bar.ts` (no existing file; anchor = directory `colors/tools/` contains `glm-bar.ts`).
**old → new:** add `colors/tools/bucket-bar.ts` with content below (paired keys, same N/packs args as `glm-bar.ts`; emits Ernie-cell K-O + counterfactual, coarse K-O, down×ytg calibration, context-bucket redistribution/calibration, overall class rates).

```ts
// Mechanism adjudication for the pass-class GLM node: per-state rate effect vs state-mix/feedback.
// Paired comparison on the SAME game keys (house style of glm-bar.ts). A REPORT, not a gate.
// Usage: node --experimental-strip-types tools/bucket-bar.ts [games=12000] [pools=nfl-pools-fit2023-2025] [passclass=nfl-passclass-fit2023-2025]
import fs from 'node:fs';
import { makePack } from '../src/core/pack.ts';
import type { PackBody } from '../src/core/pack.ts';
import { gameKeyOf } from '../src/core/keyedrng.ts';
import { loadPools } from '../src/sports/nfl/sim/pools.ts';
import { loadPassClass, passClassProbs, passFeatures } from '../src/sports/nfl/sim/passclass.ts';
import type { PassClass } from '../src/sports/nfl/sim/passclass.ts';
import { runGame } from '../src/sports/nfl/sim/game.ts';

const N = Number(process.argv[2] ?? 12000);
const poolsName = process.argv[3] ?? 'nfl-pools-fit2023-2025';
const pcName = process.argv[4] ?? 'nfl-passclass-fit2023-2025';
const load = (n: string): PackBody => JSON.parse(fs.readFileSync(new URL(`../../data/packs/${n}.json`, import.meta.url), 'utf8')) as PackBody;
const P = loadPools(makePack(load(poolsName)));
const M: PassClass = loadPassClass(makePack(load(pcName)));

const CALL_PASS = 0;
const OC_COMP = 0, OC_INC = 1, OC_SACK = 2, OC_INT = 3;
type Cls = 'comp' | 'inc' | 'sack' | 'int';
const clsOf = (oc: number): Cls | null => (oc === OC_COMP ? 'comp' : oc === OC_INC ? 'inc' : oc === OC_SACK ? 'sack' : oc === OC_INT ? 'int' : null);

interface Cell { n: number; comp: number; inc: number; sack: number; int: number; predComp: number; predInc: number; predSack: number; predInt: number }
const mk = (): Cell => ({ n: 0, comp: 0, inc: 0, sack: 0, int: 0, predComp: 0, predInc: 0, predSack: 0, predInt: 0 });
const add = (c: Cell, cls: Cls, pred?: readonly [number, number, number, number]) => { c.n++; c[cls]++; if (pred) { c.predComp += pred[0]; c.predInc += pred[1]; c.predSack += pred[2]; c.predInt += pred[3]; } };
const bump = <K>(map: Map<K, Cell>, k: K, cls: Cls, pred?: readonly [number, number, number, number]) => { let c = map.get(k); if (!c) { c = mk(); map.set(k, c); } add(c, cls, pred); };
const pct = (x: number, n: number) => (n ? (x / n) * 100 : 0);
const f = (x: number, n: number) => pct(x, n).toFixed(2).padStart(6);

const ybE = (y: number) => (y <= 3 ? 0 : y <= 6 ? 1 : y <= 10 ? 2 : 3);
const zbE = (ydl: number) => (ydl > 50 ? 0 : 1);
const sbE = (s: number) => (s <= -7 ? 0 : s < 0 ? 1 : s === 0 ? 2 : s <= 7 ? 3 : 4);
const keyErnie = (d: number, ytg: number, ydl: number, sd: number) => d * 1000 + ybE(ytg) * 100 + zbE(ydl) * 10 + sbE(sd);
const ybI = (y: number) => (y <= 3 ? 0 : y <= 7 ? 1 : y <= 12 ? 2 : 3);
const keyInk = (d: number, ytg: number) => `${d}|${['0-3', '4-7', '8-12', '13+'][ybI(ytg)]}`;
const ybG = (y: number) => (y <= 1 ? '1' : y <= 3 ? '2-3' : y <= 6 ? '4-6' : y <= 10 ? '7-10' : '11+');
const ydlBinG = (ydl: number) => (ydl <= 5 ? 'goal(<=5)' : ydl <= 20 ? 'rz(6-20)' : ydl <= 80 ? 'mid(21-80)' : 'own(81+)');
const sdBinG = (sd: number) => (sd <= -8 ? 'trail_big(<=-8)' : sd <= -1 ? 'trail(-7..-1)' : sd === 0 ? 'tied(0)' : sd <= 7 ? 'lead(1..7)' : 'lead_big(>=8)');
const isLate = (qtr: number, hs: number, ot: boolean) => !ot && (qtr === 2 || qtr === 4) && hs <= 300;

const ernieP = new Map<number, Cell>(), ernieG = new Map<number, Cell>();
const inkP = new Map<string, Cell>(), inkG = new Map<string, Cell>();
const ctxP = new Map<string, Cell>(), ctxG = new Map<string, Cell>();
const addCtx = (map: Map<string, Cell>, d: number, ytg: number, ydl: number, qtr: number, hs: number, ot: boolean, sd: number, cls: Cls, pred?: readonly [number, number, number, number]) => {
  const names = ['ALL', `d${d}`, `ytg${ybG(ytg)}`, ydlBinG(ydl), sdBinG(sd), `d${d}|ytg${ybG(ytg)}`];
  if (isLate(qtr, hs, ot)) names.push('late(<=300,q2/q4)'); else if (!ot) names.push('not_late');
  if (ot) names.push('OT');
  for (const n of names) bump(map, n, cls, pred);
};

let totalPassP = 0, totalPassG = 0, holes = 0;
const processGame = (events: readonly any[], mode: 'p' | 'g') => {
  let ptsA = 0, ptsB = 0;
  for (const ev of events) {
    if (ev.kind === 'score' || ev.kind === 'extra_point') { if (ev.payload.team === 'A') ptsA += ev.payload.points; else ptsB += ev.payload.points; }
    else if (ev.kind === 'snap') {
      const p = ev.payload; if (p.call !== CALL_PASS) continue; const cls = clsOf(p.oc); if (!cls) continue;
      const ot = p.qtr === 5; const sd = p.team === 'A' ? ptsA - ptsB : ptsB - ptsA;
      const qtrF = ot ? 2 : p.qtr, hsF = ot ? 600 : p.hs, sdF = ot ? 0 : sd;
      const pred = mode === 'g' ? (passClassProbs(M, passFeatures(p.down, p.ytg, p.ydl, sdF, qtrF, hsF)) as unknown as readonly [number, number, number, number]) : undefined;
      if (mode === 'p') totalPassP++; else totalPassG++;
      bump(mode === 'p' ? ernieP : ernieG, keyErnie(p.down, p.ytg, p.ydl, sd), cls, pred);
      bump(mode === 'p' ? inkP : inkG, keyInk(p.down, p.ytg), cls, pred);
      addCtx(mode === 'p' ? ctxP : ctxG, p.down, p.ytg, p.ydl, ot ? 5 : p.qtr, p.hs, ot, sd, cls, pred);
    }
  }
};

for (let g = 0; g < N; g++) {
  const key = gameKeyOf('glm-bar:' + g);
  const gp = runGame(P, key);
  const gg = runGame(P, key, { passClass: M });
  holes += gg.holes[4] ?? 0;
  processGame(gp.events, 'p');
  processGame(gg.events, 'g');
}

const ko = <K>(mp: Map<K, Cell>, mg: Map<K, Cell>, totalP: number, totalG: number) => {
  const keys = [...new Set([...mp.keys(), ...mg.keys()])];
  let rateEff = 0, mixEff = 0, sp = 0, sg = 0;
  for (const k of keys) {
    const a = mp.get(k) || mk(), b = mg.get(k) || mk();
    sp += a.sack; sg += b.sack;
    const rp = a.n ? a.sack / a.n : 0, rg = b.n ? b.sack / b.n : 0;
    const wp = a.n / totalP, wg = b.n / totalG;
    rateEff += ((wp + wg) / 2) * (rg - rp); mixEff += ((rp + rg) / 2) * (wg - wp);
  }
  return { rateEff, mixEff, diff: sg / totalG - sp / totalP, sp, sg, totalP, totalG };
};

const fmtPct = (x: number) => (x * 100).toFixed(4) + '%';
const fmtPp = (x: number) => (x * 100).toFixed(4) + 'pp';
console.log(`pools ${poolsName} + passclass ${pcName}: ${N} paired games, class-pool holes ${holes}`);
console.log(`pass plays pools ${totalPassP} glm ${totalPassG} (diff ${totalPassG - totalPassP})`);
const e = ko(ernieP, ernieG, totalPassP, totalPassG);
console.log('\nKitagawa-Oaxaca, Ernie cells (down x ytg-bin{0-3,4-6,7-10,11+} x field-side{own/opp} x score-bin{<=-7,-6..-1,0,1..7,>=8}):');
console.log(`  sack rate pools ${fmtPct(e.sp / e.totalP)}  glm ${fmtPct(e.sg / e.totalG)}  diff ${fmtPp(e.diff)}`);
console.log(`  rate effect ${fmtPp(e.rateEff)}  mix effect ${fmtPp(e.mixEff)}  sum ${fmtPp(e.rateEff + e.mixEff)}  (rate share ${e.diff ? ((e.rateEff / e.diff) * 100).toFixed(1) : 'n/a'}%)`);
{ const keys = [...new Set([...ernieP.keys(), ...ernieG.keys()])]; let cf = 0; for (const k of keys) { const a = ernieP.get(k) || mk(), b = ernieG.get(k) || mk(); cf += b.n * (a.n ? a.sack / a.n : 0); }
  const cfRate = cf / totalPassG; console.log(`  counterfactual (GLM mix * pool per-cell sack rates): ${fmtPct(cfRate)}  => rate ${fmtPp(e.sg / e.totalG - cfRate)}  mix ${fmtPp(cfRate - e.sp / e.totalP)}`); }
{ const rows = [...new Set([...ernieP.keys(), ...ernieG.keys()])].map((k) => { const a = ernieP.get(k) || mk(), b = ernieG.get(k) || mk(); return { k, np: a.n, ng: b.n, rp: a.n ? a.sack / a.n : 0, rg: b.n ? b.sack / b.n : 0 }; })
    .filter((r) => r.np > 500 && r.ng > 500).map((r) => ({ ...r, d: (r.rg - r.rp) * 100 })).sort((a, b) => Math.abs(b.d) - Math.abs(a.d)).slice(0, 10);
  console.log('  largest per-cell sack-rate gaps (key np ng pool% glm% diff_pp), n>500 both:'); for (const r of rows) console.log(`    ${r.k} ${r.np} ${r.ng} ${(r.rp * 100).toFixed(3)} ${(r.rg * 100).toFixed(3)} ${r.d.toFixed(3)}`); }
const ci = ko(inkP, inkG, totalPassP, totalPassG);
console.log('\nCoarse K-O (down x ytg-bin{0-3,4-7,8-12,13+}, 16 cells):'); console.log(`  rate effect ${fmtPp(ci.rateEff)}  mix effect ${fmtPp(ci.mixEff)}  sum ${fmtPp(ci.rateEff + ci.mixEff)}`);
console.log('\nDown x ytg-bin per-pass rates (calibration on GLM-visited states):');
console.log('bucket                 nP      nG   sackP%  sackG%  predG%  diff_pp  compP% compG% predC%');
for (const k of [...new Set([...inkP.keys(), ...inkG.keys()])].sort()) { const a = inkP.get(k) || mk(), b = inkG.get(k) || mk(); console.log(`${k.padEnd(20)} ${String(a.n).padStart(7)} ${String(b.n).padStart(7)} ${f(a.sack, a.n)} ${f(b.sack, b.n)} ${f(b.predSack, b.n)} ${(pct(b.sack, b.n) - pct(a.sack, a.n)).toFixed(2).padStart(8)} ${f(a.comp, a.n)} ${f(b.comp, b.n)} ${f(b.predComp, b.n)}`); }
const wanted = ['ALL', 'not_late', 'late(<=300,q2/q4)', 'trail_big(<=-8)', 'trail(-7..-1)', 'tied(0)', 'lead(1..7)', 'lead_big(>=8)', 'd1', 'd2', 'd3', 'd4', 'ytg7-10', 'mid(21-80)', 'd1|ytg7-10', 'd2|ytg7-10', 'd3|ytg7-10', 'd3|ytg4-6', 'OT'];
console.log('\nContext buckets (redistribution + calibration):');
console.log('bucket                    nP      nG   compP% compG% predC%  incP%  incG% predI%  sackP% sackG% predS%  intP%  intG% predN%');
for (const name of wanted) { const a = ctxP.get(name), b = ctxG.get(name); if (!a || !b) { console.log(name.padEnd(24) + ' MISSING'); continue; } console.log(`${name.padEnd(24)} ${String(a.n).padStart(7)} ${String(b.n).padStart(7)} ${f(a.comp, a.n)} ${f(b.comp, b.n)} ${f(b.predComp, b.n)} ${f(a.inc, a.n)} ${f(b.inc, b.n)} ${f(b.predInc, b.n)} ${f(a.sack, a.n)} ${f(b.sack, b.n)} ${f(b.predSack, b.n)} ${f(a.int, a.n)} ${f(b.int, b.n)} ${f(b.predInt, b.n)}`); }
const allP = ctxP.get('ALL')!, allG = ctxG.get('ALL')!; const fmt = (x: number, n: number) => (pct(x, n)).toFixed(3) + '%';
console.log('\nOverall class rates (pass plays):');
console.log(`  pools actual comp/inc/sack/int ${fmt(allP.comp, allP.n)} ${fmt(allP.inc, allP.n)} ${fmt(allP.sack, allP.n)} ${fmt(allP.int, allP.n)}`);
console.log(`  glm   actual comp/inc/sack/int ${fmt(allG.comp, allG.n)} ${fmt(allG.inc, allG.n)} ${fmt(allG.sack, allG.n)} ${fmt(allG.int, allG.n)}`);
console.log(`  glm   pred   comp/inc/sack/int ${fmt(allG.predComp, allG.n)} ${fmt(allG.predInc, allG.n)} ${fmt(allG.predSack, allG.n)} ${fmt(allG.predInt, allG.n)}`);
```

**WHY:** Version the mechanism adjudication (rate vs mix vs feedback redistribution + calibration) so the sacks/drives-shift explanation and future default/season-aggregate decisions ride on a tracked, reproducible report (same contract as `glm-bar.ts`), not scratch files. Captures both Ernie-cell K-O (rate-dominant for sacks) and context redistribution/calibration (Camp B observations).
**SAFE ALONE?:** Yes — new report tool only, no engine/sim/pack/product changes, no defaults touched.
**HOW TO CHECK:** On `65673a00` (or any tip carrying same packs/sim API), from `colors/`: `node --experimental-strip-types tools/bucket-bar.ts 12000` exits 0 and prints `class-pool holes 0`, Ernie-cell K-O with rate/mix summing to diff (~ -0.0998pp on 2023-25 packs), counterfactual, coarse K-O, down×ytg table, context buckets, and overall rates. Cross-check: `node --experimental-strip-types tools/glm-bar.ts 12000` still reproduces the paired game-level shifts. (Architect lands; I did not modify engine.)

## 7) Claim ledger
- VERIFIED (I ran; command+output above): glm-bar 12k reproduction; bucket-bar/mech-adj 12k on `65673a00` (pass plays, sacks, class rates, Ernie-cell K-O rate -0.0965pp/mix -0.0034pp, counterfactual, coarse K-O, down×ytg and context buckets with pred-vs-actual, holes 0); GLM pred ≈ GLM actual in visited states; visit redistributions in context buckets; Ernie’s decomp formula/bucketing read and independently reimplemented.
- REPORTED (named): Ernie’s shipped decomp numbers/README/drive schema (not runnable as-is here); VL/Beam/Inkling/Glyph/MUSE prior filings and numbers/method descriptions; held-out log-loss/drift-from-training-era figures; GLM node “verified as built” consensus.
- INFERRED: adjudication (rate-dominant sack mechanism at Ernie/coarse cells; feedback redistribution real but not the aggregate sack-rate driver; both camps partly right), residual-need judgement for long-run stats, relevance to drives/flow.
- UNKNOWN: exact per-season real-world sack baselines for season-aggregate tolerance; behavior on other pack eras/windows beyond this 2023-25 paired run; Ernie’s script output if run in his original `/tmp/glmrec`+logs environment.

## BLOCKED / OPEN / NEXT
- **BLOCKED:** none for this filing. Architect to land `tools/bucket-bar.ts` if accepted (proposal only). I cannot run Ernie’s original `decomp.mjs` end-to-end without his `/tmp` pass logs/PASSLOG plumbing (script read; logic reproduced independently) — if his environment is needed for byte-exact script re-run, that’s on Ernie/Architect setup.
- **OPEN (Owner decision):** whether GLM becomes default for product/sim; whether 1.4% relative sack-rate residual warrants a sack-class pass before using GLM for season sack totals/pressure metrics as tracked targets.
- **NEXT:** (1) Architect lands versioned `bucket-bar.ts` (or variant) so mechanism is tracked. (2) If season sack aggregates are decision-critical, run season-scale comparison (GLM vs pools vs target baseline) using `glm-bar`/`bucket-bar` outputs as evidence. (3) Use bucket-bar on future node changes (e.g. yards-given-class) to check for compounded per-state bias/redistribution.
