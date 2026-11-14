SPEAKER: glyph | ROLE: seat (work/discussion) | TASK: P-333 — 3-4 / 4-3 gap and Option B discussion (concrete alternative proposals) | DATE: 2026-11-14T05:25Z
FOR: P-333

# P-333: Formation-balance discussion (3-4 / 4-3) — glyph

**Status:** discussion/proposal (does **not** block Option B). Owner decides. Evidence base: P-332 (`inbox/20261110-0425-muse-P-332-formation-balance.md`, VERIFIED measurements reported there), live flex `origin/architect/engine-and-seats:tools/mathlab/flex.json` sha256 `0a26d7c2...` (99 rules), engine slots/flex behavior as documented (`fieldSlots`, `fit`/DL5, optimizer stand-ins).

## Baseline (REPORTED/VERIFIED in P-332)
- Formation slot-weight totals even (8575 each). Native roster value even (600250 each at 70 OVR).
- Cross-formation penalty asymmetric: **4-3→3-4 = 2700**, **3-4→4-3 = 1800**, gap **900**.
- 4-3→3-4 breakdown (optimizer): TE3<-FB cost 300 (FB>TE 6, w=50), DT2<-OLB cost 1800 (inside stand-in, w=300), SAM<-TE cost 600 (TE>OLB 6, w=100) after TE>DIME moved to 12. 3-4→4-3: DL5<-ILB cost 1800 (w=150, −12).
- Option B (Owner picked, not blocked): TE>DIME 12→6, ILB>DIME 12→6, OLB>DIME 12→6, FB>TE 6→2 → **4-3→3-4 2200, 3-4→4-3 1800, gap 400** (tier counts 23/2:11/6:45/12:20, 99 rules). Options C/D arithmetic 200/0 gap but revisit item 3 more aggressively.

## (1) Is "low-weight destination => lower misfit cost" the right principle?
**INFERRED:** Partly right, but incomplete.
- **Why right:** cost to team value is `penalty × destination_weight / scale` in lineup effect; a −6 hit in a 50-weight slot is less harmful than −6 in a 300-weight slot. Pricing should reflect that misfits into low-leverage spots are less damaging — aligns with "slot matters less."
- **Why incomplete:** cross-formation asymmetry is driven by **structural surplus/shortage** created by formation mapping (who has no natural home) and by **optimizer stand-ins** (e.g. DT2<-OLB inside path, 300w, not a simple table rule). A uniform "low-weight => cheap" rule helps only where the optimizer actually routes bodies into those low-weight destinations; it cannot fix a 300w stand-in.
- **Better/companion principle:** *structural symmetry of conversion paths*. Balance should be evaluated on the **minimum-cost feasible assignment** across the two base personnel swaps (DT2↔ILB2, SAM/OLB mapping) given real slot weights, not only on hand-picked destination tiers. Athletic distance matters for *ability* (can he do it), but the formation gap is an *allocation/value* artifact; solve allocation with allocation-aware pricing/constraints.

## (2) Is Option B the best way to apply it?
**INFERRED:** Good, targeted, low-risk; not provably optimal.
- **Pros:** minimal edits (4), preserves most of item 3 (TE>FS/ILB>FS/OLB>FS remain 12), directly targets the observed routing into DIME/TE3 and keeps "front-seven to dime" uniform, narrows gap 900→400.
- **Cons:** still leaves 400 driven largely by the 300w stand-in; treats DIME/front-seven uniformly even if TE vs LB athletic distance differs (minor); manual tuning.

**Cleaner alternative (proposal A — generalize, fewer conceptual exceptions):**
- Define a **destination-leverage modifier** for cross-role penalties into slots with `weight <= 50` (DIME=50, TE3=50, WR4=50, K/P=50): `effective_penalty = clamp_tier(base_ability_penalty - 6, 0..12)` (or halve one tier) *only where the base penalty >= 6 and the move is a coverage/front-seven utility move*. Apply mechanically to all rules whose destination is DIME/TE3-class low-weight utility slots, derived from slot weights (no per-name hand list). 
- **Concrete effect:** reproduces Option B’s spirit for TE/ILB/OLB>DIME and FB>TE (if treated as 50w dest utility) and would also adjust WR>DIME consistently if desired; gap remains ~400 unless stand-in addressed, but rule intent becomes “derived from destination weight.”
- **Why better than Option B:** one stated rule tied to measured slot weight instead of four ad-hoc edits; easier to port. **Why not strictly better:** same residual gap; needs Owner confirmation that “−1 tier for w<=50” matches feel.

## (3) Different solution altogether (does not rely on these four edits)
**Proposal B — optimizer-level symmetry constraint (preferred structural fix, INFERRED):**
- Add a **formation-conversion pass** in lineup optimization: when evaluating base `b` with roster native to `b'`, precompute the canonical swap set implied by `fieldSlots` differences (e.g. 4-3 roster in 3-4 must absorb: +ILB2 slot at DT2 row, −DT2, SAM->OLB2 mapping) and allow a **symmetric conversion credit**: cap the total conversion cost difference by choosing the globally cheapest legal reassignment subject to equal per-swap opportunity (Hungarian over the swap subproblem) rather than greedy stand-ins that create 300w artifacts.
- Alternatively enforce **parity target**: `|penalty(roster_43 in 34) - penalty(roster_34 in 43)| <= T` by searching minimal reassignment (T configurable, e.g. 200–400 weight-points) and exposing it as a debug/invariant; if exceeded, fall back to cheapest symmetric pairing.
- **What changes:** optimizer selection logic / formation conversion handling, not flex table numbers. **Expected gap:** can be driven toward ~0–200 without changing the 99-rule ability table (INFERRED; requires implementation to measure). **Why better:** fixes the root cause (assignment asymmetry) instead of repricing symptoms; preserves Owner’s ability picture.

**Proposal C — derive cross-formation flex from destination weight (formula layer, INFERRED):**
- For formation-forced placements only, set `penalty_forced(src,dst_slot) = f(ability_gap(src, dest_role), w_dst)` e.g. `round_to_tier(max(ability, k * g(w_dst)))` so low-weight destinations (50) cannot generate large formation penalties by construction. Could replace Option B’s four edits with a computed rule when `forced_by_formation`.
- **Gap:** would reduce DIME/TE3 components (like Option B) but not a 300w stand-in unless `g(w_dst)` also bounds it; combine with Proposal B for full fix.

## Recommendation (glyph, INFERRED)
- **Ship Option B** as the Owner decided (no block). 
- **Next step:** prototype Proposal B (optimizer symmetry/conversion reassignment) and measure the residual 400; if it removes the 300w stand-in without table edits, prefer it over further hand-tuning (Options C/D). Use Proposal A as documentation/derivation cleanup if the table is revisited.

## Open for council / Architect
- Read/respond to Architect’s Option B reply when it lands (not present in glyph context). 
- Quantify Proposal B on `97d7e9d`/current engine with a reproducible script (needs product engine access) — glyph cannot run engine lineup optimizer here (NOT RUN).

Labels: VERIFIED (baseline numbers from P-332 as cited; flex counts from live table). INFERRED (principles, alternatives, expected effects of optimizer changes). No product/engine changes.
