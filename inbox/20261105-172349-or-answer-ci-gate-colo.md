SPEAKER: or | ROLE: council | TASK: answer ASK outcome-based CI gate for Colors v1 | DATE: 2026-11-05T17:23:49Z

FOR: architect-ASK-outcome-based-ci-gate-for-colo

Method: `node --experimental-strip-types tools/calibrate-draft.ts <N> greedy,top30,favorites` from `colors/`, DEFAULT_CONFIG unchanged, 3 policies × N drafts, each draft plays one season via the engine public API. No engine files touched. Timing measured: N=100 = 291 s, N=300 = 834 s (~2.8 s/draft), N=1000 ≈ 46 min (not re-run; analytical SE below). RNG seeds 1000+i per draft, user slot random.

Previous measurement cited in the ASK (100 drafts): greedy 90%/20%, top30 38%/3%, favorites 20%/0%. My re-run differs on top30 — reported below with sampling error so the difference is visible, not hidden.

## (a) Concrete bands with sampling error

Sampling: binomial SE = sqrt(p(1-p)/N), 95% CI = ±1.96×SE. N=1000 values are analytical estimates from N=300 proportions (not re-run).

| Policy | Metric | N=100 (measured) | N=300 (measured) | N=1000 (analytical est.) | Owner target |
|--------|--------|------------------|------------------|--------------------------|--------------|
| greedy | playoffs % | 89% (±6pp) | 88% (±4pp) | 88% (±2pp) | ~90% |
| greedy | SB title % | 21% (±8pp) | 20% (±5pp) | 20% (±3pp) | 10-25% |
| top30 | playoffs % | 53% (±10pp) | 47% (±6pp) | 47% (±3pp) | 'have fun' |
| top30 | SB title % | 11% (±6pp) | 6% (±3pp) | 6% (±2pp) | — |
| favorites | playoffs % | 18% (±8pp) | 16% (±4pp) | 16% (±2pp) | punished |
| favorites | SB title % | 0% (0-7pp upper) | 0% (0-3pp upper) | 0% (0-1pp upper) | punished |
| all | CPU avg wins | 8.40-8.56 | 8.41-8.56 | 8.4-8.6 (±0.1) | ~average |
| all | CPU r1-4 gap p90 | 5 OVR | 5 OVR | 5 OVR | ≤5 OVR |
| all | CPU r1-4 gap max | 5 OVR | 5 OVR | 5 OVR | ≤5 OVR |

Notes:
- Greedy playoffs 88-89% brackets the Owner's ~90%; greedy SB 20-21% sits inside the 10-25% band. Both PASS at N=100/300.
- Top30 playoffs moved 53%→47% from N=100 to N=300; the N=100 CI (±10pp) covers the previously cited 38%. At N=300 the band is 41-53%, mid-range — not dominating, not punished. Consistent with 'have fun'.
- Favorites are clearly worst: playoffs 16-18%, SB 0%. Punished relative to greedy (88-89%) and top30 (47-53%).
- CPU r1-4 gap is rock solid: median 3, p90 5, max 5 at both N=100 and N=300. Within the Owner's ~5 OVR rule.
- CPU avg wins 8.40-8.56, close to the 8.5 season mean — user beats an average CPU team under greedy/top30, loses under favorites.
- Owner 5 Nov: parity and home-win rate do not matter. Outcome Lab (440 seasons) shows ≤2-win team in 8% of seasons (Mode A); the Owner wants MORE bottom losers — a design direction, not a CI band.

## (b) DraftConfig knobs that widen the CPU bottom without breaking the r1-4 gap

`colors/src/sports/nfl/engine/draft.ts:30-33` DEFAULT_CONFIG:
`topFloor:5, topFloorRounds:4, midFloor:10, midFloorRounds:8, kpFirstRound:6, noiseMax:1.5, missMax:0.6, biasSd:0.5, hyperP:0.15, replFloor:72`

Rounds 1-4 are hard-capped: no CPU pick more than `topFloor` OVR below the best on the board (verified: p90=5, max=5 across N=100 and N=300). Do NOT change `topFloor` or `topFloorRounds` — that breaks the Owner's ~5 OVR r1-4 rule.

Knobs that widen the CPU bottom (rounds 5+, more CPU error, worse bottom teams) while leaving r1-4 intact:
- `missMax: 0.6` → increase. CPU miss probability uniform [0, missMax]; higher = CPU passes on good players more often, bottom rosters degrade.
- `noiseMax: 1.5` → increase. Team noise sd uniform [0.05, noiseMax]; higher = more random CPU valuation.
- `biasSd: 0.5` → increase. sd of ln(group bias); higher = more extreme group preferences, some teams ignore good slots.
- `hyperP: 0.15` → increase. Chance a group is hyper-valued or nearly ignored (0.05 or 2-5×); higher = more polarized CPU tastes.
- `midFloor: 10` → increase. Looser OVR cap in rounds 5-12 (midFloorRounds=8).

Leave `replFloor: 72` unchanged — it sets replacement-level valuation, not CPU pick quality directly.

## (c) Smallest CI job

Command: `node --experimental-strip-types tools/calibrate-draft.ts 100 greedy,top30,favorites` run from `colors/`. Runtime ~5 min on one core. Exits non-zero if any band fails.

Fail rules (band = N=100 measured ± 95% CI):
1. greedy playoffs < 83% or > 95% (measured 89% ± 6pp)
2. greedy SB < 12% or > 30% (measured 21% ± 8pp)
3. favorites playoffs > 26% (measured 18% ± 8pp; must stay clearly below greedy)
4. favorites SB > 8% (measured 0%; rule-of-3 upper bound ~7pp at N=100)
5. CPU r1-4 gap p90 > 5 OVR (breaks Owner ~5 OVR rule; measured 5)
6. CPU avg wins outside 8.2-8.8 (measured 8.40-8.56)

Rationale: N=100 is the smallest N where the bands separate the three policies (greedy ≈ top30 > favorites) with usable CI. The job calls the engine through the public API, touches no engine files, and fails when a model change moves the outcome bands. Owner 5 Nov direction (more bottom losers, parity not a target) is reflected: no parity or home-win-rate bands in the gate.
