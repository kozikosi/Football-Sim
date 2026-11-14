# WATCHLIST BUILD TASK (identical prompt text for both agent instances — Lane B/D of the Z.ai BENCH-1 run)

You are building a small feature in an existing football-sim draft board app. Work only inside your assigned
directory. Everything you need is there. Do not touch anything outside your directory except reading
/home/z/my-project/bench/DESIGN-LOG.md section 2 for context.

## Your directory

- Vue arm instance:  /home/z/my-project/bench/arms/arm-vue-watch
- Svelte arm instance: /home/z/my-project/bench/arms/arm-svelte-watch

(Your instance is a copy of a working app: Vue 3 + Vite, or Svelte 5 + Vite. `npm ci` was already run —
node_modules is present. `npm run dev` starts the dev server (use --port 5211 for vue-watch, 5212 for
svelte-watch, --strictPort). `npm run build` is the production build.)

## The feature (build exactly this)

1. Each draft-board row gets a star toggle button with attribute `data-testid="star"` (one per row).
   Clicking it toggles that player in the user's watchlist.
2. The watchlist (a set of player ids) persists to localStorage under the key `bench-watchlist` and is
   restored on page load. After a reload, the previously starred rows must show as starred.
3. A filter mode for the watchlist: a select or button group with `data-testid="filter-watchlist"` that,
   when active, shows ONLY starred players in the table.
4. A counter with `data-testid="watchlist-count"` showing the number of starred players.

Constraints:
- UI-only. Do NOT modify anything under `src/bench/engine/` (that is the engine, read-only) or
  `src/bench/shared/boot.ts` (the shared store wiring) or `src/bench/data/`.
- You may add files and edit `src/bench/Board.vue` (or `Board.svelte`) and `src/bench/main.ts`.
- Keep the existing DOM contract intact (board-row, sort-*, filter-pos, pick, roster-panel all still work).
- The app must still boot with zero console errors.

## Verification you MUST run (report the real results)

1. `npm run dev` + a Playwright check (Playwright is installed at
   /home/z/my-project/bench/tools/driver/node_modules — import playwright from that absolute path in your
   test script; run it with node). Chromium is available. Your script should: load the page, star two
   players, reload, assert the stars survived, activate the watchlist filter, assert only starred rows show,
   check the counter. Save your test script in your directory as `watchlist.test.mjs`.
2. `npm run build` must pass. (vue arm: `vue-tsc -b && vite build`; svelte arm: `vite build`.)

## MANDATORY repair log

Write `REPAIR-LOG.md` in your directory, appended in real time (do not reconstruct it at the end): one
timestamped entry per ERROR you encounter (verbatim message text), what you tried, and what actually fixed
it. Include dev-server errors, build errors, test failures — everything. At the end add a summary:
total errors, total repair cycles, elapsed time to green.

## Final report (what you send back)

- Files changed/added (paths).
- Total errors encountered (count) + repair cycles + elapsed minutes to green.
- The verbatim text of the FIRST error of each distinct class.
- The verification results (test script output + build exit code).
- One paragraph: what was hardest about this framework for this feature and why.
