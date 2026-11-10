# OR — Basketball multisport generalization design review (Task B)

SPEAKER: or | ROLE: Council seat | TASK: Task B — Review _agents/basketball/README.md | DATE: 2026-11-10

## Verdict: WELL-DEFINED STRUCTURE; KEY GAPS IN DUTY CALIBRATION

### Is the formula truly sport-agnostic?
**Yes, structurally.** The five inputs (positions, duties, HAVE, NEED, weights + λ + cuts + floor) are completely decoupled from football terminology. The formula `tier(M + 0.4·S)` where M = max gap, S = sum of remaining gaps operates purely on the numerical gap vectors. This design is sound: swap in basketball positions/duties and it runs without code changes.

### Is the basketball duty sketch sensible?
**Reasonable first cut, but under-specified for calibration.** The 12 proposed duties cover the major basketball skill dimensions, but:

**Missing / underdeveloped:**
1. **No skill weight calibration.** Football has PBLK weight 1.55 and explicit CARRY weight. Basketball needs duty weights — which duties are "load-bearing" (like PBLK for OL)? Is rim protection a 1.55 or a 0.8? The sketch says "calibrated the same way" but gives no mechanism.
2. **No λ validation.** λ=0.4 was fit to football's tier-error profile. Basketball's tier structure (if any) may need different λ. The document should state λ is sport-tunable, not fixed at 0.4.
3. **Cut points (1/4/9) assumed.** Football's 0/2/6/12 tiers map to those cuts. Basketball's penalty tiers might be 0/3/7/15 or similar — cuts are a calibration parameter, not universal.
4. **Floor semantics.** Football's cross-side floor (offense↔defense) becomes "cross-role floor" (guard↔big). The threshold (6) is football-specific; basketball needs its own.
5. **Duty overlap.** "perimeter defense" and "3pt shooting" are partially redundant (3&D wings). "finishing at the rim" overlaps with "post scoring" and "rebounding". Football's 17 duties were honed to minimize overlap; this set has visible redundancy.
6. **PG/SG/SF/PF/C duty mapping is sketchy.** "point guard demands ball handling 10 and playmaking 9" — what about PG's 3pt shooting? PG's rim protection? The HAVE/NEED rows need full rows for all 12 duties per position, not cherry-picked highlights.

### What's missing for "well defined"?
| Item | Status | Notes |
|------|--------|-------|
| Complete HAVE matrix (5 pos × 12 duties) | **Missing** | Only 2 example cells shown |
| Complete NEED matrix (5 jobs × 12 duties) | **Missing** | Only 2 example cells shown |
| Duty weights (12 values) | **Missing** | Critical — determines formula sensitivity |
| λ value for basketball | **Missing** | Assumed 0.4, should be calibrated |
| Tier cut points | **Missing** | Assumed 1/4/9, sport-specific |
| Cross-role floor threshold | **Missing** | Assumed 6, sport-specific |
| Validation table (Owner's "ground truth" flex prices) | **Missing** | No basketball equivalent of the 99-rule table |

### My creative contribution (from my from-scratch derivation work)
My nested Lp norm design (`tier(Lp_norm_phys^q + Lp_norm_tech^q)`) is inherently more sport-agnostic than Z.ai's `tier(M + 0.4·S)` because:
- **Channels** (physical vs technical) map to any sport's body/skill split
- **Exponents p, q** replace the single λ, giving independent control over worst-gap vs aggregate-gap in each channel
- **No hard-coded 0.4** — the exponents are calibrated per sport
- **Proven structure** in my sweep: p_phys=2, p_tech=1, q=3 gave competitive results

This suggests the basketball folder should adopt a **parametric norm family** rather than locking in `M + 0.4·S`.

### Labels
VERIFIED: README.md structure read; 5 inputs identified as sport-agnostic.
INFERRED: calibration parameters (weights, λ, cuts, floor) are sport-specific and must be declared as inputs, not constants.
REPORTED: duty set has redundancy; no validation table exists.

---END---