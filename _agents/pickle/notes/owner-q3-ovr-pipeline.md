# Owner Q3 — OVR-centered, integer-public rating pipeline

SPEAKER: Pickle | ROLE: Council reviewer (S-800–899), recipient of MOC's A3 assignment | TASK: Owner question 3 — pipeline spec | DATE: 2026-10-21 02:40 UTC

Build under test: `NFL Draft Simulator merged.html` sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B, branch `merge/v20-donor` @ `ff8c05ae`. Called the **merge candidate** throughout; never "V21".

Every claim below is VERIFIED against that file with the line numbers quoted, or labelled REPORTED / INFERRED / UNKNOWN.

---

## 1. What the engine ACTUALLY reads (the reference point)

The Owner's assignment is "use the build's own rating maths as the reference point". Here is what is literally in the file.

**The player record is an 11-slot tuple** (VERIFIED, `const PLAYERS = [` at line 449):
```
["Ja'Marr Chase","WR","Cincinnati Bengals",99,96,73,92,96,92,99,true]
  0:name        1:pos   2:team            3:ovr 4:spd 5:str 6:agi 7:cod 8:inj 9:awr 10:xf?
```
So the engine consumes exactly one summary rating (**index 3, `ovr`**) plus **six** attributes (`spd, str, agi, cod, inj, awr`) and one boolean flag. **It does not read any other per-player rating.** That is the whole vocabulary.

**The `ovr` index is the only input to the wins maths** (VERIFIED):
- `slotWins(slot, ovr)` (line 1341) → looks up a per-slot wins curve by `ovr` alone.
- `slotWinsPerOvr()` (line 1346) → `out[s] = (slotWins(s,90) - slotWins(s,70))/20` — a slope in wins per +1 OVR.
- `modelWeights()` (line 459) → `out[k] = Math.max(5, Math.round(w[k]/mx*700/5)*5)` — **the 700-scale is DERIVED from `slotWinsPerOvr()`**, not authored. QB tops the scale at 700 because `mx` is the QB slope.
- `POINTS_PER_WIN = 32.5` converts the point model to wins.

**Consequence for any pipeline (the load-bearing fact):** `ovr` is the **primary** driver — it alone runs `slotWins`, hence the per-slot wins curve, the 700-scale and `cpuPick`'s value. **But `ovr` is NOT the only causal rating, and I corrected a draft of this section that said so** (see §4): two attribute paths are causal, `returnerRating` and `qbSpd`. So the engine's causal vocabulary is: **`ovr` (primary) + `spd/agi/cod/awr` (secondary, in two named places) + `pos`/slot (fit)**. `str` and `inj` are read nowhere.
**A pipeline that computes `ovr` from attributes would be a BUILD-TIME derivation feeding a value the engine already treats as primary — that is expressive today.** What is *not* expressive is any rating meant to change an outcome **without first collapsing into `ovr` or one of the two attribute paths above**.

**Nine unit ratings the sim does read** (VERIFIED, `RATING_SPECS` line 1938) — these are slot-weighted averages, not player attributes:
`olRun, olPass, rb, qb, rec, passRush, frontRun, coverage, kicker` — each a weighted blend over roster slots (`wavgSlots`, line 1991). Plus `ret` (returner score), `te1/te2`, and `DEF_SPECS`/`PERS_REC` subgroups.

**Protected constants** (do not touch without approval): `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`.

---

## 2. OVR as the general summary — NFL vs NBA, where they differ

| | NFL (as built) | NBA (proposed) |
|---|---|---|
| Summary rating | `ovr` = index 3, integer 50–99 in practice, consumed directly by `slotWins` | `ovr`, integer 0–99 public |
| What generates outcomes | `ovr` → per-slot wins curve → unit ratings → points model | needs a named pipeline: `ovr` → minutes/rotation → per-possession value → points |
| Positional structure | 9 unit ratings over 26 drafted slots; flex with penalties | ~5 on court, positionless; fewer slots, more overlap |
| Attribute importance | attributes are DISPLAY only; `ovr` is the sole driver | Owner says rim protection / 3PT "may matter more" — so attributes may need to be **causal**, which the NFL engine does not currently do |

**The key NFL/NBA difference the Owner named, restated precisely:** the Owner wrote basketball "has fewer players on court and more positionless play, so attributes such as rim protection and three-point shooting may matter more than they did in the football sim." In the football sim **those kinds of attributes do not matter at all to the outcome** — they are not read. So an NBA pipeline that makes rim protection causal is **not** a port of the NFL maths; it is a new maths where attributes feed the outcome. That must be a deliberate decision, not an assumption.

---

## 3. Integer-public / decimal-internal — every proposed field marked

Owner rule: "Public-facing data should use integers. Internal calculations may use decimals when useful. Do not invent decimal ratings or fields the engine does not use."

| field | layer | public | internal | consumer today (NFL engine) |
|---|---|---|---|---|
| `ovr` | sim rating | **int** | — | YES — `slotWins` (the only causal rating) |
| `spd,str,agi,cod,inj,awr` | sim rating | **int** | — | **PARTLY** — `spd/agi/cod/awr` are causal via `returnerRating` (l.2622) and `qbSpd` (l.2426); `str` and `inj` read nowhere |
| `pos` | identity | string | — | YES — `POS_SLOT_MAP`, `ROSTER_SLOTS` |
| `team` (current franchise) | franchise | string | — | YES — `TEAM_DATA` key |
| unit ratings (`qb`, `rec`, …) | derived | **int (rounded for display)** | decimal in maths | YES — `teamRatings` produces them, `matchupModel` reads them |
| wins-per-OVR slope | derived | — | decimal | YES — `slotWinsPerOvr` |
| `sourceRef` (source + version + date) | source | string | — | **NO consumer yet** — metadata, by design |
| person id / player-season id | identity | string | — | **NO consumer yet** |

**Fields to REFUSE (invented-and-unread).** A prior council finding established `careerAverage` had no consumer — same class. Any proposed field that no function reads is a **cost, not a feature**. The named candidates I would refuse under this rule: decimal per-attribute "sub-ratings", a `potential`/`ceiling` growth field, a `prime`/`decline` curve, and any per-attribute decimal that is not first folded into `ovr` or into a unit rating the engine reads.

---

## 4. Which attribute inputs MATERIALLY improve OVR or position-fit

"Materially improve" means: changes the `ovr` value, or changes the slot assignment / flex decision.

**Materially improves the OVR or position-fit decision (evidence-anchored):**
- **`ovr` itself** — the sole driver of `slotWins` and thus of the 700-scale. Everything else is subordinate.
- **`pos`** — drives slot eligibility (`POS_SLOT_MAP`, `ROSTER_SLOTS`), flex (`NATURAL_SLOT_MAP`, `flexPenaltyFor`) and replacment grouping (`WV_TAG_GROUP`). A wrong `pos` changes both value and fit.
- **slot** (the position the player is placed at) — because `slotWins` is per-slot; `effOvr` applies the flex penalty. Position-fit IS the slot choice.

**Does NOT materially improve any decision in the current engine (states plainly why):**
- **`str` and `inj`** — **zero attribute reads anywhere in the file** (VERIFIED: `grep -oE '\bp\[[4-9]\]'` returns only indices 4, 6, 7, 9 — from lines 2426 and 2622; no read of index 5 or 8). They are real data and user-facing, but they change **no** outcome today. *Keep the fields; do not claim they explain wins.*
- Any aggregate over attributes (e.g. an attribute-average "true ovr") — provably equal to nothing the engine reads unless it *replaces* `ovr`.

**CORRECTION to my own first draft (recording it rather than hiding it).** I first wrote that all six attributes are "not on any causal path". **That was wrong**, and the file refutes it:
- `returnerRating(p)` (line 2622) = `0.50*p[4] + 0.20*p[6] + 0.20*p[7] + 0.10*p[9]` → reads **spd, agi, cod, awr** → becomes `r.ret` (line 1990) → `retPts = RET_PTS*(exp(((O0.ret||82)-82)/45) - …)` (line 2126) in the points model. **A genuine causal path.**
- `qbSpd = rawQB[4]` (line 2426) → `qbRushYds = round(205*exp((qbSpd-85)/8)…)` → QB rushing yards. **A genuine causal path.**
So the accurate statement is: **`spd/agi/cod/awr` are causal in two named places; `str` and `inj` are not causal anywhere.** The pipeline must therefore treat those four as **rated-and-causal**, not decorative — which *strengthens* the case that a rating pipeline should derive them carefully, and leaves `str`/`inj` as display fields pending a consumer.

---

## 5. Layer separation — proposed record shape

Owner rule: "Keep person identity, player-season, team/franchise, current career status, source, and simulation rating distinct."

```
Person        { personId, name, birthOrEra }                 // identity only, no rating
PlayerSeason  { playerSeasonId, personId, season, statsRef }  // one season of evidence
Franchise     { franchiseId, currentName, historicalContext } // e.g. Oscar Robertson's Cincinnati Royals as CONTEXT
CareerStatus  { personId, status: active|retired|... }        // current career status
Source        { sourceRef, sourceName, version, date }        // NBA 2K / FIFA / council-assembled
SimRating     { playerSeasonId, ovr:int, pos, attrs{...} }    // THE ONLY layer the engine reads
```
Rules that fall out of the Owner's direction:
- **Draft board may show `Franchise.historicalContext`; the SIMULATOR places the player on `Franchise.currentName`.** So `historicalContext` is a display field on the franchise layer, never a team key the engine matches on. (VERIFIED current engine: the engine keys on `TEAM_DATA[team]` by current name — line 478/569/585.)
- **`SimRating` must be able to exist without `Source`**, and vice versa — they are joined, not merged.
- **−5 all-time adjustment: NOT applied** (Owner: not approved). If ever applied it would be a transformation on `SimRating.ovr` with a stated purpose + eligibility + calibration — it is not a field.

---

## 6. Source preservation

Owner: "I plan to provide NBA 2K and FIFA ratings. The council may use NBA 2K OVR as a basketball source, but preserve the source and version." → every `Source` record carries `sourceName` (e.g. "NBA 2K"), `version` (edition), `date`, and an opaque `sourceRef` into the raw intake (PR #4's research folders). **The `SimRating` is derived from, not identical to, the source value** — the difference is recorded, not discarded.

---

## 7. What this pipeline CAN and CANNOT express (the honest boundary)

**CAN:** an integer `ovr` per player-season driving the existing wins maths; slot/flex fit; source-tagged records; historical franchise context on the board while simming on the current franchise.

**CANNOT (without new maths, which is a decision not a spec):**
- rim protection / 3PT as **causal** for NBA — the NFL engine has only two per-attribute causal paths (returner rating, QB speed), neither of which is a "rim protection" analogue; a new causal path must be built, not assumed.
- any public metric claimed to "explain Wins" that is not on the `ovr → slotWins / teamRatings → matchupModel → POINTS_PER_WIN` chain (nor on the two attribute paths). (See GLM's parallel assignment: DRIVES / CORRELATED / DECORATIVE.)

---

## Evidence (commands)

```
$ shasum -a 256 "NFL Draft Simulator merged.html"
40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd
$ grep -n "function slotWins" "NFL Draft Simulator merged.html"        → 1341
$ grep -n "function slotWinsPerOvr" …                                  → 1346
$ grep -n "function modelWeights" …                                     → 459
$ grep -n "const RATING_SPECS" …                                        → 1938
$ grep -n "const DEFAULT_WEIGHTS\|const FLEX\|const NATURAL_SLOT_MAP"   → 452 / 940 / 931
$ grep -o 'const PLAYERS = \[' …                                        → line 449, 11-slot tuple

# attribute causality (the correction in §4):
$ grep -noE '\bp\[[4-9]\]' "NFL Draft Simulator merged.html"
2622:p[4]   2622:p[6]   2622:p[7]   2622:p[9]      <- ONLY attribute reads in the file
$ sed -n '2622p'   → returnerRating(p){ return 0.50*(p[4]||70)+0.20*(p[6]||70)+0.20*(p[7]||70)+0.10*(p[9]||70); }
$ sed -n '2426p'   → const rawQB = sm['QB'], qbSpd = Array.isArray(rawQB) ? rawQB[4] : 82;
   => spd/agi/cod/awr causal (returner rating -> r.ret -> retPts l.2126; QB rushing l.2428)
   => str (idx 5) and inj (idx 8): ZERO reads anywhere -> not causal today
```

Self-audit: read-only on the product file and every other lane; wrote only this file in `_agents/pickle/notes/`. No rating assigned to any player; no pool or data file edited; nothing pushed/merged/released. Reported to MOC as recipient of A3.
