# ERNIE — lane file (rewritten each session; never append)

## BOOT — read this first, every session (do not re-derive anything)

1. `git fetch -q origin`, then the **step-0** checkout from `START-HERE` §1 (the four governance docs).
2. Read this file to the end. It is the handover: what is measured, what is open, what not to redo.
3. Then take the next item from the live queue.

## Identity
- **Seat:** ERNIE · **Model / how reached:** ERNIE / API (kilo gateway) · **State:** advisor (admitted by the Owner 2026-11-13); **MUSE co-delegate** (Owner grant 2026-11-18 03:35Z, with Inkling).
- **Good at:** taking a claim apart with a command, and reporting my own refutations.
- **Standing rule:** four lines per claim (cwd · exact command · ref+sha · output). VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim. "No signal" is a result.
- **Worktree:** `/Users/kosi/Desktop/wt/ernie` · **branch:** `council/ernie` · **merge-base with `origin/council/base`:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e` · **pushed tip this session:** `a4d22a579`

## Current state (2026-11-19T21:00Z)
- **Nothing in progress.** Worktree clean after this session's push; ending per START-OF-CHAT §3.
- **THIS SESSION (item-6 sitting relay):** hosted Z.ai's `z-post-blue-docs-update-2026-11-19-item6-sitting` for public reading at `_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-item6-sitting/` (commit `34d68061b`, 14 files, **md5 13/13 OK**, `diff -r` byte-identical) · reviewed it thoroughly (verdict **improved**, six findings) · filed `inbox/20261119-2039-ernie-item6-sitting-review.md` + `inbox/20261119-2055-ernie-cakepanz-shell-innovation-v2.md`.
- **ITEM-6 REPRODUCES BYTE-EXACT ACROSS PLATFORMS — the strongest new fact.** Linux/Node-24 sandbox vs my macOS/Node-26, fresh `git archive 560b8364f`: preflights `e793aacb…`/`ad3f1a2a…` MATCH; N=20,000 JSONs `6e9168ec…`/`513b9130…` MATCH; both stdout tables `diff`-identical. 39.9 s for the 2023-2025 arm. Tool is outside tsc scope (`tsconfig.json:29` excludes `tools`) and no test imports it — genuinely report-only.
- **C10 REBUILDS THE DELIVERED DIST:** my hosted c9 tree + the package's 4 patched files → `76de5658…`, 527,162 B, byte-exact. Board battery **6/6**, pageErrors=0.
- **MY ITEM-6-REVIEW FINDINGS (F1–F6):** **F1** D1's *conclusion* is wrong — the 49th file IS on `origin/council/pickle` at the manifest's own md5 `0a286953…`, double-nested one `c10/_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/` deeper; fix = copy one file, not re-cut the zip · **F2** §6 row 10's ancestry evidence is false — `fee5c2fd8` is an ancestor of NEITHER `17d602720` nor `4d8011335`, and on no `origin/council/*` ref; package presence is proved by TREE, not `merge-base` · **F3** 4C stop-and-ask is CORRECT (no merge/revert/re-zip/edit; §5 fixes staged, not applied) · **F4** the `?seed=` seam is proven by THREE committed receipt variants (same outcomes `pass:29/fail:0`, different content: Mahomes/Purdy/Burrow, 71/72 chips, 11/10 rows) · **F5** the C′1 ring highlights **60/60 at pick 27** and L13 passes because it recomputes its expectation with the component's own rounded parse · **F6** the no-interpretation discipline is correct physics — the tool sweeps `s` (tilt strength), not λ.
- **ARCHITECT 80eb432 — INDEPENDENTLY REPRODUCED:** 421/421 tests, tsc pinned 89/89, on my Mac/Node 26. His crn-efficiency factors reproduce exactly (s=0.25 points 2.21 / yards 2.83; s=1 points 1.55 / yards 1.98). **BUT** plan v4's "+15–60% more pairing" is unsupported: the ratios give **+3% to +27%**; +60% only via yards-scratch ÷ points-current (cross-metric).
- **FRAMEWORK DECIDED: Svelte 5 + Vite 8** (Owner, 2026-11-19, final; live on `council/muse` @ `d8eca10e5`). R-13 closed. Reconciliation is a **PAIR**: `vite ^8` + `@sveltejs/vite-plugin-svelte ^7` (7.3.1 peer-requires vite ^8; vite 8 needs Node >= 22.12). Bumping vite alone lands on plugin-svelte 6 and breaks.
- **KEY STATE:** Architect tip **`80eb432`** (item-6 recipe/tool wording-only at `edd56bf1`; Plan v4 tools at `80eb432`) · cakepanz-9 chain CLOSED · Part 0 patched at the working bytes, **rides on the Owner's accept/strike word** · P-144 rejected.
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
1. **item-6 review F1 (the D1 correction)** — the 49th file is on `council/pickle`, double-nested, at the manifest's md5. Fix is a one-file copy into inkling + orcaink, not a re-cut. Owner/Architect call; changes no delivered byte.
2. **item-6 review F2 (method)** — `fee5c2fd8` is not an ancestor of the cited commits; cite the TREE for package presence, ancestry only for provenance. Worth a line in the next sitting order so nobody repeats it.
3. **item-6 review F5 (the ring, still unfixed)** — 60/60 at pick 27; rank on the raw VM key (`draftBoard.ts:61` strips it). One line. I5 (exactly 3) vs I7 (tiers) is the Owner's product call.
4. **The L13 tautology (generalizable)** — a law that recomputes its expectation with the code under test inherits its bugs. Same class as P-365's gone% tautology. Fix: derive expectations from the engine, not the DOM. This is the highest-value testing change.
5. **cakepanz-10 F1–F4** — four doc/package integrity fixes, one line each (VERIFY §23.7 closure; the two MANIFESTs' dist divergence + missing prepared `dist/`; the cite-check's `L7b … 0` line; START-OF-CHAT-ZAI `:3`). Still open.
6. **cakepanz-10 F6** — D1/D2 are protected only by source-string asserts + one-off probes; promote the L7b/S29b probes into `batteries/`. Pairs with the defect→law registry.
7. **R-13 / Block C** — gated on cakepanz-9 acceptance; my proposal: the **late-draft board** is the sealed slice (9 laws + F13–F16 → law-parity decides R-13, not bytes).
8. **The four sim-layer survivors** — PARKED by the 22:31Z directive.
9. **PROJECT-KNOWLEDGE.md antiquation** — still deferred; coordinate with Inkling (co-custodian).
10. **P-333** — VL's `DT→ILB = 6` is the only surviving lever; PARKED for calibration but the harness is live.
11. **gh-pages placement** — still not placed (Owner's click); deployed tree names `4ca9a071`/52 files.
12. **The shell's replay property (I1–I4)** — seed + frozen pool + pick log *is* the whole draft (`saves.ts:27-31`); the draft code, the post-draft trace and the seeded fixtures all ride it. Now unblocked by the framework decision.
13. **Vite 8 / plugin-svelte 7 pair reconciliation** — the cutover must move BOTH (`vite ^8` + `plugin-svelte ^7`), and Node >= 22.12 is the real floor. Architect cutover task, not a reopening.

## 3 · Live files (mine)
- **THIS SESSION'S REVIEW (read first next session):** `inbox/20261119-2039-ernie-item6-sitting-review.md` — the item-6 sitting review (verdict improved; six findings F1–F6; the cross-platform item-6 reproduction; the D1 correction; the 80eb432 421/421 + tsc 89 independent reproduction; the +15–60% arithmetic refutation).
- **THIS SESSION'S INNOVATION NOTES:** `inbox/20261119-2055-ernie-cakepanz-shell-innovation-v2.md` — what the framework decision changes; the next build order (I5′ ring fix, I5″ non-tautological laws, I6′ why-this-one, I10′ state dump, I11′ contrast gate, then I2′ trace / I7′ tiers / I8′ value / I9′ late-draft affordances / I15′ offline / I12′ retarget / I13′ registry / I14′ a11y / I16′ visible seed).
- **Hosted delivery:** `_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-item6-sitting/` (commit `34d68061b`, 14 files, md5-verified). The item-6 receipts (2 preflight JSONs, 2 fit JSONs, 2 stdout tables, 1 command log) + Z.ai's report + intake + trio.
- **Bulletin this session:** `20261119-2100`.
- **Prior session's handoff plan (still relevant):** `inbox/20261119-0351-ernie-handoff-plan-definitive.md` — the four tiers, the five-path fence, the protocol.

## 4 · Method notes worth keeping
- **Re-review a close-out package cheaply:** the package is a *diff* drop (3 src files). Copy my own hosted c9 tree to `/tmp`, overlay the package's `src/` files + its `batteries/node.battery.mjs`, then `npm run build && npm run distfile && shasum -a 256 dist/single.html` — **the dist sha is the whole review in one number** (cakepanz-10: `76de5658…`, 527,162 B, matched exactly). The other suites then run in ~4 min.
- **Item-5 is re-runnable anywhere:** `git archive <architect-sha> colors data | tar -x -C /tmp/x` then `cd /tmp/x/colors && node --experimental-strip-types tools/glm-bar.ts <N> <pools> <passclass> <out.json>`. **The JSON's sha256 is deterministic and platform-independent** — 300-game preflights and 20,000-game runs both reproduced a Linux sandbox's hashes on this Mac. `glm-bar.ts` lives at `colors/tools/`, not `tools/`.
- **A gate count is a checksum of the tree:** cakepanz-10 shipped `regen: 313` → `314` the moment `.gitignore` was restored (prepared 318 → 319). If a gate count is off by one, look for a missing dotfile before suspecting the tool.
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
- **Prove package presence with the TREE, not ancestry.** `git merge-base --is-ancestor <commit> <tip>` answers "was this commit pushed", not "is this path there". For a package imported by a relay, the pushing commit may be nowhere on any ref while the tree is on several. Use `git ls-tree <ref>:<dir>/` and compare. Getting this backwards produced a false "confirmed false" in Z.ai's §6 row 10.
- **To find a file across every ref and hash each distinct blob:** `for r in $(git for-each-ref --format='%(refname)' refs/remotes/origin | grep council/); do git ls-tree -r "$r" | grep '<path>'; done` then `git cat-file -p <blob> | md5 -q`. Distinct blobs with identical outcomes = the unseeded seam (same test, different run).
- **`md5 -c` is silent on macOS** (`/sbin/md5` prints nothing and exits 0 even on failure). Use `while read -r h p; do [ "$(md5 -q "$p")" = "$h" ] || echo "FAIL $p"; done < CHECKSUMS.txt`. Z.ai's "48 OK / 1 FAILED" came from `md5sum`, which behaves correctly.
- **A battery that recomputes its expectation with the code under test cannot catch a bug in it.** Before trusting a law, check whether `expected` is derived from the same function/string the component uses. L13 (the C′1 ring) and P-365's gone% law are both this shape.
- **A gate count is a checksum of the tree** (re-confirmed): cakepanz-10 shipped `313` → `314` the moment `.gitignore` was restored. Off-by-one in a gate count ⇒ look for a missing dotfile first.
- **Vite 8 + plugin-svelte 7 are a pair.** `@sveltejs/vite-plugin-svelte@7.3.1` peer-requires `vite ^8.0.0`; plugin-svelte 6 peer-requires vite ^7. Bumping vite alone silently keeps plugin 6. Check `npm view @sveltejs/vite-plugin-svelte@<v> peerDependencies` before any pin change.
- **The Architect's tools are outside tsc scope.** `colors/tsconfig.json:29` excludes `tools`, so "tsc 89/89" is not a check on `tools/*.ts` (lambda-axis, throughput, crn-efficiency). A tool can be type-broken and still report a clean ratchet.
## 6 · v3.2 H5 correction (2026-11-19T10:00Z) — VERIFIED, nothing to file
- **MUSE's receipt is correct.** `draftBoard.ts:19-24` (`BoardRowVM` = `wins: string; priority: string`), `:37` (raw only on the local type), `:50` (`_w: w, _p: pr`), `:61` (`rows.slice(0, limit).map(({ _w, _p, ...r }) => r)`) — `_w`/`_p` are stripped at export. `DraftBoard.svelte:40` reads `x[vm.sort]` (display string) with `|| 0`, and `:46` walks while values tie → the v3.1 two-liner would tie **every** row at 0 → 60 highlighted, L13 red. VERIFIED.
- **v3.2 already exists twice:** inkling `11e7b58f` (the brief's own file, all four items + §0.5 re-anchored + delta marked VOID) and beam `f9b9bf82f` (standalone file; same facts, but its ref list still says read the delta for H5/H6 — a residual inconsistency).
- **The live tip is v3.3 (`d7d2acd18`)**: same corrections + item-6 landed (`560b8364`, `colors/tools/lambda-axis.ts`), **item-5 DONE — do not re-run**, Architect branch re-rooted (item-5 recipe only at `preserve/architect-engine-and-seats-pre-reroot-2026-11-19`). **Send v3.3, not v3.2.**
- My note: `inbox/20261119-1000-ernie-v3.2-h5-correction-verification.md`. I filed no duplicate v3.2 and edited no one else's file.

## 6b · The next z.ai sitting order (2026-11-19T18:15Z) — written, not yet relayed
- **File:** `deliveries/zai-next-sitting-prompt-2026-11-19.md` (v1, on my branch). Ten sections; the spine is: **item-6 N=20,000 first** (recipe `560b8364`, preflight `e793aacb…`/`ad3f1a2a…` confirmed by me) → **F1–F4 doc/package integrity** (VERIFY §23.7 closure; the two MANIFESTs' dist divergence + the missing prepared `dist/`; the cite-check's `L7b … 0` line; the START header's sitting) → **F6 law promotion** (L7b into the shell battery as 49/0 + F23; S29b behavioural half into node + F24; a defect→law registry as VERIFY §24) → **F8/F15** (`aria-describedby`; a network-free `file://` law) → **I10/I1/I2/I11/I12** (state dump, draft code, trace, contrast gate, retarget script).
- **Explicitly gated:** F5 (the ring) waits on Q-H5; the Owner's seven words are listed in §2 so nothing blocks on them.
- **Citation law for the re-root:** cite `560b8364` for current; `2dff30b5` only via the preserve ref; add no new pre-re-root citations (the rot audit is open).
- **Not relayed by me** — the Owner relays. Nothing else in this session was pushed except my own inbox/lane notes.

## 7 · Session end state (2026-11-19T21:00Z)
- Worktree clean; `council/ernie` pushed. This session's pushes: `34d68061b` (hosting the item-6 sitting relay, 14 files, md5 13/13) + this session's filings (review, innovation v2, bulletin, lane).
- **Re-rook audit (inkling's A–G): partially executed, unchanged from last session.** A verified · B verified · C incomplete (2,416 unique hex tokens collected; classification not finished) · D/E not run.

## 8 · Prior session end state (2026-11-19T18:15Z) — historical

- Worktree clean; `council/ernie` pushed. Three pushes this session: `a69a9f4c9` (cakepanz-10 hosting, 52 files, md5 49/49) · `105079dba` (the review + 15 innovation notes) · `f61e7eb4e` (the v3.2 H5 verification) · `88a56f2fa` (the item-6 preflight note).
- **Re-rook audit (inkling's A–G): partially executed.** A verified (preserve = `2dff30b5`, 84 commits, root `568e6c04…`, `2dff30b5` ancestor exit 0, `35ce4e98`/`4ca9a071`/`2dff30b5` all commits; exactly two remote refs) · B verified (only three changed paths; every tree/file identical) · **C incomplete** (2,416 unique hex tokens collected across 5 branches; classification not finished) · D/E not run.
