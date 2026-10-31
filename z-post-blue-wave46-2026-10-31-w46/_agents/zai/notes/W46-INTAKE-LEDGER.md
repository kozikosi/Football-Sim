# W46 INTAKE LEDGER — the Owner's round-46 directives

Base: Football-Sim-Z-post-blue-w45.html · md5 9990aa033b94a34aaf3c2a2a5d844fef · 1,522,726 B.
Every line below is his verbatim ask, mapped to what ships. Veto candidates are marked.

## O1 · "Make the pink color on the Madden rankings a little softer…"
The pink is the ANCHOR chip on the Madden Rankings (w32 B1). Light mode softens to the site's
rose family: border #c4899f→#cfa3b5, fill #f0bfd3→#f2dee6, ink #43202f unchanged (contrast holds).
Dark mode untouched (#8a5f78 / #4d2f3f / #f2d7e4 — he likes it).

## O2 · "Condense the similar positions into one of each type in the glossary"
One line per position family in depth-chart order: "QB · Quarterback · …", "RB1 · RB2 · Running
Back · Carries the ball…", "WR1 · WR2 · WR3 · WR4 · Wide Receiver · …", "WILL · SAM · Outside
Linebacker · …". CB3 (Nickel) and DIME keep their own lines. Dot separators throughout, the
description introduced by a dot per his example.

## O3 · "There should be no Dashes on the entire site… replace all dashes with dots"
Every user-visible dash becomes the dot separator: em dashes (—), en dashes (–, scores and
ranges "11–5" → "11 · 5"), spaced hyphens ("30 - 41" → "30 · 41"), the final-whistle "<i>-</i>",
and the \u2014/\u2013 escapes in rendered strings. KEPT, and reported to him:
- hyphens inside compound terms are word parts, not punctuation: 20-0, 4-3, 3-4, man-to-man,
  hidden-yards, 2-Pt — replacing those would give "man.to.man", so they stay;
- dashes inside JS/CSS COMMENTS never render — they stay in the source only;
- arithmetic minus signs are code, not text.
Score ranges that read like durations ("7 · 10 wins") are flagged for veto.

## O4 · "Why isn't Maxx Crosby and his fellow 90+ players written in gold…"
Audited every player on every surface (headless, live DOM): every 90+ name already carries the
shimmer class on the comparison page, both themes — the law holds. What read "not gold" was the
sweep's near-white bands (#ffe9c6/#fff6e3) crossing the small lineup text: at some phases a 90+
name reads cream, not gold. The lineup cells and player cards now sweep INSIDE the gold family
(--zshim gold3 ↔ gold2) — gold at every phase, the w43 constant-gold law made literal. The
"check every player" audit ships as a verify script.

## O5 · "The players on the post draft review should come in… half second slower… panels synced"
The map's cascade slows from 0.5s to 1.0s per player (a half second slower than the w44 law).
The depth-chart panels rode 0.15s and started on their own look-gate — they now ride the SAME
1.0s beat, on the same pick-order beats, released by the map's gate, so panel N lands exactly
when player N arrives on screen.

## O6 · "Remove this text from the draft review page"
"Position rank counts your player against the same spot on all 32 simulated teams." — retired
at the source (the breakdown keeps its numbers; the sentence is gone).

## O7 · "…recommend ten players each time to change position… indicate 4-3 or 3-4… visually"
The ten-move recommendation table (lineupAdviceHTML's "The math recommends a different lineup…")
retires from the lineups page at his word. In its place: the front, drawn in the site's own
shapes — two miniature fronts, 4 DL+3 LB and 3 DL+4 LB, the better one lit in the team ink, the
other dimmed. No words. The law he set: the DT2's occupant against the ILB2's (WILL is the
site's ILB2); DT2 better → the 4-3 lights, ILB2 better → the 3-4 lights. VETO CANDIDATE: the
recommendation table can come back on his word.

## O8 · "Still two different colors between the crayola and the 0.50… during-game… my color"
- colOf/colOf2 (the during-game screen's team ink) rides the halfway law now: light reads txM,
  dark reads txd — one voice with the site. This recolors every play line's names, chips,
  badges and abbreviations at once.
- The report line's team abbreviations (zrl-team) wore NO color and inherited the user's team
  ink — the "opposite team's abbreviation written in my color" bug. Every abbreviation on the
  during-game screen (report lines, takeaway lines, blocked kicks, last drives) wears its own
  team's halfway ink now.
- The during-game header score chips (--scA/--scH) join the 0.50 tone (they were the last
  vivid accL/accD text on that screen — the w44 law he has now superseded with "check everywhere").
- The Super Bowl stage's final abbreviations read txd (the stage is always dark; accL was the
  odd one out).
- The Unit Comparison's winning numbers wear the dropdown's neutral ink (they read the root
  accent before — gold on the homepage, the odd one out among the 0.50 tones).

## Verify plan
w46_live.js (fresh asserts, both themes) · w45_live.js regression net (documented supersessions)
· node --check on every script block · zero console errors through a full sim · the every-player
gold audit · dash-free visible-text sweep report.

## O9 · "…take the time to optimize w46 for mobile or anything you would like to do"
The phone-width audit (390/360px, both themes, every tab plus the full draft flow) found the
layouts already clean (zero horizontal overflow) and three real gaps, all closed:
touch targets (nav 26px, draft selects 18px, several 30-33px controls → 34-44px floors by
role), iOS focus zoom (inputs now 16px on phones), and micro-labels (floors raised 1-2px).
Plus one keep: the pill nav sticks to the bottom edge on touch devices as a one-row swipe
strip (the site's own story-zone pattern), tap centers the chosen tab, safe-area aware,
z-index 30 under every overlay, `contain:inline-size` so the strip never widens the layout
viewport. Desktop unchanged (every rule is mobile-scoped; `pointer:coarse` gates the sticky).
VETO CANDIDATE: the multi-row wrapped nav can come back on his word (one line).
