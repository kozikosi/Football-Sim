# UPDATE-README — wave 46 (the Owner's round-46 directives)

Delivered 2026-10-31 · the product: `Football-Sim-Z-post-blue-w46.html` ·
md5 `aca7fe4fbd1ec902a37ad341868cd105` · 1,526,836 chars · base: the w45 bytes (md5 `9990aa03…`).
Rev 2 of this wave adds the mobile pass (his "optimize w46 for mobile"); everything below it stands.

## The Madden rankings pink softens (O1)

The pink was the ANCHOR chip. Light mode now wears the site's own rose family —
fill `#f0bfd3 → #f2dee6`, border `#c4899f → #cfa3b5`, the dark-plum ink unchanged — the same
family as the homepage wash and the selects. Dark mode untouched (`#4d2f3f`, the one he likes).

## The glossary speaks once per position (O2)

"RB1 · RB2 · Running Back · Carries the ball and catches short passes out of the backfield." —
one line per family, in depth-chart order, every label joined by the dot, the description
introduced by a dot. QB stays alone; RB1+RB2 merge; WR1–WR4 merge; TE1–TE3 merge; OT1+OT2,
OG1+OG2, DE1+DE2, DT1+DT2 merge; WILL+SAM share the Outside Linebacker line; CB1+CB2 merge;
CB3 (Nickel) and DIME keep their own lines (they were never copies).

## The site has no dashes (O3) — his "let me know where" report

Every user-visible dash is now the dot separator. The sweep, counted: **344 replacements** —
343 inside rendered strings (spaced em dashes 160, the empty-state "—" markers 41, en dashes 62 —
scores and ranges now read "11 · 5", "30 · 17" — spaced hyphens 4 — the report's "30 - 41"
lines — plus 76 `\u2014` escapes) and 1 in an attribute (the wordmark's aria-label).
The patch script is `zpb_v46.py`; the sweep parses the page with a real JS parser (acorn) and
touches ONLY string/template contents — arithmetic minus, code, and comments cannot be touched
by construction (verified: 0 dashes left in any literal, all 10 script blocks pass `node --check`).

**Where dashes remain, and why (his explicit ask):**
- **Hyphens inside compound terms are word parts, not punctuation:** "20-0" (the wordmark and
  the marquee — his own brand), "4-3" and "3-4" (the fronts), "man-to-man", "2-Pt", "hidden-yards".
  Replacing those would read "man.to.man" — they stay.
- **Code comments** (JS/CSS) never render — their prose keeps historical dashes (~350 in source,
  zero on screen).
- **Arithmetic minus** is code (`base - penalty`), not text.

## The 90+ gold, checked on every player (O4)

He was right to ask. The audit (headless, live DOM, every surface, both themes) found every 90+
name already carrying the shimmer class — the law held — but the sweep's two near-white bands
(`#ffe9c6`, `#fff6e3`) crossed the small lineup text every 3.4s: at some phases a 90+ name read
CREAM, not gold. That is what he saw on Crosby while the Chiefs' names sat in gold moments.
The lineup cells and player cards now sweep INSIDE the gold family (`--zshim` gold3 ↔ `--gold2`)
— gold at every phase. The w43 constant-gold law made literal; the cream bands retire from the site.
The every-player check ships as `w46_audit_gold2.js` (player browser, position rankings, Madden
detail, both comparison tabs, roster, VS-NFL view) and `w46_live.js` asserts Crosby + the no-cream
gradient on the default Chiefs/Raiders board.

## The post-draft review slows half a second, panels synced (O5)

The map's cascade goes 0.5s → **1.0s per player** (his "half second slower"). The depth-chart
panels rode 0.15s on their own look-gate — they now ride the same 1.0s beat on the same
pick-order beats, released by the map's gate, so a panel lands exactly when its player arrives
on screen. Reduced-motion keeps everything instant.

## The draft review loses one sentence (O6)

"Position rank counts your player against the same spot on all 32 simulated teams." — retired at
the source. The breakdown keeps its numbers.

## The lineups page reads the front (O7)

The ten-move recommendation table retires — his word. In its place, the front speaks visually:
two miniature formations in the site's own shapes (4 squares + 3 triangles vs 3 squares + 4
triangles), the better one lit in the team ink with the win-glow, the other dimmed. No words.
His law: the DT2's occupant against the ILB2's (WILL is the site's ILB2); DT2 better lights the
4-3, ILB2 better lights the 3-4. Hover carries only "4-3"/"3-4" for the color-blind check; the
screen itself says nothing. **§veto:** the recommendation table (and its Apply button) can come
back on one word — the math (`lineupAdvice`) stays in the source.

## One voice on the during-game screen (O8)

- The screen's team ink (`colOf`) rode the vivid accents — light read the crayola `accL`, dark a
  lifted `accD` — while the site reads the halfway tone. The whole screen rides the law now:
  light reads `txM`, dark reads `txd` — every play line's names, chips, badges, abbreviations.
- **The "my color" bug:** the report lines' team abbreviations wore NO color and inherited the
  user's team ink — the opposite team read in his colors. Every abbreviation on the screen
  (report lines, takeaway lines, blocked kicks, last drives) wears its own team's halfway ink now.
- The header score chips (`--scA/--scH`) join the 0.50 tone — the last vivid text on that screen
  (the w44 law he has superseded with "check everywhere").
- The Super Bowl stage's final abbreviations read `txd` (the stage is always dark; `accL` was the
  odd one out). The final whistle's big score separator is the dot.
- The Unit Comparison's winning numbers wear the dropdown's neutral ink (they read the root
  accent before — gold on the homepage — the odd one out among the 0.50 tones).

## Verify

`w46_live.js` **29/29** (both themes) · `w45_live.js` on the w46 bytes **42/42** (the full season
drive included) · `w44_live` on the w46 bytes 27/32 (the 5 fails are the exact asserts this wave
supersedes: the vivid header-score law ×4 and the 0.5s cadence ×1 — their replacements pass in
w46_live) · `w43 stress` 38/43 and `w42 stress` 50/52 (the same vivid-ink supersessions) ·
`node --check` on all 10 script blocks · zero console errors through a full sim and the
during-game drive · the dash sweep is fixed-point (a second pass finds nothing). Screenshots in
`_agents/zai/notes/evidence/`.

§veto candidates live in `notes/W46-INTAKE-LEDGER.md` (the recommendation table's retirement, the
1.0s beat, the range-dots that read like scores, the compound-term hyphens).

## The mobile pass (his "optimize w46 for mobile", same chat)

The site already card-ified its tables at ≤760px; this wave closes what a phone-width audit
(390px and 360px, light and dark, every tab and the whole draft flow) actually found.

- **Thumb-sized controls.** Every control on a phone now clears a touch floor: the footer nav
  26px → 44px, the two draft selects 18px → 44px (the worst offender), every `.tabbtn` 40px,
  the CTAs 44px, the Table/Cards segment and the spot chips 36–38px, the 4-3/3-4 and
  Pick-order/Depth toggles 34px. Desktop pixels untouched (mobile-scoped media queries only).
- **No more iOS focus zoom.** Inputs and selects read 16px on phones — iOS Safari no longer
  zooms into the field on tap.
- **The nav within reach.** On touch devices the pill nav sticks to the bottom edge
  (`pointer:coarse` only · safe-area aware · z-index 30, under every fixed overlay) and rides
  as a one-row swipe strip in the site's own story-zone pattern; the tab you tap centers
  itself. `contain:inline-size` keeps the strip's min-content out of the phone's layout
  viewport (the first cut expanded it to 680px, the audit caught it, the containment fixed it).
- **Micro-label floors.** The draft board's group headers and slot tags, the line-of-scrimmage
  caption, the fade note and the smallest formation-map bubbles (≤430px) all gain 1–2px so the
  small text is readable at arm's length.

Verify (the mobile pass): no horizontal overflow on any screen at 390px and 360px, both themes,
every tab and the full draft flow · zero sub-34px touch targets in the live audit · the sticky
nav proven pinned above its natural flow position on phones and `static` on desktop ·
`w46_live` 29/29 · `w45_live` 42/42 · `w43 stress` 38/43 (the same documented supersessions) ·
dash sweep 0 visible · `node --check` 10/10 · zero console errors. Screenshots:
`_agents/zai/notes/evidence/w46_mobile_*.png`.
