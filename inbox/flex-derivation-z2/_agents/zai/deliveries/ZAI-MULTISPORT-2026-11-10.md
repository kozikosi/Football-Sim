# Z.ai — ZAI-D1 + the Owner's score changes, and the basketball sketch

**Deliverable for:** council/muse `_agents/muse/deliveries/prompts-2026-11-05/zai-multisport-2026-11-10.md` (MUSE High Councillor directive, relayed 2026-11-10)
**Seat:** ZAI · 2026-11-10 · read-only analysis and design — no engine, no flex.json change, no re-pin, no build. The live snapshot stays `4ca9a071`; the live table I ran against is `architect/engine-and-seats:tools/mathlab/flex.json`, which I verified **byte-identical to my w55 snapshot (99 rules, 0 diffs)** before running anything.

---

## 0 · Intake ledger (every directive line mapped)

| # | Directive line | Where it landed |
|---|---|---|
| 1 | "Apply the Owner's score changes to ZAI-D1 and re-run. Confirm 98/99 with only C>OT off by one. Also run C PBLK 7 and confirm 97/99." | §1 — both confirmed, plus one verification addition MUSE's run missed (the self-doable invariant, §1.3) |
| 2 | "Report the full diff" | §1.4 + `_agents/zai/tools/results/zai-d1-v4-full-diff.md` (all 99 rows) |
| 3 | "Say whether you agree with each score change on football grounds" | §1.2 — I agree with all three, with one refinement on C PBLK |
| 4 | "Think about C>OT … a lower C score, a separate one-on-one pass-protection duty, or an honest off-by-one? Propose what you think is right" | §2 — I built and ran the one-on-one duty (receipts: it breaks five 6-rows), then found why it *cannot* be the mechanism: the row prices the center's EXIT, not the OT job. Recommendation: accept the off-by-one, or adopt the exit-premium surface (§2.3) |
| 5 | "Sketch the basketball duty set and HAVE/NEED matrices (design only). Design your own duty set the way you designed the football one" | §3 — 13 duties, 5 positions, NEED-first situational jobs, 40 derived prices |
| 6 | "Derive a few example flex prices (e.g. PF>C, SG>PG)" | §3.4 — all 40 pairs derived, the named examples included |
| 7 | "Do not build anything for basketball" | honored — the sketch is one read-only script (`zai_basketball_sketch.py`), like the football one |
| 8 | "Innovate: a duty with no football equivalent? NEED/HAVE in fluid sports? λ=0.4 across sports? A cleaner sport-agnostic framing?" | §4 — five items, each with a testable claim |

**Boundaries honored:** read-only on the product; derivation stays a tool; everything batched in this one delivery.

---

## 1 · Task 1 — the Owner's score changes, applied and re-run

### 1.1 The fit

Formula untouched: `tier(M + 0.4·S)`, cuts 1/4/9, tiers 0/2/6/12, cross-side floor 6. Three score cells changed, zero patches, zero overrides:

| variant | exact | off-by-one | hard | tier-error | residuals |
|---|---|---|---|---|---|
| ZAI-D1 baseline (re-verified first) | 95 | 3 | 1 | 5 | C>OG, C>OT, EDGE>RB, TE>OT |
| EDGE CARRY 4 | 96 | 2 | 1 | 4 | C>OG, C>OT, TE>OT |
| C PBLK 6 (NEED 6) | 96 | 3 | 0 | 3 | C>OT, EDGE>RB, TE>OT |
| TE PBLK 4 | 96 | 2 | 1 | 4 | C>OG, C>OT, EDGE>RB |
| **V4: EDGE CARRY 4 + C PBLK 6 + TE PBLK 4** | **98** | **1** | **0** | **1** | **C>OT only** |
| V5: same, C PBLK 7 (NEED 7) | 97 | 2 | 0 | 2 | C>OT, C>OG |
| V6: same, C PBLK 4 (NEED 4) | 99 | 0 | 0 | 0 | none |

**Confirmed exactly as MUSE reported:** V4 = 98/99 with only C>OT off by one (owner 12, model 6, raw 6.68 — M 6.20 on PBLK); V5 = 97/99 with C>OT and C>OG off by one (C>OG raw 3.58 vs the 4-cut — a knife-edge, like the old TE>OT). The baseline reproduced to the digit before I changed anything (95/3/1, tier-error 5, same four residuals).

### 1.2 Football agreement with each change — yes on all three, one refinement

**EDGE CARRY 2 → 4: agree.** Edges are the best athletes on the field — that is *why* the position recruits from the ball-carrier tree (most NFL edges were high-school RBs, QBs or TEs). CARRY 2 asserted "cannot carry at all," which the athleticism contradicts; 4 says "honest on a scramble or a counter," which is true. I verified the change is local: the only live row where EDGE-as-carrier loads is EDGE>RB (raw 10.40 → 8.60, model 6 — exact), because CARRY appears in the NEED of QB/RB/WR/TE/FB and EDGE has no live rows into WR/QB; the TE and FB rows are unaffected (CARRY 3 and 1 are ≤ 4). All 11 EDGE rows exact in V4.

**C PBLK 9 → 6: agree in direction, and the 9 was conflating two protections.** One axis is carrying: (a) scheme protection — communication, slides, doubles, the center is the best on the line at this; and (b) isolated one-on-one vs a 3-tech or a stunt's free rusher — where shorter arms, a higher center of gravity and no tackle's recovery tools make him much worse. A single 0–10 number forces the honest value down to the Owner's 6–7, because (b) is what gets the team scored on in the situations the table prices. **The refinement: this change is not one cell but two** — see §1.3.

**TE PBLK 5 → 4: agree** (weakest of the three, but harmless in scope). Pass protection for a tight end is survival reps, not craft — he blocks the best edge-setter only in heavy sets and usually with a chip or tight-alignment help. 5 credited a craft he does not have. Scope verified: only TE rows into PBLK-loading jobs move — TE>OT becomes exact (10.18, M 9.30 on PBLK); TE>C (6.59), TE>OG (8.63, knife-edge), TE>DT (PBLK 4 need, 0 deficit) all unchanged and exact. All 14 TE rows exact in V4.

### 1.3 The verification addition: the change is a PAIR, and the pair is free

My design carries one invariant MUSE's run did not track: **`need[X] ≤ have[X]` for every job X** — every job is doable by its own starter, which is what the Owner's self-rules at 0 assert. Lowering HAVE C PBLK to 6 (or 7) silently breaks it: the C job demands PBLK 8 > 6. MUSE's import overrode HAVE only, so her 98/99 table was computed with the invariant violated.

The honest fix is the **paired change**: NEED C PBLK 8 → 6 (or 7) along with the HAVE cell. That is also the football truth — the center's own job never demands one-on-one protection; it demands the scheme management that lives in SNP 10 and stays untouched. I ran both worlds:

- C PBLK 6 alone (MUSE's run): fit identical (96/3/0 → and 98/1/0 in V4) but self-doable **VIOLATED** (`('C','PBLK',6,8)`).
- C PBLK 6 with NEED C PBLK 6: fit **identical to the digit**, self-doable OK. The paired NEED change moves no other row: the four live rows into C stay exact (OT>C 2.75, OG>C 2.20, DT>C 6.92, TE>C 6.59 — the NEED change slightly *lowers* two raws that were already comfortably inside their tiers).

**Nothing in the Owner's or MUSE's conclusions changes — 98/99 stands under the honest pair.** This receipt is filed so the council adopts the pair, not the bare cell, when the scores become the working derivation.

### 1.4 The full diff

`_agents/zai/tools/results/zai-d1-v4-full-diff.md` — all 99 rows of V4 with owner, model, raw, M-duty, S, verdict. 98 exact. The one off-by-one is §2's subject.

---

## 2 · Task 2 — C>OT: what the 12 actually prices, and my proposal

### 2.1 The one-on-one duty (ISOP): built, run, rejected — with the reason it had to fail

I took the "separate one-on-one pass-protection duty" option seriously enough to build it: a new duty **ISOP** (isolated pass protection vs the opponent's best rusher, no help available), weight 1.5; bodies OT 10 / OG 9 / C 4 / TE 3 / DT 2 / EDGE 2; jobs OT need 10, OG 9, C 3. Run on the live table on top of the other two Owner changes (C PBLK stays 9 — the point of ISOP is that it shouldn't need deflating):

- C>OT → raw 10.10 (M 9.00 on ISOP) → **12 ✓** — the mechanism *works on the target row*
- C>OG → 6 ✓, TE>OT → 12 ✓, self-doable OK
- **But fit drops to 94/5/0.** Five rows break: DT>OG, DT>OT, EDGE>OG, EDGE>OT, TE>OG — all owner 6 → model 12. The DL bodies carry the same ISOP deficit into the OL jobs, and the Owner prices every DL→OL entry at 6.

### 2.2 Why it had to fail — the row is an EXIT premium

The receipt exposes the real object. Compare two rows into the *same* destination job:

| row | body entering | body's PBLK | owner price |
|---|---|---|---|
| DT>OT | a 5-PBLK body | worse prepared | **6** |
| C>OT | a 9-PBLK body (6–7 honest) | better prepared | **12** |

If C>OT priced the OT job's demands, the *worse* body would cost more. It does not. **The 12 is not about what the OT job demands — it is about what you lose at center.** The center is the only offensive role whose exit re-organizes the whole unit: the SNP 10 hub, the line calls, the protection slides everyone else lines up by. My formula prices destination demands by design — an exit premium is invisible to it *structurally*, which is exactly why there are no fiat rows. (This was already my §6.1 reading of the two hub rows in the original write-up; the Owner's score changes removed C>OG from that family — it was a pure ability miss, fixed by the body score — and left C>OT alone, which is consistent: only C>OT's premium exceeds any honest body score.)

### 2.3 My proposal

**Adopt V4 as the working derivation and accept C>OT as the one named, principled off-by-one.** Reasons:

1. The Owner's own body score (6–7) is more credible than the 4 that would force the fit — a center who snaps, calls protections and blocks well in scheme is not a 4; deflating him to 4 would be bending the ability model to catch one row. My design rule stands: I report residuals, I don't bend weights or scores to catch them.
2. The residual is *explained*, not just tolerated: it is the hub-exit premium, priced by the Owner and structurally out of scope for a deficit-vs-destination formula. A model with 0 fiat rows that names its one honest miss is worth more than a 99/99 with a hidden patch.

**If the Owner wants the 12 captured anyway, there is a clean mechanism — the exit-premium surface — and I tested it:** one authored scalar per role, `EXIT[role]`, added to the raw on all *exits* from that role (FB/specialist exits exempt — that preserves the C>FB = 0 law and the floor's FB exemption symmetry). `EXIT[C] = 3.0` on top of V4: **99/99, tier-error 0** — C>OT 9.68 → 12 ✓, C>OG 8.13 → 6 ✓, C>DT 12.12 → 12 ✓, C>FB 0 ✓. That is one authored number replacing the one broken row — a strictly better trade than a per-row override, and it *generalizes*: the hub role is a sport concept (§4.3 — basketball's PG is the same object). But it is a formula extension, so it is the Owner's call, not mine: **ship 98/99 now; the surface is one line of code if he says the word.**

---

## 3 · Task 3 — the basketball sketch (design only, nothing built)

### 3.1 What drives a basketball flex price

The football design question, asked again: *what does each position's body do, and what does each job demand — where is the gap that gets you scored on?* In basketball the gaps that end possessions are: losing your handle under pressure, being unguardable on the perimeter, not protecting the rim, not finishing box-outs, and not being able to run a team. Thirteen duties:

| duty | meaning | weight | football analogue |
|---|---|---|---|
| HAND | ball handling vs pressure | 1.4 | CARRY |
| HREP | handler repertoire — PnR reads, set calls, press break | 1.5 | THR (scoped) / EREP (asymmetry carrier) |
| PLAY | playmaking, creation for others | 1.3 | THR-as-vision |
| SHOT3 | three-point gravity | 1.2 | DEEP (field-stretching) |
| MID | mid-range / floater craft | 0.7 | CTH-craft |
| FT | free-throw shooting | 0.4 | SNP (machinery, survivable) |
| FIN | finishing at the rim | 0.9 | CARRY-at-the-rim |
| OFFB | off-ball movement, cutting, spacing | 0.7 | RTE (route craft off the ball) |
| POST | post scoring | 0.8 | RBLK-as-offense |
| RIM | rim protection, drop, verticality | 1.5 | PBLK (the isolated duel) |
| PDEF | perimeter defense on the ball | 1.0 | MCOV |
| HELP | help defense, rotations, low man | 1.0 | ZCOV + RDEF |
| REB | rebounding, box-out + pursuit | 1.1 | RBLK-adjacent |

Deliberate design choices: **no explicit SCOPE dict** — football needed scopes because HAVE carries transversal craft (a WR can throw a bit); in basketball I author the NEED zeros directly, which is simpler and is the form I would now use in football if the council re-authored it. **No SWITCH duty** — switchability is a *pair* property (PDEF × RIM deficits, priced pair by pair), not a duty; making it a duty would double-count it.

### 3.2 The matrices

**HAVE (bodies, 0–10 integers):**

| | HAND | HREP | PLAY | SHOT3 | MID | FT | FIN | OFFB | POST | RIM | PDEF | HELP | REB |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| PG | 10 | 10 | 10 | 7 | 8 | 7 | 5 | 5 | 0 | 1 | 6 | 4 | 3 |
| SG | 7 | 4 | 6 | 9 | 8 | 7 | 6 | 8 | 1 | 1 | 7 | 5 | 4 |
| SF | 6 | 3 | 6 | 7 | 7 | 6 | 7 | 7 | 3 | 5 | 8 | 7 | 6 |
| PF | 4 | 1 | 3 | 6 | 5 | 5 | 7 | 5 | 6 | 6 | 6 | 7 | 8 |
| C | 2 | 0 | 1 | 2 | 3 | 3 | 8 | 3 | 8 | 9 | 4 | 8 | 9 |

Transversal cells (the calibrated ones, each carrying a named asymmetry — the football method exactly): **PG OFFB 5 / SHOT3 7** (PGs learn to play off the ball and shoot off the catch — this is why PG>SG is cheap); **SF medium-everything** (the universal fallback body, like the CB supersets of the safety jobs); **PF HAND 4 / PLAY 3** (modern forwards were initiated in high school); **C FIN 8 / HELP 8** (finishing over size and anchoring are native to the body).

**NEED (jobs, self-doable verified: need ≤ have for all five):**

| job | demands |
|---|---|
| PG | HAND 10, HREP 10, PLAY 9, SHOT3 6, MID 6, FT 6, PDEF 5, OFFB 3 |
| SG | SHOT3 9, OFFB 8, MID 7, PDEF 7, FT 6, FIN 6, HAND 6, PLAY 5, HREP 3 |
| SF | SHOT3 7, PDEF 8, OFFB 7, FIN 7, REB 6, MID 6, PLAY 4, HAND 5, HELP 6, FT 5 |
| PF | REB 8, RIM 6, HELP 7, SHOT3 6, FIN 7, PDEF 6, POST 5, MID 5, OFFB 5, FT 4, HAND 3 |
| C | RIM 9, REB 9, FIN 8, HELP 8, POST 7, FT 3, SHOT3 2, HAND 2, OFFB 2, PDEF 3, MID 2 |

Situational jobs authored NEED-first (the DL5 lesson — author the job, the prices fall out, no neighbor rules): **SB5** small-ball five (RIM 7, REB 7, HELP 9, PDEF 7, SHOT3 6, FIN 7, FT 5, OFFB 5) · **WD3** 3-and-D wing (SHOT3 9, PDEF 8, OFFB 8, FT 5, FIN 5, REB 4, HELP 6) · **PWF** point-forward (HAND 8, HREP 6, PLAY 9, SHOT3 5, REB 6, FIN 7, PDEF 6).

**The floor changes meaning, not mechanics:** cross-SIDE becomes cross-CLASS — G = {PG, SG}, W = {SF}, B = {PF, C}; a guard into a big job (or a big into a guard job) costs at least 6 as a body-difference policy, SF the bridge. Same semantics as the live football header: ability prices first, the floor is policy. It binds exactly where the football one binds — on wing→small-job rows the ability model prices below 6 (e.g. SG>WD3 raw 1.40 → 6, the WR>NICKEL family reborn).

### 3.3 λ and the correlated-duties question

Basketball's duties are *more correlated* than football's — HAND, PLAY and HREP are one latent axis (creation); RIM, REB and HELP another (interior). When deficits arrive in packs, M already prices the pack and the S-term adds less new information. **Prediction, testable the day a live basketball table exists: the calibration lands λ below football's 0.4 (I would expect 0.25–0.35).** λ = 0.4 stays in the sketch as the football prior, not a calibration — flagged honestly. The ablation distribution (tier counts across λ 0→1) is in the script output; with no oracle to fit, it documents sensitivity, nothing more.

### 3.4 The derived prices (all 40 pairs; the named examples bolded)

| | →PG | →SG | →SF | →PF | →C | →SB5 | →WD3 | →PWF |
|---|---|---|---|---|---|---|---|---|
| **PG** | 0 | 6 | 6 | 12 | 12 | 12 | 6 | 6 |
| **SG** | **12** | 0 | 6 | 12 | 12 | 12 | 6 | 6 |
| **SF** | 12 | 6 | 0 | 6 | 12 | 6 | 2 | 6 |
| **PF** | 12 | 6 | 6 | 0 | **6** | 2 | 6 | 12 |
| **C** | 12 | 12 | 12 | **6** | 0 | 6 | 12 | 12 |

Readings, in basketball words:

- **SG>PG = 12** (raw 12.24, M 9.00 on HREP) — the classic: a two-guard *can dribble* (HAND 7) but cannot *run a team*; the repertoire gap, not the raw handle, is load-bearing. The formula prices the same thing a coach means.
- **PF>C = 6** (raw 6.02, M 4.50 on RIM) — the classic backup big: three inches and a rim-protection gap, everything else carries.
- **C>PF = 6** (raw 7.44, M 4.80 on SHOT3) — *flagged reading*: the formula says the price of a center at the four is the spacing he surrenderers (SHOT3 2 vs need 6). The Owner may price this 12 in a stretch-4 era — if so, the fix is the PF job's SHOT3 need, one cell, and that conversation is exactly what the sketch is for. A residual in a design sketch is a feature: it is the next calibration question, named.
- **PG>SG = 6** (raw 4.00 — exactly at the 4-cut, the sketch's knife-edge row, like TE>OT was) — a point guard sliding off the ball costs a shooting/movement gap. Whether this is 2 or 6 is the first thing a live table would settle.
- **C>PG = 12** (raw 27.28, M 15.00 on HREP) — prohibitive, as it should be; note the *symmetry* with football C>OT: the hub duties (HREP here, SNP+PBLK-there) are what make hub entries prohibitive.
- **PF>SB5 = 2** (raw 3.00, M 2.00 on HELP) — the formula *discovers* small-ball: the four is nearly free at the small-ball five. That this falls out of authored matrices rather than being asserted is the DL5 lesson landing in a second sport.
- **C>SB5 = 6** — priced by the SHOT3 gap: a rim-running five can play the small-ball job but the lineup pays in spacing. Honest for the modern game.
- **SF>WD3 = 2, PG>WD3 = 6 (floor-bound), SF>C = 12** (M 6.00 on RIM) — the 3-and-D job is a wing job; the wing at center is prohibitive because rim protection is the one thing no amount of wing craft substitutes for.

Script: `_agents/zai/tools/zai_basketball_sketch.py` — same read-only pattern as the football tool, 40 derived pairs with every raw, M-duty and S printed. **Design only; no basketball build until 76 Pancakes ships and the repo moves (Owner's ruling honored).**

---

## 4 · Innovate — five items with testable claims

### 4.1 Derive the duty list itself: the NEED-support procedure

The duty list is the one input I authored by hand in both sports. It doesn't have to be: **author the jobs first, then let the duties be the support of the NEED matrix.** Procedure: (1) write each job's demands in scouting words, freely, without a fixed vocabulary; (2) align them into axes — any demand-axis with variance across jobs is a duty; any axis where every job demands the same level prices nothing and is dropped; any axis only one job loads is a *scoped duty* (football THR/EREP/KCK/PNT; basketball HREP is nearly scoped by NEED values alone). Duties become *derived objects* — the support of the NEED matrix — and the authoring loop becomes "write the jobs, not the skills." Testable claim: re-running this procedure on football recovers a matrix within one tier of ZAI-D1's 98/99, because the 17 duties are already (mostly) the support of the NEED dict — KCK/PNT would survive as scoped, DEEP would survive on the FS/DIME variance.

### 4.2 A shared duty vocabulary: six primitive families

Every duty in either sport is one of six primitives: **CREATE** (HAND/PLAY/HREP ↔ THR/CARRY), **FINISH** (FIN/MID/POST ↔ CTH/RTE/CARRY-at-rim), **PROTECT** (RIM ↔ PBLK/RBLK), **CONNECT** (SHOT3/OFFB ↔ SNP/RTE), **RECOVER** (HELP/PDEF ↔ MCOV/ZCOV/RNG/TKL/RDEF), **PROJECT** (SHOT3-gravity ↔ DEEP). The formula never needs these names — but they are how a future sport onboards: write the jobs, check every demand maps to a primitive, any demand that maps to none is either a new primitive (rare, flag it) or a paraphrase (merge it). Testable claim: basketball needed zero new primitives. The sixth (PROJECT) is the closest call — SHOT3 and DEEP are both "stretch the defense from depth," and I considered unifying them; they stay split because SHOT3 prices a *floor-spacing* gap and DEEP prices a *coverage-craft* gap — different deficits even under one primitive.

### 4.3 The hub-exit premium is the multisport bridge

Task 2's finding is not a football footnote. A **hub role** is the role whose exit re-organizes the unit (football C: SNP 10 + protection calls; basketball PG: HREP 10 + set calls), and the Owner's table prices hub *exits* above any honest body deficit. The exit-premium surface (§2.3) is the sport-agnostic mechanism: one authored scalar per role, zero in football except C. Prediction: if basketball ever gets a live table, the PG is where the Owner's hand shows the same pattern — PG>SG priced above what the SG job's demands require. If that prediction lands, the surface earns its place in the formula; if not, it was football-specific and the off-by-one stands. Either way the formula tells us something falsifiable.

### 4.4 Where the formula bends in fluid sports (named honestly)

1. **Lineup geometry.** The formula prices job-pairs; basketball outcomes live in five-man units (a non-shooter hurts less next to four shooters). A lineup-level term is the named future extension — out of scope here, and it should stay out until a live table makes it falsifiable.
2. **Foul exclusion.** Basketball has a mechanic football lacks — the sixth foul. FT-as-duty prices the *hack-a liability* honestly (FT 0.4, the survivable-machinery weight), but foul trouble itself is unpriced. Named, not solved.
3. **Two-way jobs.** Every basketball job loads both ends; football jobs are mostly one-sided. No structural change needed — M picks the worst deficit from either end — but HAVE rows must be scored two-way honestly (my C row carries RIM 9 *and* POST 8, not one "big man" number).
4. **Position continua.** Basketball positions are labels on a continuum (the same player is a 3 or a 4 depending on the night). The NEED/HAVE split handles this better than a single-matrix design would — the *job* is a fixed demand profile even when the *body* is fluid — but it means the calibration set matters: a live table should come from job-slots (lineup designations), not jersey labels.

### 4.5 A basketball duty with no football equivalent

Requested explicitly; the honest answer after two design passes: **no**. The closest candidates all reduce: HREP is the EREP analogue (repertoire asymmetry); FT is the SNP analogue (machinery); OFFB is RTE off the ball; SHOT3 is DEEP with a floor. What basketball *does* have that football lacks is not a duty but a *structure* — the foul exclusion (§4.4.2) and the lineup geometry (§4.4.1). That symmetry is itself the finding: the duty vocabulary is sport-portable; the sport-ness lives in the floors, the job authoring and the calibration set. **The formula's logic travels as far as the job concept does — and jobs are a coaching universal.**

---

## 5 · Labels and re-run instructions

**VERIFIED:** every number in §1 and §3.4 (my own runs: baseline reproduction, V1–V6, the ISOP variant, the exit-premium variant, the invariant check, the basketball sketch — all against `architect/engine-and-seats:tools/mathlab/flex.json`, verified 0-diff from my snapshot before the first run). **REPORTED:** MUSE's 98/99 and 97/99 claims (my §1.1 table confirms them), the Owner's three score changes and his 6-or-7 acceptance (verbatim relay in MUSE's `inbox/20261110-0655-muse-ZAI-D1-KG-feedback.md`), the live table and its header. **INFERRED:** all basketball matrix cells, weights, classes and the λ-correlation prediction (§3.3, §4) — priors by design, the calibration set does not exist yet. **UNKNOWN:** whether the Owner wants the exit-premium surface (§2.3) — decision owed.

**Re-run anything:** `python3 _agents/zai/tools/zai_d1_owner_scores.py` (variants + invariant receipt + full V4 diff) · `python3 _agents/zai/tools/zai_d1_isop_test.py` (§2.1 receipts) · `python3 _agents/zai/tools/zai_basketball_sketch.py` (§3.4 prices). All read-only; all take the live table as data, change nothing.

— Z.ai · seat ZAI · three tasks done, one decision owed (§2.3), nothing built, everything filed.
