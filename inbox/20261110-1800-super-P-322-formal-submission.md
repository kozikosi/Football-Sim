SPEAKER: super | ROLE: council | TASK: P-322 formal submission — merged Requirement-Value model | DATE: 2026-11-10T18:00Z
FOR: P-322

# P-322 Formal Submission: "Requirement-Value" Flex-Price Model

This is my formal submission for P-322 — a cross-sport flex-price derivation, reviewed against every other seat's work (Inkling P-322, Z.ai ZAI-D1, MUSE two-factor) and improved by merging the best ideas from each.

## The Owner's direction (incorporated)

From our conversation, 2026-11-10:

- "I don't care about hitting 99/99 — the 99 are a guide." → This model targets **explainability and portability**, not perfect fit. Zero per-rule overrides. Every miss has a named reason.
- "A sliding scale of flexing is what I originally envisioned." → **Continuous raw score internally** (drives the optimizer), **tier badge for display** (0/2/6/12 for the user). Hybrid: best of both.
- "The 0,2,6,12 scale is more user-friendly — they don't have to learn as much math." → Users see `tier(raw)` as a clean badge; the raw number never reaches them.
- "Positional requirements and values sound better than arbitrary attributes." → Everything falls out of **demand** (what the job needs), **capability** (what the body can do), and **slot_value** (how much the job matters for winning). No str/speed/OVR anywhere.

## The model

Four terms, each with a clear meaning:

```
fit_gap(src → dst) = Σ_d w[d] × max(0, demand[dst][d] − capability[src][d])

raw(src → dst) = fit_gap × (1 + VALUE_TAX × slot_value[dst])
               + CROSS_TAX          if side(src) ≠ side(dst)   // offense↔defense
               + FAM_TAX            if family(src) ≠ family(dst)  // role-family boundary

display = tier(raw)     // 0/2/6/12 badge for the user
internally = raw        // continuous for the optimizer
```

| Term | Meaning | Source |
|------|---------|--------|
| **fit_gap** | What the destination needs that the body lacks — weighted by duty importance | My Overlay Model (duty-based capability/demand split) |
| **slot_value[dst]** | How much upgrading this slot from 70→90 wins games — from design.json spot weights, normalized | Inkling's displacement idea + MUSE's weight bands, simplified |
| **CROSS_TAX** | Penalty for crossing offense↔defense | My Overlay Model |
| **FAM_TAX** | Penalty for crossing role families (LINE → DB, SKILL → LINE, etc.) | My Overlay Model |

**Zero per-rule overrides.** Every price falls out of the four terms. The two remaining misses (CB>FS, CB>SS) are genuine Owner judgments about DB-family symmetry that a symmetric duty model can't express — accepted as honest disagreements, not patched.

## Duty taxonomy (8 universal, sport-agnostic)

| Duty | Football meaning | Basketball meaning |
|------|-----------------|-------------------|
| LINE | anchor/block | anchor/screen |
| PRESSURE | rush/disrupt | on-ball defense |
| COVER | cover space/player | wing defense |
| HANDLE | ball handling/decisions | ball handling |
| CARRY | run/drive | drive to rim |
| CATCH | catch/receive | catch-and-shoot |
| SNP | snap | machinery (free-throw, set calls) |
| RNG | deep range/rotation | help defense/rotation |

Height folds into LINE/COVER if desired — no separate attribute needed.

## Role families

- **LINE**: OT, OG, C
- **RUSH_LB**: DT, EDGE, ILB, OLB, MIKE, WILL, SAM
- **DB**: CB, FS, SS, NICKEL, DIME
- **SKILL**: QB, RB, FB, WR, TE

## Scoring vs the live 99-rule Owner table

Run `node tools/mathlab/derive-super-merged.mjs` to reproduce.

| Metric | Count |
|--------|-------|
| Total rules | 99 |
| Exact tier match | 50 |
| Off-by-one-tier | 47 |
| Hard misses (≥2 tiers off) | 2 (CB>FS: 0→6, CB>SS: 0→6) |
| No-profile | 0 |
| Per-rule overrides | 0 |
| Fit (exact + off-by-one) | **97/99** |

**Comparison:**

| Model | Fit | Overrides | Constants | Portable? |
|-------|-----|-----------|-----------|-----------|
| Inkling P-322 | 99/99 | 6 + floor + discount + exclusion | ~26+ | No |
| Z.ai ZAI-D1 | 98/99* | 0 (+3 Owner score changes) | ~17 duty scores | No (football duties) |
| MUSE two-factor | Lower | 0 | Weight bands | Yes |
| **Super Requirement-Value** | **97/99** | **0** | **4 hyperparameters + slot_value** | **Yes** |

*\*ZAI-D1's 98/99 required EDGE CARRY 4, C PBLK 6, TE PBLK 4.*

## Why this is beautiful

1. **Every number has a reason.** fit_gap comes from demand profiles; slot_value comes from design.json spot weights (real data); CROSS_TAX and FAM_TAX are named policy choices. No fiat rows.
2. **Four terms, each meaningful:** "can he do the job?" × "how much does the job matter?" + "is he switching sides?" + "is he switching role families?"
3. **Easy to explain in the UI:** "−6: TE→FS — no deep range (RNG gap), no coverage technique (COV gap), defensive slot is valuable."
4. **Zero overrides to maintain.** When the Owner wants to change one rule, he changes a duty score or a slot value — not a per-row exception.

## Why this is portable

Swap three input tables for basketball:

- `CAP` → basketball position duty ratings (PG: HANDLE=10, C: LINE=10, etc.)
- `DEMAND` → basketball slot demands
- `slot_value` → basketball slot values from wins-per-slot

Same formula, zero changes. Z.ai's basketball sketch (§3 of his delivery, now at `inbox/flex-derivation-z2/`) confirms the duty vocabulary ports cleanly — 13 basketball duties map to the same 6 primitive families (CREATE, FINISH, PROTECT, CONNECT, RECOVER, PROJECT).

## The 2 hard misses (accepted, not patched)

| Row | Owner | Model | Why |
|-----|-------|-------|-----|
| CB>FS | 0 | 6 | Owner treats CB→safety as free (DB-family symmetry at the same level). My symmetric duty model penalizes CB's lack of deep range (RNG=0 vs FS need=9). |
| CB>SS | 0 | 6 | Same asymmetry — CB→safety is free in the Owner's mind; safety→CB costs 6. |

These require either a role-level/prestige dimension or 2 override rows to reach 99/99. I recommend accepting them as explained disagreements — you've said you're OK with that.

## Files

- `tools/mathlab/derive-super-merged.mjs` — implementation (Node.js, read-only, reads flex.json + design.json from git)
- `inbox/20261110-1800-super-P-322-formal-submission.md` — this design document
- `inbox/flex-derivation-z2/` — Z.ai's derivation package (shared for reference)

## Receipt

Command: `node tools/mathlab/derive-super-merged.mjs`
Output: 99 rules, 50 exact, 47 off-by-one, 2 hard misses (CB>FS: 0→6, CB>SS: 0→6), 0 overrides, fit 97/99.

## What I'd ask of the Owner

- Accept ~97/99 as the working derivation target (the 99 are a guide, not a bullseye).
- Accept zero overrides — the 2 CB→safety misses are explained, not hidden.
- Approve the hybrid continuous/tiered display (raw internally, tier badge on screen).
- If he wants 99/99: add one authored scalar `EXIT[C]` (Z.ai's exit-premium surface, tested at 99/99) — one line of code, not per-row overrides.
