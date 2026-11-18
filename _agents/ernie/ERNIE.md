# ERNIE — lane file (rewritten each session; never append)

## BOOT — read this first, every session (do not re-derive anything)

1. `git fetch -q origin`, then the **step-0** checkout from `START-HERE` §1 (the four governance docs).
2. Read this file to the end. It is the handover: what is measured, what is open, what not to redo.
3. Then take the next item from the live queue.

## Identity
- **Seat:** ERNIE · **Model / how reached:** ERNIE / API (kilo gateway) · **State:** advisor (admitted by the Owner 2026-11-13); **MUSE co-delegate** (Owner grant 2026-11-18 03:35Z, with Inkling).
- **Good at:** taking a claim apart with a command, and reporting my own refutations.
- **Standing rule:** four lines per claim (cwd · exact command · ref+sha · output). VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim. "No signal" is a result.
- **Worktree:** `/Users/kosi/Desktop/wt/ernie` · **branch:** `council/ernie` · **merge-base with `origin/council/base`:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`

## Current state (2026-11-18T19:55Z)
- **Nothing in progress.** The council parallel round for the cakepanz-8 window is executed; four filings pushed (`72a72e25`). Worktree clean.
- **Last session:** hosted cakepanz-7, reviewed it (P-316, VERDICT improved), wrote the cakepanz-8 work order v2 for Z.ai, reviewed Inkling's two prompts, drafted and then executed the council parallel round.

## 1 · What not to redo (receipts exist)

The four digests and their roots · goldens `0ccb6319…f3f5` · the 57-file `cmp` · offline (five arms) · the 30-vs-40 sample count · the save-log / no-RNG-cursor mechanism · `cd298e99` (dead) · **the pool gap (1,953 = 1,941+12; 32 LS = 1/team; board 1,921)** · the 69/72 dispute · the de-gated tests (`5a3bb75e`) · **the live wave is w89** · **`file://` defect = module script / absolute `/assets`** · **the fork is pure in (seed,label)** · **`fit(role,dest).penalty`** · **the engine pin of record is `d3bd81d2`; "resolves to the latest" appears ONLY in `claude/NOW.md:4`** · **`state_invalid_export` is a build error invisible to `svelte-check`** · **gap 2773.0386614172 (MEASURED) vs 2700/1800/900 (retired table)**.

**Cakepanz, measured:**
- **The seam is not one door:** 14 files import `src/engine/**`; 63 import lines. At cakepanz-6 M1 PASSES (0 engine imports outside `src/lib/port/`); M5 = 37 lines / 11 files.
- **The M3 swap test PASSES.** **A re-pin is five paths, not one** (`src/engine/`, `tools/mathlab/flex.json`, `test/engine/`, `test/engine.test.ts`, `data/packs/*.json`).
- **Neutrality is ~95% clean:** the only framework import in the TS core is `src/lib/draftStore.ts:3` (`svelte/store`). No runes in any `.ts`.
- **390 px: fixed at cakepanz-2** (390==390 on all 14 shell screens + the board).
- **Cakepanz pin discrepancy RESOLVED:** app tree `4ca9a071` (52 files) vs gh-pages `d3bd81d2` (57). Both READMEs are right about their own tree.
- **EMERGENCY: `1e5` vs the derived `1.7e6` is latent, not behavioural.** Z.ai's `1e6` + `EMERGENCY < PLAYS` is the better constant.
- **The Hungarian's tie rule is untested** (`<`→`<=` changes the assignment: mine 5/300, Z.ai 25/300).
- **CI run `43749063203` says `success`; the failed build step's `conclusion` is `success`** (continue-on-error).

**Cakepanz-7, VERIFIED (receipts: `_agents/ernie/deliveries/cakepanz-7-2026-11-18/RECEIPTS.md`):**
- engine **394/394** shipped + **406/406** prepared; node battery **31/31** both trees; gates **PASS 311 / 316**; shell **46/0**; slice **29/0/10/3**; pins byte-identical to `5c808472` (67 files) and `65673a00` (68); flex **99 rules {0:17, 2:17, 6:42, 12:23}**.
- **`dist/` is byte-reproducible on both trees** (`npm ci && npm run distfile && diff -rq` exit 0; `single.html` `15b44104…5b08`).
- **Two hosted copies are byte-identical** apart from my `RECEIPTS.md` (796 vs 797). **No `src/engine-node/` drift** — my earlier warning was wrong, withdrawn.
- **The stale-count defect is 15 sites, not 4**, identical in both trees (`inbox/20261118-1935-ernie-A3-stale-count-sweep.md`). `VERIFY.txt` contradicts itself: line 502 has the correct 311/316, lines 6, 9, 69-71, 328, 372-386 still say 319/324/326/327/325/330. New vs my A8: `MERGE-README.md:149,152`; `acceptance-run.sh:20,46`.

**The pools fix, measured (`inbox/20261118-1938-ernie-B1-totals-bar-12000.md`):**
- **The totals bar at 12,000 games, both packs. The fix closed about a sixth of the points gap.** Out-of-sample pack **23.30** vs real 2023-25 **22.56** (+3.3%); in-sample **23.43** (+3.8%). Everything else inside ±7% and mostly ±3%. `sim_sd` 8.98 vs `real_sd` 9.92 — hot *and* slightly compressed. **The in-sample pack is hotter than the out-of-sample one**, so it is not a fit-period artefact: the residual is points, not volume.
- **`colors/tools/totals-bar.ts` needs no nflverse** — its `real` columns come from `tools/mathlab/results/phase1-reference-2026-11-15.json`. **It defaults to the in-sample pack** — always pass the pack path and name which.
- **`colors/tools/margins.ts` is the wrong instrument for margins**: it drives `engine/season.ts` → `drives.ts`, not `sim/game.ts` (the pools node).

**The deployed 277/9 (`inbox/20261118-1945-ernie-B2-deployed-277-9-repoint.md`):**
- **286 / 277 / 9 reproduced.** **Not nine stale flex expectations:** seven mechanical (`lineup.test.ts:39` 107→99, `:43` 10→12, `:47` 4→6, `:61` 4→6, `:67` 6→12; `versions.test.ts:18` PIN_ENGINE→`nfl1.14a4e9333e888a`), **two substantive** (`:228` worth **2700** vs the test's 1000; `:239` bench `['FB']` not `['DT']`), one pin.
- **The arbitrage test is a pin, not a loophole.** Live table produces **14**; deployed pins 12; the Architect re-pinned to 18 when the Owner approved FB>TE at 2. **14 is the honest number.** (I first read this as a property violation and withdrew it.)

**Engine / tooling state:**
- **The engine tip is `57fb83c`** (pools node, down-preserving hierarchy; `sim/pools.ts` + `sim/game.ts`; 414/414, tsc 89/89, build clean).
- **The pin-watch gate is CLOSED:** Actions `44262444359` (`1aa7fb3`), `44266214860` (`3363eb0`, the cap fix), `44351214198` (`57fb83c`) all **success**.
- **Cakepanz work order v2** (`council/ernie f4a59895`): Block A hygiene (no code), Block B the P-316 fix (blank board + S29), Block C re-prep **locked**, Block D blocked list. P-337 and R-13 are a later brief.
- **Inkling's parallel-round draft (`ed72c629`) has a wrong §1** — it describes v1. My corrected round is `_agents/ernie/deliveries/prompts-2026-11-18/council-parallel-round-cakepanz-8.md` (`3dbb67fb`). Both must not circulate.

## 2 · What is genuinely open
1. **P-316 is not verified.** The two blockers are filed (blank board, S29) and need Z.ai's Block B.
2. **The cakepanz-8 zip does not exist yet** — Z.ai works to v2.
3. **B3 — P-344 needs three council reviews** (`_agents/muse/deliveries/p-344-nflverse-phase1-2026-11-11/`) before the Architect consumes it. Nobody has taken it.
4. **B4 — the margin gap** is unmeasured on the pools node; `margins.ts` is the wrong tool.
5. **The two substantive re-points** (`lineup.test.ts:228`, `:239`) need the Architect to say which rule change moved them.
6. **P-333** — unanswered by the Owner; my body-count mechanism is struck; VL's `DT→ILB = 6` is the only survivor (gap 700 → 0).
7. **The framework pick** — Owner: TypeScript/framework-neutral until cutover; Vue 3 vs Svelte 5, measurement decides (R-13). My input: the only asymmetric number (repairs 2:1) was a first-arm learning artefact; Rev 10's store 2×2 kills "Pinia buys speed".
8. **The sealed bench is superseded as the instrument** — better: the *same builder* runs the sealed slice twice, order reversed (counterbalanced).
9. **The Architect's ladder patch** (`1e6` + a permanent `EMERGENCY < PLAYS` assertion).
10. **The four sim-layer survivors** — unfixed, unasserted.
11. **CI `continue-on-error`** — report-only by Owner ruling, but the summary lies to machines.
12. **PROJECT-KNOWLEDGE.md antiquation** — edit deferred to coordinate with Inkling (co-custodian).

## 3 · Live files (mine)
- `_agents/ernie/deliveries/cakepanz-7-2026-11-18/` — the hosted cakepanz-7 delivery + `RECEIPTS.md`.
- `_agents/ernie/deliveries/cakepanz-7-review-2026-11-18/` — the A1/A2 repro scripts (`gen-envelopes.mjs`, `midseason-boot-probe2.mjs`, `probe-then-season-nav.mjs`, `falsify-slice3.mjs`).
- `_agents/ernie/deliveries/prompts-2026-11-18/` — `zai-cakepanz-8.md` (v1, superseded), `zai-cakepanz-8-v2.md`, `council-parallel-round-cakepanz-8.md`, `council-parallel-round-review.md`.
- This session's filings: `inbox/20261118-1935-…A3…`, `-1937-…A7…`, `-1938-…B1…`, `-1945-…B2…`.
- Key earlier: `inbox/20261118-0758-ernie-P-316-cakepanz-7-review.md`, `20261118-0815-…pin-watch…`, `20261117-2101-ernie-glm-driveshift-mechanism.md`, `20261118-0041-ernie-P-333-review-inkling-macro.md`.
- Tools: `deliveries/pin-watch-2026-11-17/` (P-355, offline pack mode).

## 4 · Method notes worth keeping
- **Scratch worktree for a pin:** `git worktree add --detach /tmp/x <sha>` then `git checkout HEAD -- colors data tools`. Never `git archive` a blob:none clone.
- **Totals bar:** `cd colors && node --experimental-strip-types tools/totals-bar.ts 12000 ../data/packs/nfl-pools-fit2023-2025.json`. ~2 s per 12,000 games. Needs `npm ci` first.
- **Stale-count sweep recipe:** `grep -rn --exclude=MANIFEST.txt --exclude=CHECKSUMS.txt --exclude-dir=engine --exclude-dir=engine-node --exclude-dir=shots --exclude-dir=dist -E '\b(284|319|324|326|327|24/24|F0[–-]F8)\b'`. Without the excludes, `326`/`284` match sha256 substrings.
- **Shell battery needs a live preview:** `npx vite preview --port 4179 --strictPort &` then `node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs`. `CP_PORT=<n>` moves it.
- **Browser probes:** put the probe *inside* the tree (a `/tmp` script cannot `require('playwright')`). Skip `null` when injecting localStorage (`setItem(k, null)` stores `"null"`).
- **Falsifier discipline:** fresh throwaway copy per mutation, clean baseline FIRST, node-level error = COULD-NOT-RUN.
- **Hosted-copy diff:** `git archive <branch> <path> | tar -x -C /tmp/x --strip-components=<n>` — the component count is the path depth (`_agents/<seat>/<dir>` = 3, `_agents/ernie/deliveries/<dir>` = 4). Getting it wrong produces a phantom "Only in" line.
- **Quoting hazard:** `node script.mjs A>B` in zsh creates a file named `B`. Always quote.
- **Only node 26 on this machine** (`which -a node` → one binary). No Node 24 datapoint available.

## 5 · P-333 (measured, still open)
- **Reproduced:** synthetic ideal rosters 4-3→3-4 lose 2500, 3-4→4-3 lose 1800, gap 700. On the 32 real rosters the bias is one-sided: **28 teams better in 4-3, 3 better in 3-4; mean signed +1144.5**.
- **Round 2:** the real bias is **value shape at ILB2** (Inkling right; my body-count mechanism struck). **VL's `DT→ILB = 6`** → gap 700 → 0. **B3** (`slots.ts:86` ILB2 `dest: 'ILB' → 'OLB'`) → +1144 → −142, 28-3 → 13-14, but makes it a 1-ILB front.
- Harness: `deliveries/p333-gap-options-2026-11-16/`. Pin matters: `d3bd81d2` FB→TE=6 gives 900, `7a0706df` FB→TE=2 gives 700.
- **Not done:** no OVR sweep; no alternative 3-4 slot table; VL's rule + a Part B lever combined.