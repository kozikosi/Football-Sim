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

## Current state (2026-11-19T02:40Z)
- **Nothing in progress.** Worktree clean; branch pushed (`97f49a6d`); ending the session per START-OF-CHAT §3.
- **This session (the cakepanz arc):** hosted z.ai's **cakepanz-8.1** (MUSE has since pruned my hosting copy — byte-identical copies remain on `council/inkling`/`council/pickle`); reviewed 8.1 (**improved**; F6-prepared + F3 still open) → `inbox/20261118-2345-…8.1-review.md`; compiled **all seven seats' cakepanz ideas** → `inbox/20261119-0105-…all-seats-ideas-compiled.md`; recorded **GPT's Vue-vs-Svelte comment verbatim + my evaluation** → `inbox/20261119-0152-…GPT-framework-comment-and-evaluation.md` (preference **corrected 60/40 → ~50/50**: the AI-tooling "tax" was scaffold-only, not intrinsic); filed the **w89 improvement opportunity brief** → `inbox/20261119-0213-…w89-improvement-opportunity-brief.md`; drafted the **Cakepanz-9 prompt for Z.ai** → `inbox/20261119-0218-…cakepanz-9-prompt-for-zai.md`; posted the **council prompt** → `bulletin/20261119-0230-ernie.md`; executed MUSE's **cakepanz-9 sitting brief** myself → `inbox/20261119-0238-…cakepanz-9-sitting-notes.md` (11 verifications, tools top-5, Vue/Svelte **55% Svelte**).
- **THE LIVE DIRECTIVE (Owner, 2026-11-18T22:31Z, verbatim in `_agents/owner-notes/2026-11-18-owner-note-sim-values-after-ship.txt`):** *"I don't want you or claude or the council to spend too much more time trying to get the sim values to line up super aligned with the historical data. i would rather we get the engine overall finished and then you can tinker with values and historical accuracy after we have shipped."* → **per-metric historical alignment is PARKED until after ship.** Engine completion and product surface continue. Read this before proposing any calibration work.

## 1 · What not to redo (receipts exist)

The four digests and their roots · goldens `0ccb6319…f3f5` · the 57-file `cmp` · offline (five arms) · the 30-vs-40 sample count · the save-log / no-RNG-cursor mechanism · `cd298e99` (dead) · **the pool gap (1,953 = 1,941+12; 32 LS = 1/team; board 1,921)** · the 69/72 dispute · the de-gated tests (`5a3bb75e`) · **the live wave is w89** · **`file://` defect = module script / absolute `/assets`** · **the fork is pure in (seed,label)** · **`fit(role,dest).penalty`** · **`state_invalid_export` is a build error invisible to `svelte-check`** · **gap 2773.0386614172 (MEASURED) vs 2700/1800/900 (retired table)**.

**Cakepanz, measured:** the seam is 14 files / 63 import lines, M1 PASSES at cakepanz-6, M5 = 37 lines / 11 files · **M3 swap PASSES** · **a re-pin is five paths** (`src/engine/`, `tools/mathlab/flex.json`, `test/engine/`, `test/engine.test.ts`, `data/packs/*.json`) · neutrality ~95% clean (only `draftStore.ts:3` imports `svelte/store`; no runes in `.ts`) · **390 px fixed at cakepanz-2** · the cakepanz pin discrepancy is RESOLVED (app tree `4ca9a071`/52 vs gh-pages `d3bd81d2`/57 — both right about their own tree) · **`1e5` vs `1.7e6` is latent, not behavioural** · **the Hungarian tie rule is untested** · **`continue-on-error` makes a green run prove the build gate only** (re-confirmed from `ci.yml` this session).

**Cakepanz-8, VERIFIED by me (receipts: `_agents/ernie/deliveries/cakepanz-8-review-2026-11-18/`):**
- engine **394/394** shipped + **406/406** prepared; node **33/33** ×2; shell **47/0** ×2; slice **29/0/10/3** ×2; late **6/6** ×2; gates **PASS 314 / 319**; F0–F12 all DIED, F13 DIED.
- pins byte-identical to `5c808472` (67 files) and `65673a00` (68) — by `git hash-object` vs `git ls-tree colors/src`; dist `1529a003…e737` both trees, rebuild byte-identical.
- **A2 split is genuine** — I re-ran the mutation: delete `void hydrateBoot();` (App.svelte:106) → rebuild → **S29 red, 46/1**; restore → 47/0.
- **My findings (F1–F6):** F1 the simple row's main button is a dead control with `aria-expanded`; F2 the simple form shows `r.wins` while row order may be `priority`/`ovr`; F3 the new Block B CSS hard-codes golds instead of the theme tokens (bites the Owner's two open contrast rulings); F4 the FULL BOARD door is one-way for the draft; F5 the gate is red after `npm run battery` until `regen-manifest` re-runs; **F6 `gate-numerals` exits 1 on BOTH trees** (`VERIFY.txt:553–554` reports the deployed `4ca9a071` without a correction keyword; prepared `MERGE-GUIDE.md:3` names `5c808472` not `65673a00`) — so `SHELL-STATUS.md:53`'s "Numerals CLEAN ×2" does not reproduce.
- **z.ai's cakepanz-8.1 work order already exists** (Inkling `de1e9ef2`, `596bd94f`) and folds in DS/Pickle/Inkling findings + L7–L9/F14–F16. **Check F6 is in it** when 8.1 lands.

**Cakepanz-8.1, VERIFIED by me (receipts: `_agents/ernie/deliveries/67-cakepanz-8.1-2026-11-18/` + `inbox/20261118-2345-ernie-P-316-cakepanz-8.1-review.md`):**
- **Hosted the 8.1 package** at `_agents/ernie/deliveries/67-cakepanz-8.1-2026-11-18/` (commit `5f7e9525`, 910 files, byte-identical to the Desktop source). Two trees: `cakepanz-4/` (shipped, 5c808472) + `cakepanz-4-prepared/` (65673a00). **NOTE (2026-11-19): MUSE pruned this copy + the cakepanz-8 copy per the Owner's "redundant copies are fine" ruling — byte-identical copies remain on `council/inkling` and `council/pickle`; my review receipts above still stand.**
- **Re-ran on Node 26, both trees:** engine **394/394** shipped + **406/406** prepared; node **33/33**; shell **47/0**; slice **29/0/10/3**; late **9/9**; gates **314/319**; **late falsifier F0 clean 9/9 + F13/F14/F15/F16 ALL DIED**; dist `4ce69205…` rebuild byte-identical, cross-tree identical; pins byte-identical (67/68 via hash-object); flex 99.
- **8.1 closes P-316's five user-facing findings** (4.1–4.5): L2 shows `rec=+0.3 vm=+0.3 cap=PRIO`/`wins: rec=+0.5 cap=WINS`; L7 `regions=1 chips=1 lbl="OVR 77 · priority +0.2 · fills QB"`; L9 `restoredPicks=12 form=full`; L8 `screen=complete h1="Your draft is complete"`.
- **My 8.1 findings (still open):** **F6-prepared** — prepared `MERGE-GUIDE.md:3` names 5c808472, numerals gate **FAILS at CP_PIN=65673a00** (`never names the CURRENT pin`); z.ai's "CLEAN ×2 both trees" only holds with the wrong pin (default 5c808472). **F3** — Block B hard-codes golds in **3 files** (BoardRow/DraftBoard/BoardFooter), ~20 declarations, so team takeover won't recolour the late board; unfixed. **F7** — README-DELIVERY:9 "acceptance script completes end-to-end" contradicts its own L10 bullet (:41). L10 open item is honestly flagged (ACCEPTANCE pointer + VERIFY §22.2).

**Engine / tooling state:**
- **The engine tip is `ea48005c`** (oracle drift root-caused; 2016-22 pack re-baked; `datacheck.py` + `data-manifest.json` guard). Prior: `5d018f52` (class path), `57fb83c` (pools node).
- **Verified this session:** 419/419 · tsc **89/89** · build clean · CI `44404129491` (`ea48005c`), `44351214198` (`57fb83c`), `44266214860` (`3363eb0`), `44262444359` (`1aa7fb3`) all success · `git diff 57fb83c..ea48005c -- colors/src` **empty** · golden pin `pack53:1465418807480a` / `log53:03a2e03a885c91` / `[24,31]` / 216 · flex **99 {0:17,2:17,6:42,12:23}** · `datacheck.py` tampered → **exit 3** with the byte-size line, missing → **exit 3** (synthetic `NFLVERSE_DIR`).
- **Correction I filed and Inkling's totals-bar run corroborates:** the hier-followups report's "**−0.28 points/game**" contradicts its own table — 23.40 → 23.25 = **−0.15** (+3.7% → +3.0% of 22.56 = 0.16). The prose is the stale artefact.

## 2 · What is genuinely open
1. **cakepanz-8.1 → v8.2 / cakepanz-9** — my 8.1 review (`improved`) leaves: **F6-prepared** (one-line `MERGE-GUIDE.md:3` or exclude MERGE-GUIDE from the prepared numerals check), **F3 theme tokens** (3 files, ~20 declarations), Beam's cross-draft `fullBoard` + sighted caption, the "CLOSED except L10"/WHAT-CHANGED doc fixes. My compiled report (`20261119-0105`) synthesizes all seven seats' ideas into a cakepanz-9 proposal (three-choice card + one-click pick + why-this-one + Complete-roster + decision-cost law + colour gate + port-purity).
2. **R-13 / Block C** — gated on cakepanz-8.1/8.2; my proposal: the **late-draft board** is the sealed slice (9 laws + F13–F16 → law-parity decides R-13, not bytes).
3. **The four sim-layer survivors** — PARKED by the 22:31Z directive.
4. **PROJECT-KNOWLEDGE.md antiquation** — still deferred; coordinate with Inkling (co-custodian).
5. **P-333** — VL's `DT→ILB = 6` is the only surviving lever; PARKED for calibration but the harness is live.
6. **gh-pages placement** — still not placed (Owner's click); deployed tree names `4ca9a071`/52 files.

## 3 · Live files (mine)
- **This session's filings (the cakepanz arc):**
  - `inbox/20261118-2345-…P-316-cakepanz-8.1-review.md` — 8.1 review (improved; F6-prepared/F3/F7 open).
  - `inbox/20261119-0105-…cakepanz-all-seats-ideas-compiled.md` — all seven seats' cakepanz ideas, ~65 deduped.
  - `inbox/20261119-0152-…GPT-framework-comment-and-evaluation.md` — GPT's Vue/Svelte comment verbatim + my evaluation (preference corrected 60/40 → ~50/50).
  - `inbox/20261119-0213-…w89-improvement-opportunity-brief.md` — use-case-framed tool/w89 upgrade brief.
  - `inbox/20261119-0218-…cakepanz-9-prompt-for-zai.md` — the thorough Cakepanz-9 sitting prompt for Z.ai (Parts A/B/B-bis/C + D absorb-work + E w89 brainstorm).
  - `inbox/20261119-0238-…cakepanz-9-sitting-notes.md` — my execution of MUSE's sitting brief (11 verifications, tools top-5, Vue/Svelte 55% Svelte).
  - `bulletin/20261119-0230-ernie.md` — the council prompt (work the queue; w89 tool use-case + Vue/Svelte asks).
- **Receipts:** `_agents/ernie/deliveries/cakepanz-8-review-2026-11-18/` (cakepanz-8 review logs). My cakepanz-8.1 hosting copy was pruned by MUSE (byte-identical copies on `council/inkling`/`council/pickle`).
- Earlier: `67-cakepanz-8-2026-11-18/`, `cakepanz-7-…`, `cakepanz-6-…`, `cakepanz-5-…`, `prompts-2026-11-18/`, `pin-watch-2026-11-17/`, `p333-*`, `ernie-ringers-*`.

## 4 · Method notes worth keeping
- **Verify a delivery's engine against a pin:** `git ls-tree -r <pin>` → filter `$2` (tab-separated!) for `colors/src/` → compare to `git hash-object` of every file in `src/engine`. **The delivered `src/engine` IS the architect's `colors/src`.**
- **`git ls-tree -r <commit>` from a subdirectory returns nothing** — run it from the repo root.
- **Totals bar:** `cd colors && node --experimental-strip-types tools/totals-bar.ts 12000 ../data/packs/nfl-pools-fit2023-2025.json` (~2 s per 12,000 games; needs `npm ci`). **Defaults to the in-sample pack — always name the pack.**
- **Architect's tests need the whole repo** (`git archive <sha> | tar -x -C /tmp/x`), not just `colors/` — the suite reads `../data` and `../tools`. `colors/package.json` on `architect/engine-and-seats` uses `test/**/*.test.ts` (41 files, 419 tests); my branch's older copy says `test/*.test.ts` (21 files, 227 tests). **Do not review the Architect from the working tree.**
- **`datacheck.py` only iterates `play_by_play_<year>.parquet` (2016–2025) in `$NFLVERSE_DIR`** — a fixture anywhere else is ignored and the run looks like a pass. My first tamper attempt was invalid for exactly this reason.
- **Shell battery needs a live preview:** `npx vite preview --port 4179 --strictPort &` then `node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs`. `CP_PORT=<n>` moves it.
- **The numerals gate needs `CP_PIN=65673a00` in the prepared tree** (its own header says so).
- **Browser probes:** put the probe *inside* the tree (a `/tmp` script cannot `require('playwright')`). Skip `null` when injecting localStorage (`setItem(k, null)` stores `"null"`).
- **Falsifier discipline:** fresh throwaway copy per mutation, clean baseline FIRST, node-level error = COULD-NOT-RUN.
- **Hosted-copy diff:** `git archive <branch> <path> | tar -x -C /tmp/x --strip-components=<n>` — the count is the path depth. Getting it wrong produces a phantom "Only in" line.
- **Quoting hazard:** `node script.mjs A>B` in zsh creates a file named `B`. Always quote.
- **Only node 26 on this machine.** No Node 24 datapoint.
- **`awk` regex pitfall:** `$2 ~ /^colors\/src\//` silently matched nothing under BSD awk here; `index($2,"colors/src/")==1` works.