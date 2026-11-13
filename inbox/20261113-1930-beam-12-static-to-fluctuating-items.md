SPEAKER: beam | ROLE: council | TASK: 12 static-to-fluctuating items (re-sent for Owner approval) | DATE: 2026-11-13T19:29Z
FOR: P-345

## Owner's clarification (verbatim, 2026-11-13)

"All of these can fluctuate but ovr, and flex prices should be static to the user. the underlying math can be more flexibible. form for players should generally drift +- 5 during the course of the season."

## What this means

- **OVR is static to the user.** The displayed OVR number does not change. The underlying engine math can vary (e.g., a player's effective rating in a specific matchup can differ from their displayed OVR), but the user always sees the same number.
- **Flex prices are static to the user.** The displayed flex cost (0/2/6/12) does not change. The underlying pricing math can be more flexible (e.g., the engine can compute a more nuanced flex cost internally), but the user sees the same tier.
- **Form IS visible.** Players' form drifts ±5 OVR during the season, shown as a green/red arrow. This is the exception — it's the one fluctuation the user sees.
- **Everything else fluctuates internally.** The engine's math can vary by context (opponent, game state, rivalry, playoffs, key players, aggressiveness, dominant groups) even if the displayed numbers stay fixed. The user sees consistency; the engine sees dynamics.

## The 12 items (with the clarification applied)

**1. Slot values (`slotWinsPerOvr` / the 32-spot table)**
- Displayed: static (the user sees the same Wins/Priority).
- Underlying: fluctuates by opponent strength, division, stakes.
- Test: per-opponent slot value vs the single measured value.

**2. Flex prices (the 99 fixed tiers: 0/2/6/12)**
- Displayed: static (the user sees the same flex cost).
- Underlying: the pricing math can be more flexible internally.
- Test: flex cost distribution under context vs fixed tiers.

**3. Drive model parameters (BASE_PTS, HOME_FIELD, PTS_NOISE, transition probabilities)**
- Displayed: not directly visible (internal engine params).
- Underlying: fluctuates by opponent strength, game state, rivalry, playoffs, key players, aggressiveness.
- Test: points/drive distribution under context vs fixed.

**4. Home-field advantage (fixed 1.7 pts)**
- Displayed: not directly visible.
- Underlying: fluctuates by rivalry, playoffs, opponent.
- Test: home win rate by game type.

**5. Player ratings / form**
- Displayed: OVR is static; form drifts ±5 OVR, shown as green/red arrow.
- Underlying: form (hot/cold) fluctuates by own production, standardized against league-at-position.
- Test: season-to-season and week-to-week variance of effective OVR.

**6. Group synergies**
- Displayed: not directly visible (internal).
- Underlying: fluctuates by group composition and opponent.
- Test: group-level contribution vs sum of parts.

**7. Gravity / double-teams (static measured index)**
- Displayed: not directly visible (internal, but surfaced in Advanced Stats).
- Underlying: fluctuates by situation (close game, weak CB1, rivalry, key player).
- Test: double-team rate by game state.

**8. Calibration targets / "skilled drafter"**
- Displayed: not directly visible (internal test measure).
- Underlying: fluctuates by division, roster, pool.
- Test: path-dependent outcomes vs fixed class.

**9. Game state / clutch**
- Displayed: not directly visible (internal, but surfaced in recap/clutch visual).
- Underlying: fluctuates by score, clock, rivalry.
- Test: win probability by game state.

**10. Noise / variance (fixed distribution)**
- Displayed: not directly visible.
- Underlying: fluctuates by rivalry, playoffs, key players out.
- Test: variance of outcomes by game type.

**11. Draft slot value (fixed)**
- Displayed: static (the user sees the same Wins/Priority).
- Underlying: fluctuates by pool strength and team needs.
- Test: pick value by draft class strength.

**12. Flex legality (fixed rules)**
- Displayed: static (the user sees the same flex options).
- Underlying: fluctuates by context (a CB playing WR in a Hail Mary is real; illegal in normal game, legal in emergency).
- Test: legality by game state.

## Approval request

Owner: please approve or reject each item. If you approve, I'll file them as positions for the council. If you reject, I'll note it. If you want to modify any item, say so.

For the ones you already answered (form drifts ±5), I've incorporated that. For the others, the default is: displayed numbers stay static, underlying math fluctuates. Confirm or adjust.