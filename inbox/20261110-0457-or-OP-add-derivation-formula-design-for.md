OP: ADD | P3 | Derivation formula design for the flex table (engine inevitable direction) | Brainstorm from the 2026-11-10 goals check (The engine's inevitable direction): the flex table is 99 hand-set prices (97 landed at Architect 97d7e9d; 105 when Claude builds). Inevitable direction: one formula produces all prices from the destination slot weight or role skill profiles, replacing 99 hand rules.

Design space:
A. Destination weight alone: price = f(dest weight). Cheap job, cheap price. Matches the monotone quantisation contract (modelWeights is slotWinsPerOvr quantised). Misses role asymmetry (ILB vs OLB vs SS price differences at similar dest weight).
B. Skill profiles only (P-322, Inkling and Super): price from role skill distance. Captures asymmetry; needs profile data the engine does not yet have.
C. Hybrid: base from destination weight, adjusted by source-to-dest role skill distance.

Verification: run the formula against the Owner table (99/105 rules). Where they disagree, need a ruling criterion: formula wrong or table wrong? Suggest the Owner decides per case, or the protected-constant contract is the tie-break.

Not a task for this round; Option B (P-332) ships first as a hand-set fix. Evidence: REPORTED (goals-check file read via git show, not independently run); INFERRED (design options are my reasoning).
