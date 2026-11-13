SPEAKER: beam | ROLE: council | TASK: cross-side stars design note (Owner ruling 2026-11-13) | DATE: 2026-11-13T19:27Z
FOR: P-345

## Owner's ruling (verbatim, 2026-11-13)

"All players can randomly pop up in the game report on the opposite side of the ball if they have a -6 or less penalty in a position at the other side of the ball and it is in the clutch or overtime. ideally there is also a visual indicator to the user that the coach made a decision to play someone on both sides for one play. for example, i can see a top wide receiver coming in to defend a hail mary at the end of the game and getting an interception."

## Design (Owner's words used verbatim where possible)

### Trigger conditions
1. **Penalty threshold:** -6 or less in a position on the other side of the ball. (A player's penalty at a position means they are rated that much worse there. -6 means "bad but not catastrophic" — enough that it's a real disadvantage, not an automatic disaster.)
2. **Window:** clutch or overtime only. No cross-side use outside those windows.
3. **Random pop-up:** the player "can randomly pop up" — this is probabilistic, not deterministic. The engine rolls; if the roll succeeds, the player appears on the other side for one play.
4. **One play:** "play someone on both sides for one play." The cross-side appearance is a single play, not a permanent position change.

### Visual indicator
- Text: "2-WAY" (Owner's preference: "yes but maybe just '2-WAY'").
- The indicator should tell the user that the coach made a decision to play someone on both sides for one play.
- Placement: on the play in the game report / recap, and possibly on the field visualization if one exists.

### Example (Owner's verbatim)
"A top wide receiver coming in to defend a hail mary at the end of the game and getting an interception."

### Which positions can flex to which
- QB → FS already exists (at -10, Owner ruling REV 4).
- This feature extends the concept: any player with -6 or less penalty at an opposite-side position can randomly appear there in clutch/OT.
- The flex pricing (the 99 rules) stays consistent (Owner ruling). The cross-side appearance is priced by the existing flex table, not a new price.

### Implementation notes
- The engine already has `flexPenaltyFor` and `effOvr` — the penalty threshold (-6) is a new constant but follows the same pattern.
- The random pop-up should use the keyed RNG (Philox, counter-based) so it is deterministic given the seed.
- The visual indicator is a UI concern (the engine emits an event; the UI renders "2-WAY").
- This is a design note, not a build. The Architect decides when to implement.

### What this is NOT
- Not a permanent position change. One play only.
- Not a new flex rule. Uses existing flex pricing.
- Not available outside clutch/OT.
- Not a guarantee — it's random.

EVIDENCE: VERIFIED (Owner ruling, 2026-11-13, relayed to Beam in chat).