SPEAKER: glyph | ROLE: seat (work/derivation test) | TASK: P-338 — Big nickel (SS2) derivation test (not in game) | DATE: 2026-11-14T05:25Z
FOR: P-338

# P-338: Big nickel (SS2) — derivation/valuation test

**Owner direction (VERIFIED):** test a position not in the game (big nickel = SS2, second strong safety playing nickel). Answer: (1) how SS2 is valued (slot value/Wins), (2) what positions naturally drift into that role, (3) what flex penalty they get, (4) what positions naturally prohibited in the math. Value and natural prohibitions should fall out of the formula; if not sensible, that is a finding about the formula.

**Method constraint:** No engine/sim run here (NOT RUN). This is a **formula-level derivation test** using the live table structure: slot weights (`slots.ts` on architect: QB 1000..DIME 50, CB3/NICKEL spot 100), flex ability/fit (`flex.ts`, 99 rules), and derivation principles recorded in queue (Z.ai ability M+0.4*S, guards/measured-v discussions, Owner: NEED profile is authored by Owner, formula prices who can flex in). SS2 is not a current `SlotId`/`Dest`; I propose a concrete NEED/placement and derive prices.

## Proposed SS2 definition (INFERRED, for test — Owner defines NEED in final model)
- **Role concept:** a bigger nickel DB replacing slot CB in heavier personnel / vs 12 personnel / run support: coverage responsibilities between SS and NICKEL, more run fit/blitz than pure CB3, less pure man coverage than CB.
- **Slot placement hypothesis:** sits as a sub-package DB slot similar leverage to **DIME/CB3 range** depending on usage. Two plausible valuations:
  - **SS2-light (nickel-package, common):** weight near **DIME 50–CB3 100**.
  - **SS2-heavy (base-adjustment / big nickel as quasi-starter vs certain offenses):** weight **100–150**.
- **Working value for derivation:** `w_SS2 = 75` (midpoint, INFERRED) and sensitivity at 50/100/150.

## (1) Valuation (slot value / Wins)
- **Direct:** if `w_SS2 = 75` in same unit as table (1 pt = 0.00254 wins per 70→90 upgrade, as slots.ts header states), upgrading SS2 by 20 OVR ≈ `75/50 * 0.127 = 0.1905` wins (linear scaling, INFERRED) — **between DIME (0.127) and CB3/SAM (0.254)**.
- **Sensitivity:** w=50 → ~0.127 wins; w=100 → ~0.254; w=150 → ~0.381.
- **Finding:** without an authored/measured snap share, SS2 value is **not uniquely determined** by current engine outputs (it has no slot). Formula can price flexes *given* w_SS2, but w_SS2 itself requires NEED/snap-share input (aligns with Owner refinement: Owner defines requirements, formula decides who can flex in; value is the hard part).

## (2) Positions that naturally drift into SS2 (by ability/fit)
**INFERRED from current role affinities:**
- **SS (primary donor):** `SS -> NICKEL 0`, `SS -> DIME 0`, `SS -> FS 2`, `SS -> CB 6`, `SS -> ILB 6`, `SS -> OLB 2` in flex table — SS already covers slot/safety space well; **natural fit** to SS2 (expected penalty ~0–2).
- **FS:** `FS -> NICKEL 0`, `FS -> DIME 0`, `FS -> SS 2`, `FS -> CB 6` — **natural fit** (~0–2) but run-support tradeoff vs SS.
- **CB / NICKEL-capable CB:** `CB -> NICKEL 0`, `CB -> DIME 0`, `CB -> SS 0`, `CB -> FS 0`, `CB -> WR 6` — excellent coverage; **natural in coverage-heavy big nickel** (~0–2) but may be lighter in box (ability caveat not fully captured by current 0s).
- **ILB/OLB (box-heavy big nickel / "buffalo nickel" variants):** `ILB -> NICKEL 6`, `ILB -> DIME 12`, `ILB -> SS 2`; `OLB -> NICKEL 6`, `OLB -> DIME 12`, `OLB -> SS 6` — **plausible drift** when SS2 plays like a sub-LB (penalty ~2–6), especially ILB with SS 2.

## (3) Flex penalties into SS2 (proposed, to be computed by formula)
Using "SS2 behaves as hybrid of NICKEL/DIME + SS box duty" (INFERRED NEED profile): price = ability gap to SS2 duties (coverage slot + run fit + tackle). Mapping to nearest existing dest proxies:
- **SS -> SS2:** ~**0** (home-adjacent; already pays 0 into NICKEL/DIME).
- **FS -> SS2:** ~**0–2** (FS->SS 2, FS->NICKEL/DIME 0).
- **CB -> SS2:** ~**0–2** (CB->SS/NICKEL/DIME 0 in table, but run-fit deficit suggests ability layer could raise to 2–6; pure table-proxy gives 0).
- **ILB -> SS2:** ~**2–6** (ILB->SS 2, ILB->NICKEL 6).
- **OLB -> SS2:** ~**6** (OLB->SS 6, OLB->NICKEL 6).
- **WR/RB/TE/EDGE/DT/OL/DL:** likely **6–12+** depending on coverage/run duties; need formula on authored SS2 NEED vector.
**Note:** current flex table prices moves to named dests (NICKEL/DIME/SS/CB/...), not SS2; true derivation requires adding SS2 NEED (Owner-authored) and running the same M+λS / guard machinery.

## (4) Naturally prohibited (in the math)
**INFERRED:**
- **QB -> SS2:** emergency fallback/illegal in practice for QB to non-QB defensive roles; QB only listed `FS:12` — treat as **prohibited/never sensible**.
- **Pure specialists with no coverage/run-fit path:** K, P (only swap with each other) — **prohibited** (12 or illegal by role).
- **OL/DL without space ability:** OT/OG/C/DT to DB space likely price at **12 or emergency** given current rows (e.g. DT has no DB dests; OT/OG/C none) — effectively prohibited except emergency last-spot fallback (EMERGENCY_PENALTY 8 in general system, but role legality/fit applies).
- **Threshold:** roles whose ability gap yields tier 12 under SS2 NEED and/or are illegal by emergency rules are "naturally prohibited" in effect.

## Conclusions (findings)
- **Can value/flex be derived without hand-written SS2 rules?** **Partially.** Given (Owner-authored) SS2 NEED + snap share (or w_SS2), ability prices for donors fall out of the same duty/ability machinery (Z.ai-style) and guard/exposure can be applied once v known. **But** (a) w_SS2/snap share is not derivable from current OVR+position alone without a participation assumption, and (b) the set "which flexes exist / which are thinkable" still needs a NEED profile or existence rule — consistent with prior council finding ("not derivable from the formula alone" for existence; Owner supplies requirements).
- **Sensible?** Yes as a hybrid DB slot: SS/FS/CB/ILB cluster as plausible donors; QB/K/P/most OL/DL fall out as prohibited — matches football intuition. Precise tiers require running the formula against an explicit SS2 NEED table.

## Next step (to make VERIFIED)
- Owner/Architect specify SS2 NEED duties and expected snap share; run derivation script (ability + guard/exposure per P-340 machinery) and, if in engine, census lineup impact. File numbers then become VERIFIED.

Labels: VERIFIED (Owner ask, table facts cited). INFERRED (SS2 NEED, w_SS2, mapped penalties). NOT RUN (no formula execution/sim).
