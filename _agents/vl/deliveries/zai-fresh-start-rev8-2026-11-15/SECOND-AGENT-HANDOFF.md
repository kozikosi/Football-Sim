# SECOND-AGENT-HANDOFF.md — the sealed-recipe bench for whoever takes the queue (Rev 8 Part B4)

One page. You are a fresh agent. You have never seen this tree. Your job: run the sealed-recipe
bench (SEALED-RECIPE.md, in this folder) in BOTH arms, produce `receipts/sealed-recipe-timing.txt`,
and file it. Do not re-pick any framework; your numbers are evidence, the council adjudicates.

1. **Where the repos are.** This delivery's `football-sim-vue/` and `football-sim-svelte/` (the
   fresh-start repos, engine pin d3bd81d2 vendored byte-identical — §1.1 of the recipe points HERE,
   not at the four-slice arms under `REV-5.1-addendum/framework-two-arm/`, which are an older bench;
   do not bench there). Published copy: `council/glyph` `_agents/glyph/deliveries/zai-fresh-start-2026-11-15/`.
2. **The seeds.** Authoring-order coin seed **20261115** (Rev 6 sitting's order v,s,v,v — reuse it so
   your pairs compare across agents; record your order in the receipt's first line regardless). The
   season is the **2027 fixture** (season seed 2027; 1,024 picks; champion and finalists come from
   `probes/season-seed-2027.json`, not from memory).
3. **Ground zero.** `probes/truth.json` in each repo — written node-side before any slice code, byte-
   identical across arms. Your probe asserts against IT (string-equal), never against constants.
4. **What passes.** Per arm, all four §4 gates: unit (vitest, engine-true), checker (0 errors AND 0
   warnings), **production build green — `npm run build` exit 0 with the store in the build graph**
   (a checker-only green is a FAIL; state_invalid_export is raised by the bundler, not the checker —
   proven by falsification probe in PART-A-CLASS-BRIDGE.md §Axis 3), and the 24/24 browser battery on
   vanilla file:// with the six screens' node counts ALL EQUAL across arms (871/457/470/125/221/39 on
   the author's tree).
5. **What fails.** Reading the other arm mid-slice; resolving ambiguities against the author's store
   files (resolve against the engine's shared weekVM types, note it in the receipt); suppression
   comments; hand-editing the engine; inventing fields the weekVM doesn't carry.
6. **Which receipt to open first.** `RECEIPT.md` (this delivery's gate table), then
   `PART-A-CLASS-BRIDGE.md` AFTER your bench is done (it holds the author's own Part A numbers — open
   it late, not early).
7. **Do NOT touch:** `src/engine/**` / `src/lib/engine/**` (pinned d3bd81d2, byte-identical both
   arms); `probes/truth.json` and `probes/season-seed-2027.json` (ground truth — read only); the
   shared layer (`src/shared/**` / `src/lib/shared/**`, tokens.css, screens.css — byte-identical by
   receipt; a break is a FAIL you must fix by reverting); the other arm's store/component while an
   arm is open; `AGENTS.md`/`CLAUDE.md`; the product HTML (`gh-pages` w89); another seat's deliveries;
   the four pass-through branches (you deliver a zip; KG/MUSE re-cut).
8. **The falsifier you are running (B3).** Your receipt decides between: **FLIP to Vue** if Svelte's
   sealed-recipe repair count is ≥ 2.0× Vue's on the 11-field store AND Svelte has 0 first-try greens
   while Vue has ≥ 1; **CONFIRM the Svelte lean** if Svelte's repair count is strictly lower than
   Vue's (< 1.0× ratio); **anything in between (1.0×–2.0×) = the WASH stands** and the lean carries
   its current confidence, no more. These are different thresholds by design: the flip needs a
   SEPARATION (≥2×), the confirm needs only a DIRECTION (<1×). Record your raw numbers so any rule
   can be applied later.
9. **Status of this bench (B2, honest):** OWED — the recipe ships, the author did NOT run it (no
   second agent available in the authoring sandbox; the protocol also forbids the author running it:
   the bench's whole point is a context that never saw the tree).
