# Council prompt — offload testing from Claude (P-309 + flexeval re-run + flexengine.js + P-276 + review bottleneck)

**Read this from `origin/council/muse` — it is always the current version. Your prompt points here, so you do not need a longer prompt.**

Run: `git fetch origin && git show origin/council/muse:_agents/START-HERE.md` and follow it exactly. Then read this prompt.

## Why this prompt exists

Claude (the Architect) is the sole implementer and the bottleneck. He just built the −2/−6/−12 flex table and seat-check.sh (commits 4cc3dee + 2039c89, 290/290 tests pass), and his next step is the seven guard passes, then P-308 (the FB/punter/CB4 engine modeling), then theta pricing on the branch. **The council should take the testing and verification work so Claude can keep building.** Do not ask Claude to run checks the council can run. Do not wait for Claude to verify his own build — that is the council's job.

## State (2026-11-09)

- **Flex table BUILT and VERIFIED.** flex.json + flex.ts hold 104 rules in tiers {0: 14, 2: 16, 6: 18, 12: 56}; QB>FS is 12; REV 4 dropped (no fallback, no switch). Engine stamp nfl1.042b4efe83dcad; arbitrage 16; base totals 1850. MUSE's flex build review (VERDICT: improved, `inbox/20261109-0324-muse-P-294-flex-build-review.md`) verified every claim and re-ran the suite independently: 290 pass / 0 fail. **Key finding: the −2/−6/−12 table IS measured** — `tools/mathlab/results/flexeval-pick-2026-11-08.json` (added by 4cc3dee, not mentioned in the ruling): fresh seeds 607 encouraged / 117 via −12 (flex/lineup 4.251), tune seeds 1253 / 282 (4.272). **But those counts were computed with the OLD (pre-fix) draft cache** — see P-310 below.
- **Draft resume bug FIXED and VERIFIED.** The replacement-level cache in draft.ts is now keyed on the exact pick (`if (st.pos === st.replAt)` instead of `if (st.pos - st.replAt < 6)`). C2 resume test passes; 290/290, no other test moved.
- **P-294 is REVIEWED** (five reviews: VL ok, OR improved, Super ok, VLOC, MUSE ok + MUSE flex build review improved). The evidence reproduces exactly (third independent reproduction, zero diffs).
- **Theta pricing is BLOCKED, not DONE** (MUSE P-294 review). Super's grid is verified evidence with a sound ovrEq definition, but it needs the Architect to confirm the definition and price theta on the branch, covering the four proposed rules and the −2/−6/−12 table. P-309 is the council rerun.
- **FB/SAM artifact flagged** (a 4-3 roster in the 3-4 plays a spare DT at FB (−2) and the natural FB at SAM (−12)). Legal and pinned, a property of the Owner's picked table, not a defect in Claude's build. Flag it; do not fix it.
- **The switch is DEAD** (Owner: "new table, forget the old table"). **The level shift is ACCEPTED** (no fallbacks, every position filled, no re-anchor). **P-305 is DECIDED** (bundle the Google Fonts in the repo).
- **Claude's next step** is the seven guard passes (core/hungarian, lineup, playerids, margin, players, view/draftBoard, core/hash). The council verifies them after he does them (P-288), it does not do them for him.

## The work, in priority order

Take the top item you can do well. Do not duplicate work another seat has already filed — read their reviews first.

### First — P-309: theta rerun on the Colors engine (the top priority)

Read P-309 in `_agents/PRIORITIES.md` for the full spec. In short: rerun theta on the Colors engine (architect/engine-and-seats, tip 2039c89 or later), NOT Pre-Colors, in a scratch tree. Use `slotWins20/20` as the slope (the Colors engine has no `slotWinsPerOvr()`). Use Super's ovrEq definition as the WORKING definition (`ovrEq = winsLost / slope[dest]`, `winsLost = max(0, slotWins(natural, ovr) − slotWins(dest, ovr))`). Cover ALL flex rules in the adopted table, INCLUDING the four proposed rules (RB>WR, TE>EDGE, TE>OT, DT>EDGE) — use the proposal table as the rule set, and re-run against the built −2/−6/−12 table (flex.json) too. Output the sensitivity grid (θ 0.5/0.75/1.0 × OVR 85/90) for each rule, with the command and output. File as `inbox/<UTC>-<seat>-P-309-theta-rerun.md`. Do NOT claim the grid is Architect-blessed until Claude confirms the ovrEq definition. Do NOT invent a different definition or a different formula.

### Second — P-310: re-run flexeval on the built −2/−6/−12 table WITH the cache fix

Read P-310 in `_agents/PRIORITIES.md`. The pick counts (fresh 607/117, tune 1253/282) were computed with the old pre-fix cache. Re-run `tools/mathlab/flexeval.mjs` on the built table (flex.json at tip 2039c89 or later) WITH the fix, on the same seeds (tune 1001-1016 + 3001-3016, fresh 4001-4016, measured weights), and report whether the counts moved. File as `inbox/<UTC>-<seat>-P-310-flexeval-rerun.md` with the command and output.

### Third — the flexengine.js check (status UNKNOWN)

Claude did not run the flexengine.js check (it needs playwright and the frozen Pre-Colors file). Run it. Read `tools/mathlab/flexengine.js` (or the equivalent check) on the architect branch, run it in a scratch tree, and report the result. If you cannot run it (no playwright, no frozen Pre-Colors file), say so plainly and report exactly what blocked it — do not claim a result you did not run. File the result as a P-294 follow-up (or as a review of P-294) with the command and output.

### Fourth — P-276: the N=1000 baseline repro (the P0 headline)

The decisive N=1000 baseline reproduction is still in flight / not settled. Do not tune against the two N=100 clusters until pinned at N=1000. Read P-276 in `_agents/PRIORITIES.md` and the existing work (VL's N=100 skilled run reproduces 38/3 exactly; the 2-vs-3 cluster split is sampling noise). If you have deno, run the N=1000 baseline repro. If you do not have deno (OR and vloc are blocked on this), work on P-292 (unblock the deno gap) instead, or take a different item below. File the result as a P-276 review with the command and output.

### Fifth — close the review bottleneck

These items each need more reviews for REVIEWED ✓✓✓. A review you can do beats new work in the same tier. Read the author's file, check every claim against the repo with commands, then file `inbox/<UTC>-<seat>-<ID>-review.md` with `VERDICT: ok | improved | rejected`. You may not review your own work or the same item twice.
- **P-285 (needs ONE more).** MUSE (improved) and Beam (improved) have reviewed w85. One more seat's review closes it.
- **P-288 (needs TWO more).** Super (ok) verified the Q4 parameter diff (32/122 flagged, max dev 23.3), the Colors suite 290/290, and the witness tolerance fix. Two more seats should verify Claude's guard passes + FITTED + Q4 — and now the flex build guard passes too, once Claude does them.
- **P-307 (needs TWO more).** MUSE (improved) reviewed w86. Two more seats should review w86 when it goes live (it is published but NOT live yet — the live index.html is still w85; the make-live step is the Owner/Beam's).
- **P-286 (needs TWO more).** MUSE (improved) reviewed 67 Cakepanz Slice 1. Two more seats should review Slice 1. Note the headline finding: the "snapshot bug" does NOT exist (the pinned draftBoard.ts is clean, the snapshot compiles, the engine tests pass 284/284 with a symlink fix). The stand-in is an unnecessary duplicate built on a false premise.

### Sixth — the other verification work

- **P-289 / P-293 — the model-first lab program.** Beam did a partial verification (witness gate MEASURED + raw-curve + triangulation). Continue it: verify the model-first lab program (the N=100 CI gate, the Lab's skilled policy, the calibration targets).
- **P-290 — reconciliation.** The 112-game hash, the 284 vs 286 test count, the tsc file count, and the DS margin-histogram defect. Reconcile the discrepancies with commands and outputs.
- **P-292 — unblock the deno gap.** OR and vloc are blocked on tooling (no deno) for the P-276 reproduction. Unblock it (install deno, document the setup, or provide an alternative).
- **P-296 — cutover readiness checklist.** The cutover trigger is a fully functioning Colors v1, then cut over (Option A: move the whole council into the fresh repo). Work the readiness checklist.
- **P-303 — battery re-anchor.** Needs Owner confirmation on SS-before-FS and Architect sign-off (the w79 round re-pointed it first; the Owner's confirmation is on record from w79).

## Rules

- **Never assign work to a named seat.** Work comes from `_agents/PRIORITIES.md`; you take the top item you can do; later seats review it. Never wait for a particular seat, and never tell another seat what to do.
- **Only the Architect builds.** Nobody else writes the product file or the engine, on any branch, ever. The council supplies ideas, exact code snippets, mock-ups, and measurements (to its own `inbox/`), and, after a build exists, tests. A seat that "just applied it" to the product has not helped.
- **Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN.** "Done" needs a command and its output.
- **Work:** write `inbox/<UTC yyyymmdd-hhmm>-<name>-<ID>-<slug>.md` per `inbox/README.md` (exact snippet, anchor string, how to check, evidence label).
- **Review:** read the author's file, check every claim against the repo with commands, then write `inbox/<UTC>-<name>-<ID>-review.md` (`REVIEW-OF:`, `VERDICT: ok|improved|rejected`, what you ran). You may not review your own work or the same item twice. Three ok/improved from three seats = REVIEWED.
- **Save as you go:** `git add -- <your paths>`, commit, `git push origin council/<name>` after every finished file. Your own `council/<name>` is the only branch you push. Never force-push, never `git stash` (WIP commit instead).
- **Nothing is "delivered" until a pushed commit (give the hash) or a download link exists** — never give the Owner a sandbox path.
- **Do not decide for the Owner.** The make-live step for w86 is still his. The FB/SAM artifact is a property of his picked table — flag it, do not fix it. The θ pick (0.5 / 0.75 / 1.0) is still his, from the grid once P-309 lands. Label every recommendation as a recommendation until he locks it.
- **Do not hardcode a wave number** in prompts/tasks; instruct seats to find the latest wave file by listing.
- **The MUSE seat must not do live browser checks** unless the Owner specifically asks (2026-11-08 boundary). Verify by reading files/code and running tools locally instead. Other seats follow their own boundaries.
- **The four rejected features are never re-pitched:** "What If" alternate history, deterministic multiplayer, 20-0 roguelike mode, cross-era draft pools.
