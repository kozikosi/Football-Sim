# W32 INTAKE LEDGER — Z.ai · session 23 (web chat) · 2026-10-29

Owner message = round-31 list (re-sent as reminder) + round-32 list (active work order).
**Baseline anomaly, stated up front:** the w31 zip did not reach this sandbox (upload/ empty;
GitHub newest = w30, md5 8d8e1a4bfb0d91849f110071868fc756, 1,367,386 B — verified). Per
START-OF-CHAT §1 fallback 4 the chat context is the source of truth: the round-31 list is
present verbatim, so this build = w30 + round-31 rebuild (stage 1) + round-32 directives
(stage 2) → **w32**. If the Owner still holds the true w31 zip, attach it and I re-diff.

## §A · Round-31 rebuild items (stage 1)

| # | Directive (condensed) | Map |
|---|------------------------|-----|
| A1 | 3-win-streak cinematic shows before a game on a 1-streak; must appear only AFTER the game that achieves the 3rd win, never before the next | move streak-cinematic trigger from pre-game gate to post-game achievement gate |
| A2 | Kicker ratings too high (consistently highest); all ratings integers | inspect K OVR formula; damp; integer display everywhere |
| A3 | Guide personnel badges centered; ADD "10 / 1 RB / 0 TE / 4 WR"; all badges in "X Y" lines format | personnel box rework + new badge |
| A4 | Dime visualization from defense panel → Coaching panel (between NICKEL and FOCUS); remove defense panel from Guide | move field-map section |
| A5 | Badge guide: "20-0" → "PRTG" where it means passer rating | rename in badge guide only |
| A6 | "On the player panels" viz = ALL league-leader stats left→right starting QB | rebuild panel inventory strip |
| A7 | Footer: DARK button goes where LIGHT is — below the others, centered | footer layout |
| A8 | ResizeObserver loop setback note on Guide | fix ResizeObserver usage / error path |
| A9 | SIM SEASON not always highlighted (hover only); confirm page "ARE YOU SURE YOU WANT TO SIMULATE THE REGULAR SEASON?" | restyle + confirm modal |
| A10 | Chargers gold-on-blue light mode unreadable; keep 90+ shimmer / 85+ bold; audit more exceptions | light-mode palette lift on tinted panels |
| A11 | Full lineups in game preview: 85+/90+ inconsistent | enforce name-class law in lineup strip |
| A12 | Remove "WHY THESE PLANS?" dropdown from game plan panel | delete |
| A13 | This-Season-in-Badges game report: "28-6" over "@ BILLS"; smaller; caps names; lowercase "vs"; no dot, no week | restructure report lines |
| A14 | Integers everywhere incl. PTS scored per game on review badges | round all displays |
| A15 | Lineup dropdown shows OVR after name (dropdown only; static unchanged) | option label |
| A16 | KR/PR static = name only; rating right side; dropdown "<NAME> x" (return rating integer) | KR/PR slot render |
| A17 | Full depth chart: ST horizontal pane underneath; offense+defense centered side-by-side; 85+/90+ names; "Overall grade x" | depth chart layout |
| A18 | NICKEL and DIME capitalized everywhere | sweep all renders |
| A19 | End-of-season badges one-by-one automatically at season end (not only after visiting roster) | auto-run stagger |
| A20 | Replace draft pick analysis (GIVEAWAYS table) with the letter-grade draft pick grade table from YOUR ROSTER | swap tables |
| A21 | Remove "Green = your unit was clearly better…" text | delete |
| A22 | Light mode: more contrast on season-stats player badges (Chiefs red-on-red) | per-team tint math |
| A23 | Awards: YOUR All-Pro / Pro Bowl players visually obvious (shimmer or ring) | award card highlight |
| A24 | "IN DA CLUTCH" → "CLUTCH GAMES" | label |
| A25 | Capitalize "RUSHER WON" in sacks-taken viz | label |
| A26 | OL season stat "SK" (never "SK A"/"SKS"); "PRSS" (never "PRSS A") | stat labels |
| A27 | Remove "TEAM A / TEAM B" header text from comparison | delete |
| A28 | "Start a new season (same roster)…" + "START A NEW DRAFT" at bottom of EVERY season screen (incl. SEASON / YOUR ROSTER / TEAM COMPARISON at regular-season end) | footer/nav affordance |
| A29 | 100-Seasons Review: remove "WHAT DRIVES WINNING IN THIS MODEL" bar graph | delete |
| A30 | Plans Across the League: vertical list "11 PERSONNEL / RUN+ x% / EVEN x% / PASS+ x%" (was summing >100%) | restructure |
| A31 | "REGULAR SEASON REVIEW" title panel above the badges, incl. SIM PLAYOFFS button | re-order |
| A32 | Champion line without "—"; more visualized | champion banner |
| A33 | Draft: no second QB before round 25 | CPU draft rule |
| A34 | Comparison "81.56 vs 80.86" → centered, integers | number law |
| A35 | Season-review units = letter-grade badges (sum of position ratings); top panel "UNIT REPORT CARD"; remove old unit-report-card panel | season review redesign |
| A36 | Remove "WHAT SEPARATED THE PLAYOFF TEAMS" panel | delete |
| A37 | Remove "(by cumulative game impact)" | delete |
| A38 | "REGULAR-SEASON AWARDS & HONORS" capitalized | title |
| A39 | "DEF TD" → "TD" everywhere | label |
| A40 | Playoffs stats: returners sorted by rating | sort |
| A41 | "TRY AGAIN TO GO 20-0?" → modal: "RUN IT BACK · SAME TEAM" / "CALL AN AUDIBLE · NEW TEAM" / "CANCEL", each wired | new end modal |
| A42 | Fumble→def-TD one play: "x[FF]y[FR][TD]"; same player: "z[FUM]x[FF][FR][TD]" | pbp format |
| A43 | During-game: 85+/90+ name law audit | class law |
| A44 | During-game: every TD as boxed "[TD]" | pbp format |
| A45 | During-game: "AT" → "@" | pbp format |
| A46 | Game preview: max 3 stats/badges per player; no 0-value stats | preview strip |

## §B · Round-32 directives (stage 2)

| # | Directive | Map |
|---|-----------|-----|
| B1 | Rankings anchor: green → PINK | chip color |
| B2 | Homepage more pink than brown, light + dark | palette shift |
| B3 | Player browser: center everything | layout |
| B4 | Mobile: everything visible, no horizontal scroll; mobile-only swipe through players on roster/panels/badges | responsive sweep + swipe UI |
| B5 | Position rankings: no horizontal scroll; player + OVR same line | table fix |
| B6 | Comparison: Team B dropdown right-aligned | (w30 did it; verify + keep) |
| B7 | Full team name at every width (never city-only) | (w30 did it; verify + keep) |
| B8 | ELEPHANT term removed → "DL5" | sweep |
| B9 | Where-they-line-up: NICKEL swaps with DE; DIME on NICKEL's row; DL across OL | field map rework |
| B10 | Coaching panel: remove "Every offense also has a quarterback…" sentence | delete |
| B11 | Balanced/neutral focus = "≡" (not three balls), everywhere | glyph swap |
| B12 | Reading the Draft Board: remove ", not just size"; first two sentences on separate lines | copy + layout |
| B13 | ResizeObserver setback note still appearing — fix properly | robust fix (B4-adjacent) |
| B14 | Draft board: DIME vertical alignment; "/ELEPHANT" removed (DL5 only) | draft board slots |
| B15 | 3-4: OLB1 between DL5 and ILB1 | draft board order |
| B16 | Flex dropdown needs ONE click (static unchanged) | event wiring |
| B17 | Draft-review LOS viz: hover position → light player card below | hover wiring |
| B18 | "WHERE THEY BELONG" → "WHERE YOUR PLAYERS LINE UP?" | title |
| B19 | Remove "Every starter wears his initials…" sentence | delete |
| B20 | (Note: NICKEL covers WR3, DIME covers WR4 — do NOT write on site) | no-op, respected |
| B21 | YOUR BREAKDOWN: under player-panel list, below "Position rank counts…" line; render as panels/badges | restructure |
| B22 | Integers everywhere except PRTG | law sweep |
| B23 | SEASON OPENER cinematic before Game 1 (fade in/out) | cinematic |
| B24 | Division-rival cinematic: random phrase generator (28-phrase list); panel text "a bitter AFC West feud" loses its period | cinematic + copy |
| B25 | Player cards: audit 90+ shimmer / 85+ bold / neutral in team colors | class law |
| B26 | Fumble format (repeat of A42) | same fix |
| B27 | During-game name law tests (repeat of A43) | same fix |
| B28 | Boxed [TD] (repeat of A44) | same fix |
| B29 | "@" (repeat of A45) | same fix |
| B30 | Preview 3-stat max (repeat of A46) | same fix |
| B31 | End-of-season panel shows ONLY at the end of the cinematic (no flicker in/out) | sequencing |

## §C · Interpretations flagged for Owner veto

1. **A2 kicker math** — the K/P OVR weights date to REWEIGHT-BRIEF §7b (my lane), so I damp
   the kicker OVR blend rather than routing to Claude; if the Owner wants the win-model
   untouched and only the display damped, veto and I revert to display-only.
2. **B9 swap** — "swap places" implemented literally: NICKEL takes DE1's LOS station; DE1
   takes the NICKEL's previous station; DIME joins the NICKEL's row on the same horizontal
   line (just inside, non-overlapping). DL keeps the LOS directly across from the OL.
3. **B24 phrase set** — deduped the Owner's list (DIVISIONAL DUEL listed twice) → 27 phrases.
4. **B4 swipe** — mobile-only (pointer:coarse + width) swipe strip on roster/depth chart/
   player panels; desktop untouched.
5. **A33 round-25 rule** — reads "cannot draft a second QB until the 25th round"; applies to
   the CPU draft only; your own picks unaffected.
