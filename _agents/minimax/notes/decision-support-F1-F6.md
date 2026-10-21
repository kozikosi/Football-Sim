# Decision support for the Owner's F1–F6 (the six multi-sport decisions)

**MiniMax (S-1900–1999) · 20 Oct 2026.** OR distilled six Owner decisions from the GPT PR#1 review
(`_agents/or/notes/decisions-ready-for-owner.md`). Those six are my PR#1 findings, condensed. This note
is the **measurement layer** under them: what the current build already says, what the numbers do, and
the recommended default with the cost of being wrong — so the Owner can answer with facts rather than
intuitions. Every number here is measured from `NFL Draft Simulator v20 Claude.html`
(`31b7d61f…`, 649,032 B) unless stated.

---

## F1 — NFL flex table: unchanged for all-time

**Measured.** Of the 1,148 draftable players, **1,045 (91%) can start in more than one slot**. The
positions that *cannot* move are exactly three — **QB, C and K (one legal slot each)**. Flex
capability by position:

| position | players | legal slots | slots it can cover |
|---|---:|---:|---|
| CB | 141 | 8 | MIKE, WILL, SAM, CB1, CB2, CB3, SS, FS |
| TE | 53 | 7 | TE1, TE2, MIKE, WILL, SAM, SS, FS |
| DT | 125 | 6 | C, DT1, DT2, MIKE, WILL, SAM |
| WR | 151 | 5 | WR1, WR2, WR3, SS, FS |
| EDGE (REDG/LEDG) | 129 | 5 | DE1, DE2, MIKE, WILL, SAM |
| LB (MIKE/WILL/SAM) | 91 | 5 | MIKE, WILL, SAM, SS, FS |
| SS / FS | 107 | 5 | MIKE, WILL, SAM, SS, FS |
| OL (LT/RT/LG/RG) | 159 | 3 | its own two + C (or the other guard/centre) |
| HB | 89 | 2 | RB1, RB2 |
| **QB, C, K** | 103 | **1** | their own slot only |

**Recommended default: keep the table unchanged for all-time.** It is not an arbitrary penalty
schedule — it encodes "the three positions that do not move" and "the positions that cover a lot",
and the all-time pool inherits it wholesale with **zero code change**. *Cost of being wrong:* one
table and one review, and the flex question disappears from the all-time brief entirely.

## F2 — the position-taxonomy artifact: **shipped**

`SIM-PLATFORM/data/schema/nfl-position-taxonomy.md` (historical codes → current slot families, applied
at load time) and the validator's **position-taxonomy** check, which fails a pool whose codes are in
neither the build's `NATURAL_SLOT_MAP` nor its own vocabulary (it caught `LB` in my own example pool —
the build uses `MIKE`/`WILL`/`SAM`). The only Owner input left is the two ambiguities: `FL` (1950s
flanker vs 1990s flanker) and legacy `LB` (3-4 / 4-3 / SAM). *Default:* resolve where the evidence
allows, otherwise mark the record disputed and exclude it from the first published pool — never guess.

## F3 — pool target: 1,400 rated / 1,200 published, ~200 current-eligible at −5

**Measured — what the −5 actually does.** Modelled on today's own pool (the current-eligible half at
−5, the legends untouched):

| band | today | today at −5 |
|---|---:|---:|
| 99 | 6 | **0** |
| 95–98 | 29 | **0** |
| 90–94 | 57 | 35 |
| 85–89 | 98 | 57 |
| 80–84 | 196 | 98 |
| 75–79 | 377 | 196 |
| 70–74 | 385 | 377 |

**90+ falls from 92 to 35; 85+ falls from 190 to 92; the 99 and 95–98 bands go to zero.**

**That is the decision in numbers:** with ~200 current players at −5, **today's players become depth
and the legends carry the entire elite tier** — the published pool's top ~35–60 slots are legends, and
the current-eligible 200 sit at 70–85. If that is the intent (it reads as the intent), the rule is
right. *Recommended default:* **keep ~200 current-eligible at −5, OVR only** (the value maths reads
OVR only — measured), *and* rate the pool to 1,400 with the published view at 1,200, so the target is
a filter rather than a re-rating. *Cost of being wrong:* ~200 records re-rated, and the elite band
re-balances. *Note:* a 1,200-record pool already leaves 368 players undrafted (832 slots), so the
200-player reserve buys **depth for the replacement levels**, not more picks.

## F4 — peak vs career: prime ratings, and where a curve would live

**Measured.** The build has **no per-player rating state whatsoever** — `grep -cE "playerRating|playerOvr|age[|\.age|prime"` → **0**. A drafted player is a fixed tuple for the whole simulated season, so a career arc cannot be expressed today.

**Where a curve would hook (implementation note for the Architect).** The weekly loop is
`simulateCurrentWeek()` (v20:3434) → `advanceWeek()` (:3453), and the per-player stat book is
`seasonState.playerStats` (created :3378, written through the `book` helper at :3386, read at :3536,
:3954, :5105 and in the awards at :5644+). A prime/age curve is therefore a **season-engine parameter
applied at the weekly book write** — versioned like `MC` and `PLAN_K` — **not a data field**, and
therefore **not a reason to re-rate the pool**. *Recommended default:* rate the **prime**; record
`career.years` and `career.prime_seasons` as metadata; ship the curve as a versioned parameter when it
exists; until then, say plainly in the UI that every player is at his prime every season. *Cost of
being wrong:* the rating cohort is re-rated; the curve is one parameter set.

## F5 — NBA roster arithmetic: how many active players per club?

**Measured table** (30 teams; the NFL reference is 32 × 26 = 832 = 26 rounds, v20:892):

| active players | roster slots | draft rounds | picks | left over from a 1,200 pool |
|---:|---:|---:|---:|---:|
| 12 | 360 | 12 | 360 | 840 |
| 13 | 390 | 13 | 390 | 810 |
| 14 | 420 | 14 | 420 | 780 |
| **15** | **450** | **15** | **450** | **750** |
| 16 | 480 | 16 | 480 | 720 |
| 17 | 510 | 17 | 510 | 690 |
| 18 | 540 | 18 | 540 | 660 |

The draft length is not a taste decision: it is `roster slots ÷ teams`, exactly as the NFL's 26 rounds
is 832 ÷ 32. *Recommended default:* **15 active + 3 development → 450 slots → a 15-round draft.**
*Cost of being wrong:* the round count and the roster size move together.

## F6 — NBA rotations: minutes-weighted role tiers

**Measured — the football engine already owns two of the three pieces, and one of them is dead code.**
(i) The **depth chart** (`TEAM_DATA`) is football's rotation: a per-slot roster that the optimizer
draws from. (ii) `teamRatings(slotmap)` turns a lineup into nine unit ratings, and `optimalLineup`
(Hungarian) chooses who is on the field — the football analog of a lineup decision. (iii) The role-tier
table — `POSITION_TIER` / `TIER_BONUS` (v20:951-952) — **is never read** (M-81): football's
"tier bonus" is fiction, and the real position value lives in `DEFAULT_WEIGHTS` (QB 320, WR1 60) and
the `modelWeights` scale.

So the NBA pack needs three things, and only one of them touches the engine: **role tiers** (a live,
per-sport table, replacing the dead football one), a **minutes-weighted lineup** instead of a
starting-five average, and **availability feeding the minutes weights** — which finally gives the
`inj` field a job (it is used in **0** places today). *Recommended default:* all three, with the role
tier table per sport and the weighting in the profile. *Cost of being wrong:* a table and a profile
field; no engine rewrite, because the football engine never needed one.

---

## What I would not do

* **Do not** re-rate the current pool for the all-time mode — the −5 is a mode adjustment, not a
  correction, and the scale is shared on purpose.
* **Do not** wire football's `TIER_BONUS` back in as part of the expansion — it is a model change with
  a real effect on every draft value, and it belongs to the V21 decision, not to the expansion.
* **Do not** build a data shard before F1–F6 are recorded: the schema is settled and validated
  (`SIM-PLATFORM/data/nfl/current.json`, exit 0), but the *rules* the data is written against are not.
* **Do not** let the expansion's first sport be soccer-by-analogy: a soccer "draft-season simulation"
  is a different product (see my PR#1 finding 7) and deserves its own decision, not a port of the NFL
  loop.
