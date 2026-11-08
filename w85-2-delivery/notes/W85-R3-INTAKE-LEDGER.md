# W85 ROUND-3 INTAKE LEDGER — the Owner's words, verbatim, mapped line by line

**Chat:** 2026-11-08 · **Base:** w79 — the gh-pages pin (`Football-Sim-Z-post-blue-w79.html`,
1,836,431 B), the newest wave ever pushed and the build the Owner calls "w78". The rejected
w85 (a w55-based rebuild that lost the w56–w79 features) is **retired**; its surviving systems
are ported onto the w79 base, so the best of both now lives in one file.

**Build:** `Football-Sim-Z-post-blue-w85.html` · md5 `eb91abd22f335e34f6898dcff5e6dde6`
· 1,864,914 B · battery **24/24 PASS**, console clean, light/dark, desktop and phone.

---

## R3-1 · the base recovers everything the Owner named (the "w78" merge, done for real)
> "I am not happy with this w85. you've clearly left out a lot of features like the draft command center that were present in w78… Compare it to w78 and then make positive changes please."

**Ships by the rebase itself** — the w79 base carries, verified by the battery and screenshots:
- **DRAFT COMMAND CENTER** (w75/w76): every room below a B best-to-worst in the unit report
  card's own cards, no bar graph; CUTDOWN DAY centered Cinzel Decorative; every player under all
  three lines (below 80 OVR · Kicker or higher on the win math · a season under the median line)
  with the pulsing CUT badge; the OVR badge beside the position badge; the season rating beside
  it; "PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO **20-0**" with the 20-0 shimmering in the
  team color; none of the retired lines ever prints (verified 0 hits).
- **The rating scale** (P12): every displayed rating = the drafted pool's median OVR + (rating −
  the season mean); "-x vs his x OVR" retired; the Guide explains the scale.
- **SIM PLAYOFFS** (w47/w66): no during-the-game panel, ever; **one full-screen cinematic page
  per round the user's team plays** — win → ONE STEP CLOSER, Continue → the next round; loss →
  SEASON ENDS, THE RUN ENDS HERE, Continue → straight to the Super Bowl page (screenshot s09).
- **ALL / CLEAR pill buttons** (w73): reshaped pills, set apart, quiet — the exact shape the
  Owner praised (battery: border-radius ≥ 12px verified).
- **The chip law** (w75): every chip off = the full board; chip on = that group; ALL = all on;
  CLEAR = the default. The selected chip is FILLED in both themes.
- **Fills** read `x (-y)` (w75) with no "flex" wording; the board never side-scrolls (the wrap
  is overflow-x:hidden — patched this round).
- **OFFENSIVE GUARD** in the draft board dropdown (WV_NAMES) and the depth-chart labels.
- **TE3, DIME, WR4, DL5, FB, K, P** all rank in the Guide's win-math visualization (w75).
- **txM60** — the 0.60 team ink for award text in light mode (w75); dark keeps 0.50.
- **BACK TO <STAGE>** top and bottom of the Guide and every footer tool (P13) — this round the
  label carries the exact stage (REGULAR SEASON REVIEW, the playoff rounds, SEASON REVIEW) and
  the click lands at the top of the season page.
- **"2 point conversion"** spelled out on the preseason page and the dropdown; in-season badges
  keep 2-Pt. No "(x teams run it)" anywhere. SIM SEASON wears the SIM GAME ghost.
- **No Cutdown Day panel on the preseason** — the Cutdown Day lives ONLY in the Draft Command
  Center (verified: preseason page innerText carries no Cutdown Day).

## R3-2 · the banner waits for the page's own button (the Owner's scroll law)
> "please make sure that the banner at the top of every page doesn't appear until the user scrolls below the same button that would be available at the top of the page normally."

**Ships:** `#zpb-stagebar` is gated by an IntersectionObserver on the page's own equivalent
next-stage button (Begin the season / Play the week / Continue to Week N / Begin Playoffs /
Play the round / Continue to <round> / Season Review / The Champion) and, on the Guide and the
footer tools, on the page's own top BACK TO <stage> bar. While that button is on screen the
banner is hidden; the moment it scrolls out of view the banner appears (battery: both verdicts
verified). The homepage (the draft setup) never shows the banner.

## R3-3 · the cutdown panel leaves the preseason
> "Remove the cutdown day panel from the preseason. Makes no sense."

**Ships:** the preseason page carries no cutdown panel; the Cutdown Day lives only inside the
Draft Command Center on the Season Review.

## R3-4 · the lineup changer never says "…"
> "Make sure that player names in the lineup changer don't change to '…'. The format should just change to fully vertical like you have in a super small box but that transition to full vertical should happen as soon as the full player names can no longer be shown fully."

**Ships:** `zpbFitLineupVertical()` measures the closed box's selected name against the row's
geometry on every render, every change, and every resize (canvas-measured, theme-font aware).
While the full name fits, the row stays horizontal. The moment it would clip, the row goes
FULLY VERTICAL — slot name on its own line, the name box full-width beneath, the OVR beneath
that — and if even that is too tight the box's type steps down one size. It returns to
horizontal as soon as the name fits again. The closed box's ellipsis is disabled for the
changer's boxes (`text-overflow:clip`). Battery: at 340px every closed name fits whole and the
rows demonstrably switch; at 1440px they return.

## R3-5 · the preview's key players keep their teams apart on a phone
> "In a small mobile screen, the key players in the game preview screen are intermingling again. Please make sure that each team's players remain separate."

**Ships:** the preview's stars render as two TEAM SIDES (`.zpb-pvside` away/home). On a desktop
the grid pairs the same cards across, one row at a time, exactly as before. Under 640px the
wrap stacks: the away five under the away crest+name, then the home five under the home
crest+name — the two teams can never interleave (screenshot s13).

## R3-6 · SIM PLAYOFFS is the w78 door, untouched
> "The sim playoffs button is not good. You had it perfect in w78. Just reuse the same code from w78. The during the game panels should not show up after hitting sim playoffs. There should be one page that looks just like the superbowl cinematic but is for every round for your team. If you win, then you click to show the next round cinematic. If your team loses, then the next click goes straight to the superbowl."

**Ships:** the w79 door itself (verified above) — the battery plays it end to end: first round
cinematic, no `.zpb-replay-ov` during-game panel, the Continue gate through the story, the run
ends at the Super Bowl screen.

## R3-7 · the w85 systems that survive, ported onto the true base
- **The stage banner** (NEXT · <stage> + the stage's own door; BACK TO · <stage> on the tools)
  with the R3-2 scroll gate. The banner follows startSeason too — the season door repaints it
  and lands at the top.
- **The autosave** (`zpb:season`): after every week, round, lineup change and stage change;
  old game details trim and rebuild on demand; a 4.3 MB ceiling keeps 17 weeks + playoffs inside
  the browser's 5 MB house. A fresh tab shows the bubble — *A saved season is waiting — <stage>*
  · **Return to your season / Not now** — and the restore lands on the EXACT saved stage. NEW
  DRAFT and a fresh draft setup bury the old save (the bubble can never resurrect a dead
  season). w79's older autosave chip and restore chip step aside (the zpb:season system owns
  the loop end to end).
- **The seed reads `AFC #7`** — Cinzel Decorative, the side's own ink (screenshot s08).
- **The preview badges shrink** (0.6rem chips, the name's flex 1.7) and a name may wrap but may
  never clip.
- **The pregame cinematic runs larger** — 920px panel, 425px stage — the key players clear the
  footer.
- **The pregame star cards go theme-aware**: light mode wears the light team wash with the
  team's light ink; dark keeps the dark stage; every team, both themes.
- **The box score wears the score's border** (`--accent`, w75) — present on the base.
- **The stage-advance scroll resets**: Begin the season, Play the week, Continue to Week N+1,
  Continue to Regular Season Review, Begin Playoffs, Play the round, Continue to <round>, and
  every BACK TO bar and banner action lands at the top of the new page.

---

## Evidence
`_agents/zai/tools/` battery: 24/24 PASS (draft law, pills, seeds, banner gate, back bars, run
cinematics, no null card, no ellipsis, boxless dropdowns, console clean). `_agents/zai/shots/`:
s01 draft board · s02/s03 preseason · s04/s05 preview · s06 pregame cinematic · s07 command
center · s08 AFC #7 · s09 the run · s10/s11 guide light/dark · s12/s13 phone.
