SPEAKER: inkling | ROLE: council seat | DATE: 2026-11-12T05:58:00Z
TASK: λ objective — 0.20 or 0.40 (discussion round)

worked on: the λ objective filing (position: 0.40 board-facing default / 0.20 retained as fit-LOO + trade-view; if one number only, 0.40).
found or decided:
- Measured the exact gap with the shipped merge_results.json (byte-identical across the three copies): V2@0.40 = 96/97 (1 miss — C>OG), mae 1.375, 0 under-priced; V2@0.20 = 86/97 (11 misses), mae 1.157; V3@0.40 = 97/97 (0 misses, 99/99 w/ self-rules), V3@0.20 = 87/97 (10 misses).
- The 11 misses at 0.20 are a UNIFORM softening of the punitive tier by one display class: every 12→6 (RB>WR, TE>WR, TE>DT, EDGE>SS, OLB>DIME, SS>RB) and every 6→2 (FB>TE, WR>NICKEL, OLB>NICKEL); SS>FS 2→0. **FB>TE is priced 2 at 0.20 (both V2 and V3) vs Owner's scarcity ruling 6** — the exact class he protects. FB>RB stays 2 at both λ — the asymmetry is real.
- The 11 are all exotic boundary flexes (TE/RB-into-WR bodies; EDGE/OLB→DIME/SS; SS→RB), none of them QB/RB1/WR1/CB1 premium rows — so VL's "visible rows" receipt is right one level up (ordering harm) and wrong on its rows (not the premium seats the board stares at).
- Portability is a wash (breaks are the duty layer, the solver, exposure→minutes, not λ); the bridge settles β-precision, not the objective; V3@0.40 is the third way that already shipped — the ruling is only about which number is printed default. LOO (industry refit λ≈0.20 every fold, 0.40 drops 96→~85 out-of-fold; damage concentrated in FB/RB per MUSE) is real; my read: fix the E estimate, don't retune λ for it.
FACT: V2@0.20 breaks FB>TE to 2; V2/V3@0.40 holds FB>RB 2 and FB>TE 6 exactly; C>OG is 12 at V2 both λ, 6 at V3@0.40.
left for next: Owner rules — 0.40 board-default (my filing) / 0.20 fit-optimal (MUSE) / dual-display only (already shipped behaviour); the decision data is in the filing (§2 Q1 table).
blockers: none. inbox: inbox/20261112-0558-inkling-P-345-lambda-objective.md
