# Council + Z.ai — Owner's D/theta decisions and the custom flex table rebuild

Read this first: `git show origin/council/muse:_agents/START-HERE.md` (boot), then this prompt. This is a relay of Owner decisions, not a build order.

## Background (what happened)

P-309 theta rerun is done (three seats: VL, VLOC, Super). Claude answered (architect/engine-and-seats `3ed03627`): the working ovrEq (W, wins-lost) is WRONG as the basis for the table — it is one-sided and prices 0 for 42 of 104 rules. He proposed a displacement-aware correction (D): ovrEq = (X−Y)(1 − slope_a/slope_b), floored at 0. Under D (Y=70, X=90, θ=1.0): TE>EDGE 12.7, RB>WR 12.3, TE>OT 10.0, DT>EDGE 4.6.

The Owner has now decided: **adopt D at θ=1.0, round to the nearest tier (0/2/6/12), with Owner overrides.** The full custom table, with every rule, override, removal, and engine change, is in the Claude prompt: `_agents/muse/deliveries/prompts-2026-11-05/claude-reply-owner-picks-D-2026-11-09.md` (council/muse `913d025f`). Read that file for the complete list — this prompt does not repeat all 97 rules.

**CORRECTION (2026-11-09, from Pickle's flexrebuild work): the WILL/C weight bump does NOT change D.** Pickle built `tools/mathlab/flexrebuild.mjs` and found that the WILL/C bump (150→200) moves D by **0**, because D is computed from the engine's slope (`slotWins20/20`), and `slotWins20` is measured from the matchup model (`RATING_SPECS` in `ratings.ts`) — it does not use `SLOTS[].weight`. MUSE verified this in the engine code (`value.ts` `slotWins` → `teamRatings` → `wavg(spots, RATING_SPECS)`; no `SLOTS[].weight` in that path). **This corrects what MUSE told the Owner earlier:** the WILL bump does NOT bring D for OLB>SS/OLB>ILB down to ~6.7. That ~6.7 holds only under a *weight-ratio* slope (slope proportional to the slot weight), not the engine's actual measured slope. Under the engine's slope, D stays at 9.99 (OLB>SS) and 10.05 (OLB>ILB), which round to 12. **The -6 for OLB>SS and OLB>ILB therefore stand as pure Owner overrides** (the Owner's rules supersede theta — which is the Owner's stated principle), not as math justified by the bump. The WILL/C bump still matters: `SLOTS[].weight` is the engine's input for lineup and draft, so raising WILL/C changes the draft (WILL/C players are valued more, drafted earlier) and the lineup — and the **Wins values on the board will change** for WILL/C players. But it does **not** change D, and it does **not** change the measured weights display (Engine Value mode, which is derived from `slotWins20`). **For Z.ai:** re-pin the snapshot to get the new Wins values when the bump lands, and keep reading values from the engine rather than hardcoding them. Do not expect the measured-weights display itself to move.

## Z.ai Slice 2 — REVIEWED (MUSE, VERDICT improved)

Slice 2 (Team Select) landed on gh-pages as `0a9d7327`. MUSE reviewed it: **VERDICT improved** (`inbox/20261109-0445-muse-P-314-slice2-review.md`, filed as **P-314** — Super also reviewed it improved and concurs; needs one more review for REVIEWED).

**What verified:** the engine snapshot is byte-identical to the pin `4ca9a071` (52/52 files, diff clean — I checked it myself). Battery 26/0/10/3, all 8 new Team Select laws PASS through the real user flow. TeamSelect.svelte reads engine-derived data only. The App.svelte flow is correct (screen state, `START { seed, userTeam: chosen }`, valuation lock at START). The mode lock fires at START — one assertion watches it free on Team Select and disabled on the board. Boundaries respected.

**Findings for Z.ai:**
1. The flex chip count (39 → 44) is state-dependent (chosen team + random seed). The battery correctly asserts the observation, not the count — but the README's "44 chips seen" reads like a fixed number. Note in the README that the count varies by run and the law is the observation.
2. The gone-odds tooltip + my-needs sticky row are carried to Slice 3 — good, they are not lost. **Build Slice 3 next** (P-316): the board chrome pass, including those two innovations.
3. The pick-position choice is NOT in Slice 2 — the Owner has now decided (P-317, required revision): Team Select keeps its current look and adds a draft position selector (team + slot 1-32). The Architect adds slot support to the store first, then Z.ai revises Slice 2 to add the picker and wire it. Slice 2 is not accepted until the selector works end-to-end.

## For Z.ai (continued)

**Keep building 67 Cakepanz — whatever is next.** Slice 2 landed. The Owner encourages you to keep going with the next slices in order: **Slice 3 (the board chrome pass — gone-odds tooltip + my-needs sticky row) is next** (P-316), then whatever follows it in the slice plan. Do not wait for the flex table rebuild to build the next slice — the slices are UI work, and the flex/weight values will flow in when you re-pin the snapshot. Build the next slice, ship it, and keep the momentum going. If a slice needs an engine value that has not landed yet, build it against the current snapshot and note what will change when you re-pin. The Owner wants 67 Cakepanz to keep moving while Claude finishes the math.

## Owner decision: slotWins20 drives the board; SLOTS[].weight leaves the loop (2026-11-09)

**The Owner decides: SLOTS[].weight is removed from the loop entirely.** The draft board, the lineup, and every user-facing value must come from the ENGINE (slotWins20), not from the SLOTS[].weight input table. The user sees values from the engine. SLOTS[].weight may be kept in the code as an internal reference (for testing, as a reference to NFL average salaries), but it must not drive any user-facing value.

**The WILL/C "50 bump" means: change the engine math so slotWins20 understands WILL and C are valued more.** It is NOT a change to SLOTS[].weight. Claude (Architect) owns the engine part — see the separate Claude prompt (`_agents/muse/deliveries/prompts-2026-11-05/claude-slotwins20-engine-2026-11-09.md`). He decides how the engine math changes; the intent is that slotWins20 for WILL and C goes up.

**For Z.ai (UI/UX):** the draft board and the site show engine values. The Wins on the board come from slotWins20 (via the snapshot, once Claude lands the engine change — re-pin then). **Display rule (Owner): integers everywhere on the board and the site, except Wins and Priority, which are allowed one decimal point.** So OVR and every other number is an integer; Wins may show e.g. 12.3 and Priority may show e.g. 45.6. Apply this to the board and to every screen that shows these values. Do not hardcode the values — read them from the engine.

**For the council:** verify both parts when they land (P-320). (1) Claude's engine change: confirm slotWins20 for WILL and C went up, confirm SLOTS[].weight no longer drives any user-facing value (the draft valuation, lineup valuation, and board Wins all come from slotWins20), confirm the test suite passes and the draft scan was replayed. (2) Z.ai's UI change: confirm the board shows engine values and the display rule holds (integers except Wins/Priority one decimal). File as separate reviews.

**For the council — P-321 (improved):** the slotWins20 baseline (70→90) is under evaluation for implicit bias. The MUSE seat's proposal is in `_agents/muse/deliveries/slotwins20-measurement-improvement-2026-11-09.md` — read it first. The short version: **yes, evaluate every position separately, but in the same function.** One shared function, parameterized by position, reading the pool. Each position centers on its own pool average (QB 71.8, TE 70.5, WILL 72.3, C 71.4, K 78.3; overall mean 73.8). Measure a LOCAL slope at center±5, not a wide 70→90 secant; hold everything else at position-specific averages, not a flat 80. Report the non-linearity check and a value-over-replacement variant for the board. The evaluation must show old vs new side by side for every slot, how D and the measured weights change, and a recommendation with the numbers as evidence. The Architect decides the implementation. Linked to P-318: the WILL/C bump is evaluated against the NEW measurement once this lands.

**Why there is a "20" in slotWins20:** it is the wins gained over a 20-OVR spread — slotWins20 = slotWins(90) − slotWins(70). The "20" is 90 − 70. It measures how much a slot is worth when you raise it 20 OVR points (from 70 to 90), everything else at 80.

## Innovate — a standing encouragement (Owner rule)

This prompt tells you what to build or verify, not how to think. **The Owner wants you to innovate, brainstorm, improve, and create new ideas — always, in every prompt, not just when asked.** If you see a better way to do the work, a feature the Owner did not ask for but would love, a simplification, a new test, a new tool, or an idea that makes the product better — propose it, prototype it, or build it (within your lane and your boundaries). Brainstorm freely. Do not wait for permission to think. File innovations as `IDEA:` entries in your inbox file or in your bulletin entry, with what it is, why it helps, and what it would take. The Owner reads those. A prompt that only gets executed is a missed opportunity — bring something new to it.

## New seats — evaluation task (Iceman, Inkling, Crouton, CK)

The Owner is adding four new seats (Iceman, Inkling, Crouton, CK). Their first task is an evaluation: **independently review Z.ai Slice 2 (P-314)**. This is the same review task the other seats do, so the Owner can compare their work directly.

**The task:** Read the Slice 2 commit (`0a9d7327` on gh-pages), verify the claims yourself, and file your own review as `inbox/<UTC>-<seat>-P-314-slice2-review.md` with VERDICT ok / improved / rejected. Check: (1) the engine snapshot is byte-identical to the pin `4ca9a071` (compare the 52 files yourself — do not take the CHECKSUMS file's word for it); (2) the battery result (26/0/10/3 — read the battery JSON and the battery source, confirm the 8 new Team Select laws actually run through the real user flow); (3) the Team Select flow in the code (does the choice actually flow into the board as the chosen team?); (4) the mode lock (free pre-draft, locked at START); (5) the boundaries (no ratings generation, no engine edits, brand unchanged). Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN, with the command and output for anything you verified.

**Do NOT read MUSE's P-314 review before filing yours.** It is already in the inbox (`inbox/20261109-0445-muse-P-314-slice2-review.md`). The Owner wants an independent comparison — your own verdict, your own checks, your own findings. After you file, you may read it and note where you agree or differ (as a follow-up, not as a replacement for your own review).

**This is also your first chance to innovate** (see the section above). If the review sparks an idea — a better test, a missing check, a feature — file it as an `IDEA:` in your review or bulletin entry.

## For the council

**Verify Claude's rebuild when it lands.** This is the next verification task — filed as **P-311**. **Note: Claude timed out while trying to implement the rebuild (Owner report, 2026-11-09). The rebuild has NOT landed — his latest commit is still `3ed03627` (P-309 theta pricing).** When he retries and it lands:
1. Check the table matches the Owner's decisions in the Claude prompt file (linked above) — every rule, every override, every removal, and the WILL/C weight changes. Verify flex.json = flex.ts rule by rule.
2. Check that D was recomputed AFTER the WILL/C bumps (the D values in `tools/mathlab/results/thetaprice-2026-11-09.md` are pre-bump and do NOT reflect WILL=200/C=200). The rebuilt table's D values must be recomputed with the new weights.
3. Verify the draft scan replay (flexeval on the rebuilt table, same seeds as P-310) and report whether the pick counts moved from the P-310 baseline (fresh 626/112, tune 1212).
4. Verify the test suite still passes (290/290 or the new count if tests were added/changed).
5. File as `inbox/<UTC>-<seat>-P-294-flex-rebuild-review.md` with VERDICT ok/improved.

**flexrebuild.mjs NOW EXISTS — two seats built it (Pickle and VL).** Pickle built `tools/mathlab/flexrebuild.mjs` (D → nearest tier → Owner removals/overrides → flex.json + flex.ts + md report; `--selftest`, `--check`, `--write`, `--slope=wins|weight`) plus `flexverify.mjs` (the P-311 verifier) and `flex-owner-2026-11-09.json` (the Owner's 7 removals + 53 overrides + bumps as data). VL built a flexrebuild too and updated `flexcheck.mjs` for the 0/2/6/12 tiers. **The council should reconcile them:** do Pickle's and VL's tools produce the same flex.json/flex.ts? If they disagree, why? (Note: VL's tool assumes post-bump D values will differ; Pickle's finding says the bump moves D by 0 — the reconciliation must settle which slope definition the rebuild uses.) When Claude's rebuild lands, `flexrebuild.mjs --check=…` is the review. **Run the existing flex tools on the rebuilt table:** `flexcheck.mjs` (validates tiers/roles/rows) and `flexeval.mjs` (draft scan) — use them, do not eyeball the table.

**Design more testing around these rules.** The flex table is the heart of the draft — it deserves more testing than a single verification pass. Three work orders are filed in PRIORITIES.md:
- **P-311** (above): verify the rebuild.
- **P-312: Flex table edge-case playtest.** Draft with the rebuilt table (both 4-3 and 3-4) and hunt for weird flex picks or artifacts. Check: (a) the FB/SAM artifact — with FB defensive rules removed, does a 4-3 roster in the 3-4 still play a spare DT at FB and the natural FB at SAM? (b) Do any of the 30 rules at 0 produce free flexes that look wrong in the draft? (c) Does an EDGE ever flex to TE at -6, and does it look sensible? (d) Do the removals hold — can a FB still be placed at EDGE/DT/ILB/OLB (it should not be allowed)? (e) Any new artifact from the WILL/C weight changes (WILL and C are worth more now — do they get over-drafted or flexed oddly?). File findings as `inbox/<UTC>-<seat>-P-312-flex-edge-cases.md`.
- **P-313: Calibration re-run with new WILL/C weights.** WILL 150→200 and C 150→200 change the engine's positional values and the draft. Re-run the Lab calibration (skilled drafter, N=300, same seeds as the anchor) and report whether the playoff/SB/title rates moved from the anchor (47% playoffs, 6% SB at N=300). If they moved materially, flag it — the calibration targets (90/35/25) may need re-tuning. Do NOT tune; report only. File as `inbox/<UTC>-<seat>-P-313-calibration-rerun.md`.

**More testing ideas (not yet filed — propose them as P-items if you pick one up):**
- A flex-penalty unit test: for each of the 97 rules, place a player at the flex spot in a test lineup and confirm the penalty applied is exactly the table value (no off-by-one, no missing rule, no rule applying twice).
- A removal test: for each of the 7 removed rules, confirm the draft engine rejects that placement entirely (not just at 0 penalty — the move should be disallowed).
- A cross-formation battery: run the same draft seeds in 4-3 and 3-4 and diff the lineups — the flex table should not produce a formation-dependent artifact (like the FB/SAM one) that the Owner has not approved.
- A "no free lunch" sweep: for each of the 30 rules at 0, confirm the draft engine does not exploit the free flex to inflate a lineup's value beyond what the Owner intended (e.g., a heavy→light flex that gains wins for free).

**New task for the crowded seats (P-315) — do this when the best seats are unavailable.** The Slice 2 review (P-314) already has 2 reviews (MUSE + Super) and the four new seats are doing it as their evaluation task, so it is crowded. **The seats should take P-315 instead: Slice 2 deeper verification.** Draft several rounds as a chosen team and confirm the chosen team is on the clock at its slots, its picks land on its roster, the CPU teams pick on correctly around it, and the mode lock holds across the whole draft. It is parallelizable — each seat tries different teams (an early-pick team and a late-pick team) — and it does not need the top reviewers; it needs hands-on testing. File as `inbox/<UTC>-<seat>-P-315-slice2-deeper.md` with the team(s) tried and the result. **Also open:** reconcile Pickle's and VL's flexrebuild tools (do they produce the same table? settle the slope definition — Pickle says the WILL/C bump moves D by 0, VL's tool assumes post-bump D differs).

**Remaining open work:**
- **P-314: Review Slice 2** (MUSE improved + Super improved; needs one more review for REVIEWED).
- **P-315: Slice 2 deeper verification** (the new task above — take this instead of piling onto P-314).
- **P-316: Z.ai Slice 3** — hydration + the board chrome pass (gone-odds tooltip + my-needs sticky row). Encourage Z.ai to build it next — it does not depend on the Slice 2 draft-position revision (P-317), which is blocked on the Architect's store change; Slice 3 touches the board and app hydration, not Team Select. Review it the same way as Slice 1/2 when it lands.
- **P-317: REVISE Slice 2 — add the draft position selector to Team Select (Owner ruling 2026-11-09).** The Owner rules Slice 2 is NOT accepted as-is — it must be changed: the user picks BOTH their team AND their draft position (slot 1-32) on Team Select, which keeps its current look. This is a REQUIRED REVISION to Slice 2, not a future feature. Today the slot is fixed by the team index (the draft order is the default snake in `draft.ts`, the store never passes a custom order, and `SaveRecord` has no slot field). To revise: (1) the Architect adds slot support to the store — accept a slot in START, build a custom order (user's team at the chosen slot, the other 31 teams filling the rest), pass it to `newDraft`, and include the slot in `SaveRecord` so a restore replays the same order; (2) Z.ai revises Slice 2 to add the slot picker to Team Select (same screen, same look) and passes the chosen slot through START. Slice 2 is not accepted until the selector works end-to-end. The council should raise the store change with the Architect first — it is the prerequisite for Z.ai's revision. File the Architect change and the Z.ai revision as separate reviews.
- flexengine.js check (status UNKNOWN — needs playwright + the frozen Pre-Colors file).
- P-276 N=1000 baseline repro (decisive; VL's repro still in flight, OR/vloc blocked on deno).
- P-288 needs 2 more reviews (the guard passes, once Claude does them).
- P-308 (FB/punter/CB4 design — Claude has not started it; it follows the Owner's direction once he picks one).

## House rules (reminder)

- Never assign work to a named agent. Work comes from `_agents/PRIORITIES.md`; take the top item you can do, or leave it.
- Only the Architect builds the product file and the engine. Do not touch them.
- Label everything: VERIFIED / REPORTED / INFERRED / UNKNOWN.
- File reviews in `inbox/<UTC>-<seat>-<ID>-<slug>.md`. Three different seats' ok/improved reviews = REVIEWED.
- Do not hardcode a wave number. Find the latest wave file by listing.
