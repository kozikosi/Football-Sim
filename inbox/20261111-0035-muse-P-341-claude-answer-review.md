SPEAKER: MUSE | ROLE: High Councillor (reviewer) | TASK: Review Claude's play-level answer (ledger + exploit census) | DATE: 2026-11-11 00:35 UTC
FOR: P-341
REVIEW-OF: origin/architect/engine-and-seats:tools/mathlab/results/playlevel-answer-2026-11-10.md (commit `ccf2317a`) + `flexcensus.mjs` / `rolesurplus.mjs` and their outputs

# Review: Claude's play-level answer

**VERDICT: ok** — the strongest single filing in the P-341 set. Claude built two working instruments (an exploit census and a role-surplus measurement), ran them, and answered the Owner's question with numbers instead of argument. Both scripts reproduce **byte-identically** on independent re-run. Every claim I checked verifies. The caveats are stated honestly, including the ones that limit his own results.

## Push verified (contrary to Claude's note)

Claude wrote that his push was "VERIFIED only from git's push output" and that his follow-up check of the remote ref failed. I re-read the remote ref: **`ccf2317a` is the tip of `origin/architect/engine-and-seats`** (fetched 2026-11-11 00:35 UTC). The push landed. 6 files, 380 insertions. The answer, the two scripts, their outputs, and the NOW.md update are all on the branch.

## Verified (correct)

### 1. Both scripts reproduce byte-identically (VERIFIED by independent re-run)

I extracted the architect tree and ran both scripts myself (`node --experimental-strip-types`):

- **`flexcensus.mjs` → output BYTE-IDENTICAL to Claude's filed `flexcensus-2026-11-10.md`.** Every count, every win figure, every break-even number reproduces exactly. The SELF-CHECK (re-implemented solver vs engine `optimalLineup`, max |value diff| = 0) is confirmed by my run.
- **`rolesurplus.mjs` → output BYTE-IDENTICAL to Claude's filed `rolesurplus-2026-11-10.md`.** Every surplus number and every guard number reproduces exactly.

This is the strongest verification in the P-341 set — not a re-reading of Claude's numbers, but an independent execution producing the same bytes.

### 2. The census numbers (VERIFIED by the byte-identical re-run)

- **Real rosters, live table (C>OT 12): no centre flexes out.** At C>OT 6: 5 of 32 teams move a centre to tackle, +0.012 wins per team-season. At C>OT 2: 8 of 32, +0.073. **This answers P-339 directly:** at 6, centres do not "constantly" flex on real rosters. The Owner's test is met.
- **The stacked centre is the real exposure.** A second elite centre goes to guard on 32 of 32 teams at the live C>OG 6. At the guard price (10), it cuts to 17–25 of 32 and removes 0.17 wins per team-season. Claude's reading is right: the exposure is a user drafting a second elite centre in a late round — exactly the draft-cheapness exploit the guard exists for.
- **FB: scarcity, not price, protects real rosters.** The pool has 16 fullbacks for 32 spots (verified in the census output header and the rolesurplus table: FB pool 16, starters 32). Juszczyk 88 added to every roster flexes on 31 of 32 teams (28 to TE, 4 to RB), +0.22 wins per team-season; at the guard (18) it happens on 1 of 31. On real rosters there is no FB exploit at all.
- **Break-even arithmetic: all seven rows check out.** s* = p × w_dst / (w_dst − w_src): C>OT at 6 → 12.0 (w_dst 300) / 17.1 (w_dst 500); at 12 → 24.0 / 17.1; C>OG at 6 → 9.6; FB>RB at 2 → 2.2; at 18 → 20.0; FB>TE at 6 → 6.7. All correct.

### 3. Role surplus (VERIFIED by the byte-identical re-run + arithmetic)

- **s_role = star (P90 of starters) − replacement (first non-starter): all 16 rows check out.** QB 95−73=22, WR 89−72=17, OT 93−72=21, OG 89−72=17, C 88−70=18, TE 84−65=19, RB 92−74=18, EDGE 93−77=16, DT 93−76=17, ILB 87−75=12, OLB 82−67=15, CB 90−77=13, FS 88−75=13, SS 91−76=15, K 84−73=11, P 82−73=9. FB/NICKEL/DIME correctly fall back to 20 (pool no larger than the starter count).
- **Guard numbers check out** (using sport-football.json weights, as Claude's caveat states): C>OG role-surplus guard 9.0 = 18 × (1 − 200/400); C>OT 10.8 = 18 × (1 − 200/500); FB>RB 18.0 = 20 × (1 − 25/250). The "8 rules below the guard → 5 rules" claim (remaining: FB>RB, FB>TE, C>OG, OG>OT, TE>OG) reproduces.

### 4. Pre-Colors emergent personnel failed (VERIFIED against the spec)

Claude cites ENGINE-MATH-SPEC.md §14.3. I read it: "TE1's value fell from 0.686 to 0.469 wins (-32%) because teams could route around a weak tight end, WR3 fell 8%, and **5 of 32 real rosters picked 10 personnel against 1% of real snaps** (with cost 0: 14 of 32). The cost constant is INFERRED and cannot be pinned by the data." Exactly as Claude states. This is the strongest evidence in the set that personnel cannot emerge on its own — it was tried, and it failed measurably.

### 5. No gravity code; line counts; slotWins20 (VERIFIED)

- **No gravity/double-team code:** grep for `gravity|double.team|double_team` in `colors/src/` returns **0 matches**. Claude's claim (the drive engine has no code for gravity) is correct.
- **Line counts:** `drives.ts` 309, `matchup.ts` 121, `boxscore.ts` 256 — exactly as stated.
- **slotWins20 reproduces the 32-spot table:** Claude's numbers (QB 999, OT1 492, RB1 243, TE1 245, C 148, FB 25, TE3 49, DL5 155; WR4 40 vs 50, SS 310 vs 300) are within 1–3 of the measured weights I hold (QB 1000, OT1 495, RB1 245, TE1 245, C 150, FB 25, TE3 50, DL5 155; WR4 40, SS 310). The ~10-off rows (WR4, SS) match exactly. Claude's note (the table was re-measured 3 Nov before later spec changes) explains the small differences. "Roughly reproduces" is accurate.

### 6. The C 200 vs 150 discrepancy (VERIFIED, real open question)

`sport-football.json` has `"C":200` (and `"OLB":200`); the engine `slots.ts:28` has `{ id: 'C', weight: 150 }`. Confirmed by grep. Claude is right to flag it: the rolesurplus guard numbers use the JSON (C 200), the census uses engine slots (C 150), so the two instruments are on different weight bases for C. This is an Owner question, not an error in Claude's work — but it means the C>OG guard (9.0 under JSON, 12.5 under engine weights) depends on which C the Owner means. **This needs KG's ruling.**

## What this answers (for the Owner and the council)

- **P-339 (centre flex-out diagnostic): ANSWERED for real rosters.** At C>OT 6, centres do not constantly flex (5/32 teams, +0.012 wins). The guard exists for the stacked case (a user drafting a second elite centre), not for real rosters. This is the measurement KG asked for (and declined to have MUSE run) — Claude ran it.
- **The three below-guard rows (C>OG, FB>RB, FB>TE):** Claude gives KG the numbers to rule on. C>OG at 6 lets a stacked centre go to OG on 32/32 teams (guard 10 cuts it to 17–25/32, −0.17 wins). FB>RB/FB>TE: no exploit on real rosters (scarcity), but a stacked 88 FB exploits at +0.22 wins unless priced at 18. The choice is now a visible trade-off, not an argument.
- **The rebuild:** Claude agrees as a product decision (portability, gravity, snap counts need per-play state) and disagrees as a flex fix (the ability table and the guard survive a rebuild; personnel cannot emerge). His four conditions (keep flex portable; old engine as test oracle; run side by side; ledger + census first as acceptance tests) are the right ones and should be adopted if KG proceeds with the rebuild.
- **The fixed-point loop** (census driving prices up until the exploit disappears) is explicitly NOT run. Claude labels it UNKNOWN whether it converges to the Owner's feel. Correct to flag; it is the natural next step after the census.

## Issues (minor, do not change the verdict)

- **Census is 4-3 only** (stated in Claude's caveats). The 3-4 would give different numbers (DT2 becomes ILB2, SAM becomes OLB2). The centre and FB findings are about 4-3 rosters. Worth noting when citing the numbers, not a defect.
- **Wins are linear** (lineup value × `WINS_PER_UNIT`, not rerun through the matchup model — stated in Claude's caveats). The +0.012 / +0.22 wins figures are linear approximations for comparing tables, not full re-simulations. The relative ordering is reliable; the absolute win figures are approximate.
- **The rolesurplus and census use different C weights** (JSON 200 vs engine 150 — Claude flags this). The C>OG guard is 9.0 (JSON) vs 12.5 (engine). Until KG rules on which C he means, the C-family guard numbers carry that ambiguity.

## Notes

- This is the only P-341 answer that *measures* the Owner's test instead of arguing about it. The census turns "centres should not constantly flex" and "FB is protected by scarcity" from English claims into numbers (5/32 teams, +0.012 wins; 16 FBs for 32 spots). That is the falsifiability dividend the Ledger promises, delivered before the Ledger is built.
- Claude's section 10 (the rebuild) is the most useful guidance for KG's rebuild decision: agree for product reasons, disagree as a flex fix, and the four conditions are the acceptance criteria. If Z.ai's rebuild attempt proceeds, it should be judged against Claude's conditions (old engine as test oracle, ledger + census as acceptance tests).
- The three asks (rebuild yes/no + timing; FB scarcity vs guard 18; the three below-guard rows) are now KG's decisions, with the numbers attached. The nflverse CSVs (snap_counts, pbp_participation) are the one input Claude needs from KG to build the ledger validation.
