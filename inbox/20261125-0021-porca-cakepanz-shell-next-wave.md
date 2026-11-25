SPEAKER: porca | ROLE: council seat (advisor/brainstormer) | TASK: Owner's 2026-11-24 ask — further implications and fresh ideas for the Cakepanz UI/UX shell over Claude's engine | DATE: 2026-11-25T00:21Z
FOR: R-13 (framework decision context, closed) · P-368 (engine/shell neutrality) · Owner task 2026-11-24
IDEA: advisory only — no product, engine, pin, governance or tools bytes changed; no build, no assignment

## 0. Grounding and non-duplication

Grounded in the published folder `zai-s17-closeout-continuation-2026-11-24` on `council/porca` commit `097f38bee` (receipts in `inbox/20261125-0021-porca-zai-s17-continuation-review.md`). I **do not repeat** the 2026-11-23 filing's A–F ideas (proof strip, receipt drawer, pick-confidence rail, why-this-pick card, undo rail, needs filter, keyboard/390px/touch contracts, one-brag-formatter, save provenance, restore diff, generated handover, receipt schema, change badges, token snapshot tests) — they remain on file and several were implemented this sitting. What follows is a **next wave** aimed at the gap the new bytes expose: the shell now has excellent *build-time* receipts but almost no *in-product* explanation of where a number came from or what would have happened otherwise.

Svelte facts used below are VERIFIED from the official MCP docs fetched this sitting: `$derived` / `$derived.by` must be side-effect free and are recomputed lazily on dependency change; `prefersReducedMotion` is exported by `svelte/motion` (since 5.7) and the shipped `svelte ^5.57.3` satisfies that.

## 1. Implications first (I)

1. **The seam is now the product's rarest resource.** The engine snapshot is byte-proven against `408410477` and the shell's VM layer is framework-blind (VERIFIED by pin diff and the node battery's N16 law). Every attractive UI idea must spend that resource carefully: read the VM, never recompute engine maths in a component, never edit the engine to fit a layout.
2. **Receipts have become load-bearing but invisible.** `claims.json`, the seal and the non-vacuity markers are the shell's credibility machinery; today a player sees none of it. That is fine for a consumer product, but the moment a share/brag or a restored save is involved, trust should be visible without exposing a dev console.
3. **The framework ruling and the shipping shell have diverged.** R-13 is closed at Vite 8 (Owner, 2026-11-19; `colors/package.json` is `^8.3.6`), while Cakepanz ships `vite ^7.3.6`. The migration plan filed this sitting is therefore not cosmetic: it is the last known build-tooling drift before cutover. UI work that assumes Vite 7 behaviour should be avoided.
4. **Stale prose is a recurring defect class; generated surfaces are the cure.** The new claims gate caught two honest-but-wrong statements in its author's own docs. The same generation discipline should reach anything the user can see.

## 2. Next-wave ideas (I — design proposals, not accepted)

### N1. One generated "Seam Card", reused by the gate and the UI (highest leverage)
Compile `claims.json` + the engine-pin receipt into a tiny generated module (`seam-card.json`: pin, engineVersion(), flex-table hash, VM shape version, seal count, claims phase status). The packaging/acceptance gate reads the same file the UI does. A small footer chip shows "Engine 408410477 · seal 374 · claims 25/25" and expands on focus. **Why new:** it closes the loop between the T2 protocol and the visible product, so a claim can never be green in docs and stale in the UI. **Guard:** the chip is derived, never hand-typed; a missing field renders `UNKNOWN`, not a green default. Svelte fit: one `$derived` from the generated module in `bindings/`, no `document` or framework import in `src/lib` (respects P-368).

### N2. Number-provenance inspector (anti-invented-data)
On focus or long-press, any displayed rating, wins delta or gone% opens a neutral card: *value → source function → engine pin → inputs → rounding*. All strings come from generated metadata; if a value is UI-only (e.g. a label), the card says so. **Why new:** §7 of the project rules forbids invented factual data; today the user cannot audit a number at the point of use. This turns the rule into an interaction. **Guard:** no new maths in the UI; the inspector restates VM fields, it does not recalculate them.

### N3. Counterfactual draft replay ("what if I had picked…")
After the draft, a step slider replays the seeded run; at each pick a second lane shows the top alternative and the engine's measured delta from the frozen replay. Read-only by construction — replay produces a new immutable array and the live store is never written. **Why new:** the shell currently explains a pick but never shows the road not taken, which is exactly the "why did I lose" question the calibration notes raise. **Guard:** `$derived.by` over immutable replay data (side-effect free per the docs), no RNG re-draw, no change to the live save.

### N4. Team-theme synthesizer with a published contrast table
One function derives the near-white team tint, text gold/deeper-gold pair and logo treatment from the Owner's 32-team three-hex table; emit a 32-row before/after contrast receipt at build time. Dark teams (Patriots/Ravens/Titans/Rams) get a documented tone-lift rule; logos never get an invented bubble. **Why new:** P-185's contrast problem is structural, not a per-team patch, and the receipt makes the shell's biggest visual law testable. **Guard:** the three hexes are the Owner's authoritative data; no invented colour.

### N5. Guided first draft, progressive disclosure
First run: one decision at a time (team → pick slot → first pick → first flex), each with one plain sentence and an inline glossary term, then it disappears. No guide on the home page (Owner's ruling); it lives inside the draft surface. Resume/skip is explicit. **Why new:** the existing Guide work is a reference document; this is a *first-run sequence* that teaches by doing, which the current shell lacks. **Guard:** reduced-motion parity via `prefersReducedMotion`, no new text on the home page, no engine advice invented by the UI.

### N6. Pace contract for the game cinematic
Expose the Owner's 30–60 s window as one named pace value with a user preference (Slower / Standard / Faster) clamped to that window; use `Tween`/`Spring` with `prefersReducedMotion` so the reduced path keeps information but drops movement. Skip stays hidden until the end; every turnover and the game ball still appear. **Why new:** the animation work is present, but the *duration law* is not a user-visible, testable contract. **Guard:** clamp in one place; a battery asserts the duration range and the reduced-motion branch.

### N7. Receipt-to-UI compiler as a cutover gate
Before cutover, generate a one-page "shell proof" from the same files the acceptance composite writes, and make its presence part of the cutover manifest. The page states exactly what the shell is: engine pin, framework version (Vite 8 after migration), data files included/excluded, which claims passed, which are UNKNOWN. **Why new:** the cutover is the riskiest irreversible step; a generated proof page gives the Owner one artifact to read instead of five sitting folders.

## 3. Ranking (my call, reversible)

1. **N1 + N2** — small, high leverage, no engine risk, and they directly defend the project's two hard rules (no invented data; receipts must match bytes).
2. **N4** — fixes the most visible Owner complaint with a reproducible table.
3. **N3** — highest delight, highest care; only after N1/N2 make provenance trustworthy.
4. **N5, N6, N7** — N5 and N6 are UX polish with clear guards; N7 is process, valuable only when cutover is near.

## 4. What I did not do

No code was written, no mock-up was opened, no dependency was changed, and no item was assigned to a seat. Per the brainstorming workflow, the description above is a proposal for the human partner to react to, not an approved design; the open question is at the end of my reply.
