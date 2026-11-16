SPEAKER: ernie | ROLE: council | TASK: 67 Cakepanz shell finish — review of the delivered tree (Part 1, Part 10) | DATE: 2026-11-16T21:05Z
FOR: R-13

# What I reviewed, and how

**Tree:** `_agents/ernie/deliveries/zai-sitting-1116-fourslice/67-cakepanz-s3-s4-rev2` (the newest Cakepanz app tree on any branch, vendored 2026-11-16 from Z.ai's 2026-11-15 sitting). 100 files under `src/`, 52 under `src/engine/`.

**Method (everything below is VERIFIED — I ran it, receipts in `_agents/ernie/deliveries/cakepanz-shell-review-2026-11-16/`):**

```
npm install --no-audit --no-fund          -> added 38 packages in 2s
npm run build                             -> built in 680ms; dist js 300.97 kB (gzip 102.74), css 14.94 kB
node batteries/slice1.battery.mjs         -> exit 0 · 61 pass · 0 fail · 10 skip · 3 deferred
```

The battery claim on the sitting (`61 pass / 0 fail / 10 loud SKIP / 3 DEFER`, `logs/verification-5-feed-rerun.txt`) **reproduces exactly on my machine** — 61 PASS, 0 FAIL. The s5 README's 75 is a different tree (it includes Slice 5's 14 laws; this app tree has no Slice 5, see below). The 10 SKIPs are all "shell surface / later slice" laws and each carries its reason in `batteries/slice1.battery.mjs:326-336`; none is silent.

# The pin contradiction (Part 10) — RESOLVED, both documents are right about their own tree

Both commits exist and both trees are byte-identical to what they claim. They are **different trees with the same name**:

| tree | `src/engine` vs its named pin | files | evidence |
|---|---|---|---|
| Z.ai app tree (`67-cakepanz-s3-s4-rev2`, slices 1-4) | `4ca9a071` — **identical** | 52 | `diff -rq src/engine <(git archive 4ca9a071 -- colors/src \| tar -x -C $TMP)` -> no output, exit 0 |
| gh-pages `67-cakepanz/` (slices 1-2) | `d3bd81d2` — **identical** | 57 | same command against `d3bd81d2`, 0 differing lines |
| same app tree vs `d3bd81d2` | **11 differences** (5 new files: `core/events.ts`, `core/fold.ts`, `core/keyedrng.ts`, `core/pack.ts`, `engine/legacyprovider.ts`; 6 modified: `core/app.ts`, `app/dataset.ts`, `engine/draft.ts`, `engine/flex.ts`, `engine/slots.ts`) | — | `diff -rq`, 11 lines |

**Verdict:** no document is stale about its own tree. The app README's `4ca9a071` is correct for the app tree; `AGENTS.md` §2's row is correct for the gh-pages copy (it names the location `67-cakepanz/` and the re-pin commit `66096fb1`, which is a gh-pages commit). **The defect is the shared name**: "67 Cakepanz" now denotes two trees with different code *and* different engine pins, in opposite directions — gh-pages has the new engine but slices 1-2 only; the app tree has slices 3-4 but the old engine. Anyone who "re-pins the shell" by following AGENTS.md will re-pin the wrong tree, and anyone who deploys gh-pages ships a shell five slices behind. Z.ai already documented the migration as the Architect's (`filings/inbox-20261115-zai-pin-migration-table.md`: 1/32 user picks identical, QB→FS 10→12, 24→21 flexed picks) — the reviewable fact is that **the two trees have diverged in both directions and nothing in the repo says which one is the shell of record**.

# Inventory (Part 1), screen by screen — what is built, what is missing

Built and working in the app tree (all exercised by the battery I ran):

| screen / surface | state | evidence |
|---|---|---|
| Team Select (32 teams, real alignment, details panel, flows into the board) | built | battery laws 1-8 PASS |
| Draft Board (60 rows, wins-first sort, gone%, flex chips, lineup advice, mode switch + lock, undo) | built | board laws PASS; 832 DOM nodes |
| Hydration + saves (3 slots, corrupt-never-repair, newer-version refusal, real week save hydrates) | built | slice-3 laws PASS |
| Drive-level feed (w88 anatomy, running score, lead Δ, my-drives, newest-first, OT stamp, provenance) | built | slice-4 laws PASS |
| **"my needs" sticky row** (open slots, clickable filter, flex routes) | built | slice-3 laws PASS |
| **gone-odds method tooltip** (engine's own `picksBetween`/`sims`) | built | slice-3 law PASS |
| Shareables (brag card, seed card) | **MISSING from this tree** | no `savesApp`/share code; `deliveries/slice5/README.md` does not exist here. Slice 5 exists only in `_agents/inkling/deliveries/67-cakepanz-s5/` (9 Nov, engine pin `4ca9a071`) — a third Cakepanz tree |
| Season hub / week stepper / week view / standings / bracket / awards / season review / guide / player cards / stats table / settings / season book | **MISSING** | no source files; the battery SKIPs them as "later slices" |
| light mode, team-as-palette, Cinzel, `[data-zpbteam]`, `.ub` | **MISSING** | see the theme finding below |

# Findings (defects, with receipts)

**D1 · The board overflows 390 px by 54 px.** `node probe-390.mjs` -> `vw 390, scrollW 444`, 120 elements past the right edge, all in the row grid (`.cp-gone-wrap`, `.cp-num cp-gone`). Cause: `src/lib/components/BoardRow.svelte:38` `.cp-main { grid-template-columns: 1fr 44px 44px 48px 72px 72px 56px; gap: 8px }` = 336 px of fixed columns + 48 px of gaps + 12 px padding = **396 px minimum**, and there is not one `@media` rule in `App.svelte`, `src/lib/components/*.svelte` or `src/lib/screens/*.svelte` except two `prefers-reduced-motion` blocks. Team Select is clean at 390 (0 overflow); the board is not. "390 px clean, no horizontal scroll" is a delivery law (Part 8 of the council prompt; `AGENTS.md` §10).

**D2 · The feed prints the word "touchdown" on 5 of 22 lines.** `node probe-feed-copy.mjs` renders the shell's own `feedVM` on the pinned snapshot: the rendered summaries include `Houston Texans ends in a touchdown — 9 plays, 3 min.` The string is the snapshot's own (`src/engine/sports/nfl/app/feed.ts:88`, `TD: 'ends in a touchdown'`), and `src/lib/screens/Feed.svelte:54` renders `d.summary` verbatim (`feedVM.ts:133` spreads `...d`). The Owner's style law is "never print the words Touchdown". The shell already rewrites other engine copy into badges (`feedVM.ts:106-115`), so the fix belongs on the shell side (a summary transform) **and** as a §5 to the Architect for the next re-pin. Same audit over the shell's own source: zero hits for "expected scoring", "before kickoff", "sudden death", "injur", and no periods in DRAFT/SEASON/PLAYOFFS/SUPER BOWL — the only hits are inside `src/engine/**`, which is the Architect's.

**D3 · The Owner's visual law is not implemented in this tree.** `node probe-dom.mjs` theme block: `bodyFont: "Times"`, `fontFaces: []`, `data-zpbteam: null`, `.ub` count 0, `colorScheme: "dark"`, `prefersLight: true` but the page stays dark (`appBg: rgb(24,17,20)`). Grep across `src/`: no `fdf2f6`, no `1e1119`, no `Cinzel`, no `data-zpbteam`, no `zcream`, no `--tc`. The team colour is used only as the feed's per-line ink (`src/lib/ink.ts`, contrast-picked against the dark panel). So the shell is a **dark-only gold skin** (76 Pancakes gold on ink), not "beautiful in both modes, the team IS the palette". This is not a regression the shell can fix silently — the palette ruling is the Owner's — but it must be stated in the handoff as the single largest gap between this tree and the Owner's visual law, because Part 3 of the brief assumes "beautiful in both light and dark modes like w89" is already true.

**D4 · Svelte 5 build warning: a state variable that is not state.** `npm run build` -> `src/App.svelte:44:6 'userTeam' is updated, but is not declared with $state(...). Changing its value will not correctly trigger updates`. `src/App.svelte:44` is `let userTeam = 0;` while the neighbouring `screen` is `$state(...)`. The Team Select → board transition only re-renders because `screen` flips in the same handler; any future write to `userTeam` that does not flip `screen` will silently not repaint. Not a today-bug (the battery proves the chosen team flows through), a tomorrow-bug — one line, `$state(0)`.

**D5 · A hard-coded season length in the shell.** `src/lib/savesApp.ts:59`: `lw.state.nextWeek <= 22` — the shell duplicates the engine's season length instead of asking it (the engine's own `weekmap.ts:73` uses the same literal, and `season.ts:75` meets the Super Bowl at week 22). If the season length ever moves, the saves panel silently says "season complete" one week early/late. Part 9 asks for exactly this class of finding; everything else in `src/lib/**` is clean: no hard-coded flex table (the chips call the engine's `fit`), no ratings, no slot values, no draft order — I grepped `flex|penalty|= [0-9]{2,}` across `src/lib` and `src/App.svelte` and the only numeric tables are CSS.

**D6 · `FEED_YEAR = 2027` (`src/lib/feedVM.ts:37`)** is a label constant the shell owns ("informational; drives nothing"). Harmless, but it is a number on screen that the engine does not vouch for — worth a line in the handoff's number-provenance table.

# What I did not do

No Slice 5 review (not in this tree — it is a third Cakepanz tree on `council/inkling`, itself at `4ca9a071`, and it predates the pin migration). No mutation testing (Part 6) — the box-score mutation scope question is a separate open item and I did not run `86f22d10`. No gh-pages render check (slices 1-2 only; no new information beyond the pin finding). No contrast measurements (Part 13) — D3 makes them moot until the palette is ruled.

**Weakest point of this review:** I read one tree (the newest), not all four Cakepanz copies. If the Architect's shell of record is actually the gh-pages tree, D1-D6 describe a tree that is not the one being merged.