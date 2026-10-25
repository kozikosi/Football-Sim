# PALETTE ADVISORY — the Z-post-blue rose-gold system

**FROM: Z.ai (High Councillor) | DATE: 2026-10-25 | For: every seat designing for the 20-0 product**

The Owner publicly praised the Z-post-blue homepage palette ("great choice of hexes")
and asked that it be **disseminated broadly as good examples of the color palette we're
looking for**. This document is that dissemination. Take these values as proven,
Owner-endorsed references for any 20-0 surface — prototypes, seat builds, council docs.
You do not need to use them byte-for-byte (tones may shift for accessibility, exactly as
the Owner permits for team theming), but the *relationships* between them are what makes
the system work.

## 1 · The three role families (the Owner's taste brief, in hexes)

| Role | Light mode | Dark mode | Use it for |
|---|---|---|---|
| **Very pale rose gold (near-white)** — the canvas | `#fcf7f1` background · `#ffffff` panels · `#f7ebe0` secondary panels | `#181114` background · `#221920` panels | Page backgrounds, panels. Always warm — never pure `#fff` on large areas, never cool grey |
| **Shimmering gold** — the excitement | `#c9a24b` accent · `#e6c67d` gold2 · `#d9a45b` mid-gold · gradient stops `#9a6b1f → #e6c67d → #eed9a3 → #d9a45b → #c9a24b → #f3dfae` | `#d9b36a` accent · gradient stops `#8a5f18 → #e8c87e → #f4e3b0 → #d9a45b → #d9b36a → #f3dfae` | CTAs, shimmer text, glowing orbs, focus rings, exciting text |
| **Rose** — the voice | `#c97a8e` rose · `#dcc0cb` rose hairline | `#dfa6b4` rose · `#4a353c` rose hairline | Marquee text, secondary labels, hairline borders, the "breathing" layer |

Plus **white** as the only neutral (`rgba(255,255,255,.58)` glass fills on light,
warm near-white `#f5e9dd` body text on dark). **Black is never a text color** — it may
only be the dark-mode *background*; all dark-mode text is warm cream/rose/gold
(`#f5e9dd`, `#c8a48f`, `#d9b36a`).

## 2 · The rules that make it work (copy these, not just the hexes)

1. **Warm everything.** Every neutral is pulled toward rose/gold: hairlines are
   `rgba(178,124,96,.16)` on light, `rgba(233,196,160,.12)` on dark — never grey.
2. **Glass, not paint.** Panels are 55–58 % translucent with a blur and a 1 px rose
   hairline; the airiest surfaces have **no box at all** (the home stage has zero panels).
3. **Gold = energy, rose = presence.** If a word shimmers or a button glows, it is gold.
   If it whispers (labels, marquee, meta), it is rose. Nothing shouts in more than two
   families at once.
4. **Contrast is computed, not guessed.** Accents ≥ 4.6:1 and body text ≥ 7:1 against
   both the light and dark canvases; the dark-mode twin of every color is a *separate*
   token, not an opacity trick.
5. **Hairlines over borders.** 1 px rose-tinted strokes (`--rosehair`) replace every
   "hard" border; drop shadows stay warm (`rgba(163,113,84,.10)`), never black.
6. **Gradients run through gold, never through grey.** The wordmark shimmer cycles the
   six gold stops above (`--g1…--g6`); on dark, warm the darkest stop down
   (`#9a6b1f → #8a5f18`) so it never turns muddy.

## 3 · Proven pairings (steal these directly)

- Wordmark: Bodoni Moda (500/600) over the g1→g6 gradient, gold bar for the dash.
- Marquee: rose `#c97a8e` text (42–100 % opacity layers), gold `·` separators at 55 %.
- Primary button: gold pill `#c9a24b → #e6c67d` gradient, dark-warm label `#3a2a14`.
- Focus/accessibility ring: `--accent` gold at 2 px offset 4 px.
- Panels: `rgba(255,255,255,.58)` + `backdrop-filter: blur` + `--rosehair` stroke.

## 4 · Where to see it live

`Football-Sim-Z-post-blue.html` (worktree root, sha256 `a175747e…` after the eighth wave) — home, draft board,
season, playoffs, player browser, both themes, all 32 team-color takeovers. The full
token block is the `<style id="zpbtheme">` section, `:root` … `:root[data-theme="dark"]`.

*Origin: Owner directive 25 Oct ("share them with me and disseminate them broadly as
good examples of the color palette we're looking for"). Query Z.ai's lane for changes.*

---

## 5 · STANDING RULE — how to emphasize a single word (Owner directive, 25 Oct, eighth wave)

The Owner called out the shimmering **"Can you go 20-0?"** on the draft-complete page as
*exactly the type of example of how to emphasize a certain word*, and asked that every
agent be told: **this is the pattern.** When you need one word or short phrase to carry
extra weight, do it the way the draft-complete line does — never by adding a new color
that isn't in the current palette, never by size alone, and never with a plain `<strong>`
left in the inherited text color:

1. **Wear the current palette on the word.** It takes the accent gradient that is already
   on screen (site gold `--g1…--g6` in the resting state; the franchise gradient
   `--tG1…--tG6` once a team is picked — the takeover supplies them automatically).
   Implementation: a gradient `background` + `background-clip:text` + transparent fill.
2. **Add the shimmer, not a glow.** The `fxshine` keyframe cycle (9s, background-position
   sweep) is the only motion emphasis the product uses; it works because it animates the
   palette itself rather than painting something new on top. `prefers-reduced-motion`
   must keep the gradient and drop only the sweep.
3. **One emphasized phrase per surface.** The pattern reads as a highlight precisely
   because it is rare — two shimmering phrases on one screen is noise.

Reference implementation (copy-pasteable): the `.zpb-shine` class and `@keyframes fxshine`
in the `zpbtheme` style block of `Football-Sim-Z-post-blue.html`, applied as
`<b class="zpb-shine">20-0</b>` inside the draft-complete line and the marquee. The word
also appears in the Guide ("Can you go 20-0?") with the identical treatment, so the
emphasis is consistent everywhere the phrase occurs.

*Owner's words, 25 Oct: "I hope you keep that and please make a note to everyone that is
exactly the type of example of how to empahize a certain word -- in the color palette and
shimmering."*
