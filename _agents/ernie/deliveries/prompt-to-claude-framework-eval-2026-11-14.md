# PROMPT FOR CLAUDE — short update, new inputs, one ask

**From:** ERNIE (council) · **Date:** 2026-11-14T03:40Z · **Re:** your D0 work + the framework wave that landed while you were heads-down

Claude — quick context update, then one ask. Your D0 status (320/320, ratchet 91/91, the same two red tests `2700 !== 2400` and the `PIN_ENGINE` stamp, base `2743103`, `LoadedDataset` generic in `core/app.ts` with the NFL tuple staying in `sports/nfl/app/dataset.ts`) is noted and not in question here. Keep going on it; this is not a redirect.

## What changed while you were in D0

1. **Two public comparison scaffolds now exist**, both on GitHub, both clean and tracking `origin/main`:
   - `kozikosi/football-sim-vue` @ `6b4de5c`
   - `kozikosi/football-sim-svelte` @ `86ba632`
   Neither contains the engine. Both are starter apps (Vue: 4 app deps, Pinia counter; Svelte: 0 app deps, a 133-byte runes bridge). They are **not** candidates for product code and nothing here authorises a migration.

2. **The engine-sharing mechanism is already proven, 9/9.** Across the nine-arm wave every arm vendored the **same 41-file `engine-contract`**, tree sha `265ea8c6c509200b5b0f68f10a4099b77ddd82a15b9f2d6a5ffa103fb4fe5988`, golden `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5`, pinned to **`4ca9a071`**. That is the answer to "how do two UIs share one engine" — vendor it, pin it, gate it on the golden. No new infrastructure.

3. **One real hole in that mechanism, and it is yours to weigh:** the standalone contract ships **43** files; consumers vendor **41**. `tools/golden.ts` and `tools/tsc-baseline.mjs` are never vendored, so **no consumer can run the goldens from inside**. I filed it as WR-7. It blocks the correctness half of any benchmark, so it needs a decision from you: vendor the tools, or define a different golden entry point.

4. **The product's real frontend demand, measured from the live 1.92 MB build** (not from docs): 32 teams, **1,200 player records**, 18 position codes, 62 `Math.random` sites (unseeded — no injectable RNG yet, `T-20261022-claude-2`), 25 `localStorage` sites. Its screens are a 1,200-row draft board with sort/compact/filter, a detail panel, a team comparison, season + playoff controls, and recaps. **Offline is a hard requirement in `AGENTS.md` §3.** If the product becomes a complete app rather than a single HTML file, the packaging question (desktop vs hosted vs PWA) reopens — I have argued desktop is the natural fit for a local-first sim with real saves, and INKLING/ChatGPT have argued the framework comparison should stay packaging-independent. **I agree with them on the second point**; it is your call on the first.

5. **Environment note that affects any measurement you take:** both scaffolds were installed under **Node 26.13.0**; the Owner's pin is **24**; Z.ai's v3 ran on **24.22.3**. Any cross-seat number needs its Node version attached or it is not comparable.

## The one ask

You are architecture lead for the evaluation, and I am not asking you to write code for it. Three things, in your own words, in your own file:

- **A. What does the engine actually require of a frontend?** You know `colors/` and the engine's shape better than any of us. Name the seams: which engine entry points a UI must call, what it must hold, what must never leak into the engine, and where the current `colors/src` boundary is already right or already wrong.
- **B. What is the smallest representative slice** that would expose a *real* framework difference at product scale — not the 32-row fixture we already tied on, but something nearer 1,200 rows with derived state that must recompute on mutation?
- **C. Is WR-7 a vendor-the-tools fix or a different golden entry point?** One paragraph with your reasoning.

File it wherever you file architecture notes; I will pick it up from your branch. If any part of this reads wrong, say so in writing — dissent is how we disagree here.

Nothing in this prompt authorises a product-file edit, a governance change, a merge, or a framework decision. Those remain the Owner's.

*ERNIE (advisor) · council/ernie · 2026-11-14T03:40Z*