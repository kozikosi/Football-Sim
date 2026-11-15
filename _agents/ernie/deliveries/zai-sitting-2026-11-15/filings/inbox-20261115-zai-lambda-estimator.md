SPEAKER: zai | ROLE: High Councillor · Executor | TASK: the λ estimator — the Lab's second half: the pooled design, the per-cell fold-density receipt, the resolvability verdict | DATE: 2026-11-15
FOR: the Architect (Claude, L1) · the λ Lab (P-345/P-347) · the council
STATUS: R-6 accepts the design (one scale, varying by context, inside the band, each rule beating fixed-λ on held-out seasons) — so this is the open work. **No fitting code was written or run this sitting** (§6b.4); what ships is the estimator design, a per-cell DATA receipt, and the power arithmetic, each labelled.
RECEIPTS: `measurements/join-cell-census.txt` (per-cell fold densities over the shipped join, computed this sitting) · the prompt's §2.4 arithmetic (window 0.0130, target SE 0.0046)

## 0 · What λ is and what the record holds (one paragraph)

λ is the dial's conditioning parameter: 96 of 97 cross-role rows are satisfiable by ONE λ in **[0.3902, 0.4032)** — a window **0.0130 wide** — with `C>OG` structural. A context shift the size of the whole window is detectable at 80% power only if a per-cell λ̂ carries **SE ≈ 0.0046** (0.0130/2.8). The settled Lab's per-slice bootstrap CIs have, in every filed run to date, been **wider than the whole window** — REPORTED across the P-345 filings. **No filed Lab output (no λ̂, no CI) exists in THIS delivery tree**, so where this note says UNKNOWN it means exactly that: the outputs live in the P-345 record, not in my possession; re-deriving them would mean fitting code, which this sitting does not run.

## 1 · Deliverable 1 — the pooled / partially-pooled estimator (design, no code)

**Estimator.** Estimate λ(context) as λ_c = λ₀ + δ_c, with λ₀ shared and each cell's deviation δ_c shrunk toward 0 by the precision weight w_c = n_c / (n_c + s²/τ²): big cells keep their own λ̂, thin cells fall back to λ₀ (empirical-Bayes shrinkage; τ² from method-of-moments or held-out seasons, never fit and judged on the same rows). The reportable object per cell is the shrunk λ̂_c with its posterior interval; the reportable object for the PRODUCT is the paired test each rule must win: rule-with-λ(context) beats fixed-λ on held-out seasons (GLM's rule, R-6's wording).

**The pooling assumption (stated, so it can be attacked).** (i) Within-cell sampling SD of λ̂ is COMMON across cells (one s, estimated on the pooled data — this is where the SE drops: s is estimated on 2,639 games, not 818); (ii) cells are exchangeable — δ_c are draws from one τ² — **except the two-regime split: POST never pools with REG** (axis-table row 25 is the frame; the census below is why: 122 games cannot carry a variance component).

**The cost (named, not hidden).** (a) Shrinkage is CONSERVATIVE in exactly the cells the hypothesis cares about: a real shift in a small cell is pulled toward λ₀ and can land inside the band — the estimator prefers fixed-λ unless the shift is strong, which is the safe failure direction for the product but a real loss of power per cell. (b) τ² costs a variance component per family and is unstable below ~5 cells. (c) If cells are NOT exchangeable (a systematic REG-vs-POST regime difference), the pooled λ₀ is a blend, not a truth — hence the regime split in (ii).

## 2 · Deliverable 2 — the per-cell table (the census is VERIFIED; the CIs are UNKNOWN where the Lab outputs are not in my possession)

Fold densities from `measurements/join-cell-census.txt` (the shipped join, 253,107 rows / 2,761 games, computed this sitting; POST cross-checks the join receipt's 11,196 exactly):

| cell | player-games | games | k vs one season (≈276 g) | per-cell λ̂ CI from shipped Lab outputs | resolvable iff filed half-width ≤ | verdict |
|---|---|---|---|---|---|---|
| REG pooled | 241,911 | 2,639 | 9.56× (SE ÷ 3.09) | UNKNOWN (not in this tree; REPORTED union: wider than the window) | 0.0144 | **YES, with margin** (4.9× the minimum size) |
| REG \| one-score | 74,758 | 818 | 2.96× (÷ 1.72) | UNKNOWN (same union) | 0.0080 | MARGINAL |
| REG \| mid | 97,288 | 1,064 | 3.85× (÷ 1.96) | UNKNOWN (same union) | 0.0091 | MARGINAL |
| REG \| blowout | 69,865 | 757 | 2.74× (÷ 1.66) | UNKNOWN (same union) | 0.0077 | MARGINAL |
| POST pooled | 11,196 | 122 | 0.44× (÷ 0.66) | UNKNOWN (same union) | 0.0031 | **NO — never at this volume** |
| POST \| one-score | 3,311 | 36 | 0.13× (÷ 0.36) | UNKNOWN (same union) | — | NO |

The "resolvable iff" column: the estimator's per-cell half-width after pooling is h/√k, where h is the settled Lab's filed half-width at a one-season slice; the record admits only h ≥ 0.0065 (CI wider than the 0.0130 window) and its true value is UNKNOWN. So the table's verdicts are CONDITIONAL on h: REG-pooled resolves for any h ≤ 0.0144 (the record guarantees h is at least 0.0065 but not that it is under 0.0144); the composite REG cells resolve only if h ∈ [0.0065, 0.0077–0.0091]; POST resolves for no admitted h. **This is the table that turns the INFERRED arithmetic into a receipt where the data allows and says UNKNOWN where only the Lab's own outputs can.**

## 3 · Deliverable 3 — the fold density at which λ(context) becomes resolvable

**The minimum resolvable cell is ≈ 541 games** (n* = 276·(0.0065/0.0046)² at the record's floor h; INFERRED — it moves linearly with h² if the true filed CIs were wider). Against the census: the REG family offers 2,639 games pooled (4.9× n* — resolves for any admitted h up to 1.09× the window width), the three REG margin cells offer 757–1,064 (1.4–2.0× n* — resolve only for h in the bottom sliver of the admitted range), **POST offers 122 games — 0.23× n* — so per-cell λ(context) in POST is never resolvable at this data volume, and that is a result, not a failure**: the POST cell rides the pooled REG λ₀ (fixed-λ there) until more postseason data exists, which the two-regime frame already treats as its own calibration pair (axis row 14's margin-noise σ by game type).

**The plain sentence:** at this data volume, λ(context) is resolvable where the fold density clears ≈ 541 games — the REG family does (pooled, with margin), its margin cells only marginally, and POST never; the pooled estimator is what moves REG across the line, and the deciding receipt is the estimator run itself, which produces the per-cell bootstrap CIs this table currently holds as UNKNOWN.

## 4 · The two join caveats (recorded while here; both now have receipts)

1. **Coverage is column-dependent.** `offense_pct` / `defense_pct` / `st_pct` are **100%** filled (253,107/253,107, recomputed this sitting); the RAW play-count columns are NOT — `n_plays_on_field` 99.9%, `n_off_plays` **21.9%** (55,362), `n_def_plays` **18.9%** (47,905). The join receipt's per-season "play-counts attached 100.0%" counted rows with ANY play-count column non-empty; a dated clarifying line is appended to `measurements/player-game-join-receipt.txt` and the census is the per-column receipt. An estimator conditioning on raw play counts must carry that coverage.
2. **The identity bridge is the one place a season could silently drop.** 2016–22 key on `nfl_id`, 2023–25 on `gsis_id`, bridged through `players.parquet`. The census's per-season rows (23,862–26,615, uniform, no season below 23,000) are the drop-detector: **no season dropped**.

LABELS: VERIFIED — the census (per-cell n's, fill rates, per-season rows, POST=11,196 cross-check). INFERRED — the power arithmetic (SE ∝ 1/√n; the shrinkage weight; n* = 541; the conditional verdicts), the pooling assumption and its costs. UNKNOWN — every filed λ̂ and CI (not in this tree; the REPORTED union "wider than the window" is the only admitted fact). NOT DONE BY DESIGN — no fitting code; the estimator run is the next receipt.
