# ZAI.md — lane file, seat ZAI · High Councillor

## Identity
Z.ai — architect/builder of **Z-post-blue** (`Football-Sim-Z-post-blue.html`, single-file football sim, wave-built from the Owner's verbatim directives). Chat-only sandbox: **no git push**; work reaches GitHub via the Owner (`tools/import-zip.sh zai <zip>` or `tools/seat-save.mjs`).

## Current work
**Wave 18 shipped** — build md5 `282017bd32767c518d036917347de827`, 1,279,526 B (base: wave 17 `ddb9af52…` ← wave 16 `c0b449de…`).
Round 12, all delivered on one build:
- **Team Comparison (footer) rebuilt** — top panel removed; the two dropdowns physically move into the Starter-by-Starter panel header where the team names were; the **83 vs 79 numbers wear each team's own color** (theme-aware via the row-var packs); the whole result column capped at 520 px (thin at max desktop); the **effective-ratings note is footer-only** — the in-season comparison keeps it (both renderer copies carry the `showNote` gate; note the runtime *reassignment* of `renderLineupTableHTML` at ~line 3.2k overwrites the declaration — both are patched).
- **Unit Comparison in the Owner's 13-item order** (Offense, QB, RBs, TEs, OL, Run Game, Pass Game, Pass Defense, Run Defense, Defensive Line, Linebackers, Secondary, Defense) — DETAIL_KEYS display-only change; WR and Primary Coverage rows retired, Linebackers added.
- **Field map rebuilt** — WRs line out ON the line (2 right, 1 left), CBs mirrored opposite and wider (space-between row), CB3 → **NICKEL**, **DIME on its own deep station**, and **all 19 flex families ride under the rows as gold FREE → wine −6 chips** (hover = the sentence; strips hidden under 640 px where the position board carries the chart).
- **Guide text pass** — "Who decides?" one sentence per line with **"play your own way"**; Stars bullet, "They can also flex a player.", "(5 minus the backs and tight ends)", the white duplicated "Auto, philosophy and custom plans" block and "baked into every projection" all removed; **COACHING PHILOSOPHY** (uppercase, no period) + side-by-side **AUTO / CUSTOM** panels with the Owner's captions; **home-field +1.7 line moved into THE MATH**.
- **New Guide panel between COACHING and THE MATH**: **DEFENSE: 4-3, 3-4, NICKEL, DIME** — four front cards drawn in dots (DL/LB/DB rows, gold dots = cornerbacks, dashed dot = the dime), R+/P+ lean badges, hover explainers, one-line how-4-3-differs-from-3-4 closer.
- **Glossary opens with every starting spot in depth chart order** (28 slots + Dime after CB3), one small line each.
- **Draft board** — the **fill position itself is the control** (dashed underline → the inline `select.slotsel` picker; the "change" link is gone); the **player list stretches to the bottom of the board panel** (flex column + uncapped wrap; bottoms match the depth-chart panel ±0 px); **ALL/NONE at 0.62rem, quiet color, left-aligned** (inline styles — nothing out-ranks them); **"Your Roster" fades in and out** above the depth chart; **Pick order / Depth chart is now the same segmented pill as 4-3/3-4**, base toggle left / view toggle right on one row; roster column 340 px; **Dime verified** in the depth-chart view.
- **Terminology** — "Lower points allowed is better…" paragraph removed; every remaining "third corner(backs)" now reads **"an extra defensive back"** (7 screen surfaces).
- **Engine untouched** — 10 byte-pins (ROSTER_SLOTS 28, DEPTH_CHART_GROUPS, FLEX literal, LB_FLEX, OLB_FLEX, EMERGENCY_PENALTY, flexPenaltyFor, effOvr) assert-verified.

## What the next session needs
1. **Owner test feedback + §K vetoes** (5 interpretation notes: the 13-unit list omits Wide Receivers and Primary Coverage; "add Dime here" read as the depth-chart view, pick-order stays pick-based; field-map chips hide under 640 px; "opposite sides" = base toggle left / view toggle right; glossary spot lines shared per family).
2. **Engine import when Claude's math engine lands**: chart v3 stays the spec — the byte-pins in `tools/v18_*` suites invert into reconciliation checks.
3. Standing faults if still seen on his machine: Team Comparison render, Madden Rankings blank — re-test on this build.

## Do not redo
- P0 draft-alive pack (wave 14) + round-9 directives (wave 15B) + wave-16/17 deliverables — all suite-checked on this build.
- **`.zpb-defgrid` must stay flex-wrap** — a `repeat(auto-fit,minmax(...))` grid there explodes min-content on mobile (916 px scroll at 390 px; fixed in w18). Same trap as any new grid inside `.wrap` (flex child, `min-width:auto`).
- The ALL/NONE sizing is inline on the chips (a stylesheet-only rule kept losing) — leave the inline styles.

## Files in this lane
`deliveries/OWNER-ROUND-8-INTAKE.md` (§A–§K) · `deliveries/HANDOFF-FOR-CLAUDE.md` · `tools/zpb_v13.py`…`zpb_v18.py` · `tools/v15…v18 verify + hardening suites` · `evidence/` · `START-OF-CHAT-ZAI.md` + `END-OF-CHAT-ZAI.md` (the workflow trio).

## Rules that changed
None this chat. Standing: the Dime stays **purely visual** until the math engine lands — do not wire it into slot-wins, the lineup selector or CPU needs before then.
