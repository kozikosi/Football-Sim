# W48 INTAKE LEDGER — the Owner's words, verbatim, item by item

Wave 48 · received 2026-11-01 · one directive this round (he named it "only one task").

## O1 · verbatim

> "You have only one task this session. You need to get rid of the new shimmer effect you but
> [sic] on everything and replace everything current shimmer with the shimmer that would appear
> on the Kansas City Chiefs 90+ players on the team comparison page in w45 and w46. That gold
> should be everywhere. It is impossible to read the player's names on the madden rankings page
> now. I really do truly hate it. Please get rid of it and use the w45 shimmer everywhere
> possible."
>
> "once you fix it call the new version w48"

## Reading (his law, split into the moves it names)

1. **The w47 glow dies.** The "new shimmer effect on everything" is w47's O4 ruling — the sweep
   retired, every 90+ name a static gold with a synchronized 16px text-shadow pulse
   (`zpbshimglow`). He hates it; it is gone — keyframe, the three override rules, all of it.
2. **The w45/46 sweep IS the shimmer, everywhere possible.** The look the Kansas City Chiefs'
   90+ names wear on the team comparison page in w45/w46: the deep-gold gradient sweep
   (`--zshim` = `--gold3` breathing to `--gold2`, `zpbshmsweep 3.4s`). Every surface that
   shimmers wears that again — the w47 CSS overrides are the only thing standing between the
   w45 cascade and the page, so they leave and the w45 cascade rules untouched.
3. **The Madden rankings page reads again.** The unreadable names are the ANCHOR chip's: w47's
   O2 put the tier law inside the chip — a 90+ gold-sweeping name on the chip's own gold-family
   fill (`#f4e6c3`) plus the brown glow pulse. The tier classes leave the chip name; the name
   reads the chip's ink again (dark brown on gold in light, soft pink on plum in dark), exactly
   as it rendered in w45/w46. The chip's light-mode gold family itself STAYS — that was his
   "more golden" ruling and he has not revoked it.
4. **The name is w48.** The product is `Football-Sim-Z-post-blue-w48.html`.

## What is explicitly NOT in scope

Everything else w47 shipped (the dropdown last names, the theme default, the DIME stack, the
toggle contrast, the button order, the staged formation, UNDO / RETURN TO MODEL LINEUP, the
dark halfway ink, the review badges and crests, SIM PLAYOFFS cinematics, the box-score tone)
stands untouched. One task means one task.

## §veto candidates

- The gold-family ANCHOR chip fill survives (his w47 "more golden" stands); only the tier law
  inside the chip retires. If he wants the name gold INSIDE the chip too, the chip's fill must
  go dark — his call, not made today.
- `zpb-vib` (85+ bold) also leaves the chip name with the shimmer — it was part of the same
  w47 template change. The 85+ bold law itself is untouched on every other surface.
