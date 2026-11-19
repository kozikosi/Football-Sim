# ORCAINK — lane file (rewrite every session, never append)

## Identity
- **Seat:** ORCAINK · **Model / how reached:** ORCAINK / OpenCode (Orca harness) · **State:** advisor
- **ID block:** (none yet — files as orcaink) · **First seen:** 2026-11-18
- **Strengths shown so far (evidence, not claims):** re-running 8.1 verification grids at the delivered bytes (cakepanz-8.1, P-143, P-144); cite-check prototest of VERIFY.txt §22 — found the empty `h17-dist-diff.log` and the two unreceipted shas; first independent read against P-293/pinned flex.json in two reviews.

## Current work
- **Done 2026-11-18/19 (session 2, cakepanz-9 sitting):** executed the Owner-broadcast sitting (prompt `council/muse:_agents/muse/deliveries/prompts-2026-11-05/council-cakepanz-9-sitting-2026-11-19.md` @ `297391c3`). Note filed: `inbox/20261119-0240-orcaink-cakepanz-9-sitting-notes.md` (commit `1d604378`). Headline receipts (VERIFIED): hosting integrity vs inkling copy — only documented .gitignore exclusions, content identity; pins 5c808472 (67 files) / 65673a00 (68 files) via git archive, cross-delta exactly `game.ts`+`passclass.ts`; flex sha `76c02c65…` 99 {0:17,2:17,6:42,12:23}; suites 394/406 pass; battery 33/33 both trees (with `--import ./scripts/node-port-register.mjs`); gate-numerals under `CP_PIN=65673a00` → exit 1, stdout `NUMERALS FAIL: MERGE-GUIDE.md never names the CURRENT pin (65673a00)` (default invocation CLEAN, `MERGE-GUIDE.md` names `5c808472` only); gate-manifest fresh extracts of inkling's cakepanz-8 → PASS 314/319, VL's FAIL does not reproduce; cite-check findings: `h17-dist-diff.log` is 0 bytes; `1b9bea5f…`(×3) and `8ef3b18d…`(×3) shas TRUE but unreceipted in partH-c8-1; `exit 0` for falsifiers INFERRED not receipted; `47/0`-style pair-tokens only resolve in `m1` composite; snake probe: R1 fwd / R2 rev, 1024 picks, all odd rounds reversed (ruling = Architect's); gh-pages vs fix README `cmp` → differ at line 4 only (`4ca9a071`/52 files → `d3bd81d2`/57 files); divergence: no merge-base, 13 vs 45 tip-side commits (main vs base).
- **Framework vote filed:** Svelte 5 + Vite, 65/35 (grounded on GPT's evaluation + Inkling reweight; no arm benched by this seat; none of the 3 sitting notes' authors benched an arm either). MUSE consolidates all notes within 48 h; the Owner rules or defers to cutover.
- **Tools ranked:** (1) TanStack Svelte Table post-ruling, hand-roll ALL TEAMS, pair with TanStack Vue Table if Vue lands; (2) Rosetta chips on done screens; (3) "run so far" share card as plain canvas (0 deps, beats html-to-image); (4) keyboard D-path; (5) seeded screenshot goldens with a prune rule. PWA/DnD/Storybook/analytics/virtual scroll/Zod/chart libs — each rejected with its 30 seconds.
- **P-158 still at cap** (8 reviews: vl, uk×2, boc, glyph, ernie, inkling, or — filed 2026-11-19T01:05Z). Threshold ambiguity (Owner-suggests 0.10 costly-floor vs 0.45 rare-costly) is the Owner's/Architect's call.

## Blocked / waiting on
- Owner — P-158 threshold ruling; P-144 design pick (nothing pickable until VL resubmits per `inbox/20261119-0225-orcaink-P-144-review.md`); gh-pages two-file fix placement (cmp receipt filed, 2026-11-19); re-pin 65673a00 activation (MERGE-GUIDE pin gap filed); F1 for cakepanz-8.1; R-13 sequencing; hy4 league-size flag.
- Architect — P-143 integrate or reject; P-158 three-bar thresholds move; snake-order ruling; cutover merge plan (divergence 13/45 measured).
- MUSE — consolidation of the sitting notes into the attributed report (within 48 h of submissions, per the prompt).

## What the next session needs
- **Read first:** this file; `inbox/20261119-0240-orcaink-cakepanz-9-sitting-notes.md`; then `inbox/20261119-0144-orcaink-P-143-review.md` and `inbox/20261119-0225-orcaink-P-144-review.md`.
- **Do not redo:** the 8.1 verification grid (this sitting re-ran it); the cite-check (findings listed, receipts for `h17` empty and two re-filed shas owed by whoever owns the package); the snake probe.
- **Open questions:** VL's P-144 resubmission; P-158 threshold; whether `h17-dist-diff.log` (0 B) and the two unreceipted shas get re-filed with receipts by the package owner.

## Files in this lane
- `67-cakepanz-8.1-2026-11-18/` — delivered package as landed 2026-11-18 (byte-identical to Desktop source).
- `ORCAINK.md` — this file. `BOOT.md` — opening check.

## Role
general advisor. Advisor level: propose, test, dissent, measure.

## Worktree / branch
- Path `/Users/kosi/Desktop/wt/orcaink` · Branch `council/orcaink` · merge-base vs `origin/council/base`: `864a6aa1`.
