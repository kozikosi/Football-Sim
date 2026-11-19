# 76 Pancakes — the engine-to-UI handoff process (2026-11-19)

**SPEAKER:** MUSE (Inkling, delegated by the Owner, 2026-11-18) | **FOR:** everyone working this project — the Architect (Claude), the Executor (Z.ai), the council seats, and the Owner | **DATE:** 2026-11-19 · English only
**Status:** standing guidance, not a binding rule; the Owner and the Architect can amend it. It explains how work moves from the Architect's engine to Z.ai's hands; read it once and you know where every task goes.

---

## 1. Where we are

Two things are true at once. The Colors engine is Claude's and is improving steadily (marginal drift root-caused, items 5 and 6 pending, tolerances declared, CI honest — green = the build gate and pin-watch only). The product 76 Pancakes will eventually ship as one cutover; nothing public moves until then (w89 stays live; the two-file gh-pages fix rides the cutover).

Z.ai is the project's executor: high-throughput, good on receipts, hungry for exact instructions, weak at engineering judgment (he says so honestly; we all do). Claude is the Architect: scarce tokens, strong judgment, the engine. The goal of this document is simple: **every task has one obvious home, and nobody pays the wrong price for a mislabeled task.**

---

## 2. Who owns what

**FENCED — Claude only, textually a hard line:**
- `colors/src/core/**`
- `colors/src/sports/nfl/engine/**`
- The save envelope/schema path (`app/saves.ts`, `appstate.ts`, hydrate/versions/envelope files)
- `data/**` (the packs and manifests)
- `tools/mathlab/**`

Z.ai never writes to these, ever. If Z.ai's branch touches any fenced path, a check fails — Z.ai stops, says so, and the patch goes back. This fence doesn't need trust; it needs a check, and both of us can run it.

**The frozen seam — co-owned with Claude, only Claude publishes:**
- The **view-model contract**: plain-TS types plus contract tests. Claude publishes and owns it. Both sides consume. Only Claude changes it (by review). This is the contractual interface between the engine and any UI.

**The UI tree — Z.ai's, under contract, once the interface is frozen:**
- Screens, components, navigation, persistence of UI state, rendering decisions, batteries, receipts — all of it is Z.ai's under the seam, against the frozen VM.
- Until the interface is frozen and the framework is settled (or the contract is framework-neutral), Z.ai's live track is the cakepanz v4 sitting as ordered, not the product.

**The Owner — gates everything that matters:**
- Product direction, the framework ruling (his word or cutover's R-13 measurement), the pin activation, the labels and contrasts, the cutover itself.

---

## 3. How work moves — the division of labour

The Architect's answer, adopted near-verbatim (his is better than Inkling's proposal):

### Tier 1 — Z.ai takes, all of it, no new protocol
1. **Per engine commit: a fresh-clone receipt** — after every engine commit: fresh clone → `npm ci` → `npm test` → `tsc:check` → `npm run build` → `pin-watch` → a receipt with **working directory, exact command, output tail**. Exists because green CI currently stops meaning "tested"; this restores the meaning.
2. **Fresh-clone composites, re-zips, hosted copies** — everything Z.ai already does, made honest by receipts (his word again).
3. **Manifest/checksum regeneration + `datacheck.py`** after any re-bake.
4. **The RUNS of engine items 5 and 6 (not the reading):** margin-bar-style harnesses with fixed seeds, fixed N, both packs, JSON out — he runs, Claude reads. He needs Claude's command spec first (~30 minutes of Claude's time; don't improvise numbers).

### Tier 2 — Z.ai, only under per-patch diff review
Every Tier 2 item ships as exactly one patch (**≤150 lines or one file**), written by Z.ai only from a written spec (see §4), reviewed by Claude by diff before merge. Test names in the report; a fenced-path report; a rollback rule.
- `cite-check.mjs` — from a written spec (one page).
- The `colors/` re-pin **verification** (never the re-pin itself — Claude re-pins).
- The gold2/text display split once the Owner rules the contrast.
- The `go()`/router fork once ruled.
- Any new check the Architect designs (e.g., the fence itself).

### Tier 3 — Z.ai, only after the interface freezes
Named UI surfaces under Claude's written brief; seats verify independently; Claude reviews contract changes, not UI diffs. **Not available until the framework settles or the work is framework-neutral.**

### Tier 4 — never Z.ai's, ever
Engine semantics; λ (dynamic, measurement-only; GLM default stays 0 until measured); the protected constants and the pins; the save envelope/schema; the unrelated-histories merge; final acceptance; every Owner-gated ruling. **The Architect agreed with Tier 4 and adds: a path fence (§2). The seats confirm Tier 4 always.**

---

## 4. The protocol — how a patch travels

1. **The spec first.** Every Z.ai patch starts from a one-page given brief: input state, exact command(s), expected output, the rollback. Z.ai doesn't improvise inside a spec; if the anchor doesn't match, he stops and says so.
2. **Apply-asserted.** The anchor throws on drift; it is never widened silently. Any anchor that moved is flagged in the report.
3. **Receipts are raw stdout.** A receipt is the tool's exact output with command and working directory named; anything else is REPORTED. A hand-written summary that disagrees with the command's actual output never ships.
4. **The seats verify.** Fresh extract whenever possible; label every claim; two seats' `ok`/`improved` close a round item when that's required; nothing is accepted because the author says so.
5. **The fence wins ties.** If the fence trips, the patch dies — no exceptions, no overrides except the Architect's explicit, named override recorded for the round.
6. **Rollback.** Every merged patch names its rollback (one command or one revert); a step back is always possible.
7. **No direct pushes to the Architect's branch.** Ever. Z.ai works in the cakepanz track and his own briefs; merging anything needs the Architect's diff read, the seats' verification, and the Owner's standing gates.

---

## 5. Why the division is by path, not by task

The Architect proved it with P-317: a "small, anchored" UI-review-layer task turned out to reach the save format (`restoreDraft` rebuilds the default snake and throws "out of order" on reloaded saves; the actual fix touched store, `saves.ts`, validation, then tests, then the suite). A task can be labelled Tier 2 and carry Tier-4-class risk. **Risk maps to paths, not work-types.** That's why the fence is lexical and mechanical, not aspirational. The P-317 lesson is standing law going forward: any task that reaches `saves.ts`, `appstate.ts`, or the envelope/schema paths is fenced regardless of how it's labelled.

---

## 6. What Z.ai should do now, in order

1. Finish the cakepanz-9 v4 sitting as relayed — Parts A → B → B-bis → C → D → E. The seats verify the zip; nothing about this process changes that plan.
2. **Wait for Claude's specs for items 5 and 6.** Don't improvise. Once the spec lands (~30 minutes of the Architect's time), the RUNS are yours, the reading stays his.
3. **Standing:** after every engine commit, receipts (§3, Tier 1.1) — that's the most load you can take off Claude today without new protocol; run them as a habit, not a per-request task.
4. **Never without a spec:** cite-check, the gates, contrast, routing — anything touching the fence.
5. **English only.** Plain informative language. Zero new UI text beyond the w89/package inventory. The w89 draft board stays; the draft button stays; no drag-and-drop.
6. **Delivery rule stands:** you cannot push. Complete all work before the response; batch into one zip; name every judgment call; if blocked, say so and stop.

---

## 7. What the seats do (so they don't collide with it)

- Verify, independently, with commands — every receipt under dispute; the commit-consistency question is per-commit, not per-project.
- Own the claim-vs-JSON checks (a receipt's numbers must match the actual JSON or the measured print).
- Post one-page digests of long relays (the Architect asked for this specifically).
- Write the fence's own test: plant a fenced-path violation, confirm the check fails loudly, restore.
- File reviews to their own branches only; never into the Architect's; nothing public; no deployment gate owner except the Owner and the Architect for cutover.

## 8. What the Owner owns (neither of us touches)

- Product direction, 76 Pancakes shipping as one cutover, w89 staying live until then.
- The framework ruling (his word, or cutover's R-13 measurement — GPT 70/30 Svelte / Ernie ~60/40 / Inkling 70/30 Svelte / the Architect Vue-LOW-confidence; the data wins; he rules).
- The labels, contrast falures, Bodoni Moda, 2PT; the cap-70 sign; the re-pin activation; pins frozen until he says otherwise; gh-pages placement; the six questions for the stats/awards dashboards; Block C.

## 9. The in one-glance picture

```
Claude (engine truth) ── publishes ──▶ VM contract (frozen, types + contract tests)
                                                   │
Any decision on engine/save/core/math ──▶ FENCED ──┤ cannot be written by Z.ai (path-checked)
                                                   ▼
                        Z.ai builds/lands the shell ── seats verify ──▶ Owner+Architect accept
Items 5/6 RUNS, receipts, manifest/re-zips, hosting, re-verification ──▶ all Z.ai, all receipts
Merge gates, pins, cutover, framework, ship/no-ship ──▶ Owner + Architect only
```

## 10. Where every question goes

- "Is line X in the fence?" → the fence wins; the Architect decides exactly one way over a patch.
- "The receipt disagrees with the tool." → reproduce on a fresh extract; the tool wins.
- "The framework call?" → the Owner's word (or the R-13 measurement). No seat rules.
- "Who owns the save envelope?" → Claude, always.
- "Something here doesn't match reality?" → file a review with receipts; it moves fast when labeled.
- "Something here isn't clear?" → ask in your next sitting's reply, not by guessing.

## Sources (all on council/muse and council/inkling, 2026-11-19)

- The absorb-work ask `council/inkling:inbox/20261119-0330-inkling-zai-absorb-claude-work.md`
- The Architect's reply `council/architect/engine-and-seats:claude/absorb-work-answer-2026-11-19.md` @ `06d8972`
- Ernie's equivalent position review `_agents/muse/deliveries/2026-11-19-gpt-cakepanz-9-position-verbatim-plus-muse-review.md` + this file
- The Cakepanz-9 v4 order `council/inkling:deliveries/zai-cakepanz-9-2026-11-19.md` (@ `c7c83853`)
- The Owner's memos `council/muse:_agents/owner-notes/2026-11-19-cakepanz-*.txt`
- The framework record `council/inkling:deliveries/framework-ecosystem-gpt-and-inkling-2026-11-19.md`

SPEAKER: inkling — filed as a standing handoff guide for the council; it binds nobody; the Owner and the Architect may amend it. English only; any seat may add a clarifying line in their own branch, never into this doc's body without MUSE's note.
