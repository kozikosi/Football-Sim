# The current pool's real shape — the target for the all-time pool

**MiniMax (S-1900–1999) · 20 Oct 2026 · measured from the reference build, not estimated.**
Source: `NFL Draft Simulator v20 Claude.html` (`31b7d61f…`, 649,032 B), `const PLAYERS` at line 449 —
1,200 records, read directly from the build.

## Why this file exists

`rubric-v1.md` says "rate the prime" and "rate on the same scale"; `DATASET.md` says the all-time pool
should _resemble_ the current one. Both need a number instead of an adjective. This is that number: the
shape a 1,200-player NFL pool actually has today, so a rater and a reviewer can see at a glance whether
a candidate pool is football-shaped or carnival-shaped.

## The measured shape

| OVR band                                | records (draftable) | share |
| --------------------------------------- | ------------------: | ----: |
| 99                                      |                   6 |  0.5% |
| 95–98                                   |                  29 |  2.5% |
| 90–94                                   |                  57 |  5.0% |
| 85–89                                   |                  98 |  8.5% |
| 80–84                                   |                 196 | 17.1% |
| 75–79                                   |                 377 | 32.8% |
| 70–74                                   |                 385 | 33.5% |
| **total draftable**                     |           **1,148** |  100% |
| not drafted by design (`P`, `FB`, `LS`) |                  52 |     — |
| **records in the build**                |           **1,200** |     — |

**The two numbers a pool should be checked against:** **8% of the pool is 90+** (92 of 1,148) and
**~1/3 of the pool sits at 75–79** — a deep, flat middle. A pool that is 30% above 90 drafts like a
carnival; a pool with no 75–79 band has no depth, and the replacement levels (which are computed
against the pool) become meaningless.

## Per position — the shape an all-time pool should mirror

| position | records | 90+ | 90+ share |
| -------- | ------: | --: | --------: |
| WR       |     151 |  12 |        8% |
| CB       |     141 |   8 |        6% |
| DT       |     125 |  10 |        8% |
| HB       |      89 |   9 |       10% |
| LEDG     |      71 |   5 |        7% |
| REDG     |      58 |   4 |        7% |
| SS       |      54 |   5 |        9% |
| TE       |      53 |   5 |        9% |
| FS       |      53 |   4 |        8% |
| MIKE     |      43 |   3 |        7% |
| RG       |      43 |   4 |        9% |
| WILL     |      43 |   1 |        2% |
| QB       |      40 |   7 |       18% |
| LT       |      39 |  10 |       26% |
| RT       |      39 |   1 |        3% |
| LG       |      38 |   2 |        5% |
| K        |      32 |   0 |        0% |
| C        |      31 |   2 |        6% |
| SAM      |       5 |   0 |        0% |

Read it as the _current league_, and note the two things it teaches the all-time work:
- **Scarcity is visible in the shape.** 40 quarterbacks (18% of them 90+) against 151 wideouts (8%) is
  exactly what `DEFAULT_WEIGHTS` encodes (QB 320, WR1 60). The all-time pool should reproduce the
  _shape_ of scarcity, not a flat distribution — a legendary pool with 150 quarterbacks would make the
  draft a different game from the one the Owner is expecting.
- **The middle is the league.** 762 of 1,148 records sit between 70 and 84. That band is where the
  replacement levels live, and therefore where the CPU's decisions live. An all-time pool that omits
  it is not "better" — it is a different simulation with a broken scarcity signal.

## How to use it

- **Raters:** the calibration ladder (`calibration-30.json`) plus this table tells you what each band
  contains; a "90" means what a 90 means today.
- **Reviewers:** compare a candidate pool's histogram and per-position counts against this table _before_
  reading a single name. A pool whose WR band is 12% 90+ is a fantasy pool.
- **The validator:** `tools/validate-dataset.mjs` prints the same histogram and compares it with a
  reference pool (`--ref`); use this build's pool as the reference.
- **The one number that matters for the draft:** the _draftable_ count must be at least 832
  (32 teams x 26 slots). Today's pool has 1,148 — a surplus of 316, which is why ~370 players are
  undrafted every year. A 1,200-record all-time pool with 52 non-drafted roles has the same surplus.
