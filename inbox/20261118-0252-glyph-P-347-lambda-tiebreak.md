SPEAKER: glyph | ROLE: council | TASK: P-347 lambda tie-break | DATE: 2026-11-18T02:52Z
FOR: P-347

# Scope
Reconciliation of two ratification recommendations: **0.40** (Pickle, tip-grounded convention, 89/97, maximin floor 87) vs **0.3967** (VL, midpoint of the band as originally measured). I did not author Pickle’s or VL’s λ ratifications; this is an independent re-run against the tip table.

# Tip table and scripts (VERIFIED, this session)
- **Table:** `tools/mathlab/flex.json` at `65673a009b29035e8dc993279be656f12aa40a13` (Architect tip `origin/architect/engine-and-seats` at re-run time carried same flex content; `ARCH_TIP=9a8076d6c83013acbf3a62847097e7b1bbc26f27`), sha256 `76c02c659880e218d85aac335b5489848cdc3903877b5d7836201fd1db846a6a`, 99 rows, histogram `{0:17, 2:17, 6:42, 12:23}`.
- **Scripts (read-only, from Pickle deliveries, run on Node host Python 3.15.1):**
  - `_agents/pickle/deliveries/p345-axis-comparison-2026-11-14/axis-bounds.py` + `inputs/merge_prototype.py` (V2 merged prototype)
  - `_agents/pickle/deliveries/p345-lambda-followup-2026-11-13/dial-feasibility.py` + same prototype
- Commands: `python3 axis-bounds.py merge_prototype.py flex-65673a00.json`, `python3 dial-feasibility.py merge_prototype.py flex-65673a00.json`, plus direct scoring of selected λ values.

# Re-run results (tip-grounded; every band/score claim below is for table sha `76c02c659880e218`)
**Feasibility on tip (VERIFIED):**
- `axis-bounds.py`: feasible window `[lo, hi) = [0.3902, 0.2195)` (empty, width -0.1707). Lower edge `WR>NICKEL` (owner 6, m 2.400 s 4.100 cap 0.000) requires `λ >= 0.3902`; upper edge `FB>TE` (owner 2, m 3.100 s 4.100 cap 2.274) requires `λ < 0.2195`. `0.39` sits 0.0002 below lower edge (fails `WR>NICKEL`); `0.40` satisfies every *reproducible* row but the global intersection is empty due to the contradictory bounds/unsatisfiable rows.
- `dial-feasibility.py`: 97 cross-role rows. Intersection over the 90 rows with feasible λ intervals: `[0.3902, 0.2195)` **EMPTY** — no single λ reproduces the table. **7 rows no λ in [0,1] can satisfy:** `OT>OG, EDGE>DT, EDGE>OLB, ILB>OLB, CB>FS, CB>SS` (infeasible, m/s/cap 0) and `C>OG` (guard-overshoots, owner 6, cap 12.50). Minimum dial count **2** (addresses 0.220, 1.000). Replication shows `FB>TE` owner 2: raw@0.20 3.92→tier 2, raw@0.40 4.74→tier 6; `WR>NICKEL` owner 6: raw@0.20 3.22→tier 2, raw@0.40 4.04→tier 6. Mean raw: 5.630@0.20, 6.390@0.40.

**Exact-tier surface / convention scores (VERIFIED):**
- `dial-feasibility.py` surface: λ 0.35→85/97, λ 0.40→89/97 (2 off by ≥2 tiers), λ 0.45→84/97.
- Direct scoring (same prototype/table): λ 0.39→88/97, λ 0.3902→88/97, λ 0.3967→89/97, λ 0.40→89/97, λ 0.4032→89/97.
- Robustness (maximin exact count over `λ0 ± δ`, from `dial-feasibility.py`): `±0.025` maximin λ 0.40 floor 87 (| λ 0.40 floor 87); `±0.050` maximin λ 0.39 floor 85 (| λ 0.40 floor 84); wider bands favor nearby lower λ0 but with lower floors overall. Tightest tolerance row `TE>SS` gives `dλ=0.0032` at 0.40.

# Reconciliation
- **VL’s 0.3967 (midpoint of `[0.3902, 0.4032)` as originally measured):** that band was measured against a **stale** flex table (REPORTED by Pickle: sha `0a26d7c2…`; current tip sha `76c02c659880e218` differs by 7 rule values including `FB>TE 6→2`). On tip sha `76c02c659880e218` the feasible set is **empty** and the lower/upper binding constraints contradict (`WR>NICKEL` needs ≥0.3902 while `FB>TE` needs <0.2195), with 6 additional tier-2 rows underivable at any λ under this prototype. Therefore **0.3967 does not survive as a tip-grounded “in-band midpoint” convention** — the interval it was midpoint of is not feasible on the current table. Numerically it scores 89/97 at tip, but it is not justified as “in-band” and it violates the `FB>TE` upper constraint regime (same as 0.40 at the disputed edge; the table cannot be satisfied by one λ).
- **Pickle’s 0.40 (tip-grounded, 89/97, maximin floor 87 at ±0.025):** **survives as the best-supported single-address convention on tip sha `76c02c659880e218`** among the tested/recommended candidates: matches peak exact count (89/97) and achieves the strongest reported maximin floor at the tight band (`±0.025`: floor 87). It is **not** an in-band fit (no band exists) and it does **not** resolve the 7 unsatisfiable/incompatible rows — it is a **specification/convention choice** on an empty-feasible-set table, and must be labeled as such.

# Recommendation (Owner-lockable)
- **Ship λ = 0.40 as a labelled convention for the dial value on the current flex table (sha `76c02c659880e218`, tip `65673a00` context), not as a measured/in-band optimum.** Record next to the constant: table sha, that the feasible set is empty on this table under V2 (7 rows unsatisfiable; `WR>NICKEL` vs `FB>TE` incompatible), score 89/97 and maximin floor 87 at ±0.025, and that 0.3967 was the midpoint of a stale-table band (sha `0a26d7c2…`, REPORTED) and is not tip-grounded as in-band.
- **Do not adopt 0.3967 as “in-band midpoint” on tip.** If the Owner prefers a different convention, it should be chosen against the same tip table sha and stated as convention.
- **Caveats (REPORTED/INFERRED, consistent with prior filings):** estimator SE is far too coarse to measure λ in-band; resolving the 6 zero-ability/coverage rows and formula coverage is Architect/design work (not a λ pick). Any future band/value claim must include `flex.json` sha256 and pin.

# Blocked / Open / Next
- **BLOCKED:** none for this tie-break.
- **OPEN (Owner):** lock λ convention (recommended 0.40, labeled as above) and downstream default/label decisions.
- **NEXT:** if the flex table or V2 prototype changes, re-run `axis-bounds.py`/`dial-feasibility.py` and restate λ with the new table sha before wiring.
