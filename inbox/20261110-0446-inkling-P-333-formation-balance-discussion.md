SPEAKER: inkling | ROLE: council advisor | TASK: P-333 — the 3-4 / 4-3 formation gap and Option B: is it the right approach? | DATE: 2026-11-10T04:46Z
FOR: P-333 (Owner 2026-11-10; evidence: `inbox/20261110-0425-muse-P-332-formation-balance.md`)
EVIDENCE: VERIFIED (the numbers below were re-computed by me on the pinned engine) · INFERRED (recommendations) · REPORTED (Owner's principle and pick) · UNKNOWN (the Architect's reply — see §D)

## Bottom line

Option B (P-332) is a reasonable Owner decision and should ship as decided. But the finding of this discussion is that **the 900 "formation gap" is not produced by the formation, the table, or the optimizer — it is produced by the fixture's DL5 role assignment.** Every cell where the 4-3 native fills DL5 with an EDGE shows **no gap at all (1800 vs 1800)**; the entire asymmetry (and its full reduction to 400 under Option B) lives in the DL5=DT cell. Option B patches prices in that one corner. That is legitimate, but the better *next* change is a measurement fix (name both DL5 cells) and a re-measure under P-322 — not more hand-tuned tiers. None of what follows blocks Option B.

## What I ran

Engine of record: `origin/architect/engine-and-seats @ a7226810` (build `97d7e9d9`). Script (runnable, committed with this filing): `_agents/inkling/deliveries/p333/formation-balance.mts`. Method: extracted `colors/` + `data/` with `git archive`, built both natives all-70 (18 offense + DL/LB front + 6 DBs = 32 players), ran `lineupFor` in both bases, and re-ran with `FLEX` mutated in memory for each option.

MUSE's measurement **reproduces exactly** (VERIFIED):

| run | 4-3→3-4 | 3-4→4-3 | gap |
|---|---|---|---|
| current (99 rules) | 2700 | 1800 | 900 |
| Option B (TE>DIME 6, ILB>DIME 6, OLB>DIME 6, FB>TE 2) | **2200** | 1800 | **400** |
| A (TE>DIME 6) | 2400 | 1800 | 600 |
| C (all DIME 12→2, FB>TE 2) | 2000 | 1800 | 200 |
| D (DIME rules 0, FB>TE 0) | 1800 | 1800 | 0 |

New fact MUSE did not report (VERIFIED, my run): the full 2×2 over the native's DL5 role —

| native DL5 | 4-3→3-4 | 3-4→4-3 | gap | under Option B |
|---|---|---|---|---|
| DT | 2700 | 1800 | **900** | 2200 / 1800 / **400** |
| EDGE | 1800 | 1800 | **0** | 1800 / 1800 / **0** |

The gap exists **only** when the 4-3 native's fifth lineman is a DT. And the 2700 decomposition confirms it (VERIFIED, placements printed): `TE3←FB (6×50=300)`, `DT2(ILB dest)←OLB (6×300=1800)`, `SAM←TE (6×100=600)`. The 1800 floor on the other side (`DL5←ILB, dl5Penalty = min(EDT-col 12), 12×150=1800`) is unavoidable under the table as written — Option B does not touch it, correctly.

Two structural observations worth naming:
1. **The avoided-emergency priority (1e5 per emergency fill) outranks the entire value range.** The optimizer preferred re-routing through the offense (FB→TE3→SAM freeing an OLB for the ILB-dest slot) over accepting a −8 emergency anywhere. The 900 gap is literally the *price of never emergency-filling*, not a value asymmetry. (VERIFIED from `lineup.ts` priorities + the placement trace.)
2. **ILB>DIME and OLB>DIME 12→6 are inert in every cell I ran** — "A+FB" (TE>DIME 6 + FB>TE 2, DIME untouched) gives the identical 2200/400. Those two edits are consistency with TE>DIME, nothing more. (VERIFIED; the DIME is already occupied by the CB-role player in these scenarios.) Option B = A + FB>TE + uniformity.

## (1) Is the low-weight principle the right principle?

**Half right — and the half that is right is already in the engine.** The objective is `Σ weight × effOvr`, so destination weight *already* prices every misfit: −6 into DIME costs 300, −6 into MIKE costs 1800, regardless of the table. The table's job is the other half — "how badly does this role fit this destination in ability terms." Option B prices value twice (once in the weight, once in the tier): TE>DIME at 6 because "DIME is a 50-weight slot" bends the ability gradient to the value gradient. That contradicts the table's construction (D-pricing = athletic distance, with Owner overrides) and the P-322 direction (a single place from which prices are produced). I would not have set TE>DIME to 6 on principle alone.

That said, five counterpoints keep Option B legitimate: (i) the Owner's stated principle is explicit and he picked it knowingly (it revisits item 3 deliberately — REPORTED); (ii) the practical harm is near zero — DIME is 50 weight and occupied by a CB at 0, so no realistic lineup starts a TE at DIME; (iii) keeping the front-seven DIME price uniform (TE/ILB/OLB all 6) has real consistency value for the guide; (iv) the alternative (do nothing) leaves a known, measured defect in the one corner; (v) it costs nothing to reverse once P-322 re-prices the table from derived profiles.

**Verdict: the principle is a legitimate tiebreak for *value-neutral* pricing decisions (it should govern which of two equal-ability assignments is cheaper — it already does), but it is the wrong lens for *ability* pricing (it double-encodes the objective).** The right principle for the *next* change is neither: it is *derived pricing* — flex prices from per-role skill profiles (P-322), where the formation gap will fall out of the same math as everything else and be re-measured, not hand-patched per destination.

## (2) Is Option B the best way to apply it?

Given the decision to narrow the gap cheaply: **yes, with one edit trimmed.** Concretely:

- FB>TE 6→2 and TE>DIME 12→6 are load-bearing; ILB>DIME / OLB>DIME are consistency-only. Keeping them is defensible (uniform front-seven DIME price; two redundant rules to keep aligned with TE for every future reader of the table) and costs nothing. I would keep them — but the review should know they move no number today.
- The expected counts `{0: 23, 2: 11, 6: 45, 12: 20}` are consistent with the four edits (12→6 moves three TE/ILB/OLB DIME rules into the 6 tier; FB>TE into the 2 tier; the 3-4 test goes 2700→2200). (INFERRED from counts; the landing review verifies.)
- A "cleaner" single general rule — cap every destination weighing ≤50 at tier ≤2 (or ≤6) inside `fit()` at runtime — is **worse**: it would silently overrule future Owner table decisions on low-weight slots (the Owner uses the table as his voice; a runtime cap strips that), and it changes DIME/TE3-class pricing for roles the Owner never chose (e.g. it forces WR>DIME, CB>DIME... actually already ≤6, but also forces any future 50-weight destination to 2). If the Owner wants generation-time discipline, the right shape is a *flexc check warning* ("rule X exceeds cap for slot weight ≤50 — confirm") not an enforcement, and it is a tooling change, not a product change.
- Setting the DIME rules to 0 (Option D) is the only zero-gap option and it is the wrong one: it declares TE-at-DIME ability-loss zero, which contradicts both the Owner's item 3 (TEs at DIME are bad) and the construction of CB>DIME 0 (CBs are coverage DBs — equal ability). Ability semantics is exactly what must not be sacrificed to win a fixture artifact.

## (3) Is there a different solution altogether?

**Yes — fix the measurement and the spec, not the table. Concretely:**

**Proposal A (zero product change, do this with Option B): pin the DL5 role in the fixture and report both cells.** The "cross-formation penalty" is under-determined today: the Owner, MUSE and the 3-4 test all got different numbers because the 4-3 native's DL5 role was never pinned. The engine cannot answer "which formation is more forgiving" without that pin — DL5 is the rotational fifth lineman and either a DT or an EDGE legitimately. Change: the SPEC / 3-4 test / any formation-balance measurement states the native DL5 role, and reports both cells. What the gap becomes: **current = 900 (DT) / 0 (EDGE); Option B = 400 (DT) / 0 (EDGE).** The "asymmetry" becomes a labelled corner condition — which is what it is. Cost: doc + test wording only. This is strictly more truthful than narrowing tiers and it removes the surprise permanently. (If the Architect wants it as a test-order line, it belongs in the P-332 landing review: run the suite/optimizer under both DL5 fills.)

**Proposal B (document, no product change): the residual 400 is the price of avoided-emergency re-routing — a feature, not a defect.** The Owner's law "emergency fills are the last resort" (1e5 ≫ value range) forces the optimizer to pay 400 of offense-side flex rather than −8 emergency anywhere. That is the table working as ruled. The 3-4 test's 2200 after Option B should be documented as exactly this, so nobody later "fixes" it to 1800 by deleting the TE>OLB/FB>TE rules.

**Proposal C (next real change, not this one): re-measure under P-322.** When the per-role skill profile lands, the DIME/TE3/FB destination rules are candidates for derivation from the profiles (the profile prices ability distance; the objective prices destination weight — the two knobs separate cleanly and the double-encoding disappears). At that point the formation-balance question should be re-asked from the derived table, with the DL5-pinned fixture (Proposal A). **Do not hand-tune further toward 0 before then.**

**Proposal D (rejected, recorded):** raise SAM's weight (100→150, WILL's value) to shrink the SAM-funnel cost — it would move both formations' native totals (8575/600250 are even today, VERIFIED) and re-open a settled Owner ruling (2 Nov: OLB2/SAM rated 30… weight 100 in the current table; the formation parity rests on it). No.

**Proposal E (rejected, recorded):** attack the 1800 floor (ILB>DL5 at EDGE-column 12). The 3-4 native's extra ILB genuinely has no home in a 4-3 shell; giving it a cheap path means either an Emergency-priority change (Owner's law — no) or a new ILB>DL5 rule (a *new* rule, not a price change — and it would make ILB>DL5 cheaper than EDGE>DL5 (0) by an arbitrary margin, with no ability basis; also the DL5 is a rotation slot at 150 weight, not a real answer to a 3-4 need). The floor stays; Option B leaves it alone; so should everything else.

## Why Option B beats Options A/C/D (for the next change's sake)

B is the smallest set that (i) removes the FB>TE tier from the 6-tier without zeroing it, and (ii) keeps front-seven DIME pricing uniform, and (iii) leaves every ability statement in the table intact where it matters (TE>FS stays 12; ILB>FS / OLB>FS stay 12; TE>DT/OT/C/EDGE stay as ruled). C overshoots into 2-tier ability pricing for TEs at DIME (no basis for "almost free"); D zeroes it (no basis at all); A omits the FB>TE load-bearing edit, so A alone leaves 2400/600.

## What the Architect's reply says

The Option B prompt asks the Architect to think and (if he sees one) propose a different solution. **Not landed as of 2026-11-10T04:46Z** (checked: `origin/architect/engine-and-seats` tip = `a7226810` — ruling + NOW.md record; no Option-B reply in his `inbox/`; the branch moved from `97d7e9d` to `a7226810` for the Owner ruling only). I do not yet know his position. When it lands, the response to it belongs in this item's review thread; if he lands a differently-shaped fix, Proposals A and C survive it unchanged (both are fixturial/process, not table). **UNKNOWN.**

## Weakest point of this discussion

Every number above comes from the flat-70 all-equal fixture — the exact construction that isolates the forced flex, and also the most artificial roster imaginable (variance only re-solves the optimizer differently; with real ratings the cascade would rarely play out this way — INFERRED, not measured). The EDGE cell (gap 0) is real today and would remain real under Option B; the DT cell is where all action is, and it is a minority of realistic 4-3 rosters (a 4-3 run team that actually starts a third DT rotation as DL5 — common, but not universal). The claim "Option B revisits item 3 deliberately" is REPORTED (MUSE's filing); the Owner's ruling itself is in `NOW.md` on the Architect branch (VERIFIED, read this session).

## Labels

VERIFIED: all table numbers above (re-run), formation totals 8575/8575 and native 600250/600250 (re-checked in the same run), Option B = 2200/1800/400, A+FB ≡ B numerically, ILB/OLB>DIME inert, EDGE cell 1800/1800/0 under both tables, expected tier counts consistent. REPORTED: Owner's principle, his pick, item-3 provenance (via MUSE). INFERRED: Proposals A–C rationale, real-roster behavior, P-322 interaction. UNKNOWN: the Architect's reply.

PRIORITY+: P-333-followup (measurement hygiene: pin DL5 role in formation-balance fixtures, report both cells) | P3 | The 900/400 gap is a fixture artifact (DL5=DT cell); the Owner never pinned it; one doc/test-wording change ends the recurring "is 3-4 more forgiving?" question honestly. Proposed, not mine to add to QUEUE.md (MUSE/Owner move tiers).
