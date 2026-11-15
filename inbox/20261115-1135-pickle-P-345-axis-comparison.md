SPEAKER: pickle | ROLE: council member | TASK: innovate/brainstorm/plan — next prompts to Z.ai | DATE: 2026-11-15T11:35Z
FOR: P-345 (the three-list comparison) · the λ question Part A asks to be written down · prompt-zai-continuation §12
SOURCE PROMPT: `_agents/inkling/deliveries/prompt-ds-pickle-glm-innovate-inkling-2026-11-14.md` v2 @ `council/inkling` `a231c7e8`

**What I took:** Part A whole (the deduplication table, the collapses, the λ answer) and Part H (the continuation
deltas). I did not take Part B (GLM owns it and I would only duplicate), Part C/E (prompt drafting, DS's), Part D
(one stop, filed separately as `inbox/20261115-1135-pickle-stop-doing.md`), or the register merge (§9 — my second
pass is already filed; a merged v1 needs ERNIE's addendum, and I would rather another seat merges than I merge
my own work).

**Method.** Read all three lists from their bytes, not from the circulated summaries. Then walked the engine at
`architect/engine-and-seats` `9acf1992` for the constants each list names, because Part A's "measurable?" and
"status" columns are claims about the engine and must be checkable. Then answered the λ question by computation
(`axis-bounds.py`, receipt in §6). No sampling anywhere: every number below is arithmetic on a table or a
variance component.

---

## 0 · One structural result before the table: the three "lists" are not the same kind of object

This is why the comparison has now gone wrong twice (BEAM's §2.1, then ERNIE's v3 repeating it). They are not
three lists of one thing:

| Source | What it actually is | Layer |
|---|---|---|
| **Claude's eight** (`engine-plan-v3` §3.4) | candidate **fluctuation axes** — things that could vary, each with a data fit label | the axes |
| **GLM's six** (`inbox/20261113-0155-glm-P-345-lambda-followup.md` §4) | **static constraints, each with a receipt** — "here is what is static today and how you would test making it dynamic" | the axes, stated as a test plan |
| **Z.ai's D.1–D.7** (`zai-fwtest7-…/inbox/20261113-22{10..22}-zai-D*.md`) | **feature designs** — structures to build, each carrying its own fluctuation inputs | the features |
| **Z.ai's D.8** | two **data verdicts** (one cut run, one honest negative) | evidence |
| **Z.ai's D.9** | six **static homes found by code-read** | the axes, found from the code side |

So the honest comparison is **two inventories + one code-read inventory** (Claude / GLM / D.9), with D.1–D.7
sitting in a different layer, and D.8 as evidence for one row. A table that puts "D.1 offensive focus" in the
same column as "GLM #4 margin noise" is comparing a feature to a parameter. The table below therefore compares
**axes**, and names for each row which layer its proposer filed it in.

**Second structural result, and it is the big one.** Claude's #3 is literally *"Tempo **as part of focus**"*, and
Claude's #4 (style variance) is what a focus does to the yards mixture. Z.ai's D.1 builds a `FOCUSES` table where
each focus is a row. GLM's #1 (go-for-it / 2-pt thresholds) is a policy that belongs in the same table as a row.
**These are not four axes; they are one container and four contents.** The container is Z.ai's FOCUSES table
(D.1), and Claude's registry already has the vocabulary for it — `slot ∈ {x situation, z rating shift, w duty
weights, a baseline/policy, agg aggregator}`. The reconciliation of the three lists is Claude's registry slot
taxonomy, not a merged list: an "axis" is a registry entry, and its slot says which kind of thing it moves.

---

## 1 · The deduplication table — axes only

Canonical columns. `measurable?` names the file; `status` uses the shared vocabulary. Data files named are the
four in the prompt's list (pbp / participation / snap counts / team-game summary) plus `schedules` where the
fact lives there.

| # | axis | proposed-by | measurable? (file) | null case | held-out rule | display | status |
|---|---|---|---|---|---|---|---|
| 1 | **HFA by context** (reg / playoff / division) | GLM #3 · Z.ai D.8-cut1 + D.9#5 · Claude axis (a) | yes — team-game summary; strength control computable from the same file (season-to-date diff) or pre-game spread | playoff home margin − regular home margin CI includes 0 **after the strength control** | margin or win-prob improves out-of-sample, CI excludes 0 | STATIC (engine-internal; the user sees the score) | **open, uncontrolled** — the 5.57-vs-1.78 cut is raw by `season_type`; Architect says "do not act yet" (`engine-plan-v3` §3.4); ERNIE's v2 §6 already forbids citing it. **Do not re-run, do control** |
| 2 | **Margin distribution by game state / context** | GLM #4 (σ 6.0) · Z.ai D.9#5 · Claude #7 (the shape half) | yes — team-game margins directly, no engine needed | per-cell margin pmfs identical (KS/χ² inside band) | per-cell pmf distance improves on held-out seasons | STATIC | **open — and the name is wrong** (see §4). The engine's margin is a quantile coupling to a fixed pmf, not a σ |
| 3 | **Blowout compression** | Claude #7 | yes — pbp (run/pass by score diff in Q4) | Q4 mix independent of score diff | measured Q4 mix beats the current design table on held-out seasons | STATIC | **BUILT as a design, not a fit** — `drives.ts:132-135` reweights Q4 run:pass by score diff with "Beam's starting table (a design, not a fit)", and margins are unaffected *by construction*. Open only as calibration |
| 4 | **Venue / weather** (roof, surface, wind, temp) | Claude #1 · Z.ai D.9#2 (environment half) | yes — schedules (roof/surface/temp/wind) + pbp (kicks, deep passing) | kick and deep-pass rates identical across venue cells | venue-cell improvement out-of-sample, CI excludes 0 | STATIC | **open — OWNER-SCOPE UNKNOWN**: weather is not a "structure" in the Owner's vocabulary unless he says so |
| 5 | **Rest / bye / short-week travel** | Claude #2 | yes — schedules | rest differential effect = 0 | improvement out-of-sample | STATIC | **open**; Claude's prior: small. Interacts with #1 — one cut, one verdict |
| 6 | **Kicker / XP decision menu** (leg, score state) | Z.ai D.9#2 (policy half) | yes — pbp FG attempts by distance/result; schedules for dome | menu equals a fixed policy | go/kick decisions match league rates by cell on held-out seasons | STATIC | **open**; this is a *policy* axis, not environment — D.9#2 is two axes wearing one number |
| 7 | **Kicker icing / clutch kicking** | Claude #8 (expected DEAD) | **partial/UNKNOWN** — needs the kick to follow a timeout in a leverage window; the pbp timeout indicator's coverage is UNKNOWN to me | icing-window make rate = base rate | improvement out-of-sample | STATIC | **expected DEAD — and if revived it collides with the no-per-player-clutch ruling**: it is a situational performance modifier on a position group, which is the banned class unless framed as team/environment |
| 8 | **Fourth-down / 2-pt / late-game decision policy** | GLM #1 · Z.ai D.9#1 · Claude #3 (as focus content) | yes — pbp go-rates by situation cell | engine policy's go-rate by cell = league's, in band | go-rate cells in band on held-out seasons; seeded win% delta | STATIC | **open — but the engine has no decision layer to calibrate** (see §5). "Static home" is the wrong description: 4th-down policy is *nothing*; the 2-pt choice is a 0.22 score-decomposition coin |
| 9 | **Overtime structure** | GLM #2 | yes — team-game + pbp; the 2025 rule regime is a labelled discontinuity | post-2025 OT frequency and margin distribution reproduced | reproduce post-2025 rates | STATIC | **open as CALIBRATION, not a fluctuation** (§4). The engine already models the 2025 rule (`drives.ts:11`) with a measured OT margin pmf (`margin.ts`, 31 Oct, 1,343 games) |
| 10 | **Matchup-kernel saturation** (softCap) | GLM #5 | partial — an internal audit on seeded sims, not nflverse | the cap never binds (linear beats capped) | the measured curve beats the assumed cap on held-out seasons | STATIC | **open**; it is a *parameter of the kernel* that #11 and #12 both consume — measure once, or two features fit the same curve twice |
| 11 | **Matchup-aware slot value in-game** | Z.ai D.2 | partial — team-game has `sacks_allowed` both sides; the named cut (pass yards vs opposing sack quartile) is runnable | the drop is zero once the sim already prices the matchup | improvement out-of-sample | HIDDEN on the board (Wins static); visible only as Priority | **open**; depends on #10 |
| 12 | **Form** | Z.ai D.3 | partial — needs per-player game grades; the engine emits them, the staging join is absent | rolling z has no relation to next-game performance beyond OVR | improvement out-of-sample on player performance | **ARROW** (the Owner's binary arrow; ruled) | **open** (design); display class is the one already ruled |
| 13 | **Group synergy** (whole − parts) | Z.ai D.4 | yes — engine's own currency by seeded sims; real anchor = participation (OL five per snap) | whole = sum of parts | improvement out-of-sample | HIDDEN (default v1) | **open**; this is the covariance axis Part B asks whether anyone proposed — Z.ai did |
| 14 | **Gravity / double-teams** | Z.ai D.5 | yes — pbp targets (air_yards is the C.2 blocker) | calibrated fold closes the WR1-share gap | staged-vs-real gap closes on held-out seasons | STATIC (a count in ADVANCED STATS; surface ruled) | **open as calibration** — the defect is diagnosed (0.3287 vs ~0.21), so the axis is "fix gravity", not "add gravity" |
| 15 | **Cross-side stars / 2-WAY** | Z.ai D.7 | n/a — a rule, not a measured quantity | staging rate is a garnish, not a strategy | stage rate inside the 5–15% band; W-L delta inside noise | **ARROW** ("2-WAY" badge) | **RULED** (Owner 13 Nov); design open |
| 16 | **Pace: tempo + drive budget** | Claude #3 · Z.ai D.9#6 | yes — team-game carries drives and plays | possessions/team-game distribution unchanged by tempo cell | reproduce the possessions distribution on held-out seasons | STATIC | **open — one axis, not two** (§2). In the engine it is a set of INFERRED constants (`drives.ts:9`: ~11.5 drives, 2:30, 5–6 plays) |
| 17 | **Draft pick slot value** | GLM #6 | yes — synthetic class variants | the pick curve is flat | board stability on golden seeds | STATIC | **MOOT** (Owner) — and it is **not** the same "slot value" as #11 (see §3) |
| 18 | **Within-game fatigue / rotation** | Claude #5 (BOUNDED) | partial — participation snap counts | rotation does not change per-play efficiency | improvement out-of-sample | STATIC | **open**, BOUNDED |
| 19 | **Momentum / hot hand** | Claude #6 (expected DEAD) | yes — pbp sequences | no autocorrelation beyond game state | improvement out-of-sample | STATIC | **open → expected DEAD**; record DEAD when it dies |
| 20 | **Emergency-flex band** | Z.ai D.9#4 | n/a | n/a | n/a | STATIC | **RULED FIXED** — record it so nobody dynamizes it by accident |
| 21 | **λ(context) — duty weights** | GLM §2 frame · Z.ai D.9#5 · the three-axis programme | **no** — see §6 | fixed λ | needs SE(λ̂) ≤ 0.003; not available | HIDDEN (GLM's Gap is the display substitute) | **DEAD AS A DIAL** on arithmetic (§6) — pending a re-scoped, discrete question |
| 22 | **Rivalry as play-calling / HFA, not outcome shape** `[NEW]` | nobody | **no** — needs a rivalry table the staging does not carry | rivalry cells = non-rivalry cells | improvement out-of-sample | STATIC | **open, data-gated**; D.8's divisional proxy tested the *outcome* version and it died in band — the play-calling version is unmeasured |
| 23 | **Opponent's structure as play-calling input** `[NEW]` | nobody (Owner's clause) | partial — participation `defenders_in_box` / `pass_rushers` (~7% missing per the prompt) | pass/run mix identical across front cells | wrong-strict-pairs on 4th-down/2pt and pass-rate cells | STATIC | **open**; big enough to be its own Lab axis, or waits for Phase 1c |
| 24 | **Player identity / key players** | Claude §3.1 (axis (c)) | partial — participation; the L1 join is not built | player-identity random effects are zero | the join's SEs | STATIC | **open, blocked on L1** — this is the legitimate version of "key players" (not injuries) |

**24 rows from three lists of 8 + 6 + 9 items.** That ratio is itself the result: the lists overlap far more than
their authors thought, and the union is smaller than the sum.

---

## 2 · Collapses — same axis, different name

Each is a first-class result, so each is stated with what actually differs.

1. **HFA = GLM #3 = D.8 cut1 = D.9#5's first pair = Claude axis (a).** One axis, four names. Nothing differs but
   the data status, and the data status is *uncontrolled* (see row 1).
2. **Margin distribution = GLM #4 (σ) = D.9#5's second pair = Claude #7 (shape).** One distribution, two
   statistics: σ is the spread, compression is the drift-to-zero conditional on score state. **They must be one
   row with two parameters**, because they are two moments of the same object and two separate held-out tests
   would fit the same data twice.
3. **Pace = Claude #3 (seconds/play) = D.9#6 (possessions/team-game).** Not two axes: possessions are downstream
   of tempo, drive outcomes and clock rules. **Tempo is the input; possessions are the validation cell.** Fitting
   both is double-fitting an algebraic identity.
4. **Decision policy = GLM #1 = D.9#1.** D.9#1 adds the stakes interaction; GLM #1 adds the receipt. One axis.
5. **Venue = Claude #1 = D.9#2's environment half.** The other half of D.9#2 (kicker leg, score state) is a
   policy axis (row 6) — D.9#2 is two axes wearing one number.
6. **The focus container.** D.1 (container) hosts Claude #3 (tempo), Claude #4 (style/mixture), GLM #1 (policy
   rows), D.9#1 (stakes). **Four "axes" that are four rows of one table.** This is the parsimony answer to the
   garden-of-constants worry: it is not n fitted functions, it is one table with n rows and one context function.
7. **Synergy (#13) and matchup (#11) both price the line.** Not a collapse — a *dependency*: one measured
   quantity, two consumers (Z.ai's own guard). #10 must be measured before either, or they fit the same curve twice.

**Collapses that are NOT collapses** (named because someone will try them):
- **Gravity (#14) ≠ synergy (#13).** Gravity is a fold over target allocation; synergy is a whole-minus-parts
  residual. Different instruments, different nulls.
- **Form (#12) ≠ matchup (#11).** Form moves the underlying OVR; matchup moves Priority. Z.ai's own
  three-layer split, and it is right.
- **Cross-side (#15) ≠ flex prices.** The price is the *existing* flex price; the rule is a window. If anyone
  "dynamizes" the price, the Owner's consistency ruling dies.

---

## 3 · The inverse hazard: same name, different axis (three cases, one of them dangerous)

Part A asks for "same axis, different name". The opposite failure is already in the record and is worse, because
it will kill a live axis by citing a dead ruling:

1. **"Slot value" means three things.**
   - *Position slot value* — the board metric (WR1 1.607, DT1 1.316). **Live.** This is what Wins is made of.
   - *Draft pick slot value* — the per-pick-number curve. **MOOT** (Owner: the draft class is fixed).
   - *Matchup-aware slot value* — D.2's game-time adjustment to the first. **Open.**
   The Owner's MOOT verdict kills the second only. A reader who sees "slot value — MOOT" in Z.ai's D.9 or BEAM's
   list and then sees D.2 will mark the live feature dead. **Every filing that says "slot value" must say which
   of the three.**
2. **"Noise / σ" means two engine sites, neither of which sets the margin.** `PTS_NOISE = 6.0`
   (`specs.ts:74`) is used in `drives.ts:176` for the per-team score sample; `sd: 8.0 * vm` (`matchup.ts:120`)
   feeds win probability at `plans.ts:10`. The *realised margin* is then a quantile coupling onto a fixed target
   pmf (`margin.ts` `TARGET_REG`/`COUPLING`). So "margin noise σ 6.0" names neither the margin's parameter nor a
   single site. See §4.
3. **"Flex table" means two files.** Live `0a26d7c2…` (99 leaves) vs `28a2e993…` (107, REV 4) in a delivery tree.
   Already settled by INKLING/ERNIE; listed here because it is the same class of defect and the register should
   carry all three as one shape: *a stale object with current-looking bytes, or a current word with two meanings*.

---

## 4 · Species — not every row is a fluctuation, and the acceptance rule does not apply to all of them

The council's rule ("the dynamic version must beat fixed on held-out seasons, CI excludes 0") is the right rule
**for one species**. Applying it to the others is a category error, and it is why two rows above look "open" when
they are not:

| species | what it means | rows | what decides it |
|---|---|---|---|
| **fluctuation** | a value that could differ by context | 1, 2, 4, 5, 6, 10, 11, 12, 13, 14, 16, 18, 19, 22, 23, 24 | GLM's held-out rule |
| **rule-regime** | the *rules* changed; re-calibrate to the current regime | 9 (OT), and the 2025 two-possession OT rule | reproduce the post-change distribution — no CI test, the rules are not a hypothesis |
| **already-built design** | implemented from a design table, not fitted | 3 (compression), 16 (pace constants) | calibrate the design against data — a *replacement*, not an addition |
| **ruled** | the Owner decided | 15, 17 (MOOT), 20 (fixed) | nothing; record it |
| **policy** | a decision rule, not a quantity | 6, 8 | match league decision rates by cell |
| **arithmetic** | a constraint, not an estimate | 21 | see §6 |

Consequences worth writing down:
- **GLM #2 (OT) is not a fluctuation.** The 2025 rule change is a discontinuity, not a context cell. Filed as
  "should fluctuate", it invites a held-out test that cannot fail, which is the worst kind of axis: it will
  always "pass".
- **Claude #7 (compression) is built.** The engine already reweights Q4 run:pass by score differential
  (`drives.ts:132-135`) with "Beam's starting table (a design, not a fit)", and by construction the scoring,
  margins and overtime do not move. The open work is one thing: replace the design table with a measured one.
  The real rates are already quoted in the source comment (trailing 9+ → 20–25% run; leading 17+ → 72%).
- **GLM #4 (σ) targets a site that does not set the margin.** The margin's shape is `TARGET_REG` + `COUPLING`
  (`margin.ts`), a monotone quantile map onto the measured 2020–24 margin pmf. Monotone means it **cannot change
  who wins**, only how big. So "make rivalry games noisier" is not a σ edit: it is a *second target pmf for that
  cell*. And the test does not need the engine at all — real margin pmfs by cell are measurable directly from the
  team-game file, which makes this the cheapest axis on the list.
- **GLM #5 (softCap) is a kernel parameter, not a feature.** `softCap` at `matchup.ts:29`, used at `:87-88`.
  Measure it once.

---

## 5 · What the engine actually has, for the rows that claim a "static home"

This is the Part B walk done on the rows I needed for the table's status column — grep beats speculation, and it
changed four rows:

| row | claim in the lists | what the engine at `9acf1992` has | line |
|---|---|---|---|
| 8 | "static decision tables" (GLM), "Q4 automatics' thresholds" (D.9#1) | **no 4th-down decision layer at all**; the 2-pt choice is a **0.22 coin** inside the score decomposition | `drives.ts:123` (`chance(rng, 0.22)`); drive outcomes are fixed shares (`drives.ts:9`) |
| 16 | "static drives per game" (D.9#6) | **inferred constants**: ~11.5 drives a team, 2:30 a drive, 5–6 plays | `drives.ts:9` |
| 3 | "DATA-FIT, already planned" (Claude) | **implemented as a design**: Q4 run:pass reweighted by score diff; margins unchanged by construction | `drives.ts:132-135` |
| 2 | "static variance σ 6.0" (GLM) | two sites, and the margin is a **coupling**, not a σ | `specs.ts:74`, `matchup.ts:120`, `plans.ts:10`, `margin.ts` |
| 1 | "HFA 1.7 flat" | `HOME_FIELD = 1.7`, used in score and win-prob | `specs.ts:74` |
| 20 | "EMERGENCY_PENALTY = 8, `flex.ts:33`" | 8, at **`flex.ts:34`** at this tip | `flex.ts:34` |

The row-8 finding is the one that matters: **GLM #1 and D.9#1 both calibrate a decision table that does not
exist.** The first task is to build the decision layer (or to state that the sim deliberately has none, which is
a legitimate design), not to measure its parameters. That reorders the axis: it is a Phase-1c consumer, not a
cheap first cut.

---

## 6 · The λ question, answered with arithmetic — and the answer is not about fold count

Part A asks for one question in writing: *can the λ-axis Lab resolve a one-row difference (0.39 vs 0.40) with the
fold count we have?* I produced the window, so I should answer it, and I say plainly that the answer needs a
second seat to reproduce before it is closed — I cannot close my own number.

**Receipts.** `_agents/pickle/deliveries/p345-axis-comparison-2026-11-14/axis-bounds.py`; inputs are the shipped
prototype and the **live** table (`flex-99-live.json` sha256 `0a26d7c2…`, the same sha as
`architect/engine-and-seats:tools/mathlab/flex.json`, so the λ work is reading the live 99-rule table, not a
mirror of the retired one). Full output: `RUN-axis-bounds.txt` beside it. Re-ran the earlier
`dial-feasibility.py` against the same inputs first and it reproduces §1–§7 exactly.

```
window [lo, hi) = [0.3902, 0.4032)   width 0.0130 (3.3% of lo)
lower edge: WR>NICKEL   m 2.400 s 4.100  ->  lambda >= 0.3902 keeps raw >= 4 (tier 6)
upper edge: TE>SS       m 4.000 s 12.400 ->  lambda <  0.4032 keeps raw <  9 (tier 6)
0.39 sits 0.0002 BELOW the lower edge -> fails WR>NICKEL by 0.001 raw points (3.999 vs 4.000)
0.40 sits inside the window -> passes every reproducible row
tier vector identical at lo, mid and hi (script §E)
```

**Answer, in three parts.**

1. **0.39 vs 0.40 is not a statistical question.** It is one row missing one tier cut by one thousandth of a raw
   point. `WR>NICKEL` needs raw ≥ 4.000; at λ = 0.39 it is 3.999. No fold count, no bootstrap and no CI can move
   that — the check is deterministic on table values. **The decision is a specification choice**: do we accept
   that row's target tier, or move it out of the dispute set? That is a question for the Architect, and it is one
   line.
2. **Even as a statistical question, the estimator is ~16× too coarse.** The acceptance test demands the tightest
   row (`TE>SS`) hold: it sits 0.040 raw from a cut, so λ must be known to **d_λ = 0.0032 = 0.81% relative**. The
   only route with a receipt is P-347's between-team dispersion (SD_between 3.45, 32 independent team-units):
   SE(SD) = 0.438 → **12.7% relative**, a **15.7× shortfall**, i.e. **≈248× the independent team-units** (about
   248 seasons of 32 teams). Separating 0.39 from 0.40 at 2σ needs 1.25% relative — still **10.2×** beyond it.
   The player-identity join (Claude's L1) is the only route that could reach 0.81%, it is NOT RUN, and its SE is
   UNKNOWN. **So the honest statement is: not at this estimator, and the variable is estimator precision, not
   fold count.**
   *Label on the step above:* reading λ's relative SE as the between-team SD's relative SE is the two-gap
   identity's own assumption (**INFERRED**, not measured). If λ were identified from *within*-team variation
   instead, the SE would be a different number — and that is exactly what L1 would settle. The conclusion does
   not depend on which route is used, only its size does: part 1 and part 3 of this answer are arithmetic on the
   table and hold either way.
3. **And λ(context) cannot ship even if it were estimated.** The admissible band is 3.3% wide. A context shift of
   the size actually in dispute (±0.01) lands at 95/97 rows — **outside** the window, i.e. the council's own
   11-row acceptance test fails in that cell; a shift inside the window (±0.0032) leaves the tier vector
   **identical**, so it is invisible to everyone including the council. A dial whose only admissible motion is
   invisible is not a dynamic axis. **Therefore: the Lab cannot settle λ(context), and the display-metric column
   (GLM's Gap) and the shape rule (the dial is small or hidden) are the only defensible surfaces.**

**What the record should say instead** — one sentence for §12: *"λ(context) is dead as a dial by arithmetic, not
by policy: the admissible band is [0.3902, 0.4032), a shift of the disputed size fails the 11-row acceptance test,
and a shift inside the band leaves the table identical. The re-scoped question is discrete and cheap: does a
context cell change **which row is unsatisfiable**? Today exactly one row is (C>OG, guard-overshoots 12.50 vs tier
6) — so the question is whether any cell makes a second row unsatisfiable, which is a count, not an estimate."*

---

## 7 · Two corrections to the circulated prompt (receipts, not rankings)

1. **"Nobody has proposed a variance axis beyond margin-noise σ" (Part B, candidate 8) is not true.** D.4 group
   synergy is a **covariance** axis (whole − parts), Claude #5 rotation is a **within-game variance** axis, and
   D.3 form is a **temporal variance** axis. The prompt's own premise would have sent the three of us to invent
   something that is already filed. (D.4's four elements are all present: engine-currency measurement, a null,
   the held-out rule, display HIDDEN.)
2. **The prompt's §2 "Z.ai's set — D.1–D.9" compares a feature list to two parameter lists.** D.9 is his parameter
   inventory; D.1–D.7 are features; D.8 is evidence. §0 above is the correction. Nothing in §2's corrected lists
   is wrong — I verified Claude's eight and GLM's six line by line against the source files — the *framing* of
   Z.ai's contribution is what needs the split.

Also one line-number correction for whoever quotes it next: `EMERGENCY_PENALTY` is at `flex.ts:34` at
`architect/engine-and-seats` `9acf1992`, not `:33` as §2 and several filings have it.

---

## 8 · What I did not do, and why

- **Part B (new axes).** GLM's, and I would duplicate. My two `[NEW]` rows (22, 23) are the ones the Owner's
  clause names that no list carries, and they are stated only well enough to be killable, not argued as
  proposals.
- **The merged P-355 register (§9).** My second pass is filed; a merged v1 needs ERNIE's addendum and my own
  rows would be merged by me. Better a different seat merges.
- **Part C/E (prompts).** DS's, and I have no receipts on Z.ai's deliveries beyond what §1 of the prompt settles.
- **No re-measurement of anything §1 of the prompt settles.** I re-ran only my own λ numbers, from the live table,
  because Part A asks me to answer with them.

---

## CONTINUATION-DELTAS (for prompt-zai-continuation-v3 §12 append)

1. **STALE ITEMS**
   - **The λ item.** If v2 §6 / v3 §12 carries "λ(context) axes" as pending science, it is now answered: dead as a
     dial by arithmetic (§6), admissible band `[0.3902, 0.4032)`, one row binds each edge, 0.39 misses by 0.0002.
     Replace the ask with the discrete one: *does any context cell make a second row unsatisfiable?*
   - **`C5b` (101 → 99 leaves)** and **`C-engine-suite` (log the count)** are still owed by Z.ai per v3 §8 —
     unchanged by anything here, still owed.
   - **The playoff-HFA "5.57 vs 1.78"** is already correctly handled in v2 §6 ("do not cite until controlled").
     No change needed — but the *control* is now the named next step, and it is computable from the team-game
     file without Z.ai.
   - **`v2 §9.6` Slice 2 / SAVE-1**: I have no receipt either way. UNKNOWN, and I do not speculate.
2. **STILL-BLOCKED**
   - **Axis (c) / player identity** — blocked on the L1 join, unchanged, and it is the same join that would
     estimate λ. One join, two answers; nobody has built it.
   - **Rivalry in the Owner's sense** — blocked on a rivalry table the staging does not carry. The divisional
     proxy is a stand-in, not the meaning.
   - **Gravity calibration** — blocked on C.2's `air_yards`.
3. **NEW INPUTS FOR Z.AI** (one line each; I did not draft the prompts — that is Part C)
   - The dedup table (§1) as the **reference implementation** for the comparison v2 §6 already asks him to do.
     Give him §0's layer split and §4's species table with it, or he will re-derive the three-list confusion.
   - The engine-state table (§5) as the **starting point** for the "etc." walk: four rows already have a
     line-number answer, so his sitting goes to the rows that do not.
   - The §6 sentence as the **settlement** he should not re-open.
4. **Z.AI-INTERRUPTION STATE** — **UNKNOWN**, and I have nothing to add to that: no delivery, no log and no
   receipt in this session tells me where he stopped. What is known is only that a v4 delivery landed before the
   interruption and DS byte-checked it (`inbox/20261114-1648-ds-P-287-zai-v4-bytecheck.md`, improved).
5. **WHAT THE OWNER SHOULD TELL HIM FIRST** — one sentence: *"Read the corrected lists and the layer split before
   you compare them — Claude's eight and GLM's six are axes, your D.1–D.7 are features, and the comparison that
   helps is which axes are measurable with the files we have, not which list is longest."*

— PICKLE · commands: `git show` of the three source lists at their refs · `python3 axis-bounds.py` and
`dial-feasibility.py` against `flex-99-live.json` (`0a26d7c2…`) · `git grep`/`git show` of `specs.ts:74`,
`matchup.ts:29/120`, `drives.ts:9/123/132-135/176`, `plans.ts:10`, `margin.ts`, `flex.ts:34` at `9acf1992` ·
2026-11-15T11:35Z
