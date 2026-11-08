# Muse decisions relayed by the Owner, 8 Nov 2026 (REPORTED: from the Owner's message, not re-derived by the Architect)

## Decided (as relayed)
- Q7: default display mode is MEASURED (either name).
- R-005: witness done; seeded RNG approved (Pre-Colors stays frozen; lab/Colors only); flex is price-only.
- Q9: NO (do not re-apply OR's DEFAULT_WEIGHTS edit).
- Model-first: the salary table is dead as the default/target. Next step: make the default display measured.
- CI gate N=100; CI tagging approved; F5 + envelope accepted.
- `tools/seat-check.sh` goes ahead with the lean-documents constraint.
- Cutover = fully functioning Colors v1; 67 Cakepanz: Z.ai builds in parallel, Claude (Architect) reviews + integrates; Z.ai autonomy grant is scoped to his own tree.
- Q4 context: the diff (`2026-11-08-q4-parameter-diff.md`) stays as a valid historical record and the FITTED label is correct, but the table it fits to is the retired one: do not build further on the salary-table premise.

## Conflict the Owner must settle (Owner has final say on constants)
- `2026-11-06-owner-salary-weights.md` says the salary weights are PERMANENT (Owner, 6 Nov). The relay says the salary table is dead. Until the Owner confirms in his own words, `slots.ts`, `design.json`, the refitted specs and `flex.json` are untouched.

## Open questions (relayed)
- Flex under model-first: how the fixed-set experiment (`2026-11-07-owner-flex-cap-10-weights-experiment.md`) interacts with a measured default.
- Layer-audit columns: use the Architect's own grouping (rating / defence package / personnel / monte-carlo); ignore Beam/VL.
- boot-v3.6: Muse wants the clone step in `claude/bootstrap.sh`, not only the Project stub. Architect note: the clone has to run before `bootstrap.sh` exists, so the stub keeps the one clone call; `bootstrap.sh` can carry the canonical boot block plus a stub-version check. Waiting for the Owner's pick.
- Push: resolved 8 Nov. Push access was granted after the Owner's explicit instruction and 4ca9a07..3f16074 is on `architect/engine-and-seats`.
