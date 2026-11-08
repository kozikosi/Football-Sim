# 67 Cakepanz — Slice 1: the Draft Board (Z.ai · High Councillor · 8 Nov 2026)

**Slice:** 1 of 5 (the Draft Board — the board, the rows, the header, the footer, the slot picker, the pick flow, the on-clock indicator, the gone-odds display, the flex display, the lineup advice, the sort controls, and the valuation-mode plumbing) ·
**Pinned engine commit:** `4ca9a071` on `architect/engine-and-seats` ·
**Run it:** `npm install && npm run build && npx vite preview` → open `/` (the empty state per the F11 ruling) or `/?dev=1` (the dev build: the engine's own bundled ratings, labelled DEV).

## What was copied into the snapshot (the frozen engine)

`colors/src/**` at `4ca9a071` — 52 TypeScript files, copied verbatim into `src/engine/` (`core/`, `platform/`, `sports/nfl/{app,engine,view}`), plus the three data CSVs the fixture loads (`data/nfl/*.csv`) and `tools/mathlab/*` (the design constants the lineup tests read). **Nothing in the snapshot was edited.** The tree carries the Architect's own test suite (`test/engine/`) re-pointed at the snapshot layout.

**SNAPSHOT BUG FOUND (reported to the Architect — the one contract item this slice needs re-pinned):** `colors/src/sports/nfl/view/draftBoard.ts` at `4ca9a071` has a corrupted line — `fit(p.role, DESTain.slot]).penalty === 0` (a mangled `DEST[c.slot]`). No build can compile it. The engine rule says never edit the snapshot, so `src/lib/view/boardVM.ts` stands in: the SAME view model, line-for-line, with the line repaired, clearly headed as a stand-in until the re-pin. Everything the slice renders flows through it.

## Verification

- **The Architect's own engine tests, re-run in this tree: 284 tests · 284 pass · 0 fail** (the full `colors/test` suite: draft, lineup, store, purity (52), standings, matchup, envelope, viewboard, season, resume-determinism … every file).
- **The slice battery (`batteries/slice1.battery.mjs`): 18 pass · 0 fail · 10 SKIP (loud, each with its reason) · 3 DEFER to cutover.** The APPLY lines run for real in Playwright against the built slice: the board renders 60 rows from the view model; the default sort is Wins (never raw OVR); the on-clock indicator reads Round/Pick/overall; every row carries name · pos · team · OVR · wins · priority · gone%; the sort controls flip (OVR sort actually sorts); the slot picker offers the natural slot first; the pick CONFIRMS before it lands; the pick lands, the footer counts it, and the CPU teams pick on (the clock advances to Round 2); the flex chips read the cost ("-4 flex", the Owner's −N form); undo cuts the log back; **the measured mode is the default ("Model Value" on), the Owner preset is one click away, the switch is DISABLED mid-draft, and the mode label travels with the numbers in the subtitle**; zero page errors.
- The 10 SKIPs are the shell-surface laws (the stage bars, the preseason page, the guide ladder, the cinematics, the phone laws on shell chrome, the season surfaces) — they arrive with their slices; nothing was weakened and nothing silently dropped.

## Comparison notes (vs Claude's tree, per the parallel-work protocol)

- Claude's Colors tree has ZERO Svelte components at the pinned commit — there is no Svelte counterpart to compare against yet; the comparison baseline is the shell's Draft Board (w85). Slice 1 is a faithful rebuild: same data (the view model's plain JSON), same laws (wins-first sort, the flex −N form, gone-odds from the real CPU replay), same information architecture; the visual skin is the shell's dark-gold brand carried into component CSS (76 Pancakes gold on ink).
- The engine contract is consumed, not redesigned: `createStore` (the only DraftStoreState/DraftStoreAction, F1) drives everything; `boardVM` shapes the screen; `goneOdds` powers the gone column; `lineupFor` powers the lineup advice; the flex costs come from the engine's `fit` (never hard-coded).
- Divergence on purpose (documented per §5): (a) the stand-in view model (the snapshot bug above); (b) the dev dataset path (`?dev=1`) is a build input for development only — the public default is the EMPTY state + import, exactly the F11 draft (A) the dataset.ts header implements.

## Innovations (what the plan did not list — the autonomy grant covers them, say-what-and-why)

1. **The valuation-mode module (`src/lib/valuation.ts`) with a hard lock.** The modes are a tiny subscribable whose `lock()` fires the moment a draft starts — the switch cannot change the basis mid-draft by construction, not by discipline. The Owner's three decisions (measured default, Owner Preset one click, the label everywhere) are each one assertion in the battery.
2. **The provenance line.** A permanent subtitle under the topbar reads "Every number on this board reads **Model Value** — the label travels with the numbers" — the witness-gate's spirit, on the page, from slice 1.
3. **The confirm step in the pick flow.** The shell picks on click; Slice 1 shows "Draft <name> at <slot>?" before committing (one tap more, zero mispicks). If the Owner hates it, it is one line to remove.
4. **The engine test suite rides with the tree** (`npm run test:engine` — the pinned commit's 284 tests), so any future re-pin re-proves the snapshot in one command.

## Open questions answered (the continuation prompt's list)

- **Is `draftBoard.ts` sufficient as the data layer?** Yes for the board; the slot picker needed the engine's `fit`/`SLOTS` directly (also-works), and the lineup advice needed `lineupFor` — both already in the snapshot. No extension required.
- **Does the w77 adapter fit a Svelte tree?** Not verbatim — the adapter's hooks are shell DOM ids and engine globals. The battery needs a Svelte adapter shaped like this repo's `batteries/slice1.battery.mjs` (law-level, Playwright against the built app, engine snippets via imports). Proposed as the adapter pattern for the remaining slices.
- **Slice order:** Draft Board → Team Select → hydration → feed → shareables still reads right (the board was the right first slice: it forced the store, the view model, the modes and the data path through the whole stack).
- **The snapshot mechanism:** confirmed right — the freeze caught a real snapshot bug instead of letting me patch around it silently.
- **What I would innovate next:** the gone-odds column deserves a "between now and my next pick" tooltip explaining its method on hover (the engine already computes it; the shell never told the user), and the board wants a "my needs" sticky row (which of my 32 slots are still open, clickable to filter).

## Not in this slice (the boundaries, respected)

Slices 2–5, no ratings generation, no engine edits (one bug REPORTED, worked around in my tree only), no brand change (76 Pancakes on the page; 67 Cakepanz in the builders' names), none of the rejected four.
