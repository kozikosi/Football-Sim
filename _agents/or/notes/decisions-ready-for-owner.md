# DECISIONS READY FOR OWNER — GPT multisport PR #1 (F1-F6)

**Source:** `_agents/or/notes/consolidated-review-multisport-pr1.md` (sha256 `6cf4e3f1f0577f2261a256a402dee4318a47af25379b0144f7f7d7584171909f`)
**Status:** All six BLOCKING items verified against v20 (`31b7d61f…`, 649,032 B), donor (`77bb9ed5…`, 650,127 B), and merged candidate (`40233d6b…`, 657,486 B). No product files touched.

Record each decision below as one line in `DECISION-LOG.md`. Format: `YYYY-MM-DD | Q-OR-nnn | Decision | Reason | Build`. Do not proceed past a BLOCKING item until recorded.

---

## F1 — NFL flex table: unchanged for all-time (rule, not ratings)

**Question.** Does all-time mode use the same `FLEX` table (v20:908)?

**Recommended default: YES, unchanged.** Cost of being wrong: one mapping table, reversible, no code change. If you later want role-specific flex contributions, that's a post-merge change.

**Secondary question.** Is a flex player's draft value computed at the slot he actually starts (`effOvr`, current behaviour) or at his listed position?

**Recommended default: KEEP current behaviour** — draft value at the actual starting slot via `effOvr`.

**Evidence.** `effOvr(player, slot) = player[3] - flexPenaltyFor(pos, slot)` (v20:946); flex penalty subtracted from OVR; `ROSTER_SLOTS` = 26 starter slots; `NATURAL_SLOT_MAP` and `FLEX` tables already keyed on position codes (v20:892-908). The code already decides this precisely.

---

## F2 — POSITION_TAXONOMY artifact at load time

**Question.** Create `POSITION_TAXONOMY` (load-time mapping from era codes to current slot families)?

**Recommended default: YES.** Keep `FLEX` table untouched; add one artifact applied at load:

- `FL→WR`, `E→REDG/LEDG` (by side), `T→LT/RT`, `G→LG/RG`, `HB→HB`, `LB→MIKE/WILL/SAM`
- `DB→CB/SS/FS`, `K→K`

**Evidence.** Current codes are era-specific: `HB`/`REDG`/`LEDG`/`MIKE`/`WILL`/`SAM`/`LT`/`RT`/`LG`/`RG`/`C` (v20:892-906). Every downstream rule is keyed on those codes: `NATURAL_SLOT_MAP`, `FLEX`, `SLOT_FAMILY`, `POSITION_TIER`, `DEFAULT_WEIGHTS`, `effOvr`'s `player[1]`. Without taxonomy, a legacy pool's codes return `null` from `flexRule`, the Hungarian optimizer finds no legal assignment, and the draft silently produces empty slots (counter still reads 832/832). Neither failure is visible until the pool loads. `flexPenaltyFor` converts `null` into an 8-point emergency penalty, so players are not excluded by flex itself — but pool filters (`POS_SLOT_MAP`, `eligibleSlotsFor`, CPU `if(!c) continue`) filter them out. Measured: legacy-coded pool still reports 832/832 picks but only 748 actual picks / 748 slots filled. The conclusion stands: translate legacy codes before they reach a build. `SIM-PLATFORM/data/schema/player-record.schema.json` + `validate-dataset.mjs --fromBuild` enforce this now.

---

## F3 — Pool target: 1,400 rated / 1,200 published per sport, ~200 current-eligible at −5

**Question.** Is "around 1,200" per sport or combined?

**Recommended default:** Rate **1,400 candidates per sport**, publish the **top 1,200** per sport as a view, current-eligible share ≈ **200** (each at −5). The ambiguity then becomes a filter change, not a re-rating.

**Evidence.** NFL draft consumes 32 teams × 26 slots = **832 picks**. Current 1,200 pool leaves ~370 undrafted every year. Pool size sets depth left over, not draft volume. If 1,200 were combined, a design assuming per-sport over-rates by 2×; composition (current-eligible share, per-position spread) is unstated.

---

## F4 — Peak vs career: prime ratings + versioned prime/age curve

**Question.** Rate at peak as `ovr`, plus a versioned engine-level prime/age curve?

**Recommended default: YES, two layers.**
1. **Data layer (no engine change):** record `ovr` = prime (best multi-year window); store `career_years` and `prime_seasons` metadata; keep source rating and mode adjustment in separate versioned fields. Cost of being wrong: number re-derivable from source.
2. **Engine layer:** add an explicit **prime/age curve** to the sport profile — same pattern as `MC`, `PLAN_K`, `SEASON_RECORD_CAPS`, all versioned model constants. Apply in the season engine, not in data.

**Evidence.** The simulation has **no time dimension** for a player. `inj` is used in **0 places**; `str` in **0 player-record places**; `spd`/`agi`/`cod`/`awr` each used in exactly one function (`returnerRating`, v20:2581), all decorative except returners. No age curve, prime, or decline anywhere. Every player rated the same every season. Two of the four candidate definitions (peak season, career value) cannot be expressed by the current engine at all. Until the curve exists, ship all-time mode with UI caveat ("every player is at his prime every season") and a `MC_ALLTIME`-style parameter naming it.

---

## F5 — NBA roster arithmetic: how many active players per club?

**Question.** How many players active per club — 15 (→ 450 → 15 rounds), 13 (→ 390 → 13 rounds), 12 (→ 360 → 12 rounds)?

**Recommended default: 15 active + 3 development = 450 slots, 15 rounds**, reusing the NFL draft loop with a new profile.

**Evidence.** NFL arithmetic is structurally forced: `TOTAL_ROUNDS = ROSTER_SLOTS.length` (v20:892), 32 × 26 = **832 picks**. NBA: 30 × 15 = **450 = 15 rounds × 30 teams** — same shape. A 2-round draft cannot fill a 15-man roster — that is the only real argument against a draft, and it dissolves once roster size is chosen. Once answered, "draft roster then assign starting five?" becomes a rotation question (F6), not a product question.

---

## F6 — NBA rotations: minutes-weighted role tiers (gives inj a real job)

**Question.** Adopt minutes-weighted role tiers for NBA matchup model?

**Recommended default: YES.** Role tiers (starter / sixth / rotation / development) with a minutes distribution per team; matchup model takes a **minutes-weighted** unit rating, not "starting five + bench." Availability feeds minutes weights — this gives `inj` (inert today) a real job. Engine proposes the lineup, user may override it, `optimalLineup` (Hungarian) resolves conflicts — same precedent as football: advisory for user, binding for CPU.

**Evidence.** Football engine has 9 unit ratings and `teamRatings(slotmap)` computes them from a depth chart; `optimalLineup` picks best legal assignment. No "bench" scalar in football because defence comes from who is actually on the field. NBA's equivalent of "second unit" is a rotation, not a scalar. A starting-five + bench composite makes star injuries not bite, bench quality nearly inert, deep vs shallow roster indistinguishable — star-and-role-freeze season. Contradicts package's own principle ("do not force football rules onto basketball").

---

## After Owner records F1-F6

1. Re-compute M-number sequence (M-76+ free per chronicle); update `COUNCIL-BULLETIN.md` next-free note if needed.
2. The priority order (NFL all-time → NBA current → NBA all-time → other sports) is clear if defaults are accepted. Declined defaults each introduce a cost to weigh against expansion.
3. No sport engine or data shard should be built until F1-F6 are recorded.

---

**My availability:** on duty, OR lane `_agents/or/`, ID block S-1800–1899. Product files: read-only per R5/AGENTS.md.