# For Claude (Architect) — Phase 1 baseline: the data is ready

**SUPERSEDED 2026-11-11 by `claude-phase1-resume-2026-11-11.md` — Claude timed out mid-start; the resume prompt carries the corrected M0 state ("you were right, no fix") and where he left off (BigInt check unpushed, one data file downloaded, baseline not started). Send the resume prompt, not this one.**

**From the Owner, via MUSE (High Councillor). Proposing, not commanding — this is your call on how to proceed.**

## Where you left off

Phase 0 is done (`7b34a58`), and your NOW.md NEXT list is: (1) read the council answer, (2) migrate one consumer (recap or standings) to `foldLog`, (3) Phase 1 baseline, all λ = 0, gated on the ~10% totals bar. This prompt is job (1) + (3). (Note, added 2026-11-11: a Philox-multiplier question was raised against Phase 0 and resolved — no fix needed. The multiplier is the published Philox2x32 constant, verified against the Random123 KATs; the fix prompt drafted from the original finding has been withdrawn. The baseline fits λ on a correct generator.)

## What's new: the council answered (P-344)

The nflverse data you asked for is delivered on `origin/council/muse` (`c7540b04`):
`_agents/muse/deliveries/p-344-nflverse-phase1-2026-11-11/` — `INDEX.md` (the index file your ask specified), `manifest.json` (all 30 raw files with stable release URLs + sha256), `team_game_summary_2016-2025.csv` + the penalty-free version (5,522 team-games each), `league_means_sds.csv` (league mean + SD per metric: overall, regular-only, per season), `verification.json`, and the fetch/analysis scripts.

The totals-bar targets are in `league_means_sds.csv`: points 22.78 ± 10.00, drives 11.09 ± 1.68, plays 81.46 ± 9.61 (offensive plays 62.44 ± 8.47), yards 343.67 ± 84.77, TOP 1815.6 ± 268.9 s. Rules-regime changes are labelled by season in the INDEX (2018 kickoff overhaul, 2021 17-game season, 2024 dynamic kickoff trial, 2025 permanent + touchback to 35 + regular-season OT both possess).

Two caveats from the delivery, so they don't surprise you: (1) participation covers only ~93% of pbp plays in 2023–2025 (about 7% have no participation row; 2016–2022 it is a superset of pbp); (2) snap_counts has no `season_type` column in any season — derive it by joining `game_id` to the play-by-play.

## The job

Run `council.mjs digest` on the P-344 delivery, then start the Phase 1 baseline (all λ = 0) against the ~10% totals bar. If your shell can't download the releases (proxy still UNKNOWN), the summary CSVs in the delivery are what the baseline needs first — say so if you're blocked on the raw files, and use the summaries meanwhile.

Do not re-pin the engine stamp (that is the Owner's call after the 10 Nov flex change), and do not re-litigate the margin-distribution reading — you recorded it as shape-only in the ruling file, and the Owner has not corrected it.

## Innovate

Within the baseline: if the totals suggest a cleaner first cut at the play model than the design doc's — a different first statistic to fit, a drive shape worth checking before the means, a use for the per-season tables nobody has named — try it or note it as an `IDEA:`. The design is yours; the baseline is the first thing it has to survive.
