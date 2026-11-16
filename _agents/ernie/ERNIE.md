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

## Current state (2026-11-16T02:01Z)
- **Nothing in progress.** Branch tip **`4f4663e1`**, pushed to `origin/council/ernie`. Worktree clean (0 dirty, 0 local-only).
- **This session (6):** hosted and reviewed Z.ai's **Rev 8** fresh-start delivery (`c1b0bd5a`, 668 files/14 MB, nested manifest **360/360 OK**); reviewed Inkling's Rev 4 filing; filed **P-342** (pin/table/gap) and **P-333** (derivation + optimizer + measured gap); drafted three prompts (Z.ai Rev 7, Rev 9, council test round).
- **The framework verdict has converged.** **Four seats + the author now say "tie, narrow Svelte lean, no number, no cutover."** Z.ai withdrew the ~55% in Rev 8 rather than defend it. Rev 8's Part A measured class@11 = 50 L vs Pinia@11 = 49 L (**+1**, ratio 1.020) against my 74 vs 85 (**−11**, 0.871) — **the sign does not reproduce, and I withdrew the framework attribution**: my "Pinia pays a return block" mechanism is proportional to how many fields the store **stores** (mine stored 8 + 3 derived; theirs 2 + 9 typed getters).
- **What survived from my work and is now confirmed twice:** **the class bridge needs NO facade** (Z.ai + Inkling, both trees, both scales). **The DIME penalties are derivable** (P-333). **The optimizer's priority ladder is mis-scaled** (P-333).

## 1 · What not to redo (receipts exist)
The four digests and their roots · goldens `0ccb6319…f3f5` · the 57-file `cmp` · offline (five arms) · the 30-vs-40 sample count · the save-log / no-RNG-cursor mechanism · `cd298e99` (dead) · **the pool gap (1,941+12=1,953; 32 LS = 1/team; board 1,921; filter is `draft.ts:53` + `store.ts:40` + `dataset.ts:47,88`; re-verified at `9acf1992`)** · the 69/72 dispute · the de-gated tests (fixed at `5a3bb75e`, R-11 CLOSED, 351/351) · **the live wave is w89, not w85** · **the `file://` defect is the module script / absolute `/assets` paths, not Vite** · **the fork is pure in (seed,label)** · **the API is `fit(role, dest).penalty`** · **w89's tokens are already extracted; w89's fonts come from a CDN (offline fix = the brag card's inline `woff2`, 55,192 B base64)** · **w89's shipped default is pale rose `#fdf2f6` (l.13616/13621), dark is a `data-theme` variant; `--tc` does not exist in w89 (0 occurrences, `var(--tc` never used)** · **the pin `d3bd81d2` is a real commit; `colors/src` == 57 engine files** · **the engine pin is FIXED at `d3bd81d2` — R-2 does not float; "latest engine commit" appears nowhere in the record** · **`state_invalid_export` is a BUILD error (rolldown), invisible to `svelte-check` (0 errors, 0 warnings on the same tree)** · **`EMERGENCY = 1e5` is 1.01× the largest single-spot value swing (98,932) and 0.12× the whole-lineup max (854,227); 164/300 rosters diverge at 1e9, mean emergency fills 1.010 → 0.000** · **formation gap 900 (table) / 914.5 (measured); formula+floor6 → 300; flexed spots 3 → 4** · **the DIME rules derive to 12 (A = 11.10 / 12.40 / 11.20); FB>TE derives to 12 (D = 17.99) and needs its exemption; the raw formula reverts the cross-side floor unless the floor is a constraint**.

## 2 · What is genuinely open
1. **The sealed recipe is OWED** (`SEALED-RECIPE.md`, sha `7fcc3fc0…14f07`). It is the named falsifier for the verdict and **only a seat that has never seen either repo can run it.** A council test round was drafted for exactly this (`_agents/ernie/deliveries/council-test-round-prompt-draft.md`, not yet sent).
2. **P-333 is unanswered by the Owner.** He wants the formation gap small without hand-lowering DIME. The council's finding: a derived table gets 900 → 300 but by lowering *other* pairs and it **raises** the out-of-position count (3 → 4). **A small gap and few moves are opposite goals.** Z.ai's Rev 9 Part A is productising this; my numbers are synthetic-70-OVR and the **real 1,953-player pool run is the outstanding falsifier**.
3. **The Architect's priority-ladder fix** (P-333 Q2) — patch proposed, not landed; `lineup.ts` is his.
4. **The 1b slice** (`architect/engine-and-seats` @ `86f22d10`, slice `6dcf13b`) — 363/363, ratchet 89/89, but its **CI is `continue-on-error` throughout** and nobody has mutation-tested the 12 new tests.
5. **"Done" and "improvable"** — definitions filed; vanilla `file://` for Cakepanz is still an Owner question (now moot for the fresh-start repos: Rev 8's singlefile postbuild boots on `file://`).
6. **The λ estimator** — placebo calibration still the first open test; VL's non-identifiability receipt unanswered.
7. **The w89 beauty gap** — Rev 8 labelled the tokens `w89-derived, experiment default (dark)` and justified `--tc`; the product-side rework is unowned.
8. **Queue P0s I never reached** — P-143 / P-160 / P-163 / P-164 (product copy).

## 3 · Live files (mine)
- `_agents/ernie/deliveries/zai-fresh-start-2026-11-15/` — Rev 6 (hosted)
- `_agents/ernie/deliveries/zai-fresh-start-rev8-2026-11-15/` — **Rev 8 (hosted, `c1b0bd5a`)**, nested manifest 360/360
- `_agents/ernie/deliveries/ernie-ringers-both-repos-2026-11-15/` — Cardboard Ringers in both repos + `RECEIPTS.txt`
- `_agents/ernie/deliveries/zai-rev7-prompt-draft.md`, `zai-rev9-prompt-draft.md`, `council-test-round-prompt-draft.md` — drafts
- Key filings: `inbox/20261115-2318-ernie-zai-rev8-review.md`, `inbox/20261116-0015-ernie-P-333-derivation.md`, `inbox/20261115-2213-ernie-p342-pin-table-gap.md`, `inbox/20261115-2058-ernie-zai-fresh-start-review.md`

## 4 · Method notes worth keeping
- **Scratch tree:** `git archive origin/architect/engine-and-seats colors/src colors/test data tools/mathlab | tar -x -C /tmp/eng` — node 26 runs the `.ts` directly (erasable syntax only).
- **A flex-table experiment:** patch the `FLEX` object in a *copy* of `flex.ts`, run the gap, restore. Never edit the Architect's tree.
- **Quoting hazard:** `node script.mjs A>B` in zsh creates a file named `B`. Always quote the argument. (It happened; five stray files, removed.)