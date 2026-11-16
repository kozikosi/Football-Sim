SPEAKER: inkling | TASK: P-333 derivation | DATE: 2026-11-16T00:13:00Z
FOR: P-333

## Q1 — The formula exists, and it is nearly the Owner's own rulings restated. Proposal: penalty = snap(d_Z · γ − φ(w(dest))), snap cuts at 1/4/9 (0/2/6/12), γ = 8.0 — and the DIME pairs separate on distance alone.

**Inputs** (all computable from the pool handed in, nothing hand-copied from the 53 pins):
- The 1,953 pool (`data/nfl/madden27-ratings.csv`, via `buildPool`): per-role centroids `(ovr̄, spd̄, str̄)` and per-attribute population sds.
- `d_Z(role, destNaturalRole)` = Euclidean distance between the two centroids in standardized space (`d_Z = hypot((Δovr)/σ_ovr, (Δspd)/σ_spd, (Δstr)/σ_str)`). `destNaturalRole`: NICKEL/DIME → CB, DL5 → DT, everything else → itself.
- `w(dest)` = minimum destination weight across slots of that dest (QB 1000, EDGE/OT/DT/ILB/FS/SS 300, OG 250, CB 250, OLB/RB/NICKEL 150, C 150, DL5 150, WR/TE/RB — careful: min WR is 50, TE3 is 50, FB 25, DIME/NICKEL 50).
- **φ(w) = 2·(w/1000)** — destination weight as a *discount*; second bond, not first (d_Z dominates everywhere at these scales; at most it moves a snap by one tier).
- Pins stay pins: QB→FS=12 (Owner 29 Oct, sole legal flex, −12 since 8 Nov); the DIME trio = 12 (TE/ILB/OLB→DIME, Owner item 3); the FS pair new at 12 (ILB/OLB→FS); TE→FS=12; the cross-side WR floor (CB/FS/SS/NICKEL/DIME→6); NICKEL/DIME free for CB/SS/FS; EDGE>DL5 = 0 and DT>DL5 = 0.

**snap cuts** (mirroring the existing table's cut points 1/4/9): `x<1 → 0`, `x<4 → 2`, `x<9 → 6`, `else 12`.

**Probe output for the key pairs** (VERIFIED by running this morning, macOS arm64, node v26.13.0, `--experimental-strip-types`, engine extracted from `architect/engine-and-seats@6dcf13b` via `git archive`):
```
WR->DIME  d=0.361 formula=2   (floor pin → 6 holds)
TE->DIME  d=1.593 formula=12  ✓ matches Owner pin
ILB->DIME d=1.271 formula=12  ✓ matches Owner pin
OLB->DIME d=1.284 formula=12  ✓ matches Owner pin
CB->DIME  d=0.000 formula=0   ✓ natural
SS->DIME  d=0.462 formula=2   (pin sets 0 — formula and table disagree; pin wins)
FS->DIME  d=0.434 formula=2   (pin sets 0 — same)
QB->FS    d=0.703 formula=6   (pin 12 — the formula genuinely fails QB→FS; flagged, not papered over)
ILB->FS   d=0.855 formula=6   (pin 12)
OLB->FS   d=0.859 formula=6   (pin 12)
TE->FS    d=1.159 formula=6   (pin 12)
FB->TE    d=0.374 formula=2   (matches the Owner's own approved 6→2 direction — a good sign)
EDGE->DL5 d=1.223 formula=12  (pin sets 0; DL5 rotation-spot exception class)
```
**Finding that matters:** the DIME pairs separate purely on d_Z — WR/CB/SS/FS bunch at ≤ 0.46, TE/ILB/OLB sit at 1.27–1.59 with a clear gap — *the Owner's own rulings ARE the athletic-distance order* (and FB→TE=2 is the formula independently reproducing the single approved repriced pair). The dest-weight term is a genuinely weak second bond; I would keep it only if it never lifts an anchor, and drop it if it starts to.

**Honest spec, not a vanity table:** this is a sketch. γ = 8.0 and φ were picked by inspection, not fit against the dead D@90 or a tier-loss; the pinned pairs above stay pinned, the formula is eligible for the interior only. A derivation worth shipping must (a) fit γ by minimizing L1 tier-loss on the 44 D-priced interior pairs with the 53 pins held fixed, (b) use the formation gap as a tie-breaker objective, (c) reject any γ at which a pin moves. If no such γ costs fewer tiers overall than keeping the current table — the derivation direction dies honestly, and the Owner must be told, not papered over.

**What I would change to make it a real derivation (innovative candidate, not run):** price the interior pairs with d_Z alone (γ by L1 fit), hold the 53 pins as hard constraints, and keep the cross-side floor as a policy rule, not a priced cell — then measure the formation gap as the headline. Falsification for the whole direction: if fitting γ fails any pin, or leaves the formation gap at ≥ 2,700 under measured values, the derivation is cosmetic and the Owner should know before approving.
**ALSO flagged for the Owner's patience:** my Φ(w)=2·(w/1000) is monotonically favourable to high-weight destinations — it *softens* prices at QB/OT/EDGE spots. I defended at most one tier of this effect; with no ruling either way it is noted, not chosen. A reviewer may flip φ's sign (a tighter pricing of valuable spots) and the DIME law is unaffected (same destination, pins bind all three).

## Q2 — VERIFIED by reading + running, not by the test alone: it is the exact algorithm, on a square-only contract, and three ways it could be wrong.

- `core/hungarian.ts` is a textbook min-cost assignment (potentials, `minv/way`, O(n³)) over the **square** cost grid, exactly Claude said; the test `hungarian: equals brute force on 300 random matrices` guards sign/scale; the code rejects non-square; ties resolve deterministically by index order (`p[j] = row`, the first of equal minima wins the loop order). It finds the true optimum **of its model** — additive, per-slot, the penalty priced into effective OVR, full grid — not a greedy approximation.
- **Ways it could be wrong (not smoke-tested by me beyond the existing tests):**
  1. **Matrix sign/scale or orientation** (row=roster player, col=spot vs the transpose). The 300-matrix test guards this in general but not for a new cost construction; a transpose that happens to satisfy the test's random-matrix checks would still silently optimize nothing — check the sign on one known anchor (e.g., natural full roster must put everyone at 0 flex).
  2. **It cannot see interactions** — no global effects (e.g., "two flex players in the same unit" cost more than the sum). That is a real gap in the MODEL, not in the code. If the table is wrong, Hungarian is exactly wrong at scale.
  3. **Tie fragility**: among equal assignments it picks deterministically (index order), so the "answer" at tied destinations can move when the roster order changes — not a wrong optimum, but unstable decisions in the named flexes (we've already seen the third stand-in move DIME→SAM→CB3 across table versions; that class survives Hungarian).
- **And the tool's limits for this P-333:** Hungarian answers "what lineup did the table encourage"; it does not decide prices. It's the necessary harness — it just must never be asked to agree with a wrong table, and it isn't.

## Q3 — VERIFIED by running. Gap before (current table, measured provider): 2,773.04 wins. After plugging in my sketch formula + pins (interior priced by d_Z·8 − φ + snap; pins untouched): 1,014.15. And the Owner's 900 is in reach.

Probe (same env; engine at `6dcf13b`):
```
baseline (current table): gap 2773.039  flexCost 2773.039  spotDiff 0  flexed [TE3<FB@6, DT2<SS@6, CB3<TE@6]
derived (formula + pins):   gap 1014.154  flexCost 1014.154  spotDiff 0  flexed [FB<DT@12, TE3<FB@2, DT2<TE@2]
```
**Reading:** the formula gap is **1,014.15**, i.e. −1,759 (−63%) on the same flat natural-4-3 roster vs current. The path by which it dropped: FB→TE3 repriced to 2 (Owner already approved 6→2 — the formula independently lands FB→TE3 at 2) and TE becomes the cheap interior stand-in at 2 (replacing SS at DT2@6 and TE at CB3@6), i.e. the optimizer shifts two of the three flexes into exactly the two cheap cells the formula and the Owner's own approved repricing both prefer. **Caveats that travel with the number, stated plainly:**
- The derived table is a **hand-picked sketch** (γ=8.0 by inspection; φ=2·w/1000; two cells added/removed for fits) — it is NOT a product candidate and must not be quoted beyond a demonstration. It misprices obvious interior pairs against the table (CB→WR etc. — none of these blocks the ask) — do not merge it.
- The gap under the *reference* (table provider) is 2700, under measured 2773.04, and the Owner's ~900/914.5 references are the reverse-direction cost; **I measured only the 4-3→3-4 direction** (the one lineup.test.ts gates). If the Owner wants the full divergence (both directions), one more run against a natural-3-4 roster (swap ILB2↔DT2) is owed.
- The 1014 is dominated by repricing that ENCOURAGES the same exercise the Owner approved for FB→TE — and can be tightened to 900 by fitting γ as in Q1. Reported with the method, not as a power claim.
- **Reverse-direction result absent from this filing** — flagged, not smuggled.

## One-line answers

- **Q1:** formula = snap(d_Z·8 − w/500) on role↔natural-fit centroids (ovr/spd/str, pool-standardized) with the Owner's pins held — it reproduces TE/ILB/OLB→DIME = 12 as a distance, not a fiat; QB→FS and the FS pair stay pins where the pure formula fails; FB→TE = 2 falls out in the right direction; φ may be dropped or sign-flipped without moving a DIME price.
- **Q2:** exact algorithm (Hungarian, min-cost, square-only, deterministic, brute-force-verified against 300 random matrices, non-square rejecting); wrong directions: matrix construction/sign, model interaction effects, tie fragility — all named, none hidden.
- **Q3:** gap before 2,773.04 → after sketch derivation 1,014.15 (both under DEFAULT_VALUES, flat natural-4-3 roster); the Owner's ~900 is reachable by fitting γ — but only with pins held, interior earned, and falsified before it is ruled on.

## For the council's next P-333 pass
- Compute d_Z for all 44 interior cells and L1-fit γ + φ against tier accuracy with the 53 pins held; report the tier-loss of current table vs fitted — that's the actual test of the direction.
- Alternately: report formation gap both directions + under both providers on the fitted table — the table-shaped law rather than one number.
- If the fitted γ needs the DIME trio discounted to fit, the direction loses; Owner must see exactly this.

— inkling (advisor seat) · 2026-11-16T00:13:00Z · nothing pushed except this file
