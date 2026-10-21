# The Trap, In Plain Language — BOC (DS request) — 20 Oct 2026

No jargon. No acronyms without a gloss. No file paths in the first paragraph.

## What the tool does today

The draft pool is a list of players the computer can pick from. Today the pool holds 1,200 players, but only 1,148 of them are allowed to be drafted — the other 52 are quietly left out. Those 52 are punters (32 of them), fullbacks (8), and long snappers (12). They are left out because the draft board has no slot for a punter or a fullback, so the computer has nowhere to put them. This is harmless today: the draft still fills every slot, because the slots that exist (kicker, etc.) have enough candidates.

## Why that is harmless today

Every slot on the draft board is filled. The 52 dropped players are positions the draft does not use, so dropping them changes nothing about the outcome. The only cost is that 52 players sit in the data file but never get drafted.

## What changes the moment FB and P become draft slots

The Owner has now asked for two new draft slots: Fullback (FB) and Punter (P). That means the 8 fullbacks and 32 punters in the data are no longer drop-able — they now have a home. Only the 12 long snappers remain without a slot.

## What breaks if nothing else changes

Two things, one harmless and one not:

1. **Harmless:** the pool count changes from 1,148 draftable to 1,188. Any document or test that says "1,148 draftable" or "52 dropped" is now stale. Cosmetic.
2. **The real trap:** code and tests that *assume* the 52 dropped players are punters/fullbacks/long snappers. If someone wrote a filter like "drop all P, FB, LS" and never updates it, the new slots would silently re-include 40 players the filter was supposed to exclude — or, worse, the filter would still drop punters who now have a slot, leaving the Punter slot unfilled. **That** is the trap: a stale filter dropping draftable players.

## The one-line fix

Update the drop filter from "P, FB, LS" to "LS only" (12 players), and update every document and test that quotes 52 or 1,148.

## Does the no-flex-cost rule (FB and P) make the trap harmless?

**Yes — harmless, and the warning can be withdrawn.** (Owner clarification 2026-10-21: "no flex cost for the punter as well. Same logic as the fullback. 28 rounds." The earlier "no draft cost" distinction is withdrawn — both FB and P use zero flex penalty, same as the SAM precedent. The P slot is drafted (28 rounds total), not auto-filled.)

Under the confirmed rules (FB and P are draft slots; K and P may play P at no flex cost), the Punter slot has 64 candidates (32 punters + 32 kickers) for 32 slots. There are **zero unfillable kicking slots league-wide**. The Fullback slot has 8 fullbacks plus every running back and tight end (at zero flex penalty) — far more than 32 slots need. The only remaining dropped players are the 12 long snappers, who have no slot and never did.

So the trap is not a slot-fillability problem. It is a stale-count problem (52 → 12), which is cosmetic and easily fixed. DS can withdraw the "unfillable slot" warning; the count update (52 → 12) is a one-line documentation fix, not a product risk.

VERIFIED: player counts (32 P + 8 FB + 12 LS = 52) by python parse of PLAYERS in merged.html. The "no flex cost" rule for K/P → P means 64 candidates for 32 P slots (VERIFIED by arithmetic: 32+32=64 ≥ 32). INFERRED: that the filter is the only place the 52 is consumed (not independently checked beyond grep). NOT CHECKED: whether any test or document actually hardcodes 52 or 1,148 (BOC's smoke-test inventory did not find one, but did not exhaustively search all _agents notes).


---

## Correction (appended 21 Oct — MOC verification, Owner relay)

MOC independently verified the histogram against the merge candidate's own PLAYERS (1,200 records) with three refinements:

1. **The −10 is not in the backfield.** HB 89 + FB 8 = 97 for 96 backfield slots (+1). The hole is tight ends: TE 53 for 64 TE slots (−11). The Owner's FB rule lands on a group that is *not* short; the group nets −10 purely because of TE, which predates the ruling.
2. **The SAM hole is free at the slot and expensive three groups downstream.** MIKE and WILL are natural SAM (zero penalty), so 27 teams field a MIKE/WILL at SAM at no cost — but the LB group becomes 86 players for 96 slots (−10), and that cost lands on DT/LEDG (−2/−4) and CB/SS/FS (−4). The cost hides; it does not disappear.
3. **Kicking parity is real but fillable** under the Owner's clarified rule (K→P at no flex cost): 32 P + 32 K = 64 for 32 P slots. The knife-edge is the K slot itself — `FLEX.K = {}` means a kicker can flex nowhere and nobody can flex into K, so a K injury costs the emergency penalty (8).

Additionally, MOC verified the drop is emergent from NATURAL_SLOT_MAP + taxonomy, not a hardcoded filter: when the build carries FB/P, the tool writes 1,188 and drops 12 by itself (proved on copies: `written: 1188 · dropped: 12`, all LS). The stale 52/1,148 counts live only in documents: SIM-PLATFORM/foundations/FB-P-SLOT-FOUNDATIONS.md, SIM-PLATFORM/data/schema/current-pool-distribution.md (4 places), SIM-PLATFORM/data/schema/nfl-position-taxonomy.md l.42, SUBMISSIONS.md l.1615. Nowhere in the tool. CHRONICLE hits are historical and must stay.
