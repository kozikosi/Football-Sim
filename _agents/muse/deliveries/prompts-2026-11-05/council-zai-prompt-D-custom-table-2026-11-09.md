# Council + Z.ai — Owner's D/theta decisions and the custom flex table rebuild

Read this first: `git show origin/council/muse:_agents/START-HERE.md` (boot), then this prompt. This is a relay of Owner decisions, not a build order.

## Background (what happened)

P-309 theta rerun is done (three seats: VL, VLOC, Super). Claude answered (architect/engine-and-seats `3ed03627`): the working ovrEq (W, wins-lost) is WRONG as the basis for the table — it is one-sided and prices 0 for 42 of 104 rules. He proposed a displacement-aware correction (D): ovrEq = (X−Y)(1 − slope_a/slope_b), floored at 0. Under D (Y=70, X=90, θ=1.0): TE>EDGE 12.7, RB>WR 12.3, TE>OT 10.0, DT>EDGE 4.6.

The Owner has now decided: **adopt D at θ=1.0, round to the nearest tier (0/2/6/12), with Owner overrides.** The full custom table, with every rule, override, removal, and engine change, is in the Claude prompt: `_agents/muse/deliveries/prompts-2026-11-05/claude-reply-owner-picks-D-2026-11-09.md` (council/muse `913d025f`). Read that file for the complete list — this prompt does not repeat all 97 rules.

**The headline decisions:**
- DT>EDGE drops to 6. The other three proposed rules stay at 12.
- 7 rules removed entirely (FB>EDGE, FB>DT, FB>ILB, FB>OLB, CB>RB, DT>TE, EDGE>FS). EDGE>TE is -6, NOT removed.
- OLB>ILB and OLB>SS both set to 6. The WILL bump (150→200) justifies both — after the bump, D for each comes down to ~6.7, which rounds to 6.
- WILL 150 → 200 and C 150 → 200 (engine changes). SAM stays at 100.
- The Owner's rules, based on historical conversion rates from X to Y in college and the NFL, SUPERSEDE the theta rule. Theta is the rounding determination; the Owner's list is the reality check. Example: WR>TE gets -6 for lack of blocking ability despite D≈0.

## Z.ai Slice 2 — REVIEWED (MUSE, VERDICT improved)

Slice 2 (Team Select) landed on gh-pages as `0a9d7327`. MUSE reviewed it: **VERDICT improved** (`inbox/20261109-0445-muse-P-314-slice2-review.md`, filed as **P-314** — needs two more reviews).

**What verified:** the engine snapshot is byte-identical to the pin `4ca9a071` (52/52 files, diff clean — I checked it myself). Battery 26/0/10/3, all 8 new Team Select laws PASS through the real user flow. TeamSelect.svelte reads engine-derived data only. The App.svelte flow is correct (screen state, `START { seed, userTeam: chosen }`, valuation lock at START). The mode lock fires at START — one assertion watches it free on Team Select and disabled on the board. Boundaries respected.

**Findings for Z.ai:**
1. The flex chip count (39 → 44) is state-dependent (chosen team + random seed). The battery correctly asserts the observation, not the count — but the README's "44 chips seen" reads like a fixed number. Note in the README that the count varies by run and the law is the observation.
2. The gone-odds tooltip + my-needs sticky row are carried to Slice 3 — good, they are not lost. **Build Slice 3 next** (P-316): the board chrome pass, including those two innovations.
3. The pick-position choice is NOT in Slice 2 — that is an open Owner decision (should Team Select offer a pick-slot choice, or does the seed stay app-controlled?). No action until the Owner decides.

## For Z.ai (continued)

**Keep building 67 Cakepanz — whatever is next.** Slice 2 landed. The Owner encourages you to keep going with the next slices in order: **Slice 3 (the board chrome pass — gone-odds tooltip + my-needs sticky row) is next** (P-316), then whatever follows it in the slice plan. Do not wait for the flex table rebuild to build the next slice — the slices are UI work, and the flex/weight values will flow in when you re-pin the snapshot. Build the next slice, ship it, and keep the momentum going. If a slice needs an engine value that has not landed yet, build it against the current snapshot and note what will change when you re-pin. The Owner wants 67 Cakepanz to keep moving while Claude finishes the math.

## For the council

**Verify Claude's rebuild when it lands.** This is the next verification task — filed as **P-311**. **Note: Claude timed out while trying to implement the rebuild (Owner report, 2026-11-09). The rebuild has NOT landed — his latest commit is still `3ed03627` (P-309 theta pricing).** When he retries and it lands:
1. Check the table matches the Owner's decisions in the Claude prompt file (linked above) — every rule, every override, every removal, and the WILL/C weight changes. Verify flex.json = flex.ts rule by rule.
2. Check that D was recomputed AFTER the WILL/C bumps (the D values in `tools/mathlab/results/thetaprice-2026-11-09.md` are pre-bump and do NOT reflect WILL=200/C=200). The rebuilt table's D values must be recomputed with the new weights.
3. Verify the draft scan replay (flexeval on the rebuilt table, same seeds as P-310) and report whether the pick counts moved from the P-310 baseline (fresh 626/112, tune 1212).
4. Verify the test suite still passes (290/290 or the new count if tests were added/changed).
5. File as `inbox/<UTC>-<seat>-P-294-flex-rebuild-review.md` with VERDICT ok/improved.

**Run the existing flex tools on the rebuilt table.** Two tools are available to test the rebuild right now — use them, do not eyeball the table:
- **`tools/mathlab/flexcheck.mjs`** — validates flex.json: every penalty is 0/2/6/12, every role and destination is known, every role has a row, QB flexes only to FS. It reports the tier counts and the one-way asymmetries. Run it on the rebuilt flex.json and confirm FLEXCHECK OK. (It will also catch a rebuilt table that accidentally reintroduces a removed rule or a wrong tier.)
- **`tools/mathlab/flexeval.mjs`** — replays the draft scan and reports pick counts. Run it on the rebuilt table (same seeds as P-310) and compare to the P-310 baseline.

**flexrebuild.mjs does NOT exist — build it.** There is no script that rebuilds the flex table from D + the Owner's overrides deterministically. Claude's manual rebuild timed out, which is exactly the failure a script would prevent. **Proposed work order (to be filed as P-317 when there is room in PRIORITIES.md — the file is at the push ceiling):** build `tools/mathlab/flexrebuild.mjs` — a script that takes the D values (recomputed post-bump), the rounding rule (θ=1.0, cutoffs 1/4/9), and the Owner's override list as input, and generates flex.json + flex.ts deterministically. The script should be runnable by any seat in a scratch tree, and its output should be diffable against Claude's rebuilt table (if the script and Claude disagree, that is a finding, not a tie to break silently). Whoever builds it files the script and a run showing it reproduces the Owner's table. This makes the rebuild reproducible, testable, and re-runnable whenever the Owner changes a rule — instead of a manual edit that can time out.

**Design more testing around these rules.** The flex table is the heart of the draft — it deserves more testing than a single verification pass. Three work orders are filed in PRIORITIES.md:
- **P-311** (above): verify the rebuild.
- **P-312: Flex table edge-case playtest.** Draft with the rebuilt table (both 4-3 and 3-4) and hunt for weird flex picks or artifacts. Check: (a) the FB/SAM artifact — with FB defensive rules removed, does a 4-3 roster in the 3-4 still play a spare DT at FB and the natural FB at SAM? (b) Do any of the 30 rules at 0 produce free flexes that look wrong in the draft? (c) Does an EDGE ever flex to TE at -6, and does it look sensible? (d) Do the removals hold — can a FB still be placed at EDGE/DT/ILB/OLB (it should not be allowed)? (e) Any new artifact from the WILL/C weight changes (WILL and C are worth more now — do they get over-drafted or flexed oddly?). File findings as `inbox/<UTC>-<seat>-P-312-flex-edge-cases.md`.
- **P-313: Calibration re-run with new WILL/C weights.** WILL 150→200 and C 150→200 change the engine's positional values and the draft. Re-run the Lab calibration (skilled drafter, N=300, same seeds as the anchor) and report whether the playoff/SB/title rates moved from the anchor (47% playoffs, 6% SB at N=300). If they moved materially, flag it — the calibration targets (90/35/25) may need re-tuning. Do NOT tune; report only. File as `inbox/<UTC>-<seat>-P-313-calibration-rerun.md`.

**More testing ideas (not yet filed — propose them as P-items if you pick one up):**
- A flex-penalty unit test: for each of the 97 rules, place a player at the flex spot in a test lineup and confirm the penalty applied is exactly the table value (no off-by-one, no missing rule, no rule applying twice).
- A removal test: for each of the 7 removed rules, confirm the draft engine rejects that placement entirely (not just at 0 penalty — the move should be disallowed).
- A cross-formation battery: run the same draft seeds in 4-3 and 3-4 and diff the lineups — the flex table should not produce a formation-dependent artifact (like the FB/SAM one) that the Owner has not approved.
- A "no free lunch" sweep: for each of the 30 rules at 0, confirm the draft engine does not exploit the free flex to inflate a lineup's value beyond what the Owner intended (e.g., a heavy→light flex that gains wins for free).

**Remaining open work:**
- **P-314: Review Slice 2** (this review — MUSE improved; needs two more reviews).
- **P-315: Slice 2 deeper verification** — draft several rounds as a chosen team (try more than one team: an early-pick team and a late-pick team) and confirm the chosen team is on the clock at its slots, its picks land on its roster, the CPU teams pick on correctly around it, and the mode lock holds across the whole draft. The P-314 review verified the header name only; P-315 proves it end-to-end.
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
