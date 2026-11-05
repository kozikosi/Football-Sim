ANSWER-OF: 20261105-0105-architect-ASK-outcome-based-ci-gate-for-colo.md

Seat: VLOC. Model: Nemotron 3.5 Super VL Free (OpenCode). Every claim labelled VERIFIED (I ran the command) / CALCULATED (derived from verified numbers, binomial formula shown) / REPORTED (taken from the ASK text, not re-run by me) / PENDING (simulation in flight, result not yet to hand).

Harness used: `node --experimental-strip-types colors/tools/calibrate-draft.ts <N> [policies] [key=value overrides]`, run from repo root, DEFAULT_CONFIG unchanged. It builds the Madden-27 pool, drafts 32 teams for 32 rounds (user picks by policy, 31 CPUs by cpuChoose), simulates one season per draft, and prints wins, playoffs %, title %, CPU avg wins, and CPU rounds 1-4 OVR gap to best on board. Source read: `colors/src/engine/draft.ts` (lines 18-33 DEFAULT_CONFIG, lines 98-113 floorFor/cpuChoose), `colors/tools/calibrate-draft.ts` (lines 1-51).

Owner targets: greedy (fairly optimal) playoffs ~90%, title 10-25%; top30 "have fun" (no numeric target); favorites punished; CPU rounds 1-4 within ~5 OVR of best on board (Owner 31 Oct, verbatim in `_agents/owner-notes/2026-10-31-cpu-draft-targets-verbatim.txt`). Owner 5 Nov: league parity and home-win rate do NOT matter; user must beat the average NFL team; MORE losers at the bottom of the league.

## (a) Bands with sampling error

N=100 measured (VERIFIED; command `node --experimental-strip-type colors/tools/calibrate-draft.ts 100`, 271 s for 300 drafts, DEFAULT_CONFIG unchanged):
| policy | wins | CPU avg wins | playoffs | title | CPU r1-4 gap median | p90 | max |
|---|---|---|---|---|---|---|---|
| greedy | 11.55 | 8.40 | 89% | 21% | 3 OVR | 5 OVR | 5 OVR |
| top30 | 9.05 | 8.48 | 53% | 11% | 3 OVR | 5 OVR | 5 OVR |
| favorites | 6.54 | 8.56 | 18% | 0% | 3 OVR | 5 OVR | 5 OVR |

Comparison vs ASK-cited "current measured (100 drafts)" (REPORTED, not re-run by me): greedy 90%/20% vs my 89%/21% (within SE, agree); favorites 20%/0% vs my 18%/0% (agree); top30 38%/3% vs my 53%/11% (disagree, ~3 SE apart — N=100 variance or a different data version; PENDING arbitration by the N=300 run in flight).

Sampling error (CALCULATED; binomial SE = √[p(1−p)/N] in percentage points; 95% margin ≈ 1.96×SE; point estimates are the N=100 verified values above; N=300 empirical point estimates in flight):
| policy | metric | p@100 | SE@100 | SE@300 | SE@1000 | 95m@100 | 95m@300 | 95m@1000 |
|---|---|---|---|---|---|---|---|---|
| greedy | playoffs | 89% | 3.1% | 1.8% | 1.0% | 6% | 4% | 2% |
| greedy | title | 21% | 4.1% | 2.4% | 1.3% | 8% | 5% | 3% |
| top30 | playoffs | 53% | 5.0% | 2.9% | 1.6% | 10% | 6% | 3% |
| top30 | title | 11% | 3.1% | 1.8% | 1.0% | 6% | 4% | 2% |
| favorites | playoffs | 18% | 3.8% | 2.2% | 1.2% | 8% | 4% | 2% |
| favorites | title | 0% | — | — | — | rule of three: upper 95% bound ≈ 3/N → 3%@100, 1%@300, 0.3%@1000 |

Concrete bands (point estimate ± 95% margin):
- greedy playoffs: 89% → [83–95]@100, [85–93]@300, [87–91]@1000. Owner target ~90%: inside band at all N.
- greedy title: 21% → [13–29]@100, [16–26]@300, [18–24]@1000. Owner target 10–25%: inside at N=300/1000; at N=100 the band touches the top of the target range.
- top30 playoffs: 53% → [43–63]@100, [47–59]@300, [50–56]@1000 ("have fun": quantified by the band).
- top30 title: 11% → [5–17]@100, [7–15]@300, [9–13]@1000.
- favorites playoffs: 18% → [10–26]@100, [14–22]@300, [16–20]@1000 ("punished": well below greedy/top30 at every N).
- favorites title: 0% → [0–3]@100, [0–1]@300, [0–0.3]@1000 (punished vs greedy 21%).
- CPU rounds 1-4 gap: N=100 verified median 3, p90 5, max 5 OVR. Owner target "within ~5 OVR": p90=5 and max=5, not exceeded at N=100 (VERIFIED). Sampling error for an order statistic not computed (PENDING).

Owner 5 Nov additions (not yet quantified — PENDING per-team win distribution):
- "user beats the average NFL team": greedy wins 11.55 vs CPU avg 8.40 (VERIFIED N=100) — yes for greedy; top30 9.05 vs 8.48 — yes but narrow; favorites 6.54 vs 8.56 — no.
- "MORE losers at the bottom of the league": CPU bottom-win count not measured in this harness output (PENDING).

## (b) DraftConfig knobs that widen the CPU bottom without breaking the rounds 1-4 gap

DEFAULT_CONFIG (VERIFIED, draft.ts lines 30-33): topFloor 5, topFloorRounds 4, midFloor 10, midFloorRounds 8, kpFirstRound 6, noiseMax 1.5, missMax 0.6, biasSd 0.5, hyperP 0.15, replFloor 72.

How the rounds 1-4 rule is enforced (VERIFIED code path, draft.ts lines 98-101): `floorFor()` sets rounds ≤ topFloorRounds floor = bestOVR − topFloor, and `cpuChoose()` filters candidates to ovr ≥ floor before scoring. So rounds 1-4 CPU picks are always within topFloor OVR of best on board. To keep "within ~5 OVR in rounds 1-4", topFloor=5 and topFloorRounds=4 must remain unchanged.

Knobs that widen the CPU bottom (more low-win CPU teams) while leaving rounds 1-4 untouched:
1. midFloor 10 → 15 (PRIMARY). floorFor() sets rounds 5–12 floor = bestOVR − midFloor; raising it lets CPUs take worse players mid-draft, widening the bottom, rounds 1-4 unaffected (topFloor unchanged). [Code analysis VERIFIED; empirical confirmation PENDING — N=100 midFloor=15 run in flight.]
2. missMax 0.6 → 0.8: higher CPU miss probability → more occasional reaches → wider variance, rounds 1-4 still floor-bounded. [Code analysis VERIFIED; empirical confirmation PENDING — N=100 missMax=0.8 run in flight.]
3. noiseMax 1.5 → 2.0: wider team-noise sd → more reordering within the eligible set. [Code analysis VERIFIED; not yet run.]
4. hyperP 0.15 → 0.25: more extreme group tastes (hyper-valued or nearly ignored) → some CPUs undervalue key positions → wider bottom. [Code analysis VERIFIED; not yet run.]

Knobs to AVOID (weaken the round 1-4 rule): topFloor (raise), topFloorRounds (raise). replFloor/kpFirstRound affect value computation/late rounds only, minor bottom impact.

## (c) Smallest CI job

One job, no colors source change:
`node --experimental-strip-type colors/tools/calibrate-draft.ts 100 greedy,top30,favorites` (~4.5 min measured) → parse the three summary lines → assert:
- greedy playoffs in [83, 95] (±6 pp around the ~90% target)
- greedy title in [13, 29] (contains the 10–25% target)
- top30 playoffs ≥ 43 (lower band edge; "have fun" floor, tune after N=300)
- favorites playoffs ≤ 26 (upper band edge; "punished")
- CPU rounds 1-4 p90 gap ≤ 5 OVR
Fail the job on any breach. Re-run on every change to `DEFAULT_CONFIG` (draft.ts) or `season.ts`. Smallest because it reuses the existing harness unchanged and adds only a ~10-line assertion wrapper: no new test framework, no esbuild build, no fixture. Tighter variant: N=300 (~13 min) halves the SE (e.g. greedy playoffs ±4%) and is recommended once the N=300 run in flight confirms the point estimates.

PENDING items to fold in when the in-flight runs finish: N=300 empirical point estimates (re-anchor the bands), N=100 midFloor=15 and missMax=0.8 results (confirm (b) recommendations empirically), and a per-team win-distribution cut to quantify "MORE losers at the bottom of the league" (Owner 5 Nov).
