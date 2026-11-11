# INTAKE — LEDGER PHASE 1 · 2026-11-11

Owner relay (chat): clone Football-Sim shallow, read `_agents/zai/START-OF-CHAT-ZAI.md` from `origin/council/zai` (fallback `origin/main:z-core/…`), follow it exactly; then `git show origin/council/muse:_agents/muse/deliveries/prompts-2026-11-05/zai-ledger-phase1-2026-11-11.md`.

Source directive: **MUSE, `zai-ledger-phase1-2026-11-11.md`** (a proposal, not a build order — seat decides how, Owner decides what ships). Every line mapped:

| # | Directive line | Action taken | Where |
|---|---|---|---|
| 1 | "Build the Play Ledger, Phase 1: the snap ledger, powered by your PLAYLED prototype as the staging engine" | Built the staging engine as `stage_plays.py` — PLAYLED's play shapes/personnel/attribution machinery re-anchored to stage plays INSIDE engine drives (bottom-up sim mode retired this phase) | deliveries/ledger-phase1-2026-11-11/ |
| 2 | "The drive engine stays authoritative … staged plays sum to the drive's realised totals (run, pass, plays, sacks, points)" | Conservation law implemented exactly; purity receipt R1 proves max \|Δ\| = 0 over every game/drive/channel. Engine `GameResult`s produced by running the REAL Architect engine (read-only) via `run_engine.ts` | run_engine.ts, ledger.py, report R1 |
| 3 | "Deliverable: working snap ledger — per-spot snap shares (FB, TE2, TE3, WR4, CB3, DIME, DL5, every other spot), per-personnel-package participation, gravity event counts (double teams per player per game)" | `ledger.py` folds the staged play log into all 32 spot shares + package participation + gravity counts | ledger.json, ledger.py |
| 4 | "First check: compare the ledger's snap shares against the engine's own constants (PERS, DL5_SHARE, DIME_W) and the slot weights; report agreement/disagreement and by how much" | `measure_ledger.py` receipts R2 (DL5_SHARE, DIME_W, PERS), R3 (slot weights incl. FB socialism, Spearman rank). Constants read from the LIVE architect table (`architect/engine-and-seats`: slots.ts FB 25, specs.ts PERS/DIME_W, slots.ts DL5_SHARE 0.33) | measure_ledger.py, report R2/R3 |
| 5 | "Do NOT edit the engine. Read-only on colors/src, flex.json, flex.ts" | Engine consumed via a git worktree of `origin/architect/engine-and-seats` at `arch-wt/` — zero engine files touched (receipt: `git status` clean in that worktree) | README how-to |
| 6 | Owner rulings bound: FB = scarcity (FB>RB 2, FB>TE 6 stay; guard 18 NOT used; Juszczyk-to-TE accepted); C>OG nonissue 6 fine; totals bar ~10%; basketball deferred; no historical Madden ratings | Bounded the staging rules: FB is a scarcity spot (low snap share, heavy-package presence), no flex-table edits, no ratings invented; ledger reports FB share vs weight 25 | report §R3 |
| 7 | "Snap shares per spot versus the engine's own constants … by how much" | R2/R3 tables give deltas in percentage points and ratios | report |
| 8 | "The FB share specifically (the socialism measurement) … does it match the engine's weight (FB 25)?" | R3: FB snap share vs FB weight share vs value-per-snap (weight ÷ share); muse's "FB 25" confirmed live (council/muse copy 30 is stale) | report R3 |
| 9 | "Gravity event counts … are they plausible? The rates are INFERRED placeholders; report them as such" | R4: counts per game (DT1, DE1, WR1) + doubled-share framing; every rate labelled INFERRED placeholder pending Phase 2 data | report R4 |
| 10 | "The conservation check: do the staged plays sum to the drive totals (run/pass/plays/sacks/points)? Report the purity test" | R1 purity: per-game, per-team, per-channel deltas — all exactly 0; table printed | report R1 |
| 11 | "A short note on what Phase 2 (validation against nflverse snap counts) would need … Do not fetch the data yourself" | Phase 2 data-request spec written (datasets, columns, mapping, tolerance proposal, costs); no data fetched | report §Phase 2 |
| 12 | "Innovate … note it as an `IDEA:`" | Five IDEA items in the report (value-per-snap, ledger-as-acceptance-test, self-anchoring rotation rule, doubled-share stat, purity-as-CI-gate) | report §IDEA |
| 13 | "Batch rule: complete ALL work before responding … single zip … CHECKSUMS.txt with the algorithm LABELLED (sha256)" | This chat ships one zip; CHECKSUMS.txt is sha256-labelled and roundtrip-verified | zip + CHECKSUMS.txt |

Interpretations flagged (Owner may veto):
- **I-1:** "per player" keyed by SPOT (flat rosters carry no names; in production the spot reads the lineup's player). Phase 3 names players.
- **I-2:** The engine's team `pass` total is gross of sack yardage (drives.ts never subtracts sacks from `pass`); the ledger follows the engine's convention — sack gains are staged for story but excluded from the pass-sum conservation.
- **I-3:** Non-TD drive start field position assumed own 25 (INFERRED); TD drive start is exact (100 − yards).
- **I-4:** FB placement: second back in 21/22 personnel (FB 0.60 / RB2 0.40) — the prototype fielded FB in no package (a PLAYLED gap this phase fixes); ratio INFERRED.
- **I-5:** DL5 rotation rule anchored to the engine's own MEASURED DL5_SHARE 0.33 (parameters INFERRED, anchor MEASURED) — the ledger then verifies the fold reproduces the anchor.
