# W50 INTAKE LEDGER — the Owner's words, verbatim, item by item

Wave 50 · received 2026-11-01 · one directive with seven named moves.

## O1 · verbatim

> "Please take away the text and numbers written in black from anywhere in the project.
> Especially in light mode on the madden rankings page and the avg ovr on the position ranking
> page. Any instance where there is black text; it should be recolored to that team's theme's
> neutral color, ideally the 0.50 color selection."
>
> "I made a mistake by telling you to change the anchor panel on the madden rankings page to a
> light rose gold. That looks amazing on the homepage and please keep it. That is correct for
> the homepage version, but that panel should change with every team's theme color."
>
> "DIME IS STILL NOT ALIGNED ON THE DRAFT BOARD DEPTH CHART. YOU WROTE ONCE THAT NICKEL AND DIME
> WERE ACROSS FROM EACH OTHER. THAT MADE NO SENSE. DIME SHOULD BE DIRECTLY BELOW NICKEL ON THE
> SAME DEFENSE DEPTH CHART. PLEASE SPEND A LOT OF TIME FIXING. CLEARLY DIME WAS PLACED SOMEWHERE
> OFF OF THE REST OF THE LIST OF DEFENSIVE PLAYERS."
>
> "THERE WHERE YOUR PLAYERS LINEUP TIMING IS STILL NOT SYNCED WITH THE CARDS BELOW. PLEASE MAKE
> SURE THAT ALL THE NAMES APPEAR TWICE AT THE SAME EXACT TIME."
>
> "THE 4-3/3-4 TOGGLE ON THE LINEUP MENU NOW DOESN'T DO ANYTHING. PLEASE FIX"
>
> "THE NEUTRAL WORDS ON THE DURING THE GAME MENU LIKE 'TO' AND THE GAME TIME SHOULD BE A NEUTRAL
> CREAM, not team colored."
>
> "You still have a lot of dashes on the records on the badges for the season review badges. All
> those dashes should be replaced with <dot>s"
>
> "your last wave was w49. you are now working on w50"

## Reading (his law, split into the moves it names)

1. **The black retires, everywhere.** The audit found the light base ink `#54303f` (a near-black
   plum) painting 2,744 texts. The site's own light ink becomes the 0.50 halfway rose `#8e5566`
   (5.27:1 on the pink page — the same halfway law the team inks obey). The Madden rankings rows
   had NO team vars at all: their names and scores now ride the row's halfway ink (txM light /
   txd dark). The Position Rankings' AVG OVR column drank the plum — it joins its team now. The
   only dark-on-light ink left anywhere is the --ongold pair on gold buttons (the DRAFT button's
   own contrast pair, untouched).
2. **The anchor panel follows the franchise.** Every rankings row feeds its chip the team's own
   border/fill/ink (`zpbAnchorVars`): the fill a whisper of the team hue at L 0.93 (barely not
   white — his rose law carried into every palette), the border a step deeper at L 0.80, the ink
   the team's 0.50. The delicate rose gold he approved stays as the chip's fallback frame
   wherever no team context exists (the "homepage version" he kept).
3. **DIME is on the list.** The lineup editor's defense depth chart carried NO DIME row at all —
   the list ended at NICKEL. A DIME row now rides the defense group's bottom, directly under the
   nickel (slot + resolved name + OVR, the tier classes included). The draft board's DIME row
   also joins its siblings' paint (zpb-trow + the neutral row vars) so it stops reading as a
   detached row. Every other surface was measured: map (l 339/336), full depth chart (l 652/652),
   draft roster list (adjacent indexes) — all already correct.
4. **The names land twice, together.** TE3 had a station on the field map but no card (the
   breakdown groups stopped at TE2) — his name appeared once. TE3 joins the cards (a private
   copy of the groups; the weights panel never sees it). Measured on a real draft: every map
   station now has a card twin with the EXACT same --beat and animation-delay (cine + beat×1s).
5. **The 4-3/3-4 toggle answers.** The w47 staging painted NOTHING: the staged formation only
   flipped a button and lit APPLY. Now the staged flip repaints every live lineup editor at
   once — the labels read NT/OLB1/ILB1/ILB2/OLB2 and the defense rows reorder (OLB1 between DL5
   and ILB1) via a non-mutating label snapshot (zpbLabelsFor) + an explicit-formation
   zpbOrderSlots + zpbRerenderLineupEditors through the wire handle. APPLY THE CHANGES (1)
   still commits; REVERT CHANGES still returns.
6. **The neutral words are cream.** Root cause found: the replay's own `.zpb-replay span/div
   {color:inherit}` law (0,2,1) outranks any plain class rule, so the game time and the quarter
   marks had been drinking the takeover's team ink. A new takeover-proof token `--zcream`
   (light #53382b · dark #f2e7d5) + a scoped `!important` rule puts the game time, the quarter
   marks, the q-chip and the TO/INT/FF boxes on the neutral cream. Team abbreviations, player
   names and scoring badges keep their team colors.
7. **The badges carry dots.** The badge renderer converts every digit-dash-digit to a middle
   dot at the single render point: RECORD 10·7, the scores 27·15, 16·41, the pain record — all
   of them. Rendered season verified: 30 badges, dots on every record, zero digit-dash-digit.

## What is explicitly NOT in scope

Everything else stands: the w45/46/48/49 shimmer cascade (deep→mid sweep, the comparison's
pale↔mid strip), the halfway inks, the tier law, the theme default, the editor's bar, the
cinematics, the mobile law — all held by the regression battery.
