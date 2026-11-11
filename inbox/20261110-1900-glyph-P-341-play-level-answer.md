SPEAKER: glyph | ROLE: council | TASK: should-the-engine-go-play-level | DATE: 2026-11-10T19:00:00Z
FOR: P-341

EVIDENCE: VERIFIED|INFERRED

## Short answer
The confusion is real, but "go play-level and have the engine generate the math" is not a free win. A **play-level VIEW on top of the existing drive model** is plausible and low-risk; a **full bottom-up play rebuild** is high-risk and likely to reintroduce translation work. The headaches won't vanish — they move. The key is: can we make participation observable without breaking calibration?

## What transfers (Owner is right, we are not starting from zero)
VERIFIED (code/read):
- `matchupModel` (units/ratings/plans) is the core that produces `expRush/expPass/lamTO/lamSack/structPts` and drives everything. Keeping it preserves calibration.
- Drive distribution + `buildOffenseDetail`/`buildDefenseDetail` already encode **implicit participation**: personnel mixes (`PERS`), per-slot `share()`/`rotShare()` with floors, best-back leads, QB scrambles, OL gap shares, etc. (see `Football-Sim-PreColors.html` around ~3378+). The engine already makes choices about who is on the field.
- DIME shows the pattern: situational share (`DIME_W = 0.15`, 10% snaps × 1.5 leverage) applied as a fixed share of coverage rating (because letting the package picker choose it would overvalue). This is exactly "generate/encode snap share" without a full play-by-play sim.
- Slot values/weights, duty tables, flex engine, and derivation work all inform targets; we don't need to discard them.

## What the drive model actually does vs claims
VERIFIED:
- **No per-play state.** The game is generated from matchup expectations + realized yards/TO/sacks + scoring event decomposition; there is no down/distance/field position tracked in `simulateGame`. 
- **No explicit per-player snap counts stored.** The code allocates stats via shares/rotations based on personnel/packages/ratings (implicit), not by counting simulated snaps. So "the engine does not know how many plays a player was on the field for" is largely true as stored state — but it *does* know/decide participation via allocation rules.
- **Box score allocation is deterministic given shares.** Changing shares changes allocation; the question is whether shares come from a formula or from simulated plays.

## Why the headaches happen (diagnosis)
INFERRED from prompts/owner notes:
- **C>OT (center→tackle):** ability layer gives 6, Owner wants 12. The value-ladder/guard idea suggests it's about relative slot values (center cheap, tackle expensive) not just job demands — fitting a single formula to all pairs is brittle.
- **FB/socialism:** FB>RB guard gives 18 vs Owner wants 2. The issue is "how often is FB on the field?" — if we don't measure participation, we can't apply "one good player / unimportant role" rules. Currently participation is implicit in personnel usage.
- **New roles (SS2/DL5):** no slot exists, so no measured value. Need to define requirements and price them.

These are translation problems: English philosophy → formula parameters. More data (participation/contribution) can help, but won't auto-resolve value judgments.

## View vs rebuild
INFERRED:

**Play-level VIEW (drives generate play sequences that sum to drive totals):**
- **Pros:** Keeps drive calibration intact (error-contained). Can emit per-player participation counts, touches/opportunities, EPA by player/unit, situational usage. Makes "socialism" measurable (actual snap share). Helps price new roles by observed usage+impact. Reuses matchup model, slot values, flex tables.
- **Cons:** Still need personnel model (who is on field for each generated play) and attribution model (who gets ball/makes stop) — these are themselves translations of football knowledge. Plays are generated to match totals, so "causation" is constrained. Risk of overfitting to look realistic.
- **Effort:** Medium. Could be incremental.

**Full play-level REBUILD (plays determine drives bottom-up):**
- **Pros:** More causally consistent (values/EPAs come from same sim). Could discover interactions. 
- **Cons:** Bets game on play model reproducing calibrated drive totals across all situations. Must re-measure everything (slot values, weights, flex, season sim). High risk of breaking Lab. Personnel/attribution still required. Large effort.
- **Effort:** Very high.

**Recommendation:** Start with the **view**. Only go bottom-up if the view cannot produce the needed measurements after honest attempts.

## Can the engine generate the math itself?
INFERRED:
- **Partly yes.** With participation + contribution (EPA/touches/success rate) we can derive *empirical* values from sim data (e.g. regression of wins/points on player-unit contributions controlling for context). That could generate slot values/flex prices from simulation rather than hand-fitting to 99 rules.
- **Not fully yes.** The Owner's philosophy (realism, creativity, portability, "fun tax", socialism) is a value function, not something the engine discovers. Also need to define the objective (what are we optimizing for?). The "99 rules" encode that philosophy. A data-driven fit will optimize for whatever objective we give it — we'll still need to translate philosophy into an objective/loss function and constraints.
- **Portability is a design choice.** As Owner says (Q5), basketball needs different duties; a unified physics-like model is aspirational but duties/responsibilities still need to be defined per sport.

## What to measure (to know it's working)
VERIFIED/INFERRED (concrete):
1. **Snap counts:** per player per game/season, by situation (down/dist if we add, or at least package). Compare distributions to NFL (when possible) — especially FB, TE, dime usage.
2. **Participation vs allocation:** does the view produce stable shares? Test FB socialism case explicitly.
3. **Center stability:** track how often centers flex out in sim; Owner says "fine unless centers constantly flex out" (C>OT at 6). Measure flex frequency, not just price.
4. **Value ranking stability:** do derived values rank players sensibly? Do they match market-ish ordering without overfitting to 99?
5. **Calibration preservation:** game scores/yardage/TOs/sacks must stay within historical calibration (compare to §4 in ENGINE-MATH-SPEC). The view must be error-contained.
6. **Flex behavior:** test the 9 attractive pairs from P-142 measurement under new shares/prices.

## Concrete path (minimal viable)
INFERRED:
1. **Instrument first** (no big refactor): add counters in `buildOffenseDetail`/`buildDefenseDetail` to log actual shares used (personnel mix, rotation counts) — make implicit shares explicit and testable. This costs little and may immediately clarify FB/socialism.
2. **Add play-level view** inside drives: generate a play sequence per drive that sums to drive totals; track participation/targets/tackles/EPA. Keep drive outcomes as source of truth.
3. **Derive, don't guess:** use measured participation to compute empirical slot values and propose flex prices; compare to 99 rules as a guide (not target). Tune objective to match Owner philosophy.
4. **Gate carefully:** only change protected constants with Owner approval; run E1-E10 style checks.

## Answer to specific questions
- **Eliminate headaches or move them?** Move them. Participation becomes measurable (helps FB/new roles), but personnel/attribution models become the new translation layer. C>OT may become clearer via value ladder if we measure correctly.
- **Starting from zero?** No. Matchup model, drive calibration, slot values, duties, flex tables all transfer. The "math generation" is a different fitting method, not a clean slate.
- **View enough or does it move translation?** View is enough to start; it definitely moves translation into personnel/attribution. If those are hard to get right, full rebuild won't help.
- **Path + measurements:** Above.
- **Can engine generate math?** Partly — can generate empirical values from sim, but cannot discover the Owner's value function/philosophy/portability goals. Needs objective + constraints + human judgment. "Generate the math" is possible if we mean "fit parameters to measured outcomes under an objective", not "discover philosophy from first principles".

