# INKLING — lane file (rewrite at the end of every session; never append)

## Identity
- **Seat:** INKLING · **Model / how reached:** Inkling 2 Small Free (opencode/inkling-2-small-free), via OpenChamber · **State:** advisor
- **First seen:** 2026-11-09 · **Admitted by Owner** 2026-11-09
- **Strengths shown (evidence, not claims):** P-008 review — 3 new findings (commit 664efe7e) · P-314 review — 284/284 engine tests VERIFIED + 3 new findings (200df0f6) · P-322 skill-profile design — 97/105 exact vs Owner's final flex table, 0 hard misses (a3366dc5) · P-021 review — mechanical claims VERIFIED, prototype-missing finding (a3366dc5)

## Current work
- **Claimed / in progress:** nothing
- **Done this session (2026-11-10T01:12Z):**
  - **P-021 review filed** — `inbox/20261110-0104-inkling-P-021-review.md`. vl's playoff-preview/bye-week proposal: all line anchors vs Pre-Colors (`40233d6be00e987c`) VERIFIED; prototype `p021-playoff-preview-prototype.html` MISSING on council/vl (HOW TO CHECK unrunnable); CSS adds `color:#fff` twice (no-white-text law); major nit: item is REWORK + retire-proposed on board → old-shell build is mooted if Colors v1 covers it. VERDICT: improved.
  - **P-322 skill-profile design filed** — `inbox/20261110-0104-inkling-P-322-skill-profile-design.md`. Nine priced skills (BLK CTH COV RNG RSH RUN SNP KCK/PNT) + slot-value (D, bumped WILL/C) gated; SAM aliased to OLB (item 7); FB destination free for nine; 5 unlikeness deltas + 6 Owner overrides kept. Final table (728b2c53 + items 3+7) = 105 rules, 23/40/16/26 — counts VERIFIED by my construction; single-seat, ARCHITECT-not-yet-built (P-323 is the real gate). Model: **97/105 exact, 8 one-tier (all owner-0-model-2), 0 hard misses**; D-only baseline 38/90. Options A (recommended) / B (equivalent, skip) / C (model-as-linter). FLEX protected — any build re-pins.
- **Blocked / waiting on:** Architect decision on P-322 (A/B/C); Owner answers (a) MIKE>WILL model-2 vs 0 (±1, single U row), (b) FS>SS symmetry tax, (c) whether the no-white-text law applies here; Architect/Owner on OLB>EDGE (needs ≥9 post-bump D — UNKNOWN, Owner forbade recomputing D); retire calls pending on P-020/P-021 (MUSE proposed, needs 2 seats or Architect).

## What the next session needs
- **Read first:** this file; `bulletin/20261110-0112-inkling.md`; `inbox/20261110-0104-inkling-P-322-skill-profile-design.md` (the design); the Architect's `digest` for P-322/P-323 rulings.
- **Do not redo:** the P-322 final-table construction and the 97/105 measurement (in the design file — reproduce with the commands shown, not from memory); the P-021 anchor greps (in the review file); P-314 verification incl. engine tests; the council.mjs /tmp workaround history.
- **Watch:** P-323 (items 3+7 build) — if it lands, verify counts (105; 23/40/16/26), flex.json == flex.ts, 3-4 base total, test suite; re-measure the model against the actual FLEX bytes if the build moves any override row. Re-fit only AFTER P-321's ±5 measurement lands.
- **Open questions for the Architect (in the P-322 file, §5):** MIKE>WILL = 0 if Owner adds one U-negative row? OLB>EDGE post-bump D ≥9? Option A vs C?

## Files in this lane
(none — this file only; work is in `inbox/`)

## Role
general advisor. Admitted by the Owner on 2026-11-09. Advisor level: propose, test, dissent, measure. Core status is the Owner's call after 3 verified items.

- **worktree:** `/Users/kosi/Desktop/wt/inkling` (read-only reference: `/Users/kosi/Desktop/wt/inkling` must stay on `council/inkling`, branch `council/inkling`)
- **branch:** `council/inkling` · tip `a3366dc5` at rewrite · `git merge-base HEAD origin/council/base` = `1b91f50e161fa10d0607c8e09330115ffa27f1ff`
