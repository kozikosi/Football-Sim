# NFL position taxonomy — historical codes → current slot families

**MiniMax (S-1900–1999) · 20 Oct 2026 · the artifact my PR#1 finding F2 asks for.** Load-time mapping:
the raters write the position as the player actually played it; this file translates it into the slot
families the current engine understands. The flex table, the weights and the tier bonuses are **not**
touched.

## Why this file has to exist

The current pool's position codes are era-specific — `HB`, `REDG`/`LEDG`, `MIKE`/`WILL`/`SAM`,
`LT/RT/LG/RG/C` (v20:892-906) — and every rule in the engine is keyed on them:

| rule | v20 line | keyed on |
|---|---|---|
| `ROSTER_SLOTS` | 892 | slot names (`QB, RB1, RB2, WR1…FS, K`) |
| `NATURAL_SLOT_MAP` | 899 | position codes |
| `SLOT_FAMILY` | 906 | slot names → families (`RB, WR, TE, OT, OG, C, DE, DT, MIKE, WILL, SAM, CB, SS, FS`) |
| `FLEX` | 908 | position codes → allowed moves and costs |
| `POSITION_TIER` / `TIER_BONUS` | 938-941 | position codes (QB +14, tier-2 +8, tier-4 −6, K −30) |
| `DEFAULT_WEIGHTS` | 452 | slot names (QB 320, OT/OG/C 295, CB 350 …) |
| `effOvr` | 946 | `player[1]` (position) and `player[3]` (ovr) |

**The failure this prevents — measured, 20 Oct (this replaces my first, wrong description of it).**
An all-time pool authored in legacy codes (`HB`, `FL`, `E`, `T`, `G`, `LB`, `DB`) does not break loudly.
It breaks *quietly and partially*:

1. `POS_SLOT_MAP`'s keys are exactly `NATURAL_SLOT_MAP`'s 19 position codes (v20:930-948). A record
   with any other code is **excluded from the draft pool** (`draftSim.pool = PLAYERS.filter(p=>POS_SLOT_MAP[p[1]])`,
   v20:1434), **skipped by the CPU's candidate loop** (`if(!c) continue`, v20:1375), **excluded from the
   replacement-level pool** (v20:1334) and has **no eligible slots** (v20:1171, :1536, :1611).
2. When the visible pool cannot fill the board, `simToEnd` **advances the pick counter without drafting
   anyone**: `if(pk && pk.slot) executePick(...); else draftSim.pos++;` (v20:1494-1497).
3. So the draft still reports **832/832 and "Draft Complete"** while N starter slots across the league
   are **empty**, and no error is raised anywhere.

**The measurement** (a probe built from the merged candidate, 400 draftable records rewritten to the
legacy code `FL`; the page itself was asked what it sees):

| | merged candidate (clean) | probe (400 legacy-coded records) |
|---|---:|---:|
| records | 1,200 | 1,200 |
| visible to `POS_SLOT_MAP` | 1,148 | **748** |
| draft counter | 832 / 832 | 832 / 832 *(looks complete)* |
| **actual picks** | **832** | **748** |
| **roster slots filled** | **832** | **748** |
| legacy players drafted | 0 | 0 |

(Note the 52 records that are invisible **by design** in the current build: `P`, `FB`, `LS` — the
non-drafted roles. 1,200 records, 1,148 visible.)

**Correction to my own PR#1 finding F2 (20 Oct):** I first described this as "every legacy player is
ineligible for every slot → an empty roster". That was mechanically wrong: `flexRule` returns `null`
for an unknown code, but `flexPenaltyFor` converts `null` into the **emergency penalty of 8** (v20:908-916),
so the player is not excluded by the flex rule — it is excluded by the *pool filters*, and the visible
symptom is **silently skipped picks and empty slots**, not an empty roster. The conclusion (a legacy
pool is unusable and must be translated) stands; the mechanism is now measured, not asserted.

## The mapping

`family` = the modern slot family the historical role maps to. `slot` = the modern slot code(s) the
family can occupy. A record carries the **historical** code; the loader fills `slot_families`.

| historical code | era(s) | → family | → slot(s) | note |
|---|---|---|---|---|
| `QB` | all | QB | `QB` | never flexes (`FLEX.QB = {}`, v20:908) |
| `HB`, `FL`, `B` | pre-1990 | RB | `RB1`, `RB2` | the modern `HB` code is the same family; keep `HB` as the display code |
| `RB` | 1990+ | RB | `RB1`, `RB2` | |
| `WR`, `FL` (as receiver) | all | WR | `WR1`, `WR2`, `WR3` | `FL` is ambiguous — a 1950s flanker is a **defender**; resolve by era + role before mapping (see below) |
| `TE` | all | TE | `TE1`, `TE2` | |
| `T` (tackle) | pre-1970 | OL | `OT1`, `OT2` | which side determines OT1/OT2 |
| `LT`, `RT` | all | OL | `OT1`, `OT2` | |
| `G`, `LG`, `RG` | all | OL | `OG1`, `OG2` | |
| `C` | all | OL | `C` | |
| `E`, `DE` | all | DE | `DE1`, `DE2` | `REDG`/`LEDG` is the modern split; a legacy `E` maps to the DE family, and the side (R/L) is recorded separately when known |
| `DT`, `NG` (nose guard) | all | DT | `DT1`, `DT2` | |
| `LB` | pre-1990 | LB | `MIKE`, `WILL`, `SAM` | **the one judgement call**: 3-4 scheme → MIKE; 4-3 → WILL; strong-side SAM → SAM. Record which, and treat it as a reviewable field |
| `SAM`, `WILL`, `MIKE` | 1990+ | LB | same code | already modern |
| `DB` | pre-1970 | DB | `CB1`, `CB2`, `CB3`, `SS`, `FS` | pre-1970 "defensive back" is a corner; the safety split is post-1978. Default: `CB`; promote to `SS`/`FS` only with a reason |
| `CB` | 1970+ | CB | `CB1`, `CB2`, `CB3` | |
| `S` (safety) | 1970+ | S | `SS`, `FS` | free safety vs strong safety — the `SS`/`FS` split needs one line of evidence per player |
| `K` | all | K | `K` | |
| `P` | all | — | not drafted | not in `ROSTER_SLOTS` (v20:892) |
| `FB`, `LS` | all | — | not drafted | not in `ROSTER_SLOTS`; `POSITION_TIER` still values them (FB tier 5) for roster logic only |

## The two ambiguities, and the rule for each

1. **`FL`** — a flanker in the 1950s–60s was a **defensive** back; in the 1990s+ `FL` meant a flanker
   (receiver). *Rule:* resolve by era **and** by team role. Where it cannot be resolved, the record is
   flagged `review_state: "disputed"` and **excluded from the first published pool** rather than guessed.
2. **Legacy `LB`** — the 3-4 / 4-3 / SAM question. *Rule:* record the scheme in the record's `notes`
   (free text) and map to the MIKE/WILL/SAM family; when the scheme is unknown, map to `MIKE` (the
   middle) and mark it `review_state: "unreviewed"`. The flex table makes the three nearly equivalent
   (`LB_FLEX` is shared by MIKE/WILL/SAM, v20:908), so the cost of being wrong is small and bounded.

## How the loader uses it (no engine change)

```
record.positions   = ["HB", "1960s"]         ← what the rater wrote
record.slot_families = ["RB"]                ← filled by the taxonomy at load
```

* `isNaturalSlot(pos, slot)` then resolves through the *family*, exactly as it does for `HB` today.
* `flexRule` is consulted for the family, so a legacy `LB` inherits `LB_FLEX` (MIKE/WILL/SAM, costs 4-6)
  and a legacy `T` inherits the OT family (free to the other guard/centre spots, −4 to a tackle spot).
* `POSITION_TIER` and `DEFAULT_WEIGHTS` are read by **family/slot**, not by the historical code, so the
  QB bonus (+14), the tier bonuses and the slot weights keep working unchanged.

**Consequence:** the all-time pool reuses the current engine's flex, weights and tier logic with **zero
code changes** — which is the point. The only new artifact is this table, and every line in it is
reviewable by a human.

## Open questions this file raises for the Owner (two, with defaults)

* **Q-TAX-1 `[NOW]` — should a legacy player be allowed to flex *more* than a modern one?** (1970s
  positions were less specialised: a `DB` really did play corner and safety.) *Recommended default:
  **no** — keep one flex table for every era; the cost of being wrong is a fairness nuance in a
  historical mode, and a second table is a second thing to maintain and verify.*
* **Q-TAX-2 `[NOW]` — should the all-time pool include specialists (K) and non-drafted roles (P, FB)?**
  *Recommended default: **K yes, P/FB no** — `K` is in `ROSTER_SLOTS` (v20:892) so a kicker can be
  drafted; `P`/`FB` are not, so they are rated for realism but never drafted.*


---

## 5. The gate that enforces this (new, 20 Oct)

`node SIM-PLATFORM/tools/validate-dataset.mjs <pool.json> --fromBuild "<build.html>" --teams 32 --slots 26`

* **position-taxonomy** — every record's `pos` must be a code in the build's `NATURAL_SLOT_MAP`;
  anything else is a FAIL naming the offending codes and counts.
* **draft-capacity** — the number of *visible* records must be at least `teams x slots` (32 x 26 = 832
  for the NFL). If it is not, the validator fails with the exact number of picks that would be silently
  skipped.
* The "not draftable by design" codes (the build's own `P`, `FB`, `LS`) are reported as information, not
  as failures, so a real pool is not blocked for including a punter.

Both checks are read-only and need no installs. The taxonomy file itself remains a *human* artifact: the
validator proves the codes are legal, the taxonomy says which modern slot family each legacy code
means.
