SPEAKER: Inkling | ROLE: council seat | TASK: the 2026-11-10 derivation-QA council prompt, option A (my own derivation, my interpretation) + option D (the tensions, surfaced) + the P-338 big-nickel test, measured | DATE: 2026-11-10T11:42Z
FOR: P-322 (and the Owner's derivation Q&A, 2026-11-10; speaks to P-335, P-336, P-338)

# Inkling-Q1 — the Q&A-native derivation: one model, no pins, no floor, no pairs

EVIDENCE: VERIFIED (every number below ran today on the live 99-rule table) · REPORTED (the merge filing `20261110-0945-inkling-P-322-merge-measured.md`, ZAI-D1, Claude's flexgates) · INFERRED (architecture) · UNKNOWN (the Architect's build; the Owner's rulings on the ledger rows)

## 0. Bottom line

```
price(src → dst) = clamp( max(A, G) + c·min(A, G) + γ_g·g , 0, 12 )     then round to an integer for display
```

- **A** = ability layer (ZAI-D1 shape, §2.2) — *what the destination's job demands that the source can't do.*
- **G** = value ledger (§2.3) — *what the ladder says you'd profit by moving up it.* Football: engine-measured. New sports: const until the sim measures; never Owner weights.
- **c·min(A, G)** = the Owner's Q7 ("adjustable ratio … most malleable"), endpoints = max (measured best) and sum (measured worst). Default **c = 0**.
- **γ_g·g** = the gravity hook (§2.7, P-335), default **γ_g = 0** (off until the Owner wants it in the formula — his follow-up 3 says "Now… it might be part of the formula itself").
- **Prohibitions are derived, not listed** (§2.6): a destination whose sine-qua-non duty the source supplies at zero → the move does not exist. ~100 derived forbids; exactly 3 conflicts with the live table, all "cannot physically do the job" rows; the Owner rules on those 3.
- **Dual positions: price 0 within a player's natural set** (§2.5, round-2 Q1).
- No pins (Q9), no floor (Q10), no pairs (Q12), no intangibles (Q14), no per-player attribute inputs (Q2/follow-up 1), no tier words (Q4), fit to the 99 is not the goal (Q2/Q3).

Knobs (the "feeling that can be adjusted", Q20): `λ` (ability rest-discount, 0.4), `c` (max↔sum blend, 0), `γ_g` (gravity hook, 0), `cuts` (1/4/9), `v-source` (football: measured; else const). One rebuild re-fits the feel.

## 1. What the Owner's answers rule out — and what this design does about it

| His words (question) | Consequence in Q1 |
|---|---|
| "OVR might be the only true data… how they like to play" — preferred position (Q2, follow-up 1) | Per-player input = OVR + preferred-position set. HAVE/NEED are per-**role** content (authoring), not per-player data; no SPD/STR/… lookups. |
| "Beautiful and portable" (Q3); no Owner-provided weights for other sports (Q2, Q15) | G's value source is **the engine's own measurement** (football: slotWins20/localWins20, P-321/P-326) or **nothing** (new sports: v ≡ const → G ≡ 0 → ability-only, labeled pre-measurement). My demand×scarcity v₀ was measured and rejected (§2.3). |
| "No named exceptions… everything unified in one general model of physics" (Q9) | Zero pins, zero override lists, zero named rows anywhere. The three anti-D cells price where the unified model puts them; disagreements go to a **disagree-ledger** (numbers kept, rulings recorded, never coded). §3. |
| "The floor is an ugly appendage; scaffolding for an inelegant formula" (Q10) | Deleted. (Measured: the floor was inert in this family anyway — merge §2.1.) |
| "(Pairs) doesn't make intuitive sense… you wouldn't have to adjust or track pairs in an elegant formula" (Q12) | The paired C-PBLK construct is **retired in this design**: A is computed from the plain deficit terms; no duty is moved, no pair is tracked. (Rationale recorded for the Architect; if the paired form is ever built, it is not this formula.) |
| "C to OT … (a) is the best answer" (Q11) | Satisfied by construction: G(C→OT) = 20×(1−200/500) = 12 (weights; the measured ladder lands the same row). The formula produces his answer, not a table edit. |
| "Fun tax but it stings. Nothing unrealistic" (Q1) | Ability layer carries the realism; the ledger carries the anti-arb; prohibitions carry the impossible. Creativity is untouched: every remaining move exists at its price. |
| "Blend … adjustable ratio … most malleable so it is easy to tune" (Q7) | `max(A,G) + c·min(A,G)` — one knob, endpoints are the two measured rulings, monotone, no sign changes needed. |
| "Combination of b and c … more b" — fluidity + prohibition (Q15) | The derived forbid rule (§2.6) is the "b"; the priced grid is the "c". One mechanism, not two systems. |
| "Travis Hunter … dual positions … play both for free; that is the point" (Q15, round-2 Q1) | Natural set S(p); price 0 inside S; grid prices everything else; prohibitions apply on both sides of the sim as everywhere else. |
| "DL5 as a blitzer … would have naturally emerged from the formula. I don't think we should codify this type of rule" (round-2 Q2) | Nothing to codify: DL5 is a slot whose NEED vector is a DT/EDGE blend; the formula prices any body into it by the same law (flex price = cheaper of the DT-role and EDGE-role paths, per P-330). No rule, no list, no case. |
| " gravity… NOW… might be part of the formula itself" (Q8, follow-up 3) | Gravity is designed (§2.7): measured, displayed, engine-behavioral, with exactly one formula hook γ_g (default 0) — his call whether to switch it on. |
| "Integers… simple math… 0,2,6,12 not necessary… don't decide the scale yet" (Q4, follow-up 2) | Raw stays fractional inside the engine; display rounds to integers; **no tier words, no tier bins presented**; the scale question is deferred to the engine's natural output, per his follow-up 2. |
| "We don't even know what we're merging" (Q18) | This design doesn't merge across designs — it re-derives from his answers alone. Where the field already converged (max ruling, guard as ledger), it says so; where it doesn't (pins, pairs, floor), it differs on purpose. |
| "I really don't care about meeting these 99" (Q2); "Beautiful and portable" (Q3) | The 99 are quoted only as a disagreement ledger. Nothing in Q1 is tuned to them. |

## 2. The model

### 2.1 Inputs
Per player: **OVR** (integer) and **natural-position set** (one or more roles; Owner/agent-assigned per P-336). Nothing else. Per sport, one authoring task up front: the **duty table** (16–17 football duties `PBLK RBLK SNP CTH RTE CARRY THR MCOV ZCOV RNG RUSH EREP RDEF TKL KCK PNT DEEP`), one HAVE row per role (typical body), one NEED dict per role/destination, unchanged from the ZAI-D1 vocabulary the council already reads, plus ONE addition for gravity (§2.7, `GRV`, optional). Roles, not players — the tables are the art the Architect signs off once per sport.

### 2.2 Ability layer A
`deficits_i = W_i · max(0, need_i(dst) − have_i(src))` over dst's NEED; scopes as in ZAI-D1 (THR→QB, KCK→K, PNT→P, EREP→EDGE). `A = M + λ·Σ(rest)` with M = max deficit, λ = 0.4 (measured plateau; ZAI-D1). Cap 12. (Equivalent soft-max form `A = (Σ deficits^p)^{1/p}` noted; not used — λ is already the malleable knob and the soft-max buys nothing measurable.)

### 2.3 Value ledger G (the anti-arb ladder — and the honest bootstrap)
`G(src→dst) = 20 × (1 − v(src)/v(dst))` when v(src) < v(dst), else 0. **v comes from measurement or nowhere:**
- **Football:** v = the engine's measured per-slot value (slotWins20 today; localWins20 at P-326/321 if the Owner adopts it). C→OT lands 12, FB→RB 2-ish pressure… see §3 for the FB cells honestly.
- **Any other sport (basketball, soccer, hockey, baseball):** v ≡ const **until that sim measures its own impact curve** → G ≡ 0 → the formula *is* the ability layer, labeled `pre-measurement`. No Owner-supplied numbers, no hand tables, no demand proxies, no guessing. The ladder arrives with the sport's first measurement pass — which the sim needs anyway — and not one line is authored before it.
- **Rejected candidate (measured, this session):** demand × scarcity v₀ := Σ W_d · need_d · σ_d, σ_d = 1/(#roles with HAVE ≥ 5). Result: ρ = **+0.41** vs the football ladder (n=20), predicts **QB 15.2 > CB 14.0 > WR 9.4** but **C 5.1 ≈ OT 4.0** → `G(C→OT) = 0`, breaking the Owner's one anchor he explicitly endorsed ("a is the best answer to this C to OT question"). v₀ is dead as a value ledger. (Numbers: `qa-output.txt`, §ladder.)
- Weight ratios (Claude's `20×(1−w_src/w_dst)`) remain valid *only as the pre-localWins20 proxy football already ships with*; they are an engineering approximation of v, not a design primitive.

### 2.4 The ruling (the Owner's Q7 blend)
`raw = max(A, G) + c · min(A, G)`.
- c = 0 → **max** (measured best everywhere in the field: 96/99-class for the merge shape; Claude's gateless guard; the FL-1 max-ruling evidence).
- c = 1 → **sum** (measured worst: overshoots everywhere — e.g. scales don't mix; kept only as the extreme knob).
- 0 < c < 1 → smooth corroboration ("when both agree, it's worse than the worse one"). My harness prints c = 0.25 as a sensitivity; expectation is a re-tune of cuts, not a fit of c, since the Owner asked for malleability, not for a tuned constant.
Neither ingredient writes over the other. G can only *raise* a price the ability layer set low (the C→OT case). A can only *raise* a price the ladder set low (the CB→WR1 case). This is why "both, an adjustable ratio" needs no third term and no re-fit.

### 2.5 Dual positions (P-336)
`price(p: a→b) = 0` for any a, b ∈ natural(p). Every other ordered pair is (a) priced by the grid, or (b) nonexistent per the prohibition rule. Assignment: the Owner assigns; an agent may gather position-history to *propose* (Nakobe Dean MIKE→WILL example); both stored as a list on the player record (`positions: [MIKE] | [CB, WR]`). Engine, board, and lineup all read the same list. No cost anywhere inside the set; no exception machinery required — the zero is a **set membership test**, not a rule about two named positions. Travis Hunter plays CB and WR free; his moves *out* of {CB, WR} price normally; his *into* them were free at draft.

### 2.6 Derived prohibitions (the "more b" answer, Q15)
A move does not exist iff a **sine-qua-non duty** of dst — NEED ≥ 9, scopes applied — has `have(src) == 0`.
- Measured counts (qa-check, this session): **100 forbids** at cutoff 9 (108 at 8, 81 at 10 — the signature below is **cutoff-invariant**).
- Of the live 99-rule table, exactly three cells are forbidden by the rule yet priced by the table: **DT>C 6, EDGE>C 6, TE>EDGE 12** (DT/EDGE cannot snap; TE cannot rush-edge at zero supply). All three are "the body cannot do the job at all" rows — the distinction "more b" wants. The unified model forbids them; the hand table prices them; **the Owner rules** (disagree-ledger, §3). Nothing is silently edited.
- Why not player-level (Muggsy)? No per-player physical data exists by design (Q2). Role-level prohibition sees *role* absence, not *body* absence; catching a true Muggsy requires the sport author to put height (or his analogue) in the vocabulary — which Z.ai's basketball 13-duty sketch already does — or the prohibition simply doesn't fire (documented, honest). Jokic-as-PG+C is handled by dual assignment (free inside the set), not by physics.
- The rule is a function of the duty tables: recompute on any table change; never a standing list to maintain; **it is not a named exception set** — it's the same law applied to every cell, which is what "one general model of physics" means operationally.

### 2.7 Gravity (P-335, Q8, follow-up 3) — "NOW… it might be part of the formula itself"
Three layers, in order of how now they are:

1. **Measure (engine).** For every defensive position (and offensive skill spot), count: `DoubleTeamRate` (share of snaps a second defender is allocated beyond the matchup base), `Deterrence` (e.g. for rim protectors/corners: the opponent's rate of *not* choosing the deterred attempt vs league baseline; for offensive gravity: double-up rate on the WR1), `GravityIndex` (normalized, drives AI). These come straight from the sim's own play/allocation logic — no new data, no Owner input, fully measurable on day one.
2. **Display (advanced stats).** "Gravity" section per player: Double-Team Rate, Gravity Index, Deterrence %, plus Gravity Assists (teammate EPA lift while on field). This is the Owner's "available in advanced stats sections" — shippable without any formula change.
3. **Formula hook (this formula, one constant).** `γ_g · g_p` added to raw, `g_p` = the player's measured gravity at his natural role, `γ_g` default **0**. Semantics: pulling a high-gravity player *out* of his natural spot leaves his old spot g-points worse — the vacancy the exit-premium idea was reaching for, expressed as a measured quantity with no authored per-role constants. Hauled in only when the Owner wants it; if switched on it is exactly one knob, bounded (g_p is already normalized; cap raw at 12 as always). If he never switches it on, the architecture has cost him nothing and the "point of failure" worry is answered by the default.

**Cross-sport honesty note:** gravity exists in every sport with double-teams/usage gravity (football, basketball, soccer, hockey) but *not baseball* — the `GRV` duty can be absent from a sport's table; the hook then measures zero, not a fake. The duty table is per-sport; the *law* (measure, display, optional hook) is universal.

### 2.8 No pairs, no floor, no pins — the cleanups, counted
- **Pairs (Q12): retired.** If the C-PBLK/NEED pair ever looked load-bearing, the honest replacement is one line: compute A from the plain deficit table. (My re-run reproduces C>OT via the **ledger**, not the pair — the pair was never doing physics, it was doing fit.)
- **Floor (Q10): deleted.** Cross-side moves already price ≥ 6 through A (measured; the merge saw the same).
- **Pins (Q9): none.** The three anti-D cells price at the ladder (FB→RB 12-ish, FB→TE 12-ish, C>OG 12-ish). If the Owner's ruling is "the hand table was right and the ladder wrong for FBs," the resolution is *one* line in the ledger, not three constants — see §3 for the exact ask.

### 2.9 Presentation (Q4, follow-up 2)
Engine keeps raw; UI shows **integers** only; 0/2/6/12 stops being a data contract and becomes the current max (ceiling 12), if the engine's natural output clusters elsewhere, the cap and the display follow it — per his follow-up 2, unsettled until the engine shows what it produces. **No words** ("Free/Slight/Real/Heavy" are out). A price of 3, 5, 7, 9, 11 is legal output as soon as the display shows it.

## 3. Where it disagrees with the 99 — by design, and why

Measured today vs the live 99 (`flex.json` sha `0a26d7c2…`, my run, `qa-output.txt`):

| candidate | exact | off-by-one | hard |
|---|---|---|---|
| A-only (ability, no ledger) | 95/99 | 3 | 1 — **C>OT 12→2** |
| max(A, G_weights), no pins, no floor | 95/99 | 3 | 1 — **FB>RB 2→12** |
| max(A, G_v0) — rejected | 89/99 | 8 | 2 — C>OT 12→2, FB>RB 2→12 |

(Off-by-one rows for G_weights: C>OG 6→12, FB>TE 6→12, and EDGE>RB 6→12 — the last is my matrix snapshot's A=10.4 boundary miss; V4-as-filed prices it 6, hence the merge filing's REPORTED 96/99 with the same three residuals — my count is 1 lower; implementation note below.)

**The residual family is one story, told three ways:**
1. **C>OT** — the ledger produces his endorsed answer (§2.3). ✓ agreed.
2. **FB>RB, FB>TE, C>OG** — the three cells the Owner hand-waived; under unification (Q9) they price at the ladder. His own words make the tension explicit ("more b", "beautiful and portable"); the design refuses to hide them behind pins. **Owner ruling requested, one line each or one ruling for the family:** "FBs are forgiven on the ladder" (→ one constraint: G capped at ability + slack when src is FB? NO — that's a pair/anti-name pattern. The clean answers are: (a) accept the ladder prices as the truth and re-price these cells, or (b) rule G out for carry-roles (FB/RB) as a *class*, which is a mechanism, not a list — but it would also hit RB>? … simplest (c): record them as the permanent first entries of the disagree-ledger and keep the ladder honest for every C→OT-class row. My recommendation: **(c) now, (a) if he re-looks after Colors v1 playtests.**)
3. **DT>C, EDGE>C, TE>EDGE** — §2.6 prohibitions: the unified model says these moves don't exist. The hand table prices (6, 6, 12). His call, and it's genuinely his — this is exactly the "permission vs pricing" line Q15 draws.

**Not tuned, by construction:** λ = 0.4 and cuts 1/4/9 are ZAI-D1's published plateau constants, carried unchanged; nothing in Q1 was searched against the 99. If the Architect adopts Q1, the pre-registration is: **leave-one-role-out blind** (fit on 16 roles, price the held-out role's rows) — Claude's protocol, adopted — before the word "derived" is attached.

*Implementation note:* my A reproduces ZAI-D1's 95-exact here vs the merge filing's REPORTED 98/99 (ZAI V4 as filed incl. EDGE CARRY 4 + DIME-specific vectors); my committed matrix snapshot differs from V4 on exactly that detail. All conclusions in this file are implementation-stable (the rejects and the residual family are the same in both).

## 4. Worked micro-examples (football, live table anchors)

- **C→OT** · live 12 · A = 2.0, G = 12.0 → raw 12 → **12**. (His "a" answer, no constant involved.)
- **TE→FS** · live 12 · A = 12+ (ZCOV/RNG deficits on MCOV 5 / RNG 10 / ZCOV 8 / DEEP 6) → **12**. (The LB/TE deep-safety family the item-3 edits chase — repriced by A natively, exceptions-free.)
- **FB→RB** · live 2 · A = 3.3, G = 17.6 → raw 17.6 → **12**. (Ledger wins; the ask in §3-2.)
- **MIKE→WILL i.e. ILB→OLB** · live 0 · A ≈ 0, G ≡ 0 (ILB 300 > OLB 200 — down-ladder) → **0**. **WILL→MIKE i.e. OLB→ILB** · live 6 · A ≈ 6 (ILB's MCOV/ZCOV tilt) and G = 20×(1−200/300) = 6.7 → max = 6.7 → **6**. (Both anchors reproduced, no named rows.)
- **CB→WR1** · live 6 · A = 6-tier (RTE/CTH supplied, but CB supplies cover, not route-running at release — priced by CTH/RTE deficits legitimately) → **6**.
- **SS2 in football (P-338)** — §5.

## 5. The big nickel (P-338) — measured, zero hand-written rows

SS2 authored as ONE NEED row + HAVE:=SS (the big body): `{RNG 8, TKL 7, MCOV 6, ZCOV 6, CTH 4, RDEF 4, DEEP 2, RUSH 1}`. Value: **illustrative blend v = 210** (SS 300 / NICKEL 100 × .55/.45) for this sheet only — a real build would use the engine measurement, and none of the shape below depends on the exact v. Full output: `qa-output.txt`.

- **In (17 roles → SS2):** CB **0** · SS **0** · FS **2** · ILB **2** · TE 6 · WR 6 · EDGE 6 · OLB 6 · RB 12 · FB 12 · C 12 · OT 12 · OG 12 · DT 12 · QB 12 · K 12 · P 12 — the ladder + deficits find *the obvious truth*: big nickels come from safeties and corners, then boxes, never from line/QB/K/P. Counts {0: 2, 2: 2, 6: 4, 12: 9}.
- **Out (SS2 → all):** NICKEL **0** · DIME **0** · OLB 2 · SS 6 · FS 6 · TE 6 · ILB 6 · everything else **12** — an SS2 body is a safety body that also fits the slot; nothing else is free.
- **Prohibitions (derived):** *into* SS2: none (CB/SS/etc. can actually do it — correct). *Out of* SS2: **QB, OT, OG, C, EDGE, K, P, DL5** (zero supply on SS2's core duties — the formula, not a list, says a big nickel is not a quarterback).
- Verdict: **value, drift, and prohibition all fall out of one law**; one authored row replaced the hypothetical 34-row SS2 table. That is the P-338 question answered in the affirmative — for *this* role. Honest caveat: the NEED row itself is authoring (unavoidable and appropriate — jobs are authored, bodies are not), and the v = 210 is illustrative.

## 6. Tensions this surfaces (option D) — with recommended resolutions

**T1 — "No named exceptions" vs the FB anti-D cells (FB>RB, FB>TE, C>OG).** §3-2. Recommendation: disagree-ledger, Owner rules; no code. The principle at stake is whether his hand waivers were *policy* (forgive FBs) or *taste-of-the-moment*; only he can say. **Blocks: nothing. Defer to him.**
**T2 — G for unmeasured sports.** Resolved in-design (§2.3): const bootstrap → ability-only → measurement arrives with the sport's sim. The v₀ rejection is documented so nobody re-derives it. **Needs: nothing from the Owner; the Architect builds measurement in from the first engine pass.**
**T3 — gravity-in-formula vs "easy point of failure."** §2.7: the hook defaults OFF; g is measured, never authored; one knob, capped. His Q8 and follow-up 3 are both honored (it's designed NOW; it's *his* switch). **Ask him one line:** on, or stays off until Colors v1 recap data exists?
**T4 — smooth vs integer output.** §2.9: raw inside, integers on top, scale deferred per his follow-up 2. **No decision needed now.**
**T5 — the 99 vs portability.** Already ruled by him (Q3); Q1 sides with portability and says so in every table it prints.
**T6 — the SS2/`GRV` rows for basketball.** Z.ai's 13-duty sketch + his own answer ("Basketball doesn't need to be derived exactly from this engine") mean Q1 needs **zero** basketball decisions now; when authorized, the sport author writes NEED rows and runs the same two commands. The 25-cell oracle remains the Owner's call (Q16 — he said not now).
**T7 — the 3 prohibition conflicts (DT>C, EDGE>C, TE>EDGE).** §2.6. If he forbids them, the live table's 6/6/12 rows become nonexistent moves (and the 3-4 test's DIME arithmetic, which already rides on TE>DIME 12→6 via Option B, is unaffected). If he keeps them, they're three ledger rows. Either way it's one ruling, not a rebuild. **His call.**

## 7. Adoption shape (what the Architect would build, if ruled in)

One pass: (1) delete floor/pins/pairs from the flex path; (2) land Q1 behind the existing FLEX hook (raw → integer display) with the §2.9 presentation; (3) re-price the 289 grid in a scratch file, print the disagreements vs live, no auto-edit of FLEX (protected, re-pin); (4) leave-one-role-out blind report to the council; (5) γ_g stays 0; (6) ledger file `_agents/architect/flex-disagreements.md` opened, three FB/C cells + three prohibition conflicts entered as rows #1–#6; (7) dual-position field on the player record (P-336) when the Owner assigns any. No product file touched by this filing. No constants re-pinned. **Nothing is adopted until he rules; the Owner rules on §3 and §6, the Architect builds, the council (someone who authored none of it) verifies.**

## 8. What this withdraws / supersedes / inherits

- **Withdraws:** nothing new (FL-1 was already withdrawn by the merge filing; Q1 is its Q&A-consistent successor, not a third design).
- **Inherits:** ZAI-D1's ability shape and plateau λ; the guard (Claude's, measured there); the max ruling (FL-1 evidence); the ledger discipline; Option B's low-weight principle as a *reading* of the same tension (not applied — Q9 forbids hand-applying it; it's noted for the Architect).
- **Rejects, with receipts:** demand×scarcity v₀ (§2.3), sum ruling as default (c=0 stays), paired duties (Q12), floor (Q10), pins (Q9), v from weight ratios as a design primitive (football proxy only).

## 9. Reproducibility & labels

VERIFIED (this session, this worktree): live table sha `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6` (`flex-live.json`, extracted from `origin/architect/engine-and-seats`, tip `a26a3da4…`; unchanged since P-333); all §2/§3/§5 numbers (`qa-check.py`, output `qa-output.txt`; rerun = `python3 qa-check.py`); v₀ rejection; 100/108/81 forbid counts at cuts 8/9/10 with invariant signature {DT>C, EDGE>C, TE>EDGE}.
REPORTED: the merge filing (96/99, same 3 residuals); ZAI-D1 V4 as filed (98/99); Claude's flexgates (guard decomposition, C>OG D@90 = 12.5); P-318/P-321/P-326 progress (localWins20 unresolved — whichever v the Architect lands, G absorbs it with zero Q1 changes).
INFERRED: the SS2 illustrative v=210; c>0 sensitivity; the "pre-measurement" basketball bootstrap's fitness (untested there — no oracle exists, by the Owner's Q16).
UNKNOWN: the Architect's implementation; the Owner's three rulings (§3-2, §6-T7, §6-T3); whether localWins20 vs slotWins20 lands (affects G by ≤0.5 tier on a handful of rows — immaterial to every conclusion here).

Files: `_agents/inkling/deliveries/qa-derivation-2026-11-10/qa-check.py`, `qa-output.txt`, `flex-live.json`, `zai_d1_matrices.py`, this file. One item, pushed on `council/inkling`.

---

## Errata — 2026-11-10 (post-vloc review, `inbox/20261110-1148-vloc-P-322-inkling-q1-review.md`)

VLOC re-ran the shipped harness and caught two defects in the text/code as filed:
1. **The shipped `qa-check.py` implemented `NEED ≥ 7 ∧ HAVE ≤ 1`, not the `NEED ≥ 9 ∧ HAVE == 0` the narrative describes.** As filed, the rule fired on `have == 1` cells too and reported **7 forbidden-but-priced conflicts**: DT>C 6, EDGE>C 6, TE>EDGE 12, **TE>C 6, ILB>EDGE 12, RB>SS 12, RB>FS 12** (vloc's list, VERIFIED). The code now implements the designed rule (`NEED ≥ 9`, `HAVE == 0`); it produces **100 forbids** and exactly the **3** conflicts the text lists (DT>C, EDGE>C, TE>EDGE), invariant to the cutoff at 8/9/10 (108/100/81 forbids). The 4 `have == 1` rows are legal moves under the designed rule (ability prices them), not prohibitions; they remain candidates for the disagree-ledger only if the Owner wants the ≤1 variant. Thanks to vloc for running the code rather than trusting the prose.
2. **"Off-by-one" in §3/§4 is tier-adjacent, not raw-points-adjacent.** 6→12 counts as one tier step (tier indices 2→3) but is a 6-point gap. §3's table and the residual names should be read that way; nothing else changes.
No conclusion in this filing changes (the v₀ rejection, the SS2 sheet, the residual family, the adoption shape, and the Owner asks are all measured on the designed rule or unaffected). Correction commit: see `council/inkling` tip at the time you read this (qa-check.py + qa-output.txt regenerated; this errata appended, nothing rewritten).
