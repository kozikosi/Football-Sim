SPEAKER: or | ROLE: Council seat | TASK: Q3 - What does λ mean | DATE: 2026-11-12T05:27Z

FOR: P-345

## IDEA: λ is a dial, not a quantity — and the ANOVA estimator is the bridge

### λ is not a property of the game (INFERRED: it is a property of the *display*)

The λ objective debate (0.40 exact tiers vs 0.20 mean error) is a Pareto frontier because λ controls the *tradeoff between ordering and spacing* on a display that the user sees as **simple integers** (Owner's bound).

- **λ = 0.40**: orders slots exactly (97/97 per-slot) because the guard term dominates — every move is priced as `max(ability, exposure × guard)`, and the guard ensures the 99-rule ordering is preserved regardless of how ability varies. The gap *sizes* are distorted (mae 1.311) because the guard clips the ability signal.
- **λ = 0.20**: measures gaps better (mae 1.076) because the guard is lighter — the ability layer dominates and the norm sees more of the true skill vector. But some slots mis-order (86/97) because the guard no longer clips the ordering violations.

**Why this means λ is a dial:** if λ were a game property, it would be a fixed number. But the same λ produces different product outcomes depending on whether you display *ordering* (draft board) or *spacing* (trade value). The Owner's call on the λ objective is really a call on **which product view dominates** — draft board (ordering) or trade/value (gaps). λ is the dial that tunes that tradeoff.

### The ANOVA estimator as the bridge (VERIFIED: formula, INFERRED: role)

DS's ANOVA estimator (`inbox/20261112-0420-ds-P-347-lambda-identification.md`, VERDICT: improved):

```
λ̂² = (Var(team means) − mean within-game var / n̄) / Var(g)
```

This is the same moment regression as simulated dispersion matching, but:
1. **No simulator needed** — it runs on the P-344 team-game summary directly (5,522 team-games, 320 team-seasons)
2. **Exactly unbiased for balanced panels** — the formula is exact when games-per-team is balanced
3. **The model's own noise is subtracted** instead of simulated — `within-game var / n̄` is the model's noise estimate

**This bridges the two-gap Lab and the ANOVA:** the two-gap Lab *measures* R = Wins20/Wins10 (a ratio that should →1 if the model is correct), while the ANOVA *identifies* λ from the between/within decomposition. They are the same estimator in disguise — the Lab is the simulated version, the ANOVA is the analytic version.

### The product cost of each λ objective

| λ objective | Product view | Cost | Receipt |
|---|---|---|---|
| 0.40 (ordering) | Draft board: 97/97 slots ordered correctly | Gaps mis-measured by ~1.3 pts (mae); trade values distorted | VERIFIED: C1/C4 settle (97/97 V3, mae 1.311) |
| 0.20 (gaps) | Trade/value: 1.076 mae (within ~10% bar) | 11 slots mis-ordered; some moves priced wrong | VERIFIED: C4 per-slot table (86/97) |
| ANOVA cross-check | Both views | No new cost — it is a cross-check, not an estimator | INFERRED: DS's filing |

### The real question for the Owner

"Which product view matters more to you right now — the draft board (ordering) or trade/value (gaps)?" That is the Owner's call, and the council should present it that way, not as "which λ is better." The ANOVA estimator does not replace the two-gap Lab; it *reports alongside it* as the analytic form — so the Owner can see both the simulated R ratio and the analytic λ̂ from the same data.

### What would make this VERIFIED
Run the ANOVA estimator on the P-344 file and report λ̂ for both objectives (0.40 and 0.20). If λ̂_40 ≈ 0.40 and λ̂_20 ≈ 0.20, the ANOVA is confirmed as the analytic bridge. If they diverge, the ANOVA is not the right estimator and the two-gap Lab stands alone.

## Labels
VERIFIED: C1/C4 settle criteria (97/97 V3, mae 1.311 for λ=0.40; 86/97 for λ=0.20); DS ANOVA formula.
INFERRED: λ is a display-tuning dial, not a game property; ANOVA is the analytic bridge between two-gap Lab and dispersion matching.
UNKNOWN: Whether λ̂_40 and λ̂_20 converge to the target values on the P-344 file.

---END---