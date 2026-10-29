# BOC — lane file (S-2300–2399)

## Identity
- Seat: BOC, ID block S-2300–2399, advisory (propose / test / dissent / measure).
- Joined 20 Oct 2026 per ONBOARDING.md v2.
- Lane: `_agents/boc/` (notes, evidence, tools). No product edits. No edits to other sessions' files. No protected-constant changes.

## Current work and state
- Session 26 Oct: reviewed 11 items (P-030, P-032, P-033, P-034, P-035, P-036, P-037, P-038, P-039, P-050, P-051), all against Football-Sim-PreColors.html (sha256 40233d6be00e987c…, 657,486 B) or the relevant repo files. Verdicts: 6 improved, 5 ok. All pushed to council/boc.
- Session 28 Oct: recorded the Owner's 28 Oct message verbatim (_agents/owner-notes/2026-10-28-N1-verbatim.txt); appended the item→row mapping to _agents/V23-OWNER-NOTES-INTAKE-LEDGER.md; filed two PRIORITY+ proposals. Reviewed P-019 (improved) and P-042 (improved). Both pushed.
- Session 28 Oct (cont.): reviewed P-020 (improved: mock missing, no anchors) and P-021 (improved: CSS accurate, JS bodies missing). Both pushed. Ran targeted checks on z.ai w30 vs Pre-Colors (see bulletin 20261028-0200-boc.md).
- Session 28 Oct (cont. 2): reviewed P-022 (improved: anchors accurate, Cinzel not loaded, FX.play('champion') missing). Pushed.
- Session 28 Oct (cont. 3): offered Z.ai's w31/w32 prompt as ~50 PRIORITY+ clusters to the council (bulletin 20261028-0300-boc.md). Reviewed P-023 (improved). Pushed.
- Session 28 Oct (cont. 4): created Madden NFL 27 ratings parser + output location (see above).
- Session 28 Oct (cont. 5): reviewed P-043 (improved). Pushed.
- Session 28 Oct (cont. 6): reviewed P-044 (ok). Filed w33/Pre-Colors critique bulletin. Pushed.
- Session 28 Oct (cont. 7): reviewed P-045 (improved). Pushed.
- Session 28 Oct (cont. 8): reviewed P-046 (ok). Pushed.
- Session 28 Oct (cont. 9): reviewed P-064 (ok). Pushed.
- Session 28 Oct (cont. 10): reviewed P-068 (ok). Pushed.
- Session 28 Oct (cont. 11): reviewed P-069 (improved). Pushed.
- Session 28 Oct (cont. 12): reviewed P-103 (improved). Pushed.
- Session 28 Oct (cont. 13): reviewed P-104 (improved: back-to-season fix good, Cinzel missing). Pushed.
- Key findings this session:
  - P-030: Math.random count is 56 occurrences on 38 lines (Beam reported 38). Corrected inventory pushed.
  - P-032: "ILB2 (second MIKE)" slot does not exist (roster has MIKE/WILL/SAM/LB4); group averaging is position-based, not slot-based; DEFENSE n stays 13 (Beam said 12).
  - P-033: lint selftest fails (nested root config); removing "root": true from tools/biome-product/biome.json validated (Biome processes file, parseReport works). Smoke-test TABS list (post-merge-smoke.mjs:421) must drop 'tabGuideBtn' for V23.
  - P-034: team-colours.json has 6 brand mismatches vs Owner's 22 Oct table (JAX primary + 5 secondary/third), not just JAX. JAX brand entry needs full primary/secondary/third swap.
  - P-035: all 37 cited proposals verified in Beam's brainstorm; SAFE ALONE designations match. Minor: duplicate P7-38, top-25 actually ~17.
  - P-036: playerWar at 1376 (not ~1600); replacementLevels at 1352 (not 1355). Red Zone Efficiency: makeScoringEvents does NOT track field position (Beam's claim false). Turnover Margin not "already in standings."
  - P-037: stepper has 4 steps (Draft/Season/Playoffs/Champion), not 17. Draft table grid is span-based, not 12 tiny columns. Most findings cosmetic/unverified (no Playwright).
  - P-038: protected-function hash dc54e4210ce1 is a placeholder (identical for all 8 functions) — "math drift" claim unverified. Math.random 56 (not 38). Hashes are SHA-1 (40 hex), not SHA-256.
  - P-039: Math.random 38 repeated (wrong; actual 56). KI items unverified (GPT docs not in repo).
  - P-050: no per-play win probability exists; wpFrom is pre-game only. Design needs per-play WP model.
  - P-051: ok. No audio code in product; snippet exists; P7-31 verified.
- Anchor build: Football-Sim-PreColors.html, sha256 40233d6be00e987c…, 657,486 B.

## What the next session needs
- Read this file, then `node tools/council-sync.mjs --days 3` (reviews above are on council/boc).
- Worktree: /Users/kosi/Desktop/wt/boc, branch council/boc.
- All reviewed items remain 0/3 on next.mjs (reviews not yet merged into council/base by the Architect). Do not re-review them.
- Candidate next items: P-031 (injectable RNG, depends on P-030), or standing chores (preserve check, check-tasks, lane trim).
- Lint selftest still UNVERIFIED until Architect removes "root": true from tools/biome-product/biome.json.

## Open questions
- Whether the Architect will re-hash protected functions with SHA-256 and pin in MERGE-MANIFEST.md (P-038 recommendation).
- Whether team-colours.json brand entries for the 6 mismatched teams will be re-synced (P-034 recommendation).
- Whether Red Zone Efficiency (P-036 stat 10) should be dropped or scoped as sim-core work.

## Live files
- `_agents/boc/BOC.md` (this file)
- `inbox/20261025-0414-boc-P-030-claim.md` / `-review.md`
- `inbox/20261025-0415-boc-P-032-claim.md` / `-review.md`
- `inbox/20261025-0416-boc-P-033-claim.md` / `-review.md`
- `inbox/20261025-0417-boc-P-034-claim.md` / `-review.md`
- `inbox/20261025-0417-boc-P-035-claim.md` / `-review.md`
- `inbox/20261025-0418-boc-P-036-claim.md` / `-review.md`
- `inbox/20261025-0418-boc-P-037-claim.md` / `-review.md`
- `inbox/20261025-0419-boc-P-038-claim.md` / `-review.md`
- `inbox/20261025-0419-boc-P-039-claim.md` / `-review.md`
- `inbox/20261025-0420-boc-P-050-claim.md` / `-review.md`
- `inbox/20261025-0420-boc-P-051-claim.md` / `-review.md`
- `bulletin/20261025-0420-boc.md` (this session)
- `inbox/20261028-2225-boc-P-019-claim.md` / `-review.md`
- `inbox/20261028-2226-boc-P-042-claim.md` / `-review.md`
- `bulletin/20261028-0100-boc.md` (this session)

## Worktree / branch
- Path: /Users/kosi/Desktop/wt/boc
- Branch: council/boc
- merge-base HEAD origin/council/base: 29e2f4def704262a931a95c244151c67012aa13a