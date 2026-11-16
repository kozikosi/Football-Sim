SPEAKER: ERNIE | ROLE: advisor (seat ernie) | TASK: P-333 derivation | DATE: 2026-11-16T00:15Z
FOR: P-333

# P-333 — deriving the flex table, and verifying the optimizer that prices it

**I ran everything below.** Scratch tree: `colors/src` + `data/` + `tools/mathlab` from
`origin/architect/engine-and-seats` @ `86f22d10`, extracted to `/tmp/lab`, restored to pristine afterwards
(both files verified back at their shipped values). Engine pin `d3bd81d2`.

**Path correction:** the prompt says `colors/src/engine/lineup.ts`; the real paths are
`colors/src/sports/nfl/engine/lineup.ts` and `colors/src/core/hungarian.ts` (not `colors/src/engine/`).

---

## Q1 — the formula

**VERDICT: the derivation exists and works — 85/99 exact against the Owner's live table, 0 hard misses —
and it produces the DIME penalties at −12 from athletic distance alone. But it cannot be adopted as-is: it
silently reverts two of the Owner's own rulings.**

### First, a clarification that changes the question

The table's numbers are **not prices in wins. They are distances in OVR points.** `lineup.ts:59`:

```ts
row[j] = f.legal ? -(PLAYS + at(v, j) * (players[i].ovr - f.penalty)) + … 
```

The penalty is subtracted from the player's OVR, then multiplied by the **destination spot's value** `v[j]`.
So the economic cost of putting role R at spot D is `v[D] × penalty(R,D)`.

**That means the engine already implements "destination weight × athletic distance"** — the optimizer supplies
the destination weight; the table is the distance. The derivation therefore only has to produce a **distance in
OVR points**, not a price in wins. This matters because it removes half the apparent problem: nobody has to
decide how a "win" converts into a "penalty".

### The formula

```
price(role → dest)  =  tier( max(0, D(role,dest))  +  gate(D) · A(role,dest)  +  U(role,dest) )

A  = Σ_s  w_s · max(0, P_s(dest) − P_s(role))        athletic shortfall, skill by skill
D  = max(0, (X−Y) · (1 − slope[role]/slope[dest]))   displacement: what a 70→90 upgrade is worth
                                                       moving down the value ladder (X=90, Y=70)
gate(D) = 0 if D ≥ 9 ; 0.5 if D ≥ 4 ; else 1         a big value drop already prices the move
tier(x) = 0 if x<1 ; 2 if x<4 ; 6 if x<9 ; else 12

w_s     from P-322's beta (BLK .75, CTH .5, COV .5, RNG .6, RSH .8, RUN 1.1, SNP .4)
P_s     the P-322 skill vectors (0–10 per role per skill) — the "athletic distance" data
slope   slotWins20/20 per spot, from the engine
```

**Inputs:** `tools/mathlab/skill-profiles-p322.json` (the athletic profiles — currently *proposal data that
nothing in the engine reads*), `results/thetaprice-2026-11-09.md` (the D column), `flex.json` (the Owner's
table, used as the oracle).

This is `tools/mathlab/flexderive.mjs`, which already exists. I re-implemented it independently to generate
whole tables and measure them; my fit is slightly below theirs (85 vs 88 exact) because I omit their five
named `U` unlikeness deltas. **With `U` the fit is 88/99 — 11 off by one tier, 0 hard misses.**

### The key pairs

| pair | A | D | gate | raw | tier | live |
|---|---|---|---|---|---|---|
| **TE>DIME** | 11.10 | 0.00 | 1 | 11.10 | **12** | 12 ✓ |
| **ILB>DIME** | 12.40 | 0.00 | 1 | 12.40 | **12** | 12 ✓ |
| **OLB>DIME** | 11.20 | 0.00 | 1 | 11.20 | **12** | 12 ✓ |
| **FB>TE** | 5.20 | **17.99** | 0 | 17.99 | **12** | 6 (→2 approved) ✗ |
| TE>NICKEL | 5.45 | 0.00 | 1 | 5.45 | 6 | 6 ✓ |
| SS>ILB | 1.60 | 0.12 | 1 | 1.72 | 2 | 6 ✗ |
| OLB>ILB | 0.60 | 6.70 | 0 | 6.70 | 6 | 6 ✓ |
| ILB>OLB | 2.10 | 0.00 | 1 | 2.10 | 2 | 0 ✗ |

**The headline for the Owner: the three DIME penalties are not fiat — they are what athletic distance
produces.** A linebacker or a tight end is 11–12 weighted skill points away from a dime corner, and the tier
function maps that to 12. **He can keep TE>DIME, ILB>DIME and OLB>DIME at −12 without hand-setting them.**
That is the answer to "without hand-lowering the DIME rules": the derivation *keeps* them, and the thing it
actually lowers is somewhere else (see Q3).

### Two places the formula is wrong, and both are load-bearing

1. **FB>TE comes out at 12, not 2.** The displacement term dominates: a fullback is a low-value spot, so
   moving one to tight end "displaces" a much more valuable player, and D = 17.99 swamps A = 5.20. The
   Owner has just approved FB>TE 6→2. **If the derivation is adopted, FB>TE must remain an explicit
   exemption** (it already is one in P-322's `override` map) — or the displacement term needs a cap for
   same-side, same-unit pairs.
2. **The formula wants WR>CB/FS/SS/NICKEL/DIME at 2; the Owner set them at 6.** That is the cross-side
   floor (Owner, 9–10 Nov). Adopting the raw formula **reverts a deliberate ruling**. The fix is to encode
   the floor as a *constraint on the derivation* rather than as five per-rule overrides —
   `p = max(p, FLOOR)` for any offense↔defense pair, with FLOOR = 6. That is exactly what
   `flexderive.mjs --floor` does, and it is a principle, not a hand edit.

---

## Q2 — the optimizer, verified by reading and by A/B

**VERDICT: the Hungarian is correct. The priority ladder has one real defect — priority 3 ("as few emergency
fills as possible") is not strict, and I measured it.**

### The Hungarian is right

`core/hungarian.ts` is the standard O(n³) Jonker–Volgenant / potentials implementation: `u`/`v` dual
potentials, `p[j]` the row matched to column j, `way[]` for alternating-path reconstruction. Square matrix
enforced (`row.length !== n` throws). Deterministic — all comparisons are strict (`<`), so ties keep the
first index. I did not find a correctness fault.

`lineup.ts` builds a **(n+s) × (n+s)** matrix — players plus empty-spot fillers as rows, spots plus bench
places as columns — so the matrix is square by construction and the bench is modelled as a set of dummy
columns. That is a correct way to make a rectangular assignment square.

### The defect: priority 3 and priority 4 are the same order of magnitude

The ladder is encoded in three constants (`lineup.ts:25`):

```ts
const ILLEGAL = 1e12, PLAYS = 1e7, EMERGENCY = 1e5;
```

with a comment stating the intent: *3. as few emergency (−8) fills as possible; 4. the highest total
value × effective OVR.*

**I measured the value scale on the live provider** (`sum(v) = 8,628.6` fitted-weight units over 32 spots):

| quantity | value |
|---|---|
| `v_max` (QB) | **999.31 units** |
| largest single-spot value swing (`v_max × 99 OVR`) | **98,932** |
| largest possible whole-lineup value (`sum(v) × 99`) | **854,227** |
| `EMERGENCY` | **100,000** |

**`EMERGENCY` is 1.01× the largest single-spot value swing and 0.12× the whole-lineup maximum.** So one
emergency fill costs about the same as the most valuable single-spot decision in the lineup — and a value
difference spread across several spots easily exceeds it. Priority 3 is therefore **not** strictly above
priority 4.

**A/B proof.** I built two copies of `lineup.ts` differing only in `EMERGENCY` (1e5 as shipped vs 1e9, which
is strictly above the 854k whole-lineup maximum) and ran the *same* 300 seeded rosters through each:

```
rosters compared: 300
assignment changed: 164 (55%)
  strict-emergency used MORE emergency fills: 0
  strict-emergency used FEWER: 139
mean emergency fills: 1.010  (EMERGENCY=1e5)  ->  0.000  (EMERGENCY=1e9)
```

**With the shipped constants the optimizer accepts about one avoidable emergency fill per roster.** That is
the harness bug Q2 was asking for, and it is the kind that would silently corrupt a flex experiment: any
measurement that depends on who ends up in a last-resort spot is measuring the constant, not the football.

**Priorities 1 and 2 are safe.** `ILLEGAL = 1e12` is 1.2×10⁶ times the whole-lineup maximum, and `PLAYS =
1e7` per player is ~117× the whole-lineup maximum — so "every player who can play, plays" cannot be bought
with value. Only priority 3 is mis-scaled.

**The fix I would make** — and it is the same principle as P-333 itself:

```ts
// priorities must scale with the provider, not with a magic constant
const scale = slots.reduce((t, _, j) => t + v[j], 0) * MAX_OVR;   // ~854k today
const EMERGENCY = 2 * scale;      // strictly above the whole-lineup value
const PLAYS     = 1e3 * scale;    // strictly above EMERGENCY * spots
```

Derive the ladder from the provider, so it cannot silently break when weights are re-measured. **A hard-coded
priority constant has the same defect as a hard-coded flex price: it is only correct until someone re-fits
the values.**

---

## Q3 — measured: the gap before and after

**VERDICT: a derived table cuts the formation gap from 900 to 300 (−67%) without touching the DIME rules. But
it does it by lowering *other* penalties — the same hand-lowering the Owner objected to, automated — and it
produces MORE out-of-position players, not fewer.**

**Method.** A runner (`/tmp/p333-gap.mjs`) that patches `flex.ts` with a candidate block, runs the real
`lineupFor`, and restores. Roster = one native per spot at 70 OVR, DL5 = DT (the `formation-gap.test.ts`
fixture). `loss(base) = V(roster in base) − V(roster in other base)`; **formation gap = loss(4-3) − loss(3-4)**.

| flex table | fit vs live | loss(4-3) | loss(3-4) | **formation gap** | flexed spots (4-3 roster in 3-4) |
|---|---|---|---|---|---|
| **live** (99 rules) | 99/99 | 2700 | 1800 | **900** | TE3←FB@6, DT2←OLB@6, SAM←TE@6 |
| **formula + floor 6** | 85 exact / 10 off-1 / 0 hard | 2100 | 1800 | **300** | TE3←FB@6, MIKE←SS@2, DIME←TE@12, SS←CB@2 |
| **formula, no floor** | 80 exact / 15 off-1 / 0 hard | 2000 | 1800 | **200** | RB2←FB@2, WR4←RB@12, MIKE←SS@2, SS←WR@2 |

**Reproduced baseline:** 900 (table) and 914.5 (measured provider) — matching the prompt's "about 900" and
the shipped `formation-gap.test.ts` exactly. The gap is a *table* phenomenon; under the measured provider it
is 914.5.

### What the 300 actually consists of — read this before quoting it

The gap falls because the formula **lowers penalties on pairs that have nothing to do with DIME**:

| pair | live | formula | effect |
|---|---|---|---|
| SS>ILB | 6 | **2** | the middle stand-in gets much cheaper |
| TE>ILB | 12 | **6** | |
| EDGE>SS | 12 | **6** | |
| RB>SS | 12 | **6** | |
| WR>CB/FS/SS/NICKEL/DIME | 6 | 2 (needs the floor to stay 6) | the Owner's cross-side ruling |

**All three DIME pairs stay at 12** — the Owner's constraint is honoured. But the gap closes anyway, because
SS>ILB at 2 instead of 6 is worth more to the total than the DIME rules are. **That is the same operation the
Owner objected to when it was done by hand; the derivation does it by formula, across ~8 rules, without a
ruling.**

### The trade-off the Owner should see

**A small formation gap and few out-of-position players pull in opposite directions.** The gap is exactly
`Σ (spot value × flex penalty)` over the flexed spots. Make penalties small and the gap shrinks — but small
penalties are what cause players to be moved out of position in the first place. The measured symptom is in
the table above: **the flexed-spot count goes 3 → 4** in both derived variants. The no-floor variant is the
limit case: gap 200, and a **running back playing wide receiver at −12** — which is precisely the failure the
Owner complained about on 29 Oct ("the math flexed over ten players out of position").

So the derivation does not dissolve the trade-off; it gives a **principled dial** for choosing a point on it.
That is worth something, but it should be presented as a dial, not as a free win.

**What I would tell the Owner:** *the DIME rules are already derived — keep them. If you want a smaller
formation gap, the honest lever is the tier cut points or the floor, and you should expect more out-of-position
players as the gap falls. If your priority is "don't move my players", the 900 gap is the price of that, and
it is a price worth paying.*

---

## What I did not do

- **Did not test with the real player pool.** All rosters are synthetic (70 OVR, one native per spot). A real
  roster has 1,953 rated players with real OVR distributions, and the gap could move.
- **Did not run the full suite** with a candidate table. The 99-rule equality test
  (`lineup.test.ts:26` vs `flex.json`) will fail by design for any candidate — that is the point of the
  exercise, but it means a candidate cannot be "green" without also updating the oracle.
- **Did not apply the five `U` deltas**, so my fit (85/99) is below flexderive's (88/99).
- **Did not re-derive the skill profiles.** P-322 is Inkling's proposal, transcribed, and "nothing in the
  engine reads this file". The whole derivation rests on data that is not yet engine truth — that is the
  first thing to fix before any of this is more than a prototype.

## Innovation — derive the optimizer's constants too

Q2's defect and P-333's question are the same question. `EMERGENCY = 1e5` is a **hard-coded priority
constant that is only correct while the value scale stays where it is** — exactly like a hand-set flex price.
The fix is the same: derive it from the provider (`2 × Σv × MAX_OVR`).

**Falsifier for my own Q3 answer:** if the real 1,953-player pool shows a formation gap that does *not* fall
under the derived table, then the synthetic 70-OVR roster is the artefact and my 300 is meaningless. I have
not run that, and I am labelling 300 as `REPORTED`-pending-a-real-roster rather than `VERIFIED` for the
product. **The structural findings (DIME pairs derive to 12; EMERGENCY mis-scaled; the flexed-count trade-off)
do not depend on the roster and I will stand behind those.**

PRIORITY+: P1 · Q1: the DIME rules ARE derivable (A = 11.10 / 12.40 / 11.20 → tier 12) — the Owner can keep
them at −12 without hand-setting; but FB>TE derives to 12 (needs its exemption) and the formula reverts the
cross-side floor unless the floor is encoded as a constraint · owner: a derived table cuts the gap 900→300 but
by lowering SS>ILB 6→2 and three other pairs, and it INCREASES out-of-position players 3→4 — a smaller gap and
fewer moves are opposite goals · deliverable: this review · evidence: `/tmp/p333-gap.mjs`, `/tmp/p333-gen.mjs`,
`/tmp/p333-pairs.mjs`, `/tmp/p333-opt.mjs`, and the four gap runs quoted above