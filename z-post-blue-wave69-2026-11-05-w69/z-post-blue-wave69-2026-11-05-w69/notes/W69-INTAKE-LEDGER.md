# W69 INTAKE LEDGER — the Owner's directives, verbatim, item by item

Source: the Owner's chat message (2026-11-05 HST, w69 round — six items).

Baseline: `Football-Sim-Z-post-blue-w68.html` md5 `22bc00ab8cc244da7ba8030a5a67c8da`
· 1,796,935 B (gh-pages `Football-Sim-Z-post-blue-w68.html` + the wave-68 package copy,
hash-verified against the beam push note at chat start).
Reachability note: council/zai still topped at w55; the live `gh-pages` branch carried w68
(the §1 fallback chain — gh-pages FIRST, the w67 lesson holding).

## The Owner's items

> 1 · "While playing with the steelers, the final 'Try again to go 20-0?' Button; it is hard
> to read the 20-0 because it is gold on a yellow button. Not sure what the best color fix
> is but please fix."
- The Season Review's closing pill (`TRY AGAIN TO GO <b class="zpb-shine">20-0</b>?`,
  `.resetbtn.zpb-ctabig`) paints its label in the on-gold ink — but the `20-0` carries the
  gold shimmer gradient (`.zpb-shine` → var(--g1..g5), the team's own golds under the
  takeover) ON the team-gradient button (tG5→tG2→tG4 — for the Steelers, golds). Gold on
  gold. Fix inside the ctabig scope only: the `20-0` keeps its shimmer sweep (the
  celebration signal, commandment 4) but sweeps the ON-GOLD INK FAMILY (var(--tOn) — the
  deep coffee the pack computes as readable on the team gradient — through a lightened step
  of itself), never the gold ramp. Falls back to solid var(--tOn) without background-clip.

> 2 · "While playing with the Browns, it's almost impossible to read the where your players
> line up names and positions in dark mode. It's a super faded dark color text. I don't like
> it. Needs to be a better color contrast. Again, please check all teams in light and dark
> mode to ensure readability."
- The WHERE YOUR PLAYERS LINE UP? field map (zpbBelongMapHTML). Root cause (probed):
  the ink `--fmink/--fminkd` is computed against the SOLID bubble colors (#e8c87e gold /
  pk.acc3D team third accent) — but the bubbles PAINT at 16-18% color-mix over the page
  panel. In dark mode the real surface is the dark panel under a whisper of tint, while the
  ink was chosen to read on the SOLID light color → the dark browns (#3a2a14 / #241407)
  land on a dark surface. The Browns' acc3D makes it worst (dark-on-dark). Fix: compute the
  ink against the EFFECTIVE composite paint (bubble color at its real alpha OVER the live
  panel color), light and dark, every team — and audit all 32 × 2 in the battery.
  The offense bubble's reference also ignored the takeover (it read the fixed gold while
  the paint rides the team's --g2): the composite solve fixes both sides at once.

> 3 · "On the player cards on the draft review page, not every player's name should be gold
> and shimmering. Only 90+. 85+ players bold and the rest normal in their team's neutral
> 0.50 color."
- The draft review's card surfaces must read the tier law exactly: the shimmer (zpb-shm)
  ONLY on 90+; 85+ bold (zpb-vib); everything else the team's neutral 0.50 ink (txM light /
  txd dark, the zpbNeutralRowVars law). Probe first: find every card surface on the draft
  review page whose names do not follow the ladder (the Owner saw every name gold +
  shimmering), then land the law.

> 4 · "On the drop-down on the preseason page under 2. And 3., the words auto and balanced
> are super far aligned to the left so much that the first letter slightly disappears off
> the left side. Please align a little better."
- Section 2 (Coaching philosophy): `#scriptOff` / `#scriptDef` — "Auto (recommended): …"
- Section 3 (Game-day aggressiveness): `#aggrSel` — "Balanced / Aggressive / Conservative…"
- The native selects' selected text clips off the LEFT edge. Probe the live geometry
  (clientWidth vs scrollWidth, the flex squeeze), then fix the alignment (measured padding,
  min-width floor, or the select's own box — never a hand-wave).

> 5 · "Try to apply color design principles and cinzel etc to all dropdown player names.
> You did a great job with the hover btw. Please take the time to test and search through
> every dropdown menu."
- The custom dropdown family (zpbEnhanceCmpSel / zpb-slotdd / zpb-slotpop — Cinzel type,
  the team's own 0.5 inks, the hover wash + glide) is the house style; the compare dropdowns
  already wear it. Inventory EVERY dropdown in the file (all 13 native selects + the
  enhanced family), find every dropdown whose options are PLAYER NAMES, and bring them into
  the family: Cinzel type, the per-player team ink (the user's franchise ink — they are all
  his players), the same hover the Owner praised. Test every dropdown open + hover + select.

> 6 · "On the all playoff team awards and the any awards, please use the team logos instead
> of writing out the team names. Not sure if the logos should go before the names or after.
> I'm leaning before. Whatever looks best."
- The All-Playoff Team chips write `nick(team)` ("Steelers") after the name — the crest
  replaces the written team name. The award surfaces that still WRITE team names: the
  Coach of the Year line ("YOU · Pittsburgh Steelers" / "Andy Reid · Kansas City Chiefs")
  and the playoff round cards' score sub lines (full team names around the score). The
  All-Pro / Pro Bowl / SB-MVP crests already lead (w47) — the crest goes BEFORE the name
  everywhere (the Owner's lean, and the established chip law). Fallback to the written
  name only when a crest does not exist.

## Build contract
- Baseline: `Football-Sim-Z-post-blue-w68.html` md5 `22bc00ab8cc244da7ba8030a5a67c8da` (asserted every run).
- Generator: the `zpb_w69*.py` chain — asserted exact replacements + payloads + post-checks;
  regenerated from the pristine baseline on every fix; never hand-edit.
- Batteries: the standing suites re-pointed at w69 + a new `w69_owner.js` for this round's
  items + the all-teams field-map ink sweep (32 teams × 2 modes, the map's composite solve)
  + the dropdown sweep (every select inventoried, enhanced faces + pops measured).
- Delivery: `z-post-blue-wave69-2026-11-05-w69.zip` + the loose HTML, download area
  first-class, the WAVE/CLAIMS header at the top of the shipped file.
