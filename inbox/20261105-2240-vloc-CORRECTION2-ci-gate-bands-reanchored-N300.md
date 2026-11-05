CORRECTION-OF: 20261105-1722-vloc-ANSWER-outcome-based-ci-gate-for-colo.md
ALSO-SUPERSEDES: section (a) bands of 20261105-2140-vloc-CORRECTION-outcome-based-ci-gate-for-colo.md

Re-anchors section (a) to N=300 empirical point estimates (background run finished, VERIFIED). N=100 VERIFIED figures and knob results (midFloor=15, missMax=0.8) remain valid.

## N=300 measured (VERIFIED; command `calibrate-draft.ts 300`, 727 s, DEFAULT_CONFIG unchanged)
| policy | wins | CPU avg wins | playoffs | title | CPU r1-4 gap median | p90 | max |
|---|---|---|---|---|---|---|---|
| greedy | 11.26 | 8.41 | 88% | 20% | 3 OVR | 5 OVR | 5 OVR |
| top30 | 8.80 | 8.49 | 47% | 6% | 3 OVR | 5 OVR | 5 OVR |
| favorites | 6.58 | 8.56 | 16% | 0% | 3 OVR | 5 OVR | 5 OVR |

Output at /tmp/calibrate-300.out.

## Owner-target check (Owner 31 Oct verbatim targets)
- greedy playoffs ~90%: measured 88% → band below contains 90% ✓
- greedy title 10–25%: measured 20% → inside ✓
- top30 "have fun": no numeric target → quantified by band
- favorites punished: 16% playoffs vs greedy 88% ✓
- CPU rounds 1-4 within ~5 OVR: p90=5, max=5 → not exceeded ✓

## Owner 5 Nov additions
- user beats average NFL team: greedy 11.26 vs CPU avg 8.41 ✓; top30 8.80 vs 8.49 ✓ (narrow); favorites 6.58 vs 8.56 ✗ (punished, as intended)
- MORE losers at bottom: favorites at 6.58 wins → these are the losers ✓

## Discrepancy flag
ASK-cited "current measured (100 drafts)" top30 was 38%/3%. Neither my N=100 (53%/11%) nor N=300 (47%/6%) matches it; greedy (89%/20% → 88%/20%) and favorites (18%/0% → 16%/0%) roughly match. Likely a different data version; not re-anchored to it.

## (a) Re-anchored bands — N=300 point estimate ± 95% margin (CALCULATED; binomial SE=√[p(1−p)/N])
| policy | metric | p@300 | SE@300 | SE@1000 | 95m@300 | 95m@1000 | band @300 | band @1000 |
|---|---|---|---|---|---|---|---|---|
| greedy | playoffs | 88% | 1.9% | 1.0% | 4% | 2% | [84–92] | [86–90] |
| greedy | title | 20% | 2.3% | 1.3% | 5% | 3% | [15–25] | [17–23] |
| top30 | playoffs | 47% | 2.9% | 1.6% | 6% | 3% | [41–53] | [44–50] |
| top30 | title | 6% | 1.4% | 0.8% | 3% | 2% | [3–9] | [4–8] |
| favorites | playoffs | 16% | 2.1% | 1.2% | 4% | 2% | [12–20] | [14–18] |
| favorites | title | 0% | — | — | rule of three: upper 95% bound ≈ 3/N → 1%@300, 0.3%@1000 | — | [0–1] | [0–0.3] |

Concrete recommendation: gate on N=300 point estimates with the [band @300] column; tighten to N=1000 bands once a nightly CI slot is affordable (~24 min per run extrapolated).

## (b) Knobs (unchanged from prior correction, empirically verified at N=100)
midFloor=15 preferred (lowers CPU bottom: top30 53→44% at N=100; greedy title stays 17%, inside target); missMax=0.8 alternative. Rounds 1-4 gap unchanged (3/5/5) in baseline and both variants. Rounded: midFloor 10→15.

## (c) CI job (unchanged): `calibrate-draft.ts 300 greedy,top30,favorites` (~12 min) with assertions on the band column; run on every change to DEFAULT_CONFIG or season.ts.
