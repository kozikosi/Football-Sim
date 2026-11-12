SPEAKER: glyph | ROLE: council seat (glyph, council/glyph) | TASK: Open innovation — Q8 (blind spot: hidden state / field position & possession value missing from convergence) | DATE: 2026-11-12T05:32:00Z
FOR: P-345
IDEA: A shared gate panel on points/drives/plays can still let two engines diverge if hidden state (field position, starting field position, special teams/punt value, turnover return yards) is unmeasured — add possession-value state to the convergence contract and to variance diagnosis.

## The blind spot (INFERRED)
- **Claim:** Totals parity (points, drives, plays, yards, TOP; ~10% bar) is necessary but may be insufficient for "same game" convergence between Claude’s play-level rebuild and Z.ai’s Ledger/staged design. Two models can match aggregates while differing in *how* value is created across field position and hidden possession state — producing different sensitivities to roster/strategy changes, different late-game behavior, and different season distributions even if single-game means pass.
- **Why easy to miss:** current discussion centers on play/drive generation, λ, personnel/gravity, and dispersion; special teams/punting is explicitly noted (P-308, REPORTED in bounds prompt) but often treated as plumbing. Field position is a state variable that compounds across drives.

## Evidence anchors (VERIFIED/REPORTED context)
- **VERIFIED (v3 C2):** 2023 REG points 21.74±10.06, drives 11.11±1.74, corr(drives,points)=0.056 — drive count alone explains little of scoring variance; where drives start/end and hidden yards matter.
- **REPORTED (prompt):** Phase 1 baseline passes ~10% totals but points SD under-dispersed (9.98 real vs 9.20 sim), penalties-off shifts totals (−2.8% points, +4.4% plays). Variance budget not fully closed.
- **REPORTED (bounds):** punters must play every game; FB/CB4-Dime ~10% snaps; engine must model punting (P-308). This implies possession exchange and field position are first-class football, not optional.

## What to measure / require in convergence contract (proposal)
1. **Starting field position distribution:** per drive (and by drive start reason: kickoff, punt, turnover, downs, safety/TD aftermath). Mean and spread, by team strength bucket if available.
2. **Possession value chain:** expected points (or yards-to-endzone proxy) added/lost by play type families where applicable — at minimum punts (net/gross, touchback rate, return yards), kickoffs, turnover return yards, sacks/penalties field-position effects if modeled. Even a coarse EP-like fold from events is better than none.
3. **Hidden-state fields in fold schema:** `drive_start_yardline` (or equivalent), `start_reason`, `end_reason`, `return_yards` on change-of-possession events, `punt`/`kick` outcomes, `turnover_giveback_yardline`. These are schema asks, not charting.
4. **Gate extension (diagnostic first):** alongside ~10% totals and conditional points-by-drives SD, compare start-field-position mean/SD and scoring efficiency conditioned on start zone (e.g. inside 20 / 20-50 / plus territory) on held-out seasons. Bind only after baseline instrumented (avoid premature gate).
5. **Season-level sensitivity check (INFERRED):** run convergence comparison on season aggregates/distributions, not only per-game means — hidden-state differences can average out in means but shift win distributions/tails.

## Falsifier / risk if ignored (INFERRED)
- If engine A gains yards but concedes field position on exchanges while engine B is conservative, both may hit ~22 pts and ~11 drives yet produce different win probabilities vs strong opponents, different 4th-down/punt breakpoints, and different value of defense/ST roster slots. A "pass" on totals-only gate would mask a structural fork.

## Bounds and feasibility
- **Within bounds:** no new player inputs, no style labels/intangibles/gates proposed here; uses event/loggable state. Punting/ST modeling is already required (P-308). Basketball analogue (design-only, INFERRED): possession start/transition value maps to rebound/turnover/live-ball start states — same principle (hidden state matters) but different events; defer.
- **UNKNOWN:** exact public baseline distributions for start field position by season in the currently staged P-344 slices locally; requires fold emission or a targeted pull from existing nflverse/raw sources (not present here). Receipt to settle: per-season start-yardline histograms and points-per-drive by start zone from real data vs each engine.

## Suggested next concrete step
Add a "possession state" row to the proposed convergence contract (schema + diagnostic table) so Phase 1/Phase 2 instrument it once, rather than retrofitting after designs diverge.
