SPEAKER: glyph | ROLE: seat (work request / test proposal) | TASK: WR — propose BENCH-1 follow-up: Vue-only package vs Svelte 5 built-ins on w89-style feature | DATE: 2026-11-14T06:45Z
FOR: Z.ai (run), other seats (review), Owner (approve scope/acceptance)

# Work Request: BENCH-1.5 “W89 Cinematic Pick Reveal” (Vue package-advantage test)

**Status:** PROPOSAL (glyph). No framework verdict. Owner approves scope before run.

## Why this test
BENCH-1 run v1 (`_agents/glyph/deliveries/z-bench1-run-v1/`, reviewed `inbox/20261114-0635-glyph-review-z-bench1-run-v1.md`, VERDICT improved) showed corrected-wiring parity on core board/pick measurements and highlighted state-container ergonomics differences. Owner asked for one more test where Z.ai uses a **Vue-only package** (no equivalent package in the Svelte 5 arm) on a feature relevant to the project, to see if Vue is materially easier to implement **while still capturing the essence of w89’s style**.

## Style anchor (w89 essence, VERIFIED refs)
Source: `/Users/kosi/Desktop/Football Sim/Football-Sim-Z-post-blue w89.html` (local). Observable style tokens to match in spirit (not pixel-perfect copy of unrelated UI): **Cinzel/Cinzel Decorative** headline treatment where appropriate, gold/foil palette and shine (`--gold` / foil gradients), shimmer/shine motion (`@keyframes fxshine`, text shimmer), pop/toast reveal motion (`@keyframes fxpop`, `@keyframes fxtoast`), glassy/panel feel, team-accent friendliness, and w89 “cinematic” pacing (lingering moment, clear hierarchy). Must respect project rules: plain informative language, 390px/no horizontal scroll regressions, reduced-motion support, skip/dismiss affordance.

## Feature under test (single, bounded)
**“Draft Pick Reveal” overlay on the BENCH-1 draft board:** when the user commits a pick (same Tier 2 board/store flow as bench1 run v1), show a transient reveal card/overlay with pick context (round/pick, player name, position/team or available fields) styled in w89 cinematic language (gold foil/shimmer, Cinzel headline treatment, pop+shine entrance), hold briefly, then dismiss (auto + user skip). Must not break G5 correctness, console cleanliness, or corrected-wiring pick/board behavior.

## Package asymmetry (the point of the test)
- **Vue arm:** implement animation/choreography using **`@vueuse/motion`** (Vue-only package; add to arm dependencies). `@vueuse/core` allowed only if needed by `@vueuse/motion`. Use it meaningfully (declarative motion/variants/directives/composables), not as a no-op wrapper around pure CSS.
- **Svelte 5 arm:** achieve the **same behavioral + visual acceptance checklist** using Svelte 5 built-ins (`svelte/transition`, `svelte/animate`, `svelte/motion`, `svelte/easing`) and/or plain CSS/keyframes. **No `@vueuse/motion`**, no Vue package. Other small utilities allowed only if necessary and recorded (prefer none).

Rationale: tests whether a Vue-ecosystem motion package reduces implementation effort vs Svelte’s native primitives for w89-style cinematic polish.

## Arms / baseline
- Start from bench1 run v1 arms/sources (`_agents/glyph/deliveries/z-bench1-run-v1/arms/arm-vue-pub`, `arm-svelte-pub`) or an equally receipted copy; vendored engine/shared store behavior preserved (corrected wiring: vue `shallowRef`, svelte `$state.raw` per DESIGN-LOG). Record base commit/path and any dependency diffs.
- Same dataset/protocol context as Tier 2 where applicable; do not regress G5.

## Acceptance checklist (both arms must satisfy)
1. Reveal triggers on user pick commit; shows correct pick context; does not block ability to continue draft.
2. Visual/style: gold/foil treatment + shimmer/shine + pop/entrance consistent with w89 tokens (Cinzel headline treatment, readable hierarchy). Reviewer checklist with screenshots.
3. Timing: brief cinematic hold (tunable constant recorded), auto-dismiss, **skip/dismiss control**, **`prefers-reduced-motion`** honored (no essential info lost).
4. Layout/a11y sanity: no horizontal scroll at 390px for the board+overlay; focus/keyboard dismiss reasonable.
5. Correctness: **G5 parity/board correctness preserved**, **zero console errors** in measured run, no broken pick flow.
6. Perf guard (INFORMATIVE, not a gate unless Owner sets one): compare pick-to-next-interactive impact vs bench1 run2 corrected baseline; flag large regressions with numbers.

## Measurements / receipts (Z.ai to deliver)
- **Implementation ergonomics:** time-to-green, iterations/repair cycles, notable errors (verbatim), LOC diff per arm, dependency diff (`package.json`/lock), build/typecheck results.
- **Runtime:** short scripted run showing reveal on representative picks (early goneOdds-heavy and late/fast cells) with timings; console log; screenshots/video frames; G5/board sanity.
- **Comparison table:** effort, clarity of APIs, parity achieved, perf delta, and “w89 essence” checklist pass/fail per arm. Label VERIFIED/REPORTED/INFERRED. No “winner” claim required beyond measured facts.

## Out of scope
- No engine/math changes, no product HTML edits, no framework verdict/ranking, no new features beyond the reveal.

## Review
- ≥2 independent seat reviews of receipts + visual parity + correctness (and rerun key claims where feasible). File `inbox/<UTC>-<seat>-WR-bench1_5-style-review.md`.

## Open Owner confirmations (answer before run)
- Approve this feature choice (pick reveal) vs another w89-style moment (e.g. draft-complete cinematic slice, season transition card).
- Approve `@vueuse/motion` as the Vue-only package (or specify alternative Vue-only package).
- Accept reduced-motion + skip as required (recommended) and any timing preference.
