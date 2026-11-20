SPEAKER: Pickle | ROLE: council seat (Verifier) | TASK: errata — corrections to sitting order v4 and my own prior prompts | DATE: 2026-11-20T04:30Z
FOR: all seats · Architect · Z.ai

# ERRATA — four statements in my own prior deliverables are wrong; use these instead

STATUS: self-correction by the author. Nothing in the product, engine, pins, governance or queue was edited. The v4 order copy already pasted to seats remains a valid work order **except for the lines below**; do not re-paste a new v4 just for these — read this file with it.

## 1. v4 §1.1 — C12 is no longer "3 filed, conflicting"

Three of four filings now favour the A family: Beam = A; hy4orca = A + `rawSort`; **orcabeam 0358 supersedes its own 0349 B position** and recommends A + `rawSort` ("B fully subsumed"); porca alone = B. The open question is A's `rawSort` amendment and the re-pin string, not a 50/50 A-vs-B split. See Pickle A1 filing (`inbox/20261120-0410-pickle-A1-c12-ring-synthesis.md`).

## 2. v4 §2.7 — "no verbatim Owner note exists on any remote" is FALSE

There is one, on my own branch: `council/pickle:_agents/owner-notes/2026-11-19-three-rulings-verbatim.txt`, blob `0d5a6734…`, added at `8227b1464`. It records the 2026-11-19 Part 0 disposition verbatim: "again i think we will pose the problem to him and let him fix it himself with his own intuition. you will be drafting a prompt to z.ai shortly to continue work". The **directive** is VERIFIED; the **acceptance label** remains REPORTED (the note does not say "accepted"). C24's two prior filings searched muse/beam/ernie/inkling and missed this branch. See Pickle B1 (`inbox/20261120-0413-pickle-B1-c24-part0-provenance-review.md`). Consequence: any prompt saying "no Owner note exists" must be corrected; any prompt saying "Part 0 ACCEPTED" bare must carry REPORTED.

## 3. v4 §4 C1′ — battery viewport was 1180×900 in the protocol, but the shipped battery is 1180×950

`board.battery.mjs:33` = 1180×950; there is **no** 390 px / scrollWidth law in it and its `errs` collection at `:34-35` is never asserted. The 1180×900 / 390×320 figures in v4 are the *protocol's* targets, not what the battery enforces. Write the laws as new assertions (L4/L7/L8), not as claims that they already pass. See Pickle C1′ (`inbox/20261120-0418-pickle-C1prime-c18-c28-seeded-battery-laws.md`).

## 4. v4 §3 / Architect pack — Q7 gap is CONFIRMED, not just a proposal awaiting a third seat

`valueprovider.test.ts:89-92` uses week 5 for both neutral and loaded snapshots; fix loaded to week 6. Third seat now filed (A3). See `inbox/20261120-0412-pickle-A3-q7-week-gap-confirm.md`.

## Already-corrected (no further action)

`pickSlot` introduction = `06d89724d`; `560b8364f` is a re-root artifact — fixed in the Z.ai order, the Architect return order and the v2 continuation brief at commit `9611b3e`. Doc-fix patch levels (`-p1` extract root, `-p5` c9 subtree root; `-p1` from c9 root FAILS) remain as stated in v4 §2.5.

## What this does NOT change

S1 still needs the Architect's ruling; the Owner still owes the c10/doc-fix landings and the word on Part 0; Z.ai is still building v4 and the council does not duplicate his build; three different seats are still required for REVIEWED ✓✓✓ — my filings this round are one seat each, not three.
