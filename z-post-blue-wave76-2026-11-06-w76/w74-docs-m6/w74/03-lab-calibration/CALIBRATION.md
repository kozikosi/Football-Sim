# CALIBRATION.md — the conversion-curve methodology (P-255)

**Owner target (5 Nov 2026, verbatim ruling; retargeted 6 Nov 2026, w76 M6 — the stale 80/25/10 reads 90/35/25):** for a user consistently picking within the top 30 of wins/priority — **90 % playoffs / ~35 % Super Bowl appearance / 25 % title, with P(20-0) ≈ 1–2 %**. Standing context: a fairly-optimal team reaches the playoffs ~90 % and wins the Super Bowl 10–25 %; favorites-only is *punished*. Parity and home-win rate are **report-only** (Owner, same day).
**Reading note (flagged):** "35 % Super Bowl" is read as *reaching* the Super Bowl game (`finalists`), "25 % title" as *winning* it (`champion`). If the Owner meant 25 % as appearances, every band below shifts one metric — one line re-runs it.

## 1 · The three policies (the x-axis of the curve)

| Policy | Engine name | Definition | Role |
|---|---|---|---|
| **Naive best-OVR** | `greedy` | Every pick: the highest-OVR available player, first legal slot. No depth thought, no priority weighting. | The ceiling a spreadsheet reaches. |
| **Skilled depth-aware** | `top30` | Picks by Wins/Priority value inside the top-30 band of the board — the "consistently picking within the top 30" behaviour the Owner's target names. | The policy the 90/35/25 + P(20-0) target applies to. |
| **Deliberately bad** | `favorites` | Reaches for favourites against the board ( Owner's "extremely suboptimal" case). | The punishment floor — must separate downward. |

`tools/calibrate-draft.ts` (Architect) and `tools/outcomelab/calibration-curve.ts` (Executor, w74) both implement these as `UserPolicy`; the curve runner adds Super Bowl appearances, the win-SD distribution, and streaming progress.

## 2 · The metric

For a policy P and seed set S: **P(playoffs | P)** = share of drafted teams that make the 14-team bracket; **P(SB | P)** = share appearing in `finalists`; **P(title | P)** = share winning. **Paired seeds:** seed `i` produces the SAME draft world and season seed for every policy (base rng = `makeRng(1000+i)`, user slot forked identically), so policy differences are the only differences — the comparison is within-seed, not between.

## 3 · Bands (the format: policy → target ± tolerance → N required)

| Policy | Playoffs | Super Bowl | Title | N required |
|---|---|---|---|---|
| top30 | **90 % ± 5 pp** | **35 % ± 5 pp** | **25 % ± 3 pp** | 1,000 |
| greedy | ≥ 90 % (report; Owner band 90 % / 10–25 % titles) | — | 10–25 % | 1,000 |
| favorites | punished: below top30 by ≥ 30 pp | — | ~0 % | 1,000 |

**The measuring-instrument constraint (GLM's, adopted):** a rate p measured at N=100 has a 95 % CI half-width of ±1.96·√(p(1−p)/100) ≈ **±8 pp at p=0.5** — a band tighter than ±8 pp is not measurable at N=100. The 90/35/25 bands above (±3–5 pp) require **N ≈ 1,000 per policy** (±2.5–3 pp at p=0.1–0.8); the top30 policy also carries **P(20-0) ≈ 1–2 %** at the same N (a perfect season including the playoff run). Gate runs (CI) may use N=300 with ±5–6 pp tolerance and are labelled smoke, never verdicts.

## 4 · Pre-registration

Every experiment states, before running: the hypothesis, the parameter values, N, the seeds, and the decision rule — and the runner embeds the exact argv + config into the output JSON (`preregistration` block), so a run cannot silently drift from what was registered. Registered here for P-250:

1. **Baseline curve:** `--n 1000 --policies greedy,top30,favorites`, DEFAULT_CONFIG. Decision rule: if the three policies do not separate (top30 within 5 pp of greedy on playoffs, or favorites above top30), that is the finding — stop, report, no tuning.
2. **Tuning ladder:** only if (1) separates but misses the band: `--midFloor ∈ {14, 18, 24}` (later-round CPU floor below best-available; rounds 1–4 stay `topFloor=5` per the Architect's lever), N=300 per rung, policies top30+greedy. Decision rule: pick the rung whose top30 playoffs/SB/title land closest to 90/35/25 (+ P(20-0) ≈ 1–2 %); if no rung reaches 90 %, report the response curve and the gap — **the engine change is the Architect's to apply** (Executor proposes values with measurements; never edits engine code).

## 5 · Where the numbers land (MEASURED 5 Nov 2026 — see FINDINGS-P-250.md for the full read)

**Baseline (N=1,000 paired seeds/policy):** greedy 89.5 / 33.0 / 21.6 · **top30 48.5 / 7.1 / 3.0** · favorites 17.4 / 2.0 / 0.7 (playoffs / SB / title). Policies separate decisively; the favorites punishment band (≥30 pp) holds.

**Tuning verdict: FLAT.** midFloor 14/18/24 (re-run with equals-form overrides after the space-form bug made rung 1 measure the default) moves top30 playoffs 46.7→44.2→50.8 — inside noise (±6.3 pp at N=240), win-SD pinned at ~2.17. The lever cannot reach 90/35/25 (+ P(20-0) ≈ 1–2 %); **no parameter value is proposed** (pre-registered rule: a flat curve stops the tuning). Two follow-ups are pre-registered in §4's addendum and need a ruling: (1) the top-30 picker semantics (random-in-30 vs best-value-with-cap), (2) a game-noise sweep.

Results: `results/baseline-n1000.json`, tuning rungs `results/tune2-midfloor{14,18,24}-n240.json` (+ favorites spot-check at 24), sharded corroboration `results/b-*.json` (agrees within z=±0.19), and the chart `docs/council/calibration-curve.svg` (bands vs measured, one chart). The report-only parity readout rides every JSON (`winSdMean/min/max`) — and its own finding is that the CPU-draft lever does not move parity either (2.16–2.18 at every rung vs the real-NFL reference (3.07 ± 0.35) — the parity TARGET is derived in M5, not read off the NFL).
