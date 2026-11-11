# Flex rebuild, verified — D table → 728b2c53 → the 105-rule table (items 3 + 7)

Seat: DS · 2026-11-09 · branch `council/ds` · no product file, no protected constant, no shared tool edited.
Labels: **VERIFIED** (command + output in this file) · **REPORTED** (someone else's claim, not re-run) ·
**INFERRED** (reasoned, not run) · **UNKNOWN**.

The prompt said `flexrebuild.mjs` does not exist and the Architect's manual rebuild timed out. It now exists,
it reproduces both tables the Architect landed **rule for rule**, and it generates the 105-rule table for the
Owner's items 3 and 7 with the Owner's own expected counts. The rebuild is a script, not an edit that can time out.

---

## 1. What was built

| File | What it is | Receipt |
|---|---|---|
| `tools/mathlab/flexrebuild.mjs` | deterministic generator: base table + D values + Owner spec → `flex.json`, `flex.ts`, `report.md`. Modes `round` (D → tier → overrides) and `apply` (change an existing table). | `--selftest` **PASS 36/36** |
| `tools/mathlab/flexassert.mjs` | **independent** validator (does not import the generator): structure, tiers, QB-only-FS, removals, overrides, rounding, base integrity, banned list, cross-unit zero report. | `--selftest` **PASS 14/14** |
| `tools/mathlab/flex-spec-owner-2026-11-09.json` | the Owner's D-pick decision list (7 removals, 53 overrides, rounding rule) as data. | used in stage 1 |
| `tools/mathlab/flex-spec-owner-2026-11-09-corrected.json` | the same + the 9 corrections that landed as `728b2c53`. | used in stage 2 |
| `tools/mathlab/flex-spec-owner-2026-11-09-items3-7.json` | items 3 and 7: TE>DIME 12, TE>FS 12, ILB>FS 12, OLB>FS 12, six SAM rules. | stage 3 |
| `tools/mathlab/flex-2026-11-08.json` | the 8 Nov base table (104 rules), copied from the Architect's branch. sha256 `4d03772cba4e8f101ecf986d3bd27afd8db422ce4550966c094de2efd615d3fd`. | input |
| `tools/mathlab/flex-2026-11-09-728.json` | the landed `728b2c53` table (97 rules), copied from the Architect's branch. | input |
| `tools/mathlab/results/thetaprice-2026-11-09.md` | the D@90 values (from `3ed03627`). sha256 `72dae5bcc07ce15a35d2b69de5e56f62e9c956bc2269df0ea412940921e36f3e`. | input |

Everything is read-only against the product and the engine. The generated files are proposals in the lane.

---

## 2. The chain, verified end to end

**VERIFIED** — three stages, each generated from the previous one's inputs and diffed rule by rule:

| Stage | Owner input | Rules | 0 / 2 / 6 / 12 | Diff vs the Architect's table |
|---|---|---|---|---|
| 1. D rebuild (`35ce4e98`) | D@90, θ=1.0, cutoffs 1/4/9, first override list | **97** | **30 / 16 / 32 / 19** | **0 diffs** (97/97 rules equal) |
| 2. + 9 corrections (`728b2c53`) | stage 1 + OG>C 2; DT>C, DT>OG, EDGE>ILB, EDGE>C, EDGE>OG, EDGE>OT, EDGE>RB, EDGE>NICKEL = 6 | **97** | **23 / 15 / 40 / 19** | **0 diffs** (97/97 rules equal) |
| 3. + items 3 and 7 (not built) | stage 2 + TE>DIME 12, TE>FS 12, ILB>FS 12, OLB>FS 12, SAM rules | **105** | **26 / 16 / 40 / 23** | Owner's own expected counts: **23 / 40 / 16 / 26, 105** — exact |

Commands (run from the repo root):

```sh
node tools/mathlab/flexrebuild.mjs --spec=tools/mathlab/flex-spec-owner-2026-11-09.json \
  --out=_agents/ds/deliveries/flex-rebuild-2026-11-09            # stage 1
node tools/mathlab/flexrebuild.mjs --spec=tools/mathlab/flex-spec-owner-2026-11-09-corrected.json \
  --out=_agents/ds/deliveries/flex-rebuild-2026-11-09-corrected  # stage 2
node tools/mathlab/flexrebuild.mjs --table=tools/mathlab/flex-2026-11-09-728.json \
  --spec=tools/mathlab/flex-spec-owner-2026-11-09-items3-7.json --mode=apply \
  --out=_agents/ds/deliveries/flex-rebuild-2026-11-09-items3-7   # stage 3
node tools/mathlab/flexassert.mjs --table=_agents/ds/deliveries/flex-rebuild-2026-11-09-corrected/flex.json \
  --spec=tools/mathlab/flex-spec-owner-2026-11-09-corrected.json --base=tools/mathlab/flex-2026-11-08.json
```

Stage 2 output: `FLEXASSERT OK 97 rules, 23 at 0, 7 banned, 97 checked, 37 rounding-checked`.
Stage 3 output: `FLEXASSERT OK 105 rules, 26 at 0, 0 banned, 105 checked, 0 rounding-checked`.
The independent checker agrees with the generator on every rule. Two implementations, one answer.

**Determinism:** two runs of the same inputs produce byte-identical `flex.json` (selftest 6). No timestamps,
no environment paths. Input hashes are written into `_source`, so a table names the exact inputs that made it.

---

## 3. Findings

### D-DS-001 — the WILL/C weight bump does NOT move D (VERIFIED; the prompt's explanation is false)

The Owner's relay says raising WILL 150→200 and C 150→200 "raises its slope, which brings D for OLB>ILB and
OLB>SS down to ~6.7, so the math agrees with -6". It does not. `SLOTS[].weight` is the draft/lineup valuation
input; the matchup model reads `RATING_SPECS` composition weights, not `SLOTS[].weight`.

Receipt (latest engine, `728b2c53`, on a scratch copy):

- bump `{ id: 'C', weight: 150 }` → 200 and `{ id: 'WILL', weight: 150 }` → 200 in `slots.ts`;
- rerun `tools/mathlab/thetaprice.mjs` on the Architect's branch (`3ed03627`; the script is not in
  `council/ds`, so the receipt was run on a scratch copy);
- result: **rules 97, changed 0** — every D value identical to 4 decimal places.
- `git diff 3ed03627 728b2c53 -- colors/.../slots.ts specs.ts value.ts matchup.ts` is empty, so the same holds
  for the engine the prompt described.

Consequence: `OLB>ILB 6` and `OLB>SS 6` are **Owner overrides**, not post-bump arithmetic (D stays 10.05 and
9.99 → 12). That is fine — the Owner's list supersedes theta — but the record should say "override", not
"the math agrees". The spec file carries this correction in `engine_changes.finding`.

### D-DS-002 — "removed" is not "illegal": a removed -12 rule becomes a legal -8 (VERIFIED)

The Owner said delete the rule, do not set it to 0. The engine's `fit()` gives every unlisted non-QB rule
`EMERGENCY_PENALTY = 8` and `legal: true`. Receipt: with `FB>EDGE` deleted from `flex.ts`,

```
FB>EDGE {"penalty":8,"emergency":true,"legal":true}
FB>DT   {"penalty":8,"emergency":true,"legal":true}
QB>WR   {"penalty":8,"emergency":true,"legal":false}
```

So the seven removals **lower** the price of the move from -12 to -8; they do not forbid it. P-312 test (d)
expects the draft engine to reject the placement ("it should not be allowed"). Two readings are possible:

1. **Removal = not allowed** (the P-312 test's reading, and the plain meaning of "delete the rule"): `fit()` must
   check a banned set before the emergency fallback and return `legal: false`. The generated `flex.ts` emits
   `FLEX_BANNED` and `BANNED_ARE_ILLEGAL = true` for exactly this.
2. **Removal = unlisted** (the current engine's reading): the move stays legal at the -8 fallback, and the only
   change is that the table no longer documents it.

The Owner should say which one he means; the two produce different draft behaviour. I did not choose for him.
The generated file implements (1) because that is what "removed entirely" and P-312(d) say, and it is reversible
with one constant.

### D-DS-003 — four cross-unit free moves survive the corrections (INFERRED, measured from the table)

After the 9 corrections, the four remaining tier-0 rules that cross units (offence ↔ defence) are:

`DT>FB`, `EDGE>FB`, `ILB>FB`, `OLB>FB` (all defensive players to fullback, free).

The corrections fixed the more visible ones (`EDGE>OG/OT/RB/NICKEL` went 0 → 6). These four are football-impossible
free moves, and they are asymmetric: `FB>EDGE` was **removed as absurd** while `EDGE>FB` is **free**. The Owner
explicitly left the 30 zeros alone, so this is a question, not a patch: is a defensive lineman at fullback meant
to be free? If not, a small group (FB as a destination from DT/EDGE/ILB/OLB) is the cheapest fix. I did not change
the table.

A more consequential zero is **intra-unit**: `EDGE>DT` is 0, so an elite EDGE plays defensive tackle for free.
Measured on a stacked roster (three 95 EDGEs, three 55 TEs): the optimizer puts one 95 EDGE at **DT1 for 0** and
a 70 EDGE at **TE2 for 6** in both bases. The council prompt's summary says the Owner left `EDGE>OLB` and
`EDGE>DT` free; the verbatim answers file does not repeat it, so that provenance is **REPORTED**, not verified.
If it holds, this is intended — but it is the one zero that moves a starter, and `EDGE>TE 6` does produce a
visible edge-rusher-at-tight-end placement when the TE room is weak. P-312 findings, not table changes.

### D-DS-004 — items 3 + 7 need four engine edits and two test-helper edits (VERIFIED by running the engine)

The generated 105-rule `flex.ts` loads in the `728b2c53` engine and returns the Owner's values only after:

1. `slots.ts:8` — `Dest` gains `'SAM'`: `Role | 'NICKEL' | 'DIME' | 'DL5' | 'SAM'`;
2. `slots.ts:46` — the SAM slot's dest becomes `'SAM'` (today `'OLB'`);
3. `lineup.test.ts:134` — the `natural()` helper maps `s.dest === 'SAM'` to role `'OLB'` (SAM is a slot, not a
   role; the dataset has **0** SAM-role players, `players.ts:15` maps SAM → OLB);
4. `lineup.test.ts:36` — the rule count moves 97 → 105 and the pins move to the new table.

With those edits, the engine returns (VERIFIED, scratch copy of `728b2c53` + generated `flex.ts`):

```
TE>DIME 12   TE>FS 12   ILB>FS 12   OLB>FS 12
EDGE>SAM 0   ILB>SAM 0  OLB>SAM 0
SS>SAM 2     TE>SAM 6   FS>SAM 6
natural roster: 32 placements, 0 emergency, 0 bench, 0 non-zero penalties
```

### D-DS-005 — the Owner's WILL/C weight bump has NOT landed (VERIFIED)

P-311 lists `WILL 150→200`, `C 150→200`, `SAM` stays 100 as part of the rebuild. `slots.ts` still has
**150 / 150 / 100** on every Architect commit in the chain:

```
3ed03627  { id: 'C', weight: 150 }   { id: 'WILL', weight: 150 }   { id: 'SAM', weight: 100 }
35ce4e98  { id: 'C', weight: 150 }   { id: 'WILL', weight: 150 }   { id: 'SAM', weight: 100 }
728b2c53  { id: 'C', weight: 150 }   { id: 'WILL', weight: 150 }   { id: 'SAM', weight: 100 }
```

`WEIGHT` is derived from `SLOTS` (`slots.ts:58`), and the 3-4 base reads `WEIGHT.WILL` (`slots.ts:83`), so 150
is live in both bases. Consequence: the flex table is correct, but the draft/lineup valuation is still the
P-310 valuation; `flexeval` counts compared against a "new" baseline would be a comparison of two identical
weights. The Owner-approved change is two numbers (C and WILL → 200; SAM unchanged). It does not move D
(D-DS-001), but it does move draft value, which is the point of raising it.

### D-DS-006 — the counts in the Owner's note are exactly reproducible (VERIFIED)

35ce: 19/32/16/30. 728: 19/40/15/23. Target: 23/40/16/26. All three match the Owner's arithmetic and the
Architect's landed tables. The "30 rules at 0" in the Owner's note is the stage-1 table; after the 9 corrections
it is 23, and after items 3 + 7 it is 26. No rule is unaccounted for.

---

## 4. The 3-4 base (the prompt's open question)

Measured with the 105-rule table on a copy of `728b2c53` (natural roster: one player per slot role; SAM → OLB).
**VERIFIED**:

| Measure | 4-3 | 3-4 |
|---|---|---|
| sum of field-slot weights | 8575 | 8575 |
| natural-roster lineup value (weight × OVR units) | 600250 | 597550 |
| emergency fills / bench | 0 / 0 | 0 / 0 |
| flexes in the cheapest arrangement | none | FB slot ← DT (0), TE3 ← FB (6), DT2 ← OLB (6), SAM ← TE (6) |

The 3-4 is 2700 units cheaper with the same roster, and the optimizer's cheapest arrangement is the one the
prompt describes: a spare DT at FB for free, the natural FB at TE3 (-6), an OLB at DT2 (-6), a TE at SAM (-6).
The **2400** in the prompt is the same measure on the landed 728 table: there the arrangement is
TE3 (50) ← FB at 6, DT2 (300) ← SS at 6, DIME (50) ← TE at 6, FB ← DT free — exactly **6 × (50 + 300 + 50) =
2400**. Items 3 + 7 move it to **2700 = 6 × (50 + 300 + 100)** because `TE>DIME` rises to 12 while `TE>SAM`
is 6: the optimizer sends the TE to SAM (weight 100) and a DB takes DIME free. So "the 3-4 base total is 2400,
not 3600" is correct for `728b2c53`; the table the Owner's items 3 + 7 produce costs **2700**. The difference is
the item-7 SAM rule, not an error.

---

## 5. Answers to the relevant questions from the 9 Nov innovation list

These are the questions this work touches. The rest of the 60 are either answered by other seats or not
measurable from this tree; I did not pad them.

**Q5 — does salary-based DEFAULT_WEIGHTS resolve circularity or relocate it?**
Relocate, **INFERRED**. The salary table is a market price, not a wins measurement; fitting the engine to it
reproduces the market's consensus, and the market is itself built from the same positional consensus. The test
that would settle it is out-of-sample wins (2021–2024 anchor bands), not another fit.

**Q6 — new preset vs salary table as default.** Salary table **INFERRED** better as a prior; measured display
(`measuredDisplayWeights`) better as what the user sees. The engine already does this on `728b2c53`: the table
is the input, the display is measured. Do not let a display become an input again.

**Q7 — first validation experiment.** A pre-registered, held-out wins test on 2021–2024 (2020 excluded) with
paired seeds once the RNG lands. A result where the engine's team-strength ordering does not beat a
position-agnostic baseline (all players at their unit mean) would change my mind.

**Q19–Q25 (flex).** The D table answers the "what cap" question with a formula rather than a cap:
`D = (X−Y)(1 − slopeA/slopeB)`, rounded to 0/2/6/12. The Owner's overrides are the reality check. The remaining
disagreements are D-DS-003 (four free cross-unit moves) and D-DS-002 (removal semantics). CB>FS at 0 is correct
in the table and cheap in the engine; the hidden cost is coverage, which the DIME/coverage specs already carry,
so a separate penalty would double-count (**INFERRED**).

**Q26–Q27 (cross-validation).** There are now three implementations of the flex rebuild/validation:
the Architect's manual table (`35ce4e98`, `728b2c53`), my generator, and my independent checker. They agree on
97/97 and 105/105 rules. A fourth implementation is not needed; a **fifth table** is.

**Q31–Q33 (tool cwd).** `council.mjs` from `/tmp` is still a silent no-op on macOS (`/tmp` → `/private/tmp`);
run it from the worktree or `realpath` it. My tools resolve paths from `import.meta.url`, so they run from any
cwd — selftest run from `/` was not tried, but the only relative inputs are the defaults, which are absolute
from `HERE`. `run-all-tests.mjs` path issues are the same class: resolve the repo root from `import.meta.url`.

**Q39–Q40 (protected constant, manifest).** OR changed `DEFAULT_WEIGHTS`; that is the Owner's call, not a
council call. The manifest pins that changed are outside this tree; the check is `grep -rl 40233d6b` over
`tools/` and re-pin to the new hash in the same commit. My work pins no product hash.

**Q50–Q51 (RNG, flex magnitude).** The RNG injection point is `simulateGame`/`playGame`; the seeding contract
should be a single `makeRng(seed)` threaded through the season, so a replay is `(build, seed, roster)`.
The flex magnitude question is now answered by the table: the tiers are 0/2/6/12, and the QB is FS-only at 12.

**Q58–Q60 (DIME, REV 5 vs 4, raw-curve witness).** DIME is a situational modifier in the engine (15% coverage
share), not a first-class dataset position — this is already the design and is right. REV 4 is retired; the
12-tier table is the current one. The raw-curve witness becomes **more** important with a salary-based default,
not less: it is the only check that the display is measured rather than copied.

---

## 6. What the Architect should do (in order)

1. Read `_agents/ds/deliveries/flex-rebuild-2026-11-09-items3-7/{flex.json,flex.ts,report.md}`.
2. Decide D-DS-002 (removal = banned or unlisted). The generated `flex.ts` implements banned; a one-line constant
   reverts it.
3. Apply the Owner's weight bump (`slots.ts`: C 150→200, WILL 150→200, SAM stays 100 — D-DS-005). Do it
   before the draft scan, or the scan measures the old valuation.
4. Apply `slots.ts` edits 1–2 and `lineup.test.ts` edits 3–4 (D-DS-004), then run the flex tests.
5. Re-pin the test count (105) and the pins that move; the generated `report.md` lists every rule that moves.
6. Run the draft scan (`flexeval`) against the 105 table and compare with the P-310 baseline (fresh 626 /
   tune 1212). I did not run it: `flexeval.mjs` is **not in this tree** (it exists only on a branch that has the
   scan harness), so that check is **UNKNOWN** here.
7. Answer D-DS-003 (the four free cross-unit moves) — one line to the Owner.

## 7. Reproduce everything

```sh
# selftests
node tools/mathlab/flexrebuild.mjs --selftest          # PASS 36/36
node tools/mathlab/flexassert.mjs --selftest           # PASS 14/14

# stage 2 (the landed table) and its independent check
node tools/mathlab/flexrebuild.mjs --spec=tools/mathlab/flex-spec-owner-2026-11-09-corrected.json \
  --out=_agents/ds/deliveries/flex-rebuild-2026-11-09-corrected
node tools/mathlab/flexassert.mjs \
  --table=_agents/ds/deliveries/flex-rebuild-2026-11-09-corrected/flex.json \
  --spec=tools/mathlab/flex-spec-owner-2026-11-09-corrected.json --base=tools/mathlab/flex-2026-11-08.json

# stage 3 (the 105-rule target)
node tools/mathlab/flexrebuild.mjs --table=tools/mathlab/flex-2026-11-09-728.json \
  --spec=tools/mathlab/flex-spec-owner-2026-11-09-items3-7.json --mode=apply \
  --out=_agents/ds/deliveries/flex-rebuild-2026-11-09-items3-7
node tools/mathlab/flexassert.mjs \
  --table=_agents/ds/deliveries/flex-rebuild-2026-11-09-items3-7/flex.json \
  --spec=tools/mathlab/flex-spec-owner-2026-11-09-items3-7.json \
  --base=tools/mathlab/flex-2026-11-09-728.json --no-d
```

Expected: `FLEXREBUILD SELFTEST PASS 36/36`, `FLEXASSERT SELFTEST PASS 14/14`,
`FLEXASSERT OK 97 rules, 23 at 0, 7 banned`, `FLEXASSERT OK 105 rules, 26 at 0, 0 banned`.

Product file untouched: `Football-Sim-PreColors.html` sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`.
