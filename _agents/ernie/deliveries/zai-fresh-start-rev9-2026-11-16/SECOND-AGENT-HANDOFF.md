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

---

## Rev 9 turnkey patch (2026-11-16) — the three things a cold seat must have (REV-9-ERRATA lines R9.1–R9.3)

**PREFLIGHT (all must be true before authoring anything):**
1. Extract this zip; the two repos are `football-sim-vue/` and `football-sim-svelte/` at the zip root.
   No clone needed — the engine (pin d3bd81d2, 57 files) is vendored in both; verify
   `diff -rq football-sim-vue/src/engine football-sim-svelte/src/lib/engine` → clean, and
   `node scripts/gate-manifest.mjs .` → PASS (the repo CHECKSUMS.txt pins probes/truth.json,
   probes/season-seed-2027.json, fixture.json, the shared layer and the CSVs — a mismatch means a
   tampered ground truth: STOP and report).
2. node ≥ 22 · `npm install --no-audit --no-fund` in BOTH repos from the committed lockfiles ·
   `npx playwright install chromium` (the battery needs the repo's own browser build) ·
   `npx vitest run` green in both BEFORE you author (a red pre-existing test is a bench defect, not yours).
3. Record the recipe sha FIRST, before any code:
   `shasum -a 256 SEALED-RECIPE.md` → it must equal 7fcc3fc0432e29fae4c0d0d384f813da67cd05a0f591f5bb6746f85458e14f07;
   put it in the receipt's first line (`recipe_sha256=…`).
4. Read SEALED-RECIPE.md §1–§6 and NOTHING else from the delivery's verdict/receipt/part-A files.
5. **The league construction (the recipe's ONE missing step — resolved in Rev 9):** build the league
   of record with the SHARED helper `runSeason(pool, picks, 2027, 2027)` from `src/shared/seasonVM.ts`
   (it rates the fixture's complete 1,024-pick draft log engine-true: the 4-3 optimum, RET_NEUTRAL 75,
   `makeRng(2027).fork('season')`) and derive the views through the shared `weekVM` helpers
   (`weekView`, `standingsThrough`, `totalWeekSlots`). Do NOT hand-roll the league build — four
   plausible constructions were tried in Rev 9 and NONE reproduce `probes/truth.json`; the shared
   helper does (verified by Z.ai's run).

**STALL LIST (what to do when something hangs — the Rev 6 failure mode):**
- `npm install` hangs: kill it (Ctrl-C / pkill npm), retry ONCE with `npm install --no-audit --no-fund --prefer-offline`; a second hang is a STALL — record it in the receipt (`stall=<what>`) and continue if the lockfiles are otherwise usable, else stop and file.
- The vite DEV server never prints `Local:` after ~10 s, or the session script never exits: kill the WHOLE process group (`process.kill(-proc.pid)`), not npm alone — the Rev 6 hang was npm dying and the vite child surviving (the fix ships in `scripts/e3-devtools-session.mjs`, use the same pattern).
- The battery or a probe hangs > 120 s: kill, re-run ONCE, then record the stall. Never leave a browser/server running when the bench ends (check `ps`).
- The in-page season materialisation (rosters → lineups → 272 games) takes seconds: WAIT for ready (32 standings rows render) before driving buttons — clicking a not-yet-materialised store's controls is a probe bug, not an arm failure (Rev 9's probe did exactly that once).
- A gate fails: that is a REPAIR (edit + re-run), not a stall. Only infra that does not respond is a stall.

**THE FALSIFIER, MECHANICAL (two runners applying it get the same verdict):**
Inputs: per arm, `repairs` (recipe §5 definition, counted identically: one checker/build/probe failure
that required EDITING already-written code) and `first_try_green` (yes/no per arm).
Compute `ratio = repairs_svelte / repairs_vue` (if repairs_vue = 0, use max(1, repairs_svelte) as the
denominator and note it).
- **FLIP to Vue** iff `ratio ≥ 2.0` AND first_try_green_svelte = no AND first_try_green_vue = yes.
- **CONFIRM the Svelte lean** iff `ratio < 1.0`.
- **WASH stands** iff `1.0 ≤ ratio < 2.0` OR the FLIP conditions are not all met.
- No rounding: compare the raw ratio. Record raw numbers so any later rule can be re-applied.
- Standing caveat: the verdict from an AUTHOR-RUN bench (not blind) is a data point, never the
  falsifier on its own; only a blind second agent's numbers decide.
- Z.ai's own Rev 9 run (receipts/sealed-recipe-timing.txt): repairs 2 (vue) vs 1 (svelte), ratio 0.5
  → mechanically CONFIRM territory, but author-run + one-slice ⇒ **reported as WASH-adjacent data
  point, NOT a verdict** (the caveats in the receipt bind).
