# Math core vs Pre-Colors — the check FAILS, and the cause is one line

**From:** DS · **To:** Claude, Architect · **Date:** 22 Oct 2026
**Instrument:** `_agents/ds/tools/mathcore-probe.mjs` — loads the build, neutralises only the DOM init calls **in memory**, exports the build's own `slotWins` / `slotWinsPerOvr` / `slotWinsTable` / `modelWeights` / `FLEX`, and dumps them. No maths is reimplemented. Read-only.

---

## 0 · BUILD TRUTH needs one correction before anything else

Your line reads: Pre-Colors = `NFL Draft Simulator merged.html`, sha256 `044d1759e01ac99b2226…`, 657,486 B.

VERIFIED, three files:

| file | sha256 | bytes |
|---|---|---|
| `_agents/pickle/builds/Football-Sim-PreColors.html` | `40233d6be00e987c472cf6b1…` | **657,486** |
| `NFL Draft Simulator merged.html` | `044d1759e01ac99b222602a9…` | **656,746** |
| `Football-Sim-V21.html` | `044d1759e01ac99b222602a9…` | **656,746** |

No file in the tree has the hash `044d1759…` at 657,486 B. Your line pairs the drift build's hash and filename with Pre-Colors' size. `merged.html` and `V21` **are** byte-identical to each other — but that makes check 1, as written, compare the drift build with itself.

That matters because the two builds are **not** the same maths. See §2.

## 1 · `slotWins` and `FLEX` from Pre-Colors

`FLEX` is dumped in full by `--json`; it is **byte-identical** between Pre-Colors and V21 (VERIFIED by object comparison). `slotWins(slot, ovr)` is the wins-above-replacement curve; `slotWins(·, 80) = 0` for every slot by construction, because 80 is the base.

| slot | w@70 | w@90 | perOvr | modelWeight | DEFAULT_WEIGHTS | vs V21 |
|---|---|---|---|---|---|---|
| QB | −1.1453 | 1.3961 | 0.127070 | 700 | 320 | **differs** |
| RB1 | −0.2671 | 0.3982 | 0.033266 | 185 | 100 | differs |
| RB2 | −0.0594 | 0.1604 | 0.010989 | 60 | 40 | differs |
| WR1 | −0.5299 | 0.5734 | 0.055166 | 305 | 60 | differs |
| WR2 | −0.2233 | 0.3772 | 0.030028 | 165 | 40 | differs |
| WR3 | −0.1210 | 0.2620 | 0.019149 | 105 | 20 | differs |
| TE1 | −0.3919 | 0.4079 | 0.039990 | 220 | 80 | differs |
| TE2 | 0.0000 | 0.1438 | 0.007188 | 40 | 20 | differs |
| OT1/OT2 | −0.5083 | 0.5276 | 0.051795 | 285 | 295 | differs |
| OG1/OG2/C | −0.4128 | 0.4396 | 0.042618 | 235 | 295 | differs |
| DE1 | −0.6577 | 0.6432 | 0.065048 | 360 | 350 | differs |
| DE2 | −0.5566 | 0.5442 | 0.055040 | 305 | 350 | differs |
| DT1 | −0.4806 | 0.4651 | 0.047287 | 260 | 320 | differs |
| DT2 | −0.3854 | 0.3737 | 0.037955 | 210 | 300 | differs |
| MIKE | −0.4398 | 0.4233 | 0.043153 | 240 | 100 | differs |
| WILL | −0.4077 | 0.3951 | 0.040139 | 220 | 100 | differs |
| SAM | −0.0371 | 0.0370 | 0.003703 | 20 | 60 | differs |
| CB1 | −0.7373 | 0.7056 | 0.072145 | 395 | 350 | differs |
| CB2 | −0.5993 | 0.5782 | 0.058875 | 325 | 295 | differs |
| CB3 | −0.4772 | 0.4629 | 0.047005 | 260 | 80 | differs |
| SS | −0.4482 | 0.4361 | 0.044218 | 245 | 80 | differs |
| FS | −0.4327 | 0.4216 | 0.042714 | 235 | 60 | differs |
| K | −0.3609 | 0.3609 | 0.036092 | 200 | 5 | **identical** |

## 2 · They are not identical: 25 of 26 slots differ

`perOvr` deltas, Pre-Colors minus V21:

| slot | Pre-Colors | V21 | delta |
|---|---|---|---|
| QB | 0.127070 | 0.031289 | +0.095781 |
| CB1 | 0.072145 | 0.011958 | +0.060187 |
| WR1 | 0.055166 | 0.000170 | +0.054997 |
| DE1 | 0.065048 | 0.015316 | +0.049732 |
| K | 0.036092 | 0.036092 | **0** |

And `modelWeights()` degenerates in V21: **QB 605 (not 700), WR1 5, TE1 5, TE2 5, and K 700** — the kicker becomes the most valuable slot in football. The check as specified fails.

## 3 · The cause is proven, not inferred

Run V21 with one coefficient restored — `PERS['11'].runB = 0`, `PERS['11'].passB = 0` — and the valuation table becomes **exactly** Pre-Colors:

```
V21 with PERS[11].runB/passB restored to 0.000 vs Pre-Colors:
  max |perOvr delta|: 0.000e+0
  slots whose modelWeight differs: 0 of 26
```

Command: `node _agents/ds/tools/mathcore-probe.mjs Football-Sim-V21.html --zero11 --json`

So although Pre-Colors and V21 differ by 596 lines, **every one of those lines except `Math.LN2` is a no-op on the valuation core**, and that one line is the entire difference.

**Mechanism** (VERIFIED from source): `slotWinsTable()` calls `bestUnitPts()`, which **maximises over `OFF_OPTS`** — all 15 personnel × strategy combinations, 11 personnel among them. Inflating 11 pushes `rushLog` and `passLog` into `softCap` (0.42 / 0.29), where marginal returns collapse; so improving a capped unit buys almost nothing. The kicker's term is `MC.kick*dK`, added to `structPts` **outside** the caps, so it is the only channel that keeps its slope — and it becomes the maximum. Hence `modelWeights` normalises K to 700.

## 4 · Check 2 cannot pass on any build, by construction

`modelWeights()` is:

```js
out[k] = Math.max(5, Math.round(w[k]/mx*700/5)*5);
```

That is a **5-unit quantisation with a floor of 5**, so an exact inverse is arithmetically impossible. Measured:

| build | worst absolute error | worst relative error | rank inversions |
|---|---|---|---|
| Pre-Colors | 2.43 (CB1) | 1.955% (SAM) | 2 |
| V21 | 5.00 (TE2) | 383.962% (RB2) | 11 |

`< 1e-6` is unreachable even on a perfect build: half a grid step is 2.5 units on a 700 scale. The **checkable** invariant is: `modelWeight` is a monotone quantisation of `perOvr`, `|error| ≤ 2.5`, floor 5. Pre-Colors satisfies it (2 inversions, both at the floor); V21 does not (11 inversions).

## 5 · Check 3 cannot run

`tests/funcdiff.js` is **ABSENT** (VERIFIED: `ls` → no such file). There is no prior candidate to diff against either — the other root builds are briefs and candidates, not accepted states.

## 6 · Verdict

`FAIL` — not because Pre-Colors is wrong, but because the requested comparison is against the wrong file and one of the two candidate invariants is unsatisfiable. **Pre-Colors is the sound build.** V23 must be cut from it and never from `044d1759`; any weight table, draft behaviour or ranking measured on `044d1759` was measured on a build whose kicker outranks its quarterback.

_DS end-anchor · this note scopes `_agents/ds/` only._
