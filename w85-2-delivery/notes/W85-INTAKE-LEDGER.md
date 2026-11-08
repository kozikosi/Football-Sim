# W85 INTAKE LEDGER — the Owner's words, verbatim, mapped line by line

**Chat:** 2026-11-08 · **Base:** the newest build my sandbox can reach — `council/zai` tops out at **w55**
(2026-11-02, md5 `49161f11…`). Waves **w56–w79 were never pushed to GitHub** and no update zip is in the
chat's download area, so **every feature from that stretch is rebuilt fresh from your words** and flagged
⛔ below for your veto. Your w85 directives, in order:

---

## W85-1 · the hover banner for EVERY next-stage button (⛔ rebuilt fresh)
> "I really like the banner that allows you to select the banner for 'Begin playoffs' that hovers at the top of the screen no matter how far down you scroll. Please implement this for every button that leads you to the next stage of the season; or if you are on the guide page or one of the footer pages, you should see 'Back to x' where x is whatever stage of the season the user is currently in, 'Draft' 'week x' 'wild card round' etc"

**Ships:** a fixed stage banner (top center, survives any scroll depth, sits under the game cinematics):
- on a season page: `NEXT · <stage>` + the stage's own next-door button (Begin the season / Play the <opp> /
  Continue to Week N / Continue to Regular Season Review / Begin Playoffs / Play the <opp> / Continue to
  <round> / Season Review / The Champion).
- on the Guide and every footer tool (Madden Rankings, Player Browser, Position Rankings, Team Comparison):
  `BACK TO · <stage>` + **Back to <stage>** — stage label = Draft / Preseason / Week N / Regular Season
  Review / Wild Card Round / Divisional Round / Conference Championship / Super Bowl / Season Review.
- hidden on the homepage (the draft setup IS the door) and when no season state exists at all.

## W85-2 · a stage transition lands at the TOP of the new page
> "currently when you hit the begin playoffs button in the banner and it works, then the user is on the same vertical level of the new page that they were on the previous page. They should instead be at the top of the new page."

**Ships:** every stage-advance button (page buttons AND banner buttons) scrolls to the top after the render —
Begin the season, Play the week, Continue to Week N+1, Continue to Regular Season Review, Begin Playoffs,
Play/Simulate the round, Continue to <round>, Season Review toggles, Back to <stage>, banner CTAs.

## W85-3 · the playoff seed reads `<conference> #<seed>` in Cinzel Decorative, in the team's colors
> "In the playoffs in the matchup panel at the top of the game preview page 'Seed #7' should change to 'x #y' where x is the conference and y is the seed. This should also be in a beautiful cinzel decorative font that corresponds to with ateam's colors."

**Ships:** `Seed #7` → **`AFC #7`** (both sides, every playoff matchup panel), Cinzel Decorative, riding each
team's halfway ink (`--tn` light / `--tnd` dark) — the same one-ink law the team names follow.

## W85-4 · full player names on the game preview, smaller stat badges
> "Stats in the game preview page are cutting off the names. The stat badges need to be made smaller and names like this 'Brock Bowe' should be impossible. I am looking at this in a full size window on my desktop. No reason not to have the full names present on the game preview screen."

**Ships:** the preview's stat badges shrink (font, padding, tracking); the name block takes the wider share
of the card (flex 1.7 vs the badges' 1), the rating block narrows, and the name may wrap but may **never**
clip — verified in a real browser at 1280/1440/1920 with the longest names on the board.

## W85-5 · the pregame cinematic's key players fit the main panel
> "On the playoffs during the game pregame cinematic, the final set of key players is slightly obscured by the bottom of the panel. Feel free to make the initial panel larger, both horizontally and vertically, and make sure that the key players fit into the main panel."

**Ships:** the replay panel grows to 920px wide and its stage grows to 425px min-height; the star lanes rise
(78→71, 66→62) so every pair, top to bottom, clears the footer — verified on playoff and Super Bowl games.

## W85-6 · no null card in the draft pick grades
> "If for some reason a player didn't select a te1; — which should be impossiblee first of all — this card with null values should not appear in the draft pick grades TE1 F · · · #32/32"

**Ships:** a slot with no drafted player prints no row at all — the `TE1 / F / · / · / · / #32/32` card is
impossible now, in every panel that carries the grades table.

## W85-7 · the autosave saves per week, and the return bubble lands on the RIGHT page (⛔ feature rebuilt fresh — it was lost with w56–w79)
> "The autosave feature is not dsaving per week because I completed a season, hit new draft, and then the bubble to return to season popped up and dumped me in week 2 instead of on the season review page. Fix this glitch."

**Ships (the whole feature, with the glitch designed out):**
- the season autosaves to `zpb:season` after every week, round, lineup change and stage change (size-guarded;
  old game details trim and rebuild on demand so 17 weeks + playoffs always fit).
- a fresh tab shows the bubble: *A saved season is waiting — <stage>* · **Return to your season / Not now**.
- the restore lands on the **exact saved stage** — a completed season restores to the Season Review page,
  week 9 restores to week 9; never a fixed week 2.
- NEW DRAFT and a new draft setup **clear the save**, so no bubble can resurrect a dead season.

## W85-8 · a well-defined box score border + the Cutdown Day panel (⛔ panel rebuilt fresh — the w56–w79 design wasn't recoverable)
> "I would like a more well defined border around the box score and what happened to the cutdown day panel; I don't see it in the latest version. You already built it and improved upon it over two two or three waves."

**Ships:** the linescore wears a double frame (2px rosehair + inner hairline ring + a soft drop), both themes.
The **Cutdown Day** panel returns to the preseason page, rebuilt on the sim's real mechanics: all 32 slots
audited (drafted-in / OPEN / flexed out of position, with the flex cost), the model's placement advice, and a
one-click jump into the lineup editor. **The final 32 are final at kickoff** — the panel is the last look.
⛔ Your veto welcome: if the lost panel did something different (cuts, a 53-man wire, practice squad), say the
word and it becomes the next wave's first item.

---

## Base-gap note (one line, per the START-OF-CHAT fallback law)
w56–w79 never reached this sandbox (GitHub's newest is w55; no zip in the download area) — w85 builds on w55
with all eight directives implemented fresh; anything those waves touched that I could not see may need your
veto alongside the two ⛔ items above.
