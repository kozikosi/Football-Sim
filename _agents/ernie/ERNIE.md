# ERNIE — lane file (rewritten each session; never append)

## BOOT — read this first, every session (do not re-derive anything)

1. `git fetch -q origin` then the **step-0** checkout from `START-HERE` §1 (the four governance docs).
2. Read this file to the end. It is the handover: what is measured, what is open, what not to redo.
3. Then take the next item from the live queue, or the substance in §2.

## Identity
- **Seat:** ERNIE · **Model / how reached:** ERNIE / API (kilo gateway) · **State:** advisor (admitted by the Owner 2026-11-13)
- **What I am good at:** taking a claim apart with a command, and **reporting my own refutations**.
- **Standing rule:** four lines per claim (cwd · exact command · ref+sha · output). VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim. "No signal" is a result.
- **Worktree:** `/Users/kosi/Desktop/wt/ernie` · **branch:** `council/ernie` · **merge-base with `origin/council/base`:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`

## Current state (2026-11-16T03:15Z)
- **Nothing in progress.** Branch tip **`8df1e0d9`**, pushed. Worktree clean (0 dirty).
- **This session (7): the council engine test round ("make every gate prove it can fail").** Eleven inbox files filed, all pushed:
  `20261116-0219-ernie-{1b-mutation, emergency-defect, formation-gap-review, lineup-test-rewrite, P-333-recheck, hungarian-flex-read, rev8-gates, pin-reading, freshstart-verify, self-lint, label-hygiene}.md`
- **Not run: the sealed bench (L).** I am on the Owner's runner list but did not claim it — no budget left, and a claimed-but-stalled run is worse than an open slot. **It is still OWED.**

## 1 · What not to redo (receipts exist)
The four digests and their roots · goldens `0ccb6319…f3f5` · the 57-file `cmp` · offline (five arms) · the 30-vs-40 sample count · the save-log / no-RNG-cursor mechanism · `cd298e99` (dead) · **the pool gap (1,953 = 1,941+12; 32 LS = 1/team; board 1,921; filter `draft.ts:53` + `store.ts:40` + `dataset.ts:47,88`)** · the 69/72 dispute · **the de-gated tests (fixed `5a3bb75e`; this round: both are LIVE, killed by mutation)** · **the live wave is w89, not w85** · **`file://` defect = module script / absolute `/assets`** · **the fork is pure in (seed,label)** · **the API is `fit(role, dest).penalty`** · **w89 default is pale rose `#fdf2f6`, dark is a `data-theme` variant, `--tc` does not exist (0 occurrences)** · **the pin is `d3bd81d2`; "resolves to the latest" appears ONLY in `claude/NOW.md:4`** · **`state_invalid_export` is a build error invisible to `svelte-check` (reproduced this round; needs a *reassigned* export)** · **the formation gap 2773.0386614172 (MEASURED) vs 2700/1800/900 (retired table, arithmetic)** · **the DIME distances reproduce on the 1,941-row pool (free agents excluded)**.

**New this round (do not re-measure):**
- **1b at `86f22d10`: 363/363, tsc 89/89 — both VERIFIED.** The ratchet **is** a ratchet (adds an error → check exit 1, `--write` refuses, baseline sha unchanged).
- **12/12 mutations of the 1b tests killed. Survivors: `puntYards`, `touchdowns`, `firstDowns` are never asserted by any test; "every screen agrees" cannot see a *consistent* misclassification; an interception's spot is untested.**
- **`tsconfig.json` excludes `test/` — the ratchet covers `src/` only. A type error in a test file is invisible to both gates.**
- **CI: run `43749063203` says `success`; the build step's `conclusion` is `success` (continue-on-error rewrites it) while the log shows `error during build: Failed to resolve /src/main.ts`. Machine readers see green on a red build.**
- **THE EMERGENCY "DEFECT" DOES NOT BEHAVE AS FILED.** Shipped `1e5` vs the proposed derived ladder (`EMERGENCY = 2×(Σspot×99) = 1.7e6`, `PLAYS = 1000×scale`): **identical placement on 300/300 rosters at n=32 and identical fill counts at every size 20→60; 0/32 real team rosters differ.** Only `EMERGENCY = 1e9` (> `PLAYS`) reaches 0 fills, and it does so by benching 2.3 players and leaving K/P empty — i.e. by **inverting priorities 2 and 3**. **The brief's seed-0 test is RED on the proposed fix. Do not land it as written.** Fills are driven by `PLAYS`, not `EMERGENCY`.
- **The Hungarian's tie rule is UNTESTED**: `<` → `<=` keeps 300/300 brute-force-equal but changes the assignment on 5/300.
- **`gate-manifest.mjs` is vacuous**: a 53-line prose manifest → `0 entries … PASS`, exit 0; 1 valid row + 52 prose lines → PASS with the 52 silently skipped; `REV-5.1-addendum/MANIFEST.txt` is empty and passes **in the delivery today**.
- **`358/358` is still live in the Rev 8 delivery** at `RECEIPT.md:81`.

## 2 · What is genuinely open
1. **The sealed recipe is OWED.** Named falsifier for the framework verdict; only a seat that has never seen either repo can run it.
2. **P-333 is unanswered by the Owner** (small gap without hand-lowering DIME). My finding: a small gap and few moves are opposite goals.
3. **The Architect's priority-ladder patch** — now with a hard objection attached: the *fix* does not change any measured outcome, so either the constant is cosmetic (pin it and say so) or the real question is priority 2 vs 3 (an Owner call).
4. **A targeted two-swap search** to try to make `EMERGENCY` bite (my §8 falsifier). Not run.
5. **The 1b survivors** (`puntYards`/`touchdowns`/`firstDowns`/INT-spot) — unfixed, unasserted.
6. **CI `continue-on-error`** — report-only by Owner ruling, but the *summary* lies to machines.
7. **Queue P0s I never reached** — P-143 / P-160 / P-163 / P-164 / P-165 (product copy). The queue tool's top five are all reviews in that tier.
8. **The λ estimator** placebo calibration; VL's non-identifiability receipt.

## 3 · Live files (mine)
- `_agents/ernie/deliveries/zai-fresh-start-rev8-2026-11-15/` — Rev 8 (hosted, `c1b0bd5a`); I ran `npm ci` inside `football-sim-svelte/` and **removed the `node_modules` afterwards; checksums re-verified 4/4**.
- `_agents/ernie/deliveries/ernie-ringers-both-repos-2026-11-15/`, `zai-fresh-start-2026-11-15/` (Rev 6).
- Key filings: the eleven `20261116-0219-ernie-*` above, plus `20261116-0015-ernie-P-333-derivation.md`, `20261115-2213-ernie-p342-pin-table-gap.md`.

## 4 · Method notes worth keeping
- **Scratch tree:** `git archive origin/architect/engine-and-seats colors data tools | tar -x -C /tmp/eng`; node 26 runs the `.ts` directly. `npm install --no-save typescript@5.9.3` is needed before `tsc-baseline.mjs` (else npx fetches the wrong `tsc`).
- **Three-variant A/B/C:** copy `src` to `/tmp/t{A,B,C}/colors/src`, patch only the ladder line, import all three in one script. This is how the EMERGENCY result was made unarguable.
- **Quoting hazard:** `node script.mjs A>B` in zsh creates a file named `B`. Always quote.
- **`npm ci` inside a hosted delivery leaves `node_modules`.** Remove it and re-run the checksum gate before pushing.