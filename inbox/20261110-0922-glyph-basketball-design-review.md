SPEAKER: GLYPH | ROLE: council | TASK: Review basketball multisport design README (ZAI-D1 multisport) | DATE: 2026-11-10T09:22:00Z
FOR: P-322
VERDICT: improved

## Subject
`origin/council/muse:_agents/basketball/README.md` — "Multisport generalization — the derivation formula as a sport-agnostic engine" (DESIGN ONLY; not to be built before 76 Pancakes ships and repo moves).

## What is well defined (VERIFIED by reading)
- **Clear scope/status:** explicitly DESIGN ONLY and gated on 76 Pancakes completion + repo move. This prevents premature build pressure.
- **Input-parameter framing:** formula described as taking positions, duties, HAVE matrix, NEED profiles per job, weights per duty, λ, cuts, and floor as inputs (no football position/skill named in the formula). This matches ZAI-D1's stated structure (tier(M + λ·S) with scoped duties/NEED-HAVE deficits) and is a coherent generalization story.
- **Template vs calibration separation:** football matrices are the template; basketball matrices are a new calibration (not a new formula). This is the right boundary.
- **DL5 lesson generalized:** "new situational job is authored as a NEED profile first, prices fall out" (IDEA-3) is correctly framed as sport-agnostic.
- **Quasi-metric audit carry-over:** triangle audit (IDEA-2) framed as usable in any sport to distinguish deliberate premium rows from derivable ones — useful regardless of derivation winner.
- **Owner intent captured:** Owner preference for Z.ai's model because logic lends to multisport is recorded with verbatim note reference.

## What is sensible but still proposal-level (INFERRED / REPORTED)
- **Basketball positions (PG, SG, SF, PF, C):** standard and sensible starting point.
- **Duty sketch (rim protection, ball handling, 3pt shooting, perimeter defense, rebounding, playmaking, mid-range shooting, finishing at the rim, help defense, off-ball movement, post scoring, free-throw shooting):** plausible first pass, but not yet grounded in a defined role/job taxonomy for "this sim's basketball" (offense/defense schemes, small-ball five, switchability roles, etc.). Needs calibration discipline like football's Owner table.
- **Cross-role floor mapping:** README states "cross-side floor becomes cross-role floor (a guard playing center costs at least 6, say)" — plausible but speculative; "cross-side" in football has a specific meaning (offense/defense) that may not map 1:1 to basketball roles.

## Gaps / risks to resolve before calibration (actionable)
1. **Define "job" vs "position" in basketball.** Football has roles/slots/packages (DL5 case shows NEED profile per job). Basketball needs an explicit decision: are we pricing position-to-position flex only, or also lineup roles (point-of-attack defender, rim protector, stretch big, small-ball 5, etc.)? Without this, HAVE/NEED matrices will drift.
2. **Duty ontology and overlap.** Some proposed duties overlap (e.g. playmaking vs ball handling, help defense vs perimeter defense/rim protection, finishing vs post scoring). Need non-overlapping or clearly scoped duties to avoid double-counting in M/S (same lesson as football's scoped duties).
3. **Scale/measurement contract.** State HAVE/NEED scale (0-10 ints), self-doable constraint (need ≤ have for own job), tier cuts/floor semantics per sport, and how Owner-priced "policy" rows are handled — otherwise cross-sport comparisons are not auditable.
4. **Evidence/oracle for basketball.** Football derivation is evaluated against a 97/99-rule Owner table. Basketball needs an equivalent oracle (Owner table or agreed benchmark scenarios) before claiming fit/quality; without it, calibration is unconstrained.
5. **Role asymmetries and situational packages.** Capture basketball-specific hard cases early (switching wings, guard screening actions, small-ball lineups, two-big lineups) as NEED profiles, analogous to DL5, rather than ad hoc exceptions.
6. **Transversal/carryover skills.** Football used transversal craft (e.g. OL rush knowledge, CB route knowledge). Basketball will need an explicit policy for transferable skills (e.g. guards defending bigs in switches, bigs handling in short roll) to avoid hidden fiat.

## Recommendation
- Accept as a **good, well-scoped design seed** for multisport generalization; keep it DESIGN ONLY.
- Next doc step (when Owner says so): add a short "basketball calibration spec" defining jobs/slots, duty definitions, HAVE/NEED authoring rules, oracle table format, and 3-5 hard cases (including small-ball 5) before any matrix numbers are proposed.

## Labels
VERIFIED: README content/readability, stated formula inputs and constraints, design-only gating, IDEA-2/IDEA-3 carry-over claims as written. INFERRED: sufficiency/overlap risks of proposed duty list and cross-role floor mapping. UNKNOWN: basketball Owner oracle/rules and final job taxonomy (not yet defined).
