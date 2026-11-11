# INKLING — lane file (rewrite at the end of every session; never append)

## Identity
- **Seat:** INKLING · **Model / how reached:** Inkling 2 Small Free (opencode/inkling-2-small-free), via OpenChamber · **State:** advisor
- **First seen / admitted:** 2026-11-09 (Owner)
- **Strengths shown (evidence, not claims; most recent first):** P-342 review of Claude's engine design + toy kernel (2026-11-11T03:46Z; toy re-run matches exactly — 0.3722 / 0.16358 / z=0.62 / 3.0× / 3.8×; two corrections filed: §8 totals bar vs Owner's approved ~10%, lambda identification needs joint fit on team-level channel rates, not OVR-only/diagonal) · P-341 play-level answer + Z.ai re-verification (2026-11-11T00:18Z) · P-326 localWins20 recheck (pushed 2a20ea80; w88 table reproduces 32/32, ±10 trap confirmed, TE2/WR2 spread fragility) · P-322 skill-profile design (97/105, REPORTED).

## Current work
- **Claimed / in progress:** nothing.
- **Done this session (2026-11-11T03:46Z):** the new-direction council prompt (`council-prompt-2026-11-11-new-direction.md`, option A):
  - `inbox/20261111-0346-inkling-P-342-claude-design-review.md` — VERDICT **improved** (second seat; MUSE reviewed ok). Re-ran the toy kernel (matches exactly); verified engine-shape claims at `a0ddc584` (drives realise:88 / decompose:100, margin.ts quantile coupling, matchup.ts:29 softCap, rng.ts fork/forkSeed:8,38,42). **Two corrections (NEW vs MUSE):** (1) design §8/§13 still gates Phase 1 on 1%/3%/2% — the Owner's 11 Nov answer is ~10% + margin-GoF (target already in-repo: `_agents/data/nflverse-margins-ot-2020-2024.json`); (2) §12 "lambda from OVR-only data" is mis-scoped — lambda is identified from team-level channel outcome rates (nflverse, unattached, access untested) and must be a joint covariance-level/MLE fit validated on held-out seasons, not per-channel diagonal dispersion matching. Plus: Phase 0 gate lives in the Lab (product has no seeded RNG — P-031 open), the adapter is post-hoc emulation (parity = same box scores on seeded runs, not causal events), and an IDEA: pre-nflverse smoke tests from in-repo standings PF/PA (recomputed: n=160, PF mean 383.5, sd 71.1).
  - commit `266fc69c`, pushed to council/inkling (ls-remote verified: d58c6b8a..266fc69c).
  - Queue note for the next seat: MUSE's P-326 "formal recheck filing still owed" is already DONE by me — `inbox/20261110-0257-inkling-P-326-localwins20-recheck.md` (pushed 2a20ea80). Not mine to re-do (own work); MUSE/Architect can cross-check it. P-341 option B (Z.ai PLAYLED review) also already mine (`c12df62e`).
- **Blocked / waiting on:** `node tools/council.mjs next` is effectively unusable on this checkout (its built-in `git fetch --depth=1` for all council/* + architect/* refs starved for >10 min under contention; I killed my own background run and read the queue + prompt directly instead). P-342 review chain now needs a third seat (or more) to reach REVIEWED. Claude's Phase 0/1 build; the nflverse data go (Owner).

## What the next session needs
- **Read first:** this file; `bulletin/20261111-0348-inkling.md`; `inbox/20261111-0346-inkling-P-342-claude-design-review.md`.
- **Do not redo:** the toy-kernel run; the engine-shape greps (drives/margin/matchup/rng); the dispersion probe on the Madden 27 pool (QB 4.09 / OL 1.62 / ALL 1.01 sd across team means); the standings PF/PA recomputation (383.5 / 71.1).
- **Watch:** whether Claude folds the two corrections (Owner's ~10% bar; joint-fit lambda) into the Phase 0/1 spec; the nflverse owner-go; any third-seat P-342 review (needs two different seats' ok/improved for REVIEWED; MUSE ok + mine improved).
- **Prior session's facts (still valid):** engine pin 4ca9a071; P-322 97/105 REPORTED; P-296 NOT moved; P-333 matrix committed; seats do not share one forest root (cutover must re-create branches).

## Files in this lane
- `deliveries/p326/localwins20-recheck.ts` · `deliveries/p333/formation-balance.mts` — runnable recheck scripts (usage headers inside).

## Role
general advisor. Advisor level: propose, test, dissent, measure. Core status is the Owner's call after 3 verified items.

- **worktree:** `/Users/kosi/Desktop/wt/inkling` (must stay on `council/inkling`)
- **branch:** `council/inkling` · tip `266fc69c` at this rewrite · `git merge-base HEAD origin/council/base` = `1b91f50e`
