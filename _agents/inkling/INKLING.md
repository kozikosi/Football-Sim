# INKLING — lane file (rewrite at the end of every session; never append)

## Identity
- **Seat:** INKLING · **Model / how reached:** Inkling 2 Small Free (opencode/inkling-2-small-free), via OpenChamber · **State:** advisor
- **First seen / admitted:** 2026-11-09 (Owner)
- **Strengths shown (evidence, not claims; most recent first):** P-340 LOO review + lambda-objective note + OLB/C weight-source report (2026-11-11T03:57–04:02Z; LOO re-run byte-identical; weight source: OLB 200-vs-150 = exactly 2 rows (OLB>ILB, OLB>SS), C = 0 rows; all five merged residuals guard-caused) · P-342 review (improved; toy kernel re-run matches exactly; Owner's ~10% bar + joint-fit lambda corrections) · P-326 localWins20 recheck (pushed 2a20ea80) · P-322 skill-profile design (97/105, REPORTED).

## Current work
- **Claimed / in progress:** nothing.
- **Done this session (2026-11-11T03:57–04:02Z, follow-up prompt `council-prompt-2026-11-11-followup-loo.md`):** the LOO + weight-source work on P-340:
  - `inbox/20261111-0357-inkling-P-340-loo-review.md` — VERDICT **improved**, FOUND 6 / NEW 2. MUSE's LOO re-run byte-identical (194 held-out cases; ZAI-D1 1.13 OVR / 170/194; merged 1.44 / 172/194; fitted λ ≈ 0.19–0.20). Oracle verified (flex.json @ `97d7e9d`: 99 rules, tiers {0:23,2:10,6:43,12:23}; NICKEL/DIME appear only as destinations — script KeyErrors loudly if a future table sources them). Within-one-tier (new): ZAI-D1 97/97 at every λ in [0,0.40]; merged 96/97 (its one ≥2-tier miss is FB>RB). All five in-sample merged residuals are guard-caused, not ability.
  - `inbox/20261111-0358-inkling-P-340-lambda-objective.md` — the Owner-facing lambda question: mean error (λ≈0.20) vs exact tiers (λ=0.40) vs within-one-tier (cannot discriminate λ; discriminates form — ability 97/97 vs merged 96/97). Recommend mean error, 0.40 recorded as the exact-tier alternative; either way λ must not be inherited unexamined.
  - `inbox/20261111-0358-inkling-P-340-weight-source.md` — the OLB/C 200-vs-150 finding: sport-football.json's 200s are the decided-but-unlanded P-318 bump; slots.ts (live) and localWins20 are the 150-scale. OLB 200 recovers exactly OLB>ILB and OLB>SS (2 rows; 20/23 → 22/23 on the touched rules). **C 200 vs 150 = 0 rows** (C>OG residual under every source — ability 5.13→tier 6 exact, guard drags all three cases over the 9-cut). Correction of record: the prompt's "C>OG guard is 9.0 under the JSON" does not reproduce — 10.0 from the files (same tier, 12).
  - committed+pushed as `15a112af` (council/inkling).
  - Still owed by me / already mine: P-342 (done 266fc69c), P-341 (c12df62e), P-326 (2a20ea80). Do NOT redo these; the follow-up prompt lists D/E/F as open — they are not.
- **Blocked / waiting on:** Owner's three P-340 rulings (objective; FB family outside guard; weight base + OLB scope WILL) — see the two 0358 files' defaults. The Ledger Phase 1 (Z.ai) has not landed; nflverse data go (Owner).

## What the next session needs
- **Read first:** this file; `bulletin/20261111-0359-inkling.md`; the three P-340 inbox files (0357 review → within-one-tier; 0358-1 → the Owner's decision frame; 0358-2 → the full guard impact table).
- **Do not redo:** the LOO re-run; the within-one-tier sweep; the 23-rule guard impact computation; the oracle flex.json verification.
- **Watch:** the Owner's P-340 rulings; Z.ai's Ledger Phase 1 landing (then verify: PERS/DL5_SHARE/DIME_W, FB share, conservation test); P-339 (flexcensus re-run — still open, option H); Claude's Phase 0/1 build (timed out twice); any third-seat P-342 or P-340 review.
- **Prior session's facts (still valid):** P-342 review filed (266fc69c); engine pin 4ca9a071; P-322 97/105 REPORTED; merge-base `1b91f50e`.

## Files in this lane
- `deliveries/p326/localwins20-recheck.ts` · `deliveries/p333/formation-balance.mts` — runnable recheck scripts.

## Role
general advisor. Advisor level: propose, test, dissent, measure. Core status is the Owner's call after 3 verified items.

- **worktree:** `/Users/kosi/Desktop/wt/inkling` (must stay on `council/inkling`)
- **branch:** `council/inkling` · tip `15a112af` at this rewrite · `git merge-base HEAD origin/council/base` = `1b91f50e`
