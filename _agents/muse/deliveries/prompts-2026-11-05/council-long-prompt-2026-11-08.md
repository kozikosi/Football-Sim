# Council prompt — the rest of the council (long) — 2026-11-08

**From:** MUSE, High Councillor
**To:** Every council member (any seat that can take work)
**Tone:** Direct, as the Owner allows for council prompts. This is a group call, not an assignment to any named agent — take the top item, do it, file it, push it. Nothing waits for a particular seat.

This prompt supersedes the earlier any-member prompt (`council-any-member-prompt-2026-11-08.md`, 8d47adc3). The state has moved since then: w86 shipped, Claude's Q4 work landed, 67 Cakepanz is opening. This is the current list.

---

## §0 · How to boot (read this first, then work)

Run the copy-paste prompt the Owner sends you, or if you have file access, run:

`git fetch origin && git show origin/council/muse:_agents/START-HERE.md` and follow it exactly.

START-HERE.md is the lean one-document boot (~3.5 KB): orient, read only what the task names, find work only if no task is given, work by the rules, stop. Do not read the whole repo. Do not re-read the long starter prompt (it was deleted; START-HERE.md replaces it).

**If this prompt names a task for you, do that task.** If it does not (or the task is done), take the top item from `_agents/PRIORITIES.md` (`node tools/next.mjs`).

---

## §1 · Where we are (2026-11-08, the state that governs this prompt)

**The direction is model-first.** The Owner's Nov 6 salary table is DEAD as a target and as the default. Weights come OUT of the engine's measured impact, not INTO it from a table. The measured mode is the default (either name, "Engine Value" or "Model Value", is fine; Owner Preset one click away). The salary table survives only as an anchor (a sanity band) in the triangulation, never as a fit input. Do not fit anything to it. Do not build on it. The witness gate labels a display that equals a fit table as FITTED — and under model-first, the display must be MEASURED.

**Claude's Q4 work LANDED** (architect/engine-and-seats, e04a7dcc): the Q4 parameter diff (param-diff.mjs, deterministic; the 6 Nov refit moved 32/122 coefficients by >10x or <0.1x; Colors within 23.3 points of the table, limit 50) + the Colors FITTED-label test (5 tests pin the default display as FITTED; full suite 289/289) + the witness tolerance fix (judge() takes a tolerance, default 5 unchanged; Colors test passes the Owner's limit of 50). **Push loop closed** — Claude has push access now; future sessions will not re-hit the 403 wall.

**One block, and it is the Owner's call, not yours:** Claude recorded the Nov 8 relay correctly but flags a conflict — his Nov 6 ruling says the salary weights are PERMANENT, the relay says the salary table is dead. Until the Owner confirms in his own words, `slots.ts`, `design.json`, the refitted specs and `flex.json` stay untouched and the measured-default work cannot start. **Do not try to resolve this.** Do not touch those four files. Do not re-decide it. It is waiting on the Owner, and the Owner alone.

**Z.ai's w86 SHIPPED** (local zai/w86, commit ac6aba7, unpushed): md5 31828a37…, 1,878,268 B, base w85 (2) eb91abd2…, zip c1b476af…. Six asks shipped, each with a root cause found (pill ink law, census law, DCC panels, banners, six-hour law, Series order). **Base VERIFIED** (w85 is the live index.html, md5 matches). **The w86 fixes are REPORTED, not yet independently verified** — the file is unpushed, so no seat has run it yet. Beam pushes via `tools/import-zip.sh`; once it lands on gh-pages, it needs a review (P-307). Z.ai's continuation prompt (w86 follow-through + 67 Cakepanz Slice 1) is written and pushed (`zai-continuation-w86-to-67cakepanz-2026-11-08.md`, 3145013c).

**67 Cakepanz is opening.** Z.ai builds Colors in parallel (his own tree, his own name, 67 Cakepanz). Slice 1 is the Svelte Draft Board. Claude reviews his slices for contract conformance and integrates; Claude owns the engine. Z.ai consumes the engine as a frozen snapshot (pinned at 4ca9a071) and never edits it. Neither builder edits the other's tree. The Owner gave Z.ai autonomy inside 67 Cakepanz (build first, review catches problems after) — scoped to his tree only, not the engine, the brand, or Owner decisions.

**The other Nov 8 decisions (recorded, for reference):** RNG Stage 1 approved. CI-gate N=100. CI tagging approved (go-live stays a deliberate Owner act; CI never deploys on its own). w67 subtitle critique dropped. Five flags (P-278) dropped — w85 stands as-is. F5 accepted (the one-sentence doc). Envelope answers accepted (saveId/createdAt now; no datasetId — content hash; SHA-256). Seat-check approved WITH the very-small-documents constraint (PROJECT-KNOWLEDGE.md joins the RULES-CHECK watched set, but the documents must be very small/lean). Cutover trigger: a fully functioning Colors v1, then the repo moves (Option A — move whole into the fresh repo). The flex question is NOT decided — it needs re-deriving under model-first (P-294). The 4 BUILT rows (P-252/P-253/P-279/P-280) sit in PRIORITIES-ARCHIVE.md, not the RETIRED section — the Owner has not yet said whether to move them.

**Calibration targets (locked, do not tune against anything else):** 90% playoffs, ~35% Super Bowl appearance, 25% title for the AVERAGE skilled drafter (skilled = selects within the top 30 by Wins/Priority in every round). Going 20-0 about 1–2% possible. The game is currently too hard (N=300 anchor: skilled 47% / 6%). Nothing is tuned until the protocol is pinned at N=1000 — the P-263 cluster split is sampling noise until then.

**The PRIORITIES.md archive:** the live queue is `_agents/PRIORITIES.md` (117 KB — near the push ceiling; push it alone when it is large). Terminal rows (SUPERSEDED/BUILT, 88 of them) live verbatim in `_agents/PRIORITIES-ARCHIVE.md`. The highest P-number in use is P-307.

---

## §2 · The mission (why this prompt exists)

**Reviews and verification are the bottleneck.** Z.ai cannot start Slice 2 until Slice 1 is reviewed. Claude's guard passes need independent verification. w85 has one review (MUSE's) and needs two more. w86 is about to land and will need a review. The lab program needs verification. The work is not short of builders — it is short of verifiers.

So this prompt is mostly review and verification work. A review you can do beats new work in the same tier. Verify before claiming (VERIFIED / REPORTED / INFERRED / UNKNOWN, per AGENTS.md). Run the check; do not just confirm the commit. Report blockers instead of going silent. Bring your own ideas — if you see something that needs doing that is not on this list, file it as a P-item (see §4) and do it, or say so in your bulletin entry.

---

## §3 · The work list (take the top item you can do; do not wait to be assigned)

The items are in priority order. Take the highest one you can actually do (with the tools you have). If you cannot do the top item (no deno, no browser, no file access), take the next one you can do and say so in your bulletin entry.

### The review bottleneck (highest priority)

**P-285 (P1) — Review w85. Needs TWO more seats.** MUSE's review is filed (VERDICT improved, `inbox/20261108-1611-muse-P-285-review.md`, bea7179f). Read it first, then verify independently. The review file and the w85 adapter (`_agents/muse/deliveries/p-285-w85-review/w85-adapter.js`) are on council/muse. What to check: the five Owner comments (pill shape, Cutdown Day gone from preseason, lineup changer never shows "…", preview key players keep teams apart on a phone, SIM PLAYOFFS w78 door), the eight surviving w85 systems, and the w77 battery against w85 (80/84 — the 4 fails are intentional w85 changes or a stale marker, not regressions; see the review §6). The most significant finding is the R2-19 rating scale — `zpbSeasonRating` and `ZPB_MEDIAN_OVR` have 0 occurrences in the shipped w85 file, and the r2 battery crashes on them. Confirm or correct that finding with your own run. File your review as `inbox/<UTC>-<seat>-P-285-review.md` with `VERDICT: ok | improved | rejected`.

**P-307 (P1) — Review w86 when it lands.** Beam pushes the zip via `tools/import-zip.sh`; once the file is live on gh-pages, review it the same way as P-285 (the five Owner comments do not apply — w86 has its own six asks; verify those six: pill ink law, census law, DCC panels, banners, six-hour law, Series order). Confirm or correct Z.ai's proof claims (84/0 batteries, 31/31 functional, census 0/0, zero page errors) with your own runs. Confirm or correct the three residuals (49ers dark footer pill 4.43:1, three teams' view-toggle golds ~3.9:1, fuller lineups lift weak teams). Confirm or correct the P-285 items (P-299..P-302 — see below) — did w86 address them? File as `inbox/<UTC>-<seat>-P-307-review.md`.

**P-288 (P1) — Review/verify Claude's guard passes + FITTED-label test + Q4 parameter diff.** Claude's Q4 work landed (e04a7dcc). Verify it independently: run `tools/mathlab/param-diff.mjs` (it rebuilds the diff from the engine on every run; the output must be identical across two runs; it exits 1 if the Nov refit drifts more than 50 points from the Owner table). Run the Colors test suite (must be 289/289, including the 5 FITTED-label tests in `colors/test/nfl/witness.test.ts`). Check the findings: the 6 Nov refit moved 32/122 coefficients by more than 10x or less than 0.1x; Colors measures at most 23.3 points from the Owner table (limit 50); the Colors engine on the frozen Oct coefficients sits 53 points off the Oct target at WR1. Check the witness tolerance fix (judge() takes a tolerance, default 5 unchanged; the Colors test passes the Owner's limit of 50; self-test 9/9; Pre-Colors still MEASURED). Do not just confirm the commit — run the check. File as `inbox/<UTC>-<seat>-P-288-review.md`.

**P-286 (P1) — Review 67 Cakepanz Slice 1 when it lands.** Z.ai is building it now (the Svelte Draft Board). Blocked until it lands. When it lands: the battery (w77, 84 assertions) against Slice 1, the frozen-snapshot check (is the engine snapshot at 4ca9a071, unedited?), the contract check (AppState/Action, DraftStoreState/Action, the 32 slots, the valuation modes — measured default, Owner Preset one click, mode label everywhere, switch disabled mid-draft). File as `inbox/<UTC>-<seat>-P-286-review.md`. Z.ai is blocked on this review — do not let it sit.

**P-287 (P1) — Review 67 Cakepanz Slices 2–5 as they land.** Same pattern as P-286, one slice at a time. (Slice 2: Team Select + Season/Standings. Slice 3: hydration + FeedEvent union. Slice 4: N3 drive-level feed UI. Slice 5: N2 brag shareables + seed card.)

### The headline verification (P0)

**P-276 (P0) — Verify the w75 reproduction (M14) + resolve the two-cluster split.** The decisive N=1000 baseline repro is IN FLIGHT (VL was ~85–90% at last report). If VL's repro has landed, verify it. If it has not, and you have deno, run it yourself (the commands are in Z.ai's w75 M14 answer: `deno run -A tools/outcomelab/determinism-1000.ts --policy baseline --runs 1000 --seed-base 1000`, plus the edge-sweeps for midFloor and the three policies). The two clusters (VL + MUSE measured 38/3, OR/VLOC/Beam measured 53/11 at N=100) are, per VL's hypothesis, sampling noise — do NOT tune against either cluster until pinned at N=1000. If you have no deno, say so in your bulletin entry (P-292 is the deno unblock) and take a different item.

### The model-first program

**P-289 (P1) — Verify the model-first lab program.** The T1 ladder, the holdout law, the triangulation, the Kicker FG-model audit. Z.ai's lab window shipped T1/T3/T4/T6/T12 (receipts in ZAI.md, on gh-pages under `z-post-blue-docs-update-2026-11-08/_agents/zai/`). Verify the receipts: run the witness (PreColors MEASURED, w79 ABSORBED at 0.000000%), check the triangulation (rosetta-triangulation-2026-11-08.json — 14/26 slots rank-flagged vs the Owner salary anchor), check the T1 mechanics validation (8 seeded seasons vs hash-pinned nflverse 2024), check the T4 replacement audit. The holdout law (fit 2016–2023, validate 2024, final-test 2025) is the rule — confirm the lab complies with it.

**P-293 (P1) — Model-first weights finalization.** The measured table; replaces P-284's dead salary method. The rosetta triangulation is the proposal (QB=1000, increments of 50, from raw slopes only; 26 slots — the unmeasured depth slots are absent because the measurement cannot price them). The finalization needs the holdout law, the triangulation, and the Owner's call. Do not finalize a table by fitting to the salary table. The table comes OUT of the engine's measured impact, triangulated against independent real-world anchors (receiving volume, EPA production, Approximate Value, salary as a sanity band).

**P-294 (P1) — Flex re-derivation under model-first.** The theta grid review + (a)/(b)/(c) evidence. The HOLD on flex.json/FLEX/slots.ts/design.json stands until the Owner picks — do NOT touch those files. The candidate mechanism is the theta formula in R-005 part 3 (price only; adoption waits for the flex pick). Review the flex pricer (T6: TE→WR1 median 0.63 wins lost, CB→WR1 0.67 — the −10 cap guard under-prices these moves) and the flex-ext tool (QB→FS costs 0.975 wins / 22.8 OVR-eq @90 — the flat −10 under-prices star QBs by >2×; CB→FS is NOT free, 0.284 wins @90 vs flat 0).

**P-282 — Needs TWO more reviews for REVIEWED ✓✓✓.** DONE by three seats (VLOC the work, Beam a review, VL an independent filing). Beam's review is one of three needed. Largely superseded by model-first, but the review bar is the review bar — if you can review it, do. (The revealed WR2/WR1 ratio is 0.544, VERIFIED — that measurement stands regardless of the salary-table reversal.)

### The tooling and infrastructure

**P-292 (P2) — Unblock the deno gap.** Verify Z.ai's Node Lab runner (the harness runner in Node, no deno — the single most important unblocker). Confirm OR and vloc can run the Lab (both are blocked on tooling with no deno). If the Node runner works, say so with the command and output; if it does not, say what fails.

**P-291 (P2) — Tree-comparison harness.** The same w77 battery against both trees (Colors and 67 Cakepanz), diff per assertion — what lets Claude decide what ships at cutover. Build the harness (or verify it, if a seat has built it). The two trees run the same frozen contract + the same battery as shared truth; the harness is what makes the comparison evidence instead of opinion.

**P-295 (P2) — CI-gate verification (N=100).** Verify Z.ai's drafted CI workflows actually run and gate (tag-on-merge, nightly N=100 Lab run, tsc gate). Z.ai drafts; Claude reviews and merges. Your job is to verify the drafts run (not just that they exist).

**P-283 (P1) — Fix the council boot inefficiency.** Three fixes: the START-OF-CHAT "task already specified" shortcut (five reads + `node tools/next.mjs` even when the task is in the prompt), the council.mjs line 182 guard that fails from /tmp on a Mac (silent no-output bug — `/tmp` is a symlink to `/private/tmp`), and PRIORITIES.md visibility (the tool reads PRIORITIES.md only from the architect branch, not council/muse). Claude's boot-v3.5 read-only boot partly addresses boot pain from a different angle, but these three fixes are still open. (Note: the boot-v3.6 clone step — the clone has to run before bootstrap.sh exists, so the Project stub keeps the one clone call and bootstrap.sh can carry the canonical boot block plus a stub-version check. That is the Owner's pick; do not build it unless the Owner says so.)

### The reconciliation and the checklist

**P-290 (P2) — Reconcile the three open verification discrepancies + the DS margin-histogram defect.** (1) The 112-game hash: Claude's NOW.md says 68aecdac…, VL measured 27a09e70… — find out why they differ (likely a different driver). (2) The test count: 284 (Claude) vs 286 (Z.ai) — the settled reconciliation is 288 = full vitest suite, 286 = 288 minus the 2 storage-env-dependent tests skipped in the sandbox, 284 = 286 minus the 2 golden-seasons tests still warming; confirm it and close the discrepancy in the record. (3) The tsc-baseline file count: Beam 20 vs VL/Claude 24, total 176 agreed at pin time, now 91 total — reconcile the file count. (4) The DS margin-histogram defect (sums to 95.76%, omits margins > 30) in a `_agents/data/` snapshot JSON — fix it or confirm the fix. File the reconciliation; do not silently "correct" a column.

**P-296 (P2) — Cutover readiness checklist.** Branch inventory, open-P-row snapshot, inbox/bulletin move plan. The cutover trigger is a fully functioning Colors v1; the move is Option A (move whole into the fresh repo); the Architect does the move at cutover. Your job is the checklist: what branches exist, what P-rows are open, what inbox/bulletin entries need to move, and what the cutover commit must contain. Seat branches must be recreated in the new repo at cutover; in-flight P-items are snapshotted to the new repo's inbox in the cutover commit.

**P-297 (P2) — N1 exhibit help.** The council exhibit: role names (Architect, Executor, Councillor), not seat names; archive-link depth up to Z.ai/Claude; include the full story including the 20-0 context and the message-loss incident.

**P-298 (P2) — Page-background fix verification.** Once Claude lands it (the #fdf2f6 light / #1e1119 dark tokens + contrast-floor verification for 32 teams × 2 themes — the Owner-approved 1 Nov zpbPackFor change never landed in code). Verify the two page-background constants + the two inline floors, and the contrast floor for 32 teams × 2 themes.

### The w86 follow-ups (confirm, do not re-do)

**P-299 (P1) — w86: restore the R2-19 rating scale** (or reconcile whether the feature is present under a different implementation; do not claim restored until the r2 battery runs clean). **P-300 (P1) — w86: restore the W85-8 linescore frame** (2px + inset ring + drop shadow, 14px radius; verify via the w85_battery W85-8a assertion). **P-301 (P2) — w86: fix the W85-4 badge specificity** (badges render 14.28px, not 12.6px). **P-302 (P2) — w86: apply the R2-16 guard casing** ("Offensive guard", lowercase g). These four are in Z.ai's continuation prompt (§1c) as confirmations — your job is to verify the confirmations once w86 lands, not to re-do the fixes. **P-304 (P2) — Correct the stale battery counts in the w85 delivery docs** (26 scripts not 14; 10 screenshots not 11; 28/28 claim is Round-1). Docs only.

**P-303 (P1) — Re-anchor the w77 acceptance battery for w85.** V1 (the battery expects FS-before-SS; w85 orders SS-before-FS consistently), V8b/V8c (the battery expects "BACK TO WEEK 17" / "SUPER BOWL"; w85 uses exact stage labels), V13 (the battery probe is class-based; w85 kept the class but removed the box — the probe needs a computed-style check or the class needs stripping). Do NOT change w85 for these — re-anchor the battery. The V1 order needs the Owner's confirmation that SS-before-FS is correct; the re-anchor needs the Architect's sign-off. Do not re-anchor silently — the battery is the acceptance gate.

**P-305 (P2) — Google Fonts.** The product loads Google Fonts externally (the sole cause of the r3 "console clean" failure, and a standing tension with the offline requirement). Bundle locally (preferred for offline) or accept the external load — the Owner/Architect decide. Do not silently bundle or silently accept.

**P-306 (P1) — Playoff-qualifying live run.** Confirm the DCC presence + the SIM PLAYOFFS loss path. The P-285 review could not check these live (both simmed seasons missed the playoffs — 7–10, 8–9). Needs a playoff-qualifying run: a season where the user's team makes the playoffs, so the DCC panel appears on Season Review and the SIM PLAYOFFS loss path renders "SEASON ENDS". Run it live (browser) or via the battery harness — whichever you have. Report the result with the seed and the record.

### The rest of the queue

**P-254..P-261 — need takers.** (P-254 behavior is Owner-approved; the mechanics are Claude's. The others are in PRIORITIES.md — read the row and take it.)

**P-284 — still open until the Owner retires it or P-293 lands.** The salary-table METHOD is dead (P-293 replaces it). Do not do new work on P-284's salary-table finalization. If you are the seat that closes it, confirm with the Owner first (or note it as superseded by P-293 in your bulletin entry).

**P-275, P-276, P-277, P-278 — REVIEWED ✓✓✓.** Do not re-review them. (P-278's five flags are now CLOSED by the Owner's Nov 8 ignore-all call.)

---

## §4 · The working rules (how to do the work)

- **Take the top item you can do.** Read the P-row, do the work, file it, push it. There is no claiming; either you do it and push it, or you leave it for someone else. Do not wait to be assigned. Do not assign work to a named agent — not in prompts, not in docs, not in task rows. (This prompt is to the council as a group. The Owner's standing directive to the MUSE seat — to encourage and monitor other seats by invitation, never by order — is separate; this prompt does not assign anything to anyone.)
- **Review broadly.** No agent reviews the same item twice. More checkmarks = more trust. A review you can do beats new work in the same tier. Three ok/improved reviews by three different seats = REVIEWED ✓✓✓.
- **Verify before claiming.** Labels everywhere: VERIFIED (you ran it, the receipt is in the text) / REPORTED (someone else says so) / INFERRED (reasoned, not run) / UNKNOWN. Run the check; do not just confirm the commit. A successful tool call is not a verification. Attach the command and its output.
- **Report blockers instead of going silent.** If you cannot do an item (no deno, no browser, no file access, a missing file, a question only the Owner can answer), say so in your bulletin entry and take the next item you can do. A blocker reported is useful; a silent stall is not.
- **Bring your own ideas.** If you see something that needs doing that is not on this list, file it as a P-item (add a row to `_agents/PRIORITIES.md` — the format is `| ID | Tier | Title | Needs | Council work | Source |`, and the next new item is P-308) and do it, or say so in your bulletin entry. The council generates the code; the Architect adopts reviewed results.
- **File your work where it belongs.** Work: `inbox/<UTC>-<seat>-<ID>-<slug>.md` (first line `SPEAKER: <seat> | ROLE: <role> | TASK: <task> | DATE: <UTC>`, then `FOR: <P-ID>`). Reviews: the same inbox form with `VERDICT: ok | improved | rejected`. One file per item. Code longer than ~150 lines stays in your lane (`_agents/<seat>/deliveries/`) and the inbox file names its path and commit. Push your branch (`council/<seat>` — your own branch only, never force-push, add by path never `git add -A`). Post one bulletin entry per session (`bulletin/<UTC>-<seat>.md`).
- **Do not touch the product file.** Only the Architect builds the product file (`Football-Sim-*.html`, Colors v1 included), on any branch, ever. The council supplies ideas, exact code snippets, mock-ups and measurements (to its own `inbox/`), and after a build exists, tests. A seat that "just applied it" to the product has not helped.
- **Do not touch the protected constants** (DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS, and the contract that modelWeights() is the monotone quantisation of slotWinsPerOvr()). A change to any of them re-pins its hash in MERGE-MANIFEST.md in the same commit — and only the Architect does that, on the Owner's approval. **And do not touch slots.ts, design.json, the refitted specs, or flex.json** until the Owner confirms the salary-table conflict (see §1). The HOLD stands.
- **Do not hardcode a wave number.** Instruct seats to find the LATEST wave file (highest w-number with a product HTML on gh-pages) and verify it by listing. (The current live wave is w85; w86 is unpushed and about to land.)
- **Keep PRIORITIES.md honest.** The Owner's #1 gripe is dead priorities accumulating. If a row is dead (superseded, built, no longer applicable), move it to the terminal state (SUPERSEDED or BUILT) — the MUSE seat has standing permission to move items to BUILT, and any seat may flag a dead row in its bulletin entry. Regularly sweep for dead items. **Do not retire multisport items** (P-070 — basketball, baseball, soccer, hockey is the end goal, just not an immediate priority).

---

## §5 · The boundaries (what NOT to do)

- **Do not decide for the Owner.** The flex pick, the salary-table conflict confirmation, the P-303 V1 order, the P-305 fonts decision, whether to retire P-282, and the 4 BUILT rows (archive vs RETIRED section) are the Owner's calls. Surface them; do not decide them. Label every recommendation as a recommendation until he locks it.
- **Do not generate ratings.** Ratings generation is the Owner's alone, later. Do not build a ratings generator, a ratings pipeline, or a synthetic ratings pool for the product. Tests use real harness/fixtures, not a dev pool.
- **Do not build the rejected four.** ("What If" alternate-history, deterministic multiplayer, 20-0 roguelike mode, cross-era draft pools.) They are rejected, never re-pitch.
- **Do not re-pitch the amused experiment.** It is paused until the Owner says otherwise. (The draft-night broadcast and the tension graph were liked; they are filed as P-212, P-213.)
- **Do not build on the salary table.** (See §1.) The salary table is dead as a target and as the default. It survives only as an anchor in the triangulation.
- **Do not work on the v19 weights.** The v19 board is a Madden-only historical artifact. Do not cite, compare against, or measure the Football Sim engine with it. Judge the engine on the Owner's stated doctrine (corner singularity, run-stopping matters) and the current engine slot weights.
- **Do not edit another seat's branch or files.** Your own branch (`council/<seat>`) only. Disagreement goes through the bulletin or inbox, never by overwriting.
- **Do not go silent.** If you take an item and cannot finish it, say so in your bulletin entry. If you are blocked, say what blocks you. The council cannot help a seat it cannot see.

---

## §6 · The files that matter (read only what the task names)

- **The queue:** `_agents/PRIORITIES.md` (live) and `_agents/PRIORITIES-ARCHIVE.md` (terminal rows). **The boot:** `_agents/START-HERE.md`. **The rules:** `AGENTS.md` (this repo's house rules).
- **The current wave:** the live index.html on gh-pages (w85, md5 eb91abd22f335e34f6898dcff5e6dde6, 1,864,914 B). w86 is unpushed (local zai/w86, ac6aba7) — Beam pushes it via `tools/import-zip.sh`.
- **Claude's engine:** `architect/engine-and-seats` (tip e04a7dcc). The Q4 diff is `claude/rulings/2026-11-08-q4-parameter-diff.md`; the relay recording is `claude/rulings/2026-11-08-muse-relay-model-first.md`; the witness gate is `tools/mathlab/witness.mjs`; the FITTED test is `colors/test/nfl/witness.test.ts`.
- **Z.ai's model-first review:** on gh-pages under `z-post-blue-docs-update-2026-11-08/_agents/zai/` — the forensics (`notes/FIT-TARGET-FORENSICS-2026-11-08.md`), the addendum (`deliveries/VERACITY-SYNTHESIS-ADDENDUM-2026-11-08.md`), the synthesis (`deliveries/VERACITY-SYNTHESIS-2026-11-08.md`), the rosetta (`lab-results/rosetta-triangulation-2026-11-08.json`), the witnesses (`lab-results/witness-w79-61acb21e.json`, `lab-results/witness-precolors-5be9767f.json`).
- **The w77 battery:** `z-post-blue-cutover-2026-11-06 w77/batteries/accept.js` + `batteries/adapters/w76.js` on gh-pages. The w85 adapter is `_agents/muse/deliveries/p-285-w85-review/w85-adapter.js` on council/muse.
- **The 67 Cakepanz plan:** `_agents/muse/deliveries/prompts-2026-11-05/zai-67-cakepanz-prompt-2026-11-08.md` (the ONE prompt) and `_agents/muse/deliveries/prompts-2026-11-05/zai-continuation-w86-to-67cakepanz-2026-11-08.md` (the continuation prompt) on council/muse.
- **The P-285 review:** `inbox/20261108-1611-muse-P-285-review.md` on council/muse (VERDICT improved; the R2-19 finding is the most significant).

---

## §7 · Open questions (yours to answer, or to send back)

- The review bottleneck: what would make verification faster (a better battery adapter, a shared test harness, a clearer review form)? Propose it.
- The deno gap (P-292): is the Node Lab runner the right unblocker, or is there a better one?
- The tree-comparison harness (P-291): what is the right shape for comparing the two trees (same battery, diff per assertion — or something else)?
- The cutover (P-296): what is missing from the readiness checklist?
- What would you innovate on, beyond this list? The Owner encourages it — build the idea you believe in, file it, and say why.

Take the top item. Do it. File it. Push it. Tell the Owner what needs his approval.
