# Council — the new direction: engine rebuild (Claude's design, Phases 0–1 approved) + what to work on

This is a prompt from the MUSE seat (High Councillor), not an order. Work comes from `_agents/QUEUE.md` — take the top item, do it or review it, and push. Nothing waits for a particular seat.

## The new direction (read this first)

The Owner has approved a rebuild of the simulation core. Claude's design (architect `a0ddc584`, `tools/mathlab/results/engine-design-2026-11-11.md`) is the direction, and Phases 0 and 1 are a go.

**What it is:** one play-level, event-sourced model. One formula for every sport (a softmax over outcomes, driven by duty gaps between the two lineups). Two views of the same model — a Monte Carlo simulator for games and stories, and an exact solver that computes the value of a rating point with no sampling noise. Deterministic and replayable (keyed RNG, event log). Delivered gradually as a strangler, never as two engines: the drive engine stays authoritative while the new model is built and gated. The ability layer, flex table, Hungarian solver, and season/league code are kept; the old engine becomes a plumbing oracle only.

**Why (Claude's reasoning, in short):** the drive engine generates totals first and renders drives — there is no per-play state, so every new stat needs a bolt-on allocator, and `margin.ts` exists to patch what top-down generation gets wrong. A play-level engine produces margins naturally, gives one source of truth for every stat (box score, snap counts, usage, gravity all fold from one event log), and ports to other sports. Z.ai's flex experiment — C>OT and FB>RB inside the Owner's ±5 with zero authored prices — is the best argument for the move. The rebuild is justified by portability and one source of truth, not by flex (the ability table and the guard survive a rebuild).

**Owner rulings that bound this work:**
- Phases 0 (kernel + contracts) and 1 (football baseline, all lambda = 0, totals bar) are APPROVED.
- Totals bar is ~10% for most metrics (general sense of realism, not exact 2025 modelling). The margin distribution still gets a goodness-of-fit check.
- Basketball is the second sport, deferred until football is done.
- No historical Madden ratings right now; lambda identification proceeds without them.
- FB = scarcity (FB>RB 2, FB>TE 6 stay; guard 18 not used). C>OG = nonissue, 6 is fine. All three below-guard rows settled.
- The 32-spot table is NOT a gate the new engine must reproduce (Owner 8 Nov: the engine's input determines the specs; the measured curve is output, judged by the Owner).

**What Z.ai is doing:** Claude timed out, so Z.ai has the Ledger Phase 1 prompt (council/muse `cca17b8c`): build the snap ledger, powered by his PLAYLED prototype as the staging engine, in his own lane (read-only on the engine). The Ledger is the acceptance test for the rebuild and the measurement layer for snap counts, gravity, and participation.

**What Claude's design needs from the council:** reviews of the design and the toy kernel, and verification of the Phase 0–1 gates as they land. The nflverse data request (play-by-play, participation, snap counts) waits for the Owner's go — Claude has not sent it yet.

## Work options

**A. Review Claude's engine design** (P-342; the design doc + `toykernel.mjs`). MUSE reviewed it (ok, `inbox/20261111-0120-muse-P-341-claude-design-review.md`) — the toy kernel reproduces exactly, the engine-size and current-shape claims verify from code, and the 32-spot-table correction follows the Owner's 8 Nov ruling. Read the design, run the toy kernel yourself, and file your own review. Questions to press on: is lambda identification (the largest risk) actually solvable from OVR-only data? Is the strangler delivery the right shape? Are the totals-bar tolerances (~10%) the right gate for Phase 1?

**B. Review Z.ai's PLAYLED prototype** (P-341; council/glyph `0f8deac6`). MUSE reviewed it (ok, `inbox/20261111-0105-muse-P-341-zai-rebuild-review.md`) — all receipts reproduce, the totals bar is NOT cleared (possessions −27%, weak side −39%), but the flex experiment clears (2 of 4 inside ±5 with zero authored prices). Read the design doc, re-run the measurements, and file your own review. Questions to press on: is the Ledger-powered-by-prototype path the right next step? Is the chain-length diagnosis (the possession gap) correct, and is nflverse conversion data really what closes it?

**C. P-326 — formal recheck of localWins20.** The replacement for slotWins20 (per-position local slope at ±5 around pool-average centers). The formal P-326 recheck filing is still owed by a council seat — not MUSE (own-math constraint). Re-derive the table, check the ±5 slope method, and file the recheck.

**D. LOO on ZAI-D1 + the merged form.** The Owner said yes (merge question 9). Run leave-one-role-out on ZAI-D1 and on the merged form (Z.ai ability + Claude measured guard via max), and report whether the merged form holds up. This is the fair comparison the merge needs.

**E. Test Z.ai's Ledger Phase 1 when it lands.** When Z.ai's snap ledger arrives (single zip, staged by the Owner), verify it: run the scripts, check the snap shares against the engine's own constants (PERS, DL5_SHARE, DIME_W), check the FB share against the engine's weight, and check the conservation test (staged plays sum to drive totals). File a review.

**F. The C 200 vs 150 question.** `sport-football.json` has C at 200; the engine slot has C at 150. Claude cannot say which the Owner means, and his two instruments use different bases because of it (rolesurplus uses the JSON, the census uses engine slots). Investigate which is correct and what the impact is — the C>OG guard is 9.0 under the JSON and 12.5 under engine weights. Report the finding so the Owner can rule.

**G. P-339 — verify and close.** Claude's census answered the centre flex-out diagnostic: at C>OT 6, centres do NOT constantly flex on real rosters (5/32 teams, +0.012 wins); the exposure is a stacked second elite centre. Verify the census finding (re-run `flexcensus.mjs` if you can) and confirm whether P-339 is resolved, or whether a gate-free fix is still needed.

**H. Review backlog (needs reviews to reach REVIEWED).** P-328 needs one more review. Inkling Q1 needs one more review. P-282 is done but not marked REVIEWED. P-294 has five reviews but is not marked REVIEWED. P-288 needs two more reviews. Pick one, read the filing and the existing reviews, and file yours. A review you can do beats new work in the same tier.

## How to work

- Take the top item from `_agents/QUEUE.md` (`node tools/council.mjs next`), do it or review it, and push after every finished file/task — commit and push often, WIP if a chat gets long. A timed-out chat loses unpushed work; a pushed commit survives it.
- Reviews go in `inbox/<UTC>-<seat>-P-<ID>-<slug>.md`, first line `SPEAKER: … | ROLE: … | TASK: … | DATE: …`, then `FOR: <ID>`. Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN. Three different seats' ok/improved = REVIEWED.
- Do not assign work to a named agent. Do not touch the product file or the engine — only the Architect builds those. Do not review your own work.
- If you find a real defect, say so plainly with the receipt (command + output). If you find an error in MUSE's review, correct the record — MUSE corrects its own errors in the same turn.

## Innovate

Within any of the above: if you see a better way to test the design, a sharper question for the Owner, a measurement the council hasn't run, or a use for the Ledger nobody has named — do it or note it as an `IDEA:`. The rebuild is the biggest direction change the project has taken; the council's job now is to make it measurable and to catch what the builders miss. Think around the problem, not just inside it.
