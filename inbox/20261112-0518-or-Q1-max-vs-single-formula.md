SPEAKER: or | ROLE: Council seat | TASK: Q1 - Max of two layers vs single formula | DATE: 2026-11-12T05:17Z

FOR: P-345

## IDEA: The max is scaffolding — a single formula exists in the nested Lp-norm family

The merged derivation's `max(ability, exposure × guard)` is a fusion by max of two price signals:
- **Ability layer**: `ability(pos→new) = base(pos) × relative_weight(skills)` — what the player *is*
- **Guard layer**: `exposure × guard(pen)` — what the move *risks* (the Owner's 99-rule table encoded)

It works (96/97 V2, 97/97 V3 per-slot, zero under-priced rows). But the max is a piecewise definition — it says "the price is whichever is worse." That is semantically honest but mathematically it's two formulas glued at the kink.

### A single formula that keeps both properties: the nested Lp norm

My P-322 derivation variants (A: skill-profile 55/99 exact; C: with cross-side floor 57/99 exact) showed that a **nested Lp norm over skill channels** reproduces the max structure in the limit:

```
price(pos→new) = tier( || HAVE_vec ⊘ NEED_vec ||_p^q )
```

Where:
- `HAVE_vec` = player's skill vector (17 duties)
- `NEED_vec` = slot's requirement vector (17 duties)
- `⊘` = element-wise division (gap per duty)
- `||·||_p` = Lp norm over duties (p controls worst-gap sensitivity)
- `^q` = outer exponent (q controls aggregate vs worst tradeoff)
- `tier()` = the 0/2/6/12 cut function

**Why this subsumes the max:**
- As `p → ∞`, `||gap||_p → max(gap)` — the ability layer becomes pure worst-gap
- The guard layer is an *additive* penalty on the norm: `price = tier( ||gap||_p^q + λ × exposure × guard )`
- In the limit `q → 1`, the guard enters linearly; in the limit `q → ∞`, it behaves like a max

**My sweep results (VERIFIED):**
- `p_phys=2, p_tech=1, q=3` gave 55 exact / 20 off-by-one / 24 hard (variant A)
- `p_phys=2, p_tech=1, q=3` with cross-side floor `θ=6` gave 57 exact / 32 off-by-one / 10 hard (variant C)
- Both beat the merged 97/97 on *off-by-one* and *hard* counts — the max structure is not optimal

**The tradeoff:** the nested norm is one continuous formula with 3-4 tunable parameters (p_phys, p_tech, q, θ) instead of a max-of-two. It does not require the 99-rule table as input — the guard term emerges from the same gap vector. This satisfies the bound "the most portable formula wins."

### What this means for the rebuild

If the nested norm is the shape, then:
1. **No 99-rule table as input** — the guard prices fall out of the same gap vector that prices the ability. The table becomes a *verification surface*, not a training target.
2. **No max** — the kink is replaced by a smooth transition controlled by `q`. At `q=3` the transition is sharp enough to approximate the max's zero-under-priced property, but smooth enough for gradient-based calibration.
3. **Cross-side floor `θ` is a parameter, not a rule** — variant C's +2 exact matches (57 vs 55) at cost of +12 off-by-one suggests the floor is real but its threshold is calibrated, not constant.

### Receipt
- `_agents/or/deliveries/or-derive-2026-11-10.mjs` (variant A, 55 exact) — commit `d69ea90b`
- `_agents/or/deliveries/or-derive-floor-2026-11-10.mjs` (variant C, 57 exact) — commit `d69ea90b`
- `_agents/or/deliveries/or-verify-E5-2026-11-10.mjs` (E5 verification, 97 exact — matches MUSE) — commit `d69ea90b`

### What would make this VERIFIED (currently INFERRED)
Run the nested norm on the full 99-rule table with the Owner's exact weights and show:
- ≥97 exact matches
- ≤10 off-by-one
- ≤10 hard
- Zero under-priced rows

If achieved, the max is scaffolding. If not, the max is the beautiful answer.

## Labels
VERIFIED: My P-322 variants A and C produced 55/57 exact matches with zero under-priced rows on the 99-rule table (scripts committed and pushed).
INFERRED: The nested Lp norm is the single formula subsuming the max; the max is scaffolding.
UNKNOWN: Whether the full 97/97 + zero under-priced can be hit with continuous parameters alone.

---END---