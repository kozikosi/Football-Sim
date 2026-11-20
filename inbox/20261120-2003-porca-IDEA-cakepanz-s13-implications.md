SPEAKER: porca | ROLE: advisor | TASK: implications + innovation for cakepanz and the UI shell around Claude's engine, informed by the S13 delivery and the four peer S13 reviews | DATE: 2026-11-20T20:03Z
FOR: (no queue item — Owner's brainstorm request; MUSE may queue any of these)
EXTENDS: `inbox/20261120-1615-porca-IDEA-cakepanz-shell-leverage.md` (10 ideas, 3 groups) and `inbox/20261120-0452-porca-IDEA-cakepanz-shell-next.md` (8 ideas). Neither is repeated here.

**Assumption stated out loud:** the Owner did not answer the A-vs-B question (verification loop vs phone board), so I keep my original pipeline-first ordering as the default and say so. This sitting adds a category that outranks both: **P0 correctness**. Pickle's D1 is a real behavioural defect in the shipped shareable-link feature, and four independent reviews found the same two evidence defects. Nothing here is a build request; I do not build, rule, or edit the product.

## Attribution / convergence (why this list is short)

This is a consolidation, not another list. beam filed 10 ideas (A–J), ernie filed 9 (A1–D), I filed 10 earlier. The same ideas recur across seats, which is the signal:
- **Keyboard-first draft:** beam B = ernie A3 (I had missed it). One item below.
- **Shareable link as the primary artifact:** beam A + my 9 + ernie C9 — but pickle D1 shows the current link is *broken* by the autosave, so the fix precedes the feature.
- **Ring explanation:** my 7 = ernie A1; ernie's Owner-relayed w89-glow direction (REPORTED — no owner-notes file found) adds a visual restyle.
- **Law coverage / guard helper:** my 2 + my 4 = beam H = beam note 1 = ernie §4. Four seats converged on one refactor.
- **Receipt provenance:** my 1 = hy4 D1/D2 = pickle D2/D4/D6 = ernie D1–D4. The doc defects *are* the proof that the pipeline needs to be a data product.
- **Determinism:** my 3 = Z.ai's own §5.2 proposal, beam/hy4 endorsed.

## P0 — correctness, before any new feature

**0. Fix the shared-link/autosave conflict (pickle D1) and add W14.** `App.svelte:108` boots `hydrateBoot()` unconditionally; `:234` loads the autosave; `:204` rewrites the URL to the autosave's seed. An explicit `?seed=` link silently opens the visitor's own old draft. Proven fix exists on a temp copy (skip the autosave only when the explicit seed *differs* — the same-seed exception is load-bearing; naive `if (has('seed')) return` breaks W9). Add W14 asserting explicit-B-wins + same-seed-still-restores. This is the highest-leverage change in the whole round: it makes every other share idea meaningful. Owner/Architect call, not mine.

## Group I — the verification pipeline (highest leverage under hypothesis A, my default)

1. **Receipts with provenance, not pasted logs.** Schema `{ claim, command, stdout_sha256, exit_code, tree_git_sha, artifact_sha256, node_version, os, recorded_at }`, one JSON per claim, raw stdout beside it, `tools/check-receipts.mjs` failing when `tree_git_sha` no longer matches the certified tree. The five doc defects in this round are all "prose outran artifact"; this makes that impossible at commit time. (my 1, extended)
2. **Law coverage printed and asserted.** Every battery prints `LAW <id>: PASS|FAIL|SKIP <reason>` + `LAWS_EXPECTED=n LAWS_EMITTED=n`; falsifiers fail on coverage mismatch and on the *named* law's transition. This is the structural cure for the F20 vacuous-pass class and the L13/L16 quotation confusion. (my 2)
3. **`ringPresentGuard()` as a shared library** — extract the D-2 stale-server guard + served-hash check + ring-present skip-loud guard into `tools/falsifier-guard.mjs`, imported by every falsifier and battery. Beam's note 1 and ernie's 6/10→16/0 stale-server trap are the same root cause: each new law grows its own unguarded locator. (my 4 + beam H + ernie §4)
4. **Every battery takes `--seed`/`CP_SEED` and echoes it.** Byte-stable `slice1-battery.json` turns T8's four-host repair into a `cp`. (my 3 — unchanged, still open after S13)
5. **Engine-contract card at pin time + golden covers display.** Emit signatures/hash of exactly what the shell imports; extend N34's seam golden to `fmt(engineValue)` so a re-pin that changes rounding fails the golden, not the Owner's first draft. (my 6 + ernie C8 + beam I)
6. **Reconcile the two governance drift lines.** MUSE's `PROJECT-KNOWLEDGE.md:18` still says pin `d3bd81d2`; frozen `AGENTS.md §2` still says 97-rule flex while the pin says 99. Both are facts about the record, not the product — MUSE/Architect to fix. (hy4 R2 + pickle D7; newly VERIFIED by me)
7. **Verifier SKIP set after build.** Add `node_modules/` and `src/engine-node/` so converse works on a built tree, or document "verify before building". (ernie §4, VERIFIED from code)

## Group II — the shell as a decision surface (under hypothesis B)

8. **Keyboard-first draft, advertised.** `j/k` (or ↑/↓) to move the ring focus, `Enter` to one-click draft, `u` to undo, `1–9` to jump; put it in the Guide. L17 already proves the Tab→quick→method path; the UI just doesn't expose speed. Demo-able in 20 seconds, which is what makes the share link worth sharing. (beam B + ernie A3)
9. **Share link + share-card receipt line, after P0.** "Copy draft link" button next to the seed code with a `file://` fallback; stamp the engine pin into the URL and warn on mismatch (honest replay). On the card, one human line: "Drew [team] at [slot], went [record] with [playoff result]" from run state. (beam A + beam G + ernie A4 + my 9)
10. **The ring as explainable advice, with persistence and the Owner's glow direction.** One plain-language reason on each ringed row from the same VM (slotWins20 + needs); persist `suggestIds[]` so restored drafts show the same ring; evolve the affordance toward w89's warm pulsing gold (`.zpb-sglow` treatment) as a *restyle only*, keeping L13/L16–L22 green, contrast 2/0, and `prefers-reduced-motion`. Owner direction is REPORTED via hy4/ernie; Z.ai owns it, not the Architect. (my 7 + ernie A1 + Owner-relayed S14)
11. **Legibility, not density.** Late-round "best available by Wins" single-column mode with a "show the math" expander (uniform-board law L12 intact); empty/error states for no-draft, failed-LOAD and stale-pin saves; persistent Undo affordance for the 2.6 s one-click window. Do **not** add board columns. (ernie A2 + beam D + my c12 note 6 + ernie's "don't")
12. **Phone-first board pass with a measured budget.** Gate 390 / 768 / 1280 px; assert the primary Draft action is reachable with no horizontal scroll and a ≥44 px touch target. Measure before changing layout. (my 10, unchanged)
13. **Offline save portability.** Export/import the autosave to a file, so the tent-in-the-woods test is real (play on device A, continue on B). (ernie C9)

## Group III — ruled out / not proposed

- No engine edits, pin moves, ratings generation, multisport, or product-file writes by me. The Architect is the only product writer; Z.ai owns the ring restyle.
- No new "candidate build" or dated root copy.
- Not re-pitching the four rejected features (What If, deterministic multiplayer, 20-0 roguelike, cross-era pools).
- I did not re-run any battery: no `node_modules`; all gate counts from the four reviews are REPORTED, not VERIFIED by me.

## What I would accept as a next sitting's definition of done

**P0 first** — pickle D1 fixed with W14; nothing else matters if a shared link opens a stranger's old draft. Then, under my default hypothesis A: 4 → 2 → 1 → 5 (guard, law coverage, provenance, contract) as one sitting's pipeline hardening, plus 6 and 7 as housekeeping. Under hypothesis B: 8 → 9 → 10 → 12. Group III stays closed. I will re-rank on the Owner's answer if it arrives; until then this is my call, not a decision attributed to him.
