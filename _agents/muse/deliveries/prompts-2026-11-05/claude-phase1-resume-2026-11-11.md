# For Claude (Architect) — Resume: Phase 1 baseline start (you timed out; the M0 fix was wrong and is withdrawn)

**From the Owner, via MUSE (High Councillor). Proposing, not commanding — this is your call on how to proceed.**

## First: you were right about M0

The Phase 0 fix prompt was WRONG, and you caught it. MUSE's error: I cited the Philox**4x32** multiplier (`0xD2511F53`) as if it were the 2x32 standard. The published Philox**2x32** multiplier IS `0xd256d193` — the one already in `keyedrng.ts`. Your three KATs are the published Random123 vectors. Your check (kernel 17/17 with M0 unchanged) is correct, and the generator is right.

The fix prompt is WITHDRAWN — the file now carries a withdrawal notice; do NOT apply it. MUSE withdrew the finding in the inbox (`inbox/20261111-1740-muse-P-342-m0-withdrawal.md` on council/muse) after Inkling refuted it from the Random123 primary sources. No fix exists and none should land. You do not need to re-verify this.

## Where you left off (your last chat timed out; nothing pushed since `a110ff20`)

- Boot + push access: done. The repo tip is still `a110ff20` — nothing after that reached the repo.
- **BigInt reference check for Philox:** you planned it ("adding an independent BigInt reference check while data downloads") but it is NOT in the repo. Check your workspace — if it is there, finish and push it first. It is small; push it on its own. If the timeout lost it, rewrite it — it is worth having as a second check on the KATs.
- **Data:** `play_by_play_2023.parquet` downloaded and verified (20,534,088 bytes, matches MUSE's manifest). 29 files to go (the full raw set is 30 files, ~225 MB). If the download stalls, the summary CSVs in the P-344 delivery are what the baseline needs first — say so and use them meanwhile.
- Digest + design-doc Phase 1 reading: in progress, not finished. Phase 1 baseline: not started.

## The job (one job: start the Phase 1 baseline)

1. Land the BigInt reference check (from your workspace if it is there, else rewrite it) and push it.
2. Run `council.mjs digest` on the P-344 delivery (`origin/council/muse`, `c7540b04`: `_agents/muse/deliveries/p-344-nflverse-phase1-2026-11-11/`), then start the Phase 1 baseline (all λ = 0) against the ~10% totals bar: points 22.78 ± 10.00, drives 11.09 ± 1.68, plays 81.46 ± 9.61 (offensive plays 62.44 ± 8.47), yards 343.67 ± 84.77, TOP 1815.6 ± 268.9 s.
3. Do not re-pin the engine stamp (that is the Owner's call after the 10 Nov flex change), and do not re-litigate the margin-distribution reading — you recorded it as shape-only in the ruling file, and the Owner has not corrected it.
4. Push after each finished piece.

## Innovate

Within the baseline: if the totals suggest a cleaner first cut at the play model than the design doc's — a different first statistic to fit, a drive shape worth checking before the means, a use for the per-season tables nobody has named — try it or note it as an `IDEA:`. The design is yours; the baseline is the first thing it has to survive.
