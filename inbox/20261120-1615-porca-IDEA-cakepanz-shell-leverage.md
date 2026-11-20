SPEAKER: porca | ROLE: advisor | TASK: implications + innovation for 67 Cakepanz / the UI-UX shell around Claude's engine, informed by the cakepanz-12 review | DATE: 2026-11-20T16:15Z
FOR: (no queue item — Owner's brainstorm request; MUSE may queue any of these)
IDEA: a ranked shortlist. This **extends** my session-5 eight ideas (`inbox/20261120-0452-porca-IDEA-cakepanz-shell-next.md`), which are not repeated here. I do not build; these are proposed for the Architect/Owner to accept or reject.

## The one question that would re-rank this list (carried from my lane, still unanswered)

Is the shell's main frustration **(A) the slow, partly self-deceiving loop around the engine** — re-pins, receipts, generators going stale, a manifest pinned to a receipt that cannot be regenerated — or **(B) the player-facing board on a phone**? My list is ordered on the hypothesis that it is (A); if it is (B), move group II to the top and defer group I. I am not asking for a design decision on any single idea — only which of the two frictions is costing the Owner more.

## Group I — the verification pipeline is the real product bottleneck (highest leverage under hypothesis A)

This sitting is the evidence. In one zip I found: a README that says "13b is CLOSED" while its own report and START file say OPEN; a verifier that does not notice an extra file; a11y laws that paste source strings instead of reading the rendered tree; a manifest pinned to a run-variant receipt that no future run can reproduce (T8's block); and a falsifier that needed a stale-server guard invented before it could be trusted. The shell's engineering time is going into *proving* things, and the proofs are brittle. Fix the proofs as a data product.

1. **Receipts with provenance, not pasted logs.** Define a tiny receipt schema: `{ claim, command, stdout_sha256, exit_code, tree_git_sha, artifact_sha256, node_version, os, recorded_at }`. Store one JSON per claim; keep raw stdout beside it. Add `tools/check-receipts.mjs` that fails when a receipt's `tree_git_sha` no longer matches the tree it certifies. D1 above would have been caught at commit time: the "13b CLOSED" string lives in a file whose receipt still points at the pre-hardening bytes. Cost: one schema + one tool + a convention; no engine, no UI.

2. **A "law coverage" counter printed by every battery, asserted by every falsifier.** This is the structural cure for the vacuous-pass class Z.ai found in F20 (L16a passed on an empty `every()` with ringed=0). Each battery prints `LAW <id>: PASS|FAIL|SKIP <reason>` and a final `LAWS_EXPECTED=n LAWS_EMITTED=n`; the falsifier asserts that the planted mutation moved *the named law* from PASS to FAIL and that emitted==expected. A law that vanishes or stays green is a hard failure. This turns "the battery stayed green" from a diagnosis puzzle into a named error, and it is the mechanism D4/R4 were missing.

3. **Every battery takes `--seed` (or `CP_SEED`) and prints it in the receipt.** Z.ai proposed the fixed slice-battery draw in §5.2; beam and hy4 endorsed it. Generalize it: deterministic draws across slice/board/visual/shell batteries, the seed echoed in the output. Then `slice1-battery.json` becomes byte-stable and T8's repair becomes a `cp` instead of a four-host blocker. This is the single change that most reduces future packaging pain.

4. **The D-2 guard as a shared library** (beam's brainstorm G, which I endorse): extract `runBattery`'s lsof-kill / readiness poll / served-hash check / killGroup / UNRUNNABLE-is-failure into `tools/falsifier-guard.mjs`, imported by every falsifier. Combine with idea 2 so the guard also checks law coverage. One refactor; all future falsifiers inherit protection.

5. **A stricter package verifier with the converse check** — hy4's drop-in in `inbox/20261120-1551-hy4-cakepanz-12-review.md` §"Improved tools/verify-package.mjs", reproduced by me (finding D3). Ship it before the next relay so the c10 landing cannot pass with stray bytes. Pair with idea 1 so the manifest itself is generated from the tree, not hand-cut (the empty-string self-line was exactly a hand-cut artifact).

6. **An engine-contract card generated at pin time.** At each re-pin, emit a small `ENGINE-CONTRACT.md`: the exact exported functions/types the shell imports from the snapshot (`createStore`, `boardVM`, `goneOdds`, `lineupFor`, `fit`, `SLOTS`, `GoneOdds`, …), their signatures, and a hash. A CI check fails when a new pin changes any signature. This attacks the other half of hypothesis A: today a re-pin means rebuilding and re-running everything to discover a signature drift. The card makes drift immediate and local. It does not touch the engine — it reads it.

## Group II — the shell as a decision surface, not a data dump (under hypothesis B)

7. **The ring as explainable advice, with persistence.** When the Architect rules C′1 (council position: Contract B, `rawSort` from `key()` on `BoardRowVM`), render the reason on hover/focus ("top three by Wins") and announce "recommended" in the live region. Then persist `suggestIds[]` in the draft record so a restored draft shows the *same* ring — auditable, and the ring law can be asserted against stored data instead of recomputed state. Beam filed the first two parts; persistence is mine.

8. **A decision-point counterfactual, engine-sourced only.** On a ringed row, a secondary affordance shows the marginal team-rating delta of taking him now vs the next-best at that slot, computed from `slotWinsPerOvr`/`teamRatings`. Data-integrity rule §7 forbids invented numbers, so this must call the engine and label the value as calculated, with the formula in the tooltip. It puts the model-first doctrine (measured Engine Value) where the user actually decides, instead of in a distant tab.

9. **The paste-a-code home input (closes the viral loop).** T2's prefixed `b36:` code + R2's URL write-back already make every draft replayable with no backend. One input on the home screen — paste a code, choose team/slot, start — turns that infrastructure into growth. Offline-first, no server, one component. This is the highest-value *user-facing* idea in the list if hypothesis B holds.

10. **A phone-first board pass with a measured budget.** W11 added a 768 px wrap band; the 390 px law exists. Extend to a standard gate at 390 / 768 / 1280 px in `post-merge-smoke.mjs` (beam's H), and add one ergonomic law: the primary "Draft" action must be reachable without horizontal scroll and with a ≥44 px touch target at 390 px. Measure before changing layout; do not redesign on taste.

## Group III — ruled out / deliberately not proposed

- No engine edits, no pin moves, no ratings generation, no basketball: the guardrails stand (Z.ai START §1, AGENTS.md §2).
- No new "candidate build" or root-level dated copy: the Architect is the only product writer.
- Not re-pitching the four rejected features (What If, deterministic multiplayer, 20-0 roguelike, cross-era pools).
- I did **not** re-run any battery: the delta zip cannot reproduce the browser counts. Those stay REPORTED (hy4's point, which I share).

## What I would accept as a next sitting's definition of done

Ideas 3 + 2 + 4 together make the pipeline trustworthy, deterministic and cheap; idea 9 is the one user-facing move that pays for itself. If the Owner answers the question at the top with (A), take 3 → 2 → 5 → 1 in that order. If (B), take 9 → 10 → 7. I will revise this ranking on that answer; nothing here is a build request.
