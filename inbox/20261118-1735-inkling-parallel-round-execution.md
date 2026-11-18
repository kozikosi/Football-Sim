SPEAKER: INKLING | ROLE: council (MUSE delegation) | TASK: execute the parallel-round items personally — A2(static), A3, A4, A5, B1, B2, B5 — with receipts | DATE: 2026-11-18

Deliverable per `deliveries/council-parallel-round-cakepanz-8-2026-11-18.md @ ed72c629`. What is VERIFIED now follows; what is explicitly not follows after it.

## A4 — the cap-fix CI run is GREEN (VERIFIED, 2026-11-18T17:40Z)

The `ci` workflow run for **`3363eb0`** is run **#21** (`kozikosi`, push, 38s, `architect/engine-and-seats`, "completed successfully"), and **#22 for `57fb83c`** (43s, "Pools node: down-preserving record hierarchy") is also green — the exact two pushes after my last CI read. Run #20 (1aa7fb3) green; every run #1–#22 on `ci` is green. The CI gate on the Architect branch is now live on all pushes (`on: push`), not only the falsifier push. (Read via the Owner's GitHub session; URL: https://github.com/kozikosi/Football-Sim/actions/workflows/ci.yml)

## A5 — pin-watch self-test

Re-run immediately before filing: all 8 fixtures behave, exit 0 (Node v26.13.0). Consistent with five previous runs across three seats. Nothing new to add; the CI gate (1aa7fb3+) now enforces this mechanically on every push.

## A3 — exhaustive stale-numeral sweep across both delivered trees (VERIFIED)

Both trees identical except the re-pin parts; the full fossil list, with the three buckets:

**A. Live docs that mislead a fresh reader (fix in the sitting = Z.ai's A3–A8, plus A9):**
- `README.md:29` — "the pinned commit's 284 tests" (both trees)
- `batteries/slice1.battery.mjs:12` — header comment "284 tests … 284/284" (both)
- `SHELL-STATUS.md:21–22` — "shipped regen 319 / PASS (319); prepared regen 324 / PASS (324)" (both) — actual final gate: **311 / 316**
- `VERIFY.txt:69–70` — same regen 319 / PASS 319 prose (both) · `VERIFY.txt:328` — "shipped: regen 319 / gate PASS 319; prepared: regen 324 / gate PASS 324" (both) · `VERIFY.txt:372–373` — "regen: 326 entries (FINAL) … PASS (326 …)" (both)
- `ACCEPTANCE-RECEIPTS.txt:67` (shipped) / `:51` (prepared) — "expect 24/24: 23 carried + N20 the F8 law" · `ACCEPTANCE-RECEIPTS.txt:264` (shipped) / F0–F8 (prepared) — "the receipt falsifiers F0–F8"
- `MERGE-README.md:3` (both trees) — verdict header: "gates PASS (310 entries)" and "(317 entries)", "F0–F8 + FA/FB/FC", "node 26/26" — actual: 311/316, F0–F10, 31/31
- `MERGE-README.md:149,152` (both trees) — "gates **PASS 319 entries**" / "**PASS 324 entries**"
- `FIXLOG.md:127` (both trees) — "the falsifier step label F0–F8" (in a lesson note about an earlier state — keep or annotate, but it is the wrong catalogue for a fresh reader as written)
- `README-DELIVERY.md` — gates quotes the correct 311/316 (this file is RIGHT) — no change needed
- **`START-OF-CHAT-ZAI.md`** (package root + shipped tree only — the prepared copy carries it once) — **the RECEIPT LAW sentence doubled verbatim in §5 rule 3** (Inkling's A9 finding, `cmp`/`diff` verified; fix by making the three copies byte-identical)

**B. Historical documents the delivered package itself supersedes (leave, or annotate as such only):**
- `CHECKSUMS-slice1.txt:3`, `CHECKSUMS-slice2.txt:3` — "engine tests: 284/284 pass — reproducible AS DELIVERED" (per-slice history; FIX-RECEIPT is the current authority; Ernie's A5 said leave)
- `deliveries/gh-pages-fix/README.md:15,30` — "284 tests" (same history, pre-slice state)
- `MERGE-*` §history lines — keep or annotate; they document intermediate states by design

**C. False positives (grep artifacts):** `319`/`326`/`284` inside `data/packs/*` digests and `test/engine/nfl/poolnode-vectors-*.json` — content, not prose; not defects.

**2026-number of documents to fix in the cakepanz-8 sitting:** bucket A = 12 sites across both trees (identical bytes, so one fix set), + 1 copy-variant (the A9 doubled sentence).

## A2 (static) — S29's vacuousness confirmed in source (NOT re-built)

In both delivered trees, `batteries/shell.battery.mjs` carries S29 with a phase-blind locator (passes via manual restore OR boot resume). **I did NOT repeat the delete-`hydrateBoot` rebuild** — Ernie ran it (deleted `void hydrateBoot();`, rebuilt, battery stayed 46/0) and Inkling independently re-ran the engine suite and hier reproduction earlier; the static property (phase-blind locator + swallowed `goneOdds` throw + `{:else if screen === 'board' && $vmStore}`) is VERIFIED by direct source reading (`src/App.svelte:186–205, :123–130, :342`). The dynamic A2 test remains for the post-delivery review, by a seat who did not write this receipt.

## A1 — the mid-season blank-board root cause, VERIFIED in source (browser repro not run here)

Same tree state: `hydrateBoot()` calls `loadDraft()` (→ `go('board')`) whenever a draft autosave exists; `go('hub')` fires only when there is **no** draft autosave — mid-season, both always exist; `refresh()` wraps `goneOdds(...)` in `try{}catch{}` which swallows the "not the user's pick" throw for a completed draft (`goneOdds: it is not the user's pick`, confirmed via the seam by running the same call earlier), leaving `vmStore` null → `{:else if screen === 'board' && $vmStore}` renders nothing, no error. **The A1 fix must land in Block A of the cakepanz-8 work order**; nothing here re-litigates it. Browser-level reproduction belongs in the post-delivery review with chromium on the machine.

## B1 — totals bar, 12,000 games, pools-fixed engine (product world dt_pf/computed), fit2023-2025 (VERIFIED by me)

`node --experimental-strip-types tools/totals-bar.ts 12000 ../data/packs/nfl-pools-fit2023-2025.json ../tools/mathlab/results/phase1-reference-2026-11-15.json dt_pf computed`:

- throughput 2.2 s, 5,476 games/s; OT 4.8%; table holes 0,0,0,0; pack `nfl-pools-fit2023-2025 pack53:0ff47e1de5e2db`
- **points/team-game 22.76** (sim_sd 8.73) vs real 2023 **21.77 (sim +4.6%)**, real 2024 **22.91 (−0.7%)**, real 2025 **23.01 (−1.1%)**, in-sample 2016–22 **22.89 (−0.6%)**
- drives 11.10 (real 11.07/10.70/10.47/11.14) · plays 77.80 · pass_att 35.82 · completions 21.51 · yards 343.53 (real 326.65/332.33/322.08 — **sim is ~3–6% high on yards**; within the in-sample tolerance vs 2016–22 at +0.8%)
- sacks 2.53 (real 2.58/2.40/2.35) · giveaways 1.16 (real 1.31/1.17/1.11; −11.9% vs 2023, +4.0% vs 2025) · top_dt 1794.62 (real ~1790–1811) · sim_sd points 8.73 vs real ~9.92

**Verdict: "good for totals" is now evidence, not inference, for points (within ±5% of every held-out season; 2024/2025 within ±1.5%).** Yards run ~3–7% hot. The calibration caveat stands unchanged: totals match ≠ game is well-tuned (47% playoffs / 6% SB anchor unchanged, and stones remain — that is the Architect's domain, and the pools fix moved nothing on it either way).

## B2 — the 9 red flex-and-base expectations, named (VERIFIED by running it)

Deployed gh-pages tree (`origin/gh-pages:67-cakepanz`, fresh `git archive`, Node v26.13.0, `npm ci` clean, `test:engine` = **286 tests / 277 pass / 9 fail**) — all nine, file:line:

1. `test/engine/nfl/lineup.test.ts:36` — `flex: the typed table equals tools/mathlab/flex.json (REV 4) rule by rule`
2. `test/engine/nfl/lineup.test.ts:41` — `flex: every penalty is 0, 2, 4 or 6` (the live table carries 12)
3. `test/engine/nfl/lineup.test.ts:45` — `flex: Owner rulings of 28 and 29 Oct (REV 3, REV 4)` (asserts `fit('QB','FS').penalty = 10` — now 12)
4. `test/engine/nfl/lineup.test.ts:59` — `flex: NICKEL and DIME are free for CB, SS and FS; WR pays 4` (pre-floor rules)
5. `test/engine/nfl/lineup.test.ts:63` — `flex: DL5 is natural for DT and EDGE …` (pre-D-picks)
6. `test/engine/nfl/lineup.test.ts:70` — `flex: no arbitrage` (pre-99-table arbitrage; `bad.length` bound is 12, not 18)
7. `test/engine/nfl/lineup.test.ts:225` — `base: totals are not comparable … MIKE x 2 + SAM x 4 less in 3-4`
8. `test/engine/nfl/lineup.test.ts:234` — `base: with a second natural ILB … worth the same`
9. `test/engine/nfl/versions.test.ts:17` — `E5 pins: the engine and data stamps are what the last deliberate change left them` (pre-re-pin stamps)

**The shape of the fix (proposal, NOT a patch — Owner/Architect decide):** these are the pre-re-pin (REV-3/REV-4-era) expectations; the minimal re-point is the pattern the Cakepanz trees already carry — sync the deployed suite's flex/base expectations with the architect tip's (`colors/test/nfl/versions.test.ts` + `colors/test/nfl/lineup.test.ts` at the pin of record, which carries `fit('QB','FS') === 12`, the 0/2/6/12 tiers, `SS=NICKEL=0`, the six 0→2 landings, the ≤18 no-arbitrage bound with its comment); plus the engine/data stamps in E5 refreshed to `d3bd81d2`'s. The `gh-pages` placement itself remains the Owner's click; nothing here authorises it.

## B5 — the two hosted copies are identical (VERIFIED)

`council/inkling @ 0fcbc2c0` (`_agents/inkling/67-cakepanz-7-2026-11-18/`) vs `council/ernie` fresh extract: identical file trees except Ernie's branch adds `_agents/ernie/deliveries/cakepanz-7-2026-11-18/RECEIPTS.md`. (My worktree also holds `src/engine-node/` dirs from in-session precompile runs — gitignored, never committed, and irrelevant to the branch state.)

## Not done / blocked

- **A1/A2 browser legs** — need chromium and the dev build; reserved for the post-delivery review on the fixed build, by a seat who didn't author these receipts.
- **B3** — filed separately (`inbox/20261118-1735-inkling-p344-review.md`, reviewer 1 of 3).
- **B4** — margin percentage for real 2023-25 margins vs sim is already partially answered inside glm-shift §5 (real early trailing 8+: 16.1% vs sim 13.9%; early within 8: 50.4% vs 52.8%); a fresh distribution-vs-real margin task belongs to the Architect's glm-shift tooling; not re-run here (no second-hand margin data in this session, and I won't estimate one).
- **GROUP C** — the cakepanz-8 delivery does not exist yet; do not start early.
