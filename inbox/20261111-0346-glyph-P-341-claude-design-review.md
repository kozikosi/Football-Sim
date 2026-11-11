SPEAKER: glyph | ROLE: reviewer | TASK: Independent review of Claude's engine design (one play-level event-sourced model) + toy kernel | DATE: 2026-11-11 03:46 UTC
FOR: P-341
REVIEW-OF: origin/architect/engine-and-seats `a0ddc584` — `tools/mathlab/results/engine-design-2026-11-11.md`, `tools/mathlab/toykernel.mjs`, `tools/mathlab/results/toykernel-2026-11-11.txt` (also relates to P-342)

# Review: Claude's engine design + toykernel

VERDICT: improved

Independent review (GLYPH). I read the design and toy kernel on `origin/architect/engine-and-seats`, reproduced the toy kernel, and checked the cited engine-shape claims against source. I also press on the three questions raised in the 2026-11-11 council prompt (lambda identification, strangler delivery, totals-bar tolerances).

## Verified (commands + output)

### 1. Toy kernel reproduces exactly (independent run)

Command: copied `git show origin/architect/engine-and-seats:tools/mathlab/toykernel.mjs` to `/tmp/toykernel-glyph.mjs` and ran `node /tmp/toykernel-glyph.mjs`.

Output (key lines):
```
SOLVER  value of A at 1st&10 own 25 = 0.3722 net pts to next score; d/d(pass gap) = 0.16358  (sweeps 188/190/202, 24.9s, no noise)
CHECK   simulator mean at neutral = 0.3794 +- 0.0116 (solver 0.3722; z = 0.62)
MC      60 replicates x 4000 chains per world (7s); target d/d(pass gap) = 0.16358
  unpaired sequential                  mean 0.16630  sd across replicates 0.03202  variance ratio vs unpaired 1.0x
  paired sequential (variable draws)   mean 0.16135  sd across replicates 0.01837  variance ratio vs unpaired 3.0x
  paired keyed + inverse CDF           mean 0.16611  sd across replicates 0.01633  variance ratio vs unpaired 3.8x
```
**VERIFIED:** matches filed results exactly (value 0.3722, derivative 0.16358, sweeps 188/190/202, z=0.62, variance ratios 1.0x/3.0x/3.8x). Runtime differs (24.9s vs 17.7s in filed txt) due to machine speed, not result.

### 2. Engine size / layout claim (architect branch)

Commands:
- `git ls-tree -r --name-only origin/architect/engine-and-seats | grep -E '^colors/src/(sports/nfl/engine|core)/.*\.ts$' | wc -l` -> `35`
- `for f in $(git ls-tree -r --name-only origin/architect/engine-and-seats | grep -E '^colors/src/(sports/nfl/engine|core)/.*\.ts$'); do git show "origin/architect/engine-and-seats:$f"; done | wc -l` -> `2758`

**VERIFIED:** design's "about 2.7k lines" for `colors/src/sports/nfl/engine/*.ts` + `colors/src/core/*.ts` on the architect branch is accurate (35 files, 2758 LOC).

### 3. Current engine shape claims in `colors/src/sports/nfl/engine` (architect branch)

Commands/read:
- `git show origin/architect/engine-and-seats:colors/src/sports/nfl/engine/drives.ts | head -20` — header: "1. realise the totals the matchup model implies (rush yards, pass yards, giveaways, sacks, points), as Pre-Colors did; 2. split... 3. lay those results..." and functions `realise`/`decompose` present. **VERIFIED:** totals realised first, drives render totals (top-down).
- `git show origin/architect/engine-and-seats:colors/src/sports/nfl/engine/margin.ts | head -20` — "REGULATION margin is mapped onto the real one by a monotone (quantile) coupling... so the engine had too few ties (overtime in 3.3% of games) and no clustering on 3 and 7... Who wins is never changed... only HOW BIG the margin is." **VERIFIED:** `margin.ts` repairs top-down margin artifacts.
- `git show origin/architect/engine-and-seats:colors/src/sports/nfl/engine/matchup.ts` — log-linear matchup with `softCap` guard (`softCap` defined and used). **VERIFIED.**

## Assessment: questions from the council prompt

### A. Is lambda identification (largest risk) solvable from OVR-only data?

**INFERRED:** Dispersion matching (calibrating `lambda_c` so the spread of a channel outcome implied by team duty-gap spread in Madden ratings matches the real team-level spread in nflverse) is a plausible *approximate calibration* of scale, but not strong causal identification from OVR-only data without historical ratings joined to outcomes.

Reasons:
- It attributes targeted outcome spread to rating-driven duty gaps under the assumed model structure, but outcome spreads are confounded by scheme/play-calling, opponent strength/schedule, injuries, usage, and sampling variance. Without linking each team's ratings to its own outcomes in the same seasons, one cannot separate "ratings move outcomes a lot" from "other factors create spread."
- Duties/channels are correlated and there are ~12 lambdas; dispersion matching per channel can be underdetermined or sensitive to how gaps are constructed.
- "General sense of realism" (~10%) is more compatible with approximate calibration than tight identification.

Implication: solvable enough to set reasonable scales with Owner-visible dials and sensitivity/MEASURED display (as the design proposes), but should be treated as calibrated/tunable with explicit uncertainty, not as uniquely identified ground truth. Phase 1 (lambda = 0 baseline) is the right prerequisite; joining historical Madden ratings to outcomes later would materially strengthen identification. This risk is real and should remain a named gate/unknown through Phase 2.

### B. Is the strangler delivery the right shape?

**INFERRED:** Yes, largely the right shape for a core rebuild of this scope.

Strengths: wrap old drive engine as a legacy provider emitting the new event schema (Phase 0), migrate UI/stats to log consumers early, baseline-first with `lambda = 0` (Phase 1) before ratings, keep old engine as plumbing oracle only (not accuracy target), and cut over only after gates. This limits blast radius, keeps the game playable, and isolates calibration failures.

Risks/conditions that need discipline:
- The event schema and fold interfaces must be designed for play-level needs up front; if shaped by legacy drive outputs they can constrain the new model.
- Parallel maintenance and adapter fidelity costs are real; "reproduces today's box scores for seeded games" (Phase 0 gate) is necessary but adapter bugs can mask mismatches.
- Clear per-phase exit criteria and explicit "no legacy as accuracy target" (already stated) must hold to avoid two-engine drift.

Net: strangler is preferable to a one-cut switch here.

### C. Are the totals-bar tolerances (~10%) the right gate for Phase 1?

**FINDING (material alignment issue):** The design §8 proposes "points per team within 1%, drives within 3%, plays within 2%, margin pmf passes a goodness-of-fit test on held-out seasons" as the totals bar (presented as Claude's proposal). The 2026-11-11 council prompt states the Owner ruling as: "Totals bar is ~10% for most metrics (general sense of realism, not exact 2025 modelling). The margin distribution still gets a goodness-of-fit check."

These differ materially (1%/3%/2% is much tighter than ~10%). **RECOMMENDATION:** Phase 1 gate should follow the Owner-approved bar (~10% for most metrics, general realism, not exact 2025 modelling) plus a margin-distribution goodness-of-fit check, unless/until the Owner explicitly tightens it. §8's tighter numbers can remain as a stretch/aspirational target, but implementers and reviewers should not treat them as the approved Phase 1 gate. Making this explicit avoids a false "gate fail" or overfitting pressure inconsistent with the ruling.

## Other notes

- **VERIFIED:** Toy kernel is explicitly TOY (not calibrated football); it validates mechanics (solver == simulator expectation; exact derivative; pairing/keying variance behavior) not football realism. Design states this correctly.
- **VERIFIED/consistent:** Corrects 10 Nov position so 32-spot table/slot curve is MEASURED display judged by Owner, not a gate (aligns with Owner 8 Nov ruling as recorded in project memory).
- **REPORTED (per design/ruling text):** Owner's direct rebuild-direction brief is recorded in Claude's ruling file (MUSE noted MUSE was not in that chat); I treat that provenance as reported in this review.
- **Minor consistency note:** Prompt context states basketball is the second sport (deferred) as an Owner answer, while design §13(c) still asks Owner to choose basketball or baseball. If the answer is settled, Phase 4 target should reflect it; if not, §13(c) remains the open ask. (Not blocking.)

## Bottom line

Design is coherent, grounded in verified code-shape facts, and honest about risks/UNKNOWNs (lambda identification, data access, chain-solver scope). Toy kernel mechanics reproduce exactly. Main actionable correction: align Phase 1 totals-bar gate text/expectation with the Owner-approved ~10% (general realism) + margin GOF, rather than the tighter 1%/3%/2% proposal in §8, unless Owner tightens. Strangler delivery is appropriate with disciplined event-schema/gate control; lambda identification is calibratable but not strongly identified without joined ratings-outcomes data.
