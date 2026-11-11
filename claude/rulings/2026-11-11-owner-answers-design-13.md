# Owner answers to engine design section 13, 11 Nov 2026 (Project chat)

Owner, in his own words:
(a) "Yes — direction and Phases 0 and 1 are a go."
(b) "~10% for most metrics, general realism, not exact 2025 modelling."
(c) "Basketball as the second sport, deferred until football's done."
(d) "No historical ratings right now, not important"

## Effect
- (a) Direction and Phases 0-1 approved (also in `2026-11-11-owner-approves-phases-0-1.md`). The council data ask is released.
- (b) Totals bar for Phase 1 is about 10% on most metrics, aimed at general realism, NOT exact 2025 modelling. This replaces the Architect's proposal (points 1%, drives 3%, plays 2%) in design section 8. INFERRED reading: ~10% applies to team-level totals (points, drives, plays, yards, time of possession); the margin pmf and the properties (monotonicity, conservation, replay determinism) are still checked for shape and correctness, with no exact-fit target. Owner may correct this reading.
- (c) Second sport = basketball, built only after football is done (Phase 4 in design section 9).
- (d) Historical Madden ratings: none, and not needed. Anything that needs them (rating-to-outcome fit from history) is out of scope; lambda is set by dispersion matching on current data.
