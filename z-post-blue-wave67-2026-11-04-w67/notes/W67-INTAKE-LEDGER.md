# W67 INTAKE LEDGER — the Owner's directives, verbatim, item by item

Source: the Owner's chat message (2026-11-04 HST, w67 round — nine items).

Baseline: `Football-Sim-Z-post-blue-w66.html` md5 `41d2cb10ab3608fcc879816e61e20002`
· 1,780,103 B (gh-pages, the shipped w66 bytes — hash verified at chat start).

## The Owner's items

> 1 · "I would like the size of the two dropdown bubbles on the homepage to be the same size.
> You corrected the sizes at static default, but once the user selects a team, the left
> dropdown becomes bigger than the right dropdown. The solution seems to make them both bigger
> intially and make sure that you run tests and they remain the same size regardless of
> selections."
- The draft-setup pickers (draftSlotSelect = left/team, draftPickNumberSelect = right/pick).
  Root cause (code read): the team box rides `min-width:150px;max-width:none` (content-sized,
  grows to the full team name + logo at >1180px) while the pick box is pinned
  `min-width:190px;max-width:250px`. After a team is chosen the left face grows past the right.
- Fix direction: ONE fixed width for both (bigger than either default), the team face keeps its
  full-name→abbreviation fit law inside the fixed box; battery asserts equality across
  selections (32 teams incl. the longest names) at desktop + mid + phone widths.

> 2 · "The player browser is crazy on a small screen. It is constantly flashing between a
> bigger player panel and a smaller player panel. I prefer the smaller, narrower panel. Please
> keep that smaller panel and get rid of this insane flashing between the two."
- Suspected (probe to confirm): the phone-stacker pass() measures `fits` on the table it is
  about to flip — a measure/toggle feedback loop at the stack boundary re-stacks and un-stacks
  the player table (stacked cards = the bigger panel; the 6-col table = the smaller one), and
  every MutationObserver batch re-arms it.
- Fix direction: break the loop (hysteresis — a table that is stacked only un-stacks on a real
  resize crossing, never on its own measurement), keep the SMALLER narrower panel the Owner
  prefers where the two states disagree.

> 3 · "Separate these two onto two lines like this
> 'RANKING BY THE 7 MOST VALUABLE POSITIONS
> QB + CB1 + DE1 + CB2 + WR1 + DE2 + OT1'"
- The Series subtitle (renderSeriesGroups → #groupCount) currently renders one line:
  "Ranking by the 7 most valuable spots · QB + CB1 + …". The Owner's exact two lines:
  line 1 "RANKING BY THE 7 MOST VALUABLE POSITIONS" (spots → POSITIONS, uppercase),
  line 2 the slots joined with " + ". Applied for every N (the number tracks the series length).

> 4 · "Great job on the FILLS dropdown. Small change: the color of the Font on dark mode with
> the panthers is too dark blue and very faint so it is hard to see. Please write the text with
> the same 0.50 color neutral theme."
- Root cause (code read): the closed fills button `.zpb-slotdd` rides `var(--tTxM,…)`
  (the LIGHT halfway ink) in BOTH modes — no dark swap — so dark-mode Panthers read a dark
  navy on the dark panel. The popup options already swap (zaD = txd, cream).
- Fix: the fills dropdown text rides the neutral dropdown-ink family (the homepage picker's
  ink): light keeps the halfway ink, dark swaps to `--tTxd` (the dark dropdown ink, the
  same family the popup options and the neutral rows already wear). Battery: contrast of the
  closed-button ink vs the dark panel for ALL 32 teams ≥ 4.5:1.

> 5 · "The pace at which the player cards appear on the screen is very erratic. It doesn't
> seem uniform. Let's try one player card for .80 seconds. Match the where your team lineups
> bubble with this speed. Tell me what the pace of the 'The season in badges' is. I like that
> pace. You could use that pace instead of .80 seconds."
- MEASURED ANSWER (code read + CSS): "The season in badges" paces at **0.6s per beat**
  (`.zpb-sbadge/.zpb-scard/.zpb-rcbadge` animation-delay = beat × 0.6s − 0.25s head start;
  the w59 law). The Owner prefers that pace → the player cards go to **0.6s per card**
  (not 0.8s), and the field-map markers + depth rows ride the SAME 0.6s clock.
- Root cause of "erratic": the w66 card clock is 0.3s/beat but the map's non-.zpb-seen
  fallback still rides 1s/beat (w44/w46) — mixed clocks read as erratic. One clock everywhere:
  0.6s per beat, cards → map → depth.

> 6 · "You can't see the text on the player cards for the Jaguars in dark mode, especially on
> the key player cards in the during the game cinematic. Please change to the 0.50 neutral
> color with their team theme. Test every team for this same issue, in light and dark mode.
> The jaguars color used on their matchup math bar graph is also too dark in dark mode.
> Please fix."
- Root causes (code read): (a) the pregame face-off star cards sit on an ALWAYS-dark backdrop
  but their meta line + 90+ shimmer ride the LIGHT-tuned vivid inks (--zrb = accL, tuned for
  the cream page) — the Jaguars' dark teal vanishes; (b) the review Key Players card title
  rides `--zrb` with no dark swap; (c) the matchup-math bar fill rides `--zrb` (light ink) in
  dark mode with no swap to the dark-readable `--zrbd`.
- Fix: the star cards' text reads the neutral halfway family (--tnd, the same ink the plain
  names already wear) with the shimmer sweeping tnd↔cream (readable both modes, team theme
  kept in the tint + the card's gradient); the kp-title and the matchup bars gain the dark
  swap to --zrbd. Battery: all 32 teams × 2 modes, the three surfaces measured.

> 7 · "There is still a kind of medium window size where the third key player in the during
> the game pregame cinematic appears overlaid over the skip button and the bottom line.
> Please try to fix."
- The pregame intro spans to the bottom of the replay box (inset 67px 0 0 0); the third star
  pair sits at sy=78% (82% on phones) — at medium sizes it lands on the footer (skip button +
  its top hairline). Fix: the intro's stage ends ABOVE the footer (bottom inset = the footer's
  height, measured live), so no star card can ever cross the line; sweep many window sizes.

> 8 · "The sim season button is weirdly centered on the page. It should be in the same line
> and right next to 100 seasons. Same for 'sim game'."
- Root cause (code read): the upper line is `justify-content:space-between` with three
  separate groups — NEW DRAFT left, SIM SEASON/SIM GAME centered, BACK TO SEASON right.
- Fix: one left-aligned cluster — NEW DRAFT · 100 SEASONS · SIM GAME · SIM SEASON (· SIM
  PLAYOFFS · BACK TO SEASON) shoulder to shoulder; the 20-0 line keeps the far right.

> 9 · "From the season review page, the 'sim playoffs' button is strangely large than the
> Begin playoffs button. If anything, the sim playoffs button should be smaller than the
> begin playoffs button."
- The review page's SIM PLAYOFFS sits in the w57 big-button law (1rem / 13px 30px, the same
  box as BEGIN PLAYOFFS) while wearing the quiet tabbtn face. Fix: SIM PLAYOFFS leaves the
  big law (the same retirement SIM SEASON made in w65) — it reads clearly smaller than the
  filled BEGIN PLAYOFFS pill. Measured before/after.

## Build contract
- Baseline: `Football-Sim-Z-post-blue-w66.html` md5 `41d2cb10ab3608fcc879816e61e20002` (asserted every run).
- Generator: the `zpb_w67*.py` chain — asserted exact replacements + payloads + post-checks;
  regenerated from the pristine baseline on every fix; never hand-edit.
- Batteries: the standing suites re-pointed at w67 + a new `w67_owner.js` for this round's
  items + the all-teams ink batteries (the fills dropdown, the star cards, the matchup bars —
  32 teams × 2 modes) + the dropdown-equality sweep + the pregame clearance sweep.
- Delivery: `z-post-blue-wave67-2026-11-04-w67.zip` + the loose HTML, download area
  first-class, the WAVE/CLAIMS header at the top of the shipped file (the w66 convention).
