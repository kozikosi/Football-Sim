# PART-A-CLASS-BRIDGE.md — the class bridge at store-heavy scale (Rev 8, the real work)

Seat: Z.ai · 2026-11-15 · Rev 8 Part A · tree: fresh-start repos at engine pin d3bd81d2.
Question Rev 6 did not answer: **is a facade NEEDED at all, or does a class need none?** Rev 6's Part B
measured module-level-facade vs wrapper-per-export (both facades). This sitting builds the class —
the house-rule shape (svelte CLAUDE.md §2: ".svelte.ts classes with $state holding snapshots") — at
store-heavy scale in THIS tree, and the same 11-field surface in Pinia.

## A1 — the surface (identical semantics in all three cells; no new engine code)

11 reactive fields: `slot, ready, view, total, standings, champion, finalists, pickCount, seasonYear,
gamesCount, label` + the envelope methods `ensure/go/next/prev`. Every derived field re-derives from
the engine's own `SeasonResult` through the shared weekVM (`weekView/standingsThrough/totalWeekSlots`);
`champion/finalists` are the engine's own fields; `pickCount` is the fixture's 1,024 picks. The store
is the saves-hydration shape (the real product's season record + the stepper's slot state).

Files (all new this sitting, authored in this order — order disclosed, see the confound note):
- svelte class bridge: `football-sim-svelte/src/lib/state/seasonStore-class.svelte.ts` (50 L)
- svelte module facade: `football-sim-svelte/src/lib/state/seasonStore-facade.svelte.ts` (45 L)
- vue Pinia setup store: `football-sim-vue/src/stores/seasonStore11.ts` (49 L)
- tests: `seasonStore.test.ts` (79 L, svelte — 8 tests over BOTH idioms) · `seasonStore11.test.ts`
  (61 L, vue — same assertions)
- build wiring: DEV-only QA-hook imports in both arms' `src/main.ts` (`window.__PART_A__`, CLAUDE.md
  §2 idiom) — this also put the wrapper variant (`weekStore-wrappers.svelte.ts`) into the build graph
  (erratum 0.7).

## A3 — the six axes, with commands

All runs on the shipped tree, 2026-11-15, node v24.22.3.

**Axis 1 — lines (wc -l):** svelte class@11 = 50; svelte facade@11 = 45; vue Pinia@11 = 49.
Existing cells: svelte class@2 (ToyStore) = 32; svelte facade@2 (weekStore.svelte.ts) = 37;
svelte wrapper-per-export variant = 29; vue Pinia@2 (weekStore.ts) = 39; vue Pinia toy@2 (store.ts) = 29.

**Axis 2 — checkers (whole-arm; the stores contribute 0 diagnostics):**
- `npm run check` (svelte): **0 errors and 0 warnings** (first run of the new cells: 1 error — in the
  TEST harness's parameter typing, not in either store; fixed once, see repairs).
- `npm run type-check` (vue): **exit 0** on the first run of Pinia@11.

**Axis 3 — production build (`npm run build`):**
- svelte: exit 0 (singlefile postbuild, 434,753 B inlined). vue: exit 0 (466,412 B inlined).
- Build-graph proof (falsification probes, run and immediately reverted; the shipped files were never
  left broken): appending `export { ready as _probeClass };` to seasonStore-class.svelte.ts and
  `export { ready as _probeFacade };` to seasonStore-facade.svelte.ts made `npm run build` FAIL with
  `RolldownError: … Cannot export state from a module if it is reassigned` **naming both store files**;
  restored builds exit 0. Same probe on weekStore-wrappers.svelte.ts (`export { slot };`) → build exit 1
  naming that file; and on the same tree **svelte-check reported 0 errors and 0 warnings** — the direct
  experimental proof that gate 5 needs the build-green clause (Part C1): the checker is silent on
  state_invalid_export, the build is not. Vue-side inclusion proof: the `'season11'` store-id string
  literal survives minification and is present in the built dist (grep count 1).
- One more probe finding: `export const _rawSlot = slot;` (value copy of a `$state.raw`) is NOT
  invalid_export — it raises the `state_referenced_locally` warning ("captures the initial value"),
  build exit 0. The invalid pattern is exporting the REASSIGNED BINDING itself (`export { slot };`).

**Axis 4 — repair cycles while authoring (counted as they happened, DURING the sitting):**
- svelte class@11 + facade@11 (shared test harness): **1** — svelte-check TS2330 in
  seasonStore.test.ts (the `exercise(store: typeof seasonClass, …)` parameter rejects the facade
  object: `Property 'season' is missing`). Fix: structural `SeasonStoreSurface` interface. Both store
  files needed NO repair — the defect was in the shared test file.
- vue Pinia@11: **0**.
- (Attribution note: the two svelte cells share the harness, so the repair is booked to the PAIR, not
  to either idiom. Neither svelte store file itself needed a stop.)

**Axis 5 — first-try green:** svelte pair: NO (1 harness repair). vue Pinia@11: **YES** — vue-tsc exit 0
+ 4/4 vitest on the first full cycle. For the @2 cells: recorded from the Rev 6 receipts — svelte
class@2 (ToyStore): not first-try (the scaffold's vitest config lacked the Svelte plugin — a scaffold
gap, 1 cycle); svelte facade@2: yes-for-the-store (0 diagnostics, battery 11/11; the fixture-picks
defect was caught by the battery, not the checker); vue Pinia@2: 1 repair (battery-caught
half-drafted-league defect); vue toy@2: 1 tsconfig-relief cycle.

**Axis 6 — call sites (grep):** new stores: svelte `grep -rln "seasonClass\|seasonFacade"` in src →
2 files (main.ts hook + the test file); vue `useSeasonStore11` → 2 files (main.ts hook + test).
Existing: svelte week facade = **11** `week.` call sites in WeekStepper.svelte (re-verified this
sitting); vue week store = 10 `wk./week.` refs in WeekStepper.vue + 1 test file; toy stores = 2 files
each arm (board + test). The new cells' 0-migration fact is the point: a class/facade/Pinia store
added LATER costs only its consumers, and none had to be migrated.

## A4 — the table

| pattern | fields | arm | lines | checker | build | repairs | first-try | call sites |
|---|---|---|---|---|---|---|---|---|
| class (instance bridge) | 2 | svelte | 32 (ToyStore) | 0/0 | exit 0 | 1 (scaffold vitest config) | no | 2 |
| facade (module-level) | 2 | svelte | 37 | 0 diagnostics | exit 0 | 0 (store); battery caught the fixture defect | no | 11 |
| facade (module-level) | 11 | svelte | 45 | 0 diagnostics | exit 0 | 1 (shared harness) | no | 2 |
| class (instance bridge) | 11 | svelte | 50 | 0 diagnostics | exit 0 | 1 (shared harness) | no | 2 |
| Pinia (setup store) | 2 | vue | 39 | 0 errors | exit 0 | 1 (battery-caught fixture defect) | no | 10+1 |
| Pinia (setup store) | 11 | vue | 49 | 0 errors | exit 0 | **0** | **yes** | 2 |

## A4b — the Ernie replication (class-vs-Pinia at 11 fields, one number, three decimals)

Ernie's measurement (11-field season store, Ernie's tree): class 74 L vs Pinia 85 L → delta −11 L.
Replication on THIS tree, method-labelled: **class@11 50 L vs Pinia@11 49 L, same surface, same
shared weekVM, same engine pin → delta +1 L; ratio class/Pinia = 1.020 (50/49, three decimals),
i.e. the class costs +2.041% MORE lines here ((50−49)/49, method: `wc -l` of the store files only,
tests excluded from both sides).** The sign does NOT reproduce (Ernie −11 L / −12.941%; here +1 L
/+2.041%). Attribution: Ernie, seat council/ernie, Rev 8 prompt; method labelled above; both numbers
quoted so any rule can be applied.

**Why the difference (stated, not smoothed):** Ernie's class held the 11 fields as `$state` fields
with methods on the class; my class needs the same getters the facade needs (the derived fields are
getters in BOTH svelte cells), so the class pays `this.`-prefixing + one export line, while Pinia's
setup store pays `computed(() => …)` wrappers that pack tighter. At 2 fields the class was SMALLER
(32 vs 37 facade / 29 vue toy). The honest reading: **at n=11 the idiom line-delta is inside noise
(±11 L across seats, −12.9% to +2.0%) — the sign depends on the seat and the shape, not on the
framework.**

## A5 — the one line of analysis

In THIS tree the class needs NO facade and pays NO measurable penalty for not having one — class@11
(50 L) and facade@11 (45 L) are 0/0 on both checkers, both build green, and the 5-line gap between
them is the facade's `this`-free getters vs the class's `this.`-prefixing — while Pinia@11 ties both
(49 L, and it was the only cell green FIRST TRY, 0 repairs). **The delta's sign depends on the SEAT
(Ernie −11, here +1) and weakly on size (class smallest at 2 fields, tied at 11) — not on the
framework alone; there is no crossover inside the measured range because no cell separates beyond
noise.** The council decides what this does to row 9; the table is the deliverable.

## Confounds, disclosed

1. **Authoring order:** class@11 was authored first, facade@11 second (the second build of the same
   surface rides within-arm knowledge transfer), Pinia@11 third (rides both). If anything this
   BIASES FOR the svelte pair on repairs and FOR vue against first-try-green — vue still went
   first-try-green last. Disclosed, not corrected (within-agent protocol, PROTOCOL-FOR-A-SECOND-AGENT.md §0).
2. **One agent, one sitting:** the training-data confound stands (§0 of the protocol). The sealed
   recipe (Part B) is the instrument for the next agent.
3. **The @2 cells' repair counts come from the Rev 6 receipts** (they were authored last sitting);
   re-verified this sitting: lines, checkers, build, call sites all re-run — only the authoring-time
   axes are inherited.
