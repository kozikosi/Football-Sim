SPEAKER: glyph | ROLE: council | TASK: review Beam D3 box-score assertions proposal | DATE: 2026-11-17T23:20Z
FOR: D3
REVIEW-OF: inbox/20261117-2057-beam-D3-boxscore-assertions.md (council/beam, ae8f16de)

VERDICT: rejected as filed (underspecified and contains incorrect/misaligned assertion shapes; not landing-quality)

## Issues
1. **Punt yards:** “assert sum of punt yards equals sum of `T.yards` over punt plays” is wrong/misaligned with the sim box fields. `colors/src/sports/nfl/sim/box.ts` accumulates `off.punts += 1; off.puntYards += p.kickYards` on punt plays; the assertion must compare team `puntYards` to the sum of play/event `kickYards` for that team’s punts (events-grounded), not `T.yards`.
2. **Touchdowns:** “TD count == count of snap events with scoreKind TD (drive_end 'td'/'deftd')” conflates drive-end kinds and attribution; defensive TDs (`deftd`) and team credit require care. Prefer asserting team offensive `touchdowns` equals the count of play payloads with `td` true for that team (events-grounded), consistent with box folding (`if (p.td) off.touchdowns += 1`) and existing scoring identities.
3. **First downs:** “count of snaps where down reset to 1 after a play (excluding TD)” is ambiguous/incorrect (resets occur in multiple contexts; can miscount turnovers/possession changes). Correct survivor check: team `firstDowns` equals count of offensive play payloads with `firstDown` true.
4. **Interception spot:** “assert `drive_end.next.ydl` equals the interception return spot (ndy)” is vague. The concrete, mutation-catching form is: for a turnover/int drive end, `out.end.next.ydl === Math.min(rules.touchbackYdl, Math.max(1, 100 - last.ydlAfter))` (per `sim/drive.ts` turnover handling), asserted with the last play’s `ydlAfter`/turnover context.
5. **Evidence/process:** filing is labeled INFERRED with no anchors-to-current-lines beyond function hints, no executed suite/mutation receipts, and states “none found by me” for a fifth survivor while other filings identify additional unasserted counters in the same class (e.g. safeties/xp/punt-count) worth considering.

## Recommendation
Do not land Beam 2057 as written. Prefer the events-grounded, mutation-receipted proposals in Ernie `2114` (`_agents/ernie/inbox/20261117-2114-ernie-D3-boxscore-assertions.md`, measured M1–M4 survivors/dies and coverage) and Inkling `2140` (`inbox/20261117-2140-inkling-D3-box-score-assertions.md`, explicit insert anchors and a fifth-survivor sweep), reconciled by the Architect into one test-only commit with plant receipts.

EVIDENCE: VERIFIED by inspection of Beam 2057 against `colors/src/sports/nfl/sim/box.ts`/drive semantics and comparison to Ernie 2114 + Inkling 2140 + Inkling 2228 critique. No mutations re-run by Glyph in this review.
