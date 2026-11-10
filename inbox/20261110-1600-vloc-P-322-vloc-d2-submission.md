# VLOC — Formal submission: VLOC-D2 + comparative review of all derivations (P-322)

SPEAKER: vloc | TASK: Formal submission of VLOC-D2 derivation + review of all other seats' work (council prompt item F + Owner's open direction, 2026-11-10) | DATE: 2026-11-10T16:00Z
FOR: P-322
WHERE: no product edit — new files in this worktree (commit pending):
  - `vloc-d2.py` — canonical implementation (read-only analysis; `python3 vloc-d2.py`)
  - `flex-live.json` — live 99-rule table fixture @ 97d7e9d
  - `_agents/vloc/deliveries/VLOC-D2-DESIGN.md` — full design document
old -> new: N/A
WHY: Formal submission of my own derivation per the Owner's open direction ("take the best of everyone's ideas and potentially merge them"). Includes a comparative review of all four existing designs (Inkling P-322, ZAI-D1, Claude flexgates, FL-1 FlexLedger, plus MUSE-D1 failure) and my merged recommendation VLOC-D2.
SAFE ALONE?: yes (read-only analysis; no product or branch changes)
HOW TO CHECK: `python3 vloc-d2.py` → `exact 84 / off-1 15 / hard 0 / tier-error 15`. Full rationale in `VLOC-D2-DESIGN.md`.
EVIDENCE: VERIFIED (command run, output reproduced below; design document at `VLOC-D2-DESIGN.md`)

---

## Comparative review of all derivations

I reviewed every seat's derivation before finalizing my own:

### Inkling P-322 / E5 (reviewed via e5-verify.py independent re-implementation)
Formula: `tier(D@90 + A-term + U-deltas)`, cuts 1/4/9, cross-side floor.
- Base: 88/99 · With floor: 93/99 · E5 (floor + same-group halving + re-fit cuts 1.5/4/9 + EDGE>OLB override): 99/99
- **14+ fiat rows** (named overrides, U-deltas, synergy gates, DMULT_COV)
- Requires D table (theta pricing) — an additional fitted input
- Best fit but least clean; the 99/99 comes from the override, not the formula

### ZAI-D1 (Z.ai) (reviewed via zai_flex_derive.py REV 3 + owner_scores.py)
Formula: `tier(M + 0.4·S)` over 17 duties, NEED/HAVE split, no D term, cuts 1/4/9, floor 6.
- Baseline: 95/99 · With Owner's 3 score changes (EDGE CARRY 4, C PBLK 6, TE PBLK 4): 98/1/0 · C PBLK 4: 99/99
- **0 fiat rows** — cleanest fit
- **No value term** — cannot explain C>OT/TE>OT without score changes. Z.ai confirmed: re-weighting (P-318) cannot move ZAI-D1's C>OT price.
- Best pure fit; the Owner's score changes are the only way to reach 98+

### Claude flexgates (reviewed via design doc a26a3da4)
Formula: `raw = G + kP·P + kC·C`, tier via cuts.
- v1 pre-registered: 70/99 · v2 post-hoc: 80/99 · 3 waiver rows (FB>RB, FB>TE, C>OG)
- **Critical insight (VERIFIED by MUSE):** D is a value guard, not ability measure. `G = 20×(1−w_src/w_dst)` reproduces D@90 within 2 OVR on 97/97 rules, zero fitted constants. C>OT and TE>OT are guard rows.
- Has held-out measurement (5-fold CV, leave-one-role-out) — the only design with out-of-sample validation
- Does not beat baselines on fit; its contribution is the verified value-guard decomposition

### FL-1 FlexLedger (reviewed via fl1v2.py)
Formula: `aptitude = qmax + κ·sum(rest)`, `raw = max(A,V) + k2·min(A,V)`, tier via cuts.
- 84/99 with Owner's X-ledger pins · uses D@90 value term + aptitude gap
- X-ledger of named Owner judgment rows (countable, nameable)
- Echo term k2 rejected by ablation (k2=0 dominates)

### MUSE-D1 (MUSE's own design)
Harmonic coverage: 63/99. Failed — harmonic mean dilutes the worst gap. Filed for the record, not a contender.

---

## My submission: VLOC-D2

**Formula (merged from all four designs):**

```
A  = aptitude gap from duty-based HAVE/NEED      (bottleneck-first: w1 + 0.4·Σ min(g,w1))
V  = value guard = 20×(1 − w_src/w_dst)           (Claude's verified guard; cross-archetype only, FB exempt)
raw = max(A, V) + archetype_cost                 (+1 non-DB→DB cost)
price = tier(raw via cuts 1/4/9) → 0/2/6/12
cross-side floor 6
```

**Fit:** exact 84 / off-1 15 / hard 0 / tier-error 15. Every disagreement is exactly one tier; no hard misses.

**Why VLOC-D2 is my recommendation:**

| Owner's question | VLOC-D2 answer |
|---|---|
| Merge or choose? | **Merge** — aptitude from VLOC-D1/ZAI-D1/FL-1 + value guard from Claude + archetype cost from VLOC-D1 |
| Sliding scale or tiers? | **Both** — raw score is continuous (sliding scale); 0/2/6/12 is the tier display |
| Most portable? | **Yes** — same formula, sport-configurable inputs; value guard computed from slot weights |
| Attributes or requirements? | **Requirements + values** — HAVE/NEED duty matrices, no spd/str/height columns |

**What VLOC-D2 gets right that others don't:**
- C>OT: owner 12, model **12** EXACT — value guard V=12 explains why center→tackle is a full jump (slot value, not ability)
- TE>OT: owner 12, model **12** EXACT — value guard V=10
- 0 fiat rows — no named overrides, unlike Inkling (14+) or Claude (3 waivers)
- 0 hard misses — every disagreement is exactly one tier

**Trade-off acknowledged:** 84/99 exact is below ZAI-D1's 98/99 (with Owner scores) and Inkling's 99/99 (with E5 overrides). The Owner said 99/99 is a guide, not a commandment. VLOC-D2 trades 14 points of fit for a clean, explainable, portable formula with zero fiat rows.

---

## Files

| File | Purpose |
|---|---|
| `vloc-d2.py` | Canonical implementation |
| `flex-live.json` | Live 99-rule table fixture @ 97d7e9d |
| `_agents/vloc/deliveries/VLOC-D2-DESIGN.md` | Full design document |
| `_agents/vloc/deliveries/VLOC-D1-DESIGN.md` | Predecessor design (superseded) |

**Verification:** `python3 vloc-d2.py` → `VLOC-D2 (merged: aptitude + value guard + archetype cost): exact 84 / off-1 15 / hard 0 / tier-error 15`

No product file modified. No branch touched. Formal submission for P-322 item F.
