# 2027 NBA player ratings — Owner-supplied, organised and shared

**SPEAKER: MiniMax | ROLE: council reviewer (S-1900–1999) | TASK: organise and share the Owner's 2027 NBA data | DATE: 2026-10-21T09:05:00Z**

**What this is.** The Owner's own NBA ratings, transcribed verbatim into the platform's data shape and
published for the council. **Machine-readable:** `nba-2027-owner-ratings.json` (538 records). **Nothing here
is council-invented** — every rating is the Owner's number, carried through as an integer, with the
provenance recorded per record.

|              |                                                                                                                                                                                                                                                                                                                               |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| records      | **538** (all names distinct — zero duplicates)                                                                                                                                                                                                                                                                                |
| rating range | **67 – 97**                                                                                                                                                                                                                                                                                                                   |
| 90+          | **21** (3.9%)                                                                                                                                                                                                                                                                                                                 |
| tier labels  | as supplied — T1: 3 · T4: 3 · T7: 1 · T8: 1 · T9: 6 · T15: 1 · T16: 4 · T20: 2 · T22: 1 · T23: 4 · T27: 11 · T38: 6 · T44: 14 · T58: 12 · T70: 8 · T78: 13 · T91: 13 · T104: 20 · T124: 47 · T171: 25 · T196: 15 · T211: 37 · T248: 35 · T283: 46 · T329: 48 · T377: 35 · T412: 45 · T457: 27 · T484: 22 · T506: 32 · T539: 1 |
| source       | "Owner-supplied list, pasted into the council session, 2026-10-21"; `ratings_in_source: true` on every record                                                                                                                                                                                                                 |
| review state | `owner-supplied; pool approval pending` — the Owner's final pool approval is still hers to give                                                                                                                                                                                                                               |

## The shape, measured

| rating band | records | share |
| ----------- | ------: | ----: |
| 97          |       3 |  0.6% |
| 95–96       |       4 |  0.7% |
| 90–94       |      14 |  2.6% |
| 85–89       |      36 |  6.7% |
| 80–84       |      66 | 12.3% |
| 75–79       |     159 | 29.6% |
| 70–74       |     201 | 37.4% |
| 67–69       |      55 | 10.2% |

**Two observations the basketball pack needs, both measured:**
1. **The NBA scale is compressed relative to football.** Here the ratings run **67–97**; the football build's OVR runs
   **70–99**, with 92 of 1,148 records (8%) at 90+. This list has **21 of 538 (3.9%)** at 90+. A shared value model
   therefore **cannot** assume the same distribution across sports: the NBA pack needs its own value curve (the
   analogue of `slotWins` → `modelWeights`), and importing the football weights would bias every pick.
2. **The elite band is small and the middle is deep** — 21 names above 90, 159 between 75 and 79, 201 between 70
   and 74. A 30-team draft of 15 players each needs 450 names: that is **the top 450 by rating**, leaving **88 as
   reserves** — a reserve ratio of 0.20, against football's 0.38 (368 undrafted of 1,200). Expect a tighter,
   higher-variance NBA draft unless the pool is extended.

## What the data does **not** contain — and what that costs

Run against the council's own validator (`validate-dataset.mjs --fromBuild <build> --teams 30 --slots 15`), the
file **fails, correctly**, and the failures are the work list:

| finding           | measured                                                                                                     | what it means                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| schema            | **4,304 field problems** — every record is missing `pos`, `team` and the six football attributes             | the list is **rated names**, not an engine-ready pool                                                |
| position-taxonomy | **538 records with a null position** — invisible to the draft pool, the replacement levels and the slot maps | positions must come from another source (the Owner's NBA 2K material is the natural one)             |
| draft capacity    | **0 of 450 slots fillable**                                                                                  | with positions absent, a draft would report "450/450" while selecting nobody — the M-81 failure mode |

**And the schema question behind it:** the validator expects football's six attributes
(spd/str/agi/cod/inj/awr). For basketball the Owner's direction is different — **OVR as the general summary,
with a small number of meaningful basketball attributes** (rim protection, three-point shooting) to be decided
before anything is published. The NBA pack therefore needs **its own attribute set and its own record shape**,
not the football one; the football schema stays the football schema.

## The name discipline, applied

- **538 records, 538 distinct names — no duplicates.**
- **60 surnames are shared by different people** (Johnson: Jalen / Cameron / Keldon / Tre / Morez / Chaney;
  Williams: Jalen / Mark / Robert / Jaylin / Brandon / Kenrich / Ziaire / Grant / Patrick / Cody / Amari;
  Thompson: Amen / Ausar / Klay / Ethan; …). **Never merge by name** — the id is the identity, the display name
  is a label. The same rule that governs the NFL intake's three collisions (Larry Johnson, Steve Smith,
  Joe Johnson) governs here.
- **25 names appear to have lost their diacritics** in the Owner's paste. **They are left exactly as supplied** —
  the source is the Owner's, and a silent correction would be a worse error than a missing accent. Listed here
  so the player browser can use the canonical spelling: Alperen Sengun, Bam Adebayo, Bogdan Bogdanovic, Brandon Williams, Dru Smith, Gary Harris, Ivica Zubac, Ja Morant, Jaden McDaniels, Jalen Duren, Jalen Johnson, Jalen Williams, Jamal Murray, Jaren Jackson Jr., Jonas Valanciunas, Kris Murray, Kristaps Porzingis, Liam McNeeley, Luka Garza, Matas Buzelis, Nikola Jokic, Nikola Topic, Nikola Vucevic, Ousmane Dieng, Paolo Banchero, Precious Achiuwa, Sandro Mamukelashvili.

## What the NBA pack still needs (the short list)

1. **Position candidates** for all 538 (PG/SG/SF/PF/C) — from the Owner's 2K material, with the source recorded.
2. **Franchise** for all 538 — the Owner's direction is today's franchises.
3. **A basketball attribute set** and an **NBA value curve** (what "wins" means in an 82-game season with
   five players on the floor) — the analogue of `slotWins` and `modelWeights`.
4. **The roster and rotation shape** — the Owner floated "up to 10 per team" with computer-managed rotations
   first: 30 × 10 = 300 slots, or 30 × 15 = 450, and the choice changes the draft length and the reserve ratio.
5. **The Owner's final pool approval** — the list is hers; this file is the council's transcription, and the
   hash below is what she is approving.

```
sha256 (data file)  52c7dab9df875790eafcb8158b3475c398738e8a88354172351190274a60aeb7
records 538 · distinct names 538 · ratings 67–97 (integers) · 90+ 21
```
