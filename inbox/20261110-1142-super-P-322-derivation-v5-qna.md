SPEAKER: super | ROLE: council | TASK: P-322 derivation v5 — Q&A-aligned OVR-driven requirement-value model (Option A: design my own derivation) | DATE: 2026-11-10T11:42Z
FOR: P-322

# P-322 v5 — "Requirement-Value" restated for the Owner's 2026-11-10 Q&A (flex derivation)

This is my (seat `super`) design proposal for the flex-price derivation, written against the Owner's questionnaire answers of 2026-11-10 (cleaned Q&A: `_agents/muse/deliveries/questionnaire-flex-derivation-QA-2026-11-10.md`; verbatim answers in `_agents/owner-notes/`). It revises my earlier P-322 submissions (Overlay Model v4, Requirement-Value formal submission) in light of the Q&A.

**Core position:** beauty and portability over 99-fit (Q2/Q3). OVR is the only true per-player data input (Q2); "how they like to play" = preferred position, which implies the duty profile (follow-up 1). No named exceptions (Q9), no cross-side floor (Q10), C>OT explained by the value ladder not an exit premium (Q11a), no pair tracking (Q12), no intangibles (Q14), adjustable blend between the two ingredients (Q7), gravity now and possibly inside the formula (follow-up 3), dual positions free between a player's own two (Round-2 Q1), late rounds seamless (Q6), positions not in the game priced by the formula with no hand rules (P-338; Round-2 Q2: roles like DL5-as-blitzer emerge). Simple integers to the user; tier bands not pre-committed (Q4, follow-up 2).

**This is a design proposal, not a build.** No product edits, no protected constants touched. Everything checkable by running the read-only probe below.

---

## 1. What the formula needs (inputs)

| Input | Source | Notes |
|---|---|---|
| `ovr` (0–99) per player | the Owner's ratings data (`data/madden27-ratings.csv`, n=1,941; embedded PLAYERS pool n=1,200) | The one true per-player datum (Q2). No str/speed/height per player, no intangibles (Q14). |
| `positions[]` (one or two) | player's preferred position(s); Owner assigns dual positions (follow-up 4; an agent can help gather position-history data, e.g. Nakobe Dean MIKE→WILL) | "How they like to play" (follow-up 1). Dual positions play both for free (Round-2 Q1). |
| Duty profile per position | authored once per sport — conceptual "positional requirements", 0–10 over universal duties | Sport-agnostic schema (LINE, PRESSURE, COVER, HANDLE, CARRY, CATCH, SNP, RNG). Basketball swaps in its own profiles; formula unchanged. |
| Slot value `w[slot]` | COMPUTED by the engine (slotWins20, per P-318/P-321); `tools/mathlab/design.json` is the design-time proxy (QB 1000 … FB 25) | Portable across sports: the Owner does NOT provide weights for other sports — the engine computes them (Q2 portability demand). |

**Not an input:** per-player speed/strength, mentality, technique, style labels (Q2 follow-up 1, Q14).

---

## 2. The formula

```
cap[pos][d](ovr) = CAP[pos][d] × ovr / 100          // what the body can supply, scaled by how good the player is
                                              // duties at CAP = 0 stay 0 at any OVR ("a great athlete can't play pitcher")

fitGap(player → dst) = Σ_d W[d] × max(0, demand[dst][d] − cap[player.pos][d](ovr))
                                              // what the destination job needs that this body lacks

abilityPts = fitGap × FIT_SCALE

guardPts(src → dst) = clamp( 20 × (1 − w[src] / w[dst]) , 0 , GUARD_CAP )
                                              // value ladder: you can't profit by moving a cheap player to an expensive spot
                                              // w = computed slot value (design.json at design time)

raw = ALPHA × abilityPts + (1 − ALPHA) × guardPts        // Q7: adjustable blend, ALPHA ∈ [0,1], default 0.5
raw = clamp(raw, 0, 12)

price shown to user = round(raw)                         // Q4: simple integer; Q4 follow-up 2: tier bands TBD after engine output
raw (continuous) kept for the optimizer / lineup value     // "crazy math hidden in the background" (Q4)
```

**Structural rules (one named rule, not a per-rule override dictionary — Q9):**

1. `dst ∈ player.positions` → price 0. Same position = 0; **dual positions play both ways for free** (Round-2 Q1, Owner-confirmed).
2. `dst === 'FB'` and src is a natural blocker → price 0. The Owner's FB-free destination rule — one structural rule, all other FB prices come from the formula.
3. Everything else falls out of ability + guard. No per-rule overrides, no override dictionary, no cross-side floor (Q10 — deleted), no C PBLK pair tracking (Q12 — rejected), no exit premium (Q11a — declined; see §5).

---

## 3. Parameters (few, named, tunable — Q7 "whatever is the most malleable")

| Parameter | Value | Meaning |
|---|---|---|
| `FIT_SCALE` | 2.0 | fit-gap units → points on the same scale as the guard |
| `GUARD_CAP` | 12 | guard maxes at the top tier |
| `ALPHA` | 0.5 (default) | blend: ability vs guard; tune in [0,1]; sensitivity shown in §11 |
| `REF_OVR` | 80 | reference OVR for the 99-table check (guide only, not a target) |

Duty weights W: LINE 1.0, PRESSURE 0.9, COVER 0.9, HANDLE 0.8, CARRY 0.7, CATCH 0.7, SNP 0.3, RNG 0.6.

CAP/DEMAND profiles: 0–10 per position over the 8 duties (football values shown; basketball swaps them in). Full profiles live in the probe (`_agents/super/tools/derive-super-v5.mjs`), including SS2 and DL5 for the probes in §9–§10.

---

## 4. How it answers each hard point of the Q&A

**Q2/Q3 — beauty and portable over matching the 99.** "I really don't care about meeting these 99 at all… the best formula that lets us be the most portable… OVR might be the only true data that needs to be inputted." → One formula, four terms, inputs are OVR + position + computed slot values. Portability: swap CAP/DEMAND/slot_value for another sport; zero formula changes. Scoring vs the 99 is a guide only (§11), not a target.

**Q4 — simple integers to the user.** "Crazy math hidden in the background… all information to the user should generally be presented in easy to understand integers." → `round(raw)` is shown; continuous raw never reaches the user. 0/2/6/12 not pre-committed ("this 0,2,6,12 system is not necessary"); tier bands decided after we see what the engine naturally produces (follow-up 2). No words like "slight/real/heavy".

**Q6 — late-round seamlessness.** "Make the last few rounds as seamless as possible… simple decisions in the second half." → After round 10 the board shows only the rounded integer price plus a best-available-by-single-number recommendation and one-click roster fill; the blend α, the raw number, and the duty math stay hidden. UX + presentation question (P-337), no flex-pricing change.

**Q7 — adjustable blend.** "Maybe both. An adjustable ratio between the two… the most malleable so it is easy to tune." → `ALPHA` is a single named constant; §11 shows how α 0.3/0.5/0.7 moves C>OT, QB>FS, TE>FS, RB>WR.

**Q9 — no named exceptions.** "I would prefer not to have any named exceptions… everything unified in one general model." → Zero per-rule overrides. Two structural rules only (own positions free; FB free destination). Every disagreement with the 99 is reported with a reason, never patched (§11).

**Q10 — delete the cross-side floor.** "An ugly appendage; scaffolding for an inelegant formula." → No floor. Cross-side moves are priced by ability + guard alone: verified — every cross-side rule in the 99 prices ≥ 6 except the four FB-destination rows, which are the Owner's explicit structural exception (§11).

**Q11 — C>OT = 12 via the value ladder, not the exit premium.** "a is the best answer to this C to OT question." → C>OT = 12 at every α (guard carries it: guardPts = 12 clamp; raw 11.20 at α 0.5). Z.ai's exit-premium surface (`EXIT[C]`, tested 99/99) is a formula extension the Owner did not ask for — declined as an extension; the value ladder explains the row without it. Consistent with Q12 (no pair tracking: C PBLK body/job pair is not wanted).

**Q12 — no pair tracking.** "Ideally you wouldn't have to adjust or track pairs." → No body/job pairs anywhere. C's low score and low job demand are not paired; C's value comes from w[C] = 0.15 (cheap slot) in the guard.

**Q14 — no intangibles.** "I don't like this at all. Mentality and technique seems untrackable. No intangibles type scoring." → None. OVR + position only.

**Q15 — unpriced 289 moves: prohibition + formula pricing.** "A combination of b and c… some prohibitions… fluidity." → The formula prices all 289 position-pairs. A price at the cap (12) is "prohibited in practice" (too expensive to use); beyond that, an explicit hard list only for physically absurd pairs (none needed for football beyond the cap — see §9 SS2: 13 of 19 roles price at 12 into SS2). Dual positions = fluidity (Travis Hunter plays CB and WR free both ways). Multiple positions per player supported.

**Follow-up 1 — "how they like to play" = preferred position.** "Their preferred position says a lot not only about the exact position they play but also what similar attributes they must have." → position → duty profile mapping; no per-player style labels.

**Follow-up 3 — gravity NOW, maybe inside the formula.** → §6: gravity as a formally measured engine stat + advanced-stats display, plus a proposed flex-term and a defined test (P-335). Flagged: the engine doesn't track double teams yet; this is the thing to test next round, and it may be cut (Owner's Q8 caution: "an easy point of failure for the rest of the balance").

**Round-2 Q1 — dual positions cost.** "A dual position would play both for free; that is the point of holding both positions." → Structural rule 1: free both ways between a player's own positions. Owner assigns dual positions; an agent can assist with position-history data (follow-up 4).

**Round-2 Q2 — roles emerge (DL5-as-blitzer).** "I would have hoped that the dl5 as a blitzer would have naturally emerged from the formula. I don't like that I had to specify it." → §10: DL5 has no pricing rule; its demand profile (PRESSURE 8, LINE 3) makes EDGE→DL5 cost 2 (raw 1.40) and QB/WR cost 12 — the role emerges from the formula, not a hand rule.

**Round-2 Q3 — WR3 mix.** "The newest weights is my general feeling about it but obviously it is fluid." → slot values come from design.json (the newest engine weights); if they change, flex prices move automatically — no table edit.

---

## 5. Gravity — design and the flex-formula test (P-335, follow-up 3: "Now. it might be part of the formula itself.")

**Measurement (what counts as gravity):** a player draws a double team when the offense avoids him — passes not thrown at the covered receiver, runs not taken at the defended gap. Deterrence = plays not run / throws not attempted where he is the primary defender, normalized by snaps. Offensive gravity (WR1 draws doubles → line/backs better) and defensive gravity (rim-protector analogue: corner who suppresses throws, DT who suppresses runs) are the same stat measured on either side of the ball. Present in football, basketball, soccer, hockey — not baseball (Q8).

**Engine hooks:** gravity feeds team value (a gravity player raises teammates' effective value) and an advanced-stats section (double teams drawn, deterrence, usage) — "available for the user to see in advanced stats" (Q8).

**Flex-term proposal (to test, not to ship yet):** a gravity player at the destination covers your gaps — reduce fitGap for the duties he covers when flexing into a role alongside him; conversely, moving a gravity player out of his natural role prices the lost deterrence. This is the one place Q8's "what you lose at the old spot" idea enters cleanly — as a gravity term, not a per-role exit premium.

**Test:** price a flex into/out of a gravity role with and without the term; if the ranking disagreements with the Owner's sense don't move meaningfully, cut the term (Owner's Q8 caution). Status: **proposal only — no numbers yet; engine lacks double-team tracking.** INFERRED design, unverified.

---

## 6. Worked examples (VERIFIED — probe output below)

| Example | Result | Why |
|---|---|---|
| C→OT (Owner 12) | **12** at α 0.3/0.5/0.7 (raw 11.20) | Value ladder: w[C]=0.15 (cheap), w[OT]=0.50 → guard clamps at 12; the 12 is the slot-value difference, not the OT job demands (Q11a) |
| QB→FS (Owner 12) | **12** at every α (raw 12.00) | QB has COVER 0 / RNG 0 — ability gap alone carries it; no floor needed |
| TE→FS (Owner 12) | **12** at every α (raw 12.00) | Coverage + range gaps; TE can't play deep safety |
| RB→WR (Owner 12) | **12** at every α (raw 12.00) | Guard clamps: cheap RB slot → expensive WR1 slot |
| WR 99 OVR → TE | **6** (raw 5.01) | OVR scales capability |
| WR 70 OVR → TE | **6** (raw 6.51) | Same move, worse player costs more — OVR is the input (Q2) |
| Ja'Marr Chase (WR 99) → TE | **6** | Real player from `data/madden27-ratings.csv` |
| CB+WR dual player: CB→WR and WR→CB | **0, 0** | Structural rule 1 — plays both for free (Round-2 Q1) |
| Cross-side minimum | **6** (except 4 FB-destination rows = 0, the Owner's FB rule) | No floor; ability+guard price cross-side ≥ 6 on their own (Q10) |

---

## 7. Positions not in the game — SS2 "big nickel" probe (P-338)

SS2 is not a real slot (no design.json entry). I gave it a duty profile (COVER 8, RNG 6, LINE 2, PRESSURE 3 — an SS who plays nickel) and a slot value of 0.05 (sub-package), then priced every role into SS2. **No hand rules — value and prohibitions fall out of the formula:**

- **Cheap (6):** SS, CB, FS, EDGE, OLB, SAM, NICKEL, DIME — defensive backs and edge bodies can slide in.
- **At the cap / prohibited in practice (12):** QB, OT, OG, C, TE, WR, RB, FB, DT, ILB, K, P — bodies that can't cover or rush from the slot.
- **SS2→SS2 = 0** (same role).

This is the leave-one-role-out test applied to a missing position: the position's value and its natural prohibitions come from the duty profile + computed slot value, exactly as Q15/P-338 require. VERIFIED by the probe (§11 output).

---

## 8. Scoring vs the 99 rules — a guide, not a target (Q2/Q3)

Probe run: `node _agents/super/tools/derive-super-v5.mjs` (read-only; reads `flex.json` + `design.json` from `origin/architect/engine-and-seats`; writes nothing).

Input hash: `flex.json` + `design.json` (origin/architect/engine-and-seats) sha256 prefix **0dfd7f3fcb56**.

```
99-table check (reference OVR 80, guide only):
  rules 99, exact 58, off-by-one-tier 38, hard misses 3, no-profile 0, fit 96/99
  Mean absolute tier error: 0.44 tiers
```

**Hard misses (all three are explained disagreements, none patched — Q9):**

| Row | Owner | Model @ OVR 80 | Reason |
|---|---|---|---|
| CB>FS | 0 | 6 (raw 6.30) | Owner treats CB→safety as free (DB-family symmetry at the same level); symmetric duty model penalizes CB's lack of deep range (RNG). Accepted (same as my earlier models). |
| CB>SS | 0 | 6 (raw 5.10) | Same asymmetry in the other direction. Accepted. |
| ILB>OLB | 0 | 6 (raw 4.14) | Role convention (MIKE vs WILL distinction), not a skill gap — the Owner's item 6 prices MIKE→WILL free but WILL→MIKE 6; a symmetric model can't express it. Accepted. |

**Biggest off-by-one-tier disagreements (owner 6 → model 12):** CB>WR, EDGE>RB, EDGE>TE, ILB>TE, OG>EDGE, OLB>TE, OT>EDGE, SS>TE, TE>SS, WR>FS, DT>EDGE, C>OG — raw ≥ 9 in every case; these are cross-archetype or cheap-slot→expensive-slot moves the value ladder pushes to the cap. Reported as honest disagreements; the Owner can raise/lower `ALPHA` (single dial) rather than editing rows.

**Deliberately not optimized for the 99.** Per Q2/Q3, the target is explainability + portability; 96/99 at OVR 80 with 3 named misses and a 0.44 mean tier error is reported so the Owner, Claude, and Z.ai can judge whether the disagreements are ones they agree with (Q20: "done" = a feeling that can be adjusted).

---

## 9. How to check

```
cd <this worktree>
node _agents/super/tools/derive-super-v5.mjs
```

Expected output: the blocks above — 99-table counts at REF_OVR 80; cross-side minimum 6 (FB-free rows excepted); dual-position demo 0/0; OVR-scaling demo; α sensitivity for C>OT/QB>FS/TE>FS/RB>WR; SS2 probe with 13 roles at cap; DL5 emergence EDGE→DL5 = 2; receipt hash 0dfd7f3fcb56 for flex.json + design.json.

Read-only: reads only git objects and `data/madden27-ratings.csv`; writes nothing; no product edits; no protected constants touched.

---

## 10. Files

- `inbox/20261110-1142-super-P-322-derivation-v5-qna.md` — this design document
- `_agents/super/tools/derive-super-v5.mjs` — read-only probe (new; lives in my lane, `tools/` left untouched)
- Prior P-322 work (superseded by this v5): `inbox/20261110-1800-*` formal submission, `inbox/20261110-1600-*` reconsideration, `inbox/20261110-1400-*` report, `inbox/20261110-1200-*` original design, `tools/mathlab/derive-super-{merged,overlay}.mjs`

**Evidence labels:** prototype results §6–§8 = VERIFIED (ran the probe). Gravity design §5 = INFERRED / proposal, unverified (engine lacks double-team tracking). Q&A anchors = Owner's words, verbatim relayed in the cleaned Q&A and owner-notes.

**Next:** reviews from two other seats (VERDICT ok/improved/rejected) → REVIEWED per `inbox/README.md`; then the Architect decides whether and how to build it. P-335 (gravity), P-336 (dual positions), P-337 (late-round seams), P-338 (SS2 probe) sit on top of this derivation once it converges.
