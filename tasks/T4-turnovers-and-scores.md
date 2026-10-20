# T4 — Turnover narration: every turnover named AND the score it produced is event-consistent

> STATUS after Oct 19 v10 edit batch: largely DONE — `turnoverParagraph()` now enumerates every giveaway with named players (with a box-score fallback when the detail pass is thinner than the stat line), the collapsed `Turnovers:` line appends those named notes instead of a bare vague head, and the walk-off line reads "he took it the distance". Vague heads remain only as honest one-line summaries ("evened out at N apiece" / "one turnover ahead"), never as the whole paragraph. Remaining for this packet: the verification checklist below, plus the half-time/running-score event-consistency checks — implement only what still reproduces.

File: `NFL Draft Simulator.html` (canonical). Contact points (verified):
- `turnoverParagraph()` at ~2827–2881.
- Generic vague sentences at ~2869–2871: `"The turnovers canceled out, ${a.n} apiece."` and `"... one turnover ahead."`
- Scoring attribution in recaps and half-time lines across `generateGameSummary()` (~2970–3090).

Steps:
1. Enumerate, never summarize: for EVERY giveaway (INT, fumble, forced fumble), push a bullet item with players and quarter. The data exists: `d[s].giveaways` (`{name, takenBy, q, td}`) and `fums` (`{name, forcer, rec, q, td}`).
   - INT (one): `Name's pass was picked off by X in the Nth quarter` (or `returned for a touchdown by X in the Nth quarter`).
   - Fumble: `X ripped the ball loose from Y ... and Z recovered` ("and *he* took it the distance for a touchdown" — pronoun fix fits here; the current string "${rec} came up with the football — and it went the distance" mis-credits the football, the player went the distance).
   - If `a.n === b.n`, add the neutral tail `The takeaways even out, but each has its own story:` instead of "canceled out".
2. **Score consistency invariant.** User-visible bug: a defensive TD was narrated as "Broncos 14–12" then the half-time line said "Chiefs led 12–7". Root cause: narrative bullets compute "score after" from their own accumulation in some branches while the timeline derives from events. Fix hard: build ONE map at render time — `scoreAfterEvents = new Map(sortedEvents.map(...))` keyed by event object reference — and EVERY bullet that prints a running score (turnover TDs included) reads from that map. Search the summary codebase for "scoreAfter"/inline `+= e.pts` patterns outside `gameFlow` and funnel them.
   Defensive-TD events in the event list: `type:'TD', defensive:true` (they already push to the scoring side's event list — verify the scoring side is the team whose DEFENSE scored; if a def-TD was narrated but the score never moved, the generating branch skipped pushing the event — fix by always pushing when narrating).
3. Bullet formatting, per user's style directive: the section reads like a bullet list WITHOUT literal bullet glyphs — each action on its own `<div class="to-item">…</div>`, each starting with `<b>${teamNick}</b>` (or opponent) prefix, e.g.: `Chiefs — Hockenson forces it loose from Raymond, Okereke recovers; he takes it 74 yards for six (14–12).` Every bullet starts with the beneficiary team.
4. Done-when:
   - A 1-turnover game lists the play, nothing on the page says "canceled out"/"one turnover ahead" as a substitute for detail.
   - Timeline keep running scores always consistent: recompile a season log, assert `bullet score-after == events score-after` for every bullet that prints a score.
   - No pronoun bugs: "he/the ball" correct; "Chiefs led 12–7 at the half" equals the actual events after the def TD.
5. Do NOT touch: `lateTwoPt`, OT, `statImpact`, weights, CPU logic.
