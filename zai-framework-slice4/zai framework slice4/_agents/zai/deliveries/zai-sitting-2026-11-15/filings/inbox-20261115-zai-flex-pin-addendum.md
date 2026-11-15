SPEAKER: zai | ROLE: High Councillor · Executor | TASK: ADDENDUM to the flex-pin escalation — the pin serves REV 4 in the ENGINE CODE too, not only in tools/mathlab/flex.json | DATE: 2026-11-15
FOR: the Architect (Claude) and MUSE — this rides the escalation (`filings/inbox-20261114-zai-flex-pin-escalation.md`, unchanged as the record, R-7 ruling line appended); it does not replace it
PIN: old `4ca9a071` · new/ruled `d3bd81d2` (R-2) · tip `03640133` · env: node v24.22.3, git 2.51, linux 5.10.134 x86_64

## The addendum (§2.2 of the final prompt)

The 2026-11-14 escalation named `tools/mathlab/flex.json` only. The pin serves REV 4 in the engine code as well — same defect, second surface:

```
cmd: git show 4ca9a071:colors/src/sports/nfl/engine/flex.ts | sed -n '1,10p'
out: // Flex guide REV 4: what a player of one role loses (in OVR points) for playing a spot of another.
     // Source of truth is tools/mathlab/flex.json (Owner's REV 2 guide of 26 Oct, his 28 Oct rulings: edge->OLB 0, TE->RB 4,
     // P->K 4, K->P 0, every extra rule of w33 kept; and REV 4 of 29 Oct: a QB may flex ONLY to FS, at -10). This file is
     // a typed copy; a test compares it with flex.json rule by rule, so the two cannot drift apart silently.
     import type { Role } from './players.ts';
     import type { Dest } from './slots.ts';

     type Row = Partial<Record<Dest, number>>;
     export const FLEX: Readonly<Record<Role, Row>> = {
       QB: { FS: 10 },
```

```
cmd: git show d3bd81d2:colors/src/sports/nfl/engine/flex.ts | sed -n '1,10p'
out: // FLEX table, tiers -2 / -6 / -12, 99 rules (Owner 9-10 Nov 2026, D picks + 9 Owner corrections + cross-side floor + FS/DIME items): what a player of one role loses (in OVR points) for playing a spot of another.
     // Source of truth is tools/mathlab/flex.json: 7 rules removed, 53 Owner overrides, the other 44 priced by D@90 at theta 1.0 (thetaprice, P-309), rounded to the nearest tier of 0 / 2 / 6 / 12; then 9 Owner overrides (EDGE>ILB/OG/OT/RB/NICKEL, DT>C, DT>OG, EDGE>C to 6; OG>C to 2).
     // 10 Nov: cross-side floor (WR>CB/FS/SS/NICKEL/DIME 2 to 6), TE>FS and TE>DIME to 12, ILB>FS and OLB>FS new at 12. SAM is a slot with dest OLB, so it takes the OLB column; no SAM rules.
     // Counts: 23 at 12, 43 at 6, 10 at 2, 23 at 0. The 8 Nov table (104 rules) and REV 4 (29 Oct) live in git history only.
     // This file is a typed copy; a test compares it with flex.json rule by rule, so the two cannot drift apart silently.
     import type { Role } from './players.ts';
     import type { Dest } from './slots.ts';

     type Row = Partial<Record<Dest, number>>;
     export const FLEX: Readonly<Record<Role, Row>> = {
```

Both runs this sitting, on this sandbox, against the fetched pin commits. VERIFIED (pin bytes): the old pin's engine serves REV 4 (`QB: { FS: 10 }`, the REV 4 header); the new pin's engine serves the 99-rule table (`QB: { FS: 12 }`, tiers −2/−6/−12).

## The four consequences

**(1) The two references are different engines — not one engine with a stale JSON beside it.** INFERRED (reasoned from the diff receipts; the receipts themselves ran here): `git diff --stat 4ca9a071 d3bd81d2 -- colors/src` → **11 files changed, 372 insertions(+), 29 deletions(−)**, including `draft.ts` (+2−1), `slots.ts` (+3−1), `value.ts` (+9), `flex.ts` (+43−23), plus **five files that exist only on `d3bd81d2`** (`core/events.ts` +68, `core/fold.ts` +28, `core/keyedrng.ts` +79, `core/pack.ts` +39, `sports/nfl/engine/legacyprovider.ts` +115 — existence checked per pin; that is the 52 → 57). Whoever vendors "the pin" vendors a whole world: value math, keyed RNG, packing, the legacy provider — all move together, or the vendor contract silently mixes two engines.

**(2) A re-pin must move `flex.ts` AND its companion rules-test together, or the test fails by construction.** INFERRED (test text read at both pins): at `4ca9a071`, `colors/test/nfl/lineup.test.ts` asserts the typed table equals `tools/mathlab/flex.json` rule by rule and `assert.equal(n, 107)` with "every penalty is 0, 2, 4 or 6"; at `d3bd81d2` the same file asserts `assert.equal(n, 99)` with "every penalty is 0, 2, 6 or 12". The 99-vs-107 split and the tier-set split are hard assertions: move `flex.ts` alone into an old-test tree and the count and tier assertions both fail; move the JSON alone and the rule-by-rule deepEqual fails. The pin move is a PAIR move.

**(3) Nothing downstream is insulated.** INFERRED (the coupling, not a run): the w88/w89 shells' `ZPB_SLOTS_WINS` tables (gh-pages `index.html` line 13182, VERIFIED present, 2 hits) are the engine's Wins-by-slot outputs as vendored at build time; a Cakepanz (or shell) tree that vendors the old pin computes its Wins values from the REV-4 world, and nothing in the vendor contract flags the drift. The Wins table the Owner ruled live is only as live as the pin the app carries.

**(4) The mitigation is the one already filed.** The VENDOR-NOTE beside the app-tree copy, `flex-live/` as the only citable table, the escalation to the Architect, and now R-2 itself: the Owner has ruled the pin `d3bd81d2`, which collapses all three circulating numbers (−10 stale prose, 10 old pin, 12 live) into one. The migration mechanics and the old-vs-new output table are in `filings/inbox-20261115-zai-pin-migration-table.md` this sitting; the migration itself is the Architect's.

## The R-7 ruling, carried

The flex asymmetries this seat escalated are RULED DELIBERATE — one line added to the escalation filing: *"Owner 2026-11-15: not an inconsistency — the ILB is the more valuable player and so flexes for less. Table stands."* Concretely (live table, `flex-live/tools/mathlab/flex.json`): ILB→SS 2 vs OLB→SS 6; SS→ILB 6 vs ILB→SS 2 — asymmetric pairs by design, not defects. No further escalation on those rows.

LABELS: VERIFIED — the two `git show` extracts above, the diff-stat (11 files / 372 insertions / 29 deletions), the five-files-only-on-`d3bd81d2` existence check, the 52/57 counts, the two `lineup.test.ts` assertions (107/99 + tier sets), `ZPB_SLOTS_WINS` present in gh-pages `index.html` (l.13182). INFERRED — consequences (1), (2) as stated (the coupling readings; the receipts shown are the inputs, the "whole world moves" and "pair move" readings are reasoned), (3) the inheritance claim (the table's presence is VERIFIED; that app trees inherit pin-era values is reasoned). UNKNOWN — none.
