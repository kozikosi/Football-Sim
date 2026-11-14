SPEAKER: glyph | ROLE: seat (prompt / handoff to Z.ai) | TASK: Long-form execution prompt — BENCH-1.5 “W89 Cinematic Pick Reveal” (Vue `@vueuse/motion` vs Svelte 5 built-ins) | DATE: 2026-11-14T06:55Z
FOR: Z.ai (primary executor). Also for Owner/Architect/seats (scope reference, review). No framework verdict/ranking/winner is requested from glyph; this prompt asks for measured facts, receipts, and evidence.

# PROMPT FOR Z.AI — BENCH-1.5: “W89 Cinematic Pick Reveal” (Deep Build + Test)

> **Operating assumption for this run:** Think and work for **at least 30 minutes** before producing your final reply. Use that time to read context, inspect the baseline arms, plan, explore multiple implementation avenues, prototype, measure, iterate, fix, and document. Do **not** rush to the first plausible answer. Your final output should show evidence of sustained exploration (alternatives considered, dead ends/errors if any, iterations, measurements, and receipts), not just a single happy-path snippet.

---

## 0) Mission

Design, implement, and rigorously test **one bounded, high-polish UI feature** on top of the **BENCH-1 corrected draft-board baseline** in **two arms**:

1. **Vue 3 + Vite arm** — implement the feature’s motion/choreography using **`@vueuse/motion`** (Vue-only package) as a meaningful part of the solution.
2. **Svelte 5 + Vite arm** — implement the **same behavioral and visual acceptance checklist** using **Svelte 5 built-in capabilities** (`svelte/transition`, `svelte/animate`, `svelte/motion`, `svelte/easing`) and/or plain CSS/keyframes, with **no `@vueuse/motion` and no Vue packages**.

**Research question (factual):** For this specific w89-style cinematic feature, is the Vue + `@vueuse/motion` path materially easier, faster, clearer, or more maintainable to implement than the Svelte 5 built-ins path — **while still capturing the essence of w89’s style** — and at what runtime/quality tradeoff? Report measured evidence (time-to-green, iterations, LOC, dependency/build impact, console/correctness, perf deltas, style-parity checklist). **Do not claim an overall framework winner;** report what you observed for this feature.

**Non-goals:** No engine/math changes. No edits to product HTML. No new product features beyond this reveal. No framework ranking/verdict. Do not regress BENCH-1 correctness (G5) or console cleanliness.

---

## 1) Context you must internalize before building

### 1.1 Baseline and prior results (VERIFIED/REPORTED refs — treat as context; re-verify what you rely on)
- **BENCH-1 run v1 delivery (glyph):** `_agents/glyph/deliveries/z-bench1-run-v1/` (published on `origin/council/glyph`, commit `177cf8c9` in glyph’s lane context). Glyph review: `inbox/20261114-0635-glyph-review-z-bench1-run-v1.md` (VERDICT improved).
  - Arms: `arms/arm-vue-pub/`, `arms/arm-svelte-pub/` (each with `receipt.json`, `package.json`, `src/App.vue` / `src/App.svelte`, `src/main.ts`, `tests/board.spec.ts`, playwright configs, etc.).
  - Vendored engine/shared: `engine/src/` copied into arms (receipt: `arm-vue-pub/engine/src` sha `40695fe4...`, `arm-svelte-pub/engine/src` sha `3f2bd80e...` per delivery manifest context) — **preserve engine behavior; do not modify engine math/logic**.
  - **Corrected wiring (critical):** Vue board ref uses `shallowRef` for large array (`src/App.vue` ~L12 per receipt); Svelte board state uses `$state.raw` (`src/App.svelte` ~L11). Preserve this discipline; do not introduce deep-reactive churn on hot board paths.
  - Dataset: `data/r-20-20.json` sha256 `e583aec0d21078e8827d7a1efdc5c8c1e06ae518ca783ebb4b3cdfd3b2dcf2d3`.
  - Tier 1 ×3: 104/104 gates pass, all 22 hashes identical, vendor digest `432a1701744b91fc92f807931d789cf49a8daf0da529298f0013898f195e272d`.
  - Tier 2 ×2: G5 600/0/0, console errors empty; engine 57/57 and shared 3/3 identical across arms. Run 2 corrected-wiring parity achieved vs run 1 deep-ref gap.
  - **Key perf finding:** board cost is **binary on replay window / `goneOdds` position in round** (engine-side), not “grows with picks made”. Early user picks (large CPU replay window, ~31 CPU picks × ~30 sims) can drive `selectBoard` ~1.3–2.5 s; late picks (replay window ~0) ~0.3–2.5 ms. **Do not attribute engine `goneOdds` cost to UI animation.** Isolate UI/animation impact (pick-commit → overlay shown → dismissed → next-interactive) and report separately from engine compute.
  - Caveats noted in run v1: A2/FF-WK/lanes B–F/watchlist NOT RUN in that delivery; W1 reporting split note — you are not required to run those unless you choose to extend coverage, but **do not claim them**.

### 1.2 Style anchor — “essence of w89” (VERIFIED cues from local `Football-Sim-Z-post-blue w89.html`)
Capture the **essence/feel**, not a pixel-perfect clone of unrelated screens. Read/inspect w89 if you have it; if not, use these cues as your north star:
- **Typography/headline drama:** Cinzel / Cinzel Decorative-style display treatment appears in the project’s cinematic language (used tastefully for emphasis/headlines; readable hierarchy). Pair with clean UI sans for body/details. Ensure fallbacks.
- **Gold/foil palette & shine:** rich golds/creams/amber highlights (e.g. `#ffc43c`, `#ffd75e`, light cream washes) with metallic/foil gradient sweeps. `@keyframes fxshine`-like background-position shine animation over gradients.
- **Reveal/pop/toast motion:** `@keyframes fxpop` style entrance (scale up from small with opacity, slight overshoot/settle, hold, then gentle fade/translate out) and `@keyframes fxtoast` style slide/fade patterns; confident, celebratory, but not chaotic.
- **Glow/halo accents:** subtle gold glow (`fxglow`-like box-shadow pulse) used sparingly for emphasis.
- **Glassy/panel depth:** panels/cards with dark/translucent surfaces, soft borders/radii, layered depth over the board — cinematic overlay that still feels part of the sim.
- **90+/highlight language:** gold-wash emphasis for notable values/tiers in places (e.g. `sf90`-like treatment) — optional if it fits pick context.
- **Cinematic pacing:** a **brief, intentional hold** (a “linger” moment) so the pick feels like an event; clear visual hierarchy (what was picked, by whom/when in draft context) readable at a glance.
- **Team-accent friendliness:** where team color/context is available, it can harmonize; do not require it.
- **Restraints:** plain informative language in any copy; no gratuitous clutter; must work at 390px width without horizontal scroll regressions; must support **skip/dismiss** and **`prefers-reduced-motion`**.

You may extract/adapt specific keyframe ideas (timing curves, scale/opacity choreography) to honor the essence, but implement cleanly in each arm’s idiom.

### 1.3 Project/engineering constraints (respect these)
- Framework scope for this test: **Vue 3 + Vite** vs **Svelte 5 + Vite**. Engine is framework-neutral plain TS — untouched.
- Preserve BENCH-1 corrected store/wiring patterns (no deep-reactive board arrays).
- **G5 correctness must remain intact** (600/0/0 parity/board sanity as in bench1 protocol, or equivalent receipted proof). **Zero console errors** in measured runs.
- **390px:** no horizontal scroll introduced by the overlay on the board view. **Reduced motion:** honor `prefers-reduced-motion` (suppress/shorten non-essential motion, preserve information and flow). **Skip/dismiss:** user can dismiss instantly; auto-dismiss after a recorded hold.
- Receipts discipline: label claims **VERIFIED/REPORTED/INFERRED**; include commands, key outputs, hashes where relevant, screenshots/logs.

---

## 2) The feature: “Draft Pick Reveal” overlay (bounded spec)

### 2.1 Core behavior
When the **user commits a pick** in the draft-board flow (the same Tier 2 interaction path used in bench1 run v1), present a **transient cinematic reveal** communicating the pick, then return control to the draft flow.

**Must show (minimum, if available from state):** round, pick number/slot, player name, position (and team/OVR/other available context if cheap and clear). Information must remain understandable with motion disabled.

**Lifecycle states to handle:**
- **Hidden/idle** (no active reveal).
- **Enter/reveal** (cinematic entrance with w89-style motion).
- **Hold/linger** (brief, intentional pause — record the duration constant, e.g. propose/tune ~900–1800 ms total including enter as appropriate; justify).
- **Exit/dismiss** (graceful exit) — triggered by **auto-timeout**, **explicit user skip/dismiss** (click/tap, key like `Escape`/`Enter`/`Space` as appropriate, or a visible control), or **reduced-motion fast path**.
- **Interrupted/edge flows:** user attempts to proceed quickly; ensure draft state remains correct and overlay does not trap or desync. (If rapid successive user commits are impossible in this flow, state that; still be defensive.)

### 2.2 W89-style direction (apply with taste)
- **Composition:** a focused card/overlay (not necessarily full-screen, but cinematic) layered above the board with backdrop treatment consistent with w89 glass/panel depth.
- **Headline moment:** the picked player/name (and/or pick callout) gets Cinzel-style display emphasis + gold/foil/shimmer treatment evocative of w89.
- **Motion choreography:** staged entrance (e.g. backdrop fade/blur-in, card pop/scale-settle, shine sweep across foil text/border, subtle glow) — coordinated, not random. Exit clean and quick.
- **Color/material:** gold/foil gradients, controlled shine sweep, readable contrast on dark/glass background. Optional team-accent tint if data exists.
- **Copy tone:** plain, informative (e.g. “Round 1 · Pick 12”, player name/position) — no hype fluff.

### 2.3 Accessibility & responsiveness (required)
- `prefers-reduced-motion: reduce` → no essential reliance on motion; use instant/subtle fades or static reveal with same info and dismissibility.
- Skip/dismiss is always available and obvious enough; keyboard operable where reasonable.
- Overlay does not create horizontal scroll at **390px** viewport; content reflows/truncates gracefully.
- Focus management: do not strand focus; if focus moves into overlay, restore sensibly on dismiss (document choice).

### 2.4 Correctness invariants
- Triggers only on actual user pick commit (not spurious renders).
- Shows the **correct** pick data for that commit.
- Does not duplicate/conflict with existing UI feedback; does not break pick flow, board updates, or subsequent interactions.
- **G5/board sanity and zero console errors preserved** (receipt-backed).

---

## 3) Implementation avenues to explore (do not limit yourself to one — investigate, compare, then choose with rationale)

You must **explore multiple avenues** before settling. Document what you tried/considered, why chosen/rejected, and tradeoffs.

### 3.1 Motion/choreography strategies — Vue arm (`@vueuse/motion` required, used meaningfully)
Explore and evaluate options such as:
- `v-motion` directive with declarative variants (`initial`, `enter`, `leave`, `visible`) vs `useMotion` composable for programmatic control.
- Spring/physics-style motion vs duration/easing keyframes; coordinating multiple elements (backdrop, card, headline, shine layer) — staggered delays, variant orchestration.
- Integration with Vue `<Transition>` / `<TransitionGroup>` for mount/unmount presence vs motion-only visibility toggling.
- Reusable motion presets (w89 “pop”, “shine sweep”, “linger”) as constants/composables.
- Event/timeline sequencing: enter → shine → hold → exit; interrupt/cancel on skip; ensuring timers/animations clean up on unmount or rapid state change.
- Performance-conscious choices (transform/opacity, `will-change` used judiciously, avoid layout/paint-heavy properties).

**Requirement:** `@vueuse/motion` must materially participate (not just installed). Also record if you needed `@vueuse/core` and why.

### 3.2 Motion/choreography strategies — Svelte 5 arm (built-ins only)
Explore and evaluate options such as:
- `transition:fade|fly|scale|blur` and `in:`/`out:` modifiers, custom transition functions for w89-like pop/overshoot.
- `svelte/motion` (`tweened`, `spring`) for values (scale, opacity, glow intensity, shine offset) and/or CSS-driven keyframes/class toggles.
- `svelte/easing` for cinematic curves; sequencing via reactive state, `onintroend`/`onoutroend`, chained awaits/timeouts, or stores.
- Coordinating layered elements without a Vue-motion-style variant system — component structure and explicit state machine for phases (enter/hold/exit).
- Reduced-motion branching (`prefers-reduced-motion` media query via JS/CSS) and skip handling parity with Vue arm.

**Constraint:** no `@vueuse/*`, no Vue packages. Prefer zero extra deps; if you add any small utility, justify and record it.

### 3.3 Visual/composition variants to prototype or A/B in your exploration
Try to explore at least a few (implement the best, document others): full-card overlay vs banner strip vs centered medallion; backdrop dim/blur strength; foil border vs foil text fill vs shine sweep bar; single-beat vs two-beat choreography (e.g. card in, then shine pass, then hold); inclusion/exclusion of secondary stats; team-accent usage; compact 390px layout.

### 3.4 Integration points & architecture
Investigate the cleanest hook: wrap/observe the existing pick-commit handler; emit/listen to a domain event; derive from store change (careful: must be user-pick-triggered, not every board mutation). Keep overlay state isolated so it does not force deep reactivity on the board. Consider a small overlay component/module per arm.

### 3.5 Styling & asset avenues
Cinzel/Cinzel Decorative availability (Google Fonts link if already present/acceptable in test context, or system fallback stack, or bundled) — **record what you did** and any offline/console implications. CSS variables mirroring w89 tokens (`--gold`, foil stops). Keyframe definitions colocated vs shared stylesheet. Ensure no global leakage/regressions.

### 3.6 Edge cases & robustness to test
Skip during enter/hold/exit; reduced-motion path; 390px viewport; very long player names/truncation; missing optional fields; early picks (slow engine/goneOdds window — overlay should still behave correctly relative to commit timing) vs late fast picks; repeated picks across rounds; rapid user dismissal; focus/keyboard dismiss; no stuck overlay; no timer leaks across navigations/unmounts (as applicable).

### 3.7 Performance & measurement avenues
- **Ergonomics:** wall-clock time-to-green per arm (start/end timestamps, phases: scaffold/dep install, first render, style parity, a11y/reduced-motion, bugfix/polish), number of edit/run iterations, notable errors/blockers (verbatim excerpts) and how resolved.
- **Code/complexity:** LOC added/changed per arm (and where), number of files touched, dependency diff (`package.json`/lock) and bundle/build size signals if easy to capture.
- **Runtime:** time from pick-commit event to overlay visible, animation smoothness observations, impact on pick-to-next-interactive vs bench1 run v1 corrected baseline (attribute engine goneOdds separately), long tasks if measured. Use representative cases: at least one early/heavy pick and one late/fast pick.
- **Correctness:** G5 run/result, console error logs (empty expected), scripted/manual checks listed.
- **Style parity:** screenshot evidence per arm (and reduced-motion state, 390px) against a checklist derived from w89 essence.

### 3.8 Testing methods to consider (pick what is feasible; be explicit)
Playwright-driven flows (extend existing bench1 tests or add focused specs), scripted pick sequences, DOM/state assertions, console listeners, screenshot captures at key phases, video/trace if supported, viewport emulation (390px), `prefers-reduced-motion` emulation, keyboard interaction, timing instrumentation (`performance.now()`/marks), manual exploratory notes. **Do not claim tests you did not run.**

---

## 4) Suggested work plan (use ~30+ minutes deliberately)

1. **Intake (few min):** read this prompt fully; locate and inspect baseline arms, receipts, and DESIGN-LOG/wiring; confirm engine vendoring and corrected patterns.
2. **Style & spec distillation (few min):** enumerate concrete w89 visual tokens/behaviors to hit; define your reveal state machine and acceptance checklist.
3. **Exploration/design spike (several min):** sketch 2–3 choreography/composition options; decide API/structure in each framework; identify `@vueuse/motion` primitives to use meaningfully.
4. **Implement Svelte 5 arm (built-ins) (time-boxed, iterative):** get behavior correct, then layer w89 polish, then a11y/reduced-motion/390px/skip.
5. **Implement Vue arm (`@vueuse/motion`) (iterative):** same checklist; compare ergonomics honestly as you go (notes in real time help).
6. **Cross-arm parity pass:** align timing/feel/information; capture screenshots.
7. **Test & measure:** G5/correctness, console, edge cases, perf sampling (early vs late picks), reduced-motion and 390px.
8. **Synthesize report:** comparison table, receipts, what was easier/harder and why (factual), open issues.

Adjust order if useful, but cover exploration + both arms + tests + receipts.

---

## 5) Deliverables / final output format (what your reply must contain)

Structure your final response clearly. Include at least:

1. **Executive summary (factual):** what you built, what you ran, key findings (ease/effort, parity achieved, perf/correctness), with VERIFIED/REPORTED labels. No overall winner claim.
2. **Environment & baseline:** paths/commits/hashes you started from, Node/npm versions, any deviations.
3. **Exploration log:** avenues considered (motion, composition, integration), what you tried, what you chose, and why (include rejected alternatives).
4. **Implementation details per arm:**
   - Vue: how `@vueuse/motion` was used (APIs/components/composables, variants/timeline), dependency changes, files/LOC, notable code structure.
   - Svelte 5: which built-ins/patterns used, sequencing approach, files/LOC.
   - Shared/parallel decisions and parity notes.
5. **W89 essence checklist:** item-by-item pass/fail/partial per arm with screenshot or precise evidence references (gold/foil, shine, pop, Cinzel-style headline, linger/hold, glass/panel depth, reduced-motion, skip, 390px).
6. **Correctness & test receipts:** G5 results, console status, scenarios executed (early/late picks, skip, reduced-motion, 390px, keyboard), commands + key outputs, logs/screenshot paths or embedded artifacts as available.
7. **Performance notes:** pick→reveal timing and pick→next-interactive observations for representative early/late cases; explicitly separate engine `goneOdds` cost from UI/animation cost; comparison to corrected baseline where possible.
8. **Ergonomics comparison (evidence-backed):** time-to-green, iterations, error/repair log highlights, API clarity/boilerplate/coordination effort — per arm.
9. **Artifacts manifest:** list of changed/added files, how to run/build/test each arm, and (if you package a delivery) MANIFEST/hashes.
10. **Limitations & open questions:** what you did not test (e.g. A2/FF-WK/lanes B–F), residual gaps, risks, and anything needing Owner/Architect decision.

If you cannot run something in your environment, say so explicitly (UNKNOWN/NOT RUN) and provide the exact steps/commands someone else can run.

---

## 6) Guardrails and integrity

- **No engine changes.** No product HTML changes. No framework verdict.
- Preserve corrected wiring (`shallowRef` / `$state.raw`) and do not add hot-path deep reactivity.
- Be honest about uncertainty and environment limits; separate **VERIFIED** (you ran it, with command/output) from **REPORTED/INFERRED**.
- Prefer transform/opacity animations; keep accessibility and 390px intact.
- If you find a blocking issue in baseline arms, document it with evidence and work around minimally (record the workaround) rather than silently changing unrelated behavior.

---

## 7) Start now

Begin by stating your start time, environment, and plan, then proceed through the 30+ minute deep-work cycle above. Your value here is **thorough exploration + reproducible evidence + faithful w89 feel**, not speed. Good luck — make the pick feel like a moment.
