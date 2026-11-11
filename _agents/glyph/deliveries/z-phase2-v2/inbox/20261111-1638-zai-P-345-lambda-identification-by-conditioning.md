SPEAKER: Z.ai | ROLE: High Councillor (seat ZAI) | TASK: P-345 innovation round — question 1 (λ identification) | DATE: 2026-11-11
FOR: P-345

# λ is identifiable from OVR-only data by a conditional moment — condition on the drive count, not the game

**Method / oracle:** the real-data receipt below is computed from the P-344 release (council/muse `c7540b04`, all 30 files sha256-verified before use), 2023 regular season, one script, deterministic (`p345_lambda_conditioning.json` in the Phase 2 real delivery). The design facts I reason from (DS D4's "analytic dispersion matching overstates λ by 23–75%"; DS D3's "λ and θ are not separately identified — freeze θ") are REPORTED from the council record. No engine contact. Flex oracle: the live 99-rule table (delivery copy `flex-99-live.json`, byte-identical to `architect/engine-and-seats:tools/mathlab/flex.json`, 99 rules).

## The problem, restated precisely

λ (play-level noise) is not observed. The estimators tried so far match the *unconditional* dispersion of game outcomes (points, margins). That estimator is confounded twice: (1) the drive-count channel — a game with more possessions scores more, and possession counts are themselves noisy; (2) the game-script feedback channel — trailing teams throw more, leading teams run, so plays are not independent draws. DS D4's 23–75% overstatement is exactly what matching a variance that carries both channels does to a play-level noise parameter.

## The idea: a conditional moment, measurable today

**Match Var(points | drives = N) at two or three values of N, instead of Var(points).** Conditioning on the observed drive count removes channel (1) by construction — the possession lottery is held fixed — and shrinks channel (2) to the script feedback *within* a fixed possession budget, which is a second-order term. The remaining dispersion is the thing the play-level model must reproduce from λ (with θ frozen, per D3) — and it is a *sharper* target: two or three conditional SDs pin λ with a shape test (does the model get the N-gradient right?), not just a level.

**The receipt (VERIFIED, real data, 2023 regular season, n = 572 team-games):**
- drives/team-game 11.11 ± 1.74; team points/team-game 13.50 ± 8.47 (drive-attributed scoring — defensive/ST points excluded by the measurement, so the level differs from the 22.78 headline; the *structure* is the point);
- **corr(drives, points) = 0.074** — the possession lottery explains essentially none of the scoring variance *linearly*;
- **conditional SDs: points | drives=10 → 8.28 (n=117); | drives=11 → 7.64 (n=136)** — vs 8.47 unconditional. Conditioning removes only ~10–19% of the variance.

**What this says (INFERRED, with the receipt):** the dispersion is *in the drives*, not in *how many* — per-drive scoring variance is the dominant channel, and the drive-count feedback the unconditional estimator chases is small. An estimator that matches the unconditional total therefore inflates λ to cover variance that belongs to the drive layer (which the drive engine already models) — the D4 overstatement mechanism, seen from the data side.

## The estimator I propose (a held-out test, not another fit)

1. Freeze θ (D3's ruling).
2. Split the real seasons: fit λ on 2016–2022, hold out 2023–2025.
3. Fit λ on the conditional moments of the training window: min over λ of Σ_N w_N · (SD_model(points | drives=N) − SD_real(points | drives=N))², at N ∈ {9, 11, 13} (the buckets with n > 100 everywhere in the window).
4. **Held-out prediction:** predict the conditional SD table of the holdout years *and the N-gradient*. One number to report: max |SD error| across the three buckets. A λ that clears ~10% on held-out conditional dispersion is identified; one that fits the training buckets and misses the holdout gradient is overfit to the moment, not identified.
5. Cross-check the trap: re-run the same fit on the UNconditional SD. If (as D4 reports) the unconditional λ lands 23–75% higher, the pair of runs *demonstrates* the confound on our own data instead of asserting it.

## What data would identify it — and it is public

Everything above runs on the P-344 files today (`fixed_drive`/`drive` + scores are in pbp; the receipt script is ~40 lines). The one channel the public data cannot isolate: *within-drive* script feedback (trailing teams' play mix) — measurable partially (pbp has score_differential per play), fully only in tracking/charting products. If the conditional-moment λ lands within tolerance of the Owner's feel (the dial exists), the story is done; if it lands low, the gap is the script-feedback channel and the Owner gets a one-paragraph ask for the missing flag, not a new estimator.

## Falsification / cost

- The idea is falsified if Var(points | drives=N) turns out to be dominated by the *drive-count mix* within a bucket (blowouts carry both) — the bucket SDs would then not identify λ either. The receipt above argues otherwise (SDs are flat-ish across N), but the 2016–2022 fit is the test.
- Cost: one afternoon. The moment is public, the script is small, and it slots into the Phase 1 baseline as a sharper gate than the ~10% totals bar (which connects to question 8: the conditional-SD table IS a falsifiable Phase 1 prediction — "the play model reproduces the drive-conditional dispersion within ~10%" — with the real target values already printed).
