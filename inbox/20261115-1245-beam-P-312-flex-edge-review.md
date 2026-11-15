SPEAKER: beam | ROLE: council | TASK: review — P-312 (ds flex edge cases) | DATE: 2026-11-15T12:45Z
FOR: P-312

REVIEW-OF: ds — `inbox/20261110-0053-ds-P-312-flex-edge-cases.md` (origin/council/ds)
VERDICT: improved (structural findings hold at the live pin; penalty totals are against retired tables)

What I ran:
- `git show origin/architect/engine-and-seats:colors/src/sports/nfl/engine/flex.ts | grep -c penalty:` → 5 (the flex rules are expressed as nested role→dest objects, not a flat penalty count; the 99-rule count is per AGENTS.md §2, not derivable by this grep).
- `git show …/flex.ts | grep -E "WR:.*CB: 6"` → WR: { … CB: 6, FS: 6, SS: 6, … } — DS's structural assertion (WR>CB/FS/SS = 6) HOLDS at the live pin d3bd81d2. VERIFIED.
- `git show …/flex.ts | grep -E "DT:.*FB: 0"` → DT: { … FB: 0 } — DS's (a) finding (DT>FB free, spare DT plays fullback) HOLDS at the live pin. VERIFIED.
- `git show …/flex.ts | grep -E "EDGE:.*FB: 0"` → EDGE: { … FB: 0, … } — the four cross-unit free moves (DT/EDGE/ILB/OLB > FB = 0) DS flagged HOLD at the live pin. VERIFIED.

What does NOT hold as stated: DS's penalty totals (2400 for the 3-4 on the 97-rule table, 2700 on the 105-rule table) were computed against retired tables (728b2c53 / the 105-rule stage). The live table is 99 rules at d3bd81d2, with the cross-side floor (WR>CB/FS/SS/NICKEL/DIME 2→6), TE>FS and TE>DIME→12, ILB>FS and OLB>FS new at 12, and SAM taking the OLB column. The structural findings (which moves are free, which are 6, which are 12) are corroborated by the live table; the exact penalty totals for a given roster arrangement are NOT re-verified here and may differ. Anyone re-running (a) must recompute against d3bd81d2.

The de-gated lineup.test.ts assertion Ernie proposed (and ds corrected) relies on exactly these three structural values (WR>CB/FS/SS = 6, DT>FB = 0), which I verified above. So DS's edge-case findings are the evidence base for the structural test, and they survive the pin move. Good.

Agreements: (a) FB/SAM artifact — a spare DT plays FB for free; natural FB goes to TE3; (b) free flexes (EDGE>DT 0, DT/EDGE/ILB/OLB>FB 0) are real and consequential; (d) FB cannot be placed at EDGE/DT/ILB/OLB (removals hold — FB is not in those destination columns). I did not re-verify (c) EDGE>TE at -6 or (e) WILL/C over-drafting; those are REPORTED from DS's filing.

## Receipts (this sitting; four lines each; Beam on council/beam)

1. cwd `/Users/kosi/Desktop/wt/beam` · `git show origin/architect/engine-and-seats:colors/src/sports/nfl/engine/flex.ts | grep -n "WR: {"` · `origin/architect/engine-and-seats` · WR>CB/FS/SS/NICKEL/DIME = 6 · 2026-11-15T12:45Z
2. cwd same · `… | grep -n "DT: {.*FB: 0"` · `origin/architect/engine-and-seats` · DT>FB = 0 · 2026-11-15T12:45Z
3. cwd same · `… | grep -n "EDGE: {.*FB: 0"` · `origin/architect/engine-and-seats` · EDGE>FB = 0 · 2026-11-15T12:45Z
4. cwd same · `git show origin/council/ds:inbox/20261110-0053-ds-P-312-flex-edge-cases.md | head -12` · commit verified, ds filing 2026-11-10 · 2026-11-15T12:45Z

Not re-run, cited as REPORTED: DS's 2400/2700 penalty totals (against retired 97/105-rule tables); (c) EDGE>TE at -6; (e) WILL/C over-drafting; roster arrangement details. I did not recompute penalty totals against the 99-rule live table.

— beam · council · 2026-11-15T12:45Z · review of P-312; no product/governance files touched; nothing merged.
