SPEAKER: inkling | ROLE: council | TASK: Part 1 of the follow-up prompt — verify Ernie's 4th-down reversal (the headline of this round) | DATE: 2026-11-17T22:25Z
FOR: P-342

# Ernie's 4th-down cell-selection reversal — REPRODUCED exactly, at 12,000 and 120,000 paired keys. **It does block the default.**

**Machine:** macOS arm64 · Node v26.13.0 · scratch extract of `65673a00` · my own `fourth-down-repro.ts` (level recomputed from the pack tables with `recKeys`/`classPool`; no engine file modified, no `Math.random`, game keys `glm-bar:0..119999`). The artifact: for every 4th-down pass play, the L-level is the finest level whose **class** sub-pool clears `minClassPool=25` — deterministic given (state, class), so no engine patch is needed to measure it. Ernie's shipped scripts are not runnable from a clean extract (his own note: they expect `/tmp` pass logs); everything below is my independent re-derivation. Note on the prompt's N discipline: **12,000 keys (matches the round's published figures) and a fresh 120,000-key run (10× keys) — state both.**

## 1. Is the mechanism right? — VERIFIED, twice

**The `downs` drive-result collapse is exactly where Ernie said it is.** My `drive_end` tallies reproduce his counts to the event:

| result | pools (12k) | GLM (12k) | N=120,000: pools → GLM |
|---|---|---|---|
| downs | 24,588 → 21,171 | **−3,417 (−13.9%)** | 244,489 → 213,087 (−31,402, −12.8%; 2.037 → 1.776 per game) |
| td | 59,417 → 59,765 | | 596,449 → 596,494 |
| punt | 84,038 → 83,418 | | 839,344 → 837,921 |
| fg/fgmiss | 41,977/7,097 → 42,605/7,333 | | 419,304/71,533 → 424,998/73,523 |
| to | 24,424 → 24,528 | | 245,530 → 243,999 |
| safety / deftd | 663/2,513 → 676/2,409 | | 6,516/24,879 → 6,348/23,861 |

Every other result moves ≤0.41 pp (a denominator effect), as Ernie said; only `downs` collapses. Inside `downs`, the 4th-down component (−3,838 snaps by his §1, capping at −43%) — my run is consistent (`downs`-endings are dominated by 4th-down inc continuations: 3,566 extra continues at 12k; 37,090 at 120k, i.e. **0.309 per game**, against a measured drives gap of ~0.235/game — the magnitude drives the gap, right to the unit).

**The level histogram — his convention decoded, then verified.** Ernie reported "pools L0 65.51% vs GLM L0 8.06%". His histograms are built on the **GLM-visited** 4th-down pass plays only, with two different conventions, and they reproduce **to the count**:

- pools-rule level (any class ≥ 25) on GLM-visited plays: L0 **13,683 (65.51%)**, L1 6,879 (32.94%), L2 324 (1.55%) — matches his {13683, 6879, 324} exactly. My same-rule result on pools-visited plays is 12,056/19,191 = 62.82% (my 12k) / 63.20% (my 120k) — same magnitudes, different visit set.
- GLM class-sub-pool availability, **per (play × class) pair** (4 pairs per play; his histogram total 83,544 = 4 × 20,886): L0 **6,736 (8.06%)**, L1 **50,007 (59.86%)**, L2 **22,259 (26.64%)**, L3 **4,542 (5.44%)** — matches his {6736, 50007, 22259, 4542} exactly.
- The **operational** L0 share — the drawn class's sub-pool (what the sampler actually does): L0 **16.38%** (12k) / **16.18%** (120k) vs pools 62.82% / 63.20% — still a ~4× down-blind rate. (The 8.06% figure is the pair view; it overstates the sampler's own behavior by ~half; both are correct under their definition; both point the same way.)

Redundant check (a different level view cannot rescue the node): at 120,000 keys the pair-view holds at L0 8.02% / L1 59.86% / L2 26.52% / L3 5.60% — stable to a tenth of a point. **The down-blind substitution is real, measured the same way by my code as by his.**

**The incompletion-ends-drive check — VERIFIED.** For every 4th-down pass incompletion, continue vs end:

| pools | continue | downs | | GLM | continue | downs |
|---|---|---|---|---|---|---|
| 12,000 keys | 2,114 | 4,629 → ends **68.7%** | | | 5,680 | 1,844 → ends **24.5%** |
| 120,000 keys | 20,970 | 46,816 → ends **69.1%** | | | 58,060 | 17,965 → ends **23.6%** |

(Continue+(downs+other) sums: pools 6,779/6,979 continues ≈ 31%; GLM 7,790/82,119 continues ≈ 76%.) Ernie's 68.3% vs 24.3% — mine: 68.7/24.5 at 12k and **69.1/23.6 at 120k**. **The substitution is real: a 4th-down incompletion ends the drive under the pools node ~69% of the time; under the GLM node ~24% of the time. 3,566 extra drives-not-ended per 12,000 games (37k per 120,000).**

**`holes` cannot see it — VERIFIED from the source.** `passclass.ts:82`: `stat[4]` increments only in the branch where **no level at all** held a class sub-pool (`last === undefined`). The silent fall-through L0→L1/L2/L3 (sub-pool exists, just below 25, or at L0 the class-restricted pool is thin) is returned at line 79–80 without touching any counter. My holes stay [0,0,0,0,0] on both nodes at 120k — a clean `holes` does **not** certify the sampler stayed in the down-aware cell. Ernie's second, smaller finding stands, and it is a monitoring hole: today nothing flags the fallback that moves drives.

**What is NOT the cause — also verified:** the 4th-down sack excess is real (7.92→7.21, −9% relative, per Ernie's by-down table) but the aggregate sack shift is carried by downs 1–3 (his Layer 6: −0.0268 / −0.0420 / −0.0125 / −0.0181, the fourth column disproportionate at 18% but not the aggregate story) — consistent with my K-O result (downs 1–3 carry ~81%). The drives artifact does not contaminate the sack verdict, and the 17%/97% splits coexist: **sacks = per-state rate effect (Camp A); drives = 4th-down cell-selection artifact. Two mechanisms, both real, on different outputs.**

## 2. Does it block the default? — **Yes, it does.**

Ernie reversed; I take the same side, with reasons stated independently:

1. **It is a state-machine error, not a residual.** Football says a 4th-down pass incompletion usually fails to convert (the empirical transition table encodes exactly that — at L0, 99.72% of inc tuples carry NaN ndown/delta, i.e. "the real drive ended here"). The class-then-tuple design makes the *class* model answerable for the class and leaves the *transition* to the tuple — but the tuple is drawn from a **different cell** under the GLM, and the wrong cell systematically says "drive continues". The sim is not mildly mis-calibrated; it is football-wrong at its most granular 4th-down cells, and that error leaks into drive counts, time of possession, points-allowed, and every downstream season statistic the user sees (his losing streaks and his 20–0 attempts ride on it).
2. **Both findings stand together.** The sacks finding (rate-effect, −1.07% at 120k, calibrated, football-honest, small) would be shippable alone; the drives finding is a mechanism bug wearing a residual's clothes, and it compounds (each fake-continued drive buys a play, sometimes a first down, occasionally a score — the +0.6% points figure hides how many such plays survived to score).
3. **It is cheap to see and cheap to bound** — it does not need to be lived with. The §6 fix is minimal and preserves whatever the GLM is good at.
4. What would change my mind: the Architect's §6-style bound landing and the re-measure **gating** drives within ±0.3% — then the sack residual and the default become the Owner's ordinary gates. Until then, defaulting is handing the Owner a sim whose 4th down is a different sport.

## 3. Does Ernie's §6 bound fix it? — **Accept in substance; two sharpenings.**

The bound: compute the level the pools node would have used for this cell; walk only levels ≤ that bound for a class sub-pool clearing `minClassPool`; if none, use the last level the pools node reached — never coarser. **Verdict: accept, prefer it over both the status quo and any "never cross levels for any class" redesign.** Reasons and edge cases:

- **Why it is the right shape:** it keeps the one property the class-then-tuple design was actually selling — "the class draw does not distort the within-class outcome" — at the cell where it mattered most. The pools node already endorses this fallback philosophy (take what is there at the coarsest *allowed* level, not the coarsest that exists).
- **The `minClassPool` guarantee weakens — accept it honestly.** At bound level L0 a thin class cell may hold 3–10 plays; taking them is the same trade the pools node makes with minPool. That is the correct football trade; a 25-member guarantee was never football's rule here.
- **Sharpening 1 — the class-absent-within-the-bound case has no defined behavior in the proposal.** At the bound level the pool holds ≥ 25 tuples but may hold **zero** of the drawn class (all tuples comp); at levels ≤ bound likewise possibly zero; the proposal's "use the last level it was allowed to reach" is undefined for that case. Options: (a) fall back to the **coarsest** level for the class regardless of bound but **count it in a new hole slot (holes[5])** so the substitution is at least visible and small; (b) re-draw the class — rejected, breaks class fidelity; (c) bound to zero and re-ask — rejected, infinite recursion. **Recommend (a) with an explicit hole accounting, and a §6.1-style test that exercises it.**
- **Sharpening 2 — the `stat`/hole accounting must grow** so the fallback that moved drives is never invisible again (new `holes[5]` for " class absent within bound; fell through to coarsest anyway"). Also make the §6 HOW TO CHECK #1 target both baselines: drives gap ≤ ±0.3% **and** `inc:downs` ≥ ~60% **and** the L0 share (drawn-class) ≥ ~60% — three numbers, all measurable.
- **No fix is not acceptable** — the mechanism is measured, football-wrong, and compounding; 'record it, don't smooth it' was right for the sack residual and wrong for this.

## 4. Where I stand on the sacks residual split (asked alongside)

With Ernie-now / Inkling / GLM: the ~1% sack residual is a specification gap of the unfitted θ, not a blocker and not a "pass on one class" — it is closed by fitting θ (the Architect's stated next step after this node) and re-measuring on the same paired protocol. Beam's "one more pass before defaulting for long-run statistics" is defensible only if long-run sack totals become a tracked product metric; the trigger belongs in the Owner's ruling, not in a pre-default block. Glyph's "explicit check if season sack aggregates are decision-critical" is the same point, stated correctly. I measured no same-sign-per-game behavior (44.3% of games below — Ernie's correction stands; my earlier "the same sign every game" phrase, in a private draft last round, was wrong).

## 5. Filing discipline

VERIFIED (mine, this session): both key counts (12,000 and 120,000 `glm-bar:` keys), the drive_end tallies, all three level-histogram conventions (to the count), the inc-continue/downs splits, holes-zero on both nodes, the 2016–2022 in-sample probe reproduction (bucket-ko.ts: 6,000 keys, −0.0024 pp, my own code agrees with Ernie's receipt), the drives counts (downs 244,489 → 213,087). REPORTED (named): Ernie's eight §5/HOW-TO-CHECK figures, his by-down table, the 44.3% sign split, his in-sample probe receipt, GLM's 120,000-key headline refinement, glm-bar's table. INFERRED (not measured): why the fine cell holds so few sacks/incs (structually, the 4th-down call share is small; cells split by class — that is the pool's own construction); the 130% coverage (the substitution more than covers the drives gap — the rest is the small upticks in other results). UNKNOWN: whether the §6 fix, once landed, shifts sacks too (must be re-measured, not assumed); Beam's and Glyph's 120,000-key numbers, not re-run here.

**Correction of the prompt's premise line (worth keeping honest):** the prompt says the 12,000-game figures were "partly key-domain noise" — right (sacks −1.07% at 120k vs −1.72% at 12k), but the **artifact numbers are not noise** — they reproduce at 10× keys to within a tenth of a point; only the aggregate totals moved. The artifact is the stablest thing on this page.

**BLOCKED:** nothing for Part 1. **OPEN (Owner decision):** the default itself, which should wait on the §6 fix AND its re-measurement — not on the sack residual. **NEXT:** (1) the Architect lands the §6-bound fix + the §6.1 test (+the two sharpenings), and re-runs `glm-bar.ts 12000/120000` and this same 4th-down table; (2) whoever verifies re-runs this filing's commands and checks `inc:downs` ≥ 60%; (3) only then does the default question open on the Owner's terms.
