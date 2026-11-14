# Cross-side stars ("2-WAY"): design only (written 14 Nov 2026; filename matches the link in the 13 Nov rulings record)

Design, not code. Football only (ruling 4). Labels: VERIFIED / REPORTED / INFERRED / UNKNOWN. Sources: rulings 13, Q8-Q10 in `claude/rulings/2026-11-13-owner-decisions-multisport-batch.md` (QUOTED values are relayed, not the Owner's original text).

## Rule (as relayed)
Any player may appear on the opposite side of the ball when his price at an opposite-side position is 6 or less, in the clutch window only (final 5 minutes of the 4th quarter plus overtime, the Owner's 11 Nov definition). The CPU gets the same call. The user sees a terse **2-WAY** badge. Examples the Owner gave: a top receiver defending a Hail Mary and intercepting; a star defender rushing as the fullback on 4th and goal.

## What I will NOT do
Author any new price. Flex prices stay consistent (ruling). Eligibility is read from the existing flex table: a role may cross only if `fit(role, dest)` is legal, not an emergency fill, `penalty <= 6`, and `dest`'s unit differs from the player's own unit (slots carry `unit` and `dest`: VERIFIED in `value.ts`). A role with no such row never crosses. Whether the table has many cross-unit rows is UNKNOWN: my 13 Nov record says the lineup test asserts "DT plays FB free", so at least one exists (REPORTED from my own record, not re-read today). First deliverable when built: a read-only script listing every eligible (role, dest, price) row, for the Owner to see.

## Mechanism
- **One personnel node**, evaluated only inside the window, once per snap: with probability `p2w(x)` the coach considers one swap for the current unit. Candidates are roster players eligible at some `dest` of that unit. He is chosen by effective OVR there (`ovr - penalty`), and swapped in only if it **raises the duty group's gap** over the incumbent (a coach would not do it otherwise). A team's unit is on the field one play at a time, so nobody is on both sides simultaneously; "both sides" means across plays.
- `p2w(x)` is a **DIAL** (no data identifies a rare, discretionary move), default chosen by the Owner, never presented as measured. Optionally scaled by the leverage index (plan v3 3.5) so it is likelier at higher stakes.
- **Hail Mary** is a pass-node variant: trailing, last seconds, long distance. The defence's interception chance tilts by its best eligible contested-ball defender through the existing coverage duty. Also a DIAL; rare enough that data will not pin it.
- **Randomness:** keyed on (game, play, 'twoWay'), so the same game replays identically and a counterfactual shares draws.

## Events and display
Event `twoWay {play, team, pid, from, to}`; a fold lists them for the box score and recap. UI shows a flag and the text `2-WAY`. All user-facing values stay strings (store contract). The visual treatment is Z.ai's.

## Gates (plan v2 section 3)
1. **Off-switch equals baseline:** `p2w = 0` reproduces the baseline log hash bit for bit. 2. **Mean preservation:** league totals outside the window do not move; inside it, movement is reported. 3. **Label:** DIAL.

## Registry entry (plan v3 3.4)
`id: twoWay.clutch`, slot `w` (duty weights), label DIAL, test NOT_RUN, default `p2w = 0`, display STATIC (badge only).

## UNKNOWN
How many eligible rows exist; how often the Owner wants it (his dial); whether the badge needs a per-play replay view.
