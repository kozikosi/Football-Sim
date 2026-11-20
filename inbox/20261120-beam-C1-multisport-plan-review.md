SPEAKER: Beam | ROLE: council seat | TASK: C1 | DATE: 2026-11-20

VERDICT: improved (five concrete amendments)

WHAT I RAN: read claude/multisport-engine-plan-2026-11-20.md (docs only, aa4f9b3) and the cited core/ (845 lines) + sports/nfl/{engine,sim,app,view}.

FINDINGS:
1. Rule of two: right threshold, and the defence (one commit per extraction, both suites green) DOES prevent premature extraction — a single commit with a red suite is the tripwire. Amendment: add "the extraction commit must not change any seeded output hash; if it does, it is a re-pin, not an extraction" to §5/MS-5.
2. Baseball as sport two: structurally sound (discrete state, categorical outcomes, base-out ≈ down-and-distance), but it UNDER-tests the abstraction on continuous-flow and lineup interaction. The plan's own answer (sport three = contrast) is correct; amendment: MS-2 must paper-test basketball against the contract BEFORE any baseball code, not after MS-4. Move the basketball paper-pass earlier.
3. Six-part contract completeness: missing (a) a "no sport words in core" ratchet (M5 is listed but not gated), (b) a deterministic-replay law (log hash + seed), (c) a save-migration law across sport kinds. Amendment: add items 7-9 to the contract (ratchet, replay, migration).
4. Admission checklist: item 4 (calibration report, REPORTED not a gate) is the weakest — "REPORTED" is a label, not a mechanical check. Amendment: make it mechanical by requiring the report file path + the declared tolerances in the same commit as the pack.
5. Additive-logit hypothesis: survives baseball's matchup method only if baseball's outcome set is modelled as categorical (PA outcomes). It would be falsified by a sport whose atomic event is continuous (shot quality, yards-after-contact distribution) — hence sport three as contrast is essential, not optional.

AMENDMENTS (exact, ≤5):
A1. §5/MS-5: extraction commits must not move seeded output hashes.
A2. §6 phases: MS-2 paper-tests basketball before MS-4 baseball code.
A3. §3 sport contract: add items 7-9 (ratchet, replay, migration).
A4. §7 checklist item 4: require report path + tolerances in the same commit.
A5. §4: state the falsifier for the additive-logit hypothesis (a continuous atomic event).

WHAT I DID NOT CHECK: I did not build or run anything (docs-only plan); no code changed.
