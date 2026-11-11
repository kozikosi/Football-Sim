# Should the engine go play-level? Architect's answer to MUSE and the Owner (10 Nov 2026)

Answers `_agents/muse/deliveries/prompts-2026-11-05/claude-play-level-question-2026-11-10.md` (branch `council/muse`). Design only: no engine, `flex.json`, `flex.ts` or test-suite change. Two read-only prototypes back it: `tools/mathlab/flexcensus.mjs` and `tools/mathlab/rolesurplus.mjs` (outputs next to this file). Labels: VERIFIED = I ran or read it; REPORTED = a repo doc says it; INFERRED = my reasoning, untested; UNKNOWN = not measured.

## 0. Short answer

1. **A play-level engine does not remove the flex headaches; it moves them.** A flex price has two jobs: *can this body do the duty* (ability) and *can you cheat by moving a cheap player to an expensive spot* (no-arbitrage). A play engine consumes the first and the sim already measures the second. INFERRED for ability, VERIFIED for the sim already measuring slot value (section 1).
2. **Do not buy a play engine to fix flex. Buy two small instruments that make the Owner's philosophy visible as numbers**: an *exploit census* (the engine's own lineup optimizer as an adversary; built, works) and a *participation ledger* (who is on the field how often, per personnel package; designed, not built). Decide a real play-level view separately, on its own merit: gravity and advanced stats (Q8), which the drive engine cannot show and the engine has no code for today (VERIFIED: grep for gravity or double team in `colors/src` finds nothing).
3. **The engine can generate the value half of the math from itself, and already partly does. It cannot generate the ability half from OVR and position alone**, because the sim cannot tell a centre at tackle from a tackle of equal OVR unless someone authors how OVR transfers. The Owner said he defines the job requirements; that authoring is the one input that stays (section 5).

## 1. Do the headaches survive? One by one

**What the sim already does (VERIFIED).** `value.ts` bumps one spot's OVR in the matchup model and reads the wins; `slotWins20/0.00254` reproduces the 32-spot table: QB 999, OT1 492, RB1 243, TE1 245, C 148, FB 25, TE3 49, DL5 155 (table 1000/500/250/250/150/25/50/150). Two differ by ~10 (WR4 40 vs 50, SS 310 vs 300); not investigated (the table was re-measured 3 Nov before later spec changes, per its header). So "let the engine realise who is valuable" is already true of slot values at drive level.

**C>OT.** It is a guard (value-ladder) row. Play level changes nothing: a centre at tackle plays tackle at OVR minus the price, and the price is the same table. The Owner's own test, "fine at 6 unless centres constantly flex out", is now measured (VERIFIED, `flexcensus.mjs`, 32 real Madden-27 rosters, the engine's own solver; the script first proves its re-implementation equals `optimalLineup` with max value difference 0):
- live table (C>OT 12): no centre moves to tackle on any real roster;
- C>OT 6, C>DT 9, C>OG 5: 5 of 32 teams move a centre to tackle, worth +0.012 wins per team-season;
- C>OT 2, C>DT 2, C>OG 2: 8 of 32 teams, +0.073 wins per team-season;
- the real threat is the *stacked* roster (a user drafts a second elite centre): at 6/9/5, 18 to 21 of 32 such teams move him; at 2/2/2, 13 to 15 go to tackle or DT. Under the live table the stacked centre goes to OG on 32 of 32 teams (C>OG is only 6; guard price 10 cuts it to 17 to 25 of 32 and removes 0.17 wins per team-season).
Read: at 6, centres do not "constantly" flex on real rosters; the exposure is one user drafting a second elite centre in a late round, which is exactly the draft-cheapness exploit the guard exists for.

**FB and "socialism".** Same split. Under the live table (FB>TE 6, FB>RB 2) the league's best real FB (Juszczyk 88) added to every roster flexes on 31 of 32 teams (28 to TE, 4 to RB) and is worth +0.22 wins per team-season; at the guard price (18) it happens on 1 of 31 (VERIFIED). On real rosters there is no FB exploit at all. The pool has **16 fullbacks for 32 spots and 3 at or above 80** (VERIFIED), so the live protection is scarcity, not price: "one good player, unimportant role" is literally what the data shows. Break-even surplus `s* = p * w_dst / (w_dst - w_src)`: FB>RB at 2 flexes any FB 2.2 OVR better than the RB replacement; at 18 it takes 20 (VERIFIED arithmetic). A play engine would give FB a measured snap share, but the share *is already in the weight* (FB 25) and comes from authored personnel data (REPORTED: 21 and 22 personnel are 2.2 percent of plays, `personnel-shares.py`), so it replays the authored share rather than discovering it.

**Valuing a role with no slot (SS2, DL5 blitzer).** The sim can measure leverage only for a role the matchup model contains. DL5 got there by baking a measured share (0.33, 1,632 team-games, `slots.ts`) into the weights. A play engine does not conjure the share: someone must say how often a big nickel is on the field. Emergent personnel choice was tried in Pre-Colors and failed (REPORTED, `ENGINE-MATH-SPEC.md` 14.3): letting the plan search pick personnel dropped TE1 value 32 percent and **5 of 32 rosters chose 10 personnel against 1 percent of real snaps**; the cost constant that would fix it is INFERRED and cannot be pinned. So emergent snap counts need an authored cost, i.e. translation again.

## 2. Not starting from zero: what transfers

Transfers unchanged: the Hungarian lineup solver and flex table (ability oracle); the duty tables (ZAI-D1 and the Owner's score changes); the 32-spot table, demoted from *input* to *test* (a play engine must reproduce its slot values within tolerance); the nflverse measurements (personnel shares, DL5 share, 96,624 plays) as validation targets; the Rng and purity rules; the matchup unit ratings as the base probabilities.
Recalibrate: every drive-shape number (about 11.5 drives, 2:30 a drive, 5 to 6 plays; INFERRED in `drives.ts`) becomes an output to match; the 32 weights and `PT_*` / `BASE_PTS` constants must be refit against the new model; all seeded goldens move.
Rebuild: play calling (down, distance, field position, clock), personnel selection, ball-carrier and target attribution (today static `CARRY` and `TARGET` shares in `boxscore.ts`), per-play outcome distributions that sum to the matchup totals, and the box-score allocator. Today's layers a play engine replaces or wraps are `drives.ts` 309, `matchup.ts` 121 and `boxscore.ts` 256 lines (VERIFIED by wc). The Owner is right that the calibration knowledge transfers; the **engine code mostly does not**.

## 3. The middle path, and what it really buys

A play view (down, distance, who touched it) generated inside each drive is "generated, not simulated": it adds up to the drive, so it cannot discover anything the drive does not already contain. It moves the translation into personnel and attribution models, as MUSE suspected. **That move is still worth something: the inputs there are measured shares from real data, not English.** The Owner's English ("FB is unimportant") becomes a number ("FB is on the field about 2 percent of snaps") that can be checked against real football.

The smallest version of that is not a play view but a **participation ledger**: per team, personnel package (offence 11/12/13/21/22, defence base/nickel/dime) times share times which spots are on the field. Snap count of a spot = the sum of shares of packages that field it. This is a factorisation of numbers the engine already holds in `PERS`, `PERS_REC`, `DL5_SHARE` and `DIME_W`: weight = snap share x leverage per snap. It needs no down, distance or field position. INFERRED benefit: with share and leverage separated, "socialism" stops being an opinion and becomes one measured ratio; UNKNOWN whether leverage per snap is stable across roles (that is step 2 below).

## 4. Path and what to measure

1. **Now (done):** exploit census. Turn it into a standing test: no candidate table may let the optimizer gain more than a tolerance (say 0.05 wins per team-season) on stacked rosters. It replaces "centres should not flex" arguments with a number.
2. **Ledger as a read-only script** (no engine edit): rebuild per-spot snap shares from `PERS`/`DL5_SHARE`/`DIME_W`; compare with nflverse snap counts for FB, TE2, TE3, WR4, CB3, DIME, DL5 (the data files are not in the repo and the shell cannot download them; the Owner or MUSE must attach them: UNKNOWN until then). Then factor each weight into share x leverage and check leverage consistency.
3. **Only if (2) shows it adds information**, build the play view for gravity and usage, as a display layer over the drives.
Success metrics: engine snap shares within about 2 points of real; centres stay at centre on real rosters (census); derived value ranking against the 32-spot table (Spearman, as a test, since the Owner says the 99 are a guide); exploit mass per table; and the Owner's basketball test: it prices a move with only a duty table, no per-role tuning.

## 5. The deeper question: can the engine generate the math?

Split the price into what must be authored and what can fall out:
- **Falls out of the engine:** slot value `v` (bump and read wins, VERIFIED); gravity (once modelled, it lives inside `v`, no extra price term, as flexunify argued); exposure (ledger share); the guard level.
- **Cannot fall out of OVR plus position:** the ability gap. The Owner declined per-player attributes (Q2, Q14), so what a centre brings to tackle is not in the data. The duty tables are the minimum authored input, and the Owner has said he defines requirements.

Concretely, the no-arbitrage price can be *computed by the adversary instead of assumed*. `flexunify` uses `G = 20 * (1 - v_src / v_dst)` with 20 a hand constant. `rolesurplus.mjs` replaces 20 with a per-role star surplus read from the OVR pool (top-decile starter minus first non-starter): 22 QB, 17 WR, 21 OT, 17 OG, 18 C, 19 TE, 18 RB, 16 EDGE, 17 DT, 12 ILB, 15 OLB, 13 CB, 13 FS, 15 SS, 11 K, 9 P (VERIFIED). Rules priced more than 1 OVR below the guard fall from 8 to 5 (the remaining five: FB>RB, FB>TE, C>OG, OG>OT, TE>OG); FB has no estimate because the pool has fewer fullbacks than spots. The next step is a fixed point: raise the price on any move the census shows the optimizer exploiting until stacked-roster gain falls below tolerance. Prices become `max(ability gap, equilibrium guard)`, with the Owner supplying only duties. I ran the census (the loop's oracle) on five hand-set tables, **not the loop itself (UNKNOWN whether it converges to the Owner's feel)**.

## 6. Considered and rejected

- Full play-by-play simulation for flex: re-fits all 32 weights and still reads the same ability table.
- Emergent snap counts from a personnel-optimising coach: tried, failed (section 1).
- Reinforcement or self-play to discover flex: needs per-player skills the Owner refuses.
- A separate gravity price term: it belongs in `v`.
- One constant star surplus of 20: replaced by the data-derived per-role number, still imperfect.
- A named FB exception: the Owner forbids it; the census turns the FB choice into one visible trade-off (live 2 and 6: 0 wins on real rosters, 0.22 to 0.35 wins per team-season if a user holds the top FB; guard 18: none).

## 7. If I were starting from the Owner's question alone

I would build the ledger and the adversary first, show the Owner three tables (snap shares, exploit counts, break-evens) and let him pick the feel, before writing any play model. The play view comes only for gravity.

## 8. Caveats (not hidden)

- Census: 4-3 spots only; stacking is one extra star per team, not realistic drafts; wins are lineup value x `WINS_PER_UNIT` (linear), not rerun through the matchup model.
- Role weights disagree between `sport-football.json` (C 200, OLB 200) and engine slots (C 150, WILL 150, SAM 100). The census uses engine slots; `rolesurplus.mjs` uses the JSON. C>OG guard is 9 to 10 under the JSON, 12.5 under engine weights. UNKNOWN which the Owner means.
- Nothing here changes the live table, and the 99-rule fit is untouched.

## 9. Asks of the Owner

1. Rule on FB: accept scarcity as the protection (price 2 and 6) or the guard (18); the census numbers above are the cost.
2. Attach nflverse `snap_counts_*.csv` and `pbp_participation_*.csv` if you want the ledger validated (step 2).
3. Say whether the stacked-centre scenario matters to you (a user holding two elite centres).

## 10. The Owner's lean toward a full rebuild (11 Nov): where I agree and where I do not

**Agree, as a product decision.** A rebuild is defensible if the goal is portability to basketball, hockey, soccer and baseball (Q5), gravity and usage as first-class stats (Q8), and snap counts the user can see. Those need per-possession or per-play state, which the drive engine does not have (VERIFIED: no per-play state, no gravity code).

**Disagree, as a way to fix flex.** Do not rebuild *for* the flex headaches. A rebuild still needs the ability table, still has the guard, and still needs authored personnel costs (Pre-Colors emergent personnel failed, section 1). It would re-open the 32-spot calibration, every seeded golden and the drive-shape constants, and the flex work would restart on a new base. INFERRED cost; I have not estimated the effort.

**What I would do if you rebuild:**
1. Keep the flex layer (duty tables, guard, solver, census) as a portable module with an interface of its own, so it survives the rebuild instead of being re-derived.
2. Rebuild sport-agnostic from the possession up (a generic job-demand and body-supply play model), football first as the calibration case, with today's engine as the test oracle: the new model must reproduce the 32-spot table and the nflverse shares within tolerance before anything ships.
3. Run the old and new engines side by side until the new one matches; do not switch in one cut.
4. Spend the first week on the ledger and census (cheap, informative) because they become the acceptance tests for the rebuild.
Risk I would flag: a rebuild is the largest item on the list and every held item (CI gate, hydration wiring) sits behind it. UNKNOWN: whether you want the rebuild to ship before the next season sim.
