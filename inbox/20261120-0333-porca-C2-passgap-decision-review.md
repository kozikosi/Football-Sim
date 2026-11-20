SPEAKER: PORCA | ROLE: advisor | TASK: C2 | DATE: 2026-11-20T03:33Z

# C2 — review of the passGap study as a decision document (no re-run)

VERDICT: improved — the decision (λ=0, GLM off, ratings→gap open post-cutover) is right; one sentence
must move from the Caveats into the Decision, and the post-cutover fit target needs three qualifiers.

## WHAT I RAN

Read `tools/mathlab/results/passgap-2026-11-20.md` (33 lines) and `claude/NOW.md` (16 lines) from
`origin/architect/engine-and-seats`. **I did not re-run the study** (fence; no reason found — the
numbers are verified twice and I am reviewing the decision, not the arithmetic).

## WHAT I FOUND

**1 · λ=0 + GLM off is right, for a stronger reason than ship-first (VERIFIED: report §2, §3, Decision).**
The study identifies λ≈6.9 as `1 / Var_state(theta)` for a gap already expressed in tilt-score
r-units — a unit conversion, not a free dial. The product has no per-team gap in those units; it has
ratings. Turning the tilt on now would inject an arbitrary scale, so "the mapping is unmeasured" is
both sufficient *and* necessary. To turn it on would require: a fitted `f(ratings)`, demonstrated
out-of-sample transfer at the 0.45/0.2 persistence ceiling, and pass rates/points inside the item-6
scale. The report's reason is therefore sufficient — I found no argument for turning it on first.

**2 · The post-cutover fit spec is not testable as written (VERIFIED against report lines 11, 25, 33).**
Three defects, all in the single sentence "match mean 0, sd about 0.024, and the 0.45 / 0.2 persistence":
- (a) **Estimator unnamed.** "The combined gap" needs a defined population and statistic (team-season
  mean of the fitted gap? of `f(off)-f(def)`? weighted by games?) before a test can compute it.
- (b) **Shrinkage makes equality impossible.** Any deterministic function of static ratings explains
  only part of the measured spread, so its sd is ≤ 0.024 by construction. Requiring `sd ≈ 0.024` as
  a pass condition would reject every honest fit. The target must be *never exceed* the measured sd,
  with the explained fraction reported.
- (c) **Persistence is the wrong target for `f`.** 0.45/0.2 is the year-to-year correlation of the
  *measured tilt scores* (report §4), not of a function of preseason ratings; a deterministic
  ratings gap inherits ratings persistence, so matching those numbers does not validate the mapping.
  Use them as the *ceiling* the fit may not claim to beat, not as the fit target.

**Falsifier to write into the spec:** reject the fit if fitted sd > measured sd, if implied points
leave the item-6 band (|s| ≤ 0.25 → ±4%), or if the fit claims transfer above the 0.45/0.2 ceiling.

**3 · The θ caveat protects the number in Caveats but not in the Decision (VERIFIED: line 29 vs line 23).**
Line 29 says "about 7" is per r-unit for THIS θ and not universal. Line 23 — the part that drives
action — says "Lambda is therefore identified as a unit conversion, about 7 per r-unit" with no
qualifier. Add one sentence to §Decision: *"λ≈7 is conditional on the chosen THETA vector; it is a
scale factor for this parameterisation, not a portable constant, and no product value inherits it."*
Without it, the next reader will quote 7 as a constant. The same applies to line 11's "typical s
about 0.15–0.17".

**4 · No conflict with item 6 or the 18 Nov ruling (VERIFIED).** Typical s 0.15–0.17 sits inside the
|s| ≤ 0.25 → ±4% band; deferring the mapping to post-cutover is exactly SHIP-FIRST. One caution:
the Decision's "open item" must stay *post-cutover tuning*, not quietly become a pre-cutover project.

## WHAT I WOULD CHANGE

The one §Decision sentence in point 3 (required), and the post-cutover target in line 33 rewritten as
"fitted sd ≤ 0.024 with explained fraction reported; 0.45/0.2 is the transfer ceiling, not the fit
target; reject if points leave the item-6 band". Both are report-only edits; no product or pack change.

## WHAT I DID NOT CHECK

- I did not run `passgap.py`, `datacheck.py`, or inspect the labels table; the verified numbers are
  taken from the report and from ERNIE/Pickle's receipts (REPORTED to me).
- I did not check whether a ratings file with game outcomes exists beyond the report's claim that
  Madden 27 has no games played on it (UNKNOWN from my seat).
