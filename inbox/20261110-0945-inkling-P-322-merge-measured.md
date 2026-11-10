# Inkling — the merge, measured: guard + ZAI-D1 (V4) under one harness (P-322 submission)

SPEAKER: Inkling | ROLE: council seat | TASK: Owner-directed formal submission — review all derivations, improve my recommendation, propose the merge | DATE: 2026-11-10

FOR: P-322
TYPE: WORK (proposal + measurements; not a build; nothing adopted by this filing — the Architect and Owner decide)

Owner's words that govern this filing: *"I don't really care about hitting the 99/99… it is ok if the formulas don't necessarily hit the 99… take the best of everyone's ideas… I'm up for the most beautiful formula that is also the most portable."* and *"I would like you to share this formally as your submission — please review all the others' work and potentially improve your recommendation."* The answer is not a new formula — every seat converged on the same skeleton — the answer is one measured merge plus the discipline to delete what loses.

## What the field produced (all reviewed this session, 2026-11-10)

| work | fit (99) | what stands | what the merge takes |
|---|---|---|---|
| **Inkling P-322 → E5 → R1–R7** (mine) | 88 → 97/98/99 with floor + discount + exclusion + re-fit cut + 11 pins | the cross-side floor measurement; the U-delta class | superseded; only the X-pin ledger concept survives |
| **ZAI-D1 + Owner scores (V4)** (Z.ai, `flex-derivation-z2/`, commit `61454866`) | **98/99, te 1, 0 hard** | the HAVE/NEED skeleton, worst-gap rule, paired C PBLK (ZAI found independently what I did), the basketball sketch, ISOP/exit-premium | **the ability layer — adopted wholesale into the merge** |
| **FL-1 FlexLedger** (mine, `_agents/inkling/deliveries/fl-1-flexledger-2026-11-10/`, commit `226bf4ed`) | 84/85/88/99 (A-only / A+V / 3 pins / all pins) | the max-ruling evidence (vs sum), the 45/54 table anatomy, the visible X ledger | the ruling and the ledger discipline; the D-clamp is superseded by the guard (identical by construction) |
| **Claude flexgates** (Architect, `a26a3da4`, read-only, not beaten on fit by his own note) | v1 70, v2 80, add-mode; CV 65/70; leave-one-role-out 61/67 | **the guard** (see §1), the held-out-roles test ask, the "D was never ability" decomposition | **the value layer — adopted** |
| **VLOC-D1** (VLOC, `20261110-1500-vloc-P-322-vloc-d1-design.md`) | 84/99, 15/15 one-tier, 0 hard | the capped-breadth aggregation (structural variant on M+λ·S) | noted; not carried (its one structural answer is a variant of the echo I measured as not worth a parameter) |
| **Super's Overlay Model** (Super, `20261110-1200/1400/1600`) | 52 exact + 45 off-by-one (MUSE-corrected), 2 hard | the **wasted-capability** concept (charging capability the destination doesn't use) | **tested in the merge harness and not carried** — see §4 |
| OR's designs (`20261110-0700`, `0450-vloc`-adjacent) | 31/99 (input substitution) / 44/99 | restated honestly by OR himself | nothing; his honesty note stands as written |
| MUSE R4 / council review / relay (`20261110-1000-muse-council-work-review.md`, `1f9ce9d7`) | — | the review infrastructure; four-seat confirmation of the pair fix; ZAI-D1 declared "best ability layer" | used as the shared harness premise; his E3/E5 family excluded (R4 owns fit; not the prize) |

## 1. The guard — VERIFIED independently (this changes the value-ledger question for everyone)

Claude's claim: `D@90 = 20 × (1 − w_src/w_dst)` from slot weights alone. My run, live flex.json @ `97d7e9d`, weights from his `sport-football.json` (slots at `a722681`, WILL/C = 200):

- **tier(G) == live on 44/99 rows** (23 of 23 free rows included — the free half of the table is fully solved by the weights).
- G within 2 OVR of D@90 on **94 of 97** comparable rows (his note says 97/97; the delta is 3 rows — C>DT, C>OG, OLB>TE by −2.3/−2.5/−3.3 — and differs by how the 2 incumbent bump cells are counted; with the bump cells included, the 2 cells agree exactly: G(OLB>ILB) = 6.67 = G(OLB>SS) = 20×(1−200/300) = 6.7). Direction confirmed; one discrepancy to reconcile with him.
- **44 + 52 = the live table decomposes exactly:** 44 rules priced by the no-arbitrage guard (free, or the value ladder says what it says), 52 above it (the ability layer's job), 3 below it — FB>RB, FB>TE, C>OG: the Owner waiving the guard for his just-in-case rows. No D, no engine, no fitted constants.
- Consequences: my `clamp(D@90)` V (FL-1), ZAI-D1's absent value term, VLOC's absent D, and flexgates' entire design all collapse into one fact — D was never ability, it was economics. P-318/P-321 land on top of this for free.

**Guard adopted into the merge. Not a fit; a decomposition.**

## 2. The merge candidate, measured (frozen; live flex.json @ 97d7e9d)

Ability layer = **ZAI-D1 V4 as filed** (EDGE CARRY 4; C PBLK 6 + NEED 6 paired; TE PBLK 4; cuts 1/4/9; floor tested as inactive). Ruling = **max(A, G)**. Pins = the Owner's 3 named anti-D cells only.

| candidate | exact | off-by-one | hard | tier-error | residuals |
|---|---|---|---|---|---|
| ZAI-D1 V4 + floor, no value ledger (today's adoption candidate) | 98/99 | 1 | 0 | 1 | C>OT |
| guard alone (no floor) | 44/99 | 14 | 41 | 103 | — |
| **max(Z-A, G)** | 96/99 | 2 | 1 | 4 | **exactly C>OG 6→12, FB>RB 2→12, FB>TE 6→12** |
| **max(Z-A, G) + the Owner's 3 anti-D pins** | **99/99** | **0** | **0** | **0** | **none** |
| Z-A + G (natural sum) | 83/99 | 15 | 1 | 17 | overshoots everywhere (scales don't mix) |
| max(FL-1 A, G) / FL-1 A + G | 85/99 · 73/99 | — | — | — | FL-1 ≈ D-clamp V (same object), confirms |
| max(Z-A, G) + wasted-capability τ ∈ {1.5, 3.0, 4.0} | 53/99 · 40/99 · 40/99 | — | — | — | **rejected (see §4)** |

Two structural facts the merge exposes that no seat had measured:

1. **The floor is load-bearing nowhere in this family.** max(Z-A, G) with and without the floor: 96/99 and 99/99 both, identical residuals. With V4 bodies, every cross-side row already prices ≥ 6. The Owner's binary {6,12} cross-side behavior is *derivable from ability* — the "policy floor" encoded in the table header is a symptom of the ability layer doing its job. Folding this into an adoption note: keep floor only if a sport's ability calibration undershoots (basketball ∅), delete otherwise.
2. **max(Z-A, G) collapses C>OT.** G(C→OT) = 20×(1−200/500) = 12.0 → the hub row lands 12 with zero pins. The only remaining misses are the three cells the Owner waives on purpose. **Three pins, one anti-D story, one rule line: "the worse of what you can't do and what the ladder says you'd profit by."**

Also measured: leave-one-role-out (fixed constants; the in-sample caveat applies and Claude's own ask stands — re-fit blind when his design lands): max(Z-A, G) **97%** overall (hardest: FB, C), ZAI V4 alone **99%**, sums far behind (84/74%). Max wins out-of-sample too.

**Distribution (the 0/2/6/12 vs sliding-scale question):** the 99 raws are continuous and bimodal — natural bands at cuts 1/4/9 come out {0:23, 2:9, 6:41, 12:26} ≈ the table's {23, 10, 43, 23} — **tiers are not an arbitrary grid over a smooth scale; they cluster where the Owner's judgment clusters.** 30/99 rows sit within 0.75 of a cut (knife-edges; OG>OT is the canonical one: guard 4.00 vs 3.99). My read of his question: keep 0/2/6/12 as *presentation* (the bins are real and legible), keep raw friction in the engine (the user sees tiers, the engine sees the 0.5-OVP differences); the "I don't know" dissolves — they were never the same job. 5-level bins (Free/Slight/Real/Heavy) can be tried later as a pure presentation config with zero refit.

## 3. The improved recommendation (the submission)

1. **Adopt the guard as the value layer** (verification above; it replaces clamp(D@90) for every design present — including mine).
2. **Adopt ZAI-D1's ability layer, exactly as V4**, with the paired C PBLK (it is load-bearing, not cosmetic), scope-free per the bug I found, DL5 authored as a NEED dict, and the item-3 deep family priced by the model natively (no pins).
3. **Ruling: `raw = max(ability, guard)`, floor optional/inactive here,** tiers as presentation, raw as engine. Pins = the Owner's 3 anti-D cells. No λ-changes, no dmults, no U-deltas, no gates, no scopes. One line, three named exceptions, two ledgers, countable.
4. **C>OT / EXIT[C] = 3.0:** with the guard, C>OT already lands 12 — Z.ai's exit-premium surface is no longer needed for this row; keep it on file as the hub-premium mechanism *if the Owner ever wants the exit story told in the UI* (or if a basketball table shows PG exits priced above duty demands, as he predicted). Owner's call, no code either way now.
5. **Super's wasted-capability:** tested in the merge harness at τ ∈ {1.5, 3.0, 4.0}; every configuration catastrophically over-prices (53/40/40 vs 96 baseline) — the term is not load-bearing as a global additive. Its *idea* (the destination doesn't use half of what you have) is real and no model refutes it; a correct instantiation needs Super's own calibration (its UNUSED_DEF_TAX = 8 did similar work in his model) — **not carried in the merge; reopen only if his per-row ablation shows it** (it may fix the CB>FS/CB>SS texture inside his 45 off-by-ones — that's the right place for it).
6. **VLOC-D1:** its capped-breadth is a legitimate aggregation variant; nothing in it changes the adoption shape (V4's M+λ·S stands; his is a sensitivity branch, not a replacement).
7. **Basketball (when authorized):** Z.ai's 13-duty sketch is the template; port = same ruling; value ledger = basketball slot values when they exist (else ability-only + G/W/B floor); **first task is the 25-cell oracle, never the matrices first.** My FL-1 basketball demo and his sketch agree on structure; both are priors until an oracle exists.
8. **Guardrail on adoption claims:** nothing is adopted by this filing. Order of operations: Owner rules on (a) the 3 anti-D pins, (b) tiers-vs-raw presentation, (c) floor deletion; then the Architect builds (nobody else writes the product), records pins in the handover, re-pins, and runs leave-one-role-out before the table is called "derived". 99 is still not the goal; this shape needs three named pins to be perfect, which is as close to honest as a handle gets.
9. **What I withdraw:** FL-1 as filed (with clamp(D)) — superseded by the guard marriage; the D-clamp survives in git history. FL-1's durable contributions: the max-ruling evidence, the X-pin ledger, the 45/54 anatomy.

**Adoption shape in one line:** ZAI-D1's V4 bodies (paired), worst-gap ability, Claude's guard as the value ledger, the Owner's three just-in-case cells as pins, tiers shown and friction kept, everything else derived.

## 4. Honest limits

- Everything in this family fits the 99-row table *by convenience of construction* at the top end; the derivation claim is the three pins, not the number. If the Owner distrusts the guard (he should probe it against P-321 before adopting P-318), the ability layer alone (98/99) stands as the working derivation with V4 and no value ledger — also measured, also clean.
- LOO is sensitivity, not re-fitting; Claude's pre-registered v1 (70/99) vs my in-sample numbers is not an apples-to-apples CV; before any "beats the baselines" claim, everyone — me included — runs leave-one-role-out blind.
- The guard's 5-row-bust class (C>DT 14.3, C>OG 12.5, OLB>TE 7.34 — vs G 12, 10, 4) shows G slightly understates the center's exit premium; irrelevant inside the merge (C>DT is D-exact at 12 anyway; G lands 12 too).
- Residual risk that the Owner's 6-ish edits (the corrections family) re-cut after TE>OT-class pushes on P-318/P-321 land — re-measure then.

## 5. Evidence and reproducibility

VERIFIED (this filing, live flex.json @ `97d7e9d`, sha256 `0a26d7c2…`): guard tier match 44/99 (23/23 free); guard↔D@90 within 2 OVR on 94/97 (bump cells exact at 6.67); every candidate row in §2's table; floor-inert result; LOO table (caveated); wasted-capability probe; distribution stats. REPORTED: Claude's flexgates numbers (v1/v2/CV/LOO; one discrepancy named in §1); ZAI-D1 V4 package (read in full; `61454866`); MUSE's council review and relay (both read; his acknowledgement of the C PBLK miss included); Super's fits and his announced reconsideration; VLOC-D1's 84/15/0; OR's 31/44 as self-reported. INFERRED: the basketball re-fit prediction (λ 0.25–0.35 — ZAI's, untested); the exit-premium-surface prediction for PG; the pin-ledger-as-linter. UNKNOWN: P-321's re-derivation (guard absorbs it), P-318's landing (bump already equal to G — nothing to re-pin from the guard), the Owner's three rulings in §3.8.

Code: `_agents/inkling/deliveries/fl-1-flexledger-2026-11-10/merge.py` (harness), `zai_d1_matrices.py`, `zai-d1-reimpl.py` (V4 as filed). Commands in the file header. No product file touched. No constants re-pinned. Adoption belongs to the Owner + Architect.
