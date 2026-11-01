# W47 INTAKE LEDGER — the Owner's round-47 directives

Base: Football-Sim-Z-post-blue-w46.html · md5 `aca7fe4fbd1ec902a37ad341868cd105` · 1,526,836 chars.
Every line below is his verbatim ask, mapped to what ships. Veto candidates are marked.

## O1 · "In the lineup dropdown menu, only once the user actually clicks… just use last names"
The closed box keeps the full name; the OPEN menu's rows speak last names only
("Stafford", "Smith-Njigba" — particles and suffixes ride along: "Bowman Jr", "St. Brown"),
each with its position · OVR on the right and the full name on hover. Two players sharing a
last name in the same menu keep their full names. Applies to every slot dropdown and the
KR/PR returner list (the one `zpbPickList`, patched at the source).

## O2 · "I still don't love the pink in light mode… make it more golden… most of these players should also be gold and shimmering"
Light mode's ANCHOR chip leaves the rose family for the site's own gold: fill `#f2dee6 → #f4e6c3`,
border `#cfa3b5 → #cfa96b`, the dark-plum ink `#43202f → #4a3410`. Dark mode untouched (`#4d2f3f`,
the one he likes). And the audit's find: the anchored player's NAME inside the chip now follows the
tier law — 90+ shimmer in the constant gold, 85+ bold — the chip was the one surface that never wore it.

## O3 · "Take a long time to do another audit of where you aren't applying the 90+ gold shimmer rule and 85+ bold rule"
`w47_audit_gold.js` walks the live DOM on every player-listing surface — Madden rankings (both
themes), the team detail, the player browser (two pages), position rankings, the team comparison
(both themes), the draft review, the review comparison, the preseason page, the week-1 plan page,
the regular-season review, the season review + awards, the Super Bowl recap — and checks every
visible 90+ name for `.zpb-shm` + the constant gold paint and every 85+ for `.zpb-vib` bold.
32/32 green after the O2 fix. The sweep ships as a verify tool.

## O4 · "The gold and shimmer is still clearly different for the Chiefs than on the Raiders… make the Raiders look more like the Chiefs's gold"
Root cause found: the shimmer swept a gradient with pale bands ACROSS the text — the Chiefs' names
sit right-aligned in their pills, the Raiders' left-aligned, so the two columns read different slices
of the same sweep at any instant. The fix retires the sweep entirely: the 90+ shimmer is now the
CONSTANT deep gold (`--zshim`) with one synchronized GLOW pulse (`zpbshimglow`, the text's own gold
breathing 0 → 16px over 3.4s) — no gradient, no bands, no per-column phase. The Chiefs and the
Raiders wear the same gold at the same moment, on every surface, both themes. The w43 law made
literal. Reduced-motion keeps a static gold.

## O5 · "Does the project default in light or dark mode based on computer settings or the time of day?"
It tried: the CSS media query followed the system, but two unguarded dark blocks (w32/w43-era)
forced dark at boot regardless. Fixed: the unguarded selectors now carry the media guard, so the
site FOLLOWS THE COMPUTER SETTING (his preferred reading); a device that reports no theme signal
at all (the "no time-of-day information" case) boots DARK — pinned by the boot script and kept by
the theme button's init. His saved LIGHT/DARK choice still wins over everything.

## O6 · "The DIME is still not aligned on the draft board… the N of NICKEL should be right about the D of DIME"
The WHERE YOUR PLAYERS LINE UP? map had the dime across the field (x=+3, the right DE's old
station, a w33 request). The dime now stacks DIRECTLY UNDER the nickel (both at x=−3): the N of
NICKEL sits right above the D of DIME, station over station. The Guide's field map stacks the
same way, so the site explains what it draws.

## O7 · "The selected '4-3' or 'Depth chart' on the toggle is hard to see in dark mode… the user would assume they've selected the opposite"
The selected option on the three toggles (4-3 / 3-4, Pick order / Depth chart, Table / Cards)
wore a 12% wash with the deep-gold text — invisible at night. The dark selected state is now a
lit pill: `rgba(217,179,106,.26)` fill, `#ecd398` text, an inset gold ring. The unselected option
stays dim — no more opposite-choice reading.

## O8 · "Just switch the places of the Instant and Slow buttons"
Done — the draft's tabs now read Slow first, Instant second (Slow keeps its active default).

## O9 · "Align the Table/Cards toggle to the top right of its panel"
The draft board's segment now rides the top right of the toolbar (`margin-left:auto`).

## O10 · "The player cards below are not synced with the entering of the players in the visualization"
The YOUR ROSTER tab's Full Depth Chart rows never rode the map's beat at all. Every row now
carries its player's pick-order beat and releases on the map's own look-gate clock — row N lands
exactly when player N arrives on the line-of-scrimmage map. The Dime rides his station's beat.
The law is kept: the line-of-scrimmage visualization itself is untouched.

## O11 · "Remove the squares and triangles visualization from the line up board"
The w46 front miniatures retire from the lineup board at his word — the mount is gone from every
lineup editor. (The DT2-vs-ILB2 math stays in the source; the §veto below covers it.)

## O12 · "What happens when the user switches from 4-3 to 3-4 and hits Apply the Changes? It should probably save that formation preference"
The formation is now a STAGED change beside a lineup editor: clicking 4-3 or 3-4 stages it (the
toggle previews the choice, the pending count rises, localStorage does not move), and APPLY THE
CHANGES commits it — saving the preference, repainting the labels site-wide and re-deriving the
unit ratings. REVERT CHANGES clears it. In the draft sidebar (no editor there) the toggle stays
instant. One fix found by the live suite: a formation-only stage now lights APPLY THE CHANGES up
(it used to stay disabled).

## O13 · "If I switch RB1 with RB2 and hit Apply, a separate button should appear next to Apply — 'Return to Model Lineup' — and an Undo button like the draft board's"
The editor bar reads: ↶ UNDO · APPLY THE CHANGES (n) · RETURN TO MODEL LINEUP · REVERT CHANGES.
UNDO appears after the first applied move and takes back exactly the most recent applied move
(slots AND pick rounds restored) without touching anything else. RETURN TO MODEL LINEUP appears
whenever the applied lineup differs from the math's lineup; it restores the model's lineup (an
undo step is kept, so even the return can be undone).

## O14 · "'Nickel defense focused on the pass' / 'Balanced offense' are too dark for the Broncos in dark mode"
Those captions sat in the team-tinted sub ink (`--tSud`, Denver's ≈ #d29376 on the tinted card —
≈3.4:1). The plan-card captions and the game-plan panel's captions now read the theme's readable
team ink (`--tnd`) in dark mode — for every franchise, checked on the Broncos.

## O15 · "In the during-game cinematic, Denver is a neutral cream… DEN and all of their player's activity and badges should be in their unique 0.50 color"
The w46 halfway law made the dark mode read `txd` — which is 86% cream: every team read the same
neutral. The pack now computes `txMd`, the DARK HALFWAY INK — the mirror of the light law: half of
the way from the dark page ink to the team's crayola anchor, clamped to read on the dark page
(L 0.60–0.86, chroma floor 0.25, a 4.5:1 floor against `#181114`). The whole during-game screen
rides it: play lines, takeaway lines, blocked kicks, last drives, every abbreviation and the
header score chips. The neutral text (the clock, "TO") stays neutral. Denver reads Denver
(#f89a76), the Chargers read the Chargers (#80c8ee) — each team's own 0.50 color, verified live.

## O16 · "Make this final score a little wider within the panel. The team names should be aligned to their respective sides"
The recap's score-line breathes: gap 10px → 18px, padding 14px → 16px 22px, and both team
name blocks are pinned to their own edges (flex-end / flex-start) so the names always hug their
sides of the panel.

## O17 · "These statements on the regular season review page should be indented on separate lines"
The summary line reads with the dot separators ("Denver Broncos · 2 First-Team All-Pro · 1
Second-Team All-Pro · 4 Pro Bowl selections.") and each honor line sits below, indented, one
per line ("Josh Allen · Passing Yards leader").

## O18 · "Transform 'the top non-quarterback on offense, rated 100' into two badges [#1 RB] and [RTG 100]"
Done — the OPOY card wears [#1 <group>] and [RTG <n>] (the rank computed inside the award).

## O19 · "Same with 'rated 96 among the league's defenders (EDGE)' — remove EDGE and replace with whatever position on the depth chart that player played the most"
The DPOY card wears [<depth-chart spot>] and [RTG <n>] — the spot read from the team's slotmap
(the player's most-played slot; DE1 in the live runs), and the card's EDGE tag is replaced by the
same spot.

## O20 · "'Jeff Hafley led them to 12 wins against 8 projected (+4)' should become [PROJ W] and [W]"
Done — the COY card wears [PROJ W <n>] and [W <n>]. The sentence keeps for the stored data but
the card shows the badges.

## O21 · "The statistical champions should also have badges below the names, not plaintext"
Every statistical champion now wears the site's stat chips (the same badges the player cards
wear): Josh Allen [518/784] [66% CMP] [5,096 PASSY] [32 TD] [16 INT] [89.3 20-0]…, the runners
[C] [RUSHY] [TD] [YPC] [RECY]. No plaintext line remains on the champions.

## O22 · "In the first team All-Pro and Pro Bowl awards and all playoff awards, replace the team names with their respective team logos"
The All-Pro and Pro Bowl chips lead with the crest (the team name only as the image's alt).
The honor cards and the All-Playoff panels do the same. The Super Bowl MVP's game line carries
the two crests with the final between them.

## O23 · "If you hit Sim Playoffs from the regular season review, it shows you the Super Bowl winner and then plays the during-the-game for your divisional round. Please fix."
Root cause: every simulated round opened the during-game replay for the user's game — three
replays stacked behind the Super Bowl reveal. SIM PLAYOFFS now runs QUIET (a guard on the replay
opener) and lands straight on the reveal.

## O24 · "Before the Super Bowl shows… a cinematic in a similar format to the Super Bowl but without the gold and confetti that shows what happened to the user's team each round"
The playoff-run cinematics: one card per round the user's team played, in the stage's format —
the round's name, the verdict (DEN WIN in the team's dark halfway ink / SEASON ENDS muted), the
final with both crests, and one line ("ONE STEP CLOSER" / "THE RUN ENDS HERE"). A win gets a soft
team-color wash; a loss stays plain. No gold, no confetti. When the run is told, the Super Bowl
storm mounts. Reduced motion skips straight to the stage. If the user missed the playoffs, the
reveal comes directly (his "if they are in the playoffs").

## O25 · "Remove this text: 'Awards, stats, your report card and how the season was decided'"
Retired at the source — the season-complete topbar now carries only the Season Review button.

## O26 · "In the Super Bowl box score, only the final numbers are colored… correct the F scores so they look like everything else. Check for all box scores at every stage."
The linescore's final column wore the vivid `--tA2` while every other number read the faded
0.50 tone. The final column now reads the same ink as the rest (light `--tn`, dark `--tnd`),
bold still. One rule fixes every box score at every stage (the table is shared).

## §veto — awaiting his word
- The w46 front miniatures (the squares and triangles) are unmounted, not deleted — one word
  brings them back.
- The award sentences (the `why` lines) remain in the stored awards data; only the cards
  display badges.
- The dark halfway ink's clamps (L 0.60–0.86, chroma floor 0.25) are the mirror of his light
  law; the L floor rises if any team reads dim at night.
