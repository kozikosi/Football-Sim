SPEAKER: VL | ROLE: council | TASK: P-284 | DATE: 2026-11-06T12:12Z
REVIEW-OF: _agents/muse/deliveries/P-284-consensus-ranges-2026-11-06.md (on council/muse)
VERDICT: improved

## What I checked

- Read the consensus table via `git show origin/council/muse:_agents/muse/deliveries/P-284-consensus-ranges-2026-11-06.md`. VERIFIED (file present on council/muse).
- Read all seven source tables: VL local `inbox/20261106-1139-vl-P-284-weights-table.md`; Beam `origin/council/beam:inbox/20261106-1141-beam-P-284-weights-table.md`; OR `origin/council/or:inbox/20261106-1200-or-P-284-weights-table.md`; VLOC `origin/council/vloc:inbox/20261106-114804-vloc-P-284-weights-final-table.md`; GPT/Groq/DS `origin/council/muse:inbox/20261106-1156-{gpt,groq,ds}-P-284-weights-table.md`. Every consensus range (min–max) and typical value reproduces exactly from the seven tables. VERIFIED (full 32-slot cross-check; no discrepancy found).
- `grep -n 'DEFAULT_WEIGHTS' Football-Sim-PreColors.html` → line 452, 34 keys; the 8 non-roster depth keys are exactly WR4, DL5, LB4, CB4, SS2, FS2, P, FB. VERIFIED.
- `grep -n 'ROSTER_SLOTS' Football-Sim-PreColors.html` → line 924, 26 starter slots; comment confirms no DL5/LB4/CB4/SS2/FS2/WR4/P/FB. VERIFIED.
- `sha256sum Football-Sim-PreColors.html` → 40233d6be00e987c…95fd, 657,486 B = Pre-Colors (AGENTS.md §2). VERIFIED.
- Salary column: VL's OTC 2024 figures (QB $28.28M, CB1 $10.88M, DE1 $18.00M, CB2 $6.67M, WR1 $19.18M, DE2 $11.91M, OT1 $8.59M, DT1 $16.43M, SS $8.13M, MIKE $7.89M, FS $8.13M, OG1 $11.07M, OG2 $6.13M, C $3.73M, WILL $5.97M, TE1 $8.33M, DT2 $10.96M, K $3.90M, RB1 $5.46M, WR2 $10.74M, RB2 $3.34M, TE2 $4.14M, P $2.15M) trace to VL's OTC pull and match the consensus table. VERIFIED against VL's filing. Groq/OR fills (OT2 $9.14M RT 11–20; DT/DT2 gap fills) and all "~$X–Y judgment" marks are REPORTED / INFERRED, not re-verified by me; where I cite them I say so.

## 1. Salary alignment by position group

QB = 1000 anchor; salary $28.28M → 1000/1000. Aligned by definition (VERIFIED).

| Slot | Median salary (OTC 2024) | Salary/1000 | Consensus weight | Salary vs weight | Alignment |
|------|--------------------------|-------------|------------------|------------------|-----------|
| CB1 | $10.88M (CB 11–20) | 385 | 568–570 | weight ≈ 1.5× salary | NO — weight above market |
| DE1 | $18.00M (EDGE 11–20) | 636 | 510–512 | weight ≈ 0.8× salary | YES-ish (premium both sides) |
| CB2 | $6.67M (CB 21–32) | 236 | 460–465 | weight ≈ 2.0× salary | NO — engine far above market |
| WR1 | $19.18M (WR 11–20) | 678 | 434–450 | weight ≈ 0.65× salary | NO — market above sim impact |
| DE2 | $11.91M (EDGE 21–32) | 421 | 430–435 | ≈ 1.0× | YES — closest alignment in table |
| OT1 | $8.59M (LT 11–20) | 304 | 408–410 | weight ≈ 1.35× salary | Weight above market |
| OT2 | $9.14M (RT 11–20, Groq fill) [disputed: VL/OR $3.86M RT 21–32] | 323 [or 136] | 400–410 | weight above either | Weight above market |
| DT1 | $16.43M (IDL 11–20, fill) | 581 | 370–372 | weight ≈ 0.64× salary | NO — market above sim |
| CB3 | ~$4–6M (judgment; CB 21–32 proxy 236) | ~236 | 365–370 | weight ≈ 1.6× salary | NO — follow engine |
| SS | $8.13M (S 11–20, fill) | 287 | 348–350 | weight ≈ 1.2× salary | NO — follow engine |
| MIKE | $7.89M (LB 11–20) | 279 | 310–316 | weight ≈ 1.1–1.2× salary | Rough |
| FS | $8.13M (S 11–20, fill) | 287 | 335–340 | weight ≈ 1.17× salary | NO — follow engine |
| OG1 | $11.07M (OG 11–20) | 391 | 330–336 | weight ≈ 0.85× salary | Rough |
| OG2 | $6.13M (OG 21–32) | 217 | 325–336 | weight ≈ 1.5× salary | NO — sim ignores 1-vs-2 split |
| C | $3.73M (C 11–20) | 132 | 328–336 | weight ≈ 2.5× salary | NO — market structurally depressed |
| WILL | $5.97M (LB 21–32) | 211 | 310–316 | weight ≈ 1.5× salary | NO — follow impact |
| TE1 | $8.33M (TE 11–20) | 295 | 310–315 | ≈ 1.05× | YES |
| DT2 | $10.96M (IDL 21–32, fill) | 388 | 299–300 | weight ≈ 0.77× salary | Market above sim |
| K | $3.90M (K 11–20) | 138 | 30–285 | split: 0.1–2× | Genuine judgment split |
| RB1 | $5.46M (RB 11–20) | 193 | 249–262 | weight ≈ 1.3× salary | NO — market depressed |
| WR2 | $10.74M (WR 21–32) | 380 | 235–240 | weight ≈ 0.63× salary | NO — market above sim |
| WR3 | ~$4–6M judgment | ~140–210 | 150–151 | ≈ 1× | Rough (judgment) |
| RB2 | $3.34M (RB 21–32) | 118 | 83–90 | weight ≈ 0.7–0.8× | Rough |
| TE2 | $4.14M (TE 21–32) | 147 | 55–60 | weight ≈ 0.4× salary | Market above sim |
| SAM | ~$4–6M judgment | ~140–210 | 29–32 | weight far below | Depth role; correct |

Confirmed aligned (weight ≈ market within ~30%): DE1, DE2, TE1. Rough: MIKE, OG1, WR3, RB2, TE2. Not aligned (direction stated, handled in §2): CB1, CB2, WR1, OT1/OT2, DT1/DT2, CB3, SS, FS, C, WILL, K, RB1, WR2, SAM.

Two salary-column issues to flag:
- OT2: consensus uses Groq's $9.14M RT 11–20; VL/OR used RT Players 21–32 $3.86M. Per the stated rule (starters → 11–20; OT1 and OT2 are both starters), the starter-tier direction is right, but whether OTC publishes a clean "RT 11–20" median is INFERRED. Weight 400–410 exceeds either figure, so the conclusion (weight above market) holds either way.
- CB3/WR3/WR4/TE3/FB/SAM/DL5: no clean tier; all judgment/proxy. Consensus marks them as such — correct labeling.

## 2. Where weight should NOT follow median salary — and why

Weights price marginal simulated wins per +1 OVR; salaries price NFL contract value. They measure different things, and the market is structurally wrong for several slots:

**Secondary (CB2/CB3/SS/FS) — follow the engine, do not moderate to market.** CB2 impact is 0.463 of QB but the market pays 23.6% ($6.67M vs $28.28M); CB3/SS/FS have no clean market tier at all. Football reason: in this sim the QB is an outlier (0.127 wins/OVR, far above the rest) and passing dominates; pass coverage is the primary nonlinear counter — a CB2/FS breakdown becomes a big play or TD, while a "good enough" secondary still gets burned. The NFL market underpays because of the rookie wage scale (elite corners signed cheap for 4–5 years), the franchise tag suppressing safety pay, and teams paying for "shadow WR1" (CB1 money) while nickel/dime snaps (CB2, CB3, FS, SS) go unpriced. The engine's CB2/CB3/SS/FS values are the measurement; market pay is a contract artifact. Endorse engine values: CB2 ~460–465, CB3 ~365–370, SS ~348–350, FS ~335–340. Eight of nine filers agreed; I agree.

**K — floor to ~30, do not sit near revealed impact (284).** Revealed impact ranks K #20 of 26 measured slots (ahead of RB1) — absurd. Football reason: a kicker creates nothing; he converts opportunities created by offense/defense, and FG variance decides close simulated games far more than real ones. NFL pay proves replaceability: $3.9M median, veterans on minimum deals, easy to replace. VLOC's floor of 30 (near DEFAULT_WEIGHTS 5) is the right direction; final ≈ 30–50, not 200–285.

**C — do not follow the market ($3.73M, 132/1000).** The center's market is the most depressed starter market: rarely franchised, rookie deals, invisible pre-snap value (protection calls, line calls, shotgun snaps). Football reason: a failed center fails the play exactly like a failed guard, and the sim's impact model gives C identical impact to OG1/OG2 (0.04262). Keep C at ~335, equal to guards. The market structurally cannot price the center's pre-snap value.

**CB1 — follow impact (568–570), not market (385).** CB1 is #2 in wins value; shutting down the opponent's WR1 is a direct counter to the QB. Market underpays elite corners because of rookie contracts and tag suppression. Reject DS's 499 blend; 568–570.

**WR1 — do not follow the market either.** Market $19.18M (678/1000) is 1.56× sim impact (434). Passing-league scarcity sets #1 WR contracts at elite-outlier levels, not median marginal wins. Keep ≈ 434–440. Reject DS's 480 (50/50 Colors/revealed blend dilutes the verified measurement without justification).

**RB1 — keep ~249–262 above market ($5.46M, 193).** RB market depression (replaceability narrative) is real, but the sim impact (262) is measured wins, and the sim likely understates RB value (pass protection, receiving, short-yardage/goal-line not captured per-slot in the OVR model). A modest departure above market is defensible; don't cut to market.

**DT1/DT2 — market overpays vs sim impact (581/388 vs 370/299).** Interior DL contracts are huge (run defense + snap volume) but marginal simulated wins per OVR are lower. Don't follow market; keep near impact.

**OG1/OG2/C — keep weights equal (0.04262 impact each).** Market splits them ($11.07M / $6.13M / $3.73M). Football reason: the interior line fails as a unit; guard 1 vs guard 2 does not change win probability per snap. Don't import the market hierarchy into weights.

**Depth/special teams (FB, P, DL5, WR4, TE3, DIME, plus LB4/CB4/SS2/FS2) — unmeasured (not roster slots).** Weights here should be minimal depth floors, not Colors carry-overs (P 100, DL5 145 are arbitrary).

## 3. The five open questions

**1. K: 30–285.** VLOC is right to floor; the six-seat cluster at 200–285 follows a revealed-impact number (284) the sim itself inflates. Football reason above: kicker wins are conditional and replaceable; the matchup model over-credits FG variance. Recommend final ≈ 30 (endorse VLOC's floor), band 30–50 max.

**2. Unmeasured depth slots (FB, P, DL5, WR4): near-zero, not Colors.** VL/OR/VLOC's treatment is correct: unmeasured slots get minimal depth weights. Beam/GPT/Groq/DS keeping Colors (FB 30, P 100, DL5 145, WR4 10–15) imports arbitrary carry-overs. Stronger point: VL/OR/VLOC's depth-key set (WR4, DL5, LB4, CB4, SS2, FS2, P, FB) is exactly DEFAULT_WEIGHTS's 8 non-roster keys (VERIFIED, line 452); Beam/GPT/Groq/DS's TE3/DIME keys do not exist in DEFAULT_WEIGHTS, so their weights there are dead. Recommend: key set = WR4/DL5/LB4/CB4/SS2/FS2/P/FB; values in 1–16 (VLOC's 15/15/15/15/15/15/10/35 is a concrete option; P and FB at the bottom). Consensus table also omits LB4/CB4/SS2/FS2 rows — the final table must cover all 8 keys.

**3. WR1: 434–480.** Land at ≈ 440 (pure revealed 434 with a small nod to market/gravity not captured; Groq's 440). Reject DS's 480 blend — blending 50/50 with Colors dilutes a VERIFIED measurement for no stated reason. WR2/WR1 stays 0.544 (in-band) at WR2 ≈ 236.

**4. Secondary: engine vs market.** Endorse the engine. Football reason above (passing dominance, nonlinear coverage value, rookie scale/tag suppression, unpriced nickel snaps). No moderation: CB2 ~460–465, CB3 ~365–370, SS ~348–350, FS ~335–340. The market underpays; the sim should expose that inefficiency, not copy it.

**5. CB1: 499–570.** DS's 499 blend is wrong; reveal-impact 568–570 (six of seven seats) is the answer. CB1 is #2 impact; market underpays elite corners. Follow impact.

## Recommended final-table position (my §3 votes, integer, QB = 1000)

QB 1000 · CB1 568 · DE1 512 · CB2 463 · WR1 440 · DE2 433 · OT1 408 · OT2 408 · DT1 372 · CB3 370 · SS 348 · MIKE 340 · FS 336 · OG1 335 · OG2 335 · C 335 · WILL 316 · TE1 315 · DT2 299 · RB1 262 · WR2 236 · WR3 151 · RB2 86 · TE2 57 · SAM 29 · K 30 · depth keys (WR4/DL5/LB4/CB4/SS2/FS2/P/FB) at 1–16 minimal, e.g. 15/15/15/15/15/15/10/3.

Rationale: WR1 440 (not DS's 480), CB1 568 (not DS's 499), K 30 (VLOC floor), depth keys minimal with the DEFAULT_WEIGHTS key set, secondary at engine values. WR2/WR1 = 236/440 ≈ 0.536, inside the Owner's 0.4–0.6 band and matching revealed 0.544.

## Evidence labels and receipts

- Consensus table + all seven source tables: VERIFIED (read directly; ranges reproduce exactly).
- DEFAULT_WEIGHTS 34 keys / depth-key set / ROSTER_SLOTS 26: VERIFIED (grep on Football-Sim-PreColors.html, lines 452 and 924).
- Build sha256 40233d6be00e987c…95fd, 657,486 B = Pre-Colors: VERIFIED (sha256sum).
- OTC salary figures where traced to VL's filing: VERIFIED there; Groq/OR fills and judgment marks: REPORTED / INFERRED (not re-verified by me).
- Football reasoning (§2–§3): VL judgment, labeled INFERRED where it extends beyond measurement.

No product file or protected constant touched; measurement + recommendation only. Three reviews by three different seats (ok/improved) = REVIEWED.

— VL · council/vl · 2026-11-06
