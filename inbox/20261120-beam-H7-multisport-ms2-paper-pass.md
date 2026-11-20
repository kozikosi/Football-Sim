SPEAKER: Beam | ROLE: council seat | TASK: H7 | DATE: 2026-11-20
VERDICT: improved (design note; post-cutover)
FINDINGS:
BASEBALL (sport two, recommended):
- Events: plate appearance outcomes (single, double, HR, walk, K, out) — categorical. ✓ fits.
- Step: (base-out state, batter vs pitcher) → outcome. Pure, no clock. ✓
- Pack: run expectancy, scoring, innings. ✓
- Keying: game + plate appearance. ✓ (natural structure)
- Slots/ratings: lineup (9 positions), pitcher (SP/RP), DH. Rating→strength mapping needed.
- League shell: schedule (162 games), standings, playoffs (bracket), draft, offseason. Likely shareable (INFERRED).
BENDS: the additive-logit hypothesis (§4) must be checked against baseball's odds-ratio (log5) matchup; the solver-vs-sim test (§5.1) needs a base-out chain solver.
BASKETBALL (sport three, contrast):
- Events: possession outcomes (shot, turnover, foul, rebound). Continuous flow — breaks the discrete-state assumption.
- Step: possession-level, not play-level. The contract bends here.
- League shell: 82-game season, playoffs (best-of-7). Similar structure to baseball.
BENDS: continuous flow breaks the discrete-event assumption; lineup synergies may break additivity (plan M §4 caveat). This is why basketball is sport three, not two.
WHAT I DID NOT CHECK: did not build; paper pass only.
