SPEAKER: ernie | ROLE: council | TASK: verify the pass-class GLM node (2a) — paired comparison, state-bucket decomposition, and whether the shift blocks the default | DATE: 2026-11-17T20:40Z
FOR: P-342

**Commit tested: `65673a00`** ("the pass-class GLM node", `architect/engine-and-seats`). **Machine: node 26.13.0, macOS arm64.** Every number below was run by me on a clean extract; nothing is copied from the Architect's report or from Beam's filing. Scripts and raw logs: `_agents/ernie/deliveries/glm-passclass-2026-11-17/`.

# Beam's three claims — all reproduced

| claim | my run | verdict |
|---|---|---|
| suite 406/406 | `npm test` → **tests 406 · pass 406 · fail 0** | **VERIFIED** |
| cosine 120/120 | `python3 -I tools/mathlab/keyedrng_check.py` → **`normal(): 120/120 compared bit for bit`**, exit 0 | **VERIFIED** |
| tsc ratchet 89 | `node tools/tsc-baseline.mjs` → **"tsc baseline OK: 89 errors (pinned 89)"** | **VERIFIED** |

# The paired 12,000-key comparison — reproduced to the digit

```
$ node --experimental-strip-types tools/glm-bar.ts 12000
pools nfl-pools-fit2023-2025 + passclass nfl-passclass-fit2023-2025: 12000 paired games (per team-game means), class-pool holes 0
metric        pools     GLM    diff   diff%   SE(diff)  z
points        23.250  23.391   0.141    0.60    0.076   1.9
drives        11.038  10.920  -0.118   -1.07    0.018  -6.4
plays         74.972  74.915  -0.058   -0.08    0.053  -1.1
off_plays     60.999  60.885  -0.114   -0.19    0.041  -2.8
pass_att      34.199  34.091  -0.108   -0.32    0.043  -2.5
rush_att      26.554  26.542  -0.012   -0.05    0.029  -0.4
completions   20.579  20.509  -0.070   -0.34    0.031  -2.3
yards        328.604 327.827  -0.777   -0.24    0.570  -1.4
sacks          2.419   2.377  -0.042   -1.72    0.014  -3.0
giveaways      1.102   1.101  -0.000   -0.04    0.009  -0.0
top_dt      1789.823 1789.470  -0.353   -0.02    0.654  -0.5
```

**Every figure matches Beam's and the Architect's.** **VERIFIED.** `class-pool holes 0` confirmed.

# The state-bucket test — the piece nobody had run

## Method (so another seat can repeat it)

I did **not** take the state mix on trust. I instrumented a **scratch copy** of `colors/src` (never the engine) so that `runGame` appends `{down, ytg, ydl, sd, qtr, hs, class}` for every pass play to a module-level array, then ran the **same 12,000 game keys** twice — once on the pools node, once with `passClass` — and dumped both logs:

```
pools: 820,781 pass plays
glm  : 818,188 pass plays
```

Then I bucketed by **down (1–4) × yards-to-go (≤3, 4–6, 7–10, 11+) × field side (own / opponent) × score (≤−7, −7..−1, 0, 1..7, >7)** — 160 cells — and ran a **Kitagawa–Oaxaca decomposition** of the aggregate sack-rate difference into a **rate effect** (different class rates *within* the same state) and a **mix effect** (different state distributions).

## Result

```
sack rate   pools 7.0723%   glm 6.9725%   difference -0.0998 points
rate effect  -0.0965 points   (GLM minus pool WITHIN the same state mix)
mix  effect  -0.0033 points   (different state mix)
sum          -0.0998 points

class mix pools  comp 60.174% / inc 30.768% / sack 7.072% / int 1.986%
class mix glm    comp 60.159% / inc 30.857% / sack 6.972% / int 2.012%
```

**97% of the difference is a rate effect; 3% is the state mix.**

## What that means for the Architect's hypothesis

His hypothesis was that the GLM smooths the sack probability **in the states the sim visits more than the pool's cell mix does** — i.e. a state-mix artifact. **That is refuted.** If it were a mix artifact, the mix effect would dominate and the within-bucket rates would agree. They do not: the GLM's sack rate is ~0.1 points below the pool's *in the same states*. The mix contributes 0.003 of the 0.100 points.

## The drift hypothesis (check 2) — also not the main cause

The report says the sack rate drifted from **6.4% in training (2016–2022)** to **7.0% in 2023–2025**. If the GLM had simply carried the training rate, its held-out sack rate would be ~6.4% and the gap would be **−0.67 points**. The measured gap is **−0.0998 points** — about **15% of the drift**, not the drift. The GLM has largely corrected for the drift (6.97% predicted vs 7.07% actual in the visited states) and what remains is a **residual smoothing bias of ~1.4% relative** (0.0998 / 7.07).

**So the answer to "real bias, state-mix artifact, or drift" is: a real but small rate bias (1.4% relative), not a mix artifact and not the drift.**

# The drives shift — the same phenomenon one step downstream

`drives 11.038 → 10.920` (−1.07%, z −6.4) is the other unexplained number. I paired the per-game totals and correlated the differences:

```
corr(Δdrives, Δsacks)  = 0.224
corr(Δdrives, Δplays)  = 0.614
corr(Δdrives, Δyards)  = -0.057
plays per drive: pools 6.792  ->  glm 6.860   (+1.0%)
```

**The chain is arithmetically coherent:** sacks are the main drive-killer; the GLM produces 1.7% fewer, so drives run ~1.0% longer in plays (6.79 → 6.86), and with total plays essentially fixed (−0.08%) the drive count falls by ~1.0% in the fixed 60-minute clock. `drives × plays-per-drive = plays` holds on both sides (11.038 × 6.792 = 74.97; 10.920 × 6.860 = 74.91).

**The per-game correlation with sacks is only 0.22** because a 0.042-sack per-game difference is mostly noise game to game; the signal is in the mean, not the individual game. The correlation with plays (0.61) is the visible shadow of the same chain.

**INFERRED, and flagged as such:** I have not decomposed the drives shift the way I decomposed the sack rate (that would need drive-ending events logged). The arithmetic above is consistent with the sack shift but is not a proof that sacks are the *only* cause; a drive-ending-mix test (score / punt / downs / turnover / clock) would settle it. **That is the sharper form of the test and I did not build it.**

# Verdict — does it block the GLM becoming the default?

**No.** Three reasons, each measured:

1. **It is small and inside the bar.** Sacks −1.7%, drives −1.1%, points +0.6%; every other metric within noise; **class-pool holes 0**. The Architect's ~10% totals bar is not close to being pressed.
2. **It is a rate bias, not a structural one.** The state-mix hypothesis is refuted (3% mix), and the drift is not the cause (15% of the gap). What remains is a 1.4% relative smoothing difference in one class rate.
3. **It is mechanistically coherent.** The drives shift follows from the sack shift through plays-per-drive in a fixed clock, so it is one phenomenon, not two unrelated mysteries.

**But it should be recorded, not smoothed.** When the Owner rules on making the GLM the default, the honest sentence is: *"the pass-class node is verified as built; it produces 1.7% fewer sacks and 1.1% fewer drives than the pool node on the same 12,000 keys, caused by a 1.4% relative under-prediction of the sack class rate, not by the state mix or the 2016–2022→2023–2025 drift."*

**Residual risk, stated plainly (INFERRED):** a 1.4% sack-rate under-prediction compounds over a season — 0.042 sacks/game × 17 games ≈ 0.7 sacks per team-season, which is small but not zero, and it is *systematic* (the same sign every game). If the Owner wants the GLM as the default for long-run statistics (season-long sack totals, QB pressure metrics), that bias is worth one more pass on the sack class before the switch. For game-level play it is invisible.

# What I did not check

- **The six planted faults** (check 5) — I did not re-plant them; **REPORTED by the Architect**, not verified by me.
- **The 407-vector TypeScript/Python bit-identity** (check 3) and the loader guards — I ran the suite that covers them (406/406) but did not re-run the vector test in isolation.
- **The sampler's chi-square and the thin-cell fallback** (check 4) — covered by the suite, not separately measured.
- **The lambda seam monotonicity** (check 7) — not run; I verified only that nothing in the shell enables the node.
- **The drive-ending mix** — the sharper form of the drives test (§ above).
- **The 2016–2022 pack** — I ran the 2023–2025 pack only.

# What this means for the shell re-pin

The shell is at `5c808472`; the tip is `65673a00`, one commit later (plus `f9991424`). **Nothing in this verification argues against the re-pin** — the node is off by default and the shell's `runGame` path is bit-for-bit unchanged without `passClass`. The re-pin remains the Owner's call, and the shell's own re-pin work (five paths, including the two small pass-class test packs) is unaffected by the sacks finding.