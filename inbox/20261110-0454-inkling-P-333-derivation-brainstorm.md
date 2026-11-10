SPEAKER: inkling | ROLE: council advisor | TASK: P-333 — the derivation formula brainstorm ("The engine's inevitable direction", council prompt 2026-11-10 §line 54) | DATE: 2026-11-10T04:54Z
FOR: P-333 (and P-322, whose design this data sharpens) — the prompt names P-333 as the place for this version of the question.
EVIDENCE: VERIFIED (every number below was measured by me today on the engine-of-record) · REPORTED (P-322's 97/105 fit, my earlier measurement) · INFERRED (architecture recommendation) · UNKNOWN (D(OLB>EDGE) post-bump; the Architect's position)

## Bottom line

The council's instinct — "a derivation from destination weight instead of hand-set rules" — is architecturally right but, as literally specified, a trap. **Destination weight ALONE cannot produce the Owner's table (best possible fit today: 51/99). Ability distance alone gets 65/99 and hard-misses exactly the rows where value rises (TE/OT→up-the-ladder spots). A linear weight offset (λ·Δw) caps at 67/99 with 4 hard misses. The measured slot-value displacement from the engine's own curves (slotWins20 / D) is worth ~30 points over either weight approximation — which is why P-322 measured 97/105 with 0 hard misses.** The inevitable direction is still real, but the formula must be **measured slot-value displacement + skill/ability distance + sparse unlikeness deltas + the Owner's anchor overrides** — destination weight enters only *through the measurement*, never as a ratio. Details, numbers, and the verification protocol below.

## What I ran

Engine of record: `origin/architect/engine-and-seats @ a7226810` (build `97d7e9d9`) — extracted with `git archive colors tools`, i.e. `colors/` + `tools/mathlab/flex.json` together (flex.json sha256 `0a26d7c2…`, flex.ts counts 99/99, `flex.json == flex.ts`). Script (committed, runnable): `_agents/inkling/deliveries/p333/derivation-brainstorm.mts` (usage header inside). Target table: the LIVE 99-rule table in flex.ts/flex.json — **not** the speculative 105 (items 3+7 are not landed; SAM remains a slot alias of OLB). P-322's anchor classes re-used; the NICKEL/DIME destination vectors are included (without them the slot rows all price at 0 — that omission alone is worth ~10 misses).

**Measured fit vs the 99-rule table (exact / off-by-one / hard >1 tier):**

| Candidate | best exact | off-by-one | hard |
|---|---|---|---|
| F-W: destination weight alone, α·(w_dst) (grid α=0.004–0.02) | 51/99 (α=0.02) | 40 | 8 |
| F-A: skills × clamp(w_dst/300) + λ·Δw_firstlisted + U (grid λ) | 60/99 (λ=0.005) | 32 | 7 |
| F-M: skills + λ·Δw_**class-mean** + U (grid λ=0–0.04) | **67/99 (λ=0.002–0.005)** | 26–28 | **4** |
| F-S: skills + U only (no weight anywhere) | 65/99 | 28 | 6 |
| P-322: D(measured) gate + skills + U (REPORTED, 105-rule table) | ~97/105 | 8 | **0** |

**The hard misses of the pure-skill candidate (F-S) are a signature, not noise:** `TE>WR 12→2 · TE>OT 12→2 · C>OT 12→2 · OLB>EDGE 12→2 · FS>WR 12→2 · OLB>ILB 6→0`. Every one is a move **up** the destination-value ladder (into OT/WR/EDGE/ILB from a lighter or lateral role) — pure ability distance cannot see where the value goes. **The hard misses of the weight candidate (F-M.005)**: `TE>OT, EDGE>ILB, FS>WR, WR>NICKEL` — the weight term overrides ability exactly where the Owner's table holds the line (ability is the contract). **And the item-3 anchors (QB>FS 12, TE>FS 12, TE>DIME 12, TE>NICKEL/SS 6, ILB>FS/OLB>FS 12) are ALL reproduced exactly by F-S** — the DB-scheme coverage dmults do that work — while "λ·Δw" candidates break QB>FS at λ≥0.01 (12→6).

## How I would design it (the answer to "how would you design the formula / what should it use")

Use **both axes, plus a small honesty layer**, with destination weight entering ONLY through the engine's measurement:

```
price(src→dst) = tier( clamp( D(src→dst) + A(src,dst) + U(src,dst) , 0, 12 ) )

tier(x) : <1 → 0; <4 → 2; <9 → 6; else 12     (Owner's midpoints 1/4/9)
D       : slotWins20(dst) − slotWins20(src) — MEASURED by the engine (slots.ts curve
          ×20), NOT read from WEIGHT ratios. Linear weight ratios lose ~30 fit points
          (measured above). This IS "destination weight", expressed honestly: the weight
          map's wins-per-OVR content, per unit and per base.
A       : Σ_s β_s · max(0, p_dst[s] − p_src[s])   (P-322 vectors, nine skills, one row/role)
          · COV×(1.7 / 3.6 / 2.0) for dst ∈ {NICKEL, DIME, FS}   (the DB-scheme surcharge —
            this is what buys the item-3 family for free)
          · ×0.5 on COV/RNG gaps when src CTH ≥ 9 (catchers stay with the ball)
U       : sparse unlikeness deltas — RB>TE +3.0 · SS>ILB +5.0 · TE>ILB +6.4 · RB>SS +6.6 · EDGE>SS +5.1
Gate    : D ≥ 5 → skills count fully; 4 ≤ D < 5 → ×0.5; else zeroed-ish  (P-322's form)
Lists   : the nine-role FB-free whitelist; dst==SAM → price := price(src→OLB) (item 7);
          Owner override rows stay overrides, by name (C>OG 6, FB>RB 2, FB>TE 6, EDGE>RB 6, EDGE>ILB 6)
```

Three deliberate properties: (i) the formula **fails loudly on the anchors** — item-3, QB>FS, FB whitelist, SAM alias are checked as constants in a test, not trusted; (ii) every price the UI shows carries its reason string ("TE→FS −12: no deep range, no coverage technique") — the Owner's "flexing is fun" principle; (iii) the Owner's table degenerates to ~26 named constants + an override list, instead of 99 opaque rows.

**Why not the simpler reading** ("drop D, fit λ on class-mean Δw"): measured above — 67/99 with 4 hard misses, and it fails OWNER anchors at λ≥0.01 (QB>FS 12→6). Fitting λ harder does not fix it; the linearization is sign-wrong for multi-slot classes (EDGE dest mean 475 vs WILL source 150: DL5 rotations make the curve convex, which a line cannot express). **D is not optional; the engine already computes it; this is not adding machinery.**

## How to verify a formula against the Owner's table (answer to the second question)

Concrete protocol, in order (each step is a command, not a judgment call):
1. **Construct the target table** (pin + items), count it (`99 → 105` for items 3+7; assert against flex.ts counts in a test), print it.
2. **Fit grids, don't fit points** — grid λ (if any weight term survives), β, dmult, gate; report exact / off-by-one / hard for the whole grid (as the script does). A formula with a knife-edge at one grid point is overfit; the chosen candidate must sit on a plateau (F-M is flat 65–67 across λ=0.002–0.005 — still not good enough alone).
3. **Anchor audit first, fit second** — item-3 family (QB>FS 12, TE>FS 12, LBs/TE→FS 12, LBs/TE>DIME per the Owner's item, TE>NICKEL/SS 6), FB whitelist (9 rows), SAM alias (6 rows), K/P 2. Any candidate that misses an anchor by >0 tiers is rejected before residual-chasing. (F-S passes all; F-M.01 does NOT pass QB>FS; F-A.005 does NOT pass TE>DIME at 0.)
4. **Residual-class report** — every remaining miss must land in exactly one of: (a) **Owner anchor/override** (table wins by voice — record in the override set), (b) **construction artifact of the hand table** (an internal inconsistency vs the Owner's own verbatim reasoning — flag to Owner, show both numbers), (c) **model gap** (the formula gets it wrong — fix the formula or accept and list). Never a silent exception.
5. **Holdout sanity** — fit on the {0,2,6} tier rows, verify the {12} rows untouched (and vice versa); report both. A formula that only interpolates is a table with extra steps.
6. **Before any build**: rerun under the LANDED items 3+7 (SAM committed), re-count (105), re-price, and re-run this exact script — one command, one minute.

**Where the formula and the table disagree, who is wrong? A decision procedure (the third question):**

- **Owner override / anchor → the table wins.** The table is his voice; the formula is evidence. Which is why the design HIDES nothing: those rows live in a named override list, not in the fit.
- **≤1 tier apart → neither is "wrong".** The tiers are midpoints of ability gaps; ±1 tier is rounding fuzz, and the Owner's own table is 0/2-fuzzy at the bottom (SS>OLB 2 vs FS>SS 0). Accept, log, move on — never add a knob to win a boundary row.
- **≥2 tiers apart, non-override row → the formula gets first hearing, the Owner gets the last word.** The Architect prices the row from the measured engine curves (slotWins20, per-position slopes), the council shows both numbers with the anchor class, and the Owner rules. The formula NEVER silently edits FLEX (protected constant, §3; hash re-pin in the same commit).
- **The tie-break rule that ends the argument:** if the disagreement is on a row whose destination is ≤50-weight (DIME/TE3/WR4/FB/K/P destinations), **the weight principle wins by default (cheaper is acceptable)**; if it is ≥300-weight or a DB-scheme slot, **the ability principle wins by default (the Owner's CB>DIME 0 vs TE>DIME 12 — DBs are DBs — is the canonical texture)**. Between those, the Owner rules. This is Option B's principle stated as a rule of evidence, and it is consistent with both of his voices (his item-3 override AND his low-weight pick).
- **The disagree-ledger is the artifact:** every disagreement ever ruled on goes into one file (name: `flex-derivation-rulings`) with the two numbers and the ruling — after 20 rows, the formula is calibrated to *the Owner's judgment*, not to invented football priors.

## The P-333 corollary (this is the formation-balance answer in derivation form)

A formula built on this architecture **inherits formation parity for free**: both bases use the SAME weight map and the same skill vectors (the dest classes are byte-identical across bases), so any residual asymmetry is exactly the role-distance asymmetry between the scenarios — nothing else can sneak in. Under this design the cross-formation gap measurement becomes a pure diagnostic of the *profile table*, not of the base. And concretely for the Owner's low-weight principle: **Option B is already a baby derivation** — three DIME rules re-tiered to the 6-tier and FB>TE to the 2-tier is what "cap misfits into ≤50-weight destinations" means when applied by hand to exactly the rules that fire in the scenario. The derivation makes that principle systematic instead of surgical; it does not and should not change that Option B is right for today.

## What this does NOT settle / weakest points

- This is fit-on-one-table evidence. The β values are P-322's blind-fit calibration (REPORTED as such); they have not been pre-registered or held out against fresh data; nothing here is a benchmark of play or OVR.
- D is worth ~30 points of fit only when the engine's slotWins20 is current; **P-321/P-322's derived tables will move it** — re-run this script after any such landing, or the fit above is stale evidence, not truth.
- The DB-scheme dmults (1.7/3.6/2.0) are doing heavy lifting on exactly the item-3 family; that is by design, but it means the formula's "free" anchors rest on three hand-chosen constants (named, not hidden).
- The linearization experiment (λ·Δw) says nothing against slotWins20 — it only says weights are not a substitute for measuring it.
- Item 7 (SAM mirrors) is NOT in the live table; any verification of the 105-rule endpoint must wait for the Architect's items 3+7 build and use `inbox/<UTC>-<seat>-P-332-option-b-review.md` as the template.

## Labels

VERIFIED: all candidate/fit counts above (commands in the script header; `flex.json` sha `0a26d7c2…`, 99 = 99); F-S/F-M/F-A/F-W grids; the anchor audit (F-S reproduces all seven item-3 anchors); the run-order bug found and fixed (flex.json was read from CWD, not the archive — my branch carries the stale REV 4 107-rule copy, sha256 `28a2e9935a…`; measurements were unaffected because `rules[]` come from the archived flex.ts, but the printed count line was wrong until fixed — caught by direct node inspection). REPORTED: P-322's 97/105 with 0 hard misses. INFERRED: the architecture recommendation; formation-parity inheritance; Option B ≈ a hand-applied cap rule. UNKNOWN: post-bump D values (Owner forbade recomputation); the Architect's position on any of this.

PRIORITY+: flex-derivation-rulings ledger (a file the Architect keeps: every formula-vs-table disagreement, the two numbers, the ruling) | P3 | 20 rulings calibrate the formula to the Owner's judgment instead of invented priors; costs one markdown file; composes with P-322 Option C (the formula-as-linter test). Proposed, not mine to add.
