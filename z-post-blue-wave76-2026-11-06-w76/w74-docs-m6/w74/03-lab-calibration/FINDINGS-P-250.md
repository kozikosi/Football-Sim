# P-250 — the measured conversion curve and the tuning finding (w74 item 3c)

**Headline: the three policies separate decisively, but the proposed tuning lever is FLAT — the CPU-draft
spread cannot reach 90/35/25 (+ P(20-0) ≈ 1–2 %), and the gap is a draft-quality gap, not a league-strength gap.** Per the
pre-registered decision rule (CALIBRATION.md §4), the flat response stops the tuning: no parameter value is
proposed, because none exists on this lever. What follows is the measurement, the mechanism, and the two
pre-registered follow-ups that CAN move the number — both need a ruling first.

## 1 · The baseline curve (N = 1,000 paired seeds per policy, DEFAULT_CONFIG) — VERIFIED

| Policy | Playoffs | ±95% CI | SB appearance | Title | Mean wins | League win-SD |
|---|---|---|---|---|---|---|
| `greedy` (naive best-OVR) | **89.5%** | ±1.9 | 33.0% | 21.6% | 11.43 | 2.229 |
| `top30` (skilled depth-aware) | **48.5%** | ±3.1 | 7.1% | 3.0% | 8.72 | 2.171 |
| `favorites` (deliberately bad) | **17.4%** | ±2.4 | 2.0% | 0.7% | 6.72 | 2.190 |

- **Separation: decisive.** greedy → top30 = 41.0 pp; top30 → favorites = 31.1 pp (the punishment band "≥30 pp
  below top30" holds). The measurement instrument works; the x-axis is real.
- **Parity (report-only per the Owner):** win-SD 2.17–2.23 in every arm — below the real-NFL reference (3.07 ± 0.35; the parity
  TARGET is derived in M5); the league is too flat, and nothing in the draft policy changes it.
- **Robustness:** a corroborating re-run of greedy (1,140 seeds, sharded) and top30 (760 of the 1,000, sharded)
  agrees with the baseline within z = ±0.19 on every metric (results/b-*.json) — the paired-seed harness is
  stable across process sharding.
- **Reading check (VERIFIED in engine/draft.ts):** `top30` sorts candidates by the value metric (`wins`) and
  picks UNIFORMLY AT RANDOM among the top 30 — a faithful reading of "consistently picking within the top 30 of
  wins/priority". The gap to greedy is therefore the cost of settling for 15th-best-value on average, not a
  harness artifact.

## 2 · The tuning ladder (midFloor = later-round CPU floor below best-available, rounds 1–4 stay topFloor=5)

First run: the three pre-registered rungs (14/18/24) produced byte-identical results with empty
`configOverrides` — the runner correctly ignored the space-form `--midFloor 14` (its own header reserves
space-form), so the ladder measured the default three times. **Re-run with equals-form (`--midFloor=14`), and
this time the failure is informative:**

| midFloor | N | top30 Playoffs | ±CI | SB | Title | Mean wins | win-SD | favorites@24 |
|---|---|---|---|---|---|---|---|---|
| 10 (default) | 1000 | 48.5% | ±3.1 | 7.1% | 3.0% | 8.72 | 2.171 | — |
| 14 | 240 | 46.7% | ±6.3 | 5.4% | 2.1% | 8.54 | 2.156 | — |
| 18 | 240 | 44.2% | ±6.3 | 8.3% | 4.2% | 8.59 | 2.178 | — |
| 24 | 240 | 50.8% | ±6.3 | 9.6% | 5.4% | 8.77 | 2.158 | 17.5% / 1.2% / 0.8% |

**The curve is flat.** Every rung sits within its own CI of the default; mean wins moves ≤ 0.23; win-SD never
leaves 2.16–2.18; the favorites punishment persists (33.3 pp below top30 at the widest rung). N=240 per rung
carries ±6.3 pp — the observed movement (≤4.3 pp, non-monotonic) is noise, and even the largest point estimate
is 29.2 pp short of the 5-Nov 80 % target — 39.2 pp short of the retargeted 90 % line.

**The mechanism (VERIFIED in engine/draft.ts):** `floorFor` returns `best − midFloor` for rounds 5–8, and
`cpuChoose` filters candidates below it — falling back to unfiltered when the filter empties. With a 1,953-player
pool, "best − 24" still leaves a deep bench of acceptable players at every pick, so the floor never binds and CPU
pick quality barely changes. The lever is real; its range is empty.

## 3 · Why the gap is a draft-quality gap (and what would actually move it)

greedy's 89.5% proves the engine CAN express a 41 pp draft-quality edge — the same league, the same season
sim, the only difference is WHICH players the user drafts. The Owner's 90/35/25 (+ P(20-0) ≈ 1–2 %) for top-30 pickers therefore
cannot be reached by weakening the CPU. Two pre-registered follow-ups (CALIBRATION.md §4 addendum), both
awaiting a ruling:

1. **Policy-semantics ruling (Architect + Owner):** is a "top-30 picker" (a) today's random-within-30, or (b)
   best-value-with-a-top-30-cap (greedy unless the value board forces a choice)? Reading (b) would measure much
   closer to greedy; the Owner's phrase "consistently picking within the top 30" arguably means the user's picks
   LAND in the top 30 because they are good — one sentence settles it, and the curve is re-run same-day.
2. **Game-noise sweep (only if (1) still misses):** `noiseMax`/`biasSd` (engine specs, report-only parity cost
   stated) — lower noise lets a real draft edge express. Pre-registered: `noiseMax ∈ {0.75, 1.5}`, top30 only,
   N = 500 per rung, decision rule identical to §4.

## 4 · What the Architect receives

- The measured curve (this file + results/*.json, every run pre-registered with its argv embedded).
- **No parameter proposal** — an honest flat curve cannot propose values, and the ruling DO-NOT-START holds:
  the engine is untouched; the response curve is the proposal.
- The parity cost note the Owner asked for: the CPU-draft lever does not just miss the outcome targets — it
  also does not move parity (win-SD ~2.17 at every rung vs the real-NFL reference (3.07 ± 0.35) — the target is derived in M5). "More losers at the bottom" needs
  a different lever entirely; that exploration is a separate pre-registered experiment if wanted.
