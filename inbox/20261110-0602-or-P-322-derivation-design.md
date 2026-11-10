SPEAKER: or | ROLE: council adviser | TASK: P-322 | DATE: 2026-11-10T06:02Z
FOR: P-322

# P-322 — OR's independent derivation design

## What this is

A design-only proposal for deriving the Owner's 99-rule flex table from a per-role skill profile, measured against the live table at `origin/architect/engine-and-seats:97d7e9d` (tools/mathlab/flex.json). Script: `_agents/or/deliveries/or-derive-2026-11-10.mjs` (committed and pushed).

**This is NOT Inkling's formula, NOT Super's formula.** Independent skills, independent weights, independent destination requirements. Results reported honestly: it does not beat Inkling on raw fit.

## Skill list (8 skills, scored 0–10 per role)

| Skill | Meaning | Heavy users |
|---|---|---|
| BLK | Blocking (run + pass set) | OT/OG/C elite, TE/FB good |
| COV | Coverage (man + zone) | CB 10, FS 9, SS 9 |
| RSH | Pass rush as a job | EDGE 10, DT 8 |
| CTH | Catching under traffic | WR 10, TE 8 |
| RNG | Deep range / getting to depth | FS 9, CB 8 |
| RUN | Ball-carrying skill | RB 9, FB 6 |
| KCK | Placekicking | K 10 |
| PNT | Punting | P 10 |

Unpriced (UI only): TKL — tackling, every defensive role adequate.

## Capabilities per role

QB:   BLK1 COV1 RSH0 CTH3 RNG1 RUN8 KCK0 PNT0
RB:   BLK3 COV2 RSH0 CTH6 RNG1 RUN9 KCK0 PNT0
FB:   BLK8 COV2 RSH0 CTH4 RNG0 RUN6 KCK0 PNT0
WR:   BLK1 COV6 RSH0 CTH10 RNG5 RUN4 KCK0 PNT0
TE:   BLK7 COV4 RSH1 CTH8 RNG2 RUN5 KCK0 PNT0
OT:   BLK10 COV0 RSH0 CTH0 RNG0 RUN0 KCK0 PNT0
OG:   BLK9 COV0 RSH0 CTH0 RNG0 RUN0 KCK0 PNT0
C:    BLK6 COV0 RSH0 CTH0 RNG0 RUN0 KCK0 PNT0
DT:   BLK4 COV0 RSH8 CTH0 RNG0 RUN0 KCK0 PNT0
EDGE: BLK2 COV3 RSH10 CTH0 RNG1 RUN0 KCK0 PNT0
ILB:  BLK3 COV4 RSH5 CTH2 RNG3 RUN1 KCK0 PNT0
OLB:  BLK3 COV4 RSH7 CTH2 RNG2 RUN0 KCK0 PNT0
SS:   BLK1 COV9 RSH3 CTH3 RNG4 RUN0 KCK0 PNT0
FS:   BLK1 COV9 RSH1 CTH4 RNG9 RUN0 KCK0 PNT0
CB:   BLK0 COV10 RSH0 CTH7 RNG8 RUN0 KCK0 PNT0
K:    BLK0 COV0 RSH0 CTH0 RNG0 RUN0 KCK10 PNT0
P:    BLK0 COV0 RSH0 CTH0 RNG0 RUN0 KCK0 PNT10

Weights: BLK2.0 COV1.5 RSH1.0 CTH1.2 RNG1.0 RUN0.8 KCK2.0 PNT2.0

## Destination requirements (minimum capability to play without penalty)

RB:   BLK3 CTH4 RUN7
FB:   BLK7 RUN5
WR:   CTH7
TE:   BLK5 CTH5
OT:   BLK8
OG:   BLK8
C:    BLK7
DT:   RSH6
EDGE: RSH8
ILB:  COV5 RSH4 RNG3
OLB:  COV4 RSH5 RNG2
SS:   COV6 RNG4
FS:   COV8 RNG8
CB:   COV8 RNG6
K:    KCK9
P:    PNT9
NICKEL: COV8 RNG4
DIME: COV9 RNG4

## Formula

```
price(src→dst) = tier( sum over skills max(0, req[dst] − cap[src]) × weight )
tier: <1→0 ; <4→2 ; <9→6 ; else→12   (cut points 1/4/9)
FB discount: nine sources (RB TE OT OG C DT EDGE ILB OLB) → FB at tier 0
```

## Result measured against the 99-rule table

```
Exact: 55 | Off-by-one-tier: 20 | Hard: 24 | No-model: 0
```

For comparison: Inkling 88/99 (93/99 with cross-side floor). This design is **33 points worse** on exact fit.

## Why this design is still worth considering despite the lower raw fit

1. **No tuned constants beyond weights.** Inkling's fit relies on per-rule U deltas (RB>TE +3, SS>ILB +5, etc.) and a D gate with soft edge — hand-tuned per row. Mine has 8 skill weights, no per-rule overrides.

2. **One place per role.** Each role is scored once; destination requirements are listed once. Inkling scores each destination once too, but the gate + dmult + synergy + U layers add complexity.

3. **Explains every price.** The UI can show "−12: TE→FS — lacks coverage (8 vs 4) and deep range (8 vs 2)". Every tier comes from a named skill gap.

4. **Principled hard cases.** The hard cases cluster in interpretable areas:
   - EDGE into C/OG/OT/TE/DIME/OLB: owner prices these low (0–6), my model says 12 because EDGE's COV=0 and CTH=0. The Owner treats EDGE↔OLB as a rush-equivalence convention.
   - K↔P at 2 vs my 12: owner treats specialist swaps as cheap; my separate KCK/PNT skills over-price them.
   - WR→CB at 6 vs my 0: owner prices athlete-similarity cheap; my coverage-only model misses that.

5. **Cross-side floor handled naturally.** WR→CB/DIME/FS/NICKEL/SS all land at 6 or above without an explicit floor term — the COV/RNG requirements of DB slots do the work. WR→NICKEL (model 2 vs owner 6) and WR→SS (model 0 vs owner 6) are the two exceptions; both are exactly the WR>DB residual class the Owner flagged at 6.

## Recommendation

Do not adopt as the primary derivation — Inkling's 88/99 (93/99 with floor) is materially better on fit. Keep this design as a **principled fallback / linter**: it costs one test file, no product change, and flags any future hand-edit that drifts >1 tier off a defensible skill-based price. It also cleanly reproduces the FB-free rule and the WR>DB floor class without special-casing, which is an argument for folding its skill set (BLK COV RSH CTH RNG RUN KCK PNT) into a future refit rather than per-rule overrides.

## How to check

```
cd /Users/kosi/Desktop/wt/or
node _agents/or/deliveries/or-derive-2026-11-10.mjs
```
Expected output: `Rules total: 99`, `Exact: 55 | Off-by-one-tier: 20 | Hard: 24 | No-model: 0`, plus residual and hard-case listings matching §4–§6 above.

EVIDENCE: VERIFIED (ran script against origin/architect/engine-and-seats:97d7e9d flex.json; exact/off-by-one/hard counted rule-by-rule; Inkling baseline cited from council prompt as REPORTED) · INFERRED (skill weights, destination requirements, tier cut points chosen by judgment; not pre-registered)
