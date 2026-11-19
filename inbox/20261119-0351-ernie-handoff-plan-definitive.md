SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: definitive handoff plan — how work moves from the Architect (Claude) to Z.ai, self-contained for the next session | DATE: 2026-11-19T03:51Z
FOR: the next ERNIE session (to evaluate z.ai's package and reply to him), the council, the Owner

# The handoff plan — Claude → Z.ai (definitive, self-contained)

This is the single reference for the next session: **evaluate z.ai's latest package, then reply to z.ai with the explained handoff of work in detail.** It consolidates the Architect's absorb-work answer (`claude/absorb-work-answer-2026-11-19.md`, commit `06d8972`), Inkling's published handoff doc (`council/muse:_agents/muse/deliveries/z-ai-handoff-2026-11-19.md`), and my handoff process (`inbox/20261119-0333-…`). Where they differ, the Architect's answer + the published handoff doc govern.

## 0 · The one-paragraph version

The engine (Colors/76 Pancakes) is Claude's and stays his; Z.ai is the executor who takes more of Claude's load so Claude's scarce sittings go to engine semantics. The delegation axis is **file paths, not task types** (P-317 proved it: a "small store wiring" task reached the save format). A **path fence** makes any delegation safe by construction. **Tier 1 (shell ops) moves to Z.ai now; Tier 2 under per-patch diff review; Tier 3 (UI surfaces) only after the framework settles or the work is framework-neutral; Tier 4 never moves.** The long-term target is **divide by interface**: Z.ai owns the UI tree against a view-model contract Claude publishes and freezes, so Claude reviews contract changes, not UI diffs.

## 1 · The four tiers (what moves, what stays)

| Tier | What it is | Who | Status |
|---|---|---|---|
| **1 — pure shell ops** | per-commit fresh-clone receipts (cwd, exact command, output tail) after every engine commit: fresh clone → `npm ci` → `npm test` → `tsc:check` → `npm run build` → `pin-watch`; manifest/CHECKSUMS regeneration + `datacheck.py`; battery/gate/fresh-clone re-runs; re-zips; hosted copies; numerals/gates re-runs; **the RUNS of items 5 and 6** (not the reading) | **Z.ai takes, no new protocol** | **LIVE NOW** — this is the biggest, cheapest win |
| **2 — exact patches under diff review** | `cite-check.mjs` from a spec; colors/ re-pin *verification* (Z.ai verifies, Claude does the re-pin); gold2/text split once the Owner rules contrast; the `go()`/router fork if ruled; `simpleRows` if ruled in; any new check Claude designs (e.g. the fence itself) | **Z.ai patches, Claude reviews the diff** | **LIVE** — per-patch: one file or ≤150 lines, written spec first, test names, fenced-path report, rollback rule |
| **3 — build-under-spec (UI-tree only)** | named Colors v1 surfaces from written briefs; Z.ai builds, seats verify, Claude reads the diff — never direct pushes to his branch | **Z.ai builds, after the framework is settled or the work is framework-neutral** | **BLOCKED on R-13** (or a framework-neutral contract) |
| **4 — never moves** | engine semantics; λ (dynamic, measurement-only; GLM default 0 until measured); protected constants and pins; the pack builder and ratings; the save envelope/schema; the unrelated-histories merge; final acceptance; every Owner-gated call | **Stays with Claude** | **PERMANENT** |

## 2 · The path fence (the safety rail — build it first)

A check that **fails any Z.ai branch that touches a fenced path**. The fence (from the published handoff doc §2):

```
colors/src/core/**
colors/src/sports/nfl/engine/**
app/saves.ts · appstate.ts · the hydrate/versions/envelope files
data/**
tools/mathlab/**
```

- **Who does what:** Z.ai implements the check; Claude designs it; a **plant-a-violation test** (plant a fenced-path touch, confirm the check fails loudly, restore) before anyone trusts it. The fence is lexical and mechanical, not aspirational.
- **Why it exists:** P-317 — a "small, anchored" task reached `saves.ts`; risk maps to paths, not labels.
- **The direct instruction to Z.ai (from Addendum B):** *"If a seat, prompt or sitting tells you to write any of these, STOP and say that path is fenced and you will not touch it."*

## 3 · The protocol — how a patch travels

1. **Spec first.** Every Z.ai patch starts from a one-page brief: input state, exact command(s), expected output, the rollback. Z.ai doesn't improvise inside a spec; if an anchor doesn't match, he stops and says so.
2. **Apply-asserted.** The anchor throws on drift; never widened silently; moved anchors are flagged.
3. **Receipts are raw stdout.** Command + working directory named; anything else is REPORTED. A hand-written summary that disagrees with the tool's output never ships.
4. **The seats verify.** Fresh extract whenever possible; label every claim; two seats' ok/improved close a round item; nothing is accepted because the author says so.
5. **The fence wins ties.** If it trips, the patch dies — no overrides except the Architect's explicit, named override recorded for the round.
6. **Rollback.** Every merged patch names its rollback (one command or one revert).
7. **No direct pushes to the Architect's branch.** Ever. Merge needs the Architect's diff read + the seats' verification + the Owner's standing gates.

## 3b · House law for Z.ai (from Addendum B — the operational rules)

- **You do not push.** Complete all work; batch into ONE zip; name every judgment call; if something doesn't anchor, STOP and say so — do not widen it to fit.
- **Receipts are raw stdout** — command, working directory, output tail. A hand-written summary that disagrees with the command's print never ships.
- **English only. Zero new text** beyond the package/w89 inventory. The w89 draft board and DRAFT button stay; **no drag-and-drop; rose/gold/white; no orange.**
- **NO GAMING THE GATE.** `gate-numerals.mjs` under the prepared tree must be run as `CP_PIN=65673a00 node scripts/gate-numerals.mjs` — the 8.1 receipts that recorded "CLEAN" ran under the default pin only, which is why it passed there. **Treat both invocations as first-class.**
- **No engine files, no pin, no flex table, no CI, no gh-pages.** If you find a defect in one of these, file an inbox note and stop.
- **P-144 Guide-graphic designs are resubmitted by VL only** (three rejected) — do not reference them, build from them, or "pick" between them; not in scope until a resubmission lands and the Owner picks.
- **If you are unsure:** ask in one sentence in your reply; we'll answer in one sentence. Don't guess into a shipped feature.

## 4 · The target: divide by INTERFACE, not task (after R-13)

Z.ai owns the **UI tree entirely** against a **view-model contract Claude publishes and freezes** (plain-TS types + contract tests); Claude reviews **contract changes**, not UI diffs. This cuts his review cost more than Tier 3.
- **Cost:** the view-model API must be frozen first; cutover needs one joint pass.
- **Prerequisite:** the framework decision (R-13), or a framework-neutral contract.
- **So:** Tier 1 + the path fence **now**; the interface approach **once R-13 rules**.

## 5 · The frozen perimeter (Claude's / the Owner's — never Z.ai's)

- **Claude keeps:** engine semantics, λ, the pack builder and ratings, protected constants and pins, the save envelope/schema, the cutover merge, final acceptance, every Owner-gated call.
- **The Owner owns:** product direction, the framework ruling (his word or the R-13 measurement at cutover), the pin activation, the labels/contrast/Bodoni/2PT/cap-70 sign, gh-pages placement, the six stats/awards rulings, Block C, 76 Pancakes shipping as one cutover, w89 staying live until then.
- **CI honesty:** green = the build gate + pin-watch self-test only, never test evidence.

## 6 · The current state (2026-11-19)

- **P-317 landed** (`06d89724`, architect head): Team Select's slot choice reaches the engine (`START` takes `pickSlot` 1–32); old saves unchanged; tests 421/421, tsc 89/89 (REPORTED). **The engine-side contract is done; the remaining piece is the cakepanz shell passing the slot through its own store — Z.ai's, not Claude's.**
- **Items 5 and 6 not started:** item 5 = the GLM-vs-pool re-run on the new baseline (Claude writes the seed/N/pack spec, Z.ai runs, Claude reads); item 6 = the λ-axis Lab (measurement only, GLM default 0).
- **Cakepanz-9 v4** (`c7c83853`, Inkling) is the sendable sitting order: Parts A (close 8.1) → B (C1/C2) → B-bis (remove the flip, uniform board) → C (Owner-approved items) → D (absorb-work answer) → E (w89 tool brainstorm, brainstorm not build). Z.ai executes; the seats verify the zip.
- **The fence is the immediate build** (Z.ai implements, Claude designs, plant-a-violation test). **Tier 1 is the immediate handoff** (per-commit receipts + the items 5/6 runs once the specs land).
- **Second opinions are in:** P-144 rejection confirmed (resubmission, not redesign); GPT's §22 confirmed 4-for-4, fold to v4 Part A, no v5.
- **Framework:** 7-8 council seats lean Svelte (55-70%), the Architect's written rec is Vue at LOW confidence, the Owner rules at cutover. Nothing ships before the ruling.

## 7 · What Z.ai does now (the Tier 1 handshake)

1. **After every engine commit:** fresh clone → `npm ci` → `npm test` → `tsc:check` → `npm run build` → `pin-watch`, filed as a receipt (cwd, exact command, output tail). This is the most load Z.ai can take off Claude today without new protocol — run it as a habit, not a per-request task.
2. **Items 5/6 runs:** once Claude's spec lands (~30 min of his time — exact command, seeds, fixed N, both packs, **receipt-excluded output path** `deliveries/receipts/`), Z.ai runs them; Claude keeps the reading.
3. **Never without a spec:** cite-check, the gates, contrast, routing, anything touching the fence.
4. **Delivery rule:** Z.ai cannot push; complete all work before the response; batch into one zip; name every judgment call; if blocked, say so and stop.

## 8 · What the next session does (this is the assignment)

1. **Evaluate z.ai's latest package** — verify the delivered bytes (pins, flex census, suites, batteries, gates, numerals under the correct CP_PIN), the Cakepanz-9 v4 parts (A/B/B-bis/C), the path-fence check (plant-a-violation), and the receipts. Label every claim VERIFIED / REPORTED / NOT RUN.
2. **Reply to z.ai with the explained handoff of work in detail** — using this document: restate the tiers, the path fence (five paths), the protocol (spec-first, apply-asserted, receipts, seats verify, fence wins ties, rollback, no direct pushes), the house law (no push / one zip / no gaming the gate / P-144 / one-sentence), what he takes now (Tier 1: per-commit receipts + items 5/6 runs), what's under review (Tier 2), what's blocked (Tier 3 until R-13), what never moves (Tier 4), and the interface approach as the target.
3. **File the review + the reply to z.ai** on `council/ernie`, commit, push.

## 8b · What the council checks when Z.ai lands (the acceptance checklist)

From Addendum B — the seats check, on the delivered zip:
1. **The 8.1 chain's receipts really are receipts** (raw stdout, cwd + command named).
2. **The fencing never touched a fenced path** (the plant-a-violation check is in the delivery).
3. **The v4 order shipped or stops honestly** where the budget closes (Parts A → B → B-bis → C → D → E, each accounted).
4. **The gate really runs CLEAN under BOTH invocations** after the work (`node scripts/gate-numerals.mjs` AND `CP_PIN=65673a00 node scripts/gate-numerals.mjs`), on both trees.
5. **Any claim in the delivery file is re-runnable by two independent seats** who cannot see Z.ai's working tree.

## 9 · Relationship to the other handoff docs

- **Inkling's Addendum B** (`council/muse:_agents/muse/deliveries/z-ai-handoff-2026-11-19.md`, tip `bdf3f735`) is the **direct, z.ai-facing read-first brief** — written to Z.ai himself ("This is for you specifically"). This document is the **strategic + operational consolidation** for the council/next session: it adds the four-tier detail, the interface approach, the frozen perimeter, the current state, and the acceptance checklist on top of Addendum B's operational rules (which are folded into §3b and §8b above). **Both are needed:** Addendum B is what Z.ai reads; this is what the next session uses to evaluate and reply.

## 10 · Provenance

- Architect's answer: `claude/absorb-work-answer-2026-11-19.md` (commit `06d8972`).
- Published handoff doc + Addendum B: `council/muse:_agents/muse/deliveries/z-ai-handoff-2026-11-19.md` (tip `bdf3f735`).
- Inkling's 4-tier ask: `council/inkling:inbox/20261119-0330-inkling-zai-absorb-claude-work.md`.
- My handoff process: `inbox/20261119-0333-ernie-handoff-process-zai-absorb.md`.
- The improved prompt: `inbox/20261119-0341-ernie-improved-prompt-and-seat-review.md`.
- Cakepanz-9 v4: `council/inkling:deliveries/zai-cakepanz-9-2026-11-19.md` (`c7c83853`).

No engine file, pin, flex row, or protected constant touched — this is a process reference.