SPEAKER: inkling | ROLE: council | TASK: Phase 1 protocol — the converged note (estimator + validation + shape gate) | DATE: 2026-11-11
FOR: P-342, P-345
REVIEW-OF: none — this is a convergence filing, not a verdict. Inputs: MUSE P-345 λ identification (`inbox/20261111-1506-muse-P-345-lambda-identification.md`), MUSE P-345 margin gate (`inbox/20261111-1506-muse-P-345-phase1-margin-gate.md`), Z.ai P-345 Q1 λ conditioning (`_agents/glyph/deliveries/z-phase2-v2/inbox/20261111-1638-zai-P-345-lambda-identification-by-conditioning.md`), DS D4/D3 as reported and re-confirmed (MUSE), P-344 delivery `c7540b04`. Every number below was re-checked by me on 2026-11-11 unless labelled.

Audience: the Architect, speccing Phase 1. This note CONVERGES the three standing filings and two open questions into one protocol. Where the filings disagree, the disagreement is named, not silently resolved.

## §1 · Assumptions I made about the ~10% bar (Owner has not explicitly ruled)

- I assumed the Owner's ~10% totals bar applies to **team-level total means over a multi-season run** (points 22.78, drives 11.09, plays 81.46, off_plays 62.44, yards 343.67 vs ±10%), NOT exact-fit to the margin distribution and NOT per season.
- The margin distribution is a **shape check** (SD within ~10%; one-score/home-win/blowout rates within ±3–4 points; drives skew present) — not a distributional identity.
- I also assumed the bar is judged on a pooled multi-season run, not per season (real seasons vary ±4 points on the rates; SD 12.42–15.30).
- If the Owner rules otherwise (e.g., ~10% on SDs too, or per-season), only §4 and §2's tolerances change. Say so in the pack design; do not silently widen gates.

## §2 · The estimator — what identifies λ (and what does not)

1. **No dispersion matching.** DS D4 confirmed by two seats (DS, then MUSE exact re-run): dispersion-matching bias +0.232 / +0.427 / +0.751 at noise ratios 0.5 / 1 / 2; regression Cov/Var bias +0.002 / +0.002 / +0.003 at all ratios. Dispersion matching "reads sqrt(λ² + Var(e)/Var(g))" and overstates λ by the noise it cannot subtract. Phase 1 must not use it.
2. **DS D3: λ and θ are not separately identified — freeze θ.** The Lab identifies **β = λ·θ** (the product), from `P = sigmoid(β·gap/20)`. Freezing θ is not a workaround; it is the normalization that makes λ meaningful at all.
3. **The pack must record the frozen θ values in its provenance next to the fitted λ** (Phase 0 already carries pack provenance). A λ without its frozen θ is uninterpretable — re-freezing later and re-fitting produces a different λ for the identical model.
4. **Estimator: two-gap fit.** Run the Lab at gaps **10 and 20** (slotWins10 + slotWins20 — one more harness run off the existing slotWins20 machinery).
   - **Report R = Wins20/Wins10 first.** R ≈ 2.000 → linear form; one-gap estimator fine. R ≈ 1.98/1.89/1.65 → saturating form (β ≈ 0.5/1.0/2.0); joint two-gap sigmoid fit required (it recovers β with bias ≤ 0.001 at every β; one-gap linear from Wins20 is off by −0.153/−0.477 at β = 1.0/2.0 — biases invisible from inside one gap).
   - R > 2 → the form is convex, neither estimator applies; that is a real finding about the engine, report it, do not tune it away.
   - Fit β **jointly** to Wins10 and Wins20 (per context, if the design's λ_c split is retained — a single β cannot fit both gaps otherwise, and the residual IS the finding).

## §3 · The validation target — Z.ai's conditional moments (adopted, with the delivery caveat)

1. **Match Var(points | drives = N) at N ∈ {9, 11, 13}** instead of the unconditional SD. Conditioning on the observed drive count removes the possession-lottery channel (corr(drives, points) ≈ 0.07 on real data — the lottery is nearly linear-nil), and shrinks the script-feedback channel.
2. **Held-out protocol:** fit on 2016–2022, **hold out 2023–2025**. Report max |SD error| across the three buckets. A λ clearing ~10% on held-out conditional dispersion is identified; one that fits the training buckets and misses the holdout gradient is overfit to the moment.
3. **Cross-check (the demonstration, on our own data):** re-run the same fit on the **unconditional** SD. If D4 is right, the unconditional λ lands **23–75% higher** — the pair of runs demonstrates the confound instead of asserting it.
4. **Receipt status (re-verified by me, 2026-11-11):** the filing's bucket counts are CORRECT (2023 REG: drives=10 → n=117, drives=11 → n=136; byte-identical P-344 summary + my dropna recount agree; 544 team-games). The **"n = 572 team-games" headline is refuted** — no 2023 population gives 572 (REG 544; ALL 570). The conditioning script is not in the delivery, so corr=0.074 / SD 8.28/7.64 remain **REPORTED, not VERIFIED**; the support (bucket counts) is VERIFIED. Phase 1 spec should require the conditioning script + its output to be delivered with the pack, or the numbers stay REPORTED.
5. Z.ai's conditioning and MUSE's two-gap fit are **complementary, not competitors**: two-gap fit = the *estimator*; conditional moments = the *validation target*. VL's "λ is a dial, validated only by held-out predictions" and MUSE's two-gap Lab are the same protocol at different zoom levels; the dial (Owner's feel) remains as the Owner-visible knob ONCE the estimator lands.

## §4 · The shape gate — MUSE's margin gate (adopted, verified)

MUSE's gate reproduces exactly on the P-344 summary (my independent code, 2026-11-11): margin (home−away) 2016–2025, n=2,761: **mean +1.945 · SD 14.158 (my excess kurt 0.211 vs filed 0.206) · skew 0.052 · home win 54.8% · ties 0.62% · one-score ≤7 48.5% (≤3 24.3%) · blowout ≥21 16.1% (≥28 6.6%) · total/game 45.56 ± 14.00 · drives/game 22.18 ± 3.36 · drives skew 0.390** (REG sub-sample unchanged: 1.777/14.206/0.055/54.4%/48.5%/16.2%). Regular season only does not move the shape — playoffs need no separate gate.

Proposed Phase 1 shape checks (pooled multi-season run; NOT per season):

| check | real | tolerance |
|---|---|---|
| margin SD | 14.16 | ±10% (12.74–15.57) |
| one-score rate | 48.5% | ±4 pts |
| home win rate | 54.8% | ±4 pts |
| blowout rate (≥21) | 16.1% | ±3 pts |
| drives skew | 0.390 | present (not ≈0) |

Plus the §1 means bar. A model can hit 22.78 points and still fail this gate — that is the point of it. The margin SD is the most informative single number; the drives-skew check bites exactly where Z.ai's PLAYLED chain-length gap lives.

**Assumption flagged for the Owner:** this gate is a *proposal* (adopt or reject; Phase 2 could inherit it). It is not the Owner's standing ~10% bar as stated — it is sharper. Adopting it changes what "Phase 1 passes" means.

## §5 · λ objective — OPEN OWNER QUESTION (do not decide here)

The merged flex formula ships (council/glyph `f8d69c8b`) with **λ = 0.40 default, 0.20 reported**; the LOO finding (MUSE, REVIEWED, 6 reviews) shows fitted λ ≈ 0.20 by mean error vs 0.40 by exact tiers (in-fold: 86 exact @0.20 / 96 exact @0.40; mae 1.16 vs 1.38; LOO damages FB/RB out-of-sample). The Owner has not ruled. Presented as the two objectives, both real, both measurable:

| | λ ≈ 0.40 (tiers) | λ ≈ 0.20 (mean error) |
|---|---|---|
| optimizes | exact-tier match on the Owner's table | minimum average pricing error |
| in-fold exact | 96–97/97 | 85–86/97 |
| in-fold mae | 1.38 | 1.16 |
| gate preference | tier-exactness | continuous error |
| FB/RB LOO damage | reported (held-out) | reported (held-out) |

**Recommendation (mine, clearly labelled as a recommendation): adopt 0.20 as the merged-form default** — lowest mean error, no hard misses, and the FB scarcity doctrine is not paid for in average error; keep 0.40 available behind the Owner's gate if he wants tier-exactness as the acceptance criterion. But this is the Owner's call either way: the λ here is HIS dial, and both numbers are already printed in the delivery. Do not silently pick one in the Phase 1 spec.

## §6 · What this note changes vs the status quo

- Phase 1 spec MUST NOT carry dispersion matching (§2.1).
- Phase 1 spec MUST freeze θ and record it in pack provenance (§2.2–2.3).
- Phase 1 spec MUST run the Lab at two gaps and report R before fitting (§2.4).
- Phase 1 spec SHOULD carry the conditional-moment held-out validation (§3), with the conditioning script required in the delivery (not just its JSON).
- Phase 1 spec MAY adopt the margin shape gate (§4) — Owner's decision, see flag there.
- λ pricing objective (§5) is untouched — Owner decides 0.40 vs 0.20.

## §7 · Receipts

Every load-bearing number re-derived 2026-11-11 from the committed bytes: P-344 delivery `c7540b04` (five-way byte-identical re-run after a cold re-download of all 30 files); margin gate re-computed from `team_game_summary_2016-2025.csv` (my code, values above); conditioning bucket counts re-derived from raw pbp with NaN drives dropped (117/136 REG; 544) and the P-344 summary; D4/D3 as confirmed by MUSE (my independent review of that confirmation not repeated — no independent re-run of DS's 20,000-league script in this session; its status is REPORTED+second-seat, not triple-verified).

— filed under FOR: P-342, P-345 · inkling · 2026-11-11 · branch council/inkling
