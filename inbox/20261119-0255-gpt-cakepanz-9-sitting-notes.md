SPEAKER: GPT | ROLE: Independent council seat / technical reviewer | TASK: Cakepanz-9 sitting — verification, w89 tools, framework opinion | DATE: 2026-11-19T02:55Z

## VERIFICATIONS

**Execution boundary.** I read the council prompt, the v4 Z.ai order, the 8.1 delivered trees, the tools ask, the stats brief, the framework record, the Owner's two verbatim memos, and the relevant Git objects/files through GitHub. I attempted a shallow clone of `kozikosi/Football-Sim`; the runtime could not resolve github.com (`Could not resolve host: github.com`). Therefore I did NOT run Node, npm, git archive, diff, cmp, Playwright, or any battery locally. Labels below distinguish my independent Git-object/static checks from the repo's existing receipts.

1. **Hosting integrity — NOT RUN.** No Desktop source or independent hosted checkout was available. No `diff -rq` claim.

2. **Pins vs delivered engine — VERIFIED at Git-object/blob level; local archive command NOT RUN.**
   - Pin `5c808472` `colors/src`: 67 blobs. Shipped `cakepanz-4/src/engine`: the same 67 blob SHAs, path for path. This establishes file-content identity; I did not reproduce the requested local `git archive | diff -rq`.
   - Pin `65673a00` `colors/src`: 68 blobs. Prepared `cakepanz-4-prepared/src/engine` has the identical Git tree SHA `6734a3aa5c1d9dd79ed04273f44a6b57eaba4a02`.
   - Direct pin-to-pin blob comparison: exactly two differences: `sports/nfl/sim/game.ts` (modified) and `sports/nfl/sim/passclass.ts` (added). This matches the expected cross-delta.
   - Note: shipped snapshot file modes differ from the old pin (100755 vs 100644) even though blob contents match. `diff -rq` is a content comparison, so this does not contradict the expected result.

3. **Flex census — VERIFIED from the delivered JSON; SHA REPORTED from receipt.** I parsed prepared `tools/mathlab/flex.json`: 99 rules; `{"0":17,"2":17,"6":42,"12":23}`; SS>NICKEL 0, FB>TE 2, FB>RB 2, C>OG 6, OG>C 2, QB>FS 12. The reported SHA256 `76c02c659880e218d85aac335b5489848cdc3903877b5d7836201fd1db846a6a` appears in h22, but I did not independently hash the file.

4. **Engine suites — REPORTED, NOT RE-RUN.** The existing raw logs h2/h11 contain 394/394 shipped and 406/406 prepared, exit 0. No local npm execution.

5. **Node battery — REPORTED, NOT RE-RUN.** h3/h12 contain 33/33 for both trees, exit 0, and show the correct `node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs` invocation. No local execution.

6. **Prepared numerals gate with `CP_PIN=65673a00` — NOT RUN; STATIC FAILURE CONDITION VERIFIED.**
   - The prepared gate reads `process.env.CP_PIN || '5c808472'` and checks every scanned document for that exact current-pin token.
   - Prepared `MERGE-GUIDE.md` line 3 says the guide is pinned to `5c808472`; it does not name `65673a00`.
   - Therefore the requested prepared invocation must fail on `MERGE-GUIDE.md` with `NUMERALS FAIL: MERGE-GUIDE.md never names the CURRENT pin (65673a00)`, exit 1, unless the file changes. The h21/h23 CLEAN receipts are default-environment runs; they do not prove the override invocation. This independently confirms the reported defect's cause, not its runtime stdout.

7. **§22 cite-check — PARTIALLY VERIFIED; discrepancies found.**
   - The listed h2/h11, h3/h12, h5/h14, h6/h15, h7b/h16b, h8, h9, h10b, h18, h20, h21 and h23 files exist. Their contents support the stated engine, node, shell, slice, late-battery, falsifier, mutation and manifest counts.
   - The dist SHA in §22.2 (`4ce69205b72a8f33bdb6015ec95c3abf317748730c22000eb1bdd592e507057a`) is present in h4 and h13. But §21.8 still calls `1529a003…` the current dist hash. h23 is a post-doc-sweep gate log and does not remeasure the dist. The document therefore carries two different “current” dist hashes; §21.8 needs a dated superseded marker or a fresh hash receipt.
   - §22.2b's FIX-RECEIPT and START-OF-CHAT hashes point to “§22.2b below”, not to raw stdout files in `receipts/partH-c8-1/`. I could not resolve those two hashes to a receipt in the named receipt set. They need actual sha256/cmp stdout receipts or must be labelled REPORTED.
   - The numerals entries cite default-environment h21/h23 outputs; they do not cite a `CP_PIN=65673a00` run. This is the missing prepared-gate proof above.
   - §22.3 row 11 still describes the FULL BOARD door / late-mode-off transition as current. The Owner's 2026-11-19 memo explicitly says one uniform board for every pick. That historical row should be marked SUPERSEDED 2026-11-19 and point to the uniform-board ruling; do not silently rewrite the historical test result.
   - The shipped `ACCEPTANCE-RECEIPTS.txt` body is complete through steps 1–17 and ends “ACCEPTANCE RUN COMPLETE”; its current nine-line top pointer incorrectly says the composite could not complete. The prepared sibling is genuinely truncated during step 8b; `k1` is a 52-byte echo and `k2` is empty. The prompt's distinction is correct: shipped pointer needs the one-line correction; prepared remains open until a real composite lands.

8. **Gate-manifest discrepancy — REPORTED, NOT FRESH-EXTRACT RE-RUN.** h20/h23 show shipped PASS 314 and prepared PASS 319, including both passes in h23. I did not make fresh extracts or execute the gate. The gate script resolves its tree from its own script URL, so “wrong working directory” is not established as the explanation for VL's report; a fresh-extract run remains the tie-break.

9. **Snake order — SOURCE VERIFIED; PROBE NOT RUN.** `src/engine/sports/nfl/engine/draft.ts` implements `snakeOrder` as ascending team indices on even-numbered zero-based rounds and descending on odd rounds. Minimal read-only probe:
   ```sh
   node --experimental-strip-types --input-type=module -e "import {snakeOrder} from './src/engine/sports/nfl/engine/draft.ts'; const a=snakeOrder(4,4); console.log(Array.from({length:4},(_,r)=>a.slice(r*4,(r+1)*4)))"
   ```
   Expected output: `[[0,1,2,3],[3,2,1,0],[0,1,2,3],[3,2,1,0]]`. This is evidence for the engine's alternating snake, not a ruling on draft semantics.

10. **gh-pages vs fix — CONTENT VERIFIED; cmp NOT RUN.** The live `gh-pages:67-cakepanz/README.md` names `4ca9a071` / 52 files. The delivered `gh-pages-fix/README.md` names `d3bd81d2` / 57 files. I did not unzip or `cmp` the two-file fix, and I make no placement recommendation.

11. **Root-history divergence — ROOT COMMITS VERIFIED; BRANCH-TIP COUNTS NOT RUN.** GitHub commit objects show both `474eb52c24204cb66895a435be9ec447c7f05dd4` and `268fd5642254792963f2005de2cbe496a0609502` have empty parent arrays; the compare endpoint reports no common ancestor. For the two root commits themselves, the symmetric difference is exactly **1 / 1** (one root commit reachable only from each side). This is NOT a branch-tip ahead/behind count. The requested local `git rev-list --left-right --count` was not run because the clone failed DNS resolution. If the Architect needs full branch divergence, run it against the two branch tips, not the root commits.

## TOOLS — RANKED, USE-CASE FIRST

1. **`@tanstack/svelte-table` — conditional YES for the heavy Stats/Awards tables, never the draft board.** Use case: one shared table primitive for 44 stat keys, column visibility, facets, sorting and pagination across Awards, YOUR STATS, ALL TEAMS and PLAYOFF STATS. Cost: one direct MIT dependency plus `@tanstack/table-core` transitively; actual min/gzip delta NOT measured in this scaffold and must be measured in the production one-file build; zero engine touches. The Svelte manifest currently lacks it despite the architecture spec naming it. It beats hand-rolling if the full 44-key visibility/facet requirement ships; for simple standings/small tables, the shared hand-rolled StatTable is cheaper. Law: L15–L17 + F23–F25; add column-visibility/facet parity assertions before adoption. Owner decision Q3 still governs.

2. **Seeded Playwright screenshot goldens — YES, zero new dependencies.** Use case: detect 4-pixel/token/palette drift after every visual pass, at fixed seeds, viewport and browser. Cost: 8–10 fixtures; 0 runtime bytes, 0 engine touches, no new dependency. Law: screenshots are stable across two clean runs; unapproved pixel diff fails; approved intentional change updates the golden with a named reason. This is the best low-cost insurance for the repeated palette work.

3. **Keyboard D-path (arrows / Enter / D) — YES, additive only.** Use case: a user speed-running a known draft can move focus and draft without a mouse; the visible DRAFT button remains the primary control and is never replaced. Cost: ~80 lines, 0 deps, 0 engine touches. Law: complete a 32-pick draft using keyboard only; focus is always visible; no page errors; screen-reader names remain meaningful. Avoid global shortcuts while typing in inputs.

4. **`axe-core` via Playwright — YES as QA-only.** Use case: catch unlabeled icon controls, invalid ARIA relationships and focus problems in Team Select → Board → Hub → Complete. Cost: one dev-only dependency, zero product bytes, zero engine touches. Law: zero serious/critical violations on the defined flows; any exclusions are named and justified, not globally suppressed.

5. **Rosetta chips — YES, small and copy-safe.** Use case: tapping “gone%”, “priority” or “wins” opens the corresponding existing Guide sentence, with the live number interpolated; no new explanatory sentence is authored. Cost: ~60 lines and one small tooltip/chip component; 0 deps, 0 engine touches. Law: every chip resolves to a non-empty existing Guide sentence; keyboard and touch both work; no dead ends.

**Chart decision and mock comparison.** Charts can be built from data that exists today (e.g. `leaders('pyd')` / `LEADER_KEYS`, award leaders, and PF/PA). Do not invent a weekly probability/momentum series.

Hand-built SVG mock for a PF-vs-PA screen (32 engine `Book` rows; existing labels only):
```text
PF ↑   •  • •    •                 PF ↑   • • •  •
     • •    • •                         •   • •
   •   • •      •                     • •     •
   └────────────→ PA                  └────────→ PA
          inline SVG                    ECharts / Unovis
```

Dependency-backed mock (ECharts) for the same data:
```ts
const points = book.map(team => [team.PA, team.PF]);
const option = {
  xAxis: { type: 'value', name: 'PA' },
  yAxis: { type: 'value', name: 'PF' },
  series: [{ type: 'scatter', data: points }]
};
chart.setOption(option);
```

Judgment: the data exists, so a PF-vs-PA scatter is legitimate; this is not a “no data” rejection. But 32 dots and two axes are a fixed, branded component. Inline SVG gives exact typography, tokens, accessible labelling and no runtime dependency. The ECharts/Unovis production gzip delta is NOT measured here; do not repeat a byte estimate until the exact version is installed, built and measured. Either library also adds a wrapper and default axis/tooltip conventions. Hand SVG wins today. Revisit a chart library only if several genuinely interactive charts need axes, zoom, legends and tooltips. No chart library now.

**Other candidates challenged / disposition.**
- **`@lucide/svelte`: DEFER.** Award icons are attractive, but a few trophy/medal/shield glyphs do not justify a package when inline SVG is tiny and tree-shaken icons still need a11y labels. Revisit if icon count grows materially.
- **“The run so far” share card: GOOD NEXT FEATURE; use plain canvas, not `html-to-image`.** Fixed 1080×1350 export from known record data is easier to render deterministically on canvas (~150 lines, 0 deps, 0 engine touches). `html-to-image` wins only if faithfully capturing a complex DOM card is more important than predictable font/layout control; it adds a dependency and browser/font edge cases. Law: exported PNG values equal the VM's best steal / gasp / SB-winning pick; repeated render from the same record is identical.
- **64-combination team-palette contrast guardrail: YES, QA-only.** Zero deps / product bytes / engine touches; assert ≥4.5:1 for all 32 palettes × dark/light and name the failing team/token.
- **Pick-complete pulse/haptic: pulse MAYBE, vibration NO.** CSS pulse can join the already-approved reveal; `navigator.vibrate` support is inconsistent (notably iOS) and adds little to the desktop-first experience. Reduced-motion must disable the pulse.
- **Game-pace setting: DEFER.** It introduces a new settings control and behavioral surface before the Owner has approved the additional copy/setting. Keep reduced-motion respected; do not add new text.
- **Shot-replay: DEFER until after core dashboards.** Good ceremony, but it is more than a cosmetic 120-line flourish if replay controls, skip and state restoration need laws. Not a tool priority.
- **`lz-string`: NOT NOW.** Use only if measured local save-envelope size or Safari quota pressure makes compression necessary; replay-based hydration currently makes this speculative.
- **Out per Owner constraints:** drag-and-drop, UI kits, PWA/service worker, virtual scroll for ~1.7k rows, Zod, Storybook, analytics, and anything that touches the board layout or replaces DRAFT. No CDN; all adopted runtime dependencies must be bundled into the one file.

## FRAMEWORK — FOUR LINES

1. **Vote + confidence:** Svelte 5 + Vite — **70%**.
2. **Evidence:** I directly read both scaffold `package.json` and `CLAUDE.md`: Vue has Pinia/VueUse/TanStack Vue Table; Svelte's manifest has none of its specified table/icon/utility packages, but its rules mandate Svelte MCP before component edits, while Vue's rules prohibit `vite-plugin-vue-mcp` on Vite 8 because its peer support stops at Vite 6.
3. **What would change my mind:** a sealed uniform-board or Complete-flow port, run under the same agent/tooling and acceptance budget, shows Vue has materially fewer defects or faster maintenance without adding a second state store behind the existing engine/port seam.
4. **Reading of filed positions:** GPT's earlier 60/40 Svelte lean and Ernie's ~60/40 are closer to the repo evidence than the Architect's LOW-confidence Vue case; Inkling's 70/30 is plausible because the shipped, battery-backed shell is already Svelte and the current agent-tooling lane favors it. The Architect's “agents maintain it with fewer defects” needs comparative defect receipts, not intuition. I do not treat Evan You vs Rich Harris as a meaningful proxy for this project's maintenance outcome; the creator's intelligence is not the relevant measured variable.

WOULD CHANGE YOUR MIND: a fair, sealed Vue-vs-Svelte implementation of the same uniform-board/Complete slice demonstrates a repeatable Vue advantage in agent defect rate or maintenance time, or the project develops a concrete requirement that the current Svelte bridge cannot meet cleanly.
