SPEAKER: glyph | ROLE: council | TASK: CAKEPANZ-SHELL prompt for council (assist neutral UI/UX shell + Claude engine merge) | DATE: 2026-11-16T20:23:30Z
FOR: CAKEPANZ-SHELL (P-316, P-317)

## Prompt (for council — assist Z.ai shell + Claude engine merge, framework-neutral)

```text
Council request (Owner ruling, 2026-11-16): **TypeScript-neutral until the last second.** No framework chosen; work is framework-neutral until handoff. Goal: enable Z.ai to deliver a complete, integration-ready 67 Cakepanz UI/UX shell so Claude (Architect, engine owner) can merge the pinned engine into it cleanly. Assist in any way that is useful and allowed.

## How to help (pick up work via `node tools/council.mjs next` / queue; do not wait for assignment)
Contribute via your own branch and `inbox/<UTC>-<seat>-<slug>.md` (one item per file, include `FOR:`/context, label VERIFIED/REPORTED/INFERRED/UNKNOWN, include evidence/commands where run). High-value contributions:

1. **Engine↔UI integration contract (§5 proposals / snippets):** typed adapter interfaces (inputs/outputs/commands/events), DTOs, error/loading states, hydration & save/offline schema proposals, fixture shapes — all engine-versioned against pin `d3bd81d2` as known (cite source). Goal: make Claude’s merge a wiring task.
2. **Shell specs & acceptance criteria:** screen/flow/state definitions for remaining Cakepanz slices (3 hydration+board chrome, 4 feed, 5 shareables) and P-317 Team Select revision; edge/empty/error states; 390 px and offline requirements.
3. **Framework-neutral implementation assets:** plain TypeScript view-model/shared-layer snippets, selectors/formatters, state-transition logic, and testable fixtures/probes (no framework imports) that Z.ai or Claude can drop in.
4. **Design & UX support:** token/palette/WCAG/contrast analysis with concrete fixes or options (flag items needing Owner ruling), layout/copy checks against style law, mockups/measurements, accessibility notes.
5. **Verification & QA:** node-side truth fixtures, probe/battery/DOM-fidelity contracts, gate scripts/checks, merge-risk reviews of shell deliveries, regression checks, and reproducible receipts.
6. **Reviews:** review existing/relevant inbox items and deliveries (three-seat review chain); improve proposals with exact anchors/snippets and HOW TO CHECK; call out merge risks, hidden engine coupling, or framework lock-in in shell work.
7. **Decision support:** compare remaining options only where evidence exists (e.g. contract shapes, risk, effort) — do not re-litigate settled items; surface blockers needing Owner/Architect ruling with a recommended default.

## Constraints
- Only the Architect builds/edits the engine and `colors/` engine source; do not touch `flex.json`/engine logic. Z.ai owns 67 Cakepanz UI/shell builds; council contributes proposals, specs, snippets, fixtures, and reviews (do not overwrite others’ work).
- Framework-neutral by rule: no advice or artifact that forces a Vue/Svelte choice unless explicitly labeled a handoff-time option. Prefer plain TS contracts/core.
- No invented data/ratings; no injuries. Label claims; receipts for runs. Never assign work to a named seat; take the next useful item and/or post actionable inbox help tied to this effort.

## Suggested tags/refs
Use `FOR: CAKEPANZ-SHELL` (and link `P-316`, `P-317`, or relevant queue IDs) in inbox filenames/bodies so work is discoverable (e.g. `inbox/<UTC>-<seat>-CAKEPANZ-SHELL-<slug>.md`).

State in each contribution: what it unblocks for Z.ai’s shell or Claude’s merge, the exact artifact, and how to verify/apply it.
```
