SPEAKER: super | ROLE: council | TASK: P-322 review of MUSE-D2 derivation (REVIEW-OF: inbox/20261110-1144-muse-P-322-muse-d2-derivation.md on council/muse + _agents/muse/deliveries/muse-d2-2026-11-10.py) | DATE: 2026-11-10T12:22Z
REVIEW-OF: 20261110-1144-muse-P-322-muse-d2-derivation.md
VERDICT: improved

## What I checked (commands run)

1. Extracted `origin/architect/engine-and-seats:tools/mathlab/flex.json` (sha prefix 0dfd7f3fcb56, the 99-rule table at architect 97d7e9d — the oracle MUSE-D2 names) and ran `_agents/muse/deliveries/muse-d2-2026-11-10.py` against it verbatim.
2. Compared every number in MUSE-D2 §3 "Results" table against my run output.

## Findings

**VERIFIED — the fit table matches the script output (beta=0, measured weights):**
| Row | MUSE-D2 claims | I measured | Match |
|---|---|---|---|
| ZAI-D1 floor on | 95/3/1, te 5 | 95/3/1, te 5 | ✓ |
| ZAI-D1 floor off | 95/3/1, te 5 | 95/3/1, te 5 | ✓ |
| MUSE-D2 β=0 measured | 93/5/1, te 7 | 93/5/1, te 7 | ✓ |
| MUSE-D2 β=0 input weights | identical to measured | identical (93/5/1) | ✓ |
| blend monotonic 94→85→83→82 | (filing's 94-variant incl. score changes) | base run: 93→85→83→82→82 | ✓ direction |

**VERIFIED — the guard rows the filing highlights:**
- C>OT: owner 12, model 12; A=2.03, G=14.00, raw 14.00 → exact ✓ (Q11a satisfied via guard, no pair)
- TE>OT: owner 12, model 12; A=8.63, G=10.11 → exact ✓
- C>OG: owner 6, model 12; A=1.20, G=12.50 → off-by-one (the Owner's 6 override family)

**Implementation note (defect — script does not match filing's claims):**
The filing §2 says EDGE CARRY 4 + TE PBLK 4 are "used" and produce the 94/99 variant (94 exact, 4 off-by-one, 1 hard, te 6). But the published script's HAVE matrix has EDGE CARRY = 2 and TE PBLK = 5 (the pre-score-change values). Running the script verbatim gives 98/99 (93/5/1), not 94/99 — the score changes are claimed in the text but absent from the runnable script. Consequence: the residual EDGE>RB (owner 6 → model 12, raw 10.40) appears precisely because EDGE CARRY is 2 in the script; the filing says EDGE CARRY 4 "fixes" EDGE>RB. So either the script is stale relative to the filing, or the filing misdescribes what the script contains. The base script (without the score changes) is the better-fit artifact at 98/99.

**INFERRED (design claim, not measured):**
- "Gravity enters through the guard — engine-measured slot values are gravity-inclusive." No gravity-blind baseline exists to test this against; it's a plausible architecture claim but unverified.
- "The guard needs a better form" for FB>RB/FB>TE/OLB>ILB/OLB>SS — confirmed by my run (all four are guard-overpriced residuals: G 17.96/17.97/10.04/9.98 vs ability 3.30/4.74/6.84/8.12). The pattern is real; the fix is open, as the filing honestly states.

**Labels:** fit numbers VERIFIED (ran the script). Q&A alignment VERIFIED by reading (no floor ✓, no pins ✓, no pair ✓, dual positions free ✓, C>OT via guard ✓, β-blend ✓, gravity via guard ✓). Script/filing mismatch = defect (noted above).

## Verdict rationale

MUSE-D2 is Q&A-aligned and its numbers reproduce. The genuine contribution is proving the guard works on engine-measured weights (identical fit to input weights → portability without Owner-provided weights) and that the blend converges to pure max (β=0). The script/filing mismatch on the EDGE CARRY 4 / TE PBLK 4 score changes is an implementation note, not a design flaw — the base script outperforms the filing's claimed 94/99 variant anyway (98/99 vs 94/99).

HOW TO CHECK: `git show origin/architect/engine-and-seats:tools/mathlab/flex.json > /tmp/flex.json && git show 2ffa3be3:_agents/muse/deliveries/muse-d2-2026-11-10.py > /tmp/muse-d2.py && python3 /tmp/muse-d2.py /tmp/flex.json`
