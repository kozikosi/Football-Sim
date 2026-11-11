SPEAKER: DS | ROLE: council (reviewer) | TASK: P-341 — independent check of Z.ai's Plays Ledger numbers | DATE: 2026-11-11T00:25Z

REVIEW-OF: `_agents/vl/deliveries/z-play-by-play-analysis/_agents/zai/deliveries/ZAI-PLAY-LEVEL-ANSWER-2026-11-11.md`
(`origin/council/vl`, `9ede94bf`), Appendix A and §2.1.

VERDICT: improved

I re-ran the ability numbers from Glyph's independent re-implementation (`zai-d1-kg-verify-2026-11-10.py`,
`origin/council/glyph`) with the Owner's three score changes (EDGE CARRY 4, C PBLK 6, TE PBLK 4), floor off, and
recomputed the guard from `tools/mathlab/sport-football.json` on the architect branch (the flexunify config, which
already includes the Owner-approved C 200 / OLB 200 bumps). This confirms MUSE's corrections and adds one new
finding on C>OG.

## Independently reproduced (VERIFIED)

| Row | Z.ai's ability | actual raw (tier) | max(ability, E·G) | tier | Owner | verdict |
|---|---|---|---|---|---|---|
| FB>RB | ~1–2 | **3.30** (2), binding gap **CTH 2.10** | 3.30–4.50 | **2–6** | 2 | within ±5; see band below |
| FB>TE | ~1–2 | **4.74** (6), binding PBLK 3.10 | 4.74 | **6** | 6 | **exact** (Z.ai says "one tier low" — wrong) |
| C>OT | ~6 | 6.68 (6) | 14.0 | 12 | 12 | exact |
| C>DT | ~6 | **9.12** (12) | 14.0 | 12 | 12 | exact |
| C>OG | ~2 | **5.13** (6) | **10.0** | **12** | 6 | **lone tier miss** (see below) |
| OLB>ILB | ~2 | **6.84** (6) | 6.84–7.0 | 6 | 6 | exact; exposure agrees, it does not "repair" |
| OLB>SS | ~6–8 | **8.12** (6), binding ZCOV 6.00 | 8.12 | 6 | 6 | exact |
| OLB>FS | ~8–9 | **11.74** (12) | 11.74 | 12 | 12 | **exact** (Z.ai calls it a miss — wrong) |
| TE>FS | ~12 | **13.64** (12) | 13.64 | 12 | 12 | exact |
| RB>FB, TE>FB | ~0 | 0.00 | 0 | 0 | 0 | exact |

Net: **10 of 11 rows exact**, not the 8/11 Z.ai's table shows; the only miss is **C>OG**. Correcting the numbers
strengthens the design. The FB>RB binding duty is **CTH**, not CARRY as §2.1 says.

## The FB tier band (VERIFIED arithmetic)

`G(FB>RB) = 18.0` (FB 25 → RB1 250). With E 0.15–0.25, E·G = **2.7–4.5**; ability 3.30. `max` = 3.30–4.50.
The tier is 2 while E < **0.2222** (4.0/18) and 6 above it. Z.ai lists a single tier 2; the band is **2–6**.
This is not fatal: the maximal error is 4 points (tier 6 vs Owner 2), inside the Owner's stated **±5** acceptance.
The table should show the band, or the measured E should decide it. FB>TE is tier 6 at every E once the ability is
corrected (4.74 > 4.5), so the FB family has exactly one sensitive row.

## New finding — C>OG is not fixed by the "measured" values (VERIFIED)

Z.ai's Appendix A says raw weights overshoot C>OG (12.5) and that "flexunify's measured values ... pulling the
guard toward 6". The flexunify config already carries the Owner's bumps: **C 200, OG1 400**. The guard is
`20 × (1 − 200/400) = **10.0**` → tier **12** (cut at 9), still 6 points from the Owner's 6. To reach tier 6 the
config would need `C ≥ 220` (with OG 400); the approved C is 200. So:

- C>OT: 12.0 → tier 12 = Owner 12 ✓ (the bump fixed this one);
- C>DT: 12.0 → tier 12 = Owner 12 ✓;
- **C>OG: 10.0 → tier 12 vs Owner 6 ✗** — a 4-point raw error, but a 6-point tier error, just outside ±5.

The sentence "the live design uses measured values, which is what makes the C-family numbers land" is therefore
true for C>OT and C>DT, **false for C>OG**. This is the one row where the exposure-weighted guard overprices a
full-exposure move. The fix is a design choice, not a number chase: (a) do not apply the value guard between
adjacent line spots (C→OG) where the ability layer already agrees with the Owner (5.13 → 6); (b) make the guard
concave in the value ratio; or (c) cap the guard at the destination tier. I recommend (a): the market premium the
Owner described is a *cross-position* premium (C→OT), not an interior-line one.

## Also confirmed

- The FB>RB and OLB>ILB/SS repairs are real: the plain guard would give 18 and 10 → tiers 12, and exposure (or
  the corrected ability) brings them to 2–6 and 6. The mechanism works; the arithmetic in the table did not.
- The two-loops argument, the five steps and the "Ledger is a view, not a rebuild" claim do not depend on
  Appendix A and are unaffected by these corrections.
- §2.1's explanation of FB>RB is wrong in its detail (CTH, not CARRY), and §3's "70% transfers" / §0's "80% at
  20%" are estimates presented as conclusions — label them.

## Weakest point of the review

I did not run a simulation: E is the real-football band Z.ai cites, not the engine's own ledger. The C>OG
finding is arithmetic on the current config, not a draft outcome. Everything else is a re-run of the ability
script or a direct read of the config.

## Required corrections (same as MUSE, plus one)

1. Replace Appendix A with the re-run numbers (FB>RB 3.30, FB>TE 4.74, C>DT 9.12, C>OG 5.13, OLB>ILB 6.84,
   OLB>SS 8.12, OLB>FS 11.74, TE>FS 13.64); FB>TE and OLB>FS are exact, not misses.
2. Show FB>RB as tier **2–6** across E 0.15–0.25, or narrow E to <0.22; note the 4-point error is within ±5.
3. Correct the C>OG claim: with the bumped C 200 it is **10.0**, still tier 12; the "measured values fix it"
   sentence needs the C≥220 arithmetic or a design change (recommend: no guard between adjacent line spots).
4. Correct §2.1's FB>RB duty from CARRY to **CTH**.
5. Include the arithmetic script; label the 70%/80% figures as estimates.

Labels: the ability and guard numbers above are **VERIFIED** (commands: the glyph script imported and run; the
config read from `sport-football.json`); the ±5 judgement is the Owner's stated rule (**REPORTED**, Q&A); the
recommended guard change is **INFERRED** (not run against the 99).
