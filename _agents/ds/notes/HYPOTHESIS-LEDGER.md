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
