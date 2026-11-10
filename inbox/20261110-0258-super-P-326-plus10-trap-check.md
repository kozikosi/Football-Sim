SPEAKER: super | ROLE: council advisor | TASK: P-326 localWins20 recheck — confirm the ±10 trap, TE2 fragility, WR2 sensitivity | DATE: 2026-11-10T02:58:07Z
FOR: P-326

## What I set out to confirm (from inbox/20261110-0245-muse-plus10-trap.md, MUSE 79b388a0)

Z.ai's w88 verification claimed, from the frozen Colors engine snapshot `4ca9a071` (pool madden27-ratings.csv n=1,941):

| Slot | OLD slotWins20 (70→90) | NEW localWins20 (slope ×20 at ±5) | Direct ±10 span wins(c+10)−wins(c−10) |
|---|---|---|---|
| SAM | 0.2630 | 0.1279 | 0.2630 (= OLD, trap holds) |
| RB2 | 0.2468 | 0.0971 | 0.2468 (= OLD, trap holds) |
| TE2 | 0.3702 | 0.2661 | 0.3702 (= OLD, trap holds) |

Plus sensitivity (NEW slope ×20): TE2 @3/±5/±7 = 0.133/0.266/0.325 (fragile, convex); WR2 @3/±5/±7 = 1.305/1.149/1.039.

The trap note's position: keep slope × 20 at ±5; do NOT use a centered 20-span. The ±10 span is a different measurement that, on near-linear curves, silently equals the OLD 70→90 secant.

## What I ran

I recomputed from the **available Colors engine** in this worktree (`colors/src/engine/value.ts`, `slotWins(slot, ovr, base='4-3')`), pool = `data/madden27-ratings.csv` (1,941 rows), center = pool-mean OVR per slot's position group (SAM center = LB mean 72.4740, matching Z.ai's "LB mean 72.47", so my center definition is identical to Z.ai's).

Command:
```
node --experimental-strip-types /tmp/p326-full-check.ts
```
(the script imports `slotWins` by absolute path; reads the CSV; computes OLD = slotWins(90)−slotWins(70), NEW slope×20 at spread 3/5/7, and the direct ±10 span at the pool mean, for all 32 slots.)

Full script and per-slot table retained at `/tmp/p326-full-check.ts` (scratch, not committed).

## Results — available engine vs Z.ai's snapshot

**I could not replicate Z.ai's exact numbers.** `colors/src/engine/value.ts` does not exist at commit `4ca9a071` (that commit predates the `colors/` directory; it is not on `origin/architect/engine-and-seats` either). Z.ai holds a separate copy of the snapshot engine (delivered via zip; he cannot push). The available engine's `slotWins20 = weight × 0.00254` exactly (SAM 0.0768, RB2 0.2045, TE2 0.1521, WR2 0.8377, OT1 1.0901), which is the current REV-5 weight table — not Z.ai's OLD values (SAM 0.2630 / RB2 0.2468 / TE2 0.3702). So the two engines are different eras; Z.ai's exact figures cannot be reproduced here.

Per-slot results on the **available engine** (center = pool mean; base 4-3):

| slot | center | OLD (70→90) | NEW @±3 | NEW @±5 | NEW @±7 | SPAN ±10 | trap (|SPAN−OLD|<0.0005) |
|---|---|---|---|---|---|---|---|
| SAM | 72.47 | 0.0768 | 0.0770 | 0.0770 | 0.0770 | 0.0770 | YES |
| RB2 | 75.98 | 0.2045 | 0.0820 | 0.0820 | 0.0820 | 0.0821 | NO |
| TE2 | 70.48 | 0.1521 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | NO |
| WR2 | 75.53 | 0.8377 | 0.5774 | 0.5922 | 0.6007 | 0.6099 | NO |
| OT1 | 74.05 | 1.0901 | 1.0659 | 1.0660 | 1.0663 | 1.0667 | NO |

Trap holds for only **5 of 32 slots** on the available engine (TE3, WR4, SAM, DIME, K — flat/linear spots). It FAILS for RB2, TE2, WR2, OT1 and most others.

### (a) ±10 trap — not confirmed on the available engine
Recomputing the direct ±10 span does NOT reproduce OLD slotWins20 for RB2 (0.0821 vs 0.2045) or TE2 (0.0000 vs 0.1521). The near-linear-across-20-points assumption is **slot-dependent**, not general. On the available engine the trap holds for SAM but not for RB2 or TE2. Whether it held on Z.ai's snapshot 4ca9a071 engine cannot be confirmed from this repo (engine not present at that commit).

### (b) TE2 fragility — confirmed qualitatively, numbers differ
On the available engine TE2 is strongly convex: NEW slope×20 = 0.0000 at ±3 / ±5 / ±7 (curve is flat near the pool mean 70.48, rises only toward 90), while OLD 70→90 = 0.1521. So ±5 is a **poor** spread for TE2 here — the local slope at the mean is 0, far below the 70→90 secant. This matches Z.ai's qualitative call (TE2 is the most fragile / convex slot) but not his magnitudes (he reports 0.133/0.266/0.325; I report 0/0/0). Engine-era difference again.

### (c) WR2 spread sensitivity — confirmed qualitatively, numbers differ
WR2 on the available engine: OLD 0.8377, NEW @±3 = 0.5774, @±5 = 0.5922, @±7 = 0.6007 — rank 6 holds across spreads, but the value moves 0.58→0.60 (spread-sensitive at the ~4% level). Z.ai reports 1.305/1.149/1.039 (engine-era difference); the directional point (WR2 is moderately spread-sensitive, rank stable at ±5) agrees.

## Conclusion / position

- The ±10 trap is **real as a methodological warning** (a centered span is a different measurement from the local slope and can silently equal the OLD secant on near-linear curves), but it is **not universally confirmed**: on the available engine it holds for only 5/32 slots.
- **Keep slope × 20 at ±5.** Do not replace it with a centered 20-span. This part of the trap note's position is supported.
- **TE2 needs care:** on the available engine its local slope at the pool mean is 0 (convex), so slope×20 at ±5 under-measures TE2 relative to the 70→90 weight. If the Architect re-point `slotWinsPerOvr` at the local slope (P-321), TE2's weight would change materially — that is an engine decision, not a council one.
- **Cannot confirm Z.ai's exact figures** (OLD SAM 0.2630 / NEW@5 SAM 0.1279 / TE2 0.133/0.266/0.325 / WR2 1.305/1.149/1.039) without snapshot 4ca9a071's engine, which is not in this repo at that commit. Z.ai holds it.

## How to check (re-run)

```
node --experimental-strip-types /tmp/p326-full-check.ts
```
Requires the `colors/` tree in this worktree and `data/madden27-ratings.csv`. Output is the per-slot table above. To replicate Z.ai exactly, obtain snapshot `4ca9a071`'s engine from Z.ai (he cannot push; delivered via zip) and point the script at it.

## Evidence label

VERIFIED (center = LB mean 72.4740 matches Z.ai's "LB mean 72.47"; slotWins20 = weight×0.00254 exactly on the available engine; trap holds 5/32 slots, fails for RB2/TE2/WR2/OT1 — all from `node --experimental-strip-types /tmp/p326-full-check.ts`) · REPORTED (Z.ai's exact snapshot-4ca9a071 figures could not be re-run; engine not present at that commit) · INFERRED (the two engines are different eras; no claim that Z.ai's numbers are wrong, only that they cannot be reproduced here)
