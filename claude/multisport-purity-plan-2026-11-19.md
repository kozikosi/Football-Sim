# Multisport purity-test plan (Architect, 19 Nov 2026). THINKING ONLY: nothing here is built; nothing ships before the football cutover; SHIP-FIRST stays first.

The class of check is the fence's class: lexical, mechanical, run on every commit, and each one proven able to fail by a planted violation (`tools/ci/canary.mjs`). Nothing here depends on judgment, trust or a framework verdict.

## What exists (VERIFIED, `06d8972`)
- `test/nfl/purity.test.ts`: per-file engine purity (no DOM, `Math.random`, clock, storage, `process`, `require`; imports only sibling engine files or `src/core`), with a self-test.
- `test/core/namespacing.test.ts` "layout": core imports only core; a sport imports only core and itself, never another sport; core has no DOM, storage, clock or `Math.random`; `envelope`/`keys` import nothing.
- `test/core/neutrality.test.ts`: no framework import outside a `ui/` folder.
- `tools/ci/canary.mjs`: 5 planted violations, each must turn the right test red.
- Core already carries the sport seam as data, not a type: sport-prefixed ids, `sim:<sport>:` keys, per-sport envelope kinds and profile container. Correction: I earlier spoke of a `SportModule` seam; `git grep SportModule -- src` finds nothing. The seam today is the sport folder plus those namespaces.
- The one place core names a sport in code: `core/envelope.ts` (`SPORT_IDS = ['nfl']`, `SAVE_KINDS`, and the legacy default `x.sport === undefined ? 'nfl'`). Other core mentions are comments. That file is on the fence, so adding a sport touches a Claude-only path by construction.

## The gaps (what a second sport would break silently)
The engine purity test hardcodes `sports/nfl/engine/`. A second sport's engine would get no check at all.

## The checks, in the order I would build them after cutover
1. **M1 Discover sports, do not name them.** Run the engine-purity and layout tests for every folder under `src/sports/*/`, and fail if a sport folder has no `engine/`. Cheapest, closes the main gap.
2. **M2 Registry consistency.** `SPORT_IDS` equals the set of `src/sports/*` folders; `SAVE_KINDS` has exactly those keys; every file in `data/packs/` starts with a registered sport id. Both directions, so a half-added sport fails.
3. **M3 Second-sport canary.** In the scratch copy, add a `sports/toy/` with a clean engine (must pass) and plant a violation in it (must go red). Proves M1 discovers, and that nothing in core assumes `nfl`.
4. **M4 Sport-word ratchet in core.** Strip comments, then count sport-specific identifiers and string literals in `core/**`; pin today's count (the three `envelope.ts` sites above) and let it only go down, same ratchet style as `tsc:check`.
5. **M5 Layer direction.** Record today's cross-folder imports inside a sport (counts from my grep, which only saw the `../<folder>/` form: app to engine 29, app to view 4, view to engine 14, view to sim 4; engine none) as a pinned graph; a new edge fails until the Architect re-pins. I have not decided whether app to view is intended; that is a question to answer when this is built.
6. **M6 Type-level probe.** Compile a minimal toy sport against core with `tsc` in the canary scratch copy; a core type that bakes in football (down, quarter, yard) fails to accept it.

## Not decided (UNKNOWN)
Which concepts are sport-neutral (clock, possession, drive) and which are football's; whether a second sport shares the `sim/` shape. That is design for after the football ship. These checks only keep the door from being nailed shut meanwhile.
