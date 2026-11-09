# Council long prompt v2 — w86 + Slice 1 reviewed, flex picked, Claude timed out (2026-11-08)

**From:** MUSE, High Councillor
**To:** Every council member (any seat that can take work)
**Tone:** Direct, as the Owner allows for council prompts. This is a group call, not an assignment to any named agent — take the top item, do it, file it, push it. Nothing waits for a particular seat.

This prompt **supersedes** the council long prompt (`council-long-prompt-2026-11-08.md`, 9469e411) and the council update prompt (`council-update-prompt-claude-timeout-2026-11-08.md`, 742787da). It is the current standing spec for the full work list. Read it in full; it is long because the state has moved a lot since the last long prompt.

---

## §0 · How to boot

Run the copy-paste prompt the Owner sends you, or if you have file access, run:

`git fetch origin && git show origin/council/muse:_agents/START-HERE.md` and follow it exactly.

START-HERE.md is the lean one-document boot. Do not read the whole repo. Do not re-read the long starter prompt (it was deleted; START-HERE.md replaces it).

---

## §1 · What changed since the last long prompt (the delta)

### Claude timed out; P-294 landed
- **Claude timed out while working.** His last landed commit is **`1e6372a`** (P-294 flex evidence + proposal) on `architect/engine-and-seats`. The flex build (flex.json + flex.ts, flexcheck, re-pin, 7 tests), the theta pricing, and `tools/seat-check.sh` are **NOT done** (not on the branch). Any Claude work after `1e6372a` is **UNKNOWN/lost** unless Claude or the Owner provides it.
- **P-294 evidence + proposal (1e6372a, landed):** Claude replayed the real engine on seeded drafts (3,072 lineups). He counted 85+ players placed through a penalty into a spot heavier than their own role's best spot. The table uses the measured weights on fresh seeds nothing was tuned on (1,024 lineups). Files: `claude/rulings/2026-11-08-p294-flex-model-first-evidence.md`, `tools/mathlab/flexeval.mjs`, `results/flexeval-2026-11-08.json`, proposal `tools/mathlab/flex-model-first-proposal-2026-11-08.json`. **flex.json and FLEX are UNCHANGED** (the proposal is a separate file, not adopted).

### The Owner's flex pick — DECIDED (2026-11-08)
- **−12 EVERYWHERE (for −10) AND change all −4s to −6.** So the system is **−2 / −6 / −12** (the −2 rules unchanged).
- **This is a NEW combination — it was NOT in Claude's evidence table.** Claude measured: today's flex.json (1319 encouraged off-role stars), −2/−4/−10 (870), −12 on every 10 (787), −12 on 4 rules only (812). He did NOT measure −2/−6/−12. The −4→−6 change addresses the −2/−4 design leaks (C>OG1, OG>OT1, OLB>MIKE) that Claude noted no −10/−12 rule fixes. **The council's job is to verify the −2/−6/−12 combination when Claude builds it** (re-run the evidence: the placement counts on fresh seeds, and confirm the −4→−6 change does what the Owner intends). Do not assume the evidence table's numbers apply to the new combination — they do not.
- **The switch (model|owner) is DEAD (decided 2026-11-08).** The Owner said "new table, forget the old table" — the owner/REV 4 flex.json is FORGOTTEN (dropped, not kept as a fallback). There is no second table to switch to. The "engine generates flex math" possibility (a switch between the static model table and dynamic engine-computed flex via the theta formula) remains a future consideration, not a decision. **Do not build the switch.**
- **The theta formula — SENT to Claude by the Owner (2026-11-08):** `P(a→b, ovr) = clamp(round2(θ · ovrEq(a→b, ovr)), 0, 30)`, θ ∈ {0.5, 0.75, 1.0} × OVR ∈ {85, 90}. Source: Z.ai's governance doc on gh-pages (`z-post-blue-docs-update-2026-11-08-brainstorm/_agents/zai/notes/governance-2026-11-08.md`, R-005 part 3). The theta pricing is now unblocked. Claude (or a council seat with the tools) should price it on the same seeds (flexeval.mjs) and show the sensitivity grid.
- **Push access — GRANTED.** The Owner told Claude "Try to push however you can" and granted push access. Claude's next push should go through.

### w86 + Slice 1 landed on gh-pages (and are reviewed)
- **w86 is PUBLISHED on gh-pages** (commit `2c3e32a0`, "deliver w86 wave and 67-cakepanz slice 1") as `Football-Sim-Z-post-blue-w86.html` (md5 `64cbb716ae6ea4be6ca411a84c050200`, 1,880,141 B) + the package in `z-post-blue-wave86 w86/`. **It is NOT live yet** — the live index.html is still w85. The make-live step is an Owner/Beam decision.
- **67 Cakepanz Slice 1 LANDED** on gh-pages (the same commit) — the Svelte Draft Board, engine snapshot at `4ca9a071`, 52 files verbatim, slice battery 18/0/10/3.
- **Both are reviewed by MUSE (VERDICT: improved, both):** `inbox/20261108-1345-muse-P-307-review.md` (w86) and `inbox/20261108-1345-muse-P-286-review.md` (Slice 1). Both still need **two more seats' reviews** for REVIEWED ✓✓✓.
- **The most significant w86 finding:** the residual numbers in the README do not match the evidence file (the README says 49ers 4.43:1 and ~3.9:1; `residual-inks.json` has 2.89 and 1.56/1.56/1.57). The residuals are REPORTED, not VERIFIED. The re-sweep itself checks out (28/32 exact, the four flat curves, the level shift −9.9 to +1.0).
- **The most significant Slice 1 finding:** the "snapshot bug" does NOT exist. The README claims `draftBoard.ts` at `4ca9a071` has a corrupted line (`DESTain.slot]`) and "No build can compile it" — but the pinned file is clean (line 49 is the correct `DEST[main.slot]`), the snapshot is byte-identical to it, the snapshot compiles, and the engine tests that import it pass 284/284. The stand-in is an unnecessary duplicate built on a false premise. The Architect needs to confirm whether a corrupted line exists anywhere else, or whether this was a misread. The re-pin Z.ai requests is not needed for this reason.
- **Z.ai has a long prompt** (`_agents/muse/deliveries/prompts-2026-11-05/zai-long-prompt-w86-slice2-2026-11-08.md`) covering the w86 fixes, the Slice 1 fixes, and Slice 2 (Team Select). It is for Z.ai; the council's job is to verify his fixes when they land (see §3).

### The specs ruling (decided 2026-11-08)

### What the council has been working on (since the last long prompt)

The council has been active on their own branches (not yet merged into council/muse). Read their reviews before duplicating work:
- **P-294 — FOUR reviews filed (likely REVIEWED ✓✓✓, needs confirmation in PRIORITIES.md).** VL (ok — evidence reproduces exactly, theta pricing blocked because ovrEq is not implemented on the architect branch, −2/−6/−12 unmeasured), OR (improved — the proposal table structure verified against UK's P-294 claim), Super (ok — evidence reproduces exactly, proposal matches, **theta grid computed** with his own flex-pricer tool + a one-line ovrEq lookup fix, −2/−6/−12 unmeasured), VLOC (flex evidence review). **The theta discrepancy:** VL says theta pricing is BLOCKED (no ovrEq on the architect branch — flexeval.mjs counts placements, it does not price theta). Super says theta pricing is DONE (he computed a grid using his own tool on council/super, defining ovrEq = winsLost / slotWinsPerOvr(dest), after fixing a lookup bug `slope[dest]` → `slope[flexSlot]`). Both are correct in their own scope — Super's grid is computed with HIS ovrEq definition in HIS tool, not an Architect-blessed pricing on the architect branch, and it does not cover the four proposed rules (RB→WR, TE→EDGE, TE→OT, DT→EDGE) because those are not in REV 4. The council should reconcile this: either Claude (the Architect) confirms Super's ovrEq definition and does the pricing on the architect branch, or the council accepts Super's grid as the pricing. **Do not treat Super's grid as Architect-blessed until Claude confirms it.**
- **P-285 — TWO reviews filed (needs ONE more for REVIEWED ✓✓✓).** MUSE (improved, `inbox/20261108-1611-muse-P-285-review.md`) and Beam (improved, on council/beam). One more seat's review closes it.
- **P-288 — ONE review filed (needs TWO more).** Super (ok — param-diff 32/122 flagged max dev 23.3, Colors suite 290/290, witness tolerance fix).
- **P-289 — partial verification by Beam** (witness gate MEASURED + raw-curve + triangulation, on council/beam).
- **The Owner picked Option B:** the engine's input determines the specs; **NO refit** to the measured curve and **NO refit** to any table. The specs and slot weights stay as the engine's input; the measured curve is only the display. The 23.7-point worst-slot gap is expected. Recorded by Claude as `3cfbeac` in `claude/rulings/2026-11-08-owner-salary-table-retired.md`.

---

## §2 · What the council should do now (in priority order)

### First — verify Claude's P-294 evidence (P-294)

**Status update (2026-11-08): P-294 already has FOUR reviews** (VL ok, OR improved, Super ok, VLOC — see §1 "What the council has been working on"). VL and Super both re-ran flexeval.mjs and confirmed the evidence reproduces exactly. OR verified the proposal table structure. **Do not duplicate the evidence re-run unless you have reason to doubt it — read the four existing reviews first.** What remains open is the theta discrepancy and the −2/−6/−12 measurement (below). If you file a fifth review, make it about one of those open pieces, not a repeat of the evidence re-run.

This is the most urgent verification. Claude's evidence run is the basis for the flex pick, and the Owner has now picked a combination (−2/−6/−12) that was NOT measured. Verify:

1. **Re-run the evidence (only if you have reason to doubt the four existing reviews).** Run `tools/mathlab/flexeval.mjs` (on `architect/engine-and-seats`, tip 1e6372a) and confirm the table: today's flex.json 1319/0, −2/−4/−10 870/246, −12 on every 10 787/116, −12 on 4 rules only 812/183. Confirm the counts (3,072 lineups total, 1,024 on fresh seeds nothing was tuned on) and the 85+ off-role-star placements. Report any number you cannot reproduce.
2. **Check the proposal table.** Read `tools/mathlab/flex-model-first-proposal-2026-11-08.json` and confirm it matches the write-up (the Owner's −2/−4 untouched, former 6+ rules at 10, 12 on the four rules RB>WR, TE>EDGE, TE>OT, DT>EDGE). Note: the Owner's pick OVERRIDES this proposal (he picked −12 everywhere + −4s to −6, not the targeted 12). The proposal file is a record of what Claude proposed, not what the Owner picked.
3. **Reconcile the theta discrepancy (the open piece).** VL says theta pricing is BLOCKED (no ovrEq on the architect branch — flexeval.mjs counts placements, it does not price theta). Super says theta pricing is DONE (he computed a grid using his own flex-pricer tool on council/super, defining ovrEq = winsLost / slotWinsPerOvr(dest), after fixing a lookup bug `slope[dest]` → `slope[flexSlot]`). **Verify Super's grid independently** (re-run his flex-pricer.mjs on council/super, check the ovrEq definition and the grid values) and determine whether his ovrEq definition is sound. **Do not treat Super's grid as Architect-blessed until Claude confirms it** — the Architect needs to confirm the ovrEq definition and do the pricing on the architect branch, or the council accepts Super's grid as the pricing. If you do this, file it as a P-294 follow-up (or as a review of P-294) with the command and output. Do not invent the formula — it is given in §1. Note: Super's grid covers existing REV 4 rules only; it does not cover the four proposed rules (RB→WR, TE→EDGE, TE→OT, DT→EDGE) because those are not in REV 4.
4. **File the review (if you are filing one).** `inbox/<UTC>-<seat>-P-294-review.md` with `VERDICT: ok | improved | rejected`. The review should state: whether the evidence reproduces (or that you relied on the four existing reviews), whether the proposal table matches the write-up, the theta pricing status (including the VL/Super discrepancy and your reconciliation), and what remains (the −2/−6/−12 combination is unmeasured — flag it).

### Second — watch for the flex build and verify it (P-294, continued)

When Claude (in a new session) builds the flex table (−2/−6/−12), verify it:
- The build step (per NOW.md): flex.json + flex.ts, flexcheck, re-pin hash, 7 tests.
- **Re-run the evidence on the NEW combination.** The −2/−6/−12 table was not measured. Run flexeval.mjs against it on fresh seeds and report the placement counts (encouraged off-role stars, through a −12 rule). Compare against the evidence table (870 for −2/−4/−10, 787 for all-12). Confirm the −4→−6 change does what the Owner intends (it should cut the −2/−4 leaks: C>OG1, OG>OT1, OLB>MIKE).
- Confirm flex.json and FLEX were changed ONLY as the Owner directed (−12 everywhere, −4s to −6) and the hash was re-pinned in MERGE-MANIFEST.md in the same commit (FLEX is a protected constant).
- **Caveat (from Claude's evidence):** the evidence counts placements, NOT wins or standings. The wins/standings effect of any table is still unmeasured. Say so in your review — do not claim the table is validated on wins.

### Third — the snapshot-bug question (P-286, the Architect's call)

- **The question:** Z.ai's Slice 1 README claims `draftBoard.ts` at `4ca9a071` has a corrupted line (`DESTain.slot]`) and "No build can compile it". MUSE's review found the pinned file is clean (line 49 is the correct `DEST[main.slot]`), the snapshot is byte-identical to it, the snapshot compiles, and the engine tests that import it pass 284/284. The stand-in is an unnecessary duplicate built on a false premise.
- **What the council should do:** Ask Claude (the Architect) to confirm whether a corrupted line exists anywhere in `draftBoard.ts` at `4ca9a071` or anywhere else in the snapshot, or whether the `DESTain.slot]` line was a misread/mistranscription. **Do not decide this for Claude** — it is his engine and his file. If he confirms the file is clean, the slice should drop the stand-in and use the snapshot's `draftBoard.ts` directly (or the stand-in should be justified on a real basis). If he finds a real corruption, the re-pin proceeds. File the answer as a P-286 follow-up (or as a review of P-286).
- **Why it matters:** the stand-in's premise determines whether Slice 2 (Team Select) uses the snapshot's `draftBoard.ts` or the stand-in. Z.ai's long prompt tells him to build Slice 2 against the snapshot's file (because the review found it clean) unless Claude confirms a real corruption. The council should resolve this question promptly so Slice 2 is not built on the wrong basis.

### Fourth — the review bottleneck (the two new reviews + the open ones)

- **P-307 (P1) — Review w86. MUSE's review is filed (VERDICT improved, `inbox/20261108-1345-muse-P-307-review.md`). Needs TWO more seats.** Read it, then verify independently. The most significant finding is the residual numbers (the README's 4.43:1 and ~3.9:1 do not match `residual-inks.json`'s 2.89 and 1.56/1.56/1.57). The batteries reproduce independently (84/0 and 25/0, zero page errors) and the P-285 review's most significant finding (R2-19 rating scale absent) is FIXED. The make-live step (making w86 the index.html) is an Owner/Beam decision, not a review finding.
- **P-286 (P1) — Review 67 Cakepanz Slice 1. MUSE's review is filed (VERDICT improved, `inbox/20261108-1345-muse-P-286-review.md`). Needs TWO more seats.** Read it, then verify independently. The most significant finding is the snapshot bug (it does not exist). The slice battery reproduces independently (18/0/10/3) and the snapshot is byte-identical to the pin. The engine tests pass 284/284 in substance but do not run as delivered (missing entry point + un-re-pointed imports).
- **P-285 (P1) — Review w85. MUSE's review is filed (VERDICT improved, `inbox/20261108-1611-muse-P-285-review.md`). Needs TWO more seats.** Read it, then verify independently. The most significant finding (R2-19 rating scale absent) is now FIXED in w86 — but the P-285 review itself still needs two more seats for REVIEWED ✓✓✓. The w86 review (P-307) is the successor; do not confuse the two.
- **P-288 (P1) — Review/verify Claude's guard passes + FITTED-label test + Q4 parameter diff.** The Q4 work landed (e04a7dcc). Run `tools/mathlab/param-diff.mjs` and the Colors test suite (290/290 now, including the MEASURED-display test). Verify the witness tolerance fix.
- **P-282 (P1) — Done by three seats but not REVIEWED ✓✓✓.** Beam's review is one of three needed and the item is largely superseded (the salary-table framing is dead per the Owner's Nov 8 model-first decision; the 0.544 revealed ratio remains a measured fact). Two more reviews needed.

### Fifth — verify Z.ai's fixes when they land (P-307 + P-286, continued)

Z.ai has a long prompt (`zai-long-prompt-w86-slice2-2026-11-08.md`) covering the w86 fixes, the Slice 1 fixes, and Slice 2 (Team Select). When his fixes land, verify them:
- **w86 fixes:** the residual numbers reconciled (traceable to a measurement), CHECKSUMS.txt corrected, the stage-4 comment corrected, the `accept-w86.js` count reconciled, the P-302 casing scoped, the FB legend + Guide scale law added or documented, the r2 HARNESS FAIL investigated. Re-run the wave battery after the fixes (it should still pass 25/0).
- **Slice 1 fixes:** the snapshot-bug question resolved (see §2, third), the stand-in dropped or re-justified, the engine test suite fixed (`npm run test:engine` works as delivered, 284/284), the two battery assertions tightened (the flex chips observed while the picker is open; every row's fields checked), `OnClock.svelte` removed or wired, the `npm ci` peer-dependency conflict fixed. Re-run the slice battery after the fixes (it should still pass 18/0/10/3, with the two tightened assertions now observing real values).
- **Slice 2 (Team Select):** when it lands, review it the same way (the snapshot, the components, the modes, the battery, the boundaries). The slice order is: Draft Board → Team Select → hydration → feed → shareables.

### Sixth — the rest (the full work list)

- **P-276 (P0, the headline) — the decisive N=1000 baseline repro.** Still in flight / not settled. Do not tune against the two N=100 clusters until pinned at N=1000. The P-263 cluster split is sampling noise until then.
- **P-289/P-293 (P1) — the model-first program.** P-293 is model-first weights finalization (the P-284 consensus table is superseded by P-293 under model-first). P-289 is verifying the model-first lab program.
- **P-292 (P1) — unblock the deno gap.** OR and VLOC are blocked on tooling with no deno.
- **P-291 (P1) — the tree-comparison harness.** Compare the Pre-Colors tree against the Colors tree (the 112-game hash discrepancy, the 284 vs 286 test count, the tsc file count).
- **P-295 (P1) — verify the CI gate N=100 once the workflows exist.** The CI gate is decided (N=100, run automatically each night). Whoever holds the Lab runs it manually until CI exists.
- **P-283 (P1) — the boot inefficiency.** Beam exposed it; the fix is in the boot-v3.6/boot-v3.7 persistence (the 00 Read First Project doc still carries old boot text — Claude reported he did not update it).
- **P-290 (P1) — reconciliation.** The 112-game hash (VL's hash 27a09e70… ≠ Claude's reported 68aecdac…), the 284 vs 286 test count, the tsc file count, the DS margin-histogram defect.
- **P-296 (P1) — the cutover readiness checklist.** The cutover trigger is decided (get a fully functioning Colors v1 first, then cut over). The council-home discussion closed unanimously at Option A (move the council whole into the fresh repo at cutover; relocation, not reorganization).
- **P-297 (P1) — the N1 exhibit help.**
- **P-298 (P1) — the page-background fix verification once Claude lands it.**
- **P-299..P-304 (P1) — the w86 follow-ups.** P-299 (R2-19 rating scale — FIXED in w86, verified), P-300 (linescore frame — FIXED), P-301 (badge specificity — FIXED), P-302 (guard casing — FIXED, scoped), P-303 (battery re-anchor — shipped as accept-w86.js), P-304 (stale doc counts — the w86 package carries no round-1 claims, but CHECKSUMS.txt has the unexplained second hash). P-303 needs Owner confirmation on SS-before-FS and Architect sign-off (the w79 round re-pointed it first; the Owner's confirmation is on record from w79).
- **P-305 (P1) — Google Fonts offline decision. DECIDED (2026-11-08): bundle the fonts in the git repo.** The Owner said "go ahead" — download the font files and commit them to the repo (gh-pages), and update the product to load them from the repo instead of from Google Fonts' servers. Z.ai can't access local files anyway, so the fonts go in the repo where he can reach them. The Z.ai long prompt has been updated with this decision (§2 item 8). w86 still loads Google Fonts externally until the fix lands.
- **P-306 (P1) — the playoff-qualifying run.** Still needed for the DCC presence + the SIM PLAYOFFS loss path. The MUSE seat must not do live browser checks unless the Owner asks.
- **P-308 (P1) — model FB, P, and CB4 in the game detail so they accumulate games played (veto (b) follow-up, Owner directive 2026-11-08).** The veto (b) measurement (MUSE, 3 full seasons, w86, 3,072 players) found gp is binary (0 or 17) and exactly three slots never make the 40% cut: FB, P, CB4 (each 100% miss, gp=0). The sim does not model them at all. The Owner's directive: **Punter MUST play every game** (non-negotiable — model punting so the punter is an active player). **FB and CB4 (Dime) SHOULD play some snaps (~10%), not 0%:** FBs in heavy sets near the end of games; Dimes in third-and-long and fourth-and-long scenarios. Claude should TRY to build the math for FB and CB4. If Claude doesn't feel like building the math, the Owner is open to REMOVING FB and Dime from the game entirely — but the preference is to try first. Punters are NOT removable. The 40% floor itself does no sample-hygiene work (any floor 1–17 gives the identical result) — the fix is in the game detail, not the floor. This is engine work for Claude (the Architect).
- **P-254..P-261, P-284 (P1/P2) — the open items.** P-284 (the salary-table method) is dead; it stays open until the Owner retires it. The BUILT rows location question (whether P-252/P-253/P-279/P-280 should move from `PRIORITIES-ARCHIVE.md` into the RETIRED section of `PRIORITIES.md`) is still open.

---

## §3 · The working rules (short version — the full text is in the council process docs)

- Take the top item you can do. Do not wait to be assigned. Do not assign work to a named agent.
- Verify before claiming (VERIFIED / REPORTED / INFERRED / UNKNOWN). Run the check; attach the command and output.
- Report blockers instead of going silent. If Claude's session is down and you cannot do an item that needs him, say so and take the next item.
- File your work in `inbox/<UTC>-<seat>-<ID>-<slug>.md` (first line `SPEAKER: <seat> | ROLE: <role> | TASK: <task> | DATE: <UTC>`, then `FOR: <P-ID>`). Reviews carry `VERDICT: ok | improved | rejected`. Push your branch (`council/<seat>` only, never force-push, add by path).
- Do not touch the product file (Architect only). Do not touch the protected constants. **Do not touch slots.ts, design.json, the refitted specs, or flex.json** unless the Owner has directed the specific change (the flex build is now directed: −12 everywhere, −4s to −6 — but only Claude builds it; the council verifies it, it does not write it).
- Do not decide for the Owner. The make-live step for w86 is still his. The flex direction beyond the table pick is still his. Label every recommendation as a recommendation until he locks it. (The switch is DEAD — the Owner said "new table, forget the old table." The level shift is ACCEPTED — no fallbacks, every position filled, no re-anchor. P-305 is DECIDED — bundle the fonts in the repo.)

---

## §4 · The state that does not change (for reference — do not re-litigate)

- **The Owner is KG.** Claude is the Architect and sole product implementer (on `architect/engine-and-seats`). Z.ai is the Executor / High Councillor for volume work. The MUSE seat is the High Councillor / advisor. Other seats: Beam, VL, VLOC, OR, DS, GLM, Flint, Pickle, Super, MIMO, Grok, GPT, Gemini, Q, Groq. **Groq is distinct from Grok.**
- **Framework:** Svelte 5 + Vite. **Data:** real player names/teams with non-EA ratings. **Ratings generation is the Owner's alone, later** — do not ask the council to generate ratings.
- **Brand:** 76 Pancakes (locked 2026-11-05). "20-0" stays only as a season record ("Can you go 20-0?"). Slogan pattern: "Can you go x?" per sport. Second sport: basketball, post-v1.1. License MIT. Public repo. Zero recurring costs. Offline is a hard requirement (tent-in-the-woods test; local-first, sync-on-reconnect). Cross-device sync auth: OAuth.
- **Calibration targets (locked, 2026-11-05):** for the **average skilled drafter**, **90% playoffs, ~35% Super Bowl appearance, 25% title**; going **20-0** about **1–2%** possible. "Skilled" = selects within the top 30 players ranked by priority (Wins/Priority, not raw OVR) in every draft round. The Lab must count P(20-0). The current anchor is N=300 skilled at 47% playoffs and 6% Super Bowl — the game is still too hard. **Do not tune against the two N=100 clusters until the protocol is pinned at N=1000.**
- **Parity ruling:** the Owner does not want a flat league; higher win-SD than real NFL, clear losers, at least 3 other top teams, at least two in the opposite conference and at least one in the user's conference. The 3.07 ± 0.35 band is a real-NFL reference, not the target.
- **v19 weights are dead as a Football Sim reference.** Do not cite, compare against, or measure the engine with v19; judge the engine by the Owner's doctrine — corner singularity and run-stopping matter — and current engine state.
- **Model-first (decided 2026-11-08):** the Nov 6 salary weights are dead/superseded. The measured/model value is the default display; the Owner Preset stays one click away. Either name "Engine Value" or "Model Value" is acceptable. **The specs ruling:** the engine's input determines the specs; NO refit to the measured curve and NO refit to any table. The specs and slot weights stay as the engine's input; the measured curve is only the display. The 23.7-point worst-slot gap is expected.
- **67 Cakepanz (decided 2026-11-08):** Z.ai builds a parallel Colors/UI track under his own name, **67 Cakepanz**, while Claude finishes math/engine, reviews Z.ai slices for contract conformance, and integrates. Engine stays single-sourced: Z.ai consumes Claude's engine as a frozen snapshot pinned at **`4ca9a071`** and never edits/forks it. Neither builder edits the other's tree. Product brand remains 76 Pancakes. The Owner granted Z.ai autonomy **inside 67 Cakepanz only**: execute what he thinks best there, innovate/brainstorm, build first and let review catch problems; the grant does not extend to the engine, brand, ratings, or Owner decisions.
- **The flex pick (decided 2026-11-08):** −2 / −6 / −12 (the −2 rules unchanged, all −4s to −6, all −10s to −12). The switch (model|owner) is DEAD (the Owner said "new table, forget the old table"). The theta formula is sent to Claude; the pricing is unblocked — but see the theta discrepancy in §2 (VL says blocked, Super computed a grid with his own tool).
- **The w79 calibration re-sweep (Z.ai's finding, confirmed by MUSE's review):** the w79 calibration identity (revealed 70→90 impact = weight × 0.00254) is a per-slot property of the win math and is lineup-independent. On w86 it reproduces 28/32 EXACT; the four exceptions are the documented FLAT curves (WR4, TE3, CB4, DL5 — the depth slots that feed no unit; measured delta 0). **No per-slot shift exists, so there is nothing to re-calibrate.** What the fuller lineups DO change is a LEVEL shift (the seeded draft's league mean rises from −9.9 to +1.0 win-math units; all 32 teams alike — a level shift, not a ranking change). **ACCEPTED by the Owner (2026-11-08):** no fallback players anymore with the expanded player pool — every position should be filled. The win totals being higher is a consequence of the correct fuller lineups, not a problem to fix. **No re-anchor of the win line.** FB/TE3 can be filled by many positions (via flex); there are no QB2s or QB3s in the player pool.
- **Standing boundaries:** **no live browser checks by the MUSE seat unless the Owner specifically asks** (set 2026-11-08); verify by reading files/code and running local tools. Football Sim playtest/QA must stay ≤50% of weekly usage. Amused experiment is paused. The four rejected features — "What If" alternate history, deterministic multiplayer, 20-0 roguelike mode, cross-era draft pools — are never to be re-pitched.
- **The Owner's standing directive:** the MUSE seat autonomously encourages/monitors council seats other than KG, Claude, and Z.ai — by invitation/acknowledgement only, never by assigning work to a named agent. Roles are hats, not titles; no chain may depend on a specific person.

---

## §5 · The files that matter (for this prompt)

- **The reviews:** `inbox/20261108-1345-muse-P-307-review.md` (w86, VERDICT improved) and `inbox/20261108-1345-muse-P-286-review.md` (Slice 1, VERDICT improved) — both on council/muse. The P-285 review: `inbox/20261108-1611-muse-P-285-review.md` (VERDICT improved).
- **The Z.ai long prompt:** `_agents/muse/deliveries/prompts-2026-11-05/zai-long-prompt-w86-slice2-2026-11-08.md` (the w86 fixes, the Slice 1 fixes, Slice 2 Team Select) — on council/muse.
- **The w86 delivery:** `Football-Sim-Z-post-blue-w86.html` (gh-pages root), `z-post-blue-wave86 w86/` (the package) — on gh-pages, commit 2c3e32a0.
- **The Slice 1 delivery:** `67-cakepanz/` on gh-pages (README.md, CHECKSUMS-slice1.txt, batteries/slice1.battery.mjs, src/App.svelte, src/engine/ (the snapshot), src/lib/valuation.ts, src/lib/view/boardVM.ts (the stand-in)) — on gh-pages, commit 2c3e32a0.
- **Claude's P-294 evidence:** `claude/rulings/2026-11-08-p294-flex-model-first-evidence.md`, `tools/mathlab/flexeval.mjs`, `results/flexeval-2026-11-08.json`, `tools/mathlab/flex-model-first-proposal-2026-11-08.json` — all on `architect/engine-and-seats`, tip 1e6372a.
- **The theta formula source:** `z-post-blue-docs-update-2026-11-08-brainstorm/_agents/zai/notes/governance-2026-11-08.md` (R-005 part 3, line 34) on gh-pages. The formula is also given in full in §1 above.
- **Claude's state:** `claude/NOW.md` on `architect/engine-and-seats` (tip 1e6372a). NEXT: the flex table is picked (−2/−6/−12; the switch is DEAD); then build (flex.json+flex.ts, flexcheck, re-pin, 7 tests); then `tools/seat-check.sh`. Claude timed out — no new commits since 1e6372a. The flex build, the theta pricing, and seat-check.sh are NOT done.
- **The previous long prompt (superseded by this one):** `_agents/muse/deliveries/prompts-2026-11-05/council-long-prompt-2026-11-08.md` (9469e411). The update prompt: `_agents/muse/deliveries/prompts-2026-11-05/council-update-prompt-claude-timeout-2026-11-08.md` (742787da).

Take the top item. Do it. File it. Push it. Tell the Owner what needs his approval.
