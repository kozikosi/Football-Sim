# super — council seat lane file
Identity: seat `super` (standby), worktree `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-super`, branch `council/super`, merge-base with origin/council/base = 1b91f50e. HEAD = 5dadf402 (pushed, ls-remote verified equal).

## Current work and state (this session, 2026-11-11/12)
- P-344 (P1) nflverse Phase 1 baseline data review: VERDICT ok. Independently recomputed all 11 totals-bar means/SDs and all margin-gate numbers from team_game_summary_2016-2025.csv — every number matches MUSE's delivery exactly. Confirmed field coverage (pbp 0/40 missing, participation 0/12 missing, snap_counts missing season_type in all 10 seasons), participation drop 2023-2025 (7.0-7.4%), rules-regime labels by season. Filed: inbox/20261111-1751-super-P-344-review.md, commit 8cb58932, pushed. (P-344 already REVIEWED by 3 seats; this was an additional review, welcome per inbox/README.md.)
- P-345 (P2) Phase 1 protocol convergence: filed ONE converged protocol note combining MUSE's two-gap Lab estimator, Z.ai's conditional-moments validation target, MUSE's margin-gate shape check, DS D4 dispersion-matching bias, and the open λ-objective question (0.40 tiers vs 0.20 mean error, council recommends 0.20 as a recommendation not a decision). Independently verified conditional-variance table from P-344 data. CORRECTED M0 reference: MUSE's Philox "defect" was WITHDRAWN (M0 = 0xd256d193 IS the correct Philox2x32 multiplier; 0xD2511F53 is Philox4x32 — confirmed against Random123 philox.h + kat_vectors, and by independent Python re-implementation). Filed: inbox/20261111-1815-super-P-345-phase1-protocol-convergence.md, commit e89314e0, pushed; M0 correction commit 5dadf402, pushed.
- P-342 (P2) design-amendment pass: filed consolidated amendment pass listing GLM F1-F6, DS D1-D10, Glyph G1-G4, Inkling I1-I2, each with accept/reject + what it changes in design a0ddc584 or Phase 0 kernel 7b34a581, plus recommended order of application. Filed: inbox/20261111-1845-super-P-342-design-amendments.md, commit 202d882b, pushed.
- P-346 (P1) Z.ai Phase 2 v3 delivery review: VERDICT improved (review 2 of 3). Independently verified Part A Fix 4 checksums (all 3 stale entries now exact vs shipped bytes), Part B1 (2020 FB corrected to 0.0887, two named effects), Part B2 (n=544 with script shipped, bucket ns 117/136 match MUSE, 572 superseded, TD-only points definition identified), Part B3 (gravity 10/10 exact vs b2_gravity_index.json, denominator = ALL deep targets), Part C1 (FB 0.1426→0.0814 exact, DIME mean 0.1263 exact), C2 (Lab and D4 replicated bit-exactly, persistence floor 6.7% ≤ 10% bar), C3 (10/10 gravity exact, staged air_yards gap named honestly), C4 (pooled 0.1263, per-season matches C1 exactly). Filed: inbox/20261112-0349-super-P-346-review.md, commit 6a300283, pushed.
- Phase 0 kernel (P-342): Independently re-ran kernel tests — 17/17 pass (philox2x32-10 matches all 3 Random123 KATs, draw purity, replay, counterfactual coupling, uniformity, serial independence, normal(), folds, pack hash). Verified M0 = 0xd256d193 is correct Philox2x32 (MUSE's defect finding WITHDRAWN). Full suite failures (versions.test.ts E5 pin, lineup.test.ts DL5 staleness) pre-date Phase 0 — confirmed on parent a0ddc584.

## What the next session needs
- P-345: Inkling filed a converged protocol note (inbox/20261111-1742-inkling-P-345-phase1-protocol-converged.md) and MUSE filed a supplement (inbox/20261111-1752-muse-P-345-protocol-supplement-super.md) adding Super's play-level-moments route. My protocol note (inbox/20261111-1815) is additional — may need consolidation with Inkling's.
- P-346: Needs 1 more seat's review for REVIEWED (I'm review 2; MUSE improved was review 1).
- P-290: Already reviewed by me (second review, improved) — needs 1 more independent seat.
- P-325/P-326 (WR3 fidelity + localWins20 recheck): open P1 items blocking w88 table. PreColors slotWins extraction blocked by DOM dependencies — need alternative approach.

## Open questions
- None blocking.

## Live files
- inbox/20261111-1751-super-P-344-review.md (P-344 review, commit 8cb58932)
- inbox/20261111-1815-super-P-345-phase1-protocol-convergence.md (P-345 protocol note, commit e89314e0)
- inbox/20261111-1845-super-P-342-design-amendments.md (P-342 amendments, commit 202d882b)
- inbox/20261112-0349-super-P-346-review.md (P-346 review, commit 6a300283)
- Prior (unchanged from 11-10 session): P-322 derivation v5 files, P-142/P-143 reviews, flex-derivation-z2 package, cutover checklist

## Worktree / branch / merge-base
- worktree: /Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-super
- branch: council/super
- HEAD: 5dadf402 (pushed, ls-remote verified equal)
- merge-base with origin/council/base: 1b91f50e
