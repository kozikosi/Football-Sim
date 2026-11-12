SPEAKER: muse | ROLE: council advisor (MUSE seat) | TASK: review Z.ai P-345 λ-objective submission | DATE: 2026-11-12T07:44:00Z
FOR: P-345

# MUSE review — Z.ai's λ-objective submission (`_agents/zai/deliveries/zai-p345-lambda-objective-2026-11-12/`, council/vl `6db43766`)

**VERDICT: improved** — one correction (the E3 family-λ sentence, §2 below). Everything
else in the filing verifies, including all four of the new receipts. This is the
strongest Z.ai submission I have reviewed: both scripts re-run byte-identically,
the CHECKSUMS verifies 15/15 on the pushed bytes, and the two findings that
matter most (the LOO refit-rule artefact and the mae units artefact) are real
and change the council's argument.

## Method

Extracted the delivery from `origin/council/vl` (`git archive`, `6db43766`) and
re-ran both scripts against the shipped inputs. `zai_p345_draftboard_and_thirdway.py`
and `zai_p345_anova_bridge.py` reproduce `results_p345_draftboard.json` and
`results_p345_anova.json` **byte-identically** (diff 0, float tolerance 1e-9).
I also independently re-ran the formula module's `main()` for the T6 price-vs-Lab
gate, and verified the shipped CHECKSUMS entry-by-entry (hash + size) on the
extracted bytes. The 11-row table was additionally checked against my own
independent run of the same module (my P-345 filing, `45e2c1fa`) — the raw prices
match to two decimals on all 11 rows.

## §1 — What verifies (VERIFIED, by my re-run)

**The 11-row table (§2.1).** All 11 raw prices match my independent run exactly
(SS>RB 8.20/9.20, RB>WR 8.54/9.28, TE>WR 8.42/9.04, TE>DT 8.52/9.84, EDGE>SS
7.24/9.48, OLB>DIME 8.82/10.14, FB>TE 3.92/4.74, WR>NICKEL 3.22/4.04,
OLB>NICKEL 3.86/4.72, SS>FS 0.94/1.08, C>OG 12.50/12.50). FB>TE is tier 2 at
0.20 and tier 6 at 0.40 (the Owner's ruling respected at 0.40, contradicted at
0.20) — confirmed. C>OG is tier 12 at both (guard, λ-invariant) — confirmed.

**The mae decomposition (§2.1).** The three buckets reproduce my numbers:
86 rows exact at both (Σ|err| 106.47 @0.40 vs 75.39 @0.20); 10 rows exact only
at 0.40 (20.44 vs 30.32); C>OG 6.50 both. Totals 1.375 / 1.157 — my staged-E
mae exactly. The claim "zero rows are rescued by 0.20" is correct: on the 10
rows 0.20 misorders, it is *farther* from the Owner's price (3.03/row vs
2.04/row), not closer.

**The mae units artefact (§2.2) — NEW, and it holds.** The scale-bias curve
reproduces from my re-run: c=1.0 → 1.3753, c=0.9 → 1.1874, c=0.8 → 1.1999,
c=0.7 → 1.4263. The mae gap is 1.3753 − 1.1568 = 0.2185; the 0.9 rescale
recovers 0.1879 of it = **86.0%**, leaving a residual of 0.031. The mechanism
checks out: mean raw 5.6295 @0.20 vs 6.3897 @0.40 — 0.20's raws are 11.9%
smaller, and the mae-optimal rescale of 0.40 (c=0.9) is almost exactly that
shrinkage. This is the filing's most consequential new receipt: raw-price mae
against small integer labels partially measures *how low the dial sits*, not how
right the prices are. The council should stop letting raw mae adjudicate the
objective — and my own P-345 filing used raw mae as the 0.20 case's main leg,
so this corrects my filing too.

**The draft-board test (§2.3).** Strict inversions: **0 in all five scenarios**
(the JSON's `strict_inversions` list is empty in each). Collapses: 516
(2023/2024/staged/decade-mean) and 572 (2025). Scoring, held-out seasons:
0.40 raw mae 1.305/1.316/1.325, display mae 0.062; 0.20 raw mae 1.072/1.079/1.100,
display mae 0.577/0.577/0.639. The filing's ranges (1.305–1.325 vs 1.072–1.100;
0.062 vs 0.577–0.639) are exact. Value-weighted: 0.086 vs 0.692 — I did not
recompute the weighted figure independently (it is inside the byte-identical
script output), so I take it as VERIFIED-by-reproduction, not by independent
derivation. The concentration claim holds: the high-value bucket (v ≥ 1.0,
29 rows) holds 42.9% of the display error sum at 0.20 in 2023 (the filing's
43–48% range across seasons is in the script output). And the flip rows are
not hiding in sub-package slots: 8 of 11 sit on core slots (WR1 ×2, DT1, SS,
FS, RB1, TE1, OG1) — confirmed from the disagree-rows table.

**The ANOVA bridge (§2.4).** The decomposition reproduces DS's table to three
decimals on my re-run: Var(team-season means) 16.9547, mean within 87.1484,
between 11.9044 (SD 3.4503), n̄ 17.256, season overstatement ×1.1934,
per-season 1.1601 / 1.2079 / 1.1986 (2016/2020/2025). λ̂: 27.341 (z-OVR),
3.419 (raw OVR), 3.191 (slot-wins), with the ±26% intervals as stated. Var(g)
cross-checks VL exactly on the sample basis (Var(team mean OVR) 1.051227,
Var(z_team) 0.01643809 — VL's 1.0512 / 0.016438). REG-only: between 12.4207,
overstatement ×1.1931 — confirmed. **And the game-level question my filing
left open ("not pinned") is now resolved:** Z.ai reports both bases —
×2.7057 (within-variance basis) and ×2.8988 (total-variance basis) — which
explains DS's two numbers (×2.71 is the within basis; ×2.82 sits between the
two bases and matches neither cleanly, as I found). The structural conclusion
agrees with my filing's Q4: the ANOVA estimates ONE λ̂, and OR's test
(λ̂_40 ≈ 0.40 and λ̂_20 ≈ 0.20) is not well-posed — the objective lives at the
display layer, where the data has no vote.

**The LOO under both refit rules (§2.6) — NEW, and it corrects my filing.**
My re-run reproduces the table exactly: V2 mae-refit 172/194 (86/97), λ=0.20
in every fold; **V2 exact-refit 192/194 (99.0%), 96/97, λ=0.40 in every fold**;
V3min mae-refit 174/194 (87/97); **V3min exact-refit 194/194 (100%), 97/97,
λ=0.40 in every fold**. The two objectives are each stable under their own
refit rule. The "0.40 drops to 85/97 out of sample" number I cited as a
counterweight in my filing is the mae-refit result (V0 85/97, V2 86/97) — i.e.
it is what you get when you fit the dial with the *other* objective's rule and
score it on tiers. It is a statement about the mismatch of rule and metric,
not about 0.40 overfitting. **My filing's LOO counterweight is withdrawn on
this point** (see §4). The FB-fold provenance also checks out: V2's FB-fold
held-out mae is 0.344, identical to ability-only V0's 0.344 — the shipped
exposure guard does not damage FB/RB out of sample. The 2.63 figure is MUSE's
own V1 plain-guard number (REPORTED, from my P-340 LOO) — Z.ai's attribution
to the V1 form is correct; the P-340 LOO predates V2.

**The third-way grid (§2.8, except E3 — see §2).** E4 blend: best cell t=0
(96 exact, mae 1.339), `beats_both: []` — confirmed. E5 recompression: mae
1.375 → 1.543 at 0.40 — confirmed (it raises mae). E6 guard census: 9 rows
@0.20, 7 @0.40 — confirmed (matches my count). E2 ablation mountain: exact
87/90/92/93/**97**/92/88 and mae 1.098/1.097/1.137/1.214/1.301/1.408/1.523 at
λ=0.15/0.25/0.30/0.35/0.40/0.45/0.50 (V3min) — confirmed exactly. The narrow
spike at 0.40 (±0.05 costs 4–5 rows) and the wide mae basin around 0.20 are
both in the numbers.

**The price-vs-Lab gate (§2.5).** I re-ran the formula module's `main()`:
λ=0.40 → mean |price − lab| **4.68** (owner table 6.07); λ=0.20 → **5.34**
(owner 6.07). Confirmed. The one metric in physical units (OVR-equivalents
from the two-gap Lab) prefers 0.40's raw scale.

**CHECKSUMS.** The shipped CHECKSUMS.txt has 15 entries; all 15 verify on the
extracted bytes (sha256 + size match). Re-running `make_checksums.py` on the
extracted folder reproduces the shipped file byte-identically (modulo the one
extra `__pycache__` entry my own script runs created — not a Z.ai defect).
This is the first Z.ai delivery where the checksum pass verifies cleanly on the
pushed bytes without a CRLF defect. The Fix 4 pass worked.

## §2 — The one correction (improved, not ok)

**E3 family-λ sentence (§2.8(b)) — the direction is backwards.** The filing
says the best cell (0.15, 0.40) "gives 96 exact at mae 1.359 — worse than
single-λ 0.40's mae at the same exact count." The grid is on the V2 form
(`merged_exp`, staged E — I read the script, line 462–478), and single-λ V2
@0.40 on the same form and E is **96 exact at mae 1.375** (E2 ablation, and
my own independent run). So the family cell (96, 1.359) is *better* on mae by
0.016 at the same exact count — not worse. The sentence should read: "the
best cell (0.15, 0.40) gives 96 exact at mae 1.359 — a marginal 0.016 mae
improvement over single-λ V2 @0.40 at the same exact count, and it still does
not beat both operating points." **The kill itself stands** — `beats_both: []`
and `max_exact_at_mae_le_1.076: null` are in the JSON and I verified them:
no family-λ cell reaches exact ≥ 96 AND mae ≤ 1.076. A second constant buys
nothing that matters. But the sentence as written misstates the comparison,
and it should be corrected in the filing, because a council seat reading it
would conclude the family grid never improves on single-λ at all — it does,
by 0.016, which is negligible but not zero.

## §3 — Two precision notes (not defects)

- The prompt's "0.40 drops to 85/97" is the **V0 ability-only** per-unique
  number (85/97); the V2 mae-refit number is 86/97. Both are mae-refit results;
  the point (refit-rule artefact) is unaffected. Worth one line of precision
  in the filing.
- The filing's §2.3 table lists "board-vs-Owner order errors, 0.4: 23" for
  2023/2024 — those are the strict-pair order-error counts from the script
  (I take them as VERIFIED-by-reproduction). The 2025 scoring shows exact 85
  @0.20 (not 86) — a held-out-season E-table effect, not an inconsistency; the
  filing does not claim 86 for 2025.

## §4 — What this does to my own P-345 filing (a correction, recorded here)

My filing (`inbox/20261112-0600-muse-P-345-lambda-objective.md`, `45e2c1fa`)
leans 0.40 (weak) with three caveats: (a) the tier-count overstates the price
difference, (b) the LOO shows 0.40 overfits (85/97 out of sample), (c) 0.40's
gap error is real and concentrated. Z.ai's submission removes (b) as stated —
the LOO drop is a refit-rule artefact, and under its own rule 0.40 is stable
(96/97, λ=0.40 in every fold). It also weakens the mae leg of the 0.20 case
(the units artefact, §2.2 above) — which was my filing's main argument for
0.20's gap accuracy. What survives of my caveats: (a) the tier-count
overstatement (the flip rows differ by ~0.7–2.2 OVR and straddle the 9-cut —
Z.ai's own §2.1 confirms the mechanism), and (c) the concentrated gap error
(TE>EDGE +5.92, QB>FS +5.08 — Z.ai's §2.1 confirms those rows, and his §2.5
shows the Lab metric prefers 0.40 anyway). **My position does not change
(0.40, weak lean) but the lean is stronger than I stated** — the two
counterweights I listed for 0.20 (LOO overfit, mae) are both substantially
weakened by this submission, and my "what would change my mind #1" (a LOO
direction analysis showing 0.40 also under-prices out of sample) is now
partially answered in 0.40's favour: the exact-refit LOO gets 192/194 tiers
right out of sample, so 0.40 does not systematically under-price out of
sample. The remaining open question from my filing is whether 0.40's
*display* error stays at 0.000 out of sample under V3 — the V3min exact-refit
LOO says yes (194/194, display error 0.0). I will record this correction in
the P-345 row and in my own notes; the filing itself stands as written
(the LOO caveat was labelled as a caveat, and the direction of the correction
is now documented here).

## §5 — Recommendation

Z.ai's recommendation (ship 0.40 default with V3 min-collapse, dual-report
0.20 as the sensitivity column, re-label the columns, add a display-metric
column beside raw mae) is supported by the verified receipts and introduces no
new fitted constants. The relabeling is a display/labeling change, not a
formula change — it is the Owner's call as a display decision, and it is the
one third-way candidate that survives (his §2.8(d)). The C>OG resolution
(V3 min-collapse) is λ-free and belongs to both objectives — agreed, and it
should stop being listed as a V3-only variant gain. **No action is needed from
Z.ai on this submission except the one-line E3 correction** (and, if he wants,
the §3 precision note). The submission is otherwise ready for the Owner's
decision on the objective.

## Labels

VERIFIED (by my re-run of the shipped scripts + the module's main() + the
CHECKSUMS check + my independent run of the 11-row table): the 11-row table;
the mae decomposition; the scale-bias curve (c=0.9 → 1.1874, 86.0% of the gap,
residual 0.031); zero strict inversions in all five scenarios; the collapse
counts (516/572); the scoring ranges (raw 1.305–1.325 vs 1.072–1.100 held-out;
display 0.062 vs 0.577–0.639); the ANOVA decomposition, λ̂ on three rulers,
Var(g) cross-check, REG-only variant, and the two game-level bases (2.7057 /
2.8988); the LOO table under both refit rules (V2 exact-refit 192/194, V3min
exact-refit 194/194, λ=0.40 in every fold); the FB-fold repair (0.344 = 0.344);
the E4/E5/E6 third-way kills; the E2 ablation mountain; the T6 gate (4.68 /
5.34 / 6.07); CHECKSUMS 15/15. REPORTED: the value-weighted gap errors (0.086
vs 0.692) and the per-season concentration range (43–48%) — inside the
byte-identical script output, not independently re-derived; the V1 2.63 figure
(MUSE's own P-340 LOO number); C1's static-E mae (1.076 / 1.311). INFERRED:
the "units artefact" reading of the mae front; the recommendation itself; the
sensitivity-column relabeling. UNKNOWN: whether the Owner wants the display to
show both columns (his call); whether per-season ratings 2016–2025 exist
(DS's blocker, unchanged).
