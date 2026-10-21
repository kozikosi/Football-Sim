# W6 — All-time player source intake: data-quality report

**Author:** MiniMax (council seat S-1900-1999)
**Date (UTC):** 2026-10-21
**Branch analysed:** `origin/gpt/all-time-player-source-intake-20261020` (commit `04edab9` "Link first source-backed all-time omission pass")
**Scope of intake:** `_agents/gpt/research/all-time/` inside the nested clone `Football Sim/`
**Nature of this report:** read-only reconciliation. **No rating is assigned, suggested or implied anywhere in this document.** Every number below is a count, a hash, a position label, a name string or a status label taken from the files.

---

## 0. Verdict summary

| # | Area | Verdict | One-line finding |
|---|---|---|---|
| 1 | Raw-file name extraction | **VERIFIED** | 3,903 player-name mentions (NFL 2,838 / NBA 1,068) across 1,470 distinct normalized names; 599 names are mentioned more than once. |
| 2 | Sport leakage (NFL files ⇄ NBA file) | **VERIFIED — no leakage** | Zero NBA players appear in any NFL raw file; zero NFL players appear in the NBA raw file. 3 same-name/different-person collisions and 69 shared surnames are the only cross-sport name overlaps. |
| 3 | Derived omission-candidate CSVs | **VERIFIED with one deviation** | 18 rows, 0 carry `engine_ovr`, 0 carry `team` or `season`, 18/18 carry `review_status` — but 17/18 `status_reference` values are **prose, not URLs**. |
| 4 | `source_manifest.json` integrity | **VERIFIED** | 9 listed raw files, 9 present, **9/9 sha256 match**, 0 mismatched, 0 missing; 9/9 byte counts and 9/9 line counts match; 0 unlisted raw files, 0 dangling entries. |
| 5 | Candidate names vs. raw text | **VERIFIED — plus one new gap** | All 17 NFL candidates and Sam Jones are genuinely absent from the raw text. **Nate Archibald (NBA 75) is also absent and is missing from the intake** — the NBA omission screen is incomplete by one player. |
| 6 | Active/retired classification | **REPORTED / INFERRED (not yet verified by the intake)** | The intake has not verified any status. 145 status-triage rows are all `unverified`; 0 rows promoted. Sam Jones' `retired` label is independently confirmed by the cited obituary. |
| 7 | Source mentions vs. engine-ready records | **VERIFIED** | **0 engine-ready records exist.** 1,470 source mentions and 18 proposed candidate rows only. |

**Overall:** the intake is a clean research inbox. It carries no rating, no franchise assignment, no peak-season assignment, and no engine-ready record. Its one substantive defect is an **incomplete NBA omission screen** (Nate Archibald), plus a **field-semantics deviation** in the NFL candidate CSV (`status_reference` is a description, not a URL). Its two soft spots are that the **raw text is not parser-safe** (U+2028 line separators, nickname-only references) and that the **derived README's claim that only Sam Jones is missing from the NBA 75 list is wrong by one player**.

---

## 1. Exact commands run

All commands are read-only. Nothing was committed, checked out, pushed, tagged, or modified; no product HTML was touched; no shared document was touched.

```bash
# 1.1  Branch inventory
git -C "Football Sim" ls-tree -r --name-only origin/gpt/all-time-player-source-intake-20261020
git -C "Football Sim" log --oneline -5 origin/gpt/all-time-player-source-intake-20261020

# 1.2  Read every intake file from the branch (no checkout)
REF=origin/gpt/all-time-player-source-intake-20261020
P=_agents/gpt/research/all-time
for f in $(git -C "Football Sim" ls-tree -r --name-only $REF | grep "^$P/"); do
  git -C "Football Sim" show $REF:$f > <scratch>/$f
done

# 1.3  Manifest hash verification, literal form (9 raw files)
for f in $(git -C "Football Sim" ls-tree -r --name-only $REF | grep "^$P/raw/"); do
  printf "%s  " "$(git -C "Football Sim" show $REF:$f | shasum -a 256 | cut -d' ' -f1)"; echo "$f"
done

# 1.4  Manifest cross-check (existence + sha256 + byte count + line count + coverage)
node <scratch>/manifest_check.js          # sha256 recomputed in-process over `git show` bytes
python3 -c "<U+2028 / U+2029 / LF byte census over the 9 raw files>"

# 1.5  Name extraction, duplicate/collision analysis, position & season conflict analysis,
#      CSV field checks, status-triage line-citation validation
node   <scratch>/extract2.js               # name extraction -> mentions.json
node   <scratch>/final.js                  # duplicates, cross-sport collisions, surname overlap
node   <scratch>/conflicts.js              # position-label conflicts, season-marker conflicts
node   <scratch>/triage_check.js           # 145 status-triage line citations re-verified
node   <scratch>/leak.js                   # 60 certain cross-sport name probes
python3 <scratch>/near_dupes.py            # spelling-variant scan (difflib ratio >= 0.80)
python3 <scratch>/nfl100_complement.py     # 100 NFL 100 players vs the 8 NFL raw files
python3 <scratch>/nba75_check.py          # 76 names on the cited nba.com page vs the NBA raw file
python3 <scratch>/nfl_roster_parse.py     # NFL.com roster group + career-span re-verification

# 1.6  Cited-source verification (HTTP GET of the URLs the CSVs cite)
#      https://www.nfl.com/100/all-time-team/roster.html
#      https://www.nba.com/nba-75-anniversary-team
#      https://www.nba.com/news/celtics-legend-sam-jones-dies-at-88
```

Scratch directory used for extraction/analysis (outside the repo, no repo writes):
`/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/alltime` and `.../kilo/atsrc`.

**Normalization rule used throughout:** lower-case, `'`→stripped, `[^a-z0-9 ]`→space, suffix tokens `jr/sr/ii/iii/iv` dropped, whitespace collapsed. This is a *string* key for counting only — it is not an identity resolution and does not merge real people.

---

## 2. Area 1 — Raw-file name extraction (VERIFIED)

### 2.1 Per-file counts

| Source ID | File | Player mentions | Distinct normalized names | Source lines carrying a name |
|---|---|---:|---:|---:|
| NFL-AT-001 | `raw/nfl/01_all_time_depth_chart.txt` | 309 | 255 | 49 |
| NFL-AT-002 | `raw/nfl/02_favorites_and_player_season_rankings.txt` | 719 | 654 | 719 |
| NFL-AT-003 | `raw/nfl/03_personnel_lists_and_position_preferences.txt` | 391 | 189 | 120 |
| NFL-AT-004 | `raw/nfl/04_player_season_ranking_variant_a.txt` | 327 | 304 | 327 |
| NFL-AT-005 | `raw/nfl/05_player_season_ranking_variant_b.txt` | 271 | 270 | 271 |
| NFL-AT-006 | `raw/nfl/06_player_season_ranking_variant_c.txt` | 262 | 262 | 262 |
| NFL-AT-007 | `raw/nfl/07_final_master_player_season_list.txt` | 349 | 320 | 349 |
| NFL-AT-008 | `raw/nfl/08_favorites_and_edge_rusher_notes.txt` | 207 | 143 | 207 |
| NBA-AT-001 | `raw/nba/01_peak_seasons_and_all_time_concepts.txt` | 1068 | 720 | 1068 |

| **NFL total (8 files)** | | **2835** | **753** | 2304 |
| **NBA total (1 file)** | | **1068** | **720** | 1068 |
| **Both sports (union)** | | **3903** | **1470** | |

Coach names (non-player named entities, kept out of the player counts):
`Ben Johnson` (NFL-AT-001:43, `OC:`), `Steve Spagnuolo` (NFL-AT-001:44, `DC:`), `Andy Reid` (NFL-AT-001:45, `HC:`).
One further role-labelled name, `Captain: Buck Buchanan` (NFL-AT-001:42), **is** a player and is counted as a player.

### 2.2 Duplicate names (mentioned more than once)

| Metric | NFL | NBA | Union |
|---|---:|---:|---:|
| Distinct normalized names | 753 | 720 | 1470 |
| Names mentioned **more than once** | **422** | **176** | **599** |
| Names mentioned exactly once | 331 | 544 | 871 |
| Total mentions | 2835 | 1068 | 3903 |

The union count (1470) is the sum of the two sport counts minus 3, because three normalized names occur in **both** sports (see §3.2).

Top 20 most-repeated NFL names: 
`derrick thomas` (18), `reggie white` (17), `charles woodson` (16), `deion sanders` (16), `ed reed` (16), `lawrence taylor` (16), `aaron donald` (15), `myles garrett` (15), `orlando pace` (15), `patrick mahomes` (15), `champ bailey` (14), `justin houston` (14), `barry sanders` (13), `ray lewis` (13), `rod woodson` (13), `ronnie lott` (13), `troy polamalu` (13), `willie lanier` (13), `aeneas williams` (12), `anthony mu oz` (12).

Top 20 most-repeated NBA names: `jokic` (12), `kareem` (11), `kawhi` (11), `lebron` (11), `embiid` (10), `giannis` (10), `shaq` (10), `ad` (9), `duncan` (8), `magic` (8), `wilt` (8), `curry` (7), `ewing` (7), `kd` (7), `kg` (7), `admiral` (6), `bird` (6), `doncic` (6), `hakeem` (6), `barkley` (5).

**Complete duplicate tables are in Appendix A (NFL, 422 names) and Appendix B (NBA, 176 names).**

Why duplicates are expected, not a defect: the intake deliberately keeps several overlapping ranking files
(NFL-AT-002/004/005/006/007 all re-rank the same pool) plus a depth chart (NFL-AT-001) and a personnel
file (NFL-AT-003). Duplicate *mentions* across files are the intended property of the source. Duplicate
*records* are not — and there are none, because no derived record is duplicated.

---

## 3. Area 2 — Sport leakage (VERIFIED: no leakage)

### 3.1 Directional probe

60 certain, high-salience names were probed against the opposite sport's corpus (substring + word-boundary match), then every hit was manually read in context:

| Direction | Probed names | Raw hits | Adjudication |
|---|---:|---:|---|
| NBA players → 8 NFL raw files | 44 | 6 | **0 real.** All 6 are false positives: `Kareem Hunt` ≠ Kareem Abdul-Jabbar, `Saquon Barkley` ≠ Charles Barkley, `Julius Peppers` ≠ Julius Erving, `J.J. Birden` ≠ Larry Bird, `Shaquil Barrett` ≠ Shaquille O'Neal, `Nakobe Dean` ≠ Kobe Bryant. |
| NFL players → NBA raw file | 16 | 0 | **0 real.** |

**Verdict: VERIFIED — there is no sport leakage in the raw material.** The prior MiniMax integrity note
(`quality-control/minimax-data-integrity-review.md`) reported a Stephen Curry leak; that leak is **not present
in this branch** — "Curry" occurs only in `raw/nba/01_peak_seasons_and_all_time_concepts.txt:28` and in no NFL file.

### 3.2 Same-name / different-person collisions (must not be merged)

| Normalized name | NFL mentions | NBA mention | Assessment |
|---|---:|---|---|
| `larry johnson` | 8 (NFL-AT-001:50, 002:35, 003:67, 004:192, 005:161, 006:95, 007:93, 008:77) | 1 (`'93 Larry Johnson`, NBA-AT-001:118) | **Different people.** NFL entry carries the `[KC]` team tag and the 2005 season; NBA entry carries the 1993 season. |
| `steve smith` | 2 (NFL-AT-002:523 `’05`, NFL-AT-004:215 `'05`) | 1 (`'00 Steve Smith`, NBA-AT-001:366) | **Different people.** Different sports, different seasons. |
| `joe johnson` | 1 (NFL-AT-002:667 `'00`) | 1 (NBA-AT-001:509, no season) | **Different people.** |

**Consequence for any future join:** a name-only key across the two sport folders will produce three false
merges. The intake's folder + `sport` field separation is what prevents this; it must be preserved.

### 3.3 Surname-level overlap (69 surnames)

69 surnames appear in both sports (e.g. `johnson`, `smith`, `brown`, `jones`, `williams`, `thomas`, `walker`,
`williams`, `harrison`, `robinson`, `jackson`, `green`, `davis`, `taylor`, `miller`, `moore`, `murray`,
`russell`, `fisher`…). Every one inspected resolves to two different people. This is a **low-risk** overlap
because the first name differs in all 69 cases, but it means surname-only matching is unusable here.

### 3.4 One cross-sport *name* coincidence worth recording

`Ben Johnson` appears in the NFL-AT-001 `Coaches` block as `OC:` (line 43). The same name belongs to a
well-known NBA player (Duke standout / NBA champion). This is **not** leakage — he is recorded in the
coaching role, inside the NFL file, with a role label — but a future parser that strips the `OC:` prefix and
drops the `role` field would create a basketball player out of an offensive coordinator.
**Label: CERTAIN name coincidence / INFERRED namesake.**

---

## 4. Area 3 — Derived omission-candidate CSVs (VERIFIED with one deviation)

### 4.1 Schema and row counts

Both files share one 16-field header:

```
candidate_id, sport, canonical_name, position_group, career_status, career_span,
season, team, engine_ovr, source_class, owner_source_match, selection_reference,
status_reference, status_checked_as_of, review_status, notes
```

| File | Data rows | Sport value | `review_status` values present |
|---|---:|---|---|
| `derived/nfl/official-all-time-gap-candidates.csv` | **17** | all `NFL` | `proposed; owner review pending` (17/17) |
| `derived/nba/official-all-time-gap-candidates.csv` | **1** | `NBA` | `proposed; owner review pending` (1/1) |

### 4.2 Rating / franchise / season audit — the core question

| Check | NFL CSV (17 rows) | NBA CSV (1 row) | Verdict |
|---|---|---|---|
| Any row with a non-empty `engine_ovr` | **0** | **0** | **VERIFIED — no row carries a rating.** |
| Any row with a non-empty `team` (franchise) | **0** | **0** | **VERIFIED — no row carries a franchise assignment.** |
| Any row with a non-empty `season` (peak season) | **0** | **0** | **VERIFIED — no row asserts a peak season.** |
| Any row with a non-empty `canonical_name` | 17 | 1 | VERIFIED |
| Any row with a non-empty `review_status` | 17 | 1 | VERIFIED |
| Any row with a non-empty `status_reference` | 17 | 1 | VERIFIED (non-empty) — but see §4.3 |
| Any row with a non-empty `position_group` | 17 | **0** (Sam Jones) | VERIFIED (blank, as the notes state) |

Every row also carries `status_checked_as_of = 2026-10-20` and `career_status = retired`.

### 4.3 Deviation found — `status_reference` is not a URL in 17 of 18 rows

The work package asks that *"every row has a `status_reference` URL"*. Measured result:

| Row(s) | `status_reference` content | Is a URL? |
|---|---|---|
| NFL-GAP-001 … NFL-GAP-017 (17 rows) | `NFL.com official roster career span, ending before the source roster publication` | **NO — prose.** The URL is in `selection_reference` (`NFL 100 All-Time Team roster — https://www.nfl.com/100/all-time-team/roster.html`). |
| NBA-GAP-001 (1 row) | `NBA.com Sam Jones profile and obituary — https://www.nba.com/news/history-nba-legend-sam-jones ; https://www.nba.com/news/celtics-legend-sam-jones-dies-at-88` | Partially — two URLs embedded in prose, not a bare URL field. |

**Verdict: REPORTED deviation.** The field is populated (so provenance is not missing), but the field contract
"status_reference = URL" holds for 0 rows in bare form and 1 row in embedded form. Either the field should be
redefined as "status source description" or the NFL rows should carry a real status URL.

### 4.4 `position_group` re-verified against the cited roster — one mismatch

All 17 NFL candidates were re-matched against the cited `https://www.nfl.com/100/all-time-team/roster.html`
(official position group **and** career span). Result: **16 of 17 position groups and 17 of 17 career spans match exactly.**

| Candidate | CSV `position_group` | NFL.com group | Career span (CSV) | Career span (NFL.com) | Result |
|---|---|---|---|---|---|
| Earl "Dutch" Clark | RB | RB | 1931-1938 | 1931-1938 | match |
| Marion Motley | RB | RB | 1946-1955 | 1946-1955 | match |
| Steve Van Buren | RB | RB | 1944-1951 | 1944-1951 | match |
| Chuck Bednarik | LB | LB | 1949-1962 | 1949-1962 | match |
| Joe Schmidt | LB | LB | 1953-1965 | 1953-1965 | match |
| Bill Hewitt | DE | DE | 1932-1943 | 1932-1943 | match |
| Jack Christiansen | S | S | 1951-1958 | 1951-1958 | match |
| **Shane Lechler** | **K** | **PS (punter, grouped with Ray Guy)** | 2000-2017 | 2000-2017 | **position_group mismatch** (the NFL.com `K` group is Stenerud + Vinatieri) |
| Billy "White Shoes" Johnson | Returner | Returner (RS) | 1974-1988 | 1974-1988 | match |
| John Mackey | TE | TE | 1963-1972 | 1963-1972 | match |
| Roosevelt Brown | OT | OT | 1953-1965 | 1953-1965 | match |
| Cal Hubbard | OT | OT | 1927-1936 | 1927-1936 | match |
| Dan Fortmann | G | G | 1936-1943 | 1936-1943 | match |
| Mel Hein | C | C | 1931-1945 | 1931-1945 | match |
| Elroy Hirsch | WR | WR | 1946-1957 | 1946-1957 | match |
| Paul Warfield | WR | WR | 1964-1977 | 1964-1977 | match |
| Brett Favre | QB | QB | 1991-2010 | 1991-2010 | match |

**VERIFIED finding:** `NFL-GAP-008` (Shane Lechler) is labelled `K` (kicker) while the cited source groups him
as a punter (`PS`). His own notes column says "Special-teams role; do not force into a standard offense/defense
slot without an owner decision", which is consistent with a punter reading — the `position_group` cell is the
outlier. This is a position-label defect, not a rating defect.

### 4.5 Status-triage CSVs (adjacent derived files)

| File | Rows | `career_status` values | Line citations re-verified against the raw file | Rating fields |
|---|---:|---|---:|---|
| `status-triage/nfl/recent-season-mentions.csv` | 66 | `unverified` (66/66) | **66/66 match byte-for-byte** | none |
| `status-triage/nba/recent-season-mentions.csv` | 79 | `unverified` (79/79) | **79/79 match byte-for-byte** | none |

**VERIFIED:** the 145 rows carry no rating, no team and no promoted status, and every `source_file` +
`line_number` + `raw_line` triple resolves exactly to the cited line in the cited raw file.
Note: the `line_number` values are **LF-based file line numbers** (not list-rank numbers) — e.g.
`NFL-AT-002:93` is the physical line `3. '26 Myles Garrett`. This is consistent with the manifest's line counts.

---

## 5. Area 4 — `source_manifest.json` (VERIFIED)

Manifest: `version 1`, 9 `sources` entries, each with `id`, `sport`, `path`, `attachment_id`, `summary`,
`bytes`, `lines`, `sha256`, `original_attachment`.

### 5.1 Hash-match table

| Source ID | Path | sha256 (manifest) | sha256 (actual) | Result | bytes rec/act | lines rec/act |
|---|---|---|---|---|---|---|
| NFL-AT-001 | raw/nfl/01_all_time_depth_chart.txt | `f10eba657cd921539a663c19cbb255042e9cfd0d65073a4e19dc76aece0bcbf8` | `f10eba657cd921539a663c19cbb255042e9cfd0d65073a4e19dc76aece0bcbf8` | **MATCH** | 5295 / 5295 | 84 / 84 |
| NFL-AT-002 | raw/nfl/02_favorites_and_player_season_rankings.txt | `d712ae442cd328a95608eeb22711a52de2526faa2e3f1356dd916a733328cf78` | `d712ae442cd328a95608eeb22711a52de2526faa2e3f1356dd916a733328cf78` | **MATCH** | 16887 / 16887 | 725 / 725 |
| NFL-AT-003 | raw/nfl/03_personnel_lists_and_position_preferences.txt | `2dda533db579e68403d9ea22f5607369adbbffaf0186e17d6131e0e342637915` | `2dda533db579e68403d9ea22f5607369adbbffaf0186e17d6131e0e342637915` | **MATCH** | 7246 / 7246 | 161 / 161 |
| NFL-AT-004 | raw/nfl/04_player_season_ranking_variant_a.txt | `7d1583a0cd407508e22fb717b1cc42517947da41a198803084baeebbd79c8c45` | `7d1583a0cd407508e22fb717b1cc42517947da41a198803084baeebbd79c8c45` | **MATCH** | 7627 / 7627 | 328 / 328 |
| NFL-AT-005 | raw/nfl/05_player_season_ranking_variant_b.txt | `700f46dd7476bd136e0886c41e55cbd71d9b101b4039757dee6812ee3feaf953` | `700f46dd7476bd136e0886c41e55cbd71d9b101b4039757dee6812ee3feaf953` | **MATCH** | 6261 / 6261 | 272 / 272 |
| NFL-AT-006 | raw/nfl/06_player_season_ranking_variant_c.txt | `c84c30df703b407617d75bd82ac7400dabdeebda6c164cf4f20aac95b1ad3baa` | `c84c30df703b407617d75bd82ac7400dabdeebda6c164cf4f20aac95b1ad3baa` | **MATCH** | 6064 / 6064 | 264 / 264 |
| NFL-AT-007 | raw/nfl/07_final_master_player_season_list.txt | `a7cf7d79ce56863939f2ea6942429be01fc6ea3db3f080cbbbf2be38e3002aee` | `a7cf7d79ce56863939f2ea6942429be01fc6ea3db3f080cbbbf2be38e3002aee` | **MATCH** | 8101 / 8101 | 351 / 351 |
| NFL-AT-008 | raw/nfl/08_favorites_and_edge_rusher_notes.txt | `430534448d99b711b9103cd1db1fb59dc16f950b1f44e8ed517dddb1aabd5a79` | `430534448d99b711b9103cd1db1fb59dc16f950b1f44e8ed517dddb1aabd5a79` | **MATCH** | 7818 / 7818 | 210 / 210 |
| NBA-AT-001 | raw/nba/01_peak_seasons_and_all_time_concepts.txt | `fcbafb37ba93053e867f520030806d6f47d34d8a3343d8c569999089ba720b11` | `fcbafb37ba93053e867f520030806d6f47d34d8a3343d8c569999089ba720b11` | **MATCH** | 12325 / 12325 | 1220 / 1220 |

**Matched: 9 · Mismatched: 0 · Missing: 0.**

### 5.2 Coverage

| Check | Result |
|---|---|
| Raw files present in the tree | 9 |
| Raw files listed in the manifest | 9 |
| **Raw files present but UNLISTED** | **0** |
| Manifest entries with no file in the tree | 0 |
| Non-raw files in the intake (outside manifest scope) | `derived/nfl/official-all-time-gap-candidates.csv`, `derived/nba/official-all-time-gap-candidates.csv`, `status-triage/nfl/recent-season-mentions.csv`, `status-triage/nba/recent-season-mentions.csv`, plus 3 READMEs and `quality-control/minimax-data-integrity-review.md` |

**The manifest is complete for the raw corpus and byte-exact.** VERIFIED.

### 5.3 Caveat — the raw files are not parser-safe (REPORTED)

The manifest's `lines` count is **LF-based**. Three of the nine raw files additionally use **U+2028
(LINE SEPARATOR)** as a line break, so any tool that splits on U+2028 (JS `splitlines`-style, Python
`str.splitlines()`) sees a different line count than the manifest records:

| File | LF count | U+2028 count | Manifest `lines` | Lines seen by a U+2028-aware splitter |
|---|---:|---:|---:|---:|
| raw/nfl/01_all_time_depth_chart.txt | 83 | **23** | 84 | 106 |
| raw/nfl/03_personnel_lists_and_position_preferences.txt | 160 | **54** | 161 | 215 |
| raw/nfl/08_favorites_and_edge_rusher_notes.txt | 209 | **49** | 210 | 259 |
| all other six raw files | — | 0 | as tabled | identical |

U+2029 (PARAGRAPH SEPARATOR) and CR appear **0** times in all nine files.

Impact: any future ledger that cites "line N" must declare the convention. The intake is currently
**internally consistent** — the 145 status-triage citations all resolve under LF numbering — but the
convention is undocumented in the manifest. This should be stated in `source_manifest.json` (e.g. a
`line_ending_convention` field) before a downstream tool relies on it.

---

## 6. Area 5 — Candidate names vs. the raw text (VERIFIED, plus one new gap)

### 6.1 The 18 candidate names are genuinely absent

Full-phrase + alias search over the whole raw corpus of the matching sport (not just one file):

| Candidate | Sport | Search terms used | Hits in raw corpus | Present in raw? |
|---|---|---|---:|---|
| Earl "Dutch" Clark | NFL | `earl dutch clark`, `dutch clark`, `earl clark` | 0 | **absent** |
| Marion Motley | NFL | `marion motley`, `motley` | 0 | **absent** |
| Steve Van Buren | NFL | `steve van buren`, `van buren` | 0 | **absent** |
| Chuck Bednarik | NFL | `chuck bednarik`, `bednarik` | 0 | **absent** |
| Joe Schmidt | NFL | `joe schmidt`, `schmidt` | 0 | **absent** |
| Bill Hewitt | NFL | `bill hewitt`, `hewitt` | 0 | **absent** |
| Jack Christiansen | NFL | `jack christiansen`, `christiansen` | 0 | **absent** |
| Shane Lechler | NFL | `shane lechler`, `lechler` | 0 | **absent** |
| Billy "White Shoes" Johnson | NFL | `billy white shoes johnson`, `white shoes johnson`, `billy johnson` | 0 | **absent** |
| John Mackey | NFL | `john mackey`, `mackey` | 0 | **absent** |
| Roosevelt Brown | NFL | `roosevelt brown` | 0 (the bare surname "brown" occurs 44× for *other* Browns: Jim, Derrick, Jerome, Willie, Bob, Antonio, A.J., Aaron, Roger, Greg, Chad, Sheldon, Tim, Amon-Ra St., Orlando, Fred, P.J.) | **absent** |
| Cal Hubbard | NFL | `cal hubbard`, `hubbard` | 0 | **absent** |
| Dan Fortmann | NFL | `dan fortmann`, `fortmann` | 0 | **absent** |
| Mel Hein | NFL | `mel hein`, `hein` | 0 | **absent** |
| Elroy Hirsch | NFL | `elroy hirsch`, `hirsch` | 0 | **absent** |
| Paul Warfield | NFL | `paul warfield`, `warfield` | 0 | **absent** |
| Brett Favre | NFL | `brett favre`, `favre` | 0 | **absent** |
| Sam Jones | NBA | `sam jones` | 0 (the bare surname "jones" occurs 5× for *other* Jones: Bobby Jones ×2, Caldwell Jones, Eddie Jones, Herb Jones) | **absent** |

**VERIFIED — the `owner_source_match` claim ("not found in NFL-AT-001 … NFL-AT-008 after checking full names
and common aliases" / "not found in NBA-AT-001 under full name or common name") holds for all 18 rows.**
Note the surname-only trap: a naive surname check would have wrongly reported Roosevelt Brown and Sam Jones
as present.

### 6.2 The NFL 100 screen is complete and exact (VERIFIED)

All **100 players** on the cited `https://www.nfl.com/100/all-time-team/roster.html` were checked against the
8 NFL raw files:

| Outcome | Count | Names |
|---|---:|---|
| Present in the raw files | **83** | — |
| **Absent** from the raw files | **17** | exactly the 17 rows of `derived/nfl/official-all-time-gap-candidates.csv` |
| False positives (in the gap CSV but actually present) | **0** | — |
| False negatives (absent but missing from the gap CSV) | **0** | — |

The 10 `CO` (coach) entries on the same roster are a separate population: 8 are absent from the raw files
(Belichick, Halas, Lambeau, Landry, Lombardi, Noll, Shula, Walsh) and 2 are present (Paul Brown, Joe Gibbs).
They are correctly **not** in the player candidate CSV. This is a correct scoping decision, not an omission.

### 6.3 The NBA 75 screen is INCOMPLETE — a second omission was missed (VERIFIED finding)

`derived/README.md` states: *"nba/official-all-time-gap-candidates.csv — Sam Jones, the NBA 75th Anniversary
Team player not found in the supplied NBA notes. Other NBA 75 names were present under full names or familiar
shorthand."*

Re-running the check over every name on the cited `https://www.nba.com/nba-75-anniversary-team` page:

| Outcome | Count | Detail |
|---|---:|---|
| Names on the cited page | **76** | (the page lists 76 names today, though the team is branded "75" — see note) |
| Present under the full name | 6 | e.g. `Elvin Hayes`, `Hakeem Olajuwon`, `Dirk Nowitzki`, `Bill Walton`, `Jerry West`, `Earl Monroe` |
| Present only under a familiar shorthand | 68 | `Kareem`, `Magic`, `Bird`, `MJ`, `KD`, `KG`, `CP3`, `Mailman`, `Moses`, `Admiral`, `Dame`, `Barkley`, `Harden`, `Nash`, `Pistol Pete`, `Penny`, `Wilt`, `Shaq`, `AD`, `SGA`, `Jdub`, `Redick`, … |
| **ABSENT from the NBA raw file** | **2** | **`Nate Archibald`** and `Sam Jones` |

**Nate Archibald does not appear in the NBA raw file under any form.** The tokens `archibald`, `nate`,
`nat`, `archie` and `mr. basketball` were all searched and all return 0 hits in
`raw/nba/01_peak_seasons_and_all_time_concepts.txt` (1,220 lines). He is a member of the NBA 75 list on the
cited page.

**Verdict: VERIFIED finding — the NBA omission screen is incomplete by one player.** The derived README's
"only Sam Jones" claim should be corrected, and `Nate Archibald` is a candidate the intake has not recorded.
No rating, position, season or team is proposed for him here; only the fact of his absence is reported.

*Note on list size:* the cited nba.com page currently lists 76 names, not 75. Any future gap screen must
pin the exact reference list (and its retrieval date) to avoid a moving target. **INFERRED** — the underlying
"75" designation is an NBA editorial fact, not something this report asserts.

---

## 7. Area 6 — Active/retired classification (REPORTED / INFERRED; verification NOT yet performed by the intake)

The work package asks to *"verify active/retired classifications against cited sources"*. Measured state:

| Item | Count | Verdict |
|---|---:|---|
| Rows in the two gap CSVs carrying `career_status = retired` | 18 | REPORTED |
| …of those, independently confirmed by an authoritative source during this review | **1** (Sam Jones) | **VERIFIED** |
| …of those, supported only by a career span on an official roster page (no retirement announcement) | **17** (NFL) | **INFERRED** |
| Rows in the intake with a *promoted* status (`active`, `retired`, `unrostered_or_free_agent`, `uncertain`) | **0** | **VERIFIED — no status has been verified anywhere in the intake** |
| Status-triage rows, all `unverified` | 145 | VERIFIED (66 NFL + 79 NBA) |

**Sam Jones — VERIFIED against the cited source.** `https://www.nba.com/news/celtics-legend-sam-jones-dies-at-88`
states that Jones *"retired after that title, having won his 10 championships in 12 seasons"*, that he
*"retired in 1969 at the age of 36"*, that he *"went on to average 17.7 points … in 12 years with the Celtics"*,
that he died at 88 in December 2021, and that he was *"named to the NBA's 75th Anniversary Team"* in 2021.
Every claim in `NBA-GAP-001`'s `notes` and `career_status` is therefore supported. The row's blank
`position_group` / `season` / `team` / `engine_ovr` are also correct — the cited profile does not fix a single
peak season for a 12-season career, and the intake correctly declines to pick one.

**The 17 NFL rows — INFERRED, and the inference is sound but indirect.** Each `career_span` was re-verified
against the cited NFL.com roster (all 17 match exactly, §4.4). Every span ends between 1938 and 2017, i.e. no
roster presence as of the stated `status_checked_as_of = 2026-10-20`, so `retired` is the only sensible
reading. But the cited `status_reference` is a **description of the career span**, not a retirement
announcement, and no retirement source is cited for any of the 17. Under the intake's own stated rule
(`status-triage/README.md` step 3: *"Use an authoritative retirement announcement or career record for
`retired`; do not infer retirement from age, an old peak season, or absence from a recent list"*) these rows
are consistent with `retired` but are **not yet evidenced to the intake's own standard**. The gap is a
provenance gap, not a classification error.

**The status-triage queues are correctly unverified.** The 145 rows flag 2024–2026 season markers, and
`status-triage/README.md` states *"No source row has been promoted to confirmed active or retired status yet."*
Verified: 0 promoted rows. The separation the work package asks for — *active/retired classification vs.
rating* — is intact; the classification step simply has not been performed yet.

---

## 8. Area 7 — Source mentions vs. engine-ready records (VERIFIED)

### 8.1 The separation, stated explicitly

| Layer | What exists | Count | Status |
|---|---|---:|---|
| **Source mentions** | Distinct player names appearing anywhere in `raw/**/*.txt` | **1,470** | Text only. No identity resolution, no season, no team, no position, no rating. |
| **Source mentions (event count)** | Individual name appearances across the 9 raw files | **3,903** | |
| **Coach names** | Role-labelled non-players in NFL-AT-001 | 3 | Not players. |
| **Proposed candidate records** | Rows in the two `official-all-time-gap-candidates.csv` files | **18** | `review_status = proposed; owner review pending`; `season`, `team`, `engine_ovr` deliberately blank. |
| **Status-triage leads** | Rows in the two `recent-season-mentions.csv` files | **145** | `career_status = unverified`; no rating, no team, no promoted status. |
| **Engine-ready records** | Rows complete enough to enter a player pool (identity + position + team + season + rating + provenance + review state) | **0** | **The intake contains no engine-ready record.** |

**Engine-ready records: NONE.** There is no `PLAYERS`-tuple row, no `position+team+season+ovr` tuple, no
`careerAverage` column, no rating of any scale, and no franchise assignment anywhere in the branch. The
nearest thing to a record is the 18-row proposal set, which by construction carries no rating.

### 8.2 What would have to happen before anything here is engine-ready

Consistent with `derived/README.md` and the intake README, and **without suggesting any value**:

1. An explicit, owner-approved schema (field set, types, allowed position values, allowed status values).
2. An identity resolution pass: 1,470 source mentions → person records, using an alias table for the
   288 single-token NBA shorthand references and the 14 spelling variants listed in §9.2.
3. A position-mapping decision for the 70 names carrying more than one position label (§9.1).
4. A player-season identity decision (the same person carries 2–3 different season markers in the same file
   in 6 of the 5 ranking files — see §9.3).
5. A status evidence pass with a recorded "checked as of" date per person.
6. A rating method and scale, approved separately, and applied *after* the record exists.

---

## 9. Supporting data-quality findings (REPORTED)

These were found while answering the assigned questions and bear directly on W6's "duplicates / sport leakage /
missing provenance / conflicting positions" scope.

### 9.1 Conflicting positions — 70 names carry more than one position label

The label-bearing sources (NFL-AT-001 depth chart, NFL-AT-003 personnel file, NFL-AT-008 pipe-delimited
edge-rusher notes) together label 282 names; **70 of them carry more than one label**. Most are vocabulary
differences for the same role (`Left Edge` vs `DE` vs `OLB`; `LCB` vs `CB`; `FS` vs `S`) or legitimate
two-way/return roles (`Deion Sanders` = `LCB` + `Return`). A subset are **genuine contradictions** between
the owner's own two depth-chart files:

| Player | NFL-AT-001 | NFL-AT-003 | Nature |
|---|---|---|---|
| Randall McDaniel | `LG` (:56) | `RG` (:13) | **contradiction** (guard side) |
| Jim Parker | `LG` (:56) | `RG` (:13) | **contradiction** |
| Joe Thuney | `LG` (:56) | `RG` (:13) and `RG` in the 1st/2nd/3rd table (:135) | **contradiction** |
| Willie Roaf | `LT` (:55) | `RT` (:44 tab, :136 table) | **contradiction** — and internally inconsistent *within* NFL-AT-003 |
| Trent Williams | `C` (:13, starters) and `LT` (:55) | `LT` (:61) but `RT` in the table (:136) | **contradiction**, three labels |
| Jim Brown | `RB` (:49) | `FB` (:7/:50/:5) but `RB` in the table (:128) | **contradiction** (and NFL-AT-001 itself lists him at both `FB` and `RB`) |
| Bo Jackson | `RB` (:49) | `FB` (:7/:50/:5) | **contradiction** (same as above) |
| Derrick Johnson | `WILL` (:71) | `MIKE` (:69 tab) | **contradiction** |
| Willie Lanier | `WILL` (:71) / `MIKE` (:25) | `WILL` (:26) / `MIKE` (:52) / `ILB-MLB` (:140) / `ILB` (:159) | **four labels** |
| Kevin Greene | `SAM` (:72) | `LB` in NFL-AT-008 (:185) | **contradiction** |
| Myles Garrett | `Left Edge` (:65) | `Right Edge` (NFL-AT-003 tab) | side conflict |
| Derrick Thomas | `Right Edge` (:68) | `DE`, `OLB`, `LB` | **four labels** |
| Rod Woodson | `RCB` (:78) | `LCB`, `FS`, `CB/S` | **four labels** |
| Jackie Slater | `LT` (:55) | `LT/RT` (:54 tab) | dual label, needs a slot decision |

All 70 are listed in the working output; the table above is the subset that is an outright contradiction
rather than a vocabulary difference. **Any pool build that resolves position by "first label wins" will be
wrong for these players.**

### 9.2 Spelling / alias variants inside the raw text (14 confirmed pairs)

Same person, two spellings, in the source. These are the reason the 1,470 "distinct names" overstate the
number of distinct people.

| Variant A | Variant B | Files |
|---|---|---|
| `Albert Haynewsworth` | `Albert Haynesworth` | NFL-AT-002:367 / NFL-AT-004:77 |
| `Dermonti Dawson` | `Dermontti Dawson` | NFL-AT-001:57 / NFL-AT-002:179, 04, 05, 06, 07 |
| `Halota Ngata` | `Haloti Ngata` | NFL-AT-001:67 / NFL-AT-002:211 |
| `Jeffery Simmons` | `Jeffrey Simmons` | NFL-AT-002:217 / NFL-AT-001:67 |
| `Julius Peppers` | `Juluis Peppers` | NFL-AT-001:68 / NFL-AT-008:122 |
| `Garret Bolles` | `Garrett Bolles` | NFL-AT-002:229 / NFL-AT-001:55 |
| `Terrel Davis` | `Terrell Davis` | NFL-AT-008:38 / NFL-AT-002:514 |
| `Darrell Green` | `Darrelle Green` | NFL-AT-001:74 / NFL-AT-003:29 (note: NFL.com itself prints "Darrell Green") |
| `Puka Nacua` | `Puka Nacka` | NFL-AT-001:51 / NFL-AT-003:6 |
| `Jahmyr Gibbs` | `Jammer Gibbs` | NFL-AT-001:49 (both on the same line) / NFL-AT-002:161 |
| `Mchale` (Kevin McHale) | — misspelling only | NBA-AT-001:37, 1112, 1197 |
| `Debusschere` | `Debuscherre` | NBA-AT-001:293 / NBA-AT-001:119 |
| `Markkanen` | `Markannen` | NBA-AT-001:200 / NBA-AT-001:725 |
| `Ilgauskas` | `Ilgauskus` | NBA-AT-001:248 / NBA-AT-001:553 |
| `Jarret Allen` | `Jarrett Allen` | NBA-AT-001:195 / NBA-AT-001:348 (same `'25` season, two spellings) |

Two further cases are **false positives for a naive fuzzy matcher** and are flagged so the matcher is not
trusted blindly: `Derwin James` vs `Edgerrin James` (NFL-AT-002:287 and :520) are two different people, and
`Isiah Thomas` vs `Isaiah Thomas` (NBA-AT-001) are the senior and junior players respectively.

### 9.3 Conflicting season markers inside a single ranking file

The ranking files are titled "player-season" lists, so one person should carry one season per file. Measured:

| File | Names with more than one season marker | Examples |
|---|---:|---|
| NFL-AT-002 | **14** | `randy white` (84, 75), `richard seymour` (04, 02), `sterling sharpe` (92, 91), `clyde simmons` (92, 86) |
| NFL-AT-004 | **6** | `randy white` (75, 84), `roger staubach` (67, 72), `ken stabler` (75, 76) |
| NFL-AT-005 | 0 | — |
| NFL-AT-006 | 0 | — |
| NFL-AT-007 | **7** | `orlando pace` (00, 97), `julius peppers` (03, 12), `willie roaf` (94, 01), `antonio gates` (04, 00) |

**REPORTED — consistent with the intake's own position that "a ranking position is evidence of a preference in
that particular list, not a calibrated rating", but it means a name in a ranking file is not a single
player-season record.** Any ledger built from these files must key on (person, season) and must preserve the
disagreement, exactly as the intake README already prescribes.

### 9.4 Malformed source rows (parser hazards)

| Pattern | Example | Count |
|---|---|---|
| Double-numbered entry (rank + bare year) | `117. ' 23 Maxx Crosby` (NFL-AT-002:207), `400. 86 Art Monk` (:490), `472. 63 Jim Katcavage*` (:562) | 3+ |
| Apostrophe separated from the year | `' 23`, `' 83` | several |
| Mixed apostrophe styles | `'87` vs `’87` throughout all 8 NFL files | pervasive |
| Footnote asterisks on names | `'61 Baylor*`, `'05 Stoudemire*`, `'92 Petrovic**`, `'97 Webber*`, `'01 Iverson*` | 6+ in NBA-AT-001 |
| Bare year with no apostrophe | `25 Brunson`, `84 Dawkins`, `73 Bobby jones` (NBA-AT-001:215, 219, 220) | several |
| Position label glued to the name | `OLB: Derrick Thomas`, `RT: Willie Roaf` tab rows (NFL-AT-003) | many |
| Unicode line separators | U+2028 in NFL-AT-001 (23), NFL-AT-003 (54), NFL-AT-008 (49) | 126 total |
| Non-player content inside the lists | `Bench`, `Starting Five`, `My starting five`, `Bucks`, `Lakers`, `Rockets`, `Nuggets`, `Spurs`, `Warriors`, `Heat`, `Hawks`, `Jazz`, `Knicks`, `Sixers`, `Celtics`, `jazz`, `decades`, `frontcourts`, `free`, `person` | ~40 tokens in NBA-AT-001 |
| Non-player named entities | `Ben Johnson`, `Steve Spagnuolo`, `Andy Reid` (coaches, NFL-AT-001:43–45) | 3 |

### 9.5 NBA shorthand density

**288 distinct single-token references** in NBA-AT-001 (nicknames, surnames, initials: `Kareem`, `Magic`,
`Bird`, `MJ`, `KD`, `KG`, `CP3`, `SGA`, `AD`, `Jdub`, `Mailman`, `Moses`, `Admiral`, `Dame`, `Penny`,
`Pistol Pete`, `Shaq`, `Wilt`, `Redick`, `Zbo`, `Baron`, `Campy`, `Dr. J`-style tokens, …). These are **not
canonical names** and cannot be joined to any name-keyed list without an alias table. This is exactly the
condition the derived README acknowledges for "Mailman" and "Moses" — and it is why the NBA 75 screen had to
be run with an alias map (§6.3).

---

## 10. Open questions for the architect

1. **Nate Archibald** — a verified second NBA 75 omission (§6.3). Should the intake add an NBA gap row for
   him, and under which position group? (No rating, season or team is proposed here.)
2. **`status_reference` contract** (§4.3) — keep it as a URL and add a separate description field, or redefine
   the field as a description? The 17 NFL rows currently have a URL in `selection_reference` only.
3. **`Shane Lechler` position_group** (§4.4) — `K` vs the official `PS` (punter) grouping. Which wins, and does
   the engine need a punter slot at all?
4. **Line-number convention** (§5.3) — declare LF-based numbering in `source_manifest.json` before any ledger
   cites line numbers, given the U+2028 separators.
5. **Reference-list pinning** (§6.3) — the cited nba.com page currently lists 76 names. Should the intake pin
   the exact list (URL + retrieval date + name count) so the omission screen is reproducible?
6. **Retirement evidence** (§7) — if the intake's own rule stands (retirement announcement or authoritative
   career record), the 17 NFL `retired` labels need a status URL. Should the gap CSV be amended, or should the
   rule be formally relaxed for official-roster career spans?

---

## 11. Appendix A — All NFL names mentioned more than once (422 names)


| # | normalized name | mentions |
|---|---|---|
| 1 | `derrick thomas` | 18 |
| 2 | `reggie white` | 17 |
| 3 | `charles woodson` | 16 |
| 4 | `deion sanders` | 16 |
| 5 | `ed reed` | 16 |
| 6 | `lawrence taylor` | 16 |
| 7 | `aaron donald` | 15 |
| 8 | `myles garrett` | 15 |
| 9 | `orlando pace` | 15 |
| 10 | `patrick mahomes` | 15 |
| 11 | `champ bailey` | 14 |
| 12 | `justin houston` | 14 |
| 13 | `barry sanders` | 13 |
| 14 | `ray lewis` | 13 |
| 15 | `rod woodson` | 13 |
| 16 | `ronnie lott` | 13 |
| 17 | `troy polamalu` | 13 |
| 18 | `willie lanier` | 13 |
| 19 | `aeneas williams` | 12 |
| 20 | `anthony mu oz` | 12 |
| 21 | `demarcus ware` | 12 |
| 22 | `jerry rice` | 12 |
| 23 | `randy moss` | 12 |
| 24 | `tamba hali` | 12 |
| 25 | `travis kelce` | 12 |
| 26 | `von miller` | 12 |
| 27 | `willie roaf` | 12 |
| 28 | `bobby wagner` | 11 |
| 29 | `bruce smith` | 11 |
| 30 | `chandler jones` | 11 |
| 31 | `darrelle revis` | 11 |
| 32 | `jackie slater` | 11 |
| 33 | `joe montana` | 11 |
| 34 | `mark gastineau` | 11 |
| 35 | `marshall faulk` | 11 |
| 36 | `nick bosa` | 11 |
| 37 | `peyton manning` | 11 |
| 38 | `tony gonzalez` | 11 |
| 39 | `bobby bell` | 10 |
| 40 | `brian waters` | 10 |
| 41 | `buck buchanan` | 10 |
| 42 | `charles tillman` | 10 |
| 43 | `jim brown` | 10 |
| 44 | `jj watt` | 10 |
| 45 | `john abraham` | 10 |
| 46 | `larry allen` | 10 |
| 47 | `marcus allen` | 10 |
| 48 | `micah parsons` | 10 |
| 49 | `priest holmes` | 10 |
| 50 | `tj watt` | 10 |
| 51 | `trent williams` | 10 |
| 52 | `alan faneca` | 9 |
| 53 | `alan page` | 9 |
| 54 | `albert lewis` | 9 |
| 55 | `antonio gates` | 9 |
| 56 | `dan marino` | 9 |
| 57 | `danielle hunter` | 9 |
| 58 | `derrick brooks` | 9 |
| 59 | `derrick johnson` | 9 |
| 60 | `earl thomas` | 9 |
| 61 | `emmitt thomas` | 9 |
| 62 | `jamaal charles` | 9 |
| 63 | `jonathan ogden` | 9 |
| 64 | `kevin greene` | 9 |
| 65 | `larry johnson` | 9 |
| 66 | `neil smith` | 9 |
| 67 | `patrick willis` | 9 |
| 68 | `randall mcdaniel` | 9 |
| 69 | `rob gronkowski` | 9 |
| 70 | `tyrann mathieu` | 9 |
| 71 | `willie anderson` | 9 |
| 72 | `aidan hutchinson` | 8 |
| 73 | `antonio brown` | 8 |
| 74 | `brian dawkins` | 8 |
| 75 | `bruce matthews` | 8 |
| 76 | `calvin johnson` | 8 |
| 77 | `chris doleman` | 8 |
| 78 | `cortez kennedy` | 8 |
| 79 | `gene upshaw` | 8 |
| 80 | `isaac bruce` | 8 |
| 81 | `jared allen` | 8 |
| 82 | `jason taylor` | 8 |
| 83 | `jim parker` | 8 |
| 84 | `josh allen` | 8 |
| 85 | `julius peppers` | 8 |
| 86 | `khalil mack` | 8 |
| 87 | `lamar jackson` | 8 |
| 88 | `larry little` | 8 |
| 89 | `leslie oneal` | 8 |
| 90 | `london fletcher` | 8 |
| 91 | `penei sewell` | 8 |
| 92 | `robert mathis` | 8 |
| 93 | `steve young` | 8 |
| 94 | `terrell owens` | 8 |
| 95 | `tom brady` | 8 |
| 96 | `vince wilfork` | 8 |
| 97 | `walter jones` | 8 |
| 98 | `walter payton` | 8 |
| 99 | `aldon smith` | 7 |
| 100 | `art shell` | 7 |
| 101 | `curley culp` | 7 |
| 102 | `deacon jones` | 7 |
| 103 | `deforest buckner` | 7 |
| 104 | `dermontti dawson` | 7 |
| 105 | `dwight freeney` | 7 |
| 106 | `dwight stephenson` | 7 |
| 107 | `earl campbell` | 7 |
| 108 | `elvis dumervil` | 7 |
| 109 | `eric berry` | 7 |
| 110 | `eric dickerson` | 7 |
| 111 | `fred warner` | 7 |
| 112 | `jack ham` | 7 |
| 113 | `jalen ramsey` | 7 |
| 114 | `jason peters` | 7 |
| 115 | `jim otto` | 7 |
| 116 | `jimmy graham` | 7 |
| 117 | `john alt` | 7 |
| 118 | `john lynch` | 7 |
| 119 | `john randle` | 7 |
| 120 | `julio jones` | 7 |
| 121 | `junior seau` | 7 |
| 122 | `ken stabler` | 7 |
| 123 | `ladainian tomlinson` | 7 |
| 124 | `lester hayes` | 7 |
| 125 | `mel blount` | 7 |
| 126 | `michael strahan` | 7 |
| 127 | `night train lane` | 7 |
| 128 | `quinnen williams` | 7 |
| 129 | `reggie wayne` | 7 |
| 130 | `richard seymour` | 7 |
| 131 | `roger staubach` | 7 |
| 132 | `ronde barber` | 7 |
| 133 | `shannon sharpe` | 7 |
| 134 | `shields` | 7 |
| 135 | `sterling sharpe` | 7 |
| 136 | `terrell suggs` | 7 |
| 137 | `torry holt` | 7 |
| 138 | `trace armstrong` | 7 |
| 139 | `tyreek hill` | 7 |
| 140 | `will shields` | 7 |
| 141 | `aaron rodgers` | 6 |
| 142 | `adrian peterson` | 6 |
| 143 | `anderson` | 6 |
| 144 | `antoine winfield` | 6 |
| 145 | `antonio freeman` | 6 |
| 146 | `bryant young` | 6 |
| 147 | `cam newton` | 6 |
| 148 | `cameron jordan` | 6 |
| 149 | `ceedee lamb` | 6 |
| 150 | `chris jones` | 6 |
| 151 | `clinton portis` | 6 |
| 152 | `dan hampton` | 6 |
| 153 | `davante adams` | 6 |
| 154 | `dave casper` | 6 |
| 155 | `deron cherry` | 6 |
| 156 | `dick butkus` | 6 |
| 157 | `frank clark` | 6 |
| 158 | `fred dean` | 6 |
| 159 | `gary zimmerman` | 6 |
| 160 | `haloti ngata` | 6 |
| 161 | `jack lambert` | 6 |
| 162 | `jamal lewis` | 6 |
| 163 | `james harrison` | 6 |
| 164 | `jason pierre paul` | 6 |
| 165 | `joe burrow` | 6 |
| 166 | `joe delamielleure` | 6 |
| 167 | `joe jacoby` | 6 |
| 168 | `joe thomas` | 6 |
| 169 | `john elway` | 6 |
| 170 | `johnny unitas` | 6 |
| 171 | `kam chancellor` | 6 |
| 172 | `ken houston` | 6 |
| 173 | `kevin mawae` | 6 |
| 174 | `kimble anders` | 6 |
| 175 | `kurt warner` | 6 |
| 176 | `lavonte david` | 6 |
| 177 | `lc greenwood` | 6 |
| 178 | `lee roy selmon` | 6 |
| 179 | `leveon bell` | 6 |
| 180 | `luke kuechly` | 6 |
| 181 | `marvin harrison` | 6 |
| 182 | `mike ditka` | 6 |
| 183 | `mike webster` | 6 |
| 184 | `navorro bowman` | 6 |
| 185 | `olin kreutz` | 6 |
| 186 | `otto graham` | 6 |
| 187 | `randall cunningham` | 6 |
| 188 | `randy white` | 6 |
| 189 | `raymond berry` | 6 |
| 190 | `richard dent` | 6 |
| 191 | `rickey jackson` | 6 |
| 192 | `robert quinn` | 6 |
| 193 | `ron yary` | 6 |
| 194 | `seth joyner` | 6 |
| 195 | `shaun alexander` | 6 |
| 196 | `simeon rice` | 6 |
| 197 | `stephon gilmore` | 6 |
| 198 | `steve hutchinson` | 6 |
| 199 | `steve mcmichael` | 6 |
| 200 | `steven jackson` | 6 |
| 201 | `ted hendricks` | 6 |
| 202 | `trey smith` | 6 |
| 203 | `ty law` | 6 |
| 204 | `vita vea` | 6 |
| 205 | `wes welker` | 6 |
| 206 | `willie brown` | 6 |
| 207 | `zach thomas` | 6 |
| 208 | `aj green` | 5 |
| 209 | `alex smith` | 5 |
| 210 | `andre johnson` | 5 |
| 211 | `andre tippett` | 5 |
| 212 | `anquan boldin` | 5 |
| 213 | `art monk` | 5 |
| 214 | `asante samuel` | 5 |
| 215 | `ben coates` | 5 |
| 216 | `bob brown` | 5 |
| 217 | `bob kuechenberg` | 5 |
| 218 | `brandon graham` | 5 |
| 219 | `brian burns` | 5 |
| 220 | `brian urlacher` | 5 |
| 221 | `brock purdy` | 5 |
| 222 | `cameron heyward` | 5 |
| 223 | `casey hampton` | 5 |
| 224 | `charles johnson` | 5 |
| 225 | `chris long` | 5 |
| 226 | `christian okoye` | 5 |
| 227 | `clyde simmons` | 5 |
| 228 | `creed humphrey` | 5 |
| 229 | `damon harrison` | 5 |
| 230 | `dan dierdorf` | 5 |
| 231 | `dante hall` | 5 |
| 232 | `darnell dockett` | 5 |
| 233 | `dee ford` | 5 |
| 234 | `demaryius thomas` | 5 |
| 235 | `dick lebeau` | 5 |
| 236 | `drew brees` | 5 |
| 237 | `edgerrin james` | 5 |
| 238 | `everson griffen` | 5 |
| 239 | `forrest gregg` | 5 |
| 240 | `fran tarkenton` | 5 |
| 241 | `gale sayers` | 5 |
| 242 | `gene hickerson` | 5 |
| 243 | `gino marchetti` | 5 |
| 244 | `greg townsend` | 5 |
| 245 | `haason reddick` | 5 |
| 246 | `henry ellard` | 5 |
| 247 | `hines ward` | 5 |
| 248 | `howie long` | 5 |
| 249 | `jack youngblood` | 5 |
| 250 | `jamarr chase` | 5 |
| 251 | `james lofton` | 5 |
| 252 | `jason witten` | 5 |
| 253 | `jeffery simmons` | 5 |
| 254 | `jerome bettis` | 5 |
| 255 | `jerry kramer` | 5 |
| 256 | `jevon kearse` | 5 |
| 257 | `jim ringo` | 5 |
| 258 | `joe thuney` | 5 |
| 259 | `joey bosa` | 5 |
| 260 | `john hannah` | 5 |
| 261 | `johnny robinson` | 5 |
| 262 | `justin tuck` | 5 |
| 263 | `kareem hunt` | 5 |
| 264 | `karl mecklenburg` | 5 |
| 265 | `kellen winslow` | 5 |
| 266 | `kevin carter` | 5 |
| 267 | `larry wilson` | 5 |
| 268 | `leonard little` | 5 |
| 269 | `marc bulger` | 5 |
| 270 | `marcus peters` | 5 |
| 271 | `mark clayton` | 5 |
| 272 | `matthew judon` | 5 |
| 273 | `maxx crosby` | 5 |
| 274 | `michael thomas` | 5 |
| 275 | `mike haynes` | 5 |
| 276 | `mike munchak` | 5 |
| 277 | `mike singletary` | 5 |
| 278 | `otis taylor` | 5 |
| 279 | `ozzie newsome` | 5 |
| 280 | `pat swilling` | 5 |
| 281 | `patrick kerney` | 5 |
| 282 | `patrick peterson` | 5 |
| 283 | `rayfield wright` | 5 |
| 284 | `richard sherman` | 5 |
| 285 | `russ grimm` | 5 |
| 286 | `sammy baugh` | 5 |
| 287 | `sean jones` | 5 |
| 288 | `shaun rogers` | 5 |
| 289 | `sheldon richardson` | 5 |
| 290 | `steve largent` | 5 |
| 291 | `steve wisniewski` | 5 |
| 292 | `tom mack` | 5 |
| 293 | `trent mcduffie` | 5 |
| 294 | `warren sapp` | 5 |
| 295 | `willie davis` | 5 |
| 296 | `al baker` | 4 |
| 297 | `bo jackson` | 4 |
| 298 | `cedrick hardman` | 4 |
| 299 | `claude humphrey` | 4 |
| 300 | `clay matthews` | 4 |
| 301 | `cliff avril` | 4 |
| 302 | `darrell green` | 4 |
| 303 | `devin hester` | 4 |
| 304 | `dexter manley` | 4 |
| 305 | `elvin bethea` | 4 |
| 306 | `emmitt smith` | 4 |
| 307 | `george kittle` | 4 |
| 308 | `harrison smith` | 4 |
| 309 | `jack gregory` | 4 |
| 310 | `jahri evans` | 4 |
| 311 | `james laurinaitis` | 4 |
| 312 | `jim jeffcoat` | 4 |
| 313 | `jim marshall` | 4 |
| 314 | `joe klecko` | 4 |
| 315 | `justin jefferson` | 4 |
| 316 | `larry fitzgerald` | 4 |
| 317 | `len dawson` | 4 |
| 318 | `mean joe greene` | 4 |
| 319 | `michael irvin` | 4 |
| 320 | `ndamukong suh` | 4 |
| 321 | `oj simpson` | 4 |
| 322 | `osi umenyiora` | 4 |
| 323 | `ryan kerrigan` | 4 |
| 324 | `terrell davis` | 4 |
| 325 | `tony mcgee` | 4 |
| 326 | `too tall jones` | 4 |
| 327 | `bijan robinson` | 3 |
| 328 | `brandon aubrey` | 3 |
| 329 | `brock bowers` | 3 |
| 330 | `cameron wake` | 3 |
| 331 | `charles haley` | 3 |
| 332 | `christian gonzalez` | 3 |
| 333 | `christian mccaffrey` | 3 |
| 334 | `curtis greer` | 3 |
| 335 | `dan saleaumua` | 3 |
| 336 | `derrick brown` | 3 |
| 337 | `derrick henry` | 3 |
| 338 | `dexter lawrence` | 3 |
| 339 | `geno atkins` | 3 |
| 340 | `greg lloyd` | 3 |
| 341 | `jeff saturday` | 3 |
| 342 | `jonathan taylor` | 3 |
| 343 | `jsn` | 3 |
| 344 | `kenneth walker` | 3 |
| 345 | `kyle hamilton` | 3 |
| 346 | `laremy tunsil` | 3 |
| 347 | `lynn swann` | 3 |
| 348 | `marshal yanda` | 3 |
| 349 | `matt birk` | 3 |
| 350 | `merlin olsen` | 3 |
| 351 | `nnamdi asomugha` | 3 |
| 352 | `patrick surtain` | 3 |
| 353 | `rod smith` | 3 |
| 354 | `tony boselli` | 3 |
| 355 | `trey mcbride` | 3 |
| 356 | `tristan wirfs` | 3 |
| 357 | `webster` | 3 |
| 358 | `zack baun` | 3 |
| 359 | `andrew thomas` | 2 |
| 360 | `anthony munoz` | 2 |
| 361 | `bob hayes` | 2 |
| 362 | `bob lilly` | 2 |
| 363 | `bob sanders` | 2 |
| 364 | `boomer esiason` | 2 |
| 365 | `breece hall` | 2 |
| 366 | `calais campbell` | 2 |
| 367 | `cam heyward` | 2 |
| 368 | `carl eller` | 2 |
| 369 | `carlos dunlap` | 2 |
| 370 | `carson palmer` | 2 |
| 371 | `charvarius ward` | 2 |
| 372 | `chris harris` | 2 |
| 373 | `cooper kupp` | 2 |
| 374 | `cris carter` | 2 |
| 375 | `curtis martin` | 2 |
| 376 | `demarco murray` | 2 |
| 377 | `dermonti dawson` | 2 |
| 378 | `donnie edwards` | 2 |
| 379 | `garrett bolles` | 2 |
| 380 | `halota ngata` | 2 |
| 381 | `harvey martin` | 2 |
| 382 | `herman moore` | 2 |
| 383 | `jahmyr gibbs` | 2 |
| 384 | `james farrior` | 2 |
| 385 | `jeffrey simmons` | 2 |
| 386 | `jessie armstead` | 2 |
| 387 | `jettas` | 2 |
| 388 | `john riggins` | 2 |
| 389 | `jordan mailata` | 2 |
| 390 | `kenny easley` | 2 |
| 391 | `kevin ross` | 2 |
| 392 | `lance briggs` | 2 |
| 393 | `lane johnson` | 2 |
| 394 | `laroi glover` | 2 |
| 395 | `larry csonka` | 2 |
| 396 | `leroy butler` | 2 |
| 397 | `ljarius sneed` | 2 |
| 398 | `lorenzo neal` | 2 |
| 399 | `marshawn lynch` | 2 |
| 400 | `matt prater` | 2 |
| 401 | `matthew stafford` | 2 |
| 402 | `michael bennett` | 2 |
| 403 | `nakobe dean` | 2 |
| 404 | `nik bonitto` | 2 |
| 405 | `nnamdi madubuike` | 2 |
| 406 | `quenton nelson` | 2 |
| 407 | `quinn meinerz` | 2 |
| 408 | `roger craig` | 2 |
| 409 | `roquan smith` | 2 |
| 410 | `sam mills` | 2 |
| 411 | `shaun phillips` | 2 |
| 412 | `singletary` | 2 |
| 413 | `steve smith` | 2 |
| 414 | `takeo spikes` | 2 |
| 415 | `thurman thomas` | 2 |
| 416 | `tim brown` | 2 |
| 417 | `todd gurley` | 2 |
| 418 | `tony dorsett` | 2 |
| 419 | `trevon diggs` | 2 |
| 420 | `walter peyton` | 2 |
| 421 | `xavien howard` | 2 |
| 422 | `zack martin` | 2 |

## 12. Appendix B — All NBA names mentioned more than once (176 names)


| # | normalized name | mentions |
|---|---|---|
| 1 | `jokic` | 12 |
| 2 | `kareem` | 11 |
| 3 | `kawhi` | 11 |
| 4 | `lebron` | 11 |
| 5 | `embiid` | 10 |
| 6 | `giannis` | 10 |
| 7 | `shaq` | 10 |
| 8 | `ad` | 9 |
| 9 | `duncan` | 8 |
| 10 | `magic` | 8 |
| 11 | `wilt` | 8 |
| 12 | `curry` | 7 |
| 13 | `ewing` | 7 |
| 14 | `kd` | 7 |
| 15 | `kg` | 7 |
| 16 | `admiral` | 6 |
| 17 | `bird` | 6 |
| 18 | `doncic` | 6 |
| 19 | `hakeem` | 6 |
| 20 | `barkley` | 5 |
| 21 | `kobe` | 5 |
| 22 | `mj` | 5 |
| 23 | `sga` | 5 |
| 24 | `barry` | 4 |
| 25 | `gobert` | 4 |
| 26 | `mcgrady` | 4 |
| 27 | `russell` | 4 |
| 28 | `starting 5` | 4 |
| 29 | `thurmond` | 4 |
| 30 | `walton` | 4 |
| 31 | `webber` | 4 |
| 32 | `wemby` | 4 |
| 33 | `bane` | 3 |
| 34 | `booker` | 3 |
| 35 | `brunson` | 3 |
| 36 | `c wilt` | 3 |
| 37 | `divac` | 3 |
| 38 | `drexler` | 3 |
| 39 | `jordan` | 3 |
| 40 | `kidd` | 3 |
| 41 | `malone` | 3 |
| 42 | `mitchell robinson` | 3 |
| 43 | `morant` | 3 |
| 44 | `moses` | 3 |
| 45 | `olajuwon` | 3 |
| 46 | `penny` | 3 |
| 47 | `pg lebron` | 3 |
| 48 | `sengun` | 3 |
| 49 | `sf kawhi` | 3 |
| 50 | `sg mj` | 3 |
| 51 | `whiteside` | 3 |
| 52 | `yao` | 3 |
| 53 | `aaron gordon` | 2 |
| 54 | `adebayo` | 2 |
| 55 | `alvin` | 2 |
| 56 | `amen` | 2 |
| 57 | `artest` | 2 |
| 58 | `arvydas` | 2 |
| 59 | `avdija` | 2 |
| 60 | `ayton` | 2 |
| 61 | `bailey howell` | 2 |
| 62 | `banchero` | 2 |
| 63 | `battier` | 2 |
| 64 | `baylor` | 2 |
| 65 | `beal` | 2 |
| 66 | `bellamy` | 2 |
| 67 | `bibby` | 2 |
| 68 | `bobby jones` | 2 |
| 69 | `bowen` | 2 |
| 70 | `bradley` | 2 |
| 71 | `brook lopez` | 2 |
| 72 | `brooks` | 2 |
| 73 | `cade` | 2 |
| 74 | `camby` | 2 |
| 75 | `capela` | 2 |
| 76 | `caruso` | 2 |
| 77 | `castle` | 2 |
| 78 | `chandler` | 2 |
| 79 | `christie` | 2 |
| 80 | `cj` | 2 |
| 81 | `cousy` | 2 |
| 82 | `cowens` | 2 |
| 83 | `crief` | 2 |
| 84 | `dampier` | 2 |
| 85 | `dandridge` | 2 |
| 86 | `deng` | 2 |
| 87 | `dennis johnson` | 2 |
| 88 | `derek harper` | 2 |
| 89 | `dirk` | 2 |
| 90 | `dolph` | 2 |
| 91 | `dominique` | 2 |
| 92 | `dort` | 2 |
| 93 | `drummond` | 2 |
| 94 | `dumars` | 2 |
| 95 | `duren` | 2 |
| 96 | `dwight` | 2 |
| 97 | `dyson` | 2 |
| 98 | `eason` | 2 |
| 99 | `eaton` | 2 |
| 100 | `edey` | 2 |
| 101 | `english` | 2 |
| 102 | `francis` | 2 |
| 103 | `fred brown` | 2 |
| 104 | `goodrich` | 2 |
| 105 | `grant hill` | 2 |
| 106 | `haliburton` | 2 |
| 107 | `haslem` | 2 |
| 108 | `havlicek` | 2 |
| 109 | `hawkins` | 2 |
| 110 | `herb` | 2 |
| 111 | `hibbert` | 2 |
| 112 | `holmgren` | 2 |
| 113 | `horace` | 2 |
| 114 | `horford` | 2 |
| 115 | `hot rod` | 2 |
| 116 | `ibaka` | 2 |
| 117 | `iguodala` | 2 |
| 118 | `iverson` | 2 |
| 119 | `jalen johnson` | 2 |
| 120 | `jdub` | 2 |
| 121 | `jermaine` | 2 |
| 122 | `jjj` | 2 |
| 123 | `josh smith` | 2 |
| 124 | `julius` | 2 |
| 125 | `kessler` | 2 |
| 126 | `kevin johnson` | 2 |
| 127 | `kirilenko` | 2 |
| 128 | `klay` | 2 |
| 129 | `kyrie` | 2 |
| 130 | `lever` | 2 |
| 131 | `lively` | 2 |
| 132 | `marion` | 2 |
| 133 | `maxey` | 2 |
| 134 | `mcadoo` | 2 |
| 135 | `mcdaniels` | 2 |
| 136 | `mcginnis` | 2 |
| 137 | `michael ray` | 2 |
| 138 | `miller` | 2 |
| 139 | `missi` | 2 |
| 140 | `murphy` | 2 |
| 141 | `myles turner` | 2 |
| 142 | `nance` | 2 |
| 143 | `nater` | 2 |
| 144 | `noah` | 2 |
| 145 | `nowitzki` | 2 |
| 146 | `og` | 2 |
| 147 | `payton` | 2 |
| 148 | `petrie` | 2 |
| 149 | `pf hakeem` | 2 |
| 150 | `poeltl` | 2 |
| 151 | `randle` | 2 |
| 152 | `redick` | 2 |
| 153 | `richmond` | 2 |
| 154 | `robinson` | 2 |
| 155 | `rodman` | 2 |
| 156 | `ron harper` | 2 |
| 157 | `rondo` | 2 |
| 158 | `ruland` | 2 |
| 159 | `siakam` | 2 |
| 160 | `sikma` | 2 |
| 161 | `smits` | 2 |
| 162 | `starting five` | 2 |
| 163 | `tatum` | 2 |
| 164 | `thorpe` | 2 |
| 165 | `timelord` | 2 |
| 166 | `tiny` | 2 |
| 167 | `tomjanovich` | 2 |
| 168 | `tony allen` | 2 |
| 169 | `unseld` | 2 |
| 170 | `vince` | 2 |
| 171 | `wade` | 2 |
| 172 | `west` | 2 |
| 173 | `westbrook` | 2 |
| 174 | `white` | 2 |
| 175 | `zion` | 2 |
| 176 | `zubac` | 2 |

---

## 13. Appendix C — Reproduction notes

* All figures in this report come from the branch `origin/gpt/all-time-player-source-intake-20261020`
  (commit `04edab9`). The working tree was never checked out; every file was read with
  `git -C "Football Sim" show <ref>:<path>`.
* The `raw/` files were treated as immutable and were written only to a scratch directory outside the repo.
* No file on the branch, in the repository root, or in any shared document was created, edited or deleted by
  this review. The only file written by this session is this report.
* No rating, overall, position-specific, tier or rank value is assigned, suggested or implied anywhere in this
  document. Rank positions quoted from the source files are quoted as *source ordering*, not as values.
* Network reads were limited to the three URLs already cited inside the intake's own CSVs, for the purpose of
  verifying the citations made by those CSVs.
