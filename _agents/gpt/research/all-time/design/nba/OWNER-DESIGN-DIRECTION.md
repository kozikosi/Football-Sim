# NBA Simulation — Owner Design Direction

**Recorded:** 2026-10-21  
**Status:** Owner-provided design direction and open concepts. This is not an approved implementation specification or an engine-ready schema.

## Product and draft format

- NBA is the third priority, after the current NFL product and the all-time NFL version.
- The NBA simulation should use basketball-specific rules and math. Reuse math only where it actually fits.
- The draft should be a snake draft and resemble the football simulation’s drafting experience.
- There should be enough players to fill the necessary roster and positions, but the draft does not need to use every player in the pool.
- The Owner floated drafting up to **10 players** per team. This is a design idea, not a finalized roster count.
- A simple first version could let the computer manage rotations. A more advanced version could let the drafter set rotations. Compare these options with a concrete example before asking the Owner to choose.

## OVR and skill information

- The Owner prefers a generally OVR-oriented model rather than making the public system depend on a large set of football-style attributes.
- NBA has fewer players active at once and more positionless play, so attributes such as rim protection and three-point shooting may matter more than comparable subskills in the NFL model.
- Treat OVR as the primary player summary while evaluating whether a small number of meaningful basketball attributes should affect OVR, lineup fit, or draft-board decisions.
- The Owner plans to supply NBA 2K ratings. The council may use 2K OVR as a source for basketball ratings, recording the edition/year, player, season, and source value. The Owner gives final approval and may adjust all-time rankings based on personal judgment.
- All public-facing player ratings and stats should be integers. Internal calculations may use decimals where useful, but do not expose decimal ratings or invent fields the engine does not consume.
- The Owner wants the statistics that explain Wins to be visible. Possible draft-board context includes advanced statistics such as TS+. Select exact metrics only after defining the model and source.

## Modern rules and historical players

Use modern NBA rules and strategy, including the three-point line and current three-point usage. The Owner’s working assumption is that historical players have had one year to train under modern rules before their hypothetical evaluation.

The Owner wants the group to re-evaluate historical skill translation rather than mechanically preserve the past. Examples offered for discussion:

- Kevin Garnett’s long-two profile could support a hypothesis that one year of modern training makes him at least a league-average three-point shooter.
- Players with very poor free-throw shooting, such as Chuck Hayes, Ben Wallace, or DeAndre Jordan, should not automatically be projected into strong three-point shooting after one year of training.

These examples are not fixed ratings or formulas. Record the evidence and rationale, present uncertain judgments for Owner review, and do not translate them into automatic rating changes without approval.

## Franchises and historical context

Use today’s NBA franchises in the simulation. The draft board may show historical franchise context: for example, Oscar Robertson could be shown with the Cincinnati Royals as a historical team while joining the current Sacramento Kings simulation roster.

Keep historical team information separate from the franchise identity used by the present-day simulation.

## All-time pool

- Aim for approximately **1,500–2,000 candidate players per sport**; more than that is not expected to be useful without a clear reason.
- All council members may collaborate on the candidate list, but the Owner gives final approval to the final pool.
- Keep owner-supplied source notes immutable and cite source lines for derived records.
- NBA 2K ratings may seed or inform OVR, but retain the original source value and make any simulation mapping or Owner adjustment explicit.
- The earlier approximate −5 adjustment for current players remains unapproved. Do not apply it until eligibility, rationale, and calibration are decided.

## Position flexibility

The Owner favors flexible and positionless thinking. Football’s flex system is a conceptual guideline: allow plausible role changes, while using position-specific penalties or hard constraints when the matchup is implausible.

The Owner’s illustrative example was that guards should not play center, while a shooting guard might flex to small forward or power forward with a smaller penalty for small forward. Treat this only as an example for testing. The actual eligible roles, penalties, and lineup rules require basketball-specific scenarios and Owner approval.

## Open design questions for a small NBA pilot

1. Should the first draft select a fixed number up to ten, or use a roster size justified by the rotation model?
2. Should rotations be fully computer-managed in the first version, with optional manual setup deferred?
3. Which small set of attributes is necessary beyond OVR, and do they affect OVR, position fit, simulation math, or only draft-board information?
4. Which advanced statistics explain team Wins and should be shown to users? How are source-era differences handled?
5. How are modern-training assumptions represented transparently without pretending uncertain historical skill projections are factual?

Do not ask the Owner to settle broad abstractions before showing a small, concrete set of players, lineups, and simulation examples.
