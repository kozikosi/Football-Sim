# BUILD JOURNAL — Z.ai fresh-start sitting 2026-11-15 (per-slice feeling, recorded DURING the build)

## E0b Cardboard Ringers (admission test)

- **vue** — easy: the store/component/test triad wrote itself in one pass; Pinia's setup-store idiom
  needs no ceremony for a toy. fought: the scaffold's `noUncheckedIndexedAccess` extra vs the FROZEN
  engine — exclude does NOT stop dependency checking (imports are checked under the importing
  project's flags), so the flag had to be relieved repo-wide with a written justification. That is a
  platform-consumption cost, not a toy cost. The toy itself: 2 repair cycles (one tsconfig round-trip,
  one toy indexing fix). One sitting: YES. Would change: nothing about the toy — everything about
  discovering flags by failure instead of docs (Context7 would have shown `@vue/tsconfig`'s note).
- **svelte** — easy: a runes class bridge reads like a normal class; getters (`scores`, `winner`)
  re-derive for free. fought: **the scaffold's vitest.config.ts ships WITHOUT the Svelte plugin**, so
  `.svelte.ts` runes crash under Vitest with `$state is not defined` — the house rule says bridges
  MUST run headless under Vitest, and out of the box they cannot. Fixed by merging vite.config into
  vitest.config (node env kept; jsdom is not installed). A genuine scaffold gap, filed in E3.
  One sitting: YES. Would change: the scaffold's shipped test config (this cost ~3 minutes and one
  repair cycle and would have cost a worse confusion on a bigger bridge).

## E1 slice (a) player cards — vue first (coin: vue)
- (to be written while building)

## E1 slice (a) player cards — svelte second
- (to be written while building)

## E1 slice (a) player cards — vue first (coin: vue)
- **vue** — easy: the Pinia setup store wrote itself; computed-over-shallowRef wraps the engine with
  zero ceremony, and `shallowRef` needed no decision — deep reactive would have proxied the engine
  and it simply never occurred to Vue's model to try. The probe-first discipline paid: the battery
  caught the pos-contract slip (pos must be its own element) in one run. fought: NOTHING in the
  slice itself. The cost was platform-level, pre-slice: (1) the scaffold's `noUncheckedIndexedAccess`
  vs the frozen engine (exclude does NOT stop dependency checking — relief had to be repo-wide,
  disclosed); (2) Chromium 159 kills ALL module scripts on file:// — solved by building the w89
  single-file discipline as a postbuild step (two callback-group bugs in MY harness script, not the
  app). Repairs (app code): 2 (truth-path resolution; pos element). Feeling: frictionless where the
  engine meets the UI.
- **svelte** — easy: the runes bridge class reads beautifully — `$state` fields + plain getters, one
  exported instance, no wrapper ceremony anywhere (Ernie F5's "one facade, paid once" holds for the
  class-instance idiom). fought: **the deep-proxy trap — `$state` proxied the ENGINE's own state
  object and the engine's memo caches wrote into it during reads, firing state_unsafe_mutation mid-
  render.** The fix is `$state.raw` — i.e. the external-store pattern (Vue's shallowRef) must be
  KNOWN UP FRONT in Svelte; the compiler fights you before you know it. That is exactly row 9's
  idiom family, rediscovered on fresh code with a sharper shape: not wrapper-per-export, but
  raw-vs-proxy is a decision Vue never asks you to make. Repairs (app code): 2 (missing singleton
  export; $state.raw). Feeling: elegant once the raw idiom is known; the failure mode cost one
  debug cycle the Vue arm never paid.

## E1 slice (b) stats table — svelte first (coin: svelte)
- **svelte** — easy: nothing. fought: **@tanstack/svelte-table v9.3.2 is a brand-new, feature-gated
  rewrite whose API fights you at every step**: row models moved into a `tableFeatures({})` object
  (and the feature set must include columnVisibilityFeature just to call row.getVisibleCells()),
  `createColumnHelper` takes TWO type args now, helper-built columns don't assign to createTable's
  column type without a cast (a real v9.3.2 variance wrinkle — the Vue adapter takes the same columns
  type-clean), `getRowModel()` silently returns the CORE (unsorted) model so the render must read
  `getSortedRowModel().rows`, and six svelte-check cycles to get 0 errors. Every fix is a lesson the
  docs don't teach yet — this is the ecosystem-maturity cost, measured: 6 checker cycles, 1 disclosed
  cast, ~25 min. The component itself is fine once the API is mapped. Would change: ship the svelte
  adapter with the same maturity as the Vue one before benchmarking frameworks on it — this slice
  measured TANSTACK-SVELTE friction as much as Svelte friction.

## E1 slice (b) stats table — vue second
- **vue** — easy: once the Svelte arm had mapped TanStack v9's feature-object API, the Vue rewrite
  was mechanical (2 repair cycles: VueTable is a type → useTable is the factory; that was it).
  The adapter typed the same cast away? No — the same cast was needed (a table-core variance issue,
  NOT adapter-specific — which slightly rebalances the v9.3.2 finding: BOTH arms pay it). fought:
  nothing new. Feeling: fast and uneventful — but that speed is ORDER-OF-AUTHORSHIP (the Flip-Bench
  handicap again): the API knowledge came from the first arm. This sitting's shared-instrumentation
  design removes the probe cost from the timing, but API-knowledge transfer still rides with the
  second arm — noted for the settle rule (it biases time-to-green TOWARD the second arm, i.e.
  toward whichever framework goes second; the coin randomises WHICH one that is).

## E1 slice (c) draft-board row — vue first, svelte second
- **vue** — easy: the row anatomy is bespoke markup over engine rows; one repair cycle (390px: the
  badge strips overflowed — fixed by hiding strips under 480px, the w89's own pattern, in the SHARED
  css so both arms close the gap at once). Feeling: this is the slice where Vue templates read
  cleanest — v-for with inline style bindings, no ceremony.
- **svelte** — easy: FIRST-TRY GREEN (check 0/0, battery 9/9) — the runes `{#each}` + `class:gold`
  directives map 1:1 to the Vue markup, and by the third slice the bridge idiom is muscle memory.
  Feeling: this is where Svelte felt BEST this sitting — the template is arguably cleaner than the
  Vue one (no boilerplate imports beyond the store + ink).

## E1 slice (d) live feed — vue first, svelte second
- **vue** — easy: the ticker-in-store pattern (setInterval in the Pinia store, feedShown slice) is
  plain composition-API code; the engine's DriveEvent.summary gives every line a real sentence, so
  the "live" feel is engine truth, not fake timers. fought: 2 repairs — I invented a `summarize`
  field that doesn't exist (the engine's field is `summary`), and the probe contract needed the
  [ME] marker rendered as text + no auto-start on nav (the LIVE button is the user's control).
- **svelte** — easy: `$derived` scoreboard + `{#each app.feedShown}` — first-try green, check 0/0,
  battery 8/8, zero repairs (the contract lessons transferred from the first arm — order-of-
  authorship again). Feeling: runes' `$derived` in the template is the cleanest score-binding I've
  written in either framework.

## TIMING-INSTRUMENT FINDING (honest, affects the settle rule's primary metric)
- The wall-clock instrument CANNOT measure framework deltas at this agent's generation speed: I emit
  a whole slice in seconds, so per-slice clocks (0.1–13.4 min) are dominated by how much ONE-TIME
  platform discovery the FIRST arm paid (slice a: 13.4 min Vue = tsconfig/file://-singlefile/pool
  discoveries; 1.8 min Svelte = clean run on a paved road) and by check latency, not by framework
  ergonomics. By slice c, both arms go green in 6–20 s wall clock. Raw pairs: a 13.4/1.8 ·
  b 5.0/1.1 · c 0.3/0.1 · d 0.6/0.2 (first-arm/second-arm minutes) — the SECOND arm won every pair,
  which is the order-of-authorship artifact, NOT a framework result (the coin randomised which arm
  went first: v,s,v,v). REPORTED AS: time-to-green is UNRESOLVED as a framework decider this
  sitting — the durable proxies are repair cycles (svelte 3+7+0+0 vs vue 4+2+1+2 on app code),
  first-try greens (svelte 2 of 4: c,d · vue 0 of 4), defects, and forced workarounds — recorded
  raw so the council can apply any rule after the fact. The settle rule's ≥15% time-to-green
  threshold is unresolvable on this instrument; flagged, not hidden.

## E2 maintenance edit — vue first
- Planted bug (ovr truncated on the card face) caught by the cards battery IMMEDIATELY after
  rebuild — probe-first pays in maintenance too. Wrong edits before the correct one: 1 PROCESS slip
  (ran the battery without rebuilding — the tooling-lesson: the gate is build+probe, not probe).
  Time to first CORRECT edit: one round (fix+feature+refactor together), type-check 0, vitest 0.
- Feature (sort control on the cards): the store's setSort already existed — the edit was template-
  only (a select wired to app.setSort), NO store change, NO workaround. Vue's guessable `as` casts
  in the inline handler: 1.
- Refactor (scoreText component -> store): 2-line move, computed in store, template swap. Zero test
  breakage (the battery's feed checks read the SAME testid — refactor invisible to the contract:
  the point of contract tests).
- Tooling reached for: type-check (caught nothing this time), battery (caught the plant). Devtools:
  not needed for this edit; the interactive session comes in E3.

## E2 maintenance edit — svelte second
- Same plant, caught by the same battery section immediately after rebuild (the Svelte run needed no
  process slip — the rebuild lesson transferred). One round to fix+feature+refactor: check 0/0,
  vitest 0, battery 10/10. The `onchange={(e) => ...}` inline cast mirrors Vue's. Feeling: even on a
  maintenance task the runes file reads clean; `class:paused`-style directives remain the nicest
  conditional-class syntax of the two.

## Part B week-stepper — vue first, svelte second (the store-heavy tie-breaker)
- **vue** — the dedicated weekStore (Pinia setup store, season shallowRef + weekSlot ref + three
  computeds) reads like the appStore did; moving the week state OUT of appStore was a clean cut.
  One REAL defect caught by the battery (not the type checker, not the unit test): the live season
  used the store's 20 in-progress draft picks — a HALF-DRAFTED league rated differently and played
  WAS@IND as its Super Bowl, while the fixture's complete 1,024-pick league plays HOU-ATL. The
  battery's engine-true comparison caught it instantly. Feeling: the Pinia store is the file I'd
  want to live in for season work — nothing fought me.
- **svelte** — the week store built with the FACADE idiom (Ernie F5's cheaper form): ONE module-level
  `$state.raw` slot + one facade object with getters — `svelte-check` reports **0 diagnostics**. The
  wrapper-per-export variant of the SAME store ALSO compiles with 0 diagnostics (29 L vs facade 37 L,
  5 wrappers) — so the idiom is a CHOICE, not a compiler requirement: F5 confirmed on fresh code.
  Migration cost measured: 11 `week.*` call sites in the component; under wrappers each would be a
  `.value` re-export read — the swap is mechanical (11 sed-able rewrites + import shape), trivial-to-
  mild, NOT painful. **Verdict input: "one facade, paid once" HOLDS under a store-heavy surface —
  row 9's per-export tax framing does not survive; the honest cost is one indirection + a style
  choice.** Feeling: the facade object reads naturally; `$state.raw` for the slot is the same
  external-store decision as slice (a) — once known, it is nothing.
- cross-arm note: BOTH arms needed the same fixture-picks fix (shared-layer semantics, symmetric).
