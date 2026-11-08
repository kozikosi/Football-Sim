# Council update prompt — Claude timed out; P-294 landed, flex picked, theta sent (2026-11-08)

**From:** MUSE, High Councillor
**To:** Every council member (any seat that can take work)
**Tone:** Direct, as the Owner allows for council prompts. This is a group call, not an assignment to any named agent — take the top item, do it, file it, push it. Nothing waits for a particular seat.

This is an UPDATE to the council long prompt (`council-long-prompt-2026-11-08.md`, 9469e411), which is still the standing spec for the full work list. Read that prompt for the complete list; this prompt gives you only what changed since it was written and what to do now. If you have not read the long prompt, read it first.

---

## §0 · How to boot

Run the copy-paste prompt the Owner sends you, or if you have file access, run:

`git fetch origin && git show origin/council/muse:_agents/START-HERE.md` and follow it exactly.

START-HERE.md is the lean one-document boot. Do not read the whole repo. Do not re-read the long starter prompt (it was deleted; START-HERE.md replaces it).

---

## §1 · What Claude worked on (and where it stands)

Claude timed out while working. Here is what he did before the timeout, all VERIFIED on `architect/engine-and-seats`:

**The chain (all landed):**
- **Q4 parameter diff + FITTED-label test + witness tolerance fix** (8197308 + 3f16074, landed as e04a7dcc). The Q4 diff rebuilds the table from the engine every run; the 6 Nov refit moved 32/122 coefficients by >10x or <0.1x; Colors measures at most 23.3 points from the Owner table (limit 50). The FITTED test (5 tests) pins the default display as FITTED; full suite 289/289 at the time.
- **Measured display + salary-table retirement** (7af54c0). The default weight display in Colors is now MEASURED (`measuredDisplayWeights()` in `colors/src/sports/nfl/engine/value.ts`, QB at 1000, nearest 5). Full suite 290/290, including a new test that the witness check calls the new display MEASURED. Engine inputs NOT touched — lineup, draft and seeded outputs identical. The measured curve differs from the inputs by at most 23.7 points (DE1 +23.7, WR1 −17.6). Ruling: `claude/rulings/2026-11-08-owner-salary-table-retired.md`.
- **Specs ruling** (3cfbeac). The Owner picked Option B: the engine's input determines the specs; NO refit to the measured curve and NO refit to any table. The specs and slot weights stay as the engine's input; the measured curve is only the display. The 23.7-point worst-slot gap is expected. Recorded in the same ruling file.
- **P-294 flex evidence + proposal table** (1e6372a — the tip). Claude replayed the real engine on seeded drafts (3,072 lineups). He counted 85+ players placed through a penalty into a spot heavier than their own role's best spot. The table uses the measured weights on fresh seeds nothing was tuned on (1,024 lineups). Files: `claude/rulings/2026-11-08-p294-flex-model-first-evidence.md`, `tools/mathlab/flexeval.mjs`, `results/flexeval-2026-11-08.json`, proposal `tools/mathlab/flex-model-first-proposal-2026-11-08.json`. **flex.json and FLEX are UNCHANGED** (the proposal is a separate file, not adopted).

**What Claude did NOT do (the timeout cut him off):**
- **The theta pricing.** The theta formula was UNKNOWN to him (only named in the Nov 8 inbox answer to Z.ai; not defined on his branch or on council/zai). The Owner has now SENT him the formula (see §2). Pricing it on the same seeds is the next step.
- **The flex build.** The build step (flex.json + flex.ts, flexcheck, re-pin hash, 7 tests) has NOT happened. The proposal table exists; the live flex.json is still the Owner's REV 4.
- **tools/seat-check.sh.** Not built. It is next after the flex build (per NOW.md).

**Push:** the push loop is closed. Claude has push access (Owner-instructed `add_repo` push, then `git push origin HEAD:architect/engine-and-seats`). 1e6372a landed. The Owner has now also said "Try to push however you can" — push access is granted.

---

## §2 · What the Owner decided (since the long prompt)

**The flex pick — DECIDED by the Owner (2026-11-08):**
- **−12 everywhere (for −10).** All former −10 rules become −12.
- **Change all −4s to −6.** All −4 rules become −6.
- So the system is **−2 / −6 / −12** (the −2 rules unchanged).

**This is a NEW combination — it was NOT in Claude's evidence table.** Claude measured: today's flex.json (1319 encouraged off-role stars), −2/−4/−10 (870), −12 on every 10 (787), −12 on 4 rules only (812). He did NOT measure −2/−6/−12. The −4→−6 change addresses the −2/−4 design (C>OG1, OG>OT1, OLB>MIKE) that Claude noted no −10/−12 rule fixes — the Owner is fixing it by raising the −4s. **The council's job is to verify the −2/−6/−12 combination when Claude builds it** (re-run the evidence: the placement counts on fresh seeds, and confirm the −4→−6 change does what the Owner intends). Do not assume the evidence table's numbers apply to the new combination — they do not.

**The theta formula — SENT to Claude by the Owner (2026-11-08):**
- **P(a→b, ovr) = clamp(round2(θ · ovrEq(a→b, ovr)), 0, 30)**
- Inputs: `a` = source position, `b` = target position, `ovr` = the player's OVR, `θ` = the scaling factor (Owner picks from 0.5 / 0.75 / 1.0), `ovrEq(a→b, ovr)` = the OVR-equivalent cost of moving a→b at that OVR (measured by the flex pricer — wins lost, converted to OVR-equivalent).
- Output: `P` = the flex penalty in OVR points (subtracted from effective OVR when slotted off-role). Unit: OVR points, clamped to [0, 30], rounded to 2 decimals. Sensitivity grid: θ ∈ {0.5, 0.75, 1.0} × OVR ∈ {85, 90}.
- Source: Z.ai's governance doc on gh-pages (`z-post-blue-docs-update-2026-11-08-brainstorm/_agents/zai/notes/governance-2026-11-08.md`, R-005 part 3). The formula was found there by MUSE — it was not on Claude's branch or on council/zai.
- **The theta pricing is now unblocked.** Claude (or a council seat with the tools) should price it on the same seeds (flexeval.mjs) and show the sensitivity grid. If Claude's session is still down, a council seat can do this — the formula and the tool are both named here.

**The switch — STILL OPEN (the Owner did not confirm it in this message).** Claude proposed two tables behind a switch: model (default) = the new model-first proposal, owner = the Owner's REV 4 flex.json (kept as the later fallback). The Owner picked the table (−12 everywhere, −4s to −6) but did not say yes or no to the switch. **Do not build the switch until the Owner confirms it.** If you are the seat that asks him, ask it as one narrow question.

**Push access — GRANTED.** The Owner told Claude "Try to push however you can" and granted push access. Claude's next push should go through. If a council seat hits a push problem, say so in your bulletin entry — do not route around a denial.

---

## §3 · What the council should do now (in priority order)

### First — verify Claude's P-294 evidence (P-294)

This is the most urgent verification. Claude's evidence run is the basis for the flex pick, and the Owner has now picked a combination (−2/−6/−12) that was NOT measured. Verify:

1. **Re-run the evidence.** Run `tools/mathlab/flexeval.mjs` (on `architect/engine-and-seats`, tip 1e6372a) and confirm the table: today's flex.json 1319/0, −2/−4/−10 870/246, −12 on every 10 787/116, −12 on 4 rules only 812/183. Confirm the counts (3,072 lineups total, 1,024 on fresh seeds nothing was tuned on) and the 85+ off-role-star placements. Report any number you cannot reproduce.
2. **Check the proposal table.** Read `tools/mathlab/flex-model-first-proposal-2026-11-08.json` and confirm it matches the write-up (the Owner's −2/−4 untouched, former 6+ rules at 10, 12 on the four rules RB>WR, TE>EDGE, TE>OT, DT>EDGE). Note: the Owner's pick OVERRIDES this proposal (he picked −12 everywhere + −4s to −6, not the targeted 12). The proposal file is a record of what Claude proposed, not what the Owner picked.
3. **Price the theta formula (if Claude has not).** The formula is in §2. Price it on the same seeds with flexeval.mjs and show the sensitivity grid (θ 0.5/0.75/1.0 × OVR 85/90). If you do this, file it as a P-294 follow-up (or as a review of P-294) with the command and output. Do not invent the formula — it is given in §2.
4. **File the review.** `inbox/<UTC>-<seat>-P-294-review.md` with `VERDICT: ok | improved | rejected`. The review should state: whether the evidence reproduces, whether the proposal table matches the write-up, whether the theta pricing is done, and what remains (the −2/−6/−12 combination is unmeasured — flag it).

### Second — watch for the flex build and verify it (P-294, continued)

When Claude (in a new session) builds the flex table (−2/−6/−12), verify it:
- The build step (per NOW.md): flex.json + flex.ts, flexcheck, re-pin hash, 7 tests.
- **Re-run the evidence on the NEW combination.** The −2/−6/−12 table was not measured. Run flexeval.mjs against it on fresh seeds and report the placement counts (encouraged off-role stars, through a −12 rule). Compare against the evidence table (870 for −2/−4/−10, 787 for all-12). Confirm the −4→−6 change does what the Owner intends (it should cut the −2/−4 leaks: C>OG1, OG>OT1, OLB>MIKE).
- Confirm flex.json and FLEX were changed ONLY as the Owner directed (−12 everywhere, −4s to −6) and the hash was re-pinned in MERGE-MANIFEST.md in the same commit (FLEX is a protected constant).
- **Caveat (from Claude's evidence):** the evidence counts placements, NOT wins or standings. The wins/standings effect of any table is still unmeasured. Say so in your review — do not claim the table is validated on wins.

### Third — the review bottleneck (from the long prompt — still open)

- **P-285 (P1) — Review w85. Needs TWO more seats.** MUSE's review is filed (VERDICT improved, `inbox/20261108-1611-muse-P-285-review.md`). Read it, then verify independently. The most significant finding is the R2-19 rating scale (0 occurrences in w85; the r2 battery crashes on it).
- **P-307 (P1) — Review w86 when it lands.** Beam pushes the zip via `tools/import-zip.sh`; once live on gh-pages, review the six asks (pill ink law, census law, DCC panels, banners, six-hour law, Series order). Confirm or correct Z.ai's proof claims and the three residuals.
- **P-288 (P1) — Review/verify Claude's guard passes + FITTED-label test + Q4 parameter diff.** The Q4 work landed (e04a7dcc). Run `tools/mathlab/param-diff.mjs` and the Colors test suite (290/290 now, including the MEASURED-display test). Verify the witness tolerance fix.
- **P-286 (P1) — Review 67 Cakepanz Slice 1 when it lands.** Z.ai is building it (the Svelte Draft Board). Blocked until it lands. Z.ai is blocked on this review — do not let it sit.

### Fourth — the rest (from the long prompt — read it for the full list)

P-276 (P0, the N=1000 repro), P-289/P-293 (model-first program), P-282 (needs 2 more reviews), P-292 (deno gap), P-291 (tree-comparison harness), P-295 (CI-gate N=100), P-283 (boot inefficiency), P-290 (reconciliation), P-296 (cutover checklist), P-297 (N1), P-298 (page-background), P-299..P-304 (w86 follow-ups), P-303 (battery re-anchor), P-305 (fonts), P-306 (playoff run), P-254..P-261, P-284 (open until the Owner retires it). The long prompt (`council-long-prompt-2026-11-08.md`, 9469e411) has the full detail for each.

---

## §4 · The working rules (short version — the long prompt has the full text)

- Take the top item you can do. Do not wait to be assigned. Do not assign work to a named agent.
- Verify before claiming (VERIFIED / REPORTED / INFERRED / UNKNOWN). Run the check; attach the command and output.
- Report blockers instead of going silent. If Claude's session is down and you cannot do an item that needs him, say so and take the next item.
- File your work in `inbox/<UTC>-<seat>-<ID>-<slug>.md` (first line `SPEAKER: <seat> | ROLE: <role> | TASK: <task> | DATE: <UTC>`, then `FOR: <P-ID>`). Reviews carry `VERDICT: ok | improved | rejected`. Push your branch (`council/<seat>` only, never force-push, add by path).
- Do not touch the product file (Architect only). Do not touch the protected constants. **Do not touch slots.ts, design.json, the refitted specs, or flex.json** unless the Owner has directed the specific change (the flex build is now directed: −12 everywhere, −4s to −6 — but only Claude builds it; the council verifies it, it does not write it).
- Do not decide for the Owner. The switch (model|owner) is still open. The flex direction beyond the table pick is still his. Label every recommendation as a recommendation until he locks it.

---

## §5 · The files that matter (for this update)

- **Claude's P-294 evidence:** `claude/rulings/2026-11-08-p294-flex-model-first-evidence.md`, `tools/mathlab/flexeval.mjs`, `results/flexeval-2026-11-08.json`, `tools/mathlab/flex-model-first-proposal-2026-11-08.json` — all on `architect/engine-and-seats`, tip 1e6372a.
- **The theta formula source:** `z-post-blue-docs-update-2026-11-08-brainstorm/_agents/zai/notes/governance-2026-11-08.md` (R-005 part 3, line 34) on gh-pages. The formula is also given in full in §2 above.
- **Claude's state:** `claude/NOW.md` on `architect/engine-and-seats` (tip 1e6372a). NEXT: Owner picks flex table + switch (the table is now picked: −2/−6/−12; the switch is open); then build (flex.json+flex.ts, flexcheck, re-pin, 7 tests); then `tools/seat-check.sh`.
- **The long prompt (the full work list):** `_agents/muse/deliveries/prompts-2026-11-05/council-long-prompt-2026-11-08.md` on council/muse (9469e411).
- **The P-285 review:** `inbox/20261108-1611-muse-P-285-review.md` on council/muse.

Take the top item. Do it. File it. Push it. Tell the Owner what needs his approval.
