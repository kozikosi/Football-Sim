# ERNIE — lane file (rewritten each session; never append)

## BOOT — read this first, every session (do not re-derive anything)

1. `git fetch -q origin`, then the **step-0** checkout from `START-HERE` §1 (the four governance docs).
2. Read this file to the end. It is the handover: what is measured, what is open, what not to redo.
3. Then take the next item from the live queue.

## Identity
- **Seat:** ERNIE · **Model / how reached:** ERNIE / API (kilo gateway) · **State:** advisor (admitted by the Owner 2026-11-13)
- **Good at:** taking a claim apart with a command, and reporting my own refutations.
- **Standing rule:** four lines per claim (cwd · exact command · ref+sha · output). VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim. "No signal" is a result.
- **Worktree:** `/Users/kosi/Desktop/wt/ernie` · **branch:** `council/ernie` · **merge-base with `origin/council/base`:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`

## Current state (2026-11-16T21:12Z)
- **Nothing in progress.** Three Cakepanz filings written and pushed; worktree clean.
- **This session (9):** council review of the Cakepanz shell finish — Parts 1, 2, 3, 8, 9, 10, 11, 12, 13 (the pin, the seam, neutrality, the non-functional laws, node counts, theme, data integrity). Receipts + three probes in `_agents/ernie/deliveries/cakepanz-shell-review-2026-11-16/`.
- **Hosted deliveries (mine):** `zai-fresh-start-rev8-2026-11-15/`, `zai-fresh-start-rev9-2026-11-16/`, `zai-fresh-start-rev10-2026-11-16/` (739/807 files). Each `npm ci` run inside was cleaned up and the manifest re-verified before pushing. `START-OF-CHAT-ZAI-rev10.md` lives **outside** the Rev 10 tree on purpose (the new unlisted-file check caught it when it was inside).
- **Not run: the sealed bench (L).** I am on the Owner's runner list but did not claim it. **The Owner has since ruled the blind-runner premise wrong** (the builder is the only builder; Z.ai is effectively fresh every session) — see §2.

## 1 · What not to redo (receipts exist)
The four digests and their roots · goldens `0ccb6319…f3f5` · the 57-file `cmp` · offline (five arms) · the 30-vs-40 sample count · the save-log / no-RNG-cursor mechanism · `cd298e99` (dead) · **the pool gap (1,953 = 1,941+12; 32 LS = 1/team; board 1,921; filter `draft.ts:53` + `store.ts:40` + `dataset.ts:47,88`)** · the 69/72 dispute · **the de-gated tests (fixed `5a3bb75e`; this round: both LIVE)** · **the live wave is w89, not w85** · **`file://` defect = module script / absolute `/assets`** · **the fork is pure in (seed,label)** · **`fit(role,dest).penalty`** · **w89 default is pale rose `#fdf2f6`, dark is a `data-theme` variant, `--tc` does not exist** · **the engine pin of record is `d3bd81d2`; "resolves to the latest" appears ONLY in `claude/NOW.md:4`** · **`state_invalid_export` is a build error invisible to `svelte-check` (needs a *reassigned* export)** · **gap 2773.0386614172 (MEASURED) vs 2700/1800/900 (retired table, arithmetic)** · **DIME distances reproduce on the 1,941-row pool (free agents excluded)**.

**Cakepanz, measured this session (2026-11-16, receipts in my lane):**
- **Battery reproduces: 61 pass · 0 fail · 10 SKIP · 3 DEFER** on the app tree (slices 1-4). The s5 README's 75 = this + Slice 5's 14 laws (a *different* tree, `council/inkling`).
- **The seam is not one door:** 14 files import `src/engine/**`; 63 import lines; 76 lines of app code touch engine types. No `SNAPSHOT.md`, no `MERGE-*.md`. M1/M4/M5 unmet.
- **The M3 swap test PASSES (the important one):** `src/engine` → `d3bd81d2`, zero edits outside it → build exit 0, battery 61/0/10/3. Only `test/` + `tools/mathlab/flex.json` go stale (`npm run test:engine` 9 fails on the old REV 4 flex table). **A re-pin is three directories, not one.**
- **Second swap, Architect tip `7a0706df` (11 commits, 17 files, +1222/−53, the P-318 value layer):** build exit 0 (180 modules); battery **60 pass · 1 fail** — the flex-chip law, "14 pickers probed · 0 flex chips". **Not a shell bug:** node-side, rows with flex options **50 → 12**, chips **347 → 18** (`4ca9a071` → `7a0706df`), and the top 14 rows at the tip are all `also: []`. The flex route is vanishing at the top of the board — an Architect/Owner product decision. M1 did not break the build even across this delta.
- **Neutrality is ~95% clean:** the only framework import in the TS core is `src/lib/draftStore.ts:3` (`svelte/store`, 20 lines). No runes in any `.ts`.
- **390 px: the board overflows 54 px** (`scrollW 444`); Team Select is clean. Cause `BoardRow.svelte:38` + no `@media` in the tree.
- **The feed prints "touchdown"** (5 of 22 rendered lines) from the snapshot's `app/feed.ts:88`.
- **No light mode / Cinzel / `[data-zpbteam]` / `.ub`** in the app tree (measured: body font `Times`, `color-scheme: dark`).
- **`App.svelte:44` `let userTeam = 0`** triggers the Svelte 5 `non_reactive_update` warning on every build.

**New this session (do not re-measure):**
- **1b at `86f22d10`: 363/363, tsc 89/89.** The ratchet **is** a ratchet (error → check exit 1, `--write` refuses, baseline sha unchanged). **12/12 mutations killed.**
- **Four survivors:** `sim/box.ts` `puntYards`, `touchdowns`, `firstDowns` are asserted by **no test**; an interception's spot is unasserted; "every screen agrees" is blind to a *consistent* misclassification.
- **`tsconfig.json` excludes `test/`** — the ratchet covers `src/` only (Z.ai reproduced it: a planted error in a test file leaves the ratchet at 91/91, exit 0).
- **CI: run `43749063203` says `success`; the failed build step's `conclusion` is `success`** (continue-on-error). Machine readers see green on a red build.
- **EMERGENCY: the filed defect is latent, not behavioural.** Shipped `1e5` vs the derived ladder (`1.7e6`): identical lineups on 300/300 rosters, identical fill counts at every size 20→60, 0/32 real rosters differ. Only `> PLAYS` (1e9) reaches 0 fills, by benching ~2.3 players (inverts priorities 2 and 3). **Z.ai independently reached the same conclusion and shipped the better constant (`1e6`) plus an `EMERGENCY < PLAYS` assertion.**
- **The Hungarian's tie rule is untested**: `<`→`<=` keeps cost-equal on 300/300 but changes the assignment (mine 5/300, Z.ai's harness 25/300 with a 4×4 witness).
- **Rev 9/10 gate state:** Rev 9's C2 vacuity is fixed (prose → `UNPARSEABLE`, exit 1); Rev 10 fixes empty-tree PASS, unlisted-file blindness, and the `p333-ladder` tree-dirtying. **The Vue build passes on node 24 (my node 26 failure was environmental).**
- **Cakepanz pin discrepancy — RESOLVED this session (2026-11-16):** it is **two trees with one name**, not a stale document. App tree `67-cakepanz-s3-s4-rev2/src/engine` = `4ca9a071` (52 files, `diff -rq` clean); gh-pages `67-cakepanz/src/engine` = `d3bd81d2` (57 files, `diff -rq` clean). The app tree also has slices 3-4 and the gh-pages copy has slices 1-2 — they have diverged in both directions. Both READMEs/AGENTS.md are right about their own tree.

## 2 · What is genuinely open
1. **The framework pick.** Owner's plan (2026-11-16): **TypeScript/framework-neutral until the last second**, then decide at the cutover. My input: the only asymmetric number (repairs 2:1) is a **first-arm learning artefact** — both Vue repairs were order-of-authorship. The Rev 10 store 2×2 kills the "Pinia buys speed" premise: wrapper tax 36 L (Vue) / 32 L (Svelte), **framework delta 7 L inside ±11 L noise**, and the leanest store in the record is a **Vue `reactive` module at 45 L**.
2. **The blind bench is superseded as the instrument.** Better: the *same builder* runs the sealed slice **twice with the order reversed** (v→s, s→v). Counterbalanced, no stranger, one sitting.
3. **The Cakepanz merge cone — council verdict filed and then partly overturned by my own swap test (2026-11-16).** M1 one-door still fails (14 files import `src/engine/**`); M4 `SNAPSHOT.md` still missing; 76 lines touch engine types. **But the M3 swap test PASSES**: with `src/engine` replaced by `d3bd81d2` and **zero edits outside it**, `npm run build` exits 0 and the battery is 61/0/10/3. What does *not* travel is the verification apparatus — `test/` (35 files) and `tools/mathlab/flex.json` (`28a2e993…` old vs `0a26d7c2…` live) — so `npm run test:engine` fails 9 tests on a stale flex table. **Correction on the record: the app half is a directory swap; the re-pin procedure is three directories, not one.**
4. **P-333 is unanswered by the Owner** (small gap without hand-lowering DIME). My finding: a small gap and few moves are opposite goals.
5. **The Architect's ladder patch** — Z.ai's `1e6` derivation + the permanent `EMERGENCY < PLAYS` assertion. Cosmetic but the contract should be true.
6. **The four sim-layer survivors** — unfixed, unasserted.
7. **CI `continue-on-error`** — report-only by Owner ruling, but the summary lies to machines.
8. **Queue P0s never reached** — P-143 / P-160 / P-163 / P-164 / P-165 (product copy reviews).

## 3 · Live files (mine)
- `_agents/ernie/deliveries/zai-fresh-start-rev{8,9,10}-*/` — hosted, byte-verified.
- Key filings this session: `20261116-0219-ernie-*` (11 round files), `20261116-0326-ernie-zai-rev9-review.md`, `20261116-1940-ernie-zai-rev10-review.md`, `20261116-0426-ernie-PROMPT-zai-rev10.md`, `20261116-2020-ernie-PROMPT-{zai-cakepanz-shell,council-cakepanz-cone}.md`.
- **Cakepanz review (2026-11-16):** `inbox/20261116-{2105,2106,2108}-ernie-CAKEPANZ-SHELL-{review,seam-neutrality,laws-390-theme}.md`; probes + receipts in `deliveries/cakepanz-shell-review-2026-11-16/`; bulletin `20261116-2110-ernie.md`.

## 4 · Method notes worth keeping
- **Scratch tree:** `git archive origin/architect/engine-and-seats colors data tools | tar -x -C /tmp/eng`; node 26 runs the `.ts` directly. `npm install --no-save typescript@5.9.3` before `tsc-baseline.mjs` (else npx fetches the wrong `tsc`).
- **Three-variant A/B/C:** copy `src` to `/tmp/t{A,B,C}/colors/src`, patch only the ladder line, import all three in one script. This is how the EMERGENCY result was made unarguable.
- **`npm ci` inside a hosted delivery leaves `node_modules`.** Remove it, re-run the manifest gate, then push.
- **Quoting hazard:** `node script.mjs A>B` in zsh creates a file named `B`. Always quote.
## 5 · P-333 formation gap (2026-11-16, measured)
- **Reproduced:** synthetic ideal rosters, 4-3→3-4 loses 2500 table units, 3-4→4-3 loses 1800, **gap 700 = 0.089 wins** (720.1 measured). Stand-ins priced: FB>TE3 2×50, SS>DT2 6×300, TE>CB3 6×100 vs ILB>DL5 12×150.
- **The reframing finding:** on the 32 real rosters the gap is one-sided — **28 teams better in 4-3, 3 better in 3-4; mean signed +1144.5 units (0.145 wins)**; 147/2048 spots flexed; **0 emergency fills**. Re-pricing moves the real bias only to ~946.
- **Options measured:** (1) `SS>ILB` 6→4 → gap **100** (0.013 wins), 1 rule, flexed 148, DIME/FB/floor kept; (2) + `TE>NICKEL` 6→4 → gap **−100**; (3) derived `dl5Penalty` ×1.5 → gap **600, does not close** (the optimiser re-routes to TE>DL5) — negative result, do not adopt.
- **Base-par normalisation is a no-op** (par 4-3 = par 3-4 = 690,284 @80) because the same position carries the same weight in both bases — the asymmetry is in legal assignments, not par.
- Harness: `_agents/ernie/deliveries/p333-gap-options-2026-11-16/` (`gap.mjs`, `options.mjs`, `real.mjs`, `standins.mjs`, `receipt-options.txt`). Filing `inbox/20261116-2305-ernie-P-333-formation-gap-options.md`, commit `39f08db1`.
- **Not done:** no OVR sweep; no alternative 3-4 slot table (the real lever the bias points at).
- **P-333 round 2 (2026-11-16, Part B):** the real bias is a **body count**, not a price. 4-3 has 62 stand-ins/1024 spots, 3-4 has **85** (+23); **19 of the 23 extra are at MIKE/ILB2** (SS>MIKE 8×, OLB>MIKE 6×, OLB>DT2 5×). The "300-weight DT2" framing is a fitted-table artefact: measured `MIKE 0.03965` vs `DT2 0.03945` (0.5%), so re-rating ILB2 to MIKE changes nothing (variant B2 = byte-identical). **B3 = 3-4's ILB2 `dest: 'ILB' → 'OLB'` (`slots.ts:86`):** real bias **+1144 → −142**, split **28-3 → 13-14**, flexed 147 → 128, emergency 0; synthetic gap overshoots to **−1100**. **No weight or flex rule touched.** Part A negative: the loss is an optimum over assignments, so price changes are absorbed (ILB→DL5 12→18 moved the gap 700→600, not −200); a formula cannot close it, only a change in the *count* of stand-ins can. Named-but-unmeasured: scarcity-priced flex. `inbox/20261116-2340-ernie-P-333-structural-bias.md`, commit `03219198`.
- **P-333 round-2 review (2026-11-17, commit `a7e8d40f`):** **My body-count mechanism was WRONG — struck.** 31/32 rosters carry ≥2 ILB (`{1:1, 2:16, 3:14, 4:1}`); Seattle's 57-OVR ILB loses to a 76 OLB at −6 = 70. The bias is **value shape at ILB2** (Inkling right). **VL's `DT→ILB = 6` (a missing rule, not a re-price) is the only survivor: gap 700 → 0 on my fixture too** (1800/1800, stand-ins `DT>MIKE@6` / `ILB>DL5@12`, flexed 147 → 146, emergency 0, real bias 1144 → 1015). Pin matters: `d3bd81d2` FB→TE=6 gives baseline 900 (VL), `7a0706df` FB→TE=2 gives 700 (me) — both correct. Inkling's B3 (ILB2 off MIKE) = my B2 exactly (28/4, no change). Part B: no lever balances without redefining the 3-4; my B3 (dest ILB→OLB, 13/14) does but makes it a 1-ILB front. **Unmeasured and named: VL's rule + a Part B lever combined.**
