# CATEGORY-WINNERS.md — a winner in EVERY category, then the weighting (item 9)

Every row: one winner + one evidence line (the receipt it comes from). Ties are ties — a row whose
evidence does not separate the arms says so. Bundle is measured; it is also the least interesting.

| # | category | winner | evidence line |
|---|---|---|---|
| 1 | bundle (JS gz) | **Svelte** | LABELLED (one number per claim, each with its method): 10,969 B = four-slice concat JS gzip-9 delta (bundles-pin-d3bd81d2.txt) · 11,569 B = four-slice JS-only per-file delta, the canonical labelled figure (two-arm-bundles.txt §1.1) · 10,530 B = season-surface concat (season-timing.txt) · 10,706 B = slice-5 JS per-file (vapor-mode-bundle.txt) · 9,519 B = vapor arm concat (vapor-mode-bundle.txt). Ernie's independent rebuild: 10,588 B, same method — direction and magnitude hold. NOISE-weighted: does not move interactive time (row 2) |
| 2 | cold load (6× throttle) | **tie** | MUSE: Vue −90/−159 ms; THIS replication: Svelte +32 ms FCP / −10 ms mounted — direction flips session-to-session, all inside the per-trial spread (~300–430 ms) (receipts/fourslice-coldload.txt) |
| 3 | HMR (one visible word → DOM) | **Svelte (narrow, single-run)** | vue 60 ms / svelte 29 ms on a stateless chrome target (receipts/tooling-rows.txt); first attempt with a stateful target measured nothing — the hot swap re-mounts stateful components and the overlay closes (lesson recorded) |
| 4 | type-check precision | **Svelte (narrow)** | svelte-check audits a11y with file:line + rule URL (Cards.svelte:55, a11y_click_events_have_key_events); vue-tsc audited none of it (typecheck receipts) |
| 5 | compile errors | **Svelte (narrow)** | Svelte errors carry code frames + rule links (js_parse_error, attribute_duplicate — both directly actionable); Vite's resolve error names file+specifier (season-timing.txt, arc journal) |
| 6 | a11y checking | **Svelte** | 2 real a11y warnings surfaced by svelte-check, zero by vue-tsc on identical markup (slice5-timing.txt) |
| 7 | devtools | **evidence: NONE** | no devtools exercised (headless, prod builds) — what would have been needed: an interactive session with each framework's inspector; filed as UNKNOWN, not guessed |
| 8 | ecosystem | **Vue (narrow)** | both arms needed ZERO ecosystem deps (the whole surface is platform APIs); the edge is latent (component libraries, answer volume), not measured this sitting — qualitative, labelled as such |
| 9 | store maintainability | **Vue (narrow)** | BOTH NUMBERS, LABELLED — (a) SHIPPED store totals: appStore.ts **83 L** vs appStore.svelte.ts **98 L** (`wc -l`, framework-two-arm/arm-vue/src/lib/appStore.ts · arm-svelte/src/lib/appStore.svelte.ts, the delivered tree); (b) the FOUR-SLICE tree's store files: 61 L vs 68 L (receipts/two-arm-fourslice.txt — whole store file, which is framework-owned by construction; NOT from slice5-timing.txt, which quotes the card screen 86/88). Delta 7 → **15 lines as shipped**. Surface fact (F3): the delivered surface is an exact tie **1,249 = 1,249 framework-owned lines** — row 9's tax is 15/1,249 = **1.2%** of it. Plus the compiler-forced getter-wrapper idiom for module-level `$state.raw` (arc work: setStudied re-paid it) — cost restated as ONE facade, paid once (F5), not per-export |
| 10 | template ergonomics | **tie, different shapes** | same DOM, same laws; the whitespace strategies differ (Vue condenses inter-element text to nothing, Svelte keeps single spaces — probe-season's textContent diff); class binding: Vue object syntax vs Svelte `class:` directives — wash |
| 11 | build time (prod) | **tie** | 1.0–1.6 s builds across all slices both arms (build journal; deltas ≈100–250 ms, single-run noise) |
| 12 | dev server | **tie** | vue 559–813 ms / svelte 776–807 ms to first 200 (tooling-rows.txt) — single-run noise |
| 13 | 390px | **tie** | clean on every screen tested, both arms (coldload, slice5, season probes: scrollWidth == 390) |
| 14 | offline boot (flagged) | **tie** | 0 blocked / 0 console errors, both arms (tests/receipts/offline-boot.txt) |
| 15 | offline boot (vanilla file://) | **tie — both FAIL** | the vite `crossorigin` tags CORS-block on the null origin; identical failure both arms, verbatim captured; a vite-level fix, filed for the Architect (tests/receipts/offline-boot.txt) |
| 16 | type checker (tool itself) | **tie** | both ~3 s, both 0 errors on 4 slices of code; different audit scopes (rows 4/6) |
| 17 | lines of app code | **tie** | framework-owned: slice 5: 86 vs 88; season: ≈51 vs ≈50 (timing filings) — inside the flat slope the four-slice sitting measured |
| 18 | authoring cost | **tie** | both slices green, 0 vs 1 failed builds (the svelte path miss), rebuilds 1568 vs 1479 ms (AUTHORING-COST.md). QUALIFIER (D3, carried everywhere 34/9 min appears): **after the shared instrumentation exists, the second arm of this pair is ~9 min in either direction** — most of the 34-vs-9 gap is the first arm paying the probe cost, an order-of-authorship artifact, not framework speed |
| 19 | cost of being wrong | **tie** | ~140 framework-owned lines per slice per arm; a flip is ~350 lines per direction (MUSE's number, consistent with this sitting's counts) |
| 20 | keyboard reactivity (≤20 ms) | **tie** | Esc→DOM ≈ 0.3–1.5 ms both arms — two orders under the bar (tooling-rows.txt) |
| 21 | CSS file size | **tie (byte-identical)** | same chrome file, cmp CLEAN at every slice (bundles receipts: identical sha256) |
| 22 | file readability after 5 min | **tie (slight shape difference)** | both arms' screens re-read cleanly during the arc work (1-2 scratch reads each); Svelte's `{#if}/{#each}` vs Vue's `v-if/v-for` — wash on this codebase, subjective row |
| 23 | test green rate | **tie** | four-slice gates + slice-5 probe + arc probe + season probe: ALL LAWS PASS on BOTH arms at every run (probe receipts) |
| 24 | Friday-afternoon-build confidence | **Vue (narrow)** | Svelte 5's compiler failures this sitting were all *language-rule* errors (duplicate identifier via double-patch, duplicate attribute) that a tired agent re-patching a file will re-make; Vue's one failure mode (unresolved path) fails identically but the Svelte runes state model has one more way to be silently wrong (the silently-ignored plugin option bit the VUE side though — vapor receipt; call it narrow Vue on store-state mutability rules) |

## The weighting (a table with 24 winners is a list; this is the decision)

**DECIDES** (what compounds over the product's life, per the Owner's own framing):
- **store maintainability (9)** — the store file is where every future sitting lives; the compiler forces ONE indirection at the module boundary ("Either export a function returning the state value OR only mutate the state value's properties") — restated per Ernie F5 as **one facade, paid once**, not one wrapper per export; the tax compounds only if every future module-level reactive export repeats the wrapper-per-export choice. Whether the facade's MIGRATION cost is trivial or painful is exactly what the week-stepper (store-heavy tie-breaker) measures.
- **authoring cost (18) + lines (17) + cost of being wrong (19)** — the compounding bundle: framework-owned lines are flat, so the per-slice tax is what accrues.
- **type-check precision + a11y checking (4, 6)** — maintenance-side: the checker that sees more is the one that catches the drift agents introduce.

**TIE-BREAKS** (real but small; they tip ties only):
- compile errors (5), ecosystem (8), Friday-afternoon confidence (24), file readability (22).

**NOISE** (measured, no decision weight):
- bundle (1) — measured, real, and DEMONSTRATED not to move interactive time (MUSE's coldload + this sitting's independent replication, direction flipped, everything inside trial spread). The vapor falsifier did not close it; it also did not need to.
- cold load (2), HMR (3), build time (11), dev server (12), 390px (13), offline boot (14, 15), type-checker runtime (16), keyboard (20), CSS size (21), test green rate (23) — identical, noise-bound, or both-fail-together.
- devtools (7) — UNKNOWN this sitting; excluded from the decision, named for the next one.

## Applying the weighting

DECIDES bucket: Vue takes 9 (narrow), 18/17/19 are ties, 4+6 together take Svelte (narrow, two rows
that are really one property — the checker's audit scope). TIE-BREAKS: Svelte takes 5 (narrow), Vue
takes 8 and 24 (narrow), 22 ties. **The buckets cancel to a near-exact draw: 2 narrow Svelte rows vs
3 narrow Vue rows, all the DECIDES-adjacent rows otherwise tied.** The single largest non-tied DECIDES
row is the store idiom (9) — its cost restated: one facade at the module boundary, paid once (F5),
its migration cost to be measured by the week-stepper. Magnitude context (F3): the delivered surface
is an exact tie (1,249 = 1,249 lines) and row 9's shipped tax is 1.2% of it — the call rests on
STRUCTURE (the compiler-forced boundary), not on volume.

## Overall pick

**Vue 3 + Vite, narrow, 62% — authoring-cost row confounded by probe inheritance; second agent required to harden.** (D7: this headline carries the caveat because the headline is what gets quoted.) The pick
rests on row 9 (the store file, compiler-forced idiom — one facade, paid once, its migration cost unmeasured until the week-stepper runs) plus the tie-breaks (8, 24),
against Svelte's checker-precision rows (4, 6) and compile-error ergonomics (5). If the bundle were the
decider, Svelte would win — and the record shows the bundle does not buy anything user-facing (row 2).
If a second agent's protocol run disagrees about authoring cost, the pick flips on their numbers; the
falsifier and the protocol are filed and cheap to run.
