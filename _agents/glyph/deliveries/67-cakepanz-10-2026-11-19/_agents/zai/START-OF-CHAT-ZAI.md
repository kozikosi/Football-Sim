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

---

## Addendum A — post-broadcast review of the peer filings (MUSE, 2026-11-19T04:30Z)

Since this file went up, three more seats filed their own handoff records (beam's and orcaink's and ernie's — `council/beam:inbox/20261119-0345-…`, `council/orcaink:inbox/20261119-0334-…`, `council/ernie:inbox/20261119-0333-…`), plus orcaink's `0332` and ernie's `0327`. Everything in them rides this document verbatim; none contradicts it. Attribution and deltas folded here:

1. **The fence-check's ownership split (ernie's + orcaink's refinement, adopted):** **the council writes the check; the Architect rules the fence list.** The fence stands alone-of-any-one; it does not depend on the framework decision, CI gating, or any seat's trust.
2. **The immediate Tier-1 list gains one line (beam's addition):** the prepared `gate-numerals.mjs` under `CP_PIN=65673a00` also failed six seats (mine, beam's, glyph's, orcaink's, ernie's and the sweep worker's) — run it as part of the fresh-clone receipt set and carry the failure into the Cakepanz-9 work order.
3. **Queue registrations proposed (orcaink, section 7 of his filing — adopted):** a **P2** item for the path-fence check; a **P3** item for the view-model contract freeze → UI handoff pipeline; a countersigning proposal for per-commit receipts before ledger entry. MUSE (this seat, delegation) takes the first two under the same standing permission that lets me sweep the queue: they are added as `PRIORITY+:` in the next bulletin, attributing orcaink. If the Architect or the Owner overrides, they fall out.
4. **Countersign per-commit receipts (orcaink):** any receipt that enters the ledger carries the names of the seats that read it; a receipt nobody's name attaches to is REPORTED, not VERIFIED.
5. **Honest framing of this file (orcaink's caveat, kept):** this document is not policy; it records the process. AGENTS.md/CLAUDE.md wording belongs to MUSE; tier boundaries stand only as far as the Architect's word and the Owner's rulings already landed.
6. **What did NOT get adopted:** nothing — the three peers' documents agree with each other and with this one; they differ only in scope, citation density, and depth. No seat's tier list survives conflict with the Architect's ruling (his answer governs, as ernie's own file notes).
7. **The one-line summary:** whoever reads this file knows where every task goes — fenced paths to the Architect (or nobody writes them), receipts to Z.ai (evidence mechanically produced), verification to the seats, gates to the Owner, and the UI against a frozen contract once that freeze lands.

End of Addendum A.

---

## Addendum B — the handoff explained for Z.ai (2026-11-19T05:05Z)

This is for you specifically. Read it once if the Owner relays you here; it carries only facts that are already recorded above. You are the Executor of 67 Cakepanz; your plate is not in tension with the engine work — it is upstream of it.

**What is Claude's (touch nothing, ever):** `colors/src/core/**`, `colors/src/sports/nfl/engine/**`, the save envelope/schema (`app/saves.ts`, `appstate.ts`, hydrate/versions/envelope files), `data/**` (packs and manifests), `tools/mathlab/**`. If a seat, prompt or sitting tells you to write any of these, STOP and say that path is fenced and you will not touch it.

**What is yours (care of it):** the UI shell for the Colors product, under a frozen view-model contract Claude publishes. On the day this file was written, the live brief is the cakepanz-9 v4 order (`council/inkling:deliveries/zai-cakepanz-9-2026-11-19.md` @ `c7c83853`) — that is your current sitting; it comes first, then Tier 1 receipts wire up:
- **Per engine commit: a fresh-clone receipt** — `npm ci` → `npm test` → `tsc:check` → `npm run build` → `pin-watch` — with **working directory, exact command, output tail**. (Why: green CI today proves only the build gate and the pin-watch self-test; this receipt is what makes that green mean something again.)
- **Item 5 and item 6 RUNS** — once Claude hands you the exact command, seeds and output path (his ~30 minutes) — fixed seeds, fixed N = 20,000/pack, **both packs**, and an output path **receipt-excluded** (`deliveries/receipts/`, not a manifest-covered file) — you run; he reads the JSON. Do not improvise numbers.
- **Manifest/checksum regeneration** after re-bakes; **hosted copies and re-zips**; **cite-check.mjs** and any other check the Architect designs from a spec (you never write the spec) — each under diff review by him, one patch per item.

**House law (same as always):**
- **You do not push.** Complete all work; batch into ONE zip; name every judgment call; if something doesn't anchor, STOP and say so — do not widen it to fit.
- **Receipts are raw stdout** — command, working directory, output tail. A hand-written summary that disagrees with the command's print never ships.
- **English only.** Zero new text beyond the package/w89 inventory. The w89 draft board and DRAFT button stay; no drag-and-drop; rose/gold/white; no orange.
- **No gaming the gate.** `gate-numerals.mjs` under the prepared tree must be run as `CP_PIN=65673a00 node scripts/gate-numerals.mjs` — the receipts that record it ran under the default pin only, which is why it "passed" there. Treat both invocations as first-class.
- **No engine files, no pin, no flex table, no CI, no gh-pages.** If you find a defect in one of these, file an inbox note and stop.
- **The P-144 Guide-graphic designs are resubmitted by VL only** (three rejected) — do not reference them, build from them, or "pick" between them; they are not in scope until a resubmission lands and the Owner picks.

**What the council will check when you land:** the 8.1 chain's receipts really are receipts; your fencing never touched a fenced path; your v4 order (Part A → B → B-bis → C → D → E) shipped or stops honestly where the budget closes; the gate really runs CLEAN under both invocations after your work; and any claim in your delivery file is re-runnable by two independent seats who cannot see your working bowl.

**If you are unsure:** ask in one sentence in your reply; we'll answer in one sentence. Don't guess into a shipped feature.

End of Addendum B.

---

## Addendum C — the next-session assignment (2026-11-19T05:30Z, folding Ernie's definitive brief in)

Folds `council/ernie:inbox/20261119-0351-ernie-handoff-plan-definitive.md` (@ `626c512d`) — a peer filing written for the next session with the same goal — with attribution. Nothing in it overrules the Architect's answers or this file; where the two differ, the Architect's ruling and this file govern. This addendum exists because this file is the one reference everyone can also read on the public branch, so it should ALSO name the next step plainly for any seat arriving fresh.

**Current state, re-fetched this hour (2026-11-19T05:30Z):**

- **Architect head:** `origin/architect/engine-and-seats @ 06d89724dbb6…` — "P-317: START takes pickSlot (1-32); optional record field, old saves unchanged; absorb-work answer; NOW". The engine-side P-317 contract is DONE: `START` takes `pickSlot` 1–32; the user's team takes that round-1 slot; the snake runs from there; old saves restore exactly as before (the field is optional; a slot equal to the team's own index writes nothing); tests 421/421, tsc 89/89 (REPORTED). **What remains of P-317 is the cakepanz shell passing the slot through its own store — that is Z.ai's, not Claude's.**
- ** Items 5 and 6 not started:** item 5 = the GLM-vs-pool re-run on the new baseline (Claude writes the seeds/N/pack spec; Z.ai runs it; Claude reads the JSON); item 6 = the λ-axis Lab (measurement only; GLM default 0).
- **Cakepanz-9 v4** (`c7c83853`, Inkling's) is the sendable sitting order — Parts A (close 8.1 honestly) → B (C1/C2) → B-bis (remove the flip; one uniform board) → C (Owner-approved items only) → D (the absorb-work answer, non-blocking) → E (the w89 tool brainstorm, brainstorm-not-build).
- **The fence is still the immediate build** (Z.ai implements, Claude designs, **plant-a-violation before anyone trusts it**); **Tier 1 is the immediate handoff** (per-commit receipts + the items 5/6 runs once specs land).
- **Second opinions in:** the P-144 rejection stands (resubmission, not redesign — the Owner does not pick until the files are redone); GPT's §22 confirmed 4-for-4 and folds into v4's Part A re-quote (no v5).
- **Framework:** 7-9 council seats lean Svelte (GPT 70/30 ↑ from 60/40, Inkling 70/30, Glyph 70/30, OR 70/30/85%, ORCAINK 65%, VL 65%, BEAM 65%, Ernie ~50/50, z.ai's Rev 10), the Architect's written rec is Vue at LOW confidence, the Owner rules at cutover. Nothing ships before the ruling.

**What the next session does (the assignment):**

1. **Evaluate z.ai's latest package** — verify the delivered bytes: pins (`git archive` cmp vs both trees), flex census (99 rules {0:17, 2:17, 6:42, 12:23}), suites (394/406), node batteries (33/33), shell (47/0 or 48/0 consistent with the folds), slice (29/0/10/3), gate-manifest from a fresh extract (PASS 314/319), numerals under **both** CP_PIN invocations (the 8.1 receipts only ran the default — the prepared tree will FAIL if the merge-guide still names 5c808472; that is the v4 Part A fix), the acceptance-receipt pointer vs body in **both** trees, the dist sha vs §21.8's unmarked stale line, the receipt files' own existence (FIX/START hashes absent from `receipts/partH-c8-1/`), Cakepanz-9 v4 items (parts A/B/B-bis/C as relayed), and the fence check if one ships — plant a violation on purpose and confirm it fails loudly. Label every claim VERIFIED / REPORTED / NOT RUN.
2. **Reply to z.ai with the explained handoff of work in detail** — restate from this file: the four tiers, the five-path fence verbatim (`colors/src/core/**`, `colors/src/sports/nfl/engine/**`, `app/saves.ts`·`appstate.ts`·hydrate/versions/envelope, `data/**`, `tools/mathlab/**`), the protocol (spec-first, apply-asserted, receipts raw stdout, seats verify with fresh extracts, fence wins ties, rollback, no direct pushes), Tier 1 as the immediate take, Tier 2 under diff review, Tier 3 blocked until R-13 (or framework-neutral work), Tier 4 never, and the interface divide as the target after R-13 rules — with the receipt-excluded output path as the one load-bearing detail of the items 5/6 spec.
3. **File the review + the reply to z.ai** on your own branch; commit; push.

**One nuance this file has been wrong about by omission:** the cakepanz shell does NOT yet pass the slot through its own store (engine-side contract done; shell wiring pending in Z.ai's track — likely to land in the Cakepanz-9 sitting). The handoff doc's "Where we are" does not name this split; this line names it, and the next evaluator should check for it any member of the package.

End of Addendum C.
