SPEAKER: super | ROLE: Council | TASK: P-013 default weights recalibration — save Owner weights list and promote to council | DATE: 2026-11-06T15:34Z

FOR: P-013

## Source
Owner's direct message, today (2026-11-06). The Owner supplied a weights list as his personal opinion on what DEFAULT_WEIGHTS should be, and asked to "save these values and promote them as the final values to the council" and to "test Claude's engine with these values as much as possible and as rigorously as possible."

## Evidence label
OWNER-SUPPLIED (Owner-supplied opinion/intuition, chosen "on my own intuition" per the Owner's own words). NOT a sourced fact, NOT verified, NOT applied. Per AGENTS.md §7, this is Owner-supplied data — the Owner gave this specific datum/approach. Per AGENTS.md §3, DEFAULT_WEIGHTS is a protected constant: change only to the exact value the Owner approved, citing the approval. I do NOT apply it to the product; only the Architect builds.

## Owner's weights list (verbatim, xM y z format where x ≈ rounded salary in Millions, y = position, z = weight)

40M QB 1000
10M RB1 250
4M RB2 100
1M FB 25
25M WR1 650
15M WR2 400
4M WR3 100
2M WR4 50
10M TE1 250
5M TE2 150
2M TE3 50
20M OT1 500
15M OG1 400
5M C 150
10M OG2 250
12M OT2 300
25M DE1 650
12M DE2 300
20M DT1 500
10M DT2 300
5M DL5 150
12M MIKE 300
6M WILL 150
3M SAM 100
15M CB1 400
12M SS 300
12M FS 300
10M CB2 250
4M NICKEL 100
2M DIME 50
2M K 50
2M P 50

## Structural comparison vs current DEFAULT_WEIGHTS (Football-Sim-PreColors.html line 452)

Computed with node against the current build (sha256 40233d6be00e987c…):

POSITIONS IN OWNER LIST NOT IN CURRENT DEFAULT_WEIGHTS: TE3=50, NICKEL=100, DIME=50
POSITIONS IN CURRENT NOT IN OWNER LIST: LB4=5, CB3=80, CB4=20, SS2=5, FS2=5

COMMON POSITIONS (current → owner, ratio):
QB 320→1000 (3.13x) · RB1 100→250 (2.50x) · RB2 40→100 (2.50x) · WR1 60→650 (10.83x) · WR2 40→400 (10.00x) · WR3 20→100 (5.00x) · WR4 5→50 (10.00x) · TE1 80→250 (3.13x) · TE2 20→150 (7.50x) · OT1 295→500 (1.69x) · OT2 295→300 (1.02x) · OG1 295→400 (1.36x) · OG2 295→250 (0.85x) · C 295→150 (0.51x) · DE1 350→650 (1.86x) · DE2 350→300 (0.86x) · DT1 320→500 (1.56x) · DT2 300→300 (1.00x) · DL5 5→150 (30.00x) · MIKE 100→300 (3.00x) · WILL 100→150 (1.50x) · SAM 60→100 (1.67x) · CB1 350→400 (1.14x) · CB2 295→250 (0.85x) · SS 80→300 (3.75x) · FS 60→300 (5.00x) · K 5→50 (10.00x) · P 1→50 (50.00x) · FB 1→25 (25.00x)

Totals: current 4652 → owner 8575 (~1.84x). Owner sets QB=1000 as the 1000-point baseline; WR positions get the largest relative boosts; K/P/DL5/FB get large boosts from very small current bases.

## Protected-constant contract
slotWinsPerOvr() (line 1346) computes (slotWins(slot,90) − slotWins(slot,70))/20 for each slot in ROSTER_SLOTS and is cached in _wpoCache. DEFAULT_WEIGHTS (line 452) feeds slotWins via modelWeights() (line 459). The Owner said: "try to land the slotWinsPerOvr revealed impact somewhere around these values but Claude has a plus or minus 50 room for deviation." Any change to DEFAULT_WEIGHTS re-pins its hash in MERGE-MANIFEST.md in the same commit (AGENTS.md §3).

## SAFE ALONE?
NO. DEFAULT_WEIGHTS is a protected constant. Only the Architect builds and may apply a protected-constant change, with Owner approval cited and MERGE-MANIFEST.md re-pinned in the same commit. I do not edit the product file.

## HOW TO CHECK
- grep -n "DEFAULT_WEIGHTS" Football-Sim-PreColors.html → line 452, current values as listed above.
- The Owner's list is saved verbatim in this inbox file; it is a proposal, not an applied change.
- Structural comparison above was computed with node from line 452; verifiable by re-running the node snippet.
- Any test of these values in the engine must be structural (function-body hash/diff against line 452) until the product has an injectable RNG (AGENTS.md §3); runs are not repeatable without a seed.

## Promotion to council
This file promotes the Owner's weights list to the council as the proposal for P-013 (default weights recalibration). Two reviews by two different seats = REVIEWED (AGENTS.md §5). The Architect reads node tools/council.mjs digest and decides whether to apply to DEFAULT_WEIGHTS (with Owner approval and MERGE-MANIFEST.md re-pin).
