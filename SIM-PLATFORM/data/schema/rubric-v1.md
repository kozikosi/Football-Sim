# Rubric v1 → **v2** — how a player gets a rating (Owner-aligned, 21 Oct 2026)

**MiniMax (S-1900–1999) · 20 Oct 2026, revised 21 Oct 2026 against the Owner's product direction
(PR #4 `OWNER-PRODUCT-DIRECTION.md`, `_agents/gpt/research/all-time/design/nba/OWNER-DESIGN-DIRECTION.md`).**
The Owner owns the rating semantics and the final pool approval; this is the council's method, amended
where the Owner's direction supersedes it.

### What changed in v2 (Owner direction, 21 Oct 2026)

| v1 said | v2 says (Owner) |
|---|---|
| keep ~200 current players in an all-time pool at −5 on OVR | **the −5 current-player adjustment is NOT APPROVED** — it must not be applied until its purpose, eligible players and calibration are decided |
| rate 1,400, publish the top 1,200 | **~1,500–2,000 candidates per sport**; a pool only needs enough players to fill the required positions and rosters — a draft need not use every eligible player |
| OVR plus six football attributes | **OVR as the general player summary**, public data **integers**, internal decimals allowed, and **no fields the engine does not use** (measured: the football value maths reads OVR only; `inj` is used in 0 places) |
| one record with name/team/attributes | **person, player-season, team/franchise, career status, source and simulation rating kept distinct** |
| (silent) | **today's franchises in the simulation; historical team as draft-board context only** |
| (silent) | **modern rules**, and for all-time players the Owner's assumption of **a year of modern training** — evidence and reasoning, not a formula |
| the flex table stays as it is | **flex is a guideline, not a rule to copy**; per-sport rules with plausible penalties and some hard constraints — design work, per sport |

---

## 0. The three rules that make a rating usable

1. **The scale does not move.** The value maths is calibrated on the current pool's OVR range and its
   `slotWins` / `modelWeights` curves. A 99 means what a 99 means today. (Measured: the value maths reads
   `player[3]` — OVR — only; v20:946.)
2. **OVR is the product; the six attributes are context.** `inj` is used in **0** places in the build,
   `str` in 0 player-record places, and `spd/agi/cod/awr` in exactly one function (`returnerRating`,
   v20:2581). Rate OVR with care, attributes with honesty, and do not spend a week on `str`.
3. **Every rating carries its provenance** and is rated by at least two people independently.

---

## 1. What OVR means

| term | definition | default |
|---|---|---|
| **peak** | the single best season | not used alone |
| **prime** | the best **multi-year** window — the level the player held for several seasons | **the recommended target** |
| **career** | an average over the whole career | not used (the engine has no time dimension) |

**Recommended default: rate the PRIME.** A legend is rated at the level he played at for years, not his
best fortnight and not his 15-year average.

*Why prime, and not career:* a career average understates a short, transcendent peak (a 6-year career
of 95+ averages lower than a 15-year career of 85), and the engine cannot express a career arc — a
drafted player is the same number in every simulated season (measured: no per-player time dimension
exists in the build). If the Owner later wants career arcs, that is a **profile-level prime/age curve**
in the season engine, not a re-rating of the pool.

*Cost of being wrong:* if the pool is later judged against "career", the OVRs of short-peak players are
too high and of long-career players too low. The remedy is a re-rating, not a code change.

**Every record also carries** `career.years` and `career.prime_years` as metadata, so the pool can be
re-weighted later without being re-rated.

---

## 2. The OVR ladder (anchors)

| OVR | meaning | NFL reading |
|---|---|---|
| 99 | the best of all time at his position | the only tier that is *the* answer at his position |
| 95–98 | perennial, first-team all-pro | a Hall of Famer with a decade of dominance |
| 90–94 | clear multi-year starter | a Pro-Bowler / All-Pro, a franchise QB |
| 85–89 | solid starter | a long-term starter, a good #2 receiver |
| 80–84 | rotation, occasional starter | a starting-calibre backup |
| 75–79 | situational | a role player, a special-teams anchor |
| 70–74 | fringe roster | a third-stringer, a developmental rookie |
| 60–69 | camp body / long shot | a body, a practice squad |
| 40–59 | not a player | (rarely used; the current pool bottoms out at 70) |

**The calibration ladder** (`calibration-30.json`) places one real, current player at each band from 99
down to 70, with that player's build attributes as the reference. Raters rate those **first**, and their
offset and spread decide whether they are calibrated. This is the only scale anchor anyone needs.

---

## 3. The six attributes

| field | meaning | used by the engine today? |
|---|---|---|
| `spd` | speed | only the special-teams returner rating (v20:2581) |
| `str` | strength | no |
| `agi` | agility | only the returner rating |
| `cod` | coordination / technique | only the returner rating |
| `inj` | durability (100 = rarely unavailable) | **no** — but it will matter the moment rotations or prime curves exist (see my PR#1 finding F6) |
| `awr` | awareness / football IQ | only the returner rating |

Rate them in the same spirit as the current pool (that is what the `spd 96 / str 73 / agi 92` kind of
profile means), and **do not** let attribute disagreement block a record: OVR is what the draft reads.

---

## 4. The rules a rating must respect

1. **Position is a separate field, and it is the era's vocabulary.** The rater writes the position the
   player actually played (`HB`, `FL`, `E`, `T`, `LB`, `DB` …) and the taxonomy
   (`nfl-position-taxonomy.md`) maps it to the current slot families at load time. The rater never
   translates history into modern labels by hand.
2. **Flex is not a property of the player; it is a property of the assignment.** A player's OVR is his
   OVR. The flex cost is applied when he is used out of position (`effOvr`, v20:946) — it is a *rule*, not
   a discount in the rating. A 97-rated linebacker rated 97 stays 97; playing him at safety costs 4–6
   points *in that lineup*.
3. **Position scarcity is not in the rating.** The QB bonus (+14), the tier bonuses and the slot weights
   (`POSITION_TIER`/`TIER_BONUS`, `DEFAULT_WEIGHTS`) already live in the engine. The rating is the
   player's quality; the value of his position is the model's business.
4. **Current players in an all-time pool: no adjustment yet.** The Owner's direction of 21 Oct 2026
   states the previously discussed ~−5 adjustment **is not approved** and must not be applied until its
   purpose, eligible players and calibration are decided. Until then a current player carries their
   current rating, and the schema keeps an (empty) mode-adjustment field so a future approved
   adjustment has a home. *What the council can do meanwhile:* prepare the calibration study that would
   let that decision be made on evidence — i.e. what a 5-point shift does to the elite band (measured
   on today's pool: 90+ would fall from 92 to 35, and the 99 and 95-98 bands would empty) — and present
   it as evidence, not as a rule. *Cost of being wrong:* nothing, because nothing is applied.
5. **One rating per player per pool.** A player has one OVR; the mode adjustment is applied at load.
6. **Provenance is mandatory**: source, source version, source date, rater(s), batch, rubric version,
   review state.

---

## 5. The procedure (two raters, a median, and a third when they disagree)

1. **Calibrate.** Every new rater rates the calibration ladder and reports offset + spread. Within ±2
   points of the reference and a spread under 3: proceed. Otherwise re-read §1–§3 and re-rate.
2. **Rate independently.** No discussion before submission. A rater who sees a colleague's number first
   stops being an independent sample.
3. **Reconcile.** The recorded OVR is the **median** of the raters. If the spread is **> 5**, a third
   rater breaks it. If the third rater lands outside the original pair, take the median of the three and
   mark the record `review_state: "disputed"` for a human.
4. **Batch and publish.** 50–150 records per batch, each with its rater list and rubric version, and a
   green `tools/validate-dataset.mjs` run attached.
5. **Re-calibrate periodically.** Every 300 records, re-rate 10 calibration anchors; drift over 2 points
   means re-calibrating that rater.

---

## 6. What is *not* in this rubric (and where it belongs)

| question | owner | why it is not here |
|---|---|---|
| Should legacy players flex more than modern ones? | the Owner (`Q-TAX-1`) | it is a rule change, not a rating rule |
| Does a position's scarcity change between eras? | the Architect | `DEFAULT_WEIGHTS`/`POSITION_TIER` are protected constants |
| Should a 15-year career be modelled with a decline? | the Architect | it is a profile-level curve in the season engine, not data |
| What is the NBA's equivalent of a tier bonus? | the NBA profile | the NBA pack owns its own weights |
| Which leagues are in the soccer catalogue? | the Owner | scope, not ratings |

---

## 7. Open items for the Owner inside this rubric (four, with defaults)

* **Q-RUB-1 `[BLOCKING]`** Prime (recommended) or peak or career as the OVR target? *Default: prime; cost
  of being wrong: a re-rating of one cohort.* **Note (Owner, 21 Oct 2026):** the modern-rules framing
  ("a year of training under modern rules") is the Owner's stated modeling assumption, and the prime
  framing is compatible with it — the two together are the recommended default; the KG/Chuck Hayes
  examples are hypotheses to argue from evidence, never formulas.
* **Q-RUB-2 `[NOW]`** Does the −5 apply to OVR only (recommended) or to all six attributes? *Default: OVR
  only; cost: one field.*
* **Q-RUB-3 `[NOW]`** *Superseded by the Owner's direction of 21 Oct 2026* (the −5 adjustment is not
  approved; the candidate target is ~1,500–2,000 per sport). What remains open is the **candidate
  count and composition**: the Owner gives final approval per pool, and the council's job is to
  assemble a source-backed candidate list. *Default: assemble to the stated target and let the Owner
  trim; cost: rating effort spent on candidates the Owner does not select.*
* **Q-RUB-4 `[NOW]`** Should the all-time pool include kickers (recommended: yes — `K` is a drafted slot)
  and punter/fullback (recommended: no — not in `ROSTER_SLOTS`)? *Default: K yes, P/FB no.*
