SPEAKER: glyph | ROLE: council seat (analyst) | TASK: C27 — item-6 vs passGap consistency note | DATE: 2026-11-20T03:49:41Z

VERDICT: ok (one-page consistency note; no code/engine/pin edits)

## WHAT I RAN

```bash
date -u "+%Y%m%d-%H%M"         # 20261120-0349
date -u "+%Y-%m-%dT%H:%M:%SZ"  # 2026-11-20T03:49:41Z
git rev-parse --short HEAD     # d6f2d769b (before this item)
git fetch -q origin

# receipts (Architect branch @ 408410477)
git show origin/architect/engine-and-seats:claude/NOW.md | sed -n '1,20p'
git show origin/architect/engine-and-seats:tools/mathlab/results/passgap-2026-11-20.md | sed -n '1,40p'
git show origin/architect/engine-and-seats:colors/src/sports/nfl/sim/drive.ts | sed -n '40,110p'
git show origin/architect/engine-and-seats:tools/mathlab/results/passgap-2026-11-20.md | grep -n "lambda\|sd 0.02\|typical s\|0.16\|0.15"
```

## WHAT I FOUND

### 1) Item-6 scale (VERIFIED, Architect NOW.md)
Source: `origin/architect/engine-and-seats:claude/NOW.md` @ `408410477`, lines 3-4:
```
- ITEM 6 DECISION: tilt scale is pack-independent (2016-22 vs 2023-25 within ~1 pt): s=+-0.25 moves points ~+-4%, sacks ~-25%/+30%, giveaways ~-13%/+14%; s=1 points +15%, sacks -69%. It sizes TILTS (form, focus) and does NOT identify lambda; lambda stays 0, GLM stays OFF, no pack or default changes. Closed; do not reopen without a per-offense passGap.
...
- DONE 20 Nov: passGap ... repeatable per-offense (split-half 0.54) and per-defense (0.36) tilt, both above null in both eras; combined slope ~0.94 (24-28 SE); implied lambda ~6.9 = unit conversion 1/Var(theta), NOT a free dial. DECISION: lambda 0 + GLM off stays in the product; the open item is the ratings-to-gap mapping (post-cutover tuning, fit against these team-season scores). Not shipped, nothing in src changed.
```

### 2) passGap measured distribution (VERIFIED, passgap report)
Source: `origin/architect/engine-and-seats:tools/mathlab/results/passgap-2026-11-20.md` (report-only; deterministic seed 20261120 per header):
```
| 2016-2025 | 320 | 0.539 (0.134) | 0.364 (0.146) | 0.965 +- 0.035 | 0.869 +- 0.075 | 0.939 +- 0.033 | 6.89 +- 0.24 |
| 2016-2022 | 224 | 0.551 (0.166) | 0.392 (0.168) | 0.959 +- 0.040 | 0.811 +- 0.085 | 0.919 +- 0.038 | 6.83 +- 0.28 |
| 2023-2025 |  96 | 0.502 (0.177) | 0.300 (0.168) | 0.988 +- 0.071 | 1.034 +- 0.153 | 1.002 +- 0.066 | 7.13 +- 0.47 |
Year-to-year r: offense about 0.45, defense about 0.2. True team-season spread of mean tilt score: offense 0.029, defense 0.024. Typical combined gap sd 0.02-0.025, i.e. typical s about 0.15-0.17 (inside the item-6 scale: |s| 0.25 is points about +-4%).
...
lambda = 6.9" is the unit conversion `1 / Var_state(theta)` for a gap expressed as a mean tilt-score residual. It is NOT a free dial...
Target for the post-cutover ratings-to-gap fit: match the measured distribution (mean 0, sd about 0.024 for the combined gap) and the 0.45 / 0.2 persistence...
```
Caveat noted in report (REPORTED in-file): third-decimal drifts across library versions and lambda depends on chosen theta (THETA 0.3,-0.2,-1.0,-0.6).

### 3) How `s` enters the engine (VERIFIED, code)
Source: `origin/architect/engine-and-seats:colors/src/sports/nfl/sim/drive.ts`:
```ts
export function tilt(p: readonly number[], theta: readonly number[], lambda: number, gap: number): number[] {
  const s = lambda * gap;
  if (s === 0) return [...p];
  const w = p.map((x, k) => x * at(theta, k) * Math.exp(s)); // (actual form: x * pexp(s * at(theta, k)))
  ...
}
// in runDrive:
const par = readParams(ctx.pack), rules = readRules(ctx.pack), gap = ctx.matchup?.passGap ?? 0;
...
const k = pickIndex(tilt(p, th, par.lambda, gap), draw(key, i, 'passResult'));
```
Exact line form (VERIFIED): `const s = lambda * gap; if (s === 0) return [...p]; ... w = p.map((x, k) => x * pexp(s * at(theta, k)));` and `gap = ctx.matchup?.passGap ?? 0`. With `lambda = 0` (product pack, NOW decision) this returns baseline untouched.

## Translation (numbers + product meaning)

| Quantity | Value | Basis |
|---|---|---|
| Item-6 reference | `|s| = 0.25` → points ~±4% (also sacks ~-25%/+30%, giveaways ~-13%/+14%; `s=1` → points +15%, sacks -69%) | VERIFIED, NOW.md item-6 decision |
| Typical measured `|s|` (team-season, combined gap) | ~`0.15–0.17` (gap sd ~0.02–0.025 × implied lambda ~6.9 for this theta) | VERIFIED, passgap report; lambda is unit conversion `1/Var_state(theta)` for chosen theta, not a free dial |
| Linear interpolation to points (illustrative) | `s ≈ 0.16` is ~64% of 0.25 → ~**2.5%** of points (vs 4% at 0.25); `s ≈ 0.15` → ~2.4%, `s ≈ 0.17` → ~2.7% | INFERRED — linear interpolation from item-6 anchor; item-6 states measured endpoints (`s=0.25`, `s=1`) but not that response is strictly linear across all `s`; use as order-of-magnitude translation, not a gate |
| Measured team-season spread (preseason-transferable ceiling context) | mean gap 0 (by construction target for fit), combined-gap sd ~0.024; year-to-year persistence ~0.45 offense / ~0.2 defense (lower than in-season split-half) | VERIFIED, passgap report; implies typical season-to-season/ex-ante realized tilt spread is smaller than in-season stability (INFERRED framing) |
| Product state today | `lambda 0`, GLM off, no ratings-to-gap mapping shipped → effective `s=0` in product | VERIFIED, NOW.md + drive.ts (`tilt` neutral when `s===0`; `gap` defaults 0) |

**One-sentence product meaning (INFERRED from VERIFIED numbers above):** The passGap tilt is real but small in the measured team-season distribution (typical `|s|` ~0.15–0.17, roughly ~2–3% points by linear interpolation from the item-6 anchor, not a touchdown swing), and because the product currently ships with `lambda 0`/no mapping the tilt contributes nothing today; turning it on later without a calibrated ratings-to-gap mapping would move points on the order of ~1–2% per typical team-season difference rather than producing large, obvious swings, and must be fit/reported post-cutover against the measured distribution (mean 0, sd ~0.024, persistence 0.45/0.2).

## WHAT I WOULD CHANGE

- None. This is a consistency note for the record (C27). If/when the ratings→gap mapping is built, cite this translation alongside item-6 and the passgap report caveats (theta-dependence, schedule-fixed split-half vs year-to-year persistence). (INFERRED usefulness)

## WHAT I DID NOT CHECK

- I did not re-run `tools/mathlab/phase1/passgap.py` or recompute slopes/lambdas (used VERIFIED report/NOW.md values; report notes library-version third-decimal drift).
- I did not empirically verify linearity of points response between `s=0`, `0.16`, `0.25`, `1` in the current pack (item-6 gives anchors; interpolation is INFERRED).
- I did not audit all theta/pack values used for item-6 beyond report's stated THETA caveat (lambda/theta-dependence remains as reported).
- I did not check whether any UI/sim path currently supplies non-zero `matchup.passGap` with non-zero lambda in shipped builds (code path and NOW decision indicate neutral in product; full runtime inventory UNKNOWN).
