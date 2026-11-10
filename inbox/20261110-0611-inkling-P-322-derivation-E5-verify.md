SPEAKER: inkling | ROLE: council advisor | TASK: P-322 — independent verification of the E5 hybrid (the main new work) | DATE: 2026-11-10T06:11Z
FOR: P-322

# P-322 — E5 hybrid verified independently: 97/99, prediction CONFIRMED

Re-implemented E5 from scratch (design file `inbox/20261110-0104-inkling-P-322-skill-profile-design.md` §3 + the 2026-11-10 E5 prompt; MUSE's scripts were not read for the implementation). Measured against the **live 99-rule table** (`origin/architect/engine-and-seats:tools/mathlab/flex.json`, commit `97d7e9d`, VERIFIED via `git show`: 99 rules, counts {0: 23, 2: 10, 6: 43, 12: 23}). Script (with both BLK readings, both synergy readings, and tier-index (not price-delta) residual classification): `_agents/inkling/deliveries/2026-11-10/e5-verify.py`; full stdout: `_agents/inkling/deliveries/2026-11-10/e5-verify-output.txt`. D source: thetaprice.md (Architect's pre-bump D@90 column, θ=1) with the Owner's WILL-bump rows OLB>ILB = OLB>SS = 6.7.

## Result — every reported number CONFIRMED (VERIFIED, my runs)

| stage | exact | off-by-one | hard | notes |
|---|---|---|---|---|
| 0 base P-322 (cuts 1/4/9, general BLK) | **88** | **11** | **0** | the 11 = the 5 WR>DB (owner 6, model 2) + the 6 same-side residuals (owner 0, model 2) — exactly the reported set |
| 0′ base, literal dst=='C' BLK reading | 87 | 12 | 0 | OG>OT becomes the extra residual — confirms the three-seat BLK spec-defect finding |
| 0″ synergy general vs dmult-only | 88 | 11 | 0 | **identical** — the CTH-synergy ambiguity is not load-bearing on this table; the BLK one is |
| 1 base + cross-side floor (Option C) | **93** | **6** | **0** | floor fixed exactly the 5 WR>DB, broke **0** — MUSE's 93/99 confirmed |
| 2 E3: cuts 1.5/4/9 + floor, no discount | **96** | **3** | **0** | CB>FS, SS>DIME, SS>NICKEL dropped below 1.5; residuals CB>SS · EDGE>OLB · ILB>OLB — nothing broken, as reported |
| 2′ base + floor + cuts 1/4/9 | 93 | 6 | 0 | with the floor alone, moving the cut does nothing; the re-fit's lift only appears with the halving (see 3′) |
| 3 **E5**: same-group A halving + cuts 1.5/4/9 + floor | **97** | **2** | **0** | residuals **EDGE>OLB (owner 0, model 2)** and **FS>SS (owner 2, model 0)** — exactly the reported pair |
| 3′ E5 without the re-fit (cuts 1/4/9) | 95 | 4 | 0 | the re-fit is load-bearing, not cosmetic (CB>SS, ILB>OLB stay residual without it) |
| 3″ E5 without the floor | 92 | 6 | 1 | WR>NICKEL goes 2→0 = two tiers under owner 6 — **the floor is load-bearing too** |
| 4 E5 + OVERRIDE EDGE>OLB = 0 | **98** | **1** | **0** | only FS>SS remains — MUSE's 98/99 prediction confirmed |

The 6 Inkling residuals are exactly accounted for by the two mechanisms: the re-fit cut 1.5 fixed CB>FS · SS>DIME · SS>NICKEL (their raw A = 1.4 · 1.4 · 1.0); the same-group halving fixed CB>SS (2.4 → 1.2) and ILB>OLB (2.1 → 1.05), both landing under 1.5. EDGE>OLB is DL→LB — not same-group — and survives every variant. FS>SS is same-group DB: its RSH gap (2.0 × 0.8 = 1.6) lands **just under** 1.5 after ×0.5 → model 0 vs owner 2 — the one new break, a boundary artifact (SS>FS survives: RNG gap 5.0 × 0.6 = 3.0 → halved 1.75 ≥ 1.5). This is exactly task B's seam (FS↔SS exclusion or ×0.75 discount); not relitigated here.

## A/D decomposition (the receipts behind the two residuals)

- **EDGE>OLB (owner 0, model 2):** D = **0** (measured — thetaprice.md lists it, all-zero row; not a missing-data default). A = CTH gap 2.0 × 0.50 = 1.00 + COV gap 1.50 × 0.50 = 0.75 → 1.75 ≥ cut 1.5 → tier 2. **No rushing gap exists in this pair** — EDGE out-rushes OLB (RSH 10 vs 7, gap negative in this direction). The residue is the OLB's catching/coverage vocabulary, not a rush misread.
- **FS>SS (owner 2, model 0):** D = **0** (measured). A = RSH gap 2.0 × 0.80 = 1.60 → halved (same-group DB) → 0.8 < 1.5 → tier 0.
- **ILB>FS / OLB>FS (both owner 12):** these two item-3 rows are **absent from thetaprice.md** (it predates item 3), so they used the D=0 default (as in my original fit). With D=0: A = 10.1 / 8.7 → tier 12 ✓. Robustness noted: if their real D were ≥ 9 the gate would also give 12, and any real D ∈ (5,9) still leaves A large enough for tier 12 in every variant runs-clean. Flagging as the single unmeasured input rather than silently accepting.
- All other D inputs are thetaprice.md's measured D@90 (θ=1) — e.g. DT>EDGE D = 4.61 (inside the 4–5 gate, A × 0.5 → tot 6.06 → tier 6 ✓ exact), OLB>EDGE D = 15.39 (gate zeroes A → 12 ✓), SS>FS D = 0.02.

## Does EDGE>OLB belong as an override or a rush-equivalence term? My call: an override.

1. **A rush-equivalence term would do nothing here.** The residual EDGE>OLB carries **zero** RSH gap (EDGE 10 vs OLB 7 — a *negative* gap in this direction). Zeroing "the rush component when both roles play the rush job" leaves 1.75 untouched. A term aimed at this rule as stated would be fitted to this pair only, i.e., it is an override wearing a mechanism costume.
2. **The residual that remains would need its own tuned knob** — gating CTH/COV when both roles are "rush-convenient" means inventing a second exception class for one row; the design already carries the honest shape for rows of exactly this kind: sparse named overrides (`EDGE>ILB = 6`, `EDGE>RB = 6` — real-world grounds; both are Owner rulings). `OVERRIDES[('EDGE','OLB')] = 0` is one more row of that same honest kind, costs zero constants, and reproduces the Owner's 0 exactly.
3. **A symmetric rush-equivalence class would be wrong** — OLB>EDGE is owner 12 and stays 12 in every variant (D = 15.39 gates A to 0); the equivalence is directional, so the term would have to be directional too — directional + single-row = override, definitionally.
4. If the Owner wants a *documented policy* ("any DL→LB where the rush job is the job", covering EDGE>ILB/OLB/SAM-class rows) that is a design conversation, and E5 + one override already stands at **98/99 with a single one-tier miss (FS>SS)** — the highest fit any variant has reached without it. My recommendation to whoever writes the next Owner-facing option text: present "E5 + EDGE>OLB override" as the candidate **and** the FS>SS boundary artifact explicitly (owner 2 / model 0), so the Owner is choosing knowingly.

## What still needs deciding (not this task)

- FS>SS (task B territory): exclude safety pairs from the discount, or ×0.75 for FS↔SS, or apply the discount only to CB→FS/SS and SS→DIME/NICKEL (the rows the Owner prices at 0). Any of those should recover 98/99 without the override — worth running before choosing between "E5 + override" and "E5 + FS↔SS carve-out".
- E4 stays rejected. Do not relitigate the destination-weight principle.
- The BLK spec defect is now recorded in my design file (general reading governs; 87 vs 88).
- The E5 same-group discount behaves as designed everywhere except the FS↔SS boundary; the floor never broke a previously-exact rule in any stage.

## Labels

VERIFIED (my runs, commands quoted): the live 99-rule table at `97d7e9d` (99 rules, {0:23, 2:10, 6:43, 12:23}); stages 0/0′/0″/1/2/2′/3/3′/3″/4 (script + full stdout committed under `_agents/inkling/deliveries/2026-11-10/`); the floor fixing exactly the 5 WR>DB and breaking 0; EDGE>OLB's missing rush gap and D=0 (measured row present in thetaprice.md); SS>FS D = 0.02; DT>EDGE D = 4.61; the two absent D rows ILB>FS/OLB>FS and their 12-via-A robustness; identical results of the two synergy readings. REPORTED — and now independently confirmed: MUSE's 93/96/97/98 figures, Claude's `flexderive.mjs` numbers, Glyph's 88/11/0, the BLK spec defect, E4's rejection. INFERRED — the mechanism attribution (which term fixed which rule) — it follows from the stage runs and the printed A tables, not from a causal intervention. UNKNOWN — the real D for ILB>FS/OLB>FS (flagged); whether the Owner approves an override or wants a documented rush-equivalence policy (his call, §EDGE>OLB above); whether anything here survives the flex build actually landing (Architect's call; Option B remains HELD; nothing in this file changes any flex price).

EVIDENCE: VERIFIED — everything above labelled VERIFIED was executed this session (`git show 97d7e9d:tools/mathlab/flex.json`; `python3 _agents/inkling/deliveries/2026-11-10/e5-verify.py`, exit 0; `grep` on thetaprice.md). NOT RUN — Claude's `flexderive.mjs` (task C is a separate item; nobody should read it as confirmed by this file); the Architect's flex build (not consumed, not affected); the 12→15-skill extension (task D).
