# GLYPH — council seat

**Path:** /Users/kosi/Desktop/wt/glyph  
**Branch:** council/glyph  
**Merge-base with origin/council/base:** 1b91f50e161fa10d0607c8e09330115ffa27f1ff

## Identity
Council seat (glyph). Advises/reviews/measures; no product-file, governance, queue, or protected-constant edits.

## Current work and state
- 2026-11-10T06:12Z: Completed P-322 derivation E5 hybrid independent verification (task A from `council-prompt-2026-11-10-derivation-E5.md`).
  - Script: `_agents/glyph/deliveries/derive-e5-verify-2026-11-10.py`; note: `inbox/20261110-0612-glyph-P-322-derivation-E5-verify.md`.
  - **VERIFIED** vs `97d7e9d` 99-rule flex (23/43/10/23), D@90 thetaprice, MUSE-prototype BLK behavior, prompt-defined offense/defense/KP and DB/LB/DL groups:
    - Baseline floor cuts(1,4,9): 93/6/0 (CB>FS,CB>SS,EDGE>OLB,ILB>OLB,SS>DIME,SS>NICKEL 0→2).
    - E3 (floor + cuts 1.5,4,9, no same-group): 96/3/0, broke 0.
    - **E5** (floor + cuts 1.5,4,9 + same-group A halved DB/LB/DL): **97/2/0**, residuals `EDGE>OLB owner=0 model=2`, `FS>SS owner=2 model=0`; broke 1 (FS>SS), fixed 5.
    - **E5 + EDGE>OLB override=0**: **98/1/0**, residual `FS>SS`; broke 1, fixed 6.
  - Recommendation (INFERRED): treat EDGE>OLB as explicit override (like EDGE>RB/ILB) rather than new rush-equivalence term for now.
- 2026-11-10T05:58Z: Prior P-322 base/floor verify — `inbox/20261110-0558-glyph-P-322-derivation-verify.md` (B/MUSE BLK 88/11/0; spec-literal BLK 87/12/0).

## What the next session needs
1. Read this lane file, `git fetch -q origin`, take next P-322/review item from `origin/council/muse` queue or assigned prompt (B FS>SS group-refine, C flexderive.mjs run, D 15-skill, E P-287 slice5 review, F P-328 review, G own design).
2. Use pinned refs `97d7e9d` for flex/thetaprice unless task states otherwise; state BLK interpretation/grouping explicitly; no flex/product/engine edits.
3. Prior files: `inbox/20261110-0558-glyph-P-322-derivation-verify.md`, `inbox/20261110-0612-glyph-P-322-derivation-E5-verify.md`, `_agents/glyph/deliveries/derive-e5-verify-2026-11-10.py`.

## Open questions
- Canonical BLK elite-line rule for derivation claims (dst==C spec-literal vs any-dst when both BLK>=8). OG>OT affected on some baselines.
- E5 vs E3 tradeoff: E5 higher fit but breaks FS>SS; E5+EDGE>OLB override reaches 98/99 with FS>SS still open.

## Live files
- `inbox/20261110-0558-glyph-P-322-derivation-verify.md`
- `inbox/20261110-0612-glyph-P-322-derivation-E5-verify.md`
- `_agents/glyph/deliveries/derive-e5-verify-2026-11-10.py`

## Worktree / branch
- Path: `/Users/kosi/Desktop/wt/glyph`
- Branch: `council/glyph`
- `git merge-base HEAD origin/council/base`: `1b91f50e161fa10d0607c8e09330115ffa27f1ff`
