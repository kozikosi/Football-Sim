# UPDATE-README-w52 — the Owner's round-52, shipped whole

Product: `Football-Sim-Z-post-blue-w52.html` · md5 `40613b81de26b5ed9c67bdcc0637ac6f` · 1,585,036 bytes
Base: the w51 bytes `e40732a2…` (1,571,506 B). Received 2026-11-01 · one directive, fifteen moves.

Thank you for the word on the playoff cinematics — they ride, and the Super Bowl got the same
treatment twice over this round.

## The moves, as built

**M1 · THE SYNC (the session's main work).** The delay you saw between WHERE YOUR PLAYERS LINE UP?
and the player cards underneath was a real bug: the look-gate's sync walk filtered the card groups
by `:not([data-zseen])` — but `data-zseen` means OBSERVED, not SEEN — so the walk matched nothing
and released zero groups. The map cascaded the moment you looked at it; the cards waited for their
own scroll. That is exactly your "activated by user motion" read. The fix: when the map is seen,
every breakdown group and depth zone in scope releases on the map's EXACT clock (one value, one
sweep, plus a 900ms failsafe re-sweep on the same value); the mirror law holds too — if your eye
reaches the cards first, the map releases on the cards' clock. Skipping the finale releases the
depth zones as well (they kept a baked delay before). Verified per-beat: station↔card pairs land
on the same beat (max |Δ| 60ms across a 30-beat cascade), phone included, reduced-motion included.
· tools/w52_syncbattery.js — 10/10.

**M2 · The Q + time in the quarter reads the neutral color that changes with the team** — the same
`var(--text)` the word FINAL wears at the top of the during-game scene. The w50/w51 cream law is
retired by your own words (the `--zcream` !important rule is gone; the token survives unused).
Under the takeover the clock rides the team's ink like every neutral word.

**M3 · Coach of the Year reads YOU** when your team wins it (the coach's name becomes YOU · Team),
and the "led them to N wins against M projected from the roster's own ratings" sentence is gone —
the projection and the record stay as badges.

**M4 · The awards wear the position as the FIRST badge, "#X Y"** — X is the player's rank at their
position by rating, Y their position (MVP, OPOY, DPOY, every playoff award card). The plaintext
position that sat right below the name is removed everywhere.

**M5 · Only solid borders for the badges.** The dashed border on the targets/catches and
throws/completions box is retired (`.zpb-splain` paints nothing now).

**M6 · Statistical champions** — "Scrimmage" is gone from Scrimmage Touchdowns (the title reads
Touchdowns), and EVERY champion carries his badge row beside him, the stat he won leading the row
(Passing Yards leads with PASSY, Sacks with SK, Return Yards now has a RETY badge at all, the
kicker's FG leads, and so on).

**M7 · The matchup math bars** — the red-on-red is gone. The bar TRACK rode `var(--border)`, which
the team takeover repaints as the franchise hairline (a red track under a red 49ers fill). The
track is now a quiet ink wash that never rides the takeover, and the home bar fills from ITS outer
edge toward the middle — a face-off read that survives even same-hue pairs (49ers vs Chiefs).
Swept ALL 32 teams in BOTH themes: 64/64 pairs clean. · tools/w52_evidence.js.

**M8 · "the league's top-rated QB profile, carrying … to … wins" is removed** — the MVP card
speaks in badges now, like the other awards.

**M9 · Advanced stats** — every "/ g" reads "per game" (Touchdowns per Game, Field Goals per
Game, Return Yards per Game, Points per Game, Total Yards per Game, Takeaways per Game, and the
glance tiles), and every advanced-stats number wears the SAME ink — the good/bad state lives on
the card's border now, never on the digits.

**M10 · "…isn't in the featured game of the round · here is the one everyone is talking about"
is gone.** The featured game speaks for itself.

**M11 · On a wild-card bye, the top game is your most likely opponent** — the lowest seed playing
that week (the 2v7 game for the #1 seed; the #7 winning is the single most likely way they become
your divisional opponent). Eliminated or missed teams still see the best-rated matchup.

**M12 · THE SUPER BOWL — you actually see it played now.** The w33 law that skipped the
during-game cinematic for the Super Bowl is retired. When your team is in it, the during-game
cinematic OPENS first and the winner storm WAITS for the final whistle (the storm was mounting in
the same paint as the page before — the fix holds it behind a dedicated gate that the whistle
releases). And the pregame dresses up: a gold cup rises over the crests with a breathing halo,
the LIVE FROM THE CHAMPIONSHIP banner with floating diamonds, three gold bursts, FOURTEEN embers,
and a double camera-pop at the last breath before kickoff. Between the halves, the game earns a
HALFTIME SHOW — a stage card with two sweeping lamps, shimmering gold lettering, rising diamonds:
"HALFTIME SHOW · THE MARCHING GOLD · LIVE FROM THE STAGE".

**M13 · The wild-card bracket @** — the un-played card now reads its own width: a compressed card
stacks the @ on its OWN line between the two teams; a roomy card lays @ AND both teams on ONE
line. Per-card container queries, so the 7-column desktop tree and the stacked phone tree both
get the right shape automatically.

**M14 · The unit report card is unit analysis** — no player is singled out. The backs read as ALL
backs ("1,842 rush yds · 12 TD · 401 carries (all backs)"), the corps as the whole corps
("(whole corps)"), and the kicker's numbers carry no name — "26 of 31 FG · 34 XP".

## Verify (this wave's proof)

- `tools/w52_syncbattery.js` — 10/10 · the M1 sync in every scenario (pairs ≤ 60ms, below-fold
  release, phone viewport, skip-the-finale, the mirror law, depth zones, reduced motion).
- `tools/w52_live.js` — 30/30 · M2 (clock ink = var(--text), cream retired), M3 (the sentence
  gone), M4 (every award leads #X Y, zero plaintext positions), M5 (solid chips), M6 (champions'
  badges + the Touchdowns title), M7 (track ≠ hairline, face-off anchor, both themes), M8/M10
  (the removals), M9 (per-game labels, one ink for every number), M11 (the bye picks the lowest
  seed), M12 (the SB replay OPENS first, the storm waits, the halftime show takes the stage, the
  whistle hands the screen over), M13 (the @ rule per card width, desktop and phone), M14 (all
  backs, nameless kicker).
- `tools/w51reg_live.js` — 25/25 · every standing law held (the draft inks, the dot law, the
  NICKEL/DIME one-row law, the gold continue pill, the beneficiary colors, the per-key-player
  flashes, the +16px title, the shimmer and the velvet). R1a is REWRITTEN to the w52 law — the
  old "the game time stays cream" assert is retired by your own words (see the ledger veto).
- `tools/w52_evidence.js` — 64/64 · all 32 teams × both themes: the track never rides the
  hairline, the fill always separates. Evidence shots in `notes/evidence/`.
- `tools/w52_mobile.js` — 5/5 · 390px: no overflow, and the map look releases every card group.
- `tools/w52_nodecheck.js` — 12 script blocks parse clean · zero pageerrors across all batteries.
- Product: md5 `40613b81de26b5ed9c67bdcc0637ac6f` · 1,585,036 bytes.

## Retirement notes for the next session

1. The w50/w51 cream law (.zrl-t with --zcream !important) is RETIRED by the Owner's round-52
   words. The clock and the quarter chip ride var(--text) — never re-widen the cream.
2. The w33 (R34) law "the Super Bowl does not open the during-game cinematic" is RETIRED — the
   game leads when the user is in it; the storm follows the whistle. SIM PLAYOFFS still runs
   quiet (the run cine → storm path is untouched).
3. The w51 regression battery's R1a is rewritten accordingly.
4. The look-gate sync walk now means: data-zseen = OBSERVED, zpb-seen = SEEN, and the map's look
   releases EVERYTHING in scope on one clock. Never filter a release by :not([data-zseen]).
