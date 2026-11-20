SPEAKER: glyph | ROLE: council seat (verifier/analyst) | TASK: C27 follow-up — review other seats' C27 work and complete "not done" receipts (passgap rerun, linearity probe, theta/pack audit, runtime inventory) | DATE: 2026-11-20T04:10Z

VERDICT: improved (follow-up to glyph C27 `inbox/20261120-0349-glyph-C27-item6-passgap-note.md`; corrects one unsupported clause in that note with evidence; adds receipts for previously-unchecked items)

## 0) Review of other seats' C27 work (read, not re-authored)

Sources read (VERIFIED `git show`):
- `origin/council/beam:inbox/20261120-beam-C27-item6-passgap-consistency.md` — verdict improved; consistent (typical s ~0.15–0.17 inside item-6 scale), year-to-year persistence 0.45/0.2 as preseason ceiling; did not re-run either study.
- `origin/council/ernie:inbox/20261120-0400-ernie-C23-C24-C27-C31.md` (C27 section) — verdict consistent; computes typical `s = 6.89 * 0.0236 = 0.163`, points at `s=0.25` ±4% => typical ~±2.6% (`4% * 0.163/0.25`), 95th-percentile gap (2.486σ) => `s~0.40` => ~±6.5%; ~1.3 pts typical of ~48-pt game, ~3 pts top-decile.
- `origin/council/orcaman:inbox/20261120-0358-orcaman-C27-review.md` (review of glyph C27) — verdict ok; verified NOW/passgap report/`drive.ts` citations and `s=0` neutrality; interpolation labeled illustrative, caveats preserved.
- `origin/council/hy4orca:inbox/20261120-0354-hy4orca-C27-review.md` (review of glyph C27) — verdict improved; reproduced source numbers/arithmetic but flagged contradiction in glyph 0349: table/interpolation implies ~2.5% at typical `s~0.16` while the same sentence also stated “~1–2% per typical team-season difference” without derivation (and “±1.5% around the mean” not present). Suggested deriving any halving explicitly from 0.45/0.2 persistence as an extra assumption.

**Assessment (glyph):** hy4orca’s correction is valid. My prior note’s “~1–2%” clause was unsupported/contradictory; the correct interpolation from the item-6 anchor and typical `s~0.16` is ~2.5% (≈2.4–2.7%), consistent with Ernie’s ~2.6% and with empirical probes below. Ex-ante transfer/persistence discount is a separate assumption (not measured as a direct points factor in item-6/passgap reports) and must not be stated as the same quantity. Correction proposed in §6.

## 1) Passgap re-run (previously "not done") — VERIFIED (scratch)

**WHAT I RAN (raw):**
```bash
# 2026-11-20T03:58Z+, /Users/kosi/Desktop/wt/glyph (council/glyph@91399cc98), scratch /tmp/glyph-c27-FWZp4A
SCRATCH=/tmp/glyph-c27-FWZp4A
# extracted from origin/architect/engine-and-seats@408410477:
#   tools/mathlab/phase1/*, tools/mathlab/pmath.py
#   colors/src/core/*, colors/src/sports/nfl/sim/*, colors/tools/lambda-axis.ts, data/packs/nfl-{pools,passclass}-fit{2016-2022,2023-2025}.json
node --version        # v26.13.0
python3 --version     # Python 3.15.1
python3 -c "import sklearn,numpy,pandas,sys; print(sklearn.__version__,numpy.__version__,pandas.__version__,sys.version.split()[0])"
# -> 1.9.1 2.5.4 3.1.0 3.15.1

# data: /Users/kosi/Desktop/wt/beam/_agents/data/nflverse-2016-2025 (10 play_by_play_2016..2025.parquet present; not re-fetched, not hash-audited here)
cd "$SCRATCH/tools/mathlab/phase1"
NFLVERSE_DIR=/Users/kosi/Desktop/wt/beam/_agents/data/nflverse-2016-2025 /usr/bin/time -p python3 -I passgap.py --years 2016-2025 2>&1 | tee "$SCRATCH/results/passgap-2016-2025.out"; echo PY_EXIT=$?
NFLVERSE_DIR=/Users/kosi/Desktop/wt/beam/_agents/data/nflverse-2016-2025 python3 -I passgap.py --years 2016-2022 2>&1 | tee "$SCRATCH/results/passgap-2016-2022.out"
NFLVERSE_DIR=/Users/kosi/Desktop/wt/beam/_agents/data/nflverse-2016-2025 python3 -I passgap.py --years 2023-2025 2>&1 | tee "$SCRATCH/results/passgap-2023-2025.out"
```

**WHAT I FOUND (raw key outputs):**

`passgap-2016-2025.out` (exit 0, `real 25.06 user 18.21 sys 4.75`):
- `187644 dropback plays, 320 team-seasons`; theta `[0.3,-0.2,-1.0,-0.6]`, mean `Var_state(theta)=0.1364`, per-play sd(r)=0.369
- offense split-half r 0.539 (SB 0.700, null 0.043/0.134, yty 0.448, spread 0.0291); defense 0.364 (0.534, 0.047/0.146, 0.206, 0.0236)
- slopes: offense `0.966±0.035 (z 27.4)`, defense `0.869±0.075 (11.6)`, combined `0.939±0.033 (28.4)`; implied lambda `6.89±0.24`, sd_gap 0.0236, typical s 0.163

`passgap-2016-2022.out`:
- `131322 plays, 224 team-seasons`; mean Var 0.1346
- offense 0.550 (SB 0.710, null 0.064/0.166, yty 0.443, spread 0.0301); defense 0.392 (0.563, 0.069/0.168, 0.210, 0.0237)
- slopes 0.958±0.040, 0.811±0.085, 0.919±0.038; lambda `6.83±0.28`, sd_gap 0.0249, typical s 0.170

`passgap-2023-2025.out`:
- `56322 plays, 96 team-seasons`; mean Var 0.1404
- offense 0.502 (0.668, 0.018/0.177, 0.394, 0.0267); defense 0.300 (0.461, 0.008/0.168, 0.179, 0.0234)
- slopes 0.989±0.071, 1.034±0.153, 1.002±0.066; lambda `7.13±0.47`, sd_gap 0.0204, typical s 0.146

**Comparison vs architect report (`origin/architect/engine-and-seats:tools/mathlab/results/passgap-2026-11-20.md`, VERIFIED read):** architect printed 2016-25 offense split-half 0.539/slopes 0.965,0.869,0.939/lambda 6.89; 2016-22 0.551/0.959,0.811,0.919/6.83; 2023-25 0.502/0.988,1.034,1.002/7.13. My rerun shows third-decimal diffs (2016-22 off split-half 0.550 vs 0.551; off slopes 0.966/0.958/0.989 vs 0.965/0.959/0.988) matching the report’s own caveat pattern (“Architect … 0.551 and slopes 0.965/0.959/0.988… Pickle prints 0.550 and 0.966/0.958/0.989. INFERRED: library-version differences in the GLM fit. No conclusion moves”). Lambdas/reading-rule conclusions unchanged. (VERIFIED numbers from outputs; cause attribution INFERRED consistent with report.)

## 2) Linearity / points-response probe (previously "not done") — VERIFIED empirical probe (small-N, scratch)

**WHAT I RAN:**
```bash
cd "$SCRATCH"  # extracted architect colors/src/core, sports/nfl/sim, tools/lambda-axis.ts, data/packs (see §1)
# deterministic by key prefix 'lambda-axis:<g>' and fixed axis; lambdaOverride 1 off-pack
node --experimental-strip-types colors/tools/lambda-axis.ts 120  nfl-pools-fit2023-2025 nfl-passclass-fit2023-2025 /tmp/glyph-c27-lambda-axis-120-2023-25.json  > /tmp/glyph-c27-lambda-axis-120-2023-25.txt
node --experimental-strip-types colors/tools/lambda-axis.ts 120  nfl-pools-fit2016-2022 nfl-passclass-fit2016-2022 /tmp/glyph-c27-lambda-axis-120-2016-22.json  > /tmp/glyph-c27-lambda-axis-120-2016-22.txt
node --experimental-strip-types colors/tools/lambda-axis.ts 300  nfl-pools-fit2023-2025 nfl-passclass-fit2023-2025 /tmp/glyph-c27-lambda-axis-300-2023-25.json  > /tmp/glyph-c27-lambda-axis-300-2023-25.txt
node --experimental-strip-types colors/tools/lambda-axis.ts 300  nfl-pools-fit2016-2022 nfl-passclass-fit2016-2022 /tmp/glyph-c27-lambda-axis-300-2016-22.json  > /tmp/glyph-c27-lambda-axis-300-2016-22.txt
node --experimental-strip-types colors/tools/lambda-axis.ts 2000 nfl-pools-fit2023-2025 nfl-passclass-fit2023-2025 /tmp/glyph-c27-lambda-axis-2000-2023-25.json > /tmp/glyph-c27-lambda-axis-2000-2023-25.txt
node --experimental-strip-types colors/tools/lambda-axis.ts 2000 nfl-pools-fit2016-2022 nfl-passclass-fit2016-2022 /tmp/glyph-c27-lambda-axis-2000-2016-22.json > /tmp/glyph-c27-lambda-axis-2000-2016-22.txt
# metadata receipts (each JSON): tool colors/tools/lambda-axis.ts, keyPrefix lambda-axis:, axis [-1,-0.5,-0.25,0.25,0.5,1], lambdaOverride 1, theta [0.3,-0.2,-1,-0.6]
```

**WHAT I FOUND (points per-team-game means, diff% vs baseline s=0; VERIFIED from produced JSONs):**

| run | base | s=-1 | s=-0.5 | s=-0.25 | s=0.25 | s=0.5 | s=1 |
|---|---:|---:|---:|---:|---:|---:|---:|
| 2023-25 N=2000 | 23.3905 | -18.211% (se .155, z -27.41) | -8.581% | -4.492% | +4.158% (se .136, z 7.17) | +7.881% | +15.612% (se .159, z 22.95) |
| 2016-22 N=2000 | 23.6095 | -16.789% (se .166, z -23.95) | -9.575% | -5.054% | +4.278% (se .137, z 7.35) | +6.964% | +14.181% (se .158, z 21.16) |
| 2023-25 N=300 | 23.6300 | -18.437% | -7.836% | -3.731% | +2.807% (se .343, z 1.93) | +7.364% | +12.766% |
| 2016-22 N=300 | 23.1117 | -13.803% | -7.197% | -3.296% | +5.098% (se .365, z 3.23) | +8.985% | +15.663% |

Ratios/predictions (N=2000, VERIFIED arithmetic from above): 2023-25 `|0.25|/|0.5|=0.528`, `|0.5|/|1|=0.505`, linear pred for s=0.16 from 0.25 = `4.158*(0.16/0.25)=2.661%`, from 0.5 = `2.522%`. 2016-22 `0.614`, `0.491`, preds `2.738%`, `2.229%`.

**Interpretation (INFERRED from these probes, not an item-6 replacement):** item-6 anchors are `s=±0.25 -> ~±4%` and `s=1 -> +15%`; N=2000 gives ~4.16–4.28% at 0.25 and ~14.18–15.61% at 1 (era/pack variation), close to anchors. Response is not strictly linear across 0.25→1 (magnitude ratios show curvature/saturation behavior), but interpolation from the nearby 0.25 anchor to typical `s~0.16` yields ~2.2–2.7%, supporting **~2.5% (~2–3%)** as the order-of-magnitude typical points effect (consistent with hy4orca/Ernie), not ~1–2%. N is far below item-6’s stated 20k/pack rigor and uses extracted tool state in scratch; treat as directional evidence.

**Identity receipts (VERIFIED):**
- 2023-25 N=2000 JSON sha256 `b25ca341d5482e611e9fc82620d4c631395a64444b16671a24c2b433d18a15ea` (also copied in /private/tmp), pools sha `6374a2d4...`, passclass sha `51a0f5f...`
- 2016-22 N=2000 JSON sha256 `9d8a5a02a318df188bed7e3b6c43a01b7b95aa1692a6d9d5f9ddbe0e0ed4c1c5`, pools sha `1ee3f14...`, passclass sha `bc0aae9...`

## 3) Theta / pack audit (previously "not done") — VERIFIED

Commands/results:
```bash
git show origin/architect/engine-and-seats:data/packs/nfl-passclass-fit2016-2022.json | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['params']['theta'], d['params']['lambda'], d['params']['classes'])"
# [0.3, -0.2, -1.0, -0.6] 0.0 ['comp', 'inc', 'sack', 'int']
git show origin/architect/engine-and-seats:data/packs/nfl-passclass-fit2023-2025.json | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['params']['theta'], d['params']['lambda'], d['params']['classes'])"
# [0.3, -0.2, -1.0, -0.6] 0.0 ['comp', 'inc', 'sack', 'int']
git show origin/architect/engine-and-seats:tools/mathlab/phase1/passclass.py | grep -n "^THETA"
# 19:THETA = [0.3, -0.2, -1.0, -0.6] ... (toy shape, NOT fitted; lambda 0 until Phase 2 L1 estimates it)
git show origin/architect/engine-and-seats:colors/tools/lambda-axis.ts | grep -n "theta\|lambdaOverride\|AXIS"
# uses M0.theta from pack, lambdaOverride 1, AXIS [-1,-0.5,-0.25,0.25,0.5,1]
```
Theta is consistent across both fit packs, passgap tool constant, and lambda-axis (reads pack theta). Lambda depends on theta choice (report caveat) — values audited; no hidden theta divergence found.

## 4) Runtime passGap/matchup inventory (previously "not done") — VERIFIED (searched)

**Architect `origin/architect/engine-and-seats@408410477`:**
```bash
git grep -n "passGap" origin/architect/engine-and-seats -- 'colors/src'
# colors/src/sports/nfl/sim/drive.ts:36 Matchup.passGap?: number
# drive.ts:78 gap = ctx.matchup?.passGap ?? 0
# game.ts:39,43,87 opts.passGap? / tilt(..., opts.passGap ?? 0)
git grep -n "passGap\s*:" origin/architect/engine-and-seats -- 'colors/src'  # (no property assignments found)
git grep -n "matchup\s*:" origin/architect/engine-and-seats -- 'colors/src' # (no matchup constructions found)
git grep -n "runGame" origin/architect/engine-and-seats -- 'colors/src/main.ts' 'colors/src/sports/nfl'
# main.ts:10 import runGame; main.ts:71 runGame(pools, gameKeyOf(seed)) (no opts)
```
Packs/defaults: passclass fit packs `lambda 0.0` (VERIFIED above); toypack default lambda 0, `withLambda` helper exists for tests/tools. In searched architect `colors/src` product/runtime paths, no non-zero `passGap` supplied and no `matchup` carrying it constructed; `main.ts` dev path passes no opts => neutral with lambda 0 packs.

**Local glyph `council/glyph` (`colors/`):** `git grep -n "passGap" -- colors` => none; local engine has different `Matchup` (`colors/src/engine/matchup.ts`) unrelated to sim tilt seam. Local tree does not contain architect’s `colors/src/sports/nfl/sim/{drive,game,passclass}.ts` seam — runtime inventory for that seam is therefore architect-branch-scoped.

## 5) WHAT I WOULD CHANGE (correction to my own prior file)

I propose correcting `inbox/20261120-0349-glyph-C27-item6-passgap-note.md` (glyph-owned) sentence in “One-sentence product meaning…”:
- **Old:** “... roughly ~2–3% points by linear interpolation from the item-6 anchor, not a touchdown swing), and because ... turning it on later without a calibrated ratings-to-gap mapping would move points on the order of ~1–2% per typical team-season difference rather than producing large, obvious swings, ...”
- **New:** “... roughly ~2.5% points (~2.4–2.7% by linear interpolation from the `s=0.25 -> ~4%` anchor for typical `s~0.15–0.17`, INFERRED; N=2000 lambda-axis probes give ~2.2–2.7% from 0.25/0.5 anchors across 2023-25/2016-22 packs, not a full N=20k item-6 rerun), not a touchdown swing), and because ... turning it on later without a calibrated ratings-to-gap mapping would move points on the same ~2–3% typical scale per team-season difference (any smaller ex-ante effect would require an explicit persistence/transfer assumption beyond the item-6/passgap numbers stated here) rather than producing large, obvious swings, ...”

(Not applied to the 0349 file in this commit; stated here as the correction record. I can apply it in a follow-up glyph-owned edit if desired.)

## 6) WHAT I DID NOT CHECK

- Full item-6 rerun at N=20k per pack (lambda-axis) not performed; probes were N=120/300/2000 in scratch (directional).
- Beam nflverse parquet contents not hash-verified against `tools/mathlab/phase1/data-manifest.json` / `datacheck.py`; rerun determinism and value-pattern consistency used as receipts.
- No executed “shipped binary/browser” runtime trace; inventory is static source search on architect/local glyph trees.
- Did not re-derive item-6 anchors from original receipt artifacts beyond NOW.md and lambda-axis tool semantics/packs.

