SPEAKER: GLM | ROLE: Scribe · GLM lane | TASK: Owner directives wave 2 (22 Oct) — the V21 artifact receipt + six build rulings as paste-ready entries + the coordination norm | DATE: 2026-10-22T01:2xZ

**Pins:** outer root `pwd` verified; build pin stable all day (`NFL Draft Simulator merged.html` `044d1759e01ac99b…`, 656,746 B, re-measured this turn — unchanged since 10-21 10:06 mtime). Index clean at write.

## A · The artifact task — ALREADY DONE, byte-verified

`Football-Sim-V21.html` **exists** (mtime 10-21 15:04 — the Owner had instructed DS/Pickle the same; executor unnamed on disk):

```
Football-Sim-V21.html               656,746 B  044d1759e01ac99b…
NFL Draft Simulator merged.html     656,746 B  044d1759e01ac99b…
```

`shasum -a 256` receipts: **byte-identical**. The best current full HTML is this build — the only file carrying today's fixes; the 10:06 scratch copies (`merged.html` 656,750 B `e1ac8184…`, `merged_v22.html` 656,727 B `4178a69b…`, `merged-patched.html` 656,113 B `578d041f…`) are NOT it. Diff of the scratch `merged.html` vs the working file = 4 bytes — and `e1ac8184` is the wrong hash Claude first recorded in AGENTS.md §14, which now explains itself (a read against the scratch). No action needed; AGENTS.md carries the correct pin after Pickle's correction.

**Naming rule refined (supersedes part of the earlier broadcast):** the CURRENT best artifact carries the **V21** name; **V22 is RESERVED** for the completed future build (Owner: "After you feel completely satisfied with future agents architecture and you complete the build for the new html, it will be called Football-Sim-V22.html"). AGENTS.md §14's "the deliverable artifact is Football-Sim-V22.html, produced by the Architect from NFL Draft Simulator merged.html" now reads: the current artifact is named V21; V22 is the future build. Claude/DS own that wording edit — flagged, not edited by me. The old file stays in place because every receipt in the council record pins its name+hash; a destructive rename would orphan them.

## B · Six Owner rulings — paste-ready for the compiler

> **1 · LEDG/REDG — left/right is dead.**
> Owner verbatim: "LEDG/REDG don't matter at all. We don't care about left or right. Broadcast to everyone."
> WHERE: pool positions LEDG (71) / REDG (58), any edge label or left/right split anywhere displayed or modeled.
> WHAT: DE is ONE family — no left/right distinction in labels, display, or modeling; the two pool tags surface as plain DE everywhere they show.
> SAFE ALONE?: YES (labels/display are modeling-neutral: both tags are already natural at DE1/DE2; the family stays 129 records for 64 slots — see `_agents/glm/notes/SUPPLY-TRUTH.md` §3 DE row).
> HOW TO CHECK: built HTML has no visible "LEDG"/"REDG" strings; supply census unchanged.

> **2 · Punter model weight ≈ 1 (Owner steer; Claude determines the exact number).**
> Owner verbatim: "Claude determines punter's value but probably 1 in the traditonal 'model weights'".
> WHERE: the P weight on the 0–700 scale (QB=700).
> WHAT: P lands ≈1; the exact value is Claude's call inside that steer. It must derive through the invariant (`modelWeights() = f(slotWinsPerOvr())`), not be pasted in by hand.
> SAFE ALONE?: NO — protected constants; Owner approval in principle, implementation via the invariant.
> HOW TO CHECK: weights table shows P at the chosen value; every other position's weight unchanged; Team Rankings recalcs instantly.

> **3 · FB block spec ≫ RB.**
> Owner verbatim: "FB get a much heavier block spec than a RB."
> WHERE: FB vs RB blocking special/spec.
> WHAT: FBs carry a much heavier blocking spec than RBs (implementation shape is Claude's).
> SAFE ALONE?: YES (affects narrative/model outcome mix, not slots/weights).
> HOW TO CHECK: lead-block recaps favor FBs over RBs; season model stays stable.

> **4 · "Value here" removed from the website — completely.**
> Owner verbatim: "Remove 'Value here' completely from the website. If it is part of mathetmatical formats it should remain but it shouldn't be visible anywhere on the website."
> WHERE: every visible instance — the draft board's "Value here" column (named in AGENTS.md §15) and the pick-priority panel detail line (the "+1.65 wins here" anchor), plus any other label.
> WHAT: strip all VISIBLE instances; the underlying math stays.
> SAFE ALONE?: YES (display).
> HOW TO CHECK: grep the built HTML for "Value here"/"wins here" visible strings → 0; math listeners intact; no console errors. NOTE: the AGENTS.md §15 checklist line "Flex penalties visible in draft board 'Value here' column" is obsolete after this — flag to Claude for the next AGENTS.md pass.

> **5 · Stars gates refined.**
> Owner verbatim: "60 yards rushing for all players. At least 300 yards and 3/1 TD reation for QBs to be mentioned as stars."
> WHERE: Stars of the game / Key Players selection.
> WHAT: non-QB mention requires ≥60 rushing yards; QBs require ≥300 passing yards AND a 3/1 TD:INT ratio. This stacks with the earlier ruling (≥60 yards offensive floor, Stars reserved for 90+ internal-rating performances, the rating number never printed to the user).
> NOTE (one ambiguity to settle in implementation): "60 yards rushing" vs the earlier "at least 60 yards" — read either as (a) the 60-yard floor now specified as rushing for all players, or (b) the Owner's shorthand standing on top of the earlier floor; Claude picks one and it goes in the Guide.
> SAFE ALONE?: YES (selection logic + thresholds).
> HOW TO CHECK: recaps show Stars only when gates pass; no 90-number visible.

> **6 · The 3-4 DT↔LB swap becomes a user control.**
> Owner verbatim: "the 3-4 allows the user to swap out a DT for another Linebacker. This should be a toggle or maybe be a recommended thing based on what is left on the draft board."
> WHERE: the 3-4 base conversion (corrected ruling 22 Oct: DT2 → ILB2 worth MIKE, SAM worn by OLB2 worth WILL; never "SAM comes off" in a 3-4).
> WHAT: expose the conversion as a toggle, or auto-recommend it from remaining draft-board depth (recommend the LB conversion when LB depth is rich, keep the DT when thin).
> SAFE ALONE?: NO — interacts with the P0-17 3-4 block and the corrected Nickel rule; pairs with the value/matchup math.
> HOW TO CHECK: the control appears with the base selector; the recommendation tracks board depth; recaps reflect the chosen front.

## C · The coordination norm (Owner verbatim, 22 Oct)

"Because some agents will be occassionally limited by rate limits, no speicifc assignment should ever be assigned to a specific agent. All tasks should be posted openly and whoever is avaialble will begin working on the tasks in priority."

This is the suggest-then-pick-up canon plus the rationale. It does not amend files by me — Claude/DS fold it into the queue principles when they next touch AGENTS.md; the board and fan-out carry it now. (Note for the record: the Owner's standing dispatch template still says "one distinct assignment per session" — the newer norm supersedes that sentence; fan-out messages carry the same OPEN posting to every session with no seat-specific task.)

## Not checked

1. Which of DS/Pickle executed the V21 copy (Owner said both were told; disk is silent).
2. Whether Claude's in-flight build already assumes the OLD (swapped) 3-4 mapping anywhere — DS flagged it too; the code check is the Architect's lane.
3. Whether the scratch `merged.html`'s 4-byte delta vs the working file matters — it is a scratch file, never targeted; recorded only so nobody confuses `e1ac8184` with a real candidate.
