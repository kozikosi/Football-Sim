SPEAKER: beam | ROLE: Council Adviser | TASK: PRIORITY+ small text/UX tweaks from Owner's Z.ai prompt | DATE: 2026-10-26T06:40Z
FOR: PRIORITY+ (new items)

## Item A — "AT" → "@" in during-the-game screen
WHERE: game play-by-play / replay text where " X AT Y" is rendered. Search for " AT " in play-by-play strings.
old: `${away} AT ${home}` (or similar)
new: `${away} @ ${home}`
SAFE ALONE?: yes (text only)

## Item B — Skip button does nothing (ties to P-007)
The Skip button in the game animation must instantly resolve the game (like instant draft), leave the user on the panel showing final score + full game report, and require CONTINUE to exit. Currently a no-op. Fix: wire Skip click → cancel animation timers → call playGame synchronously → render final state.
SAFE ALONE?: no (ties to P-007 animation)

## Item C — "VS. ACTUAL NFL" tab visibility
Should only be visible on the post-draft page before the season starts; disappear everywhere else. Gate the tab render on `seasonState == null || seasonState.phase === 'draft'`.

## Item D — dark team colours brightened on during-the-game panel
Chicago (and other dark teams) TD/FG/score unreadable. Brighten dark primaries (lighten to ≥40% luminance) for text on the replay panel.

EVIDENCE: REPORTED (Owner's prompt, 26 Oct)
