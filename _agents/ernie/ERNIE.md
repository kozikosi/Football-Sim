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

## Current state (2026-11-16T20:22Z)
- **Nothing in progress.** Branch tip pushed. Worktree clean.
- **This session (8):** the engine test round (A–K) · a review of Z.ai's Rev 9 · a review of Z.ai's Rev 10 · two draft work orders (Z.ai/Cakepanz shell; council/Cakepanz cone).
- **Hosted deliveries (mine):** `zai-fresh-start-rev8-2026-11-15/`, `zai-fresh-start-rev9-2026-11-16/`, `zai-fresh-start-rev10-2026-11-16/` (739/807 files). Each `npm ci` run inside was cleaned up and the manifest re-verified before pushing. `START-OF-CHAT-ZAI-rev10.md` lives **outside** the Rev 10 tree on purpose (the new unlisted-file check caught it when it was inside).
- **Not run: the sealed bench (L).** I am on the Owner's runner list but did not claim it. **The Owner has since ruled the blind-runner premise wrong** (the builder is the only builder; Z.ai is effectively fresh every session) — see §2.

## 1 · What not to redo (receipts exist)
The four digests and their roots · goldens `0ccb6319…f3f5` · the 57-file `cmp` · offline (five arms) · the 30-vs-40 sample count · the save-log / no-RNG-cursor mechanism · `cd298e99` (dead) · **the pool gap (1,953 = 1,941+12; 32 LS = 1/team; board 1,921; filter `draft.ts:53` + `store.ts:40` + `dataset.ts:47,88`)** · the 69/72 dispute · **the de-gated tests (fixed `5a3bb75e`; this round: both LIVE)** · **the live wave is w89, not w85** · **`file://` defect = module script / absolute `/assets`** · **the fork is pure in (seed,label)** · **`fit(role,dest).penalty`** · **w89 default is pale rose `#fdf2f6`, dark is a `data-theme` variant, `--tc` does not exist** · **the pin is `d3bd81d2`; "resolves to the latest" appears ONLY in `claude/NOW.md:4`** · **`state_invalid_export` is a build error invisible to `svelte-check` (needs a *reassigned* export)** · **gap 2773.0386614172 (MEASURED) vs 2700/1800/900 (retired table, arithmetic)** · **DIME distances reproduce on the 1,941-row pool (free agents excluded)**.

**New this session (do not re-measure):**
- **1b at `86f22d10`: 363/363, tsc 89/89.** The ratchet **is** a ratchet (error → check exit 1, `--write` refuses, baseline sha unchanged). **12/12 mutations killed.**
- **Four survivors:** `sim/box.ts` `puntYards`, `touchdowns`, `firstDowns` are asserted by **no test**; an interception's spot is unasserted; "every screen agrees" is blind to a *consistent* misclassification.
- **`tsconfig.json` excludes `test/`** — the ratchet covers `src/` only (Z.ai reproduced it: a planted error in a test file leaves the ratchet at 91/91, exit 0).
- **CI: run `43749063203` says `success`; the failed build step's `conclusion` is `success`** (continue-on-error). Machine readers see green on a red build.
- **EMERGENCY: the filed defect is latent, not behavioural.** Shipped `1e5` vs the derived ladder (`1.7e6`): identical lineups on 300/300 rosters, identical fill counts at every size 20→60, 0/32 real rosters differ. Only `> PLAYS` (1e9) reaches 0 fills, by benching ~2.3 players (inverts priorities 2 and 3). **Z.ai independently reached the same conclusion and shipped the better constant (`1e6`) plus an `EMERGENCY < PLAYS` assertion.**
- **The Hungarian's tie rule is untested**: `<`→`<=` keeps cost-equal on 300/300 but changes the assignment (mine 5/300, Z.ai's harness 25/300 with a 4×4 witness).
- **Rev 9/10 gate state:** Rev 9's C2 vacuity is fixed (prose → `UNPARSEABLE`, exit 1); Rev 10 fixes empty-tree PASS, unlisted-file blindness, and the `p333-ladder` tree-dirtying. **The Vue build passes on node 24 (my node 26 failure was environmental).**
- **Cakepanz pin discrepancy (open):** `67-cakepanz/README.md` says `4ca9a071`; `AGENTS.md` says `d3bd81d2`. Handed to Z.ai as its first task.

## 2 · What is genuinely open
1. **The framework pick.** Owner's plan (2026-11-16): **TypeScript/framework-neutral until the last second**, then decide at the cutover. My input: the only asymmetric number (repairs 2:1) is a **first-arm learning artefact** — both Vue repairs were order-of-authorship. The Rev 10 store 2×2 kills the "Pinia buys speed" premise: wrapper tax 36 L (Vue) / 32 L (Svelte), **framework delta 7 L inside ±11 L noise**, and the leanest store in the record is a **Vue `reactive` module at 45 L**.
2. **The blind bench is superseded as the instrument.** Better: the *same builder* runs the sealed slice **twice with the order reversed** (v→s, s→v). Counterbalanced, no stranger, one sitting.
3. **The Cakepanz merge cone** — Z.ai to finish slices 3-5 as a one-directory engine swap; council to verify adversarially (my two work orders).
4. **P-333 is unanswered by the Owner** (small gap without hand-lowering DIME). My finding: a small gap and few moves are opposite goals.
5. **The Architect's ladder patch** — Z.ai's `1e6` derivation + the permanent `EMERGENCY < PLAYS` assertion. Cosmetic but the contract should be true.
6. **The four sim-layer survivors** — unfixed, unasserted.
7. **CI `continue-on-error`** — report-only by Owner ruling, but the summary lies to machines.
8. **Queue P0s never reached** — P-143 / P-160 / P-163 / P-164 / P-165 (product copy reviews).

## 3 · Live files (mine)
- `_agents/ernie/deliveries/zai-fresh-start-rev{8,9,10}-*/` — hosted, byte-verified.
- Key filings this session: `20261116-0219-ernie-*` (11 round files), `20261116-0326-ernie-zai-rev9-review.md`, `20261116-1940-ernie-zai-rev10-review.md`, `20261116-0426-ernie-PROMPT-zai-rev10.md`, `20261116-2020-ernie-PROMPT-{zai-cakepanz-shell,council-cakepanz-cone}.md`.

## 4 · Method notes worth keeping
- **Scratch tree:** `git archive origin/architect/engine-and-seats colors data tools | tar -x -C /tmp/eng`; node 26 runs the `.ts` directly. `npm install --no-save typescript@5.9.3` before `tsc-baseline.mjs` (else npx fetches the wrong `tsc`).
- **Three-variant A/B/C:** copy `src` to `/tmp/t{A,B,C}/colors/src`, patch only the ladder line, import all three in one script. This is how the EMERGENCY result was made unarguable.
- **`npm ci` inside a hosted delivery leaves `node_modules`.** Remove it, re-run the manifest gate, then push.
- **Quoting hazard:** `node script.mjs A>B` in zsh creates a file named `B`. Always quote.