# W28 INTAKE LEDGER — Owner round 28 (28 Oct 2026, session 20)

Base: Football-Sim-Z-post-blue-w27.html (md5 b2adf669cc7e6fd07868e56c3c70c0af, 1,352,103 B) on council/zai @9c985f5.
Output: Football-Sim-Z-post-blue-w28.html + z-post-blue-wave28 zip. View layer only; sim math untouched except: FG-attempt tracking (new `fga` stat), safety assist name (new `safeties` record shape) — both presentation-driven, scoreboard math unchanged.

| # | Owner directive (abridged) | Landing | Interpretation / note |
|---|---|---|---|
| 1 | VS. ACTUAL NFL TEAMS only on the first Draft Review page; gone once the season starts | renderDraftResults | Gate on `seasonState` existed; hardened: a stale `resultsView==='nfl'` is forced back to SEASON whenever a season exists, so neither the tab nor its view can appear mid-season |
| 2 | Game preview: two copies of team names — keep the one in line with the 48/52 bar, remove the lower non-Cinzel copy | starsFaceoffHTML (w27 card version) | Removed the `zpb-pvface` header (zpb-pvteamhd names have no Cinzel); the strip names (`.zpb-strip-team b`, Cinzel Decorative) stay beside the bar |
| 3 | "KC gives it up" must never appear; player names on every line | zpbGameReplay | Root cause found: the takeaway queues were cross-wired (home TO events read home's OWN takeaways instead of the away defense's). Fixed pairing + belt-and-braces padding from the box score so a name always exists |
| 4 | Fumble = one line per player: "KC x [FUM] / DEN y [FF] / DEN z [FR]"; same-player FF&FR on one line; "x [INT] y" stays | zpbGameReplay TO block | Implemented exactly; the winner dot rides the last line of the group; time chip repeats per line |
| 5 | Safeties have at least two players involved | buildDefenseDetail + replay + review prose | Sim now records an assist (`{n1,n2}`); replay SAF line reads "y & z"; review prose names both |
| 6 | Badges always capitalized: "1 FF2 tkl1 fumble recovery" → "1 FF 2 TKL 1 FR" | gameStatLine + extraStats | Full chip law rewrite (see #7-#11) |
| 7 | Carries = "C", added to the Guide | chips + zpbBadgesGuideHTML | "300 C" chip documented |
| 8 | "rush yds" → "RUSHY" | lines/chips | Also PASSY/RECY coined on the same pattern; OL run-yards-behind reads RUSHY |
| 9 | "sacked x1" → "1 SK" | gameStatLine QB | |
| 10 | "Safety" → "1 SAF" | extraStats | |
| 11 | "yds" → "Y" (always) | leaders tables + chips | Table headers: Yds→Y, Yds behind→Y behind, Total yds→Total Y |
| 12 | Game preview player ORDER + SELECTION by season rating | starsFaceoffHTML cardsOf | Sorted/selected by `_rating` (OVR fallback before week 1) |
| 13 | Kicker shows as the same person on both teams (game review) | renderKeyPlayersHTML side() | Root cause: the MVP was prepended to BOTH team cards; now only into his own team's card |
| 14 | Player from one team in the wrong team's area | same | Same root cause as #13 |
| 15 | Team stats auto-visible; all tab titles on preview + review capitalized ("TEAM STATS") | renderGameResultHTML + panel titles | `<details open>`; TEAM STATS, KEY PLAYERS, GAME PLAN, LINEUPS, MATCHUP MATH, AROUND THE LEAGUE |
| 16 | Remove the "Each position has its own rating (50 = average starter)…" paragraph | leadersInner | Whole paragraph incl. position blurbs removed |
| 17 | Leaders tab: remove RATE, 2PT, TD, INT, RUSH, LOST, CAR, PANCAKES, BLK, SAF | leaderBoards | Per-board: QB loses Rate/2PT/bare TD/bare INT (TD/INT survives combined); RB loses Car/Rush/Lost/2PT; WR+TE lose 2PT; OL loses Pancakes; DL/LB/DB lose Blk+Saf. KEPT: TD on RB/WR/TE, INT on LB/DB — flagged for veto (a flat global removal would gut the DB board of its primary stat) |
| 18 | "TD:INT" → "TD/INT", stats listed in that format | QB board | Header TD/INT, value "28/8" (same combined pattern as Cmp/Att) |
| 19 | ADD "C/RUSHY" to the RB table | RB board | "267/1450" |
| 20 | OL chart: YDS always Y | OL board | "Y behind" |
| 21 | Pressure → "PRSS" | boards + chips | PRSS / PRSS A |
| 22 | Sacks → "SK" / "SKS" plural | boards + chips | QB sacked header → SK; DL/LB header → SKS |
| 23 | Kicker FG as "X/Y" (made/attempts) | K board + chips + zpbStatChipsHTML | NEW `fga` stat: sim records misses as small ovr-driven noise; scoreboard untouched |
| 24 | KR / PR as "x/y" (returns/yards) | RET board + chips | |
| 25 | Remove the RAW STAT button | leadersInner | The lone "Performance rating" toggle went with it (a single button with no alternative is noise); the rating view is now the only view |
| 26 | Guide: Mike/Will/Sam etymology | termsHTML | New glossary entry, verbatim Owner lines |
| 27 | Remove "Kansas City Chiefs grades 2.38 points higher…" on Team Comparison | renderComparisonTab | Verdict sentence + its `<p>` removed |
| 28 | Team Comparison auto-compares your team to its biggest rival (in the sim, not actual) | renderComparisonTab | Full 32-team rivalry table embedded; Team B defaults to SIM:<rival>; falls back to actual if the sim roster is somehow missing |

Open items flagged for Owner veto (none block shipping):
- #17: TD kept on RB/WR/TE boards and INT kept on LB/DB boards (see note).
- #25: the whole "Sorted by" row went, not only the Raw stat button.
- #8: PASSY/RECY coined by the same fusion pattern the Owner used for RUSHY.
- #23: FG attempts are generated as small miss-noise (the sim never modeled misses before); attempts ≥ made always.
