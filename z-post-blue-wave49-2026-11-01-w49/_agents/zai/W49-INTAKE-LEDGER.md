# W49 INTAKE LEDGER — the Owner's words, verbatim, item by item

Wave 49 · received 2026-11-01 · one directive with three named moves.

## O1 · verbatim

> "Yes you reverted the shimmering gold to its previous place but please expand it. This is
> your most important task and really check every page for where there is a 90+ player not
> written in this shimmering gold. The raiders still don't have that shimmering gold
> implemented on the team comparison page and neither do the players on the Madden Rankings
> page."
>
> "I don't like that color yellow you chose to frame the anchor players on the madden rankings
> page. Please go more for a delicate rose gold, just barely not white"
>
> "your previous version was w48. you are now working on w49"

## Reading (his law, split into the moves it names)

1. **The expansion is the task.** The w48 restore was accepted ("Yes you reverted the
   shimmering gold to its previous place") — the sweep itself stays the w45/46 shimmer. What
   he now demands is COVERAGE: every 90+ player on every page written in it.
2. **The Raiders on the team comparison page.** Diagnosis (fresh, pixel-level): the lu-cell
   sweep's gradient strip BEGINS at the deep gold (#9a6b1f light / #8a5f18 dark) and the two
   sides of the matchup hug the center column from opposite edges — the LEFT team's right-
   aligned glyphs rest on the strip's pale mid-band (the look he calls the shimmering gold),
   the RIGHT team's left-aligned glyphs rest on the deep-gold head, which reads as flat dark
   ink: "no shimmering gold". Verified by swapping the dropdowns — the paint flips with the
   side, not the team. FIX: the lu-cell/pcard sweep breathes pale gold (--gold2) to a NEW mid
   gold (--goldm) — every phase, both alignments, both themes reads unmistakable gold. The
   deep head is gone from that surface.
3. **The players on the Madden Rankings page.** The rankings rows carry exactly one player
   name each — the ANCHOR chip's — and w48 deliberately left it plain (the readability
   exception). The chip's LEAK twin shows no name. So the page had ZERO shimmering names.
   FIX: the anchor name wears the tier law again (90+ zpb-shm, 85+ zpb-vib) inside the chip,
   on a sweep that breathes deep gold to the new mid gold so the small name stays readable at
   every phase; the team detail's "led by …" names join the tier law too (they had no tier
   class at all — the w48 audit never saw them because "led by NAME" carries no trailing
   number for the text-walker to match).
4. **The frame goes rose gold.** The yellow gold-family chip (#cfa96b / #f4e6c3 / #4a3410)
   retires. The ANCHOR chip now frames in a delicate rose gold, barely not white:
   border #e2bfae · fill #f9ece4 · ink #6b4634 (7.4:1 on the fill). The dark chip keeps his
   plum family untouched (the yellow he flagged was the light-mode one). This is ALSO what
   makes the shimmer inside the chip readable — his own w48 veto called this shot: the fill
   must leave the gold family before the name may go gold.
5. **The name is w49.** The product is `Football-Sim-Z-post-blue-w49.html`.

## What is explicitly NOT in scope

Everything else stands: the w47 dropdown last names, the theme default, the DIME stack, the
toggle contrast, the button order, the staged formation, UNDO / RETURN TO MODEL LINEUP, the
dark halfway ink, the review badges and crests, the SIM PLAYOFFS cinematics, the box-score
tone — and the w48 cascade everywhere else (the generic .zpb-shm sweep with its pale bands,
the draft board, the player browser, the season surfaces). One expansion, aimed where he
aimed it.

## §veto candidates

- The w48 chip exception (no tier class inside the chip) is RETIRED by this directive — his
  own words put the players of the Madden Rankings page in the shimmering gold, and the rose
  fill he ordered is what keeps it readable.
- The lu-cell sweep no longer byte-matches w46 — superseded by the same directive (the
  Raiders must SEE the gold). Keyframes, timing (zpbshmsweep 3.4s) and the gold family are
  unchanged; only the strip's stops moved and the deep head left the surface.
- The new --goldm token: light #ad7f2e, dark #c39a4a — the mid gold both new sweeps breathe
  to. Champion surfaces (--zshimL/--zshimD) untouched.
