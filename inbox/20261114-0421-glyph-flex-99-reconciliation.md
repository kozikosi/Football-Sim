SPEAKER: glyph | ROLE: seat | TASK: flex-99-reconciliation (council-assignment D) | DATE: 2026-11-14T04:21Z

# Flex-99 Reconciliation (Inkling Assignment D)

Labels: VERIFIED where byte-checked against live file; no table modifications made.

## Live source (sole authority used)
- `origin/architect/engine-and-seats:tools/mathlab/flex.json` sha256 `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6`, 2814 bytes (VERIFIED via `git show` + hashlib).
- Top-level keys: `['_source', 'roles', 'flex']`.
- `_source` (VERIFIED): 'FLEX TABLE, tiers -2 / -6 / -12, 99 rules (Owner 9 Nov 2026, D picks + 9 corrections; Muse relay claude-flex-rebuild and claude-flex-corrections-2026-11-09). Owner rules supersede theta: 7 removed (FB>EDGE, FB>DT, FB>ILB, FB>OLB, CB>RB, DT>TE, EDGE>FS); 53 Owner overrides (14 at 12, 25 at 6, 14 at 2 by list, see the relay); the other 44 rules are priced by D@90 at theta 1.0 (tools/mathlab/results/thetaprice-2026-11-09.md), rounded to the nearest tier of 0/2/6/12 (cut points 1 / 4 / 9). D is NOT recomputed here (P-321 does that). Corrections 9 Nov (Owner overrides, not D): EDGE>ILB/OG/OT/RB/NICKEL, DT>C, DT>OG, EDGE>C to 6; OG>C to 2. Counts: 19 at 12, 40 at 6, 15 at 2, 23 at 0. from-position -> {destination: penalty}. 0 = free. NICKEL = the CB3 slot. DIME = the 6th-DB slot. 10 Nov 2026 (Muse relay claude-flex-floor-2026-11-10): cross-side floor, WR>CB/DIME/FS/NICKEL/SS 2 to 6; item 3, TE>DIME 6 to 12, TE>FS 6 to 12, ILB>FS 12 new, OLB>FS 12 new. Item 7 (SAM rules) NOT applied: SAM is a slot whose dest is OLB, so the OLB column already prices it. Counts: 23 at 12, 43 at 6, 10 at 2, 23 at 0 (99 rules).'
- `roles` (list, len 17): `['QB', 'RB', 'FB', 'WR', 'TE', 'OT', 'OG', 'C', 'DT', 'EDGE', 'ILB', 'OLB', 'SS', 'FS', 'CB', 'K', 'P']`
- `flex` map keys (len 17): `['QB', 'RB', 'FB', 'WR', 'TE', 'OT', 'OG', 'C', 'DT', 'EDGE', 'ILB', 'OLB', 'SS', 'FS', 'CB', 'K', 'P']`
- Total rules: **99**; tier counts: **{0: 23, 2: 10, 6: 43, 12: 23}** (23 at 12, 43 at 6, 10 at 2, 23 at 0). VERIFIED.
- Per-source destination counts: `{'QB': 1, 'RB': 5, 'FB': 2, 'WR': 7, 'TE': 14, 'OT': 5, 'OG': 5, 'C': 4, 'DT': 5, 'EDGE': 11, 'ILB': 9, 'OLB': 9, 'SS': 9, 'FS': 6, 'CB': 5, 'K': 1, 'P': 1}`

## D1. Slot outcomes vs flex consequences (audit)
**Observed structure (VERIFIED):** `roles` lists 17 role/slot labels; `flex` is a 17-key map from source role -> {destination role: penalty} with 99 total destination entries (flex consequences/rules). `slotWinsPerOvr`/slot-weight outcomes are not encoded in this JSON (it encodes flex prices only). Each role is one flex-source bucket; destinations per source vary (0–11), total 99 consequences across 17 sources: QB:1, RB:5, FB:2, WR:7, TE:14, OT:5, OG:5, C:4, DT:5, EDGE:11, ILB:9, OLB:9, SS:9, FS:6, CB:5, K:1, P:1.
If the prompt’s '11-way symlink of roles to flex destinations' refers to a specific artifact/count outside this file, that exact construct was not identified in `flex.json` bytes alone (UNKNOWN from this file); counts above are the live-file-derived audit.

## D2. SS-vs-ILB / OLB-SS same-side inconsistencies (work-order line 36)
Values at HEAD (VERIFIED, from `flex` map):
- `SS>OLB = 2`
- `SS>ILB = 6`
- `ILB>SS = 2`
- `OLB>SS = 6`

Matches filed inconsistency: `SS>OLB` is 2 but `SS>ILB` is 6; `ILB>SS` is 2 but `OLB>SS` is 6. No modification made. `_source` notes cross-side floor applied 2026-11-10 and states item 7 (SAM rules) not applied because SAM slot dest is OLB; same-side pairs above remain as shown (VERIFIED values).

## D3. OWN-NEXT-ONE rule (Z.ai Part A pipeline, proposed)
Searched for `OWN-NEXT-ONE`, `own_next`, `own.next` (VERIFIED):
```
$ git grep -n 'OWN-NEXT-ONE\|own.next\|own_next' origin/council/muse -- 
(exit 1, no matches)

$ git grep -n 'OWN-NEXT-ONE\|own.next' origin/council/zai -- 
(exit 1, no matches)

$ git grep -n 'OWN-NEXT-ONE\|own.next' origin/council/beam -- 
origin/council/beam:inbox/20261114-0505-beam-flex-99-reconciliation.md:37:## D3 — OWN-NEXT-ONE rule
origin/council/beam:inbox/20261114-0505-beam-flex-99-reconciliation.md:39: reports zero matches in repo content; rule not documented/shipped; formula (price(source,target)+price(source,your_own_next) <= price(<own_next_pair>)) not verifiable against live table because rule undefined. (Beam w85-* 'own next-door' hits are unrelated UI prose.)
```

**Finding:** Not present/defined in `origin/architect/engine-and-seats:tools/mathlab/flex.json` and not found in searched council refs except Beam’s prior note documenting absence. Therefore the proposed byte-check `(price(source,target)+price(source,your_own_next) <= price(<own_next_pair>))` cannot be evaluated against shipped state — rule/terms not encoded. VERIFIED (absence in checked artifacts) / UNKNOWN (intent or aspirational status).

## Questions for Owner
- Rule on same-side pairs `SS>OLB=2` vs `SS>ILB=6` and `ILB>SS=2` vs `OLB>SS=6` as shipped.
- If OWN-NEXT-ONE is required, define semantics ('your_own_next', pair identity) and decide enforce vs advisory; currently absent.
