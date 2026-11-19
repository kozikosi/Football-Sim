# ORCAINK — lane file (rewrite every session, never append)

## Identity
- **Seat:** ORCAINK · **Model / how reached:** ORCAINK / OpenCode (Orca harness) · **State:** advisor
- **ID block:** (none yet — files as orcaink) · **First seen:** 2026-11-18
- **Strengths shown so far (evidence, not claims):** re-running verification grids at delivered bytes (cakepanz-8.1, P-143); first independent review of VL's P-144 deliverable (caught wrong candidate order, invented depth slots, swapped OG/C penalties).

## Current work
- **Done 2026-11-18/19 (this session, first Orca session):** confirmed the orcaink worktree GOOD per BOOT.md (pwd/branch/common-dir/ls-remote); committed + pushed the staged governance refresh (`2244a857`, files byte-identical to `origin/council/muse`); followed START-OF-CHAT; P-143 review — verdict `improved` (`inbox/20261119-0144-orcaink-P-143-review.md`, `a1132a9b`): all removals anchored to Pre-Colors sha `40233d6be00e987c`; brief's first-named items missing from Beam's spec (four `<li>` paragraphs at 5032–5035 present; single `Who decides?` at 4980, outside renderGuideHTML, adviseLineup text — do not delete); glossary Priority mis-paraphrase vs in-product 4992; `~10% of snaps` invented; Nickel entry needs D-012's 3-4 half; HOW-TO-CHECK pattern tested (returns 5032–5035/5040–5041/5045/5053 pre-apply). P-144 review — verdict `rejected` (`inbox/20261119-0225-orcaink-P-144-review.md`, `da1b4120`): VL's three designs (blobs `65dce50a/e2ba4752/1bb62bd9`) exist, ≤15 KB, self-contained, FB+P present, Design A tree kept — but all three share one `positions` array that is not the P-293 monotone order (QB…SAM, ties in brief order), omits WR3(150) and SAM(50), invents DT3/TE3/FB/P with fabricated values (P-293: depth slots not to be invented), swaps OG>C(6/2), C>OG(2/6) vs pinned `d3bd81d2` flex.json, shows `OT→OG 6` vs pinned 2, `DE2→DT 6` vs EDGE>DT 2 **and** the target id `dt` never resolves so the arrow silently never draws in Designs A/B, `WILL→SS 2` matches neither candidate (4) nor live (6) (TE→C 6 is actually correct — credited), Designs A/B overflow 390 px (fixed 900/620 px, no viewBox/media), zero `prefers-reduced-motion`. Resubmission path named exactly (monotone array pasted; chips pinned vs explicitly-labelled candidate; viewBox fix; reduced-motion block).
- **P-158 not filed:** the item sits at its 8-review cap already (vl, uk ×2, boc, glyph, ernie, inkling, or — `or` filed 2026-11-19T01:05Z). A 9th review is against the tool's cap; left alone for the Architect's sweep. P-158's open sub-call remains the threshold (boc/inkling: Architect/Owner must pick between ernie/or 0.10-costly-floor vs beam 0.45-rare-costly).
- **Blocked / waiting on:** Owner — gh-pages two-file fix placement; prepared re-pin (65673a00) activation; hy4's league-size calibration flag (do not re-tune the 10th-pick flip); Block C (R-13) sequencing; F1 reconciliation for cakepanz-8.1; VL's P-144 resubmission (then Owner picks a design); P-158 threshold ruling; Architect to integrate or reject the four P-158 label fixes (99-rule flex is untouched by all of this).

## What the next session needs
- **Read first:** this file; then `inbox/20261119-0144-orcaink-P-143-review.md` + `inbox/20261119-0225-orcaink-P-144-review.md` (receipts inside); VL's resubmission or the Architect's F-1 note before touching P-144 again.
- **Open questions:** (1) P-158 threshold — Owner-suggestion 0.10 costly-floor vs 0.45 rare-costly; three bars (label 0.45 / prose 0.2 / lowEarly 0.35, ernie+or) must move together. (2) P-144 Owner pick — none of the three designs should be picked until the `positions` array is replaced per the review. (3) P-143 — does "duplicate Who decides" mean anything in today's bytes (only 4980, outside the Guide)? (4) Block C (R-13) sequencing.
- **Do not redo:** P-143 verification grid (run this session, receipts attached); the P-144 data audit (blobs/chips/grep outputs in the review file); the cakepanz-8.1 verification grid.

## Files in this lane
- `67-cakepanz-8.1-2026-11-18/` — the delivered package as-is (Owner-directed landing 2026-11-18).
- `ORCAINK.md` — this file. `BOOT.md` — the opening check (still valid).

## Role
general advisor. Admitted 2026-11-18. Advisor level: propose, test, dissent, measure.

## Worktree / branch
- Path: `/Users/kosi/Desktop/wt/orcaink` · Branch `council/orcaink` · merge-base vs origin/council/base: `864a6aa1`.
