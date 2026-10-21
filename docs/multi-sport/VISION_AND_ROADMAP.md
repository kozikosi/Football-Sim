# VISION AND ROADMAP

## Vision
The NFL Draft Simulator is the first of many sport simulations. The goal is a unified platform where users can access current and all-time simulations for the four major American sports, and current/all-time simulations for the top football/soccer leagues (above MLS and including MLS).

## Priority Order
1. **Current NFL Sim (v21)** - Stabilize and beautify. Make it as sophisticated and polished as possible. This is the foundation.
2. **NFL All-Time Draft + Season Sim** - Add all-time version to the Football Sim platform.
3. **NBA Current Draft + Season Sim** - Create an NBA simulation practically identical in structure to the football sim, but with sport-specific math.
4. **NBA All-Time Draft + Season Sim** - Create all-time NBA simulation on the same engine as #3.
5. **Other Sports** - Expand to remaining target leagues following the same logic.

## Data Philosophy
- **Current players:** Use known ratings (NFL Madden/known data, NBA 2K ratings can be transmitted directly by Owner).
- **All-time players:** No obvious complete dataset exists. We must collectively assemble ~1200 of the best all-time players per sport (NFL and NBA). 
- **Eligibility:** All top current players are eligible for all-time consideration, typically with around a -5 adjustment to their score depending on era/context.
- **Creation:** NFL all-time ratings will be created by the council as a group under Owner guidance. NBA all-time will be built similarly with Owner input.

## Guiding Principles
- **Don't fork the engine prematurely.** Extract shared logic into `shared/core/` only when it is proven reusable across sports without breaking NFL invariants.
- **Preserve invariants.** Protected constants, math relationships, and verified behaviors must not be broken. All changes go through the assembled-build gate.
- **Sport-specific math is expected.** The structure is shared, but valuation, positions, units, and win models must be sport-appropriate.
- **Receipt-driven.** Every contribution must include commands/receipts and follow the council rules (read tail first, units, assembled-build gate).
