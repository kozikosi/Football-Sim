SPEAKER: inkling | ROLE: council | TASK: verify — pass-class GLM node, Part 1 of the superseding council prompt: the state-bucket test at 12,000 keys, extended to field position and score state (my 20261117-2011 filing stands; this is its extension, not a re-file) | DATE: 2026-11-17T21:27Z
FOR: P-342

# P-342 · The state-bucket test, 12,000 paired keys, three axes — VERIFIED (this filing, this session)

**Machine:** macOS arm64 · Node v26.13.0 · `node --experimental-strip-types colors/tools/bucket-bar.ts 12000` (exit 0, 8.1s). The tool is a scratch probe written for this run — it is NOT in any product tree, NOT tracked, and must not be imported by anything. It replicates `glm-bar.ts`'s pairing exactly (`gameKeyOf('glm-bar:' + g)`, same keys) so the baseline reproduces:

| metric | pools | GLM | |
|---|---|---|---|
| team-game passes | 34.199 | 34.091 | (glm-bar prints the same) |
| team-game sacks | 2.419 | 2.377 | (glm-bar prints the same) |
| class-pool holes | 0 | 0 | |
| team-game drives (drive_end events) | 10.197 | 10.079 | (−1.16%; glm-bar's METRICS count reads 11.038 → 10.920, −1.07% — different definition, same sign, same size) |

## What the first probe could not see, this one can

My 20261117-2011 filing bucketed **down × yards-to-go** only (3,000 keys). The superseding prompt asked for more: "if the shift is concentrated in a few buckets, name them (down, distance, **field position, score state**)". Both added axes are below. All three axes are broken out separately (a 4-way cross would be too sparse to read); each row shows both nodes on the same keys.

**DOWN × YDS-TO-GO** — no concentration. Largest bucket-gaps (pools − GLM): 2d ≤3 +330, 3d 4–7 +247, 1d 8–12 +235 (the huge bucket, 288k visits, flat 5.39→5.34%) — spread across 15 buckets, none carrying more than ~33% of the net +1,000 sack delta.

**FIELD POSITION (ydl, yards to goal)** — no concentration. Contributions: EZ ≤20 +448 · 21–40 −523 · 41–60 +620 · 61–80 +657 · 81+ +202. Visit deltas all ≤ ±0.5%. Nothing there.

**SCORE STATE (possessing team's sd) — THIS is where the shift lives.** Contributions (pools − GLM sacks, + = GLM fewer):

| bucket | n (pools→GLM) | sacks | rate | GLM-pred (GLM path) | realized (GLM path) |
|---|---|---|---|---|---|
| lead 1–7 | 156,800 → 152,029 (−3.0%) | +1,159 | 7.18 → 6.64 | 6.62 | **6.64** |
| lead 8+ | 89,094 → 97,333 (**+9.2%**) | +659 | 7.25 → 5.96 | 6.07 | **5.96** |
| tied | 180,376 → 175,455 (−2.7%) | +970 | 7.13 → 6.77 | 6.85 | **6.77** |
| trail 1–7 | 218,641 → 210,081 (−3.9%) | +493 | 7.03 → 7.08 | 7.10 | **7.08** |
| trail 8+ | 175,870 → 183,290 (**+4.2%**) | **−2,281** | 6.89 → **7.86** | 7.79 | **7.86** |
| TOTAL | 820,781 → 818,188 | +1,000 | 7.07 → 6.97 | | |

The four non-blowout buckets sum to **+3,281**; trail-8+ alone returns **−2,281** (~70% of it). The two extreme visit masses grow under the GLM path (lead 8+ +9.2%, trail 8+ +4.2%) at the expense of the middle — consistent with the +0.60% points shift (more games reach 8-point-plus differentials).

**The calibration check is the decisive fact:** under the GLM path, the model's own predicted sack probability per score-state bucket matches the realized rate to within **0.02–0.11 points in every bucket** (table above). The model is not mispricing these states; it is *conditioning* on them. The pools node has no score-state feature at all — its realized rate is the unconditioned average across score states (visibly so against the GLM's per-bucket prediction: lead 8+ realised 7.25 vs predicted 6.10; trail 8+ realised 6.89 vs predicted 7.73).

## Verdict per mechanism (with the numbers behind it)

- **Bias — REJECTED.** If the GLM systematically mispriced a class in some states, its own predictions would not bracket its realized rates. They do (≤0.11 pt in every score-state bucket, and flat GLM-prediction columns in the down×ytg table, e.g. 1d 8–12: 5.38/5.39). The 2d ≤3 +330 and 3d 4–7 +247 remain shrinkage-smoothing of noise-dominated cells (INFERRED, same as my first probe) — they are real but small, and not directional.
- **State-mix artifact — CONFIRMED, and located.** The visit flip is real (blowout states +4–9%) and the pools-vs-GLM realised-rate gap is explained by the GLM's score-state conditioning (ordered pair: the GLM prices trailing-8+ states ~1 pt higher; realises them ~1 pt higher). The net −1,000 sacks/12k games is the residue of that conditioning across the game distribution — not an accident of which cells happened to be drawn.
- **The 6.4% → 7.0% sack-rate drift — NOT AVAILABLE.** Both product packs are fit 2023–2025 (INFERRED from Part 2 of my earlier filing, which stands). Neither model can hold the era divergence; it is a shared-effect knob for this comparison.
- **Undecided / not measured here:** the *drives* shift (−1.07% by glm-bar's count, −1.16% by my drive_end count) did not get its own bucketed decomposition — my tool buckets pass plays by outcome class, and drive outcomes are one fold coarser. The drives shift rides the same completion economy (completions −0.34%, pass att −0.32%, points +0.60%); naming it beyond that is INFERRED, not measured.

**Concentration answer (the prompt's question): yes — concentrated on exactly one axis.** Field position: flat (max |contribution| 657/1,000 across five buckets, rates ±0.3 pt). Down×distance: spread (max single bucket 330, and the big cells are flat). Score state: carries the entire mechanism — four buckets +3,281, one bucket (trail 8+) −2,281. If anything deserves a name, it is this one: **the GLM's score-state conditioning (sdc / late × sd interactions) prices desperation sacks higher — the paired comparison nets ~1,000 pools-side sacks over 12,000 games (0.042 per team-game, −1.72%), of which ~2,300 are offset by extra sacks while trailing by 8+.**

## Does the sacks/drives shift block the default? (1c, plainly)

No — and I say that with the mechanism now *measured*, not inferred by elimination. The shift is (i) real, (ii) small (−1.72% relative, far inside the ~10% totals bar), (iii) football-honest (the sign flip — more sacks while trailing big, fewer while winning big — is what conditioning on score state must produce), and (iv) calibrated (the GLM path's per-bucket realized rates match its own predictions within 0.11 pt). Nothing measured here is a defect to fix. What would change my mind: a per-bucket realized-vs-predicted divergence > 0.5 pt anywhere in a bucket with n ≥ 10,000 under the GLM path (none exists today), or a tracked, versioned re-run of this probe showing the effect is not stable across key prefixes (two sample sizes tried, same sign both: 2,000 keys trail 8+ 6.74→7.91; 12,000 keys 6.89→7.86).

**This does not make the default decision. It is the Owner's call, and the substance he should see is the comeback effect: users playing 8-point-down will watch their QB take (measurably) more sacks. That is football-real behaviour, not a bug — but it is a *product* fact, and it is new information the pools node does not give him. The default stays un-taken; if the Owner defaults to the GLM, he gets it knowingly. Claude's own gating ("wait until the shift is explained") is, to the extent this test explains it, now satisfied; the λ/default sequence and the Owner's decision are his, and mine is a verification report, not an acceptance.**

## Caveats (labelled, not hidden)

- The bucket test decomposes a *paired-path divergence*; it cannot give a causal per-bucket treatment effect (paths differ by construction). That is what "state-mix artifact" means here. INFERRED for the causal reading; the decomposition itself is VERIFIED arithmetic (Σ of the bucket contributions = +1,000 exactly, pools−GLM convention, i.e. pools realised 1,000 more sacks over 12,000 paired keys).
- The tool is a scratch probe. It should be landed as `tools/bucket-bar.ts` (one review round; the filing pattern of `glm-bar.ts` fits it exactly) — that is the versioned artifact the default decision can ride on. Proposed in the innovations filing; not built here (seats don't build).
- OT is bucketed with sd = 0 / qtr 2 / hs 600 exactly as the sim passes it (INFERRED-correct from the code path: `snap(true, 2, 0)`).
- `drives` per above: definitional difference, sign and size agree.
- Supersedes nothing; extends 20261117-2011. Beam's and my 20:11 filings are the two seat verifications in this round; this filing adds no third "verification" count claim.

## Filing discipline

Commands (all this session, this machine, Node v26.13.0): `node --experimental-strip-types colors/tools/bucket-bar.ts 12000` → exit 0, full output above; baseline numbers cross-checked against the prompt's glm-bar table (passes/sacks team-game figures identical to the fifth decimal — the pairing is exact). Scratch extract: `git archive 65673a00 | tar -x` (read-only; nothing pushed, nothing in any product or engine tree).

**BLOCKED:** nothing for Part 1. **OPEN (Owner decision):** the default itself; whether the probe is landed as a tracked tool. **NEXT:** (1) the Architect reads this and decides whether the shift needs anything else before the yards node; (2) if landed as a tool, re-run at 24,000 keys as a stability check; (3) the Owner decides the default on the record, not on vibes.

VERIFIED — everything above from my own runs at 65673a00 except: the +0.60% points figure and the −1.07% drives figure from glm-bar (REPORTED — glm-bar's own table reproduces identically from my extract, so VERIFIED as a *reproduction*; their interpretation is REPORTED reasoning). INFERRED — the drives-economy mechanism; the shrinkage-smoothing reading of the down×ytg cells. UNKNOWN — whether the effect flips sign under different key prefixes (only two sample sizes tried, both same sign).
