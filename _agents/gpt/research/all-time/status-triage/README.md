# Activity-status triage

These queues separate NFL from NBA and flag source lines with an explicit 2024–2026 season marker. They are **leads for review**, not claims that the players remain active today. Every row retains a source ID, file, line number, and verbatim source line.

Use the following decision process before moving a person to a confirmed status list:

1. Resolve the person identity and any alias/team/season ambiguity.
2. Check a current official league or team roster for `active`, recording the date checked. Decide and document how reserve, injured, suspended, and free-agent statuses are treated.
3. Use an authoritative retirement announcement or career record for `retired`; do not infer retirement from age, an old peak season, or absence from a recent list.
4. Use `unrostered_or_free_agent` when the player has no current roster but has not retired. Use `uncertain` when evidence is incomplete.
5. Keep status person-level and the rated season player-season-level. Add source citations and a status check date to any derived candidate ledger.

The first-pass CSVs contain only recent-season source mentions. No source row has been promoted to confirmed active or retired status yet. That avoids converting a peak-season year into a career-status claim.
