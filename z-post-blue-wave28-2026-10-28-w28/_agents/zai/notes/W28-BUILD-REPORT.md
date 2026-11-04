# W28 BUILD REPORT — session 20, 28 Oct 2026

**Product:** `Football-Sim-Z-post-blue-w28.html` · md5 `84e1f8a8236d4c340bc99a1de1840651` · 1,356,317 B
**Base:** w27 (`b2adf669…`) · **Chain:** 47 asserted edits — `w28_patch.py` (9) + paren hotfix + `w28_patch2.py` (22) + `w28_patch3.py` (14) + LINEUPS hotfix + TEAM STATS comment hotfix.
**Verify:** `w28_verify.js` **55/55** · `w28_stress.js` **13/13** (instant full season: 272 games, 32 kickers fga≥fg, 3 replays, 14 TO lines all named) · zero console errors · 10 browser screenshots (evidence/).

## What landed, by Owner directive
1. **VS. ACTUAL NFL TEAMS** — present on the first draft review (screenshot), gone the moment a season exists; even a stale `resultsView='nfl'` is coerced back to SEASON.
2. **Preview names** — the non-Cinzel `zpb-pvface` copy removed; the Cinzel names stay in line with the 46/54-style model bar (screenshot `preview-strip.png`).
3–5. **Replay turnover lines** — root cause of "gives it up": the takeaway queues were cross-wired (home TO events consumed home's OWN takeaways instead of the away defense's). Fixed, plus box-score padding so a name always exists. Fumbles now paint **one line per player** (`KC x [FUM] / DEN y [FF] / DEN z [FR]`); same-player FF&FR shares one line (`DEN y [FF] & [FR]`); INT keeps `x [INT] y`; safeties now always carry **two defenders** (sim records an assist; replay reads "y & z"; review prose names both).
6–11. **The badge law** — every chip capitalized: `25/39 CMP · 264 PASSY · 17 RUSHY · 19 C · 74 RECY · 2/56 KR · 2/25 PR · 3/3 FG · 1 FF · 6 TKL · 1 FR · 2 SKS · 4 PRSS · 1 SAF · 1 SK · FUM (n LOST) · 2PT · DEF TD · BLK`.
12. **Preview order/selection by season rating** (`_rating`, OVR fallback).
13–14. **Key-players cross-team leak** — the MVP was prepended to BOTH team cards (that is how a kicker appeared on both teams and how players landed in the wrong team's area); now his own card only.
15. **TEAM STATS paints open**; KEY PLAYERS / GAME PLAN / LINEUPS / MATCHUP MATH / AROUND THE LEAGUE capitalized.
16. **Rating-explainer paragraph removed** from the leaders tab.
17–24. **Leaders trims + formats** — QB: Cmp/Att, Y, TD/INT (as "4/0"), SK, FUM; RB: C/RUSHY ("27/87"), YPC, TD, Rec, FUM; WR/TE: Rec/Tgt, Y, TD, FUM; OL: Y behind, SK A, PRSS A; DL/LB/DB: SKS, PRSS, no Blk/Saf; K: FG "3/3"; RET: KR "2/56", PR "2/25", Total Y.
25. **RAW STAT button removed** (the lone Performance-rating toggle went with it).
26. **Guide** — Mike/Will/Sam etymology entry; C (carries) documented; badge wall relabeled to the new law; FUM + SAF chips documented.
27. **Comparison verdict sentence removed.**
28. **Comparison opens on your biggest rival** — full 32-team table embedded (Owner's list verbatim); Team B defaults to `SIM:<rival>` (KC → Las Vegas Raiders (SIM), screenshot).

## Interpretations flagged for Owner veto (none block play)
1. TD kept as a column on RB/WR/TE boards and INT on LB/DB boards (a flat global removal would strip the DB board of its primary stat) — say the word and they go too.
2. With Raw stat gone, the whole "Sorted by" row went (a lone toggle with no alternative is noise).
3. PASSY/RECY coined by the same fusion pattern the Owner set with RUSHY.
4. FG attempts are generated as small ovr-driven miss-noise (the sim never modeled misses; the scoreboard never changes).

## Known-good evidence
`evidence/`: home.png · draft-review2.png (NFL tab) · cmp.png (rival default) · week1-preview.png · review-visible.png (KEY PLAYERS chips) · team-stats.png · preview-strip.png (names on the bar) · preview-cards.png (C/RUSHY/FG x/y) · leaders-qb.png (TD/INT + C/RUSHY) · leaders-ol.png (Y BEHIND / SK A / PRSS A / SKS / PRSS) · replay2.png (FUM/FF/FR three-line fumble).
