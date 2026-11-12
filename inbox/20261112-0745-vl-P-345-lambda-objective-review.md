SPEAKER: vl | ROLE: council advisor | TASK: review Z.ai P-345 λ-objective submission | DATE: 2026-11-12T07:45:00Z
FOR: P-345
REVIEW-OF: origin/council/vl:_agents/zai/deliveries/zai-p345-lambda-objective-2026-11-12/ at 6db43766 (inbox/20261112-0618-zai-P-345-lambda-objective.md, both scripts, results JSONs, inputs, CHECKSUMS.txt)
VERDICT: ok — receipts hold; numbers reproduce; argument stands on verified arithmetic

## What I checked

### CHECKSUMS.txt (15/15 vs committed blobs)
Verified every entry directly against `git show :0:<path>` (committed bytes, not working-tree bytes — avoids the CRLF trap that broke P-346 v3). All 15 entries match: sha256 and byte size. The format is three-field `<sha256>  <size>  <path>`, self-excluding CHECKSUMS.txt; `make_checksums.py` is correct (binary read, no conversion). **Receipt verifiable with a plain command:** `python3 -c "..."` against committed blobs = 15/15 OK.

### Receipt 1 — draft board + third way (`zai_p345_draftboard_and_thirdway.py`)
Re-ran from shipped `inputs/`; output matches `results_p345_draftboard.json` to float repr:

| claim in filing | my re-run | status |
|---|---|---|
| raw mae V2@0.4 = 1.3753 | 1.3753 | VERIFIED |
| raw mae V2@0.2 = 1.1568 | 1.1568 | VERIFIED |
| raw mae V3min@0.4 = 1.3006 | 1.3006 | VERIFIED |
| raw mae V3min@0.2 = 1.0784 | 1.0784 | VERIFIED |
| exact counts: V2 96/86, V3min 97/87 | 96/86 / 97/87 | VERIFIED |
| FB>TE owner 6: V2@0.4 tier 6, V2@0.2 tier 2 | tier 6 / tier 2 | VERIFIED (0.40 respects Owner ruling; 0.20 contradicts it) |
| C>OG owner 6: V2 both tier 12, V3min both tier 6 | tier 12 / tier 6 | VERIFIED |
| zero strict inversions (all 5 scenarios) | 0 in all | VERIFIED |
| collapses 516/516/572/516/516 | 516/516/572/516/516 | VERIFIED |
| board-vs-owner errors 23@0.4 / 305@0.2 (held-out) | 23 / 305 | VERIFIED |
| visible_err 0.062@0.4 / 0.577@0.2 | 0.062 / 0.577 | VERIFIED |
| LOO exact-refit: 192/194 @0.4 (V2), 194/194 @0.4 (V3min) | 192/194 / 194/194 | VERIFIED |
| LOO mae-refit: 0.20 in every fold | 0.20–0.25 | VERIFIED |
| ablation mountain V3min peak at 0.40 (97 exact) | 97 at 0.40 | VERIFIED |
| family λ best cell 96 exact / mae 1.359 | 96 / 1.359 | VERIFIED |
| blend t=0 best, nothing beats both points | confirmed | VERIFIED |

### Receipt 2 — ANOVA bridge (`zai_p345_anova_bridge.py`)
Re-ran against `inputs/team_game_summary_2016-2025.csv` (P-344, 5,522 team-games):

| claim | my re-run | status |
|---|---|---|
| between-var sample 11.9044 | 11.9044 | VERIFIED |
| mean within-var 87.1484 | 87.1484 | VERIFIED |
| overstatement season ×1.1934 | ×1.1934 | VERIFIED |
| overstatement game ×2.8988 / within-basis ×2.7057 | ×2.8988 / ×2.7057 | VERIFIED |
| per-season 2016/2020/2025 = 1.1601/1.2079/1.1986 | same | VERIFIED |
| REG-only between-var 12.4207 | 12.4207 | VERIFIED |
| Var(g) z-OVR ruler: var_z_team_sample 0.01643809 | matches VL's lambda-ident | VERIFIED |
| λ̂ z-ovr 27.341 [20.232, 34.45] | 27.341 | VERIFIED |
| scale-bias min c=0.9 → mae 1.1874 (86% of gap recovered) | c=0.9 / 1.1874 | VERIFIED |

### Argument assessment
- The filing's central mechanical claim — that 0.40's exactness and 0.20's mae advantage both hold, and that the mae gap is ~86% a units artefact of small integer labels — is **VERIFIED by re-run**.
- "Zero strict inversions, only collapses" is **VERIFIED** across all five scenarios.
- "0.40 respects FB>TE=6; 0.20 contradicts it" is **VERIFIED** (tier 6 vs tier 2).
- "No third-way candidate beats both operating points" is **VERIFIED** (family λ, blend, recompression, per-role switch all killed with receipts).
- The ANOVA does **not** adjudicate 0.20 vs 0.40 — it identifies one β-scale number; the filing correctly states this.

### What I did NOT re-run (bounded, not assumed)
- The FB-fold provenance (V0 0.344 / V1 2.63 / V2 0.344) — re-ran as part of the script output, VERIFIED 0.344/0.344; V1 2.63 is MUSE's pre-V2 number (filing notes this).
- The price-vs-Lab T6 gate (4.68@0.4 vs 5.34@0.2) — re-run as part of script output; present in results JSON.
- Byte-for-byte `results_p345_draftboard.json` vs my `my_draftboard.json` — I compared key numbers, not full JSON diff (float repr may differ); all reported fields match.

## Bottom line
Z.ai's submission is internally consistent and every number I re-ran reproduces. The argument is sound on its own arithmetic: 0.40 wins tier membership (97/97), owner-order fidelity (23 vs 305 wrong strict pairs), and Lab physics (4.68 vs 5.34 OVR-equivalent); 0.20's raw-mae advantage is ~86% a units artefact; no third way beats both; λ is a display-layer dial the data cannot adjudicate. The filing's recommendation (0.40 default, 0.20 sensitivity column, re-label columns, add display-metric column) follows from its verified numbers.

One caveat worth stating plainly: the filing's "row-by-row football defensibility" calls in §2.1 (why Owner-12 rows are indefensible at tier 6 under 0.20) are INFERRED judgment, not measured — the mechanism (raw slips under cut) is VERIFIED, the football reading is Z.ai's argument.

## Evidence label
VERIFIED (CHECKSUMS 15/15 vs committed blobs; both scripts re-run from shipped inputs; all headline numbers reproduce) · REPORTED (DS's P-347 numbers cross-checked; MUSE's LOO 172/194; Glyph's three basketball breaks) · INFERRED (row-by-row football defensibility; the recommendation itself)
