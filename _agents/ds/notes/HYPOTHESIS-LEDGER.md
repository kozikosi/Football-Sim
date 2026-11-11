# DS hypothesis ledger

Pre-registered before the experiment; result recorded after. One entry per hypothesis. A hypothesis is
**OPEN** until a named command produces a result; a result is **SUPPORTED**, **REFUTED** or **INCONCLUSIVE**.
The label is not a vote: the Architect and a Verifier decide what enters the build (AGENTS §5, §9).

This file is append-only. Do not rewrite an entry; add a new one and cross-reference.

---

## H-DS-001 — The unfitted old engine carries a secondary and kicker premium

- **Pre-registered:** 2026-11-08, before running `bias-audit.mjs` on the Pre-Colors sweep.
- **Question:** Does the Pre-Colors revealed value curve overvalue the secondary and kicker relative to the
  Owner's salary table?
- **Prediction:** secondary mean residual > +50 (QB=1000 scale); CB3 > +150; K > +100.
- **Metric:** mean of `measured − salary` by unit, on the 26 shared Pre-Colors slots, normalised to QB=1000.
- **Threshold:** all three predictions must hold; otherwise REFUTED.
- **Test:** `node _agents/ds/tools/bias-audit.mjs --config _agents/ds/tools/fixtures/engine-bias-audit.json`
  (pair `precolors` / `salary`).
- **Result (2026-11-08):** secondary **+147.0** (CB1 +167.8, CB2 +213.3, CB3 +269.9, SS +48.0, FS +36.1);
  CB3 **+269.9**; K **+234.0**. All three hold.
- **Verdict:** **SUPPORTED**.
- **Caveat:** the premium is not a literal copy of the Owner's personal table. The personal table's absolute
  values are much further from the old engine (MAE 296.6 vs 107.5 for salary), and the rank correlations are
  close (0.708 vs 0.682). CB3 and K sit above *both* tables, which points at the mechanics, not the table.
  The cause is not identified by this test; H-DS-003 is the next step.
- **Receipt:** the fixture + the command above; the output is quoted in
  `_agents/ds/notes/ENGINE-BIAS-AUDIT-2026-11-08.md` §2.2.

---

## H-DS-002 — The Colors match to salary is a fit, not a validation

- **Pre-registered:** 2026-11-08, before running the Colors comparison.
- **Question:** Is the ±50 match in `matchup.test.ts` independent evidence for the salary table, or a fit
  residual?
- **Prediction:** Colors vs salary MAE < 15, rho > 0.95, top-5 5/5; Pre-Colors vs salary MAE > 50,
  rho < 0.8.
- **Metric:** MAE, Spearman rho, top-5 overlap on the normalised curves.
- **Threshold:** both sides must hold; otherwise INCONCLUSIVE.
- **Test:** the same `bias-audit.mjs` fixture, pairs `colors` / `salary` and `precolors` / `salary`.
- **Result (2026-11-08):** Colors **MAE 7.1, rho 0.992, top-5 5/5, zero inversions**; Pre-Colors **MAE 107.5,
  rho 0.682, top-5 3/5**. Both sides hold.
- **Verdict:** **SUPPORTED**.
- **Caveat:** the fit path is explicit: `tools/mathlab/calibrate-weights.mjs` fits to
  `salary-reference.json`, and `colors/src/sports/nfl/engine/value.ts` defines
  `derivedWeights = slotWins20 / 0.00254`. The test therefore asks whether the fit converged, not whether
  the target is true. The `matchup.test.ts` golden parity test is a separate mechanics check.
- **Receipt:** `_agents/ds/notes/ENGINE-BIAS-AUDIT-2026-11-08.md` §2.3 and §7.

---

## H-DS-003 — The data anchor will put CB3 above 100 and K below 284 (OPEN)

- **Pre-registered:** 2026-11-08, before any nflverse snap/play-by-play fetch.
- **Question:** When the engine is measured against real football outcomes rather than a table, where do
  CB3 (nickel) and K land?
- **Prediction:** data-anchor CB3 **> 100** (plausible range 200–350) and K **< 284** (plausible range
  30–100); the old engine's secondary residual shrinks but does not vanish.
- **Metric:** `value(slot) = snaps × (EPA/play − replacement EPA/play) × points/EPA × wins/point`,
  normalised to QB=1000; fit 2015–2021, test 2022–2024; bootstrap CI per slot.
- **Threshold:** if data CB3 is within ±50 of 100, the salary table is vindicated on CB3; if it is above
  200, the old engine was closer and the fit overcorrected. For K, if data K is below 100, the salary/fit
  value (50) is defensible; if above 200, it is not.
- **Test:** `node _agents/ds/tools/anchor-compare.mjs --config <real-anchor>.json`.
- **Result:** none yet. **OPEN** — needs nflverse snap counts and play-by-play; the defensive attribution is
  the hard part and must be reported as a band, not a point.
- **What would change my mind:** a data anchor that reproduces the salary table within ±50 on every slot
  would make the salary table the best available default and the old engine's tilt a genuine error. A data
  anchor that reproduces the old engine's secondary would make the fit a mistake.

---

## Cross-references

- H-DS-001/002 are the evidence behind `_agents/ds/notes/ENGINE-BIAS-AUDIT-2026-11-08.md`.
- H-DS-003 is the next experiment; it is not a result and must not be cited as one.
- Related: P-284 (Owner salary weights), P-255 (methodology), P-250 (calibration bands), D-007 (forensic
  correction, REPORTED), R-001 (Owner permission to abandon the old tables).

---

## H-DS-004 — Raising the WILL and C slot weights changes the flex D values (REFUTED)

- **Registered:** 2026-11-09, *retrospectively*. The question came from the Owner's relay ("the bump brings
  D for OLB>ILB and OLB>SS to ~6.7, so the math agrees with -6"); the run preceded this entry, so this is a
  recorded result, not a pre-registered confirmation. Treat it as weaker than H-DS-001.
- **Question:** Does `SLOTS[].weight` (WILL 150→200, C 150→200) feed `slotWinsPerOvr` and therefore the flex
  D table?
- **Prediction (the relay's):** D for OLB>ILB and OLB>SS falls from ~10 to ~6.7.
- **Metric:** number of the enumerable D values that move at all under the bump.
- **Threshold:** any change > 0.005 would support the relay; 0 refutes it.
- **Test:** scratch copy of `728b2c53`, `sed` the two weights in `slots.ts` to 200, rerun
  `node --experimental-strip-types ../tools/mathlab/thetaprice.mjs`; compare the D@90 columns.
- **Result (2026-11-09):** **rules 97, changed 0**. Every D identical to 4 dp; OLB>ILB stays 10.0487,
  OLB>SS stays 9.9917. `git diff 3ed03627 728b2c53 -- slots.ts specs.ts value.ts matchup.ts` is empty, so
  the result holds for the engine the relay described too.
- **Conclusion:** the slot weights are lineup/draft valuation inputs, not matchup inputs. `OLB>ILB 6` and
  `OLB>SS 6` are Owner overrides; the record must not attribute them to the weight bump.
- **What would change my mind:** a code path from `SLOTS[].weight` into `RATING_SPECS`/`matchupModel` that I
  missed; the empty diff and the 0/97 result make that unlikely, but a named call path would reopen it.

---

## H-DS-005 — A removed flex rule makes the placement illegal (REFUTED)

- **Registered:** 2026-11-09, *retrospectively* (same caveat as H-DS-004). The question is P-312 test (d) and
  the Owner's "delete the rule, do not set it to 0".
- **Question:** When a rule is deleted from `FLEX`, what does `fit()` return for that role/destination?
- **Prediction (P-312's):** deleted rules are rejected, or at least cost more than the -12 they replace.
- **Metric:** `fit(role, dest)` after deleting `FB>EDGE` from the typed table.
- **Threshold:** `legal:false`, or a penalty > 12, supports the prediction; a lower penalty refutes it.
- **Test:** scratch copy of the engine; delete `FB>EDGE` from `FLEX`; call `fit('FB','EDGE')`.
- **Result (2026-11-09):** `{"penalty":8,"emergency":true,"legal":true}` — the move is **cheaper** (8 < 12)
  and still legal. `EMERGENCY_PENALTY = 8` is the fallback for every unlisted non-QB rule.
- **Conclusion:** "removed" is not "banned" in the current engine. The generated `flex.ts` therefore emits
  `FLEX_BANNED` + `BANNED_ARE_ILLEGAL = true`; without that, the seven removals do not do what the P-312 test
  asserts. The Owner must choose between "removed = unlisted at -8" and "removed = illegal"; the two give
  different draft behaviour.
- **What would change my mind:** a `fit()` path that consults the rule list rather than the object keys — there
  is none in `728b2c53` (`fit` reads `FLEX[role][dest]`).

---

## H-DS-006 — A deterministic rebuild reproduces the Architect's landed flex tables exactly (SUPPORTED)

- **Registered:** 2026-11-09. Prediction made before the first run: if the decision list is complete and the
  rounding rule is the one used, the generator will match `35ce4e98` rule for rule.
- **Question:** Can `tools/mathlab/flexrebuild.mjs` reproduce the Architect's manual D rebuild from the same
  inputs, with no hand edits?
- **Metric:** number of differing rules between the generated table and the Architect's `flex.json`.
- **Threshold:** 0 differences on 97/97 rules supports; any difference refutes or exposes a missing decision.
- **Test:** `node tools/mathlab/flexrebuild.mjs --spec=tools/mathlab/flex-spec-owner-2026-11-09.json`
  and `...-corrected.json`; diff against `git show 35ce4e98:tools/mathlab/flex.json` and `728b2c53:...`.
- **Result (2026-11-09):** stage 1 **97 rules, 30/16/32/19, 0 diffs**; stage 2 **97 rules, 23/15/40/19,
  0 diffs**. The independent `flexassert.mjs` agrees: `OK 97 rules, 23 at 0, 7 banned, 97 checked`.
- **Conclusion:** the decision list + rounding rule are complete for both landed tables; a rebuild is
  reproducible and cannot time out. The remaining work is the Owner's items 3 and 7, which are additions, not
  a rebuild (H-DS-007).
- **What would change my mind:** a later Architect table with a rule that is in neither the D output nor the
  spec. So far there is none.

---

## H-DS-007 — Items 3 and 7 produce 105 rules with the Owner's counts (SUPPORTED)

- **Registered:** 2026-11-09, before generating the table. Prediction taken from the Owner's own arithmetic
  in `claude-reply-flex-answers-2026-11-09.md`: 23 at 12, 40 at 6, 16 at 2, 26 at 0 — 105 rules.
- **Question:** Do the four item-3 rules and the six item-7 SAM rules, applied to `728b2c53`, land on the
  Owner's expected counts, and do they work in the engine?
- **Metric:** rule count and tier histogram; `fit()` values for the ten rules; a natural-roster lineup.
- **Threshold:** 105 rules and an exact histogram match supports; any mismatch refutes an assumption in the
  item list.
- **Test:** `node tools/mathlab/flexrebuild.mjs --table=tools/mathlab/flex-2026-11-09-728.json \
  --spec=tools/mathlab/flex-spec-owner-2026-11-09-items3-7.json --mode=apply`, then `flexassert`, then load
  the generated `flex.ts` in a scratch copy of `728b2c53` with `Dest` + `SAM` and the SAM slot dest change.
- **Result (2026-11-09):** **105 rules, 26/16/40/23**; `FLEXASSERT OK 105 rules, 26 at 0, 0 banned,
  105 checked`; engine returns TE>DIME 12, TE>FS 12, ILB>FS 12, OLB>FS 12, EDGE>SAM 0, ILB>SAM 0,
  OLB>SAM 0, SS>SAM 2, TE>SAM 6, FS>SAM 6; natural roster 32 placements, 0 emergency, 0 non-zero penalties.
- **Conclusion:** the table is fully determined and buildable. It needs the four engine/test edits in
  `_agents/ds/notes/flex-rebuild-2026-11-09.md` §3 D-DS-004; without them the SAM rows are dead data.
- **What would change my mind:** an Owner ruling that SAM is not a destination (then the six rules go and the
  table is 99, not 105).

---

## Cross-references (added 2026-11-09)

- H-DS-004/005 are the evidence behind D-DS-001/002 in `_agents/ds/notes/flex-rebuild-2026-11-09.md`.
- H-DS-006/007 are the receipts for the two generated tables in `_agents/ds/deliveries/flex-rebuild-2026-11-09{,-corrected,-items3-7}/`.
- The three tables and their hashes are inputs, not results: `flex-2026-11-08.json` (sha256 `4d03772c…`),
  `flex-2026-11-09-728.json` (from `728b2c53`), `results/thetaprice-2026-11-09.md` (sha256 `72dae5bc…`).
