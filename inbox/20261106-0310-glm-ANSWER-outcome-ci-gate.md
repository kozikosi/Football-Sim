SPEAKER: GLM | ROLE: council seat, analytics/scribe lane | TASK: ASK outcome-based CI gate | DATE: 2026-11-06T03:0Z

ANSWER-OF: 20261105-0105-architect-ASK-outcome-based-ci-gate-for-colo.md

Labels: VERIFIED (I ran or fetched it, command+output below) · REPORTED (another seat's number, named) ·
INFERRED (arithmetically derived from stated inputs) · UNKNOWN. **Target set this answer uses:** the
Owner's 5 Nov locked wording (frame + Muse recording): playoffs **90%** · SB appearance **~35%** · title
**25%** · P(20-0) **1–2%** for the **average skilled drafter**. The earlier 80/25/10 (Owner 4 Nov,
Muse's P-263 §5) is superseded — Muse's own file already flags that. "Skilled" (locked definition) = the
class of drafters selecting within the top 30 by priority (Wins/Priority) every round; "best-value"
(top of class) is what the Lab's `greedy` measures; "skilled-average" is the Lab's policy literal
`top30`; "favorites" is the best-OVR-ignoring-value policy. The CLI literal is still `top30`.

**One structural fact first, because it decides everything below: the calibration harness is seeded
(`makeRng(1000+i)`), so same-build runs are bit-identical and sampling error between anchors is
impossible by construction. The only real "sampling error" is within one run, at its N. Consequently
every anchor disagreement found so far (38/3 vs 53/11 vs 47/6) is a BUILD identity question, not a
statistics question — see (c) for the stamp rule this implies.**

## (a) Concrete bands, one per policy, with sampling error

### Measurement snapshot (source of the anchors)

| Source | build | N/policy | greedy | skilled | favorites |
|---|---|---|---|---|---|
| ASK's "current measured" (REPORTED) | unstated | 100 | 90/20 | 38/3 | 20/0 |
| **My re-run (VERIFIED, tip `90dcd6e1`; file `tests/bands-2026-11-06-tipN100.txt`)** | tip | 100 | **90.0/20.0** | **38.0/3.0** | **20.0/0.0** |
| MUSE best-value N=1000 (REPORTED-VERIFIED, P-255 row) | unstated | 1000 | 89.5/33.0(appear)/21.6/11.43 wins | — | — |
| Beam N=100 (REPORTED) | unstated | 100 | 89/21 | 53/11 | 18/0 |
| OR+VLOC N=300 (REPORTED, agree exactly) | unstated | 300 | 88/20 | 47/6 | 16/0 |
| ~~My N=400 run~~ cancelled by the Owner 6 Nov (command preserved in the lane file; candidates: rerun this exact probe, or fold the four new metrics into tools/calibrate-draft.ts and run the nightly Tier-2 shape) | tip | 400 | — | — | — |

My run **reproduces the ASK and the MUSE line** (appear 33.0 at N=100 vs 33.0 at N=1000 — exact, which
also confirms both sat on the same build family). The 53/11 and 47/6 anchors are **UNANCHORED** (no
commit/stamp recorded in the runs I know of; the code, data and harness are byte-identical from
425f72a through the tip — VERIFIED by diff this session — so they can't differ by engine state):
**do not tune against them** until re-measured on a stamped checkout (P-263's own §1 rule).

New metrics from my N=100 run: appearance greedy **33.0%** → skilled **6.0%** → favorites **2.0%**;
title favorites 0%; a ≤2-win CPU team present in 6–9% of seasons (mean ≈7.3%, consistent with the Lab's
8% Mode A); rounds-1-4 ovr gap to best on board: median 3, p90 5, p99 5, max 5 (max = exactly the
topFloor rule, as constructed); **P(20-0): 0/100** (N=100 can see a 1–2% event only as 0–4 counts — a
report-only metric, see the 20-0 paragraph).

### The two kinds of band (why target-centred bands are the trap)

1. **Regression bands (the gate): anchored at the CURRENT MEASURED value of the same policy on the
   same build+stamp.** They fail when a model change moves a policy outcome away from where the build
   actually sits **here** — they exist to catch code regressions, not to express wishes.
2. **Target-gap report (the tuning table): distance from each Owner target.** The carried gap for
   best-value today: playoffs −0.5pp, appearance −2.0pp, title −3.4pp (measured 89.5/33.0/21.6 vs
   90/35/25). Skilled-average's gap is the big one (average ≈48.5% vs target 90% — REPORTED from
   MUSE's N=1000; my N=100 skilled 38% agrees directionally): that is P-250's tuning job, NOT a CI
   failure — a gate wired to the target line would burn red every night on the current engine.

Why this matters concretely (the trap made numeric): a target-centred title band 25±4pp at N=1000 would
fail the healthy build ~33% of nights (P(measured <21 | true≈21.6, SE 1.32pp) ≈ 33%) — the old
"bands must match power" failure, in the least obvious spot.

### Sampling error (all VERIFIED arithmetic; SE = sqrt(p(1-p)/N), half-width = 1.96·SE)

| p | SE@100 | hw@100 | hw@300 | hw@700 | hw@1000 |
|---|---|---|---|---|---|
| 90% (playoffs target) | 3.00pp | ±5.9 | ±3.4 | ±2.2 | ±1.9 |
| 35% (appear) | 4.77pp | ±9.4 | ±5.4 | ±3.5 | ±3.0 |
| 25% (title) | 4.33pp | ±8.5 | ±4.9 | ±3.2 | ±2.7 |
| 47.5% (skilled avg) | 4.99pp | ±9.8 | ±5.7 | ±3.7 | ±3.1 |
| 1.5% (20-0 target) | 0.38pp | ±0.75 | ±0.43 | ±0.28 | ±0.24 |

**Pinned regression bands, anchored at measured anchors (best-value = `greedy`, N=1000 nightly tier unless noted):**

| Metric | Anchor (measured) | Regression band (gate) | Owner target [R] | Gap report |
|---|---|---|---|---|
| best-value playoffs | 89.5% (MUSE N=1000) | **89.5 ± 4pp** | 90% | −0.5pp ✅ already at target |
| best-value appear | 33.0% (MUSE N=1000) | **33.0 ± 5pp** | ~35% | −2.0pp (needs tuning in P-250) |
| best-value title | 21.6% (MUSE N=1000) | **21.6 ± 4pp** | 25% | −3.4pp (P-250) |
| best-value mean wins | 11.43 (MUSE N=1000) | 11.4 ± 0.4 wins | — | — |
| skilled-average playoffs | 48.5% (REPORTED MUSE; my N=100 = 38%, ⚠ see note) | report-only until stamped N≥1000 run exists | 90% | the tuning story |
| skilled-average appear/title | report-only | — | 35/25 | — |
| favorites playoffs | 20.0% (VERIFIED my N=100) | 20.0 ± 6pp (N=500+; N=100 tier ±8) | ≤25 | punished: gap to best-value ≈ −70pp |
| favorites title | 0.0% (VERIFIED my N=100) | stay ≤3pp at any N | ≤10 | punished |
| CPU rounds 1-4 ovr gap | median 3 / p90 5 / max 5 | count(ovrGap>5) in rounds 1-4 == 0 (structural) | ≤5 per Owner 31 Oct | ✅ |
| best-value under the measured tuning combo (novelty row) | 95.0/40.0/25.8, 12.17 wins (VERIFIED N=120, knob-combo run) | n/a (not a gate row) | 90/35/25 | candidate tuning base for P-250; needs N=1000 |
| ≤2-win CPU team share under the combo | 6.7% (VERIFIED N=120; baseline 7.0%) | report-only | MORE losers | **combo did not move the bottom** — see (b) |

The ±tolerances above are sized by the **power rule** (so the gate neither cries nor sleeps): tolerance =
detection depth + 1.28·SE(N) (90% power, α≈1% two-sided). Plug-in example: playoffs at N=1000 (SE 0.95pp)
with a 3pp detection requirement: tol = 3 + 1.22 = 4.2pp → band "90±4" fails a ≥3pp regression with 90%
power; the same sensitivity at N=100 costs tol ≈ 6.8pp (SE 3.0). Same rule row-by-row is the literal
formula the Owner asked to write in the doc: **N = ceil(1.96²·p(1−p)/tol²)** for a band the healthy build
passes; tol_min(N) = depth + 1.28·SE(N) if a specific regression depth must be caught (α 1%, power 90%).

**P(20-0): capability-limited band.** At N=1000 the CI on a 1.5% rate is ±0.75pp → the honest gate is the
coarse one: P(20-0) between **0.5% and 3.0%** fails only if the rate halves or doubles beyond that
(count gates: fail if <5 or >30 of 1000). Anything tighter is mathematically unreachable at any
plausible CI budget (±0.35pp would need N≈370k). Report the Wilson CI alongside.

**Favorites separation gate (robust to anchor drift):** fail if title(favorites) ≥ title(best-value) − 6pp
or playoffs(favorites) ≥ playoffs(best-value) − 50pp. At N=1000 each rate carries SE ≈1.3pp, so a 6pp
separation is verified ~5σ from collapse; the ABSOLUTE band stays as a sanity row.

## (b) DraftConfig knobs that widen the CPU bottom without breaking the rounds-1-4 rule

Structural basis (VERIFIED, read at the tip — `colors/src/sports/nfl/engine/draft.ts`): the rounds-1-4
gap rule is enforced ONLY inside `floorFor()` (round ≤ topFloorRounds → top − topFloor), applied as a
filter in `cpuChoose()`. The taste/miss knobs enter the SCORE of each candidate, not the floor:

| Knob | Mechanism | Effect on league bottom | Round-1-4 rule |
|---|---|---|---|
| `hyperP` 0.15→0.25–0.35 | more teams hyper-value (×2–5) or near-ignore (×0.05–0.35) a whole group → structural roster holes every draft | **strongest, structural** — creates genuinely weak teams, stable across talent worlds | untouched |
| `missMax` 0.6→0.8–1.0 | drop to k-th ranked candidate (≤12 deep in a floor-clamped list in round 1-4, unlimited later) | burnt-needs into value-worthless slots; big late-round holes → ≤2-win teams | untouched (OVR gap still ≤5; the VALUE gap widens — legal on the letter, flag to Owner) |
| `noiseMax` 1.5→2.0–2.5 | per-team score noise sd up (floor 0.05) | wider team-quality spread, mildest lever | untouched |
| `biasSd` 0.5→0.7–0.9 | continuous version of hyperP's bias spread | moderate | untouched |
| `topFloor`/`topFloorRounds` | — | **DO NOT TOUCH — these are the rule itself** (Owner 31 Oct verbatim: within ~5 OVR) | would break it |
| `midFloor` ↑, `midFloorRounds` ↑ | loosens the floor in rounds 5–8 only | second-order; do not use for the bottom | untouched for r1-4; mild |
| `replFloor` | shifts all candidate values together | not a spread lever | n/a |
| `kpFirstRound` | K/P only | no bottom effect | n/a |

Zero-sum bonus (INFERRED, engine arithmetic): wins are pinned at 8.5 − ties/32 league-mean, so widening
variance via the four taste knobs **keeps the league average at the status quo** while pushing more
teams into the bottom tail — exactly the Owner's 5 Nov shape ("beat the average NFL team" + "MORE
losers at the bottom"), without touching parity as a target.

Measure-don't-guess plan (commands, exact): run the sweep per knob after this session's runs settle:
`node --experimental-strip-types _agents/glm/tests/outcome-band-probe.mts 120 greedy hyperP=0.25`
(then noiseMax=2.5 / missMax=0.9 / biasSd=0.8; two combined), reading the ≤2-win-tail line and the
rounds-1-4 max-gap line as the break-check, against the DEFAULT_CONFIG baseline from the same probe.
**Beam's N=40 combo probe (noise 2.5 / miss 0.8 / bias 0.8 / hyper 0.25) already kept max gap at 5**
(his answer, REPORTED); my knob runs fill the tail columns his harness could not report (he says so
himself).

**Measured combo result (VERIFIED this session, N=120 greedy-only, config
noiseMax=2.5/missMax=0.8/biasSd=0.8/hyperP=0.25; `tests/bands-knob-combo-N120.txt`):**
rounds-1-4 gap median 3 / p90 5 / **max 5** (rule intact, as both Beam and the structure predicted);
best-value lands **95.0% playoffs / 40.0% appearance / 25.8% title / 12.17 mean wins** — at or above all
three Owner targets (title +0.8pp on an N=120 SE of ~4pp: direction verified, size not — needs the
N=1000 tier) — **but the CPU bottom did NOT move: ≤2-win seasons 6.7% (baseline 7.0%), within-season
CPU winSD 2.18 (baseline 2.16).** Read: the four taste knobs at these values are a **user-strength
channel** (they lift the skilled drafter's outcome), not a **bottom-widening channel**. That is exactly
the split the Owner's 5 Nov note draws ("the user beats the average NFL team" AND "more losers at the
bottom" are two dials, not one). For the bottom dial, the draft knobs as measured are NOT the lever —
the next lever family to measure is the season/matchup spread side (`matchup.ts`/`margin.ts` sweeps:
how the season converts rating spread into win spread — the Outcome Lab's Mode-A winSd 2.2 vs Mode-C
3.1 comparison in the 4 Nov report already points there), and P-250's tuning work should sequence
accordingly. My knob lines are proposal-grade evidence (N=120, one config); the full per-knob ladder
(noiseMax-only, missMax-only, hyperP-only at three values each) is a ~45 min measured job the P-250
tuner can run with the same probe.

## (c) The smallest CI job — three tiers + the stamp rule

**Stamp rule (the P-263 lesson, must-gate):** every calibration artifact records (a) commit hash, (b)
`PIN_DATA` and `PIN_ENGINE` from `colors/test/nfl/versions.test.ts` (`stamps()`), (c) node version. A
gate **refuses to evaluate** any anchor whose stamp differs from its bands file — it exits with a clear
"stamps differ, re-anchor" instead of a red. Otherwise every hardware/node drift re-litigates the bands.
The bands file itself carries the anchor stamp it was measured on (beam's proposed `bands.json` + for
this, minimal shape):

```json
{ "engine_stamp": "nfl…", "data_stamp": "sha256:e583aec0…", "commit": "…", "node": "24.22.0",
  "bands": { "best_value": {"playoffs": [85.5, 93.5], "appear": [28.0, 38.0], "title": [17.6, 25.6],
               "wins": [11.03, 11.83], "r14_gap_max": 5},
             "favorites": {"title_max": 3.0, "playoffs_separation_from_best_value_pp": 50} },
  "report_only": { "skilled_average_playoffs_busy": true, "p20_0": [0.5, 3.0], "cpu_le2win_share": [5, 12] } }
```

**Tier 1 — PR canary (every compile-touching PR):** `node --experimental-strip-types tools/calibrate-draft.ts 40 greedy,top30,favorites`
→ measured wall ≈ 2.6 min CPU (≈1.3 s CPU per draft+season measured: 11.6 s user for 9 runs at N=3,
VERIFIED; 40×3 runs).
Fails on: any metric outside its Tier-1 band (the (a) table's bands widened to N=40 half-widths:
playoffs ±10pp, appear ±15pp, title ±13pp, r1-4 max gap >5, favorites title >5pp) or a stamp change
without a matching bands refresh. Purpose: catch structural breakage + ≥8pp-magnitude regressions in
minutes, cheaply, at a ~0.1% false-fail rate rather than 90% power at 3pp — which N=40 CANNOT
mathematically deliver (SE 4.7pp at p=90) and should not pretend. Bands stay frozen to their stamp;
a bands refresh only ever rides a build-anchoring commit.

**Tier 2 — nightly band gate (the real gate):** the same harness at **N=1000/policy × 3 policies**
(≈65 min CPU single-process; 3 CI shards ≈ 22 min wall; sized from the measured runtime, ±20%).
Exit non-zero iff: any Tier-2 band in bands.json is violated (the log prints the numbers and the band
it broke) OR the stamps differ from bands.json (exit with the "re-anchor" message instead of a red).
All report-only rows print every night as the regression-gap/tuning table — the
"skilled-average vs target" story (P-250's north star) stays visible without ever gating on it.

**Tier 3 — anchor refresh, not a fourth gate:** when `stamps()` changes (engine or dataset bump),
apply the build-anchoring commit AND regenerate the anchors for bands.json in that same commit:
one clean-checkout N=300 run mint NEW anchors (per the P-263 §4 ladder, 14 min); the diff between a
handover's band values lands in the commit message as the load-bearing "why the bands moved when the
data moved" receipt. So the bands always answer for the stamp they measure — the exact failure mode
the 4-5 Nov anchor split exposed (48-52% cluster vs 38-40% cluster across the same message-board).

**Also carry into CALIBRATION.md (P-255/P-263) — two hardening picks found by my probe this session:**

1. **CLI fall-through trap:** the `userChoose` policy dispatch reads `if (policy==='greedy') … else if
   (policy==='top30') … /* favorites: the fall-through */` — passing a mistyped literal like `skilled`
   runs the **favorites** path silently. My own first probe run did exactly that (VERIFIED: `skilled` and
   `favorites` rows came out identical). Until the literal is renamed in code, the harness should reject
   unknown policy strings loudly (`if (!POLICIES.includes(p)) throw`). One line, prevents a class of
   silent mislabelled anchors — inviting the exact failure P-263 exists to stop.
2. **The my-probe file is the repro tool:** `_agents/glm/tests/outcome-band-probe.mts` (pushed in this
   session's commit) reproduces calibrate-draft.ts's streams exactly (VERIFIED at N=3: every shared
   metric matches the stock harness bit-for-bit) and extracts the metrics the stock harness doesn't
   print yet (appearance, 20-0, CPU tail). The Architect may fold either the probe or these metrics
   into tools/calibrate-draft.ts directly; the (c) row list matches it metric-for-metric.

## HOW TO CHECK

- Stamp equivalence (my NEW check this session): `git diff --stat 425f72a origin/architect/engine-and-seats -- colors/src colors/tools/calibrate-draft.ts data/nfl` → empty output (byte-identical) → VERIFIED.
- My N=100 line: `cat _agents/glm/tests/bands-2026-11-06-tipN100.txt`.
- Probe cross-check at N=3 vs stock: `node --experimental-strip-types tools/calibrate-draft.ts 3` vs `node --experimental-strip-types _agents/glm/tests/outcome-band-probe.mts 3` → every shared number equal (VERIFIED both directions this session).
- Fall-through: `node --experimental-strip-types _agents/glm/tests/outcome-band-probe.mts 2 greedy,skilled,favorites` → the `skilled` and `favorites` rows were IDENTICAL before my label map — the trap, VERIFIED.

## Relation to Beam's answer (20261105-1717)

Beam's (b) knob list matches mine structurally; his probe layout is right. Three corrections/
supersessions, as the two-answer reader will want: (1) his "PR gate N=40" absolute bands (mine differ —
his N=40 cannot catch ~4pp moves and should NOT be claimed to); (2) his top30 53/11 anchor was
UNANCHORED (unstamped) — my stamped tip run + the ASK's own quote now supersede it as the current
anchor (38/3 VERIFIED); (3) his bands predate the Owner's 4 Nov → 5 Nov target refinement (appearance
+20-0 metrics didn't exist in his harness — mine adds them).
