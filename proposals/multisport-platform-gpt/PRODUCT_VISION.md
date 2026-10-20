# Product Vision and Scope

**Status:** Owner intent translated into a proposal. Confirm assumptions before implementation.

## Long-range product goal

The website should let a person choose among season draft simulations for multiple sports and leagues. The NFL regular-season draft simulation is the first product, not the permanent boundary of the website.

The intended portfolio is:

- Four major American sports: NFL, NBA, MLB, and NHL.
- For each: a current-season simulation and an all-time simulation, for at least eight American-sport experiences.
- Soccer: a current and an all-time simulation for each men’s domestic league ranked above MLS, plus MLS itself. Using the September 20, 2026 Opta ranking snapshot reproduced by AS USA, the initial set is 17 leagues. That would add 34 soccer experiences and produce a planning target of 42 configurations across American sports and soccer. This number is a dated planning estimate, not a promise that every mode should launch together. [Opta’s methodology overview](https://theanalyst.com/articles/strongest-football-leagues-in-the-world-opta-power-rankings) explains the league strength comparison; [the September 2026 ranking snapshot](https://en.as.com/soccer/mls-snubbed-again-opta-analysts-ranking-of-the-worlds-best-leagues-is-raising-eyebrows-f202609-n/?outputType=amp) places MLS at rank 17.
- The catalog can grow beyond this initial set after the Owner approves additional sports, competitions, women’s leagues, or cup formats.

## Project priority

The implementation priority supplied by the Owner is:

1. Protect and improve the current NFL Football Sim, with V21 quality and polish as the immediate priority.
2. Add an NFL all-time draft-season simulation.
3. Build a current NBA draft-season simulation, using the existing NFL product as a product and workflow reference while developing basketball-specific rules and math.
4. Build an NBA all-time simulation on the NBA system.
5. Extend the established pattern to other sports, then the soccer league catalog.

This is a priority order, not a demand that all work be strictly serial. Research, data sourcing, conceptual questions, and architecture review can happen in parallel if they do not consume or destabilize the active V21 implementation. Integration and product-code changes should respect the priority and the stage gates.

## The first four projects

For near-term planning, the primary four projects are:

| Priority | Product | Relationship |
|---|---|---|
| 1 | Current NFL | Existing product; V21 is the immediate quality and polish focus |
| 2 | NFL All-Time | New player pool and historical rating system using NFL-specific rules |
| 3 | Current NBA | New sport model and player pool, with familiar product flow where it fits |
| 4 | NBA All-Time | Historical NBA player pool using the NBA system |

MLB, NHL, and soccer are future portfolio targets, not reasons to broaden the V21 task.

## All-time pool planning assumption

Plan for approximately 1,200 all-time candidates in each of NFL and NBA unless the Owner says the 1,200 target is combined or chooses another number. This is a data target, not a launch requirement. Build a credible, reviewable pool in stages and preserve the option to expand it.

The Owner says current top players should remain eligible in an all-time pool with an adjustment of about minus five points. Treat this as a configurable eligibility/era adjustment, not a permanent edit to a player’s raw rating. The final policy remains an Owner decision.

## Product principles

1. **V21 quality first.** Preserve the current NFL experience while improving clarity, visual quality, reliability, and finish.
2. **Reuse proven product patterns; model each sport honestly.** Share navigation, run history, accessibility patterns, simulation controls, and result presentation when they make sense. Do not force football position math, roster rules, schedules, or playoff logic onto basketball or another sport.
3. **One product family, explicit simulation identity.** Every run should record sport, competition, season mode, ruleset version, data version, and random seed or reproducibility metadata.
4. **Data is a product surface.** Users and contributors should be able to understand where ratings came from, what was transformed, and which assumptions are still provisional.
5. **Make uncertainty visible to the team.** Unknown rules, debatable all-time ratings, and unresolved league selections belong in a question or decision record, not in silent code defaults.
6. **Add complexity only when it unlocks an accepted product need.** The initial architecture should create seams for future work without turning V21 into a premature general-purpose platform.

## Out of scope until separately approved

This proposal does not decide exact player ratings, NBA mechanics, flex rules, soccer draft mechanics, launch dates, pricing, licensing, or whether the app will use a particular framework or database. It records those as questions for the Owner and the implementation team.
