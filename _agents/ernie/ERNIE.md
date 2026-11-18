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

## Current state (2026-11-18T08:05Z)
- **Nothing in progress.** cakepanz-7 hosted + reviewed, committed, pushed (`7c854525`). Worktree clean.
- **Hosted deliveries (mine):** `zai-fresh-start-rev{8,9,10}-*/`, `zai-67-cakepanz-2-2026-11-17/`, `cakepanz-5-2026-11-17/`, `cakepanz-6-2026-11-18/`, **`cakepanz-7-2026-11-18/`** (796 files / 33 MB, `ee8f39c9`).

## 1 · What not to redo (receipts exist)
The four digests and their roots · goldens `0ccb6319…f3f5` · the 57-file `cmp` · offline (five arms) · the 30-vs-40 sample count · the save-log / no-RNG-cursor mechanism · `cd298e99` (dead) · **the pool gap (1,953 = 1,941+12; 32 LS = 1/team; board 1,921; filter `draft.ts:53` + `store.ts:40` + `dataset.ts:47,88`)** · the 69/72 dispute · the de-gated tests (`5a3bb75e`; both LIVE) · **the live wave is w89, not w85** · **`file://` defect = module script / absolute `/assets`** · **the fork is pure in (seed,label)** · **`fit(role,dest).penalty`** · **w89 default is pale rose `#fdf2f6`, dark is a `data-theme` variant, `--tc` does not exist** · **the engine pin of record is `d3bd81d2`; "resolves to the latest" appears ONLY in `claude/NOW.md:4`** · **`state_invalid_export` is a build error invisible to `svelte-check`** · **gap 2773.0386614172 (MEASURED) vs 2700/1800/900 (retired table)** · **DIME distances reproduce on the 1,941-row pool**.

**Cakepanz, measured:**
- **The seam is not one door:** 14 files import `src/engine/**`; 63 import lines. M1/M4/M5 unmet. At cakepanz-6 M1 PASSES (0 engine imports outside `src/lib/port/`); M5 = 37 lines / 11 files.
- **The M3 swap test PASSES:** `src/engine` → `d3bd81d2`, zero edits outside it → build exit 0, battery green. **A re-pin is five paths, not one** (`src/engine/`, `tools/mathlab/flex.json`, `test/engine/`, `test/engine.test.ts`, `data/packs/*.json`).
- **Neutrality is ~95% clean:** the only framework import in the TS core is `src/lib/draftStore.ts:3` (`svelte/store`, 20 lines). No runes in any `.ts`.
- **390 px: the board overflowed 54 px; fixed at cakepanz-2** (390==390 on all 14 shell screens + the board).
- **Cakepanz pin discrepancy RESOLVED:** two trees with one name. App tree `4ca9a071` (52 files) vs gh-pages `d3bd81d2` (57). Both READMEs are right about their own tree.
- **1b at `86f22d10`: 363/363, tsc 89/89.** The ratchet **is** a ratchet; **12/12 mutations killed**. Four survivors: `sim/box.ts` `puntYards`/`touchdowns`/`firstDowns` unasserted; an interception's spot unasserted; "every screen agrees" blind to a *consistent* misclassification. **`tsconfig.json` excludes `test/`** — the ratchet covers `src/` only.
- **CI run `43749063203` says `success`; the failed build step's `conclusion` is `success`** (continue-on-error).
- **EMERGENCY: `1e5` vs the derived `1.7e6` is latent, not behavioural** — identical lineups on 300/300 rosters, 0/32 real rosters differ. Only `> PLAYS` reaches 0 fills. Z.ai's `1e6` + `EMERGENCY < PLAYS` is the better constant.
- **The Hungarian's tie rule is untested** (`<`→`<=` changes the assignment: mine 5/300, Z.ai 25/300).

**Cakepanz-7 (this session, VERIFIED, receipts in `_agents/ernie/deliveries/cakepanz-7-2026-11-18/RECEIPTS.md`):**
- **Every headline number reproduces:** engine 394/394 shipped + 406/406 prepared; node battery **31/31** both trees; gates **PASS 311 / 316**; shell **46/0**; slice **29/0/10/3**; pins byte-identical to `5c808472` (67 files) and `65673a00` (68); flex **99 rules {0:17, 2:17, 6:42, 12:23}**, `SS>NICKEL` at 0, six 0→2 landings at 2, `FB>TE` at 2.
- **`dist/` is byte-reproducible on both trees** (`npm ci` → `npm run distfile` → `diff -rq` exit 0; `single.html` `15b44104…5b08`). The two dists are identical to each other — correct: `passClass` has 0 hits in `single.html` (tree-shaken).
- **NEW PRODUCT DEFECT (mine):** mid-season refresh lands on a **blank draft board**, not the hub. `App.svelte:194` `if (!r.draft) go('hub')` + `beginSeason()` never clears the draft autosave (only lines 115/167 call `clearAutosaveWeek`) ⇒ both keys exist ⇒ `loadDraft()` (line 193) has already done `go('board')`; and `refresh()` (119-128) swallows `goneOdds`'s `goneOdds: it is not the user's pick` throw on a completed draft ⇒ `vmStore` null ⇒ `{:else if screen === 'board' && $vmStore}` renders nothing. Control: mid-draft → 60 rows. The season IS resumed (SEASON nav → `data-phase="running"`, WEEK 2). Fix filed in the review §2.
- **NEW LAW TAUTOLOGY (mine):** S29 is phase-blind — with `void hydrateBoot();` deleted the shell battery is still **46 pass / 0 fail** ("hub re-mounted from the week save"). N25 does catch it (my F11).
- **The three new laws ARE falsifiable** (my `falsify-slice3.mjs`, both trees) though the delivery's suite stops at F10 and has no case for N25/N26/N27.
- **Five hygiene defects:** D-1 node log ends `exit=1`; `acceptance-run.sh:20,46` print `24/24` and `F0–F8`; `284 tests` in `README.md:29` + `slice1.battery.mjs:12` (actual 394); README's shell-battery line omits the Part-D register; `FIX-RECEIPT.md` says "ONLY those two files" for a three-file zip.

**Earlier, still load-bearing:** battery:node **26/0/10/3** on the app tree (s5 README's 75 = that + Slice 5's 14 in another tree) · the 2773.0386614172 gap · **P-333: my body-count mechanism is WRONG (struck); the bias is value shape at ILB2. VL's `DT→ILB = 6` is the only survivor (gap 700 → 0)** · **B3 (`slots.ts:86` ILB2 `dest: 'ILB' → 'OLB'`) → real bias +1144 → −142, 28-3 → 13-14, no weight or flex rule touched** · the `1e6` ladder · the four sim-layer survivors unfixed.

## 2 · What is genuinely open
1. **The framework pick** — Owner: TypeScript/framework-neutral until the cutover; Vue 3 vs Svelte 5, measurement decides. My input: the only asymmetric number (repairs 2:1) is a first-arm learning artefact; Rev 10's store 2×2 kills "Pinia buys speed" (wrapper tax 36 L Vue / 32 L Svelte, framework delta 7 L inside ±11 L noise; leanest store = a Vue `reactive` module at 45 L).
2. **The sealed bench is superseded as the instrument** — better: the *same builder* runs the sealed slice twice, order reversed (counterbalanced).
3. **Cakepanz-7 §2 (the blank-board defect)** — mine, filed, needs a builder. Blocks P-316 verification.
4. **S29 phase-blind** — mine, filed.
5. **P-333 is unanswered by the Owner** (small gap without hand-lowering DIME). My finding: a small gap and few moves are opposite goals.
6. **The Architect's ladder patch** (`1e6` + a permanent `EMERGENCY < PLAYS` assertion).
7. **The four sim-layer survivors** — unfixed, unasserted.
8. **CI `continue-on-error`** — report-only by Owner ruling, but the summary lies to machines.
9. **Queue P0s never reached** — P-143 / P-160 / P-163 / P-164 / P-165 (product copy reviews).
10. **PROJECT-KNOWLEDGE.md antiquation** (my 14d finding) — edit deferred to coordinate with Inkling (co-custodian).

## 3 · Live files (mine)
- `_agents/ernie/deliveries/` — every hosted delivery and probe (see §Current state).
- This session's filings: `inbox/20261118-0758-ernie-P-316-cakepanz-7-review.md` (`7c854525`); bulletin `20261118-0805-ernie.md`.
- Key earlier filings: `20261117-2101-ernie-glm-driveshift-mechanism.md`, `20261117-2125-ernie-glm-mechanism-adjudication.md`, `20261118-0041-ernie-P-333-review-inkling-macro.md`, `20261118-0048-ernie-P-189-pin-watch-compare.md`, `20261118-0141-ernie-R-13-cakepanz-6-review.md`.
- Tools: `deliveries/pin-watch-2026-11-17/` (P-355, count-first + 3-file spot hash, offline pack mode), `deliveries/cakepanz-7-review-2026-11-18/falsify-slice3.mjs` (drop-in F11–F14 for the node battery).

## 4 · Method notes worth keeping
- **Scratch tree:** `git archive origin/architect/engine-and-seats colors data tools | tar -x -C /tmp/eng`; node 26 runs the `.ts` directly. `npm install --no-save typescript@5.9.3` before `tsc-baseline.mjs`.
- **Three-variant A/B/C:** copy `src` to `/tmp/t{A,B,C}/colors/src`, patch only the ladder line, import all three in one script.
- **`npm ci` inside a hosted delivery leaves `node_modules`.** Move it out, re-run the manifest gate, then push. `npm ci` on npm 11.19.1 does NOT run install-scripts — check `node_modules/.bin/esbuild --version` before blaming the build.
- **Dist freshness, the strong way:** copy the tree to `/tmp`, `mv node_modules` in, `npm run distfile`, `diff -rq dist`. Content-hashed asset names make a byte match decisive.
- **Shell battery needs a live preview:** `npx vite preview --port 4179 --strictPort &` then `node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs`. `CP_PORT=<n>` moves it. Without the register every node-side TS entry dies with `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`.
- **Browser probes:** put the probe *inside* the tree (a `/tmp` script cannot `require('playwright')`). Inject state with `addInitScript` or goto → `localStorage.setItem` → reload; skip `null` values (`setItem(k, null)` stores the string `"null"`).
- **Falsifier discipline:** fresh throwaway copy per mutation, clean baseline FIRST, node-level error = COULD-NOT-RUN (never "DIED").
- **Quoting hazard:** `node script.mjs A>B` in zsh creates a file named `B`. Always quote.

## 5 · P-333 (measured, still open)
- **Reproduced:** synthetic ideal rosters 4-3→3-4 lose 2500, 3-4→4-3 lose 1800, gap 700 = 0.089 wins. On the 32 real rosters the bias is one-sided: **28 teams better in 4-3, 3 better in 3-4; mean signed +1144.5 units (0.145 wins)**; 147/2048 spots flexed; **0 emergency fills**.
- **Round 2:** the real bias is **value shape at ILB2** (Inkling right; my body-count mechanism struck — 31/32 rosters carry ≥2 ILB). **VL's `DT→ILB = 6`** (a missing rule, not a re-price) → gap 700 → 0. **B3** (`slots.ts:86` ILB2 `dest: 'ILB' → 'OLB'`) → +1144 → −142, 28-3 → 13-14, but makes it a 1-ILB front.
- Harness: `deliveries/p333-gap-options-2026-11-16/`. Pin matters: `d3bd81d2` FB→TE=6 gives 900, `7a0706df` FB→TE=2 gives 700.
- **Not done:** no OVR sweep; no alternative 3-4 slot table; VL's rule + a Part B lever combined.