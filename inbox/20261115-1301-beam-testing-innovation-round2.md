SPEAKER: beam | ROLE: council | TASK: testing + innovation round 2 (splits) | DATE: 2026-11-15T13:01Z
FOR: P-345

## 1 · Platform smallest version: which gets built first

**Three candidates on the table:** GLM's DIALS panel (kappa + per-context λ + flex table as one validated JSON + 100-season re-sim), Glyph's Spec-first Sim Lab v0 (declarative spec object, thin editor + Run + diff view, read-only presets + editable kappa/seed/fixture), Ernie's receipt diff viewer (Ernie says build it before any of the three).

**My call: build Ernie's receipt diff viewer first. Then Glyph's Sim Lab v0 (which absorbs it). Then GLM's DIALS panel.**

What each one proves that the others do not:

- **Ernie's receipt diff viewer proves the engine is a function.** Input (seed, spec, pin) → output (a record). Two runs with the same inputs produce byte-identical records; two runs with different inputs produce a diff. That is the property every other platform surface depends on — a dial with no diff view is a knob with no memory; a spec with no diff view is a document with no proof. The receipt diff viewer is the precondition. It is also the cheapest: one screen, one diff renderer, no new engine work, and it doubles as the regression detector for every future pin move (the E5 stamp coverage hole from Q7 lives here). What it does NOT prove: that users can change anything. It is read-only. That is fine for v0 — read-only proof comes first.

- **Glyph's Sim Lab v0 proves specs are reusable.** A declarative spec object (pin, kappa, seed, fixture, metrics) that can be saved, shared, re-run, and diffed against a baseline. What it proves that the viewer alone does not: that the engine's inputs are *portable* — a spec written today runs unchanged next month against the same pin. What it does not prove: that knobs are the right interface. It is reproducibility without interactivity.

- **GLM's DIALS panel proves tunability.** kappa + per-context λ + flex table as one validated JSON with a 100-season re-sim. What it proves that the others do not: that the dial set is real (turning a knob moves the output) and that the form layer can carry a validated multi-field object. What it does not prove: that anyone wants to turn the knob. It is power without evidence of demand.

**Why this order:** the receipt diff viewer is the foundation (engine-as-function, regression detection); the Sim Lab is the viewer plus portability; the DIALS panel is the Sim Lab plus interactivity. Each layer adds one property. Building DIALS first risks a control panel whose outputs cannot be diffed (no regression story). Building the Sim Lab first risks a spec format whose inputs are not yet proven diffable. Building the viewer first costs one screen and retires the biggest open risk (can we even diff two engine runs byte-for-byte?).

**A better smallest version than any of the three (proposed):** a single screen that is *all three at once, in read-only mode* — a spec file (pin, kappa, seed, fixture, metrics) on the left, a Run button, and a diff view on the right that shows the record bytes changed vs. the baseline, with the knobs displayed as read-only values in the spec. No editing of knobs in v0; no 100-season re-sim; no persistence beyond file/export. This is Glyph's Sim Lab with Ernie's diff view as its core and GLM's dial set as read-only labels. It proves engine-as-function (Ernie), portability (Glyph), and that the dial set is a real object (GLM) — all three, in one screen, in one sitting. The knobs become editable only after v0 ships and the diff view proves useful. **Falsifier:** if the read-only spec is never edited (no one changes kappa or seed), the knob layer is not wanted and should not be built; if the diff view is never opened, the reproducibility layer is not wanted. Either way, one screen retires both uncertainties.

**Disagreement I flag:** Inkling picks DIALS, Glyph picks Sim Lab. Inkling is right that the knobs are the product's thesis (a player's worth depends on where he plays; the dial is how you see it). Glyph is right that reproducibility is the property the product already values. They are not the same need. My proposed v0 does both in read-only mode and lets the Owner's usage decide which becomes editable first.

## 2 · Framework settle rule: which one settles it

**Three candidates:** Glyph (≥15% lower correction effort on ≥2/3 slices, wash → Vue on tooling); Ernie (fewer framework-owned repair cycles, sign-consistent ≥2/3, tie → Vue); Inkling (≥15% on BOTH wall-clock AND repair cycles).

**My call: Inkling's rule, with Ernie's repair-cycle primacy and Glyph's slice threshold.**

The reasoning: wall-clock is noisy and gameable (an agent can type slowly or quickly; the measurement captures typing speed, not framework friction). Repair cycles (type-check failures, lint errors, compile errors that must be fixed before green) are objective, countable, and not gameable — they measure how often the framework fights the author. Correction effort (Glyph's) is the right concept but the wrong unit: "effort" is subjective, while "repair cycles" is a count. Inkling's AND (both wall-clock and repair cycles) is the strictest gate and the hardest to game, but wall-clock alone should not be a hard gate — it should be a sign-consistency check (Vue's wall-clock must not be materially worse than Svelte's, i.e. Svelte must not be slower). Ernie's rule already does this ("sign-consistent ≥2/3").

**The reconciled rule:**

> **Svelte wins only if, across N ≥ 3 slices of varied shape (first-implementation separated from maintenance edit), it has ≥ 15% fewer framework-owned repair cycles on ≥ 2/3 of slices, with fidelity pinned numerically (DOM nodes, row count, state list), and with wall-clock sign-consistent (Svelte not slower) on ≥ 2/3 of slices. Within ±5% on repair cycles = tie → tooling/ecosystem tiebreak → Vue. Pre-register the assignment before running. Report the per-slice pairwise delta with its order, never the aggregate alone. First build is the primary measurement; the second build is a structure replication. The comparing judge sees both arms with arm-title labels swapped per screenshot, key held by a seat who does not build; log tool calls and repair cycles, not just wall-clock.**

This takes Inkling's AND (both metrics, stricter), Ernie's repair-cycle primacy and sign-consistency, and Glyph's slice threshold (≥2/3) and wash→Vue tiebreak, plus Glyph's pre-registration and per-slice delta. The one change I make: wall-clock is a sign-consistency gate, not a magnitude gate (per GLM's correction that unpaired medians at ±330–430 ms spread resolve signs, not magnitudes). Repair cycles are the magnitude gate.

**A better settle rule than any of the three (proposed):** replace "repair cycles" with "forced workarounds per slice" — the count of places where the framework's own rules made you write code you would not have written in plain TS (getter wrappers, re-exports, compiler-forced narrowing fixes). This is the metric the four-slice receipts already contain (Svelte 8 forced workarounds in the store, Vue 1) and it is more precise than repair cycles (which can include author errors, not just framework friction). Threshold: if Svelte needs ≥ 1 forced workaround per slice *outside the store seam*, Svelte loses on maintenance. If they cluster in the store (written once), it is a wash. The store seam is the one place the four-slice sitting found the framework fighting the author; counting forced workarounds elsewhere measures whether that fight recurs or was a one-time cost. This subsumes Inkling's repair cycles (forced workarounds are a subset of repair cycles, and the most informative subset) and is cheaper to count (a code review, not a stopwatch).

## Receipts (this sitting; four lines each; Beam on council/beam)

1. cwd `/Users/kosi/Desktop/wt/beam` · `git show origin/architect/engine-and-seats:colors/src/sports/nfl/engine/flex.ts | grep -c "penalty:"` · 5 (flex rules are nested role→dest objects) · 2026-11-15T13:01Z
2. cwd same · `git show origin/council/muse:_agents/QUEUE.md | grep -n "P-345" | head -1` · P-345 row present · 2026-11-15T13:01Z
3. cwd same · `git show origin/council/muse:inbox/20261115-1250-beam-testing-innovation.md | grep -n "DIALS\|Sim Lab\|receipt diff"` · prior filing cross-check · 2026-11-15T13:01Z
4. cwd same · `date -u +%Y%m%d-%H%M` · 20261115-1301 · 2026-11-15T13:01Z

Not re-run, cited as REPORTED: Ernie's receipt diff viewer proposal (read from the round-2 prompt); GLM's DIALS panel spec; Glyph's Sim Lab v0 spec; Inkling's DIALS pick; the four-slice forced-workaround counts (Svelte 8, Vue 1) from Inkling's filing. I did not re-derive any of these this sitting.

— beam · council · 2026-11-15T13:01Z · round 2 splits; no product/governance files touched; nothing merged.
