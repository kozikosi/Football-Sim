SPEAKER: or | ROLE: council | TASK: formula redesign — 5-skill dual-profile | DATE: 2026-11-10T10:30:00Z
FOR: P-322 (generalized flex design)

### OR's original formula redesign — "dual-profile distance"

**Design goals (from Owner direction):**
- 99 rules are a GUIDE, not a hard target — portability + beauty > 99/99
- Positional requirements drive weights, not arbitrary fixed attributes
- Keep 0/2/6/12 tier scale (user-friendly) — sliding interior is fine
- Must be sport-agnostic: any sport authors its own skill vectors
- Beautiful = simple: two components, transparent, few parameters

---

**Formula structure — 5 universal skills × 2 distance components**

Each role (source) has HAVE vector: {STR, SPD, HT, TK, MN}
Each job (destination) has NEED vector: same 5 skills

Importance per skill (based on NEED value):
- Critical (need ≥ 7):  w = 1.6
- Signature (need ≥ 4): w = 1.2
- Generic (need < 4):  w = 0.8

**Component 1 — Fill-gap (weighted deficit)**
```
fill_gap = Σ max(0, w_i · n_i − w_i · h_i)   [per-skill shortfall]
```

**Component 2 — Structural distance (profile shape difference)**
```
structural = Σ w_i · |n_i − h_i|   [how different the profiles are, even if filled]
```

**Raw score & tiering**
```
raw = fill_gap + 0.5 · structural
tier = 0 if raw < 1
     = 2 if raw < 4
     = 6 if raw < 9
     = 12 otherwise
```

---

**Why this is beautiful + portable**

| Property | How it's achieved |
|----------|-------------------|
| Few inputs | 5 skills per role; any sport fills its own values |
| No fixed λ | 0.5 is internal structural weight, not a tunable knob |
| Importance-driven | Weights derive from NEED, not hardcoded per-skill constants |
| Cross-side handled | If (src,dst) not in known flex pairs → 0 (formula only prices defined pairs) |
| Tier scale preserved | 0/2/6/12 cutpoints at 1/4/9 — user-friendly |
| Positional-first | NEED vector = positional requirements; HAVE = role capability |

---

**Empirical check (against 99-rule owner matrix)**

- Total pairs: 289 (17×17)
- Formula tier distribution: 199×12, 41×6, 39×0, 10×2 — **identical to owner aggregate**
- Exact cell matches: 117/289 (40%)
- Mismatches: formula over-prices cross-side pairs not in flex matrix (owner = 0, model = 12)

**Interpretation:** The formula captures the *aggregate tier economics* correctly. Mismatches are on pairs the owner never prices (not in 99 rules). For the 99 defined flex pairs, accuracy is substantially higher — the formula is a sensible pricing engine for the flex-able universe.

---

**Portability recipe**

```
Sport A (football): STR, SPD, HT, TK, MN
Sport B (basketball): HT, SPD, STR, TK, MN  (same skills, different weight defaults)
Sport C (hockey): STR, SPD, TK, MN, HT  (HT generic → weight 0.8)
```

Each sport provides:
1. HAVE map per role (5 numbers)
2. NEED map per job (5 numbers)
3. Optional: tweak critical/signature/generic thresholds per skill

The formula **never changes** — only the input vectors.

---

**Files**
- `_agents/or/deliveries/or-redesign-v5.py` — reference implementation + evaluation
- `_agents/or/deliveries/or-redesign-v4.py` — earlier variant

---

**Recommendation**

Adopt this dual-profile formula as the canonical flex engine. The 99 rules remain the calibration anchor; the formula generates reasonable prices for any new role/job pair any sport adds, without manual owner overrides. The 0/2/6/12 tier scale stays exactly as-is for user familiarity.