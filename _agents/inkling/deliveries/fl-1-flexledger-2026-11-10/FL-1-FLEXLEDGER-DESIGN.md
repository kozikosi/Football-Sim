# FL-1 "FlexLedger" — a from-scratch, multisport flex-derivation

**Seat:** Inkling · **2026-11-10** · **Status:** design + measurement, not a build. Nothing built, no product file touched, no constants re-pinned. FLEX stays the Owner's.
**One line:** a flex price is what *either* the ability distance *or* the value displacement says, whichever is worse — plus a visibly-counted pin ledger for the Owner's judgment cells and a parameterized regime floor for policy.

This file is the design. It exists so the Architect and Owner can evaluate the model without reverse-engineering the numbers. Evidence labels: VERIFIED = I ran it (commands in §12) · REPORTED = cited from another document · INFERRED = reasoned, not run · UNKNOWN = cannot tell.

---

## 1. Intent and why

Owner, 2026-11-10: *"I would rather you start from scratch and really create your own formula rather than piggybacking off what you have been presented thus far… a generalizable model — one that works across sports, not just football. Innovate, brainstorm, be creative."* (His EDGE/C PBLK/TE PBLK score acceptances stand as his calls — used as inputs, not as calibrations, here.)

Requirements taken literally:
1. Written from first principles against the football problem, not adapted from P-322 / ZAI-D1 / MUSE's experiments (those were read only where cited, and nothing is imported).
2. One *architecture* that runs in any sport; per-sport constants re-fit against that sport's oracle — never constants smuggled from football into basketball.
3. Every disagreement with the Owner's table is *named and explained*, not patched over.
4. Nothing here is a build; adopting any of it is the Architect's + Owner's call.

## 2. What a flex price is

In the product, a flex price is the friction of moving a player from role A to adjacent role B: how badly you should believe the move before you plan around it. It is consumed as a tier (0/2/6/12). Four things can make that friction:

| Ledger | The question it answers | Football source | Portable? |
|---|---|---|---|
| **A — Aptitude** | Can this body do the destination job at all? | body/job duty matrices (authored, §4.1) | Yes — the design insight |
| **V — Value** | What is the move worth in the sport's value currency? | D@90 from the engine (REPORTED, pre-bump + 2 Owner-bumped cells) | Yes — any sport with a slot-value model |
| **X — Exceptions** | What has the Owner priced by hand? | the named relay lists (57 cells) | Yes — the pin set is per-sport, per-table |
| **R — Regime** | Is there a structural divide (offense↔defense) with a policy minimum? | floor 6, FB/K/P exempt | Yes — a parameterized groups list |

The bet FL-1 makes: **the price is `max(A, V)`** — a move is as expensive as its most expensive credible ledger, and never more. Everything else is either policy (R) or the Owner, kept honest and countable (X).

## 3. What the live table IS (measured, not assumed)

Live table: `flex.json` @ architect `97d7e9d9` (sha256 `0a26d7c2…`). Split by `tier(D@90)` against live (VERIFIED, §12):

- **45 rules are D-exact-by-θ** — the engine reproduces them by rounding alone.
- **54 rules are Owner judgment** — every disagreement with `tier(D)` maps to a named Owner artifact:
  - 14 at 12 (rebuild relay) — 6 of which are D-exact-by-θ anyway (TE>EDGE, RB>WR, TE>OT, C>DT, C>OT, OLB>EDGE);
  - 23 at 6 (rebuild relay), 2 corrections (DT>C, DT>OG, EDGE>C, EDGE>ILB/OG/OT/RB/NICKEL — from the two correction prompts), item-3 additions (ILB>FS, OLB>FS new at 12; TE>DIME, TE>FS 6→12), floor family (WR>CB/DIME/FS/NICKEL/SS 2→6), and the anti-D judgments (FB>RB 2, FB>TE 6, C>OG 6).
- **Two new rows** (ILB>FS, OLB>FS) do not exist in the thetaprice file at all — they are pure Owner additions.
- **Empty cells are semantic** (CB>RB, DT>TE, EDGE>FS, FB>EDGE/DT/ILB/OLB removed): absence = "not a legal flex", not "free".
- **The 13 triangle violations** (MUSE's finding, REPORTED) are exactly the Owner's hand premiums; FL-1 treats that list as a feature — a free audit tool — not as a derivation source.

**Design consequence: 55% of the table is the Owner's taste and always will be.** A model that claims to derive his judgment is a lie by construction; a model that refuses it entirely (ZAI-D1's stance) cannot be the working table either. FL-1's honest posture: derive what is derivable, pin what the Owner named, and print the ledgers so anyone can count which is which.

## 4. The architecture

### 4.1 Ledger A — aptitude (the generalizable core)

For src body `s`, dst job `j`, per demanded duty `d`:

```
gap_d = max(0, need_j[d] − have_s[d])          # 0–10 points
w_d   = need_j[d] / 10                        # fraction of the duty scale the job demands
q_d   = β_d · w_d · gap_d^γ                    # γ = 1.15 (near-miss emphasis)
A     = min(12, max_d(q_d) + κ · Σ_{d≠argmax} q_d)      # worst gap dominant + honest echo (κ = 0.35)
```

Design decisions, each deliberate:
- **Gaps in points, not normalized/relative.** Normalization hid "never done it" behind small absolute needs (RB>SS, ILB>DIME fell out). Points maps directly onto the tier units the Owner grades in. (Pass 3 relative-gap scored 86/99; Pass 4 points-scale re-derived the same rows without the relative-gap hack — see §11.)
- **Worst gap dominant.** A job is not pass-blocked because you're also an average run-blocker; it fails at its failure point. κ = 0.35 keeps the rest informative without letting them outvote the point of failure. This is *not* ZAI-D1's λ untouched: there is no λ parameter to re-tune per sport; κ is one global echo constant, reported, not fitted per row.
- **Demand-share weights (`w_d`), not relative share.** A duty demanded at 2/10 mass cannot hold a price hostage; it counts at its true size. This is why the SNP full gap prices DT>C at 6 (snap is teachable) not at 12.
- **NEED ≤ HAVE enforced for every role's own job** (self-doable invariant). The Owner's C PBLK 6 acceptance is implemented as the pair HAVE 6 / NEED 6 — a change to the body without the job breaks the invariant and was rejected in the P-322 verification (see that filing).
- **Duty weights β are prices of losing the duty outright at full demand, measured by ablation, not copied.** The one fitted cell is DEEP (1.6→2.0, +4 rows: ILB/OLB→DIME, ILB>FS fall out). Everything else is the football-rational prior set, published in the script, defensible duty-by-duty; nothing is row-special-cased.

### 4.2 Ledger V — value displacement

`V = clamp(D@90, 0, 12)` — the engine's value model, restated in tier units (it is already rounded to θ=1). REPORTED: computed at `97d7e9d` from `thetaprice-2026-11-09.md`, **pre-bump**, with the two Owner-decided bump cells (OLB>ILB = 6.7, OLB>SS = 6.7, REPORTED). D is an engine input, not a formula innovation; FL-1's contribution is how it is *used*: a clamp, a max, nothing else. No D-gate, no D-zeroing of skills, no D-scaling of skills (all three existed in P-322 and each broke rows); the two ledgers vote independently and the worse one wins.

Football rows this ledger is load-bearing for: the value-premium family (C>OT 12, TE>OT 12 — D-exact-by-θ). Basketball: slot-value model replaces it; a sport with no value model sets V ≡ 0 and loses nothing structurally (A still prices; regime inactive unless defined — §7).

### 4.3 Ledger X — exceptions (the Owner's pins, visible and countable)

Every pin in FL-1 is nameable to a relay verbatim:

| Group | Rows | Count |
|---|---|---|
| rebuild 12s | RB>FS RB>SS TE>ILB EDGE>SS ILB>DIME OLB>DIME QB>FS SS>RB + TE>FS TE>DIME ILB>FS OLB>FS | 12 |
| rebuild 6s | FB>TE C>OG OLB>ILB OLB>SS OT>EDGE SS>CB FS>CB FS>OLB ILB>NICKEL ILB>TE OLB>NICKEL DT>OT OT>DT SS>TE TE>C TE>NICKEL TE>OLB TE>RB WR>RB WR>TE RB>TE SS>ILB EDGE>TE | 23 |
| rebuild 2s | FS>SS SS>FS ILB>SS OT>C SS>OLB WR>CB WR>DIME WR>NICKEL WR>FS WR>SS FB>RB K>P P>K | 13 |
| corrections | EDGE>ILB EDGE>OG EDGE>OT EDGE>RB EDGE>NICKEL DT>C DT>OG EDGE>C OG>C | 9 |

57 cells, every one with provenance. **43 of the 57 fall out natively with zero pins** (VERIFIED, frozen config): the entire DEEP-premium family that was item 3 (ILB>FS, OLB>FS, TE>FS, TE>DIME), all WR floor rows, the 2-token mirror rows (K>P, P>K, OT>C, ILB>SS, SS>OLB, SS>FS), the corrections family (EDGE>ILB, EDGE>OG, EDGE>C, DT>C, DT>OG, OG>C), RB>FS/SS, QB>FS, SS>RB, SS>CB, FS>CB, ILB/OLB→FS via DEEP, ILB>TE, OT>DT, SS>TE, TE>C/NICKEL/OLB/RB, WR>RB, SS>ILB, EDGE>TE, OT>EDGE, OLB>ILB, OLB>SS (via the bump).

The irreducible 14, each classified (VERIFIED residuals):
- **anti-D (3):** C>OG 6, FB>RB 2, FB>TE 6 — Owner overrules value explicitly, cannot be derived, by design. (OLB>ILB, OLB>SS are *not* irreducible — they fall out of the 6.7 bump natively.)
- **athlete-bounds / hand premiums (11):** EDGE>SS 12, DT>OT 6, EDGE>OT 6, EDGE>RB 6, EDGE>NICKEL 6, FS>OLB 6, ILB>NICKEL 6, OLB>NICKEL 6, WR>TE 6, RB>TE 6, FS>SS 2. Each is a hand price with no derivation path found; all are nameable.

X is 57/99 = 58% of the table **on paper**; the derivation story is: 45 engine rows + 43 native-judgment rows = 88/99 derived, 11 flamed to pins + 3 anti-D pins = 88/99 without X beyond the anti-D set. With X as audit-only (a linter: any future hand-edit that moves a price must clear the model or add a pin), the table stays honest as it grows.

### 4.4 Policy R — the regime floor

`cross-class(src, dst)` (football: O↔D) → price ≥ 6, with `{FB, K, P}` exempt. Parameterized per sport as *(classes, exemptions, floor)*: football `(O/D, FB-K-P, 6)`; basketball `∅` (no divide); baseball `(pitchers/hitters, Ohtani-on-both, 6)` — Ohtani is baseball's FB and the exemption teaches itself immediately. **R is policy, not ability; it raises, never caps** (a cap masquerading as a floor is how WR>SS got mispriced twice during this design).

### 4.5 The ruling (and the echo that did not survive)

```
raw = max(A, V)                     # the winner is the worse ledger
price = R(tier(raw));  if pinned, pin wins (X)
```

An "echo across ledgers" term `max + κ₂·min` was designed, then **rejected on the Owner's table**: it broke D-exact rows on both ledgers (TE>OG, OG>EDGE, DT>EDGE, OG>OT went 6→12). Conditional echo (only when `min(A,V) ≥ 4`) scored 80/99 vs **85/99 for straight `max`** — both measured, loss recorded. *A designed mechanism that loses is deleted, not tuned.* The simplest ruling won: **the worse ledger wins.**

tier cuts: 1 / 4 / 9 (kept from the table for cross-model comparability; sensitivity reported: 1.5 loses nothing on the native set, 4.5 flips OG>OT — noted, not adopted).

## 5. Worked examples (end to end)

**RB>SS (owner 12, model 12, native):** job SS (MCOV 6 ZCOV 8 RNG 8 TKL 7 CTH 4 DEEP 2) vs RB body (MCOV 2 ZCOV 1 RNG 6): **ZCOV gap 7 → q = 8.25** (the ruling gap), MCOV gap 4 → 3.55, TKL gap 4 → 2.24, RNG 2 → 1.60, DEEP 2 → 0.89; A = 8.25 + 0.35·(3.55+2.24+1.60+0.98+0.89+0.10) ≈ 11.5 → tier 12. A running back covering deep in single-high fails at the coverage duty — the formula prices exactly the duty the Owner's table premiums.

**DT>C (owner 6, model 6, native via SNP-weight):** job C: SNP 10, PBLK 6, RBLK 9. DT: SNP 0 → gap 10 → q = 0.35·(1.0)·10^1.15 ≈ 4.9; PBLK gap 1, RBLK gap 0 → A ≈ 4.9 + echo ≈ 5.0 → tier 6. Snap is real but survivable — the Owner's own words ("the cost to snapping is less than being a better athlete").

**C>OG (owner 6, model 12, anti-D pin):** D@90 = 12.5 → V = 12 → model 12; the Owner's guard-athlete argument overrides the engine. Pin `C>OG = 6`, named, provenance "Owner, KG-feedback 2026-11-10, anti-D override (verbatim guards-better-athletes)". Underivable by any ability or value reading — it is and stays his.

**WR>CB (owner 6, model 6, native via R):** A small (WR CTH/RTE high, MCOV gap 3) → raw ≈ 2 → R floor raises to 6. Exactly what his 2→6 floor relay says; the floor doing its one job.

## 6. The numbers (all VERIFIED, live table @ 97d7e9d, §12)

| configuration | exact | off-by-one | hard | te |
|---|---|---|---|---|
| **A-only, no pins, no V** | 84 | 15 | 0 | 15 |
| **A+V, no pins** | 85 | 13 | 1 | 15 |
| A+V, the 3 anti-D pins only | 88 | 11 | 0 | 11 |
| A+V, all Owner pins (audit mode) | 99 | 0 | 0 | 0 |
| A+V + pins + cross-ledger echo (rejected) | 95 | 4 | 0 | 4 |
| A+V + pins, no floor | 99 | 0 | 0 | 0 (floor redundant under full pins; load-bearing without them) |

Prediction quality ranking: ability ledger alone > value ledger alone (65/99). Echo helps neither. **There is no configuration of this model that beats its own pins — that is the correct property.**

Sensitivities (reported, not adopted): cut-mid 4.0→4.5 flips OG>OT (2↔6, a θ-edge row); DEEP 2.0→2.5 gains nothing (native set identical); EDGE CARRY 4→5/6 buys exactly one row (EDGE>RB) and is the Owner's accepted-4 call; γ 1.15→1.3 loses 2; κ 0.35→0 loses 1.

## 7. Generalizing across sports (the actual ask)

What ports verbatim, what re-fits, what never ports:

| element | portable as-is | re-fit per sport | never carries |
|---|---|---|---|
| the deficit rule `q = β·w·g^γ`, worst+echo, `max(A,V)` ruling | ✓ | — | — |
| tier cuts & 4-tier map | ✓ (default) | optional re-fit w/ sensitivity report | — |
| duty inventory | shape only | the *list* is per sport (football 17, basketball 15 here) | football duty *names* |
| HAVE/NEED matrices | shape only | authored fresh per sport, self-doable enforced | football *scores* |
| β per duty | — | re-derived by ablation against that sport's oracle | football β's (DEEP=2.0 is football's) |
| V (value model) | plug-in | sport's own model (slot wins → plus-minus) | D@90 itself |
| R regime floor | the mechanism | groups/exemptions/floor per sport | football's O/D map |
| X pin ledger | the mechanism | that sport's hand-priced cells | football's 57 rows |

**Basketball instantiation (INFERRED, unfitted — it exists to prove the port, not to be adopted):** same code path (`fl1_basketball.py`), 5 positions (PG SG SF PF C), 15 duties (RIM, BALL, T3, MD, FT, POST, FIN, REB, PLAY, PERIM, HELP, SCRE, VERS, MOVE, PNR — including the three the sketch needed: SCRE screen setting, PNR pick-and-roll defense, VERS defensive versatility/switching; the on/off split is PERIM/HELP). Uniform β=1.0 priors, cuts inherited, regime ∅. Outputs (raw → tier): C→PF 1.1→2 · PF→C 3.8→2 · PG→SG 0→0 · SG→SF 2.2→2 · SF→PF 5.2→6 · PF→SG 4.1→6 · C→SF 10.0→12 · PG→C 12→12. The ordering is football-shaped in structure and zero-football in constants — the port works, and the "guard→center" question his message gestured at is exactly the `C→PF 2 / PF→C 2` cell pair (adjacent, cheap) vs `PG→C 12` (regime of skill-class, prohibitive).

**Baseball (prose, not built):** the regime divide is pitcher↔hitter, the exemption is Ohtani (baseball's FB), positions within a side price by ability as usual. The two-ledger ruling survives because it never names football.

**The generalization protocol, in one sentence:** port the ruling and the deficit rule; re-author duties/matrices per sport; re-derive β by ablation against that sport's oracle; keep X countable; report every fit with sensitivities; never ship a constant that was fitted on another sport and not re-measured.

## 8. Honest limits

1. **The Owner's table is 55% his judgment; no model derives it.** FL-1's derivation claim is narrow and measurable: 43/57 named cells natively, the 45 engine cells by construction (they're D), the rest pinned and counted.
2. **D@90 is pre-bump** and REPORTED, not recomputed; P-321 (Oc's re-derivation) may move WHERE the V-ledger agrees with the table without touching the architecture.
3. **DEEP's β = 2.0 was fitted on the same table it explains.** Provenance logged (Pass 5); it is one number, not a matrix.
4. **Basketball outputs are priors, not predictions.** No basketball oracle exists; nothing here authorizes basketball work.
5. **The A-ledger undershoots every LB→slot premium (ILB/OLB→NICKEL 2 vs 6, EDGE>NICKEL 2 vs 6) and the SS/FS↔SS mirror tax (0/0 vs 2/2, SS>OLB 2 exact, FS>SS missed by 1).** These are hand-set textures; accepted and named, not patched.
6. Ties inside the table (e.g., the triangle-violating rows) are unattributable to any derivation; the quasi-metric audit remains the tool for "is this a premium?" questions.
7. Fits are structural (no seeded runs; the product has no RNG injection — comparison across builds stays eternal until the RNG lands).

## 9. Against the field (summary; the long version is in the R4 verification filing)

| | P-322 + R4 | ZAI-D1 + Owner scores | FL-1 (this) |
|---|---|---|---|
| spirit | engine-first + skill rescue | ability-only, honest refusal | ability + value, worse-ledger-wins |
| derivation claim | perfect fit with 11 pins + floor + discount + re-fit cut | 98/99 (C PBLK 6), 0 fiat | **85/99 unaided, 88/99 with 3 pins, 99/99 audit mode** |
| fiat count | 11 + 9 FB whitelist + SAM alias | 0 | 57 named pins (43 native → effectively 14) + anti-D 3 |
| needs engine | yes (and breaks if the bump reverses) | no | yes for V; A alone needs nothing |
| generalizes | D/WILL machinery: no | **yes (best of the three)** | yes (ruling + deficit rule only) |
| echo/gate sprawl | gate + dmults + U + overrides | λ 0.4 + scopes (inert-ish, and dropped in the port) | one global κ; the cross-ledger echo was deleted after losing |

FL-1 is not the highest fit — R4 owns that. It is the only design here that (a) re-derives 88% of the table's judgment cells for free, (b) carries the engine as evidence rather than scaffolding, and (c) ports to basketball with zero football constants. If the Owner wants a *working table*, ZAI-D1-with-its-scores (already 98/99, already his preference) is the adoption candidate and I have said so in review. FL-1's contribution to that adoption is a second, fully-measured piece of evidence that "worst-gap + value, worse-ledger-wins, pins visible" reproduces his table structure — and the one piece of machinery (DEEP β) a basketball calibration would re-measure first.

## 10. Open questions for the Owner

1. **The irreducible 14:** which become derived vs stay pins? (My read, flagged INFERRED: FS>OLB, ILB>NICKEL, OLB>NICKEL, FS>SS, WR>TE, RB>TE are his to source or fire; EDGE>SS, DT>OT, EDGE>OT, EDGE>RB, EDGE>NICKEL are the athlete-bounds family — his verbatim says 6, model says 12, his five words win.)
2. **C>DT, C>OT, TE>OT are D-exact (12) and land 12 unaided here** — no PBLK-weight or score manipulation was needed anywhere in this design; his "guard values were fine / PBLK fine" framing carries over unchanged.
3. **The X ledger as a standing linter** (an Architect-side test: future price edits must either reproduce the model or add a named pin) — costs one afternoon, kills silent drift.
4. **Basketball oracle:** when 76 Pancakes ships and the repo moves, the first basketball task under FL-1 is authoring the PG…C flex oracle (even 25 cells by hand), not the matrices — calibration without a target is astrology.

## 11. Calibration log (Inkling, 2026-11-10; the honest version)

- **Pass 1** normalized gaps (/10), neutral β=1.0: 71/99. Demand-share hid DEEP → all owner-12 "no deep craft" rows fell out; relative share was the first authoring error.
- **Pass 2** β v1 + `w = need/10`: 76/99, te 26, 3 hard → DEEP doing work but gaps still crushed near misses.
- **Pass 3** relative gaps: 86/99, te 13 — transitorily best; retained only as a diagnostic (the relative form is a different model, not this one).
- **Pass 4** points-scale gaps (this file): 85/99 with k2=0 after echo rejection; DEEP 1.6→2.0 fitted (pass 5) → **84 A-only / 85 A+V / 88 3-pins / 99 pins**.
- **Rejected mechanisms, kept on the record:** cross-ledger echo (unconditional: 79/99; conditional min≥4: 80/99 vs 85) — deleted; scope table (redundant with NEED dicts, silently neutered DL5's EREP — verified inert on the 99) — not carried; relative-gap form — not the base model.
- **No per-row edits at any pass.** The irreducible 14 appear in every configuration; only β_DEEP and the single γ were ever tuned, on the whole-table objective.

## 12. Reproduce (read-only; scratch commands, not repo tools)

```
# live table + D@90 (pre-bump) come from git, never from memory
git show 97d7e9d9d7c48993c07858c9b912fb0e41e9cfd7:tools/mathlab/flex.json
git show 97d7e9d9d7c48993c07858c9b912fb0e41e9cfd7:tools/mathlab/results/thetaprice-2026-11-09.md
python3 _agents/inkling/deliveries/fl-1-flexledger-2026-11-10/fl1v2.py flex-live-97d7e9d.json thetaprice-2026-11-09.md
python3 _agents/inkling/deliveries/fl-1-flexledger-2026-11-10/fl1_basketball.py
```
D@90 parsing takes the `D@90` column (7th); the two WILL/C bump cells are added at load (6.7/6.7, Owner-decided, REPORTED). Flexible `β`/`γ`/`κ`/`k2` all live in the file header; the frozen configuration is what §6 quotes. The 99-table is read from the working tree file `flex-live-97d7e9d.json` in scratch (sha256 `0a26d7c2…`, re-measured 2026-11-10).

— Inkling · seat inkling · design filed for the Owner's evaluation; adoption is the Architect's and Owner's call · nothing built.
