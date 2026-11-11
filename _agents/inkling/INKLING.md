# INKLING — lane file (rewrite at the end of every session; never append)

## Identity
- **Seat:** INKLING · **Model / how reached:** Inkling 2 Small Free (opencode/inkling-2-small-free), via OpenChamber · **State:** advisor
- **First seen / admitted:** 2026-11-09 (Owner)
- **Strengths shown (most recent first):** P-345 innovation round — two prototypes + one discussion note, all with receipts (dual positions on real Madden 27 data, 0/96 monotonicity violations; gravity fold instrument proof; R = Wins20/Wins10 measured on Pre-Colors: offense convex 2.388, defense ~1.974, K exactly 2.0000) (2026-11-11T15:47–15:56Z) · P-340 LOO review + lambda-objective + weight-source report (2026-11-11T03:57–04:02Z; LOO re-run byte-identical; OLB 200 = exactly OLB>ILB/OLB>SS; C 200 = 0 rows) · P-342 design review (improved; toy kernel re-run exact) · P-341 play-level answer · P-322 skill-profile design (97/105, REPORTED).

## Current work
- **Claimed / in progress:** nothing.
- **Done this session (2026-11-11T15:46–15:56Z, innovation round P-345, prompt `council-prompt-2026-11-11-innovation-round-p345.md`):**
  - `inbox/20261111-1547-inkling-P-345-dual-roles.md` — **Q5 dual positions**: one player, `roles: [A,B]`; only `fit()` changes (0 at either home position, min of parent prices elsewhere, QB rule propagates, DL5 min(DT,EDGE) survives). Prototype `deliveries/p345-dual-roles.mjs` on the real 1,941-player ratings file with the **live 99-rule flex oracle** (`origin/council/muse:tools/mathlab/flex.json` @ a32f28f1, mirror @ 4c235316; pinned copy `deliveries/p345-flex99-oracle.json`, sha256 `0a26d7c2…`; the retired 107-rule REV 4 in this worktree was NOT used). Results: Hunter-analog CB+WR re-slots 5/32 teams (3 start him at WR), OG+OT 25/32 (22 at OT, OT weights 430/400 dominate), TE+WR 8/32 (5 at WR); 0 monotonicity violations in 96 sweeps. Names the breakages: draft board must be one row (`roles[]`, never `name|pos|team` id change), `counted as` placement label, census must be re-run with duals admitted, draft-board value of second position = named UNKNOWN.
  - `inbox/20261111-1547-inkling-P-345-gravity-fold.md` — **Q4 gravity as a fold**: per-play coverage/block assignment vectors (already sampled by the play model — emitting them is free) + a `GravityFold`; no extra price term (rejects any "gravity bonus"). Prototype `deliveries/p345-gravity-fold.mjs`: fold recovers an injected WR1 OVR gap strictly monotonically (doubles/snap 0.271 → 0.311/0.357/0.401 at gaps +10/+20/+30) and an injected rusher OVR (doublesFaced 0.306/0.503/0.701 at 85/90/95); flat control; ~15 KB/game log overhead. Data ask named: charting data (PFF licensed or Owner sample) — none of the public sources carry assignments; otherwise gravity ships INFERRED in Phase 1, never VERIFIED.
  - `inbox/20261111-1552-inkling-P-345-r-ratio-discussion.md` — **discussion note on Q1 (extends MUSE's two-gap test)**: measured R = Wins20/Wins10 on **Pre-Colors** (sha256 40233d6be00e987c — matches BASELINES; read-only; `deliveries/p345-r-ratio.cjs`, page errors 0): n=25 slots, mean R **2.173**, SD 0.415 — **offense convex (mean 2.388), defense+K mildly concave (1.974), K exactly 2.0000, TE2 singular** (the 700/floor-5 quantisation zeroes its 70→80 slope). Meaning: the "linear wins" story has never held in the engine the Owner has; MUSE's R-test must be run in the NEW model before λ is fitted — it is not optional. Says nothing about the new model; do not cite as a Phase-1 result.
  - Commits: `588a8191` (two filings + prototypes), `3488c8e0` (typo), `29514591` (R-ratio note + script). Pushed `council/inkling` @ `29514591`.
- **Blocked / waiting on:** Owner rulings on P-340 (objective; FB family outside guard; weight base + OLB scope WILL) and P-336 (dual free vs cap) — defaults in the 0358 files. Phase 1 (Claude) and the Ledger (Z.ai) proceed regardless; nothing here gates them.

## What the next session needs
- **Read first:** this file; `bulletin/20261111-1557-inkling.md` (or closest); the three P-345 inbox files above (dual-roles → the representation answer; gravity-fold → the schema ask; r-ratio-discussion → the R measurement).
- **Do not redo:** the dual-role sweep runs; the gravity synthetic; the R-ratio table (Pre-Colors is pinned by hash — it will not change).
- **Watch:** the Owner's P-336/P-335 rulings (duals; gravity display); Claude's Phase 1 build + the Philox multiplier fix (use `0xD2511F53`, not `0xD256D193`); MUSE's R-test being run in the new model (expect stratified results, not uniform 2.0); any seat filing on P-345 questions Q3/Q5/Q6/Q7/Q9 (unclaimed as of this session).
- **Prior session's facts (still valid):** P-340 oracle = flex.json @ `97d7e9d` 99 rules; OLB 200-vs-150 = exactly 2 rows; C 200-vs-150 = 0 rows; merge-base `1b91f50e`; P-342/P-341/P-326 done (266fc69c / c12df62e / 2a20ea80) — do NOT redo.

## Files in this lane
- `deliveries/p326/localwins20-recheck.ts` · `deliveries/p333/formation-balance.mts`
- `deliveries/p345-flex99-oracle.json` (pinned 99-rule mirror, sha256 0a26d7c2…, source a32f28f1) · `deliveries/p345-dual-roles.mjs` · `deliveries/p345-gravity-fold.mjs` · `deliveries/p345-r-ratio.cjs`

## Role
general advisor. Advisor level: propose, test, dissent, measure. Core status is the Owner's call after 3 verified items.

- **worktree:** `/Users/kosi/Desktop/wt/inkling` (must stay on `council/inkling`)
- **branch:** `council/inkling` · tip `29514591` at this rewrite · `git merge-base HEAD origin/council/base` = `1b91f50e`
