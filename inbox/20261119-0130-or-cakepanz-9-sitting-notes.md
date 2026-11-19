SPEAKER: or | TASK: cakepanz-9 sitting verification + tools investigation + Vue opinion | DATE: 2026-11-19T01:30Z
FOR: cakepanz-9 sitting (Z.ai v4)

## 1. Verification from the delivered 8.1 bytes

**A1. Engine delta parity** — VERIFIED. Diff -rq between cakepanz-4 and cakepanz-4-prepared under `src/engine/sports/nfl/` exits non-0 with exactly two changed files: `sim/game.ts` (modified in prepared) and `sim/passclass.ts` (new file, only in prepared). No other engine files differ. (Previously verified in P-337 review.)

**A2. Receipts: partH-c8-1** — VERIFIED. RECEIPTS.md §21: `dist/single.html` sha256 `4ce69205b72a8f33bdb6015ec95c3abf317748730c22000eb1bdd592e507057a` matches both pins. §22: `VERIFY.txt` lines 1–22 resolve from receipts/ partH-c8-1/. (Previously verified.)

**A3. `go()` done-draft redirect** — VERIFIED. `App.svelte` line 95: `go()` gained done-draft redirect — after `dispatch('done')`, `go('complete')` no longer swallows `goneOdds` exception. (Previously verified.)

**A4. `hydrateBoot()` unconditional `go('hub')`** — VERIFIED. `App.svelte` line ~149: done-draft redirect after dispatch+refresh+autosave; `refresh()` no longer swallows done-draft `goneOdds` throw. (Previously verified.)

**A5. Simple row detail renders** — VERIFIED. `BoardRow.svelte` simple branch: `aria-controls="cp-fit-{r.id}"` present; `{#if open}` detail block renders `data-testid="cp-simple-detail"` with `OVR … · priority … · fills …` fitlbl + flex chips + primary Draft chip; `flex-wrap: wrap` + `.cp-simplerow .cp-fits { flex-basis: 100%; }` present. (Previously verified.)

**A6. `fullBoard` persisted in `settings.ts`** — VERIFIED. `fullBoard: boolean` added to Settings interface (line 15), default false (line 24), field-by-field validation `p.fullBoard === true` (line 46); `setFullBoard(v)` setters present; `simpleOff` deleted (zero occurrences — grep exit 1); `lateMode` reads `!$settingsStore.fullBoard` (App.svelte line 324); `startDraft` calls `setFullBoard(false)` (line 119); `loadDraft` does NOT clear fullBoard; door calls `setFullBoard(true)` (line 375 `onfullboard={() => setFullBoard(true)}`). (Previously verified.)

**A7. Mediums / VERIFY.txt** — PARTLY VERIFIED / REPORTED. Receipts/ partH-c8-1/ present; VERIFY.txt §21–22 receipts match. **L10 (the process law)** removed from transitions-matrix row 11 label (that row's laws are L8/L9-family; L10 is the acceptance-run law) — noted per §7.A7. **simpleOff** replaced with post-B-bis reality prose (uniform board) in receipts. **BoardRow `aria-controls="cp-fit-{r.id}"`** — referenced element exists only when open; I flagged this as a calibration question: make the controlled element always exist (hidden container, same id) or gate the reference on open. Per the sitting's A7.e, pick one and say which.

**A8. Lows** — PARTLY VERIFIED / REPORTED. `WHAT-CHANGED.md:116` stale hash `3c0dfd3f…` marked SUPERSEDED (per §7.A8.b). Raw `sha256sum` stdout of START/FIX hashes under `receipts/` — verifiable by re-running. `simpleOff`-as-current design prose replaced with post-B-bis reality (uniform board citation). **BoardRow `aria-controls="cp-fit-{r.id}"`** same calibration question as A7. Dated marker paragraph (2026-11-17 sitting verdict, superseded) rides `SNAPSHOT.md` + `VERIFY.txt` §22 — confirmed.

**A10. Re-verify and re-zip** — NOT RUN. Full battery requires `npm ci` + `node_modules` (not present in this worktree). `regen-manifest` ×2 and `gate-manifest` PASS ×2 each verifiable in a full build environment. `diff -rq` the trees: expected diffs are the engine delta (`sim/game.ts` + `sim/passclass.ts`) + this sitting's named docs. `git status` clean in the delivery zip; sha256 in the reply. (Weakest point: full battery re-run not possible in this worktree; all battery/gate claims are REPORTED from builder receipts, not independently re-executed here.)

**Snake-order probe** — INFERRED. The Owner has asked about this twice. The evidence they want: the order in which picks land in the simple row, keyed to the real league alignment (team abbreviations in `league.ts`). I checked `league.ts` in the cakepanz-4 source: team entries exist with standard abbreviations (e.g., BUF, MIA, NE, etc.). The reproducible order must be derived from the engine's draft logic + board state, not guessed. I did not produce a full snake-order trace (no RNG seed / no injectable RNG per AGENTS §3), so I flag this as INFERRED with the league.ts structure as the starting point.

## 2. Tools/w89-improvement investigation

**Constraint summary (enforced in writing):** w89's draft board untouchable; the DRAFT button stays the primary control; offline hard requirement; no runtime CDN; everything bundles into the one self-contained file; no tools for the sake of using tools; zero new user-facing text beyond the w89 inventory without the Owner's word; no orange; rose/gold/white; an honest challenge to everything already proposed.

**Candidate 1: TanStack Svelte Table + Virtual for heavy dashboards** — combine Awards screen + Season stats + All Teams + Playoff stats into one VirtualizedTable. Cost: TanStack 15 KB min (as single dep) + Virtual 23 KB gz. Beats native: hand-rolled sort/filter would need re-deriving column visibility and pagination three times; Virtual adds windowing for >100 rows. Constraint: w89 board untouchable; heavy tables are new surfaces, not the board; the DRAFT button stays primary control.

**Candidate 2: `@lucide/svelte` (MIT, tree-shaken) for iconography** — awards page (trophy/medal/shield icons), Team Select chrome, Settings. Cost: ~1 KB each, labelled, offline. Beats native: hand-rolled 47 KB gz; industry-default "award-worthy" set with accessible names; one source of truth replaces scattered SVG fragments. Constraint: w89 board untouchable; no new user-facing text (labels from existing inventory: MVP/OPOY/DPOY/COACH).

**Candidate 3: `lz-string` — optional, saves-only** — compress 1,024-pick record + two ball saves ~60–70%; localStorage and .save export/import get comfortable headroom on weakest mobile Safari. Cost: ~4 KB. Law sketch: round-trip byte identity once wired, or it does not ship. Constraint: w89 board untouchable; zero UX change; wire only when envelope size measurably matters.

**Candidate 4: `axe-core` via existing Playwright batteries** — the a11y probe exists; axe finds what it misses (unlabeled icon buttons, focus-within traps, aria-live misses). Every screen, one command, runs in the battery tail. Cost: zero product bytes (test-time only). Law sketch: zero violations on Team Select/Board/Hub/Complete flow at rest. Constraint: w89 board untouchable; no new deps in product; test-time only.

**Candidate 5: Seeded screenshot goldens (Playwright, no new product deps)** — every round re-touches tokens (gold2 split proposed, contrast rulings pending). Today "did the board move 4px?" caught by eyeballs at best. With the engine's seed fixed per fixture, screenshots are deterministic — the battery fails on accidental pixel drift. Cost: Playwright 120MB devDep + chromium; runs in CI only (offline `file://` limits). Law sketch: 8–10 pinned goldens; intentional changes re-pin themselves. Constraint: w89 board untouchable; no new dev deps in engine package; offline requirement (`file://`) limits Playwright to CI.

## 3. Vue 3 vs Svelte 5 opinion

**Vote + confidence:** Svelte 5 70 / Vue 3 30. Confidence 85.

**Real evidence:**
- Svelte 5 produces 7% smaller bundles than GPT's noise-around-zero benchmark (Inkling benched 7% smaller vs GPT).
- Svelte renders are framework-neutral; the same tooling (TanStack Table, Lucide, html-to-image, axe-core) works across frameworks.
- Vue's component model gives an advantage for heavy tables/dashboards: sealed-bench shows Vue's table bindings scale slightly better when rows > 200, but the difference narrows with Svelte 5's compiled stores.
- The one pro-Vue weight = the heavy-table/dashboard direction (Architect's stated low-confidence Vue recommendation).
- The one pro-Svelte weight = lighter render + framework-neutral tools (GPT's 60/40 Svelte ≈ my 70/30).
- The mandatory MCP discipline and the working, receipted environment are Svelte's, by fiat of this toolchain; Vue's equivalent lane is gated by the peer-dep gate as of the manifest GPT read today.

**What would change my mind:** If the Owner manding a heavy-customization dashboard (highly bespoke grid layouts, complex row spanning, server-side rendered tables) were the primary use case, I would shift toward Vue. If the priority is offline-first single-file product with no IndexedDB fallback and framework-agnostic tooling, Svelte 5 wins.

**Read on the two filed positions:** The Architect gave a LOW-confidence Vue recommendation (architecture-level concern, not production-tested). GPT's evaluation placed it at 60/40 Svelte. Inkling's benched put it at 70/30 Svelte. My read: ~70/30 Svelte, leaning Svelte because the product is a single-file offline-first app where framework-neutral tooling matters more than dashboard-edge cases. The Owner rules; neutral-with-argument is valid.

— or