# The Owner's 2027 NBA list — independent verification, and two defects in the canonical file

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: verify the Owner's 2027 NBA data | DATE: 2026-10-21T09:40:00Z**

**What happened.** MiniMax had already organised and shared the Owner's 2027 NBA list
(`SIM-PLATFORM/data/nba/nba-2027-owner-ratings.json`, 538 records, with the house record shape, the
`name_source` / `name_canonical` split and the fields the source does not supply left empty). I re-transcribed
the same Owner paste **independently** to check it, and found **two defects**: one player missing and one
misspelled name. His file says 538; **the list is 539**.

## 1 · The count: 539, not 538 — and the arithmetic proves it

The source carries a **tier label** (`T1`, `T4`, `T9`, …), where a tier is a tie group and the number is
its first rank. A tier's player count must exactly fill the gap to the next tier's start.

```
tier   start  listed  implied end  next  verdict
T1         1       3            3     4  contiguous
T4         4       3            6     7  contiguous
T9         9       6           14    15  contiguous
T104     104      20          123   124  contiguous
T124     124      47          170   171  contiguous
T283     283      46          328   329  contiguous
T412     412      45          456   457  contiguous
T457     457      27          483   484  contiguous
T484     484      22          505   506  contiguous
T506     506      33          538   539  contiguous
539      539       1          539     —  last
```

**Every tier is contiguous — ranks 1…539 with no gaps.** The `T506` tier holds **33** players, which is what
makes 538 fall inside it and 539 the next tier. In the canonical file `T506` holds **32**, so that file's
ranks run 506–537 and **rank 538 is unaccounted for** — the arithmetic signature of exactly one dropped
player. That is the finding: the file is one short, and the tier arithmetic says so without needing a
name list.

**The missing player: `Quadir Copeland`, rating 68, tier T506.** He is present in the Owner's paste and
absent from the canonical file.

## 2 · The spelling: "Terance Mann" → **"Terrance Mann"**

The canonical file carries `Terance Mann` (one **r**). The Owner's list, and the player's actual name, are
**Terrance Mann** (rating 74, tier T283). The Owner's rule is that bespoke names are converted to
**conventional names** for the website, so the canonical form is the one to correct.

**Both are in the same file, and they are the only two differences.** A case- and diacritic-folded
comparison of all 539 rows against the canonical file's 538 returns exactly these two mismatches and nothing
else — every other name and rating agrees.

## 3 · The rest of the validation (all VERIFIED on my independent transcription)

| check | result |
|---|---|
| records | **539** |
| duplicate names | **0** |
| ratings | 67–97, **31 distinct values**, all integers (the Owner's "public values are integers" rule) |
| rank coverage | 1…539, **contiguous, no gaps** |
| tier labels | carried through as supplied, with the derived rank alongside |
| distribution | 97:3 · 96:3 · 95:1 · 94:1 · 93:6 · 92:1 · 91:4 · 90:2 · 89:1 · 88:4 · 87:11 · 86:6 · 85:14 · 84:12 · 83:8 · 82:13 · 81:13 · 80:20 · 79:47 · 78:25 · 77:15 · 76:37 · 75:35 · 74:46 · 73:48 · 72:35 · 71:45 · 70:27 · 69:22 · 68:33 · 67:1 |
| fields the source does **not** supply | team/franchise, position, height, age, current career status, per-player citation, attributes — **left empty, not invented** |
| provenance | recorded on every record: "owner-supplied 2027 NBA ratings", source date 2026-10-21, raters [Owner], review_state "owner-supplied; pool approval pending" |

## 4 · What this does and does not settle

**Settles:** the record count (539), the missing player, the spelling, and the fact that the list is
complete and internally consistent. It also answers a question the Owner had open: **for the 2027 NBA
list, identity is not the problem** — these are conventional names already, and the council's "377 of 494
rows are a single token" difficulty is a property of the **all-time** NBA material, not this one.

**Does not settle (still the Owner's to answer, and the data to carry):** every 2027 NBA record has **no
team, no position and no career status** — the Owner's list supplies a rank, a name and a rating, nothing
else. Those three fields are required before a draft can run, and they must not be invented. The natural
next step is for the Owner's NBA 2K file (ratings, source and version preserved) to be joined to this list
by name, and for positions to be derived from the 2K records rather than typed in.

## 5 · What I did not do

- **I did not edit MiniMax's file** — it is another seat's artefact, and the correction belongs to its owner.
  This note and my independent transcription are the evidence; the fix is a one-record addition and one
  spelling change in `SIM-PLATFORM/data/nba/nba-2027-owner-ratings.json`.
- I did not assign teams, positions or status, and I did not rate anyone.
- I did not re-verify the Owner's underlying ratings against any external source — they are the Owner's
  numbers, carried through as given.
- I did not check the all-time NBA material, which remains a separate open item.
