# WAVE HISTORY — every Owner directive log, Z-post-blue waves 1–32

Compiled for Claude's V23 integration (companion to HANDOFF-TO-CLAUDE.md).
Sources: the wave README/UPDATE-README/intake ledgers pushed with each zip, the lane docs on
`council/zai`, and the two current-round directive lists (rounds 31 and 32) delivered verbatim
in the Owner's message.

## Era 1 — the base app (waves 1–13, pre lane-history)

- Draft simulator (snake, 32 teams, slots, flex rules), season engine (17 weeks, playoffs,
  Super Bowl), 100-seasons report, Madden rankings from the real Madden 27 ratings, player
  browser, position rankings, team comparison, guide.
- The "20-0" identity: pick a team and a draft slot, chase a perfect season.
- W13-1..20: rankings series dropdown, real 3-4 personnel swap + spec-cache defect fix,
  weights 3-state gating, draft/final cinematics, compression guards, integer yardage,
  POTG restyle, pick-analysis tiers (OK / Costly Miss / Giveaway), neutral real-team rosters,
  leaders/lineup menus, flex-rules tree, package badges, season-review dedupe, report bubbles,
  preview-strip dedupe. md5 `0cef8bf7` (1,247,161 B).

## Era 2 — the Z-post-blue identity (waves 14–30; each wave = one Owner round)

| Wave | Headline directives (condensed — full text lives in each wave's intake ledger) |
|---|---|
| w14 | Homepage "20-0" stage: panel-free home, marquee, guide fades in on scroll, team re-tint |
| w15 | Field map (WHERE THEY LINE UP) + flex chips; kickoff wiring at draft end |
| w16 | Wave-15b polish pass |
| w17 | DIME station + position board |
| w18 | Team Comparison rebuild; Guide defense panel; flex legend; micro-directives |
| w19 | Draft board priority/gone from first render; homepage selects; during-game badge language; THE SEASON IN BADGES cinematic |
| w20 | Position Rankings rebuild: spot toggles, THE SERIES presets, no blank-spot noise |
| w21 | (GPT audit pass — source audit implementation prompt) |
| w24 | (wave-23 slot) guide/defense restructure prep |
| w25 | (wave-20 re-ship packaging) |
| w26 | NO EMOJIS law; Brave SETBACK root fixes (adj-cache, weights panel, shimmer fallbacks); comparison dropdowns; guide flex re-order; draft chips ALL/CLEAR; 3-4 relabel; browser team colors; tier-law sweep |
| w27 | 30-line pass; both SETBACKs fixed at root with forced-fault tests |
| w28 | During-game language law (CAR, SK, SAFETY victims); season stat chips; honors; Try AGAIN TO GO 20-0? |
| w29 | One shared field map (offense top, defense mirrored, CBs across WRs, nickel/dime slot); coaching cards from defense kit; boxed [WINS]; CPU DRAFT STRATEGY + UNDO panels; undo once per round; comparison backing panels |
| w30 | Sage-teal anchors; 85+ bold law global; AGI/COD/INJ/AWR removed; series 7 default; full team names everywhere; CBs press at LOS; DIME at nickel; X.Y Cinzel; DIME standard row; TE3/WR4/DL5 display slots; quarter cards unconditional; team-colored pbp; X [FF] Y; X [INT][TD] Y; X [SAF] Y; never SKS; dropdown titles caps; shuffled schedule; SIM GAME button |

## Era 3 — the current rounds (31 rebuilt into 32; round-32 shipped)

### Round 31 (rebuilt inside w32 — the w31 zip never reached the builder's sandbox)
1. Streak cinematic: only at the END of the game achieving 3+, never before the next game
2. Kicker ratings damped (K curve compressed); integers everywhere
3. Guide personnel badges centered; ADD `10 / 1 RB / 0 TE / 4 WR`; `X Y` line format
4. DIME card → Coaching panel (between NICKEL and FOCUS); Guide defense panel removed
5. Badge guide: `20-0` → `PRTG` (passer rating only)
6. "On the player panels" = ALL league-leader stats, left→right, starting QB
7. Footer: DARK button below the row, centered
8. ResizeObserver loop setback cured (rAF debounce + error filter)
9. SIM SEASON quiet until hover; confirm gate "ARE YOU SURE YOU WANT TO SIMULATE THE REGULAR SEASON?"
10. Chargers gold-on-blue light-mode contrast; keep 90+/85+ name law; audit all teams
11. Full lineups in preview: 85+/90+ consistency
12. "WHY THESE PLANS?" dropdown removed
13. Game reports: `28-6` over `@ BILLS` — smaller, caps, lowercase `vs`, no dot, no week
14. Integers on PTS/game and every review badge
15. Lineup dropdown: OVR after name, dropdown only
16. KR/PR: static name only; return rating right side; dropdown `<NAME> x`
17. Full depth chart: ST horizontal beneath; off+def centered; 85+/90+ names; Overall grade x
18. NICKEL/DIME capitalized everywhere
19. Badges appear one-by-one automatically at season end
20. Draft pick analysis → DRAFT PICK GRADES letter-grade table
21. "Green = your unit…" text removed
22. Light-mode tint contrast (Chiefs red-on-red class of bug), all teams
23. All-Pro/Pro Bowl: your players visually obvious
24. `IN DA CLUTCH` → `CLUTCH GAMES`
25. `RUSHER WON` capitalized
26. OL: `SK` (never SK A/SKS), `PRSS` (never PRSS A)
27. "TEAM A / TEAM B" text removed from comparison
28. Season options (new season / new draft) at the bottom of EVERY season screen
29. 100-seasons: "WHAT DRIVES WINNING" bar graph removed
30. Plans Across the League: vertical per-personnel `RUN+ x% / EVEN x% / PASS+ x%`
31. "REGULAR SEASON REVIEW" panel above the badges (with SIM PLAYOFFS)
32. Champion line: no dash, fully visualized (crest + wordmark + shine)
33. Draft: no second QB before round 25 (CPU)
34. Comparison `81.56 vs 80.86` → centered integers
35. Season-review units → UNIT REPORT CARD letter-grade badges (no hover); old panel removed
36. "WHAT SEPARATED THE PLAYOFF TEAMS" removed completely
37. "(by cumulative game impact)" removed
38. "REGULAR-SEASON AWARDS & HONORS" capitalized
39. `DEF TD` → `TD` everywhere
40. Returners sorted by rating in the playoffs stats
41. Try-again modal: `RUN IT BACK · SAME TEAM` / `CALL AN AUDIBLE · NEW TEAM` / `CANCEL`
42. Fumble chains: `x [FF] y [FR][TD]`; same-man `z [FUM] x [FF][FR][TD]`
43. During-game 85+/90+ audit
44. All TDs boxed `[TD]` during the game
45. During-game: `AT` → `@`
46. Preview cards: max 3 stat badges, no zero-value stats

### Round 32 (shipped in w32)
1. Madden rankings anchor: green → PINK
2. Homepage more pink than brown (light + dark)
3. Player browser centered on screen
4. Mobile: everything visible, no horizontal scroll; mobile-only swipe-through of players/panels/badges
5. Position rankings: no horizontal scroll; player + OVR always on one line
6. Comparison: Team B dropdown right-aligned (kept from w30, re-verified)
7. Full team name at every width (never city-only) (kept, re-verified)
8. ELEPHANT removed → DL5
9. Field map: NICKEL swaps with the DE; DIME on the NICKEL's row; DL across the OL
10. Coaching panel: remove the QB-and-five-linemen sentence
11. Balanced/neutral focus = `≡` (not three bars/balls), everywhere
12. Draft-board callout: remove ", not just size"; two sentences on separate lines
13. ResizeObserver setback note: fixed properly (again)
14. Draft board: DIME vertical alignment (the belong map row); `/ELEPHANT` removed
15. 3-4: OLB1 between DL5 and ILB1 (depth-list order)
16. Flex dropdown opens on ONE click (static look unchanged)
17. Draft-review LOS viz: hover a station → the player's card lights below
18. "WHERE THEY BELONG" → "WHERE YOUR PLAYERS LINE UP?"
19. Remove the initials sentence (not true anymore)
20. (Note: nickel covers WR3, dime covers WR4 — never written on the site)
21. YOUR BREAKDOWN under the player panels, below the "Position rank counts…" line, as badges
22. Integers everywhere except PRTG (standing reminder)
23. SEASON OPENER cinematic before Game 1 (fades in, fades out)
24. Division-rival cinematic: random phrase generator (28 phrases); the tag loses its period
25. Your-players cards: 90+ shimmer / 85+ bold / neutral in team colors (audit)
26. Fumble format (restated — see round 31 #42)
27. During-game name law tests (restated)
28. Boxed [TD] (restated)
29. `@` (restated)
30. Preview 3-stat max (restated)
31. End-of-season panel appears only at the end of the cinematic (no flash)

## Interpretations still awaiting the Owner's veto (from the w32 ledger)
1. Kicker math damped in the rating curve (not display-only)
2. Field-map swap read literally: DE1 takes the nickel's old press slot; DIME tucked inside the nickel on the same row
3. Rivalry phrase pool deduped to 28 (DIVISIONAL DUEL listed twice)
4. Mobile swipe = coarse-pointer only; desktop untouched
5. QB-25 rule applies to the CPU draft; the user's own picks are never blocked
