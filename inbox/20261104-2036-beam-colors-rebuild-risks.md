SPEAKER: BEAM | ROLE: Council Advisor | TASK: Colors rebuild risks | DATE: 2026-11-04T20:36Z

FOR: Colors rebuild (architecture decided)

VERDICT: proceed with conditions — the four open questions are the real work; the decided parts are sound

## 1. Handoff risk: where Claude-light → Z.ai-heavy breaks down

The likely failure mode is not code quality; it is *implicit contract drift*. Claude writes view-models for engine internals and assumes Z.ai will call them the same way he would. Z.ai, with no engine intuition, will either (a) reach past the view-model into engine internals because the view-model doesn't expose what the screen needs, or (b) duplicate logic in the component because the view-model's return shape is awkward. Both produce the 3-layer debugging the "no adapter" decision was meant to avoid.

Specific gaps Claude must close before Z.ai starts a screen:
- A written contract per view-model: inputs, outputs, invariants, what is NOT guaranteed (e.g. does draftBoard expose pick order or only ranked players?). Without this, Z.ai guesses.
- Error/empty states: what does draftBoard return when the user has no team picked yet? Undefined? Empty array? A discriminated union? Z.ai needs the contract, not the happy path.
- Async boundaries: which calls are sync (pure engine) vs async (storage, RNG-seeded sim)? If mixed silently, Z.ai will await things that don't need awaiting and forget to await things that do.
- State ownership (see §3): who owns "current team", "current week", "selected slot"? If undefined, Z.ai invents per-screen state and the app fragments.
- A reference screen built by Claude first (one screen, fully wired, with tests) beats any document. Z.ai copies the pattern; divergence is then a diff, not a design.

INFERRED: this is the standard failure mode of "architect light, execute heavy" splits; the repo's own history (w68's scattered globals) is the evidence that nobody currently owns this.

## 2. What's hiding in w68 (tech debt that looks like a feature)

Things that work in the 1.78MB single file but will not survive a port cleanly:
- State lives in globals and render closures: seasonState, draftSim, current week, selected team. These are read by dozens of functions via closure scope, not via a store. Porting means either lifting all of them into a store (large, easy to get wrong) or keeping globals (defeats the architecture). This is the biggest hidden cost.
- Scattered localStorage calls (zpb:st:*, zpb:tab, zpb:base34, profile, stats) with no central accessor. The storage layer (ZPBStorage) exists but call sites bypass it in places. A port that centralises access will find call sites that read/write raw keys.
- Animation timing coupled to render: the 0.6s card clock, the dfc-base delays, the cinematic beats. These are CSS animation-delay driven by render order and DOM measurement. In a component model, render order is not deterministic the same way; the timing will drift unless explicitly sequenced.
- DOM-measurement hacks (fitFace, the footer-height clamp, the infinite-scroll sentinel colspan count). These are fragile by construction and will break when the DOM structure changes during porting. Each must be re-verified, not assumed.
- Inline CSS with wave-number comments (w57, w65, W67) — the styling is a palimpsest. A port that "keeps the same look" must extract the effective (latest) rule per selector; the earlier rules are dead but still present and confusing.
- The single file's load order matters: scripts are appended and share scope. Splitting into modules will surface load-order dependencies that are invisible today.

REPORTED: the storage layer and view-models (view/draftBoard.ts, view/roster.ts) exist on the architect branch; whether they cover the screens is unverified (open question in the prompt).

## 3. The gap nobody owns: app state

This is the most important open item and it is currently unassigned. The engine is pure (functions in, results out) but the app needs memory: selected team, draft position, current week, standings, roster view, save slot. In w68 this is tangled into UI code. If Z.ai builds screens without a designated state owner, you get per-screen state and inconsistent patterns from day one.

Recommendation: Claude designs the state shape and access pattern (even if lightweight) before Z.ai builds the first screen — not a full store architecture, just: which values are app-level vs component-level, where they live (a single root store), and how components read/write them. This is a 1-day decision, not a build. It is the highest-leverage thing Claude can do with limited usage.

INFERRED: the "no adapter" decision makes this more urgent, because without an adapter layer there is no natural place for app state to hide — it must be explicit in the component tree or a store.

## 4. Testing the rebuild: functional parity, not just visual

Visual parity (screenshots vs w68) catches layout regressions but not logic regressions. Needed:
- Golden-file tests for sim outputs: run the engine on a fixed seed/team and compare the resulting standings/scores to w68's output. This is the strongest correctness signal and the RNG injection task (T-20261022-claude-2) exists for exactly this.
- Save/load round-trip tests: save a slot, reload, assert equality. The envelope contract makes this testable; without it, migration (even "no migration") is unverified.
- Draft logic tests: given a draft order and CPU bias, assert picks. The engine already has cpuPick/cpuBias; the rebuild must not regress them.
- A smoke test per route (does the page render without console errors at 390px) — this is the existing gate, keep it.
- What NOT to test: pixel-perfect screenshots (brittle). Test structure and data, not pixels.

## 5. Portfolio lens (sports-gaming employers)

Stands out:
- Pure engine with documented invariants (modelWeights ↔ slotWinsPerOvr contract, protected constants with hashes).
- Envelope save contract with validation and typed load results.
- Multisport namespacing with a tested migration.
- Evidence-labelled council process (VERIFIED/REPORTED/INFERRED) — unusual and impressive if shown as a case study.

Looks amateur if:
- No tests visible in the repo (even a small test suite signals engineering maturity).
- No CI (lint/typecheck/test on PR).
- No README explaining the architecture and how to run.
- Single-file or no-build (already being fixed).
- Magic numbers and wave-commented CSS without explanation.
- No accessibility (keyboard nav, contrast, reduced motion).

Recommendation: a short ARCHITECTURE.md + a test suite that runs in CI is worth more than any feature. Sports-gaming employers hire for systems thinking; the engine's purity and tests demonstrate that.

## 6. What's missing (questions nobody's asking)

- Who owns the design system? w68's theme is a palimpsest of wave overrides. A rebuild needs a single source of truth for tokens (colors, spacing, type) or the port inherits the mess. Figma (available to Claude) should produce the token set before code.
- Accessibility: w68 has no reduced-motion honouring in many places, no keyboard navigation on the draft board, unknown contrast. A portfolio piece reviewed by employers will be checked for this.
- Performance budget: 1.78MB was rejected; but a Vite build with unoptimised assets can still be heavy. Set a bundle budget (e.g. <200KB initial) and measure.
- Error boundaries: what happens when a save is corrupt, storage unavailable, or a sim throws? w68's answer is "show nothing". A real app needs graceful degradation.
- Offline: does the app work without network after first load? (It should, since it's client-side.) Verify in the build.
- The "no migration" decision assumes no real users. Correct for now, but if the portfolio piece ever gets shared publicly, old saves from w68 (envelopes, but with engineVersion 'zpb-w65') will load as "newer-version" or corrupt under the new engine. Document this as a known limit, not a surprise.

## 7. Concrete asks for Claude (actionable, small)

1. Publish the view-model contract (inputs/outputs/invariants) for view/draftBoard.ts and view/roster.ts before Z.ai builds a screen on them. Include empty/error returns.
2. Decide app-state ownership (root store shape + access pattern) in writing. One day.
3. Build one fully-wired reference screen with tests; Z.ai mirrors it.
4. Produce a token set (Figma) and an ARCHITECTURE.md before the first Z.ai screen.
5. Add CI (lint + typecheck + tests) to the new repo from commit one.

EVIDENCE: INFERRED (architectural reasoning from repo structure and AGENTS.md rules); REPORTED where citing existing files (view-models, storage layer, T-20261022-claude-2). No code was run.
