SPEAKER: GLM | ROLE: Scribe · GLM lane | TASK: report-back to DS — the FB/Punter section rewrite (#12) | DATE: 2026-10-22T00:58Z

> **CORRECTION 2026-10-22T01:05Z — "Set B" below is SUPERSEDED; read `_agents/glm/notes/SUPPLY-TRUTH.md`.** This note's parallel census (Set B: FB 46 / K 70 / P 70 / HB 95 / TE 61) was methodological error — pattern-grep matching `"FB"`/`"K"`/etc. across non-`PLAYERS` regions (slot labels, group definitions). A parse census of the actual literal (`_agents/glm/tests/supply-census.js`, full receipt at `_agents/glm/notes/SUPPLY-CENSUS-RECEIPT.txt`) measures **FB 8 / K 32 / P 32 / HB 89 / TE 53** — identical in both the working tree (`044d1759`) and the last-committed blob (`40233d6b`). Set A (the donor numbers) was correct all along, is now parse-verified as final, and the provenance-UNKNOWN owner flag dissolves (nobody grew the pool — the pool never moved). No change to this note's section text or its FLEX/NATURAL additions.

Build under test re-verified: `NFL Draft Simulator merged.html` sha256 `044d1759e01ac99b…`, 656,746 B; branch `gpt/council-reliability-scorecard` @ `151cfec3a7f5`. Read-only everywhere except my lane; the document was not edited (per your instruction).

## 1. The replacement section, ready for the compiler (BOC or DS) to splice over P1-12

> **P0-XX. FB and Punter become draftable slots (#12) — RULED 2026-10-21 (Owner verbatim: "no flex cost for the punter as well. Same logic as the fullback. 28 rounds."; "Running back and Half back can be used interchangeably amongst the agents but try to preserve how they're labelled on the site. HBs can become FBs at no flex cost."; "How Claude and I handled the SAM issue is exactly how the FB and Punter situations should be handled. Other positions can flex into the role. Don't change any flex penalties. Just add the new rules for FB and P.")**
>
> WHERE: `ROSTER_SLOTS` (l.924), `TOTAL_ROUNDS` (l.925), `SLOT_FAMILY` (l.930), `NATURAL_SLOT_MAP` (l.931), `FLEX` (l.940), `POS_SLOT_MAP` (l.962); consumers inherit: `effOvr` (l.978), `optimalLineup` (l.1206), `teamRatings` (l.1306), `replacementLevels` (l.1352).
> WHAT: append `'FB','P'` to the `ROSTER_SLOTS` literal — 26→28 slots; `TOTAL_ROUNDS = ROSTER_SLOTS.length` makes every pick counter and UI string (l.1161, l.1559–1560) read 28 rounds / 896 picks with no further edit to those call sites. Add FB and P as natural/zero-cost routes: NATURAL_SLOT_MAP gains the FB and P entries (FB players→FB slot; P players→P slot; K→P and HB→FB at zero per the Owner's words), FLEX gains OUTER keys only — `FLEX.FB = {HB:0, TE:0}` and `FLEX.P = {K:0}` — ** Touch NOTHING existing: no existing FLEX key edited, all existing penalties stand.** Mirror the SAM precedent for mechanism (naturality or an LB_FLEX-style shared-const as Claude already chose for SAM).
> WHY: the Owner ruled it; roster slots 26→28 = 832→896 picks; without the slots the pool tool writes 1,188 records against 832 picks and 40 players sit undraftable (see 5).
> SAFE ALONE?: NO — it changes season math (rosters grow to 28); it must land WITH P0-17 (the flex overhaul) in the same change set, and a full re-validation must follow before ANY numbers-changing item (the recalibration) ships. Do not co-ship recalibration with this.
> HOW TO CHECK: draft completes **896/896** picks across 28 rounds; the flex/effOvr column shows **0** for HB→FB and K→P; season sim + playoffs complete with no new errors; AFTER landing, re-run the 100-season check (r > 0.6) and the real-2025 check (r≈0.66, ρ≈0.69, RMSE≈2.6 band); the pool tool reports `written: 1,188 · dropped: 12, all LS`.

## 2. Verified structures to touch (first-line receipts in the pinned build)

`ROSTER_SLOTS` l.924 (26-element literal) · `TOTAL_ROUNDS` l.925 (`= ROSTER_SLOTS.length`, comment "26 — starters only") · `SLOT_FAMILY` l.930 · `NATURAL_SLOT_MAP` l.931 · `FLEX` l.940–952 (outer keys = slots; the literal ends `HB:{TE:6}, QB:{}, K:{}`) · `EMERGENCY_PENALTY = 8` l.953 · `isNaturalSlot` l.954 · `POS_SLOT_MAP` l.962 · `effOvr` l.978 · `optimalLineup` l.1206 · `teamRatings` l.1306 · `replacementLevels` l.1352. All VERIFIED this turn (`grep -n` first-line receipts).

## 3. The verified supply — TWO sets exist and must be reconciled before the doc publishes one

**Set A (donor-build numbers — what MOC verified against `40233d6b…` and DS quoted):** HB 89 + FB 8 = 97 for 96 backfield slots (**+1**); TE 53 for 64 TE slots (**−11**, predates the ruling); group nets −10 **because of tight end, not the FB slot**. K 32 + P 32 = 64 for 64 kicking slots (exact parity; K→P at zero cost gives slack 2). SAM: 5 records for 32 slots, filled by natural MIKE/WILL at zero penalty with the cost landing downstream (MOC's refinement).

**Set B (current working-tree census, this turn's measurement):** full-span pos-tag counts over the `PLAYERS` array (build lines 449–1095): FB 46, K 70, P 70, HB 95, TE 61, QB 80(caveat: in-span double-quoted group tokens contaminate some counts — the census needs a token-bound re-measure before being cited), element starts ≈1,276.

**Provenance flag (UNKNOWN, owner-bound):** `git show HEAD:"NFL Draft Simulator merged.html"` = `40233d6be00e987c` (last commit `ff8c05ae`); the working tree `044d1759…` is an UNCOMMITTED edit. So Set B describes an uncommitted pool whose editor and authorization are not attributable from the tree. **Recommendation: publish Set A in the doc's supply claim (it is the verified, referenced record) and carry Set B as an open provenance item for the session that edited the product and the Owner — do not let Set B's counts silently replace the verified ones.** Under EITHER set, the pick-total correction is the same: 26→28 rounds = 832→896.

## 4. Why scarcity is not a blocker (the SAM precedent)

The build already runs a slot with a 27-player natural deficit: SAM has 5 records for 32 teams; every team fields a MIKE or WILL at SAM at zero flex penalty, and the true cost surfaces three groups downstream (LB group 86 for 96 → −10) landing on DT/LEDG (−2/−4) and CB/SS/FS (−4) rather than at the slot. FB and P are the same shape — and milder, because the Owner has added dedicated records for them (8 FB /32 P in the donor pool; Set B says far more in the working tree) — so the FB/P ruling creates NO new scarcity premium: the slot prices stay at/near natural, long-run, exactly as the SAM precedent's costs never priced the slot.

## 5. The pool-swap consequence, stated correctly

The 52-record drop in the current tool output is **emergent** — it follows from `NATURAL_SLOT_MAP` + the tool's taxonomy — and it is not an Owner-ordered filter. Once FB and P exist as slots with zero/cheap routes, the tool re-derives by itself: P (32) and FB (8) become draftable → pool writes **1,188** and drops only **12** (all LS) — MOC proved this on copies (`written: 1,188 · dropped: 12`). But 1,188 is *written*, not *assignable*: the FB and P SLOTS must exist first (28th/27th rounds), otherwise the draft completes 896/896 while 40 P/FB records sit undraftable forever. The section therefore ties the pool write-up to the slot addition, never to a hand-edit of the drop logic.

## Not checked

(1) whether Set B's extra records were Owner-authorized (provenance, row above); (2) the exact merge-order side effects of landing this with P0-17 simultaneously (VLOC's safe-alone slice covers the pairing); (3) whether `SLOT_FAMILY` needs an FB entry for grouped-family display (the Owner's "interchangeable labels" outcome may require it) — implementation choice, Claude's call under the SAM precedent.
