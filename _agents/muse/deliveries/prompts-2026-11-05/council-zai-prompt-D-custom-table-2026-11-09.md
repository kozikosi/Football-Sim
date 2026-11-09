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

## For Z.ai

**The flex table is being rebuilt.** Claude will rebuild it from D at θ=1.0 with the Owner's overrides, apply the WILL/C weight changes, recompute D, and replay the draft scan. The table WILL change (DT>EDGE to 6, 7 rules removed, many rules moving up/down, WILL/C weights up).

**What this means for you:**
- Do NOT hardcode flex penalty values in your UI. Read them from the engine's flex.json/flex.ts (or the snapshot you consume). The values are changing.
- Do NOT hardcode slot weights or measured weights. WILL and C are going up by 50, which will change the measured weights display (Engine Value). Read them from the engine.
- Wait for the new snapshot. You consume Claude's engine as a frozen snapshot (currently pinned at `4ca9a071`). Do not build flex-displaying UI against the old table. When Claude lands the rebuild, he will pin a new snapshot — build against that.
- The flex chips, draft board flex display, and any UI that shows "Flex x (-y)" will reflect the new table once you re-pin. No action needed from you until the new snapshot lands.
- The seven guard passes and P-308 are Claude's next work after this build. They do not affect your UI track.

**Keep building 67 Cakepanz — whatever is next.** Slice 1 landed. The Owner encourages you to keep going with the next slices in order: Slice 2 (Team Select) is next, then whatever follows it in the slice plan. Do not wait for the flex table rebuild to build the next slice — the slices are UI work, and the flex/weight values will flow in when you re-pin the snapshot. Build the next slice, ship it, and keep the momentum going. If a slice needs an engine value that has not landed yet, build it against the current snapshot and note what will change when you re-pin. The Owner wants 67 Cakepanz to keep moving while Claude finishes the math.

## For the council

**Verify Claude's rebuild when it lands.** This is the next verification task — filed as **P-311**. When Claude pushes the rebuilt table:
1. Check the table matches the Owner's decisions in the Claude prompt file (linked above) — every rule, every override, every removal, and the WILL/C weight changes. Verify flex.json = flex.ts rule by rule.
2. Check that D was recomputed AFTER the WILL/C bumps (the D values in `tools/mathlab/results/thetaprice-2026-11-09.md` are pre-bump and do NOT reflect WILL=200/C=200). The rebuilt table's D values must be recomputed with the new weights.
3. Verify the draft scan replay (flexeval on the rebuilt table, same seeds as P-310) and report whether the pick counts moved from the P-310 baseline (fresh 626/112, tune 1212).
4. Verify the test suite still passes (290/290 or the new count if tests were added/changed).
5. File as `inbox/<UTC>-<seat>-P-294-flex-rebuild-review.md` with VERDICT ok/improved.

**Design more testing around these rules.** The flex table is the heart of the draft — it deserves more testing than a single verification pass. Three work orders are filed in PRIORITIES.md:
- **P-311** (above): verify the rebuild.
- **P-312: Flex table edge-case playtest.** Draft with the rebuilt table (both 4-3 and 3-4) and hunt for weird flex picks or artifacts. Check: (a) the FB/SAM artifact — with FB defensive rules removed, does a 4-3 roster in the 3-4 still play a spare DT at FB and the natural FB at SAM? (b) Do any of the 30 rules at 0 produce free flexes that look wrong in the draft? (c) Does an EDGE ever flex to TE at -6, and does it look sensible? (d) Do the removals hold — can a FB still be placed at EDGE/DT/ILB/OLB (it should not be allowed)? (e) Any new artifact from the WILL/C weight changes (WILL and C are worth more now — do they get over-drafted or flexed oddly?). File findings as `inbox/<UTC>-<seat>-P-312-flex-edge-cases.md`.
- **P-313: Calibration re-run with new WILL/C weights.** WILL 150→200 and C 150→200 change the engine's positional values and the draft. Re-run the Lab calibration (skilled drafter, N=300, same seeds as the anchor) and report whether the playoff/SB/title rates moved from the anchor (47% playoffs, 6% SB at N=300). If they moved materially, flag it — the calibration targets (90/35/25) may need re-tuning. Do NOT tune; report only. File as `inbox/<UTC>-<seat>-P-313-calibration-rerun.md`.

**More testing ideas (not yet filed — propose them as P-items if you pick one up):**
- A flex-penalty unit test: for each of the 97 rules, place a player at the flex spot in a test lineup and confirm the penalty applied is exactly the table value (no off-by-one, no missing rule, no rule applying twice).
- A removal test: for each of the 7 removed rules, confirm the draft engine rejects that placement entirely (not just at 0 penalty — the move should be disallowed).
- A cross-formation battery: run the same draft seeds in 4-3 and 3-4 and diff the lineups — the flex table should not produce a formation-dependent artifact (like the FB/SAM one) that the Owner has not approved.
- A "no free lunch" sweep: for each of the 30 rules at 0, confirm the draft engine does not exploit the free flex to inflate a lineup's value beyond what the Owner intended (e.g., a heavy→light flex that gains wins for free).

**Remaining open work (from the earlier prompt, still open):**
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
