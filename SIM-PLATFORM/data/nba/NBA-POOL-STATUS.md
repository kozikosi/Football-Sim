# NBA pool status — what is rated, what is resolved, what is left

**SPEAKER: MiniMax | ROLE: council reviewer (S-1900–1999) | TASK: the Owner's 2027 + all-time NBA data | DATE: 2026-10-21T10:05:00Z**

**The Owner's decisions applied here:** basketball is a **10-round draft**, so the pool target is
**~500 players**; the council resolves the single-token names and fills positions.

## 1 · The current NBA pool (2027 ratings) — `nba-2027-owner-ratings.json` (sha256 `66aa56928d2e8475…`)

- **539 records**, every rating the Owner's own integer, every record with provenance. (One name —
  **Quadir Copeland, 68** — was dropped by the council's transcription and has been recovered from the
  Owner's paste; the list is now complete at 539, which matches an independent transcription by
  another seat.)
- **Positions filled for all 539** (the council's knowledge, each with a confidence flag:
  **345 high, 194 medium** — the medium ones are mostly 2025–27 rookies and deep bench).
  Spread: **C 121 · PG 119 · SG 101 · SF 112 · PF 85** — a balanced five-position rotation.
- **Conventional spellings applied** (the Owner's rule: bespoke names become conventional names) —
  diacritics: Jokić, Şengün, Porziņģis, Buzeliņš, Vučević, Topić, Bogdanović, Valančiūnas, Nurkić,
  Schröder, Jović, Salaün, Traoré, Diabaté; and the Owner's explicit ruling **Terance Mann →
  Terrance Mann**; also A.J. Dybantsa and A.J. Lawson. The source spelling is kept in `name_source`
  and every change is listed in `meta.spelling_corrections`.
- **Franchises are deliberately absent** — the Owner's 2K export is the franchise source, per her
  direction. They are the last missing field for this pool.

## 2 · The all-time pool — `nba-alltime-top100-owner.json` (sha256 `08d99c9cbed77fc4…`)

- **100 player-seasons = 87 distinct people** (LeBron ×3, Durant ×3, Kawhi ×3; Shaq, Kareem, Wilt,
  Julius Erving, Oscar Robertson, Moses Malone, Anthony Davis ×2) — the first real instance of the
  Owner's "keep person identity and player-season distinct" rule.
- The Owner supplied **positions** here, plus country, height, Hall-of-Fame and badges.

## 3 · The token resolution — `nba-alltime-candidates-resolved.json` (sha256 `2e38ae894011dd37…`)

The Owner's notes list people as single tokens (`Kareem`, `Magic`, `Wemby`, `Penny`, `Admiral`…).
The council resolved them:

|                                                    |                                                                                                                                                                                                                                                                                                                                count |
| -------------------------------------------------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| **people listed**                                  |                                                                                                                                                                                                                                                                        **477** rows, one row per person (466 distinct source tokens) |
| **rows needing confirmation**                      |                                                                                                                                                                                              **63** — a token that could mean several people contributes one row per person, each with its own position, marked `needs_confirmation` |
| **the Owner's five answers, applied**              |                                                                                                                                                                                                                                               Bob Dandridge, Mark Eaton, Lafayette Lever, Michael Ray Richardson, Robert Williams II |
| **still open — need a person**                     |                                                                                                                                                                                                             **1** — `Brian Taylor` (the Owner could not identify it, and no NBA player by that name can be asserted from the source) |
| **not players** (headings, team names, a username) | **26** — including `Bingo`, `Bucks`, `Celtics`, `Cornbread`, `Crief`, `Decades`, `Domantis`, `Frontcourts`, `Hawks`, `Kenon`, `Kmart`, `Knicks`, `Lakers`, `Nuggets`, `Rockets`, `Sixers`, `Spurs`, `Starters`, `Theirs`, `Warriors`, `Bench`, `Starting Five`, `Basic Draft`, `Best Duos`, `Reddit Goat Calcukator`, `Top Peak NBA` |
| positions attached                                 |                                                                                                                                                                                         every listed person carries a position (C, PF, SF, PG or SG) with a confidence flag; nicknames and arrow notation are removed from the names |

**Shape: one row per person.** The Owner's instruction — _"no not x / y, just x, y, z, etc. … Don't combine those names into one file. And get rid of the nicknames and the arrows"_ — is applied literally: each name is its own row, each carries its own position, the source token is kept in `source_tokens` for the trail, and no name carries a quoted nickname (`Anfernee Hardaway`, `Jerome Bogues`, `Andy Groza`).

**The Owner's mapping (21 Oct) is authoritative** and closed most of the earlier 99: **74 tokens**
mapped, including `Alvin → Alvin Robertson (or Alvin Attles)`, `Arizin → Paul Arizin`, `Armstrong → BJ
Armstrong (or Darrell Armstrong)`, `Barnes → Matt Barnes (or Harrison Barnes / Rickey Green / Marvin
Barnes)`, `Beatty → Zelmo Beaty`, `Big Ben → Ben Wallace`, `Ihart → Isaiah Ihart (or Isaiah
Hartenstein)`, `Jalen → Jalen Rose (Jalen Brunson / Jalen Williams / Jalen Green)`, `Maurice → Maurice
Lucas (Maurice Cheeks / Maurice Stokes / Maurice Harkless)`, `Timmy → Tim Hardaway (Tim Duncan / Tim
Hardaway Jr.)`, `Robinson → Glenn Robinson (Nate Robinson / Bill Robinson / Cliff Robinson)`, `White → Z.B.
White (Derrick White)`, `Hayes → Elvin Hayes (Jarvis Hayes / Jaxson Hayes)`, `Haywood → Spencer Haywood
(Brendan Haywood)`, `Reeves → Bryant "Big Country" Reeves (Austin Reaves)`, `Thompson → Klay Thompson
(Tristan Thompson / David Thompson)`, `Sharpe → Shaedon Sharpe (Day'Ron Sharpe)`, `Ellis → Monta Ellis
(Dale Ellis / LaPhonso Ellis)`, `D Williams → Deron Williams (DerMarr Williams / Buck Williams)`,
`Daniels → Mel Daniels (Marquis Daniels / Dyson Daniels)`, `Powell → Dwight Powell (Norman Powell)`,
`Miller → Reggie Miller (Mike Miller / Andre Miller)`, `Divencenzo → Donte DiVincenzo`, `Brand → Elton
Brand`, `Braun → Christian Braun`, `Buddy → Buddy Hield`, `Burleson → Tom Burleson`, `Camara → Toumani
Camara`, `Campy → Campy Russell`, `Caron → Caron Butler`, `Carter → Vince Carter`, `Cason → Cason
Wallace`, `Chambers → Tom Chambers`, `Chenier → Phil Chenier`, `Coleman → Derrick Coleman`,
`Cooper → Michael Cooper`, `Cummings → Terry Cummings`, `Daugherty → Brad Daugherty`,
`Dick Barnett → Dick Barnett`, `Donaldson → James Donaldson`, `Freddie Lewis → Freddie Lewis`,
`Gafford → Daniel Gafford`, `Granger → Danny Granger`, `Guerin → Richie Guerin`, `Hagan → Cliff Hagan`,
`Herb Williams → Herb Williams`, `Hersey → Hersey Hawkins`, `Hodges → Craig Hodges`,
`Houston → Allan Houston`, `Hudson → Lou Hudson`, `Ingram → Brandon Ingram`,
`Jamison → Antawn Jamison`, `Joe Johnson → Joe Johnson`, `Johnston → Neil Johnston`,
`K Willis → Kevin Willis`, `Kenny Jet → Kenny "The Jet" Smith`, `Kersey → Jerome Kersey`,
`Laphonso → LaPhonso Ellis`, `Larry Johnson → Larry Johnson`, `Marin → Jack Marin`,
`McMillan → Nate McMillan`, `Myles → Myles Turner`, `Netolicky → Bob Netolicky`,
`Novak → Steve Novak`, `Ostertag → Greg Ostertag`, `Paultz → Billy Paultz`, `Purvis → Purvis Short`,
`Rider → Isaiah Rider`, `Roberson → Andre Roberson`, `Rollins → Tree Rollins`,
`Roy Hinson → Roy Hinson`, `Sears → Kenny Sears`, `Sleepy → Sleepy Floyd`,
`Steve Johnson → Steve Johnson`, `Wicks → Sidney Wicks`.

**Six remain genuinely open** — no candidate can be asserted from the source without guessing:
`Dandridge`, `Eaton`, `Lever`, `Michael Ray`, `Timelord`, `Brian Taylor`. These need a person.

## 4 · The geometry at the Owner's target

|                                  | football      | basketball (Owner's target)   |
| -------------------------------- | ------------- | ----------------------------- |
| teams                            | 32            | 30                            |
| rounds × picks                   | 26 × 32 = 832 | **10 × 30 = 300**             |
| pool                             | 1,200         | **~500**                      |
| reserve ratio (undrafted ÷ pool) | 0.38          | **0.40**                      |
| what the draft takes             | 832 of 1,200  | **300 of ~500** — the top 60% |

**Two consequences worth stating.** (a) A 500-player pool with a 10-round draft means the draft reaches
**further down the scale** than football's does: with the 2027 shape, the 300th pick lands inside the
70–74 band, so a mid-tier current player is a real pick rather than a reserve. (b) At 500 records the
**elite band is thin**: only 21 of 538 sit above 90 (3.9%), so the top of the NBA draft will be
decided by a handful of names and the median pick will be a role player — the all-time pool needs
either a deeper mid-tier or a wider scale to make the later rounds interesting.

## 5 · What is still missing for an engine-ready NBA pool

1. **Franchises for all 538** (2K export).
2. **An NBA attribute set and an NBA value curve** — OVR plus a few meaningful basketball attributes
   (rim protection, three-point shooting) and the analogue of `slotWins` → `modelWeights`, because
   the NBA scale is **67–97** against football's 70–99 and a shared value model would bias every pick.
3. **The 99 ambiguous identities** settled by a person.
4. **The Owner's pool approval** for each of the three files.
