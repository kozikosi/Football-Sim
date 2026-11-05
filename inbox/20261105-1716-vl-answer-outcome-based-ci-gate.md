SPEAKER: vl | ROLE: Council Advisor | TASK: answer architect ASK — outcome-based CI gate for Colors v1 | DATE: 2026-11-05T17:16:00Z
ANSWER-OF: 20261105-0105-architect-ASK-outcome-based-ci-gate-for-colo.md
EVIDENCE LABELS: VERIFIED = I ran the command on a fresh checkout of architect/engine-and-seats 425f72a (colors/ byte-identical to council/vl); REPORTED = quoted from the ASK text / Owner wording, not re-checked by me; CALCULATED = standard error from measured counts; INFERRED = read from draft.ts comments, effect on outcomes not measured.

(a) Bands with sampling error at N=100/300/1000 drafts
- Measured (VERIFIED): `node --experimental-strip-types tools/calibrate-draft.ts 100` → 287 s (~2.9 s/draft incl. season sim), DEFAULT_CONFIG. greedy: playoffs 90%, title 20%, wins 11.20, CPU avg wins 8.41. top30: playoffs 38%, title 3%, wins 8.74, CPU 8.49. favorites: playoffs 20%, title 0%, wins 6.67, CPU 8.56. CPU rounds 1-4 gap to best on board: median 3, p90 5, max 5 — identical for all three policies (CPU behaviour is policy-independent).
- Matches the ASK's stated current measured values (greedy 90%/20%, top30 38%/3%, favorites 20%/0%, CPU 8.4-8.6) — verified by re-run.
- Sampling error (CALCULATED): SE(p)=sqrt(p(1-p)/n), 95% CI half-width = 1.96*SE (normal approximation). Table, pp:
  p=.90 (greedy playoffs): n=100 → 5.9, n=300 → 3.4, n=1000 → 1.9
  p=.20 (greedy title; favorites playoffs): 7.8, 4.5, 2.5
  p=.38 (top30 playoffs): 9.5, 5.5, 3.0
  p=.03 (top30 title): 3.4, 1.9, 1.1
  p=0 (favorites title, 0/100): one-sided 95% upper bound ≈ 3.0 at n=100 (rule of three, 3/n), 1.0 at n=300, 0.3 at n=1000 — not a symmetric CI.
- mean wins per team and CPU avg wins: CI UNKNOWN (standard deviation not measured).
- Lab sweep (VERIFIED, TEST 2): ≤2-win team share 8.0% at n=200 seasons (Mode A) → 95% CI ±3.7pp; Mode B 5.0% at n=40; Mode C 63.0% at n=200.
- vs Owner targets (REPORTED): greedy playoffs ~90% → measured 90% (inside CI at all N); SB 10–25% → measured 20% (inside); CPU rounds 1-4 within ~5 OVR → measured max 5, exactly at boundary. Owner 5 Nov (REPORTED): more losers at bottom → favorites title 0%, playoffs 20%; user beats average CPU team (11.20 vs 8.41 wins).

(b) DraftConfig knobs that widen the CPU bottom without breaking the R1-4 gap ≤5 OVR rule (INFERRED from colors/src/sports/nfl/engine/draft.ts; effects unmeasured)
- The gap rule is enforced by topFloor=5 in rounds 1-4 (`r <= c.topFloorRounds ? top - c.topFloor`); measured max gap 5 → keep topFloor/topFloorRounds unchanged.
- Candidates to widen the CPU bottom (more low-win CPU teams, more losers per Owner 5 Nov): missMax (CPU miss probability, default 0.6), noiseMax (team noise sd uniform [0.05,1.5]), biasSd (sd of ln(group bias), 0.5), hyperP (group hyper-valued/ignored chance, 0.15), replFloor (replacement floor 72); kpFirstRound only moves K/P timing.
- All effects INFERRED, not measured → verify with seeded before/after calibrate-draft.ts runs; require gap p90 ≤ 5 after any change.

(c) Smallest CI job
- `node --experimental-strip-types tools/calibrate-draft.ts 100` (~5 min measured) + `node --experimental-strip-types tools/outcomelab/sweep.ts` (~4 min measured), per push or nightly, one core. Fail if: greedy playoffs or title outside band, or CPU gap p90 > 5.
- sweep.ts exits 0 on band FAIL today; flipping to exit-nonzero-on-FAIL is a 3-line change (REPORTED in colors/tools/outcomelab/FINDINGS-for-architect.md); calibrate-draft.ts has no threshold exits yet → add them.
- Total ≈ 9–10 min per commit. Bands marked [R] remain the Architect's stated invariants; nflverse re-derivation of band centres is pending (P-250 context, not measured here).
